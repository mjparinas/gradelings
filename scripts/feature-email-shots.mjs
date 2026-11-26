// The pictures in the feature emails (src/lib/featureSeries.ts): a real screen of the app for each email, on a soft
// branded panel, saved as public/email/features/<id>.jpg at twice the size it shows in an email (520 px wide).
// Kids' screens are taken in a phone-sized window with a demo child ("Maya", Grade 3, or "Pip", Kindergarten) who has
// two weeks of practice; parent screens in a 900 px window. Nothing real is shown: no real child, no real account.
//
//   npm run build && npm start
//   node scripts/feature-email-shots.mjs http://localhost:3000
//   ONLY=adventure,stickers node scripts/feature-email-shots.mjs http://localhost:3000    (a few)
//
// The pictures are committed; run this again when a screen changes a lot.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";
import { chromium } from "playwright";
import { enterPin, newChild } from "./helpers.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(`${root}/`, { alias: { "@": `${root}/src` } });
const { FEATURE_EMAILS } = await jiti.import("./src/lib/featureSeries.ts");

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const OUT = path.join(root, "public", "email", "features");
const RAW = path.join(root, "e2e-shots", "feature-email-raw");
mkdirSync(OUT, { recursive: true });
mkdirSync(RAW, { recursive: true });
const ONLY = process.env.ONLY ? new Set(process.env.ONLY.split(",")) : null;

const PHONE = { width: 390, height: 780 };
const DESK = { width: 900, height: 600 };
/** The size of a picture in the email, in CSS pixels. */
const W = 520;
const H = 340;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });

/** Two weeks of practice across a few units, and a times-table chart that is part way filled in. */
async function seed(page, grade) {
  await page.evaluate(
    async ({ grade }) => {
      const db = await new Promise((res, rej) => {
        const r = indexedDB.open("gradelings", 1);
        r.onsuccess = () => res(r.result);
        r.onerror = () => rej(r.error);
      });
      const profiles = await new Promise((res) => {
        const g = db.transaction("kv").objectStore("kv").get("profiles");
        g.onsuccess = () => res(g.result);
      });
      const pid = profiles[0].id;
      const units =
        grade === "k"
          ? ["k/math/count-to-10", "k/math/shapes-and-sizes", "k/language/letter-partners", "k/language/first-sounds"]
          : ["3/math/numbers-to-1000", "3/math/multiplication", "3/math/fractions", "3/language/read-and-think", "3/language/story-elements", "3/science/food-chains", "3/social/maps-and-globes"];
      const now = Date.now();
      const tx = db.transaction("events", "readwrite");
      const store = tx.objectStore("events");
      let n = 0;
      const put = (event) => store.put({ event, id: event.id, profileId: pid, synced: 1 });
      for (let day = 13; day >= 0; day--) {
        if (day === 4 || day === 9) continue;
        const t0 = now - day * 86_400_000 - 3_600_000;
        for (let u = 0; u < 2; u++) {
          const unit = units[(day + u * 3) % units.length];
          for (let i = 0; i < 10; i++) {
            const right = (i * 7 + day) % 10 < 8;
            put({ id: `shot-${day}-${u}-${i}`, profileId: pid, t: t0 + u * 700_000 + i * 20_000, type: "answer", unit, correct: right, attempts: right ? 1 : 2, revealed: false, ms: 9000 + ((i * 1300) % 6000), mode: u ? "adventure" : "practice", difficulty: 1 + ((day + i) % 3) });
            n++;
          }
          put({ id: `shot-s-${day}-${u}`, profileId: pid, t: t0 + u * 700_000 + 400_000, type: "session", mode: u ? "adventure" : "practice", scope: unit, total: 10, correct: 8, ms: 200_000 });
        }
      }
      if (grade !== "k") {
        // A times-table chart that is part way filled in: two quick right answers make a fact known.
        for (let a = 1; a <= 10; a++)
          for (let b = a; b <= 10; b++) {
            if ((a * b) % 3 === 0 && a + b > 12) continue;
            for (let k = 0; k < 2; k++) put({ id: `shot-f-${a}-${b}-${k}`, profileId: pid, t: now - 3_600_000 + a * 10_000 + b * 1000 + k, type: "answer", unit: "3/math/facts", correct: true, attempts: 1, revealed: false, ms: 2500, mode: "facts", difficulty: 2, fact: `mul:${a}:${b}` });
          }
      }
      await new Promise((res) => (tx.oncomplete = res));
      return n;
    },
    { grade },
  );
  await page.reload();
  await page.locator("main").first().waitFor();
  await page.waitForLoadState("networkidle");
}

