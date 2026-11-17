// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { workedSolution } from "@/lib/workedSolution";
import { WorkedSolution } from "./WorkedSolution";

afterEach(cleanup);

describe("WorkedSolution", () => {
  it("steps forward and back, marks the new lines and ends on Got it", async () => {
    const solution = workedSolution({ kind: "input", prompt: "What is 36 × 24?", answer: "864", hint: "" })!;
    const onClose = vi.fn();
    render(<WorkedSolution solution={solution} onClose={onClose} />);
    expect(screen.getByRole("dialog", { name: "Multiplying step by step" })).toBeInTheDocument();
    expect(screen.getByText(`Step 1 of ${solution.steps.length}`)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /back/i })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /next step/i }));
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
    for (let i = 1; i < solution.steps.length - 1; i++) await userEvent.click(screen.getByRole("button", { name: /next step/i }));
    expect(screen.getByText(/So the answer is 864/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Got it" }));
    expect(onClose).toHaveBeenCalled();
  });
});
