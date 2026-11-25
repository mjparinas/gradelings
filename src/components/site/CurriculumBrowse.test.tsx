// @vitest-environment jsdom
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { CurriculumBrowse, type CurriculumBrowseItem } from "./CurriculumBrowse";

vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const items: CurriculumBrowseItem[] = [
  {
    id: "ca-bc",
    slug: "bc",
    curriculumName: "BC Curriculum",
    name: "British Columbia",
    region: "British Columbia",
    country: "CA",
    span: "Pre-K to Grade 9",
    units: 100,
    href: "/curriculum/bc/",
  },
  {
    id: "ca-on",
    slug: "ontario",
    curriculumName: "Ontario Curriculum",
    name: "Ontario",
    region: "Ontario",
    country: "CA",
    span: "Junior Kindergarten to Grade 9",
    units: 110,
    href: "/curriculum/ontario/",
  },
  {
    id: "us-ca",
    slug: "california",
    curriculumName: "California Curriculum",
    name: "California",
    region: "California",
    country: "US",
    span: "Transitional Kindergarten through 9th grade",
    units: 90,
    href: "/curriculum/california/",
  },
];

describe("CurriculumBrowse", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("lists Canada and keeps US states behind a closed details group", () => {
    render(<CurriculumBrowse items={items} />);
    expect(screen.getByRole("heading", { name: "Canada" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /BC Curriculum/ })).toHaveAttribute("href", "/curriculum/bc/");
    expect(screen.getByRole("link", { name: /Ontario Curriculum/ })).toHaveAttribute("href", "/curriculum/ontario/");
    const us = screen.getByRole("heading", { name: /United States/ }).closest("details")!;
    expect(us).not.toHaveAttribute("open");
    expect(us).toHaveTextContent(/1 curricula · show list/);
    expect(within(us).getByRole("link", { name: /California Curriculum/ })).toHaveAttribute("href", "/curriculum/california/");
  });

  it("filters curricula as the visitor types", () => {
    render(<CurriculumBrowse items={items} />);
    fireEvent.change(screen.getByLabelText(/Find your province or state/), { target: { value: "ont" } });
    expect(screen.getByRole("heading", { name: "1 matching curriculum" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ontario Curriculum/ })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /BC Curriculum/ })).toBeNull();
    expect(screen.queryByRole("heading", { name: "Canada" })).toBeNull();
  });

  it("offers the last region this device read", async () => {
    localStorage.setItem("gradelings.region", JSON.stringify({ framework: "us-ca", grade: "4" }));
    render(<CurriculumBrowse items={items} />);
    await act(async () => {});
    const card = screen.getByRole("region", { name: /Continue where you left off/ });
    expect(card).toHaveTextContent("California");
    expect(within(card).getByRole("link", { name: "Browse California Curriculum" })).toHaveAttribute("href", "/curriculum/california/");
  });
});
