import "server-only";
import type { FamilyInfo } from "@/lib/model";
import { query } from "./db";

interface FamilyRow {
  id: string;
  trial_ends_at: number;
  plan: string;
  stripe_customer: string | null;
  subscription_status: string | null;
  subscription_interval: string | null;
  current_period_end: number | null;
  access_until: number | null;
  discount_code: string | null;
  /** From the discount code, when it is still enabled. */
  discount_percent: number | null;
  country: string | null;
  consent_at: number | null;
  updated_at: number;
}

export async function getFamilyRow(id: string): Promise<FamilyRow | undefined> {
  return (
    await query<FamilyRow>(
      `SELECT f.*, rc.percent_off AS discount_percent FROM families f
       LEFT JOIN redeem_codes rc ON rc.code = f.discount_code AND rc.kind = 'discount' AND rc.disabled_at IS NULL
       WHERE f.id = ?`,
      [id],
    )
  )[0];
}

export function toFamilyInfo(row: FamilyRow, email: string, verified = true, student = false): FamilyInfo {
  return {
    account: { email, familyId: row.id, verified, ...(student ? { student: true } : {}) },
    plan: row.plan as FamilyInfo["plan"],
    trialEndsAt: Number(row.trial_ends_at),
    subscription: row.subscription_status
      ? {
          status: row.subscription_status,
          interval: (row.subscription_interval as "month" | "year" | null) ?? undefined,
          currentPeriodEnd: row.current_period_end ? Number(row.current_period_end) : undefined,
        }
      : undefined,
    // Null rather than missing, so a device drops access that was taken away.
    accessUntil: row.access_until ? Number(row.access_until) : null,
    discount: row.discount_code && row.discount_percent ? { code: row.discount_code, percentOff: Number(row.discount_percent) } : null,
    country: row.country === "US" ? "US" : "CA",
    consentAt: row.consent_at ? Number(row.consent_at) : null,
    updatedAt: Number(row.updated_at),
  };
}
