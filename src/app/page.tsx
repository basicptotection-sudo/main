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

type LinkItem = { name: string; href: string; key: string };

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero");

  const trustElements = [
    {
      icon: "ShieldCheck",
      title: "Agents habilités & encadrement",
      description:
        "Des agents qualifiés, encadrés et sélectionnés selon la mission, avec une organisation claire et un suivi opérationnel.",
    },
    {
      icon: "FileText",
      title: "Devis clair & dispositif sur-mesure",
      description:
        "Évaluation de vos besoins, proposition structurée, et mise en place d’un dispositif adapté à votre site et vos contraintes.",
    },
    {
      icon: "Lock",
      title: "Discrétion & confidentialité",
      description:
        "Protocoles de confidentialité et règles internes strictes pour protéger vos informations et vos activités.",
    },
    {
      icon: "Zap",
      title: "Mise en place rapide (selon mission)",
      description:
        "Pour les demandes urgentes, nous organisons une solution temporaire rapide, puis un dispositif pérenne si nécessaire.",
    },
  ];

  const services = servicesData.map((service) => ({
    icon: (service as any).icon ?? "ShieldCheck", // optionnel si tu ajoutes icon dans tes data
    title: service.title,
    description: service.shortDescription,
    href: `/services/${service.slug}`,
  }));

  const processSteps = [
    {
      icon: "MessageCircle",
      title: "1. Écoute & cadrage",
      description:
        "Compréhension de vos risques, contraintes, horaires, flux et objectifs (prévention, dissuasion, contrôle d’accès…).",
    },
    {
      icon: "FileText",
      title: "2. Proposition structurée",
      description:
        "Plan d’action, moyens humains, consignes, reporting, et devis transparent (options incluses clairement).",
    },
    {
      icon: "ShieldCheck",
      title: "3. Déploiement & coordination",
      description:
        "Démarrage opérationnel, consignes de site, coordination avec vos équipes et points de contrôle qualité.",
    },
    {
      icon: "ThumbsUp",
      title: "4. Suivi & amélioration continue",
      description:
        "Remontées terrain, ajustements, rapports et amélioration progressive pour garantir un service stable.",
    },
  ];

  const sectors = [
    { icon: "Building2", name: "Entreprises & bureaux" },
    { icon: "Store", name: "Commerces & centres" },
    { icon: "HardHat", name: "Chantiers & sites techniques" },
    { icon: "CalendarDays", name: "Événements & accueil" },
    { icon: "Factory", name: "Entrepôts & logistique" },
    { icon: "Building", name: "Copropriétés & syndics" },
    { icon: "Home", name: "Particuliers (selon besoin)" },
  ];

  const testimonials = [
    {
      quote:
        "Mise en place rapide et consignes claires. Les agents sont sérieux, ponctuels, et la communication est fluide.",
      name: "Responsable de site",
      title: "Entreprise tertiaire – Yvelines",
    },
    {
      quote:
        "Bonne gestion des flux à l’entrée, présence rassurante, et un suivi régulier avec des points d’amélioration utiles.",
      name: "Chef de projet",
      title: "Événement – Île-de-France",
    },
    {
      quote:
        "Nous cherchions un partenaire fiable pour des rondes et de la surveillance. Prestation stable et réactive.",
      name: "Syndic / Gestion",
      title: "Résidence – 78",
    },
  ];

  const faqItems = [
    {
      question: "Intervenez-vous à Plaisir et dans tout le 78 ?",
      answer:
        "Oui. Nous sommes basés à Plaisir (78370) et intervenons sur les Yvelines (78) et, selon les missions, en Île-de-France. Contactez-nous pour confirmer la faisabilité et les délais.",
    },
    {
      question: "Quels types de missions prenez-vous en charge ?",
      answer:
        "Surveillance de sites, contrôle d’accès, prévention, rondes, sécurisation ponctuelle, et accompagnement opérationnel selon votre besoin. Nous adaptons le dispositif (horaires, postes, consignes).",
    },
    {
      question: "Comment garantissez-vous la qualité des prestations ?",
      answer:
        "Nous cadrons la mission en amont (consignes, objectifs, points de contrôle), puis nous assurons un suivi : remontées terrain, reporting et ajustements si nécessaire.",
    },
    {
      question: "En combien de temps peut-on démarrer ?",
      answer:
        "Selon la nature de la mission, un démarrage peut être organisé rapidement. Pour un dispositif complet, une courte phase de cadrage permet d’assurer un service durable et conforme.",
    },
  ];

  // Zones (déduplication propre)
  const zonesFromData: LinkItem[] = locationsData.map((loc) => ({
    name: loc.name,
    href: `/zones/${loc.slug}`,
    key: `zone-${loc.slug}`,
  }));

  const coreZones: LinkItem[] = [
    { name: "Plaisir (78370)", href: "/zones/plaisir-78370", key: "zone-plaisir-78370" },
    { name: "Yvelines (78)", href: "/zones/yvelines-78", key: "zone-yvelines-78" },
    { name: "Île-de-France", href: "/zones/ile-de-france", key: "zone-ile-de-france" },
  ];

  const zoneMap = new Map<string, LinkItem>();
  [...coreZones, ...zonesFromData].forEach((z) => zoneMap.set(z.key, z));
  const coverageZones = Array.from(zoneMap.values()).map(({ name, href }) => ({ name, href }));

  const phoneHref = `tel:${siteConfig.contact.phoneE164 ?? siteConfig.contact.phone.replace(/\s/g, "")}`;

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        title="Sécurité privée & gardiennage à Plaisir (78) et en Île-de-France"
        description="Basic Protection Privée met en place des dispositifs de surveillance, contrôle d’accès et prévention adaptés à vos sites, événements et activités. Un service clair, discret et rigoureux."
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Appeler", href: phoneHref, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? "Agent de sécurité – Basic Protection Privée"}
        imageHint={heroImage?.imageHint}
      />

      <AnimateOnScroll>
        <TrustElements elements={trustElements} id="about" />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ServicesGrid
          id="services"
          title="Nos services de sécurité"
          description="Des prestations cadrées et adaptables : prévention, surveillance, contrôle d’accès et présence dissuasive."
          services={services}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ProcessSteps
          title="Une méthode simple, efficace, maîtrisée"
          description="Cadrage clair, dispositif adapté, déploiement organisé, suivi régulier."
          steps={processSteps}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <SectorsGrid sectors={sectors} />
      </AnimateOnScroll>

      <AnimateOnScroll>
      <section id="zones">
  <CoverageSection
    title="Basés à Plaisir — intervention 78 & Île-de-France"
    description="Une présence locale et une organisation flexible pour intervenir sur vos sites et événements."
    zones={coverageZones}
  />
</section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <Testimonials testimonials={testimonials} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <FAQAccordion
          title="Questions fréquentes"
          description="Réponses claires avant de demander un devis."
          items={faqItems}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CTASection
          title="Parlons de votre besoin en toute confidentialité"
          description="Expliquez votre site, vos horaires et vos contraintes : nous vous répondons avec une proposition adaptée."
          cta={{ label: "Demander un devis", href: "/devis" }}
        />
      </AnimateOnScroll>

      <StickyMobileCallButton phoneNumber={siteConfig.contact.phone} />
    </div>
  );
}
