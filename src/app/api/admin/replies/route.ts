import { error, json } from "@/server/auth";
import { audit, requireAdmin } from "@/server/admin";
import { getSetting, setSetting } from "@/server/payments";
import { DEFAULT_REPLIES, repliesProblem, type SavedReply } from "@/lib/savedReplies";

/** The inbox's saved replies: the owner's own list once saved, else the defaults. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const raw = await getSetting("saved_replies");
  let replies: SavedReply[] = DEFAULT_REPLIES;
  try {
    if (raw && !repliesProblem(JSON.parse(raw))) replies = JSON.parse(raw) as SavedReply[];
  } catch {
    // A broken value falls back to the defaults.
  }
  return json({ replies });
}

/** Replaces the whole list: `{ replies: [{ id, title, body }] }`. */
export async function PUT(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const body = (await req.json().catch(() => null)) as { replies?: unknown } | null;
  const problem = repliesProblem(body?.replies);
  if (problem) return error(400, problem);
  const replies = (body!.replies as SavedReply[]).map((r) => ({ id: r.id, title: r.title.trim(), body: r.body.trim() }));
  await setSetting("saved_replies", JSON.stringify(replies));
  await audit(gate.admin.email, "replies.save", null, { count: replies.length });
  return json({ ok: true });
}
