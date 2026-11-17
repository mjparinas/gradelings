// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TRIAL_DAYS } from "@/lib/plan";
import { ReadinessCheck } from "./ReadinessCheck";
import type { ReadyQuestion } from "./readiness";

vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const qs: ReadyQuestion[] = [
  { prompt: "2 + 2?", choices: ["3", "4", "5"].map((id) => ({ id, label: id })), answer: "4", hint: "Count on.", skill: "Adding", skillPath: "/worksheets/grade-2/adding/" },
  { prompt: "10 - 3?", choices: [], typed: { accept: ["7"] }, answer: "7", hint: "Count back.", skill: "Taking away", skillPath: "/worksheets/grade-2/taking-away/" },
];
const go = () => render(<ReadinessCheck questions={qs} gradeLabel="Grade 3" previousLabel="Grade 2" play="/play/" />);

describe("ReadinessCheck", () => {
  it("counts only first tries, links missed skills and says it is not a mark", () => {
    go();
    fireEvent.click(screen.getByRole("button", { name: "3" }));
    expect(screen.getByText(/Hint: Count on\./)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "4" }));
    fireEvent.click(screen.getByRole("button", { name: /Next question/ }));
    fireEvent.change(screen.getByLabelText("Your answer"), { target: { value: "7" } });
    fireEvent.click(screen.getByRole("button", { name: "Check" }));
    fireEvent.click(screen.getByRole("button", { name: /See how it went/ }));
    const result = screen.getByTestId("ready-result");
    expect(result).toHaveTextContent("1 of 2 right on the first try");
    expect(result).toHaveTextContent("Skills to look at");
    expect(screen.getByRole("link", { name: "Adding" })).toHaveAttribute("href", "/worksheets/grade-2/adding/");
    expect(screen.queryByRole("link", { name: "Taking away" })).toBeNull();
    expect(screen.getByTestId("try-free-note")).toHaveTextContent(`Free for ${TRIAL_DAYS} days`);
    expect(result).toHaveTextContent("not a report-card mark");
  });

  it("shows the answer after a second miss on a typed question", () => {
    go();
    fireEvent.click(screen.getByRole("button", { name: "4" }));
    fireEvent.click(screen.getByRole("button", { name: /Next question/ }));
    for (const v of ["1", "2"]) {
      fireEvent.change(screen.getByLabelText("Your answer"), { target: { value: v } });
      fireEvent.click(screen.getByRole("button", { name: "Check" }));
    }
    expect(screen.getByText(/The answer is 7/)).toBeInTheDocument();
  });
});
