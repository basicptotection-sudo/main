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
      title: "Conformité & encadrement",
      description:
        "Agents habilités, consignes de site claires et supervision opérationnelle. Une prestation cadrée, pilotée et contrôlée.",
    },
    {
      icon: "FileText",
      title: "Dispositifs sur-mesure",
      description:
        "Un plan adapté à vos contraintes (accès, flux, horaires, risques) : sécurité de site, événementiel, VIP ou audit sûreté.",
    },
    {
      icon: "Lock",
      title: "Discrétion & confidentialité",
      description:
        "Protocoles internes stricts, gestion rigoureuse de l’information et posture professionnelle, y compris pour les missions sensibles.",
    },
    {
      icon: "Zap",
      title: "Réactivité maîtrisée",
      description:
        "Mise en place rapide selon la mission : solution immédiate si besoin, puis stabilisation avec consignes, planning et reporting.",
    },
  ];

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

  const processSteps = [
    {
      icon: "MessageCircle",
      title: "1. Diagnostic & cadrage",
      description:
        "Analyse des risques et des contraintes : accès, flux, zones sensibles, objectifs (prévention, filtrage, protection, dissuasion).",
    },
    {
      icon: "FileText",
      title: "2. Plan & consignes",
      description:
        "Plan d’action structuré : postes, consignes, procédures, coordination, options de reporting et moyens adaptés au terrain.",
    },
    {
      icon: "ShieldCheck",
      title: "3. Déploiement opérationnel",
      description:
        "Démarrage organisé, briefing, coordination avec vos équipes et ajustements terrain pour une efficacité immédiate.",
    },
    {
      icon: "ThumbsUp",
      title: "4. Suivi & amélioration",
      description:
        "Remontées terrain, rapports, audits réguliers et ajustements proactifs : la qualité se construit dans la durée.",
    },
  ];

  const sectors = [
    { icon: "Building2", name: "Entreprises & sièges sociaux" },
    { icon: "Store", name: "Commerces, retail & bijouteries" },
    { icon: "HardHat", name: "Chantiers & sites techniques" },
    { icon: "Factory", name: "Entrepôts & logistique" },
    { icon: "CalendarDays", name: "Événements & soirées privées" },
    { icon: "Users", name: "Dirigeants & personnalités" },
    { icon: "Building", name: "Copropriétés & sites résidentiels" },
  ];

  const testimonials = [
    {
      quote:
        "Consignes claires, posture impeccable et suivi régulier. Une prestation sérieuse, stable et bien encadrée.",
      name: "Responsable de site",
      title: "Entreprise – Yvelines",
    },
    {
      quote:
        "Très bonne gestion des accès et des flux. Dispositif discret, efficace et coordination fluide avec nos équipes.",
      name: "Chef de projet",
      title: "Événement – Île-de-France",
    },
    {
      quote:
        "Rondes et surveillance fiables. Les remontées terrain sont structurées, ce qui facilite le pilotage.",
      name: "Gestion / syndic",
      title: "Résidence – 78",
    },
  ];

  const faqItems = [
    {
      question: "Quels services proposez-vous exactement ?",
      answer:
        "Nous assurons la sécurité de site (agent qualifié, rondier, cynophile, incendie SSIAP) ainsi que des prestations premium : protection rapprochée (garde du corps), sécurité événementielle de prestige et audit & conseil en sûreté. Chaque dispositif est adapté à votre contexte.",
    },
    {
      question: "Intervenez-vous à Plaisir et dans tout le 78 ?",
      answer:
        "Oui. Nous sommes basés à Plaisir (78370) et intervenons sur les Yvelines (78) et, selon les missions, en Île-de-France. Contactez-nous avec votre adresse, vos horaires et le type de prestation : nous confirmons rapidement la faisabilité.",
    },
    {
      question: "Comment se déroule la mise en place d’un dispositif ?",
      answer:
        "Nous cadrons d’abord la mission (objectifs, consignes, accès, flux, points sensibles). Ensuite nous déployons l’équipe adaptée, puis nous assurons un suivi avec remontées terrain et ajustements pour stabiliser la prestation.",
    },
    {
      question: "Proposez-vous la protection rapprochée et l’événementiel ?",
      answer:
        "Oui. Pour les missions sensibles (dirigeants, personnalités, événements haut de gamme), nous privilégions la discrétion, la coordination et un dispositif proportionné. Un cadrage en amont est réalisé afin d’adapter le niveau de sécurité au contexte.",
    },
    {
      question: "Comment est calculé le prix ?",
      answer:
        "Le tarif dépend du volume horaire, du type de site, des contraintes (accès, public, horaires), et du niveau de suivi demandé. Nous fournissons un devis clair et structuré, avec options si nécessaire.",
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
        title="Sécurité privée, protection rapprochée & sûreté — Plaisir (78) / Île-de-France"
        description="Agent qualifié, cynophile, SSIAP, rondes, protection rapprochée, sécurité événementielle et audit sûreté : des dispositifs discrets, structurés et pilotés, adaptés à vos enjeux."
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Appeler", href: phoneHref, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? "Sécurité privée – Basic Protection Privée"}
        imageHint={heroImage?.imageHint}
      />

      <AnimateOnScroll>
        <TrustElements elements={trustElements} id="about" />
      </AnimateOnScroll>

      <div id="services">
        <AnimateOnScroll>
          <ServicesGrid
            title="Nos Services de Sécurité Terrain"
            description="Des solutions opérationnelles et fiables pour la protection quotidienne de vos sites."
            services={terrainServices}
          />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <ServicesGrid
            title="Nos Prestations Premium"
            description="Une expertise de haut niveau pour les enjeux de sécurité les plus complexes et sensibles."
            services={premiumServices}
          />
        </AnimateOnScroll>
      </div>

      <AnimateOnScroll>
        <ProcessSteps
          title="Notre protocole d’intervention"
          description="Diagnostic, plan, déploiement, suivi : une méthode claire pour garantir efficacité et stabilité."
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
            description="Une présence locale, une organisation flexible et des équipes adaptées à chaque mission."
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
          description="Conformité, prestations, délais, zone d’intervention : réponses claires avant la demande de devis."
          items={faqItems}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CTASection
          title="Décrivez votre besoin — nous construisons un dispositif adapté"
          description="Type de site, horaires, public, risques : échangez avec nous en toute confidentialité. Devis structuré et proposition sur-mesure."
          cta={{ label: "Demander un devis", href: "/devis" }}
        />
      </AnimateOnScroll>

      <StickyMobileCallButton phoneNumber={siteConfig.contact.phone} />
    </div>
  );
}
