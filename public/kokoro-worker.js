// Kokoro read-aloud, off the main thread so taps and animations never stutter (src/lib/kokoro.ts).
// Each sentence is turned into phonemes (espeak-ng, piper_phonemize.wasm), those are looked up in
// Kokoro's vocabulary, and the model (run by onnxruntime-web) makes the audio, which is posted back
// as soon as it's ready.
//
// Files come from the Kokoro cache first, so this works offline whether or not the service
// worker controls this worker. Scripts are loaded from blob URLs of the cached copies.
/* global ort, createPiperPhonemize */
const CACHE = "grademap-kokoro";

// The espeak-ng build answers with ids from piper's standard phoneme table (the same for every
// language), one id per sign, with a pad id between signs and ^ and $ around each clause. This is
// that table by id, so the answer can be turned back into the IPA text Kokoro was trained on.
const PHONEME_SIGNS = Array.from("_^$ !'(),-.:;?abcdefhijklmnopqrstuvwxyz\u00e6\u00e7\u00f0\u00f8\u0127\u014b\u0153\u01c0\u01c1\u01c2\u01c3\u0250\u0251\u0252\u0253\u0254\u0255\u0256\u0257\u0258\u0259\u025a\u025b\u025c\u025e\u025f\u0260\u0261\u0262\u0263\u0264\u0265\u0266\u0267\u0268\u026a\u026b\u026c\u026d\u026e\u026f\u0270\u0271\u0272\u0273\u0274\u0275\u0276\u0278\u0279\u027a\u027b\u027d\u027e\u0280\u0281\u0282\u0283\u0284\u0288\u0289\u028a\u028b\u028c\u028d\u028e\u028f\u0290\u0291\u0292\u0294\u0295\u0298\u0299\u029b\u029c\u029d\u029f\u02a1\u02a2\u02b2\u02c8\u02cc\u02d0\u02d1\u02de\u03b2\u03b8\u03c7\u1d7b\u2c710123456789\u0327\u0303\u032a\u032f\u0329\u02b0\u02e4\u03b5\u2193#\"\u2191\u033a\u033b");

// Kokoro looks up a voice's style at the length of the phrase, and takes up to 510 signs.
const MAX_TOKENS = 510;

let engine;
let model;
const voices = new Map();
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
    importScripts(await scriptUrl(base + "ort.wasm.min.js"), await scriptUrl(base + "piper_phonemize.js"));
    ort.env.wasm.numThreads = 1;
    ort.env.wasm.wasmPaths = { mjs: await scriptUrl(base + "ort-wasm-simd-threaded.mjs") };
    ort.env.wasm.wasmBinary = await (await file(base + "ort-wasm-simd-threaded.wasm")).arrayBuffer();
    const [wasm, data] = await Promise.all([
      file(base + "piper_phonemize.wasm").then((r) => r.arrayBuffer()),
      file(base + "piper_phonemize.data").then((r) => r.arrayBuffer()),
    ]);
    let printed;
    const phonemizer = await createPiperPhonemize({
      print: (line) => (printed = line),
      printErr: () => {},
      wasmBinary: wasm,
      getPreloadedPackage: () => data,
    });
    return (text, espeakVoice) => {
      printed = undefined;
      phonemizer.callMain(["-l", espeakVoice, "--input", JSON.stringify([{ text }]), "--espeak_data", "/espeak-ng-data"]);
      if (!printed) throw new Error("No phonemes");
      const clauses = [];
      let clause = "";
      for (const id of JSON.parse(printed).phoneme_ids) {
        const sign = PHONEME_SIGNS[id];
        if (sign === "^") clause = "";
        else if (sign === "$") {
          clauses.push(clause);
          clause = "";
        } else if (sign !== "_" && sign !== undefined) clause += sign;
      }
      if (clause) clauses.push(clause);
      return clauses.join(" ");
    };
  })();
  engine.catch(() => (engine = undefined));
  return engine;
}

function loadModel(base) {
  if (!model) {
    model = (async () => {
      await loadEngine(base);
      const vocab = (await (await file(base + "tokenizer.json")).json()).model.vocab;
      const bytes = await (await file(base + "model_quantized.onnx")).arrayBuffer();
      const session = await ort.InferenceSession.create(bytes, { executionProviders: ["wasm"] });
      return { vocab, session };
    })();
    model.catch(() => (model = undefined));
  }
  return model;
}

function loadVoice(base, id) {
  if (!voices.has(id)) {
    const loading = file(`${base}${id}.bin`)
      .then((r) => r.arrayBuffer())
      .then((buffer) => new Float32Array(buffer));
    loading.catch(() => voices.delete(id));
    voices.set(id, loading);
  }
  return voices.get(id);
}

// What espeak says in English that Kokoro was trained to hear differently.
function english(ipa) {
  return ipa.replace(/ʲ/g, "j").replace(/r/g, "ɹ").replace(/x/g, "k").replace(/ɬ/g, "l");
}

function prepare(text) {
  return text
    .replace(/[‘’]/g, "'")
    .replace(/«/g, "“")
    .replace(/»/g, "”")
    .replace(/\s+/g, " ")
    .trim();
}

async function speak({ id, base, voice, espeakVoice, sentences, rate }) {
  const phonemize = await loadEngine(base);
  const { vocab, session } = await loadModel(base);
  const styles = await loadVoice(base, voice);
  for (const text of sentences) {
    if (cancelled.has(id)) return;
    let ipa = phonemize(prepare(text), espeakVoice).replace(/-/g, "");
    if (espeakVoice.startsWith("en")) ipa = english(ipa);
    const signs = [];
    for (const sign of ipa) if (vocab[sign] !== undefined) signs.push(vocab[sign]);
    const ids = [0, ...signs.slice(0, MAX_TOKENS), 0];
    const count = ids.length - 2;
    if (count === 0) {
      self.postMessage({ type: "chunk", id, pcm: new Float32Array(0), sampleRate: 24000 });
      continue;
    }
    const at = 256 * Math.min(count, 509);
    const feeds = {
      input_ids: new ort.Tensor("int64", BigInt64Array.from(ids, BigInt), [1, ids.length]),
      style: new ort.Tensor("float32", styles.slice(at, at + 256), [1, 256]),
      speed: new ort.Tensor("float32", Float32Array.from([rate]), [1]),
    };
    const { waveform } = await session.run(feeds);
    if (cancelled.has(id)) return;
    const pcm = new Float32Array(waveform.data);
    self.postMessage({ type: "chunk", id, pcm, sampleRate: 24000 }, [pcm.buffer]);
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
