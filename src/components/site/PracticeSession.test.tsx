// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TRIAL_DAYS } from "@/lib/plan";
import { PracticeSession, SAMPLE_EVENT } from "./PracticeSession";
import { TryChoices } from "./TryChoices";

vi.stubEnv("__NEXT_TRAILING_SLASH", "1");
const track = vi.hoisted(() => vi.fn());
vi.mock("@vercel/analytics", () => ({ track }));

const choices = ["3", "4", "5"].map((id) => ({ id, content: <span>{id}</span> }));
const q = (n: number) => (
  <li key={n}>
    <TryChoices choices={choices} answer="4" answerLabel="4" hint="Count on." play="/play/#/start?framework=ca-bc" playLabel="Practise" />
  </li>
);
const setup = () => render(<PracticeSession play="/play/#/start?framework=ca-bc" playLabel="Practise" threshold={3}><ul>{[1, 2, 3].map(q)}</ul></PracticeSession>);
const answer = (i: number, label: string) => fireEvent.click(screen.getAllByRole("button", { name: label })[i]);

describe("PracticeSession", () => {
  beforeEach(() => track.mockClear());

  it("shows no app link after each question, only after the third", () => {
    setup();
    answer(0, "4");
    answer(1, "4");
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.queryByTestId("session-prompt")).toBeNull();
    answer(2, "4");
    expect(screen.getByTestId("session-prompt")).toHaveTextContent("3 of 3 right on the first try");
    expect(screen.getByRole("link", { name: /keep going/ })).toHaveAttribute("href", "/play/#/start?framework=ca-bc");
    expect(screen.getByTestId("try-free-note")).toHaveTextContent(`${TRIAL_DAYS} days`);
  });

  it("counts only first-try answers and sends one event without answers", () => {
    setup();
    answer(0, "3");
    answer(0, "5");
    answer(1, "4");
    answer(2, "4");
    expect(screen.getByTestId("session-prompt")).toHaveTextContent("2 of 3 right on the first try");
    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith(SAMPLE_EVENT, { from: "/" });
  });
});
