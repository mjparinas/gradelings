// Real offline test. It starts the production server itself and then stops it, so
// only the service worker cache can answer. (Playwright's setOffline() doesn't cut
// off service worker requests, so it can't prove the cache works.)
//
//   npm run build
//   npm i --no-save playwright && npx playwright install chromium
//   node scripts/e2e-offline.mjs [out-dir]
//
// Checks, on a first visit with no reloads:
//   1. a Grade 5 child's lessons work in a fresh tab with the server gone;
//   2. adding a Kindergartener offline (never downloaded) shows the friendly screen;
//   3. once the server is back, "Try again" loads Kindergarten;
//   4. the Piper voice downloads by itself once a parent turns on "Read questions out loud", is on under
//      Account without a parent touching it, and reads a question aloud with the server gone;
//   5. in maintenance mode, the saved kids' app keeps working while a new device gets the maintenance page.
import { spawn } from "node:child_process";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { createClient } from "@libsql/client";
import { chromium } from "playwright";
import { enterPin } from "./helpers.mjs";

const PORT = 4199;
const BASE = `http://localhost:${PORT}`;
const OUT = process.argv[2] || "e2e-shots";
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
fs.mkdirSync(OUT, { recursive: true });

let server;
function startServer() {
  server = spawn(`${ROOT}node_modules/.bin/next`, ["start", "-p", String(PORT)], { cwd: ROOT, stdio: "ignore" });
}
async function stopServer() {
  const exited = new Promise((r) => server.once("exit", r));
  server.kill();
  await exited;
}
async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(BASE + "/");
      return;
    } catch {
      await sleep(1000);
    }
  }
  throw new Error("server did not start (did you run `npm run build`?)");
}
const questionOnScreen = (page) =>
  page.locator('[data-testid="choice"], [data-testid="bin"], [data-testid="pool-item"], button:has-text("Check")').first();

