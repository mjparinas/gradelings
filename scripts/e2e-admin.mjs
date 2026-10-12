// End-to-end check of the admin panel: the admin signs in, sees the overview and its charts, saves the
// monthly costs, opens the list behind a tile (and a family from it), switches the Shop off
// (and the kids' app hides it), makes a code, saves an A/B test, finds a family and gives it access,
// works the to-do list, writes an email to a family (no email is really sent: the server has no email keys),
// opens the Emails, Inbox and System tabs, and every tab passes the axe-core accessibility scan. A non-admin account
// is turned away.
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
// Signed up 5 days ago and never practised, so the parent is on the admin's to-do list.
await db.execute({ sql: "UPDATE families SET created_at = ? WHERE id = (SELECT family_id FROM parents WHERE email = ?)", args: [Date.now() - 5 * 86_400_000, parentEmail] });

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
  // "To do" carries a count after its name.
  await page.getByRole("navigation", { name: "Admin sections" }).getByRole("button", name === "To do" ? { name: /^To do/ } : { name, exact: true }).click();
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
check(await vis(page.getByRole("img", { name: "Revenue by month" })), "the overview charts revenue by month");
check(await vis(page.getByRole("img", { name: "Sign-ups per week" })), "the overview charts sign-ups");
await page.getByLabel("Monthly running costs (CAD)").fill("120");
await page.getByRole("button", { name: "Save costs" }).click();
check(await page.getByText("Monthly costs saved.").waitFor({ timeout: 8000 }).then(() => true, () => false), "the admin saves monthly costs for profit");
check(await vis(page.getByText("with costs of $120.00 a month")), "the projected profit uses the costs");
await shot("overview");
await scan("overview");

// A tile opens the list behind it; an email in the list opens that family in Users.
await page.getByRole("button", { name: /^Families \d/ }).click();
const list = page.getByRole("dialog", { name: "Families" });
check(await list.getByRole("button", { name: parentEmail }).waitFor({ timeout: 8000 }).then(() => true, () => false), "the Families tile lists the families");
await page.screenshot({ path: `${OUT}/overview-families.png` });
await page.setViewportSize({ width: 360, height: 740 });
await page.waitForTimeout(200);
check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "on a phone the list window doesn't scroll the page sideways");
await page.screenshot({ path: `${OUT}/overview-families-phone.png` });
await page.setViewportSize({ width: 1280, height: 900 });
await scan("families list");
await page.keyboard.press("Escape");
check(!(await vis(list)), "Escape closes the list");
await page.getByRole("button", { name: /^Profit this month / }).click();
check(await vis(page.getByRole("dialog", { name: "Profit by month" })), "the profit tile breaks profit down by month");
await page.getByRole("button", { name: "Close" }).click();
await page.getByRole("button", { name: /^Families \d/ }).click();
await list.getByRole("button", { name: parentEmail }).click();
check(await page.getByRole("button", { name: "Give lifetime access" }).waitFor({ timeout: 8000 }).then(() => true, () => false), "an email in the list opens the family in Users");
await tab("Overview");

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

// The to-do list suggests a "getting started" email to the parent who never practised.
await tab("To do");
const item = page.getByRole("listitem").filter({ hasText: parentEmail });
check(await item.getByText("Signed up, never practised").waitFor({ timeout: 8000 }).then(() => true, () => false), "the to-do list shows a family that never practised");
await item.getByRole("button", { name: "Write email" }).click();
check(await vis(item.getByLabel("Preview").getByText(/Getting started with/)), "the to-do item opens a getting-started email");
await shot("todo");
await scan("to do");

// The Emails tab counts who a group send would reach; nothing is sent.
await tab("Emails");
check(await page.getByText(/This send reaches|Nobody in this group/).waitFor({ timeout: 8000 }).then(() => true, () => false), "the Emails tab counts who a group send reaches");
check(await vis(page.getByRole("region", { name: "Emails sent" })), "the email log lists account emails");
await shot("emails");
await scan("emails");

await tab("Inbox");
check(await page.getByText(/Email isn.t set up yet/).waitFor({ timeout: 8000 }).then(() => true, () => false), "the inbox says when email isn't set up");
await scan("inbox");

// Find the parent and give lifetime access.
await tab("Users");
await page.getByLabel("Search by email or family id").fill(parentEmail);
await page.getByRole("button", { name: "Search", exact: true }).click();
await page.getByRole("button", { name: parentEmail }).click();
await page.getByRole("button", { name: "Give lifetime access" }).click();
check(await page.getByText("Lifetime access given.").waitFor({ timeout: 8000 }).then(() => true, () => false), "the admin gives a family lifetime access");
check(await vis(page.getByText("Lifetime", { exact: true })), "the family shows lifetime access");
check(await vis(page.getByRole("heading", { name: "Email this family" })), "a family's page offers to email them");
check(await vis(page.getByText(/Last sign-in:/)), "a family's page shows the last sign-in");
// With no email keys on the server, sending is refused and nothing goes out.
await page.getByRole("button", { name: "Send email" }).click();
check(await page.getByText("The email couldn't be sent. Check the email settings.").waitFor({ timeout: 8000 }).then(() => true, () => false), "sending without email keys says so");
await shot("user");
await scan("user");

// The System page checks every service from the server; tokens never reach the browser. The status pages are
// read live, so only the parts that don't depend on the network are checked here.
await tab("System");
check(await page.getByRole("heading", { name: "Database", exact: true }).waitFor({ timeout: 30000 }).then(() => true, () => false), "the System tab shows the database check");
check(await vis(page.getByRole("heading", { name: "Provider status pages" })), "the System tab shows the providers' status pages");
check(await vis(page.getByText(/Set VERCEL_TOKEN/)), "a check that isn't set up says which settings to add");
await shot("system");
await scan("system");

for (const name of ["Reports", "Log"]) {
  await tab(name);
  await scan(name.toLowerCase());
}
check(await vis(page.getByText("user.grant-access")), "the change log records the change");

await browser.close();
if (errors.length) fail(`console errors:\n${errors.join("\n")}`);
console.log(process.exitCode ? "admin e2e FAILED" : "admin e2e passed");
