"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { MAIN_ID, SkipLink } from "@/components/SkipLink";
import { APP_NAME } from "@/lib/brand";
import { call } from "@/lib/classroom";
import { knownTeacher, rememberTeacher } from "@/lib/teacherHint";
import { AuthForm } from "./TeacherAuth";
import { TeacherLoading, Wordmark } from "./TeacherChrome";

// The classes, assignments and curriculum content are most of this page's code, and someone creating an account
// needs none of it. It loads only once there is a teacher to show it to.
const TeacherApp = dynamic(() => import("./TeacherApp").then((m) => m.TeacherApp), { ssr: false, loading: () => <Shell><TeacherLoading /></Shell> });

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#f6f5f1]">
      <SkipLink />
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur print:hidden" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-2 px-4 py-3">
          <span className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-bold tracking-tight" aria-label={APP_NAME}>
              <Wordmark />
            </Link>
            <span className="text-lg font-semibold text-ink-soft">for teachers</span>
          </span>
          <Link href="/" className="font-semibold underline">Home</Link>
        </div>
      </header>
      <main id={MAIN_ID} tabIndex={-1} className="mx-auto max-w-4xl px-4 py-6">
        {children}
      </main>
    </div>
  );
}

/**
 * The front door of /teachers/. A visitor this device has never seen sign in gets the create-account form straight
 * away, without waiting for the page's code or the server; someone who was signed in gets the teacher area, which
 * checks the session itself. The server stays the judge: a visitor the hint got wrong is moved to the right screen
 * as soon as it answers.
 */
const noSubscribe = () => () => undefined;
// What this device's hint says; the server render, which can't read it, shows the loading card until the page wakes up.
const hintNow = () => (knownTeacher() ? "app" : "auth");
const hintOnServer = () => "pending";

export function TeacherGate() {
  const hint = useSyncExternalStore(noSubscribe, hintNow, hintOnServer);
  // Set once the server has said (or the form has made) a signed-in teacher the hint didn't know about.
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (hint !== "auth") return;
    let live = true;
    // Signed in without the hint (storage cleared, or a session from another profile): carry on to the area.
    call<{ family?: { account?: { student?: boolean } } }>("/api/auth/me/")
      .then((r) => {
        if (live && r.family && !r.family.account?.student) {
          rememberTeacher(true);
          setEntered(true);
        }
      })
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, [hint]);

  if (entered || hint === "app") return <TeacherApp />;
  return (
    <Shell>
      {hint === "pending" ? (
        <TeacherLoading />
      ) : (
        <AuthForm
          initialMode="up"
          onDone={() => {
            rememberTeacher(true);
            setEntered(true);
          }}
        />
      )}
    </Shell>
  );
}
