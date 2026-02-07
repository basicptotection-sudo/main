
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ChevronDown } from 'lucide-react';

import { servicesData, type Service } from "@/lib/services-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { siteConfig } from "@/lib/config";
import { getLucideIcon } from "@/lib/icons";

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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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

function ProtectionRapprocheePage({ service }: { service: Service }) {
  const { benefits, method, sectors, faq } = service;
  const heroImage = PlaceHolderImages.find(p => p.id === service.heroImageId) ?? PlaceHolderImages.find(p => p.id === "hero");
  const phoneHref = `tel:${siteConfig.contact.phoneE164 || siteConfig.contact.phone.replace(/\s/g, "")}`;

  const principles = [
    {
      icon: 'Eye',
      title: 'Anticipation',
      description: 'Analyse des menaces, reconnaissance des lieux et planification des itinéraires pour neutraliser le risque à la source.',
    },
    {
      icon: 'UserX',
      title: 'Discrétion',
      description: 'Une présence qui protège sans jamais s’imposer. Nos agents s’adaptent à votre environnement et à vos codes.',
    },
    {
      icon: 'GitBranch',
      title: 'Adaptabilité',
      description: 'Le dispositif évolue en temps réel selon vos déplacements, votre agenda et le niveau de menace évalué.',
    },
  ];

  return (
    <div className="bg-[#111319] text-gray-300">
      <ServiceJsonLd service={service} breadcrumbs={[{label: "Accueil", href: "/"}, {label: "Services", href: "/services"}, {label: service.title}]} />
      
      {/* Hero */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center text-white">
        <div className="absolute inset-0">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              quality={90}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 p-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Protection Rapprochée</p>
          <h1 className="mt-4 font-headline text-5xl md:text-7xl font-bold [text-shadow:0_3px_15px_rgba(0,0,0,0.6)]">
            La Sécurité Invisible.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
            Protéger votre intégrité et votre tranquillité d’esprit, sans jamais altérer votre quotidien.
          </p>
        </div>
        <div className="absolute bottom-10 z-10 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/50" />
        </div>
      </section>

      {/* Intro */}
      <AnimateOnScroll>
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg prose-invert text-center mx-auto">
              <h2 className="text-primary !font-bold">Protéger, sans contraindre.</h2>
              <p className="text-gray-400">
                Notre philosophie de la protection rapprochée repose sur une conviction : la meilleure sécurité est celle qui ne se voit pas. Elle s’anticipe, s’organise en amont et s’adapte en permanence. Nous ne vendons pas une présence, nous concevons un écosystème de sérénité autour de vous.
              </p>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
      
      {/* Principles */}
      <AnimateOnScroll>
        <section className="py-20 md:py-24 bg-black/20">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl font-bold text-white">Nos Principes Fondamentaux</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-10">
                    {principles.map(p => {
                      const Icon = getLucideIcon(p.icon);
                      return (
                        <div key={p.title} className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border border-primary/20">
                                    <Icon className="h-7 w-7 text-primary" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{p.title}</h3>
                            <p className="text-gray-400">{p.description}</p>
                        </div>
                      )
                    })}
                </div>
            </div>
        </section>
      </AnimateOnScroll>

      {/* Method */}
      <AnimateOnScroll>
        <ProcessSteps 
            title={method.title}
            description={method.description}
            steps={method.steps}
            className="py-20 md:py-32"
        />
      </AnimateOnScroll>

      {/* Sectors */}
      <AnimateOnScroll>
        <SectorsGrid
            title="Pour qui ?"
            description="Nous intervenons pour des dirigeants, personnalités publiques, familles et délégations ayant des besoins de sécurité spécifiques, en France et à l'étranger."
            sectors={sectors}
            className="bg-black/20 py-20 md:py-24"
        />
      </AnimateOnScroll>
      
      {/* FAQ */}
      <AnimateOnScroll>
        <FAQAccordion
            title="Questions Confidentielles"
            description="Les réponses aux questions fréquentes sur la protection rapprochée."
            items={normalizeFaq(service)}
            className="py-20 md:py-32"
        />
      </AnimateOnScroll>

      {/* CTA */}
      <AnimateOnScroll>
        <section className="py-20 md:py-32">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-headline text-4xl font-bold text-white">Demander une consultation confidentielle</h2>
            <p className="mt-5 text-lg text-gray-400">
              Chaque situation est unique. Contactez notre responsable de pôle pour un échange discret et une analyse préliminaire de vos besoins.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                <a href={`mailto:${siteConfig.contact.email}`}>Envoyer un email</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-gray-700 hover:bg-gray-800 hover:border-gray-600">
                <a href={phoneHref}>Appel direct</a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-gray-500">Réponse sous 24h par un interlocuteur unique.</p>
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
}


export default function ServicePage({ params }: ServicePageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  if (service.slug === 'protection-rapprochee') {
    return <ProtectionRapprocheePage service={service} />;
  }

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

      <AnimateOnScroll>
        <section id="overview" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="!text-3xl !font-bold !text-primary">{blocks.whenTitle}</h2>
                <p className="text-muted-foreground">{blocks.when}</p>
              </div>
              <div>
                <Card className="bg-card rounded-2xl">
                  <CardHeader>
                    <CardTitle>{blocks.scopeTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{blocks.scope}</p>
                    <Separator className="my-4"/>
                    <div className="text-sm text-muted-foreground">
                        <p className="font-semibold text-foreground">Engagement de qualité</p>
                        <p>Agents qualifiés, consignes précises, supervision et reporting : un dispositif lisible et stable, mission après mission.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="mt-16 text-center">
              <Button asChild size="lg" className="rounded-full px-10">
                <Link href="/devis">Obtenir une proposition sur-mesure</Link>
              </Button>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {service.whyUs?.length ? (
        <AnimateOnScroll>
          <section id="why-us" className="border-y bg-card py-16 md:py-24">
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
      
      {longSections.length > 0 && (
        <AnimateOnScroll>
          <section id="details" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid lg:grid-cols-[2fr_1fr] gap-12 items-start">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {longSections.map(sec => (
                      <div key={sec.id}>
                          <h2 className="!text-3xl !font-bold !text-primary">{sec.title}</h2>
                          {sec.intro && <p className="lead !my-4 text-muted-foreground">{sec.intro}</p>}
                          {sec.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
                          {sec.bullets && <ul className="mt-6 space-y-3">{sec.bullets.map((b,i) => <li key={i}>{b}</li>)}</ul>}
                      </div>
                  ))}
                </div>
                <aside className="lg:sticky top-28 h-fit">
                    <Card className="rounded-2xl bg-card">
                        <CardHeader>
                            <CardTitle>Points Clés</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {longSections[0]?.note && (
                                <div className="text-sm text-muted-foreground italic mb-6 border-l-2 border-primary pl-4">
                                    {longSections[0].note}
                                </div>
                            )}
                            {longSections[0]?.internalLinks && (
                                <>
                                    <h4 className="font-semibold mb-3 text-foreground">Services Connexes</h4>
                                    <div className="flex flex-col gap-1">
                                        {longSections[0].internalLinks.map(link => (
                                            <Button asChild variant="ghost" className="justify-start -ml-2" key={link.href}>
                                                <Link href={link.href}>{link.label}</Link>
                                            </Button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </aside>
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      )}

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
            className="bg-background"
          />
        </AnimateOnScroll>
      ) : null}

      {service.sectors?.length ? (
        <AnimateOnScroll>
          <SectorsGrid id="sectors" sectors={[...service.sectors]} className="bg-card" />
        </AnimateOnScroll>
      ) : null}

      {faqItems.length ? (
        <AnimateOnScroll>
          <FAQAccordion
            id="faq"
            title="Questions fréquentes"
            description={`Les réponses à vos questions sur ${service.title.toLowerCase()}.`}
            items={faqItems}
            className="bg-background"
          />
        </AnimateOnScroll>
      ) : null}

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
                    <Card className="h-full transition hover:shadow-lg rounded-2xl bg-background">
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
          className="bg-background"
        />
      </AnimateOnScroll>
    </div>
  );
}
