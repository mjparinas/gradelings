// Google Play screenshots for the Android app (docs/PLAY_LISTING.md): phone, 7-inch tablet and
// 10-inch tablet, portrait, at sizes Play accepts (each side 320 to 3840 px, long side at most
// twice the short one). It plays a few questions as a demo Grade 3 child ("Maya", no real
// child), opening pages the way the Android app does (?app=android), so no prices or subscribe
// buttons show.
//
//   npm run build && npm start
//   node scripts/android-screenshots.mjs http://localhost:3000 [out-dir]
//
// Chromium, like the app (a Trusted Web Activity runs in Chrome).
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { enterPin, newChild, step, vis } from "./helpers.mjs";

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const OUT = process.argv[3] || "e2e-shots/android-play";
fs.mkdirSync(OUT, { recursive: true });

const AGENT = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36";
const ONLY = process.env.ONLY;
const SIZES = [
  { name: "phone", viewport: { width: 360, height: 640 }, deviceScaleFactor: 3 }, // 1080 × 1920
  { name: "tablet-7", viewport: { width: 600, height: 960 }, deviceScaleFactor: 2 }, // 1200 × 1920
  { name: "tablet-10", viewport: { width: 800, height: 1280 }, deviceScaleFactor: 2 }, // 1600 × 2560
];

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
let failed = false;

for (const size of SIZES.filter((s) => !ONLY || s.name === ONLY)) {
  console.log(`\n${size.name}`);
  const context = await browser.newContext({
    viewport: size.viewport,
    deviceScaleFactor: size.deviceScaleFactor,
    userAgent: AGENT,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const shot = async (n, label) => {
    await page.waitForTimeout(700);
    // `next dev` draws a small "N" badge; a store screenshot must not carry it (a production build has none).
    await page.addStyleTag({ content: "nextjs-portal{display:none!important}" }).catch(() => {});
    const file = path.join(OUT, `${size.name}-${n}-${label}.png`);
    await page.screenshot({ path: file });
    console.log(`  ${file}`);
  };
  try {
    await page.goto(`${BASE}/play/?app=android`);
    await page.getByRole("button", { name: /Let's go/ }).click();
    await newChild(page, "Maya", "Grade 3");
    const adventure = page.getByRole("button", { name: /Adventure/ });
    await adventure.waitFor();

    await adventure.click();
    await page.getByRole("button", { name: "Stop", exact: true }).waitFor();
    await shot(1, "question");
    for (let i = 0; i < 60 && !(await vis(page.getByRole("button", { name: /Keep going|Play again/ }))); i++) await step(page);

    await page.goto(`${BASE}/play/#/`);
    await adventure.waitFor();
    await shot(2, "home");
    await page.goto(`${BASE}/play/#/trophies`);
    await shot(3, "trophies");
    await page.goto(`${BASE}/play/#/arcade`);
    await shot(4, "arcade");
    await page.goto(`${BASE}/play/#/stickers`);
    await shot(5, "stickers");

    await page.goto(`${BASE}/parents/`);
    await enterPin(page, true);
    await page.goto(`${BASE}/parents/#/reports`);
    await page.getByRole("heading", { name: /report/i }).first().waitFor();
    await shot(6, "parent-reports");
    if (await vis(page.getByText(/C\$|US\$|Subscribe/))) {
      console.log("  ✗ a price or Subscribe button is showing");
      failed = true;
    }
  } catch (e) {
    console.log(`  ✗ ${e.message}`);
    await page.screenshot({ path: path.join(OUT, `${size.name}-error.png`) }).catch(() => {});
    failed = true;
  }
  await context.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
