import { describe, expect, it } from "vitest";
import type { LiveForTeacher } from "./live";
import { ticketItems, ticketSummary, ticketText } from "./exitTicket";

const students = [{ profileId: "a", name: "Maya" }, { profileId: "b", name: "Sam" }, { profileId: "c", name: "Alex" }];
const q = (id: string, prompt: string, answers: [string, boolean][]): LiveForTeacher => ({
  id,
  unitKey: "3/math/counting",
  question: { prompt, hint: "", choices: [{ id: "x", label: "1" }], answer: "x" },
  revealed: true,
  createdAt: 0,
  answers: answers.map(([profileId, correct]) => ({ profileId, choice: "x", correct })),
});
const day = [
  q("q1", "One?", [["a", true], ["b", false]]),
  q("q2", "Two?", [["a", true], ["b", false], ["c", true]]),
  q("q3", "Three?", [["a", false], ["b", true]]),
  q("old", "Not part of it?", [["a", true]]),
];

describe("ticketItems", () => {
  it("keeps the ticket's questions in the order they were asked, and skips ones that are gone", () => {
    expect(ticketItems(day, ["q2", "gone", "q1"]).map((i) => i.id)).toEqual(["q2", "q1"]);
  });
});

describe("ticketSummary", () => {
  const items = ticketItems(day, ["q1", "q2", "q3"]);
  const s = ticketSummary(items, students);

  it("counts right and answered for each question and each student", () => {
    expect(s.questions.map((x) => [x.right, x.answered])).toEqual([[1, 2], [2, 3], [1, 2]]);
    expect(s.students).toEqual([
      { name: "Maya", right: 2, answered: 3 },
      { name: "Sam", right: 1, answered: 3 },
      { name: "Alex", right: 1, answered: 1 },
    ]);
  });

  it("flags students under 60% for a check-in, counting questions they skipped as not right", () => {
    expect(s.checkIn).toEqual(["Sam", "Alex"]);
    expect(s.noAnswer).toEqual([]);
  });

  it("lists students who answered nothing apart from the check-in list", () => {
    const some = ticketSummary(ticketItems(day, ["q1"]), students);
    expect(some.noAnswer).toEqual(["Alex"]);
    expect(some.checkIn).toEqual(["Sam"]);
  });

  it("is empty for a ticket with no questions left", () => {
    expect(ticketSummary([], students)).toEqual({ questions: [], students: students.map((x) => ({ name: x.name, right: 0, answered: 0 })), checkIn: [], noAnswer: ["Maya", "Sam", "Alex"] });
  });
});

describe("ticketText", () => {
  it("writes each question, each student and who to check in with, and says it is not a mark", () => {
    const text = ticketText(ticketSummary(ticketItems(day, ["q1", "q2", "q3"]), students), () => "Counting", "Room 4", "Gradelings");
    expect(text).toContain("Room 4: exit ticket (Gradelings)");
    expect(text).toContain("2. Counting: Two?");
    expect(text).toContain("   2 of 3 answered right.");
    expect(text).toContain("Maya: 2 of 3 right");
    expect(text).toContain("Alex: 1 of 3 right (1 answered)");
    expect(text).toContain("To check in with: Sam, Alex.");
    expect(text).toContain("not a report-card mark");
  });
});
