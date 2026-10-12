import { describe, expect, it } from "vitest";
import { betterStackState, emailRateState, SETTINGS, statuspageState, stripeStatusState, uptimePercent, worst } from "./systemHealth";

describe("system health helpers", () => {
  it("takes the worst state, ignoring checks that aren't set up", () => {
    expect(worst([])).toBe("ok");
    expect(worst(["off", "off"])).toBe("ok");
    expect(worst(["ok", "warn", "off"])).toBe("warn");
    expect(worst(["warn", "down", "ok"])).toBe("down");
  });

  it("reads each kind of status page", () => {
    expect(["none", "minor", "maintenance", "major", "critical", undefined].map(statuspageState)).toEqual(["ok", "warn", "warn", "down", "down", "warn"]);
    expect(["operational", "degraded", "downtime", null].map(betterStackState)).toEqual(["ok", "warn", "down", "warn"]);
    expect(["up", "degraded", "down", undefined].map(stripeStatusState)).toEqual(["ok", "warn", "down", "warn"]);
  });

  it("works out uptime to one decimal", () => {
    expect(uptimePercent([])).toBeNull();
    expect(uptimePercent([{ ok: true }, { ok: true }, { ok: false }])).toBe(66.7);
  });

  it("warns at Resend's bounce and spam limits, only once there's enough email", () => {
    expect(emailRateState(10, 5, 5)).toBe("ok");
    expect(emailRateState(100, 3, 0)).toBe("ok");
    expect(emailRateState(100, 4, 0)).toBe("warn");
    expect(emailRateState(10_000, 0, 7)).toBe("ok");
    expect(emailRateState(10_000, 0, 8)).toBe("warn");
  });

  it("lists every setting with a label, by name only", () => {
    for (const s of SETTINGS) {
      expect(s.names.length).toBeGreaterThan(0);
      for (const n of s.names) expect(n).toMatch(/^[A-Z][A-Z0-9_]+$/);
      expect(s.what).toMatch(/\.$/);
    }
  });
});
