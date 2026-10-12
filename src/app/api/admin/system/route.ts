import { json } from "@/server/auth";
import { requireAdmin } from "@/server/admin";
import { systemReport } from "@/server/systemHealth";

/** Health of every part of the stack and the providers' status pages. `?refresh=1` skips the minute-long cache. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const refresh = new URL(req.url).searchParams.get("refresh") === "1";
  return json(await systemReport({ refresh }));
}
