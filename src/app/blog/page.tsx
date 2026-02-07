import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogPageClient from "./blog-page-client";
import { siteConfig } from "@/lib/config";

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
  return <BlogPageClient posts={posts} />;
}
