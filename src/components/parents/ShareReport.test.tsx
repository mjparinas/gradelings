// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { FamilyInfo } from "@/lib/model";

const store = vi.hoisted(() => ({ family: {} as FamilyInfo }));
vi.mock("@/lib/store", () => ({ useStore: (sel: (s: typeof store) => unknown) => sel(store) }));

import { ShareReport } from "./ShareReport";

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
const fetchMock = vi.fn();
const writeText = vi.fn();

beforeEach(() => {
  store.family = { plan: "trial", trialEndsAt: 0, updatedAt: 1, account: { email: "p@example.com", familyId: "f" } };
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  writeText.mockReset().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
});
afterEach(() => vi.unstubAllGlobals());

const open = async () => {
  render(<ShareReport profileId="kid 1" name="Ava" days={30} />);
  await userEvent.click(screen.getByRole("button", { name: "🔗 Share" }));
  return screen.getByRole("dialog", { name: "Share Ava’s report" });
};

describe("ShareReport", () => {
  it("asks a signed-out parent to sign in, and never calls the server", async () => {
    store.family = { plan: "trial", trialEndsAt: 0, updatedAt: 1 };
    const dialog = await open();
    expect(dialog).toHaveTextContent("Sign in under Account & sync to share a report.");
    expect(within(dialog).queryByRole("button", { name: "Create a link" })).not.toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("explains what the link shows for the chosen period", async () => {
    const dialog = await open();
    expect(dialog).toHaveTextContent("Anyone with the link can see the last 30 days of Ava’s practice");
    expect(dialog).toHaveTextContent("stops working after 30 days or when you stop sharing");
  });

  it("creates a link at /api/share/ for this child and period, then copies it", async () => {
    fetchMock.mockResolvedValueOnce(json({ url: "https://example.com/shared/tok123/" }));
    await open();
    await userEvent.click(screen.getByRole("button", { name: "Create a link" }));
    const link = await screen.findByRole("textbox", { name: "Report link" });
    expect(link).toHaveValue("https://example.com/shared/tok123/");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/share/");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toEqual({ profileId: "kid 1", days: 30 });

    await userEvent.click(screen.getByRole("button", { name: "Copy link" }));
    expect(writeText).toHaveBeenCalledWith("https://example.com/shared/tok123/");
    expect(await screen.findByRole("button", { name: "Copied!" })).toBeInTheDocument();
  });

  it("tells the parent to copy by hand when the clipboard is blocked", async () => {
    fetchMock.mockResolvedValueOnce(json({ url: "https://example.com/shared/t/" }));
    writeText.mockRejectedValueOnce(new Error("denied"));
    await open();
    await userEvent.click(screen.getByRole("button", { name: "Create a link" }));
    await userEvent.click(await screen.findByRole("button", { name: "Copy link" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Copy didn’t work. Select the link and copy it.");
  });

  it("shows the server's error when a link can't be made", async () => {
    fetchMock.mockResolvedValueOnce(json({ error: "Sync this child first." }, 400));
    await open();
    await userEvent.click(screen.getByRole("button", { name: "Create a link" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Sync this child first.");
    expect(screen.queryByRole("textbox", { name: "Report link" })).not.toBeInTheDocument();
  });

  it("says the parent is offline when the request can't be sent, or gives the status code", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    await open();
    await userEvent.click(screen.getByRole("button", { name: "Create a link" }));
    expect(await screen.findByRole("status")).toHaveTextContent("You’re offline.");
    fetchMock.mockResolvedValueOnce(new Response("oops", { status: 502 }));
    await userEvent.click(screen.getByRole("button", { name: "Create a link" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Something went wrong (502).");
  });

  it("stops sharing with a DELETE for this child and drops the link", async () => {
    fetchMock.mockResolvedValueOnce(json({ url: "https://example.com/shared/tok/" })).mockResolvedValueOnce(json({}));
    await open();
    await userEvent.click(screen.getByRole("button", { name: "Create a link" }));
    await screen.findByRole("textbox", { name: "Report link" });
    await userEvent.click(screen.getByRole("button", { name: "Stop sharing Ava’s report" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Sharing stopped. Old links no longer work.");
    expect(fetchMock.mock.calls[1][0]).toBe("/api/share/?profileId=kid%201");
    expect(fetchMock.mock.calls[1][1].method).toBe("DELETE");
    expect(screen.queryByRole("textbox", { name: "Report link" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create a link" })).toBeInTheDocument();
  });

  it("keeps the link when stopping fails", async () => {
    fetchMock.mockResolvedValueOnce(json({ url: "https://example.com/shared/tok/" })).mockResolvedValueOnce(json({ error: "Try again later." }, 500));
    await open();
    await userEvent.click(screen.getByRole("button", { name: "Create a link" }));
    await screen.findByRole("textbox", { name: "Report link" });
    await userEvent.click(screen.getByRole("button", { name: "Stop sharing Ava’s report" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Try again later.");
    expect(screen.getByRole("textbox", { name: "Report link" })).toBeInTheDocument();
  });

  it("closes the dialog", async () => {
    await open();
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
