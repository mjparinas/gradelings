import type { Metadata } from "next";
import { MagicForm } from "./MagicForm";

export const metadata: Metadata = { title: "Sign in", robots: { index: false, follow: false } };

export default function MagicPage() {
  return <MagicForm />;
}
