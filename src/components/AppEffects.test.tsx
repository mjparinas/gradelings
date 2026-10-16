// @vitest-environment jsdom
import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ replay: vi.fn(), warmConfetti: vi.fn(), cacheLoadedScripts: vi.fn(), tap: vi.fn() }));
vi.mock("@/lib/juice", () => ({ replay: mocks.replay, warmConfetti: mocks.warmConfetti }));
vi.mock("@/lib/offline", () => ({ cacheLoadedScripts: mocks.cacheLoadedScripts }));
vi.mock("@/lib/sound", () => ({ sounds: { tap: mocks.tap } }));

import { AppEffects, SW_DELAY_MS } from "./AppEffects";

function page(html: string) {
  document.body.innerHTML = html;
}

beforeEach(() => {
  for (const m of Object.values(mocks)) m.mockReset();
  window.history.replaceState(null, "", "/");
});

afterEach(() => {
  vi.unstubAllEnvs();
  Reflect.deleteProperty(navigator, "serviceWorker");
  document.body.innerHTML = "";
});

describe("AppEffects", () => {
  it("clicks and springs a button, but keeps quiet buttons quiet", () => {
    render(<AppEffects />);
    page('<button class="btn" id="a"><span id="inner">Go</span></button><button class="btn" data-quiet id="q">Hush</button><p id="text">Plain</p>');

    fireEvent.pointerDown(document.getElementById("inner")!);
    expect(mocks.tap).toHaveBeenCalledOnce();
    fireEvent.pointerUp(document.getElementById("inner")!);
    expect(mocks.replay).toHaveBeenLastCalledWith(document.getElementById("a"), "jelly");

    fireEvent.pointerDown(document.getElementById("q")!);
    expect(mocks.tap).toHaveBeenCalledOnce();
    fireEvent.pointerUp(document.getElementById("q")!);
    expect(mocks.replay).toHaveBeenLastCalledWith(document.getElementById("q"), "jelly");

    // Taps outside a button do nothing.
    fireEvent.pointerDown(document.getElementById("text")!);
    fireEvent.pointerUp(document.getElementById("text")!);
    expect(mocks.tap).toHaveBeenCalledOnce();
    expect(mocks.replay).toHaveBeenLastCalledWith(null, "jelly");
  });

  it("ignores a disabled button", () => {
    render(<AppEffects />);
    page('<button class="btn" disabled id="d">Wait</button>');
    fireEvent.pointerDown(document.getElementById("d")!);
    fireEvent.pointerUp(document.getElementById("d")!);
    expect(mocks.tap).not.toHaveBeenCalled();
    expect(mocks.replay).toHaveBeenCalledWith(null, "jelly");
  });

  it("stops listening when it unmounts", () => {
    const { unmount } = render(<AppEffects />);
    unmount();
    page('<button class="btn" id="a">Go</button>');
    fireEvent.pointerDown(document.getElementById("a")!);
    expect(mocks.tap).not.toHaveBeenCalled();
  });

  it.each([
    ["/play/", true],
    ["/parents/", true],
    ["/guides/bc/", false],
    ["/", false],
  ])("warms the confetti on %s: %s", (path, warms) => {
    window.history.replaceState(null, "", path);
    render(<AppEffects />);
    expect(mocks.warmConfetti).toHaveBeenCalledTimes(warms ? 1 : 0);
  });

  it("registers the service worker only in a production build", () => {
    const register = vi.fn().mockResolvedValue(undefined);
    const addEventListener = vi.fn();
    Object.defineProperty(navigator, "serviceWorker", { configurable: true, value: { register, addEventListener } });

    const { unmount } = render(<AppEffects />);
    expect(register).not.toHaveBeenCalled();
    unmount();

    vi.stubEnv("NODE_ENV", "production");
    window.history.replaceState(null, "", "/play/");
    render(<AppEffects />);
    expect(register).toHaveBeenCalledWith("/sw.js");
    expect(addEventListener).toHaveBeenCalledWith("controllerchange", mocks.cacheLoadedScripts);
    expect(mocks.cacheLoadedScripts).toHaveBeenCalledOnce();
  });

  it("waits until a public page has settled before installing the service worker", () => {
    vi.useFakeTimers();
    try {
      vi.stubEnv("NODE_ENV", "production");
      const register = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, "serviceWorker", { configurable: true, value: { register, addEventListener: vi.fn() } });
      window.history.replaceState(null, "", "/curriculum/");
      render(<AppEffects />);
      // The worker downloads both apps, so it waits while the visitor's next pages are prefetched.
      expect(register).not.toHaveBeenCalled();
      vi.advanceTimersByTime(SW_DELAY_MS - 1);
      expect(register).not.toHaveBeenCalled();
      vi.advanceTimersByTime(SW_DELAY_MS + 1);
      expect(register).toHaveBeenCalledWith("/sw.js");
    } finally {
      vi.useRealTimers();
    }
  });

  it("doesn't install the worker from a public page that is left before it settles", () => {
    vi.useFakeTimers();
    try {
      vi.stubEnv("NODE_ENV", "production");
      const register = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, "serviceWorker", { configurable: true, value: { register, addEventListener: vi.fn() } });
      const { unmount } = render(<AppEffects />);
      unmount();
      vi.advanceTimersByTime(SW_DELAY_MS * 3);
      expect(register).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  it("carries on when the service worker can't register", async () => {
    vi.stubEnv("NODE_ENV", "production");
    window.history.replaceState(null, "", "/play/");
    const register = vi.fn().mockRejectedValue(new Error("blocked"));
    Object.defineProperty(navigator, "serviceWorker", { configurable: true, value: { register, addEventListener: vi.fn() } });
    render(<AppEffects />);
    await expect(register.mock.results[0].value).rejects.toThrow("blocked");
    // The rejection is handled inside AppEffects, so nothing is left unhandled.
    await new Promise((r) => setTimeout(r, 0));
  });
});
