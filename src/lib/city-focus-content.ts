import { CityFocus } from "@/lib/cities-data";

export type FocusBlock = {
  title: string;
  content: string;
  services: string[]; // slugs services
};

export const CITY_FOCUS_CONTENT: Record<CityFocus, FocusBlock> = {
  luxe: {
    title: "Sécurité haut de gamme & environnements sensibles",
    content:
      "Dans les zones à forte valeur (boutiques de luxe, résidences de standing, sièges prestigieux), la sécurité doit être à la fois dissuasive, discrète et irréprochable dans sa présentation. Nos agents sont formés aux codes du luxe, à la confidentialité et à la gestion de publics exigeants.",
    services: [
      "agent-securite-qualifie",
      "protection-rapprochee",
      "securite-evenementielle",
    ],
  },

  bureaux: {
    title: "Sécurité des bureaux et immeubles tertiaires",
    content:
      "Les immeubles de bureaux nécessitent un contrôle strict des accès, une gestion fluide des visiteurs et une vigilance continue. Nous mettons en place des dispositifs clairs, structurés et adaptés aux horaires étendus.",
    services: [
      "agent-securite-qualifie",
      "agent-rondier",
      "audit-conseil-surete",
    ],
  },

  chantiers: {
    title: "Sécurisation des chantiers et sites en travaux",
    content:
      "Les chantiers sont particulièrement exposés aux intrusions, vols de matériel et dégradations. Nos dispositifs incluent contrôle d’accès, rondes, surveillance nocturne et renfort cynophile selon la configuration.",
    services: [
      "agent-securite-qualifie",
      "agent-cynophile",
      "agent-rondier",
    ],
  },

  logistique: {
    title: "Sécurité logistique & flux de marchandises",
    content:
      "Les plateformes logistiques exigent une maîtrise totale des flux entrants et sortants. Nous assurons le contrôle des accès, la surveillance des quais, la prévention des intrusions et la traçabilité des interventions.",
    services: [
      "agent-securite-qualifie",
      "agent-rondier",
      "agent-cynophile",
    ],
  },

  événementiel: {
    title: "Sécurité événementielle et gestion des flux",
    content:
      "Salons, galas, lancements ou événements privés nécessitent une organisation rigoureuse. Nos équipes assurent contrôle d’accès, gestion des flux, zones VIP et coordination terrain.",
    services: [
      "securite-evenementielle",
      "agent-securite-qualifie",
    ],
  },

  résidentiel: {
    title: "Sécurité résidentielle et copropriétés",
    content:
      "Pour les résidences et copropriétés, la priorité est la tranquillité des occupants. Nous mettons en place une présence rassurante, des rondes régulières et une prévention des incivilités.",
    services: [
      "agent-securite-qualifie",
      "agent-rondier",
    ],
  },

  tech: {
    title: "Sécurité des sites technologiques et sensibles",
    content:
      "Les sites technologiques exigent un haut niveau de confidentialité et de rigueur. Nous appliquons des procédures strictes de contrôle d’accès, de traçabilité et de reporting.",
    services: [
      "agent-securite-qualifie",
      "audit-conseil-surete",
    ],
  },
};
