import { error, getSession, json, readJson, sameOrigin } from "@/server/auth";
import { run } from "@/server/db";
import { isFlagOn } from "@/server/flags";

// The teacher's Monday class email (src/server/dailyJob.ts, classDigests). It belongs to the account, so every device agrees.

/** `{ on }` turns the Monday class email on or off for the signed-in teacher. Confirmed accounts only, since it is email. */
export async function PATCH(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  if (!(await isFlagOn("teacher-monday-email", session.familyId))) return error(503, "The Monday class email isn't available just now.");
  const body = (await readJson(req)) as { on?: unknown } | null;
  if (typeof body?.on !== "boolean") return error(400, "Say whether to send the Monday email.");
  if (body.on && !session.verified) return error(403, "Please confirm your email first.");
  await run("UPDATE parents SET class_digest = ? WHERE id = ?", [body.on ? 1 : 0, session.parentId]);
  return json({ on: body.on });
}
