"use client";

import { useCallback, useEffect, useState } from "react";
import { SelectMenu } from "@/components/SelectMenu";
import { SEGMENTS, type Segment } from "@/lib/adminEmails";
import { call } from "@/lib/classroom";
import { biggestDrop, FUNNEL_PERIODS, FUNNEL_STEPS, type FunnelStep } from "@/lib/funnel";
import { Notice } from "./Engage";
import { Bars } from "./Skeleton";
import { titleCase } from "@/lib/titleCase";

// The sign-up funnel: how far families who signed up in a period got, where most stop, and a way to email the
// families stuck at each step. Bars use the reports' single blue, with the numbers written beside them.

const card = "rounded-2xl border border-line bg-white p-5";
const pct = (x: number) => `${Math.round(x * 100)}%`;

export function Funnel({ onEmailGroup }: { onEmailGroup: (segment: Segment) => void }) {
  const [days, setDays] = useState("90");
  const [steps, setSteps] = useState<FunnelStep[] | null>(null);
  const [err, setErr] = useState("");
  const load = useCallback(() => {
    call<{ steps: FunnelStep[] }>(`/api/admin/funnel/?days=${days}`).then((r) => setSteps(r.steps), (e: Error) => setErr(e.message));
  }, [days]);
  useEffect(load, [load]);
  const drop = steps ? biggestDrop(steps) : null;
  return (
    <section aria-labelledby="funnel-h" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 id="funnel-h" className="text-2xl font-bold">
          Sign-Up Funnel
        </h2>
        <SelectMenu label="Families who signed up in the last" block={false} value={days} onChange={setDays} options={FUNNEL_PERIODS.map((d) => ({ value: String(d), label: `${d} days` }))} />
      </div>
      <Notice err={err} />
      {!steps ? (
        !err && (
          // Every step is drawn at once under its own name; the numbers fill in when they arrive.
          <ol className="flex flex-col gap-2" aria-busy="true">
            {FUNNEL_STEPS.map((s, i) => (
              <li key={s.id} className={card}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-bold">
                    {i + 1}. {titleCase(s.label)}
                  </h3>
                  <span className="sr-only">Loading…</span>
                  <Bars widths={["w-40"]} />
                </div>
                <Bars widths={["w-full"]} className="mt-3" />
              </li>
            ))}
          </ol>
        )
      ) : steps[0].count === 0 ? (
        <p className={`${card} font-read`}>Nobody signed up in this period yet.</p>
      ) : (
        <>
          {drop && (
            <p className={`${card} font-semibold`} role="status">
              Most families stop before “{drop.label.toLowerCase()}”: only {pct(drop.ofPrevious)} of those at the step before get there.
            </p>
          )}
          <ol className="flex flex-col gap-2">
            {steps.map((s, i) => {
              const def = FUNNEL_STEPS[i];
              const lost = i ? steps[i - 1].count - s.count : 0;
              return (
                <li key={s.id} className={card}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-bold">
                      {i + 1}. {titleCase(s.label)}
                    </h3>
                    <p className="tabular-nums">
                      <span className="text-xl font-bold">{s.count.toLocaleString("en-CA")}</span> · {pct(s.ofStart)} of sign-ups
                      {i > 0 && ` · ${pct(s.ofPrevious)} of the step before`}
                    </p>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-[#e3e2de]" aria-hidden="true">
                    <div className="h-3 rounded-full bg-[#2a78d6]" style={{ width: `${Math.max(s.ofStart * 100, s.count ? 1 : 0)}%` }} />
                  </div>
                  {i > 0 && lost > 0 && (
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
                      <p className="text-ink-soft">{lost.toLocaleString("en-CA")} stopped before this step.</p>
                      {def.segment ? (
                        <button type="button" className="min-h-11 font-semibold text-[#2a5bd7] underline" onClick={() => onEmailGroup(def.segment!)}>
                          {titleCase(def.stuck)}
                        </button>
                      ) : (
                        <p className="text-ink-soft">{titleCase(def.stuck)}</p>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="text-sm text-ink-soft">
            Each email link opens the Emails tab on that group ({FUNNEL_STEPS.filter((s) => s.segment).map((s) => SEGMENTS[s.segment!].name).join(", ")}). The group covers every family at that point, not only
            those who signed up in this period. Nothing is sent until you type the confirmation there.
          </p>
        </>
      )}
    </section>
  );
}
