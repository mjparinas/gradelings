import type { Metadata } from "next";
import { WithdrawConsentView } from "./WithdrawConsentView";

export const metadata: Metadata = { title: "Withdraw permission", robots: { index: false, follow: false } };

export default function WithdrawConsentPage() {
  return <WithdrawConsentView />;
}
