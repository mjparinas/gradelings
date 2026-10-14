// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AppEvent, FamilyInfo, Profile } from "@/lib/model";

vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));
const twa = vi.hoisted(() => ({ store: false }));
vi.mock("@/lib/twa", async (orig) => ({ ...(await orig<typeof import("@/lib/twa")>()), isStoreApp: () => twa.store }));

import { rememberMyInvite } from "@/lib/referral";
import { useStore } from "@/lib/store";
import { ShareGradelings } from "./ShareGradelings";

const DAY = 86_400_000;
const kid: Profile = { id: "a", name: "Ava", avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1 };
const guest: FamilyInfo = { plan: "trial", trialEndsAt: 0, updatedAt: 1 };
let n = 0;
const lesson = (daysAgo: number): AppEvent => ({ id: `s${n++}`, profileId: "a", t: Date.now() - daysAgo * DAY, type: "session", mode: "practice", scope: "mix", total: 8, correct: 7, ms: 300_000 }) as AppEvent;

beforeEach(() => {
  localStorage.clear();
  twa.store = false;
  useStore.setState({ profiles: [kid], events: [lesson(0), lesson(1), lesson(3)], settings: {}, family: guest });
});
afterEach(() => vi.restoreAllMocks());

describe("Share Gradelings after a good week", () => {
  it("shares the home page with the invite code and nothing about the child", async () => {
    rememberMyInvite("ABCD2345");
    const write = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText: write }, configurable: true });
    render(<ShareGradelings />);
    expect(screen.getByText("A good week of practice!")).toBeInTheDocument();
    expect(screen.getByText(/a family that joins gives you a free month/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Share Gradelings/ }));
    expect(write).toHaveBeenCalledWith(`${window.location.origin}/?ref=ABCD2345`);
    expect(write.mock.calls[0][0]).not.toContain("Ava");
    expect(await screen.findByText("Link copied!")).toBeInTheDocument();
  });

  it("waits for a good week", () => {
    useStore.setState({ events: [lesson(0), lesson(1)] });
    const { container } = render(<ShareGradelings />);
    expect(container).toBeEmptyDOMElement();
  });

  it("stays away for a month after Not now", async () => {
    const { unmount } = render(<ShareGradelings />);
    await userEvent.click(screen.getByRole("button", { name: "Not now" }));
    expect(screen.queryByText("A good week of practice!")).not.toBeInTheDocument();
    unmount();
    expect(render(<ShareGradelings />).container).toBeEmptyDOMElement();
  });

  it("is never shown in the store apps or to a class account", () => {
    twa.store = true;
    expect(render(<ShareGradelings />).container).toBeEmptyDOMElement();
    twa.store = false;
    useStore.setState({ family: { ...guest, account: { email: "s@example.com", familyId: "f", student: true } as never } });
    expect(render(<ShareGradelings />).container).toBeEmptyDOMElement();
  });
});
