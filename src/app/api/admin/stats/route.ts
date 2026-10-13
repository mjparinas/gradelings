import { toCountryCode } from "@/lib/country";
import { error, json } from "@/server/auth";
import { audit, requireAdmin } from "@/server/admin";
import { query } from "@/server/db";
import { getSetting, importPayments, setSetting } from "@/server/payments";
import { stripeCancellationConfigured } from "@/server/stripe";
import { computeMetrics, emptyInput, isMetricSection, SECTION_INPUTS, sectionOf, type FamilyFacts, type MetricsInput } from "@/lib/adminMetrics";

const DAY = 86_400_000;
/** Families that are class student accounts are not customers, so the numbers leave them out. */
const REAL = "NOT EXISTS (SELECT 1 FROM parents p WHERE p.family_id = f.id AND p.role = 'student')";
const REAL_EVENTS = "family_id NOT IN (SELECT family_id FROM parents WHERE role = 'student')";
const COSTS_KEY = "monthly_costs";
/** Practice time per answer is capped, as in the kids' app, so an answer left open doesn't count for hours. */
const MS_CAP = 60_000;

const count = async (sql: string, args: (string | number)[] = []) => Number((await query<{ n: number }>(sql, args))[0]?.n ?? 0);

type Loaders = { [K in keyof Omit<MetricsInput, "now">]: () => Promise<MetricsInput[K]> };

/** One query per part of the input, so a section runs only the queries it needs. */
function loaders(now: number): Loaders {
  return {
    families: async () =>
      (
        await query<Record<string, unknown>>(
          `SELECT f.created_at, f.plan, f.trial_ends_at, f.subscription_status, f.subscription_interval, f.billing_event_at, f.access_until, f.country,
             f.referred_by IS NOT NULL AS referred,
             EXISTS (SELECT 1 FROM parents p WHERE p.family_id = f.id AND p.email_verified_at IS NOT NULL) AS verified,
             EXISTS (SELECT 1 FROM events e WHERE e.family_id = f.id) AS practised
           FROM families f WHERE ${REAL}`,
        )
      ).map(
        (f): FamilyFacts => ({
          createdAt: Number(f.created_at),
          plan: String(f.plan),
          trialEndsAt: Number(f.trial_ends_at),
          subscriptionStatus: (f.subscription_status as string | null) ?? null,
          subscriptionInterval: (f.subscription_interval as string | null) ?? null,
          billingEventAt: Number(f.billing_event_at ?? 0),
          accessUntil: f.access_until == null ? null : Number(f.access_until),
          referred: Boolean(Number(f.referred)),
          verified: Boolean(Number(f.verified)),
          practised: Boolean(Number(f.practised)),
          country: toCountryCode(f.country),
        }),
      ),
    parents: () => count("SELECT COUNT(*) AS n FROM parents WHERE role != 'student'"),
    children: () => count(`SELECT COUNT(*) AS n FROM profiles pr JOIN families f ON f.id = pr.family_id WHERE ${REAL} AND COALESCE(json_extract(pr.data, '$.deleted'), 0) = 0`),
    teachers: () =>
      count(
        `SELECT COUNT(*) AS n FROM (SELECT owner_parent_id AS id FROM classes WHERE closed_at IS NULL
           UNION SELECT ct.parent_id FROM class_teachers ct JOIN classes c ON c.id = ct.class_id WHERE c.closed_at IS NULL)`,
      ),
    students: () => count("SELECT COUNT(*) AS n FROM students"),
    classes: () => count("SELECT COUNT(*) AS n FROM classes WHERE closed_at IS NULL"),
    payments: async () =>
      (
        await query<{ family_id: string | null; amount: number; refunded: number; interval: string | null; paid_at: number; currency: string }>(
          "SELECT family_id, amount, refunded, interval, paid_at, currency FROM payments WHERE paid_at >= ?",
          [Date.UTC(new Date(now).getUTCFullYear() - 2, 0, 1)],
        )
      ).map((p) => ({ familyId: p.family_id ?? null, amount: Number(p.amount), refunded: Number(p.refunded), interval: p.interval ?? null, paidAt: Number(p.paid_at), currency: String(p.currency ?? "cad") })),
    activity: async () =>
      (
        await query<{ day: number; families: number; answers: number; ms: number }>(
          `SELECT CAST(t / ${DAY} AS INTEGER) AS day, COUNT(DISTINCT family_id) AS families,
             SUM(CASE WHEN json_extract(data, '$.type') = 'answer' THEN 1 ELSE 0 END) AS answers,
             SUM(CASE WHEN json_extract(data, '$.type') = 'answer' THEN MIN(MAX(COALESCE(json_extract(data, '$.ms'), 0), 0), ${MS_CAP}) ELSE 0 END) AS ms
           FROM events WHERE t >= ? AND t <= ? AND ${REAL_EVENTS} GROUP BY day`,
          [(Math.floor(now / DAY) - 29) * DAY, now],
        )
      ).map((a) => ({ day: Number(a.day), families: Number(a.families), answers: Number(a.answers ?? 0), ms: Number(a.ms ?? 0) })),
    activeFamilies: async () => {
      const active = (ms: number) => count(`SELECT COUNT(DISTINCT family_id) AS n FROM events WHERE t > ? AND ${REAL_EVENTS}`, [now - ms]);
      const [d1, d7, d30] = await Promise.all([active(DAY), active(7 * DAY), active(30 * DAY)]);
      return { d1, d7, d30 };
    },
    monthlyCosts: async () => Number((await getSetting(COSTS_KEY)) ?? 0) || 0,
    redemptions: () => count("SELECT COUNT(*) AS n FROM code_redemptions"),
    reports: () => count("SELECT COUNT(*) AS n FROM question_reports"),
  };
}

