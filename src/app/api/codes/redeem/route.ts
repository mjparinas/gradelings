import { clientIp, error, getSession, json, rateLimited, readJson, sameOrigin } from "@/server/auth";
import { redeemCode } from "@/server/codes";
import { getFamilyRow, toFamilyInfo } from "@/server/family";
import { isFlagOn } from "@/server/flags";

/** A parent enters a code for free access or a discount. Class student accounts can't (getSession refuses them). */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Please sign in first.");
  if (!(await isFlagOn("redeem-codes", session.familyId))) return error(503, "Codes can't be used just now. Please try again later.");
  // Codes are long and random, but limit guessing anyway: per account and per address.
  if ((await rateLimited(`redeem:${session.familyId}`, 10, 60 * 60_000)) || (await rateLimited(`redeem-ip:${clientIp(req)}`, 30, 60 * 60_000))) {
    return error(429, "Too many tries. Please wait a while and try again.");
  }
  const body = (await readJson(req)) as { code?: unknown } | null;
  const code = typeof body?.code === "string" ? body.code.slice(0, 64) : "";
  const result = await redeemCode(session.familyId, code);
  if (!result.ok) return error(result.status, result.error);
  const row = await getFamilyRow(session.familyId);
  return json({ result, family: toFamilyInfo(row!, session.email, session.verified) });
}
