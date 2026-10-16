import { error, getSession, json, newId, rateLimited, sameOrigin } from "@/server/auth";
import { assignmentAudience, cleanSecondGrade, assignmentDue, assignmentGoals, assignmentKeys, classProgress, classTeachers, isFramework, MAX_CLASSES, newJoinCode, ownedClass, pendingInvites, removeClassTeachers, teachingClass } from "@/server/classroom";
import { batch, query, run } from "@/server/db";
import { liveClassStatements } from "@/server/live";
import { isFlagOn } from "@/server/flags";
import { classRoster, removeClassStudents } from "@/server/students";
import { GRADE_ORDER } from "@/content/subjects";

// A teacher's classes. Ownership is always checked against the signed-in account.

/** Lists the teacher's classes, or one class with its assignments and students' progress (?id=). */
export async function GET(req: Request) {
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const id = new URL(req.url).searchParams.get("id");
  if (id) {
    // Building a class view reads every student's history, so it is rate limited.
    if (await rateLimited(`classview:${session.parentId}`, 60, 10 * 60_000)) return error(429, "Too many refreshes. Try again in a minute.");
    const found = await teachingClass(id, session.parentId);
    if (!found) return error(404, "Class not found");
    const { cls, role } = found;
    return json({
      class: { id: cls.id, name: cls.name, grade: cls.grade, grade2: cls.grade2, framework: cls.framework, joinCode: cls.join_code },
      role,
      teachers: await classTeachers(cls),
      // Pending invitations are the owner's business.
      invites: role === "owner" ? await pendingInvites(cls.id) : [],
      assignments: await assignmentKeys(cls.id),
      due: await assignmentDue(cls.id),
      goal: await assignmentGoals(cls.id),
      audience: await assignmentAudience(cls.id),
      students: await classProgress(cls.id),
      roster: await classRoster(cls.id),
    });
  }
  const rows = await query<{ id: string; name: string; grade: string; grade2: string | null; framework: string; join_code: string; students: number; owner_parent_id: string }>(
    `SELECT c.id, c.name, c.grade, c.grade2, c.framework, c.join_code, c.owner_parent_id, (SELECT COUNT(*) FROM class_members m WHERE m.class_id = c.id) AS students
     FROM classes c WHERE c.closed_at IS NULL AND (c.owner_parent_id = ? OR c.id IN (SELECT class_id FROM class_teachers WHERE parent_id = ?)) ORDER BY c.created_at`,
    [session.parentId, session.parentId],
  );
  return json({
    classes: rows.map((r) => ({ id: r.id, name: r.name, grade: r.grade, grade2: r.grade2, framework: r.framework, joinCode: r.join_code, students: Number(r.students), role: r.owner_parent_id === session.parentId ? "owner" : "co-teacher" })),
  });
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Sign in to create a class.");
  // Teachers see children's first names and results, so the account's email has to be confirmed first.
  if (!(await isFlagOn("new-classes", session.familyId))) return error(503, "New classes can't be created just now. Please try again later.");
  if (!session.verified) return error(403, "Please confirm your email first. Classes show children's progress, so we only allow them for confirmed accounts.");
  if (await rateLimited(`class:${session.parentId}`, 20, 60 * 60_000)) return error(429, "Too many classes created. Try again later.");
  const body = (await req.json().catch(() => null)) as { name?: unknown; grade?: unknown; grade2?: unknown; framework?: unknown } | null;
  // One line of plain text: it appears in invitation emails and on printed cards.
  const name = typeof body?.name === "string" ? body.name.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 60) : "";
  const grade = String(body?.grade ?? "");
  const framework = body?.framework === undefined ? "ca-bc" : body.framework;
  if (!isFramework(framework)) return error(400, "Choose a province or state.");
  if (!name) return error(400, "Give the class a name.");
  if (!(GRADE_ORDER as string[]).includes(grade)) return error(400, "Choose a grade.");
  const grade2 = cleanSecondGrade(grade, body?.grade2);
  if (grade2 === undefined) return error(400, "A split class's second grade has to be next to the first.");
  const mine = await query<{ n: number }>("SELECT COUNT(*) AS n FROM classes WHERE owner_parent_id = ? AND closed_at IS NULL", [session.parentId]);
  if (Number(mine[0].n) >= MAX_CLASSES) return error(409, "You have the maximum number of classes. Close one first.");

  const id = newId();
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = newJoinCode();
    try {
      const now = Date.now();
      await run("INSERT INTO classes (id, owner_parent_id, name, grade, grade2, framework, join_code, created_at, last_activity_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, session.parentId, name, grade, grade2, framework, code, now, now]);
      return json({ class: { id, name, grade, grade2, framework, joinCode: code, students: 0 } });
    } catch {
      // Join code collision: try another.
    }
  }
  return error(500, "Couldn’t create the class. Try again.");
}

/** Replaces the class's join code (?id=), for when it has been shared more widely than intended. Linked students stay linked. */
export async function PATCH(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const id = new URL(req.url).searchParams.get("id") ?? "";
  const cls = await ownedClass(id, session.parentId);
  if (!cls) return error(404, "Class not found");
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = newJoinCode();
    try {
      await run("UPDATE classes SET join_code = ? WHERE id = ?", [code, id]);
      return json({ joinCode: code });
    } catch {
      // Collision: try another.
    }
  }
  return error(500, "Couldn’t make a new code. Try again.");
}

/** Closes a class (owner only). Co-teachers lose access with it. Links to students are removed, so the teacher no longer sees anyone's progress. */
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const id = new URL(req.url).searchParams.get("id") ?? "";
  const cls = await ownedClass(id, session.parentId);
  if (!cls) return error(404, "Class not found");
  await removeClassStudents(id);
  await run("DELETE FROM class_members WHERE class_id = ?", [id]);
  await run("DELETE FROM class_assignments WHERE class_id = ?", [id]);
  await run("DELETE FROM class_assignment_students WHERE class_id = ?", [id]);
  await batch(liveClassStatements("?", [id]));
  await removeClassTeachers(id);
  await run("UPDATE classes SET closed_at = ?, join_code = ? WHERE id = ?", [Date.now(), `X${id.slice(0, 10)}`, id]);
  return json({ closed: true });
}
