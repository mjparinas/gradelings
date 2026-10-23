// End-to-end check of classroom mode: a teacher adds a student, the student signs in with codes and
// opens a lesson, practises, and the teacher sees the result. Also checks the student gets no
// parent area and that signing out leaves nothing behind on the device.
//
//   npm run build && npm start      # in one terminal
//   node scripts/e2e-classroom.mjs http://localhost:3000 e2e-shots/classroom
// It marks the teacher's email as confirmed straight in the local database file (DATABASE_URL, or
// ./data/grademap.db), because no email is sent in tests.
import fs from "node:fs";
import { createClient } from "@libsql/client";
import { chromium } from "playwright";
import { step, vis } from "./helpers.mjs";

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = process.argv[3] || "e2e-shots/classroom";
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

// ---- The teacher, through the API ----
const email = `teacher-${Date.now()}@example.com`;
let cookie = "";
async function api(path, method = "GET", body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "content-type": "application/json", ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const set = res.headers.get("set-cookie");
  if (set) cookie = set.split(";")[0];
  return { status: res.status, data: await res.json().catch(() => ({})) };
}

check((await api("/api/auth/signup/", "POST", { email, password: "correct horse" })).status === 200, "teacher signs up");
const db = createClient({ url: process.env.DATABASE_URL ?? "file:./data/grademap.db", authToken: process.env.DATABASE_AUTH_TOKEN });
await db.execute({ sql: "UPDATE parents SET email_verified_at = ? WHERE email = ?", args: [Date.now(), email] });
const made = await api("/api/classes/", "POST", { name: "Room 3", grade: "3", framework: "ca-bc" });
check(made.status === 200, "teacher creates a class");
const cls = made.data.class;
const unit = "3/math/multiplication";
check((await api("/api/classes/assignments/", "POST", { classId: cls.id, unitKey: unit, dueAt: Date.now() + 3 * 86_400_000, goal: 5 })).status === 200, "teacher assigns homework with a due date and 5 questions");
const added = await api("/api/classes/students/", "POST", { classId: cls.id, names: ["Maya"] });
check(added.status === 200 && added.data.students.length === 1, "teacher adds a student");
const code = added.data.students[0].loginCode;

// ---- The student, in a browser ----
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 820, height: 1180 }, hasTouch: true });
const page = await context.newPage();
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() !== "error") return;
  const t = m.text();
  if (/Failed to load resource|401/.test(t)) return;
  errors.push(`console: ${t}`);
});
const shot = (name) => page.screenshot({ path: `${OUT}/${name}.png` });

await page.goto(`${BASE}/play/`);
await page.getByRole("button", { name: /Let.s go/ }).waitFor();
await page.getByRole("button", { name: "My teacher gave me a code" }).click();

// One code is all a student types, and a wrong one is refused kindly.
check(!(await vis(page.getByLabel("Class code"))), "the sign-in screen asks for one code, not a class code too");
await page.getByLabel("My code").fill("ZZZZZZZZZZ");
await page.getByRole("button", { name: /Let.s go/ }).click();
check(await page.getByRole("alert").filter({ hasText: /doesn.t match/ }).waitFor({ timeout: 8000 }).then(() => true, () => false), "a wrong code is refused with a kind message");

await page.getByLabel("My code").fill(code);
await page.getByRole("button", { name: /Let.s go/ }).click();
await page.getByText("From your teacher").first().waitFor({ timeout: 15000 });
await shot("student-home");
check(await vis(page.getByText(/Try to finish by/)), "the student sees the assignment and its soft due date");
check(await vis(page.getByText(/0 of 5 questions/)), "the student sees how many homework questions are left");
check(await vis(page.getByRole("link", { name: /Grown-ups/ })) === false, "a student has no Grown-ups link");
check(await vis(page.getByRole("button", { name: /Sign out/ })), "a student has a sign-out button");

// A lesson, then practice.
await page.goto(`${BASE}/play/#/practice/math`);
await page.getByRole("button", { name: /Multiplication/ }).first().click({ force: true });
await page.getByRole("button", { name: /How it works/ }).click();
check(await page.getByText("Let's try one").waitFor({ timeout: 8000 }).then(() => true, () => false), "the lesson shows its worked example");
await shot("lesson");
await page.getByRole("button", { name: /Let.s practise/ }).click();
let answered = 0;
for (let i = 0; i < 200 && answered < 6; i++) {
  if ((await step(page)) === "next") answered++;
  await page.waitForTimeout(40);
}
check(answered >= 6, "the student answers questions");

