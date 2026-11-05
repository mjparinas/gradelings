"use client";

import { useCallback, useEffect, useRef } from "react";

// Optional drag for tap-to-place questions. Tapping always works; dragging is a second way to do the same
// thing. A drag starts after the pointer moves a few pixels, shows a copy of the item under the finger, and
// on release finds the `data-drop` target under it. Nothing here is needed to answer, so keyboard, switch
// and screen-reader use are unchanged.

const START_PX = 10;

export interface DragHandlers {
  onPointerDown: (e: React.PointerEvent<HTMLElement>) => void;
  onClickCapture: (e: React.MouseEvent<HTMLElement>) => void;
  style: { touchAction: "none" };
}

/** `onDrop(itemId, targetId, targetEl)` runs when an item is let go over an element marked `data-drop="targetId"`. */
export function useDrag(onDrop: (itemId: string, targetId: string, target: Element) => void, enabled = true) {
  const drop = useRef(onDrop);
  useEffect(() => {
    drop.current = onDrop;
  });
  const cleanup = useRef<(() => void) | null>(null);
  const justDragged = useRef(false);

  useEffect(() => () => cleanup.current?.(), []);

  const dragProps = useCallback(
    (id: string): DragHandlers => ({
      style: { touchAction: "none" },
      onClickCapture: (e) => {
        // The click that follows a drag must not also place the item.
        if (justDragged.current) {
          e.preventDefault();
          e.stopPropagation();
          justDragged.current = false;
        }
      },
      onPointerDown: (e) => {
        if (!enabled || (e.pointerType === "mouse" && e.button !== 0) || e.isPrimary === false) return;
        const el = e.currentTarget;
        if ((el as HTMLButtonElement).disabled) return;
        cleanup.current?.();
        const startX = e.clientX;
        const startY = e.clientY;
        let ghost: HTMLElement | null = null;
        const rect = el.getBoundingClientRect();

        const move = (m: PointerEvent) => {
          if (m.pointerId !== e.pointerId) return;
          if (!ghost) {
            if (Math.hypot(m.clientX - startX, m.clientY - startY) < START_PX) return;
            ghost = el.cloneNode(true) as HTMLElement;
            ghost.removeAttribute("data-testid");
            ghost.setAttribute("aria-hidden", "true");
            ghost.tabIndex = -1;
            Object.assign(ghost.style, {
              position: "fixed",
              left: `${rect.left}px`,
              top: `${rect.top}px`,
              width: `${rect.width}px`,
              height: `${rect.height}px`,
              margin: "0",
              pointerEvents: "none",
              zIndex: "70",
              opacity: "0.92",
              transition: "none",
            });
            document.body.appendChild(ghost);
            el.style.opacity = "0.35";
          }
          ghost.style.transform = `translate(${m.clientX - startX}px, ${m.clientY - startY}px) scale(1.06)`;
        };

        const end = (u: PointerEvent | null) => {
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
          window.removeEventListener("pointercancel", cancel);
          cleanup.current = null;
          if (!ghost) return;
          ghost.remove();
          el.style.opacity = "";
          justDragged.current = true;
          // A click only follows when the pointer is released on the same element; don't leave the flag behind.
          setTimeout(() => (justDragged.current = false), 0);
          if (!u) return;
          const under = typeof document.elementFromPoint === "function" ? document.elementFromPoint(u.clientX, u.clientY) : null;
          const target = under?.closest("[data-drop]");
          const targetId = target?.getAttribute("data-drop");
          if (target && targetId) drop.current(id, targetId, target);
        };
        const up = (u: PointerEvent) => u.pointerId === e.pointerId && end(u);
        const cancel = (u: PointerEvent) => u.pointerId === e.pointerId && end(null);

        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
        window.addEventListener("pointercancel", cancel);
        cleanup.current = () => {
          ghost?.remove();
          el.style.opacity = "";
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
          window.removeEventListener("pointercancel", cancel);
        };
      },
    }),
    [enabled],
  );

  return dragProps;
}
