import "server-only";
import { createPublicKey, verify } from "node:crypto";
import { IOS_BUNDLE_ID, IOS_PRODUCTS } from "@/lib/ios";
import { query, run } from "./db";

/** True when bundle and product ids resolve (defaults match App Store Connect). */
export function appleIapConfigured(): boolean {
  return !!appleBundleId() && !!appleProductId("month") && !!appleProductId("year");
}

export function appleBundleId(): string {
  return process.env.APPLE_BUNDLE_ID?.trim() || IOS_BUNDLE_ID;
}

export function appleProductId(interval: "month" | "year"): string {
  if (interval === "year") return process.env.APPLE_IAP_YEARLY?.trim() || IOS_PRODUCTS.year;
  return process.env.APPLE_IAP_MONTHLY?.trim() || IOS_PRODUCTS.month;
}

export function intervalForProduct(productId: string): "month" | "year" | null {
  if (productId === appleProductId("year")) return "year";
  if (productId === appleProductId("month")) return "month";
  return null;
}

/** Accept decoded-but-unsigned payloads only outside production (unit tests and local staging). */
export function appleAllowUnsigned(): boolean {
  return process.env.APPLE_IAP_ALLOW_UNSIGNED === "1" && process.env.NODE_ENV !== "production";
}

export interface AppleTransaction {
  transactionId: string;
  originalTransactionId: string;
  productId: string;
  bundleId: string;
  /** Expiry in ms since epoch; null if missing. */
  expiresAt: number | null;
  /** Purchase / signed date for ordering, ms since epoch. */
  signedAt: number;
  environment?: string;
}

type JwsHeader = { alg?: string; x5c?: string[] };

/**
 * Decode a StoreKit 2 transaction JWS.
 * When unsigned mode is off, verifies the ES256 signature with the leaf certificate in `x5c`
 * and requires an Apple intermediate in the chain (x5c length ≥ 2).
 */
export function decodeAppleJws(jws: string): AppleTransaction {
  const payload = decodeAndVerify(jws);
  return transactionFromPayload(payload);
}

/** App Store Server Notifications V2: outer JWS → data.signedTransactionInfo (inner JWS). */
export function decodeAppleNotification(jws: string): { notificationType: string; transaction: AppleTransaction | null } {
  const outer = decodeAndVerify(jws);
  const notificationType = String(outer.notificationType ?? "");
  const data = outer.data as Record<string, unknown> | undefined;
  const signedTx = typeof data?.signedTransactionInfo === "string" ? data.signedTransactionInfo : null;
  return {
    notificationType,
    transaction: signedTx ? decodeAppleJws(signedTx) : null,
  };
}

function decodeAndVerify(jws: string): Record<string, unknown> {
  const parts = jws.split(".");
  if (parts.length !== 3) throw new Error("Bad Apple transaction.");
  const [headerB64, payloadB64, sigB64] = parts;
  const header = JSON.parse(b64urlToString(headerB64)) as JwsHeader;
  if (!appleAllowUnsigned()) {
    if (header.alg !== "ES256" || !header.x5c?.length) throw new Error("Apple transaction is missing a signature.");
    verifyEs256(headerB64, payloadB64, sigB64, header.x5c);
  }
  return JSON.parse(b64urlToString(payloadB64)) as Record<string, unknown>;
}

function transactionFromPayload(tx: Record<string, unknown>): AppleTransaction {
  const productId = String(tx.productId ?? "");
  const bundleId = String(tx.bundleId ?? tx.bid ?? "");
  const originalTransactionId = String(tx.originalTransactionId ?? "");
  const transactionId = String(tx.transactionId ?? originalTransactionId);
  if (!productId || !originalTransactionId) throw new Error("Apple transaction is incomplete.");
  return {
    transactionId,
    originalTransactionId,
    productId,
    bundleId,
    expiresAt: num(tx.expiresDate),
    signedAt: num(tx.signedDate) ?? num(tx.purchaseDate) ?? Date.now(),
    environment: typeof tx.environment === "string" ? tx.environment : undefined,
  };
}

function num(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() && Number.isFinite(Number(v))) return Number(v);
  return null;
}

