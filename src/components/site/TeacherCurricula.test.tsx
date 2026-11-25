// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { byCountry } from "./provinces";
import { TEACHER_FRAMEWORKS, featuredTeacherFrameworks, teacherPath } from "./teachers";
import { TeacherCurricula } from "./TeacherCurricula";

vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const regions = TEACHER_FRAMEWORKS.map((f) => ({ slug: f.slug, region: f.region, country: f.country }));
const featured = featuredTeacherFrameworks().map((f) => ({ slug: f.slug, region: f.region, country: f.country }));

describe("TeacherCurricula", () => {
  it("shows featured picks first, and keeps every region under Browse all", () => {
    render(<TeacherCurricula featured={featured} regions={regions} regionWord="province or state" />);
    const picks = screen.getByRole("heading", { name: "Popular picks" }).parentElement!;
    expect(within(picks).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(featured.map((f) => teacherPath.framework(f)));
    const browse = screen.getByText("Browse all provinces and states").closest("details")!;
    for (const g of byCountry(TEACHER_FRAMEWORKS)) {
      const list = within(browse).getByRole("heading", { name: g.heading }).nextElementSibling as HTMLElement;
      expect(within(list).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(g.frameworks.map((f) => teacherPath.framework(f)));
    }
  });

  it("filters the full list when searching", async () => {
    const user = userEvent.setup();
    render(<TeacherCurricula featured={featured} regions={regions} regionWord="province or state" />);
    await user.type(screen.getByRole("searchbox"), "ontar");
    expect(screen.queryByRole("heading", { name: "Popular picks" })).toBeNull();
    expect(screen.getAllByRole("link").map((a) => a.textContent)).toEqual(["Ontario"]);
    expect(screen.getByRole("link", { name: "Ontario" })).toHaveAttribute("href", "/for-teachers/ontario/");
  });
});
