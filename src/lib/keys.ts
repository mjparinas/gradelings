import { useEffect, type RefObject } from "react";

// Keyboard shortcuts for questions, for children on a Chromebook, a keyboard or a switch.

/** True when a shortcut must not fire: a modifier is held, or the child is typing in a field. */
export function shortcutBlocked(e: KeyboardEvent): boolean {
  if (e.defaultPrevented || e.repeat || e.altKey || e.ctrlKey || e.metaKey) return true;
  const t = e.target;
  if (!(t instanceof HTMLElement)) return false;
  return t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName);
}

/** True when Enter belongs to the focused control (a button or link presses itself). */
export function onControl(e: KeyboardEvent): boolean {
  const t = e.target;
  return t instanceof HTMLElement && t.closest("button, a[href], [role='button']") !== null;
}

/** The choice a number key picks: "1" is the first choice. Null when the key picks nothing. */
export function choiceIndexForKey(key: string, count: number): number | null {
  if (!/^[1-9]$/.test(key)) return null;
  const i = Number(key) - 1;
  return i < count ? i : null;
}

/** Enter presses the question's Check button, unless focus is on another control. */
export function useCheckShortcut(button: RefObject<HTMLButtonElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || shortcutBlocked(e) || onControl(e)) return;
      const b = button.current;
      if (!b || b.disabled) return;
      e.preventDefault();
      b.click();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [button, enabled]);
}
