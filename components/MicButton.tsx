"use client";
import { useState, useRef } from "react";

interface Props {
  onTranscript: (text: string) => void;
  className?: string;
}

export default function MicButton({ onTranscript, className = "" }: Props) {
  const [listening, setListening] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null);

  const toggle = () => {
    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert("Dictée vocale non supportée. Utilisez Chrome ou Edge.");
      return;
    }
    const rec = new SR();
    rec.lang = "fr-FR";
    rec.continuous = false;
    rec.interimResults = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => onTranscript(e.results[0][0].transcript as string);
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title={listening ? "Arrêter la dictée" : "Dicter en français"}
      className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all ${
        listening
          ? "bg-red-500 text-white animate-pulse shadow-md"
          : "bg-border/70 text-muted hover:bg-accent/10 hover:text-accent"
      } ${className}`}
    >
      🎤
    </button>
  );
}
