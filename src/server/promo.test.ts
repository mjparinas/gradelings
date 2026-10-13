import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { FOUNDER_CODE } from "@/lib/promo";

// Site-wide sales: the seeded FOUNDER code, the admin Sales API and the public banner feed, through the real
// route handlers against a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-promo-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;
delete process.env.ADMIN_TOKEN;
const ADMIN_EMAIL = "owner@example.com";
const DAY = 86_400_000;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, promos: Mod, publicPromo: Mod, codes: Mod;
let dbm: typeof import("@/server/db");

let ip = 0;
function req(path: string, method = "GET", body?: unknown, cookie?: string): Request {
  return new Request(`http://localhost${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      host: "localhost",
      origin: "http://localhost",
      "x-forwarded-for": `10.7.0.${++ip % 250}`,
      ...(cookie ? { cookie } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

let admin = "";
let parent = "";
async function account(email: string) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email, password: "correct horse" }));
  await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now() - 60_000, email]);
  return (res.headers.get("set-cookie") ?? "").split(";")[0];
}

beforeAll(async () => {
  [signup, promos, publicPromo, codes] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/admin/promos/route"),
    import("@/app/api/promo/route"),
    import("@/app/api/admin/codes/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  process.env.ADMIN_EMAILS = ADMIN_EMAIL;
  admin = await account(ADMIN_EMAIL);
  parent = await account("parent@example.com");
});
beforeEach(async () => {
  process.env.ADMIN_EMAILS = ADMIN_EMAIL;
  await dbm.run("DELETE FROM promotions");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

const sale = (over: Record<string, unknown> = {}) => ({
  preset: "founder",
  emoji: "🌱",
  headline: "Founding family price: {percent} off {for}",
  body: "Use code {code} when you subscribe.",
  code: "founder",
  link: "/pricing/",
  startsAt: Date.now() - 1000,
  endsAt: Date.now() + 10 * DAY,
  ...over,
});
const create = (body: unknown, cookie = admin) => promos.POST(req("/api/admin/promos/", "POST", body, cookie));
const live = async () => (await (await publicPromo.GET(req("/api/promo/"))).json()).promo;

describe("the FOUNDER code", () => {
  it("exists without anyone making it: 33% off every payment", async () => {
    const row = (await dbm.query<{ kind: string; percent_off: number; duration: string }>("SELECT * FROM redeem_codes WHERE code = ?", [FOUNDER_CODE]))[0];
    expect(row).toMatchObject({ kind: "discount", percent_off: 33, duration: "forever" });
  });

  it("stays disabled once the owner disables it, even after the schema runs again", async () => {
    await dbm.run("UPDATE redeem_codes SET disabled_at = 1 WHERE code = ?", [FOUNDER_CODE]);
    await dbm.run(
      "INSERT OR IGNORE INTO redeem_codes (code, kind, percent_off, duration, note, created_at) VALUES ('FOUNDER', 'discount', 33, 'forever', 'x', 0)",
    );
    expect((await dbm.query<{ disabled_at: number }>("SELECT disabled_at FROM redeem_codes WHERE code = ?", [FOUNDER_CODE]))[0].disabled_at).toBe(1);
    await dbm.run("UPDATE redeem_codes SET disabled_at = NULL WHERE code = ?", [FOUNDER_CODE]);
  });
});

describe("the Sales API", () => {
  it("is only for admins", async () => {
    expect((await create(sale(), parent)).status).toBe(404);
    expect((await promos.GET(req("/api/admin/promos/", "GET", undefined, parent))).status).toBe(404);
  });

  it("makes a sale that the banner feed shows with its words filled in", async () => {
    const res = await create(sale());
    expect(res.status).toBe(200);
    expect(await live()).toMatchObject({
      emoji: "🌱",
      headline: "Founding family price: 33% off for life",
      body: "Use code FOUNDER when you subscribe.",
      code: "FOUNDER",
      link: "/pricing/",
      linkLabel: "See pricing",
    });
    const list = (await (await promos.GET(req("/api/admin/promos/", "GET", undefined, admin))).json()).promos;
    expect(list[0].status).toBe("live");
  });

  it("lets browsers and the CDN keep the feed for a minute", async () => {
    const res = await publicPromo.GET(req("/api/promo/"));
    expect(res.headers.get("cache-control")).toContain("max-age=60");
  });

  it("refuses an unknown code, a link off the site, bad dates and long words", async () => {
    expect((await (await create(sale({ code: "NOPE1234" }))).json()).error).toMatch(/no code/i);
    expect((await create(sale({ link: "https://example.com/" }))).status).toBe(400);
    expect((await create(sale({ endsAt: Date.now() - DAY, startsAt: Date.now() - 2 * DAY }))).status).toBe(400);
    expect((await create(sale({ endsAt: Date.now() - DAY }))).status).toBe(400);
    expect((await create(sale({ headline: "x".repeat(91) }))).status).toBe(400);
    expect((await create(sale({ headline: "  " }))).status).toBe(400);
    expect(await live()).toBeNull();
  });

  it("refuses a code that expires before the sale ends", async () => {
    const made = await codes.POST(req("/api/admin/codes/", "POST", { kind: "discount", percentOff: 20, code: "SHORTLIVED", expiresAt: Date.now() + 2 * DAY }, admin));
    expect(made.status).toBe(200);
    expect((await (await create(sale({ code: "SHORTLIVED" }))).json()).error).toMatch(/expires before/);
    expect((await create(sale({ code: "SHORTLIVED", endsAt: Date.now() + DAY }))).status).toBe(200);
  });

  it("shows a scheduled sale only once it starts, and the latest start wins", async () => {
    await create(sale({ preset: "black-friday", headline: "Later", startsAt: Date.now() + DAY }));
    expect(await live()).toBeNull();
    await create(sale({ headline: "Older", startsAt: Date.now() - 3 * DAY }));
    await create(sale({ headline: "Newer", startsAt: Date.now() - DAY }));
    expect((await live()).headline).toBe("Newer");
  });

  it("stops a sale at once, and deletes it", async () => {
    const id = (await (await create(sale())).json()).promo.id;
    expect((await promos.PATCH(req("/api/admin/promos/", "PATCH", { id }, admin))).status).toBe(200);
    expect(await live()).toBeNull();
    expect((await promos.PATCH(req("/api/admin/promos/", "PATCH", { id }, admin))).status).toBe(404);
    expect((await promos.DELETE(req("/api/admin/promos/", "DELETE", { id }, admin))).status).toBe(200);
    const audit = await dbm.query<{ action: string }>("SELECT action FROM admin_audit WHERE target = ?", [id]);
    expect(audit.map((a) => a.action).sort()).toEqual(["promo.create", "promo.delete", "promo.stop"]);
  });

  it("hides the banner when its code stops working", async () => {
    await codes.POST(req("/api/admin/codes/", "POST", { kind: "discount", percentOff: 10, code: "GONESOON" }, admin));
    await create(sale({ code: "GONESOON" }));
    expect((await live()).code).toBe("GONESOON");
    await codes.DELETE(req("/api/admin/codes/", "DELETE", { code: "GONESOON" }, admin));
    expect(await live()).toBeNull();
  });
});
