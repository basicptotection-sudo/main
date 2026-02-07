
import type React from "react";
import type { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";

import { getAllPosts } from "@/lib/blog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import { siteConfig } from "@/lib/config";
import { servicesData } from "@/lib/services-data";
import { locationsData } from "@/lib/locations-data";

import {
  TrustElements,
  ServicesGrid,
  ProcessSteps,
  SectorsGrid,
  CoverageSection,
  Testimonials,
  FAQAccordion,
  CTASection,
  StickyMobileCallButton,
  AnimateOnScroll,
  HeroSection,
} from "@/components/shared";

import {
  trustElements,
  processSteps,
  sectors,
  testimonials,
  faqItems,
} from "@/lib/homepage-data";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowRight, BadgeCheck, Clock, MapPin, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title:
    "Basic Protection – Sécurité privée en Île-de-France (gardiennage, SSIAP, cynophile)",
  description:
    "Surveillance de sites, rondes, SSIAP, cynophile et sécurité événementielle en Île-de-France. Mise en place rapide, encadrement strict, devis structuré.",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Basic Protection – Sécurité privée en Île-de-France",
    description:
      "Gardiennage, SSIAP, cynophile, événementiel : dispositifs sur-mesure, encadrés et déployés rapidement en IDF.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function Stat({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white backdrop-blur-sm">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F8FD8]/15"
      >
        <Icon
          className="h-5 w-5 text-[#2F8FD8]"
        />
      </div>
      <div className="min-w-0">
        <div className="text-xl font-bold leading-none">{value}</div>
        <div className="mt-1 text-sm text-white/80">{label}</div>
      </div>
    </div>
  );
}


