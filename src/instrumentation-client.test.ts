// @vitest-environment jsdom
import { BrowserClient, defaultStackParser, eventFiltersIntegration, getDefaultIntegrations, type BrowserOptions } from "@sentry/browser";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const init = vi.fn<(options: BrowserOptions) => void>();
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

  it("runs Sentry's ignore rules and keeps application errors", async () => {
    await import("./instrumentation-client");
    window.dispatchEvent(new ErrorEvent("error", { cancelable: true, error: new Error("first") }));
    await settle();

    const [options] = init.mock.calls[0];
    const defaults = getDefaultIntegrations(options);
    const { integrations } = options;
    if (typeof integrations !== "function") throw new Error("Expected a Sentry integration allowlist");
    const filter = integrations(defaults).find((integration) => integration.name === eventFiltersIntegration().name);
    if (!filter?.processEvent) throw new Error("Sentry's event filter is missing from the browser integrations");

    const client = new BrowserClient({ ignoreErrors: options.ignoreErrors, integrations: [], stackParser: defaultStackParser, transport: vi.fn() });
    const ignored = ["Can't find variable: zaloJSV2", "QuotaExceededError", "Encountered disk full", "FILE_ERROR_NO_SPACE"];
    for (const value of ignored) {
      const event = { exception: { values: [{ value }] } };
      expect(await filter.processEvent(event, {}, client)).toBeNull();
    }
    const appError = { exception: { values: [{ value: "Could not load a lesson" }] } };
    expect(await filter.processEvent(appError, {}, client)).toEqual(appError);
  });

  it("ignores cross-origin errors that carry no details", async () => {
    await import("./instrumentation-client");
    window.dispatchEvent(new ErrorEvent("error", { cancelable: true, message: "Script error." }));
    await settle();
    expect(init).not.toHaveBeenCalled();
  });

  it("ignores promises rejected with nothing", async () => {
    await import("./instrumentation-client");
    window.dispatchEvent(Object.assign(new Event("unhandledrejection"), { reason: null }));
    window.dispatchEvent(Object.assign(new Event("unhandledrejection"), { reason: undefined }));
    await settle();
    expect(init).not.toHaveBeenCalled();
  });

  it("stays off without a DSN", async () => {
    vi.stubEnv("NEXT_PUBLIC_SENTRY_DSN", "");
    await import("./instrumentation-client");
    expect(added).toEqual([]);
  });
});
