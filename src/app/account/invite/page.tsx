import type { Metadata } from "next";
import { InviteView } from "./InviteView";

export const metadata: Metadata = { title: "You're invited", robots: { index: false, follow: false } };

export default function InvitePage() {
  return <InviteView />;
}
