import type { LiveForTeacher } from "./live";

// An exit ticket is a few live questions asked back to back, with one results page at the end. It is
// built from the live questions the class already has (nothing new is stored, so the answers are still
// deleted a day after they are asked), and it never changes anyone's practice levels.

/** How many questions a ticket can have. */
export const TICKET_SIZES = [3, 4, 5] as const;

export interface TicketQuestion {
  prompt: string;
  unitKey: string;
  right: number;
  answered: number;
}

export interface TicketStudent {
  name: string;
  /** Questions answered right. */
  right: number;
  /** Questions answered at all. */
  answered: number;
}

export interface TicketSummary {
  questions: TicketQuestion[];
  students: TicketStudent[];
  /** Answered, but got fewer than 60% of the ticket right (the same line "finding it tricky" uses elsewhere). */
  checkIn: string[];
  /** Did not answer any of the questions. */
  noAnswer: string[];
}

/** The ticket's questions, in the order they were asked, from the day's live questions. Ones that are gone are left out. */
export function ticketItems(recent: LiveForTeacher[], ids: string[]): LiveForTeacher[] {
  const byId = new Map(recent.map((q) => [q.id, q]));
  return ids.flatMap((id) => byId.get(id) ?? []);
}

export function ticketSummary(items: LiveForTeacher[], students: { profileId: string; name: string }[]): TicketSummary {
  const questions = items.map((q) => ({ prompt: q.question.prompt, unitKey: q.unitKey, right: q.answers.filter((a) => a.correct).length, answered: q.answers.length }));
  const rows = students.map((s) => {
    const mine = items.flatMap((q) => q.answers.filter((a) => a.profileId === s.profileId));
    return { name: s.name, right: mine.filter((a) => a.correct).length, answered: mine.length };
  });
  return {
    questions,
    students: rows,
    checkIn: rows.filter((r) => r.answered > 0 && r.right < 0.6 * items.length).map((r) => r.name),
    noAnswer: rows.filter((r) => r.answered === 0).map((r) => r.name),
  };
}

/** The results as plain text a teacher can copy. Says it is practice, not a mark. */
export function ticketText(summary: TicketSummary, unitName: (key: string) => string, className: string, appName: string): string {
  const total = summary.questions.length;
  const lines = [`${className}: exit ticket (${appName})`];
  summary.questions.forEach((q, i) => lines.push("", `${i + 1}. ${unitName(q.unitKey)}: ${q.prompt}`, `   ${q.right} of ${q.answered} answered right.`));
  lines.push("", ...summary.students.map((s) => `${s.name}: ${s.right} of ${total} right${s.answered < total ? ` (${s.answered} answered)` : ""}`));
  if (summary.checkIn.length) lines.push("", `To check in with: ${summary.checkIn.join(", ")}.`);
  if (summary.noAnswer.length) lines.push(`Did not answer: ${summary.noAnswer.join(", ")}.`);
  lines.push("", "This reflects practice, not a report-card mark.");
  return lines.join("\n");
}
