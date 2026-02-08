// src/lib/sector-data.ts
import { servicesData, type Service } from "@/lib/services-data";

export type SectorDef = {
  slug: string;
  icon: string; // Lucide icon name (string) resolved via getLucideIcon
  name: string;

  metaTitle: string;
  metaDescription: string;

  heroImageId: string;
  heroTitle: string;
  heroDescription: string;

  intro: {
    title: string;
    paragraph: string;
  };

  issuesTitle?: string;
  issues: { icon: string; title: string; description: string }[];

  missionsTitle?: string;
  missions: { icon: string; title: string; description: string }[];

  relatedServices: string[]; // slugs from servicesData

  useCases: { title: string; description: string }[];

  method: {
    title: string;
    description: string;
    steps: { icon: string; title: string; description: string }[];
  };

  whyUs: { icon: string; title: string; description: string }[];

  faq: { question: string; answer: string }[];
};

/* ---------------- Common blocks (cohérence + SEO) ---------------- */

const commonWhyUs: SectorDef["whyUs"] = [
  {
    icon: "Award",
    title: "Conformité & réglementation",
    description:
      "Agents qualifiés, encadrement opérationnel et cadre légal respecté (procédures, consignes, traçabilité).",
  },
  {
    icon: "ClipboardCheck",
    title: "Cadrage & consignes claires",
    description:
      "Objectifs, périmètre, accès, horaires, points sensibles : une mission définie avant le terrain.",
  },
  {
    icon: "Users",
    title: "Supervision & contrôle qualité",
    description:
      "Management de proximité, contrôles, remontées terrain et ajustements : priorité à la continuité de service.",
  },
  {
    icon: "FileText",
    title: "Reporting & transparence",
    description:
      "Main courante, rapports d’événements et synthèses exploitables pour piloter efficacement votre sûreté.",
  },
];

const commonMethod: SectorDef["method"] = {
  title: "Notre méthode : claire, structurée, maîtrisée",
  description:
    "Une approche concrète, du diagnostic à la supervision, pour une sécurité efficace et mesurable.",
  steps: [
    {
      icon: "FileSearch",
      title: "1) Analyse du site et des risques",
      description:
        "Flux, accès, zones sensibles, horaires réels, public, historique d’incidents : on cartographie avant d’agir.",
    },
    {
      icon: "ShieldCheck",
      title: "2) Définition du dispositif",
      description:
        "Postes, rondes, filtrage, procédures, coordination : un plan proportionné, évolutif et cohérent avec votre image.",
    },
    {
      icon: "Users",
      title: "3) Déploiement & pilotage",
      description:
        "Briefing, consignes écrites, communication terrain, supervision : exécution stable et lisible pour vos équipes.",
    },
    {
      icon: "TrendingUp",
      title: "4) Suivi qualité & ajustements",
      description:
        "Traçabilité, rapports, indicateurs et améliorations continues selon l’évolution de votre activité.",
    },
  ],
};

/* ---------------- Sectors (version haut niveau) ---------------- */

