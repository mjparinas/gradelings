// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { Question } from "@/content/types";
import type { AgeBand } from "@/content/types";
import type { SpeechEvents, SpeechPiece } from "@/lib/speech";
import { BandProvider } from "../band";

const h = vi.hoisted(() => ({
  go: vi.fn(),
  log: vi.fn(),
  speakSegments: vi.fn(),
  speakQuestion: vi.fn(),
  celebrate: vi.fn(),
  off: new Set<string>(),
  settings: { autoRead: false, enabledSubjects: ["math", "language"] } as Record<string, unknown>,
  profile: { id: "p1", name: "Ava", grade: "2", framework: "ca-bc" },
  derived: { xp: 0, coins: 0, reading: [], stories: {} } as Record<string, unknown>,
  family: { plan: "premium", trialEndsAt: 0, updatedAt: 0 } as Record<string, unknown>,
}));

vi.mock("@/lib/router", () => ({ go: h.go }));
vi.mock("@/lib/remoteFlags", () => ({ useIsOn: () => (key: string) => !h.off.has(key) }));
vi.mock("@/lib/speech", () => ({ speakSegments: h.speakSegments, stopSpeaking: vi.fn(), speak: vi.fn() }));
vi.mock("@/lib/readaloud", () => ({ speakQuestion: h.speakQuestion }));
vi.mock("@/lib/juice", () => ({ celebrate: h.celebrate }));
vi.mock("@/lib/sound", () => ({ sounds: new Proxy({}, { get: () => () => {} }) }));
vi.mock("@/lib/offline", () => ({ cacheLoadedScripts: vi.fn() }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => h.profile,
  useChildSettings: () => h.settings,
  useDerived: () => h.derived,
  useStore: (select: (s: unknown) => unknown) => select({ family: h.family, log: h.log }),
}));
vi.mock("./Companion", () => ({ Companion: () => <span>buddy</span> }));
vi.mock("./MembershipLock", () => ({ MembershipLock: ({ open }: { open: boolean }) => (open ? <p role="dialog">Ask a grown-up</p> : null) }));
vi.mock("./Session", () => ({
  QuestionBody: ({ q, onAttempt }: { q: Question; onAttempt: (ok: boolean) => void }) => (
    <div>
      {q.kind === "choice" &&
        q.choices.map((c) => (
          <button key={c.id} type="button" onClick={() => onAttempt(c.id === q.answer)}>
            {c.label}
          </button>
        ))}
    </div>
  ),
}));

import { loadStories } from "@/content/stories";
import { StoryLibrary, StoryReader } from "./Stories";

const inBand = (ui: React.ReactElement, band: AgeBand = "middle") => render(<BandProvider value={band}>{ui}</BandProvider>);

// The library is a dynamic import. Load it once up front, so the first test doesn't spend its
// 1-second wait on that cold import: on a busy CI machine it sometimes didn't fit (October 2026).
beforeAll(() => loadStories(), 30_000);

beforeEach(() => {
  vi.clearAllMocks();
  h.off = new Set();
  h.settings = { autoRead: false, enabledSubjects: ["math", "language"] };
  h.profile = { id: "p1", name: "Ava", grade: "2", framework: "ca-bc" };
  h.derived = { xp: 0, coins: 0, reading: [], stories: {} };
  h.family = { plan: "premium", trialEndsAt: 0, updatedAt: 0 };
});

const shelf = (name: string) => screen.getByRole("region", { name });
const titles = (name: string) => within(shelf(name)).getAllByRole("button").map((b) => b.getAttribute("data-story"));

