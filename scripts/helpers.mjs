// Shared Playwright helpers for the e2e scripts: answer whatever question is on
// screen, create a child, enter the parent PIN.

/** True if the locator matches a visible element (never throws). */
export async function vis(loc) {
  try {
    return (await loc.count()) > 0 && (await loc.first().isVisible());
  } catch {
    return false;
  }
}

/** Answer one thing on screen; a click that lands mid-animation just tries again. */
export async function step(page) {
  try {
    return await stepOnce(page);
  } catch {
    await page.waitForTimeout(200);
    return "wait";
  }
}

/** Answer one thing on screen (randomly, so we see right, retry and revealed paths). */
export async function stepOnce(page) {
  const next = page.getByRole("button", { name: /^(Next →|Finish 🎉)$/ });
  if (await vis(next)) return next.click({ force: true }).then(() => "next");
  const ok = page.locator("[role=status]").getByRole("button", { name: "OK", exact: true });
  if (await vis(ok)) return ok.click({ force: true }).then(() => "ok");
  if (await vis(page.getByRole("button", { name: /Keep going/ }))) return "checkpoint";
  if (await vis(page.getByRole("button", { name: /Play again/ }))) return "summary";

  const choices = page.locator('[data-testid="choice"]:not([disabled])');
  if (await vis(choices)) {
    const n = await choices.count();
    await choices.nth(Math.floor(Math.random() * n)).click({ force: true });
    return "choice";
  }
  if (await vis(page.getByTestId("pool-item"))) {
    for (let i = 0; i < 12 && (await vis(page.getByTestId("pool-item"))); i++) await page.getByTestId("pool-item").first().click({ force: true });
    await page.getByRole("button", { name: /Check/ }).click({ force: true });
    await page.waitForTimeout(600);
    return "order";
  }
  if (await vis(page.getByTestId("bin"))) {
    const before = await page.getByTestId("sort-item").count();
    const bins = page.getByTestId("bin");
    for (let b = 0; b < (await bins.count()); b++) {
      await bins.nth(b).click({ force: true });
      await page.waitForTimeout(120);
      if ((await page.getByTestId("sort-item").count()) < before) break;
      // Wrong basket: dismiss the "try another" bar, then try the next basket.
      const ok = page.locator("[role=status]").getByRole("button", { name: "OK", exact: true });
      if (await vis(ok)) {
        await ok.click({ force: true });
        await page.waitForTimeout(80);
      }
    }
    return "sort";
  }
  if (await vis(page.getByRole("button", { name: "+ Ten" }))) {
    await page.getByRole("button", { name: "+ Ten" }).click({ force: true });
    await page.getByRole("button", { name: "+ One" }).click({ force: true });
    await page.getByRole("button", { name: /Check/ }).click({ force: true });
    return "build";
  }
  const coin = page.getByRole("button", { name: /^(?!Take out).*(nickel|dime|quarter|loonie|toonie|bill)/i });
  if (await vis(coin)) {
    await coin.first().click({ force: true });
    await page.getByRole("button", { name: /Check/ }).click({ force: true });
    return "coins";
  }
  if (await vis(page.getByRole("button", { name: "Delete", exact: true }))) {
    for (const k of ["1", "2"]) await page.getByRole("button", { name: k, exact: true }).click({ force: true });
    await page.getByRole("button", { name: /Check/ }).click({ force: true });
    return "input";
  }
  return "wait";
}

/** The PIN every e2e script uses. Pass `create` the first time on a device. */
export async function enterPin(page, create) {
  await page.waitForTimeout(400);
  const type = async () => {
    for (const d of "2468") await page.getByRole("button", { name: d, exact: true }).click();
    await page.getByRole("button", { name: "OK", exact: true }).click();
  };
  await type();
  if (create) await type();
  await page.waitForTimeout(500);
}

/**
 * Fills in the new-player screen and starts. The first child on a device with no account gets one screen for
 * grown-ups offering the progress emails; `onEmailStep(page)` runs while it shows, then "Not now" carries on.
 */
