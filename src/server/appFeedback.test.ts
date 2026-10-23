import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// "How's Gradelings?": the submit route, the admin list and the to-do item, against a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-appfeedback-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;
delete process.env.ADMIN_TOKEN;
process.env.ADMIN_EMAILS = "owner@example.com";
process.env.ADMIN_2FA = "optional";

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, send: Mod, adminList: Mod;
let dbm: typeof import("@/server/db");
let queue: typeof import("@/server/adminQueue");
let del: typeof import("@/server/deleteFamily");

beforeAll(async () => {
  [signup, send, adminList] = (await Promise.all([import("@/app/api/auth/signup/route"), import("@/app/api/app-feedback/route"), import("@/app/api/admin/app-feedback/route")])) as unknown as Mod[];
  dbm = await import("@/server/db");
  queue = await import("@/server/adminQueue");
  del = await import("@/server/deleteFamily");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
function req(path: string, method = "GET", body?: unknown, cookie?: string): Request {
  return new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": `10.5.0.${++ip % 250}`, ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
async function account(email: string) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email, password: "correct horse" }));
  await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now() - 60_000, email]);
  const familyId = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", [email]))[0].family_id;
  return { cookie: (res.headers.get("set-cookie") ?? "").split(";")[0], familyId };
}

describe("app feedback", () => {
  it("stores a rating and a line, and shows the email only when the sender allowed a reply", async () => {
    const admin = await account("owner@example.com");
    const a = await account("a@example.com");
    const b = await account("b@example.com");
    expect((await send.POST(req("/api/app-feedback/", "POST", { audience: "parent", rating: 2, comment: " Too slow ", topic: "problem", canReply: true }, a.cookie))).status).toBe(200);
    expect((await send.POST(req("/api/app-feedback/", "POST", { audience: "teacher", rating: 5 }, b.cookie))).status).toBe(200);
    // Not signed in: accepted, but there is nobody to reply to.
    expect((await send.POST(req("/api/app-feedback/", "POST", { audience: "parent", comment: "hello", canReply: true }))).status).toBe(200);

    const list = await (await adminList.GET(req("/api/admin/app-feedback/", "GET", undefined, admin.cookie))).json();
    expect(list.feedback).toHaveLength(3);
    const slow = list.feedback.find((f: { comment: string }) => f.comment === "Too slow");
    expect(slow).toMatchObject({ rating: 2, topic: "problem", audience: "parent", email: "a@example.com" });
    expect(list.feedback.find((f: { comment: string }) => f.comment === "hello").email).toBeNull();
    expect(list.feedback.find((f: { rating: number | null }) => f.rating === 5).email).toBeNull();
    expect(list.averages.find((x: { audience: string }) => x.audience === "teacher").average).toBe(5);
    // Only an admin can read it.
    expect((await adminList.GET(req("/api/admin/app-feedback/", "GET", undefined, a.cookie))).status).toBe(404);

    // The to-do list asks for the low rating and the comments, and drops them once handled.
    const items = await queue.queueItems(Date.now());
    expect(items.find((i) => i.kind === "feedback")?.detail).toContain("2 messages");
    for (const f of list.feedback.filter((x: { comment: string }) => x.comment)) await adminList.PATCH(req("/api/admin/app-feedback/", "PATCH", { id: f.id }, admin.cookie));
    expect((await queue.queueItems(Date.now())).some((i) => i.kind === "feedback")).toBe(false);

    // It goes with the account.
    await del.deleteFamilyData(a.familyId);
    const left = await dbm.query<{ n: number }>("SELECT COUNT(*) AS n FROM app_feedback WHERE family_id = ?", [a.familyId]);
    expect(Number(left[0].n)).toBe(0);
  });

  it("refuses empty, unknown and out-of-range submissions", async () => {
    for (const body of [{ audience: "parent" }, { audience: "child", rating: 3 }, { audience: "parent", rating: 9 }, { audience: "parent", rating: 2.5 }]) {
      expect((await send.POST(req("/api/app-feedback/", "POST", body))).status).toBe(400);
    }
  });

  it("limits how often one network can send", async () => {
    const r = new Request("http://localhost/api/app-feedback/", { method: "POST", headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": "9.9.9.9" }, body: JSON.stringify({ audience: "parent", rating: 4 }) });
    let last = 0;
    for (let i = 0; i < 5; i++) last = (await send.POST(r.clone())).status;
    expect(last).toBe(429);
  });
});
