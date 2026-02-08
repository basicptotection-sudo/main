// src/lib/cities-data.ts
import { servicesData } from "./services-data";

/* =========================================================
   0) Types
   ========================================================= */

export type CityFocus =
  | "luxe"
  | "bureaux"
  | "chantiers"
  | "logistique"
  | "événementiel"
  | "résidentiel"
  | "tech";

export type CityUseCase = {
  icon: string; // lucide icon name (string)
  title: string;
  content: string;
};

export type City = {
  slug: string;
  title: string;
  department: string;
  focus: CityFocus[];
  keywords: string[];

  premium?: boolean;
  intro?: string; // texte simple ou HTML
  useCases?: CityUseCase[];
};

/* =========================================================
   1) Base (tes 120 entrées — inchangées)
   ========================================================= */

export const citiesDataBase: City[] = [
  // Yvelines (78)
  { slug: "plaisir-78370", title: "Sécurité Privée Plaisir", department: "Yvelines (78)", focus: ["bureaux"], keywords: ["sécurité plaisir", "gardiennage 78370"] },
  { slug: "versailles-78000", title: "Sécurité Privée Versailles", department: "Yvelines (78)", focus: ["événementiel", "résidentiel"], keywords: ["sécurité versailles", "gardiennage 78000"] },
  { slug: "saint-germain-en-laye-78100", title: "Sécurité Privée Saint-Germain-en-Laye", department: "Yvelines (78)", focus: ["résidentiel", "luxe"], keywords: ["sécurité saint-germain-en-laye", "gardiennage 78100"] },
  { slug: "montigny-le-bretonneux-78180", title: "Sécurité Privée Montigny-le-Bretonneux", department: "Yvelines (78)", focus: ["bureaux", "tech"], keywords: ["sécurité montigny-le-bretonneux", "gardiennage sqy"] },

  // Paris (75)
  { slug: "paris-1-75001", title: "Sécurité Privée Paris 1er", department: "Paris (75)", focus: [], keywords: [] },
  { slug: "paris-2-75002", title: "Sécurité Privée Paris 2e", department: "Paris (75)", focus: [], keywords: [] },
  { slug: "paris-8-75008", title: "Sécurité Privée Paris 8e", department: "Paris (75)", focus: [], keywords: [] },
  { slug: "paris-9-75009", title: "Sécurité Privée Paris 9e", department: "Paris (75)", focus: [], keywords: [] },
  { slug: "paris-10-75010", title: "Sécurité Privée Paris 10e", department: "Paris (75)", focus: [], keywords: [] },
  { slug: "paris-12-75012", title: "Sécurité Privée Paris 12e", department: "Paris (75)", focus: [], keywords: [] },
  { slug: "paris-13-75013", title: "Sécurité Privée Paris 13e", department: "Paris (75)", focus: [], keywords: [] },
  { slug: "paris-15-75015", title: "Sécurité Privée Paris 15e", department: "Paris (75)", focus: [], keywords: [] },
  { slug: "paris-16-75016", title: "Sécurité Privée Paris 16e", department: "Paris (75)", focus: [], keywords: [] },
  { slug: "paris-17-75017", title: "Sécurité Privée Paris 17e", department: "Paris (75)", focus: [], keywords: [] },

  // Hauts-de-Seine (92)
  { slug: "la-defense-92400", title: "Sécurité Privée La Défense", department: "Hauts-de-Seine (92)", focus: [], keywords: [] },
  { slug: "courbevoie-92400", title: "Sécurité Privée Courbevoie", department: "Hauts-de-Seine (92)", focus: [], keywords: [] },
  { slug: "puteaux-92800", title: "Sécurité Privée Puteaux", department: "Hauts-de-Seine (92)", focus: [], keywords: [] },
  { slug: "neuilly-sur-seine-92200", title: "Sécurité Privée Neuilly-sur-Seine", department: "Hauts-de-Seine (92)", focus: [], keywords: [] },
  { slug: "boulogne-billancourt-92100", title: "Sécurité Privée Boulogne-Billancourt", department: "Hauts-de-Seine (92)", focus: [], keywords: [] },
  { slug: "issy-les-moulineaux-92130", title: "Sécurité Privée Issy-les-Moulineaux", department: "Hauts-de-Seine (92)", focus: [], keywords: [] },
  { slug: "levallois-perret-92300", title: "Sécurité Privée Levallois-Perret", department: "Hauts-de-Seine (92)", focus: ["bureaux"], keywords: ["sécurité levallois", "gardiennage 92300"] },
  
  // Seine-Saint-Denis (93)
  { slug: "saint-denis-93200", title: "Sécurité Privée Saint-Denis", department: "Seine-Saint-Denis (93)", focus: [], keywords: [] },
  { slug: "villepinte-93420", title: "Sécurité Privée Villepinte", department: "Seine-Saint-Denis (93)", focus: [], keywords: [] },
  { slug: "aubervilliers-93300", title: "Sécurité Privée Aubervilliers", department: "Seine-Saint-Denis (93)", focus: [], keywords: [] },
  { slug: "montreuil-93100", title: "Sécurité Privée Montreuil", department: "Seine-Saint-Denis (93)", focus: ["chantiers", "bureaux"], keywords: ["sécurité montreuil", "gardiennage 93100"] },
  { slug: "pantin-93500", title: "Sécurité Privée Pantin", department: "Seine-Saint-Denis (93)", focus: ["logistique", "bureaux"], keywords: ["sécurité pantin", "gardiennage 93500"] },
  
  // Val-de-Marne (94)
  { slug: "rungis-94150", title: "Sécurité Privée Rungis", department: "Val-de-Marne (94)", focus: [], keywords: [] },
  { slug: "orly-94310", title: "Sécurité Privée Orly", department: "Val-de-Marne (94)", focus: [], keywords: [] },
  { slug: "creteil-94000", title: "Sécurité Privée Créteil", department: "Val-de-Marne (94)", focus: [], keywords: [] },
  { slug: "ivry-sur-seine-94200", title: "Sécurité Privée Ivry-sur-Seine", department: "Val-de-Marne (94)", focus: ["logistique", "chantiers"], keywords: ["sécurité ivry-sur-seine", "gardiennage 94200"] },
  { slug: "vitry-sur-seine-94400", title: "Sécurité Privée Vitry-sur-Seine", department: "Val-de-Marne (94)", focus: ["logistique", "industrie"], keywords: ["sécurité vitry-sur-seine", "gardiennage 94400"] },
  
  // Val-d'Oise (95)
  { slug: "roissy-en-france-95700", title: "Sécurité Privée Roissy-en-France", department: "Val-d'Oise (95)", focus: [], keywords: [] },
  { slug: "cergy-95000", title: "Sécurité Privée Cergy", department: "Val-d'Oise (95)", focus: [], keywords: [] },
  { slug: "argenteuil-95100", title: "Sécurité Privée Argenteuil", department: "Val-d'Oise (95)", focus: ["industrie", "chantiers"], keywords: ["sécurité argenteuil", "gardiennage 95100"] },
  { slug: "sarcelles-95200", title: "Sécurité Privée Sarcelles", department: "Val-d'Oise (95)", focus: ["résidentiel", "bureaux"], keywords: ["sécurité sarcelles", "gardiennage 95200"] },
  
  // Essonne (91)
  { slug: "massy-91300", title: "Sécurité Privée Massy", department: "Essonne (91)", focus: [], keywords: [] },
  { slug: "evry-courcouronnes-91000", title: "Sécurité Privée Évry-Courcouronnes", department: "Essonne (91)", focus: ["bureaux"], keywords: ["sécurité evry", "gardiennage 91000"] },
  { slug: "saclay-91400", title: "Sécurité Privée Saclay", department: "Essonne (91)", focus: ["tech"], keywords: ["sécurité saclay", "gardiennage 91400"] },
  { slug: "palaiseau-91120", title: "Sécurité Privée Palaiseau", department: "Essonne (91)", focus: ["tech"], keywords: ["sécurité palaiseau", "gardiennage 91120"] },

  // Seine-et-Marne (77)
  { slug: "marne-la-vallee-77700", title: "Sécurité Privée Marne-la-Vallée", department: "Seine-et-Marne (77)", focus: ["événementiel"], keywords: ["sécurité marne-la-vallee", "gardiennage 77700"] },
  { slug: "meaux-77100", title: "Sécurité Privée Meaux", department: "Seine-et-Marne (77)", focus: ["industrie"], keywords: ["sécurité meaux", "gardiennage 77100"] },
  { slug: "melun-77000", title: "Sécurité Privée Melun", department: "Seine-et-Marne (77)", focus: ["bureaux"], keywords: ["sécurité melun", "gardiennage 77000"] },
  { slug: "serris-77700", title: "Sécurité Privée Serris", department: "Seine-et-Marne (77)", focus: ["événementiel"], keywords: ["sécurité serris", "gardiennage 77700"] },
];

