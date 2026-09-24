// src/app/secteurs/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import React from "react";

import { sectorsData } from "@/lib/secteurs-data";
import { siteConfig } from "@/lib/config";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { servicesData, type Service } from "@/lib/services-data";
import { getLucideIcon } from "@/lib/icons";

import {
  HeroSection,
  Breadcrumbs,
  AnimateOnScroll,
  ServicesGrid,
  TrustElements,
  FAQAccordion,
  CTASection,
  ProcessSteps,
} from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* ================= types ================= */

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

/* ================= helpers ================= */

function normSlug(input: string) {
  return decodeURIComponent(String(input ?? ""))
    .replace(/\u200B/g, "") // zero-width space
    .replace(/\u00A0/g, " ") // nbsp
    .trim()
    .toLowerCase();
}

/* ================= routing ================= */

export const dynamicParams = false;

export function generateStaticParams() {
  return sectorsData.map((e) => ({ slug: normSlug(e.slug) }));
}

/* ================= metadata ================= */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;

  const slug = normSlug(rawSlug);
  const sector = sectorsData.find((e) => normSlug(e.slug) === slug);
  if (!sector) return {};

  const canonicalBase = siteConfig.url?.replace(/\/$/, "") ?? "";
  const canonical = `${canonicalBase}/secteurs/${normSlug(sector.slug)}`;

  const title = sector.metaTitle ?? sector.heroTitle;
  const description = sector.metaDescription ?? sector.heroDescription;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
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

/* ================= page ================= */

export default async function SecteurPage({ params }: PageProps) {
  const { slug: rawSlug } = await params;

  const slug = normSlug(rawSlug);
  const sector = sectorsData.find((e) => normSlug(e.slug) === slug);
  if (!sector) return notFound();

  const heroImage =
    PlaceHolderImages.find((p) => p.id === (sector.heroImageId ?? "hero")) ??
    PlaceHolderImages.find((p) => p.id === "hero") ??
    PlaceHolderImages[0];

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Secteurs", href: "/secteurs" },
    { label: sector.heroTitle, href: `/secteurs/${normSlug(sector.slug)}` },
  ];

  const services = (sector.relatedServices ?? [])
    .map((s) => servicesData.find((x) => x.slug === s))
    .filter((s): s is Service => Boolean(s))
    .map((s) => ({
      icon: s.icon,
      title: s.title,
      description: s.shortDescription,
      href: `/services/${s.slug}`,
    }));

  return (
    <div className="bg-background text-foreground">
      <HeroSection
        title={sector.heroTitle}
        description={sector.heroDescription}
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{
          label: "Voir tous les secteurs",
          href: "/secteurs",
          variant: "secondary",
        }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? sector.heroTitle}
        imageHint={heroImage?.imageHint}
        breadcrumbs={
          <Breadcrumbs items={breadcrumbItems} className="py-0 mb-4" />
        }
      />

      <AnimateOnScroll>
        <section className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="!text-3xl !font-bold !text-primary">
              {sector.intro?.title ?? "Présentation"}
            </h2>
            <p className="text-muted-foreground">
              {sector.intro?.paragraph ?? sector.heroDescription}
            </p>
          </div>
        </section>
      </AnimateOnScroll>

      {!!sector.issues?.length && (
        <AnimateOnScroll>
          <section className="py-16 md:py-24 bg-muted/20">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                  {sector.issuesTitle ?? "Les enjeux spécifiques"}
                </h2>
              </div>
              <TrustElements elements={sector.issues.map((i) => ({ ...i }))} />
            </div>
          </section>
        </AnimateOnScroll>
      )}

      {!!sector.missions?.length && (
        <AnimateOnScroll>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                  {sector.missionsTitle ?? "Typologie des missions"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                {sector.missions.map((m) => {
                  const Icon = getLucideIcon(m.icon);
                  return (
                    <div key={m.title} className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-lg p-3">
                        {Icon ? (
                          <Icon className="w-6 h-6 text-primary" />
                        ) : (
                          <span className="w-6 h-6 inline-block" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-primary">
                          {m.title}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      )}

      {!!services.length && (
        <AnimateOnScroll>
          <ServicesGrid
            title="Des services de sécurité adaptés"
            description="Chaque secteur est différent. C’est pourquoi nous combinons plusieurs expertises."
            services={services}
            className="bg-muted/20"
          />
        </AnimateOnScroll>
      )}

      {!!sector.useCases?.length && (
        <AnimateOnScroll>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                  Exemples de cas d’usage concrets
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sector.useCases.map((u) => (
                  <Card key={u.title} className="bg-background border">
                    <CardHeader>
                      <CardTitle className="text-lg">{u.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{u.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      )}

      {!!sector.method?.steps?.length && (
        <AnimateOnScroll>
          <ProcessSteps
            title={sector.method.title}
            description={sector.method.description}
            steps={sector.method.steps}
            className="bg-muted/20"
          />
        </AnimateOnScroll>
      )}

      {!!sector.whyUs?.length && (
        <AnimateOnScroll>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                  Pourquoi nous confier la sécurité de vos sites ?
                </h2>
              </div>
              <TrustElements elements={sector.whyUs.map((x) => ({ ...x }))} />
            </div>
          </section>
        </AnimateOnScroll>
      )}

      {!!sector.faq?.length && (
        <AnimateOnScroll>
          <FAQAccordion
            title={`Questions fréquentes — ${sector.heroTitle}`}
            description="Organisation, délais, qualité et conformité."
            items={sector.faq}
            className="bg-muted/20"
          />
        </AnimateOnScroll>
      )}

      <AnimateOnScroll>
        <CTASection
          title={`Besoin d’un dispositif pour “${sector.heroTitle}” ?`}
          description="Décrivez votre contexte : nous dimensionnons une solution claire et adaptée."
          cta={{ label: "Demander un devis", href: "/devis" }}
        />
      </AnimateOnScroll>
    </div>
  );
}
