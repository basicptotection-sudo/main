import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { siteConfig } from "@/lib/config";
import { servicesData } from "@/lib/services-data";
import { locationsData } from "@/lib/locations-data";
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
import {
  trustElements,
  processSteps,
  sectors,
  testimonials,
  faqItems,
} from "@/lib/homepage-data";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/lib/icons";

// Composants temporaires inline
const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(
    "bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300",
    className
  )}>
    {children}
  </div>
);

const IconDivider = ({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) => (
  <div className="flex justify-center py-8">
    <div className="p-3 rounded-full bg-primary/10">
      <Icon className="w-6 h-6 text-primary" />
    </div>
  </div>
);

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
      icon: getLucideIcon(service.icon),
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
      icon: getLucideIcon(service.icon),
      title: service.title,
      description: service.shortDescription,
      href: `/services/${service.slug}`,
    }));

  const coverageZones = locationsData.map((loc) => ({
    name: loc.name,
    href: `/zones/${loc.slug}`,
  }));

  const phoneHref = `tel:${(siteConfig.contact.phoneE164 ?? siteConfig.contact.phone)
    .replace(/\s/g, "")
    .trim()}`;

  const stats = [
    { label: "Projets sécurisés", value: "500+", icon: Shield },
    { label: "Clients satisfaits", value: "98%", icon: CheckCircle },
    { label: "Intervention en <24h", value: "24h", icon: Clock },
    { label: "Agents certifiés", value: "150+", icon: Users },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* HERO SECTION - Redesign élégant */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-primary/5 via-white to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Sécurité privée certifiée CNAPS
              </span>
            </div>
            
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-primary">Sûreté</span>
              <br />
              <span className="text-gray-900">d'exception</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Protection discrète et efficace pour vos sites, événements et dirigeants.
              Une expertise reconnue alliant rigueur opérationnelle et innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button asChild size="lg" className="rounded-full px-8 h-12 text-base shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/devis">
                  <Shield className="mr-2 h-5 w-5" />
                  Demander un audit gratuit
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-base border-2">
                <Link href={phoneHref}>
                  <span className="mr-2">📞</span>
                  Expert disponible 24/7
                </Link>
              </Button>
            </div>

            {/* Trust badges minimalistes */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {["CNAPS", "ISO 9001", "SSIAP", "Cynophile"].map((badge) => (
                <span key={badge} className="text-sm font-medium text-gray-500">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION - Épuré et impactant */}
      <AnimateOnScroll>
        <section className="py-12 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold font-headline mb-1 text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* TRUST / ABOUT */}
      <AnimateOnScroll>
        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-gray-900">
                L'Excellence en Sécurité Privée
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Nous transcendons le rôle de simple prestataire pour devenir votre 
                partenaire stratégique en sûreté.
              </p>
            </div>
            <TrustElements elements={trustElements} />
          </div>
        </section>
      </AnimateOnScroll>

      {/* DIVIDER ICON */}
      <IconDivider icon={Shield} />

      {/* SERVICES SECTION - Design élégant */}
      <div id="services">
        <AnimateOnScroll>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Solutions de Sécurité Sur-Mesure
                </h2>
                <p className="text-lg text-gray-600">
                  De la surveillance quotidienne à la protection rapprochée, 
                  nos services s'adaptent à vos besoins spécifiques.
                </p>
              </div>

              {/* Services essentiels */}
              <div className="mb-20">
                <h3 className="font-headline text-2xl font-semibold text-center mb-10 text-gray-500">
                  Sécurité Opérationnelle
                </h3>
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {terrainServices.map((service, index) => (
                    <GlassCard
                      key={index}
                      className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-primary/10">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold mb-3 text-gray-900">
                            {service.title}
                          </h4>
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {service.description}
                          </p>
                          <Link
                            href={service.href}
                            className="inline-flex items-center text-primary font-medium hover:gap-3 transition-all group"
                          >
                            Découvrir ce service
                            <span className="ml-2 group-hover:ml-3 transition-all">→</span>
                          </Link>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>

              {/* Services premium */}
              <div>
                <h3 className="font-headline text-2xl font-semibold text-center mb-10 text-gray-500">
                  Sûreté Stratégique
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {premiumServices.map((service, index) => (
                    <div
                      key={index}
                      className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                    >
                      <div className="text-center mb-6">
                        <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                          <service.icon className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="text-xl font-bold mb-3 text-gray-900">
                          {service.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {service.description}
                        </p>
                      </div>
                      <div className="text-center">
                        <Button
                          asChild
                          variant="outline"
                          className="rounded-full border w-full group-hover:border-primary group-hover:text-primary transition-colors"
                        >
                          <Link href={service.href}>Expertise détaillée</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      </div>

      {/* PROCESS */}
      <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <ProcessSteps
              title="Notre Méthodologie"
              description="Un processus structuré en 4 étapes pour garantir une sécurité optimale et pérenne."
              steps={processSteps}
            />
          </div>
        </section>
      </AnimateOnScroll>

      {/* SECTORS */}
      <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <SectorsGrid sectors={sectors} />
          </div>
        </section>
      </AnimateOnScroll>

      {/* COVERAGE */}
      <AnimateOnScroll>
        <section id="zones" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <CoverageSection
              title="Présence en Île-de-France"
              description="Basés stratégiquement à Plaisir (78), nos équipes mobiles nous permettent d'intervenir rapidement sur toute la région."
              zones={coverageZones}
            >
              <div className="mt-10 text-center">
                <Button asChild className="rounded-full px-6">
                  <Link href="/zones">Voir toutes nos zones d'intervention</Link>
                </Button>
              </div>
            </CoverageSection>
          </div>
        </section>
      </AnimateOnScroll>

      {/* TESTIMONIALS */}
      <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <Testimonials testimonials={testimonials} />
          </div>
        </section>
      </AnimateOnScroll>

      {/* FAQ */}
      <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <FAQAccordion
              title="Vos Questions, Nos Réponses"
              description="Les informations essentielles pour comprendre nos services et démarrer une collaboration en toute confiance."
              items={faqItems}
            />
          </div>
        </section>
      </AnimateOnScroll>

      {/* FINAL CTA - Élégant et impactant */}
      <AnimateOnScroll>
        <section className="py-20 md:py-28 bg-gradient-to-r from-primary/5 via-white to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                Votre Sécurité,
                <br />
                <span className="text-primary">Notre Engagement</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Contactez nos experts pour une analyse confidentielle de vos besoins.
                Recevez une proposition personnalisée dans les 24h.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-10 h-14 text-lg shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <Link href="/devis">
                    <Shield className="mr-3 h-6 w-6" />
                    Audit de sécurité gratuit
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-10 h-14 text-lg border-2 hover:border-primary hover:text-primary transition-colors"
                >
                  <Link href="/contact">
                    Nous rencontrer
                  </Link>
                </Button>
              </div>

              <p className="mt-8 text-sm text-gray-500">
                Réponse garantie sous 2 heures ouvrées
              </p>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Sticky mobile call */}
      <StickyMobileCallButton phoneNumber={siteConfig.contact.phone} />
    </div>
  );
}
