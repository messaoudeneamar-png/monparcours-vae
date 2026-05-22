"use client";
import { useState } from "react";
import { BLOCS } from "@/lib/data";

type BlocKey = "bc1" | "bc2" | "bc3" | "bc4";
type Tab = BlocKey | "eval" | "jury";

const TABS: { key: Tab; label: string; color: string }[] = [
  { key: "bc1", label: "BC1", color: "#2D6A4F" },
  { key: "bc2", label: "BC2", color: "#E76F51" },
  { key: "bc3", label: "BC3", color: "#457B9D" },
  { key: "bc4", label: "BC4", color: "#C9A84C" },
  { key: "eval", label: "Évaluation", color: "#6B7280" },
  { key: "jury", label: "Jury", color: "#6B7280" },
];

// ── Données pédagogiques ───────────────────────────────────────────────────

type Auteur = { nom: string; concept: string; phrase: string; terrain: string };
type Loi = { date: string; nom: string; quoi: string };
type Exemple = { contexte: string; action: string; analyse: string; lien: string; convaincu: string };

const BLOC_PEDAGOGY: Record<BlocKey, {
  jury: string[];
  auteurs: Auteur[];
  lois: Loi[];
  exemples: Exemple[];
}> = {
  bc1: {
    jury: [
      "Analyser la situation, pas la raconter — le jury veut votre lecture professionnelle, pas un récit chronologique",
      "Citer des auteurs naturellement, en lien direct avec la situation, pas de manière récitée hors contexte",
      "Montrer comment vous avez adapté votre posture éducative en cours d'action",
      "Nommer ce que vous auriez fait différemment et pourquoi — la réflexivité compte autant que l'action",
      "Relier chaque intervention à un besoin identifié de la personne et à un objectif du PPE",
    ],
    auteurs: [
      {
        nom: "Donald Winnicott",
        concept: "Holding / contenance",
        phrase: "Tenir l'enfant (au sens symbolique) pour lui permettre de se construire.",
        terrain: "Gérer une crise en MECS en restant calme et prévisible face aux comportements violents.",
      },
      {
        nom: "Anton Makarenko",
        concept: "Pédagogie collective / responsabilité",
        phrase: "Le groupe éduque autant que l'éducateur — la vie collective est formatrice.",
        terrain: "S'appuyer sur la dynamique de groupe en foyer pour responsabiliser les jeunes.",
      },
      {
        nom: "Lev Vygotski",
        concept: "Zone proximale de développement (ZPD)",
        phrase: "Travailler juste au-delà de ce que la personne sait faire seule, avec un étayage progressif.",
        terrain: "Adapter les objectifs du PPE à ce que le jeune peut atteindre avec accompagnement.",
      },
      {
        nom: "Carl Rogers",
        concept: "Empathie, congruence, regard positif inconditionnel",
        phrase: "Créer une relation d'aide authentique fondée sur l'acceptation inconditionnelle de la personne.",
        terrain: "Maintenir une posture bienveillante face à un usager agressif ou en rupture.",
      },
      {
        nom: "Célestin Freinet",
        concept: "Pédagogie active / expression libre",
        phrase: "L'apprendre par le faire — l'expression de soi est un droit éducatif fondamental.",
        terrain: "Utiliser les ateliers créatifs ou le journal de bord comme outils éducatifs en DITEP.",
      },
    ],
    lois: [
      {
        date: "2002",
        nom: "Loi 2002-2 — Rénovation de l'action sociale",
        quoi: "Crée 7 droits des usagers (PPE, CVS, charte, livret d'accueil…). Le PPE devient obligatoire — il structure votre accompagnement éducatif.",
      },
      {
        date: "2007",
        nom: "Loi 2007-293 — Protection de l'enfance",
        quoi: "Crée la CRIP, renforce l'obligation de signalement. L'éducateur devient acteur clé du repérage et de la transmission des IP.",
      },
      {
        date: "2016",
        nom: "Loi 2016-297 — Révision du PPE",
        quoi: "Rend la révision annuelle du PPE obligatoire avec participation de l'enfant. Renforce la co-construction du projet éducatif.",
      },
      {
        date: "CASF",
        nom: "Article L226-3 — Signalement",
        quoi: "Encadre l'obligation de transmission d'IP à la CRIP. Tout professionnel ayant connaissance d'un enfant en danger est concerné.",
      },
      {
        date: "1989",
        nom: "Convention ONU — Droits de l'enfant",
        quoi: "Principe d'intérêt supérieur de l'enfant, droit à l'expression et à la participation. Fonde l'approche droits-basée de l'accompagnement.",
      },
    ],
    exemples: [
      {
        contexte: "Adolescent de 15 ans en MECS présentant des comportements violents récurrents envers ses pairs et les adultes.",
        action: "Mise en place d'un espace de parole hebdomadaire individuel, introduction de la médiation artistique (peinture), co-rédaction d'un contrat de comportement avec l'équipe.",
        analyse: "Mobilisation du concept de holding (Winnicott) : la régularité de l'espace de parole crée la contenance nécessaire. La médiation artistique ouvre un canal d'expression non verbale.",
        lien: "C1.1 — Observer, analyser et évaluer la situation de la personne ; C1.3 — Concevoir et conduire le PPE.",
        convaincu: "Citation naturelle de Winnicott avec exemple précis tirée de la pratique, auto-analyse des ajustements de posture face aux comportements violents.",
      },
      {
        contexte: "Fratrie de 3 enfants séparés suite à une mesure de placement en urgence, maintien des liens fraternels compromis.",
        action: "Organisation de visites médiatisées hebdomadaires, rédaction d'un PPE spécifique pour chaque enfant intégrant la dimension fraternelle, coordination avec les familles d'accueil respectives.",
        analyse: "Référence à Bowlby (théorie de l'attachement) : le maintien des liens fraternels est un facteur protecteur. Articulation avec la loi 2007-293 sur la protection de l'enfance.",
        lien: "C1.3 — Concevoir et conduire le PPE ; C1.4 — Mobiliser les ressources de l'environnement familial.",
        convaincu: "Capacité à articuler théorie de l'attachement et réalité terrain, connaissance précise de la loi 2007-293 et de ses implications pratiques.",
      },
    ],
  },

  bc2: {
    jury: [
      "Distinguer clairement ce que VOUS vouliez pour la personne et ce qu'ELLE voulait — le jury traque le paternalisme",
      "Montrer comment vous avez rendu le choix possible, même dans une situation contrainte ou risquée",
      "Nommer les dilemmes éthiques rencontrés et expliquer comment vous les avez traités",
      "Prouver que le PPE a été co-construit avec l'usager et non rédigé pour lui",
      "Démontrer votre connaissance des droits des personnes (loi 2002-2, loi 2005-102) dans votre pratique quotidienne",
    ],
    auteurs: [
      {
        nom: "Charles Gardou",
        concept: "Société inclusive / vulnérabilité partagée",
        phrase: "Le handicap n'est pas l'attribut d'une personne — c'est le produit de l'interaction entre une personne et son environnement.",
        terrain: "Adapter l'environnement physique et social d'un ESAT plutôt que de contraindre la personne à s'y conformer.",
      },
      {
        nom: "Michel Foucault",
        concept: "Pouvoir / discipline / institution",
        phrase: "Les institutions produisent des sujets assujettis — l'éducateur doit en être conscient pour ne pas reproduire la domination.",
        terrain: "Analyser comment les règles institutionnelles d'un foyer peuvent entraver l'autodétermination des résidents.",
      },
      {
        nom: "Amartya Sen",
        concept: "Capabilités / pouvoir d'agir",
        phrase: "Ce qui compte, c'est ce que la personne est réellement capable de faire et d'être — pas seulement ce qu'elle possède.",
        terrain: "Évaluer les capacités réelles d'un usager au-delà de son diagnostic pour construire son projet personnalisé.",
      },
      {
        nom: "Alain Touraine",
        concept: "Subjectivation / acteur social",
        phrase: "Devenir acteur de sa vie, c'est résister aux logiques sociales qui nous réduisent à un rôle.",
        terrain: "Soutenir un usager dans un CHRS pour qu'il reprenne la parole sur son propre parcours de réinsertion.",
      },
      {
        nom: "François Dubet",
        concept: "Expérience sociale / logiques d'action",
        phrase: "Les individus combinent plusieurs logiques d'action pour donner sens à leur expérience — l'éducateur doit comprendre cette complexité.",
        terrain: "Comprendre pourquoi un jeune adulte suivi par la PJJ refuse l'aide tout en demandant de la présence.",
      },
    ],
    lois: [
      {
        date: "2002",
        nom: "Loi 2002-2 — 7 droits des usagers",
        quoi: "Fonde le droit à l'information, à la participation, au respect de la dignité. Le document individuel de prise en charge (DIPC) formalise les droits de la personne dans sa relation avec la structure.",
      },
      {
        date: "2005",
        nom: "Loi 2005-102 — Handicap",
        quoi: "Principe de compensation du handicap, création des MDPH, obligation d'accessibilité. Fonde le droit à un projet de vie choisi par la personne handicapée.",
      },
      {
        date: "2007",
        nom: "Loi 2007-308 — Tutelles et protection juridique",
        quoi: "Réforme la protection des majeurs (tutelle, curatelle, sauvegarde). L'éducateur doit connaître la procédure pour ne pas agir à la place d'un mandataire judiciaire.",
      },
      {
        date: "2022",
        nom: "Loi 2022-140 — Inclusion du handicap",
        quoi: "Renforce les droits à l'autodétermination des personnes handicapées, notamment en ESSMS. Intègre explicitement le consentement éclairé dans les pratiques.",
      },
      {
        date: "2006",
        nom: "Convention ONU — Droits des personnes handicapées",
        quoi: "Article 19 : droit à vivre dans la société avec les mêmes choix. Fonde l'approche inclusiviste et l'exigence d'autodétermination dans tout projet personnalisé.",
      },
    ],
    exemples: [
      {
        contexte: "Adulte avec TDI (trouble du développement intellectuel) en ESAT exprimant le souhait de quitter sa famille d'accueil pour vivre seul — projet jugé irréaliste par l'équipe.",
        action: "Organisation de trois réunions tripartites (usager/famille/équipe), utilisation d'outils FALC pour faciliter l'expression, expérimentation progressive d'appartement partagé.",
        analyse: "Référence aux capabilités de Sen : ce n'est pas à l'équipe de définir ce qui est possible. Mobilisation du modèle anthropologique de Gardou : l'environnement doit s'adapter, pas seulement la personne.",
        lien: "C2.1 — Favoriser l'expression de la personne ; C2.2 — Soutenir la construction du projet personnalisé.",
        convaincu: "Prise de risque acceptée avec la personne dans le respect de son autodétermination, démarche documentée avec les outils FALC.",
      },
      {
        contexte: "Jeune majeur sorti de l'ASE à 18 ans refusant tout suivi institutionnel malgré une situation précaire (sans logement stable, en rupture familiale).",
        action: "Maintien d'un contact mensuel informel (café), sans enjeu de suivi officiel, jusqu'à ce que le jeune sollicite de l'aide trois mois plus tard.",
        analyse: "Mobilisation du concept de subjectivation de Touraine : respecter le droit au refus tout en restant disponible. Référence à l'expérience sociale de Dubet pour comprendre la logique du jeune.",
        lien: "C2.4 — Soutenir la participation et la citoyenneté ; C2.3 — Gérer les situations de crise.",
        convaincu: "Respect du 'droit au refus' sans abandon, capacité à distinguer urgence ressentie par le professionnel et demande réelle de l'usager.",
      },
    ],
  },

  bc3: {
    jury: [
      "Nommer des partenaires RÉELS (MDPH, CAF, conseil départemental, associations locales) en expliquant leur rôle précis",
      "Montrer que vous avez INITIÉ une démarche partenariale, pas juste participé à une réunion existante",
      "Démontrer votre connaissance du territoire : ses ressources, ses carences, ses enjeux politiques",
      "Expliquer comment vous avez géré un désaccord ou une tension entre partenaires",
      "Intégrer la transition écologique dans votre réflexion territoriale (attendu obligatoire en 2025)",
    ],
    auteurs: [
      {
        nom: "Jacques Donzelot",
        concept: "Ville à trois vitesses / exclusion territoriale",
        phrase: "Les villes se fragmentent : périurbanisation des classes moyennes, relégation des plus pauvres, gentrification des centres.",
        terrain: "Analyser les inégalités d'accès aux services dans un quartier QPV pour justifier une action de proximité.",
      },
      {
        nom: "Robert Castel",
        concept: "Désaffiliation / vulnérabilité sociale",
        phrase: "La désaffiliation n'est pas une chute brutale mais un processus progressif de délitement des liens sociaux et professionnels.",
        terrain: "Comprendre le parcours d'une famille en errance résidentielle comme résultat d'une désaffiliation cumulée.",
      },
      {
        nom: "Jacques Ion",
        concept: "Travail social à l'épreuve / militantisme distancié",
        phrase: "Le travail social contemporain est traversé par des tensions entre logique gestionnaire et engagement militant.",
        terrain: "Analyser les résistances institutionnelles qui freinent la mise en place d'un partenariat innovant.",
      },
      {
        nom: "Philippe Warin",
        concept: "Non-recours aux droits",
        phrase: "Des millions de personnes n'accèdent pas aux droits auxquels elles ont droit — par méconnaissance, honte ou complexité administrative.",
        terrain: "Mettre en place un dispositif d'aller-vers pour réduire le non-recours dans un quartier isolé.",
      },
      {
        nom: "Élisabeth Bourgeois",
        concept: "Développement du pouvoir d'agir collectif",
        phrase: "Le DPA collectif mobilise les compétences des personnes concernées pour transformer leur situation sociale.",
        terrain: "Animer un groupe d'habitants dans le cadre d'un projet de rénovation urbaine pour qu'ils deviennent acteurs du projet.",
      },
    ],
    lois: [
      {
        date: "2002",
        nom: "Loi 2002-2 — Coordination territoriale",
        quoi: "Impose un projet d'établissement incluant les partenariats. La coordination avec les acteurs du territoire devient une obligation institutionnelle.",
      },
      {
        date: "2014",
        nom: "Loi 2014-366 — ALUR (Accès au Logement)",
        quoi: "Crée les Plans Locaux d'Urbanisme intercommunaux, renforce les SIAO. L'éducateur travaillant sur le logement doit connaître ces dispositifs.",
      },
      {
        date: "2016",
        nom: "Loi 2016-41 — Modernisation du système de santé",
        quoi: "Crée les Groupements Hospitaliers de Territoire (GHT) et renforce la coordination médico-sociale. Impose la notion de parcours de santé territorialisé.",
      },
      {
        date: "2005",
        nom: "Loi 2005-32 — Cohésion sociale (Borloo)",
        quoi: "Crée les Maisons de l'Emploi, renforce les CCAS et PLIE. Fonde les dispositifs d'insertion professionnelle territoriaux que l'éducateur mobilise.",
      },
      {
        date: "2022",
        nom: "Loi 3DS — Différenciation territoriale",
        quoi: "Renforce les compétences des collectivités locales en matière sociale. L'éducateur doit connaître le rôle du département et de la commune dans son territoire.",
      },
    ],
    exemples: [
      {
        contexte: "Mise en place d'un CLAS (Contrat Local d'Accompagnement à la Scolarité) dans un quartier QPV suite à l'augmentation du décrochage scolaire identifiée en équipe.",
        action: "Réalisation d'un diagnostic territorial avec les habitants, coordination de 5 partenaires (CAF, mairie, associations, école, CCAS), portage du projet sur 18 mois.",
        analyse: "Référence aux travaux de Donzelot sur les inégalités territoriales et de Warin sur le non-recours : le CLAS réduit la distance entre les familles et le service public.",
        lien: "C3.1 — Identifier et mobiliser les ressources du territoire ; C3.3 — Contribuer à un diagnostic territorial.",
        convaincu: "Capacité à nommer les logiques institutionnelles de chaque partenaire et à expliquer comment les tensions entre eux ont été gérées.",
      },
      {
        contexte: "Famille en situation d'errance résidentielle (6 déménagements en 18 mois) nécessitant une coordination urgente entre SIAO, CCAS, service tutelles et équipe éducative.",
        action: "Organisation d'une réunion multi-partenaires avec accord écrit de la famille, mise en place d'un référent de parcours unique, utilisation du SIAO comme pivot.",
        analyse: "Référence à Castel (désaffiliation cumulative) et à Ion (tensions entre logique gestionnaire et engagement). Analyse des résistances institutionnelles de chaque service.",
        lien: "C3.2 — S'inscrire dans une dynamique partenariale et institutionnelle ; C3.4 — Rendre compte de son action.",
        convaincu: "Analyse des limites du partenariat, des désaccords entre partenaires sur la notion de 'priorité' et de la manière dont ils ont été surmontés.",
      },
    ],
  },

  bc4: {
    jury: [
      "Produire des écrits professionnels qui montrent la distinction entre faits observés et interprétations professionnelles",
      "Démontrer une posture réflexive sur votre institution : vous en êtes partie prenante ET vous en êtes analyste",
      "Expliquer comment vous avez géré un conflit d'équipe ou un désaccord professionnel de manière constructive",
      "Montrer votre connaissance des obligations légales : RGPD, secret partagé, devoir de réserve",
      "Décrire comment vous avez contribué à l'amélioration des pratiques ou au projet d'établissement",
    ],
    auteurs: [
      {
        nom: "Erving Goffman",
        concept: "Stigmate / institution totale",
        phrase: "Le stigmate est une marque sociale qui réduit la personne à son écart à la norme — les institutions peuvent le produire.",
        terrain: "Analyser comment un écrit professionnel (IP, rapport) peut stigmatiser une famille et prendre soin de la formulation.",
      },
      {
        nom: "Émile Durkheim",
        concept: "Fait social / solidarité",
        phrase: "Les faits sociaux ont une réalité propre qui s'impose aux individus — comprendre le contexte social est indispensable.",
        terrain: "Contextualiser une situation de délinquance juvénile dans ses déterminants sociaux plutôt que de n'y voir qu'une défaillance individuelle.",
      },
      {
        nom: "Christophe Dejours",
        concept: "Souffrance au travail / travail réel vs prescrit",
        phrase: "Il y a toujours un écart entre le travail prescrit (les procédures) et le travail réel (ce qu'on fait pour que ça marche).",
        terrain: "Analyser les tensions en équipe comme le produit d'un décalage entre les injonctions institutionnelles et la réalité du terrain.",
      },
      {
        nom: "Philippe Zarifian",
        concept: "Compétence / prise d'initiative",
        phrase: "La compétence, c'est prendre l'initiative face à l'événement — pas appliquer une procédure.",
        terrain: "Justifier une décision prise en urgence hors protocole en montrant qu'elle relevait d'une compétence professionnelle.",
      },
      {
        nom: "Michel Autès",
        concept: "Travail social / lien social",
        phrase: "Le travail social produit du lien social là où il est défait — c'est sa finalité fondamentale.",
        terrain: "Positionner son rôle d'éducateur comme tisserand de liens dans une situation de rupture familiale ou sociale.",
      },
    ],
    lois: [
      {
        date: "2002",
        nom: "Loi 2002-2 — Projet d'établissement",
        quoi: "Rend obligatoire le projet d'établissement et l'évaluation interne/externe. L'éducateur participe à la démarche qualité de sa structure.",
      },
      {
        date: "2018",
        nom: "RGPD — Règlement Général sur la Protection des Données",
        quoi: "Encadre la collecte et l'usage des données personnelles des usagers. L'éducateur doit recueillir le consentement et limiter les données aux besoins réels.",
      },
      {
        date: "2016",
        nom: "Loi 2016-1088 — Travail (Loi El Khomri)",
        quoi: "Introduit le droit à la déconnexion et renforce la négociation collective. L'éducateur peut mobiliser ce cadre pour analyser les conditions de travail en institution.",
      },
      {
        date: "2014",
        nom: "Loi 2014-288 — Formation professionnelle et VAE",
        quoi: "Renforce le droit à la formation continue et à la VAE. Fonde le droit du candidat à faire reconnaître son expérience professionnelle par un diplôme d'État.",
      },
      {
        date: "CASF",
        nom: "Secret professionnel partagé — L226-2-1",
        quoi: "Autorise le partage d'informations entre professionnels concourant à la protection de l'enfance, dans l'intérêt du mineur. Encadre la coordination inter-institutionnelle.",
      },
    ],
    exemples: [
      {
        contexte: "Rédaction d'une Information Préoccupante pour un enfant de 8 ans présentant des signes physiques et comportementaux évocateurs de maltraitance intrafamiliale.",
        action: "Observation factuelle sur 3 semaines, concertation en réunion d'équipe, rédaction de l'IP en distinguant faits observés / hypothèses / éléments de contexte, suivi de la transmission à la CRIP.",
        analyse: "Mobilisation de Goffman (stigmate) : veiller à ne pas stigmatiser la famille dans l'écrit tout en étant précis sur les faits. Référence à l'article L226-3 du CASF pour l'obligation de signalement.",
        lien: "C4.2 — Produire des écrits professionnels adaptés ; C4.1 — Inscrire son action dans le cadre réglementaire.",
        convaincu: "Maîtrise du cadre juridique (L226-3 CASF), posture éthique dans l'écrit (distinction faits/interprétations), analyse du positionnement institutionnel.",
      },
      {
        contexte: "Conflit ouvert en équipe autour de la prise en charge d'un usager 'difficile' — deux courants s'opposent sur l'attitude à adopter, créant une rupture dans la cohérence éducative.",
        action: "Demande d'un temps d'analyse de pratiques en réunion d'équipe, facilitation du débat avec un superviseur externe, co-rédaction d'un protocole d'intervention partagé.",
        analyse: "Référence à Dejours (souffrance au travail, travail réel vs prescrit) : le conflit révèle un décalage entre ce que l'institution prescrit et ce que l'équipe vit réellement. Zarifian sur la compétence collective.",
        lien: "C4.4 — Coopérer au sein d'une équipe pluridisciplinaire ; C4.3 — Analyser sa pratique en posture réflexive.",
        convaincu: "Posture réflexive courageuse sur sa propre place dans le conflit, capacité à nommer sa part de responsabilité sans auto-accusation.",
      },
    ],
  },
};

