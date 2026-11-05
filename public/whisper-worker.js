// Voice practice speech recognition, off the main thread (src/lib/whisper.ts). Whisper tiny.en runs on the device
// with transformers.js and ONNX Runtime Web; the audio comes in as samples, is never sent anywhere or kept, and only
// the recognised text goes back. Every file is read from the voice practice cache first, so this works offline
// whether or not the service worker controls this worker. Scripts are loaded from blob URLs of the cached copies.
const CACHE = "gradelings-whisper";

let loading;
let asr;

async function file(url) {
  const hit = await caches.open(CACHE).then((c) => c.match(url));
  const res = hit || (await fetch(url));
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res;
}

async function blobUrl(url, type) {
  return URL.createObjectURL(new Blob([await (await file(url)).arrayBuffer()], { type }));
}

function load(base) {
  loading ??= (async () => {
    const tf = await import(await blobUrl(base + "transformers.min.js", "text/javascript"));
    const { env, pipeline } = tf;
    env.allowRemoteModels = false;
    env.allowLocalModels = true;
    env.localModelPath = base;
    env.useBrowserCache = false;
    env.useCustomCache = true;
    // Model files come from our own cache; nothing is ever written back by the engine.
    env.customCache = {
      match: async (key) => (await caches.open(CACHE)).match(key),
      put: async () => {},
    };
    const wasm = env.backends.onnx.wasm;
    wasm.numThreads = 1;
    wasm.proxy = false;
    // The engine's script comes from a blob URL (the site's policy allows that for scripts), and its WebAssembly from our own
    // address, which the service worker and the voice cache both answer offline.
    wasm.wasmPaths = {
      mjs: await blobUrl(base + "ort-wasm-simd-threaded.jsep.mjs", "text/javascript"),
      wasm: new URL(base + "ort-wasm-simd-threaded.jsep.wasm", self.location.href).href,
    };
    asr = await pipeline("automatic-speech-recognition", "model", {
      device: "wasm",
      dtype: { encoder_model: "q8", decoder_model_merged: "q8" },
    });
  })();
  loading.catch(() => (loading = undefined));
  return loading;
}

self.onmessage = async (event) => {
  const { id, type, base, audio, maxTokens } = event.data;
  try {
    if (type === "load") {
      await load(base);
      self.postMessage({ id, type: "ready" });
    } else if (type === "transcribe") {
      await load(base);
      const out = await asr(audio, { max_new_tokens: maxTokens || 24, no_repeat_ngram_size: 4 });
      self.postMessage({ id, type: "text", text: String(Array.isArray(out) ? out[0]?.text : out?.text ?? "") });
    }
  } catch (e) {
    self.postMessage({ id, type: "error", message: e instanceof Error ? e.message : String(e) });
  }
};