function b64urlToString(part: string): string {
  return Buffer.from(b64urlToBuf(part)).toString("utf8");
}

function b64urlToBuf(part: string): Buffer {
  const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  return Buffer.from(b64 + pad, "base64");
}

function verifyEs256(headerB64: string, payloadB64: string, sigB64: string, x5c: string[]) {
  if (x5c.length < 2) throw new Error("Apple transaction certificate chain is too short.");
  const key = createPublicKey(derToPem(x5c[0]));
  const ok = verify(
    "sha256",
    Buffer.from(`${headerB64}.${payloadB64}`),
    { key, dsaEncoding: "ieee-p1363" },
    b64urlToBuf(sigB64),
  );
  if (!ok) throw new Error("Apple transaction signature is invalid.");
}

function derToPem(derB64: string): string {
  const lines = derB64.replace(/\s+/g, "").match(/.{1,64}/g) ?? [];
  return `-----BEGIN CERTIFICATE-----\n${lines.join("\n")}\n-----END CERTIFICATE-----\n`;
}

/**
 * Apply a verified Apple transaction to a family. Active entitlements set premium;
 * an expired one clears premium when this original transaction is the one on file.
 */
export async function applyAppleTransaction(familyId: string, tx: AppleTransaction, now = Date.now()): Promise<void> {
  if (tx.bundleId && tx.bundleId !== appleBundleId()) {
    throw new Error("Apple transaction is for a different app.");
  }
  const interval = intervalForProduct(tx.productId);
  if (!interval) throw new Error("Unknown Apple product.");

  const active = tx.expiresAt == null || tx.expiresAt > now;
  if (await isStale(tx.signedAt, familyId, tx.originalTransactionId)) return;

  if (active) {
    await run(
      `UPDATE families SET apple_original_transaction_id = ?, subscription_status = 'active', subscription_interval = ?,
       current_period_end = ?, plan = 'premium', updated_at = ?, billing_event_at = ? WHERE id = ?`,
      [tx.originalTransactionId, interval, tx.expiresAt, now, tx.signedAt, familyId],
    );
    return;
  }

  await run(
    `UPDATE families SET subscription_status = 'canceled', plan = 'free', updated_at = ?, billing_event_at = ?
     WHERE id = ? AND apple_original_transaction_id = ?`,
    [now, tx.signedAt, familyId, tx.originalTransactionId],
  );
}

export async function familyIdForAppleTransaction(originalTransactionId: string): Promise<string | undefined> {
  const rows = await query<{ id: string }>("SELECT id FROM families WHERE apple_original_transaction_id = ?", [originalTransactionId]);
  return rows[0]?.id;
}

async function isStale(at: number, familyId: string, originalTransactionId: string): Promise<boolean> {
  const byFamily = await query<{ billing_event_at: number }>("SELECT billing_event_at FROM families WHERE id = ?", [familyId]);
  if (byFamily[0] && at < Number(byFamily[0].billing_event_at)) return true;
  const byTx = await query<{ billing_event_at: number }>(
    "SELECT billing_event_at FROM families WHERE apple_original_transaction_id = ?",
    [originalTransactionId],
  );
  return !!byTx[0] && at < Number(byTx[0].billing_event_at);
}

/** Unsigned test JWS for unit tests when APPLE_IAP_ALLOW_UNSIGNED=1. */
export function testAppleJws(tx: Partial<AppleTransaction> & Pick<AppleTransaction, "originalTransactionId" | "productId">): string {
  const header = Buffer.from(JSON.stringify({ alg: "none" })).toString("base64url");
  const body = Buffer.from(
    JSON.stringify({
      transactionId: tx.transactionId ?? tx.originalTransactionId,
      originalTransactionId: tx.originalTransactionId,
      productId: tx.productId,
      bundleId: tx.bundleId ?? appleBundleId(),
      expiresDate: tx.expiresAt ?? Date.now() + 86_400_000,
      signedDate: tx.signedAt ?? Date.now(),
      environment: tx.environment ?? "Sandbox",
    }),
  ).toString("base64url");
  return `${header}.${body}.e30`;
}
