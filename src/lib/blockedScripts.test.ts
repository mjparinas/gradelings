// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { failIfBlocked, isBlockedScript, noticeError, resetBlockedScripts, retryDownloads, scriptBlocked } from "./blockedScripts";

const syntax = (message: string) => new SyntaxError(message);
const chunk = `${location.origin}/_next/static/immutable/chunks/2ze6wy_5a3xff.js`;
const blockedEvent = { message: "Uncaught SyntaxError: Unexpected token '<'", filename: chunk, error: syntax("Unexpected token '<'") };

afterEach(resetBlockedScripts);

describe("blocked build files", () => {
  it("recognises one of our build files that arrived as a web page", () => {
    expect(isBlockedScript(blockedEvent)).toBe(true);
    // Firefox's wording.
    expect(isBlockedScript({ message: "SyntaxError: expected expression, got '<'", filename: chunk })).toBe(true);
  });

  it("ignores other errors and other sites' scripts", () => {
    expect(isBlockedScript({ ...blockedEvent, filename: "https://elsewhere.example/_next/static/x.js" })).toBe(false);
    expect(isBlockedScript({ ...blockedEvent, filename: `${location.origin}/play/` })).toBe(false);
    expect(isBlockedScript({ message: "Unexpected token '}'", filename: chunk, error: syntax("Unexpected token '}'") })).toBe(false);
    expect(isBlockedScript({ message: "TypeError: x is undefined", filename: chunk, error: new TypeError("x is undefined") })).toBe(false);
  });

  it("fails a download that is still waiting when a file is blocked, so the app stops waiting forever", async () => {
    const stuck = failIfBlocked(new Promise(() => {}));
    noticeError(blockedEvent);
    await expect(stuck).rejects.toMatchObject({ name: "BlockedScriptError" });
    expect(scriptBlocked()).toBe(true);
  });

  it("passes a normal download through, and an unrelated error changes nothing", async () => {
    let finish!: (v: string) => void;
    const download = failIfBlocked(new Promise<string>((r) => (finish = r)));
    noticeError({ message: "TypeError", filename: chunk, error: new TypeError("nope") });
    finish("grade 1");
    await expect(download).resolves.toBe("grade 1");
    await expect(failIfBlocked(Promise.reject(new Error("offline")))).rejects.toThrow("offline");
    expect(scriptBlocked()).toBe(false);
  });

  it("hears blocked files through the window's error event", async () => {
    const stuck = failIfBlocked(new Promise(() => {}));
    window.dispatchEvent(new ErrorEvent("error", blockedEvent));
    await expect(stuck).rejects.toMatchObject({ name: "BlockedScriptError" });
  });

  it("tries again in place, or with a fresh page load once a file was blocked", () => {
    const retry = vi.fn();
    const reload = vi.fn();
    retryDownloads(retry, reload);
    expect([retry.mock.calls.length, reload.mock.calls.length]).toEqual([1, 0]);
    noticeError(blockedEvent);
    retryDownloads(retry, reload);
    expect([retry.mock.calls.length, reload.mock.calls.length]).toEqual([1, 1]);
  });
});
