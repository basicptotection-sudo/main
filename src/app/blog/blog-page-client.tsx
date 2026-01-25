
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Breadcrumbs } from "@/components/shared";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowRight, Search, Sparkles, TrendingUp } from "lucide-react";
import type { Post, PostFrontmatter } from "@/lib/blog";
import { PlaceHolderImages } from "@/lib/placeholder-images";

type SortKey = "recent" | "oldest" | "title";

function safeTags(tags: any): string[] {
  if (!Array.isArray(tags)) return [];
  return tags.map((t) => String(t).trim()).filter(Boolean);
}

function readingTimeFrom(text?: string) {
  // fallback simple : 200 mots/min.
  if (!text) return null;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (!words) return null;
  const minutes = Math.max(3, Math.round(words / 200));
  return `${minutes} min`;
}

function getPostCover(post: Post<PostFrontmatter>) {
  // Supporte frontmatter.cover / image / hero etc.
  const fm = post?.frontmatter ?? {};
  const imageId =
    (fm as any).cover ||
    fm.image ||
    (fm as any).hero ||
    (fm as any).thumbnail ||
    null;
  
  if (!imageId) return null;

  const postImage = PlaceHolderImages.find(p => p.id === imageId);
  return postImage ? postImage.imageUrl : null;
}

function getPostContent(post: any) {
  // Selon ta lib, ça peut être post.content, post.body, post.raw, etc.
  return post?.content || post?.body || post?.raw || "";
}

