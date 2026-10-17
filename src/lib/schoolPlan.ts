// The school plan: what the teacher area needs to know. The price is decided by the owner and read from the
// environment on the server (`schoolPlanInfo` in src/server/schoolPlan.ts), never typed into copy; until it is set
// nothing here names an amount. The plan is off by default (flag `school-plan`) and, while it is off, roster import
// is open to every confirmed teacher account the owner has switched it on for (flag `roster-import`).

/** What a school pays for, in words that stay true whatever the price is. */
export const SCHOOL_PLAN_FEATURES = [
  "Import classes and students from Google Classroom, Clever or ClassLink",
  "Every student signs in with their own code and never meets a paywall",
  "Co-teachers, live questions, homework and printable reports, as in free classes",
] as const;

/** Why roster import is, or isn't, open to this teacher. */
export type RosterAccess = "ok" | "plan" | "off";

/**
 * Whether a teacher may import classes: `off` while the feature is switched off, `plan` when the school plan is on
 * and the account hasn't got it, `ok` otherwise. Pure so the rules can be tested without a database.
 */
export function rosterAccess(opts: { rosterFlag: boolean; planFlag: boolean; schoolUntil: number | null; now?: number }): RosterAccess {
  if (!opts.rosterFlag) return "off";
  if (!opts.planFlag) return "ok";
  return (opts.schoolUntil ?? 0) > (opts.now ?? Date.now()) ? "ok" : "plan";
}

/** The owner's price for one student for one year, in the smallest unit of `currency`; null until decided. */
export interface SchoolPrice {
  perStudentYear: number;
  currency: "CAD" | "USD";
}

/** "C$4.00 per student per year", or null when no price is set. */
export function schoolPriceText(price: SchoolPrice | null): string | null {
  if (!price) return null;
  const amount = (price.perStudentYear / 100).toFixed(2).replace(/\.00$/, "");
  return `${price.currency === "USD" ? "US$" : "C$"}${amount} per student per year`;
}
