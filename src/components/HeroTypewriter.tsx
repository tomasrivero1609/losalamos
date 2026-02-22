"use client";

import { useState, useEffect } from "react";

const PHRASES = [
  "Calidad que se nota en cada costura.",
  "Ropa pensada para el trabajo de todos los días.",
  "Equipá a tu equipo con lo mejor.",
  "Indumentaria laboral para invierno y verano.",
];

const TYPE_DELAY = 80;
const PAUSE_AT_END = 2500;
const DELETE_DELAY = 45;
const PAUSE_BETWEEN_PHRASES = 600;

export function HeroTypewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const phrase = PHRASES[phraseIndex];
    if (!phrase) return;

    if (!isDeleting) {
      if (displayText.length < phrase.length) {
        const t = setTimeout(() => {
          setDisplayText(phrase.slice(0, displayText.length + 1));
        }, TYPE_DELAY);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setIsDeleting(true), PAUSE_AT_END);
      return () => clearTimeout(t);
    }

    if (displayText.length > 0) {
      const t = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, DELETE_DELAY);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
    }, PAUSE_BETWEEN_PHRASES);
    return () => clearTimeout(t);
  }, [phraseIndex, displayText, isDeleting]);

  useEffect(() => {
    const id = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <p
      className="mt-4 min-h-[2.5rem] text-lg text-white drop-shadow-md sm:text-xl md:min-h-[2rem]"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="inline">{displayText}</span>
      <span
        className={`inline-block w-0.5 align-middle bg-white transition-opacity duration-75 ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
        style={{ height: "1.1em", marginLeft: "2px" }}
        aria-hidden
      >
        |
      </span>
    </p>
  );
}
