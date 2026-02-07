import { PlaceHolderImages } from "./placeholder-images";

/** ---------------------------------------
 *  Types : stricts, lisibles, maintenables
 *  -------------------------------------- */

export type LucideIconName = string; // si tu veux ultra strict: union de noms connus

export type FAQ = Readonly<{
  question: string;
  answer: string;
}>;

export type Benefit = Readonly<{
  title: string;
  description: string;
}>;

export type TrustElement = Readonly<{
  icon: LucideIconName;
  title: string;
  description: string;
}>;

export type SeoBlock = Readonly<{
  metaTitle?: string;
  metaDescription?: string;
  h1?: string;
  slugKeyword?: string;
  secondaryKeywords?: readonly string[];
}>;

export type InternalLink = Readonly<{
  label: string;
  href: string; // toujours commencer par "/"
}>;

export type ContentSection = Readonly<{
  id: string;
  title: string;
  intro?: string;
  bullets?: readonly string[];
  paragraphs?: readonly string[];
  note?: string;
  internalLinks?: readonly InternalLink[];
}>;

export type MethodStep = Readonly<{
  icon: LucideIconName;
  title: string;
  description: string;
}>;

export type ServiceSector = Readonly<{
  icon: LucideIconName;
  name: string;
}>;

export type ServicePage = Readonly<{
  lead?: string;
  sections: readonly ContentSection[];
  faqLong?: readonly FAQ[];
  relatedServices?: readonly string[]; // slugs
}>;

export type Service = Readonly<{
  slug: string;
  icon: LucideIconName;
  title: string;
  shortDescription: string;
  description: string;
  keywords: readonly string[];
  heroImageId: string;
  benefits: readonly Benefit[];
  method: Readonly<{
    title: string;
    description: string;
    steps: readonly MethodStep[];
  }>;
  sectors: readonly ServiceSector[];
  whyUs?: readonly TrustElement[];
  faq: readonly FAQ[];

  seo?: SeoBlock;
  page?: ServicePage;
}>;

/** ---------------------------------------
 *  Helpers
 *  -------------------------------------- */

// garantit que l'id existe dans PlaceHolderImages
function ensureHero(id: string, fallback = "hero") {
  return PlaceHolderImages?.some((p) => p.id === id) ? id : fallback;
}

// normalise les href internes
function ensureInternalHref(href: string): string {
  if (!href) return "/";
  return href.startsWith("/") ? href : `/${href}`;
}

// fabrique un id de section stable si tu veux harmoniser
function makeSectionId(prefix: string, id: string) {
  return `${prefix}-${id}`.replace(/--+/g, "-");
}

/** ---------------------------------------
 *  DATA
 *  -------------------------------------- */

