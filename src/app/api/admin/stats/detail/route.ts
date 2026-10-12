import { error, json } from "@/server/auth";
import { requireAdmin } from "@/server/admin";
import { detailFor } from "@/server/adminDetail";
import { isDetailView } from "@/lib/adminDetail";

/** The list behind one dashboard tile: `?view=paying`, `?view=signups` and so on. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const view = new URL(req.url).searchParams.get("view");
  if (!isDetailView(view)) return error(400, "Unknown view.");
  return json(await detailFor(view));
}
