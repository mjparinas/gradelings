import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import manifest from "./piper-manifest.json";
import { filesFor, PIPER_BASE, splitSentences, type PiperFileList } from "./piper";

describe("Piper sentence splitting", () => {
  it("splits on sentence ends so the first sentence can play early", () => {
    expect(splitSentences("Hi! I'm Ollie the Otter. Let's count: one, two, three. Great job!")).toEqual([
      "Hi!",
      "I'm Ollie the Otter.",
      "Let's count: one, two, three.",
      "Great job!",
    ]);
    expect(splitSentences("Line one\nLine two")).toEqual(["Line one", "Line two"]);
  });

  it("drops pieces with nothing to say and splits very long sentences between words", () => {
    expect(splitSentences("... ! ?")).toEqual([]);
    const long = Array.from({ length: 120 }, (_, i) => `word${i}`).join(" ");
    const parts = splitSentences(long);
    expect(parts.length).toBeGreaterThan(1);
    expect(parts.every((p) => p.length <= 300)).toBe(true);
    expect(parts.join(" ")).toBe(long);
  });
});

describe("Piper files", () => {
  it("has an English and a French voice pinned by sha256", () => {
    for (const lang of ["en", "fr"] as const) {
      const v = manifest.voices[lang];
      expect(v.id.startsWith(lang)).toBe(true);
      expect(Object.keys(v.files).sort()).toEqual([`${v.id}.onnx`, `${v.id}.onnx.json`]);
      for (const hash of Object.values(v.files)) expect(hash).toMatch(/^[0-9a-f]{64}$/);
    }
    expect(manifest.voiceSource).toBe(`https://github.com/mjparinas/gradelings/releases/download/piper-voices-${manifest.version}/`);
  });

  it("copies engine files that exist in node_modules", () => {
    for (const from of Object.values(manifest.engine)) expect(fs.existsSync(path.join("node_modules", from)), from).toBe(true);
  });

  it("downloads the engine plus only the chosen language's voice", () => {
    const list: PiperFileList = { version: "1", engine: { "a.wasm": 10 }, voices: { en: { "en.onnx": 50 }, fr: { "fr.onnx": 40 } } };
    expect(filesFor(list, "fr")).toEqual([
      [`${PIPER_BASE}a.wasm`, 10],
      [`${PIPER_BASE}fr.onnx`, 40],
    ]);
  });
});

// ---- Download, check and remove, with a fake Cache API ----

const LIST: PiperFileList = { version: manifest.version, engine: { "engine.wasm": 6 }, voices: { en: { "en.onnx": 4 }, fr: { "fr.onnx": 3 } } };

function fakeCaches() {
  const stores = new Map<string, Map<string, Response>>();
  const open = async (name: string) => {
    if (!stores.has(name)) stores.set(name, new Map());
    const m = stores.get(name)!;
    const key = (r: RequestInfo | URL) => new URL(typeof r === "string" ? r : r instanceof URL ? r.href : r.url, "http://x").pathname;
    return {
      match: async (r: RequestInfo) => m.get(key(r))?.clone(),
      put: async (r: RequestInfo, res: Response) => void m.set(key(r), res),
      delete: async (r: RequestInfo) => m.delete(key(r)),
      keys: async () => [...m.keys()].map((k) => new Request(`http://x${k}`)),
    };
  };
  return { stores, api: { open, delete: async (name: string) => stores.delete(name) } };
}

function serve(url: string): Response {
  const name = url.slice(url.lastIndexOf("/") + 1);
  if (url.endsWith("files.json")) return new Response(JSON.stringify(LIST));
  if (url === "/piper-worker.js") return new Response("// worker");
  const bytes = { ...LIST.engine, ...LIST.voices.en, ...LIST.voices.fr }[name];
  return bytes ? new Response(new Uint8Array(bytes)) : new Response("", { status: 404 });
}

