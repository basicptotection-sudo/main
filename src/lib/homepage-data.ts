// src/lib/home-data.ts
import { sectorsData } from "./secteurs-data";

/**
 * Home – data “haut niveau”
 * Objectif : crédible, orienté conversion, et SEO-friendly.
 * - claims mesurées (pas de promesses risquées)
 * - vocabulaire métier (consignes, main courante, levée de doute, PC, etc.)
 * - cohérence avec tes pages secteurs + services
 */

export const trustElements = [
  {
    icon: "ShieldCheck",
    title: "Conformité, encadrement, traçabilité",
    description:
      "Agents titulaires d’une carte professionnelle CNAPS, dispositif cadré (consignes, points de contrôle) et management de proximité. Contrôles qualité et traçabilité systématique.",
  },
  {
    icon: "FileText",
    title: "Consignes & reporting actionnable",
    description:
      "Main courante, rapports d’activité et synthèses exploitables : vous suivez la prestation, les incidents, les actions correctives et l’évolution du risque sur site.",
  },
  {
    icon: "MapPin",
    title: "Réactivité en Île-de-France",
    description:
      "Basés à Plaisir (78), nous intervenons sur Paris et toute l’Île-de-France. Renforts, mises en place planifiées et continuité de service selon le contexte.",
  },
  {
    icon: "Lock",
    title: "Discrétion & confidentialité",
    description:
      "Posture irréprochable, confidentialité et respect des procédures internes : environnements sensibles (sièges, VIP, retail premium, institutionnels, événements).",
  },
];

export const processSteps = [
  {
    icon: "MessageCircle",
    title: "1. Cadrage & analyse du risque",
    description:
      "Échange + collecte des informations clés (flux, horaires, points sensibles, antécédents, contraintes). Objectif : un besoin clair, une mission cadrée, des indicateurs simples.",
  },
  {
    icon: "ClipboardList",
    title: "2. Plan de mission & consignes",
    description:
      "Définition des postes, rondes, contrôles, protocole incidents, procédures d’accès et modalités de reporting. Validation avant démarrage pour une exécution fluide.",
  },
  {
    icon: "Users",
    title: "3. Déploiement & supervision",
    description:
      "Mise en place des équipes, prise de poste cadrée et pilotage terrain. Ajustements opérationnels si besoin (flux, horaires, périmètre) avec un interlocuteur identifié.",
  },
  {
    icon: "TrendingUp",
    title: "4. Suivi & amélioration continue",
    description:
      "Rapports, points réguliers et actions correctives. Le dispositif évolue avec votre activité, vos pics de fréquentation, vos contraintes et les retours terrain.",
  },
];

export const sectors = sectorsData.map((sector) => ({
  icon: sector.icon,
  name: sector.name,
  href: `/secteurs/${sector.slug}`,
}));

export const testimonials = [
  {
    quote:
      "Une équipe professionnelle qui a compris nos contraintes. Communication simple, dispositif cadré, consignes appliquées et remontées terrain exploitables.",
    name: "Directeur sûreté",
    role: "Groupe industriel — Île-de-France",
  },
  {
    quote:
      "Dispositif discret et efficace pour notre événement. Gestion des accès et des flux, présence rassurante, coordination fluide avec l’organisation.",
    name: "Responsable événementiel",
    role: "Agence — Paris",
  },
  {
    quote:
      "Réactivité et sérieux. Rapports clairs, agents professionnels, et un pilotage terrain qui fait la différence sur la durée.",
    name: "Gestionnaire de site",
    role: "Parc tertiaire — Yvelines",
  },
];

/**
 * FAQ “SEO money”
 * - prix, délais, cadre, documents, déroulé
 * - réponses factuelles (sans promesses absolues)
 */
export const faqItems = [
  {
    question: "Quelle est votre zone d’intervention ?",
    answer:
      "Nous intervenons sur toute l’Île-de-France : Paris (75), 78, 92, 93, 94, 91, 95 et 77. La réactivité dépend du type de mission, des horaires, du niveau de risque et du dispositif attendu (poste fixe, rondes, événement, SSIAP, etc.).",
  },
  {
    question: "Quel délai pour mettre en place un dispositif ?",
    answer:
      "Selon le contexte, une mise en place peut être rapide (renfort, urgence, événement ponctuel) ou nécessiter un cadrage plus complet (sites sensibles, consignes détaillées, multi-sites). Nous validons d’abord le besoin, puis planifions un déploiement réaliste et encadré.",
  },
  {
    question: "Quels types de missions proposez-vous ?",
    answer:
      "Contrôle d’accès, gardiennage, rondes (pédestres/véhiculées), levée de doute, sécurité événementielle, agents cynophiles selon configuration, et sécurité incendie (SSIAP) lorsque requis. Le choix dépend du site, des flux et des risques.",
  },
  {
    question: "Comment garantissez-vous la qualité de vos agents ?",
    answer:
      "Agents avec carte professionnelle CNAPS valide, consignes formalisées, management de proximité, contrôles qualité, et reporting (main courante / rapports). Nous privilégions une exécution cadrée et traçable plutôt qu’une “présence” non pilotée.",
  },
  {
    question: "Quel est le prix d’un agent de sécurité ?",
    answer:
      "Le tarif dépend du volume horaire, des horaires (jour/nuit/week-end), du niveau de risque, de la technicité (SSIAP, cynophile), du lieu et des contraintes d’accès. Après analyse, nous transmettons un devis structuré et transparent, avec le détail du dispositif.",
  },
  {
    question: "Comment est établi un devis ?",
    answer:
      "Nous cadrons d’abord : périmètre, horaires, postes, rondes, points de contrôle, consignes, procédures incidents et reporting. Ensuite, nous chiffrons selon le volume, le niveau d’encadrement et les contraintes terrain.",
  },
  {
    question: "Pouvez-vous sécuriser plusieurs sites avec une organisation centralisée ?",
    answer:
      "Oui. Pour les groupes, syndics, gestionnaires multi-sites ou donneurs d’ordre, nous pouvons organiser une approche homogène (consignes, reporting, référents) tout en adaptant le dispositif site par site.",
  },
  {
    question: "Proposez-vous des services pour les particuliers ?",
    answer:
      "Oui selon les situations : surveillance de résidences et protection de personnes (sur demande et selon le cadre réglementaire). Nous évaluons d’abord le contexte et les risques pour proposer une solution adaptée et discrète.",
  },
  {
    question: "Que faut-il préparer pour démarrer une mission ?",
    answer:
      "Horaires, accès (clés/badges), zones à surveiller, consignes spécifiques, contacts sur site, procédures en cas d’incident, et règles internes (confidentialité, accueil, flux). Nous vous aidons à formaliser ces éléments pour sécuriser le démarrage.",
  },
];
