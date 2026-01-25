import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import React from "react";

import { servicesData, type Service } from "@/lib/services-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { siteConfig } from "@/lib/config";

import {
  HeroSection,
  ProcessSteps,
  SectorsGrid,
  FAQAccordion,
  CTASection,
  Breadcrumbs,
  BenefitsSection,
  AnimateOnScroll,
  TrustElements,
} from "@/components/shared";

import ServiceJsonLd from "@/components/seo/service-json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ServicePageProps = {
  params: { slug: string };
};

const BRAND_ACCENT = "#2F8FD8";

export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

function toCanonical(path: string) {
  return `${siteConfig.url}${path}`;
}

function buildMetaDescription(service: Service) {
  const base = (service.shortDescription || service.title)
    .trim()
    .replace(/\s+/g, " ");
  const suffix =
    " Intervention Île-de-France : 78, 75, 92, 93, 94, 95, 77, 91.";
  const text = `${base}${base.endsWith(".") ? "" : "."}${suffix}`;
  return text.length > 170 ? `${text.slice(0, 167)}…` : text;
}

function cityLinksForService(slug: string) {
  const map: Record<string, { name: string; href: string }[]> = {
    "securite-evenementielle": [
      { name: "Paris 8", href: "/villes/paris-8-75008" },
      { name: "Paris 16", href: "/villes/paris-16-75016" },
      { name: "Saint-Denis", href: "/villes/saint-denis-93200" },
    ],
    "protection-rapprochee": [
      { name: "Paris 8", href: "/villes/paris-8-75008" },
      { name: "Paris 16", href: "/villes/paris-16-75016" },
      { name: "Neuilly-sur-Seine", href: "/villes/neuilly-sur-seine-92200" },
    ],
    "agent-cynophile": [
      { name: "Aubervilliers", href: "/villes/aubervilliers-93300" },
      { name: "Saint-Denis", href: "/villes/saint-denis-93200" },
      { name: "Rungis", href: "/villes/rungis-94150" },
    ],
    "audit-conseil-surete": [
      { name: "La Défense", href: "/villes/la-defense-92400" },
      { name: "Saclay", href: "/villes/saclay-91400" },
      { name: "Boulogne-Billancourt", href: "/villes/boulogne-billancourt-92100" },
    ],
  };
  return map[slug] ?? [];
}

function serviceContextBlocks(service: Service) {
  const common = {
    whenTitle: "Quand choisir ce service ?",
    scopeTitle: "Ce que couvre la prestation",
  };

  switch (service.slug) {
    case "agent-securite-qualifie":
      return {
        ...common,
        whenTitle: "Quand faire appel à un Agent de Sécurité Qualifié ?",
        when:
          "Pour une surveillance continue (24/7 ou horaires de bureau), le contrôle d’accès d’un siège, la prévention du vol dans un commerce, ou la sécurisation d’un site la nuit et le week-end.",
        scope:
          "Contrôle d’accès (personnes/véhicules), rondes de prévention, gestion des alarmes, application des consignes, rapports, première intervention et assistance à personnes.",
      };
    case "agent-cynophile":
      return {
        ...common,
        when:
          "Quand la dissuasion doit être maximale : chantiers, sites isolés, grands périmètres, zones de stockage. Le binôme homme-chien renforce la détection et réduit les risques d’intrusion.",
        scope:
          "Rondes périmétriques, sécurisation des points sensibles, levée de doute, surveillance nocturne, détection précoce, procédure d’alerte et mise en sécurité selon consignes.",
      };
    case "agent-incendie-ssiap":
      return {
        ...common,
        when:
          "Quand la réglementation impose une présence SSIAP (ERP/IGH) ou lorsque la prévention incendie est critique : centres commerciaux, immeubles de bureaux, hôtels, salles de spectacle.",
        scope:
          "Rondes techniques, vérifications SSI, gestion des alarmes, assistance à personnes, registre de sécurité, procédures d’évacuation, coordination avec les secours.",
      };
    case "agent-rondier":
      return {
        ...common,
        when:
          "Quand vous recherchez une sécurité mobile et économique : passages à horaires variables, levée de doute, interventions sur alarme. Adapté aux entrepôts, zones d’activités, chantiers, commerces fermés la nuit.",
        scope:
          "Planification de rondes, points de contrôle, levée de doute, sécurisation temporaire, compte rendu détaillé, coordination avec forces de l’ordre selon protocole.",
      };
    case "protection-rapprochee":
      return {
        ...common,
        when:
          "Quand une personne exposée doit être sécurisée sans perturber son quotidien : dirigeants, VIP, familles, délégations. Discrétion, anticipation, itinéraires et protocoles de crise.",
        scope:
          "Évaluation du risque, plan de protection, reconnaissances, sécurisation des déplacements, gestion des accès, coordination événementielle, adaptation en temps réel.",
      };
    case "securite-evenementielle":
      return {
        ...common,
        when:
          "Quand l’image, la fluidité et la maîtrise des accès sont essentielles : galas, lancements, défilés, événements corporate. Gestion des flux, zones VIP, accréditations et prévention.",
        scope:
          "Plan de sécurité, accueil et filtrage, zones sensibles, coordination avec l’organisation, briefings, reporting, ajustements selon l’évolution de l’événement.",
      };
    case "audit-conseil-surete":
      return {
        ...common,
        when:
          "Quand vous voulez une vision 360° : humain, technique et organisationnel. Idéal pour sièges, IGH, sites sensibles, logistique, campus. Objectif : réduire le risque et optimiser le budget.",
        scope:
          "Immersion, cartographie des risques, analyse des vulnérabilités, rapport priorisé et chiffré, aide au cahier des charges et accompagnement à la mise en œuvre.",
      };
    default:
      return {
        ...common,
        when:
          "Quand vous souhaitez un dispositif adapté à votre site, vos horaires, vos flux et votre niveau de risque. Nous cadrons la mission, dimensionnons le dispositif et assurons le suivi.",
        scope:
          "Analyse du besoin, consignes, déploiement d’équipes qualifiées, reporting et ajustements selon vos contraintes opérationnelles.",
      };
  }
}

