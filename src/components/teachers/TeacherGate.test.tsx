// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock("@/lib/classroom", async (importOriginal) => ({ ...(await importOriginal<typeof import("@/lib/classroom")>()), call: mocks.call }));
vi.mock("./TeacherApp", () => ({ TeacherApp: () => <p>The teacher area</p> }));

import { knownTeacher, rememberTeacher } from "@/lib/teacherHint";
import { TeacherGate } from "./TeacherGate";

beforeEach(() => {
  localStorage.clear();
  mocks.call.mockReset();
  mocks.call.mockRejectedValue(new Error("Not signed in"));
});
afterEach(() => vi.restoreAllMocks());

describe("TeacherGate", () => {
  it("shows the create-account form at once to a device that has never had a teacher signed in", async () => {
    render(<TeacherGate />);
    expect(await screen.findByRole("heading", { name: "Create a teacher account" })).toBeInTheDocument();
    expect(screen.queryByText("The teacher area")).not.toBeInTheDocument();
  });

  it("still asks the server, and moves on if a session was there after all", async () => {
    mocks.call.mockResolvedValue({ family: { account: { student: false } } });
    render(<TeacherGate />);
    expect(await screen.findByText("The teacher area")).toBeInTheDocument();
    expect(knownTeacher()).toBe(true);
  });

  it("leaves a class student's session on the form", async () => {
    mocks.call.mockResolvedValue({ family: { account: { student: true } } });
    render(<TeacherGate />);
    expect(await screen.findByRole("heading", { name: "Create a teacher account" })).toBeInTheDocument();
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/auth/me/"));
    expect(screen.queryByText("The teacher area")).not.toBeInTheDocument();
  });

  it("opens the teacher area without the form for a device that remembers a teacher", async () => {
    rememberTeacher(true);
    render(<TeacherGate />);
    expect(await screen.findByText("The teacher area")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Create a teacher account" })).not.toBeInTheDocument();
    expect(mocks.call).not.toHaveBeenCalled();
  });

  it("opens the teacher area after creating an account, and remembers the device", async () => {
    mocks.call.mockImplementation((url: string) => (url === "/api/auth/signup/" ? Promise.resolve({}) : Promise.reject(new Error("Not signed in"))));
    const user = userEvent.setup();
    render(<TeacherGate />);
    await user.type(await screen.findByLabelText("Email"), "t@example.com");
    await user.type(screen.getByLabelText("Password"), "correct horse");
    await user.click(screen.getByRole("button", { name: "Create account" }));
    expect(await screen.findByText("The teacher area")).toBeInTheDocument();
    expect(knownTeacher()).toBe(true);
  });

  it("lets a returning teacher switch to signing in", async () => {
    const user = userEvent.setup();
    render(<TeacherGate />);
    await user.click(await screen.findByRole("button", { name: "Have an account? Sign in" }));
    expect(screen.getByRole("heading", { name: "Teacher sign in" })).toBeInTheDocument();
  });
});
