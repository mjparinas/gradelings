import { describe, expect, it } from "vitest";
import { maintenancePage, openDuringMaintenance } from "./maintenance";

// Which paths keep working in maintenance mode, found by mutation testing (`npm run test:mutation:server`).

describe("openDuringMaintenance", () => {
  it("keeps the pages that must always answer, with or without the trailing slash", () => {
    for (const p of ["/", "/api/health/", "/api/health", "/api/billing/webhook/", "/api/billing/webhook", "/api/auth/login/", "/api/auth/magic/verify/", "/api/auth/me/", "/api/email/unsubscribe/", "/opengraph-image"]) {
      expect(openDuringMaintenance(p), p).toBe(true);
    }
  });

  it("keeps the admin panel, cron jobs and build files open by prefix", () => {
    for (const p of ["/admin/", "/admin", "/admin/users/", "/api/admin/codes/", "/api/admin/codes", "/api/cron/daily/", "/api/cron/daily", "/_next/static/chunk.js"]) {
      expect(openDuringMaintenance(p), p).toBe(true);
    }
  });

  it("keeps static files (anything with an extension) open", () => {
    for (const p of ["/manifest.webmanifest", "/sw.js", "/robots.txt", "/piper/3/voice.onnx", "/icons/a1.png", "/a.B2"]) expect(openDuringMaintenance(p), p).toBe(true);
    expect(openDuringMaintenance("/play.")).toBe(false);
  });

  it("closes everything else", () => {
    for (const p of ["/play/", "/play", "/parents/", "/api/sync/", "/api/sync", "/api/auth/signup/", "/api/billing/checkout/", "/api/codes/redeem/", "/administrator/", "/api/administrator/", "/curriculum/bc/", "/api/healthy/"]) {
      expect(openDuringMaintenance(p), p).toBe(false);
    }
  });
});

describe("maintenancePage", () => {
  it("escapes the app name and stays self-contained", () => {
    const html = maintenancePage(`A&B <"x">`);
    expect(html).toContain("A&amp;B &lt;&quot;x&quot;&gt;");
    expect(html).not.toContain(`<"x">`);
    expect(html).not.toContain("<script");
  });
});
