import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import manifest from "./kokoro-manifest.json";
import { filesFor, KOKORO_BASE, splitSentences, type KokoroFileList } from "./kokoro";

describe("Kokoro sentence splitting", () => {
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

describe("Kokoro files", () => {
  it("has an English and a French voice, and a model, pinned by sha256", () => {
    for (const lang of ["en", "fr"] as const) {
      const v = manifest.voices[lang];
      expect(Object.keys(v.files)).toEqual([`voices/${v.id}.bin`]);
      expect(v.espeak.startsWith(lang)).toBe(true);
      for (const hash of Object.values(v.files)) expect(hash).toMatch(/^[0-9a-f]{64}$/);
    }
    expect(Object.keys(manifest.model).sort()).toEqual(["onnx/model_quantized.onnx", "tokenizer.json"]);
    for (const hash of Object.values(manifest.model)) expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(manifest.source).toBe(`https://github.com/mjparinas/gradelings/releases/download/kokoro-voices-${manifest.version}/`);
  });

  it("copies engine files that exist in node_modules", () => {
    for (const from of Object.values(manifest.engine)) expect(fs.existsSync(path.join("node_modules", from)), from).toBe(true);
  });

  it("downloads the engine plus only the chosen language's voice", () => {
    const list: KokoroFileList = { version: "1", engine: { "a.wasm": 10 }, voices: { en: { "en.onnx": 50 }, fr: { "fr.onnx": 40 } } };
    expect(filesFor(list, "fr")).toEqual([
      [`${KOKORO_BASE}a.wasm`, 10],
      [`${KOKORO_BASE}fr.onnx`, 40],
    ]);
  });
});

// ---- Download, check and remove, with a fake Cache API ----

const LIST: KokoroFileList = { version: manifest.version, engine: { "engine.wasm": 6 }, voices: { en: { "en.onnx": 4 }, fr: { "fr.onnx": 3 } } };

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
  if (url === "/kokoro-worker.js") return new Response("// worker");
  const bytes = { ...LIST.engine, ...LIST.voices.en, ...LIST.voices.fr }[name];
  return bytes ? new Response(new Uint8Array(bytes)) : new Response("", { status: 404 });
}

describe("Kokoro worker", () => {
  const source = fs.readFileSync(path.join("public", "kokoro-worker.js"), "utf8");

  it("turns the phonemizer's ids back into the signs of piper's standard phoneme table", () => {
    const literal = source.match(/PHONEME_SIGNS = Array\.from\((".*")\);/)![1];
    const signs = Array.from(JSON.parse(literal) as string);
    expect(signs.length).toBe(154);
    expect(signs.slice(0, 4)).toEqual(["_", "^", "$", " "]);
    // Stress marks, length and a nasal vowel's tilde are what French and English both lean on.
    for (const sign of ["ˈ", "ˌ", "ː", "\u0303", "ɹ", "ʁ", "ɔ", "ɑ"]) expect(signs, sign).toContain(sign);
  });

  it("uses the files and the model the download fetches", () => {
    for (const name of ["model_quantized.onnx", "tokenizer.json"]) expect(source).toContain(name);
    expect(source).toContain('const CACHE = "grademap-kokoro"');
  });
});

describe("Kokoro download on this device", () => {
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
    const kokoro = await import("./kokoro");
    expect(await kokoro.kokoroWanted("en")).toBe(false);
    expect(kokoro.getKokoroState()).toMatchObject({ enabled: true, voices: { en: { state: "missing" } } });
    expect(await kokoro.kokoroDownloadBytes("en")).toBe(10);

    await kokoro.downloadKokoro("en");
    const s = kokoro.getKokoroState();
    expect(s.voices.en).toMatchObject({ state: "ready", loaded: 10, total: 10 });
    expect(s.voices.fr.state).toBe("missing");
    expect(await kokoro.kokoroWanted("en")).toBe(true);
    kokoro.setKokoroEnabled(false);
    expect(await kokoro.kokoroWanted("en")).toBe(false);
    kokoro.setKokoroEnabled(true);
    expect(await kokoro.kokoroWanted("en")).toBe(true);
    expect(await kokoro.kokoroWanted("fr")).toBe(false);
    // French only needs its own voice now that the engine is here.
    expect(await kokoro.kokoroDownloadBytes("fr")).toBe(3);
  });

  it("remembers the download and the choice after a reload, and clears old versions", async () => {
    let kokoro = await import("./kokoro");
    await kokoro.downloadKokoro("en");
    kokoro.setKokoroEnabled(true);
    const store = caches.stores.get(kokoro.KOKORO_CACHE)!;
    store.set("/kokoro/0/old.onnx", new Response("old"));

    vi.resetModules();
    kokoro = await import("./kokoro");
    expect(await kokoro.kokoroWanted("en")).toBe(true);
    expect(store.has("/kokoro/0/old.onnx")).toBe(false);
    expect(store.has("/kokoro-worker.js")).toBe(true);
  });

  it("isn't ready if a file is missing, and says so when the download fails offline", async () => {
    let kokoro = await import("./kokoro");
    await kokoro.downloadKokoro("en");
    caches.stores.get(kokoro.KOKORO_CACHE)!.delete(`${kokoro.KOKORO_BASE}en.onnx`);
    vi.resetModules();
    kokoro = await import("./kokoro");
    expect((await kokoro.kokoroWanted("en"), kokoro.getKokoroState().voices.en.state)).toBe("missing");

    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new TypeError("offline"))));
    vi.stubGlobal("navigator", { onLine: false });
    await kokoro.downloadKokoro("en");
    expect(kokoro.getKokoroState().voices.en).toMatchObject({ state: "missing", error: expect.stringMatching(/offline/) });
  });

  it("knows without waiting when Kokoro won't read, so the device voice starts inside the tap", async () => {
    let kokoro = await import("./kokoro");
    await kokoro.kokoroWanted("en");
    expect(kokoro.kokoroMightSpeak("en")).toBe(false);
    await kokoro.downloadKokoro("en");
    vi.resetModules();
    kokoro = await import("./kokoro");
    // Switched on but not checked yet: it might, so read-aloud waits for the check.
    expect(kokoro.kokoroMightSpeak("en")).toBe(true);
    await kokoro.kokoroWanted("en");
    expect(kokoro.kokoroMightSpeak("en")).toBe(true);
    expect(kokoro.kokoroMightSpeak("fr")).toBe(false);
    kokoro.setKokoroEnabled(false);
    expect(kokoro.kokoroMightSpeak("en")).toBe(false);
    kokoro.setKokoroEnabled(true);
    // After Kokoro fails, the device voice reads for the rest of the visit.
    kokoro.markKokoroFailed("en");
    expect(kokoro.kokoroMightSpeak("en")).toBe(false);
    expect(await kokoro.kokoroWanted("en")).toBe(false);
  });

  it("removing French keeps English, and removing English turns the voice off", async () => {
    const kokoro = await import("./kokoro");
    await kokoro.downloadKokoro("en");
    await kokoro.downloadKokoro("fr");
    kokoro.setKokoroEnabled(true);
    await kokoro.removeKokoro("fr");
    expect(await kokoro.kokoroWanted("en")).toBe(true);
    expect(kokoro.getKokoroState().voices.fr.state).toBe("missing");
    await kokoro.removeKokoro("en");
    expect(kokoro.getKokoroState().enabled).toBe(false);
    expect(caches.stores.has(kokoro.KOKORO_CACHE)).toBe(false);
  });
});

