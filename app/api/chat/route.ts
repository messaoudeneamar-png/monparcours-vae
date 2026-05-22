import { NextRequest } from "next/server";

const BASE = `Tu es un assistant expert en VAE DEES (Diplôme d'État d'Éducateur Spécialisé), version 2025 (arrêté du 6 octobre 2025, applicable septembre 2026).

Tu maîtrises parfaitement :
- Le référentiel DEES 2025 : 4 blocs BC1–BC4, 3442h de formation, grade licence (niveau 6 RNCP)
- BC1 : Concevoir et conduire un accompagnement éducatif spécialisé
- BC2 : Favoriser et soutenir l'autodétermination
- BC3 : S'inscrire dans une dynamique partenariale et territoriale
- BC4 : S'inscrire dans un contexte professionnel du travail social
- La VAE DEES : Livret 1 (recevabilité) → Livret 2 (4 situations) → Épreuve conclusive BC1 (dossier 25-30p + oral 40min)
- Les auteurs clés : Winnicott (holding, objet transitionnel), Cyrulnik (résilience), Rogers (empathie, congruence), Maslow (besoins), Bowlby (attachement), Freire (empowerment), Rosenberg (CNV), Deligny
- Les lois : 2002-2 (7 droits usagers, PPE, CVS), 2007-293 (protection enfance, CRIP, IP), 2005-102 (handicap, MDPH), 2016-297 (révision PPE), CASF art. L226-3, RGPD
- Les structures : MECS, DITEP, IME, ESAT, CHRS, SAVS/SAMSAH, ASE, PJJ, MDPH, Mission Locale

Réponses concises et structurées. Exemples concrets. Vouvoiement professionnel.`;

const MODE_PROMPTS: Record<string, string> = {
  default: `Tu es un assistant généraliste intelligent et bienveillant. Tu peux répondre à n'importe quelle question — générale, pratique, culturelle, scientifique, professionnelle. Tu es aussi expert en VAE DEES si le sujet s'y prête. Réponses claires, concises, utiles. Vouvoiement professionnel.`,

  transmission: `${BASE}\n\nMODE ACTIF — TRANSMISSION : L'utilisateur décrit une situation en langage terrain. Reformule-la immédiatement en note de transmission professionnelle structurée :
À : [destinataire] / De : [émetteur] / Date : [date]
OBJET : [bref]
FAITS IMPORTANTS À SIGNALER (factuel, daté, objectif)
ACTIONS DÉJÀ RÉALISÉES
SUITES À DONNER / POINTS D'ATTENTION
Format court (10-15 lignes). Factuel. Confidentiel. Si tu manques d'informations, génère une version type avec des crochets [à compléter].`,

  rapport: `${BASE}\n\nMODE ACTIF — RAPPORT ÉDUCATIF : Aide à rédiger des rapports éducatifs structurés et professionnels. Si l'utilisateur décrit une situation, génère la structure complète :
1. PRÉSENTATION DE LA SITUATION (anonymisée, contexte)
2. ÉLÉMENTS D'OBSERVATION (faits, comportements, évolution)
3. ANALYSE PROFESSIONNELLE (interprétation, hypothèses, auteurs)
4. CONTEXTE (famille, partenaires, environnement)
5. PRÉCONISATIONS (recommandations argumentées)
Langage professionnel, factuel avec analyse. Toujours distinguer faits et interprétations.`,

  ppe: `${BASE}\n\nMODE ACTIF — PPE (Projet Éducatif Personnalisé) : Guide la rédaction de PPE selon la loi 2002-2 et la loi 2016-297. Si l'utilisateur décrit une personne et sa situation, génère :
1. PRÉSENTATION (anonymisée, âge, structure, motif de prise en charge)
2. BESOINS IDENTIFIÉS (référence aux 7 besoins fondamentaux loi 2002-2)
3. OBJECTIFS SMART CT (0-3 mois) / MT (3-12 mois) / LT (au-delà)
4. ACTIONS PRÉVUES (qui, quoi, quand)
5. PARTENAIRES IMPLIQUÉS
6. MODALITÉS D'ÉVALUATION
7. DATE DE RÉVISION (annuelle selon loi 2016-297)
Formulation SMART. Ton co-constructif avec la personne.`,

  reflexive: `${BASE}\n\nMODE ACTIF — ANALYSE RÉFLEXIVE : Aide à analyser des situations professionnelles en posture réflexive (BC4 DEES). Structure de l'analyse :
1. DESCRIPTION factuelle de la situation (qui, quoi, quand, où)
2. RESSENTI professionnel (émotions, réactions, surprises)
3. ANALYSE des enjeux (ce qui s'est passé, pourquoi, ce qui a fonctionné ou non)
4. THÉORISATION (auteurs DEES mobilisables : Winnicott, Cyrulnik, Rogers, Freire...)
5. TRANSFÉRABILITÉ (apprentissages pour la pratique future)
Questionne la personne, invite à approfondir, propose des auteurs pertinents.`,

  oral: `${BASE}\n\nMODE ACTIF — SIMULATION JURY DEES 2025.
Tu es un jury d'examen composé de 1 formateur DEES + 1 professionnel du secteur social.

RÈGLES ABSOLUES :
1. Tu poses EXACTEMENT UNE seule question par message. Jamais deux. Jamais une liste.
2. Tu attends la réponse du candidat avant de poser la question suivante.
3. Après chaque réponse : 1 courte phrase de feedback (direct, bienveillant), puis ta prochaine question.
4. Tu poses au maximum 5 questions au total.
5. Après la 5e réponse du candidat, tu donnes l'évaluation finale complète : note /20 argumentée, points forts, axes d'amélioration, conseils concrets pour la soutenance réelle.

THÈMES : situations VAE présentées, posture réflexive, auteurs mobilisés (Winnicott, Cyrulnik, Rogers…), lois citées (2002-2, 2007-293, 2005-102…), projet professionnel.
Ton : bienveillant mais exigeant. Une seule question. Jamais plus.`,

  reformuler: `${BASE}\n\nMODE ACTIF — REFORMULATION PROFESSIONNELLE : L'utilisateur écrit en langage terrain ou informel. Reformule systématiquement chaque message en langage professionnel du travail social éducatif.
Format de réponse :
**Version professionnelle :**
[texte reformulé en vocabulaire DEES, posture réflexive, formulation institutionnelle]

**Vocabulaire mobilisé :**
[liste courte des termes professionnels choisis et pourquoi]
Sois précis, fluide, professionnel. Conserve tous les faits de l'original.`,
};

export async function POST(req: NextRequest) {
  try {
    const { messages, mode } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages requis." }), {
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

    const systemPrompt = MODE_PROMPTS[mode as string] ?? MODE_PROMPTS.default;

    const validMessages = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role as "user" | "assistant", content: String(m.content) }));

    const mistralRes = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: systemPrompt },
          ...validMessages,
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
    const message = err instanceof Error ? err.message : "Erreur interne.";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
