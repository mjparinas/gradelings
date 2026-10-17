"use client";

import manifest from "./kokoro-manifest.json";
import { isOn } from "./remoteFlags";
import type { SpeechLanguage } from "./speech";

// Kokoro: a natural-sounding voice that runs on the device, so it works offline and the same on
// every tablet. On by default: the voices download in the background when the app opens, for
// children with read-aloud on (src/components/VoicePreload.tsx; not on mobile data or Data Saver),
// while the device voice reads, and Kokoro reads from then on. A parent
// can switch it off or remove it per device under Account. The files are large (see
// public/kokoro/{version}/files.json), are served by this site and are kept in their own cache,
// which the service worker leaves alone when the app updates.

export const KOKORO_BASE = `/kokoro/${manifest.version}/`;
export const KOKORO_CACHE = "grademap-kokoro";
const LIST_URL = `${KOKORO_BASE}files.json`;
const WORKER_URL = "/kokoro-worker.js";
const PREF_KEY = "grademap.kokoro";
// The voice this replaced (Piper) kept its on/off choice and its files under these names.
const OLD_PREF_KEY = "grademap.piper";
const OLD_CACHE = "grademap-piper";

export type KokoroVoiceState = "checking" | "missing" | "downloading" | "ready";

export interface KokoroState {
  /** The parent wants read-aloud to use Kokoro on this device. */
  enabled: boolean;
  voices: Record<SpeechLanguage, { state: KokoroVoiceState; loaded: number; total: number; error?: string }>;
}

/** What gets downloaded: the speech engine plus one language's voice (bytes per file). */
export interface KokoroFileList {
  version: string;
  engine: Record<string, number>;
  voices: Record<SpeechLanguage, Record<string, number>>;
}

export const KOKORO_VOICES = manifest.voices as Record<SpeechLanguage, { id: string; espeak: string; name: string; credit: string }>;

/** The files one language needs, as URLs, with their sizes. */
export function filesFor(list: KokoroFileList, language: SpeechLanguage): [url: string, bytes: number][] {
  return [...Object.entries(list.engine), ...Object.entries(list.voices[language] ?? {})].map(([name, bytes]) => [KOKORO_BASE + name, bytes]);
}

const MAX_CHUNK = 300;

/**
 * Splits text into sentences so the first one can play while the rest are still being made.
 * Very long sentences are split between words.
 */
export function splitSentences(text: string): string[] {
  const out: string[] = [];
  for (const sentence of text.match(/[^.!?…\n]+(?:[.!?…]+|\n|$)/g) ?? []) {
    let piece = "";
    for (const word of sentence.trim().split(/\s+/)) {
      if (piece && piece.length + word.length + 1 > MAX_CHUNK) {
        out.push(piece);
        piece = word;
      } else piece = piece ? `${piece} ${word}` : word;
    }
    if (piece) out.push(piece);
  }
  return out.filter((s) => /[\p{L}\p{N}]/u.test(s));
}

// ---- State (per device) ----

const blank = () => ({ state: "checking" as KokoroVoiceState, loaded: 0, total: 0 });
let state: KokoroState = { enabled: false, voices: { en: blank(), fr: blank() } };
const listeners = new Set<() => void>();

function update(next: Partial<KokoroState>, language?: SpeechLanguage, voice?: Partial<KokoroState["voices"]["en"]>) {
  state = {
    ...state,
    ...next,
    voices: language && voice ? { ...state.voices, [language]: { ...state.voices[language], ...voice } } : state.voices,
  };
  for (const l of listeners) l();
}

export function kokoroSupported(): boolean {
  return typeof window !== "undefined" && typeof Worker !== "undefined" && typeof WebAssembly !== "undefined" && "caches" in window && typeof AudioContext !== "undefined";
}

/** Whether read-aloud should use Kokoro on this device: on unless a parent switched it off. */
function readEnabled(): boolean {
  try {
    // A parent who switched the old voice off keeps it off.
    return (localStorage.getItem(PREF_KEY) ?? localStorage.getItem(OLD_PREF_KEY)) !== "off";
  } catch {
    // Private mode: nothing saved, so the default.
    return true;
  }
}

let checked: Promise<void> | undefined;

