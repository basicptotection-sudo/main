"use client";

import React, { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Breadcrumbs } from "@/components/shared";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowRight, Search, Sparkles, TrendingUp } from "lucide-react";

import type { Post, PostFrontmatter } from "@/lib/blog";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Separator } from "@/components/ui/separator";

type SortKey = "recent" | "oldest" | "title";

function safeTags(tags: any): string[] {
  if (!Array.isArray(tags)) return [];
  return tags.map((t) => String(t).trim()).filter(Boolean);
}

function readingTimeFrom(text?: string) {
  if (!text) return null;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (!words) return null;
  const minutes = Math.max(3, Math.round(words / 200));
  return `${minutes} min`;
}

function getPostCover(post: Post<PostFrontmatter>) {
  const fm = post?.frontmatter ?? {};
  const imageId =
    (fm as any).cover ||
    (fm as any).image ||
    (fm as any).hero ||
    (fm as any).thumbnail ||
    null;

  if (!imageId) return null;

  const postImage = PlaceHolderImages.find((p) => p.id === imageId);
  return postImage ? postImage.imageUrl : null;
}

function getPostContent(post: any) {
  return post?.content || post?.body || post?.raw || "";
}

function isFeatured(post: Post<PostFrontmatter>) {
  const tags = safeTags(post?.frontmatter?.tags).map((t) => t.toLowerCase());
  return tags.includes("à la une") || tags.includes("a la une") || tags.includes("featured");
}

