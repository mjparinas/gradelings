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

  it("keeps a parent's choice: switched off, or a device voice picked before", async () => {
    storage.set("grademap.voice", "Samantha");
    let piper = await import("./piper");
    expect(await piper.autoDownloadPiper("en")).toBe(false);
    expect(piper.getPiperState().enabled).toBe(false);
    // Switching it on wins over the picked device voice.
    piper.setPiperEnabled(true);
    vi.resetModules();
    piper = await import("./piper");
    expect(await piper.autoDownloadPiper("en")).toBe(true);

    storage.clear();
    storage.set("grademap.piper", "off");
    vi.resetModules();
    piper = await import("./piper");
    expect(await piper.autoDownloadPiper("fr")).toBe(false);
    expect(piper.getPiperState().voices.fr.state).toBe("missing");
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
