import "server-only";
import { query } from "./db";
import { getFramework } from "@/content/frameworks";
import { GRADE_LABEL } from "@/content/subjects";
import type { GradeId } from "@/content/types";
import { DETAIL_LIMIT, type Cell, type Detail, type DetailColumn, type DetailRow, type DetailTable, type DetailView } from "@/lib/adminDetail";
import { familyGroup, fee, LIFETIME_YEARS, monthStart, MONTHLY_CENTS, YEARLY_CENTS, type FamilyGroup } from "@/lib/adminMetrics";

// The lists behind the admin dashboard's tiles. Like the Users tab, they show account emails and billing,
// and children only as counts by grade and province: never a child's name or results. Class student
// accounts are left out.

const DAY = 86_400_000;
const REAL = "NOT EXISTS (SELECT 1 FROM parents s WHERE s.family_id = f.id AND s.role = 'student')";
const EMAIL = "(SELECT p.email FROM parents p WHERE p.family_id = f.id ORDER BY p.created_at LIMIT 1)";
const VERIFIED = "EXISTS (SELECT 1 FROM parents p WHERE p.family_id = f.id AND p.email_verified_at IS NOT NULL)";
const LAST_PRACTICE = "(SELECT MAX(e.t) FROM events e WHERE e.family_id = f.id)";

const GROUP_LABEL: Record<FamilyGroup, string> = {
  paying: "Paying",
  code: "Code access",
  trial: "In trial",
  free: "Free",
};
const col = (label: string, kind: DetailColumn["kind"] = "text"): DetailColumn => ({ label, kind });
const n = (v: unknown) => (v == null ? null : Number(v));
const yes = (v: unknown) => Boolean(Number(v));

function table(columns: DetailColumn[], rows: DetailRow[], title?: string): DetailTable {
  return {
    title,
    columns,
    rows: rows.slice(0, DETAIL_LIMIT),
    total: rows.length,
  };
}

type Row = Record<string, unknown>;
const rowsOf = (sql: string, args: (string | number)[] = []) => query<Row>(sql, args);

const intervalText = (i: unknown) => (i === "year" ? "Yearly" : i === "month" ? "Monthly" : "—");
const perMonth = (i: unknown) => (i === "year" ? Math.round(YEARLY_CENTS / 12) : MONTHLY_CENTS);

async function payments(from: number, to: number, title: string): Promise<Detail> {
  const rows = await rowsOf(
    `SELECT pm.family_id, pm.amount, pm.refunded, pm.interval, pm.paid_at,
       (SELECT p.email FROM parents p WHERE p.family_id = pm.family_id ORDER BY p.created_at LIMIT 1) AS email
     FROM payments pm WHERE pm.paid_at >= ? AND pm.paid_at < ? ORDER BY pm.paid_at DESC`,
    [from, to],
  );
  const amount = rows.reduce((s, r) => s + Number(r.amount), 0);
  const refunded = rows.reduce((s, r) => s + Number(r.refunded), 0);
  const fees = rows.reduce((s, r) => s + fee(Number(r.amount)), 0);
  return {
    title,
    intro: "Every payment Stripe reported in this period. Fees are estimated at 2.9% + 30¢ a payment.",
    summary: [
      { label: "Payments", value: rows.length, kind: "number" },
      { label: "Collected", value: amount, kind: "money" },
      { label: "Refunded", value: refunded, kind: "money" },
      { label: "Fees (est.)", value: fees, kind: "money" },
      { label: "Net", value: amount - refunded - fees, kind: "money" },
    ],
    tables: [
      table(
        [col("Paid", "date"), col("Account", "account"), col("Plan"), col("Amount", "money"), col("Refunded", "money"), col("Fee (est.)", "money")],
        rows.map((r) => ({
          familyId: (r.family_id as string | null) ?? undefined,
          cells: [Number(r.paid_at), (r.email as string | null) ?? "Deleted account", intervalText(r.interval), Number(r.amount), Number(r.refunded), fee(Number(r.amount))],
        })),
      ),
    ],
  };
}

