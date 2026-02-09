// src/lib/locations-data.ts
import { servicesData } from "./services-data";

export type FAQ = { question: string; answer: string };

export type LocationService = {
  icon: string;
  title: string;
  description: string;
  href: string;
};

export type UseCase = {
  icon: string;
  title: string;
  content: string;
};

export type CityLink = { name: string; href: string };

export type TrustElement = {
  icon: string;
  title: string;
  description: string;
};

export type Location = {
  slug: string;
  name: string;

  title: string; // meta title page (H1 peut être différent si tu veux)
  description: string; // meta description

  keywords: string[];

  heroImageId: string;

  intro: {
    title: string;
    content: string;
  };

  services: LocationService[];

  useCases: UseCase[];

  mainCities: CityLink[];

  whyUs: TrustElement[];

  faq: FAQ[];
};

/* ---------------- services (auto depuis ton catalogue) ---------------- */

const allServices: LocationService[] = servicesData.map((service) => ({
  icon: service.icon,
  title: service.title,
  description: service.shortDescription,
  href: `/services/${service.slug}`,
}));

/* ---------------- Pourquoi nous (commun + orienté conversion) ---------------- */

const commonWhyUs: TrustElement[] = [
  {
    icon: "Award",
    title: "Conformité & cadre légal",
    description:
      "Dispositifs cadrés, procédures, consignes écrites et exécution stable, dans le respect des obligations du secteur.",
  },
  {
    icon: "ClipboardCheck",
    title: "Analyse & dimensionnement",
    description:
      "On part du terrain : flux, accès, horaires, points sensibles et historique d’incidents pour définir un dispositif proportionné.",
  },
  {
    icon: "Users",
    title: "Supervision & continuité de service",
    description:
      "Encadrement opérationnel, contrôles, remontées terrain et ajustements : priorité à la qualité et à la régularité.",
  },
  {
    icon: "FileText",
    title: "Reporting exploitable",
    description:
      "Main courante, rapports d’événements et synthèses : vous pilotez la sûreté avec des informations claires.",
  },
];

/* ---------------- Données zones / départements (version “haut niveau”) ---------------- */

