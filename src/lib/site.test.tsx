// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { JsonLd } from "./site";

const blocks = (container: HTMLElement) =>
  [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent!) as Record<string, unknown>);

describe("JsonLd", () => {
  it("writes a list as one script per block, each an object with its own @context", () => {
    const a = { "@context": "https://schema.org", "@type": "BreadcrumbList" };
    const b = { "@context": "https://schema.org", "@type": "LearningResource" };
    const { container } = render(<JsonLd data={[a, b]} />);
    const out = blocks(container);
    expect(out).toEqual([a, b]);
    for (const block of out) expect(Array.isArray(block)).toBe(false);
  });

  it("writes a single block as is, with < escaped so content can't close the tag", () => {
    const { container } = render(<JsonLd data={{ "@context": "https://schema.org", name: "</script><b>" }} />);
    const script = container.querySelector('script[type="application/ld+json"]')!;
    expect(script.textContent).not.toContain("<");
    expect(blocks(container)).toEqual([{ "@context": "https://schema.org", name: "</script><b>" }]);
  });
});
