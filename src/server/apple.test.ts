import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { IOS_PRODUCTS } from "@/lib/ios";
import { applyAppleTransaction, decodeAppleJws, intervalForProduct, testAppleJws } from "./apple";
import { query, run } from "./db";

const FAMILY = "fam_apple_test";

describe("apple IAP", () => {
  beforeEach(async () => {
    process.env.APPLE_IAP_ALLOW_UNSIGNED = "1";
    process.env.NODE_ENV = "test";
    const now = Date.now();
    await run("DELETE FROM families WHERE id = ?", [FAMILY]);
    await run(
      `INSERT INTO families (id, created_at, trial_ends_at, plan, updated_at, billing_event_at)
       VALUES (?, ?, ?, 'trial', ?, 0)`,
      [FAMILY, now, now + 30 * 86_400_000, now],
    );
  });

  afterEach(() => {
    delete process.env.APPLE_IAP_ALLOW_UNSIGNED;
  });

  it("maps product ids to month and year", () => {
    expect(intervalForProduct(IOS_PRODUCTS.month)).toBe("month");
    expect(intervalForProduct(IOS_PRODUCTS.year)).toBe("year");
    expect(intervalForProduct("nope")).toBeNull();
  });

  it("decodes an unsigned test JWS when allowed", () => {
    const jws = testAppleJws({
      originalTransactionId: "ot_1",
      productId: IOS_PRODUCTS.year,
      expiresAt: 2_000_000_000_000,
      signedAt: 1_700_000_000_000,
    });
    const tx = decodeAppleJws(jws);
    expect(tx).toMatchObject({
      originalTransactionId: "ot_1",
      productId: IOS_PRODUCTS.year,
      expiresAt: 2_000_000_000_000,
    });
  });

  it("refuses a JWS without a signature when unsigned mode is off", () => {
    delete process.env.APPLE_IAP_ALLOW_UNSIGNED;
    const jws = testAppleJws({ originalTransactionId: "ot_1", productId: IOS_PRODUCTS.month });
    expect(() => decodeAppleJws(jws)).toThrow(/signature/i);
  });

  it("grants and clears premium from a transaction", async () => {
    const active = decodeAppleJws(
      testAppleJws({
        originalTransactionId: "ot_2",
        productId: IOS_PRODUCTS.month,
        expiresAt: Date.now() + 86_400_000,
        signedAt: Date.now(),
      }),
    );
    await applyAppleTransaction(FAMILY, active);
    let row = (await query<{ plan: string; subscription_interval: string; apple_original_transaction_id: string }>(
      "SELECT plan, subscription_interval, apple_original_transaction_id FROM families WHERE id = ?",
      [FAMILY],
    ))[0];
    expect(row.plan).toBe("premium");
    expect(row.subscription_interval).toBe("month");
    expect(row.apple_original_transaction_id).toBe("ot_2");

    const expired = { ...active, expiresAt: Date.now() - 1, signedAt: Date.now() + 1 };
    await applyAppleTransaction(FAMILY, expired);
    row = (await query<{ plan: string }>("SELECT plan FROM families WHERE id = ?", [FAMILY]))[0];
    expect(row.plan).toBe("free");
  });
});
