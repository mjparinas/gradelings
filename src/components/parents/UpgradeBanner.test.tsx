// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SITE_HOST } from "@/lib/brand";
import type { FamilyInfo } from "@/lib/model";

const state = vi.hoisted(() => ({
  family: { plan: "trial", trialEndsAt: Date.now() + 3 * 86_400_000, updatedAt: 1 } as FamilyInfo,
  path: [""] as string[],
  android: false,
}));

vi.mock("@/lib/store", () => ({
  useStore: (sel: (s: { family: FamilyInfo }) => unknown) => sel({ family: state.family }),
}));
vi.mock("@/lib/router", () => ({
  useRoute: () => ({ path: state.path, query: new URLSearchParams() }),
}));
vi.mock("@/lib/twa", () => ({
  isAndroidApp: () => state.android,
}));

import { UpgradeBanner } from "./UpgradeBanner";

describe("UpgradeBanner", () => {
  it("asks a family on the trial to subscribe, and sends them to create an account first", () => {
    state.family = { plan: "trial", trialEndsAt: Date.now() + 3 * 86_400_000, updatedAt: 1 };
    state.path = [""];
    state.android = false;
    render(<UpgradeBanner />);
    expect(screen.getByRole("heading", { name: "Subscribe before the trial ends" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create an account to subscribe" })).toHaveAttribute("href", "#/account?next=subscription");
  });

  it("links a signed-in family straight to the subscribe page, including after the trial", () => {
    state.family = { plan: "free", trialEndsAt: 0, updatedAt: 1, account: { email: "a@b.co", familyId: "f" } };
    state.path = [""];
    state.android = false;
    render(<UpgradeBanner />);
    expect(screen.getByRole("heading", { name: "Subscribe to unlock the full app" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Subscribe" })).toHaveAttribute("href", "#/subscription");
  });

  it("stays hidden once the family has paid and on the subscribe page", () => {
    state.family = { plan: "premium", trialEndsAt: 0, updatedAt: 1 };
    state.android = false;
    const { rerender, container } = render(<UpgradeBanner />);
    expect(container).toBeEmptyDOMElement();

    state.family = { plan: "trial", trialEndsAt: Date.now() + 86_400_000, updatedAt: 1 };
    state.path = ["subscription"];
    rerender(<UpgradeBanner />);
    expect(container).toBeEmptyDOMElement();
  });

  it("tells Android parents to subscribe in a browser, with no payment button", () => {
    state.family = { plan: "trial", trialEndsAt: Date.now() + 86_400_000, updatedAt: 1 };
    state.path = [""];
    state.android = true;
    render(<UpgradeBanner />);
    expect(screen.getByRole("heading", { name: `Subscribe at ${SITE_HOST}` })).toBeInTheDocument();
    expect(screen.getByText(/Open/)).toHaveTextContent(SITE_HOST);
    expect(screen.getByText(/in your browser to subscribe/i)).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
