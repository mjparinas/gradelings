// @vitest-environment jsdom
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GRADE_LABEL, gradeForAge } from "@/content/subjects";
import type { Profile } from "@/lib/model";

// The real store runs; only the device database and sync are faked.
vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  unsyncedEvents: vi.fn().mockResolvedValue([]),
  markSynced: vi.fn().mockResolvedValue(undefined),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("@/lib/sync", () => ({ syncNow: vi.fn().mockResolvedValue(undefined), startBackgroundSync: vi.fn() }));

import { useStore } from "@/lib/store";
import { ChildrenPage } from "./Children";

const thisYear = new Date().getFullYear();
const kid = (id: string, name: string, over: Partial<Profile> = {}): Profile => ({
  id,
  name,
  avatar: "ollie",
  colour: "#ff9636",
  grade: "3",
  framework: "ca-bc",
  createdAt: 1,
  updatedAt: 1,
  ...over,
});
const live = () => useStore.getState().profiles.filter((p) => !p.deleted);

/** Opens a SelectMenu by its label and picks the option with this text. */
async function pick(label: string, option: string) {
  await userEvent.click(screen.getByRole("combobox", { name: label }));
  fireEvent.pointerDown(screen.getByRole("option", { name: option }));
}

beforeEach(() => {
  useStore.setState({
    profiles: [],
    settings: {},
    activeId: null,
    events: [],
    family: { plan: "trial", trialEndsAt: Date.now() + 86_400_000, updatedAt: 1 },
    sync: { cursor: 0, status: "signed-out", dirtyProfiles: [], dirtyFamily: false },
  });
});

