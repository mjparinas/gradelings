// Click-to-feedback benchmark: how long after a tap the screen first changes, and how long
// until the next screen is ready, for the kids' app, the parent area and the way in from a
// public page. Runs on a mid-range tablet profile (CPU slowed 4x, a fast 4G network) with the
// service worker blocked, because an active worker's own fetches aren't throttled.
//
//   node scripts/bench-clicks.mjs http://localhost:3000 [runs] [--json out.json]
//
// "feedback" is the first frame after the tap that shows a progress signal (a pending spinner or bar, a
// loading view) or the next screen itself; "ready" is when the next screen's landmark is visible. Both are
// timed from the pointerdown in the page. Medians over the runs are printed.
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { enterPin, newChild, step } from "./helpers.mjs";

const BASE = process.argv[2] ?? "http://localhost:3000";
const RUNS = Number(process.argv[3] ?? 3);
const jsonAt = process.argv.indexOf("--json");
const JSON_OUT = jsonAt > 0 ? process.argv[jsonAt + 1] : "";

const results = {};
const HEAVY = Number(process.env.BENCH_EVENTS ?? 15000);
// Grade 3 BC unit keys, so seeded answers land on real units.
const LOCK = JSON.parse(readFileSync(new URL("../src/content/locks/ca-bc.json", import.meta.url), "utf8"));
const UNIT_KEYS = ["math", "language", "science", "social"].flatMap((s) => LOCK[`3/${s}`].units.map((u) => `3/${s}/${u.split(" ")[0]}`));

/** Gives the device's child a year of practice (HEAVY answers over 300 days), then reloads. */
async function seedHistory(page) {
  if (!HEAVY) return;
  await page.evaluate(
    async ({ n, units }) => {
      const db = await new Promise((res, rej) => {
        const r = indexedDB.open("grademap", 1);
        r.onsuccess = () => res(r.result);
        r.onerror = () => rej(r.error);
      });
      const profiles = await new Promise((res) => {
        const g = db.transaction("kv").objectStore("kv").get("profiles");
        g.onsuccess = () => res(g.result);
      });
      const pid = profiles[0].id;
      const DAY = 86_400_000;
      const t0 = Date.now() - 300 * DAY;
      const tx = db.transaction("events", "readwrite");
      const store = tx.objectStore("events");
      for (let i = 0; i < n; i++) {
        const t = t0 + Math.floor((i / n) * 299) * DAY + (i % 500) * 4000;
        const event = { id: `seed-a${i}`, profileId: pid, t, type: "answer", unit: units[i % units.length], correct: i % 4 !== 0, attempts: i % 4 ? 1 : 2, revealed: false, ms: 6000, mode: "adventure", difficulty: 2 };
        store.put({ event, id: event.id, profileId: pid, synced: 1 });
        if (i % 10 === 9) {
          const s = { id: `seed-s${i}`, profileId: pid, t: t + 1, type: "session", mode: "adventure", scope: "mix", total: 10, correct: 7, ms: 60000 };
          store.put({ event: s, id: s.id, profileId: pid, synced: 1 });
        }
      }
      await new Promise((res) => (tx.oncomplete = res));
    },
    { n: HEAVY, units: UNIT_KEYS },
  );
  await page.reload();
}
const add = (name, feedback, ready) => (results[name] ??= []).push({ feedback, ready });

/**
 * Notes when the tap lands (pointerdown, so Playwright's own checks before clicking don't count) and the first
 * frame that shows a progress signal: a pending spinner or bar (`[data-pending]`) or a loading view.
 */
async function armObserver(page) {
  await page.evaluate(() => {
    window.__tapAt = 0;
    window.__signalAt = 0;
    const watch = () => {
      if (document.querySelector("[data-pending], .screen-loading")) window.__signalAt = performance.now();
      else requestAnimationFrame(watch);
    };
    document.addEventListener(
      "pointerdown",
      () => {
        window.__tapAt = performance.now();
        requestAnimationFrame(watch);
      },
      { capture: true, once: true },
    );
  });
}

/** Taps `target`, then waits for `ready`; records ms from the tap to the first progress signal (or the screen itself) and to ready. */
async function timed(page, name, target, ready) {
  await armObserver(page);
  await target.click({ force: true, noWaitAfter: true });
  await ready.waitFor({ timeout: 60_000 });
  const r = await page.evaluate(() => ({ tap: window.__tapAt, signal: window.__signalAt, now: performance.now() })).catch(() => null);
  // A full page load replaces the document, so its timings are taken from navigation entries instead.
  if (!r || r.tap === undefined) {
    const nav = await page.evaluate(() => ({ fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0, now: performance.now() }));
    add(name, Math.round(nav.fcp), Math.round(nav.now));
    return;
  }
  const readyMs = r.now - r.tap;
  add(name, Math.round(r.signal ? Math.min(r.signal - r.tap, readyMs) : readyMs), Math.round(readyMs));
}

async function newPage(browser, viewport = { width: 1024, height: 768 }) {
  const context = await browser.newContext({ viewport, serviceWorkers: "block", hasTouch: true });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await cdp.send("Network.enable");
  // Roughly "fast 4G": 9 Mbps down, 60 ms latency.
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 60, downloadThroughput: (9 * 1024 * 1024) / 8, uploadThroughput: (3 * 1024 * 1024) / 8 });
  return { context, page };
}

