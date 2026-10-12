// Maintenance mode: an admin switches it on in the panel (System tab) and every page except the home page
// answers with a short "under maintenance" message. The admin panel and what it needs to sign in keep working
// so it can be switched off again, and so do the machine endpoints that must never miss a call (payments,
// email delivery reports, unsubscribe links, the scheduled jobs and the uptime check). Devices that already
// have the kids' app or parent area saved keep using them offline: the service worker treats a maintenance
// answer like no connection, and progress waits on the device until sync works again.
// The check runs in src/proxy.ts; this file holds the rules and the page, so they can be tested.

/** Header on every maintenance answer, so the service worker and the sync can tell it from a real error. */
export const MAINTENANCE_HEADER = "x-maintenance";
/** How long a server keeps the switch's state before reading it again. */
export const MAINTENANCE_CACHE_MS = 15_000;
export const MAINTENANCE_RETRY_SECONDS = 600;
export const MAINTENANCE_MESSAGE = "The site is under maintenance. Please try again soon.";
/** What sync shows a parent while the site is down for maintenance. */
export const MAINTENANCE_SYNC_MESSAGE = "The site is under maintenance. Progress is saved on this device and uploads when it's back.";

const OPEN_EXACT = new Set(["/", "/opengraph-image", "/api/auth/login/", "/api/auth/logout/", "/api/auth/me/", "/api/health/", "/api/billing/webhook/", "/api/email/webhook/", "/api/email/unsubscribe/"]);
const OPEN_PREFIX = ["/admin/", "/api/admin/", "/api/cron/", "/_next/"];

/** Whether a path still works during maintenance. */
export function openDuringMaintenance(pathname: string): boolean {
  const path = pathname.endsWith("/") || /\.[a-z0-9]+$/i.test(pathname) ? pathname : `${pathname}/`;
  if (OPEN_EXACT.has(path) || OPEN_EXACT.has(pathname)) return true;
  // Files with an extension (icons, the manifest, the service worker, robots.txt, voice files) are static.
  if (/\.[a-z0-9]+$/i.test(pathname)) return true;
  return OPEN_PREFIX.some((p) => path.startsWith(p));
}

const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** The page shown instead of every other page. Self-contained: no scripts, one inline style. */
export function maintenancePage(appName: string): string {
  const name = escape(appName);
  return `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Under maintenance · ${name}</title>
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#fdfbf6;color:#0f172a;font:18px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;padding:16px;box-sizing:border-box}
main{max-width:32rem;text-align:center}
h1{font-size:1.75rem;margin:0 0 .5rem}
p{margin:0 0 1rem}
.icon{font-size:3rem;margin:0}
a{display:inline-block;min-height:44px;line-height:44px;padding:0 1.25rem;border-radius:12px;background:#0f172a;color:#fff;font-weight:700;text-decoration:none}
</style>
</head>
<body>
<main>
<p class="icon" aria-hidden="true">🛠️</p>
<h1>${name} is under maintenance</h1>
<p>We're making a few improvements and will be back soon. Anything a child practises on a device that already has ${name} saved is kept there and uploads when we're back.</p>
<a href="/">Go to the home page</a>
</main>
</body>
</html>
`;
}
