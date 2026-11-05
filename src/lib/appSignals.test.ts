// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { appKind, isPaywallKind, reportPaywallSeen } from "./appSignals";

const DAY = 86_400_000;
const NOW = Date.UTC(2026, 10, 5, 12);

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
  Object.defineProperty(navigator, "webdriver", { value: false, configurable: true });
  vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response("{}"))));
});

describe("appKind", () => {
  it("is the web in an ordinary browser", () => expect(appKind()).toBe("web"));
});

describe("reportPaywallSeen", () => {
  it("only accepts the two kinds", () => {
    expect(isPaywallKind("locked-unit")).toBe(true);
    expect(isPaywallKind("members-reports")).toBe(true);
    expect(isPaywallKind("x")).toBe(false);
  });

  it("says it once a day per kind and sends nothing but the kind", () => {
    reportPaywallSeen("locked-unit", true, NOW);
    reportPaywallSeen("locked-unit", true, NOW + 1000);
    reportPaywallSeen("members-reports", true, NOW);
    expect(fetch).toHaveBeenCalledTimes(2);
    const [, init] = vi.mocked(fetch).mock.calls[0]!;
    expect(JSON.parse(String(init!.body))).toEqual({ kind: "locked-unit" });
    reportPaywallSeen("locked-unit", true, NOW + DAY);
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it("stays quiet with no account or in an automated browser", () => {
    reportPaywallSeen("locked-unit", false, NOW);
    Object.defineProperty(navigator, "webdriver", { value: true, configurable: true });
    reportPaywallSeen("members-reports", true, NOW);
    expect(fetch).not.toHaveBeenCalled();
  });
});
