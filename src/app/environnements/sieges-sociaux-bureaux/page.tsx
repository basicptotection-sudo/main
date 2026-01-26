
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { notFound } from 'next/navigation';

import { environmentsData } from '@/lib/environments-data';
import { servicesData } from '@/lib/services-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  AnimateOnScroll,
  BenefitsSection,
  Breadcrumbs,
  CTASection,
  FAQAccordion,
  HeroSection,
  ProcessSteps,
  ServicesGrid,
  TrustElements,
} from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const slug = 'sieges-sociaux-bureaux';
const env = environmentsData.find((e) => e.slug === slug);

export const metadata: Metadata = {
  title: env?.metaTitle || 'Sécurité des Sièges Sociaux & Bureaux',
  description:
    env?.metaDescription || 'Dispositifs de sécurité privée adaptés aux environnements tertiaires exigeants.',
  alternates: {
    canonical: `/environnements/${slug}`,
  },
};

export default function SiegesSociauxPage() {
  if (!env) {
    notFound();
  }

  const relatedServices = env.relatedServices
    .map((slug) => servicesData.find((s) => s.slug === slug))
    .filter((s): s is (typeof servicesData)[0] => !!s)
    .map((service) => ({
      icon: service.icon,
      title: service.title,
      description: service.shortDescription,
      href: `/services/${service.slug}`,
    }));

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Environnements', href: '/environnements' },
    { label: env.heroTitle, href: `/environnements/${env.slug}` },
  ];
  
  const heroImage = PlaceHolderImages.find(p => p.id === env.heroImageId);

  return (
    <div className="bg-background">
      <HeroSection
        title={env.heroTitle}
        description={env.heroDescription}
        cta1={{ label: 'Demander un devis', href: '/devis' }}
        cta2={{ label: 'Nous contacter', href: '/contact', variant: 'secondary' }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description || env.heroTitle}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
      />

      <AnimateOnScroll>
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl">
                {env.intro.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {env.intro.paragraph}
              </p>
            </div>

            <div className="mt-12">
              <TrustElements elements={env.issues} />
            </div>
          </div>
        </section>
      </AnimateOnScroll>
      
      <AnimateOnScroll>
        <section className="bg-muted/20 py-16 md:py-24">
            <div className="container mx-auto max-w-5xl px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl">
                        Typologie des missions en environnement tertiaire
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Selon la configuration du site, nous mettons en place des missions ciblées et évolutives.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {env.missions.map((mission) => (
                        <Card key={mission.title} className="bg-background">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-lg">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        🔹
                                    </span>
                                    {mission.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{mission.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
      </AnimateOnScroll>

      {relatedServices.length > 0 && (
        <AnimateOnScroll>
          <ServicesGrid
            title="Des services de sécurité adaptés"
            description="Chaque environnement tertiaire est différent. C’est pourquoi nous combinons plusieurs expertises."
            services={relatedServices}
            className="bg-background"
          />
        </AnimateOnScroll>
      )}

      {env.useCases.length > 0 && (
        <AnimateOnScroll>
            <section className="py-16 md:py-24 bg-muted/20">
                <div className="container mx-auto max-w-4xl px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl">
                            Exemples de cas d’usage concrets
                        </h2>
                    </div>
                    <div className="space-y-8">
                        {env.useCases.map(useCase => (
                            <Card key={useCase.title} className="bg-background">
                                <CardHeader>
                                    <CardTitle>{useCase.title}</CardTitle>
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


      <AnimateOnScroll>
        <ProcessSteps
          title={env.method.title}
          description={env.method.description}
          steps={env.method.steps}
          className="bg-background"
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
          <BenefitsSection 
            title="Pourquoi nous confier la sécurité de vos bureaux ?"
            description=""
            benefits={env.whyUs.map(item => ({title: item.title, description: item.description}))}
            className="bg-muted/20"
          />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <FAQAccordion
          title="Questions fréquentes – Sécurité des bureaux"
          description=""
          items={env.faq}
          className="bg-background"
        />
      </AnimateOnScroll>
      
      <AnimateOnScroll>
        <CTASection
            title="Besoin d’un dispositif de sécurité pour vos bureaux ?"
            description="Chaque siège social a ses propres contraintes. Expliquez-nous votre contexte : nous dimensionnons une solution claire, professionnelle et adaptée à vos enjeux."
            cta={{label: "Demander un devis", href: `/devis?service=${slug}`}}
        />
      </AnimateOnScroll>
    </div>
  );
}
