import { PlaceHolderImages } from "./placeholder-images";

export type FAQ = {
    question: string;
    answer: string;
};

export type Benefit = {
    title: string;
    description: string;
};

export type TrustElement = {
    icon: string;
    title: string;
    description: string;
};

export type Service = {
    slug: string;
    icon: string;
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
    whyUs?: TrustElement[];
    faq: FAQ[];
};

export const servicesData: Service[] = [
    {
        slug: 'agent-securite-qualifie',
        icon: 'Shield',
        title: 'Agent de Sécurité Qualifié (APS)',
        shortDescription: 'La référence en gardiennage et surveillance de site. Fiabilité, rigueur et professionnalisme pour une tranquillité d’esprit totale.',
        description: 'Nos agents de sécurité qualifiés (CQP-APS) sont le pilier de la protection des biens et des personnes. Postés, véhiculés ou en rondes, ils contrôlent les accès, préviennent les actes de malveillance et gèrent les incidents, garantissant un environnement sûr pour vos collaborateurs, vos clients et vos actifs.',
        keywords: ['agent de sécurité', 'gardiennage', 'surveillance de site', 'agent APS', 'sécurité entreprise', 'contrôle d\'accès', 'prévention malveillance'],
        heroImageId: 'service-agent-qualifie',
        benefits: [
            { title: 'Dissuasion & Prévention Active', description: 'Une présence visible et professionnelle réduit significativement les risques d\'intrusion, de vol et de vandalisme. Nos agents sont formés pour détecter les comportements suspects et agir en amont.' },
            { title: 'Contrôle d\'Accès Rigoureux', description: 'Nous appliquons vos procédures à la lettre pour le filtrage des visiteurs, véhicules et livraisons, assurant que seules les personnes autorisées accèdent à vos locaux.' },
            { title: 'Gestion Sereine des Incidents', description: 'En cas d\'anomalie ou d\'urgence, nos agents sont les premiers intervenants. Leur calme et leur formation leur permettent de gérer la situation efficacement avant l\'arrivée des secours.' },
            { title: 'Traçabilité & Reporting Complet', description: 'Chaque action est consignée dans une main courante électronique. Vous recevez des rapports clairs et réguliers sur l\'activité, les incidents et les points d\'amélioration.' },
            { title: 'Flexibilité & Adaptabilité', description: 'Nous adaptons les horaires, les missions et les effectifs à vos besoins réels, que ce soit pour une surveillance 24/7, des renforts ponctuels ou des missions spécifiques.' },
            { title: 'Image de Marque Valoriseé', description: 'La posture, la tenue et le professionnalisme de nos agents contribuent à l\'image de sérieux et de sécurité de votre entreprise auprès de vos clients et partenaires.' }
        ],
        whyUs: [
            { icon: 'UserCheck', title: 'Recrutement Sélectif', description: 'Nous ne recrutons que des agents titulaires de la carte professionnelle, avec une expérience vérifiée et un casier judiciaire vierge. Le savoir-être est un critère essentiel.' },
            { icon: 'BookOpen', title: 'Formation Continue', description: 'Nos agents suivent des formations régulières : secourisme (SST), gestion de conflit, et mises à niveau réglementaires pour une compétence toujours à jour.' },
            { icon: 'Users', title: 'Management de Proximité', description: 'Chaque site est suivi par un chef de secteur qui assure la bonne prise de poste, la compréhension des consignes et des contrôles qualité inopinés.' },
            { icon: 'Smartphone', title: 'Technologie & Transparence', description: 'Nous utilisons des mains courantes informatisées et des contrôleurs de ronde pour une traçabilité totale et des rapports que vous pouvez consulter.' }
        ],
        method: {
            title: "Notre Protocole de Déploiement : Rigueur et Transparence",
            description: "Chaque mission de gardiennage est encadrée par une méthode en 4 étapes qui garantit la qualité et la fiabilité de notre prestation.",
            steps: [
                { icon: 'FileSearch', title: '1. Audit & Cadrage', description: 'Analyse de votre site, des flux et des risques pour définir des consignes précises et un plan de prévention adapté.' },
                { icon: 'UserCheck', title: '2. Sélection & Formation', description: 'Affectation d\'un ou plusieurs agents dont le profil correspond à votre culture d\'entreprise, suivie d\'une formation spécifique à votre site.' },
                { icon: 'ShieldCheck', title: '3. Déploiement & Suivi', description: 'Mise en place du dispositif avec notre responsable d\'exploitation. Le suivi est assuré par des visites de site régulières.' },
                { icon: 'TrendingUp', title: '4. Évaluation & Optimisation', description: 'Points mensuels ou trimestriels pour analyser les rapports, évaluer la performance et ajuster le dispositif si nécessaire.' }
            ]
        },
        sectors: [
            { icon: 'Building2', name: 'Sièges Sociaux & Bureaux' },
            { icon: 'Factory', name: 'Sites Industriels & Entrepôts' },
            { icon: 'HardHat', name: 'Chantiers & BTP' },
            { icon: 'Store', name: 'Retail & Centres Commerciaux' },
            { icon: 'Landmark', name: 'Sites Publics & Institutionnels' },
            { icon: 'Home', name: 'Immobilier Résidentiel' }
        ],
        faq: [
            { question: 'Quelles sont les qualifications obligatoires pour un agent de sécurité ?', answer: 'Chaque agent doit détenir une carte professionnelle en cours de validité, délivrée par le CNAPS. Cela atteste qu\'il a suivi une formation certifiante (CQP APS), qu\'il n\'a pas de casier judiciaire et qu\'il est apte à exercer.' },
            { question: 'Pouvez-vous fournir des agents pour une mission urgente (ex: le jour même) ?', answer: 'Selon nos disponibilités, nous pouvons être très réactifs. Pour une urgence, le plus simple est de nous appeler directement. Nous ferons notre maximum pour trouver une solution fiable dans les meilleurs délais.' },
            { question: 'Comment gérez-vous l\'absence imprévue d\'un agent ?', answer: 'Nous disposons d\'un pool d\'agents polyvalents et d\'un système d\'astreinte qui nous permet de remplacer un agent malade ou absent rapidement, afin de garantir la continuité de service sur votre site.' },
            { question: 'Puis-je changer d\'agent si le profil ne me convient pas ?', answer: 'Oui. La relation de confiance est essentielle. Si le courant ne passe pas ou si le profil de l\'agent ne correspond pas parfaitement à vos attentes malgré nos efforts, nous nous engageons à vous proposer un autre agent.' }
        ]
    },
    {
        slug: 'agent-cynophile',
        icon: 'PawPrint',
        title: 'Agent Cynophile (Maître-chien)',
        shortDescription: 'Le binôme homme-chien pour une détection et une dissuasion renforcées.',
        description: 'L\'agent de sécurité cynophile, ou maître-chien, offre une capacité de détection et de dissuasion inégalée. Le flair et l\'ouïe du chien, combinés à l\'expertise de l\'agent, en font une solution idéale pour la surveillance de larges périmètres, chantiers, ou sites sensibles.',
        keywords: ['agent cynophile', 'maître-chien', 'sécurité canine', 'surveillance chien', 'gardiennage chantier'],
        heroImageId: 'service-agent-cyno',
        benefits: [
            { title: 'Dissuasion Maximale', description: 'La présence du chien a un effet psychologique très dissuasif sur les intrus potentiels.' },
            { title: 'Capacités de Détection Accrues', description: 'Le chien peut détecter des présences, bruits ou odeurs bien avant l\'homme.' },
            { title: 'Intervention Rapide', description: 'Le binôme peut intervenir rapidement pour intercepter un individu sur une large zone.' },
            { title: 'Idéal pour les Grands Espaces', description: 'Parfait pour la surveillance de parkings, entrepôts, chantiers, et zones isolées.' },
            { title: 'Sécurité de l\'Agent', description: 'Le chien assure également la protection de son maître lors des interventions.' },
            { title: 'Polyvalence', description: 'Efficace de jour comme de nuit, et dans des conditions météorologiques difficiles.' }
        ],
        method: {
            title: "L'intervention du binôme cynophile",
            description: "Une synergie parfaite entre l'homme et l'animal pour votre sécurité.",
            steps: [
                { icon: 'Map', title: 'Analyse du périmètre', description: 'Définition des zones de patrouille et des points sensibles à couvrir.' },
                { icon: 'PawPrint', title: 'Adaptation du binôme', description: 'Sélection d\'un binôme agent-chien adapté à la configuration de votre site (intérieur/extérieur).' },
                { icon: 'ShieldCheck', title: 'Rondes et surveillance', description: 'Exécution de rondes de prévention selon des itinéraires planifiés ou aléatoires.' },
                { icon: 'AlertTriangle', title: 'Procédure d\'intervention', description: 'En cas de détection, application des protocoles d\'interpellation et de sécurisation.' }
            ]
        },
        sectors: [
            { icon: 'HardHat', name: 'Chantiers & BTP' },
            { icon: 'Factory', name: 'Sites industriels' },
            { icon: 'Factory', name: 'Zones de stockage' },
            { icon: 'CalendarDays', name: 'Événements en extérieur' }
        ],
        faq: [
            { question: 'Les chiens sont-ils dangereux ?', answer: 'Nos chiens sont des professionnels. Ils sont parfaitement socialisés, obéissants et entraînés pour être dissuasifs et n\'intervenir que sur ordre de leur maître ou en cas de légitime défense. Ils ne représentent aucun danger pour le public dans le cadre normal de leur mission.' },
            { question: 'Un agent cynophile peut-il travailler à l\'intérieur ?', answer: 'Oui, selon la nature du site et la mission. Ils sont très efficaces pour la surveillance de grands entrepôts ou de bâtiments vides la nuit, par exemple.' }
        ]
    },
    {
        slug: 'agent-incendie-ssiap',
        icon: 'Flame',
        title: 'Agent de Sécurité Incendie (SSIAP)',
        shortDescription: 'Prévention et intervention contre les risques incendie (SSIAP 1, 2, 3).',
        description: 'Nos agents SSIAP (Service de Sécurité Incendie et d\'Assistance à Personnes) veillent à la prévention du risque incendie dans les Établissements Recevant du Public (ERP) et les Immeubles de Grande Hauteur (IGH). Ils assurent l\'entretien du matériel, la gestion des alarmes et l\'évacuation en cas de sinistre.',
        keywords: ['agent SSIAP', 'sécurité incendie', 'prévention incendie', 'SSIAP 1', 'ERP IGH'],
        heroImageId: 'service-agent-ssiap',
        benefits: [
            { title: 'Conformité Réglementaire', description: 'Assurez la conformité de votre établissement avec les réglementations de sécurité incendie.' },
            { title: 'Prévention Active', description: 'Rondes techniques, vérification des extincteurs, des issues de secours et du système de sécurité incendie.' },
            { title: 'Gestion d\'Urgence', description: 'Gestion des alarmes, alerte des secours et premières interventions pour limiter la propagation du feu.' },
            { title: 'Assistance à Personnes', description: 'Prise en charge de l\'évacuation du public et assistance aux personnes à mobilité réduite.' },
            { title: 'Interlocuteur des Secours', description: 'Accueil et guidage des sapeurs-pompiers pour une intervention plus rapide et efficace.' },
            { title: 'Sensibilisation', description: 'Peut participer à la sensibilisation de votre personnel aux risques incendie.' }
        ],
        method: {
            title: "Notre expertise en sécurité incendie",
            description: "Une mission vitale encadrée par des procédures strictes.",
            steps: [
                { icon: 'FileText', title: 'Analyse du site', description: 'Étude de votre SSI (Système de Sécurité Incendie) et des spécificités de votre établissement.' },
                { icon: 'UserCheck', title: 'Affectation d\'agents qualifiés', description: 'Déploiement d\'agents avec le niveau de qualification SSIAP (1, 2 ou 3) requis.' },
                { icon: 'BookOpen', title: 'Gestion du registre de sécurité', description: 'Tenue à jour de tous les événements, vérifications et interventions.' },
                { icon: 'Bell', title: 'Gestion des alarmes', description: 'Application des procédures de levée de doute et d\'alerte en cas d\'alarme incendie.' }
            ]
        },
        sectors: [
            { icon: 'Store', name: 'Centres commerciaux (ERP)' },
            { icon: 'Building', name: 'Immeubles de bureaux (IGH)' },
            { icon: 'Landmark', name: 'Hôtels et établissements de nuit' },
            { icon: 'Clapperboard', name: 'Salles de spectacle' }
        ],
        faq: [
            { question: 'Qu\'est-ce que la différence entre SSIAP 1, 2 et 3 ?', answer: 'SSIAP 1 est l\'agent de sécurité incendie. SSIAP 2 est le chef d\'équipe. SSIAP 3 est le chef de service, qui a un rôle de conseil et de management. Le niveau requis dépend du type et de la catégorie de votre établissement.' },
            { question: 'Un agent SSIAP est-il aussi un agent de sûreté ?', answer: 'Non, ce sont deux spécialisations distinctes. La mission principale de l\'agent SSIAP est la sécurité incendie. Bien qu\'il puisse participer à la sécurité générale, il ne peut pas se substituer à un agent de prévention et de sécurité (APS) pour les missions de sûreté (vol, malveillance).' }
        ]
    },
    {
        slug: 'agent-rondier',
        icon: 'Radio',
        title: 'Agent Rondier Intervenant',
        shortDescription: 'Rondes de surveillance et interventions sur alarme pour une sécurité active 24/7.',
        description: 'L\'agent rondier effectue des rondes de surveillance à horaires variables ou fixes pour prévenir les intrusions et anomalies sur vos sites. En cas d\'alarme, il est le premier intervenant pour effectuer la levée de doute et prendre les mesures conservatoires nécessaires, en liaison avec les forces de l\'ordre si besoin.',
        keywords: ['rondier', 'intervention sur alarme', 'ronde de sécurité', 'levée de doute', 'sécurité mobile'],
        heroImageId: 'service-agent-rondier',
        benefits: [
            { title: 'Sécurité Active 24/7', description: 'Une couverture permanente de vos sites, même en dehors des heures d\'ouverture.' },
            { title: 'Levée de Doute Rapide', description: 'Intervention immédiate pour vérifier la nature d\'une alarme et éviter les déplacements inutiles.' },
            { title: 'Effet Dissuasif', description: 'Des passages à horaires aléatoires pour perturber les tentatives de repérage.' },
            { title: 'Rapports Détaillés', description: 'Traçabilité des rondes et rapports d\'intervention précis avec photos si nécessaire.' },
            { title: 'Maîtrise des Coûts', description: 'Une solution plus économique qu\'un agent posté en permanence pour certains types de sites.' },
            { title: 'Tranquillité d\'Esprit', description: 'Sachez qu\'un professionnel est prêt à intervenir à tout moment pour protéger vos biens.' }
        ],
        method: {
            title: "Notre service de rondes et interventions",
            description: "La mobilité et la réactivité au service de votre tranquillité.",
            steps: [
                { icon: 'Map', title: 'Planification des rondes', description: 'Définition des itinéraires, des points de contrôle et de la fréquence des passages.' },
                { icon: 'KeyRound', title: 'Gestion des accès', description: 'Mise en place d\'un système sécurisé de gestion des clés ou des accès.' },
                { icon: 'AlarmClock', title: 'Intervention sur alarme', description: 'Déclenchement de l\'intervention sur appel de votre télésurveilleur.' },
                { icon: 'ShieldCheck', title: 'Sécurisation et rapport', description: 'Levée de doute, application des consignes (contacter les forces de l\'ordre, etc.) et rédaction du rapport.' }
            ]
        },
        sectors: [
            { icon: 'Building2', name: 'Zones d\'activités' },
            { icon: 'Factory', name: 'Sites industriels et entrepôts' },
            { icon: 'HardHat', name: 'Chantiers en construction' },
            { icon: 'Store', name: 'Parcs commerciaux' }
        ],
        faq: [
            { question: 'Que se passe-t-il si une intrusion est confirmée ?', answer: 'L\'agent applique les consignes définies avec vous. En général, il ne pénètre pas seul dans le bâtiment, prévient immédiatement les forces de l\'ordre, leur communique les informations utiles et met en place un périmètre de sécurité en attendant leur arrivée.' },
            { question: 'Comment suivez-vous les rondes ?', answer: 'Nous utilisons des systèmes de contrôleurs de ronde qui permettent de prouver le passage de l\'agent aux points de contrôle définis et d\'horodater chaque action. Ces rapports vous sont transmis régulièrement.' }
        ]
    },
    {
        slug: 'protection-rapprochee',
        icon: 'UserCheck',
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
        icon: 'CalendarDays',
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
        icon: 'FileSearch',
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
