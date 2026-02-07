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
import { ShieldCheck, ArrowRight } from "lucide-react";
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
  variant = "default",
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  variant?: "default" | "onBlack";
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-card px-5 py-4 shadow-sm">
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl",
          variant === "onBlack" ? "bg-[#2F8FD8]/15" : "bg-[#1F2A44]/10"
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5",
            variant === "onBlack" ? "text-[#2F8FD8]" : "text-[#1F2A44]"
          )}
        />
      </div>
      <div className="min-w-0">
        <div className="text-xl font-bold leading-none">{value}</div>
        <div className="mt-1 text-sm text-muted-foreground">{label}</div>
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

  const premiumServices = servicesData
    .filter((s) =>
      [
        "protection-rapprochee",
        "securite-evenementielle",
        "audit-conseil-surete",
      ].includes(s.slug)
    )
    .map((service) => ({
      icon: service.icon,
      title: service.title,
      description: service.shortDescription,
      href: `/services/${service.slug}`,
    }));

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
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <HeroSection
        title={
          <>
            Sécurité privée,
            <span className="font-light text-[#2F8FD8]"> discrète</span> et{" "}
            <span className="font-light text-[#2F8FD8]">maîtrisée</span>.
          </>
        }
        description="Surveillance de sites, événementiel, SSIAP, cynophile et protection rapprochée : des dispositifs sur-mesure, exécutés avec rigueur."
        cta1={{
          label: "Demander un devis",
          href: "/devis",
          className: "bg-[#2F8FD8] hover:bg-[#2F8FD8]/90",
        }}
        cta2={{
          label: "Appeler maintenant",
          href: phoneHref,
          variant: "outline",
          className:
            "bg-white text-[#1F2A44] hover:bg-white/90 hover:text-[#1F2A44]",
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
      />

      <div className="relative -mt-16 z-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              variant="onBlack"
              Icon={StatShieldCheck}
              value="24/7"
              label="Disponibilité & astreinte"
            />
            <Stat
              variant="onBlack"
              Icon={StatBadgeCheck}
              value="Encadré"
              label="Supervision & reporting"
            />
            <Stat
              variant="onBlack"
              Icon={StatClock}
              value="< 24h"
              label="Déploiement possible"
            />
            <Stat
              variant="onBlack"
              Icon={StatMapPin}
              value="IDF"
              label="Couverture régionale"
            />
          </div>
        </div>
      </div>

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
          <ServicesGrid
            title="Sûreté haut niveau"
            description="Protection rapprochée, événementiel, audit & conseil : une expertise structurée, discrète et précise."
            services={premiumServices}
            className="bg-card"
          />
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