function isTerrain(slug: string) {
  return [
    "agent-securite-qualifie",
    "agent-cynophile",
    "agent-incendie-ssiap",
    "agent-rondier",
  ].includes(slug);
}

function isPremium(slug: string) {
  return [
    "protection-rapprochee",
    "securite-evenementielle",
    "audit-conseil-surete",
  ].includes(slug);
}

function relatedServicesFor(service: Service) {
  const explicit = (service as any)?.page?.relatedServices as string[] | undefined;
  if (explicit?.length) {
    const bySlug = new Map(servicesData.map((s) => [s.slug, s] as const));
    return explicit
      .map((slug) => bySlug.get(slug))
      .filter(Boolean)
      .slice(0, 3) as Service[];
  }

  const group = isTerrain(service.slug)
    ? "terrain"
    : isPremium(service.slug)
    ? "premium"
    : "other";

  const candidates = servicesData.filter((s) => {
    if (s.slug === service.slug) return false;
    if (group === "terrain") return isTerrain(s.slug);
    if (group === "premium") return isPremium(s.slug);
    return !isTerrain(s.slug) && !isPremium(s.slug);
  });

  return candidates.slice(0, 3);
}

type FAQItem = { question: string; answer: string };

function normalizeFaq(service: Service): FAQItem[] {
  const longFaq = (service as any)?.page?.faqLong as
    | { question: string; answer: string }[]
    | undefined;

  if (Array.isArray(longFaq) && longFaq.length) {
    return longFaq
      .map((x) => ({
        question: x.question?.trim() ?? "",
        answer: x.answer?.trim() ?? "",
      }))
      .filter((x) => x.question && x.answer);
  }

  const baseFaq = (service.faq ?? []) as any[];
  return baseFaq
    .map((x) => ({
      question: String(x.question ?? x.q ?? "").trim(),
      answer: String(x.answer ?? x.a ?? "").trim(),
    }))
    .filter((x) => x.question && x.answer);
}

type PageSection = {
  id: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  bullets?: string[];
  note?: string;
  internalLinks?: { label: string; href: string }[];
};

function getPageSections(service: Service): PageSection[] {
  const sections = (service as any)?.page?.sections as PageSection[] | undefined;
  return Array.isArray(sections) ? sections : [];
}

/**
 * 3 images par page:
 * - 1 verticale (portrait)
 * - 2 paysages (landscape)
 *
 * Ici on fait simple: on prend un pool d’images PlaceHolderImages
 * et on “pin” l’image hero + 2 autres différentes.
 * Si tu veux un tri parfait portrait/paysage: on pourra ajouter un champ aspect dans PlaceHolderImages.
 */
