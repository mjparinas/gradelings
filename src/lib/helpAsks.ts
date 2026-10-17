import { parseUnitKey } from "@/content";
import type { AppEvent } from "./model";

// A child who has missed a question twice can tell a grown-up they need help. The parent's Overview lists
// the units from the last two weeks. Only the unit key is stored; it never counts toward practice.

export const HELP_DAYS = 14;

export interface HelpAsk {
  unit: string;
  count: number;
  lastT: number;
}

/** Units one child asked for help with in the last `HELP_DAYS` days, most recent first. */
export function recentHelp(events: AppEvent[], profileId: string, now: number, resetAt = 0): HelpAsk[] {
  const since = Math.max(now - HELP_DAYS * 86_400_000, resetAt);
  const byUnit = new Map<string, HelpAsk>();
  const seen = new Set<string>();
  for (const e of events) {
    if (e.type !== "help" || e.profileId !== profileId || e.t <= since || seen.has(e.id)) continue;
    seen.add(e.id);
    const cur = byUnit.get(e.unit);
    if (cur) {
      cur.count++;
      cur.lastT = Math.max(cur.lastT, e.t);
    } else byUnit.set(e.unit, { unit: e.unit, count: 1, lastT: e.t });
  }
  return [...byUnit.values()].filter((h) => parseUnitKey(h.unit)).sort((a, b) => b.lastT - a.lastT);
}
