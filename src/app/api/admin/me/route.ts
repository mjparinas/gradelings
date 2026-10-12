import { json } from "@/server/auth";
import { requireAdmin } from "@/server/admin";

/** Whether the signed-in account is an admin (404 when it isn't, or when the panel is off). */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  return json({ email: gate.admin.email });
}
