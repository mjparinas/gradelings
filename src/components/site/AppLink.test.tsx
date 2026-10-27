// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const nav = vi.hoisted(() => ({ pending: false, prefetch: [] as unknown[] }));
vi.mock("next/link", () => ({
  default: ({ prefetch, children, ...rest }: { prefetch?: unknown; children: React.ReactNode }) => {
    nav.prefetch.push(prefetch);
    return <a {...rest}>{children}</a>;
  },
  useLinkStatus: () => ({ pending: nav.pending }),
}));

import { AppLink } from "./AppLink";

beforeEach(() => {
  nav.pending = false;
  nav.prefetch = [];
});

describe("AppLink", () => {
  it("never prefetches the app, and keeps the button's name and look", () => {
    render(
      <AppLink href="/play/" className="btn btn-good">
        Try it free
      </AppLink>,
    );
    const link = screen.getByRole("link", { name: "Try it free" });
    expect(link).toHaveAttribute("href", "/play/");
    expect(link).toHaveClass("btn", "btn-good");
    expect(nav.prefetch).toEqual([false]);
  });

  it("shows a spinner only while the tapped app is still downloading", () => {
    const { container, rerender } = render(<AppLink href="/play/">Play free</AppLink>);
    const spinner = () => container.querySelector(".link-spinner")!;
    expect(spinner()).toHaveAttribute("aria-hidden", "true");
    expect(spinner()).not.toHaveAttribute("data-pending");
    nav.pending = true;
    rerender(<AppLink href="/play/">Play free</AppLink>);
    expect(spinner()).toHaveAttribute("data-pending");
    expect(screen.getByRole("link", { name: "Play free" })).toBeInTheDocument();
  });
});
