import { error, getSession, json, sameOrigin } from "@/server/auth";
import { appleIapConfigured, applyAppleTransaction, decodeAppleJws } from "@/server/apple";
import { getFamilyRow, toFamilyInfo } from "@/server/family";
import { run } from "@/server/db";

// The iOS shell posts the StoreKit 2 signed transaction after purchase or restore.
// Configure products in App Store Connect; see docs/IOS.md.

export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Please sign in first.");
  if (!session.verified) return error(403, "Please confirm your email first.");
  if (!appleIapConfigured()) return error(503, "Apple subscriptions aren't set up yet.");

  const body = (await req.json().catch(() => ({}))) as { signedTransaction?: string };
  if (!body.signedTransaction) return error(400, "Missing purchase.");

  let tx;
  try {
    tx = decodeAppleJws(body.signedTransaction);
  } catch (e) {
    return error(400, (e as Error).message);
  }

  const now = Date.now();
  // Idempotent on transaction id so retries from a flaky network don't double-apply.
  if ((await run("INSERT OR IGNORE INTO apple_events (id, created_at) VALUES (?, ?)", [tx.transactionId, now])) === 0) {
    const row = await getFamilyRow(session.familyId);
    return json({ family: row ? toFamilyInfo(row, session.email, session.verified) : null });
  }
  try {
    await applyAppleTransaction(session.familyId, tx, now);
  } catch (e) {
    await run("DELETE FROM apple_events WHERE id = ?", [tx.transactionId]);
    return error(400, (e as Error).message);
  }

  const row = await getFamilyRow(session.familyId);
  if (!row) return error(401, "Not signed in");
  return json({ family: toFamilyInfo(row, session.email, session.verified) });
}
