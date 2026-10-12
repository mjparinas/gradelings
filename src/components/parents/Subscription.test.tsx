// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SITE_HOST } from "@/lib/brand";
import type { FamilyInfo } from "@/lib/model";
import { devBilling, loadReferral, openBillingPortal, redeemCode, refreshAccount, resendVerification, startCheckout } from "@/lib/account";
import { LIFETIME_ACCESS } from "@/lib/plan";

const state = vi.hoisted(() => ({
  family: { plan: "trial", trialEndsAt: Date.now() + 5 * 86_400_000, updatedAt: 1 } as FamilyInfo,
  android: false,
  query: new URLSearchParams(),
}));

vi.mock("@/lib/store", () => ({
  useStore: (sel: (s: { family: FamilyInfo }) => unknown) => sel({ family: state.family }),
}));
vi.mock("@/lib/router", () => ({
  useRoute: () => ({ path: ["subscription"], query: state.query }),
}));
vi.mock("@/lib/twa", () => ({ isAndroidApp: () => state.android }));
vi.mock("@/lib/account", () => ({
  refreshAccount: vi.fn(),
  startCheckout: vi.fn(),
  devBilling: vi.fn(),
  openBillingPortal: vi.fn(),
  resendVerification: vi.fn(),
  loadReferral: vi.fn().mockResolvedValue({ code: "ABCD2345", joined: 2, rewarded: 1, monthsEarned: 1, maxMonths: 12, bonusDays: 30 }),
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

  it("charges at checkout when the trial has less than two days left", () => {
    state.android = false;
    state.family = {
      plan: "trial",
      trialEndsAt: Date.now() + 86_400_000,
      updatedAt: 1,
      account: { email: "parent@example.com", familyId: "fam", verified: true },
    };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByText(/charged at checkout and the paid plan starts that day/i)).toBeInTheDocument();
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
    expect(screen.getByText(/keeps your free days.*first payment is on/i)).toBeInTheDocument();
  });

  it("never points Android parents to the website, and shows no plan buttons", () => {
    state.android = true;
    state.family = { plan: "trial", trialEndsAt: Date.now() + 5 * 86_400_000, updatedAt: 1 };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByText(/sign in with the same account and it shows up here/)).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(SITE_HOST);
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

describe("SubscriptionPage billing actions", () => {
  const account = { email: "parent@example.com", familyId: "fam", verified: true };
  beforeEach(() => {
    state.android = false;
    state.query = new URLSearchParams();
    vi.mocked(startCheckout).mockReset().mockResolvedValue(undefined);
    vi.mocked(devBilling).mockReset().mockResolvedValue(undefined);
    vi.mocked(openBillingPortal).mockReset().mockResolvedValue(undefined);
  });

  it("sends a yearly or monthly choice to Stripe checkout", async () => {
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByText(/The free plan keeps the first \d+ units of each subject/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Subscribe yearly/ }));
    await waitFor(() => expect(startCheckout).toHaveBeenCalledWith("year"));
    fireEvent.click(screen.getByRole("button", { name: /Subscribe monthly/ }));
    await waitFor(() => expect(startCheckout).toHaveBeenCalledWith("month"));
    expect(devBilling).not.toHaveBeenCalled();
  });

  it("shows why checkout failed and lets the parent try again", async () => {
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account };
    vi.mocked(startCheckout).mockRejectedValueOnce(new Error("You're offline. Connect to the internet and try again."));
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: /Subscribe yearly/ }));
    expect(await screen.findByText("You're offline. Connect to the internet and try again.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Subscribe yearly/ })).toBeEnabled();
  });

  it("simulates a subscription in development mode and says so", async () => {
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account };
    render(<SubscriptionPage billing={{ stripe: false, dev: true }} onBilling={() => {}} />);
    expect(screen.getByText(/Stripe isn't configured, so these buttons simulate a subscription/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Subscribe monthly/ }));
    await waitFor(() => expect(devBilling).toHaveBeenCalledWith("subscribe", "month"));
    expect(startCheckout).not.toHaveBeenCalled();
  });

  it("waits for a connection before offering plans", () => {
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account };
    render(<SubscriptionPage billing={null} onBilling={() => {}} />);
    expect(screen.getByText(/Connecting… \(subscriptions need an internet connection\)/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Subscribe yearly/ })).toBeDisabled();
  });

  it("resends the confirmation link from the subscribe page", async () => {
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account: { ...account, verified: false } };
    vi.mocked(resendVerification).mockResolvedValueOnce(undefined);
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Send the link again" }));
    expect(await screen.findByRole("button", { name: "Sent. Check your inbox" })).toBeDisabled();
  });

  it("lets the parent ask again if resending the link failed", async () => {
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account: { ...account, verified: false } };
    vi.mocked(resendVerification).mockRejectedValueOnce(new Error("offline"));
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Send the link again" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Send the link again" })).toBeEnabled());
  });

  it("opens the Stripe billing portal for a subscriber, with the renewal date", async () => {
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account, subscription: { status: "active", interval: "year", currentPeriodEnd: Date.UTC(2027, 2, 3, 12) } };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByRole("heading", { name: "Subscription" })).toBeInTheDocument();
    expect(screen.getByText("⭐ Premium (yearly)")).toBeInTheDocument();
    expect(screen.getByText("Renews March 3, 2027")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Manage billing, change plan or cancel" }));
    await waitFor(() => expect(openBillingPortal).toHaveBeenCalled());
  });

  it("cancels a simulated subscription in development mode", async () => {
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account, subscription: { status: "trialing", interval: "month" } };
    render(<SubscriptionPage billing={{ stripe: false, dev: true }} onBilling={() => {}} />);
    expect(screen.getByText("⭐ Premium (monthly)")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Cancel (development mode)" }));
    await waitFor(() => expect(devBilling).toHaveBeenCalledWith("cancel"));
  });

  it("thanks the parent after checkout and refreshes the plan from the server", async () => {
    state.query = new URLSearchParams("checkout=success");
    state.family = { plan: "premium", trialEndsAt: 0, updatedAt: 1, account };
    vi.mocked(refreshAccount).mockResolvedValueOnce({ stripe: true, dev: false });
    const onBilling = vi.fn();
    render(<SubscriptionPage billing={billing} onBilling={onBilling} />);
    expect(screen.getByText("🎉 Thank you! Your membership is active.")).toBeInTheDocument();
    await waitFor(() => expect(onBilling).toHaveBeenCalledWith({ stripe: true, dev: false }));
    expect(screen.getByText("Your membership is active.")).toBeInTheDocument();
  });

  it("tells an Android member billing isn't changed in the app, without naming the website", () => {
    state.android = true;
    state.family = { plan: "premium", trialEndsAt: 0, updatedAt: 1, account };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByText(/Billing changes aren't made in this app/)).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(SITE_HOST);
  });

  it("explains what a time-limited code covers, and that lifetime access needs nothing", () => {
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account, accessUntil: Date.UTC(2027, 0, 10, 12) };
    const { unmount } = render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByText("Your code gives your family everything until January 10, 2027. You can subscribe here when it ends.")).toBeInTheDocument();
    unmount();
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account, accessUntil: LIFETIME_ACCESS };
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(screen.getByText("Your code gives your family lifetime access. There's nothing to pay.")).toBeInTheDocument();
  });

  it("says what an access code gave", async () => {
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account };
    vi.mocked(redeemCode).mockResolvedValueOnce({ kind: "access", accessUntil: Date.UTC(2027, 5, 1, 12) }).mockResolvedValueOnce({ kind: "access", accessUntil: LIFETIME_ACCESS });
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    fireEvent.change(screen.getByLabelText("Code"), { target: { value: "GIFT" } });
    fireEvent.click(screen.getByRole("button", { name: "Redeem" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("🎉 Everything is open until June 1, 2027."));
    expect(screen.getByLabelText("Code")).toHaveValue("");
    fireEvent.change(screen.getByLabelText("Code"), { target: { value: "FOREVER" } });
    fireEvent.click(screen.getByRole("button", { name: "Redeem" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("🎉 Your family has lifetime access."));
  });

  it("copies and shares the invite link", async () => {
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account };
    const writeText = vi.fn().mockResolvedValue(undefined);
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    Object.defineProperty(navigator, "share", { value: share, configurable: true });
    vi.mocked(loadReferral).mockResolvedValueOnce({ code: "ONE23456", joined: 1, rewarded: 0, monthsEarned: 0, maxMonths: 12, bonusDays: 30 });
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    const link = `${window.location.origin}/account/invite/?ref=ONE23456`;
    await waitFor(() => expect(screen.getByLabelText("Your invite link")).toHaveValue(link));
    expect(screen.getByText(/1 family has joined/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
    expect(writeText).toHaveBeenCalledWith(link);
    expect(await screen.findByRole("button", { name: "Copied!" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Share…" }));
    expect(share).toHaveBeenCalledWith(expect.objectContaining({ url: link }));
    delete (navigator as { share?: unknown }).share;
  });

  it("says the invite link needs a connection when it can't load", async () => {
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account };
    vi.mocked(loadReferral).mockRejectedValueOnce(new Error("offline"));
    render(<SubscriptionPage billing={billing} onBilling={() => {}} />);
    expect(await screen.findByText(/Your invite link needs an internet connection/)).toBeInTheDocument();
  });
});
