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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServicePageNavigation } from "@/components/services/service-page-navigation";

type ServicePageProps = {
  params: { slug: string };
};

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

function pickServiceImages(service: Service) {
  const simpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const hero =
    PlaceHolderImages.find((p) => p.id === service.heroImageId) ??
    PlaceHolderImages.find((p) => p.id === "hero");

  const pool = PlaceHolderImages.filter((p) => p.id !== hero?.id && p.imageUrl);

  if (pool.length < 3) {
    return {
      portrait: pool[0] ?? hero!,
      landscape1: pool[1] ?? pool[0] ?? hero!,
      landscape2: pool[2] ?? pool[1] ?? pool[0] ?? hero!,
    };
  }

  const hash = simpleHash(service.slug);

  const index1 = hash % pool.length;
  const index2 = (index1 + 1) % pool.length;
  const index3 = (index2 + 1) % pool.length;
  
  const img1 = pool[index1];
  const img2 = pool[index2];
  const img3 = pool[index3];

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
  const related = relatedServicesFor(service);

  const pageLead = (service as any)?.page?.lead as string | undefined;
  const longSections = getPageSections(service);
  const faqItems = normalizeFaq(service);

  const miniNav = [
    { id: "overview", label: "Vue d’ensemble" },
    ...(longSections.length ? [{ id: "details", label: "Détails" }] : []),
    ...(service.benefits && service.benefits.length > 0 ? [{ id: "benefits", label: "Avantages" }] : []),
    ...(service.method?.steps.length > 0 ? [{ id: "method", label: "Méthode" }] : []),
    ...(service.sectors && service.sectors.length > 0 ? [{ id: "sectors", label: "Secteurs" }] : []),
    ...(faqItems.length > 0 ? [{ id: "faq", label: "FAQ" }] : []),
    { id: "contact", label: "Contact" },
  ].filter(Boolean);

  return (
    <div className="bg-background text-foreground">
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

      <AnimateOnScroll>
          <ServicePageNavigation items={miniNav} />
      </AnimateOnScroll>

      <AnimateOnScroll>
          <section id="overview" className="py-16 md:py-24">
              <div className="container mx-auto max-w-5xl px-4">
                  <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Vue d'ensemble</p>
                        <h2 className="mt-2 font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
                          {blocks.whenTitle}
                      </h2>
                      <p className="mt-4 text-lg text-muted-foreground">
                          {blocks.when}
                      </p>
                  </div>

                  <div className="mt-12 grid gap-8 md:grid-cols-2">
                        <Card className="bg-muted/30">
                            <CardHeader>
                                <CardTitle>{blocks.scopeTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{blocks.scope}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-muted/30">
                          <CardHeader>
                                <CardTitle>Couverture & Fiabilité</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                  Dispositifs cadrés sur toute l'Île-de-France, équipes qualifiées, supervision et reporting.
                                </p>
                            </CardContent>
                        </Card>
                  </div>
                    <div className="mt-12 text-center">
                      <Button asChild size="lg">
                          <Link href="/devis">Obtenir une proposition sur-mesure</Link>
                      </Button>
                  </div>
              </div>
          </section>
      </AnimateOnScroll>
      
      {service.whyUs?.length ? (
          <AnimateOnScroll>
          <section className="border-y bg-card py-16 md:py-24">
              <div className="container mx-auto max-w-6xl px-4">
              <div className="mx-auto max-w-3xl text-center">
                  <h2 className="font-headline text-3xl font-bold md:text-4xl">
                  Nos engagements pour ce service
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                  Exécution propre, encadrement, traçabilité : un standard stable,
                  mission après mission.
                  </p>
              </div>
              <div className="mt-12">
                  <TrustElements elements={service.whyUs} />
              </div>
              </div>
          </section>
          </AnimateOnScroll>
      ) : null}

      {longSections.length > 0 && (
          <AnimateOnScroll>
          <section
              id="details"
              className="py-16 md:py-24"
          >
              <div className="container mx-auto max-w-4xl px-4">
                  <div className="mx-auto max-w-3xl text-center">
                      <h2 className="font-headline text-3xl font-bold md:text-4xl">
                          Notre Approche en Détail
                      </h2>
                      <p className="mt-4 text-lg text-muted-foreground">
                          Comprendre la méthode, le cadrage et le niveau d’exigence de nos prestations pour une sécurité maîtrisée.
                      </p>
                  </div>

                  <div className="mt-16 space-y-12 prose prose-lg dark:prose-invert max-w-none">
                      {longSections.map((sec, index) => (
                      <React.Fragment key={sec.id}>
                          <div className="mx-auto">
                              <h3 className="!mb-2 text-2xl font-semibold tracking-tight text-primary">
                                  {sec.title}
                              </h3>

                              {sec.intro ? (
                                  <p className="lead !my-4 text-muted-foreground">{sec.intro}</p>
                              ) : null}

                              {sec.paragraphs?.length ? (
                                  <div className="space-y-4 text-foreground/80">
                                  {sec.paragraphs.map((p, i) => (
                                      <p key={i}>{p}</p>
                                  ))}
                                  </div>
                              ) : null}

                              {sec.bullets?.length ? (
                                  <ul className="mt-6 space-y-3">
                                  {sec.bullets.map((b, i) => (
                                      <li key={i}>{b}</li>
                                  ))}
                                  </ul>
                              ) : null}

                              {sec.note ? (
                                  <div className="my-6 rounded-lg border bg-card p-5 not-prose">
                                      <p className="text-sm font-semibold text-card-foreground">À retenir</p>
                                      <p className="mt-1 text-sm text-muted-foreground">
                                          {sec.note}
                                      </p>
                                  </div>
                              ) : null}

                                {sec.internalLinks?.length ? (
                                  <div className="mt-6 flex flex-wrap gap-2 not-prose">
                                  {sec.internalLinks.map((l) => (
                                      <Button asChild variant="secondary" size="sm" key={l.href}>
                                          <Link href={l.href}>{l.label}</Link>
                                      </Button>
                                  ))}
                                  </div>
                              ) : null}
                          </div>
                          
                          {index === 1 && longSections.length > 2 && (
                              <div className="relative my-12 overflow-hidden rounded-2xl">
                                  <div className="relative aspect-video w-full">
                                      <Image src={gallery.landscape1.imageUrl} alt={gallery.landscape1.description ?? `${service.title} illustration`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 800px" />
                                  </div>
                              </div>
                          )}
                          
                          {index === 3 && longSections.length > 4 && (
                              <div className="my-12 grid grid-cols-1 items-center gap-8 md:grid-cols-3">
                                  <div className="relative order-last overflow-hidden rounded-2xl md:order-first md:col-span-1">
                                      <div className="relative aspect-[3/4] w-full">
                                          <Image src={gallery.portrait.imageUrl} alt={gallery.portrait.description ?? `${service.title} en situation`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw"/>
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
                              <div className="relative my-12 overflow-hidden rounded-2xl">
                                  <div className="relative aspect-video w-full">
                                      <Image src={gallery.landscape2.imageUrl} alt={gallery.landscape2.description ?? `${service.title} en action`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 800px"/>
                                  </div>
                              </div>
                          )}
                      </React.Fragment>
                      ))}
                  </div>
              </div>
          </section>
          </AnimateOnScroll>
      )}
      
      {service.benefits && service.benefits.length > 0 && (
          <AnimateOnScroll>
              <section id="benefits" className="bg-card">
                  <BenefitsSection
                      title="Vos avantages clés"
                      description={`Découvrez les bénéfices concrets de notre service : ${service.title.toLowerCase()}.`}
                      benefits={service.benefits ?? []}
                  />
              </section>
          </AnimateOnScroll>
      )}
      
      {service.method?.steps.length > 0 && (
          <AnimateOnScroll>
              <section id="method" className="py-16 md:py-24">
                  <div className="container mx-auto max-w-6xl px-4">
                      <ProcessSteps
                          title={service.method?.title ?? "Une méthode claire, un pilotage précis"}
                          description={ service.method?.description ?? "Du cadrage à l’exécution : un dispositif pensé, déployé, puis supervisé."}
                          steps={service.method?.steps ?? []}
                      />
                  </div>
              </section>
          </AnimateOnScroll>
      )}

      {service.sectors && service.sectors.length > 0 && (
          <AnimateOnScroll>
              <section id="sectors" className="bg-card py-16 md:py-24">
                  <div className="container mx-auto max-w-6xl px-4">
                      <SectorsGrid sectors={service.sectors ?? []} />
                  </div>
              </section>
          </AnimateOnScroll>
      )}

      {faqItems.length > 0 && (
            <AnimateOnScroll>
              <section id="faq" className="py-16 md:py-24">
                  <div className="container mx-auto max-w-3xl px-4">
                      <FAQAccordion
                      title="Questions fréquentes"
                      description={`Les réponses à vos questions sur ${service.title.toLowerCase()}.`}
                      items={faqItems}
                      />
                  </div>
              </section>
          </AnimateOnScroll>
      )}

      {related.length > 0 && (
          <AnimateOnScroll>
              <section className="bg-card py-16 md:py-24">
                  <div className="container mx-auto max-w-5xl px-4">
                      <div className="mx-auto max-w-3xl text-center">
                          <h2 className="font-headline text-3xl font-bold md:text-4xl">
                              Services Complémentaires
                          </h2>
                          <p className="mt-4 text-lg text-muted-foreground">
                              Des prestations additionnelles pour construire un dispositif de sûreté global et cohérent.
                          </p>
                      </div>
                      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {related.map((s) => (
                              <Link key={s.slug} href={`/services/${s.slug}`} className="block h-full">
                                  <Card className="h-full transition hover:shadow-lg">
                                      <CardHeader>
                                          <CardTitle className="text-base">{s.title}</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                          <p className="text-sm text-muted-foreground">{s.shortDescription}</p>
                                      </CardContent>
                                  </Card>
                              </Link>
                          ))}
                      </div>
                  </div>
              </section>
          </AnimateOnScroll>
      )}

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
