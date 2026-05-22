"use client";
import { useState, useEffect, useCallback } from "react";
import { QUIZ, ORAL, PLANNING } from "@/lib/data";
import type { QuizItem, PlanningItem } from "@/lib/data";

// ── Types ──────────────────────────────────────────────────────────────────

type Tab = "situations" | "quiz" | "oral" | "planning" | "livrets";

type Situation = {
  id: string;
  titre: string;
  struct: string;
  desc: string;
  blocs: string[];
  date: string;
};

type QuizPhase = "home" | "playing" | "done";

type QuizState = {
  phase: QuizPhase;
  cat: string;
  questions: QuizItem[];
  idx: number;
  score: number;
  selected: number | null;
  showResult: boolean;
};

// ── Helpers ────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QUIZ_CATS = ["Tout", "BC1", "BC2", "BC3", "BC4", "lois", "structures", "auteurs"];
const BLOC_OPTS = ["BC1", "BC2", "BC3", "BC4"];
const STRUCT_OPTS = ["MECS", "DITEP", "IME", "ESAT", "CHRS", "SAVS", "ASE", "PJJ", "MDPH"];

// ── SituationsTab ──────────────────────────────────────────────────────────

function SituationsTab() {
  const [sits, setSits] = useState<Situation[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Situation | null>(null);
  const [form, setForm] = useState<Omit<Situation, "id" | "date">>({
    titre: "",
    struct: "",
    desc: "",
    blocs: [],
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("vae_sits");
      if (raw) setSits(JSON.parse(raw));
    } catch {}
  }, []);

  const save = useCallback((next: Situation[]) => {
    setSits(next);
    localStorage.setItem("vae_sits", JSON.stringify(next));
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ titre: "", struct: "", desc: "", blocs: [] });
    setShowModal(true);
  };

  const openEdit = (sit: Situation) => {
    setEditing(sit);
    setForm({ titre: sit.titre, struct: sit.struct, desc: sit.desc, blocs: sit.blocs });
    setShowModal(true);
  };

  const submit = () => {
    if (!form.titre.trim()) return;
    if (editing) {
      save(sits.map((s) => (s.id === editing.id ? { ...editing, ...form } : s)));
    } else {
      save([
        ...sits,
        { id: Date.now().toString(), date: new Date().toLocaleDateString("fr-FR"), ...form },
      ]);
    }
    setShowModal(false);
  };

  const del = (id: string) => {
    if (confirm("Supprimer cette situation ?")) save(sits.filter((s) => s.id !== id));
  };

  const toggleBloc = (b: string) => {
    setForm((f) => ({
      ...f,
      blocs: f.blocs.includes(b) ? f.blocs.filter((x) => x !== b) : [...f.blocs, b],
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{sits.length} situation{sits.length !== 1 ? "s" : ""} enregistrée{sits.length !== 1 ? "s" : ""}</p>
        <button
          onClick={openNew}
          className="bg-accent text-white text-sm font-medium px-4 py-2 rounded-xl active:opacity-80"
        >
          + Nouvelle
        </button>
      </div>

      {sits.length === 0 ? (
        <div className="bg-surface rounded-2xl p-8 border border-border text-center">
          <p className="text-4xl mb-3">📝</p>
          <p className="font-semibold text-foreground mb-1">Aucune situation</p>
          <p className="text-sm text-muted mb-4">Décrivez vos situations professionnelles VAE ici</p>
          <button onClick={openNew} className="bg-accent text-white text-sm font-medium px-5 py-2.5 rounded-xl">
            Créer ma première situation
          </button>
        </div>
      ) : (
        sits.map((sit) => (
          <div key={sit.id} className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground leading-snug">{sit.titre}</p>
                {sit.struct && <p className="text-xs text-muted mt-0.5">{sit.struct} · {sit.date}</p>}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(sit)} className="text-xs text-blue font-medium px-2.5 py-1 rounded-lg bg-blue/10">
                  Modifier
                </button>
                <button onClick={() => del(sit.id)} className="text-xs text-orange font-medium px-2.5 py-1 rounded-lg bg-orange/10">
                  Suppr.
                </button>
              </div>
            </div>
            {sit.blocs.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {sit.blocs.map((b) => (
                  <span key={b} className="text-xs font-medium text-white px-2 py-0.5 rounded-full bg-accent">{b}</span>
                ))}
              </div>
            )}
            {sit.desc && (
              <p className="text-sm text-muted leading-relaxed line-clamp-3">{sit.desc}</p>
            )}
          </div>
        ))
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div className="relative w-full bg-surface rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="font-bold text-foreground text-lg mb-5">
              {editing ? "Modifier la situation" : "Nouvelle situation"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">Titre *</label>
                <input
                  type="text"
                  value={form.titre}
                  onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))}
                  placeholder="Ex : Gestion d'une crise en MECS"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">Structure</label>
                <div className="flex flex-wrap gap-2">
                  {STRUCT_OPTS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setForm((f) => ({ ...f, struct: f.struct === s ? "" : s }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        form.struct === s
                          ? "bg-accent text-white border-accent"
                          : "bg-surface text-muted border-border"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">Blocs concernés</label>
                <div className="flex gap-2">
                  {BLOC_OPTS.map((b) => (
                    <button
                      key={b}
                      onClick={() => toggleBloc(b)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        form.blocs.includes(b)
                          ? "bg-accent text-white border-accent"
                          : "bg-surface text-muted border-border"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">Description</label>
                <textarea
                  value={form.desc}
                  onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                  placeholder="Décrivez la situation : contexte, intervention, analyse..."
                  rows={5}
                  inputMode="text"
                  x-webkit-speech=""
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl border border-border text-sm font-medium text-muted"
                >
                  Annuler
                </button>
                <button
                  onClick={submit}
                  disabled={!form.titre.trim()}
                  className="flex-1 py-3 rounded-xl bg-accent text-white text-sm font-medium disabled:opacity-50"
                >
                  {editing ? "Enregistrer" : "Créer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── QuizTab ────────────────────────────────────────────────────────────────

const INITIAL_QUIZ: QuizState = {
  phase: "home",
  cat: "Tout",
  questions: [],
  idx: 0,
  score: 0,
  selected: null,
  showResult: false,
};

function QuizTab() {
  const [state, setState] = useState<QuizState>(INITIAL_QUIZ);

  const start = (cat: string) => {
    const pool = cat === "Tout" ? QUIZ : QUIZ.filter((q) => q.c === cat);
    const questions = shuffle(pool).slice(0, Math.min(10, pool.length));
    setState({ phase: "playing", cat, questions, idx: 0, score: 0, selected: null, showResult: false });
  };

  const select = (i: number) => {
    if (state.selected !== null) return;
    const correct = state.questions[state.idx].a === i;
    setState((s) => ({
      ...s,
      selected: i,
      showResult: true,
      score: correct ? s.score + 1 : s.score,
    }));
  };

  const next = () => {
    const nextIdx = state.idx + 1;
    if (nextIdx >= state.questions.length) {
      setState((s) => ({ ...s, phase: "done" }));
    } else {
      setState((s) => ({ ...s, idx: nextIdx, selected: null, showResult: false }));
    }
  };

  if (state.phase === "home") {
    return (
      <div className="space-y-4">
        <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
          <p className="font-semibold text-foreground mb-1">Quiz VAE — DEES</p>
          <p className="text-sm text-muted">54 questions pour tester vos connaissances. Choisissez une catégorie ou lancez tout.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {QUIZ_CATS.map((cat) => {
            const count = cat === "Tout" ? QUIZ.length : QUIZ.filter((q) => q.c === cat).length;
            return (
              <button
                key={cat}
                onClick={() => start(cat)}
                className="bg-surface rounded-2xl p-4 border border-border shadow-sm text-left active:bg-border/30 transition-colors"
              >
                <p className="font-semibold text-foreground text-sm">{cat}</p>
                <p className="text-xs text-muted mt-0.5">{count} question{count !== 1 ? "s" : ""}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (state.phase === "done") {
    const pct = Math.round((state.score / state.questions.length) * 100);
    const msg =
      pct >= 80 ? "Excellent travail !" : pct >= 60 ? "Bon résultat, continuez !" : "Entraînez-vous encore !";
    return (
      <div className="space-y-4">
        <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm text-center">
          <p className="text-5xl mb-3">{pct >= 80 ? "🎉" : pct >= 60 ? "👍" : "💪"}</p>
          <p className="font-bold text-foreground text-2xl mb-1">{state.score}/{state.questions.length}</p>
          <p className="text-muted text-sm mb-1">{pct}% de réussite</p>
          <p className="font-medium text-foreground">{msg}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => start(state.cat)}
            className="flex-1 py-3 rounded-xl bg-accent text-white text-sm font-medium"
          >
            Recommencer
          </button>
          <button
            onClick={() => setState(INITIAL_QUIZ)}
            className="flex-1 py-3 rounded-xl border border-border text-sm font-medium text-muted"
          >
            Menu
          </button>
        </div>
      </div>
    );
  }

  const q = state.questions[state.idx];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted">
          {state.idx + 1} / {state.questions.length}
        </span>
        <span className="text-xs font-medium text-accent">{state.cat}</span>
        <button onClick={() => setState(INITIAL_QUIZ)} className="text-xs text-muted">
          Quitter
        </button>
      </div>

      <div className="w-full bg-border rounded-full h-1.5">
        <div
          className="bg-accent h-1.5 rounded-full transition-all"
          style={{ width: `${((state.idx) / state.questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
        <p className="font-semibold text-foreground leading-snug">{q.q}</p>
      </div>

      <div className="space-y-2">
        {q.o.map((opt, i) => {
          let cls = "border-border text-foreground";
          if (state.selected !== null) {
            if (i === q.a) cls = "border-accent bg-accent/10 text-accent";
            else if (i === state.selected) cls = "border-orange bg-orange/10 text-orange";
            else cls = "border-border text-muted";
          }
          return (
            <button
              key={i}
              onClick={() => select(i)}
              className={`w-full text-left p-4 rounded-xl border text-sm transition-colors ${cls}`}
            >
              <span className="font-medium mr-2">{["A", "B", "C", "D"][i]}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {state.showResult && (
        <>
          <div className={`rounded-2xl p-4 ${state.selected === q.a ? "bg-accent/10" : "bg-orange/10"}`}>
            <p className={`text-xs font-bold mb-1 ${state.selected === q.a ? "text-accent" : "text-orange"}`}>
              {state.selected === q.a ? "✓ Bonne réponse !" : "✗ Mauvaise réponse"}
            </p>
            <p className="text-sm text-foreground leading-relaxed">{q.e}</p>
          </div>
          <button
            onClick={next}
            className="w-full py-3 rounded-xl bg-accent text-white text-sm font-medium"
          >
            {state.idx + 1 < state.questions.length ? "Question suivante →" : "Voir les résultats"}
          </button>
        </>
      )}
    </div>
  );
}

// ── OralTab ────────────────────────────────────────────────────────────────

function OralTab() {
  const cats = Array.from(new Set(ORAL.map((o) => o.cat)));
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm">
        <p className="text-sm text-foreground leading-relaxed">
          {ORAL.length} questions types du jury. Entraînez-vous à répondre à voix haute.
        </p>
      </div>
      {cats.map((cat) => (
        <div key={cat}>
          <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 px-1">{cat}</p>
          <div className="space-y-2">
            {ORAL.filter((o) => o.cat === cat).map((item, i) => {
              const globalIdx = ORAL.indexOf(item);
              const open = openIdx === globalIdx;
              return (
                <div key={i} className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                  <button
                    onClick={() => setOpenIdx(open ? null : globalIdx)}
                    className="w-full flex items-start justify-between p-4 text-left active:bg-border/30 transition-colors"
                  >
                    <p className="font-medium text-foreground text-sm pr-3 leading-snug">{item.q}</p>
                    <svg
                      className={`w-4 h-4 text-muted flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {open && (
                    <div className="px-4 pb-4 pt-1 border-t border-border">
                      <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Conseil du jury</p>
                      <p className="text-sm text-foreground leading-relaxed">{item.h}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── PlanningTab ────────────────────────────────────────────────────────────

function PlanningTab() {
  return (
    <div className="space-y-3">
      <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm">
        <p className="text-sm text-foreground leading-relaxed">
          Calendrier indicatif de votre parcours VAE DEES — arrêté du 6 octobre 2025.
        </p>
      </div>
      <div className="relative pl-6">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />
        {PLANNING.map((item: PlanningItem, i) => (
          <div key={i} className="relative mb-4 last:mb-0">
            <div
              className="absolute -left-3.5 w-3 h-3 rounded-full border-2 border-surface mt-1.5"
              style={{ backgroundColor: item.col }}
            />
            <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm">
              <p className="text-xs font-semibold mb-0.5" style={{ color: item.col }}>{item.d}</p>
              <p className="font-semibold text-foreground text-sm mb-1">{item.t}</p>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── LivretsTab ─────────────────────────────────────────────────────────────

const LIVRETS = [
  {
    t: "Livret 1 — Recevabilité",
    col: "#457B9D",
    icon: "📋",
    items: [
      "Présentation de votre parcours professionnel",
      "Justificatifs : contrats de travail, fiches de paie, attestations",
      "Vérification des 1 an (temps plein) ou 3 ans (temps partiel) d'expérience",
      "Lettre de motivation expliquant votre candidature VAE",
      "Délai de traitement : 2 à 3 mois après dépôt",
    ],
  },
  {
    t: "Livret 2 — Situations professionnelles",
    col: "#E76F51",
    icon: "📒",
    items: [
      "4 situations, une par bloc (BC1, BC2, BC3, BC4)",
      "3 à 6 pages par situation (+ annexes)",
      "Structure : contexte → intervention → analyse → références → préconisations",
      "Rédigez à la 1re personne avec 'je'",
      "Citez au moins 2 auteurs et 2 lois par situation",
      "Délai de rédaction : 4 à 6 mois minimum recommandé",
    ],
  },
  {
    t: "Épreuve conclusive BC1",
    col: "#2D6A4F",
    icon: "🎤",
    items: [
      "Dossier BC1 : 25 à 30 pages (coefficient 2)",
      "Soutenance : 40 minutes devant le jury",
      "— 10 à 15 min : présentation libre par le candidat",
      "— 25 à 30 min : questions du jury",
      "Jury : 1 formateur DEES + 1 professionnel du secteur",
      "Résultat : validation totale ou partielle",
    ],
  },
  {
    t: "Validation partielle",
    col: "#C9A84C",
    icon: "⚡",
    items: [
      "Si un ou plusieurs blocs ne sont pas validés",
      "Vous avez 5 ans pour compléter votre DEES",
      "Seuls les blocs non validés doivent être représentés",
      "Les blocs validés sont acquis définitivement",
    ],
  },
];

function LivretsTab() {
  return (
    <div className="space-y-4">
      {LIVRETS.map((section, i) => (
        <div key={i} className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{section.icon}</span>
            <h3 className="font-semibold text-foreground text-sm leading-snug">{section.t}</h3>
          </div>
          <ul className="space-y-2">
            {section.items.map((item, j) => (
              <li key={j} className="flex gap-2 text-sm text-foreground">
                <span className="flex-shrink-0 mt-0.5" style={{ color: section.col }}>▸</span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

const TABS: { key: Tab; label: string }[] = [
  { key: "situations", label: "Situations" },
  { key: "quiz", label: "Quiz" },
  { key: "oral", label: "Oral" },
  { key: "planning", label: "Planning" },
  { key: "livrets", label: "Livrets" },
];

export default function PlusPage() {
  const [tab, setTab] = useState<Tab>("situations");

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border px-4 pt-6 pb-0">
        <h1 className="text-2xl font-bold text-foreground mb-4">Outils VAE</h1>
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === t.key
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="px-4 pt-4 pb-4">
        {tab === "situations" && <SituationsTab />}
        {tab === "quiz" && <QuizTab />}
        {tab === "oral" && <OralTab />}
        {tab === "planning" && <PlanningTab />}
        {tab === "livrets" && <LivretsTab />}
      </div>
    </div>
  );
}