describe("Piper download on this device", () => {
  let caches: ReturnType<typeof fakeCaches>;
  beforeEach(() => {
    vi.resetModules();
    caches = fakeCaches();
    const storage = new Map<string, string>();
    vi.stubGlobal("window", globalThis);
    vi.stubGlobal("caches", caches.api);
    vi.stubGlobal("Worker", class {});
    vi.stubGlobal("AudioContext", class {});
    vi.stubGlobal("localStorage", { getItem: (k: string) => storage.get(k) ?? null, setItem: (k: string, v: string) => storage.set(k, v), removeItem: (k: string) => storage.delete(k) });
    vi.stubGlobal("fetch", vi.fn(async (url: string) => serve(url)));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("is on by default, downloads with progress, and is used once here", async () => {
    const piper = await import("./piper");
    expect(await piper.piperWanted("en")).toBe(false);
    expect(piper.getPiperState()).toMatchObject({ enabled: true, voices: { en: { state: "missing" } } });
    expect(await piper.piperDownloadBytes("en")).toBe(10);

    await piper.downloadPiper("en");
    const s = piper.getPiperState();
    expect(s.voices.en).toMatchObject({ state: "ready", loaded: 10, total: 10 });
    expect(s.voices.fr.state).toBe("missing");
    expect(await piper.piperWanted("en")).toBe(true);
    piper.setPiperEnabled(false);
    expect(await piper.piperWanted("en")).toBe(false);
    piper.setPiperEnabled(true);
    expect(await piper.piperWanted("en")).toBe(true);
    expect(await piper.piperWanted("fr")).toBe(false);
    // French only needs its own voice now that the engine is here.
    expect(await piper.piperDownloadBytes("fr")).toBe(3);
  });

  it("remembers the download and the choice after a reload, and clears old versions", async () => {
    let piper = await import("./piper");
    await piper.downloadPiper("en");
    piper.setPiperEnabled(true);
    const store = caches.stores.get(piper.PIPER_CACHE)!;
    store.set("/piper/0/old.onnx", new Response("old"));

    vi.resetModules();
    piper = await import("./piper");
    expect(await piper.piperWanted("en")).toBe(true);
    expect(store.has("/piper/0/old.onnx")).toBe(false);
    expect(store.has("/piper-worker.js")).toBe(true);
  });

  it("isn't ready if a file is missing, and says so when the download fails offline", async () => {
    let piper = await import("./piper");
    await piper.downloadPiper("en");
    caches.stores.get(piper.PIPER_CACHE)!.delete(`${piper.PIPER_BASE}en.onnx`);
    vi.resetModules();
    piper = await import("./piper");
    expect((await piper.piperWanted("en"), piper.getPiperState().voices.en.state)).toBe("missing");

    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new TypeError("offline"))));
    vi.stubGlobal("navigator", { onLine: false });
    await piper.downloadPiper("en");
    expect(piper.getPiperState().voices.en).toMatchObject({ state: "missing", error: expect.stringMatching(/offline/) });
  });

  it("knows without waiting when Piper won't read, so the device voice starts inside the tap", async () => {
    let piper = await import("./piper");
    await piper.piperWanted("en");
    expect(piper.piperMightSpeak("en")).toBe(false);
    await piper.downloadPiper("en");
    vi.resetModules();
    piper = await import("./piper");
    // Switched on but not checked yet: it might, so read-aloud waits for the check.
    expect(piper.piperMightSpeak("en")).toBe(true);
    await piper.piperWanted("en");
    expect(piper.piperMightSpeak("en")).toBe(true);
    expect(piper.piperMightSpeak("fr")).toBe(false);
    piper.setPiperEnabled(false);
    expect(piper.piperMightSpeak("en")).toBe(false);
    piper.setPiperEnabled(true);
    // After Piper fails, the device voice reads for the rest of the visit.
    piper.markPiperFailed("en");
    expect(piper.piperMightSpeak("en")).toBe(false);
    expect(await piper.piperWanted("en")).toBe(false);
  });

  it("removing French keeps English, and removing English turns the voice off", async () => {
    const piper = await import("./piper");
    await piper.downloadPiper("en");
    await piper.downloadPiper("fr");
    piper.setPiperEnabled(true);
    await piper.removePiper("fr");
    expect(await piper.piperWanted("en")).toBe(true);
    expect(piper.getPiperState().voices.fr.state).toBe("missing");
    await piper.removePiper("en");
    expect(piper.getPiperState().enabled).toBe(false);
    expect(caches.stores.has(piper.PIPER_CACHE)).toBe(false);
  });
});

