// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ReportQuestion } from "./ReportQuestion";

const DETAILS = { choices: ["4", "5"], answer: "4", visual: { type: "equation" as const, text: "2 + 2 = ?" } };

const open = async () => {
  render(<ReportQuestion unitKey="2/math/add" prompt="What is 2 + 2?" framework="ca-on" details={DETAILS} />);
  await userEvent.click(screen.getByRole("button", { name: "Report a problem with this question" }));
};

afterEach(() => vi.unstubAllGlobals());

describe("ReportQuestion", () => {
  it("sends one of the fixed reasons with the question, its curriculum and what was on screen, and says thank you", async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetch);
    await open();
    await userEvent.click(screen.getByRole("button", { name: "The answer looks wrong" }));
    expect(fetch).toHaveBeenCalledWith("/api/feedback/", expect.objectContaining({ method: "POST" }));
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({ unitKey: "2/math/add", prompt: "What is 2 + 2?", reason: "wrong-answer", framework: "ca-on", details: DETAILS });
    expect(screen.getByRole("dialog", { name: "Thank you!" })).toHaveTextContent("Your report doesn’t include your name.");
    await userEvent.click(screen.getByRole("button", { name: "Back to the question" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("there is no free-text box, only the fixed reasons", async () => {
    await open();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("asks to try again when the report doesn't send", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({ ok: false }).mockRejectedValueOnce(new Error("offline")));
    await open();
    await userEvent.click(screen.getByRole("button", { name: "It’s too easy" }));
    expect(screen.getByRole("alert")).toHaveTextContent("That didn’t send.");
    await userEvent.click(screen.getByRole("button", { name: "It’s too easy" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "What’s wrong with this question?" })).toBeInTheDocument();
  });
});
