// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { IOS_APP_AGENT, isAndroidApp, isIosApp, isStoreApp } from "./twa";

beforeEach(() => {
  window.sessionStorage.clear();
  window.history.replaceState({}, "", "/parents/");
});
afterEach(() => vi.restoreAllMocks());

describe("isAndroidApp", () => {
  it("is false in an ordinary browser", () => {
    expect(isAndroidApp()).toBe(false);
  });
  it("is true for the app's start URL, and stays true on later pages", () => {
    window.history.replaceState({}, "", "/play/?app=android");
    expect(isAndroidApp()).toBe(true);
    window.history.replaceState({}, "", "/parents/");
    expect(isAndroidApp()).toBe(true);
  });
});

describe("isIosApp", () => {
  it("is false in an ordinary browser, including Safari on an iPhone", () => {
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1");
    expect(isIosApp()).toBe(false);
    expect(isStoreApp()).toBe(false);
  });
  it("is true for the app's start URL, and stays true on later pages", () => {
    window.history.replaceState({}, "", "/play/?app=ios");
    expect(isIosApp()).toBe(true);
    window.history.replaceState({}, "", "/parents/");
    expect(isIosApp()).toBe(true);
    expect(isAndroidApp()).toBe(false);
    expect(isStoreApp()).toBe(true);
  });
  it("is true from the app's user agent, even after the session is cleared", () => {
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue(`Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 ${IOS_APP_AGENT}/1.0.0`);
    expect(isIosApp()).toBe(true);
  });
});
