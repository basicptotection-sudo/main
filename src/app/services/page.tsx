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
  ProcessSteps,
  Testimonials,
  FAQAccordion,
  CTASection,
} from "@/components/shared";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getLucideIcon } from "@/lib/icons";

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

function isTerrain(slug: string) {
  return ["agent-securite-qualifie", "agent-cynophile", "agent-incendie-ssiap", "agent-rondier"].includes(slug);
}

function isPremium(slug: string) {
  return ["protection-rapprochee", "securite-evenementielle", "audit-conseil-surete"].includes(slug);
}

export default function ServicesHubPage() {
  const heroImage =
    PlaceHolderImages.find((p) => p.id === "services-hub") ??
    PlaceHolderImages.find((p) => p.id === "hero");

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
  ];

  const terrainServices = servicesData.filter((s) => isTerrain(s.slug));
  const premiumServices = servicesData.filter((s) => isPremium(s.slug));
  const otherServices = servicesData.filter((s) => !isTerrain(s.slug) && !isPremium(s.slug));

  const phoneHref = `tel:${((siteConfig.contact as any).phoneE164 ?? siteConfig.contact.phone).replace(/\s/g, "")}`;

  const toGridItems = (list: typeof servicesData) =>
    list.map((service) => {
      const Icon = getLucideIcon(service.icon);
      return {
        icon: <Icon className="h-11 w-11 text-[#2F8FD8]" />,
        title: service.title,
        description: service.shortDescription,
        href: `/services/${service.slug}`,
      };
    });

  // ---- Contenus (process / FAQ / témoignages) ----
  const processSteps = [
    {
      step: "01",
      title: "Cadrage & consignes",
      description: "Analyse du site, risques, flux, horaires. Rédaction des consignes et objectifs de mission.",
    },
    {
      step: "02",
      title: "Déploiement",
      description: "Affectation des agents, briefing, contrôle du dispositif, mise en place opérationnelle.",
    },
    {
      step: "03",
      title: "Supervision & reporting",
      description: "Points de contrôle, remontées, rapports et ajustements en fonction de l'activité.",
    },
    {
      step: "04",
      title: "Amélioration continue",
      description: "Retours d'expérience, optimisation du dispositif, stabilité et montée en qualité.",
    },
  ];

  const faqItems = [
    {
      question: "Sous quel délai pouvez-vous mettre en place un dispositif ?",
      answer:
        "Selon le besoin (site, horaires, effectifs), nous pouvons déployer rapidement. Après cadrage, nous confirmons un délai précis.",
    },
    {
      question: "Intervenez-vous sur toute l'Île-de-France ?",
      answer:
        "Oui : Paris (75) et l'ensemble des départements d'Île-de-France (78, 92, 93, 94, 95, 77, 91).",
    },
    {
      question: "Fournissez-vous un cadrage et un suivi de mission ?",
      answer:
        "Oui. Chaque mission est structurée (consignes, objectifs, points de contrôle) et suivie (reporting, ajustements).",
    },
    {
      question: "Proposez-vous SSIAP et agents cynophiles ?",
      answer:
        "Oui. Nous couvrons SSIAP, cynophile, rondes et surveillance, ainsi que des prestations premium selon contexte.",
    },
  ];

  // Si tu n'as pas de data "testimonials" globale, on en met 2 ici.
  const testimonials = [
    {
      quote:
        "Dispositif clair, mise en place rapide, reporting régulier : une exécution propre et rassurante.",
      name: "Responsable de site",
      role: "Immobilier tertiaire",
    },
    {
      quote:
        "Agents sérieux, encadrement présent, adaptation aux contraintes du site : très bon niveau de service.",
      name: "Direction",
      role: "Événementiel",
    },
  ];

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
    <div className="bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section - Design épuré et moderne */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-gray-100" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />
          
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Sécurité Privée{" "}
                <span className="bg-gradient-to-r from-[#2F8FD8] to-[#1A365D] bg-clip-text text-transparent">
                  Professionnelle
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-gray-600 md:text-xl">
                Du gardiennage de site à la protection rapprochée, nous déployons des équipes qualifiées, 
                des méthodes claires et un pilotage rigoureux pour assurer votre sécurité.
              </p>
              
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/devis"
                  className="inline-flex items-center justify-center rounded-full bg-[#2F8FD8] px-8 py-4 text-base font-medium text-white hover:bg-[#2F8FD8]/90 md:px-10 md:py-5"
                >
                  Demander un devis
                </Link>
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 px-8 py-4 text-base font-medium hover:bg-gray-50 md:px-10 md:py-5"
                >
                  Appeler maintenant
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -right-6 h-64 w-64 rounded-full bg-gradient-to-r from-[#2F8FD8]/20 to-[#1A365D]/20 blur-3xl" />
              <div className="relative rounded-3xl border border-gray-200 bg-white/80 p-8 backdrop-blur-sm shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-sm font-medium text-gray-600">Agents qualifiés</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium text-gray-600">Cadrage rigoureux</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-purple-500" />
                    <span className="text-sm font-medium text-gray-600">Reporting détaillé</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="text-sm font-medium text-gray-600">Île-de-France complète</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bloc SEO / preuves - Design moderne */}
      <AnimateOnScroll>
        <section className="container mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="text-center">
              <h2 className="font-headline text-2xl font-semibold md:text-3xl">
                Une offre claire : services terrain & premium
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-gray-600">
                Prestations opérationnelles (présence, rondes, SSIAP, cynophile) et prestations premium 
                (protection rapprochée, événementiel, audit). Chaque mission est cadrée puis suivie.
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {["Paris 75", "Yvelines 78", "Hauts-de-Seine 92", "Seine-Saint-Denis 93", "Val-de-Marne 94", "Val-d'Oise 95", "Seine-et-Marne 77", "Essonne 91"].map((zone) => (
                <Badge key={zone} variant="outline" className="rounded-full px-4 py-2">
                  {zone}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Services de terrain - Section avec design épuré */}
      <AnimateOnScroll>
        <section id="services-terrain" className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <Badge className="mb-4" variant="outline">Services Terrain</Badge>
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Surveillance & Sécurité Opérationnelle
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Agents qualifiés, encadrés et pilotés pour la surveillance, le contrôle d'accès, 
              les rondes et la sécurité incendie.
            </p>
          </div>
          
          <div className="mt-12">
            <ServicesGrid
              title=""
              description=""
              services={toGridItems(terrainServices)}
            />
          </div>
        </section>
      </AnimateOnScroll>

      {/* Services premium - Section avec fond différencié */}
      <AnimateOnScroll>
        <section id="services-premium" className="bg-gray-50 py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center">
              <Badge className="mb-4" variant="outline">Services Premium</Badge>
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                Solutions de Sécurité Avancées
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Dispositifs discrets et exigeants : protection rapprochée, sécurité événementielle 
                et audit conseil en sûreté.
              </p>
            </div>
            
            <div className="mt-12">
              <ServicesGrid
                title=""
                description=""
                services={toGridItems(premiumServices)}
              />
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Services complémentaires (si existants) */}
      {otherServices.length > 0 && (
        <AnimateOnScroll>
          <section id="services-complementaires" className="container mx-auto max-w-6xl px-4 py-16">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                Services Complémentaires
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Prestations supplémentaires adaptées à vos besoins spécifiques.
              </p>
            </div>
            
            <div className="mt-12">
              <ServicesGrid
                title=""
                description=""
                services={toGridItems(otherServices)}
              />
            </div>
          </section>
        </AnimateOnScroll>
      )}

      {/* PROCESS - Section avec design moderne */}
      <AnimateOnScroll>
        <section className="bg-white py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                Une méthode claire, un pilotage précis
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Du cadrage à l'exécution : un dispositif pensé, déployé, puis supervisé.
              </p>
            </div>
            
            <div className="mt-12">
              <ProcessSteps
                title=""
                description=""
                steps={processSteps}
              />
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* TESTIMONIALS - Section épurée */}
      <AnimateOnScroll>
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                Ils nous font confiance
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Retours de clients satisfaits par notre professionnalisme et notre efficacité.
              </p>
            </div>
            
            <div className="mt-12">
              <Testimonials testimonials={testimonials} />
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* FAQ - Section avec design moderne */}
      <AnimateOnScroll>
        <section className="bg-white py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                Questions fréquentes
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Délais, modalités, périmètre, encadrement : les réponses essentielles avant de démarrer.
              </p>
            </div>
            
            <div className="mt-12">
              <FAQAccordion
                title=""
                description=""
                items={faqItems}
              />
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Liens internes + CTA final - Design épuré */}
      <AnimateOnScroll>
        <section className="container mx-auto max-w-6xl px-4 py-16">
          {/* Liens internes SEO */}
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/zones" className="block">
              <Card className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#2F8FD8] hover:shadow-md">
                <CardHeader className="p-0">
                  <CardTitle className="text-lg font-semibold">Zones d'intervention</CardTitle>
                  <CardDescription className="mt-2">
                    Paris, La Défense, 78, 92… Couverture Île-de-France et sites stratégiques.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/villes" className="block">
              <Card className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#2F8FD8] hover:shadow-md">
                <CardHeader className="p-0">
                  <CardTitle className="text-lg font-semibold">Pages par ville</CardTitle>
                  <CardDescription className="mt-2">
                    Des pages locales adaptées aux enjeux : bureaux, chantiers, retail, luxe, événementiel…
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          {/* CTA final */}
          <div className="mt-12">
            <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 md:p-12">
              <div className="text-center">
                <h2 className="font-headline text-2xl font-bold md:text-3xl">
                  Besoin d'un dispositif rapidement ?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                  Décrivez votre site, vos horaires et vos flux : nous vous répondons avec une proposition structurée.
                </p>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/devis"
                    className="inline-flex items-center justify-center rounded-full bg-[#2F8FD8] px-8 py-4 text-base font-medium text-white hover:bg-[#2F8FD8]/90"
                  >
                    Demander un devis
                  </Link>
                  <a
                    href={phoneHref}
                    className="inline-flex items-center justify-center rounded-full border border-gray-300 px-8 py-4 text-base font-medium hover:bg-gray-50"
                  >
                    Nous appeler
                  </a>
                </div>
                
                <p className="mt-6 text-sm text-gray-500">
                  Réponse sous 24h • Devis personnalisé • Confidentialité garantée
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
}
