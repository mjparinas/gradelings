import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import manifest from "./supertonic-manifest.json";
import { filesFor, SUPERTONIC_BASE, splitSentences, supertonicText, type SupertonicFileList } from "./supertonic";

describe("Supertonic sentence splitting", () => {
  it("splits on sentence ends so the first sentence can play early", () => {
    expect(splitSentences("Hi! I'm Ollie the Otter. Let's count: one, two, three. Great job!")).toEqual([
      "Hi!",
      "I'm Ollie the Otter.",
      "Let's count: one, two, three.",
      "Great job!",
    ]);
    expect(splitSentences("Line one\nLine two")).toEqual(["Line one", "Line two"]);
  });

  it("keeps decimals and money whole", () => {
    expect(splitSentences("A circle is 10 cm wide. Using 3.14 for pi, what is its area? It costs $4.50.")).toEqual([
      "A circle is 10 cm wide.",
      "Using 3.14 for pi, what is its area?",
      "It costs $4.50.",
    ]);
    expect(splitSentences("The day is…")).toEqual(["The day is…"]);
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

// The Supertonic model has no sound for these symbols (it skipped or mumbled them when its audio was
// transcribed), so they are said as words. Device voices read the original text.
describe("Supertonic symbols", () => {
  it("says maths symbols as words", () => {
    expect(supertonicText("What is 2 × 4?", "en")).toBe("What is 2 times 4?");
    expect(supertonicText("What is 20 ÷ 5?", "en")).toBe("What is 20 divided by 5?");
    expect(supertonicText("6 + 4 = 10.", "en")).toBe("6 + 4 equals 10.");
    expect(supertonicText("Which is true? 3 < 5", "en")).toBe("Which is true? 3 is less than 5");
    expect(supertonicText("x ≤ 12 and y ≥ 2, so x ≠ y", "en")).toBe("x is less than or equal to 12 and y is greater than or equal to 2, so x does not equal y");
    expect(supertonicText("What is √16? Using 3.14 for π", "en")).toBe("What is the square root of 16? Using 3.14 for pi");
    expect(supertonicText("What is 50% of 20? What is |−3|?", "en")).toBe("What is 50 percent of 20? What is the absolute value of −3?");
    expect(supertonicText("(2³)³ = 2^?", "en")).toBe("(2³)³ equals 2 to the power of?");
    expect(supertonicText("Point A was moved to A′.", "en")).toBe("Point A was moved to A prime.");
  });

  it("says temperatures, units and fractions", () => {
    expect(supertonicText("A thermometer reads 95 °F. Angle B = 52°.", "en")).toBe("A thermometer reads 95 degrees Fahrenheit. Angle B equals 52 degrees.");
    expect(supertonicText("Il fait 20 °C.", "fr")).toBe("Il fait 20 degrés Celsius.");
    expect(supertonicText("Two resistors, 6 Ω each", "en")).toBe("Two resistors, 6 ohms each");
    expect(supertonicText("Shaded: 3/4 1/2 5/6 7/15", "en")).toBe("Shaded: 3 fourths 1 half 5 sixths 7 over 15");
    expect(supertonicText("½ × base × height, or 2¾", "en")).toBe("1 half times base times height, or 2 and 3 fourths");
    expect(supertonicText("Quelle fraction ? 3/4 ou 1/3", "fr")).toBe("Quelle fraction? 3 quarts ou 1 tiers");
    expect(supertonicText("Combien font 3 × 4 ?", "fr")).toBe("Combien font 3 fois 4?");
  });

  it("reads arrows and dots as pauses, and leaves plain words alone", () => {
    expect(supertonicText("Seeds → mouse → owl", "en")).toBe("Seeds, mouse, owl");
    expect(supertonicText("Which shows 3? ●●● or ●●●●", "en")).toBe("Which shows 3? or");
    const plain = "Hi! I'm Ollie the Otter. Let's count: one, two, three. It costs $4.50.";
    expect(supertonicText(plain, "en")).toBe(plain);
  });
});

describe("Supertonic files", () => {
  it("has an English and a French voice, and a model, pinned by sha256", () => {
    for (const lang of ["en", "fr"] as const) {
      const v = manifest.voices[lang];
      expect(Object.keys(v.files)).toEqual([`voice_styles/${v.id}.json`]);
      expect(v.lang).toBe(lang);
      for (const hash of Object.values(v.files)) expect(hash).toMatch(/^[0-9a-f]{64}$/);
    }
    expect(Object.keys(manifest.model).sort()).toEqual(["onnx/duration_predictor.onnx", "onnx/text_encoder.onnx", "onnx/tts.json", "onnx/unicode_indexer.json", "onnx/vector_estimator.onnx", "onnx/vocoder.onnx"]);
    for (const hash of Object.values(manifest.model)) expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(manifest.source).toBe(`https://github.com/mjparinas/gradelings/releases/download/supertonic-voices-${manifest.version}/`);
  });

  it("copies engine files that exist in node_modules", () => {
    for (const from of Object.values(manifest.engine)) expect(fs.existsSync(path.join("node_modules", from)), from).toBe(true);
  });

  it("downloads the engine plus only the chosen language's voice", () => {
    const list: SupertonicFileList = { version: "1", engine: { "a.wasm": 10 }, voices: { en: { "en.onnx": 50 }, fr: { "fr.onnx": 40 } } };
    expect(filesFor(list, "fr")).toEqual([
      [`${SUPERTONIC_BASE}a.wasm`, 10],
      [`${SUPERTONIC_BASE}fr.onnx`, 40],
    ]);
  });
});

// ---- Download, check and remove, with a fake Cache API ----

const LIST: SupertonicFileList = { version: manifest.version, engine: { "engine.wasm": 6 }, voices: { en: { "en.onnx": 4 }, fr: { "fr.onnx": 3 } } };

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
  if (url === "/supertonic-worker.js") return new Response("// worker");
  const bytes = { ...LIST.engine, ...LIST.voices.en, ...LIST.voices.fr }[name];
  return bytes ? new Response(new Uint8Array(bytes)) : new Response("", { status: 404 });
}

describe("Supertonic worker", () => {
  const source = fs.readFileSync(path.join("public", "supertonic-worker.js"), "utf8");

  it("uses the files and the model the download fetches", () => {
    for (const name of ["duration_predictor", "text_encoder", "vector_estimator", "vocoder", "tts.json", "unicode_indexer.json"]) expect(source).toContain(name);
    expect(source).toContain('const CACHE = "grademap-supertonic"');
  });
});

describe("Supertonic download on this device", () => {
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
    const supertonic = await import("./supertonic");
    expect(await supertonic.supertonicWanted("en")).toBe(false);
    expect(supertonic.getSupertonicState()).toMatchObject({ enabled: true, voices: { en: { state: "missing" } } });
    expect(await supertonic.supertonicDownloadBytes("en")).toBe(10);

    await supertonic.downloadSupertonic("en");
    const s = supertonic.getSupertonicState();
    expect(s.voices.en).toMatchObject({ state: "ready", loaded: 10, total: 10 });
    expect(s.voices.fr.state).toBe("missing");
    expect(await supertonic.supertonicWanted("en")).toBe(true);
    supertonic.setSupertonicEnabled(false);
    expect(await supertonic.supertonicWanted("en")).toBe(false);
    supertonic.setSupertonicEnabled(true);
    expect(await supertonic.supertonicWanted("en")).toBe(true);
    expect(await supertonic.supertonicWanted("fr")).toBe(false);
    // French only needs its own voice now that the engine is here.
    expect(await supertonic.supertonicDownloadBytes("fr")).toBe(3);
  });

  it("remembers the download and the choice after a reload, and clears old versions", async () => {
    let supertonic = await import("./supertonic");
    await supertonic.downloadSupertonic("en");
    supertonic.setSupertonicEnabled(true);
    const store = caches.stores.get(supertonic.SUPERTONIC_CACHE)!;
    store.set("/supertonic/0/old.onnx", new Response("old"));

    vi.resetModules();
    supertonic = await import("./supertonic");
    expect(await supertonic.supertonicWanted("en")).toBe(true);
    expect(store.has("/supertonic/0/old.onnx")).toBe(false);
    expect(store.has("/supertonic-worker.js")).toBe(true);
  });

  it("isn't ready if a file is missing, and says so when the download fails offline", async () => {
    let supertonic = await import("./supertonic");
    await supertonic.downloadSupertonic("en");
    caches.stores.get(supertonic.SUPERTONIC_CACHE)!.delete(`${supertonic.SUPERTONIC_BASE}en.onnx`);
    vi.resetModules();
    supertonic = await import("./supertonic");
    expect((await supertonic.supertonicWanted("en"), supertonic.getSupertonicState().voices.en.state)).toBe("missing");

    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new TypeError("offline"))));
    vi.stubGlobal("navigator", { onLine: false });
    await supertonic.downloadSupertonic("en");
    expect(supertonic.getSupertonicState().voices.en).toMatchObject({ state: "missing", error: expect.stringMatching(/offline/) });
  });

  it("knows without waiting when Supertonic won't read, so the device voice starts inside the tap", async () => {
    let supertonic = await import("./supertonic");
    await supertonic.supertonicWanted("en");
    expect(supertonic.supertonicMightSpeak("en")).toBe(false);
    await supertonic.downloadSupertonic("en");
    vi.resetModules();
    supertonic = await import("./supertonic");
    // Switched on but not checked yet: it might, so read-aloud waits for the check.
    expect(supertonic.supertonicMightSpeak("en")).toBe(true);
    await supertonic.supertonicWanted("en");
    expect(supertonic.supertonicMightSpeak("en")).toBe(true);
    expect(supertonic.supertonicMightSpeak("fr")).toBe(false);
    supertonic.setSupertonicEnabled(false);
    expect(supertonic.supertonicMightSpeak("en")).toBe(false);
    supertonic.setSupertonicEnabled(true);
    // After Supertonic fails, the device voice reads for the rest of the visit.
    supertonic.markSupertonicFailed("en");
    expect(supertonic.supertonicMightSpeak("en")).toBe(false);
    expect(await supertonic.supertonicWanted("en")).toBe(false);
  });

  it("removing French keeps English, and removing English turns the voice off", async () => {
    const supertonic = await import("./supertonic");
    await supertonic.downloadSupertonic("en");
    await supertonic.downloadSupertonic("fr");
    supertonic.setSupertonicEnabled(true);
    await supertonic.removeSupertonic("fr");
    expect(await supertonic.supertonicWanted("en")).toBe(true);
    expect(supertonic.getSupertonicState().voices.fr.state).toBe("missing");
    await supertonic.removeSupertonic("en");
    expect(supertonic.getSupertonicState().enabled).toBe(false);
    expect(caches.stores.has(supertonic.SUPERTONIC_CACHE)).toBe(false);
  });
});

