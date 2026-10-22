import "server-only";
import { query } from "./db";
import { guestCounts, guestLastPlayed } from "./guests";
import { clicksDetail } from "./traffic";
import { getFramework } from "@/content/frameworks";
import { GRADE_LABEL } from "@/content/subjects";
import type { GradeId } from "@/content/types";
import { DETAIL_LIMIT, type Cell, type Detail, type DetailColumn, type DetailRow, type DetailTable, type DetailView } from "@/lib/adminDetail";
import { cancelledOn, familyGroup, fee, LIFETIME_YEARS, monthStart, MONTHLY_CENTS, MONTHLY_CENTS_USD, wontRenew, YEARLY_CENTS, YEARLY_CENTS_USD, type FamilyGroup } from "@/lib/adminMetrics";
import { countryOf, toCountryCode } from "@/lib/country";

// The lists behind the admin dashboard's tiles. Like the Users tab, they show account emails and billing,
// and children only as counts by grade and province: never a child's name or results. Class student
// accounts are left out.

const DAY = 86_400_000;
const REAL = "NOT EXISTS (SELECT 1 FROM parents s WHERE s.family_id = f.id AND s.role = 'student')";
const EMAIL = "(SELECT p.email FROM parents p WHERE p.family_id = f.id ORDER BY p.created_at LIMIT 1)";
const VERIFIED = "EXISTS (SELECT 1 FROM parents p WHERE p.family_id = f.id AND p.email_verified_at IS NOT NULL)";
/** Everyone teaching an open class, owner or co-teacher, once each: the dashboard's Teachers tile. */
export const OPEN_CLASS_TEACHERS = `SELECT owner_parent_id AS id FROM classes WHERE closed_at IS NULL
  UNION SELECT ct.parent_id FROM class_teachers ct JOIN classes c ON c.id = ct.class_id WHERE c.closed_at IS NULL`;
/** Class student accounts in open classes: the dashboard's student accounts. */
export const OPEN_CLASS_STUDENTS = "SELECT COUNT(*) AS n FROM students s JOIN classes c ON c.id = s.class_id WHERE c.closed_at IS NULL";
const LAST_PRACTICE = "(SELECT MAX(e.t) FROM events e WHERE e.family_id = f.id)";
/** 1 when the family's latest payment was refunded in full (a refund ends the plan, so it won't renew). */
export const LATEST_REFUNDED =
  "COALESCE((SELECT pm.amount > 0 AND pm.refunded >= pm.amount FROM payments pm WHERE pm.family_id = f.id ORDER BY pm.paid_at DESC LIMIT 1), 0)";

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

const intervalText = (i: unknown) => (i === "year" ? "Yearly" : i === "month" ? "Monthly" : i === "gift" ? "Gift" : "—");
const perMonth = (i: unknown, usd: boolean) => (i === "year" ? Math.round((usd ? YEARLY_CENTS_USD : YEARLY_CENTS) / 12) : usd ? MONTHLY_CENTS_USD : MONTHLY_CENTS);
/** A US family pays in USD, as the dashboard decides it. */
const usFamily = (r: Row) => countryOf(toCountryCode(r.country)).currency === "USD";

const isUsd = (r: Row) => String(r.currency ?? "cad").toLowerCase() === "usd";
/** What a payment brought in after refunds, as the dashboard counts it. */
const netOf = (r: Row) => Math.max(0, Number(r.amount) - Number(r.refunded));

