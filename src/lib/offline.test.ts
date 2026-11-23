// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cacheLoadedScripts,
  clearStaleBuildReloadFlag,
  isStaleBuildError,
  onServiceWorkerControllerChange,
  reloadForNewBuild,
} from "./offline";

describe("cacheLoadedScripts", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(navigator, "serviceWorker", { configurable: true, value: undefined });
  });

  it("does nothing until a controlling service worker exists", () => {
    Object.defineProperty(navigator, "serviceWorker", { configurable: true, value: { controller: null } });
    expect(() => cacheLoadedScripts()).not.toThrow();
  });

  it("sends only loaded Next.js build resources to the service worker", () => {
    const postMessage = vi.fn();
    Object.defineProperty(navigator, "serviceWorker", { configurable: true, value: { controller: { postMessage } } });
    vi.spyOn(performance, "getEntriesByType").mockReturnValue([
      { name: `${location.origin}/_next/static/chunks/app.js` } as PerformanceResourceTiming,
      { name: `${location.origin}/api/sync/` } as PerformanceResourceTiming,
      { name: "https://cdn.example/image.png" } as PerformanceResourceTiming,
    ]);

    cacheLoadedScripts();

    expect(postMessage).toHaveBeenCalledWith({
      type: "cache-urls",
      urls: [`${location.origin}/_next/static/chunks/app.js`],
    });
  });
});

describe("isStaleBuildError", () => {
  it("recognises the Turbopack module-factory error from Sentry", () => {
    expect(
      isStaleBuildError(new Error("Module 422047 was instantiated because it was required from module 111486, but the module factory is not available.")),
    ).toBe(true);
  });

  it("recognises failed dynamic imports and chunk load errors", () => {
    expect(isStaleBuildError(new Error("Failed to fetch dynamically imported module: https://example/_next/static/chunks/x.js"))).toBe(true);
    expect(isStaleBuildError(new Error("ChunkLoadError: Loading chunk 123 failed."))).toBe(true);
    expect(isStaleBuildError("error loading dynamically imported module")).toBe(true);
  });

  it("ignores ordinary errors", () => {
    expect(isStaleBuildError(new Error("NetworkError when attempting to fetch resource."))).toBe(false);
    expect(isStaleBuildError(undefined)).toBe(false);
  });
});

describe("reloadForNewBuild", () => {
  afterEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it("reloads once, then refuses a second reload in the same tab session", () => {
    const reload = vi.fn();
    Object.defineProperty(window, "location", { configurable: true, value: { reload } });

    expect(reloadForNewBuild()).toBe(true);
    expect(reload).toHaveBeenCalledTimes(1);
    expect(reloadForNewBuild()).toBe(false);
    expect(reload).toHaveBeenCalledTimes(1);

    clearStaleBuildReloadFlag();
    expect(reloadForNewBuild()).toBe(true);
    expect(reload).toHaveBeenCalledTimes(2);
  });
});

describe("onServiceWorkerControllerChange", () => {
  afterEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
    Object.defineProperty(navigator, "serviceWorker", { configurable: true, value: undefined });
  });

  it("reloads when a new worker takes over a controlled page", () => {
    const reload = vi.fn();
    Object.defineProperty(window, "location", { configurable: true, value: { reload } });
    onServiceWorkerControllerChange(true);
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("caches scripts on the first claim of an uncontrolled page", () => {
    const reload = vi.fn();
    Object.defineProperty(window, "location", { configurable: true, value: { reload } });
    const postMessage = vi.fn();
    Object.defineProperty(navigator, "serviceWorker", { configurable: true, value: { controller: { postMessage } } });
    vi.spyOn(performance, "getEntriesByType").mockReturnValue([
      { name: `${location.origin}/_next/static/chunks/app.js` } as PerformanceResourceTiming,
    ]);

    onServiceWorkerControllerChange(false);

    expect(reload).not.toHaveBeenCalled();
    expect(postMessage).toHaveBeenCalledWith({
      type: "cache-urls",
      urls: [`${location.origin}/_next/static/chunks/app.js`],
    });
  });
});
