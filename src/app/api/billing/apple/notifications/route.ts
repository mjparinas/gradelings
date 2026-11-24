import { appleIapConfigured, applyAppleTransaction, decodeAppleNotification, familyIdForAppleTransaction } from "@/server/apple";
import { run } from "@/server/db";

// App Store Server Notifications V2.
// App Store Connect → App → App Store Server Notifications →
//   https://<domain>/api/billing/apple/notifications/

const ENDING = new Set(["EXPIRED", "REVOKE", "GRACE_PERIOD_EXPIRED", "REFUND"]);

export async function POST(req: Request) {
  if (!appleIapConfigured()) return new Response("not configured", { status: 503 });
  const payload = await req.text();
  let notificationType: string;
  let transaction;
  try {
    const decoded = decodeAppleNotification(payload);
    notificationType = decoded.notificationType;
    transaction = decoded.transaction;
  } catch {
    return new Response("Bad payload", { status: 400 });
  }
  if (!transaction) return new Response("ok");

  const now = Date.now();
  const eventId = `${notificationType}:${transaction.transactionId}`;
  if ((await run("INSERT OR IGNORE INTO apple_events (id, created_at) VALUES (?, ?)", [eventId, now])) === 0) {
    return new Response("ok");
  }

  const familyId = await familyIdForAppleTransaction(transaction.originalTransactionId);
  if (!familyId) {
    // Purchase may arrive before the client POST links the family; keep the event so we don't loop.
    return new Response("ok");
  }

  try {
    const ended = ENDING.has(notificationType);
    await applyAppleTransaction(
      familyId,
      ended ? { ...transaction, expiresAt: Math.min(transaction.expiresAt ?? now, now - 1) } : transaction,
      now,
    );
  } catch {
    await run("DELETE FROM apple_events WHERE id = ?", [eventId]);
    return new Response("retry", { status: 500 });
  }
  return new Response("ok");
}
