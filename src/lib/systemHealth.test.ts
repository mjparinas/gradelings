import { describe, expect, it } from "vitest";
import { betterStackState, capacityState, emailRateState, megabytes, restoreDrillState, SETTINGS, speedState, statuspageState, stripeStatusState, uptimeRobotStatus, worst } from "./systemHealth";

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

  it("reads UptimeRobot's monitor status", () => {
    expect([2, 9, 8, 0, 1, undefined].map((s) => uptimeRobotStatus(s).state)).toEqual(["ok", "down", "down", "warn", "warn", "warn"]);
    expect(uptimeRobotStatus(8).label).toBe("Seems down");
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

  it("warns when no restore practice is recorded or it is over 35 days old", () => {
    const now = Date.parse("2026-10-23T12:00:00Z");
    const day = 86_400_000;
    expect(restoreDrillState(null, now)).toBe("warn");
    expect(restoreDrillState(now - 35 * day, now)).toBe("ok");
    expect(restoreDrillState(now - 36 * day, now)).toBe("warn");
  });

  it("warns on slow or failing sync, or repeated fetch failures", () => {
    expect(speedState(900, 0.01, 0)).toBe("ok");
    expect(speedState(null, null, null)).toBe("ok");
    expect(speedState(3001, 0, 0)).toBe("warn");
    expect(speedState(900, 0.05, 0)).toBe("warn");
    expect(speedState(900, 0, 5)).toBe("warn");
  });

  it("warns at 70% of the storage limit and goes down at 90%", () => {
    expect(capacityState(null)).toBe("ok");
    expect(capacityState(0.69)).toBe("ok");
    expect(capacityState(0.7)).toBe("warn");
    expect(capacityState(0.9)).toBe("down");
  });

  it("writes sizes in megabytes", () => {
    expect(megabytes(1_048_576 * 2.46)).toBe("2.5 MB");
    expect(megabytes(1_048_576 * 1240)).toBe("1,240 MB");
  });
});
