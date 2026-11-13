// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PLAY_STORE_URL } from "@/lib/brand";
import { AppBadges } from "./AppBadges";

describe("AppBadges", () => {
  it("links Google Play and shows the App Store as coming soon, not a link", () => {
    render(<AppBadges />);
    expect(screen.getByRole("link", { name: "Get it on Google Play" })).toHaveAttribute("href", PLAY_STORE_URL);
    expect(screen.getByText(/Coming soon/)).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });
});