// No parent area.
await page.goto(`${BASE}/parents/`);
check(
  await page.getByRole("heading", { name: "This is a class account" }).waitFor({ state: "visible", timeout: 8000 }).then(() => true, () => false),
  "the parent area shows the class account notice",
);

// The teacher sees the work (after the app syncs).
let attempts = 0;
for (let i = 0; i < 20 && attempts === 0; i++) {
  await page.goto(`${BASE}/play/`);
  await page.waitForTimeout(3000);
  const view = await api(`/api/classes/?id=${cls.id}`);
  attempts = view.data.students?.[0]?.units?.[0]?.attempts ?? 0;
}
check(attempts > 0, "the teacher sees the student's practice on the assigned unit");
check(((await api(`/api/classes/?id=${cls.id}`)).data.students?.[0]?.units?.[0]?.done ?? 0) >= 5, "the teacher sees the homework count");
await page.goto(`${BASE}/play/`);
check(
  await page.getByText(/Done! ✓/).first().waitFor({ state: "visible", timeout: 15000 }).then(() => true, () => false),
  "the student's home screen marks the homework done",
);

// The teacher in a browser of their own, signed in with the session the API calls above made.
async function teacherBrowser() {
  const teacherContext = await browser.newContext({ viewport: { width: 1100, height: 900 } });
  const [name, value] = cookie.split("=");
  // The production cookie carries the __Host- prefix: Secure, no Domain, path "/". Chromium refuses that when set from a plain http url, so give the host and path (localhost counts as secure).
  await teacherContext.addCookies([{ name, value, domain: new URL(BASE).hostname, path: "/", httpOnly: true, ...(name.startsWith("__Host-") ? { secure: true } : {}) }]);
  return { teacherContext, teacherPage: await teacherContext.newPage() };
}

// The teacher tries the assigned unit as a student: it plays, and nothing is recorded.
{
  const { teacherContext, teacherPage } = await teacherBrowser();
  const before = (await api(`/api/classes/?id=${cls.id}`)).data.students?.[0]?.units?.[0]?.attempts ?? 0;
  await teacherPage.goto(`${BASE}/teachers/#/class/${encodeURIComponent(cls.id)}/homework`);
  await teacherPage.getByRole("button", { name: /as a student/ }).first().click({ timeout: 60000 });
  const tryDialog = teacherPage.getByRole("dialog", { name: /Try as a student/ });
  check(await vis(tryDialog.getByText(/Nothing you answer here is saved/)), "the teacher can try the assigned unit as a student");
  check(await tryDialog.getByText(/Question 1 of/).waitFor({ timeout: 20000 }).then(() => true, () => false), "the try-out shows the unit's questions");
  await teacherPage.screenshot({ path: `${OUT}/teacher-try-unit.png` });
  await teacherPage.keyboard.press("Escape");
  check(await tryDialog.waitFor({ state: "hidden" }).then(() => true, () => false), "Escape closes the try-out");
  check(((await api(`/api/classes/?id=${cls.id}`)).data.students?.[0]?.units?.[0]?.attempts ?? 0) === before, "trying a unit as a teacher records nothing for the students");
  await teacherContext.close();
}

// A live question: the teacher asks, the student taps, the teacher sees it.
let asked;
let askedKey = "";
for (const key of [unit, "3/math/fractions", "3/math/place-value", "3/language/rhymes"]) {
  const res = await api("/api/classes/live/", "POST", { classId: cls.id, unitKey: key });
  if (res.status === 200) {
    asked = res.data.live;
    askedKey = key;
    break;
  }
}
check(Boolean(asked), "the teacher asks a live question");
if (asked) {
  const card = page.getByRole("dialog", { name: "Live question from your teacher" });
  check(await card.waitFor({ timeout: 20000 }).then(() => true, () => false), "the live question appears on the student's home screen");
  await shot("live-question");
  await card.getByTestId("live-choice").first().click();
  check(await card.getByText(/Sent!/).waitFor({ timeout: 8000 }).then(() => true, () => false), "the student's answer is sent");
  const tally = await api(`/api/classes/live/?classId=${cls.id}`);
  check(tally.data.live?.answers?.length === 1, "the teacher sees the answer come in");
  await api("/api/classes/live/", "PATCH", { classId: cls.id, action: "reveal" });
  check(await card.getByText(/You got it|The answer is/).waitFor({ timeout: 20000 }).then(() => true, () => false), "the student sees the answer once the teacher shows it");
  await api(`/api/classes/live/?classId=${cls.id}`, "DELETE");
  check(await card.waitFor({ state: "detached", timeout: 20000 }).then(() => true, () => false), "ending the live question clears it from the student's screen");
}

