
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  HeroSection,
  Breadcrumbs,
  AnimateOnScroll,
  CTASection,
  ProcessSteps,
  FAQAccordion,
} from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { servicesData, type Service } from '@/lib/services-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { siteConfig } from '@/lib/config';
import { getLucideIcon } from '@/lib/icons';
import { environmentsData } from "@/lib/environments-data";

type EnvPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return environmentsData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: EnvPageProps): Promise<Metadata> {
  const env = environmentsData.find((e) => e.slug === params.slug);
  if (!env) notFound();

  return {
    title: env.metaTitle,
    description: env.metaDescription,
    alternates: {
      canonical: `/environnements/${env.slug}`,
    },
  };
}


const SectionHeader = ({ title, description }: { title: string; description?: string }) => (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
    </div>
);


export default function EnvironnementPage({ params }: EnvPageProps) {
    const env = environmentsData.find((e) => e.slug === params.slug);
    if (!env) notFound();
    
    const heroImage = PlaceHolderImages.find((p) => p.id === env.heroImageId);

    const breadcrumbItems = [
        { label: 'Accueil', href: '/' },
        { label: env.heroTitle, href: `/environnements/${env.slug}` },
    ];

    const services = env.relatedServices
        .map(slug => servicesData.find(s => s.slug === slug))
        .filter((s): s is Service => !!s)
        .map(service => ({
            icon: service.icon,
            title: service.title,
            description: service.shortDescription,
            href: `/services/${service.slug}`,
    }));

    return (
        <div className="bg-background">
            <HeroSection
                title={env.heroTitle}
                description={env.heroDescription}
                cta1={{ label: 'Demander un devis', href: '/devis' }}
                cta2={{ label: 'Nos services', href: '/services', variant: 'secondary' }}
                imageUrl={heroImage?.imageUrl}
                imageAlt="Sécurité dans un immeuble de bureaux moderne"
                imageHint={heroImage?.imageHint}
                breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
            />

            <AnimateOnScroll>
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{env.intro.title}</h2>
                        <p className="font-sans text-lg md:text-xl text-muted-foreground mt-4">
                            {env.intro.paragraph}
                        </p>
                    </div>
                </section>
            </AnimateOnScroll>

            <AnimateOnScroll>
                <section className="py-16 md:py-24 bg-muted/20">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <SectionHeader title="Les enjeux spécifiques des sièges sociaux et bureaux" />
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {env.issues.map(item => {
                                const Icon = getLucideIcon(item.icon);
                                return (
                                <Card key={item.title} className="text-center bg-background">
                                    <CardHeader className="items-center">
                                        <div className="bg-primary/10 rounded-full p-3 mb-2"><Icon className="w-8 h-8 text-primary"/></div>
                                        <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm">{item.description}</p>
                                    </CardContent>
                                </Card>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </AnimateOnScroll>

            <AnimateOnScroll>
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <SectionHeader title="Typologie des missions en environnement tertiaire" description="Selon la configuration de votre site, nous mettons en place des missions ciblées, complémentaires et évolutives." />
                        <div className="mt-12 space-y-8">
                          {env.missions.map(item => {
                            const Icon = getLucideIcon(item.icon);
                            return (
                                <div key={item.title} className="flex items-start gap-6">
                                    <div className="flex-shrink-0 mt-1">
                                        <Icon className="w-10 h-10 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">{item.title}</h3>
                                        <p className="mt-1 text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            )
                          })}
                        </div>
                    </div>
                </section>
            </AnimateOnScroll>
            
            <AnimateOnScroll>
                <section className="py-16 md:py-24 bg-muted/20">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <SectionHeader title="Nos services de sécurité pour bureaux et sièges sociaux" description="Chaque environnement tertiaire est différent. C’est pourquoi nous combinons plusieurs expertises pour un dispositif sur mesure."/>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {services.map((service) => (
                                <Link key={service.href} href={service.href} className="block h-full">
                                    <Card className="h-full transition hover:shadow-lg bg-background">
                                        <CardHeader>
                                            <CardTitle className="text-base">{service.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">{service.description}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <p className="text-sm text-muted-foreground">👉 Le dispositif est dimensionné sur mesure, jamais standardisé.</p>
                        </div>
                    </div>
                </section>
            </AnimateOnScroll>
            
            <AnimateOnScroll>
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <SectionHeader title="Exemples de cas d’usage concrets" />
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {env.useCases.map(item => (
                                <Card key={item.title} className="bg-background">
                                    <CardHeader>
                                        <CardTitle>{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </AnimateOnScroll>

            <AnimateOnScroll>
                <ProcessSteps {...env.method} />
            </AnimateOnScroll>
            
            <AnimateOnScroll>
                 <section className="py-16 md:py-24 bg-muted/20">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <SectionHeader title="Pourquoi nous confier la sécurité de vos bureaux ?" />
                        <div className="mt-12 max-w-4xl mx-auto space-y-8">
                            {env.whyUs.map(item => {
                                const Icon = getLucideIcon(item.icon);
                                return (
                                <div key={item.title} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1 bg-background rounded-full p-3">
                                        <Icon className="w-6 h-6 text-primary"/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                                        <p className="text-muted-foreground mt-1">{item.description}</p>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </AnimateOnScroll>
            
            <AnimateOnScroll>
                <FAQAccordion
                    title="Questions fréquentes – Sécurité des bureaux"
                    description="Les réponses à vos questions les plus courantes sur la sécurisation des environnements tertiaires."
                    items={env.faq}
                />
            </AnimateOnScroll>

            <AnimateOnScroll>
                <CTASection
                    title="Besoin d’un dispositif de sécurité pour vos bureaux ?"
                    description="Chaque siège social a ses propres contraintes. Expliquez-nous votre contexte : nous dimensionnons une solution claire, professionnelle et adaptée à vos enjeux."
                    cta={{ label: "Demander un devis", href: "/devis" }}
                />
            </AnimateOnScroll>

        </div>
    );
}
