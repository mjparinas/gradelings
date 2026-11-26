// Draws the app screenshots that emails show (src/lib/emailImages.ts, EMAIL_SHOTS) into public/email/shots/.
// It plays a demo child ("Maya", Grade 3) through the real app on a local server, seeds two weeks of made-up
// practice so the reports have something in them, takes the screens at phone and tablet sizes, then sets each on a
// coloured card with a device frame and "gradelings.com", as JPEGs at 2x. The JPEGs are committed; run this again
// only when the app's look changes (and bump the version in the file names in emailImages.ts):
//
//   npm run dev        (or a production build with npm start)
//   node scripts/email-screenshots.mjs http://localhost:3000 [raw-dir]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { createJiti } from "jiti";
import { enterPin, newChild, signInTeacher, step, teacherFixture, vis } from "./helpers.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const RAW = process.argv[3] || path.join(root, "e2e-shots", "email-raw");
fs.mkdirSync(RAW, { recursive: true });
const jiti = createJiti(`${root}/`, { alias: { "@": `${root}/src` } });
const { EMAIL_SHOTS } = await jiti.import("./src/lib/emailImages.ts");
const { WORDMARK_COLOURS } = await jiti.import("./src/lib/brand.ts");
const LOCK = JSON.parse(fs.readFileSync(path.join(root, "src/content/locks/ca-bc.json"), "utf8"));
const UNIT_KEYS = ["math", "language", "science", "social"].flatMap((s) => LOCK[`3/${s}`].units.slice(0, 5).map((u) => `3/${s}/${u.split(" ")[0]}`));

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const TABLET = { viewport: { width: 1024, height: 700 }, deviceScaleFactor: 2 };
const PHONE = { viewport: { width: 390, height: 780 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

/** Two weeks of made-up practice for the device's first child: most days, four subjects, mostly right. */
async function seed(page) {
  await page.evaluate(
    async ({ units }) => {
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
      const DAY = 86_400_000;
      const tx = db.transaction("events", "readwrite");
      const store = tx.objectStore("events");
      let n = 0;
      for (let d = 13; d >= 1; d--) {
        if (d % 5 === 3) continue;
        for (let k = 0; k < 2; k++) {
          const unit = units[(d * 3 + k * 7) % units.length];
          const base = Date.now() - d * DAY - k * 3_600_000;
          for (let i = 0; i < 10; i++) {
            const right = (i + d + k) % 5 !== 0;
            const event = { id: `shot-${n++}`, profileId: pid, t: base + i * 20_000, type: "answer", unit, correct: right, attempts: right ? 1 : 2, revealed: false, ms: 9000, mode: "practice", difficulty: 2 };
            store.put({ event, id: event.id, profileId: pid, synced: 1 });
          }
          const s = { id: `shot-s${n++}`, profileId: pid, t: base + 250_000, type: "session", mode: "practice", scope: unit, total: 10, correct: 8, ms: 200_000 };
          store.put({ event: s, id: s.id, profileId: pid, synced: 1 });
        }
      }
      // Times-table facts: about two thirds known and quick, for the facts chart.
      for (let a = 1; a <= 10; a++)
        for (let b = 1; b <= 10; b++) {
          if ((a * 7 + b * 3) % 3 === 0) continue;
          for (let k = 0; k < 2; k++) {
            const event = { id: `shot-f${a}-${b}-${k}`, profileId: pid, t: Date.now() - 2 * DAY + (a * 10 + b) * 5000 + k * 1000, type: "answer", unit: "3/math/facts", fact: `mul:${a}:${b}`, correct: true, attempts: 1, revealed: false, ms: 3000, mode: "facts", difficulty: 2 };
            store.put({ event, id: event.id, profileId: pid, synced: 1 });
          }
        }
      await new Promise((res) => (tx.oncomplete = res));
    },
    { units: UNIT_KEYS },
  );
  await page.reload();
  await page.locator("main").first().waitFor();
}

async function grab(page, name, { scrollTo } = {}) {
  // The dev server's "N" badge isn't part of the app; a production build has none.
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await page.getByText("Getting things ready").waitFor({ state: "hidden", timeout: 15000 }).catch(() => {});
  if (scrollTo) await page.getByRole("heading", { name: scrollTo }).first().evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 70)).catch(() => {});
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(RAW, `${name}.png`) });
  console.log(`  ${name}`);
}

