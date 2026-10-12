// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ResetForm } from "./ResetForm";

function openAt(url: string) {
  window.history.replaceState(null, "", url);
}

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const fetchMock = vi.fn();

afterEach(() => {
  vi.unstubAllGlobals();
  fetchMock.mockReset();
  openAt("/");
});

describe("ResetForm", () => {
  it("takes the token out of the address bar and sends it with the new password", async () => {
    openAt("/account/reset/?token=abc123");
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<ResetForm />);

    expect(window.location.search).toBe("");
    expect(window.location.pathname).toBe("/account/reset/");
    const save = screen.getByRole("button", { name: "Change password" });
    await waitFor(() => expect(save).toBeEnabled());

    await userEvent.type(screen.getByLabelText(/^New password/), "a-new-password");
    await userEvent.click(save);

    expect(await screen.findByRole("heading", { name: "Password changed" })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/auth/reset/", expect.objectContaining({ method: "POST", credentials: "same-origin" }));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body as string)).toEqual({ token: "abc123", password: "a-new-password" });
    expect(screen.getByRole("link", { name: "Go to the Parent area" })).toHaveAttribute("href", "/parents/");
  });

  it("says the link isn't valid when there is no token", async () => {
    openAt("/account/reset/");
    render(<ResetForm />);
    expect(await screen.findByRole("heading", { name: "This link isn’t valid" })).toBeInTheDocument();
    expect(screen.queryByLabelText(/^New password/)).not.toBeInTheDocument();
  });

  it("shows the server's error and lets the parent try again", async () => {
    openAt("/account/reset/?token=used");
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ error: "This link has expired." }), { status: 400 }));
    fetchMock.mockResolvedValueOnce(new Response("not json", { status: 500 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<ResetForm />);
    const save = screen.getByRole("button", { name: "Change password" });
    await waitFor(() => expect(save).toBeEnabled());
    await userEvent.type(screen.getByLabelText(/^New password/), "another-password");

    await userEvent.click(save);
    expect(await screen.findByRole("alert")).toHaveTextContent("This link has expired.");
    expect(save).toBeEnabled();

    // A reply without a message still gets a kind, general one.
    await userEvent.click(save);
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong. Please try again."));
    expect(screen.queryByRole("heading", { name: "Password changed" })).not.toBeInTheDocument();
  });
});
