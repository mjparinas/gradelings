// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CONTACT_EMAIL } from "@/lib/brand";
import ContactPage, { metadata } from "./page";

vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

describe("contact page search markup", () => {
  it("has a descriptive title and description", () => {
    const t = metadata.title as string | { absolute: string };
    const title = typeof t === "string" ? t : t.absolute;
    expect(title).toMatch(/Contact/);
    expect(title.length).toBeGreaterThan("Contact us".length);
    expect(metadata.description).toContain(CONTACT_EMAIL);
  });

  it("carries breadcrumbs and a ContactPage with the support address", () => {
    const { container } = render(<ContactPage />);
    const blocks = [...container.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => [JSON.parse(s.textContent!)].flat());
    expect(blocks.map((b) => b["@type"])).toEqual(["BreadcrumbList", "ContactPage"]);
    const page = blocks[1];
    expect(page.mainEntity.contactPoint[0]).toMatchObject({ contactType: "customer support", email: CONTACT_EMAIL });
    expect(page.url).toMatch(/\/contact\/$/);
  });
});
