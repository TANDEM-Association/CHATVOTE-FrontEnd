import { type Question } from "./topic-question-card";

export type Topic = keyof typeof TOPIC_TITLES;

export const TOPIC_TITLES = {
  economy_finance: {
    title: "Économie et finances",
    normal: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    hover: "hover:bg-blue-500/40 hover:text-blue-600 hover:border-blue-500/40",
    active:
      "bg-blue-500 text-white border-blue-700 hover:bg-blue-500/80 hover:text-white hover:border-blue-700",
  },
  social_labor: {
    title: "Social et emploi",
    normal: "bg-green-500/20 text-green-500 border-green-500/30",
    hover:
      "hover:bg-green-500/40 hover:text-green-600 hover:border-green-500/40",
    active:
      "bg-green-500 text-white border-green-700 hover:bg-green-500/80 hover:text-white hover:border-green-700",
  },
  education_research: {
    title: "Éducation et recherche",
    normal: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
    hover:
      "hover:bg-yellow-500/40 hover:text-yellow-600 hover:border-yellow-500/40",
    active:
      "bg-yellow-500 text-black border-yellow-700 hover:bg-yellow-500/80 hover:text-black hover:border-yellow-700",
  },
  climate_environment: {
    title: "Climat et environnement",
    normal: "bg-green-700/20 text-green-700 border-green-700/30",
    hover:
      "hover:bg-green-700/40 hover:text-green-800 hover:border-green-700/40",
    active:
      "bg-green-700 text-white border-green-900 hover:bg-green-700/80 hover:text-white hover:border-green-900",
  },
  health_care: {
    title: "Santé et soins",
    normal: "bg-red-500/20 text-red-500 border-red-500/30",
    hover: "hover:bg-red-500/40 hover:text-red-600 hover:border-red-500/40",
    active:
      "bg-red-500 text-white border-red-700 hover:bg-red-500/80 hover:text-white hover:border-red-700",
  },
  digitalization_tech: {
    title: "Numérique et technologie",
    normal: "bg-indigo-500/20 text-indigo-500 border-indigo-500/30",
    hover:
      "hover:bg-indigo-500/40 hover:text-indigo-600 hover:border-indigo-500/40",
    active:
      "bg-indigo-500 text-white border-indigo-700 hover:bg-indigo-500/80 hover:text-white hover:border-indigo-700",
  },
  migration_integration: {
    title: "Immigration et intégration",
    normal: "bg-orange-500/20 text-orange-500 border-orange-500/30",
    hover:
      "hover:bg-orange-500/40 hover:text-orange-600 hover:border-orange-500/40",
    active:
      "bg-orange-500 text-black border-orange-700 hover:bg-orange-500/80 hover:text-black hover:border-orange-700",
  },
  security_justice: {
    title: "Sécurité et justice",
    normal:
      "bg-gray-700/20 text-gray-700 border-gray-700/30 dark:bg-gray-300/20 dark:text-gray-300 dark:border-gray-300/30",
    hover:
      "hover:bg-gray-700/40 hover:text-gray-800 hover:border-gray-700/40 dark:hover:bg-gray-300/30 dark:hover:text-gray-400 dark:hover:border-gray-300/40",
    active:
      "bg-gray-700 text-white border-gray-900 dark:bg-gray-300 dark:text-black dark:border-gray-500 hover:bg-gray-700/80 hover:text-white hover:border-gray-900 dark:hover:bg-gray-300/80 dark:hover:text-black dark:hover:border-gray-500",
  },
  foreign_policy_europe: {
    title: "Politique étrangère et Europe",
    normal: "bg-purple-500/20 text-purple-500 border-purple-500/30",
    hover:
      "hover:bg-purple-500/40 hover:text-purple-600 hover:border-purple-500/40",
    active:
      "bg-purple-500 text-white border-purple-700 hover:bg-purple-500/80 hover:text-white hover:border-purple-700",
  },
  transport_infrastructure: {
    title: "Transports et infrastructures",
    normal: "bg-blue-700/20 text-blue-700 border-blue-700/30",
    hover: "hover:bg-blue-700/40 hover:text-blue-800 hover:border-blue-700/40",
    active:
      "bg-blue-700 text-white border-blue-900 hover:bg-blue-700/80 hover:text-white hover:border-blue-900",
  },
  housing_rent: {
    title: "Logement et loyers",
    normal: "bg-teal-500/20 text-teal-500 border-teal-500/30",
    hover: "hover:bg-teal-500/40 hover:text-teal-600 hover:border-teal-500/40",
    active:
      "bg-teal-500 text-white border-teal-700 hover:bg-teal-500/80 hover:text-white hover:border-teal-700",
  },
};