async function kids(browser) {
  const { context, page } = await newPage(browser);
  // Way in from a public page.
  await page.goto(`${BASE}/curriculum/`);
  await page.waitForLoadState("networkidle");
  const play = page.getByRole("banner").getByRole("link", { name: "Play free" });
  await timed(page, "public → /play/ (Play free)", play, page.getByRole("button", { name: /Let's go/ }).or(page.getByLabel("Name")));
  if (await page.getByRole("button", { name: /Let's go/ }).isVisible().catch(() => false)) await page.getByRole("button", { name: /Let's go/ }).click({ force: true });
  await newChild(page, "Maya", "Grade 3");
  const home = page.getByRole("button", { name: /Adventure/ });
  await home.waitFor();
  await page.waitForTimeout(800);
  await seedHistory(page);
  const t0 = Date.now();
  await home.waitFor({ timeout: 60_000 });
  add("kids: reopen /play/ (home ready)", 0, Date.now() - t0);
  await page.waitForTimeout(1500);
  const back = async () => {
    await page.evaluate(() => (location.hash = "#/"));
    await home.waitFor();
    await page.waitForTimeout(400);
  };
  const tiles = [
    ["kids: Adventure", page.getByRole("button", { name: /Adventure/ }), page.getByRole("button", { name: "Stop", exact: true })],
    ["kids: Practice", page.getByRole("link", { name: /Practice/ }).or(page.getByRole("button", { name: /Practice/ })).first(), page.getByRole("heading", { level: 1 })],
    ["kids: Stories", page.getByRole("link", { name: /Stories/ }).or(page.getByRole("button", { name: /Stories/ })).first(), page.getByText(/Just right|A little easier/).first()],
    ["kids: Arcade", page.getByRole("link", { name: /Arcade/ }).or(page.getByRole("button", { name: /Arcade/ })).first(), page.getByText(/Number Munchers/).first()],
    ["kids: Trophies", page.getByRole("link", { name: /Trophies/ }).or(page.getByRole("button", { name: /Trophies/ })).first(), page.getByText(/Bronze|First Steps/).first()],
    ["kids: Shop", page.getByRole("link", { name: /Shop/ }).or(page.getByRole("button", { name: /Shop/ })).first(), page.getByText(/Buddies|Titles/).first()],
    ["kids: My Room", page.getByRole("link", { name: /My Room/ }).or(page.getByRole("button", { name: /My Room/ })).first(), page.getByText(/Walls|Floors/).first()],
  ];
  for (const [name, tile, ready] of tiles) {
    if (!(await tile.isVisible().catch(() => false))) continue;
    await timed(page, name, tile, ready);
    await back();
  }
  // Answering: tap a choice and time the feedback.
  await page.getByRole("button", { name: /Adventure/ }).click({ force: true });
  await page.getByRole("button", { name: "Stop", exact: true }).waitFor();
  for (let i = 0, timedAnswers = 0; i < 40 && timedAnswers < 5; i++) {
    await page.waitForTimeout(700);
    const choice = page.locator('[data-testid="choice"]:not([disabled])').first();
    if (!(await choice.isVisible().catch(() => false))) {
      // Not a tap-to-answer question: answer it the usual way and move on.
      await step(page);
      continue;
    }
    timedAnswers++;
    await timed(page, "kids: tap an answer", choice, page.locator("[role=status]").or(page.locator('[data-testid="choice"][data-state]')).first());
    const next = page.getByRole("button", { name: /^(Next →|Finish 🎉|OK)$/ });
    if (await next.isVisible().catch(() => false)) await timed(page, "kids: Next question", next, page.locator('[data-testid="choice"]:not([disabled])').first().or(page.getByRole("button", { name: /Check/ })));
  }
  await context.close();
}

async function parents(browser) {
  const { context, page } = await newPage(browser);
  await page.goto(`${BASE}/play/`);
  await page.getByRole("button", { name: /Let's go/ }).or(page.getByLabel("Name")).waitFor();
  if (await page.getByRole("button", { name: /Let's go/ }).isVisible().catch(() => false)) await page.getByRole("button", { name: /Let's go/ }).click({ force: true });
  await newChild(page, "Maya", "Grade 3");
  await page.getByRole("button", { name: /Adventure/ }).waitFor();
  await page.waitForTimeout(800);
  await seedHistory(page);
  await page.getByRole("button", { name: /Adventure/ }).waitFor({ timeout: 60_000 });
  await page.goto(`${BASE}/parents/`);
  await enterPin(page, true);
  await page.getByRole("navigation", { name: "Parent sections" }).waitFor();
  await page.waitForTimeout(1000);
  // Each tab, with its page's own heading, so "ready" waits for the new page and not the old one.
  const tabs = [
    ["Reports", /report$/],
    ["Children", /^Children$/],
    ["Settings", /^Settings$/],
    ["Account", /^Account$/],
    ["Subscri", /^Subscri/],
    ["Overview", /^Overview$/],
  ];
  for (const [tab, heading] of tabs) {
    const link = page.getByRole("navigation", { name: "Parent sections" }).getByRole("link", { name: new RegExp(tab) }).first();
    if (!(await link.isVisible().catch(() => false))) continue;
    await timed(page, `parents: ${tab} tab`, link, page.getByRole("heading", { level: 1, name: heading }));
    await page.waitForTimeout(500);
  }
  await context.close();
}

// CHROMIUM_PATH runs a browser other than the one this Playwright version ships with.
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
for (let i = 0; i < RUNS; i++) {
  await kids(browser);
  await parents(browser);
}
await browser.close();

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};
const rows = Object.entries(results).map(([name, rs]) => ({ name, feedback: median(rs.map((r) => r.feedback)), ready: median(rs.map((r) => r.ready)) }));
console.log("click                                    feedback ms   ready ms");
for (const r of rows) console.log(`${r.name.padEnd(40)} ${String(r.feedback).padStart(11)} ${String(r.ready).padStart(10)}`);
if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify(rows, null, 2));
