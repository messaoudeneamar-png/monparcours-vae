"use client";
import { useState, useRef, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

type Mode = "default" | "transmission" | "rapport" | "ppe" | "reflexive" | "oral" | "reformuler";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
};

// ── Mode definitions ───────────────────────────────────────────────────────

const MODES: { key: Mode; label: string; desc: string }[] = [
  {
    key: "default",
    label: "💬 Général",
    desc: "Assistant VAE DEES 2025 — blocs, auteurs, lois, situations, jury.",
  },
  {
    key: "transmission",
    label: "📨 Transmission",
    desc: "Décrivez la situation en langage terrain — je la transforme en note de transmission professionnelle.",
  },
  {
    key: "rapport",
    label: "📄 Rapport",
    desc: "Je structure votre rapport éducatif : observation, analyse, préconisations.",
  },
  {
    key: "ppe",
    label: "🎯 PPE",
    desc: "Je génère votre Projet Éducatif Personnalisé avec objectifs SMART (loi 2002-2).",
  },
  {
    key: "reflexive",
    label: "🪞 Analyse réflexive",
    desc: "J'analyse votre situation professionnelle en posture réflexive BC4 avec auteurs DEES.",
  },
  {
    key: "oral",
    label: "🎤 Oral jury",
    desc: "Je simule les questions du jury DEES — entraînez-vous à la soutenance.",
  },
  {
    key: "reformuler",
    label: "✏️ Reformuler",
    desc: "Écrivez en langage terrain — je reformule instantanément en vocabulaire professionnel éducatif.",
  },
];

const SUGGESTIONS: Record<Mode, string[]> = {
  default: [
    "C'est quoi le BC1 en résumé ?",
    "Comment structurer une situation VAE ?",
    "Quels auteurs citer pour le BC2 ?",
    "Quelle différence entre BC3 et BC4 ?",
  ],
  transmission: [
    "Ce soir Théo a fugué 2h, est rentré agité, a refusé de manger",
    "Réunion famille ce matin, mère présente, père absent, ambiance tendue",
    "Lucas a eu une crise en atelier, a dû être mis à l'écart 15 min",
  ],
  rapport: [
    "Je dois rédiger un rapport pour Emma, 14 ans en MECS depuis 6 mois",
    "Quel plan adopter pour un rapport de fin d'accompagnement ?",
    "Comment formuler mes préconisations dans un rapport éducatif ?",
  ],
  ppe: [
    "Aide-moi à construire le PPE de Yanis, 12 ans, TSA, en IME",
    "Comment formuler des objectifs SMART pour un adolescent en MECS ?",
    "Quels partenaires inclure dans un PPE pour un adulte en ESAT ?",
  ],
  reflexive: [
    "J'ai eu du mal à poser des limites avec un jeune ce matin",
    "Je me demande si mon intervention était juste dans cette situation",
    "Comment mobiliser Rogers dans mon analyse de pratique ?",
  ],
  oral: [
    "Pose-moi des questions de jury sur le BC1",
    "Que peut me demander le jury sur ma posture professionnelle ?",
    "Comment présenter ma situation VAE en 10 minutes ?",
  ],
  reformuler: [
    "Le gamin était énervé, j'ai essayé de le calmer mais ça a pas marché",
    "J'ai discuté avec la maman ce matin, elle est stressée par le foyer",
    "On a fait une activité cuisine aujourd'hui, ça s'est bien passé globalement",
  ],
};

// ── Helpers ────────────────────────────────────────────────────────────────

