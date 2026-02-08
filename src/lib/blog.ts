// src/lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

/* =========================================================
   0) Runtime / paths
   ========================================================= */

const postsDirectory = path.join(process.cwd(), "src", "content", "blog");

/* =========================================================
   1) Types + validation (Zod)
   ========================================================= */

const PostFrontmatterSchema = z
  .object({
    title: z.string().min(3, "title is required"),
    description: z.string().min(10, "description is required"),
    date: z.string().min(4, "date is required"), // ISO string recommended
    tags: z.array(z.string()).default([]),
    author: z.string().min(2).default("Rédaction"),
    image: z.string().min(1).default("/images/blog/default.jpg"),

    // bonus (optionnels) : très utile SEO/UX
    updatedAt: z.string().optional(), // ISO
    canonical: z.string().optional(),
    readingTime: z.number().optional(),
  })
  .strict();

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;

export interface Post<TFrontmatter> {
  frontmatter: TFrontmatter;
  slug: string;
}

/* =========================================================
   2) Helpers
   ========================================================= */

function safeExists(dir: string): boolean {
  try {
    return fs.existsSync(dir);
  } catch {
    return false;
  }
}

function normalizeSlug(input: string): string {
  return input.replace(/\.mdx$/, "").replace(/^\/+|\/+$/g, "");
}

function toDateOrNull(value: string | undefined): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function compareDesc(a: Date, b: Date) {
  return b.getTime() - a.getTime();
}

function uniqLower(list: string[] = []) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of list) {
    const k = (t ?? "").trim().toLowerCase();
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(k);
  }
  return out;
}

/**
 * Score tags similarity (pondéré) :
 * - +3 si tag exact commun
 * - +1 si tag "proche" (contient)
 */
function scoreTags(aTags: string[], bTags: string[]) {
  const a = uniqLower(aTags);
  const b = uniqLower(bTags);
  if (!a.length || !b.length) return 0;

  const bSet = new Set(b);
  let score = 0;

  for (const t of a) {
    if (bSet.has(t)) score += 3;
    else {
      // bonus "proximité" très léger (ex: "sécurité privée" vs "sécurité")
      for (const tb of b) {
        if (tb.includes(t) || t.includes(tb)) {
          score += 1;
          break;
        }
      }
    }
  }
  return score;
}

/* =========================================================
   3) Cache mémoire
   ========================================================= */

type PostInternal = Post<PostFrontmatter> & { _content?: string };

let cache:
  | {
      all: PostInternal[];
      bySlug: Map<string, PostInternal>;
      mtimeKey: string;
    }
  | null = null;

function computeMtimeKey(filePaths: string[]) {
  // clé d'invalidation simple basée sur les mtimes
  const parts: string[] = [];
  for (const fp of filePaths) {
    try {
      const stat = fs.statSync(path.join(postsDirectory, fp));
      parts.push(`${fp}:${stat.mtimeMs}`);
    } catch {
      parts.push(`${fp}:0`);
    }
  }
  return parts.sort().join("|");
}

function isDev() {
  return process.env.NODE_ENV !== "production";
}

/* =========================================================
   4) IO : list + read
   ========================================================= */

export function getPostFilePaths(): string[] {
  try {
    if (!safeExists(postsDirectory)) return [];
    return fs
      .readdirSync(postsDirectory)
      .filter((p) => p.endsWith(".mdx"))
      .sort();
  } catch {
    return [];
  }
}

function readPostFile(realSlug: string) {
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const parsed = PostFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    // On n'explose pas le build : on remonte une erreur lisible
    const issues = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);
    throw new Error(
      `Invalid frontmatter in "${realSlug}.mdx":\n- ${issues.join("\n- ")}`
    );
  }

  // Normalisation date : on force ISO si possible
  const date = toDateOrNull(parsed.data.date);
  const updatedAt = toDateOrNull(parsed.data.updatedAt);

  const normalized: PostFrontmatter = {
    ...parsed.data,
    date: (date ? date.toISOString() : parsed.data.date),
    ...(updatedAt ? { updatedAt: updatedAt.toISOString() } : {}),
    tags: parsed.data.tags ?? [],
  };

  return { frontmatter: normalized, content };
}

/* =========================================================
   5) Public API
   ========================================================= */

