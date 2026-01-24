export type CityFocus =
  | "luxe"
  | "bureaux"
  | "chantiers"
  | "logistique"
  | "événementiel"
  | "résidentiel"
  | "tech";

export type CityUseCase = {
  icon: string; // icône lucide (string)
  title: string;
  content: string;
};

export type City = {
  slug: string;
  title: string;
  department: string;
  focus: CityFocus[];
  keywords: string[];

  // ✅ champs premium (optionnels)
  premium?: boolean;
  intro?: string; // HTML autorisé si tu veux (sinon simple texte)
  useCases?: CityUseCase[];
};

// -------------------------------------------------------
// 1) Ta base de 120 villes (tu gardes ton tableau actuel)
// -------------------------------------------------------
export const citiesDataBase: City[] = [
  // ... tes 120 entrées existantes ici (inchangées)
];

// -------------------------------------------------------
// 2) Overrides premium sur 25 villes stratégiques
// -------------------------------------------------------
const premiumCityOverrides: Record<string, Partial<City>> = {
  // =========================
  // PARIS (10)
  // =========================
  "paris-1-75001": {
    premium: true,
    intro:
      "Paris 1er concentre des zones à forte exposition (commerces premium, flux touristiques, établissements recevant du public). Nous mettons en place des dispositifs discrets et efficaces : contrôle d’accès, filtrage, rondes et renfort événementiel.",
    useCases: [
      { icon: "ShoppingBag", title: "Boutiques & retail premium", content: "Accueil, prévention du vol, gestion des flux, vigilance discrète et protocole d’alerte." },
      { icon: "Ticket", title: "Événements & privatisations", content: "Contrôle d’accès, zones VIP, gestion file d’attente et coordination avec l’organisateur." },
      { icon: "ShieldCheck", title: "Présence dissuasive", content: "Agents qualifiés pour rassurer, prévenir les comportements à risque et sécuriser le site." },
    ],
    keywords: ["sécurité paris 1", "agent sécurité 75001", "gardiennage paris 1", "sécurité retail luxe paris"],
  },

  "paris-2-75002": {
    premium: true,
    intro:
      "Paris 2ème est un secteur bureaux + commerce avec des flux denses. Nos dispositifs combinent contrôle d’accès, prévention et reporting pour des sites tertiaires et points de vente.",
    useCases: [
      { icon: "Building2", title: "Bureaux & immeubles tertiaires", content: "Contrôle visiteurs, badges, gestion prestataires et rondes de fermeture." },
      { icon: "KeyRound", title: "Ouverture / fermeture sécurisée", content: "Procédures, levée de doute, coordination télésurveillance." },
      { icon: "ClipboardList", title: "Main courante & reporting", content: "Traçabilité, remontées terrain et points d’amélioration réguliers." },
    ],
    keywords: ["sécurité paris 2", "gardiennage 75002", "agent sécurité bureaux paris", "contrôle d'accès paris"],
  },

  "paris-8-75008": {
    premium: true,
    intro:
      "Paris 8ème (Champs-Élysées, boutiques de luxe, sièges sociaux, hôtels) exige un niveau de présentation et de discrétion irréprochable. Nous déployons des équipes adaptées : accueil filtrant, sûreté, renfort événementiel et protection rapprochée sur demande.",
    useCases: [
      { icon: "Gem", title: "Luxe & haute valeur", content: "Prévention, surveillance zones sensibles, protocole anti-intrusion et gestion incidents." },
      { icon: "Users", title: "Accueil & filtrage VIP", content: "Contrôle d’identité, gestion des listes, accès zones privées/back-office." },
      { icon: "CalendarDays", title: "Soirées & lancements", content: "Dispositif événementiel, gestion flux, coordination staff/organisation." },
    ],
    keywords: ["sécurité paris 8", "gardiennage champs-élysées", "agent sécurité luxe", "sécurité événementielle prestige paris"],
  },

  "paris-9-75009": {
    premium: true,
    intro:
      "Paris 9ème combine bureaux, commerces et lieux à forte fréquentation. Nous assurons la prévention, la dissuasion et la gestion des flux, avec un suivi opérationnel clair.",
    useCases: [
      { icon: "Store", title: "Commerces & centres", content: "Présence dissuasive, prévention du vol, assistance équipes magasin." },
      { icon: "Building2", title: "Bureaux & coworking", content: "Contrôle entrées/sorties, gestion prestataires, incidents et procédures." },
      { icon: "Route", title: "Rondes & levée de doute", content: "Rondes variables, réponse alarme et mesures conservatoires." },
    ],
  },

  "paris-10-75010": {
    premium: true,
    intro:
      "Paris 10ème présente des flux importants et une activité continue. Nous mettons en place un dispositif adapté aux horaires étendus : contrôle d’accès, rondes et renforts ponctuels.",
    useCases: [
      { icon: "MapPin", title: "Sites à fort passage", content: "Gestion des accès, prévention des incidents et présence rassurante." },
      { icon: "Bell", title: "Gestion d’alerte", content: "Procédures d’intervention, coordination télésurveillance/forces de l’ordre." },
      { icon: "Shield", title: "Prévention & dissuasion", content: "Patrouilles, points de contrôle et prévention des intrusions." },
    ],
  },

  "paris-12-75012": {
    premium: true,
    intro:
      "Paris 12ème se distingue par des pôles de transport, des zones d’activité et des ERP. Nous proposons des dispositifs mixtes : sûreté, SSIAP selon besoin, et gestion de flux.",
    useCases: [
      { icon: "Truck", title: "Logistique urbaine", content: "Contrôle livraisons, gestion quais, accès prestataires et rondes." },
      { icon: "Flame", title: "Prévention incendie (SSIAP)", content: "Selon configuration ERP/IGH : rondes techniques, alarmes, évacuation." },
      { icon: "Users", title: "Gestion du public", content: "Accueil, contrôle et sécurisation des circulations." },
    ],
  },

  "paris-13-75013": {
    premium: true,
    intro:
      "Paris 13ème combine bureaux modernes, chantiers et zones tertiaires. Nous sécurisons vos sites en phase travaux et vos bâtiments en exploitation : contrôle d’accès, rondes, prévention.",
    useCases: [
      { icon: "HardHat", title: "Chantiers & travaux", content: "Contrôle entrées, protection matériel, prévention intrusions et vols." },
      { icon: "Building2", title: "Bureaux & IGH", content: "Accueil filtrant, contrôle prestataires, rondes et reporting." },
      { icon: "Cctv", title: "Coordination avec systèmes", content: "Procédures d’alarme, caméras, consignes et levée de doute." },
    ],
  },

  "paris-15-75015": {
    premium: true,
    intro:
      "Paris 15ème : forte densité tertiaire + résidences + ERP. Nous dimensionnons un dispositif stable, discret et rigoureux : postes fixes, rondes, SSIAP si nécessaire.",
    useCases: [
      { icon: "Building2", title: "Bureaux & sièges", content: "Contrôle d’accès, gestion visiteurs, sécurité des zones sensibles." },
      { icon: "Home", title: "Résidences & copropriétés", content: "Surveillance, rondes, prévention des incivilités et gestion incidents." },
      { icon: "FileText", title: "Consignes & qualité", content: "Procédures, reporting et contrôles réguliers." },
    ],
  },

  "paris-16-75016": {
    premium: true,
    intro:
      "Paris 16ème : environnement résidentiel haut de gamme et besoins en discrétion. Nous proposons une sécurité orientée confidentialité, prévention et protection des personnes.",
    useCases: [
      { icon: "UserCheck", title: "Protection rapprochée", content: "Dispositifs discrets, anticipation, itinéraires, gestion de crise." },
      { icon: "Home", title: "Résidences de standing", content: "Filtrage, rondes, vigilance, protocoles visiteurs/prestataires." },
      { icon: "Lock", title: "Confidentialité", content: "Règles internes strictes et culture de la discrétion." },
    ],
  },

  "paris-17-75017": {
    premium: true,
    intro:
      "Paris 17ème mixe sièges, commerces et résidences. Nous assurons des dispositifs flexibles : postes fixes, rondes, renfort événementiel et contrôle d’accès.",
    useCases: [
      { icon: "Building2", title: "Tertiaire & accueil", content: "Filtrage, contrôle visiteurs, gestion badges et prestataires." },
      { icon: "Store", title: "Retail & prévention", content: "Présence dissuasive, prévention des vols et gestion situations." },
      { icon: "Route", title: "Rondes & sécurité nocturne", content: "Rondes variables et levée de doute sur alarme." },
    ],
  },

  // =========================
  // 92 (6)
  // =========================
  "la-defense-92400": {
    premium: true,
    intro:
      "La Défense : tours, IGH, sièges sociaux et flux importants. Nous déployons des dispositifs structurés : contrôle d’accès, gestion visiteurs, rondes, coordination PC sécurité et reporting.",
    useCases: [
      { icon: "Building2", title: "IGH & tours", content: "Contrôle accès, gestion prestataires, rondes de niveaux, procédures d’alerte." },
      { icon: "Users", title: "Gestion flux & accueil", content: "Files, badges, accueil entreprises, protocoles visiteurs." },
      { icon: "ShieldCheck", title: "Supervision & qualité", content: "Contrôles, rapports et amélioration continue." },
    ],
  },

  "courbevoie-92400": {
    premium: true,
    intro:
      "Courbevoie : continuité avec La Défense, forte présence tertiaire. Nous sécurisons bureaux, sites multi-accès et événements corporate.",
    useCases: [
      { icon: "ClipboardList", title: "Contrôle d’accès", content: "Entrées/sorties, contrôle prestataires, zones sensibles." },
      { icon: "CalendarDays", title: "Corporate & événements", content: "Accueil, filtrage et gestion des accès VIP." },
      { icon: "Route", title: "Rondes & fermetures", content: "Rondes de fermeture, vérifications et traçabilité." },
    ],
  },

  "puteaux-92800": {
    premium: true,
    intro:
      "Puteaux : bureaux, tours et sites stratégiques. Nous mettons en place un dispositif discret mais très structuré (consignes + reporting).",
    useCases: [
      { icon: "Building2", title: "Tours & sièges", content: "Accueil filtrant, procédures et contrôle qualité." },
      { icon: "Shield", title: "Prévention des intrusions", content: "Surveillance des accès, rondes, levée de doute." },
      { icon: "FileText", title: "Traçabilité", content: "Main courante et rapports réguliers." },
    ],
  },

  "neuilly-sur-seine-92200": {
    premium: true,
    intro:
      "Neuilly-sur-Seine : résidentiel premium, sièges et exigences de discrétion. Nous intervenons en gardiennage haut niveau et protection des personnes selon besoin.",
    useCases: [
      { icon: "Home", title: "Résidentiel de standing", content: "Filtrage visiteurs, rondes, prévention et gestion incidents." },
      { icon: "UserCheck", title: "Protection rapprochée", content: "Dispositif discret, anticipation et gestion des déplacements." },
      { icon: "Lock", title: "Confidentialité", content: "Procédures internes, discrétion et savoir-être." },
    ],
  },

  "boulogne-billancourt-92100": {
    premium: true,
    intro:
      "Boulogne-Billancourt : forte densité tertiaire et sites multi-occupants. Nous sécurisons accès, flux et zones sensibles avec une organisation claire.",
    useCases: [
      { icon: "Building2", title: "Bureaux & immeubles", content: "Contrôle d’accès, gestion prestataires, rondes et incidents." },
      { icon: "Users", title: "Multi-occupants", content: "Procédures, badges, coordination et communication centralisée." },
      { icon: "Route", title: "Rondes & levée de doute", content: "Intervention rapide et traçabilité." },
    ],
  },

  "issy-les-moulineaux-92130": {
    premium: true,
    intro:
      "Issy-les-Moulineaux : pôles tech et sièges. Nous déployons une sécurité orientée contrôle d’accès, confidentialité et continuité de service.",
    useCases: [
      { icon: "ShieldCheck", title: "Contrôle d’accès strict", content: "Accès badges, prestataires, zones restreintes et procédures." },
      { icon: "Lock", title: "Confidentialité", content: "Culture du secret, respect des process internes." },
      { icon: "ClipboardList", title: "Reporting", content: "Rapports, main courante et points d’amélioration." },
    ],
  },

  // =========================
  // 93 (3)
  // =========================
  "saint-denis-93200": {
    premium: true,
    intro:
      "Saint-Denis : grands flux, chantiers, événements et zones en transformation. Nous sécurisons chantiers, ERP et sites sensibles avec des renforts ponctuels si nécessaire.",
    useCases: [
      { icon: "HardHat", title: "Chantiers & matériels", content: "Contrôle entrées, prévention vols, rondes et protection périmètre." },
      { icon: "CalendarDays", title: "Événementiel", content: "Contrôle d’accès, gestion flux, coordination terrain." },
      { icon: "PawPrint", title: "Cynophile (selon site)", content: "Dissuasion et surveillance grands périmètres." },
    ],
  },

  "villepinte-93420": {
    premium: true,
    intro:
      "Villepinte : salons, expositions et logistique autour des événements. Nos dispositifs couvrent contrôle d’accès, filtrage, gestion flux et sûreté événementielle.",
    useCases: [
      { icon: "Ticket", title: "Salons & expositions", content: "Accès, accréditations, zones techniques, back-office." },
      { icon: "Users", title: "Gestion des flux", content: "Files, entrées, circulation et prévention incidents." },
      { icon: "ShieldCheck", title: "PC & coordination", content: "Chef de dispositif, consignes, reporting." },
    ],
  },

  "aubervilliers-93300": {
    premium: true,
    intro:
      "Aubervilliers : entrepôts, logistique, chantiers et sites industriels. Nous renforçons la sûreté avec rondes, contrôle d’accès et cynophile selon configuration.",
    useCases: [
      { icon: "Warehouse", title: "Entrepôts & zones de stockage", content: "Contrôle livraisons, accès, rondes et levée de doute." },
      { icon: "HardHat", title: "Sites en travaux", content: "Protection matériel, prévention intrusions et vols." },
      { icon: "PawPrint", title: "Cynophile", content: "Surveillance grands périmètres et dissuasion." },
    ],
  },

  // =========================
  // 94 (3)
  // =========================
  "rungis-94150": {
    premium: true,
    intro:
      "Rungis : logistique critique et flux de marchandises. Nous sécurisons les accès, quais, zones de stockage et rotations, avec une traçabilité stricte.",
    useCases: [
      { icon: "Truck", title: "Quais & livraisons", content: "Contrôle des accès, prévention des intrusions et gestion des flux." },
      { icon: "Warehouse", title: "Stockage & zones sensibles", content: "Surveillance, rondes et procédures d’alerte." },
      { icon: "ClipboardList", title: "Traçabilité", content: "Main courante, rapports et suivi opérationnel." },
    ],
  },

  "orly-94310": {
    premium: true,
    intro:
      "Orly : zone à forte sensibilité logistique et technique. Nous proposons contrôle d’accès, rondes, levée de doute et dispositifs adaptés aux horaires étendus.",
    useCases: [
      { icon: "Shield", title: "Accès sensibles", content: "Filtrage, contrôle des entrées et procédures." },
      { icon: "Route", title: "Rondes & interventions", content: "Rondes variables, levée de doute et sécurisation." },
      { icon: "Lock", title: "Confidentialité & process", content: "Respect strict des consignes et traçabilité." },
    ],
  },

  "creteil-94000": {
    premium: true,
    intro:
      "Créteil : bureaux, ERP et zones résidentielles. Nous dimensionnons des dispositifs stables (agents qualifiés, rondes, SSIAP selon besoin).",
    useCases: [
      { icon: "Building2", title: "Bureaux & sites", content: "Contrôle d’accès, gestion visiteurs et prévention." },
      { icon: "Flame", title: "SSIAP (si requis)", content: "Prévention incendie, alarmes, évacuation et registre." },
      { icon: "Home", title: "Résidentiel", content: "Surveillance, rondes, prévention et gestion incidents." },
    ],
  },

  // =========================
  // 95 (2)
  // =========================
  "roissy-en-france-95700": {
    premium: true,
    intro:
      "Roissy-en-France : logistique, fret et flux techniques. Nous sécurisons sites multi-accès, zones de stockage et entrées/sorties avec des procédures strictes.",
    useCases: [
      { icon: "Truck", title: "Fret & plateformes", content: "Contrôle d’accès, gestion camions, prévention intrusions." },
      { icon: "Warehouse", title: "Stockage", content: "Surveillance zones sensibles, rondes et levée de doute." },
      { icon: "ShieldCheck", title: "Dispositif structuré", content: "Consignes, reporting, contrôles et amélioration continue." },
    ],
  },

  "cergy-95000": {
    premium: true,
    intro:
      "Cergy : bureaux, pôles administratifs, résidentiel. Nous assurons un dispositif clair : contrôle d’accès, rondes, prévention et reporting.",
    useCases: [
      { icon: "Building2", title: "Bureaux", content: "Accueil filtrant, contrôle prestataires et sécurisation." },
      { icon: "Home", title: "Résidences", content: "Surveillance, rondes, prévention des incivilités." },
      { icon: "ClipboardList", title: "Reporting", content: "Main courante et rapports réguliers." },
    ],
  },

  // =========================
  // 91 (1)
  // =========================
  "massy-91300": {
    premium: true,
    intro:
      "Massy : hub transport + tertiaire + tech. Nous proposons contrôle d’accès, sécurité de site et rondes, avec une capacité de renfort selon les pics d’activité.",
    useCases: [
      { icon: "Building2", title: "Tertiaire", content: "Contrôle d’accès, visiteurs, prestataires, procédures." },
      { icon: "Cpu", title: "Tech & sites sensibles", content: "Discrétion, confidentialité, process stricts." },
      { icon: "Route", title: "Rondes", content: "Rondes variables et levée de doute sur alarme." },
    ],
  },
};

// -------------------------------------------------------
// 3) Export final : base + overrides premium
// -------------------------------------------------------
export const citiesData: City[] = citiesDataBase.map((c) => ({
  ...c,
  ...(premiumCityOverrides[c.slug] ?? {}),
}));
