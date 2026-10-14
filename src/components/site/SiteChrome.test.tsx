// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { APP_NAME, WORDMARK_COLOURS } from "@/lib/brand";
import { SiteFooter, SiteHeader } from "./SiteChrome";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

function cssColour(hex: string) {
  const n = hex.slice(1);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
  return `rgb(${r}, ${g}, ${b})`;
}

describe("SiteHeader", () => {
  it("colours each letter of the name the same way as the play screen", () => {
    render(<SiteHeader />);
    const link = screen.getByRole("link", { name: APP_NAME });
    const letters = [...link.querySelectorAll("span")];
    expect(letters.map((el) => el.textContent).join("")).toBe(APP_NAME);
    expect(letters.map((el) => el.style.color)).toEqual(
      [...APP_NAME].map((_, i) => cssColour(WORDMARK_COLOURS[i % WORDMARK_COLOURS.length])),
    );
  });
});

describe("About and Contact links", () => {
  it("puts About in the header and both pages in the footer", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about/");
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "About us" })).toHaveAttribute("href", "/about/");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact/");
  });
});

describe("SiteFooter", () => {
  it("links each section's hub once instead of every region, plus status and the legal pages", () => {
    render(<SiteFooter />);
    for (const [name, href] of [
      ["Curriculum", "/curriculum/"],
      ["Report cards explained", "/report-cards/"],
      ["Parent guides", "/guides/"],
      ["Status", "/status/"],
      ["Trust centre", "/trust/"],
      ["Privacy policy", "/privacy/"],
      ["Terms of use", "/terms/"],
    ]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }
    const footer = screen.getByRole("contentinfo");
    expect(footer.querySelectorAll("a").length).toBeLessThan(25);
    expect(footer.querySelector('a[href^="/curriculum/bc"]')).toBeNull();
  });
});
