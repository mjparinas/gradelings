// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { absolute } from "@/lib/site";
import { sectionSitemap } from "./sitemaps";
import { TRUST_GROUPS, TRUST_UPDATED, TrustCentre } from "./TrustCentre";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const controls = TRUST_GROUPS.flatMap((g) => g.controls);

describe("TrustCentre", () => {
  it("lists every control as one short line under its group", () => {
    render(<TrustCentre />);
    expect(screen.getByRole("heading", { level: 1, name: "Trust centre" })).toBeInTheDocument();
    expect(screen.getByRole("article")).toHaveTextContent(`Last checked ${TRUST_UPDATED}`);
    for (const group of TRUST_GROUPS) {
      const section = screen.getByRole("heading", { level: 2, name: group.title }).closest("section")!;
      expect(within(section).getAllByRole("listitem")).toHaveLength(group.controls.length);
    }
    for (const c of controls) {
      expect(c.title.length).toBeLessThanOrEqual(40);
      expect(c.note.length).toBeLessThanOrEqual(60);
    }
    expect(screen.getByRole("link", { name: "security.txt" })).toHaveAttribute("href", "/.well-known/security.txt");
    expect(screen.getByRole("link", { name: "privacy policy" })).toHaveAttribute("href", "/privacy/");
  });

  it("marks work still in review as in progress", () => {
    render(<TrustCentre />);
    const pending = controls.filter((c) => c.status === "progress");
    expect(screen.queryAllByText("In progress")).toHaveLength(pending.length);
  });

  it("says where data is stored as the privacy policy does, never that it stays in Canada", () => {
    render(<TrustCentre />);
    const text = screen.getByRole("article").textContent ?? "";
    expect(text).toContain("Servers and database in Virginia, US.");
    expect(text).not.toMatch(/stored in Canada|stays in Canada|Canadian data centre/i);
  });

  it("is in the sitemap", () => {
    expect(sectionSitemap("pages").some((e) => e.url === absolute("/trust/"))).toBe(true);
  });
});
