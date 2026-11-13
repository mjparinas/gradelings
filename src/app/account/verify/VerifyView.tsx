"use client";

import Link from "@/components/PublicLink";
import { useEffect, useState } from "react";
import { LinkCard } from "../AccountLinkPage";

export function VerifyView() {
  const [state, setState] = useState<"working" | "ok" | "failed">("working");
  const [error, setError] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [teacher, setTeacher] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const token = q.get("token") ?? "";
    if (q.get("to") === "teachers") queueMicrotask(() => setTeacher(true));
    window.history.replaceState(null, "", window.location.pathname);
    const request = token
      ? fetch("/api/auth/verify/", {
          method: "POST",
          credentials: "same-origin",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token }),
        })
      : Promise.reject(new Error("This link isn’t valid. Open the link from your email."));
    void request
      .then(async (res) => {
        const data = (await res.json().catch(() => ({}))) as { error?: string; signedIn?: boolean };
        if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
        if (data.signedIn) {
          setSignedIn(true);
          if (q.get("to") === "teachers") {
            const { rememberTeacher } = await import("@/lib/teacherHint");
            rememberTeacher(true);
          }
          // For a parent, the parent area takes the account the server just signed in (?signedin=1) and uploads this device's practice.
        }
        setState("ok");
      })
      .catch((e: Error) => {
        setError(e.message);
        setState("failed");
      });
  }, []);

  return (
    <LinkCard title={state === "ok" ? "Email confirmed" : state === "failed" ? "We couldn’t confirm that" : "Confirming…"}>
      {state === "ok" && <p className="font-read text-lg">Thank you! Your email address is confirmed{signedIn ? ", and you’re signed in on this device" : ""}.</p>}
      {state === "ok" && signedIn && !teacher && <p className="font-read text-lg">One last step, about a minute: add your child’s first name and grade so lessons match what they’re learning.</p>}
      {state === "failed" && <p className="font-read text-lg">{error}</p>}
      <Link href={teacher ? "/teachers/" : signedIn ? "/parents/?signedin=1&addchild=1#/children" : "/parents/"} className="btn btn-good min-h-14 text-xl">
        {teacher ? "Go to the teacher area" : signedIn ? "Add my child" : "Go to the Parent area"}
      </Link>
    </LinkCard>
  );
}
