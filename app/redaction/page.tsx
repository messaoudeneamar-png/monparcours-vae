"use client";
import { useState, useEffect } from "react";
import { exportToWord, exportToPdf } from "@/lib/export";

// ── Types ──────────────────────────────────────────────────────────────────

type RdType = {
  key: string;
  label: string;
  icon: string;
};

type SavedEcrit = {
  id: string;
  type: string;
  label: string;
  text: string;
  date: string;
};

// ── Data ───────────────────────────────────────────────────────────────────

const RD_TYPES: RdType[] = [
  { key: "situation_vae", label: "Situation professionnelle VAE", icon: "📄" },
  { key: "analyse", label: "Analyse de pratique réflexive", icon: "🔍" },
  { key: "pep", label: "Projet Éducatif Personnalisé (PPE)", icon: "🎯" },
  { key: "objectifs", label: "Objectifs SMART", icon: "✅" },
  { key: "ip", label: "Information Préoccupante (IP)", icon: "⚠️" },
  { key: "signalement", label: "Signalement judiciaire", icon: "⚖️" },
  { key: "bilan", label: "Bilan social / éducatif", icon: "📊" },
  { key: "compte_rendu", label: "Compte rendu de réunion", icon: "📝" },
  { key: "transmission", label: "Note de transmission", icon: "📨" },
  { key: "rapport", label: "Rapport éducatif", icon: "📋" },
  { key: "lettre", label: "Courrier professionnel", icon: "✉️" },
  { key: "note_synthese", label: "Note de synthèse", icon: "📑" },
  { key: "entretien", label: "Compte rendu d'entretien", icon: "💬" },
  { key: "projet_collectif", label: "Projet d'action collective", icon: "🌐" },
  { key: "preconisations", label: "Note de préconisations", icon: "💡" },
  { key: "grille_eval", label: "Grille d'évaluation", icon: "📐" },
  { key: "reflexion", label: "Note de réflexion éthique", icon: "🤔" },
];

const RD_HINTS: Record<string, string> = {
  situation_vae:
    "Décrivez une situation professionnelle réelle. Incluez : contexte (structure, public, moment), votre intervention étape par étape, votre analyse réflexive, les références théoriques mobilisées, et vos préconisations.",
  analyse:
    "Décrivez la situation analysée, puis analysez : qu'avez-vous ressenti ? Qu'est-ce qui a bien fonctionné ? Qu'auriez-vous fait différemment ? Quel auteur reliez-vous à cette situation ?",
  pep:
    "Incluez : présentation de la personne (anonymisée), besoins identifiés, objectifs CT/MT/LT, actions prévues, évaluation, acteurs impliqués, date de révision.",
  objectifs:
    "Formulez des objectifs SMART (Spécifiques, Mesurables, Atteignables, Réalistes, Temporels). Distinguez objectifs à court terme (CT), moyen terme (MT) et long terme (LT).",
  ip:
    "Rédigez de manière factuelle et objective. Incluez : identité de l'enfant (anonymisée), faits observés avec dates, contexte familial, interventions déjà réalisées, niveau de danger estimé.",
  signalement:
    "Document factuel, daté, signé. Décrivez précisément les faits constatés, les éléments de danger, les mesures déjà prises. Citez l'article L226-3 du CASF et la loi 2007-293.",
  bilan:
    "Synthèse de l'accompagnement sur une période donnée. Incluez : situation initiale, évolution, objectifs atteints/non atteints, analyse des difficultés, préconisations pour la suite.",
  compte_rendu:
    "Précisez : date, lieu, participants, ordre du jour. Résumez les échanges et notez clairement les décisions prises et les actions à mener avec les responsables et délais.",
  transmission:
    "Note brève et factuelle. Destinataire clairement identifié. Faits importants, actions réalisées, suites à donner. Respectez la confidentialité (données anonymisées si nécessaire).",
  rapport:
    "Structure : présentation de la situation → éléments d'observation → analyse → préconisations. Langage professionnel, factuel, nuancé. Citez le cadre légal si pertinent.",
  lettre:
    "Précisez le destinataire, l'objet, et votre institution. Ton professionnel. Concluez par les suites attendues et vos coordonnées. Datez et signez.",
  note_synthese:
    "Synthétisez les informations essentielles d'un dossier ou d'une période. Restez factuel, hiérarchisez les informations, et terminez par une conclusion ou des préconisations.",
  entretien:
    "Date, lieu, participants. Contexte de l'entretien. Résumé des échanges en respectant la parole de la personne. Conclusions et suites prévues.",
  projet_collectif:
    "Présentation du groupe, diagnostic des besoins, objectifs du projet, actions prévues, partenaires mobilisés, budget indicatif, calendrier, modalités d'évaluation.",
  preconisations:
    "Formulez des préconisations claires, hiérarchisées et réalistes. Chaque préconisation doit être argumentée et ancrée dans l'analyse de la situation.",
  grille_eval:
    "Définissez les critères d'évaluation en lien avec les objectifs du PPE. Précisez les indicateurs observables pour chaque critère. Prévoyez une échelle d'appréciation.",
  reflexion:
    "Décrivez le dilemme éthique rencontré. Analysez les valeurs en tension (autonomie vs protection, bienveillance vs vérité...). Exposez votre raisonnement et votre décision.",
};