/* =========================================================
   2) Helpers: SEO + cohérence "focus" → contenus
   ========================================================= */

const focusToKeywords: Record<CityFocus, string[]> = {
  luxe: [
    "sécurité luxe",
    "agent de sécurité luxe",
    "gardiennage boutique luxe",
    "sécurité retail premium",
    "sécurité bijouterie",
  ],
  bureaux: [
    "sécurité bureaux",
    "sécurité siège social",
    "contrôle d'accès",
    "accueil filtrant",
    "gardiennage entreprise",
  ],
  chantiers: [
    "sécurité chantier",
    "gardiennage chantier",
    "surveillance chantier nuit",
    "prévention vols matériaux",
    "rondes chantier",
  ],
  logistique: [
    "sécurité logistique",
    "gardiennage entrepôt",
    "sécurité plateforme logistique",
    "contrôle accès camions",
    "surveillance quai",
  ],
  événementiel: [
    "sécurité événementielle",
    "contrôle d'accès événement",
    "gestion de flux",
    "filtrage",
    "sécurité VIP",
  ],
  résidentiel: [
    "sécurité résidence",
    "gardiennage copropriété",
    "rondes de nuit",
    "prévention incivilités",
    "sécurisation parking",
  ],
  tech: [
    "sécurité site sensible",
    "confidentialité",
    "contrôle d'accès strict",
    "protection des données",
    "sécurité campus",
  ],
};

