import { describe, expect, it } from "vitest";
import { getFramework } from "@/content/frameworks";
import { countMilestoneCard } from "./ogText";
import { milestoneMeta } from "./milestoneMeta";

describe("shared milestone metadata", () => {
  it("names its share card outright, at a .png address that needs no redirect", () => {
    const meta = milestoneMeta(countMilestoneCard({ kind: "days", n: "100" })!, "/milestone/count/days/100/");
    expect(meta.robots).toEqual({ index: false, follow: true });
    expect(meta.openGraph).toMatchObject({ type: "website", locale: "en_CA", url: "/milestone/count/days/100/", images: [{ url: "/milestone/count/days/100/card.png", width: 1200, height: 630 }] });
    expect(meta.twitter).toMatchObject({ card: "summary_large_image", images: ["/milestone/count/days/100/card.png"] });
  });

  it("speaks US English for a state's milestone", () => {
    const card = countMilestoneCard({ kind: "days", n: "100" })!;
    expect(milestoneMeta(card, "/x/", getFramework("washington")).openGraph).toMatchObject({ locale: "en_US" });
  });
});
