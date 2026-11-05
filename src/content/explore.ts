import { hashSeed, shuffle, withSeed } from "./random";
import type { AgeBand } from "./types";

// Explore cards: short, original "did you know" cards for science and our world (social studies), with one
// quick question each. Eight cards for each of the three age bands (four science, four world).
// Region-free (no curriculum, place, money or holiday), so one library serves every province and state, and
// free of spelling that differs between Canada and the US. Nothing here is scored or saved: a card is for
// curiosity, not practice.

export type ExploreTopic = "science" | "world";

export interface ExploreCard {
  id: string;
  band: AgeBand;
  topic: ExploreTopic;
  title: string;
  emoji: string;
  /** Three short facts, read one after another. */
  facts: [string, string, string];
  /** The quick question: the right answer, two clear misses, and why. */
  ask: { prompt: string; right: string; wrong: [string, string]; why: string };
}

export const TOPIC_NAME: Record<ExploreTopic, { name: string; emoji: string }> = {
  science: { name: "Science", emoji: "🔬" },
  world: { name: "Our world", emoji: "🌍" },
};

export const EXPLORE_CARDS: ExploreCard[] = [
  // ——— Pre-K to Grade 1 ———
  {
    id: "busy-bees",
    band: "little",
    topic: "science",
    title: "Busy bees",
    emoji: "🐝",
    facts: ["Bees visit flowers to drink sweet nectar.", "Bees carry pollen from flower to flower.", "Pollen helps plants make new seeds."],
    ask: { prompt: "What do bees drink from flowers?", right: "Sweet nectar", wrong: ["Sand", "Snow"], why: "Bees sip sweet nectar from flowers." },
  },
  {
    id: "rain-clouds",
    band: "little",
    topic: "science",
    title: "Rain clouds",
    emoji: "☁️",
    facts: ["Clouds are made of tiny drops of water.", "When the drops get big and heavy, they fall.", "Rain fills puddles and helps plants grow."],
    ask: { prompt: "What falls from a cloud when the drops get heavy?", right: "Rain", wrong: ["Rocks", "Leaves"], why: "Heavy water drops fall as rain." },
  },
  {
    id: "little-seeds",
    band: "little",
    topic: "science",
    title: "Little seeds",
    emoji: "🌱",
    facts: ["A seed has a tiny plant inside.", "With water and warmth, the seed starts to grow.", "Roots grow down and a shoot grows up."],
    ask: { prompt: "What helps a seed start to grow?", right: "Water and warmth", wrong: ["A loud noise", "A tight box"], why: "Seeds wake up and grow with water and warmth." },
  },
  {
    id: "five-senses",
    band: "little",
    topic: "science",
    title: "Our five senses",
    emoji: "👀",
    facts: ["We see with our eyes and hear with our ears.", "We smell with our nose and taste with our tongue.", "We feel things with our skin."],
    ask: { prompt: "What do we use to hear?", right: "Our ears", wrong: ["Our eyes", "Our nose"], why: "We hear with our ears." },
  },
  {
    id: "helpers",
    band: "little",
    topic: "world",
    title: "Helpers near us",
    emoji: "🧑‍🚒",
    facts: ["Firefighters put out fires and keep us safe.", "Doctors and nurses help people feel better.", "Bus drivers help people get where they are going."],
    ask: { prompt: "Who helps people feel better when they are sick?", right: "A doctor", wrong: ["A bus driver", "A baker"], why: "Doctors and nurses help sick people feel better." },
  },
  {
    id: "all-kinds-of-families",
    band: "little",
    topic: "world",
    title: "All kinds of families",
    emoji: "👨‍👩‍👧",
    facts: ["Families come in many shapes and sizes.", "Families care for each other.", "Some families live together and some live apart."],
    ask: { prompt: "Which is true about families?", right: "They come in many shapes and sizes", wrong: ["They all look the same", "Only big ones count"], why: "Every family is different, and they all matter." },
  },
  {
    id: "maps-help",
    band: "little",
    topic: "world",
    title: "Maps",
    emoji: "🗺️",
    facts: ["A map is a picture of a place from above.", "Maps use small pictures called symbols.", "A map helps us find our way."],
    ask: { prompt: "What does a map help us do?", right: "Find our way", wrong: ["Bake a cake", "Plant a seed"], why: "A map shows where things are, so we can find our way." },
  },
  {
    id: "rules-keep-us-safe",
    band: "little",
    topic: "world",
    title: "Why we have rules",
    emoji: "🚦",
    facts: ["Rules help keep us safe.", "A red light says stop and a green light says go.", "Rules help us share and take turns."],
    ask: { prompt: "What does a green traffic light say?", right: "Go", wrong: ["Stop", "Sleep"], why: "Green means go. Red means stop." },
  },

  // ——— Grades 2 to 4 ———
  {
    id: "butterfly-life",
    band: "middle",
    topic: "science",
    title: "A butterfly's life",
    emoji: "🦋",
    facts: ["A butterfly starts as a tiny egg.", "The egg hatches into a caterpillar that eats and grows.", "The caterpillar becomes a chrysalis, then a butterfly."],
    ask: { prompt: "What does a caterpillar turn into inside its chrysalis?", right: "A butterfly", wrong: ["A beetle", "A frog"], why: "A caterpillar changes inside the chrysalis and comes out as a butterfly." },
  },
  {
    id: "magnet-poles",
    band: "middle",
    topic: "science",
    title: "Magnets and poles",
    emoji: "🧲",
    facts: ["Magnets pull on some metals, like iron.", "Every magnet has two ends called poles.", "Opposite poles pull together and the same poles push apart."],
    ask: { prompt: "What happens when two of the same poles meet?", right: "They push apart", wrong: ["They pull together", "They turn into glass"], why: "Same poles push apart. Opposite poles pull together." },
  },
  {
    id: "water-forms",
    band: "middle",
    topic: "science",
    title: "Three forms of water",
    emoji: "💧",
    facts: ["Water can be a liquid, a solid (ice) or a gas.", "Heat melts ice into liquid water.", "Cold freezes liquid water into ice."],
    ask: { prompt: "What does heat do to ice?", right: "It melts the ice", wrong: ["It makes the ice harder", "It turns the ice into sand"], why: "Heat melts ice into liquid water." },
  },
  {
    id: "long-shadows",
    band: "middle",
    topic: "science",
    title: "Shadows",
    emoji: "🌤️",
    facts: ["A shadow forms when something blocks light.", "The sun moves across the sky during the day.", "Shadows are longest when the sun is low in the sky."],
    ask: { prompt: "When are shadows the longest?", right: "Early morning or evening", wrong: ["Right in the middle of the day", "They never change"], why: "When the sun is low, shadows stretch out long." },
  },
  {
    id: "landforms",
    band: "middle",
    topic: "world",
    title: "Landforms",
    emoji: "⛰️",
    facts: ["Mountains are very high, steep land.", "A valley is low land between hills or mountains.", "Rivers flow downhill, often to a lake or the sea."],
    ask: { prompt: "What is a valley?", right: "Low land between hills or mountains", wrong: ["A very tall mountain", "A body of salty water"], why: "A valley is the low land between hills or mountains." },
  },
  {
    id: "needs-and-wants",
    band: "middle",
    topic: "world",
    title: "Needs and wants",
    emoji: "🍎",
    facts: ["Needs are things people must have, like food, water and shelter.", "Wants are things that are nice to have.", "We can live without wants, but not without needs."],
    ask: { prompt: "Which of these is a need?", right: "Clean water", wrong: ["A video game", "A toy robot"], why: "People need water to live. A game or a toy is a want." },
  },
  {
    id: "timelines",
    band: "middle",
    topic: "world",
    title: "Timelines",
    emoji: "⏳",
    facts: ["A timeline puts events in the order they happened.", "The earliest event goes first, on the left.", "Timelines help us see what happened before and after."],
    ask: { prompt: "On a timeline, which event goes first?", right: "The one that happened earliest", wrong: ["The newest one", "The biggest one"], why: "A timeline starts with the event that happened first." },
  },
  {
    id: "goods-and-services",
    band: "middle",
    topic: "world",
    title: "Goods and services",
    emoji: "🏭",
    facts: ["Goods are things people make, like bread or chairs.", "Services are jobs where someone helps you, like a haircut.", "Most communities need both."],
    ask: { prompt: "Which of these is a service?", right: "A haircut", wrong: ["A loaf of bread", "A chair"], why: "A haircut is a person helping you, so it is a service." },
  },

  // ——— Grades 5 to 9 ———
  {
    id: "photosynthesis",
    band: "big",
    topic: "science",
    title: "How plants make food",
    emoji: "🌿",
    facts: ["Plants use sunlight, water and carbon dioxide to make sugar.", "This is called photosynthesis, and it releases oxygen.", "Chlorophyll in leaves catches the light and makes them green."],
    ask: { prompt: "Which gas do plants release during photosynthesis?", right: "Oxygen", wrong: ["Carbon dioxide", "Helium"], why: "Plants take in carbon dioxide and release oxygen." },
  },
  {
    id: "moving-plates",
    band: "big",
    topic: "science",
    title: "Moving plates",
    emoji: "🌋",
    facts: ["Earth's outer shell is broken into huge slabs called plates.", "The plates move very slowly, about as fast as your fingernails grow.", "Most earthquakes and volcanoes happen near the edges of plates."],
    ask: { prompt: "Where do most earthquakes happen?", right: "Near the edges of plates", wrong: ["Only on mountaintops", "Only in deserts"], why: "Plates push, pull and slide past each other at their edges." },
  },
  {
    id: "cells",
    band: "big",
    topic: "science",
    title: "Cells",
    emoji: "🔬",
    facts: ["Cells are the building blocks of living things.", "Most cells are too small to see without a microscope.", "A human body is made of trillions of cells."],
    ask: { prompt: "What do you need to see most cells?", right: "A microscope", wrong: ["A ruler", "A compass"], why: "Most cells are far too small to see with just your eyes." },
  },
  {
    id: "energy-changes",
    band: "big",
    topic: "science",
    title: "Energy changes form",
    emoji: "⚡",
    facts: ["Energy is not made or used up. It changes form.", "A lamp changes electrical energy into light and heat.", "Your body changes the energy in food into movement and warmth."],
    ask: { prompt: "What happens to energy when a lamp is on?", right: "It changes into light and heat", wrong: ["It disappears", "It is created from nothing"], why: "Energy is never lost. It changes into other forms." },
  },
  {
    id: "voting",
    band: "big",
    topic: "world",
    title: "Having a say",
    emoji: "🗳️",
    facts: ["In a democracy, citizens help choose their leaders.", "They do this by voting in an election.", "Citizens also have responsibilities, like following the laws."],
    ask: { prompt: "How do citizens in a democracy choose their leaders?", right: "By voting in an election", wrong: ["By flipping a coin", "By racing each other"], why: "Citizens vote, and the votes decide who leads." },
  },
  {
    id: "trade",
    band: "big",
    topic: "world",
    title: "Why people trade",
    emoji: "🚢",
    facts: ["No place has or makes everything people want.", "So people trade goods with each other.", "Goods travel by ship, train, truck and plane."],
    ask: { prompt: "Why do people trade?", right: "No one place makes everything", wrong: ["Because trucks are fast", "Because shops are big"], why: "Trade lets people get what they cannot make or grow themselves." },
  },
  {
    id: "primary-sources",
    band: "big",
    topic: "world",
    title: "Clues from the past",
    emoji: "📜",
    facts: ["A primary source comes from the time being studied, like a diary or a letter.", "A secondary source is written later, like a textbook.", "Historians compare many sources to see what happened."],
    ask: { prompt: "Which of these is a primary source?", right: "A diary written at the time", wrong: ["A textbook written years later", "A movie made recently"], why: "A diary was written by someone who lived through the events." },
  },
  {
    id: "weather-and-climate",
    band: "big",
    topic: "world",
    title: "Weather and climate",
    emoji: "🌦️",
    facts: ["Weather is what the air is doing today.", "Climate is the usual pattern of weather over many years.", "Climate helps decide which plants grow and how people live."],
    ask: { prompt: "Which one describes climate?", right: "Winters here are usually cold", wrong: ["It is raining right now", "I need an umbrella today"], why: "Climate is the long-term pattern. Today's rain is weather." },
  },
];

export function exploreCards(band: AgeBand): ExploreCard[] {
  return EXPLORE_CARDS.filter((c) => c.band === band);
}

export function findCard(id: string): ExploreCard | undefined {
  return EXPLORE_CARDS.find((c) => c.id === id);
}

export interface ExploreQuestion {
  prompt: string;
  choices: string[];
  answer: number;
  why: string;
}

/** A card's question, with the choices in an order that depends on the seed. */
export function exploreQuestion(card: ExploreCard, seed: string): ExploreQuestion {
  const { prompt, right, wrong, why } = card.ask;
  const choices = withSeed(hashSeed(`explore:${card.id}:${seed}`), () => shuffle([right, ...wrong]));
  return { prompt, choices, answer: choices.indexOf(right), why };
}
