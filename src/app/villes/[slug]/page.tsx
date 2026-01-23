// src/app/villes/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { citiesData } from "@/lib/cities-data";
import { servicesData } from "@/lib/services-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { siteConfig } from "@/lib/config";

import {
  HeroSection,
  ServicesGrid,
  TrustElements,
  FAQAccordion,
  CTASection,
  Breadcrumbs,
  AnimateOnScroll,
  ProcessSteps,
} from "@/components/shared";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  Building2,
  Sparkles,
  HardHat,
  Factory,
  CalendarDays,
  Home,
  Cpu,
  MapPin,
  ShieldCheck,
  Phone,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Focus =
  | "luxe"
  | "bureaux"
  | "chantiers"
  | "logistique"
  | "événementiel"
  | "résidentiel"
  | "tech";

const FOCUS_META: Record<Focus, { label: string; Icon: React.ElementType; hint: string }> = {
  luxe: {
    label: "Luxe",
    Icon: Sparkles,
    hint: "Boutiques premium, joaillerie, hôtellerie, zones à forte exposition.",
  },
  bureaux: {
    label: "Bureaux",
    Icon: Building2,
    hint: "Sièges, tours, accueil, contrôle d’accès, sûreté des flux.",
  },
  chantiers: {
    label: "Chantiers",
    Icon: HardHat,
    hint: "Prévention intrusions, surveillance nocturne, anti-vol matériels.",
  },
  logistique: {
    label: "Logistique",
    Icon: Factory,
    hint: "Entrepôts, quais, zones de stockage, rondes et levée de doute.",
  },
  événementiel: {
    label: "Événementiel",
    Icon: CalendarDays,
    hint: "Accréditations, filtrage, gestion des flux, coordination.",
  },
  résidentiel: {
    label: "Résidentiel",
    Icon: Home,
    hint: "Copropriétés, syndics, résidences, présence dissuasive.",
  },
  tech: {
    label: "Tech",
    Icon: Cpu,
    hint: "Campus, sites sensibles, protocoles, exigences élevées.",
  },
};

function normalizeTel(phoneE164?: string, fallback?: string) {
  if (phoneE164) return `tel:${phoneE164}`;
  const raw = (fallback ?? "").replace(/\s/g, "");
  return raw ? `tel:${raw}` : "tel:";
}

