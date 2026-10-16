import { error } from "@/server/auth";
import { requireAdmin } from "@/server/admin";
import { emailPage, emailViewPolicy, sanitizeEmailHtml } from "@/server/emailHtml";
import { getInboxHtml, inboxConfigured } from "@/server/inbox";

// One received email's HTML, sanitized, as a page of its own for the Inbox's sandboxed frame. `?images=1` lets
// remote images load. It is served with its own strict policy (`emailViewPolicy`) and may only be framed by the
// panel itself (next.config.ts leaves this path out of the site-wide frame-ancestors 'none').

const ID = /^[A-Za-z0-9-]{1,100}$/;

export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  if (!inboxConfigured()) return error(400, "Email isn't set up.");
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id || !ID.test(id)) return error(400, "Bad request");
  const images = url.searchParams.get("images") === "1";
  let html: string;
  try {
    html = await getInboxHtml(id);
  } catch (e) {
    return error(502, (e as Error).message);
  }
  return new Response(emailPage(sanitizeEmailHtml(html, { images })), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "private, no-store",
      "content-security-policy": emailViewPolicy(images),
      "x-frame-options": "SAMEORIGIN",
      "x-content-type-options": "nosniff",
      "referrer-policy": "no-referrer",
      "cross-origin-resource-policy": "same-origin",
    },
  });
}