describe("Kokoro as the default voice", () => {
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
    const kokoro = await import("./kokoro");
    expect(await kokoro.autoDownloadKokoro("en")).toBe(true);
    expect(await kokoro.kokoroWanted("en")).toBe(true);
    // French waits until French is read aloud.
    expect(kokoro.getKokoroState().voices.fr.state).toBe("missing");
    expect(await kokoro.autoDownloadKokoro("en")).toBe(false);
    expect(await kokoro.autoDownloadKokoro("fr")).toBe(true);
    expect(await kokoro.kokoroWanted("fr")).toBe(true);
  });

  it("doesn't download on mobile data, Data Saver, offline, in test browsers, or with little space", async () => {
    const kokoro = await import("./kokoro");
    for (const connection of [{ type: "cellular" }, { saveData: true }, { effectiveType: "2g" }]) {
      nav.connection = connection;
      expect(await kokoro.autoDownloadKokoro("en"), JSON.stringify(connection)).toBe(false);
    }
    nav.connection = { type: "wifi", effectiveType: "4g" };
    nav.onLine = false;
    expect(await kokoro.autoDownloadKokoro("en")).toBe(false);
    nav.onLine = true;
    nav.webdriver = true;
    expect(await kokoro.autoDownloadKokoro("en")).toBe(false);
    nav.webdriver = false;
    nav.storage = { estimate: async () => ({ quota: 300e6, usage: 200e6 }) };
    expect(await kokoro.autoDownloadKokoro("en")).toBe(false);
    expect(kokoro.getKokoroState().voices.en.state).toBe("missing");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("is on even where a device voice was picked before, and stays off once a parent switches it off", async () => {
    storage.set("grademap.voice", "Samantha");
    let kokoro = await import("./kokoro");
    expect(await kokoro.autoDownloadKokoro("en")).toBe(true);
    expect(kokoro.getKokoroState().enabled).toBe(true);

    storage.clear();
    storage.set("grademap.kokoro", "off");
    vi.resetModules();
    kokoro = await import("./kokoro");
    expect(await kokoro.autoDownloadKokoro("fr")).toBe(false);
    expect(kokoro.getKokoroState().voices.fr.state).toBe("missing");
  });

  it("keeps a parent's choice to switch the old voice off, and removes the old voice's files", async () => {
    localStorage.setItem("grademap.piper", "off");
    const old = await caches.api.open("grademap-piper");
    await old.put("/piper/2/files.json", new Response("{}"));
    const kokoro = await import("./kokoro");
    expect(await kokoro.kokoroWanted("en")).toBe(false);
    expect(kokoro.getKokoroState().enabled).toBe(false);
    expect(caches.stores.has("grademap-piper")).toBe(false);
  });

  it("preloads English, then French, one after the other", async () => {
    const kokoro = await import("./kokoro");
    await kokoro.preloadKokoroVoices(["en", "fr"]);
    expect(kokoro.getKokoroState().voices).toMatchObject({ en: { state: "ready" }, fr: { state: "ready" } });
  });

  it("doesn't download when the admin flag is off", async () => {
    storage.set("grademap.flags", JSON.stringify({ flags: { "kokoro-auto-download": false }, variants: {} }));
    const kokoro = await import("./kokoro");
    expect(await kokoro.autoDownloadKokoro("en")).toBe(false);
  });

  it("a background download that fails shows no error and waits before trying again", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 503 })));
    const kokoro = await import("./kokoro");
    expect(await kokoro.autoDownloadKokoro("en")).toBe(true);
    expect(kokoro.getKokoroState().voices.en).toMatchObject({ state: "missing" });
    expect(kokoro.getKokoroState().voices.en.error).toBeUndefined();
    expect(await kokoro.autoDownloadKokoro("en")).toBe(false);
  });

  it("removing the English voice switches it off, so it doesn't come back by itself", async () => {
    let kokoro = await import("./kokoro");
    await kokoro.autoDownloadKokoro("en");
    await kokoro.removeKokoro("en");
    vi.resetModules();
    kokoro = await import("./kokoro");
    expect(await kokoro.autoDownloadKokoro("en")).toBe(false);
    expect(kokoro.getKokoroState().enabled).toBe(false);
  });
});

