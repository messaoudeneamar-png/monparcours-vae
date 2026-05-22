"use client";
import { useState, useEffect } from "react";
import { exportToWord, exportToPdf } from "@/lib/export";

type SavedEcrit = { id: string; type: string; label: string; text: string; date: string };
type Situation = { id: string; titre: string; struct: string; desc: string; blocs: string[]; date: string };

type DocItem = { kind: "ecrit"; data: SavedEcrit } | { kind: "sit"; data: Situation };

const FILTERS = ["Tout", "Situations", "Écrits"] as const;
type Filter = (typeof FILTERS)[number];

export default function DocsPage() {
  const [ecrits, setEcrits] = useState<SavedEcrit[]>([]);
  const [sits, setSits] = useState<Situation[]>([]);
  const [filter, setFilter] = useState<Filter>("Tout");
  const [search, setSearch] = useState("");
  const [exporting, setExporting] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const e = localStorage.getItem("vae_ecrits");
      if (e) setEcrits(JSON.parse(e));
      const s = localStorage.getItem("vae_sits");
      if (s) setSits(JSON.parse(s));
    } catch {}
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const allDocs: DocItem[] = [
    ...sits.map((s) => ({ kind: "sit" as const, data: s })),
    ...ecrits.map((e) => ({ kind: "ecrit" as const, data: e })),
  ];

  const filtered = allDocs.filter((doc) => {
    if (filter === "Situations" && doc.kind !== "sit") return false;
    if (filter === "Écrits" && doc.kind !== "ecrit") return false;
    const label = doc.kind === "sit" ? doc.data.titre : doc.data.label;
    if (search && !label.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleExport = async (doc: DocItem, format: "pdf" | "word") => {
    const key = `${doc.data.id}-${format}`;
    setExporting(key);
    try {
      const title = doc.kind === "sit" ? doc.data.titre : doc.data.label;
      const content =
        doc.kind === "sit"
          ? `Structure : ${doc.data.struct || "—"}\nBlocs : ${doc.data.blocs.join(", ") || "—"}\n\n${doc.data.desc}`
          : doc.data.text;
      if (format === "pdf") await exportToPdf(title, content);
      else await exportToWord(title, content);
    } catch {
      alert("Erreur lors de l'export");
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border px-4 pt-8 pb-4">
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight mb-3">Mes documents</h1>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un document..."
            className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
          />
        </div>
      </header>

      <div className="px-4 pt-5 pb-6 space-y-5">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                filter === f
                  ? "bg-accent text-white border-accent"
                  : "bg-surface text-muted border-border"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted">
          {filtered.length} document{filtered.length !== 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="bg-surface rounded-2xl p-8 border border-border text-center">
            <p className="text-3xl mb-2">📂</p>
            <p className="font-semibold text-foreground mb-1">Aucun document</p>
            <p className="text-xs text-muted">
              {search
                ? "Aucun résultat pour cette recherche"
                : "Créez des situations ou des écrits VAE"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((doc) => {
              const isEcrit = doc.kind === "ecrit";
              const title = isEcrit ? doc.data.label : doc.data.titre;
              const sub = isEcrit
                ? `${doc.data.type} · ${doc.data.date}`
                : `${doc.data.struct ? doc.data.struct + " · " : ""}${doc.data.date}`;
              const icon = isEcrit ? "📄" : "📝";
              return (
                <div
                  key={doc.data.id}
                  className="card-lift bg-surface rounded-2xl p-5 border border-border shadow-card"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl flex-shrink-0">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm leading-snug">{title}</p>
                      <p className="text-xs text-muted mt-0.5">{sub}</p>
                      {!isEcrit && (doc.data as Situation).blocs.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {(doc.data as Situation).blocs.map((b) => (
                            <span
                              key={b}
                              className="text-xs font-medium text-white px-2 py-0.5 rounded-full bg-accent"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleExport(doc, "pdf")}
                      disabled={exporting === `${doc.data.id}-pdf`}
                      className="flex-1 py-2 rounded-xl bg-orange/10 text-orange text-xs font-semibold border border-orange/20 active:bg-orange/20 disabled:opacity-50 transition-colors"
                    >
                      {exporting === `${doc.data.id}-pdf` ? "Export…" : "Export PDF"}
                    </button>
                    <button
                      onClick={() => handleExport(doc, "word")}
                      disabled={exporting === `${doc.data.id}-word`}
                      className="flex-1 py-2 rounded-xl bg-blue/10 text-blue text-xs font-semibold border border-blue/20 active:bg-blue/20 disabled:opacity-50 transition-colors"
                    >
                      {exporting === `${doc.data.id}-word` ? "Export…" : "Export Word"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