describe("Supertonic as the default voice", () => {
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
    const supertonic = await import("./supertonic");
    expect(await supertonic.autoDownloadSupertonic("en")).toBe(true);
    expect(await supertonic.supertonicWanted("en")).toBe(true);
    // French waits until French is read aloud.
    expect(supertonic.getSupertonicState().voices.fr.state).toBe("missing");
    expect(await supertonic.autoDownloadSupertonic("en")).toBe(false);
    expect(await supertonic.autoDownloadSupertonic("fr")).toBe(true);
    expect(await supertonic.supertonicWanted("fr")).toBe(true);
  });

  it("doesn't download on mobile data, Data Saver, offline, in test browsers, or with little space", async () => {
    const supertonic = await import("./supertonic");
    for (const connection of [{ type: "cellular" }, { saveData: true }, { effectiveType: "2g" }]) {
      nav.connection = connection;
      expect(await supertonic.autoDownloadSupertonic("en"), JSON.stringify(connection)).toBe(false);
    }
    nav.connection = { type: "wifi", effectiveType: "4g" };
    nav.onLine = false;
    expect(await supertonic.autoDownloadSupertonic("en")).toBe(false);
    nav.onLine = true;
    nav.webdriver = true;
    expect(await supertonic.autoDownloadSupertonic("en")).toBe(false);
    nav.webdriver = false;
    nav.storage = { estimate: async () => ({ quota: 300e6, usage: 200e6 }) };
    expect(await supertonic.autoDownloadSupertonic("en")).toBe(false);
    expect(supertonic.getSupertonicState().voices.en.state).toBe("missing");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("is on even where a device voice was picked before, and stays off once a parent switches it off", async () => {
    storage.set("grademap.voice", "Samantha");
    let supertonic = await import("./supertonic");
    expect(await supertonic.autoDownloadSupertonic("en")).toBe(true);
    expect(supertonic.getSupertonicState().enabled).toBe(true);

    storage.clear();
    storage.set("grademap.supertonic", "off");
    vi.resetModules();
    supertonic = await import("./supertonic");
    expect(await supertonic.autoDownloadSupertonic("fr")).toBe(false);
    expect(supertonic.getSupertonicState().voices.fr.state).toBe("missing");
  });

  it.each([
    ["grademap.piper", "grademap-piper", "/piper/2/files.json"],
    ["grademap.kokoro", "grademap-kokoro", "/kokoro/1/files.json"],
  ])("keeps a parent's choice to switch the old voice (%s) off, and removes its files", async (pref, cache, file) => {
    localStorage.setItem(pref, "off");
    const old = await caches.api.open(cache);
    await old.put(file, new Response("{}"));
    const supertonic = await import("./supertonic");
    expect(await supertonic.supertonicWanted("en")).toBe(false);
    expect(supertonic.getSupertonicState().enabled).toBe(false);
    expect(caches.stores.has(cache)).toBe(false);
  });

  it("lets a newer choice win over an older voice's", async () => {
    localStorage.setItem("grademap.kokoro", "off");
    localStorage.setItem("grademap.supertonic", "on");
    const supertonic = await import("./supertonic");
    await supertonic.supertonicWanted("en");
    expect(supertonic.getSupertonicState().enabled).toBe(true);
  });

  it("preloads English, then French, one after the other", async () => {
    const supertonic = await import("./supertonic");
    await supertonic.preloadSupertonicVoices(["en", "fr"]);
    expect(supertonic.getSupertonicState().voices).toMatchObject({ en: { state: "ready" }, fr: { state: "ready" } });
  });

  it("doesn't download when the admin flag is off", async () => {
    storage.set("grademap.flags", JSON.stringify({ flags: { "supertonic-auto-download": false }, variants: {} }));
    const supertonic = await import("./supertonic");
    expect(await supertonic.autoDownloadSupertonic("en")).toBe(false);
  });

  it("a background download that fails shows no error and waits before trying again", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 503 })));
    const supertonic = await import("./supertonic");
    expect(await supertonic.autoDownloadSupertonic("en")).toBe(true);
    expect(supertonic.getSupertonicState().voices.en).toMatchObject({ state: "missing" });
    expect(supertonic.getSupertonicState().voices.en.error).toBeUndefined();
    expect(await supertonic.autoDownloadSupertonic("en")).toBe(false);
  });

  it("removing the English voice switches it off, so it doesn't come back by itself", async () => {
    let supertonic = await import("./supertonic");
    await supertonic.autoDownloadSupertonic("en");
    await supertonic.removeSupertonic("en");
    vi.resetModules();
    supertonic = await import("./supertonic");
    expect(await supertonic.autoDownloadSupertonic("en")).toBe(false);
    expect(supertonic.getSupertonicState().enabled).toBe(false);
  });
});

