
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { siteConfig } from '@/lib/config';
import { HeroSection, TrustElements, ServicesGrid, ProcessSteps, SectorsGrid, CoverageSection, Testimonials, FAQAccordion, CTASection, StickyMobileCallButton, AnimateOnScroll } from '@/components/shared';
import { servicesData } from '@/lib/services-data';
import { locationsData } from '@/lib/locations-data';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  const trustElements = [
      {
          icon: "Award",
          title: "Conformité & Agrément",
          description: "Agents certifiés CNAPS, gage de notre professionnalisme et du respect de la réglementation.",
      },
      {
          icon: "Zap",
          title: "Réactivité 24/7",
          description: "Une ligne directe et des équipes prêtes à intervenir à tout moment, de jour comme de nuit.",
      },
      {
          icon: "Lock",
          title: "Confidentialité Absolue",
          description: "Discrétion totale assurée par des clauses de confidentialité et des protocoles stricts.",
      },
      {
          icon: "ShieldCheck",
          title: "Assurance & Responsabilité",
          description: "Une couverture complète par AXA pour une tranquillité d’esprit totale en cas d'incident.",
      },
  ];

  const services = servicesData.map(service => ({
    icon: "Briefcase",
    title: service.title,
    description: service.shortDescription,
    href: `/services/${service.slug}`
  }));

  const processSteps = [
    {
      icon: "MessageCircle",
      title: "1. Évaluation Stratégique",
      description: "Analyse confidentielle de vos enjeux et définition précise de vos objectifs de sécurité.",
    },
    {
      icon: "FileText",
      title: "2. Conception Sur-Mesure",
      description: "Élaboration d'un plan de sûreté détaillé et d'une proposition chiffrée transparente.",
    },
    {
      icon: "ShieldCheck",
      title: "3. Déploiement d'Élite",
      description: "Mise en place du dispositif par nos agents spécifiquement sélectionnés et formés.",
    },
    {
      icon: "ThumbsUp",
      title: "4. Pilotage & Amélioration",
      description: "Reporting en temps réel, audits réguliers et ajustement proactif pour une performance optimale.",
    },
  ];

  const sectors = [
    { icon: "Gem", name: "Luxe & Joaillerie" },
    { icon: "Building", name: "Sièges Sociaux & Tertiaire" },
    { icon: "Users", name: "Personnalités & Familles" },
    { icon: "ShoppingCart", name: "Événementiel de Prestige" },
    { icon: "Factory", name: "Industrie Stratégique" },
    { icon: "School", name: "Sites sensibles & Ambassades" },
    { icon: "Hospital", name: "Santé & Recherche" },
  ];
  
  const testimonials = [
    {
      quote: "Dans le secteur du luxe, l'erreur n'est pas une option. Basic Protection Privée a su intégrer cette exigence dans un dispositif de sécurité à la fois invisible et infaillible. Leur professionnalisme est remarquable.",
      name: "Directeur de la Sécurité",
      title: "Maison de Haute Joaillerie, Paris"
    },
    {
      quote: "La protection de nos dirigeants est un enjeu critique. Les équipes de BPP font preuve d'une discrétion et d'une efficacité qui dépassent nos attentes. De vrais partenaires de confiance.",
      name: "Responsable Sûreté",
      title: "Groupe du CAC40, La Défense"
    },
    {
        quote: "Nous avons mandaté BPP pour un audit de sûreté de notre siège. Leur rapport était d'une clarté et d'une pertinence rares, avec des recommandations pragmatiques que nous avons immédiatement mises en œuvre.",
        name: "Services Généraux",
        title: "Cabinet d'avocats international, Paris 8e"
    }
  ];

  const faqItems = [
    {
      question: "Comment sélectionnez-vous vos agents de sécurité ?",
      answer: "Notre processus de recrutement est extrêmement rigoureux. Chaque agent doit posséder une carte professionnelle CQP APS à jour, un casier judiciaire vierge, et passe une série d'entretiens pour évaluer ses compétences techniques et son savoir-être. Nous privilégions des profils expérimentés, spécialisés (luxe, événementiel, protection rapprochée) et formés en continu."
    },
    {
      question: "Quelle est la différence entre votre offre et une agence standard ?",
      answer: "Nous nous positionnons sur un segment premium. Cela se traduit par des agents d'élite mieux formés et mieux rémunérés, une approche entièrement sur-mesure, l'intégration de technologies de pointe, une culture de la discrétion et un management de proximité qui garantit un contrôle qualité permanent."
    },
    {
        question: "Garantissez-vous la confidentialité de vos missions ?",
        answer: "Absolument. La confidentialité est au cœur de notre métier. Tous nos agents signent une clause de non-divulgation stricte. Les informations relatives à nos clients et à nos missions sont compartimentées et protégées par des protocoles de sécurité rigoureux."
    },
    {
      question: "Quels sont vos délais pour mettre en place une protection ?",
      answer: "Pour les demandes urgentes, notre cellule de crise peut déployer un dispositif simple en quelques heures en Île-de-France. Pour des missions complexes, une phase d'audit et de planification de 24 à 72 heures est généralement nécessaire pour garantir une solution parfaitement adaptée et efficace."
    }
  ];

  const coverageZonesFromData = locationsData.map(loc => ({
    name: loc.name,
    href: `/zones/${loc.slug}`
  }));

  const otherZones = [
      { name: "Yvelines (78)", href: "/devis" },
      { name: "Val-de-Marne (94)", href: "/devis" },
      { name: "Seine-Saint-Denis (93)", href: "/devis" },
      { name: "Essonne (91)", href: "/devis" },
      { name: "Val-d'Oise (95)", href: "/devis" },
      { name: "Seine-et-Marne (77)", href: "/devis" },
  ].filter(zone => !coverageZonesFromData.some(cz => cz.name.includes(zone.name.split(' ')[0])));
  
  const coverageZones = [...coverageZonesFromData, ...otherZones];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        title="Haute Sécurité Privée : L'Excellence pour votre Tranquillité"
        description="Nous concevons des dispositifs de sécurité d'élite pour protéger les entreprises, les sites sensibles et les personnalités exigeantes. Votre sérénité est notre mission."
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Appeler maintenant", href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description}
        imageHint={heroImage?.imageHint}
      />
      <AnimateOnScroll>
        <TrustElements elements={trustElements} id="about" />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <ServicesGrid
          id="services"
          title="Nos Prestations de Haute Sécurité"
          description="Des solutions sur-mesure, exécutées avec une rigueur et une discrétion absolues."
          services={services}
        />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <ProcessSteps 
          title="Notre Protocole d'Excellence en 4 Étapes"
          description="Une méthodologie rigoureuse pour garantir une mise en place irréprochable et une efficacité maximale."
          steps={processSteps}
        />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <SectorsGrid sectors={sectors} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <CoverageSection
          id="contact"
          title="Intervention sur Paris et Zones Stratégiques"
          description="Notre maillage territorial assure une réactivité et une connaissance parfaite des zones d'intervention clés."
          zones={coverageZones}
        />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Testimonials testimonials={testimonials} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <FAQAccordion
          title="Vos Questions, Nos Réponses Claires"
          description="Tout ce que vous devez savoir sur nos services de haute sécurité."
          items={faqItems}
        />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <CTASection
          title="Passez au Niveau Supérieur de Protection"
          description="Discutons de vos besoins en toute confidentialité. Contactez nos experts pour une étude personnalisée et une proposition sur-mesure."
          cta={{ label: "Demander un Devis Confidentiel", href: "/devis" }}
        />
      </AnimateOnScroll>
      <StickyMobileCallButton phoneNumber={siteConfig.contact.phone} />
    </div>
  );
}
