// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const nav = vi.hoisted(() => ({ pathname: "/", pending: false, prefetch: [] as unknown[] }));
vi.mock("next/navigation", () => ({ usePathname: () => nav.pathname }));
vi.mock("next/link", () => ({
  default: ({ prefetch, children, ...rest }: { prefetch?: unknown; children: React.ReactNode }) => {
    nav.prefetch.push(prefetch);
    return <a {...rest}>{children}</a>;
  },
  useLinkStatus: () => ({ pending: nav.pending }),
}));

import { NavLink, sameRoute } from "./NavLink";

beforeEach(() => {
  nav.pathname = "/";
  nav.pending = false;
  nav.prefetch = [];
});

describe("NavLink", () => {
  it("marks the page you're on and doesn't prefetch it", () => {
    nav.pathname = "/about/";
    render(<NavLink href="/about/">About</NavLink>);
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
    expect(nav.prefetch).toEqual([false]);
  });

  it("leaves other pages to the default prefetch", () => {
    render(<NavLink href="/curriculum/">Curriculum</NavLink>);
    expect(screen.getByRole("link", { name: "Curriculum" })).not.toHaveAttribute("aria-current");
    expect(nav.prefetch).toEqual([undefined]);
  });

  it("always renders the pending bar, and flags it only while the page is on its way", () => {
    const { container, rerender } = render(<NavLink href="/curriculum/">Curriculum</NavLink>);
    const bar = () => container.querySelector(".nav-pending")!;
    expect(bar()).toHaveAttribute("aria-hidden", "true");
    expect(bar()).not.toHaveAttribute("data-pending");
    nav.pending = true;
    rerender(<NavLink href="/curriculum/">Curriculum</NavLink>);
    expect(bar()).toHaveAttribute("data-pending");
  });

  it("takes an accessible name for a logo", () => {
    render(
      <NavLink href="/" label="Home page">
        <span aria-hidden="true">G</span>
      </NavLink>,
    );
    expect(screen.getByRole("link", { name: "Home page" })).toHaveAttribute("aria-current", "page");
  });
});

describe("sameRoute", () => {
  it.each([
    ["/about/", "/about/", true],
    ["/about", "/about/", true],
    ["/", "/", true],
    ["/about/team/", "/about/", false],
    ["/", "/about/", false],
    [null, "/", false],
  ])("%s and %s: %s", (pathname, href, same) => {
    expect(sameRoute(pathname, href)).toBe(same);
  });
});
