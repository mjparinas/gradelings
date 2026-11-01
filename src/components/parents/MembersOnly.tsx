"use client";

import { useMemo, useSyncExternalStore, type ReactNode } from "react";
import { reportUnitRefs } from "@/lib/reports";
import { stakeFor, stakeLine, type ChildStake } from "@/lib/paywall";
import { canUse, upgradeOffer } from "@/lib/plan";
import { useFlag } from "@/lib/remoteFlags";
import { useSay } from "@/lib/say";
import { derivedFor, useProfiles, useStore } from "@/lib/store";
import { subjectGradesFor } from "@/lib/subjectGrades";
import { isStoreApp } from "@/lib/twa";

const noSubscribe = () => () => {};

/** Whether this family sees the full parent reports: members, the trial, or everyone while flag `members-reports` is off. */
export function useFullReports(): boolean {
  const family = useStore((s) => s.family);
  const on = useFlag("members-reports");
  return !on || canUse(family, "fullReports");
}

/**
 * In place of a members-only part of the reports: what it would show, with the child's own numbers, and a way to the
 * plan. The store apps name no payment and link nowhere (`isStoreApp`).
 */
export function MembersOnly({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  const family = useStore((s) => s.family);
  const say = useSay();
  const inStoreApp = useSyncExternalStore(noSubscribe, isStoreApp, () => false);
  const href = family.account ? "#/subscription" : "#/account?next=subscription";
  return (
    <section className={`rounded-2xl border-2 border-dashed border-line bg-paper p-5 print:hidden ${className}`} data-members-only="">
      <h2 className="mb-2 text-xl font-bold">
        <span aria-hidden="true">🔒 </span>
        {say(title)}
      </h2>
      <div className="font-read text-ink-soft">{children}</div>
      {inStoreApp ? (
        <p className="mt-3 text-sm text-ink-soft">This part of the reports opens with a family membership.</p>
      ) : (
        <a href={href} className="btn btn-good mt-3 min-h-12 px-5 text-lg">
          See the family plan
        </a>
      )}
    </section>
  );
}

/** Each child's started units and those the free plan keeps closed, read from their practice on this device. */
export function useStakes(): ChildStake[] {
  const events = useStore((s) => s.events);
  const allProfiles = useStore((s) => s.profiles);
  const settings = useStore((s) => s.settings);
  const profiles = useProfiles();
  const levels = useFlag("subject-levels");
  return useMemo(
    () =>
      profiles.map((p) => {
        const d = derivedFor({ events, profiles: allProfiles }, p.id);
        const refs = reportUnitRefs(p.grade, p.framework, d.units, levels ? subjectGradesFor(p, settings[p.id]) : {});
        return stakeFor(p.name, p.framework, refs.map((ref) => ({ ref, attempts: d.units[ref.key]?.attempts ?? 0 })));
      }),
    [events, allProfiles, settings, profiles, levels],
  );
}

/** One line per child who would lose started units, for a family on the trial or the free plan. Nothing otherwise. */
export function StakeLines({ className = "" }: { className?: string }) {
  const family = useStore((s) => s.family);
  const on = useFlag("personal-paywall");
  const stakes = useStakes();
  const offer = upgradeOffer(family);
  if (!on || !offer) return null;
  const lines = stakes.map((s) => stakeLine(s, offer)).filter((l): l is string => Boolean(l));
  if (!lines.length) return null;
  return (
    <ul className={`flex flex-col gap-1 font-read ${className}`} data-stakes="">
      {lines.map((l) => (
        <li key={l} className="flex gap-2">
          <span aria-hidden="true">{offer === "trial" ? "⏳" : "🔒"}</span> {l}
        </li>
      ))}
    </ul>
  );
}
