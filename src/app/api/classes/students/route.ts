import { error, getSession, json, rateLimited, sameOrigin } from "@/server/auth";
import { classGrades, MAX_STUDENTS, ownedClass, teachingClass, type ClassRow } from "@/server/classroom";
import { addStudents, cleanStudentName, removeStudent, resetStudentCode, restoreStudentCode, updateStudent } from "@/server/students";

// A teacher adds students to a class they own. Each gets a login code; there is no email or password.

const MAX_BATCH = 40;

// Co-teachers can add students and reprint or reset login codes; only the owner can delete a student's account.
async function teacherClass(req: Request, classId: string, ownerOnly = false) {
  if (!sameOrigin(req)) return { fail: error(403, "Bad origin") };
  const session = await getSession(req);
  if (!session) return { fail: error(401, "Not signed in") };
  const found = ownerOnly ? await ownedClass(classId, session.parentId).then((c) => c && { cls: c }) : await teachingClass(classId, session.parentId);
  if (!found) return { fail: error(404, "Class not found") };
  return { session, cls: found.cls };
}

/** Adds students by first name or nickname. */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { classId?: unknown; names?: unknown; grade?: unknown } | null;
  const found = await teacherClass(req, typeof body?.classId === "string" ? body.classId : "");
  if (found.fail) return found.fail;
  const { session, cls } = found;
  if (!session!.verified) return error(403, "Please confirm your email first. Student accounts hold children's practice, so we only allow them for confirmed accounts.");
  if (await rateLimited(`students:${session!.parentId}`, 30, 60 * 60_000)) return error(429, "Too many students added. Try again later.");
  const raw = Array.isArray(body?.names) ? body.names : [];
  const names = raw.slice(0, MAX_BATCH).map(cleanStudentName).filter(Boolean);
  if (!names.length) return error(400, "Type at least one first name.");
  // In a split class the teacher says which grade these students are in; otherwise it's the class's grade.
  const grades = classGrades(cls!);
  const grade = body?.grade === undefined ? cls!.grade : grades.find((g) => g === body.grade);
  if (!grade) return error(400, "Choose one of this class's grades.");
  const students = await addStudents(cls!, names, grade);
  if (!students.length) return error(409, "This class is full.");
  return json({ students, skipped: names.length - students.length, limit: MAX_STUDENTS });
}

/** Removes a student and deletes everything stored about them. */
export async function DELETE(req: Request) {
  const params = new URL(req.url).searchParams;
  const found = await teacherClass(req, params.get("classId") ?? "", true);
  if (found.fail) return found.fail;
  const removed = await removeStudent(found.cls!.id, params.get("studentId") ?? "");
  return removed ? json({ removed: true }) : error(404, "Student not found");
}

/**
 * Changes one student (?classId=&studentId=). With `{ name }` and/or `{ grade }` (a grade of the class) it fixes their
 * name or moves them to the other grade of a split class; their codes and practice stay. With no body it gives them a
 * new login code and signs them out everywhere. `{ undo: true }` brings back the code they had just before, for a few minutes.
 */
export async function PATCH(req: Request) {
  const params = new URL(req.url).searchParams;
  const found = await teacherClass(req, params.get("classId") ?? "");
  if (found.fail) return found.fail;
  const body = (await req.json().catch(() => null)) as { name?: unknown; grade?: unknown; undo?: unknown } | null;
  if (body?.undo === true) {
    const restored = await restoreStudentCode(found.cls!.id, params.get("studentId") ?? "");
    return restored ? json({ loginCode: restored }) : error(409, "It’s too late to undo that code change. Get a new code instead.");
  }
  if (body && ("name" in body || "grade" in body)) {
    const change: { name?: string; grade?: ClassRow["grade"] } = {};
    if ("name" in body) {
      const name = cleanStudentName(body.name);
      if (!name) return error(400, "Type the student's first name.");
      change.name = name;
    }
    if ("grade" in body) {
      const grade = classGrades(found.cls!).find((g) => g === body.grade);
      if (!grade) return error(400, "Choose one of this class's grades.");
      change.grade = grade;
    }
    return (await updateStudent(found.cls!.id, params.get("studentId") ?? "", change)) ? json({ ok: true }) : error(404, "Student not found");
  }
  const code = await resetStudentCode(found.cls!.id, params.get("studentId") ?? "");
  return code ? json({ loginCode: code }) : error(404, "Student not found");
}
