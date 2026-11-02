import { error, getSession, json, readJson, sameOrigin } from "@/server/auth";
import { query, run } from "@/server/db";

// The account's email choices: the weekly report, practice reminders, and news and tips from us (sent from the admin panel).
const PREFS = { weeklyReport: "weekly_report", practiceReminders: "practice_reminders", adminMail: "admin_mail" } as const;
type Pref = keyof typeof PREFS;

async function read(parentId: string) {
  const row = (await query<Record<string, number>>("SELECT weekly_report, practice_reminders, admin_mail FROM parents WHERE id = ?", [parentId]))[0];
  return Object.fromEntries(Object.entries(PREFS).map(([k, col]) => [k, Boolean(Number(row?.[col] ?? 0))])) as Record<Pref, boolean>;
}

export async function GET(req: Request) {
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  return json(await read(session.parentId));
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = ((await readJson(req)) ?? {}) as Partial<Record<Pref, unknown>>;
  const changes = (Object.keys(PREFS) as Pref[]).filter((k) => body[k] !== undefined);
  if (!changes.length || changes.some((k) => typeof body[k] !== "boolean")) return error(400, "Bad request");
  if (changes.some((k) => body[k]) && !session.verified) return error(403, "Please confirm your email first, so the emails reach the right person.");
  for (const k of changes) await run(`UPDATE parents SET ${PREFS[k]} = ? WHERE id = ?`, [body[k] ? 1 : 0, session.parentId]);
  return json(await read(session.parentId));
}
