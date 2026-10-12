import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Read-aloud picks Piper when a parent has turned it on and the voice is on this device,
// and falls back to the device voice when Piper can't play.
const piper = vi.hoisted(() => ({
  wanted: false,
  fail: false,
  spoken: [] as { text: string; lang: string }[],
  rates: [] as number[],
  stops: 0,
  autoDownloads: [] as string[],
  failed: [] as string[],
}));
vi.mock("./piper", () => ({
  piperCanSpeak: () => piper.wanted,
  piperMightSpeak: (lang: string) => piper.wanted && !piper.failed.includes(lang),
  piperWanted: async (lang: string) => piper.wanted && !piper.failed.includes(lang),
  autoDownloadPiper: async (lang: string) => void piper.autoDownloads.push(lang),
  markPiperFailed: (lang: string) => void piper.failed.push(lang),
  speakPiper: async (text: string, lang: string, rate: number) => {
    if (piper.fail) throw new Error("no wasm");
    piper.spoken.push({ text, lang });
    piper.rates.push(rate);
  },
  stopPiper: () => void piper.stops++,
}));

const synthSaid: string[] = [];
beforeEach(() => {
  Object.assign(piper, { wanted: false, fail: false, spoken: [], rates: [], stops: 0, autoDownloads: [], failed: [] });
  synthSaid.length = 0;
  vi.stubGlobal("window", globalThis);
  vi.stubGlobal("navigator", { onLine: true });
  vi.stubGlobal("localStorage", { getItem: () => null, setItem: () => {}, removeItem: () => {} });
  vi.stubGlobal("speechSynthesis", {
    getVoices: () => [],
    speak: (u: { text: string; onend?: () => void }) => {
      synthSaid.push(u.text);
      u.onend?.();
    },
    cancel: () => {},
    addEventListener: () => {},
  });
  vi.stubGlobal(
    "SpeechSynthesisUtterance",
    class {
      constructor(public text: string) {}
    },
  );
});
afterEach(() => vi.unstubAllGlobals());

const flush = () => new Promise((r) => setTimeout(r, 0));

describe("read-aloud with the Piper voice", () => {
  it("uses the device voice straight away when Piper is off, so it plays inside the tap", async () => {
    const { speak } = await import("./speech");
    speak("Seven take away 2¢");
    expect(synthSaid).toEqual(["Seven take away 2 cents"]);
    await flush();
    expect(piper.spoken).toEqual([]);
  });

  it("uses Piper when it's on, with the same speech clean-up", async () => {
    piper.wanted = true;
    const { speak } = await import("./speech");
    speak("3 − 1 = ☐", undefined, "fr");
    await flush();
    expect(piper.spoken).toEqual([{ text: "3 minus 1 = mot manquant", lang: "fr" }]);
    expect(synthSaid).toEqual([]);
  });

  it("reads Amy faster than her natural pace, in questions and the Settings preview", async () => {
    piper.wanted = true;
    const { speak, previewPiper } = await import("./speech");
    speak("Hello");
    await flush();
    await previewPiper("en");
    expect(piper.rates).toEqual([1.15, 1.15]);
  });

  it("falls back to the device voice when Piper can't play", async () => {
    piper.wanted = true;
    piper.fail = true;
    const { speak } = await import("./speech");
    speak("Hello");
    await flush();
    expect(synthSaid).toEqual(["Hello"]);
    // Then the device voice reads straight away, inside the tap, for the rest of the visit.
    expect(piper.failed).toEqual(["en"]);
    speak("Again");
    expect(synthSaid).toEqual(["Hello", "Again"]);
  });

  it("halves the pause before the answers when Piper reads", async () => {
    vi.useFakeTimers();
    try {
      piper.wanted = true;
      const { speakSegments } = await import("./speech");
      speakSegments([
        { text: "Which is bigger?", lang: "en" },
        { text: "Seven", lang: "en", pause: 600 },
      ]);
      await vi.advanceTimersByTimeAsync(299);
      expect(piper.spoken.map((s) => s.text)).toEqual(["Which is bigger?"]);
      await vi.advanceTimersByTimeAsync(2);
      expect(piper.spoken.map((s) => s.text)).toEqual(["Which is bigger?", "Seven"]);
    } finally {
      vi.useRealTimers();
    }
  });

  it("keeps the full pause for the device voice", async () => {
    vi.useFakeTimers();
    try {
      const { speakSegments } = await import("./speech");
      speakSegments([
        { text: "Which is bigger?", lang: "en" },
        { text: "Seven", lang: "en", pause: 600 },
      ]);
      await vi.advanceTimersByTimeAsync(599);
      expect(synthSaid).toEqual(["Which is bigger?"]);
      await vi.advanceTimersByTimeAsync(2);
      expect(synthSaid).toEqual(["Which is bigger?", "Seven"]);
    } finally {
      vi.useRealTimers();
    }
  });

  it("starts the background download of each language's voice when it is read (the speaker button, any grade), but not for a device-voice preview", async () => {
    const { speak, speakSegments, previewVoice } = await import("./speech");
    speak("Hello");
    expect(synthSaid).toEqual(["Hello"]);
    speakSegments([{ text: "chat", lang: "fr" }]);
    previewVoice(null);
    expect(piper.autoDownloads).toEqual(["en", "fr"]);
  });

  it("previewing a device voice always uses that voice", async () => {
    piper.wanted = true;
    const { previewVoice } = await import("./speech");
    previewVoice(null);
    await flush();
    expect(piper.spoken).toEqual([]);
    expect(synthSaid[0]).toMatch(/Ollie the Otter/);
  });

  it("reads each piece of a question in order and stops Piper when cancelled", async () => {
    piper.wanted = true;
    const { speakSegments, stopSpeaking } = await import("./speech");
    speakSegments([
      { text: "Which word means cat?", lang: "en" },
      { text: "chat", lang: "fr" },
    ]);
    for (let i = 0; i < 5; i++) await flush();
    expect(piper.spoken).toEqual([
      { text: "Which word means cat?", lang: "en" },
      { text: "chat", lang: "fr" },
    ]);
    const before = piper.stops;
    stopSpeaking();
    expect(piper.stops).toBe(before + 1);
  });
});
