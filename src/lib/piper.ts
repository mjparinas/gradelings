"use client";

import manifest from "./piper-manifest.json";
import { isOn } from "./remoteFlags";
import type { SpeechLanguage } from "./speech";

// Piper: a natural-sounding voice that runs on the device, so it works offline and the same on
// every tablet. On by default: the voices download in the background when the app opens, for
// children with read-aloud on (src/components/VoicePreload.tsx; not on mobile data or Data Saver),
// while the device voice reads, and Piper reads from then on. A parent
// can switch it off or remove it per device under Account. The files are large (see
// public/piper/{version}/files.json), are served by this site and are kept in their own cache,
// which the service worker leaves alone when the app updates.

export const PIPER_BASE = `/piper/${manifest.version}/`;
export const PIPER_CACHE = "grademap-piper";
const LIST_URL = `${PIPER_BASE}files.json`;
const WORKER_URL = "/piper-worker.js";
const PREF_KEY = "grademap.piper";
// The voices tried after Piper (Kokoro, then Supertonic) kept their files under these names.
const OLD_CACHES = ["grademap-kokoro", "grademap-supertonic"];
// Piper came back as everyone's voice in October 2026, after Kokoro and Supertonic didn't sound as
// good. Every device's earlier voice choices (an older voice switched on or off, a device voice
// picked for English or French) are cleared once, so Piper reads; choices made after that stick.
const RESET_KEY = "grademap.voiceReset";
const RESET_VERSION = "piper-amy-1";
const RESET_KEYS = ["grademap.piper", "grademap.supertonic", "grademap.kokoro", "grademap.voice", "grademap.voice.fr"];

/** Clears the voice choices saved before Piper came back, once per device (see RESET_KEYS). */
export function resetOldVoiceChoices() {
  try {
    if (localStorage.getItem(RESET_KEY) === RESET_VERSION) return;
    for (const key of RESET_KEYS) localStorage.removeItem(key);
    localStorage.setItem(RESET_KEY, RESET_VERSION);
  } catch {
    // Private mode: nothing was saved to clear.
  }
}

export type PiperVoiceState = "checking" | "missing" | "downloading" | "ready";

export interface PiperState {
  /** The parent wants read-aloud to use Piper on this device. */
  enabled: boolean;
  voices: Record<SpeechLanguage, { state: PiperVoiceState; loaded: number; total: number; error?: string }>;
}

/** What gets downloaded: the speech engine plus one language's voice (bytes per file). */
export interface PiperFileList {
  version: string;
  engine: Record<string, number>;
  // An optional voice that could not be downloaded at build time is left out (scripts/fetch-piper.mjs).
  voices: Partial<Record<SpeechLanguage, Record<string, number>>>;
}

export const PIPER_VOICES = manifest.voices as Record<SpeechLanguage, { id: string; name: string; credit: string }>;

/** Every language with a Piper voice: English, French and Spanish. */
export const PIPER_LANGUAGES = Object.keys(manifest.voices) as SpeechLanguage[];

/** The files one language needs, as URLs, with their sizes. */
export function filesFor(list: PiperFileList, language: SpeechLanguage): [url: string, bytes: number][] {
  return [...Object.entries(list.engine), ...Object.entries(list.voices[language] ?? {})].map(([name, bytes]) => [PIPER_BASE + name, bytes]);
}

const MAX_CHUNK = 300;

