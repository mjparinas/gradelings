import { describe, expect, it } from "vitest";
import { localizeCopy } from "@/content/locale";
import type { FactStat } from "./facts";
import { AT_HOME, atHomeIdea, factsWeekLine, storiesLine, storiesThisWeek } from "./weeklyExtras";

const DAY = 86_400_000;
const NOW = Date.UTC(2026, 9, 25, 15);
const known: FactStat = { attempts: 2, recent: [true, true], lastT: NOW };
const learning: FactStat = { attempts: 1, recent: [false], lastT: NOW };

describe("the fuller weekly email", () => {
  it("says how many facts are known in each set tried, and how many became known this week", () => {
    const now = { "mul:7:8": known, "mul:3:4": known, "mul:6:6": learning };
    const before = { "mul:3:4": known };
    expect(factsWeekLine("Leo", "4", now, before)).toBe("  Math facts: Leo knows 2 of 100 times-table facts (1 new this week).");
    expect(factsWeekLine("Leo", "4", now, now)).toBe("  Math facts: Leo knows 2 of 100 times-table facts.");
    // Nothing for a child who hasn't tried facts, or whose grade has none.
    expect(factsWeekLine("Leo", "4", {}, {})).toBeUndefined();
    expect(factsWeekLine("Ava", "k", now, before)).toBeUndefined();
  });

  it("counts stories finished in the last 7 days", () => {
    const events = [
      { type: "story", t: NOW - DAY },
      { type: "story", t: NOW - 2 * DAY },
      { type: "story", t: NOW - 8 * DAY },
      { type: "answer", t: NOW - DAY },
    ];
    expect(storiesThisWeek(events, NOW)).toBe(2);
    expect(storiesLine("Maya", 2)).toBe("  Stories: Maya read 2 stories in the Story Library.");
    expect(storiesLine("Maya", 1)).toBe("  Stories: Maya read 1 story in the Story Library.");
    expect(storiesLine("Maya", 0)).toBeUndefined();
  });

  it("picks one idea from the suggested subject, the same one for the same child and week", () => {
    const idea = atHomeIdea("science", "middle", "maya", NOW);
    expect(AT_HOME.science.middle).toContain(idea);
    expect(atHomeIdea("science", "middle", "maya", NOW + 60_000)).toBe(idea);
    // French or no subject falls back to a core subject.
    expect(Object.values(AT_HOME).flatMap((s) => s.big)).toContain(atHomeIdea("immersion", "big", "leo", NOW));
    expect(Object.values(AT_HOME).flatMap((s) => s.little)).toContain(atHomeIdea(undefined, "little", "ava", NOW));
  });

  it("has ideas for every subject and age that suit every province and state", () => {
    for (const bands of Object.values(AT_HOME))
      for (const ideas of Object.values(bands)) {
        expect(ideas.length).toBeGreaterThanOrEqual(3);
        for (const idea of ideas) {
          expect(idea).not.toMatch(/\$|¢|coin|dollar|cent\b|canad|province|state\b|holiday|christmas|halloween/i);
          // The email turns Canadian spelling into US spelling for US families.
          expect(localizeCopy(idea, "en-US")).not.toMatch(/colour|favourite|neighbour|centre|practise/);
        }
      }
  });
});