/** Reads the saved choice and which voices are already on this device. */
function check(): Promise<void> {
  checked ??= (async () => {
    const enabled = readEnabled();
    if (!kokoroSupported()) {
      update({ enabled: false }, "en", { state: "missing" });
      update({}, "fr", { state: "missing" });
      return;
    }
    // The old voice's files (about 100 MB) are no use any more.
    void caches.delete(OLD_CACHE).catch(() => false);
    const cache = await caches.open(KOKORO_CACHE);
    // Files from an older engine or voice version are never used again.
    for (const req of await cache.keys()) {
      const { pathname } = new URL(req.url);
      if (pathname !== WORKER_URL && !pathname.startsWith(KOKORO_BASE)) await cache.delete(req);
    }
    const list = (await (await cache.match(LIST_URL))?.json().catch(() => undefined)) as KokoroFileList | undefined;
    for (const language of ["en", "fr"] as const) {
      let ready = false;
      if (list) {
        const files = filesFor(list, language);
        const urls = [WORKER_URL, ...files.map(([url]) => url)];
        ready = files.length > Object.keys(list.engine).length && (await Promise.all(urls.map((url) => cache.match(url)))).every(Boolean);
      }
      update({}, language, { state: ready ? "ready" : "missing" });
    }
    update({ enabled });
  })().catch(() => {
    update({}, "en", { state: "missing" });
    update({}, "fr", { state: "missing" });
  });
  return checked;
}

/** For useSyncExternalStore. */
export function subscribeKokoro(listener: () => void): () => void {
  void check();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getKokoroState(): KokoroState {
  void check();
  return state;
}

export function setKokoroEnabled(on: boolean) {
  try {
    localStorage.setItem(PREF_KEY, on ? "on" : "off");
  } catch {
    // Private mode: the choice just won't stick.
  }
  update({ enabled: on });
}

// Languages Kokoro failed to read since the page loaded: read-aloud goes straight to the device
// voice for them, so a device that can't run Kokoro doesn't wait on it for every question.
const failed = new Set<SpeechLanguage>();

/** Read-aloud calls this when Kokoro couldn't play, so the device voice reads from now on. */
export function markKokoroFailed(language: SpeechLanguage) {
  failed.add(language);
}

/**
 * False when Kokoro certainly won't read this language (unsupported, switched off, failed, or its
 * voice is missing), answered without waiting, so the device voice can start inside the tap: iOS
 * Safari ignores speechSynthesis.speak() called after an await.
 */
export function kokoroMightSpeak(language: SpeechLanguage): boolean {
  if (!kokoroSupported() || failed.has(language) || !readEnabled()) return false;
  const voice = state.voices[language].state;
  return voice === "checking" || voice === "ready";
}

/** True when read-aloud in this language should use Kokoro (waits for the first check). */
export async function kokoroWanted(language: SpeechLanguage): Promise<boolean> {
  await check();
  return state.enabled && !failed.has(language) && state.voices[language].state === "ready";
}

/** True when Kokoro is on and the English voice is here (for "can this device read aloud?"). */
export function kokoroCanSpeak(): boolean {
  return state.enabled && state.voices.en.state === "ready";
}

/** How much downloading a language's voice would take, in bytes (undefined offline or if it isn't served). */
export async function kokoroDownloadBytes(language: SpeechLanguage): Promise<number | undefined> {
  try {
    const res = await fetch(LIST_URL, { cache: "no-cache" });
    if (!res.ok) return undefined;
    const list = (await res.json()) as KokoroFileList;
    const other: SpeechLanguage = language === "en" ? "fr" : "en";
    const engineHere = state.voices[other].state === "ready";
    const voice = Object.values(list.voices[language] ?? {}).reduce((n, b) => n + b, 0);
    if (!voice) return undefined;
    return voice + (engineHere ? 0 : Object.values(list.engine).reduce((n, b) => n + b, 0));
  } catch {
    return undefined;
  }
}

/** Downloads the engine and one language's voice into the Kokoro cache, reporting progress. */
export function downloadKokoro(language: SpeechLanguage, { quiet = false } = {}): Promise<void> {
  // One download at a time: the two languages share the engine files.
  const run = downloading.then(() => (state.voices[language].state === "ready" ? undefined : fetchVoice(language, quiet)));
  downloading = run.catch(() => undefined);
  return run;
}

let downloading: Promise<void> = Promise.resolve();

async function fetchVoice(language: SpeechLanguage, quiet: boolean): Promise<void> {
  await check();
  if (state.voices[language].state === "ready") return;
  update({}, language, { state: "downloading", loaded: 0, total: 0, error: undefined });
  try {
    const listRes = await fetch(LIST_URL, { cache: "no-cache" });
    if (!listRes.ok) throw new Error("The voice isn't available right now.");
    const list = (await listRes.clone().json()) as KokoroFileList;
    const files = filesFor(list, language);
    if (files.length <= Object.keys(list.engine).length) throw new Error("The voice isn't available right now.");
    const cache = await caches.open(KOKORO_CACHE);
    const missing: typeof files = [];
    for (const f of files) if (!(await cache.match(f[0]))) missing.push(f);
    const total = missing.reduce((n, [, bytes]) => n + bytes, 0);
    let loaded = 0;
    update({}, language, { total });
    for (const [url] of missing) {
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok || !res.body) throw new Error("The download stopped. Check the connection and try again.");
      const reader = res.body.getReader();
      const parts: Uint8Array<ArrayBuffer>[] = [];
      for (let r = await reader.read(); !r.done; r = await reader.read()) {
        parts.push(r.value);
        loaded += r.value.length;
        update({}, language, { loaded });
      }
      await cache.put(url, new Response(new Blob(parts), { headers: { "Content-Type": res.headers.get("Content-Type") ?? "application/octet-stream" } }));
    }
    await cache.put(WORKER_URL, await fetch(WORKER_URL, { cache: "no-cache" }));
    await cache.put(LIST_URL, listRes);
    // Ask the browser not to clear these files when space runs low.
    await navigator.storage?.persist?.().catch(() => false);
    failed.delete(language);
    update({}, language, { state: "ready", loaded: total });
  } catch (e) {
    const offline = navigator.onLine === false;
    // A background download that fails is tried again later; it never shows an error.
    if (quiet) return update({}, language, { state: "missing", loaded: 0, total: 0 });
    update({}, language, {
      state: "missing",
      error: offline ? "You're offline. Connect to the internet to download the voice." : e instanceof Error && e.message.startsWith("The ") ? e.message : "The download didn't finish. Try again.",
    });
  }
}

