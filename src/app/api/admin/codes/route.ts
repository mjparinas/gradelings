import { ADMIN_BODY_LIMIT, error, json, readJson, sameOrigin, secretsMatch } from "@/server/auth";
import { audit, getAdmin } from "@/server/admin";
import { createCode, disableCode, formatCode, listCodes, validateNewCode, type NewCode } from "@/server/codes";

// The owner's tool for making redeem codes. Used by the admin panel (a signed-in admin, see
// src/server/admin.ts) or from scripts with `Authorization: Bearer $ADMIN_TOKEN` when ADMIN_TOKEN is set.
// See docs/CODES.md for examples.

function tokenMatches(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  // A short token would be guessable, so it doesn't switch the API on.
  if (!token || token.length < 24) return false;
  return secretsMatch(req.headers.get("authorization") ?? "", `Bearer ${token}`);
}

/** Who is calling: "ADMIN_TOKEN" for a script, the admin's email for the panel, or null for anyone else. */
async function caller(req: Request): Promise<string | null> {
  if (tokenMatches(req)) return "ADMIN_TOKEN";
  if (req.method !== "GET" && !sameOrigin(req)) return null;
  return (await getAdmin(req))?.email ?? null;
}

const notFound = () => error(404, "Not found");

/** Every code, newest first, with how often each was used. */
export async function GET(req: Request) {
  if (!(await caller(req))) return notFound();
  const codes = await listCodes();
  return json({ codes: codes.map((c) => ({ ...c, display: formatCode(c.code) })) });
}

/** Makes a code. Leave `code` out for a random one. */
export async function POST(req: Request) {
  const who = await caller(req);
  if (!who) return notFound();
  const body = (await readJson(req, ADMIN_BODY_LIMIT)) as NewCode | null;
  if (!body || typeof body !== "object") return error(400, "Send a JSON body.");
  const problem = validateNewCode(body);
  if (problem) return error(400, problem);
  const code = await createCode(body);
  if (!code) return error(409, "That code already exists.");
  await audit(who, "code.create", code.code, { kind: code.kind, days: code.days, percentOff: code.percent_off, maxUses: code.max_uses, expiresAt: code.expires_at });
  return json({ code: { ...code, display: formatCode(code.code) } });
}

/** Stops a code working (`{ "code": "..." }`). Access already granted with it stays. */
export async function DELETE(req: Request) {
  const who = await caller(req);
  if (!who) return notFound();
  const body = (await readJson(req, ADMIN_BODY_LIMIT)) as { code?: unknown } | null;
  if (typeof body?.code !== "string") return error(400, "Send the code to disable.");
  if (!(await disableCode(body.code))) return error(404, "No such active code.");
  await audit(who, "code.disable", body.code.toUpperCase());
  return json({ ok: true });
}
