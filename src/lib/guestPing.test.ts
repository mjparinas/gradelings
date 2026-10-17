// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { guestPlayedToday, pingGuestDevice } from "./guestPing";

const NOW = Date.UTC(2026, 9, 17, 15);
const DAY = 86_400_000;
const kid = (framework: string, over: Record<string, unknown> = {}) => ({ framework, createdAt: 1, deleted: false, ...over }) as never;
const answered = (t: number) => ({ type: "answer", t }) as never;
const state = (over: Record<string, unknown> = {}) => ({ family: {}, profiles: [kid("ca-bc")], events: [answered(NOW - 1000)], ...over }) as never;

let calls: { url: string; body: string }[];
beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("grademap.device", "abcdef0123456789abcdef01");
  calls = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      calls.push({ url, body: String(init?.body) });
      return new Response("{}", { status: 200 });
    }),
  );
});

describe("guest players", () => {
  it("counts a device with no account where a child answered a question today", () => {
    expect(guestPlayedToday(state(), NOW)).toBe(true);
    // An account means a parent is signed in: not a guest.
    expect(guestPlayedToday(state({ family: { account: { email: "p@example.com", familyId: "f" } } }), NOW)).toBe(false);
    // Nobody set up, only yesterday's answers, or a lesson that wasn't answered.
    expect(guestPlayedToday(state({ profiles: [] }), NOW)).toBe(false);
    expect(guestPlayedToday(state({ profiles: [kid("ca-bc", { deleted: true })] }), NOW)).toBe(false);
    expect(guestPlayedToday(state({ events: [answered(NOW - DAY)] }), NOW)).toBe(false);
    expect(guestPlayedToday(state({ events: [{ type: "session", t: NOW - 1000 }] }), NOW)).toBe(false);
  });

  it("skips a device where any child follows a US curriculum, which needs a parent's consent", () => {
    expect(guestPlayedToday(state({ profiles: [kid("ca-bc"), kid("us-wa")] }), NOW)).toBe(false);
    expect(guestPlayedToday(state({ profiles: [kid("us-tx")] }), NOW)).toBe(false);
  });

  it("sends only the device's random id, once a day", async () => {
    await pingGuestDevice(state(), NOW);
    expect(calls).toEqual([{ url: "/api/guests/seen/", body: JSON.stringify({ d: "abcdef0123456789abcdef01" }) }]);
    await pingGuestDevice(state(), NOW + 60_000 * 30);
    expect(calls).toHaveLength(1);
    // The next UTC day, after more play.
    const tomorrow = NOW + DAY;
    await pingGuestDevice(state({ events: [answered(tomorrow - 1000)] }), tomorrow);
    expect(calls).toHaveLength(2);
  });

  it("sends nothing when no one has played, and tries again later if the server didn't take it", async () => {
    await pingGuestDevice(state({ events: [] }), NOW);
    expect(calls).toHaveLength(0);
    vi.mocked(fetch).mockImplementationOnce(async (url, init) => {
      calls.push({ url: String(url), body: String(init?.body) });
      return new Response("{}", { status: 503 });
    });
    const later = NOW + 20 * DAY;
    await pingGuestDevice(state({ events: [answered(later - 1000)] }), later);
    expect(calls).toHaveLength(1);
    // Not again within ten minutes, but yes after.
    await pingGuestDevice(state({ events: [answered(later - 1000)] }), later + 60_000);
    expect(calls).toHaveLength(1);
    await pingGuestDevice(state({ events: [answered(later - 1000)] }), later + 11 * 60_000);
    expect(calls).toHaveLength(2);
  });
});
