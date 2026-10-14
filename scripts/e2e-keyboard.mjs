// Keyboard-only run-through (WCAG 2.1.1, 2.4.1, 2.4.3, 2.4.7, 2.4.11) plus a Windows high-contrast
// (forced colours) check. Every screen is walked with Tab: each stop must show a focus ring and
// must not sit under a sticky header or the feedback bar. The flows are then driven with keys
// only: the skip link, a whole practice session (number keys, the keypad, Enter), the parent PIN
// and the parent tabs.
//
//   npm run build && npm start
//   node scripts/e2e-keyboard.mjs http://localhost:3000 [shots-dir]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] || "http://localhost:3000";
const SHOTS = process.argv[3] && !process.argv[3].startsWith("--") ? process.argv[3] : "e2e-shots/keyboard";
mkdirSync(SHOTS, { recursive: true });
const failures = [];
const check = (ok, what) => {
  console.log(`  ${ok ? "✓" : "✗"} ${what}`);
  if (!ok) failures.push(what);
};

/** What has focus: a short name, whether a focus ring shows, and whether something covers it. */
function focusInfo() {
  const el = document.activeElement;
  if (!el || el === document.body) return null;
  if (el.tagName === "NEXTJS-PORTAL") return { dev: true }; // the dev-mode overlay button
  const s = getComputedStyle(el);
  const name = (el.getAttribute("aria-label") || el.textContent || el.getAttribute("name") || el.tagName).trim().replace(/\s+/g, " ").slice(0, 40);
  const ring = (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== "none";
  const r = el.getBoundingClientRect();
  let covered = false;
  if (r.width && r.height) {
    // Sample a few points: covered means none of them reach the element (WCAG 2.4.11: not entirely hidden).
    const pts = [
      [r.left + r.width / 2, r.top + r.height / 2],
      [r.left + 4, r.top + 4],
      [r.right - 4, r.bottom - 4],
    ].filter(([x, y]) => x >= 0 && y >= 0 && x < innerWidth && y < innerHeight);
    covered = pts.length === 0 || pts.every(([x, y]) => {
      const hit = document.elementFromPoint(x, y);
      return hit && !el.contains(hit) && !hit.contains(el);
    });
  }
  return { name: `${el.tagName.toLowerCase()} "${name}"`, ring, covered, main: el.id === "main" };
}

/** Tab through the whole screen once and check every stop. Returns the names in order. */
async function walk(page, label, max = 120) {
  await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur());
  const seen = [];
  const bad = [];
  let first = null;
  for (let i = 0; i < max; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(40);
    const f = await page.evaluate(focusInfo);
    if (!f || f.dev) continue;
    if (first && f.name === first && i > 2) break; // wrapped round
    first ??= f.name;
    seen.push(f.name);
    if (!f.ring) bad.push(`no focus ring on ${f.name}`);
    if (f.covered) bad.push(`${f.name} is hidden under something when focused`);
  }
  check(seen.length > 0, `${label}: Tab reaches ${seen.length} controls`);
  for (const b of [...new Set(bad)]) check(false, `${label}: ${b}`);
  return seen;
}

/** Press Tab until the focused control's name matches, then return true. */
async function tabTo(page, re, max = 80) {
  for (let i = 0; i < max; i++) {
    await page.keyboard.press("Tab");
    const name = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return "";
      return (el.getAttribute("aria-label") || el.labels?.[0]?.textContent || el.textContent || "").trim();
    });
    if (re.test(name)) return true;
  }
  const at = await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 120));
  console.log(`    (looking for ${re}; focus ended on ${at})`);
  return false;
}

/** Press Tab until focus is on an element matching the CSS selector. */
async function tabToSelector(page, selector, nth = 0, max = 80) {
  for (let i = 0; i < max; i++) {
    await page.keyboard.press("Tab");
    const at = await page.evaluate((sel) => {
      const el = document.activeElement;
      return el?.matches(sel) ? [...document.querySelectorAll(sel)].indexOf(el) : -1;
    }, selector);
    if (at >= 0 && at === nth % (await page.locator(selector).count())) return true;
  }
  return false;
}

