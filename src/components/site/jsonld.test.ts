import { describe, expect, it } from "vitest";
import { PRICES } from "@/lib/plan";
import { appJsonLd } from "./jsonld";

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
});
