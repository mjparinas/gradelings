// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { COMPETITORS } from "@/content/compare";
import ComparePage, { generateMetadata, generateStaticParams } from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const props = (slug: string) => ({ params: Promise.resolve({ slug }) }) as never;

describe("comparison page", () => {
  it("has a page for every competitor", () => {
    expect(generateStaticParams()).toEqual(COMPETITORS.map((c) => ({ slug: c.slug })));
  });

  it.each(COMPETITORS.map((c) => [c.slug] as const))("%s: speaks to families in Canada and the US, with both countries' prices", async (slug) => {
    const meta = await generateMetadata(props(slug));
    expect(meta.title).toContain("for families in Canada and the US");
    render(await ComparePage(props(slug)));
    const main = screen.getByRole("main");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("for families in Canada and the US");
    expect(main).toHaveTextContent("$14.99/month or $119.99/year plus tax in Canada, US$14.99/month or US$119.99/year plus sales tax in the US");
    expect(main).toHaveTextContent("Curriculum");
    if (slug !== "khan-academy") {
      expect(main).toHaveTextContent("Price in Canada");
      expect(main).toHaveTextContent("Price in the US");
    }
  });
});
