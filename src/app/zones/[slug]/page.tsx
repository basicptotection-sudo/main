
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { locationsData } from '@/lib/locations-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { siteConfig } from '@/lib/config';

import { 
    HeroSection,
    ServicesGrid, 
    FAQAccordion, 
    CTASection, 
    Breadcrumbs,
    AnimateOnScroll,
} from '@/components/shared';
import LocationJsonLd from '@/components/seo/location-json-ld';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
                <p className="mt-6 text-lg text-muted-foreground text-center">
                    {content}
                </p>
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
        title={`Sécurité Privée d'Excellence à ${location.name}`}
        description={location.description}
        cta1={{ label: "Demander un devis", href: "#contact" }}
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
          description="Une gamme complète de solutions pour répondre à tous vos besoins de sûreté dans le secteur."
          services={location.services}
        />
      </AnimateOnScroll>
      
      <AnimateOnScroll>
        <FAQAccordion
          title="Questions Fréquentes"
          description={`Tout savoir sur nos interventions à ${location.name}.`}
          items={location.faq}
        />
      </AnimateOnScroll>
      
      <AnimateOnScroll>
        <CTASection
          id="contact"
          title={`Obtenez votre Proposition de Sécurité pour ${location.name}`}
          description="Contactez nos experts pour une analyse confidentielle et recevez un devis détaillé adapté à votre situation locale."
          cta={{ label: "Devis pour " + location.name, href: `mailto:${siteConfig.contact.email}?subject=Demande de devis pour ${location.name}` }}
        />
      </AnimateOnScroll>
    </>
  );
}
