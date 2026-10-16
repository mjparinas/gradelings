import { describe, expect, it } from "vitest";
import { classSignInHref, readClassSignIn, playHref, readPlayStart } from "./playLink";

const known = (id: string) => ["ca-bc", "ca-on", "us-wa"].includes(id);
const read = (href: string) => readPlayStart(new URLSearchParams(href.split("?")[1] ?? ""), known);

describe("playHref", () => {
  it("opens the app on a province or state, grade, subject and unit, keeping only the parts given", () => {
    expect(playHref({ framework: "ca-on", grade: "2", subject: "math", unit: "adding-to-100" })).toBe("/play/#/start?framework=ca-on&grade=2&subject=math&unit=adding-to-100");
    expect(playHref({ framework: "us-wa" })).toBe("/play/#/start?framework=us-wa");
    // A unit or subject means nothing without the grade around it.
    expect(playHref({ framework: "ca-bc", subject: "math", unit: "x" })).toBe("/play/#/start?framework=ca-bc");
  });

  it("reads back what it wrote", () => {
    const s = { framework: "ca-on", grade: "k", subject: "science", unit: "seasons" } as const;
    expect(read(playHref(s))).toEqual(s);
  });
});

describe("readPlayStart", () => {
  it("is null for an unknown or missing framework", () => {
    expect(read("?framework=ca-qc&grade=2")).toBeNull();
    expect(read("?grade=2")).toBeNull();
  });

  it("drops the parts that don't read", () => {
    expect(read("?framework=ca-bc&grade=13&subject=math")).toEqual({ framework: "ca-bc" });
    expect(read("?framework=ca-bc&grade=4&subject=Math<script>")).toEqual({ framework: "ca-bc", grade: "4" });
    expect(read("?framework=ca-bc&grade=4&subject=math&unit=../x")).toEqual({ framework: "ca-bc", grade: "4", subject: "math" });
  });
});

describe("every unit", () => {
  it("can be named in a link", async () => {
    const { COURSES } = await import("@/content/all");
    const bad = COURSES.flatMap((c) => [c.subject, ...c.units.map((u) => u.id)]).filter((id) => {
      const s = read(playHref({ framework: "ca-bc", grade: "4", subject: "math", unit: id }));
      return s?.unit !== id;
    });
    expect(bad).toEqual([]);
  });
});

describe("login card links", () => {
  const one = { studentCode: "KM7PQR3XTA" };
  const two = { classCode: "AB12CD", studentCode: "ZX91PQ2M" };
  const readCodes = (href: string) => readClassSignIn(new URLSearchParams(href.split("?")[1] ?? ""));

  it("put the codes after the #, so no server ever receives them", () => {
    expect(classSignInHref(one, "https://example.com")).toBe("https://example.com/play/#/class?s=KM7PQR3XTA");
    const href = classSignInHref(two, "https://example.com");
    expect(href).toBe("https://example.com/play/#/class?c=AB12CD&s=ZX91PQ2M");
    expect(new URL(href).search).toBe("");
  });

  it("read back what was written, and tidy lower case", () => {
    expect(readCodes(classSignInHref(one))).toEqual(one);
    expect(readCodes(classSignInHref(two))).toEqual(two);
    expect(readCodes("?s=km7pqr3xta")).toEqual(one);
    expect(readCodes("?c=ab12cd&s=zx91pq2m")).toEqual(two);
  });

  it("refuse codes that aren't the right shape", () => {
    for (const q of ["", "?c=AB12CD", "?s=ZX91PQ2M", "?s=KM7PQR3XT", "?s=KM7PQR3XTA9", "?s=KM7PQ-3XTA", "?c=AB12C&s=ZX91PQ2M", "?c=AB12CD&s=ZX91PQ2", "?c=AB 2CD&s=ZX91PQ2M", "?c=AB12CD&s=ZX91PQ2M9", "?c=AB12CD&s=KM7PQR3XTA", "?c=%3Cb%3E&s=x"]) {
      expect(readCodes(q), q).toBeNull();
    }
  });
});
