
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import React from "react";

import { servicesData, type Service } from "@/lib/services-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { siteConfig } from "@/lib/config";

import {
  ProcessSteps,
  SectorsGrid,
  FAQAccordion,
  CTASection,
  Breadcrumbs,
  BenefitsSection,
  AnimateOnScroll,
  TrustElements,
  HeroSection,
} from "@/components/shared";

import ServiceJsonLd from "@/components/seo/service-json-ld";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServicePageNavigation } from "@/components/services/service-page-navigation";

type ServicePageProps = {
  params: { slug: string };
};

type MiniNavItem = { id: string; label: string };
type FAQItem = { question: string; answer: string };

function toAbsolute(path: string) {
  const base = (siteConfig?.url || "").replace(/\/$/, "");
  if (!base) return path.startsWith("/") ? path : `/${path}`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

function buildMetaDescription(service: Service) {
  const base = (service.shortDescription || service.title).trim().replace(/\s+/g, " ");
  const suffix = " Intervention Île-de-France : 78, 75, 92, 93, 94, 95, 77, 91.";
  const text = `${base}${base.endsWith(".") ? "" : "."}${suffix}`;
  return text.length > 170 ? `${text.slice(0, 167)}…` : text;
}

function isTerrain(slug: string) {
  return ["agent-securite-qualifie", "agent-cynophile", "agent-incendie-ssiap", "agent-rondier"].includes(slug);
}
function isPremium(slug: string) {
  return ["protection-rapprochee", "securite-evenementielle", "audit-conseil-surete"].includes(slug);
}

function relatedServicesFor(service: Service) {
  const explicit = (service as any)?.page?.relatedServices as string[] | undefined;
  if (explicit?.length) {
    const bySlug = new Map(servicesData.map((s) => [s.slug, s] as const));
    return explicit.map((slug) => bySlug.get(slug)).filter(Boolean).slice(0, 3) as Service[];
  }

  const group = isTerrain(service.slug) ? "terrain" : isPremium(service.slug) ? "premium" : "other";
  const candidates = servicesData.filter((s) => {
    if (s.slug === service.slug) return false;
    if (group === "terrain") return isTerrain(s.slug);
    if (group === "premium") return isPremium(s.slug);
    return !isTerrain(s.slug) && !isPremium(s.slug);
  });

  return candidates.slice(0, 3);
}

function normalizeFaq(service: Service): FAQItem[] {
  const longFaq = (service as any)?.page?.faqLong as { question: string; answer: string }[] | undefined;
  if (Array.isArray(longFaq) && longFaq.length) {
    return longFaq
      .map((x) => ({ question: x.question?.trim() ?? "", answer: x.answer?.trim() ?? "" }))
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

function cleanPhoneE164() {
  const raw =
    String((siteConfig?.contact as any)?.phoneE164 ?? siteConfig?.contact?.phone ?? "")
      .trim()
      .replace(/\s+/g, "");
  return raw.startsWith("+") ? raw : raw;
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
        whenTitle: "Quand faire appel à un agent de sécurité qualifié ?",
        when:
          "Pour une surveillance continue (24/7 ou horaires de bureau), un contrôle d’accès, la prévention des intrusions/vols, et la sécurisation d’un site la nuit et le week-end.",
        scope:
          "Contrôle d’accès (personnes/véhicules), rondes, application des consignes, gestion des alarmes, rapports, première intervention et assistance à personnes.",
      };
    case "agent-cynophile":
      return {
        ...common,
        when:
          "Quand la dissuasion doit être maximale : chantiers, sites isolés, grands périmètres, zones de stockage. Le binôme homme-chien renforce la détection et réduit les risques d’intrusion.",
        scope:
          "Rondes périmétriques, sécurisation des points sensibles, levée de doute, surveillance nocturne, détection précoce, procédure d’alerte selon consignes.",
      };
    case "agent-incendie-ssiap":
      return {
        ...common,
        when:
          "Quand la réglementation impose une présence SSIAP (ERP/IGH) ou lorsque la prévention incendie est critique : centres commerciaux, bureaux, hôtels, salles de spectacle.",
        scope:
          "Rondes techniques, vérifications SSI, gestion des alarmes, assistance à personnes, registre de sécurité, procédures d’évacuation, coordination avec les secours.",
      };
    case "agent-rondier":
      return {
        ...common,
        when:
          "Quand vous recherchez une sécurité mobile : passages à horaires variables, levée de doute, interventions sur alarme. Adapté aux entrepôts, zones d’activités, chantiers, commerces fermés la nuit.",
        scope:
          "Planification de rondes, points de contrôle, levée de doute, sécurisation temporaire, compte rendu détaillé, coordination selon protocole.",
      };
    case "protection-rapprochee":
      return {
        ...common,
        when:
          "Quand une personne exposée doit être sécurisée sans perturber son quotidien : dirigeants, VIP, familles, délégations. Discrétion, anticipation, itinéraires, protocole et gestion de crise.",
        scope:
          "Évaluation du risque, plan de protection, reconnaissances, sécurisation des déplacements, gestion des accès, coordination événementielle, adaptation en temps réel.",
      };
    case "securite-evenementielle":
      return {
        ...common,
        when:
          "Quand l’image, la fluidité et la maîtrise des accès sont essentielles : galas, lancements, défilés, événements corporate. Gestion des flux, zones VIP, accréditations et prévention.",
        scope:
          "Plan de sécurité, accueil et filtrage, zones sensibles, coordination organisation, briefings, reporting, ajustements selon l’évolution de l’événement.",
      };
    case "audit-conseil-surete":
      return {
        ...common,
        when:
          "Quand vous voulez une vision 360° : humain, technique et organisationnel. Idéal pour sièges, sites sensibles, logistique. Objectif : réduire le risque et optimiser le budget.",
        scope:
          "Immersion, cartographie des risques, analyse des vulnérabilités, rapport priorisé, recommandations chiffrées, aide au cahier des charges et accompagnement.",
      };
    default:
      return {
        ...common,
        when:
          "Quand vous souhaitez un dispositif adapté à votre site, vos flux, vos horaires et votre niveau de risque. Nous cadrons, dimensionnons et assurons le suivi.",
        scope:
          "Analyse du besoin, consignes, déploiement d’équipes qualifiées, reporting et ajustements selon vos contraintes opérationnelles.",
      };
  }
}

function pickServiceImages(service: Service) {
  const simpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      hash = (hash << 5) - hash + c;
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const hero =
    PlaceHolderImages.find((p) => p.id === service.heroImageId) ??
    PlaceHolderImages.find((p) => p.id === "hero");

  const pool = PlaceHolderImages.filter((p) => p.id !== hero?.id && p.imageUrl);
  if (!pool.length) {
    return { portrait: hero!, landscape1: hero!, landscape2: hero! };
  }

  const hash = simpleHash(service.slug);
  const i1 = hash % pool.length;
  const i2 = (i1 + 1) % pool.length;
  const i3 = (i2 + 1) % pool.length;

  return {
    portrait: pool[i1] ?? hero!,
    landscape1: pool[i2] ?? hero!,
    landscape2: pool[i3] ?? hero!,
  };
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) return {};

  const title = `${service.title} | ${siteConfig?.name ?? "Basic Protection Privée"}`;
  const description = buildMetaDescription(service);
  const canonical = toAbsolute(`/services/${service.slug}`);

  return {
    title,
    description,
    keywords: service.keywords?.length ? [...service.keywords] : undefined,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: siteConfig?.name ?? "Basic Protection Privée",
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

  const phoneHref = `tel:${cleanPhoneE164()}`;

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title },
  ];

  const blocks = serviceContextBlocks(service);
  const related = relatedServicesFor(service);
  const longSections = getPageSections(service);
  const faqItems = normalizeFaq(service);

  const pageLead = (service as any)?.page?.lead as string | undefined;

  const miniNav: MiniNavItem[] = [
    { id: "overview", label: "Vue d’ensemble" },
    ...(longSections.length ? [{ id: "details", label: "Détails" }] : []),
    ...(service.benefits?.length ? [{ id: "benefits", label: "Avantages" }] : []),
    ...(service.method?.steps?.length ? [{ id: "method", label: "Méthode" }] : []),
    ...(service.sectors?.length ? [{ id: "sectors", label: "Secteurs" }] : []),
    ...(faqItems.length ? [{ id: "faq", label: "FAQ" }] : []),
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="bg-background text-foreground">
      <ServiceJsonLd service={service} breadcrumbs={breadcrumbItems} />

      <HeroSection
        title={service.title}
        description={pageLead || service.shortDescription || service.description}
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Appeler", href: phoneHref, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? `${service.title} — ${siteConfig?.name ?? "Basic Protection Privée"}`}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="mb-4 py-0" />}
      />

      <ServicePageNavigation items={miniNav} />

      {/* OVERVIEW */}
      <AnimateOnScroll>
        <section id="overview" className="py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                Cadrage • Exécution • Suivi
              </Badge>

              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Vue d&apos;ensemble
              </p>
              <h2 className="mt-2 font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
                {blocks.whenTitle}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{blocks.when}</p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Card className="bg-muted/30 rounded-2xl">
                <CardHeader>
                  <CardTitle>{blocks.scopeTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{blocks.scope}</p>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 rounded-2xl">
                <CardHeader>
                  <CardTitle>Engagement de qualité</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Agents qualifiés, consignes précises, supervision et reporting : un dispositif lisible et stable,
                    mission après mission.
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

      {/* TRUST / WHY US */}
      {service.whyUs?.length ? (
        <AnimateOnScroll>
          <section className="border-y bg-card py-16 md:py-24">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-headline text-3xl font-bold md:text-4xl">
                  Nos engagements pour ce service
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Une exécution propre, de la transparence, et un suivi opérationnel réel.
                </p>
              </div>

              <div className="mt-12">
                <TrustElements elements={[...service.whyUs]} />
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      ) : null}

      {/* DETAILS */}
      {longSections.length > 0 && (
        <AnimateOnScroll>
          <section id="details" className="py-16 md:py-24">
            <div className="container mx-auto max-w-4xl px-4">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-headline text-3xl font-bold md:text-4xl">
                  Notre approche en détail
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Méthode, cadrage, consignes et supervision : ce qui fait la différence sur le terrain.
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
                          {sec.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                      ) : null}

                      {sec.bullets?.length ? (
                        <ul className="mt-6 space-y-3">
                          {sec.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      ) : null}

                      {sec.note ? (
                        <div className="my-6 rounded-2xl border bg-card p-5 not-prose">
                          <p className="text-sm font-semibold text-card-foreground">À retenir</p>
                          <p className="mt-1 text-sm text-muted-foreground">{sec.note}</p>
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
                          <Image
                            src={gallery.landscape1.imageUrl}
                            alt={gallery.landscape1.description ?? `${service.title} illustration`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 800px"
                          />
                        </div>
                      </div>
                    )}

                    {index === 3 && longSections.length > 4 && (
                      <div className="my-12 grid grid-cols-1 items-center gap-8 md:grid-cols-3">
                        <div className="relative order-last overflow-hidden rounded-2xl md:order-first md:col-span-1">
                          <div className="relative aspect-[3/4] w-full">
                            <Image
                              src={gallery.portrait.imageUrl}
                              alt={gallery.portrait.description ?? `${service.title} en situation`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <blockquote className="border-l-4 border-primary pl-6 text-xl italic text-muted-foreground">
                            &quot;La qualité d&apos;un dispositif de sécurité se mesure à la clarté des consignes, au
                            niveau d’encadrement et à la supervision — pas au bruit.&quot;
                          </blockquote>
                        </div>
                      </div>
                    )}

                    {index === 5 && longSections.length > 6 && (
                      <div className="relative my-12 overflow-hidden rounded-2xl">
                        <div className="relative aspect-video w-full">
                          <Image
                            src={gallery.landscape2.imageUrl}
                            alt={gallery.landscape2.description ?? `${service.title} en action`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 800px"
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
      )}

      {/* BENEFITS */}
      {service.benefits?.length ? (
        <AnimateOnScroll>
          <BenefitsSection
            id="benefits"
            title="Vos avantages clés"
            description={`Les bénéfices concrets de notre service : ${service.title.toLowerCase()}.`}
            benefits={[...service.benefits]}
            className="bg-card"
          />
        </AnimateOnScroll>
      ) : null}

      {/* METHOD */}
      {service.method?.steps?.length ? (
        <AnimateOnScroll>
          <ProcessSteps
            id="method"
            title={service.method?.title ?? "Une méthode claire, un pilotage précis"}
            description={
              service.method?.description ??
              "Du cadrage à l’exécution : un dispositif pensé, déployé, puis supervisé."
            }
            steps={[...service.method.steps]}
          />
        </AnimateOnScroll>
      ) : null}

      {/* SECTORS */}
      {service.sectors?.length ? (
        <AnimateOnScroll>
          <SectorsGrid id="sectors" sectors={[...service.sectors]} className="bg-card" />
        </AnimateOnScroll>
      ) : null}

      {/* FAQ */}
      {faqItems.length ? (
        <AnimateOnScroll>
          <FAQAccordion
            id="faq"
            title="Questions fréquentes"
            description={`Les réponses à vos questions sur ${service.title.toLowerCase()}.`}
            items={faqItems}
          />
        </AnimateOnScroll>
      ) : null}

      {/* RELATED */}
      {related.length ? (
        <AnimateOnScroll>
          <section className="bg-card py-16 md:py-24">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-headline text-3xl font-bold md:text-4xl">
                  Services complémentaires
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Pour construire un dispositif global cohérent : associez les bons services, au bon niveau.
                </p>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="block h-full">
                    <Card className="h-full transition hover:shadow-lg rounded-2xl">
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
      ) : null}

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
