// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { allUnitRefs, loadGrade, type UnitRef } from "@/content";
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
import { GrowthPanel } from "./GrowthPanel";

const kid: Profile = { id: "a", name: "Ava", avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1 };

let math: UnitRef;
beforeAll(async () => {
  await loadGrade("3", "ca-bc");
  math = allUnitRefs("3", "ca-bc").find((r) => r.course.subject === "math")!;
});

const answers = (count: number): AppEvent[] =>
  Array.from({ length: count }, (_, i) => ({ id: `e${i}`, profileId: "a", t: Date.now() - 86_400_000 + i * 1000, type: "answer", unit: math.key, correct: true, attempts: 1, revealed: false, ms: 20_000, mode: "practice" }) as AppEvent);

describe("GrowthPanel", () => {
  it("lets a parent share a unit that grew, as a card with the unit and grade only", async () => {
    const writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    useStore.setState({ profiles: [kid], events: answers(10), settings: {} });
    render(<GrowthPanel p={kid} />);
    const row = screen.getByText(`${math.unit.emoji} ${math.unit.title}`).closest("li")!;
    expect(row).toHaveTextContent("Not started → Proficient");
    await userEvent.click(within(row).getByRole("button", { name: `Share “Grew into a Tree in ${math.unit.title}”` }));
    expect(writeText).toHaveBeenCalledWith(`${window.location.origin}/milestone/unit/bc/grade-3/math/${math.unit.id}/2/`);
  });
});
