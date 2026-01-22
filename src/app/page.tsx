import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { siteConfig } from '@/lib/config';
import { HeroSection, TrustElements, ServicesGrid, ProcessSteps, SectorsGrid, CoverageSection, Testimonials, FAQAccordion, CTASection, StickyMobileCallButton } from '@/components/shared';
import { Award, Factory, Gem, Hospital, Lock, School, ShieldCheck, ShoppingCart, Users, Zap, Building, FileText, MessageCircle, ThumbsUp } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  const trustElements = [
      {
          icon: <Award className="w-10 h-10 text-primary" />,
          title: "Conformité & Agrément",
          description: "Agents certifiés CNAPS, gage de notre professionnalisme et du respect de la réglementation.",
      },
      {
          icon: <Zap className="w-10 h-10 text-primary" />,
          title: "Réactivité 24/7",
          description: "Une ligne directe et des équipes prêtes à intervenir à tout moment, de jour comme de nuit.",
      },
      {
          icon: <Lock className="w-10 h-10 text-primary" />,
          title: "Confidentialité Absolue",
          description: "Discrétion totale assurée par des clauses de confidentialité et des protocoles stricts.",
      },
      {
          icon: <ShieldCheck className="w-10 h-10 text-primary" />,
          title: "Assurance & Responsabilité",
          description: "Une couverture complète par AXA pour une tranquillité d’esprit totale en cas d'incident.",
      },
  ];

  const services = [
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: 'Protection Rapprochée',
      description: 'Dispositifs discrets et efficaces pour la sécurité des dirigeants et personnalités (garde du corps).',
      href: "#contact",
    },
    {
      icon: <Building className="w-12 h-12 text-primary" />,
      title: 'Sécurité de Sites Prestigieux',
      description: 'Surveillance et contrôle d’accès pour sièges sociaux, boutiques de luxe, et ambassades.',
      href: "#contact",
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-primary" />,
      title: 'Audit & Ingénierie Sûreté',
      description: 'Analyse de risques complexes et conception de plans de sécurité intégrés et performants.',
      href: "#contact",
    },
    {
      icon: <Gem className="w-12 h-12 text-primary" />,
      title: 'Événementiel d\'Exception',
      description: 'Sécurisation de lancements, galas, défilés de mode et événements privés de haut standing.',
      href: "#contact",
    },
  ];

  const processSteps = [
    {
      icon: <MessageCircle className="w-10 h-10 text-primary" />,
      title: "1. Évaluation Stratégique",
      description: "Analyse confidentielle de vos enjeux et définition précise de vos objectifs de sécurité.",
    },
    {
      icon: <FileText className="w-10 h-10 text-primary" />,
      title: "2. Conception Sur-Mesure",
      description: "Élaboration d'un plan de sûreté détaillé et d'une proposition chiffrée transparente.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "3. Déploiement d'Élite",
      description: "Mise en place du dispositif par nos agents spécifiquement sélectionnés et formés.",
    },
    {
      icon: <ThumbsUp className="w-10 h-10 text-primary" />,
      title: "4. Pilotage & Amélioration",
      description: "Reporting en temps réel, audits réguliers et ajustement proactif pour une performance optimale.",
    },
  ];

  const sectors = [
    { icon: <Gem className="w-10 h-10" />, name: "Luxe & Joaillerie" },
    { icon: <Building className="w-10 h-10" />, name: "Sièges Sociaux & Tertiaire" },
    { icon: <Users className="w-10 h-10" />, name: "Personnalités & Familles" },
    { icon: <ShoppingCart className="w-10 h-10" />, name: "Événementiel de Prestige" },
    { icon: <Factory className="w-10 h-10" />, name: "Industrie Stratégique" },
    { icon: <School className="w-10 h-10" />, name: "Sites sensibles & Ambassades" },
    { icon: <Hospital className="w-10 h-10" />, name: "Santé & Recherche" },
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

  const coverageZones = [
      { name: "Paris (75)", href: "#contact" },
      { name: "Hauts-de-Seine (92)", href: "#contact" },
      { name: "Yvelines (78)", href: "#contact" },
      { name: "Val-de-Marne (94)", href: "#contact" },
      { name: "Seine-Saint-Denis (93)", href: "#contact" },
      { name: "Essonne (91)", href: "#contact" },
      { name: "Val-d'Oise (95)", href: "#contact" },
      { name: "Seine-et-Marne (77)", href: "#contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        title="Haute Sécurité Privée : L'Excellence pour votre Tranquillité"
        description="Nous concevons des dispositifs de sécurité d'élite pour protéger les entreprises, les sites sensibles et les personnalités exigeantes. Votre sérénité est notre mission."
        cta1={{ label: "Demander un devis", href: "#contact" }}
        cta2={{ label: "Appeler maintenant", href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description}
        imageHint={heroImage?.imageHint}
      />
      <TrustElements elements={trustElements} />
      <ServicesGrid
        id="services"
        title="Nos Prestations de Haute Sécurité"
        description="Des solutions sur-mesure, exécutées avec une rigueur et une discrétion absolues."
        services={services}
      />
      <ProcessSteps 
        title="Notre Protocole d'Excellence en 4 Étapes"
        description="Une méthodologie rigoureuse pour garantir une mise en place irréprochable et une efficacité maximale."
        steps={processSteps}
      />
      <SectorsGrid sectors={sectors} />
      <CoverageSection
        title="Intervention sur Paris et Zones Stratégiques"
        description="Notre maillage territorial assure une réactivité et une connaissance parfaite des zones d'intervention clés."
        zones={coverageZones}
      />
      <Testimonials testimonials={testimonials} />
      <FAQAccordion
        title="Vos Questions, Nos Réponses Claires"
        description="Tout ce que vous devez savoir sur nos services de haute sécurité."
        items={faqItems}
      />
      <CTASection
        id="contact"
        title="Passez au Niveau Supérieur de Protection"
        description="Discutons de vos besoins en toute confidentialité. Contactez nos experts pour une étude personnalisée et une proposition sur-mesure."
        cta={{ label: "Demander un Devis Confidentiel", href: `mailto:${siteConfig.contact.email}?subject=Demande de devis confidentiel` }}
      />
      <StickyMobileCallButton phoneNumber={siteConfig.contact.phone} />
    </div>
  );
}
