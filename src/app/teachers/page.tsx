import type { Metadata } from "next";
import { TeacherGate } from "@/components/teachers/TeacherGate";

export const metadata: Metadata = {
  title: "For teachers",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TeacherGate />;
}
