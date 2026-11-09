import type { DayStat } from "./derive";
import { activeDay } from "./quests";

// The warm one-line summary at the top of each child's card on the parent Overview: what the last seven
// days looked like in a sentence, and one small thing to do next. Read from the derived day stats, so
// nothing is stored. It describes practice, never a report-card mark, and never says what didn't happen
// in a way that shames a child or a parent.

export interface Highlight {
  icon: string;
  headline: string;
  /** A second line with the numbers behind the headline, or empty. */
  detail: string;
  /** One small, kind thing a grown-up can do next. */
  tip: string;
}

export interface HighlightInput {
  name: string;
  /** Stats for the last seven days, today first; a day with no practice is undefined. */
  week: (DayStat | undefined)[];
  /** Has the child ever answered a question? */
  everPractised: boolean;
  /** The started unit closest to its next level, if any. */
  next?: { title: string; questions: number; levelLabel: string };
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

export function parentHighlight({ name, week, everPractised, next }: HighlightInput): Highlight {
  const days = week.filter((s): s is DayStat => Boolean(s && activeDay(s))).length;
  const answers = week.reduce((n, s) => n + (s?.answers ?? 0), 0);
  const correct = week.reduce((n, s) => n + (s?.correct ?? 0), 0);
  const nextTip = next
    ? `${name} is ${plural(next.questions, "right answer")} away from growing into ${next.levelLabel} in ${next.title}. A short lesson would get there.`
    : "";

  if (!everPractised) {
    return {
      icon: "👋",
      headline: `${name} is all set up and ready to start.`,
      detail: "",
      tip: `The first lesson goes best with you beside ${name}. Ten minutes is plenty.`,
    };
  }
  if (days === 0) {
    return {
      icon: "🌤️",
      headline: `A quiet week for ${name}. That happens.`,
      detail: "",
      tip: nextTip || `One short lesson tonight is an easy way back in.`,
    };
  }
  const accuracy = answers ? Math.round((correct / answers) * 100) : 0;
  const detail = answers ? `${plural(answers, "question")} answered, ${accuracy}% right on the first try.` : "";
  if (days >= 5) {
    return { icon: "🌟", headline: `${name} practised on ${days} of the last 7 days. That's a real habit.`, detail, tip: nextTip || `Say what you noticed to ${name}. Being seen is the best reward.` };
  }
  if (days >= 3) {
    return { icon: "🌱", headline: `${name} practised on ${days} of the last 7 days. A steady rhythm.`, detail, tip: nextTip || `Keep the same time each day and it becomes easy.` };
  }
  return { icon: "👏", headline: `${name} practised on ${plural(days, "day")} this week. Every bit counts.`, detail, tip: nextTip || `A short lesson after dinner is plenty.` };
}
