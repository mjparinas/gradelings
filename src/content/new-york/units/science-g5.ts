import type { Unit } from "../../types";
import { SCIENCE_5 } from "../../washington/units/science-35";
import { copyOf, from } from "./kit";

// New York copies of Washington science units built around Pacific Northwest places. Each keeps the original's
// questions, leaves out the ones about Washington, Oregon or California, and adds New York items: Niagara Falls, Hudson
// River and Great Lakes food webs, New York's day length and the Catskill reservoirs. Their own `ny-` ids keep New York
// progress apart from the originals.
export const UNITS: Unit[] = [
  copyOf(
    from(SCIENCE_5, "wa-g5-gravity"),
    {
      id: "ny-g5-gravity",
      title: "Gravity Pulls Down",
      emoji: "🍎",
      blurb: "Everywhere on Earth, gravity pulls things toward the center.",
      parentNote:
        "Practices explaining that Earth's gravitational force on objects is directed down, toward Earth's center, wherever you are on the planet.",
      standards: ["5-PS2-1", "Earth's gravitational force on objects is directed down"],
    },
    [
      ["Two students, one in Buffalo and one in Australia, drop balls. Which is correct?", "Both balls fall toward Earth's center", ["The ball in Australia falls up", "Only the ball in Buffalo falls", "Neither ball falls"], "Down means toward Earth's center."],
      ["Water at Niagara Falls drops because of…", "gravity", ["magnetism", "friction", "sound"], "Earth pulls the water down."],
      ["An apple falls from a tree in a New York orchard. What pulls it down?", "Earth's gravity", ["The wind only", "The sun's light", "The tree"], "Earth pulls on everything."],
    ],
  ),
  copyOf(
    from(SCIENCE_5, "wa-g5-ecosystems"),
    {
      id: "ny-g5-ecosystems",
      title: "Food Webs & Ecosystems",
      emoji: "🐟",
      blurb: "Plants, animals and decomposers share matter.",
      parentNote:
        "Practices how matter moves among producers, consumers, decomposers and the environment in a food web, with examples from the Hudson River, the Great Lakes and Adirondack forests.",
      standards: ["5-LS2-1", "the movement of matter among plants, animals, decomposers and the environment"],
    },
    [
      ["In the Hudson River, a striped bass eats smaller fish. The striped bass is a…", "consumer", ["producer", "decomposer", "nonliving thing"], "It eats other living things."],
      ["Leaves fall in an Adirondack forest. What breaks them down into soil?", "Decomposers like fungi and worms", ["Deer", "The sun", "Hawks"], "Decomposers recycle dead matter."],
      ["In a Great Lakes food web, tiny algae are…", "producers", ["consumers", "decomposers", "predators"], "They make food from sunlight."],
    ],
  ),
  copyOf(
    from(SCIENCE_5, "wa-g5-sun-stars"),
    {
      id: "ny-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and patterns in the sky.",
      parentNote:
        "Practices why the sun looks brighter than other stars (it is much closer), and the daily and seasonal patterns of shadows, day length and the stars we see, using New York's long summer days and short winter days.",
      standards: [
        "5-ESS1-1; 5-ESS1-2",
        "the sun's brightness and distance, and patterns of shadows, day and night, and stars in the sky",
      ],
    },
    [
      ["Days in New York are longest in…", "June", ["December", "January", "March"], "Early summer."],
      ["Days in New York are shortest in…", "December", ["June", "July", "August"], "Early winter."],
      ["From New York, the noon sun in winter is…", "lower in the sky than in summer", ["straight overhead", "higher than in summer", "below the horizon"], "Winter shadows are long.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_5, "wa-g5-earth-water"),
    {
      id: "ny-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life work together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is salty, fresh or frozen, and how communities protect Earth's resources, using New York's Great Lakes, Hudson River and Catskill reservoirs as examples.",
      standards: [
        "5-ESS2-1; 5-ESS2-2; 5-ESS3-1",
        "Earth's systems interact, where Earth's water is, and how communities protect Earth's resources",
      ],
    },
    [
      ["New York City gets much of its drinking water from reservoirs in the…", "Catskill Mountains", ["Sahara Desert", "Pacific Ocean", "Rocky Mountains"], "Mountains north of the city."],
      ["Which is a way communities protect the Hudson River?", "Cleaning up pollution and keeping trash out", ["Dumping waste in it", "Paving its banks", "Pouring oil down drains"], "Keep the water clean."],
      ["Snow melts in the Adirondacks and flows into streams. Which systems interact?", "Water and land", ["Only the air", "Only living things", "Only outer space"], "Water moves over the land."],
      ["The Great Lakes hold a large share of the world's…", "fresh surface water", ["salt water", "sand", "glacier ice"], "Lakes, not oceans.", true],
    ],
  ),
];
