// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({
  log: vi.fn(),
  state: { activeId: "p1" as string | null, log: undefined as unknown },
  secrets: [] as string[],
  seed: 0,
}));
h.state.log = h.log;

vi.mock("@/lib/store", () => ({
  useStore: Object.assign((select: (s: unknown) => unknown) => select(h.state), { getState: () => h.state }),
  derivedFor: () => ({ secrets: h.secrets }),
  useActiveProfile: () => ({ id: "p1", name: "Ava", companion: "bao" }),
}));
vi.mock("@/content/random", () => ({ hashSeed: () => h.seed }));
vi.mock("@/lib/useNow", () => ({ useNow: () => 1_760_000_000_000 }));
vi.mock("@/lib/sound", () => ({ sounds: { pop: vi.fn() } }));
vi.mock("../Critter", () => ({
  Critter: ({ id }: { id: string }) => <span data-testid="critter">{id}</span>,
  SpeechBubble: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

import { BuddyButton, findSecret, MooseVisitor, SecretsListener } from "./Secrets";

const found = () => h.log.mock.calls.flatMap((c) => c[0]).map((e: { code: string }) => e.code);
const KONAMI_KEYS = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const press = (key: string, init: KeyboardEventInit = {}) => act(() => void fireEvent.keyDown(window, { key, ...init }));
const type = (word: string) => [...word].forEach((k) => press(k));
const touch = (type: "pointerdown" | "pointerup", x: number, y: number) => {
  const e = Object.assign(new Event(type), { pointerType: "touch", clientX: x, clientY: y });
  act(() => void window.dispatchEvent(e));
};
const swipe = (dx: number, dy: number) => {
  touch("pointerdown", 100, 100);
  touch("pointerup", 100 + dx, 100 + dy);
};
const tap = () => swipe(2, 0);
/** React listens for the prefixed name when the browser's styles only know the prefixed property, as jsdom's do. */
const animationEnd = (el: Element) =>
  act(() => {
    for (const name of ["animationend", "webkitAnimationEnd"]) el.dispatchEvent(new Event(name, { bubbles: true }));
  });

beforeEach(() => {
  vi.clearAllMocks();
  h.secrets = [];
  h.state.activeId = "p1";
  h.seed = 0;
});

describe("findSecret", () => {
  it("logs a secret once, and ignores it when it was already found", () => {
    findSecret("konami");
    expect(found()).toEqual(["konami"]);
    h.secrets = ["konami"];
    findSecret("konami");
    expect(found()).toEqual(["konami"]);
  });

  it("does nothing with no child playing", () => {
    h.state.activeId = null;
    findSecret("konami");
    expect(h.log).not.toHaveBeenCalled();
  });
});

describe("SecretsListener", () => {
  it("the Konami code on a keyboard finds the Old School secret", () => {
    render(<SecretsListener />);
    KONAMI_KEYS.slice(0, -1).forEach((k) => press(k));
    expect(found()).not.toContain("konami");
    press("a");
    expect(found()).toContain("konami");
  });

  it("on a touch screen, eight swipes then two taps are the Konami code", () => {
    render(<SecretsListener />);
    swipe(0, -80);
    swipe(0, -80);
    swipe(0, 80);
    swipe(0, 80);
    swipe(-80, 0);
    swipe(80, 0);
    swipe(-80, 0);
    swipe(80, 0);
    tap();
    expect(found()).not.toContain("konami");
    tap();
    expect(found()).toEqual(["konami"]);
  });

  it("a mouse click or a diagonal smear is not a swipe", () => {
    render(<SecretsListener />);
    const e = Object.assign(new Event("pointerdown"), { pointerType: "mouse", clientX: 0, clientY: 0 });
    act(() => void window.dispatchEvent(e));
    swipe(60, 60);
    expect(h.log).not.toHaveBeenCalled();
  });

  it("typing a secret word sends that critter across the screen", () => {
    render(<SecretsListener />);
    type("xxhoot");
    expect(found()).toEqual(["secret-word"]);
    expect(screen.getByTestId("critter")).toHaveTextContent("hoot");
    type("moose");
    expect(screen.getAllByTestId("critter").map((c) => c.textContent)).toContain("maple");
  });

  it('"eh" brings the child\'s own buddy, asking "Eh?"', () => {
    render(<SecretsListener />);
    type("eh");
    expect(screen.getByTestId("critter")).toHaveTextContent("bao");
    expect(screen.getByText("Eh?")).toBeInTheDocument();
  });

  it("the visitor leaves when its walk ends", () => {
    const { container } = render(<SecretsListener />);
    type("ollie");
    animationEnd(container.querySelector(".animate-cross")!);
    expect(screen.queryByTestId("critter")).not.toBeInTheDocument();
  });

  it("ignores words typed into a text box or with a modifier key", () => {
    render(
      <>
        <SecretsListener />
        <input aria-label="Name" />
      </>,
    );
    const input = screen.getByLabelText("Name");
    for (const k of "hoot") fireEvent.keyDown(input, { key: k });
    for (const k of "hoot") press(k, { ctrlKey: true });
    expect(h.log).not.toHaveBeenCalled();
    expect(screen.queryByTestId("critter")).not.toBeInTheDocument();
  });
});

describe("BuddyButton", () => {
  afterEach(() => vi.useRealTimers());

  it("ten quick pats make the buddy dizzy, once", async () => {
    render(<BuddyButton name="your buddy">buddy</BuddyButton>);
    const button = screen.getByRole("button", { name: "Pat your buddy" });
    for (let i = 0; i < 9; i++) await userEvent.click(button);
    expect(h.log).not.toHaveBeenCalled();
    await userEvent.click(button);
    expect(found()).toEqual(["dizzy-ollie"]);
    expect(button).toHaveClass("animate-spin");
    animationEnd(button);
    expect(button).not.toHaveClass("animate-spin");
  });

  it("slow pats start the count again", () => {
    vi.useFakeTimers();
    render(<BuddyButton name="your buddy">buddy</BuddyButton>);
    const button = screen.getByRole("button", { name: "Pat your buddy" });
    for (let i = 0; i < 12; i++) {
      fireEvent.click(button);
      vi.advanceTimersByTime(i === 5 ? 2500 : 100);
    }
    expect(h.log).not.toHaveBeenCalled();
  });
});

describe("MooseVisitor", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());
  const moose = () => screen.queryByRole("button", { name: /A moose strolls by/ });

  it("on a moose day, strolls past after 12 quiet seconds and says sorry when greeted", () => {
    render(<MooseVisitor />);
    act(() => void vi.advanceTimersByTime(11_000));
    expect(moose()).toBeNull();
    act(() => void vi.advanceTimersByTime(1_000));
    fireEvent.click(moose()!);
    expect(screen.getByText("Sorry!")).toBeInTheDocument();
    // The clipping wrapper needs room above the moose or the speech bubble is cut off.
    expect(screen.getByText("Sorry!").closest(".overflow-hidden")).toHaveClass("pt-10");
    expect(found()).toEqual(["polite-moose"]);
  });

  it("waits again whenever the child taps the screen", () => {
    render(<MooseVisitor />);
    act(() => void vi.advanceTimersByTime(10_000));
    act(() => void window.dispatchEvent(new Event("pointerdown")));
    act(() => void vi.advanceTimersByTime(10_000));
    expect(moose()).toBeNull();
    act(() => void vi.advanceTimersByTime(2_000));
    expect(moose()).not.toBeNull();
  });

  it("never comes on other days", () => {
    h.seed = 1;
    render(<MooseVisitor />);
    act(() => void vi.advanceTimersByTime(60_000));
    expect(moose()).toBeNull();
  });
});