function pickServiceImages(service: Service) {
  const simpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const hero =
    PlaceHolderImages.find((p) => p.id === service.heroImageId) ??
    PlaceHolderImages.find((p) => p.id === "hero");

  // Pool of images excluding the hero image to avoid repetition on the same page
  const pool = PlaceHolderImages.filter((p) => p.id !== hero?.id && p.imageUrl);

  // Fallback if the pool is too small
  if (pool.length < 3) {
    return {
      portrait: pool[0] ?? hero!,
      landscape1: pool[1] ?? pool[0] ?? hero!,
      landscape2: pool[2] ?? pool[1] ?? pool[0] ?? hero!,
    };
  }

  const hash = simpleHash(service.slug);

  // Use the hash to get different starting points for each service
  const index1 = hash % pool.length;
  const index2 = (index1 + 1) % pool.length;
  const index3 = (index2 + 1) % pool.length;

  // This ensures 3 different images if the pool is large enough
  const img1 = pool[index1];
  const img2 = pool[index2];
  const img3 = pool[index3];

  // Heuristic to find a portrait-like image. This can be improved.
  // For now, we'll just assign them based on index.
  // The layout is what will determine the final rendering shape.
  return {
    portrait: img1!,
    landscape1: img2!,
    landscape2: img3!,
  };
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) return {};

  const title = `${service.title} | ${siteConfig.name}`;
  const description = buildMetaDescription(service);
  const url = toCanonical(`/services/${service.slug}`);

  return {
    title,
    description,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  const heroImage =
    PlaceHolderImages.find((p) => p.id === service.heroImageId) ??
    PlaceHolderImages.find((p) => p.id === "hero");

  const gallery = pickServiceImages(service);

  const phoneHref = `tel:${String(
    (siteConfig.contact as any).phoneE164 ?? siteConfig.contact.phone
  )
    .replace(/\s/g, "")
    .trim()}`;

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title, href: `/services/${service.slug}` },
  ];

  const blocks = serviceContextBlocks(service);
  const cityLinks = cityLinksForService(service.slug);
  const related = relatedServicesFor(service);

  const pageLead = (service as any)?.page?.lead as string | undefined;
  const longSections = getPageSections(service);
  const faqItems = normalizeFaq(service);

  const miniNav = [
    { id: "overview", label: "Vue d’ensemble" },
    ...(longSections.length ? [{ id: "details", label: "Détails" }] : []),
    { id: "benefits", label: "Avantages" },
    { id: "method", label: "Méthode" },
    { id: "sectors", label: "Secteurs" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div
      className="bg-background text-foreground"
      style={{ ["--brand-accent" as any]: BRAND_ACCENT }}
    >
      <ServiceJsonLd service={service} breadcrumbs={breadcrumbItems} />

      <HeroSection
        title={service.title}
        description={pageLead || service.shortDescription || service.description}
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Appeler", href: phoneHref, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? `${service.title} — ${siteConfig.name}`}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="mb-4 py-0" />}
      />

      {/* MINI NAV — plus léger + scroll horizontal */}
      <AnimateOnScroll>
        <section className="container mx-auto max-w-6xl px-4 -mt-10 pb-6">
          <div className="sticky top-2 z-20 rounded-2xl border border-border bg-background/75 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-1 py-1">
              {miniNav.map((it) => (
                <Link
                  key={it.id}
                  href={`#${it.id}`}
                  className="shrink-0 rounded-full border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                >
                  {it.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* VUE D’ENSEMBLE — contenu + conversion + ressources */}
      <AnimateOnScroll>
        <section
          id="overview"
          className="container mx-auto max-w-6xl px-4 pb-14 md:pb-20"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Colonne contenu */}
            <div className="space-y-8">
              <div className="rounded-3xl border border-border bg-background p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-headline text-2xl font-semibold md:text-3xl">
                      {blocks.whenTitle}
                    </h2>
                    <p className="mt-3 text-muted-foreground">{blocks.when}</p>
                  </div>
                  <span
                    className="hidden h-11 w-11 rounded-2xl md:inline-flex"
                    style={{
                      backgroundColor:
                        "color-mix(in oklab, var(--brand-accent) 16%, transparent)",
                    }}
                  />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-muted/10 p-5">
                    <div className="text-sm font-semibold">
                      {blocks.scopeTitle}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {blocks.scope}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-muted/10 p-5">
                    <div className="text-sm font-semibold">
                      Couverture Île-de-France
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Dispositifs cadrés, équipes qualifiées, supervision et
                      reporting.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["75", "92", "93", "94", "95", "78", "77", "91"].map(
                        (d) => (
                          <Badge key={d} variant="secondary">
                            {d}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <div className="text-sm font-semibold">Encadrement</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Briefings, consignes, contrôle qualité, supervision terrain.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <div className="text-sm font-semibold">Reporting</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Remontées claires, rapports, ajustements selon activité.
                    </p>
                  </div>
                </div>
              </div>

              {(cityLinks.length > 0 || related.length > 0) && (
                <div className="grid gap-4 md:grid-cols-2">
                  {cityLinks.length > 0 && (
                    <div className="rounded-3xl border border-border bg-background p-6">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="font-headline text-lg font-semibold">
                            Exemples de pages locales
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Pages adaptées aux enjeux (luxe, bureaux, chantiers,
                            événementiel…).
                          </p>
                        </div>
                        <Link
                          href="/villes"
                          className="text-sm font-medium hover:underline"
                          style={{ color: "var(--brand-accent)" }}
                        >
                          Tout voir
                        </Link>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {cityLinks.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="rounded-xl border border-border bg-muted/10 px-3 py-2 text-sm hover:bg-muted/30"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {related.length > 0 && (
                    <div className="rounded-3xl border border-border bg-background p-6">
                      <h3 className="font-headline text-lg font-semibold">
                        Services liés
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Prestations complémentaires pour un dispositif cohérent.
                      </p>

                      <div className="mt-4 space-y-3">
                        {related.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="block rounded-2xl border border-border bg-muted/10 p-4 transition hover:bg-muted/30"
                          >
                            <div className="text-sm font-semibold">{s.title}</div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              {s.shortDescription}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Colonne sticky conversion (desktop) */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-3xl border border-border bg-background p-6">
                <div className="text-sm font-semibold">Demande rapide</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Décris ton site, tes horaires, tes accès et tes contraintes : on
                  te répond avec une proposition structurée.
                </p>

                <div className="mt-5 flex flex-col gap-3">
                  <Button
                    asChild
                    className={cn(
                      "h-11 rounded-xl text-white",
                      "bg-[var(--brand-accent)] hover:bg-[var(--brand-accent)]/90"
                    )}
                  >
                    <Link href="/devis">Demander un devis</Link>
                  </Button>

                  <Button asChild variant="outline" className="h-11 rounded-xl">
                    <a href={phoneHref} aria-label="Appeler">
                      Appeler
                    </a>
                  </Button>
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-muted/10 p-4">
                  <div className="text-sm font-semibold">
                    À préciser (idéalement)
                  </div>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li>• Type de site / lieu</li>
                    <li>• Horaires & jours</li>
                    <li>• Accès, flux, zones sensibles</li>
                    <li>• Contraintes (ERP/IGH, VIP, événement…)</li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </AnimateOnScroll>

      {/* ENGAGEMENTS */}
      {service.whyUs?.length ? (
        <AnimateOnScroll>
          <section className="border-y border-border bg-muted/10 py-14 md:py-20">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="font-headline text-3xl font-bold md:text-4xl">
                  Nos engagements pour ce service
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Exécution propre, encadrement, traçabilité : un standard stable,
                  mission après mission.
                </p>
              </div>
              <div className="mt-10">
                <TrustElements elements={service.whyUs} />
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      ) : null}

      {/* SECTIONS LONGUES */}
      {longSections.length ? (
        <AnimateOnScroll>
          <section
            id="details"
            className="container mx-auto max-w-6xl px-4 py-14 md:py-20"
          >
            <div className="mx-auto max-w-4xl">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                Approche & Méthodologie
              </h2>
              <p className="mt-3 text-muted-foreground">
                Un contenu détaillé pour comprendre la méthode, le cadrage et
                le niveau d’exigence de nos prestations.
              </p>

              <div className="mt-10 space-y-10">
                {longSections.map((sec, index) => (
                  <React.Fragment key={sec.id}>
                    <article className="border-l-2 border-border pl-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-headline text-2xl font-semibold">
                          {sec.title}
                        </h3>
                        <span
                          className="mt-1 hidden h-3 w-3 shrink-0 rounded-full md:inline-flex"
                          style={{
                            backgroundColor:
                              "color-mix(in oklab, var(--brand-accent) 65%, transparent)",
                          }}
                        />
                      </div>

                      {sec.intro ? (
                        <p className="mt-3 text-muted-foreground">{sec.intro}</p>
                      ) : null}

                      {sec.paragraphs?.length ? (
                        <div className="mt-4 space-y-3 text-muted-foreground">
                          {sec.paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                          ))}
                        </div>
                      ) : null}

                      {sec.bullets?.length ? (
                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                          {sec.bullets.map((b, i) => (
                            <li
                              key={i}
                              className="rounded-2xl border border-border bg-muted/10 px-4 py-3 text-sm"
                            >
                              {b}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {sec.internalLinks?.length ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {sec.internalLinks.map((l) => (
                            <Link
                              key={l.href}
                              href={l.href}
                              className="rounded-xl border border-border bg-muted/10 px-3 py-2 text-sm hover:bg-muted/30"
                            >
                              {l.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}

                      {sec.note ? (
                        <div className="mt-6 rounded-2xl border border-border bg-background p-5">
                          <div className="text-sm font-semibold">À retenir</div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {sec.note}
                          </p>
                        </div>
                      ) : null}
                    </article>

                    {index === 1 && longSections.length > 2 && (
                        <div className="relative my-12 overflow-hidden rounded-2xl border border-border bg-muted/10">
                        <div className="relative aspect-video w-full">
                            <Image
                            src={gallery.landscape1.imageUrl}
                            alt={gallery.landscape1.description ?? `${service.title} illustration`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 800px"
                            priority={false}
                            />
                        </div>
                        </div>
                    )}
                    
                    {index === 3 && longSections.length > 4 && (
                        <div className="my-12 grid grid-cols-1 items-center gap-8 md:grid-cols-3">
                            <div className="relative order-last overflow-hidden rounded-2xl border border-border bg-muted/10 md:order-first md:col-span-1">
                                <div className="relative aspect-[3/4] w-full">
                                <Image
                                    src={gallery.portrait.imageUrl}
                                    alt={gallery.portrait.description ?? `${service.title} en situation`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority={false}
                                />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <blockquote className="border-l-4 border-primary pl-6 text-xl italic text-muted-foreground">
                                    "La qualité d'un dispositif de sécurité ne se mesure pas au nombre d'agents, mais à la rigueur de son organisation, à la clarté de ses consignes et à la pertinence de sa supervision."
                                </blockquote>
                            </div>
                        </div>
                    )}

                    {index === 5 && longSections.length > 6 && (
                        <div className="relative my-12 overflow-hidden rounded-2xl border border-border bg-muted/10">
                        <div className="relative aspect-video w-full">
                            <Image
                            src={gallery.landscape2.imageUrl}
                            alt={gallery.landscape2.description ?? `${service.title} en action`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 800px"
                            priority={false}
                            />
                        </div>
                        </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      ) : null}

      {/* BENEFITS */}
      <AnimateOnScroll>
        <section id="benefits">
          <BenefitsSection
            title="Vos avantages clés"
            description={`Découvrez les bénéfices concrets de notre service : ${service.title.toLowerCase()}.`}
            benefits={service.benefits ?? []}
          />
        </section>
      </AnimateOnScroll>

      {/* METHOD */}
      <AnimateOnScroll>
        <section
          id="method"
          className="container mx-auto max-w-6xl px-4 py-14 md:py-20"
        >
          <ProcessSteps
            title={service.method?.title ?? "Une méthode claire, un pilotage précis"}
            description={
              service.method?.description ??
              "Du cadrage à l’exécution : un dispositif pensé, déployé, puis supervisé."
            }
            steps={service.method?.steps ?? []}
          />
        </section>
      </AnimateOnScroll>

      {/* SECTORS */}
      <AnimateOnScroll>
        <section
          id="sectors"
          className="border-t border-border bg-background py-14 md:py-20"
        >
          <div className="container mx-auto max-w-6xl px-4">
            <SectorsGrid sectors={service.sectors ?? []} />
          </div>
        </section>
      </AnimateOnScroll>

      {/* FAQ */}
      <AnimateOnScroll>
        <section id="faq" className="border-t border-border bg-background py-14 md:py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <FAQAccordion
              title="Questions fréquentes"
              description={`Les réponses à vos questions sur ${service.title.toLowerCase()}.`}
              items={faqItems}
            />
          </div>
        </section>
      </AnimateOnScroll>

      {/* CTA FINAL */}
      <AnimateOnScroll>
        <CTASection
          id="contact"
          title="Obtenez une proposition claire et adaptée"
          description="Décrivez votre site, vos horaires et vos contraintes : nous revenons vers vous avec une proposition structurée."
          cta={{ label: "Demander un devis", href: "/devis" }}
        />
      </AnimateOnScroll>
    </div>
  );
}
