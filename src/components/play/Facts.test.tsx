// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand, GradeId } from "@/content/types";
import { BandProvider } from "../band";

const h = vi.hoisted(() => ({
  go: vi.fn(),
  grade: "4" as GradeId,
  subjects: ["math", "language"] as string[],
  premium: true,
  facts: {} as Record<string, { attempts: number; recent: boolean[]; lastT: number }>,
}));
vi.mock("@/lib/router", () => ({ go: h.go }));
vi.mock("@/lib/plan", () => ({ canUse: () => h.premium }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1", name: "Leo", grade: h.grade, framework: "ca-bc" }),
  useChildSettings: () => ({ enabledSubjects: h.subjects }),
  useDerived: () => ({ facts: h.facts }),
  useStore: (select: (s: unknown) => unknown) => select({ family: {} }),
}));
vi.mock("./MembershipLock", () => ({ MembershipLock: ({ open }: { open: boolean }) => (open ? <p>Ask a grown-up</p> : null) }));

import { FactsPicker } from "./Facts";

const show = (band: AgeBand = "big") => render(<BandProvider value={band}>{<FactsPicker />}</BandProvider>);

beforeEach(() => {
  h.go.mockClear();
  h.grade = "4";
  h.subjects = ["math", "language"];
  h.premium = true;
  h.facts = {};
});

describe("FactsPicker", () => {
  it("lists the grade's fact sets with how many are known and the facts still being practised", () => {
    h.facts = {
      "mul:7:8": { attempts: 2, recent: [true, true], lastT: 1 },
      "mul:6:9": { attempts: 1, recent: [false], lastT: 2 },
    };
    show();
    const sets = screen.getAllByRole("button").filter((b) => b.textContent?.includes(" of "));
    expect(sets.map((b) => b.querySelector(".text-3xl")?.textContent)).toEqual(["Addition facts", "Subtraction facts", "Times tables", "Division facts"]);
    const times = screen.getByRole("button", { name: /Times tables/ });
    expect(times).toHaveTextContent("1 of 100");
    expect(times).toHaveTextContent("Practising: 6 × 9");
  });

  it("starts a round of the set picked", () => {
    show();
    fireEvent.click(screen.getByRole("button", { name: /Division facts/ }));
    expect(h.go).toHaveBeenCalledWith("/session", { mode: "facts", scope: "div" });
  });

  it("asks a grown-up on the free plan", () => {
    h.premium = false;
    show();
    fireEvent.click(screen.getByRole("button", { name: /Times tables/ }));
    expect(h.go).not.toHaveBeenCalledWith("/session", expect.anything());
    expect(screen.getByText("Ask a grown-up")).toBeInTheDocument();
  });

  it("gives Grade 1 adding and taking away to 10, with Back to Lessons", () => {
    h.grade = "1";
    show("little");
    expect(screen.getByRole("button", { name: /Adding to 10/ })).toHaveTextContent("0 of 45");
    expect(screen.getByRole("button", { name: /Take away to 10/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Times tables/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(h.go).toHaveBeenCalledWith("/practice");
  });

  it("has nothing to practise in Kindergarten or with math switched off", () => {
    h.grade = "k";
    const first = show("little");
    expect(screen.getByText("Math Facts start next year!")).toBeInTheDocument();
    first.unmount();
    h.grade = "4";
    h.subjects = ["language"];
    show();
    expect(screen.queryByRole("button", { name: /Times tables/ })).not.toBeInTheDocument();
    expect(screen.getByText("Math is switched off right now. A grown-up can turn it on.")).toBeInTheDocument();
  });
});
