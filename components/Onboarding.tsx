"use client";
import { useState, useEffect, useRef } from "react";

const FEATURES = [
  {
    icon: "🤖",
    title: "Copilote IA",
    desc: "7 modes experts : rédaction, simulation jury, analyse réflexive, reformulation pro.",
  },
  {
    icon: "📝",
    title: "Rédaction guidée",
    desc: "PPE, transmissions, rapports éducatifs — structurés et exportables en PDF ou Word.",
  },
  {
    icon: "🎤",
    title: "Simulation jury DEES",
    desc: "5 questions progressives, feedback instantané et note /20 finale argumentée.",
  },
];

export default function Onboarding() {
  const [visible, setVisible] = useState(false);
  const [slide, setSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem("vae_onboarding_done")) setVisible(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(-${slide * 100}%)`;
    }
  }, [slide]);

  if (!visible) return null;

  const finish = () => {
    try { localStorage.setItem("vae_onboarding_done", "1"); } catch {}
    setVisible(false);
  };

  const isLast = slide === 2;

  return (
    <div className="fixed inset-0 z-[200] select-none overflow-hidden">
      {/* Slides container */}
      <div
        ref={containerRef}
        className="flex h-full w-full"
        style={{ transition: "transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)", willChange: "transform" }}
      >
        {/* ── Slide 1 — Bienvenue ─────────────────────────────────────────── */}
        <div className="flex-shrink-0 w-full h-full flex flex-col items-center justify-center px-8 text-center header-gradient">
          {/* Skip */}
          <button
            onClick={finish}
            className="absolute top-5 right-5 text-sm text-white/70 px-3 py-1.5 rounded-lg backdrop-blur-sm bg-white/10"
          >
            Passer
          </button>

          <div className="animate-fade-slide">
            {/* Logo */}
            <div className="w-28 h-28 bg-white/15 backdrop-blur rounded-[2rem] flex items-center justify-center mb-8 mx-auto shadow-lg border border-white/20">
              <span className="text-5xl">🌿</span>
            </div>

            <p className="text-white/80 text-sm font-semibold tracking-widest uppercase mb-3">
              MonParcours
            </p>
            <h1 className="text-3xl font-extrabold text-white leading-tight mb-4 text-balance">
              Bienvenue sur<br />MonParcours VAE
            </h1>
            <p className="text-white/75 text-base leading-relaxed max-w-xs mx-auto">
              {"L'application mobile pour préparer et réussir votre VAE DEES 2025 — où que vous soyez."}
            </p>
          </div>
        </div>

        {/* ── Slide 2 — Fonctions clés ────────────────────────────────────── */}
        <div className="flex-shrink-0 w-full h-full flex flex-col bg-background px-5 pt-16 pb-8">
          {/* Skip */}
          <button
            onClick={finish}
            className="absolute top-5 right-5 text-sm text-muted px-3 py-1.5 rounded-lg"
          >
            Passer
          </button>

          <div className="flex-1 flex flex-col justify-center">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2 text-center">
              Votre copilote
            </p>
            <h2 className="text-2xl font-extrabold text-foreground text-center mb-8 leading-tight">
              DEES 2025 en poche
            </h2>

            <div className="space-y-3">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start bg-surface rounded-2xl p-4 border border-border shadow-card"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{f.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm leading-snug">{f.title}</p>
                    <p className="text-xs text-muted mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Slide 3 — Commençons ────────────────────────────────────────── */}
        <div className="flex-shrink-0 w-full h-full flex flex-col items-center justify-center px-8 text-center header-gradient">
          <div className="animate-fade-slide">
            <div className="w-24 h-24 bg-white/15 backdrop-blur rounded-[2rem] flex items-center justify-center mb-8 mx-auto border border-white/20">
              <span className="text-5xl">🚀</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white leading-tight mb-4">
              Tout est prêt !
            </h1>
            <p className="text-white/75 text-base leading-relaxed max-w-xs mx-auto mb-2">
              Décrivez vos situations, entraînez-vous avec le jury IA, rédigez vos écrits VAE.
            </p>
            <p className="text-white/60 text-sm">Votre diplôme commence ici.</p>
          </div>
        </div>
      </div>

      {/* ── Bottom controls ─────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-12">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === slide
                  ? "w-7 h-2 bg-white"
                  : "w-2 h-2 bg-white/35"
              }`}
            />
          ))}
        </div>

        <button
          onClick={isLast ? finish : () => setSlide((s) => s + 1)}
          className={`w-full py-4 font-bold rounded-2xl text-base transition-all duration-200 active:scale-[0.97] ${
            isLast
              ? "bg-white text-accent shadow-modal"
              : slide === 1
              ? "bg-accent text-white shadow-button"
              : "bg-white text-accent shadow-modal"
          }`}
        >
          {isLast ? "Démarrer →" : "Suivant →"}
        </button>
      </div>
    </div>
  );
}