export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero");

  const terrainServices = servicesData
    .filter((s) =>
      [
        "agent-securite-qualifie",
        "agent-cynophile",
        "agent-incendie-ssiap",
        "agent-rondier",
      ].includes(s.slug)
    )
    .map((service) => ({
      icon: service.icon,
      title: service.title,
      description: service.shortDescription,
      href: `/services/${service.slug}`,
    }));

  const serviceEvenementiel = servicesData.find(s => s.slug === 'securite-evenementielle');
  const serviceAudit = servicesData.find(s => s.slug === 'audit-conseil-surete');
  const eventImage = PlaceHolderImages.find((p) => p.id === "service-evenementiel");
  const auditImage = PlaceHolderImages.find((p) => p.id === "service-audit-conseil");

  const coverageZones = locationsData.map((loc) => ({
    name: loc.name,
    href: `/zones/${loc.slug}`,
  }));

  const latestPosts = getAllPosts().slice(0, 3);

  const phoneHref = `tel:${(siteConfig.contact.phoneE164 ?? siteConfig.contact.phone)
    .replace(/\s/g, "")
    .trim()}`;

  const StatShieldCheck = getLucideIcon("ShieldCheck");
  const StatBadgeCheck = getLucideIcon("BadgeCheck");
  const StatClock = getLucideIcon("Clock");
  const StatMapPin = getLucideIcon("MapPin");

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    areaServed: "Île-de-France",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    sameAs: (siteConfig as any)?.socials?.filter(Boolean) ?? [],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (faqItems ?? []).map((f: any) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <HeroSection
        title="Votre sécurité est notre mission."
        description="Nous concevons des dispositifs de sécurité privée sur-mesure pour protéger vos actifs, vos équipes et votre réputation. Rigueur, discrétion et pilotage pour une tranquillité d'esprit totale."
        cta1={{
          label: "Obtenir une proposition",
          href: "/devis",
          className: "bg-[#2F8FD8] hover:bg-[#2F8FD8]/90",
        }}
        cta2={{
          label: "Nos services",
          href: "#services",
          variant: "outline",
        }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? "Sécurité privée en Île-de-France"}
        imageHint={heroImage?.imageHint}
        breadcrumbs={
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm text-white shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-[#2F8FD8]" />
            <span className="font-medium">
              Sécurité privée • Encadrement • Discrétion
            </span>
          </div>
        }
        stats={
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              Icon={StatShieldCheck}
              value="24/7"
              label="Disponibilité & astreinte"
            />
            <Stat
              Icon={StatBadgeCheck}
              value="Encadré"
              label="Supervision & reporting"
            />
            <Stat
              Icon={StatClock}
              value="< 24h"
              label="Déploiement possible"
            />
            <Stat
              Icon={StatMapPin}
              value="IDF"
              label="Couverture régionale"
            />
          </div>
        }
      />

      {/* TRUST / ABOUT */}
      <AnimateOnScroll>
        <section id="about" className="bg-card py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHeader
              eyebrow="BASIC PROTECTION"
              title="L’exigence, sans compromis."
              description="Plus qu’un prestataire : un partenaire de confiance, avec une exécution propre, des équipes encadrées et une coordination réactive."
            />

            <div className="mt-12">
              <TrustElements elements={trustElements} />
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                className={cn(
                  "rounded-full px-6",
                  "bg-[#1F2A44] text-white hover:bg-[#1F2A44]/90"
                )}
              >
                <Link href="/devis">Obtenir une proposition</Link>
              </Button>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* SERVICES */}
      <div id="services">
        <AnimateOnScroll>
          <ServicesGrid
            title="Protection opérationnelle"
            description="Sécuriser un site au quotidien : présence, contrôle, rondes, prévention. Simple, robuste, efficace."
            services={terrainServices}
            className="bg-background"
          />
        </AnimateOnScroll>
        
        <AnimateOnScroll>
          <section id="sûrete-haut-niveau" className="bg-card py-16 md:py-24">
            <div className="container mx-auto max-w-5xl px-4">
              <SectionHeader
                eyebrow="Sûreté haut niveau"
                title="Une expertise pointue pour les contextes sensibles"
                description="De l'analyse stratégique du risque à la sécurisation d'événements de prestige, nous apportons une réponse structurée et discrète."
              />

              <div className="mt-16 space-y-16">
                {/* Feature 1: Événementiel */}
                {serviceEvenementiel && eventImage && (
                  <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
                    <div className="md:w-2/5">
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                        <Image
                          src={eventImage.imageUrl}
                          alt={eventImage.description}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                          data-ai-hint={eventImage.imageHint}
                        />
                      </div>
                    </div>
                    <div className="md:w-3/5">
                      <Badge variant="secondary">Événementiel</Badge>
                      <h3 className="mt-4 text-2xl lg:text-3xl font-bold font-headline text-primary">
                        {serviceEvenementiel.title}
                      </h3>
                      <p className="mt-4 text-muted-foreground">
                        Dispositifs sur-mesure pour galas, lancements, et événements corporate. Nous assurons la gestion des accès et la sûreté des zones sensibles avec une posture premium qui valorise votre image.
                      </p>
                      <ul className="mt-6 space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Contrôle d'accès & gestion des flux</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Sûreté des zones VIP & techniques</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Coordination terrain & chef de dispositif</span>
                        </li>
                      </ul>
                      <Button asChild variant="outline" className="mt-8">
                        <Link href={`/services/${serviceEvenementiel.slug}`}>Découvrir le service</Link>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Feature 2: Audit */}
                {serviceAudit && auditImage && (
                  <div className="flex flex-col md:flex-row-reverse gap-8 lg:gap-12 items-center">
                    <div className="md:w-2/5">
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                        <Image
                          src={auditImage.imageUrl}
                          alt={auditImage.description}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                          data-ai-hint={auditImage.imageHint}
                        />
                      </div>
                    </div>
                    <div className="md:w-3/5">
                      <Badge variant="secondary">Stratégie</Badge>
                      <h3 className="mt-4 text-2xl lg:text-3xl font-bold font-headline text-primary">
                        {serviceAudit.title}
                      </h3>
                      <p className="mt-4 text-muted-foreground">
                        Transformez votre sécurité en un investissement stratégique. Nous analysons vos infrastructures et procédures pour identifier les failles et proposer un plan d'action pragmatique.
                      </p>
                      <ul className="mt-6 space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Analyse des risques et vulnérabilités (360°)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Recommandations priorisées et budgétisées</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Aide à la rédaction de cahier des charges</span>
                        </li>
                      </ul>
                      <Button asChild variant="outline" className="mt-8">
                        <Link href={`/services/${serviceAudit.slug}`}>Découvrir le service</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      </div>

      {/* PROCESS */}
      <AnimateOnScroll>
        <ProcessSteps
          title="Une méthode claire, un pilotage précis"
          description="Du cadrage à l’exécution : un dispositif pensé, déployé, puis supervisé pour maintenir un niveau constant."
          steps={processSteps}
          className="bg-background"
        />
      </AnimateOnScroll>

      {/* SECTORS */}
      <AnimateOnScroll>
        <SectorsGrid sectors={sectors} className="bg-card" />
      </AnimateOnScroll>

      {/* COVERAGE */}
      <AnimateOnScroll>
        <CoverageSection
          title="Île-de-France : présence et mobilité"
          description="Basés à Plaisir (78), nous intervenons sur toute l’Île-de-France grâce à une organisation structurée et des équipes mobiles."
          zones={coverageZones}
          className="bg-background"
        >
          <div className="mt-10 text-center">
            <Button
              asChild
              className={cn(
                "rounded-full px-6",
                "bg-[#1F2A44] text-white hover:bg-[#1F2A44]/90"
              )}
            >
              <Link href="/zones">Voir toutes les zones d’intervention</Link>
            </Button>
          </div>
        </CoverageSection>
      </AnimateOnScroll>

      {/* TESTIMONIALS */}
      <AnimateOnScroll>
        <Testimonials testimonials={testimonials} className="bg-card" />
      </AnimateOnScroll>

      {/* LATEST ARTICLES */}
      <AnimateOnScroll>
        <section id="blog" className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHeader
              eyebrow="Analyses & Conseils"
              title="Nos derniers articles"
              description="Retrouvez nos dernières analyses, conseils et retours d'expérience sur la sécurité privée."
            />

            <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => {
                const postImage = PlaceHolderImages.find(
                  (p) => p.id === post.frontmatter.image
                );
                const dateLabel = format(
                  new Date(post.frontmatter.date),
                  "dd MMMM yyyy",
                  { locale: fr }
                );

                return (
                  <Link
                    href={`/blog/${post.slug}`}
                    key={post.slug}
                    className="group block"
                  >
                    <Card className="h-full overflow-hidden rounded-2xl border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg">
                      <div className="relative aspect-[16/9] overflow-hidden bg-muted/20">
                        {postImage ? (
                          <Image
                            src={postImage.imageUrl}
                            alt={post.frontmatter.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-muted/30" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
                      </div>

                      <CardHeader className="p-6">
                        <p className="text-sm text-muted-foreground">
                          {dateLabel}
                        </p>
                        <CardTitle className="mt-2 text-lg leading-snug">
                          {post.frontmatter.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <div className="mt-4 flex items-center text-sm font-medium text-primary">
                          Lire l'article
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <Link href="/blog">Voir tous les articles</Link>
              </Button>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* FAQ */}
      <AnimateOnScroll>
        <FAQAccordion
          title="Questions fréquentes"
          description="Délais, modalités, périmètre, encadrement : les réponses essentielles avant de démarrer."
          items={faqItems}
          className="bg-card"
        />
      </AnimateOnScroll>

      {/* CTA */}
      <AnimateOnScroll>
        <CTASection
          title="Prêt à définir votre stratégie de sûreté ?"
          description="Contactez nos experts pour une analyse confidentielle de vos besoins. Recevez une proposition sur-mesure et un devis structuré."
          cta={{ label: "Obtenir votre devis", href: "/devis" }}
          className="bg-background"
        />
      </AnimateOnScroll>

      <StickyMobileCallButton phoneNumber={siteConfig.contact.phone} />
    </div>
  );
}
