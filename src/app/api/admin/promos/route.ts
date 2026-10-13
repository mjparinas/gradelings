import { error, json } from "@/server/auth";
import { audit, requireAdmin } from "@/server/admin";
import { createPromo, deletePromo, listPromos, promoStatus, stopPromo, type NewPromo } from "@/server/promo";

/** Every sale, newest first, with whether it is live, scheduled, ended or stopped. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const now = Date.now();
  return json({ promos: (await listPromos()).map((p) => ({ ...p, status: promoStatus(p, now) })) });
}

/** Makes a sale: `{ preset, emoji, headline, body, code, link, startsAt, endsAt }`. */
export async function POST(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const body = (await req.json().catch(() => null)) as NewPromo | null;
  if (!body || typeof body !== "object") return error(400, "Send a JSON body.");
  const made = await createPromo(body, gate.admin.email);
  if (typeof made === "string") return error(400, made);
  await audit(gate.admin.email, "promo.create", made.id, { preset: made.preset, code: made.code, startsAt: made.starts_at, endsAt: made.ends_at });
  return json({ promo: made });
}

/** Ends a sale now: `{ id }`. */
export async function PATCH(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const body = (await req.json().catch(() => null)) as { id?: unknown } | null;
  if (typeof body?.id !== "string") return error(400, "Send the sale to stop.");
  if (!(await stopPromo(body.id))) return error(404, "No such running sale.");
  await audit(gate.admin.email, "promo.stop", body.id);
  return json({ ok: true });
}

/** Removes a sale from the list: `{ id }`. */
export async function DELETE(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const body = (await req.json().catch(() => null)) as { id?: unknown } | null;
  if (typeof body?.id !== "string") return error(400, "Send the sale to delete.");
  if (!(await deletePromo(body.id))) return error(404, "No such sale.");
  await audit(gate.admin.email, "promo.delete", body.id);
  return json({ ok: true });
}
