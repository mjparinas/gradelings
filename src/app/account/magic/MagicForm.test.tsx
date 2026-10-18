// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MagicForm } from "./MagicForm";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const fetchMock = vi.fn();

afterEach(() => {
  vi.unstubAllGlobals();
  fetchMock.mockReset();
  window.history.replaceState(null, "", "/");
});

describe("MagicForm", () => {
  it("does nothing until the button is tapped, then signs in with the token and hides it from the address bar", async () => {
    window.history.replaceState(null, "", "/account/magic/?token=abc123");
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<MagicForm />);

    expect(window.location.search).toBe("");
    const button = screen.getByRole("button", { name: "Sign in" });
    await waitFor(() => expect(button).toBeEnabled());
    expect(fetchMock).not.toHaveBeenCalled();

    await userEvent.click(button);
    expect(await screen.findByRole("heading", { name: "You're signed in" })).toBeInTheDocument();
    expect(JSON.parse(fetchMock.mock.calls[0][1].body as string)).toEqual({ token: "abc123" });
    expect(screen.getByRole("link", { name: "Go to the Parent area" })).toHaveAttribute("href", "/parents/");
  });

  it("explains a link with no token", async () => {
    render(<MagicForm />);
    expect(await screen.findByRole("heading", { name: "This link isn’t valid" })).toBeInTheDocument();
  });

  it("shows the server's message when the link was used up", async () => {
    window.history.replaceState(null, "", "/account/magic/?token=old");
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ error: "This link has expired or was already used." }), { status: 400 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<MagicForm />);
    const button = screen.getByRole("button", { name: "Sign in" });
    await waitFor(() => expect(button).toBeEnabled());
    await userEvent.click(button);
    expect(await screen.findByRole("alert")).toHaveTextContent("already used");
  });
});
