"use client";

import { useState, type CSSProperties } from "react";
import { onColour } from "@/lib/contrast";
import { factGrid, factSetsFor, factSummary, factText, getFactSet, hasGrid, type FactCell, type FactSetSummary } from "@/lib/facts";
import { canUse } from "@/lib/plan";
import { go } from "@/lib/router";
import { useActiveProfile, useChildSettings, useDerived, useStore } from "@/lib/store";
import { useBand } from "../band";
import { Page, ProgressBar } from "../ui";
import { MembershipLock } from "./MembershipLock";
import { BackButton } from "./Practice";

const COLOURS = [
  { colour: "#4f8ef7", dark: "#2f6fd6" },
  { colour: "#25b47e", dark: "#16925f" },
  { colour: "#ff9636", dark: "#d9741a" },
  { colour: "#e9559a", dark: "#c43a7c" },
];

/** Math Facts: pick a set (adding to 10 up to division facts) and see how many facts are known. */
export function FactsPicker() {
  const profile = useActiveProfile()!;
  const settings = useChildSettings();
  const d = useDerived();
  const band = useBand();
  const family = useStore((s) => s.family);
  const [locked, setLocked] = useState(false);
  const mathOn = (settings?.enabledSubjects ?? ["math"]).includes("math");
  const sets: FactSetSummary[] = mathOn ? factSetsFor(profile.grade).map((s) => factSummary(s, d.facts)) : [];
  const little = band === "little";

  return (
    <Page className="gap-6">
      <header className="flex items-center gap-3">
        {/* Little kids reach Math Facts from Lessons, so Back goes there. */}
        <BackButton to={little ? "/practice" : "/"} />
        <h1 className="text-3xl font-bold sm:text-4xl">🧮 Math Facts</h1>
      </header>
      {sets.length === 0 ? (
        <p className="font-read text-xl text-ink-soft">{mathOn ? "Math Facts start next year!" : "Math is switched off right now. A grown-up can turn it on."}</p>
      ) : (
        <>
          <p className="font-read text-xl text-ink-soft">
            Quick number facts, one at a time. Get one right twice in a row and it counts as known. Tricky ones come back more often.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {sets.map((s, i) => {
              const c = COLOURS[i % COLOURS.length];
              return (
                <div key={s.set.id} className="animate-rise-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <button
                    type="button"
                    onClick={() => (canUse(family, "facts") ? go("/session", { mode: "facts", scope: s.set.id }) : setLocked(true))}
                    className="btn w-full flex-col items-stretch gap-3 p-5 text-left"
                    style={{ "--btn-bg": c.colour, "--btn-edge": c.dark, "--btn-fg": onColour(c.colour) } as CSSProperties}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-5xl" aria-hidden="true">
                        {s.set.emoji}
                      </span>
                      <span className="text-3xl font-bold">{s.set.title}</span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="flex-1 rounded-full bg-white/30 p-1" style={{ "--c": "#ffffff" } as CSSProperties}>
                        <ProgressBar value={s.known} max={s.total} height={14} track="transparent" label={`${s.set.title} known`} />
                      </span>
                      <span className="text-base font-semibold">
                        {s.known} of {s.total}
                      </span>
                    </span>
                    {s.tricky.length > 0 && !little && (
                      <span className="text-base font-semibold">Practising: {s.tricky.slice(0, 3).map(factText).join(", ")}</span>
                    )}
                  </button>
                  {hasGrid(s.set) && s.tried > 0 && (
                    <a href={`#/facts/${s.set.id}`} className="btn btn-soft mt-2 min-h-12 w-full text-lg">
                      <span aria-hidden="true">🔢</span> See my chart
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
      <MembershipLock open={locked} onClose={() => setLocked(false)} />
    </Page>
  );
}

const SIGN = { add: "+", mul: "×" } as const;

/** One set as a 10 × 10 chart: the answer shows where a fact is known, a dot where it is being practised. */
export function FactChart({ id }: { id: string }) {
  const profile = useActiveProfile()!;
  const settings = useChildSettings();
  const d = useDerived();
  const set = getFactSet(id);
  const mathOn = (settings?.enabledSubjects ?? ["math"]).includes("math");
  if (!set || !hasGrid(set) || !mathOn || !factSetsFor(profile.grade).some((s) => s.id === set.id)) {
    return (
      <Page className="gap-6">
        <header className="flex items-center gap-3">
          <BackButton to="/facts" />
          <h1 className="text-3xl font-bold sm:text-4xl">🧮 Math Facts</h1>
        </header>
        <p className="font-read text-xl text-ink-soft">That chart isn&apos;t here.</p>
      </Page>
    );
  }
  const summary = factSummary(set, d.facts);
  const grid = factGrid(set, d.facts);
  const sign = SIGN[set.op as keyof typeof SIGN];
  const title = set.op === "mul" ? "My times-table chart" : "My adding chart";
  return (
    <Page className="gap-5">
      <header className="flex items-center gap-3">
        <BackButton to="/facts" />
        <h1 className="text-3xl font-bold sm:text-4xl narrow:text-2xl">
          <span aria-hidden="true">{set.emoji}</span> {title}
        </h1>
      </header>
      <p className="font-read text-xl">
        <b>{summary.known}</b> of {summary.total} known. Each one you know shows its answer.
      </p>
      <table className="mx-auto w-full max-w-xl table-fixed border-separate border-spacing-0.5 text-center font-bold tabular-nums sm:border-spacing-1" data-testid="fact-chart">
        <caption className="sr-only">
          {set.title}: rows are the first number, columns the second
        </caption>
        <thead>
          <tr>
            <th scope="col" className="text-lg text-ink-soft narrow:text-sm">
              {sign}
            </th>
            {grid[0].map((c) => (
              <th key={c.col} scope="col" className="text-xs text-ink-soft sm:text-base">
                {c.col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.map((row) => (
            <tr key={row[0].row}>
              <th scope="row" className="text-xs text-ink-soft sm:text-base">
                {row[0].row}
              </th>
              {row.map((c) => (
                <ChartCell key={c.col} cell={c} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="flex flex-wrap justify-center gap-3 font-read text-base">
        <li className="flex items-center gap-2">
          <span className="fact-cell inline-flex h-7 w-7 items-center justify-center rounded-md border-2 border-good bg-good-soft text-sm font-bold" data-state="known" aria-hidden="true">
            12
          </span>
          Known
        </li>
        <li className="flex items-center gap-2">
          <span className="fact-cell inline-flex h-7 w-7 items-center justify-center rounded-md border-2 border-nudge bg-nudge-soft text-sm font-bold" data-state="learning" aria-hidden="true">
            •
          </span>
          Practising
        </li>
        <li className="flex items-center gap-2">
          <span className="fact-cell inline-flex h-7 w-7 rounded-md border-2 border-line bg-white" data-state="new" aria-hidden="true" />
          Not tried yet
        </li>
      </ul>
      <button type="button" className="btn btn-good mx-auto min-h-14 w-full max-w-md text-xl" onClick={() => go("/session", { mode: "facts", scope: set.id })}>
        Practise {set.title.toLowerCase()} ▶
      </button>
    </Page>
  );
}

function ChartCell({ cell }: { cell: FactCell }) {
  if (!cell.fact) return <td aria-hidden="true" />;
  const known = cell.state === "known";
  const practising = cell.state === "learning" || cell.state === "tricky";
  const style = known ? "border-good bg-good-soft" : practising ? "border-nudge bg-nudge-soft" : "border-line bg-white";
  const label = `${factText(cell.fact)}: ${known ? `${cell.fact.answer}, known` : practising ? "practising" : "not tried yet"}`;
  return (
    <td className="p-0">
      <span
        className={`fact-cell flex aspect-square items-center justify-center rounded-md border-2 text-[11px] leading-none sm:text-base ${style}`}
        data-state={known ? "known" : practising ? "learning" : "new"}
        role="img"
        aria-label={label}
      >
        {known ? cell.fact.answer : practising ? "•" : ""}
      </span>
    </td>
  );
}
