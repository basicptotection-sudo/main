import { PlaceHolderImages } from "./placeholder-images";

export type FAQ = {
    question: string;
    answer: string;
};

export type Benefit = {
    title: string;
    description: string;
};

export type Service = {
    slug: string;
    title: string;
    shortDescription: string;
    description: string;
    keywords: string[];
    heroImageId: string;
    benefits: Benefit[];
    method: {
        title: string;
        description: string;
        steps: {
            icon: string;
            title: string;
            description: string;
        }[];
    };
    sectors: {
        icon: string;
        name: string;
    }[];
    faq: FAQ[];
};

export const servicesData: Service[] = [
    {
        slug: 'protection-rapprochee',
        title: 'Protection Rapprochée (Garde du corps)',
        shortDescription: 'Dispositifs discrets et efficaces pour la sécurité des dirigeants et personnalités.',
        description: 'Nous assurons la protection des personnes exposées à des risques élevés. Nos gardes du corps (APRPP) sont formés pour anticiper, dissuader et réagir avec une efficacité et une discrétion maximales, garantissant votre sécurité sans perturber votre quotidien.',
        keywords: ['garde du corps', 'protection rapprochée', 'sécurité VIP', 'APRPP', 'escorte'],
        heroImageId: 'service-protection-rapprochee',
        benefits: [
            { title: 'Discrétion Absolue', description: 'Nos agents se fondent dans votre environnement pour une protection quasi invisible.' },
            { title: 'Anticipation des Risques', description: 'Analyse permanente de la menace pour prévenir les incidents avant qu\'ils ne surviennent.' },
            { title: 'Haute Qualification', description: 'Agents formés aux techniques les plus avancées de protection et de premiers secours.' },
            { title: 'Disponibilité 24/7', description: 'Une protection continue, adaptée à vos déplacements et à votre agenda.' },
            { title: 'Gestion de Crise', description: 'Protocoles d\'extraction et de réaction rapide en cas d\'incident avéré.' },
            { title: 'Intelligence et Itinéraires', description: 'Planification et reconnaissance des itinéraires pour sécuriser tous vos déplacements.' }
        ],
        method: {
            title: "Notre Méthode en Protection Rapprochée",
            description: "Une approche systématique pour une sécurité sans faille.",
            steps: [
                { icon: 'MessageCircle', title: 'Audit de Risques', description: 'Évaluation complète de votre profil de menace et de votre environnement.' },
                { icon: 'FileText', title: 'Plan de Protection', description: 'Conception d\'un dispositif sur-mesure (équipes, véhicules, technologies).' },
                { icon: 'ShieldCheck', title: 'Mise en Œuvre', description: 'Déploiement des agents et du matériel, briefings et reconnaissances.' },
                { icon: 'ThumbsUp', title: 'Suivi et Adaptation', description: 'Ajustement constant du dispositif en fonction de l\'évolution de la situation.' }
            ]
        },
        sectors: [
            { icon: 'Users', name: 'Dirigeants & Cadres' },
            { icon: 'Gem', name: 'Personnalités (Art, Sport)' },
            { icon: 'Building', name: 'Familles Exposées' },
            { icon: 'Factory', name: 'Délégations Étrangères' }
        ],
        faq: [
            { question: 'Un garde du corps est-il armé ?', answer: 'Le port d\'arme est strictement réglementé en France. Selon le niveau de menace et les autorisations préfectorales, un agent peut être armé. Nous étudions chaque cas individuellement.' },
            { question: 'Comment garantissez-vous la confidentialité ?', answer: 'Tous nos agents sont liés par des accords de non-divulgation stricts. La discrétion et la confidentialité font partie de l\'ADN de notre métier et de notre entreprise.' }
        ]
    },
    {
        slug: 'securite-evenementielle',
        title: 'Sécurité Événementielle de Prestige',
        shortDescription: 'Sécurisation de lancements, galas, défilés de mode et événements privés de haut standing.',
        description: 'Nous concevons et mettons en œuvre des dispositifs de sécurité pour les événements les plus exigeants. De l\'accueil à la gestion des flux, en passant par le contrôle d\'accès et la prévention des risques, nous assurons le bon déroulement de votre événement en toute sérénité.',
        keywords: ['sécurité événementielle', 'contrôle d\'accès', 'gestion de foule', 'sécurité gala', 'agent événementiel'],
        heroImageId: 'service-evenementiel',
        benefits: [
            { title: 'Image de Marque Préservée', description: 'Des agents au savoir-être irréprochable qui représentent positivement votre événement.' },
            { title: 'Gestion des Flux Optimisée', description: 'Fluidité des accès et circulation des invités pour une expérience positive.' },
            { title: 'Prévention Active', description: 'Dissuasion des comportements malveillants et gestion des conflits en amont.' },
            { title: 'Coordination Efficace', description: 'Un chef de dispositif unique pour une communication centralisée avec l\'organisation.' },
            { title: 'Gestion des Accréditations', description: 'Contrôle rigoureux des accès pour garantir la sécurité des zones sensibles (backstage, VIP).' },
            { title: 'Secourisme et Incendie', description: 'Agents formés SSIAP et SST prêts à intervenir en cas d\'urgence.' }
        ],
        method: {
            title: "Notre Approche de la Sécurité Événementielle",
            description: "Chaque événement est unique, notre sécurité l'est aussi.",
            steps: [
                { icon: 'MessageCircle', title: 'Analyse du Site', description: 'Repérage des lieux, analyse des points d\'accès et des vulnérabilités.' },
                { icon: 'FileText', title: 'Plan de Sécurité', description: 'Définition des effectifs, des postes, des consignes et du PC sécurité.' },
                { icon: 'ShieldCheck', title: 'Déploiement et Briefing', description: 'Mise en place des équipes et briefing complet avant l\'ouverture des portes.' },
                { icon: 'ThumbsUp', title: 'Exécution et Reporting', description: 'Supervision active durant l\'événement et rapport de mission détaillé.' }
            ]
        },
        sectors: [
            { icon: 'ShoppingCart', name: 'Luxe et Mode' },
            { icon: 'Gem', name: 'Lancements de Produits' },
            { icon: 'Building', name: 'Événements Corporate' },
            { icon: 'Users', name: 'Soirées Privées' }
        ],
        faq: [
            { question: 'Combien d\'agents faut-il pour mon événement ?', answer: 'Le nombre dépend de nombreux facteurs : la jauge, la configuration du lieu, le type de public, la nature de l\'événement... Une analyse de risques préalable nous permet de dimensionner précisément le dispositif.' },
            { question: 'Travaillez-vous avec des palpations de sécurité ?', answer: 'Oui, si la nature de l\'événement et le cadre légal le justifient et le permettent. Les palpations sont effectuées par des agents de même sexe, dans le respect de la loi et de la personne.' }
        ]
    },
    {
        slug: 'audit-conseil-surete',
        title: 'Audit & Conseil en Sûreté',
        shortDescription: 'Analyse de risques complexes et conception de plans de sécurité intégrés et performants.',
        description: 'Notre expertise ne se limite pas à l\'humain. Nous analysons vos infrastructures, procédures et technologies pour identifier les failles et vous proposer des solutions de sûreté globales. Notre objectif : transformer vos dépenses de sécurité en un investissement stratégique.',
        keywords: ['audit de sûreté', 'conseil en sécurité', 'plan de sécurité', 'analyse de risques', 'ingénierie sûreté'],
        heroImageId: 'service-audit-conseil',
        benefits: [
            { title: 'Vision à 360°', description: 'Analyse complète de votre dispositif : humain, technique et organisationnel.' },
            { title: 'Recommandations Pragmatiques', description: 'Des solutions concrètes, priorisées et chiffrées pour une aide à la décision.' },
            { title: 'Indépendance et Objectivité', description: 'Un regard externe et expert, sans parti pris pour une marque ou une technologie.' },
            { title: 'Conformité Réglementaire', description: 'Assurez-vous que votre dispositif respecte l\'ensemble des obligations légales.' },
            { title: 'Optimisation des Coûts', description: 'Identifiez les redondances et les investissements pertinents pour un budget maîtrisé.' },
            { title: 'Accompagnement au Changement', description: 'Aide à la rédaction des cahiers des charges et au pilotage des appels d\'offres.' }
        ],
        method: {
            title: "Notre Méthodologie d'Audit",
            description: "De l'analyse à l'action, un processus rigoureux pour renforcer votre sûreté.",
            steps: [
                { icon: 'MessageCircle', title: 'Phase d\'Immersion', description: 'Entretiens, visites de sites, analyse documentaire (plans, procédures).' },
                { icon: 'FileText', title: 'Analyse et Identification', description: 'Cartographie des risques, identification des vulnérabilités, modélisation des menaces.' },
                { icon: 'ShieldCheck', title: 'Rapport et Préconisations', description: 'Remise d\'un rapport détaillé avec un plan d\'action stratégique.' },
                { icon: 'ThumbsUp', title: 'Accompagnement', description: 'Aide à la mise en œuvre des solutions et mesure de leur efficacité.' }
            ]
        },
        sectors: [
            { icon: 'Building', name: 'Sièges Sociaux (CAC40, ETI)' },
            { icon: 'Factory', name: 'Sites Industriels & SEVESO' },
            { icon: 'Hospital', name: 'Établissements de Santé' },
            { icon: 'School', name: 'Campus et Sites Sensibles' }
        ],
        faq: [
            { question: 'Pourquoi réaliser un audit de sûreté ?', answer: 'Un audit offre un état des lieux objectif de votre niveau de protection. Il permet d\'identifier des failles invisibles en interne, d\'optimiser votre budget et d\'adapter votre dispositif à l\'évolution des menaces et de la réglementation.' },
            { question: 'Votre cabinet est-il indépendant ?', answer: 'Oui, notre pôle conseil est totalement indépendant des fournisseurs de matériel et des autres entreprises de sécurité. Cela garantit des recommandations objectives, basées uniquement sur vos besoins.' }
        ]
    }
];