// Background downloads wait this long after an attempt before trying again.
const AUTO_RETRY_MS = 10 * 60_000;
const autoTried: Partial<Record<SpeechLanguage, number>> = {};

interface NetworkInfo {
  saveData?: boolean;
  type?: string;
  effectiveType?: string;
}

/** True on mobile data, Data Saver or a very slow connection, where the browser tells us (Chrome and Android do; Safari doesn't). */
export function onMeteredConnection(): boolean {
  const c = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  if (!c) return false;
  return !!c.saveData || c.type === "cellular" || c.effectiveType === "2g" || c.effectiveType === "slow-2g";
}

/**
 * Starts downloading a language's voice in the background when Kokoro is on but the voice isn't
 * here yet (when the app opens and a child has read-aloud on, or when a question is read aloud). Never on mobile data or Data Saver, never when the device is short
 * of space, and not in automated test browsers (each would fetch the whole voice). Read-aloud
 * carries on with the device voice meanwhile. Resolves with whether a download ran.
 */
export async function autoDownloadKokoro(language: SpeechLanguage): Promise<boolean> {
  if (!kokoroSupported() || navigator.webdriver || navigator.onLine === false || onMeteredConnection()) return false;
  if (Date.now() - (autoTried[language] ?? -Infinity) < AUTO_RETRY_MS) return false;
  if (!isOn("kokoro-auto-download")) return false;
  await check();
  if (!state.enabled || state.voices[language].state !== "missing") return false;
  if (state.voices.en.state === "downloading" || state.voices.fr.state === "downloading") return false;
  autoTried[language] = Date.now();
  try {
    const { quota, usage } = (await navigator.storage?.estimate?.()) ?? {};
    // Leave plenty of room for lessons and progress (the voice is about 115 MB with the engine and model).
    if (quota !== undefined && quota - (usage ?? 0) < 250e6) return false;
  } catch {
    // Can't tell: try anyway; a failed download is cleaned up next time.
  }
  await downloadKokoro(language, { quiet: true });
  return true;
}

/** Downloads each language's voice in turn, in the background (see autoDownloadKokoro). */
export async function preloadKokoroVoices(languages: readonly SpeechLanguage[]): Promise<void> {
  for (const language of languages) await autoDownloadKokoro(language).catch(() => false);
}