describe("Kokoro download problems", () => {
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
    const kokoro = await import("./kokoro");
    fetchMock.mockImplementation(async () => new Response("", { status: 404 }));
    expect(await kokoro.kokoroDownloadBytes("en")).toBeUndefined();
    await kokoro.downloadKokoro("en");
    expect(kokoro.getKokoroState().voices.en).toMatchObject({ state: "missing", error: "The voice isn't available right now." });
  });

  it("says the voice isn't available when the list has no voice for the language", async () => {
    const kokoro = await import("./kokoro");
    const list = { ...LIST, voices: { en: LIST.voices.en } };
    fetchMock.mockImplementation(async (url: string) => (url.endsWith("files.json") ? new Response(JSON.stringify(list)) : serve(url)));
    expect(await kokoro.kokoroDownloadBytes("fr")).toBeUndefined();
    await kokoro.downloadKokoro("fr");
    expect(kokoro.getKokoroState().voices.fr).toMatchObject({ state: "missing", error: "The voice isn't available right now." });
  });

  it("stops cleanly when a file fails half-way, and only fetches what is still missing next time", async () => {
    const kokoro = await import("./kokoro");
    fetchMock.mockImplementation(async (url: string) => (url.endsWith("en.onnx") ? new Response("", { status: 500 }) : serve(url)));
    await kokoro.downloadKokoro("en");
    expect(kokoro.getKokoroState().voices.en).toMatchObject({ state: "missing", error: "The download stopped. Check the connection and try again." });
    // The engine arrived before the failure and is kept.
    expect(caches.stores.get(kokoro.KOKORO_CACHE)!.has(`${kokoro.KOKORO_BASE}engine.wasm`)).toBe(true);

    fetchMock.mockClear();
    fetchMock.mockImplementation(async (url: string) => serve(url));
    await kokoro.downloadKokoro("en");
    const fetched = fetchMock.mock.calls.map(([u]) => u as string);
    expect(fetched).not.toContain(`${kokoro.KOKORO_BASE}engine.wasm`);
    expect(fetched).toContain(`${kokoro.KOKORO_BASE}en.onnx`);
    expect(kokoro.getKokoroState().voices.en).toMatchObject({ state: "ready", total: 4, loaded: 4, error: undefined });
  });

  it("gives a general message for unexpected failures while online", async () => {
    const kokoro = await import("./kokoro");
    fetchMock.mockImplementation(async (url: string) => (url.endsWith("files.json") ? new Response("not json") : serve(url)));
    await kokoro.downloadKokoro("en");
    expect(kokoro.getKokoroState().voices.en.error).toBe("The download didn't finish. Try again.");
    fetchMock.mockImplementation(async () => Promise.reject(new TypeError("network")));
    expect(await kokoro.kokoroDownloadBytes("en")).toBeUndefined();
  });

  it("asks the browser to keep the files when space runs low", async () => {
    const persist = vi.fn(async () => true);
    vi.stubGlobal("navigator", { onLine: true, storage: { persist } });
    const kokoro = await import("./kokoro");
    await kokoro.downloadKokoro("en");
    expect(persist).toHaveBeenCalledOnce();
  });

  it("removing a voice with no saved list clears the whole cache", async () => {
    const kokoro = await import("./kokoro");
    const store = await caches.api.open(kokoro.KOKORO_CACHE);
    await store.put(`${kokoro.KOKORO_BASE}engine.wasm`, new Response("x"));
    await kokoro.removeKokoro("fr");
    expect(caches.stores.has(kokoro.KOKORO_CACHE)).toBe(false);
  });

  it("is off and missing where the browser can't run it", async () => {
    vi.stubGlobal("Worker", undefined);
    const kokoro = await import("./kokoro");
    expect(kokoro.kokoroSupported()).toBe(false);
    expect(await kokoro.kokoroWanted("en")).toBe(false);
    expect(kokoro.getKokoroState().voices).toMatchObject({ en: { state: "missing" }, fr: { state: "missing" } });
    expect(kokoro.kokoroMightSpeak("en")).toBe(false);
    expect(kokoro.kokoroCanSpeak()).toBe(false);
  });

  it("falls back to the default (on) when storage is blocked, without throwing", async () => {
    const blocked = () => {
      throw new Error("SecurityError");
    };
    vi.stubGlobal("localStorage", { getItem: blocked, setItem: blocked, removeItem: blocked });
    const kokoro = await import("./kokoro");
    await kokoro.downloadKokoro("en");
    expect(() => kokoro.setKokoroEnabled(false)).not.toThrow();
    expect(kokoro.kokoroMightSpeak("en")).toBe(true);
    vi.resetModules();
    const again = await import("./kokoro");
    expect(await again.kokoroWanted("en")).toBe(true);
  });

  it("treats a broken cache as missing voices", async () => {
    vi.stubGlobal("caches", { open: async () => Promise.reject(new Error("QuotaExceeded")) });
    const kokoro = await import("./kokoro");
    expect(await kokoro.kokoroWanted("en")).toBe(false);
    expect(kokoro.getKokoroState().voices.fr.state).toBe("missing");
  });

  it("tells subscribers about changes until they unsubscribe", async () => {
    const kokoro = await import("./kokoro");
    const listener = vi.fn();
    const stop = kokoro.subscribeKokoro(listener);
    kokoro.setKokoroEnabled(true);
    expect(listener).toHaveBeenCalled();
    stop();
    listener.mockClear();
    kokoro.setKokoroEnabled(false);
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

describe("speakKokoro", () => {
  let kokoro: typeof import("./kokoro");
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
    kokoro = await import("./kokoro");
  });
  afterEach(() => vi.unstubAllGlobals());

  it("sends the sentences to the worker and plays each chunk right after the one before", async () => {
    let done = false;
    const p = kokoro.speakKokoro("Hello there. How are you?", "fr", 0.92).then(() => (done = true));
    expect(audio().resume).toHaveBeenCalledOnce();
    expect(worker().url).toBe("/kokoro-worker.js");
    const speak = lastSpeak();
    expect(speak).toMatchObject({ type: "speak", base: kokoro.KOKORO_BASE, voice: kokoro.KOKORO_VOICES.fr.id, sentences: ["Hello there.", "How are you?"], rate: 0.92 });

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
    const p = kokoro.speakKokoro("One. Two.", "en");
    const { id } = lastSpeak();
    chunk(id, 100);
    audio().sources[0].onended!();
    chunk(id, 0);
    await expect(p).resolves.toBeUndefined();
  });

  it("says nothing for text with no words, and keeps one worker and audio context", async () => {
    await kokoro.speakKokoro("... !", "en");
    expect(worker()).toBeUndefined();
    await kokoro.speakKokoro("", "en");
    const p = kokoro.speakKokoro("Hi.", "en");
    kokoro.stopKokoro();
    await p;
    const q = kokoro.speakKokoro("Hi again.", "en");
    kokoro.stopKokoro();
    await q;
    expect(FakeWorker.all).toHaveLength(1);
    expect(FakeAudio.all).toHaveLength(1);
  });

  it("rejects when the worker fails before any sound, so the device voice can take over", async () => {
    const p = kokoro.speakKokoro("Hi.", "en");
    worker().emit({ type: "error", id: lastSpeak().id, message: "model failed" });
    await expect(p).rejects.toThrow("model failed");
  });

  it("rejects when the worker can't load, and starts a fresh worker next time", async () => {
    const p = kokoro.speakKokoro("Hi.", "en");
    worker().crash();
    await expect(p).rejects.toThrow("The voice couldn't load.");
    const q = kokoro.speakKokoro("Hi again.", "en");
    expect(FakeWorker.all).toHaveLength(2);
    kokoro.stopKokoro();
    await q;
  });

  it("gives up and cancels when no sound starts in time, so the device voice can read", async () => {
    vi.useFakeTimers();
    try {
      const p = kokoro.speakKokoro("Hi.", "en");
      const { id } = lastSpeak();
      const failed = expect(p).rejects.toThrow("The voice took too long to start.");
      await vi.advanceTimersByTimeAsync(kokoro.KOKORO_FIRST_AUDIO_MS);
      await failed;
      expect(worker().posted.at(-1)).toEqual({ type: "cancel", id });
    } finally {
      vi.useRealTimers();
    }
  });

  it("keeps reading past the time limit once sound has started", async () => {
    vi.useFakeTimers();
    try {
      const p = kokoro.speakKokoro("One. Two.", "en");
      const { id } = lastSpeak();
      chunk(id, 100);
      await vi.advanceTimersByTimeAsync(kokoro.KOKORO_FIRST_AUDIO_MS * 2);
      expect(worker().posted.at(-1)).toMatchObject({ type: "speak" });
      audio().sources[0].onended!();
      chunk(id, 0);
      await expect(p).resolves.toBeUndefined();
    } finally {
      vi.useRealTimers();
    }
  });

  it("ends quietly when the worker fails after it started speaking", async () => {
    const p = kokoro.speakKokoro("One. Two.", "en");
    const { id } = lastSpeak();
    chunk(id, 100);
    worker().emit({ type: "error", id, message: "late failure" });
    await expect(p).resolves.toBeUndefined();
  });

  it("ignores messages for other requests", async () => {
    let done = false;
    const p = kokoro.speakKokoro("Hi.", "en").then(() => (done = true));
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
    const p = kokoro.speakKokoro("One. Two.", "en");
    const { id } = lastSpeak();
    chunk(id, 100);
    const src = audio().sources[0];
    src.stop.mockImplementationOnce(() => {
      throw new Error("InvalidStateError");
    });
    kokoro.stopKokoro();
    await expect(p).resolves.toBeUndefined();
    expect(worker().posted.at(-1)).toEqual({ type: "cancel", id });
    expect(src.onended).toBeNull();
    // A late chunk for the stopped request plays nothing.
    chunk(id, 100);
    expect(audio().sources).toHaveLength(1);
  });

  it("starting a new sentence stops the one still playing", async () => {
    const first = kokoro.speakKokoro("First.", "en");
    const firstId = lastSpeak().id;
    const second = kokoro.speakKokoro("Second.", "en");
    await expect(first).resolves.toBeUndefined();
    expect(worker().posted).toContainEqual({ type: "cancel", id: firstId });
    expect(lastSpeak().id).toBeGreaterThan(firstId);
    kokoro.stopKokoro();
    await second;
  });
});
