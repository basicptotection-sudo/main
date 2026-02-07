
import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/config";
import { servicesData } from "@/lib/services-data";

import { AnimateOnScroll, Breadcrumbs, ServicesGrid, CTASection } from "@/components/shared";
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
    "Agents de sécurité qualifiés, cynophiles, SSIAP, rondes, sécurité événementielle et audit de sûreté. Intervention en Île-de-France (Paris, 78, 92, 93, 94, 95, 77, 91).",
  alternates: { canonical: toAbsolute("/services") },
  openGraph: {
    type: "website",
    url: toAbsolute("/services"),
    title: "Services de sécurité privée en Île-de-France | Basic Protection Privée",
    description:
      "Prestations terrain et premium : gardiennage, SSIAP, cynophile, rondes, événementiel, audit & conseil. Dispositifs sur mesure, pilotage rigoureux.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Services de sécurité privée en Île-de-France | Basic Protection Privée",
    description:
      "Agents qualifiés, SSIAP, cynophile, rondes, événementiel, audit & conseil. Intervention Île-de-France.",
  },
};

export default function ServicesHubPage() {
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((it, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: it.label,
          item: toAbsolute(it.href ?? ""),
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

      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-muted/40 blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
            <Breadcrumbs items={breadcrumbItems} />
            
            <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
                Des services de sécurité sur-mesure
            </h1>

            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                Des prestations terrain aux dispositifs premium : une méthode claire, des agents qualifiés et un pilotage rigoureux pour sécuriser durablement vos enjeux.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                    <Link href="/devis">Demander un devis</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <a href={phoneHref}>Appeler un expert</a>
                </Button>
            </div>
        </div>
      </section>

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
              <strong>premium</strong> (exigence, discrétion, environnements sensibles). Même standard de qualité : cadrage, consignes, supervision et reporting.
            </p>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ServicesGrid
          id="services-terrain"
          title="Services opérationnels"
          description="Surveillance, contrôle d’accès, rondes, SSIAP : les fondamentaux de la protection des biens et des personnes, exécutés avec rigueur et supervision."
          services={terrainServices}
          className="bg-muted/30"
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ServicesGrid
          id="services-premium"
          title="Services premium"
          description="Dispositifs discrets et sur-mesure pour les contextes les plus exigeants : événementiel de prestige et conseil stratégique en sûreté."
          services={premiumServices}
          gridClassName="lg:grid-cols-2"
          className="bg-card"
        />
      </AnimateOnScroll>

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

      <AnimateOnScroll>
        <CTASection
          title="Prêt à sécuriser votre activité ?"
          description="Décrivez-nous le lieu, les horaires, les accès et vos contraintes. Nous revenons vers vous rapidement avec une proposition claire et un devis structuré."
          cta={{ label: "Obtenir un devis", href: "/devis" }}
          secondaryCta={{label: "Appeler maintenant", href: phoneHref}}
          className="bg-background"
        />
      </AnimateOnScroll>
    </div>
  );
}
