import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/config";
import { servicesData } from "@/lib/services-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

// ✅ Imports directs (exports nommés) = pas de 404 fantôme + pas d'erreur default export
import { HeroSection } from "@/components/shared/hero-section";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ServicesGrid } from "@/components/shared/services-grid";
import { CTASection } from "@/components/shared/cta-section";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function toAbsolute(path: string) {
  const base = String(siteConfig?.url ?? "").replace(/\/$/, "");
  if (!base) return path.startsWith("/") ? path : `/${path}`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function safePhoneHref() {
  const raw = String((siteConfig.contact as any)?.phoneE164 ?? siteConfig.contact?.phone ?? "")
    .trim()
    .replace(/\s+/g, "");
  return `tel:${raw}`;
}

export const metadata: Metadata = {
  title: "Services de sécurité privée en Île-de-France | Basic Protection Privée",
  description:
    "Agents de sécurité qualifiés, cynophiles, SSIAP, rondes, protection rapprochée, sécurité événementielle et audit de sûreté. Intervention en Île-de-France (Paris, 78, 92, 93, 94, 95, 77, 91).",
  alternates: { canonical: toAbsolute("/services") },
  openGraph: {
    type: "website",
    url: toAbsolute("/services"),
    title: "Services de sécurité privée en Île-de-France | Basic Protection Privée",
    description:
      "Prestations terrain et premium : gardiennage, SSIAP, cynophile, rondes, événementiel, audit & protection rapprochée. Dispositifs sur mesure, pilotage rigoureux.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Services de sécurité privée en Île-de-France | Basic Protection Privée",
    description:
      "Agents qualifiés, SSIAP, cynophile, rondes, événementiel, audit & protection rapprochée. Intervention Île-de-France.",
  },
};

export default function ServicesHubPage() {
  const heroImage =
    PlaceHolderImages.find((p) => p.id === "services-hub") ??
    PlaceHolderImages.find((p) => p.id === "hero");

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
  ];

  const phoneHref = safePhoneHref();

  const terrainSlugs = new Set([
    "agent-securite-qualifie",
    "agent-cynophile",
    "agent-incendie-ssiap",
    "agent-rondier",
  ]);

  const premiumSlugs = new Set([
    "protection-rapprochee",
    "securite-evenementielle",
    "audit-conseil-surete",
  ]);

  const terrainServices = servicesData
    .filter((s) => terrainSlugs.has(s.slug))
    .map((service) => ({
      icon: service.icon,
      title: service.title,
      description: service.shortDescription,
      href: `/services/${service.slug}`,
    }));

  const premiumServices = servicesData
    .filter((s) => premiumSlugs.has(s.slug))
    .map((service) => ({
      icon: service.icon,
      title: service.title,
      description: service.shortDescription,
      href: `/services/${service.slug}`,
    }));

  // ✅ JSON-LD : URLs absolues
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((it, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: it.label,
          item: toAbsolute(it.href),
        })),
      },
      {
        "@type": "ItemList",
        name: "Services de sécurité privée",
        itemListElement: servicesData.map((s, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: toAbsolute(`/services/${s.slug}`),
          name: s.title,
        })),
      },
    ],
  };

  return (
    <div className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection
        title="Services de sécurité sur mesure"
        description="Des prestations terrain aux dispositifs premium : une méthode claire, des agents qualifiés et un pilotage rigoureux pour sécuriser durablement vos enjeux."
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Appeler un expert", href: phoneHref, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? "Services de sécurité privée — Basic Protection Privée"}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="py-0 mb-4" />}
      />

      {/* INTRO — épurée & orientée décision */}
      <AnimateOnScroll>
        <section className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Cadrage • Exécution • Suivi
            </Badge>

            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary">
              Une offre complète, structurée en 2 pôles
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              Nous séparons les prestations <strong>opérationnelles</strong> (sécurisation quotidienne) des dispositifs{" "}
              <strong>premium</strong> (exigence, discrétion, environnements sensibles). Même standard : cadrage, consignes,
              supervision et reporting.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card className="border-0 bg-muted/40 text-center rounded-2xl">
              <CardHeader>
                <CardTitle className="font-headline text-xl">Cadrage</CardTitle>
                <CardDescription>Site, flux, accès, horaires : on dimensionne avant de déployer.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-muted/40 text-center rounded-2xl">
              <CardHeader>
                <CardTitle className="font-headline text-xl">Encadrement</CardTitle>
                <CardDescription>Agents sélectionnés, consignes claires, contrôles qualité.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-muted/40 text-center rounded-2xl">
              <CardHeader>
                <CardTitle className="font-headline text-xl">Traçabilité</CardTitle>
                <CardDescription>Main courante / rapports / points de suivi : une mission lisible.</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/devis">Obtenir un devis structuré</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-xl">
              <a href={phoneHref}>Parler à un responsable</a>
            </Button>
          </div>
        </section>
      </AnimateOnScroll>

      {/* SERVICES — Terrain */}
      <AnimateOnScroll>
        <ServicesGrid
          id="services-terrain"
          title="Services opérationnels"
          description="Surveillance, contrôle d’accès, rondes, SSIAP : les fondamentaux exécutés avec rigueur et supervision."
          services={terrainServices}
          className="bg-muted/30"
        />
      </AnimateOnScroll>

      {/* SERVICES — Premium */}
      <AnimateOnScroll>
        <ServicesGrid
          id="services-premium"
          title="Services premium"
          description="Dispositifs discrets et sur-mesure : protection rapprochée, événementiel, audit & conseil en sûreté."
          services={premiumServices}
          gridClassName="lg:grid-cols-3"
          className="bg-card"
        />
      </AnimateOnScroll>

      {/* CTA zones — conversion */}
      <AnimateOnScroll>
        <CTASection
          title="Couverture complète en Île-de-France"
          description="Basés dans les Yvelines (78), nous intervenons rapidement sur Paris et tous les départements franciliens, selon vos horaires et contraintes."
          cta={{ label: "Voir nos zones d’intervention", href: "/zones" }}
          secondaryCta={{ label: "Demander un devis", href: "/devis" }}
          highlights={["Réactivité Île-de-France", "Agents qualifiés", "Discrétion & méthode"]}
          className="bg-muted/30"
        />
      </AnimateOnScroll>

      {/* Final CTA — minimal */}
      <AnimateOnScroll>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="font-headline text-3xl font-bold text-primary">
              Prêt à sécuriser votre activité ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Dites-nous le lieu, les horaires, les accès et vos contraintes : réponse rapide avec une proposition claire.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-xl">
                <Link href="/devis">Obtenir un devis</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl">
                <a href={phoneHref}>Appeler maintenant</a>
              </Button>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
}
