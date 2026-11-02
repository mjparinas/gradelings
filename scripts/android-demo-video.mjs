// Google Play promo video (docs/PLAY_LISTING.md): a landscape 1920 × 1080 clip of the real app
// played by a demo child ("Maya", no real child), with a title card, a caption for each scene,
// a closing card and original music made here (a few synthesised notes, so there is nothing to
// license). Play takes a YouTube link only, so the owner uploads the file to YouTube.
//
//   npm run build && npm start            # or `npm run dev`
//   node scripts/android-demo-video.mjs http://localhost:3000 [out-dir]
//
// Needs ffmpeg on the PATH. Set CHROMIUM_PATH if Playwright's pinned browser isn't installed.
// Writes gradelings-play-demo.mp4 (and a poster.png) into the out-dir, store-assets/android/video by default.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright";
import { enterPin, newChild, step, vis } from "./helpers.mjs";

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const root = new URL("..", import.meta.url).pathname;
const OUT = path.resolve(process.argv[3] || `${root}store-assets/android/video`);
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "gradelings-demo-"));
fs.mkdirSync(OUT, { recursive: true });

const W = 1920;
const H = 1080;
// The app is shown 1689 × 950 on the brand blue, with a band under it for the caption.
const BAND = 130;
const VW = 1689;
const VH = H - BAND;
const AGENT = "Mozilla/5.0 (Linux; Android 14; Pixel Tablet) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
const font = (f) => fs.readFileSync(`${root}assets/fonts/${f}`).toString("base64");
const run = (cmd, args) => execFileSync(cmd, args, { stdio: ["ignore", "ignore", "inherit"] });

// ---- 1. Record the app ---------------------------------------------------------------------
// A small ring shows each tap, since a recording has no finger.
const TAP_RING = `
addEventListener("pointerdown", (e) => {
  const d = document.createElement("div");
  d.style.cssText = "position:fixed;z-index:2147483647;pointer-events:none;width:56px;height:56px;border-radius:50%;border:5px solid #fff;background:rgba(255,194,51,.55);box-shadow:0 0 0 3px rgba(37,48,71,.35);transform:translate(-50%,-50%) scale(.4);opacity:1;transition:transform .45s ease-out,opacity .45s ease-out;left:" + e.clientX + "px;top:" + e.clientY + "px";
  document.documentElement.appendChild(d);
  requestAnimationFrame(() => requestAnimationFrame(() => { d.style.transform = "translate(-50%,-50%) scale(1.5)"; d.style.opacity = "0"; }));
  setTimeout(() => d.remove(), 600);
}, true);
// \`next dev\` draws a small "N" badge; the video must not carry it.
const hide = document.createElement("style");
hide.textContent = "nextjs-portal{display:none!important}";
document.addEventListener("DOMContentLoaded", () => document.head.appendChild(hide));
`;

const launchOpts = () => ({ executablePath: process.env.CHROMIUM_PATH || undefined });
const ctxOpts = (video) => ({
  viewport: { width: 1280, height: 720 },
  userAgent: AGENT,
  hasTouch: true,
  ...(video ? { recordVideo: { dir: TMP, size: { width: 1280, height: 720 } } } : {}),
});

