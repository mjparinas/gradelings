// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  INSTALL_SNOOZE_DAYS,
  KIDS_SNOOZE_DAYS,
  bookmarkKeys,
  clearInstallPrompt,
  getInstallPrompt,
  installKind,
  isIos,
  isMobile,
  isSnoozed,
  isStandalone,
  onInstallChange,
  snooze,
  snoozeKids,
} from "./install";

describe("install nudge helpers", () => {
  beforeEach(() => localStorage.clear());

  it("spots iPhones and iPads, including iPadOS posing as a Mac", () => {
    expect(isIos("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)", 5)).toBe(true);
    expect(isIos("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", 5)).toBe(true);
    expect(isIos("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", 0)).toBe(false);
    expect(isIos("Mozilla/5.0 (Linux; Android 14; Pixel 7)", 5)).toBe(false);
  });

  it("stays quiet for 30 days after Not now", () => {
    const t = Date.UTC(2026, 0, 1);
    expect(isSnoozed(t)).toBe(false);
    snooze(t);
    expect(isSnoozed(t + 86_400_000)).toBe(true);
    expect(isSnoozed(t + INSTALL_SNOOZE_DAYS * 86_400_000 + 1)).toBe(false);
  });

  it("only counts phones and tablets as mobile", () => {
    expect(isMobile("Mozilla/5.0 (Linux; Android 14; Pixel 7) Mobile", 5)).toBe(true);
    expect(isMobile("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)", 5)).toBe(true);
    expect(isMobile("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", 5)).toBe(true);
    expect(isMobile("Mozilla/5.0 (Windows NT 10.0; Win64; x64)", 0)).toBe(false);
  });

  it("keeps the kids' snooze separate and shorter", () => {
    const t = Date.UTC(2026, 0, 1);
    snoozeKids(t);
    expect(isSnoozed(t, "grademap.install.dismissed")).toBe(false);
    expect(isSnoozed(t + 86_400_000, "grademap.install.kids.dismissed", KIDS_SNOOZE_DAYS)).toBe(true);
    expect(isSnoozed(t + 8 * 86_400_000, "grademap.install.kids.dismissed", KIDS_SNOOZE_DAYS)).toBe(false);
  });

  it("words the bookmark shortcut for the device", () => {
    expect(bookmarkKeys("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)")).toBe("⌘D");
    expect(bookmarkKeys("Mozilla/5.0 (Windows NT 10.0; Win64; x64)")).toBe("Ctrl+D");
  });
});

describe("which install nudge to show", () => {
  const ANDROID = "Mozilla/5.0 (Linux; Android 14; Pixel 7) Mobile";
  const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)";
  const WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
  let standalone = false;
  const as = (ua: string, touch = 0) => {
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue(ua);
    Object.defineProperty(navigator, "maxTouchPoints", { configurable: true, get: () => touch });
  };
  const fireInstallPrompt = () => {
    const e = Object.assign(new Event("beforeinstallprompt", { cancelable: true }), { prompt: async () => undefined, userChoice: Promise.resolve({ outcome: "accepted" as const }) });
    window.dispatchEvent(e);
    return e;
  };

  beforeEach(() => {
    localStorage.clear();
    standalone = false;
    vi.stubGlobal("matchMedia", (q: string) => ({ matches: q === "(display-mode: standalone)" && standalone }));
    clearInstallPrompt();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("keeps the browser's install prompt for our own button and tells listeners", () => {
    as(ANDROID, 5);
    const changed = vi.fn();
    const stop = onInstallChange(changed);
    expect(installKind()).toBeNull();
    const e = fireInstallPrompt();
    expect(e.defaultPrevented).toBe(true);
    expect(getInstallPrompt()).toBe(e);
    expect(installKind()).toBe("prompt");
    expect(changed).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new Event("appinstalled"));
    expect(getInstallPrompt()).toBeNull();
    expect(changed).toHaveBeenCalledTimes(2);
    stop();
    fireInstallPrompt();
    expect(changed).toHaveBeenCalledTimes(2);
  });

  it("shows Add to Home Screen steps on iPhone and iPad, and a bookmark tip on desktop", () => {
    as(IPHONE, 5);
    expect(installKind()).toBe("ios");
    as(WINDOWS, 0);
    expect(installKind()).toBe("bookmark");
  });

  it("stays quiet on desktop Chromium, which offers its own install event", () => {
    as(WINDOWS, 0);
    Object.defineProperty(window, "onbeforeinstallprompt", { configurable: true, value: null });
    try {
      expect(installKind()).toBeNull();
    } finally {
      delete (window as { onbeforeinstallprompt?: unknown }).onbeforeinstallprompt;
    }
  });

  it("shows nothing once installed or after Not now, with separate snoozes for kids and parents", () => {
    as(IPHONE, 5);
    standalone = true;
    expect(isStandalone()).toBe(true);
    expect(installKind()).toBeNull();
    standalone = false;
    snoozeKids();
    expect(installKind(true)).toBeNull();
    expect(installKind()).toBe("ios");
    snooze();
    expect(installKind()).toBeNull();
  });

  it("counts Safari's home-screen mode as installed", () => {
    vi.stubGlobal("matchMedia", undefined);
    expect(isStandalone()).toBe(false);
    Object.defineProperty(navigator, "standalone", { configurable: true, value: true });
    try {
      expect(isStandalone()).toBe(true);
    } finally {
      delete (navigator as { standalone?: boolean }).standalone;
    }
  });

  it("treats blocked storage as not snoozed", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    expect(() => snooze()).not.toThrow();
    expect(isSnoozed()).toBe(false);
  });
});
