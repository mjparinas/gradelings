// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Toast } from "@/lib/store";

const h = vi.hoisted(() => ({
  state: { toasts: [] as Toast[], activeId: "p1", settings: {} as Record<string, { quietToasts?: boolean }>, dismissToast: vi.fn() },
  area: "",
  sounds: { trophy: vi.fn(), levelUp: vi.fn(), pop: vi.fn() },
}));

vi.mock("@/lib/store", () => ({ useStore: (select: (s: unknown) => unknown) => select(h.state) }));
vi.mock("@/lib/router", () => ({ useRoute: () => ({ path: h.area ? [h.area] : [], query: new URLSearchParams() }) }));
vi.mock("@/lib/sound", () => ({ sounds: h.sounds }));

import { Toasts } from "./Toasts";

const trophy: Toast = { id: "t1", kind: "trophy", title: "Week Warrior", subtitle: "Practise 7 days in a row", icon: "🔥", tier: "gold" };
const level: Toast = { id: "t2", kind: "level", title: "Level 5!", subtitle: "Your buddy grew", icon: "⬆️" };

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
  h.state.toasts = [];
  h.state.settings = {};
  h.area = "";
});
afterEach(() => vi.useRealTimers());

describe("Toasts", () => {
  it("shows nothing when there is nothing to celebrate", () => {
    const { container } = render(<Toasts />);
    expect(container).toBeEmptyDOMElement();
  });

  it("shows one trophy at a time with its tier, plays a big chime for gold, then dismisses it", () => {
    h.state.toasts = [trophy, level];
    render(<Toasts />);
    const toast = screen.getByRole("status");
    expect(toast).toHaveTextContent("You earned a trophy");
    expect(toast).toHaveTextContent("Week Warrior");
    expect(toast).toHaveTextContent("Gold");
    expect(screen.queryByText("Level 5!")).not.toBeInTheDocument();
    expect(h.sounds.trophy).toHaveBeenCalledWith(true);
    act(() => void vi.advanceTimersByTime(4200 - 350));
    expect(toast).toHaveClass("animate-toast-out");
    expect(h.state.dismissToast).not.toHaveBeenCalled();
    act(() => void vi.advanceTimersByTime(350));
    expect(h.state.dismissToast).toHaveBeenCalledWith("t1");
  });

  it("never takes taps, so it can't block the buttons underneath", () => {
    h.state.toasts = [trophy];
    render(<Toasts />);
    expect(screen.getByRole("status").parentElement).toHaveClass("pointer-events-none");
  });

  it("a bronze trophy gets the smaller chime, a level-up its own sound, anything else a pop", () => {
    h.state.toasts = [{ ...trophy, tier: "bronze" }];
    const first = render(<Toasts />);
    expect(h.sounds.trophy).toHaveBeenCalledWith(false);
    first.unmount();
    h.state.toasts = [level];
    const second = render(<Toasts />);
    expect(screen.getByRole("status")).toHaveTextContent("Level up");
    expect(h.sounds.levelUp).toHaveBeenCalled();
    second.unmount();
    h.state.toasts = [{ id: "q", kind: "quest", title: "Quest done", subtitle: "+20 coins", icon: "🎯" }];
    render(<Toasts />);
    expect(screen.getByRole("status")).toHaveTextContent("Quest");
    expect(h.sounds.pop).toHaveBeenCalledWith(4);
  });

  it("in quiet mode, waits until the child is out of a lesson or game", () => {
    h.state.toasts = [trophy];
    h.state.settings = { p1: { quietToasts: true } };
    h.area = "session";
    const { rerender } = render(<Toasts />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    h.area = "arcade";
    rerender(<Toasts />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    h.area = "";
    rerender(<Toasts />);
    expect(screen.getByRole("status")).toHaveTextContent("Week Warrior");
  });

  it("without quiet mode, shows straight away during a lesson", () => {
    h.state.toasts = [trophy];
    h.area = "session";
    render(<Toasts />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
