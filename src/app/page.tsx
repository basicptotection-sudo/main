import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { siteConfig } from '@/lib/config';
import { HeroSection, TrustBar, ServicesGrid, ProcessSteps, SectorsGrid, CoverageSection, Testimonials, FAQAccordion, CTASection, StickyMobileCallButton } from '@/components/shared';
import { Building, Factory, Gem, Hospital, School, ShieldCheck, ShoppingCart, Users, Warehouse } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about');

  const services = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-primary" />,
      title: 'Surveillance & Gardiennage',
      description: 'Protection 24/7 de vos sites par des agents qualifiés et dissuasifs.',
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: 'Sécurité Événementielle',
      description: 'Gestion des foules, contrôle d’accès et sécurisation de vos événements.',
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-primary" />,
      title: 'Intervention sur Alarme',
      description: 'Réponse rapide et efficace suite à un déclenchement d\'alarme.',
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-primary" />,
      title: 'Audit & Conseil en Sûreté',
      description: 'Analyse de vos risques et recommandations pour optimiser votre sécurité.',
    },
  ];

  const sectors = [
    { icon: <Building className="w-10 h-10" />, name: "Tertiaire & Bureaux" },
    { icon: <ShoppingCart className="w-10 h-10" />, name: "Distribution & Retail" },
    { icon: <Factory className="w-10 h-10" />, name: "Industrie & Production" },
    { icon: <Warehouse className="w-10 h-10" />, name: "Logistique & Entrepôts" },
    { icon: <Hospital className="w-10 h-10" />, name: "Santé & Hôpitaux" },
    { icon: <School className="w-10 h-10" />, name: "Sites sensibles" },
    { icon: <Gem className="w-10 h-10" />, name: "Luxe" },
  ];
  
  const testimonials = [
    {
      quote: "Service très professionnel et réactif. Les agents sont compétents et discrets. Je recommande vivement Basic Protection Privée pour la sécurité de nos entrepôts.",
      name: "Jean Dupont",
      title: "Responsable Logistique, TechCorp"
    },
    {
      quote: "La sécurité de notre événement a été parfaitement gérée. Une équipe à l'écoute et très bien organisée. Nous ferons de nouveau appel à eux sans hésiter.",
      name: "Marie Dubois",
      title: "Organisatrice d'événements, EventPlus"
    },
    {
        quote: "Nous avons fait appel à Basic Protection pour un audit de sécurité de nos bureaux. Leurs conseils ont été précieux et nous ont permis d'identifier des failles critiques.",
        name: "Paul Martin",
        title: "Directeur Général, Innovatech"
    }
  ];

  const faqItems = [
    {
      question: "Quels types de services de sécurité proposez-vous ?",
      answer: "Nous offrons une gamme complète de services incluant le gardiennage, la surveillance de sites, la sécurité événementielle, l'intervention sur alarme, et les audits de sûreté."
    },
    {
      question: "Vos agents sont-ils certifiés ?",
      answer: "Oui, tous nos agents de sécurité possèdent la carte professionnelle (CQP APS) et sont formés en continu aux dernières techniques de prévention et d'intervention."
    },
    {
        question: "Dans quelles régions intervenez-vous ?",
        answer: "Nous intervenons principalement à Paris et dans toute la région Île-de-France, mais nous pouvons étudier des demandes spécifiques sur d'autres secteurs géographiques."
    }
  ];

  const trustLogos = [
    { src: "https://picsum.photos/seed/logo1/120/50", alt: "Logo Partenaire 1" },
    { src: "https://picsum.photos/seed/logo2/120/50", alt: "Logo Partenaire 2" },
    { src: "https://picsum.photos/seed/logo3/120/50", alt: "Logo Partenaire 3" },
    { src: "https://picsum.photos/seed/logo4/120/50", alt: "Logo Partenaire 4" },
    { src: "https://picsum.photos/seed/logo5/120/50", alt: "Logo Partenaire 5" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        title="Votre Partenaire Confiance pour une Sécurité Inégalée"
        description="Basic Protection Privée offre des solutions de sécurité sur-mesure pour les entreprises et les particuliers exigeants."
        cta1={{ label: "Découvrir nos services", href: "#services" }}
        cta2={{ label: "Obtenir un Devis", href: "#contact", variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description}
        imageHint={heroImage?.imageHint}
      />
      <TrustBar logos={trustLogos} />
      <ServicesGrid
        id="services"
        title="Des Solutions de Sécurité Complètes"
        description="Nous adaptons nos services à vos besoins spécifiques pour une tranquillité d'esprit totale."
        services={services}
      />
      <ProcessSteps />
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-2xl">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                Qui sommes-nous ?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Fondée sur des valeurs de rigueur, de professionnalisme et d'intégrité, Basic Protection Privée est votre allié pour la protection de vos biens et de vos personnes.
              </p>
              <p className="mt-4 text-muted-foreground">
                Notre équipe est composée d'agents certifiés, formés aux techniques les plus récentes et équipés pour faire face à toutes les situations. Nous nous engageons à fournir un service d'excellence et une réactivité sans faille.
              </p>
              <Button asChild className="mt-6 font-bold" size="lg">
                <Link href="#contact">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <SectorsGrid sectors={sectors} />
      <CoverageSection
        title="Une Présence Stratégique en Île-de-France"
        description="Nous couvrons Paris et sa couronne pour une réactivité optimale."
        zones={["Paris (75)", "Seine-et-Marne (77)", "Yvelines (78)", "Essonne (91)", "Hauts-de-Seine (92)", "Seine-Saint-Denis (93)", "Val-de-Marne (94)", "Val-d'Oise (95)"]}
      />
      <Testimonials testimonials={testimonials} />
      <FAQAccordion
        title="Questions Fréquemment Posées"
        description="Trouvez les réponses à vos interrogations sur nos services de sécurité."
        items={faqItems}
      />
      <CTASection
        id="contact"
        title="Prêt à sécuriser votre activité ?"
        description="Contactez-nous dès aujourd'hui pour une analyse gratuite de vos besoins et un devis personnalisé."
        cta={{ label: "Demander un Devis", href: `mailto:${siteConfig.contact.email}?subject=Demande de devis` }}
      />
      <StickyMobileCallButton phoneNumber={siteConfig.contact.phone} />
    </div>
  );
}
