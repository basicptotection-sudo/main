// src/app/villes/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import { citiesData } from "@/lib/cities-data";
import { siteConfig } from "@/lib/config";
import { PlaceHolderImages } from "@/lib/placeholder-images";

import {
  HeroSection,
  AnimateOnScroll,
  Breadcrumbs,
  FAQAccordion,
  CTASection,
} from "@/components/shared";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  MapPin,
  Building2,
  Sparkles,
  HardHat,
  Factory,
  CalendarDays,
  Home,
  Cpu,
  Phone,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Villes — Sécurité privée en Île-de-France",
  description:
    "Découvrez nos pages locales par ville en Île-de-France : sécurité privée, gardiennage, rondes, cynophile, SSIAP, événementiel, audit sûreté. Devis rapide et dispositif sur-mesure.",
  alternates: { canonical: "/villes" },
};

type Focus =
  | "luxe"
  | "bureaux"
  | "chantiers"
  | "logistique"
  | "événementiel"
  | "résidentiel"
  | "tech";

const FOCUS_META: Record<
  Focus,
  { label: string; Icon: React.ElementType; hint: string }
> = {
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

export default function CitiesHubPage() {
  const telHref = normalizeTel(siteConfig.contact.phoneE164, siteConfig.contact.phone);
  const heroImage =
    PlaceHolderImages.find((p) => p.id === "cities-hub") ??
    PlaceHolderImages.find((p) => p.id === "hero");

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Villes", href: "/villes" },
  ];

  // Regroupements utiles
  const departments = Array.from(new Set(citiesData.map((c) => c.department))).sort();
  const allFocus = Array.from(
    new Set(citiesData.flatMap((c) => c.focus as Focus[]))
  ).sort();

  // Top villes = celles avec le plus de focus (simple, utile, sans inventer)
  const topCities = [...citiesData]
    .sort((a, b) => (b.focus?.length ?? 0) - (a.focus?.length ?? 0))
    .slice(0, 8);

  const faqItems = [
    {
      question: "Pourquoi créer une page par ville ?",
      answer:
        "Chaque ville a ses enjeux : luxe, tertiaire, chantiers, logistique, événements. Une page locale permet de décrire les risques typiques et de proposer une réponse adaptée, tout en améliorant la visibilité sur Google.",
    },
    {
      question: "Intervenez-vous sur toute l’Île-de-France ?",
      answer:
        "Oui, nous couvrons l’Île-de-France avec un focus sur les zones où la demande est forte (Paris, La Défense, pôles logistiques, chantiers, etc.). Les pages ci-dessus listent nos zones prioritaires.",
    },
    {
      question: "Quel service choisir pour mon besoin ?",
      answer:
        "Bureaux : contrôle d’accès + agent qualifié + rondes. Chantiers : rondes + cynophile. Logistique : rondier + levée de doute. Événementiel : filtrage + gestion des flux. Nous ajustons toujours selon votre site et vos contraintes.",
    },
    {
      question: "Sous quel délai peut-on démarrer ?",
      answer:
        "Selon la mission, un renfort ou un dispositif temporaire peut être mis en place rapidement. Pour un dispositif complet, une courte phase de cadrage garantit la qualité et la continuité.",
    },
  ];

  return (
    <>
      <HeroSection
        title="Sécurité privée par ville en Île-de-France"
        description="Explorez nos pages locales : nous adaptons nos dispositifs (agents qualifiés, rondes, cynophile, SSIAP, événementiel, audit) aux réalités de chaque ville et de chaque secteur."
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Appeler", href: telHref, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? "Sécurité privée en Île-de-France"}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="py-0 mb-4" />}
      />

      <AnimateOnScroll>
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-2xl md:text-3xl font-headline font-bold">
                    Villes prioritaires
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Des pages locales conçues pour les zones à forte demande : luxe, bureaux, chantiers, logistique, événements.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <Link href="/zones">
                      <MapPin className="mr-2 h-4 w-4" />
                      Voir les départements
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/devis">Obtenir un devis</Link>
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {topCities.map((c) => {
                  const label = inferCityLabelFromSlug(c.slug);
                  return (
                    <Link
                      key={c.slug}
                      href={`/villes/${c.slug}`}
                      className="rounded-md border bg-card p-4 transition-colors hover:bg-muted/40"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{label}</p>
                          <p className="text-xs text-muted-foreground truncate">{c.department}</p>
                        </div>
                        <ShieldCheck className="h-4 w-4 text-primary mt-0.5" />
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
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
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-center">
                Filtrer par besoin
              </h2>
              <p className="mt-2 text-center text-muted-foreground max-w-3xl mx-auto">
                Clique sur un département ou un focus pour explorer les pages locales correspondantes.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Départements couverts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {departments.map((dep) => (
                        <Badge key={dep} variant="secondary" className="py-1.5">
                          {dep}
                        </Badge>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Les pages “zones” détaillent les spécificités par département (enjeux, cas d’usage, villes principales).
                    </p>
                    <div className="mt-4">
                      <Button asChild variant="outline">
                        <Link href="/zones">Aller aux zones</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Focus (typologies de besoins)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {allFocus.map((f) => {
                        const meta = FOCUS_META[f as Focus];
                        return (
                          <Badge
                            key={f}
                            variant="secondary"
                            className="inline-flex items-center gap-2 py-1.5"
                          >
                            <meta.Icon className="h-4 w-4 text-primary" />
                            {meta.label}
                          </Badge>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Chaque page ville met en avant les services recommandés selon le contexte (luxe, bureaux, chantiers, logistique…).
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-10">
                <h3 className="text-xl md:text-2xl font-headline font-semibold">
                  Toutes les villes
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Accès direct à nos pages locales : choisissez votre ville.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {citiesData.map((c) => {
                    const label = inferCityLabelFromSlug(c.slug);
                    return (
                      <Link
                        key={c.slug}
                        href={`/villes/${c.slug}`}
                        className="rounded-md border bg-card p-4 transition-colors hover:bg-muted/40"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-semibold truncate">{label}</p>
                            <p className="text-xs text-muted-foreground truncate">{c.department}</p>
                          </div>
                          <MapPin className="h-4 w-4 text-primary mt-0.5" />
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
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

                <div className="mt-8 flex flex-col sm:flex-row gap-2">
                  <Button asChild>
                    <Link href="/devis">Demander un devis</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={telHref}>
                      <Phone className="mr-2 h-4 w-4" />
                      Appeler
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <FAQAccordion
          title="Questions fréquentes — Pages locales"
          description="Tout ce qu’il faut savoir avant de demander un devis."
          items={faqItems}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CTASection
          id="contact"
          title="Parlons de votre besoin en toute confidentialité"
          description="Expliquez votre site, vos horaires et vos contraintes : nous vous répondons avec une proposition adaptée."
          cta={{ label: "Demander un devis", href: "/devis" }}
        />
      </AnimateOnScroll>
    </>
  );
}
