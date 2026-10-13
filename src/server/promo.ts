import "server-only";
import { randomUUID } from "node:crypto";
import { fillPromoText, getPreset, isPromoLink, promoLinkLabel, PROMO_LIMITS, type LivePromo, type PromoOffer } from "@/lib/promo";
import { getCode, normalizeCode, type CodeRow } from "./codes";
import { query, run } from "./db";

// Site-wide sales (src/lib/promo.ts): made in the admin panel's Sales tab, shown as a banner on the public
// pages by /api/promo/ while they run. A sale names an existing redeem code; if that code is disabled or
// runs out, the banner stops showing, so the site never advertises a code that doesn't work.

export interface PromoRow {
  id: string;
  preset: string;
  emoji: string;
  headline: string;
  body: string;
  code: string;
  link: string;
  starts_at: number;
  ends_at: number;
  created_at: number;
  created_by: string;
  stopped_at: number | null;
}

export interface NewPromo {
  preset?: unknown;
  emoji?: unknown;
  headline?: unknown;
  body?: unknown;
  code?: unknown;
  link?: unknown;
  startsAt?: unknown;
  endsAt?: unknown;
}

const YEAR = 366 * 86_400_000;

export const offerOf = (c: CodeRow): PromoOffer => ({
  code: c.code,
  kind: c.kind,
  percentOff: c.percent_off,
  duration: c.duration,
  months: c.months,
  days: c.days,
});

/** Why a code can't be advertised right now, or null when it can. */
export function codeProblem(c: CodeRow | null, until: number, now = Date.now()): string | null {
  if (!c) return "There is no code with that name. Make it on the Codes tab first.";
  if (c.disabled_at) return "That code is disabled.";
  if (c.expires_at && c.expires_at <= now) return "That code has expired.";
  if (c.max_uses != null && c.uses >= c.max_uses) return "That code has been used up.";
  if (c.expires_at && c.expires_at < until) return "That code expires before the sale ends. Pick an earlier end date or a different code.";
  return null;
}

/** Checks and saves a new sale. Returns the row, or an error message. */
export async function createPromo(p: NewPromo, admin: string, now = Date.now()): Promise<PromoRow | string> {
  const preset = typeof p.preset === "string" && getPreset(p.preset) ? p.preset : "custom";
  const emoji = typeof p.emoji === "string" && p.emoji.length <= 8 ? p.emoji : (getPreset(preset)?.emoji ?? "✨");
  const headline = typeof p.headline === "string" ? p.headline.trim() : "";
  const body = typeof p.body === "string" ? p.body.trim() : "";
  if (!headline) return "Write a headline.";
  if (headline.length > PROMO_LIMITS.headline) return `Keep the headline to ${PROMO_LIMITS.headline} characters.`;
  if (body.length > PROMO_LIMITS.body) return `Keep the message to ${PROMO_LIMITS.body} characters.`;
  if (!isPromoLink(p.link)) return "Pick where the button goes.";
  const startsAt = Number(p.startsAt);
  const endsAt = Number(p.endsAt);
  if (!Number.isFinite(startsAt) || !Number.isFinite(endsAt)) return "Pick a start and end date.";
  if (endsAt <= startsAt) return "The sale must end after it starts.";
  if (endsAt <= now) return "The end date has already passed.";
  if (endsAt - startsAt > YEAR) return "A sale can run for a year at most.";
  if (typeof p.code !== "string" || !p.code.trim()) return "Pick a code.";
  const code = await getCode(p.code);
  const problem = codeProblem(code, endsAt, now);
  if (problem) return problem;
  const row: PromoRow = {
    id: randomUUID(),
    preset,
    emoji,
    headline,
    body,
    code: normalizeCode(p.code),
    link: p.link,
    starts_at: startsAt,
    ends_at: endsAt,
    created_at: now,
    created_by: admin,
    stopped_at: null,
  };
  await run(
    `INSERT INTO promotions (id, preset, emoji, headline, body, code, link, starts_at, ends_at, created_at, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [row.id, row.preset, row.emoji, row.headline, row.body, row.code, row.link, row.starts_at, row.ends_at, row.created_at, row.created_by],
  );
  return row;
}

function toRow(r: PromoRow): PromoRow {
  return {
    id: String(r.id),
    preset: String(r.preset),
    emoji: String(r.emoji),
    headline: String(r.headline),
    body: String(r.body),
    code: String(r.code),
    link: String(r.link),
    starts_at: Number(r.starts_at),
    ends_at: Number(r.ends_at),
    created_at: Number(r.created_at),
    created_by: String(r.created_by),
    stopped_at: r.stopped_at == null ? null : Number(r.stopped_at),
  };
}

export async function listPromos(): Promise<PromoRow[]> {
  return (await query<PromoRow>("SELECT * FROM promotions ORDER BY starts_at DESC LIMIT 200")).map(toRow);
}

/** Ends a sale now (it stays in the list). */
export async function stopPromo(id: string, now = Date.now()): Promise<boolean> {
  return (await run("UPDATE promotions SET stopped_at = ? WHERE id = ? AND stopped_at IS NULL", [now, id])) > 0;
}

export async function deletePromo(id: string): Promise<boolean> {
  return (await run("DELETE FROM promotions WHERE id = ?", [id])) > 0;
}

export type PromoStatus = "live" | "scheduled" | "ended" | "stopped";

export function promoStatus(p: PromoRow, now = Date.now()): PromoStatus {
  if (p.stopped_at) return "stopped";
  if (p.ends_at <= now) return "ended";
  return p.starts_at <= now ? "live" : "scheduled";
}

/**
 * The sale the banner shows now: of those running, the one that started last, as long as its code still
 * works. Null when there is none.
 */
export async function livePromo(now = Date.now()): Promise<LivePromo | null> {
  const rows = (await query<PromoRow>(
    "SELECT * FROM promotions WHERE stopped_at IS NULL AND starts_at <= ? AND ends_at > ? ORDER BY starts_at DESC, created_at DESC LIMIT 5",
    [now, now],
  )).map(toRow);
  for (const p of rows) {
    const code = await getCode(p.code);
    if (!code || codeProblem(code, now, now)) continue;
    const offer = offerOf(code);
    return {
      id: p.id,
      emoji: p.emoji,
      headline: fillPromoText(p.headline, offer),
      body: fillPromoText(p.body, offer),
      code: code.code,
      link: p.link,
      linkLabel: promoLinkLabel(p.link),
      endsAt: p.ends_at,
    };
  }
  return null;
}
