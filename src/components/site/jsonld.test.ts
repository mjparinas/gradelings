import { describe, expect, it } from "vitest";
import { PRICES } from "@/lib/plan";
import { getFramework } from "@/content/frameworks";
import { ORG_ID, ORG_JSON_LD, absolute } from "@/lib/site";
import { appJsonLd, articleJsonLd, itemListJsonLd, typicalAgeRange } from "./jsonld";

describe("appJsonLd", () => {
  const app = appJsonLd();

  it("describes the app as software, not a Product that would need reviews", () => {
    expect(app["@type"]).toBe("SoftwareApplication");
    expect(app).not.toHaveProperty("review");
    expect(app).not.toHaveProperty("aggregateRating");
  });

  it("gives every offer a price from plan.ts and an availability", () => {
    expect(app.offers.map((o) => o.price)).toEqual([PRICES.month.amount, PRICES.year.amount]);
    for (const o of app.offers) {
      expect(o.priceCurrency).toBe("CAD");
      expect(o.availability).toBe("https://schema.org/InStock");
    }
  });

  it("lists US offers apart, with their region, only when asked for", () => {
    const both = appJsonLd(["CAD", "USD"]);
    expect(both.offers.map((o) => [o.priceCurrency, o.eligibleRegion])).toEqual([
      ["CAD", "CA"],
      ["CAD", "CA"],
      ["USD", "US"],
      ["USD", "US"],
    ]);
    expect(both.offers[2].name).toBe("Family plan (monthly), USD");
    expect(app.offers.every((o) => !("eligibleRegion" in o))).toBe(true);
  });
});

describe("articleJsonLd", () => {
  it("is in the page's own English and dated only when a date is known", () => {
    const ca = articleJsonLd({ headline: "H", description: "D", path: "/guides/bc/" , framework: getFramework("ca-bc"), updated: "2026-10-13" });
    expect(ca.inLanguage).toBe("en-CA");
    expect(ca.dateModified).toBe("2026-10-13");
    const us = articleJsonLd({ headline: "H", description: "D", path: "/guides/washington/", framework: getFramework("us-wa") });
    expect(us.inLanguage).toBe("en-US");
    expect(us).not.toHaveProperty("dateModified");
  });

  it("names the site's organization by its id as author and publisher", () => {
    const a = articleJsonLd({ headline: "H", description: "D", path: "/compare/" });
    expect(a.author).toEqual(expect.objectContaining({ "@id": ORG_ID }));
    expect(a.publisher).toEqual(expect.objectContaining({ "@id": ORG_ID }));
    expect(ORG_JSON_LD["@id"]).toBe(ORG_ID);
  });
});

describe("itemListJsonLd and typicalAgeRange", () => {
  it("lists items in order with absolute URLs", () => {
    const list = itemListJsonLd("Units", [
      { name: "A", path: "/a/" },
      { name: "B", path: "/b/" },
    ]);
    expect(list.numberOfItems).toBe(2);
    expect(list.itemListElement.map((i) => [i.position, i.name, i.url])).toEqual([
      [1, "A", absolute("/a/")],
      [2, "B", absolute("/b/")],
    ]);
  });

  it("gives the usual ages for a grade", () => {
    expect(typicalAgeRange("k")).toBe("5-6");
    expect(typicalAgeRange("4")).toBe("9-10");
    expect(typicalAgeRange("9")).toBe("14-15");
  });
});