/** Removes one language's voice from this device (and the engine once no voice is left). */
export async function removeKokoro(language: SpeechLanguage): Promise<void> {
  const cache = await caches.open(KOKORO_CACHE);
  const list = (await (await cache.match(LIST_URL))?.json().catch(() => undefined)) as KokoroFileList | undefined;
  const other: SpeechLanguage = language === "en" ? "fr" : "en";
  if (!list || state.voices[other].state !== "ready") await caches.delete(KOKORO_CACHE);
  else for (const name of Object.keys(list.voices[language] ?? {})) await cache.delete(KOKORO_BASE + name);
  if (language === "en") setKokoroEnabled(false);
  update({}, language, { state: "missing", loaded: 0, total: 0, error: undefined });
}

// ---- Speaking ----

let worker: Worker | undefined;
let audio: AudioContext | undefined;
let nextId = 0;
let current: { id: number; sources: AudioBufferSourceNode[]; stop: () => void } | undefined;

function getWorker(): Worker {
  if (!worker) {
    const w = new Worker(WORKER_URL);
    // A worker that can't load is replaced next time instead of being reused.
    w.addEventListener("error", () => {
      if (worker === w) worker = undefined;
    });
    worker = w;
  }
  return worker;
}

// If no sound has started by now, Kokoro is treated as failed and the device voice reads instead.
// Generous, because the first sentence also loads the 90 MB model (many seconds on an old tablet).
export const KOKORO_FIRST_AUDIO_MS = 30_000;

/** Stops whatever Kokoro is saying. */
export function stopKokoro() {
  current?.stop();
  current = undefined;
}

/**
 * Says `text` with the Kokoro voice for `language`. Resolves when it has finished (or been
 * stopped); rejects if it fails before saying anything, so the caller can use a device voice.
 */
export function speakKokoro(text: string, language: SpeechLanguage, rate = 1): Promise<void> {
  stopKokoro();
  // Created and resumed now, while a tap may still count as the user asking for sound.
  audio ??= new AudioContext();
  if (audio.state === "suspended") void audio.resume();
  const ac = audio;
  const sentences = splitSentences(text);
  if (sentences.length === 0) return Promise.resolve();
  const id = ++nextId;
  const w = getWorker();
  const { id: voice, espeak: espeakVoice } = KOKORO_VOICES[language];

  return new Promise<void>((resolve, reject) => {
    let started = false;
    let finished = false;
    let at = 0;
    let playing = 0;
    let made = 0;
    const sources: AudioBufferSourceNode[] = [];
    const end = (error?: Error) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      w.removeEventListener("message", onMessage);
      w.removeEventListener("error", onError);
      if (current?.id === id) current = undefined;
      if (error && !started) reject(error);
      else resolve();
    };
    const stop = () => {
      w.postMessage({ type: "cancel", id });
      for (const s of sources) {
        s.onended = null;
        try {
          s.stop();
        } catch {
          // Not started yet.
        }
      }
      end();
    };
    current = { id, sources, stop };
    const onError = () => end(new Error("The voice couldn't load."));
    const timer = setTimeout(() => {
      if (started) return;
      w.postMessage({ type: "cancel", id });
      end(new Error("The voice took too long to start."));
    }, KOKORO_FIRST_AUDIO_MS);
    const onMessage = (e: MessageEvent) => {
      const m = e.data;
      if (m?.id !== id || finished) return;
      if (m.type === "error") return end(new Error(m.message));
      if (m.type !== "chunk") return;
      made++;
      const pcm = m.pcm as Float32Array<ArrayBuffer>;
      if (pcm.length > 0) {
        const buffer = ac.createBuffer(1, pcm.length, m.sampleRate);
        buffer.copyToChannel(pcm, 0);
        const src = ac.createBufferSource();
        src.buffer = buffer;
        src.connect(ac.destination);
        at = Math.max(at, ac.currentTime + 0.02);
        src.start(at);
        at += buffer.duration;
        started = true;
        playing++;
        sources.push(src);
        src.onended = () => {
          playing--;
          if (playing === 0 && made === sentences.length) end();
        };
      } else if (playing === 0 && made === sentences.length) end();
    };
    w.addEventListener("message", onMessage);
    w.addEventListener("error", onError);
    w.postMessage({ type: "speak", id, base: KOKORO_BASE, voice, espeakVoice, sentences, rate });
  });
}
