
import { servicesData } from './services-data';

export type FAQ = {
    question: string;
    answer: string;
};

export type LocationService = {
    icon: string;
    title: string;
    description: string;
    href: string;
};

export type UseCase = {
    icon: string;
    title: string;
    content: string;
};

export type CityLink = {
    name: string;
    href: string;
};

export type TrustElement = {
    icon: string;
    title: string;
    description: string;
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
    };
    services: LocationService[];
    useCases: UseCase[];
    mainCities: CityLink[];
    whyUs: TrustElement[];
    faq: FAQ[];
};

const allServices = servicesData.map(service => ({
    icon: service.icon,
    title: service.title,
    description: service.shortDescription,
    href: `/services/${service.slug}`
}));

const commonWhyUs: TrustElement[] = [
    { icon: 'Award', title: 'Conformité & Réglementation', description: 'Agents agréés CNAPS, respect des conventions collectives et de la législation en vigueur.' },
    { icon: 'ClipboardCheck', title: 'Cadrage & Consignes Claires', description: 'Définition d\'un plan de mission précis et de consignes opérationnelles adaptées à votre site.' },
    { icon: 'Users', title: 'Supervision & Contrôle Qualité', description: 'Management de proximité, contrôles inopinés et suivi régulier de la prestation.' },
    { icon: 'FileText', title: 'Reporting & Transparence', description: 'Mains courantes informatisées et rapports d\'activité pour une traçabilité totale.' }
];

