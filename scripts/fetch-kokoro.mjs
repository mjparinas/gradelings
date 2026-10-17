// Puts the Kokoro read-aloud files in public/kokoro/{version}/ so the site serves them itself:
// the speech engine (onnxruntime-web and the espeak-ng phonemizer) is copied from node_modules, and
// the model, its tokenizer and the voices are downloaded from our own GitHub release
// (`kokoro-voices-{version}`, copied unchanged from onnx-community/Kokoro-82M-v1.0-ONNX) and checked by sha256. Files already in place are kept, so it only
// downloads once. Runs before `next dev` and `next build` (see package.json).
//
//   node scripts/fetch-kokoro.mjs             fails if a file can't be downloaded
//   node scripts/fetch-kokoro.mjs --optional  warns instead (for `npm run dev` offline)
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "src/lib/kokoro-manifest.json"), "utf8"));
const OUT = path.join(ROOT, "public/kokoro", manifest.version);
const optional = process.argv.includes("--optional");

const sha256 = (file) => createHash("sha256").update(fs.readFileSync(file)).digest("hex");

fs.mkdirSync(OUT, { recursive: true });
for (const old of fs.readdirSync(path.dirname(OUT))) {
  if (old !== manifest.version) fs.rmSync(path.join(path.dirname(OUT), old), { recursive: true, force: true });
}

const list = { version: manifest.version, engine: {}, voices: {} };
let failed = false;

/** Downloads `source` path (checked against `hash`) to OUT under its own file name, unless it is already there. Returns the file's size. */
async function download(source, hash) {
  const name = path.basename(source);
  const dest = path.join(OUT, name);
  if (!(fs.existsSync(dest) && sha256(dest) === hash)) {
    try {
      const res = await fetch(manifest.source + name);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const bytes = Buffer.from(await res.arrayBuffer());
      const got = createHash("sha256").update(bytes).digest("hex");
      if (got !== hash) throw new Error(`sha256 ${got}, expected ${hash}`);
      fs.writeFileSync(dest, bytes);
      console.log(`fetch-kokoro: downloaded ${name} (${(bytes.length / 1e6).toFixed(1)} MB)`);
    } catch (e) {
      console.error(`fetch-kokoro: could not download ${name}: ${e instanceof Error ? e.message : e}`);
      failed = true;
      return undefined;
    }
  }
  return [name, fs.statSync(dest).size];
}

for (const [name, from] of Object.entries(manifest.engine)) {
  const dest = path.join(OUT, name);
  fs.copyFileSync(path.join(ROOT, "node_modules", from), dest);
  list.engine[name] = fs.statSync(dest).size;
}

// The model and tokenizer are shared by every language, so they count as engine files.
for (const [source, hash] of Object.entries(manifest.model)) {
  const got = await download(source, hash);
  if (got) list.engine[got[0]] = got[1];
}

for (const [lang, voice] of Object.entries(manifest.voices)) {
  list.voices[lang] = {};
  for (const [source, hash] of Object.entries(voice.files)) {
    const got = await download(source, hash);
    if (got) list.voices[lang][got[0]] = got[1];
  }
}

if (failed) {
  // Without a complete list the app reports the voice as unavailable instead of half-downloading it.
  fs.rmSync(path.join(OUT, "files.json"), { force: true });
  if (optional) {
    console.warn("fetch-kokoro: the natural voice won't be available until this succeeds");
    process.exit(0);
  }
  process.exit(1);
}
fs.writeFileSync(path.join(OUT, "files.json"), JSON.stringify(list));
console.log(`fetch-kokoro: public/kokoro/${manifest.version} is ready`);
