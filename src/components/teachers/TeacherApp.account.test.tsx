// @vitest-environment jsdom
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));

vi.mock("@/lib/classroom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/classroom")>();
  return { ...actual, call: mocks.call };
});
vi.mock("@/content", () => ({
  coursesForGrade: () => [{ grade: "3", subject: "math", units: [{ id: "counting", emoji: "🔢", title: "Counting" }] }],
  getUnitRef: (key: string) => (key === "3/math/counting" ? { unit: { title: "Counting", emoji: "🔢" } } : undefined),
  loadGrade: vi.fn().mockResolvedValue(undefined),
}));

import { TeacherApp } from "./TeacherApp";

const room3 = { id: "class-1", name: "Room 3", grade: "3", framework: "ca-bc", joinCode: "AB12CD", students: 2 };
const room4 = { id: "class-2", name: "Room 4", grade: "4", framework: "ca-bc", joinCode: "EF34GH", students: 1 };
const empty = { id: "class-1", name: "Room 3", grade: "3", framework: "ca-bc", joinCode: "AB12CD" };

let detail: Record<string, unknown>;

beforeEach(() => {
  window.location.hash = "";
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  localStorage.clear();
  detail = { class: empty, assignments: [], due: {}, students: [], roster: [] };
  mocks.call.mockReset();
  mocks.call.mockImplementation((url: string, method = "GET") => {
    if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false, email: "t@example.com", verified: true } } });
    if (url === "/api/classes/" && method === "GET") return Promise.resolve({ classes: [room3, room4] });
    if (url === "/api/classes/?badges=1")
      return Promise.resolve({
        badges: {
          "class-1": { checkIn: 0, pastDue: 0, lastPractice: Date.now() - 2 * 86_400_000 },
          "class-2": { checkIn: 3, pastDue: 1, lastPractice: Date.now() - 3_600_000 },
        },
      });
    if (url.startsWith("/api/classes/?id=")) return Promise.resolve(detail);
    return Promise.resolve({});
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("class list", () => {
  it("shows who to check in with, what is past due and the last practice on each class", async () => {
    render(<TeacherApp />);
    await screen.findByText("3 to check in with");
    expect(screen.getByText("1 past due")).toBeInTheDocument();
    expect(screen.getByText("Last practice 1 hour ago")).toBeInTheDocument();
    expect(screen.getByText("Last practice 2 days ago")).toBeInTheDocument();
  });

  it("still lists the classes when the badges can't be loaded", async () => {
    const base = mocks.call.getMockImplementation()!;
    mocks.call.mockImplementation((url: string, method?: string) => (url === "/api/classes/?badges=1" ? Promise.reject(new Error("busy")) : base(url, method)));
    render(<TeacherApp />);
    await screen.findByText("Room 4");
    expect(screen.queryByText(/to check in with/)).not.toBeInTheDocument();
  });

  it("sorts by what needs attention first", async () => {
    const user = userEvent.setup();
    render(<TeacherApp />);
    await screen.findByText("3 to check in with");
    const names = () => screen.getAllByRole("heading", { level: 1 }).length && Array.from(document.querySelectorAll("ul li button span.text-xl")).map((n) => n.textContent);
    expect(names()).toEqual(["Room 3", "Room 4"]);
    await user.click(screen.getByRole("combobox", { name: /Sort classes by/ }));
    await user.click(await screen.findByRole("option", { name: "Needs attention" }));
    await waitFor(() => expect(names()).toEqual(["Room 4", "Room 3"]));
  });

  it("hides a finished class on this device and brings it back", async () => {
    const user = userEvent.setup();
    render(<TeacherApp />);
    await screen.findByText("Room 4");
    await user.click(screen.getByRole("button", { name: "Hide Room 3 from this list" }));
    expect(screen.queryByText("Room 3")).not.toBeInTheDocument();
    expect(localStorage.getItem("gradelings.teacher.hiddenClasses")).toBe("class-1");
    await user.click(screen.getByRole("button", { name: "Show 1 hidden class" }));
    expect(screen.getByText("Room 3")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Show Room 3 again" }));
    expect(localStorage.getItem("gradelings.teacher.hiddenClasses")).toBeNull();
  });
});

describe("class page", () => {
  it("says when the results were fetched and refreshes them on request", async () => {
    window.location.hash = "#/class/class-1";
    const user = userEvent.setup();
    render(<TeacherApp />);
    await screen.findByText(/Updated just now/);
    const loads = () => mocks.call.mock.calls.filter(([u]) => u === "/api/classes/?id=class-1").length;
    const before = loads();
    await user.click(screen.getByRole("button", { name: "Refresh" }));
    await waitFor(() => expect(loads()).toBe(before + 1));
  });

  it("refreshes Progress by itself about every 90 seconds", async () => {
    window.location.hash = "#/class/class-1";
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(<TeacherApp />);
    await screen.findByText(/Updated just now/);
    const loads = () => mocks.call.mock.calls.filter(([u]) => u === "/api/classes/?id=class-1").length;
    const before = loads();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(91_000);
    });
    expect(loads()).toBeGreaterThan(before);
  });

  it("walks a new teacher through the first steps and can be put away", async () => {
    window.location.hash = "#/class/class-1";
    const user = userEvent.setup();
    render(<TeacherApp />);
    const list = await screen.findByRole("region", { name: "Getting started" });
    expect(within(list).getByText("Add your students")).toBeInTheDocument();
    expect(within(list).getByRole("link", { name: "Open Homework" })).toHaveAttribute("href", "#/class/class-1/homework");
    await user.click(within(list).getByRole("button", { name: "Hide this checklist" }));
    expect(screen.queryByRole("region", { name: "Getting started" })).not.toBeInTheDocument();
    expect(localStorage.getItem("gradelings.teacher.hideChecklist")).toBe("1");
  });

  it("drops the checklist once the class is up and running", async () => {
    detail = {
      class: empty,
      assignments: ["3/math/counting"],
      due: {},
      students: [{ profileId: "p1", name: "Maya", avatar: "otter", grade: "3", lastActive: Date.now(), units: [{ key: "3/math/counting", level: 1, attempts: 5, accuracy: 0.8 }] }],
      roster: [],
    };
    window.location.hash = "#/class/class-1";
    render(<TeacherApp />);
    await screen.findByText(/Updated just now/);
    expect(screen.queryByRole("region", { name: "Getting started" })).not.toBeInTheDocument();
  });
});