const focusToUseCases: Record<CityFocus, CityUseCase[]> = {
  luxe: [
    {
      icon: "Gem",
      title: "Retail premium & haute valeur",
      content:
        "Prévention des pertes, posture irréprochable, vigilance discrète, protocole d’alerte et coordination avec vos équipes.",
    },
    {
      icon: "Users",
      title: "Accueil & filtrage VIP",
      content:
        "Contrôle des accès, gestion des listes/accréditations, sécurisation des zones privées et back-office.",
    },
    {
      icon: "ShieldCheck",
      title: "Dissuasion & gestion d’incidents",
      content:
        "Détection des comportements à risque, intervention proportionnée et reporting clair (main courante / rapports).",
    },
  ],
  bureaux: [
    {
      icon: "Building2",
      title: "Contrôle d’accès & accueil sûreté",
      content:
        "Gestion visiteurs/prestataires/livraisons, badges, procédures et sécurisation des zones sensibles.",
    },
    {
      icon: "Route",
      title: "Rondes (ouverture/fermeture) & surveillance",
      content:
        "Rondes ciblées, vérifications, prévention intrusion et levées de doute si besoin.",
    },
    {
      icon: "FileText",
      title: "Traçabilité & reporting",
      content:
        "Main courante, rapports d’événements et synthèses pour piloter l’amélioration continue.",
    },
  ],
  chantiers: [
    {
      icon: "HardHat",
      title: "Protection des chantiers (nuit / week-end)",
      content:
        "Prévention vols et vandalisme, sécurisation du périmètre, rondes dissuasives et contrôle des accès.",
    },
    {
      icon: "Truck",
      title: "Contrôle des entrées/sorties & logistique chantier",
      content:
        "Filtrage des véhicules, gestion des livraisons, traçabilité et respect des consignes site.",
    },
    {
      icon: "PawPrint",
      title: "Renfort cynophile (si périmètre étendu)",
      content:
        "Dissuasion élevée et meilleure détection sur grands sites peu éclairés ou exposés aux intrusions.",
    },
  ],
  logistique: [
    {
      icon: "Warehouse",
      title: "Entrepôts & zones de stockage",
      content:
        "Surveillance des zones sensibles, prévention intrusions, rondes périmétriques et levées de doute.",
    },
    {
      icon: "Truck",
      title: "Quais & flux camions",
      content:
        "Contrôle d’accès, gestion des flux, prévention anomalies et coordination exploitation.",
    },
    {
      icon: "ClipboardList",
      title: "Traçabilité & procédures",
      content:
        "Consignes, reporting exploitable et actions correctives pour réduire les incidents récurrents.",
    },
  ],
  événementiel: [
    {
      icon: "Ticket",
      title: "Contrôle d’accès & accréditations",
      content:
        "Filtrage, palpations si nécessaire, gestion des accès techniques et zones VIP selon protocole.",
    },
    {
      icon: "Users",
      title: "Gestion des flux & files d’attente",
      content:
        "Canalisation du public, sécurisation des circulations, prévention des situations de tension.",
    },
    {
      icon: "ClipboardCheck",
      title: "Chef de dispositif & coordination",
      content:
        "Brief, consignes, communication terrain et reporting de fin d’événement.",
    },
  ],
  résidentiel: [
    {
      icon: "Home",
      title: "Résidences & copropriétés",
      content:
        "Surveillance, prévention incivilités, gestion incidents et coordination avec syndic/gestionnaire.",
    },
    {
      icon: "KeyRound",
      title: "Accès parkings / halls / locaux techniques",
      content:
        "Contrôle des accès, prévention intrusions et sécurisation des points sensibles.",
    },
    {
      icon: "Route",
      title: "Rondes nocturnes & levée de doute",
      content:
        "Rondes à horaires variables, dissuasion et intervention selon procédure (alarme, anomalies).",
    },
  ],
  tech: [
    {
      icon: "Cpu",
      title: "Sites tech & sensibles",
      content:
        "Discrétion, maîtrise des accès, respect strict des procédures et culture de la confidentialité.",
    },
    {
      icon: "Lock",
      title: "Zones restreintes & données",
      content:
        "Contrôle des habilitations, traçabilité des passages et sécurisation des zones critiques.",
    },
    {
      icon: "FileSearch",
      title: "Audit & renforcement",
      content:
        "Analyse terrain, identification des failles (flux, accès, process) et plan d’action priorisé.",
    },
  ],
};

