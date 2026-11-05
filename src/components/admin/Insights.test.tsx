// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock("@/lib/classroom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/classroom")>();
  return { ...actual, call: mocks.call };
});

import { afterTrial, classActivity, contentGaps, engagementDepth, mostFlagged, revenueQuality, signupSources, teacherFunnel, trialByWeek, trialCurve, type TrialFamily } from "@/lib/adminInsights";
import { Insights } from "./Insights";

const DAY = 86_400_000;
const now = Date.UTC(2026, 10, 5, 12);
const fam = (over: Partial<TrialFamily> = {}): TrialFamily => ({ createdAt: now - 50 * DAY, trialEndsAt: now - 20 * DAY, practiceDays: 6, hadLockedUnits: true, practisedLastWeek: true, practisingNow: false, paid: false, onCode: false, ...over });

const trialFamilies = [...Array.from({ length: 6 }, () => fam({ paid: true })), ...Array.from({ length: 4 }, () => fam())];
const answers: Record<string, unknown> = {
  trial: { curve: trialCurve(trialFamilies), weeks: trialByWeek(trialFamilies, now), after: afterTrial(trialFamilies), windowDays: 120 },
  revenue: { ...revenueQuality([{ paidAt: now, trialEndsAt: now - 2 * DAY, interval: "month" }], 10, 1), windowDays: 90 },
  engagement: { ...engagementDepth([{ days7: 4, days28: 12, ms28: 12 * 600_000 }], { adventure: 8, story: 2 }), windowDays: 28 },
  teachers: { steps: teacherFunnel([4, 3, 2, 1, 1]), classes: classActivity([{ students: 10, active7: 7 }]), windowDays: 90 },
  content: {
    hardest: contentGaps([{ unit: "4/math/fractions", answers: 100, firstTry: 40, revealed: 20, families: 6, helpAsks: 3, reports: 1 }]),
    flagged: mostFlagged([{ unit: "5/math/decimals", answers: 0, firstTry: 0, revealed: 0, families: 0, helpAsks: 2, reports: 0 }]),
    windowDays: 90,
  },
  sources: signupSources([{ path: "google", referred: false, code: false, country: "CA", framework: "bc", practised: true, paid: false }]),
};

beforeEach(() => {
  mocks.call.mockReset();
  mocks.call.mockImplementation((url: string) => {
    const part = new URL(url, "http://x").searchParams.get("part")!;
    return Promise.resolve(answers[part]);
  });
});

describe("Insights", () => {
  it("asks for each part and shows its numbers", async () => {
    render(<Insights />);
    for (const part of Object.keys(answers)) expect(mocks.call).toHaveBeenCalledWith(`/api/admin/insights/?part=${part}`);
    expect(await screen.findByText("Trials that ended")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Trial to Paid" })).toBeTruthy();
    // 6 of 10 paid.
    const trial = screen.getByRole("region", { name: "Trial to Paid" });
    expect(within(trial).getAllByText("60%").length).toBeGreaterThan(0);
    expect(await screen.findByText("4/math/fractions")).toBeTruthy();
    expect(await screen.findByText("Signed up as a teacher")).toBeTruthy();
    expect(await screen.findByText("Continue with Google")).toBeTruthy();
  });

  it("shows a dash instead of a rate for a small group", async () => {
    render(<Insights />);
    const revenue = await screen.findByRole("region", { name: "Revenue Quality" });
    expect(within(revenue).getAllByText("—").length).toBeGreaterThan(0);
  });

  it("shows one part's failure without hiding the rest", async () => {
    mocks.call.mockImplementation((url: string) => {
      const part = new URL(url, "http://x").searchParams.get("part")!;
      return part === "content" ? Promise.reject(new Error("Content unavailable")) : Promise.resolve(answers[part]);
    });
    render(<Insights />);
    expect((await screen.findByRole("alert")).textContent).toBe("Content unavailable");
    expect(await screen.findByText("Trials that ended")).toBeTruthy();
  });
});
