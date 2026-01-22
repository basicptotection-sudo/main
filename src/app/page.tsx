
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { siteConfig } from "@/lib/config";
import {
  HeroSection,
  TrustElements,
  ServicesGrid,
  ProcessSteps,
  SectorsGrid,
  CoverageSection,
  Testimonials,
  FAQAccordion,
  CTASection,
  StickyMobileCallButton,
  AnimateOnScroll,
} from "@/components/shared";
import { servicesData } from "@/lib/services-data";
import { locationsData } from "@/lib/locations-data";
import { 
  trustElements,
  processSteps,
  sectors,
  testimonials,
  faqItems
} from "@/lib/homepage-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero");

  const terrainServices = servicesData
    .filter((s) =>
      [
        "agent-securite-qualifie",
        "agent-cynophile",
        "agent-incendie-ssiap",
        "agent-rondier",
      ].includes(s.slug)
    )
    .map((service) => ({
      icon: service.icon,
      title: service.title,
      description: service.shortDescription,
      href: `/services/${service.slug}`,
    }));

  const premiumServices = servicesData
    .filter((s) =>
      [
        "protection-rapprochee",
        "securite-evenementielle",
        "audit-conseil-surete",
      ].includes(s.slug)
    )
    .map((service) => ({
      icon: service.icon,
      title: service.title,
      description: service.shortDescription,
      href: `/services/${service.slug}`,
    }));
  
  const coverageZones = locationsData.map(loc => ({
    name: loc.name,
    href: `/zones/${loc.slug}`
  }));

  const phoneHref = `tel:${siteConfig.contact.phoneE164 ?? siteConfig.contact.phone.replace(/\s/g, "")}`;

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        title="Haute Sécurité Privée en Île-de-France"
        description="Dispositifs sur-mesure pour la protection de vos sites, événements et dirigeants. Bénéficiez d'une expertise reconnue, alliant discrétion, rigueur et réactivité."
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Appeler un expert", href: phoneHref, variant: "outline" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? "Sécurité privée de haut niveau en Île-de-France"}
        imageHint={heroImage?.imageHint}
      />

      <AnimateOnScroll>
        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                L'Exigence au Service de Votre Sécurité
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Plus qu'un prestataire, un partenaire de confiance qui s'engage sur quatre piliers fondamentaux pour garantir votre tranquillité d'esprit.
              </p>
            </div>
            <TrustElements elements={trustElements} />
          </div>
        </section>
      </AnimateOnScroll>

      <div id="services">
        <AnimateOnScroll>
          <ServicesGrid
            title="Sécurité Essentielle : Protéger vos sites au quotidien"
            description="Des solutions opérationnelles et fiables pour la surveillance, le contrôle et la prévention des risques sur vos lieux de travail et de vie."
            services={terrainServices}
          />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <ServicesGrid
            title="Sûreté Stratégique : Gérer les risques complexes"
            description="Une expertise de haut niveau pour les missions sensibles : protection de personnes, sécurisation d'événements de prestige et conseil en gestion de crise."
            services={premiumServices}
            className="bg-white"
          />
        </AnimateOnScroll>
      </div>

      <AnimateOnScroll>
        <ProcessSteps
          title="Une Méthodologie Éprouvée"
          description="Diagnostic, planification, déploiement, suivi : une méthode claire pour garantir une prestation de sécurité efficace et stable."
          steps={processSteps}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <SectorsGrid sectors={sectors} className="bg-white" />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section id="zones">
          <CoverageSection
            title="Une Présence Stratégique en Île-de-France"
            description="Basés à Plaisir dans les Yvelines (78), notre organisation flexible et nos équipes mobiles nous permettent d'intervenir sur l'ensemble de la région."
            zones={coverageZones}
            className="bg-background"
          >
             <div className="text-center mt-8">
                <Button asChild>
                    <Link href="/zones">Voir toutes nos zones d'intervention</Link>
                </Button>
            </div>
          </CoverageSection>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <Testimonials testimonials={testimonials} className="bg-white" />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <FAQAccordion
          title="Vos Questions, Nos Réponses"
          description="Les informations essentielles pour comprendre nos services et démarrer une collaboration en toute confiance."
          items={faqItems}
          className="bg-background"
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CTASection
          title="Prêt à définir votre stratégie de sûreté ?"
          description="Contactez nos experts pour une analyse confidentielle de vos besoins. Recevez une proposition sur-mesure et un devis structuré."
          cta={{ label: "Obtenir votre devis", href: "/devis" }}
          className="bg-white"
        />
      </AnimateOnScroll>

      <StickyMobileCallButton phoneNumber={siteConfig.contact.phone} />
    </div>
  );
}
