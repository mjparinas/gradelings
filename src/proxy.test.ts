import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";

// Maintenance mode is tested with a database in src/server/maintenance.test.ts; here it is off.
vi.mock("@/server/maintenance", () => ({ maintenanceOn: async () => false }));

import { config, proxy } from "./proxy";

afterEach(() => vi.unstubAllEnvs());

const nonceOf = (policy: string | null) => /'nonce-([^']+)'/.exec(policy ?? "")?.[1];

describe("shared report proxy", () => {
  it("runs on every page and API route, but not on build files or files with an extension", () => {
    const re = new RegExp(`^${config.matcher}$`);
    for (const p of ["/", "/play/", "/shared/abc/", "/api/sync/"]) expect(re.test(p), p).toBe(true);
    for (const p of ["/_next/static/chunks/a.js", "/_next/image", "/sw.js", "/icon-192.png", "/manifest.webmanifest"]) expect(re.test(p), p).toBe(false);
  });

  it("leaves other pages alone", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const res = await proxy(new NextRequest("https://app.test/play/"));
    expect(res.headers.get("Content-Security-Policy")).toBeNull();
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });

  it("gives each response a fresh script nonce, on both the request (for Next.js) and the response", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const first = await proxy(new NextRequest("https://app.test/shared/abc/"));
    const second = await proxy(new NextRequest("https://app.test/shared/abc/"));
    const policy = first.headers.get("Content-Security-Policy");
    const nonce = nonceOf(policy);
    expect(nonce).toMatch(/^[A-Za-z0-9+/]+=*$/);
    expect(policy).toContain("'strict-dynamic'");
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).not.toContain("unsafe-inline");
    expect(nonceOf(second.headers.get("Content-Security-Policy"))).not.toBe(nonce);
    // NextResponse.next passes overridden request headers on to the page render.
    expect(first.headers.get("x-middleware-request-content-security-policy")).toBe(policy);
  });

  it("leaves development to next.config's permissive policy", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const res = await proxy(new NextRequest("https://app.test/shared/abc/"));
    expect(res.headers.get("Content-Security-Policy")).toBeNull();
  });
});
