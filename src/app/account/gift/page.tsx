import type { Metadata } from "next";
import { GiftView } from "./GiftView";

export const metadata: Metadata = { title: "Give a gift", robots: { index: false, follow: false } };

export default function GiftPage() {
  return <GiftView />;
}
