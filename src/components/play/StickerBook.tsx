"use client";

import { useState, type CSSProperties } from "react";
import { dayKey } from "@/lib/model";
import { surpriseStickers } from "@/lib/mystery";
import { useIsOn } from "@/lib/remoteFlags";
import { useRoute } from "@/lib/router";
import { seasonPages } from "@/lib/seasons";
import { useNow } from "@/lib/useNow";
import { practiceUnitRefs } from "@/content";
import { getSubjectMeta } from "@/content/subjects";
import type { SubjectId } from "@/content/types";
import { onColour } from "@/lib/contrast";
import { countEarned, momentStickers, unitStickers, type Sticker } from "@/lib/stickers";
import { useActiveProfile, useChildSettings, useDerived, useSubjectGrades } from "@/lib/store";
import { useBand } from "../band";
import { SayButton } from "./BuddySays";
import { Critter, SpeechBubble } from "../Critter";
import { Page, ProgressBar, subjectVars } from "../ui";
import { TreasureBack } from "./Treasures";

/** A subject, the moments page, the surprises from mystery boxes, or a festival ("leaf-2026"). */
type PageId = string;
type BookSticker = Sticker & { count?: number };

export function StickerBook() {
  const profile = useActiveProfile()!;
  const settings = useChildSettings();
  const d = useDerived();
  const band = useBand();
  const isOn = useIsOn();
  const today = dayKey(useNow());
  const [page, setPage] = useState<PageId>(useRoute().query.get("page") ?? "moments");

  const enabled = settings?.enabledSubjects ?? [];
  const refs = practiceUnitRefs(profile.grade, profile.framework, useSubjectGrades()).filter((r) => enabled.includes(r.course.subject));
  const bySubject = unitStickers(refs, d);
  const subjects = Object.keys(bySubject) as SubjectId[];
  const moments = momentStickers(d);
  // The festival on today, then past festivals with a sticker found. Their stickers are always kept,
  // but the pages go with the festivals if the admin panel switches them off.
  const festivals = isOn("seasonal-events") ? seasonPages(d, band, today) : [];
  // Surprises show once a mystery box has been opened (or while boxes are on, so a child can see what to find).
  const surprises = isOn("mystery-rewards") || Object.keys(d.mysteries).length ? surpriseStickers(d.surprises) : [];
  const pages: { id: PageId; label: string; emoji: string; colour: string; dark: string; stickers: BookSticker[]; subject?: SubjectId; note?: string }[] = [
    { id: "moments", label: "Moments", emoji: "🌟", colour: "#f0bd2a", dark: "#b88905", stickers: moments },
    ...festivals.map(({ run, stickers, live }) => ({
      id: run.key,
      label: live ? run.season.name : `${run.season.name} ${run.year}`,
      emoji: run.season.emoji,
      colour: run.season.colour,
      dark: run.season.dark,
      stickers,
      note: live ? "Festival stickers can only be found during the festival. Missed one? It comes back next year!" : "This festival is over. It comes back next year!",
    })),
    ...(surprises.length ? [{ id: "surprises", label: "Surprises", emoji: "🎁", colour: "#7c4fe0", dark: "#5a32b8", stickers: surprises, note: "Some lessons end with a mystery box. Open it to find these!" }] : []),
    ...subjects.map((s) => {
      const m = getSubjectMeta(s);
      return { id: s, subject: s, label: m.title[band], emoji: m.emoji, colour: m.colour, dark: m.colourDark, stickers: bySubject[s] };
    }),
  ];
  const current = pages.find((p) => p.id === page) ?? pages[0];
  // The count is the lessons and moments a child can always work toward; festival and surprise stickers are extras.
  const all = pages.filter((p) => p.id === "moments" || p.subject).flatMap((p) => p.stickers);
  const got = countEarned(all);
  const say = got === 0 ? "Finish a lesson to stick your first sticker!" : `You have ${got} of ${all.length} stickers.`;
  const meta = current.subject ? getSubjectMeta(current.subject) : undefined;

  return (
    <Page style={meta ? subjectVars(meta) : undefined} className="gap-5">
      <header className="flex items-center gap-3">
        <TreasureBack />
        <h1 className="text-3xl font-bold sm:text-4xl">📒 Sticker Book</h1>
      </header>

      <div className="flex items-center gap-3">
        <Critter id={profile.companion} mood={got === all.length ? "cheer" : "happy"} size={84} className="short:hidden" />
        <SpeechBubble className="flex-1">
          <div className="flex items-center gap-3">
            <p className="flex-1 font-read text-lg font-bold sm:text-xl">{say}</p>
            <SayButton text={say} />
          </div>
          <ProgressBar value={got} max={all.length} className="mt-2" label="Stickers collected" />
        </SpeechBubble>
      </div>

      <div role="tablist" aria-label="Sticker pages" className="flex flex-wrap gap-2 narrow:gap-1.5">
        {pages.map((p) => {
          const on = p.id === current.id;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={on}
              aria-label={`${p.label}, ${countEarned(p.stickers)} of ${p.stickers.length}`}
              onClick={() => setPage(p.id)}
              className={`btn h-14 gap-2 px-4 text-lg narrow:min-w-14 narrow:flex-1 narrow:px-2 ${on ? "" : "btn-soft"}`}
              style={on ? ({ "--btn-bg": p.colour, "--btn-edge": p.dark, "--btn-fg": onColour(p.colour) } as CSSProperties) : undefined}
            >
              <span aria-hidden="true" className="narrow:text-2xl">{p.emoji}</span> <span className="narrow:hidden">{p.label}</span>
            </button>
          );
        })}
      </div>

      {current.note && <p className="font-read text-lg font-semibold text-ink-soft">{current.note}</p>}

      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5" aria-label={`${current.label} stickers`}>
        {current.stickers.map((s: BookSticker) => (
          <li
            key={s.id}
            className={`card flex flex-col items-center gap-1 p-3 text-center ${s.shiny ? "ring-4 ring-[#f0bd2a]" : ""}`}
            style={{ borderStyle: s.earned ? "solid" : "dashed" }}
          >
            <span aria-hidden="true" className={`text-5xl ${s.earned ? "" : "opacity-30 grayscale"}`}>
              {s.earned ? s.emoji : "❔"}
            </span>
            <span className="text-base leading-tight font-bold">
              {s.earned ? s.name : "Sticker to find"}
              {s.shiny && <span className="sr-only"> (shiny)</span>}
            </span>
            {!s.earned && <span className="text-sm leading-tight font-semibold text-ink-soft">{s.hint}</span>}
            {s.shiny && <span aria-hidden="true" className="text-sm font-bold text-[#6b4f00]">✨ Shiny</span>}
            {(s.count ?? 0) > 1 && <span className="text-sm font-bold text-ink-soft">× {s.count}</span>}
          </li>
        ))}
      </ul>
    </Page>
  );
}
