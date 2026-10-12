import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { config, proxy } from "./proxy";

afterEach(() => vi.unstubAllEnvs());

const nonceOf = (policy: string | null) => /'nonce-([^']+)'/.exec(policy ?? "")?.[1];

describe("shared report proxy", () => {
  it("only runs on shared report pages", () => {
    expect(config.matcher).toBe("/shared/:path*");
  });

  it("gives each response a fresh script nonce, on both the request (for Next.js) and the response", () => {
    vi.stubEnv("NODE_ENV", "production");
    const first = proxy(new NextRequest("https://app.test/shared/abc/"));
    const second = proxy(new NextRequest("https://app.test/shared/abc/"));
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

  it("leaves development to next.config's permissive policy", () => {
    vi.stubEnv("NODE_ENV", "development");
    const res = proxy(new NextRequest("https://app.test/shared/abc/"));
    expect(res.headers.get("Content-Security-Policy")).toBeNull();
  });
});
