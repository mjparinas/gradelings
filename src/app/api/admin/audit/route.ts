import { json } from "@/server/auth";
import { auditLog, requireAdmin } from "@/server/admin";

/** The last 200 changes made in the admin panel. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  return json({ entries: await auditLog() });
}
