// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ loadGrade: vi.fn(), generate: vi.fn() }));
vi.mock("@/content", () => ({
  parseUnitKey: (key: string) => { const [grade, subject, unitId] = key.split("/"); return { grade, subject, unitId }; },
  loadGrade: mocks.loadGrade,
  getUnitRef: (key: string) => (key === "3/math/counting" ? { unit: { title: "Counting", emoji: "🔢", generate: mocks.generate } } : undefined),
}));

import { TryUnit } from "./TryUnit";

const choice = (n: number) => ({
  kind: "choice",
  prompt: `What is ${n} + 1?`,
  hint: `Count on from ${n}.`,
  answer: String(n + 1),
  choices: [{ id: String(n + 1), label: String(n + 1) }, { id: String(n + 2), label: String(n + 2) }, { id: String(n + 3), label: String(n + 3) }],
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("TryUnit", () => {
  it("plays the unit's questions, with a hint, a second try and the answer after two misses", async () => {
    mocks.loadGrade.mockResolvedValue(undefined);
    mocks.generate.mockReturnValue([choice(1), choice(2)]);
    const user = userEvent.setup();
    render(<TryUnit unitKey="3/math/counting" framework="ca-on" onClose={() => undefined} />);
    expect(await screen.findByText("What is 1 + 1?")).toBeInTheDocument();
    expect(screen.getByText(/Nothing you answer here is saved or counted/)).toBeInTheDocument();
    expect(screen.getByText("Question 1 of 2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show the hint" }));
    expect(screen.getByText("Count on from 1.")).toBeInTheDocument();

    // A wrong answer gets one more try, a second wrong answer shows how.
    await user.click(screen.getByRole("button", { name: /3/ }));
    expect(screen.getByText(/Not quite. A student gets one more try/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /4/ }));
    expect(await screen.findByText(/Here is how/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next question" }));

    expect(await screen.findByText("What is 2 + 1?")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /3/ }));
    expect(await screen.findByText(/Right!/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Finish" }));
    expect(await screen.findByText(/1 of 2 right on the first try/)).toBeInTheDocument();
  });

  it("offers a new set at the end and closes from the dialog", async () => {
    mocks.loadGrade.mockResolvedValue(undefined);
    mocks.generate.mockReturnValue([choice(4)]);
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<TryUnit unitKey="3/math/counting" framework="ca-on" onClose={onClose} />);
    await user.click(await screen.findByRole("button", { name: /5/ }));
    await user.click(await screen.findByRole("button", { name: "Finish" }));
    const calls = mocks.generate.mock.calls.length;
    await user.click(screen.getByRole("button", { name: "Try a new set" }));
    expect(await screen.findByText("What is 4 + 1?")).toBeInTheDocument();
    expect(mocks.generate.mock.calls.length).toBeGreaterThan(calls);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("says so, instead of showing nothing, when the unit can't be loaded", async () => {
    mocks.loadGrade.mockRejectedValue(new Error("offline"));
    render(<TryUnit unitKey="3/math/counting" framework="ca-on" onClose={() => undefined} />);
    const dialog = await screen.findByRole("dialog");
    expect(await within(dialog).findByRole("alert")).toHaveTextContent("could not be loaded");
  });
});
