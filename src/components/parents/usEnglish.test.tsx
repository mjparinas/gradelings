// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { allUnitRefs, loadGrade } from "@/content";
import { usNumbers, usSpelling } from "@/content/locale";
import { defaultChildSettings, type AppEvent, type FamilyInfo, type Profile } from "@/lib/model";

// A US family reads the parent area in US English: US spelling, "4th grade" and "state". Each page is rendered for a
// US family with some practice, and its text must already be what `usSpelling` would make of it.
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
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("./InstallNudge", () => ({ InstallNudge: () => null }));

import { useStore } from "@/lib/store";
import { AccountPage } from "./Account";
import { ChildrenPage } from "./Children";
import { ConferenceSheet } from "./ConferenceSheet";
import { Overview } from "./Overview";
import { PlacementPage } from "./Placement";
import { PracticeSheetPage } from "./PracticeSheet";
import { ReportCardsPage } from "./ReportCards";
import { ReportsPage } from "./Reports";
import { SettingsPage } from "./Settings";
import { SubscriptionPage } from "./Subscription";
import { YearReviewPage } from "./YearReview";

const DAY = 86_400_000;
const kid: Profile = { id: "a", name: "Ava", avatar: "ollie", colour: "#fff", grade: "4", framework: "us-wa", createdAt: 1, updatedAt: 1 };
const family: FamilyInfo = { plan: "trial", trialEndsAt: Date.now() + 10 * DAY, updatedAt: 1, country: "US", account: { email: "p@example.com", familyId: "f", verified: true } } as FamilyInfo;

let events: AppEvent[] = [];
beforeAll(async () => {
  await loadGrade("4", "us-wa");
  const refs = allUnitRefs("4", "us-wa");
  let n = 0;
  // A year and a half of practice, so milestones show, and recent days, so this week's goal and the reports fill in.
  const start = Date.now() - 400 * DAY;
  events = refs.slice(0, 16).flatMap((r, u) =>
    Array.from({ length: 20 }, (_, i) => ({ id: `e${n++}`, profileId: "a", t: start + u * 25 * DAY + (i % 5) * DAY + i * 60_000, type: "answer", unit: r.key, correct: (i + u) % 4 !== 0, attempts: 1, revealed: false, ms: 30_000, mode: "practice" }) as AppEvent),
  );
});

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 404 })));
  const settings = { ...defaultChildSettings("a", false, "4"), weeklyGoalDays: 3, nudge: { id: "n1", preset: "together", sentAt: Date.now() } };
  useStore.setState({ profiles: [kid], events, settings: { a: settings }, family, pin: null, sync: { cursor: 0, status: "idle", dirtyProfiles: [], dirtyFamily: false } });
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

/** Words on screen that a US reader would spell or say differently. */
function canadianBits(text: string): string[] {
  const out = new Set<string>();
  for (const word of text.match(/[A-Za-z]+/g) ?? []) if (usSpelling(word) !== word) out.add(word);
  // "State or province" in the picker names both countries on purpose.
  const rest = text.replace(/\bstates? (?:or|and) provinces?\b/gi, "");
  for (const m of rest.match(/\bGrade \d\b|\bprovinces?\b/gi) ?? []) out.add(m);
  if (usNumbers(text) !== text) out.add("spaced number");
  return [...out];
}

async function expectUs(page: ReactElement, open: RegExp[] = []) {
  render(page);
  await act(async () => {});
  for (const name of open) for (const b of screen.queryAllByRole("button", { name })) fireEvent.click(b);
  expect(canadianBits(document.body.textContent ?? "")).toEqual([]);
}

describe("the parent area for a US family", () => {
  it("Overview", () => expectUs(<Overview />));
  it("Reports", () => expectUs(<ReportsPage childId="a" />));
  it("Report cards", () => expectUs(<ReportCardsPage childId="a" />));
  it("Conference sheet", () => expectUs(<ConferenceSheet childId="a" />));
  it("Placement", () => expectUs(<PlacementPage childId="a" />));
  it("Year in review", () => expectUs(<YearReviewPage childId="a" />));
  it("Practice sheet", () => expectUs(<PracticeSheetPage childId="a" />));
  it("Children", () => expectUs(<ChildrenPage />));
  it("Editing a child", async () => {
    await expectUs(<ChildrenPage />, [/Edit/]);
    expect(document.body.textContent).toContain("More states and provinces are coming.");
  });
  it("Settings", () => expectUs(<SettingsPage childId="a" />, [/Customize calm mode/, /Advanced options/]));
  it("Account", () => expectUs(<AccountPage onBilling={() => {}} />));
  it("Subscription", () => expectUs(<SubscriptionPage billing={null} onBilling={() => {}} />));
});

describe("the parent area for a Canadian family", () => {
  it("keeps Canadian spelling and grade names", async () => {
    useStore.setState({ profiles: [{ ...kid, framework: "ca-bc" }], family: { ...family, country: "CA" } });
    await loadGrade("4", "ca-bc");
    render(<Overview />);
    await act(async () => {});
    const text = document.body.textContent ?? "";
    expect(text).toContain("Grade 4");
    expect(text).toContain("Last practised");
  });
});
