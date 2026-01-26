
import { notFound } from "next/navigation";
import { environmentsData } from "@/lib/environments-data";
import type { Metadata } from 'next';

// This function tells Next.js which slugs to pre-render at build time.
export function generateStaticParams() {
  return environmentsData.map((e) => ({ slug: e.slug }));
}

// This function generates metadata for each specific environment page.
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const env = environmentsData.find((e) => e.slug === params.slug);
  if (!env) notFound();

  return {
    title: env.metaTitle,
    description: env.metaDescription,
    alternates: {
      canonical: `/environnements/${env.slug}`,
    },
  };
}

export default function EnvPage({ params }: { params: { slug: string } }) {
  const env = environmentsData.find((e) => e.slug === params.slug);
  if (!env) notFound();

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">{env.heroTitle}</h1>
      <p className="mt-4 text-lg">{env.heroDescription}</p>
    </main>
  );
}