// ── Données existantes ─────────────────────────────────────────────────────

const EVAL_DATA = [
  {
    bc: "BC1",
    color: "#2D6A4F",
    criteres: [
      "Analyse pertinente d'une situation complexe d'accompagnement éducatif",
      "Identification des besoins de la personne et des objectifs du PPE",
      "Articulation entre pratique professionnelle et cadre théorique",
      "Posture éducative adaptée et bientraitante",
      "Réflexivité sur sa pratique et les ajustements réalisés",
    ],
    format: "Situation 1 du Livret 2 — 3 à 6 pages + soutenance orale de 40 min",
  },
  {
    bc: "BC2",
    color: "#E76F51",
    criteres: [
      "Prise en compte de l'autodétermination de la personne ou du groupe",
      "Co-construction du projet personnalisé avec la personne",
      "Respect des droits, de l'intimité et de la dignité de la personne",
      "Gestion des émotions et régulation dans la relation d'aide",
      "Analyse réflexive sur les dilemmes éthiques rencontrés",
    ],
    format: "Situation 2 du Livret 2 — 3 à 6 pages + soutenance orale de 40 min",
  },
  {
    bc: "BC3",
    color: "#457B9D",
    criteres: [
      "Identification et mobilisation des partenaires du territoire",
      "Connaissance des politiques sociales et du cadre législatif",
      "Contribution à un diagnostic territorial",
      "Animation d'un réseau partenarial",
      "Intégration des enjeux de transition écologique (nouveau 2025)",
    ],
    format: "Situation 3 du Livret 2 — 3 à 6 pages + soutenance orale de 40 min",
  },
  {
    bc: "BC4",
    color: "#C9A84C",
    criteres: [
      "Maîtrise des écrits professionnels (transmissions, rapports, IP)",
      "Coopération au sein de l'équipe pluridisciplinaire",
      "Organisation autonome de son activité professionnelle",
      "Utilisation éthique des outils numériques (RGPD)",
      "Participation à la démarche qualité de l'établissement",
    ],
    format: "Situation 4 du Livret 2 — 3 à 6 pages + soutenance orale de 40 min",
  },
];

