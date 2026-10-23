import { error, json } from "@/server/auth";
import { audit, requireStaff } from "@/server/admin";
import { extendAccess } from "@/server/codes";
import { query, run } from "@/server/db";
import { deleteFamilyData } from "@/server/deleteFamily";
import { emailLog } from "@/server/emailLog";
import { familyOverrides, setOverride } from "@/server/flags";
import { cancelSubscriptions, stripeCancellationConfigured } from "@/server/stripe";
import { FLAGS, flagDef } from "@/lib/flags";
import type { FamilyInfo } from "@/lib/model";
import { hasPaidPlan, isPremium, trialDaysLeft } from "@/lib/plan";
import { flagsFor } from "@/server/flags";

// Families, for support. The panel shows account emails, plan and billing state, and each child's grade
// and province, but never children's names or practice details. Support staff (SUPPORT_EMAILS) may read
// all of it and keep private notes, and nothing else; every other action is for admins. Class student accounts are left out:
// they belong to their teacher's class.

const DAY = 86_400_000;

interface FamilyListRow {
  family_id: string;
  email: string;
  created_at: number;
  plan: string;
  trial_ends_at: number;
  access_until: number | null;
  subscription_status: string | null;
  last_login_at: number | null;
  last_practice: number | null;
}

/** `?q=` searches by email (or an exact family id); with no query, the newest 50 accounts. `?id=` gives one family. */
export async function GET(req: Request) {
  const gate = await requireStaff(req);
  if ("response" in gate) return gate.response;
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (id) {
    const detail = await familyDetail(id);
    if (!detail) return error(404, "No such family.");
    // Support staff can look at any family, so each look is recorded.
    if (gate.role === "support") await audit(gate.admin.email, "user.view", id);
    return json(detail);
  }
  const q = (url.searchParams.get("q") ?? "").trim().toLowerCase().slice(0, 200);
  const like = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
  const rows = await query<FamilyListRow>(
    `SELECT p.family_id, p.email, p.created_at, f.plan, f.trial_ends_at, f.access_until, f.subscription_status, p.last_login_at,
       (SELECT MAX(e.t) FROM events e WHERE e.family_id = p.family_id) AS last_practice
     FROM parents p JOIN families f ON f.id = p.family_id
     WHERE p.role != 'student' AND (? = '' OR p.email LIKE ? ESCAPE '\\' OR p.family_id = ?)
     ORDER BY p.created_at DESC LIMIT 50`,
    [q, like, q],
  );
  return json({
    users: rows.map((r) => ({
      familyId: r.family_id,
      email: r.email,
      createdAt: Number(r.created_at),
      plan: r.plan,
      trialEndsAt: Number(r.trial_ends_at),
      accessUntil: r.access_until == null ? null : Number(r.access_until),
      subscriptionStatus: r.subscription_status,
      lastLogin: r.last_login_at == null ? null : Number(r.last_login_at),
      lastPractice: r.last_practice == null ? null : Number(r.last_practice),
    })),
  });
}

/** What a family has paid so far, after refunds. CAD and USD stay apart. Null until it has paid anything. */
function customerValue(rows: { amount: number; refunded: number; currency: string; paid_at: number }[]) {
  const paid = rows.filter((p) => Number(p.amount) > Number(p.refunded));
  if (!paid.length) return null;
  const sum = (usd: boolean) => paid.filter((p) => (String(p.currency ?? "cad").toLowerCase() === "usd") === usd).reduce((s, p) => s + Number(p.amount) - Number(p.refunded), 0);
  return { cad: sum(false), usd: sum(true), payments: paid.length, firstPaidAt: Number(paid[0].paid_at), lastPaidAt: Number(paid[paid.length - 1].paid_at) };
}