describe("Piper as the default voice", () => {
  let caches: ReturnType<typeof fakeCaches>;
  let storage: Map<string, string>;
  let nav: { onLine: boolean; webdriver?: boolean; connection?: object; storage?: object };
  beforeEach(() => {
    vi.resetModules();
    caches = fakeCaches();
    storage = new Map<string, string>();
    nav = { onLine: true };
    vi.stubGlobal("window", globalThis);
    vi.stubGlobal("navigator", nav);
    vi.stubGlobal("caches", caches.api);
    vi.stubGlobal("Worker", class {});
    vi.stubGlobal("AudioContext", class {});
    vi.stubGlobal("localStorage", { getItem: (k: string) => storage.get(k) ?? null, setItem: (k: string, v: string) => storage.set(k, v), removeItem: (k: string) => storage.delete(k) });
    vi.stubGlobal("fetch", vi.fn(async (url: string) => serve(url)));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("downloads a language's voice in the background the first time it's read, then uses it", async () => {
    const piper = await import("./piper");
    expect(await piper.autoDownloadPiper("en")).toBe(true);
    expect(await piper.piperWanted("en")).toBe(true);
    // French waits until French is read aloud.
    expect(piper.getPiperState().voices.fr.state).toBe("missing");
    expect(await piper.autoDownloadPiper("en")).toBe(false);
    expect(await piper.autoDownloadPiper("fr")).toBe(true);
    expect(await piper.piperWanted("fr")).toBe(true);
  });

  it("doesn't download on mobile data, Data Saver, offline, in test browsers, or with little space", async () => {
    const piper = await import("./piper");
    for (const connection of [{ type: "cellular" }, { saveData: true }, { effectiveType: "2g" }]) {
      nav.connection = connection;
      expect(await piper.autoDownloadPiper("en"), JSON.stringify(connection)).toBe(false);
    }
    nav.connection = { type: "wifi", effectiveType: "4g" };
    nav.onLine = false;
    expect(await piper.autoDownloadPiper("en")).toBe(false);
    nav.onLine = true;
    nav.webdriver = true;
    expect(await piper.autoDownloadPiper("en")).toBe(false);
    nav.webdriver = false;
    nav.storage = { estimate: async () => ({ quota: 300e6, usage: 200e6 }) };
    expect(await piper.autoDownloadPiper("en")).toBe(false);
    expect(piper.getPiperState().voices.en.state).toBe("missing");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("is on even where a device voice was picked before, and stays off once a parent switches it off", async () => {
    storage.set("grademap.voice", "Samantha");
    let piper = await import("./piper");
    expect(await piper.autoDownloadPiper("en")).toBe(true);
    expect(piper.getPiperState().enabled).toBe(true);

    storage.clear();
    storage.set("grademap.piper", "off");
    vi.resetModules();
    piper = await import("./piper");
    expect(await piper.autoDownloadPiper("fr")).toBe(false);
    expect(piper.getPiperState().voices.fr.state).toBe("missing");
  });

  it("preloads English, then French, one after the other", async () => {
    const piper = await import("./piper");
    await piper.preloadPiperVoices(["en", "fr"]);
    expect(piper.getPiperState().voices).toMatchObject({ en: { state: "ready" }, fr: { state: "ready" } });
  });

  it("doesn't download when the admin flag is off", async () => {
    storage.set("grademap.flags", JSON.stringify({ flags: { "piper-auto-download": false }, variants: {} }));
    const piper = await import("./piper");
    expect(await piper.autoDownloadPiper("en")).toBe(false);
  });

  it("a background download that fails shows no error and waits before trying again", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 503 })));
    const piper = await import("./piper");
    expect(await piper.autoDownloadPiper("en")).toBe(true);
    expect(piper.getPiperState().voices.en).toMatchObject({ state: "missing" });
    expect(piper.getPiperState().voices.en.error).toBeUndefined();
    expect(await piper.autoDownloadPiper("en")).toBe(false);
  });

  it("removing the English voice switches it off, so it doesn't come back by itself", async () => {
    let piper = await import("./piper");
    await piper.autoDownloadPiper("en");
    await piper.removePiper("en");
    vi.resetModules();
    piper = await import("./piper");
    expect(await piper.autoDownloadPiper("en")).toBe(false);
    expect(piper.getPiperState().enabled).toBe(false);
  });
});

