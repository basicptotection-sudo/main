import { servicesData } from "@/lib/services-data";
import { ServicesGrid, HeroSection, AnimateOnScroll } from "@/components/shared";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const metadata: Metadata = {
  title: "Nos Services de Sécurité Privée",
  description: "Découvrez nos solutions de sécurité haut de gamme : protection rapprochée, sécurité événementielle, audits de sûreté, et plus. L'excellence pour votre tranquillité.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesHubPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'services-hub');

  const servicesForGrid = servicesData.map(service => ({
    icon: <Briefcase className="w-12 h-12 text-primary" />,
    title: service.title,
    description: service.shortDescription,
    href: `/services/${service.slug}`
  }));

  return (
    <>
      <HeroSection
        title="Nos Solutions de Haute Sécurité"
        description="De la protection des personnes à la sécurisation des sites les plus sensibles, nous concevons des dispositifs sur-mesure alliant expertise humaine et technologie de pointe. Découvrez comment nous pouvons garantir votre sérénité."
        cta1={{ label: "Audit gratuit", href: "#contact" }}
        cta2={{ label: `Appelez-nous`, href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description}
        imageHint={heroImage?.imageHint}
      />
      <AnimateOnScroll>
        <ServicesGrid
          id="services-list"
          title="Explorez nos Domaines d'Expertise"
          description="Chaque service est une promesse de rigueur, de discrétion et d'efficacité, adaptée aux enjeux uniques de votre secteur."
          services={servicesForGrid}
        />
      </AnimateOnScroll>
    </>
  );
}
