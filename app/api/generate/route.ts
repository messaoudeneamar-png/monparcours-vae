import { NextRequest } from "next/server";

const TYPE_INSTRUCTIONS: Record<string, string> = {
  situation_vae: `Rédigez une situation professionnelle VAE pour le DEES selon la structure officielle :
1. CONTEXTE : structure, type de public, moment, professionnels présents
2. LA SITUATION : description factuelle et chronologique
3. MON INTERVENTION : actions menées étape par étape (à la 1re personne)
4. ANALYSE RÉFLEXIVE : pourquoi ces choix, ce que ça révèle de ma pratique
5. RÉFÉRENCES THÉORIQUES : 2-3 auteurs avec concepts reliés à la situation
6. CADRE LÉGISLATIF : 1-2 lois applicables avec leur impact concret
7. PRÉCONISATIONS : améliorations et suites à l'accompagnement
Rédigez entre 4 et 6 pages équivalent (environ 1500-2000 mots). Première personne. Ton professionnel et réflexif.`,

  analyse: `Rédigez une analyse de pratique réflexive selon le format :
1. DESCRIPTION : situation analysée, faits, chronologie
2. RESSENTI : émotions, réactions de la professionnelle
3. ANALYSE : ce qui s'est passé, les enjeux, ce qui a fonctionné ou non
4. THÉORISATION : auteurs et concepts mobilisés (Winnicott, Cyrulnik, Rogers...)
5. TRANSFÉRABILITÉ : ce que j'en retire pour ma pratique future
Première personne. Ton réflexif et honnête.`,

  pep: `Rédigez un Projet Éducatif Personnalisé (PPE) structuré :
1. PRÉSENTATION DE LA PERSONNE (anonymisée)
2. BESOINS IDENTIFIÉS (loi 2002-2 : 7 besoins fondamentaux)
3. OBJECTIFS CT (0-3 mois) / MT (3-12 mois) / LT (au-delà)
4. ACTIONS PRÉVUES avec responsables et délais
5. PARTENAIRES IMPLIQUÉS
6. MODALITÉS D'ÉVALUATION
7. DATE DE RÉVISION
Formulation SMART des objectifs. Ton co-constructif.`,

  objectifs: `Formulez des objectifs SMART selon :
- Spécifique : précis et concret
- Mesurable : indicateurs chiffrés ou observables
- Atteignable : réaliste pour la personne
- Réaliste : moyens disponibles
- Temporel : échéance définie
Proposez 3 objectifs CT (court terme), 2 MT, 1 LT avec pour chacun les indicateurs d'évaluation.`,

  ip: `Rédigez une Information Préoccupante (IP) selon les exigences légales (art. L226-3 CASF, loi 2007-293) :
1. IDENTITÉ DE L'ENFANT (à anonymiser)
2. FAITS OBSERVÉS : description précise, objective, datée
3. CONTEXTE FAMILIAL ET SOCIAL
4. INTERVENTIONS DÉJÀ RÉALISÉES
5. ÉVALUATION DU NIVEAU DE DANGER (immédiat, potentiel, cumulatif)
6. DEMANDE : ce que vous attendez de la CRIP
Ton factuel, neutre. Pas d'interprétation, que des faits observables.`,

  signalement: `Rédigez un signalement judiciaire selon le cadre légal :
Structure : en-tête institutionnel → identité du mineur (anonymisée) → faits constatés (avec dates) → éléments de danger → mesures déjà prises → demande au Procureur.
Citez : art. L226-3 CASF, loi 2007-293, loi 2016-297.
Ton très factuel, administratif. Chaque affirmation doit être étayée.`,

  bilan: `Rédigez un bilan social/éducatif structuré :
1. SITUATION INITIALE : contexte lors de la prise en charge
2. PÉRIODE COUVERTE
3. ÉVOLUTION OBSERVÉE (comportement, autonomie, relations)
4. OBJECTIFS ATTEINTS / EN COURS / NON ATTEINTS (avec explication)
5. ANALYSE DES DIFFICULTÉS RENCONTRÉES
6. PRÉCONISATIONS POUR LA SUITE
Ton professionnel, factuel avec nuance. Valoriser les progrès.`,

  compte_rendu: `Rédigez un compte rendu de réunion :
Date et lieu — Participants — Objet de la réunion.
Pour chaque point de l'ordre du jour : synthèse des échanges → décision prise → action à mener (qui, quand).
Conclusion : prochaine réunion prévue.
Ton neutre, factuel. Refléter fidèlement les échanges sans les déformer.`,

  transmission: `Rédigez une note de transmission concise et professionnelle :
À : [destinataire] — De : [émetteur] — Date
OBJET : [bref]
FAITS IMPORTANTS À SIGNALER
ACTIONS DÉJÀ RÉALISÉES
SUITES À DONNER / POINTS D'ATTENTION
Format court (10-15 lignes max). Factuel. Respectez la confidentialité.`,

  rapport: `Rédigez un rapport éducatif structuré :
1. PRÉSENTATION DE LA SITUATION (anonymisée, contexte)
2. ÉLÉMENTS D'OBSERVATION : faits, comportements, évolution
3. ANALYSE : interprétation professionnelle, hypothèses
4. ÉLÉMENTS DE CONTEXTE (famille, partenaires)
5. PRÉCONISATIONS : recommandations argumentées
Langage professionnel, factuel avec analyse. Distinguer faits et interprétations.`,

  lettre: `Rédigez un courrier professionnel :
En-tête (institution) — Destinataire — Date
Objet : [bref et précis]
Corps : introduction → exposé → demande/information → conclusion
Formule de politesse professionnelle — Signature
Ton formel mais accessible. Clair et concis.`,

  note_synthese: `Rédigez une note de synthèse :
1. OBJET DE LA NOTE
2. ÉLÉMENTS ESSENTIELS (hiérarchisés par importance)
3. ANALYSE
4. CONCLUSION / PRÉCONISATIONS
Format synthétique : aller à l'essentiel. 1-2 pages équivalent.`,

  entretien: `Rédigez un compte rendu d'entretien :
Date — Lieu — Participants — Contexte (pourquoi cet entretien)
RÉSUMÉ DES ÉCHANGES (en respectant la parole de la personne)
POINTS IMPORTANTS SOULEVÉS
CONCLUSION ET SUITES PRÉVUES
Préserver la parole de la personne. Ton neutre et respectueux.`,

  projet_collectif: `Rédigez un projet d'action collective :
1. PRÉSENTATION DU GROUPE ET DU CONTEXTE
2. DIAGNOSTIC DES BESOINS (observations, concertation)
3. OBJECTIFS DU PROJET (SMART)
4. ACTIONS PRÉVUES (avec calendrier)
5. PARTENAIRES ET RESSOURCES MOBILISÉS
6. BUDGET PRÉVISIONNEL INDICATIF
7. MODALITÉS D'ÉVALUATION
Montrez la co-construction avec le groupe. Référence à BC3 (partenariat, territoire).`,

  preconisations: `Rédigez une note de préconisations :
1. RAPPEL DE LA SITUATION
2. ANALYSE DES BESOINS
3. PRÉCONISATIONS (numérotées, hiérarchisées) :
   - Préconisation → Arguments → Acteurs concernés → Délai
4. CONCLUSION
Chaque préconisation doit être argumentée, réaliste et ancrée dans l'analyse.`,

  grille_eval: `Créez une grille d'évaluation :
En-tête : nom (anonymisé), date, évaluateur, période.
Tableau pour chaque objectif du PPE :
— Objectif | Indicateurs observables | Évaluation (atteint/en cours/non atteint) | Commentaires
Conclusion avec préconisations.`,

  reflexion: `Rédigez une note de réflexion éthique :
1. DESCRIPTION DE LA SITUATION (dilemme éthique)
2. VALEURS EN TENSION : quelles valeurs s'affrontent ? (autonomie vs protection, vérité vs bienveillance...)
3. RAISONNEMENT ÉTHIQUE : analyse des enjeux, consultation de collègues/supervision
4. DÉCISION PRISE ET JUSTIFICATION
5. QUESTIONNEMENT RÉSIDUEL : ce qui reste en suspens
Première personne. Ton réflexif et honnête sur les incertitudes.`,

  ameliorer: `Tu reçois un écrit professionnel VAE DEES. Améliore-le en :
- Enrichissant l'analyse réflexive (posture BC4) avec plus de profondeur
- Ajoutant ou précisant des références théoriques (auteurs avec concepts reliés)
- Renforçant les liens avec le cadre législatif pertinent
- Approfondissant les préconisations avec des pistes concrètes
- Améliorant la fluidité, le style professionnel et la précision du vocabulaire
Garde la même structure et les mêmes faits. Produis la version améliorée complète, prête à l'emploi.`,

  raccourcir: `Tu reçois un écrit professionnel VAE DEES. Raccourcis-le de 30 à 40% en :
- Conservant les éléments essentiels : faits clés, analyse, références théoriques, préconisations
- Éliminant les répétitions et les développements secondaires
- Resserrant les formulations sans perdre le sens professionnel
- Maintenant la structure et les points forts
Produis la version condensée complète, prête à l'emploi.`,

  reformuler: `Tu reçois un écrit professionnel VAE DEES. Reformule-le intégralement en :
- Conservant exactement le même contenu, les mêmes faits et les mêmes références
- Variant le vocabulaire professionnel et les tournures de phrases
- Modifiant la structure des paragraphes tout en gardant la logique globale
- Maintenant un style professionnel, réflexif et à la première personne
Produis la version reformulée complète, prête à l'emploi.`,
};