// An exit ticket: three live questions back to back, then one results page.
if (askedKey) {
  if (askedKey !== unit) await api("/api/classes/assignments/", "POST", { classId: cls.id, unitKey: askedKey });
  const { teacherContext, teacherPage } = await teacherBrowser();
  await teacherPage.goto(`${BASE}/teachers/#/class/${encodeURIComponent(cls.id)}/live`);
  const live = teacherPage.getByRole("region", { name: "Live questions" });
  await live.getByRole("button", { name: "Start an exit ticket" }).click({ timeout: 60000 });
  check(await live.getByText("Exit ticket · question 1 of 3").waitFor({ timeout: 20000 }).then(() => true, () => false), "the teacher starts an exit ticket");
  await live.getByRole("button", { name: "Next question" }).click();
  await live.getByText("Exit ticket · question 2 of 3").waitFor({ timeout: 20000 });
  await live.getByRole("button", { name: "Next question" }).click();
  await live.getByText("Exit ticket · question 3 of 3").waitFor({ timeout: 20000 });
  check(!(await vis(live.getByRole("button", { name: "Next question" }))), "the last question of the ticket has no next question");
  await live.getByRole("button", { name: "Finish the exit ticket" }).click();
  const results = live.getByLabel("Exit ticket results");
  check(await results.getByText(/Maya: 0 of 3 right/).waitFor({ timeout: 20000 }).then(() => true, () => false), "the exit ticket ends with a results page for each student");
  await teacherPage.screenshot({ path: `${OUT}/teacher-exit-ticket.png` });
  await results.getByRole("button", { name: "Done" }).click();
  check(await vis(live.getByRole("button", { name: "Start an exit ticket" })), "Done goes back to asking questions");
  await api(`/api/classes/live/?classId=${cls.id}`, "DELETE");
  await teacherContext.close();
}

// Printing: a class summary with many units prints sideways, a short one upright (Chromium reads the page size from the CSS).
{
  const { teacherContext, teacherPage } = await teacherBrowser();
  const pageSize = async () => {
    await teacherPage.evaluate(() => {
      // The app prints and then clears its print sheet at once; keep a copy so there is something to lay out.
      window.print = () => {
        const sheet = document.querySelector(".print\\:block");
        if (!sheet) return;
        const copy = sheet.cloneNode(true);
        copy.id = "printed-copy";
        document.body.appendChild(copy);
      };
    });
    await teacherPage.getByRole("button", { name: "Print class summary" }).click();
    await teacherPage.locator("#printed-copy").waitFor({ state: "attached" });
    await teacherPage.emulateMedia({ media: "print" });
    const pdf = (await teacherPage.pdf({ preferCSSPageSize: true })).toString("latin1");
    await teacherPage.emulateMedia({ media: "screen" });
    await teacherPage.evaluate(() => document.getElementById("printed-copy")?.remove());
    const boxes = [...pdf.matchAll(/\/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)\s*\]/g)].map((m) => ({ width: Number(m[1]), height: Number(m[2]) }));
    return boxes.length ? boxes : null;
  };
  await teacherPage.goto(`${BASE}/teachers/#/class/${encodeURIComponent(cls.id)}/progress`);
  await teacherPage.getByRole("button", { name: "Print class summary" }).waitFor({ timeout: 60000 });
  const short = await pageSize();
  check(Boolean(short) && short.every((b) => b.height > b.width), `a class summary with a few units prints upright (${JSON.stringify(short)})`);
  for (const key of ["3/math/fractions", "3/math/patterns-and-equations", "3/math/measuring", "3/math/time", "3/language/read-and-think"]) {
    await api("/api/classes/assignments/", "POST", { classId: cls.id, unitKey: key });
  }
  await teacherPage.reload();
  await teacherPage.getByRole("button", { name: "Print class summary" }).waitFor({ timeout: 60000 });
  const wide = await pageSize();
  check(Boolean(wide) && wide.some((b) => b.width > b.height), `a class summary with many units prints sideways (${JSON.stringify(wide)})`);
  await teacherContext.close();
}

