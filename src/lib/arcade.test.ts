import { afterEach, describe, expect, it } from "vitest";
import { arcadeFor, gameFits, gamesOpenedBetween, gameUnlocked, GAMES, getGame, hasFrenchOn, subjectsOn } from "./arcade";
import { setRemoteFlags } from "./remoteFlags";

describe("the arcade's games", () => {
  it("keeps the five classic games open from the start, and the new ones behind a level", () => {
    for (const id of ["munchers", "ninja", "catch", "bubbles", "memory"]) expect(gameUnlocked(getGame(id)!, 1)).toBe(true);
    const locked = GAMES.filter((g) => !gameUnlocked(g, 1)).map((g) => g.id);
    expect(locked.sort()).toEqual(["bridge", "clock", "coins", "map", "timeline", "tower"]);
    expect(gameUnlocked(getGame("tower")!, 5)).toBe(false);
    expect(gameUnlocked(getGame("tower")!, 6)).toBe(true);
    expect(new Set(GAMES.map((g) => g.id)).size).toBe(GAMES.length);
  });

  it("fits games to the grade, and Word Bridge only to children taking French", () => {
    expect(gameFits(getGame("clock")!, { grade: "k" })).toBe(false);
    expect(gameFits(getGame("clock")!, { grade: "4" })).toBe(true);
    expect(gameFits(getGame("clock")!, { grade: "5" })).toBe(false);
    expect(gameFits(getGame("coins")!, { grade: "5" })).toBe(true);
    expect(gameFits(getGame("tower")!, { grade: "1" })).toBe(false);
    expect(gameFits(getGame("tower")!, { grade: "9" })).toBe(true);
    expect(gameFits(getGame("bridge")!, { grade: "3", subjects: ["math"] })).toBe(false);
    expect(gameFits(getGame("bridge")!, { grade: "3", subjects: ["core-french"] })).toBe(true);
    // French left on from a move to a curriculum without French (Washington) doesn't show Word Bridge.
    expect(gameFits(getGame("bridge")!, { grade: "5", subjects: ["core-french"], framework: "us-wa" })).toBe(false);
    expect(gameFits(getGame("bridge")!, { grade: "5", subjects: ["core-french"], framework: "ca-bc" })).toBe(true);
    expect(hasFrenchOn(["immersion"])).toBe(true);
    expect(hasFrenchOn()).toBe(false);
    expect(arcadeFor({ grade: "k" }).map((g) => g.id)).toEqual(["munchers", "ninja", "catch", "bubbles", "memory", "map", "timeline"]);
  });

  it("names the games that open between two levels", () => {
    expect(gamesOpenedBetween(1, 2, { grade: "3" }).map((g) => g.id)).toEqual(["map"]);
    expect(gamesOpenedBetween(3, 6, { grade: "3" }).map((g) => g.id)).toEqual(["clock", "coins", "tower"]);
    expect(gamesOpenedBetween(3, 6, { grade: "8", subjects: ["immersion"] }).map((g) => g.id)).toEqual(["bridge", "tower"]);
    expect(gamesOpenedBetween(6, 9, { grade: "3" })).toEqual([]);
  });
});

describe("Word Bridge in Spanish", () => {
  afterEach(() => setRemoteFlags({ flags: {}, variants: {} }));
  const bridge = getGame("bridge")!;

  it("shows to a child with Spanish on in Grades 3 to 9, in any curriculum, once Spanish is offered", () => {
    expect(gameFits(bridge, { grade: "5", subjects: ["spanish"], framework: "us-wa" })).toBe(false);
    setRemoteFlags({ flags: { spanish: true }, variants: {} });
    expect(gameFits(bridge, { grade: "5", subjects: ["spanish"], framework: "us-wa" })).toBe(true);
    expect(gameFits(bridge, { grade: "3", subjects: ["spanish"], framework: "ca-on" })).toBe(true);
    // Spanish starts in Grade 3.
    expect(gameFits(bridge, { grade: "2", subjects: ["spanish"], framework: "ca-bc" })).toBe(false);
  });

  it("hands the game only the subjects the child's curriculum and grade offer", () => {
    setRemoteFlags({ flags: { spanish: true }, variants: {} });
    expect(subjectsOn({ grade: "5", subjects: ["math", "core-french", "spanish"], framework: "us-wa" })).toEqual(["math", "spanish"]);
    expect(subjectsOn({ grade: "2", subjects: ["math", "spanish"], framework: "us-wa" })).toEqual(["math"]);
  });
});