const SYSTEM_PROMPT = `Tu es un expert en travail social spécialisé dans le DEES (Diplôme d'État d'Éducateur Spécialisé) et la VAE (Validation des Acquis de l'Expérience).

Tu maîtrises parfaitement :
- Le référentiel DEES 2025 (arrêté du 6 octobre 2025, applicable sept. 2026) : 4 blocs BC1-BC4
- Les auteurs clés : Winnicott (holding), Cyrulnik (résilience), Rogers (écoute active), Maslow (besoins), Bowlby (attachement), Freire (empowerment), Rosenberg (CNV), Deligny
- Les lois fondamentales : 2002-2, 2007-293, 2005-102, 2016-297, CASF art. L226-3, RBPP HAS, RGPD
- Les structures : MECS, DITEP, IME, ESAT, CHRS, SAVS/SAMSAH, ASE, PJJ, MDPH, Mission Locale
- Les outils : PPE, IP, signalement, analyse de pratique, posture réflexive, objectifs SMART

Ta mission : aider le candidat à produire des écrits professionnels de qualité pour sa VAE DEES.

Principes :
- Rédige toujours à la première personne (je, j'ai, j'ai mis en œuvre...)
- Utilise un vocabulaire professionnel du travail social
- Intègre des références théoriques et législatives de manière naturelle
- Montrez la posture réflexive : analyse des choix, apprentissages, questionnements
- Respecte la confidentialité (pas de nom réel, anonymisation)
- Adapte le niveau de détail au type d'écrit demandé

Si l'utilisateur donne peu d'informations, crée un exemple réaliste et professionnel basé sur ce qui est fourni.`;

