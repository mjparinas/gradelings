import type { Metadata } from "next";
import { JoinFamilyView } from "./JoinFamilyView";

export const metadata: Metadata = { title: "Join a family", robots: { index: false, follow: false } };

export default function JoinFamilyPage() {
  return <JoinFamilyView />;
}
