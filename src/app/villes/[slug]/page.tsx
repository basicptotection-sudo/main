import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as LucideIcons from "lucide-react";

import { citiesData, type City } from "@/lib/cities-data";
import { servicesData, type Service } from "@/lib/services-data";
import { siteConfig } from "@/lib/config";
import { PlaceHolderImages } from "@/lib/placeholder-images";

import {
  HeroSection,
  ServicesGrid,
  FAQAccordion,
  CTASection,
  Breadcrumbs,
  AnimateOnScroll,
  TrustElements,
} from "@/components/shared";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CityPageProps = { params: { slug: string } };

type Focus =
  | "luxe"
  | "bureaux"
  | "chantiers"
  | "logistique"
  | "événementiel"
  | "résidentiel"
  | "tech";

type UseCase = { icon: string; title: string; content: string };
type FaqItem = { question: string; answer: string };

function normalizeTel(phoneE164?: string, fallback?: string) {
  if (phoneE164) return `tel:${phoneE164}`;
  const raw = (fallback ?? "").replace(/\s/g, "");
  return raw ? `tel:${raw}` : "tel:";
}

function pickHeroImageIdByFocus(focus: Focus[]) {
  // utilise tes placeholders existants si tu les as.
  // fallback sur "hero" si non trouvé.
  if (focus.includes("luxe")) return "hero";
  if (focus.includes("bureaux") || focus.includes("tech")) return "hero";
  if (focus.includes("chantiers")) return "hero";
  if (focus.includes("logistique")) return "hero";
  if (focus.includes("événementiel")) return "hero";
  return "hero";
}

function focusLabel(f: Focus) {
  switch (f) {
    case "luxe":
      return "Luxe";
    case "bureaux":
      return "Bureaux";
    case "chantiers":
      return "Chantiers";
    case "logistique":
      return "Logistique";
    case "événementiel":
      return "Événementiel";
    case "résidentiel":
      return "Résidentiel";
    case "tech":
      return "Tech";
  }
}