/** Runs the named loaders together and fills the rest of the input with nothing. */
async function load(now: number, keys: readonly (keyof Loaders)[]): Promise<MetricsInput> {
  const all = loaders(now);
  const values = await Promise.all(keys.map((k) => all[k]()));
  return { ...emptyInput(now), ...Object.fromEntries(keys.map((k, i) => [k, values[i]])) };
}

const cancelReasons = async (now: number) =>
  (await query<{ reason: string; n: number }>("SELECT reason, COUNT(*) AS n FROM cancellations WHERE at >= ? GROUP BY reason", [now - 365 * DAY])).map((c) => ({ reason: c.reason, n: Number(c.n) }));

/**
 * The business dashboard: counts and sums only, nothing about any one family. `?section=money`, `customers`,
 * `growth` or `practice` answers for one section of the overview, so each shows as soon as it is ready.
 */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const now = Date.now();
  const section = new URL(req.url).searchParams.get("section");
  if (section !== null) {
    if (!isMetricSection(section)) return error(400, "Pick money, customers, growth or practice.");
    const [input, reasons] = await Promise.all([load(now, SECTION_INPUTS[section]), section === "growth" ? cancelReasons(now) : null]);
    const part = sectionOf(computeMetrics(input), section);
    if (section === "money") return json({ ...part, stripe: stripeCancellationConfigured() });
    if (section === "growth") return json({ ...part, cancelReasons: reasons });
    return json(part);
  }
  const [input, reasons] = await Promise.all([load(now, Object.keys(loaders(now)) as (keyof Loaders)[]), cancelReasons(now)]);
  return json({ ...computeMetrics(input), stripe: stripeCancellationConfigured(), cancelReasons: reasons });
}

/** Saves the monthly running costs, or copies paid invoices from Stripe. */
export async function POST(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const body = (await req.json().catch(() => null)) as { action?: string; monthlyCosts?: number } | null;
  if (body?.action === "costs") {
    const dollars = Number(body.monthlyCosts);
    if (!Number.isFinite(dollars) || dollars < 0 || dollars > 10_000_000) return error(400, "Enter the monthly costs in dollars, 0 or more.");
    const cents = Math.round(dollars * 100);
    await setSetting(COSTS_KEY, String(cents));
    await audit(gate.admin.email, "stats.costs", null, { monthlyCosts: cents });
    return json({ ok: true, monthlyCosts: cents });
  }
  if (body?.action === "import") {
    if (!stripeCancellationConfigured()) return error(400, "Stripe isn't set up on this server (STRIPE_SECRET_KEY).");
    try {
      const result = await importPayments();
      await audit(gate.admin.email, "stats.import", null, result);
      return json(result);
    } catch (e) {
      return error(502, `Stripe didn't answer: ${(e as Error).message}`);
    }
  }
  return error(400, "Unknown action");
}