describe("sign-in page", () => {
  it("says what the teacher area is for", async () => {
    mocks.call.mockImplementation((url: string) => (url === "/api/auth/me/" ? Promise.reject(new Error("no")) : Promise.resolve({})));
    render(<TeacherApp />);
    await screen.findByRole("heading", { name: "Teacher sign in" });
    expect(screen.getByText(/Students sign in with a code you give them/)).toBeInTheDocument();
  });
});

describe("account page", () => {
  const open = async () => {
    window.location.hash = "#/account";
    const user = userEvent.setup();
    render(<TeacherApp />);
    await screen.findByRole("heading", { name: "Your account" });
    return user;
  };

  it("is reached from the header and names the account", async () => {
    render(<TeacherApp />);
    await screen.findByText("Room 4");
    expect(screen.getByRole("link", { name: "Account" })).toHaveAttribute("href", "#/account");
  });

  it("changes the password with the current one", async () => {
    const user = await open();
    expect(screen.getByText("Signed in as t@example.com")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Current password"), "old-password");
    await user.type(screen.getByLabelText(/New password/), "new-password-1");
    await user.click(screen.getByRole("button", { name: "Change password" }));
    await screen.findByText("Password changed. Other devices were signed out.");
    expect(mocks.call).toHaveBeenCalledWith("/api/auth/password/", "POST", { current: "old-password", password: "new-password-1" });
  });

  it("shows why a password change failed", async () => {
    const base = mocks.call.getMockImplementation()!;
    mocks.call.mockImplementation((url: string, method?: string) => (url === "/api/auth/password/" ? Promise.reject(new Error("Your current password isn't right.")) : base(url, method)));
    const user = await open();
    await user.type(screen.getByLabelText("Current password"), "nope");
    await user.type(screen.getByLabelText(/New password/), "new-password-1");
    await user.click(screen.getByRole("button", { name: "Change password" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Your current password isn't right.");
  });

  it("signs out the other devices and says how many", async () => {
    const base = mocks.call.getMockImplementation()!;
    mocks.call.mockImplementation((url: string, method?: string) => (url === "/api/auth/sessions/" ? Promise.resolve({ removed: 2 }) : base(url, method)));
    const user = await open();
    await user.click(screen.getByRole("button", { name: "Sign out of other devices" }));
    await screen.findByText(/Signed out of 2 other devices/);
    expect(mocks.call).toHaveBeenCalledWith("/api/auth/sessions/", "DELETE");
  });

  it("explains what deleting does to classes, then asks for the password before deleting", async () => {
    const user = await open();
    expect(screen.getByText(/passes to the co-teacher who has been there longest/)).toBeInTheDocument();
    expect(screen.getByText(/Any children, progress or subscription on it are deleted too/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Delete my account…" }));
    const dialog = await screen.findByRole("dialog", { name: "Delete your account?" });
    expect(mocks.call).not.toHaveBeenCalledWith("/api/account/", "DELETE", expect.anything());
    await user.type(within(dialog).getByLabelText("Password"), "my-password");
    await user.click(within(dialog).getByRole("button", { name: "Delete my account" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/account/", "DELETE", { password: "my-password" }));
    await screen.findByRole("heading", { name: "Teacher sign in" });
  });

  it("keeps the account when Keep my account is chosen", async () => {
    const user = await open();
    await user.click(screen.getByRole("button", { name: "Delete my account…" }));
    await user.click(await screen.findByRole("button", { name: "Keep my account" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(mocks.call).not.toHaveBeenCalledWith("/api/account/", "DELETE", expect.anything());
  });
});
