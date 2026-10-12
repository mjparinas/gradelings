import { clientIp, createSession, error, json, rateLimited, refundRateLimit, sameOrigin, sessionCookie } from "@/server/auth";
import { sendAlert } from "@/server/alerts";
import { normalizeCode } from "@/server/classroom";
import { query, run } from "@/server/db";
import { getFamilyRow, toFamilyInfo } from "@/server/family";
import { normalizeStudentCode, STUDENT_CODE_LENGTH } from "@/server/students";

// A student signs in with the class code and their own code. Only wrong tries count toward the
// limits: each try is counted first (so a burst can't slip past) and given back when the codes are
// right, so a whole class signing in from one school network is never stopped. Wrong tries are
// limited per network and per class on that network, so someone who knows a class code can only
// lock out their own network, never the classroom. Student codes are long enough that this makes
// guessing impractical. A class getting many wrong tries from everywhere emails the admins instead
// of locking the class out.

const TOO_MANY = "Too many tries. Ask your teacher to check your codes.";
const HOUR = 60 * 60_000;
/** Wrong tries one network may make in 10 minutes, across all classes. */
const WRONG_PER_NETWORK = 40;
/** Wrong tries one network may make for one class in an hour. */
const WRONG_PER_CLASS_NETWORK = 30;
/** Wrong tries for one class in an hour, from all networks, before the admins hear about it. */
const WRONG_PER_CLASS_ALERT = 300;

export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const ip = clientIp(req);
  const network = `student-login:${ip}`;
  if (await rateLimited(network, WRONG_PER_NETWORK)) return error(429, TOO_MANY);
  const body = (await req.json().catch(() => null)) as { classCode?: unknown; studentCode?: unknown } | null;
  const classCode = normalizeCode(body?.classCode);
  const studentCode = normalizeStudentCode(body?.studentCode);
  if (classCode.length < 6 || studentCode.length < STUDENT_CODE_LENGTH) return error(400, "Type both codes from your teacher.");
  const classNetwork = `student-login-class:${classCode}:${ip}`;
  if (await rateLimited(classNetwork, WRONG_PER_CLASS_NETWORK, HOUR)) return error(429, TOO_MANY);
  const rows = await query<{ parent_id: string; family_id: string; class_id: string }>(
    `SELECT s.parent_id, s.family_id, s.class_id FROM students s JOIN classes c ON c.id = s.class_id AND c.closed_at IS NULL
     WHERE c.join_code = ? AND s.login_code = ?`,
    [classCode, studentCode],
  );
  const student = rows[0];
  if (!student) {
    if (await rateLimited(`student-login-class:${classCode}`, WRONG_PER_CLASS_ALERT, HOUR)) {
      await sendAlert(`student-login-guessing:${classCode}`, {
        subject: "Many wrong student sign-ins for one class",
        lines: [
          `Class code ${classCode} has had more than ${WRONG_PER_CLASS_ALERT} wrong student codes in the last hour, from several networks.`,
          "Someone may be guessing codes. Students can still sign in. If it keeps happening, ask the teacher to get a new class code.",
        ],
      });
    }
    return error(401, "Those codes don’t match. Check them with your teacher.");
  }
  await Promise.all([refundRateLimit(network), refundRateLimit(classNetwork)]);
  await run("UPDATE classes SET last_activity_at = ?, inactive_warning_at = NULL WHERE id = ? AND closed_at IS NULL", [Date.now(), student.class_id]);
  const { token, maxAge } = await createSession(student.parent_id, student.family_id, req);
  const family = toFamilyInfo((await getFamilyRow(student.family_id))!, "", false, true);
  return json({ family }, { cookie: sessionCookie(token, maxAge) });
}
