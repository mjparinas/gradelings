import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pageAssets, pagePolicyProblems, SITE_FILES, SITE_PAGES } from "@/lib/systemHealth";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// The System page's Live site card: a stubbed site stands in for gradelings.com.

process.env.DATABASE_URL = `file:${join(mkdtempSync(join(tmpdir(), "grademap-site-")), "test.db")}`;

const POLICY = "script-src 'self' 'sha256-abc='; style-src 'self'";
const tag = (policy = POLICY) => `<meta http-equiv="Content-Security-Policy" content="${policy}"/>`;
const page = (policy = POLICY) => `<!doctype html><html><head><meta charset="utf-8"/>${policy ? tag(policy) : ""}<link rel="stylesheet" href="/_next/static/css/app.css"/><script src="/_next/static/chunks/main-1.js" async></script><script src="/_next/static/chunks/page-2.js?dpl=abc" async></script></head><body>hi</body></html>`;
const ASSETS = ["/_next/static/css/app.css", "/_next/static/chunks/main-1.js", "/_next/static/chunks/page-2.js?dpl=abc"];

interface Site {
  html?: Record<string, string>;
  status?: Record<string, number>;
  slow?: string[];
  missing?: string[];
  headers?: Record<string, string>;
  throws?: string[];
}

function serve(site: Site = {}) {
  const calls: string[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string | URL | Request) => {
      const url = String(input);
      calls.push(url);
      const path = url.replace("https://gradelings.com", "");
      if (site.throws?.includes(path)) throw new Error("boom");
      const status = site.status?.[path] ?? (site.missing?.includes(path) ? 404 : 200);
      const headers = { "content-security-policy": "frame-ancestors 'none'", ...site.headers };
      const isPage = (SITE_PAGES as readonly string[]).includes(path);
      const body = isPage ? (site.html?.[path] ?? page()) : "ok";
      return new Response(status === 200 ? body : "nope", { status, headers });
    }),
  );
  return calls;
}

let health: typeof import("@/server/systemHealth");
beforeAll(async () => {
  health = await import("@/server/systemHealth");
});
beforeEach(() => {
  delete process.env.NEXT_PUBLIC_SITE_URL;
  health.clearSystemCache();
});
afterEach(() => vi.unstubAllGlobals());

describe("pagePolicyProblems", () => {
  it("accepts a page with a hashed policy and the framing header", () => {
    expect(pagePolicyProblems(page(), "frame-ancestors 'none'")).toEqual([]);
  });
  it("names a missing tag, a lax policy and a missing header", () => {
    expect(pagePolicyProblems(page(""), "frame-ancestors 'none'")).toEqual(["no security policy tag"]);
    expect(pagePolicyProblems(page("script-src 'self' 'unsafe-inline'"), "frame-ancestors 'none'")).toEqual(["the policy allows any inline script"]);
    expect(pagePolicyProblems(page(), null)).toEqual(["no frame-ancestors header"]);
  });
  it("reads a tag whose quotes are written as entities", () => {
    expect(pagePolicyProblems(page("script-src &#x27;self&#x27; &#x27;unsafe-inline&#x27;"), "frame-ancestors 'none'")).toEqual(["the policy allows any inline script"]);
  });
  it("lets 'unsafe-inline' stand in style-src only when script-src is clean", () => {
    expect(pagePolicyProblems(page("script-src 'self'; style-src 'unsafe-inline'"), "frame-ancestors 'none'")).toEqual([]);
  });
});

describe("pageAssets", () => {
  it("returns one stylesheet then the scripts, keeping version suffixes, up to the limit", () => {
    expect(pageAssets(page())).toEqual(ASSETS);
    expect(pageAssets(page(), 2)).toEqual(ASSETS.slice(0, 2));
  });
  it("ignores other addresses and repeats", () => {
    const html = `<script src="/other.js"></script><script src="/_next/static/a.js"></script><script src="/_next/static/a.js"></script><img src="/_next/static/x.png">`;
    expect(pageAssets(html)).toEqual(["/_next/static/a.js"]);
  });
});

