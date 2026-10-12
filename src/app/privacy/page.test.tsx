// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PrivacyPage from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

describe("privacy page", () => {
  it("names every analytics tool in use, including email open and click tracking", () => {
    render(<PrivacyPage />);
    const page = screen.getByRole("article");
    expect(page).toHaveTextContent("Vercel Web Analytics and Speed Insights");
    expect(page).toHaveTextContent("Cloudflare Web Analytics");
    expect(page).toHaveTextContent("It also records when an email is opened and which links are clicked");
    expect(page).not.toHaveTextContent(/don’t track|no tracking|tracking pixels/i);
  });
});

// The "no tracking" promise was dropped (October 2026), so no copy may make it again.
describe("site copy", () => {
  const files = [
    "src/app/page.tsx",
    "src/app/pricing/page.tsx",
    "src/app/for-teachers/page.tsx",
    "src/app/help/faqs.ts",
    "src/app/privacy/page.tsx",
    "src/content/compare.ts",
    "src/components/parents/Privacy.tsx",
    "docs/PLAY_LISTING.md",
  ];
  it.each(files)("%s doesn't promise no tracking", (file) => {
    const text = readFileSync(join(process.cwd(), file), "utf8");
    expect(text).not.toMatch(/no[ -]tracking|tracking pixels|don’t track|don't track/i);
  });
});
