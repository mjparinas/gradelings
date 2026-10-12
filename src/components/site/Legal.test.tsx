// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LEGAL_AI_REVIEWED, LEGAL_UPDATED } from "@/lib/brand";
import { LegalPage, Section } from "./Legal";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

describe("LegalPage", () => {
  it("dates the page and says it isn't legal advice", () => {
    render(
      <LegalPage title="Privacy policy" intro="What we collect.">
        <Section title="Children">
          <p>Only a first name.</p>
        </Section>
      </LegalPage>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Privacy policy" })).toBeInTheDocument();
    const article = screen.getByRole("article");
    expect(article).toHaveTextContent(`Last updated ${LEGAL_UPDATED}`);
    expect(article).toHaveTextContent(`Reviewed by an AI assistant on ${LEGAL_AI_REVIEWED}. This is not legal advice and has not been reviewed by a lawyer.`);
    expect(screen.getByRole("heading", { level: 2, name: "Children" }).nextElementSibling).toHaveTextContent("Only a first name.");
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toHaveTextContent("Home›Privacy policy");
  });
});
