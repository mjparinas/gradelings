// The detail behind a dashboard tile in the admin panel: a few headline numbers and one or more tables.
// Shared by the server (which fills it) and the panel (which shows it in a window).

export const DETAIL_VIEWS = [
  "paying",
  "payments-month",
  "payments-last-month",
  "payments-year",
  "cancelled",
  "families",
  "trialing",
  "free",
  "code-access",
  "children",
  "teachers",
  "codes",
  "signups",
  "trial-conversion",
  "activation",
  "unconfirmed",
  "referrals",
  "customers-ever",
  "practising",
  "guests",
  "try-it-free",
] as const;
export type DetailView = (typeof DETAIL_VIEWS)[number];

export const isDetailView = (v: unknown): v is DetailView => typeof v === "string" && (DETAIL_VIEWS as readonly string[]).includes(v);

/** How a cell is shown: dates and money are sent raw (ms, cents) and formatted in the panel. "money" is CAD and
 * "money-usd" US dollars, never added together. An "account" cell is an email that opens its row's family in Users. */
export type CellKind = "text" | "number" | "money" | "money-usd" | "date" | "yesno" | "account";

export interface DetailColumn {
  label: string;
  kind: CellKind;
}

export type Cell = string | number | boolean | null;

export interface DetailRow {
  /** The family the row is about, so its email can open the family in Users. */
  familyId?: string;
  cells: Cell[];
}

export interface DetailTable {
  title?: string;
  columns: DetailColumn[];
  rows: DetailRow[];
  /** Rows before the list was cut to `DETAIL_LIMIT`. */
  total: number;
}

export interface Detail {
  title: string;
  intro?: string;
  summary: { label: string; value: number; kind: CellKind }[];
  tables: DetailTable[];
}

/** The most rows a table sends; the panel says when there were more. */
export const DETAIL_LIMIT = 200;
