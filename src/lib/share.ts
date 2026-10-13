// Sharing without third-party scripts: the device's own share sheet (Web Share API) on touch
// devices, otherwise the link is copied. Resolves to what happened, so the button can say so.

export type ShareResult = "shared" | "copied" | "cancelled" | "failed";

function coarsePointer(): boolean {
  return typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;
}

export async function shareOrCopy(url: string, title: string, text?: string): Promise<ShareResult> {
  if (typeof navigator.share === "function" && coarsePointer()) {
    try {
      await navigator.share({ title, text, url });
      return "shared";
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return "cancelled";
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    return "copied";
  } catch {
    return "failed";
  }
}