describe("StoryLibrary", () => {
  it("puts the stories for the child's grade on the just-right shelf", async () => {
    inBand(<StoryLibrary />);
    expect(await screen.findByRole("heading", { name: /Story Library/ })).toBeInTheDocument();
    expect(titles("Just right for you")).toEqual(expect.arrayContaining(["wiggly-tooth", "garden-race"]));
    expect(titles("A little easier")).toContain("ollie-splash");
    expect(titles("A bit of a stretch")).toContain("waggle-dance");
  });

  it("moves the shelves with the child's reading level once it is known", async () => {
    h.derived = { ...h.derived, reading: Array.from({ length: 40 }, () => ({ rl: 6, ok: true })) };
    inBand(<StoryLibrary />);
    await screen.findByRole("heading", { name: /Story Library/ });
    expect(titles("Just right for you")).not.toContain("wiggly-tooth");
    expect(titles("A little easier")).toContain("wiggly-tooth");
  });

  it("marks stories already read, with a star when every question was right", async () => {
    h.derived = { ...h.derived, stories: { "wiggly-tooth": { reads: 1, best: 3, questions: 3, lastT: 0 }, "garden-race": { reads: 1, best: 1, questions: 3, lastT: 0 } } };
    inBand(<StoryLibrary />);
    await screen.findByRole("heading", { name: /Story Library/ });
    expect(screen.getByLabelText("Read, every question right")).toBeInTheDocument();
    expect(screen.getByLabelText("Read")).toBeInTheDocument();
  });

  it("opens a story, and on the free plan keeps all but the first stories of each tier for members", async () => {
    h.family = { plan: "free", trialEndsAt: 0, updatedAt: 0 };
    inBand(<StoryLibrary />);
    await screen.findByRole("heading", { name: /Story Library/ });
    fireEvent.click(screen.getByText("Amara's Wiggly Tooth"));
    expect(h.go).toHaveBeenCalledWith("/stories/wiggly-tooth");
    // Mateo's Tiny Seeds is the third Grades 2 and 3 story.
    const locked = screen.getByText("Mateo's Tiny Seeds").closest("button")!;
    expect(within(locked).getByText("🔒")).toBeInTheDocument();
    fireEvent.click(locked);
    expect(screen.getByRole("dialog")).toHaveTextContent("Ask a grown-up");
    expect(h.go).not.toHaveBeenCalledWith("/stories/tiny-seeds");
  });

  it("goes back to the Lessons screen for little kids and home for everyone else", async () => {
    const first = inBand(<StoryLibrary />, "little");
    fireEvent.click(await screen.findByRole("button", { name: "Back" }));
    expect(h.go).toHaveBeenLastCalledWith("/practice");
    expect(screen.getByRole("heading", { name: /Stories/ })).toBeInTheDocument();
    first.unmount();
    inBand(<StoryLibrary />);
    fireEvent.click(await screen.findByRole("button", { name: "Back" }));
    expect(h.go).toHaveBeenLastCalledWith("/");
  });
});

