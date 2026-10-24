"use client";

import { onColour } from "@/lib/contrast";
import { useEffect, useState, type CSSProperties } from "react";
import { getFramework } from "@/content/frameworks";
import { localeOf } from "@/content/locale";
import { isFreeStory, loadStories, localizeStory, splitSentences, storyLevel, storyQuestions, type Story } from "@/content/stories";
import { cacheLoadedScripts } from "@/lib/offline";
import { storyOpen } from "@/lib/plan";
import { speakQuestion } from "@/lib/readaloud";
import { useIsOn } from "@/lib/remoteFlags";
import { go } from "@/lib/router";
import { celebrationOf } from "@/lib/shop";
import { celebrate } from "@/lib/juice";
import { sounds } from "@/lib/sound";
import { speakSegments, stopSpeaking } from "@/lib/speech";
import { shelves, storyTarget } from "@/lib/stories";
import { useActiveProfile, useChildSettings, useDerived, useStore } from "@/lib/store";
import type { Status } from "../questions/types";
import { useBand } from "../band";
import { Critter, SpeechBubble } from "../Critter";
import { Page, ProgressBar } from "../ui";
import { SayButton, useBuddySays } from "./BuddySays";
import { Companion } from "./Companion";
import { MembershipLock } from "./MembershipLock";
import { BackButton } from "./Practice";
import { QuestionBody } from "./Session";

// The Story Library: short read-along stories grouped around the child's reading level. Each page is read
// aloud (by the Supertonic voice once it has downloaded) with the sentence being read lit up; a few questions
// follow the story. Finishing logs one `story` event; everything else is worked out from it in `derive`.

const TINT = { colour: "#ff7a59", dark: "#d4553a" };

let library: Promise<Story[]> | undefined;

/** The stories, downloaded once (and kept by the service worker for offline use). */
function useStories(): { stories?: Story[]; failed: boolean; retry: () => void } {
  const [stories, setStories] = useState<Story[]>();
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let live = true;
    library ??= loadStories();
    library.then(
      (all) => {
        if (!live) return;
        setStories(all);
        cacheLoadedScripts();
      },
      () => {
        library = undefined;
        if (live) setFailed(true);
      },
    );
    return () => {
      live = false;
    };
  }, [attempt]);
  return { stories, failed, retry: () => (setFailed(false), setAttempt((n) => n + 1)) };
}

/** Stories in the active child's English. */
function useLocalized(stories: Story[] | undefined): Story[] | undefined {
  const framework = useActiveProfile()?.framework;
  if (!stories) return undefined;
  const locale = localeOf(getFramework(framework));
  return stories.map((s) => localizeStory(s, locale));
}

function Waiting({ failed, retry }: { failed: boolean; retry: () => void }) {
  return (
    <Page className="items-center justify-center gap-5 text-center">
      <Critter id="ruby" mood={failed ? "think" : "happy"} size={140} />
      <h1 className="text-3xl font-bold">{failed ? "We need the internet for a moment" : "Getting the stories ready…"}</h1>
      {failed && (
        <>
          <p className="max-w-md font-read text-xl text-ink-soft">Ask a grown-up to connect once so the stories can download.</p>
          <div className="flex w-full max-w-sm flex-col gap-3">
            <button type="button" className="btn btn-good min-h-16 text-2xl" onClick={retry}>
              Try again
            </button>
            <button type="button" className="btn min-h-14 text-xl" onClick={() => go("/")}>
              Back home
            </button>
          </div>
        </>
      )}
    </Page>
  );
}

