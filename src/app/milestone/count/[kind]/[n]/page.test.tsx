// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CountMilestone from "./page";

vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const props = (kind: string, n: string) => ({ params: Promise.resolve({ kind, n }) }) as never;

describe("shared count milestone page", () => {
  it("celebrates the milestone", async () => {
    render(await CountMilestone(props("days", "100")));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("100 days of practice!");
  });

  it("is not found for a count we never make", async () => {
    await expect(CountMilestone(props("days", "101"))).rejects.toThrow();
  });
});
