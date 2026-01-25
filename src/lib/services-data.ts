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
  icon: string; // nom lucide
  title: string;
  description: string;
};

export type SeoBlock = {
  metaTitle?: string;
  metaDescription?: string;
  h1?: string;
  slugKeyword?: string;
  secondaryKeywords?: string[];
};

export type ContentSection = {
  id: string;
  title: string;
  intro?: string;
  bullets?: string[];
  paragraphs?: string[];
  note?: string;
  internalLinks?: { label: string; href: string }[];
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

  // ✅ enrichissement SEO + pages riches
  seo?: SeoBlock;
  page?: {
    lead?: string;
    sections: ContentSection[];
    faqLong?: FAQ[];
    relatedServices?: string[];
  };
};

// --- Helpers (optionnels) ---
function ensureHero(id: string) {
  return PlaceHolderImages.some((p) => p.id === id) ? id : "hero";
}

export const servicesData: Service[] = [
  {
    slug: "agent-securite-qualifie",
    icon: "Shield",
    title: "Agent de Sécurité Qualifié (APS)",
    shortDescription:
      "La référence en gardiennage et surveillance de site. Fiabilité, rigueur et professionnalisme pour une tranquillité d’esprit totale.",
    description:
      "Nos agents de sécurité qualifiés (CQP-APS) sont le pilier de la protection des biens et des personnes. Postés, véhiculés ou en rondes, ils contrôlent les accès, préviennent les actes de malveillance et gèrent les incidents, garantissant un environnement sûr pour vos collaborateurs, vos clients et vos actifs.",
    keywords: [
      "agent de sécurité",
      "gardiennage",
      "surveillance de site",
      "agent APS",
      "sécurité entreprise",
      "contrôle d'accès",
      "prévention malveillance",
      "sécurité privée Île-de-France",
    ],
    heroImageId: ensureHero("service-agent-qualifie"),
    benefits: [
      {
        title: "Dissuasion & prévention active",
        description:
          "Une présence visible et professionnelle réduit significativement les risques d’intrusion, de vol et de vandalisme. Nos agents détectent les comportements suspects et agissent en amont.",
      },
      {
        title: "Contrôle d’accès rigoureux",
        description:
          "Filtrage des visiteurs, véhicules et livraisons selon vos procédures, pour garantir que seules les personnes autorisées accèdent à vos locaux.",
      },
      {
        title: "Gestion sereine des incidents",
        description:
          "Calme, méthode et coordination : nos agents appliquent les consignes et gèrent l’urgence efficacement, avant l’arrivée des secours si nécessaire.",
      },
      {
        title: "Traçabilité & reporting complet",
        description:
          "Main courante électronique, rapports clairs et réguliers : incidents, anomalies, actions correctives et recommandations.",
      },
      {
        title: "Flexibilité & adaptabilité",
        description:
          "Horaires, missions, effectifs : un dispositif ajusté à vos besoins (24/7, renforts ponctuels, opérations sensibles, etc.).",
      },
      {
        title: "Image de marque valorisée",
        description:
          "Posture, tenue et savoir-être : une présence qui renforce votre sérieux auprès de vos clients, partenaires et équipes.",
      },
    ],
    whyUs: [
      {
        icon: "UserCheck",
        title: "Recrutement sélectif",
        description:
          "Agents titulaires de la carte professionnelle, expérience vérifiée, savoir-être exigeant. Le sérieux prime.",
      },
      {
        icon: "BookOpen",
        title: "Formation continue",
        description:
          "Remises à niveau régulières : SST, gestion de conflit, procédures site, conformité et bonnes pratiques opérationnelles.",
      },
      {
        icon: "Users",
        title: "Management de proximité",
        description:
          "Chef de secteur, contrôles qualité, coordination et ajustements : un pilotage réel, pas une simple mise à disposition.",
      },
      {
        icon: "Smartphone",
        title: "Technologie & transparence",
        description:
          "Traçabilité et reporting exploitables : rondes, événements, photos si nécessaire, synthèses et recommandations.",
      },
    ],
    method: {
      title: "Notre protocole de déploiement : rigueur et transparence",
      description:
        "Chaque mission de gardiennage est encadrée par une méthode en 4 étapes qui garantit la qualité et la fiabilité de la prestation.",
      steps: [
        {
          icon: "FileSearch",
          title: "Audit & cadrage",
          description:
            "Analyse du site, des flux et des risques pour définir des consignes précises et un plan de prévention adapté.",
        },
        {
          icon: "UserCheck",
          title: "Sélection & formation",
          description:
            "Affectation d’un agent au profil cohérent avec votre contexte, puis briefing et formation spécifique au site.",
        },
        {
          icon: "ShieldCheck",
          title: "Déploiement & suivi",
          description:
            "Mise en place du dispositif avec supervision, contrôles qualité, et suivi régulier par l’encadrement.",
        },
        {
          icon: "TrendingUp",
          title: "Évaluation & optimisation",
          description:
            "Points réguliers, analyse des rapports et ajustements du dispositif selon vos priorités et l’évolution du risque.",
        },
      ],
    },
    sectors: [
      { icon: "Building2", name: "Sièges sociaux & bureaux" },
      { icon: "Factory", name: "Sites industriels & entrepôts" },
      { icon: "HardHat", name: "Chantiers & BTP" },
      { icon: "Store", name: "Retail & centres commerciaux" },
      { icon: "Landmark", name: "Sites publics & institutionnels" },
      { icon: "Home", name: "Immobilier résidentiel" },
    ],
    faq: [
      {
        question: "Quelles sont les qualifications obligatoires pour un agent de sécurité ?",
        answer:
          "Chaque agent doit détenir une carte professionnelle CNAPS en cours de validité. Cela atteste d’une formation certifiante (CQP APS), d’un casier compatible et de l’aptitude à exercer.",
      },
      {
        question: "Pouvez-vous fournir des agents pour une mission urgente (ex : le jour même) ?",
        answer:
          "Selon nos disponibilités, nous pouvons être très réactifs. Pour une urgence, appelez-nous : nous évaluons la faisabilité et proposons une solution fiable au plus vite.",
      },
      {
        question: "Comment gérez-vous l’absence imprévue d’un agent ?",
        answer:
          "Nous disposons d’un système d’astreinte et d’un vivier d’agents polyvalents permettant de remplacer rapidement un agent malade ou absent, afin d’assurer la continuité du service.",
      },
      {
        question: "Puis-je changer d’agent si le profil ne me convient pas ?",
        answer:
          "Oui. La relation de confiance est essentielle. Si le profil ne correspond pas malgré les ajustements, nous vous proposons un remplacement.",
      },
    ],
    seo: {
      slugKeyword: "agent de sécurité qualifié",
      secondaryKeywords: [
        "agent APS",
        "gardiennage entreprise",
        "surveillance de site Île-de-France",
        "contrôle d’accès sécurité",
        "agent de sécurité 24/7",
      ],
      metaTitle: "Agent de sécurité qualifié (APS) en Île-de-France | Basic Protection",
      metaDescription:
        "Agent APS pour gardiennage, contrôle d’accès, rondes et prévention malveillance. Dispositif cadré, encadré et traçable. Intervention 75, 78, 92, 93, 94, 95, 77, 91.",
      h1: "Agent de Sécurité Qualifié (APS) en Île-de-France",
    },
    page: {
        lead:
          "Un agent de sécurité qualifié (APS) n’est pas “une présence”. C’est un dispositif humain structuré, capable de dissuader, contrôler, prévenir et gérer les incidents avec méthode. Notre approche combine recrutement sélectif, consignes de poste claires, supervision opérationnelle et reporting exploitable. Objectif : sécuriser vos biens et vos personnes sans perturber votre activité — et vous donner une visibilité réelle sur ce qui se passe sur site.",
        sections: [
          {
            id: "intro-aps",
            title: "Agent APS : le socle d’une sécurité efficace (et mesurable)",
            paragraphs: [
              "Dans la majorité des situations professionnelles (bureaux, sites logistiques, commerces, chantiers, immeubles…), la meilleure décision n’est pas forcément d’empiler des caméras ou des alarmes. La vraie différence se fait souvent grâce à l’humain : un agent APS bien encadré anticipe, observe, dissuade et réagit. Il ne “subit” pas le risque : il le réduit concrètement.",
              "Un agent de prévention et de sécurité (APS) est formé pour appliquer des consignes, contrôler les accès, effectuer des rondes, signaler les anomalies, gérer les premiers instants d’un incident et coordonner l’alerte. Son action est déterminante dans les périodes sensibles : fermeture, horaires creux, pics d’affluence, livraisons, rotation des prestataires, ou sites en travaux.",
              "Mais attention : deux prestations APS peuvent être radicalement différentes. La qualité dépend rarement du “nombre d’heures” ; elle dépend surtout de l’organisation : briefing, consignes, contrôle qualité, traçabilité et supervision. C’est précisément ce que nous structurons pour que ton dispositif soit à la fois rassurant, dissuasif et pilotable."
            ],
            note:
              "Point clé : une prestation de gardiennage réussie doit être “auditée, cadrée, suivie et documentée”. Sans ça, tu payes une présence… sans maîtrise.",
            internalLinks: [
              { label: "Renforcer la dissuasion : agent cynophile", href: "/services/agent-cynophile" },
              { label: "Multi-sites & alarmes : rondier intervenant", href: "/services/agent-rondier" }
            ]
          },
      
          {
            id: "cas-usage",
            title: "Dans quels cas choisir un agent de sécurité qualifié ?",
            intro:
              "Un APS est pertinent dès que tu veux sécuriser un lieu avec un niveau de contrôle et de prévention qui va au-delà de la simple vidéosurveillance.",
            bullets: [
              "Surveillance de site (jour, nuit, 24/7) : bureaux, sièges, plateformes, sites techniques",
              "Contrôle d’accès : visiteurs, badges, véhicules, livraisons, prestataires",
              "Protection contre intrusion, vol, vandalisme : périodes à risque, fermetures, chantiers",
              "Sécurisation d’espaces ouverts : parkings, entrées multiples, zones de stockage",
              "Gestion de flux : pics d’affluence, mouvements de personnel, événements internes",
              "Sécurisation de zones sensibles : matériel, locaux techniques, data rooms, stocks"
            ],
            paragraphs: [
              "Concrètement, l’agent APS agit comme un filtre intelligent : il réduit les opportunités (intrusion, repérage, accès non autorisé) et augmente la perception du risque chez les personnes mal intentionnées. Une présence visible, cadrée et professionnelle suffit souvent à éviter le passage à l’acte.",
              "Autre bénéfice : la continuité. Sur certains sites, les incidents “mineurs” répétés (portes mal fermées, badges prêtés, zones mal éclairées, dépôts sauvages, attroupements) finissent par coûter cher. L’APS met de l’ordre, installe une discipline, et rend la sécurité plus stable dans le temps."
            ]
          },
      
          {
            id: "missions-detail",
            title: "Missions APS : contrôle, prévention, gestion d’incident (avec méthode)",
            paragraphs: [
              "Un bon APS ne passe pas son temps à “attendre”. Il suit un schéma simple et efficace : observer → détecter → agir selon consignes → tracer. Son rôle est d’être le premier maillon opérationnel avant l’arrivée des secours ou des forces de l’ordre, si la situation l’exige.",
              "Sur la partie contrôle, l’agent applique tes règles : filtrage des entrées, gestion des visiteurs, vérification des autorisations, contrôle des livraisons, et sécurisation des accès sensibles. Sur la partie prévention, il patrouille et repère les anomalies : portes ouvertes, comportements suspects, alarmes techniques, éclairage défaillant, présence non autorisée, etc.",
              "Sur la partie incident, il intervient dans un cadre précis : sécurisation, éloignement si nécessaire, alerte, communication structurée, et compte rendu. La valeur ajoutée est là : réduire l’impact d’un incident dès les premières minutes."
            ],
            bullets: [
              "Contrôle d’accès : personnes, véhicules, prestataires, livraisons",
              "Rondes de prévention : itinéraires fixes ou aléatoires, points sensibles",
              "Gestion des alarmes : levée de doute (selon consignes et contexte)",
              "Sécurisation d’anomalies : fermeture, balisage, signalement",
              "Gestion des conflits : posture, désescalade, appel renfort si nécessaire",
              "Traçabilité : main courante, rapports, remontées d’amélioration"
            ],
            note:
              "Ton dispositif est plus solide quand l’agent a une liste claire de “points vitaux” : accès secondaires, issues, parkings, zones stock, locaux techniques, angle morts."
          },
      
          {
            id: "qualite-difference",
            title: "Ce qui fait la différence : encadrement, consignes, traçabilité",
            paragraphs: [
              "Beaucoup de clients ont déjà vécu une prestation où “tout semble correct” jusqu’au jour où un incident survient… et personne ne sait exactement ce qui s’est passé, ni à quelle heure, ni quelles actions ont été menées. Résultat : frustration, perte de confiance, et sécurité “théorique”.",
              "Pour éviter ça, on travaille sur 4 piliers. D’abord : des consignes de poste simples, opérationnelles, et vraiment comprises par l’agent. Ensuite : un management de proximité (chef de secteur, contrôles, ajustements). Puis : une traçabilité exploitable (main courante, rapports, photos si nécessaire). Enfin : une logique d’amélioration continue (analyse des incidents, recommandations, ajustements).",
              "C’est cette structure qui transforme le gardiennage en sécurité pilotée. Tu ne payes pas “des heures” : tu finances un résultat."
            ],
            bullets: [
              "Consignes de poste : claires, testées, applicables en situation réelle",
              "Briefings : prise de poste, procédures, points sensibles, escalade",
              "Contrôles qualité : visites inopinées, vérification posture/procédure",
              "Reporting : événements, anomalies, statistiques, recommandations",
              "Ajustements : horaires, effectifs, zones, consignes selon le terrain"
            ]
          },
      
          {
            id: "recrutement-formation",
            title: "Recrutement & formation : pourquoi c’est non négociable",
            paragraphs: [
              "Un agent APS, c’est aussi un comportement : ponctualité, posture, calme, politesse, capacité à communiquer, et discipline. Une grande partie de la performance de la mission se joue sur le savoir-être, pas uniquement sur le savoir-faire.",
              "C’est pourquoi nous insistons sur le recrutement (profil + expérience + cohérence avec ton environnement) et sur la formation continue : procédures, prévention, gestion des conflits, et remise à niveau. Dans les sites sensibles, un agent mal adapté peut créer plus de risque qu’il n’en réduit. Inversement, un agent bien choisi améliore la sécurité… et l’ambiance."
            ],
            bullets: [
              "Savoir-être : accueil, autorité calme, posture pro",
              "Compréhension des consignes : application stricte mais intelligente",
              "Communication : remontées utiles, escalade structurée",
              "Réactivité : gestion des premières minutes d’un incident",
              "Culture prévention : réduire les opportunités et les répétitions"
            ]
          },
      
          {
            id: "secteurs-exemples",
            title: "Exemples concrets par secteur (bureaux, retail, logistique, chantiers)",
            paragraphs: [
              "Dans un siège ou des bureaux, le risque principal est souvent l’accès non autorisé (prestataires, visiteurs, livraisons, badges). L’APS agit comme filtre : il sécurise l’accueil, contrôle les entrées, veille aux zones sensibles et réduit les comportements à risque.",
              "Dans le retail ou les centres commerciaux, l’agent contribue à la prévention des vols, à la gestion des flux et à la désescalade. Il protège aussi l’image du lieu : posture, communication, et présence dissuasive sans agressivité.",
              "En logistique/entrepôt, l’enjeu est la sécurisation des accès véhicules, des quais, des stocks, et des zones périphériques. Les rondes sur les points faibles (angles morts, clôtures, parkings, issues) font la différence.",
              "Sur un chantier, le risque est élevé : matériel, accès multiples, horaires variables. Ici, la prévention + dissuasion + traçabilité évitent les intrusions et les vols “opportunistes”."
            ],
            internalLinks: [
              { label: "Chantiers & grands périmètres : cynophile", href: "/services/agent-cynophile" },
              { label: "Multi-sites + alarmes : rondier intervenant", href: "/services/agent-rondier" }
            ]
          },
      
          {
            id: "idf-local",
            title: "Intervention en Île-de-France : organisation, réactivité, continuité",
            paragraphs: [
              "En Île-de-France, les contraintes sont particulières : densité, flux importants, sites multi-accès, contraintes de stationnement et de timing. Un dispositif APS performant doit être organisé : continuité de service, procédures claires, et encadrement réel.",
              "Nous intervenons sur l’ensemble de l’Île-de-France (Paris 75, Yvelines 78, Hauts-de-Seine 92, Seine-Saint-Denis 93, Val-de-Marne 94, Val-d’Oise 95, Seine-et-Marne 77, Essonne 91). Le cadrage de départ est essentiel : points sensibles, horaires, consignes, accès, protocoles d’alerte et niveaux d’escalade."
            ],
            internalLinks: [
              { label: "Voir toutes nos zones d’intervention", href: "/zones" },
              { label: "Pages sécurité par ville", href: "/villes" }
            ],
            note:
              "Conseil SEO : sur tes pages villes, renvoie vers cette page APS + une section “cas d’usage local” (bureaux, chantiers, entrepôts, retail)."
          },
      
          {
            id: "livrables-reporting",
            title: "Livrables & reporting : ce que tu reçois (et comment tu pilotes)",
            paragraphs: [
              "La sécurité devient sérieuse quand elle devient mesurable. Le reporting ne sert pas à “faire joli” : il sert à piloter. Tu dois pouvoir répondre à des questions simples : quels incidents ? à quelle fréquence ? à quelle heure ? sur quelle zone ? quelles actions correctives ?",
              "Selon le dispositif, tu peux recevoir des rapports de vacation, des synthèses hebdomadaires, et des points mensuels avec recommandations. L’objectif est que la sécurité s’améliore, au lieu de rester identique malgré les incidents."
            ],
            bullets: [
              "Consignes de poste finalisées et validées",
              "Main courante (événements, anomalies, actions)",
              "Rapports d’incident (fait, heure, action, suites)",
              "Synthèses périodiques + recommandations d’amélioration",
              "Points réguliers : ajustements horaires / zones / procédures"
            ]
          },
      
          {
            id: "cta",
            title: "Construisons un dispositif APS adapté à ton site",
            paragraphs: [
              "Chaque site a ses particularités : accès, flux, zones sensibles, horaires, contraintes. Un dispositif efficace commence par un cadrage simple : objectifs, points vitaux, risques prioritaires et procédures.",
              "Si tu veux une prestation APS réellement utile (et pas seulement une présence), on structure ensemble les consignes, le niveau de contrôle, la fréquence des rondes et le reporting. Résultat : un site plus serein, une prévention réelle et une meilleure maîtrise des incidents."
            ],
            note:
              "Sur ta page, ajoute un CTA clair : “Demander un devis” + “Être rappelé” + “Audit de site gratuit (selon conditions)”."
          }
        ],
      
        faqLong: [
          {
            question: "Quelle est la différence entre un agent APS et un agent rondier intervenant ?",
            answer:
              "L’agent APS est généralement posté (présence continue sur un site). Le rondier intervient sur plusieurs sites : rondes planifiées, passages aléatoires et levées de doute sur alarme. Les deux sont complémentaires : APS pour la présence fixe et le contrôle d’accès, rondier pour la mobilité et l’optimisation multi-sites."
          },
          {
            question: "Un agent APS peut-il gérer les livraisons et les prestataires ?",
            answer:
              "Oui, dans le cadre de tes consignes : contrôle des accès, vérification des autorisations, orientation, gestion des badges temporaires et traçabilité. L’objectif est de réduire les entrées non maîtrisées et les zones de flou."
          },
          {
            question: "Que fait l’agent en cas d’alarme ou d’intrusion ?",
            answer:
              "Il applique le protocole : observation/levée de doute selon consignes, sécurisation, alerte, coordination si nécessaire, et compte rendu. La priorité est la sécurité : ne pas aggraver la situation, agir avec méthode et transmettre des informations utiles."
          },
          {
            question: "Comment éviter une prestation “présence” sans efficacité ?",
            answer:
              "En cadrant les consignes, en définissant des points sensibles, en mettant une traçabilité, et en assurant un management de proximité. La performance vient d’un dispositif piloté, pas du volume d’heures."
          },
          {
            question: "Peut-on ajuster le dispositif selon la saison ou l’activité ?",
            answer:
              "Oui : renforts ponctuels, extension d’horaires, modification des rondes, augmentation des contrôles sur périodes sensibles (travaux, inventaires, fermetures, événements)."
          },
          {
            question: "Est-ce compatible avec la vidéosurveillance et une alarme ?",
            answer:
              "Oui, et c’est souvent le meilleur combo : la technique détecte, l’humain décide et agit. L’APS augmente la valeur de tes systèmes (réduction des fausses alertes, réaction immédiate, prévention sur site)."
          }
        ],
      
        relatedServices: ["agent-rondier", "agent-cynophile", "agent-incendie-ssiap", "audit-conseil-surete"]
      }
  },

  {
    slug: "agent-cynophile",
    icon: "PawPrint",
    title: "Agent Cynophile (Maître-chien)",
    shortDescription:
      "Le binôme homme-chien pour une détection et une dissuasion renforcées.",
    description:
      "L’agent de sécurité cynophile, ou maître-chien, offre une capacité de détection et de dissuasion inégalée. Le flair et l’ouïe du chien, combinés à l’expertise de l’agent, en font une solution idéale pour la surveillance de larges périmètres, chantiers, ou sites sensibles.",
    keywords: [
      "agent cynophile",
      "maître-chien",
      "sécurité canine",
      "surveillance chien",
      "gardiennage chantier",
      "sécurité périmètre",
      "ronde cynophile",
    ],
    heroImageId: ensureHero("service-agent-cyno"),
    benefits: [
      { title: "Dissuasion maximale", description: "La présence du chien a un effet psychologique très dissuasif sur les intrus potentiels." },
      { title: "Capacités de détection accrues", description: "Le chien détecte des présences, bruits ou odeurs bien avant l’homme, renforçant la prévention." },
      { title: "Intervention rapide", description: "Le binôme couvre efficacement une large zone et peut intervenir rapidement selon le protocole défini." },
      { title: "Idéal pour les grands espaces", description: "Parfait pour parkings, entrepôts, chantiers, zones isolées et périmètres ouverts." },
      { title: "Sécurité de l’agent", description: "Le chien renforce la protection du maître lors des interventions et contribue au contrôle de situation." },
      { title: "Polyvalence", description: "Efficace de jour comme de nuit, et dans des conditions météorologiques difficiles." },
    ],
    method: {
      title: "L’intervention du binôme cynophile",
      description: "Une synergie parfaite entre l’homme et l’animal pour votre sécurité.",
      steps: [
        { icon: "Map", title: "Analyse du périmètre", description: "Définition des zones de patrouille, points sensibles et contraintes d’accès." },
        { icon: "PawPrint", title: "Adaptation du binôme", description: "Sélection d’un binôme cohérent avec la configuration (intérieur/extérieur) et la mission." },
        { icon: "ShieldCheck", title: "Rondes & surveillance", description: "Rondes planifiées ou aléatoires, présence dissuasive et détection précoce." },
        { icon: "AlertTriangle", title: "Procédure d’intervention", description: "En cas de détection : application du protocole, mise en sécurité, alerte et compte rendu." },
      ],
    },
    sectors: [
      { icon: "HardHat", name: "Chantiers & BTP" },
      { icon: "Factory", name: "Sites industriels" },
      { icon: "Warehouse", name: "Zones de stockage & plateformes" },
      { icon: "CalendarDays", name: "Événements en extérieur" },
    ],
    faq: [
      {
        question: "Les chiens sont-ils dangereux ?",
        answer:
          "Nos chiens sont entraînés, socialisés et obéissants. Ils restent sous contrôle permanent et n’interviennent que sur ordre ou en légitime défense. L’objectif est d’abord la dissuasion et la prévention.",
      },
      {
        question: "Un agent cynophile peut-il travailler à l’intérieur ?",
        answer:
          "Oui, selon la configuration et la mission. Ils sont très efficaces pour la surveillance d’entrepôts, bâtiments vides la nuit, ou zones techniques.",
      },
    ],
    seo: {
      slugKeyword: "agent cynophile",
      secondaryKeywords: ["maître-chien sécurité", "rondes cynophiles", "gardiennage chantier Île-de-France", "sécurité périmètre"],
      metaTitle: "Agent cynophile (maître-chien) en Île-de-France | Basic Protection",
      metaDescription:
        "Rondes cynophiles, dissuasion renforcée, surveillance de périmètres, levée de doute selon protocole. Binôme homme-chien encadré. Intervention 75, 78, 92, 93, 94, 95, 77, 91.",
      h1: "Agent Cynophile (Maître-chien) en Île-de-France",
    },
    page: {
        lead:
          "L’agent cynophile (maître-chien) est la solution de dissuasion la plus forte en sécurité privée : présence humaine + capacité de détection du chien. Sur chantiers, grands périmètres, sites isolés ou zones sensibles, le binôme anticipe les intrusions, réduit le passage à l’acte et sécurise le site avec méthode. Nous cadrons la mission, dimensionnons le dispositif, fixons des consignes claires et assurons un suivi réel pour une sécurité efficace, traçable et pilotable.",
        sections: [
          {
            id: "intro-cyno",
            title: "Pourquoi le cynophile est le service le plus dissuasif",
            paragraphs: [
              "Quand le risque d’intrusion est élevé (chantier, plateforme logistique, site isolé, matériel exposé), une présence “classique” peut ne pas suffire. Le maître-chien apporte une dissuasion immédiate : le simple fait de voir un binôme homme-chien change la perception du risque chez un intrus potentiel. C’est souvent ce détail qui fait renoncer avant même la tentative.",
              "Au-delà de la dissuasion, la force du cynophile est la détection. Le chien perçoit des signaux bien avant l’humain : bruit, mouvement, odeur, présence cachée. Cette avance permet au binôme d’anticiper, de se positionner et d’éviter l’escalade. Résultat : moins d’incidents et une meilleure maîtrise des situations.",
              "Mais comme pour l’APS, la différence se fait sur l’organisation : consignes, périmètre, règles d’intervention, coordination et traçabilité. Un dispositif cynophile efficace n’est pas un “effet vitrine” : c’est une méthode, une discipline et une supervision."
            ],
            note:
              "Le cynophile est particulièrement pertinent quand tu as des accès multiples, des angles morts, des zones non éclairées, ou des actifs exposés (matériel, stock, zones techniques).",
            internalLinks: [
              { label: "Sécuriser un site fixe : agent APS", href: "/services/agent-securite-qualifie" },
              { label: "Multi-sites & alarmes : agent rondier", href: "/services/agent-rondier" }
            ]
          },
      
          {
            id: "cas-usage",
            title: "Dans quels cas privilégier un agent cynophile ?",
            intro:
              "Le maître-chien est recommandé dès que la dissuasion et la détection doivent être renforcées, notamment sur des périmètres ouverts ou des sites à forte tentation de vol.",
            bullets: [
              "Chantiers et sites en travaux : matériel, câbles, outillage, accès temporaires",
              "Grands périmètres : parkings, entrepôts, plateformes logistiques, zones industrielles",
              "Sites isolés : zones peu fréquentées, bâtiments vides la nuit, sites techniques",
              "Zones de stockage : actifs sensibles, marchandises de valeur, dépôts extérieurs",
              "Périodes à risque : fermeture, week-ends, jours fériés, phases de livraison",
              "Prévention de repérage : dissuasion des reconnaissances et intrusions opportunistes"
            ],
            paragraphs: [
              "Sur un chantier, le risque est souvent “opportuniste” : les intrus profitent de l’obscurité, des accès temporaires, et du manque de présence. Le cynophile casse cette logique : les rondes deviennent imprévisibles, la dissuasion devient maximale, et le repérage devient plus risqué.",
              "Sur un grand périmètre, le cynophile est aussi une question d’efficacité : le binôme couvre une zone large, repère plus vite, et sécurise des espaces où un agent seul serait moins performant."
            ],
            note:
              "On dimensionne le dispositif selon la surface, le nombre d’accès, l’éclairage, les zones “mortes” et la valeur des actifs à protéger."
          },
      
          {
            id: "missions",
            title: "Missions terrain : rondes, détection, levée de doute, mise en sécurité",
            paragraphs: [
              "Le binôme cynophile agit en prévention. Il patrouille sur un itinéraire défini (ou variable) en sécurisant les points sensibles : entrées secondaires, clôtures, parkings, zones de stockage, locaux techniques. L’objectif est de détecter tôt, de dissuader et de limiter les opportunités.",
              "En cas de doute (bruit, mouvement, alerte, présence suspecte), l’agent applique un protocole : observation, analyse, sécurisation, alerte et compte rendu. Le chien reste sous contrôle permanent. Dans l’immense majorité des cas, l’efficacité du binôme évite d’aller au contact.",
              "La logique est simple : prévention d’abord, maîtrise ensuite, intervention dans le cadre défini. La sécurité ne doit pas dépendre de l’improvisation : elle doit reposer sur une procédure."
            ],
            bullets: [
              "Rondes périmétriques : itinéraires fixes ou variables",
              "Sécurisation des points sensibles : accès, clôtures, parkings, stock",
              "Détection précoce : présence cachée, mouvement, bruits anormaux",
              "Levée de doute : vérification structurée selon consignes",
              "Mise en sécurité : fermeture, balisage, signalement, protection zone",
              "Alerte & coordination : forces de l’ordre / responsable site (selon protocole)",
              "Traçabilité : rapport de ronde / rapport d’intervention"
            ],
            note:
              "Un dispositif cynophile efficace repose sur une règle simple : “détecter tôt, éviter l’escalade, sécuriser et tracer”."
          },
      
          {
            id: "cadre",
            title: "Cadre d’intervention : sécurité, maîtrise et responsabilités",
            paragraphs: [
              "Le cynophile est un service puissant, donc il doit être encadré. Le chien n’est pas un “outil d’agression” : c’est un moyen de prévention et de dissuasion. Le maître-chien est responsable de la conduite du binôme, de la maîtrise de l’animal et du respect des procédures.",
              "Avant la mission, on définit clairement : le périmètre, les zones autorisées, les horaires, les accès, les consignes d’alerte, et les scénarios possibles (intrusion, vandalisme, agression, incendie, accident, etc.). On précise aussi les limites : quand appeler, quand se replier, comment sécuriser, qui contacter.",
              "Ce cadrage protège tout le monde : ton site, tes équipes, et l’agent. Et c’est ce qui transforme une prestation cynophile en dispositif professionnel."
            ],
            bullets: [
              "Consignes écrites : zones, horaires, scénarios et escalade",
              "Règles de sécurité : posture, distances, contrôle permanent du chien",
              "Coordination : responsable site / rondier / APS posté si besoin",
              "Traçabilité : comptes rendus exploitables et réguliers"
            ],
            internalLinks: [
              { label: "Présence fixe + contrôle d’accès : agent APS", href: "/services/agent-securite-qualifie" },
              { label: "Rondes & alarmes multi-sites : rondier intervenant", href: "/services/agent-rondier" },
              { label: "Optimiser le dispositif : audit & conseil", href: "/services/audit-conseil-surete" }
            ]
          },
      
          {
            id: "dimensionnement",
            title: "Combien de binômes faut-il ? (dimensionnement intelligent)",
            paragraphs: [
              "La question du nombre de binômes est essentielle. Un cynophile “seul” sur un périmètre trop vaste peut perdre en efficacité. À l’inverse, surdimensionner coûte cher et n’améliore pas forcément la sécurité.",
              "On dimensionne selon des critères concrets : surface totale, nombre d’accès, qualité de l’éclairage, zones de stockage, présence de clôtures, historique d’incidents, voisinage, et temporalité du risque (uniquement la nuit ? 24/7 ? week-end ?).",
              "Dans certains cas, une combinaison est optimale : APS posté à l’accueil + cynophile en patrouille. Tu gagnes en contrôle d’accès ET en dissuasion périmétrique."
            ],
            bullets: [
              "Surface et complexité du site (angles morts, bâtiments multiples)",
              "Nombre d’accès et points sensibles (portails, issues, parkings)",
              "Éclairage et visibilité nocturne",
              "Valeur des actifs exposés (matériel, stock, équipements)",
              "Historique (intrusions, vols, dégradations, repérage)",
              "Besoin de coordination avec un APS / rondier"
            ],
            note:
              "Objectif : trouver le meilleur ratio coût / sécurité réelle, pas “mettre des agents” sans stratégie."
          },
      
          {
            id: "secteurs",
            title: "Exemples d’usages : chantiers, logistique, sites ouverts, événementiel extérieur",
            paragraphs: [
              "Sur chantier : rondes de nuit, contrôle des accès temporaires, sécurisation des zones matériel, dissuasion forte contre le vol d’outillage, de câbles ou d’équipements. Le cynophile est souvent le meilleur choix quand le chantier est ouvert ou faiblement clôturé.",
              "En logistique : sécurisation des parkings, des quais, des abords et des zones de stockage extérieur. Le chien repère tôt une présence et limite les intrusions silencieuses.",
              "Sur sites ouverts : parkings, zones industrielles, plateformes multi-accès. Les rondes variables compliquent le repérage et renforcent l’effet dissuasif.",
              "En événementiel extérieur : le cynophile peut contribuer à la dissuasion périphérique, à la sécurisation des zones techniques et à la prévention d’intrusions — toujours dans un cadre défini."
            ],
            internalLinks: [
              { label: "Sécurité événementielle premium", href: "/services/securite-evenementielle" },
              { label: "SSIAP si obligation incendie", href: "/services/agent-incendie-ssiap" }
            ]
          },
      
          {
            id: "idf",
            title: "Intervention en Île-de-France : chantiers, zones logistiques et sites sensibles",
            paragraphs: [
              "Nous intervenons sur l’ensemble de l’Île-de-France (75, 78, 92, 93, 94, 95, 77, 91). Le cynophile est particulièrement demandé sur les zones où les intrusions opportunistes sont fréquentes : chantiers, sites isolés, zones industrielles et logistiques.",
              "Le point critique en Île-de-France est souvent l’organisation : accès, clés, barrières, consignes, et coordination. Un bon cadrage évite les flous et augmente la performance du dispositif."
            ],
            internalLinks: [
              { label: "Voir nos zones d’intervention", href: "/zones" },
              { label: "Découvrir nos pages par ville", href: "/villes" }
            ],
            note:
              "Conseil SEO : sur chaque page ville, ajoute un paragraphe “cas typiques” (chantiers, zones industrielles) + lien vers cette page cynophile."
          },
      
          {
            id: "reporting",
            title: "Reporting & traçabilité : ce que tu dois exiger",
            paragraphs: [
              "Le cynophile est un service à forte valeur. Pour le piloter, tu as besoin de faits : passages, horaires, anomalies, observations, actions. Un reporting propre permet de vérifier que les zones sensibles sont bien couvertes et d’identifier les tendances (tentatives récurrentes, repérage, points faibles).",
              "Selon le dispositif, nous fournissons des rapports de rondes, des rapports d’intervention en cas d’événement, et des synthèses périodiques avec recommandations (éclairage, clôture, accès, procédures)."
            ],
            bullets: [
              "Rapports de rondes : zones, horaires, observations",
              "Rapports d’événements : faits, action, suites",
              "Synthèses périodiques : tendances + recommandations",
              "Points d’ajustement : itinéraires, horaires, zones prioritaires"
            ],
            note:
              "Objectif : une sécurité visible ET mesurable — pas un service “opaque”."
          },
      
          {
            id: "cta",
            title: "Mettons en place un dispositif cynophile clair, efficace et pilotable",
            paragraphs: [
              "Un maître-chien est une décision stratégique quand tu veux un effet dissuasif immédiat et une détection supérieure. Mais pour que ce soit réellement efficace, il faut cadrer : périmètre, consignes, scénarios, coordination et reporting.",
              "On peut démarrer par un cadrage rapide : surface, accès, zones sensibles et périodes à risque. Ensuite, on dimensionne le nombre de binômes et on construit des consignes simples. Résultat : moins de tentatives, moins de stress, et un site mieux sécurisé."
            ],
            note:
              "CTA recommandé : “Demander un devis” + “Diagnostic de périmètre” + “Rappel sous 24h”."
          }
        ],
      
        faqLong: [
          {
            question: "Les chiens sont-ils dangereux pour les employés ou les visiteurs ?",
            answer:
              "Non, à condition que le dispositif soit encadré. Nos chiens sont entraînés, socialisés et restent sous contrôle permanent. Le cynophile vise d’abord la dissuasion et la prévention. Les consignes précisent les zones, les accès et les règles d’interaction pour éviter tout risque."
          },
          {
            question: "Le cynophile remplace-t-il un agent APS posté ?",
            answer:
              "Pas toujours. Souvent, c’est complémentaire : APS pour le contrôle d’accès et la présence fixe, cynophile pour la patrouille et la dissuasion sur périmètre. Le meilleur montage dépend de ton site et du niveau de risque."
          },
          {
            question: "Combien de binômes faut-il pour un grand périmètre ?",
            answer:
              "Cela dépend de la surface, du nombre d’accès, de l’éclairage, des zones “mortes” et de la valeur des actifs. On dimensionne après cadrage terrain pour garantir une couverture réelle et éviter le sous-dimensionnement."
          },
          {
            question: "Le cynophile peut-il intervenir à l’intérieur d’un bâtiment ?",
            answer:
              "Oui, selon la configuration et la mission. Il est souvent très efficace pour la surveillance d’entrepôts, bâtiments vides la nuit, zones techniques ou volumes importants."
          },
          {
            question: "Que se passe-t-il en cas de détection d’intrusion ?",
            answer:
              "Le binôme applique le protocole : observation, mise en sécurité, alerte, coordination, puis compte rendu. La priorité est d’éviter l’escalade, sécuriser les zones, et transmettre des informations utiles aux responsables ou aux forces de l’ordre si nécessaire."
          },
          {
            question: "Comment assurez-vous la traçabilité des rondes ?",
            answer:
              "Selon le dispositif, nous mettons en place une traçabilité des passages et un reporting structuré : rondes effectuées, zones couvertes, anomalies constatées, actions et recommandations."
          }
        ],
      
        relatedServices: ["agent-securite-qualifie", "agent-rondier", "audit-conseil-surete", "securite-evenementielle"]
      }
  },

  {
    slug: "agent-incendie-ssiap",
    icon: "Flame",
    title: "Agent de Sécurité Incendie (SSIAP)",
    shortDescription:
      "Prévention et intervention contre les risques incendie (SSIAP 1, 2, 3).",
    description:
      "Nos agents SSIAP (Service de Sécurité Incendie et d’Assistance à Personnes) veillent à la prévention du risque incendie dans les Établissements Recevant du Public (ERP) et les Immeubles de Grande Hauteur (IGH). Ils assurent la gestion des alarmes, les rondes de prévention, et l’assistance à personnes en cas d’incident.",
    keywords: [
      "agent SSIAP",
      "sécurité incendie",
      "prévention incendie",
      "SSIAP 1",
      "SSIAP 2",
      "SSIAP 3",
      "ERP",
      "IGH",
    ],
    heroImageId: ensureHero("service-agent-ssiap"),
    benefits: [
      { title: "Conformité réglementaire", description: "Assurez la conformité de votre établissement avec les obligations de sécurité incendie." },
      { title: "Prévention active", description: "Rondes techniques, vérifications, surveillance des issues et prévention des anomalies." },
      { title: "Gestion d’urgence", description: "Levée de doute, gestion des alarmes, alerte et premières mesures conservatoires." },
      { title: "Assistance à personnes", description: "Gestion de l’évacuation et assistance aux personnes à mobilité réduite (selon protocole)." },
      { title: "Interlocuteur des secours", description: "Accueil et guidage des secours pour une intervention plus rapide et plus efficace." },
      { title: "Culture sécurité", description: "Participation à la sensibilisation et au respect des consignes sur site." },
    ],
    method: {
      title: "Notre expertise en sécurité incendie",
      description: "Une mission vitale encadrée par des procédures strictes.",
      steps: [
        { icon: "FileText", title: "Analyse du site", description: "Étude de votre SSI et des contraintes ERP/IGH, flux, zones techniques et accès." },
        { icon: "UserCheck", title: "Affectation qualifiée", description: "Déploiement d’agents SSIAP 1/2/3 selon exigences réglementaires et organisationnelles." },
        { icon: "BookOpen", title: "Registre & traçabilité", description: "Tenue du registre, suivi des vérifications, événements et actions correctives." },
        { icon: "Bell", title: "Alarmes & procédures", description: "Gestion des alarmes, levée de doute, coordination évacuation, et interface secours." },
      ],
    },
    sectors: [
      { icon: "Store", name: "Centres commerciaux (ERP)" },
      { icon: "Building", name: "Immeubles de bureaux (IGH)" },
      { icon: "Hotel", name: "Hôtels & établissements recevant du public" },
      { icon: "Clapperboard", name: "Salles de spectacle & événementiel" },
    ],
    faq: [
      {
        question: "Quelle différence entre SSIAP 1, 2 et 3 ?",
        answer:
          "SSIAP 1 : agent incendie. SSIAP 2 : chef d’équipe. SSIAP 3 : chef de service (conseil, organisation, management). Le niveau dépend du type d’établissement et de la réglementation applicable.",
      },
      {
        question: "Un agent SSIAP est-il aussi un agent de sûreté ?",
        answer:
          "Ce sont deux spécialités différentes. La mission principale du SSIAP est la prévention incendie et l’assistance à personnes. Selon l’organisation du site, il peut participer à la sécurité générale, mais ne remplace pas un dispositif APS dédié à la sûreté.",
      },
    ],
    seo: {
      slugKeyword: "agent SSIAP",
      secondaryKeywords: ["sécurité incendie ERP", "sécurité incendie IGH", "SSIAP 1 2 3", "prévention incendie Île-de-France"],
      metaTitle: "Agent SSIAP (sécurité incendie) en Île-de-France | Basic Protection",
      metaDescription:
        "Agents SSIAP 1/2/3 pour ERP/IGH : rondes, prévention, gestion alarmes, assistance à personnes, registre et procédures. Intervention 75, 78, 92, 93, 94, 95, 77, 91.",
      h1: "Agent de Sécurité Incendie (SSIAP) en Île-de-France",
    },
    page: {
        lead:
          "La sécurité incendie n’est pas une option : c’est une obligation réglementaire (ERP / IGH) et un enjeu vital. Nos agents SSIAP assurent la prévention quotidienne, la surveillance des installations, la gestion des alarmes, l’assistance à personnes et la coordination des procédures d’évacuation. Avec une approche cadrée, traçable et pilotable, vous gagnez en conformité, en maîtrise opérationnelle et en sérénité.",
        sections: [
          {
            id: "intro-ssiap",
            title: "SSIAP : prévenir, protéger, réagir — dans un cadre réglementé",
            paragraphs: [
              "Un départ de feu se joue en minutes. La mission SSIAP (Service de Sécurité Incendie et d’Assistance à Personnes) vise à réduire drastiquement le risque : prévention, détection, levée de doute, mise en sécurité et assistance. Sur un ERP (Établissement Recevant du Public) ou un IGH (Immeuble de Grande Hauteur), la sécurité incendie n’est pas seulement “une présence” : c’est une organisation, des procédures et une traçabilité.",
              "L’agent SSIAP est formé pour appliquer la réglementation, surveiller les installations (SSI, alarmes, désenfumage, issues, moyens de secours), repérer les anomalies, et déclencher les mesures adaptées en cas d’alerte. L’objectif est double : éviter l’incident, et si l’incident survient, limiter ses conséquences et protéger les personnes.",
              "Deux points font toute la différence : la rigueur et l’anticipation. Un SSIAP efficace ne se contente pas de “constater”. Il agit en prévention (rondes, contrôles, signalements, corrections), et sait exécuter une procédure claire quand il faut gérer l’urgence."
            ],
            note:
              "Point clé : SSIAP = conformité + opérationnel. Vous sécurisez les personnes ET vous réduisez le risque juridique, d’exploitation et d’interruption d’activité.",
            internalLinks: [
              { label: "Sûreté & contrôle d’accès : agent APS", href: "/services/agent-securite-qualifie" },
              { label: "Sécurité événementielle (flux + conformité)", href: "/services/securite-evenementielle" }
            ]
          },
      
          {
            id: "obligations-erp-igh",
            title: "ERP / IGH : obligations, responsabilités, enjeux réels",
            paragraphs: [
              "Sur de nombreux sites, la présence SSIAP répond à des obligations précises (catégorie d’ERP, nature des activités, configuration du bâtiment, présence d’un SSI, contraintes d’exploitation, etc.). Au-delà du texte, il y a une réalité : en cas d’incident, on vous demandera ce qui a été fait, par qui, quand, et avec quelles procédures.",
              "Le SSIAP participe à l’organisation globale de la sécurité incendie : application des consignes, tenue du registre, suivi des vérifications, signalement des anomalies, et coordination avec l’exploitant. C’est cette chaîne qui garantit une réaction rapide, une évacuation maîtrisée et une intervention des secours facilitée.",
              "L’enjeu majeur est la continuité : un bâtiment “conforme sur le papier” mais mal surveillé peut devenir à risque. Inversement, une équipe SSIAP bien encadrée transforme la sécurité incendie en dispositif stable et fiable."
            ],
            bullets: [
              "Prévention et surveillance des risques incendie",
              "Surveillance des installations (SSI / alarmes / issues / désenfumage)",
              "Application des consignes et procédures d’évacuation",
              "Tenue du registre de sécurité (traçabilité et conformité)",
              "Accueil et guidage des secours",
              "Assistance à personnes (selon protocole)"
            ],
            note:
              "Un bon dispositif SSIAP doit être “documenté” : rondes, anomalies, actions, suites. C’est essentiel en conformité et en pilotage."
          },
      
          {
            id: "missions-quotidien",
            title: "Missions SSIAP au quotidien : rondes, contrôles, prévention active",
            paragraphs: [
              "La prévention est le cœur de la mission. Le SSIAP réalise des rondes techniques, vérifie l’accessibilité des issues, repère les encombrements, identifie les comportements à risque (stockage inadapté, portes coupe-feu bloquées, fumeurs en zone interdite, surcharges électriques visibles, etc.) et remonte des actions correctives.",
              "Il assure aussi une surveillance des équipements : moyens de secours visibles, extincteurs accessibles, signalétique, éclairage de sécurité, dispositifs d’alarme, systèmes de désenfumage, compartimentage. Il ne “répare” pas forcément, mais il détecte, alerte et déclenche les actions nécessaires selon vos procédures et votre organisation.",
              "Cette prévention évite un problème fréquent : l’accumulation de petites anomalies qui finissent par créer un accident ou une non-conformité majeure."
            ],
            bullets: [
              "Rondes de prévention et vérification des points sensibles",
              "Surveillance des issues de secours, dégagements, compartimentage",
              "Contrôle visuel des moyens de secours et anomalies apparentes",
              "Tenue / mise à jour du registre et signalements",
              "Sensibilisation / rappel des règles si nécessaire (selon cadre site)"
            ],
            note:
              "Le vrai gain : réduire les départs de feu, et réduire la gravité si un départ de feu survient."
          },
      
          {
            id: "alarmes-levee-doute",
            title: "Gestion des alarmes : levée de doute, mise en sécurité, coordination",
            paragraphs: [
              "Quand une alarme se déclenche, le facteur temps est décisif. La procédure SSIAP vise à qualifier la situation rapidement, sans improvisation : levée de doute, identification de la zone, mise en sécurité, déclenchement des actions et coordination avec les équipes internes et les secours.",
              "Un bon protocole répond à des questions simples : Où ? Quel type de signal ? Qui se déplace ? Quelles priorités (PMR, zones sensibles, public) ? Qui alerte ? Qui accueille les secours ? Quelles consignes d’évacuation ? Quelles actions conservatoires ?",
              "La gestion d’alarme ne doit pas être “stressante” : elle doit être structurée. C’est exactement ce que garantit une équipe SSIAP formée, briefée et supervisée."
            ],
            bullets: [
              "Levée de doute structurée (selon consignes)",
              "Mise en sécurité et application des procédures",
              "Coordination de l’évacuation (si déclenchée)",
              "Alerte / communication avec l’exploitant et les secours",
              "Accueil et guidage des secours",
              "Compte rendu et traçabilité de l’événement"
            ],
            note:
              "Objectif : agir vite, mais agir juste — avec sang-froid et méthode."
          },
      
          {
            id: "assistance-personnes",
            title: "Assistance à personnes : un volet souvent sous-estimé",
            paragraphs: [
              "Le SSIAP n’est pas uniquement “incendie”. Il inclut l’assistance à personnes, dans le cadre des procédures du site : gestion d’un malaise, aide à l’évacuation, prise en compte des personnes à mobilité réduite (PMR), coordination avec les secours, et sécurisation de la zone.",
              "Sur les sites recevant du public, l’assistance et la gestion des flux peuvent éviter un sur-incident (panique, attroupement, blocage de dégagement). L’agent SSIAP contribue à maintenir l’ordre et la sécurité en cas de situation sensible."
            ],
            bullets: [
              "Assistance en cas de malaise / accident (selon protocole)",
              "Gestion PMR et priorisation lors d’une évacuation",
              "Coordination avec les secours",
              "Sécurisation de la zone et maintien des dégagements"
            ],
            internalLinks: [
              { label: "Sécurité événementielle (flux & zones)", href: "/services/securite-evenementielle" }
            ]
          },
      
          {
            id: "niveaux-ssiap",
            title: "SSIAP 1, 2, 3 : quel niveau pour quel besoin ?",
            paragraphs: [
              "Le niveau SSIAP dépend du type d’établissement, des contraintes réglementaires et de l’organisation. L’important n’est pas seulement le “niveau sur le papier”, mais la cohérence opérationnelle : effectifs, responsabilités, supervision et coordination.",
              "SSIAP 1 : agent de sécurité incendie (terrain). Il réalise rondes, prévention, surveillance, levée de doute et procédures.",
              "SSIAP 2 : chef d’équipe. Il encadre, coordonne, contrôle et pilote l’opérationnel sur site, en lien avec l’exploitant.",
              "SSIAP 3 : chef de service. Il organise, conseille, structure les procédures, participe à la politique sécurité et à la conformité globale."
            ],
            bullets: [
              "SSIAP 1 : opérationnel terrain (prévention, rondes, alarmes, assistance)",
              "SSIAP 2 : management et coordination (chef d’équipe)",
              "SSIAP 3 : organisation / conseil / pilotage (chef de service)"
            ],
            note:
              "Le bon dimensionnement évite deux erreurs : sous-couvrir le risque… ou surpayer un dispositif mal ajusté."
          },
      
          {
            id: "ssiap-et-surete",
            title: "SSIAP + sûreté (APS) : la combinaison intelligente selon les sites",
            paragraphs: [
              "Sur beaucoup de sites, incendie et sûreté cohabitent : contrôle d’accès, prévention des intrusions, gestion des flux, et conformité incendie. Les deux métiers ne se confondent pas. Un SSIAP reste orienté incendie/assistance. Un APS est orienté sûreté/contrôle d’accès.",
              "Dans la pratique, on construit une organisation qui évite les zones grises : qui fait quoi, quand, comment. Sur un site à forte fréquentation, par exemple, vous pouvez avoir un SSIAP dédié aux missions incendie et un APS dédié aux accès. Sur un site plus simple, les missions peuvent être articulées selon vos consignes, dans le respect du cadre."
            ],
            bullets: [
              "Clarifier les missions : incendie vs sûreté",
              "Définir des consignes sans ambiguïté",
              "Organiser l’escalade et la coordination",
              "Traçabilité des actions (incendie et sûreté)"
            ],
            internalLinks: [
              { label: "Agent APS (sûreté / accès)", href: "/services/agent-securite-qualifie" },
              { label: "Audit & conseil (optimiser le dispositif)", href: "/services/audit-conseil-surete" }
            ]
          },
      
          {
            id: "idf-local",
            title: "SSIAP en Île-de-France : ERP, IGH, événements et contraintes terrain",
            paragraphs: [
              "En Île-de-France, les sites recevant du public sont nombreux (hôtels, centres commerciaux, salles, sites culturels, immeubles tertiaires). La complexité vient souvent des flux, des horaires, des accès multiples, et des contraintes d’exploitation. Un SSIAP performant doit être organisé et encadré : procédures claires, consignes à jour, reporting, et coordination.",
              "Nous intervenons sur l’ensemble de l’Île-de-France (Paris 75, Yvelines 78, Hauts-de-Seine 92, Seine-Saint-Denis 93, Val-de-Marne 94, Val-d’Oise 95, Seine-et-Marne 77, Essonne 91). Le démarrage de mission repose sur un cadrage précis : type de site, SSI, zones techniques, consignes d’évacuation, registre, et chaîne d’alerte."
            ],
            internalLinks: [
              { label: "Voir toutes nos zones d’intervention", href: "/zones" },
              { label: "Pages sécurité par ville", href: "/villes" }
            ],
            note:
              "Conseil SEO : sur tes pages “ville”, ajoute un paragraphe “ERP/IGH : conformité SSIAP” + lien vers cette page."
          },
      
          {
            id: "livrables",
            title: "Livrables & traçabilité : ce que vous devez exiger",
            paragraphs: [
              "En sécurité incendie, la traçabilité est centrale. Elle prouve la réalité des actions, elle structure la prévention, et elle sécurise l’exploitant. Vous devez pouvoir démontrer : rondes, anomalies, actions correctives, événements, et suites.",
              "Selon le dispositif, vous recevez des rapports exploitables (vacations, synthèses, comptes rendus d’événements) et une tenue rigoureuse des informations nécessaires au pilotage."
            ],
            bullets: [
              "Consignes de poste SSIAP (procédures et scénarios)",
              "Rondes / contrôles documentés (selon organisation)",
              "Registre de sécurité (tenue et suivi selon site)",
              "Rapports d’événements (alarme, levée de doute, évacuation, incident)",
              "Synthèses périodiques + recommandations (amélioration continue)"
            ],
            note:
              "Objectif : une sécurité incendie “pilotée”, pas juste “présente”."
          },
      
          {
            id: "cta",
            title: "Mettons en place un dispositif SSIAP conforme, clair et efficace",
            paragraphs: [
              "Que votre besoin soit réglementaire (ERP/IGH) ou opérationnel (prévention renforcée), nous cadrons la mission avec méthode : obligations, consignes, procédures, effectifs et reporting.",
              "Si vous cherchez une sécurité incendie sérieuse, traçable et orientée prévention, on peut démarrer par une analyse simple de votre site et de vos contraintes, puis proposer un dispositif SSIAP cohérent."
            ],
            note:
              "Sur ta page, ajoute un CTA clair : “Demander un devis SSIAP” + “Être rappelé” + “Évaluation conformité (selon conditions)”."
          }
        ],
      
        faqLong: [
          {
            question: "Quelle différence entre SSIAP 1, SSIAP 2 et SSIAP 3 ?",
            answer:
              "SSIAP 1 : agent incendie opérationnel (prévention, rondes, alarmes, assistance). SSIAP 2 : chef d’équipe (coordination, encadrement, contrôle). SSIAP 3 : chef de service (organisation, conseil, pilotage et conformité). Le niveau requis dépend du type d’établissement et des obligations applicables."
          },
          {
            question: "Un agent SSIAP peut-il faire aussi de la sûreté (contrôle d’accès) ?",
            answer:
              "La mission principale du SSIAP est l’incendie et l’assistance à personnes. Selon l’organisation du site, il peut contribuer à la sécurité générale, mais il ne remplace pas un dispositif APS dédié à la sûreté. L’important est d’éviter les zones grises : qui fait quoi, quand, selon quelle procédure."
          },
          {
            question: "Que se passe-t-il en cas d’alarme incendie ?",
            answer:
              "L’agent applique la procédure : levée de doute (selon protocole), mise en sécurité, déclenchement des actions adaptées, coordination de l’évacuation si nécessaire, alerte et accueil des secours, puis compte rendu et traçabilité."
          },
          {
            question: "Le SSIAP s’occupe-t-il aussi du registre de sécurité ?",
            answer:
              "Selon l’organisation, l’agent SSIAP contribue à la tenue et à la traçabilité des informations utiles (rondes, anomalies, événements, actions). La forme exacte dépend de votre site et de vos obligations, mais la traçabilité reste un élément clé."
          },
          {
            question: "Faut-il un SSIAP en permanence (24/7) ?",
            answer:
              "Cela dépend de votre établissement (ERP/IGH), de sa catégorie, de ses horaires d’ouverture et des obligations. On dimensionne en fonction du cadre réglementaire et du niveau de risque opérationnel."
          }
        ],
      
        relatedServices: ["agent-securite-qualifie", "securite-evenementielle", "audit-conseil-surete"]
      }
  },

  {
    slug: "agent-rondier",
    icon: "Radio",
    title: "Agent Rondier Intervenant",
    shortDescription:
      "Rondes de surveillance et interventions sur alarme pour une sécurité active 24/7.",
    description:
      "L’agent rondier effectue des rondes de surveillance à horaires variables ou fixes pour prévenir les intrusions et anomalies sur vos sites. En cas d’alarme, il intervient pour effectuer la levée de doute et prendre les mesures conservatoires nécessaires, en liaison avec les forces de l’ordre si besoin.",
    keywords: [
      "rondier",
      "intervention sur alarme",
      "ronde de sécurité",
      "levée de doute",
      "sécurité mobile",
      "rondes 24/7",
    ],
    heroImageId: ensureHero("service-agent-rondier"),
    benefits: [
      { title: "Sécurité active 24/7", description: "Couverture de vos sites hors horaires d’ouverture, avec passages planifiés ou aléatoires." },
      { title: "Levée de doute rapide", description: "Intervention immédiate pour vérifier la nature d’une alarme et agir selon consignes." },
      { title: "Effet dissuasif", description: "Passages à horaires variables qui perturbent le repérage et découragent les tentatives." },
      { title: "Rapports détaillés", description: "Traçabilité des rondes et rapports d’intervention précis, avec éléments factuels." },
      { title: "Maîtrise des coûts", description: "Alternative optimisée à une présence postée permanente pour certains types de sites." },
      { title: "Tranquillité d’esprit", description: "Un professionnel prêt à intervenir à tout moment selon votre protocole." },
    ],
    method: {
      title: "Notre service de rondes et interventions",
      description: "La mobilité et la réactivité au service de votre tranquillité.",
      steps: [
        { icon: "Map", title: "Planification des rondes", description: "Itinéraires, points de contrôle, fréquences, horaires fixes ou variables." },
        { icon: "KeyRound", title: "Gestion des accès", description: "Procédure sécurisée pour clés / accès selon votre organisation." },
        { icon: "AlarmClock", title: "Intervention sur alarme", description: "Déclenchement sur appel : arrivée sur site, levée de doute et actions conservatoires." },
        { icon: "ShieldCheck", title: "Sécurisation & rapport", description: "Application des consignes, coordination si besoin, puis compte rendu détaillé." },
      ],
    },
    sectors: [
      { icon: "Building2", name: "Zones d’activités" },
      { icon: "Factory", name: "Sites industriels & entrepôts" },
      { icon: "HardHat", name: "Chantiers en construction" },
      { icon: "Store", name: "Parcs commerciaux" },
    ],
    faq: [
      {
        question: "Que se passe-t-il si une intrusion est confirmée ?",
        answer:
          "L’agent applique les consignes définies : sécurisation, alerte des forces de l’ordre, communication des informations utiles et mise en place d’un périmètre si nécessaire.",
      },
      {
        question: "Comment suivez-vous les rondes ?",
        answer:
          "Nous utilisons des systèmes de traçabilité permettant d’horodater les passages aux points de contrôle et de produire des rapports réguliers.",
      },
    ],
    seo: {
      slugKeyword: "agent rondier intervenant",
      secondaryKeywords: ["intervention sur alarme", "levée de doute", "rondes de sécurité Île-de-France", "sécurité mobile"],
      metaTitle: "Agent rondier intervenant & levée de doute en Île-de-France | Basic Protection",
      metaDescription:
        "Rondes de surveillance, interventions sur alarme, levée de doute, sécurisation et reporting. Dispositif réactif multi-sites. Intervention 75, 78, 92, 93, 94, 95, 77, 91.",
      h1: "Agent Rondier Intervenant en Île-de-France",
    },
    page: {
        lead:
          "Le rondier intervenant est la solution idéale pour sécuriser un ou plusieurs sites sans immobiliser un agent posté en permanence. Rondes planifiées ou aléatoires, levées de doute sur alarme, sécurisation temporaire et reporting factuel : vous gagnez en dissuasion, en réactivité et en maîtrise des coûts, avec un dispositif pilotable et traçable 24/7.",
        sections: [
          {
            id: "intro-rondier",
            title: "Rondier intervenant : sécurité mobile, dissuasion et réaction rapide",
            paragraphs: [
              "L’agent rondier intervenant (souvent associé à la levée de doute) répond à un besoin très concret : sécuriser efficacement un site en dehors des horaires d’ouverture, ou sécuriser plusieurs sites avec une logique de passages, sans mettre en place une présence fixe coûteuse.",
              "Sa force : la mobilité. Un rondier intervient sur des itinéraires définis, réalise des rondes à horaires fixes et/ou variables, vérifie les points vitaux (accès, issues, parkings, zones de stockage, locaux techniques), et agit en cas d’alarme selon un protocole précis.",
              "Contrairement à une idée reçue, une ronde n’est pas un “tour de contrôle rapide”. Un dispositif sérieux se construit : points de passage, fréquences, gestion des clés et accès, protocoles d’intervention, escalade, et surtout traçabilité. C’est cette structure qui transforme la ronde en vraie prévention."
            ],
            note:
              "Point clé : le rondier est performant quand il est cadré (itinéraires + procédures + accès). Sans cadrage, vous achetez des passages… sans impact réel.",
            internalLinks: [
              { label: "Présence fixe & contrôle d’accès : agent APS", href: "/services/agent-securite-qualifie" },
              { label: "Dissuasion renforcée grands périmètres : agent cynophile", href: "/services/agent-cynophile" }
            ]
          },
      
          {
            id: "cas-usage",
            title: "Quand choisir un rondier intervenant ? (multi-sites, fermeture, alarmes)",
            intro:
              "Le rondier est particulièrement pertinent quand vous avez besoin de dissuasion et de réactivité, mais que la présence continue n’est pas nécessaire (ou pas optimisée).",
            bullets: [
              "Multi-sites : agences, commerces, locaux techniques, cabinets, dépôts",
              "Horaires de fermeture : nuits, week-ends, jours fériés, vacances",
              "Sites sensibles aux intrusions : zones isolées, faible éclairage, accès multiples",
              "Levée de doute sur alarme : intrusion, incendie (selon protocole), technique",
              "Surveillance ponctuelle : travaux, inventaires, période de tension (vols)",
              "Protection des accès : portails, portes secondaires, parkings, zones stock"
            ],
            paragraphs: [
              "Dans la majorité des cas, le rondier agit sur la prévention des intrusions opportunistes. Les passages à horaires variables perturbent le repérage et augmentent le risque perçu par les intrus. Cette simple mécanique réduit fortement les tentatives sur des sites qui “semblent faciles”.",
              "C’est aussi une solution rationnelle pour les entreprises qui veulent garder la main sur leur budget : vous dimensionnez le nombre de passages, les horaires, et les priorités selon le risque réel."
            ]
          },
      
          {
            id: "rondes",
            title: "Rondes de sécurité : planification, points vitaux, logique d’imprévisibilité",
            paragraphs: [
              "Une ronde efficace, c’est une ronde qui couvre les zones réellement sensibles : accès secondaires, issues, clôtures, parkings, zones de stockage, angles morts, quais, locaux techniques. On évite les rondes “habitude” où l’intrus sait exactement où et quand l’agent passe.",
              "Le dispositif peut combiner : rondes fixes (sécuriser des horaires critiques) + rondes aléatoires (casser la prévisibilité). On définit des points de contrôle (physiques ou via traçabilité), et on suit la qualité dans le temps.",
              "Chaque ronde doit produire une valeur : vérifications, détection d’anomalies, correction simple si possible, signalement, et compte rendu."
            ],
            bullets: [
              "Itinéraires définis + ajustables selon risque",
              "Rondes fixes (horaires critiques) + rondes aléatoires (anti-repérage)",
              "Vérification accès : portes, portails, fenêtres, zones techniques",
              "Contrôle visuel des anomalies : éclairage, encombrement, traces",
              "Traçabilité des passages et événements"
            ],
            note:
              "Conseil terrain : liste tes “10 points vitaux” (accès secondaires, zones stock, parkings, issues…) et structure la ronde autour de ça."
          },
      
          {
            id: "intervention-alarme",
            title: "Intervention sur alarme : levée de doute et sécurisation (sans improvisation)",
            paragraphs: [
              "Le rondier intervenant est souvent mobilisé pour les alarmes : intrusion, ouverture non autorisée, alarme technique (selon organisation), parfois incendie dans certains schémas (toujours selon protocole). L’objectif est de qualifier la situation rapidement, de sécuriser, et de déclencher les suites appropriées.",
              "La levée de doute ne signifie pas “entrer coûte que coûte”. La priorité est la sécurité : observation, contrôle extérieur, vérification des accès, identification d’indices, puis action selon consignes. Si une intrusion est confirmée ou si le risque est élevé, l’agent applique les consignes et alerte les forces de l’ordre, sans se mettre en danger.",
              "Tout est documenté : heure d’alerte, heure d’arrivée, constatations, actions, suites. Cette traçabilité est souvent indispensable pour les assurances et le pilotage."
            ],
            bullets: [
              "Déclenchement : appel / centrale / procédure convenue",
              "Arrivée sur site et premières observations",
              "Levée de doute : vérifications selon protocole",
              "Mesures conservatoires : sécurisation temporaire, fermeture, balisage",
              "Alerte / coordination si nécessaire (forces de l’ordre, exploitant, maintenance)",
              "Compte rendu détaillé et traçabilité"
            ],
            note:
              "Un bon protocole évite les “zones grises” : accès autorisés, clés, seuils d’alerte, consignes d’escalade, numéros utiles."
          },
      
          {
            id: "cles-acces",
            title: "Gestion des clés et accès : le point critique à cadrer dès le départ",
            paragraphs: [
              "La plupart des dysfonctionnements dans un service rondier viennent des accès : clés non disponibles, codes qui changent, badge non activé, consignes floues (“tu peux entrer mais seulement si…”), ou absence de contact joignable.",
              "On sécurise donc ce volet : procédure de remise, enveloppes scellées si besoin, registre, règles d’usage, et contacts d’escalade. Le rondier doit pouvoir intervenir vite, sans improvisation, et sans fragiliser votre sécurité (clés qui circulent sans contrôle)."
            ],
            bullets: [
              "Procédure claire de remise / restitution",
              "Contacts joignables et niveaux d’escalade",
              "Règles d’accès : quand entrer, quand rester à l’extérieur",
              "Sécurisation des codes / badges (mise à jour et contrôle)"
            ]
          },
      
          {
            id: "reporting",
            title: "Traçabilité & reporting : piloter la sécurité avec des faits",
            paragraphs: [
              "La valeur d’un rondier ne se limite pas à “passer”. Elle se mesure à ce qui est détecté, corrigé et évité. C’est pourquoi la traçabilité est centrale : passages horodatés, événements relevés, anomalies, actions conservatoires, recommandations.",
              "Vous devez pouvoir répondre à des questions simples : combien d’anomalies ce mois-ci ? sur quelles zones ? à quelles heures ? quelles actions ont été prises ? quelles recommandations ? C’est ce pilotage qui fait monter la sécurité en qualité."
            ],
            bullets: [
              "Traçabilité des passages (points de contrôle, horaires)",
              "Rapports d’intervention (alarme / événement) factuels",
              "Synthèses périodiques et recommandations",
              "Historique exploitable (pilotage + assurance)"
            ],
            note:
              "Objectif : une sécurité mesurable. Sans reporting, impossible d’améliorer."
          },
      
          {
            id: "complementarites",
            title: "Complémentarités : rondier + APS + cynophile + audit",
            paragraphs: [
              "Le rondier est excellent pour : multi-sites, fermeture, prévention intrusion, levée de doute. Mais selon le risque, il peut être renforcé par un dispositif complémentaire.",
              "APS : utile quand il faut une présence fixe (accueil, contrôle d’accès en continu). Cynophile : très pertinent pour grands périmètres, chantiers, zones isolées, dissuasion maximale. Audit : pour optimiser le dispositif et investir au bon endroit (humain, process, technique)."
            ],
            bullets: [
              "APS : présence fixe et contrôle d’accès permanent",
              "Cynophile : dissuasion et détection renforcées (périmètres ouverts)",
              "Audit : optimisation budget et trajectoire de sûreté",
              "Combinaisons possibles : selon le site et la période"
            ],
            internalLinks: [
              { label: "Agent APS (présence fixe)", href: "/services/agent-securite-qualifie" },
              { label: "Agent cynophile (grands périmètres)", href: "/services/agent-cynophile" },
              { label: "Audit & conseil (optimiser votre budget)", href: "/services/audit-conseil-surete" }
            ]
          },
      
          {
            id: "idf-local",
            title: "Rondier en Île-de-France : réactivité et organisation multi-sites",
            paragraphs: [
              "En Île-de-France, la réactivité dépend de l’organisation : secteurs d’intervention, accès, stationnement, densité urbaine et procédures. Un bon service rondier repose sur un cadrage précis et une continuité opérationnelle.",
              "Nous intervenons sur l’ensemble de l’Île-de-France (75, 78, 92, 93, 94, 95, 77, 91) et adaptons itinéraires, fréquences et protocoles selon vos contraintes (bureaux, retail, entrepôts, chantiers, locaux techniques)."
            ],
            internalLinks: [
              { label: "Zones d’intervention", href: "/zones" },
              { label: "Pages sécurité par ville", href: "/villes" }
            ],
            note:
              "Conseil SEO : sur tes pages locales, cible “rondes + levée de doute + alarme” et renvoie vers cette page rondier."
          },
      
          {
            id: "cta",
            title: "Dimensionnons un service rondier réellement efficace (et pilotable)",
            paragraphs: [
              "Un bon dispositif rondier commence par une règle simple : cadrer les accès, les points vitaux et les procédures. Ensuite, on dimensionne : nombre de passages, horaires, rondes aléatoires, et protocole d’intervention.",
              "Si tu veux une solution optimisée (multi-sites, fermeture, alarmes), on peut définir ensemble un dispositif clair, traçable et adapté à ton budget, avec un reporting exploitable."
            ],
            note:
              "Sur ta page, ajoute un CTA clair : “Demander un devis rondes / levée de doute” + “Être rappelé” + “Audit rapide des accès (selon conditions)”."
          }
        ],
      
        faqLong: [
          {
            question: "Quelle est la différence entre un rondier intervenant et un agent APS posté ?",
            answer:
              "L’APS est généralement présent en continu sur un site (poste fixe, contrôle d’accès, surveillance). Le rondier intervient sur un ou plusieurs sites avec des rondes planifiées ou aléatoires et des interventions sur alarme. Le rondier est idéal pour la fermeture et le multi-sites ; l’APS est idéal pour une présence permanente."
          },
          {
            question: "Le rondier entre-t-il systématiquement sur site en cas d’alarme ?",
            answer:
              "Non. La priorité est la sécurité et le respect des consignes. La levée de doute suit un protocole : observation, vérifications, sécurisation, puis entrée éventuelle si les conditions et les consignes le permettent."
          },
          {
            question: "Comment sont suivies les rondes ?",
            answer:
              "Grâce à des systèmes de traçabilité : passages horodatés, points de contrôle, rapports d’événements. Vous recevez des comptes rendus exploitables pour piloter votre sécurité."
          },
          {
            question: "Peut-on adapter le nombre de rondes selon les périodes ?",
            answer:
              "Oui : renforts en période sensible (travaux, inventaires, vacances, série d’incidents), ajustement des horaires, ajout de rondes aléatoires ou modification des points vitaux."
          },
          {
            question: "Le rondier remplace-t-il un système d’alarme ?",
            answer:
              "Non, c’est complémentaire. L’alarme détecte, le rondier qualifie et agit. Le combo alarme + rondier réduit les fausses alertes, accélère la réaction et renforce la prévention."
          }
        ],
      
        relatedServices: ["agent-securite-qualifie", "agent-cynophile", "audit-conseil-surete"]
      }
  },

  {
    slug: "protection-rapprochee",
    icon: "UserCheck",
    title: "Protection Rapprochée (Garde du corps)",
    shortDescription:
      "Dispositifs discrets et efficaces pour la sécurité des dirigeants et personnalités.",
    description:
      "Nous assurons la protection des personnes exposées à des risques élevés. Nos agents spécialisés sont formés pour anticiper, dissuader et réagir avec une efficacité et une discrétion maximales, garantissant votre sécurité sans perturber votre quotidien.",
    keywords: [
      "garde du corps",
      "protection rapprochée",
      "sécurité VIP",
      "escorte",
      "protection dirigeants",
      "sécurité personnalité",
    ],
    heroImageId: ensureHero("service-protection-rapprochee"),
    benefits: [
      { title: "Discrétion absolue", description: "Protection quasi invisible : posture maîtrisée, présence adaptée, confidentialité." },
      { title: "Anticipation des risques", description: "Analyse permanente pour prévenir avant l’incident : contextes, itinéraires, lieux." },
      { title: "Haute qualification", description: "Professionnels entraînés : gestion d’incident, protection, premiers gestes si nécessaire." },
      { title: "Disponibilité 24/7", description: "Dispositifs adaptés aux déplacements et à l’agenda, en France et en contexte événementiel." },
      { title: "Gestion de crise", description: "Procédures d’extraction et réaction rapide si la situation l’exige." },
      { title: "Itinéraires & reconnaissance", description: "Préparation et sécurisation des trajets, points sensibles, alternatives et routines." },
    ],
    method: {
      title: "Notre méthode en protection rapprochée",
      description: "Une approche systématique pour une sécurité sans faille.",
      steps: [
        { icon: "MessageCircle", title: "Audit de risques", description: "Évaluation du niveau d’exposition et analyse des contextes (lieux, habitudes, événements)." },
        { icon: "FileText", title: "Plan de protection", description: "Dispositif sur-mesure : équipe, posture, itinéraires, accès, protocoles." },
        { icon: "ShieldCheck", title: "Mise en œuvre", description: "Briefings, reconnaissances, déploiement discret et coordination opérationnelle." },
        { icon: "ThumbsUp", title: "Suivi & adaptation", description: "Ajustements en temps réel selon l’environnement et l’évolution du risque." },
      ],
    },
    sectors: [
      { icon: "Users", name: "Dirigeants & cadres" },
      { icon: "Gem", name: "Personnalités (art, sport)" },
      { icon: "Home", name: "Familles exposées" },
      { icon: "Building2", name: "Délégations & déplacements sensibles" },
    ],
    faq: [
      {
        question: "Un garde du corps est-il armé ?",
        answer:
          "Le port d’arme est strictement réglementé en France. Selon le niveau de menace et les autorisations nécessaires, des solutions peuvent exister. Chaque cas est étudié individuellement dans le respect du cadre légal.",
      },
      {
        question: "Comment garantissez-vous la confidentialité ?",
        answer:
          "La discrétion est centrale : engagements stricts, information minimale, protocole de communication et respect absolu de votre vie privée.",
      },
    ],
    seo: {
      slugKeyword: "protection rapprochée",
      secondaryKeywords: ["garde du corps Île-de-France", "sécurité VIP", "protection dirigeants", "escorte sécurisée"],
      metaTitle: "Protection rapprochée (garde du corps) en Île-de-France | Basic Protection",
      metaDescription:
        "Protection rapprochée discrète : audit de risques, plan de protection, sécurisation déplacements et événements, adaptation en temps réel. Intervention 75, 78, 92, 93, 94, 95, 77, 91.",
      h1: "Protection Rapprochée (Garde du corps) en Île-de-France",
    },
    page: {
        lead:
          "La protection rapprochée n’est pas une démonstration de force : c’est un dispositif discret, précis et anticipatif. Nos agents protègent une personne (ou un groupe) en maîtrisant les déplacements, les accès, les interactions et les situations imprévues, tout en préservant l’image et le confort. Objectif : réduire le risque sans perturber votre quotidien — et vous laisser avancer sereinement.",
        sections: [
          {
            id: "intro-pr",
            title: "Protection rapprochée : discrétion, anticipation, maîtrise",
            paragraphs: [
              "Un dispositif de protection rapprochée (souvent appelé “garde du corps”) vise d’abord à éviter le problème, pas à le gérer au dernier moment. Cela passe par l’anticipation : analyse des risques, préparation des déplacements, sécurisation des accès, gestion des interactions, et capacité à prendre la bonne décision dans les premières secondes.",
              "Dans un contexte VIP, dirigeant, personnalité publique, délégation, événement premium ou situation sensible, la protection doit rester fluide et discrète : posture, communication, et maîtrise des détails. La sécurité ne doit pas se voir — elle doit se ressentir.",
              "Notre approche est structurée : cadrage de mission, protocole clair, repérage si nécessaire, coordination avec chauffeurs/lieux/organisateurs, et reporting. Vous gardez la maîtrise, sans rigidifier vos agendas."
            ],
            note:
              "Point clé : la meilleure protection est celle qui évite l’incident. La force du dispositif se joue en amont (préparation + règles simples + vigilance).",
            internalLinks: [
              { label: "Sécurité événementielle (VIP, flux, accréditations)", href: "/services/securite-evenementielle" },
              { label: "Audit & conseil (évaluer le niveau de risque)", href: "/services/audit-conseil-surete" }
            ]
          },
      
          {
            id: "cas-usage",
            title: "Dans quels cas recourir à la protection rapprochée ?",
            intro:
              "La protection rapprochée est pertinente dès qu’un risque humain ou médiatique peut impacter votre sécurité, votre activité, votre image ou votre liberté de mouvement.",
            bullets: [
              "Dirigeants, CEO, cadres exposés, personnalités publiques",
              "VIP : artistes, influence, presse, délégations",
              "Déplacements sensibles : rendez-vous, salons, sorties, événements",
              "Conflits / tensions : litiges, menaces, harcèlement, rupture",
              "Exposition médiatique : prises d’images, foule, interactions non maîtrisées",
              "Événements premium : soirées, galas, lancements, fashion, hôtels"
            ],
            paragraphs: [
              "Le risque n’est pas toujours “spectaculaire”. Il peut être diffus : repérage, insistance, intrusion, harcèlement, vol ciblé, agressivité, ou simple foule difficile à gérer. La protection rapprochée vise à réduire toutes ces opportunités.",
              "Dans beaucoup de missions, le confort et l’image comptent : gestion des distances, contrôle des approches, filtrage des sollicitations, et capacité à faire circuler sans frictions. On protège la personne, mais aussi son rythme et son environnement."
            ]
          },
      
          {
            id: "methodo",
            title: "Notre méthode : analyse, protocole, exécution",
            paragraphs: [
              "Une mission de protection sérieuse repose sur un triptyque simple : analyser → planifier → exécuter. D’abord, on identifie les risques (contextuels, humains, lieux, déplacements). Ensuite, on construit des règles claires : itinéraires, points d’accès, zones tampon, rôles, procédures en cas d’incident.",
              "Puis, sur le terrain, le dispositif doit rester souple : ajustements en temps réel, communication discrète, gestion des imprévus, et décisions rapides. Le but n’est pas de “bloquer” : c’est de canaliser et de sécuriser.",
              "Selon le niveau de risque, on peut intégrer du repérage, une coordination chauffeurs, une sécurisation du lieu (en amont) et une articulation avec un dispositif événementiel."
            ],
            bullets: [
              "Cadrage mission : contexte, contraintes, objectifs",
              "Analyse des risques : lieux, trajets, interactions",
              "Protocole : accès, distances, zones, procédures",
              "Exécution : vigilance + discrétion + décisions rapides",
              "Coordination : chauffeurs, organisateurs, lieux, staff"
            ],
            note:
              "Une bonne protection ne “met pas la pression”. Elle installe un cadre, calmement."
          },
      
          {
            id: "dispositifs",
            title: "Dispositifs possibles : rapproché, mobile, chauffeur sécurité, escorte",
            paragraphs: [
              "La protection rapprochée n’a pas un seul format. On adapte selon votre agenda, votre exposition et le contexte. Sur une journée VIP : dispositif mobile + gestion des accès. Sur des déplacements : chauffeur sécurité + coordination et itinéraires. Sur un événement : articulation avec une équipe événementielle (filtrage / backstage).",
              "L’objectif reste le même : réduire les opportunités d’incident, garantir une liberté de mouvement, et sécuriser sans rigidifier."
            ],
            bullets: [
              "Protection rapprochée (au contact, discret, fluide)",
              "Chauffeur sécurité : itinéraires, points d’arrêt, embarquement/débarquement",
              "Escorte et transferts : gares, aéroports, hôtels, lieux premium",
              "Sécurisation de lieu (ponctuelle) : repérage, points d’accès, zones sensibles",
              "Articulation événement : VIP, backstage, contrôle des approches"
            ],
            internalLinks: [
              { label: "Sécurité événementielle", href: "/services/securite-evenementielle" }
            ]
          },
      
          {
            id: "posture",
            title: "Savoir-être : la vraie signature du premium",
            paragraphs: [
              "La protection premium se juge à la posture : calme, politesse, autorité discrète, communication maîtrisée. Un agent qui “surjoue” crée de la tension et attire l’attention. Un agent qui maîtrise son rôle protège sans dégrader l’expérience.",
              "On travaille donc sur l’anticipation, la discrétion, la gestion des distances, le contrôle des interactions et la capacité à désescalader. La sécurité doit rester élégante."
            ],
            bullets: [
              "Autorité calme : pas d’agressivité, pas de sur-réaction",
              "Discrétion : préserver l’image et le confort",
              "Communication : filtrer, orienter, gérer les sollicitations",
              "Désescalade : éviter que la tension ne monte",
              "Vigilance : lire l’environnement et anticiper"
            ]
          },
      
          {
            id: "coordination",
            title: "Coordination : lieux, chauffeurs, organisateurs, staff",
            paragraphs: [
              "La protection rapprochée fonctionne quand les interfaces sont claires. Sur une mission VIP, on coordonne souvent avec un chauffeur, le lieu (hôtel, restaurant, salle), l’organisateur ou un assistant. L’objectif : éviter les zones grises et les improvisations.",
              "On définit à l’avance : points d’entrée, timing, zones d’attente, procédures d’arrivée/départ, et réponses en cas de problème (intrusion, foule, insistance, incident). Cela rend la mission plus fluide et plus sûre."
            ],
            bullets: [
              "Arrivées / départs : points de rendez-vous, timing, itinéraires",
              "Gestion accès : listes, badges, zones, portes secondaires",
              "Zones tampon : distances et espaces de respiration",
              "Procédures incident : alerte, extraction, repli, coordination"
            ]
          },
      
          {
            id: "idf-local",
            title: "Paris & Île-de-France : densité, flux, exposition",
            paragraphs: [
              "À Paris et en Île-de-France, les contraintes sont spécifiques : densité, foule, mobilité, lieux premium, présence médiatique, accès complexes. Une mission de protection doit être organisée : itinéraires, points d’arrêt, alternatives, et coordination.",
              "Nous intervenons sur l’ensemble de l’Île-de-France (75, 78, 92, 93, 94, 95, 77, 91) avec une approche adaptée : discrétion, fluidité, et maîtrise opérationnelle."
            ],
            internalLinks: [
              { label: "Zones d’intervention", href: "/zones" },
              { label: "Pages sécurité par ville", href: "/villes" }
            ],
            note:
              "Conseil SEO : sur tes pages villes, cible “protection rapprochée + VIP + chauffeur sécurité + événement premium”."
          },
      
          {
            id: "cta",
            title: "Mettons en place une protection rapprochée discrète et efficace",
            paragraphs: [
              "On commence par un cadrage simple : contexte, niveau d’exposition, déplacements, lieux, contraintes et objectifs. Ensuite, on propose un format adapté : agent(s), horaires, protocole et coordination.",
              "Si vous cherchez une protection premium, discrète et structurée, on peut vous proposer un dispositif clair, pilotable et proportionné."
            ],
            note:
              "Sur ta page, ajoute un CTA clair : “Demander un devis protection rapprochée” + “Être rappelé” + “Évaluation risque (selon conditions)”."
          }
        ],
      
        faqLong: [
          {
            question: "Quelle différence entre protection rapprochée et sécurité événementielle ?",
            answer:
              "La protection rapprochée protège une personne (ou un petit groupe) avec une logique de déplacements, d’interactions et d’anticipation. La sécurité événementielle protège un lieu/événement avec une logique d’accès, de flux, de zones et d’organisation. Les deux peuvent se combiner sur un événement VIP."
          },
          {
            question: "Proposez-vous un chauffeur sécurité ?",
            answer:
              "Oui. Selon le besoin, la mission peut inclure un chauffeur sécurité : gestion itinéraires, points d’arrêt, embarquement/débarquement, coordination et adaptation en temps réel."
          },
          {
            question: "Est-ce discret ?",
            answer:
              "Oui. La discrétion est un point central : posture, communication, vêtements adaptés au contexte, et sécurité ‘fluide’ qui ne dégrade pas l’expérience."
          },
          {
            question: "Peut-on sécuriser aussi un lieu (hôtel, restaurant, villa) ?",
            answer:
              "Oui. Selon le contexte, on peut sécuriser les accès, organiser les arrivées/départs, et définir un protocole avec les responsables du lieu."
          },
          {
            question: "Combien d’agents faut-il ?",
            answer:
              "Cela dépend du niveau d’exposition, du programme, des lieux, des déplacements et du public. Après cadrage, on dimensionne un dispositif proportionné : 1 agent discret ou une équipe avec supervision."
          }
        ],
      
        relatedServices: ["securite-evenementielle", "agent-securite-qualifie", "audit-conseil-surete"]
      }
  },

  {
    slug: "securite-evenementielle",
    icon: "CalendarDays",
    title: "Sécurité Événementielle de Prestige",
    shortDescription:
      "Sécurisation de lancements, galas, défilés et événements privés de haut standing.",
    description:
      "Nous concevons et mettons en œuvre des dispositifs de sécurité pour les événements les plus exigeants. De l’accueil à la gestion des flux, en passant par le contrôle d’accès et la prévention, nous assurons le bon déroulement de votre événement en toute sérénité.",
    keywords: [
      "sécurité événementielle",
      "contrôle d'accès événement",
      "gestion des flux",
      "sécurité gala",
      "sécurité VIP",
      "filtrage événementiel",
    ],
    heroImageId: ensureHero("service-evenementiel"),
    benefits: [
      { title: "Image de marque préservée", description: "Agents au savoir-être irréprochable, posture premium, accueil maîtrisé." },
      { title: "Gestion des flux optimisée", description: "Accès fluides, files maîtrisées, circulation des invités, zones VIP." },
      { title: "Prévention active", description: "Dissuasion et gestion des tensions avant qu’elles ne montent." },
      { title: "Coordination efficace", description: "Un responsable dispositif pour une communication simple et claire." },
      { title: "Accréditations & zones sensibles", description: "Contrôle rigoureux des accès : backstage, VIP, staff, technique." },
      { title: "Réactivité", description: "Ajustements en temps réel selon le terrain (météo, affluence, timing)." },
    ],
    method: {
      title: "Notre approche de la sécurité événementielle",
      description: "Chaque événement est unique, notre dispositif l’est aussi.",
      steps: [
        { icon: "MessageCircle", title: "Analyse du site", description: "Repérage des lieux, accès, zones sensibles, flux attendus et contraintes." },
        { icon: "FileText", title: "Plan de sécurité", description: "Effectifs, postes, consignes, accréditations, PC sécurité, coordination." },
        { icon: "ShieldCheck", title: "Déploiement & briefing", description: "Mise en place, briefings, tests, et ajustements avant ouverture." },
        { icon: "ThumbsUp", title: "Exécution & reporting", description: "Supervision active, incidents gérés, puis retour d’expérience documenté." },
      ],
    },
    sectors: [
      { icon: "ShoppingCart", name: "Luxe & mode" },
      { icon: "Gem", name: "Lancements de produits" },
      { icon: "Building", name: "Événements corporate" },
      { icon: "Users", name: "Soirées privées" },
    ],
    faq: [
      {
        question: "Combien d’agents faut-il pour mon événement ?",
        answer:
          "Le dimensionnement dépend de la jauge, du lieu, du public, des accès, des zones VIP et du niveau de risque. Une analyse préalable permet de définir un dispositif précis.",
      },
      {
        question: "Proposez-vous des palpations de sécurité ?",
        answer:
          "Oui si le cadre légal, le lieu et la nature de l’événement le justifient. Elles sont effectuées par des agents de même sexe, dans le respect de la loi.",
      },
    ],
    seo: {
      slugKeyword: "sécurité événementielle",
      secondaryKeywords: ["sécurité gala", "contrôle d’accès VIP", "gestion des flux événement", "sécurité défilé", "sécurité corporate"],
      metaTitle: "Sécurité événementielle de prestige en Île-de-France | Basic Protection",
      metaDescription:
        "Dispositif événementiel premium : plan de sécurité, filtrage, accréditations, zones VIP, gestion des flux, supervision. Intervention 75, 78, 92, 93, 94, 95, 77, 91.",
      h1: "Sécurité Événementielle de Prestige en Île-de-France",
    },
    page: {
        lead:
          "Un événement premium exige une sécurité fluide, discrète et structurée. Notre approche combine filtrage, accréditations, gestion des flux, zones VIP et supervision, avec un savoir-être irréprochable pour préserver l’expérience invité. Objectif : sécuriser sans durcir, anticiper sans sur-réagir, et maintenir un niveau d’exigence constant du montage au démontage.",
        sections: [
          {
            id: "intro-event",
            title: "Sécurité événementielle : protéger l’expérience autant que le lieu",
            paragraphs: [
              "La sécurité événementielle n’est pas une simple “présence”. Sur un gala, un lancement, un défilé, une soirée privée ou un événement corporate, elle doit être invisible quand tout va bien… et immédiatement efficace quand un imprévu survient.",
              "Un dispositif premium se juge à deux choses : la fluidité (accueil, files, circulation, accès VIP) et la maîtrise (filtrage, accréditations, zones sensibles, gestion des tensions). L’enjeu, c’est la protection — mais aussi l’image.",
              "C’est pourquoi nous privilégions une approche structurée : plan de sécurité, consignes claires, postes cohérents, coordination terrain, supervision et reporting. Vous gardez le contrôle, sans transformer votre événement en “zone sous tension”."
            ],
            note:
              "Point clé : un bon dispositif événementiel sécurise sans dégrader l’ambiance. La posture et la méthode comptent autant que les effectifs.",
            internalLinks: [
              { label: "Protection VIP : protection rapprochée", href: "/services/protection-rapprochee" },
              { label: "Conformité incendie : agents SSIAP", href: "/services/agent-incendie-ssiap" }
            ]
          },
      
          {
            id: "cas-usage",
            title: "Pour quels événements ? (gala, corporate, luxe, privé)",
            intro:
              "Nous intervenons sur des formats où la maîtrise des accès, la gestion des flux et la discrétion sont déterminants.",
            bullets: [
              "Gala, cocktail, soirée privée, cérémonie",
              "Lancement de produit, activation de marque, pop-up premium",
              "Défilé, fashion week, showroom, événement luxe",
              "Événement corporate : conférences, séminaires, soirées d’entreprise",
              "Événements multi-espaces : rooftop, hôtel, musée, lieux atypiques",
              "Présence VIP, presse, influence, zones backstage"
            ],
            paragraphs: [
              "Chaque contexte a ses risques : intrusions, faux invités, tensions, attroupements, circulation chaotique, photos non autorisées, vols opportunistes, débordements en fin de soirée. Un dispositif sérieux consiste à anticiper ces scénarios et à préparer des réponses simples et exécutables.",
              "Le bon niveau de sécurité, c’est celui qui protège tout en restant proportionné. Trop faible : on subit. Trop fort : on casse l’expérience. Notre travail est de dimensionner juste."
            ]
          },
      
          {
            id: "plan-securite",
            title: "Plan de sécurité : accès, zones, scénarios et coordination",
            paragraphs: [
              "Le cœur d’un événement maîtrisé, c’est un plan. On cartographie : entrées/sorties, zones VIP, backstage, zones techniques, points de congestion, risques de contournement. Puis on construit des règles simples : qui entre, où, comment, avec quel niveau de contrôle.",
              "On définit les rôles : accueil, filtrage, orientation, contrôle des accréditations, supervision, intervention. Enfin, on prépare les scénarios : refus d’accès, comportement agressif, malaise, évacuation, incident technique, arrivée d’un VIP, affluence imprévue.",
              "Résultat : une équipe alignée, une communication fluide, et une gestion des imprévus sans improvisation."
            ],
            bullets: [
              "Repérage et analyse des accès / flux / zones sensibles",
              "Définition des postes et des consignes par zone",
              "Gestion des accréditations (listes, badges, zones, contrôles)",
              "Scénarios : incident, tension, malaise, évacuation, intrusion",
              "Coordination avec l’organisateur, le lieu, le staff et les prestataires"
            ],
            note:
              "Un plan simple et clair vaut mieux qu’un “gros dispositif flou”. La clarté réduit les erreurs."
          },
      
          {
            id: "acces-filtrage",
            title: "Filtrage & accréditations : sécuriser sans bloquer",
            paragraphs: [
              "Le filtrage doit être ferme, mais élégant. Le but n’est pas de créer une barrière hostile : c’est de sécuriser l’accès tout en maintenant une expérience fluide.",
              "Nous mettons en place des règles pratiques : listes, QR codes si besoin, badges, zones, points de contrôle, gestion des invités “hors liste”, et procédures de refus sans escalade.",
              "Sur les événements premium, la forme compte : posture, vocabulaire, calme, discrétion. C’est souvent ce qui évite la tension."
            ],
            bullets: [
              "Contrôle listes / invitations / badges / zones",
              "Gestion des invités hors liste (procédure validée avec l’organisateur)",
              "Orientation et canalisation des flux (files, accès secondaires)",
              "Protection des zones sensibles : VIP, backstage, technique",
              "Refus d’accès maîtrisé : calme, méthode, escalade si nécessaire"
            ]
          },
      
          {
            id: "flux-ambiance",
            title: "Gestion des flux : files, circulation, points de congestion",
            paragraphs: [
              "Beaucoup d’incidents naissent des flux : affluence, files mal gérées, circulation bloquée, attroupements, incompréhension. Une sécurité premium anticipe ces frictions.",
              "On travaille donc sur la circulation : signalement, points d’orientation, gestion des entrées/sorties, fluidification, et adaptation en temps réel (affluence, météo, timing, arrivée VIP).",
              "L’objectif : une ambiance maîtrisée. Plus c’est fluide, moins il y a de tensions."
            ],
            bullets: [
              "Organisation des files et entrées/sorties",
              "Gestion circulation entre espaces (bar, salle, vestiaire, VIP, rooftop)",
              "Prévention attroupements et zones d’embouteillage",
              "Adaptation en temps réel selon affluence et timing"
            ]
          },
      
          {
            id: "ssiap-vip",
            title: "VIP & conformité : protection rapprochée et SSIAP si nécessaire",
            paragraphs: [
              "Sur certains événements, la sécurité événementielle s’articule avec d’autres besoins : VIP (protection rapprochée), contraintes du lieu (ERP), ou exigences du site (sécurité incendie SSIAP).",
              "Notre rôle est de structurer l’ensemble : qui fait quoi, où, quand, selon quel protocole. Cela évite les doublons, les zones grises, et les mauvaises décisions en cas d’incident."
            ],
            bullets: [
              "VIP : contrôle d’accès renforcé, périmètres, coordination déplacements",
              "SSIAP : conformité ERP, procédures incendie, assistance à personnes",
              "Coordination globale : dispositif cohérent, communication simple"
            ],
            internalLinks: [
              { label: "Protection rapprochée (VIP)", href: "/services/protection-rapprochee" },
              { label: "SSIAP (ERP/IGH)", href: "/services/agent-incendie-ssiap" }
            ]
          },
      
          {
            id: "execution-reporting",
            title: "Supervision & reporting : un événement piloté, pas subi",
            paragraphs: [
              "Un responsable de dispositif supervise : ajustements, coordination, remontées d’information, gestion des situations sensibles. Cela permet de rester réactif, sans désorganiser l’événement.",
              "En fin d’événement, un retour structuré (même simple) vous aide à améliorer : incidents, tensions, points faibles, recommandations. C’est particulièrement utile si vous organisez des événements récurrents."
            ],
            bullets: [
              "Briefing équipes et consignes par zone",
              "Supervision terrain et ajustements en temps réel",
              "Gestion incidents : méthode + communication",
              "Compte rendu et retour d’expérience (REX) si souhaité"
            ],
            note:
              "Le reporting sert à progresser : mieux dimensionner, mieux fluidifier, réduire les points de friction."
          },
      
          {
            id: "idf-local",
            title: "Événements à Paris & Île-de-France : timing, accès, lieux exigeants",
            paragraphs: [
              "Paris et l’Île-de-France imposent des contraintes fortes : densité, accès, horaires, stationnement, lieux atypiques (rooftops, hôtels, musées), prestataires nombreux. La sécurité doit être encore plus structurée et coordonnée.",
              "Nous intervenons sur l’ensemble de l’Île-de-France (75, 78, 92, 93, 94, 95, 77, 91) avec une approche adaptée au niveau d’exigence de votre événement."
            ],
            internalLinks: [
              { label: "Zones d’intervention", href: "/zones" },
              { label: "Pages sécurité par ville", href: "/villes" }
            ],
            note:
              "Conseil SEO : sur tes pages villes, cible “sécurité événementielle + filtrage + VIP + gestion des flux” et renvoie vers cette page."
          },
      
          {
            id: "cta",
            title: "Construisons un dispositif événementiel premium, fluide et sécurisé",
            paragraphs: [
              "Pour dimensionner juste, on commence par un cadrage simple : lieu, jauge, profils invités, accès, zones, contraintes, scénarios. Ensuite on définit : postes, consignes, accréditations et supervision.",
              "Si vous voulez une sécurité qui protège l’événement sans le dénaturer, on peut vous proposer un dispositif premium : méthode, savoir-être, coordination et pilotage."
            ],
            note:
              "Sur ta page, ajoute un CTA clair : “Demander un devis événement” + “Être rappelé” + “Cadrage sécurité (selon conditions)”."
          }
        ],
      
        faqLong: [
          {
            question: "Combien d’agents faut-il pour mon événement ?",
            answer:
              "Cela dépend de la jauge, du lieu, du nombre d’accès, des zones VIP/backstage, du public et du niveau de risque. Après un cadrage (plan + flux + scénarios), on dimensionne un dispositif proportionné et efficace."
          },
          {
            question: "Gérez-vous les accréditations et les listes d’invités ?",
            answer:
              "Oui : listes, badges, zones, points de contrôle et procédure “hors liste” validée avec l’organisateur. L’objectif est d’être ferme sans créer de tension."
          },
          {
            question: "Proposez-vous des palpations de sécurité ?",
            answer:
              "Oui lorsque le cadre légal, le lieu et la nature de l’événement le justifient. Elles sont réalisées par des agents habilités, de même sexe, dans le respect des règles."
          },
          {
            question: "Pouvez-vous couvrir un événement sur plusieurs lieux ?",
            answer:
              "Oui. On cadre le parcours, les timings, les accès et les zones sensibles, puis on organise les équipes et la coordination pour assurer une continuité de sécurité."
          },
          {
            question: "Pouvez-vous intégrer du SSIAP et/ou de la protection VIP ?",
            answer:
              "Oui. Selon les contraintes ERP et la présence de VIP, on articule sécurité événementielle, SSIAP et protection rapprochée avec un protocole clair (qui fait quoi, quand, comment)."
          }
        ],
      
        relatedServices: ["protection-rapprochee", "agent-incendie-ssiap", "agent-securite-qualifie", "audit-conseil-surete"]
      }
  },

  {
    slug: "audit-conseil-surete",
    icon: "FileSearch",
    title: "Audit & Conseil en Sûreté",
    shortDescription:
      "Analyse de risques complexes et conception de plans de sécurité intégrés et performants.",
    description:
      "Notre expertise ne se limite pas à l’humain. Nous analysons vos infrastructures, procédures et technologies pour identifier les failles et vous proposer des solutions globales. Objectif : transformer vos dépenses de sécurité en investissement stratégique, avec un plan d’action priorisé.",
    keywords: [
      "audit de sûreté",
      "conseil en sécurité",
      "plan de sécurité",
      "analyse de risques",
      "ingénierie sûreté",
      "cartographie des risques",
    ],
    heroImageId: ensureHero("service-audit-conseil"),
    benefits: [
      { title: "Vision à 360°", description: "Analyse humain, technique et organisationnel : une lecture globale du risque." },
      { title: "Recommandations pragmatiques", description: "Solutions concrètes, priorisées et chiffrées pour décider vite." },
      { title: "Indépendance & objectivité", description: "Regard expert sans biais fournisseur : recommandations basées sur vos besoins." },
      { title: "Conformité", description: "Vérification des obligations et réduction des risques réglementaires." },
      { title: "Optimisation des coûts", description: "Suppression des redondances, arbitrages efficaces, budget maîtrisé." },
      { title: "Accompagnement", description: "Aide cahier des charges, consultation, choix et pilotage de mise en œuvre." },
    ],
    method: {
      title: "Notre méthodologie d’audit",
      description: "De l’analyse à l’action, un processus rigoureux pour renforcer votre sûreté.",
      steps: [
        { icon: "MessageCircle", title: "Phase d’immersion", description: "Entretiens, visites de sites, analyse documentaire (plans, procédures, incidents)." },
        { icon: "FileText", title: "Analyse & identification", description: "Cartographie risques, vulnérabilités, scénarios, priorisation." },
        { icon: "ShieldCheck", title: "Rapport & préconisations", description: "Plan d’action chiffré, quick wins, trajectoire et niveaux de priorité." },
        { icon: "ThumbsUp", title: "Accompagnement", description: "Aide à la mise en œuvre, suivi, et mesure de l’efficacité." },
      ],
    },
    sectors: [
      { icon: "Building", name: "Sièges sociaux (ETI / grands comptes)" },
      { icon: "Factory", name: "Sites industriels & sensibles" },
      { icon: "Hospital", name: "Établissements de santé" },
      { icon: "School", name: "Campus & sites critiques" },
    ],
    faq: [
      {
        question: "Pourquoi réaliser un audit de sûreté ?",
        answer:
          "Un audit offre un état des lieux objectif : failles, priorités et arbitrages. Il permet d’optimiser le budget, d’améliorer la sécurité réelle et de mieux préparer l’évolution des menaces et obligations.",
      },
      {
        question: "Votre cabinet est-il indépendant ?",
        answer:
          "Oui. Notre pôle conseil est indépendant des fournisseurs de matériel et des autres acteurs, afin de garantir des recommandations objectives.",
      },
    ],
    seo: {
      slugKeyword: "audit de sûreté",
      secondaryKeywords: ["conseil sûreté", "analyse de risques", "plan de sécurité", "cartographie des risques", "optimisation budget sécurité"],
      metaTitle: "Audit & conseil en sûreté en Île-de-France | Basic Protection",
      metaDescription:
        "Audit sûreté 360° : cartographie des risques, vulnérabilités, plan d’action chiffré, quick wins et accompagnement. Optimisez votre budget. Intervention 75, 78, 92, 93, 94, 95, 77, 91.",
      h1: "Audit & Conseil en Sûreté en Île-de-France",
    },
    page: {
        lead:
          "Avant d’ajouter des agents, des caméras ou une alarme, il faut savoir où sont les vrais risques — et comment les réduire sans surcoûts. Notre audit & conseil sûreté transforme une sécurité “ressentie” en sécurité pilotée : analyse des vulnérabilités, scénarios, recommandations concrètes, priorisation, et plan d’action. Objectif : plus de protection, plus de maîtrise… et moins de dépenses inutiles.",
        sections: [
          {
            id: "intro-audit",
            title: "Audit sûreté : voir clair, décider juste, sécuriser mieux",
            paragraphs: [
              "Beaucoup de dispositifs sont construits “au feeling” : on ajoute un agent, on pose une caméra, on change une serrure… sans toujours traiter les causes réelles. Résultat : on dépense, mais on ne maîtrise pas. Un audit sûreté permet de cartographier précisément les risques, les points faibles et les priorités.",
              "Notre approche est pragmatique : on observe, on teste, on challenge les habitudes. Accès, périmètre, angles morts, procédures, flux, horaires sensibles, prestataires, comportements à risque… On identifie ce qui crée réellement des opportunités d’incident (intrusion, vol, vandalisme, agressivité, sabotage, fraude interne).",
              "Ensuite, on transforme cette analyse en plan d’action : mesures rapides, mesures structurantes, budget estimatif, et recommandations “terrain” (pas de théorie)."
            ],
            note:
              "Point clé : l’audit ne sert pas à faire un rapport. Il sert à prendre des décisions et à améliorer le dispositif — vite.",
            internalLinks: [
              { label: "Agent APS (mettre en œuvre sur site)", href: "/services/agent-securite-qualifie" },
              { label: "Rondier intervenant (multi-sites & alarmes)", href: "/services/agent-rondier" }
            ]
          },
      
          {
            id: "pourquoi",
            title: "Pourquoi faire un audit avant de renforcer la sécurité ?",
            paragraphs: [
              "Parce que les coûts viennent souvent des mauvais choix : trop d’heures au mauvais endroit, trop de matériel mal utilisé, ou des procédures incohérentes. Un audit permet de dimensionner juste : ni sous-couvrir, ni surpayer.",
              "C’est aussi un outil de management : il clarifie qui fait quoi, comment on remonte l’information, comment on réagit en cas d’incident, et comment on améliore dans le temps.",
              "Enfin, l’audit donne une base solide si vous lancez un appel d’offres, changez de prestataire, ouvrez un nouveau site, ou préparez un événement important."
            ],
            bullets: [
              "Réduire les incidents (intrusions, vols, vandalisme, agressivité)",
              "Optimiser le budget (arrêter de “payer à l’aveugle”)",
              "Clarifier les procédures et la chaîne d’alerte",
              "Dimensionner les effectifs et les moyens techniques",
              "Préparer un appel d’offres / changement de prestataire",
              "Sécuriser une ouverture, un chantier ou un événement"
            ]
          },
      
          {
            id: "perimetre",
            title: "Ce que nous analysons : accès, flux, vulnérabilités, organisation",
            paragraphs: [
              "Un audit sérieux ne se limite pas à “regarder les caméras”. On analyse le système complet : humain + technique + organisation. La plupart des failles se situent aux interfaces : livraisons, prestataires, zones techniques, badges, portes secondaires, parkings, horaires creux.",
              "On étudie aussi la réalité terrain : habitudes du personnel, relâchements, zones non surveillées, procédures non appliquées, consignes trop complexes. La sécurité doit être simple pour être respectée."
            ],
            bullets: [
              "Accès : entrées/sorties, badges, visiteurs, prestataires, livraisons",
              "Périmètre : clôtures, portails, angles morts, parkings, zones stock",
              "Bâtiment : issues, locaux techniques, zones sensibles, data/stocks",
              "Flux : pics d’affluence, horaires creux, rotation prestataires",
              "Organisation : consignes, chaîne d’alerte, escalade, traçabilité",
              "Historique : incidents, quasi-incidents, répétitions, points faibles"
            ],
            note:
              "On cherche les “opportunités” : là où un incident peut se produire facilement, sans être vu, et sans réponse rapide."
          },
      
          {
            id: "methodologie",
            title: "Méthodologie : observation, tests, scénarios, recommandations",
            paragraphs: [
              "Nous procédons en étapes. D’abord : recueil d’informations (site, plans, contraintes, historique). Ensuite : visite et observation (accès, flux, points vitaux). Puis : tests simples et réalistes (parcours, angles morts, procédures).",
              "On travaille ensuite par scénarios : intrusion, vol, agression, attroupement, sabotage, conflit, incident technique. Pour chaque scénario : probabilité, impact, détection, réaction, et amélioration.",
              "Enfin, on livre des recommandations hiérarchisées : quick wins (immédiat), actions structurelles (moyen terme), et options (selon budget)."
            ],
            bullets: [
              "Brief initial + collecte (plans, contraintes, historique)",
              "Visite terrain + cartographie des points vitaux",
              "Tests / vérifications : accès, angles morts, procédures",
              "Analyse par scénarios : probabilité × impact",
              "Recommandations : quick wins + plan d’action",
              "Option : accompagnement mise en œuvre et contrôle"
            ],
            note:
              "Notre logique : du concret, du priorisé, du faisable — pas du blabla."
          },
      
          {
            id: "livrables",
            title: "Livrables : un plan d’action clair (et exploitable)",
            paragraphs: [
              "Vous repartez avec un document exploitable, pas un rapport pour “classement”. L’idée est que vous puissiez : décider, budgéter, lancer une mise en œuvre, et mesurer l’amélioration.",
              "Selon le besoin, on peut intégrer un schéma d’organisation, des recommandations d’effectifs, des ajustements de postes, et des conseils techniques (vidéo, alarme, contrôle d’accès) sans sur-spécifier une marque."
            ],
            bullets: [
              "Cartographie des risques et vulnérabilités (points vitaux)",
              "Liste des failles prioritaires (avec justification)",
              "Plan d’action : immédiat / 30 jours / 90 jours",
              "Recommandations humaines : postes, horaires, supervision",
              "Recommandations techniques : vidéo, alarme, contrôle d’accès (si pertinent)",
              "Indicateurs de pilotage : incidents, répétitions, zones, horaires"
            ],
            note:
              "Objectif : rendre la sûreté “pilotable” (priorités + actions + mesure)."
          },
      
          {
            id: "mise-en-oeuvre",
            title: "Après l’audit : mise en œuvre, ajustements et amélioration continue",
            paragraphs: [
              "Un audit utile se prolonge par l’action. Si vous le souhaitez, nous pouvons vous accompagner : mise en œuvre des consignes, ajustement des postes, formation/briefing, contrôle qualité, et mise en place de reporting.",
              "On fonctionne comme un cycle : on met en place → on observe → on corrige. C’est ce qui transforme la sécurité en dispositif durable."
            ],
            bullets: [
              "Mise en place des consignes et procédures",
              "Ajustement des horaires / zones / effectifs",
              "Supervision et contrôle qualité",
              "Reporting et indicateurs (pilotage)",
              "Points réguliers et corrections"
            ],
            internalLinks: [
              { label: "Agent APS (poste fixe)", href: "/services/agent-securite-qualifie" },
              { label: "Rondier intervenant (multi-sites)", href: "/services/agent-rondier" },
              { label: "Sécurité événementielle", href: "/services/securite-evenementielle" }
            ]
          },
      
          {
            id: "idf-local",
            title: "Audit sûreté à Paris & Île-de-France : multi-accès, densité, contraintes",
            paragraphs: [
              "À Paris et en Île-de-France, les vulnérabilités sont souvent liées à la densité : accès multiples, flux importants, prestataires nombreux, parkings, livraisons, et contraintes d’exploitation. L’audit doit intégrer la réalité terrain : pas de théorie.",
              "Nous intervenons sur l’ensemble de l’Île-de-France (75, 78, 92, 93, 94, 95, 77, 91) avec une méthodologie structurée et des recommandations directement applicables."
            ],
            internalLinks: [
              { label: "Zones d’intervention", href: "/zones" },
              { label: "Pages sécurité par ville", href: "/villes" }
            ],
            note:
              "Conseil SEO : sur tes pages villes, ajoute un bloc “audit sûreté” + lien vers cette page pour capter les recherches “audit sécurité + ville”."
          },
      
          {
            id: "cta",
            title: "Demandons-nous où est le risque — puis sécurisons efficacement",
            paragraphs: [
              "Tu veux sécuriser sans surpayer ? On démarre par un cadrage : site, contraintes, incidents, objectifs. Ensuite, on réalise l’audit et on te remet un plan d’action clair.",
              "Si tu veux, on peut aussi t’accompagner pour mettre en œuvre : consignes, postes, supervision et reporting."
            ],
            note:
              "Sur ta page, ajoute un CTA clair : “Demander un audit” + “Être rappelé” + “Recevoir un plan d’action”."
          }
        ],
      
        faqLong: [
          {
            question: "Combien de temps dure un audit sûreté ?",
            answer:
              "Selon la taille du site et la complexité, cela peut aller d’une visite courte (diagnostic) à un audit plus complet (analyse + livrables + recommandations). Après cadrage, on te donne un format adapté."
          },
          {
            question: "Est-ce que l’audit inclut la vidéo et l’alarme ?",
            answer:
              "Oui si c’est pertinent. On évalue la cohérence des moyens techniques (caméras, alarme, contrôle d’accès) avec le terrain et les procédures. Le but est d’éviter les équipements “inutilisés” ou mal exploités."
          },
          {
            question: "L’audit sert-il si j’ai déjà des agents sur site ?",
            answer:
              "Oui, souvent. On identifie si les agents sont au bon endroit, avec les bonnes consignes, la bonne supervision et la bonne traçabilité. Beaucoup d’optimisations viennent de l’organisation, pas du volume d’heures."
          },
          {
            question: "Pouvez-vous accompagner la mise en œuvre ?",
            answer:
              "Oui : consignes, procédures, ajustements de postes, supervision, reporting et points réguliers. L’objectif est de rendre la sûreté durable et pilotée."
          },
          {
            question: "Peut-on faire un audit pour plusieurs sites ?",
            answer:
              "Oui. On peut auditer un site pilote, puis déployer une méthode multi-sites (standards, procédures, rondes, reporting)."
          }
        ],
      
        relatedServices: ["agent-securite-qualifie", "agent-rondier", "securite-evenementielle", "agent-cynophile"]
      }
  },
];