/** Answer `target` questions with the keyboard alone. Returns false if a question type got stuck. */
async function playByKeys(page, target, label, until = async () => false) {
  const kinds = new Set();
  let answered = 0;
  let misses = 0;
  let summary = false;
  let sortTry = 0; // a wrong basket sends the item back, so the next try goes to the next basket
  const deadline = Date.now() + 150_000;
  while (answered < target && Date.now() < deadline && misses < 8) {
    if (await until()) return true;
    const state = await page.evaluate(() => {
      // The feedback bar's own button is its last one (the first is the small report flag).
      const bar = [...document.querySelectorAll("[role=status] button")].at(-1);
      if (bar) return { kind: "bar", text: bar.textContent.trim(), focused: document.activeElement === bar };
      const buttons = [...document.querySelectorAll("button")];
      if (buttons.some((b) => /Keep going/.test(b.textContent))) return { kind: "checkpoint" };
      if (buttons.some((b) => /Play again/.test(b.textContent))) return { kind: "summary" };
      const choices = [...document.querySelectorAll('[data-testid="choice"]')];
      if (choices.length) return { kind: "choice", open: choices.map((c) => !c.disabled) };
      if (document.querySelector('[aria-label="Delete"]')) return { kind: "keypad" };
      if (document.querySelector('[data-testid="pool-item"]')) return { kind: "order" };
      if (document.querySelector('[data-testid="bin"]')) return { kind: "sort" };
      if (buttons.some((b) => /^\+ Ten$/.test(b.textContent.trim()))) return { kind: "build" };
      if (buttons.some((b) => /nickel|dime|quarter|loonie|toonie|bill/i.test(b.textContent) && !b.getAttribute("aria-label"))) return { kind: "coins" };
      return { kind: "wait" };
    });
    let ok = true;
    if (state.kind === "summary") {
      summary = true;
      break;
    }
    if (state.kind === "bar") {
      if (state.text === "OK") {
        ok = await tabTo(page, /^OK$/, 40); // the "try again" bar: reach OK with Tab
      } else {
        if (!state.focused) check(false, `${label}: "${state.text}" has focus when the feedback bar opens`);
        answered++;
      }
      await page.keyboard.press("Enter");
    } else if (state.kind === "checkpoint") {
      ok = await tabTo(page, /Keep going/);
      await page.keyboard.press("Enter");
    } else if (state.kind === "choice") {
      await page.keyboard.press(String(state.open.findIndex(Boolean) + 1));
    } else if (state.kind === "keypad") {
      await page.keyboard.type("12");
      // Enter presses Check unless focus is on another control, where it presses that control (a keypad key, 🔊). After
      // the Tab walk over the first question, focus can be left on one, so go to Check first; otherwise Enter checks.
      const onControl = await page.evaluate(() => !!document.activeElement?.closest("button, a, input, select, textarea"));
      if (onControl) ok = await tabTo(page, /Check/);
      await page.keyboard.press("Enter");
    } else if (state.kind === "order") {
      while (ok && (await page.locator('[data-testid="pool-item"]').count())) {
        ok = await tabToSelector(page, '[data-testid="pool-item"]');
        await page.keyboard.press("Enter");
      }
      ok = ok && (await tabTo(page, /Check/));
      await page.keyboard.press("Enter");
    } else if (state.kind === "sort") {
      ok = await tabToSelector(page, '[data-testid="bin"]', sortTry++);
      await page.keyboard.press("Enter");
    } else if (state.kind === "build") {
      ok = await tabTo(page, /^\+ Ten$/);
      await page.keyboard.press("Enter");
      ok = ok && (await tabTo(page, /Check/));
      await page.keyboard.press("Enter");
    } else if (state.kind === "coins") {
      ok = await tabTo(page, /^(?!Take out).*(nickel|dime|quarter|loonie|toonie|bill)/i);
      await page.keyboard.press("Enter");
      ok = ok && (await tabTo(page, /Check/));
      await page.keyboard.press("Enter");
    } else {
      await page.waitForTimeout(150);
    }
    if (state.kind !== "bar" && state.kind !== "wait") kinds.add(state.kind);
    if (!ok) {
      misses++;
      check(false, `${label}: couldn't reach a control by Tab on a ${state.kind} question`);
    }
    await page.waitForTimeout(250);
  }
  const why = answered >= target ? "" : misses >= 8 ? ", stuck" : Date.now() >= deadline ? ", ran out of time" : ", reached the summary";
  console.log(`  ${label}: ${answered} answered by keyboard (${[...kinds].join(", ") || "none"}${why})`);
  return answered >= target || (summary && answered > 0);
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 }, reducedMotion: "reduce" });
const page = await ctx.newPage();
page.on("pageerror", (e) => failures.push(`page error: ${e.message}`));
// Wait for the page to finish loading its scripts, so key handlers are attached before the first key.
const goto = page.goto.bind(page);
page.goto = (url) => goto(url, { waitUntil: "networkidle" });

