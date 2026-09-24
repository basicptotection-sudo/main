export type ExpertisePresentation = {
  title: string; accent: string; eyebrow: string; image: string; lead: string;
  introTitle: string; introAccent: string; intro: string;
  commitment: string; commitmentAccent: string; commitmentText: string;
  missions: { title: string; text: string }[];
};
export const expertisePresentations: Record<string, ExpertisePresentation> = {
  'agent-securite-qualifie': { title: 'Agent de sécurité', accent: 'qualifié.', eyebrow: 'Gardiennage & surveillance · APS', image: '/images/securite-privee-gardiennage.webp', lead: 'Une présence attentive. Votre quotidien en confiance.', introTitle: 'La vigilance au quotidien.', introAccent: 'La sérénité en plus.', intro: 'Un agent qui connaît vos lieux, vos usages et vos priorités.', commitment: 'La bonne personne.', commitmentAccent: 'Le bon encadrement.', commitmentText: 'Des profils sélectionnés, des consignes précises et un management de proximité.', missions: [] },
  'agent-cynophile': {
    title: 'Sécurité', accent: 'cynophile.', eyebrow: 'Le binôme maître-chien · Détection & dissuasion', image: '/images/agent-cynophile.webp', lead: 'Deux vigilances. Une même mission.',
    introTitle: 'Une présence dissuasive.', introAccent: 'Une vigilance renforcée.', intro: 'Un binôme complémentaire pour veiller sur vos périmètres et vos points sensibles.',
    commitment: 'La force du binôme.', commitmentAccent: 'La maîtrise du terrain.', commitmentText: 'La mission se prépare autour de votre environnement : configuration des lieux, circulation des personnes et zones à surveiller. Le binôme agit selon des consignes définies avec vous.',
    missions: [
      { title: 'Dissuader les intrusions', text: 'Une présence identifiable aux abords de vos bâtiments, chantiers et zones de stockage.' },
      { title: 'Détecter les anomalies', text: 'Associer l’observation de l’agent aux capacités sensorielles du chien pour repérer les présences inhabituelles.' },
      { title: 'Parcourir le périmètre', text: 'Des rondes adaptées aux accès, aux clôtures et aux points sensibles de votre site.' },
      { title: 'Alerter & rendre compte', text: 'Appliquer le protocole prévu, transmettre les observations et documenter les événements.' },
    ],
  },
  'agent-incendie-ssiap': {
    title: 'Sécurité incendie', accent: 'SSIAP.', eyebrow: 'Prévention incendie · Assistance aux personnes', image: '/images/securite-incendie.webp', lead: 'Anticiper les risques. Veiller sur les personnes.',
    introTitle: 'La prévention en continu.', introAccent: 'La méthode dans l’urgence.', intro: 'Une équipe attentive aux installations, aux circulations et aux personnes présentes dans votre établissement.',
    commitment: 'Des compétences dédiées.', commitmentAccent: 'Des procédures partagées.', commitmentText: 'La préparation porte sur la connaissance du site, les équipements de sécurité et la coordination des intervenants. Le dispositif est défini selon les exigences de votre établissement.',
    missions: [
      { title: 'Prévenir les risques', text: 'Rondes techniques, observation des anomalies et surveillance des dégagements et issues.' },
      { title: 'Surveiller les alarmes', text: 'Prise en compte des signalements et application des procédures de vérification prévues sur site.' },
      { title: 'Assister les personnes', text: 'Accompagner les mesures de mise en sécurité et l’évacuation selon les consignes de l’établissement.' },
      { title: 'Coordonner & tracer', text: 'Accueillir les secours, transmettre les informations utiles et consigner les événements.' },
    ],
  },
  'agent-rondier': {
    title: 'Rondes &', accent: 'interventions.', eyebrow: 'Sécurité mobile · Surveillance & levée de doute', image: '/images/agent-rondier.webp', lead: 'Vos locaux au repos. Notre vigilance en mouvement.',
    introTitle: 'Une présence mobile.', introAccent: 'Des contrôles ciblés.', intro: 'Une surveillance organisée autour des moments où vos locaux ont besoin d’attention.',
    commitment: 'Chaque passage compte.', commitmentAccent: 'Chaque constat aussi.', commitmentText: 'Itinéraires, points de contrôle, accès et contacts : le dispositif est préparé avant la première ronde. Les passages et les événements font l’objet d’un suivi documenté.',
    missions: [
      { title: 'Contrôler les lieux', text: 'Vérifier les accès, les fermetures et les points sensibles selon un parcours défini.' },
      { title: 'Varier les passages', text: 'Organiser des rondes fixes ou variables selon les besoins et les contraintes de votre site.' },
      { title: 'Lever le doute', text: 'Vérifier la nature d’une alarme et prendre les mesures prévues dans le protocole d’intervention.' },
      { title: 'Transmettre les constats', text: 'Horodater les contrôles et rendre compte des anomalies, actions et suites à donner.' },
    ],
  },
  'securite-evenementielle': {
    title: 'Sécurité', accent: 'événementielle.', eyebrow: 'Événements privés & professionnels · Accueil & maîtrise', image: '/images/service-securite-evenementielle.webp', lead: 'L’attention à vos invités. La maîtrise en coulisses.',
    introTitle: 'Préserver l’expérience.', introAccent: 'Protéger chaque instant.', intro: 'Une sécurité discrète, intégrée au rythme et à l’identité de votre événement.',
    commitment: 'L’élégance de l’accueil.', commitmentAccent: 'La rigueur du dispositif.', commitmentText: 'Nous préparons les accès, les circulations et les zones sensibles avec votre organisation. Les équipes partagent les consignes et restent coordonnées au fil de l’événement.',
    missions: [
      { title: 'Accueillir & orienter', text: 'Accompagner l’arrivée des invités avec une posture professionnelle et des indications claires.' },
      { title: 'Maîtriser les accès', text: 'Vérifier les invitations et accréditations, gérer les accès aux espaces réservés.' },
      { title: 'Fluidifier les flux', text: 'Veiller aux files, aux circulations et aux points de rencontre pour faciliter les déplacements.' },
      { title: 'Prévenir & coordonner', text: 'Repérer les tensions, appliquer les consignes et communiquer avec l’équipe organisatrice.' },
    ],
  },
  'audit-conseil-surete': {
    title: 'Audit & conseil', accent: 'en sûreté.', eyebrow: 'Analyse des risques · Stratégie & accompagnement', image: '/images/service-audit-conseil.webp', lead: 'Comprendre vos risques. Éclairer vos décisions.',
    introTitle: 'Une vision claire.', introAccent: 'Des décisions éclairées.', intro: 'Une lecture de votre sécurité qui relie les personnes, les équipements et l’organisation.',
    commitment: 'Observer avec recul.', commitmentAccent: 'Recommander avec précision.', commitmentText: 'L’étude part de vos usages, de vos contraintes et des dispositifs existants. Les constats sont traduits en priorités pour construire un plan d’action adapté à votre activité.',
    missions: [
      { title: 'Comprendre le contexte', text: 'Échanger avec vos équipes, visiter les lieux et analyser les documents utiles à la mission.' },
      { title: 'Identifier les vulnérabilités', text: 'Examiner les accès, les procédures et les moyens pour mettre en évidence les points sensibles.' },
      { title: 'Hiérarchiser les actions', text: 'Organiser les recommandations par priorité, faisabilité et moyens à mobiliser.' },
      { title: 'Accompagner les choix', text: 'Vous aider à préciser le cahier des charges et à suivre la mise en œuvre des mesures retenues.' },
    ],
  },
};
