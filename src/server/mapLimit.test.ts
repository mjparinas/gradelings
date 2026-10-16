import { describe, expect, it } from "vitest";
import { CLASS_LOAD_CONCURRENCY, mapLimit } from "./classroom";

describe("mapLimit", () => {
  it("keeps the order of the items even when later ones finish first", async () => {
    const out = await mapLimit([30, 5, 15, 1], 4, async (ms) => {
      await new Promise((r) => setTimeout(r, ms));
      return ms * 2;
    });
    expect(out).toEqual([60, 10, 30, 2]);
  });

  it("never runs more than the limit at once, and does all the work", async () => {
    let running = 0;
    let peak = 0;
    const out = await mapLimit(Array.from({ length: 20 }, (_, i) => i), 3, async (i) => {
      running++;
      peak = Math.max(peak, running);
      await new Promise((r) => setTimeout(r, 2));
      running--;
      return i;
    });
    expect(out).toHaveLength(20);
    expect(peak).toBe(3);
  });

  it("handles no items and fewer items than the limit", async () => {
    expect(await mapLimit([], CLASS_LOAD_CONCURRENCY, async (x) => x)).toEqual([]);
    expect(await mapLimit(["a"], CLASS_LOAD_CONCURRENCY, async (x) => x.toUpperCase())).toEqual(["A"]);
  });
});
