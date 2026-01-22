import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { servicesData, Service } from '@/lib/services-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { siteConfig } from '@/lib/config';

import { 
    HeroSection, 
    ProcessSteps, 
    SectorsGrid, 
    FAQAccordion, 
    CTASection, 
    Breadcrumbs,
    BenefitsSection,
    AnimateOnScroll
} from '@/components/shared';
import ServiceJsonLd from '@/components/seo/service-json-ld';

type ServicePageProps = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const heroImage = PlaceHolderImages.find(p => p.id === service.heroImageId);

  const breadcrumbItems = [
      { label: 'Accueil', href: '/' },
      { label: 'Services', href: '/services' },
      { label: service.title, href: `/services/${service.slug}` },
  ];

  return (
    <>
      <ServiceJsonLd service={service} breadcrumbs={breadcrumbItems} />
      <HeroSection
        title={service.title}
        description={service.description}
        cta1={{ label: "Obtenir une proposition", href: "#contact" }}
        cta2={{ label: `Appeler un expert`, href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description}
        imageHint={heroImage?.imageHint}
      />
      
      <Breadcrumbs items={breadcrumbItems} />

      <AnimateOnScroll>
        <BenefitsSection 
          title="Vos Avantages Clés"
          description={`Découvrez les bénéfices concrets de notre service de ${service.title.toLowerCase()}.`}
          benefits={service.benefits}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ProcessSteps
          title={service.method.title}
          description={service.method.description}
          steps={service.method.steps}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <SectorsGrid sectors={service.sectors} />
      </AnimateOnScroll>
      
      <AnimateOnScroll>
        <FAQAccordion
          title="Questions Fréquentes"
          description={`Les réponses à vos interrogations sur notre service de ${service.title.toLowerCase()}.`}
          items={service.faq}
        />
      </AnimateOnScroll>
      
      <AnimateOnScroll>
        <CTASection
          id="contact"
          title="Prêt à Sécuriser Votre Avenir ?"
          description="Contactez nos experts pour une analyse confidentielle de vos besoins et recevez une proposition stratégique sur-mesure."
          cta={{ label: "Demander Votre Devis", href: `mailto:${siteConfig.contact.email}?subject=Demande de devis pour ${service.title}` }}
        />
      </AnimateOnScroll>
    </>
  );
}
