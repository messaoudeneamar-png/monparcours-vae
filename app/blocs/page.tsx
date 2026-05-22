"use client";
import { useState } from "react";
import Link from "next/link";
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

type Auteur = { nom: string; concept: string; phrase: string; terrain: string };
type Loi = { date: string; nom: string; quoi: string };
type Exemple = { contexte: string; action: string; analyse: string; lien: string; convaincu: string };

// ── Données pédagogiques MECS — adolescents 13-21 ans ─────────────────────

const BLOC_PEDAGOGY: Record<BlocKey, {
  jury: string[];
  auteurs: Auteur[];
  lois: Loi[];
  exemples: Exemple[];
}> = {

  // BC1 — Crise au repas + projet de stage
  bc1: {
    jury: [
      "Analyser la crise au repas comme un signal, pas un incident disciplinaire — qu'exprimait ce jeune à ce moment ?",
      "Montrer que le projet de stage a été co-construit avec le jeune, pas décidé à sa place par l'équipe",
      "Décrire votre posture pendant la crise : mots, voix, distance — et expliquer pourquoi ces choix précis",
      "Relier la crise au besoin de sécurité (Maslow) et à l'histoire du jeune — parcours ASE, troubles de l'attachement",
      "Nommer ce que vous auriez fait différemment et ce que l'incident vous a appris sur votre pratique",
    ],
    auteurs: [
      {
        nom: "Donald Winnicott",
        concept: "Holding / contenance",
        phrase: "Tenir l'adolescent émotionnellement, même quand il rejette tout — c'est la fonction contenante.",
        terrain: "Face à la crise au repas : rester calme, voix basse, ne pas répondre à la provocation. La régularité de votre présence sécurisante, c'est du holding.",
      },
      {
        nom: "Anton Makarenko",
        concept: "Pédagogie collective / responsabilité",
        phrase: "Le groupe éduque autant que l'éducateur — la vie collective est en elle-même formatrice.",
        terrain: "Impliquer les jeunes de la MECS dans la préparation du repas pour créer un sens des responsabilités collectives — l'incident au repas devient un levier éducatif.",
      },
      {
        nom: "Lev Vygotski",
        concept: "Zone Proximale de Développement (ZPD)",
        phrase: "Accompagner là où le jeune ne peut pas encore aller seul, avec un étayage progressif et adapté.",
        terrain: "Pour le projet de stage, partir des compétences réelles du jeune et construire des objectifs atteignables avec votre soutien — ni trop facile, ni écrasant.",
      },
      {
        nom: "Carl Rogers",
        concept: "Empathie, congruence, regard positif inconditionnel",
        phrase: "Accepter l'adolescent tel qu'il est, même dans ses comportements les plus difficiles — sans jugement.",
        terrain: "Après la crise au repas, ne pas étiqueter le jeune 'violent' ou 'ingérable' mais chercher à comprendre ce qu'il exprimait — et le lui dire.",
      },
      {
        nom: "Célestin Freinet",
        concept: "Pédagogie active / apprendre par le faire",
        phrase: "Toute activité concrète est un support éducatif — l'expérimentation précède la réflexion.",
        terrain: "Le projet de stage est un levier d'apprentissage concret : permettre au jeune d'expérimenter un métier pour se projeter dans l'avenir sans passer par l'abstraction scolaire.",
      },
    ],
    lois: [
      {
        date: "2002",
        nom: "Loi 2002-2 — PPE et droits des usagers",
        quoi: "Le PPE co-construit avec le jeune est obligatoire. Il structure l'accompagnement éducatif et doit inclure le projet de stage comme objectif formalisé. En MECS, il est le cadre de référence de toute intervention.",
      },
      {
        date: "2007",
        nom: "Loi 2007-293 — Protection de l'enfance",
        quoi: "Renforce l'obligation de signalement. En MECS, une crise au repas peut révéler un signal de danger — l'éducateur doit évaluer le risque et alerter si nécessaire la CRIP.",
      },
      {
        date: "2016",
        nom: "Loi 2016-297 — Révision annuelle du PPE",
        quoi: "La révision du PPE est obligatoire chaque année avec la participation active du jeune. Le projet de stage peut figurer dans les objectifs CT (court terme) ou MT (moyen terme) du PPE.",
      },
      {
        date: "CASF",
        nom: "Article L226-3 — Obligation de signalement",
        quoi: "Tout professionnel ayant connaissance d'un mineur en danger doit transmettre une Information Préoccupante à la CRIP. Une crise répétée peut être un indicateur à évaluer collectivement.",
      },
      {
        date: "1989",
        nom: "Convention ONU — Droits de l'enfant (art. 12)",
        quoi: "Tout enfant a le droit d'exprimer son opinion sur les décisions qui le concernent. Le projet de stage doit partir du projet du jeune, pas de celui de l'équipe pour lui.",
      },
    ],
    exemples: [
      {
        contexte: "MECS, groupe de 7 adolescents (14-18 ans). M. K., 16 ans, entre en tension avec un pair lors du repas du soir sur une question de place à table. La situation dégénère : insultes, renversement d'assiettes, tentative de frapper l'autre jeune.",
        action: "Demande immédiate aux autres jeunes de quitter la salle à manger calmement. Approche de M. K. : voix basse, posture ouverte, pas de contact physique. Nommer l'émotion : 'Je vois que tu es très en colère.' Attente de l'apaisement sans raisonner. Après 15 min : proposition d'un entretien individuel différé de 30 min. Transmission écrite factuelle et chronologique en fin de service.",
        analyse: "La crise traduit une difficulté à gérer la frustration et une hypersensibilité aux interactions de groupe — fréquente chez des jeunes avec un parcours de ruptures (Winnicott : carences précoces, troubles de l'attachement). La place à table est devenue un enjeu de reconnaissance. Mon intervention a joué une fonction contenante (holding) : ma stabilité émotionnelle a permis l'apaisement.",
        lien: "C1.1 — Observer et analyser une situation éducative complexe ; C1.2 — Gérer une situation de crise en préservant la sécurité de tous.",
        convaincu: "Distinction entre l'incident (renversement) et ce qu'il signifie (besoin de reconnaissance non satisfait). Citation naturelle de Winnicott. Auto-analyse de la posture adoptée et de ses effets.",
      },
      {
        contexte: "MECS, M. T., 17 ans, sous mesure ASE, 3 structures en 4 ans. Fort intérêt pour la mécanique, refus de toute scolarité classique. Approche de la majorité à 18 ans, risque de rupture à la sortie.",
        action: "Entretiens hebdomadaires pour explorer ses intérêts réels. Prise de contact avec un garagiste du territoire acceptant un jeune en stage. Mise en place d'un stage découverte de 2 semaines intégré au PPE. Co-rédaction des objectifs avec M. T. Réunion de synthèse avec l'ASE référente pour ajuster le parcours post-18 ans.",
        analyse: "Le projet de stage comme outil éducatif (Freinet : apprendre par le faire) et comme support à la projection dans l'avenir. Vygotski : travailler dans la ZPD de M. T. — partir de son intérêt réel (mécanique) pour l'amener vers une insertion professionnelle. La co-construction du PPE renforce son sentiment d'être acteur de son propre projet.",
        lien: "C1.3 — Concevoir et conduire le PPE ; C1.4 — Mobiliser les ressources de l'environnement familial et territorial.",
        convaincu: "Co-construction du projet avec le jeune — pas décidé à sa place. Articulation entre compétences du jeune, objectifs du PPE et coordination partenariale avec l'ASE.",
      },
    ],
  },

  // BC2 — Fugue
  bc2: {
    jury: [
      "Lire la fugue comme un acte de communication — qu'est-ce que ce jeune tentait de dire ou d'obtenir en partant ?",
      "Distinguer votre réaction immédiate (sécurité, protocole) et votre analyse professionnelle (sens de l'acte)",
      "Montrer ce qui s'est passé AU RETOUR : accueil, entretien sans jugement, révision du PPE — c'est là que l'éducation se joue",
      "Nommer le dilemme éthique entre protection institutionnelle et droit à l'autodétermination du jeune",
      "Prouver que votre réponse éducative a été co-construite avec le jeune après la fugue, pas imposée unilatéralement",
    ],
    auteurs: [
      {
        nom: "Charles Gardou",
        concept: "Société inclusive / vulnérabilité partagée",
        phrase: "L'institution ne doit pas aggraver la fragilité du jeune en le contraignant davantage — elle doit s'adapter à lui.",
        terrain: "Face à une fugue répétée, s'interroger sur ce que la MECS peut changer dans son fonctionnement pour que le jeune s'y sente moins enfermé et plus sujet.",
      },
      {
        nom: "Michel Foucault",
        concept: "Institution / pouvoir / résistance",
        phrase: "Les institutions produisent du pouvoir sur les corps — la fugue peut être une résistance à cette emprise.",
        terrain: "Analyser les règles de la MECS qui génèrent de la résistance (horaires, téléphone, permissions) et proposer des ajustements pour réduire les tensions.",
      },
      {
        nom: "Amartya Sen",
        concept: "Capabilités / pouvoir d'agir réel",
        phrase: "Ce qui compte, c'est ce que le jeune est réellement capable de faire et de choisir — pas ce que l'institution décide pour lui.",
        terrain: "Le retour de fugue est l'occasion de reconstruire le projet avec le jeune en partant de ses capacités réelles et de ce qu'il veut, pas de ce que l'adulte pense être bon pour lui.",
      },
      {
        nom: "Alain Touraine",
        concept: "Subjectivation / être acteur de sa vie",
        phrase: "Le jeune n'est pas seulement un objet des institutions — il est aussi l'auteur de sa propre vie, même maladroitement.",
        terrain: "La fugue est peut-être un acte de subjectivation — le jeune affirme qu'il existe au-delà de ce que l'institution pense de lui. L'entretien de retour doit reconnaître cela.",
      },
      {
        nom: "François Dubet",
        concept: "Expérience sociale / logiques d'action multiples",
        phrase: "Les individus combinent plusieurs logiques d'action pour donner sens à leur expérience — comprendre celle du jeune fugiteur.",
        terrain: "Analyser POURQUOI le jeune a fugué : famille, pair, conflits internes, règlement ? La réponse éducative dépend de cette lecture — pas d'un protocole uniforme.",
      },
    ],
    lois: [
      {
        date: "2002",
        nom: "Loi 2002-2 — Droits des usagers (art. L311-3)",
        quoi: "Droit au respect de la dignité, à la confidentialité, à la participation. La fugue interroge la place du jeune dans son propre projet — l'entretien de retour doit lui redonner la parole.",
      },
      {
        date: "1989",
        nom: "Convention ONU — Droits de l'enfant (art. 12)",
        quoi: "Tout enfant a le droit d'exprimer son opinion sur les décisions qui le concernent. Après une fugue, l'entretien de retour doit donner la parole au jeune sans jugement ni injonction immédiate.",
      },
      {
        date: "2007",
        nom: "Loi 2007-293 — Danger et obligation de signalement",
        quoi: "La fugue déclenche une obligation d'évaluation du risque. Si elle met le jeune en danger (réseau, violence, fugue dans un contexte familial à risque), l'éducateur doit alerter la CRIP.",
      },
      {
        date: "2016",
        nom: "Loi 2016-297 — Révision du PPE",
        quoi: "La fugue est un signal de révision du PPE — elle indique que le projet actuel ne correspond plus aux besoins ou aux aspirations du jeune. Cette révision doit être faite avec lui.",
      },
      {
        date: "CASF",
        nom: "Article L222-5 — Hébergement des mineurs",
        quoi: "En cas de fugue, l'établissement doit informer sans délai l'autorité judiciaire ou administrative à l'origine de la mesure (ASE ou juge). Le protocole fugue de l'établissement s'y réfère.",
      },
    ],
    exemples: [
      {
        contexte: "MECS, M. A., 15 ans, placé depuis 8 mois suite à négligence parentale. Première fugue un vendredi soir après un appel téléphonique avec sa mère. Retour spontané le dimanche matin.",
        action: "Dès la fugue signalée : appel à l'ASE référente, signalement aux forces de l'ordre selon protocole. Accueil au retour sans jugement : 'Je suis soulagé que tu sois rentré.' Entretien individuel différé de 2 heures pour lui laisser le temps de décompresser. Écoute de ce qui s'était passé chez lui pendant la fugue. Transmission factuelle. Réunion d'équipe avec révision du PPE à la semaine suivante.",
        analyse: "La fugue fait suite à un appel avec la mère — elle révèle le conflit de loyauté entre famille et institution (Bowlby : attachement, Foucault : résistance institutionnelle). M. A. a besoin que la MECS laisse une place à sa famille dans son projet. Analyse : la rigidité du planning des appels téléphoniques contribuait à la tension. Ajustement proposé en équipe : plage horaire élargie pour les appels familiaux.",
        lien: "C2.1 — Favoriser l'expression et le projet du jeune ; C2.3 — Gérer une situation de crise dans le respect de la personne.",
        convaincu: "Lecture de la fugue comme acte de communication (pas simple infraction au règlement). Remise en question d'une règle institutionnelle rigide. Entretien de retour mené sans jugement avec espace d'expression pour le jeune.",
      },
      {
        contexte: "MECS, Mme B., 16 ans, refus catégorique de retourner au lycée après un incident avec un professeur. Absentéisme croissant, risque de décrochage scolaire et de rupture du placement.",
        action: "Entretiens hebdomadaires pour comprendre sa vision de l'école et ce qu'elle voulait pour elle-même. Réunion de synthèse avec l'enseignant référent, le CPE et l'ASE. Exploration d'alternatives (CFA, stage de découverte, dispositif PPAD). Co-rédaction d'un avenant au PPE intégrant ses propres choix avec des objectifs SMART.",
        analyse: "Référence à Sen (capabilités) : l'orientation scolaire imposée nie les capacités réelles et les aspirations de Mme B. Référence à Touraine : elle affirme son existence en résistant. Le travail éducatif consiste à restaurer son sentiment de compétence en l'aidant à trouver une voie qui lui correspond.",
        lien: "C2.2 — Soutenir la construction du projet personnalisé ; C2.4 — Soutenir la participation et la citoyenneté.",
        convaincu: "Respect du refus comme expression d'un besoin légitime. Recherche d'alternatives co-construites avec la jeune. Mobilisation des partenaires sans imposer la solution de l'adulte.",
      },
    ],
  },

  // BC3 — Synthèses ASE / PJJ / école
  bc3: {
    jury: [
      "Nommer précisément qui était présent à la synthèse, son rôle institutionnel et ce qu'il représentait — ASE, PJJ, EN, famille, jeune",
      "Montrer que vous avez préparé et animé la réunion, pas juste participé — bilan éducatif, ordre du jour, compte-rendu",
      "Décrire les tensions entre partenaires (logique sécuritaire PJJ vs socio-éducative MECS) et expliquer comment vous les avez régulées",
      "Montrer que le jeune et/ou sa famille ont été associés à la synthèse — ou justifier pourquoi ils ne l'ont pas été",
      "Expliquer comment les décisions de la synthèse ont été intégrées concrètement dans le PPE du jeune",
    ],
    auteurs: [
      {
        nom: "Jacques Donzelot",
        concept: "Exclusion territoriale / ville à trois vitesses",
        phrase: "Les parcours des jeunes en MECS sont souvent le produit d'inégalités territoriales cumulées — le territoire joue un rôle dans les difficultés.",
        terrain: "En réunion de synthèse, situer le territoire du jeune (quartier, école, ressources locales) pour contextualiser ses difficultés et identifier les partenaires pertinents.",
      },
      {
        nom: "Robert Castel",
        concept: "Désaffiliation / vulnérabilité sociale",
        phrase: "La désaffiliation n'est pas une chute brutale — c'est un processus progressif de délitement des liens sociaux, familiaux et scolaires.",
        terrain: "Analyser le parcours du jeune en MECS comme accumulation de ruptures (famille, école, pairs, territoire) pour mieux cibler les réponses partenariales et recréer des liens.",
      },
      {
        nom: "Jacques Ion",
        concept: "Travail social à l'épreuve / tensions institutionnelles",
        phrase: "Le travail social contemporain est traversé par des tensions entre logique gestionnaire et engagement professionnel — il faut les nommer.",
        terrain: "En synthèse ASE/PJJ/école, nommer explicitement la tension entre la logique sécuritaire du magistrat et la logique socio-éducative de l'équipe MECS — et chercher un accord.",
      },
      {
        nom: "Philippe Warin",
        concept: "Non-recours aux droits",
        phrase: "Des millions de personnes n'accèdent pas aux droits auxquels elles ont droit — par méconnaissance, honte ou complexité administrative.",
        terrain: "En synthèse, vérifier si la famille du jeune a bien accès à ses droits (MDPH, CAF, CMU, aide juridictionnelle) et si des démarches sont à initier avec les partenaires.",
      },
      {
        nom: "Élisabeth Bourgeois",
        concept: "Développement du Pouvoir d'Agir collectif (DPA)",
        phrase: "Le DPA mobilise les compétences des personnes concernées — le jeune et sa famille sont experts de leur propre situation.",
        terrain: "Associer le jeune à la préparation de sa synthèse — lui donner la parole sur ce qu'il veut dire aux adultes réunis, ce qu'il a besoin qu'ils entendent.",
      },
    ],
    lois: [
      {
        date: "2007",
        nom: "Loi 2007-293 — Coordination autour du mineur protégé",
        quoi: "Oblige la coordination entre ASE, PJJ, école et services de santé pour tout mineur sous mesure de protection. La réunion de synthèse est le lieu institutionnel de cette coordination.",
      },
      {
        date: "2016",
        nom: "Loi 2016-297 — Synthèse annuelle obligatoire",
        quoi: "La synthèse annuelle est obligatoire pour tout PPE. Elle doit associer le jeune et, quand c'est possible et pertinent, sa famille. Le compte-rendu est versé au dossier.",
      },
      {
        date: "CASF",
        nom: "Article L226-2-1 — Secret professionnel partagé",
        quoi: "Autorise le partage d'informations à caractère secret entre professionnels concourant à la protection de l'enfance, dans l'intérêt du mineur. Encadre la coordination ASE/PJJ/école.",
      },
      {
        date: "2002",
        nom: "Loi 2002-2 — Coordination et projet d'établissement",
        quoi: "Impose la coordination avec les partenaires extérieurs comme partie intégrante du projet d'établissement de la MECS. Les partenariats ne sont pas optionnels.",
      },
      {
        date: "2019",
        nom: "CJPM — Code de la Justice Pénale des Mineurs",
        quoi: "Clarifie le rôle de la PJJ et ses relations avec l'ASE. En cas de double mesure (placement ASE + suivi PJJ), la coordination entre les deux services est obligatoire et doit être tracée.",
      },
    ],
    exemples: [
      {
        contexte: "MECS, M. D., 17 ans, double mesure : placement ASE et suivi PJJ (vol avec violence). Déscolarisé depuis 4 mois. Réunion de synthèse demandée par l'éducateur PJJ après un nouvel incident judiciaire.",
        action: "Préparation en amont : bilan éducatif de M. D. (points d'appui, difficultés, projet), ordre du jour envoyé 5 jours avant. Animation de la réunion (ASE référente + éducateur PJJ + proviseur + équipe MECS). Gestion de la tension : l'éducateur PJJ souhaitait un placement plus sécurisé, l'équipe MECS défendait un maintien avec renforcement. Plan d'action à 3 mois avec indicateurs co-signé. M. D. associé à la 2e partie pour exprimer son projet. Compte-rendu rédigé et envoyé sous 48h.",
        analyse: "Référence à Ion (tensions entre logiques) : la tension PJJ/MECS était réelle et liée à des mandats institutionnels différents, pas à des personnes. La nommer explicitement a permis de trouver un accord centré sur le jeune. Référence à Castel : M. D. est dans un processus de désaffiliation cumulée — la synthèse doit recréer des liens, pas seulement gérer l'urgence.",
        lien: "C3.2 — S'inscrire dans une dynamique partenariale ; C3.4 — Rendre compte de son action aux partenaires institutionnels.",
        convaincu: "Maîtrise des logiques institutionnelles de chaque partenaire. Gestion explicite et nommée de la tension. Association du jeune à la réunion avec préparation préalable.",
      },
      {
        contexte: "MECS, Mme C., 14 ans, absentéisme scolaire croissant (2-3 jours par semaine). L'établissement scolaire menace de signaler à la CRIP et d'engager une procédure de déscolarisation.",
        action: "Initiative de contact avec le professeur principal et le CPE avant que le signalement soit fait. Réunion avec l'assistante sociale scolaire, l'ASE référente et l'équipe MECS. Analyse commune des causes (conflits avec pairs, difficultés scolaires non repérées, anxiété sociale). Plan d'action commun : tutorat scolaire + accompagnement éducatif renforcé matin + réunion de suivi mensuelle.",
        analyse: "Référence à Warin (non-recours) : des dispositifs d'aide scolaire existaient (PPRE, aide personnalisée) mais n'avaient pas été mobilisés. Référence à Donzelot : l'école de secteur, éloignée de la MECS, renforçait l'isolement de Mme C. La coordination préventive a évité un signalement et une rupture scolaire.",
        lien: "C3.1 — Identifier et mobiliser les ressources du territoire ; C3.3 — Contribuer à un diagnostic partagé avec les partenaires.",
        convaincu: "Initiative de coordination prise par l'éducateur avant que la situation se détériore. Analyse des causes avant de proposer des solutions. Évitement du signalement par la prévention partenariale.",
      },
    ],
  },

  // BC4 — Transmission mal faite + RDV médical loupé
  bc4: {
    jury: [
      "Assumer l'erreur sans l'esquiver — montrer que vous avez su identifier ce qui n'a pas fonctionné dans la transmission",
      "Analyser les causes systémiques : format de transmission inadapté, surcharge en fin de service, manque de protocole — pas seulement la faute individuelle",
      "Décrire les mesures correctives mises en place après l'incident : nouveau format, validation croisée, case obligatoire RDV",
      "Montrer que le RDV médical a été rattrapé rapidement et que vous avez assuré la continuité des soins",
      "Montrer votre posture réflexive : ce que cet incident vous a appris sur votre propre pratique et votre responsabilité professionnelle",
    ],
    auteurs: [
      {
        nom: "Erving Goffman",
        concept: "Institution totale / stigmate",
        phrase: "L'institution totale peut réduire la personne à son écart à la norme — l'éducateur doit en être conscient dans ses écrits.",
        terrain: "Dans les transmissions et rapports, décrire le jeune sans le réduire à ses 'comportements problèmes' — nommer aussi ses ressources et ses progrès.",
      },
      {
        nom: "Émile Durkheim",
        concept: "Fait social / solidarité organique",
        phrase: "La transmission manquée est un fait social — elle dit quelque chose de l'organisation collective du travail, pas seulement de l'individu.",
        terrain: "Analyser l'erreur de transmission comme le produit d'une organisation défaillante (format inadapté, manque de temps structurel) — et proposer une solution collective.",
      },
      {
        nom: "Christophe Dejours",
        concept: "Souffrance au travail / travail réel vs prescrit",
        phrase: "Il y a toujours un écart entre le travail prescrit et le travail réel — les transmissions 'bâclées' révèlent cet écart.",
        terrain: "En équipe, analyser pourquoi les transmissions sont souvent incomplètes en fin de service : surcharge, format inadapté, sentiment d'urgence qui fait sauter des étapes.",
      },
      {
        nom: "Philippe Zarifian",
        concept: "Compétence / réponse à l'événement",
        phrase: "La compétence, c'est savoir faire face à l'événement imprévu avec initiative et jugement — pas appliquer mécaniquement une procédure.",
        terrain: "Face au RDV médical loupé : appeler le médecin immédiatement, obtenir un nouveau RDV en urgence, informer l'ASE. Réagir vite et bien — c'est de la compétence professionnelle en actes.",
      },
      {
        nom: "Michel Autès",
        concept: "Travail social / production de lien",
        phrase: "Le travail social produit du lien social là où il est défait — la transmission est un acte de lien entre professionnels au service du jeune.",
        terrain: "Une transmission soignée garantit la continuité du suivi éducatif et médical du jeune — c'est un acte éthique et professionnel, pas une formalité administrative.",
      },
    ],
    lois: [
      {
        date: "2002",
        nom: "Loi 2002-2 — Continuité et qualité du service",
        quoi: "Impose la continuité du service et la qualité de la prise en charge. Une transmission manquée ayant entraîné un RDV médical loupé peut constituer un manquement à ces obligations.",
      },
      {
        date: "2018",
        nom: "RGPD — Protection des données médicales",
        quoi: "Les données médicales des jeunes sont des données sensibles. Les transmissions médicales doivent rester dans le cercle des professionnels habilités et ne pas circuler par messagerie non sécurisée.",
      },
      {
        date: "CASF",
        nom: "Article L311-4 — Droits du jeune hébergé",
        quoi: "La continuité des soins est un droit du jeune hébergé en MECS. Un RDV médical loupé peut constituer une atteinte à ce droit — l'établissement en est responsable.",
      },
      {
        date: "2014",
        nom: "Loi 2014-288 — Formation professionnelle continue",
        quoi: "Le droit à la formation continue inclut la formation aux écrits professionnels. Un éducateur peut solliciter une formation à la rédaction de transmissions et de rapports professionnels.",
      },
      {
        date: "2002",
        nom: "Loi 2002-73 — Responsabilité professionnelle",
        quoi: "Encadre la responsabilité civile et pénale dans l'exercice professionnel. L'éducateur doit savoir que des manquements dans la transmission peuvent engager sa responsabilité.",
      },
    ],
    exemples: [
      {
        contexte: "MECS, M. E., 15 ans, traitement médical quotidien pour épilepsie. Transmission de fin de service incomplète — la collègue prenant le relais ne sait pas qu'il a un RDV neurologique le lendemain matin. RDV manqué. Le médecin appelle l'établissement.",
        action: "Dès l'appel du médecin : excuses, explication honnête, demande d'un nouveau RDV en urgence (obtenu 48h plus tard). Information immédiate à l'ASE référente et au chef de service. Rédaction d'une fiche d'incident selon le protocole. En réunion d'équipe : présentation de l'incident, analyse collective des causes (transmission orale + écrite mais sans case dédiée aux RDV médicaux urgents). Proposition acceptée : nouveau format de transmission avec case obligatoire 'RDV dans les 48h à venir' et validation croisée par la personne prenant le relais.",
        analyse: "Référence à Dejours : l'incident révèle un écart entre le travail prescrit (transmettre toutes les informations importantes) et le travail réel (transmissions faites dans la précipitation en fin de service). Ce n'est pas une faute individuelle isolée — c'est un problème organisationnel. Référence à Zarifian : ma réaction rapide après l'incident (appel médecin, nouveau RDV, information hiérarchie) relève d'une compétence professionnelle.",
        lien: "C4.2 — Produire des écrits professionnels adaptés ; C4.4 — Coopérer au sein de l'équipe et s'investir dans l'amélioration continue des pratiques.",
        convaincu: "Assumer l'erreur sans l'esquiver ni la décharger sur la collègue. Analyse systémique (organisation) et non seulement individuelle. Mise en place d'une solution collective concrète et tracée.",
      },
      {
        contexte: "MECS, Mme F., 17 ans, mesure judiciaire en cours de renouvellement. Le juge des enfants demande un rapport éducatif avant l'audience fixée dans 3 semaines.",
        action: "Recueil de données sur les 6 derniers mois : observations quotidiennes, bilans scolaires, RDV santé, appels familiaux. Rédaction du rapport en distinguant faits observés / analyse professionnelle / préconisations. Présentation du rapport à Mme F. avant envoi au tribunal — elle a pu corriger un point factuel. Envoi au chef de service pour validation. Transmission dans les délais.",
        analyse: "Référence à Goffman (stigmate) : veiller à ne pas réduire Mme F. à ses difficultés dans le rapport — équilibrer les éléments positifs (progrès scolaires, stabilisation) et les points de vigilance. Référence à Autès : le rapport est un acte de lien entre l'éducateur, le magistrat et la jeune — il doit lui rendre justice dans les deux sens du terme.",
        lien: "C4.2 — Produire des écrits professionnels adaptés aux destinataires ; C4.1 — Inscrire son action dans le cadre réglementaire et judiciaire.",
        convaincu: "Présentation du rapport à la jeune avant envoi (transparence et respect de la personne). Distinction claire faits/analyse dans l'écrit. Connaissance du calendrier judiciaire et respect des délais.",
      },
    ],
  },
};

