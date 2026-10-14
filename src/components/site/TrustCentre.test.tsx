// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { absolute } from "@/lib/site";
import { sectionSitemap } from "./sitemaps";
import { IN_PROGRESS, TRUST_UPDATED, TrustCentre } from "./TrustCentre";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

describe("TrustCentre", () => {
  it("dates the page and lists the controls by area", () => {
    render(<TrustCentre />);
    expect(screen.getByRole("heading", { level: 1, name: "Trust centre" })).toBeInTheDocument();
    expect(screen.getByRole("article")).toHaveTextContent(`Last checked ${TRUST_UPDATED}`);
    for (const name of ["Your family’s information", "Signing in", "Payments", "Email", "AI", "In progress", "Report a security problem"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: "/.well-known/security.txt" })).toHaveAttribute("href", "/.well-known/security.txt");
    expect(screen.getByRole("link", { name: "privacy policy" })).toHaveAttribute("href", "/privacy/");
  });

  it("says where data is stored as the privacy policy does, never that it stays in Canada", () => {
    render(<TrustCentre />);
    const text = screen.getByRole("article").textContent ?? "";
    expect(text).toContain("Our servers are in Montréal, Canada, and our database is in Virginia, United States.");
    expect(text).not.toMatch(/stored in Canada|stays in Canada|Canadian data centre/i);
  });

  it("shows work still in review under In progress", () => {
    render(<TrustCentre />);
    const list = screen.getByRole("heading", { level: 2, name: "In progress" }).nextElementSibling!;
    for (const item of IN_PROGRESS) expect(list).toHaveTextContent(item.title);
  });

  it("is in the sitemap", () => {
    expect(sectionSitemap("pages").some((e) => e.url === absolute("/trust/"))).toBe(true);
  });
});