const JURY_DATA = [
  {
    t: "Format de l'épreuve conclusive",
    d: "L'épreuve conclusive porte sur le Bloc 1 (BC1). Elle dure 40 minutes : 10 minutes de présentation par le candidat, puis 30 minutes de questions du jury. Le jury est composé d'un formateur et d'un professionnel du secteur DEES.",
    icon: "⏱️",
  },
  {
    t: "Ce que le jury évalue",
    d: "Le jury évalue votre posture réflexive (BC4), votre capacité à analyser vos pratiques, à mobiliser des références théoriques pertinentes, à articuler pratique et théorie, et à démontrer votre évolution professionnelle.",
    icon: "🎯",
  },
  {
    t: "Références théoriques à maîtriser",
    d: "Préparez minimum 4 auteurs : Winnicott (holding, contenance), Cyrulnik (résilience), Rogers (écoute active, regard positif), Maslow (pyramide des besoins). Faites des liens CONCRETS avec vos situations.",
    icon: "📚",
  },
  {
    t: "Lois incontournables",
    d: "Maîtrisez 3 lois clés : Loi 2002-2 (droits des usagers, PPE), Loi 2007-293 (protection de l'enfance, signalement), Loi 2005-102 (handicap, inclusion). Expliquez comment elles guident votre pratique.",
    icon: "⚖️",
  },
  {
    t: "Posture réflexive (BC4)",
    d: "La réflexivité est centrale. Le jury veut voir que vous n'êtes pas un exécutant mais un professionnel qui pense son action. Utilisez 'je' à la première personne. Analysez vos erreurs. Montrez vos apprentissages.",
    icon: "🔍",
  },
  {
    t: "Questions pièges à anticiper",
    d: "« Qu'auriez-vous fait différemment ? » « Quel auteur reliez-vous à cette situation ? » « Comment avez-vous respecté l'autodétermination ? » « Comment avez-vous travaillé avec l'équipe ? » Préparez des réponses précises.",
    icon: "⚠️",
  },
  {
    t: "Transition écologique (nouveau 2025)",
    d: "Le référentiel 2025 intègre la transition écologique dans BC3. Le jury peut poser des questions. Montrez comment vous intégrez les enjeux environnementaux dans votre pratique, même modestement.",
    icon: "🌿",
  },
  {
    t: "Conseils pratiques",
    d: "Entraînez-vous à voix haute. Simulez des oraux avec un collègue. Chronométrez-vous. Notez vos situations sur fiches. Relisez les compétences officielles. Dormez bien la veille. L'oral est une conversation professionnelle.",
    icon: "💡",
  },
];

