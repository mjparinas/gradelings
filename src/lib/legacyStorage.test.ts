// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { migrateLegacyCaches, migrateLegacyStorage, moveLegacyKeys } from "./legacyStorage";

describe("moving what the product saved under its old name", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("renames every grademap.* entry, whatever follows the prefix", () => {
    localStorage.setItem("grademap.piper", "on");
    localStorage.setItem("grademap.resume.p1", '{"mode":"practice"}');
    localStorage.setItem("grademap.voice.fr", "Amélie");
    sessionStorage.setItem("grademap.ticket.class-1", "{}");
    migrateLegacyStorage();
    expect(localStorage.getItem("gradelings.piper")).toBe("on");
    expect(localStorage.getItem("gradelings.resume.p1")).toBe('{"mode":"practice"}');
    expect(localStorage.getItem("gradelings.voice.fr")).toBe("Amélie");
    expect(sessionStorage.getItem("gradelings.ticket.class-1")).toBe("{}");
    expect(Object.keys(localStorage).filter((k) => k.startsWith("grademap"))).toEqual([]);
    expect(Object.keys(sessionStorage).filter((k) => k.startsWith("grademap"))).toEqual([]);
  });

  it("keeps a value the new name already has, and drops the old entry", () => {
    localStorage.setItem("grademap.parent", "old");
    localStorage.setItem("gradelings.parent", "new");
    moveLegacyKeys(localStorage);
    expect(localStorage.getItem("gradelings.parent")).toBe("new");
    expect(localStorage.getItem("grademap.parent")).toBeNull();
  });

  it("leaves other entries alone and is safe to run twice", () => {
    localStorage.setItem("theme", "dark");
    localStorage.setItem("grademap.teacher", "1");
    migrateLegacyStorage();
    migrateLegacyStorage();
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(localStorage.getItem("gradelings.teacher")).toBe("1");
    expect(localStorage.length).toBe(2);
  });
});

describe("moving the downloaded voice", () => {
  const stores = new Map<string, Map<string, string>>();
  const fakeCaches = {
    has: async (n: string) => stores.has(n),
    delete: async (n: string) => stores.delete(n),
    open: async (n: string) => {
      const m = stores.get(n) ?? new Map<string, string>();
      stores.set(n, m);
      return {
        keys: async () => [...m.keys()],
        match: async (r: string) => (m.has(r) ? m.get(r) : undefined),
        put: async (r: string, v: string) => void m.set(r, v),
      };
    },
  };
  beforeEach(() => {
    stores.clear();
    (globalThis as unknown as { caches: unknown }).caches = fakeCaches;
  });
  afterEach(() => {
    delete (globalThis as unknown as { caches?: unknown }).caches;
  });

  it("copies the files to the new cache and deletes the old one", async () => {
    stores.set("grademap-piper", new Map([["/piper/1/a.onnx", "A"], ["/piper/1/b.js", "B"]]));
    await migrateLegacyCaches();
    expect([...stores.get("gradelings-piper")!.entries()]).toEqual([["/piper/1/a.onnx", "A"], ["/piper/1/b.js", "B"]]);
    expect(stores.has("grademap-piper")).toBe(false);
  });

  it("does nothing when there is no old cache, and never touches a file the new cache has", async () => {
    await migrateLegacyCaches();
    expect(stores.size).toBe(0);
    stores.set("grademap-piper", new Map([["/x", "old"]]));
    stores.set("gradelings-piper", new Map([["/x", "new"]]));
    await migrateLegacyCaches();
    expect(stores.get("gradelings-piper")!.get("/x")).toBe("new");
  });
});
