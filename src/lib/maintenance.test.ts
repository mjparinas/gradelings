import { describe, expect, it } from "vitest";
import { maintenancePage, openDuringMaintenance } from "./maintenance";

describe("openDuringMaintenance", () => {
  it("keeps the home page, the admin panel, signing in, machine endpoints and static files open", () => {
    for (const p of [
      "/",
      "/admin",
      "/admin/",
      "/api/admin/stats/",
      "/api/auth/login/",
      "/api/auth/login",
      "/api/auth/me/",
      "/api/auth/logout/",
      "/api/health/",
      "/api/billing/webhook/",
      "/api/email/webhook/",
      "/api/email/unsubscribe/",
      "/api/cron/watch/",
      "/opengraph-image",
      "/_next/image",
      "/sw.js",
      "/manifest.webmanifest",
      "/icon-192.png",
      "/robots.txt",
      "/supertonic/3/en.onnx",
    ])
      expect(openDuringMaintenance(p), p).toBe(true);
  });

  it("closes everything else", () => {
    for (const p of ["/play/", "/play", "/parents/", "/pricing/", "/curriculum/bc/grade-4/", "/teachers/", "/shared/token/", "/api/sync/", "/api/auth/signup/", "/api/flags/", "/api/billing/checkout/", "/administrator/", "/api/admins/"])
      expect(openDuringMaintenance(p), p).toBe(false);
  });
});

describe("maintenancePage", () => {
  it("names the app, links home, runs no scripts and escapes the name", () => {
    const html = maintenancePage("Gradelings");
    expect(html).toContain("<title>Under maintenance · Gradelings</title>");
    expect(html).toContain('<a href="/">Go to the home page</a>');
    expect(html).toContain('<meta name="robots" content="noindex">');
    expect(html).not.toContain("<script");
    expect(html).not.toMatch(/ style="/);
    expect(maintenancePage('<b>"x"</b>')).toContain("&lt;b&gt;&quot;x&quot;&lt;/b&gt;");
  });
});
