import { describe, expect, it } from "vitest";
import { recentHelp } from "./helpAsks";
import type { AppEvent } from "./model";

const DAY = 86_400_000;
const NOW = Date.UTC(2026, 9, 17, 12);
const help = (id: string, unit: string, ago: number, profileId = "a"): AppEvent => ({ type: "help", id, unit, profileId, t: NOW - ago * DAY });

describe("recentHelp", () => {
  it("groups by unit, counts asks and puts the newest first", () => {
    const events = [help("1", "3/math/fractions", 5), help("2", "3/math/fractions", 1), help("3", "3/science/plants", 2)];
    expect(recentHelp(events, "a", NOW)).toEqual([
      { unit: "3/math/fractions", count: 2, lastT: NOW - DAY },
      { unit: "3/science/plants", count: 1, lastT: NOW - 2 * DAY },
    ]);
  });

  it("leaves out other children, old asks, asks before a reset and repeated event ids", () => {
    const events = [help("1", "3/math/a", 1, "b"), help("2", "3/math/b", 20), help("3", "3/math/c", 3), help("4", "3/math/d", 1), help("4", "3/math/d", 1)];
    expect(recentHelp(events, "a", NOW, NOW - 2 * DAY).map((h) => [h.unit, h.count])).toEqual([["3/math/d", 1]]);
  });

  it("ignores units that are not unit keys", () => {
    expect(recentHelp([help("1", "nonsense", 1)], "a", NOW)).toEqual([]);
  });
});
