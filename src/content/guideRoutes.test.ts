import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { GUIDE_FRAMEWORKS, guidesFor } from "./guides";

// Each province's competencies and assessment slug needs a route folder, or its guide URL 404s.
describe("guide routes", () => {
  it("has a page for every competencies and assessment slug", () => {
    const missing: string[] = [];
    for (const f of GUIDE_FRAMEWORKS) {
      const g = guidesFor(f.id);
      for (const slug of [g.competencies.slug, g.assessment.slug]) {
        if (!existsSync(join(process.cwd(), "src/app/guides/[framework]", slug, "page.tsx"))) missing.push(`${f.slug}/${slug}`);
      }
    }
    expect(missing).toEqual([]);
  });
});
