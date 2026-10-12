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
  it("downloads the English voice in the background when the app opens, without waiting for read-aloud", () => {
    h.settings = { a: { enabledSubjects: ["math", "language"] } };
    render(<VoicePreload />);
    expect(h.preload).not.toHaveBeenCalled();
    vi.advanceTimersByTime(10_000);
    expect(h.preload).toHaveBeenCalledWith(["en"]);
  });

  it("adds the French voice once a child has French switched on", () => {
    h.settings = { a: { enabledSubjects: ["math"] }, b: { enabledSubjects: ["math", "core-french"] } };
    render(<VoicePreload />);
    vi.advanceTimersByTime(10_000);
    expect(h.preload).toHaveBeenCalledWith(["en", "fr"]);
  });
});