// ── Main Component ─────────────────────────────────────────────────────────

export default function RedactionPage() {
  const [rdType, setRdType] = useState("situation_vae");
  const [input, setInput] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [refining, setRefining] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedEcrit[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [showTypes, setShowTypes] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("vae_ecrits");
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, []);

  const currentType = RD_TYPES.find((t) => t.key === rdType) ?? RD_TYPES[0];

  const streamFetch = async (
    body: object,
    onChunk: (accumulated: string) => void,
  ): Promise<void> => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error ?? `Erreur ${res.status}`);
    }
    if (!res.body) throw new Error("Pas de réponse.");
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let acc = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      acc += decoder.decode(value, { stream: true });
      onChunk(acc);
    }
  };

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult("");
    setError("");
    try {
      await streamFetch({ type: rdType, input, context }, setResult);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const refine = async (action: "ameliorer" | "raccourcir" | "reformuler") => {
    if (!result) return;
    setRefining(action);
    setError("");
    try {
      await streamFetch(
        { type: action, input: result, context: `Type original : ${currentType.label}` },
        setResult,
      );
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur lors du retraitement.");
    } finally {
      setRefining(null);
    }
  };

  const saveEcrit = () => {
    if (!result) return;
    const ecrit: SavedEcrit = {
      id: Date.now().toString(),
      type: rdType,
      label: currentType.label,
      text: result,
      date: new Date().toLocaleDateString("fr-FR"),
    };
    const next = [ecrit, ...saved];
    setSaved(next);
    localStorage.setItem("vae_ecrits", JSON.stringify(next));
  };

  const deleteEcrit = (id: string) => {
    const next = saved.filter((e) => e.id !== id);
    setSaved(next);
    localStorage.setItem("vae_ecrits", JSON.stringify(next));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Rédaction IA</h1>
          {saved.length > 0 && (
            <button
              onClick={() => setShowSaved(!showSaved)}
              className="text-sm font-medium text-accent"
            >
              Mes écrits ({saved.length})
            </button>
          )}
        </div>
        <p className="text-muted text-sm mt-1">{"Génération assistée par l'IA pour votre VAE DEES"}</p>
      </header>

      <div className="px-4 pt-4 pb-4 space-y-4">
        {/* Type selector */}
        <div>
          <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 block">
            {"Type d'écrit"}
          </label>
          <button
            onClick={() => setShowTypes(!showTypes)}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span>{currentType.icon}</span>
              <span className="text-sm font-medium text-foreground">{currentType.label}</span>
            </div>
            <svg
              className={`w-4 h-4 text-muted transition-transform ${showTypes ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showTypes && (
            <div className="mt-1 bg-surface border border-border rounded-xl overflow-hidden shadow-lg max-h-64 overflow-y-auto">
              {RD_TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => { setRdType(t.key); setShowTypes(false); setResult(""); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-border last:border-0 transition-colors ${
                    rdType === t.key ? "bg-accent/10 text-accent" : "hover:bg-background text-foreground"
                  }`}
                >
                  <span>{t.icon}</span>
                  <span className="text-sm">{t.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hint */}
        {RD_HINTS[rdType] && (
          <div className="bg-blue/5 border border-blue/20 rounded-xl p-3">
            <p className="text-xs font-semibold text-blue mb-1">Guide</p>
            <p className="text-xs text-foreground leading-relaxed">{RD_HINTS[rdType]}</p>
          </div>
        )}

        {/* Main input */}
        <div>
          <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 block">
            Décrivez votre situation *
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Décrivez votre situation professionnelle : contexte, public, structure, ce qui s'est passé..."
            rows={6}
            inputMode="text"
            x-webkit-speech=""
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent resize-none"
          />
        </div>

        {/* Optional context */}
        <div>
          <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 block">
            Contexte supplémentaire (optionnel)
          </label>
          <input
            type="text"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Ex : MECS, jeune de 15 ans, trouble du comportement, BC1"
            inputMode="text"
            x-webkit-speech=""
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
          />
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          disabled={loading || !input.trim()}
          className="w-full py-3.5 rounded-xl bg-accent text-white font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Génération en cours...
            </>
          ) : (
            <>{"✨ Générer avec l'IA"}</>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="bg-orange/10 border border-orange/20 rounded-xl p-4">
            <p className="text-sm text-orange font-medium">{error}</p>
            <p className="text-xs text-muted mt-1">{"Vérifiez votre connexion ou la configuration de l'API."}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <p className="text-sm font-semibold text-foreground">Résultat généré</p>
              <div className="flex gap-2">
                <button
                  onClick={saveEcrit}
                  className="text-xs font-medium text-accent px-3 py-1.5 rounded-lg bg-accent/10"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={copy}
                  className="text-xs font-medium text-blue px-3 py-1.5 rounded-lg bg-blue/10"
                >
                  {copied ? "Copié !" : "Copier"}
                </button>
              </div>
            </div>

            {/* Refine buttons */}
            <div className="flex gap-2 px-5 py-3 border-b border-border overflow-x-auto scrollbar-hide">
              {[
                { key: "ameliorer" as const, label: "✨ Améliorer", cls: "text-accent bg-accent/10" },
                { key: "raccourcir" as const, label: "✂️ Raccourcir", cls: "text-blue bg-blue/10" },
                { key: "reformuler" as const, label: "🔄 Reformuler", cls: "text-orange bg-orange/10" },
              ].map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => refine(btn.key)}
                  disabled={loading || refining !== null}
                  className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg transition-opacity disabled:opacity-40 ${btn.cls}`}
                >
                  {refining === btn.key ? "..." : btn.label}
                </button>
              ))}
              <p className="text-xs text-muted self-center pl-1 flex-shrink-0">{"Retravailler avec l'IA"}</p>
            </div>

            <div className="px-5 py-4 max-h-[60vh] overflow-y-auto">
              <pre className="text-sm text-foreground leading-relaxed whitespace-pre-wrap font-sans">{result}</pre>
            </div>

            {/* Export buttons */}
            <div className="grid grid-cols-2 gap-3 px-5 py-4 border-t border-border">
              <button
                onClick={() => exportToPdf(currentType.label, result)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-orange/10 text-orange font-semibold text-sm active:opacity-80 transition-opacity"
              >
                <span>📄</span> Exporter PDF
              </button>
              <button
                onClick={() => exportToWord(currentType.label, result)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue/10 text-blue font-semibold text-sm active:opacity-80 transition-opacity"
              >
                <span>📝</span> Exporter Word
              </button>
            </div>
          </div>
        )}

        {/* Saved écrits */}
        {showSaved && saved.length > 0 && (
          <div>
            <h2 className="font-semibold text-foreground mb-3">Écrits sauvegardés</h2>
            <div className="space-y-3">
              {saved.map((ecrit) => (
                <div key={ecrit.id} className="bg-surface rounded-2xl border border-border shadow-sm p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-medium text-foreground text-sm">{ecrit.label}</p>
                      <p className="text-xs text-muted">{ecrit.date}</p>
                    </div>
                    <button
                      onClick={() => deleteEcrit(ecrit.id)}
                      className="text-xs text-orange px-2.5 py-1 rounded-lg bg-orange/10 flex-shrink-0"
                    >
                      Suppr.
                    </button>
                  </div>
                  <p className="text-xs text-muted line-clamp-3 leading-relaxed">{ecrit.text}</p>
                  <button
                    onClick={() => { setResult(ecrit.text); setRdType(ecrit.type); setShowSaved(false); window.scrollTo(0, 0); }}
                    className="mt-2 text-xs font-medium text-accent"
                  >
                    Afficher →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
