export type PlanningItem = {
  d: string;
  t: string;
  desc: string;
  col: string;
};

export const PLANNING: PlanningItem[] = [
  {
    d: "Sept. 2026",
    t: "Démarrage VAE",
    desc: "Inscription officielle, entretien de positionnement. Dépôt du Livret 1 (recevabilité).",
    col: "#2D6A4F",
  },
  {
    d: "Oct. — Nov. 2026",
    t: "Livret 1 — Recevabilité",
    desc: "Présentation de votre parcours professionnel, expériences, motivation. Justificatifs : contrats, fiches de paie, attestations.",
    col: "#457B9D",
  },
  {
    d: "Déc. 2026",
    t: "Validation recevabilité",
    desc: "Si votre Livret 1 est accepté, vous pouvez commencer le Livret 2.",
    col: "#2D6A4F",
  },
  {
    d: "Jan. — Avr. 2027",
    t: "Livret 2 — Les situations",
    desc: "4 situations professionnelles, une par bloc (BC1 à BC4). 3 à 6 pages par situation. Analyse + références + préconisations.",
    col: "#E76F51",
  },
  {
    d: "Mai 2027",
    t: "Dépôt Livret 2",
    desc: "Envoi du Livret 2 complet au jury. Dernier délai pour être prêt.",
    col: "#C9A84C",
  },
  {
    d: "Juin — Sept. 2027",
    t: "Préparation oral",
    desc: "Entraînement aux questions du jury. Maîtriser les blocs, les auteurs, les lois. Simulez des oraux.",
    col: "#457B9D",
  },
  {
    d: "Oct. 2027",
    t: "Épreuve conclusive BC1",
    desc: "Dossier 25-30 pages + soutenance 40 min. Devant 1 formateur + 1 professionnel DEES.",
    col: "#E76F51",
  },
  {
    d: "Nov. 2027",
    t: "Résultats",
    desc: "Validation totale (DEES obtenu) ou partielle. En cas de partielle, vous avez 5 ans pour compléter.",
    col: "#2D6A4F",
  },
];
