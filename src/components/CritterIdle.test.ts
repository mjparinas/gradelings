import { describe, expect, it } from "vitest";
import { IDLE_MOVES, nextIdle } from "./Critter";

describe("nextIdle", () => {
  it("never repeats the last move and waits 6 to 14 seconds", () => {
    for (let last = -1; last < IDLE_MOVES.length; last++) {
      for (const r of [0, 0.3, 0.99]) {
        const { move, wait } = nextIdle(last, () => r);
        expect(move).not.toBe(last);
        expect(move).toBeGreaterThanOrEqual(0);
        expect(move).toBeLessThan(IDLE_MOVES.length);
        expect(wait).toBeGreaterThanOrEqual(6000);
        expect(wait).toBeLessThan(14000);
      }
    }
  });
});
