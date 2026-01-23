import type { Metadata } from "next";
import Link from "next/link";

import { locationsData } from "@/lib/locations-data";
import { siteConfig } from "@/lib/config";
import { PlaceHolderImages } from "@/lib/placeholder-images";

import { HeroSection, CoverageSection, AnimateOnScroll, Breadcrumbs } from "@/components/shared";
import { CTASection } from "@/components/shared/cta-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Zones d’intervention — Sécurité privée en Île-de-France",
  description:
    "Basic Protection Privée intervient en Île-de-France : 78, 75, 92, 93, 94, 95, 77, 91. Dispositifs sur mesure : gardiennage, cynophile, SSIAP, rondes, protection rapprochée, événementiel, audit.",
  alternates: {
    canonical: `${siteConfig.url}/zones`,
  },
};

type ZoneLink = { name: string; href: string; key: string };

function normalizeTel(phoneE164?: string, fallback?: string) {
  if (phoneE164) return `tel:${phoneE164}`;
  const raw = (fallback ?? "").replace(/\s/g, "");
  return raw ? `tel:${raw}` : "tel:";
}

export default function ZonesHubPage() {
  const heroImage =
    PlaceHolderImages.find((p) => p.id === "zones-hub") ??
    PlaceHolderImages.find((p) => p.id === "hero");

  const phoneHref = normalizeTel((siteConfig.contact as any).phoneE164, siteConfig.contact.phone);

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Zones d’intervention", href: "/zones" },
  ];

  // 1) Données existantes
  const zonesFromData: ZoneLink[] = locationsData.map((loc) => ({
    name: loc.name,
    href: `/zones/${loc.slug}`,
    key: `data-${loc.slug}`,
  }));

  // 2) On complète avec les départements IDF si jamais ils ne sont pas tous dans locationsData
  // (tu peux aussi décider de les stocker directement dans locationsData, mais là c’est robuste)
  const idfDepartments: ZoneLink[] = [
    { name: "Yvelines (78)", href: "/zones/yvelines-78", key: "idf-78" },
    { name: "Paris (75)", href: "/zones/paris-75", key: "idf-75" },
    { name: "Hauts-de-Seine (92)", href: "/zones/hauts-de-seine-92", key: "idf-92" },
    { name: "Seine-Saint-Denis (93)", href: "/zones/seine-saint-denis-93", key: "idf-93" },
    { name: "Val-de-Marne (94)", href: "/zones/val-de-marne-94", key: "idf-94" },
    { name: "Val-d’Oise (95)", href: "/zones/val-doise-95", key: "idf-95" },
    { name: "Seine-et-Marne (77)", href: "/zones/seine-et-marne-77", key: "idf-77" },
    { name: "Essonne (91)", href: "/zones/essonne-91", key: "idf-91" },
  ];

  // 3) Déduplication
  const map = new Map<string, ZoneLink>();
  [...idfDepartments, ...zonesFromData].forEach((z) => {
    // clé de dédup basée sur href (le plus fiable)
    map.set(z.href, z);
  });

  const zonesForGrid = Array.from(map.values()).map(({ name, href }) => ({ name, href }));

  return (
    <div className="bg-background text-foreground">
      <HeroSection
        title="Zones d’intervention : Île-de-France (78 • 75 • 92 • 93 • 94 • 95 • 77 • 91)"
        description="Une présence opérationnelle sur les départements clés, avec une organisation flexible pour déployer rapidement des dispositifs adaptés : gardiennage, rondes, SSIAP, cynophile, protection rapprochée, événementiel et audit de sûreté."
        cta1={{ label: "Voir les zones", href: "#zones-list" }}
        cta2={{ label: "Appeler", href: phoneHref, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? "Zone d’intervention — Basic Protection Privée"}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="py-0 mb-4" />}
      />

      <AnimateOnScroll>
        <section className="container mx-auto max-w-5xl px-4 py-10 md:py-12">
          <div className="rounded-2xl border p-6 md:p-8">
            <h2 className="font-headline text-xl font-semibold md:text-2xl">
              Une sécurité adaptée aux réalités de chaque zone
            </h2>
            <p className="mt-2 text-muted-foreground">
              Paris (luxe & événements), La Défense (tours & bureaux), 93 (logistique & chantiers),
              94 (axes et zones d’activités), 78 (résidentiel & sites d’entreprise)…
              Nous calibrons le dispositif selon vos flux, vos horaires et votre niveau de risque.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["78", "75", "92", "93", "94", "95", "77", "91"].map((d) => (
                <Badge key={d} variant="secondary">
                  Île-de-France {d}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section id="zones-list">
          <CoverageSection
            title="Explorez nos départements d’intervention"
            description="Choisissez votre zone de besoin : chaque page présente les enjeux locaux et les services les plus adaptés."
            zones={zonesForGrid}
          />
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="container mx-auto max-w-5xl px-4 pb-14 md:pb-16">
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/villes" className="block">
              <Card className="h-full rounded-2xl transition-colors hover:bg-muted/40">
                <CardHeader>
                  <CardTitle className="text-base">Pages par ville</CardTitle>
                  <CardDescription>
                    Des contenus locaux selon les besoins : boutiques de luxe, immeubles de bureaux, chantiers, entrepôts…
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/services" className="block">
              <Card className="h-full rounded-2xl transition-colors hover:bg-muted/40">
                <CardHeader>
                  <CardTitle className="text-base">Voir tous les services</CardTitle>
                  <CardDescription>
                    Agent qualifié, cynophile, SSIAP, rondier, protection rapprochée, événementiel, audit & conseil.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CTASection
          id="contact"
          title="Expliquez votre besoin — on dimensionne le dispositif"
          description="Site, horaires, flux, niveau de risque : nous revenons vers vous avec une proposition claire et adaptée."
          cta={{ label: "Demander un devis", href: "/devis" }}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="container mx-auto max-w-5xl px-4 pb-16 md:pb-20">
          <div className="text-center text-sm text-muted-foreground">
            Besoin d’un échange rapide ?{" "}
            <a className="underline underline-offset-4 hover:text-foreground" href={phoneHref}>
              Appelez-nous
            </a>{" "}
            ou écrivez à{" "}
            <a
              className="underline underline-offset-4 hover:text-foreground"
              href={`mailto:${siteConfig.contact.email}`}
            >
              {siteConfig.contact.email}
            </a>
            .
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
}
