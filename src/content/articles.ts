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

  // ——— More for Grades 2 to 4 ———
  {
    id: "why-the-sky-is-blue", band: "middle", topic: "science", title: "Why the sky is blue", emoji: "🌤️",
    paragraphs: [
      "Sunlight looks white, but it is really a mix of many kinds of light. It holds red, orange, yellow, green, blue and purple, like a rainbow.",
      "Air is made of tiny bits of gas. When sunlight hits them, the light bounces in every direction. Blue light bounces much more than red light does.",
      "So blue light reaches your eyes from all over the sky. That is why the sky looks blue on a clear day.",
      "At sunset, the light has a long way to travel through the air. Most of the blue bounces away, and we see orange and red.",
    ],
    asks: [
      { prompt: "What bounces around the most when sunlight meets the air?", right: "Blue light", wrong: ["Red light", "Sound"], why: "Blue light bounces much more than red light, so blue fills the sky." },
      { prompt: "Why does the sky look orange and red at sunset?", right: "Most of the blue light bounces away", wrong: ["The Sun turns off", "The air turns into paint"], why: "The light travels a long way through the air, and the blue bounces away." },
    ],
  },
  {
    id: "why-we-have-seasons", band: "middle", topic: "science", title: "Why we have seasons", emoji: "🍂",
    paragraphs: [
      "Earth takes one year to travel all the way around the Sun. While it travels, it spins like a top that is tilted a little to one side.",
      "The tilt matters. When your part of Earth leans toward the Sun, the sunlight is stronger and the days are longer. That is summer.",
      "Six months later, your part of Earth leans away. The sunlight is weaker and the days are shorter. That is winter.",
      "Spring and fall come in between. Seasons happen because of the tilt, not because Earth moves closer to or farther from the Sun.",
    ],
    asks: [
      { prompt: "What causes the seasons?", right: "Earth is tilted as it goes around the Sun", wrong: ["Earth moves much closer to the Sun", "The Sun gets bigger and smaller"], why: "Seasons happen because of Earth's tilt." },
      { prompt: "What is true in summer where you live?", right: "Your part of Earth leans toward the Sun", wrong: ["Your part of Earth leans away from the Sun", "The Sun is turned off at night"], why: "In summer, your part of Earth leans toward the Sun." },
    ],
  },
  {
    id: "what-is-a-food-chain", band: "middle", topic: "science", title: "What is a food chain?", emoji: "🦊",
    paragraphs: [
      "Every living thing needs energy. A food chain shows how that energy moves from one living thing to the next.",
      "A food chain starts with a plant. Plants use sunlight to make their own food, so they are called producers.",
      "A rabbit eats the plant. Then a fox eats the rabbit. Animals that eat other living things are called consumers.",
      "In a picture of a food chain, the arrows point the way the energy goes. The arrow points from the food to the animal that eats it.",
    ],
    asks: [
      { prompt: "What do plants use to make their own food?", right: "Sunlight", wrong: ["Rabbits", "Moonlight"], why: "Plants use sunlight to make food, so they are producers." },
      { prompt: "In a food chain picture, which way does an arrow point?", right: "From the food to the one that eats it", wrong: ["From the eater to its food", "Straight up to the clouds"], why: "Arrows show where the energy goes: from food to eater." },
    ],
  },
  {
    id: "why-we-recycle", band: "middle", topic: "world", title: "Why we recycle", emoji: "♻️",
    paragraphs: [
      "Every day, people throw away cans, bottles, paper and boxes. If all of it went into a big hole in the ground, the holes would soon fill up.",
      "Recycling gives old things a second life. Trucks carry paper, metal, glass and some plastic to a factory.",
      "At the factory, workers sort the pieces. Then machines clean them, melt or mash them, and make them into new things.",
      "Recycling saves materials from nature and keeps trash out of the ground. A little effort at home helps all of us.",
    ],
    asks: [
      { prompt: "What happens to recycled glass at a factory?", right: "It is made into new things", wrong: ["It is buried in the ground", "It is turned into water"], why: "Recycled materials are cleaned, melted or mashed, and made into new things." },
      { prompt: "Why is recycling a good idea?", right: "It saves materials and keeps trash out of the ground", wrong: ["It makes more trash", "It uses up all the metal"], why: "Recycling saves materials and cuts down on trash." },
    ],
  },
  {
    id: "communities-big-and-small", band: "middle", topic: "world", title: "Communities big and small", emoji: "🏘️",
    paragraphs: [
      "A community is a group of people who live, work or play in one place. Some are big cities. Some are tiny villages.",
      "In every community, people share things. They use the same parks, roads and schools.",
      "Many people have jobs that help us all. Nurses, bus drivers, teachers and firefighters help the whole community.",
      "Big or small, a community works best when people take turns, follow rules and help each other.",
    ],
    asks: [
      { prompt: "What is a community?", right: "A group of people who share a place", wrong: ["A kind of weather", "A tool for measuring"], why: "People who live, work or play in the same place make a community." },
      { prompt: "Which is something people in a community share?", right: "A park", wrong: ["A toothbrush", "A dream they had last night"], why: "People share parks, roads, libraries and schools." },
    ],
  },
  {
    id: "the-wheel", band: "middle", topic: "world", title: "The wheel", emoji: "🛞",
    paragraphs: [
      "Long ago, people had to drag heavy loads across the ground. It was slow, hard work.",
      "More than five thousand years ago, people began to use wheels. A wheel turns on a bar called an axle, and a round wheel rolls much more easily than a flat sled slides.",
      "Carts with wheels could carry food, tools and people from place to place. Trading and travel grew faster.",
      "Today, wheels are everywhere. They turn on bikes, cars, wagons and suitcases, and gears inside clocks and machines are wheels with teeth.",
    ],
    asks: [
      { prompt: "What does a wheel turn on?", right: "An axle", wrong: ["A rope", "A sail"], why: "A wheel turns on a bar called an axle." },
      { prompt: "Why were carts with wheels so useful?", right: "They carried heavy loads more easily", wrong: ["They made loads heavier", "They stopped people from moving things"], why: "A rolling wheel makes it much easier to move loads." },
    ],
  },

  // ——— More for Grades 5 to 9 ———
  {
    id: "how-volcanoes-erupt", band: "big", topic: "science", title: "How a volcano erupts", emoji: "🌋",
    paragraphs: [
      "Deep underground, some rock is so hot that it melts. This molten rock is called magma, and it is lighter than the solid rock around it, so it slowly rises.",
      "Magma also holds dissolved gases. As it climbs and the pressure drops, the gases form bubbles, much like the bubbles that appear when you open a bottle of sparkling water.",
      "If the magma is thick and the gas cannot escape easily, pressure builds until the magma bursts out. When magma reaches the surface, it is called lava.",
      "Lava cools into new rock. Many volcanoes form where Earth's moving plates meet, which is why they often appear in long chains.",
    ],
    asks: [
      { prompt: "What is magma called once it reaches the surface?", right: "Lava", wrong: ["Ash", "Granite"], why: "Magma underground becomes lava when it flows out onto the surface." },
      { prompt: "Why does magma rise through solid rock?", right: "It is lighter than the rock around it", wrong: ["It is heavier than the rock around it", "It is pulled up by the Moon"], why: "Hot, melted magma is lighter than the solid rock around it." },
    ],
  },
  {
    id: "why-sleep-matters", band: "big", topic: "science", title: "Why your body needs sleep", emoji: "😴",
    paragraphs: [
      "Sleep may look like doing nothing, but your body and brain are working hard. Muscles and other tissues repair themselves, and growth hormones are released.",
      "Your brain is busy too. During sleep, it sorts through the day's experiences and strengthens the memories that matter, which helps you learn.",
      "Children and teenagers need more sleep than adults do. School-age children generally need about nine to twelve hours a night, and teenagers about eight to ten.",
      "Too little sleep can make it harder to focus, remember things and manage feelings. Regular bedtimes and screen-free evenings help many people sleep better.",
    ],
    asks: [
      { prompt: "What does the brain do with the day's experiences during sleep?", right: "Sorts them and strengthens important memories", wrong: ["Erases all of them", "Turns them into muscles"], why: "Sleep helps the brain sort and store memories." },
      { prompt: "Who generally needs more sleep?", right: "Children and teenagers", wrong: ["Only adults", "Nobody needs it"], why: "Growing children and teenagers need more sleep than adults do." },
    ],
  },
  {
    id: "how-the-heart-works", band: "big", topic: "science", title: "How your heart works", emoji: "❤️",
    paragraphs: [
      "Your heart is a muscle about the size of your fist. It never rests: at rest, an adult's heart beats about once every second, pushing blood around the body.",
      "Blood carries oxygen and nutrients to every part of you. The heart has two sides. One side sends blood to the lungs to pick up oxygen, and the other sends oxygen-rich blood out to the body.",
      "Inside the heart, small flaps called valves open and close. They make sure that blood moves in only one direction.",
      "Each beat is a squeeze followed by a relaxing. Exercise makes the heart beat faster, because muscles then need more oxygen.",
    ],
    asks: [
      { prompt: "What does blood carry to every part of the body?", right: "Oxygen and nutrients", wrong: ["Light and sound", "Bones and skin"], why: "Blood delivers oxygen and nutrients to the whole body." },
      { prompt: "What do the valves inside the heart do?", right: "Keep blood moving in one direction", wrong: ["Make the heart grow", "Pump air into the lungs"], why: "Valves open and close so blood flows only one way." },
    ],
  },
  {
    id: "the-printing-press", band: "big", topic: "world", title: "How the printing press changed the world", emoji: "📚",
    paragraphs: [
      "Long ago, every book had to be copied by hand. A single book could take months to finish, so books were rare and expensive, and most people never owned one.",
      "People in China and Korea had already printed with movable pieces of type. Around the year 1450, a German goldsmith named Johannes Gutenberg built a press in Europe that used movable metal letters.",
      "The letters could be rearranged and reused, so a printer could produce many copies of a page quickly.",
      "Books became cheaper, and ideas spread farther and faster. More people learned to read, and knowledge about science, history and religion reached many new readers.",
    ],
    asks: [
      { prompt: "Before the printing press, how were books made?", right: "Copied by hand", wrong: ["Printed by machines in factories", "Downloaded from the internet"], why: "Every book was copied by hand, which took months." },
      { prompt: "What made the movable-type press so useful?", right: "Letters could be reused to print many copies quickly", wrong: ["It made paper from trees", "It only printed one book ever"], why: "Reusable letters let printers make many copies quickly." },
    ],
  },
  {
    id: "why-time-zones-exist", band: "big", topic: "world", title: "Why the world has time zones", emoji: "🕒",
    paragraphs: [
      "Earth spins once every twenty-four hours, so the Sun is high in the sky in one place while it is dark in another. If every town set its clock by its own noon, nearby towns would have slightly different times.",
      "This became a real problem in the 1800s, when trains let people travel quickly between towns. Train timetables were confusing, so countries began to agree on standard times.",
      "Today the world is divided into time zones. Moving from one zone to the next usually changes the time by one hour, although a few places use half-hour or other differences.",
      "Time zones help people schedule flights, phone calls and meetings with friends far away. When it is morning for you, it may already be evening somewhere else.",
    ],
    asks: [
      { prompt: "Why is it dark in one place while it is daytime in another?", right: "Earth spins, so only part of it faces the Sun", wrong: ["The Moon blocks the Sun in some places", "Clocks are set differently by mistake"], why: "Earth spins, so the Sun lights only part of it at a time." },
      { prompt: "Why did countries start using standard times?", right: "Train timetables were confusing", wrong: ["The Sun stopped moving", "Clocks were invented that day"], why: "Fast trains made each town's own time a problem." },
    ],
  },
  {
    id: "how-to-judge-a-source", band: "big", topic: "world", title: "How to tell if a source is trustworthy", emoji: "🔎",
    paragraphs: [
      "Anyone can post anything online, so not everything you read is true. Learning to judge a source is an important skill for school and for life.",
      "Start by asking who made it. A source is more trustworthy when the author is named, has real knowledge of the topic, and explains where the facts came from.",
      "Next, check the date and whether the information is still current. Then look for the same facts in other reliable places, such as encyclopedias, museums or respected news organizations.",
      "Be careful with sources that try to make you angry or sell you something. Strong feelings can make a weak claim feel true, so pause and check before you share.",
    ],
    asks: [
      { prompt: "Which is a good sign that a source is trustworthy?", right: "It names the author and explains where facts came from", wrong: ["It uses lots of capital letters", "It has the most likes"], why: "Trustworthy sources are open about who wrote them and where the facts came from." },
      { prompt: "What should you do after reading a surprising claim?", right: "Check other reliable sources", wrong: ["Share it right away", "Ignore the date"], why: "Finding the same facts in other reliable places helps you decide if a claim is true." },
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
