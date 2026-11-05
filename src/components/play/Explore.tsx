"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { exploreCards, exploreQuestion, findCard, TOPIC_NAME, type ExploreCard } from "@/content/explore";
import { onColour } from "@/lib/contrast";
import { choiceIndexForKey, shortcutBlocked } from "@/lib/keys";
import { celebrate } from "@/lib/juice";
import { go } from "@/lib/router";
import { sounds } from "@/lib/sound";
import { speakSegments, stopSpeaking } from "@/lib/speech";
import { useActiveProfile, useChildSettings } from "@/lib/store";
import { useBand } from "../band";
import { Page } from "../ui";
import { BackButton } from "./Practice";
import { TreasureBack } from "./Treasures";

// Explore cards: short "did you know" cards about science and our world, read aloud on request, with one
// quick question. Nothing is logged, scored or synced, so a card is never mistaken for practice.

const TINT = { colour: "#25b47e", dark: "#188a5e" };

/** The cards for the child's age. */
export function ExploreLibrary() {
  const band = useBand();
  const cards = exploreCards(band);
  return (
    <Page className="gap-5">
      <header className="flex items-center gap-3">
        {band === "little" ? <TreasureBack /> : <BackButton />}
        <h1 className="text-3xl font-bold sm:text-4xl">🔭 Explore</h1>
      </header>
      <p className="font-read text-lg text-ink-soft">Pick a card to find out something new!</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {cards.map((c, i) => (
          <a
            key={c.id}
            href={`#/explore/${c.id}`}
            className="btn animate-rise-in min-h-40 w-full flex-col items-center justify-center gap-2 p-4 text-center"
            style={{ "--btn-bg": TINT.colour, "--btn-edge": TINT.dark, "--btn-fg": onColour(TINT.colour), animationDelay: `${i * 40}ms` } as CSSProperties}
          >
            <span className="text-5xl drop-shadow-sm">{c.emoji}</span>
            <span className="block text-xl leading-tight font-bold">{c.title}</span>
            <span className="text-sm font-semibold opacity-90">{TOPIC_NAME[c.topic].name}</span>
          </a>
        ))}
      </div>
    </Page>
  );
}

/** One card: the facts, then a quick question. */
export function ExploreReader({ id }: { id: string }) {
  const card = findCard(id);
  if (!card) {
    go("/explore");
    return null;
  }
  return <Reader card={card} />;
}

function Reader({ card }: { card: ExploreCard }) {
  const profile = useActiveProfile()!;
  const settings = useChildSettings();
  const little = useBand() === "little";
  const [lit, setLit] = useState(-1);
  const [asking, setAsking] = useState(false);
  const [round, setRound] = useState(0);
  const day = new Date().toISOString().slice(0, 10);
  const q = useMemo(() => exploreQuestion(card, `${profile.id}:${day}:${round}`), [card, profile.id, day, round]);
  const [misses, setMisses] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const revealed = misses.length >= 2;

  const read = (from = 0, only = false) => {
    const list = only ? [card.facts[from]] : card.facts.slice(from);
    speakSegments(
      list.map((text) => ({ text, lang: "en" as const, pause: 250 })),
      { onStart: (i) => setLit(from + i), onDone: () => setLit(-1) },
    );
  };

  useEffect(() => {
    if (settings?.autoRead) read();
    return stopSpeaking;
    // Only when the card opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.id]);

  const pick = (i: number) => {
    if (!asking || solved || revealed || misses.includes(i)) return;
    if (i === q.answer) {
      sounds.correct();
      setSolved(true);
    } else {
      sounds.tryAgain();
      setMisses((m) => [...m, i]);
    }
  };

  useEffect(() => {
    if (!asking || solved || revealed) return;
    const onKey = (e: KeyboardEvent) => {
      if (shortcutBlocked(e)) return;
      const i = choiceIndexForKey(e.key, q.choices.length);
      if (i !== null) pick(i);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asking, q, solved, misses]);

  const finished = asking && (solved || revealed);
  useEffect(() => {
    if (finished) celebrate(["🔭", "✨", "🌟"]);
  }, [finished]);

  const ask = () => {
    stopSpeaking();
    setLit(-1);
    setAsking(true);
  };
  const again = () => {
    setAsking(false);
    setMisses([]);
    setSolved(false);
    setRound((n) => n + 1);
  };
  const cards = exploreCards(card.band);
  const next = cards[(cards.findIndex((c) => c.id === card.id) + 1) % cards.length];
  const tint = { "--btn-bg": TINT.colour, "--btn-edge": TINT.dark, "--btn-fg": onColour(TINT.colour) } as CSSProperties;

  return (
    <Page className="gap-5">
      <header className="flex items-center gap-3">
        <BackButton to="/explore" />
        <h1 className="flex-1 text-2xl font-bold sm:text-3xl">
          {card.emoji} {card.title}
        </h1>
      </header>

      <section className="card flex flex-col gap-2 p-5" aria-label={card.title}>
        {card.facts.map((fact, i) => (
          <button
            key={i}
            type="button"
            onClick={() => read(i, true)}
            className={`rounded-xl px-3 py-2 text-left font-read font-bold ${little ? "text-2xl" : "text-xl"} ${lit === i ? "bg-yellow-200 text-slate-900" : ""}`}
            aria-label={`Hear: ${fact}`}
          >
            {fact}
          </button>
        ))}
      </section>

      {!asking && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" className="btn btn-soft min-h-14 px-6 text-xl" onClick={() => read()}>
            🔊 Read to me
          </button>
          <button type="button" className="btn min-h-14 px-6 text-xl" style={tint} onClick={ask}>
            Quick question
          </button>
        </div>
      )}

      {asking && (
        <section className="card flex flex-col gap-4 p-5" aria-live="polite">
          <p className={`font-read font-bold leading-snug ${little ? "text-3xl" : "text-2xl"}`}>{q.prompt}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {q.choices.map((c, i) => {
              const show = (solved || revealed) && i === q.answer;
              const missed = misses.includes(i);
              return (
                <button
                  key={i}
                  type="button"
                  data-state={show ? "right" : missed ? "wrong" : undefined}
                  aria-keyshortcuts={String(i + 1)}
                  disabled={solved || revealed || missed}
                  onClick={() => pick(i)}
                  className={`btn min-h-16 px-4 font-read text-xl ${show ? "ring-4 ring-green-500" : ""} ${missed ? "opacity-50" : ""}`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          {misses.length === 1 && !solved && <p className="font-read text-lg font-semibold">Not quite. Have another look at the card!</p>}
          {(solved || revealed) && (
            <>
              <p className="font-read text-lg font-semibold">
                {solved ? (misses.length === 0 ? "Yes! " : "You got it! ") : ""}
                {q.why}
              </p>
              <p className="font-read text-base text-ink-soft">Explore cards don&apos;t count toward your practice. They&apos;re just for curiosity.</p>
              <div className="flex w-full flex-col gap-3 sm:flex-row">
                <button type="button" className="btn btn-soft min-h-14 px-6 text-xl" onClick={again}>
                  Read it again
                </button>
                <button type="button" className="btn min-h-14 px-6 text-xl" style={tint} onClick={() => go(`/explore/${next.id}`)}>
                  Next card ▶
                </button>
              </div>
            </>
          )}
        </section>
      )}
    </Page>
  );
}
