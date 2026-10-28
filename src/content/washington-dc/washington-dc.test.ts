import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { WASHINGTON_DC } from "./framework";

// Washington, DC's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is the District's alone.

/** Every Washington, DC unit with its course. */
const dc = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-dc"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

const social = (grade: string) => dc.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);

describe("Washington, DC", () => {
  it("is a district, not a state", () => {
    expect(WASHINGTON_DC.regionKind).toBe("district");
    expect(WASHINGTON_DC.country).toBe("US");
  });

  it("teaches the District's own history and government in its own units", () => {
    const own = dc.filter(({ u }) => u.id.startsWith("dc-")).map(({ u }) => u.id);
    expect(own).toEqual(
      expect.arrayContaining([
        "dc-k-my-city",
        "dc-g1-leaders-and-symbols",
        "dc-g3-our-district",
        "dc-g3-first-peoples",
        "dc-g3-building-the-capital",
        "dc-g3-freedom-and-civil-war",
        "dc-g3-governing-dc",
        "dc-g7-capital-of-a-new-nation",
        "dc-g8-governing-the-district",
      ]),
    );
  });

  it("follows the course themes of the DC Social Studies Standards", () => {
    // World climates, the first civilizations and kingdoms to 1600 in Grade 2.
    expect(social("2")).toEqual(expect.arrayContaining(["dc-g2-first-civilizations", "dc-g2-world-kingdoms"]));
    // Washington, DC past and present in Grade 3: mostly the District's own units.
    expect(social("3").filter((id) => id.startsWith("dc-")).length).toBeGreaterThanOrEqual(6);
    // North America's first peoples and a new nation in Grade 4, then expansion to civil rights in Grade 5.
    expect(social("4")).toEqual(expect.arrayContaining(["dc-g4-first-americans", "ca-g5-revolution", "ca-g5-constitution", "dc-g4-three-branches"]));
    expect(social("5")).toEqual(expect.arrayContaining(["ca-g8-civil-war", "dc-g5-great-migration", "dc-g5-voices-for-justice", "ny-g8-civil-rights"]));
    // World geography in Grade 6, US history to 1877 in Grade 7, civics in action in Grade 8.
    expect(social("6")).toEqual(expect.arrayContaining(["dc-g6-maps-and-borders", "ga-g7-africa", "ga-g6-europe"]));
    expect(social("7")).toEqual(expect.arrayContaining(["ca-g8-revolutionary-ideas", "wa-g8-reconstruction", "dc-g7-capital-of-a-new-nation"]));
    expect(social("8")).toEqual(expect.arrayContaining(["dc-g8-governing-the-district", "dc-g8-capital-of-protest", "ca-g9-supreme-court"]));
    // World History and Geography I in Grade 9.
    expect(social("9")).toEqual(expect.arrayContaining(["dc-g9-early-humans", "where-civilizations-grew", "ny-g9-ottoman-ming"]));
  });

  it("cites social studies standards from the unit's own grade", () => {
    // DC numbers its standards within each grade ("3.20") and World History and Geography I as "WH1.1".
    const prefix: Record<string, string> = { k: "K", "9": "WH1" };
    for (const { c, u, key } of dc.filter(({ c }) => c.subject === "social")) {
      const codes = (u.standards["us-dc"] ?? "").split(" · ")[0].split("; ");
      for (const code of codes) expect(code.split(".")[0], `${key} cites ${code}`).toBe(prefix[c.grade] ?? c.grade);
    }
  });
});