export const locationsData: Location[] = [
  /* =======================================================================
   * YVELINES (78)
   * ======================================================================= */
  {
    slug: "yvelines-78",
    name: "Yvelines (78)",

    title: "Sécurité privée & gardiennage dans les Yvelines (78) | Entreprises, chantiers, résidentiel",
    description:
      "Agence de sécurité dans les Yvelines : gardiennage, rondes, contrôle d’accès, surveillance de chantiers et sites résidentiels. Dispositifs sur mesure et réactivité sur tout le 78 (Plaisir, Versailles, SQY…).",
    keywords: [
      "sécurité privée yvelines",
      "gardiennage 78",
      "agent de sécurité plaisir",
      "surveillance chantier 78",
      "rondes de sécurité yvelines",
      "contrôle d'accès yvelines",
      "sécurité versailles",
      "sécurité saint-quentin-en-yvelines",
    ],

    heroImageId: "zone-yvelines-78",

    intro: {
      title: "Une présence locale pour sécuriser les Yvelines, avec méthode et traçabilité.",
      content:
        "Dans les Yvelines, les besoins sont très contrastés : quartiers tertiaires (Saint-Quentin-en-Yvelines), sites institutionnels et zones résidentielles (Versailles, Saint-Germain-en-Laye), chantiers et parcs d’activités. Notre approche reste la même : analyser le terrain, cadrer la mission (accès, horaires, zones sensibles), déployer un dispositif proportionné (poste, rondes, levée de doute) et assurer un reporting clair. Résultat : moins d’incidents, plus de continuité et une sécurité lisible pour vos équipes et vos occupants.",
    },

    services: allServices,

    useCases: [
      {
        icon: "HardHat",
        title: "Surveillance de chantiers et sites BTP",
        content:
          "Prévenir vols de matériaux, intrusions et dégradations via rondes dissuasives, contrôle d’accès et levées de doute. Dimensionnement selon surface, accès et périodes à risque (nuits/week-ends).",
      },
      {
        icon: "Building2",
        title: "Contrôle d’accès en entreprise & tertiaire",
        content:
          "Accueil filtrant, gestion visiteurs/prestataires/livraisons, surveillance des zones sensibles et traçabilité des événements pour les bureaux, campus et parcs d’activités.",
      },
      {
        icon: "Home",
        title: "Résidentiel & copropriétés",
        content:
          "Rondes de surveillance, prévention des incivilités, sécurisation parkings et parties communes. Remontées terrain utiles au syndic/gestionnaire.",
      },
    ],

    mainCities: [
      { name: "Montigny-le-Bretonneux", href: "/villes/montigny-le-bretonneux-78180" },
      { name: "Plaisir", href: "/villes/plaisir-78370" },
      { name: "Saint-Germain-en-Laye", href: "/villes/saint-germain-en-laye-78100" },
      { name: "Versailles", href: "/villes/versailles-78000" },
    ],

    whyUs: commonWhyUs,

    faq: [
      {
        question: "Quel est votre délai d’intervention dans les Yvelines (78) ?",
        answer:
          "Cela dépend du contexte et du dispositif (poste, rondes, intervention). Notre organisation vise une mise en place rapide, puis une stabilisation après cadrage du terrain et consignes écrites.",
      },
      {
        question: "Proposez-vous des rondes de nuit et le week-end ?",
        answer:
          "Oui. Ce sont souvent les créneaux les plus exposés. On définit les horaires et points de passage selon vos risques (intrusions, vols, incivilités).",
      },
      {
        question: "Comment sont calculés les tarifs ?",
        answer:
          "Selon le type de mission, le volume horaire, le niveau de technicité, les contraintes d’accès et les attentes de reporting. Un devis suit toujours une analyse de besoin.",
      },
    ],
  },

  /* =======================================================================
   * PARIS (75)
   * ======================================================================= */
  {
    slug: "paris-75",
    name: "Paris (75)",

    title: "Agence de sécurité privée à Paris (75) | Luxe, événementiel, entreprises & sites sensibles",
    description:
      "Sécurité privée à Paris : surveillance de boutiques de luxe, sécurité événementielle, contrôle d’accès de sièges sociaux, rondes et dispositifs premium. Posture irréprochable, discrétion et reporting.",
    keywords: [
      "sécurité privée paris",
      "agence sécurité paris 75",
      "gardiennage luxe paris",
      "sécurité événementielle paris",
      "contrôle d'accès paris",
      "sécurité boutique luxe paris",
      "agent de sécurité paris",
      "sécurité siège social paris",
    ],

    heroImageId: "zone-paris",

    intro: {
      title: "À Paris, la sécurité doit être irréprochable : efficace, discrète et orientée expérience.",
      content:
        "Paris concentre des environnements exigeants : retail premium, hôtellerie, événements, sièges sociaux, sites à forte affluence. Ici, la qualité d’exécution se voit immédiatement : posture, fluidité, communication et maîtrise des incidents. Nous déployons des dispositifs structurés (filtrage, gestion des flux, levées de doute, rondes, consignes écrites) avec une traçabilité claire. Objectif : protéger vos clients, vos équipes et vos actifs, tout en préservant l’image de votre établissement.",
    },

    services: allServices,

    useCases: [
      {
        icon: "Gem",
        title: "Boutiques de luxe, bijouteries, retail premium",
        content:
          "Agents formés aux codes du luxe : présence dissuasive et élégante, prévention des pertes, gestion des comportements suspects, coordination avec vos équipes et rédaction de rapports.",
      },
      {
        icon: "CalendarDays",
        title: "Sécurité événementielle (galas, défilés, lancements)",
        content:
          "Dimensionnement selon la jauge et les accès : contrôle d’accès, gestion des flux, zones VIP, coordination avec l’organisation et circuit de remontée d’information terrain.",
      },
      {
        icon: "Building2",
        title: "Sûreté tertiaire & contrôle d’accès",
        content:
          "Accueil filtrant, gestion des visiteurs et prestataires, sécurisation des zones sensibles, rondes et reporting (main courante / rapports d’événements).",
      },
    ],

    mainCities: [
        { name: "Paris 10e", href: "/villes/paris-10-75010" },
        { name: "Paris 11e", href: "/villes/paris-11-75011" },
        { name: "Paris 12e", href: "/villes/paris-12-75012" },
        { name: "Paris 13e", href: "/villes/paris-13-75013" },
        { name: "Paris 14e", href: "/villes/paris-14-75014" },
        { name: "Paris 15e", href: "/villes/paris-15-75015" },
        { name: "Paris 16e", href: "/villes/paris-16-75016" },
        { name: "Paris 17e", href: "/villes/paris-17-75017" },
        { name: "Paris 18e", href: "/villes/paris-18-75018" },
        { name: "Paris 19e", href: "/villes/paris-19-75019" },
        { name: "Paris 1er", href: "/villes/paris-1-75001" },
        { name: "Paris 20e", href: "/villes/paris-20-75020" },
        { name: "Paris 2e", href: "/villes/paris-2-75002" },
        { name: "Paris 3e", href: "/villes/paris-3-75003" },
        { name: "Paris 4e", href: "/villes/paris-4-75004" },
        { name: "Paris 5e", href: "/villes/paris-5-75005" },
        { name: "Paris 6e", href: "/villes/paris-6-75006" },
        { name: "Paris 7e", href: "/villes/paris-7-75007" },
        { name: "Paris 8e", href: "/villes/paris-8-75008" },
        { name: "Paris 9e", href: "/villes/paris-9-75009" },
    ],

    whyUs: commonWhyUs,

    faq: [
      {
        question: "Vos agents sont-ils adaptés au secteur du luxe ?",
        answer:
          "Oui. Sélection, présentation, discrétion, communication et posture orientée expérience client sont déterminants sur ces missions.",
      },
      {
        question: "Intervenez-vous pour des missions courtes à Paris ?",
        answer:
          "Oui. Pop-up stores, renforts ponctuels, événements : nous pouvons déployer un dispositif calibré sur quelques heures à plusieurs jours.",
      },
      {
        question: "Pouvez-vous gérer des accès VIP et des zones sensibles ?",
        answer:
          "Oui. Nous mettons en place des procédures d’accès, contrôles et circuits de circulation (zones, accréditations, points de contrôle).",
      },
    ],
  },

  /* =======================================================================
   * HAUTS-DE-SEINE (92)
   * ======================================================================= */
  {
    slug: "hauts-de-seine-92",
    name: "Hauts-de-Seine (92)",

    title: "Sécurité entreprises & sièges sociaux dans les Hauts-de-Seine (92) | La Défense, Neuilly",
    description:
      "Sécurité privée B2B dans le 92 : contrôle d’accès, accueil sûreté, rondes, levées de doute et reporting pour sièges sociaux, IGH et campus (La Défense, Neuilly, Boulogne…).",
    keywords: [
      "sécurité entreprise 92",
      "gardiennage la défense",
      "contrôle d'accès hauts-de-seine",
      "agent de sécurité neuilly",
      "sécurité siège social 92",
      "sécurité immeuble bureaux 92",
    ],

    heroImageId: "zone-hauts-de-seine",

    intro: {
      title: "La sûreté tertiaire au cœur du 92 : flux, procédures, continuité.",
      content:
        "Les Hauts-de-Seine concentrent des sites stratégiques : sièges sociaux, IGH, campus, data/IT, environnements à forte densité. La sécurité se joue sur la maîtrise des flux (collaborateurs, visiteurs, livraisons), des procédures d’accès et de la traçabilité. Nous déployons des équipes cadrées et supervisées, capables d’assurer l’accueil filtrant, les rondes, les levées de doute et un reporting utile à la direction sécurité et aux services généraux.",
    },

    services: allServices,

    useCases: [
      {
        icon: "Building2",
        title: "Sûreté de sièges sociaux, IGH et campus",
        content:
          "Dispositif complet : agents postés, rondes, coordination avec PC sécurité, consignes écrites et reporting régulier pour une protection 24/7.",
      },
      {
        icon: "Users",
        title: "Accueil sûreté & contrôle d’accès",
        content:
          "Gestion des visiteurs et prestataires, détection d’anomalies, application des procédures et sécurisation des zones restreintes.",
      },
      {
        icon: "ShieldCheck",
        title: "Audit & conseil sûreté",
        content:
          "Diagnostic concret (flux, accès, zones sensibles), plan d’action priorisé et recommandations pour renforcer votre dispositif.",
      },
    ],

    mainCities: [
        { name: "Asnières-sur-Seine", href: "/villes/asnieres-sur-seine-92600" },
        { name: "Boulogne-Billancourt", href: "/villes/boulogne-billancourt-92100" },
        { name: "Clamart", href: "/villes/clamart-92140" },
        { name: "Colombes", href: "/villes/colombes-92700" },
        { name: "Courbevoie", href: "/villes/courbevoie-92400" },
        { name: "Issy-les-Moulineaux", href: "/villes/issy-les-moulineaux-92130" },
        { name: "La Défense", href: "/villes/la-defense-92400" },
        { name: "Levallois-Perret", href: "/villes/levallois-perret-92300" },
        { name: "Meudon", href: "/villes/meudon-92190" },
        { name: "Nanterre", href: "/villes/nanterre-92000" },
        { name: "Neuilly-sur-Seine", href: "/villes/neuilly-sur-seine-92200" },
        { name: "Puteaux", href: "/villes/puteaux-92800" },
        { name: "Rueil-Malmaison", href: "/villes/rueil-malmaison-92500" }
    ],

    whyUs: commonWhyUs,

    faq: [
      {
        question: "Comment gérez-vous la sécurité dans un IGH ?",
        answer:
          "Par un dispositif structuré : procédures, consignes écrites, points de contrôle, coordination des équipes (accès, rondes, incidents) et traçabilité des événements.",
      },
      {
        question: "Proposez-vous des audits pour nos bureaux dans le 92 ?",
        answer:
          "Oui. L’audit permet d’évaluer les risques réels, d’optimiser les procédures et de prioriser les actions (accès, flux, zones sensibles, organisation).",
      },
      {
        question: "Pouvez-vous gérer de gros volumes de visiteurs ?",
        answer:
          "Oui. On adapte l’organisation et les points de contrôle pour préserver la fluidité tout en gardant un filtrage efficace.",
      },
    ],
  },

  /* =======================================================================
   * SEINE-SAINT-DENIS (93)
   * ======================================================================= */
  {
    slug: "seine-saint-denis-93",
    name: "Seine-Saint-Denis (93)",

    title: "Sécurité chantiers, entrepôts & logistique en Seine-Saint-Denis (93) | Anti-vol & anti-intrusion",
    description:
      "Surveillance de chantiers et plateformes logistiques dans le 93 : rondes, contrôle d’accès, levées de doute, cynophile selon besoins et reporting. Protection efficace contre vols et dégradations.",
    keywords: [
      "sécurité chantier 93",
      "gardiennage entrepôt 93",
      "agent cynophile 93",
      "sécurité logistique seine-saint-denis",
      "surveillance chantier grand paris",
      "sécurité saint-denis",
      "sécurité aubervilliers",
    ],

    heroImageId: "zone-seine-saint-denis-93",

    intro: {
      title: "Protéger les investissements et les flux : une sécurité robuste et pilotée.",
      content:
        "Le 93 combine grands chantiers, zones logistiques, entrepôts et infrastructures sensibles. Les risques les plus fréquents : vols (matériaux, marchandises), intrusions nocturnes, dégradations et tentatives opportunistes. Notre réponse : un dispositif dissuasif (poste + rondes), des contrôles d’accès adaptés à l’exploitation, des levées de doute rapides et une traçabilité claire (rapports, main courante) pour prévenir la récidive.",
    },

    services: allServices,

    useCases: [
      {
        icon: "HardHat",
        title: "Surveillance de chantiers (Grand Paris, BTP)",
        content:
          "Rondes dissuasives à horaires variables, contrôle des accès, sécurisation zones sensibles, levées de doute et rapports d’événements.",
      },
      {
        icon: "Factory",
        title: "Sécurisation de plateformes logistiques",
        content:
          "Filtrage des accès, surveillance des zones de stockage, prévention intrusions et anomalies d’exploitation, reporting exploitable.",
      },
      {
        icon: "Dog",
        title: "Rondes cynophiles (si périmètre étendu)",
        content:
          "Renforcement très dissuasif la nuit sur grands sites et zones peu éclairées : meilleure détection et prévention des intrusions.",
      },
    ],

    mainCities: [
        { name: "Aubervilliers", href: "/villes/aubervilliers-93300" },
        { name: "Aulnay-sous-Bois", href: "/villes/aulnay-sous-bois-93600" },
        { name: "Bobigny", href: "/villes/bobigny-93000" },
        { name: "Le Bourget", href: "/villes/le-bourget-93350" },
        { name: "Montreuil", href: "/villes/montreuil-93100" },
        { name: "Noisy-le-Grand", href: "/villes/noisy-le-grand-93160" },
        { name: "Pantin", href: "/villes/pantin-93500" },
        { name: "Saint-Denis", href: "/villes/saint-denis-93200" },
        { name: "Tremblay-en-France", href: "/villes/tremblay-en-france-93290" },
        { name: "Villepinte", href: "/villes/villepinte-93420" }
    ],

    whyUs: commonWhyUs,

    faq: [
      {
        question: "L’agent cynophile est-il la meilleure solution pour un chantier ?",
        answer:
          "Souvent oui sur grands périmètres : dissuasion + détection. Sur sites plus petits, un poste + rondes ciblées peut suffire.",
      },
      {
        question: "Comment assurez-vous la traçabilité des rondes ?",
        answer:
          "Par des points de passage définis, des comptes-rendus et des rapports d’événements. L’objectif est une information exploitable, pas du reporting “pour faire joli”.",
      },
      {
        question: "Pouvez-vous intervenir la nuit et le week-end ?",
        answer:
          "Oui. Ce sont les créneaux les plus exposés. On adapte la fréquence et les points de passage selon vos risques.",
      },
    ],
  },

  /* =======================================================================
   * VAL-DE-MARNE (94)
   * ======================================================================= */
  {
    slug: "val-de-marne-94",
    name: "Val-de-Marne (94)",

    title: "Sécurité logistique & tertiaire dans le Val-de-Marne (94) | Rungis, zones d’activités, bureaux",
    description:
      "Sécurité privée dans le 94 : contrôle d’accès, rondes et gardiennage pour plateformes logistiques, zones d’activités et sites tertiaires. Dispositifs sur mesure et reporting (Rungis, Créteil…).",
    keywords: [
      "sécurité val-de-marne",
      "gardiennage rungis",
      "sécurité logistique 94",
      "contrôle d'accès 94",
      "agent de sécurité créteil",
      "sécurité zone d'activité 94",
    ],

    heroImageId: "zone-val-de-marne-94",

    intro: {
      title: "Sécuriser les flux et la continuité : une approche opérationnelle, terrain et traçable.",
      content:
        "Le Val-de-Marne est un pôle clé pour la logistique et le tertiaire. Entre zones d’activités, sites de stockage, bureaux et flux importants, la sécurité doit être structurée : contrôle d’accès, procédures simples, rondes ciblées, levées de doute et reporting clair. Nous dimensionnons les équipes selon vos horaires réels (souvent décalés) et vos points sensibles, pour une protection efficace sans gêner l’exploitation.",
    },

    services: allServices,

    useCases: [
      {
        icon: "Truck",
        title: "Sécurisation des zones logistiques (type Rungis / hubs)",
        content:
          "Contrôle des accès, surveillance entrepôts et zones de stockage, levées de doute, traçabilité des incidents et coordination exploitation.",
      },
      {
        icon: "Building2",
        title: "Gardiennage tertiaire & parcs d’activités",
        content:
          "Postes d’accueil sûreté, rondes d’ouverture/fermeture, prévention intrusions et reporting régulier.",
      },
      {
        icon: "ShieldCheck",
        title: "Rondes & intervention sur alarme",
        content:
          "Rondes programmées ou aléatoires, intervention selon procédure et rapports circonstanciés pour pilotage.",
      },
    ],

    mainCities: [
        { name: "Choisy-le-Roi", href: "/villes/choisy-le-roi-94600" },
        { name: "Créteil", href: "/villes/creteil-94000" },
        { name: "Ivry-sur-Seine", href: "/villes/ivry-sur-seine-94200" },
        { name: "Orly", href: "/villes/orly-94310" },
        { name: "Rungis", href: "/villes/rungis-94150" },
        { name: "Saint-Maur-des-Fossés", href: "/villes/saint-maur-des-fosses-94100" },
        { name: "Thiais", href: "/villes/thiais-94320" },
        { name: "Vincennes", href: "/villes/vincennes-94300" },
        { name: "Vitry-sur-Seine", href: "/villes/vitry-sur-seine-94400" }
    ],

    whyUs: commonWhyUs,

    faq: [
      {
        question: "Quelle est la spécificité de la sécurité sur un hub logistique ?",
        answer:
          "La maîtrise des flux (véhicules/personnes), les horaires décalés et la protection des stocks. Il faut des procédures simples, strictes et une traçabilité solide.",
      },
      {
        question: "Intervenez-vous la nuit et les week-ends dans le 94 ?",
        answer:
          "Oui. Nos dispositifs (postes/rondes/levées de doute) peuvent couvrir 24/7 selon votre niveau de risque et vos contraintes.",
      },
      {
        question: "Fournissez-vous un reporting régulier ?",
        answer:
          "Oui. Main courante, rapports d’événements et synthèses selon la fréquence souhaitée (quotidienne, hebdomadaire, mensuelle).",
      },
    ],
  },

  /* =======================================================================
   * VAL-D’OISE (95)
   * ======================================================================= */
  {
    slug: "val-doise-95",
    name: "Val-d’Oise (95)",

    title: "Sécurité & surveillance dans le Val-d’Oise (95) | Roissy, Cergy, plateformes logistiques",
    description:
      "Sécurité privée dans le 95 : gardiennage, rondes, contrôle d’accès, cynophile selon besoins pour entrepôts, zones logistiques et parcs d’activités (Roissy, Cergy, Argenteuil…).",
    keywords: [
      "sécurité val-d'oise",
      "gardiennage roissy",
      "sécurité logistique 95",
      "agent cynophile 95",
      "surveillance entrepôt 95",
      "sécurité cergy",
      "sécurité argenteuil",
    ],

    heroImageId: "zone-val-doise-95",

    intro: {
      title: "Protéger les axes stratégiques du 95 : logistique, activité économique et flux.",
      content:
        "Le Val-d’Oise concentre des zones logistiques majeures autour de Roissy et des parcs d’activités étendus. Les risques sont connus : intrusions nocturnes, vols opportunistes, tentatives sur zones de stockage et incidents d’accès. Nous sécurisons par une combinaison pragmatique : contrôle d’accès, rondes périmétriques, levées de doute, cynophile sur grands périmètres, et reporting clair pour agir sur les causes, pas seulement sur les effets.",
    },

    services: allServices,

    useCases: [
      {
        icon: "Plane",
        title: "Zones logistiques proches aéroport (Roissy)",
        content:
          "Contrôle d’accès, surveillance périmétrique, gestion des anomalies, traçabilité et coordination opérationnelle.",
      },
      {
        icon: "Building2",
        title: "Parcs d’activités & mutualisation de rondes",
        content:
          "Rondes mutualisées possibles selon configuration : solution performante pour plusieurs sites avec pilotage et reporting.",
      },
      {
        icon: "Dog",
        title: "Cynophile sur grands sites",
        content:
          "Renforcement dissuasif sur grands périmètres : rondes nocturnes, points sensibles et levées de doute rapides.",
      },
    ],

    mainCities: [
        { name: "Argenteuil", href: "/villes/argenteuil-95100" },
        { name: "Cergy", href: "/villes/cergy-95000" },
        { name: "Ermont", href: "/villes/ermont-95120" },
        { name: "Franconville", href: "/villes/franconville-95130" },
        { name: "Gonesse", href: "/villes/gonesse-95500" },
        { name: "Goussainville", href: "/villes/goussainville-95190" },
        { name: "Roissy-en-France", href: "/villes/roissy-en-france-95700" },
        { name: "Sarcelles", href: "/villes/sarcelles-95200" }
    ],

    whyUs: commonWhyUs,

    faq: [
      {
        question: "Pouvez-vous sécuriser un seul entrepôt dans le 95 ?",
        answer:
          "Oui. Un site unique peut être couvert par un poste, des rondes ou un mix. Le dispositif dépend des accès, de la surface, des horaires et des risques.",
      },
      {
        question: "Le cynophile est-il pertinent en zone logistique ?",
        answer:
          "Souvent oui sur grands périmètres et en horaires nocturnes : forte dissuasion et meilleure capacité de détection.",
      },
      {
        question: "Faites-vous des rondes 24/7 ?",
        answer:
          "Nous adaptons la couverture à vos horaires réels et aux périodes à risque. Le 24/7 est possible selon besoin.",
      },
    ],
  },

  /* =======================================================================
   * SEINE-ET-MARNE (77)
   * ======================================================================= */
  {
    slug: "seine-et-marne-77",
    name: "Seine-et-Marne (77)",

    title: "Sécurité & gardiennage en Seine-et-Marne (77) | Grands sites, logistique, périmètres étendus",
    description:
      "Sécurité privée dans le 77 : surveillance de grands sites, plateformes logistiques, sites isolés et zones touristiques. Rondes véhiculées, cynophile selon besoins, contrôle d’accès et reporting.",
    keywords: [
      "sécurité seine-et-marne",
      "gardiennage 77",
      "sécurité plateforme logistique 77",
      "agent cynophile 77",
      "surveillance site isolé",
      "sécurité marne-la-vallée",
      "sécurité meaux",
      "sécurité melun",
    ],

    heroImageId: "zone-seine-et-marne-77",

    intro: {
      title: "Surveiller de grands périmètres : mobilité, dissuasion et pilotage.",
      content:
        "La Seine-et-Marne se distingue par ses surfaces : grands entrepôts, plateformes logistiques, sites industriels parfois isolés, et zones de loisirs. La sécurité efficace repose sur une stratégie mixte : postes aux points clés, rondes véhiculées, rondes cynophiles si nécessaire, levées de doute rapides et traçabilité. Nous construisons un plan opérationnel qui couvre réellement le terrain, pas seulement sur le papier.",
    },

    services: allServices,

    useCases: [
      {
        icon: "Truck",
        title: "Plateformes logistiques XXL",
        content:
          "Postes aux accès, rondes périmétriques, sécurisation zones extérieures de stockage, levées de doute et reporting exploitable.",
      },
      {
        icon: "Map",
        title: "Sites étendus / isolés",
        content:
          "Rondes mobiles et dissuasion renforcée, plan de passage imprévisible, sécurisation des accès secondaires.",
      },
      {
        icon: "Castle",
        title: "Renforts sur sites touristiques et événements",
        content:
          "Gestion des flux, sécurisation des parkings et zones sensibles, posture “sécurité-service” pour préserver l’expérience visiteur.",
      },
    ],

    mainCities: [
        { name: "Lieusaint", href: "/villes/lieusaint-77127" },
        { name: "Lognes", href: "/villes/lognes-77185" },
        { name: "Marne-la-Vallée", href: "/villes/marne-la-vallee-77700" },
        { name: "Meaux", href: "/villes/meaux-77100" },
        { name: "Melun", href: "/villes/melun-77000" },
        { name: "Mitry-Mory", href: "/villes/mitry-mory-77290" },
        { name: "Moissy-Cramayel", href: "/villes/moissy-cramayel-77550" },
        { name: "Pontault-Combault", href: "/villes/pontault-combault-77340" },
        { name: "Serris", href: "/villes/serris-77700" }
    ],

    whyUs: commonWhyUs,

    faq: [
      {
        question: "Comment sécuriser un site très étendu dans le 77 ?",
        answer:
          "Avec une stratégie mixte : postes aux points névralgiques + rondes mobiles (véhiculées/cynophiles) et procédures de levée de doute.",
      },
      {
        question: "Vos agents peuvent-ils être discrets sur des sites ouverts au public ?",
        answer:
          "Oui. On privilégie une posture orientée accueil et fluidité, tout en conservant la vigilance et la capacité d’intervention.",
      },
      {
        question: "Proposez-vous des rondes nocturnes ?",
        answer:
          "Oui. La nuit et le week-end sont souvent les plus exposés : on adapte la fréquence et les points de passage selon vos risques.",
      },
    ],
  },

  /* =======================================================================
   * ESSONNE (91)
   * ======================================================================= */
  {
    slug: "essonne-91",
    name: "Essonne (91)",

    title: "Sécurité pour pôles technologiques & tertiaires en Essonne (91) | Saclay, Massy, Évry",
    description:
      "Sécurité privée en Essonne : contrôle d’accès, sûreté tertiaire, rondes et audit pour sites sensibles, campus et pôles technologiques (Paris-Saclay). Dispositifs cadrés et reporting.",
    keywords: [
      "sécurité essonne",
      "gardiennage saclay",
      "sécurité paris-saclay",
      "contrôle d'accès 91",
      "sécurité massy",
      "sécurité évry",
      "sécurité campus",
      "sécurité laboratoire",
    ],

    heroImageId: "zone-essonne-91",

    intro: {
      title: "Protéger l’innovation : procédures, accès maîtrisés et traçabilité.",
      content:
        "L’Essonne accueille des environnements à forte valeur : campus, laboratoires, centres de recherche, parcs tertiaires. Les enjeux dépassent la simple présence : contrôle d’accès rigoureux, prévention des intrusions, protection des zones sensibles, gestion des visiteurs et traçabilité. Nous mettons en place des dispositifs structurés, avec consignes écrites et reporting, afin de sécuriser sans perturber l’activité.",
    },

    services: allServices,

    useCases: [
      {
        icon: "FlaskConical",
        title: "Centres de recherche & campus (Paris-Saclay)",
        content:
          "Contrôle d’accès aux bâtiments et zones sensibles, gestion visiteurs/prestataires, rondes ciblées et procédures adaptées à la confidentialité.",
      },
      {
        icon: "Building2",
        title: "Parcs d’affaires (Massy / Évry)",
        content:
          "Accueil sûreté, rondes d’ouverture/fermeture, levées de doute, reporting pour limiter intrusions et incidents récurrents.",
      },
      {
        icon: "FileSearch",
        title: "Audit de sûreté",
        content:
          "Diagnostic terrain, analyse des flux et recommandations concrètes (accès, procédures, zones sensibles) pour renforcer votre dispositif.",
      },
    ],

    mainCities: [
        { name: "Corbeil-Essonnes", href: "/villes/corbeil-essonnes-91100" },
        { name: "Évry-Courcouronnes", href: "/villes/evry-courcouronnes-91000" },
        { name: "Les Ulis", href: "/villes/les-ulis-91940" },
        { name: "Massy", href: "/villes/massy-91300" },
        { name: "Orsay", href: "/villes/orsay-91400" },
        { name: "Palaiseau", href: "/villes/palaiseau-91120" },
        { name: "Ris-Orangis", href: "/villes/ris-orangis-91130" },
        { name: "Saclay", href: "/villes/saclay-91400" }
    ],

    whyUs: commonWhyUs,

    faq: [
      {
        question: "Comment sécuriser un laboratoire ou une zone sensible ?",
        answer:
          "Par un contrôle d’accès strict, une traçabilité des entrées/sorties, des rondes ciblées et des procédures claires. Un audit préalable aide souvent à calibrer le bon niveau de sûreté.",
      },
      {
        question: "Pouvez-vous intervenir dans un environnement international (Saclay) ?",
        answer:
          "Oui. Selon besoin, on peut affecter des agents à l’aise avec un public international (accueil, communication, procédures).",
      },
      {
        question: "Proposez-vous des services de nuit et week-end ?",
        answer:
          "Oui. La couverture dépend de vos horaires réels et de vos risques. Les rondes et interventions peuvent être adaptées 24/7 si nécessaire.",
      },
    ],
  },
];
