// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SignInChooser, { metadata } from "./page";

vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

describe("sign-in chooser", () => {
  it("sends parents, teachers and students with a code to their own sign-in", () => {
    render(<SignInChooser />);
    expect(screen.getByRole("link", { name: "Parent sign in" })).toHaveAttribute("href", "/parents/#/account?mode=signin");
    expect(within(screen.getByRole("main")).getByRole("link", { name: "Teacher sign in" })).toHaveAttribute("href", "/teachers/");
    expect(screen.getByRole("link", { name: "Sign in with a code" })).toHaveAttribute("href", "/play/#/class");
  });

  it("is kept out of search results", () => {
    expect(metadata.robots).toMatchObject({ index: false });
  });
});
