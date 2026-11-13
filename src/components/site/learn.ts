import { ARTICLES, articleQuestion, type Article } from "@/content/articles";
import { EXPLORE_CARDS, exploreQuestion, TOPIC_NAME, type ExploreCard } from "@/content/explore";
import type { AgeBand } from "@/content/types";

// Public "Fun facts and short reading" pages (/learn/ and one page per Explore card and per article): the same
// original, region-free content kids meet in the app, as pages families can find from a search such as "why is the
// sky blue for kids". The library is region-free (checked in explore.test.ts and articles.test.ts), so nothing here
// reads a framework and one page serves every province and state.

export const learnPath = {
  hub: () => "/learn/",
  item: (id: string) => `/learn/${id}/`,
};

export const BAND_LABEL: Record<AgeBand, string> = {
  little: "Pre-K to Grade 1",
  middle: "Grades 2 to 4",
  big: "Grades 5 to 9",
};

export type LearnItem =
  | { kind: "card"; id: string; band: AgeBand; topic: "science" | "world"; title: string; emoji: string; card: ExploreCard }
  | { kind: "article"; id: string; band: AgeBand; topic: "science" | "world"; title: string; emoji: string; article: Article };

export const LEARN_ITEMS: LearnItem[] = [
  ...EXPLORE_CARDS.map((card): LearnItem => ({ kind: "card", id: card.id, band: card.band, topic: card.topic, title: card.title, emoji: card.emoji, card })),
  ...ARTICLES.map((article): LearnItem => ({ kind: "article", id: article.id, band: article.band, topic: article.topic, title: article.title, emoji: article.emoji, article })),
];

export function learnItem(id: string): LearnItem | undefined {
  return LEARN_ITEMS.find((i) => i.id === id);
}

export const topicName = (topic: "science" | "world"): string => TOPIC_NAME[topic].name;

/** Other items on the same subject and age, for "more to read". */
export function relatedItems(item: LearnItem, count = 4): LearnItem[] {
  return LEARN_ITEMS.filter((i) => i.id !== item.id && i.band === item.band && i.topic === item.topic).slice(0, count);
}

/** The page's questions, drawn the same way on every build. */
export function learnQuestions(item: LearnItem): { prompt: string; choices: string[]; answer: string; why: string }[] {
  const make = (q: { prompt: string; choices: string[]; answer: number; why: string }) => ({ prompt: q.prompt, choices: q.choices, answer: q.choices[q.answer], why: q.why });
  if (item.kind === "card") return [make(exploreQuestion(item.card, "page"))];
  return item.article.asks.map((_, n) => make(articleQuestion(item.article, n, "page")));
}

export const learnTitle = (item: LearnItem): string => item.title;

/** A search-result description: the opening words, cut at a word, then what the page offers. */
export function learnDescription(item: LearnItem): string {
  const tail = item.kind === "card" ? ` Free, with a quick question. ${BAND_LABEL[item.band]}.` : ` Free short read with two questions. ${BAND_LABEL[item.band]}.`;
  const lead = item.kind === "card" ? item.card.facts.join(" ") : item.article.paragraphs[0];
  const room = 158 - tail.length;
  if (lead.length <= room) return lead + tail;
  const cut = lead.slice(0, room - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:]+$/, "")}…${tail}`;
}

/** Title candidates, fullest first, for pageMeta. */
export const learnTitles = (item: LearnItem): string[] =>
  item.kind === "card" ? [`${item.title}: fun facts for kids`, item.title] : [`${item.title}: a short read for kids`, item.title];

export function allLearnPaths(): { path: string }[] {
  return [{ path: learnPath.hub() }, ...LEARN_ITEMS.map((i) => ({ path: learnPath.item(i.id) }))];
}
