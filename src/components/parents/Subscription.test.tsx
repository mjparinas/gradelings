// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SITE_HOST } from "@/lib/brand";
import type { FamilyInfo } from "@/lib/model";
import { redeemCode } from "@/lib/account";
import { LIFETIME_ACCESS } from "@/lib/plan";

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
  redeemCode: vi.fn(),
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

  it("redeems a code and says what it gave", async () => {
    state.android = false;
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account: { email: "parent@example.com", familyId: "fam", verified: true } };
    vi.mocked(redeemCode).mockResolvedValueOnce({ kind: "discount", percentOff: 20 }).mockRejectedValueOnce(new Error("That code isn't valid. Check it and try again."));
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    const box = screen.getByLabelText("Code");
    expect(screen.getByRole("button", { name: "Redeem" })).toBeDisabled();
    fireEvent.change(box, { target: { value: "save-20" } });
    fireEvent.click(screen.getByRole("button", { name: "Redeem" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("20% off is saved for when you subscribe."));
    expect(redeemCode).toHaveBeenCalledWith("save-20");
    fireEvent.change(box, { target: { value: "wrong" } });
    fireEvent.click(screen.getByRole("button", { name: "Redeem" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("That code isn't valid."));
  });

  it("shows code access, a waiting discount, and hides the code box for lifetime access", () => {
    state.android = false;
    const account = { email: "parent@example.com", familyId: "fam", verified: true };
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account, accessUntil: Date.UTC(2027, 5, 1, 12) };
    const { unmount } = render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByText("⭐ Premium from your code")).toBeInTheDocument();
    expect(screen.getByText("Free access until June 1, 2027")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Have a code?" })).toBeInTheDocument();
    unmount();

    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account, discount: { code: "SAVE20", percentOff: 20 } };
    const second = render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByText(/Code SAVE20: 20% off is taken off at checkout/)).toBeInTheDocument();
    second.unmount();

    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account, accessUntil: LIFETIME_ACCESS };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByText("⭐ Premium · lifetime access")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Have a code?" })).not.toBeInTheDocument();
  });

  it("offers the code box in the Android app too, where it can't take a payment", () => {
    state.android = true;
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account: { email: "parent@example.com", familyId: "fam", verified: true } };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByRole("heading", { name: "Have a code?" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Subscribe yearly/ })).not.toBeInTheDocument();
    state.android = false;
  });
});