async function familyDetail(id: string) {
  const family = (await query<Record<string, unknown>>("SELECT * FROM families WHERE id = ?", [id]))[0];
  if (!family) return null;
  const parents = await query<{
    id: string;
    email: string;
    created_at: number;
    email_verified_at: number | null;
    role: string;
    weekly_report: number;
    practice_reminders: number;
    admin_mail: number;
    email_bounced_at: number | null;
    last_login_at: number | null;
  }>(
    "SELECT id, email, created_at, email_verified_at, role, weekly_report, practice_reminders, admin_mail, email_bounced_at, last_login_at FROM parents WHERE family_id = ? ORDER BY created_at",
    [id],
  );
  if (!parents.length || parents.some((p) => p.role === "student")) return null;
  const [payments, profiles, activity, sessions, redemptions, overrides, experiments, classes, emails, notes, flagValues] = await Promise.all([
    query<{ amount: number; refunded: number; currency: string; paid_at: number }>("SELECT amount, refunded, currency, paid_at FROM payments WHERE family_id = ? ORDER BY paid_at", [id]),
    query<{ data: string }>("SELECT data FROM profiles WHERE family_id = ?", [id]),
    query<{ n: number; last: number | null }>("SELECT COUNT(*) AS n, MAX(t) AS last FROM events WHERE family_id = ?", [id]),
    query<{ n: number; last: number | null }>("SELECT COUNT(*) AS n, MAX(created_at) AS last FROM sessions WHERE family_id = ? AND expires_at > ?", [id, Date.now()]),
    query<{ code: string; redeemed_at: number; kind: string }>(
      "SELECT r.code, r.redeemed_at, c.kind FROM code_redemptions r LEFT JOIN redeem_codes c ON c.code = r.code WHERE r.family_id = ? ORDER BY r.redeemed_at DESC",
      [id],
    ),
    familyOverrides(id),
    query<{ experiment: string; variant: string }>("SELECT experiment, variant FROM experiment_assignments WHERE family_id = ?", [id]),
    query<{ n: number }>("SELECT COUNT(*) AS n FROM classes WHERE closed_at IS NULL AND owner_parent_id IN (SELECT id FROM parents WHERE family_id = ?)", [id]),
    emailLog({ familyId: id, limit: 50 }),
    query<{ id: number; author: string; body: string; created_at: number }>("SELECT id, author, body, created_at FROM family_notes WHERE family_id = ? ORDER BY id DESC", [id]),
    flagsFor(id, null),
  ]);
  const children = profiles.flatMap((p) => {
    try {
      const d = JSON.parse(p.data) as { grade?: string; framework?: string; deleted?: boolean };
      return d.deleted ? [] : [{ grade: String(d.grade ?? ""), framework: String(d.framework ?? "") }];
    } catch {
      return [];
    }
  });
  const n = (v: unknown) => (v == null ? null : Number(v));
  // What the family itself sees: their plan as the Subscription page reads it, and which features are on for
  // them. No child's name or results, so support can answer "why can't I see X?".
  const info: FamilyInfo = {
    plan: String(family.plan) as FamilyInfo["plan"],
    trialEndsAt: Number(family.trial_ends_at),
    accessUntil: n(family.access_until),
    subscription: family.subscription_status ? { status: String(family.subscription_status) } : undefined,
    updatedAt: 0,
  };
  return {
    sees: {
      premium: isPremium(info),
      paid: hasPaidPlan(info),
      trialDaysLeft: trialDaysLeft(info),
      flags: FLAGS.filter((f) => flagValues[f.key]).map((f) => f.key),
    },
    notes: notes.map((r) => ({ id: Number(r.id), author: String(r.author), body: String(r.body), createdAt: Number(r.created_at) })),
    family: {
      id,
      createdAt: Number(family.created_at),
      plan: String(family.plan),
      trialEndsAt: Number(family.trial_ends_at),
      accessUntil: n(family.access_until),
      schoolUntil: n(family.school_until),
      discountCode: family.discount_code ?? null,
      stripeCustomer: family.stripe_customer ?? null,
      subscriptionStatus: family.subscription_status ?? null,
      subscriptionInterval: family.subscription_interval ?? null,
      currentPeriodEnd: n(family.current_period_end),
    },
    parents: parents.map((p) => ({
      id: p.id,
      email: p.email,
      createdAt: Number(p.created_at),
      verified: p.email_verified_at != null,
      weeklyReport: Boolean(Number(p.weekly_report)),
      practiceReminders: Boolean(Number(p.practice_reminders)),
      newsAndTips: Boolean(Number(p.admin_mail)),
      bouncedAt: n(p.email_bounced_at),
      lastLogin: n(p.last_login_at),
    })),
    emails,
    children,
    activity: { events: Number(activity[0]?.n ?? 0), lastActive: n(activity[0]?.last) },
    sessions: { active: Number(sessions[0]?.n ?? 0), lastSignIn: n(sessions[0]?.last) },
    classes: Number(classes[0]?.n ?? 0),
    value: customerValue(payments),
    redemptions: redemptions.map((r) => ({ code: r.code, kind: r.kind ?? null, redeemedAt: Number(r.redeemed_at) })),
    overrides: Object.fromEntries(overrides),
    experiments: Object.fromEntries(experiments.map((e) => [e.experiment, e.variant])),
  };
}

