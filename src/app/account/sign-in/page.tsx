import type { Metadata } from "next";
import Link from "next/link";
import { SitePage } from "@/components/site/SiteChrome";
import { PARENT_SIGN_IN, STUDENT_SIGN_IN } from "@/lib/accountLinks";
import { TEACHER_SIGNUP } from "@/components/site/teachers";

export const metadata: Metadata = { title: "Sign in", robots: { index: false, follow: false } };

const WAYS = [
  { who: "I'm a parent", note: "See your children's progress and reports, or manage your plan.", href: PARENT_SIGN_IN, label: "Parent sign in" },
  { who: "I'm a teacher", note: "Your classes, assignments and student results.", href: TEACHER_SIGNUP, label: "Teacher sign in" },
  { who: "I'm a student with a code", note: "Type the code from your login card.", href: STUDENT_SIGN_IN, label: "Sign in with a code" },
];

export default function SignInChooser() {
  return (
    <SitePage>
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-bold">Sign in</h1>
        <p className="mt-2 font-read text-lg text-ink-soft">Who is signing in?</p>
        <ul className="mt-6 flex flex-col gap-4">
          {WAYS.map((w) => (
            <li key={w.who} className="card flex flex-col gap-3 p-5">
              <h2 className="text-2xl font-bold">{w.who}</h2>
              <p className="font-read text-ink-soft">{w.note}</p>
              {/* The apps are big single-page bundles: fetch them on tap. */}
              <Link prefetch={false} href={w.href} className="btn btn-good min-h-12 px-6 text-lg">
                {w.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-read text-ink-soft">
          New here? <Link className="font-semibold underline" href="/pricing/">See pricing</Link> or <Link prefetch={false} className="font-semibold underline" href="/play/">try it free</Link>.
        </p>
      </div>
    </SitePage>
  );
}
