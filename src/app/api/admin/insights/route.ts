import { error, json } from "@/server/auth";
import { requireAdmin } from "@/server/admin";
import { insight, INSIGHT_PARTS, isInsightPart } from "@/server/adminInsights";

/** `?part=trial|revenue|engagement|teachers|content|sources|paywall|apps`: counts and rates for one part of the insights. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const part = new URL(req.url).searchParams.get("part") ?? "";
  if (!isInsightPart(part)) return error(400, `Pick ${INSIGHT_PARTS.join(", ")}.`);
  return json(await insight(part));
}
