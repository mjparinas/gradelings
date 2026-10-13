import { describe, expect, it } from "vitest";
import { CRITTERS } from "@/components/CritterArt";
import { critterDataUri, critterFor, critterSvg } from "./ogCritter";

describe("critters on share cards", () => {
  it("uses each subject's guide, and Ollie otherwise", () => {
    expect(["math", "language", "science", "social", "immersion", undefined].map(critterFor)).toEqual(["hoot", "ruby", "bolt", "juniper", "ollie", "ollie"]);
  });

  it("draws every critter as standalone SVG with nothing the image renderer can't read", () => {
    for (const c of CRITTERS) {
      const svg = critterSvg(c.id);
      expect(svg.startsWith('<svg viewBox="0 0 200 200" width="400" height="400" xmlns="http://www.w3.org/2000/svg"'), c.id).toBe(true);
      expect(svg).not.toMatch(/var\(|class=|style=|undefined|\[object/);
      expect(svg).toContain("stroke-width=");
    }
    expect(critterDataUri("hoot")).toMatch(/^data:image\/svg\+xml;base64,/);
  });
});
