// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SITE_HOST } from "@/lib/brand";
import type { FamilyInfo } from "@/lib/model";

const state = vi.hoisted(() => ({
  family: { plan: "trial", trialEndsAt: Date.now() + 5 * 86_400_000, updatedAt: 1 } as FamilyInfo,
  android: false,
}));

vi.mock("@/lib/store", () => ({
  useStore: (sel: (s: { family: FamilyInfo }) => unknown) => sel({ family: state.family }),
}));
vi.mock("@/lib/router", () => ({
  useRoute: () => ({ path: ["subscription"], query: new URLSearchParams() }),
}));
vi.mock("@/lib/twa", () => ({ isAndroidApp: () => state.android }));
vi.mock("@/lib/account", () => ({
  refreshAccount: vi.fn(),
  startCheckout: vi.fn(),
  devBilling: vi.fn(),
  openBillingPortal: vi.fn(),
  resendVerification: vi.fn(),
  loadReferral: vi.fn().mockResolvedValue({ code: "ABCD2345", joined: 2, rewarded: 1, monthsEarned: 1, maxMonths: 12, bonusDays: 30 }),
}));

import { SubscriptionPage } from "./Subscription";

const billing = { stripe: true, dev: false };

describe("SubscriptionPage", () => {
  it("lets a parent subscribe without an account by creating one first", () => {
    state.android = false;
    state.family = { plan: "trial", trialEndsAt: Date.now() + 5 * 86_400_000, updatedAt: 1 };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByRole("heading", { name: "Subscribe" })).toBeInTheDocument();
    expect(screen.getByText(/you can subscribe now, before it ends/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create an account to subscribe" })).toHaveAttribute("href", "#/account?next=subscription");
    expect(screen.getByRole("link", { name: /Subscribe yearly/ })).toHaveAttribute("href", "#/account?next=subscription");
  });

  it("offers yearly and monthly checkout during the trial once the email is confirmed", () => {
    state.android = false;
    state.family = {
      plan: "trial",
      trialEndsAt: Date.now() + 5 * 86_400_000,
      updatedAt: 1,
      account: { email: "parent@example.com", familyId: "fam", verified: true },
    };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByRole("button", { name: /Subscribe yearly/ })).toBeEnabled();
    expect(screen.getByRole("button", { name: /Subscribe monthly/ })).toBeEnabled();
    expect(screen.getByText(/days left in the trial don't carry over/i)).toBeInTheDocument();
  });

  it("tells Android parents to open the website, and shows no plan buttons", () => {
    state.android = true;
    state.family = { plan: "trial", trialEndsAt: Date.now() + 5 * 86_400_000, updatedAt: 1 };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByText(/To subscribe, open/)).toHaveTextContent(SITE_HOST);
    expect(screen.queryByRole("button", { name: /Subscribe yearly/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Subscribe/ })).not.toBeInTheDocument();
  });

  it("holds checkout until the email is confirmed", () => {
    state.android = false;
    state.family = {
      plan: "free",
      trialEndsAt: 0,
      updatedAt: 1,
      account: { email: "parent@example.com", familyId: "fam", verified: false },
    };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByText("Confirm your email to subscribe.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Subscribe yearly/ })).toBeDisabled();
  });

  it("shows a parent their invite link and what it has earned", async () => {
    state.android = false;
    state.family = {
      plan: "trial",
      trialEndsAt: Date.now() + 5 * 86_400_000,
      updatedAt: 1,
      account: { email: "parent@example.com", familyId: "fam", verified: true },
    };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByRole("heading", { name: /free month/ })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText("Your invite link")).toHaveValue(`${window.location.origin}/account/invite/?ref=ABCD2345`));
    expect(screen.getByText(/2 families have joined/)).toBeInTheDocument();
    expect(screen.getByText(/1 of 12 free months earned/)).toBeInTheDocument();
  });

  it("keeps the invite panel away from signed-out visitors", () => {
    state.android = false;
    state.family = { plan: "trial", trialEndsAt: Date.now() + 5 * 86_400_000, updatedAt: 1 };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.queryByRole("heading", { name: /free month/ })).not.toBeInTheDocument();
  });

  it("still shows the invite link inside the Android app", async () => {
    state.android = true;
    state.family = {
      plan: "trial",
      trialEndsAt: Date.now() + 5 * 86_400_000,
      updatedAt: 1,
      account: { email: "parent@example.com", familyId: "fam", verified: true },
    };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    await waitFor(() => expect(screen.getByLabelText("Your invite link")).toBeInTheDocument());
    state.android = false;
  });
});
