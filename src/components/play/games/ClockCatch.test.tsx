// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { withSeed } from "@/content/random";
import { ClockFace, makeClockRound } from "./ClockCatch";
import { clockRound } from "./clock";

describe("Clock Catch", () => {
  it("drops the asked-for time as the right clock, other times as wrong ones, with no label to give it away", () => {
    for (let seed = 1; seed <= 30; seed++) {
      const target = withSeed(seed, () => clockRound("2")).target;
      const round = withSeed(seed, () => makeClockRound("2"));
      const right = round.drop(true);
      expect(right.hideLabel).toBe(true);
      expect(round.title).toContain(right.label);
      expect(right.label).toBe(`${target.hour}:${String(target.minute).padStart(2, "0")}`);
      for (let i = 0; i < 5; i++) expect(round.drop(false).label).not.toBe(right.label);
    }
  });

  it("draws a clock face that names its time for screen readers", () => {
    render(<ClockFace time={{ hour: 4, minute: 30 }} />);
    expect(screen.getByRole("img", { name: "a clock showing 4:30" })).toBeInTheDocument();
  });

  it("says half past for younger readers", () => {
    const words = new Set<string>();
    for (let seed = 1; seed <= 40; seed++) words.add(withSeed(seed, () => clockRound("1")).title);
    expect([...words].some((t) => /half past|o'clock/.test(t))).toBe(true);
  });
});