// Sign out leaves nothing on the device.
await page.goto(`${BASE}/play/`);
await page.getByRole("button", { name: /Sign out/ }).click();
await page.getByRole("button", { name: "My teacher gave me a code" }).waitFor({ timeout: 10000 });
check(true, "signing out returns to the welcome screen");
const stored = await page.evaluate(
  () =>
    new Promise((resolve) => {
      const req = indexedDB.open("grademap");
      req.onsuccess = () => {
        const names = [...req.result.objectStoreNames];
        if (!names.includes("events")) return resolve(0);
        const all = req.result.transaction("events", "readonly").objectStore("events").getAll();
        all.onsuccess = () => resolve(all.result.length);
      };
      req.onerror = () => resolve(0);
    }),
);
check(stored === 0, "no practice is left on the device after sign-out");

// A login card's QR code scanned on a device that already has a player: it asks before it replaces anyone.
await page.getByRole("button", { name: /Let.s go/ }).click({ force: true });
await page.getByLabel("Name").fill("Sam");
await page.getByRole("button", { name: "Grade 3" }).click();
await page.getByRole("button", { name: "Start!" }).click();
// The first child on a device with no account is offered the progress emails once.
await page.getByRole("button", { name: /Not now, let's play/ }).click({ timeout: 5000, force: true }).catch(() => undefined);
await page.getByText("Adventure", { exact: true }).first().waitFor({ timeout: 15000 });
const scan = async () => {
  await page.goto(`${BASE}/play/#/class?s=${code}`);
  await page.reload();
};
await scan();
check(await page.getByRole("heading", { name: "Sign in to your class?" }).waitFor({ timeout: 10000 }).then(() => true, () => false), "a login card scanned where a player already is asks first");
check(await vis(page.getByText(/replaces them on this device/)), "the question says the player will be replaced");
await page.getByRole("button", { name: "Keep this device as it is" }).click();
check(await page.getByText("Adventure", { exact: true }).first().waitFor({ timeout: 10000 }).then(() => true, () => false), "saying no keeps the player's home screen");
await scan();
await page.getByRole("button", { name: "Replace them and sign in" }).click();
check((await page.getByLabel("My code").inputValue()).replace("-", "") === code, "saying yes opens the sign-in with the card's code filled in");
await page.getByRole("button", { name: /Let.s go/ }).click();
check(await page.getByText("From your teacher").first().waitFor({ timeout: 15000 }).then(() => true, () => false), "the student is signed in from the card");
await page.getByRole("button", { name: /Sign out/ }).click();
await page.getByRole("button", { name: "My teacher gave me a code" }).waitFor({ timeout: 10000 });

// A co-teacher: invited by email, accepted by the invitee, sees the class and the student's work,
// can assign units, cannot close the class or delete the student, and can leave.
const ownerCookie = cookie;
const coEmail = `coteacher-${Date.now()}@example.com`;
cookie = "";
check((await api("/api/auth/signup/", "POST", { email: coEmail, password: "correct horse" })).status === 200, "a second teacher signs up");
const coCookie = cookie;
await db.execute({ sql: "UPDATE parents SET email_verified_at = ? WHERE email = ?", args: [Date.now(), coEmail] });
cookie = ownerCookie;
check((await api("/api/classes/teachers/", "POST", { classId: cls.id, email: coEmail })).status === 200, "the owner invites a co-teacher by email");
cookie = coCookie;
check((await api(`/api/classes/?id=${cls.id}`)).status === 404, "an invited teacher sees nothing until they accept");
check((await api("/api/classes/invites/", "POST", { classId: cls.id })).status === 200, "the co-teacher accepts");
const shared = await api(`/api/classes/?id=${cls.id}`);
check(shared.status === 200 && shared.data.role === "co-teacher" && shared.data.students.length === 1 && shared.data.roster.length === 1, "the co-teacher sees the students, results and login codes");
check((await api("/api/classes/assignments/", "POST", { classId: cls.id, unitKey: "3/math/fractions" })).status === 200, "the co-teacher can assign a unit");
check((await api(`/api/classes/students/?classId=${cls.id}&studentId=${added.data.students[0].id}`, "DELETE")).status === 404, "the co-teacher cannot delete a student");
check((await api(`/api/classes/?id=${cls.id}`, "DELETE")).status === 404, "the co-teacher cannot close the class");
check((await api(`/api/classes/teachers/?classId=${cls.id}&leave=1`, "DELETE")).status === 200, "the co-teacher can leave");
check((await api(`/api/classes/?id=${cls.id}`)).status === 404, "a co-teacher who left has no access");
cookie = ownerCookie;

// The student's session is closed to teacher endpoints.
await browser.close();
if (errors.length) fail(`console errors:\n${errors.join("\n")}`);
console.log(process.exitCode ? "classroom e2e FAILED" : "classroom e2e passed");