describe("Piper download problems", () => {
  let caches: ReturnType<typeof fakeCaches>;
  let fetchMock: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    vi.resetModules();
    caches = fakeCaches();
    const storage = new Map<string, string>();
    vi.stubGlobal("window", globalThis);
    vi.stubGlobal("caches", caches.api);
    vi.stubGlobal("Worker", class {});
    vi.stubGlobal("AudioContext", class {});
    vi.stubGlobal("localStorage", { getItem: (k: string) => storage.get(k) ?? null, setItem: (k: string, v: string) => storage.set(k, v), removeItem: (k: string) => storage.delete(k) });
    fetchMock = vi.fn(async (url: string) => serve(url));
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("navigator", { onLine: true });
  });
  afterEach(() => vi.unstubAllGlobals());

  it("says the voice isn't available when the server doesn't serve it", async () => {
    const piper = await import("./piper");
    fetchMock.mockImplementation(async () => new Response("", { status: 404 }));
    expect(await piper.piperDownloadBytes("en")).toBeUndefined();
    await piper.downloadPiper("en");
    expect(piper.getPiperState().voices.en).toMatchObject({ state: "missing", error: "The voice isn't available right now." });
  });

  it("says the voice isn't available when the list has no voice for the language", async () => {
    const piper = await import("./piper");
    const list = { ...LIST, voices: { en: LIST.voices.en } };
    fetchMock.mockImplementation(async (url: string) => (url.endsWith("files.json") ? new Response(JSON.stringify(list)) : serve(url)));
    expect(await piper.piperDownloadBytes("fr")).toBeUndefined();
    await piper.downloadPiper("fr");
    expect(piper.getPiperState().voices.fr).toMatchObject({ state: "missing", error: "The voice isn't available right now." });
  });

  it("stops cleanly when a file fails half-way, and only fetches what is still missing next time", async () => {
    const piper = await import("./piper");
    fetchMock.mockImplementation(async (url: string) => (url.endsWith("en.onnx") ? new Response("", { status: 500 }) : serve(url)));
    await piper.downloadPiper("en");
    expect(piper.getPiperState().voices.en).toMatchObject({ state: "missing", error: "The download stopped. Check the connection and try again." });
    // The engine arrived before the failure and is kept.
    expect(caches.stores.get(piper.PIPER_CACHE)!.has(`${piper.PIPER_BASE}engine.wasm`)).toBe(true);

    fetchMock.mockClear();
    fetchMock.mockImplementation(async (url: string) => serve(url));
    await piper.downloadPiper("en");
    const fetched = fetchMock.mock.calls.map(([u]) => u as string);
    expect(fetched).not.toContain(`${piper.PIPER_BASE}engine.wasm`);
    expect(fetched).toContain(`${piper.PIPER_BASE}en.onnx`);
    expect(piper.getPiperState().voices.en).toMatchObject({ state: "ready", total: 4, loaded: 4, error: undefined });
  });

  it("gives a general message for unexpected failures while online", async () => {
    const piper = await import("./piper");
    fetchMock.mockImplementation(async (url: string) => (url.endsWith("files.json") ? new Response("not json") : serve(url)));
    await piper.downloadPiper("en");
    expect(piper.getPiperState().voices.en.error).toBe("The download didn't finish. Try again.");
    fetchMock.mockImplementation(async () => Promise.reject(new TypeError("network")));
    expect(await piper.piperDownloadBytes("en")).toBeUndefined();
  });

  it("asks the browser to keep the files when space runs low", async () => {
    const persist = vi.fn(async () => true);
    vi.stubGlobal("navigator", { onLine: true, storage: { persist } });
    const piper = await import("./piper");
    await piper.downloadPiper("en");
    expect(persist).toHaveBeenCalledOnce();
  });

  it("removing a voice with no saved list clears the whole cache", async () => {
    const piper = await import("./piper");
    const store = await caches.api.open(piper.PIPER_CACHE);
    await store.put(`${piper.PIPER_BASE}engine.wasm`, new Response("x"));
    await piper.removePiper("fr");
    expect(caches.stores.has(piper.PIPER_CACHE)).toBe(false);
  });

  it("is off and missing where the browser can't run it", async () => {
    vi.stubGlobal("Worker", undefined);
    const piper = await import("./piper");
    expect(piper.piperSupported()).toBe(false);
    expect(await piper.piperWanted("en")).toBe(false);
    expect(piper.getPiperState().voices).toMatchObject({ en: { state: "missing" }, fr: { state: "missing" } });
    expect(piper.piperMightSpeak("en")).toBe(false);
    expect(piper.piperCanSpeak()).toBe(false);
  });

  it("falls back to the default (on) when storage is blocked, without throwing", async () => {
    const blocked = () => {
      throw new Error("SecurityError");
    };
    vi.stubGlobal("localStorage", { getItem: blocked, setItem: blocked, removeItem: blocked });
    const piper = await import("./piper");
    await piper.downloadPiper("en");
    expect(() => piper.setPiperEnabled(false)).not.toThrow();
    expect(piper.piperMightSpeak("en")).toBe(true);
    vi.resetModules();
    const again = await import("./piper");
    expect(await again.piperWanted("en")).toBe(true);
  });

  it("treats a broken cache as missing voices", async () => {
    vi.stubGlobal("caches", { open: async () => Promise.reject(new Error("QuotaExceeded")) });
    const piper = await import("./piper");
    expect(await piper.piperWanted("en")).toBe(false);
    expect(piper.getPiperState().voices.fr.state).toBe("missing");
  });

  it("tells subscribers about changes until they unsubscribe", async () => {
    const piper = await import("./piper");
    const listener = vi.fn();
    const stop = piper.subscribePiper(listener);
    piper.setPiperEnabled(true);
    expect(listener).toHaveBeenCalled();
    stop();
    listener.mockClear();
    piper.setPiperEnabled(false);
    expect(listener).not.toHaveBeenCalled();
  });
});

