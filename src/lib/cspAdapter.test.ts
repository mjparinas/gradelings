import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { writePolicyTags } from "../../scripts/csp-pages.mjs";
import { PRERENDER_BUDGET, checkPrerenderBudget, trimSegmentPrefetches } from "../../scripts/deploy-outputs.mjs";

const PAGE = '<!DOCTYPE html><html><head><meta charSet="utf-8"/><script>self.x=1</script></head><body></body></html>';
const TAG = 'http-equiv="Content-Security-Policy"';

/** A fake `.next` with a page in each place a build can leave one. */
function distDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "csp-"));
  const pages = ["server/app/play.html", "server/pages/404.html", "server/route-cache/APP_PAGE/abc/$play.html"];
  for (const p of pages) {
    fs.mkdirSync(path.dirname(path.join(dir, p)), { recursive: true });
    fs.writeFileSync(path.join(dir, p), PAGE);
  }
  return { dir, files: pages.map((p) => path.join(dir, p)) };
}

describe("writePolicyTags", () => {
  it("tags pages in app/, pages/ and the adapter's route-cache/", () => {
    const { dir, files } = distDir();
    expect(writePolicyTags(dir)).toBe(3);
    for (const f of files) expect(fs.readFileSync(f, "utf8")).toContain(TAG);
  });

  it("changes nothing the second time", () => {
    const { dir, files } = distDir();
    writePolicyTags(dir);
    const once = fs.readFileSync(files[2], "utf8");
    writePolicyTags(dir);
    expect(fs.readFileSync(files[2], "utf8")).toBe(once);
  });
});

describe("csp-adapter", () => {
  afterEach(() => {
    delete process.env.CSP_INNER_ADAPTER;
    vi.resetModules();
  });

  it("tags every page before the platform adapter sees the build", async () => {
    const { dir, files } = distDir();
    const seen: string[] = [];
    const inner = path.join(dir, "inner.cjs");
    globalThis.__cspInnerSeen = seen;
    fs.writeFileSync(
      inner,
      `module.exports = { name: "Platform", modifyConfig: (c) => ({ ...c, touched: true }),
        onBuildComplete: (ctx) => { globalThis.__cspInnerSeen.push(require("fs").readFileSync(ctx.outputs.prerenders[0].fallback.filePath, "utf8")); } };`,
    );
    process.env.CSP_INNER_ADAPTER = inner;
    type Hooks = { name: string; modifyConfig(c: object, ctx: object): Promise<object>; onBuildComplete(ctx: object): Promise<void> };
    const adapter = (await import("../../scripts/csp-adapter.mjs")).default as unknown as Hooks;

    expect(adapter.name).toBe("Platform");
    expect(await adapter.modifyConfig({}, {})).toEqual({ touched: true });

    const prerender = { pathname: "/play", htmlSize: PAGE.length, fallback: { filePath: files[2] } };
    const segment = { pathname: "/curriculum/bc/grade-4/math/fractions.segments/_tree.segment.rsc" };
    const prerenders = [prerender, segment];
    await adapter.onBuildComplete({ distDir: dir, outputs: { prerenders } });
    expect(prerenders).toEqual([prerender]);
    expect(seen).toHaveLength(1);
    expect(seen[0]).toContain(TAG);
    expect(prerender.htmlSize).toBe(fs.statSync(files[2]).size);
  });
});

describe("deploy outputs", () => {
  const unit = "/curriculum/us-ks/grade-4/math/fractions";
  const subject = "/curriculum/us-ks/grade-4/math";

  it("leaves out only unit pages' segment prefetch files", () => {
    const prerenders = [
      unit,
      `${unit}.rsc`,
      `${unit}.segments/_tree.segment.rsc`,
      `${unit}.segments/_full.segment.rsc`,
      `${unit}.segments/curriculum/$d$framework/$d$grade/$d$subject/$d$unit/__PAGE__.segment.rsc`,
      subject,
      `${subject}.rsc`,
      `${subject}.segments/_tree.segment.rsc`,
      `${unit}/opengraph-image`,
      "/guides/us-ks/grade-4/math/worksheet.segments/_tree.segment.rsc",
    ].map((pathname) => ({ pathname }));
    expect(trimSegmentPrefetches(prerenders)).toBe(3);
    expect(prerenders.map((p) => p.pathname)).toEqual([
      unit,
      `${unit}.rsc`,
      subject,
      `${subject}.rsc`,
      `${subject}.segments/_tree.segment.rsc`,
      `${unit}/opengraph-image`,
      "/guides/us-ks/grade-4/math/worksheet.segments/_tree.segment.rsc",
    ]);
  });

  it("stops the build when a deploy would carry too many outputs", () => {
    expect(() => checkPrerenderBudget(PRERENDER_BUDGET)).not.toThrow();
    expect(() => checkPrerenderBudget(PRERENDER_BUDGET + 1)).toThrow(/over the budget/);
  });
});

declare global {
  var __cspInnerSeen: string[];
}
