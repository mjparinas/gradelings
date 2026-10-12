// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { savedReferralCode } from "@/lib/referral";
import { PinLink, RefCapture, ShareButton } from "./ShareButton";

afterEach(() => {
  localStorage.clear();
  window.history.replaceState(null, "", "/");
});

describe("ShareButton", () => {
  it("copies the page link on a computer and says so", async () => {
    const writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    render(<ShareButton path="/curriculum/bc/grade-4/math/" title="Grade 4 Math" />);
    expect(screen.queryByText(/Your invite is in the link/)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Share this page/ }));
    expect(writeText).toHaveBeenCalledWith(`${window.location.origin}/curriculum/bc/grade-4/math/`);
    expect(screen.getByRole("button", { name: /Link copied!/ })).toBeInTheDocument();
  });

  it("adds a signed-in parent's invite code, and tells them", async () => {
    const writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    localStorage.setItem("gradelings.myInvite", "ABCD2345");
    render(<ShareButton path="/guides/bc/" title="Guides" label="Share this guide" />);
    expect(screen.getByText("Your invite is in the link: a family that joins gives you a free month.")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Share this guide/ }));
    expect(writeText).toHaveBeenCalledWith(`${window.location.origin}/guides/bc/?ref=ABCD2345`);
  });
});

describe("PinLink", () => {
  it("is a plain Pinterest link with the tall image, and no Pinterest script", () => {
    render(<PinLink path="/guides/bc/grade-2/language/worksheet/" media="https://gradelings.com/guides/bc/grade-2/language/worksheet/pin.png" description="Free worksheet" />);
    const link = screen.getByRole("link", { name: /Save to Pinterest/ });
    const url = new URL(link.getAttribute("href")!);
    expect(url.origin + url.pathname).toBe("https://www.pinterest.com/pin/create/button/");
    expect(url.searchParams.get("url")).toBe("https://gradelings.com/guides/bc/grade-2/language/worksheet/");
    expect(url.searchParams.get("media")).toBe("https://gradelings.com/guides/bc/grade-2/language/worksheet/pin.png");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(document.querySelector("script")).toBeNull();
  });
});

describe("RefCapture", () => {
  it("remembers a friend's invite code from any shared public page, for sign-up", () => {
    window.history.replaceState(null, "", "/curriculum/bc/?ref=wxyz6789");
    render(<RefCapture />);
    expect(savedReferralCode()).toBe("WXYZ6789");
  });
});
