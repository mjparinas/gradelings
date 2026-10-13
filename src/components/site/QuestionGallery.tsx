"use client";

import { useEffect, useState } from "react";
import { Critter } from "../Critter";

// The home page's hero preview: a few drawn questions, one per subject, each caught mid-hint.
// Every slide sits in the same grid cell, so the card is as tall as the tallest one and never
// changes size as it turns. It turns by itself every few seconds until someone takes over.

export type GallerySlide = {
  subject: string;
  /** Subject colour; text on it is dark navy (see onColour). */
  colour: string;
  critter: string;
  prompt: string;
  choices: string[];
  /** The choice already tried and crossed out. */
  wrong: string;
  hint: string;
};

export const SLIDES: GallerySlide[] = [
  { subject: "Math", colour: "#4f8ef7", critter: "hoot", prompt: "What is 3 × 4?", choices: ["7", "10", "12", "14"], wrong: "7", hint: "So close! Think of 3 groups of 4. Try again." },
  { subject: "Reading", colour: "#e9559a", critter: "ruby", prompt: "Which word rhymes with “cat”?", choices: ["dog", "hat", "cup", "sun"], wrong: "cup", hint: "Nice try! Say each one out loud. Which ends with “-at”?" },
  { subject: "Science", colour: "#25b47e", critter: "bolt", prompt: "What do plants need to make food?", choices: ["light", "sand", "salt", "glue"], wrong: "sand", hint: "Good thinking! Leaves soak up something from the sky." },
  { subject: "Social studies", colour: "#ff9636", critter: "juniper", prompt: "Which way does a compass needle point?", choices: ["north", "south", "east", "west"], wrong: "south", hint: "Almost! It points to the top of most maps." },
  { subject: "Math", colour: "#4f8ef7", critter: "hoot", prompt: "Which fraction is the biggest?", choices: ["⅛", "¼", "⅓", "½"], wrong: "⅛", hint: "Good try! The more pieces you cut, the smaller each one gets." },
  { subject: "French", colour: "#7c4fe0", critter: "ollie", prompt: "How do you say “red” in French?", choices: ["bleu", "rouge", "vert", "jaune"], wrong: "vert", hint: "Close! Vert is green. What colour is a strawberry?" },
];

export const TURN_MS = 5000;

function reducedMotion() {
  return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export function QuestionGallery({ slides = SLIDES }: { slides?: GallerySlide[] }) {
  const [current, setCurrent] = useState(0);
  // Auto-turn stops for good once someone uses the arrows, and pauses while the card is hovered or focused.
  const [stopped, setStopped] = useState(false);
  const [paused, setPaused] = useState(false);
  const playing = !stopped && !paused;

  useEffect(() => {
    if (!playing || reducedMotion()) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setCurrent((c) => (c + 1) % slides.length);
    }, TURN_MS);
    return () => window.clearInterval(id);
  }, [playing, slides.length]);

  const go = (step: number) => {
    setStopped(true);
    setCurrent((c) => (c + step + slides.length) % slides.length);
  };

  const arrow = "absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-ink-soft hover:text-ink";
  const chevron = "flex size-8 items-center justify-center rounded-full border-2 border-line bg-white text-lg leading-none font-bold";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Sample questions"
      className="card relative px-11 py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <button type="button" className={`${arrow} left-0`} aria-label="Previous question" onClick={() => go(-1)}>
        <span className={chevron} aria-hidden="true">‹</span>
      </button>
      <div className="grid" aria-live={playing ? "off" : "polite"}>
        {slides.map((s, i) => {
          const on = i === current;
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${s.subject}`}
              aria-hidden={!on}
              inert={!on}
              data-current={on || undefined}
              className={`col-start-1 row-start-1 flex flex-col motion-safe:transition-opacity motion-safe:duration-500 ${on ? "opacity-100" : "invisible opacity-0"}`}
            >
              <div className="flex items-center gap-3">
                <Critter id={s.critter} mood="think" size={56} />
                <div className="min-w-0">
                  <span className="inline-block rounded-full px-2 py-0.5 text-xs font-bold text-[#0f172a]" style={{ background: s.colour }}>
                    {s.subject}
                  </span>
                  <p className="font-read text-xl font-semibold">{s.prompt}</p>
                </div>
              </div>
              <ul className="mt-3 grid grid-cols-2 gap-2 font-read text-lg sm:grid-cols-4" aria-label="Choices">
                {s.choices.map((c) => (
                  <li key={c} className={`rounded-xl border-2 border-line py-2 text-center ${c === s.wrong ? "text-ink-soft line-through" : "bg-white"}`}>
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-xl bg-[#fff4cc] px-3 py-2 font-read text-[#5c4300]">💡 {s.hint}</p>
            </div>
          );
        })}
      </div>
      <button type="button" className={`${arrow} right-0`} aria-label="Next question" onClick={() => go(1)}>
        <span className={chevron} aria-hidden="true">›</span>
      </button>
      <ol className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
        {slides.map((_, i) => (
          <li key={i} className={`size-2 rounded-full ${i === current ? "bg-ink-soft" : "bg-line"}`} />
        ))}
      </ol>
    </div>
  );
}