// Piper's phonemizer (eSpeak NG) reads many maths and science symbols oddly or not at all
// ("3/4" as "three slash four"), where device voices say them. So they are put into words first.
type Words = Record<SpeechLanguage, string>;
const SYMBOLS: [RegExp, Words][] = [
  [/≠/g, { en: " does not equal ", fr: " n'égale pas " , es: " no es igual a " }],
  [/≤/g, { en: " is less than or equal to ", fr: " est plus petit ou égal à " , es: " es menor o igual que " }],
  [/≥/g, { en: " is greater than or equal to ", fr: " est plus grand ou égal à " , es: " es mayor o igual que " }],
  [/≈/g, { en: " is about ", fr: " environ " , es: " es aproximadamente " }],
  [/≅/g, { en: " is congruent to ", fr: " est isométrique à " , es: " es congruente con " }],
  [/=/g, { en: " equals ", fr: " égale " , es: " es igual a " }],
  [/</g, { en: " is less than ", fr: " est plus petit que " , es: " es menor que " }],
  [/>/g, { en: " is greater than ", fr: " est plus grand que " , es: " es mayor que " }],
  [/[×✕]/g, { en: " times ", fr: " fois " , es: " por " }],
  [/÷/g, { en: " divided by ", fr: " divisé par " , es: " dividido entre " }],
  [/√/g, { en: " the square root of ", fr: " la racine carrée de " , es: " la raíz cuadrada de " }],
  [/∛/g, { en: " the cube root of ", fr: " la racine cubique de " , es: " la raíz cúbica de " }],
  [/π/g, { en: " pi ", fr: " pi " , es: " pi " }],
  [/[µμ]/g, { en: " mu ", fr: " mu " , es: " mu " }],
  [/Ω/g, { en: " ohms ", fr: " ohms " , es: " ohmios " }],
  [/°\s*C\b/g, { en: " degrees Celsius", fr: " degrés Celsius" , es: " grados Celsius" }],
  [/°\s*F\b/g, { en: " degrees Fahrenheit", fr: " degrés Fahrenheit" , es: " grados Fahrenheit" }],
  [/°/g, { en: " degrees", fr: " degrés" , es: " grados" }],
  [/%/g, { en: " percent", fr: " pour cent" , es: " por ciento" }],
  [/\^/g, { en: " to the power of ", fr: " exposant " , es: " elevado a " }],
  [/′/g, { en: " prime ", fr: " prime " , es: " prima " }],
  [/△/g, { en: " triangle ", fr: " triangle " , es: " triángulo " }],
  [/[□■]/g, { en: " blank ", fr: " mot manquant " , es: " palabra que falta " }],
];
const FRACTIONS: Record<string, [number, number]> = { "½": [1, 2], "⅓": [1, 3], "⅔": [2, 3], "¼": [1, 4], "¾": [3, 4], "⅕": [1, 5], "⅛": [1, 8] };
const DENOMINATORS: Record<SpeechLanguage, [one: string, many: string][]> = {
  en: [["", ""], ["", ""], ["half", "halves"], ["third", "thirds"], ["fourth", "fourths"], ["fifth", "fifths"], ["sixth", "sixths"], ["seventh", "sevenths"], ["eighth", "eighths"], ["ninth", "ninths"], ["tenth", "tenths"], ["eleventh", "elevenths"], ["twelfth", "twelfths"]],
  es: [["", ""], ["", ""], ["medio", "medios"], ["tercio", "tercios"], ["cuarto", "cuartos"], ["quinto", "quintos"], ["sexto", "sextos"], ["séptimo", "séptimos"], ["octavo", "octavos"], ["noveno", "novenos"], ["décimo", "décimos"], ["onceavo", "onceavos"], ["doceavo", "doceavos"]],
  fr: [["", ""], ["", ""], ["demi", "demis"], ["tiers", "tiers"], ["quart", "quarts"], ["cinquième", "cinquièmes"], ["sixième", "sixièmes"], ["septième", "septièmes"], ["huitième", "huitièmes"], ["neuvième", "neuvièmes"], ["dixième", "dixièmes"], ["onzième", "onzièmes"], ["douzième", "douzièmes"]],
};

const OVER: Words = { en: "over", fr: "sur", es: "sobre" };
const AND: Words = { en: "and", fr: "et", es: "y" };
const ABSOLUTE: Words = { en: " the absolute value of $1 ", fr: " la valeur absolue de $1 ", es: " el valor absoluto de $1 " };

/** A fraction in words: "3 fourths", "1 half", and "7 over 15" past twelfths. */
function fraction(top: number, bottom: number, language: SpeechLanguage): string {
  const name = DENOMINATORS[language][bottom];
  if (!name?.[0]) return ` ${top} ${OVER[language]} ${bottom} `;
  return ` ${top} ${top === 1 ? name[0] : name[1]} `;
}

/** Puts the symbols Piper can't say into words (only for Piper: device voices say them already). */
export function piperText(text: string, language: SpeechLanguage): string {
  // Absolute value bars, "|−3|".
  let t = text.replace(/\|([^|]{1,12})\|/g, ABSOLUTE[language]);
  t = t.replace(/(\d+)\s*\/\s*(\d+)/g, (_, a: string, b: string) => fraction(Number(a), Number(b), language));
  t = t.replace(/(\d*)([½⅓⅔¼¾⅕⅛])/g, (_, whole: string, f: string) => {
    const [a, b] = FRACTIONS[f];
    return `${whole ? ` ${whole} ${AND[language]}` : ""}${fraction(a, b, language)}`;
  });
  for (const [re, words] of SYMBOLS) t = t.replace(re, words[language]);
  // Counting dots aren't read; arrows and bullets between items are a short pause.
  t = t.replace(/[●○◦]+/g, " ").replace(/\s*[→←⟶➜•·]+\s*/g, ", ");
  return t.replace(/[ \t]+/g, " ").replace(/ ([,.!?;:])/g, "$1").replace(/([.!?;:,]),+/g, "$1").replace(/^[,\s]+|[,\s]+$/g, "").trim();
}