console.log("Skip link");
for (const path of ["/", "/pricing/", "/curriculum/bc/grade-3/math/"]) {
  await page.goto(BASE + path);
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
  check(first === "Skip to main content", `${path}: the first Tab stop is "Skip to main content" (got "${first}")`);
  await page.waitForTimeout(100); // let the link slide into place
  const shown = await page.evaluate(() => document.activeElement.getBoundingClientRect().top >= 0);
  check(shown, `${path}: the skip link is on screen when focused`);
  await page.keyboard.press("Enter");
  const inMain = await page.evaluate(() => document.activeElement?.id === "main");
  check(inMain, `${path}: Enter moves focus to the main content`);
  await page.keyboard.press("Tab");
  const next = await page.evaluate(() => !!document.activeElement?.closest("main"));
  check(next, `${path}: the next Tab after skipping lands inside the main content`);
  check(new URL(page.url()).hash === "", `${path}: skipping leaves the address alone`);
}

console.log("Sale banner across nav-bar links");
{
  // The skip link is the top of every page for Next.js's scroll-on-navigation check; when it sat above the
  // viewport, each nav-bar link scrolled the page down to the header, hiding the sale banner.
  const sale = await ctx.newPage();
  const promo = { id: "e2e", emoji: "🌱", headline: "Test sale", body: "", code: "FOUNDER", link: "/pricing/", linkLabel: "See pricing", endsAt: Date.now() + 86_400_000 };
  await sale.route("**/api/promo/", (r) => r.fulfill({ json: { promo } }));
  await sale.goto(BASE + "/", { waitUntil: "networkidle" });
  await sale.waitForSelector('aside[aria-label="Sale"]');
  for (const name of ["Curriculum", "Report cards", "Teachers"]) {
    const link = sale.getByRole("navigation", { name: "Main" }).getByRole("link", { name, exact: true });
    const href = await link.getAttribute("href");
    await link.click();
    await sale.waitForURL((u) => u.pathname === href);
    await sale.waitForLoadState("networkidle");
    await sale.waitForTimeout(300);
    const { y, top } = await sale.evaluate(() => ({ y: scrollY, top: document.querySelector('aside[aria-label="Sale"]')?.getBoundingClientRect().top }));
    check(y === 0 && top === 0, `${name}: the sale banner is still at the top after a nav-bar link (scrollY ${y}, banner top ${top})`);
  }
  // A link from further down the page still starts the next page at the top.
  await sale.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const footerLink = sale.locator("footer a[href^='/']").first();
  const footerHref = await footerLink.getAttribute("href");
  await footerLink.click();
  await sale.waitForURL((u) => u.pathname === footerHref);
  await sale.waitForLoadState("networkidle");
  await sale.waitForTimeout(300);
  check((await sale.evaluate(() => scrollY)) === 0, "a footer link opens the next page at the top");
  await sale.close();
}

console.log("Public pages");
for (const path of ["/", "/pricing/", "/guides/bc/grade-4/", "/report-cards/bc/"]) {
  await page.goto(BASE + path);
  await walk(page, path, 80);
}

console.log("Kids' app, keys only");
await page.goto(`${BASE}/play/`);
await page.waitForTimeout(500);
await walk(page, "/play/ first run");
check(await tabTo(page, /Let's go/), "Tab reaches \"Let's go\"");
await page.keyboard.press("Enter");
await page.waitForTimeout(400);
await walk(page, "new player");
check(await tabTo(page, /^Name/), "Tab reaches the name field");
await page.keyboard.type("Kai");
check(await tabTo(page, /^Grade 3$/), "Tab reaches the Grade 3 button");
await page.keyboard.press("Enter");
check(await tabTo(page, /Start!/), "Tab reaches Start!");
await page.keyboard.press("Enter");
await page.waitForTimeout(600);
await walk(page, "email reports for grown-ups");
check(await tabTo(page, /Not now, let's play/), "Tab reaches \"Not now, let's play\"");
await page.keyboard.press("Enter");
await page.waitForTimeout(800);
await walk(page, "hub");
await page.goto(`${BASE}/play/#/practice`);
await page.waitForTimeout(500);
await walk(page, "practice picker");

// A session by keyboard: Adventure from the hub, every question type it serves.
await page.goto(`${BASE}/play/#/`);
await page.waitForTimeout(500);
check(await tabTo(page, /Adventure/), "Tab reaches Adventure");
await page.keyboard.press("Enter");
await page.getByRole("button", { name: "Stop", exact: true }).waitFor();
await walk(page, "question", 40);
await page.screenshot({ path: `${SHOTS}/question.png` });

check(await playByKeys(page, 10, "Adventure"), "finished the Adventure questions with keys only");

// A practice unit with coins, so the tap-to-add questions get a keyboard run too.
await page.goto(`${BASE}/play/#/practice/math`);
await page.waitForTimeout(600);
await walk(page, "math units");
check(await tabTo(page, /Money|Coins/), "Tab reaches a money unit");
await page.keyboard.press("Enter");
await page.waitForTimeout(400);
check(await tabTo(page, /▶ Practice/), "Tab reaches ▶ Practice in the unit dialog");
await page.keyboard.press("Enter");
await page.getByRole("button", { name: "Stop", exact: true }).waitFor();
check(await playByKeys(page, 6, "money practice"), "finished money practice with keys only");

console.log("Parent area, keys only");
await page.goto(`${BASE}/parents/`);
await page.waitForTimeout(500);
await walk(page, "PIN gate", 30);
for (let round = 0; round < 2; round++) {
  // Digits can be typed anywhere on the PIN screen; then Tab to OK.
  await page.keyboard.type("2468");
  check(await tabTo(page, /^OK$/, 30), "Tab reaches OK on the PIN keypad");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(400);
}
const inside = await page.getByRole("button", { name: /Kids' area/ }).or(page.getByRole("link", { name: /Kids' area/ })).count();
check(inside > 0, "the PIN can be set and entered from the keyboard");
await page.keyboard.press("Tab");
check((await page.evaluate(() => document.activeElement?.textContent?.trim())) === "Skip to main content", "parent area: the first Tab stop is the skip link");
for (const tab of ["Reports", "Children", "Settings", "Account", "Subscription", "Overview"]) {
  await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur());
  const ok = await tabTo(page, new RegExp(`^\\S*\\s*${tab === "Subscription" ? "(Subscription|Subscribe)" : tab}$`, "u"));
  check(ok, `Tab reaches the ${tab} tab`);
  if (!ok) continue;
  await page.keyboard.press("Enter");
  await page.waitForTimeout(500);
  await walk(page, `parents: ${tab}`, 150);
}

