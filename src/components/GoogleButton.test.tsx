// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const twa = vi.hoisted(() => ({ ios: false }));
vi.mock("@/lib/twa", () => ({ isIosApp: () => twa.ios }));

const fetchMock = vi.fn();
beforeEach(() => {
  twa.ios = false;
  fetchMock.mockReset().mockResolvedValue(new Response(JSON.stringify({ google: true })));
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

import { GoogleButton } from "./GoogleButton";

describe("GoogleButton", () => {
  it("is a plain link to the server, carrying the trial and invite code a new account should keep", async () => {
    render(<GoogleButton from="parents" trialEndsAt={1_900_000_000_000} referral="ABCDEFGH" />);
    const link = await screen.findByRole("link", { name: "Continue with Google" });
    const url = new URL(link.getAttribute("href")!, "https://x.test");
    expect(url.pathname).toBe("/api/auth/google/");
    expect(url.searchParams.get("from")).toBe("parents");
    expect(url.searchParams.get("trial")).toBe("1900000000000");
    expect(url.searchParams.get("ref")).toBe("ABCDEFGH");
  });

  it("leaves out the trial and invite code when there are none, and works for teachers", async () => {
    render(<GoogleButton from="teachers" />);
    const link = await screen.findByRole("link", { name: "Continue with Google" });
    expect(link.getAttribute("href")).toBe("/api/auth/google/?from=teachers");
  });

  it("shows nothing when the server says Google sign-in is off or can't be reached", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ google: false })));
    const { unmount } = render(<GoogleButton from="parents" />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    unmount();
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    render(<GoogleButton from="parents" />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("is not offered inside the iPhone and iPad app, where Google refuses embedded browsers", async () => {
    twa.ios = true;
    render(<GoogleButton from="parents" />);
    await new Promise((r) => setTimeout(r, 20));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});

describe("useGoogleError", () => {
  it("shows the message for the code in the address once, then takes it out of the address", async () => {
    vi.resetModules();
    window.history.replaceState(null, "", "/parents/?google_error=other_google&keep=1#/account");
    const { useGoogleError } = await import("./GoogleButton");
    function Probe() {
      return <p role="alert">{useGoogleError()}</p>;
    }
    render(<Probe />);
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("already linked to a different Google account"));
    expect(window.location.search).toBe("?keep=1");
    expect(window.location.hash).toBe("#/account");
  });

  it("falls back to a general message for a code it doesn't know", async () => {
    vi.resetModules();
    window.history.replaceState(null, "", "/teachers/?google_error=whatever");
    const { useGoogleError } = await import("./GoogleButton");
    function Probe() {
      return <p role="alert">{useGoogleError()}</p>;
    }
    render(<Probe />);
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("couldn't finish signing you in with Google"));
  });
});
