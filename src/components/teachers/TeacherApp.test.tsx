// @vitest-environment jsdom
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FRAMEWORKS } from "@/content/frameworks";
import { APP_NAME, WORDMARK_COLOURS } from "@/lib/brand";
import { US_CLASS_CONSENT } from "@/lib/classroom";

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
  getUnitRef: (key: string) => key === "3/math/counting" ? { unit: { title: "Counting", emoji: "🔢" } } : undefined,
  loadGrade: vi.fn().mockResolvedValue(undefined),
}));

import { TeacherApp } from "./TeacherApp";

const cls = { id: "class-1", name: "Room 3", grade: "3", framework: "ca-bc", joinCode: "AB12CD", students: 1 };
const detail = {
  class: cls,
  assignments: ["3/math/counting"],
  due: {},
  students: [{
    profileId: "profile-1", name: "Maya", avatar: "otter", grade: "3", lastActive: null,
    units: [{ key: "3/math/counting", level: 0, attempts: 5, accuracy: 0.4 }],
  }],
  roster: [{ id: "roster-1", profileId: "profile-1", loginCode: "ZX91PQ" }],
};

beforeEach(() => {
  window.location.hash = "";
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  localStorage.clear();
  mocks.call.mockReset();
  mocks.call.mockImplementation((url: string, method = "GET") => {
    if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false } } });
    if (url === "/api/auth/login/" || url === "/api/auth/signup/" || url === "/api/auth/logout/") return Promise.resolve({});
    if (url === "/api/classes/" && method === "GET") return Promise.resolve({ classes: [cls] });
    if (url === "/api/classes/" && method === "POST") return Promise.resolve({ class: cls });
    if (url === "/api/classes/?id=class-1") return Promise.resolve(detail);
    return Promise.resolve({});
  });
});

afterEach(() => vi.restoreAllMocks());

/** Opens one of the class page's tabs from the header, and waits for it to show. */
async function openTab(user: ReturnType<typeof userEvent.setup>, name: string) {
  const link = within(screen.getByRole("navigation", { name: "Class sections" })).getByRole("link", { name: new RegExp(name) });
  await user.click(link);
  await waitFor(() => expect(link).toHaveAttribute("aria-current", "page"));
}


