import Link from "next/link";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import { siteConfig } from "@/lib/config";
import { servicesData } from "@/lib/services-data";

import {
  TrustElements,
  ServicesGrid,
  ProcessSteps,
  SectorsGrid,
  Testimonials,
  FAQAccordion,
  CTASection,
  StickyMobileCallButton,
  AnimateOnScroll,
  HeroSection,
} from "@/components/shared";

import {
  trustElements,
  processSteps,
  sectors,
  testimonials,
  faqItems,
} from "@/lib/homepage-data";

import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

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

  const phoneHref = `tel:${(siteConfig.contact.phoneE164 ??
    siteConfig.contact.phone)
    .replace(/\s/g, "")
    .trim()}`;

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <HeroSection
        title={
          <>
            Une sécurité privée,
            <br />
            <span className="font-light text-[#2F8FD8]">discrète et maîtrisée</span>.
          </>
        }
        description="Surveillance de sites, événementiel, SSIAP, cynophile et protection rapprochée : des dispositifs sur-mesure, exécutés avec rigueur et discrétion."
        cta1={{
          label: "Demander un devis",
          href: "/devis",
          className: "bg-[#2F8FD8] text-white hover:bg-[#2F8FD8]/90",
        }}
        cta2={{
          label: "Appeler maintenant",
          href: phoneHref,
          className: "bg-white text-[#1F2A44] hover:bg-white/90",
        }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? "Sécurité privée en Île-de-France"}
        breadcrumbs={
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm text-white shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-[#2F8FD8]" />
            <span className="font-medium">
              Sécurité privée • Encadrement • Discrétion
            </span>
          </div>
        }
      />

      <AnimateOnScroll>
        <section id="about" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <p className="font-semibold tracking-wide text-primary uppercase">
                Le partenaire de votre tranquillité
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-headline font-bold text-primary">
                L’exigence, sans compromis.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Plus qu’un prestataire : un partenaire de confiance, avec une exécution propre, des équipes encadrées et une coordination réactive.
              </p>
            </div>
            
            <div className="mt-12">
              <TrustElements elements={trustElements} />
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/devis">Obtenir une proposition</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/services">Découvrir nos services</Link>
              </Button>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* SERVICES */}
      <AnimateOnScroll>
        <ServicesGrid
          id="services"
          title="Protection opérationnelle de terrain"
          description="Agents qualifiés, cynophiles, SSIAP, rondiers : des dispositifs clairs et rigoureux pour sécuriser vos sites au quotidien."
          services={terrainServices}
          className="bg-muted/30"
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ServicesGrid
          title="Sûreté et dispositifs premium"
          description="Protection rapprochée, sécurité événementielle de prestige, audit et conseil : une expertise pointue pour les enjeux les plus sensibles."
          services={premiumServices}
          className="bg-white"
        />
      </AnimateOnScroll>

      {/* PROCESS */}
      <AnimateOnScroll>
        <ProcessSteps
          title="Une méthode claire, un pilotage précis"
          description="Du cadrage à l’exécution : un dispositif pensé, déployé, puis supervisé pour maintenir un niveau de qualité constant."
          steps={processSteps}
          className="bg-muted/30"
        />
      </AnimateOnScroll>

      {/* SECTORS */}
      <AnimateOnScroll>
        <SectorsGrid sectors={sectors} className="bg-white" />
      </AnimateOnScroll>

      {/* TESTIMONIALS */}
      <AnimateOnScroll>
        <Testimonials testimonials={testimonials} className="bg-muted/30" />
      </AnimateOnScroll>

      {/* FAQ */}
      <AnimateOnScroll>
        <FAQAccordion
          title="Questions fréquentes"
          description="Délais, modalités, périmètre, encadrement : les réponses essentielles avant de démarrer."
          items={faqItems}
          className="bg-white"
        />
      </AnimateOnScroll>
      
      {/* CTA */}
      <AnimateOnScroll>
        <CTASection
          title="Prêt à définir votre stratégie de sûreté ?"
          description="Contactez nos experts pour une analyse confidentielle de vos besoins. Recevez une proposition sur-mesure et un devis structuré."
          cta={{ label: "Obtenir votre devis", href: "/devis" }}
          className="bg-background border-t"
        />
      </AnimateOnScroll>

      <StickyMobileCallButton phoneNumber={siteConfig.contact.phone} />
    </div>
  );
}
