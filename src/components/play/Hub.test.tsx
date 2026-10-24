// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { allUnitRefs, loadGrade, type UnitRef } from "@/content";
import type { AgeBand } from "@/content/types";
import { derive, type DayStat, type Derived, type UnitStat } from "@/lib/derive";
import { dayKey, type FamilyInfo } from "@/lib/model";
import { dailyQuests } from "@/lib/quests";
import { BandProvider } from "../band";

// Monday 12 October 2026, 9 a.m. local time.
const NOW = new Date(2026, 9, 12, 9, 0).getTime();
const TODAY = dayKey(NOW);
const DAY = 86_400_000;

const h = vi.hoisted(() => ({
  derived: undefined as unknown,
  family: {} as object,
  settings: {} as Record<string, unknown>,
  off: new Set<string>(),
  classwork: [] as unknown[],
  events: [] as unknown[],
  live: null as unknown,
  signOutStudent: vi.fn(),
  speak: vi.fn(),
  now: 0,
}));

vi.mock("@/lib/router", () => ({ go: vi.fn() }));
vi.mock("@/lib/useNow", () => ({ useNow: () => h.now }));
vi.mock("@/lib/remoteFlags", () => ({ useIsOn: () => (key: string) => !h.off.has(key) }));
vi.mock("@/lib/account", () => ({ signOutStudent: h.signOutStudent }));
vi.mock("@/lib/store", () => ({
  useStore: (select: (s: unknown) => unknown) => select({ family: h.family, log: vi.fn(), events: h.events, classwork: [] }),
  eventsFor: (events: { profileId: string }[], p: { id: string }) => events.filter((e) => e.profileId === p.id),
  useActiveProfile: () => ({ id: "p1", name: "Ava", grade: "2", framework: "ca-bc", companion: "ollie" }),
  useChildSettings: () => h.settings,
  useDerived: () => h.derived,
}));
vi.mock("./FamilyCards", () => ({ RewardCard: () => <div data-testid="reward-card" />, TogetherCard: () => <div data-testid="together-card" /> }));
vi.mock("./useClasswork", () => ({ useClasswork: () => h.classwork }));
vi.mock("./LiveQuestion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./LiveQuestion")>();
  return { ...actual, useLiveQuestion: () => ({ live: h.live, offline: false, note: "", answer: vi.fn() }) };
});
vi.mock("../Critter", () => ({
  Critter: () => null,
  getCritter: (id: string) => ({ id, name: { hoot: "Hoot", ruby: "Ruby", bolt: "Bolt", juniper: "Juniper" }[id] ?? id }),
  SpeechBubble: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("./Companion", () => ({ Companion: () => null }));
vi.mock("@/lib/speech", () => ({ speak: h.speak, stopSpeaking: () => {} }));
vi.mock("./Hud", () => ({ Hud: () => null }));
vi.mock("./InstallChip", () => ({ InstallChip: () => null }));
vi.mock("./Secrets", () => ({ BuddyButton: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, MooseVisitor: () => null }));

import { Hub } from "./Hub";

const premium: FamilyInfo = { plan: "premium", trialEndsAt: 0, updatedAt: 0 };
const free: FamilyInfo = { plan: "free", trialEndsAt: 0, updatedAt: 0 };
let refs: UnitRef[];
const mathRefs = () => refs.filter((r) => r.course.subject === "math");

const stat = (key: string, attempts: number, right: number, lastT = NOW - DAY): UnitStat => ({
  key,
  attempts,
  firstTry: right,
  recent: Array.from({ length: attempts }, (_, i) => i < right).slice(-20),
  mastery: right / Math.max(1, attempts),
  lastT,
  sessions: 1,
  challengePassed: false,
  ms: 0,
  wasEmerging: false,
  grew: false,
  returnLeft: 0,
  kept: false,
});
const day = (over: Partial<DayStat>): DayStat => ({
  day: TODAY,
  learnSeconds: 0,
  answers: 0,
  correct: 0,
  sessions: 0,
  perfect: 0,
  playSeconds: 0,
  bestRun: 0,
  stories: 0,
  subjects: {},
  modes: {},
  ...over,
});
const set = (over: Partial<Derived>) => {
  const base = derive([], NOW);
  h.derived = { ...base, ...over, totals: { ...base.totals, ...over.totals }, streak: { ...base.streak, ...over.streak } };
};
const show = (band: AgeBand = "middle") =>
  render(
    <BandProvider value={band}>
      <Hub />
    </BandProvider>,
  );
const tile = (title: string) => screen.getByText(title, { selector: "span.block" }).closest("button")!;
/** The companion's speech bubble. */
const message = () => document.querySelector("p.leading-snug")!;

beforeAll(async () => {
  await loadGrade("2", "ca-bc");
  refs = allUnitRefs("2", "ca-bc");
});

beforeEach(() => {
  h.now = NOW;
  h.family = premium;
  h.settings = { enabledSubjects: ["math", "language", "science", "social"], dailyGoalMinutes: 15 };
  h.off = new Set();
  h.classwork = [];
  h.signOutStudent.mockClear();
  h.speak.mockClear();
  set({});
  window.location.hash = "";
});

describe("Hub greeting", () => {
  it("welcomes a brand-new child by name and points at the big button", () => {
    show();
    expect(screen.getByText("Good morning, Ava! Tap the big button to start your first adventure!")).toBeInTheDocument();
  });

  it("says how many minutes are left in today's goal", () => {
    set({ totals: { answers: 12 } as Derived["totals"], streak: { current: 1, activeToday: true } as Derived["streak"], days: { [TODAY]: day({ learnSeconds: 6 * 60 }) } });
    show();
    expect(message()).toHaveTextContent("Good morning, Ava! 9 more minutes to reach today's goal.");
    expect(screen.getByRole("progressbar", { name: "Minutes learned today" })).toHaveAttribute("aria-valuenow", "6");
    expect(screen.getByRole("button", { name: /Today's goal is 15 minutes. Change it$/ })).toBeInTheDocument();
  });

  it("cheers once today's goal is reached", () => {
    set({ totals: { answers: 40 } as Derived["totals"], days: { [TODAY]: day({ learnSeconds: 16 * 60 }) } });
    show();
    expect(message()).toHaveTextContent("You hit today's goal! 16 minutes of learning. Amazing!");
  });

  it("welcomes a returning child warmly, never mentioning a lost streak", () => {
    set({ totals: { answers: 40 } as Derived["totals"], activeDays: 3, streak: { current: 0, activeToday: false } as Derived["streak"] });
    show();
    expect(message()).toHaveTextContent("*Yawn* You're back, Ava! You've practised 3 days so far. Let's start a new streak! 🔥");
  });

  it("uses the singular for a single day practised", () => {
    set({ totals: { answers: 4 } as Derived["totals"], activeDays: 1, streak: { current: 0, activeToday: false } as Derived["streak"] });
    show();
    expect(message()).toHaveTextContent("You've practised 1 day so far.");
  });

  it("invites the child to continue a streak, and mentions a rest-day shield when one saved it", () => {
    set({ totals: { answers: 40 } as Derived["totals"], activeDays: 9, streak: { current: 4, activeToday: false, saved: false } as Derived["streak"] });
    const { unmount } = show();
    expect(message()).toHaveTextContent("Day 5 of your streak is waiting for you! 🔥");
    unmount();
    set({ totals: { answers: 40 } as Derived["totals"], activeDays: 9, streak: { current: 4, activeToday: false, saved: true } as Derived["streak"] });
    show();
    expect(message()).toHaveTextContent("A rest-day shield kept your 4-day streak safe. 🛡️ Play today to keep it going!");
  });

  it("says good evening after 5 p.m.", () => {
    h.now = new Date(2026, 9, 12, 19, 0).getTime();
    show();
    expect(screen.getByText(/^Good evening, Ava!/)).toBeInTheDocument();
  });
});

describe("Hub tiles", () => {
  it("Adventure opens straight away on a membership", () => {
    show();
    fireEvent.click(screen.getByRole("button", { name: /Adventure/ }));
    expect(window.location.hash).toBe("#/session?mode=adventure&scope=mix");
  });

  it("on the free plan, Adventure and the premium tiles ask for a grown-up", () => {
    h.family = free;
    show();
    expect(within(tile("Speed Run")).getByText("🔒")).toBeInTheDocument();
    expect(within(tile("Practice")).queryByText("🔒")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Adventure/ }));
    expect(window.location.hash).toBe("");
    expect(screen.getByRole("dialog", { name: "Ask a grown-up" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "OK" }));
    fireEvent.click(tile("Practice"));
    expect(window.location.hash).toBe("#/practice");
  });

  it("little kids get Let's Play and three picture tiles: Lessons, Games and Treasures", () => {
    show("little");
    expect(screen.getByRole("button", { name: /Let's Play!/ })).toBeInTheDocument();
    const tiles = screen.getAllByRole("button").filter((b) => b.querySelector("span.block") && !/Let.s Play/.test(b.textContent ?? ""));
    expect(tiles.map((b) => b.textContent)).toEqual(["📚Lessons", "🕹️Games", "💎Treasures"]);
    // No small print under the tiles, and the collections and extra modes live elsewhere.
    expect(screen.queryByText("Pick a subject and topic")).not.toBeInTheDocument();
    for (const gone of ["Speed Run", "Review", "Daily Challenge", "Trail Map", "Sticker Book", "Trophies", "My Room", "Shop"]) {
      expect(screen.queryByText(gone)).not.toBeInTheDocument();
    }
    fireEvent.click(tile("Treasures"));
    expect(window.location.hash).toBe("#/treasures");
  });

  it("has a Math Facts tile from Grade 2, with how many facts are known once some are", () => {
    show();
    expect(tile("Math Facts")).toHaveTextContent("Adding and taking away");
    fireEvent.click(tile("Math Facts"));
    expect(window.location.hash).toBe("#/facts");
    cleanup();
    set({ facts: { "add:3:4": { attempts: 2, recent: [true, true], lastT: NOW } } });
    show();
    expect(tile("Math Facts")).toHaveTextContent("1 of 100 addition facts to 20");
  });

  it("leaves Math Facts off the home screen when math or the flag is off, and locks it on the free plan", () => {
    h.settings = { ...h.settings, enabledSubjects: ["language"] };
    const first = show();
    expect(screen.queryByText("Math Facts")).not.toBeInTheDocument();
    first.unmount();
    h.settings = { ...h.settings, enabledSubjects: ["math"] };
    h.off = new Set(["math-facts"]);
    const second = show();
    expect(screen.queryByText("Math Facts")).not.toBeInTheDocument();
    second.unmount();
    h.off = new Set();
    h.family = free;
    show();
    expect(within(tile("Math Facts")).getByText("🔒")).toBeInTheDocument();
  });

  it("little kids' Games tile still asks for a grown-up on the free plan", () => {
    h.family = free;
    show("little");
    expect(within(tile("Games")).getByText("🔒")).toBeInTheDocument();
    expect(within(tile("Lessons")).queryByText("🔒")).not.toBeInTheDocument();
  });

  it("opens the Story Library from its own tile, which stays free and goes with language arts", () => {
    h.family = free;
    const { unmount } = show();
    expect(within(tile("Stories")).queryByText("🔒")).not.toBeInTheDocument();
    fireEvent.click(tile("Stories"));
    expect(window.location.hash).toBe("#/stories");
    unmount();
    h.settings = { ...h.settings, enabledSubjects: ["math", "science", "social"] };
    const second = show();
    expect(screen.queryByText("Stories")).not.toBeInTheDocument();
    second.unmount();
    h.settings = { ...h.settings, enabledSubjects: ["math", "language"] };
    h.off = new Set(["story-library"]);
    show();
    expect(screen.queryByText("Stories")).not.toBeInTheDocument();
  });

  it("hides the tiles the admin switched off", () => {
    h.off = new Set(["arcade", "shop", "daily-challenge"]);
    show();
    expect(screen.queryByText("Arcade")).not.toBeInTheDocument();
    expect(screen.queryByText("Shop")).not.toBeInTheDocument();
    expect(screen.queryByText("Daily Challenge")).not.toBeInTheDocument();
    expect(tile("Trophies")).toBeInTheDocument();
  });

  it("shows today's Daily Challenge as done, plus trophy and coin counts", () => {
    set({ dailyDone: [TODAY], trophies: { "first-steps": NOW, "streak-3": NOW }, trophyPoints: 45, coins: 230 });
    show();
    expect(tile("Daily Challenge")).toHaveTextContent("Done today! ✓");
    expect(tile("Trophies")).toHaveTextContent("2 earned · 45 pts");
    expect(tile("Shop")).toHaveTextContent("🪙 230 to spend");
  });

  it("the arcade tile says how to earn game time, or that games are off", () => {
    set({ days: { [TODAY]: day({ learnSeconds: 5 * 60 }) } });
    const { unmount } = show();
    expect(tile("Arcade")).toHaveTextContent("Learn 15 more min");
    unmount();
    set({ days: { [TODAY]: day({ learnSeconds: 20 * 60 }) } });
    const second = show();
    expect(tile("Arcade")).toHaveTextContent("5 min ready!");
    second.unmount();
    h.settings = { ...h.settings, gamesEnabled: false };
    show();
    expect(tile("Arcade")).toHaveTextContent("Turned off");
  });

  it("counts the tricky spots waiting in Review", () => {
    const [a, b] = mathRefs();
    set({ units: { [a.key]: stat(a.key, 10, 2), [b.key]: stat(b.key, 10, 3) }, totals: { answers: 20 } as Derived["totals"] });
    show();
    expect(tile("Review")).toHaveTextContent(/\d+ tricky spots? to practise/);
  });

  it("lists today's quests and this week's goals", () => {
    show();
    expect(screen.getByRole("heading", { name: /Today's quests/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /This week/ })).toBeInTheDocument();
    const lists = screen.getAllByRole("list");
    expect(within(lists[0]).getAllByRole("listitem")).toHaveLength(3);
    expect(within(lists[1]).getAllByRole("listitem")).toHaveLength(2);
  });
});

describe("Hub for little kids", () => {
  it("says one short line instead of a paragraph", () => {
    const { unmount } = show("little");
    expect(message()).toHaveTextContent(/^Good morning, Ava! Let's play!$/);
    unmount();
    set({ totals: { answers: 40 } as Derived["totals"], days: { [TODAY]: day({ learnSeconds: 11 * 60 }) } });
    h.settings = { ...h.settings, dailyGoalMinutes: 10 };
    show("little");
    expect(message()).toHaveTextContent(/^You did it, Ava! 🎉$/);
  });

  it("reads their line aloud when read-aloud is on, and anyone can tap 🔊 to hear the line", () => {
    h.settings = { ...h.settings, autoRead: true };
    const { unmount } = show("little");
    expect(h.speak).toHaveBeenCalledWith("Good morning, Ava! Let's play!");
    unmount();
    h.speak.mockClear();
    show("middle");
    expect(h.speak).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Read it to me" }));
    expect(h.speak).toHaveBeenCalledWith("Good morning, Ava! Tap the big button to start your first adventure!");
  });

  it("shows one quest at a time with dots, and no weekly goals", () => {
    const quests = dailyQuests("p1", TODAY, "little");
    set({ questsClaimed: { [TODAY]: [quests[0].id] } });
    show("little");
    expect(screen.queryByRole("heading", { name: /Today's quests/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /This week/ })).not.toBeInTheDocument();
    const quest = screen.getByRole("region", { name: "Today's quest" });
    expect(quest).toHaveTextContent(quests[1].title);
    expect(quest).not.toHaveTextContent(quests[0].title);
    const bar = within(quest).getByRole("progressbar", { name: quests[1].title });
    expect(bar).toHaveAttribute("aria-valuemax", String(quests[1].target));
  });

  it("cheers when every quest is done today", () => {
    set({ questsClaimed: { [TODAY]: dailyQuests("p1", TODAY, "little").map((q) => q.id) } });
    show("little");
    expect(screen.getByRole("region", { name: "Today's quest" })).toHaveTextContent("All quests done today!");
  });

  it("shows at most one suggestion card, Almost there first", () => {
    const [near, strong] = mathRefs();
    set({
      units: { [near.key]: stat(near.key, 6, 5), [strong.key]: stat(strong.key, 20, 19, NOW - 30 * DAY) },
      totals: { answers: 26 } as Derived["totals"],
    });
    const { unmount } = show("little");
    expect(screen.getByTestId("next-up")).toBeInTheDocument();
    expect(screen.queryByTestId("refresher")).not.toBeInTheDocument();
    expect(screen.queryByText(/Try this lesson/)).not.toBeInTheDocument();
    unmount();
    // Older kids still get every card.
    show();
    expect(screen.getByTestId("next-up")).toBeInTheDocument();
    expect(screen.getByTestId("refresher")).toBeInTheDocument();
  });
});

describe("Hub cards", () => {
  it("shows the unit closest to its next level", () => {
    const unit = mathRefs()[0];
    set({ units: { [unit.key]: stat(unit.key, 6, 5) }, totals: { answers: 6 } as Derived["totals"] });
    show();
    const card = screen.getByTestId("next-up");
    expect(card).toHaveTextContent(`Almost there · ${unit.unit.title}`);
    expect(card).toHaveTextContent(/right answers? to grow into 🌳 Tree/);
    expect(card).toHaveAttribute("href", `#/session?mode=practice&scope=${encodeURIComponent(unit.key)}`);
  });

  it("offers a quick refresher on a strong unit left alone for a few weeks", () => {
    const unit = mathRefs()[1];
    set({ units: { [unit.key]: stat(unit.key, 20, 19, NOW - 30 * DAY) }, totals: { answers: 20 } as Derived["totals"] });
    show();
    expect(screen.getByTestId("refresher")).toHaveTextContent(`Hoot remembers you were great at ${unit.unit.title}.`);
  });

  it("lists the teacher's assignments with a soft due date", () => {
    const [a, b] = mathRefs();
    h.classwork = [
      { ref: a, className: "Room 4", dueAt: NOW + 3 * DAY },
      { ref: b, className: "Room 4", dueAt: NOW - DAY },
    ];
    show();
    const section = screen.getByRole("region", { name: "From your teacher" });
    expect(section).toHaveTextContent("Room 4");
    const [first, second] = within(section).getAllByRole("link");
    expect(first).toHaveTextContent(a.unit.title);
    expect(first).toHaveTextContent("Try to finish by Thu, Oct 15");
    // A past date is simply not shown: never a warning.
    expect(second).not.toHaveTextContent("Try to finish by");
  });

  it("shows the unit a grown-up picked, with the days to go, and nothing when it has passed", () => {
    const [a] = mathRefs();
    h.settings = { ...h.settings, focus: { unit: a.key, until: dayKey(NOW + 3 * DAY), setAt: NOW } };
    show();
    const section = screen.getByRole("region", { name: "From your grown-up" });
    expect(section).toHaveTextContent(a.unit.title);
    expect(section).toHaveTextContent("3 days to go");
    expect(within(section).getByRole("link")).toHaveAttribute("href", `#/session?mode=practice&scope=${encodeURIComponent(a.key)}`);
    cleanup();
    h.settings = { ...h.settings, focus: { unit: a.key, until: dayKey(NOW - DAY), setAt: NOW - 5 * DAY } };
    show();
    expect(screen.queryByRole("region", { name: "From your grown-up" })).not.toBeInTheDocument();
  });

  it("shows the family cards on the home screen of older children only", () => {
    show();
    expect(screen.getByTestId("reward-card")).toBeInTheDocument();
    expect(screen.getByTestId("together-card")).toBeInTheDocument();
    cleanup();
    show("little");
    expect(screen.queryByTestId("reward-card")).not.toBeInTheDocument();
    expect(screen.queryByTestId("together-card")).not.toBeInTheDocument();
  });

  it("keeps a little child's home screen calm: a focus unit adds no card", () => {
    const [a] = mathRefs();
    h.settings = { ...h.settings, focus: { unit: a.key, setAt: NOW } };
    show("little");
    expect(screen.queryByRole("region", { name: "From your grown-up" })).not.toBeInTheDocument();
  });

  it("counts homework questions done since it was assigned, on the device", () => {
    const [a, b] = mathRefs();
    h.classwork = [
      { ref: a, className: "Room 4", goal: 5, since: NOW - DAY },
      { ref: b, className: "Room 4", goal: 2, since: NOW - DAY },
    ];
    const answer = (unit: string, t: number, i: number) => ({ id: `${unit}-${i}`, profileId: "p1", type: "answer", unit, t, correct: false });
    h.events = [answer(a.key, NOW - 2 * DAY, 0), answer(a.key, NOW - 1000, 1), answer(a.key, NOW - 900, 2), answer(b.key, NOW - 800, 3), answer(b.key, NOW - 700, 4), { ...answer(b.key, NOW - 600, 5), profileId: "p2" }];
    show();
    const [first, second] = within(screen.getByRole("region", { name: "From your teacher" })).getAllByRole("link");
    // The answer from before the homework was set doesn't count; right or wrong, the others do.
    expect(first).toHaveTextContent("2 of 5 questions");
    expect(second).toHaveTextContent("Done! ✓");
    h.events = [];
  });

  it("a class student signs out instead of seeing the grown-ups link", () => {
    h.family = { ...premium, account: { email: "", familyId: "f1", student: true } };
    show();
    expect(screen.queryByRole("link", { name: /Grown-ups/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /I'm done · Sign out/ }));
    expect(h.signOutStudent).toHaveBeenCalled();
  });

  it("a family child gets the grown-ups link", () => {
    show();
    expect(screen.getByRole("link", { name: /Grown-ups/ })).toHaveAttribute("href", expect.stringContaining("/parents"));
  });
});
