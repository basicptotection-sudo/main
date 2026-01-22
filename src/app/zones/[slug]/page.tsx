
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locationsData, UseCase, CityLink, TrustElement } from '@/lib/locations-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { siteConfig } from '@/lib/config';
import { 
    HeroSection,
    ServicesGrid, 
    FAQAccordion, 
    CTASection, 
    Breadcrumbs,
    AnimateOnScroll,
    TrustElements,
} from '@/components/shared';
import LocationJsonLd from '@/components/seo/location-json-ld';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

type LocationPageProps = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
  return locationsData.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = locationsData.find((l) => l.slug === params.slug);

  if (!location) {
    return {};
  }

  return {
    title: location.title,
    description: location.description,
    keywords: location.keywords,
    alternates: {
      canonical: `/zones/${location.slug}`,
    },
  };
}

const IntroSection = ({ title, content }: { title: string, content: string }) => (
    <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center">
                    {title}
                </h2>
                <div className="mt-6 text-lg text-muted-foreground prose prose-lg max-w-none text-center mx-auto" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    </section>
);

const UseCasesSection = ({ cases }: { cases: UseCase[] }) => (
    <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center">
                Cas d'Usage Locaux
            </h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {cases.map(useCase => {
                    const Icon = (LucideIcons as any)[useCase.icon];
                    return (
                        <Card key={useCase.title} className="shadow-lg">
                            <CardHeader className="flex flex-row items-center gap-4">
                                {Icon && <Icon className="w-10 h-10 text-primary" />}
                                <CardTitle>{useCase.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{useCase.content}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    </section>
);

const MainCitiesSection = ({ cities }: { cities: CityLink[] }) => (
    <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center">
                Villes Principales
            </h2>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 max-w-4xl mx-auto">
                {cities.map((city) => {
                    const content = (
                        <div key={city.name} className="flex items-center gap-3 group">
                            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className={cn(
                                "font-medium",
                                city.href !== '#' && "group-hover:text-primary group-hover:underline"
                            )}>{city.name}</span>
                        </div>
                    );

                    if (city.href !== '#') {
                        return <Link href={city.href} key={city.name}>{content}</Link>;
                    }
                    return content;
                })}
            </div>
        </div>
    </section>
);


export default function LocationPage({ params }: LocationPageProps) {
  const location = locationsData.find((l) => l.slug === params.slug);

  if (!location) {
    notFound();
  }

  const heroImage = PlaceHolderImages.find(p => p.id === location.heroImageId);

  const breadcrumbItems = [
      { label: 'Accueil', href: '/' },
      { label: 'Zones', href: '/zones' },
      { label: location.name, href: `/zones/${location.slug}` },
  ];

  return (
    <>
      <LocationJsonLd location={location} breadcrumbs={breadcrumbItems} />
      <HeroSection
        title={location.title}
        description={location.description}
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: `Expert au téléphone`, href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} centered className="py-0 mb-4" />}
      />

      <AnimateOnScroll>
        <IntroSection title={location.intro.title} content={location.intro.content} />
      </AnimateOnScroll>
      
      <AnimateOnScroll>
        <ServicesGrid
          id="services-list"
          title={`Nos Prestations de Sécurité à ${location.name}`}
          description="Une gamme complète de solutions pour répondre à tous vos besoins de sûreté dans le département."
          services={location.services}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
          <UseCasesSection cases={location.useCases} />
      </AnimateOnScroll>
      
      <AnimateOnScroll>
        <MainCitiesSection cities={location.mainCities} />
      </AnimateOnScroll>

      <AnimateOnScroll>
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-12">
                    Pourquoi Basic Protection Privée dans {location.name.split('(')[0].trim()} ?
                </h2>
                <TrustElements elements={location.whyUs} />
            </div>
          </section>
      </AnimateOnScroll>
      
      <AnimateOnScroll>
        <FAQAccordion
          title={`Questions Fréquentes sur la sécurité dans ${location.name.split('(')[0].trim()}`}
          description={`Tout savoir sur nos interventions dans le ${location.name.split(' ')[1]}.`}
          items={location.faq}
        />
      </AnimateOnScroll>
      
      <AnimateOnScroll>
        <CTASection
          id="contact"
          title={`Obtenez votre Proposition de Sécurité pour ${location.name}`}
          description="Contactez nos experts pour une analyse confidentielle et recevez un devis détaillé adapté à votre situation locale."
          cta={{ label: "Devis pour " + location.name, href: `/devis?zone=${location.slug}` }}
        />
      </AnimateOnScroll>
    </>
  );
}