export default function BlogPageClient({ posts }: { posts: Post<PostFrontmatter>[] }) {

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  const allTags = useMemo(() => {
    const tags = posts.flatMap((p: Post<PostFrontmatter>) => safeTags(p?.frontmatter?.tags));
    return Array.from(new Set(tags)).sort((a, b) => a.localeCompare(b, "fr"));
  }, [posts]);

  // Featured = 1er article taggé "À la une" ou "Featured" sinon le plus récent
  const featured = useMemo(() => {
    const withFlag = posts.find((p: Post<PostFrontmatter>) => {
      const tags = safeTags(p?.frontmatter?.tags).map((t) => t.toLowerCase());
      return tags.includes("à la une") || tags.includes("featured");
    });

    if (withFlag) return withFlag;

    return [...posts].sort((a: Post<PostFrontmatter>, b: Post<PostFrontmatter>) => {
      const da = new Date(a.frontmatter.date).getTime();
      const db = new Date(b.frontmatter.date).getTime();
      return db - da;
    })[0];
  }, [posts]);

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("Tous");
  const [sortKey, setSortKey] = useState<SortKey>("recent");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = posts.filter((p: Post<PostFrontmatter>) => p?.slug && p?.frontmatter?.title);

    const byTag =
      activeTag === "Tous"
        ? list
        : list.filter((p: Post<PostFrontmatter>) => safeTags(p.frontmatter.tags).includes(activeTag));

    const byQuery =
      !q
        ? byTag
        : byTag.filter((p: Post<PostFrontmatter>) => {
            const title = String(p.frontmatter.title ?? "").toLowerCase();
            const desc = String(p.frontmatter.description ?? "").toLowerCase();
            const tags = safeTags(p.frontmatter.tags).join(" ").toLowerCase();
            return title.includes(q) || desc.includes(q) || tags.includes(q);
          });

    const sorted = [...byQuery].sort((a: Post<PostFrontmatter>, b: Post<PostFrontmatter>) => {
      if (sortKey === "title") {
        return String(a.frontmatter.title).localeCompare(String(b.frontmatter.title), "fr");
      }
      const da = new Date(a.frontmatter.date).getTime();
      const db = new Date(b.frontmatter.date).getTime();
      return sortKey === "oldest" ? da - db : db - da;
    });

    // Option : retirer le featured de la grille pour éviter doublon
    return sorted.filter((p) => p.slug !== featured?.slug);
  }, [posts, query, activeTag, sortKey, featured?.slug]);

  const featuredCover = featured ? getPostCover(featured) : null;

  return (
    <div className="bg-background text-foreground">
      {/* HERO PREMIUM */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-muted/40 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Breadcrumbs items={breadcrumbItems} centered />
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Analyses & conseils — sécurité privée, gardiennage, sûreté
            </div>

            <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Notre Blog
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Des contenus utiles, concrets et exigeants : méthodes, réglementation, retours d’expérience,
              et bonnes pratiques terrain.
            </p>

            {/* SEARCH + FILTERS */}
            <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un article (ex: SSIAP, rondes, événementiel…)…"
                  className="h-11 pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={sortKey === "recent" ? "default" : "outline"}
                  className="h-11 rounded-xl"
                  onClick={() => setSortKey("recent")}
                >
                  Récent
                </Button>
                <Button
                  variant={sortKey === "oldest" ? "default" : "outline"}
                  className="h-11 rounded-xl"
                  onClick={() => setSortKey("oldest")}
                >
                  Ancien
                </Button>
                <Button
                  variant={sortKey === "title" ? "default" : "outline"}
                  className="h-11 rounded-xl"
                  onClick={() => setSortKey("title")}
                >
                  A–Z
                </Button>
              </div>

              <Button
                variant="outline"
                className="h-11 rounded-xl"
                onClick={() => {
                  setQuery("");
                  setActiveTag("Tous");
                  setSortKey("recent");
                }}
              >
                Réinitialiser
              </Button>
            </div>

            {/* TAGS */}
            {allTags.length > 0 && (
              <div className="no-scrollbar mt-6 flex items-center justify-center gap-2 overflow-x-auto py-1">
                <button
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm transition",
                    activeTag === "Tous"
                      ? "border-border bg-muted/40 text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                  )}
                  onClick={() => setActiveTag("Tous")}
                  type="button"
                >
                  Tous
                </button>

                {allTags.map((t) => (
                  <button
                    key={t}
                    className={cn(
                      "shrink-0 rounded-full border px-4 py-2 text-sm transition",
                      activeTag === t
                        ? "border-border bg-muted/40 text-foreground"
                        : "border-border text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                    )}
                    onClick={() => setActiveTag(t)}
                    type="button"
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURED (À LA UNE) */}
      {featured ? (
        <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            À la une
          </div>

          <Link href={`/blog/${featured.slug}`} className="mt-4 block">
            <div className="grid gap-6 overflow-hidden rounded-3xl border border-border bg-background md:grid-cols-[1.3fr_1fr]">
              {/* Image paysage */}
              <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[320px]">
                {featuredCover ? (
                  <Image
                    src={featuredCover}
                    alt={featured.frontmatter.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted/30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Contenu */}
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">À la une</Badge>
                  {safeTags(featured.frontmatter.tags).slice(0, 2).map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>

                <h2 className="mt-4 font-headline text-2xl font-bold md:text-3xl">
                  {featured.frontmatter.title}
                </h2>

                <p className="mt-3 text-muted-foreground">
                  {featured.frontmatter.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span>
                    {format(new Date(featured.frontmatter.date), "dd MMMM yyyy", { locale: fr })}
                  </span>
                  <span className="opacity-40">•</span>
                  <span>{readingTimeFrom(getPostContent(featured)) ?? "Lecture"}</span>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                  Lire l’article <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      ) : null}

      {/* GRID LISTING */}
      <section className="container mx-auto max-w-6xl px-4 pb-16 md:pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-headline text-2xl font-bold md:text-3xl">
              Tous les articles
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {filtered.length} article{filtered.length > 1 ? "s" : ""} affiché
              {filtered.length > 1 ? "s" : ""} (hors mise en avant).
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            Astuce : tague un article avec <span className="font-semibold">“À la une”</span> pour le mettre en avant.
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post: Post<PostFrontmatter>) => {
            const cover = getPostCover(post);
            const tags = safeTags(post.frontmatter.tags);
            const dateLabel = format(new Date(post.frontmatter.date), "dd MMMM yyyy", { locale: fr });

            return (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
                <Card className="h-full overflow-hidden rounded-3xl border-border bg-background transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted/20">
                    {cover ? (
                      <Image
                        src={cover}
                        alt={post.frontmatter.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted/30" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
                  </div>

                  <CardHeader className="p-6">
                    <p className="text-sm text-muted-foreground">{dateLabel}</p>

                    <CardTitle className="mt-2 leading-snug">
                      {post.frontmatter.title}
                    </CardTitle>

                    <CardDescription className="mt-2">
                      {post.frontmatter.description}
                    </CardDescription>

                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tags.slice(0, 4).map((tag: string) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                      Lire <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="mt-12 rounded-3xl border border-border bg-muted/10 p-8 text-center">
            <div className="mx-auto max-w-xl">
              <h3 className="font-headline text-xl font-bold">Aucun résultat</h3>
              <p className="mt-2 text-muted-foreground">
                Essaie un autre mot-clé ou retire un filtre.
              </p>
              <Button
                className="mt-5 rounded-xl"
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setActiveTag("Tous");
                  setSortKey("recent");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* CTA Newsletter / Conversion */}
      <section className="border-t border-border bg-muted/10">
        <div className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-8 rounded-3xl border border-border bg-background p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="font-headline text-2xl font-bold md:text-3xl">
                Recevoir les meilleurs conseils
              </h3>
              <p className="mt-3 text-muted-foreground">
                1 email occasionnel : méthodes, checklists, retours terrain, conformité.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input className="h-11 w-full sm:w-[280px]" placeholder="Votre email" />
              <Button className="h-11 rounded-xl">
                S’abonner
              </Button>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Pas de spam. Désinscription en 1 clic.
          </p>
        </div>
      </section>
    </div>
  );
}