console.log("Windows high contrast (forced colours)");
await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
await page.goto(`${BASE}/parents/#/settings`);
await page.waitForTimeout(600);
await page.screenshot({ path: `${SHOTS}/forced-parents-settings.png`, fullPage: false });
const sw = await page.evaluate(() => {
  const on = document.querySelector('[role="switch"][aria-checked="true"] .switch-knob');
  const off = document.querySelector('[role="switch"][aria-checked="false"] .switch-knob');
  const track = document.querySelector(".switch-track");
  return {
    knob: off ? getComputedStyle(off).backgroundColor : null,
    onKnob: on ? getComputedStyle(on).backgroundColor : null,
    track: track ? parseFloat(getComputedStyle(track).borderTopWidth) : 0,
  };
});
const slider = await page.evaluate(() => {
  const f = document.querySelector('[role="slider"] .progress-fill');
  return f ? getComputedStyle(f).backgroundColor : null;
});
check(!!slider && slider !== "rgba(0, 0, 0, 0)", `a slider keeps its filled part in high contrast (${slider})`);
check(sw.track > 0, "switches keep an outline in high contrast");
check(!!sw.knob && sw.knob !== "rgba(0, 0, 0, 0)", `a switch's knob stays visible in high contrast (${sw.knob})`);
if (sw.onKnob) check(sw.onKnob !== sw.knob, "an on switch looks different from an off one in high contrast");

await page.goto(`${BASE}/play/#/`);
await page.waitForTimeout(500);
await page.getByRole("button", { name: /Adventure/ }).click();
await page.getByRole("button", { name: "Stop", exact: true }).waitFor();
await page.screenshot({ path: `${SHOTS}/forced-question.png` });
const fill = await page.evaluate(() => {
  const f = document.querySelector(".progress-fill");
  const t = document.querySelector(".progress-track");
  return { fill: f ? getComputedStyle(f).backgroundColor : null, track: t ? parseFloat(getComputedStyle(t).borderTopWidth) : 0 };
});
check(!!fill.fill && fill.fill !== "rgba(0, 0, 0, 0)", `progress bars keep their fill in high contrast (${fill.fill})`);
check(fill.track > 0, "progress bars keep an outline in high contrast");
// Play on until a multiple-choice answer is marked right (first try or revealed), then check it
// is marked by more than colour.
await playByKeys(page, 30, "high contrast", async () => (await page.locator('[data-state="right"]').count()) > 0);
const right = page.locator('[data-state="right"]');
if (await right.count()) {
  await page.screenshot({ path: `${SHOTS}/forced-right-answer.png` });
  const w = await right.first().evaluate((el) => parseFloat(getComputedStyle(el).borderTopWidth));
  check(w >= 6, `the right answer gets a thick edge in high contrast (${w}px)`);
} else {
  check(false, "reached a multiple-choice answer to check in high contrast");
}

await browser.close();
console.log(failures.length ? `\n${failures.length} keyboard or high-contrast problem(s).` : "\nNo keyboard or high-contrast problems found.");
process.exit(failures.length ? 1 : 0);
