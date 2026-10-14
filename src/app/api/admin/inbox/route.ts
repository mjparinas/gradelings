import { error, json } from "@/server/auth";
import { audit, requireAdmin } from "@/server/admin";
import { countWaiting, getInboxMessage, inboxConfigured, listInbox, markArchived, markHandled, replyToInbox } from "@/server/inbox";
import { draftConfigured, draftReply } from "@/server/replyDraft";

// Mail Resend received for us. `?id=` opens one message (as plain text); `?count=1` says how many of the newest
// are waiting (the Inbox tab's count); otherwise a page of the newest.
// `canDraft` says whether "Draft with AI" is set up (ANTHROPIC_API_KEY).

const ID = /^[A-Za-z0-9-]{1,100}$/;

export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  if (!inboxConfigured()) return json({ configured: false, items: [], hasMore: false, waiting: 0 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const after = url.searchParams.get("after") ?? undefined;
  if ((id && !ID.test(id)) || (after && !ID.test(after))) return error(400, "Bad request");
  try {
    if (id) return json({ message: await getInboxMessage(id), canDraft: draftConfigured() });
    if (url.searchParams.has("count")) return json({ waiting: await countWaiting() });
    return json({ configured: true, ...(await listInbox({ after })) });
  } catch (e) {
    return error(502, (e as Error).message);
  }
}

export async function POST(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  if (!inboxConfigured()) return error(400, "Email isn't set up.");
  const body = ((await req.json().catch(() => null)) ?? {}) as { action?: unknown; id?: unknown; text?: unknown; handled?: unknown; archived?: unknown };
  if (typeof body.id !== "string" || !ID.test(body.id)) return error(400, "Bad request");
  try {
    if (body.action === "handled") {
      await markHandled(body.id, body.handled !== false);
      return json({ ok: true });
    }
    if (body.action === "archive") {
      await markArchived(body.id, body.archived !== false);
      return json({ ok: true });
    }
    if (body.action === "draft") {
      // Only drafts: nothing is sent, and the draft isn't stored.
      if (!draftConfigured()) return error(400, "AI drafts need ANTHROPIC_API_KEY.");
      const m = await getInboxMessage(body.id);
      const draft = await draftReply({ from: m.from, subject: m.subject, text: m.text });
      await audit(gate.admin.email, "inbox.draft", body.id);
      return json({ draft });
    }
    if (body.action === "reply") {
      const text = typeof body.text === "string" ? body.text.trim() : "";
      if (!text) return error(400, "Write a reply first.");
      if (text.length > 10_000) return error(400, "Keep the reply under 10,000 characters.");
      const ok = await replyToInbox(body.id, text, gate.admin.email);
      await audit(gate.admin.email, "inbox.reply", body.id);
      return ok ? json({ ok: true }) : error(502, "The reply couldn't be sent.");
    }
  } catch (e) {
    return error(502, (e as Error).message);
  }
  return error(400, "Unknown action.");
}
