/**
 * Runs `fn` once the browser has painted the current frame, so whatever a tap just changed is on screen
 * before slower work starts. Animation frames don't run in a hidden tab, so a hidden tab runs it on the
 * next task instead. Returns a function that cancels it.
 */
export function afterPaint(fn: () => void): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  if (typeof requestAnimationFrame === "function" && typeof document !== "undefined" && document.visibilityState === "visible") {
    const frame = requestAnimationFrame(() => (timer = setTimeout(fn, 0)));
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }
  timer = setTimeout(fn, 0);
  return () => clearTimeout(timer);
}