describe("TeacherApp", () => {
  it("shows the coloured wordmark linking home, like the public site", async () => {
    render(<TeacherApp />);
    const logo = screen.getByRole("link", { name: APP_NAME });
    expect(logo).toHaveAttribute("href", "/");
    const letters = Array.from(logo.querySelectorAll("span"));
    expect(letters.map((s) => s.textContent).join("")).toBe(APP_NAME);
    expect(letters[0].style.color).not.toBe("");
    expect(new Set(letters.map((s) => s.style.color)).size).toBe(new Set(WORDMARK_COLOURS).size);
    await screen.findByRole("heading", { name: "Your classes" });
  });

  it("keeps student sessions out of teacher classes and offers the teacher sign-in flow", async () => {
    mocks.call.mockResolvedValueOnce({ family: { account: { student: true } } });
    const user = userEvent.setup();
    render(<TeacherApp />);

    expect(await screen.findByRole("heading", { name: "Teacher sign in" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Your classes" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "New here? Create an account" }));
    expect(screen.getByRole("heading", { name: "Create a teacher account" })).toBeInTheDocument();

    await user.type(screen.getByLabelText("Email"), "teacher@example.com");
    await user.type(screen.getByLabelText("Password"), "long-enough-password");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(await screen.findByRole("heading", { name: "Your classes" })).toBeInTheDocument();
    expect(mocks.call).toHaveBeenCalledWith("/api/auth/signup/", "POST", { email: "teacher@example.com", password: "long-enough-password" });
  });

  it("shows a useful sign-in error and lets the teacher try again", async () => {
    mocks.call.mockImplementation((url: string, method = "GET") => {
      if (url === "/api/auth/me/") return Promise.reject(new Error("Please sign in."));
      if (url === "/api/auth/login/" && method === "POST") return Promise.reject(new Error("Email or password is incorrect."));
      return Promise.resolve({});
    });
    const user = userEvent.setup();
    render(<TeacherApp />);
    await user.type(await screen.findByLabelText("Email"), "teacher@example.com");
    await user.type(screen.getByLabelText("Password"), "wrong-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Email or password is incorrect.");
    expect(screen.getByRole("button", { name: "Sign in" })).toBeEnabled();
    expect(screen.queryByRole("heading", { name: "Your classes" })).not.toBeInTheDocument();
  });

  it("shows a class-list loading error instead of silently displaying an empty roster", async () => {
    mocks.call.mockImplementation((url: string, method = "GET") => {
      if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false } } });
      if (url === "/api/classes/" && method === "GET") return Promise.reject(new Error("Could not load classes."));
      return Promise.resolve({});
    });
    render(<TeacherApp />);

    expect(await screen.findByRole("heading", { name: "Your classes" })).toBeInTheDocument();
    expect(await screen.findByRole("alert")).toHaveTextContent("Could not load classes.");
    expect(screen.queryByText("No classes yet.")).not.toBeInTheDocument();
  });

  it("lets a teacher sign out and return to the sign-in screen", async () => {
    const user = userEvent.setup();
    render(<TeacherApp />);
    expect(await screen.findByRole("heading", { name: "Your classes" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Sign out" }));

    expect(await screen.findByRole("heading", { name: "Teacher sign in" })).toBeInTheDocument();
    expect(mocks.call).toHaveBeenCalledWith("/api/auth/logout/", "POST");
  });

  it("creates a class with the selected grade and province, then opens it", async () => {
    const user = userEvent.setup();
    render(<TeacherApp />);
    await user.click(await screen.findByRole("button", { name: /^Room 3/ }));
    expect(await screen.findByRole("heading", { name: "Room 3" })).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: /All classes/ }));

    await user.type(await screen.findByLabelText("Class name"), "Ontario Room");
    await user.click(screen.getByRole("combobox", { name: "Grade" }));
    await user.click(screen.getByRole("option", { name: "Grade 4" }));
    // "Province", or "Province or state" once a US state is offered.
    await user.click(screen.getByRole("combobox", { name: /^Province/ }));
    await user.click(screen.getByRole("option", { name: "Ontario" }));
    expect(screen.queryByText(US_CLASS_CONSENT)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Create class" }));

    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/", "POST", {
      name: "Ontario Room", grade: "4", framework: "ca-on",
    }));
    expect(await screen.findByText("Students (1)")).toBeInTheDocument();
  });

  it("creates a split class with a second grade next to the first", async () => {
    const user = userEvent.setup();
    render(<TeacherApp />);
    await user.type(await screen.findByLabelText("Class name"), "Room 3/4");
    await user.click(screen.getByRole("combobox", { name: "Grade" }));
    await user.click(screen.getByRole("option", { name: "Grade 3" }));
    await user.click(screen.getByRole("combobox", { name: "Second grade (split class)" }));
    // Only the grades either side, after None.
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["None", "Grade 2", "Grade 4"]);
    await user.click(screen.getByRole("option", { name: "Grade 4" }));
    await user.click(screen.getByRole("button", { name: "Create class" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/", "POST", { name: "Room 3/4", grade: "3", grade2: "4", framework: "ca-bc" }));
  });

  it("names both grades of a split class, in Canadian and US wording", async () => {
    const split = { ...cls, id: "class-s", name: "Room 3/4", grade: "3", grade2: "4" };
    const wa = { ...cls, id: "class-w", name: "Room W", grade: "3", grade2: "4", framework: "us-wa" };
    const base = mocks.call.getMockImplementation()!;
    mocks.call.mockImplementation((url: string, method = "GET") => {
      if (url === "/api/classes/" && method === "GET") return Promise.resolve({ classes: [split, wa] });
      return base(url, method);
    });
    render(<TeacherApp />);
    expect(await screen.findByText(/Grades 3 and 4 · British Columbia/)).toBeInTheDocument();
    expect(screen.getByText(/3rd and 4th grade · Washington/)).toBeInTheDocument();
  });

  it("tells the teacher of a Washington class that the school consents for students, and not a Canadian one", async () => {
    const user = userEvent.setup();
    const wa = { ...cls, id: "class-wa", name: "Room 4W", grade: "4", framework: "us-wa" };
    const base = mocks.call.getMockImplementation()!;
    mocks.call.mockImplementation((url: string, method = "GET") => {
      if (url === "/api/classes/" && method === "GET") return Promise.resolve({ classes: [cls, wa] });
      if (url === "/api/classes/?id=class-wa") return Promise.resolve({ ...detail, class: wa });
      return base(url, method);
    });
    render(<TeacherApp />);
    // US grade names on the class list.
    expect(await screen.findByText(/4th grade · Washington/)).toBeInTheDocument();
    await user.click(await screen.findByRole("button", { name: /^Room 4W/ }));
    await screen.findByRole("heading", { name: "Room 4W" });
    await openTab(user, "Students");
    expect(screen.getByText(US_CLASS_CONSENT)).toBeInTheDocument();
    expect(US_CLASS_CONSENT).toMatch(/FERPA/);
    expect(US_CLASS_CONSENT).toMatch(/COPPA/);
    await user.click(screen.getByRole("link", { name: /All classes/ }));
    await user.click(await screen.findByRole("button", { name: /^Room 3/ }));
    expect(await screen.findByRole("heading", { name: "Room 3" })).toBeInTheDocument();
    await openTab(user, "Students");
    expect(screen.queryByText(US_CLASS_CONSENT)).not.toBeInTheDocument();
  });

  it.runIf(FRAMEWORKS.some((f) => f.id === "us-wa"))("offers Washington when creating a class, with the school-consent line", async () => {
    const user = userEvent.setup();
    render(<TeacherApp />);
    await user.click(await screen.findByRole("combobox", { name: "Province or state" }));
    expect(screen.getByRole("group", { name: "United States" })).toBeInTheDocument();
    await user.click(screen.getByRole("option", { name: "Washington" }));
    expect(screen.getByText(US_CLASS_CONSENT)).toBeInTheDocument();
    await user.click(screen.getByRole("combobox", { name: "Grade" }));
    expect(screen.getByRole("option", { name: "4th grade" })).toBeInTheDocument();
  });

  it("shows practice as practice, sends due dates and adds students by name", async () => {
    const user = userEvent.setup();
    render(<TeacherApp />);
    await user.click(await screen.findByRole("button", { name: /^Room 3/ }));

    expect(await screen.findByText(`This reflects practice in ${APP_NAME}, not a report-card mark. You decide proficiency.`)).toBeInTheDocument();
    // In the table and under "Check in with".
    expect(screen.getAllByText("Maya")).toHaveLength(2);
    expect(screen.getByText(/Hasn’t started yet/)).toBeInTheDocument();

    await openTab(user, "Homework");
    await user.click(screen.getByRole("button", { name: "Due date for Counting" }));
    const calendar = await screen.findByRole("dialog", { name: "Due date for Counting" });
    await user.click(within(calendar).getByRole("button", { name: /^1 / }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/assignments/", "PATCH", expect.objectContaining({
      classId: "class-1", unitKey: "3/math/counting", dueAt: expect.any(Number),
    })));

    await openTab(user, "Students");
    expect(screen.getByLabelText("Login code Z X 9 1 P Q")).toHaveTextContent("ZX91PQ");
    await user.type(screen.getByLabelText("First names, one per line"), "Sam, Alex P.");
    await user.click(screen.getByRole("button", { name: "Add students" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/students/", "POST", {
      classId: "class-1", names: ["Sam", "Alex P."],
    }));
  });

  it("lets a teacher rotate the class code and add or remove assigned units", async () => {
    const user = userEvent.setup();
    render(<TeacherApp />);
    await user.click(await screen.findByRole("button", { name: /^Room 3/ }));
    await screen.findByRole("heading", { name: "Room 3" });

    await openTab(user, "Students");
    await user.click(screen.getByRole("button", { name: "Get a new code" }));
    expect(mocks.call).toHaveBeenCalledWith("/api/classes/?id=class-1", "PATCH", undefined);
    await openTab(user, "Homework");

    await user.click(screen.getByRole("combobox", { name: "Add a unit" }));
    await user.click(screen.getByRole("option", { name: /Patterns/ }));
    await user.click(screen.getByRole("button", { name: "Assign" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/assignments/", "POST", {
      classId: "class-1", unitKey: "3/math/patterns", dueAt: undefined,
    }));

    await user.click(screen.getByRole("button", { name: "Remove Counting" }));
    expect(mocks.call).toHaveBeenCalledWith("/api/classes/assignments/?classId=class-1&unitKey=3%2Fmath%2Fcounting", "DELETE", undefined);
  });

  it("requires confirmation before deleting a student or closing a class", async () => {
    const user = userEvent.setup();
    render(<TeacherApp />);
    await user.click(await screen.findByRole("button", { name: /^Room 3/ }));
    await screen.findByRole("heading", { name: "Room 3" });

    await openTab(user, "Students");
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(await screen.findByRole("dialog", { name: "Remove Maya?" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Yes, remove" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/students/?classId=class-1&studentId=roster-1", "DELETE", undefined));

    await openTab(user, "Settings");
    await user.click(screen.getByRole("button", { name: "Close class" }));
    expect(await screen.findByRole("button", { name: "Yes, close Room 3" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Yes, close Room 3" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/?id=class-1", "DELETE"));
    expect(await screen.findByRole("heading", { name: "Your classes" })).toBeInTheDocument();
  });

  it("lets the owner invite a co-teacher by email and shows pending invitations", async () => {
    mocks.call.mockImplementation((url: string, method = "GET") => {
      if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false } } });
      if (url === "/api/classes/" && method === "GET") return Promise.resolve({ classes: [cls] });
      if (url === "/api/classes/?id=class-1") {
        return Promise.resolve({ ...detail, role: "owner", teachers: [{ id: "o", email: "owner@example.com", role: "owner" }, { id: "c", email: "co@example.com", role: "co-teacher" }], invites: [{ email: "wait@example.com", createdAt: 1 }] });
      }
      return Promise.resolve({});
    });
    const user = userEvent.setup();
    render(<TeacherApp />);
    await user.click(await screen.findByRole("button", { name: /^Room 3/ }));
    await screen.findByRole("heading", { name: "Room 3" });
    await openTab(user, "Settings");
    expect(screen.getByText("co@example.com")).toBeInTheDocument();
    expect(screen.getByText(/invited, waiting to accept/)).toBeInTheDocument();
    await user.type(screen.getByLabelText("Colleague’s account email"), "new@example.com");
    await user.click(screen.getByRole("button", { name: "Invite co-teacher" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/teachers/", "POST", { classId: "class-1", email: "new@example.com" }));
    await user.click(screen.getByRole("button", { name: "Remove co@example.com" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/teachers/?classId=class-1&teacherId=c", "DELETE", undefined));
  });

  it("shows a co-teacher only the tools they have, and lets them leave", async () => {
    mocks.call.mockImplementation((url: string, method = "GET") => {
      if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false } } });
      if (url === "/api/classes/" && method === "GET") return Promise.resolve({ classes: [{ ...cls, role: "co-teacher" }] });
      if (url === "/api/classes/?id=class-1") return Promise.resolve({ ...detail, role: "co-teacher", teachers: [{ id: "o", email: "owner@example.com", role: "owner" }], invites: [] });
      return Promise.resolve({});
    });
    const user = userEvent.setup();
    render(<TeacherApp />);
    expect(await screen.findByText(/you co-teach/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /^Room 3/ }));
    await screen.findByRole("heading", { name: "Room 3" });
    await openTab(user, "Students");
    expect(screen.getByRole("button", { name: "Print login cards" })).toBeInTheDocument();
    for (const name of ["Remove", "Get a new code"]) expect(screen.queryByRole("button", { name })).not.toBeInTheDocument();
    await openTab(user, "Settings");
    expect(screen.getByRole("heading", { name: "Teachers" })).toBeInTheDocument();
    for (const name of ["Close class", "Invite co-teacher"]) expect(screen.queryByRole("button", { name })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Leave this class" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/teachers/?classId=class-1&leave=1", "DELETE"));
    expect(await screen.findByRole("heading", { name: "Your classes" })).toBeInTheDocument();
  });

  it("stays on the class and shows why when closing or leaving fails", async () => {
    const failing = (role: string) => (url: string, method = "GET") => {
      if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false } } });
      if (url === "/api/classes/" && method === "GET") return Promise.resolve({ classes: [{ ...cls, role }] });
      if (url === "/api/classes/?id=class-1" && method === "GET") return Promise.resolve({ ...detail, role, teachers: [], invites: [] });
      if (method === "DELETE") return Promise.reject(new Error("You're offline. Try again when you're connected."));
      return Promise.resolve({});
    };
    mocks.call.mockImplementation(failing("owner"));
    const user = userEvent.setup();
    const { unmount } = render(<TeacherApp />);
    await user.click(await screen.findByRole("button", { name: /^Room 3/ }));
    await screen.findByRole("heading", { name: "Room 3" });
    await openTab(user, "Settings");
    await user.click(screen.getByRole("button", { name: "Close class" }));
    await user.click(await screen.findByRole("button", { name: "Yes, close Room 3" }));
    expect(await screen.findByText("You're offline. Try again when you're connected.")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Your classes" })).not.toBeInTheDocument();
    unmount();

    mocks.call.mockImplementation(failing("co-teacher"));
    window.location.hash = "";
    render(<TeacherApp />);
    await user.click(await screen.findByRole("button", { name: /^Room 3/ }));
    await screen.findByRole("heading", { name: "Room 3" });
    await openTab(user, "Settings");
    await user.click(screen.getByRole("button", { name: "Leave this class" }));
    expect(await screen.findByText("You're offline. Try again when you're connected.")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Your classes" })).not.toBeInTheDocument();
  });

  it("keeps the typed names and email when adding students or inviting fails", async () => {
    mocks.call.mockImplementation((url: string, method = "GET") => {
      if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false } } });
      if (url === "/api/classes/" && method === "GET") return Promise.resolve({ classes: [cls] });
      if (url === "/api/classes/?id=class-1" && method === "GET") return Promise.resolve({ ...detail, role: "owner", teachers: [], invites: [] });
      if (method === "POST") return Promise.reject(new Error("That didn't work. Try again."));
      return Promise.resolve({});
    });
    const user = userEvent.setup();
    render(<TeacherApp />);
    await user.click(await screen.findByRole("button", { name: /^Room 3/ }));
    await screen.findByRole("heading", { name: "Room 3" });
    await openTab(user, "Students");
    const names = screen.getByLabelText(/First names, one per line/);
    await user.type(names, "Sam");
    await user.click(screen.getByRole("button", { name: /Add students?/ }));
    expect(await screen.findByText("That didn't work. Try again.")).toBeInTheDocument();
    expect(names).toHaveValue("Sam");

    await openTab(user, "Settings");
    const email = screen.getByLabelText("Colleague’s account email");
    await user.type(email, "new@example.com");
    await user.click(screen.getByRole("button", { name: "Invite co-teacher" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/teachers/", "POST", { classId: "class-1", email: "new@example.com" }));
    expect(email).toHaveValue("new@example.com");
    expect(screen.queryByText(/Invitation sent/)).not.toBeInTheDocument();
  });

  it("lists invitations to co-teach and accepts one", async () => {
    mocks.call.mockImplementation((url: string, method = "GET") => {
      if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false } } });
      if (url === "/api/classes/" && method === "GET") return Promise.resolve({ classes: [] });
      if (url === "/api/classes/invites/" && method === "GET") return Promise.resolve({ invites: [{ classId: "class-9", name: "Room 9", grade: "4", framework: "ca-bc", from: "lead@example.com", createdAt: 1 }] });
      return Promise.resolve({});
    });
    const user = userEvent.setup();
    render(<TeacherApp />);
    expect(await screen.findByText(/lead@example.com/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Accept" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/classes/invites/", "POST", { classId: "class-9" }));
  });

  it("lets a teacher ask for a password reset link without saying whether the email has an account", async () => {
    mocks.call.mockImplementation((url: string) => {
      if (url === "/api/auth/me/") return Promise.reject(new Error("Please sign in."));
      if (url === "/api/auth/forgot/") return Promise.resolve({ ok: true, message: "If that email has an account, we've sent a link to reset the password." });
      return Promise.resolve({});
    });
    const user = userEvent.setup();
    render(<TeacherApp />);
    await user.click(await screen.findByRole("button", { name: "Forgot your password?" }));
    expect(screen.getByRole("heading", { name: "Reset your password" })).toBeInTheDocument();
    expect(screen.queryByLabelText("Password")).not.toBeInTheDocument();
    await user.type(screen.getByLabelText("Email"), "teacher@example.com");
    await user.click(screen.getByRole("button", { name: "Email me a reset link" }));
    expect(await screen.findByRole("status")).toHaveTextContent("If that email has an account, we've sent a link to reset the password.");
    expect(mocks.call).toHaveBeenCalledWith("/api/auth/forgot/", "POST", { email: "teacher@example.com" });
    await user.click(screen.getByRole("button", { name: "Back to sign in" }));
    expect(screen.getByRole("heading", { name: "Teacher sign in" })).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("asks a teacher with an unconfirmed email to confirm it, and offers the link again, before a class can be made", async () => {
    const base = mocks.call.getMockImplementation()!;
    mocks.call.mockImplementation((url: string, method = "GET") => {
      if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false, email: "new@example.com", verified: false } } });
      return base(url, method);
    });
    const user = userEvent.setup();
    render(<TeacherApp />);
    const banner = await screen.findByRole("region", { name: "Confirm your email" });
    expect(banner).toHaveTextContent("new@example.com");
    expect(screen.getByRole("button", { name: "Create class" })).toBeDisabled();
    await user.click(within(banner).getByRole("button", { name: "Send the link again" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/auth/resend-verification/", "POST"));
    expect(await within(banner).findByRole("button", { name: /^Sent/ })).toBeDisabled();
  });

  it("shows why the confirmation link couldn't be sent again", async () => {
    const base = mocks.call.getMockImplementation()!;
    mocks.call.mockImplementation((url: string, method = "GET") => {
      if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false, verified: false } } });
      if (url === "/api/auth/resend-verification/") return Promise.reject(new Error("We've sent a few already."));
      return base(url, method);
    });
    const user = userEvent.setup();
    render(<TeacherApp />);
    await user.click(await screen.findByRole("button", { name: "Send the link again" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("We've sent a few already.");
    expect(screen.getByRole("button", { name: "Send the link again" })).toBeEnabled();
  });

  it("doesn't nag a teacher whose email is confirmed", async () => {
    const base = mocks.call.getMockImplementation()!;
    mocks.call.mockImplementation((url: string, method = "GET") => {
      if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false, verified: true } } });
      return base(url, method);
    });
    render(<TeacherApp />);
    await screen.findByRole("heading", { name: "Your classes" });
    expect(screen.queryByRole("region", { name: "Confirm your email" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create class" })).toBeEnabled();
  });

  it("turns the Monday class email on and off from the class list, saved on the account", async () => {
    mocks.call.mockImplementation((url: string, method = "GET") => {
      if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false, verified: true } } });
      if (url === "/api/classes/" && method === "GET") return Promise.resolve({ classes: [cls], mondayEmail: false });
      return Promise.resolve({});
    });
    const user = userEvent.setup();
    render(<TeacherApp />);
    const box = await screen.findByRole("checkbox", { name: /Email me every Monday/ });
    expect(box).not.toBeChecked();
    await user.click(box);
    expect(box).toBeChecked();
    expect(mocks.call).toHaveBeenCalledWith("/api/classes/digest/", "PATCH", { on: true });
    await user.click(box);
    expect(mocks.call).toHaveBeenCalledWith("/api/classes/digest/", "PATCH", { on: false });
  });

  it("hides the Monday email switch when it isn't offered", async () => {
    render(<TeacherApp />);
    await screen.findByRole("heading", { name: "Your classes" });
    expect(screen.queryByRole("checkbox", { name: /Email me every Monday/ })).not.toBeInTheDocument();
  });
});
