// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { markNewsSeen, newsSeen, parentNews, unseenNews } from "./parentNews";
import type { NewsDay } from "./whatsNew";

const days: NewsDay[] = [
  { day: "2026-11-10", headline: "Only for teachers", items: [{ kind: "teachers", title: "Class timer", body: "A countdown for the class." }] },
  { day: "2026-11-09", headline: "Shorter free trial", items: [{ kind: "new", title: "14 days", body: "The free trial is now 14 days." }, { kind: "fixed", title: "Calmer toast", body: "Trophy pop-ups no longer cover buttons." }] },
  { day: "2026-11-08", headline: "Stories", items: [{ kind: "new", title: "Read along", body: "New stories." }] },
];

beforeEach(() => localStorage.clear());

describe("parentNews", () => {
  it("leaves out teacher items and days that have nothing left", () => {
    const news = parentNews(false, days);
    expect(news.map((d) => d.day)).toEqual(["2026-11-09", "2026-11-08"]);
    expect(news[0].items).toHaveLength(2);
  });
  it("in a store app also leaves out anything about paying", () => {
    const news = parentNews(true, days);
    // The day whose headline is about the trial goes whole; the other day stays.
    expect(news.map((d) => d.day)).toEqual(["2026-11-08"]);
    const mixed = parentNews(true, [{ day: "2026-11-09", headline: "Calmer toasts", items: days[1].items }]);
    expect(mixed[0].items.map((i) => i.title)).toEqual(["Calmer toast"]);
  });
  it("keeps only the most recent days", () => {
    const many = Array.from({ length: 40 }, (_, i): NewsDay => ({ day: `2026-10-${String(40 - i).padStart(2, "0")}`, headline: "h", items: [{ kind: "new", title: `t${i}`, body: "b" }] }));
    expect(parentNews(false, many)).toHaveLength(20);
  });
});

describe("seen days", () => {
  it("counts only posts newer than the last seen day, and nothing for a device that has never looked", () => {
    expect(unseenNews(days, null)).toEqual([]);
    expect(unseenNews(days, "2026-11-08").map((d) => d.day)).toEqual(["2026-11-10", "2026-11-09"]);
  });
  it("only moves forward", () => {
    markNewsSeen("2026-11-09");
    markNewsSeen("2026-11-01");
    expect(newsSeen()).toBe("2026-11-09");
  });
});
