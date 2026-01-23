import Link from "next/link";
import type { Metadata } from "next";

import { citiesData } from "@/lib/cities-data";
import { siteConfig } from "@/lib/config";
import { PlaceHolderImages } from "@/lib/placeholder-images";

import {
  HeroSection,
  CoverageSection,
  AnimateOnScroll,
  Breadcrumbs,
} from "@/components/shared";

export const metadata: Metadata = {
  title: "Villes couvertes — Sécurité privée en Île-de-France",
  description:
    "Découvrez nos pages locales par ville : sécurité privée, gardiennage, rondes, SSIAP, cynophile, événementiel et protection rapprochée en Île-de-France.",
  alternates: { canonical: "/villes" },
};

type CityLink = { name: string; href: string };

function groupByDepartment() {
  const map = new Map<string, CityLink[]>();

  for (const c of citiesData) {
    const list = map.get(c.department) ?? [];
    list.push({ name: c.title.replace("Sécurité Privée ", ""), href: `/villes/${c.slug}` });
    map.set(c.department, list);
  }

  // tri villes par nom
  for (const [k, list] of map.entries()) {
    list.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    map.set(k, list);
  }

  // tri départements
  return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0], "fr"));
}

export default function VillesHubPage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "zones-hub") ?? PlaceHolderImages.find((p) => p.id === "hero");

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Villes", href: "/villes" },
  ];

  // Petite liste rapide “top villes” (optionnel)
  const topCities: CityLink[] = [
    { name: "Paris 8e", href: "/villes/paris-8-75008" },
    { name: "Paris 16e", href: "/villes/paris-16-75016" },
    { name: "La Défense", href: "/villes/la-defense-92400" },
    { name: "Saint-Denis", href: "/villes/saint-denis-93200" },
    { name: "Rungis", href: "/villes/rungis-94150" },
    { name: "Plaisir", href: "/villes/plaisir-78370" },
  ].filter((x, i, arr) => arr.findIndex((y) => y.href === x.href) === i);

  const grouped = groupByDepartment();

  return (
    <>
      <HeroSection
        title="Villes prioritaires — Sécurité privée locale en Île-de-France"
        description="Nous créons des pages par ville pour répondre aux besoins réels du terrain : luxe, bureaux, chantiers, logistique, événementiel, résidentiel et pôles tech."
        cta1={{ label: "Voir les villes", href: "#villes" }}
        cta2={{ label: "Demander un devis", href: "/devis", variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? "Sécurité privée en Île-de-France"}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="py-0 mb-4" />}
      />

      <AnimateOnScroll>
        <section id="villes" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                Pages “Ville” : du contenu utile, pas dupliqué
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Chaque page adapte les cas d’usage, la FAQ et les mises en avant de services
                selon les spécificités locales.
              </p>
            </div>

            <div className="mt-10 max-w-4xl mx-auto">
              <CoverageSection
                title="Villes prioritaires"
                description="Les zones où la demande est la plus forte (selon les profils : luxe, bureaux, chantiers, logistique, événementiel…)."
                zones={topCities}
              />
            </div>

            <div className="mt-16 space-y-10 max-w-5xl mx-auto">
              {grouped.map(([dept, cities]) => (
                <div key={dept} className="rounded-2xl border bg-card p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-headline font-semibold">
                    {dept}
                  </h3>
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {cities.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="rounded-lg border bg-background px-3 py-2 text-sm hover:bg-muted/40 transition-colors"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center text-sm text-muted-foreground">
              Besoin urgent ?{" "}
              <a className="underline underline-offset-4 hover:text-foreground" href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                Appelez-nous
              </a>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </>
  );
}
