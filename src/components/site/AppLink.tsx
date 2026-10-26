"use client";

import Link, { useLinkStatus } from "next/link";
import type { ReactNode } from "react";

/**
 * A link into one of the apps (/play/, /parents/, /teachers/) from a public page. The apps are big
 * single-page bundles, so they aren't prefetched; a tap then waits on that download. While it does,
 * the button shows a small spinner, so a tap always gets an answer.
 */
export function AppLink({ href, className = "", children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <Link prefetch={false} href={href} className={className}>
      <Spinner />
      {children}
    </Link>
  );
}

/** Takes no space until a tap is waiting, and waits a moment before showing so fast taps don't flash. */
function Spinner() {
  const { pending } = useLinkStatus();
  return <span aria-hidden="true" data-pending={pending || undefined} className="link-spinner" />;
}
