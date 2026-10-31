import { readFileSync } from "node:fs";
import { join } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

// Runs public/sw.js against a small in-memory Cache Storage, to check that an HTML page answering
// a build-file request (a school web filter, a captive portal) is never kept as that file.

const ORIGIN = "https://gradelings.test";
const source = readFileSync(join(process.cwd(), "public/sw.js"), "utf8");

class FakeCache {
  rows = new Map<string, Response>();
  async match(req: Request | string) {
    return this.rows.get(new URL(typeof req === "string" ? req : req.url, ORIGIN).href)?.clone();
  }
  async put(req: Request | string, res: Response) {
    this.rows.set(new URL(typeof req === "string" ? req : req.url, ORIGIN).href, res);
  }
  async add(url: string) {
    await this.put(url, await fakeFetch(url));
  }
  async delete(req: Request | string) {
    return this.rows.delete(new URL(typeof req === "string" ? req : req.url, ORIGIN).href);
  }
  async keys() {
    return [...this.rows.keys()].map((u) => new Request(u));
  }
}

const caches = new Map<string, FakeCache>();
const storage = {
  open: async (name: string) => {
    if (!caches.has(name)) caches.set(name, new FakeCache());
    return caches.get(name)!;
  },
  keys: async () => [...caches.keys()],
  delete: async (name: string) => caches.delete(name),
  match: async (req: Request | string) => {
    for (const c of caches.values()) {
      const hit = await c.match(req);
      if (hit) return hit;
    }
  },
};

let network: (url: string) => Response = () => new Response("", { status: 404 });
// Same-origin answers from a real fetch are "basic"; a Response built here would say "default".
const fakeFetch = async (req: Request | string) =>
  Object.defineProperty(network(new URL(typeof req === "string" ? req : req.url, ORIGIN).href), "type", { value: "basic" });

const html = () => new Response("<!DOCTYPE html><p>Blocked by your school</p>", { headers: { "content-type": "text/html; charset=utf-8" } });
const js = (body = "console.log(1)") => new Response(body, { headers: { "content-type": "application/javascript; charset=utf-8" } });

const listeners = new Map<string, (e: unknown) => void>();
runInNewContext(source, {
  self: { location: new URL(ORIGIN), addEventListener: (t: string, fn: (e: unknown) => void) => listeners.set(t, fn), skipWaiting: () => undefined, clients: { claim: async () => undefined } },
  caches: storage,
  fetch: fakeFetch,
  URL,
  Response,
  Promise,
});

/** Dispatches a fetch for `path` and returns the worker's answer. */
async function get(path: string) {
  let answer: Promise<Response> | undefined;
  listeners.get("fetch")!({ request: new Request(ORIGIN + path), respondWith: (p: Promise<Response>) => (answer = p) });
  const res = await answer!;
  await new Promise((r) => setTimeout(r, 0));
  return res;
}

const app = () => storage.open("grademap-v4");

describe("service worker build files", () => {
  it("keeps a real script, cache-first", async () => {
    network = () => js("real");
    expect(await (await get("/_next/static/immutable/chunks/a.js")).text()).toBe("real");
    network = () => js("newer");
    expect(await (await get("/_next/static/immutable/chunks/a.js")).text()).toBe("real");
  });

  it("never keeps an HTML page that answered a script request", async () => {
    network = html;
    const res = await get("/_next/static/immutable/chunks/b.js");
    expect(res.headers.get("content-type")).toMatch(/html/);
    expect(await (await app()).match(`${ORIGIN}/_next/static/immutable/chunks/b.js`)).toBeUndefined();
    // Off the filtered network, the real file arrives and is kept.
    network = () => js("real b");
    expect(await (await get("/_next/static/immutable/chunks/b.js")).text()).toBe("real b");
    expect(await (await (await app()).match(`${ORIGIN}/_next/static/immutable/chunks/b.js`))!.text()).toBe("real b");
  });

  it("skips and replaces an HTML copy an older worker saved", async () => {
    await (await app()).put(`${ORIGIN}/_next/static/immutable/chunks/c.js`, html());
    network = () => js("real c");
    expect(await (await get("/_next/static/immutable/chunks/c.js")).text()).toBe("real c");
  });

  it("drops HTML copies of build files when it activates, and keeps the rest", async () => {
    const cache = await app();
    await cache.put(`${ORIGIN}/_next/static/immutable/chunks/d.js`, html());
    await cache.put(`${ORIGIN}/_next/static/immutable/chunks/e.js`, js());
    await cache.put(`${ORIGIN}/play/`, html());
    let done: Promise<unknown> | undefined;
    listeners.get("activate")!({ waitUntil: (p: Promise<unknown>) => (done = p) });
    await done;
    expect(await cache.match(`${ORIGIN}/_next/static/immutable/chunks/d.js`)).toBeUndefined();
    expect(await cache.match(`${ORIGIN}/_next/static/immutable/chunks/e.js`)).toBeDefined();
    expect(await cache.match(`${ORIGIN}/play/`)).toBeDefined();
  });

  it("only keeps real build files the app asks it to keep", async () => {
    network = (url) => (url.endsWith("f.js") ? html() : js());
    let done: Promise<unknown> | undefined;
    listeners.get("message")!({
      data: { type: "cache-urls", urls: [`${ORIGIN}/_next/static/immutable/chunks/f.js`, `${ORIGIN}/_next/static/immutable/chunks/g.js`] },
      waitUntil: (p: Promise<unknown>) => (done = p),
    });
    await done;
    const cache = await app();
    expect(await cache.match(`${ORIGIN}/_next/static/immutable/chunks/f.js`)).toBeUndefined();
    expect(await cache.match(`${ORIGIN}/_next/static/immutable/chunks/g.js`)).toBeDefined();
  });
});
