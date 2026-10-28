// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand } from "@/content/types";
import type { AppEvent } from "@/lib/model";
import { BandProvider } from "../band";

const DAY = 86_400_000;
// Wednesday, October 28, 2026; last week started Monday the 19th.
const NOW = new Date(2026, 9, 28, 15, 0).getTime();
const LAST_MON = new Date(2026, 9, 19, 9, 0).getTime();
const h = vi.hoisted(() => ({ on: true, events: [] as AppEvent[] }));
vi.mock("@/lib/remoteFlags", () => ({ useFlag: () => h.on }));
vi.mock("@/lib/useNow", () => ({ useNow: () => NOW }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1", name: "Ava", grade: "3", framework: "ca-bc" }),
  useStore: (select: (s: unknown) => unknown) => select({ events: h.events }),
  eventsFor: (events: AppEvent[]) => events,
  useFamilyCountry: () => "CA",
}));
vi.mock("@/lib/say", () => ({ useChildSay: () => (t: string) => t }));

import { WeekRecapCard } from "./WeekRecapCard";

const practice = (t: number, count = 6, unit = "3/math/add"): AppEvent[] =>
  Array.from({ length: count }, (_, i) => ({ id: `${t}-${i}`, profileId: "p1", t: t + i, type: "answer", unit, correct: true, attempts: 1, revealed: false, ms: 20_000, mode: "practice" }) as AppEvent);
const inBand = (band: AgeBand) => render(<BandProvider value={band}>{<WeekRecapCard />}</BandProvider>);

beforeEach(() => {
  localStorage.clear();
  h.on = true;
  h.events = practice(LAST_MON);
});
afterEach(cleanup);

describe("WeekRecapCard", () => {
  it("tells an older child what grew last week and opens the recap", () => {
    inBand("middle");
    expect(screen.getByText("Look how you grew!")).toBeInTheDocument();
    expect(screen.getByText("You planted 1 new lesson last week!")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "#/grew");
  });

  it("goes away for the week once closed or opened, and comes back with next week's recap", () => {
    inBand("middle");
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByTestId("week-recap-card")).not.toBeInTheDocument();
    cleanup();
    inBand("middle");
    expect(screen.queryByTestId("week-recap-card")).not.toBeInTheDocument();
    cleanup();
    localStorage.clear();
    inBand("middle");
    fireEvent.click(screen.getByRole("link"));
    cleanup();
    inBand("middle");
    expect(screen.queryByTestId("week-recap-card")).not.toBeInTheDocument();
    cleanup();
    // A recap of a different week is a new card.
    localStorage.setItem("grademap.grew.seen.p1", "2026-10-12");
    inBand("middle");
    expect(screen.getByTestId("week-recap-card")).toBeInTheDocument();
  });

  it("gives little kids one short line with nothing to close, since it lives in My Treasures", () => {
    inBand("little");
    expect(screen.getByText("You grew!")).toBeInTheDocument();
    expect(screen.queryByText(/last week/)).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("link"));
    cleanup();
    inBand("little");
    expect(screen.getByTestId("week-recap-card")).toBeInTheDocument();
  });

  it("shows nothing without practice last week or with the flag off", () => {
    h.events = practice(NOW - DAY);
    inBand("middle");
    expect(screen.queryByTestId("week-recap-card")).not.toBeInTheDocument();
    cleanup();
    h.events = practice(LAST_MON);
    h.on = false;
    inBand("middle");
    expect(screen.queryByTestId("week-recap-card")).not.toBeInTheDocument();
  });
});
