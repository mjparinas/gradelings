"use client";

import { useEffect, useRef, type ReactNode } from "react";

// A modal for the teacher area that behaves for keyboard and screen-reader users: focus moves in when
// it opens, Tab stays inside, Escape closes it and focus goes back to what opened it.

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function TeacherDialog({ title, onClose, children, wide }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  // The close handler may change on every render; the effects below must not re-run for it.
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });

  useEffect(() => {
    const before = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const el = box.current;
    // Start on the first control, so a keyboard user can act at once.
    (el?.querySelector<HTMLElement>(FOCUSABLE) ?? el)?.focus();
    return () => before?.focus?.();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close.current();
        return;
      }
      if (e.key !== "Tab" || !box.current) return;
      const items = [...box.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !box.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !box.current.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div ref={box} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} className={`max-h-[92vh] w-full overflow-y-auto rounded-3xl border-2 border-line bg-white p-6 outline-none ${wide ? "max-w-3xl" : "max-w-md"}`} onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
        {children}
      </div>
    </div>
  );
}
