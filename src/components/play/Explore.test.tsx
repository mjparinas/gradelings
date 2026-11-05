// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand } from "@/content/types";
import { exploreCards, exploreQuestion } from "@/content/explore";
import { BandProvider } from "../band";

const h = vi.hoisted(() => ({ go: vi.fn(), log: vi.fn(), speak: vi.fn(), autoRead: false }));
vi.mock("@/lib/router", () => ({ go: h.go }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1", name: "Leo", grade: "3", framework: "ca-bc" }),
  useChildSettings: () => ({ autoRead: h.autoRead }),
  log: h.log,
}));
vi.mock("@/lib/sound", () => ({ sounds: { correct: vi.fn(), tryAgain: vi.fn(), tap: vi.fn() } }));
vi.mock("@/lib/juice", () => ({ celebrate: vi.fn() }));
vi.mock("@/lib/speech", () => ({ speakSegments: h.speak, stopSpeaking: vi.fn() }));
vi.mock("./Treasures", () => ({ TreasureBack: () => <button type="button">Back to treasures</button> }));

import { ExploreLibrary, ExploreReader } from "./Explore";

const show = (ui: React.ReactElement, band: AgeBand = "middle") => render(<BandProvider value={band}>{ui}</BandProvider>);
const card = exploreCards("middle")[0];
const q = () => exploreQuestion(card, `p1:${new Date().toISOString().slice(0, 10)}:0`);

beforeEach(() => {
  h.go.mockClear();
  h.log.mockClear();
  h.speak.mockClear();
  h.autoRead = false;
});

describe("ExploreLibrary", () => {
  it("lists the child's own age group's cards as links", () => {
    show(<ExploreLibrary />, "big");
    expect(screen.getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(exploreCards("big").map((c) => `#/explore/${c.id}`));
  });

  it("goes back to the treasure chest for little kids and home for others", () => {
    const little = show(<ExploreLibrary />, "little");
    expect(screen.getByRole("button", { name: "Back to treasures" })).toBeInTheDocument();
    little.unmount();
    show(<ExploreLibrary />);
    expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
  });
});

describe("ExploreReader", () => {
  it("shows the facts, reads them on request and reads a tapped fact alone", () => {
    show(<ExploreReader id={card.id} />);
    for (const f of card.facts) expect(screen.getByText(f)).toBeInTheDocument();
    expect(h.speak).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /Read to me/ }));
    expect(h.speak.mock.calls[0][0]).toHaveLength(3);
    fireEvent.click(screen.getByRole("button", { name: `Hear: ${card.facts[1]}` }));
    expect(h.speak.mock.calls[1][0]).toEqual([{ text: card.facts[1], lang: "en", pause: 250 }]);
  });

  it("reads the card as it opens when read-aloud is on", () => {
    h.autoRead = true;
    show(<ExploreReader id={card.id} />);
    expect(h.speak).toHaveBeenCalledTimes(1);
  });

  it("asks one soft question, saves nothing and goes to the next card", () => {
    show(<ExploreReader id={card.id} />);
    fireEvent.click(screen.getByRole("button", { name: "Quick question" }));
    const question = q();
    expect(screen.getByText(question.prompt)).toBeInTheDocument();
    const wrong = question.choices.findIndex((_, i) => i !== question.answer);
    fireEvent.click(screen.getByRole("button", { name: question.choices[wrong] }));
    expect(screen.getByText(/Not quite/)).toBeInTheDocument();
    act(() => {
      fireEvent.keyDown(window, { key: String(question.answer + 1) });
    });
    expect(screen.getByText(new RegExp(`You got it! ${question.why.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`))).toBeInTheDocument();
    expect(screen.getByText(/don't count toward your practice/)).toBeInTheDocument();
    expect(h.log).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /Next card/ }));
    expect(h.go).toHaveBeenCalledWith(`/explore/${exploreCards("middle")[1].id}`);
  });

  it("shows the answer after two misses", () => {
    show(<ExploreReader id={card.id} />);
    fireEvent.click(screen.getByRole("button", { name: "Quick question" }));
    const question = q();
    const wrongs = question.choices.map((_, i) => i).filter((i) => i !== question.answer);
    fireEvent.click(screen.getByRole("button", { name: question.choices[wrongs[0]] }));
    fireEvent.click(screen.getByRole("button", { name: question.choices[wrongs[1]] }));
    expect(screen.getByText(question.why)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: question.choices[question.answer] })).toHaveAttribute("data-state", "right");
  });

  it("sends an unknown card back to the list", () => {
    show(<ExploreReader id="nope" />);
    expect(h.go).toHaveBeenCalledWith("/explore");
  });
});
