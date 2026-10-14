import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { writePolicyTags } from "../../scripts/csp-pages.mjs";

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

    const prerender = { htmlSize: PAGE.length, fallback: { filePath: files[2] } };
    await adapter.onBuildComplete({ distDir: dir, outputs: { prerenders: [prerender] } });
    expect(seen).toHaveLength(1);
    expect(seen[0]).toContain(TAG);
    expect(prerender.htmlSize).toBe(fs.statSync(files[2]).size);
  });
});

declare global {
  var __cspInnerSeen: string[];
}
