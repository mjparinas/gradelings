// @vitest-environment jsdom
import { act, cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getFramework } from "@/content/frameworks";
import { APP_NAME } from "@/lib/brand";
import { dueChips } from "@/lib/classroom";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));

vi.mock("@/lib/classroom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/classroom")>();
  return { ...actual, call: mocks.call };
});
vi.mock("@/content", () => ({
  coursesForGrade: () => [{
    grade: "3",
    subject: "math",
    units: [{ id: "counting", emoji: "🔢", title: "Counting" }, { id: "patterns", emoji: "🟣", title: "Patterns" }],
  }],
  getUnitRef: (key: string) => ({ "3/math/counting": { unit: { title: "Counting", emoji: "🔢" } }, "3/math/patterns": { unit: { title: "Patterns", emoji: "🟣" } } })[key],
  loadGrade: vi.fn().mockResolvedValue(undefined),
}));

import { TeacherApp } from "./TeacherApp";

const DAY = 86_400_000;
const cls = { id: "class-1", name: "Room 3", grade: "3", framework: "ca-on", joinCode: "AB12CD", students: 3 };
const now = Date.now();
const detail = {
  class: cls,
  assignments: ["3/math/counting", "3/math/patterns"],
  due: { "3/math/counting": new Date(2026, 10, 14, 23, 59).getTime() },
  students: [
    { profileId: "p1", name: "Maya", avatar: "otter", grade: "3", lastActive: now, units: [{ key: "3/math/counting", level: 0, attempts: 10, accuracy: 0.3 }, { key: "3/math/patterns", level: 2, attempts: 8, accuracy: 0.9 }] },
    { profileId: "p2", name: "Sam", avatar: "otter", grade: "3", lastActive: now - 10 * DAY, units: [{ key: "3/math/counting", level: 1, attempts: 6, accuracy: 0.5 }, { key: "3/math/patterns", level: -1, attempts: 0, accuracy: 0 }] },
    { profileId: "p3", name: "Alex", avatar: "otter", grade: "3", lastActive: now, units: [{ key: "3/math/counting", level: 3, attempts: 1, accuracy: 1 }, { key: "3/math/patterns", level: 2, attempts: 9, accuracy: 0.8 }] },
  ],
  roster: [{ id: "r1", profileId: "p1", loginCode: "ZX91PQ" }, { id: "r2", profileId: "p2", loginCode: "MN34RT" }],
};

function serve(classDetail: unknown, extra: (url: string, method: string) => unknown = () => undefined) {
  mocks.call.mockImplementation((url: string, method = "GET") => {
    const custom = extra(url, method);
    if (custom !== undefined) return custom instanceof Promise ? custom : Promise.resolve(custom);
    if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false } } });
    if (url === "/api/classes/" && method === "GET") return Promise.resolve({ classes: [cls] });
    if (url === "/api/classes/?id=class-1") return Promise.resolve(classDetail);
    return Promise.resolve({});
  });
}

/** Opens one of the class page's tabs from the header, and waits for it to show. */
async function openTab(user: ReturnType<typeof userEvent.setup>, name: string) {
  const link = within(screen.getByRole("navigation", { name: "Class sections" })).getByRole("link", { name: new RegExp(name) });
  await user.click(link);
  await waitFor(() => expect(link).toHaveAttribute("aria-current", "page"));
}

async function openClass() {
  const user = userEvent.setup();
  render(<TeacherApp />);
  await user.click(await screen.findByRole("button", { name: /^Room 3/ }));
  await screen.findByRole("heading", { name: "Room 3" });
  return user;
}

