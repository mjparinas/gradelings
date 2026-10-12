import { NextResponse, type NextRequest } from "next/server";
import { noncePolicy } from "@/lib/csp.mjs";
import { APP_NAME } from "@/lib/brand";
import { MAINTENANCE_HEADER, MAINTENANCE_MESSAGE, MAINTENANCE_RETRY_SECONDS, maintenancePage, openDuringMaintenance } from "@/lib/maintenance";
import { maintenanceOn } from "@/server/maintenance";

// Two jobs:
// - Maintenance mode (switched in the admin panel): every page and API route except the home page, the admin
//   panel and a few machine endpoints answers 503 with a short message (src/lib/maintenance.ts).
// - Shared reports and shared milestone cards are rendered on every request, so they can't be hashed
//   at build time like the other pages. Next.js reads the nonce from the request's policy and puts it on its own scripts.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!openDuringMaintenance(pathname) && (await maintenanceOn())) {
    const headers = { "Cache-Control": "no-store", "Retry-After": String(MAINTENANCE_RETRY_SECONDS), [MAINTENANCE_HEADER]: "on" };
    if (pathname.startsWith("/api/")) return NextResponse.json({ error: MAINTENANCE_MESSAGE }, { status: 503, headers });
    return new NextResponse(maintenancePage(APP_NAME), { status: 503, headers: { ...headers, "Content-Type": "text/html; charset=utf-8" } });
  }
  if (!pathname.startsWith("/shared/") && !pathname.startsWith("/milestone/")) return NextResponse.next();
  if (process.env.NODE_ENV === "development") return NextResponse.next(); // next.config.ts sets a dev policy
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const policy = noncePolicy(nonce);
  const headers = new Headers(request.headers);
  headers.set("Content-Security-Policy", policy);
  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Security-Policy", policy);
  return response;
}

// Everything but build files and files with an extension (icons, the manifest, the service worker, voices).
export const config = { matcher: "/((?!_next/static|_next/image|.*\\.[A-Za-z0-9]+$).*)" };
