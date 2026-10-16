import { error, getSession, json, sameOrigin } from "@/server/auth";
import { setClassHidden, teachingClass } from "@/server/classroom";

// Which classes a teacher has hidden from their own class list. It belongs to the account, so every device agrees.

/** `{ classId, hidden }` hides a class from this teacher's list, or shows it again. Owners and co-teachers can each do it for themselves. */
export async function PATCH(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = (await req.json().catch(() => null)) as { classId?: unknown; hidden?: unknown } | null;
  if (typeof body?.hidden !== "boolean") return error(400, "Say whether to hide the class.");
  const found = typeof body.classId === "string" ? await teachingClass(body.classId, session.parentId) : undefined;
  if (!found) return error(404, "Class not found");
  return json({ hidden: await setClassHidden(session.parentId, found.cls.id, body.hidden) });
}
