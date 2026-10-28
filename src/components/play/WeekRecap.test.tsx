// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand } from "@/content/types";
import type { WeekRecap as Recap } from "@/lib/weekRecap";
import { BandProvider } from "../band";

const h = vi.hoisted(() => ({ recap: null as Recap | null, autoRead: false, speak: vi.fn() }));
vi.mock("./WeekRecapCard", () => ({ useWeekRecap: () => h.recap }));
vi.mock("@/content", () => ({
  getUnitRef: (key: string) => (key.startsWith("9/") ? undefined : { key, unit: { title: `Unit ${key.split("/")[2]}`, emoji: "🧩" } }),
}));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1", name: "Ava", grade: "3", framework: "ca-bc" }),
  useChildSettings: () => ({ autoRead: h.autoRead }),
}));
vi.mock("@/lib/say", () => ({ useChildSay: () => (t: string) => t }));
vi.mock("@/lib/speech", () => ({ speak: h.speak, stopSpeaking: () => {} }));
vi.mock("@/lib/router", () => ({ go: vi.fn() }));
vi.mock("./Companion", () => ({ Companion: () => null }));

import { WeekRecap } from "./WeekRecap";

const base: Recap = { week: "2026-10-19", days: 3, dayDots: [true, false, true, false, false, true, false], answers: 42, correct: 35, minutes: 18, grew: [], started: [], stickers: 0, stories: 0, trophies: [] };
const inBand = (band: AgeBand) => render(<BandProvider value={band}>{<WeekRecap />}</BandProvider>);

beforeEach(() => {
  localStorage.clear();
  h.recap = null;
  h.autoRead = false;
  h.speak.mockClear();
});
afterEach(cleanup);

describe("WeekRecap", () => {
  it("shows the days practised, what grew, what was started and the treasures found", () => {
    h.recap = {
      ...base,
      grew: [{ key: "3/math/add", from: 1, to: 2 }, { key: "9/math/far", from: 0, to: 1 }],
      started: [{ key: "3/science/plants", from: -1, to: 0 }],
      stickers: 2,
      stories: 1,
      trophies: ["first-answer"],
    };
    inBand("middle");
    expect(screen.getByText("You grew in 2 lessons last week!")).toBeInTheDocument();
    const days = screen.getByRole("region", { name: "Days you practised" });
    expect(within(days).getByText("Monday: practised")).toBeInTheDocument();
    expect(within(days).getByText("Tuesday: rest day")).toBeInTheDocument();
    expect(days).toHaveTextContent("42 questions · 18 minutes of learning");
    const grew = screen.getByRole("region", { name: "Lessons that grew" });
    // A lesson from a grade not on this device still counts, but isn't listed.
    expect(grew).toHaveTextContent("Grew a level (2)");
    expect(within(grew).getAllByRole("listitem")).toHaveLength(1);
    expect(grew).toHaveTextContent("Unit add");
    expect(screen.getByRole("region", { name: "New lessons" })).toHaveTextContent("Unit plants");
    expect(screen.getByRole("link", { name: /2 new stickers/ })).toHaveAttribute("href", "#/stickers");
    expect(screen.getByRole("link", { name: /1 story read/ })).toHaveAttribute("href", "#/stories");
    expect(screen.getByRole("link", { name: /First Steps/i })).toHaveAttribute("href", "#/trophies");
    expect(localStorage.getItem("grademap.grew.seen.p1")).toBe("2026-10-19");
  });

  it("leaves out what didn't happen, so nothing reads as missed", () => {
    h.recap = base;
    inBand("middle");
    expect(screen.getByText("You practised on 3 days last week!")).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Lessons that grew" })).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "New lessons" })).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Treasures found" })).not.toBeInTheDocument();
  });

  it("reads the headline aloud to little kids with read-aloud on, with fewer numbers", () => {
    h.recap = base;
    h.autoRead = true;
    inBand("little");
    expect(h.speak).toHaveBeenCalledWith(expect.stringContaining("You practised on 3 days last week!"));
    expect(screen.queryByText(/42 questions/)).not.toBeInTheDocument();
  });

  it("invites a child with no practice last week to come back next Monday", () => {
    inBand("middle");
    expect(screen.getByText(/next Monday you'll see how you grew/)).toBeInTheDocument();
  });
});