function buildCityContent(city: City) {
  const focus = city.focus;

  // HERO
  const heroTitle = `${city.title} — Gardiennage & dispositifs sur-mesure`;
  const heroDescription = (() => {
    if (focus.includes("luxe")) {
      return "Discrétion, présentation irréprochable et contrôle des flux pour boutiques premium, hôtels, sièges de marque et événements haut de gamme. Dispositif calibré selon vos contraintes.";
    }
    if (focus.includes("bureaux") || focus.includes("tech")) {
      return "Contrôle d’accès, gestion des flux salariés/prestataires, rondes, prévention et reporting : un dispositif stable pour sites tertiaires, IGH et pôles d’activité.";
    }
    if (focus.includes("logistique")) {
      return "Sécurisation d’entrepôts, quais et zones de stockage : rondes de nuit, levée de doute, contrôle PL/visiteurs et prévention des intrusions.";
    }
    if (focus.includes("chantiers")) {
      return "Prévention des vols et intrusions, surveillance de nuit, rondes et cynophile selon configuration : un dispositif efficace pour chantiers et sites techniques.";
    }
    if (focus.includes("événementiel")) {
      return "Accueil, filtrage, gestion des flux et sécurisation des zones sensibles : une organisation claire pour événements privés, corporate ou publics.";
    }
    return "Sécurité privée locale : surveillance, rondes, contrôle d’accès et prévention, avec une organisation claire et un suivi terrain.";
  })();

  // USE CASES (4–6)
  const useCases: UseCase[] = [];

  if (focus.includes("luxe")) {
    useCases.push(
      { icon: "Gem", title: "Boutiques premium & hôtellerie", content: "Accueil filtré, posture discrète, surveillance des flux, prévention du vol et gestion d’incidents sans perturber l’expérience client." },
      { icon: "CalendarDays", title: "Événements VIP & lancements", content: "Briefing équipes, contrôle accréditations, zones VIP/backstage, gestion des entrées et coordination organisation." }
    );
  }
  if (focus.includes("bureaux")) {
    useCases.push(
      { icon: "Building2", title: "Contrôle d’accès tertiaire", content: "Gestion badges/visiteurs, filtrage prestataires, rondes, supervision des zones sensibles et reporting." }
    );
  }
  if (focus.includes("tech")) {
    useCases.push(
      { icon: "Cpu", title: "Sites sensibles & data / tech", content: "Accès restreints, procédures, traçabilité, discipline opérationnelle et coordination avec vos équipes internes." }
    );
  }
  if (focus.includes("chantiers")) {
    useCases.push(
      { icon: "HardHat", title: "Chantiers & sécurisation nocturne", content: "Prévention vols de matériaux, contrôle des points d’accès, rondes et cynophile selon périmètre." }
    );
  }
  if (focus.includes("logistique")) {
    useCases.push(
      { icon: "Warehouse", title: "Entrepôts, quais, stockage", content: "Contrôle PL/visiteurs, prévention intrusions, rondes aléatoires, levée de doute et rapports." }
    );
  }
  if (focus.includes("événementiel")) {
    useCases.push(
      { icon: "Users", title: "Gestion des flux & accueil", content: "Filtrage, orientation, prévention des tensions, coordination avec l’organisation pour une expérience fluide et sûre." }
    );
  }
  if (focus.includes("résidentiel")) {
    useCases.push(
      { icon: "Home", title: "Résidences & copropriétés", content: "Présence dissuasive, rondes, contrôle visiteurs/livraisons et remontées terrain en lien avec le syndic." }
    );
  }

  // sécurité : limiter à 6
  const finalUseCases = useCases.slice(0, 6);

  // SERVICES à mettre en avant selon focus (ordre)
  const prioritySlugs = (() => {
    const base = [
      "agent-securite-qualifie",
      "agent-rondier",
      "agent-incendie-ssiap",
      "agent-cynophile",
      "securite-evenementielle",
      "protection-rapprochee",
      "audit-conseil-surete",
    ];

    // Réordonnancement simple
    const prefer: string[] = [];
    if (focus.includes("luxe")) prefer.push("protection-rapprochee", "securite-evenementielle", "agent-securite-qualifie");
    if (focus.includes("bureaux") || focus.includes("tech")) prefer.push("agent-securite-qualifie", "audit-conseil-surete", "agent-incendie-ssiap");
    if (focus.includes("chantiers")) prefer.push("agent-cynophile", "agent-rondier", "agent-securite-qualifie");
    if (focus.includes("logistique")) prefer.push("agent-rondier", "agent-securite-qualifie", "agent-cynophile");
    if (focus.includes("événementiel")) prefer.push("securite-evenementielle", "agent-securite-qualifie", "agent-incendie-ssiap");
    if (focus.includes("résidentiel")) prefer.push("agent-securite-qualifie", "agent-rondier");

    const unique = Array.from(new Set([...prefer, ...base]));
    return unique;
  })();

  const orderedServices = prioritySlugs
    .map((slug) => servicesData.find((s) => s.slug === slug))
    .filter(Boolean) as Service[];

  // FAQ locale (6–8)
  const faq: FaqItem[] = [
    {
      question: `Intervenez-vous rapidement à ${city.title.replace("Sécurité Privée ", "")} ?`,
      answer:
        "Oui, selon la mission et le dimensionnement. Pour une demande urgente, nous pouvons organiser une solution temporaire rapide, puis stabiliser un dispositif pérenne après cadrage.",
    },
    {
      question: "Quels services sont les plus adaptés ici ?",
      answer:
        "Cela dépend de votre contexte (flux, horaires, risques, configuration). Nous dimensionnons le dispositif : agent qualifié, rondier, SSIAP, cynophile, événementiel, protection rapprochée ou audit/conseil.",
    },
  ];

  if (focus.includes("luxe")) {
    faq.push(
      {
        question: "Proposez-vous une présence très discrète (luxe / VIP) ?",
        answer:
          "Oui. Posture, tenue, communication et procédures sont calibrées pour préserver l’image de marque, avec un contrôle des flux et une gestion d’incident maîtrisée.",
      },
      {
        question: "Faites-vous de la protection rapprochée ?",
        answer:
          "Oui, sur demande, avec des profils adaptés et un protocole clair (reconnaissance, itinéraires, coordination). Le cadre légal est étudié au cas par cas.",
      }
    );
  }

  if (focus.includes("bureaux") || focus.includes("tech")) {
    faq.push({
      question: "Gérez-vous les flux visiteurs / prestataires ?",
      answer:
        "Oui : enregistrement, filtrage, orientation, badges, zones autorisées, et reporting. Le tout aligné avec vos procédures internes.",
    });
  }

  if (focus.includes("logistique")) {
    faq.push({
      question: "Sécurisez-vous entrepôts et quais (nuit / week-end) ?",
      answer:
        "Oui : rondes, contrôle des accès, levée de doute, sécurisation après incident et rapports d’intervention. Le dispositif varie selon la taille et les contraintes du site.",
    });
  }

  if (focus.includes("chantiers")) {
    faq.push({
      question: "Le cynophile est-il pertinent sur chantier ?",
      answer:
        "Souvent oui : très dissuasif et efficace sur grands périmètres. Nous analysons l’environnement (clôtures, accès, voisinage) avant recommandation.",
    });
  }

  faq.push({
    question: "Comment suivez-vous la qualité des prestations ?",
    answer:
      "Cadrage des consignes, supervision, remontées terrain, rapports, et ajustements. L’objectif : un service stable et conforme à vos attentes.",
  });

  const whyUs = [
    {
      icon: "ShieldCheck",
      title: "Organisation claire",
      description: "Cadrage, consignes et suivi : un dispositif lisible et piloté.",
    },
    {
      icon: "FileText",
      title: "Reporting & traçabilité",
      description: "Remontées terrain et rapports utiles pour piloter la sécurité.",
    },
    {
      icon: "Zap",
      title: "Réactivité opérationnelle",
      description: "Mise en place selon mission, et ajustements rapides si besoin.",
    },
    {
      icon: "Lock",
      title: "Discrétion & confidentialité",
      description: "Procédures et posture adaptées à vos activités et contraintes.",
    },
  ];

  return {
    heroTitle,
    heroDescription,
    useCases: finalUseCases,
    orderedServices,
    faq,
    whyUs,
  };
}