// ── Composants UI ──────────────────────────────────────────────────────────

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left bg-surface active:bg-border/30 transition-colors"
      >
        <span className="font-medium text-foreground text-sm pr-3">{title}</span>
        <svg
          className={`w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-3 border-t border-border bg-background space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-semibold text-foreground text-sm px-1 mb-3">{children}</h3>
  );
}

// ── BlocContent ────────────────────────────────────────────────────────────

function BlocContent({ k }: { k: BlocKey }) {
  const bloc = BLOCS[k];
  const ped = BLOC_PEDAGOGY[k];
  const color = bloc.c;

  return (
    <div className="space-y-4">
      {/* En-tête bloc */}
      <div className="rounded-2xl p-5 border border-border shadow-sm" style={{ backgroundColor: color + "12" }}>
        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl">{bloc.e}</span>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-foreground text-base leading-snug">{bloc.t}</h2>
            <p className="text-muted text-xs mt-1">{bloc.h}</p>
          </div>
        </div>
        <p className="text-foreground text-sm leading-relaxed">{bloc.intro}</p>
      </div>

      {/* 1. Ce que le jury veut vraiment */}
      <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🎯</span>
          <SectionTitle>Ce que le jury veut vraiment</SectionTitle>
        </div>
        <div className="space-y-2">
          {ped.jury.map((point, i) => (
            <div key={i} className="flex gap-3">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5"
                style={{ backgroundColor: color }}
              >
                {i + 1}
              </span>
              <p className="text-sm text-foreground leading-snug">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Auteurs incontournables */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="text-lg">📚</span>
          <SectionTitle>Les auteurs incontournables</SectionTitle>
        </div>
        <div className="space-y-2">
          {ped.auteurs.map((a, i) => (
            <Accordion key={i} title={a.nom}>
              <div
                className="rounded-xl px-3 py-2 text-xs font-semibold"
                style={{ backgroundColor: color + "15", color }}
              >
                {a.concept}
              </div>
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">À retenir</p>
                <p className="text-sm text-foreground leading-relaxed italic">&ldquo;{a.phrase}&rdquo;</p>
              </div>
              <div className="bg-orange/5 rounded-xl p-3">
                <p className="text-xs font-semibold text-orange uppercase tracking-wide mb-1">Sur le terrain</p>
                <p className="text-sm text-foreground leading-relaxed">{a.terrain}</p>
              </div>
            </Accordion>
          ))}
        </div>
      </div>

      {/* 3. Lois à connaître */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="text-lg">⚖️</span>
          <SectionTitle>Les lois à connaître</SectionTitle>
        </div>
        <div className="space-y-2">
          {ped.lois.map((l, i) => (
            <div key={i} className="bg-surface rounded-xl p-4 border border-border shadow-sm">
              <div className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-md text-white mt-0.5"
                  style={{ backgroundColor: color }}
                >
                  {l.date}
                </span>
                <div>
                  <p className="font-semibold text-foreground text-sm leading-snug mb-1">{l.nom}</p>
                  <p className="text-sm text-muted leading-relaxed">{l.quoi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Exemples de situations VAE validées */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="text-lg">✅</span>
          <SectionTitle>Exemples de situations VAE validées</SectionTitle>
        </div>
        <div className="space-y-2">
          {ped.exemples.map((ex, i) => (
            <Accordion key={i} title={`Exemple ${i + 1} — ${ex.contexte.slice(0, 55)}…`}>
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">Contexte</p>
                <p className="text-sm text-foreground leading-relaxed">{ex.contexte}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">Action menée</p>
                <p className="text-sm text-foreground leading-relaxed">{ex.action}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">Analyse réflexive</p>
                <p className="text-sm text-foreground leading-relaxed">{ex.analyse}</p>
              </div>
              <div
                className="rounded-xl px-3 py-2"
                style={{ backgroundColor: color + "12" }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color }}>Lien référentiel</p>
                <p className="text-xs text-foreground">{ex.lien}</p>
              </div>
              <div className="bg-accent/8 rounded-xl px-3 py-2 border border-accent/15">
                <p className="text-xs font-semibold text-accent mb-1">Ce qui a convaincu le jury</p>
                <p className="text-xs text-foreground leading-relaxed">{ex.convaincu}</p>
              </div>
            </Accordion>
          ))}
        </div>
      </div>

      {/* Activités principales */}
      <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
        <h3 className="font-semibold text-foreground mb-3 text-sm">Activités principales</h3>
        <ul className="space-y-2">
          {bloc.activites.map((a, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground">
              <span className="mt-0.5 flex-shrink-0" style={{ color }}>▸</span>
              <span className="leading-snug">{a}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Compétences */}
      <div>
        <h3 className="font-semibold text-foreground mb-3 px-1 text-sm">
          Compétences — {bloc.comps.length} compétences
        </h3>
        <div className="space-y-2">
          {bloc.comps.map((comp, i) => (
            <Accordion key={i} title={comp.t}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color }}>
                  En clair
                </p>
                <p className="text-sm text-foreground leading-relaxed">{comp.simple}</p>
              </div>
              <div className="bg-orange/5 rounded-xl p-3">
                <p className="text-xs font-semibold text-orange uppercase tracking-wide mb-1.5">
                  Exemple concret
                </p>
                <p className="text-sm text-foreground leading-relaxed">{comp.ex}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-blue uppercase tracking-wide mb-2">
                  Indicateurs de compétence
                </p>
                <ul className="space-y-1.5">
                  {comp.indicateurs.map((ind, j) => (
                    <li key={j} className="text-xs text-foreground flex gap-2 leading-relaxed">
                      <span className="text-blue mt-0.5 flex-shrink-0">→</span>
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── EvalContent ────────────────────────────────────────────────────────────

function EvalContent() {
  return (
    <div className="space-y-4">
      <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm">
        <p className="text-sm text-foreground leading-relaxed">
          {"Chaque bloc est évalué sur la base d'une situation professionnelle du Livret 2 et d'une soutenance orale. Le jury évalue votre analyse, vos références théoriques, et votre posture réflexive."}
        </p>
      </div>
      {EVAL_DATA.map((ev) => (
        <div key={ev.bc} className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs font-bold text-white px-2.5 py-1 rounded-full"
              style={{ backgroundColor: ev.color }}
            >
              {ev.bc}
            </span>
            <span className="text-xs text-muted">{ev.format}</span>
          </div>
          <ul className="space-y-2">
            {ev.criteres.map((c, i) => (
              <li key={i} className="flex gap-2 text-sm text-foreground">
                <span className="mt-0.5 flex-shrink-0" style={{ color: ev.color }}>✓</span>
                <span className="leading-snug">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ── JuryContent ────────────────────────────────────────────────────────────

function JuryContent() {
  return (
    <div className="space-y-3">
      <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm">
        <p className="text-sm text-foreground leading-relaxed">
          Conseils et repères pour préparer votre épreuve conclusive devant le jury DEES.
        </p>
      </div>
      {JURY_DATA.map((item, i) => (
        <div key={i} className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{item.icon}</span>
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1.5">{item.t}</h3>
              <p className="text-sm text-foreground leading-relaxed">{item.d}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function BlocsPage() {
  const [tab, setTab] = useState<Tab>("bc1");

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border px-4 pt-6 pb-0">
        <h1 className="text-2xl font-bold text-foreground mb-4">Blocs de compétences</h1>
        <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-0">
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  active
                    ? "border-accent text-accent"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </header>

      <div key={tab} className="px-4 pt-4 pb-4 space-y-4">
        {tab === "bc1" && <BlocContent k="bc1" />}
        {tab === "bc2" && <BlocContent k="bc2" />}
        {tab === "bc3" && <BlocContent k="bc3" />}
        {tab === "bc4" && <BlocContent k="bc4" />}
        {tab === "eval" && <EvalContent />}
        {tab === "jury" && <JuryContent />}
      </div>
    </div>
  );
}
