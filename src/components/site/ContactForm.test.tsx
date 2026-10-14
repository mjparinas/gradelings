// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";

afterEach(() => vi.unstubAllGlobals());

async function fill() {
  const user = userEvent.setup();
  render(<ContactForm />);
  await user.type(screen.getByLabelText("Your email"), "sam@example.com");
  await user.selectOptions(screen.getByLabelText("What it’s about"), "billing");
  await user.type(screen.getByLabelText("Message"), "How do I switch plans?");
  await user.click(screen.getByRole("button", { name: "Send message" }));
}

describe("ContactForm", () => {
  it("keeps “(optional)” on the same line as “Your name”", () => {
    render(<ContactForm />);
    const line = screen.getByText("(optional)").parentElement!;
    expect(line.tagName).toBe("SPAN");
    expect(line).toHaveTextContent("Your name (optional)");
    expect(screen.getByLabelText(/Your name/)).toHaveAttribute("name", "name");
  });

  it("posts the message and thanks the parent", async () => {
    const fetch = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetch);
    await fill();
    expect(await screen.findByText("Thanks, we’ve got your message")).toBeInTheDocument();
    const [url, init] = fetch.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/contact/");
    expect(JSON.parse(String(init.body))).toMatchObject({ email: "sam@example.com", topic: "billing", message: "How do I switch plans?", website: "" });
  });

  it("shows the server's words when sending fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ error: "Please try again later." }), { status: 429 })));
    await fill();
    expect(await screen.findByRole("alert")).toHaveTextContent("Please try again later.");
    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled();
  });
});
