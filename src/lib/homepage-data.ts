import { sectorsData } from './secteurs-data';

export const trustElements = [
  {
    icon: "ShieldCheck",
    title: "Conformité & Encadrement",
    description:
      "Agents titulaires d’une carte professionnelle (CNAPS) et équipes encadrées sur le terrain. Procédures claires, consignes formalisées et contrôle qualité.",
  },
  {
    icon: "FileText",
    title: "Consignes & Reporting",
    description:
      "Main courante, rapports d’activité et points réguliers : vous gardez une visibilité claire sur l’exécution et les incidents, avec un suivi continu.",
  },
  {
    icon: "MapPin",
    title: "Réactivité en Île-de-France",
    description:
      "Basés à Plaisir (78), nous mobilisons rapidement des équipes sur Paris et toute l’Île-de-France grâce à une organisation structurée et des agents disponibles.",
  },
  {
    icon: "Lock",
    title: "Discrétion & Confidentialité",
    description:
      "Confidentialité et posture irréprochable : nos agents interviennent avec discrétion, rigueur et respect des environnements sensibles (VIP, sièges, événements).",
  },
];

export const processSteps = [
  {
    icon: "MessageCircle",
    title: "1. Cadrage & Analyse",
    description:
      "Échange rapide + analyse du site, des risques, des horaires et des contraintes. Objectif : définir un besoin clair et mesurable.",
  },
  {
    icon: "FileText",
    title: "2. Plan de mission",
    description:
      "Rédaction des consignes, définition des postes, rondes, contrôles, et modalités de reporting. Une organisation lisible avant le démarrage.",
  },
  {
    icon: "Users",
    title: "3. Déploiement & supervision",
    description:
      "Mise en place des équipes, prise de poste cadrée et management de proximité. Contrôles réguliers pour maintenir un niveau constant.",
  },
  {
    icon: "TrendingUp",
    title: "4. Suivi & amélioration continue",
    description:
      "Rapports, points de suivi et ajustements (horaires, effectifs, périmètre). Le dispositif évolue avec vos besoins et vos retours.",
  },
];

export const sectors = sectorsData.map(sector => ({
  icon: sector.icon,
  name: sector.name,
  href: `/secteurs/${sector.slug}`,
}));

export const testimonials = [
  {
    quote:
      "Une équipe professionnelle qui a su comprendre nos contraintes. La communication est fluide et les consignes sont parfaitement appliquées.",
    name: "Directeur sûreté",
    role: "Groupe industriel – Île-de-France",
  },
  {
    quote:
      "Le dispositif pour notre événement était discret et très efficace. Une vraie tranquillité d’esprit pour nos équipes et nos invités.",
    name: "Responsable événementiel",
    role: "Agence – Paris",
  },
  {
    quote:
      "Réactivité et sérieux exemplaires. Les rapports sont clairs et les agents très professionnels sur le terrain.",
    name: "Gestionnaire de site",
    role: "Parc tertiaire – Yvelines",
  },
];

/**
 * FAQ : ajout de questions “SEO money” (prix, délais, cadre, documents, déroulé),
 * tout en restant crédible et sans promesses risquées.
 */
export const faqItems = [
  {
    question: "Quelle est votre zone d’intervention ?",
    answer:
      "Basés à Plaisir (78), nous intervenons sur toute l’Île-de-France : Paris (75), 92, 93, 94, 91, 95, 77 et 78. La réactivité dépend du type de mission, des horaires et du niveau de dispositif attendu.",
  },
  {
    question: "Quel délai pour mettre en place un dispositif ?",
    answer:
      "Selon le contexte, une mise en place peut être rapide (urgence, renfort, événement) ou nécessiter un cadrage plus complet (site sensible, consignes détaillées). Dans tous les cas, nous validons d’abord le besoin, puis nous planifions un déploiement réaliste et encadré.",
  },
  {
    question: "Comment garantissez-vous la qualité de vos agents ?",
    answer:
      "Nos agents disposent d’une carte professionnelle valide délivrée par le CNAPS. Ils sont encadrés par un management de proximité, avec des contrôles qualité et un suivi opérationnel (consignes, main courante, rapports).",
  },
  {
    question: "Quel est le prix d’un agent de sécurité ?",
    answer:
      "Le coût dépend du type de mission, du nombre d’agents, des horaires (jour/nuit/week-end), du niveau de risque, du lieu et des équipements requis. Après une analyse de vos besoins, nous vous transmettons un devis structuré et transparent.",
  },
  {
    question: "Comment est établi un devis ?",
    answer:
      "Le devis est précédé d’un cadrage : périmètre, horaires, postes, rondes, points de contrôle, consignes et modalités de reporting. Nous chiffrons ensuite le dispositif selon le volume horaire, le niveau d’encadrement et les contraintes.",
  },
  {
    question: "Qu’est-ce qui vous différencie d’un grand groupe de sécurité ?",
    answer:
      "Notre structure à taille humaine favorise la réactivité, une communication directe et un pilotage de proximité. Vous gagnez en clarté, en souplesse et en qualité d’exécution, avec un interlocuteur identifiable.",
  },
  {
    question: "Proposez-vous des services pour les particuliers ?",
    answer:
      "Oui, selon les situations : protection rapprochée (VIP) et surveillance de résidences privées. Nous évaluons d’abord le contexte et les risques pour définir un dispositif adapté et discret.",
  },
  {
    question: "Que faut-il préparer pour démarrer une mission ?",
    answer:
      "Idéalement : horaires, accès (clés/badges), zones à surveiller, consignes spécifiques, contacts sur site et procédures en cas d’incident. Nous vous accompagnons pour formaliser ces éléments et sécuriser le démarrage.",
  },
];
