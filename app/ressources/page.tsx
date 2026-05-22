"use client";
import { useState, useMemo, useEffect } from "react";
import { VOCAB, LOIS, AUTEURS, STRUCTS, EXEMPLES } from "@/lib/data";
import type { VocabItem, LoiItem, AuteurItem, StructItem, ExempleItem } from "@/lib/data";

type Tab = "vocab" | "lois" | "auteurs" | "structs" | "exemples";

type CustomVocabItem = {
  id: string;
  t: string;
  d: string;
  ex: string;
};

const TABS: { key: Tab; label: string }[] = [
  { key: "vocab", label: "Vocabulaire" },
  { key: "lois", label: "Lois" },
  { key: "auteurs", label: "Auteurs" },
  { key: "structs", label: "Structures" },
  { key: "exemples", label: "Exemples" },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-block text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ backgroundColor: color + "20", color }}
    >
      {label}
    </span>
  );
}

function GenericCard({
  title,
  sub,
  desc,
  exLabel,
  exColor,
  example,
  refText,
}: {
  title: string;
  sub?: string;
  desc: string;
  exLabel: string;
  exColor: string;
  example: string;
  refText: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-lift bg-surface rounded-xl border border-border shadow-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left transition-colors"
      >
        <div className="flex-1 min-w-0 pr-3">
          <p className="font-semibold text-foreground text-sm leading-snug">{title}</p>
          {sub && <p className="text-xs text-muted mt-0.5">{sub}</p>}
        </div>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-border space-y-3">
          <p className="text-sm text-foreground leading-relaxed">{desc}</p>
          {example && (
            <div className="rounded-xl p-3" style={{ backgroundColor: exColor + "10" }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: exColor }}>
                {exLabel}
              </p>
              <p className="text-xs text-foreground leading-relaxed whitespace-pre-line">{example}</p>
            </div>
          )}
          {refText && (
            <p className="text-xs text-muted">
              <span className="font-medium">Référence : </span>{refText}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function CustomVocabCard({ item, onDelete }: { item: CustomVocabItem; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-lift bg-surface rounded-xl border border-accent/30 shadow-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left transition-colors"
      >
        <div className="flex-1 min-w-0 pr-3">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-foreground text-sm leading-snug">{item.t}</p>
            <span className="text-xs font-medium text-accent px-2 py-0.5 rounded-full bg-accent/10">
              Mon vocab
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="text-xs text-orange font-bold px-2.5 py-1 rounded-lg bg-orange/10"
          >
            ×
          </button>
          <ChevronIcon open={open} />
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-border space-y-3">
          <p className="text-sm text-foreground leading-relaxed">{item.d}</p>
          {item.ex && (
            <div className="rounded-xl p-3 bg-accent/5">
              <p className="text-xs font-semibold uppercase tracking-wide mb-1 text-accent">Exemple</p>
              <p className="text-xs text-foreground leading-relaxed">{item.ex}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ExempleCard({ item }: { item: ExempleItem }) {
  const [open, setOpen] = useState(false);
  const tags = item.r.split("·").map((s) => s.trim());
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 text-left active:bg-border/30 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm leading-snug mb-2">{item.t}</p>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} label={tag} color="#2D6A4F" />
              ))}
            </div>
          </div>
          <ChevronIcon open={open} />
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-border">
          <pre className="text-xs text-foreground leading-relaxed whitespace-pre-wrap font-sans mt-3">{item.d}</pre>
        </div>
      )}
    </div>
  );
}

type AnyItem = VocabItem | LoiItem | AuteurItem | StructItem;

function renderItems(tab: Tab, items: AnyItem[]) {
  switch (tab) {
    case "vocab":
      return (items as VocabItem[]).map((item, i) => (
        <GenericCard
          key={i}
          title={item.t}
          desc={item.d}
          exLabel="Exemple"
          exColor="#2D6A4F"
          example={item.ex}
          refText={item.r}
        />
      ));
    case "lois":
      return (items as LoiItem[]).map((item, i) => (
        <GenericCard
          key={i}
          title={item.t}
          sub={item.r}
          desc={item.d}
          exLabel="Dans la pratique"
          exColor="#457B9D"
          example={item.ex}
          refText={item.r}
        />
      ));
    case "auteurs":
      return (items as AuteurItem[]).map((item, i) => (
        <GenericCard
          key={i}
          title={item.t}
          sub={`Référence : ${item.r}`}
          desc={item.d}
          exLabel="Concepts clés & utilisation VAE"
          exColor="#E76F51"
          example={item.ex}
          refText={item.r}
        />
      ));
    case "structs":
      return (items as StructItem[]).map((item, i) => (
        <GenericCard
          key={i}
          title={item.t}
          sub={item.r}
          desc={item.d}
          exLabel="Sur le terrain"
          exColor="#457B9D"
          example={item.ex}
          refText={item.r}
        />
      ));
    default:
      return null;
  }
}

export default function RessourcesPage() {
  const [tab, setTab] = useState<Tab>("vocab");
  const [search, setSearch] = useState("");
  const [customVocab, setCustomVocab] = useState<CustomVocabItem[]>([]);
  const [showVocabModal, setShowVocabModal] = useState(false);
  const [vocabForm, setVocabForm] = useState({ t: "", d: "", ex: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("vae_vocab_custom");
      if (raw) setCustomVocab(JSON.parse(raw));
    } catch {}
  }, []);

  const saveCustomVocab = (next: CustomVocabItem[]) => {
    setCustomVocab(next);
    localStorage.setItem("vae_vocab_custom", JSON.stringify(next));
  };

  const addVocab = () => {
    if (!vocabForm.t.trim()) return;
    saveCustomVocab([
      ...customVocab,
      { id: Date.now().toString(), ...vocabForm },
    ]);
    setVocabForm({ t: "", d: "", ex: "" });
    setShowVocabModal(false);
  };

  const deleteVocab = (id: string) => {
    saveCustomVocab(customVocab.filter((v) => v.id !== id));
  };

  const allItems: Record<Tab, AnyItem[] | ExempleItem[]> = {
    vocab: VOCAB,
    lois: LOIS,
    auteurs: AUTEURS,
    structs: STRUCTS,
    exemples: EXEMPLES,
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return allItems[tab];
    return allItems[tab].filter((item) => {
      const any = item as Record<string, string>;
      return Object.values(any).some((v) => typeof v === "string" && v.toLowerCase().includes(q));
    });
  }, [tab, search]); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredCustomVocab = useMemo(() => {
    if (tab !== "vocab") return [];
    const q = search.toLowerCase().trim();
    if (!q) return customVocab;
    return customVocab.filter((item) =>
      [item.t, item.d, item.ex].some((s) => s.toLowerCase().includes(q))
    );
  }, [tab, search, customVocab]);

  const totalCount = tab === "vocab"
    ? filtered.length + filteredCustomVocab.length
    : filtered.length;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border px-4 pt-8 pb-0">
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight mb-3">Ressources</h1>
        <div className="relative mb-3">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setSearch(""); }}
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

      <div className="px-4 pt-4 pb-4 space-y-2">
        {tab === "vocab" && (
          <div className="flex items-center justify-between pb-1">
            <p className="text-xs text-muted">
              {search ? `${totalCount} résultat${totalCount !== 1 ? "s" : ""}` : `${VOCAB.length + customVocab.length} termes`}
            </p>
            <button
              onClick={() => { setVocabForm({ t: "", d: "", ex: "" }); setShowVocabModal(true); }}
              className="text-sm font-medium text-accent px-4 py-1.5 rounded-xl bg-accent/10 active:opacity-80"
            >
              + Ajouter un mot
            </button>
          </div>
        )}

        {search && tab !== "vocab" && (
          <p className="text-xs text-muted px-1">
            {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        {filteredCustomVocab.map((item) => (
          <CustomVocabCard key={item.id} item={item} onDelete={() => deleteVocab(item.id)} />
        ))}

        {tab === "exemples"
          ? (filtered as ExempleItem[]).map((item, i) => <ExempleCard key={i} item={item} />)
          : renderItems(tab, filtered as AnyItem[])}
      </div>

      {showVocabModal && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowVocabModal(false)} />
          <div className="relative w-full bg-surface rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="font-bold text-foreground text-lg mb-5">Nouveau mot</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">Terme *</label>
                <input
                  type="text"
                  value={vocabForm.t}
                  onChange={(e) => setVocabForm((f) => ({ ...f, t: e.target.value }))}
                  placeholder="Ex : Empowerment, Holding, CNV..."
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">Définition *</label>
                <textarea
                  value={vocabForm.d}
                  onChange={(e) => setVocabForm((f) => ({ ...f, d: e.target.value }))}
                  placeholder="Définition professionnelle du terme..."
                  rows={3}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">Exemple (optionnel)</label>
                <input
                  type="text"
                  value={vocabForm.ex}
                  onChange={(e) => setVocabForm((f) => ({ ...f, ex: e.target.value }))}
                  placeholder="Ex : J'ai mobilisé ce concept lors de..."
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowVocabModal(false)}
                  className="flex-1 py-3 rounded-xl border border-border text-sm font-medium text-muted"
                >
                  Annuler
                </button>
                <button
                  onClick={addVocab}
                  disabled={!vocabForm.t.trim() || !vocabForm.d.trim()}
                  className="flex-1 py-3 rounded-xl bg-accent text-white text-sm font-medium disabled:opacity-50"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