// ── Données évaluation et jury ─────────────────────────────────────────────

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

// ── BlocContent ────────────────────────────────────────────────────────────

function BlocContent({ k }: { k: BlocKey }) {
  const bloc = BLOCS[k];
  const ped = BLOC_PEDAGOGY[k];
  const color = bloc.c;

  return (
    <div className="space-y-4">
      {/* En-tête */}
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
          <span className="text-base">🎯</span>
          <h3 className="font-semibold text-foreground text-sm">Ce que le jury veut vraiment</h3>
        </div>
        <div className="space-y-2.5">
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
          <span className="text-base">📚</span>
          <h3 className="font-semibold text-foreground text-sm">Les auteurs incontournables</h3>
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
                <p className="text-xs font-semibold text-orange uppercase tracking-wide mb-1">Sur le terrain MECS</p>
                <p className="text-sm text-foreground leading-relaxed">{a.terrain}</p>
              </div>
            </Accordion>
          ))}
        </div>
      </div>

      {/* 3. Lois à connaître */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="text-base">⚖️</span>
          <h3 className="font-semibold text-foreground text-sm">Les lois à connaître</h3>
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

      {/* 4. Exemples VAE validées */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="text-base">✅</span>
          <h3 className="font-semibold text-foreground text-sm">Exemples de situations VAE validées</h3>
        </div>
        <div className="space-y-2">
          {ped.exemples.map((ex, i) => (
            <Accordion key={i} title={`Exemple ${i + 1} — ${ex.contexte.slice(0, 52)}…`}>
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
              <div className="rounded-xl px-3 py-2" style={{ backgroundColor: color + "12" }}>
                <p className="text-xs font-semibold mb-1" style={{ color }}>Lien référentiel</p>
                <p className="text-xs text-foreground">{ex.lien}</p>
              </div>
              <div className="bg-accent/10 rounded-xl px-3 py-2 border border-accent/20">
                <p className="text-xs font-semibold text-accent mb-1">Ce qui a convaincu le jury</p>
                <p className="text-xs text-foreground leading-relaxed">{ex.convaincu}</p>
              </div>
            </Accordion>
          ))}
        </div>
      </div>

      {/* Lien Ressources */}
      <Link
        href="/ressources"
        className="flex items-center justify-between bg-surface rounded-2xl p-4 border border-border shadow-sm active:bg-border/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + "15" }}>
            <span className="text-base">📖</span>
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">Ressources complètes</p>
            <p className="text-xs text-muted mt-0.5">Auteurs · Lois · Exemples · Vocabulaire</p>
          </div>
        </div>
        <svg className="w-4 h-4 text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
        </svg>
      </Link>

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