describe("ChildrenPage", () => {
  it("adds a child with a birth year that suggests the grade, a province and an avatar", async () => {
    useStore.setState({ profiles: [kid("a", "Ava")], activeId: "a" });
    render(<ChildrenPage />);
    await userEvent.click(screen.getByRole("button", { name: "+ Add a child" }));
    const dialog = screen.getByRole("dialog", { name: "Add a child" });
    const save = within(dialog).getByRole("button", { name: "Save" });
    expect(save).toBeDisabled();

    const year = thisYear - 8;
    await pick("Birth year", String(year));
    expect(within(dialog).getByText(`About 8 years old (suggested: ${GRADE_LABEL[gradeForAge(8)]})`)).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Grade" })).toHaveTextContent(GRADE_LABEL[gradeForAge(8)]);
    await pick("Province or state", "Ontario (Ontario Curriculum)");
    expect(dialog).toHaveTextContent("Lessons and reports follow the Ontario Curriculum");
    await userEvent.click(within(dialog).getByRole("button", { name: "Ruby" }));
    expect(within(dialog).getByRole("button", { name: "Ruby" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.change(within(dialog).getByRole("textbox"), { target: { value: "Ben" } });
    await userEvent.click(save);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    const ben = live().find((p) => p.name === "Ben")!;
    expect(ben).toMatchObject({ grade: gradeForAge(8), framework: "ca-on", birthYear: year, avatar: "ruby" });
    // Adding a child doesn't switch which child is playing.
    expect(useStore.getState().activeId).toBe("a");
    expect(screen.getByText(`${GRADE_LABEL[ben.grade]} · Ontario · about 8 years old`)).toBeInTheDocument();
  });

  it("lets the parent override the suggested grade", async () => {
    render(<ChildrenPage />);
    await userEvent.click(screen.getByRole("button", { name: "+ Add a child" }));
    await pick("Birth year", String(thisYear - 6));
    await pick("Grade", "Grade 4");
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Zoe" } });
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(live()[0]).toMatchObject({ name: "Zoe", grade: "4", birthYear: thisYear - 6 });
  });

  it("starts a new child in Grade 2 on the BC curriculum with no birth year", async () => {
    render(<ChildrenPage />);
    await userEvent.click(screen.getByRole("button", { name: "+ Add a child" }));
    expect(screen.getByRole("combobox", { name: "Grade" })).toHaveTextContent("Grade 2");
    expect(screen.getByRole("combobox", { name: "Province or state" })).toHaveTextContent("British Columbia");
    expect(screen.getByRole("combobox", { name: "Birth year" })).toHaveTextContent("Not set");
    expect(screen.queryByText(/years old/)).not.toBeInTheDocument();
  });

  it("won't save a name that is only spaces", async () => {
    render(<ChildrenPage />);
    await userEvent.click(screen.getByRole("button", { name: "+ Add a child" }));
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "   " } });
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    expect(live()).toHaveLength(0);
  });

  it("stops offering to add a child at the family limit of 3", () => {
    useStore.setState({ profiles: [kid("a", "Ava"), kid("b", "Ben"), kid("c", "Cal")] });
    render(<ChildrenPage />);
    expect(screen.getByText("Up to 3 children per family.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "+ Add a child" })).not.toBeInTheDocument();
  });

  it("offers to add again once a removed child frees a place", () => {
    useStore.setState({ profiles: [kid("a", "Ava"), kid("b", "Ben"), kid("c", "Cal", { deleted: true })] });
    render(<ChildrenPage />);
    expect(screen.getByRole("button", { name: "+ Add a child" })).toBeInTheDocument();
    expect(screen.queryByText("Cal")).not.toBeInTheDocument();
  });

  it("edits a child's name (trimmed) and keeps the grade when the birth year changes", async () => {
    useStore.setState({ profiles: [kid("a", "Ava", { grade: "5", birthYear: thisYear - 10 })] });
    render(<ChildrenPage />);
    expect(screen.getByText("Grade 5 · British Columbia · about 10 years old")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "✏️ Edit" }));
    expect(screen.getByRole("dialog", { name: "Edit child" })).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("Ava");
    await pick("Birth year", String(thisYear - 6));
    expect(screen.getByRole("combobox", { name: "Grade" })).toHaveTextContent("Grade 5");
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "  Avery  " } });
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(live()[0]).toMatchObject({ id: "a", name: "Avery", grade: "5", birthYear: thisYear - 6 });
  });

  it("links each child to their own settings", () => {
    useStore.setState({ profiles: [kid("a", "Ava")] });
    render(<ChildrenPage />);
    expect(screen.getByRole("link", { name: "⚙️ Settings" })).toHaveAttribute("href", "#/settings/a");
  });

  it("removes a child only after confirming, and forgets their progress on this device", async () => {
    useStore.setState({
      profiles: [kid("a", "Ava"), kid("b", "Ben")],
      activeId: "a",
      events: [{ id: "e1", profileId: "a", t: 1, type: "answer", unit: "math-3:x", correct: true, attempts: 1, revealed: false, ms: 1000, mode: "practice" }],
    });
    render(<ChildrenPage />);
    await userEvent.click(screen.getAllByRole("button", { name: "Remove" })[0]);
    const dialog = screen.getByRole("dialog", { name: "Remove Ava?" });
    expect(dialog).toHaveTextContent("This deletes the child and all their progress");
    await userEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
    expect(live()).toHaveLength(2);

    await userEvent.click(screen.getAllByRole("button", { name: "Remove" })[0]);
    await userEvent.click(screen.getByRole("button", { name: "Yes, remove" }));
    expect(live().map((p) => p.name)).toEqual(["Ben"]);
    expect(useStore.getState().events).toHaveLength(0);
    expect(useStore.getState().activeId).toBeNull();
    expect(screen.queryByText("Ava")).not.toBeInTheDocument();
  });

  it("resets a child's progress but keeps the child", async () => {
    useStore.setState({ profiles: [kid("a", "Ava")] });
    render(<ChildrenPage />);
    await userEvent.click(screen.getByRole("button", { name: "↺ Reset progress" }));
    const dialog = screen.getByRole("dialog", { name: "Reset Ava's progress?" });
    expect(dialog).toHaveTextContent("Their name and settings stay.");
    await userEvent.click(within(dialog).getByRole("button", { name: "Yes, reset" }));
    expect(live()).toHaveLength(1);
    expect(live()[0].resetAt).toBeGreaterThan(0);
  });
});