export function StoryLibrary() {
  const profile = useActiveProfile()!;
  const settings = useChildSettings();
  const d = useDerived();
  const band = useBand();
  const isOn = useIsOn();
  const family = useStore((s) => s.family);
  const { stories: raw, failed, retry } = useStories();
  const stories = useLocalized(raw);
  const [locked, setLocked] = useState(false);
  const little = band === "little";
  const line = little ? "Pick a story! I'll read it with you." : "Pick a story. These ones are just right for you!";
  useBuddySays(stories ? line : "", little && Boolean(settings?.autoRead));

  if (!stories) return <Waiting failed={failed} retry={retry} />;
  const target = storyTarget(d, profile.grade, isOn("reading-level-match"));
  const { justRight, easier, harder } = shelves(stories, target);
  const sections: [string, Story[]][] = [
    [little ? "For you" : "Just right for you", justRight],
    [little ? "Easier" : "A little easier", easier],
    [little ? "Harder" : "A bit of a stretch", harder],
  ];

  return (
    <Page className="gap-5">
      <header className="flex items-center gap-3">
        <BackButton to={little ? "/practice" : "/"} />
        <h1 className="text-3xl font-bold sm:text-4xl">📚 {little ? "Stories" : "Story Library"}</h1>
      </header>
      <div className="flex items-center gap-3">
        <Critter id="ruby" mood="wave" size={little ? 100 : 84} className="short:hidden" />
        <SpeechBubble className="flex-1">
          <div className="flex items-center gap-3">
            <p className={`flex-1 font-read font-bold leading-snug ${little ? "text-2xl" : "text-xl"}`}>{line}</p>
            <SayButton text={line} />
          </div>
        </SpeechBubble>
      </div>
      {sections.map(([title, list]) =>
        list.length ? (
          <section key={title} aria-label={title}>
            <h2 className="mb-3 text-2xl font-bold">{title}</h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {list.map((s) => {
                const open = storyOpen(family, isFreeStory(s, stories));
                const read = d.stories[s.id];
                const perfect = read && read.questions > 0 && read.best === read.questions;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => (open ? go(`/stories/${s.id}`) : setLocked(true))}
                      className="btn relative h-full min-h-36 w-full flex-col items-center justify-center gap-1 p-3 text-center"
                      style={{ "--btn-bg": "#fff", "--btn-edge": TINT.dark } as CSSProperties}
                      data-story={s.id}
                    >
                      {!open && <span className="absolute top-2 right-2 rounded-full bg-black/10 px-2 py-0.5 text-sm">🔒</span>}
                      {read && (
                        <span className="absolute top-2 left-2 rounded-full bg-good-soft px-2 py-0.5 text-sm font-bold" aria-label={perfect ? "Read, every question right" : "Read"}>
                          {perfect ? "⭐" : "✓"}
                        </span>
                      )}
                      <span className="text-5xl" aria-hidden="true">
                        {s.cover}
                      </span>
                      <span className="block font-read text-lg leading-tight font-bold">{s.title}</span>
                      <span className="block text-sm font-semibold text-ink-soft">{s.pages.length} pages</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null,
      )}
      <MembershipLock open={locked} onClose={() => setLocked(false)} />
    </Page>
  );
}

type Phase = "reading" | "end" | "quiz" | "done";

export function StoryReader({ id }: { id: string }) {
  const { stories: raw, failed, retry } = useStories();
  const stories = useLocalized(raw);
  const family = useStore((s) => s.family);
  if (!stories) return <Waiting failed={failed} retry={retry} />;
  const story = stories.find((s) => s.id === id);
  // An unknown story, or one the plan doesn't open, goes back to the shelves.
  if (!story || !storyOpen(family, isFreeStory(story, stories))) return <StoryLibrary />;
  return <Reader key={story.id} story={story} />;
}

function Reader({ story }: { story: Story }) {
  const profile = useActiveProfile()!;
  const settings = useChildSettings();
  const band = useBand();
  const log = useStore((s) => s.log);
  const little = band === "little";
  const [phase, setPhase] = useState<Phase>("reading");
  const [page, setPage] = useState(0);
  const [lit, setLit] = useState(-1);
  const [readAlong, setReadAlong] = useState(Boolean(settings?.autoRead));
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [questions] = useState(() => storyQuestions(story));
  const [qIndex, setQIndex] = useState(0);
  const [status, setStatus] = useState<Status>("answering");
  const [misses, setMisses] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [before, setBefore] = useState<{ xp: number; coins: number } | null>(null);
  const d = useDerived();
  // What the finished story earned: the store has the event as soon as it's logged.
  const reward = before ? { xp: d.xp - before.xp, coins: d.coins - before.coins } : null;

  const sentences = splitSentences(story.pages[page]?.text ?? "");

  function read(from = 0, only = false) {
    const list = only ? [sentences[from]] : sentences.slice(from);
    speakSegments(
      list.map((text) => ({ text, lang: "en" as const })),
      { onStart: (i) => setLit(from + i), onDone: () => setLit(-1) },
    );
  }

  // Read each page as it opens while read-along is on.
  useEffect(() => {
    if (phase === "reading" && readAlong) read();
    return stopSpeaking;
    // Re-run only when the page or the switch changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, phase, readAlong]);

  const q = phase === "quiz" ? questions[qIndex] : undefined;
  useEffect(() => {
    if (q && status === "answering" && misses === 0 && settings?.autoRead) speakQuestion(q);
    return stopSpeaking;
    // Read each question once, when it first shows.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  function turn(to: number) {
    stopSpeaking();
    setLit(-1);
    sounds.whoosh();
    if (to >= story.pages.length) return setPhase("end");
    setPage(Math.max(0, to));
  }

  function finish() {
    setBefore({ xp: d.xp, coins: d.coins });
    log([{ type: "story", story: story.id, rl: storyLevel(story), results, pages: story.pages.length, ms: Date.now() - startedAt }]);
    setPhase("done");
    sounds.complete();
    const c = celebrationOf(profile.confetti);
    celebrate(c.emoji, c.pattern);
  }

  function onAttempt(correct: boolean) {
    if (status === "correct" || status === "revealed") return;
    const record = (ok: boolean) => setResults((r) => Object.assign([...r], { [qIndex]: ok }));
    if (correct) {
      record(misses === 0);
      sounds.correct();
      setStatus("correct");
      return;
    }
    sounds.tryAgain();
    if (misses >= 1) {
      record(false);
      setStatus("revealed");
    } else {
      setMisses(1);
      setStatus("retry");
    }
  }

  function nextQuestion() {
    stopSpeaking();
    if (qIndex + 1 >= questions.length) return finish();
    setQIndex(qIndex + 1);
    setMisses(0);
    setStatus("answering");
  }

  function again() {
    setStartedAt(Date.now());
    setResults([]);
    setBefore(null);
    setPage(0);
    setQIndex(0);
    setMisses(0);
    setStatus("answering");
    setPhase("reading");
  }

  const textSize = little ? "text-3xl sm:text-4xl" : band === "middle" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl";
  const header = (
    <header className="flex items-center gap-2 sm:gap-3">
      <BackButton to="/stories" label="Back to the stories" />
      <ProgressBar
        value={phase === "reading" ? page + 1 : phase === "quiz" ? story.pages.length + qIndex : story.pages.length + questions.length}
        max={story.pages.length + questions.length}
        className="flex-1"
        label={phase === "reading" ? `Page ${page + 1} of ${story.pages.length}` : "Story progress"}
      />
      {phase === "reading" && (
        <button
          type="button"
          className="btn btn-soft h-14 shrink-0 px-3 text-lg"
          aria-pressed={readAlong}
          onClick={() => {
            if (readAlong) {
              stopSpeaking();
              setLit(-1);
            }
            setReadAlong(!readAlong);
          }}
        >
          <span aria-hidden="true">{readAlong ? "🔊" : "🔈"}</span>
          <span className="narrow:sr-only"> Read to me</span>
        </button>
      )}
    </header>
  );

  if (phase === "reading") {
    const current = story.pages[page];
    return (
      <Page className="gap-4">
        {header}
        <h1 className="sr-only">{story.title}</h1>
        <section key={page} className="flex flex-1 animate-rise-in flex-col gap-5" aria-label={`Page ${page + 1}`}>
          <div className="flex min-h-40 items-center justify-center gap-4 rounded-3xl p-4 short:hidden" style={{ background: "#fff4ec" }} aria-hidden="true">
            {current.critter && <Critter id={current.critter.id} mood={current.critter.mood} size={little ? 150 : 120} />}
            <span className="text-6xl leading-none tracking-widest sm:text-7xl">{current.art}</span>
          </div>
          {/* The picture is decoration, so phones held sideways drop it to keep the page buttons on screen. Tap a sentence to hear it. The read button and the switch above do the same by keyboard. */}
          <p className={`font-read leading-relaxed font-bold ${textSize}`} data-testid="story-text">
            {sentences.map((s, i) => (
              <span key={i}>
                <span
                  className={`cursor-pointer rounded-lg px-0.5 transition-colors ${lit === i ? "bg-[#ffe08a]" : ""}`}
                  data-lit={lit === i ? "true" : undefined}
                  onClick={() => read(i, true)}
                >
                  {s}
                </span>{" "}
              </span>
            ))}
          </p>
        </section>
        <nav className="flex items-center gap-3" aria-label="Pages">
          <button type="button" className="btn h-16 w-20 shrink-0 text-2xl" aria-label="Previous page" disabled={page === 0} onClick={() => turn(page - 1)}>
            ◀
          </button>
          {!readAlong && (
            <button type="button" className="btn btn-soft h-16 w-16 shrink-0 text-2xl" aria-label="Read this page to me" onClick={() => read()}>
              🔊
            </button>
          )}
          <button type="button" className="btn btn-good min-h-16 flex-1 text-2xl" onClick={() => turn(page + 1)}>
            {page + 1 >= story.pages.length ? "The end ▶" : "Next page ▶"}
          </button>
        </nav>
      </Page>
    );
  }

  if (phase === "end") {
    return (
      <Page className="items-center justify-center gap-5 text-center">
        <Companion mood="cheer" size={150} />
        <h1 className="text-4xl font-bold">The end! 🎉</h1>
        <p className="max-w-md font-read text-xl text-ink-soft">
          You read <strong>{story.title}</strong>. Can you answer {questions.length} questions about it?
        </p>
        <div className="flex w-full max-w-sm flex-col gap-3">
          <button type="button" className="btn btn-good min-h-16 text-2xl" onClick={() => setPhase("quiz")}>
            Let&apos;s go!
          </button>
          <button type="button" className="btn min-h-14 text-xl" onClick={() => (setPage(story.pages.length - 1), setPhase("reading"))}>
            ◀ Back to the story
          </button>
        </div>
      </Page>
    );
  }

  if (phase === "quiz" && q) {
    return (
      <Page className="gap-4">
        {header}
        <section key={qIndex} className="flex flex-1 flex-col gap-5 py-3">
          <div className="flex animate-rise-in items-start gap-2 sm:gap-4">
            <Critter id="ruby" mood={status === "retry" ? "oops" : status === "correct" ? "cheer" : "think"} size={little ? 100 : 84} />
            <SpeechBubble className="mt-2 flex-1">
              <h1 className={`font-read font-bold leading-snug ${little ? "text-3xl" : "text-2xl"}`}>{q.prompt}</h1>
            </SpeechBubble>
            <button type="button" className="btn btn-soft h-14 w-14 shrink-0 text-2xl" aria-label="Read it to me" onClick={() => speakQuestion(q)}>
              🔊
            </button>
          </div>
          {status !== "answering" && status !== "correct" && (
            <p className="rounded-2xl border-[3px] border-help bg-help-soft px-4 py-3 font-read text-lg leading-snug sm:text-xl" role="status">
              <span aria-hidden="true">💡 </span>
              {status === "revealed" ? `Here's the answer. ${q.hint}` : q.hint}
            </p>
          )}
          {status === "correct" && (
            <p className="text-center text-2xl font-bold text-good" role="status">
              {misses === 0 ? "Yes! You remembered! ⭐" : "You found it! ✓"}
            </p>
          )}
          <QuestionBody q={q} status={status} onAttempt={onAttempt} onSlip={() => {}} />
          {(status === "correct" || status === "revealed") && (
            <button type="button" autoFocus className="btn btn-good min-h-16 text-2xl" onClick={nextQuestion}>
              {qIndex + 1 >= questions.length ? "Finish ▶" : "Next question ▶"}
            </button>
          )}
        </section>
      </Page>
    );
  }

  const right = results.filter(Boolean).length;
  return (
    <Page className="items-center justify-center gap-5 text-center">
      <Companion mood="cheer" size={150} />
      <h1 className="text-4xl font-bold">Great reading! 📖</h1>
      <p className="max-w-md font-read text-xl">
        {right} of {questions.length} questions right the first time.
      </p>
      {reward && (reward.xp > 0 || reward.coins > 0) && (
        <p className="text-xl font-bold">
          +{reward.xp} XP · 🪙 +{reward.coins}
        </p>
      )}
      <div className="flex w-full max-w-sm flex-col gap-3">
        <button type="button" className="btn min-h-16 text-2xl" style={{ "--btn-bg": TINT.colour, "--btn-edge": TINT.dark, "--btn-fg": onColour(TINT.colour) } as CSSProperties} onClick={() => go("/stories")}>
          📚 Read another
        </button>
        <button type="button" className="btn min-h-14 text-xl" onClick={again}>
          Read it again
        </button>
      </div>
    </Page>
  );
}
