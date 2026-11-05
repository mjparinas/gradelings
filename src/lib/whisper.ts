import manifest from "./whisper-manifest.json";

// Voice practice speech recognition (flag `voice-practice`). Whisper tiny.en runs in a web worker
// (public/whisper-worker.js) from files we host ourselves (scripts/fetch-whisper.mjs). The parent's download puts
// them in their own Cache Storage, so the model works offline and a parent can remove it. Audio goes into the worker
// as samples and only text comes back: nothing is uploaded, stored or logged.

export const WHISPER_BASE = `/whisper/${manifest.version}/`;
export const WHISPER_CACHE = "gradelings-whisper";
const FILES_URL = `${WHISPER_BASE}files.json`;
const WORKER_URL = "/whisper-worker.js";
export const WHISPER_CREDIT = manifest.credit;

export type WhisperState = "checking" | "unsupported" | "missing" | "downloading" | "ready";

interface FileList {
  version: string;
  files: Record<string, number>;
  incomplete?: boolean;
}

const listeners = new Set<() => void>();
let state: WhisperState = "checking";
let progress = 0;
let checked = false;

const emit = () => listeners.forEach((l) => l());
const set = (s: WhisperState, p = progress) => {
  state = s;
  progress = p;
  emit();
};

export const subscribeWhisper = (l: () => void) => {
  listeners.add(l);
  return () => void listeners.delete(l);
};
export const getWhisperState = (): { state: WhisperState; progress: number } => ({ state, progress });
// A stable snapshot object for useSyncExternalStore.
let snapshot: { state: WhisperState; progress: number } = { state, progress };
export function whisperSnapshot() {
  if (snapshot.state !== state || snapshot.progress !== progress) snapshot = { state, progress };
  return snapshot;
}

/** Can this browser run it at all: workers, WebAssembly, Cache Storage, a microphone and audio decoding. */
export function whisperSupported(): boolean {
  return (
    typeof Worker !== "undefined" &&
    typeof WebAssembly !== "undefined" &&
    typeof caches !== "undefined" &&
    typeof navigator !== "undefined" &&
    Boolean(navigator.mediaDevices?.getUserMedia) &&
    typeof AudioContext !== "undefined"
  );
}

async function installedList(): Promise<FileList | null> {
  try {
    const cache = await caches.open(WHISPER_CACHE);
    const hit = await cache.match(FILES_URL);
    if (!hit) return null;
    const list = (await hit.json()) as FileList;
    if (list.incomplete || list.version !== manifest.version) return null;
    for (const name of Object.keys(list.files)) if (!(await cache.match(WHISPER_BASE + name))) return null;
    return list;
  } catch {
    return null;
  }
}

/** Looks at what this device already has (once; later calls return the current state). */
export async function checkWhisper(): Promise<WhisperState> {
  if (checked || state === "downloading") return state;
  checked = true;
  if (!whisperSupported()) set("unsupported");
  else set((await installedList()) ? "ready" : "missing");
  return state;
}

/** The download in bytes, from the server's list (undefined when the files aren't on the server). */
export async function whisperDownloadBytes(): Promise<number | undefined> {
  try {
    const res = await fetch(FILES_URL, { cache: "no-store" });
    if (!res.ok) return undefined;
    const list = (await res.json()) as FileList;
    if (list.incomplete) return undefined;
    return Object.values(list.files).reduce((a, b) => a + b, 0);
  } catch {
    return undefined;
  }
}

let downloading: Promise<void> | undefined;

