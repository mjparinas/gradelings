import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Read-aloud picks Kokoro when a parent has turned it on and the voice is on this device,
// and falls back to the device voice when Kokoro can't play.
const kokoro = vi.hoisted(() => ({
  wanted: false,
  fail: false,
  spoken: [] as { text: string; lang: string }[],
  rates: [] as number[],
  stops: 0,
  autoDownloads: [] as string[],
  failed: [] as string[],
}));
vi.mock("./kokoro", () => ({
  kokoroCanSpeak: () => kokoro.wanted,
  kokoroMightSpeak: (lang: string) => kokoro.wanted && !kokoro.failed.includes(lang),
  kokoroWanted: async (lang: string) => kokoro.wanted && !kokoro.failed.includes(lang),
  autoDownloadKokoro: async (lang: string) => void kokoro.autoDownloads.push(lang),
  markKokoroFailed: (lang: string) => void kokoro.failed.push(lang),
  speakKokoro: async (text: string, lang: string, rate: number) => {
    if (kokoro.fail) throw new Error("no wasm");
    kokoro.spoken.push({ text, lang });
    kokoro.rates.push(rate);
  },
  stopKokoro: () => void kokoro.stops++,
}));

const synthSaid: string[] = [];
beforeEach(() => {
  Object.assign(kokoro, { wanted: false, fail: false, spoken: [], rates: [], stops: 0, autoDownloads: [], failed: [] });
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

describe("read-aloud with the Kokoro voice", () => {
  it("uses the device voice straight away when Kokoro is off, so it plays inside the tap", async () => {
    const { speak } = await import("./speech");
    speak("Seven take away 2¢");
    expect(synthSaid).toEqual(["Seven take away 2 cents"]);
    await flush();
    expect(kokoro.spoken).toEqual([]);
  });

  it("uses Kokoro when it's on, with the same speech clean-up", async () => {
    kokoro.wanted = true;
    const { speak } = await import("./speech");
    speak("3 − 1 = ☐", undefined, "fr");
    await flush();
    expect(kokoro.spoken).toEqual([{ text: "3 minus 1 = mot manquant", lang: "fr" }]);
    expect(synthSaid).toEqual([]);
  });

  it("reads Heart a touch slower than her natural pace, in questions and the Settings preview", async () => {
    kokoro.wanted = true;
    const { speak, previewKokoro } = await import("./speech");
    speak("Hello");
    await flush();
    await previewKokoro("en");
    expect(kokoro.rates).toEqual([0.9, 0.9]);
  });

  it("falls back to the device voice when Kokoro can't play", async () => {
    kokoro.wanted = true;
    kokoro.fail = true;
    const { speak } = await import("./speech");
    speak("Hello");
    await flush();
    expect(synthSaid).toEqual(["Hello"]);
    // Then the device voice reads straight away, inside the tap, for the rest of the visit.
    expect(kokoro.failed).toEqual(["en"]);
    speak("Again");
    expect(synthSaid).toEqual(["Hello", "Again"]);
  });

  it("halves the pause before the answers when Kokoro reads", async () => {
    vi.useFakeTimers();
    try {
      kokoro.wanted = true;
      const { speakSegments } = await import("./speech");
      speakSegments([
        { text: "Which is bigger?", lang: "en" },
        { text: "Seven", lang: "en", pause: 600 },
      ]);
      await vi.advanceTimersByTimeAsync(299);
      expect(kokoro.spoken.map((s) => s.text)).toEqual(["Which is bigger?"]);
      await vi.advanceTimersByTimeAsync(2);
      expect(kokoro.spoken.map((s) => s.text)).toEqual(["Which is bigger?", "Seven"]);
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
    expect(kokoro.autoDownloads).toEqual(["en", "fr"]);
  });

  it("previewing a device voice always uses that voice", async () => {
    kokoro.wanted = true;
    const { previewVoice } = await import("./speech");
    previewVoice(null);
    await flush();
    expect(kokoro.spoken).toEqual([]);
    expect(synthSaid[0]).toMatch(/Ollie the Otter/);
  });

  it("reads each piece of a question in order and stops Kokoro when cancelled", async () => {
    kokoro.wanted = true;
    const { speakSegments, stopSpeaking } = await import("./speech");
    speakSegments([
      { text: "Which word means cat?", lang: "en" },
      { text: "chat", lang: "fr" },
    ]);
    for (let i = 0; i < 5; i++) await flush();
    expect(kokoro.spoken).toEqual([
      { text: "Which word means cat?", lang: "en" },
      { text: "chat", lang: "fr" },
    ]);
    const before = kokoro.stops;
    stopSpeaking();
    expect(kokoro.stops).toBe(before + 1);
  });
});
