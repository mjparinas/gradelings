// @vitest-environment jsdom
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SayQuestion as SayQ } from "@/content/types";

// What the voice question depends on, each set per test: the flag, the child's switch, a class student account and
// whether the listening model is ready.
const env = vi.hoisted(() => ({ flag: true, on: true, student: false, ready: true, samples: new Float32Array(10) as Float32Array | null, text: "three", fail: false }));

const READY = vi.hoisted(() => ({ state: "ready", done: 0, total: 0 }));
const IDLE = vi.hoisted(() => ({ state: "idle", done: 0, total: 0 }));

vi.mock("@/lib/remoteFlags", () => ({ useFlag: () => env.flag }));
vi.mock("@/lib/store", () => ({
  useChildSettings: () => ({ voice: env.on }),
  useStore: (pick: (s: unknown) => unknown) => pick({ family: { account: env.student ? { student: true } : {} } }),
}));
vi.mock("@/lib/whisper", () => ({
  subscribeWhisper: () => () => {},
  whisperSnapshot: () => (env.ready ? READY : IDLE),
  checkWhisper: vi.fn(async () => {}),
  warmWhisper: vi.fn(async () => {}),
  transcribe: vi.fn(async () => {
    if (env.fail) throw new Error("boom");
    return env.text;
  }),
}));
vi.mock("@/lib/recorder", () => ({
  listen: () => ({ result: Promise.resolve(env.samples), cancel: () => {}, stop: () => {} }),
}));
vi.mock("@/lib/speech", () => ({ speak: vi.fn() }));
vi.mock("@/lib/sound", () => ({ sounds: new Proxy({}, { get: () => () => {} }) }));

import { SayQuestion } from "./SayQuestion";

const q: SayQ = {
  kind: "say",
  prompt: "Count the stars out loud, or tap how many.",
  hint: "h",
  choices: [
    { id: "2", label: "2" },
    { id: "3", label: "3" },
    { id: "4", label: "4" },
  ],
  answer: "3",
  say: { count: 3 },
};

const show = () => {
  const onAttempt = vi.fn();
  const onSlip = vi.fn();
  render(<SayQuestion q={q} status="answering" onAttempt={onAttempt} onSlip={onSlip} />);
  return { onAttempt, onSlip };
};

beforeEach(() => {
  Object.assign(env, { flag: true, on: true, student: false, ready: true, samples: new Float32Array(10), text: "one two three", fail: false });
});

describe("SayQuestion", () => {
  it("is the tap question when voice is off, not downloaded, or the flag is off", () => {
    for (const patch of [{ flag: false }, { on: false }, { ready: false }]) {
      Object.assign(env, { flag: true, on: true, ready: true }, patch);
      const { unmount } = render(<SayQuestion q={q} status="answering" onAttempt={vi.fn()} onSlip={vi.fn()} />);
      expect(screen.queryByTestId("say-button")).toBeNull();
      expect(screen.getAllByTestId("choice")).toHaveLength(3);
      unmount();
    }
  });

  it("never listens in a class student account", () => {
    env.student = true;
    show();
    expect(screen.queryByTestId("say-button")).toBeNull();
    expect(screen.getAllByTestId("choice")).toHaveLength(3);
  });

  it("marks the child right when the right words are heard", async () => {
    const { onAttempt } = show();
    await userEvent.click(screen.getByTestId("say-button"));
    await waitFor(() => expect(onAttempt).toHaveBeenCalledWith(true, expect.anything()));
  });

  it("never marks wrong: not heard asks again, and taps come after two tries", async () => {
    env.text = "banana";
    const { onAttempt, onSlip } = show();
    await userEvent.click(screen.getByTestId("say-button"));
    await waitFor(() => expect(screen.getByRole("status")).toBeTruthy());
    await userEvent.click(screen.getByTestId("say-button"));
    await waitFor(() => expect(screen.getAllByTestId("choice")).toHaveLength(3));
    expect(onAttempt).not.toHaveBeenCalled();
    expect(onSlip).not.toHaveBeenCalled();
  });

  it("offers the taps when nothing was heard or the microphone fails", async () => {
    env.samples = null;
    show();
    await userEvent.click(screen.getByTestId("say-button"));
    await waitFor(() => expect(screen.getByRole("status").textContent).toMatch(/didn't hear/));
    await act(async () => {});
    expect(screen.getByTestId("say-button")).toBeTruthy();
  });

  it("falls back to taps when listening fails", async () => {
    env.fail = true;
    const { onAttempt } = show();
    await userEvent.click(screen.getByTestId("say-button"));
    await waitFor(() => expect(screen.getAllByTestId("choice")).toHaveLength(3));
    expect(onAttempt).not.toHaveBeenCalled();
  });
});
