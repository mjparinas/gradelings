// Puts the on-device speech recognition files in public/whisper/{version}/ so the site serves them itself
// (src/lib/whisper-manifest.json). Each file comes from our own GitHub release `whisper-tiny-en-{version}`; if the
// release doesn't have it yet, from the pinned fallback (the model from Hugging Face at a fixed revision, the engine
// from the transformers.js 3.8.1 npm tarball). Every file is checked by sha256, files already in place are kept, and
// a file that can't be had is left out of files.json so the app reports voice practice as unavailable rather than
// failing the build. Runs before `next dev` and `next build` (see package.json).
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "src/lib/whisper-manifest.json"), "utf8"));
const OUT = path.join(ROOT, "public/whisper", manifest.version);
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

fs.mkdirSync(OUT, { recursive: true });
for (const old of fs.readdirSync(path.dirname(OUT))) {
  if (old !== manifest.version) fs.rmSync(path.join(path.dirname(OUT), old), { recursive: true, force: true });
}

async function get(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

let tarball; // the npm package, unpacked once if a fallback engine file is needed
function npmFile(inner) {
  if (!tarball) {
    tarball = fs.mkdtempSync(path.join(os.tmpdir(), "whisper-npm-"));
  }
  const dest = path.join(tarball, inner);
  if (!fs.existsSync(dest)) {
    const archive = path.join(tarball, "pkg.tgz");
    if (!fs.existsSync(archive)) return get(manifest.fallback.engine).then((b) => (fs.writeFileSync(archive, b), npmFile(inner)));
    execFileSync("tar", ["xzf", archive, "-C", tarball, inner]);
  }
  return Promise.resolve(fs.readFileSync(dest));
}

const list = { version: manifest.version, files: {} };
let missing = 0;
for (const file of manifest.files) {
  const dest = path.join(OUT, file.path);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!(fs.existsSync(dest) && sha256(fs.readFileSync(dest)) === file.sha256)) {
    let bytes;
    const tries = [
      () => get(manifest.release + file.name),
      () => (file.from.startsWith("npm:") ? npmFile(file.from.slice(4)) : get(manifest.fallback.model + file.from.slice(6))),
    ];
    for (const [i, t] of tries.entries()) {
      try {
        const got = await t();
        if (sha256(got) !== file.sha256) throw new Error("sha256 mismatch");
        bytes = got;
        if (i === 1) console.log(`fetch-whisper: ${file.name} came from the fallback source`);
        break;
      } catch (e) {
        if (i === 1) console.warn(`fetch-whisper: could not get ${file.name}: ${e instanceof Error ? e.message : e}`);
      }
    }
    if (!bytes) {
      missing++;
      continue;
    }
    fs.writeFileSync(dest, bytes);
  }
  list.files[file.path] = fs.statSync(dest).size;
}
if (tarball) fs.rmSync(tarball, { recursive: true, force: true });

if (missing) console.warn(`fetch-whisper: ${missing} file(s) missing; voice practice stays unavailable until they can be fetched`);
else console.log(`fetch-whisper: ${manifest.files.length} files ready`);
fs.writeFileSync(path.join(OUT, "files.json"), JSON.stringify(missing ? { version: manifest.version, files: {}, incomplete: true } : list));
