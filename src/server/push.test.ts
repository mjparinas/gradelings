import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// Notifications: which devices are accepted, what is stored, how a send ends, and that nothing is left behind.

const dir = mkdtempSync(join(tmpdir(), "gradelings-push-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
process.env.VAPID_PUBLIC_KEY = "BPublicKeyForTests";
process.env.VAPID_PRIVATE_KEY = "privateKeyForTests";
delete process.env.RESEND_API_KEY;

const sendNotification = vi.fn();
vi.mock("web-push", () => ({ setVapidDetails: vi.fn(), sendNotification: (...a: unknown[]) => sendNotification(...a) }));

type Mod = Record<string, (req: Request) => Promise<Response>>;
let route: Mod, signup: Mod;
let dbm: typeof import("@/server/db");
let push: typeof import("@/server/push");
let del: typeof import("@/server/deleteFamily");

const sub = (n = 1) => ({ endpoint: `https://push.example.com/send/${n}`, keys: { p256dh: "p256dh-key", auth: "auth-key" } });
const msg = { title: "T", body: "B", url: "/play/", tag: "x" };

beforeAll(async () => {
  [route, signup] = (await Promise.all([import("@/app/api/push/route"), import("@/server/testing/signupWithSession")])) as unknown as Mod[];
  dbm = await import("@/server/db");
  push = await import("@/server/push");
  del = await import("@/server/deleteFamily");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));
beforeEach(() => sendNotification.mockReset());

describe("subscriptions", () => {
  it("accepts only https addresses with both keys", () => {
    expect(push.validSubscription(sub())).toBe(true);
    expect(push.validSubscription({ ...sub(), endpoint: "http://push.example.com/x" })).toBe(false);
    expect(push.validSubscription({ endpoint: "https://a.example/x", keys: { p256dh: "a" } })).toBe(false);
    expect(push.validSubscription(null)).toBe(false);
  });

  it("keeps one row per device, moves it when a device is set up again, and forgets it with the family", async () => {
    await push.saveSubscription({ familyId: "fam1", parentId: "par1", kind: "parent", subscription: sub(1) });
    await push.saveSubscription({ familyId: "fam1", parentId: "par1", kind: "child", profileId: "kid1", subscription: sub(1) });
    const rows = await push.subscriptionsOf("fam1");
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ kind: "child", profile_id: "kid1" });
    await del.deleteFamilyData("fam1");
    expect(await push.subscriptionsOf("fam1")).toHaveLength(0);
  });

  it("looks a family's devices up by index", async () => {
    const plan = await dbm.query<{ detail: string }>("EXPLAIN QUERY PLAN SELECT * FROM push_devices WHERE family_id = ?", ["x"]);
    expect(plan.map((p) => p.detail).join(" ")).toContain("push_devices_family");
  });
});

describe("sending", () => {
  async function stored(n: number) {
    await push.saveSubscription({ familyId: "fam2", parentId: "par2", kind: "parent", subscription: sub(n) });
    return (await push.subscriptionsOf("fam2")).find((s) => s.endpoint === sub(n).endpoint)!;
  }

  it("sends once a day and records the day", async () => {
    sendNotification.mockResolvedValue({});
    const s = await stored(10);
    expect(await push.sendPush(s, msg, "2026-11-19")).toBe("sent");
    const again = (await push.subscriptionsOf("fam2")).find((x) => x.endpoint === s.endpoint)!;
    expect(await push.sendPush(again, msg, "2026-11-19")).toBe("skipped");
    expect(sendNotification).toHaveBeenCalledTimes(1);
  });

  it("deletes a device the browser says is gone, and keeps one that merely failed", async () => {
    const gone = await stored(11);
    sendNotification.mockRejectedValueOnce({ statusCode: 410 });
    expect(await push.sendPush(gone, msg, "2026-11-19")).toBe("gone");
    expect((await push.subscriptionsOf("fam2")).some((x) => x.endpoint === gone.endpoint)).toBe(false);
    const flaky = await stored(12);
    sendNotification.mockRejectedValueOnce({ statusCode: 500 });
    expect(await push.sendPush(flaky, msg, "2026-11-19")).toBe("failed");
    expect((await push.subscriptionsOf("fam2")).some((x) => x.endpoint === flaky.endpoint)).toBe(true);
  });
});

describe("the route", () => {
  const req = (method: string, body?: unknown, cookie?: string) =>
    new Request("http://localhost/api/push/", { method, headers: { "content-type": "application/json", host: "localhost", origin: "http://localhost", "x-forwarded-for": "10.7.0.1", ...(cookie ? { cookie } : {}) }, body: body ? JSON.stringify(body) : undefined });

  it("needs a signed-in parent", async () => {
    expect((await route.GET(req("GET"))).status).toBe(401);
    expect((await route.POST(req("POST", { subscription: sub(), kind: "parent" }))).status).toBe(401);
  });

  it("is switched off until the flag is on", async () => {
    const res = await signup.POST(new Request("http://localhost/api/auth/signup/", { method: "POST", headers: { "content-type": "application/json", host: "localhost", origin: "http://localhost", "x-forwarded-for": "10.7.0.2" }, body: JSON.stringify({ email: "push@example.com", password: "a-long-password-1" }) }));
    const cookie = (res.headers.get("set-cookie") ?? "").split(";")[0];
    const status = (await (await route.GET(req("GET", undefined, cookie))).json()) as { enabled: boolean };
    expect(status.enabled).toBe(false);
    expect((await route.POST(req("POST", { subscription: sub(), kind: "parent" }, cookie))).status).toBe(404);
  });
});
