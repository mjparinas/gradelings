// What a question report carries besides the unit, the prompt and the reason: the curriculum the
// child follows and what was on screen (the choices, the right answer and the picture), so a report
// can be judged without regenerating the question. Content only; never anything about the child.
import type { Choice, Question, Visual } from "@/content/types";

export interface ReportDetails {
  /** The answer options, as the child saw them. Order and sort questions list their items. */
  choices?: string[];
  /** The right answer, in words. */
  answer?: string;
  /** The picture shown above the question. */
  visual?: Visual;
}

const MAX_TEXT = 120;
const MAX_CHOICES = 12;
/** A stored picture larger than this is dropped (a passage or table can be long; a malicious caller longer). */
const MAX_VISUAL = 6000;

const clip = (s: string) => s.replace(/\s+/g, " ").trim().slice(0, MAX_TEXT);

function choiceText(c: { label: string; emoji?: string; coin?: number; shape?: string }): string {
  const text = [c.emoji, c.label].filter(Boolean).join(" ");
  if (text) return text;
  if (c.coin !== undefined) return `${c.coin}¢`;
  return c.shape ?? "";
}

/** The details sent with a report of this question. */
export function reportDetails(q: Question): ReportDetails {
  const out: ReportDetails = {};
  switch (q.kind) {
    case "choice":
      out.choices = q.choices.map((c: Choice) => choiceText(c));
      out.answer = choiceText(q.choices.find((c) => c.id === q.answer) ?? { label: q.answer });
      break;
    case "input":
      out.answer = [q.answer, q.suffix].filter(Boolean).join(" ");
      break;
    case "build":
      out.answer = String(q.target);
      break;
    case "coins":
      out.answer = `${q.target}¢`;
      break;
    case "order":
      out.choices = q.items.map(choiceText);
      out.answer = "In the order listed";
      break;
    case "sort":
      out.choices = q.items.map((i) => `${choiceText(i)} → ${q.bins.find((b) => b.id === i.bin)?.label ?? i.bin}`);
      out.answer = "Each item in the basket listed";
      break;
    case "shade":
      out.answer = `${q.target} of ${q.parts} parts shaded`;
      break;
    case "place":
      out.answer = `${q.target} (from ${q.min} to ${q.max})`;
      break;
  }
  if (q.visual) out.visual = q.visual;
  return out;
}

/** Checks details sent by a caller, keeping only well-formed parts. Returns undefined when nothing is left. */
export function cleanReportDetails(raw: unknown): ReportDetails | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const r = raw as Record<string, unknown>;
  const out: ReportDetails = {};
  if (Array.isArray(r.choices)) {
    const choices = r.choices.filter((c): c is string => typeof c === "string").slice(0, MAX_CHOICES).map(clip);
    if (choices.length) out.choices = choices;
  }
  if (typeof r.answer === "string" && r.answer.trim()) out.answer = clip(r.answer);
  const v = r.visual;
  if (v && typeof v === "object" && !Array.isArray(v) && typeof (v as { type?: unknown }).type === "string") {
    const json = JSON.stringify(v);
    if (json.length <= MAX_VISUAL) out.visual = JSON.parse(json) as Visual;
  }
  return Object.keys(out).length ? out : undefined;
}

/** One line per detail for the report email (the picture is named, not drawn). */
export function detailLines(d: ReportDetails | undefined): string[] {
  if (!d) return [];
  const lines: string[] = [];
  if (d.choices) lines.push(`Choices: ${d.choices.join(" · ")}`);
  if (d.answer) lines.push(`Answer: ${d.answer}`);
  if (d.visual) lines.push(`Picture: ${d.visual.type}${d.visual.type === "equation" ? ` (${d.visual.text})` : ""}`);
  return lines;
}
