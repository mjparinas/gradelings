// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { derive, type DayStat } from "@/lib/derive";
import { setRemoteFlags } from "@/lib/remoteFlags";
import { BandProvider } from "../band";

const h = vi.hoisted(() => ({ d: undefined as unknown }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1", name: "Ava", grade: "4", framework: "ca-bc" }),
  useDerived: () => h.d,
}));

import { FestivalCard } from "./FestivalCard";

const day = (k: string, over: Partial<DayStat> = {}): DayStat => ({ day: k, learnSeconds: 60, answers: 5, correct: 5, sessions: 1, perfect: 0, playSeconds: 0, bestRun: 3, stories: 0, subjects: { math: 5 }, modes: {}, ...over });
const show = () =>
  render(
    <BandProvider value="middle">
      <FestivalCard />
    </BandProvider>,
  );

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  setRemoteFlags({ flags: {}, variants: {} });
  h.d = derive([]);
});
afterEach(() => vi.useRealTimers());

describe("FestivalCard", () => {
  it("shows the festival on today with stickers found, the next goal and days left", () => {
    vi.setSystemTime(new Date("2026-10-24T12:00:00"));
    h.d = { ...derive([]), days: { "2026-10-02": day("2026-10-02") } };
    show();
    const card = screen.getByTestId("festival-card");
    expect(card).toHaveAttribute("href", "#/stickers?page=leaf-2026");
    expect(card).toHaveTextContent("Leaf Festival");
    expect(card).toHaveTextContent("23 days left");
    expect(card).toHaveTextContent("1 of 6 stickers. Next: answer 50 questions in the festival.");
  });

  it("mentions the coins when one sticker is left, and celebrates a full page", () => {
    vi.setSystemTime(new Date("2026-11-15T12:00:00"));
    const days = ["2026-10-01", "2026-10-02", "2026-10-03", "2026-10-04", "2026-10-05"].map((k) => day(k, { answers: 12, perfect: 1, subjects: { math: 4, science: 4, social: 4 } }));
    h.d = { ...derive([]), days: Object.fromEntries(days.map((d) => [d.day, d])) };
    const { unmount } = show();
    expect(screen.getByTestId("festival-card")).toHaveTextContent("Last day!");
    expect(screen.getByTestId("festival-card")).toHaveTextContent("Fill the page for 50 coins!");
    unmount();
    const six = [...days, day("2026-11-15")];
    h.d = { ...derive([]), days: Object.fromEntries(six.map((d) => [d.day, d])) };
    show();
    expect(screen.getByTestId("festival-card")).toHaveTextContent("Every festival sticker found!");
  });

  it("is hidden between festivals and when switched off", () => {
    vi.setSystemTime(new Date("2026-09-10T12:00:00"));
    const { unmount } = show();
    expect(screen.queryByTestId("festival-card")).not.toBeInTheDocument();
    unmount();
    vi.setSystemTime(new Date("2026-10-24T12:00:00"));
    setRemoteFlags({ flags: { "seasonal-events": false }, variants: {} });
    show();
    expect(screen.queryByTestId("festival-card")).not.toBeInTheDocument();
  });
});
