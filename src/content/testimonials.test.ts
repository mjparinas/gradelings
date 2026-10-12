import { describe, expect, it } from "vitest";
import { PARENT_QUOTES, visibleQuotes, type ParentQuote } from "./testimonials";

const real: ParentQuote = { quote: "Real words.", name: "Sam R.", about: "Parent of a Grade 2 child, Manitoba", sample: false };

describe("parent quotes", () => {
  it("never shows a sample quote on the live site, even if asked to", () => {
    expect(visibleQuotes({ VERCEL_ENV: "production", SHOW_SAMPLE_QUOTES: "1" })).toEqual([]);
    expect(visibleQuotes({ NODE_ENV: "production" })).toEqual([]);
  });

  it("shows sample quotes in development and on preview deploys, to check the layout", () => {
    expect(visibleQuotes({ NODE_ENV: "development" })).toHaveLength(PARENT_QUOTES.length);
    expect(visibleQuotes({ NODE_ENV: "production", VERCEL_ENV: "preview" })).toHaveLength(PARENT_QUOTES.length);
  });

  it("shows real quotes everywhere", () => {
    expect(visibleQuotes({ VERCEL_ENV: "production" }, [real, ...PARENT_QUOTES])).toEqual([real]);
  });

  it("keeps quotes short and names no province we don't support", () => {
    for (const q of PARENT_QUOTES) {
      expect(q.quote.length).toBeLessThanOrEqual(200);
      expect(q.about).not.toMatch(/Quebec|Québec/);
    }
  });
});
