
import { locationsData } from "@/lib/locations-data";
import { HeroSection, CoverageSection, AnimateOnScroll } from "@/components/shared";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CTASection } from "@/components/shared/cta-section";

export const metadata: Metadata = {
  title: "Nos Zones d'Intervention en Sécurité Privée",
  description: "Découvrez les zones d'intervention de Basic Protection Privée en Île-de-France. Nous couvrons Paris (75), les Hauts-de-Seine (92) et toute la région parisienne.",
  alternates: {
    canonical: "/zones",
  },
};

export default function ZonesHubPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'zones-hub');

  const zonesForGrid = locationsData.map(location => ({
    name: location.name,
    href: `/zones/${location.slug}`
  }));

  return (
    <>
      <HeroSection
        title="Une Présence Stratégique sur toute l'Île-de-France"
        description="Notre connaissance approfondie du terrain et notre maillage opérationnel nous permettent d'intervenir avec efficacité et réactivité sur l'ensemble de la région parisienne pour garantir votre sécurité."
        cta1={{ label: "Voir nos zones", href: "#zones-list" }}
        cta2={{ label: `Appelez-nous`, href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description}
        imageHint={heroImage?.imageHint}
      />
      <AnimateOnScroll>
        <CoverageSection
          title="Explorez nos Secteurs d'Intervention"
          description="Chaque département a ses spécificités. Nous adaptons nos dispositifs de sécurité aux enjeux locaux pour une protection maximale."
          zones={zonesForGrid}
        />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <CTASection
          id="contact"
          title="Votre Sécurité, Notre Priorité, Où que vous soyez."
          description="Discutons de vos besoins en toute confidentialité. Contactez nos experts pour une étude personnalisée et une proposition sur-mesure."
          cta={{ label: "Demander un Devis Confidentiel", href: `mailto:${siteConfig.contact.email}?subject=Demande de devis confidentiel` }}
        />
      </AnimateOnScroll>
    </>
  );
}
