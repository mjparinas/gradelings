import "server-only";
import type { EmailKind } from "@/lib/emailKinds";

// Email goes out through Resend over plain HTTPS (no SDK). Set RESEND_API_KEY and EMAIL_FROM
// (for example `Gradelings <hello@gradelings.com>`). Without a key, emails are logged in
// development and skipped in production, so the rest of the app keeps working.

export interface Email {
  to: string;
  subject: string;
  html: string;
  text: string;
  /** Adds the one-click unsubscribe header to bulk mail like the weekly report. */
  unsubscribeUrl?: string;
  /** Mail with a kind is recorded in the admin panel's email log, against the account it went to. */
  kind?: EmailKind;
  /** The admin who sent it, for mail sent from the admin panel. */
  sentBy?: string;
  /** What the email log shows instead of the subject (admin mail keeps its subject before names are filled in). */
  label?: string;
  /** Extra headers, such as In-Reply-To on a reply. */
  headers?: Record<string, string>;
}

export interface SentEmail extends Email {
  at: number;
}

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

/** In development and tests, emails are kept here instead of being sent. */
export function outbox(): SentEmail[] {
  const g = globalThis as unknown as { __gmOutbox?: SentEmail[] };
  return (g.__gmOutbox ??= []);
}

export async function sendEmail(email: Email): Promise<{ ok: boolean; skipped?: boolean }> {
  // A subject is one line: names, class names and inbound subjects end up in it.
  email = { ...email, subject: email.subject.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim() };
  const result = await deliver(email);
  if (email.kind) {
    // The log never stops an email: it is written after sending, and a failure only shows in the server log.
    const status = result.skipped ? "skipped" : result.ok ? "sent" : "failed";
    await import("./emailLog").then((m) => m.logEmail(email, status, result.id)).catch((e: Error) => console.error("[email] could not log", e.message));
  }
  return { ok: result.ok, ...(result.skipped ? { skipped: true } : {}) };
}

async function deliver(email: Email): Promise<{ ok: boolean; skipped?: boolean; id?: string }> {
  if (!emailConfigured()) {
    if (process.env.NODE_ENV === "production") return { ok: false, skipped: true };
    outbox().push({ ...email, at: Date.now() });
    if (process.env.NODE_ENV !== "test") console.log(`[email] to ${email.to}: ${email.subject}\n${email.text}`);
    return { ok: true, skipped: true };
  }
  try {
    const res = await fetch(process.env.RESEND_API_URL ?? "https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: [email.to],
        subject: email.subject,
        html: email.html,
        text: email.text,
        ...(email.unsubscribeUrl || email.headers
          ? {
              headers: {
                ...email.headers,
                ...(email.unsubscribeUrl ? { "List-Unsubscribe": `<${email.unsubscribeUrl}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } : {}),
              },
            }
          : {}),
      }),
    });
    if (!res.ok) console.error(`[email] Resend answered ${res.status}`);
    const id = res.ok ? ((await res.json().catch(() => null)) as { id?: unknown } | null)?.id : undefined;
    return { ok: res.ok, id: typeof id === "string" ? id : undefined };
  } catch (e) {
    console.error("[email] could not reach Resend", (e as Error).message);
    return { ok: false };
  }
}
