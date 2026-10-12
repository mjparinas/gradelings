import "server-only";
import { AUTOMATION_REPEAT_DAYS, AUTOMATIONS, parseConfig, type AutomationConfig, type AutomationDef } from "@/lib/automations";
import { segmentMembers, sendMessage, type Recipient } from "./adminEmail";
import { query } from "./db";
import { getSetting, setSetting } from "./payments";

// Automatic nudges, run by the daily job. Each is off until the owner switches it on, sends at most its daily
// cap, and follows the same rules as any panel email (confirmed, news and tips on, not bouncing, not emailed
// from the panel in the last few days). Emails it sends are logged with `sent_by` = `auto:<id>`.

const DAY = 86_400_000;
const key = (id: string) => `automation:${id}`;
export const sentByOf = (id: string) => `auto:${id}`;

export async function getAutomation(def: AutomationDef): Promise<AutomationConfig> {
  return parseConfig(def, await getSetting(key(def.id)));
}

export async function saveAutomation(def: AutomationDef, c: AutomationConfig): Promise<void> {
  await setSetting(key(def.id), JSON.stringify(c));
}

/** Who the nudge would email today, in order, before the daily cap. */
export async function automationAudience(def: AutomationDef, now = Date.now()): Promise<Recipient[]> {
  const { ready } = await segmentMembers(def.segment, now);
  if (!ready.length) return [];
  const recent = new Set(
    (
      await query<{ family_id: string }>("SELECT DISTINCT family_id FROM email_log WHERE sent_by = ? AND status != 'failed' AND sent_at > ?", [
        sentByOf(def.id),
        now - AUTOMATION_REPEAT_DAYS * DAY,
      ])
    ).map((r) => String(r.family_id)),
  );
  // Parents who asked for practice reminders already hear from the daily job when a child goes quiet.
  const reminded =
    def.id === "quiet-7" ? new Set((await query<{ family_id: string }>("SELECT DISTINCT family_id FROM parents WHERE practice_reminders = 1")).map((r) => String(r.family_id))) : new Set<string>();
  return ready.filter((r) => !recent.has(r.familyId) && !reminded.has(r.familyId));
}

export interface AutomationStatus {
  id: string;
  config: AutomationConfig;
  /** How many it would email on the next run (after the cap), and how many are waiting in all. */
  nextRun: number;
  waiting: number;
  sent7: number;
  lastSentAt: number | null;
}

export async function automationStatuses(now = Date.now()): Promise<AutomationStatus[]> {
  return Promise.all(
    AUTOMATIONS.map(async (def) => {
      const [config, audience, sent] = await Promise.all([
        getAutomation(def),
        automationAudience(def, now),
        query<{ n: number; last: number | null }>("SELECT SUM(CASE WHEN sent_at > ? THEN 1 ELSE 0 END) AS n, MAX(sent_at) AS last FROM email_log WHERE sent_by = ? AND status != 'failed'", [
          now - 7 * DAY,
          sentByOf(def.id),
        ]),
      ]);
      return {
        id: def.id,
        config,
        nextRun: Math.min(audience.length, config.dailyCap),
        waiting: audience.length,
        sent7: Number(sent[0]?.n ?? 0),
        lastSentAt: sent[0]?.last == null ? null : Number(sent[0].last),
      };
    }),
  );
}

/** Sends every nudge that's switched on. One failing never stops the others. */
export async function runAutomations(origin: string, now = Date.now()): Promise<Record<string, { sent: number; failed: number }>> {
  const out: Record<string, { sent: number; failed: number }> = {};
  for (const def of AUTOMATIONS) {
    try {
      const c = await getAutomation(def);
      if (!c.on) continue;
      const to = (await automationAudience(def, now)).slice(0, c.dailyCap);
      if (to.length) out[def.id] = await sendMessage(to, c.message, origin, sentByOf(def.id));
    } catch (e) {
      console.error(`[automation ${def.id}] failed`, (e as Error).message);
    }
  }
  return out;
}
