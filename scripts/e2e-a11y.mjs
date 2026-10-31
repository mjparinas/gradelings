// Automated accessibility checks (axe-core, WCAG 2.2 A and AA rules) on the public pages, the
// kids' app and the parent area. This finds the problems a machine can find; it doesn't replace
// trying the app with a screen reader and a keyboard.
//
//   npm run build && npm start
//   npm i --no-save playwright && npx playwright install chromium
//   node scripts/e2e-a11y.mjs http://localhost:3000
import AxeBuilder from "@axe-core/playwright";
import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
import { DEFICIENCIES, contrastAs, shootAll, visibleColour } from "./colour-blind.mjs";
import { TEACHER_TABS, enterPin, newChild, seedLastWeek, signInTeacher, step, teacherFixture, vis } from "./helpers.mjs";

const BASE = process.argv[2] || "http://localhost:3000";
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const SHOTS = process.argv[3] && !process.argv[3].startsWith("--") ? process.argv[3] : "e2e-shots/a11y";
const failures = [];
let scanned = 0;

async function scan(page, name) {
  await page.waitForTimeout(500);
  const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  scanned++;
  if (!violations.length) return console.log(`  ✓ ${name}`);
  for (const v of violations) {
    const where = v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ");
    console.log(`  ✗ ${name}: ${v.id} (${v.impact}) ${v.help}\n      ${v.nodes.length} element(s), e.g. ${where}`);
    failures.push(`${name}: ${v.id}`);
  }
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPad (gen 7)"], reducedMotion: "reduce" });
const page = await ctx.newPage();

console.log("Public pages");
for (const path of ["/", "/pricing/", "/help/", "/about/", "/contact/", "/privacy/", "/terms/", "/accessibility/", "/trust/", "/curriculum/", "/curriculum/bc/", "/curriculum/bc/grade-3/math/", "/curriculum/bc/grade-4/math/fractions/", "/milestone/unit/bc/grade-4/math/fractions/2/", "/report-cards/bc/", "/guides/bc/", "/guides/bc/grade-4/", "/guides/bc/grade-4/math/", "/guides/bc/grade-4/math/worksheet/", "/guides/bc/kindergarten/language/worksheet/", "/guides/bc/core-competencies/", "/guides/bc/fsa/", "/compare/", "/compare/ixl/", "/account/reset/?token=x", "/account/verify/?token=x", "/account/unsubscribe/?token=x"]) {
  await page.goto(BASE + path);
  await scan(page, path);
}

console.log("Kids' app");
await page.goto(`${BASE}/play/`);
await scan(page, "/play/ first run");
await page.getByRole("button", { name: /Let's go/ }).click();
await scan(page, "new player");
await newChild(page, "Maya", "Grade 3");
await scan(page, "hub");
await page.getByRole("button", { name: /Adventure/ }).click();
await page.getByRole("button", { name: "Stop", exact: true }).waitFor();
await scan(page, "question");
for (let i = 0; i < 40 && !(await vis(page.locator("[role=status]").getByRole("button"))); i++) await step(page);
await scan(page, "feedback bar");
for (const route of ["trophies", "shop", "stickers", "room", "practice", "map", "arcade", "treasures", "stories", "stories/wiggly-tooth", "facts", "facts/mul"]) {
  await page.goto(`${BASE}/play/#/${route}`);
  await scan(page, `/play/#/${route}`);
}
// The weekly "you grew" recap, with practice last week: its home card and its screen.
await seedLastWeek(page);
await page.goto(`${BASE}/play/#/`);
await page.getByTestId("week-recap-card").waitFor();
await scan(page, "hub with the weekly recap card");
await page.goto(`${BASE}/play/#/grew`);
await page.getByRole("region", { name: "Days you practised" }).waitFor();
await scan(page, "/play/#/grew");
// A lesson left partway: its "Finish your lesson?" card, and picking it up again at the next question.
await page.goto(`${BASE}/play/#/session?mode=daily&scope=mix`);
await page.getByRole("button", { name: "Stop", exact: true }).waitFor();
for (let i = 0; i < 40 && !(await vis(page.getByRole("button", { name: /^Next →$/ }))); i++) await step(page);
await page.goto(`${BASE}/play/#/`);
await page.getByTestId("resume-lesson").waitFor();
await scan(page, "hub with the finish-your-lesson card");
await page.getByTestId("resume-lesson").getByRole("link").click();
await page.getByRole("progressbar", { name: "Questions answered" }).waitFor();
if ((await page.getByRole("progressbar", { name: "Questions answered" }).getAttribute("aria-valuenow")) !== "1") throw new Error("the lesson didn't pick up at its second question");

console.log("Teacher area");
const teacher = await teacherFixture(BASE);
await signInTeacher(ctx, BASE, teacher);
await page.goto(`${BASE}/teachers/`);
await page.getByRole("heading", { name: "Your classes" }).waitFor();
await scan(page, "/teachers/ class list");
for (const tab of TEACHER_TABS) {
  await page.goto(`${BASE}/teachers/#/class/${teacher.classId}${tab}`);
  await page.getByRole("heading", { level: 1, name: "Room 3" }).waitFor();
  await page.waitForTimeout(400);
  await scan(page, `/teachers/ class ${tab.slice(1) || "progress"}`);
}
// The account page and its delete dialog.
await page.goto(`${BASE}/teachers/#/account`);
await page.getByRole("heading", { level: 1, name: "Your account" }).waitFor();
await scan(page, "/teachers/ account");
await page.getByRole("button", { name: "Delete my account…" }).click();
await page.getByRole("dialog", { name: "Delete your account?" }).waitFor();
await scan(page, "/teachers/ delete account dialog");
await page.keyboard.press("Escape");
// The remove-student dialog.
await page.goto(`${BASE}/teachers/#/class/${teacher.classId}/students`);
await page.getByRole("button", { name: "Remove", exact: true }).first().click();
await scan(page, "/teachers/ remove student dialog");
await page.keyboard.press("Escape");

// Colour-blind check. Things that mean different things must not depend on colour alone, and
// where two states sit side by side they must still differ in lightness when seen with each
// kind of colour blindness. Screenshots of every simulation go to SHOTS for a human to look at.
console.log("Colour-blind (kids' app)");
mkdirSync(SHOTS, { recursive: true });
const cdp = await ctx.newCDPSession(page);
const check = (ok, what) => {
  console.log(`  ${ok ? "✓" : "✗"} ${what}`);
  if (!ok) failures.push(`colour-blind: ${what}`);
};
const SEEN = ["hub", "practice", "trophies", "shop"];
await page.goto(`${BASE}/play/#/`);
await page.waitForTimeout(500);
await shootAll(page, cdp, SHOTS, "hub");
for (const route of SEEN.slice(1)) {
  await page.goto(`${BASE}/play/#/${route}`);
  await page.waitForTimeout(600);
  await shootAll(page, cdp, SHOTS, route);
  if (route === "trophies") {
    // The four medals in the header: each must carry its tier name, since the colours alone
    // (bronze, silver, gold, platinum) can't be told apart with some kinds of colour blindness.
    const medals = page.locator("span", { hasText: /^🏆$/ }).locator("xpath=..").filter({ has: page.locator("span", { hasText: /^[0-9]+$/ }) });
    const names = (await medals.allInnerTexts()).map((t) => t.replace(/[^A-Za-z]/g, ""));
    check([...names].sort().join() === "Bronze,Gold,Platinum,Silver", `trophy medals are named, not just coloured (${names.join(", ") || "none found"})`);
  }
  if (route === "shop") {
    for (const tab of ["Buddies", "Celebrations", "Titles"]) {
      await page.getByRole("tab", { name: new RegExp(tab) }).click();
      const grid = page.locator("[class*=grid] button.btn");
      const n = await grid.count();
      const cards = grid.filter({ hasText: /Using|Owned|🪙/ });
      check(n > 0 && (await cards.count()) === n, `every shop item says in words whether it is owned, in use or its price (${tab})`);
    }
  }
}
await page.goto(`${BASE}/play/#/`);
await page.getByRole("button", { name: /Adventure/ }).click();
await page.getByRole("button", { name: "Stop", exact: true }).waitFor();
const choices = page.locator('[data-testid="choice"]');
const bar = page.locator("[role=status]");
let sawChoice = false;
let done = false;
let sawRetry = false;
// Which choice is right, read from the question the ChoiceQuestion component was given (its React
// props on the first choice button's fiber), so the test can miss once and then answer right on
// purpose. Guessing blind only gets "a miss, then right" on about 1 question in 4, so on a slow
// runner the old loop sometimes ran out of time (October 2026). -1 when it can't tell.
const answerIndex = () =>
  page.evaluate(() => {
    const first = document.querySelector('[data-testid="choice"]');
    const key = first && Object.keys(first).find((k) => k.startsWith("__reactFiber$"));
    for (let f = key ? first[key] : null; f; f = f.return) {
      const q = f.memoizedProps?.q;
      if (q && Array.isArray(q.choices) && q.answer) return q.choices.findIndex((c) => c.id === q.answer);
    }
    return -1;
  });
// Wait for the feedback bar rather than a fixed pause: on a slow runner it can take longer than 450 ms.
const feedback = async () => {
  await page.waitForFunction(() => /🤔|✓/.test(document.querySelector("[role=status]")?.textContent ?? ""), null, { timeout: 4000 }).catch(() => {});
  await page.waitForTimeout(450); // and let the bar finish sliding in, so its buttons are on screen
  return bar.innerText().catch(() => "");
};
// Play one multiple-choice question through a miss and then the right answer, so both feedback
// states and both button looks exist.
const deadline = Date.now() + 120_000;
while (Date.now() < deadline && !done) {
  // The adaptive mode pauses every 10 questions; `step` leaves that to the caller.
  const keepGoing = page.getByRole("button", { name: /Keep going/ });
  if (await vis(keepGoing)) {
    await keepGoing.click({ force: true });
    continue;
  }
  const n = await choices.count();
  const open = n >= 2 && (await choices.locator(":scope:not([disabled])").count()) === n;
  const right = open ? await answerIndex() : -1;
  if (right < 0) {
    // Not a fresh multiple-choice question: answer whatever is there and look again.
    await step(page);
    await page.waitForTimeout(100);
    continue;
  }
  sawChoice = true;
  const wrong = choices.nth(right === 0 ? 1 : 0);
  await wrong.click({ force: true });
  const missText = await feedback();
  if (!missText.includes("🤔")) {
    await step(page); // something else answered; move on
    continue;
  }
  // A miss: "try again" must be an icon and words, not just orange.
  check(/\w{3,}/.test(missText.replace("OK", "")), "'try again' bar has an icon and words, not just orange");
  await shootAll(page, cdp, SHOTS, "feedback-retry");
  sawRetry = true;
  await bar.getByRole("button", { name: "OK", exact: true }).click({ force: true });
  // Wait for the retry bar to unmount and the remaining choices to unlock before
  // answering again. Playwright's click can resolve before React commits.
  await bar.waitFor({ state: "detached" });
  const pick = choices.nth(right);
  await pick.waitFor({ state: "visible" });
  await pick.click({ force: true });
  await feedback();
  const missed = page.locator('[data-testid="choice"].animate-shake');
  await shootAll(page, cdp, SHOTS, "feedback-correct");
  check(/✓/.test(await pick.innerText()), "the right answer has a tick as well as turning green");
  const [good, bad] = await Promise.all([pick.evaluate(visibleColour), missed.first().evaluate(visibleColour)]);
  for (const type of DEFICIENCIES) {
    const ratio = contrastAs(good, bad, type);
    check(ratio >= 1.3, `right and missed answers differ in lightness as seen with ${type} (${ratio.toFixed(2)}:1)`);
  }
  done = true;
}
check(sawChoice && sawRetry && done, `played a multiple-choice question through a miss and a right answer (saw a choice: ${sawChoice}, a miss: ${sawRetry}, then the right answer: ${done})`);
await cdp.send("Emulation.setEmulatedVisionDeficiency", { type: "none" });

console.log("Parent area");
await page.goto(`${BASE}/parents/`);
await scan(page, "PIN gate");
await enterPin(page, true);
for (const route of ["", "reports", "placement", "report-cards", "children", "settings", "account", "subscription"]) {
  await page.goto(`${BASE}/parents/#/${route}`);
  await scan(page, `/parents/#/${route}`);
}

await browser.close();
console.log(failures.length ? `\n${failures.length} accessibility problem(s) in ${scanned} screens.` : `\nNo automated accessibility problems in ${scanned} screens.`);
process.exit(failures.length ? 1 : 0);
