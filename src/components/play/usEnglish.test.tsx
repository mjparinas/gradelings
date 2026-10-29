// @vitest-environment jsdom
import { act, cleanup, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { allUnitRefs, loadGrade } from "@/content";
import { usNumbers, usSpelling } from "@/content/locale";
import type { AgeBand, FrameworkId, GradeId } from "@/content/types";
import { defaultChildSettings, type AppEvent, type FamilyInfo, type Profile } from "@/lib/model";

// A US child reads the kids' app in US English: US spelling, "4th grade" and "state". Each screen is rendered for a
// US child with some practice, and its text must already be what `usSpelling` would make of it.
vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  markSynced: vi.fn().mockResolvedValue(undefined),
  unsyncedEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("@/lib/sync", () => ({ syncNow: vi.fn().mockResolvedValue(undefined), startBackgroundSync: vi.fn() }));
vi.mock("@/lib/speech", () => ({ speak: vi.fn(), stopSpeaking: vi.fn(), speechSupported: () => false }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

import { ageBandFor } from "@/content/subjects";
import { useStore } from "@/lib/store";
import { BandProvider } from "../band";
import { Arcade } from "./Arcade";
import { FactsPicker } from "./Facts";
import { Hub } from "./Hub";
import { SubjectPicker, UnitList } from "./Practice";
import { Room } from "./Room";
import { Shop } from "./Shop";
import { StickerBook } from "./StickerBook";
import { Toasts } from "./Toasts";
import { TrailMap } from "./TrailMap";
import { Treasures } from "./Treasures";
import { TrophyRoom } from "./Trophies";
import { WeekRecap } from "./WeekRecap";

const DAY = 86_400_000;
const family: FamilyInfo = { plan: "premium", trialEndsAt: 0, updatedAt: 1, country: "US" } as FamilyInfo;

function child(grade: GradeId, framework: FrameworkId = "us-wa"): Profile {
  return { id: "a", name: "Ava", avatar: "ollie", colour: "#fff", grade, framework, companion: "ollie", createdAt: 1, updatedAt: 1 } as Profile;
}

async function practice(grade: GradeId, framework: FrameworkId): Promise<AppEvent[]> {
  await loadGrade(grade, framework);
  let n = 0;
  // Two months of practice that stopped a week ago, so streak, "days practised" and "tricky spots" lines show.
  const start = Date.now() - 60 * DAY;
  return allUnitRefs(grade, framework)
    .slice(0, 10)
    .flatMap((r, u) =>
      Array.from({ length: 12 }, (_, i) => ({ id: `e${n++}`, profileId: "a", t: start + (u * 5 + (i % 4)) * DAY + i * 60_000, type: "answer", unit: r.key, correct: (i + u) % 3 !== 0, attempts: 1, revealed: false, ms: 30_000, mode: "practice" }) as AppEvent),
    );
}

let events: AppEvent[] = [];
// Loading a grade and playing a session can pass 10 s on a busy CI machine, so the hook gets the tests' own timeout.
beforeAll(async () => {
  events = await practice("4", "us-wa");
}, 20000);

function setChild(p: Profile, evs = events) {
  useStore.setState({ profiles: [p], activeId: p.id, events: evs, settings: { a: defaultChildSettings("a", false, p.grade) }, family, toasts: [] });
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 404 })));
  setChild(child("4"));
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

/** Words on screen that a US reader would spell or say differently. */
function canadianBits(text: string): string[] {
  const out = new Set<string>();
  for (const word of text.match(/[A-Za-z]+/g) ?? []) if (usSpelling(word) !== word) out.add(word);
  for (const m of text.match(/\bGrade \d\b|\bprovinces?\b/gi) ?? []) out.add(m);
  if (usNumbers(text) !== text) out.add("spaced number");
  return [...out];
}

async function expectUs(page: ReactElement, band: AgeBand = ageBandFor(useStore.getState().profiles[0].grade)) {
  render(<BandProvider value={band}>{page}</BandProvider>);
  await act(async () => {});
  expect(canadianBits(document.body.textContent ?? "")).toEqual([]);
}

describe("the kids' app for a US child", () => {
  it("Home", () => expectUs(<Hub />));
  it("Home for a little kid", async () => {
    setChild(child("1"), await practice("1", "us-wa"));
    await expectUs(<Hub />);
  });
  it("Lessons", () => expectUs(<SubjectPicker />));
  it("A subject's units", () => expectUs(<UnitList subject="math" />));
  it("Trail map", () => expectUs(<TrailMap />));
  it("Treasures", () => expectUs(<Treasures />));
  it("Math Facts", () => expectUs(<FactsPicker />));
  it("Sticker book", () => expectUs(<StickerBook />));
  it("My Room", () => expectUs(<Room />));
  it("Trophies", () => expectUs(<TrophyRoom />));
  it("Shop", () => expectUs(<Shop />));
  it("Arcade", () => expectUs(<Arcade />));
  it("Weekly recap", async () => {
    // Practice last week (seven days ago is always in it), so every part of the recap shows.
    const lastWeek = events.slice(0, 40).map((e, i) => ({ ...e, id: `w${i}`, t: Date.now() - 7 * DAY + i * 60_000 }));
    setChild(child("4"), [...events, ...lastWeek]);
    await expectUs(<WeekRecap />);
    expect(document.body.textContent).toContain("last week");
  });
  it("Toasts", async () => {
    useStore.getState().pushToast({ kind: "trophy", title: "Grade 4 Champion", subtitle: "Practise on 30 different days.", icon: "🏆" });
    useStore.getState().pushToast({ kind: "level", title: "You levelled up!", subtitle: "Your buddy grew", icon: "⬆️" });
    await expectUs(<Toasts />);
    expect(document.body.textContent).toContain("4th grade Champion");
  });
});

describe("the kids' app for a Canadian child", () => {
  it("keeps Canadian spelling", async () => {
    setChild(child("4", "ca-bc"), await practice("4", "ca-bc"));
    useStore.getState().pushToast({ kind: "level", title: "You levelled up!", subtitle: "", icon: "⬆️" });
    render(<Toasts />);
    expect(document.body.textContent).toContain("You levelled up!");
  });
});
