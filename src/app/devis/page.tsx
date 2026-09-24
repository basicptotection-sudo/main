import type { Metadata } from "next";
import { Suspense } from "react";
import { servicesData } from "@/lib/services-data";
import DevisPageClient from "@/components/devis/page-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Demande de Devis - Sécurité Privée",
  description:
    "Obtenez une proposition sur-mesure pour nos services de sécurité privée. Remplissez notre formulaire pour une analyse confidentielle de vos besoins.",
  alternates: {
    canonical: "/devis",
  },
};

type SearchParams = Record<string, string | string[] | undefined>;
type PageProps = { searchParams: Promise<SearchParams> };

export default async function DevisPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          Chargement du formulaire...
        </div>
      }
    >
      <DevisPageClient searchParams={sp} services={servicesData.map(({ slug, title }) => ({ slug, title }))} />
    </Suspense>
  );
}