function uniqKeepOrder(list: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const x of list) {
    const k = x.trim();
    if (!k) continue;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(k);
  }
  return out;
}

function buildPremiumKeywords(citySlug: string, focus: CityFocus[], extra: string[] = []) {
  const cityKey = citySlug.split("-").slice(0, -1).join(" "); // ex: "paris-8" -> "paris"
  const fromFocus = focus.flatMap((f) => focusToKeywords[f] ?? []);
  return uniqKeepOrder([
    ...extra,
    ...fromFocus,
    `sécurité ${cityKey}`.trim(),
    `agent de sécurité ${cityKey}`.trim(),
    `gardiennage ${cityKey}`.trim(),
  ]);
}

function pickUseCases(focus: CityFocus[]) {
  // Priorité : 3 use cases max, issus du focus. Si plusieurs focus, on mixe.
  const pool = focus.flatMap((f) => focusToUseCases[f] ?? []);
  // dédoublonner par title
  const seen = new Set<string>();
  const out: CityUseCase[] = [];
  for (const uc of pool) {
    if (seen.has(uc.title)) continue;
    seen.add(uc.title);
    out.push(uc);
    if (out.length >= 3) break;
  }
  return out;
}

/* =========================================================
   3) Overrides premium sur villes stratégiques
   - Objectif : intro + useCases + keywords cohérents avec focus
   ========================================================= */

