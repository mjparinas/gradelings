import { error, json } from "@/server/auth";
import { audit, requireAdmin } from "@/server/admin";
import { extendAccess } from "@/server/codes";
import { query, run } from "@/server/db";
import { deleteFamilyData } from "@/server/deleteFamily";
import { emailLog } from "@/server/emailLog";
import { familyOverrides, setOverride } from "@/server/flags";
import { cancelSubscriptions, stripeCancellationConfigured } from "@/server/stripe";
import { flagDef } from "@/lib/flags";

// Families, for support. The panel shows account emails, plan and billing state, and each child's grade
// and province, but never children's names or practice details. Class student accounts are left out:
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
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (id) {
    const detail = await familyDetail(id);
    return detail ? json(detail) : error(404, "No such family.");
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
  const [profiles, activity, sessions, redemptions, overrides, experiments, classes, emails] = await Promise.all([
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
  return {
    family: {
      id,
      createdAt: Number(family.created_at),
      plan: String(family.plan),
      trialEndsAt: Number(family.trial_ends_at),
      accessUntil: n(family.access_until),
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
}

const wholeDays = (v: unknown, max: number) => Number.isInteger(v) && (v as number) >= 1 && (v as number) <= max;

/** Support actions on one family. Every one is recorded in the audit log. */
export async function POST(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const admin = gate.admin;
  const body = (await req.json().catch(() => null)) as ActionBody | null;
  const familyId = typeof body?.familyId === "string" ? body.familyId : "";
  const detail = familyId ? await familyDetail(familyId) : null;
  if (!detail) return error(404, "No such family.");
  const now = Date.now();
  const log = (action: string, info?: unknown) => audit(admin.email, action, familyId, info);

  switch (body!.action) {
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
