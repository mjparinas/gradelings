// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MAIN_ID, SkipLink } from "./SkipLink";

describe("SkipLink", () => {
  it("moves focus to the main content without changing the address", async () => {
    window.location.hash = "#/settings";
    render(
      <>
        <SkipLink />
        <nav>
          <a href="#/reports">Reports</a>
        </nav>
        <main id={MAIN_ID} tabIndex={-1}>
          <button type="button">Inside</button>
        </main>
      </>,
    );
    await userEvent.tab();
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(document.getElementById(MAIN_ID)).toHaveFocus();
    expect(window.location.hash).toBe("#/settings");
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Inside" })).toHaveFocus();
  });
});
