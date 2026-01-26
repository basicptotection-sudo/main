
import { servicesData, type Service } from '@/lib/services-data';

export type Environment = {
    slug: string;
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

export const environmentsData: Environment[] = [
    {
        slug: 'sieges-sociaux-bureaux',
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
        method: {
            title: "Notre méthode : claire, structurée, maîtrisée",
            description: "De l'analyse à l'action, un processus rigoureux pour renforcer la sûreté de vos sites tertiaires.",
            steps: [
                { icon: 'FileSearch', title: '1. Analyse du site', description: 'Étude de la configuration, des flux, des horaires réels, des zones sensibles et des contraintes internes pour un diagnostic précis.' },
                { icon: 'ShieldCheck', title: '2. Définition du dispositif', description: 'Construction d\'un dispositif proportionné, évolutif, conforme à la réglementation et aligné avec votre image de marque.' },
                { icon: 'Users', title: '3. Déploiement et pilotage', description: 'Agents formés et briefés, consignes écrites, supervision opérationnelle et points réguliers avec vos équipes.' },
                { icon: 'TrendingUp', title: '4. Suivi qualité et ajustements', description: 'Rapports exploitables, indicateurs concrets et ajustements du dispositif en fonction de l’évolution de votre activité.' },
            ]
        },
        whyUs: [
            { icon: 'Briefcase', title: 'Une posture professionnelle', description: 'Nos agents représentent votre entreprise autant qu’ils la protègent. Leur savoir-être est une priorité.' },
            { icon: 'BookOpen', title: 'Une organisation cadrée', description: 'Consignes claires, hiérarchie définie, et responsabilités assumées pour une prestation sans zones d\'ombre.' },
            { icon: 'FileText', title: 'Une traçabilité réelle', description: 'Mains courantes, rapports, remontées terrain exploitables : vous savez ce qui se passe sur votre site.' },
            { icon: 'Zap', title: 'Une vraie réactivité', description: 'Notre structure permet une adaptation rapide en cas de changement de contexte ou de besoin de renfort.' },
            { icon: 'Award', title: 'Une conformité totale', description: 'Respect strict de la réglementation, des obligations légales et des conventions en vigueur.' },
        ],
        faq: [
            { question: "Intervenez-vous rapidement sur un site tertiaire ?", answer: "Oui. Selon la criticité, une solution temporaire peut être mise en place rapidement, avant de déployer le dispositif pérenne défini ensemble." },
            { question: "Vos agents sont-ils formés aux environnements corporate ?", answer: "Oui. La posture, la communication, la discrétion et la gestion de publics variés font partie intégrante de notre processus de sélection et de formation." },
            { question: "Proposez-vous des dispositifs évolutifs ?", answer: "Absolument. Le dispositif est conçu pour être flexible et peut évoluer (horaires, effectifs, missions) selon votre activité et les risques." },
            { question: "Assurez-vous un suivi dans le temps ?", answer: "Oui. La supervision, le reporting et les points d'ajustement réguliers sont inclus dans notre approche pour garantir une amélioration continue." },
        ]
    }
];
