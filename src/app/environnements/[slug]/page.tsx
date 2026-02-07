
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

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return environmentsData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const env = environmentsData.find((e) => e.slug === params.slug);
  if (!env) return {};
  return {
    title: env.metaTitle ?? env.heroTitle,
    description: env.metaDescription ?? env.heroDescription,
    alternates: { canonical: `${siteConfig.url}/environnements/${env.slug}` },
  };
}

export default function EnvironmentPage({ params }: PageProps) {
  const env = environmentsData.find((e) => e.slug === params.slug);
  if (!env) notFound();

  const heroImage = PlaceHolderImages.find((p) => p.id === (env.heroImageId ?? "hero"));

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Environnements", href: "/environnements" },
    { label: env.heroTitle, href: `/environnements/${env.slug}` },
  ];
  
  const services = env.relatedServices
    .map(slug => servicesData.find(s => s.slug === slug))
    .filter((s): s is Service => !!s)
    .map(s => ({
      icon: s.icon,
      title: s.title,
      description: s.shortDescription,
      href: `/services/${s.slug}`
    }));

  return (
    <>
      <HeroSection
        title={env.heroTitle}
        description={env.heroDescription}
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Voir tous les environnements", href: "/environnements", variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? env.heroTitle}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="py-0 mb-4" />}
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
      {env.issues.length > 0 && (
        <AnimateOnScroll>
          <section className="py-16 md:py-24 bg-muted/20">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{env.issuesTitle ?? "Les enjeux spécifiques"}</h2>
              </div>
              <TrustElements elements={env.issues.map(issue => ({...issue}))} />
            </div>
          </section>
        </AnimateOnScroll>
      )}

      {/* Missions Section */}
      {env.missions.length > 0 && (
        <AnimateOnScroll>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{env.missionsTitle ?? "Typologie des missions"}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                {env.missions.map((mission) => {
                  const Icon = getLucideIcon(mission.icon);
                  return (
                    <div key={mission.title} className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-lg p-3">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-primary">{mission.title}</h3>
                        <p className="text-muted-foreground mt-1">{mission.description}</p>
                      </div>
                    </div>
                  )
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
      {env.useCases.length > 0 && (
        <AnimateOnScroll>
          <section className="py-16 md:py-24">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Exemples de cas d’usage concrets</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {env.useCases.map((useCase) => (
                  <Card key={useCase.title} className="bg-background border">
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
      {env.method.steps.length > 0 &&
        <AnimateOnScroll>
          <ProcessSteps 
            title={env.method.title}
            description={env.method.description}
            steps={env.method.steps}
            className="bg-muted/20"
          />
        </AnimateOnScroll>
      }

      {/* Why Us */}
      {env.whyUs.length > 0 &&
        <AnimateOnScroll>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Pourquoi nous confier la sécurité de vos sites ?</h2>
              </div>
              <TrustElements elements={env.whyUs.map(item => ({...item}))} />
            </div>
          </section>
        </AnimateOnScroll>
      }
      
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
