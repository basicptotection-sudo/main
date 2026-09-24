import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/shared";
import { Tag } from "@/components/blog/tag";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

/* ================= types ================= */

type Params = { tag: string };
type PageProps = { params: Promise<Params> };

/* ================= helpers ================= */

function toAbsolute(path: string) {
  const base = (siteConfig?.url || "").replace(/\/$/, "");
  if (!base) return path.startsWith("/") ? path : `/${path}`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function slugifyTag(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** URL tag à partir du slug (déjà safe) */
function tagPath(tagSlug: string) {
  return `/blog/tags/${tagSlug}`;
}

function humanizeSlug(tagSlug: string) {
  return tagSlug.replace(/-/g, " ").trim();
}

/* ================= SSG ================= */

export async function generateStaticParams() {
  const posts = getAllPosts();

  const tags = posts
    .flatMap((p) => (Array.isArray(p.frontmatter.tags) ? p.frontmatter.tags : []))
    .map((t) => String(t))
    .filter(Boolean);

  const slugs = Array.from(new Set(tags.map(slugifyTag))).filter(Boolean);
  return slugs.map((tag) => ({ tag }));
}

/* ================= metadata ================= */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;

  // tag est déjà le slug (ex: "securite-incendie")
  const tagSlug = decodeURIComponent(tag);
  const label = humanizeSlug(tagSlug);

  const canonical = toAbsolute(tagPath(tagSlug));

  return {
    title: `Articles : ${label} | Blog Basic Protection Privée`,
    description: `Retrouvez nos conseils et analyses sur le thème : ${label}.`,
    alternates: { canonical },
    openGraph: {
      title: `Articles : ${label}`,
      description: `Conseils et analyses sur : ${label}.`,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Articles : ${label}`,
      description: `Conseils et analyses sur : ${label}.`,
    },
  };
}

/* ================= page ================= */

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;

  const tagSlug = decodeURIComponent(tag);
  const allPosts = getAllPosts();

  const posts = allPosts
    .filter((p) => {
      const tags = Array.isArray(p.frontmatter.tags) ? p.frontmatter.tags : [];
      return tags.some((t) => slugifyTag(String(t)) === tagSlug);
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  if (posts.length === 0) notFound();

  // Affiche le tag original si on le retrouve, sinon humanize(slug)
  const displayTag =
    posts
      .flatMap((p) => (Array.isArray(p.frontmatter.tags) ? p.frontmatter.tags : []))
      .map(String)
      .find((t) => slugifyTag(t) === tagSlug) || humanizeSlug(tagSlug);

  const allTags = Array.from(
    new Set(
      allPosts
        .flatMap((p) => (Array.isArray(p.frontmatter.tags) ? p.frontmatter.tags : []))
        .map((t) => String(t))
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: displayTag, href: tagPath(tagSlug) },
  ];

  const countLabel = `${posts.length} article${posts.length > 1 ? "s" : ""}`;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Breadcrumbs items={breadcrumbItems} centered />
        <p className="mt-2 font-semibold text-primary">Catégorie</p>
        <h1 className="mt-2 font-headline text-4xl font-bold text-primary md:text-5xl">
          {displayTag}
        </h1>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-bold">
          {countLabel} trouvé{posts.length > 1 ? "s" : ""}
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const tags = Array.isArray(post.frontmatter.tags)
              ? post.frontmatter.tags
              : [];

            const dateLabel = format(
              new Date(post.frontmatter.date),
              "dd MMMM yyyy",
              { locale: fr }
            );

            return (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="block">
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <p className="mb-2 text-sm text-muted-foreground">
                      {dateLabel}
                    </p>
                    <CardTitle>{post.frontmatter.title}</CardTitle>
                    {post.frontmatter.description ? (
                      <CardDescription className="mt-2">
                        {post.frontmatter.description}
                      </CardDescription>
                    ) : null}
                  </CardHeader>

                  <div className="p-6 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {tags.map((t) => {
                        const tagStr = String(t);
                        const current = slugifyTag(tagStr) === tagSlug;

                        return (
                          <Badge
                            key={tagStr}
                            variant={current ? "default" : "secondary"}
                          >
                            {tagStr}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="mb-4 text-center text-xl font-bold">
          Explorer d&apos;autres catégories
        </h3>
        <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2">
          {allTags.map((t) => (
            <Tag key={t} tag={t} current={slugifyTag(t) === tagSlug} />
          ))}
        </div>
      </div>
    </div>
  );
}