export const sectorsData: SectorDef[] = [
  /* =======================================================================
   * 1) SIÈGES SOCIAUX & BUREAUX
   * ======================================================================= */
  {
    slug: "sieges-sociaux-bureaux",
    icon: "Building2",
    name: "Sièges sociaux & bureaux",

    metaTitle:
      "Sécurité sièges sociaux & bureaux en Île-de-France | Contrôle d’accès, rondes & reporting",
    metaDescription:
      "Sécurité privée pour bureaux et sièges sociaux : accueil filtrant, contrôle d’accès, rondes, levées de doute, main courante et reporting. Intervention en Île-de-France (Paris, 92, 93, 94, 95…).",

    heroImageId: "zone-hauts-de-seine",
    heroTitle: "Sécurité des sièges sociaux & bureaux",
    heroDescription:
      "Une sécurité discrète, fluide et pilotée : contrôle d’accès, gestion visiteurs, rondes ciblées et traçabilité, sans perturber l’activité.",

    intro: {
      title: "Protéger votre image, vos équipes et votre continuité d’activité.",
      paragraph:
        "En environnement tertiaire, la sécurité doit rassurer sans rigidifier. L’agent est souvent le premier contact : posture, communication, gestion des visiteurs et respect des procédures comptent autant que la vigilance. Nous mettons en place un dispositif structuré (consignes écrites, filtrage, rondes, main courante, reporting) pour sécuriser efficacement, avec un niveau de confidentialité adapté aux zones sensibles.",
    },

    issuesTitle: "Enjeux fréquents en environnement tertiaire",
    issues: [
      {
        icon: "Award",
        title: "Image de marque & qualité d’accueil",
        description:
          "Tenue, posture, langage : une présence professionnelle qui renforce la confiance dès l’entrée.",
      },
      {
        icon: "Users",
        title: "Gestion des flux (salariés, visiteurs, prestataires)",
        description:
          "Pointes horaires, livraisons, interventions techniques : procédures claires pour éviter les accès non autorisés.",
      },
      {
        icon: "Lock",
        title: "Confidentialité & zones restreintes",
        description:
          "Contrôle des habilitations, badges, accompagnement : sécuriser sans créer de friction interne.",
      },
      {
        icon: "Activity",
        title: "Prévention des incidents & continuité",
        description:
          "Intrusion, conflit, alarme : consignes et réflexes pour limiter l’impact sur vos opérations.",
      },
    ],

    missionsTitle: "Missions types (bureaux, sièges, immeubles tertiaires)",
    missions: [
      {
        icon: "Fingerprint",
        title: "Contrôle d’accès & accueil filtrant",
        description:
          "Registre visiteurs, vérification des autorisations, badges, orientation et gestion des zones restreintes.",
      },
      {
        icon: "Radio",
        title: "Rondes & surveillance ciblée",
        description:
          "Rondes intérieures/extérieures, vérification points sensibles, fermeture des accès, prévention des intrusions.",
      },
      {
        icon: "AlertTriangle",
        title: "Levée de doute & gestion d’incident",
        description:
          "Application des consignes, coordination avec vos référents, et compte-rendu circonstancié.",
      },
      {
        icon: "FileText",
        title: "Main courante & reporting",
        description:
          "Traçabilité des événements et synthèses exploitables (quotidien/hebdo/mensuel) pour piloter.",
      },
    ],

    relatedServices: [
      "agent-securite-qualifie",
      "agent-rondier",
      "agent-incendie-ssiap",
      "audit-conseil-surete",
    ],

    useCases: [
      {
        title: "Siège social (La Défense / 92)",
        description:
          "Accueil multi-entrées, gestion des flux employés/visiteurs, rondes en horaires étendus et reporting quotidien.",
      },
      {
        title: "Immeuble multi-entreprises",
        description:
          "Contrôle d’accès mutualisé, coordination syndic/gestionnaire, gestion prestataires, rondes week-end et nuits.",
      },
      {
        title: "Bureaux directionnels & zones sensibles",
        description:
          "Procédures d’accès strictes, confidentialité renforcée, consignes spécifiques et traçabilité des passages.",
      },
    ],

    method: commonMethod,
    whyUs: commonWhyUs,

    faq: [
      {
        question: "Pouvez-vous déployer rapidement un dispositif en bureaux ?",
        answer:
          "Oui. Un dispositif peut démarrer rapidement (poste/ronde), puis être stabilisé après cadrage (flux, zones, horaires, risques) avec consignes écrites.",
      },
      {
        question: "Faites-vous du reporting régulier ?",
        answer:
          "Oui. Main courante, rapports d’événements et synthèses selon la fréquence souhaitée (quotidienne, hebdomadaire, mensuelle).",
      },
      {
        question: "Vos agents sont-ils formés aux environnements corporate ?",
        answer:
          "Oui. Présentation, communication, discrétion et filtrage courtois sont intégrés à notre sélection et à l’encadrement terrain.",
      },
    ],
  },

  /* =======================================================================
   * 2) LUXE, RETAIL & HÔTELLERIE
   * ======================================================================= */
  {
    slug: "luxe-retail-hotellerie",
    icon: "Store",
    name: "Luxe, retail & hôtellerie",

    metaTitle:
      "Sécurité luxe, retail & hôtellerie en Île-de-France | Agents discrets, prévention des pertes",
    metaDescription:
      "Sécurité privée pour boutiques premium et hôtels : prévention des pertes, filtrage discret, gestion d’incidents, protection des clients. Agents à excellente présentation en Île-de-France.",

    heroImageId: "service-evenementiel",
    heroTitle: "Sécurité luxe, retail & hôtellerie",
    heroDescription:
      "Protéger vos clients et vos actifs sans nuire à l’expérience : une sécurité discrète, élégante et maîtrisée.",

    intro: {
      title: "Une sécurité à la hauteur de votre marque.",
      paragraph:
        "Dans le luxe et l’hospitality, la sécurité doit protéger sans s’imposer. Le bon dispositif combine prévention des pertes, vigilance, gestion des flux et sens du service. Nos agents sont sélectionnés pour leur posture, leur communication et leur capacité à intervenir avec calme et précision, dans le respect de votre image et de votre clientèle.",
    },

    issuesTitle: "Enjeux clés en boutique et hôtellerie",
    issues: [
      {
        icon: "Gem",
        title: "Protection d’actifs de valeur",
        description:
          "Produits haut de gamme, stocks sensibles : prévention des vols opportunistes et des repérages.",
      },
      {
        icon: "Users",
        title: "Expérience client & fluidité",
        description:
          "Accueil et filtrage : rassurer sans créer de tension, préserver l’atmosphère du lieu.",
      },
      {
        icon: "ShieldCheck",
        title: "Gestion d’incidents avec maîtrise",
        description:
          "Comportements suspects, conflits : intervention proportionnée, sécurisation et traçabilité.",
      },
      {
        icon: "DoorClosed",
        title: "Zones privées & back-office",
        description:
          "Accès staff, livraisons, zones de stockage : réduire les failles sans bloquer l’activité.",
      },
    ],

    missionsTitle: "Dispositifs recommandés (premium & opérationnels)",
    missions: [
      {
        icon: "Eye",
        title: "Vigilance anti-vol & prévention des pertes",
        description:
          "Surveillance dynamique, identification des comportements à risque, coordination avec équipes de vente/management.",
      },
      {
        icon: "DoorClosed",
        title: "Contrôle d’accès discret",
        description:
          "Gestion des entrées, zones privées, accès staff, livraisons — selon vos procédures.",
      },
      {
        icon: "Radio",
        title: "Gestion d’incident & compte-rendu",
        description:
          "Levée de doute, sécurisation, appel des autorités si nécessaire, rapport circonstancié.",
      },
      {
        icon: "ClipboardCheck",
        title: "Procédures & briefings",
        description:
          "Consignes, scénarios (vol, incivilité, intrusion), coordination avec vos équipes pour une exécution fluide.",
      },
    ],

    relatedServices: [
      "agent-securite-qualifie",
      "securite-evenementielle",
      "audit-conseil-surete",
    ],

    useCases: [
      {
        title: "Boutique premium (Paris)",
        description:
          "Agent à excellente présentation, posture dissuasive, coordination équipe de vente, gestion incidents avec discrétion.",
      },
      {
        title: "Grand hôtel (Île-de-France)",
        description:
          "Surveillance lobby et accès, gestion de nuit, prévention intrusions, assistance incidents clients si nécessaire.",
      },
      {
        title: "Corner luxe / grand magasin",
        description:
          "Gestion des flux, protection des zones de valeur, prévention des pertes et remontées terrain exploitables.",
      },
    ],

    method: commonMethod,
    whyUs: commonWhyUs,

    faq: [
      {
        question: "Vos agents sont-ils formés aux codes du luxe ?",
        answer:
          "Oui. Nous sélectionnons des profils avec présentation irréprochable, discrétion, communication maîtrisée et posture orientée expérience client.",
      },
      {
        question: "Pouvez-vous sécuriser sans perturber l’accueil ?",
        answer:
          "Oui. L’objectif est une sécurité efficace et non intrusive : filtrage discret, procédures claires et coordination avec vos équipes.",
      },
      {
        question: "Faites-vous de la prévention des pertes ?",
        answer:
          "Oui. Vigilance, observation, coordination interne, procédures et traçabilité contribuent à réduire le risque et à sécuriser les actifs.",
      },
    ],
  },

  /* =======================================================================
   * 3) CHANTIERS & SITES BTP
   * ======================================================================= */
  {
    slug: "chantiers-sites-btp",
    icon: "HardHat",
    name: "Chantiers & sites BTP",

    metaTitle:
      "Sécurité chantiers & sites BTP en Île-de-France | Anti-intrusion, rondes & cynophile",
    metaDescription:
      "Gardiennage de chantiers : prévention vols et intrusions, contrôle d’accès, rondes, cynophile, levée de doute, reporting. Intervention rapide en Île-de-France.",

    heroImageId: "service-agent-cyno",
    heroTitle: "Sécurité chantiers & sites BTP",
    heroDescription:
      "Prévenir vols, intrusions et dégradations : un dispositif dissuasif, piloté et adapté aux contraintes de chantier.",

    intro: {
      title: "Réduire les pertes, sécuriser vos délais, protéger vos matériels.",
      paragraph:
        "Les chantiers sont des cibles privilégiées : cuivre, outillage, matériaux, engins, bases-vie… Une intrusion la nuit peut coûter cher et retarder le planning. Nous déployons une sécurité proportionnée (poste fixe, contrôle d’accès, rondes, cynophile selon surface) avec consignes écrites et traçabilité pour dissuader, détecter et réagir vite.",
    },

    issuesTitle: "Risques fréquents sur chantier",
    issues: [
      {
        icon: "Construction",
        title: "Vols (cuivre, outillage, engins)",
        description:
          "Pertes financières directes + retards : dissuasion, contrôle et remontées rapides.",
      },
      {
        icon: "Ban",
        title: "Intrusions & vandalisme",
        description:
          "Nuits, week-ends : rondes à horaires variables, points de contrôle et sécurisation des accès.",
      },
      {
        icon: "AlertTriangle",
        title: "Incendie / risques matériels",
        description:
          "Anomalies, fumées, dégradations : détection précoce et application stricte des consignes.",
      },
      {
        icon: "Map",
        title: "Périmètres étendus",
        description:
          "Grands sites : la ronde cynophile augmente la dissuasion et la capacité de détection.",
      },
    ],

    missionsTitle: "Nos interventions sur sites BTP",
    missions: [
      {
        icon: "Gate",
        title: "Contrôle des accès & filtrage véhicules",
        description:
          "Vérification autorisations, suivi entrées/sorties, gestion livraisons et accès bases-vie.",
      },
      {
        icon: "Dog",
        title: "Rondes cynophiles (grands périmètres)",
        description:
          "Solution très dissuasive pour les grands sites, notamment de nuit.",
      },
      {
        icon: "Footprints",
        title: "Rondes aléatoires & zones sensibles",
        description:
          "Surveillance des zones de stockage, clôtures, accès secondaires, engins, containers.",
      },
      {
        icon: "FileText",
        title: "Traçabilité & rapports",
        description:
          "Main courante, incidents, tentatives d’intrusion : des rapports utiles pour piloter et prévenir.",
      },
    ],

    relatedServices: ["agent-securite-qualifie", "agent-cynophile", "agent-rondier"],

    useCases: [
      {
        title: "Chantier urbain (Paris / proche couronne)",
        description:
          "Contrôle d’accès, rondes ciblées, procédures livraisons, prévention intrusions en horaires décalés.",
      },
      {
        title: "Grand chantier multi-entrées",
        description:
          "Postes aux accès + rondes cynophiles nocturnes, coordination conducteur de travaux, reporting incidents.",
      },
      {
        title: "Programme immobilier en phase second œuvre",
        description:
          "Protection des matériaux sensibles, rondes week-end et levées de doute en cas d’alarme.",
      },
    ],

    method: commonMethod,
    whyUs: commonWhyUs,

    faq: [
      {
        question: "Un agent cynophile est-il indispensable pour un chantier ?",
        answer:
          "Pas toujours. Sur grands périmètres ou zones isolées, c’est très efficace. Sur sites plus petits, un poste fixe + rondes peut suffire.",
      },
      {
        question: "Intervenez-vous la nuit et le week-end ?",
        answer:
          "Oui. Ce sont les créneaux les plus exposés : on adapte le dispositif aux périodes à risque.",
      },
      {
        question: "Pouvez-vous sécuriser plusieurs accès ?",
        answer:
          "Oui. On dimensionne postes et rondes selon le nombre d’entrées, la surface et les zones sensibles (stockage, base-vie, engins).",
      },
    ],
  },

  /* =======================================================================
   * 4) INDUSTRIE & LOGISTIQUE
   * ======================================================================= */
  {
    slug: "industrie-logistique",
    icon: "Factory",
    name: "Industrie & logistique",

    metaTitle:
      "Sécurité sites industriels & logistiques en Île-de-France | Contrôle des flux, périmètres & stocks",
    metaDescription:
      "Sécurité privée pour sites industriels et plateformes logistiques : contrôle d’accès, filtrage camions, rondes périmétriques, prévention intrusions et protection des stocks. Intervention en Île-de-France.",

    heroImageId: "service-agent-rondier",
    heroTitle: "Sécurité industrie & logistique",
    heroDescription:
      "Maîtriser les flux et sécuriser vos stocks : postes de garde, rondes périmétriques, procédures et reporting.",

    intro: {
      title: "Sécuriser le cœur de votre activité, sans ralentir vos opérations.",
      paragraph:
        "Un site industriel ou logistique combine flux de véhicules, zones de stockage, accès multiples et contraintes opérationnelles. La sécurité efficace repose sur des procédures simples mais strictes : filtrage, contrôles, rondes périmétriques, gestion des anomalies et traçabilité. Nous mettons en place un dispositif proportionné qui protège vos actifs tout en préservant la fluidité du site.",
    },

    issuesTitle: "Enjeux clés sur plateformes et sites industriels",
    issues: [
      {
        icon: "Truck",
        title: "Flux camions & accès multiples",
        description:
          "Filtrer, vérifier et tracer les entrées/sorties pour réduire les failles et sécuriser la chaîne logistique.",
      },
      {
        icon: "Warehouse",
        title: "Protection des stocks",
        description:
          "Réduire le risque d’intrusion et de vol (externe ou opportuniste) par présence et rondes ciblées.",
      },
      {
        icon: "Fence",
        title: "Surveillance périmétrique",
        description:
          "Clôtures, portails, zones d’ombre : points sensibles à surveiller, surtout la nuit.",
      },
      {
        icon: "ClipboardCheck",
        title: "Procédures & traçabilité",
        description:
          "Main courante, rapports et coordination avec les référents site : pour prévenir la récurrence.",
      },
    ],

    missionsTitle: "Missions types (industrie & logistique)",
    missions: [
      {
        icon: "ShieldCheck",
        title: "Poste de garde & contrôle d’accès",
        description:
          "Filtrage des entrées, contrôle des autorisations, gestion des badges et des visiteurs/prestataires.",
      },
      {
        icon: "ClipboardList",
        title: "Contrôle des chargements (selon procédure)",
        description:
          "Vérification documentaire, contrôle des scellés et remontée d’anomalies selon vos règles internes.",
      },
      {
        icon: "Radio",
        title: "Rondes périmétriques & levées de doute",
        description:
          "Rondes à horaires variables, vérification zones sensibles, intervention sur alarme, compte-rendu.",
      },
      {
        icon: "FileText",
        title: "Reporting exploitable",
        description:
          "Traçabilité des incidents et synthèses pour piloter les risques et améliorer les procédures.",
      },
    ],

    relatedServices: ["agent-securite-qualifie", "agent-cynophile", "agent-rondier"],

    useCases: [
      {
        title: "Plateforme logistique (93)",
        description:
          "Poste 24/7 pour contrôle camions et personnel, rondes périmétriques nocturnes et reporting régulier.",
      },
      {
        title: "Site industriel (77)",
        description:
          "Contrôle d’accès strict, gestion prestataires, rondes ciblées zones sensibles et procédures d’urgence.",
      },
      {
        title: "Entrepôt avec zone extérieure de stockage",
        description:
          "Rondes à horaires variables, surveillance périmètre, prévention intrusions et levées de doute rapides.",
      },
    ],

    method: commonMethod,
    whyUs: commonWhyUs,

    faq: [
      {
        question: "Pouvez-vous sécuriser le filtrage camions sans ralentir l’exploitation ?",
        answer:
          "Oui. On met en place une procédure simple et stable (documents, contrôle, traçabilité) adaptée à vos cadences.",
      },
      {
        question: "Faites-vous des rondes périmétriques de nuit ?",
        answer:
          "Oui. C’est un levier majeur de dissuasion et de détection, notamment sur clôtures et accès secondaires.",
      },
      {
        question: "Proposez-vous un reporting régulier ?",
        answer:
          "Oui. Main courante, rapports d’événements et synthèses pour suivre incidents, anomalies et actions correctives.",
      },
    ],
  },

  /* =======================================================================
   * 5) ÉVÉNEMENTIEL & CULTURE
   * ======================================================================= */
  {
    slug: "evenementiel-culture",
    icon: "CalendarDays",
    name: "Événementiel & culture",

    metaTitle:
      "Sécurité événementielle en Île-de-France | Contrôle d’accès, gestion des flux & SSIAP",
    metaDescription:
      "Sécurité pour événements, salons, concerts et sites culturels : contrôle d’accès, gestion des flux, prévention incidents, coordination et sécurité incendie (SSIAP) selon besoins. Île-de-France.",

    heroImageId: "service-evenementiel",
    heroTitle: "Sécurité événementiel & culture",
    heroDescription:
      "Sécuriser le public, maîtriser les flux, prévenir les incidents : un dispositif dimensionné et piloté, en coordination avec l’organisation.",

    intro: {
      title: "Une sécurité visible, structurée, et parfaitement coordonnée.",
      paragraph:
        "En événementiel, tout se joue sur l’anticipation et la coordination : flux entrants/sortants, filtrage, prévention des incidents, gestion des situations sensibles et respect des procédures du site. Nous dimensionnons les équipes selon votre jauge, vos accès, vos contraintes et vos horaires, avec un pilotage clair, un briefing opérationnel et des remontées terrain.",
    },

    issuesTitle: "Enjeux principaux en événementiel",
    issues: [
      {
        icon: "Users",
        title: "Gestion des flux & des files",
        description:
          "Éviter les tensions, canaliser les mouvements, protéger les accès et sécuriser les zones clés.",
      },
      {
        icon: "Ticket",
        title: "Contrôle d’accès & filtrage",
        description:
          "Vérification des accès selon votre organisation, sécurisation des entrées, prévention des intrusions.",
      },
      {
        icon: "AlertTriangle",
        title: "Gestion d’incident & réaction",
        description:
          "Capacité à intervenir vite, à sécuriser une zone, à appliquer les procédures et à remonter l’information.",
      },
      {
        icon: "Flame",
        title: "Prévention incendie (selon contexte)",
        description:
          "Sur certains sites/ERP, la sécurité incendie peut être nécessaire : procédures, vigilance et coordination.",
      },
    ],

    missionsTitle: "Missions types (salons, concerts, événements, sites culturels)",
    missions: [
      {
        icon: "Scan",
        title: "Contrôle d’accès & filtrage",
        description:
          "Accueil, contrôle des entrées, orientation, gestion files, sécurisation des zones d’accès.",
      },
      {
        icon: "Route",
        title: "Gestion des flux sur site",
        description:
          "Répartition, canalisation, prévention des mouvements de foule, sécurisation des points sensibles.",
      },
      {
        icon: "ShieldCheck",
        title: "Protection des zones sensibles",
        description:
          "Backstage, loges, VIP, accès techniques : sécurisation discrète et contrôle des accréditations.",
      },
      {
        icon: "Radio",
        title: "Coordination & reporting",
        description:
          "Briefing, consignes, coordination avec l’organisation et remontées terrain (incidents, anomalies).",
      },
    ],

    relatedServices: [
      "securite-evenementielle",
      "agent-securite-qualifie",
      "agent-incendie-ssiap",
    ],

    useCases: [
      {
        title: "Salon professionnel (Porte de Versailles)",
        description:
          "Gestion des accès exposants/visiteurs, sécurisation zones logistiques, surveillance nocturne et reporting.",
      },
      {
        title: "Concert / grande jauge (IDF)",
        description:
          "Dispositif d’accès, flux, sécurisation points sensibles, coordination exploitation et remontées terrain.",
      },
      {
        title: "Lieu culturel",
        description:
          "Gestion des entrées, prévention des incivilités, sécurisation des zones techniques et assistance procédures.",
      },
    ],

    method: commonMethod,
    whyUs: commonWhyUs,

    faq: [
      {
        question: "Pouvez-vous dimensionner rapidement une équipe pour un événement ?",
        answer:
          "Oui. On s’appuie sur la jauge, les accès, le site, les horaires et les risques. Un dispositif peut être monté rapidement, puis optimisé après repérage.",
      },
      {
        question: "Assurez-vous la coordination avec l’organisation ?",
        answer:
          "Oui. Briefing, consignes, points de contact et circuit de remontée : la coordination est une priorité en événementiel.",
      },
      {
        question: "Proposez-vous une traçabilité des incidents ?",
        answer:
          "Oui. Rapports d’événements et synthèses selon besoin (exploitation, production, organisateur).",
      },
    ],
  },

  /* =======================================================================
   * 6) DIRIGEANTS & VIP
   * ======================================================================= */
  {
    slug: "dirigeants-vip",
    icon: "Users",
    name: "Dirigeants & VIP",

    metaTitle:
      "Sécurité dirigeants & VIP en Île-de-France | Discrétion, anticipation & protection des déplacements",
    metaDescription:
      "Solutions de sécurité discrètes pour dirigeants et VIP : analyse de risque, sécurisation de lieux, accompagnement, prévention incidents, confidentialité et coordination. Intervention en Île-de-France.",

    heroImageId: "hero",
    heroTitle: "Sécurité dirigeants & VIP",
    heroDescription:
      "Discrétion, anticipation et sérénité : sécuriser vos déplacements et vos lieux sans perturber votre quotidien.",

    intro: {
      title: "La sécurité la plus efficace est celle qui se remarque le moins.",
      paragraph:
        "La protection de personnes requiert un niveau de confidentialité élevé, une excellente maîtrise de soi et une capacité d’anticipation. Nous privilégions une approche méthodique : analyse du contexte, repérage, procédures, coordination des déplacements et sécurisation des lieux, avec une posture discrète et professionnelle.",
    },

    issuesTitle: "Enjeux majeurs en protection de personnes",
    issues: [
      {
        icon: "EyeOff",
        title: "Confidentialité & discrétion",
        description:
          "Limiter l’exposition, éviter les habitudes visibles et préserver l’image : la discrétion est centrale.",
      },
      {
        icon: "BrainCircuit",
        title: "Anticipation des risques",
        description:
          "Analyse d’itinéraires, lieux, horaires et contextes : prévenir avant d’avoir à gérer.",
      },
      {
        icon: "MapPin",
        title: "Déplacements & points de vulnérabilité",
        description:
          "Entrées/sorties, stationnement, lieux publics : sécuriser les moments les plus exposés.",
      },
      {
        icon: "ShieldCheck",
        title: "Maîtrise des incidents",
        description:
          "Gestion calme, décisions rapides, mise en sécurité et coordination si escalade.",
      },
    ],

    missionsTitle: "Nos approches (selon contexte et besoin)",
    missions: [
      {
        icon: "Car",
        title: "Accompagnement sécurisé",
        description:
          "Accompagnement discret sur déplacements professionnels/privés, coordination et prévention des situations à risque.",
      },
      {
        icon: "Home",
        title: "Sécurisation de résidence / lieux",
        description:
          "Analyse des accès, points faibles, procédures et recommandations, puis mise en place du dispositif humain adapté.",
      },
      {
        icon: "FileSearch",
        title: "Audit & recommandations de sûreté",
        description:
          "Diagnostic concret et plan d’actions priorisé : posture, procédures, accès, points de vulnérabilité.",
      },
    ],

    relatedServices: ["audit-conseil-surete", "agent-securite-qualifie"],

    useCases: [
      {
        title: "Dirigeant exposé (déplacements réguliers)",
        description:
          "Analyse des routines, sécurisation des points sensibles, accompagnement discret et procédures de remontée.",
      },
      {
        title: "Événement privé / rendez-vous sensible",
        description:
          "Sécurisation des accès, contrôle discret, coordination et prévention des situations à risque.",
      },
      {
        title: "Résidence (92/78)",
        description:
          "Audit, recommandations, mise en place d’un dispositif humain proportionné et traçabilité des événements.",
      },
    ],

    method: commonMethod,
    whyUs: commonWhyUs,

    faq: [
      {
        question: "Travaillez-vous avec un haut niveau de confidentialité ?",
        answer:
          "Oui. La discrétion et la confidentialité font partie intégrante du cadre de mission : procédures, communication et posture adaptées.",
      },
      {
        question: "Faites-vous un repérage avant mission ?",
        answer:
          "Lorsque le contexte le nécessite, oui : repérage des lieux, accès, itinéraires et scénarios de risque pour sécuriser sans improviser.",
      },
      {
        question: "Pouvez-vous sécuriser un lieu et un déplacement ?",
        answer:
          "Oui. On dimensionne selon le niveau d’exposition, la fréquence et les contraintes : l’objectif est la sérénité, pas la surenchère.",
      },
    ],
  },

  /* =======================================================================
   * 7) SITES SENSIBLES & INSTITUTIONNELS
   * ======================================================================= */
  {
    slug: "sites-sensibles-institutionnels",
    icon: "Landmark",
    name: "Sites sensibles & institutionnels",

    metaTitle:
      "Sécurité sites sensibles & institutionnels en Île-de-France | Procédures renforcées & traçabilité",
    metaDescription:
      "Sécurité privée pour sites sensibles et institutionnels : contrôle d’accès renforcé, procédures strictes, surveillance, rondes, confidentialité et traçabilité. Intervention en Île-de-France.",

    heroImageId: "about-hero",
    heroTitle: "Sécurité sites sensibles & institutionnels",
    heroDescription:
      "Procédures renforcées, posture irréprochable et traçabilité : une sécurité rigoureuse, alignée avec vos exigences.",

    intro: {
      title: "Rigueur, procédures et confidentialité : la base des environnements sensibles.",
      paragraph:
        "Administrations, sites réglementés, lieux institutionnels : la sécurité doit s’appuyer sur des protocoles stricts, une traçabilité et une posture maîtrisée. Nous mettons en place des dispositifs cadrés (contrôle d’accès, filtrage, escortes si besoin, rondes, levées de doute) avec un niveau de confidentialité élevé et une coordination étroite avec vos référents sûreté.",
    },

    issuesTitle: "Enjeux spécifiques des sites sensibles",
    issues: [
      {
        icon: "Lock",
        title: "Protection contre l’intrusion & l’accès non autorisé",
        description:
          "Filtrage, contrôle des habilitations et gestion des accès pour réduire les failles humaines.",
      },
      {
        icon: "ShieldAlert",
        title: "Protocoles et exigences strictes",
        description:
          "Procédures internes, contraintes réglementaires, consignes précises : exécution stable et contrôlée.",
      },
      {
        icon: "Users",
        title: "Gestion des habilitations & visiteurs",
        description:
          "Niveaux d’accès, badges, registres, accompagnement : sécuriser sans désorganiser les flux.",
      },
      {
        icon: "EyeOff",
        title: "Confidentialité",
        description:
          "Discrétion, communication maîtrisée, traçabilité : protéger les informations sensibles.",
      },
    ],

    missionsTitle: "Missions types (institutionnel, réglementé, sensible)",
    missions: [
      {
        icon: "Fingerprint",
        title: "Contrôle d’accès renforcé",
        description:
          "Vérification d’identité selon procédures, gestion des habilitations/badges, registre et filtrage.",
      },
      {
        icon: "Users",
        title: "Escortes et gestion des accès zones restreintes",
        description:
          "Accompagnement et sécurisation des déplacements internes selon règles du site.",
      },
      {
        icon: "Radio",
        title: "Surveillance et rondes",
        description:
          "Rondes intérieures/périmétriques, levées de doute, vérification des points sensibles.",
      },
      {
        icon: "FileText",
        title: "Traçabilité & rapports",
        description:
          "Main courante, rapports d’événements et synthèses pour piloter et renforcer les procédures.",
      },
    ],

    relatedServices: [
      "agent-securite-qualifie",
      "audit-conseil-surete",
      "agent-incendie-ssiap",
    ],

    useCases: [
      {
        title: "Bâtiment institutionnel (IDF)",
        description:
          "Accueil filtrant, contrôle des visiteurs, gestion des flux, rondes et reporting pour garantir sérénité et conformité.",
      },
      {
        title: "Site à accès réglementé",
        description:
          "Contrôle d’accès strict, procédures d’habilitation, escortes internes et traçabilité renforcée.",
      },
      {
        title: "Établissement avec zones sensibles",
        description:
          "Sécurisation des zones restreintes, levées de doute, procédures d’urgence et coordination référents sûreté.",
      },
    ],

    method: commonMethod,
    whyUs: commonWhyUs,

    faq: [
      {
        question: "Pouvez-vous appliquer nos protocoles internes stricts ?",
        answer:
          "Oui. La mission est cadrée en amont : procédures, consignes écrites, points de contrôle, circuits de remontée et reporting.",
      },
      {
        question: "Comment assurez-vous la confidentialité ?",
        answer:
          "Par une posture discrète, une communication maîtrisée, des procédures claires et une traçabilité stricte des événements.",
      },
      {
        question: "Faites-vous des rondes et levées de doute ?",
        answer:
          "Oui. Rondes ciblées, vérification des points sensibles et levées de doute selon consigne, avec rapport circonstancié.",
      },
    ],
  },

  /* =======================================================================
   * 8) IMMOBILIER & RÉSIDENTIEL
   * ======================================================================= */
  {
    slug: "immobilier-residentiel",
    icon: "Building",
    name: "Immobilier & résidentiel",

    metaTitle:
      "Sécurité copropriétés & résidences en Île-de-France | Rondes, présence dissuasive & prévention incivilités",
    metaDescription:
      "Sécurité privée pour copropriétés et résidences : prévention des intrusions, rondes, gestion des accès, intervention sur alarme, prévention des incivilités et reporting. Île-de-France.",

    heroImageId: "founder-portrait",
    heroTitle: "Sécurité immobilier & résidentiel",
    heroDescription:
      "Prévenir intrusions, incivilités et dégradations : une présence dissuasive, des rondes et des accès maîtrisés pour la tranquillité des résidents.",

    intro: {
      title: "Protéger le cadre de vie et restaurer la tranquillité au quotidien.",
      paragraph:
        "Dans une résidence, la sécurité se joue sur des gestes simples mais réguliers : maîtrise des accès, rondes, prévention des intrusions, gestion des situations sensibles et traçabilité. Nos dispositifs visent à réduire durablement les incidents (hall, parkings, caves, locaux techniques) tout en conservant une posture apaisante et respectueuse des habitants.",
    },

    issuesTitle: "Problématiques fréquentes en résidentiel",
    issues: [
      {
        icon: "Angry",
        title: "Incivilités & dégradations",
        description:
          "Nuisances, dégradations des parties communes : présence dissuasive et interventions proportionnées.",
      },
      {
        icon: "KeyRound",
        title: "Gestion des accès (hall, parkings, caves)",
        description:
          "Contrôle des entrées, prévention des occupations illicites, sécurisation des locaux techniques.",
      },
      {
        icon: "Car",
        title: "Vols & cambriolages",
        description:
          "Rondes et vigilance réduisent le risque, notamment sur parkings et zones peu fréquentées.",
      },
      {
        icon: "Users",
        title: "Conflits & situations sensibles",
        description:
          "Posture calme, médiation et application des consignes pour restaurer un climat serein.",
      },
    ],

    missionsTitle: "Missions types (copropriétés, résidences, parcs immobiliers)",
    missions: [
      {
        icon: "Home",
        title: "Permanence / présence dissuasive",
        description:
          "Présence à horaires définis pour prévention, information, et vigilance sur les accès selon consigne.",
      },
      {
        icon: "Footprints",
        title: "Rondes de surveillance",
        description:
          "Rondes à horaires variables dans parties communes, sous-sols, parkings, extérieurs : détection anomalies.",
      },
      {
        icon: "PhoneForwarded",
        title: "Intervention sur alarme / levée de doute",
        description:
          "Application des procédures, sécurisation, remontée d’information, rapport circonstancié.",
      },
      {
        icon: "FileText",
        title: "Main courante & reporting",
        description:
          "Traçabilité des incidents (hall, parking, dégradations) et synthèses utiles pour syndic/gestionnaire.",
      },
    ],

    relatedServices: ["agent-securite-qualifie", "agent-rondier"],

    useCases: [
      {
        title: "Résidence de standing",
        description:
          "Présence en journée sur accès et parties communes, rondes en horaires sensibles et reporting pour le gestionnaire.",
      },
      {
        title: "Copropriété avec parkings",
        description:
          "Rondes nocturnes à horaires variables, surveillance des sous-sols, prévention vols et occupations illicites.",
      },
      {
        title: "Parc immobilier multi-sites",
        description:
          "Plan de rondes mutualisé, traçabilité, remontées terrain et ajustements selon incidents récurrents.",
      },
    ],

    method: commonMethod,
    whyUs: commonWhyUs,

    faq: [
      {
        question: "Un agent peut-il gérer les colis des résidents ?",
        answer:
          "Selon consigne et organisation, oui : cela peut être intégré à une mission de présence/accueil, en respectant la sécurité et la traçabilité.",
      },
      {
        question: "Comment gérez-vous les incivilités et conflits ?",
        answer:
          "Avec une posture apaisante, une intervention proportionnée, l’application des consignes et une traçabilité (main courante) pour limiter la récurrence.",
      },
      {
        question: "Pouvez-vous sécuriser surtout la nuit et le week-end ?",
        answer:
          "Oui. Ce sont souvent les créneaux à risque : rondes et présence sont dimensionnées selon vos incidents et vos contraintes.",
      },
    ],
  },
];

/* Optional helper (si tu veux valider tes slugs liés aux services) */
export function resolveRelatedServices(sector: SectorDef) {
  return sector.relatedServices
    .map((slug) => servicesData.find((s: Service) => s.slug === slug))
    .filter(Boolean);
}
