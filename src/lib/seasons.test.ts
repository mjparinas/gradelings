import { describe, expect, it } from "vitest";
import { derive } from "./derive";
import type { AppEvent } from "./model";
import { countEarned } from "./stickers";
import { daysLeft, SEASON_STICKERS, SEASONS, seasonOn, seasonPages, seasonRun, seasonsFilled, seasonStickers } from "./seasons";

const at = (day: string, h = 12) => new Date(`${day}T${String(h).padStart(2, "0")}:00:00`).getTime();
let n = 0;
const answer = (day: string, subject = "math", correct = true): AppEvent => ({
  id: `a${n++}`, profileId: "p", t: at(day) + n, type: "answer", unit: `4/${subject}/unit`, correct, attempts: 1, revealed: false, ms: 3000, mode: "practice",
});
const lesson = (day: string, total = 5, correct = total): AppEvent => ({ id: `s${n++}`, profileId: "p", t: at(day, 13) + n, type: "session", mode: "practice", scope: "mix", total, correct, ms: 60_000 });

describe("the festival calendar", () => {
  it("finds the festival on a day, including the Snow Festival across New Year", () => {
    expect(seasonOn("2026-10-24")?.key).toBe("leaf-2026");
    expect(seasonOn("2026-10-01")?.key).toBe("leaf-2026");
    expect(seasonOn("2026-11-15")?.key).toBe("leaf-2026");
    expect(seasonOn("2026-11-16")).toBeNull();
    expect(seasonOn("2026-12-31")?.key).toBe("snow-2026");
    expect(seasonOn("2027-01-31")?.key).toBe("snow-2026");
    expect(seasonOn("2027-02-01")).toBeNull();
    expect(seasonOn("2027-04-01")?.key).toBe("sprout-2027");
    expect(seasonOn("2027-08-31")?.key).toBe("sun-2027");
    expect(seasonOn("2026-09-15")).toBeNull();
  });

  it("never runs two festivals at once and gives each a few weeks", () => {
    for (let t = at("2026-01-01"); t < at("2027-01-01"); t += 86_400_000) {
      const day = new Date(t).toISOString().slice(0, 10);
      const on = SEASONS.filter((s) => seasonOn(day)?.season.id === s.id);
      expect(on.length).toBeLessThanOrEqual(1);
    }
    for (const s of SEASONS) {
      const run = seasonRun(`${s.id}-2026`)!;
      expect(daysLeft(run, run.from)).toBeGreaterThanOrEqual(40);
      expect(s.art).toHaveLength(SEASON_STICKERS);
    }
    expect(seasonRun("leaf-2026")?.to).toBe("2026-11-15");
    expect(seasonRun("snow-2026")?.to).toBe("2027-01-31");
    expect(seasonRun("nope-2026")).toBeNull();
  });

  it("counts days left, counting today", () => {
    const run = seasonRun("leaf-2026")!;
    expect(daysLeft(run, "2026-11-15")).toBe(1);
    expect(daysLeft(run, "2026-11-14")).toBe(2);
    expect(daysLeft(run, "2026-12-01")).toBe(0);
  });
});

describe("festival stickers", () => {
  const leaf = seasonRun("leaf-2026")!;

  it("start empty and fill from practice inside the festival only", () => {
    expect(countEarned(seasonStickers(leaf, derive([]), "middle"))).toBe(0);
    // Practice the day before the festival doesn't count.
    const before = derive([lesson("2026-09-30"), ...Array.from({ length: 60 }, () => answer("2026-09-30"))]);
    expect(countEarned(seasonStickers(leaf, before, "middle"))).toBe(0);
    const one = derive([lesson("2026-10-02")]);
    expect(seasonStickers(leaf, one, "middle").map((s) => s.earned)).toEqual([true, false, false, true, false, false]);
  });

  it("asks little kids for fewer answers", () => {
    const events = Array.from({ length: 30 }, () => answer("2026-10-03"));
    expect(seasonStickers(leaf, derive(events), "little")[1].earned).toBe(true);
    expect(seasonStickers(leaf, derive(events), "middle")[1].earned).toBe(false);
  });

  it("shines the last sticker once the page is full", () => {
    const days = ["2026-10-01", "2026-10-03", "2026-10-08", "2026-10-12", "2026-10-20", "2026-11-15"];
    const events = days.flatMap((day) => [lesson(day), ...["math", "science", "social"].flatMap((s) => Array.from({ length: 3 }, () => answer(day, s)))]);
    const stickers = seasonStickers(leaf, derive(events), "middle");
    expect(stickers.every((s) => s.earned)).toBe(true);
    expect(stickers.at(-1)?.shiny).toBe(true);
    expect(stickers.slice(0, -1).some((s) => s.shiny)).toBe(false);
  });

  it("reads filled pages from the claimed festival quests", () => {
    const quest = (day: string, id: string): AppEvent => ({ id: `q${day}${id}`, profileId: "p", t: at(day), type: "quest", quest: id, day, reward: 50 });
    const d = derive([quest("2026-10-01", "s-leaf"), quest("2026-12-15", "s-snow"), quest("2026-10-05", "s-leaf"), quest("2026-10-01", "answers")]);
    expect(seasonsFilled(d).sort()).toEqual(["leaf-2026", "snow-2026"]);
    expect(d.coins).toBe(200);
  });

  it("keeps a page for today's festival and for past ones with a sticker", () => {
    const d = derive([lesson("2026-03-20"), lesson("2026-07-02")]);
    const pages = seasonPages(d, "middle", "2026-10-24");
    expect(pages.map((p) => [p.run.key, p.live])).toEqual([["leaf-2026", true], ["sun-2026", false], ["sprout-2026", false]]);
    expect(seasonPages(derive([]), "middle", "2026-09-10")).toEqual([]);
  });
});
