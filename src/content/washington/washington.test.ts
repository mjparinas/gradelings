import { describe, expect, it } from "vitest";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf } from "../locale";

// Washington's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Washington's alone.

describe("Washington", () => {
  it("is a US framework in US English, offered to families", () => {
    const wa = getFramework("washington");
    expect(wa.id).toBe("us-wa");
    expect(wa.country).toBe("US");
    expect(localeOf(wa)).toBe("en-US");
    expect(wa.subjects).toEqual(["math", "language", "science", "social"]);
    expect(wa.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(wa);
    expect(UPCOMING_FRAMEWORKS).not.toContain(wa);
  });
});
