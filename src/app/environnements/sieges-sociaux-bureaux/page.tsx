import type { Metadata } from 'next';
import {
  AnimateOnScroll,
  Breadcrumbs,
  CTASection,
  FAQAccordion,
  ProcessSteps,
  ServicesGrid,
  TrustElements,
} from '@/components/shared';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { servicesData } from '@/lib/services-data';
import { environmentsData } from '@/lib/environments-data';
import { getLucideIcon } from '@/lib/icons';

export const metadata: Metadata = {
  title: 'Sécurité des Sièges Sociaux & Bureaux | Sécurité Privée en IDF',
  description: 'Sécurité privée pour sièges sociaux et bureaux : contrôle d’accès, surveillance, rondes et dispositifs sur mesure en Île-de-France.',
  alternates: {
    canonical: '/environnements/sieges-sociaux-bureaux',
  },
};

export default function SiegesSociauxPage() {
    const pageData = environmentsData.find(e => e.slug === 'sieges-sociaux-bureaux');

    if (!pageData) {
        return null; 
    }

    const { intro, issues, missions, relatedServices, useCases, method, whyUs, faq, heroTitle, heroDescription } = pageData;

    const linkedServices = relatedServices
    .map(slug => {
        const service = servicesData.find(s => s.slug === slug);
        if (!service) return null;
        return {
            icon: service.icon,
            title: service.title,
            description: service.shortDescription,
            href: `/services/${service.slug}`,
        };
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Environnements', href: '/environnements' },
    { label: 'Sièges Sociaux & Bureaux', href: '/environnements/sieges-sociaux-bureaux' },
  ];

  return (
    <div className="bg-background">
      <AnimateOnScroll>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Breadcrumbs items={breadcrumbItems} />
            </div>
            <div className="text-center max-w-3xl mx-auto mt-4">
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
                {heroTitle}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {heroDescription}
              </p>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                {intro.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {intro.paragraph}
              </p>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
      
      <AnimateOnScroll>
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                    Les enjeux spécifiques des sièges sociaux et bureaux
                </h2>
                </div>
                <TrustElements elements={issues} />
            </div>
        </section>
      </AnimateOnScroll>

        <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-muted/20">
            <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                Typologie des missions en environnement tertiaire
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                Selon la configuration du site, nous mettons en place des missions ciblées et évolutives.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {missions.map((mission) => {
                    const Icon = getLucideIcon(mission.icon);
                    return (
                        <Card key={mission.title} className="shadow-lg">
                            <CardHeader className="flex flex-row items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <Icon className="w-8 h-8 text-primary" />
                            </div>
                            <CardTitle className="text-xl font-headline">{mission.title}</CardTitle>
                            </CardHeader>
                            <CardDescription className="p-6 pt-0">
                            {mission.description}
                            </CardDescription>
                        </Card>
                    )
                })}
            </div>
            </div>
        </section>
        </AnimateOnScroll>

        <AnimateOnScroll>
            <ServicesGrid
                title="Des services de sécurité adaptés à vos bureaux"
                description="Chaque environnement tertiaire est différent. C’est pourquoi nous combinons plusieurs expertises pour construire un dispositif sur mesure, jamais standardisé."
                services={linkedServices}
                className="py-16 md:py-24"
            />
        </AnimateOnScroll>
        
        <AnimateOnScroll>
            <section className="py-16 md:py-24 bg-muted/20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                            Exemples de cas d’usage concrets
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {useCases.map(useCase => (
                            <Card key={useCase.title} className="text-center">
                                <CardHeader>
                                    <CardTitle className="text-lg font-headline">{useCase.title}</CardTitle>
                                </CardHeader>
                                <CardDescription className="px-6 pb-6">
                                    {useCase.description}
                                </CardDescription>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </AnimateOnScroll>
        
        <AnimateOnScroll>
            <ProcessSteps
                id="method"
                title={method.title}
                description={method.description}
                steps={method.steps}
                className="py-16 md:py-24"
            />
        </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                Pourquoi nous confier la sécurité de vos bureaux ?
              </h2>
            </div>
            <TrustElements elements={whyUs} />
          </div>
        </section>
      </AnimateOnScroll>
      
      <AnimateOnScroll>
        <FAQAccordion
          id="faq"
          title="Questions fréquentes – Sécurité des bureaux"
          description=""
          items={faq}
          className="py-16 md:py-24"
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CTASection
          title="Besoin d’un dispositif de sécurité pour vos bureaux ?"
          description="Chaque siège social a ses propres contraintes. Expliquez-nous votre contexte : nous dimensionnons une solution claire, professionnelle et adaptée à vos enjeux."
          cta={{ label: 'Demander un devis', href: '/devis?service=sieges-sociaux-bureaux' }}
        />
      </AnimateOnScroll>
    </div>
  );
}