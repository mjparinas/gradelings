import { error, json, secretsMatch } from "@/server/auth";
import { createCode, disableCode, formatCode, listCodes, validateNewCode, type NewCode } from "@/server/codes";

// The owner's tool for making redeem codes. Off unless ADMIN_TOKEN is set; every call sends
// `Authorization: Bearer $ADMIN_TOKEN`. See docs/CODES.md for examples.

function authorized(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  // A short token would be guessable, so it doesn't switch the API on.
  if (!token || token.length < 24) return false;
  return secretsMatch(req.headers.get("authorization") ?? "", `Bearer ${token}`);
}

const notFound = () => error(404, "Not found");

/** Every code, newest first, with how often each was used. */
export async function GET(req: Request) {
  if (!authorized(req)) return notFound();
  const codes = await listCodes();
  return json({ codes: codes.map((c) => ({ ...c, display: formatCode(c.code) })) });
}

/** Makes a code. Leave `code` out for a random one. */
export async function POST(req: Request) {
  if (!authorized(req)) return notFound();
  const body = (await req.json().catch(() => null)) as NewCode | null;
  if (!body || typeof body !== "object") return error(400, "Send a JSON body.");
  const problem = validateNewCode(body);
  if (problem) return error(400, problem);
  const code = await createCode(body);
  if (!code) return error(409, "That code already exists.");
  return json({ code: { ...code, display: formatCode(code.code) } });
}

/** Stops a code working (`{ "code": "..." }`). Access already granted with it stays. */
export async function DELETE(req: Request) {
  if (!authorized(req)) return notFound();
  const body = (await req.json().catch(() => null)) as { code?: unknown } | null;
  if (typeof body?.code !== "string") return error(400, "Send the code to disable.");
  if (!(await disableCode(body.code))) return error(404, "No such active code.");
  return json({ ok: true });
}
