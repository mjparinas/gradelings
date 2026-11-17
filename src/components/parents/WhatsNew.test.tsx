// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const twa = vi.hoisted(() => ({ store: false }));
vi.mock("@/lib/twa", async (orig) => ({ ...(await orig<typeof import("@/lib/twa")>()), isStoreApp: () => twa.store }));

import { parentNews, newsSeen } from "@/lib/parentNews";
import { WhatsNewCard, WhatsNewLink, WhatsNewPage } from "./WhatsNew";

const newest = () => parentNews(false)[0];

beforeEach(() => {
  localStorage.clear();
  twa.store = false;
});

describe("What's new in the parent area", () => {
  it("shows nothing new to a device that has never looked, and starts from the newest post", () => {
    render(<WhatsNewLink />);
    expect(screen.getByRole("link", { name: /what's new/i })).toBeTruthy();
    expect(screen.queryByText(/\(\d+ new\)/)).toBeNull();
    expect(newsSeen()).toBe(newest().day);
  });

  it("offers a card and a dot for posts since the last visit, and Not now puts them away", async () => {
    localStorage.setItem("gradelings.news.seen", "2000-01-01");
    render(
      <>
        <WhatsNewCard />
        <WhatsNewLink />
      </>,
    );
    expect(screen.getByText(newest().headline)).toBeTruthy();
    expect(screen.getByText(/\(\d+ new\)/)).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Not now" }));
    expect(screen.queryByText("New in Gradelings")).toBeNull();
    expect(newsSeen()).toBe(newest().day);
  });

  it("lists the posts without teacher items and marks them seen", () => {
    localStorage.setItem("gradelings.news.seen", "2000-01-01");
    render(<WhatsNewPage />);
    expect(screen.getByRole("heading", { name: "What's new" })).toBeTruthy();
    expect(screen.queryByText("For teachers")).toBeNull();
    expect(screen.getAllByText("New").length).toBeGreaterThan(0);
    expect(newsSeen()).toBe(newest().day);
    expect(screen.getByRole("link", { name: /every update/i }).getAttribute("href")).toMatch(/^\/whats-new\/?$/);
  });

  it("in a store app has no link out to the website", () => {
    twa.store = true;
    render(<WhatsNewPage />);
    expect(screen.queryByRole("link", { name: /every update/i })).toBeNull();
  });
});
