import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NextRequest } from "next/server";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { MAINTENANCE_CACHE_MS, MAINTENANCE_MESSAGE } from "@/lib/maintenance";

// Maintenance mode: the admin switch, the cached state, and the proxy that answers every other page with the
// maintenance message while it is on.

const dir = mkdtempSync(join(tmpdir(), "grademap-maintenance-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
const savedAdmins = process.env.ADMIN_EMAILS;
const ADMIN_EMAIL = "owner@example.com";

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, route: Mod;
let dbm: typeof import("@/server/db");
let m: typeof import("@/server/maintenance");
let proxy: typeof import("@/proxy").proxy;

beforeAll(async () => {
  signup = (await import("@/app/api/auth/signup/route")) as unknown as Mod;
  route = (await import("@/app/api/admin/maintenance/route")) as unknown as Mod;
  dbm = await import("@/server/db");
  m = await import("@/server/maintenance");
  proxy = (await import("@/proxy")).proxy;
});
beforeEach(async () => {
  process.env.ADMIN_EMAILS = ADMIN_EMAIL;
  await dbm.run("DELETE FROM admin_settings WHERE key = 'maintenance'");
  m.clearMaintenanceCache();
});
afterAll(() => {
  if (savedAdmins === undefined) delete process.env.ADMIN_EMAILS;
  else process.env.ADMIN_EMAILS = savedAdmins;
  rmSync(dir, { recursive: true, force: true });
});

let ip = 0;
const req = (path: string, cookie?: string, method = "GET", body?: unknown) =>
  new Request(`http://localhost${path}`, {
    method,
    headers: { host: "localhost", origin: "http://localhost", "content-type": "application/json", "x-forwarded-for": `10.7.0.${++ip % 250}`, ...(cookie ? { cookie } : {}) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
async function account(address: string) {
  const res = await signup.POST(req("/api/auth/signup/", undefined, "POST", { email: address, password: "correct horse" }));
  await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now(), address]);
  return (res.headers.get("set-cookie") ?? "").split(";")[0];
}
const visit = (path: string) => proxy(new NextRequest(`http://localhost${path}`));

describe("the admin switch", () => {
  it("is admin-only, needs TURN ON to switch on, and is written to the change log", async () => {
    const parent = await account("parent-maint@example.com");
    expect((await route.GET(req("/api/admin/maintenance/", parent))).status).toBe(404);
    expect((await route.PUT(req("/api/admin/maintenance/", parent, "PUT", { on: true, confirm: "TURN ON" }))).status).toBe(404);

    const admin = await account(ADMIN_EMAIL);
    expect(await (await route.GET(req("/api/admin/maintenance/", admin))).json()).toEqual({ on: false, since: null });
    const unconfirmed = await route.PUT(req("/api/admin/maintenance/", admin, "PUT", { on: true }));
    expect(unconfirmed.status).toBe(400);
    expect((await unconfirmed.json()).error).toBe("Type TURN ON to confirm.");
    expect((await route.PUT(req("/api/admin/maintenance/", admin, "PUT", { on: "yes" }))).status).toBe(400);
    expect(await m.getMaintenance()).toEqual({ on: false, since: null });

    const on = await route.PUT(req("/api/admin/maintenance/", admin, "PUT", { on: true, confirm: "TURN ON" }));
    expect(on.status).toBe(200);
    const state = (await on.json()) as { on: boolean; since: number };
    expect(state.on).toBe(true);
    expect(state.since).toBeGreaterThan(0);
    expect(await (await route.GET(req("/api/admin/maintenance/", admin))).json()).toEqual(state);

    // Switching off needs no confirmation.
    expect(await (await route.PUT(req("/api/admin/maintenance/", admin, "PUT", { on: false }))).json()).toEqual({ on: false, since: null });
    const log = await dbm.query<{ action: string; admin: string }>("SELECT action, admin FROM admin_audit WHERE action LIKE 'maintenance.%' ORDER BY id");
    expect(log.map((r) => [r.action, r.admin])).toEqual([
      ["maintenance.on", ADMIN_EMAIL],
      ["maintenance.off", ADMIN_EMAIL],
    ]);
  });
});

describe("the cached state", () => {
  it("reads the database at most once per cache period, and a switch on this server applies at once", async () => {
    const t = 1_000_000;
    expect(await m.maintenanceOn(t)).toBe(false);
    // Another server switches it on: this one keeps its copy until the cache period ends.
    await dbm.run("INSERT INTO admin_settings (key, value, updated_at) VALUES ('maintenance', ?, ?)", [JSON.stringify({ on: true, since: t }), t]);
    expect(await m.maintenanceOn(t + MAINTENANCE_CACHE_MS - 1)).toBe(false);
    expect(await m.maintenanceOn(t + MAINTENANCE_CACHE_MS)).toBe(true);
    // Switching it here updates this server's copy straight away.
    await m.setMaintenance(false, t + MAINTENANCE_CACHE_MS + 1);
    expect(await m.maintenanceOn(t + MAINTENANCE_CACHE_MS + 2)).toBe(false);
  });

  it("treats an unreadable value as off", async () => {
    await dbm.run("INSERT INTO admin_settings (key, value, updated_at) VALUES ('maintenance', 'not json', 1)");
    expect(await m.getMaintenance()).toEqual({ on: false, since: null });
  });
});

describe("the proxy", () => {
  it("lets everything through while maintenance mode is off", async () => {
    for (const path of ["/", "/play/", "/parents/", "/api/sync/", "/pricing/"]) {
      const res = await visit(path);
      expect(res.status, path).toBe(200);
      expect(res.headers.get("x-maintenance"), path).toBeNull();
    }
  });

  it("answers every other page and API with the maintenance message while it is on", async () => {
    await m.setMaintenance(true);
    for (const path of ["/play/", "/parents/", "/pricing/", "/curriculum/bc/", "/teachers/", "/shared/abc/", "/account/"]) {
      const res = await visit(path);
      expect(res.status, path).toBe(503);
      expect(res.headers.get("x-maintenance"), path).toBe("on");
      expect(res.headers.get("cache-control"), path).toBe("no-store");
      expect(res.headers.get("retry-after"), path).toBe("600");
      expect(res.headers.get("content-type"), path).toContain("text/html");
      expect(await res.text(), path).toContain("is under maintenance");
    }
    for (const path of ["/api/sync/", "/api/auth/signup/", "/api/flags/", "/api/classes/"]) {
      const res = await visit(path);
      expect(res.status, path).toBe(503);
      expect(res.headers.get("x-maintenance"), path).toBe("on");
      expect(await res.json(), path).toEqual({ error: MAINTENANCE_MESSAGE });
    }
  });

  it("keeps the home page, the admin panel, signing in and the machine endpoints working", async () => {
    await m.setMaintenance(true);
    for (const path of ["/", "/admin/", "/admin", "/api/admin/maintenance/", "/api/auth/login/", "/api/auth/me/", "/api/auth/logout/", "/api/billing/webhook/", "/api/email/webhook/", "/api/email/unsubscribe/", "/api/cron/weekly/", "/api/health/", "/opengraph-image"]) {
      const res = await visit(path);
      expect(res.status, path).toBe(200);
      expect(res.headers.get("x-maintenance"), path).toBeNull();
    }
  });
});
