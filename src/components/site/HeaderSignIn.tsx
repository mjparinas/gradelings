"use client";

import { useSyncExternalStore } from "react";
import { PARENT_ACCOUNT, SIGN_IN_CHOOSER } from "@/lib/accountLinks";
import { knownParent } from "@/lib/parentHint";
import { knownTeacher } from "@/lib/teacherHint";
import { TEACHER_SIGNUP } from "./teachers";
import { AppLink } from "./AppLink";

const noSubscribe = () => () => {};

/**
 * The header's account button. A visitor sees "Sign in", which opens the chooser (parent, teacher or student with a
 * code). A device that has had a parent or teacher account on it sees "My account" and goes straight there. The
 * hint is read after hydration, so the prerendered page always says "Sign in".
 */
export function HeaderSignIn() {
  const kind = useSyncExternalStore(
    noSubscribe,
    () => (knownParent() ? "parent" : knownTeacher() ? "teacher" : "none"),
    () => "none",
  );
  const href = kind === "parent" ? PARENT_ACCOUNT : kind === "teacher" ? TEACHER_SIGNUP : SIGN_IN_CHOOSER;
  return (
    // The apps are big single-page bundles: fetch them on tap, not on every public page view.
    <AppLink href={href} className="inline-flex h-11 items-center rounded-lg px-2 text-sm font-semibold hover:bg-black/5 sm:text-base">
      {kind === "none" ? "Sign in" : "My account"}
    </AppLink>
  );
}
