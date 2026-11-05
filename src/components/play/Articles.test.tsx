// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand } from "@/content/types";
import { articleQuestion, articlesFor } from "@/content/articles";
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

import { ArticleLibrary, ArticleReader } from "./Articles";

const show = (ui: React.ReactElement, band: AgeBand = "middle") => render(<BandProvider value={band}>{ui}</BandProvider>);
const art = articlesFor("middle")[0];
const day = new Date().toISOString().slice(0, 10);
const q = (n: number) => articleQuestion(art, n, `p1:${day}`);

beforeEach(() => {
  h.go.mockClear();
  h.log.mockClear();
  h.speak.mockClear();
  h.autoRead = false;
});

describe("ArticleLibrary", () => {
  it("lists the child's age group's articles as links", () => {
    show(<ArticleLibrary />, "big");
    expect(screen.getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(articlesFor("big").map((a) => `#/articles/${a.id}`));
  });
});

describe("ArticleReader", () => {
  it("shows the paragraphs, reads on request and reads a tapped paragraph alone", () => {
    show(<ArticleReader id={art.id} />);
    for (const p of art.paragraphs) expect(screen.getByText(p)).toBeInTheDocument();
    expect(h.speak).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /Read to me/ }));
    expect(h.speak.mock.calls[0][0]).toHaveLength(art.paragraphs.length);
    fireEvent.click(screen.getByRole("button", { name: `Hear: ${art.paragraphs[1]}` }));
    expect(h.speak.mock.calls[1][0]).toEqual([{ text: art.paragraphs[1], lang: "en", pause: 350 }]);
  });

  it("reads as it opens when read-aloud is on", () => {
    h.autoRead = true;
    show(<ArticleReader id={art.id} />);
    expect(h.speak).toHaveBeenCalledTimes(1);
  });

  it("goes to the library for an unknown article", () => {
    show(<ArticleReader id="nope" />);
    expect(h.go).toHaveBeenCalledWith("/articles");
  });

  it("asks two questions, is soft on a miss, shows the working after two, and logs nothing", () => {
    show(<ArticleReader id={art.id} />);
    fireEvent.click(screen.getByRole("button", { name: /Quick questions/ }));
    const first = q(0);
    fireEvent.click(screen.getByRole("button", { name: first.choices[first.answer] }));
    expect(screen.getByText(new RegExp(first.why))).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Next question/ }));

    const second = q(1);
    const wrong = second.choices.map((c, i) => [c, i] as const).filter(([, i]) => i !== second.answer);
    fireEvent.click(screen.getByRole("button", { name: wrong[0][0] }));
    expect(screen.getByText(/Not quite/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: wrong[1][0] }));
    expect(screen.getByText(new RegExp(second.why))).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next article/ })).toBeInTheDocument();
    expect(h.log).not.toHaveBeenCalled();
  });
});
