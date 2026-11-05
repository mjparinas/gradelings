// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand } from "@/content/types";
import { RHYMES, rhymeQuiz } from "@/content/rhymes";
import { BandProvider } from "../band";

const h = vi.hoisted(() => ({ go: vi.fn(), log: vi.fn(), speak: vi.fn(), autoRead: false }));
vi.mock("@/lib/router", () => ({ go: h.go }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1", name: "Leo", grade: "1", framework: "ca-bc" }),
  useChildSettings: () => ({ autoRead: h.autoRead }),
  log: h.log,
}));
vi.mock("@/lib/sound", () => ({ sounds: { correct: vi.fn(), tryAgain: vi.fn(), tap: vi.fn() } }));
vi.mock("@/lib/juice", () => ({ celebrate: vi.fn() }));
vi.mock("@/lib/speech", () => ({ speakSegments: h.speak, stopSpeaking: vi.fn() }));
vi.mock("./Treasures", () => ({ TreasureBack: () => <button type="button">Back to treasures</button> }));

import { RhymeLibrary, RhymeReader } from "./Rhymes";

const show = (ui: React.ReactElement, band: AgeBand = "little") => render(<BandProvider value={band}>{ui}</BandProvider>);
const rhyme = RHYMES[0];
const quiz = () => rhymeQuiz(rhyme, `p1:${new Date().toISOString().slice(0, 10)}:0`);

beforeEach(() => {
  h.go.mockClear();
  h.log.mockClear();
  h.speak.mockClear();
  h.autoRead = false;
});

describe("RhymeLibrary", () => {
  it("lists every rhyme as a link to its reader", () => {
    show(<RhymeLibrary />);
    const links = screen.getAllByRole("link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual(RHYMES.map((r) => `#/rhymes/${r.id}`));
    expect(links[0]).toHaveTextContent(rhyme.title);
  });

  it("goes back to the treasure chest for little kids and home for others", () => {
    const little = show(<RhymeLibrary />);
    expect(screen.getByRole("button", { name: "Back to treasures" })).toBeInTheDocument();
    little.unmount();
    show(<RhymeLibrary />, "middle");
    expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
  });
});

describe("RhymeReader", () => {
  it("shows the rhyme, reads it on request and reads a tapped line alone", () => {
    show(<RhymeReader id={rhyme.id} />);
    for (const line of rhyme.lines) expect(screen.getByText(line)).toBeInTheDocument();
    expect(h.speak).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /Read to me/ }));
    expect(h.speak.mock.calls[0][0]).toHaveLength(8);
    fireEvent.click(screen.getByRole("button", { name: `Hear: ${rhyme.lines[2]}` }));
    expect(h.speak.mock.calls[1][0]).toEqual([{ text: rhyme.lines[2], lang: "en", pause: 200 }]);
  });

  it("reads the rhyme as it opens when read-aloud is on", () => {
    h.autoRead = true;
    show(<RhymeReader id={rhyme.id} />);
    expect(h.speak).toHaveBeenCalledTimes(1);
  });

  it("asks two rhyming questions, softly, and saves nothing", () => {
    show(<RhymeReader id={rhyme.id} />);
    fireEvent.click(screen.getByRole("button", { name: "Which words rhyme?" }));
    const qs = quiz();
    expect(screen.getByText(qs[0].prompt)).toBeInTheDocument();
    // A miss, then the right word.
    const wrong = qs[0].choices.findIndex((_, i) => i !== qs[0].answer);
    fireEvent.click(screen.getByRole("button", { name: qs[0].choices[wrong] }));
    expect(screen.getByText(/Not quite/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: qs[0].choices[qs[0].answer] }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    // The second: a number key picks the right choice.
    expect(screen.getByText(qs[1].prompt)).toBeInTheDocument();
    act(() => {
      fireEvent.keyDown(window, { key: String(qs[1].answer + 1) });
    });
    fireEvent.click(screen.getByRole("button", { name: "Finish" }));
    expect(screen.getByText("Great rhyming!")).toBeInTheDocument();
    expect(screen.getByText(/found 1 on the first try/)).toBeInTheDocument();
    expect(screen.getByText(/don't count toward your practice/)).toBeInTheDocument();
    expect(h.log).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /Next rhyme/ }));
    expect(h.go).toHaveBeenCalledWith(`/rhymes/${RHYMES[1].id}`);
  });

  it("shows the answer after two misses", () => {
    show(<RhymeReader id={rhyme.id} />);
    fireEvent.click(screen.getByRole("button", { name: "Which words rhyme?" }));
    const q = quiz()[0];
    const wrongs = q.choices.map((_, i) => i).filter((i) => i !== q.answer);
    fireEvent.click(screen.getByRole("button", { name: q.choices[wrongs[0]] }));
    fireEvent.click(screen.getByRole("button", { name: q.choices[wrongs[1]] }));
    expect(screen.getByText(q.why)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: q.choices[q.answer] })).toHaveAttribute("data-state", "right");
  });

  it("sends an unknown rhyme back to the list", () => {
    show(<RhymeReader id="nope" />);
    expect(h.go).toHaveBeenCalledWith("/rhymes");
  });
});
