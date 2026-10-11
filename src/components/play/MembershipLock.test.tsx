// @vitest-environment jsdom
import { SITE_HOST } from "@/lib/brand";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ android: false }));
vi.mock("@/lib/twa", () => ({ isAndroidApp: () => state.android }));
vi.mock("./Companion", () => ({ Companion: () => <div /> }));

import { MembershipLock } from "./MembershipLock";

describe("MembershipLock", () => {
  it("sends a grown-up to subscribe, and stays a close button for the child", () => {
    state.android = false;
    render(<MembershipLock open onClose={() => {}} />);
    expect(screen.getByRole("link", { name: "Grown-ups: subscribe" })).toHaveAttribute("href", "/parents/#/subscription");
    expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
  });

  it("tells a grown-up in the Android app to subscribe on the website, with no payment link", () => {
    state.android = true;
    render(<MembershipLock open onClose={() => {}} />);
    expect(screen.getByRole("dialog")).toHaveTextContent(`subscribe at ${SITE_HOST} in a browser`);
    expect(screen.queryByRole("link", { name: "Grown-ups: subscribe" })).not.toBeInTheDocument();
  });
});
