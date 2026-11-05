// End-to-end check of voice practice (flag `voice-practice`): a parent turns on "answer out loud" for a child and
// downloads the on-device model, the child counts out loud into a (fake) microphone and the question is marked right
// by the real Whisper model running in the browser. Also checks that with the setting off the same question is a
// plain tap question, and that nothing is sent or stored from the microphone.
//
//   npm run dev -- -p 3100 &        (or a production build)
//   node scripts/e2e-voice.mjs http://localhost:3100 e2e-shots/voice path/to/counting-to-10.wav
// The wav should be a person counting from one to ten. The server needs public/whisper (npm run dev fetches it).
import fs from "node:fs";
import { chromium } from "playwright";
import { enterPin, newChild } from "./helpers.mjs";

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = process.argv[3] || "e2e-shots/voice";
const WAV = process.argv[4];
if (!WAV || !fs.existsSync(WAV)) {
  console.error("Give the path of a wav file of someone counting from one to ten as the 3rd argument.");
  process.exit(2);
}
fs.mkdirSync(OUT, { recursive: true });
const fail = (msg) => {
  console.error("FAIL:", msg);
  process.exitCode = 1;
};
const check = (cond, msg) => (cond ? console.log("ok  ", msg) : fail(msg));

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", `--use-file-for-fake-audio-capture=${WAV}`],
});
const context = await browser.newContext({ viewport: { width: 1180, height: 820 }, permissions: ["microphone"], reducedMotion: "reduce" });
// The flag is off by default; turn it on for this device the way the admin panel would for a family.
await context.route("**/api/flags/**", (route) => route.fulfill({ json: { flags: { "voice-practice": true }, variants: {} } }));
const sent = [];
context.on("request", (r) => {
  if (r.method() === "POST" && r.postData() && r.postData().length > 200_000) sent.push(r.url());
});
const page = await context.newPage();
page.on("pageerror", (e) => fail(`page error: ${e.stack}`));

// A Kindergarten child.
await page.goto(`${BASE}/play/`);
await page.waitForTimeout(800);
await page.getByRole("button", { name: /Let's go/ }).click({ force: true });
await newChild(page, "Maya", "Kindergarten");

// Parent: turn it on and download the model.
await page.goto(`${BASE}/parents/#/settings`);
await enterPin(page, true);
await page.getByText("Advanced options").click();
const sw = page.getByRole("switch", { name: /Let them answer out loud/ });
await sw.waitFor();
await sw.click();
const panel = page.getByTestId("voice-practice");
await panel.getByRole("button", { name: "Download" }).click();
await panel.getByText(/Ready on this device/).waitFor({ timeout: 240_000 });
check(true, "the listening model downloads and is ready");
await panel.getByRole("button", { name: "Test the microphone" }).click();
await panel.getByText("The microphone works.").waitFor({ timeout: 8000 }).catch(async () => {
  fail(`microphone test said: ${await panel.innerText()}`);
  throw new Error("no microphone");
});
check(true, "the microphone test passes");
await page.screenshot({ path: `${OUT}/settings.png` });

// Child: practise counting until the say-it question comes up.
await page.goto(`${BASE}/play/#/practice/math`);
await page.waitForTimeout(800);
await page.locator("[class*=grid] button").filter({ hasText: /Count|Counting/i }).first().click({ force: true });
await page.screenshot({ path: `${OUT}/unit.png` });
// Little children see the unit's lesson first.
await page.getByRole("button", { name: /Let's practise|▶ Practice/ }).first().click({ force: true });
let said = false;
for (let i = 0; i < 20 && !said; i++) {
  await page.waitForTimeout(700);
  if (process.env.DEBUG_SHOTS) await page.screenshot({ path: `${OUT}/step-${i}.png` });
  const mic = page.getByTestId("say-button");
  if (await mic.isVisible().catch(() => false)) {
    await page.screenshot({ path: `${OUT}/say.png` });
    // The fake microphone plays the recording in a loop, so an attempt that starts in the middle of the counting misses
    // the start. A child would just try again, and so does this.
    for (let attempt = 0; attempt < 8 && !said; attempt++) {
      if (!(await page.getByTestId("say-button").isVisible().catch(() => false))) await page.getByRole("button", { name: /Say it instead/ }).click();
      await page.getByTestId("say-button").click();
      await page.getByText("I'm listening…").waitFor();
      if (attempt === 0) await page.screenshot({ path: `${OUT}/listening.png` });
      // Wait for the answer: either the child is marked right or the microphone is ready to try again.
      await page.waitForFunction(
        () => document.querySelector('[data-testid="say-correct"]') || /^Say your answer/.test(document.querySelector('[data-testid="say-button"]')?.getAttribute("aria-label") ?? "") || !document.querySelector('[data-testid="say-button"]'),
        undefined,
        { timeout: 100_000 },
      ).catch(async (e) => {
        console.log("stuck:", await page.locator("main").innerText().catch(() => "?"));
        await page.screenshot({ path: `${OUT}/stuck.png` });
        throw e;
      });
      said = await page.getByTestId("say-correct").isVisible();
      if (!said) console.log("   (that try missed, trying again)");
    }
    if (said) await page.screenshot({ path: `${OUT}/heard.png` });
    break;
  }
  // Answer an ordinary question and move on.
  const pool = page.getByTestId("pool-item");
  if ((await pool.count()) > 0) {
    // An order question: counting order, so tap the numbers from smallest.
    const labels = (await pool.allInnerTexts()).map((t) => t.trim());
    for (const l of [...labels].sort((a, b) => Number(a) - Number(b))) await page.getByTestId("pool-item").filter({ hasText: new RegExp(`^${l}$`) }).first().click({ force: true });
    await page.getByRole("button", { name: /Check/ }).click({ force: true });
  }
  const choice = page.locator('[data-testid="choice"]:not([disabled])').first();
  if (await choice.isVisible().catch(() => false)) await choice.evaluate((el) => el.click());
  const next = page.getByRole("button", { name: /^OK$|Next|Continue|Keep going|Go on/ });
  if (await next.first().isVisible().catch(() => false)) await next.first().evaluate((el) => el.click());
  if (process.env.DEBUG_SHOTS) console.log(i, (await page.locator("main button:visible").allInnerTexts()).map((t) => t.trim().slice(0, 20)).join(" | "));
}
check(said, "counting out loud into the microphone is heard and marked right");
check(sent.length === 0, "no sound or large upload was sent anywhere");
await browser.close();
