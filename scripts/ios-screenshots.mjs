// App Store screenshots for the iPhone and iPad app (docs/IOS.md), at the sizes App Store Connect
// asks for: iPhone 6.9" (1320 × 2868) and iPad 13" (2064 × 2752, portrait and landscape).
// It plays a few questions as a Grade 3 child so the screens have something on them, opening the
// pages the way the app does (?app=ios and the app's user agent), so no prices or subscribe
// buttons show.
//
//   npm run build && npm start
//   node scripts/ios-screenshots.mjs http://localhost:3000 [out-dir]
//
// Uses WebKit (Safari's engine, like the app) when it's installed, otherwise Chromium at the same size.
import fs from "node:fs";
import path from "node:path";
import { chromium, webkit } from "playwright";
import { enterPin, newChild, step, vis } from "./helpers.mjs";

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const OUT = process.argv[3] || "e2e-shots/ios-app-store";
fs.mkdirSync(OUT, { recursive: true });

const IOS_AGENT = "GradelingsApp-iOS/1.0.0";
const SIZES = [
  {
    name: "iphone-6.9",
    viewport: { width: 440, height: 956 },
    deviceScaleFactor: 3,
    userAgent: `Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ${IOS_AGENT}`,
  },
  {
    name: "ipad-13-portrait",
    viewport: { width: 1032, height: 1376 },
    deviceScaleFactor: 2,
    userAgent: `Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ${IOS_AGENT}`,
  },
  {
    name: "ipad-13-landscape",
    viewport: { width: 1376, height: 1032 },
    deviceScaleFactor: 2,
    userAgent: `Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ${IOS_AGENT}`,
  },
];

async function launch() {
  try {
    return { browser: await webkit.launch(), engine: "webkit" };
  } catch {
    return { browser: await chromium.launch(), engine: "chromium" };
  }
}

const { browser, engine } = await launch();
console.log(`Using ${engine}`);
let failed = false;

for (const size of SIZES) {
  console.log(`\n${size.name}`);
  const context = await browser.newContext({
    viewport: size.viewport,
    deviceScaleFactor: size.deviceScaleFactor,
    userAgent: size.userAgent,
    // WebKit can't emulate mobile; touch is what changes the layout.
    ...(engine === "chromium" ? { isMobile: true } : {}),
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const shot = async (n, label) => {
    await page.waitForTimeout(500);
    const file = path.join(OUT, `${size.name}-${n}-${label}.png`);
    await page.screenshot({ path: file });
    console.log(`  ${file}`);
  };
  try {
    await page.goto(`${BASE}/play/?app=ios`);
    await page.getByRole("button", { name: /Let's go/ }).click();
    await newChild(page, "Maya", "Grade 3");
    const adventure = page.getByRole("button", { name: /Adventure/ });
    await adventure.waitFor();

    // Play a few questions first, so there is XP, a trophy and progress to show.
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

    await page.goto(`${BASE}/parents/`);
    await enterPin(page, true);
    await page.goto(`${BASE}/parents/#/reports`);
    await page.getByRole("heading", { name: /report/i }).first().waitFor();
    await shot(5, "parent-reports");
    if (await vis(page.getByText(/C\$|Subscribe/))) {
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
