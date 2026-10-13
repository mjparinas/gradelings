import "server-only";
import { randomBytes } from "node:crypto";
import { CONSENT_FOLLOWUP_DELAY_MS, CONSENT_NOTICE_VERSION } from "@/lib/coppa";
import { query, run } from "./db";
import { deleteChildData } from "./deleteFamily";
import { sendEmail } from "./email";
import { consentEmail } from "./emailTemplates";

// US parental consent (COPPA "email plus"; the rules are in src/lib/coppa.ts). Only families whose country is
// "US" ever reach this: Canadian families, and class student accounts (covered by their school), never do.

export type ConsentMethod = "email-plus" | "payment";

/** The token in the consent emails' withdraw link, made once per family. */
async function consentToken(familyId: string): Promise<string> {
  const rows = await query<{ consent_token: string | null }>("SELECT consent_token FROM families WHERE id = ?", [familyId]);
  if (rows[0]?.consent_token) return rows[0].consent_token;
  const token = randomBytes(24).toString("base64url");
  await run("UPDATE families SET consent_token = ? WHERE id = ? AND consent_token IS NULL", [token, familyId]);
  return (await query<{ consent_token: string }>("SELECT consent_token FROM families WHERE id = ?", [familyId]))[0].consent_token;
}

/**
 * Records a US parent's consent (unless it is already recorded) and emails the confirmation to `email`.
 * A paid checkout also counts as consent under COPPA; the webhook records it with method "payment", but the
 * app never relies on it: the parent area still shows the notice to any US family without consent.
 * Returns false when there was nothing to record (not a US family, or consent already given).
 */
export async function recordConsent(familyId: string, method: ConsentMethod, email: string | null, origin: string, now = Date.now()): Promise<boolean> {
  const changed = await run(
    `UPDATE families SET consent_at = ?, consent_version = ?, consent_method = ?, consent_followup_at = NULL, updated_at = ?
     WHERE id = ? AND country = 'US' AND consent_at IS NULL`,
    [now, CONSENT_NOTICE_VERSION, method, now, familyId],
  );
  if (!changed) return false;
  if (email) await sendEmail(consentEmail(email, origin, await consentToken(familyId)));
  return true;
}

/**
 * Withdraws consent: the children's information is deleted from the server straight away (the same statements
 * as deleting the account) and sync stops uploading it again until a parent consents anew. The parent's account,
 * plan and billing stay. Returns false when there was no consent to withdraw.
 */
export async function revokeConsent(familyId: string, now = Date.now()): Promise<boolean> {
  const changed = await run("UPDATE families SET consent_at = NULL, consent_followup_at = NULL, consent_revoked_at = ?, updated_at = ? WHERE id = ? AND consent_at IS NOT NULL", [
    now,
    now,
    familyId,
  ]);
  if (!changed) return false;
  await deleteChildData(familyId);
  return true;
}

/** The family a withdraw link belongs to, or null for a link that isn't ours. */
export async function familyForConsentToken(token: string): Promise<string | null> {
  if (!token || token.length > 100) return null;
  return (await query<{ id: string }>("SELECT id FROM families WHERE consent_token = ?", [token]))[0]?.id ?? null;
}

/**
 * The delayed confirmation ("email plus"): once, a day or more after consent, to the family's parent accounts.
 * Run by the daily job. A failed send is retried the next day.
 */
export async function sendConsentFollowUps(origin: string, now = Date.now()): Promise<number> {
  const due = await query<{ id: string }>(
    "SELECT id FROM families WHERE country = 'US' AND consent_at IS NOT NULL AND consent_followup_at IS NULL AND consent_at <= ?",
    [now - CONSENT_FOLLOWUP_DELAY_MS],
  );
  let sent = 0;
  for (const f of due) {
    try {
      const parents = await query<{ email: string }>("SELECT email FROM parents WHERE family_id = ? AND role = 'parent' AND email_bounced_at IS NULL", [f.id]);
      if (!parents.length) continue;
      const token = await consentToken(f.id);
      let ok = false;
      for (const p of parents) ok = (await sendEmail(consentEmail(p.email, origin, token, true))).ok || ok;
      if (ok) {
        await run("UPDATE families SET consent_followup_at = ? WHERE id = ?", [now, f.id]);
        sent++;
      }
    } catch (e) {
      console.error("[consent] follow-up failed for one family", (e as Error).message);
    }
  }
  return sent;
}