export const topics: Question[] = [
  // Économie et finances
  {
    id: "q1",
    question:
      "Comment les partis veulent-ils stimuler la croissance économique ?",
    title: "Économie et finances",
    topic: "economy_finance",
  },
  {
    id: "q2",
    question: "Quelles mesures sont prévues pour réduire la dette publique ?",
    title: "Économie et finances",
    topic: "economy_finance",
  },
  {
    id: "q3",
    question:
      "Comment mieux soutenir les petites entreprises et les start-ups ?",
    title: "Économie et finances",
    topic: "economy_finance",
  },
  {
    id: "q4",
    question: "Quel rôle l'État doit-il jouer dans la régulation économique ?",
    title: "Économie et finances",
    topic: "economy_finance",
  },
  {
    id: "q5",
    question: "Comment réduire les inégalités économiques ?",
    title: "Économie et finances",
    topic: "economy_finance",
  },

  // Social et emploi
  {
    id: "q6",
    question:
      "Comment les partis veulent-ils améliorer les conditions de travail ?",
    title: "Social et emploi",
    topic: "social_labor",
  },
  {
    id: "q7",
    question: "Quelles réformes sont prévues pour le système de retraites ?",
    title: "Social et emploi",
    topic: "social_labor",
  },
  {
    id: "q8",
    question: "Comment réduire les inégalités sociales ?",
    title: "Social et emploi",
    topic: "social_labor",
  },
  {
    id: "q9",
    question: "Quelles mesures pour soutenir les chômeurs ?",
    title: "Social et emploi",
    topic: "social_labor",
  },
  {
    id: "q10",
    question: "Comment améliorer les systèmes de protection sociale ?",
    title: "Social et emploi",
    topic: "social_labor",
  },

  // Éducation et recherche
  {
    id: "q11",
    question: "Comment les partis veulent-ils améliorer le système éducatif ?",
    title: "Éducation et recherche",
    topic: "education_research",
  },
  {
    id: "q12",
    question: "Quelles mesures pour une meilleure éducation numérique ?",
    title: "Éducation et recherche",
    topic: "education_research",
  },
  {
    id: "q13",
    question: "Comment rendre les universités plus accessibles à tous ?",
    title: "Éducation et recherche",
    topic: "education_research",
  },
  {
    id: "q14",
    question: "Comment promouvoir la recherche et l'innovation ?",
    title: "Éducation et recherche",
    topic: "education_research",
  },
  {
    id: "q15",
    question:
      "Quel rôle pour la formation continue dans la politique éducative ?",
    title: "Éducation et recherche",
    topic: "education_research",
  },

  // Climat et environnement
  {
    id: "q16",
    question: "Quelles mesures pour atteindre les objectifs climatiques ?",
    title: "Climat et environnement",
    topic: "climate_environment",
  },
  {
    id: "q17",
    question: "Comment accélérer le développement des énergies renouvelables ?",
    title: "Climat et environnement",
    topic: "climate_environment",
  },
  {
    id: "q18",
    question: "Comment rendre les transports en commun plus écologiques ?",
    title: "Climat et environnement",
    topic: "climate_environment",
  },
  {
    id: "q19",
    question: "Quelles mesures politiques pour une agriculture durable ?",
    title: "Climat et environnement",
    topic: "climate_environment",
  },
  {
    id: "q20",
    question:
      "Comment inciter les entreprises à réduire leurs émissions de CO2 ?",
    title: "Climat et environnement",
    topic: "climate_environment",
  },

  // Santé et soins
  {
    id: "q21",
    question: "Comment rendre le système de santé plus efficace ?",
    title: "Santé et soins",
    topic: "health_care",
  },
  {
    id: "q22",
    question: "Quelles solutions face à la pénurie de personnel soignant ?",
    title: "Santé et soins",
    topic: "health_care",
  },
  {
    id: "q23",
    question: "Comment améliorer l'accès aux soins de santé ?",
    title: "Santé et soins",
    topic: "health_care",
  },
  {
    id: "q24",
    question: "Quelles mesures pour améliorer les services hospitaliers ?",
    title: "Santé et soins",
    topic: "health_care",
  },
  {
    id: "q25",
    question: "Comment renforcer la prévention des maladies ?",
    title: "Santé et soins",
    topic: "health_care",
  },

  // Numérique et technologie
  {
    id: "q26",
    question: "Comment accélérer le déploiement du très haut débit ?",
    title: "Numérique et technologie",
    topic: "digitalization_tech",
  },
  {
    id: "q27",
    question: "Quelles mesures pour promouvoir l'intelligence artificielle ?",
    title: "Numérique et technologie",
    topic: "digitalization_tech",
  },
  {
    id: "q28",
    question: "Comment améliorer la numérisation de l'administration ?",
    title: "Numérique et technologie",
    topic: "digitalization_tech",
  },
  {
    id: "q29",
    question: "Quelles propositions pour améliorer la protection des données ?",
    title: "Numérique et technologie",
    topic: "digitalization_tech",
  },
  {
    id: "q30",
    question: "Comment mieux soutenir le secteur technologique en France ?",
    title: "Numérique et technologie",
    topic: "digitalization_tech",
  },

  // Immigration et intégration
  {
    id: "q31",
    question: "Comment les partis veulent-ils réformer la politique d'asile ?",
    title: "Immigration et intégration",
    topic: "migration_integration",
  },
  {
    id: "q32",
    question:
      "Quelles propositions pour une meilleure intégration des migrants ?",
    title: "Immigration et intégration",
    topic: "migration_integration",
  },
  {
    id: "q33",
    question: "Comment améliorer la gestion de l'immigration ?",
    title: "Immigration et intégration",
    topic: "migration_integration",
  },
  {
    id: "q34",
    question: "Quelles mesures pour lutter contre les causes des migrations ?",
    title: "Immigration et intégration",
    topic: "migration_integration",
  },
  {
    id: "q35",
    question: "Comment créer des incitations pour l'immigration légale ?",
    title: "Immigration et intégration",
    topic: "migration_integration",
  },

  // Sécurité et justice
  {
    id: "q36",
    question: "Quels projets de réforme de la police ?",
    title: "Sécurité et justice",
    topic: "security_justice",
  },
  {
    id: "q37",
    question: "Comment rendre la lutte contre la criminalité plus efficace ?",
    title: "Sécurité et justice",
    topic: "security_justice",
  },
  {
    id: "q38",
    question: "Quelles mesures contre l'extrémisme politique ?",
    title: "Sécurité et justice",
    topic: "security_justice",
  },
  {
    id: "q39",
    question:
      "Comment garantir les droits civiques et la protection des données ?",
    title: "Sécurité et justice",
    topic: "security_justice",
  },
  {
    id: "q40",
    question: "Quelles propositions pour moderniser le système judiciaire ?",
    title: "Sécurité et justice",
    topic: "security_justice",
  },

  // Politique étrangère et Europe
  {
    id: "q41",
    question:
      "Comment les partis veulent-ils renforcer la coopération dans l'UE ?",
    title: "Politique étrangère et Europe",
    topic: "foreign_policy_europe",
  },
  {
    id: "q42",
    question: "Quelles positions sur l'avenir de l'OTAN et de la défense ?",
    title: "Politique étrangère et Europe",
    topic: "foreign_policy_europe",
  },
  {
    id: "q43",
    question: "Comment gérer les relations avec la Chine et les États-Unis ?",
    title: "Politique étrangère et Europe",
    topic: "foreign_policy_europe",
  },
  {
    id: "q44",
    question: "Quelles mesures pour une défense européenne renforcée ?",
    title: "Politique étrangère et Europe",
    topic: "foreign_policy_europe",
  },
  {
    id: "q45",
    question: "Comment améliorer la coopération économique internationale ?",
    title: "Politique étrangère et Europe",
    topic: "foreign_policy_europe",
  },

  // Transports et infrastructures
  {
    id: "q46",
    question: "Quelles mesures pour améliorer les transports en commun ?",
    title: "Transports et infrastructures",
    topic: "transport_infrastructure",
  },
  {
    id: "q47",
    question: "Comment accélérer le développement du réseau ferroviaire ?",
    title: "Transports et infrastructures",
    topic: "transport_infrastructure",
  },
  {
    id: "q48",
    question: "Quelles mesures pour promouvoir la mobilité électrique ?",
    title: "Transports et infrastructures",
    topic: "transport_infrastructure",
  },
  {
    id: "q49",
    question: "Comment rendre les transports plus respectueux du climat ?",
    title: "Transports et infrastructures",
    topic: "transport_infrastructure",
  },
  {
    id: "q50",
    question: "Quels concepts pour un développement urbain durable ?",
    title: "Transports et infrastructures",
    topic: "transport_infrastructure",
  },

  // Logement et loyers
  {
    id: "q51",
    question: "Quelles mesures contre la hausse des loyers ?",
    title: "Logement et loyers",
    topic: "housing_rent",
  },
  {
    id: "q52",
    question: "Comment les partis veulent-ils promouvoir le logement social ?",
    title: "Logement et loyers",
    topic: "housing_rent",
  },
  {
    id: "q53",
    question: "Quels concepts pour réguler le marché immobilier ?",
    title: "Logement et loyers",
    topic: "housing_rent",
  },
  {
    id: "q54",
    question:
      "Comment rendre le logement abordable pour les revenus modestes ?",
    title: "Logement et loyers",
    topic: "housing_rent",
  },
  {
    id: "q55",
    question: "Quelles incitations pour la construction durable ?",
    title: "Logement et loyers",
    topic: "housing_rent",
  },
];