async function payments(from: number, to: number, title: string): Promise<Detail> {
  const all = await rowsOf(
    `SELECT pm.family_id, pm.amount, pm.refunded, pm.interval, pm.paid_at, pm.currency,
       (SELECT p.email FROM parents p WHERE p.family_id = pm.family_id ORDER BY p.created_at LIMIT 1) AS email
     FROM payments pm WHERE pm.paid_at >= ? AND pm.paid_at < ? ORDER BY pm.paid_at DESC`,
    [from, to],
  );
  // The dashboard's revenue is CAD only, so the headline numbers are too; US payments get their own table.
  const rows = all.filter((r) => !isUsd(r));
  const us = all.filter(isUsd);
  const amount = rows.reduce((s, r) => s + Number(r.amount), 0);
  const refunded = rows.reduce((s, r) => s + Number(r.refunded), 0);
  const fees = rows.reduce((s, r) => s + fee(Number(r.amount)), 0);
  const revenue = rows.reduce((s, r) => s + netOf(r), 0);
  const list = (rs: Row[], money: "money" | "money-usd", heading?: string) =>
    table(
      [col("Paid", "date"), col("Account", "account"), col("Plan"), col("Amount", money), col("Refunded", money), col("Fee (est.)", money)],
      rs.map((r) => ({
        familyId: (r.family_id as string | null) ?? undefined,
        cells: [Number(r.paid_at), (r.email as string | null) ?? (r.interval === "gift" ? "Gift buyer" : "Deleted account"), intervalText(r.interval), Number(r.amount), Number(r.refunded), fee(Number(r.amount))],
      })),
      heading,
    );
  return {
    title,
    intro: `Every payment Stripe reported in this period. Revenue is what was collected less refunds, as on the dashboard. Fees are estimated at 2.9% + 30¢ a payment.${us.length ? " US payments are in US dollars and kept out of the totals." : ""}`,
    summary: [
      { label: "Payments", value: rows.length, kind: "number" },
      { label: "Revenue", value: revenue, kind: "money" },
      { label: "Collected", value: amount, kind: "money" },
      { label: "Refunded", value: refunded, kind: "money" },
      { label: "Fees (est.)", value: fees, kind: "money" },
      { label: "Net", value: amount - refunded - fees, kind: "money" },
      ...(us.length ? [{ label: "US revenue", value: us.reduce((s, r) => s + netOf(r), 0), kind: "money-usd" as const }] : []),
    ],
    tables: us.length ? [list(rows, "money", "Canadian payments (CAD)"), list(us, "money-usd", "US payments (USD)")] : [list(rows, "money")],
  };
}

