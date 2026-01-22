
import { servicesData } from './services-data';

export type LocationFAQ = {
    question: string;
    answer: string;
};

export type LocationService = {
    icon: string;
    title: string;
    description: string;
    href: string;
};

export type Location = {
    slug: string;
    name: string;
    title: string;
    description: string;
    keywords: string[];
    heroImageId: string;
    intro: {
        title: string;
        content: string;
    },
    services: LocationService[];
    faq: LocationFAQ[];
};

const allServices = servicesData.map(service => ({
    icon: 'ShieldCheck',
    title: service.title,
    description: service.shortDescription,
    href: `/services/${service.slug}`
}));

export const locationsData: Location[] = [
    {
        slug: 'paris-75',
        name: 'Paris (75)',
        title: 'Sécurité Privée à Paris | Agence de Protection & Gardiennage',
        description: 'Basic Protection Privée, votre agence de sécurité de référence à Paris. Services de protection rapprochée, surveillance de sites et sécurité événementielle pour les entreprises et particuliers exigeants.',
        keywords: ['sécurité privée paris', 'agence sécurité paris', 'gardiennage paris', 'protection rapprochée paris', 'entreprise de sécurité 75'],
        heroImageId: 'zone-paris',
        intro: {
            title: 'Votre Partenaire Sécurité de Confiance au Cœur de Paris',
            content: 'Au centre des enjeux économiques et culturels, Paris exige un niveau de sécurité irréprochable. Basic Protection Privée déploie son expertise pour protéger vos actifs, vos collaborateurs et votre réputation dans la capitale. De la surveillance de boutiques de luxe dans le Triangle d\'Or à la sécurisation de sièges sociaux à La Défense, nos agents spécialisés garantissent une présence à la fois discrète et dissuasive.'
        },
        services: allServices,
        faq: [
            { question: 'Quels sont vos délais d\'intervention à Paris intra-muros ?', answer: 'Grâce à notre maillage d\'équipes mobiles, nous pouvons déployer un dispositif d\'urgence en moins de 2 heures à Paris, en fonction de la complexité de la mission.' },
            { question: 'Gérez-vous la sécurité pour les événements durant les Jeux Olympiques de Paris 2024 ?', answer: 'Absolument. Nous disposons d\'une cellule dédiée à la sécurisation d\'événements corporate et privés en marge des JO 2024, avec une planification et une connaissance approfondie des contraintes logistiques et sécuritaires spécifiques.' },
            { question: 'Vos agents sont-ils formés pour les environnements de luxe parisiens ?', answer: 'Oui, nos agents affectés aux missions de prestige (palaces, haute joaillerie, défilés) reçoivent une formation complémentaire axée sur le savoir-être, la discrétion et les codes du luxe.' },
        ]
    },
    {
        slug: 'hauts-de-seine-92',
        name: 'Hauts-de-Seine (92)',
        title: 'Agence de Sécurité Hauts-de-Seine (92) | Protection & Surveillance',
        description: 'Solutions de sécurité privée premium dans les Hauts-de-Seine. Nous sécurisons sièges sociaux à La Défense, zones résidentielles et sites d\'affaires à Neuilly-sur-Seine, Boulogne-Billancourt...',
        keywords: ['sécurité hauts-de-seine', 'entreprise sécurité 92', 'gardiennage la défense', 'surveillance neuilly-sur-seine', 'agent de sécurité 92'],
        heroImageId: 'zone-hauts-de-seine',
        intro: {
            title: 'Expertise en Sûreté pour les Entreprises et Résidents des Hauts-de-Seine',
            content: 'Les Hauts-de-Seine, poumon économique majeur de l\'Île-de-France avec le quartier d\'affaires de La Défense, présentent des défis de sécurité uniques. Notre agence y propose des services de sûreté tertiaire, de surveillance de zones pavillonnaires et de protection pour les dirigeants d\'entreprises. Nous comprenons les enjeux spécifiques liés à la forte concentration de sièges sociaux et de résidences de haut standing.'
        },
        services: allServices,
        faq: [
            { question: 'Proposez-vous des rondes de surveillance pour les entreprises à La Défense ?', answer: 'Oui, nous proposons des services de rondes de sécurité (rondes d\'ouverture/fermeture, rondes aléatoires) et d\'intervention sur alarme pour les entreprises et les parcs tertiaires dans tout le 92.' },
            { question: 'Votre agence est-elle basée dans le 92 ?', answer: 'Notre siège est à Paris, mais nous disposons de bases opérationnelles et d\'équipes dédiées qui couvrent spécifiquement les Hauts-de-Seine pour une réactivité optimale.' },
        ]
    }
];
