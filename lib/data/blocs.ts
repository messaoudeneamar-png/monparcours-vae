export type Competence = {
  t: string;
  simple: string;
  ex: string;
  indicateurs: string[];
};

export type Bloc = {
  t: string;
  h: string;
  c: string;
  e: string;
  intro: string;
  activites: string[];
  comps: Competence[];
};

export type BlocsData = {
  bc1: Bloc;
  bc2: Bloc;
  bc3: Bloc;
  bc4: Bloc;
};

export const BLOCS: BlocsData = {
  bc1: {
    t: "BC1 — Concevoir et conduire un accompagnement éducatif spécialisé dans une visée préventive et inclusive",
    h: "504h — 630h de pratique minimum",
    c: "#2D6A4F",
    e: "🤝",
    intro:
      "Dans le cadre de l'accompagnement éducatif, l'éducateur spécialisé mobilise toutes les situations du quotidien pour favoriser les apprentissages visant le développement de l'autonomie. Il conçoit et met en œuvre l'action éducative adaptée aux besoins et aux choix de la personne.",
    activites: [
      "Mettre en œuvre un accompagnement éducatif spécialisé visant le développement de l'autonomie de la personne et son acquisition des règles de vie en société",
      "Assurer la fonction de référent en coordonnant le projet socio-éducatif personnalisé dans une logique de continuité du parcours",
    ],
    comps: [
      {
        t: "Concevoir et mettre en œuvre l'animation du quotidien comme support à la relation éducative",
        simple:
          "Vous utilisez chaque moment du quotidien — repas, activité, temps libre — comme occasion d'éduquer et de créer du lien. Ce n'est pas par hasard : chaque action est pensée avec un sens éducatif.",
        ex: "MECS : Le repas n'est pas juste un moment de nourriture. Vous en faites un espace de règles de vie, de partage, d'écoute. Chaque interaction compte.",
        indicateurs: [
          "Assurer par sa disponibilité une fonction de tiers, de repère et d'étayage qui favorise le développement de la personnalité",
          "Organiser, animer et évaluer des actions éducatives adaptées aux besoins des personnes et aux objectifs de leurs projets personnalisés",
          "Développer sa créativité pour saisir dans le quotidien toute opportunité de délivrer un message éducatif",
          "Concevoir des actions et mettre en œuvre des médiations éducatives formalisées ou spontanées, et savoir en expliciter le sens",
          "Assurer la fonction de référent éducatif",
        ],
      },
      {
        t: "Mobiliser toute situation pour favoriser les apprentissages des règles de vie en société",
        simple:
          "Vous aidez les personnes à comprendre et respecter les règles qui permettent de vivre ensemble. Pas par la contrainte — par l'explication, l'exemple, et en permettant à chacun de s'exprimer.",
        ex: "Un conflit entre jeunes devient une occasion d'apprendre à gérer les désaccords, à entendre l'autre, à trouver des compromis — compétences pour toute la vie.",
        indicateurs: [
          "Transmettre les règles de la vie en société et accompagner leur compréhension et appropriation pour permettre à la personne de s'y inscrire comme citoyen",
          "Favoriser les situations d'apprentissage permettant de comprendre l'organisation de la société afin d'exercer sa citoyenneté",
          "Veiller au respect des règles de la vie collective en favorisant l'expression des singularités et la participation de chacun",
          "Accompagner la personne ou le groupe dans l'exploration de son environnement et la mobilisation des ressources à sa disposition",
        ],
      },
      {
        t: "Coordonner des actions socio-éducatives dans et hors l'établissement ou le service",
        simple:
          "Vous êtes le pivot — le référent de parcours. Vous assurez la continuité entre tous les acteurs qui interviennent autour de la personne, pour que rien ne tombe dans les failles.",
        ex: "Un jeune approche de la majorité. Vous coordonnez l'ASE, la mission locale, le bailleur social, le suivi psy, la famille. Tout le monde est aligné pour éviter la rupture à 18 ans.",
        indicateurs: [
          "Assurer la référence et le pilotage de projets socioéducatifs",
          "Assurer le rôle d'interlocuteur privilégié et veiller à la continuité du parcours de la personne en concertation avec les autres professionnels",
          "Développer une vision globale de la situation de la personne afin de faciliter la coordination des actions socioéducatives",
          "Exercer la fonction de référent de parcours auprès des acteurs concourant à la mise en œuvre du projet personnalisé",
        ],
      },
    ],
  },

  bc2: {
    t: "BC2 — Favoriser et soutenir l'autodétermination des individus et des collectifs dans un but d'émancipation",
    h: "504h — 630h de pratique minimum",
    c: "#E76F51",
    e: "🌱",
    intro:
      "L'éducateur met en œuvre un accompagnement individuel et collectif à visée préventive et inclusive. Il crée les conditions d'accueil de la personne dont il soutient la place et le rôle dans l'élaboration, la mise en œuvre et l'évaluation de son projet personnalisé.",
    activites: [
      "Mettre en œuvre un accompagnement éducatif individuel et collectif à visée préventive et inclusive dans le respect des principes éthiques et déontologiques",
      "Inscrire ses pratiques dans une démarche réflexive permettant d'analyser les enjeux de la relation professionnelle, d'ajuster son positionnement et d'assurer son développement professionnel",
    ],
    comps: [
      {
        t: "Soutenir le développement de l'autodétermination et la participation de la personne dans son projet",
        simple:
          "La personne n'est pas un objet de soin — elle est actrice de sa propre vie. Votre rôle est de créer les conditions pour qu'elle puisse s'exprimer, choisir, décider. Même quand ses choix ne sont pas ceux que vous auriez faits.",
        ex: "Un jeune veut quitter son apprentissage. Plutôt que de décider à sa place, vous l'aidez à analyser la situation, à envisager les conséquences, à explorer des alternatives. La décision finale lui appartient.",
        indicateurs: [
          "Créer des conditions favorables à l'établissement d'une relation éducative",
          "Assurer l'accueil et l'information de la personne et, le cas échéant, de son entourage",
          "Recueillir les éléments nécessaires à la contextualisation de la demande pour comprendre les difficultés et identifier les ressources",
          "Coconstruire l'analyse avec la personne pour déterminer le projet personnalisé sur la base d'objectifs négociés et formalisés",
          "Co-évaluer avec la personne les actions mises en œuvre et les ajuster si nécessaire",
          "Soutenir la parole et la capacité d'agir de la personne à chaque étape de l'accompagnement",
          "Orienter la personne vers les organismes et services adaptés",
          "Prévenir, repérer, évaluer et traiter les situations d'urgence, de risque ou de danger",
          "Garantir les droits et libertés de la personne en explicitant le cadre de mise en œuvre du projet éducatif",
          "Garantir un cadre d'intervention sécurisant et bientraitant afin de veiller à l'intégrité physique et psychique de la personne",
          "Accompagner la personne dans l'exercice de ses droits et devoirs de citoyen",
        ],
      },
      {
        t: "Coconstruire, coordonner et évaluer un projet collectif d'action éducative ou de développement social",
        simple:
          "Vous travaillez aussi avec des groupes — pas seulement des individus. Vous animez, réglez les tensions, faites participer chacun, et utilisez la dynamique collective comme levier éducatif.",
        ex: "DITEP : Vous co-construisez avec le groupe un projet de jardin collectif. Chacun a un rôle, une responsabilité. Le projet lui-même est secondaire — c'est l'apprentissage du 'vivre ensemble' qui compte.",
        indicateurs: [
          "Créer les conditions d'accueil, d'expression, de participation des personnes dans un groupe et soutenir les initiatives",
          "Recueillir les éléments nécessaires à la contextualisation des besoins ou attentes du groupe",
          "Coconstruire l'analyse avec les membres d'un groupe afin de déterminer le type de projet pertinent sur la base d'objectifs négociés",
          "Promouvoir et susciter l'adhésion des différentes parties prenantes au projet collectif",
          "Déterminer et négocier les moyens humains, matériels et budgétaires nécessaires",
          "Coordonner un projet sur le territoire en mobilisant les ressources des partenaires",
          "Co-évaluer avec les membres du groupe les actions mises en œuvre et les ajuster",
          "Observer, analyser et réguler la dynamique de groupe pour garantir un cadre sécurisant et bientraitant",
        ],
      },
      {
        t: "Conduire une analyse réflexive et éthique de sa pratique professionnelle",
        simple:
          "Vous ne faites pas que travailler — vous réfléchissez à ce que vous faites, pourquoi, comment faire mieux. Vous questionnez vos pratiques, affrontez les dilemmes éthiques, et continuez à vous développer professionnellement.",
        ex: "Après une crise mal gérée, vous ne passez pas à autre chose. En supervision, vous analysez : qu'est-ce qui s'est passé en moi ? Qu'aurais-je pu faire différemment ? C'est de la posture réflexive.",
        indicateurs: [
          "Partager et questionner de manière critique en équipe la pratique professionnelle mise en œuvre, notamment dans les situations complexes",
          "Appliquer un processus de délibération réflexive individuel ou collectif visant à dépasser les tensions éthiques",
          "Proposer et développer des évolutions de la pratique professionnelle",
          "S'engager dans un processus de perfectionnement de sa pratique professionnelle",
          "Contribuer au développement de la profession par la formation des étudiants et la participation à des recherches-action",
        ],
      },
      {
        t: "Mobiliser et développer ses ressources dans les dimensions émotionnelles, corporelles et sociales",
        simple:
          "Votre outil principal c'est vous-même — votre corps, vos émotions, votre présence. Savoir gérer ses émotions, comprendre celles des autres, se protéger de l'épuisement : c'est une compétence professionnelle à part entière.",
        ex: "Un jeune vous insulte violemment. Vous ne réagissez pas de façon émotionnelle — vous avez appris à réguler. Votre calme régule le sien. Mais après, vous prenez du recul pour comprendre ce que ça a provoqué en vous.",
        indicateurs: [
          "Se décentrer et mettre à distance ses représentations afin de prendre en compte les cultures, croyances et modes de vie des personnes",
          "Développer sa compréhension des manifestations émotionnelles pour analyser leur rôle et adapter son positionnement",
          "Identifier, interroger et réguler son implication professionnelle dans la relation d'accompagnement",
          "Appréhender les différentes représentations du corps et de l'intime pour repérer leur impact dans les interactions professionnelles",
          "Développer une approche respectueuse de la pudeur et de l'intimité des personnes",
          "Repérer pour soi et entre pairs les signes d'épuisement physique, psychique, émotionnel pour agir de manière adaptée",
        ],
      },
    ],
  },

  bc3: {
    t: "BC3 — S'inscrire dans une dynamique partenariale et territoriale en lien avec la mise en œuvre des politiques de cohésion sociale",
    h: "252h — 455h de pratique minimum",
    c: "#457B9D",
    e: "🌐",
    intro:
      "L'éducateur inscrit son intervention dans la globalité des champs professionnels requis pour la conduite de l'action. Il actualise en continu ses connaissances, développe son expertise et s'inscrit dans des coopérations partenariales et intersectorielles.",
    activites: [
      "Actualiser en continu ses connaissances dans les domaines des politiques de cohésion sociale, des besoins des populations et des pratiques d'intervention",
      "Développer des coopérations partenariales et intersectorielles permettant de coconstruire un diagnostic partagé et de travailler en réseau dans une logique de réduction des inégalités",
    ],
    comps: [
      {
        t: "Assurer une veille professionnelle et diffuser les informations de façon appropriée",
        simple:
          "Vous ne restez pas dans votre bulle. Vous vous tenez informé des évolutions législatives, des nouvelles pratiques, des recherches. Et vous partagez ces informations utilement avec votre équipe.",
        ex: "La loi change, une nouvelle RBPP est publiée. Vous la lisez, vous l'analysez, vous expliquez à l'équipe ce que ça change concrètement dans la pratique.",
        indicateurs: [
          "Identifier et mobiliser les sources d'information, les espaces et lieux ressources",
          "Recenser, sélectionner et analyser les ressources pertinentes dans son domaine de spécialité",
          "Exploiter les données recueillies pour documenter un sujet",
          "Contribuer au partage d'information",
        ],
      },
      {
        t: "Mobiliser une expertise sectorielle à partir d'un diagnostic partagé sur un territoire",
        simple:
          "Vous connaissez votre territoire — ses ressources, ses acteurs, ses problématiques. Vous contribuez à construire une analyse partagée de ce territoire avec vos partenaires.",
        ex: "Vous participez à un diagnostic territorial sur le décrochage scolaire dans votre commune. Vous apportez votre regard d'éducateur terrain, vous identifiez les jeunes à risque, vous proposez des réponses adaptées.",
        indicateurs: [
          "Appréhender les enjeux et les évolutions des politiques de cohésion sociale et territoriale",
          "Participer au repérage et à l'identification des besoins des personnes et des groupes sur un territoire",
          "Identifier et mobiliser les outils d'enquête et d'analyse adaptés à l'élaboration d'un diagnostic",
          "Mobiliser les acteurs et partager les priorités d'action avec les partenaires dans le cadre d'un diagnostic de territoire",
          "Contribuer à une connaissance partagée des problématiques d'un territoire",
          "Formaliser des préconisations argumentées aux instances décisionnaires sur le territoire",
        ],
      },
      {
        t: "Développer des dynamiques partenariales et coopérer en réseau",
        simple:
          "Vous connaissez les acteurs de votre territoire et vous construisez des partenariats durables et utiles. Vous représentez votre établissement, vous négociez, vous coopérez.",
        ex: "Pour accompagner un jeune vers l'insertion professionnelle, vous mobilisez la Mission Locale, un employeur du territoire, le CIO, l'ASE. Vous êtes le chef d'orchestre de ce réseau.",
        indicateurs: [
          "Présenter et représenter son service ou établissement auprès des partenaires du territoire",
          "Repérer les partenaires du territoire et coopérer avec les acteurs en s'appuyant sur leurs compétences spécifiques",
          "Décoder les positionnements et les enjeux entre les acteurs en présence",
          "Participer à des instances d'échanges et de coopération interinstitutionnelle",
          "Mobiliser et s'inscrire dans des réseaux professionnels et des dynamiques institutionnelles et interinstitutionnelles",
        ],
      },
      {
        t: "Intégrer les questions environnementales et de la transition écologique",
        simple:
          "Nouveau dans le référentiel 2025 ! L'éducateur spécialisé doit maintenant intégrer les enjeux écologiques dans sa pratique et accompagner les personnes dans la transition écologique.",
        ex: "Vous accompagnez un groupe de jeunes dans un projet de compostage collectif. L'objectif ? Développer leur sens des responsabilités collectives et leur compréhension des enjeux environnementaux.",
        indicateurs: [
          "Analyser les différents éléments d'une problématique commune à un groupe en intégrant les questions environnementales",
          "Repérer et analyser les conséquences de la vulnérabilité écologique sur les conditions de vie des populations",
          "Intégrer les dimensions du développement durable dans la co-construction d'un diagnostic",
          "Inscrire ses pratiques professionnelles dans une démarche écoresponsable",
          "Accompagner les personnes et les groupes dans la transition écologique",
        ],
      },
    ],
  },

  bc4: {
    t: "BC4 — S'inscrire dans un contexte professionnel du travail social",
    h: "245h — 210h de pratique minimum",
    c: "#C9A84C",
    e: "🏛️",
    intro:
      "Dans le cadre de ses missions, l'éducateur spécialisé gère ses activités professionnelles quotidiennes de manière autonome et concertée avec l'équipe. Il mobilise divers outils et techniques de communication et s'investit dans une démarche d'amélioration continue des pratiques.",
    activites: [
      "Gérer ses activités professionnelles quotidiennes de manière autonome et concertée avec l'équipe dans l'intérêt de la qualité de service",
      "Mobiliser les différents outils et techniques de communications en fonction des objectifs et des interlocuteurs visés",
    ],
    comps: [
      {
        t: "Prévoir et organiser ses activités professionnelles",
        simple:
          "Vous gérez votre travail quotidien de façon autonome et organisée — plannings, objectifs, procédures. Vous vous adaptez aux imprévus sans perdre le fil.",
        ex: "Vous gérez seul une soirée difficile quand un collègue est absent. Vous priorisez, vous décidez, vous adaptez votre planning. Le lendemain, vous transmettez tout à votre chef de service.",
        indicateurs: [
          "Définir ses objectifs de travail au quotidien et les moyens nécessaires pour les atteindre",
          "Ajuster les objectifs et les actions en fonction des aléas",
          "Élaborer des plannings d'interventions et d'activités dans le cadre de l'organisation de service",
          "Appliquer les procédures et les consignes liées à son activité professionnelle",
        ],
      },
      {
        t: "Adapter sa manière de communiquer aux enjeux des interactions professionnelles",
        simple:
          "Vous savez vous adapter dans vos communications — avec les jeunes, avec les familles, avec les partenaires, avec la hiérarchie. Votre façon de parler et d'écrire change selon les interlocuteurs.",
        ex: "Vous rédigez un rapport pour le juge des enfants — langage factuel et juridique. Vous expliquez la même situation à des parents — langage accessible et empathique. Même réalité, communication différente.",
        indicateurs: [
          "Ajuster ses modes de communication aux besoins des publics et des situations",
          "Concevoir des supports de communication écrite, orale et visuelle accessibles par tous",
          "Identifier les différents types d'écrits et savoir les élaborer",
          "Argumenter des propositions pour éclairer la prise de décision",
          "Sélectionner, analyser, synthétiser l'information afin de présenter les éléments utiles et indispensables",
          "Transmettre des informations dans le respect de la confidentialité des données et du cadre juridique",
        ],
      },
      {
        t: "Appréhender et mobiliser des outils numériques en fonction des besoins",
        simple:
          "Vous maîtrisez les outils numériques nécessaires à votre travail — logiciels, plateformes collaboratives, outils de communication. Et vous accompagnez les personnes vers l'autonomie numérique.",
        ex: "Vous aidez un jeune en insertion à créer un CV en ligne, à chercher un emploi sur des plateformes numériques, à utiliser les services publics en ligne. C'est de l'éducation numérique concrète.",
        indicateurs: [
          "Identifier les outils et les fonctionnalités bureautiques nécessaires à son activité professionnelle",
          "Distinguer les modalités de traitement des données à caractère personnel (RGPD)",
          "Prévenir, identifier et accompagner une situation de précarité ou de trouble lié au numérique",
          "Accompagner les usages des personnes vers l'autonomie numérique",
          "Identifier les enjeux liés à l'usage de l'intelligence artificielle",
          "Adopter les bonnes pratiques et les bons outils pour l'utilisation de plateformes numériques",
        ],
      },
      {
        t: "Agir en responsabilité et coopérer au sein d'une équipe professionnelle",
        simple:
          "Vous êtes un membre fiable et responsable de votre équipe. Vous participez aux décisions collectives, vous contribuez à la cohésion, vous clarifiez les responsabilités de chacun.",
        ex: "En réunion d'équipe, vous défendez votre point de vue sur la situation d'un jeune tout en respectant les décisions collectives. Vous n'êtes pas toujours d'accord — mais vous jouez le jeu de l'équipe.",
        indicateurs: [
          "Situer son action dans le cadre des missions du service, de l'établissement, de l'organisation",
          "Contribuer à la dynamique de travail et à l'élaboration en équipe des modalités de suivi, de régulation et d'évaluation",
          "Clarifier et établir les zones de responsabilité partagées et spécifiques dans le cadre d'une coopération professionnelle",
          "Confronter ses observations et ses analyses, s'appuyer sur les compétences de chacun pour favoriser la cohésion",
        ],
      },
      {
        t: "S'investir dans une démarche qualité et d'amélioration continue des pratiques",
        simple:
          "Vous participez activement à l'amélioration des pratiques de votre établissement. Vous contribuez aux évaluations, aux rapports d'activité, aux réflexions sur les évolutions nécessaires.",
        ex: "Votre établissement prépare son évaluation externe. Vous participez à l'auto-évaluation, vous documentez les bonnes pratiques, vous identifiez les axes d'amélioration. C'est votre rôle de professionnel.",
        indicateurs: [
          "Contribuer à la démarche d'évaluation continue de la qualité de service, à la création et à l'amélioration des outils d'évaluation",
          "Participer aux analyses collectives portant sur l'amélioration de l'action menée par le service ou l'établissement",
          "Participer à la rédaction de rapports d'activités",
          "Concourir à la réflexion sur les évolutions du service, de l'établissement, de l'organisation",
          "Veiller au respect des obligations fixées par le RGPD",
        ],
      },
    ],
  },
};
