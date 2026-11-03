import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { LIFETIME_ACCESS } from "@/lib/plan";

// Edges of the redeem-code rules, found by mutation testing (`npm run test:mutation:server`).

const dir = mkdtempSync(join(tmpdir(), "grademap-coderules-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;

let codes: typeof import("@/server/codes");
let dbm: typeof import("@/server/db");
let signup: (req: Request) => Promise<Response>;
const DAY = 86_400_000;

beforeAll(async () => {
  codes = await import("@/server/codes");
  dbm = await import("@/server/db");
  signup = (await import("@/server/testing/signupWithSession")).POST;
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let n = 0;
async function family(): Promise<string> {
  const email = `rules${++n}@example.com`;
  const res = await signup(new Request("http://localhost/api/auth/signup/", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": `10.9.0.${n}` },
    body: JSON.stringify({ email, password: "correct horse battery" }),
  }));
  expect(res.status).toBe(200);
  return (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", [email]))[0].family_id;
}

describe("validateNewCode", () => {
  const ok = { kind: "access" as const, days: 30 };
  it("accepts the edges of each range and refuses just outside them", () => {
    const v = (c: Record<string, unknown>) => codes.validateNewCode(c as never);
    expect(v({ ...ok, days: 1 })).toBeNull();
    expect(v({ ...ok, days: 3650 })).toBeNull();
    expect(v({ ...ok, days: 0 })).not.toBeNull();
    expect(v({ ...ok, days: 3651 })).not.toBeNull();
    expect(v({ ...ok, days: 1.5 })).not.toBeNull();
    expect(v({ kind: "access" })).toBeNull();

    const d = { kind: "discount", percentOff: 50 };
    expect(v({ ...d, percentOff: 1 })).toBeNull();
    expect(v({ ...d, percentOff: 100 })).toBeNull();
    expect(v({ ...d, percentOff: 0 })).not.toBeNull();
    expect(v({ ...d, percentOff: 101 })).not.toBeNull();
    expect(v({ kind: "discount" })).not.toBeNull();
    expect(v({ ...d, duration: "forever" })).toBeNull();
    expect(v({ ...d, duration: "sometimes" })).not.toBeNull();
    // Only discount codes check a duration; an access code ignores one.
    expect(v({ ...ok, duration: "sometimes" })).toBeNull();
    expect(v({ ...d, duration: "repeating", months: 1 })).toBeNull();
    expect(v({ ...d, duration: "repeating", months: 36 })).toBeNull();
    expect(v({ ...d, duration: "repeating", months: 0 })).not.toBeNull();
    expect(v({ ...d, duration: "repeating", months: 37 })).not.toBeNull();
    expect(v({ ...d, duration: "repeating" })).not.toBeNull();
    expect(v({ ...d, duration: "once", months: 99 })).toBeNull();

    expect(v({ ...ok, maxUses: 1 })).toBeNull();
    expect(v({ ...ok, maxUses: 0 })).not.toBeNull();
    expect(v({ ...ok, expiresAt: Date.now() + 60_000 })).toBeNull();
    expect(v({ ...ok, expiresAt: Date.now() - 1 })).not.toBeNull();
    expect(v({ ...ok, expiresAt: Number.NaN })).not.toBeNull();
    expect(v({ ...ok, note: "x".repeat(200) })).toBeNull();
    expect(v({ ...ok, note: "x".repeat(201) })).not.toBeNull();
    expect(v({ ...ok, note: 5 })).not.toBeNull();
  });

  it("checks the code's own letters and a Stripe coupon id", () => {
    const v = (c: Record<string, unknown>) => codes.validateNewCode({ ...ok, ...c } as never);
    expect(v({ code: "ABC123" })).toBeNull();
    expect(v({ code: "A".repeat(32) })).toBeNull();
    expect(v({ code: "ABC12" })).not.toBeNull();
    expect(v({ code: "A".repeat(33) })).not.toBeNull();
    expect(v({ code: "ABC 123!" })).not.toBeNull();
    expect(v({ code: 123456 })).not.toBeNull();
    expect(v({ stripeCoupon: "welcome_2026-A" })).toBeNull();
    expect(v({ stripeCoupon: "x".repeat(100) })).toBeNull();
    expect(v({ stripeCoupon: "x".repeat(101) })).not.toBeNull();
    expect(v({ stripeCoupon: "" })).not.toBeNull();
    expect(v({ stripeCoupon: "bad coupon" })).not.toBeNull();
    expect(v({ stripeCoupon: 7 })).not.toBeNull();
  });
});

describe("extendAccess", () => {
  it("starts from now or the existing end, whichever is later, and never passes lifetime", () => {
    const now = 1_000_000_000_000;
    expect(codes.extendAccess(null, 10, now)).toBe(now + 10 * DAY);
    expect(codes.extendAccess(now - 5 * DAY, 10, now)).toBe(now + 10 * DAY);
    expect(codes.extendAccess(now + 5 * DAY, 10, now)).toBe(now + 15 * DAY);
    expect(codes.extendAccess(now, 10, now)).toBe(now + 10 * DAY);
    expect(codes.extendAccess(null, null, now)).toBe(LIFETIME_ACCESS);
    expect(codes.extendAccess(LIFETIME_ACCESS, 10, now)).toBe(LIFETIME_ACCESS);
    expect(codes.extendAccess(LIFETIME_ACCESS - DAY, 10, now)).toBe(LIFETIME_ACCESS);
  });
});

describe("redeemCode edges", () => {
  it("treats a code as expired at its expiry time, not after", async () => {
    const f = await family();
    const now = Date.now();
    const row = (await codes.createCode({ kind: "access", days: 5, expiresAt: now + 60_000 }))!;
    const refused = await codes.redeemCode(f, row.code, now + 60_000);
    expect(refused.ok).toBe(false);
    expect((await codes.redeemCode(f, row.code, now + 59_999)).ok).toBe(true);
  });

  it("stops at the use limit and says nothing different from a wrong code", async () => {
    const [a, b] = [await family(), await family()];
    const row = (await codes.createCode({ kind: "access", days: 5, maxUses: 1 }))!;
    expect((await codes.redeemCode(a, row.code)).ok).toBe(true);
    const full = await codes.redeemCode(b, row.code);
    const wrong = await codes.redeemCode(b, "ZZZZZZZZ");
    expect(full).toEqual(wrong);
    expect(full.ok).toBe(false);
    expect((await codes.getCode(row.code))!.uses).toBe(1);
  });

  it("rejects text that cannot be a code, an unknown family, and a second use by the same family", async () => {
    const f = await family();
    expect(await codes.redeemCode(f, "abc")).toMatchObject({ ok: false, status: 400 });
    const row = (await codes.createCode({ kind: "access", days: 5 }))!;
    expect(await codes.redeemCode("no-such-family", row.code)).toMatchObject({ ok: false, status: 404 });
    expect((await codes.getCode(row.code))!.uses).toBe(0);
    expect((await codes.redeemCode(f, row.code)).ok).toBe(true);
    expect(await codes.redeemCode(f, row.code)).toMatchObject({ ok: false, status: 409 });
    expect((await codes.getCode(row.code))!.uses).toBe(1);
  });

  it("will not give lifetime holders more access, nor discounts to members", async () => {
    const f = await family();
    await dbm.run("UPDATE families SET access_until = ? WHERE id = ?", [LIFETIME_ACCESS, f]);
    const access = (await codes.createCode({ kind: "access", days: 5 }))!;
    expect(await codes.redeemCode(f, access.code)).toMatchObject({ ok: false, status: 409 });
    const discount = (await codes.createCode({ kind: "discount", percentOff: 20 }))!;
    const g = await family();
    for (const [col, val] of [["subscription_status", "active"], ["subscription_status", "trialing"], ["subscription_status", "past_due"], ["plan", "premium"]] as const) {
      await dbm.run("UPDATE families SET subscription_status = NULL, plan = 'free' WHERE id = ?", [g]);
      await dbm.run(`UPDATE families SET ${col} = ? WHERE id = ?`, [val, g]);
      expect(await codes.redeemCode(g, discount.code)).toMatchObject({ ok: false, status: 409 });
    }
    await dbm.run("UPDATE families SET subscription_status = 'canceled', plan = 'free' WHERE id = ?", [g]);
    expect(await codes.redeemCode(g, discount.code)).toMatchObject({ ok: true, kind: "discount", percentOff: 20 });
  });

  it("only offers a pending discount for an enabled discount code", async () => {
    const d = (await codes.createCode({ kind: "discount", percentOff: 10, stripeCoupon: "coupon_abc" }))!;
    expect((await codes.pendingDiscount(d.code))?.code).toBe(d.code);
    expect(await codes.stripeCouponFor(d)).toBe("coupon_abc");
    const a = (await codes.createCode({ kind: "access", days: 3 }))!;
    expect(await codes.pendingDiscount(a.code)).toBeNull();
    expect(await codes.pendingDiscount(null)).toBeNull();
    expect(await codes.pendingDiscount("NOSUCHCODE")).toBeNull();
    await codes.disableCode(d.code);
    expect(await codes.pendingDiscount(d.code)).toBeNull();
  });
});
