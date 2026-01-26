import Link from "next/link";
import type { Metadata } from "next";

import { citiesData } from "@/lib/cities-data";
import { siteConfig } from "@/lib/config";
import { PlaceHolderImages } from "@/lib/placeholder-images";

import { HeroSection, AnimateOnScroll, Breadcrumbs } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Villes couvertes — Sécurité privée en Île-de-France",
  description:
    "Découvrez nos pages locales par ville : sécurité privée, gardiennage, rondes, SSIAP, cynophile, événementiel et protection renforcée en Île-de-France.",
  alternates: {
    canonical: `${siteConfig.url}/villes`,
  },
  openGraph: {
    title: "Villes couvertes — Sécurité privée en Île-de-France",
    description:
      "Pages locales par ville : gardiennage, rondes, SSIAP, cynophile, événementiel et protection renforcée en Île-de-France.",
    url: `${siteConfig.url}/villes`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Villes couvertes — Sécurité privée en Île-de-France",
    description:
      "Pages locales par ville : gardiennage, rondes, SSIAP, cynophile, événementiel et protection renforcée en Île-de-France.",
  },
};

type CityLink = { name: string; href: string };
type DeptGroup = { dept: string; cities: CityLink[] };

function normalizeTel(phone?: string) {
  const raw = String(phone ?? "").replace(/\s/g, "").trim();
  return raw ? `tel:${raw}` : "tel:";
}

function cleanCityTitle(title: string) {
  // si ton dataset a des variantes, on sécurise
  return title
    .replace(/^Sécurité Privée\s*/i, "")
    .replace(/^Sécurité privée\s*/i, "")
    .trim();
}

function groupByDepartment(): DeptGroup[] {
  const map = new Map<string, CityLink[]>();

  for (const c of citiesData) {
    const dept = c.department?.trim() || "Autres";
    const list = map.get(dept) ?? [];
    list.push({
      name: cleanCityTitle(c.title),
      href: `/villes/${c.slug}`,
    });
    map.set(dept, list);
  }

  // tri villes par nom
  for (const [k, list] of map.entries()) {
    list.sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));
    map.set(k, list);
  }

  // tri départements
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0], "fr", { sensitivity: "base" }))
    .map(([dept, cities]) => ({ dept, cities }));
}

export default function VillesHubPage() {
  const heroImage =
    PlaceHolderImages.find((p) => p.id === "zones-hub") ??
    PlaceHolderImages.find((p) => p.id === "hero");

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Villes", href: "/villes" },
  ];

  const telHref = normalizeTel(siteConfig.contact.phone);

  // Top villes (maillage + conversion) — dédoublonné
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
        title="Villes couvertes — Sécurité privée locale en Île-de-France"
        description="Des pages par ville pensées pour le terrain : besoins réels, contraintes d’accès, profils de risque, ERP, chantiers, logistique, résidentiel et événementiel."
        cta1={{ label: "Voir les villes", href: "#villes" }}
        cta2={{ label: "Demander un devis", href: "/devis", variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? "Sécurité privée en Île-de-France"}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="mb-4 py-0" />}
      />

      <AnimateOnScroll>
        <section id="villes" className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Intro */}
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  Contenu local • Cas d’usage réels • FAQ adaptée
                </span>
              </div>

              <h2 className="mt-6 font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
                Pages “Ville” : du contenu utile, pas dupliqué
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Chaque page intègre des scénarios concrets, une FAQ ciblée et des services mis en avant
                selon les spécificités locales (bureaux, chantiers, ERP, logistique, événementiel…).
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                {["Gardiennage", "Rondes", "SSIAP", "Cynophile", "Événementiel"].map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Top cities */}
            <div className="mx-auto mt-12 max-w-5xl">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    Villes prioritaires
                  </CardTitle>
                  <CardDescription>
                    Zones où la demande est la plus élevée (luxe, bureaux, chantiers, logistique, événementiel…).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {topCities.map((c) => (
                      <Badge key={c.href} variant="secondary" asChild>
                        <Link href={c.href}>{c.name}</Link>
                      </Badge>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                    <Button asChild className="rounded-xl">
                      <Link href="/devis">
                        Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-xl">
                      <a href={telHref}>Appeler un expert</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Grouped list */}
            <div className="mx-auto mt-14 space-y-10 max-w-5xl">
              {grouped.map(({ dept, cities }) => (
                <section key={dept} className="rounded-2xl border bg-card p-6 md:p-8">
                  <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <h3 className="font-headline text-xl font-semibold md:text-2xl">{dept}</h3>
                    <div className="text-sm text-muted-foreground">
                      {cities.length} ville{cities.length > 1 ? "s" : ""}
                    </div>
                  </header>

                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {cities.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="rounded-xl border bg-background px-3 py-2 text-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center text-sm text-muted-foreground">
              Besoin urgent ?{" "}
              <a className="underline underline-offset-4 hover:text-foreground" href={telHref}>
                Appelez-nous
              </a>
              . Pour une demande structurée, passez par{" "}
              <Link className="underline underline-offset-4 hover:text-foreground" href="/devis">
                le formulaire de devis
              </Link>
              .
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </>
  );
}