export async function newChild(page, name, grade, { onEmailStep } = {}) {
  await page.getByLabel("Name").fill(name);
  await page.getByRole("button", { name: grade, exact: true }).click();
  await page.getByRole("button", { name: "Start!" }).click({ force: true });
  await page.waitForTimeout(600);
  const notNow = page.getByRole("button", { name: /Not now, let's play/ });
  if (await notNow.isVisible()) {
    if (onEmailStep) await onEmailStep(page);
    await notNow.click({ force: true });
    await page.waitForTimeout(600);
  }
}

/** Real voice names as Microsoft Edge on Windows reports them. */
export const EDGE_VOICES = [
  { name: "Microsoft David - English (United States)", lang: "en-US", localService: true, default: true },
  { name: "Microsoft Linda - English (Canada)", lang: "en-CA", localService: true, default: false },
  { name: "Microsoft Aria Online (Natural) - English (United States)", lang: "en-US", localService: false, default: false },
  { name: "Microsoft Clara Online (Natural) - English (Canada)", lang: "en-CA", localService: false, default: false },
  { name: "Microsoft Denise Online (Natural) - French (France)", lang: "fr-FR", localService: false, default: false },
];

/**
 * Headless browsers have no voices, so this swaps in a fake speech engine with real
 * voice names that records what it says and with which voice (read with `spoken`).
 */
export async function installFakeVoices(context, voices = EDGE_VOICES) {
  await context.addInitScript((list) => {
    const all = list.map((v) => ({ ...v, voiceURI: v.name }));
    window.__spoken = [];
    const synth = {
      getVoices: () => all,
      speak: (u) => window.__spoken.push({ text: u.text, voice: u.voice ? u.voice.name : null }),
      cancel: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      speaking: false,
      pending: false,
      paused: false,
    };
    Object.defineProperty(window, "speechSynthesis", { value: synth, configurable: true });
    window.SpeechSynthesisUtterance = class {
      constructor(text) {
        this.text = text;
        this.voice = null;
      }
    };
  }, voices);
}

/** Everything the fake speech engine has said so far: [{ text, voice }]. */
export function spoken(page) {
  return page.evaluate(() => window.__spoken ?? []);
}

/**
 * A confirmed teacher with a class: three students, two assigned units (one with a due date and a question
 * count). Made through the API; the email is marked confirmed straight in the local database file
 * (DATABASE_URL, or ./data/grademap.db), because no email is sent in tests. Returns the session cookie and the class.
 */
export async function teacherFixture(base, { framework = "ca-bc", grade = "3" } = {}) {
  const { createClient } = await import("@libsql/client");
  const email = `teacher-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
  let cookie = "";
  const api = async (path, method = "GET", body) => {
    const res = await fetch(`${base}${path}`, {
      method,
      headers: { "content-type": "application/json", ...(cookie ? { cookie } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const set = res.headers.get("set-cookie");
    if (set) cookie = set.split(";")[0];
    return { status: res.status, data: await res.json().catch(() => ({})) };
  };
  const must = (res, what) => {
    if (res.status !== 200) throw new Error(`teacher fixture: ${what} answered ${res.status} ${JSON.stringify(res.data)}`);
    return res.data;
  };
  must(await api("/api/auth/signup/", "POST", { email, password: "correct horse" }), "sign up");
  const db = createClient({ url: process.env.DATABASE_URL ?? "file:./data/grademap.db", authToken: process.env.DATABASE_AUTH_TOKEN });
  await db.execute({ sql: "UPDATE parents SET email_verified_at = ? WHERE email = ?", args: [Date.now(), email] });
  // The session was made before the email was confirmed, so sign in again.
  must(await api("/api/auth/login/", "POST", { email, password: "correct horse" }), "sign in");
  const cls = must(await api("/api/classes/", "POST", { name: "Room 3", grade, framework }), "create a class").class;
  must(await api("/api/classes/assignments/", "POST", { classId: cls.id, unitKey: `${grade}/math/multiplication`, dueAt: Date.now() + 3 * 86_400_000, goal: 5 }), "assign a unit");
  must(await api("/api/classes/assignments/", "POST", { classId: cls.id, unitKey: `${grade}/math/fractions` }), "assign a second unit");
  must(await api("/api/classes/students/", "POST", { classId: cls.id, names: ["Maya", "Sam", "Alex P."] }), "add students");
  const [name, ...value] = cookie.split("=");
  return { cookie: { name, value: value.join("=") }, classId: cls.id, joinCode: cls.joinCode };
}

/** Signs a browser context in as the fixture's teacher. */
export async function signInTeacher(context, base, fixture) {
  await context.addCookies([{ name: fixture.cookie.name, value: fixture.cookie.value, url: base }]);
}

/** The teacher area's tabs, in order, with the hash that opens each for a class. */
export const TEACHER_TABS = ["", "/homework", "/live", "/students", "/settings"];
