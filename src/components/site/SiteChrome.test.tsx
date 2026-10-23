// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { APP_NAME, socialLinks, WORDMARK_COLOURS } from "@/lib/brand";
import { PageCta, SiteFooter, SiteHeader, SubscribeActions } from "./SiteChrome";

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
    const letters = [...link.querySelectorAll<HTMLElement>("span:not(.nav-pending)")];
    expect(letters.map((el) => el.textContent).join("")).toBe(APP_NAME);
    expect(letters.map((el) => el.style.color)).toEqual(
      [...APP_NAME].map((_, i) => cssColour(WORDMARK_COLOURS[i % WORDMARK_COLOURS.length])),
    );
  });
});

describe("SiteHeader sign in", () => {
  it("offers Sign in on every screen size, opening the chooser", () => {
    localStorage.clear();
    render(<SiteHeader />);
    const link = screen.getByRole("link", { name: "Sign in" });
    expect(link).toHaveAttribute("href", "/account/sign-in/");
    expect(link.className).not.toMatch(/\bhidden\b/);
  });

  it("says My account and goes straight to the parent area on a device with a parent account", () => {
    localStorage.setItem("grademap.parent", "1");
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "My account" })).toHaveAttribute("href", "/parents/#/account");
    localStorage.clear();
  });

  it("goes to the teacher area on a device with a teacher", () => {
    localStorage.setItem("grademap.teacher", "1");
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "My account" })).toHaveAttribute("href", "/teachers/");
    localStorage.clear();
  });
});

describe("Try it free links", () => {
  const deep = "/play/#/start?framework=ca-on&grade=2&subject=math&unit=adding-to-100";

  it("open the plain app unless the page passes where to start", () => {
    render(<SubscribeActions />);
    expect(screen.getByRole("link", { name: "Try it free" })).toHaveAttribute("href", "/play/");
  });

  it("carry the page's province or state, grade and unit in the header, the page's own buttons and the closing call to action", () => {
    render(<SiteHeader play={deep} />);
    expect(screen.getByRole("link", { name: "Play free" })).toHaveAttribute("href", deep);
    render(<SubscribeActions trialLabel="Practise free" play={deep} />);
    expect(screen.getByRole("link", { name: "Practise free" })).toHaveAttribute("href", deep);
    render(<PageCta play={deep} />);
    expect(screen.getAllByRole("link", { name: "Try it free" }).at(-1)).toHaveAttribute("href", deep);
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

  it("links each social profile that exists, opening in a new tab", () => {
    render(<SiteFooter />);
    for (const { name, href } of socialLinks()) {
      const link = screen.getByRole("link", { name: `${APP_NAME} on ${name}` });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link.getAttribute("rel")).toContain("noopener");
    }
    expect(socialLinks().map((l) => l.name)).toEqual(["Instagram", "Pinterest", "Facebook"]);
  });
});

describe("SiteFooter build line", () => {
  it("shows the build when given one, and nothing otherwise", () => {
    const { unmount } = render(<SiteFooter build="Build 3f9a1c2" />);
    expect(screen.getByText("Build 3f9a1c2")).toBeInTheDocument();
    unmount();
    render(<SiteFooter />);
    expect(screen.queryByText(/^Build /)).toBeNull();
  });
});
