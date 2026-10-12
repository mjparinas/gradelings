"use client";

import type { MouseEvent } from "react";

/** The id (with `tabIndex={-1}`) that every page's `<main>` carries so the skip link can focus it. */
export const MAIN_ID = "main";

/**
 * "Skip to main content" (WCAG 2.4.1). Hidden until it has keyboard focus.
 * The parent, teacher and admin areas use hash routes, so following `#main`
 * would change the screen; the click handler moves focus without touching the URL.
 */
export function SkipLink() {
  const skip = (e: MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById(MAIN_ID);
    if (!main) return;
    e.preventDefault();
    main.focus(); // scrolls only if the main content is off screen
  };
  return (
    <a href={`#${MAIN_ID}`} onClick={skip} className="skip-link">
      Skip to main content
    </a>
  );
}
