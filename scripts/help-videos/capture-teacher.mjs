// Takes the screenshots the teacher training videos are made from (scripts/help-videos/teacher_specs.py), from the
// real teacher area with demo data only: a made-up teacher, class and students whose first names are invented.
//
//   npm run dev -- -p 3100      # in one terminal (or a production build)
//   node scripts/help-videos/capture-teacher.mjs http://localhost:3100 [out-dir]
// It confirms the demo teacher's email straight in the local database file, like the e2e scripts.
import fs from "node:fs";
import { chromium } from "playwright";
import { teacherFixture, signInTeacher } from "../helpers.mjs";

const BASE = process.argv[2] || "http://localhost:3100";
const OUT = process.argv[3] || "scripts/help-videos/shots";
fs.mkdirSync(OUT, { recursive: true });

const fx = await teacherFixture(BASE);
const api = (cookie) => async (path, method = "GET", body) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "content-type": "application/json", origin: BASE, ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const set = res.headers.get("set-cookie");
  return { status: res.status, data: await res.json().catch(() => ({})), cookie: set ? set.split(";")[0] : "" };
};
const teacher = api(`${fx.cookie.name}=${fx.cookie.value}`);

// More students, then some practice for each, so Progress has something to show.
const names = ["Priya", "Liam", "Noor", "Mateo", "Chen"];
const added = await teacher("/api/classes/students/", "POST", { classId: fx.classId, names });
const all = await teacher(`/api/classes/?id=${fx.classId}`);
const students = (added.data.students ?? []).concat();
const rows = all.data?.students ?? all.data?.class?.students ?? [];
console.log("students added:", students.length, "rows seen:", rows.length);

let n = 0;
const kids = [];
for (const s of students) {
  const login = await api("")("/api/students/login/", "POST", { code: s.loginCode });
  if (login.status !== 200) { console.log("login failed", login.status); continue; }
  const sc = api(login.cookie);
  const pulled = await sc("/api/sync/", "POST", { cursor: 0, events: [] });
  const pid = pulled.data?.profiles?.[0]?.id;
  if (!pid) { console.log("no profile", JSON.stringify(pulled.data).slice(0, 200)); continue; }
  const skill = 0.45 + (n % 5) * 0.12;
  const events = [];
  for (let i = 0; i < 24; i++) {
    const unit = i % 3 === 0 ? "3/math/fractions" : "3/math/multiplication";
    const correct = ((i * 7 + n * 3) % 10) / 10 < skill;
    events.push({ id: `demo-${fx.classId.slice(0, 8)}-${n}-${i}`, profileId: pid, t: Date.now() - (i % 4) * 3_600_000 - i * 60_000, type: "answer", unit, correct, attempts: correct ? 1 : 2, revealed: false, ms: 6000, mode: "practice", q: unit.endsWith("fractions") ? "Which fraction shows one half?" : "What is 6 × 4?" });
  }
  const r = await sc("/api/sync/", "POST", { cursor: 0, events });
  console.log(s.name, r.status);
  kids.push({ sc, pid });
  n++;
}

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
await signInTeacher(context, BASE, fx);
const page = await context.newPage();
const shot = async (name, extra) => {
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  console.log("shot", name);
};
const go = async (hash, text) => {
  await page.goto(`${BASE}/teachers/#/${hash}`);
  await page.reload();
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  if (text) await page.waitForSelector(`text=${text}`, { timeout: 60000 });
};
const BOXES = {};
/** Records where named parts of the current screen are (page pixels), so a video can point at them whatever the data. */
const measure = async (name, parts) => {
  const out = {};
  for (const [key, loc] of Object.entries(parts)) {
    const b = await loc.boundingBox().catch(() => null);
    if (!b) continue;
    const y = await page.evaluate(() => window.scrollY);
    out[key] = [Math.round(b.x), Math.round(b.y + y), Math.round(b.x + b.width), Math.round(b.y + y + b.height)];
  }
  BOXES[name] = out;
  fs.writeFileSync(`${OUT}/boxes.json`, JSON.stringify(BOXES, null, 1));
};
const scrollTo = (text) => page.locator(`text=${text}`).first().scrollIntoViewIfNeeded().then(() => page.evaluate(() => window.scrollBy(0, -90)));

