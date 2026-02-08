import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ServicesGrid,
  FAQAccordion,
  CTASection,
  Breadcrumbs,
  AnimateOnScroll,
  TrustElements,
  HeroSection,
} from "@/components/shared";
import { citiesData, type City, type CityFocus } from "@/lib/cities-data";
import { servicesData, type Service } from "@/lib/services-data";
import { siteConfig } from "@/lib/config";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import CityJsonLd from "@/components/seo/city-json-ld";
import FaqJsonLd from "@/components/seo/faq-json-ld";

import { Button } from "@/components/ui/button";

/* ----------------------------------
   Types
----------------------------------- */

type CityPageProps = { params: { slug: string } };

type UseCase = {
  icon: string; // icône lucide (string)
  title: string;
  content: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

/* ----------------------------------
   Utils
----------------------------------- */

function normalizeTel(phoneE164?: string, fallback?: string) {
  if (phoneE164) return `tel:${phoneE164}`;
  const raw = (fallback ?? "").replace(/\s/g, "");
  return raw ? `tel:${raw}` : "tel:";
}

function focusLabel(focus: CityFocus) {
  const map: Record<CityFocus, string> = {
    luxe: "Luxe",
    bureaux: "Bureaux",
    chantiers: "Chantiers",
    logistique: "Logistique",
    événementiel: "Événementiel",
    résidentiel: "Résidentiel",
    tech: "Tech",
  };
  return map[focus];
}

function pickHeroImageIdByFocus(_: CityFocus[]) {
  return "hero";
}

/* ----------------------------------
   Core content builder
----------------------------------- */

function buildCityContent(city: City) {
  const focus = city.focus ?? [];

  const heroTitle = `${city.title} — Sécurité privée & dispositifs adaptés`;

  const heroDescription =
    city.intro ??
    (focus.includes("luxe")
      ? "Sécurité haut de gamme, posture irréprochable et gestion maîtrisée des flux pour environnements premium."
      : focus.includes("logistique")
      ? "Sécurisation des flux, quais, entrepôts et accès sensibles avec un dispositif structuré et traçable."
      : focus.includes("chantiers")
      ? "Prévention des intrusions et vols, surveillance nocturne et rondes sur sites en travaux."
      : focus.includes("événementiel")
      ? "Contrôle d’accès, gestion des flux et sécurisation des zones sensibles pour événements."
      : "Surveillance, contrôle d’accès et prévention avec une organisation claire et pilotée.");

  const useCases: UseCase[] =
    city.useCases ??
    [
      focus.includes("bureaux") && {
        icon: "Building2",
        title: "Bureaux & sites tertiaires",
        content:
          "Contrôle d’accès, gestion visiteurs et prestataires, rondes et reporting.",
      },
      focus.includes("luxe") && {
        icon: "Gem",
        title: "Luxe & environnements sensibles",
        content:
          "Discrétion, posture premium et prévention sans altérer l’image de marque.",
      },
      focus.includes("logistique") && {
        icon: "Warehouse",
        title: "Logistique & stockage",
        content:
          "Contrôle des accès, prévention des intrusions et sécurisation des flux.",
      },
      focus.includes("chantiers") && {
        icon: "HardHat",
        title: "Chantiers & sites techniques",
        content:
          "Surveillance nocturne, prévention des vols et rondes dissuasives.",
      },
      focus.includes("événementiel") && {
        icon: "Users",
        title: "Événementiel",
        content:
          "Accueil, filtrage et gestion des flux selon le dispositif défini.",
      },
      focus.includes("résidentiel") && {
        icon: "Home",
        title: "Résidentiel & copropriétés",
        content:
          "Présence rassurante, rondes et prévention des incivilités.",
      },
    ].filter(Boolean) as UseCase[];

  const orderedServices: Service[] = [
    "agent-securite-qualifie",
    "agent-rondier",
    focus.includes("événementiel") && "securite-evenementielle",
    focus.includes("luxe") && "protection-rapprochee",
    focus.includes("chantiers") && "agent-cynophile",
    "audit-conseil-surete",
  ]
    .filter(Boolean)
    .map((slug) => servicesData.find((s) => s.slug === slug))
    .filter(Boolean) as Service[];

  const faq: FaqItem[] = [
    {
      question: `Intervenez-vous rapidement à ${city.title.replace(
        "Sécurité Privée ",
        ""
      )} ?`,
      answer:
        "Oui. Selon la mission, une solution temporaire peut être mise en place rapidement avant un dispositif pérenne.",
    },
    {
      question: "Comment choisissez-vous le bon dispositif ?",
      answer:
        "Après analyse du site : flux, horaires, contraintes, risques et objectifs.",
    },
    {
      question: "Assurez-vous un suivi qualité ?",
      answer:
        "Oui. Reporting, supervision et ajustements continus sont intégrés à nos prestations.",
    },
  ];

  const whyUs = [
    {
      icon: "ShieldCheck",
      title: "Dispositif cadré",
      description: "Consignes claires et pilotage opérationnel.",
    },
    {
      icon: "FileText",
      title: "Traçabilité",
      description: "Main courante et rapports utiles.",
    },
    { icon: "Zap", title: "Réactivité", description: "Adaptation rapide selon les besoins." },
    { icon: "Lock", title: "Discrétion", description: "Posture et confidentialité adaptées." },
  ];

  return { heroTitle, heroDescription, useCases, orderedServices, faq, whyUs };
}

/* ----------------------------------
   SSG / SEO
----------------------------------- */

export async function generateStaticParams() {
  return citiesData.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const city = citiesData.find((c) => c.slug === params.slug);
  if (!city) return {};

  const content = buildCityContent(city);

  return {
    title: city.title,
    description: content.heroDescription,
    keywords: city.keywords,
    alternates: { canonical: `${siteConfig.url}/villes/${city.slug}` },
  };
}

/* ----------------------------------
   Page
----------------------------------- */

export default function CityPage({ params }: CityPageProps) {
  const city = citiesData.find((c) => c.slug === params.slug);
  if (!city) notFound();

  const content = buildCityContent(city);

  const heroImage =
    PlaceHolderImages.find((p) => p.id === pickHeroImageIdByFocus(city.focus)) ??
    PlaceHolderImages[0];

  const phoneHref = normalizeTel(
    (siteConfig.contact as any).phoneE164,
    siteConfig.contact.phone
  );

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Villes", href: "/villes" },
    {
      label: city.title.replace("Sécurité Privée ", ""),
      href: `/villes/${city.slug}`,
    },
  ];

  const servicesForGrid = content.orderedServices.map((s) => {
    return {
      icon: s.icon,
      title: s.title,
      description: s.shortDescription,
      href: `/services/${s.slug}`,
    };
  });

  return (
    <>
      {/* ✅ SEO JSON-LD ville (sans prop faq) */}
      <CityJsonLd city={city} breadcrumbs={breadcrumbItems} />

      <HeroSection
        title={content.heroTitle}
        description={content.heroDescription}
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Appeler", href: phoneHref, variant: "secondary" }}
        imageUrl={heroImage.imageUrl}
        imageAlt={heroImage.description}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
      />

      <AnimateOnScroll>
        <ServicesGrid
          id="services"
          title={`Services recommandés — ${city.title.replace(
            "Sécurité Privée ",
            ""
          )}`}
          description="Un dispositif ajusté au terrain et aux risques locaux."
          services={servicesForGrid}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-10">
              Pourquoi nous choisir ?
            </h2>
            <TrustElements elements={content.whyUs} />
          </div>
        </section>
      </AnimateOnScroll>
      <FaqJsonLd items={content.faq} />
      <AnimateOnScroll>
        <FAQAccordion
          title={`Questions fréquentes — ${city.title.replace(
            "Sécurité Privée ",
            ""
          )}`}
          description="Délais d’intervention, organisation, conformité, qualité des agents et choix du dispositif."
          items={content.faq}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CTASection
          title={`Demander un devis — ${city.title.replace(
            "Sécurité Privée ",
            ""
          )}`}
          description="Expliquez-nous votre besoin, nous dimensionnons la solution."
          cta={{ label: "Demander un devis", href: "/devis" }}
        />
      </AnimateOnScroll>
    </>
  );
}
