"use client";

import Link from "next/link";
import { useEffect } from "react";
import { reportHandled } from "@/lib/reportError";

/** The safety net for any page: an unexpected error shows this instead of a crash screen, and is reported. */
export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => reportHandled(error), [error]);
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold">Oops, something got mixed up</h1>
      <p className="max-w-md text-lg text-ink-soft">Nothing is lost. Your progress is saved on this device. Let&apos;s try again.</p>
      <button type="button" className="rounded-xl bg-[#4f8ef7] px-6 py-3 text-lg font-bold text-[#0f172a]" onClick={reset}>
        Try again
      </button>
      <Link className="font-semibold underline" href="/">
        Go to the home page
      </Link>
    </main>
  );
}