// slug -> label "Paris 8ème (75008)" / "Plaisir (78370)"
function inferCityLabelFromSlug(slug: string) {
  // ex: paris-8-75008 / plaisir-78370 / la-defense-92400
  const parts = slug.split("-");
  const last = parts[parts.length - 1] || "";
  const maybeZip = /^\d{5}$/.test(last) ? last : "";
  const base = maybeZip ? parts.slice(0, -1).join(" ") : parts.join(" ");
  const name = base
    .replace(/\b(la)\b/gi, "La")
    .replace(/\b(de)\b/gi, "de")
    .replace(/\b(du)\b/gi, "du")
    .replace(/\b(des)\b/gi, "des")
    .split(" ")
    .map((w) => (w.length <= 2 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ")
    .replace(/\bParis (\d{1,2})\b/i, (_, n) => `Paris ${n}ème`);

  return maybeZip ? `${name} (${maybeZip})` : name;
}

// focus -> services suggérés
const FOCUS_SERVICES: Partial<Record<Focus, string[]>> = {
  luxe: ["protection-rapprochee", "securite-evenementielle", "agent-securite-qualifie"],
  bureaux: ["agent-securite-qualifie", "agent-rondier", "audit-conseil-surete"],
  chantiers: ["agent-cynophile", "agent-rondier", "agent-securite-qualifie"],
  logistique: ["agent-rondier", "agent-cynophile", "agent-securite-qualifie"],
  événementiel: ["securite-evenementielle", "agent-securite-qualifie", "agent-incendie-ssiap"],
  résidentiel: ["agent-securite-qualifie", "agent-rondier", "agent-cynophile"],
  tech: ["audit-conseil-surete", "agent-securite-qualifie", "agent-rondier"],
};

const DEFAULT_SERVICES_ORDER = [
  "agent-securite-qualifie",
  "agent-rondier",
  "agent-cynophile",
  "agent-incendie-ssiap",
  "securite-evenementielle",
  "protection-rapprochee",
  "audit-conseil-surete",
] as const;

function pickServicesForCity(focus: Focus[]) {
  const slugs = new Set<string>();
  focus.forEach((f) => (FOCUS_SERVICES[f] ?? []).forEach((s) => slugs.add(s)));

  if (slugs.size === 0) {
    DEFAULT_SERVICES_ORDER.slice(0, 4).forEach((s) => slugs.add(s));
  }

  return DEFAULT_SERVICES_ORDER.filter((s) => slugs.has(s))
    .map((slug) => servicesData.find((sv) => sv.slug === slug))
    .filter(Boolean)
    .map((sv) => ({
      icon: (sv as any).icon ?? "ShieldCheck",
      title: (sv as any).title,
      description: (sv as any).shortDescription,
      href: `/services/${(sv as any).slug}`,
    }));
}

export async function generateStaticParams() {
  return citiesData.map((c) => ({ slug: c.slug }));
}

type CityPageProps = { params: { slug: string } };

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = citiesData.find((c) => c.slug === params.slug);
  if (!city) return {};

  const cityLabel = inferCityLabelFromSlug(city.slug);

  return {
    title: `${city.title} — ${siteConfig.name}`,
    description: `Sécurité privée et gardiennage à ${cityLabel}. Agents qualifiés, rondes, cynophile, SSIAP, événementiel, audit sûreté. Devis rapide et dispositif sur-mesure.`,
    keywords: [
      ...city.keywords,
      "sécurité privée",
      "gardiennage",
      "surveillance",
      "agent de sécurité",
      cityLabel,
      city.department,
    ],
    alternates: { canonical: `/villes/${city.slug}` },
  };
}

export default function CityPage({ params }: CityPageProps) {
  const city = citiesData.find((c) => c.slug === params.slug);
  if (!city) notFound();

  const cityLabel = inferCityLabelFromSlug(city.slug);

  const heroImage =
    PlaceHolderImages.find((p) => p.id === `city-${city.slug}`) ??
    PlaceHolderImages.find((p) => p.id === "cities-default") ??
    PlaceHolderImages.find((p) => p.id === "hero");

  const telHref = normalizeTel(siteConfig.contact.phoneE164, siteConfig.contact.phone);

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Villes", href: "/villes" },
    { label: cityLabel, href: `/villes/${city.slug}` },
  ];

  const servicesForCity = pickServicesForCity(city.focus as Focus[]);
  const focusBadges = (city.focus as Focus[]).map((f) => ({ f, meta: FOCUS_META[f] }));

  const localIntro = (() => {
    const f = city.focus as Focus[];
    if (f.includes("luxe")) {
      return `Dans les environnements premium (boutiques, hôtels, événements), la sécurité doit être discrète, maîtrisée et orientée image. Nous concevons un dispositif qui protège sans perturber l’expérience client.`;
    }
    if (f.includes("bureaux") || f.includes("tech")) {
      return `Sur les sites tertiaires, la sûreté repose sur un contrôle des accès rigoureux, une présence professionnelle et un suivi fiable. Nous structurons une organisation claire, auditable et évolutive.`;
    }
    if (f.includes("chantiers")) {
      return `Les chantiers sont exposés (intrusions, vols, dégradations). Nous mettons en place une surveillance adaptée (rondes, cynophile, filtrage) pour sécuriser matériels, zones et accès.`;
    }
    if (f.includes("logistique")) {
      return `Les sites logistiques demandent une sécurité mobile et réactive : rondes, levée de doute, prévention et coordination. Nous calibrons le dispositif selon vos flux et horaires.`;
    }
    if (f.includes("événementiel")) {
      return `La sécurité événementielle doit être fluide, maîtrisée et orientée accueil : gestion des flux, contrôle d’accès et coordination. Nous dimensionnons les effectifs selon le lieu et la jauge.`;
    }
    if (f.includes("résidentiel")) {
      return `Nous intervenons pour renforcer la tranquillité (copropriétés, résidences, syndics) avec une présence dissuasive, des rondes et des procédures simples.`;
    }
    return `Nous adaptons la sécurité privée à votre contexte : surveillance, contrôle d’accès, rondes et dispositifs sur-mesure.`;
  })();

  const whyUs = [
    {
      icon: "ShieldCheck",
      title: "Agents habilités & encadrement",
      description: "Agents qualifiés (cartes pro), briefés selon vos consignes et la réalité du site.",
    },
    {
      icon: "FileText",
      title: "Dispositif clair & traçable",
      description: "Organisation structurée, suivi opérationnel, et reporting pour piloter la prestation.",
    },
    {
      icon: "MapPin",
      title: `Connaissance locale — ${city.department}`,
      description: "Dispositifs adaptés aux spécificités locales (flux, horaires, typologies de risques).",
    },
    {
      icon: "Phone",
      title: "Réactivité",
      description: "Mise en place rapide d’une solution temporaire, puis dispositif pérenne si besoin.",
    },
  ];

  const steps = [
    {
      icon: "MessageCircle",
      title: "1. Cadrage",
      description: "Analyse du site, objectifs, horaires, flux, contraintes, niveaux d’accès et points sensibles.",
    },
    {
      icon: "FileText",
      title: "2. Proposition",
      description: "Plan de poste, consignes, effectifs, options, et devis transparent (avec recommandations).",
    },
    {
      icon: "ShieldCheck",
      title: "3. Déploiement",
      description: "Briefing, mise en place, coordination avec vos équipes, et démarrage opérationnel maîtrisé.",
    },
    {
      icon: "ThumbsUp",
      title: "4. Suivi",
      description: "Contrôles, rapports, ajustements et amélioration continue pour stabiliser la prestation.",
    },
  ];

  const faqItems = [
    {
      question: `Intervenez-vous rapidement à ${cityLabel} ?`,
      answer:
        "Selon la mission et les effectifs nécessaires, un démarrage peut être organisé rapidement. Pour un dispositif complet, une courte phase de cadrage garantit la continuité et la qualité.",
    },
    {
      question: "Quels services recommandez-vous en priorité ?",
      answer:
        "Nous priorisons selon votre contexte (bureaux, chantier, logistique, événementiel, résidentiel). Après une écoute de vos contraintes, nous proposons un dispositif dimensionné (agents, rondes, cynophile, SSIAP…).",
    },
    {
      question: "Proposez-vous des agents SSIAP ?",
      answer:
        "Oui, pour les configurations qui le nécessitent (ERP/IGH). Nous déployons des agents SSIAP (1/2/3) selon le besoin et le cadre réglementaire.",
    },
    {
      question: "Comment se passe le suivi qualité ?",
      answer:
        "Consignes claires, points de contrôle et reporting. L’objectif : une prestation stable, mesurable et ajustable dans la durée.",
    },
  ];

  // “autres villes” = même département (même libellé)
  const relatedCities = citiesData
    .filter((c) => c.department === city.department && c.slug !== city.slug)
    .slice(0, 9);

  return (
    <>
      <HeroSection
        title={`Sécurité privée à ${cityLabel} — ${city.department}`}
        description={`${localIntro} Demandez un devis : réponse rapide et proposition adaptée.`}
        cta1={{ label: "Demander un devis", href: `/devis?city=${city.slug}` }}
        cta2={{ label: "Appeler", href: telHref, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? `Sécurité privée à ${cityLabel}`}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="py-0 mb-4" />}
      />

      <AnimateOnScroll>
        <section className="py-10 md:py-14 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <h2 className="text-2xl md:text-3xl font-headline font-bold">
                    Contexte local & priorités
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Cette page est structurée selon les besoins typiques à {cityLabel}.
                  </p>
                </div>

                <Button asChild variant="outline">
                  <Link href="/villes">
                    <MapPin className="mr-2 h-4 w-4" />
                    Retour aux villes
                  </Link>
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {focusBadges.map(({ f, meta }) => (
                  <Badge
                    key={f}
                    variant="secondary"
                    className="inline-flex items-center gap-2 py-1.5"
                  >
                    <meta.Icon className="h-4 w-4 text-primary" />
                    {meta.label}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {focusBadges.slice(0, 3).map(({ f, meta }) => (
                  <Card key={f} className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <meta.Icon className="h-5 w-5 text-primary" />
                        {meta.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{meta.hint}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {focusBadges.length > 3 && (
                <p className="mt-3 text-xs text-muted-foreground">
                  +{focusBadges.length - 3} autres focus pris en compte.
                </p>
              )}
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-center">
                Pourquoi {siteConfig.name} à {cityLabel} ?
              </h2>
              <p className="mt-3 text-center text-muted-foreground max-w-3xl mx-auto">
                Un dispositif clair, adapté et contrôlé — pour une sécurité fiable dans la durée.
              </p>

              <div className="mt-10">
                <TrustElements elements={whyUs} />
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ServicesGrid
          id="services-city"
          title={`Services recommandés à ${cityLabel}`}
          description="Une sélection de prestations pertinentes selon votre contexte. Chaque mission est cadrée et adaptée à vos contraintes."
          services={servicesForCity}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ProcessSteps
          title="Notre méthode d’intervention"
          description="Simple, carrée, efficace : du cadrage à l’amélioration continue."
          steps={steps}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="py-10 md:py-12 bg-white">
          <div className="container mx-auto px-4">
            <Card className="shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="max-w-2xl">
                    <h3 className="text-xl md:text-2xl font-headline font-semibold">
                      Besoin d’un dispositif à {cityLabel} ?
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Donnez-nous vos horaires, vos contraintes et le type de site : nous vous répondons avec une proposition structurée.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button asChild>
                      <Link href={`/devis?city=${city.slug}`}>Demander un devis</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <a href={telHref}>
                        <Phone className="mr-2 h-4 w-4" />
                        Appeler
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <FAQAccordion
          title={`Questions fréquentes — ${cityLabel}`}
          description="Réponses claires avant de demander un devis."
          items={faqItems}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CTASection
          id="contact"
          title={`Obtenir un devis sécurité à ${cityLabel}`}
          description="Contactez-nous pour une analyse confidentielle. Nous vous répondrons avec une proposition adaptée à votre contexte."
          cta={{ label: "Demander un devis", href: `/devis?city=${city.slug}` }}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-2xl md:text-3xl font-headline font-bold">
                    Autres villes — {city.department}
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Explorez d’autres pages locales du même département.
                  </p>
                </div>
                <Button asChild variant="outline">
                  <Link href="/villes">Voir toutes les villes</Link>
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedCities.map((c) => {
                  const label = inferCityLabelFromSlug(c.slug);
                  return (
                    <Link
                      key={c.slug}
                      href={`/villes/${c.slug}`}
                      className={cn("rounded-md border bg-card p-3 transition-colors hover:bg-muted/40")}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{label}</p>
                          <p className="text-xs text-muted-foreground truncate">{c.title}</p>
                        </div>
                        <ShieldCheck className="h-4 w-4 text-primary mt-0.5" />
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {(c.focus as Focus[]).slice(0, 3).map((f) => {
                          const meta = FOCUS_META[f];
                          return (
                            <span
                              key={f}
                              className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                            >
                              <meta.Icon className="h-3 w-3 text-primary" />
                              {meta.label}
                            </span>
                          );
                        })}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {relatedCities.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Aucune autre ville n’est encore configurée pour ce département.
                </p>
              )}
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </>
  );
}
