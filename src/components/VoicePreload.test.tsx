// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ChildSettings } from "@/lib/model";

const h = vi.hoisted(() => ({ preload: vi.fn(), settings: {} as Record<string, Partial<ChildSettings>> }));
vi.mock("@/lib/piper", () => ({ preloadPiperVoices: h.preload }));
vi.mock("@/lib/store", () => ({ useStore: (pick: (s: { settings: typeof h.settings }) => unknown) => pick({ settings: h.settings }) }));

import { VoicePreload } from "./VoicePreload";

beforeEach(() => {
  vi.useFakeTimers();
  h.preload.mockReset().mockResolvedValue(undefined);
  h.settings = {};
});
afterEach(() => vi.useRealTimers());

describe("VoicePreload", () => {
  it("downloads the English voice in the background when a child has read-aloud on", () => {
    h.settings = { a: { autoRead: false, enabledSubjects: ["math"] }, b: { autoRead: true, enabledSubjects: ["math", "language"] } };
    render(<VoicePreload />);
    expect(h.preload).not.toHaveBeenCalled();
    vi.advanceTimersByTime(10_000);
    expect(h.preload).toHaveBeenCalledWith(["en"]);
  });

  it("downloads nothing when no child has read-aloud on, and only adds French for a reading child who takes it", () => {
    h.settings = { a: { autoRead: false, enabledSubjects: ["math", "immersion"] } };
    const { unmount } = render(<VoicePreload />);
    vi.advanceTimersByTime(10_000);
    expect(h.preload).not.toHaveBeenCalled();
    unmount();
    h.settings = { a: { autoRead: true, enabledSubjects: ["math"] }, b: { autoRead: false, enabledSubjects: ["core-french"] } };
    const second = render(<VoicePreload />);
    vi.advanceTimersByTime(10_000);
    expect(h.preload).toHaveBeenLastCalledWith(["en"]);
    second.unmount();
    h.settings = { a: { autoRead: true, enabledSubjects: ["math", "core-french"] } };
    render(<VoicePreload />);
    vi.advanceTimersByTime(10_000);
    expect(h.preload).toHaveBeenCalledWith(["en", "fr"]);
  });
});
