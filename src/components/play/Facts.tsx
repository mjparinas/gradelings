"use client";

import { useState, type CSSProperties } from "react";
import { onColour } from "@/lib/contrast";
import { factSetsFor, factSummary, factText, type FactSetSummary } from "@/lib/facts";
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