describe("the Live site card", () => {
  it("is ok when every page and file loads, each page has its tag and the build files are there", async () => {
    const calls = serve();
    const c = await health.siteCheck();
    expect(c).toMatchObject({ id: "site", title: "Live site", state: "ok" });
    expect(c.summary).toBe(`All ${SITE_PAGES.length} pages and ${SITE_FILES.length} files load, each page with its security policy.`);
    expect(c.rows.find((r) => r.label === "/play/")).toMatchObject({ state: "ok" });
    expect(c.rows.find((r) => r.label === "Scripts and styles")).toMatchObject({ value: "All 3 loaded", state: "ok" });
    // Each build file is fetched once even though every page names it.
    expect(calls.filter((u) => u.includes("main-1.js"))).toHaveLength(1);
    expect(calls).toContain("https://gradelings.com/_next/static/chunks/page-2.js?dpl=abc");
  });

  it("uses the configured site address", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.org/";
    const calls: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (u: string | URL | Request) => (calls.push(String(u)), new Response(page(), { status: 200, headers: { "content-security-policy": "frame-ancestors 'none'" } }))));
    await health.siteCheck();
    expect(calls.every((u) => u.startsWith("https://example.org/"))).toBe(true);
  });

  it("is down and names the page when its security policy tag is missing", async () => {
    serve({ html: { "/play/": page("") } });
    const c = await health.siteCheck();
    expect(c.state).toBe("down");
    expect(c.summary).toBe("/play/ has no security policy tag.");
    expect(c.rows.find((r) => r.label === "/play/")).toMatchObject({ value: "no security policy tag", state: "down" });
    expect(c.rows.find((r) => r.label === "/parents/")?.state).toBe("ok");
  });

  it("is down when a page answers with an error", async () => {
    serve({ status: { "/pricing/": 500 } });
    const c = await health.siteCheck();
    expect(c.state).toBe("down");
    expect(c.summary).toBe("/pricing/ answered 500.");
  });

  it("is down when a build file a page names is missing", async () => {
    serve({ missing: ["/_next/static/chunks/main-1.js"] });
    const c = await health.siteCheck();
    expect(c.state).toBe("down");
    expect(c.rows.find((r) => r.label === "Scripts and styles")).toMatchObject({ value: "2 of 3 loaded; missing: main-1.js", state: "down" });
    expect(c.summary).toMatch(/^1 build file named by .* didn't load\.$/);
  });

  it("is down when the service worker or health answer is missing, and counts the other problems", async () => {
    serve({ status: { "/sw.js": 404, "/api/health/": 503 } });
    const c = await health.siteCheck();
    expect(c.state).toBe("down");
    expect(c.summary).toBe("/sw.js answered 404. 1 more problem.");
  });

  it("is down when the site can't be reached", async () => {
    serve({ throws: ["/"] });
    const c = await health.siteCheck();
    expect(c.state).toBe("down");
    expect(c.rows.find((r) => r.label === "/")).toMatchObject({ value: "Page couldn't be reached", state: "down" });
  });

  it("warns, not fails, for a slow page", async () => {
    let t = 0;
    vi.spyOn(Date, "now").mockImplementation(() => (t += 4000));
    serve();
    const c = await health.siteCheck();
    vi.restoreAllMocks();
    expect(c.state).toBe("warn");
  });

  it("warns when the pages name no build files", async () => {
    serve({ html: Object.fromEntries(SITE_PAGES.map((p) => [p, `<html><head>${tag()}</head></html>`])) });
    const c = await health.siteCheck();
    expect(c.state).toBe("warn");
    expect(c.rows.find((r) => r.label === "Scripts and styles")?.value).toBe("None found on the pages");
  });

  it("warns, not fails, while maintenance mode is on", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (u: string | URL | Request) => {
        const path = String(u).replace("https://gradelings.com", "");
        return path === "/" ? new Response(page(), { headers: { "content-security-policy": "frame-ancestors 'none'" } }) : new Response("maintenance", { status: 503, headers: { "x-maintenance": "1" } });
      }),
    );
    const c = await health.siteCheck();
    expect(c.state).toBe("warn");
    expect(c.summary).toMatch(/^Maintenance mode is on/);
  });

  it("is off when the site address points at this computer", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
    const calls = serve();
    const c = await health.siteCheck();
    expect(c.state).toBe("off");
    expect(c.setup).toMatch(/NEXT_PUBLIC_SITE_URL/);
    expect(calls).toHaveLength(0);
  });

  it("is part of the full report, between Uptime and Deploys", async () => {
    serve();
    const ids = (await health.systemReport({ refresh: true })).checks.map((c) => c.id);
    expect(ids.slice(0, 3)).toEqual(["database", "uptime", "site"]);
  });
});
