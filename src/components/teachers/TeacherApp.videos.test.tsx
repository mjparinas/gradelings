// @vitest-environment jsdom
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));

vi.mock("@/lib/classroom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/classroom")>();
  return { ...actual, call: mocks.call };
});
vi.mock("@/content", () => ({
  coursesForGrade: () => [],
  getUnitRef: () => undefined,
  loadGrade: vi.fn().mockResolvedValue(undefined),
}));

import { TEACHER_VIDEOS } from "@/lib/trainingVideos";
import { TeacherApp } from "./TeacherApp";

const room = { id: "class-1", name: "Room 3", grade: "3", framework: "ca-bc", joinCode: "AB12CD", students: 0 };

beforeEach(() => {
  window.location.hash = "";
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  localStorage.clear();
  mocks.call.mockReset();
  mocks.call.mockImplementation((url: string, method = "GET") => {
    if (url === "/api/auth/me/") return Promise.resolve({ family: { account: { student: false, email: "t@example.com", verified: true } } });
    if (url === "/api/classes/" && method === "GET") return Promise.resolve({ classes: [room] });
    if (url === "/api/classes/?badges=1") return Promise.resolve({ badges: {} });
    if (url.startsWith("/api/classes/?id=")) return Promise.resolve({ class: room, assignments: [], due: {}, students: [], roster: [] });
    return Promise.resolve({});
  });
});
afterEach(() => vi.useRealTimers());

describe("teacher training videos", () => {
  it("opens the class setup video once, the first time the class list shows", async () => {
    const { unmount } = render(<TeacherApp />);
    const dialog = await screen.findByRole("dialog", { name: "Set up your class" }, { timeout: 4000 });
    expect(dialog).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    unmount();
    // A second visit on the same device shows nothing by itself.
    render(<TeacherApp />);
    await screen.findByRole("heading", { name: "Your classes" });
    await act(() => new Promise((r) => setTimeout(r, 900)));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens a tab's video the first time that tab opens, not before", async () => {
    localStorage.setItem("gradelings.trainvideo.seen", JSON.stringify(["teacher-class-setup"]));
    window.location.hash = "#/class/class-1/homework";
    render(<TeacherApp />);
    expect(await screen.findByRole("dialog", { name: "Assign homework" }, { timeout: 4000 })).toBeTruthy();
  });

  it("lists every video in the library, which plays any of them again", async () => {
    localStorage.setItem("gradelings.trainvideo.seen", JSON.stringify(TEACHER_VIDEOS.map((v) => v.id)));
    window.location.hash = "#/videos";
    render(<TeacherApp />);
    await screen.findByRole("heading", { name: "Training videos" });
    for (const v of TEACHER_VIDEOS) expect(screen.getByRole("button", { name: `Watch: ${v.title}` })).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Watch: Ask live questions" }));
    expect(screen.getByRole("dialog", { name: "Ask live questions" })).toBeTruthy();
    await waitFor(() => expect(document.querySelector("video, [role=alert]")).not.toBeNull());
  });
});
