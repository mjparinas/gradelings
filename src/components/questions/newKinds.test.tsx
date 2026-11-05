// @vitest-environment jsdom
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import type { FillQuestion as FillQ, HighlightQuestion as HighlightQ, MatchQuestion as MatchQ, MistakeQuestion as MistakeQ, MultiQuestion as MultiQ, TilesQuestion as TilesQ } from "@/content/types";
import { FillQuestion } from "./FillQuestion";
import { HighlightQuestion } from "./HighlightQuestion";
import { MatchQuestion } from "./MatchQuestion";
import { MistakeQuestion } from "./MistakeQuestion";
import { MultiQuestion } from "./MultiQuestion";
import { TilesQuestion } from "./TilesQuestion";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: () => ({ matches: true, addEventListener() {}, removeEventListener() {} }),
  });
});

const fns = () => ({ onAttempt: vi.fn(), onSlip: vi.fn() });
const click = userEvent.click;

describe("MatchQuestion", () => {
  const q: MatchQ = {
    kind: "match",
    prompt: "Match.",
    hint: "h",
    pairs: [
      { id: "a", left: { label: "cat" }, right: { label: "cat", emoji: "🐱", picture: true } },
      { id: "b", left: { label: "dog" }, right: { label: "dog", emoji: "🐶", picture: true } },
    ],
  };
  const left = (name: string) => screen.getAllByTestId("match-left").find((b) => b.textContent?.includes(name))!;
  const right = (name: string) => screen.getAllByTestId("match-right").find((b) => b.textContent?.includes(name))!;

  it("slips on a wrong pair, locks right pairs and finishes when all are matched", async () => {
    const { onAttempt, onSlip } = fns();
    render(<MatchQuestion q={q} status="answering" {...{ onAttempt, onSlip }} />);
    await click(left("cat"));
    await click(right("dog"));
    expect(onSlip).toHaveBeenCalledTimes(1);
    expect(onAttempt).not.toHaveBeenCalled();
    await click(left("cat"));
    await click(right("cat"));
    expect(onAttempt).not.toHaveBeenCalled();
    await click(right("dog"));
    await click(left("dog"));
    expect(onAttempt).toHaveBeenCalledWith(true, expect.anything());
  });

  it("pairs can be started from the right column too", async () => {
    const { onAttempt, onSlip } = fns();
    render(<MatchQuestion q={q} status="answering" {...{ onAttempt, onSlip }} />);
    await click(right("cat"));
    await click(left("cat"));
    await click(right("dog"));
    await click(left("dog"));
    expect(onSlip).not.toHaveBeenCalled();
    expect(onAttempt).toHaveBeenCalledWith(true, expect.anything());
  });

  it("shows every pair matched when the answer is revealed", () => {
    render(<MatchQuestion q={q} status="revealed" {...fns()} />);
    expect(screen.getAllByTestId("match-left").every((b) => b.getAttribute("data-state") === "right")).toBe(true);
  });
});