beforeEach(() => {
  mocks.call.mockReset();
  window.location.hash = "";
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("TeacherApp class page", () => {
  it("shows each student's level in the class's province, with accuracy and question counts", async () => {
    serve(detail);
    const user = await openClass();
    const table = screen.getAllByRole("table")[0];
    expect(within(table).getAllByRole("columnheader").map((h) => h.textContent)).toEqual(["Student", "Counting", "Patterns"]);
    const sam = within(table).getByRole("rowheader", { name: /^Sam/ }).parentElement!;
    // Levels use Ontario's scale, by position.
    const levels = getFramework("ca-on").scoringFor("3").levels.map((l) => l.label);
    expect(sam.children[0]).toHaveTextContent(/^SamActive /);
    expect(sam.children[1]).toHaveTextContent(`${levels[1]}50% · 6 questions`);
    expect(sam.children[2]).toHaveTextContent(/^Not started$/);
    const alex = within(table).getByRole("rowheader", { name: /^Alex/ }).parentElement!;
    expect(alex.children[1]).toHaveTextContent("100% · 1 question");
    // The saved due date shows in the picker.
    await openTab(user, "Homework");
    expect(screen.getByRole("button", { name: "Due date for Counting" })).toHaveTextContent(/Nov.*14/);
  });

  it("points out which unit to reteach and which students to check in with", async () => {
    serve(detail);
    await openClass();
    const insights = screen.getByRole("heading", { name: "What to look at next" }).parentElement!;
    const reteach = within(insights).getByRole("heading", { name: "Worth a quick reteach" }).parentElement!;
    expect(reteach).toHaveTextContent("Counting: 2 of 3 who tried it are finding it tricky (41% right first try overall)");
    expect(reteach).not.toHaveTextContent("Patterns");
    const checkIn = within(insights).getByRole("heading", { name: "Check in with" }).parentElement!;
    expect(checkIn).toHaveTextContent("Maya: Finding Counting tricky");
    expect(checkIn).toHaveTextContent("Sam: Finding Counting tricky; No practice this week");
    expect(checkIn).not.toHaveTextContent("Alex");
    expect(insights).toHaveTextContent("This reflects practice, not a report-card mark.");
  });

  it("sets how many questions a homework unit needs and shows each student's count", async () => {
    const withGoal = {
      ...detail,
      goal: { "3/math/counting": 10 },
      students: detail.students.map((st, i) => ({ ...st, units: st.units.map((u) => ({ ...u, done: u.key === "3/math/counting" ? [4, 10, 0][i] : 0 })) })),
    };
    serve(withGoal);
    const user = await openClass();
    const table = screen.getAllByRole("table")[0];
    expect(within(table).getByRole("rowheader", { name: /^Maya/ }).parentElement!.children[1]).toHaveTextContent("Homework: 4 of 10");
    expect(within(table).getByRole("rowheader", { name: /^Sam/ }).parentElement!.children[1]).toHaveTextContent("Homework done ✓");
    // Units without a number of questions show no homework line.
    expect(within(table).getByRole("rowheader", { name: /^Sam/ }).parentElement!.children[2]).not.toHaveTextContent("Homework");
    await openTab(user, "Homework");
    expect(screen.getByRole("combobox", { name: "Questions for Counting" })).toHaveTextContent("10 questions");
    await user.click(screen.getByRole("combobox", { name: "Questions for Patterns" }));
    await user.click(screen.getByRole("option", { name: "15 questions" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/assignments/", "PATCH", { classId: "class-1", unitKey: "3/math/patterns", goal: 15 }));
  });

  it("asks a live question, shows answers as they come in, then shows the answer", async () => {
    const question = { prompt: "How many?", hint: "Count them.", choices: [{ id: "a", label: "3" }, { id: "b", label: "4" }], answer: "b" };
    let state: unknown = null;
    serve(detail, (url, method) => {
      if (!url.startsWith("/api/classes/live/")) return undefined;
      if (method === "POST") state = { id: "q1", unitKey: "3/math/counting", question, revealed: false, createdAt: now, answers: [{ profileId: "p1", choice: "a", correct: false }] };
      if (method === "PATCH") state = { ...(state as object), revealed: true };
      if (method === "DELETE") state = null;
      return { live: state };
    });
    const user = await openClass();
    await openTab(user, "Live");
    const section = screen.getByRole("region", { name: "Live questions" });
    // The first homework unit is picked to start.
    await user.click(within(section).getByRole("button", { name: "Ask a live question" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/live/", "POST", { classId: "class-1", unitKey: "3/math/counting", readAloud: true }));
    expect(await within(section).findByText("How many?")).toBeInTheDocument();
    expect(section).toHaveTextContent("1 of 3 answered");
    expect(section).toHaveTextContent("Answered: Maya");
    expect(section).toHaveTextContent("Waiting for: Sam, Alex");
    await user.click(within(section).getByRole("button", { name: "Show the answer" }));
    expect(await within(section).findByText(/answer shown to the class/)).toBeInTheDocument();
    await user.click(within(section).getByRole("button", { name: "End" }));
    expect(await within(section).findByRole("button", { name: "Ask a live question" })).toBeInTheDocument();
  });

  it("lists the questions several students missed, with how many", async () => {
    serve({ ...detail, missed: { "3/math/counting": [{ q: "34 + 8", missed: 2, tried: 3 }] } });
    await openClass();
    expect(screen.getByRole("heading", { name: "Most-missed questions" })).toBeInTheDocument();
    expect(screen.getByText(/34 \+ 8: 2 of 3 missed it on the first try/)).toBeInTheDocument();
  });

  it("leaves out the most-missed list when nothing was missed", async () => {
    serve({ ...detail, missed: {} });
    await openClass();
    expect(screen.queryByRole("heading", { name: "Most-missed questions" })).not.toBeInTheDocument();
  });

  it("looks back at the day's live questions and copies the recap", async () => {
    const question = { prompt: "How many?", hint: "", choices: [{ id: "a", label: "3" }, { id: "b", label: "4" }], answer: "b" };
    serve(detail, (url) =>
      url === "/api/classes/live/?classId=class-1&recap=1"
        ? { recap: [{ id: "q1", unitKey: "3/math/counting", question, revealed: true, createdAt: now, answers: [{ profileId: "p1", choice: "a", correct: false }, { profileId: "p3", choice: "b", correct: true }] }] }
        : url.startsWith("/api/classes/live/") ? { live: null } : undefined,
    );
    const user = await openClass();
    const write = vi.spyOn(navigator.clipboard, "writeText");
    await openTab(user, "Live");
    await user.click(screen.getByRole("button", { name: "Look back at today’s questions" }));
    const recap = await screen.findByLabelText("Recap of today’s questions");
    expect(recap).toHaveTextContent("1 of 2 answered right · To check in with: Maya");
    await user.click(within(recap).getByRole("button", { name: "Copy the recap" }));
    expect(write).toHaveBeenCalledWith(expect.stringContaining("1 of 2 answered right. To check in with: Maya."));
    expect(write).toHaveBeenCalledWith(expect.stringContaining("not a report-card mark"));
  });

  it("uses US English and US dates for a class on a US curriculum, and Canadian ones otherwise", async () => {
    const when = Date.now() - 2 * DAY;
    const one = (framework: string) => {
      const c = { ...cls, framework };
      serve({ ...detail, class: c, students: [{ ...detail.students[2], lastActive: when }], roster: [] }, (url, method) => (url === "/api/classes/" && method === "GET" ? { classes: [c] } : undefined));
    };
    one("us-wa");
    await openClass();
    expect(screen.getByText("Nothing stands out. Everyone who has practiced is doing fine on the assigned units.")).toBeInTheDocument();
    expect(screen.getByText(`Active ${new Date(when).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`)).toBeInTheDocument();
  });

  it("keeps Canadian English and dates for a Canadian class", async () => {
    const when = Date.now() - 2 * DAY;
    serve({ ...detail, students: [{ ...detail.students[2], lastActive: when }], roster: [] });
    await openClass();
    expect(screen.getByText("Nothing stands out. Everyone who has practised is doing fine on the assigned units.")).toBeInTheDocument();
    expect(screen.getByText(`Active ${new Date(when).toLocaleDateString("en-CA", { month: "short", day: "numeric" })}`)).toBeInTheDocument();
  });

  it("says when nothing stands out", async () => {
    serve({ ...detail, students: [detail.students[2]] });
    await openClass();
    expect(screen.getByText("Nothing stands out. Everyone who has practised is doing fine on the assigned units.")).toBeInTheDocument();
  });

  it("asks for an assignment before showing results, and hides insights", async () => {
    serve({ ...detail, assignments: [], due: {}, students: detail.students.map((s) => ({ ...s, units: [] })) });
    const user = await openClass();
    expect(screen.getByText(/Assign homework to see how each student is doing\./)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "What to look at next" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Print class summary" })).not.toBeInTheDocument();
    // The empty table points to the Homework tab.
    await user.click(screen.getByRole("link", { name: "Go to Homework" }));
    expect(await screen.findByText("Nothing assigned yet.")).toBeInTheDocument();
  });

  it("says when no one has joined", async () => {
    serve({ ...detail, students: [], roster: [] });
    const user = await openClass();
    expect(screen.getByText(/No one has joined yet\./)).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: "Add students or share the class code" }));
    expect(await screen.findByRole("heading", { name: "Student logins" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Print login cards" })).not.toBeInTheDocument();
  });

  it("writes a note home with the class code and curriculum, and copies it", async () => {
    serve(detail);
    const user = await openClass();
    await openTab(user, "Students");
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    const note = screen.getByRole("textbox", { name: "Note to families" }) as HTMLTextAreaElement;
    expect(note.value).toContain(`Our class is using ${APP_NAME} for extra Ontario Curriculum practice.`);
    expect(note.value).toContain("enter the class code AB12CD");
    expect(note.value).toContain(`${window.location.origin}/play/`);
    await user.click(screen.getByRole("button", { name: "Copy note" }));
    expect(writeText).toHaveBeenCalledWith(note.value);
    expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument();
    const mail = screen.getByRole("link", { name: "Email it" }).getAttribute("href")!;
    expect(mail.startsWith("mailto:?subject=")).toBe(true);
    expect(decodeURIComponent(mail)).toContain(`Room 3 on ${APP_NAME}`);
    expect(decodeURIComponent(mail.split("&body=")[1])).toBe(note.value);
  });

  it("prints a login card for each student, then goes back to the normal view", async () => {
    serve(detail);
    const user = await openClass();
    await openTab(user, "Students");
    const print = vi.spyOn(window, "print").mockImplementation(() => {
      // While printing, each student's card has the class code and their own code.
      const cards = [...document.querySelectorAll(".print\\:grid > div")];
      expect(cards.map((c) => c.textContent)).toEqual([
        expect.stringMatching(/^Maya.*Class code: AB12CD.*My code: ZX91PQ$/),
        expect.stringMatching(/^Sam.*Class code: AB12CD.*My code: MN34RT$/),
      ]);
    });
    await user.click(screen.getByRole("button", { name: "Print login cards" }));
    await waitFor(() => expect(print).toHaveBeenCalledOnce());
    await waitFor(() => expect(document.querySelector(".print\\:grid")).toBeNull());
  });

  it("prints a class summary that says it is practice", async () => {
    serve(detail);
    const user = await openClass();
    let summary = "";
    const print = vi.spyOn(window, "print").mockImplementation(() => {
      summary = document.querySelector(".print\\:block")!.textContent!;
    });
    await user.click(screen.getByRole("button", { name: "Print class summary" }));
    await waitFor(() => expect(print).toHaveBeenCalledOnce());
    expect(summary).toContain("Room 3 · Grade 3 · Ontario Curriculum");
    expect(summary).toContain(`This reflects practice in ${APP_NAME}, not a report-card mark.`);
    expect(summary).toContain("Not started");
    expect(summary).toContain("(30%, 10 q)");
    expect(summary).toContain("Worth a quick reteach: Counting.");
    expect(summary).toContain("Check in with: Maya, Sam.");
  });

  it("clears a due date and gives a student a new code", async () => {
    serve(detail);
    const user = await openClass();
    await openTab(user, "Homework");
    await user.click(screen.getByRole("button", { name: "Due date for Counting" }));
    await user.click(within(await screen.findByRole("dialog", { name: "Due date for Counting" })).getByRole("button", { name: "Clear date" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/assignments/", "PATCH", { classId: "class-1", unitKey: "3/math/counting", dueAt: null }));

    await openTab(user, "Students");
    const maya = screen.getByLabelText("Login code Z X 9 1 P Q").parentElement!;
    await user.click(within(maya).getByRole("button", { name: "New code" }));
    expect(mocks.call).toHaveBeenCalledWith("/api/classes/students/?classId=class-1&studentId=r1", "PATCH", undefined);
  });

  it("assigns a unit with a due date at the end of that day", async () => {
    serve(detail, (url, method) => (url === "/api/classes/?id=class-1" && method === "GET" ? { ...detail, assignments: ["3/math/counting"] } : undefined));
    const user = await openClass();
    await openTab(user, "Homework");
    await user.click(screen.getByRole("combobox", { name: "Add a unit" }));
    await user.click(screen.getByRole("option", { name: /Patterns/ }));
    await user.click(screen.getByRole("button", { name: "Due (optional)" }));
    await user.click(within(screen.getByRole("dialog", { name: "Due (optional)" })).getByRole("button", { name: /^20 / }));
    await user.click(screen.getByRole("button", { name: "Assign" }));
    const body = mocks.call.mock.calls.find(([u, m]) => u === "/api/classes/assignments/" && m === "POST")![2] as { dueAt: number; unitKey: string };
    expect(body.unitKey).toBe("3/math/patterns");
    const due = new Date(body.dueAt);
    expect([due.getDate(), due.getHours(), due.getMinutes()]).toEqual([20, 23, 59]);
  });

  it("assigns a unit to chosen students only, and won't assign to nobody", async () => {
    serve(detail, (url, method) => (url === "/api/classes/?id=class-1" && method === "GET" ? { ...detail, assignments: ["3/math/counting"] } : undefined));
    const user = await openClass();
    await openTab(user, "Homework");
    await user.click(screen.getByRole("combobox", { name: "Add a unit" }));
    await user.click(screen.getByRole("option", { name: /Patterns/ }));
    const assign = screen.getByRole("button", { name: "Assign" });
    const who = screen.getByRole("group", { name: "Who gets it" });
    expect(within(who).getByRole("radio", { name: "Whole class" })).toBeChecked();
    await user.click(within(who).getByRole("radio", { name: "Chosen students" }));
    // Chosen, but nobody picked yet.
    expect(assign).toBeDisabled();
    await user.click(within(who).getByRole("checkbox", { name: "Maya" }));
    await user.click(within(who).getByRole("checkbox", { name: "Alex" }));
    expect(assign).toBeEnabled();
    await user.click(assign);
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/assignments/", "POST", { classId: "class-1", unitKey: "3/math/patterns", dueAt: undefined, goal: undefined, students: ["p1", "p3"] }));
  });

  it("shows and changes who a homework unit is for", async () => {
    serve({ ...detail, audience: { "3/math/patterns": ["p1"] } });
    const user = await openClass();
    await openTab(user, "Homework");
    expect(screen.getByRole("button", { name: "Who gets Counting: Whole class" })).toHaveTextContent("For: Whole class");
    await user.click(screen.getByRole("button", { name: "Who gets Patterns: 1 student" }));
    const group = screen.getByRole("group", { name: "Students for Patterns" });
    expect(within(group).getByRole("checkbox", { name: "Maya" })).toBeChecked();
    await user.click(within(group).getByRole("checkbox", { name: "Sam" }));
    await user.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/assignments/", "PATCH", { classId: "class-1", unitKey: "3/math/patterns", students: ["p1", "p2"] }));
    // Back to the whole class.
    await user.click(screen.getByRole("button", { name: /Who gets Patterns/ }));
    await user.click(within(screen.getByRole("group", { name: "Students for Patterns" })).getByRole("radio", { name: "Whole class" }));
    await user.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/assignments/", "PATCH", { classId: "class-1", unitKey: "3/math/patterns", students: [] }));
  });

  it("marks a unit as not assigned for students it wasn't given to, without flagging them", async () => {
    const skipped = detail.students.map((st) => (st.profileId === "p2" ? { ...st, lastActive: now - 30 * DAY, units: st.units.map((u) => ({ ...u, assigned: false, attempts: 0, level: -1 })) } : st));
    serve({ ...detail, students: skipped });
    await openClass();
    const sam = within(screen.getAllByRole("table")[0]).getByRole("rowheader", { name: /^Sam/ }).parentElement!;
    expect(sam.children[1]).toHaveTextContent("Not assigned");
    expect(sam.children[2]).toHaveTextContent("Not assigned");
    const checkIn = screen.getByRole("heading", { name: "Check in with" }).parentElement!;
    expect(checkIn).not.toHaveTextContent("Sam");
  });

  it("offers extra practice for the students to check in with, with them already chosen", async () => {
    serve(detail);
    const user = await openClass();
    await user.click(screen.getByRole("link", { name: "Assign extra practice to these students" }));
    expect(window.location.hash).toBe("#/class/class-1/homework?students=p1,p2");
    const who = await screen.findByRole("group", { name: "Who gets it" });
    expect(within(who).getByRole("radio", { name: "Chosen students" })).toBeChecked();
    expect(within(who).getByRole("checkbox", { name: "Maya" })).toBeChecked();
    expect(within(who).getByRole("checkbox", { name: "Sam" })).toBeChecked();
    expect(within(who).getByRole("checkbox", { name: "Alex" })).not.toBeChecked();
  });

  it("runs a split class: units from both grades, each student's grade shown, and a grade for new students", async () => {
    const split = { ...cls, grade2: "4" };
    const split2 = { ...detail, class: split, students: detail.students.map((st, i) => ({ ...st, grade: i === 1 ? "4" : "3" })) };
    serve(split2, (url, method) => (url === "/api/classes/" && method === "GET" ? { classes: [split] } : undefined));
    const user = await openClass();
    expect(screen.getByText(/Grades 3 and 4 · Ontario Curriculum/)).toBeInTheDocument();
    const table = screen.getAllByRole("table")[0];
    expect(within(table).getByRole("rowheader", { name: /^Sam\s*\(Grade 4\)/ })).toBeInTheDocument();
    expect(within(table).getByRole("rowheader", { name: /^Maya\s*\(Grade 3\)/ })).toBeInTheDocument();
    await openTab(user, "Students");
    await user.type(screen.getByLabelText("First names, one per line"), "Jo");
    await user.click(screen.getByRole("combobox", { name: "Their grade" }));
    await user.click(screen.getByRole("option", { name: "Grade 4" }));
    await user.click(screen.getByRole("button", { name: "Add students" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/students/", "POST", { classId: "class-1", names: ["Jo"], grade: "4" }));
  });

  it("shows how many are done on each homework unit, who is behind, and what is past due", async () => {
    const goal = { "3/math/counting": 10 };
    const students = detail.students.map((st, i) => ({ ...st, units: st.units.map((u) => ({ ...u, done: u.key === "3/math/counting" ? [4, 10, 0][i] : 0 })) }));
    serve({ ...detail, goal, due: { "3/math/counting": now - DAY, "3/math/patterns": now + 5 * DAY }, students });
    const user = await openClass();
    // The progress table flags the students who are past due and not done.
    const table = screen.getAllByRole("table")[0];
    expect(within(within(table).getByRole("rowheader", { name: /^Maya/ }).parentElement!).getAllByText("Past due")).toHaveLength(1);
    expect(within(within(table).getByRole("rowheader", { name: /^Sam/ }).parentElement!).queryByText("Past due")).not.toBeInTheDocument();
    await openTab(user, "Homework");
    expect(screen.getByText("1 unit is past due with students still to finish.")).toBeInTheDocument();
    expect(screen.getByText("1 of 3 done · past due")).toBeInTheDocument();
    expect(screen.getByText(/Still to finish: Maya, Alex/)).toBeInTheDocument();
    // Patterns has no number of questions: done at Proficient (Maya and Alex), not yet due.
    expect(screen.getByText("2 of 3 done")).toBeInTheDocument();
    expect(screen.getByText(/Still to finish: Sam$/)).toBeInTheDocument();
  });

  it("downloads the class table as a CSV named for the class", async () => {
    serve(detail);
    const user = await openClass();
    let blob: Blob | undefined;
    const create = vi.fn((b: Blob) => ((blob = b), "blob:csv"));
    Object.defineProperty(URL, "createObjectURL", { configurable: true, value: create });
    Object.defineProperty(URL, "revokeObjectURL", { configurable: true, value: vi.fn() });
    let name = "";
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
      name = this.download;
    });
    await user.click(screen.getByRole("button", { name: "Download as spreadsheet (CSV)" }));
    expect(click).toHaveBeenCalledOnce();
    expect(name).toMatch(/^room-3-practice-\d{4}-\d{2}-\d{2}\.csv$/);
    const text = await blob!.text();
    expect(text).toContain(`not a report-card mark`);
    expect(text).toContain("Student,Grade,Last active,Counting: level");
    expect(text).toContain("Maya,3,");
    expect(text).toContain("Sam,3,");
  });

  it("cancels a pending co-teacher invitation", async () => {
    serve({ ...detail, role: "owner", teachers: [{ id: "o", email: "owner@example.com", role: "owner" }], invites: [{ email: "wait@example.com", createdAt: 1 }] });
    const user = await openClass();
    await openTab(user, "Settings");
    await user.click(screen.getByRole("button", { name: "Cancel invitation for wait@example.com" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/teachers/?classId=class-1&invite=wait%40example.com", "DELETE", undefined));
  });

  it("shows an action's error on the class page", async () => {
    serve(detail, (url, method) => (url === "/api/classes/?id=class-1" && method === "PATCH" ? Promise.reject(new Error("Try again in a minute.")) : undefined));
    const user = await openClass();
    await openTab(user, "Students");
    await user.click(screen.getByRole("button", { name: "Get a new code" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Try again in a minute.");
  });

  it("shows why a class couldn't be opened", async () => {
    serve(detail, (url) => (url === "/api/classes/?id=class-1" ? Promise.reject(new Error("This class was closed.")) : undefined));
    const user = userEvent.setup();
    render(<TeacherApp />);
    await user.click(await screen.findByRole("button", { name: /^Room 3/ }));
    expect(await screen.findByText("This class was closed.")).toBeInTheDocument();
  });

  it("splits the class into tabs, like the parent area, with one address per tab", async () => {
    serve({ ...detail, role: "owner", teachers: [{ id: "o", email: "owner@example.com", role: "owner" }], invites: [] });
    const user = await openClass();
    const nav = screen.getByRole("navigation", { name: "Class sections" });
    expect(within(nav).getAllByRole("link").map((l) => l.textContent?.trim())).toEqual(["← All classes", "📈 Progress", "📝 Homework", "🙋 Live", "🧒 Students", "⚙️ Settings"]);
    // Progress is the everyday view: the class opens on it, and nothing from the other tabs shows.
    expect(within(nav).getByRole("link", { name: /Progress/ })).toHaveAttribute("aria-current", "page");
    expect(window.location.hash).toBe("#/class/class-1");
    expect(screen.getByRole("heading", { name: "Students (3)" })).toBeInTheDocument();
    for (const name of ["Homework", "Student logins", "Teachers", "Close this class"]) expect(screen.queryByRole("heading", { name })).not.toBeInTheDocument();

    await openTab(user, "Students");
    expect(window.location.hash).toBe("#/class/class-1/students");
    expect(screen.getByRole("heading", { name: "Class code" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Student logins" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Send home" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^Students \(/ })).not.toBeInTheDocument();

    await openTab(user, "Settings");
    expect(screen.getByRole("heading", { name: "Teachers" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Close this class" })).toBeInTheDocument();
    // Switching tabs doesn't fetch the class again.
    expect(mocks.call.mock.calls.filter(([u]) => u === "/api/classes/?id=class-1")).toHaveLength(1);

    await user.click(within(nav).getByRole("link", { name: "← All classes" }));
    expect(await screen.findByRole("heading", { name: "Your classes" })).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Class sections" })).not.toBeInTheDocument();
  });

  it("opens a tab from its address, and Progress for one it doesn't know", async () => {
    serve(detail);
    window.location.hash = "#/class/class-1/homework";
    render(<TeacherApp />);
    expect(await screen.findByRole("heading", { name: "Homework" })).toBeInTheDocument();
    window.location.hash = "#/class/class-1/nope";
    expect(await screen.findByRole("heading", { name: "Students (3)" })).toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "Class sections" })).getByRole("link", { name: /Progress/ })).toHaveAttribute("aria-current", "page");
  });

  it("sorts the progress table, filters it by subject, and shows one student on their own", async () => {
    const sci = (level: number, attempts = 0, accuracy = 0) => ({ key: "3/science/plants", level, attempts, accuracy });
    const multi = {
      ...detail,
      assignments: [...detail.assignments, "3/science/plants"],
      students: detail.students.map((s, i) => ({ ...s, units: [...s.units, sci(i === 0 ? 1 : -1, i === 0 ? 4 : 0, 0.5)] })),
    };
    serve(multi);
    const user = await openClass();
    const names = () => screen.getAllByRole("rowheader").map((r) => r.textContent?.match(/^(Maya|Sam|Alex)/)?.[0]);
    expect(names()).toEqual(["Alex", "Maya", "Sam"]);
    await user.selectOptions(screen.getByLabelText("Sort by"), "need");
    // Lowest accuracy on what they have tried comes first.
    expect(names()).toEqual(["Sam", "Maya", "Alex"]);
    await user.selectOptions(screen.getByLabelText("Sort by"), "active");
    expect(names()).toEqual(["Sam", "Alex", "Maya"]);
    await user.selectOptions(screen.getByLabelText("Subject"), "science");
    expect(screen.getByRole("columnheader", { name: "3/science/plants" })).toBeInTheDocument();
    expect(screen.queryByRole("columnheader", { name: "Counting" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Show only Sam" }));
    expect(names()).toEqual(["Sam"]);
    expect(screen.getByText("Showing Sam only.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Show everyone" }));
    expect(names()).toHaveLength(3);
  });

  it("picks several students to print cards for, reset codes or remove, with one reload", async () => {
    serve({ ...detail, role: "owner", teachers: [], invites: [] });
    const user = await openClass();
    await openTab(user, "Students");
    await user.click(screen.getByRole("checkbox", { name: "Select all" }));
    expect(screen.getByText("2 selected")).toBeInTheDocument();
    await user.click(screen.getByRole("checkbox", { name: "Select Maya" }));
    expect(screen.getByText("1 selected")).toBeInTheDocument();
    await user.click(screen.getByRole("checkbox", { name: "Select Maya" }));
    const loads = () => mocks.call.mock.calls.filter(([u]) => u === "/api/classes/?id=class-1").length;
    const before = loads();
    await user.click(screen.getByRole("button", { name: "New codes for selected" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/students/?classId=class-1&studentId=r2", "PATCH"));
    expect(mocks.call).toHaveBeenCalledWith("/api/classes/students/?classId=class-1&studentId=r1", "PATCH");
    await waitFor(() => expect(loads()).toBe(before + 1));
    await user.click(screen.getByRole("checkbox", { name: "Select all" }));
    await user.click(screen.getByRole("button", { name: "Remove selected" }));
    expect(screen.getByRole("dialog", { name: "Remove 2 students?" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Yes, remove" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/students/?classId=class-1&studentId=r1", "DELETE"));
    expect(mocks.call).toHaveBeenCalledWith("/api/classes/students/?classId=class-1&studentId=r2", "DELETE");
  });

  it("prints cards for the chosen students only", async () => {
    let printed = "";
    const print = vi.fn(() => {
      printed = document.body.textContent ?? "";
    });
    window.print = print;
    serve({ ...detail, role: "owner", teachers: [], invites: [] });
    const user = await openClass();
    await openTab(user, "Students");
    await user.click(screen.getByRole("checkbox", { name: "Select Sam" }));
    await user.click(screen.getByRole("button", { name: "Print cards for selected" }));
    await waitFor(() => expect(print).toHaveBeenCalled());
    expect(printed).toContain("My code: MN34RT");
    expect(printed).not.toContain("My code: ZX91PQ");
  });

  it("renames the class from Settings", async () => {
    serve({ ...detail, role: "owner", teachers: [{ id: "o", email: "owner@example.com", role: "owner" }], invites: [] });
    const user = await openClass();
    await openTab(user, "Settings");
    expect(screen.getByRole("button", { name: "Save name" })).toBeDisabled();
    const input = screen.getByLabelText("Name");
    await user.clear(input);
    await user.type(input, "Room 4");
    await user.click(screen.getByRole("button", { name: "Save name" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/?id=class-1", "PATCH", { name: "Room 4" }));
  });

  it("moves the class up a grade only after a second tap, and says so at the last grade", async () => {
    const owner = { role: "owner", teachers: [{ id: "o", email: "owner@example.com", role: "owner" }], invites: [] };
    serve({ ...detail, ...owner });
    const user = await openClass();
    await openTab(user, "Settings");
    await user.click(screen.getByRole("button", { name: /^Move up to/ }));
    expect(mocks.call).not.toHaveBeenCalledWith("/api/classes/?id=class-1", "PATCH", { action: "next-year" });
    await user.click(screen.getByRole("button", { name: "Yes, move Room 3 up" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/?id=class-1", "PATCH", { action: "next-year" }));
  });

  it("has no next year for a Grade 9 class, and none of this for a co-teacher", async () => {
    serve({ ...detail, class: { ...cls, grade: "9" }, role: "owner", teachers: [{ id: "o", email: "owner@example.com", role: "owner" }], invites: [] });
    let user = await openClass();
    await openTab(user, "Settings");
    expect(screen.getByText(/already in the last grade/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Move up to/ })).not.toBeInTheDocument();
    cleanup();
    window.location.hash = "";
    serve({ ...detail, role: "teacher", teachers: [{ id: "o", email: "owner@example.com", role: "owner" }], invites: [] });
    user = await openClass();
    await openTab(user, "Settings");
    expect(screen.queryByRole("heading", { name: "Class name" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Start next school year" })).not.toBeInTheDocument();
  });

  it("removing a student can be cancelled", async () => {
    serve(detail);
    const user = await openClass();
    await openTab(user, "Students");
    await user.click(within(screen.getByLabelText("Login code M N 3 4 R T").parentElement!).getByRole("button", { name: "Remove" }));
    expect(screen.getByRole("dialog", { name: "Remove Sam?" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(mocks.call).not.toHaveBeenCalledWith(expect.stringContaining("studentId=r2"), "DELETE", undefined);
  });
});

describe("TeacherApp keyboard and screen-reader support", () => {
  it("announces what a change did, in a status region that stays on the page", async () => {
    serve(detail, (url, method) => (url.startsWith("/api/classes/students/") && method === "PATCH" ? { loginCode: "KD7Q3M2P" } : undefined));
    const user = await openClass();
    await openTab(user, "Students");
    const regions = () => screen.getAllByRole("status").filter((el) => el.getAttribute("aria-live") === "polite");
    expect(regions().every((el) => el.childElementCount === 0)).toBe(true);
    await user.click(within(screen.getByLabelText("Login code Z X 9 1 P Q").parentElement!).getByRole("button", { name: "New code" }));
    // A new code can be undone, so it is announced where the Undo button is.
    await waitFor(() => expect(regions().some((el) => el.textContent?.includes("Maya has a new code: KD7Q3M2P"))).toBe(true));
  });

  it("says a change was saved when the server answered", async () => {
    serve(detail);
    const user = await openClass();
    await openTab(user, "Homework");
    await user.click(screen.getByRole("button", { name: "Due date for Counting" }));
    await user.click(within(await screen.findByRole("dialog", { name: "Due date for Counting" })).getByRole("button", { name: "Clear date" }));
    await waitFor(() => expect(screen.getByText("Due date for Counting cleared.")).toBeInTheDocument());
  });

  it("names the class and tab in the page title and moves focus to the heading on a new tab", async () => {
    serve(detail);
    const user = await openClass();
    await waitFor(() => expect(document.title).toBe("Room 3 · Progress · For teachers · Gradelings"));
    await openTab(user, "Homework");
    expect(document.title).toBe("Room 3 · Homework · For teachers · Gradelings");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1, name: "Room 3" })).toHaveFocus());
  });

  it("titles the class list", async () => {
    serve(detail);
    render(<TeacherApp />);
    await screen.findByRole("button", { name: /^Room 3/ });
    expect(document.title).toBe("Your classes · For teachers · Gradelings");
  });

  it("closes the remove dialog with Escape and gives focus back to the button that opened it", async () => {
    serve(detail);
    const user = await openClass();
    await openTab(user, "Students");
    const remove = within(screen.getByLabelText("Login code M N 3 4 R T").parentElement!).getByRole("button", { name: "Remove" });
    await user.click(remove);
    const dialog = screen.getByRole("dialog", { name: "Remove Sam?" });
    expect(within(dialog).getByRole("button", { name: "Yes, remove" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(remove).toHaveFocus();
  });

  it("keeps Tab inside the remove dialog", async () => {
    serve(detail);
    const user = await openClass();
    await openTab(user, "Students");
    await user.click(within(screen.getByLabelText("Login code M N 3 4 R T").parentElement!).getByRole("button", { name: "Remove" }));
    const dialog = screen.getByRole("dialog", { name: "Remove Sam?" });
    await user.tab();
    expect(within(dialog).getByRole("button", { name: "Cancel" })).toHaveFocus();
    await user.tab();
    expect(within(dialog).getByRole("button", { name: "Yes, remove" })).toHaveFocus();
    await user.tab({ shift: true });
    expect(within(dialog).getByRole("button", { name: "Cancel" })).toHaveFocus();
  });

  it("makes the small buttons at least 44 px tall", async () => {
    serve(detail);
    const user = await openClass();
    await openTab(user, "Students");
    const row = screen.getByLabelText("Login code M N 3 4 R T").parentElement!;
    for (const name of ["New code", "Remove"]) expect(within(row).getByRole("button", { name })).toHaveClass("min-h-11");
    await openTab(user, "Homework");
    expect(screen.getByRole("button", { name: "Remove Counting" })).toHaveClass("min-h-11", "min-w-11");
  });
});

describe("TeacherApp live questions: read-aloud, projector view and a lost connection", () => {
  const question = { prompt: "How many?", hint: "Count them.", choices: [{ id: "a", label: "3" }, { id: "b", label: "4" }], answer: "b" };
  const openState = (extra: object = {}) => ({ id: "q1", unitKey: "3/math/counting", question: { ...question, ...extra }, revealed: false, createdAt: now, answers: [{ profileId: "p1", choice: "a", correct: false }] });

  it("lets the teacher turn read-aloud off before asking, and sends that choice", async () => {
    serve(detail, (url) => (url.startsWith("/api/classes/live/") ? { live: null } : undefined));
    const user = await openClass();
    await openTab(user, "Live");
    const box = screen.getByRole("checkbox", { name: "Let students hear the question read aloud" });
    expect(box).toBeChecked();
    await user.click(box);
    await user.click(screen.getByRole("button", { name: "Ask a live question" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/live/", "POST", { classId: "class-1", unitKey: "3/math/counting", readAloud: false }));
  });

  it("changes read-aloud for the question that is open", async () => {
    serve(detail, (url, method) => (url.startsWith("/api/classes/live/") ? { live: method === "PATCH" ? openState({ readAloud: false }) : openState() } : undefined));
    const user = await openClass();
    await openTab(user, "Live");
    const box = await screen.findByRole("checkbox", { name: "Let students hear the question read aloud" });
    await waitFor(() => expect(box).toBeChecked());
    await user.click(box);
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/live/", "PATCH", { classId: "class-1", action: "read-aloud", on: false }));
    await waitFor(() => expect(box).not.toBeChecked());
  });

  it("shows read-aloud as off for a question the teacher already muted", async () => {
    serve(detail, (url) => (url.startsWith("/api/classes/live/") ? { live: openState({ readAloud: false }) } : undefined));
    const user = await openClass();
    await openTab(user, "Live");
    await waitFor(() => expect(screen.getByRole("checkbox", { name: "Let students hear the question read aloud" })).not.toBeChecked());
  });

  it("projector view hides student names and enlarges the question", async () => {
    serve(detail, (url) => (url.startsWith("/api/classes/live/") ? { live: openState() } : undefined));
    const user = await openClass();
    await openTab(user, "Live");
    const section = screen.getByRole("region", { name: "Live questions" });
    expect(await within(section).findByText(/Waiting for: Sam, Alex/)).toBeInTheDocument();
    expect(within(section).getByText("How many?")).toHaveClass("text-2xl");
    await user.click(within(section).getByRole("checkbox", { name: "Projector view (bigger text, no names)" }));
    expect(within(section).queryByText(/Waiting for/)).not.toBeInTheDocument();
    expect(within(section).queryByText(/Answered: Maya/)).not.toBeInTheDocument();
    expect(within(section).getByText("How many?")).toHaveClass("text-4xl");
    expect(section).toHaveTextContent("1 of 3 answered");
  });

  it("says so when the tally can't be refreshed, and stops saying so once it can", async () => {
    let fail = false;
    serve(detail, (url, method) => {
      if (!url.startsWith("/api/classes/live/") || method !== "GET") return undefined;
      return fail ? Promise.reject(new Error("You’re offline.")) : { live: openState() };
    });
    const user = await openClass();
    await openTab(user, "Live");
    const section = screen.getByRole("region", { name: "Live questions" });
    await within(section).findByText("How many?");
    expect(within(section).queryByText(/Lost the connection/)).not.toBeInTheDocument();
    fail = true;
    await new Promise((r) => setTimeout(r, 2700));
    expect(await within(section).findByText(/Lost the connection/)).toBeInTheDocument();
    fail = false;
    await new Promise((r) => setTimeout(r, 2700));
    await waitFor(() => expect(within(section).queryByText(/Lost the connection/)).not.toBeInTheDocument());
  }, 15000);
});

describe("TeacherApp students", () => {
  it("warns about Last, First lines and repeated names before adding, without blocking", async () => {
    serve(detail);
    const user = await openClass();
    await openTab(user, "Students");
    await user.type(screen.getByLabelText("First names, one per line"), "Smith, Lee{Enter}Maya");
    expect(screen.getByText(/“Smith, Lee” has a comma/)).toBeInTheDocument();
    expect(screen.getByText(/More than one student would be called “Maya”/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add students" })).toBeEnabled();
    await user.click(screen.getByRole("button", { name: "Add students" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/students/", "POST", { classId: "class-1", names: ["Smith, Lee", "Maya"] }));
  });

  it("says how many students were added and how many didn't fit", async () => {
    serve(detail, (url, method) => (url === "/api/classes/students/" && method === "POST" ? { students: [{}, {}], skipped: 3, limit: 40 } : undefined));
    const user = await openClass();
    await openTab(user, "Students");
    await user.type(screen.getByLabelText("First names, one per line"), "A{Enter}B{Enter}C{Enter}D{Enter}E");
    await user.click(screen.getByRole("button", { name: "Add students" }));
    expect(await screen.findByText("Added 2 students. 3 weren’t added because a class holds up to 40 students.")).toBeInTheDocument();
  });

  it("edits a student's name and, in a split class, their grade", async () => {
    const split = { ...cls, grade2: "4" };
    serve({ ...detail, class: split }, (url, method) => (url === "/api/classes/" && method === "GET" ? { classes: [split] } : undefined));
    const user = await openClass();
    await openTab(user, "Students");
    await user.click(screen.getByRole("button", { name: "Edit Sam" }));
    const dialog = screen.getByRole("dialog", { name: "Edit Sam" });
    const field = within(dialog).getByLabelText("First name or nickname");
    expect(field).toHaveFocus();
    await user.clear(field);
    await user.type(field, "Samuel");
    await user.click(within(dialog).getByRole("combobox", { name: "Grade" }));
    await user.click(screen.getByRole("option", { name: "Grade 4" }));
    await user.click(within(dialog).getByRole("button", { name: "Save" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/students/?classId=class-1&studentId=r2", "PATCH", { name: "Samuel", grade: "4" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(screen.getByText("Samuel saved.")).toBeInTheDocument();
  });
});

describe("TeacherApp invitations", () => {
  it("declines an invitation to co-teach", async () => {
    serve(detail, (url, method) => {
      if (url === "/api/classes/" && method === "GET") return { classes: [] };
      if (url === "/api/classes/invites/" && method === "GET") return { invites: [{ classId: "class 9", name: "Room 9", grade: "4", framework: "ca-bc", from: "lead@example.com", createdAt: 1 }] };
    });
    const user = userEvent.setup();
    render(<TeacherApp />);
    const invites = await screen.findByRole("region", { name: "Invitations to co-teach" });
    expect(invites).toHaveTextContent("Room 9 (Grade 4) from lead@example.com");
    await user.click(within(invites).getByRole("button", { name: "Decline" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/invites/?classId=class%209", "DELETE"));
  });

  it("shows why answering an invitation failed", async () => {
    serve(detail, (url, method) => {
      if (url === "/api/classes/invites/" && method === "GET") return { invites: [{ classId: "c9", name: "Room 9", grade: "4", framework: "ca-bc", from: "lead@example.com", createdAt: 1 }] };
      if (url === "/api/classes/invites/" && method === "POST") return Promise.reject(new Error("That invitation has expired."));
    });
    const user = userEvent.setup();
    render(<TeacherApp />);
    await user.click(await screen.findByRole("button", { name: "Accept" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("That invitation has expired.");
  });

  it("shows why a class couldn't be created", async () => {
    serve(detail, (url, method) => (url === "/api/classes/" && method === "POST" ? Promise.reject(new Error("Give the class a name.")) : undefined));
    const user = userEvent.setup();
    render(<TeacherApp />);
    await user.type(await screen.findByLabelText("Class name"), "Room 4");
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Create class" }));
    });
    expect(await screen.findByRole("alert")).toHaveTextContent("Give the class a name.");
  });
});

describe("homework tools", () => {
  const withExtras = {
    ...detail,
    goal: { "3/math/counting": 10 },
    assignedAt: { "3/math/counting": now - 3 * DAY, "3/math/patterns": now - DAY },
    audience: { "3/math/counting": ["p1", "p2"] },
  };

  it("links each assigned unit, and the one being picked, to its public page to look at before assigning", async () => {
    serve(withExtras);
    const user = await openClass();
    await openTab(user, "Homework");
    const link = screen.getByRole("link", { name: "Preview Counting (opens in a new tab)" });
    expect(link).toHaveAttribute("href", "/curriculum/ontario/grade-3/math/counting/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(screen.getByRole("link", { name: "Preview Patterns (opens in a new tab)" })).toHaveAttribute("href", "/curriculum/ontario/grade-3/math/patterns/");
  });

  it("puts a removed unit back with its date, questions, students and the day it was first assigned", async () => {
    serve(withExtras);
    const user = await openClass();
    await openTab(user, "Homework");
    await user.click(screen.getByRole("button", { name: "Remove Counting" }));
    expect(mocks.call).toHaveBeenCalledWith("/api/classes/assignments/?classId=class-1&unitKey=3%2Fmath%2Fcounting", "DELETE", undefined);
    await screen.findByText("Counting was removed from homework.");
    // Focus goes to Undo so a keyboard user can reach it.
    const undo = screen.getByRole("button", { name: "Undo" });
    await waitFor(() => expect(undo).toHaveFocus());
    await user.click(undo);
    await waitFor(() =>
      expect(mocks.call).toHaveBeenCalledWith("/api/classes/assignments/", "POST", {
        classId: "class-1",
        unitKey: "3/math/counting",
        dueAt: detail.due["3/math/counting"],
        goal: 10,
        students: ["p1", "p2"],
        since: withExtras.assignedAt["3/math/counting"],
      }),
    );
    await screen.findByText("Counting is back in homework.");
    expect(screen.queryByRole("button", { name: "Undo" })).not.toBeInTheDocument();
  });

  it("lets a new login code be undone", async () => {
    serve(withExtras, (url, method) => (url.startsWith("/api/classes/students/") && method === "PATCH" ? { loginCode: "KD7Q3M2P" } : undefined));
    const user = await openClass();
    await openTab(user, "Students");
    await user.click(within(screen.getByLabelText("Login code Z X 9 1 P Q").parentElement!).getByRole("button", { name: "New code" }));
    await user.click(await screen.findByRole("button", { name: "Undo" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/students/?classId=class-1&studentId=r1", "PATCH", { undo: true }));
  });

  it("says plainly when it is too late to undo", async () => {
    mocks.call.mockImplementation((url: string, method = "GET", body?: unknown) => {
      if (url.startsWith("/api/classes/students/") && method === "PATCH") return (body as { undo?: boolean } | undefined)?.undo ? Promise.reject(new Error("It’s too late to undo that code change. Get a new code instead.")) : Promise.resolve({ loginCode: "KD7Q3M2P" });
      if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false } } });
      if (url === "/api/classes/" && method === "GET") return Promise.resolve({ classes: [cls] });
      if (url === "/api/classes/?id=class-1") return Promise.resolve(withExtras);
      return Promise.resolve({});
    });
    const user = await openClass();
    await openTab(user, "Students");
    await user.click(within(screen.getByLabelText("Login code Z X 9 1 P Q").parentElement!).getByRole("button", { name: "New code" }));
    await user.click(await screen.findByRole("button", { name: "Undo" }));
    expect(await screen.findByText(/too late to undo/)).toBeInTheDocument();
  });

  it("assigns several units at once with the same date, questions and students", async () => {
    serve({ ...detail, assignments: [], due: {}, assignedAt: {} });
    const user = await openClass();
    await openTab(user, "Homework");
    await user.click(screen.getByRole("button", { name: "Pick several units at once" }));
    const group = screen.getByText(/Math/, { selector: "summary" });
    await user.click(group);
    await user.click(screen.getByRole("checkbox", { name: /Counting/ }));
    await user.click(screen.getByRole("checkbox", { name: /Patterns/ }));
    await user.click(screen.getByRole("button", { name: "Tomorrow" }));
    await user.click(screen.getByRole("button", { name: "Assign 2 units" }));
    const dueAt = new Date(`${dueChips()[0].value}T23:59:00`).getTime();
    await waitFor(() => {
      expect(mocks.call).toHaveBeenCalledWith("/api/classes/assignments/", "POST", { classId: "class-1", unitKey: "3/math/counting", dueAt, goal: undefined });
      expect(mocks.call).toHaveBeenCalledWith("/api/classes/assignments/", "POST", { classId: "class-1", unitKey: "3/math/patterns", dueAt, goal: undefined });
    });
    await screen.findByText("2 units assigned.");
  });

  it("offers due-date shortcuts that can be switched off again", async () => {
    serve({ ...detail, assignments: [], due: {} });
    const user = await openClass();
    await openTab(user, "Homework");
    const tomorrow = screen.getByRole("button", { name: "Tomorrow" });
    expect(tomorrow).toHaveAttribute("aria-pressed", "false");
    await user.click(tomorrow);
    expect(tomorrow).toHaveAttribute("aria-pressed", "true");
    await user.click(tomorrow);
    expect(tomorrow).toHaveAttribute("aria-pressed", "false");
  });

  it("remembers the number of questions for the next assignment on this device", async () => {
    serve({ ...detail, assignments: [], due: {}, assignedAt: {} });
    const user = await openClass();
    await openTab(user, "Homework");
    await user.click(screen.getByRole("combobox", { name: "Add a unit" }));
    await user.click(await screen.findByRole("option", { name: /Counting/ }));
    await user.click(screen.getByRole("combobox", { name: "Questions (optional)" }));
    await user.click(await screen.findByRole("option", { name: "10 questions" }));
    await user.click(screen.getByRole("button", { name: "Assign" }));
    await waitFor(() => expect(localStorage.getItem("gradelings.teacher.lastQuestions")).toBe("10"));
    // A later visit starts with it chosen.
    cleanup();
    window.location.hash = "";
    serve({ ...detail, assignments: [], due: {}, assignedAt: {} });
    const again = await openClass();
    await openTab(again, "Homework");
    expect(screen.getByRole("combobox", { name: "Questions (optional)" })).toHaveTextContent("10 questions");
  });
});