await go("", "Room 3");
await shot("classes");
await measure("classes", {
  name: page.getByLabel("Class name"), grade: page.getByLabel("Grade", { exact: true }), second: page.getByLabel("Second grade"), province: page.getByLabel("Province or state"),
  create: page.getByRole("button", { name: "Create class" }), monday: page.locator("label", { hasText: "Email me every Monday" }), classCard: page.locator("text=Room 3").first(),
});
await go(`class/${fx.classId}`, "Students (8)");
await shot("progress-top");
await measure("progress", {
  tabs: page.getByRole("navigation").first(), heading: page.getByRole("heading", { name: /^Students \(/ }), sort: page.getByLabel("Sort by"),
  tableHead: page.getByText("Multiplication", { exact: true }).first(), print: page.getByRole("button", { name: "Print class summary" }), csv: page.getByRole("button", { name: /Download as spreadsheet/ }),
  note: page.getByText(/This reflects practice in Gradelings/).first(), goal: page.getByRole("heading", { name: "Class goal" }), next: page.getByRole("heading", { name: "What to look at next" }),
  checkIn: page.getByText("Check in with", { exact: true }), extra: page.getByText("Assign extra practice to these students"),
  lastRow: page.getByText("Sam", { exact: true }).first(),
});
await scrollTo("Students (8)");
await shot("progress");
await go(`class/${fx.classId}/homework`, "Homework");
await shot("homework");
await measure("homework", {
  heading: page.getByRole("heading", { name: "Homework" }), starts: page.locator("input[type=date]").nth(0), due: page.locator("input[type=date]").nth(1), questions: page.locator("select").nth(0),
  preview: page.getByText("Preview", { exact: true }).first(), tryIt: page.getByText("Try it", { exact: true }).first(), addUnit: page.getByText("Add a unit", { exact: true }),
  several: page.getByText("Pick several units at once"), who: page.getByText("Who gets it"), whole: page.getByLabel("Whole class"), chosen: page.getByLabel("Chosen students"), assign: page.getByRole("button", { name: "Assign", exact: true }),
});
await go(`class/${fx.classId}/live`, "Live");
await shot("live");
await measure("live", {
  timerPresets: page.getByRole("button", { name: "1 min" }), timerLast: page.getByRole("button", { name: "30 min" }), start: page.getByRole("button", { name: "Start the timer" }), askFrom: page.getByText("Ask from", { exact: true }),
  timerHeading: page.getByRole("heading", { name: "Class timer" }), liveHeading: page.getByRole("heading", { name: "Live questions" }),
});
// Ask one question and let some students answer it, so the desks have something to show.
const asked = await teacher("/api/classes/live/", "POST", { classId: fx.classId, unitKey: "3/math/multiplication" });
console.log("live question", asked.status);
const tl = await teacher(`/api/classes/live/?classId=${fx.classId}`);
const right = tl.data?.live?.question?.answer ?? tl.data?.question?.answer;
console.log("right answer id", right);
for (const [i, k] of kids.slice(0, 5).entries()) {
  const q = await k.sc(`/api/live/?profile=${k.pid}`);
  const live = q.data?.live ?? q.data?.question;
  const choices = live?.question?.choices ?? [];
  if (live?.id && choices.length) console.log("answer", (await k.sc("/api/live/", "POST", { questionId: live.id, profileId: k.pid, choice: i === 3 ? choices.find((c) => c.id !== right).id : (right ?? choices[0].id) })).status);
}
await go(`class/${fx.classId}/live`, "Live");
await page.waitForSelector("text=Up next", { timeout: 60000 });
await page.waitForTimeout(3000);
await shot("live-open");
// Where the live question's parts are on that screenshot (page pixels), so the video can point at them whatever the question is.
const box = async (sel) => {
  const b = await page.locator(sel).first().boundingBox();
  const y = await page.evaluate(() => window.scrollY);
  return b && { x: Math.round(b.x), y: Math.round(b.y + y), w: Math.round(b.width), h: Math.round(b.height) };
};
const liveBoxes = {
  answered: await box("text=/Answered:/"),
  summary: await box("text=/of 8 answered/"),
  upNext: await box("text=/Up next/"),
  reveal: await box("button:has-text('Show the answer')"),
  next: await box("button:has-text('Next question')"),
  end: await box("button:has-text('End')"),
  lookBack: await box("button:has-text('Look back')"),
};
BOXES.liveOpen = liveBoxes;
fs.writeFileSync(`${OUT}/boxes.json`, JSON.stringify(BOXES, null, 1));
await go(`class/${fx.classId}/students`, "Maya");
await shot("students");
await measure("students", {
  tabs: page.getByRole("navigation").first(), studentsTab: page.getByRole("link", { name: /Students/ }).first(), classCode: page.getByText("Class code", { exact: true }),
  names: page.locator("textarea").first(), add: page.getByRole("button", { name: "Add students" }), printCards: page.getByRole("button", { name: "Print login cards" }), larger: page.getByLabel(/Larger print/),
  newCode: page.getByRole("button", { name: "New code" }).first(), edit: page.getByRole("button", { name: "Edit" }).first(), remove: page.getByRole("button", { name: "Remove" }).first(),
  firstCode: page.getByText(/^[A-Z0-9]{5}-[A-Z0-9]{5}$/).first(), fifthCode: page.getByText(/^[A-Z0-9]{5}-[A-Z0-9]{5}$/).nth(4), firstName: page.getByText("Sam", { exact: true }).first(),
});
await go(`class/${fx.classId}/settings`, "Settings");
await shot("settings");
// What a student sees when their teacher gave them a code.
const kidContext = await browser.newContext({ viewport: { width: 1280, height: 720 } });
// A date outside every holiday window, so the video doesn't show a seasonal theme that will be gone next week.
await kidContext.clock.install({ time: new Date("2027-06-10T10:00:00") });
const kidPage = await kidContext.newPage();
await kidPage.goto(`${BASE}/play/`);
await kidPage.getByRole("button", { name: /Let.s go/ }).waitFor({ timeout: 180000 });
await kidPage.getByRole("button", { name: "My teacher gave me a code" }).click();
await kidPage.getByLabel("My code").waitFor();
await kidPage.addStyleTag({ content: "nextjs-portal{display:none!important}" });
await kidPage.getByLabel("My code").fill(students[0].loginCode.replace(/[^A-Z0-9]/gi, "").replace(/^(.{5})(.*)$/, "$1-$2"));
await kidPage.waitForTimeout(600);
await kidPage.screenshot({ path: `${OUT}/student-code.png` });
await browser.close();
console.log("class", fx.classId);
