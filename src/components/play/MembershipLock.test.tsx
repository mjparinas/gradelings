// @vitest-environment jsdom
import { SITE_HOST } from "@/lib/brand";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ android: false, ios: false }));
vi.mock("@/lib/twa", () => ({ isStoreApp: () => state.android || state.ios, isIosApp: () => state.ios }));
vi.mock("./Companion", () => ({ Companion: () => <div /> }));

import { MembershipLock } from "./MembershipLock";

describe("MembershipLock", () => {
  it("sends a grown-up to subscribe, and stays a close button for the child", () => {
    state.android = false;
    render(<MembershipLock open onClose={() => {}} />);
    expect(screen.getByRole("link", { name: "Grown-ups: subscribe" })).toHaveAttribute("href", "/parents/#/subscription");
    expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
  });

  it("asks for a grown-up in the Android app without naming the website or a payment link", () => {
    state.android = true;
    render(<MembershipLock open onClose={() => {}} />);
    expect(screen.getByRole("dialog")).toHaveTextContent("Ask a grown-up about it.");
    expect(screen.getByRole("dialog")).not.toHaveTextContent(SITE_HOST);
    expect(screen.queryByRole("link", { name: "Grown-ups: subscribe" })).not.toBeInTheDocument();
  });

  it("asks for a grown-up in the iOS app too, with no payment link", () => {
    state.android = false;
    state.ios = true;
    render(<MembershipLock open onClose={() => {}} />);
    expect(screen.getByRole("dialog")).toHaveTextContent("Ask a grown-up about it.");
    expect(screen.queryByRole("link", { name: "Grown-ups: subscribe" })).not.toBeInTheDocument();
    state.ios = false;
  });
});
