// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AppEvent, Profile } from "@/lib/model";

vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));

import { useStore } from "@/lib/store";
import { RewardCard, TogetherCard } from "./FamilyCards";

const kid = (id: string, name: string): Profile => ({ id, name, avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1 });
const answers = (profileId: string, count: number): AppEvent[] =>
  Array.from({ length: count }, (_, i) => ({ id: `${profileId}${i}`, profileId, t: Date.now() - i, type: "answer", unit: "3/math/x", correct: true, attempts: 1, revealed: false, ms: 1000, mode: "practice" }) as AppEvent);

beforeEach(() => {
  useStore.setState({ profiles: [kid("a", "Ava")], activeId: "a", events: [], settings: {} });
});

describe("RewardCard", () => {
  it("shows nothing without a reward", () => {
    const { container } = render(<RewardCard />);
    expect(container).toBeEmptyDOMElement();
  });

  it("shows coins earned since it was set, and says the coins stay the child's", () => {
    useStore.setState({
      settings: { a: { profileId: "a", reward: { id: "r", name: "Movie night", coins: 100, startCoins: 0, setAt: 1 } } as never },
      events: answers("a", 3),
    });
    render(<RewardCard />);
    expect(screen.getByText("Movie night")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: /Movie night: \d+ of 100 coins/ })).toBeInTheDocument();
    expect(screen.getByText(/Your coins stay yours/)).toBeInTheDocument();
  });

  it("tells the child to show their grown-up once the coins are earned", () => {
    useStore.setState({
      settings: { a: { profileId: "a", reward: { id: "r", name: "Ice cream trip", coins: 1, startCoins: 0, setAt: 1 } } as never },
      events: answers("a", 2),
    });
    render(<RewardCard />);
    expect(screen.getByRole("heading", { name: /You did it!/ })).toBeInTheDocument();
    expect(screen.getByText(/Show your grown-up/)).toBeInTheDocument();
  });
});

describe("TogetherCard", () => {
  it("shows nothing for one child", () => {
    const { container } = render(<TogetherCard />);
    expect(container).toBeEmptyDOMElement();
  });

  it("adds up everyone's answers this week without naming anyone", () => {
    useStore.setState({ profiles: [kid("a", "Ava"), kid("b", "Ben")], events: [...answers("a", 3), ...answers("b", 2)] });
    render(<TogetherCard />);
    const section = screen.getByRole("region", { name: "Family goal" });
    expect(section).toHaveTextContent("5 of 120 questions answered by everyone in the family.");
    expect(section).not.toHaveTextContent("Ava");
    expect(section).not.toHaveTextContent("Ben");
  });
});
