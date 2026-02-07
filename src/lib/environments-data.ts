
import { servicesData, type Service } from '@/lib/services-data';

export type Environment = {
    slug: string;
    icon: string;
    name: string;
    metaTitle: string;
    metaDescription: string;
    heroImageId: string;
    heroTitle: string;
    heroDescription: string;
    intro: {
      title: string;
      paragraph: string;
    },
    issues: {
        icon: string;
        title: string;
        description: string;
    }[],
    missions: {
        icon: string;
        title: string;
        description: string;
    }[],
    relatedServices: string[],
    useCases: {
        title: string;
        description: string;
    }[],
    method: {
        title: string,
        description: string,
        steps: { icon: string; title: string; description: string; }[]
    },
    whyUs: {
        icon: string;
        title: string;
        description: string;
    }[],
    faq: {
        question: string;
        answer: string;
    }[],
}

const commonWhyUs: Environment['whyUs'] = [
    { icon: 'Award', title: 'Conformité & Réglementation', description: 'Agents agréés CNAPS, respect des conventions collectives et de la législation en vigueur.' },
    { icon: 'ClipboardCheck', title: 'Cadrage & Consignes Claires', description: 'Définition d\'un plan de mission précis et de consignes opérationnelles adaptées à votre site.' },
    { icon: 'Users', title: 'Supervision & Contrôle Qualité', description: 'Management de proximité, contrôles inopinés et suivi régulier de la prestation.' },
    { icon: 'FileText', title: 'Reporting & Transparence', description: 'Mains courantes informatisées et rapports d\'activité pour une traçabilité totale.' }
];

const commonMethod: Environment['method'] = {
    title: "Notre méthode : claire, structurée, maîtrisée",
    description: "De l'analyse à l'action, un processus rigoureux pour renforcer la sûreté de vos sites.",
    steps: [
        { icon: 'FileSearch', title: '1. Analyse du site', description: 'Étude de la configuration, des flux, des horaires réels, des zones sensibles et des contraintes internes pour un diagnostic précis.' },
        { icon: 'ShieldCheck', title: '2. Définition du dispositif', description: 'Construction d\'un dispositif proportionné, évolutif, conforme à la réglementation et aligné avec votre image de marque.' },
        { icon: 'Users', title: '3. Déploiement et pilotage', description: 'Agents formés et briefés, consignes écrites, supervision opérationnelle et points réguliers avec vos équipes.' },
        { icon: 'TrendingUp', title: '4. Suivi qualité et ajustements', description: 'Rapports exploitables, indicateurs concrets et ajustements du dispositif en fonction de l’évolution de votre activité.' },
    ]
};


