
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
    issuesTitle?: string;
    issues: {
        icon: string;
        title: string;
        description: string;
    }[],
    missionsTitle?: string;
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
        issuesTitle: "Les enjeux spécifiques des sièges sociaux et bureaux",
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
        missionsTitle: "Typologie des missions en environnement tertiaire",
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
        issuesTitle: "Enjeux du secteur Luxe & Retail",
        issues: [
            { icon: 'Gem', title: 'Prévention des pertes', description: 'Protéger des produits de haute valeur contre le vol à l\'étalage et les tentatives de braquage.' },
            { icon: 'Users', title: 'Expérience client', description: 'Assurer une sécurité visible mais non intrusive, avec une posture d\'accueil et de service irréprochable.' },
        ],
        missionsTitle: "Nos missions en environnement premium",
        missions: [
             { icon: 'Eye', title: 'Accueil & Filtrage', description: 'Contrôle discret des entrées, orientation des clients et gestion des accès aux zones privées.' },
             { icon: 'Shield', title: 'Présence dissuasive', description: 'Une présence élégante et vigilante pour décourager les actes malveillants sans nuire à l\'atmosphère du lieu.' },
        ],
        relatedServices: ['agent-securite-qualifie', 'securite-evenementielle', 'audit-conseil-surete'],
        useCases: [
            { title: 'Boutique de luxe (Paris 8)', description: 'Agent en costume assurant l\'accueil, le contrôle des flux et la coordination avec les équipes de vente.' },
            { title: 'Grand hôtel parisien', description: 'Dispositif 24/7 pour la surveillance du lobby, des accès et la gestion des incidents avec une clientèle internationale.' },
        ],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: [
            { question: "Vos agents sont-ils formés aux codes du luxe ?", answer: "Oui, nos agents affectés à ces missions sont sélectionnés pour leur excellente présentation, leur discrétion et leur capacité à interagir avec une clientèle exigeante." },
        ]
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
        issuesTitle: "Problématiques des sites BTP",
        issues: [
            { icon: 'Construction', title: 'Vol de matériaux et d\'engins', description: 'Le cuivre, les outils et les engins de chantier sont des cibles de choix, causant des pertes financières et des retards.' },
            { icon: 'Ban', title: 'Intrusions et vandalisme', description: 'Les sites non sécurisés la nuit ou le week-end sont vulnérables aux dégradations et aux occupations illégales.' },
        ],
        missionsTitle: "Nos interventions sur chantiers",
        missions: [
            { icon: 'Gate', title: 'Contrôle des accès', description: 'Filtrage des entrées/sorties de véhicules et de personnel pour limiter l\'accès aux seules personnes autorisées.' },
            { icon: 'Dog', title: 'Rondes cynophiles nocturnes', description: 'Le binôme homme-chien est la solution la plus dissuasive pour surveiller de grands périmètres la nuit.' },
        ],
        relatedServices: ['agent-securite-qualifie', 'agent-cynophile', 'agent-rondier'],
        useCases: [
            { title: 'Chantier du Grand Paris', description: 'Surveillance 24/7 avec agents postés aux accès et rondes cynophiles la nuit pour protéger un site stratégique.' },
            { title: 'Promotion immobilière', description: 'Rondes de surveillance à horaires variables pour plusieurs pavillons en construction afin de prévenir les vols et dégradations.' },
        ],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: [
             { question: "Un agent cynophile est-il indispensable pour un chantier ?", answer: "C'est la solution la plus efficace en termes de dissuasion et de détection sur de grandes surfaces. Pour les chantiers plus petits ou en milieu urbain dense, un agent posté ou des rondes peuvent suffire." },
        ]
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
        issuesTitle: "Enjeux des sites industriels et logistiques",
        issues: [
            { icon: 'Truck', title: 'Contrôle des flux', description: 'Maîtriser les entrées et sorties de camions, de marchandises et de personnel est crucial pour prévenir les vols internes et externes.' },
            { icon: 'Warehouse', title: 'Protection des stocks', description: 'Les entrepôts abritent des valeurs importantes et doivent être protégés contre les intrusions, notamment la nuit.' },
        ],
        missionsTitle: "Nos missions pour l'industrie et la logistique",
        missions: [
            { icon: 'ClipboardCheck', title: 'Contrôle d\'accès et des chargements', description: 'Vérification des bons de livraison, contrôle des scellés et enregistrement des mouvements de véhicules.' },
            { icon: 'Radio', title: 'Rondes de surveillance périmétrique', description: 'Rondes véhiculées ou à pied pour surveiller de vastes sites, avec une attention particulière pour les clôtures et les zones de stockage extérieures.' },
        ],
        relatedServices: ['agent-securite-qualifie', 'agent-cynophile', 'agent-rondier'],
        useCases: [
            { title: 'Plateforme logistique (93)', description: 'Poste de garde 24/7 pour le contrôle des accès camions et personnel, complété par des rondes cynophiles nocturnes.' },
            { title: 'Site industriel sensible (77)', description: 'Dispositif de contrôle d\'accès strict avec agents formés aux procédures spécifiques du site et au respect des normes de sécurité.' },
        ],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: [
            { question: "Comment gérez-vous la sécurité sur un site SEVESO ?", answer: "La sécurité sur un site classé SEVESO requiert des agents formés aux risques spécifiques et des procédures extrêmement rigoureuses, définies en étroite collaboration avec le responsable sécurité du site." },
        ]
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
        issuesTitle: "Défis de la sécurité événementielle",
        issues: [
            { icon: 'Users', title: 'Gestion de foule', description: 'Canaliser les flux de public, éviter les mouvements de panique et gérer les files d\'attente sont des compétences clés.' },
            { icon: 'Ticket', title: 'Contrôle d\'accès et filtrage', description: 'Assurer que seules les personnes autorisées entrent, tout en effectuant les contrôles nécessaires (sacs, billets) de manière fluide.' },
        ],
        missionsTitle: "Nos dispositifs pour vos événements",
        missions: [
            { icon: 'Scan', title: 'Filtrage et contrôle des billets', description: 'Agents postés aux entrées pour vérifier les titres d\'accès et effectuer les palpations de sécurité si nécessaire.' },
            { icon: 'Flame', title: 'Sécurité Incendie (SSIAP)', description: 'Présence obligatoire dans la plupart des ERP pour assurer la prévention des risques incendie et gérer l\'évacuation.' },
        ],
        relatedServices: ['securite-evenementielle', 'agent-securite-qualifie', 'agent-incendie-ssiap'],
        useCases: [
            { title: 'Concert à La Défense Arena', description: 'Dispositif complet incluant agents de filtrage, gestion des flux dans les coursives et agents SSIAP.' },
            { title: 'Salon professionnel (Porte de Versailles)', description: 'Surveillance des stands la nuit, contrôle des accès exposants et visiteurs, et gestion des mouvements logistiques.' },
        ],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: [
            { question: "Combien de temps à l'avance faut-il vous contacter ?", answer: "Pour un événement, le plus tôt est le mieux, idéalement 1 à 2 mois avant pour bien planifier le dispositif. Nous pouvons cependant répondre à des demandes plus urgentes." },
        ]
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
        issuesTitle: "Enjeux de la protection de personnes",
        issues: [
            { icon: 'EyeOff', title: 'Discrétion Absolue', description: 'La meilleure sécurité est celle qui ne se voit pas. La confidentialité est la règle d\'or.' },
            { icon: 'BrainCircuit', title: 'Anticipation des risques', description: 'Analyse des déplacements, des lieux et des contextes pour prévenir les menaces avant qu\'elles ne surviennent.' },
        ],
        missionsTitle: "Nos approches pour les dirigeants et VIP",
        missions: [
            { icon: 'Car', title: 'Accompagnement sécurisé', description: 'Chauffeur de sécurité, accompagnement discret lors de déplacements professionnels ou privés.' },
            { icon: 'Home', title: 'Sécurisation de résidence', description: 'Audit de sûreté de la résidence et mise en place de solutions humaines et/ou technologiques adaptées.' },
        ],
        relatedServices: ['audit-conseil-surete', 'agent-securite-qualifie'],
        useCases: [
            { title: 'Accompagnement d\'un PDG', description: 'Chauffeur de sécurité assurant les trajets domicile-travail et les déplacements professionnels en toute discrétion.' },
            { title: 'Surveillance d\'une villa (92)', description: 'Gardiennage permanent ou rondes aléatoires pour sécuriser une résidence privée lors des absences de ses occupants.' },
        ],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: [
            { question: "Faut-il une autorisation pour un service de protection rapprochée ?", answer: "Oui, la protection physique des personnes est une activité très réglementée qui nécessite des agréments spécifiques (APR) que nos agents possèdent." },
        ]
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
        issues: [
            { icon: 'Lock', title: 'Risque d\'intrusion et d\'espionnage', description: 'Protection contre les accès non autorisés visant à obtenir des informations sensibles ou à saboter les opérations.'},
            { icon: 'ShieldAlert', title: 'Exigences réglementaires strictes', description: 'Respect des protocoles de sécurité imposés par l\'État ou des normes sectorielles (défense, recherche, etc.).'},
            { icon: 'Users', title: 'Gestion des habilitations', description: 'Contrôle rigoureux des différents niveaux d\'accès pour le personnel, les visiteurs et les prestataires.'},
            { icon: 'EyeOff', title: 'Discrétion et confidentialité', description: 'La communication et les opérations doivent être menées avec une confidentialité absolue pour ne pas exposer les activités du site.'}
        ],
        missions: [
            { icon: 'Fingerprint', title: 'Contrôle d’accès renforcé', description: 'Vérification d\'identité, contrôle des habilitations, gestion des badges et escorte de visiteurs en zones réglementées.' },
            { icon: 'Radio', title: 'Surveillance périmétrique et intérieure', description: 'Rondes de surveillance, surveillance vidéo et détection d\'anomalies sur les clôtures, les accès et les points critiques.' },
            { icon: 'AlertTriangle', title: 'Gestion de crise et procédures d\'urgence', description: 'Application des protocoles spécifiques en cas d\'alerte (intrusion, incendie, menace) et liaison avec les forces de l\'ordre.' },
        ],
        relatedServices: ['agent-securite-qualifie', 'audit-conseil-surete', 'agent-incendie-ssiap'],
        useCases: [
            { title: 'Centre de recherche sensible', description: 'Dispositif incluant contrôle d\'accès biométrique, rondes dans les laboratoires et surveillance des zones de stockage de données.' },
            { title: 'Bâtiment administratif régalien', description: 'Accueil filtrant, contrôle des visiteurs, gestion des flux et surveillance générale pour garantir la sérénité et la sécurité du personnel.' },
        ],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: [
             { question: "Vos agents sont-ils habilités pour les sites sensibles ?", answer: 'Oui, nous sélectionnons des agents ayant les habilitations requises (comme l\'habilitation Confidentiel Défense si nécessaire) et l\'expérience des environnements réglementés.' },
             { question: "Comment assurez-vous la confidentialité ?", answer: 'Nos agents signent des clauses de confidentialité strictes et sont formés pour ne jamais divulguer d\'informations sur les activités, le personnel ou les dispositifs du site.' }
        ]
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
        issues: [
            { icon: 'Angry', title: 'Incivilités et dégradations', description: 'Prévention des nuisances, des dégradations dans les parties communes et des conflits de voisinage.'},
            { icon: 'KeyRound', title: 'Gestion des accès', description: 'Contrôle des accès aux parkings, halls et locaux techniques pour éviter les occupations illicites.'},
            { icon: 'Car', title: 'Vols et cambriolages', description: 'Une présence dissuasive et des rondes régulières réduisent significativement le risque de vols dans les appartements, caves et parkings.'}
        ],
        missions: [
             { icon: 'Home', title: 'Gardiennage et permanence', description: 'Présence d\'un agent à des horaires fixes pour accueillir, renseigner, recevoir les colis et assurer une surveillance continue.' },
             { icon: 'Footprints', title: 'Rondes de surveillance', description: 'Passages à horaires variables dans les parties communes, les sous-sols et les extérieurs pour dissuader et détecter les anomalies.' },
             { icon: 'PhoneForwarded', title: 'Intervention sur alarme', description: 'Gestion des alarmes des parties communes et liaison avec les résidents ou le syndic selon les procédures.' },
        ],
        relatedServices: ['agent-securite-qualifie', 'agent-rondier'],
        useCases: [
             { title: 'Résidence de standing', description: 'Agent d\'accueil et de sécurité en journée pour le filtrage des visiteurs et la gestion des services, complété par des rondes de nuit.' },
             { title: 'Copropriété avec parkings', description: 'Rondes de surveillance nocturnes à horaires variables pour prévenir les vols de véhicules et les dégradations dans les sous-sols.' },
        ],
        method: commonMethod,
        whyUs: commonWhyUs,
        faq: [
             { question: "Un agent peut-il gérer les colis des résidents ?", answer: 'Oui, la réception et la mise à disposition des colis peuvent faire partie des consignes de poste d\'un agent d\'accueil et de sécurité.' },
             { question: "Comment un agent de sécurité gère-t-il un conflit de voisinage ?", answer: 'L\'agent intervient en tant que médiateur pour apaiser la situation, rappelle les règles de la copropriété et consigne l\'événement dans la main courante. Il n\'a pas le pouvoir de police mais agit pour restaurer le calme.' }
        ]
    }
];
