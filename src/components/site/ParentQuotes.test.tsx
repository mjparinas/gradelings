// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PARENT_QUOTES } from "@/content/testimonials";
import { ParentQuotes } from "./ParentQuotes";

afterEach(() => vi.unstubAllEnvs());

describe("ParentQuotes", () => {
  it("shows the real quotes on the live site, with no sample label", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    render(<ParentQuotes />);
    expect(screen.getByRole("heading", { name: "What parents say" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(PARENT_QUOTES.filter((q) => !q.sample).length);
    expect(screen.queryByText("Sample quote, not a real parent")).toBeNull();
  });

  it("shows each parent's tie to the company next to their name", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    render(<ParentQuotes />);
    for (const q of PARENT_QUOTES.filter((q) => q.connected)) expect(screen.getByText(`· ${q.about}`)).toBeInTheDocument();
  });
});
