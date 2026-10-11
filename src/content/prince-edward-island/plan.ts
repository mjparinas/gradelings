// Which units Prince Edward Island uses in each grade and subject, and the outcome codes each one practises.
// Placeholder until the plan is generated from the unit mapping (see docs/research/prince-edward-island/README.md).

export type Entry = readonly [id: string, kind: "share" | "adopt", citation: string, text: string];

export const PLAN: Record<string, Entry[]> = {};
