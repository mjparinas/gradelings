// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { placeLabel, placeTicks } from "@/content/placeLabel";
import type { PlaceQuestion as Q } from "@/content/types";
import { PlaceQuestion } from "./PlaceQuestion";

const q: Q = { kind: "place", prompt: "Move the marker to 3/4.", hint: "Three jumps.", min: 0, max: 1, step: 0.25, target: 0.75, labelEvery: 4, fractionDenominator: 4 };

const setup = (status: "answering" | "revealed" = "answering") => {
  const onAttempt = vi.fn();
  render(<PlaceQuestion q={q} status={status} onAttempt={onAttempt} onSlip={vi.fn()} />);
  return onAttempt;
};

describe("PlaceQuestion", () => {
  it("labels ticks as fractions or decimals", () => {
    expect(placeLabel(q, 0.75)).toBe("3/4");
    expect(placeLabel(q, 0)).toBe("0");
    expect(placeLabel(q, 1)).toBe("1");
    expect(placeLabel({}, 0.3)).toBe("0.3");
    expect(placeTicks(q)).toBe(4);
  });

  it("labels mixed numbers and negatives", () => {
    const m = { fractionDenominator: 4 };
    expect(placeLabel(m, 1.25)).toBe("1 1/4");
    expect(placeLabel(m, 2)).toBe("2");
    expect(placeLabel({}, -4)).toBe("\u22124");
  });

  it("is moved with the keys and checked", async () => {
    const onAttempt = setup();
    expect(screen.getByRole("button", { name: "Check ✓" })).toBeDisabled();
    const marker = screen.getByRole("slider");
    marker.focus();
    await userEvent.keyboard("{ArrowRight}{ArrowRight}{ArrowRight}{ArrowRight}");
    expect(marker).toHaveAttribute("aria-valuetext", "3/4");
    await userEvent.click(screen.getByRole("button", { name: "Check ✓" }));
    expect(onAttempt.mock.calls[0][0]).toBe(true);
  });

  it("stops at the ends, and a wrong spot is wrong", async () => {
    const onAttempt = setup();
    const marker = screen.getByRole("slider");
    marker.focus();
    await userEvent.keyboard("{End}{ArrowRight}");
    expect(marker).toHaveAttribute("aria-valuetext", "1");
    await userEvent.keyboard("{Home}");
    expect(marker).toHaveAttribute("aria-valuetext", "0");
    await userEvent.click(screen.getByRole("button", { name: "Check ✓" }));
    expect(onAttempt.mock.calls[0][0]).toBe(false);
  });

  it("shows the right spot when revealed", () => {
    setup("revealed");
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuetext", "3/4");
  });
});
