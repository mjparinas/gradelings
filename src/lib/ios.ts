// Detects the iOS App Store shell (a thin WKWebView; see docs/IOS.md). Unlike Android,
// Canada requires StoreKit In-App Purchase for digital unlocks sold inside the app.
//
// The app opens /play/?app=ios. The Swift shell also sets window.__gradelingsIOS.
// The flag is kept in sessionStorage so the parent area (a separate page load) still knows.

const KEY = "grademap.ios-app";

/** Must match PRODUCT_BUNDLE_IDENTIFIER in ios/project.yml and App Store Connect. Never change after publishing. */
export const IOS_BUNDLE_ID = "ca.grademap.app";

/** StoreKit product ids — keep equal to ios/Gradelings/Store.swift and App Store Connect. */
export const IOS_PRODUCTS = {
  month: "ca.grademap.app.premium.month",
  year: "ca.grademap.app.premium.year",
} as const;

export type IosInterval = keyof typeof IOS_PRODUCTS;

declare global {
  interface Window {
    __gradelingsIOS?: boolean;
    __gradelingsNativeReply?: (id: number, result: unknown, error: string | null) => void;
    webkit?: { messageHandlers?: { gradelings?: { postMessage: (body: unknown) => void } } };
  }
}

export function isIosApp(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.sessionStorage.getItem(KEY)) return true;
    const fromApp =
      new URLSearchParams(window.location.search).get("app") === "ios" || window.__gradelingsIOS === true;
    if (fromApp) window.sessionStorage.setItem(KEY, "1");
    return fromApp;
  } catch {
    return false;
  }
}

export function hasIosBridge(): boolean {
  return typeof window !== "undefined" && !!window.webkit?.messageHandlers?.gradelings;
}

type Pending = { resolve: (v: unknown) => void; reject: (e: Error) => void };

const pending = new Map<number, Pending>();
let seq = 0;
let listening = false;

function ensureListener() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.__gradelingsNativeReply = (id, result, error) => {
    const p = pending.get(id);
    if (!p) return;
    pending.delete(id);
    if (error) p.reject(new Error(error));
    else p.resolve(result);
  };
}

function nativeCall(method: string, args: Record<string, unknown> = {}): Promise<unknown> {
  ensureListener();
  const handler = window.webkit?.messageHandlers?.gradelings;
  if (!handler) return Promise.reject(new Error("This action needs the App Store app."));
  const id = ++seq;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    handler.postMessage({ id, method, args });
  });
}

export interface IosPurchase {
  productId: string;
  signedTransaction: string;
  originalTransactionId: string;
}

export async function iosPurchase(interval: IosInterval): Promise<IosPurchase> {
  const result = await nativeCall("purchase", { productId: IOS_PRODUCTS[interval] });
  return result as IosPurchase;
}

export async function iosRestore(): Promise<IosPurchase[]> {
  const result = await nativeCall("restore");
  return (result as IosPurchase[]) ?? [];
}

export async function iosManageSubscriptions(): Promise<void> {
  await nativeCall("manageSubscriptions");
}

export async function iosUnlockParent(): Promise<boolean> {
  if (!hasIosBridge()) return false;
  try {
    return (await nativeCall("unlockParent")) === true;
  } catch {
    return false;
  }
}

export function iosHaptic(kind: "tap" | "correct" | "tryAgain" | "pop"): void {
  if (!hasIosBridge()) return;
  void nativeCall("haptic", { kind }).catch(() => {});
}