export const environmentsData: Environment[] = [
    {
        slug: 'sieges-sociaux-bureaux',
        icon: 'Building2',
        name: 'Sièges sociaux & bureaux',
        metaTitle: 'Sécurité des Sièges Sociaux & Bureaux | Sécurité Privée en IDF',
        metaDescription: 'Sécurité privée pour sièges sociaux et bureaux : contrôle d’accès, surveillance, rondes et dispositifs sur mesure en Île-de-France.',
        heroImageId: 'zone-hauts-de-seine',
        heroTitle: "Sécurité des Sièges Sociaux & Bureaux",
        heroDescription: "Dispositifs de sécurité privée adaptés aux environnements tertiaires exigeants.",
        intro: {
            title: "Une sécurité pensée, maîtrisée et pilotée.",
            paragraph: "La sécurité d’un siège social ou d’un immeuble de bureaux ne se limite pas à une simple présence. Elle engage l’image de l’entreprise, la protection des collaborateurs, la continuité d’activité et la confidentialité des données. Entre flux quotidiens, visiteurs, prestataires et exigences de discrétion, les environnements tertiaires nécessitent une approche structurée, fluide et professionnelle."
        },
        issues: [
            {
                icon: 'Award',
                title: 'Image de marque et posture irréprochable',
                description: 'Dans un environnement corporate, l’agent de sécurité est souvent le premier contact. Tenue, posture, et langage sont essentiels.',
            },
            {
                icon: 'Users',
                title: 'Gestion des flux complexes',
                description: 'Entrées/sorties massives, visiteurs, prestataires, livraisons. Une mauvaise gestion crée des risques humains et sécuritaires.',
            },
            {
                icon: 'Lock',
                title: 'Confidentialité et données sensibles',
                description: 'Sites abritant directions, R&D ou infrastructures critiques. La sécurité humaine devient un maillon clé de la protection.',
            },
            {
                icon: 'Activity',
                title: 'Continuité d’activité',
                description: 'Intrusion, conflit ou incident peuvent perturber l’activité. Le dispositif doit prévenir, absorber et gérer sans désorganiser le site.',
            }
        ],
        missions: [
            { icon: 'Fingerprint', title: 'Contrôle d’accès', description: 'Accueil et orientation, vérification des autorisations, gestion des badges et registres, filtrage discret et efficace.' },
            { icon: 'Radio', title: 'Surveillance et rondes', description: 'Rondes intérieures/extérieures, vérification des zones sensibles, prévention des risques et surveillance en horaires décalés.' },
            { icon: 'AlertTriangle', title: 'Gestion des incidents', description: 'Application des consignes, levée de doute, coordination avec les responsables, et rédaction de rapports complets (main courante).' },
            { icon: 'ShieldCheck', title: 'Sécurité renforcée', description: 'Agents expérimentés, coordination avec systèmes de contrôle d’accès, et intervention en renfort sur sites sensibles.' },
        ],
        relatedServices: ['agent-securite-qualifie', 'agent-rondier', 'agent-incendie-ssiap', 'audit-conseil-surete'],
        useCases: [
            { title: 'Siège social à La Défense', description: 'Accueil sécurisé multi-entrées, gestion des flux employés/visiteurs, surveillance en horaires étendus et reporting quotidien pour la direction.' },
            { title: 'Immeuble de bureaux multi-entreprises', description: 'Contrôle d’accès mutualisé, coordination avec syndic et gestionnaire, gestion des prestataires techniques, et rondes nocturnes/week-end.' },
            { title: 'Bureaux directionnels sensibles', description: 'Discrétion maximale, agents expérimentés, procédures strictes et traçabilité complète des accès pour protéger les informations stratégiques.' },
        ],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: [
            { question: "Intervenez-vous rapidement sur un site tertiaire ?", answer: "Oui. Selon la criticité, une solution temporaire peut être mise en place rapidement, avant de déployer le dispositif pérenne défini ensemble." },
            { question: "Vos agents sont-ils formés aux environnements corporate ?", answer: "Oui. La posture, la communication, la discrétion et la gestion de publics variés font partie intégrante de notre processus de sélection et de formation." },
        ]
    },
    {
        slug: 'luxe-retail-hotellerie',
        icon: 'Store',
        name: 'Luxe, retail & hôtellerie',
        metaTitle: 'Sécurité Luxe, Retail & Hôtellerie | Sécurité Privée IDF',
        metaDescription: 'Sécurité privée pour le luxe, retail et hôtellerie : prévention des pertes, accueil premium et gestion des risques en Île-de-France.',
        heroImageId: 'service-evenementiel',
        heroTitle: "Luxe, Retail & Hôtellerie",
        heroDescription: "Dispositifs premium alliant sécurité discrète et excellence du service pour les environnements exigeants.",
        intro: {
            title: "Une sécurité à l'image de votre marque.",
            paragraph: "Dans les secteurs du luxe, du retail et de l'hôtellerie, l'agent de sécurité est un ambassadeur. Nos dispositifs sont conçus pour protéger vos actifs et vos clients tout en sublimant leur expérience."
        },
        issues: [],
        missions: [],
        relatedServices: ['agent-securite-qualifie', 'securite-evenementielle'],
        useCases: [],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: []
    },
    {
        slug: 'chantiers-sites-btp',
        icon: 'HardHat',
        name: 'Chantiers & sites BTP',
        metaTitle: 'Sécurité Chantiers & BTP | Sécurité Privée IDF',
        metaDescription: 'Sécurité des chantiers et sites BTP : prévention des vols, contrôle d\'accès et surveillance 24/7 en Île-de-France.',
        heroImageId: 'service-agent-cyno',
        heroTitle: "Chantiers & Sites BTP",
        heroDescription: "Protection de vos matériaux, engins et installations contre le vol et le vandalisme.",
        intro: {
            title: "Votre chantier, notre vigilance.",
            paragraph: "Un chantier est une cible de choix pour les vols et dégradations. Nous mettons en place des dispositifs dissuasifs et efficaces pour sécuriser votre site de jour comme de nuit."
        },
        issues: [],
        missions: [],
        relatedServices: ['agent-securite-qualifie', 'agent-cynophile', 'agent-rondier'],
        useCases: [],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: []
    },
    {
        slug: 'industrie-logistique',
        icon: 'Factory',
        name: 'Industrie & logistique',
        metaTitle: 'Sécurité Industrie & Logistique | Sécurité Privée IDF',
        metaDescription: 'Sécurité pour sites industriels et plateformes logistiques : contrôle des flux, surveillance de périmètres et prévention des intrusions.',
        heroImageId: 'service-agent-rondier',
        heroTitle: "Industrie & Logistique",
        heroDescription: "Maîtrise des flux et protection de vos zones de production et de stockage.",
        intro: {
            title: "Sécuriser le cœur de votre activité.",
            paragraph: "Les sites industriels et logistiques sont des zones névralgiques. Nous assurons la fluidité et la sécurité de vos opérations grâce à des procédures de contrôle strictes et une surveillance adaptée."
        },
        issues: [],
        missions: [],
        relatedServices: ['agent-securite-qualifie', 'agent-cynophile', 'agent-rondier'],
        useCases: [],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: []
    },
    {
        slug: 'evenementiel-culture',
        icon: 'CalendarDays',
        name: 'Événementiel & culture',
        metaTitle: 'Sécurité Événementiel & Culture | Sécurité Privée IDF',
        metaDescription: 'Sécurité pour événements, salons, concerts et sites culturels. Gestion des foules, contrôle d\'accès et sécurité incendie (SSIAP).',
        heroImageId: 'service-evenementiel',
        heroTitle: "Événementiel & Culture",
        heroDescription: "Garantir la sécurité de votre public et la réussite de votre événement.",
        intro: {
            title: "Votre événement, notre responsabilité.",
            paragraph: "La réussite d'un événement repose sur une sécurité discrète mais infaillible. Nous gérons les flux, contrôlons les accès et prévenons les incidents pour que votre événement soit un succès."
        },
        issues: [],
        missions: [],
        relatedServices: ['securite-evenementielle', 'agent-securite-qualifie', 'agent-incendie-ssiap'],
        useCases: [],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: []
    },
    {
        slug: 'dirigeants-vip',
        icon: 'Users',
        name: 'Dirigeants & VIP',
        metaTitle: 'Sécurité Dirigeants & VIP | Sécurité Privée IDF',
        metaDescription: 'Solutions de sécurité discrètes pour dirigeants, personnalités et leurs lieux de travail ou de résidence en Île-de-France.',
        heroImageId: 'hero',
        heroTitle: "Sécurité Dirigeants & VIP",
        heroDescription: "Discrétion, anticipation et sérénité pour les environnements les plus sensibles.",
        intro: {
            title: "La sécurité invisible.",
            paragraph: "La protection des personnes et des cadres de haut niveau exige une approche basée sur la confidentialité et l'anticipation. Nos dispositifs visent à sécuriser l'environnement de travail ou de vie sans perturber le quotidien."
        },
        issues: [],
        missions: [],
        relatedServices: ['audit-conseil-surete', 'agent-securite-qualifie'],
        useCases: [],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: []
    },
    {
        slug: 'sites-sensibles-institutionnels',
        icon: 'Landmark',
        name: 'Sites sensibles & institutionnels',
        metaTitle: 'Sécurité Sites Sensibles & Institutionnels | IDF',
        metaDescription: 'Sécurité privée pour sites sensibles, administratifs et institutionnels. Procédures strictes, agents qualifiés et confidentialité.',
        heroImageId: 'about-hero',
        heroTitle: "Sites Sensibles & Institutionnels",
        heroDescription: "Procédures renforcées et agents qualifiés pour les sites à haute exigence de sûreté.",
        intro: {
            title: "La rigueur au service de l'État.",
            paragraph: "Ambassades, administrations, sites réglementés... Nous appliquons des protocoles de sécurité stricts, définis en collaboration avec vos responsables sûreté, pour garantir une protection sans faille."
        },
        issues: [],
        missions: [],
        relatedServices: ['agent-securite-qualifie', 'audit-conseil-surete', 'agent-incendie-ssiap'],
        useCases: [],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: []
    },
    {
        slug: 'immobilier-residentiel',
        icon: 'Building',
        name: 'Immobilier & résidentiel',
        metaTitle: 'Sécurité Résidentiel & Immobilier | Sécurité Privée IDF',
        metaDescription: 'Sécurité pour copropriétés, résidences de standing et parcs immobiliers. Gardiennage, rondes et prévention des incivilités.',
        heroImageId: 'founder-portrait',
        heroTitle: "Immobilier & Résidentiel",
        heroDescription: "La tranquillité de vos résidents, notre priorité.",
        intro: {
            title: "Protéger le cadre de vie.",
            paragraph: "Nous mettons en place des dispositifs de surveillance pour assurer la quiétude des résidents, prévenir les incivilités, contrôler les accès et gérer les incidents du quotidien."
        },
        issues: [],
        missions: [],
        relatedServices: ['agent-securite-qualifie', 'agent-rondier'],
        useCases: [],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: []
    }
];