async function newDevice(device, child) {
  const phone = device === "phone";
  const context = await browser.newContext({ viewport: phone ? PHONE : DESK, deviceScaleFactor: 2, isMobile: phone, hasTouch: phone, reducedMotion: "reduce", colorScheme: "light" });
  const page = await context.newPage();
  await page.goto(`${BASE}/play/`);
  await page.getByRole("button", { name: /Let's go/ }).click();
  const little = child === "little";
  await newChild(page, little ? "Pip" : "Maya", little ? "Kindergarten" : "Grade 3");
  await page.getByRole("button", { name: /Adventure|Let's Play/ }).first().waitFor();
  await seed(page, little ? "k" : "3");
  if (!phone) {
    await page.goto(`${BASE}/parents/`);
    await enterPin(page, true);
  }
  return { context, page };
}

/** The pictures of the app: a phone on a soft panel for the kids' app, a window for the parent area. */
async function compose(raw, device, file) {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  const img = `data:image/png;base64,${readFileSync(raw).toString("base64")}`;
  const phone = device === "phone";
  const body = phone
    ? `<div class="phone"><img src="${img}"></div>`
    : `<div class="win"><div class="bar"><i></i><i></i><i></i><span>gradelings.com</span></div><img src="${img}"></div>`;
  await page.setContent(`<style>
    html,body{margin:0}
    body{width:${W}px;height:${H}px;overflow:hidden;display:flex;justify-content:center;align-items:flex-start;background:linear-gradient(135deg,#dbeafe 0%,#fce7f3 55%,#ffedd5 100%);font-family:Fredoka,system-ui,sans-serif}
    .phone{margin-top:22px;width:210px;height:${H - 22}px;overflow:hidden;border-radius:30px 30px 0 0;border:7px solid #0f172a;border-bottom:0;background:#fff;box-shadow:0 10px 30px rgba(15,23,42,.28)}
    .phone img{width:100%;display:block}
    .win{margin-top:26px;width:440px;height:${H - 26}px;overflow:hidden;border-radius:12px 12px 0 0;border:1px solid #cbd5e1;border-bottom:0;background:#fff;box-shadow:0 10px 30px rgba(15,23,42,.25)}
    .bar{height:22px;background:#e2e8f0;display:flex;align-items:center;gap:5px;padding:0 9px}
    .bar i{width:7px;height:7px;border-radius:50%;background:#94a3b8;display:block}
    .bar span{margin-left:8px;font-size:9px;color:#475569;background:#fff;border-radius:6px;padding:2px 10px}
    .win img{width:100%;display:block}
  </style>${body}`);
  await page.waitForTimeout(150);
  await page.screenshot({ path: file, type: "jpeg", quality: 82 });
  await page.close();
}

const devices = new Map();
const todo = FEATURE_EMAILS.filter((e) => !ONLY || ONLY.has(e.id));
let failed = 0;
for (const e of todo) {
  const { app, hash, device, child, click, scrollTo } = e.shot;
  const key = `${device}:${child ?? "big"}`;
  try {
    if (!devices.has(key)) devices.set(key, await newDevice(device, child));
    const { page } = devices.get(key);
    await page.goto(`${BASE}/${app}/${hash}`);
    await page.locator("main").first().waitFor();
    // Full page loads lock the parent area again.
    if (app === "parents" && (await page.getByText("Parents only").count())) {
      await enterPin(page, false);
      await page.goto(`${BASE}/${app}/${hash}`);
      await page.locator("main").first().waitFor();
    }
    if (click) await page.getByText(new RegExp(click)).first().click();
    if (scrollTo) await page.getByText(new RegExp(scrollTo)).first().evaluate((el) => el.scrollIntoView({ block: "center" }));
    if (hash.includes("session")) {
      // A question on screen, the way a child sees it, with one already answered for a hint to show.
      await page.getByRole("button", { name: "Stop", exact: true }).waitFor({ timeout: 15_000 }).catch(() => {});
    }
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(900);
    // The subscribe banner above the report would crowd out the screen the email is about.
    if (app === "parents" && e.id !== "children") {
      await page.evaluate(() => {
        for (const h of document.querySelectorAll("h1,h2,h3,p")) if (/^Subscribe before the trial ends/.test(h.textContent ?? "")) (h.closest("section") ?? h.parentElement)?.remove();
      });
    }
    // `next dev` draws a small "N" badge; a production build has none.
    await page.addStyleTag({ content: "nextjs-portal{display:none!important}" }).catch(() => {});
    const raw = path.join(RAW, `${e.id}.png`);
    await page.screenshot({ path: raw });
    await compose(raw, device, path.join(OUT, `${e.id}-v1.jpg`));
    console.log(`  ${e.id}`);
  } catch (err) {
    failed++;
    console.log(`  ✗ ${e.id}: ${err.message.split("\n")[0]}`);
  }
}
for (const { context } of devices.values()) await context.close();
await browser.close();
writeFileSync(path.join(OUT, ".generated"), `${new Date().toISOString().slice(0, 10)}\n`);
process.exit(failed ? 1 : 0);
