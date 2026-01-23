import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/config";
import { servicesData } from "@/lib/services-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

import { HeroSection, ServicesGrid, AnimateOnScroll, Breadcrumbs } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getLucideIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Nos services de sécurité privée",
  description:
    "Découvrez nos services : agents de sécurité qualifiés, cynophiles, SSIAP, rondes, protection rapprochée, sécurité événementielle et audit de sûreté. Intervention Île-de-France (78, 75, 92, 93, 94, 95, 77, 91).",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
};

function isTerrain(slug: string) {
  return ["agent-securite-qualifie", "agent-cynophile", "agent-incendie-ssiap", "agent-rondier"].includes(slug);
}

function isPremium(slug: string) {
  return ["protection-rapprochee", "securite-evenementielle", "audit-conseil-surete"].includes(slug);
}

export default function ServicesHubPage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "services-hub") ?? PlaceHolderImages.find((p) => p.id === "hero");

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
  ];

  const terrainServices = servicesData.filter((s) => isTerrain(s.slug));
  const premiumServices = servicesData.filter((s) => isPremium(s.slug));
  const otherServices = servicesData.filter((s) => !isTerrain(s.slug) && !isPremium(s.slug)); // au cas où tu ajoutes plus tard

  const phoneHref = `tel:${(siteConfig.contact as any).phoneE164 ?? siteConfig.contact.phone.replace(/\s/g, "")}`;

  const toGridItems = (list: typeof servicesData) =>
    list.map((service) => {
      const Icon = getLucideIcon(service.icon);
      return {
        icon: <Icon className="h-11 w-11 text-primary" />,
        title: service.title,
        description: service.shortDescription,
        href: `/services/${service.slug}`,
      };
    });

  return (
    <div className="bg-background text-foreground">
      <HeroSection
        title="Services de sécurité privée — dispositifs sur mesure"
        description="Du gardiennage de site à la protection rapprochée, nous déployons des équipes qualifiées, des méthodes claires et un pilotage rigoureux. Objectif : prévenir, dissuader, sécuriser — sans friction pour vos équipes et vos clients."
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Appeler", href: phoneHref, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? "Agent de sécurité — Basic Protection Privée"}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="py-0 mb-4" />}
      />

      <AnimateOnScroll>
        <section className="container mx-auto max-w-5xl px-4 py-10 md:py-12">
          <div className="rounded-2xl border p-6 md:p-8">
            <h2 className="font-headline text-xl font-semibold md:text-2xl">
              Une offre claire : terrain + premium
            </h2>
            <p className="mt-2 text-muted-foreground">
              Nous distinguons les prestations opérationnelles (présence, rondes, SSIAP, cynophile) et les prestations premium
              (protection rapprochée, événementiel, audit). Chaque mission est cadrée (consignes, objectifs, points de contrôle)
              puis suivie (reporting, ajustements).
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
        <ServicesGrid
          id="services-terrain"
          title="Services de terrain"
          description="Surveillance, contrôle d’accès, rondes et sécurité incendie : des agents qualifiés, encadrés et pilotés."
          services={toGridItems(terrainServices)}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ServicesGrid
          id="services-premium"
          title="Services premium"
          description="Dispositifs discrets et exigeants : protection rapprochée, événementiel de prestige, audit & conseil en sûreté."
          services={toGridItems(premiumServices)}
        />
      </AnimateOnScroll>

      {otherServices.length ? (
        <AnimateOnScroll>
          <ServicesGrid
            id="services-complementaires"
            title="Services complémentaires"
            description="Prestations complémentaires (selon vos besoins)."
            services={toGridItems(otherServices)}
          />
        </AnimateOnScroll>
      ) : null}

      <AnimateOnScroll>
        <section className="container mx-auto max-w-5xl px-4 pb-16 md:pb-20">
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/zones" className="block">
              <Card className="h-full rounded-2xl transition-colors hover:bg-muted/40">
                <CardHeader>
                  <CardTitle className="text-base">Zones d’intervention</CardTitle>
                  <CardDescription>
                    Départements Île-de-France et zones stratégiques : Paris, La Défense, 78, 92…
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/villes" className="block">
              <Card className="h-full rounded-2xl transition-colors hover:bg-muted/40">
                <CardHeader>
                  <CardTitle className="text-base">Pages par ville</CardTitle>
                  <CardDescription>
                    Des pages locales selon les enjeux : luxe, bureaux, chantiers, logistique, événementiel…
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border p-6">
            <h2 className="font-headline text-xl font-semibold">Besoin d’un dispositif rapidement ?</h2>
            <p className="mt-2 text-muted-foreground">
              Décrivez votre site, vos horaires et vos flux : nous vous répondons avec une proposition structurée.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-primary-foreground"
                href="/devis"
              >
                Demander un devis
              </Link>
              <a
                className="inline-flex items-center justify-center rounded-md border px-5 py-2.5"
                href={phoneHref}
              >
                Appeler
              </a>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
}
