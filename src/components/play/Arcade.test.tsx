// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { GameTime } from "@/lib/gametime";
import type { GameProps } from "./games/types";
import { BandProvider } from "../band";

const h = vi.hoisted(() => ({
  go: vi.fn(),
  log: vi.fn(),
  celebrate: vi.fn(),
  stopSpeaking: vi.fn(),
  time: {} as Record<string, unknown>,
  settings: {} as Record<string, unknown>,
  gameBest: {} as Record<string, number>,
  level: 1,
  grade: "3",
  framework: "ca-bc",
}));

// Each game is a stand-in that lets the test report a score, a level or a game over.
const stub = vi.hoisted(() => (name: string) => ({
  [name]: ({ onScore, onLevel, onOver, band, country }: GameProps) => (
    <div data-testid="game" data-band={band} data-country={country}>
      {name}
      <button type="button" onClick={() => onScore(50)}>
        score 50
      </button>
      <button type="button" onClick={() => onLevel(3)}>
        level 3
      </button>
      <button type="button" onClick={onOver}>
        out of lives
      </button>
    </div>
  ),
}));
vi.mock("@/lib/router", () => ({ go: h.go }));
vi.mock("@/lib/gametime", () => ({ gameTime: () => h.time }));
vi.mock("@/lib/juice", () => ({ celebrate: h.celebrate }));
vi.mock("@/lib/speech", () => ({ stopSpeaking: h.stopSpeaking }));
vi.mock("@/lib/sound", () => ({ sounds: { complete: vi.fn() } }));
vi.mock("@/lib/store", () => ({
  useStore: (select: (s: unknown) => unknown) => select({ log: h.log }),
  useActiveProfile: () => ({ id: "p1", name: "Ava", grade: h.grade, framework: h.framework, confetti: "hearts" }),
  useChildSettings: () => h.settings,
  useDerived: () => ({ gameBest: h.gameBest, level: h.level }),
}));
vi.mock("../Critter", () => ({ SpeechBubble: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
vi.mock("./Companion", () => ({ Companion: () => null }));
vi.mock("./Practice", () => ({ BackButton: () => <button type="button">Back</button> }));
vi.mock("./games/Munchers", () => stub("Munchers"));
vi.mock("./games/Ninja", () => stub("Ninja"));
vi.mock("./games/Catch", () => stub("Catch"));
vi.mock("./games/Bubbles", () => stub("Bubbles"));
vi.mock("./games/Memory", () => stub("Memory"));
vi.mock("./games/MapDash", () => stub("MapDash"));
vi.mock("./games/Timeline", () => stub("Timeline"));
vi.mock("./games/ClockCatch", () => stub("ClockCatch"));
vi.mock("./games/WordBridge", () => stub("WordBridge"));
vi.mock("./games/CoinShop", () => stub("CoinShop"));
vi.mock("./games/Tower", () => stub("Tower"));

import { Arcade, GameScreen } from "./Arcade";

const time = (over: Partial<GameTime>) => {
  h.time = { enabled: true, freePlay: false, availableSeconds: 300, nextInSeconds: 0, ...over };
};
/** The play clock ticks once a second; let the screen update between ticks, as a browser would. */
const seconds = (n: number) => {
  for (let i = 0; i < n; i++) act(() => void vi.advanceTimersByTime(1000));
};
const click = (name: string | RegExp) => fireEvent.click(screen.getByRole("button", { name }));
const logged = (type: string) => h.log.mock.calls.flatMap((c) => c[0]).filter((e: { type: string }) => e.type === type);

beforeEach(() => {
  vi.clearAllMocks();
  window.scrollTo = vi.fn() as typeof window.scrollTo;
  // Saved play time comes off the bank, as it does once the store re-derives.
  h.log.mockImplementation((events: { type: string; seconds?: number }[]) => {
    for (const e of events) if (e.type === "play") h.time.availableSeconds = (h.time.availableSeconds as number) - (e.seconds ?? 0);
  });
  h.settings = {};
  h.gameBest = {};
  h.level = 1;
  h.grade = "3";
  h.framework = "ca-bc";
  time({});
});

describe("Arcade", () => {
  it("shows how much game time is banked and opens a game", () => {
    h.gameBest = { ninja: 140 };
    render(<Arcade />);
    expect(screen.getByRole("heading", { name: /Arcade/ })).toBeInTheDocument();
    expect(screen.getByText("5:00")).toBeInTheDocument();
    expect(screen.getByText("Best: 140")).toBeInTheDocument();
    click(/Number Munchers/);
    expect(h.go).toHaveBeenCalledWith("/arcade/munchers");
  });

  it("locks every game until enough learning is done, with a way to go learn", () => {
    time({ availableSeconds: 0, nextInSeconds: 8 * 60 });
    h.settings = { learnMinutesPerReward: 20, rewardGameMinutes: 5, maxGameMinutesPerDay: 20 };
    render(<Arcade />);
    expect(screen.getByText("Learn 8 more minutes to unlock 5 minutes of games.")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Learning time until the next game minutes" })).toHaveAttribute("aria-valuenow", String(12 * 60));
    expect(screen.getByRole("button", { name: /Number Munchers/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Memory Match/ })).toBeDisabled();
    click("Go learn →");
    expect(h.go).toHaveBeenCalledWith("/session", { mode: "adventure", scope: "mix" });
  });

  it("says when today's game time is all used up", () => {
    time({ availableSeconds: 0, nextInSeconds: 0 });
    render(<Arcade />);
    expect(screen.getByText(/That's all the game time for today/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Go learn →" })).not.toBeInTheDocument();
  });

  it("explains free play, without a learning bar", () => {
    time({ freePlay: true, availableSeconds: 65, nextInSeconds: 600 });
    render(<Arcade />);
    expect(screen.getByText("Free play is on! 1:05 left today.")).toBeInTheDocument();
    expect(screen.queryByRole("progressbar", { name: "Learning time until the next game minutes" })).not.toBeInTheDocument();
  });

  it("tells the child when a grown-up has turned games off", () => {
    time({ enabled: false, availableSeconds: 300 });
    render(<Arcade />);
    expect(screen.getByText(/Games are turned off right now/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Word Ninja/ })).toBeDisabled();
  });

  it("shows the newer games locked until their level, with how far the child has to go", () => {
    h.level = 3;
    render(<Arcade />);
    // Map Dash (level 2) and Timeline Snap (level 3) are open; the rest wait.
    expect(screen.getByRole("button", { name: /Map Dash/ })).toBeEnabled();
    expect(screen.getByRole("button", { name: /Timeline Snap/ })).toBeEnabled();
    expect(screen.queryByRole("button", { name: /Clock Catch/ })).not.toBeInTheDocument();
    expect(screen.getByText("Clock Catch")).toBeInTheDocument();
    expect(screen.getByText("Unlocks at level 6. You're level 3!")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Level 3 of 5" })).toBeInTheDocument();
    click(/Map Dash/);
    expect(h.go).toHaveBeenCalledWith("/arcade/map");
  });

  it("only lists the games that fit the child's grade, and Word Bridge only with French on", () => {
    h.level = 50;
    h.grade = "k";
    const { unmount } = render(<Arcade />);
    const names = () => screen.getAllByRole("button").map((b) => b.textContent ?? "");
    expect(names().some((n) => n.includes("Map Dash"))).toBe(true);
    expect(names().some((n) => n.includes("Coin Shop"))).toBe(false);
    expect(names().some((n) => n.includes("Equation Tower"))).toBe(false);
    expect(names().some((n) => n.includes("Word Bridge"))).toBe(false);
    unmount();
    h.grade = "8";
    h.settings = { enabledSubjects: ["math", "core-french"] };
    render(<Arcade />);
    expect(names().some((n) => n.includes("Equation Tower"))).toBe(true);
    expect(names().some((n) => n.includes("Clock Catch"))).toBe(false);
    expect(names().some((n) => n.includes("Word Bridge"))).toBe(true);
  });

  it("calls it Games for little kids", () => {
    render(
      <BandProvider value="little">
        <Arcade />
      </BandProvider>,
    );
    expect(screen.getByRole("heading", { name: /Games/ })).toBeInTheDocument();
  });
});

describe("GameScreen", () => {
  afterEach(() => vi.useRealTimers());

  it("keeps a locked game shut, even from a saved link", () => {
    render(<GameScreen id="tower" />);
    expect(screen.getByRole("heading", { name: /Equation Tower/ })).toBeInTheDocument();
    expect(screen.getByText("Keep learning! This game unlocks at level 6.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Play!/ })).not.toBeInTheDocument();
    click(/Back to the arcade/);
    expect(h.go).toHaveBeenCalledWith("/arcade");
  });

  it("says when a game isn't part of the child's grade", () => {
    h.level = 50;
    h.grade = "k";
    render(<GameScreen id="coins" />);
    expect(screen.getByText("This game isn't part of your grade's arcade.")).toBeInTheDocument();
  });

  it("opens an unlocked newer game and passes the child's subjects", () => {
    h.level = 6;
    h.settings = { enabledSubjects: ["math", "immersion"] };
    render(<GameScreen id="bridge" />);
    click(/Play!/);
    expect(screen.getByTestId("game")).toHaveTextContent("WordBridge");
  });

  it("tells a game which country the child's curriculum is in", () => {
    h.level = 6;
    render(<GameScreen id="map" />);
    click(/Play!/);
    expect(screen.getByTestId("game")).toHaveAttribute("data-country", "CA");
  });

  it("gives a child on Washington's curriculum the US version of a game", () => {
    h.level = 6;
    h.framework = "us-wa";
    render(<GameScreen id="coins" />);
    click(/Play!/);
    expect(screen.getByTestId("game")).toHaveAttribute("data-country", "US");
  });

  it("renders nothing for an unknown game", () => {
    const { container } = render(<GameScreen id="pinball" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("starts with the game's description and how much time is left", () => {
    render(<GameScreen id="ninja" />);
    expect(screen.getByRole("heading", { name: /Word Ninja/ })).toBeInTheDocument();
    expect(screen.getByText(/Swipe to slice the right words/)).toBeInTheDocument();
    click(/Back to the arcade/);
    expect(h.go).toHaveBeenCalledWith("/arcade");
    click(/Play!/);
    expect(screen.getByTestId("game")).toHaveTextContent("Ninja");
  });

  it("a game over saves the score and level, and celebrates a new best", () => {
    h.gameBest = { munchers: 20 };
    render(<GameScreen id="munchers" />);
    click(/Play!/);
    click("score 50");
    click("level 3");
    expect(screen.getByText("50")).toBeInTheDocument();
    click("out of lives");
    expect(logged("game")).toEqual([expect.objectContaining({ game: "munchers", score: 50, level: 3 })]);
    expect(h.stopSpeaking).toHaveBeenCalled();
    expect(screen.getByText("🏆 New best score!")).toBeInTheDocument();
    expect(screen.getByText("Best: 50")).toBeInTheDocument();
    expect(h.celebrate).toHaveBeenCalledWith(["💖", "💜", "💛"], "cannons");
    // Ending twice doesn't log twice.
    expect(screen.queryByText("out of lives")).not.toBeInTheDocument();
    click(/Play again/);
    expect(screen.getByTestId("game")).toBeInTheDocument();
  });

  it("a score under the best is just game over, with no celebration", () => {
    h.gameBest = { catch: 90 };
    render(<GameScreen id="catch" />);
    click(/Play!/);
    click("score 50");
    click("Stop game");
    expect(screen.getByText("Game over!")).toBeInTheDocument();
    expect(screen.getByText("Best: 90")).toBeInTheDocument();
    expect(h.celebrate).not.toHaveBeenCalled();
  });

  it("counts play time each second, saves it every 15 seconds, and stops when time runs out", () => {
    vi.useFakeTimers();
    time({ availableSeconds: 20 });
    render(<GameScreen id="bubbles" />);
    click(/Play!/);
    expect(screen.getByText(/0:20/)).toBeInTheDocument();
    seconds(15);
    expect(logged("play")).toEqual([expect.objectContaining({ game: "bubbles", seconds: 15 })]);
    expect(screen.getByText(/0:05/)).toBeInTheDocument();
    seconds(5);
    expect(screen.getByText("Game time is up!")).toBeInTheDocument();
    expect(logged("play").map((e: { seconds: number }) => e.seconds)).toEqual([15, 5]);
    expect(logged("game")).toHaveLength(1);
  });

  it("doesn't count time while the app is in the background", () => {
    vi.useFakeTimers();
    render(<GameScreen id="memory" />);
    click(/Play!/);
    const visibility = vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    seconds(30);
    expect(logged("play")).toHaveLength(0);
    visibility.mockRestore();
  });

  it("saves unsaved play time when the child leaves mid-game", () => {
    vi.useFakeTimers();
    const { unmount } = render(<GameScreen id="memory" />);
    click(/Play!/);
    seconds(4);
    unmount();
    expect(logged("play")).toEqual([expect.objectContaining({ seconds: 4 })]);
  });

  it("with no time left, sends the child to learn instead of play", () => {
    time({ availableSeconds: 0 });
    render(
      <BandProvider value="little">
        <GameScreen id="memory" />
      </BandProvider>,
    );
    expect(screen.queryByRole("button", { name: /Play!/ })).not.toBeInTheDocument();
    click(/Learn to earn more time/);
    expect(h.go).toHaveBeenCalledWith("/session", { mode: "adventure", scope: "mix" });
    expect(screen.getByRole("button", { name: "Back to games" })).toBeInTheDocument();
  });
});