export const servicesData: readonly Service[] = [
  {
    slug: "agent-securite-qualifie",
    icon: "Shield",
    title: "Agent de Sécurité Qualifié (APS)",
    shortDescription:
      "La référence en gardiennage et surveillance de site. Fiabilité, rigueur et professionnalisme pour une tranquillité d’esprit totale.",
    description:
      "Nos agents de sécurité qualifiés (CQP-APS) sont le pilier de la protection des biens et des personnes. Postés, véhiculés ou en rondes, ils contrôlent les accès, préviennent les actes de malveillance et gèrent les incidents, garantissant un environnement sûr pour vos collaborateurs, vos clients et vos actifs.",
    keywords: [
      "agent de sécurité",
      "gardiennage",
      "surveillance de site",
      "agent APS",
      "sécurité entreprise",
      "contrôle d'accès",
      "prévention malveillance",
      "sécurité privée Île-de-France",
    ],
    heroImageId: ensureHero("service-agent-qualifie"),
    benefits: [
      {
        title: "Dissuasion & prévention active",
        description:
          "Une présence visible et professionnelle réduit significativement les risques d’intrusion, de vol et de vandalisme. Nos agents détectent les comportements suspects et agissent en amont.",
      },
      {
        title: "Contrôle d’accès rigoureux",
        description:
          "Filtrage des visiteurs, véhicules et livraisons selon vos procédures, pour garantir que seules les personnes autorisées accèdent à vos locaux.",
      },
      {
        title: "Gestion sereine des incidents",
        description:
          "Calme, méthode et coordination : nos agents appliquent les consignes et gèrent l’urgence efficacement, avant l’arrivée des secours si nécessaire.",
      },
      {
        title: "Traçabilité & reporting complet",
        description:
          "Main courante électronique, rapports clairs et réguliers : incidents, anomalies, actions correctives et recommandations.",
      },
      {
        title: "Flexibilité & adaptabilité",
        description:
          "Horaires, missions, effectifs : un dispositif ajusté à vos besoins (24/7, renforts ponctuels, opérations sensibles, etc.).",
      },
      {
        title: "Image de marque valorisée",
        description:
          "Posture, tenue et savoir-être : une présence qui renforce votre sérieux auprès de vos clients, partenaires et équipes.",
      },
    ],
    whyUs: [
      {
        icon: "UserCheck",
        title: "Recrutement sélectif",
        description:
          "Agents titulaires de la carte professionnelle, expérience vérifiée, savoir-être exigeant. Le sérieux prime.",
      },
      {
        icon: "BookOpen",
        title: "Formation continue",
        description:
          "Remises à niveau régulières : SST, gestion de conflit, procédures site, conformité et bonnes pratiques opérationnelles.",
      },
      {
        icon: "Users",
        title: "Management de proximité",
        description:
          "Chef de secteur, contrôles qualité, coordination et ajustements : un pilotage réel, pas une simple mise à disposition.",
      },
      {
        icon: "Smartphone",
        title: "Technologie & transparence",
        description:
          "Traçabilité et reporting exploitables : rondes, événements, photos si nécessaire, synthèses et recommandations.",
      },
    ],
    method: {
      title: "Notre protocole de déploiement : rigueur et transparence",
      description:
        "Chaque mission de gardiennage est encadrée par une méthode en 4 étapes qui garantit la qualité et la fiabilité de la prestation.",
      steps: [
        {
          icon: "FileSearch",
          title: "Audit & cadrage",
          description:
            "Analyse du site, des flux et des risques pour définir des consignes précises et un plan de prévention adapté.",
        },
        {
          icon: "UserCheck",
          title: "Sélection & formation",
          description:
            "Affectation d’un agent au profil cohérent avec votre contexte, puis briefing et formation spécifique au site.",
        },
        {
          icon: "ShieldCheck",
          title: "Déploiement & suivi",
          description:
            "Mise en place du dispositif avec supervision, contrôles qualité, et suivi régulier par l’encadrement.",
        },
        {
          icon: "TrendingUp",
          title: "Évaluation & optimisation",
          description:
            "Points réguliers, analyse des rapports et ajustements du dispositif selon vos priorités et l’évolution du risque.",
        },
      ],
    },
    sectors: [
      { icon: "Building2", name: "Sièges sociaux & bureaux" },
      { icon: "Factory", name: "Sites industriels & entrepôts" },
      { icon: "HardHat", name: "Chantiers & BTP" },
      { icon: "Store", name: "Retail & centres commerciaux" },
      { icon: "Landmark", name: "Sites publics & institutionnels" },
      { icon: "Home", name: "Immobilier résidentiel" },
    ],
    faq: [
      {
        question: "Quelles sont les qualifications obligatoires pour un agent de sécurité ?",
        answer:
          "Chaque agent doit détenir une carte professionnelle CNAPS en cours de validité. Cela atteste d’une formation certifiante (CQP APS), d’un casier compatible et de l’aptitude à exercer.",
      },
      {
        question: "Pouvez-vous fournir des agents pour une mission urgente (ex : le jour même) ?",
        answer:
          "Selon nos disponibilités, nous pouvons être très réactifs. Pour une urgence, appelez-nous : nous évaluons la faisabilité et proposons une solution fiable au plus vite.",
      },
      {
        question: "Comment gérez-vous l’absence imprévue d’un agent ?",
        answer:
          "Nous disposons d’un système d’astreinte et d’un vivier d’agents polyvalents permettant de remplacer rapidement un agent malade ou absent, afin d’assurer la continuité du service.",
      },
      {
        question: "Puis-je changer d’agent si le profil ne me convient pas ?",
        answer:
          "Oui. La relation de confiance est essentielle. Si le profil ne correspond pas malgré les ajustements, nous vous proposons un remplacement.",
      },
    ],
    seo: {
      slugKeyword: "agent de sécurité qualifié",
      secondaryKeywords: [
        "agent APS",
        "gardiennage entreprise",
        "surveillance de site Île-de-France",
        "contrôle d’accès sécurité",
        "agent de sécurité 24/7",
      ],
      metaTitle:
        "Agent de sécurité qualifié (APS) en Île-de-France | Basic Protection",
      metaDescription:
        "Agent APS pour gardiennage, contrôle d’accès, rondes et prévention malveillance. Dispositif cadré, encadré et traçable. Intervention 75, 78, 92, 93, 94, 95, 77, 91.",
      h1: "Agent de Sécurité Qualifié (APS) en Île-de-France",
    },
    page: {
      lead:
        "Un agent de sécurité qualifié (APS) n’est pas “une présence”. C’est un dispositif humain structuré, capable de dissuader, contrôler, prévenir et gérer les incidents avec méthode. Notre approche combine recrutement sélectif, consignes de poste claires, supervision opérationnelle et reporting exploitable.",
      sections: [
        {
          id: makeSectionId("aps", "intro"),
          title: "Agent APS : le socle d’une sécurité efficace (et mesurable)",
          paragraphs: [
            "Dans la majorité des environnements professionnels, la différence se fait grâce à l’humain : un agent APS bien encadré anticipe, observe, dissuade et réagit.",
            "La qualité dépend rarement du “nombre d’heures” ; elle dépend surtout de l’organisation : briefing, consignes, contrôle qualité, traçabilité et supervision.",
          ],
          note:
            "Point clé : une prestation de gardiennage réussie doit être auditée, cadrée, suivie et documentée.",
          internalLinks: [
            { label: "Renforcer la dissuasion : agent cynophile", href: ensureInternalHref("/services/agent-cynophile") },
            { label: "Multi-sites & alarmes : rondier intervenant", href: ensureInternalHref("/services/agent-rondier") },
          ],
        },
        // ... conserve tes autres sections APS (pas besoin de les réécrire ici)
      ],
      faqLong: [
        {
          question: "Quelle est la différence entre un agent APS et un agent rondier intervenant ?",
          answer:
            "L’agent APS est généralement posté (présence continue sur un site). Le rondier intervient sur plusieurs sites : rondes planifiées, passages aléatoires et levées de doute sur alarme.",
        },
      ],
      relatedServices: [
        "agent-rondier",
        "agent-cynophile",
        "agent-incendie-ssiap",
        "audit-conseil-surete",
      ],
    },
  },

  /** ✅ Cynophile (inchangé sur le fond, mais on retire toute référence à protection rapprochée ailleurs) */
  {
    slug: "agent-cynophile",
    icon: "PawPrint",
    title: "Agent Cynophile (Maître-chien)",
    shortDescription:
      "Le binôme homme-chien pour une détection et une dissuasion renforcées.",
    description:
      "L’agent de sécurité cynophile, ou maître-chien, offre une capacité de détection et de dissuasion inégalée. Le flair et l’ouïe du chien, combinés à l’expertise de l’agent, en font une solution idéale pour la surveillance de larges périmètres, chantiers, ou sites sensibles.",
    keywords: [
      "agent cynophile",
      "maître-chien",
      "sécurité canine",
      "surveillance chien",
      "gardiennage chantier",
      "sécurité périmètre",
      "ronde cynophile",
    ],
    heroImageId: ensureHero("service-agent-cyno"),
    benefits: [
      { title: "Dissuasion maximale", description: "La présence du chien a un effet psychologique très dissuasif sur les intrus potentiels." },
      { title: "Capacités de détection accrues", description: "Le chien détecte des présences, bruits ou odeurs bien avant l’homme, renforçant la prévention." },
      { title: "Intervention rapide", description: "Le binôme couvre efficacement une large zone et peut intervenir rapidement selon le protocole défini." },
      { title: "Idéal pour les grands espaces", description: "Parfait pour parkings, entrepôts, chantiers, zones isolées et périmètres ouverts." },
      { title: "Sécurité de l’agent", description: "Le chien renforce la protection du maître lors des interventions et contribue au contrôle de situation." },
      { title: "Polyvalence", description: "Efficace de jour comme de nuit, et dans des conditions météorologiques difficiles." },
    ],
    method: {
      title: "L’intervention du binôme cynophile",
      description: "Une synergie parfaite entre l’homme et l’animal pour votre sécurité.",
      steps: [
        { icon: "Map", title: "Analyse du périmètre", description: "Définition des zones de patrouille, points sensibles et contraintes d’accès." },
        { icon: "PawPrint", title: "Adaptation du binôme", description: "Sélection d’un binôme cohérent avec la configuration (intérieur/extérieur) et la mission." },
        { icon: "ShieldCheck", title: "Rondes & surveillance", description: "Rondes planifiées ou aléatoires, présence dissuasive et détection précoce." },
        { icon: "AlertTriangle", title: "Procédure d’intervention", description: "En cas de détection : application du protocole, mise en sécurité, alerte et compte rendu." },
      ],
    },
    sectors: [
      { icon: "HardHat", name: "Chantiers & BTP" },
      { icon: "Factory", name: "Sites industriels" },
      { icon: "Warehouse", name: "Zones de stockage & plateformes" },
      { icon: "CalendarDays", name: "Événements en extérieur" },
    ],
    faq: [
      {
        question: "Les chiens sont-ils dangereux ?",
        answer:
          "Nos chiens sont entraînés, socialisés et obéissants. Ils restent sous contrôle permanent et n’interviennent que sur ordre ou en légitime défense. L’objectif est d’abord la dissuasion et la prévention.",
      },
      {
        question: "Un agent cynophile peut-il travailler à l’intérieur ?",
        answer:
          "Oui, selon la configuration et la mission. Ils sont très efficaces pour la surveillance d’entrepôts, bâtiments vides la nuit, ou zones techniques.",
      },
    ],
    seo: {
      slugKeyword: "agent cynophile",
      secondaryKeywords: [
        "maître-chien sécurité",
        "rondes cynophiles",
        "gardiennage chantier Île-de-France",
        "sécurité périmètre",
      ],
      metaTitle: "Agent cynophile (maître-chien) en Île-de-France | Basic Protection",
      metaDescription:
        "Rondes cynophiles, dissuasion renforcée, surveillance de périmètres, levée de doute selon protocole. Binôme homme-chien encadré. Intervention 75, 78, 92, 93, 94, 95, 77, 91.",
      h1: "Agent Cynophile (Maître-chien) en Île-de-France",
    },
    page: {
      lead:
        "L’agent cynophile (maître-chien) est la solution de dissuasion la plus forte en sécurité privée : présence humaine + capacité de détection du chien. Sur chantiers, grands périmètres, sites isolés ou zones sensibles, le binôme anticipe les intrusions et sécurise avec méthode.",
      sections: [
        {
          id: makeSectionId("cyno", "intro"),
          title: "Pourquoi le cynophile est le service le plus dissuasif",
          paragraphs: [
            "Le simple fait de voir un binôme homme-chien augmente immédiatement la perception du risque chez un intrus potentiel.",
            "La détection du chien donne une avance décisive : bruit, mouvement, odeur, présence cachée.",
          ],
          internalLinks: [
            { label: "Sécuriser un site fixe : agent APS", href: ensureInternalHref("/services/agent-securite-qualifie") },
            { label: "Multi-sites & alarmes : agent rondier", href: ensureInternalHref("/services/agent-rondier") },
          ],
        },
        // ... garde tes sections cynophile existantes
      ],
      relatedServices: [
        "agent-securite-qualifie",
        "agent-rondier",
        "audit-conseil-surete",
        "securite-evenementielle",
      ],
    },
  },

  /** ✅ SSIAP (idem) */
  {
    slug: "agent-incendie-ssiap",
    icon: "Flame",
    title: "Agent de Sécurité Incendie (SSIAP)",
    shortDescription:
      "Prévention et intervention contre les risques incendie (SSIAP 1, 2, 3).",
    description:
      "Nos agents SSIAP veillent à la prévention du risque incendie dans les ERP et IGH. Ils assurent la gestion des alarmes, les rondes de prévention, et l’assistance à personnes en cas d’incident.",
    keywords: ["agent SSIAP", "sécurité incendie", "prévention incendie", "SSIAP 1", "SSIAP 2", "SSIAP 3", "ERP", "IGH"],
    heroImageId: ensureHero("service-agent-ssiap"),
    benefits: [
      { title: "Conformité réglementaire", description: "Assurez la conformité de votre établissement avec les obligations de sécurité incendie." },
      { title: "Prévention active", description: "Rondes techniques, vérifications, surveillance des issues et prévention des anomalies." },
      { title: "Gestion d’urgence", description: "Levée de doute, gestion des alarmes, alerte et premières mesures conservatoires." },
      { title: "Assistance à personnes", description: "Gestion de l’évacuation et assistance aux personnes à mobilité réduite (selon protocole)." },
      { title: "Interlocuteur des secours", description: "Accueil et guidage des secours pour une intervention plus rapide et plus efficace." },
      { title: "Culture sécurité", description: "Participation à la sensibilisation et au respect des consignes sur site." },
    ],
    method: {
      title: "Notre expertise en sécurité incendie",
      description: "Une mission vitale encadrée par des procédures strictes.",
      steps: [
        { icon: "FileText", title: "Analyse du site", description: "Étude de votre SSI et des contraintes ERP/IGH, flux, zones techniques et accès." },
        { icon: "UserCheck", title: "Affectation qualifiée", description: "Déploiement d’agents SSIAP 1/2/3 selon exigences réglementaires et organisationnelles." },
        { icon: "BookOpen", title: "Registre & traçabilité", description: "Tenue du registre, suivi des vérifications, événements et actions correctives." },
        { icon: "Bell", title: "Alarmes & procédures", description: "Gestion des alarmes, levée de doute, coordination évacuation, et interface secours." },
      ],
    },
    sectors: [
      { icon: "Store", name: "Centres commerciaux (ERP)" },
      { icon: "Building", name: "Immeubles de bureaux (IGH)" },
      { icon: "Hotel", name: "Hôtels & établissements recevant du public" },
      { icon: "Clapperboard", name: "Salles de spectacle & événementiel" },
    ],
    faq: [
      {
        question: "Quelle différence entre SSIAP 1, 2 et 3 ?",
        answer:
          "SSIAP 1 : agent incendie. SSIAP 2 : chef d’équipe. SSIAP 3 : chef de service (conseil, organisation, management). Le niveau dépend du type d’établissement et de la réglementation applicable.",
      },
      {
        question: "Un agent SSIAP est-il aussi un agent de sûreté ?",
        answer:
          "Ce sont deux spécialités différentes. La mission principale du SSIAP est la prévention incendie et l’assistance à personnes. Selon l’organisation du site, il peut participer à la sécurité générale, mais ne remplace pas un dispositif APS dédié à la sûreté.",
      },
    ],
    seo: {
      slugKeyword: "agent SSIAP",
      secondaryKeywords: ["sécurité incendie ERP", "sécurité incendie IGH", "SSIAP 1 2 3", "prévention incendie Île-de-France"],
      metaTitle: "Agent SSIAP (sécurité incendie) en Île-de-France | Basic Protection",
      metaDescription:
        "Agents SSIAP 1/2/3 pour ERP/IGH : rondes, prévention, gestion alarmes, assistance à personnes, registre et procédures. Intervention 75, 78, 92, 93, 94, 95, 77, 91.",
      h1: "Agent de Sécurité Incendie (SSIAP) en Île-de-France",
    },
    page: {
      lead:
        "La sécurité incendie n’est pas une option : c’est une obligation réglementaire (ERP / IGH) et un enjeu vital. Nos agents SSIAP assurent prévention, surveillance, gestion des alarmes, assistance et coordination.",
      sections: [
        {
          id: makeSectionId("ssiap", "intro"),
          title: "SSIAP : prévenir, protéger, réagir — dans un cadre réglementé",
          paragraphs: [
            "Sur un ERP ou un IGH, la sécurité incendie n’est pas seulement “une présence” : c’est une organisation, des procédures et une traçabilité.",
          ],
          internalLinks: [
            { label: "Sûreté & contrôle d’accès : agent APS", href: ensureInternalHref("/services/agent-securite-qualifie") },
            { label: "Sécurité événementielle", href: ensureInternalHref("/services/securite-evenementielle") },
          ],
        },
        // ... garde tes sections SSIAP existantes
      ],
      relatedServices: ["agent-securite-qualifie", "securite-evenementielle", "audit-conseil-surete"],
    },
  },

  /** ✅ Rondier */
  {
    slug: "agent-rondier",
    icon: "Radio",
    title: "Agent Rondier Intervenant",
    shortDescription:
      "Rondes de surveillance et interventions sur alarme pour une sécurité active 24/7.",
    description:
      "L’agent rondier effectue des rondes de surveillance à horaires variables ou fixes pour prévenir les intrusions et anomalies sur vos sites. En cas d’alarme, il intervient pour effectuer la levée de doute et prendre les mesures conservatoires nécessaires.",
    keywords: ["rondier", "intervention sur alarme", "ronde de sécurité", "levée de doute", "sécurité mobile", "rondes 24/7"],
    heroImageId: ensureHero("service-agent-rondier"),
    benefits: [
      { title: "Sécurité active 24/7", description: "Couverture de vos sites hors horaires d’ouverture, avec passages planifiés ou aléatoires." },
      { title: "Levée de doute rapide", description: "Intervention immédiate pour vérifier la nature d’une alarme et agir selon consignes." },
      { title: "Effet dissuasif", description: "Passages à horaires variables qui perturbent le repérage et découragent les tentatives." },
      { title: "Rapports détaillés", description: "Traçabilité des rondes et rapports d’intervention précis, avec éléments factuels." },
      { title: "Maîtrise des coûts", description: "Alternative optimisée à une présence postée permanente pour certains types de sites." },
      { title: "Tranquillité d’esprit", description: "Un professionnel prêt à intervenir à tout moment selon votre protocole." },
    ],
    method: {
      title: "Notre service de rondes et interventions",
      description: "La mobilité et la réactivité au service de votre tranquillité.",
      steps: [
        { icon: "Map", title: "Planification des rondes", description: "Itinéraires, points de contrôle, fréquences, horaires fixes ou variables." },
        { icon: "KeyRound", title: "Gestion des accès", description: "Procédure sécurisée pour clés / accès selon votre organisation." },
        { icon: "AlarmClock", title: "Intervention sur alarme", description: "Arrivée sur site, levée de doute et actions conservatoires." },
        { icon: "ShieldCheck", title: "Sécurisation & rapport", description: "Application des consignes, coordination si besoin, puis compte rendu détaillé." },
      ],
    },
    sectors: [
      { icon: "Building2", name: "Zones d’activités" },
      { icon: "Factory", name: "Sites industriels & entrepôts" },
      { icon: "HardHat", name: "Chantiers en construction" },
      { icon: "Store", name: "Parcs commerciaux" },
    ],
    faq: [
      {
        question: "Que se passe-t-il si une intrusion est confirmée ?",
        answer:
          "L’agent applique les consignes définies : sécurisation, alerte des forces de l’ordre, communication des informations utiles et mise en place d’un périmètre si nécessaire.",
      },
      {
        question: "Comment suivez-vous les rondes ?",
        answer:
          "Nous utilisons des systèmes de traçabilité permettant d’horodater les passages aux points de contrôle et de produire des rapports réguliers.",
      },
    ],
    seo: {
      slugKeyword: "agent rondier intervenant",
      secondaryKeywords: ["intervention sur alarme", "levée de doute", "rondes de sécurité Île-de-France", "sécurité mobile"],
      metaTitle: "Agent rondier intervenant & levée de doute en Île-de-France | Basic Protection",
      metaDescription:
        "Rondes de surveillance, interventions sur alarme, levée de doute, sécurisation et reporting. Dispositif réactif multi-sites. Intervention 75, 78, 92, 93, 94, 95, 77, 91.",
      h1: "Agent Rondier Intervenant en Île-de-France",
    },
    page: {
      lead:
        "Le rondier intervenant sécurise un ou plusieurs sites sans immobiliser un agent posté. Rondes planifiées ou aléatoires, levées de doute sur alarme, sécurisation temporaire et reporting factuel : vous gagnez en dissuasion, en réactivité et en maîtrise des coûts.",
      sections: [
        {
          id: makeSectionId("rondier", "intro"),
          title: "Rondier intervenant : sécurité mobile, dissuasion et réaction rapide",
          paragraphs: [
            "Un dispositif sérieux se construit : points de passage, fréquences, gestion des clés et accès, protocoles d’intervention, escalade, et surtout traçabilité.",
          ],
          internalLinks: [
            { label: "Présence fixe & contrôle d’accès : agent APS", href: ensureInternalHref("/services/agent-securite-qualifie") },
            { label: "Dissuasion grands périmètres : agent cynophile", href: ensureInternalHref("/services/agent-cynophile") },
          ],
        },
      ],
      relatedServices: ["agent-securite-qualifie", "agent-cynophile", "audit-conseil-surete"],
    },
  },

  {
    slug: "protection-rapprochee",
    icon: "UserCheck",
    title: "Protection Rapprochée",
    shortDescription:
      "Sécurité sur-mesure pour dirigeants, personnalités et familles. Discrétion, anticipation et maîtrise.",
    description:
      "Notre service de protection rapprochée (garde du corps) assure la sécurité des personnes exposées à des risques particuliers. Nous concevons des dispositifs sur-mesure, alliant discrétion absolue, analyse des menaces, et une présence rassurante mais non intrusive.",
    keywords: [
      "protection rapprochée",
      "garde du corps",
      "sécurité VIP",
      "protection de personnalités",
      "APR",
      "sécurité dirigeant",
    ],
    heroImageId: ensureHero("service-protection-rapprochee"),
    benefits: [
      { title: "Discrétion Absolue", description: "Une présence qui protège sans jamais s’imposer ni altérer votre quotidien." },
      { title: "Anticipation des Risques", description: "Analyse des menaces, reconnaissance des lieux, et planification des itinéraires pour prévenir les incidents." },
      { title: "Gestion de Crise", description: "Protocoles d’extraction, communication sécurisée et coordination avec les autorités en cas d’urgence." },
      { title: "Adaptabilité Totale", description: "Un dispositif flexible qui s’ajuste à vos déplacements, à votre agenda et au niveau de menace." },
      { title: "Sérénité d’Esprit", description: "Libérez-vous des contraintes de sécurité pour vous concentrer sur vos objectifs." },
      { title: "Confidentialité Garantie", description: "Engagement contractuel et déontologique de confidentialité sur toutes les informations partagées." },
    ],
    method: {
      title: "Notre Protocole de Protection",
      description: "Une méthodologie rigoureuse pour une sécurité sans faille.",
      steps: [
        { icon: "ShieldAlert", title: "1. Audit de Risques", description: "Évaluation de la menace, analyse de votre environnement et de vos habitudes de vie." },
        { icon: "Route", title: "2. Planification", description: "Conception du dispositif, planification des itinéraires, et définition des procédures d'urgence." },
        { icon: "UserCheck", title: "3. Déploiement", description: "Mise en place de l’équipe de protection, briefings quotidiens et adaptation constante." },
        { icon: "BarChart", title: "4. Reporting & Débriefing", description: "Rapports d'activité discrets et débriefings réguliers pour ajuster et améliorer le dispositif en continu." },
      ],
    },
    sectors: [
      { icon: "Briefcase", name: "Dirigeants & Cadres" },
      { icon: "Users", name: "Personnalités Publiques" },
      { icon: "Gem", name: "Clients Fortunés (UHNWI)" },
      { icon: "Plane", name: "Délégations & Voyages" },
    ],
    faq: [
      { question: "Un garde du corps est-il armé ?", answer: "L'emport d'arme est très réglementé en France et réservé à des cas spécifiques après autorisation préfectorale. La plupart des missions se font sans arme, en privilégiant l'anticipation et la dissuasion." },
      { question: "Comment garantissez-vous la discrétion ?", answer: "Nos agents sont formés aux codes du savoir-vivre, adaptent leur tenue et leur posture au contexte. La confidentialité est notre priorité absolue, garantie par contrat." },
      { question: "Le dispositif est-il actif 24/7 ?", answer: "Absolument. Nous pouvons mettre en place des équipes qui se relaient pour assurer une protection continue, de jour comme de nuit, en France ou à l'étranger." },
    ],
    seo: {
      slugKeyword: "protection rapprochée",
      secondaryKeywords: ["garde du corps", "sécurité VIP", "protection dirigeant", "APR"],
      metaTitle: "Protection rapprochée (garde du corps) en Île-de-France | Basic Protection",
      metaDescription: "Service de protection rapprochée pour dirigeants, personnalités et familles. Discrétion, anticipation et gestion de crise. Devis confidentiel.",
      h1: "Protection Rapprochée & Garde du Corps"
    },
    page: {}
  },

  /** ✅ Sécurité événementielle : on retire les liens vers protection rapprochée */
  {
    slug: "securite-evenementielle",
    icon: "CalendarDays",
    title: "Sécurité Événementielle de Prestige",
    shortDescription:
      "Sécurisation de lancements, galas, défilés et événements privés de haut standing.",
    description:
      "Nous concevons et mettons en œuvre des dispositifs de sécurité pour les événements les plus exigeants. De l’accueil à la gestion des flux, en passant par le contrôle d’accès et la prévention, nous assurons le bon déroulement de votre événement en toute sérénité.",
    keywords: [
      "sécurité événementielle",
      "contrôle d'accès événement",
      "gestion des flux",
      "sécurité gala",
      "accès VIP",
      "filtrage événementiel",
    ],
    heroImageId: ensureHero("service-evenementiel"),
    benefits: [
      { title: "Image de marque préservée", description: "Agents au savoir-être irréprochable, posture premium, accueil maîtrisé." },
      { title: "Gestion des flux optimisée", description: "Accès fluides, files maîtrisées, circulation des invités, zones VIP." },
      { title: "Prévention active", description: "Dissuasion et gestion des tensions avant qu’elles ne montent." },
      { title: "Coordination efficace", description: "Un responsable dispositif pour une communication simple et claire." },
      { title: "Accréditations & zones sensibles", description: "Contrôle rigoureux des accès : VIP, staff, technique." },
      { title: "Réactivité", description: "Ajustements en temps réel selon le terrain (météo, affluence, timing)." },
    ],
    method: {
      title: "Notre approche de la sécurité événementielle",
      description: "Chaque événement est unique, notre dispositif l’est aussi.",
      steps: [
        { icon: "MessageCircle", title: "Analyse du site", description: "Repérage des lieux, accès, zones sensibles, flux attendus et contraintes." },
        { icon: "FileText", title: "Plan de sécurité", description: "Effectifs, postes, consignes, accréditations, coordination." },
        { icon: "ShieldCheck", title: "Déploiement & briefing", description: "Mise en place, briefings, tests, et ajustements avant ouverture." },
        { icon: "ThumbsUp", title: "Exécution & reporting", description: "Supervision active, incidents gérés, puis retour d’expérience documenté." },
      ],
    },
    sectors: [
      { icon: "ShoppingCart", name: "Luxe & mode" },
      { icon: "Gem", name: "Lancements de produits" },
      { icon: "Building", name: "Événements corporate" },
      { icon: "Users", name: "Soirées privées" },
    ],
    faq: [
      {
        question: "Combien d’agents faut-il pour mon événement ?",
        answer:
          "Le dimensionnement dépend de la jauge, du lieu, du public, des accès, des zones VIP et du niveau de risque. Une analyse préalable permet de définir un dispositif précis.",
      },
      {
        question: "Proposez-vous des palpations de sécurité ?",
        answer:
          "Oui si le cadre légal, le lieu et la nature de l’événement le justifient. Elles sont effectuées par des agents de même sexe, dans le respect de la loi.",
      },
    ],
    seo: {
      slugKeyword: "sécurité événementielle",
      secondaryKeywords: ["sécurité gala", "contrôle d’accès VIP", "gestion des flux événement", "sécurité défilé", "sécurité corporate"],
      metaTitle: "Sécurité événementielle de prestige en Île-de-France | Basic Protection",
      metaDescription:
        "Dispositif événementiel premium : plan de sécurité, filtrage, accréditations, zones VIP, gestion des flux, supervision. Intervention 75, 78, 92, 93, 94, 95, 77, 91.",
      h1: "Sécurité Événementielle de Prestige en Île-de-France",
    },
    page: {
      lead:
        "Un événement premium exige une sécurité fluide, discrète et structurée. Filtrage, accréditations, gestion des flux, zones VIP et supervision : l’objectif est de sécuriser sans durcir.",
      sections: [
        {
          id: makeSectionId("event", "intro"),
          title: "Sécurité événementielle : protéger l’expérience autant que le lieu",
          paragraphs: [
            "Un dispositif premium se juge à la fluidité (accueil, files, circulation) et à la maîtrise (filtrage, zones sensibles, gestion des tensions).",
          ],
          internalLinks: [
            { label: "Conformité incendie : agents SSIAP", href: ensureInternalHref("/services/agent-incendie-ssiap") },
            { label: "Sûreté & contrôle d’accès : agent APS", href: ensureInternalHref("/services/agent-securite-qualifie") },
          ],
        },
      ],
      // ✅ protection-rapprochee retiré
      relatedServices: ["agent-incendie-ssiap", "agent-securite-qualifie", "audit-conseil-surete"],
    },
  },

  /** ✅ Audit & Conseil */
  {
    slug: "audit-conseil-surete",
    icon: "FileSearch",
    title: "Audit & Conseil en Sûreté",
    shortDescription:
      "Analyse de risques et conception de plans de sécurité intégrés et performants.",
    description:
      "Nous analysons vos infrastructures, procédures et technologies pour identifier les failles et proposer des solutions globales. Objectif : transformer vos dépenses de sécurité en investissement stratégique, avec un plan d’action priorisé.",
    keywords: [
      "audit de sûreté",
      "conseil en sécurité",
      "plan de sécurité",
      "analyse de risques",
      "ingénierie sûreté",
      "cartographie des risques",
    ],
    heroImageId: ensureHero("service-audit-conseil"),
    benefits: [
      { title: "Vision à 360°", description: "Analyse humain, technique et organisationnel : une lecture globale du risque." },
      { title: "Recommandations pragmatiques", description: "Solutions concrètes, priorisées et chiffrées pour décider vite." },
      { title: "Indépendance & objectivité", description: "Recommandations basées sur vos besoins, sans biais fournisseur." },
      { title: "Conformité", description: "Vérification des obligations et réduction des risques réglementaires." },
      { title: "Optimisation des coûts", description: "Suppression des redondances, arbitrages efficaces, budget maîtrisé." },
      { title: "Accompagnement", description: "Aide cahier des charges, consultation, choix et pilotage de mise en œuvre." },
    ],
    method: {
      title: "Notre méthodologie d’audit",
      description: "De l’analyse à l’action, un processus rigoureux pour renforcer votre sûreté.",
      steps: [
        { icon: "MessageCircle", title: "Phase d’immersion", description: "Entretiens, visites de sites, analyse documentaire (plans, procédures, incidents)." },
        { icon: "FileText", title: "Analyse & identification", description: "Cartographie risques, vulnérabilités, scénarios, priorisation." },
        { icon: "ShieldCheck", title: "Rapport & préconisations", description: "Plan d’action chiffré, quick wins, trajectoire et niveaux de priorité." },
        { icon: "ThumbsUp", title: "Accompagnement", description: "Aide à la mise en œuvre, suivi, et mesure de l’efficacité." },
      ],
    },
    sectors: [
      { icon: "Building", name: "Sièges sociaux (ETI / grands comptes)" },
      { icon: "Factory", name: "Sites industriels & sensibles" },
      { icon: "Hospital", name: "Établissements de santé" },
      { icon: "School", name: "Campus & sites critiques" },
    ],
    faq: [
      {
        question: "Pourquoi réaliser un audit de sûreté ?",
        answer:
          "Un audit offre un état des lieux objectif : failles, priorités et arbitrages. Il permet d’optimiser le budget, d’améliorer la sécurité réelle et de mieux préparer l’évolution des menaces et obligations.",
      },
      {
        question: "Votre cabinet est-il indépendant ?",
        answer:
          "Oui. Notre pôle conseil est indépendant des fournisseurs, afin de garantir des recommandations objectives.",
      },
    ],
    seo: {
      slugKeyword: "audit de sûreté",
      secondaryKeywords: ["conseil sûreté", "analyse de risques", "plan de sécurité", "cartographie des risques", "optimisation budget sécurité"],
      metaTitle: "Audit & conseil en sûreté en Île-de-France | Basic Protection",
      metaDescription:
        "Audit sûreté 360° : cartographie des risques, vulnérabilités, plan d’action chiffré, quick wins et accompagnement. Optimisez votre budget. Intervention 75, 78, 92, 93, 94, 95, 77, 91.",
      h1: "Audit & Conseil en Sûreté en Île-de-France",
    },
    page: {
      lead:
        "Avant d’ajouter des agents, des caméras ou une alarme, il faut savoir où sont les vrais risques — et comment les réduire sans surcoûts. Notre audit transforme une sécurité “ressentie” en sécurité pilotée.",
      sections: [
        {
          id: makeSectionId("audit", "intro"),
          title: "Audit sûreté : voir clair, décider juste, sécuriser mieux",
          paragraphs: [
            "Un audit permet de cartographier précisément les risques, les points faibles et les priorités, puis de transformer l’analyse en plan d’action concret.",
          ],
          internalLinks: [
            { label: "Agent APS (poste fixe)", href: ensureInternalHref("/services/agent-securite-qualifie") },
            { label: "Rondier (multi-sites)", href: ensureInternalHref("/services/agent-rondier") },
          ],
        },
      ],
      relatedServices: ["agent-securite-qualifie", "agent-rondier", "securite-evenementielle", "agent-cynophile"],
    },
  },
] as const;
