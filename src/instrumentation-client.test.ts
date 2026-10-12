// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const init = vi.fn();
const captureException = vi.fn();
vi.mock("@sentry/nextjs", () => ({ init, captureException }));

const settle = () => new Promise((r) => setTimeout(r, 0));

// The test dispatches error events by hand; mark them handled so jsdom doesn't report them as uncaught.
window.addEventListener("error", (e) => e.preventDefault());

// Each test imports the module afresh; take away the listeners the last copy left on window.
const added: [string, EventListenerOrEventListenerObject][] = [];
const addListener = window.addEventListener.bind(window);
vi.spyOn(window, "addEventListener").mockImplementation((type: string, fn: EventListenerOrEventListenerObject) => {
  added.push([type, fn]);
  addListener(type, fn);
});

describe("browser error reporting", () => {
  beforeEach(() => {
    vi.resetModules();
    init.mockClear();
    captureException.mockClear();
    vi.stubEnv("NEXT_PUBLIC_SENTRY_DSN", "https://public@example.invalid/1");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    for (const [type, fn] of added.splice(0)) window.removeEventListener(type, fn);
  });

  it("doesn't load Sentry while the page runs cleanly", async () => {
    await import("./instrumentation-client");
    await settle();
    expect(init).not.toHaveBeenCalled();
  });

  it("loads Sentry on the first error and sends the errors from before it was ready", async () => {
    await import("./instrumentation-client");
    const first = new Error("first");
    const second = new Error("second");
    window.dispatchEvent(new ErrorEvent("error", { cancelable: true, error: first }));
    window.dispatchEvent(Object.assign(new Event("unhandledrejection"), { reason: second }));
    await settle();
    expect(init).toHaveBeenCalledTimes(1);
    expect(captureException.mock.calls.map((c) => c[0])).toEqual([first, second]);

    // Sentry's own handlers take over, so later errors aren't reported twice.
    window.dispatchEvent(new ErrorEvent("error", { cancelable: true, error: new Error("later") }));
    await settle();
    expect(captureException).toHaveBeenCalledTimes(2);
  });

  it("ignores cross-origin errors that carry no details", async () => {
    await import("./instrumentation-client");
    window.dispatchEvent(new ErrorEvent("error", { cancelable: true, message: "Script error." }));
    await settle();
    expect(init).not.toHaveBeenCalled();
  });

  it("stays off without a DSN", async () => {
    vi.stubEnv("NEXT_PUBLIC_SENTRY_DSN", "");
    await import("./instrumentation-client");
    expect(added).toEqual([]);
  });
});