export function getPostBySlug(slug: string): { data: PostFrontmatter; content: string } {
  const realSlug = normalizeSlug(slug);

  // si cache dispo, utilise
  const loaded = getAllPostsInternal({ includeContent: true });
  const found = loaded.bySlug.get(realSlug);

  if (!found || !found._content) {
    // fallback lecture directe
    const { frontmatter, content } = readPostFile(realSlug);
    return { data: frontmatter, content };
  }

  return { data: found.frontmatter, content: found._content };
}

type GetAllPostsOptions = {
  /**
   * ⚠️ Déconseillé : “faker” des dates.
   * Mets-le à true uniquement pour un mode preview/dev.
   */
  fakeFreshDates?: boolean;

  /**
   * Date de référence si fakeFreshDates est activé
   */
  referenceDate?: string; // ISO

  /**
   * écart en jours entre posts, si fakeFreshDates
   */
  spacingDays?: number;

  /**
   * Inclure le contenu (plus lourd)
   */
  includeContent?: boolean;
};

function getAllPostsInternal(opts: GetAllPostsOptions = {}) {
  const filePaths = getPostFilePaths();
  const mtimeKey = computeMtimeKey(filePaths);

  // Invalidation cache :
  // - en prod : uniquement si changed (rare)
  // - en dev : on ré-invalide si mtimes changent
  if (cache && cache.mtimeKey === mtimeKey) {
    // Si l'appel demande le contenu et que cache ne l'a pas, on recharge.
    if (opts.includeContent && cache.all.some((p) => p._content === undefined)) {
      // reload with content
    } else {
      return cache;
    }
  }

  const bySlug = new Map<string, PostInternal>();
  const all: PostInternal[] = [];

  for (const filePath of filePaths) {
    const slug = normalizeSlug(filePath);

    try {
      const { frontmatter, content } = readPostFile(slug);
      const item: PostInternal = {
        slug,
        frontmatter,
        ...(opts.includeContent ? { _content: content } : {}),
      };
      bySlug.set(slug, item);
      all.push(item);
    } catch (e) {
      // En prod, tu peux décider de throw pour être strict.
      // Ici : on log et on ignore le post invalide (robuste CI).
      console.error(`[blog] ${String(e)}`);
    }
  }

  // Sort by date desc (fallback updatedAt si tu veux)
  all.sort((a, b) => {
    const ad = toDateOrNull(a.frontmatter.date) ?? new Date(0);
    const bd = toDateOrNull(b.frontmatter.date) ?? new Date(0);
    return compareDesc(ad, bd);
  });

  // Option : fake fresh dates (à utiliser uniquement en preview/dev)
  if (opts.fakeFreshDates) {
    const ref = toDateOrNull(opts.referenceDate) ?? new Date();
    const spacing = Math.max(1, opts.spacingDays ?? 5);

    all.forEach((post, index) => {
      const newDate = new Date(ref.getTime() - index * spacing * 24 * 60 * 60 * 1000);
      post.frontmatter = { ...post.frontmatter, date: newDate.toISOString() };
    });
  }

  cache = { all, bySlug, mtimeKey };
  return cache;
}

export function getAllPosts(opts: GetAllPostsOptions = {}): Post<PostFrontmatter>[] {
  const loaded = getAllPostsInternal({ ...opts, includeContent: false });
  // on ne renvoie pas _content
  return loaded.all.map(({ slug, frontmatter }) => ({ slug, frontmatter }));
}

export function getSimilarPosts(
  currentSlug: string,
  tags: string[],
  maxResults = 3
): Post<PostFrontmatter>[] {
  const realSlug = normalizeSlug(currentSlug);
  const baseTags = uniqLower(tags);
  if (!baseTags.length) return [];

  const loaded = getAllPostsInternal({ includeContent: false });
  const all = loaded.all;

  const candidates = all
    .filter((p) => p.slug !== realSlug)
    .map((p) => {
      const s = scoreTags(baseTags, p.frontmatter.tags ?? []);
      return { post: p, score: s };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const ad = toDateOrNull(a.post.frontmatter.date) ?? new Date(0);
      const bd = toDateOrNull(b.post.frontmatter.date) ?? new Date(0);
      return compareDesc(ad, bd);
    })
    .slice(0, maxResults)
    .map((x) => ({ slug: x.post.slug, frontmatter: x.post.frontmatter }));

  return candidates;
}
