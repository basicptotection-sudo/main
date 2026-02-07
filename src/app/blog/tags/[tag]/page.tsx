import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/shared";
import { Tag } from "@/components/blog/tag";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

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

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = posts
    .flatMap((p) => (Array.isArray(p.frontmatter.tags) ? p.frontmatter.tags : []))
    .map((t) => String(t))
    .filter(Boolean);

  const slugs = Array.from(new Set(tags.map(slugifyTag))).filter(Boolean);
  return slugs.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const tagSlug = decodeURIComponent(params.tag);

  return {
    title: `Articles : ${tagSlug.replace(/-/g, " ")} | Blog Basic Protection Privée`,
    description: `Retrouvez nos conseils et analyses sur le thème : ${tagSlug.replace(/-/g, " ")}.`,
    alternates: { canonical: toAbsolute(`/blog/tags/${encodeURIComponent(tagSlug)}`) },
    openGraph: {
      title: `Articles : ${tagSlug.replace(/-/g, " ")}`,
      description: `Conseils et analyses sur : ${tagSlug.replace(/-/g, " ")}.`,
      url: toAbsolute(`/blog/tags/${encodeURIComponent(tagSlug)}`),
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Articles : ${tagSlug.replace(/-/g, " ")}`,
      description: `Conseils et analyses sur : ${tagSlug.replace(/-/g, " ")}.`,
    },
  };
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tagSlug = decodeURIComponent(params.tag);
  const allPosts = getAllPosts();

  const posts = allPosts.filter(
    (p) =>
      Array.isArray(p.frontmatter.tags) &&
      p.frontmatter.tags.some((t) => slugifyTag(String(t)) === tagSlug)
  );

  if (posts.length === 0) notFound();

  const displayTag =
    posts
      .flatMap((p) => p.frontmatter.tags)
      .map(String)
      .find((t) => slugifyTag(t) === tagSlug) || tagSlug.replace(/-/g, " ");

  const allTags = Array.from(
    new Set(
      allPosts
        .flatMap((p) => (Array.isArray(p.frontmatter.tags) ? p.frontmatter.tags : []))
        .map((t) => String(t))
        .filter(Boolean)
    )
  );

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: displayTag, href: `/blog/tags/${tagSlug}` },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <Breadcrumbs items={breadcrumbItems} centered />
        <p className="text-primary font-semibold mt-2">Catégorie</p>
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          {displayTag}
        </h1>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">
          {posts.length} article{posts.length > 1 ? "s" : ""} trouvé
          {posts.length > 1 ? "s" : ""}
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <p className="text-sm text-muted-foreground mb-2">
                    {format(new Date(post.frontmatter.date), "dd MMMM yyyy", { locale: fr })}
                  </p>
                  <CardTitle>{post.frontmatter.title}</CardTitle>
                  <CardDescription className="mt-2">{post.frontmatter.description}</CardDescription>
                </CardHeader>

                <div className="p-6 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags.map((tag) => {
                      const current = slugifyTag(String(tag)) === tagSlug;
                      return (
                        <Badge key={tag} variant={current ? "default" : "secondary"}>
                          {tag}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-xl font-bold text-center mb-4">Explorer d'autres catégories</h3>
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
          {allTags.map((tag) => (
            <Tag key={tag} tag={tag} current={slugifyTag(tag) === tagSlug} />
          ))}
        </div>
      </div>
    </div>
  );
}
