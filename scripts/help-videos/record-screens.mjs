// Records a screen walkthrough of the parent area for one video in screens/<file>.json (see README).
//   node record-screens.mjs <specfile> <video-id> <durations.json> <out.json> <out.webm>
// Demo data only: a child called Maya on a fresh local device. Writes the real start time of each step.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright";
import { enterPin, newChild, step } from "../helpers.mjs";

const [specFile, id, durFile, outJson, outWebm] = process.argv.slice(2);
const BASE = (process.env.BASE || "http://localhost:3000").replace(/\/$/, "");
const video = JSON.parse(fs.readFileSync(specFile, "utf8")).videos.find((v) => v.id === id);
const durs = JSON.parse(fs.readFileSync(durFile, "utf8"));
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "gl-screens-"));
const opts = { executablePath: process.env.CHROMIUM_PATH || undefined };
const view = { width: 1280, height: 720 };

const CSS = `nextjs-portal{display:none!important}
#gl-mark{position:absolute;z-index:2147483646;pointer-events:none;border:5px solid #ffc233;border-radius:14px;box-shadow:0 0 0 4px rgba(37,48,71,.35);animation:glp 1s ease-in-out infinite alternate}
@keyframes glp{from{opacity:.55}to{opacity:1}}`;
const INIT = `addEventListener("pointerdown", (e) => {
  const d = document.createElement("div");
  d.style.cssText = "position:fixed;z-index:2147483647;pointer-events:none;width:56px;height:56px;border-radius:50%;border:5px solid #fff;background:rgba(255,194,51,.55);transform:translate(-50%,-50%) scale(.4);transition:transform .45s,opacity .45s;left:" + e.clientX + "px;top:" + e.clientY + "px";
  document.documentElement.appendChild(d);
  requestAnimationFrame(() => requestAnimationFrame(() => { d.style.transform = "translate(-50%,-50%) scale(1.5)"; d.style.opacity = "0"; }));
  setTimeout(() => d.remove(), 600);
}, true);
document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = ${JSON.stringify(CSS)}; document.head.appendChild(s); });`;

const profile = path.join(TMP, "profile");
// 1. Seed a demo child with some practice, and a PIN (not recorded).
{
  const c = await chromium.launchPersistentContext(profile, { ...opts, viewport: view });
  const p = c.pages()[0] || (await c.newPage());
  await p.goto(`${BASE}/play/${video.web ? "" : "?app=android"}`, { waitUntil: "load", timeout: 180000 });
  await p.getByRole("button", { name: /Let's go/ }).click({ force: true });
  await newChild(p, "Maya", "Grade 3");
  await p.getByRole("button", { name: /Adventure/ }).click({ force: true });
  await p.getByRole("button", { name: "Stop", exact: true }).waitFor();
  for (let i = 0; i < 60; i++) await step(p);
  await p.goto(`${BASE}/parents/`, { waitUntil: "load" });
  await enterPin(p, true);
  await c.close();
}

// 2. Record.
const ctx = await chromium.launchPersistentContext(profile, { ...opts, viewport: view, recordVideo: { dir: TMP, size: view } });
await ctx.addInitScript(INIT);
const tPage = Date.now();
const page = ctx.pages()[0] || (await ctx.newPage());
await page.goto(`${BASE}/parents/${video.web ? "" : "?app=android"}`, { waitUntil: "load", timeout: 120000 });
await enterPin(page, false);
await page.waitForTimeout(1200);
await page.getByRole("button", { name: "Not now" }).click({ timeout: 1500 }).catch(() => {});

const find = (t) => page.getByText(t, { exact: false }).first();
async function mark(t) {
  const box = await find(t).boundingBox();
  await page.evaluate((b) => {
    document.getElementById("gl-mark")?.remove();
    const m = document.createElement("div");
    m.id = "gl-mark";
    const pad = 8;
    m.style.cssText = `left:${b.x + scrollX - pad}px;top:${b.y + scrollY - pad}px;width:${b.width + 2 * pad}px;height:${b.height + 2 * pad}px`;
    document.body.appendChild(m);
  }, box);
}
const run = async (a) => {
  if (a.tab) {
    await page.getByRole("link", { name: a.tab, exact: false }).first().click().catch(() => page.getByRole("button", { name: a.tab }).first().click());
    await page.waitForTimeout(500);
    // Skip past the subscribe banner so the screen shows the page itself.
    await page.evaluate((t) => {
      const h = [...document.querySelectorAll("h1")].find((x) => x.textContent.includes(t)) || document.querySelector("h1");
      if (h) scrollTo({ top: h.getBoundingClientRect().top + scrollY - 130, behavior: "instant" });
    }, a.tab === "Reports" ? "report" : a.tab);
  }
  else if (a.click) await page.getByRole("button", { name: a.click, exact: true }).or(page.getByRole("link", { name: a.click, exact: true })).or(page.getByText(a.click)).first().click({ force: true });
  else if (a.goto) { await page.evaluate((h) => { location.hash = h; }, a.goto); await page.waitForTimeout(800); }
  else if (a.top) await find(a.top).evaluate((e) => scrollTo({ top: e.getBoundingClientRect().top + scrollY - 130, behavior: "instant" }));
  else if (a.scroll) await find(a.scroll).evaluate((e) => e.scrollIntoView({ block: "center", behavior: "smooth" }));
  else if (a.fill) await page.getByLabel(a.fill[0]).fill(a.fill[1]);
  else if (a.wait) await page.waitForTimeout(a.wait);
  if (a.mark) await mark(a.mark);
  await page.waitForTimeout(a.scroll ? 900 : 300);
};
process.on("unhandledRejection", () => {});
const t0 = Date.now();
const starts = [];
for (let i = 0; i < video.steps.length; i++) {
  const s = video.steps[i];
  const at = Date.now();
  starts.push((at - t0) / 1000);
  await page.evaluate(() => document.getElementById("gl-mark")?.remove());
  for (const a of s.do || []) await run(a).catch(async (e) => { if (process.env.DEBUG_SHOT) await page.screenshot({ path: process.env.DEBUG_SHOT }); throw e; });
  const left = durs[i] * 1000 - (Date.now() - at);
  if (left > 0) await page.waitForTimeout(left);
}
await page.waitForTimeout(500);
const vid = page.video();
await ctx.close();
fs.copyFileSync(await vid.path(), outWebm);
fs.writeFileSync(outJson, JSON.stringify({ starts, trim: (t0 - tPage) / 1000 - 0.1 }));
fs.rmSync(TMP, { recursive: true, force: true });
