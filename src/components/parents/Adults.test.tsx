// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { FamilyInfo } from "@/lib/model";

const store = vi.hoisted(() => ({ family: {} as FamilyInfo }));
vi.mock("@/lib/store", () => ({ useStore: (sel: (s: typeof store) => unknown) => sel(store) }));

import { AdultsPanel } from "./Adults";

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
const fetchMock = vi.fn();

beforeEach(() => {
  store.family = { plan: "trial", trialEndsAt: 0, updatedAt: 1, account: { email: "p@example.com", familyId: "f", verified: true } };
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

describe("AdultsPanel", () => {
  it("lists who has joined and who is invited, and sends an invitation", async () => {
    fetchMock.mockResolvedValueOnce(json({ owner: true, adults: [{ id: "a1", email: "gran@example.com", since: 1 }], invites: [] }));
    render(<AdultsPanel />);
    expect(await screen.findByText("gran@example.com")).toBeInTheDocument();
    fetchMock.mockResolvedValueOnce(json({ ok: true, adults: [], invites: [{ email: "tutor@example.com", createdAt: 2 }] }));
    await userEvent.type(screen.getByLabelText("Their email address"), "tutor@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Send invitation" }));
    expect(await screen.findByText(/invited, waiting/)).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[1];
    expect(url).toBe("/api/account/adults/");
    expect(JSON.parse(init.body)).toEqual({ email: "tutor@example.com" });
  });

  it("asks an unconfirmed owner to confirm their email first", async () => {
    store.family = { ...store.family, account: { email: "p@example.com", familyId: "f", verified: false } };
    fetchMock.mockResolvedValueOnce(json({ owner: true, adults: [], invites: [] }));
    render(<AdultsPanel />);
    expect(await screen.findByText(/Confirm your email first/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Send invitation" })).not.toBeInTheDocument();
  });

  it("shows another adult a way to leave, and no invitations", async () => {
    store.family = { ...store.family, account: { email: "g@example.com", familyId: "f", verified: true, adult: true } };
    render(<AdultsPanel />);
    expect(screen.getByRole("button", { name: "Leave this family" })).toBeInTheDocument();
    expect(screen.queryByLabelText("Their email address")).not.toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
