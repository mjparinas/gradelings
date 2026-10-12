// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { clearReferralCode, inviteLink, saveReferralCode, savedReferralCode } from "./referral";

describe("referral code storage", () => {
  beforeEach(() => localStorage.clear());

  it("remembers a valid code and forgets it when asked", () => {
    expect(saveReferralCode("abcd2345")).toBe("ABCD2345");
    expect(savedReferralCode()).toBe("ABCD2345");
    clearReferralCode();
    expect(savedReferralCode()).toBeNull();
  });

  it("refuses codes of the wrong shape and keeps nothing", () => {
    expect(saveReferralCode("<script>")).toBeNull();
    expect(saveReferralCode(null)).toBeNull();
    expect(savedReferralCode()).toBeNull();
  });

  it("builds the invite link", () => {
    expect(inviteLink("https://example.com", "ABCD2345")).toBe("https://example.com/account/invite/?ref=ABCD2345");
  });
});
