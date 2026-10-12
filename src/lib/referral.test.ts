// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { clearReferralCode, forgetMyInvite, inviteLink, myInviteCode, rememberMyInvite, saveReferralCode, savedReferralCode, shareLink } from "./referral";

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

describe("the parent's own invite code on share links", () => {
  beforeEach(() => localStorage.clear());

  it("adds the remembered code to a shared page link, and nothing once forgotten", () => {
    expect(shareLink("https://example.com", "/curriculum/bc/grade-4/math/")).toBe("https://example.com/curriculum/bc/grade-4/math/");
    rememberMyInvite("abcd2345");
    expect(myInviteCode()).toBe("ABCD2345");
    expect(shareLink("https://example.com", "/curriculum/bc/grade-4/math/")).toBe("https://example.com/curriculum/bc/grade-4/math/?ref=ABCD2345");
    forgetMyInvite();
    expect(myInviteCode()).toBeNull();
  });

  it("keeps it apart from a friend's code waiting for sign-up, and ignores bad codes", () => {
    saveReferralCode("WXYZ6789");
    rememberMyInvite("<script>");
    expect(myInviteCode()).toBeNull();
    rememberMyInvite("ABCD2345");
    expect(savedReferralCode()).toBe("WXYZ6789");
  });
});
