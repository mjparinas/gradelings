import { describe, expect, it } from "vitest";
import { traceRate, traceScale } from "./sentry-traces";

describe("which requests are timed", () => {
  it("times the busy routes lightly and the rare, important ones always", () => {
    expect(traceRate("POST /api/sync/")).toBe(0.1);
    expect(traceRate("GET /api/live/")).toBe(0.02);
    expect(traceRate("GET /api/cron/weekly/")).toBe(1);
    expect(traceRate("POST /api/billing/webhook/")).toBe(1);
    expect(traceRate("GET /api/classes/")).toBe(0.2);
    expect(traceRate("GET /api/auth/me/")).toBe(0.05);
  });

  it("never times the health check, pages or unnamed requests", () => {
    expect(traceRate("GET /api/health/")).toBe(0);
    expect(traceRate("GET /curriculum/bc/")).toBe(0);
    expect(traceRate("GET /play/")).toBe(0);
    expect(traceRate(undefined)).toBe(0);
  });

  it("scales every rate, up to always and down to never", () => {
    expect(traceRate("POST /api/sync/", 0)).toBe(0);
    expect(traceRate("POST /api/sync/", 20)).toBe(1);
    expect(traceRate("GET /api/cron/weekly/", 2)).toBe(1);
  });

  it("reads the scale from the environment", () => {
    expect(traceScale(undefined)).toBe(1);
    expect(traceScale("")).toBe(1);
    expect(traceScale("0")).toBe(0);
    expect(traceScale("2.5")).toBe(2.5);
    expect(traceScale("-1")).toBe(1);
    expect(traceScale("lots")).toBe(1);
  });
});
