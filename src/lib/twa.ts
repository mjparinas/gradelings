// Detects the store apps: the Android app (a Trusted Web Activity, see docs/ANDROID.md) and the
// iPhone and iPad app (a native shell around WKWebView, see docs/IOS.md). Google Play and the
// App Store don't allow selling subscriptions inside an app through an outside checkout, so the
// apps show no prices or payment buttons, and the plan shows up after sync.
//
// The Android app opens /play/?app=android (startUrl in android/twa-manifest.json). Chrome also reports
// document.referrer as android-app://<package> on a cold start. The iOS app opens /play/?app=ios
// (GradelingsStartPath in ios/Gradelings/Info.plist) and adds IOS_APP_AGENT to its user agent, so
// every page it loads knows, even after a reload. The flag is kept in sessionStorage, so the parent
// area (a separate page load) still knows, but ordinary browser tabs never get it.

const KEY = "grademap.android-app";
const IOS_KEY = "grademap.ios-app";

/** Added to the user agent by the iOS app (applicationNameForUserAgent in WebViewController.swift). */
export const IOS_APP_AGENT = "GradelingsApp-iOS";

function detect(key: string, fromApp: () => boolean): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.sessionStorage.getItem(key)) return true;
    const yes = fromApp();
    if (yes) window.sessionStorage.setItem(key, "1");
    return yes;
  } catch {
    return false;
  }
}

export function isAndroidApp(): boolean {
  return detect(KEY, () => new URLSearchParams(window.location.search).get("app") === "android" || document.referrer.startsWith("android-app://"));
}

export function isIosApp(): boolean {
  return detect(IOS_KEY, () => new URLSearchParams(window.location.search).get("app") === "ios" || navigator.userAgent.includes(IOS_APP_AGENT));
}

/** Either store app: no prices, payment buttons or subscribe prompts. */
export function isStoreApp(): boolean {
  return isAndroidApp() || isIosApp();
}