describe("StoryReader", () => {
  const lastRead = () => h.speakSegments.mock.calls.at(-1) as [SpeechPiece[], SpeechEvents];

  it("reads each page aloud with the sentence being read lit up, when read-aloud is on", async () => {
    h.settings = { ...h.settings, autoRead: true };
    inBand(<StoryReader id="ollie-splash" />, "little");
    await screen.findByTestId("story-text");
    // The page is read from an effect, which a busy machine can run after the text first shows.
    await waitFor(() => expect(h.speakSegments).toHaveBeenCalled());
    const [pieces, events] = lastRead();
    expect(pieces.map((p) => p.text)).toEqual(["Ollie is an otter.", "Ollie likes to swim."]);
    act(() => events.onStart!(1));
    expect(screen.getByText("Ollie likes to swim.")).toHaveAttribute("data-lit", "true");
    act(() => events.onDone!());
    expect(screen.getByText("Ollie likes to swim.")).not.toHaveAttribute("data-lit");
    fireEvent.click(screen.getByRole("button", { name: /Next page/ }));
    expect(lastRead()[0][0].text).toBe("The pond is still.");
  });

  it("stays quiet until asked when read-aloud is off, and reads one sentence when it is tapped", async () => {
    inBand(<StoryReader id="ollie-splash" />);
    await screen.findByTestId("story-text");
    expect(h.speakSegments).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText("Ollie likes to swim."));
    expect(lastRead()[0].map((p) => p.text)).toEqual(["Ollie likes to swim."]);
    fireEvent.click(screen.getByRole("button", { name: "Read this page to me" }));
    expect(lastRead()[0]).toHaveLength(2);
    fireEvent.click(screen.getByRole("button", { name: /Read to me/ }));
    expect(screen.getByRole("button", { name: /Read to me/ })).toHaveAttribute("aria-pressed", "true");
  });

  it("asks the questions after the last page and logs the story with first-try results", async () => {
    h.derived = { ...h.derived, xp: 100, coins: 10 };
    inBand(<StoryReader id="ollie-splash" />);
    await screen.findByTestId("story-text");
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    for (let i = 0; i < 5; i++) fireEvent.click(screen.getByRole("button", { name: /Next page/ }));
    fireEvent.click(screen.getByRole("button", { name: /The end/ }));
    expect(screen.getByRole("heading", { name: /The end/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));

    // First question: a miss, then the hint quotes the page, then the right answer.
    expect(screen.getByRole("heading", { name: "Who is Ollie?" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "A duck" }));
    expect(screen.getByRole("status")).toHaveTextContent("Page 1 says: Ollie is an otter. Ollie likes to swim.");
    fireEvent.click(screen.getByRole("button", { name: "An otter" }));
    expect(screen.getByText("You found it! ✓")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Next question/ }));

    // Second question: right first time.
    fireEvent.click(screen.getByRole("button", { name: "A big splash" }));
    expect(screen.getByText("Yes! You remembered! ⭐")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Finish/ }));

    expect(h.log).toHaveBeenCalledWith([expect.objectContaining({ type: "story", story: "ollie-splash", rl: 0, results: [false, true], pages: 6 })]);
    expect(screen.getByText("1 of 2 questions right the first time.")).toBeInTheDocument();
    expect(h.celebrate).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /Read another/ }));
    expect(h.go).toHaveBeenCalledWith("/stories");
  });

  it("shows the answer after a second miss and counts it as missed", async () => {
    inBand(<StoryReader id="hoot-stars" />);
    await screen.findByTestId("story-text");
    for (let i = 0; i < 6; i++) fireEvent.click(screen.getByRole("button", { name: /Next page|The end/ }));
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    fireEvent.click(screen.getByRole("button", { name: "At lunch" }));
    fireEvent.click(screen.getByRole("button", { name: "In the morning" }));
    expect(screen.getByRole("status")).toHaveTextContent("Here's the answer.");
    fireEvent.click(screen.getByRole("button", { name: /Next question/ }));
    fireEvent.click(screen.getByRole("button", { name: "Stars" }));
    fireEvent.click(screen.getByRole("button", { name: /Finish/ }));
    expect(h.log).toHaveBeenCalledWith([expect.objectContaining({ results: [false, true] })]);
  });

  it("shows a US child the story in US spelling", async () => {
    h.profile = { ...h.profile, framework: "us-wa" };
    inBand(<StoryReader id="ruby-hat" />);
    await screen.findByTestId("story-text");
    for (let i = 0; i < 6; i++) fireEvent.click(screen.getByRole("button", { name: /Next page|The end/ }));
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    expect(screen.getByRole("heading", { name: "What color is Ruby's hat?" })).toBeInTheDocument();
  });

  it("sends a story the plan doesn't open, or one that doesn't exist, back to the shelves", async () => {
    h.family = { plan: "free", trialEndsAt: 0, updatedAt: 0 };
    const first = inBand(<StoryReader id="tiny-seeds" />);
    expect(await screen.findByRole("heading", { name: /Story Library/ })).toBeInTheDocument();
    first.unmount();
    inBand(<StoryReader id="no-such-story" />);
    expect(await screen.findByRole("heading", { name: /Story Library/ })).toBeInTheDocument();
  });
});