/** Families with their group, for the customer lists. */
async function familyRows(where = "1 = 1", args: (string | number)[] = [], order = "f.created_at DESC") {
  return rowsOf(
    `SELECT f.id, ${EMAIL} AS email, f.created_at, f.plan, f.trial_ends_at, f.access_until, f.subscription_status, f.subscription_interval,
       f.current_period_end, f.billing_event_at, ${VERIFIED} AS verified, ${LAST_PRACTICE} AS last_practice,
       (SELECT COUNT(*) FROM profiles pr WHERE pr.family_id = f.id AND COALESCE(json_extract(pr.data, '$.deleted'), 0) = 0) AS children
     FROM families f WHERE ${REAL} AND ${where} ORDER BY ${order}`,
    args,
  );
}
const group = (r: Row, now: number) =>
  familyGroup(
    {
      plan: String(r.plan),
      accessUntil: n(r.access_until),
      trialEndsAt: Number(r.trial_ends_at),
    },
    now,
  );

export async function detailFor(view: DetailView, now = Date.now()): Promise<Detail> {
  switch (view) {
    case "paying": {
      const rows = await familyRows("f.plan = 'premium'", [], "f.current_period_end");
      const mrr = rows.reduce((s, r) => s + perMonth(r.subscription_interval), 0);
      return {
        title: "Paying families",
        intro: "Recurring revenue counts each plan at list price, with a yearly plan as a twelfth a month.",
        summary: [
          { label: "Paying", value: rows.length, kind: "number" },
          {
            label: "Monthly",
            value: rows.filter((r) => r.subscription_interval === "month").length,
            kind: "number",
          },
          {
            label: "Yearly",
            value: rows.filter((r) => r.subscription_interval === "year").length,
            kind: "number",
          },
          {
            label: "Past due",
            value: rows.filter((r) => r.subscription_status === "past_due").length,
            kind: "number",
          },
          { label: "Recurring a month", value: mrr, kind: "money" },
        ],
        tables: [
          table(
            [col("Account", "account"), col("Plan"), col("Status"), col("Renews", "date"), col("A month", "money"), col("Signed up", "date")],
            rows.map((r) => ({
              familyId: String(r.id),
              cells: [
                r.email as string,
                intervalText(r.subscription_interval),
                (r.subscription_status as string | null) ?? "active",
                n(r.current_period_end),
                perMonth(r.subscription_interval),
                Number(r.created_at),
              ],
            })),
          ),
        ],
      };
    }
    case "payments-month":
      return payments(monthStart(now), now + 1, "Revenue this month");
    case "payments-last-month":
      return payments(monthStart(now, -1), monthStart(now), "Revenue last month");
    case "payments-year":
      return payments(Date.UTC(new Date(now).getUTCFullYear(), 0, 1), now + 1, `Revenue in ${new Date(now).getUTCFullYear()}`);
    case "cancelled": {
      const rows = await familyRows("f.subscription_status = 'canceled' AND f.billing_event_at > ?", [now - 90 * DAY], "f.billing_event_at DESC");
      return {
        title: "Cancelled subscriptions",
        intro: "Subscriptions that ended in the last 90 days. Churn on the dashboard counts the last 30.",
        summary: [
          {
            label: "Last 30 days",
            value: rows.filter((r) => Number(r.billing_event_at) > now - 30 * DAY).length,
            kind: "number",
          },
          { label: "Last 90 days", value: rows.length, kind: "number" },
        ],
        tables: [
          table(
            [col("Account", "account"), col("Plan"), col("Ended", "date"), col("Signed up", "date"), col("Last practice", "date")],
            rows.map((r) => ({
              familyId: String(r.id),
              cells: [r.email as string, intervalText(r.subscription_interval), Number(r.billing_event_at), Number(r.created_at), n(r.last_practice)],
            })),
          ),
        ],
      };
    }
    case "families": {
      const rows = await familyRows();
      const counts = { paying: 0, code: 0, trial: 0, free: 0 };
      for (const r of rows) counts[group(r, now)]++;
      return {
        title: "Families",
        intro: "Newest first.",
        summary: [
          { label: "Families", value: rows.length, kind: "number" },
          { label: "Paying", value: counts.paying, kind: "number" },
          { label: "In trial", value: counts.trial, kind: "number" },
          { label: "Code access", value: counts.code, kind: "number" },
          { label: "Free", value: counts.free, kind: "number" },
        ],
        tables: [
          table(
            [col("Account", "account"), col("Signed up", "date"), col("Group"), col("Children", "number"), col("Email confirmed", "yesno"), col("Last practice", "date")],
            rows.map((r) => ({
              familyId: String(r.id),
              cells: [r.email as string, Number(r.created_at), GROUP_LABEL[group(r, now)], Number(r.children), yes(r.verified), n(r.last_practice)],
            })),
          ),
        ],
      };
    }
    case "trialing": {
      const rows = (await familyRows("f.trial_ends_at > ?", [now], "f.trial_ends_at")).filter((r) => group(r, now) === "trial");
      return {
        title: "In free trial",
        intro: "Soonest to end first.",
        summary: [
          { label: "In trial", value: rows.length, kind: "number" },
          {
            label: "Ending within 7 days",
            value: rows.filter((r) => Number(r.trial_ends_at) < now + 7 * DAY).length,
            kind: "number",
          },
          {
            label: "Have practised",
            value: rows.filter((r) => r.last_practice != null).length,
            kind: "number",
          },
        ],
        tables: [
          table(
            [
              col("Account", "account"),
              col("Trial ends", "date"),
              col("Signed up", "date"),
              col("Children", "number"),
              col("Email confirmed", "yesno"),
              col("Last practice", "date"),
            ],
            rows.map((r) => ({
              familyId: String(r.id),
              cells: [r.email as string, Number(r.trial_ends_at), Number(r.created_at), Number(r.children), yes(r.verified), n(r.last_practice)],
            })),
          ),
        ],
      };
    }
    case "free": {
      const rows = (await familyRows("f.plan != 'premium' AND f.trial_ends_at <= ?", [now], "f.trial_ends_at DESC")).filter((r) => group(r, now) === "free");
      return {
        title: "Free (trial over, not paying)",
        intro: "Families whose trial ended without a subscription or code. They keep the free units. Most recent trial end first.",
        summary: [
          { label: "Free", value: rows.length, kind: "number" },
          {
            label: "Practised in 30 days",
            value: rows.filter((r) => Number(r.last_practice ?? 0) > now - 30 * DAY).length,
            kind: "number",
          },
          {
            label: "Cancelled a subscription",
            value: rows.filter((r) => r.subscription_status === "canceled").length,
            kind: "number",
          },
        ],
        tables: [
          table(
            [col("Account", "account"), col("Trial ended", "date"), col("Signed up", "date"), col("Had a subscription", "yesno"), col("Last practice", "date")],
            rows.map((r) => ({
              familyId: String(r.id),
              cells: [r.email as string, Number(r.trial_ends_at), Number(r.created_at), r.subscription_status === "canceled", n(r.last_practice)],
            })),
          ),
        ],
      };
    }
    case "code-access": {
      const rows = (await familyRows("f.access_until > ?", [now], "f.access_until DESC")).filter((r) => group(r, now) === "code");
      const codes = await rowsOf(`SELECT r.family_id, GROUP_CONCAT(r.code, ', ') AS codes FROM code_redemptions r GROUP BY r.family_id`);
      const byFamily = new Map(codes.map((c) => [String(c.family_id), String(c.codes)]));
      const lifetimeFrom = now + LIFETIME_YEARS * 365 * DAY;
      return {
        title: "Access from a code or admin",
        summary: [
          { label: "Families", value: rows.length, kind: "number" },
          {
            label: "Lifetime",
            value: rows.filter((r) => Number(r.access_until) >= lifetimeFrom).length,
            kind: "number",
          },
        ],
        tables: [
          table(
            [col("Account", "account"), col("Access until"), col("Codes used"), col("Signed up", "date"), col("Last practice", "date")],
            rows.map((r) => {
              const until = Number(r.access_until);
              return {
                familyId: String(r.id),
                cells: [
                  r.email as string,
                  until >= lifetimeFrom ? "Lifetime" : new Date(until).toISOString().slice(0, 10),
                  byFamily.get(String(r.id)) ?? "Given by an admin",
                  Number(r.created_at),
                  n(r.last_practice),
                ],
              };
            }),
          ),
        ],
      };
    }
    case "children": {
      const rows = await rowsOf(
        `SELECT json_extract(pr.data, '$.grade') AS grade, json_extract(pr.data, '$.framework') AS framework FROM profiles pr JOIN families f ON f.id = pr.family_id
         WHERE ${REAL} AND COALESCE(json_extract(pr.data, '$.deleted'), 0) = 0`,
      );
      const tally = (key: (r: Row) => string) => {
        const m = new Map<string, number>();
        for (const r of rows) m.set(key(r), (m.get(key(r)) ?? 0) + 1);
        return [...m];
      };
      const gradeOrder = Object.keys(GRADE_LABEL);
      const grades = tally((r) => String(r.grade ?? "")).sort((a, b) => gradeOrder.indexOf(a[0]) - gradeOrder.indexOf(b[0]));
      const provinces = tally((r) => getFramework(String(r.framework ?? "") || undefined).name).sort((a, b) => b[1] - a[1]);
      const families = new Set(
        rows.length
          ? (
              await rowsOf(
                `SELECT DISTINCT pr.family_id FROM profiles pr JOIN families f ON f.id = pr.family_id WHERE ${REAL} AND COALESCE(json_extract(pr.data, '$.deleted'), 0) = 0`,
              )
            ).map((r) => r.family_id)
          : [],
      );
      return {
        title: "Children",
        intro: "Counts by grade and province only. Children's names and results are never shown here.",
        summary: [
          { label: "Children", value: rows.length, kind: "number" },
          {
            label: "Families with a child",
            value: families.size,
            kind: "number",
          },
        ],
        tables: [
          table(
            [col("Grade"), col("Children", "number")],
            grades.map(([g, c]) => ({
              cells: [GRADE_LABEL[g as GradeId] ?? (g || "Unknown"), c],
            })),
            "By grade",
          ),
          table(
            [col("Province or territory"), col("Children", "number")],
            provinces.map(([p, c]) => ({ cells: [p, c] })),
            "By province or territory",
          ),
        ],
      };
    }
    case "teachers": {
      const rows = await rowsOf(
        `SELECT c.id, c.framework, c.grade, c.created_at, c.last_activity_at,
           (SELECT p.email FROM parents p WHERE p.id = c.owner_parent_id) AS email,
           (SELECT p.family_id FROM parents p WHERE p.id = c.owner_parent_id) AS family_id,
           (SELECT COUNT(*) FROM class_teachers ct WHERE ct.class_id = c.id) AS coteachers,
           (SELECT COUNT(*) FROM students s WHERE s.class_id = c.id) + (SELECT COUNT(*) FROM class_members m WHERE m.class_id = c.id) AS students,
           (SELECT COUNT(*) FROM class_assignments a WHERE a.class_id = c.id) AS assignments
         FROM classes c WHERE c.closed_at IS NULL ORDER BY c.created_at DESC`,
      );
      return {
        title: "Teachers and classes",
        intro: "Open classes, newest first, with the teacher who owns each.",
        summary: [
          { label: "Open classes", value: rows.length, kind: "number" },
          {
            label: "Teachers who own one",
            value: new Set(rows.map((r) => r.email)).size,
            kind: "number",
          },
          {
            label: "Students",
            value: rows.reduce((s, r) => s + Number(r.students), 0),
            kind: "number",
          },
        ],
        tables: [
          table(
            [
              col("Teacher", "account"),
              col("Province"),
              col("Grade"),
              col("Students", "number"),
              col("Co-teachers", "number"),
              col("Assignments", "number"),
              col("Created", "date"),
              col("Last active", "date"),
            ],
            rows.map((r) => ({
              familyId: (r.family_id as string | null) ?? undefined,
              cells: [
                (r.email as string | null) ?? "—",
                getFramework(String(r.framework)).name,
                GRADE_LABEL[String(r.grade) as GradeId] ?? String(r.grade),
                Number(r.students),
                Number(r.coteachers),
                Number(r.assignments),
                Number(r.created_at),
                n(r.last_activity_at) || null,
              ],
            })),
          ),
        ],
      };
    }
    case "codes": {
      const rows = await rowsOf(
        `SELECT r.code, r.redeemed_at, r.family_id, c.kind, c.note, (SELECT p.email FROM parents p WHERE p.family_id = r.family_id ORDER BY p.created_at LIMIT 1) AS email
         FROM code_redemptions r LEFT JOIN redeem_codes c ON c.code = r.code ORDER BY r.redeemed_at DESC`,
      );
      return {
        title: "Codes redeemed",
        intro: "Newest first. Make and disable codes in the Codes tab.",
        summary: [
          { label: "Redeemed", value: rows.length, kind: "number" },
          {
            label: "Access codes",
            value: rows.filter((r) => r.kind === "access").length,
            kind: "number",
          },
          {
            label: "Discount codes",
            value: rows.filter((r) => r.kind === "discount").length,
            kind: "number",
          },
        ],
        tables: [
          table(
            [col("Redeemed", "date"), col("Code"), col("Kind"), col("Note"), col("Account", "account")],
            rows.map((r) => ({
              familyId: String(r.family_id),
              cells: [
                Number(r.redeemed_at),
                String(r.code),
                r.kind === "discount" ? "Discount" : "Access",
                (r.note as string | null) ?? "",
                (r.email as string | null) ?? "Deleted account",
              ],
            })),
          ),
        ],
      };
    }
    case "signups": {
      const rows = await familyRows("f.created_at > ?", [now - 60 * DAY]);
      const today = Math.floor(now / DAY);
      const byDay = new Map<number, number>();
      for (const r of rows) byDay.set(Math.floor(Number(r.created_at) / DAY), (byDay.get(Math.floor(Number(r.created_at) / DAY)) ?? 0) + 1);
      const days: DetailRow[] = [];
      for (let d = today; d > today - 60; d--) days.push({ cells: [d * DAY, byDay.get(d) ?? 0] });
      return {
        title: "Sign-ups",
        intro: "The last 60 days, newest first.",
        summary: [
          {
            label: "This month",
            value: rows.filter((r) => Number(r.created_at) >= monthStart(now)).length,
            kind: "number",
          },
          {
            label: "Last 30 days",
            value: rows.filter((r) => Number(r.created_at) > now - 30 * DAY).length,
            kind: "number",
          },
          { label: "Last 60 days", value: rows.length, kind: "number" },
        ],
        tables: [
          table(
            [col("Account", "account"), col("Signed up", "date"), col("Group"), col("Email confirmed", "yesno"), col("Last practice", "date")],
            rows.map((r) => ({
              familyId: String(r.id),
              cells: [r.email as string, Number(r.created_at), GROUP_LABEL[group(r, now)], yes(r.verified), n(r.last_practice)],
            })),
            "Families",
          ),
          table([col("Day", "date"), col("Sign-ups", "number")], days, "By day"),
        ],
      };
    }
    case "trial-conversion": {
      const rows = await familyRows("f.trial_ends_at <= ? AND f.trial_ends_at > ?", [now, now - 90 * DAY], "f.trial_ends_at DESC");
      const converted = rows.filter((r) => r.plan === "premium").length;
      return {
        title: "Trial to paid",
        intro: "Trials that ended in the last 90 days, and whether the family pays now.",
        summary: [
          { label: "Trials ended", value: rows.length, kind: "number" },
          { label: "Paying now", value: converted, kind: "number" },
          {
            label: "Code access",
            value: rows.filter((r) => group(r, now) === "code").length,
            kind: "number",
          },
        ],
        tables: [
          table(
            [col("Account", "account"), col("Trial ended", "date"), col("Paying now", "yesno"), col("Now"), col("Last practice", "date")],
            rows.map((r) => ({
              familyId: String(r.id),
              cells: [r.email as string, Number(r.trial_ends_at), r.plan === "premium", GROUP_LABEL[group(r, now)], n(r.last_practice)],
            })),
          ),
        ],
      };
    }
    case "activation": {
      const rows = await rowsOf(
        `SELECT f.id, ${EMAIL} AS email, f.created_at, (SELECT MIN(e.t) FROM events e WHERE e.family_id = f.id) AS first_practice,
           (SELECT COUNT(*) FROM events e WHERE e.family_id = f.id AND json_extract(e.data, '$.type') = 'answer') AS answers
         FROM families f WHERE ${REAL} AND f.created_at > ? ORDER BY f.created_at DESC`,
        [now - 90 * DAY],
      );
      const active = rows.filter((r) => r.first_practice != null);
      return {
        title: "Activation",
        intro: "Families who signed up in the last 90 days, and whether a child has practised yet.",
        summary: [
          { label: "New families", value: rows.length, kind: "number" },
          { label: "Have practised", value: active.length, kind: "number" },
          {
            label: "Not yet",
            value: rows.length - active.length,
            kind: "number",
          },
        ],
        tables: [
          table(
            [col("Account", "account"), col("Signed up", "date"), col("Practised", "yesno"), col("First practice", "date"), col("Questions answered", "number")],
            rows.map((r) => ({
              familyId: String(r.id),
              cells: [r.email as string, Number(r.created_at), r.first_practice != null, n(r.first_practice), Number(r.answers)],
            })),
          ),
        ],
      };
    }
    case "unconfirmed": {
      const rows = await rowsOf(
        `SELECT p.family_id, p.email, p.created_at FROM parents p JOIN families f ON f.id = p.family_id
         WHERE p.role != 'student' AND p.email_verified_at IS NULL ORDER BY p.created_at DESC`,
      );
      const total = Number((await rowsOf("SELECT COUNT(*) AS n FROM parents WHERE role != 'student'"))[0]?.n ?? 0);
      return {
        title: "Email not confirmed",
        intro: "Accounts that haven't confirmed their email yet. They can't start a paid plan or get the weekly email until they do. You can confirm one by hand in Users.",
        summary: [
          { label: "Not confirmed", value: rows.length, kind: "number" },
          { label: "Confirmed", value: total - rows.length, kind: "number" },
        ],
        tables: [
          table(
            [col("Account", "account"), col("Signed up", "date")],
            rows.map((r) => ({
              familyId: String(r.family_id),
              cells: [String(r.email), Number(r.created_at)],
            })),
          ),
        ],
      };
    }
    case "referrals": {
      const rows = await rowsOf(
        `SELECT f.id, ${EMAIL} AS email, f.created_at, f.referral_rewarded_at, f.plan,
           (SELECT p.email FROM parents p WHERE p.family_id = f.referred_by ORDER BY p.created_at LIMIT 1) AS referrer, f.referred_by
         FROM families f WHERE ${REAL} AND f.referred_by IS NOT NULL ORDER BY f.created_at DESC`,
      );
      return {
        title: "Referrals",
        intro: "Families who signed up with a friend's code. The friend is thanked once the new account confirms its email.",
        summary: [
          { label: "Referred", value: rows.length, kind: "number" },
          {
            label: "Referrers thanked",
            value: rows.filter((r) => r.referral_rewarded_at != null).length,
            kind: "number",
          },
          {
            label: "Paying now",
            value: rows.filter((r) => r.plan === "premium").length,
            kind: "number",
          },
          {
            label: "Families who referred",
            value: new Set(rows.map((r) => r.referred_by)).size,
            kind: "number",
          },
        ],
        tables: [
          table(
            [col("Account", "account"), col("Signed up", "date"), col("Referred by"), col("Referrer thanked", "date"), col("Paying now", "yesno")],
            rows.map((r) => ({
              familyId: String(r.id),
              cells: [r.email as string, Number(r.created_at), (r.referrer as string | null) ?? "Deleted account", n(r.referral_rewarded_at), r.plan === "premium"],
            })),
          ),
        ],
      };
    }
    case "customers-ever": {
      const rows = await rowsOf(
        `SELECT pm.family_id, MIN(pm.paid_at) AS first, MAX(pm.paid_at) AS last, COUNT(*) AS n, SUM(pm.amount - pm.refunded) AS total,
           (SELECT p.email FROM parents p WHERE p.family_id = pm.family_id ORDER BY p.created_at LIMIT 1) AS email,
           (SELECT f.plan FROM families f WHERE f.id = pm.family_id) AS plan
         FROM payments pm WHERE pm.family_id IS NOT NULL AND pm.paid_at > ? GROUP BY pm.family_id ORDER BY total DESC`,
        [Date.UTC(new Date(now).getUTCFullYear() - 2, 0, 1)],
      );
      return {
        title: "Families who have paid",
        intro: "Since the start of the year two years back, largest total first.",
        summary: [
          { label: "Families", value: rows.length, kind: "number" },
          {
            label: "Still paying",
            value: rows.filter((r) => r.plan === "premium").length,
            kind: "number",
          },
          {
            label: "Total collected",
            value: rows.reduce((s, r) => s + Number(r.total), 0),
            kind: "money",
          },
        ],
        tables: [
          table(
            [col("Account", "account"), col("First payment", "date"), col("Latest payment", "date"), col("Payments", "number"), col("Total", "money"), col("Paying now", "yesno")],
            rows.map((r) => ({
              familyId: String(r.family_id),
              cells: [(r.email as string | null) ?? "—", Number(r.first), Number(r.last), Number(r.n), Number(r.total), r.plan === "premium"],
            })),
          ),
        ],
      };
    }
    case "practising": {
      const rows = await rowsOf(
        `SELECT e.family_id, MAX(e.t) AS last, COUNT(DISTINCT CAST(e.t / ${DAY} AS INTEGER)) AS days,
           SUM(CASE WHEN json_extract(e.data, '$.type') = 'answer' THEN 1 ELSE 0 END) AS answers,
           SUM(CASE WHEN json_extract(e.data, '$.type') = 'answer' THEN MIN(MAX(COALESCE(json_extract(e.data, '$.ms'), 0), 0), 60000) ELSE 0 END) AS ms,
           (SELECT p.email FROM parents p WHERE p.family_id = e.family_id ORDER BY p.created_at LIMIT 1) AS email
         FROM events e WHERE e.t > ? AND e.t <= ? AND e.family_id NOT IN (SELECT family_id FROM parents WHERE role = 'student')
         GROUP BY e.family_id ORDER BY last DESC`,
        [now - 30 * DAY, now],
      );
      return {
        title: "Families practising",
        intro: "Families whose children practised in the last 30 days, most recent first. Totals are for the whole family.",
        summary: [
          {
            label: "Today",
            value: rows.filter((r) => Number(r.last) > now - DAY).length,
            kind: "number",
          },
          {
            label: "This week",
            value: rows.filter((r) => Number(r.last) > now - 7 * DAY).length,
            kind: "number",
          },
          { label: "30 days", value: rows.length, kind: "number" },
          {
            label: "Questions",
            value: rows.reduce((s, r) => s + Number(r.answers ?? 0), 0),
            kind: "number",
          },
        ],
        tables: [
          table(
            [col("Account", "account"), col("Last practice", "date"), col("Days practised", "number"), col("Questions", "number"), col("Minutes", "number")],
            rows.map((r) => ({
              familyId: String(r.family_id),
              cells: [(r.email as string | null) ?? "—", Number(r.last), Number(r.days), Number(r.answers ?? 0), Math.round(Number(r.ms ?? 0) / 60_000)] as Cell[],
            })),
          ),
        ],
      };
    }
  }
}