// ---- Speaking, with a fake worker and audio graph ----

class FakeWorker {
  static all: FakeWorker[] = [];
  posted: Record<string, unknown>[] = [];
  private listeners = new Map<string, Set<(e: MessageEvent) => void>>();
  constructor(readonly url: string) {
    FakeWorker.all.push(this);
  }
  postMessage(m: Record<string, unknown>) {
    this.posted.push(m);
  }
  addEventListener(type: string, l: (e: MessageEvent) => void) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)!.add(l);
  }
  removeEventListener(type: string, l: (e: MessageEvent) => void) {
    this.listeners.get(type)?.delete(l);
  }
  emit(data: unknown) {
    for (const l of [...(this.listeners.get("message") ?? [])]) l({ data } as MessageEvent);
  }
  /** The worker script itself failed to load or crashed. */
  crash() {
    for (const l of [...(this.listeners.get("error") ?? [])]) l({} as MessageEvent);
  }
  get listening() {
    return this.listeners.get("message")?.size ?? 0;
  }
}

interface FakeSource {
  buffer: { duration: number } | null;
  start: ReturnType<typeof vi.fn>;
  stop: ReturnType<typeof vi.fn>;
  onended: (() => void) | null;
  connect: () => void;
}
class FakeAudio {
  static all: FakeAudio[] = [];
  state = "suspended";
  currentTime = 5;
  destination = {};
  sources: FakeSource[] = [];
  resume = vi.fn(async () => void (this.state = "running"));
  constructor() {
    FakeAudio.all.push(this);
  }
  createBuffer(_channels: number, length: number, rate: number) {
    return { duration: length / rate, copyToChannel: vi.fn() };
  }
  createBufferSource() {
    const s: FakeSource = { buffer: null, start: vi.fn(), stop: vi.fn(), onended: null, connect: () => undefined };
    this.sources.push(s);
    return s;
  }
}

