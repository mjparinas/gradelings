import { TEST_ACCOUNT_EMAILS } from "@/lib/brand";

// The owner's own test account (checkout testing) never counts as a customer: the dashboard's numbers and the lists
// behind its tiles leave its family out. The addresses come from code (`TEST_ACCOUNT_EMAILS`), never from a request, and
// quotes are doubled anyway so the fragment is safe to put in a statement.
const literal = (e: string) => `'${e.toLowerCase().replace(/'/g, "''")}'`;

/** SQL that is true for a family with no test-account address. `f` is the families table's alias. */
export function notTestFamily(f = "f"): string {
  if (!TEST_ACCOUNT_EMAILS.length) return "1 = 1";
  return `NOT EXISTS (SELECT 1 FROM parents tx WHERE tx.family_id = ${f}.id AND lower(tx.email) IN (${TEST_ACCOUNT_EMAILS.map(literal).join(", ")}))`;
}

/** The same for a column holding a family id (events, payments); a null id (a gift) stays. */
export function notTestFamilyId(column: string): string {
  return `(${column} IS NULL OR ${column} IN (SELECT fx.id FROM families fx WHERE ${notTestFamily("fx")}))`;
}
