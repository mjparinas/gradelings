// The browser side of notifications: ask permission, subscribe through the service worker and tell the server.
// Only the parent area calls this (a child never sees a permission prompt). What this device is set to is kept in
// localStorage (`gradelings.push`: "parent", or a child's profile id) just so the switch can show it.

const KEY = "gradelings.push";

export type PushTarget = { kind: "parent" } | { kind: "child"; profileId: string };

export function pushSupported(): boolean {
  return typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
}

export function savedTarget(): string {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

function remember(v: string) {
  try {
    if (v) localStorage.setItem(KEY, v);
    else localStorage.removeItem(KEY);
  } catch {
    // Private mode: the switch just won't remember.
  }
}

export function urlBase64ToBytes(b64: string): Uint8Array {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

export async function pushStatus(): Promise<{ enabled: boolean; publicKey: string | null }> {
  const res = await fetch("/api/push/", { credentials: "same-origin" }).catch(() => null);
  if (!res?.ok) return { enabled: false, publicKey: null };
  return (await res.json()) as { enabled: boolean; publicKey: string | null };
}

/** Turns notifications on for this device. Returns an error sentence, or "" when it worked. */
export async function enablePush(target: PushTarget): Promise<string> {
  if (!pushSupported()) return "This browser can't show notifications. On an iPhone or iPad, add Gradelings to the Home Screen first.";
  const { enabled, publicKey } = await pushStatus();
  if (!enabled || !publicKey) return "Notifications aren't available right now.";
  const permission = Notification.permission === "default" ? await Notification.requestPermission() : Notification.permission;
  if (permission !== "granted") return "Notifications are blocked for this site. Allow them in your browser's settings and try again.";
  const reg = await navigator.serviceWorker.ready;
  const sub = (await reg.pushManager.getSubscription()) ?? (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToBytes(publicKey) as BufferSource }));
  const res = await fetch("/api/push/", {
    method: "POST",
    credentials: "same-origin",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ subscription: sub.toJSON(), ...target }),
  }).catch(() => null);
  if (!res?.ok) {
    const data = (await res?.json().catch(() => ({}))) as { error?: string } | undefined;
    return data?.error ?? "You're offline. Try again when connected.";
  }
  remember(target.kind === "parent" ? "parent" : target.profileId);
  return "";
}

export async function disablePush(): Promise<void> {
  remember("");
  if (!pushSupported()) return;
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return;
  await fetch("/api/push/", { method: "DELETE", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ endpoint: sub.endpoint }) }).catch(() => null);
  await sub.unsubscribe().catch(() => false);
}