describe("MultiQuestion", () => {
  const q: MultiQ = {
    kind: "multi",
    prompt: "Tap every mammal.",
    hint: "h",
    choices: [
      { id: "a", label: "dog" },
      { id: "b", label: "whale" },
      { id: "c", label: "shark" },
    ],
    answers: ["a", "b"],
  };
  const pick = (name: string) => screen.getAllByTestId("multi-choice").find((b) => b.textContent?.includes(name))!;

  it("needs a pick before Check, and is right only with exactly the right set", async () => {
    const { onAttempt, onSlip } = fns();
    render(<MultiQuestion q={q} status="answering" {...{ onAttempt, onSlip }} />);
    const check = screen.getByRole("button", { name: /check/i });
    expect(check).toBeDisabled();
    await click(pick("dog"));
    await click(check);
    expect(onAttempt).toHaveBeenLastCalledWith(false, expect.anything());
    await click(pick("whale"));
    await click(check);
    expect(onAttempt).toHaveBeenLastCalledWith(true, expect.anything());
    await click(pick("shark"));
    await click(check);
    expect(onAttempt).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it("shows the right answers when revealed", () => {
    render(<MultiQuestion q={q} status="revealed" {...fns()} />);
    expect(pick("dog")).toHaveAttribute("aria-pressed", "true");
    expect(pick("shark")).toHaveAttribute("aria-pressed", "false");
  });
});

describe("HighlightQuestion", () => {
  const q: HighlightQ = { kind: "highlight", prompt: "Tap the verb.", hint: "h", words: ["Birds", "sing", "loudly."], answers: [1] };
  it("checks the tapped word, and tapping another word moves the pick", async () => {
    const { onAttempt, onSlip } = fns();
    render(<HighlightQuestion q={q} status="answering" {...{ onAttempt, onSlip }} />);
    await click(screen.getByRole("button", { name: "Birds" }));
    await click(screen.getByRole("button", { name: "sing" }));
    expect(screen.getByRole("button", { name: "Birds" })).toHaveAttribute("aria-pressed", "false");
    await click(screen.getByRole("button", { name: /check/i }));
    expect(onAttempt).toHaveBeenCalledWith(true, expect.anything());
  });
  it("a wrong word is not right", async () => {
    const { onAttempt, onSlip } = fns();
    render(<HighlightQuestion q={q} status="answering" {...{ onAttempt, onSlip }} />);
    await click(screen.getByRole("button", { name: "Birds" }));
    await click(screen.getByRole("button", { name: /check/i }));
    expect(onAttempt).toHaveBeenCalledWith(false, expect.anything());
  });
});

describe("MistakeQuestion", () => {
  const q: MistakeQ = { kind: "mistake", prompt: "p", hint: "h", steps: ["1 + 1 = 2", "2 + 2 = 5", "5 + 1 = 6"], wrong: 1 };
  it("a wrong step is a miss and can't be tapped again; the mistake is right", async () => {
    const { onAttempt, onSlip } = fns();
    render(<MistakeQuestion q={q} status="answering" {...{ onAttempt, onSlip }} />);
    const steps = screen.getAllByTestId("mistake-step");
    await click(steps[0]);
    expect(onAttempt).toHaveBeenLastCalledWith(false, expect.anything());
    expect(steps[0]).toBeDisabled();
    await click(steps[1]);
    expect(onAttempt).toHaveBeenLastCalledWith(true, expect.anything());
  });
});

describe("FillQuestion", () => {
  const q: FillQ = { kind: "fill", prompt: "p", hint: "h", text: "A ___ is a ___.", answers: ["cat", "pet"], bank: ["cat", "pet", "rock"] };
  const bank = (w: string) => screen.getAllByTestId("bank-word").find((b) => b.textContent === w)!;

  it("fills blanks in order, lets a word go back, and checks", async () => {
    const { onAttempt, onSlip } = fns();
    render(<FillQuestion q={q} status="answering" {...{ onAttempt, onSlip }} />);
    expect(screen.getByRole("button", { name: /check/i })).toBeDisabled();
    await click(bank("rock"));
    await click(bank("pet"));
    await click(screen.getByRole("button", { name: /Blank 1/ }));
    await click(bank("cat"));
    expect(screen.getByRole("button", { name: /Blank 1: cat/ })).toBeInTheDocument();
    await click(screen.getByRole("button", { name: /check/i }));
    expect(onAttempt).toHaveBeenCalledWith(true, expect.anything());
  });

  it("a wrong word is a miss", async () => {
    const { onAttempt, onSlip } = fns();
    render(<FillQuestion q={q} status="answering" {...{ onAttempt, onSlip }} />);
    await click(bank("pet"));
    await click(bank("cat"));
    await click(screen.getByRole("button", { name: /check/i }));
    expect(onAttempt).toHaveBeenCalledWith(false, expect.anything());
  });
});

describe("TilesQuestion", () => {
  const q: TilesQ = { kind: "tiles", prompt: "p", hint: "h", tiles: ["c", "a", "t"], extra: ["s"], join: "" };
  const tile = (l: string) => screen.getAllByTestId("tile").find((b) => b.textContent === l)!;

  it("builds the word from tiles, in order", async () => {
    const { onAttempt, onSlip } = fns();
    render(<TilesQuestion q={q} status="answering" {...{ onAttempt, onSlip }} />);
    await click(tile("c"));
    await click(tile("a"));
    await click(tile("s"));
    await click(screen.getByRole("button", { name: /check/i }));
    expect(onAttempt).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it("takes the right word, and any listed alternative", async () => {
    const { onAttempt, onSlip } = fns();
    render(<TilesQuestion q={q} status="answering" {...{ onAttempt, onSlip }} />);
    for (const l of ["c", "a", "t"]) await click(tile(l));
    expect(within(screen.getByLabelText("Your answer")).getAllByTestId("tile-placed")).toHaveLength(3);
    await click(screen.getByRole("button", { name: /check/i }));
    expect(onAttempt).toHaveBeenLastCalledWith(true, expect.anything());
  });

  it("joins sentence tiles with spaces", async () => {
    const { onAttempt, onSlip } = fns();
    render(<TilesQuestion q={{ ...q, tiles: ["Birds", "sing."], extra: undefined, join: " " }} status="answering" {...{ onAttempt, onSlip }} />);
    await click(tile("Birds"));
    await click(tile("sing."));
    await click(screen.getByRole("button", { name: /check/i }));
    expect(onAttempt).toHaveBeenCalledWith(true, expect.anything());
  });
});

describe("dragging", () => {
  const dragTo = (from: Element, to: Element) => {
    document.elementFromPoint = () => to;
    fireEvent.pointerDown(from, { pointerId: 1, isPrimary: true, clientX: 1, clientY: 1 });
    act(() => void window.dispatchEvent(new PointerEvent("pointermove", { pointerId: 1, clientX: 60, clientY: 60 })));
    act(() => void window.dispatchEvent(new PointerEvent("pointerup", { pointerId: 1, clientX: 60, clientY: 60 })));
  };

  it("drags a tile onto the answer line", () => {
    const { onAttempt, onSlip } = fns();
    render(<TilesQuestion q={{ kind: "tiles", prompt: "p", hint: "h", tiles: ["a", "b"], join: "" }} status="answering" {...{ onAttempt, onSlip }} />);
    const tileA = screen.getAllByTestId("tile").find((b) => b.textContent === "a")!;
    dragTo(tileA, screen.getByLabelText("Your answer"));
    expect(screen.getAllByTestId("tile-placed")).toHaveLength(1);
  });

  it("drags a word into a chosen blank", () => {
    const { onAttempt, onSlip } = fns();
    render(<FillQuestion q={{ kind: "fill", prompt: "p", hint: "h", text: "A ___ and a ___.", answers: ["cat", "dog"], bank: ["cat", "dog", "cow"] }} status="answering" {...{ onAttempt, onSlip }} />);
    const dog = screen.getAllByTestId("bank-word").find((b) => b.textContent === "dog")!;
    dragTo(dog, screen.getAllByTestId("fill-blank")[1]);
    expect(screen.getByRole("button", { name: /Blank 2: dog/ })).toBeInTheDocument();
  });

  it("drags a word onto its picture to match it", () => {
    const { onAttempt, onSlip } = fns();
    const q: MatchQ = { kind: "match", prompt: "p", hint: "h", pairs: [{ id: "a", left: { label: "cat" }, right: { label: "cat", emoji: "🐱", picture: true } }, { id: "b", left: { label: "dog" }, right: { label: "dog", emoji: "🐶", picture: true } }] };
    render(<MatchQuestion q={q} status="answering" {...{ onAttempt, onSlip }} />);
    const cat = screen.getAllByTestId("match-left").find((b) => b.textContent?.includes("cat"))!;
    const dogPic = screen.getAllByTestId("match-right").find((b) => b.textContent?.includes("dog"))!;
    dragTo(cat, dogPic);
    expect(onSlip).toHaveBeenCalledTimes(1);
  });
});
