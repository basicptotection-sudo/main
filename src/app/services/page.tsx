import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/config";
import { servicesData } from "@/lib/services-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

import {
  HeroSection,
  ServicesGrid,
  AnimateOnScroll,
  Breadcrumbs,
  CTASection,
} from "@/components/shared";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getLucideIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";

const BRAND_ACCENT = "#2F8FD8";

export const metadata: Metadata = {
  title: "Services de sécurité privée en Île-de-France | Basic Protection Privée",
  description:
    "Agents de sécurité qualifiés, cynophiles, SSIAP, rondes, protection rapprochée, sécurité événementielle et audit de sûreté. Intervention en Île-de-France (Paris, 78, 92, 93, 94, 95, 77, 91).",
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/services`,
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

  const phoneHref = `tel:${(siteConfig.contact as any).phoneE164 ?? siteConfig.contact.phone.replace(/\s/g, "")}`;

  const terrainServices = servicesData
    .filter((s) => ["agent-securite-qualifie", "agent-cynophile", "agent-incendie-ssiap", "agent-rondier"].includes(s.slug))
    .map((service) => ({
      icon: getLucideIcon(service.icon),
      title: service.title,
      description: service.shortDescription,
      href: `/services/${service.slug}`,
    }));

  const premiumServices = servicesData
    .filter((s) => ["protection-rapprochee", "securite-evenementielle", "audit-conseil-surete"].includes(s.slug))
    .map((service) => ({
      icon: getLucideIcon(service.icon),
      title: service.title,
      description: service.shortDescription,
      href: `/services/${service.slug}`,
    }));

  // --- JSON-LD (SEO) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((it, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: it.label,
          item: `${siteConfig.url}${it.href}`,
        })),
      },
      {
        "@type": "ItemList",
        name: "Services de sécurité privée",
        itemListElement: servicesData.map((s, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: `${siteConfig.url}/services/${s.slug}`,
          name: s.title,
        })),
      },
    ],
  };

  return (
    <div className="bg-background text-foreground">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection
        title="Solutions de sécurité sur mesure"
        description="Du gardiennage de site à la protection rapprochée, nous déployons des équipes qualifiées, une méthode claire et un pilotage rigoureux pour assurer votre tranquillité."
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Appeler un expert", href: phoneHref, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? "Agent de sécurité — Basic Protection Privée"}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="py-0 mb-4" />}
      />

      {/* Introduction & Value Props */}
      <AnimateOnScroll>
        <section className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
              Une offre complète, deux pôles d'expertise
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Nous distinguons les prestations <strong>opérationnelles</strong> du quotidien et les dispositifs <strong>premium</strong> pour les besoins les plus exigeants. Chaque mission est cadrée, pilotée et exécutée avec la même rigueur.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card className="border-0 bg-muted/50 text-center">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Méthode</CardTitle>
                  <CardDescription>
                    Cadrage, déploiement, supervision : un dispositif piloté, lisible et stable.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 bg-muted/50 text-center">
                 <CardHeader>
                  <CardTitle className="font-headline text-xl">Encadrement</CardTitle>
                  <CardDescription>
                    Agents sélectionnés, consignes précises, contrôles qualité et traçabilité.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 bg-muted/50 text-center">
                 <CardHeader>
                  <CardTitle className="font-headline text-xl">Réactivité</CardTitle>
                  <CardDescription>
                    Une structure à taille humaine pour une mise en place rapide et un contact direct.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
        </section>
      </AnimateOnScroll>
      
      {/* SERVICES : Terrain */}
      <AnimateOnScroll>
        <ServicesGrid
          id="services-terrain"
          title="Services Opérationnels"
          description="Les fondamentaux de la sécurité de site : surveillance, contrôle d’accès, rondes et sécurité incendie. Des agents qualifiés, encadrés et pilotés pour une protection fiable au quotidien."
          services={terrainServices}
          className="bg-muted/30"
        />
      </AnimateOnScroll>

      {/* SERVICES : Premium */}
      <AnimateOnScroll>
        <ServicesGrid
          id="services-premium"
          title="Services Premium"
          description="Dispositifs discrets et sur-mesure pour les environnements les plus exigeants : protection rapprochée, sécurité d'événements de prestige, et missions d'audit ou de conseil en sûreté."
          services={premiumServices}
          gridClassName="lg:grid-cols-3"
          className="bg-card"
        />
      </AnimateOnScroll>

      {/* CTA Zones */}
      <AnimateOnScroll>
        <CTASection
          title="Une couverture complète de l'Île-de-France"
          description="Basés dans les Yvelines (78), nos équipes interviennent avec réactivité sur Paris et tous les départements franciliens. Découvrez nos zones et villes d'intervention prioritaires."
          cta={{ label: "Explorer nos zones d'intervention", href: "/zones" }}
          className="bg-muted/30"
        />
      </AnimateOnScroll>

      {/* Final CTA */}
      <AnimateOnScroll>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center max-w-3xl">
             <h2 className="font-headline text-3xl font-bold text-primary">Prêt à sécuriser votre activité ?</h2>
             <p className="mt-4 text-lg text-muted-foreground">
               Décrivez votre besoin, nous revenons vers vous rapidement avec une proposition claire et une approche sur-mesure.
             </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/devis">Obtenir un devis</Link>
                </Button>
                 <Button asChild variant="ghost" size="lg">
                  <a href={phoneHref}>
                    Parler à un expert
                  </a>
                </Button>
              </div>
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
}
