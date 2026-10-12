// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ParentQuotes } from "./ParentQuotes";

afterEach(() => vi.unstubAllEnvs());

describe("ParentQuotes", () => {
  it("labels every sample quote where samples may show", () => {
    vi.stubEnv("SHOW_SAMPLE_QUOTES", "1");
    render(<ParentQuotes />);
    expect(screen.getByRole("heading", { name: "What parents say" })).toBeInTheDocument();
    expect(screen.getAllByText("Sample quote, not a real parent").length).toBe(screen.getAllByRole("listitem").length);
  });

  it("renders nothing on the live site while every quote is a sample", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    const { container } = render(<ParentQuotes />);
    expect(container).toBeEmptyDOMElement();
  });
});
