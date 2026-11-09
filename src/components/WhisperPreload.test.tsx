// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ChildSettings } from "@/lib/model";

const h = vi.hoisted(() => ({
  auto: vi.fn(),
  flag: true,
  state: { family: {}, profiles: [], settings: {} } as { family: { account?: { student?: boolean } }; profiles: { id: string; grade: string; deleted?: boolean }[]; settings: Record<string, Partial<ChildSettings>> },
}));
vi.mock("@/lib/whisper", () => ({ autoDownloadWhisper: h.auto, WHISPER_AUTO_RETRY_MS: 600_000 }));
vi.mock("@/lib/remoteFlags", () => ({ useFlag: () => h.flag }));
vi.mock("@/lib/store", () => ({ useStore: (pick: (s: typeof h.state) => unknown) => pick(h.state) }));

import { WhisperPreload } from "./WhisperPreload";

beforeEach(() => {
  vi.useFakeTimers();
  h.auto.mockReset().mockResolvedValue(true);
  h.flag = true;
  h.state = { family: {}, profiles: [{ id: "a", grade: "k" }], settings: {} };
});
afterEach(() => vi.useRealTimers());

const run = () => {
  render(<WhisperPreload />);
  vi.advanceTimersByTime(15_000);
};

describe("WhisperPreload", () => {
  it("downloads for a Kindergarten child with no saved choice", () => {
    run();
    expect(h.auto).toHaveBeenCalledTimes(1);
  });
  it("does nothing when the parent turned it off, the child is older, the flag is off or it is a class student", () => {
    h.state.settings = { a: { voice: false } };
    run();
    h.state = { family: {}, profiles: [{ id: "a", grade: "4" }], settings: {} };
    run();
    h.flag = false;
    h.state = { family: {}, profiles: [{ id: "a", grade: "k" }], settings: {} };
    run();
    h.flag = true;
    h.state = { family: { account: { student: true } }, profiles: [{ id: "a", grade: "k" }], settings: {} };
    run();
    expect(h.auto).not.toHaveBeenCalled();
  });
  it("downloads for an older child whose parent turned it on", () => {
    h.state = { family: {}, profiles: [{ id: "a", grade: "3" }], settings: { a: { voice: true } } };
    run();
    expect(h.auto).toHaveBeenCalledTimes(1);
  });
  it("retries quietly after a failure", async () => {
    h.auto.mockRejectedValueOnce(new Error("offline"));
    run();
    await vi.advanceTimersByTimeAsync(600_000);
    expect(h.auto).toHaveBeenCalledTimes(2);
  });
});