export async function generateStaticParams() {
  return citiesData.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = citiesData.find((c) => c.slug === params.slug);
  if (!city) return {};

  const content = buildCityContent(city);

  return {
    title: city.title,
    description: content.heroDescription,
    keywords: city.keywords,
    alternates: {
      canonical: `/villes/${city.slug}`,
    },
  };
}

const UseCasesSection = ({ cases }: { cases: UseCase[] }) => (
  <section className="py-16 md:py-24 bg-muted/20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center">
        Cas d’usage locaux
      </h2>
      <p className="mt-3 text-center text-muted-foreground max-w-3xl mx-auto">
        Chaque ville a ses réalités : flux, horaires, zones sensibles et typologies de risques.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {cases.map((uc) => {
          const Icon = (LucideIcons as any)[uc.icon];
          return (
            <Card key={uc.title} className="rounded-2xl">
              <CardHeader className="flex flex-row items-center gap-4">
                {Icon && <Icon className="w-10 h-10 text-primary" />}
                <CardTitle className="text-base md:text-lg">{uc.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{uc.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

export default function CityPage({ params }: CityPageProps) {
  const city = citiesData.find((c) => c.slug === params.slug);
  if (!city) notFound();

  const content = buildCityContent(city);
  const heroImageId = pickHeroImageIdByFocus(city.focus);
  const heroImage = PlaceHolderImages.find((p) => p.id === heroImageId) ?? PlaceHolderImages.find((p) => p.id === "hero");

  const phoneHref = normalizeTel((siteConfig.contact as any).phoneE164, siteConfig.contact.phone);

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Villes", href: "/villes" },
    { label: city.title.replace("Sécurité Privée ", ""), href: `/villes/${city.slug}` },
  ];

  const servicesForGrid = content.orderedServices.map((s) => {
    const Icon = (LucideIcons as any)[s.icon];
    return {
      icon: Icon ? <Icon className="w-12 h-12 text-primary" /> : null,
      title: s.title,
      description: s.shortDescription,
      href: `/services/${s.slug}`,
    };
  });

  const chips = city.focus.map((f) => focusLabel(f as Focus));

  return (
    <>
      <HeroSection
        title={content.heroTitle}
        description={content.heroDescription}
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Appeler", href: phoneHref, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? `Sécurité privée — ${city.title}`}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="py-0 mb-4" />}
      />

      <AnimateOnScroll>
        <section className="container mx-auto max-w-5xl px-4 py-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {chips.map((label) => (
              <span
                key={label}
                className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border bg-card p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary">
              Une approche locale, cadrée, pilotée
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Notre priorité : comprendre vos flux, vos horaires, vos contraintes et vos risques, puis mettre en place
              un dispositif clair (postes, consignes, reporting, supervision).
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/devis">Obtenir un devis</Link>
              </Button>
              <Button asChild variant="outline">
                <a href={phoneHref}>Appeler un expert</a>
              </Button>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ServicesGrid
          id="services"
          title={`Services recommandés — ${city.title.replace("Sécurité Privée ", "")}`}
          description="Nous adaptons le dispositif au terrain : agent qualifié, rondes, SSIAP, cynophile, événementiel, protection rapprochée, audit/conseil."
          services={servicesForGrid}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <UseCasesSection cases={content.useCases} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-10">
              Pourquoi Basic Protection Privée ?
            </h2>
            <div className="max-w-5xl mx-auto">
              <TrustElements elements={content.whyUs} />
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <FAQAccordion
          title={`Questions fréquentes — ${city.title.replace("Sécurité Privée ", "")}`}
          description="Délais, organisation, conformité, qualité et choix du dispositif."
          items={content.faq}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CTASection
          id="contact"
          title={`Demander un devis — ${city.title.replace("Sécurité Privée ", "")}`}
          description="Expliquez votre site, vos horaires, vos flux et vos contraintes. Nous vous répondons avec une proposition claire et adaptée."
          cta={{ label: "Demander un devis", href: `/devis?villes=${city.slug}` }}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="container mx-auto max-w-5xl px-4 pb-16 md:pb-20">
          <div className="text-center text-sm text-muted-foreground">
            Pour une demande urgente :{" "}
            <a className={cn("underline underline-offset-4 hover:text-foreground")} href={phoneHref}>
              appelez-nous
            </a>
            .
          </div>
        </section>
      </AnimateOnScroll>
    </>
  );
}