/** Families with their group, for the customer lists. */
async function familyRows(where = "1 = 1", args: (string | number)[] = [], order = "f.created_at DESC") {
  return rowsOf(
    `SELECT f.id, ${EMAIL} AS email, f.created_at, f.plan, f.trial_ends_at, f.access_until, f.subscription_status, f.subscription_interval,
       f.current_period_end, f.billing_event_at, f.cancel_at, f.cancelled_at, f.country, ${LATEST_REFUNDED} AS refunded, ${VERIFIED} AS verified, ${LAST_PRACTICE} AS last_practice,
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
      // A plan that won't renew (cancelled to end, or refunded) still has access, but brings in nothing more.
      const ending = (r: Row) => wontRenew({ cancelAt: n(r.cancel_at), refunded: yes(r.refunded) });
      const monthOf = (r: Row) => (ending(r) ? 0 : perMonth(r.subscription_interval, usFamily(r)));
      // Like the dashboard, recurring revenue is CAD from Canadian families; US families pay in USD, counted apart.
      const ca = rows.filter((r) => !usFamily(r));
      const us = rows.filter(usFamily);
      const list = (rs: Row[], money: "money" | "money-usd", heading?: string) =>
        table(
          [col("Account", "account"), col("Plan"), col("Status"), col("Renews or ends", "date"), col("A month", money), col("Signed up", "date")],
          rs.map((r) => ({
            familyId: String(r.id),
            cells: [
              r.email as string,
              intervalText(r.subscription_interval),
              yes(r.refunded) ? "refunded" : r.cancel_at ? "cancelling" : ((r.subscription_status as string | null) ?? "active"),
              n(r.cancel_at) ?? n(r.current_period_end),
              monthOf(r),
              Number(r.created_at),
            ],
          })),
          heading,
        );
      return {
        title: "Paying families",
        intro:
          "Recurring revenue counts each plan that renews at list price, with a yearly plan as a twelfth a month. A plan cancelled to end, or refunded, keeps access until it ends but counts nothing. US families pay in US dollars, kept out of the CAD total.",
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
          { label: "Cancelling", value: rows.filter(ending).length, kind: "number" },
          { label: "Recurring a month", value: ca.reduce((s, r) => s + monthOf(r), 0), kind: "money" },
          ...(us.length ? [{ label: "US recurring a month", value: us.reduce((s, r) => s + monthOf(r), 0), kind: "money-usd" as const }] : []),
        ],
        tables: us.length ? [list(ca, "money", "Canadian families (CAD)"), list(us, "money-usd", "US families (USD)")] : [list(rows, "money")],
      };
    }
    case "payments-month":
      return payments(monthStart(now), now + 1, "Revenue this month");
    case "payments-last-month":
      return payments(monthStart(now, -1), monthStart(now), "Revenue last month");
    case "payments-year":
      return payments(Date.UTC(new Date(now).getUTCFullYear(), 0, 1), now + 1, `Revenue in ${new Date(now).getUTCFullYear()}`);
    case "cancelled": {
      // Ended plans, and plans still running that are set to end. Each counts from the day it was cancelled.
      const all = await familyRows(
        "((f.subscription_status = 'canceled' AND f.plan != 'premium') OR (f.plan = 'premium' AND f.cancel_at IS NOT NULL)) AND COALESCE(f.cancelled_at, f.billing_event_at) > ?",
        [now - 90 * DAY],
      );
      const on = (r: Row) =>
        cancelledOn({
          plan: String(r.plan),
          subscriptionStatus: (r.subscription_status as string | null) ?? null,
          cancelAt: n(r.cancel_at),
          cancelledAt: n(r.cancelled_at),
          billingEventAt: Number(r.billing_event_at ?? 0),
        }) ?? 0;
      const rows = all.sort((x, y) => on(y) - on(x));
      return {
        title: "Cancelled subscriptions",
        intro: "Subscriptions cancelled in the last 90 days, including ones still running until their paid time ends. Churn on the dashboard counts the last 30.",
        summary: [
          {
            label: "Last 30 days",
            value: rows.filter((r) => on(r) > now - 30 * DAY).length,
            kind: "number",
          },
          { label: "Last 90 days", value: rows.length, kind: "number" },
          { label: "Still running", value: rows.filter((r) => r.plan === "premium").length, kind: "number" },
        ],
        tables: [
          table(
            [col("Account", "account"), col("Plan"), col("Cancelled", "date"), col("Access ends", "date"), col("Signed up", "date"), col("Last practice", "date")],
            rows.map((r) => ({
              familyId: String(r.id),
              cells: [r.email as string, intervalText(r.subscription_interval), on(r), r.plan === "premium" ? n(r.cancel_at) : Number(r.billing_event_at), Number(r.created_at), n(r.last_practice)],
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
      // A student a teacher added has a class_members row as well as a students row, so the class's children are
      // its class_members rows: student accounts plus children their parents linked.
      const rows = await rowsOf(
        `SELECT c.id, c.framework, c.grade, c.created_at, c.last_activity_at,
           (SELECT p.email FROM parents p WHERE p.id = c.owner_parent_id) AS email,
           (SELECT p.family_id FROM parents p WHERE p.id = c.owner_parent_id) AS family_id,
           (SELECT COUNT(*) FROM class_teachers ct WHERE ct.class_id = c.id) AS coteachers,
           (SELECT COUNT(*) FROM students s WHERE s.class_id = c.id) AS accounts,
           (SELECT COUNT(*) FROM class_members m WHERE m.class_id = c.id
              AND NOT EXISTS (SELECT 1 FROM students s WHERE s.class_id = m.class_id AND s.profile_id = m.profile_id)) AS linked,
           (SELECT COUNT(*) FROM class_assignments a WHERE a.class_id = c.id) AS assignments
         FROM classes c WHERE c.closed_at IS NULL ORDER BY c.created_at DESC`,
      );
      const teachers = Number((await rowsOf(`SELECT COUNT(*) AS n FROM (${OPEN_CLASS_TEACHERS})`))[0]?.n ?? 0);
      return {
        title: "Teachers and classes",
        intro: "Open classes, newest first, with the teacher who owns each. Teachers counts owners and co-teachers once each.",
        summary: [
          { label: "Open classes", value: rows.length, kind: "number" },
          { label: "Teachers", value: teachers, kind: "number" },
          {
            label: "Student accounts",
            value: rows.reduce((s, r) => s + Number(r.accounts), 0),
            kind: "number",
          },
          {
            label: "Linked by parents",
            value: rows.reduce((s, r) => s + Number(r.linked), 0),
            kind: "number",
          },
        ],
        tables: [
          table(
            [
              col("Teacher", "account"),
              col("Province"),
              col("Grade"),
              col("Student accounts", "number"),
              col("Linked by parents", "number"),
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
                Number(r.accounts),
                Number(r.linked),
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
      // As on the dashboard: a family counts once it has a payment that wasn't refunded in full.
      const rows = await rowsOf(
        `SELECT pm.family_id, MIN(pm.paid_at) AS first, MAX(pm.paid_at) AS last, COUNT(*) AS n,
           SUM(CASE WHEN LOWER(pm.currency) = 'usd' THEN 0 ELSE MAX(pm.amount - pm.refunded, 0) END) AS total,
           SUM(CASE WHEN LOWER(pm.currency) = 'usd' THEN MAX(pm.amount - pm.refunded, 0) ELSE 0 END) AS total_usd,
           (SELECT p.email FROM parents p WHERE p.family_id = pm.family_id ORDER BY p.created_at LIMIT 1) AS email,
           (SELECT f.plan FROM families f WHERE f.id = pm.family_id) AS plan
         FROM payments pm WHERE pm.family_id IS NOT NULL AND pm.paid_at >= ? GROUP BY pm.family_id
         HAVING SUM(CASE WHEN pm.amount > pm.refunded THEN 1 ELSE 0 END) > 0 ORDER BY total DESC, total_usd DESC`,
        [Date.UTC(new Date(now).getUTCFullYear() - 2, 0, 1)],
      );
      const usd = rows.reduce((s, r) => s + Number(r.total_usd), 0);
      return {
        title: "Families who have paid",
        intro: "Since the start of the year two years back, largest total first. Totals are after refunds; US payments are in US dollars, apart.",
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
          ...(usd ? [{ label: "US total collected", value: usd, kind: "money-usd" as const }] : []),
        ],
        tables: [
          table(
            [
              col("Account", "account"),
              col("First payment", "date"),
              col("Latest payment", "date"),
              col("Payments", "number"),
              col("Total", "money"),
              ...(usd ? [col("Total (US)", "money-usd")] : []),
              col("Paying now", "yesno"),
            ],
            rows.map((r) => ({
              familyId: String(r.family_id),
              cells: [
                (r.email as string | null) ?? "—",
                Number(r.first),
                Number(r.last),
                Number(r.n),
                Number(r.total),
                ...(usd ? [Number(r.total_usd)] : []),
                r.plan === "premium",
              ],
            })),
          ),
        ],
      };
    }
    case "ltv": {
      // Customer lifetime value so far: what each family that has paid has actually paid, after refunds. Same
      // families and window as "Families who have paid"; CAD and USD stay apart.
      const rows = await rowsOf(
        `SELECT pm.family_id, MIN(pm.paid_at) AS first, MAX(pm.paid_at) AS last, COUNT(*) AS n,
           SUM(CASE WHEN LOWER(pm.currency) = 'usd' THEN 0 ELSE MAX(pm.amount - pm.refunded, 0) END) AS total,
           SUM(CASE WHEN LOWER(pm.currency) = 'usd' THEN MAX(pm.amount - pm.refunded, 0) ELSE 0 END) AS total_usd,
           (SELECT p.email FROM parents p WHERE p.family_id = pm.family_id ORDER BY p.created_at LIMIT 1) AS email,
           (SELECT f.plan FROM families f WHERE f.id = pm.family_id) AS plan,
           (SELECT f.created_at FROM families f WHERE f.id = pm.family_id) AS signed_up,
           (SELECT COUNT(*) FROM profiles pr WHERE pr.family_id = pm.family_id AND COALESCE(json_extract(pr.data, '$.deleted'), 0) = 0) AS children,
           (SELECT MAX(e.t) FROM events e WHERE e.family_id = pm.family_id) AS last_practice
         FROM payments pm WHERE pm.family_id IS NOT NULL AND pm.paid_at >= ? GROUP BY pm.family_id
         HAVING SUM(CASE WHEN pm.amount > pm.refunded THEN 1 ELSE 0 END) > 0 ORDER BY total DESC, total_usd DESC`,
        [Date.UTC(new Date(now).getUTCFullYear() - 2, 0, 1)],
      );
      const ca = rows.filter((r) => Number(r.total) > 0);
      const caTotal = ca.reduce((s, r) => s + Number(r.total), 0);
      const us = rows.filter((r) => Number(r.total_usd) > 0);
      const usTotal = us.reduce((s, r) => s + Number(r.total_usd), 0);
      return {
        title: "Customer lifetime value",
        intro:
          "A customer is a family with a payment that wasn't refunded in full. Lifetime value is what they have paid so far, after refunds (gifts have no family, so they aren't here). Highest first; click an account for the full picture. Payments go back to the start of the year two years ago. US payments are in US dollars, apart.",
        summary: [
          { label: "Customers", value: rows.length, kind: "number" },
          { label: "Average lifetime value", value: ca.length ? Math.round(caTotal / ca.length) : 0, kind: "money" },
          { label: "Highest lifetime value", value: Math.max(0, ...ca.map((r) => Number(r.total))), kind: "money" },
          { label: "Total collected", value: caTotal, kind: "money" },
          ...(us.length
            ? [
                { label: "US average lifetime value", value: Math.round(usTotal / us.length), kind: "money-usd" as const },
                { label: "US total collected", value: usTotal, kind: "money-usd" as const },
              ]
            : []),
        ],
        tables: [
          table(
            [
              col("Account", "account"),
              col("Lifetime value", "money"),
              ...(us.length ? [col("Lifetime value (US)", "money-usd")] : []),
              col("Payments", "number"),
              col("Months as customer", "number"),
              col("First payment", "date"),
              col("Latest payment", "date"),
              col("Children", "number"),
              col("Signed up", "date"),
              col("Last practice", "date"),
              col("Paying now", "yesno"),
            ],
            rows.map((r) => ({
              familyId: String(r.family_id),
              cells: [
                (r.email as string | null) ?? "—",
                Number(r.total),
                ...(us.length ? [Number(r.total_usd)] : []),
                Number(r.n),
                Math.max(1, Math.round((Math.max(Number(r.last), r.plan === "premium" ? now : 0) - Number(r.first)) / (30.44 * DAY))),
                Number(r.first),
                Number(r.last),
                Number(r.children),
                n(r.signed_up),
                n(r.last_practice),
                r.plan === "premium",
              ],
            })),
          ),
        ],
      };
    }
    case "practising": {
      // Families count over the last 30 × 24 hours, like the tiles; questions, minutes and days count over the
      // 30 calendar days (UTC) that "Questions answered, 30 days" and its chart use, which that window holds.
      const from = (Math.floor(now / DAY) - 29) * DAY;
      const inWindow = `e.t >= ${from}`;
      const rows = await rowsOf(
        `SELECT e.family_id, MAX(e.t) AS last, COUNT(DISTINCT CASE WHEN ${inWindow} THEN CAST(e.t / ${DAY} AS INTEGER) END) AS days,
           SUM(CASE WHEN ${inWindow} AND json_extract(e.data, '$.type') = 'answer' THEN 1 ELSE 0 END) AS answers,
           SUM(CASE WHEN ${inWindow} AND json_extract(e.data, '$.type') = 'answer' THEN MIN(MAX(COALESCE(json_extract(e.data, '$.ms'), 0), 0), 60000) ELSE 0 END) AS ms,
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
    case "guests": {
      // Same counts as the tile: guestCounts is the one query for both. Devices are one-way hashes, so the list is by day.
      const [counts, days] = await Promise.all([guestCounts(now), guestLastPlayed(now)]);
      return {
        title: "Guest players",
        intro: "Devices where children played in the Play area with no parent account, by the last day each played (UTC). A device is counted once; its practice stays on the device and nothing about any child reaches us. Counted from the day this was switched on, and only for Canadian curricula.",
        summary: [
          { label: "Today", value: counts.d1, kind: "number" },
          { label: "This week", value: counts.d7, kind: "number" },
          { label: "Last 30 days", value: counts.d30, kind: "number" },
        ],
        tables: [
          table(
            [col("Last played", "date"), col("Devices", "number")],
            days.map((d) => ({ cells: [d.day * DAY, d.devices] })),
          ),
        ],
      };
    }
    case "try-it-free":
      return clicksDetail(now);
  }
}
