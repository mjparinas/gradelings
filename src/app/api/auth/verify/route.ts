import { clientIp, consumeAuthToken, error, json, rateLimited, sameOrigin } from "@/server/auth";
import { query, run } from "@/server/db";
import { rewardReferrer } from "@/server/referral";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  if (await rateLimited(`verify:${clientIp(req)}`, 20)) return error(429, "Too many attempts. Try again in a few minutes.");
  const body = (await req.json().catch(() => null)) as { token?: string } | null;
  const parentId = await consumeAuthToken(body?.token ?? "", "verify");
  if (!parentId) return error(400, "This link has expired or was already used. You can ask for a new one in the Parent area, under Account.");
  await run("UPDATE parents SET email_verified_at = COALESCE(email_verified_at, ?) WHERE id = ?", [Date.now(), parentId]);
  // Confirming an email is what thanks the family that shared its code. A failure here never blocks confirmation.
  const family = await query<{ family_id: string }>("SELECT family_id FROM parents WHERE id = ?", [parentId]);
  if (family[0]) await rewardReferrer(family[0].family_id).catch((e) => console.error("[referral]", (e as Error).message));
  return json({ ok: true });
}
