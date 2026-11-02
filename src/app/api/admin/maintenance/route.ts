import { ADMIN_BODY_LIMIT, error, json, readJson } from "@/server/auth";
import { audit, requireAdmin } from "@/server/admin";
import { getMaintenance, setMaintenance } from "@/server/maintenance";
import { TURN_ON } from "@/lib/automations";

/** Whether maintenance mode is on, and since when. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  return json(await getMaintenance());
}

/** Switches maintenance mode: `{ on: true, confirm: "TURN ON" }` or `{ on: false }`. */
export async function PUT(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const body = (await readJson(req, ADMIN_BODY_LIMIT)) as { on?: unknown; confirm?: unknown } | null;
  if (typeof body?.on !== "boolean") return error(400, "Say whether maintenance mode is on.");
  if (body.on && body.confirm !== TURN_ON) return error(400, `Type ${TURN_ON} to confirm.`);
  const state = await setMaintenance(body.on);
  await audit(gate.admin.email, body.on ? "maintenance.on" : "maintenance.off", null);
  return json(state);
}
