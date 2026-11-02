import { ADMIN_BODY_LIMIT, error, json, readJson } from "@/server/auth";
import { audit, requireAdmin } from "@/server/admin";
import { createExperiment, deleteExperiment, experimentResults, getExperiment, listExperiments, startExperiment, stopExperiment, updateDraft } from "@/server/flags";
import { validateExperiment, type Variant } from "@/lib/flags";

/** Every experiment, with results per variant for those that have started. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const list = await listExperiments();
  const experiments = await Promise.all(list.map(async (e) => ({ ...e, results: e.status === "draft" ? [] : await experimentResults(e.key) })));
  return json({ experiments });
}

/** Makes a draft: `{ key, description, variants: [{ name, weight }] }`. The first variant is the control. */
export async function POST(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const body = (await readJson(req, ADMIN_BODY_LIMIT)) as { key?: unknown; description?: unknown; variants?: unknown } | null;
  if (!body) return error(400, "Send a JSON body.");
  const problem = validateExperiment(body);
  if (problem) return error(400, problem);
  const exp = { key: body.key as string, description: ((body.description as string | undefined) ?? "").trim(), variants: (body.variants as Variant[]).map((v) => ({ name: v.name, weight: v.weight })) };
  if (!(await createExperiment(exp))) return error(409, "An experiment with that key already exists.");
  await audit(gate.admin.email, "experiment.create", exp.key, exp);
  return json({ ok: true });
}

/** `{ key, action: "edit" | "start" | "stop", ... }`. Edit works on drafts only; stop takes an optional `winner`. */
export async function PATCH(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const body = (await readJson(req, ADMIN_BODY_LIMIT)) as { key?: unknown; action?: unknown; description?: unknown; variants?: unknown; winner?: unknown } | null;
  const exp = typeof body?.key === "string" ? await getExperiment(body.key) : null;
  if (!exp) return error(404, "No such experiment.");
  if (body!.action === "edit") {
    const problem = validateExperiment({ ...body, key: exp.key });
    if (problem) return error(400, problem);
    const next = { description: ((body!.description as string | undefined) ?? "").trim(), variants: (body!.variants as Variant[]).map((v) => ({ name: v.name, weight: v.weight })) };
    if (!(await updateDraft(exp.key, next))) return error(409, "Only a draft can be changed. Families would move between groups mid-test.");
    await audit(gate.admin.email, "experiment.edit", exp.key, next);
    return json({ ok: true });
  }
  if (body!.action === "start") {
    if (!(await startExperiment(exp.key))) return error(409, "Only a draft can be started.");
    await audit(gate.admin.email, "experiment.start", exp.key);
    return json({ ok: true });
  }
  if (body!.action === "stop") {
    const winner = body!.winner == null || body!.winner === "" ? null : body!.winner;
    if (winner !== null && !exp.variants.some((v) => v.name === winner)) return error(400, "Pick one of the experiment's variants.");
    if (!(await stopExperiment(exp.key, winner as string | null))) return error(409, "Only a running experiment can be stopped.");
    await audit(gate.admin.email, "experiment.stop", exp.key, { winner });
    return json({ ok: true });
  }
  return error(400, "Unknown action.");
}

/** Deletes an experiment (`?key=`) and its recorded assignments. */
export async function DELETE(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const key = new URL(req.url).searchParams.get("key") ?? "";
  if (!(await deleteExperiment(key))) return error(404, "No such experiment.");
  await audit(gate.admin.email, "experiment.delete", key);
  return json({ ok: true });
}
