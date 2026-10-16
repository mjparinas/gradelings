// @vitest-environment jsdom
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getFramework } from "@/content/frameworks";
import { APP_NAME } from "@/lib/brand";

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
  await user.click(await screen.findByRole("button", { name: /Room 3/ }));
  await screen.findByRole("heading", { name: "Room 3" });
  return user;
}

beforeEach(() => {
  mocks.call.mockReset();
  window.location.hash = "";
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
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
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/live/", "POST", { classId: "class-1", unitKey: "3/math/counting" }));
    expect(await within(section).findByText("How many?")).toBeInTheDocument();
    expect(section).toHaveTextContent("1 of 3 answered");
    expect(section).toHaveTextContent("Answered: Maya");
    expect(section).toHaveTextContent("Waiting for: Sam, Alex");
    await user.click(within(section).getByRole("button", { name: "Show the answer" }));
    expect(await within(section).findByText(/answer shown to the class/)).toBeInTheDocument();
    await user.click(within(section).getByRole("button", { name: "End" }));
    expect(await within(section).findByRole("button", { name: "Ask a live question" })).toBeInTheDocument();
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
    await user.click(await screen.findByRole("button", { name: /Room 3/ }));
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