const errors = [];
let browser;
try {
  startServer();
  await waitForServer();
  browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1180, height: 820 }, reducedMotion: "reduce" });
  // Counts audio clips that start playing, so we know the Piper voice really made sound.
  await ctx.addInitScript(() => {
    // The app skips the background voice download in automated browsers; this test is the one
    // place that checks it really happens.
    Object.defineProperty(Navigator.prototype, "webdriver", { get: () => false });
    window.__audioClips = 0;
    const start = AudioBufferSourceNode.prototype.start;
    AudioBufferSourceNode.prototype.start = function (...args) {
      window.__audioClips++;
      return start.apply(this, args);
    };
  });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto(BASE + "/play/");
  await page.getByRole("button", { name: /Let's go/ }).click({ force: true });
  await page.getByLabel("Name").fill("Ava");
  await page.getByRole("button", { name: "Grade 5", exact: true }).click();
  await page.getByRole("button", { name: "Start!" }).click({ force: true });
  await page.getByRole("button", { name: /Adventure/ }).waitFor();
  await page.waitForTimeout(5000); // let the worker take control and keep the lessons

  // Grade 5 doesn't read aloud by default, so nothing downloads until a parent turns it on.
  if (await page.evaluate(async () => (await caches.keys()).includes("grademap-piper") && (await (await caches.open("grademap-piper")).keys()).length > 0)) throw new Error("the voice downloaded with read-aloud off");
  await page.goto(BASE + "/parents/#/settings");
  await enterPin(page, true);
  await page.getByRole("switch", { name: /Read questions out loud/ }).first().click();
  // The list of files is saved last, once everything else is in.
  const voiceSaved = () => page.evaluate(async () => (await (await caches.open("grademap-piper")).keys()).some((r) => r.url.endsWith("/files.json")));
  for (const t0 = Date.now(); !(await voiceSaved()); await sleep(1000)) if (Date.now() - t0 > 180000) throw new Error("the offline voice didn't download by itself");

  // Account shows it on and ready, without a parent doing anything.
  await page.goto(BASE + "/parents/#/account");
  await page.getByRole("button", { name: "Change voice" }).click();
  const piper = page.getByTestId("piper-en");
  await piper.getByRole("button", { name: "▶ Preview", exact: true }).waitFor({ timeout: 15000 });
  if ((await piper.getByRole("switch", { name: /Use the offline voice/ }).getAttribute("aria-checked")) !== "true") throw new Error("the offline voice isn't on by default");
  console.log("✓ online: the Piper voice downloads by itself and is on by default");

  await stopServer();
  if (await fetch(BASE + "/").then(() => true, () => false)) throw new Error("server still answering");

  const tab = await ctx.newPage();
  tab.on("pageerror", (e) => errors.push(e.message));
  await tab.goto(BASE + "/play/");
  await tab.getByRole("button", { name: /Adventure/ }).click({ force: true, timeout: 15000 });
  await questionOnScreen(tab).waitFor({ timeout: 15000 });
  await tab.screenshot({ path: `${OUT}/offline-1-grade5-question.png` });
  console.log("✓ offline: Grade 5 lessons load from the cache");

  // Occasional screens are their own downloads (src/components/play/lazyScreens.tsx), fetched in the background
  // while the app was open, so they open offline too.
  await tab.getByRole("button", { name: "Stop", exact: true }).first().click({ force: true });
  await tab.getByRole("dialog").getByRole("button", { name: "Stop", exact: true }).click({ force: true });
  for (const [hash, heading] of [["#/arcade", /Arcade/], ["#/shop", /Shop/], ["#/trophies", /Trophies/]) {
    await tab.evaluate((h) => (location.hash = h), hash);
    await tab.getByRole("heading", { level: 1, name: heading }).waitFor({ timeout: 15000 });
  }
  console.log("✓ offline: the arcade, shop and trophies open from the cache");
  await tab.evaluate(() => (location.hash = "#/"));
  await tab.getByRole("button", { name: /Adventure/ }).click({ force: true, timeout: 15000 });
  await questionOnScreen(tab).waitFor({ timeout: 15000 });

  const clipsBefore = await tab.evaluate(() => window.__audioClips);
  await tab.getByRole("button", { name: "Read it to me" }).click();
  await tab.waitForFunction((n) => window.__audioClips > n, clipsBefore, { timeout: 90000 });
  await tab.getByRole("button", { name: "Stop", exact: true }).first().click({ force: true });
  await tab.getByRole("dialog").getByRole("button", { name: "Stop", exact: true }).click({ force: true });
  console.log("✓ offline: the Piper voice reads a question aloud");

  await tab.goto(BASE + "/play/");
  await tab.getByText("Ava").first().click({ force: true }); // opens the player picker
  await tab.getByRole("button", { name: /Add player/ }).click({ force: true });
  await tab.getByLabel("Name").fill("Leo");
  await tab.getByRole("button", { name: "Kindergarten", exact: true }).click();
  await tab.getByRole("button", { name: "Start!" }).click({ force: true });
  await tab.getByRole("heading", { name: /We need the internet/ }).waitFor({ timeout: 15000 });
  await tab.screenshot({ path: `${OUT}/offline-2-missing-grade.png` });
  console.log("✓ offline: a grade that was never downloaded shows the friendly screen");

  startServer();
  await waitForServer();
  await tab.getByRole("button", { name: "Try again" }).click();
  await tab.getByRole("button", { name: /Let's Play/ }).waitFor({ timeout: 20000 });
  console.log("✓ online again: Try again loads Kindergarten");

  // Maintenance mode, switched straight in the database; the server reads it again within 15 seconds.
  const db = createClient({ url: process.env.DATABASE_URL ?? "file:./data/grademap.db", authToken: process.env.DATABASE_AUTH_TOKEN });
  const maintenance = (on) =>
    db.execute({
      sql: "INSERT INTO admin_settings (key, value, updated_at) VALUES ('maintenance', ?, ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at",
      args: [JSON.stringify(on ? { on: true, since: Date.now() } : { on: false, since: null }), Date.now()],
    });
  await maintenance(true);
  try {
    await sleep(16000);
    await tab.goto(BASE + "/play/");
    await tab.getByRole("button", { name: /Let's Play|Adventure/ }).first().waitFor({ timeout: 15000 });
    console.log("✓ maintenance: the saved kids' app keeps working");
    const fresh = await (await browser.newContext()).newPage();
    const res = await fresh.goto(BASE + "/play/");
    if (res?.status() !== 503 || !(await fresh.getByRole("heading", { name: /is under maintenance/ }).isVisible())) throw new Error("a new device didn't get the maintenance page");
    console.log("✓ maintenance: a new device gets the maintenance page");
  } finally {
    await maintenance(false);
  }
} catch (e) {
  errors.push(e instanceof Error ? e.message.split("\n")[0] : String(e));
} finally {
  await browser?.close();
  if (server && server.exitCode === null) server.kill();
}
console.log(errors.length ? `ERRORS:\n${errors.join("\n")}` : "no errors");
process.exit(errors.length ? 1 : 0);
