"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * An expandable section. The answer stays in the page (hidden until opened)
 * so it is still there for search engines and for people using find-in-page.
 */
export function Disclosure({
  title,
  children,
  open,
  className = "",
  titleClassName = "font-semibold",
}: {
  title: ReactNode;
  children: ReactNode;
  /** Starts open, and opens or closes again when this value changes. A tap still toggles it. */
  open?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  const panelId = useId();
  const [shown, setShown] = useState(open ?? false);
  const [trackedOpen, setTrackedOpen] = useState(open);
  if (open !== trackedOpen) {
    setTrackedOpen(open);
    if (open !== undefined) setShown(open);
  }

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={shown}
        aria-controls={panelId}
        onClick={() => setShown((v) => !v)}
        className={`flex min-h-11 w-full items-center justify-between gap-3 text-left ${titleClassName}`}
      >
        <span className="min-w-0">{title}</span>
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" className={`shrink-0 transition-transform ${shown ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div id={panelId} hidden={!shown}>
        {children}
      </div>
    </div>
  );
}
