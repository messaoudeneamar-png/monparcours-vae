export type StructItem = {
  t: string;
  d: string;
  ex: string;
  r: string;
};

export const STRUCTS: StructItem[] = [
  {
    t: "MECS",
    d: "Maison d'Enfants à Caractère Social. Héberge des mineurs en danger ou sans famille. Vie en collectivité avec éducateurs 24h/24. Financée par l'ASE.",
    ex: "Vous y travaillez en internat — les jeunes vivent avec l'équipe éducative. Accompagnement global, quotidien, éducatif.",
    r: "Protection de l'enfance",
  },
  {
    t: "DITEP",
    d: "Dispositif Intégré Thérapeutique, Éducatif et Pédagogique. Pour jeunes avec troubles du comportement. Peut fonctionner en internat, semi-internat ou ambulatoire selon les besoins.",
    ex: "Le fonctionnement en 'dispositif' signifie qu'un jeune peut passer d'un mode à l'autre. C'est une innovation importante.",
    r: "Handicap",
  },
  {
    t: "IME",
    d: "Institut Médico-Éducatif. Pour enfants et adolescents avec déficience intellectuelle. Accompagnement éducatif, pédagogique et thérapeutique.",
    ex: "Équipe pluridisciplinaire : éducateurs, enseignants spécialisés, psychologues, orthophonistes, kinésithérapeutes.",
    r: "Loi 2005-102",
  },
  {
    t: "ESAT",
    d: "Établissement et Service d'Aide par le Travail. Emploi protégé pour adultes handicapés. L'éducateur accompagne l'insertion professionnelle.",
    ex: "Les travailleurs ESAT ont un statut spécifique — ni salarié ordinaire ni bénéficiaire classique. Mission éducative ET professionnelle.",
    r: "Handicap adulte",
  },
  {
    t: "SAVS / SAMSAH",
    d: "Service d'Accompagnement à la Vie Sociale / Médico-Social. Pour adultes handicapés vivant à domicile. L'éducateur se déplace chez eux.",
    ex: "Accompagnement dans les actes de la vie quotidienne, la gestion du domicile, les démarches administratives, l'insertion sociale.",
    r: "Handicap",
  },
  {
    t: "CHRS",
    d: "Centre d'Hébergement et de Réinsertion Sociale. Pour personnes en grande précarité. Objectif : retour au logement autonome.",
    ex: "Public diversifié : sans-abri, sortants de prison, personnes fuyant des violences conjugales. Mission d'insertion sociale et professionnelle.",
    r: "Inclusion sociale",
  },
  {
    t: "ASE",
    d: "Aide Sociale à l'Enfance. Service du département qui protège les mineurs. Place les jeunes, finance les établissements, suit les familles.",
    ex: "L'ASE est votre partenaire principal en protection de l'enfance. Les PPE sont co-construits avec le référent ASE.",
    r: "Loi 2007-293",
  },
  {
    t: "PJJ",
    d: "Protection Judiciaire de la Jeunesse. Mineurs délinquants ou en danger grave. Travaille en lien direct avec les juges des enfants.",
    ex: "Les mesures PJJ sont décidées par le juge — l'éducateur PJJ les met en œuvre. Accompagnement judiciaire ET éducatif.",
    r: "Justice",
  },
  {
    t: "MDPH",
    d: "Maison Départementale des Personnes Handicapées. Évalue les besoins et délivre les notifications d'orientation vers les établissements adaptés.",
    ex: "C'est la MDPH qui décide qu'un jeune peut aller en IME — sans notification MDPH, pas d'orientation possible.",
    r: "Loi 2005-102",
  },
  {
    t: "Mission Locale",
    d: "Structure d'accompagnement pour les jeunes de 16-25 ans en difficulté d'insertion professionnelle et sociale.",
    ex: "Partenaire indispensable quand un jeune de votre MECS approche de la majorité. À contacter dès 16-17 ans.",
    r: "Insertion",
  },
];
