import { error, json } from "@/server/auth";
import { audit, requireAdmin } from "@/server/admin";
import { hideQueueItem, queueItems } from "@/server/adminQueue";

/** The admin's to-do list. POST `{ key, days }` snoozes an item for that many days; `days: null` dismisses it. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  return json({ items: await queueItems() });
}

export async function POST(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const body = ((await req.json().catch(() => null)) ?? {}) as { key?: unknown; days?: unknown };
  if (typeof body.key !== "string" || !body.key || body.key.length > 200) return error(400, "Bad request");
  const days = body.days;
  if (days !== null && !(typeof days === "number" && Number.isInteger(days) && days >= 1 && days <= 365)) return error(400, "Bad request");
  await hideQueueItem(body.key, days);
  await audit(gate.admin.email, days === null ? "queue.dismiss" : "queue.snooze", body.key, days === null ? undefined : { days });
  return json({ ok: true });
}
