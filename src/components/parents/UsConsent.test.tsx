// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { FamilyInfo } from "@/lib/model";

const state = vi.hoisted(() => ({ family: {} as FamilyInfo, giveConsent: vi.fn(async () => {}) }));

vi.mock("@/lib/store", () => ({
  useStore: (sel: (s: { family: FamilyInfo }) => unknown) => sel({ family: state.family }),
}));
vi.mock("@/lib/account", () => ({ giveConsent: state.giveConsent }));
// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

import { UsConsent } from "./UsConsent";

const account = { email: "p@example.com", familyId: "f1" };

describe("UsConsent", () => {
  it("shows nothing to Canadian families, US families who agreed, or devices with no account", () => {
    for (const family of [
      { plan: "trial", trialEndsAt: 0, updatedAt: 1, account, country: "CA" },
      { plan: "trial", trialEndsAt: 0, updatedAt: 1, account, country: "US", consentAt: 5 },
      { plan: "trial", trialEndsAt: 0, updatedAt: 1, country: "US" },
    ] as FamilyInfo[]) {
      state.family = family;
      const { container, unmount } = render(<UsConsent />);
      expect(container).toBeEmptyDOMElement();
      unmount();
    }
  });

  it("gives a US parent the notice and records consent only once they tick the box", async () => {
    state.family = { plan: "trial", trialEndsAt: 0, updatedAt: 1, account, country: "US", consentAt: null };
    render(<UsConsent />);
    expect(screen.getByRole("heading", { name: "Your permission to save your children’s progress" })).toBeInTheDocument();
    expect(screen.getByText(/stays on this device only/)).toBeInTheDocument();
    expect(screen.getByText(/first name or nickname, grade/)).toBeInTheDocument();
    const agree = screen.getByRole("button", { name: "Agree and sync" });
    expect(agree).toBeDisabled();
    await userEvent.click(screen.getByRole("checkbox"));
    await userEvent.click(agree);
    expect(state.giveConsent).toHaveBeenCalledTimes(1);
  });
});
