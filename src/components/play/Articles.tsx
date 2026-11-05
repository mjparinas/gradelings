"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { articleQuestion, articlesFor, findArticle, type Article } from "@/content/articles";
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

// Articles: short non-fiction reading about science and our world, with two quick questions. Nothing is
// logged, scored or synced, so an article is never mistaken for practice.

const TINT = { colour: "#e9559a", dark: "#c43a7c" };
const tint = { "--btn-bg": TINT.colour, "--btn-edge": TINT.dark, "--btn-fg": onColour(TINT.colour) } as CSSProperties;

/** The articles for the child's age. */
export function ArticleLibrary() {
  const items = articlesFor(useBand());
  return (
    <Page className="gap-5">
      <header className="flex items-center gap-3">
        <BackButton />
        <h1 className="text-3xl font-bold sm:text-4xl">📰 Articles</h1>
      </header>
      <p className="font-read text-lg text-ink-soft">Pick something to read and find out about the world.</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((a, i) => (
          <a
            key={a.id}
            href={`#/articles/${a.id}`}
            className="btn animate-rise-in min-h-28 w-full items-center justify-start gap-4 p-4 text-left"
            style={{ ...tint, animationDelay: `${i * 40}ms` } as CSSProperties}
          >
            <span className="text-5xl drop-shadow-sm">{a.emoji}</span>
            <span className="block text-xl leading-tight font-bold">{a.title}</span>
          </a>
        ))}
      </div>
    </Page>
  );
}

export function ArticleReader({ id }: { id: string }) {
  const article = findArticle(id);
  if (!article) {
    go("/articles");
    return null;
  }
  return <Reader article={article} />;
}

function Reader({ article }: { article: Article }) {
  const profile = useActiveProfile()!;
  const settings = useChildSettings();
  const [lit, setLit] = useState(-1);
  const [n, setN] = useState(-1); // -1 = reading, 0.. = question
  const [misses, setMisses] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const day = new Date().toISOString().slice(0, 10);
  const q = articleQuestion(article, Math.max(0, n), `${profile.id}:${day}`);
  const revealed = misses.length >= 2;
  const asking = n >= 0;
  const last = n >= article.asks.length - 1;

  const read = (from = 0, only = false) => {
    const list = only ? [article.paragraphs[from]] : article.paragraphs.slice(from);
    speakSegments(
      list.map((text) => ({ text, lang: "en" as const, pause: 350 })),
      { onStart: (i) => setLit(from + i), onDone: () => setLit(-1) },
    );
  };

  useEffect(() => {
    if (settings?.autoRead) read();
    return stopSpeaking;
    // Only when the article opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.id]);

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
  }, [asking, n, solved, misses]);

  const done = asking && last && (solved || revealed);
  useEffect(() => {
    if (done) celebrate(["📰", "✨", "🌟"]);
  }, [done]);

  const startQuestions = () => {
    stopSpeaking();
    setLit(-1);
    setN(0);
  };
  const nextQuestion = () => {
    setMisses([]);
    setSolved(false);
    setN((v) => v + 1);
  };
  const items = articlesFor(article.band);
  const next = items[(items.findIndex((a) => a.id === article.id) + 1) % items.length];

  return (
    <Page className="gap-5">
      <header className="flex items-center gap-3">
        <BackButton to="/articles" />
        <h1 className="flex-1 text-2xl font-bold sm:text-3xl">
          {article.emoji} {article.title}
        </h1>
      </header>

      <section className="card flex flex-col gap-2 p-5" aria-label={article.title}>
        {article.paragraphs.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => read(i, true)}
            className={`rounded-xl px-3 py-2 text-left font-read text-lg leading-relaxed ${lit === i ? "bg-yellow-200 text-slate-900" : ""}`}
            aria-label={`Hear: ${p}`}
          >
            {p}
          </button>
        ))}
      </section>

      {!asking && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" className="btn btn-soft min-h-14 px-6 text-xl" onClick={() => read()}>
            🔊 Read to me
          </button>
          <button type="button" className="btn min-h-14 px-6 text-xl" style={tint} onClick={startQuestions}>
            Quick questions
          </button>
        </div>
      )}

      {asking && (
        <section className="card flex flex-col gap-4 p-5" aria-live="polite">
          <p className="font-read text-2xl font-bold leading-snug">{q.prompt}</p>
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
          {misses.length === 1 && !solved && <p className="font-read text-lg font-semibold">Not quite. Have another look at the article!</p>}
          {(solved || revealed) && (
            <>
              <p className="font-read text-lg font-semibold">
                {solved ? (misses.length === 0 ? "Yes! " : "You got it! ") : ""}
                {q.why}
              </p>
              {last ? (
                <>
                  <p className="font-read text-base text-ink-soft">Articles don&apos;t count toward your practice. They&apos;re just for curiosity.</p>
                  <div className="flex w-full flex-col gap-3 sm:flex-row">
                    <button type="button" className="btn btn-soft min-h-14 px-6 text-xl" onClick={() => go("/articles")}>
                      All articles
                    </button>
                    <button type="button" className="btn min-h-14 px-6 text-xl" style={tint} onClick={() => go(`/articles/${next.id}`)}>
                      Next article ▶
                    </button>
                  </div>
                </>
              ) : (
                <button type="button" className="btn min-h-14 px-6 text-xl" style={tint} onClick={nextQuestion}>
                  Next question ▶
                </button>
              )}
            </>
          )}
        </section>
      )}
    </Page>
  );
}
