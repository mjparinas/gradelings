import { error, getSession, json } from "@/server/auth";
import { referralSummary } from "@/server/referral";

/** The signed-in parent's referral code and how many free months it has earned. */
export async function GET(req: Request) {
  const session = await getSession(req);
  if (!session) return error(401, "Please sign in first.");
  const summary = await referralSummary(session.familyId);
  if (!summary) return error(404, "No referral code for this account.");
  return json(summary);
}