function nowTime(): string {
  return new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function AIAvatar() {
  return (
    <div className="w-7 h-7 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5">
      <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<Mode>("default");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fileLoading, setFileLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const currentMode = MODES.find((m) => m.key === mode) ?? MODES[0];

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      time: nowTime(),
    };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setError("");
    setLoading(true);

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
          mode,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `Erreur ${res.status}`);
      }
      if (!res.body) throw new Error("Pas de réponse.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const assistantId = Date.now().toString() + "a";
      let acc = "";

      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "", time: nowTime() },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m))
        );
      }

      // Remove empty bubble if nothing was streamed
      if (!acc) {
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        setError("Aucune réponse reçue, réessayez.");
      }
    } catch (e: unknown) {
      clearTimeout(timeoutId);
      if (e instanceof Error && e.name === "AbortError") {
        setError("Délai dépassé, réessayez.");
      } else {
        setError(e instanceof Error ? e.message : "Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    setFileLoading(true);
    setError("");
    try {
      let text = "";
      if (file.type === "text/plain") {
        text = await file.text();
      } else if (file.type === "application/pdf") {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/parse-file", { method: "POST", body: fd });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        text = data.text as string;
      } else {
        throw new Error("Format non supporté. Utilisez .txt ou .pdf");
      }
      await send(
        `Voici le contenu du fichier "${file.name}" :\n\n${text.slice(0, 8000)}\n\nRésume et analyse ce document en lien avec la VAE DEES.`
      );
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur lors de la lecture du fichier.");
    } finally {
      setFileLoading(false);
    }
  };

  const copyMsg = async (id: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const reset = () => {
    setMessages([]);
    setError("");
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    reset();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface border-b border-border flex-shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Copilote VAE</p>
              <p className="text-xs text-muted">{currentMode.label} · DEES 2025</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={reset}
              className="text-xs text-muted px-3 py-1.5 rounded-lg border border-border"
            >
              Effacer
            </button>
          )}
        </div>

        {/* Mode pills */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
          {MODES.map((m) => (
            <button
              key={m.key}
              onClick={() => switchMode(m.key)}
              className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                mode === m.key
                  ? "bg-accent text-white border-accent shadow-sm"
                  : "bg-surface text-muted border-border"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-36 space-y-5">
        {messages.length === 0 && (
          <div className="pt-2">
            <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm mb-4">
              <p className="text-sm font-semibold text-foreground mb-1">{currentMode.label}</p>
              <p className="text-xs text-muted leading-relaxed">
                {mode === "default"
                  ? "Je suis votre assistant. Posez-moi une question, dictez une situation, ou choisissez un mode."
                  : currentMode.desc}
              </p>
            </div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 px-1">
              Suggestions
            </p>
            <div className="space-y-2">
              {SUGGESTIONS[mode].map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="w-full text-left bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground active:bg-border/50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {m.role === "assistant" && <AIAvatar />}

            <div
              className={`flex flex-col gap-1 ${
                m.role === "user" ? "items-end max-w-[80%]" : "items-start max-w-[85%]"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-accent text-white rounded-br-md shadow-sm"
                    : "bg-surface border border-border text-foreground rounded-bl-md shadow-sm"
                }`}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
              <div
                className={`flex items-center gap-2 px-1 ${
                  m.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <span className="text-[11px] text-muted">{m.time}</span>
                {m.role === "assistant" && m.content && (
                  <button
                    onClick={() => copyMsg(m.id, m.content)}
                    className="text-[11px] text-muted hover:text-accent transition-colors"
                  >
                    {copiedId === m.id ? "✓ Copié" : "Copier"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-end gap-2">
            <AIAvatar />
            <div className="bg-surface border border-border px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1 items-center">
                  {[0, 150, 300].map((delay) => (
                    <div
                      key={delay}
                      className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted">⏳ Génération en cours...</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-orange/10 border border-orange/20 rounded-xl px-4 py-3">
            <p className="text-sm text-orange">{error}</p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Fixed input */}
      <div className="fixed bottom-16 left-0 right-0 bg-surface border-t border-border px-4 py-3 z-10">
        <div className="flex gap-2 items-end max-w-lg mx-auto">
          <button
            onClick={() => fileRef.current?.click()}
            disabled={fileLoading || loading}
            title="Envoyer un fichier .txt ou .pdf"
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base bg-border/70 text-muted hover:bg-accent/10 hover:text-accent transition-colors disabled:opacity-40"
          >
            {fileLoading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              "📎"
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".txt,.pdf"
            onChange={handleFile}
            className="hidden"
          />

          <textarea
            ref={textareaRef}
            value={input}
            onChange={autoResize}
            onKeyDown={handleKey}
            placeholder="Posez votre question..."
            rows={1}
            inputMode="text"
            x-webkit-speech=""
            className="flex-1 bg-background border border-border rounded-2xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent resize-none leading-relaxed"
            style={{ maxHeight: "120px", overflowY: "auto" }}
          />

          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            className="w-10 h-10 bg-accent text-white rounded-2xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 active:opacity-80 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