/**
 * Splits text into sentences so the first one can play while the rest are still being made.
 * A full stop ends a sentence only before a space or the end, so 3.14 and $4.50 stay whole.
 * Very long sentences are split between words.
 */
export function splitSentences(text: string): string[] {
  const out: string[] = [];
  for (const sentence of text.match(/[^\n]*?(?:[.!?…]+(?=\s|$)|$)/gm) ?? []) {
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

const blank = () => ({ state: "checking" as PiperVoiceState, loaded: 0, total: 0 });
let state: PiperState = { enabled: false, voices: Object.fromEntries(PIPER_LANGUAGES.map((l) => [l, blank()])) as PiperState["voices"] };
const listeners = new Set<() => void>();

function update(next: Partial<PiperState>, language?: SpeechLanguage, voice?: Partial<PiperState["voices"]["en"]>) {
  state = {
    ...state,
    ...next,
    voices: language && voice ? { ...state.voices, [language]: { ...state.voices[language], ...voice } } : state.voices,
  };
  for (const l of listeners) l();
}

export function piperSupported(): boolean {
  return typeof window !== "undefined" && typeof Worker !== "undefined" && typeof WebAssembly !== "undefined" && "caches" in window && typeof AudioContext !== "undefined";
}

/** Whether read-aloud should use Piper on this device: on unless a parent switched it off. */
function readEnabled(): boolean {
  try {
    resetOldVoiceChoices();
    return localStorage.getItem(PREF_KEY) !== "off";
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
    if (!piperSupported()) {
      update({ enabled: false });
      for (const language of PIPER_LANGUAGES) update({}, language, { state: "missing" });
      return;
    }
    // The Kokoro and Supertonic files are no use any more.
    for (const old of OLD_CACHES) void caches.delete(old).catch(() => false);
    const cache = await caches.open(PIPER_CACHE);
    // Files from an older engine or voice version are never used again.
    for (const req of await cache.keys()) {
      const { pathname } = new URL(req.url);
      if (pathname !== WORKER_URL && !pathname.startsWith(PIPER_BASE)) await cache.delete(req);
    }
    const list = (await (await cache.match(LIST_URL))?.json().catch(() => undefined)) as PiperFileList | undefined;
    for (const language of PIPER_LANGUAGES) {
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
    for (const language of PIPER_LANGUAGES) update({}, language, { state: "missing" });
  });
  return checked;
}

/** For useSyncExternalStore. */
export function subscribePiper(listener: () => void): () => void {
  void check();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getPiperState(): PiperState {
  void check();
  return state;
}

export function setPiperEnabled(on: boolean) {
  try {
    resetOldVoiceChoices();
    localStorage.setItem(PREF_KEY, on ? "on" : "off");
  } catch {
    // Private mode: the choice just won't stick.
  }
  update({ enabled: on });
}

// Languages Piper failed to read since the page loaded: read-aloud goes straight to the device
// voice for them, so a device that can't run Piper doesn't wait on it for every question.
const failed = new Set<SpeechLanguage>();

/** Read-aloud calls this when Piper couldn't play, so the device voice reads from now on. */
export function markPiperFailed(language: SpeechLanguage) {
  failed.add(language);
}

/**
 * False when Piper certainly won't read this language (unsupported, switched off, failed, or its
 * voice is missing), answered without waiting, so the device voice can start inside the tap: iOS
 * Safari ignores speechSynthesis.speak() called after an await.
 */
export function piperMightSpeak(language: SpeechLanguage): boolean {
  if (!piperSupported() || failed.has(language) || !readEnabled()) return false;
  const voice = state.voices[language].state;
  return voice === "checking" || voice === "ready";
}

/** True when read-aloud in this language should use Piper (waits for the first check). */
export async function piperWanted(language: SpeechLanguage): Promise<boolean> {
  await check();
  return state.enabled && !failed.has(language) && state.voices[language].state === "ready";
}

/** True when Piper is on and the English voice is here (for "can this device read aloud?"). */
export function piperCanSpeak(): boolean {
  return state.enabled && state.voices.en.state === "ready";
}

/** How much downloading a language's voice would take, in bytes (undefined offline or if it isn't served). */
export async function piperDownloadBytes(language: SpeechLanguage): Promise<number | undefined> {
  try {
    const res = await fetch(LIST_URL, { cache: "no-cache" });
    if (!res.ok) return undefined;
    const list = (await res.json()) as PiperFileList;
    const engineHere = PIPER_LANGUAGES.some((l) => l !== language && state.voices[l].state === "ready");
    const voice = Object.values(list.voices[language] ?? {}).reduce((n, b) => n + b, 0);
    if (!voice) return undefined;
    return voice + (engineHere ? 0 : Object.values(list.engine).reduce((n, b) => n + b, 0));
  } catch {
    return undefined;
  }
}

/** Downloads the engine and one language's voice into the Piper cache, reporting progress. */
export function downloadPiper(language: SpeechLanguage, { quiet = false } = {}): Promise<void> {
  // One download at a time: the languages share the engine files.
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
    const list = (await listRes.clone().json()) as PiperFileList;
    const files = filesFor(list, language);
    if (files.length <= Object.keys(list.engine).length) throw new Error("The voice isn't available right now.");
    const cache = await caches.open(PIPER_CACHE);
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
 * Starts downloading a language's voice in the background when Piper is on but the voice isn't
 * here yet (when the app opens and a child has read-aloud on, or when a question is read aloud). Never on mobile data or Data Saver, never when the device is short
 * of space, and not in automated test browsers (each would fetch the whole voice). Read-aloud
 * carries on with the device voice meanwhile. Resolves with whether a download ran.
 */
export async function autoDownloadPiper(language: SpeechLanguage): Promise<boolean> {
  if (!piperSupported() || navigator.webdriver || navigator.onLine === false || onMeteredConnection()) return false;
  if (Date.now() - (autoTried[language] ?? -Infinity) < AUTO_RETRY_MS) return false;
  if (!isOn("piper-auto-download")) return false;
  await check();
  if (!state.enabled || state.voices[language].state !== "missing") return false;
  if (PIPER_LANGUAGES.some((l) => state.voices[l].state === "downloading")) return false;
  autoTried[language] = Date.now();
  try {
    const { quota, usage } = (await navigator.storage?.estimate?.()) ?? {};
    // Leave plenty of room for lessons and progress (the voice is about 100 MB with the engine).
    if (quota !== undefined && quota - (usage ?? 0) < 250e6) return false;
  } catch {
    // Can't tell: try anyway; a failed download is cleaned up next time.
  }
  await downloadPiper(language, { quiet: true });
  return true;
}

/** Downloads each language's voice in turn, in the background (see autoDownloadPiper). */
export async function preloadPiperVoices(languages: readonly SpeechLanguage[]): Promise<void> {
  for (const language of languages) await autoDownloadPiper(language).catch(() => false);
}

/** Removes one language's voice from this device (and the engine once no voice is left). */
export async function removePiper(language: SpeechLanguage): Promise<void> {
  const cache = await caches.open(PIPER_CACHE);
  const list = (await (await cache.match(LIST_URL))?.json().catch(() => undefined)) as PiperFileList | undefined;
  if (!list || !PIPER_LANGUAGES.some((l) => l !== language && state.voices[l].state === "ready")) await caches.delete(PIPER_CACHE);
  else for (const name of Object.keys(list.voices[language] ?? {})) await cache.delete(PIPER_BASE + name);
  if (language === "en") setPiperEnabled(false);
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

// If no sound has started by now, Piper is treated as failed and the device voice reads instead.
// Generous, because the first sentence also loads the voice (several seconds on an old tablet).
export const PIPER_FIRST_AUDIO_MS = 15_000;

/** Stops whatever Piper is saying. */
export function stopPiper() {
  current?.stop();
  current = undefined;
}

/**
 * Says `text` with the Piper voice for `language`. Resolves when it has finished (or been
 * stopped); rejects if it fails before saying anything, so the caller can use a device voice.
 */
export function speakPiper(text: string, language: SpeechLanguage, rate = 1): Promise<void> {
  stopPiper();
  // Created and resumed now, while a tap may still count as the user asking for sound.
  audio ??= new AudioContext();
  if (audio.state === "suspended") void audio.resume();
  const ac = audio;
  const sentences = splitSentences(piperText(text, language));
  if (sentences.length === 0) return Promise.resolve();
  const id = ++nextId;
  const w = getWorker();
  const voice = PIPER_VOICES[language].id;

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
    }, PIPER_FIRST_AUDIO_MS);
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
    w.postMessage({ type: "speak", id, base: PIPER_BASE, voice, sentences, rate });
  });
}
