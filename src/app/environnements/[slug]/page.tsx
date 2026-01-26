
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { environmentsData } from "@/lib/environments-data";

type EnvPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return environmentsData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: EnvPageProps): Promise<Metadata> {
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

export default function EnvironnementPage({ params }: EnvPageProps) {
    const env = environmentsData.find((e) => e.slug === params.slug);
    if (!env) notFound();
    
    return (
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold">{env.heroTitle}</h1>
        <p className="mt-4 text-lg">{env.heroDescription}</p>
        <div className="mt-8 prose prose-lg dark:prose-invert">
          <p>{env.intro.paragraph}</p>
        </div>
      </main>
    );
}
