import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getPostBySlug, getPostFilePaths } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import ArticleJsonLd from "@/components/seo/article-json-ld";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Tag } from "@/components/blog/tag";
import { Breadcrumbs } from "@/components/shared";
import { useMDXComponents } from "@/mdx-components";

type BlogPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getPostFilePaths().map((path) => ({
    slug: path.replace(/\.mdx$/, ""),
  }));
}

function readingTimeFromText(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (!words) return null;
  const minutes = Math.max(3, Math.round(words / 200));
  return `${minutes} min`;
}

function canonicalFor(slug: string) {
  return `/blog/${slug}`;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  try {
    const { data, content } = getPostBySlug(params.slug);

    const title = data.title;
    const description = data.description;
    const canonical = canonicalFor(params.slug);

    const postImage = PlaceHolderImages.find((p) => p.id === data.image);
    const ogImage = postImage?.imageUrl;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        type: "article",
        title,
        description,
        url: canonical,
        images: ogImage ? [{ url: ogImage }] : undefined,
      },
      twitter: {
        card: ogImage ? "summary_large_image" : "summary",
        title,
        description,
        images: ogImage ? [ogImage] : undefined,
      },
      // Optionnel : keywords si tu as data.keywords
      // keywords: data.keywords,
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = params;

  try {
    const { data, content } = getPostBySlug(slug);

    const postImage = PlaceHolderImages.find((p) => p.id === data.image);
    const dateLabel = format(new Date(data.date), "dd MMMM yyyy", { locale: fr });
    const readingTime = readingTimeFromText(content);

    const breadcrumbItems = [
      { label: "Accueil", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: data.title, href: `/blog/${slug}` },
    ];

    return (
      <>
        <ArticleJsonLd post={data} slug={slug} />

        <div className="bg-background text-foreground">
          {/* HERO éditorial */}
          <header className="relative overflow-hidden border-b border-border">
            <div className="absolute inset-0 -z-10">
              {/* fond doux */}
              <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
              {/* halo */}
              <div className="absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-muted/40 blur-3xl" />
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
              <Breadcrumbs items={breadcrumbItems} className="p-0 mb-6" />

              <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
                {/* Bloc titre */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(data.tags) &&
                      data.tags.map((tag) => <Tag key={tag} tag={tag} />)}
                  </div>

                  <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight md:text-5xl">
                    {data.title}
                  </h1>

                  {data.description ? (
                    <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                      {data.description}
                    </p>
                  ) : null}

                  <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span>
                      Par{" "}
                      <span className="font-medium text-foreground">
                        {data.author}
                      </span>
                    </span>
                    <span className="opacity-40">•</span>
                    <span>{dateLabel}</span>
                    {readingTime ? (
                      <>
                        <span className="opacity-40">•</span>
                        <span>{readingTime}</span>
                      </>
                    ) : null}
                  </div>
                </div>

                {/* Carte infos (desktop) */}
                <div className="rounded-3xl border border-border bg-background/70 p-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="text-sm font-semibold">En bref</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Vous avez un besoin concret (site, horaires, contraintes) ? On peut
                    cadrer une solution rapidement.
                  </p>

                  <div className="mt-4 flex flex-col gap-2">
                    <Link
                      href="/devis"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                      Demander un devis
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium hover:bg-muted/30"
                    >
                      Voir nos services
                    </Link>
                  </div>

                  <div className="mt-5 rounded-2xl border border-border bg-muted/10 p-4">
                    <div className="text-sm font-semibold">Conseil</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Plus votre contexte est précis, plus la proposition est rapide et pertinente.
                    </p>
                  </div>
                </div>
              </div>

              {/* Image principale (paysage) */}
              {postImage ? (
                <div className="mt-10">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-muted/20">
                    <Image
                      src={postImage.imageUrl}
                      alt={data.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
                  </div>
                </div>
              ) : null}
            </div>
          </header>

          {/* CORPS : article + TOC */}
          <main className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
              {/* Article */}
              <article className="min-w-0">
                {/* Barre haute discrète */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm text-muted-foreground">
                    {/* Tu peux remplacer par une catégorie si tu l’ajoutes */}
                    Lecture & analyse
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/blog"
                      className="rounded-full border border-border px-4 py-2 text-sm hover:bg-muted/30"
                    >
                      ← Retour au blog
                    </Link>
                  </div>
                </div>

                {/* Prose premium */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <MDXRemote source={content} components={useMDXComponents({})} />
                </div>

                {/* Bas d’article : tags + CTA */}
                <div className="mt-10 rounded-3xl border border-border bg-muted/10 p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-sm font-semibold">Besoin d’un dispositif ?</div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Dites-nous le lieu, les horaires, les accès et les contraintes : réponse structurée.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href="/devis"
                        className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
                      >
                        Demander un devis
                      </Link>
                      <Link
                        href="/services"
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium hover:bg-muted/30"
                      >
                        Services
                      </Link>
                    </div>
                  </div>

                  {Array.isArray(data.tags) && data.tags.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {data.tags.map((tag) => (
                        <Tag key={tag} tag={tag} />
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>

              {/* Sidebar : TOC sticky + mini-carte */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-4">
                  <div className="rounded-3xl border border-border bg-background p-5">
                    <div className="text-sm font-semibold">Sommaire</div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Naviguez rapidement dans l’article.
                    </p>
                    <div className="mt-4">
                      <TableOfContents />
                    </div>
                  </div>

                  <div className="rounded-3xl border border-border bg-background p-5">
                    <div className="text-sm font-semibold">Contact rapide</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Un besoin urgent ou ponctuel ? Un cadrage rapide suffit souvent.
                    </p>
                    <Link
                      href="/devis"
                      className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                      Demander un devis
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}