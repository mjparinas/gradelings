// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";

// takeBillingPass answers once per page load, so each test loads the module afresh.
const load = async () => {
  vi.resetModules();
  return import("./billingReturn");
};

describe("billing pass", () => {
  beforeEach(() => sessionStorage.clear());

  it("skips the PIN once on the way back from Stripe", async () => {
    const { grantBillingPass, takeBillingPass } = await load();
    grantBillingPass(1_000);
    expect(takeBillingPass("#/subscription?portal=done", 61_000)).toBe(true);
    // The same page load asks again (a render run twice): the same answer.
    expect(takeBillingPass("#/subscription?portal=done", 62_000)).toBe(true);
    // The next page load has no pass left.
    const again = await load();
    expect(again.takeBillingPass("#/subscription", 63_000)).toBe(false);
  });

  it("covers checkout's way back too", async () => {
    const { grantBillingPass, takeBillingPass } = await load();
    grantBillingPass(1_000);
    expect(takeBillingPass("#/subscription?checkout=cancelled", 2_000)).toBe(true);
  });

  it("asks for the PIN when the trip took longer than the pass lasts", async () => {
    const { BILLING_PASS_MS, grantBillingPass, takeBillingPass } = await load();
    grantBillingPass(1_000);
    expect(takeBillingPass("#/subscription", 1_000 + BILLING_PASS_MS + 1)).toBe(false);
  });

  it("asks for the PIN on any other page, and uses the pass up anyway", async () => {
    const { grantBillingPass, takeBillingPass } = await load();
    grantBillingPass(1_000);
    expect(takeBillingPass("#/reports", 2_000)).toBe(false);
    expect(sessionStorage.getItem("grademap.billing-pass")).toBeNull();
  });

  it("asks for the PIN when nobody left for Stripe, or the clock went backwards", async () => {
    expect((await load()).takeBillingPass("#/subscription", 2_000)).toBe(false);
    const { grantBillingPass, takeBillingPass } = await load();
    grantBillingPass(5_000);
    expect(takeBillingPass("#/subscription", 4_000)).toBe(false);
  });
});