interface ActionBody {
  familyId?: unknown;
  action?: unknown;
  days?: unknown;
  parentId?: unknown;
  key?: unknown;
  enabled?: unknown;
  confirm?: unknown;
  body?: unknown;
  noteId?: unknown;
}

const NOTE_MAX = 1000;
/** What support staff may do besides reading. */
const SUPPORT_ACTIONS = new Set(["add-note", "delete-note"]);

const wholeDays = (v: unknown, max: number) => Number.isInteger(v) && (v as number) >= 1 && (v as number) <= max;

/** Support actions on one family. Every one is recorded in the audit log. */
export async function POST(req: Request) {
  const gate = await requireStaff(req);
  if ("response" in gate) return gate.response;
  const admin = gate.admin;
  const body = (await req.json().catch(() => null)) as ActionBody | null;
  const familyId = typeof body?.familyId === "string" ? body.familyId : "";
  if (gate.role === "support" && !SUPPORT_ACTIONS.has(String(body?.action))) return error(403, "Support accounts can only read and add notes.");
  const detail = familyId ? await familyDetail(familyId) : null;
  if (!detail) return error(404, "No such family.");
  const now = Date.now();
  const log = (action: string, info?: unknown) => audit(admin.email, action, familyId, info);

  switch (body!.action) {
    case "add-note": {
      const text = typeof body!.body === "string" ? body!.body.trim() : "";
      if (!text) return error(400, "Write the note first.");
      if (text.length > NOTE_MAX) return error(400, `Keep a note under ${NOTE_MAX} characters.`);
      await run("INSERT INTO family_notes (family_id, author, body, created_at) VALUES (?, ?, ?, ?)", [familyId, admin.email, text, now]);
      // The audit record says a note was added, not what it said.
      await log("user.add-note");
      return json({ ok: true });
    }
    case "delete-note": {
      const row = (await query<{ author: string }>("SELECT author FROM family_notes WHERE id = ? AND family_id = ?", [Number(body!.noteId), familyId]))[0];
      if (!row) return error(404, "No such note.");
      // Support staff can remove their own notes; admins can remove any.
      if (gate.role === "support" && row.author !== admin.email) return error(403, "You can only remove your own notes.");
      await run("DELETE FROM family_notes WHERE id = ? AND family_id = ?", [Number(body!.noteId), familyId]);
      await log("user.delete-note");
      return json({ ok: true });
    }
    case "extend-trial": {
      if (!wholeDays(body!.days, 365)) return error(400, "Days must be a whole number from 1 to 365.");
      const until = Math.max(now, detail.family.trialEndsAt) + (body!.days as number) * DAY;
      await run("UPDATE families SET trial_ends_at = ?, updated_at = ? WHERE id = ?", [until, now, familyId]);
      await log("user.extend-trial", { days: body!.days, until });
      return json({ ok: true });
    }
    case "grant-access": {
      // Days left out (null) means lifetime, the same as a lifetime access code.
      if (body!.days != null && !wholeDays(body!.days, 3650)) return error(400, "Days must be a whole number from 1 to 3650, or left out for lifetime.");
      const until = extendAccess(detail.family.accessUntil, (body!.days as number | null) ?? null, now);
      await run("UPDATE families SET access_until = ?, updated_at = ? WHERE id = ?", [until, now, familyId]);
      await log("user.grant-access", { days: body!.days ?? "lifetime", until });
      return json({ ok: true });
    }
    case "grant-school": {
      // The school plan (roster import): days, or left out for lifetime. Separate from the family's own access.
      if (body!.days != null && !wholeDays(body!.days, 3650)) return error(400, "Days must be a whole number from 1 to 3650, or left out for lifetime.");
      const until = extendAccess(detail.family.schoolUntil, (body!.days as number | null) ?? null, now);
      await run("UPDATE families SET school_until = ?, updated_at = ? WHERE id = ?", [until, now, familyId]);
      await log("user.grant-school", { days: body!.days ?? "lifetime", until });
      return json({ ok: true });
    }
    case "remove-school": {
      await run("UPDATE families SET school_until = NULL, updated_at = ? WHERE id = ?", [now, familyId]);
      await log("user.remove-school");
      return json({ ok: true });
    }
    case "remove-access": {
      await run("UPDATE families SET access_until = NULL, updated_at = ? WHERE id = ?", [now, familyId]);
      await log("user.remove-access");
      return json({ ok: true });
    }
    case "verify-email": {
      const parent = detail.parents.find((p) => p.id === body!.parentId);
      if (!parent) return error(400, "Pick one of the family's accounts.");
      await run("UPDATE parents SET email_verified_at = COALESCE(email_verified_at, ?) WHERE id = ?", [now, parent.id]);
      await log("user.verify-email", { parentId: parent.id });
      return json({ ok: true });
    }
    case "sign-out": {
      const ended = await run("DELETE FROM sessions WHERE family_id = ?", [familyId]);
      await log("user.sign-out", { sessions: ended });
      return json({ ok: true });
    }
    case "override": {
      const def = typeof body!.key === "string" ? flagDef(body!.key) : undefined;
      if (!def) return error(400, "Unknown flag.");
      if (body!.enabled !== null && typeof body!.enabled !== "boolean") return error(400, "Choose on, off or the site-wide setting.");
      await setOverride(def.key, familyId, body!.enabled as boolean | null, now);
      await log("user.override", { key: def.key, enabled: body!.enabled });
      return json({ ok: true });
    }
    case "delete": {
      // Permanent, so the panel asks for one of the family's emails typed out, and never the admin's own.
      if (familyId === admin.familyId) return error(400, "You can't delete your own account here.");
      const confirm = typeof body!.confirm === "string" ? body!.confirm.trim().toLowerCase() : "";
      if (!detail.parents.some((p) => p.email.toLowerCase() === confirm)) return error(400, "Type the account's email to confirm.");
      if (detail.family.stripeCustomer && stripeCancellationConfigured()) {
        try {
          await cancelSubscriptions(String(detail.family.stripeCustomer));
        } catch {
          return error(502, "Stripe couldn't cancel the subscription, so nothing was deleted. Try again in a moment.");
        }
      }
      await deleteFamilyData(familyId);
      // The record keeps no email: the account is gone, and so is what identified it.
      await log("user.delete", { accounts: detail.parents.length });
      return json({ ok: true });
    }
    default:
      return error(400, "Unknown action.");
  }
}