export async function POST(req: NextRequest) {
  try {
    const { type, input, context } = await req.json();

    if (!input?.trim()) {
      return new Response(JSON.stringify({ error: "Le champ 'situation' est requis." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Clé MISTRAL_API_KEY non configurée." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const typeInstruction = TYPE_INSTRUCTIONS[type] ?? TYPE_INSTRUCTIONS["situation_vae"];
    const userMessage = `TYPE D'ÉCRIT : ${type}
${context ? `CONTEXTE SUPPLÉMENTAIRE : ${context}\n` : ""}
SITUATION DÉCRITE PAR LE CANDIDAT :
${input}

---
${typeInstruction}`;

    const mistralRes = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
        stream: true,
      }),
    });

    if (!mistralRes.ok) {
      const errText = await mistralRes.text();
      return new Response(
        JSON.stringify({ error: `Erreur Mistral ${mistralRes.status}: ${errText}` }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = mistralRes.body!.getReader();
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const data = trimmed.slice(5).trim();
              if (data === "[DONE]") {
                controller.close();
                return;
              }
              try {
                const json = JSON.parse(data);
                const delta = json.choices?.[0]?.delta?.content;
                if (typeof delta === "string" && delta) {
                  controller.enqueue(encoder.encode(delta));
                }
              } catch {
                // chunk malformé, on ignore
              }
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur interne du serveur.";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
