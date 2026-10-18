// Supertonic read-aloud, off the main thread so taps and animations never stutter (src/lib/supertonic.ts).
// Supertonic reads plain text (no phonemizer): a duration model and a text encoder, then a few
// denoising steps of the vector estimator, then a vocoder, all run by onnxruntime-web. Each sentence's
// audio is posted back as soon as it's ready. The steps follow the model's own reference code
// (Supertone/supertonic, helper.js).
//
// Files come from the Supertonic cache first, so this works offline whether or not the service
// worker controls this worker. Scripts are loaded from blob URLs of the cached copies.
/* global ort */
const CACHE = "grademap-supertonic";

// Denoising steps per sentence. More is a little cleaner and slower; the model's own benchmarks use 2.
const STEPS = 3;
// The model's normal pace is 1.05; our `rate` (1 = normal) scales it.
const NORMAL_SPEED = 1.05;

let engine;
let models;
const styles = new Map();
const cancelled = new Set();
let queue = Promise.resolve();

async function file(url) {
  const hit = await caches.open(CACHE).then((c) => c.match(url));
  const res = hit || (await fetch(url));
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res;
}

async function scriptUrl(url) {
  const text = await (await file(url)).text();
  return URL.createObjectURL(new Blob([text], { type: "text/javascript" }));
}

function loadEngine(base) {
  engine ??= (async () => {
    importScripts(await scriptUrl(base + "ort.wasm.min.js"));
    ort.env.wasm.numThreads = 1;
    ort.env.wasm.wasmPaths = { mjs: await scriptUrl(base + "ort-wasm-simd-threaded.mjs") };
    ort.env.wasm.wasmBinary = await (await file(base + "ort-wasm-simd-threaded.wasm")).arrayBuffer();
  })();
  engine.catch(() => (engine = undefined));
  return engine;
}

// The four models are made one after another and each file's bytes are let go as soon as its session
// exists, so a phone never holds two copies of the big ones at once.
function loadModels(base) {
  if (!models) {
    models = (async () => {
      await loadEngine(base);
      const config = await (await file(base + "tts.json")).json();
      const indexer = await (await file(base + "unicode_indexer.json")).json();
      const session = async (name) => {
        const bytes = new Uint8Array(await (await file(`${base}${name}.onnx`)).arrayBuffer());
        return ort.InferenceSession.create(bytes, { executionProviders: ["wasm"] });
      };
      const duration = await session("duration_predictor");
      const encoder = await session("text_encoder");
      const estimator = await session("vector_estimator");
      const vocoder = await session("vocoder");
      return { config, indexer, duration, encoder, estimator, vocoder };
    })();
    models.catch(() => (models = undefined));
  }
  return models;
}

function loadStyle(base, id) {
  if (!styles.has(id)) {
    const loading = file(`${base}${id}.json`)
      .then((r) => r.json())
      .then((json) => {
        const tensor = (part) => new ort.Tensor("float32", Float32Array.from(json[part].data.flat(Infinity)), json[part].dims);
        return { ttl: tensor("style_ttl"), dp: tensor("style_dp") };
      });
    loading.catch(() => styles.delete(id));
    styles.set(id, loading);
  }
  return styles.get(id);
}

// The text clean-up of the reference code, plus French quotes as plain quotes.
function prepare(text, lang) {
  let t = text.normalize("NFKD");
  t = t.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]+/gu, "");
  const swaps = { "–": "-", "‑": "-", "—": "-", _: " ", "“": '"', "”": '"', "‘": "'", "’": "'", "´": "'", "`": "'", "«": '"', "»": '"', "[": " ", "]": " ", "|": " ", "/": " ", "#": " ", "→": " ", "←": " " };
  for (const [from, to] of Object.entries(swaps)) t = t.replaceAll(from, to);
  t = t.replace(/[♥☆♡©\\]/g, "");
  t = t.replaceAll("@", " at ");
  t = t.replace(/ ([,.!?;:'])/g, "$1");
  t = t.replace(/"{2,}/g, '"').replace(/'{2,}/g, "'");
  t = t.replace(/\s+/g, " ").trim();
  if (!/[.!?;:,'")\]}…。」』】〉》›»]$/.test(t)) t += ".";
  return `<${lang}>${t}</${lang}>`;
}

function noise(count) {
  const out = new Float32Array(count);
  for (let i = 0; i < count; i++) out[i] = Math.sqrt(-2 * Math.log(Math.max(1e-4, Math.random()))) * Math.cos(2 * Math.PI * Math.random());
  return out;
}

async function synthesize(m, style, text, lang, speed) {
  const { config, indexer, duration, encoder, estimator, vocoder } = m;
  const prepared = prepare(text, lang);
  const ids = Array.from(prepared, (c) => {
    const cp = c.codePointAt(0);
    return cp < indexer.length ? indexer[cp] : -1;
  });
  const n = ids.length;
  const textIds = new ort.Tensor("int64", BigInt64Array.from(ids, BigInt), [1, n]);
  const textMask = new ort.Tensor("float32", new Float32Array(n).fill(1), [1, 1, n]);

  const seconds = (await duration.run({ text_ids: textIds, style_dp: style.dp, text_mask: textMask })).duration.data[0] / speed;
  const textEmb = (await encoder.run({ text_ids: textIds, style_ttl: style.ttl, text_mask: textMask })).text_emb;

  const sampleRate = config.ae.sample_rate;
  const chunk = config.ae.base_chunk_size * config.ttl.chunk_compress_factor;
  const length = Math.floor((Math.floor(seconds * sampleRate) + chunk - 1) / chunk);
  const dim = config.ttl.latent_dim * config.ttl.chunk_compress_factor;
  const latentMask = new ort.Tensor("float32", new Float32Array(length).fill(1), [1, 1, length]);
  const total = new ort.Tensor("float32", Float32Array.from([STEPS]), [1]);

  let latent = noise(dim * length);
  for (let step = 0; step < STEPS; step++) {
    const out = await estimator.run({
      noisy_latent: new ort.Tensor("float32", latent, [1, dim, length]),
      text_emb: textEmb,
      style_ttl: style.ttl,
      latent_mask: latentMask,
      text_mask: textMask,
      current_step: new ort.Tensor("float32", Float32Array.from([step]), [1]),
      total_step: total,
    });
    latent = out.denoised_latent.data;
  }
  const { wav_tts } = await vocoder.run({ latent: new ort.Tensor("float32", latent, [1, dim, length]) });
  return { pcm: new Float32Array(wav_tts.data), sampleRate };
}

async function speak({ id, base, voice, lang, sentences, rate }) {
  const m = await loadModels(base);
  const style = await loadStyle(base, voice);
  for (const text of sentences) {
    if (cancelled.has(id)) return;
    const { pcm, sampleRate } = await synthesize(m, style, text, lang, NORMAL_SPEED * rate);
    if (cancelled.has(id)) return;
    self.postMessage({ type: "chunk", id, pcm, sampleRate }, [pcm.buffer]);
  }
}

self.onmessage = (event) => {
  const m = event.data;
  if (m?.type === "cancel") {
    cancelled.add(m.id);
    return;
  }
  if (m?.type !== "speak") return;
  // One request at a time: a new one is usually preceded by a cancel, so the old one stops early.
  queue = queue
    .then(() => speak(m))
    .catch((e) => self.postMessage({ type: "error", id: m.id, message: e instanceof Error ? e.message : String(e) }))
    .finally(() => cancelled.delete(m.id));
};
