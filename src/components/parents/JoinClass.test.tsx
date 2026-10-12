// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { FamilyInfo, Profile } from "@/lib/model";

const h = vi.hoisted(() => ({ syncNow: vi.fn() }));
vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("@/lib/sync", () => ({ syncNow: h.syncNow }));

import { useStore } from "@/lib/store";
import { JoinClass } from "./JoinClass";

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
const kid = (id: string, name: string): Profile => ({ id, name, avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1 });
const signedIn: FamilyInfo = { plan: "trial", trialEndsAt: 0, updatedAt: 1, account: { email: "p@example.com", familyId: "f", verified: true } };

let links: { classId: string; profileId: string; className: string; grade: string }[];
let joinReply: () => Response;
const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input);
  const method = init?.method ?? "GET";
  if (method === "GET" && url === "/api/classes/join/") return json({ links });
  if (method === "POST" && url === "/api/classes/join/") return joinReply();
  if (method === "DELETE" && url.startsWith("/api/classes/join/?")) {
    const q = new URLSearchParams(url.split("?")[1]);
    links = links.filter((l) => !(l.classId === q.get("classId") && l.profileId === q.get("profileId")));
    return json({});
  }
  return json({ error: "unexpected" }, 500);
});

beforeEach(() => {
  links = [];
  joinReply = () => json({ error: "That class code isn't right. Check it with the teacher." }, 404);
  fetchMock.mockClear();
  vi.stubGlobal("fetch", fetchMock);
  h.syncNow.mockReset().mockResolvedValue(undefined);
  useStore.setState({ profiles: [kid("a", "Ava"), kid("b", "Ben")], family: signedIn });
});
afterEach(() => vi.unstubAllGlobals());

const codeBox = () => screen.getByRole("textbox", { name: "Class code" });

describe("JoinClass", () => {
  it("asks a signed-out parent to sign in first and loads nothing", () => {
    useStore.setState({ family: { plan: "trial", trialEndsAt: 0, updatedAt: 1 } });
    render(<JoinClass />);
    expect(screen.getByText(/Sign in under “Account & sync” first/)).toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: "Class code" })).not.toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("only enables Join once a full 6-character code is typed, in capitals", async () => {
    render(<JoinClass />);
    const join = screen.getByRole("button", { name: "Join class" });
    fireEvent.change(codeBox(), { target: { value: "abc12" } });
    expect(codeBox()).toHaveValue("ABC12");
    expect(join).toBeDisabled();
    fireEvent.change(codeBox(), { target: { value: "abc123" } });
    expect(join).toBeEnabled();
  });

  it("shows the server's error for a wrong code and keeps the code to fix", async () => {
    render(<JoinClass />);
    fireEvent.change(codeBox(), { target: { value: "ZZZZZZ" } });
    await userEvent.click(screen.getByRole("button", { name: "Join class" }));
    expect(await screen.findByRole("status")).toHaveTextContent("That class code isn't right. Check it with the teacher.");
    expect(codeBox()).toHaveValue("ZZZZZZ");
  });

  it("says the parent is offline when the code can't be sent", async () => {
    joinReply = () => {
      throw new TypeError("Failed to fetch");
    };
    render(<JoinClass />);
    fireEvent.change(codeBox(), { target: { value: "ABC123" } });
    await userEvent.click(screen.getByRole("button", { name: "Join class" }));
    expect(await screen.findByRole("status")).toHaveTextContent("You’re offline.");
  });

  it("syncs first, joins the chosen child, then lists the class and syncs again", async () => {
    joinReply = () => {
      links = [{ classId: "c1", profileId: "b", className: "Room 12", grade: "3" }];
      return json({ link: links[0] });
    };
    render(<JoinClass />);
    await userEvent.click(screen.getByRole("combobox", { name: "Child" }));
    fireEvent.pointerDown(screen.getByRole("option", { name: "Ben" }));
    fireEvent.change(codeBox(), { target: { value: "ABC123" } });
    await userEvent.click(screen.getByRole("button", { name: "Join class" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Joined Room 12. The teacher can now see first name, grade and practice results");
    const post = fetchMock.mock.calls.find(([, i]) => i?.method === "POST")!;
    expect(JSON.parse(String(post[1]!.body))).toEqual({ code: "ABC123", profileId: "b" });
    // The child must exist on the server before joining, and the assigned units come down after.
    expect(h.syncNow.mock.invocationCallOrder[0]).toBeLessThan(fetchMock.mock.invocationCallOrder[fetchMock.mock.calls.indexOf(post)]);
    expect(h.syncNow).toHaveBeenCalledTimes(2);
    expect(codeBox()).toHaveValue("");
    expect(await screen.findByText("Room 12")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveTextContent("Ben is in Room 12");
  });

  it("still joins when the first sync fails (offline sync is not fatal)", async () => {
    h.syncNow.mockRejectedValue(new Error("offline"));
    joinReply = () => json({ link: { classId: "c1", profileId: "a", className: "Room 4", grade: "3" } });
    render(<JoinClass />);
    fireEvent.change(codeBox(), { target: { value: "ABC123" } });
    await userEvent.click(screen.getByRole("button", { name: "Join class" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Joined Room 4.");
  });

  it("lets a parent leave a class, which removes the link", async () => {
    links = [{ classId: "c 1", profileId: "a", className: "Room 7", grade: "3" }];
    render(<JoinClass />);
    expect(await screen.findByText("Room 7")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Leave class" }));
    await waitFor(() => expect(screen.queryByText("Room 7")).not.toBeInTheDocument());
    expect(fetchMock.mock.calls.some(([u, i]) => String(u) === "/api/classes/join/?classId=c%201&profileId=a" && i?.method === "DELETE")).toBe(true);
    expect(h.syncNow).toHaveBeenCalled();
  });

  it("shows the error when leaving fails", async () => {
    links = [{ classId: "c1", profileId: "zz", className: "Room 7", grade: "3" }];
    fetchMock.mockImplementationOnce(async () => json({ links }));
    fetchMock.mockImplementationOnce(async () => json({ error: "Couldn't leave the class." }, 500));
    render(<JoinClass />);
    // A child no longer on this device still shows, as "Child".
    expect(await screen.findByText("Child")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Leave class" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Couldn't leave the class.");
  });
});
