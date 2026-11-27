// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { reportHandled } from "./reportError";

describe("reportHandled", () => {
  it("raises a window error event carrying the error", () => {
    const seen = vi.fn((e: ErrorEvent) => e.error);
    window.addEventListener("error", seen);
    const err = new Error("boom");
    reportHandled(err);
    window.removeEventListener("error", seen);
    expect(seen).toHaveBeenCalledTimes(1);
    expect(seen.mock.results[0].value).toBe(err);
  });
  it("ignores null and never throws", () => {
    const seen = vi.fn();
    window.addEventListener("error", seen);
    expect(() => reportHandled(null)).not.toThrow();
    window.removeEventListener("error", seen);
    expect(seen).not.toHaveBeenCalled();
  });
});
