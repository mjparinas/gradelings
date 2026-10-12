import { error, json } from "@/server/auth";
import { audit, requireAdmin } from "@/server/admin";
import { flagStates, overrideCounts, setFlag } from "@/server/flags";
import { FLAGS, flagDef } from "@/lib/flags";

/** Every flag with its site-wide state and how many families have an override. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const [states, overrides] = await Promise.all([flagStates(), overrideCounts()]);
  return json({
    flags: FLAGS.map((f) => {
      const s = states.get(f.key);
      return { ...f, enabled: s ? s.enabled : f.defaultOn, rollout: s ? s.rollout : 100, changed: Boolean(s), overrides: overrides.get(f.key) ?? 0 };
    }),
  });
}

/** Turns a flag on or off for everyone, or rolls it out to a percentage of families: `{ key, enabled, rollout }`. */
export async function PUT(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const body = (await req.json().catch(() => null)) as { key?: unknown; enabled?: unknown; rollout?: unknown } | null;
  const def = typeof body?.key === "string" ? flagDef(body.key) : undefined;
  if (!def) return error(400, "Unknown flag.");
  if (typeof body!.enabled !== "boolean") return error(400, "Say whether the flag is on.");
  const rollout = body!.rollout === undefined ? 100 : body!.rollout;
  if (!(Number.isInteger(rollout) && (rollout as number) >= 0 && (rollout as number) <= 100)) return error(400, "Rollout must be a whole number from 0 to 100.");
  const state = { enabled: body!.enabled, rollout: rollout as number };
  await setFlag(def.key, state);
  await audit(gate.admin.email, "flag.set", def.key, state);
  return json({ ok: true });
}