export default function BlogPageClient({ posts }: { posts: Post<PostFrontmatter>[] }) {
  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  const allTags = useMemo(() => {
    const tags = posts.flatMap((p) => safeTags(p?.frontmatter?.tags));
    return Array.from(new Set(tags)).sort((a, b) => a.localeCompare(b, "fr"));
  }, [posts]);

  const featured = useMemo(() => {
    const withFlag = posts.find(isFeatured);
    if (withFlag) return withFlag;

    return [...posts]
      .filter((p) => p?.slug && p?.frontmatter?.title && p?.frontmatter?.date)
      .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())[0];
  }, [posts]);

  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const [activeTag, setActiveTag] = useState<string>("Tous");
  const [sortKey, setSortKey] = useState<SortKey>("recent");

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();

    const baseList = posts.filter((p) => p?.slug && p?.frontmatter?.title);

    const byTag =
      activeTag === "Tous"
        ? baseList
        : baseList.filter((p) => safeTags(p.frontmatter.tags).includes(activeTag));

    const byQuery =
      !q
        ? byTag
        : byTag.filter((p) => {
            const title = String(p.frontmatter.title ?? "").toLowerCase();
            const desc = String(p.frontmatter.description ?? "").toLowerCase();
            const tags = safeTags(p.frontmatter.tags).join(" ").toLowerCase();
            return title.includes(q) || desc.includes(q) || tags.includes(q);
          });

    const sorted = [...byQuery].sort((a, b) => {
      if (sortKey === "title") {
        return String(a.frontmatter.title).localeCompare(String(b.frontmatter.title), "fr");
      }
      const da = new Date(a.frontmatter.date).getTime();
      const db = new Date(b.frontmatter.date).getTime();
      return sortKey === "oldest" ? da - db : db - da;
    });

    return sorted.filter((p) => p.slug !== featured?.slug);
  }, [posts, deferredQuery, activeTag, sortKey, featured?.slug]);

  const featuredCover = featured ? getPostCover(featured) : null;

  return (
    <div className="bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-muted/40 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <Breadcrumbs items={breadcrumbItems} centered />

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Analyses & conseils — sécurité privée, gardiennage, sûreté
            </div>

            <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Blog & Analyses
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
              Des contenus utiles, concrets et exigeants : méthodes, réglementation, retours d’expérience,
              et bonnes pratiques terrain pour les professionnels.
            </p>

            {/* Search + filter panel */}
            <div className="mt-8 mx-auto max-w-3xl rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher (ex: rondes, contrôle d’accès, événementiel…)…"
                  className="h-11 pl-10"
                />
              </div>
              <div className="mt-4 flex flex-col md:flex-row gap-3 justify-between items-center">
                <div className="flex gap-2">
                  <span className="text-sm text-muted-foreground hidden md:inline-flex items-center">Trier par :</span>
                  <Button type="button" variant={sortKey === "recent" ? "secondary" : "ghost"} size="sm" onClick={() => setSortKey("recent")}>Récent</Button>
                  <Button type="button" variant={sortKey === "oldest" ? "secondary" : "ghost"} size="sm" onClick={() => setSortKey("oldest")}>Ancien</Button>
                  <Button type="button" variant={sortKey === "title" ? "secondary" : "ghost"} size="sm" onClick={() => setSortKey("title")}>A-Z</Button>
                </div>
                <Button type="button" variant="ghost" size="sm" className="text-muted-foreground" onClick={() => { setQuery(""); setActiveTag("Tous"); setSortKey("recent"); }}>Réinitialiser</Button>
              </div>
            </div>

            {/* Tags */}
            {allTags.length > 0 && (
              <div className="no-scrollbar mt-6 flex items-center justify-center gap-2 overflow-x-auto py-1">
                <button className={cn("shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors", activeTag === 'Tous' ? 'bg-primary text-primary-foreground border-transparent' : 'bg-background hover:bg-muted/50')} onClick={() => setActiveTag('Tous')} type="button">Tous</button>
                {allTags.map((t) => (
                  <button key={t} className={cn("shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors", activeTag === t ? 'bg-primary text-primary-foreground border-transparent' : 'bg-background hover:bg-muted/50')} onClick={() => setActiveTag(t)} type="button">{t}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Live region (accessibilité) */}
      <div className="sr-only" aria-live="polite">{filtered.length} résultat{filtered.length > 1 ? "s" : ""}.</div>

      {/* Featured */}
      {featured && (
        <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="flex items-center gap-2 text-sm font-semibold mb-4">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            À la une
          </div>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="grid md:grid-cols-2 gap-8 items-center overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition-all hover:shadow-xl">
              <div className="relative aspect-[16/10] md:aspect-auto md:h-full">
                {featuredCover ? (
                  <Image src={featuredCover} alt={featured.frontmatter.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
                ) : (
                  <div className="absolute inset-0 bg-muted/30" />
                )}
              </div>
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">À la une</Badge>
                  {safeTags(featured.frontmatter.tags).slice(0, 2).map((t) => ( <Badge key={t} variant="outline">{t}</Badge> ))}
                </div>
                <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">{featured.frontmatter.title}</h2>
                <p className="mt-3 text-muted-foreground">{featured.frontmatter.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span>{format(new Date(featured.frontmatter.date), "dd MMMM yyyy", { locale: fr })}</span>
                  <span className="opacity-40">•</span>
                  <span>{readingTimeFrom(getPostContent(featured)) ?? "Lecture"}</span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">Lire l’article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Grid */}
      <section className="container mx-auto max-w-6xl px-4 pb-16 md:pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-headline text-2xl font-bold md:text-3xl">Tous les articles</h2>
            <p className="mt-2 text-sm text-muted-foreground">{filtered.length} article{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            Astuce : taguez un article “À la une” pour le mettre en avant.
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => {
            const cover = getPostCover(post);
            const tags = safeTags(post.frontmatter.tags);
            const dateLabel = format(new Date(post.frontmatter.date), "dd MMMM yyyy", { locale: fr });

            return (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
                <Card className="h-full overflow-hidden rounded-3xl border-border bg-background transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted/20">
                    {cover ? ( <Image src={cover} alt={post.frontmatter.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 33vw" /> ) : ( <div className="absolute inset-0 bg-muted/30" /> )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
                  </div>
                  <CardHeader className="p-6">
                    <p className="text-sm text-muted-foreground">{dateLabel}</p>
                    <CardTitle className="mt-2 leading-snug">{post.frontmatter.title}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">{post.frontmatter.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-6 pt-0">
                    <div className="flex items-center text-sm font-medium text-primary">Lire l'article <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" /></div>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed bg-muted/20 p-8 text-center">
            <div className="mx-auto max-w-xl">
              <h3 className="font-headline text-xl font-bold">Aucun article ne correspond à votre recherche</h3>
              <p className="mt-2 text-muted-foreground">Essayez un autre mot-clé ou retirez un filtre.</p>
              <Button type="button" className="mt-5 rounded-xl" variant="outline" onClick={() => { setQuery(""); setActiveTag("Tous"); setSortKey("recent"); }}>Réinitialiser les filtres</Button>
            </div>
          </div>
        )}
      </section>

      {/* CTA bas */}
      <section className="border-t border-border bg-muted/20">
        <div className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-8 rounded-3xl border border-border bg-background p-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="font-headline text-2xl font-bold md:text-3xl">Recevez nos meilleures analyses</h3>
              <p className="mt-3 text-muted-foreground">Un e-mail occasionnel avec des méthodes, checklists, retours terrain, et conseils sur la conformité réglementaire.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input className="h-11 w-full sm:w-auto flex-grow" placeholder="Votre adresse e-mail" type="email" />
              <Button className="h-11 rounded-xl" type="button">S’inscrire</Button>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">Désinscription en 1 clic. Pas de spam.</p>
        </div>
      </section>
    </div>
  );
}