describe("speakPiper", () => {
  let piper: typeof import("./piper");
  const worker = () => FakeWorker.all[0];
  const audio = () => FakeAudio.all[0];
  const lastSpeak = () => worker().posted.filter((m) => m.type === "speak").at(-1)! as { id: number; sentences: string[] };
  const chunk = (id: number, samples: number) => worker().emit({ type: "chunk", id, pcm: new Float32Array(samples), sampleRate: 1000 });

  beforeEach(async () => {
    vi.resetModules();
    FakeWorker.all = [];
    FakeAudio.all = [];
    vi.stubGlobal("Worker", FakeWorker);
    vi.stubGlobal("AudioContext", FakeAudio);
    piper = await import("./piper");
  });
  afterEach(() => vi.unstubAllGlobals());

  it("sends the sentences to the worker and plays each chunk right after the one before", async () => {
    let done = false;
    const p = piper.speakPiper("Hello there. How are you?", "fr", 0.92).then(() => (done = true));
    expect(audio().resume).toHaveBeenCalledOnce();
    expect(worker().url).toBe("/piper-worker.js");
    const speak = lastSpeak();
    expect(speak).toMatchObject({ type: "speak", base: piper.PIPER_BASE, voice: piper.PIPER_VOICES.fr.id, sentences: ["Hello there.", "How are you?"], rate: 0.92 });

    chunk(speak.id, 500);
    chunk(speak.id, 250);
    const [a, b] = audio().sources;
    expect(a.start).toHaveBeenCalledWith(5.02);
    expect(b.start).toHaveBeenCalledWith(5.52);

    a.onended!();
    await Promise.resolve();
    expect(done).toBe(false);
    b.onended!();
    await p;
    expect(worker().listening).toBe(0);
  });

  it("finishes after the last sentence even when a chunk is silent", async () => {
    const p = piper.speakPiper("One. Two.", "en");
    const { id } = lastSpeak();
    chunk(id, 100);
    audio().sources[0].onended!();
    chunk(id, 0);
    await expect(p).resolves.toBeUndefined();
  });

  it("says nothing for text with no words, and keeps one worker and audio context", async () => {
    await piper.speakPiper("... !", "en");
    expect(worker()).toBeUndefined();
    await piper.speakPiper("", "en");
    const p = piper.speakPiper("Hi.", "en");
    piper.stopPiper();
    await p;
    const q = piper.speakPiper("Hi again.", "en");
    piper.stopPiper();
    await q;
    expect(FakeWorker.all).toHaveLength(1);
    expect(FakeAudio.all).toHaveLength(1);
  });

  it("rejects when the worker fails before any sound, so the device voice can take over", async () => {
    const p = piper.speakPiper("Hi.", "en");
    worker().emit({ type: "error", id: lastSpeak().id, message: "model failed" });
    await expect(p).rejects.toThrow("model failed");
  });

  it("rejects when the worker can't load, and starts a fresh worker next time", async () => {
    const p = piper.speakPiper("Hi.", "en");
    worker().crash();
    await expect(p).rejects.toThrow("The voice couldn't load.");
    const q = piper.speakPiper("Hi again.", "en");
    expect(FakeWorker.all).toHaveLength(2);
    piper.stopPiper();
    await q;
  });

  it("gives up and cancels when no sound starts in time, so the device voice can read", async () => {
    vi.useFakeTimers();
    try {
      const p = piper.speakPiper("Hi.", "en");
      const { id } = lastSpeak();
      const failed = expect(p).rejects.toThrow("The voice took too long to start.");
      await vi.advanceTimersByTimeAsync(piper.PIPER_FIRST_AUDIO_MS);
      await failed;
      expect(worker().posted.at(-1)).toEqual({ type: "cancel", id });
    } finally {
      vi.useRealTimers();
    }
  });

  it("keeps reading past the time limit once sound has started", async () => {
    vi.useFakeTimers();
    try {
      const p = piper.speakPiper("One. Two.", "en");
      const { id } = lastSpeak();
      chunk(id, 100);
      await vi.advanceTimersByTimeAsync(piper.PIPER_FIRST_AUDIO_MS * 2);
      expect(worker().posted.at(-1)).toMatchObject({ type: "speak" });
      audio().sources[0].onended!();
      chunk(id, 0);
      await expect(p).resolves.toBeUndefined();
    } finally {
      vi.useRealTimers();
    }
  });

  it("ends quietly when the worker fails after it started speaking", async () => {
    const p = piper.speakPiper("One. Two.", "en");
    const { id } = lastSpeak();
    chunk(id, 100);
    worker().emit({ type: "error", id, message: "late failure" });
    await expect(p).resolves.toBeUndefined();
  });

  it("ignores messages for other requests", async () => {
    let done = false;
    const p = piper.speakPiper("Hi.", "en").then(() => (done = true));
    const { id } = lastSpeak();
    worker().emit({ type: "error", id: id + 100, message: "not mine" });
    worker().emit({ type: "progress", id });
    worker().emit(null);
    await Promise.resolve();
    expect(done).toBe(false);
    expect(audio().sources).toHaveLength(0);
    chunk(id, 0);
    await p;
  });

  it("stopping cancels the request, silences queued audio and resolves", async () => {
    const p = piper.speakPiper("One. Two.", "en");
    const { id } = lastSpeak();
    chunk(id, 100);
    const src = audio().sources[0];
    src.stop.mockImplementationOnce(() => {
      throw new Error("InvalidStateError");
    });
    piper.stopPiper();
    await expect(p).resolves.toBeUndefined();
    expect(worker().posted.at(-1)).toEqual({ type: "cancel", id });
    expect(src.onended).toBeNull();
    // A late chunk for the stopped request plays nothing.
    chunk(id, 100);
    expect(audio().sources).toHaveLength(1);
  });

  it("starting a new sentence stops the one still playing", async () => {
    const first = piper.speakPiper("First.", "en");
    const firstId = lastSpeak().id;
    const second = piper.speakPiper("Second.", "en");
    await expect(first).resolves.toBeUndefined();
    expect(worker().posted).toContainEqual({ type: "cancel", id: firstId });
    expect(lastSpeak().id).toBeGreaterThan(firstId);
    piper.stopPiper();
    await second;
  });
});