const premiumCityOverrides: Record<string, Partial<City>> = {
  // =========================
  // PARIS (10)
  // =========================
  "paris-1-75001": {
    premium: true,
    focus: ["luxe", "événementiel", "bureaux"],
    intro:
      "Paris 1er concentre des zones à forte exposition (retail premium, flux touristiques, ERP). Nous déployons des dispositifs discrets et efficaces : contrôle d’accès, filtrage, rondes et renforts événementiels, avec reporting clair pour piloter la sûreté au quotidien.",
    useCases: pickUseCases(["luxe", "événementiel", "bureaux"]),
    keywords: buildPremiumKeywords("paris-1-75001", ["luxe", "événementiel", "bureaux"], [
      "sécurité paris 1",
      "agent sécurité 75001",
      "sécurité retail luxe paris",
    ]),
  },

  "paris-2-75002": {
    premium: true,
    focus: ["bureaux", "luxe"],
    intro:
      "Paris 2e est un secteur tertiaire + commerce aux flux denses. Nos dispositifs combinent contrôle d’accès, prévention et traçabilité : gestion visiteurs/prestataires, rondes de fermeture et procédures d’alerte adaptées aux contraintes d’exploitation.",
    useCases: pickUseCases(["bureaux", "luxe"]),
    keywords: buildPremiumKeywords("paris-2-75002", ["bureaux", "luxe"], [
      "sécurité paris 2",
      "gardiennage 75002",
      "contrôle d'accès paris",
    ]),
  },

  "paris-8-75008": {
    premium: true,
    focus: ["luxe", "bureaux", "événementiel"],
    intro:
      "Paris 8e (Champs-Élysées, hôtels, sièges sociaux, boutiques de luxe) exige une présentation irréprochable et une discrétion totale. Nous mettons en place des équipes adaptées : accueil filtrant, prévention, renfort événementiel et sécurisation des zones à haute valeur.",
    useCases: pickUseCases(["luxe", "bureaux", "événementiel"]),
    keywords: buildPremiumKeywords("paris-8-75008", ["luxe", "bureaux", "événementiel"], [
      "sécurité paris 8",
      "gardiennage champs-élysées",
      "sécurité événementielle prestige paris",
    ]),
  },

  "paris-9-75009": {
    premium: true,
    focus: ["bureaux", "luxe", "événementiel"],
    intro:
      "Paris 9e combine bureaux, commerces et lieux à forte fréquentation. Nous assurons prévention, dissuasion et gestion des flux avec un dispositif cadré (consignes + reporting) et des renforts ponctuels en cas d’affluence ou d’événement.",
    useCases: pickUseCases(["bureaux", "luxe", "événementiel"]),
    keywords: buildPremiumKeywords("paris-9-75009", ["bureaux", "luxe", "événementiel"], [
      "sécurité paris 9",
      "gardiennage 75009",
    ]),
  },

  "paris-10-75010": {
    premium: true,
    focus: ["bureaux", "événementiel", "résidentiel"],
    intro:
      "Paris 10e est marqué par des flux importants et des horaires étendus. Nous dimensionnons un dispositif opérationnel : contrôle d’accès, rondes ciblées et procédures d’intervention pour sécuriser les sites exposés sans dégrader la fluidité.",
    useCases: pickUseCases(["événementiel", "bureaux", "résidentiel"]),
    keywords: buildPremiumKeywords("paris-10-75010", ["bureaux", "événementiel", "résidentiel"], [
      "sécurité paris 10",
      "gardiennage 75010",
    ]),
  },

  "paris-12-75012": {
    premium: true,
    focus: ["logistique", "événementiel", "bureaux"],
    intro:
      "Paris 12e se distingue par ses pôles de transport, ERP et zones d’activité. Nous déployons des dispositifs mixtes : gestion des flux, contrôle d’accès, rondes et renforts ponctuels, avec traçabilité et procédures claires.",
    useCases: pickUseCases(["logistique", "événementiel", "bureaux"]),
    keywords: buildPremiumKeywords("paris-12-75012", ["logistique", "événementiel", "bureaux"], [
      "sécurité paris 12",
      "sécurité logistique paris",
    ]),
  },

  "paris-13-75013": {
    premium: true,
    focus: ["chantiers", "bureaux", "tech"],
    intro:
      "Paris 13e combine bureaux modernes, sites en transformation et zones tertiaires. Nous sécurisons vos sites en phase travaux et vos bâtiments en exploitation : contrôle d’accès, rondes, prévention des intrusions et coordination avec vos systèmes (procédures).",
    useCases: pickUseCases(["chantiers", "bureaux", "tech"]),
    keywords: buildPremiumKeywords("paris-13-75013", ["chantiers", "bureaux", "tech"], [
      "sécurité paris 13",
      "gardiennage chantier paris",
    ]),
  },

  "paris-15-75015": {
    premium: true,
    focus: ["bureaux", "résidentiel", "tech"],
    intro:
      "Paris 15e : densité tertiaire, résidences et ERP. Nous proposons un dispositif stable et rigoureux : postes fixes, rondes, gestion d’accès et reporting, avec une posture discrète et professionnelle.",
    useCases: pickUseCases(["bureaux", "résidentiel", "tech"]),
    keywords: buildPremiumKeywords("paris-15-75015", ["bureaux", "résidentiel", "tech"], [
      "sécurité paris 15",
      "gardiennage 75015",
    ]),
  },

  "paris-16-75016": {
    premium: true,
    focus: ["résidentiel", "luxe"],
    intro:
      "Paris 16e : environnement résidentiel haut de gamme et exigences de confidentialité. Nous déployons une sécurité orientée discrétion, prévention et maîtrise des accès (visiteurs, prestataires, zones privées), avec des procédures strictes.",
    useCases: pickUseCases(["résidentiel", "luxe"]),
    keywords: buildPremiumKeywords("paris-16-75016", ["résidentiel", "luxe"], [
      "sécurité paris 16",
      "sécurité résidence standing paris",
    ]),
  },

  "paris-17-75017": {
    premium: true,
    focus: ["bureaux", "luxe", "résidentiel"],
    intro:
      "Paris 17e mixe sièges, commerces et résidences. Nos dispositifs sont flexibles : accueil filtrant, postes fixes, rondes, prévention des incidents et renforts ponctuels, avec un suivi opérationnel clair.",
    useCases: pickUseCases(["bureaux", "résidentiel", "luxe"]),
    keywords: buildPremiumKeywords("paris-17-75017", ["bureaux", "luxe", "résidentiel"], [
      "sécurité paris 17",
      "gardiennage 75017",
    ]),
  },

  // =========================
  // 92 (6)
  // =========================
  "la-defense-92400": {
    premium: true,
    focus: ["bureaux", "tech"],
    intro:
      "La Défense : tours, IGH, sièges sociaux et flux massifs. Nous déployons des dispositifs structurés : contrôle d’accès, gestion visiteurs, rondes, coordination PC sécurité et reporting. Objectif : continuité, traçabilité et niveau de service irréprochable.",
    useCases: pickUseCases(["bureaux", "tech"]),
    keywords: buildPremiumKeywords("la-defense-92400", ["bureaux", "tech"], [
      "sécurité la défense",
      "gardiennage tours la défense",
      "contrôle d'accès sièges sociaux",
    ]),
  },

  "courbevoie-92400": {
    premium: true,
    focus: ["bureaux", "événementiel"],
    intro:
      "Courbevoie : continuité directe avec l’écosystème de La Défense. Nous sécurisons bureaux, sites multi-accès et événements corporate via contrôle d’accès, rondes et procédures, avec reporting régulier.",
    useCases: pickUseCases(["bureaux", "événementiel"]),
    keywords: buildPremiumKeywords("courbevoie-92400", ["bureaux", "événementiel"], [
      "sécurité courbevoie",
      "gardiennage 92400",
    ]),
  },

  "puteaux-92800": {
    premium: true,
    focus: ["bureaux", "tech"],
    intro:
      "Puteaux : bureaux, tours et sites à forte valeur. Nous mettons en place un dispositif discret mais très structuré : consignes, contrôle d’accès, rondes et traçabilité, avec supervision qualité.",
    useCases: pickUseCases(["bureaux", "tech"]),
    keywords: buildPremiumKeywords("puteaux-92800", ["bureaux", "tech"], [
      "sécurité puteaux",
      "gardiennage 92800",
    ]),
  },

  "neuilly-sur-seine-92200": {
    premium: true,
    focus: ["résidentiel", "luxe", "bureaux"],
    intro:
      "Neuilly-sur-Seine : résidentiel premium et sièges exigeants. Nous intervenons avec une sécurité orientée discrétion : filtrage, rondes, prévention des incidents et respect strict des procédures internes.",
    useCases: pickUseCases(["résidentiel", "luxe", "bureaux"]),
    keywords: buildPremiumKeywords("neuilly-sur-seine-92200", ["résidentiel", "luxe", "bureaux"], [
      "sécurité neuilly-sur-seine",
      "gardiennage neuilly",
    ]),
  },

  "boulogne-billancourt-92100": {
    premium: true,
    focus: ["bureaux", "tech"],
    intro:
      "Boulogne-Billancourt : forte densité tertiaire et sites multi-occupants. Nous sécurisons accès, flux et zones sensibles via procédures claires, rondes et reporting exploitable pour vos équipes.",
    useCases: pickUseCases(["bureaux", "tech"]),
    keywords: buildPremiumKeywords("boulogne-billancourt-92100", ["bureaux", "tech"], [
      "sécurité boulogne-billancourt",
      "gardiennage 92100",
    ]),
  },

  "issy-les-moulineaux-92130": {
    premium: true,
    focus: ["tech", "bureaux"],
    intro:
      "Issy-les-Moulineaux : pôles tech, sièges et exigences de confidentialité. Nous déployons une sécurité orientée contrôle d’accès, process stricts, discrétion et continuité de service, avec traçabilité.",
    useCases: pickUseCases(["tech", "bureaux"]),
    keywords: buildPremiumKeywords("issy-les-moulineaux-92130", ["tech", "bureaux"], [
      "sécurité issy-les-moulineaux",
      "gardiennage 92130",
    ]),
  },

  // =========================
  // 93 (3)
  // =========================
  "saint-denis-93200": {
    premium: true,
    focus: ["chantiers", "événementiel", "logistique"],
    intro:
      "Saint-Denis : grands flux, chantiers, événements et zones en transformation. Nous sécurisons chantiers, ERP et sites sensibles : contrôle d’accès, rondes dissuasives, renforts ponctuels et reporting clair.",
    useCases: pickUseCases(["chantiers", "événementiel", "logistique"]),
    keywords: buildPremiumKeywords("saint-denis-93200", ["chantiers", "événementiel", "logistique"], [
      "sécurité saint-denis",
      "gardiennage 93200",
    ]),
  },

  "villepinte-93420": {
    premium: true,
    focus: ["événementiel", "logistique"],
    intro:
      "Villepinte : salons, expositions et logistique autour des événements. Nos dispositifs couvrent contrôle d’accès, accréditations, gestion des flux, zones techniques et coordination opérationnelle.",
    useCases: pickUseCases(["événementiel", "logistique"]),
    keywords: buildPremiumKeywords("villepinte-93420", ["événementiel", "logistique"], [
      "sécurité villepinte",
      "sécurité salon parc expo villepinte",
    ]),
  },

  "aubervilliers-93300": {
    premium: true,
    focus: ["logistique", "chantiers"],
    intro:
      "Aubervilliers : entrepôts, logistique, chantiers et sites industriels. Nous renforçons la sûreté via contrôle d’accès, rondes, levées de doute et renfort cynophile selon configuration.",
    useCases: pickUseCases(["logistique", "chantiers"]),
    keywords: buildPremiumKeywords("aubervilliers-93300", ["logistique", "chantiers"], [
      "sécurité aubervilliers",
      "gardiennage entrepôt aubervilliers",
    ]),
  },

  // =========================
  // 94 (3)
  // =========================
  "rungis-94150": {
    premium: true,
    focus: ["logistique"],
    intro:
      "Rungis : logistique critique et flux de marchandises. Nous sécurisons accès, quais, zones de stockage et rotations, avec procédures strictes et traçabilité (main courante / rapports).",
    useCases: pickUseCases(["logistique"]),
    keywords: buildPremiumKeywords("rungis-94150", ["logistique"], [
      "sécurité rungis",
      "gardiennage rungis",
      "sécurité quai logistique",
    ]),
  },

  "orly-94310": {
    premium: true,
    focus: ["logistique", "tech"],
    intro:
      "Orly : zone à forte sensibilité logistique et technique. Nous proposons contrôle d’accès, rondes, levées de doute et dispositifs adaptés aux horaires étendus, avec respect strict des consignes et reporting.",
    useCases: pickUseCases(["logistique", "tech"]),
    keywords: buildPremiumKeywords("orly-94310", ["logistique", "tech"], [
      "sécurité orly",
      "gardiennage 94310",
    ]),
  },

  "creteil-94000": {
    premium: true,
    focus: ["bureaux", "résidentiel", "événementiel"],
    intro:
      "Créteil : bureaux, ERP et zones résidentielles. Nous dimensionnons des dispositifs stables (postes, rondes, gestion de flux), avec une capacité de renfort selon périodes d’affluence et besoin de traçabilité.",
    useCases: pickUseCases(["bureaux", "résidentiel", "événementiel"]),
    keywords: buildPremiumKeywords("creteil-94000", ["bureaux", "résidentiel", "événementiel"], [
      "sécurité créteil",
      "gardiennage 94000",
    ]),
  },

  // =========================
  // 95 (2)
  // =========================
  "roissy-en-france-95700": {
    premium: true,
    focus: ["logistique", "tech"],
    intro:
      "Roissy-en-France : logistique, fret et flux techniques. Nous sécurisons sites multi-accès, zones de stockage et entrées/sorties avec procédures strictes, rondes et reporting, pour réduire intrusions et incidents.",
    useCases: pickUseCases(["logistique", "tech"]),
    keywords: buildPremiumKeywords("roissy-en-france-95700", ["logistique", "tech"], [
      "sécurité roissy",
      "gardiennage roissy",
      "sécurité plateforme logistique roissy",
    ]),
  },

  "cergy-95000": {
    premium: true,
    focus: ["bureaux", "résidentiel", "tech"],
    intro:
      "Cergy : bureaux, pôles administratifs et résidentiel. Nous assurons un dispositif clair : contrôle d’accès, rondes, prévention et reporting, avec une organisation stable et pilotable.",
    useCases: pickUseCases(["bureaux", "résidentiel", "tech"]),
    keywords: buildPremiumKeywords("cergy-95000", ["bureaux", "résidentiel", "tech"], [
      "sécurité cergy",
      "gardiennage 95000",
    ]),
  },

  // =========================
  // 91 (1)
  // =========================
  "massy-91300": {
    premium: true,
    focus: ["tech", "bureaux", "logistique"],
    intro:
      "Massy : hub transport + tertiaire + tech. Nous proposons contrôle d’accès, sécurité de site et rondes, avec capacité de renfort selon les pics d’activité et exigences de confidentialité.",
    useCases: pickUseCases(["tech", "bureaux", "logistique"]),
    keywords: buildPremiumKeywords("massy-91300", ["tech", "bureaux", "logistique"], [
      "sécurité massy",
      "gardiennage 91300",
    ]),
  },
};

/* =========================================================
   4) Export final : base + overrides premium
   - Important: on ne remplace pas ta base si elle a déjà focus/keywords,
     on les fusionne intelligemment.
   ========================================================= */

function mergeCity(base: City, over?: Partial<City>): City {
  if (!over) return base;

  const mergedFocus = uniqKeepOrder([...(base.focus ?? []), ...((over.focus as CityFocus[]) ?? [])]) as CityFocus[];

  const mergedKeywords = uniqKeepOrder([
    ...(base.keywords ?? []),
    ...((over.keywords as string[]) ?? []),
  ]);

  const mergedUseCases =
    over.useCases && over.useCases.length
      ? over.useCases
      : base.useCases;

  return {
    ...base,
    ...over,
    focus: mergedFocus,
    keywords: mergedKeywords,
    useCases: mergedUseCases,
  };
}

export const citiesData: City[] = citiesDataBase.map((c) => mergeCity(c, premiumCityOverrides[c.slug]));
