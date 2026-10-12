// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { UnsubscribeView } from "./UnsubscribeView";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const fetchMock = vi.fn();

function openAt(url: string) {
  window.history.replaceState(null, "", url);
}

afterEach(() => {
  vi.unstubAllGlobals();
  fetchMock.mockReset();
  openAt("/");
});

describe("UnsubscribeView", () => {
  it("stops the weekly report with the token from the email link", async () => {
    openAt("/account/unsubscribe/?token=t%2B1");
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<UnsubscribeView />);
    expect(window.location.search).toBe("");
    expect(screen.getByRole("heading", { name: "Stop the weekly report?" })).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Unsubscribe" });
    await waitFor(() => expect(button).toBeEnabled());
    await userEvent.click(button);

    expect(await screen.findByRole("heading", { name: "You’re unsubscribed" })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/email/unsubscribe/?token=t%2B1", { method: "POST" });
    expect(screen.getByText(/You won’t get the weekly progress email any more\./)).toBeInTheDocument();
  });

  it("stops practice reminders when the link is for reminders", async () => {
    openAt("/account/unsubscribe/?kind=reminders&token=r1");
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<UnsubscribeView />);
    expect(await screen.findByRole("heading", { name: "Stop practice reminders?" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Unsubscribe" }));
    expect(fetchMock).toHaveBeenCalledWith("/api/email/unsubscribe/?kind=reminders&token=r1", { method: "POST" });
    expect(await screen.findByText(/You won’t get practice reminders any more\./)).toBeInTheDocument();
  });

  it("stops news and tips when the link is for them", async () => {
    openAt("/account/unsubscribe/?kind=updates&token=u1");
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<UnsubscribeView />);
    expect(await screen.findByRole("heading", { name: "Stop news and tips?" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Unsubscribe" }));
    expect(fetchMock).toHaveBeenCalledWith("/api/email/unsubscribe/?kind=updates&token=u1", { method: "POST" });
    expect(await screen.findByText(/You won’t get news and tips from us any more\./)).toBeInTheDocument();
  });

  it("can't be pressed without a token", async () => {
    openAt("/account/unsubscribe/");
    render(<UnsubscribeView />);
    await waitFor(() => expect(screen.getByRole("heading", { name: "Stop the weekly report?" })).toBeInTheDocument());
    expect(screen.getByRole("button", { name: "Unsubscribe" })).toBeDisabled();
  });

  it("explains a bad link or a network failure, and points to the Parent area", async () => {
    openAt("/account/unsubscribe/?token=bad");
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 400 }));
    fetchMock.mockRejectedValueOnce(new TypeError("offline"));
    vi.stubGlobal("fetch", fetchMock);
    render(<UnsubscribeView />);
    const button = screen.getByRole("button", { name: "Unsubscribe" });
    await waitFor(() => expect(button).toBeEnabled());

    await userEvent.click(button);
    expect(await screen.findByRole("alert")).toHaveTextContent("That link isn’t valid or couldn’t be reached.");
    await userEvent.click(button);
    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "You’re unsubscribed" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go to the Parent area" })).toHaveAttribute("href", "/parents/");
  });
});