/** Downloads the model into its own cache. Throws if the files aren't available or the device is out of space. */
export function downloadWhisper(): Promise<void> {
  downloading ??= (async () => {
    set("downloading", 0);
    try {
      const res = await fetch(FILES_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("The listening model isn't available right now.");
      const list = (await res.json()) as FileList;
      if (list.incomplete) throw new Error("The listening model isn't available right now.");
      const total = Object.values(list.files).reduce((a, b) => a + b, 0);
      const est = await navigator.storage?.estimate?.();
      if (est?.quota && est.usage !== undefined && est.quota - est.usage < total * 1.5) throw new Error("There isn't enough space on this device.");
      const cache = await caches.open(WHISPER_CACHE);
      let done = 0;
      for (const name of Object.keys(list.files)) {
        const url = WHISPER_BASE + name;
        if (!(await cache.match(url))) {
          const r = await fetch(url);
          if (!r.ok || !r.body) throw new Error("A download failed. Try again on a better connection.");
          const reader = r.body.getReader();
          const chunks: Uint8Array<ArrayBuffer>[] = [];
          for (;;) {
            const { value, done: end } = await reader.read();
            if (end) break;
            chunks.push(value as Uint8Array<ArrayBuffer>);
            done += value.length;
            set("downloading", Math.min(0.99, done / total));
          }
          await cache.put(url, new Response(new Blob(chunks), { headers: { "content-type": r.headers.get("content-type") ?? "application/octet-stream" } }));
        } else {
          done += list.files[name];
        }
      }
      const worker = await fetch(WORKER_URL);
      if (worker.ok) await cache.put(WORKER_URL, worker);
      // The list goes in last: its presence means everything else is.
      await cache.put(FILES_URL, new Response(JSON.stringify(list), { headers: { "content-type": "application/json" } }));
      set("ready", 1);
    } catch (e) {
      set("missing", 0);
      throw e;
    } finally {
      downloading = undefined;
    }
  })();
  return downloading;
}

export async function removeWhisper(): Promise<void> {
  stopWhisper();
  await caches.delete(WHISPER_CACHE);
  set("missing", 0);
}

// ---------- Running it ----------

let worker: Worker | undefined;
let idle: ReturnType<typeof setTimeout> | undefined;
let nextId = 1;
const waiting = new Map<number, { ok: (m: { text?: string }) => void; fail: (e: Error) => void }>();

/** Stops the worker and frees its memory (the model needs a couple of hundred MB while it runs). */
export function stopWhisper() {
  clearTimeout(idle);
  worker?.terminate();
  worker = undefined;
  for (const w of waiting.values()) w.fail(new Error("stopped"));
  waiting.clear();
}

function send(message: Record<string, unknown>, transfer: Transferable[] = [], timeoutMs = 60_000): Promise<{ text?: string }> {
  clearTimeout(idle);
  if (!worker) {
    worker = new Worker(WORKER_URL);
    worker.onmessage = (e: MessageEvent<{ id: number; type: string; text?: string; message?: string }>) => {
      const w = waiting.get(e.data.id);
      if (!w) return;
      waiting.delete(e.data.id);
      if (e.data.type === "error") w.fail(new Error(e.data.message));
      else w.ok(e.data);
    };
    worker.onerror = () => {
      stopWhisper();
    };
  }
  const id = nextId++;
  return new Promise((ok, fail) => {
    const timer = setTimeout(() => {
      waiting.delete(id);
      fail(new Error("timeout"));
      stopWhisper();
    }, timeoutMs);
    waiting.set(id, {
      ok: (m) => (clearTimeout(timer), ok(m)),
      fail: (e) => (clearTimeout(timer), fail(e)),
    });
    worker!.postMessage({ id, base: WHISPER_BASE, ...message }, transfer);
  }).finally(() => {
    // Give the memory back a minute after the last use.
    clearTimeout(idle);
    idle = setTimeout(stopWhisper, 60_000);
  }) as Promise<{ text?: string }>;
}

/** Loads the model into memory ahead of the first question. */
export async function warmWhisper(): Promise<void> {
  await send({ type: "load" }, [], 120_000);
}

/** The words in 16 kHz mono samples. The samples are handed over to the worker and can't be used afterwards. */
export async function transcribe(samples: Float32Array, maxTokens = 24): Promise<string> {
  const out = await send({ type: "transcribe", audio: samples, maxTokens }, [samples.buffer], 90_000);
  return out.text ?? "";
}
