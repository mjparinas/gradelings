// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TryChoices } from "./TryChoices";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const choices = ["3", "4", "5"].map((id) => ({ id, content: <span>{id}</span> }));
const renderIt = () =>
  render(<TryChoices choices={choices} answer="4" answerLabel="4" hint="Count on from 2." play="/play/#/start?framework=ca-bc&grade=1" playLabel="Practise this unit" />);
const app = () => screen.queryByRole("link", { name: /Practise this unit/ });

describe("TryChoices", () => {
  it("cheers a right answer and offers the app", () => {
    renderIt();
    expect(app()).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "4" }));
    expect(screen.getByText(/That's right!/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "4" })).toHaveAttribute("data-state", "right");
    expect(app()).toHaveAttribute("href", "/play/#/start?framework=ca-bc&grade=1");
  });

  it("gives the hint and another try after a miss, and the answer after a second", () => {
    renderIt();
    fireEvent.click(screen.getByRole("button", { name: "3" }));
    expect(screen.getByText(/Not quite, try another!/).closest("p")).toHaveTextContent("Hint: Count on from 2.");
    expect(app()).toBeNull();
    // The same wrong answer again doesn't count as a second try.
    fireEvent.click(screen.getByRole("button", { name: "3" }));
    expect(app()).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "5" }));
    expect(screen.getByText("The answer is 4.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "4" })).toHaveAttribute("data-state", "right");
    expect(screen.getByRole("button", { name: "5" })).toBeDisabled();
    expect(app()).toBeInTheDocument();
  });
});
