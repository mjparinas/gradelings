"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * A main-menu link. The current page is marked with `aria-current` and is not prefetched (the home page
 * was spending a prefetch slot on itself, ahead of the pages a visitor might open next). A thin bar
 * under the label shows when a tapped page is still on its way, so a tap always gets an answer.
 */
export function NavLink({ href, className = "", label, children }: { href: string; className?: string; /** Its accessible name, when the text isn't. */ label?: string; children: ReactNode }) {
  const current = sameRoute(usePathname(), href);
  return (
    <Link href={href} prefetch={current ? false : undefined} aria-current={current ? "page" : undefined} aria-label={label} className={`relative ${className}`}>
      {children}
      <PendingBar />
    </Link>
  );
}

/** `usePathname` may or may not carry the trailing slash the site's URLs end in. */
export function sameRoute(pathname: string | null, href: string): boolean {
  const trim = (p: string) => p.replace(/\/+$/, "") || "/";
  return pathname !== null && trim(pathname) === trim(href);
}

/** Always rendered and fixed in size, so showing it never moves the layout. */
function PendingBar() {
  const { pending } = useLinkStatus();
  return <span aria-hidden="true" data-pending={pending || undefined} className="nav-pending" />;
}