export const locationsData: Location[] = [
    {
        slug: 'yvelines-78',
        name: 'Yvelines (78)',
        title: 'Sécurité Privée & Gardiennage dans les Yvelines (78)',
        description: "Solutions de sécurité sur-mesure pour entreprises, chantiers et sites résidentiels dans les Yvelines. Basés à Plaisir, nous assurons une réactivité optimale sur tout le 78.",
        keywords: ['sécurité privée yvelines', 'gardiennage 78', 'entreprise sécurité plaisir', 'surveillance chantier 78', 'agent de sécurité yvelines'],
        heroImageId: 'zone-paris', // Placeholder, needs specific image
        intro: {
            title: "Votre Partenaire Sécurité de Proximité dans les Yvelines",
            content: "Ancrés à Plaisir, au cœur des Yvelines, nous comprenons les enjeux de sécurité variés de notre département : des zones d'activités de Saint-Quentin-en-Yvelines aux sites résidentiels de Versailles, en passant par les nombreux chantiers qui façonnent notre territoire. Notre parfaite connaissance du terrain nous permet de déployer des dispositifs de surveillance, de gardiennage et d'intervention rapides et efficaces, parfaitement adaptés au contexte local."
        },
        services: allServices,
        useCases: [
            { icon: 'HardHat', title: 'Surveillance de Chantiers (BTP)', content: 'Prévention des vols de matériaux et du vandalisme grâce à des rondes dissuasives, des agents cynophiles et un contrôle strict des accès, de jour comme de nuit.' },
            { icon: 'Building2', title: 'Contrôle d’Accès en Entreprise', content: 'Gestion des flux de visiteurs et de livraisons pour les parcs d\'activités et sièges sociaux, avec des agents formés à l\'accueil et à la gestion des accès.' }
        ],
        mainCities: [
            { name: 'Plaisir', href: '/villes/plaisir-78370' },
            { name: 'Versailles', href: '/villes/versailles-78000' },
            { name: 'Saint-Germain-en-Laye', href: '/villes/saint-germain-en-laye-78100' },
            { name: 'Montigny-le-Bretonneux', href: '/villes/montigny-le-bretonneux-78180' }
        ],
        whyUs: commonWhyUs,
        faq: [
            { question: 'Quels sont vos délais d\'intervention dans le 78 ?', answer: 'Étant basés à Plaisir, nous garantissons une excellente réactivité sur tout le département, avec des délais d\'intervention d\'urgence parmi les plus courts du secteur.' },
            { question: 'Comment sont calculés vos tarifs pour une mission dans les Yvelines ?', answer: 'Nos tarifs dépendent du type de mission (agent posté, rondes), des horaires (jour/nuit), et de la technicité requise. Nous fournissons un devis détaillé après analyse de vos besoins.' },
        ]
    },
    {
        slug: 'paris-75',
        name: 'Paris (75)',
        title: 'Agence de Sécurité Privée à Paris (75) | Luxe, Événementiel, Entreprise',
        description: 'Services de sécurité haut de gamme à Paris : protection de boutiques de luxe, sécurité événementielle, surveillance de sièges sociaux et contrôle d\'accès. Discrétion et professionnalisme garantis.',
        keywords: ['sécurité privée paris', 'agence sécurité paris 75', 'gardiennage luxe paris', 'sécurité événementielle paris', 'protection rapprochée paris'],
        heroImageId: 'zone-paris',
        intro: {
            title: "L'Excellence de la Sécurité pour la Capitale",
            content: "Paris, vitrine mondiale du luxe, des affaires et de la culture, exige un niveau de sécurité irréprochable. Notre agence déploie des dispositifs de sûreté adaptés aux environnements les plus prestigieux et exigeants : surveillance de boutiques dans le Triangle d'Or, filtrage pour des événements de la Fashion Week, protection de sièges sociaux ou encore sécurisation de palaces. Nos agents allient savoir-faire technique et savoir-être exemplaire."
        },
        services: allServices,
        useCases: [
            { icon: 'Gem', title: 'Sûreté des Boutiques de Luxe et Bijouteries', content: 'Agents formés aux codes du luxe, assurant une présence dissuasive mais discrète, la gestion des flux de clientèle et la prévention des vols à l\'étalage et des braquages.' },
            { icon: 'CalendarDays', title: 'Sécurisation d\'Événements de Prestige', content: 'Coordination complète de la sûreté pour vos lancements de produits, défilés, galas ou soirées privées, incluant le contrôle d\'accès, la gestion des foules et la protection des zones VIP.' }
        ],
        mainCities: [
            { name: 'Paris 8e (Triangle d\'Or)', href: '/villes/paris-8-75008' },
            { name: 'Paris 1er (Vendôme)', href: '/villes/paris-1-75001' },
            { name: 'Le Marais', href: '#' },
            { name: 'La Défense (via Courbevoie)', href: '/villes/la-defense-92400' }
        ],
        whyUs: commonWhyUs,
        faq: [
            { question: 'Vos agents sont-ils adaptés au secteur du luxe ?', answer: 'Oui, nos agents affectés à ces missions reçoivent une formation spécifique sur la posture, la discrétion et la communication en environnement de luxe pour une intégration parfaite.' },
            { question: 'Intervenez-vous pour des missions de courte durée à Paris ?', answer: 'Absolument. Nous sommes spécialisés dans la sécurisation d\'événements ponctuels, de pop-up stores ou de missions de protection rapprochée de quelques heures à plusieurs jours.' }
        ]
    },
     {
        slug: 'hauts-de-seine-92',
        name: 'Hauts-de-Seine (92)',
        title: 'Sécurité Entreprise Hauts-de-Seine (92) | La Défense, Neuilly',
        description: 'Solutions de sûreté B2B pour les Hauts-de-Seine. Sécurisation de sièges sociaux (La Défense), contrôle d\'accès, accueil sûreté et gardiennage pour bureaux et zones résidentielles premium.',
        keywords: ['sécurité entreprise 92', 'gardiennage la défense', 'contrôle accès hauts-de-seine', 'agent sécurité neuilly', 'sûreté 92'],
        heroImageId: 'zone-hauts-de-seine',
        intro: {
            title: "Haute Sûreté pour le Cœur Économique de l'Île-de-France",
            content: "Avec La Défense, premier quartier d'affaires européen, les Hauts-de-Seine concentrent un nombre inégalé de sièges sociaux et de sites stratégiques. Notre expertise est tournée vers la sûreté tertiaire : contrôle d'accès biométrique, gestion des flux de milliers de collaborateurs, accueil et orientation, et protection des infrastructures critiques. Nous sécurisons votre environnement de travail pour garantir la continuité de votre activité."
        },
        services: allServices,
        useCases: [
            { icon: 'Building2', title: 'Sûreté des Sièges Sociaux et IGH', content: 'Dispositifs complets incluant agents postés, SSIAP, opérateurs PC sécurité et rondiers pour assurer la protection 24/7 des Immeubles de Grande Hauteur et des campus d\'entreprise.' },
            { icon: 'Users', title: 'Contrôle d\'Accès et Accueil Sûreté', content: 'Agents formés à la gestion des systèmes de contrôle d\'accès modernes, à l\'accueil des visiteurs et à la détection des comportements suspects dans les halls d\'entrée.' }
        ],
        mainCities: [
            { name: 'La Défense', href: '/villes/la-defense-92400' },
            { name: 'Neuilly-sur-Seine', href: '/villes/neuilly-sur-seine-92200' },
            { name: 'Boulogne-Billancourt', href: '/villes/boulogne-billancourt-92100' },
            { name: 'Levallois-Perret', href: '/villes/levallois-perret-92300' }
        ],
        whyUs: commonWhyUs,
        faq: [
            { question: 'Comment gérez-vous la sécurité dans un IGH (Immeuble de Grande Hauteur) ?', answer: 'Cela requiert une double compétence Sûreté (malveillance) et Sécurité Incendie (SSIAP). Nous mettons en place un PC de sécurité centralisé, des procédures d\'évacuation claires et une coordination permanente entre les différentes équipes.' },
            { question: 'Proposez-vous des audits pour nos bureaux dans le 92 ?', answer: 'Oui, notre service d\'Audit & Conseil peut analyser vos procédures actuelles, tester vos systèmes et vous fournir des recommandations pour renforcer la sûreté de votre siège.' }
        ]
    },
    {
        slug: 'seine-saint-denis-93',
        name: 'Seine-Saint-Denis (93)',
        title: 'Sécurité Chantier & Logistique en Seine-Saint-Denis (93)',
        description: 'Experts en surveillance de chantiers (Grand Paris Express), entrepôts et sites logistiques en Seine-Saint-Denis. Agents qualifiés, rondiers et maîtres-chiens pour prévenir vols et dégradations.',
        keywords: ['sécurité chantier 93', 'gardiennage entrepôt seine-saint-denis', 'agent cynophile 93', 'surveillance logistique', 'sécurité saint-denis'],
        heroImageId: 'zones-hub', // Placeholder
        intro: {
            title: "Protection des Actifs Logistiques et Industriels du 93",
            content: "La Seine-Saint-Denis est un territoire dynamique, au cœur de projets d'envergure comme le Grand Paris Express et abritant de nombreuses plateformes logistiques. La protection des chantiers contre le vol de matériaux et la sécurisation des entrepôts contre les intrusions sont nos priorités. Nous déployons des solutions robustes, notamment des agents cynophiles, des rondes nocturnes et un contrôle rigoureux des accès pour protéger vos investissements."
        },
        services: allServices,
        useCases: [
            { icon: 'HardHat', title: 'Surveillance de Chantiers et BTP', content: 'Gardiennage permanent ou aléatoire, contrôle des entrées/sorties de véhicules, et rondes nocturnes avec agent cynophile pour dissuader les intrusions et protéger vos équipements.' },
            { icon: 'Factory', title: 'Sécurisation de Plateformes Logistiques', content: 'Contrôle des conducteurs, vérification des scellés, surveillance des zones de stockage et prévention de la démarque inconnue pour les entrepôts et zones de fret.' }
        ],
        mainCities: [
            { name: 'Saint-Denis', href: '/villes/saint-denis-93200' },
            { name: 'Aubervilliers', href: '/villes/aubervilliers-93300' },
            { name: 'Montreuil', href: '#' },
            { name: 'Pantin', href: '#' }
        ],
        whyUs: commonWhyUs,
        faq: [
            { question: 'L\'agent cynophile est-il la meilleure solution pour un chantier ?', answer: 'Très souvent, oui. Le flair et l\'effet dissuasif du chien sont particulièrement efficaces pour surveiller de grandes surfaces peu éclairées la nuit, comme les chantiers ou les entrepôts.' },
            { question: 'Comment assurez-vous la traçabilité des rondes ?', answer: 'Nos agents utilisent des contrôleurs de ronde électroniques qui valident leur passage à des points stratégiques. Les rapports sont ensuite mis à votre disposition.' }
        ]
    },
    {
        slug: 'val-de-marne-94',
        name: 'Val-de-Marne (94)',
        title: 'Sécurité Logistique & Tertiaire dans le Val-de-Marne (94)',
        description: 'Solutions de sécurité pour les zones d\'activités, les plateformes logistiques (Rungis) et les sites tertiaires du Val-de-Marne. Contrôle d\'accès, rondes et gardiennage.',
        keywords: ['sécurité val-de-marne', 'gardiennage rungis', 'entreprise sécurité 94', 'surveillance zone d\'activité', 'agent de sécurité créteil'],
        heroImageId: 'zones-hub', // Placeholder
        intro: {
            title: 'Sûreté des Pôles Économiques et Logistiques du 94',
            content: 'Le Val-de-Marne est un département clé pour la logistique en Île-de-France, avec en son cœur le Marché International de Rungis. Notre expertise s\'étend de la sécurisation de ces flux de marchandises à la protection des nombreux parcs d\'activités et zones tertiaires. Nous fournissons des services de contrôle d\'accès, de rondes d\'intervention et de gardiennage pour assurer la fluidité et la sécurité de vos opérations.'
        },
        services: allServices,
        useCases: [
            { icon: 'Truck', title: 'Sécurisation du Hub de Rungis', content: 'Contrôle des accès véhicules, surveillance des entrepôts frigorifiques, prévention des vols de marchandises et gestion des flux 24/7 sur le plus grand marché de produits frais au monde.' },
            { icon: 'Building2', title: 'Gardiennage de Parcs Tertiaires', content: 'Présence dissuasive, rondes de fermeture et d\'ouverture, et intervention sur alarme pour les ensembles de bureaux et les zones d\'activités du département.' }
        ],
        mainCities: [
            { name: 'Créteil', href: '/villes/creteil-94000' },
            { name: 'Vitry-sur-Seine', href: '#' },
            { name: 'Rungis', href: '/villes/rungis-94150' },
            { name: 'Ivry-sur-Seine', href: '/villes/ivry-sur-seine-94200' }
        ],
        whyUs: commonWhyUs,
        faq: [
            { question: 'Quelle est la spécificité de la sécurité à Rungis ?', answer: 'La sécurité à Rungis implique de gérer d\'énormes flux de véhicules et de personnes à des horaires décalés, de maîtriser les risques liés à la chaîne du froid et de mettre en place une prévention efficace contre le vol de marchandises de grande valeur.' },
            { question: 'Intervenez-vous la nuit et les week-ends dans le 94 ?', answer: 'Oui, nos services de rondes et d\'intervention sur alarme sont opérationnels 24h/24 et 7j/7 pour garantir la continuité de la protection de vos sites.' }
        ]
    },
    {
        slug: 'val-doise-95',
        name: 'Val-d\'Oise (95)',
        title: 'Sécurité & Surveillance dans le Val-d\'Oise (95) | Roissy, Cergy',
        description: 'Votre expert en sécurité pour le Val-d\'Oise. Surveillance de plateformes logistiques (zone de Roissy), parcs d\'activités (Cergy) et sites industriels. Agents cynophiles, rondiers et gardiennage.',
        keywords: ['sécurité val-d\'oise', 'gardiennage roissy', 'entreprise sécurité 95', 'surveillance cergy', 'agent cynophile 95'],
        heroImageId: 'zones-hub', // Placeholder
        intro: {
            title: "Protéger les Axes Stratégiques du Val-d'Oise",
            content: "Le Val-d'Oise est une plaque tournante pour la logistique, notamment autour de la plateforme aéroportuaire de Roissy-Charles de Gaulle. La sécurisation des zones de fret, des entrepôts et des parcs d'activités comme celui de Cergy-Pontoise est notre cœur de métier. Nous y déployons des solutions efficaces comme les rondes de surveillance, le gardiennage posté et les équipes cynophiles pour protéger les biens et les infrastructures."
        },
        services: allServices,
        useCases: [
            { icon: 'Plane', title: 'Sûreté des Zones de Fret Aéroportuaires', content: 'Contrôle d\'accès strict des zones réglementées, inspection des véhicules, surveillance des entrepôts sous douane et prévention des intrusions sur les sites logistiques de la zone de Roissy.' },
            { icon: 'Building2', title: 'Surveillance des Parcs d\'Activités', content: 'Mutualisation de services de rondes et d\'intervention pour plusieurs entreprises au sein d\'un même parc d\'activités, offrant une solution de sécurité performante et économique.' }
        ],
        mainCities: [
            { name: 'Cergy', href: '/villes/cergy-95000' },
            { name: 'Argenteuil', href: '/villes/argenteuil-95100' },
            { name: 'Roissy-en-France', href: '/villes/roissy-en-france-95700' },
            { name: 'Sarcelles', href: '#' }
        ],
        whyUs: commonWhyUs,
        faq: [
            { question: 'Vos agents ont-ils les accréditations pour la zone aéroportuaire ?', answer: 'Oui, les agents déployés en zone aéroportuaire possèdent les habilitations et formations requises pour travailler dans cet environnement réglementé et sensible.' },
            { question: 'Est-il possible de mettre en place une surveillance pour un seul entrepôt ?', answer: 'Absolument. Nous proposons des services sur mesure, que ce soit pour un site unique avec un agent posté ou pour un ensemble de sites avec des rondes mutualisées.' }
        ]
    },
    {
        slug: 'seine-et-marne-77',
        name: 'Seine-et-Marne (77)',
        title: 'Sécurité & Gardiennage en Seine-et-Marne (77)',
        description: 'Solutions de sécurité pour les grands sites de Seine-et-Marne : plateformes logistiques, parcs d\'attractions, sites industriels isolés. Rondes de surveillance, agents cynophiles et gardiennage.',
        keywords: ['sécurité seine-et-marne', 'gardiennage 77', 'entreprise sécurité marne-la-vallée', 'agent cynophile 77', 'surveillance site isolé'],
        heroImageId: 'zones-hub', // Placeholder
        intro: {
            title: "Surveillance de Grands Espaces en Seine-et-Marne",
            content: "Le plus vaste département d'Île-de-France, la Seine-et-Marne, se caractérise par ses grands sites : plateformes logistiques étendues, parcs de loisirs comme Disneyland Paris, et sites industriels parfois isolés. La surveillance de ces grands périmètres est un défi que nous relevons grâce à des équipes mobiles, des rondiers intervenants et des maîtres-chiens, particulièrement efficaces pour couvrir de vastes zones."
        },
        services: allServices,
        useCases: [
            { icon: 'Truck', title: 'Surveillance de Plateformes Logistiques XXL', content: 'Dispositifs alliant agents postés aux entrées, rondiers véhiculés pour les périmètres, et équipes cynophiles pour les zones de stockage extérieures, garantissant une couverture complète.' },
            { icon: 'Castle', title: 'Soutien Sécurité pour Sites Touristiques', content: 'Renforts pour la gestion des flux lors des pics de fréquentation, la surveillance des parkings et la sécurisation des événements spéciaux pour les parcs de loisirs et sites touristiques.' }
        ],
        mainCities: [
            { name: 'Marne-la-Vallée / Chessy', href: '/villes/marne-la-vallee-77700' },
            { name: 'Meaux', href: '/villes/meaux-77100' },
            { name: 'Melun', href: '/villes/melun-77000' },
            { name: 'Serris', href: '#' }
        ],
        whyUs: commonWhyUs,
        faq: [
            { question: 'Comment sécuriser efficacement un site très étendu ?', answer: 'La meilleure approche est une stratégie mixte : des agents postés aux points névralgiques (entrées, PC sécurité) et des équipes mobiles (rondiers, cynophiles) pour assurer une présence dynamique et imprévisible sur l\'ensemble du périmètre.' },
            { question: 'Vos services sont-ils discrets pour ne pas gêner les visiteurs ?', answer: 'Oui, pour les sites recevant du public, nous privilégions une approche de "sécurité-service". Nos agents sont formés pour être serviables et discrets, alliant posture d\'accueil et vigilance.' }
        ]
    },
    {
        slug: 'essonne-91',
        name: 'Essonne (91)',
        title: 'Sécurité pour Pôles Technologiques & Tertiaires en Essonne (91)',
        description: 'Services de sécurité spécialisés pour les pôles d\'excellence de l\'Essonne (Paris-Saclay), les parcs d\'activités (Massy) et les entreprises. Contrôle d\'accès, gardiennage et audit de sûreté.',
        keywords: ['sécurité essonne', 'gardiennage saclay', 'entreprise sécurité 91', 'surveillance massy', 'sécurité pôle technologique'],
        heroImageId: 'zones-hub', // Placeholder
        intro: {
            title: "Protéger l'Innovation et la Recherche en Essonne",
            content: "L'Essonne est devenue un pôle d'excellence en matière de recherche et de technologie, notamment avec le cluster de Paris-Saclay. La protection de la propriété intellectuelle, des laboratoires et des campus universitaires est un enjeu majeur. Nous proposons des solutions de contrôle d'accès avancées, des agents formés aux environnements sensibles et des audits de sûreté pour protéger ces sites à haute valeur ajoutée."
        },
        services: allServices,
        useCases: [
            { icon: 'FlaskConical', title: 'Sécurisation de Campus et Centres de Recherche', content: 'Contrôle des accès aux laboratoires, surveillance des bâtiments, gestion des visiteurs et protection des données et équipements sensibles sur les pôles technologiques et universitaires.' },
            { icon: 'Building2', title: 'Sûreté des Parcs d\'Affaires de Massy et Évry', content: 'Services de gardiennage, rondes d\'intervention mutualisées et contrôle des accès pour les entreprises des grands parcs tertiaires du département.' }
        ],
        mainCities: [
            { name: 'Évry-Courcouronnes', href: '/villes/evry-courcouronnes-91000' },
            { name: 'Massy', href: '/villes/massy-91300' },
            { name: 'Palaiseau', href: '#' },
            { name: 'Saclay', href: '/villes/saclay-91400' }
        ],
        whyUs: commonWhyUs,
        faq: [
            { question: 'Comment sécuriser un laboratoire de recherche ?', answer: 'Cela passe par un contrôle d\'accès très strict, une traçabilité de toutes les entrées/sorties, des rondes pour détecter les anomalies et une sensibilisation du personnel. Un audit préalable est souvent nécessaire pour définir le bon niveau de sûreté.' },
            { question: 'Vos agents peuvent-ils s\'intégrer à un environnement international comme Saclay ?', answer: 'Oui, nous pouvons affecter des agents maîtrisant l\'anglais et formés à interagir avec un public international (chercheurs, étudiants, délégations).' }
        ]
    }
];
