"use client";
import { useState, useEffect } from "react";

const SLIDES = [
  {
    emoji: "🎓",
    title: "Bienvenue sur\nMonParcours VAE",
    sub: "Votre application mobile pour préparer et réussir votre VAE DEES 2025, où que vous soyez.",
  },
  {
    emoji: "🤖",
    title: "Votre copilote\nDEES 2025",
    sub: "IA experte, simulation jury, quiz, rédaction assistée — tout ce qu'il vous faut pour décrocher votre diplôme.",
  },
  {
    emoji: "🚀",
    title: "Commençons !",
    sub: "Décrivez vos situations professionnelles, entraînez-vous avec le jury IA, rédigez vos écrits VAE.",
  },
];

export default function Onboarding() {
  const [visible, setVisible] = useState(false);
  const [slide, setSlide] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("vae_onboarding_done")) setVisible(true);
  }, []);

  if (!visible) return null;

  const finish = () => {
    localStorage.setItem("vae_onboarding_done", "1");
    setVisible(false);
  };

  const next = () => {
    setSlide((s) => s + 1);
    setKey((k) => k + 1);
  };

  const isLast = slide === SLIDES.length - 1;
  const s = SLIDES[slide];

  return (
    <div className="fixed inset-0 z-[200] bg-background flex flex-col select-none">
      {/* Skip button */}
      {!isLast && (
        <button
          onClick={finish}
          className="absolute top-5 right-5 text-sm text-muted px-3 py-1.5 rounded-lg"
        >
          Passer
        </button>
      )}

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div key={key} className="animate-fade-slide">
          <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
            <span className="text-5xl">{s.emoji}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4 leading-snug whitespace-pre-line">
            {s.title}
          </h1>
          <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">{s.sub}</p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === slide ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-border"
            }`}
          />
        ))}
      </div>

      {/* CTA button */}
      <div className="px-6 pb-12">
        <button
          onClick={isLast ? finish : next}
          className="w-full py-4 bg-accent text-white font-semibold rounded-2xl text-base active:opacity-80 transition-opacity shadow-lg"
        >
          {isLast ? "Démarrer" : "Suivant →"}
        </button>
      </div>
    </div>
  );
}
