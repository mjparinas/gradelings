// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VerifyView } from "./VerifyView";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});

function confirm(search: string, answer: object) {
  window.history.replaceState(null, "", `/account/verify/${search}`);
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(answer), { status: 200 })));
  render(<VerifyView />);
}

describe("VerifyView", () => {
  it("sends a signed-in parent straight to adding a child", async () => {
    confirm("?token=abc", { ok: true, signedIn: true });
    const link = await screen.findByRole("link", { name: "Add my child" });
    expect(link).toHaveAttribute("href", "/parents/?signedin=1&addchild=1#/children");
    expect(screen.getByText(/add your child’s first name and grade/)).toBeInTheDocument();
  });
  it("sends a teacher to the teacher area, and a parent who isn't signed in to the Parent area", async () => {
    confirm("?token=abc&to=teachers", { ok: true, signedIn: true });
    expect(await screen.findByRole("link", { name: "Go to the teacher area" })).toHaveAttribute("href", "/teachers/");
  });
  it("keeps the plain link when nobody was signed in", async () => {
    confirm("?token=abc", { ok: true, signedIn: false });
    expect(await screen.findByRole("link", { name: "Go to the Parent area" })).toHaveAttribute("href", "/parents/");
  });
});
