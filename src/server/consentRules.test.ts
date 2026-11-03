import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Edges of the COPPA withdraw link, found by mutation testing (`npm run test:mutation:server`).

const dir = mkdtempSync(join(tmpdir(), "grademap-consentrules-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;

let consent: typeof import("@/server/consent");
let dbm: typeof import("@/server/db");
let signup: (req: Request) => Promise<Response>;

beforeAll(async () => {
  consent = await import("@/server/consent");
  dbm = await import("@/server/db");
  signup = (await import("@/server/testing/signupWithSession")).POST;
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

describe("familyForConsentToken", () => {
  it("finds a family by token, up to 100 characters, and nothing for an empty, unknown or longer one", async () => {
    await signup(new Request("http://localhost/api/auth/signup/", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": "10.7.0.1" }, body: JSON.stringify({ email: "consent1@example.com", password: "correct horse battery" }) }));
    const id = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = 'consent1@example.com'"))[0].family_id;
    const long = "t".repeat(100);
    await dbm.run("UPDATE families SET consent_token = ? WHERE id = ?", [long, id]);
    expect(await consent.familyForConsentToken(long)).toBe(id);
    expect(await consent.familyForConsentToken("")).toBeNull();
    expect(await consent.familyForConsentToken("nope")).toBeNull();
    expect(await consent.familyForConsentToken("t".repeat(101))).toBeNull();
  });
});
