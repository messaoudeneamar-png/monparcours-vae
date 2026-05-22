"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Situation = { id: string; blocs: string[]; titre: string; date: string };
type Ecrit = { id: string; type: string; label: string; date: string };

const BLOCS = ["BC1", "BC2", "BC3", "BC4"] as const;
const BLOC_LABELS: Record<string, string> = {
  BC1: "Accompagnement éducatif",
  BC2: "Autodétermination",
  BC3: "Partenariat territorial",
  BC4: "Contexte professionnel",
};
const BLOC_COLORS: Record<string, string> = {
  BC1: "#2D6A4F",
  BC2: "#457B9D",
  BC3: "#E76F51",
  BC4: "#C9A84C",
};

function getMotivation(pct: number): string {
  if (pct === 0) return "Commencez dès maintenant — chaque situation vous rapproche du diplôme !";
  if (pct < 25) return "Vous démarrez votre parcours VAE — chaque situation compte !";
  if (pct < 50) return "Bon début ! Continuez à décrire vos situations professionnelles.";
  if (pct < 75) return "Vous avancez bien ! Encore un effort pour finaliser votre dossier.";
  if (pct < 100) return "Presque prêt ! Affinez vos situations et entraînez-vous au jury.";
  return "Excellent ! Vous êtes prêt pour votre soutenance VAE DEES 2025.";
}

export default function AccueilPage() {
  const [sits, setSits] = useState<Situation[]>([]);
  const [ecrits, setEcrits] = useState<Ecrit[]>([]);
  const [quizBest, setQuizBest] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem("vae_sits");
      if (s) setSits(JSON.parse(s));
      const e = localStorage.getItem("vae_ecrits");
      if (e) setEcrits(JSON.parse(e));
      const q = localStorage.getItem("vae_quiz_best_pct");
      if (q) setQuizBest(parseInt(q, 10));
    } catch {}
    setMounted(true);
  }, []);

  const blocProgress = BLOCS.map((b) => ({
    bloc: b,
    count: sits.filter((s) => s.blocs.includes(b)).length,
    pct: sits.some((s) => s.blocs.includes(b)) ? 100 : 0,
  }));

  const completedBlocs = blocProgress.filter((b) => b.pct === 100).length;
  const globalPct = Math.round((completedBlocs / 4) * 100);
  const totalDocs = sits.length + ecrits.length;
  const motivation = getMotivation(globalPct);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background px-4 pt-8 pb-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Bonjour 👋</h1>
        <p className="text-muted text-sm mt-1.5">Votre parcours VAE DEES 2025</p>
      </header>

      <div className="space-y-5">
        {/* Global progress card */}
        <div className="bg-surface rounded-2xl p-5 border border-border shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">Progression globale</h2>
            <span className="font-bold text-lg text-accent">{globalPct}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-2.5 mb-3">
            <div
              className="h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${globalPct}%`, backgroundColor: "rgb(var(--accent))" }}
            />
          </div>
          <p className="text-muted text-xs">{completedBlocs} / 4 blocs complétés</p>
          <div className="mt-3 bg-accent/8 rounded-xl px-3 py-2.5 border border-accent/15">
            <p className="text-xs text-accent font-medium leading-snug">{motivation}</p>
          </div>
        </div>

        {/* BC1–BC4 progress bars */}
        <div className="bg-surface rounded-2xl p-5 border border-border shadow-card">
          <h2 className="font-semibold text-foreground mb-5">Blocs de compétences</h2>
          <div className="space-y-5">
            {blocProgress.map(({ bloc, pct, count }) => (
              <div key={bloc}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-md text-white"
                      style={{ backgroundColor: BLOC_COLORS[bloc] }}
                    >
                      {bloc}
                    </span>
                    <span className="text-xs text-muted">{BLOC_LABELS[bloc]}</span>
                  </div>
                  <span className="text-xs font-semibold" style={{ color: BLOC_COLORS[bloc] }}>
                    {count > 0 ? `${count} sit.` : "—"}
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: BLOC_COLORS[bloc] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <Link href="/plus" className="card-lift bg-surface rounded-2xl p-4 border border-border shadow-card text-center">
            <p className="text-2xl font-extrabold text-accent">{sits.length}</p>
            <p className="text-xs text-muted mt-1">Situation{sits.length !== 1 ? "s" : ""}</p>
          </Link>
          <Link href="/docs" className="card-lift bg-surface rounded-2xl p-4 border border-border shadow-card text-center">
            <p className="text-2xl font-extrabold text-blue">{ecrits.length}</p>
            <p className="text-xs text-muted mt-1">Écrit{ecrits.length !== 1 ? "s" : ""}</p>
          </Link>
          <Link href="/plus" className="card-lift bg-surface rounded-2xl p-4 border border-border shadow-card text-center">
            <p className="text-2xl font-extrabold text-orange">{quizBest > 0 ? `${quizBest}%` : "—"}</p>
            <p className="text-xs text-muted mt-1">Quiz best</p>
          </Link>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/redaction" className="card-lift bg-accent/10 rounded-2xl p-5 border border-accent/20">
            <div className="w-10 h-10 bg-accent rounded-xl mb-3 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
              </svg>
            </div>
            <p className="text-sm font-bold text-foreground">Rédiger</p>
            <p className="text-xs text-muted mt-0.5">Écrits VAE assistés IA</p>
          </Link>
          <Link href="/chat" className="card-lift bg-blue/10 rounded-2xl p-5 border border-blue/20">
            <div className="w-10 h-10 bg-blue rounded-xl mb-3 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <p className="text-sm font-bold text-foreground">Copilote IA</p>
            <p className="text-xs text-muted mt-0.5">Posez vos questions VAE</p>
          </Link>
        </div>

        {/* Recent docs */}
        {totalDocs > 0 && (
          <div className="bg-surface rounded-2xl p-5 border border-border shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Derniers documents</h2>
              <Link href="/docs" className="text-xs text-accent font-semibold">Tout voir →</Link>
            </div>
            <div className="space-y-1">
              {[
                ...sits.slice(-2).map((s) => ({ id: s.id, label: s.titre, sub: `Situation · ${s.date}`, icon: "📝" })),
                ...ecrits.slice(-2).map((e) => ({ id: e.id, label: e.label, sub: `${e.type} · ${e.date}`, icon: "📄" })),
              ]
                .slice(-3)
                .map((doc) => (
                  <div key={doc.id} className="flex items-center gap-3 py-2.5">
                    <span className="text-lg">{doc.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{doc.label}</p>
                      <p className="text-xs text-muted">{doc.sub}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {totalDocs === 0 && (
          <div className="bg-surface rounded-2xl p-8 border border-border shadow-card text-center">
            <p className="text-4xl mb-3">📂</p>
            <p className="font-bold text-foreground mb-1">Aucune activité pour le moment</p>
            <p className="text-xs text-muted">Créez votre première situation ou rédigez un écrit VAE</p>
          </div>
        )}
      </div>
    </div>
  );
}
