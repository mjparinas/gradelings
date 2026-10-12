// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { derive, type Derived } from "@/lib/derive";
import { visibleTrophies } from "@/lib/trophies";

const h = vi.hoisted(() => ({ d: undefined as unknown }));

vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1", name: "Ava", grade: "3", framework: "ca-bc" }),
  useDerived: () => h.d,
}));
vi.mock("@/lib/router", () => ({ go: vi.fn() }));
vi.mock("../Critter", async (orig) => ({ ...(await orig<typeof import("../Critter")>()), CritterSvg: () => <span data-testid="party-critter" /> }));
vi.mock("./Hud", () => ({ LevelBadge: ({ level }: { level: number }) => <span>Level {level}</span> }));

import { TrophyRoom } from "./Trophies";

const EARNED = new Date(2026, 4, 3).getTime();
const set = (over: Partial<Derived>) => {
  h.d = { ...derive([]), ...over };
};
const card = (name: string) => screen.getByText(name).closest(".card") as HTMLElement;

beforeEach(() => set({}));

describe("TrophyRoom", () => {
  it("shows points and how many of the visible trophies are earned", () => {
    set({ trophies: { "streak-3": EARNED }, trophyPoints: 15 });
    render(<TrophyRoom />);
    const total = visibleTrophies(h.d as Derived, { grade: "3", framework: "ca-bc" }).length;
    expect(screen.getByText(`15 trophy points · 1/${total} trophies`)).toBeInTheDocument();
    expect(card("Three-Peat")).toHaveTextContent("Earned May 3, 2026");
  });

  it("shows progress towards a trophy not yet earned", () => {
    set({ streak: { ...derive([]).streak, best: 2 } });
    render(<TrophyRoom />);
    expect(screen.getByRole("progressbar", { name: "Progress towards Three-Peat" })).toHaveAttribute("aria-valuenow", "2");
    expect(card("Three-Peat")).toHaveTextContent("2/3");
  });

  it("keeps secret trophies secret until found", () => {
    const { unmount } = render(<TrophyRoom />);
    expect(screen.queryByText("Old School")).not.toBeInTheDocument();
    expect(screen.getAllByText("Secret trophy").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Keep playing to discover it!").length).toBeGreaterThan(0);
    unmount();
    set({ trophies: { konami: EARNED } });
    render(<TrophyRoom />);
    expect(card("Old School")).toHaveTextContent("Up, up, down, down");
  });

  it("filters to earned and still-to-do trophies", () => {
    set({ trophies: { "streak-3": EARNED } });
    render(<TrophyRoom />);
    fireEvent.click(screen.getByRole("tab", { name: "Earned" }));
    expect(screen.getByRole("tab", { name: "Earned" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getAllByText(/^Earned /)).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 2 }).map((x) => x.textContent)).toEqual(["Streaks"]);
    fireEvent.click(screen.getByRole("tab", { name: "To do" }));
    expect(screen.queryByText("Three-Peat")).not.toBeInTheDocument();
    expect(screen.queryByText(/^Earned /)).not.toBeInTheDocument();
  });

  it("throws a critter party once every buddy is collected", () => {
    const { unmount } = render(<TrophyRoom />);
    expect(screen.queryByRole("region", { name: "Your critter party" })).not.toBeInTheDocument();
    unmount();
    set({ trophies: { "critter-party": EARNED } });
    render(<TrophyRoom />);
    expect(screen.getByRole("region", { name: "Your critter party" })).toBeInTheDocument();
  });
});