/** Plays on a profile with no camera running, so the recorded clips have progress to show. */
async function prepare(profileDir) {
  const context = await chromium.launchPersistentContext(profileDir, { ...launchOpts(), ...ctxOpts(false) });
  const page = context.pages()[0] || (await context.newPage());
  await page.goto(`${BASE}/play/?app=android`, { waitUntil: "load", timeout: 120000 });
  await page.getByRole("button", { name: /Let's go/ }).click({ force: true });
  await newChild(page, "Maya", "Grade 3");
  const adventure = page.getByRole("button", { name: /Adventure/ });
  await adventure.waitFor();
  await adventure.click({ force: true });
  await page.getByRole("button", { name: "Stop", exact: true }).waitFor();
  for (let i = 0; i < 110; i++) await step(page);
  await page.goto(`${BASE}/parents/`, { waitUntil: "load", timeout: 120000 }).catch(() => {});
  await page.goto(`${BASE}/play/#/stickers`).catch(() => {});
  await page.waitForTimeout(1500);
  await context.close();
}

/** Clip A: a new child starts and plays Adventure, from a clean device. */
async function recordStart() {
  const browser = await chromium.launch(launchOpts());
  const context = await browser.newContext(ctxOpts(true));
  await context.addInitScript(TAP_RING);
  // The video starts when the page is made, which can take a few seconds, so count from before that.
  const t0 = Date.now();
  const page = await context.newPage();
  const marks = {};
  const mark = (name) => {
    marks[name] = (Date.now() - t0) / 1000;
  };
  const beat = (ms = 1300) => page.waitForTimeout(ms);

  // Warm up the routes first (a dev server compiles each on first visit), off camera.
  await page.goto(`${BASE}/play/?app=android`, { waitUntil: "load", timeout: 120000 }).catch(() => {});
  await context.clearCookies();
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); }).catch(() => {});
  await page.goto(`${BASE}/play/?app=android`);
  await page.getByRole("button", { name: /Let's go/ }).waitFor();
  mark("start");
  await beat(1500);

  mark("hello");
  await page.getByRole("button", { name: /Let's go/ }).click({ force: true });
  await beat(900);
  await page.getByLabel("Name").pressSequentially("Maya", { delay: 220 });
  await beat(700);
  await page.getByRole("button", { name: "Grade 3", exact: true }).click({ force: true });
  await beat(900);
  await page.getByRole("button", { name: "Start!" }).click({ force: true });
  const adventure = page.getByRole("button", { name: /Adventure/ });
  await adventure.waitFor();
  await beat(1600);

  await adventure.click({ force: true });
  await page.getByRole("button", { name: "Stop", exact: true }).waitFor();
  await beat(500);
  mark("adventure");
  await beat(1500);
  const hint = page.getByRole("button", { name: /Need a hint/ });
  if (await vis(hint)) {
    await hint.click({ force: true });
    await beat(1800);
  }
  for (let i = 0; i < 7; i++) {
    await step(page);
    await beat(1300);
  }
  mark("end");
  const video = page.video();
  await context.close();
  const file = await video.path();
  await browser.close();
  return { file, marks, offset: marks.start };
}

/** Clip B: the same child a few lessons later, so trophies, stickers and reports have something in them. */
async function recordProgress(profileDir) {
  const t0 = Date.now(); // the video starts with the browser's first page
  const context = await chromium.launchPersistentContext(profileDir, { ...launchOpts(), ...ctxOpts(true) });
  await context.addInitScript(TAP_RING);
  const page = context.pages()[0] || (await context.newPage());
  const marks = {};
  const mark = (name) => {
    marks[name] = (Date.now() - t0) / 1000;
  };
  const beat = (ms = 1300) => page.waitForTimeout(ms);
  const adventure = page.getByRole("button", { name: /Adventure/ });

  await page.goto(`${BASE}/play/?app=android`);
  await adventure.waitFor({ timeout: 60000 });
  await beat(800);
  mark("start");
  mark("rewards");
  await beat(2400);
  await page.goto(`${BASE}/play/#/trophies`);
  await page.getByRole("heading", { name: /Trophies/ }).waitFor();
  await beat(3000);

  await page.goto(`${BASE}/play/#/stickers`);
  await page.getByRole("heading", { name: /Sticker Book/ }).waitFor();
  mark("stickers");
  await beat(3400);

  await page.goto(`${BASE}/parents/`);
  await page.getByRole("button", { name: "2", exact: true }).waitFor({ timeout: 60000 });
  mark("parents");
  await enterPin(page, true);
  await beat(1000);
  await page.goto(`${BASE}/parents/#/reports`);
  await page.getByRole("heading", { name: /report/i }).first().waitFor();
  await beat(2600);
  await page.mouse.wheel(0, 500);
  await beat(2400);
  mark("end");
  const video = page.video();
  await context.close();
  return { file: await video.path(), marks, offset: marks.start };
}

// ---- 2. Cards and captions (PNG, drawn in the brand's fonts) --------------------------------
const CSS = `
@font-face{font-family:F;src:url(data:font/woff;base64,${font("fredoka-700.woff")})}
@font-face{font-family:A;src:url(data:font/woff;base64,${font("andika-400.woff")})}
*{box-sizing:border-box}`;
const bear = (() => {
  const svg = fs.readFileSync(`${root}public/icon.svg`, "utf8");
  return svg.match(/<g>[\s\S]*?<\/g>/)[0];
})();

async function pngs(browser, items) {
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  for (const { file, html, transparent } of items) {
    await page.setContent(`<style>${CSS}html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;${transparent ? "background:transparent" : ""}}</style>${html}`);
    await page.waitForTimeout(250);
    await page.screenshot({ path: file, omitBackground: !!transparent });
  }
  await page.close();
}

const cardHtml = (title, line, small) => `
<div style="width:${W}px;height:${H}px;background:linear-gradient(135deg,#79b5ff,#3978e8);display:flex;align-items:center;justify-content:center;gap:110px;font-family:F;color:#fff">
  <svg viewBox="0 0 512 512" width="380" height="380"><circle cx="256" cy="258" r="250" fill="#fff7e8"/>${bear}</svg>
  <div style="width:850px">
    <div style="font-size:140px;line-height:1">${title}</div>
    <div style="font:400 50px/1.3 A;margin-top:30px">${line}</div>
    ${small ? `<div style="font:400 34px/1.3 A;margin-top:40px;opacity:.9">${small}</div>` : ""}
    <div style="display:flex;gap:18px;margin-top:50px">${["#4f8ef7", "#e9559a", "#25b47e", "#ff9636"].map((c) => `<i style="width:46px;height:46px;border-radius:50%;background:${c};border:6px solid #fff7e8"></i>`).join("")}</div>
  </div>
</div>`;

const capHtml = (text) => `
<div style="position:absolute;left:0;right:0;bottom:0;height:${BAND}px;display:flex;align-items:center;justify-content:center;font-family:F;font-size:62px;color:#fff;text-shadow:0 3px 0 rgba(10,30,80,.25)">${text}</div>`;

// ---- 3. Music: a gentle original loop (synthesised; no samples, nothing to license) -----------
function music(seconds, file) {
  const SR = 44100;
  const n = Math.floor(seconds * SR);
  const out = new Float32Array(n);
  const bpm = 96;
  const beat = 60 / bpm;
  const hz = (m) => 440 * 2 ** ((m - 69) / 12);
  // C – Am – F – G, one bar each (4 beats), repeated.
  const bars = [
    { root: 48, notes: [60, 64, 67, 72] },
    { root: 45, notes: [57, 60, 64, 69] },
    { root: 41, notes: [53, 57, 60, 65] },
    { root: 43, notes: [55, 59, 62, 67] },
  ];
  const tone = (start, dur, f, amp, kind) => {
    const a = Math.floor(start * SR);
    const len = Math.floor(dur * SR);
    for (let i = 0; i < len && a + i < n; i++) {
      const t = i / SR;
      const env = Math.min(1, t / 0.01) * Math.exp(-t * (kind === "pad" ? 0.8 : 4.5)) * Math.min(1, (len - i) / (0.05 * SR));
      const s = kind === "bass" ? Math.sin(2 * Math.PI * f * t) : Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(4 * Math.PI * f * t) + 0.08 * Math.sin(6 * Math.PI * f * t);
      out[a + i] += s * env * amp;
    }
  };
  for (let bar = 0; bar * 4 * beat < seconds; bar++) {
    const c = bars[bar % 4];
    const t0 = bar * 4 * beat;
    tone(t0, 4 * beat, hz(c.root), 0.16, "bass");
    for (const m of c.notes.slice(0, 3)) tone(t0, 4 * beat, hz(m - 12), 0.035, "pad");
    // Bouncy eighth-note arpeggio.
    const order = [0, 1, 2, 3, 2, 1, 2, 3];
    order.forEach((k, i) => tone(t0 + (i * beat) / 2, beat * 0.9, hz(c.notes[k]), 0.07, "pluck"));
    // A little bell on beat 1 and 3 of every second bar.
    if (bar % 2 === 1) for (const b of [0, 2]) tone(t0 + b * beat, beat * 1.6, hz(c.notes[3] + 12), 0.03, "pluck");
  }
  // Soft limit, fade in and out, 16-bit mono WAV.
  const buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write("WAVEfmt ", 8);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write("data", 36); buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const fade = Math.min(1, t / 1.5, (seconds - t) / 2.5);
    buf.writeInt16LE(Math.round(Math.tanh(out[i] * 2.2) * 0.8 * fade * 32767), 44 + i * 2);
  }
  fs.writeFileSync(file, buf);
}

// ---- 4. Put it together ---------------------------------------------------------------------
const profile = path.join(TMP, "profile");
await prepare(profile);
const A = await recordStart();
const B = await recordProgress(profile);
const lenA = A.marks.end - A.offset + 0.4;
const lenB = B.marks.end - B.offset + 0.4;
const mainLen = lenA + lenB;
const LAG = 1.2;
// A time in the joined clip: clip A's marks, then clip B's.
const at = {
  hello: A.marks.hello - A.offset,
  adventure: A.marks.adventure - A.offset,
  endA: lenA,
  // The recorder shows each screen about a second after the clock says it was reached.
  rewards: lenA + B.marks.rewards - B.offset + LAG,
  stickers: lenA + B.marks.stickers - B.offset + LAG,
  parents: lenA + B.marks.parents - B.offset + LAG,
  end: mainLen,
};
const INTRO = 3.5;
const OUTRO = 4.5;
const SCENES = [
  { from: "hello", to: "adventure", text: "Pick a grade and start playing" },
  { from: "adventure", to: "endA", text: "Adventure picks what to practise next" },
  { from: "rewards", to: "stickers", text: "Coins and trophies, earned by learning" },
  { from: "stickers", to: "parents", text: "A sticker for every lesson that grows" },
  { from: "parents", to: "end", text: "Clear reports for parents" },
];

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const items = [
  { file: `${TMP}/intro.png`, html: cardHtml("Gradelings", "Practice and games for Pre-K to Grade 9", "Matched to your province, territory or state") },
  { file: `${TMP}/outro.png`, html: cardHtml("Gradelings", "Kind practice. Games worth playing.", "No ads. Never sells data. Kids can never buy anything.") },
  ...SCENES.map((s, i) => ({ file: `${TMP}/cap${i}.png`, html: capHtml(s.text), transparent: true })),
];
await pngs(browser, items);
await browser.close();

music(INTRO + mainLen + OUTRO + 0.2, `${TMP}/music.wav`);

// Main clip: join the two recordings (dropping the warm-up), centre the app on the blue and add each caption.
const inputs = ["-ss", String(A.offset), "-t", String(lenA), "-i", A.file, "-ss", String(B.offset), "-t", String(lenB), "-i", B.file];
SCENES.forEach((_, i) => inputs.push("-i", `${TMP}/cap${i}.png`));
let chain =
  `[0:v]setpts=PTS-STARTPTS,fps=30,scale=${VW}:${VH}:flags=lanczos[a];` +
  `[1:v]setpts=PTS-STARTPTS,fps=30,scale=${VW}:${VH}:flags=lanczos[b];` +
  `[a][b]concat=n=2:v=1:a=0,pad=${W}:${H}:${Math.round((W - VW) / 2)}:0:color=#4a88ee[v0]`;
SCENES.forEach((sc, i) => {
  const from = (at[sc.from] + 0.2).toFixed(2);
  const to = (at[sc.to] - 0.1).toFixed(2);
  chain += `;[v${i}][${i + 2}:v]overlay=0:0:enable='between(t,${from},${to})'[v${i + 1}]`;
});
run("ffmpeg", ["-y", "-v", "error", ...inputs, "-filter_complex", chain, "-map", `[v${SCENES.length}]`, "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "17", `${TMP}/main.mp4`]);

for (const [name, len] of [["intro", INTRO], ["outro", OUTRO]]) {
  run("ffmpeg", ["-y", "-v", "error", "-loop", "1", "-t", String(len), "-i", `${TMP}/${name}.png`, "-vf", `fps=30,fade=t=in:d=0.5,fade=t=out:st=${len - 0.5}:d=0.5`, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "17", `${TMP}/${name}.mp4`]);
}
fs.writeFileSync(`${TMP}/list.txt`, ["intro", "main", "outro"].map((n) => `file '${TMP}/${n}.mp4'`).join("\n"));
const final = path.join(OUT, "gradelings-play-demo.mp4");
run("ffmpeg", ["-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", `${TMP}/list.txt`, "-i", `${TMP}/music.wav`, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", final]);
fs.copyFileSync(`${TMP}/intro.png`, path.join(OUT, "poster.png"));
console.log(final);
fs.rmSync(TMP, { recursive: true, force: true });