/** Runs the app as a child on one device size, taking each screen. */
async function capture(kind, opts) {
  const context = await browser.newContext({ ...opts, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(`${BASE}/play/`);
  await page.getByRole("button", { name: /Let's go/ }).click();
  await newChild(page, "Maya", "Grade 3");
  const adventure = page.getByRole("button", { name: /Adventure/ });
  await adventure.waitFor();
  await adventure.click();
  await page.getByRole("button", { name: "Stop", exact: true }).waitFor();
  for (let i = 0; i < 5; i++) await step(page);
  await grab(page, `${kind}-question`);
  for (let i = 0; i < 80 && !(await vis(page.getByRole("button", { name: /Keep going|Play again/ }))); i++) await step(page);
  await seed(page);
  for (const [name, hash] of [["home", "/"], ["trophies", "/trophies"], ["stickers", "/stickers"], ["arcade", "/arcade"], ["facts", "/facts/mul"], ["stories", "/stories"]]) {
    await page.goto(`${BASE}/play/#${hash}`);
    await grab(page, `${kind}-${name}`);
  }
  await page.goto(`${BASE}/parents/`);
  await enterPin(page, true);
  for (const [name, hash] of [["parent", "/"], ["reports", "/reports"], ["settings", "/settings"]]) {
    await page.goto(`${BASE}/parents/#${hash}`);
    await grab(page, `${kind}-${name}`, { reports: { scrollTo: /'s report$/ }, parent: { scrollTo: /^Overview$/ }, settings: { scrollTo: /^Settings$/ } }[name]);
  }
  await context.close();
}

console.log("tablet");
await capture("tablet", TABLET);
console.log("phone");
await capture("phone", PHONE);

console.log("teacher");
{
  const fixture = await teacherFixture(BASE);
  const context = await browser.newContext({ ...TABLET, reducedMotion: "reduce" });
  await signInTeacher(context, BASE, fixture);
  const page = await context.newPage();
  await page.goto(`${BASE}/teachers/#/class/${fixture.classId}/homework`);
  await page.getByText("Room 3").first().waitFor({ timeout: 20000 }).catch(() => {});
  await grab(page, "tablet-teacher");
  await context.close();
}

// Compose: a tinted card, the tablet shot large and the phone shot overlapping, as in the store listings.
const W = 510;
const H = 280;
const b64 = (name) => `data:image/png;base64,${fs.readFileSync(path.join(RAW, `${name}.png`)).toString("base64")}`;
const have = (name) => fs.existsSync(path.join(RAW, `${name}.png`));
const frame = (src, w, h, style) =>
  `<div style="position:absolute;${style};width:${w}px;height:${h}px;border-radius:14px;background:#0f172a;padding:5px;box-sizing:border-box;box-shadow:0 10px 24px rgba(15,23,42,.28)"><img src="${src}" style="width:100%;height:100%;object-fit:cover;object-position:top;border-radius:10px;display:block"></div>`;

// shot name -> [tablet screen or null, phone screen or null, background colour index pair]
const PLAN = {
  adventure: ["tablet-home", "phone-question", [0, 1]],
  games: ["tablet-arcade", "phone-arcade", [4, 1]],
  rewards: ["tablet-trophies", "phone-stickers", [3, 1]],
  reports: ["tablet-reports", "phone-reports", [2, 0]],
  parent: ["tablet-parent", "phone-parent", [0, 2]],
  calm: ["tablet-settings", "phone-settings", [5, 2]],
  facts: ["tablet-facts", "phone-facts", [0, 4]],
  stories: ["tablet-stories", "phone-stories", [1, 3]],
  teacher: ["tablet-teacher", null, [2, 5]],
};
const page = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 })).newPage();
for (const [key, shot] of Object.entries(EMAIL_SHOTS)) {
  const [tab, ph, [c1, c2]] = PLAN[key];
  if (!have(tab) || (ph && !have(ph))) {
    console.log(`  skipped ${key}: missing a screen`);
    continue;
  }
  const html = `<body style="margin:0"><div style="position:relative;width:${W}px;height:${H}px;overflow:hidden;background:linear-gradient(135deg,${WORDMARK_COLOURS[c1]},${WORDMARK_COLOURS[c2]})">
${frame(b64(tab), ph ? 330 : 400, ph ? 230 : 280 - 30, `left:${ph ? 24 : 55}px;top:36px`)}
${ph ? frame(b64(ph), 112, 232, "left:350px;top:30px;border-radius:22px") : ""}
<div style="position:absolute;right:14px;bottom:8px;font:700 13px Fredoka,Arial,sans-serif;color:#0f172a;background:rgba(255,255,255,.9);border-radius:99px;padding:3px 10px">gradelings.com</div>
</div></body>`;
  await page.setContent(html);
  await page.waitForTimeout(200);
  const out = path.join(root, "public", shot.path);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await page.screenshot({ path: out, type: "jpeg", quality: 86 });
  console.log(`wrote public${shot.path}`);
}
await browser.close();
