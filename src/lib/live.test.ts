import { describe, expect, it } from "vitest";
import { liveCounts } from "./live";

describe("liveCounts", () => {
  it("counts answers per choice in the question's order, including choices nobody picked", () => {
    const q = { choices: [{ id: "a", label: "1" }, { id: "b", label: "2" }, { id: "c", label: "3" }] };
    expect(liveCounts(q, [{ choice: "b" }, { choice: "b" }, { choice: "a" }, { choice: "zzz" }])).toEqual([
      { id: "a", count: 1 },
      { id: "b", count: 2 },
      { id: "c", count: 0 },
    ]);
  });
});
