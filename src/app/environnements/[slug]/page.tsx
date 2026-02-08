// src/app/environnements/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import React from "react";

import { environmentsData } from "@/lib/environments-data";
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
import { ShieldCheck } from "lucide-react";

type PageProps = { params: { slug: string } };

function canonicalFor(slug: string) {
  const base = String(siteConfig.url ?? "").replace(/\/$/, "");
  return `${base}/environnements/${slug}`;
}

export async function generateStaticParams() {
  return environmentsData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const env = environmentsData.find((e) => e.slug === params.slug);
  if (!env) return {};

  const title = (env.metaTitle ?? env.heroTitle ?? "").trim();
  const description = (env.metaDescription ?? env.heroDescription ?? "").trim();
  const canonical = canonicalFor(env.slug);

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

export default function EnvironmentPage({ params }: PageProps) {
  const env = environmentsData.find((e) => e.slug === params.slug);
  if (!env) return notFound();

  const heroImage =
    PlaceHolderImages.find((p) => p.id === (env.heroImageId ?? "hero")) ??
    PlaceHolderImages.find((p) => p.id === "hero");

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Environnements", href: "/environnements" },
    { label: env.heroTitle, href: `/environnements/${env.slug}` },
  ];

  const services = (env.relatedServices ?? [])
    .map((slug) => servicesData.find((s) => s.slug === slug))
    .filter((s): s is Service => !!s)
    .map((s) => ({
      icon: s.icon,
      title: s.title,
      description: s.shortDescription,
      href: `/services/${s.slug}`,
    }));

  return (
    <>
      <HeroSection
        title={env.heroTitle}
        description={env.heroDescription}
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{
          label: "Voir tous les environnements",
          href: "/environnements",
          variant: "secondary",
        }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? env.heroTitle}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="mb-4 py-0" />}
      />

      <AnimateOnScroll>
        <section className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="!text-3xl !font-bold !text-primary">{env.intro.title}</h2>
            <p className="text-muted-foreground">{env.intro.paragraph}</p>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Issues Section */}
      {Array.isArray(env.issues) && env.issues.length > 0 && (
        <AnimateOnScroll>
          <section className="bg-muted/20 py-16 md:py-24">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">
                  {env.issuesTitle ?? "Les enjeux spécifiques"}
                </h2>
              </div>
              <TrustElements elements={env.issues.map((issue) => ({ ...issue }))} />
            </div>
          </section>
        </AnimateOnScroll>
      )}

      {/* Missions Section */}
      {Array.isArray(env.missions) && env.missions.length > 0 && (
        <AnimateOnScroll>
          <section className="py-16 md:py-24">
            <div className="container mx-auto max-w-4xl px-4">
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">
                  {env.missionsTitle ?? "Typologie des missions"}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
                {env.missions.map((mission) => {
                  const Icon = getLucideIcon(mission.icon) ?? ShieldCheck;

                  return (
                    <div key={mission.title} className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-primary">{mission.title}</h3>
                        <p className="mt-1 text-muted-foreground">{mission.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      )}

      {/* Related Services */}
      {services.length > 0 && (
        <AnimateOnScroll>
          <ServicesGrid
            title="Des services de sécurité adaptés"
            description="Chaque environnement est différent. C’est pourquoi nous combinons plusieurs expertises."
            services={services}
            className="bg-muted/20"
          />
        </AnimateOnScroll>
      )}

      {/* Use Cases */}
      {Array.isArray(env.useCases) && env.useCases.length > 0 && (
        <AnimateOnScroll>
          <section className="py-16 md:py-24">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">
                  Exemples de cas d’usage concrets
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {env.useCases.map((useCase) => (
                  <Card key={useCase.title} className="border bg-background">
                    <CardHeader>
                      <CardTitle className="text-lg">{useCase.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{useCase.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      )}

      {/* Method */}
      {env.method?.steps?.length > 0 && (
        <AnimateOnScroll>
          <ProcessSteps
            title={env.method.title}
            description={env.method.description}
            steps={env.method.steps}
            className="bg-muted/20"
          />
        </AnimateOnScroll>
      )}

      {/* Why Us */}
      {Array.isArray(env.whyUs) && env.whyUs.length > 0 && (
        <AnimateOnScroll>
          <section className="py-16 md:py-24">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">
                  Pourquoi nous confier la sécurité de vos sites ?
                </h2>
              </div>
              <TrustElements elements={env.whyUs.map((item) => ({ ...item }))} />
            </div>
          </section>
        </AnimateOnScroll>
      )}

      {!!env.faq?.length && (
        <AnimateOnScroll>
          <FAQAccordion
            title={`Questions fréquentes — ${env.heroTitle}`}
            description="Organisation, délais, qualité et conformité."
            items={env.faq}
            className="bg-muted/20"
          />
        </AnimateOnScroll>
      )}

      <AnimateOnScroll>
        <CTASection
          title={`Besoin d’un dispositif pour “${env.heroTitle}” ?`}
          description="Décrivez votre contexte : nous dimensionnons une solution claire et adaptée."
          cta={{ label: "Demander un devis", href: "/devis" }}
        />
      </AnimateOnScroll>
    </>
  );
}
