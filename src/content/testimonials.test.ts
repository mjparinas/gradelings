import { describe, expect, it } from "vitest";
import { APP_NAME } from "@/lib/brand";
import { PARENT_QUOTES, visibleQuotes, type ParentQuote } from "./testimonials";

const real: ParentQuote = { quote: "Real words.", name: "Sam R.", about: "Parent of a Grade 2 child, Manitoba", sample: false };
const made: ParentQuote = { quote: "Made-up words.", name: "Pat L.", about: "Parent of a Grade 4 child, Ontario", sample: true };

describe("parent quotes", () => {
  it("never shows a sample quote on the live site, even if asked to", () => {
    expect(visibleQuotes({ VERCEL_ENV: "production", SHOW_SAMPLE_QUOTES: "1" }, [made])).toEqual([]);
    expect(visibleQuotes({ NODE_ENV: "production" }, [made])).toEqual([]);
  });

  it("shows sample quotes in development and on preview deploys, to check the layout", () => {
    expect(visibleQuotes({ NODE_ENV: "development" }, [made])).toEqual([made]);
    expect(visibleQuotes({ NODE_ENV: "production", VERCEL_ENV: "preview" }, [made])).toEqual([made]);
  });

  it("shows real quotes everywhere", () => {
    expect(visibleQuotes({ VERCEL_ENV: "production" }, [real, made])).toEqual([real]);
  });

  it("shows the real parent quotes on the live site", () => {
    const live = visibleQuotes({ VERCEL_ENV: "production" });
    expect(live.length).toBeGreaterThan(0);
    expect(live.every((q) => !q.sample)).toBe(true);
  });

  it("says so when a parent is tied to the company", () => {
    for (const q of PARENT_QUOTES.filter((q) => q.connected)) expect(q.about).toContain(APP_NAME);
  });

  it("keeps quotes short and names no province we don't support", () => {
    for (const q of PARENT_QUOTES) {
      expect(q.quote.length).toBeLessThanOrEqual(200);
      expect(q.about).not.toMatch(/Quebec|Québec/);
    }
  });
});