describe("Supertonic download problems", () => {
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
    const supertonic = await import("./supertonic");
    fetchMock.mockImplementation(async () => new Response("", { status: 404 }));
    expect(await supertonic.supertonicDownloadBytes("en")).toBeUndefined();
    await supertonic.downloadSupertonic("en");
    expect(supertonic.getSupertonicState().voices.en).toMatchObject({ state: "missing", error: "The voice isn't available right now." });
  });

  it("says the voice isn't available when the list has no voice for the language", async () => {
    const supertonic = await import("./supertonic");
    const list = { ...LIST, voices: { en: LIST.voices.en } };
    fetchMock.mockImplementation(async (url: string) => (url.endsWith("files.json") ? new Response(JSON.stringify(list)) : serve(url)));
    expect(await supertonic.supertonicDownloadBytes("fr")).toBeUndefined();
    await supertonic.downloadSupertonic("fr");
    expect(supertonic.getSupertonicState().voices.fr).toMatchObject({ state: "missing", error: "The voice isn't available right now." });
  });

  it("stops cleanly when a file fails half-way, and only fetches what is still missing next time", async () => {
    const supertonic = await import("./supertonic");
    fetchMock.mockImplementation(async (url: string) => (url.endsWith("en.onnx") ? new Response("", { status: 500 }) : serve(url)));
    await supertonic.downloadSupertonic("en");
    expect(supertonic.getSupertonicState().voices.en).toMatchObject({ state: "missing", error: "The download stopped. Check the connection and try again." });
    // The engine arrived before the failure and is kept.
    expect(caches.stores.get(supertonic.SUPERTONIC_CACHE)!.has(`${supertonic.SUPERTONIC_BASE}engine.wasm`)).toBe(true);

    fetchMock.mockClear();
    fetchMock.mockImplementation(async (url: string) => serve(url));
    await supertonic.downloadSupertonic("en");
    const fetched = fetchMock.mock.calls.map(([u]) => u as string);
    expect(fetched).not.toContain(`${supertonic.SUPERTONIC_BASE}engine.wasm`);
    expect(fetched).toContain(`${supertonic.SUPERTONIC_BASE}en.onnx`);
    expect(supertonic.getSupertonicState().voices.en).toMatchObject({ state: "ready", total: 4, loaded: 4, error: undefined });
  });

  it("gives a general message for unexpected failures while online", async () => {
    const supertonic = await import("./supertonic");
    fetchMock.mockImplementation(async (url: string) => (url.endsWith("files.json") ? new Response("not json") : serve(url)));
    await supertonic.downloadSupertonic("en");
    expect(supertonic.getSupertonicState().voices.en.error).toBe("The download didn't finish. Try again.");
    fetchMock.mockImplementation(async () => Promise.reject(new TypeError("network")));
    expect(await supertonic.supertonicDownloadBytes("en")).toBeUndefined();
  });

  it("asks the browser to keep the files when space runs low", async () => {
    const persist = vi.fn(async () => true);
    vi.stubGlobal("navigator", { onLine: true, storage: { persist } });
    const supertonic = await import("./supertonic");
    await supertonic.downloadSupertonic("en");
    expect(persist).toHaveBeenCalledOnce();
  });

  it("removing a voice with no saved list clears the whole cache", async () => {
    const supertonic = await import("./supertonic");
    const store = await caches.api.open(supertonic.SUPERTONIC_CACHE);
    await store.put(`${supertonic.SUPERTONIC_BASE}engine.wasm`, new Response("x"));
    await supertonic.removeSupertonic("fr");
    expect(caches.stores.has(supertonic.SUPERTONIC_CACHE)).toBe(false);
  });

  it("is off and missing where the browser can't run it", async () => {
    vi.stubGlobal("Worker", undefined);
    const supertonic = await import("./supertonic");
    expect(supertonic.supertonicSupported()).toBe(false);
    expect(await supertonic.supertonicWanted("en")).toBe(false);
    expect(supertonic.getSupertonicState().voices).toMatchObject({ en: { state: "missing" }, fr: { state: "missing" } });
    expect(supertonic.supertonicMightSpeak("en")).toBe(false);
    expect(supertonic.supertonicCanSpeak()).toBe(false);
  });

  it("falls back to the default (on) when storage is blocked, without throwing", async () => {
    const blocked = () => {
      throw new Error("SecurityError");
    };
    vi.stubGlobal("localStorage", { getItem: blocked, setItem: blocked, removeItem: blocked });
    const supertonic = await import("./supertonic");
    await supertonic.downloadSupertonic("en");
    expect(() => supertonic.setSupertonicEnabled(false)).not.toThrow();
    expect(supertonic.supertonicMightSpeak("en")).toBe(true);
    vi.resetModules();
    const again = await import("./supertonic");
    expect(await again.supertonicWanted("en")).toBe(true);
  });

  it("treats a broken cache as missing voices", async () => {
    vi.stubGlobal("caches", { open: async () => Promise.reject(new Error("QuotaExceeded")) });
    const supertonic = await import("./supertonic");
    expect(await supertonic.supertonicWanted("en")).toBe(false);
    expect(supertonic.getSupertonicState().voices.fr.state).toBe("missing");
  });

  it("tells subscribers about changes until they unsubscribe", async () => {
    const supertonic = await import("./supertonic");
    const listener = vi.fn();
    const stop = supertonic.subscribeSupertonic(listener);
    supertonic.setSupertonicEnabled(true);
    expect(listener).toHaveBeenCalled();
    stop();
    listener.mockClear();
    supertonic.setSupertonicEnabled(false);
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

describe("speakSupertonic", () => {
  let supertonic: typeof import("./supertonic");
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
    supertonic = await import("./supertonic");
  });
  afterEach(() => vi.unstubAllGlobals());

  it("sends the sentences to the worker and plays each chunk right after the one before", async () => {
    let done = false;
    const p = supertonic.speakSupertonic("Hello there. How are you?", "fr", 0.92).then(() => (done = true));
    expect(audio().resume).toHaveBeenCalledOnce();
    expect(worker().url).toBe("/supertonic-worker.js");
    const speak = lastSpeak();
    expect(speak).toMatchObject({ type: "speak", base: supertonic.SUPERTONIC_BASE, voice: supertonic.SUPERTONIC_VOICES.fr.id, sentences: ["Hello there.", "How are you?"], rate: 0.92 });

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
    const p = supertonic.speakSupertonic("One. Two.", "en");
    const { id } = lastSpeak();
    chunk(id, 100);
    audio().sources[0].onended!();
    chunk(id, 0);
    await expect(p).resolves.toBeUndefined();
  });

  it("says nothing for text with no words, and keeps one worker and audio context", async () => {
    await supertonic.speakSupertonic("... !", "en");
    expect(worker()).toBeUndefined();
    await supertonic.speakSupertonic("", "en");
    const p = supertonic.speakSupertonic("Hi.", "en");
    supertonic.stopSupertonic();
    await p;
    const q = supertonic.speakSupertonic("Hi again.", "en");
    supertonic.stopSupertonic();
    await q;
    expect(FakeWorker.all).toHaveLength(1);
    expect(FakeAudio.all).toHaveLength(1);
  });

  it("rejects when the worker fails before any sound, so the device voice can take over", async () => {
    const p = supertonic.speakSupertonic("Hi.", "en");
    worker().emit({ type: "error", id: lastSpeak().id, message: "model failed" });
    await expect(p).rejects.toThrow("model failed");
  });

  it("rejects when the worker can't load, and starts a fresh worker next time", async () => {
    const p = supertonic.speakSupertonic("Hi.", "en");
    worker().crash();
    await expect(p).rejects.toThrow("The voice couldn't load.");
    const q = supertonic.speakSupertonic("Hi again.", "en");
    expect(FakeWorker.all).toHaveLength(2);
    supertonic.stopSupertonic();
    await q;
  });

  it("gives up and cancels when no sound starts in time, so the device voice can read", async () => {
    vi.useFakeTimers();
    try {
      const p = supertonic.speakSupertonic("Hi.", "en");
      const { id } = lastSpeak();
      const failed = expect(p).rejects.toThrow("The voice took too long to start.");
      await vi.advanceTimersByTimeAsync(supertonic.SUPERTONIC_FIRST_AUDIO_MS);
      await failed;
      expect(worker().posted.at(-1)).toEqual({ type: "cancel", id });
    } finally {
      vi.useRealTimers();
    }
  });

  it("keeps reading past the time limit once sound has started", async () => {
    vi.useFakeTimers();
    try {
      const p = supertonic.speakSupertonic("One. Two.", "en");
      const { id } = lastSpeak();
      chunk(id, 100);
      await vi.advanceTimersByTimeAsync(supertonic.SUPERTONIC_FIRST_AUDIO_MS * 2);
      expect(worker().posted.at(-1)).toMatchObject({ type: "speak" });
      audio().sources[0].onended!();
      chunk(id, 0);
      await expect(p).resolves.toBeUndefined();
    } finally {
      vi.useRealTimers();
    }
  });

  it("ends quietly when the worker fails after it started speaking", async () => {
    const p = supertonic.speakSupertonic("One. Two.", "en");
    const { id } = lastSpeak();
    chunk(id, 100);
    worker().emit({ type: "error", id, message: "late failure" });
    await expect(p).resolves.toBeUndefined();
  });

  it("ignores messages for other requests", async () => {
    let done = false;
    const p = supertonic.speakSupertonic("Hi.", "en").then(() => (done = true));
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
    const p = supertonic.speakSupertonic("One. Two.", "en");
    const { id } = lastSpeak();
    chunk(id, 100);
    const src = audio().sources[0];
    src.stop.mockImplementationOnce(() => {
      throw new Error("InvalidStateError");
    });
    supertonic.stopSupertonic();
    await expect(p).resolves.toBeUndefined();
    expect(worker().posted.at(-1)).toEqual({ type: "cancel", id });
    expect(src.onended).toBeNull();
    // A late chunk for the stopped request plays nothing.
    chunk(id, 100);
    expect(audio().sources).toHaveLength(1);
  });

  it("starting a new sentence stops the one still playing", async () => {
    const first = supertonic.speakSupertonic("First.", "en");
    const firstId = lastSpeak().id;
    const second = supertonic.speakSupertonic("Second.", "en");
    await expect(first).resolves.toBeUndefined();
    expect(worker().posted).toContainEqual({ type: "cancel", id: firstId });
    expect(lastSpeak().id).toBeGreaterThan(firstId);
    supertonic.stopSupertonic();
    await second;
  });
});
