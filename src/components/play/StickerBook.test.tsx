// @vitest-environment jsdom
import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { derive, type Derived, type UnitStat } from "@/lib/derive";
import { MOMENT_COUNT } from "@/lib/stickers";
import { BandProvider } from "../band";

const h = vi.hoisted(() => {
  const ref = (subject: string, id: string, title: string, emoji: string) => ({
    key: `2/${subject}/${id}`,
    course: { grade: "2", subject },
    unit: { id, title, emoji },
  });
  return {
    refs: [
      ref("math", "add", "Adding", "➕"),
      ref("math", "sub", "Subtracting", "➖"),
      ref("science", "rocks", "Rocks", "🪨"),
      ref("immersion", "mots", "Les mots", "🇫🇷"),
    ],
    d: undefined as unknown,
    query: "",
    settings: { enabledSubjects: ["math", "science", "immersion"] } as Record<string, unknown>,
  };
});

vi.mock("@/content", () => ({ allUnitRefs: () => h.refs }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1", name: "Ava", grade: "2", framework: "ca-bc", companion: "ollie" }),
  useChildSettings: () => h.settings,
  useDerived: () => h.d,
}));
vi.mock("@/lib/router", () => ({ go: vi.fn(), useRoute: () => ({ path: ["stickers"], query: new URLSearchParams(h.query) }) }));
vi.mock("../Critter", () => ({ Critter: () => null, SpeechBubble: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));

import { StickerBook } from "./StickerBook";

const level = (attempts: number, right: number, challengePassed = false) =>
  ({ attempts, firstTry: right, recent: Array.from({ length: attempts }, (_, i) => i < right), challengePassed }) as UnitStat;
const set = (over: Partial<Derived>) => {
  const base = derive([]);
  h.d = { ...base, ...over, totals: { ...base.totals, ...over.totals } };
};
const stickers = () => within(screen.getByRole("list")).getAllByRole("listitem");
const show = () =>
  render(
    <BandProvider value="middle">
      <StickerBook />
    </BandProvider>,
  );

beforeEach(() => {
  // A day with no festival on, unless a test picks one.
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-09-15T12:00:00"));
  h.query = "";
  h.settings = { enabledSubjects: ["math", "science", "immersion"] };
  set({});
});

afterEach(() => vi.useRealTimers());

describe("StickerBook", () => {
  it("starts on the moments page with nothing stuck in yet", () => {
    show();
    expect(screen.getByText("Finish a lesson to stick your first sticker!")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: `Moments, 0 of ${MOMENT_COUNT}` })).toHaveAttribute("aria-selected", "true");
    expect(stickers()).toHaveLength(MOMENT_COUNT);
    expect(stickers()[0]).toHaveTextContent("Sticker to find");
    expect(stickers()[0]).toHaveTextContent("Finish a lesson");
  });

  it("a finished lesson earns the first moment sticker", () => {
    set({ totals: { sessions: 1 } as Derived["totals"] });
    show();
    expect(screen.getByText(`You have 1 of ${MOMENT_COUNT + 3} stickers.`)).toBeInTheDocument();
    expect(stickers()[0]).toHaveTextContent("First lesson");
  });

  it("a lesson grown to Proficient earns its sticker, and a Star lesson's is shiny", () => {
    set({ units: { "2/math/add": level(10, 9), "2/math/sub": level(20, 20, true) } });
    show();
    fireEvent.click(screen.getByRole("tab", { name: "Math, 2 of 2" }));
    expect(screen.getByRole("list", { name: "Math stickers" })).toBeInTheDocument();
    const [add, sub] = stickers();
    expect(add).toHaveTextContent("Adding");
    expect(add).not.toHaveTextContent("Shiny");
    expect(sub).toHaveTextContent("Subtracting (shiny)");
  });

  it("only shows pages for subjects that are turned on, and French only once started", () => {
    const { unmount } = show();
    expect(screen.getByRole("tab", { name: "Science, 0 of 1" })).toBeInTheDocument();
    expect(screen.queryByRole("tab", { name: /Français/ })).not.toBeInTheDocument();
    unmount();
    h.settings = { enabledSubjects: ["math"] };
    set({ units: { "2/immersion/mots": level(1, 1) } });
    show();
    expect(screen.getAllByRole("tab").map((t) => t.getAttribute("aria-label"))).toEqual([`Moments, 0 of ${MOMENT_COUNT}`, "Surprises, 0 of 20", "Math, 0 of 2"]);
  });

  it("a started French lesson gets its own page", () => {
    set({ units: { "2/immersion/mots": level(1, 1) } });
    show();
    expect(screen.getByRole("tab", { name: "Français, 0 of 1" })).toBeInTheDocument();
  });

  it("opens on the festival page from the home card, with the festival's own stickers", () => {
    vi.setSystemTime(new Date("2026-10-24T12:00:00"));
    h.query = "page=leaf-2026";
    set({ days: { "2026-10-02": { day: "2026-10-02", learnSeconds: 60, answers: 5, correct: 5, sessions: 1, perfect: 1, playSeconds: 0, bestRun: 5, stories: 0, subjects: { math: 5 }, modes: {} } } });
    show();
    expect(screen.getByRole("tab", { name: "Leaf Festival, 2 of 6" })).toHaveAttribute("aria-selected", "true");
    expect(stickers()[0]).toHaveTextContent("Falling leaf");
    expect(stickers()[1]).toHaveTextContent("Answer 50 questions in the festival");
    expect(screen.getByText(/comes back next year/)).toBeInTheDocument();
    // Festival stickers are extras: the count is still lessons and moments.
    expect(screen.getByText("Finish a lesson to stick your first sticker!")).toBeInTheDocument();
  });

  it("shows surprise stickers from mystery boxes, with how many of each", () => {
    h.query = "page=surprises";
    set({ surprises: { octopus: 2, unicorn: 1 }, mysteries: { a: "2026-09-01", b: "2026-09-02", c: "2026-09-03" } });
    show();
    expect(screen.getByRole("tab", { name: "Surprises, 2 of 20" })).toHaveAttribute("aria-selected", "true");
    expect(stickers()[0]).toHaveTextContent("Octopus");
    expect(stickers()[0]).toHaveTextContent("× 2");
    expect(screen.getByText("Unicorn").closest("li")).toHaveTextContent("Shiny");
  });
});
