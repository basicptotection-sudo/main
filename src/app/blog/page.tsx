import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogPageClient from "./blog-page-client";
import { siteConfig } from "@/lib/config";
import { PlaceHolderImages } from "@/lib/placeholder-images";

function toAbsolute(path: string) {
  const base = (siteConfig?.url || "").replace(/\/$/, "");
  if (!base) return path.startsWith("/") ? path : `/${path}`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const metadata: Metadata = {
  title: "Blog | Basic Protection Privée — Conseils & analyses sécurité privée",
  description:
    "Conseils, méthodes et analyses sur la sécurité privée : gardiennage, rondes, contrôle d’accès, sécurité événementielle, bonnes pratiques et conformité.",
  alternates: { canonical: toAbsolute("/blog") },
  openGraph: {
    title: "Blog | Basic Protection Privée",
    description:
      "Conseils et analyses sur la sécurité privée : gardiennage, rondes, contrôle d’accès, événementiel.",
    url: toAbsolute("/blog"),
    siteName: siteConfig?.name || "Basic Protection Privée",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Basic Protection Privée",
    description:
      "Conseils et analyses sur la sécurité privée : gardiennage, rondes, contrôle d’accès, événementiel.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog | Basic Protection Privée",
    url: toAbsolute("/blog"),
    description:
      "Conseils, méthodes et analyses sur la sécurité privée : gardiennage, rondes, contrôle d’accès, sécurité événementielle, bonnes pratiques et conformité.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: toAbsolute("/images/logo-clair.png"),
      },
    },
    blogPost: posts.map((post) => {
      const postImage = PlaceHolderImages.find((p) => p.id === post.frontmatter.image);
      const imageUrl = postImage
        ? postImage.imageUrl.startsWith("http")
          ? postImage.imageUrl
          : toAbsolute(postImage.imageUrl)
        : toAbsolute(siteConfig.ogImage);

      return {
        "@type": "BlogPosting",
        headline: post.frontmatter.title,
        url: toAbsolute(`/blog/${post.slug}`),
        datePublished: post.frontmatter.date,
        author: {
          "@type": "Organization",
          name: post.frontmatter.author,
          url: siteConfig.url,
        },
        image: imageUrl,
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPageClient posts={posts} />
    </>
  );
}
