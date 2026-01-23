export type CityFocus =
  | "luxe"
  | "bureaux"
  | "chantiers"
  | "logistique"
  | "événementiel"
  | "résidentiel"
  | "tech";

export type City = {
  slug: string;               // ex: "la-defense-92400"
  name: string;               // ex: "La Défense"
  title: string;              // ex: "Sécurité Privée La Défense (92)"
  department: string;         // ex: "Hauts-de-Seine (92)"
  deptCode: "75" | "77" | "78" | "91" | "92" | "93" | "94" | "95";
  focus: CityFocus[];
  keywords: string[];
  // optionnel mais très utile pour ton futur contenu / JSON-LD
  postalCode?: string;
};

export const citiesData: City[] = [
  // ======================
  // Yvelines (78)
  // ======================
  {
    slug: "plaisir-78370",
    name: "Plaisir",
    title: "Sécurité Privée Plaisir (78370)",
    department: "Yvelines (78)",
    deptCode: "78",
    focus: ["bureaux", "résidentiel"],
    keywords: ["sécurité plaisir", "gardiennage plaisir", "agent de sécurité plaisir"],
    postalCode: "78370",
  },
  {
    slug: "versailles-78000",
    name: "Versailles",
    title: "Sécurité Privée Versailles (78000)",
    department: "Yvelines (78)",
    deptCode: "78",
    focus: ["résidentiel", "événementiel"],
    keywords: ["sécurité versailles", "gardiennage versailles", "agent de sécurité versailles"],
    postalCode: "78000",
  },
  {
    slug: "saint-germain-en-laye-78100",
    name: "Saint-Germain-en-Laye",
    title: "Sécurité Privée Saint-Germain-en-Laye (78100)",
    department: "Yvelines (78)",
    deptCode: "78",
    focus: ["résidentiel", "luxe"],
    keywords: ["sécurité saint-germain-en-laye", "gardiennage saint-germain-en-laye"],
    postalCode: "78100",
  },
  {
    slug: "montigny-le-bretonneux-78180",
    name: "Montigny-le-Bretonneux",
    title: "Sécurité Privée Montigny-le-Bretonneux (78180)",
    department: "Yvelines (78)",
    deptCode: "78",
    focus: ["bureaux", "tech"],
    keywords: ["sécurité montigny", "gardiennage SQY", "sécurité saint-quentin-en-yvelines"],
    postalCode: "78180",
  },
  {
    slug: "poissy-78300",
    name: "Poissy",
    title: "Sécurité Privée Poissy (78300)",
    department: "Yvelines (78)",
    deptCode: "78",
    focus: ["logistique", "bureaux"],
    keywords: ["sécurité poissy", "gardiennage poissy", "agent de sécurité 78300"],
    postalCode: "78300",
  },

  // ======================
  // Paris (75)
  // ======================
  {
    slug: "paris-8-75008",
    name: "Paris 8e",
    title: "Sécurité Privée Paris 8ème (75008)",
    department: "Paris (75)",
    deptCode: "75",
    focus: ["luxe", "bureaux", "événementiel"],
    keywords: ["sécurité paris 8", "gardiennage champs-élysées", "sécurité boutiques de luxe paris"],
    postalCode: "75008",
  },
  {
    slug: "paris-16-75016",
    name: "Paris 16e",
    title: "Sécurité Privée Paris 16ème (75016)",
    department: "Paris (75)",
    deptCode: "75",
    focus: ["résidentiel", "luxe"],
    keywords: ["sécurité paris 16", "gardiennage passy", "protection rapprochée paris 16"],
    postalCode: "75016",
  },
  {
    slug: "paris-1-75001",
    name: "Paris 1er",
    title: "Sécurité Privée Paris 1er (75001)",
    department: "Paris (75)",
    deptCode: "75",
    focus: ["luxe", "événementiel"],
    keywords: ["sécurité paris 1", "gardiennage paris 1", "sécurité événementielle paris"],
    postalCode: "75001",
  },
  {
    slug: "paris-2-75002",
    name: "Paris 2e",
    title: "Sécurité Privée Paris 2ème (75002)",
    department: "Paris (75)",
    deptCode: "75",
    focus: ["bureaux", "luxe"],
    keywords: ["sécurité paris 2", "gardiennage paris 2", "sécurité bureaux paris 2"],
    postalCode: "75002",
  },

  // ======================
  // Hauts-de-Seine (92)
  // ======================
  {
    slug: "la-defense-92400",
    name: "La Défense",
    title: "Sécurité Privée La Défense (92)",
    department: "Hauts-de-Seine (92)",
    deptCode: "92",
    focus: ["bureaux", "tech"],
    keywords: ["sécurité la défense", "sûreté IGH", "sécurité tour bureaux la défense"],
    postalCode: "92400",
  },
  {
    slug: "neuilly-sur-seine-92200",
    name: "Neuilly-sur-Seine",
    title: "Sécurité Privée Neuilly-sur-Seine (92200)",
    department: "Hauts-de-Seine (92)",
    deptCode: "92",
    focus: ["résidentiel", "bureaux", "luxe"],
    keywords: ["sécurité neuilly", "gardiennage neuilly", "protection rapprochée neuilly"],
    postalCode: "92200",
  },
  {
    slug: "boulogne-billancourt-92100",
    name: "Boulogne-Billancourt",
    title: "Sécurité Privée Boulogne-Billancourt (92100)",
    department: "Hauts-de-Seine (92)",
    deptCode: "92",
    focus: ["bureaux", "résidentiel"],
    keywords: ["sécurité boulogne", "gardiennage 92100", "sécurité bureaux boulogne"],
    postalCode: "92100",
  },
  {
    slug: "levallois-perret-92300",
    name: "Levallois-Perret",
    title: "Sécurité Privée Levallois-Perret (92300)",
    department: "Hauts-de-Seine (92)",
    deptCode: "92",
    focus: ["bureaux", "résidentiel"],
    keywords: ["sécurité levallois", "gardiennage 92300", "agent de sécurité levallois"],
    postalCode: "92300",
  },
  {
    slug: "puteaux-92800",
    name: "Puteaux",
    title: "Sécurité Privée Puteaux (92800)",
    department: "Hauts-de-Seine (92)",
    deptCode: "92",
    focus: ["bureaux", "événementiel"],
    keywords: ["sécurité puteaux", "gardiennage puteaux", "sécurité la défense puteaux"],
    postalCode: "92800",
  },

  // ======================
  // Seine-Saint-Denis (93)
  // ======================
  {
    slug: "saint-denis-93200",
    name: "Saint-Denis",
    title: "Sécurité Privée Saint-Denis (93200)",
    department: "Seine-Saint-Denis (93)",
    deptCode: "93",
    focus: ["chantiers", "événementiel"],
    keywords: ["sécurité saint-denis", "gardiennage 93", "sécurité chantier saint-denis"],
    postalCode: "93200",
  },
  {
    slug: "aubervilliers-93300",
    name: "Aubervilliers",
    title: "Sécurité Privée Aubervilliers (93300)",
    department: "Seine-Saint-Denis (93)",
    deptCode: "93",
    focus: ["logistique", "chantiers"],
    keywords: ["sécurité aubervilliers", "gardiennage entrepôt 93", "sécurité logistique aubervilliers"],
    postalCode: "93300",
  },
  {
    slug: "tremblay-en-france-93290",
    name: "Tremblay-en-France",
    title: "Sécurité Privée Tremblay-en-France (93290)",
    department: "Seine-Saint-Denis (93)",
    deptCode: "93",
    focus: ["logistique", "tech"],
    keywords: ["sécurité tremblay", "gardiennage 93290", "sécurité zone logistique"],
    postalCode: "93290",
  },

  // ======================
  // Val-de-Marne (94)
  // ======================
  {
    slug: "rungis-94150",
    name: "Rungis",
    title: "Sécurité Privée Rungis (94150)",
    department: "Val-de-Marne (94)",
    deptCode: "94",
    focus: ["logistique"],
    keywords: ["sécurité rungis", "gardiennage MIN rungis", "sécurité plateforme logistique rungis"],
    postalCode: "94150",
  },
  {
    slug: "creteil-94000",
    name: "Créteil",
    title: "Sécurité Privée Créteil (94000)",
    department: "Val-de-Marne (94)",
    deptCode: "94",
    focus: ["bureaux", "résidentiel"],
    keywords: ["sécurité créteil", "gardiennage 94", "agent de sécurité créteil"],
    postalCode: "94000",
  },
  {
    slug: "ivry-sur-seine-94200",
    name: "Ivry-sur-Seine",
    title: "Sécurité Privée Ivry-sur-Seine (94200)",
    department: "Val-de-Marne (94)",
    deptCode: "94",
    focus: ["logistique", "bureaux"],
    keywords: ["sécurité ivry", "gardiennage ivry", "sécurité entrepôt ivry"],
    postalCode: "94200",
  },

  // ======================
  // Essonne (91)
  // ======================
  {
    slug: "saclay-91400",
    name: "Saclay",
    title: "Sécurité Privée Saclay (91400)",
    department: "Essonne (91)",
    deptCode: "91",
    focus: ["tech", "bureaux"],
    keywords: ["sécurité saclay", "gardiennage campus", "sécurité site technologique saclay"],
    postalCode: "91400",
  },
  {
    slug: "massy-91300",
    name: "Massy",
    title: "Sécurité Privée Massy (91300)",
    department: "Essonne (91)",
    deptCode: "91",
    focus: ["bureaux", "tech", "logistique"],
    keywords: ["sécurité massy", "gardiennage 91", "sécurité bureaux massy"],
    postalCode: "91300",
  },
  {
    slug: "evry-courcouronnes-91000",
    name: "Évry-Courcouronnes",
    title: "Sécurité Privée Évry-Courcouronnes (91000)",
    department: "Essonne (91)",
    deptCode: "91",
    focus: ["bureaux", "logistique"],
    keywords: ["sécurité évry", "gardiennage évry", "sécurité zone d'activités 91"],
    postalCode: "91000",
  },

  // ======================
  // Seine-et-Marne (77)
  // ======================
  {
    slug: "marne-la-vallee-77700",
    name: "Marne-la-Vallée",
    title: "Sécurité Privée Marne-la-Vallée (77)",
    department: "Seine-et-Marne (77)",
    deptCode: "77",
    focus: ["événementiel", "logistique", "bureaux"],
    keywords: ["sécurité marne-la-vallée", "gardiennage 77", "sécurité événementielle 77"],
    postalCode: "77700",
  },
  {
    slug: "meaux-77100",
    name: "Meaux",
    title: "Sécurité Privée Meaux (77100)",
    department: "Seine-et-Marne (77)",
    deptCode: "77",
    focus: ["résidentiel", "bureaux"],
    keywords: ["sécurité meaux", "gardiennage meaux", "agent de sécurité 77100"],
    postalCode: "77100",
  },
  {
    slug: "melun-77000",
    name: "Melun",
    title: "Sécurité Privée Melun (77000)",
    department: "Seine-et-Marne (77)",
    deptCode: "77",
    focus: ["bureaux", "résidentiel"],
    keywords: ["sécurité melun", "gardiennage melun", "sécurité 77000"],
    postalCode: "77000",
  },

  // ======================
  // Val-d'Oise (95)
  // ======================
  {
    slug: "roissy-en-france-95700",
    name: "Roissy-en-France",
    title: "Sécurité Privée Roissy-en-France (95)",
    department: "Val-d'Oise (95)",
    deptCode: "95",
    focus: ["logistique", "tech"],
    keywords: ["sécurité roissy", "gardiennage roissy", "sécurité plateforme logistique roissy"],
    postalCode: "95700",
  },
  {
    slug: "cergy-95000",
    name: "Cergy",
    title: "Sécurité Privée Cergy (95000)",
    department: "Val-d'Oise (95)",
    deptCode: "95",
    focus: ["bureaux", "résidentiel"],
    keywords: ["sécurité cergy", "gardiennage cergy", "agent de sécurité 95000"],
    postalCode: "95000",
  },
  {
    slug: "argenteuil-95100",
    name: "Argenteuil",
    title: "Sécurité Privée Argenteuil (95100)",
    department: "Val-d'Oise (95)",
    deptCode: "95",
    focus: ["bureaux", "résidentiel", "chantiers"],
    keywords: ["sécurité argenteuil", "gardiennage argenteuil", "sécurité chantier 95"],
    postalCode: "95100",
  },
];
