import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Guest players: devices with no parent account that say they were played today, counted for the admin dashboard.

const dir = mkdtempSync(join(tmpdir(), "grademap-guests-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;
const DAY = 86_400_000;
const NOW = Date.UTC(2026, 9, 17, 15);

type Mod = Record<string, (req: Request) => Promise<Response>>;
let seen: Mod, signup: Mod, publicFlags: Mod;
let dbm: typeof import("@/server/db");
let guests: typeof import("@/server/guests");

beforeAll(async () => {
  [seen, signup, publicFlags] = (await Promise.all([import("@/app/api/guests/seen/route"), import("@/app/api/auth/signup/route"), import("@/app/api/flags/route")])) as unknown as Mod[];
  dbm = await import("@/server/db");
  guests = await import("@/server/guests");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
const post = (body: unknown, cookie?: string, origin = "http://localhost") =>
  new Request("http://localhost/api/guests/seen/", {
    method: "POST",
    headers: { "content-type": "application/json", host: "localhost", origin, "x-forwarded-for": `10.9.0.${++ip % 250}`, ...(cookie ? { cookie } : {}) },
    body: JSON.stringify(body),
  });
const rows = () => dbm.query<{ device_hash: string; last_day: number }>("SELECT * FROM guest_devices");

describe("guest devices", () => {
  it("counts a device once however often it says it played, and stores only a hash and the day", async () => {
    const id = "abcdef0123456789abcdef01";
    for (let i = 0; i < 3; i++) expect((await seen.POST(post({ d: id }))).status).toBe(200);
    expect((await seen.POST(post({ d: "bbbbbbbbbbbbbbbbbbbbbbbb" }))).status).toBe(200);
    const stored = await rows();
    expect(stored).toHaveLength(2);
    expect(JSON.stringify(stored)).not.toContain(id);
    expect(stored[0].device_hash).toBe(guests.guestHash(id));
    expect(await guests.guestCounts()).toEqual({ d1: 2, d7: 2, d30: 2 });
  });

  it("refuses a bad body or another site", async () => {
    expect((await seen.POST(post({}))).status).toBe(400);
    expect((await seen.POST(post({ d: "short" }))).status).toBe(400);
    expect((await seen.POST(post({ d: "has spaces in it, not allowed" }))).status).toBe(400);
    expect((await seen.POST(post({ d: "cccccccccccccccccccccccc" }, undefined, "https://evil.example"))).status).toBe(403);
  });

  it("is not a guest once the device signs in: a signed-in session is ignored and the device forgotten", async () => {
    const id = "dddddddddddddddddddddddd";
    expect((await seen.POST(post({ d: id }))).status).toBe(200);
    expect((await rows()).some((r) => r.device_hash === guests.guestHash(id))).toBe(true);
    const res = await signup.POST(new Request("http://localhost/api/auth/signup/", { method: "POST", headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": "10.9.1.1" }, body: JSON.stringify({ email: "guest-turned-parent@example.com", password: "correct horse" }) }));
    const cookie = (res.headers.get("set-cookie") ?? "").split(";")[0];
    // The app's next flags request from that device (signed in) forgets it.
    await publicFlags.GET(new Request(`http://localhost/api/flags/?d=${id}`, { headers: { host: "localhost", cookie, "x-forwarded-for": "10.9.1.2" } }));
    expect((await rows()).some((r) => r.device_hash === guests.guestHash(id))).toBe(false);
    // And a ping from a signed-in session records nothing.
    expect((await seen.POST(post({ d: id }, cookie))).status).toBe(200);
    expect((await rows()).some((r) => r.device_hash === guests.guestHash(id))).toBe(false);
    // A signed-out flags request leaves guests alone.
    expect((await seen.POST(post({ d: id }))).status).toBe(200);
    await publicFlags.GET(new Request(`http://localhost/api/flags/?d=${id}`, { headers: { host: "localhost", "x-forwarded-for": "10.9.1.3" } }));
    expect((await rows()).some((r) => r.device_hash === guests.guestHash(id))).toBe(true);
  });

  it("counts today, the last 7 and the last 30 UTC days, and lists the same devices by day", async () => {
    await dbm.run("DELETE FROM guest_devices");
    const today = Math.floor(NOW / DAY);
    // Last played: today, 6 days ago (inside the week), 7 (outside), 29 (inside 30), 30 (outside), and a stale one.
    for (const [i, ago] of [0, 0, 6, 7, 29, 30, 34].entries()) await dbm.run("INSERT INTO guest_devices (device_hash, last_day) VALUES (?, ?)", [`h${i}`, today - ago]);
    expect(await guests.guestCounts(NOW)).toEqual({ d1: 2, d7: 3, d30: 5 });
    const days = await guests.guestLastPlayed(NOW);
    expect(days).toEqual([
      { day: today, devices: 2 },
      { day: today - 6, devices: 1 },
      { day: today - 7, devices: 1 },
      { day: today - 29, devices: 1 },
    ]);
    expect(days.reduce((n, d) => n + d.devices, 0)).toBe((await guests.guestCounts(NOW)).d30);
  });

  it("forgets devices not seen for 35 days", async () => {
    const today = Math.floor(NOW / DAY);
    await guests.pruneGuests(NOW);
    const left = (await rows()).map((r) => r.last_day).sort();
    // 34 days ago is kept; nothing older exists, so insert one and prune again.
    expect(left).toContain(today - 34);
    await dbm.run("INSERT INTO guest_devices (device_hash, last_day) VALUES ('old', ?)", [today - 36]);
    await guests.pruneGuests(NOW);
    expect((await rows()).some((r) => r.device_hash === "old")).toBe(false);
    expect((await rows()).some((r) => r.last_day === today - 34)).toBe(true);
  });
});
