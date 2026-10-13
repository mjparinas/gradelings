// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WithdrawConsentView } from "./WithdrawConsentView";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});

describe("WithdrawConsentView", () => {
  it("withdraws only when the parent presses the button, with the token from the email link", async () => {
    window.history.replaceState(null, "", "/account/consent/?token=t%2B1");
    const fetchMock = vi.fn(async () => new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<WithdrawConsentView />);
    expect(window.location.search).toBe("");
    const button = screen.getByRole("button", { name: "Withdraw permission" });
    await waitFor(() => expect(button).toBeEnabled());
    expect(fetchMock).not.toHaveBeenCalled();
    await userEvent.click(button);
    expect(await screen.findByRole("heading", { name: "Permission withdrawn" })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/account/consent/withdraw/?token=t%2B1", { method: "POST" });
  });

  it("explains a bad link and points to the Parent area", async () => {
    window.history.replaceState(null, "", "/account/consent/?token=bad");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 400 })));
    render(<WithdrawConsentView />);
    const button = screen.getByRole("button", { name: "Withdraw permission" });
    await waitFor(() => expect(button).toBeEnabled());
    await userEvent.click(button);
    expect(await screen.findByRole("alert")).toHaveTextContent("That link isn’t valid");
    expect(screen.getByRole("link", { name: "Go to the Parent area" })).toHaveAttribute("href", "/parents/");
  });
});
