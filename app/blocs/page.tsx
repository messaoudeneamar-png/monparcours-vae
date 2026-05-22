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

function BlocContent({ k }: { k: BlocKey }) {
  const bloc = BLOCS[k];
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-5 border border-border shadow-sm" style={{ backgroundColor: bloc.c + "12" }}>
        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl">{bloc.e}</span>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-foreground text-base leading-snug">{bloc.t}</h2>
            <p className="text-muted text-xs mt-1">{bloc.h}</p>
          </div>
        </div>
        <p className="text-foreground text-sm leading-relaxed">{bloc.intro}</p>
      </div>

      <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
        <h3 className="font-semibold text-foreground mb-3 text-sm">Activités principales</h3>
        <ul className="space-y-2">
          {bloc.activites.map((a, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground">
              <span className="mt-0.5 flex-shrink-0" style={{ color: bloc.c }}>▸</span>
              <span className="leading-snug">{a}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3 px-1 text-sm">
          Compétences — {bloc.comps.length} compétences
        </h3>
        <div className="space-y-2">
          {bloc.comps.map((comp, i) => (
            <Accordion key={i} title={comp.t}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: bloc.c }}>
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
