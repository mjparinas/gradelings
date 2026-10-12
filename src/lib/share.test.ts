// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { shareOrCopy } from "./share";

const touch = (coarse: boolean) => vi.stubGlobal("matchMedia", (q: string) => ({ matches: coarse && q === "(pointer: coarse)" }));

afterEach(() => {
  vi.unstubAllGlobals();
  // @ts-expect-error test cleanup
  delete navigator.share;
});

function stubClipboard(ok = true) {
  const writeText = vi.fn(async () => {
    if (!ok) throw new Error("denied");
  });
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
  return writeText;
}

describe("shareOrCopy", () => {
  it("opens the share sheet on a touch device", async () => {
    touch(true);
    const share = vi.fn(async () => {});
    Object.defineProperty(navigator, "share", { value: share, configurable: true });
    const writeText = stubClipboard();
    expect(await shareOrCopy("https://x.test/a/", "A", "Look")).toBe("shared");
    expect(share).toHaveBeenCalledWith({ title: "A", text: "Look", url: "https://x.test/a/" });
    expect(writeText).not.toHaveBeenCalled();
  });

  it("does nothing more when the parent closes the share sheet", async () => {
    touch(true);
    Object.defineProperty(navigator, "share", { value: vi.fn(async () => Promise.reject(new DOMException("no", "AbortError"))), configurable: true });
    const writeText = stubClipboard();
    expect(await shareOrCopy("https://x.test/a/", "A")).toBe("cancelled");
    expect(writeText).not.toHaveBeenCalled();
  });

  it("copies the link on a computer, and says when it can't", async () => {
    touch(false);
    Object.defineProperty(navigator, "share", { value: vi.fn(), configurable: true });
    const writeText = stubClipboard();
    expect(await shareOrCopy("https://x.test/a/", "A")).toBe("copied");
    expect(writeText).toHaveBeenCalledWith("https://x.test/a/");
    stubClipboard(false);
    expect(await shareOrCopy("https://x.test/a/", "A")).toBe("failed");
  });
});
