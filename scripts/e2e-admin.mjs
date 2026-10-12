// End-to-end check of the admin panel: the admin signs in, sees the overview, switches the Shop off
// (and the kids' app hides it), makes a code, saves an A/B test, finds a family and gives it access,
// and every tab passes the axe-core accessibility scan. A non-admin account is turned away.
//
//   ADMIN_EMAILS=admin-e2e@example.com npm start      # in one terminal, after npm run build
//   node scripts/e2e-admin.mjs http://localhost:3000 e2e-shots/admin
// It marks the accounts' emails as confirmed straight in the local database file (DATABASE_URL, or
// ./data/grademap.db), because no email is sent in tests.
import fs from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { createClient } from "@libsql/client";
import { chromium } from "playwright";
import { newChild, vis } from "./helpers.mjs";

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = process.argv[3] || "e2e-shots/admin";
const ADMIN = process.env.E2E_ADMIN_EMAIL || "admin-e2e@example.com";
const PASSWORD = "correct horse battery";
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
fs.mkdirSync(OUT, { recursive: true });
const errors = [];
const fail = (msg) => {
  console.error("FAIL:", msg);
  process.exitCode = 1;
};
const check = (cond, msg) => {
  if (!cond) fail(msg);
  else console.log("ok  ", msg);
};

// Opened after the first sign-up, which is when the server creates the database file.
let db;
async function account(email) {
  const res = await fetch(`${BASE}/api/auth/signup/`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password: PASSWORD }) });
  check(res.status === 200 || res.status === 409, `account ${email} exists`);
  db ??= createClient({ url: process.env.DATABASE_URL ?? "file:./data/grademap.db", authToken: process.env.DATABASE_AUTH_TOKEN });
  await db.execute({ sql: "UPDATE parents SET email_verified_at = ? WHERE email = ?", args: [Date.now(), email] });
}
const parentEmail = `parent-${Date.now()}@example.com`;
await account(ADMIN);
await account(parentEmail);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
const page = await context.newPage();
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() !== "error") return;
  const t = m.text();
  // The panel asks "am I an admin?" before signing in, which answers 404 on purpose.
  if (/Failed to load resource|40[14]/.test(t)) return;
  errors.push(`console: ${t}`);
});
const shot = (name) => page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
async function scan(name) {
  await page.waitForTimeout(300);
  const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  for (const v of violations) fail(`${name}: ${v.id} (${v.impact}) ${v.help}, e.g. ${v.nodes[0]?.target.join(" ")}`);
  if (!violations.length) console.log(`ok   ${name} has no automated accessibility problems`);
}
const tab = async (name) => {
  await page.getByRole("navigation", { name: "Admin sections" }).getByRole("button", { name, exact: true }).click();
  await page.waitForTimeout(400);
};
async function signIn(email) {
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
}

// A parent is not an admin.
await page.goto(`${BASE}/admin/`);
await page.getByRole("heading", { name: "Admin sign in" }).waitFor();
await scan("admin sign-in");
await signIn(parentEmail);
check(await page.getByRole("heading", { name: "Not an admin account" }).waitFor({ timeout: 8000 }).then(() => true, () => false), "a parent account is turned away");
await page.getByRole("button", { name: "Sign out" }).click();

// The admin gets in.
await page.getByRole("heading", { name: "Admin sign in" }).waitFor();
await signIn(ADMIN);
check(await page.getByText("Families", { exact: true }).waitFor({ timeout: 8000 }).then(() => true, () => false), "the admin sees the overview");
await shot("overview");
await scan("overview");

// Switch the Shop off, and the kids' app hides it. The switch shows the saved state, so it changes
// once the server has answered.
await tab("Flags");
const shop = page.getByRole("listitem").filter({ hasText: "The pretend coin shop." }).getByRole("switch");
async function setShop(on) {
  if ((await shop.isChecked()) !== on) await shop.click();
  for (let i = 0; i < 40 && (await shop.isChecked()) !== on; i++) await page.waitForTimeout(150);
  return (await shop.isChecked()) === on;
}
check(await setShop(false), "the Shop flag is off");
await shot("flags");
await scan("flags");

const kid = await (await browser.newContext({ viewport: { width: 1180, height: 820 }, hasTouch: true, reducedMotion: "reduce" })).newPage();
await kid.goto(`${BASE}/play/`);
await kid.getByRole("button", { name: /Let.s go/ }).click({ force: true });
await newChild(kid, "Sam", "Grade 3");
await kid.getByRole("button", { name: /Adventure/ }).waitFor();
await kid.waitForTimeout(1000);
check(!(await vis(kid.getByRole("button", { name: /Shop.*to spend/ }))), "the kids' app hides the Shop while the flag is off");
check(await vis(kid.getByRole("button", { name: /Trophies/ })), "other tiles still show");

check(await setShop(true), "the Shop flag is on again");
await kid.reload();
await kid.getByRole("button", { name: /Adventure/ }).waitFor();
await kid.waitForTimeout(1000);
check(await vis(kid.getByRole("button", { name: /Shop.*to spend/ })), "the Shop comes back when the flag is on again");

// Make a code.
await tab("Codes");
await page.getByLabel("Use limit (optional)").fill("10");
await page.getByLabel("Note (who it's for, optional)").fill("e2e");
await page.getByRole("button", { name: "Make code" }).click();
check(await page.getByText(/New code:/).waitFor({ timeout: 8000 }).then(() => true, () => false), "the admin makes an access code");
await shot("codes");
await scan("codes");

// Save an A/B test and start it.
await tab("A/B tests");
const key = `e2e-${Date.now()}`;
await page.getByLabel(/^Key/).fill(key);
await page.getByRole("button", { name: "Save draft" }).click();
await page.getByRole("heading", { name: key }).waitFor();
await page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: key }) }).getByRole("button", { name: "Start" }).click();
check(await page.getByText(/Running since/).first().waitFor({ timeout: 8000 }).then(() => true, () => false), "the admin starts an A/B test");
await shot("experiments");
await scan("experiments");

// Find the parent and give lifetime access.
await tab("Users");
await page.getByLabel("Search by email or family id").fill(parentEmail);
await page.getByRole("button", { name: "Search", exact: true }).click();
await page.getByRole("button", { name: parentEmail }).click();
await page.getByRole("button", { name: "Give lifetime access" }).click();
check(await page.getByText("Lifetime access given.").waitFor({ timeout: 8000 }).then(() => true, () => false), "the admin gives a family lifetime access");
check(await vis(page.getByText("Lifetime", { exact: true })), "the family shows lifetime access");
await shot("user");
await scan("user");

for (const name of ["Reports", "Log"]) {
  await tab(name);
  await scan(name.toLowerCase());
}
check(await vis(page.getByText("user.grant-access")), "the change log records the change");

await browser.close();
if (errors.length) fail(`console errors:\n${errors.join("\n")}`);
console.log(process.exitCode ? "admin e2e FAILED" : "admin e2e passed");
