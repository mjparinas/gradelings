// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getFramework } from "@/content/frameworks";
import type { Profile } from "@/lib/model";
import type { Report, UnitRow } from "@/lib/reports";

const mocks = vi.hoisted(() => ({ loadSharedReport: vi.fn() }));
vi.mock("@/server/reportData", () => ({ loadSharedReport: mocks.loadSharedReport }));

import SharedReport, { metadata } from "./page";

const props = (token: string) => ({ params: Promise.resolve({ token }) }) as never;

const row = (title: string, subject: UnitRow["ref"]["course"]["subject"], level: number, attempts: number, accuracy: number): UnitRow =>
  ({ ref: { key: `4/${subject}/${title.toLowerCase()}`, unit: { title, emoji: "⭐" }, course: { subject } }, level, attempts, accuracy, lastT: 1 }) as unknown as UnitRow;

const fractions = row("Fractions", "math", 2, 12, 0.92);
const maps = row("Maps", "social", 0, 6, 0.33);
const plants = row("Plants", "science", -1, 0, 0);

const profile: Profile = { id: "p1", name: "Maya", avatar: "ollie", colour: "#fff", grade: "4", framework: "ca-on", createdAt: 1, updatedAt: 1 };
const report = (totals: Partial<Report["totals"]>, extra: Partial<Report> = {}) =>
  ({
    totals: { minutes: 42.4, answers: 50, correct: 40, sessions: 5, activeDays: 4, avgSeconds: 9, hints: 3, ...totals },
    units: [fractions, maps, plants],
    strengths: [fractions],
    needs: [maps],
    ...extra,
  }) as Report;

beforeEach(() => mocks.loadSharedReport.mockReset());

describe("shared progress report", () => {
  it("is never indexed and sends no referrer", () => {
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.referrer).toBe("no-referrer");
  });

  it("explains an expired or stopped link without showing anything else", async () => {
    mocks.loadSharedReport.mockResolvedValue(null);
    render(await SharedReport(props("old-token")));
    expect(mocks.loadSharedReport).toHaveBeenCalledWith("old-token");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("This report isn’t available");
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("shows the child's totals, strengths, needs and practised units in the province's scale", async () => {
    mocks.loadSharedReport.mockResolvedValue({ profile, report: report({}), days: 14 });
    const on = getFramework("ca-on");
    render(await SharedReport(props("good-token")));

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Maya’s report");
    expect(screen.getByText(`Grade 4 · ${on.curriculumName} · last 14 days`)).toBeInTheDocument();

    const totals = screen.getByRole("region", { name: "Totals" });
    const value = (label: string) => within(totals).getByText(label).nextElementSibling?.textContent;
    expect(value("Time learning")).toBe("42 min");
    expect(value("Active days")).toBe("4");
    expect(value("Questions")).toBe("50");
    expect(value("Right first try")).toBe("80%");

    expect(screen.getByRole("heading", { name: "🌟 Strengths" }).parentElement).toHaveTextContent("Fractions (92%)");
    expect(screen.getByRole("heading", { name: "🌱 Worth practising" }).parentElement).toHaveTextContent("Maps (33%)");

    // Only units with attempts are listed, with levels named the Ontario way.
    const rows = within(screen.getByRole("table")).getAllByRole("row").slice(1);
    expect(rows.map((r) => [...r.children].map((c) => c.textContent))).toEqual([
      ["Fractions", "Math", on.scoringFor("4").levels[2].label, "92%"],
      ["Maps", "Social Studies", on.scoringFor("4").levels[0].label, "33%"],
    ]);
    expect(screen.getByRole("table")).toHaveAccessibleName(`Units practised and where each stands on the ${on.scoringFor("4").name}`);

    expect(screen.getByText("Hints opened before answering: 3 of 50 questions.")).toBeInTheDocument();
    expect(screen.getByText(/It isn’t a report-card mark: a child’s teacher decides proficiency\./)).toBeInTheDocument();
  });

  it("handles a child who hasn't practised yet", async () => {
    mocks.loadSharedReport.mockResolvedValue({ profile: { ...profile, framework: "ca-bc" }, report: report({ answers: 0, correct: 0, minutes: 0, hints: 0, activeDays: 0 }, { units: [plants], strengths: [], needs: [] }), days: 7 });
    render(await SharedReport(props("new-token")));
    expect(within(screen.getByRole("region", { name: "Totals" })).getByText("Right first try").nextElementSibling).toHaveTextContent("–");
    expect(screen.getByText("Strengths appear after a few lessons in a unit.")).toBeInTheDocument();
    expect(screen.getByText("Nothing stands out as tricky right now.")).toBeInTheDocument();
    expect(within(screen.getByRole("table")).getAllByRole("row")).toHaveLength(1);
    expect(screen.queryByText(/Hints opened/)).not.toBeInTheDocument();
  });
});
