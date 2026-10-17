// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { ShadeQuestion as Q } from "@/content/types";
import { ShadeQuestion } from "./ShadeQuestion";

const q: Q = { kind: "shade", prompt: "Shade 2/4.", hint: "Two parts.", parts: 4, target: 2 };

const setup = (over: Partial<Q> = {}, status: "answering" | "revealed" = "answering") => {
  const onAttempt = vi.fn();
  render(<ShadeQuestion q={{ ...q, ...over }} status={status} onAttempt={onAttempt} onSlip={vi.fn()} />);
  return onAttempt;
};

describe("ShadeQuestion", () => {
  it("keeps Check off until a part is shaded, and counts the shaded parts", async () => {
    const onAttempt = setup();
    expect(screen.getByRole("button", { name: "Check ✓" })).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: "Part 1 of 4" }));
    await userEvent.click(screen.getByRole("button", { name: "Part 3 of 4" }));
    expect(screen.getByText("2 of 4 shaded")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Check ✓" }));
    expect(onAttempt.mock.calls[0][0]).toBe(true);
  });

  it("untaps a part, and marks a wrong count wrong", async () => {
    const onAttempt = setup();
    await userEvent.click(screen.getByRole("button", { name: "Part 1 of 4" }));
    await userEvent.click(screen.getByRole("button", { name: "Part 1 of 4, shaded" }));
    expect(screen.getByText("0 of 4 shaded")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Part 2 of 4" }));
    await userEvent.click(screen.getByRole("button", { name: "Check ✓" }));
    expect(onAttempt.mock.calls[0][0]).toBe(false);
  });

  it("shows the answer when revealed", () => {
    setup({}, "revealed");
    expect(screen.getByText("2 of 4 shaded")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Check ✓" })).not.toBeInTheDocument();
  });
});
