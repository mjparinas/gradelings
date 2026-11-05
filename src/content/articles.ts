import { hashSeed, shuffle, withSeed } from "./random";
import { textReadingLevel } from "../lib/readingLevel";
import type { AgeBand } from "./types";

// Short non-fiction articles: original, region-free reading about science and our world, four for Grades 2
// to 4 and four for Grades 5 to 9, each with two quick questions. A level is computed from the text (never
// tagged by hand). Nothing is scored or saved: an article is reading for curiosity, not practice.

export type ArticleBand = Exclude<AgeBand, "little">;

export interface Article {
  id: string;
  band: ArticleBand;
  topic: "science" | "world";
  title: string;
  emoji: string;
  /** Three or four short paragraphs. */
  paragraphs: string[];
  asks: { prompt: string; right: string; wrong: [string, string]; why: string }[];
}

export const ARTICLES: Article[] = [
  {
    id: "how-bees-make-honey", band: "middle", topic: "science", title: "How bees make honey", emoji: "🍯",
    paragraphs: [
      "A honey bee spends its day visiting flowers. It drinks a sugary juice called nectar and stores it in a special stomach.",
      "Back at the hive, the bee passes the nectar to a helper. The helpers chew it and spread it into tiny wax cells.",
      "Then the bees fan their wings. The warm air dries the nectar until it is thick and sticky.",
      "When the honey is ready, the bees seal each cell with wax. The honey stays safe there until the colony needs food.",
    ],
    asks: [
      { prompt: "What do bees collect from flowers to make honey?", right: "Nectar", wrong: ["Wax", "Seeds"], why: "Bees drink sugary nectar from flowers." },
      { prompt: "Why do the bees fan their wings?", right: "To dry the nectar", wrong: ["To cool the flowers", "To scare away ants"], why: "Fanning moves warm air over the nectar and thickens it." },
    ],
  },
  {
    id: "the-water-cycle", band: "middle", topic: "science", title: "Water goes around", emoji: "💧",
    paragraphs: [
      "The water on Earth is always on the move. It rises, travels and falls again, over and over.",
      "The sun warms the water in oceans and lakes. Some of it turns into an invisible gas and floats up into the air.",
      "High up, the air is cold. The gas cools and turns back into tiny drops, and the drops gather to make clouds.",
      "When the drops grow heavy, they fall as rain or snow. Then the water runs back to rivers and oceans, ready to start again.",
    ],
    asks: [
      { prompt: "What warms the water so it rises into the air?", right: "The sun", wrong: ["The wind", "The moon"], why: "The sun warms the water in oceans and lakes." },
      { prompt: "What happens when the drops in a cloud grow heavy?", right: "They fall as rain or snow", wrong: ["They turn into rocks", "They float away forever"], why: "Heavy drops fall as rain or snow." },
    ],
  },
  {
    id: "a-day-at-the-market", band: "middle", topic: "world", title: "A day at the market", emoji: "🧺",
    paragraphs: [
      "Early in the morning, farmers set up tables at the market. They bring fruit, bread, eggs and flowers from nearby farms.",
      "People walk from table to table. They look, they ask questions and they choose what to buy.",
      "Each farmer needs money to buy seeds and pay helpers. Each shopper needs food to eat. The market lets them help one another.",
      "By afternoon the tables are almost empty. The farmers pack up, and tomorrow they will start work again.",
    ],
    asks: [
      { prompt: "Where does the food at the market come from?", right: "Nearby farms", wrong: ["Far away space", "The bottom of the sea"], why: "The farmers bring food from nearby farms." },
      { prompt: "How does the market help both farmers and shoppers?", right: "Farmers earn money and shoppers get food", wrong: ["Shoppers grow the food", "Farmers buy all the food back"], why: "Each one gets what they need from the other." },
    ],
  },
  {
    id: "how-maps-help", band: "middle", topic: "world", title: "How maps help us", emoji: "🗺️",
    paragraphs: [
      "A map is a drawing of a place as seen from above. It shows where things are and how far apart they are.",
      "Most maps have a key. The key explains what each small picture or shape means, such as a wave for water.",
      "Many maps also show a compass rose. It points out north, south, east and west so you can tell which way to go.",
      "With a good map, you can find a park, plan a trip or share the way to your home with a friend.",
    ],
    asks: [
      { prompt: "What does the key on a map do?", right: "Explains what the pictures and shapes mean", wrong: ["Locks the map", "Shows the weather"], why: "The key tells you what each symbol or shape means." },
      { prompt: "What does a compass rose show?", right: "The directions", wrong: ["The map's age", "The size of the page"], why: "It points out north, south, east and west." },
    ],
  },
  {
    id: "why-the-moon-changes", band: "big", topic: "science", title: "Why the Moon seems to change shape", emoji: "🌙",
    paragraphs: [
      "Over about a month, the Moon seems to grow from a thin sliver to a bright circle and then shrink away again. In fact, its shape never changes at all.",
      "The Moon makes no light of its own. We see it because it reflects sunlight, and the Sun always lights exactly half of the Moon at a time.",
      "As the Moon travels around Earth, we view that lit half from different angles. When the lit side faces us, we see a full Moon. When it faces away, the Moon is almost dark, and we call it a new Moon.",
      "Between those two points, we see only part of the lit half. These changing views are called the phases of the Moon, and they repeat in a steady cycle of about twenty-nine days.",
    ],
    asks: [
      { prompt: "Why do we see the Moon at all?", right: "It reflects sunlight", wrong: ["It makes its own light", "It reflects light from the oceans"], why: "The Moon makes no light of its own; it reflects sunlight." },
      { prompt: "What causes the phases of the Moon?", right: "We see its lit half from different angles", wrong: ["Earth's shadow covers it each night", "The Moon really changes size"], why: "As the Moon orbits Earth, our view of its lit half changes." },
    ],
  },
  {
    id: "how-vaccines-train-the-body", band: "big", topic: "science", title: "Training the body's defenders", emoji: "🛡️",
    paragraphs: [
      "Your body has an immune system, a team of cells that finds and fights germs. The first time it meets a new germ, it needs several days to learn how to beat it.",
      "A vaccine gives the immune system a safe preview. It contains a harmless piece or a weakened form of a germ, which cannot make you seriously ill.",
      "The immune system studies this preview and builds protection against it. It also keeps a memory of what the germ looked like.",
      "Later, if the real germ ever arrives, the body recognizes it quickly and responds before the germ can spread. That is why vaccines can prevent many diseases.",
    ],
    asks: [
      { prompt: "What does a vaccine give the immune system?", right: "A safe preview of a germ", wrong: ["A new set of bones", "A strong dose of the real illness"], why: "A vaccine is a harmless piece or weakened form of a germ." },
      { prompt: "Why can the body respond faster after a vaccine?", right: "It remembers the germ", wrong: ["It has more blood", "The germ gets weaker with age"], why: "The immune system keeps a memory of the germ." },
    ],
  },
  {
    id: "supply-and-demand", band: "big", topic: "world", title: "Why prices go up and down", emoji: "📈",
    paragraphs: [
      "Prices are not set at random. They change with two forces: how much of something is available, and how many people want it.",
      "The amount available is called supply. The number of people who want to buy is called demand.",
      "When demand is high and supply is low, sellers can ask for more, so prices tend to rise. Think of umbrellas during a week of heavy rain.",
      "When supply is high and demand is low, sellers lower their prices to attract buyers. Those same umbrellas become cheaper once the sun returns.",
    ],
    asks: [
      { prompt: "What usually happens to prices when demand is high and supply is low?", right: "They tend to rise", wrong: ["They tend to fall", "They always stay the same"], why: "Sellers can ask for more when many people want something that is scarce." },
      { prompt: "What does \"supply\" mean?", right: "How much of something is available", wrong: ["How many people want it", "How fast it is made"], why: "Supply is the amount available; demand is how many people want it." },
    ],
  },
  {
    id: "how-a-law-is-made", band: "big", topic: "world", title: "From idea to rule", emoji: "📜",
    paragraphs: [
      "A law is a rule that everyone in a community must follow. Laws usually begin as ideas: someone notices a problem and suggests a way to solve it.",
      "The idea is written down as a proposal, often called a bill. Elected representatives read it, ask questions and discuss whether it would help.",
      "The representatives may change the wording, and they vote on it. If enough of them agree, the bill moves on to the next step.",
      "Once the final approvals are given, the bill becomes law. Citizens can then be expected to follow it, and courts can apply it when disagreements arise.",
    ],
    asks: [
      { prompt: "What is a proposed law called before it is approved?", right: "A bill", wrong: ["A badge", "A treaty"], why: "A proposal for a new law is usually called a bill." },
      { prompt: "Who discusses and votes on a bill?", right: "Elected representatives", wrong: ["Only the newest citizens", "Anyone who walks past"], why: "Elected representatives read, discuss and vote." },
    ],
  },
];

export function articlesFor(band: AgeBand): Article[] {
  return band === "little" ? [] : ARTICLES.filter((a) => a.band === band);
}

export function findArticle(id: string): Article | undefined {
  return ARTICLES.find((a) => a.id === id);
}

/** The article's reading level, computed from its words. */
export function articleLevel(a: Article): number {
  return textReadingLevel(a.paragraphs.join(" ")) ?? 0;
}

export interface ArticleQuestion {
  prompt: string;
  choices: string[];
  answer: number;
  why: string;
}

/** Question `n` of an article, with its choices shuffled the same way for the same seed. */
export function articleQuestion(a: Article, n: number, seed: string): ArticleQuestion {
  const ask = a.asks[n % a.asks.length];
  const choices = withSeed(hashSeed(`${a.id}:${n}:${seed}`), () => shuffle([ask.right, ...ask.wrong]));
  return { prompt: ask.prompt, choices, answer: choices.indexOf(ask.right), why: ask.why };
}
