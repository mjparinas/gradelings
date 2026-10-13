// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AppEvent, Profile } from "@/lib/model";

const h = vi.hoisted(() => ({ push: vi.fn(), clearAll: vi.fn() }));
vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: h.clearAll,
}));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: h.push }) }));
const acct = vi.hoisted(() => ({ withdrawConsent: vi.fn(async () => {}) }));
vi.mock("@/lib/account", () => acct);

import { APP_NAME } from "@/lib/brand";
import { useStore } from "@/lib/store";
import { PrivacyPanels } from "./Privacy";

const ava: Profile = { id: "a", name: "Ava", avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1 };
const event = { id: "e1", profileId: "a", t: 5, type: "answer", unit: "3/math/x", correct: true, attempts: 1, revealed: false, ms: 900, mode: "practice" } as AppEvent;

beforeEach(() => {
  h.push.mockReset();
  h.clearAll.mockReset().mockResolvedValue(undefined);
  useStore.setState({ profiles: [ava], events: [event], settings: {}, activeId: "a", pin: { hash: "h", salt: "s" }, family: { plan: "trial", trialEndsAt: 0, updatedAt: 1 } });
});
afterEach(() => vi.restoreAllMocks());

describe("PrivacyPanels", () => {
  it("says what is stored, and that there are no ads or data sales", () => {
    render(<PrivacyPanels />);
    expect(screen.getByText(/No free text, photos or voice recordings\./)).toBeInTheDocument();
    expect(screen.getByText("No ads, and we never sell data.")).toBeInTheDocument();
  });

  it("downloads every child, setting and answer as a dated JSON file", async () => {
    let blob: Blob | undefined;
    const createObjectURL = vi.fn((b: Blob) => {
      blob = b;
      return "blob:export";
    });
    const revokeObjectURL = vi.fn();
    Object.assign(URL, { createObjectURL, revokeObjectURL });
    let downloaded = "";
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
      downloaded = this.download;
    });
    render(<PrivacyPanels />);
    await userEvent.click(screen.getByRole("button", { name: "⬇️ Download all data (JSON)" }));
    expect(downloaded).toMatch(new RegExp(`^${APP_NAME.toLowerCase()}-export-\\d{4}-\\d{2}-\\d{2}\\.json$`));
    expect(blob!.type).toBe("application/json");
    const data = JSON.parse(await blob!.text());
    expect(data.app).toBe(APP_NAME);
    expect(data.profiles).toEqual([ava]);
    expect(data.events).toEqual([event]);
    expect(data.family).toEqual({ country: "CA", consentAt: null });
    // The parent PIN never leaves the device in an export.
    expect(data).not.toHaveProperty("pin");
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:export");
  });

  it("lets a US parent who gave consent withdraw it, after confirming; nobody else sees it", async () => {
    const { unmount } = render(<PrivacyPanels />);
    expect(screen.queryByRole("button", { name: "Withdraw permission" })).not.toBeInTheDocument();
    unmount();
    useStore.setState({ family: { plan: "trial", trialEndsAt: 0, updatedAt: 1, country: "US", consentAt: Date.UTC(2026, 9, 1), account: { email: "p@example.com", familyId: "f" } } });
    render(<PrivacyPanels />);
    await userEvent.click(screen.getByRole("button", { name: "Withdraw permission" }));
    expect(screen.getByRole("dialog", { name: "Withdraw your permission?" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Yes, withdraw" }));
    expect(acct.withdrawConsent).toHaveBeenCalledTimes(1);
  });

  it("erases this device only after confirming, then goes back to the kids' area", async () => {
    render(<PrivacyPanels />);
    await userEvent.click(screen.getByRole("button", { name: "Erase everything on this device" }));
    expect(screen.getByRole("dialog", { name: "Erase this device?" })).toHaveTextContent("If you're signed in, your account keeps a copy.");
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(h.clearAll).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: "Erase everything on this device" }));
    await userEvent.click(screen.getByRole("button", { name: "Yes, erase" }));
    await waitFor(() => expect(h.push).toHaveBeenCalledWith("/play/"));
    expect(h.clearAll).toHaveBeenCalled();
    expect(useStore.getState()).toMatchObject({ profiles: [], events: [], pin: null, activeId: null });
  });
});
