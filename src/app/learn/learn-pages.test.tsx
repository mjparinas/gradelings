// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LearnHub from "./page";
import LearnPage from "./[id]/page";
import { LEARN_ITEMS } from "@/components/site/learn";

vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const page = (id: string) => ({ params: Promise.resolve({ id }) }) as never;

describe("learn pages", () => {
  it("the hub lists every card and article, grouped by age", () => {
    render(<LearnHub />);
    for (const heading of ["Pre-K to Grade 1", "Grades 2 to 4", "Grades 5 to 9"]) expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    for (const i of LEARN_ITEMS) expect(document.querySelector(`a[href="/learn/${i.id}/"]`), i.id).not.toBeNull();
  });

  it("a card page shows its three facts and one question", async () => {
    render(await LearnPage(page("the-moon")));
    expect(screen.getByRole("heading", { level: 1, name: /The Moon/ })).toBeInTheDocument();
    expect(screen.getByText("Its shape seems to change each night.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Try a question" })).toBeInTheDocument();
  });

  it("an article page shows its paragraphs and two questions", async () => {
    render(await LearnPage(page("why-the-sky-is-blue")));
    expect(screen.getByRole("heading", { level: 1, name: /Why the sky is blue/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Try two questions" })).toBeInTheDocument();
    expect(screen.getAllByRole("list", { name: "Choices" })).toHaveLength(2);
  });
});
