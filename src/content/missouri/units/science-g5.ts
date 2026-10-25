import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g5";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { copyOf, from, localCopy } from "./kit";

// Missouri Grade 5 science: copies of California's sun-and-stars and Earth's-water units and Washington's ecosystems
// and gravity units without their own states' places, with Missouri examples added.

export const SCIENCE_5: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-sun-stars"),
    {
      id: "mo-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and the daily and seasonal patterns of shadows and day length seen from Missouri.",
      standards: ["5.ESS1.A.1; 5.ESS1.B.1; 5.ESS1.B.2", "the sun's brightness and distance, day length through the year, and patterns of shadows"],
    },
    [
      ["In Missouri, days are longest in…", "June", ["December", "January", "February"], "The summer solstice is in June."],
      ["In Kansas City, days are shortest in…", "December", ["June", "July", "August"], "The winter solstice is in December."],
      ["At noon in Missouri, where does the sun appear in the sky?", "toward the south", ["toward the north", "straight down", "under the ground"], "Missouri is north of the tropics."],
      ["Your shadow at noon is… than your shadow in the early morning.", "shorter", ["longer", "brighter", "warmer"], "The sun is highest at noon."],
      ["The sun looks bigger and brighter than other stars because it is…", "much closer to Earth", ["the biggest star of all", "made of fire only", "a planet"], "Other stars are much farther away."],
      ["Why can you see more stars in the Mark Twain National Forest than in downtown St. Louis?", "there is less light from the city", ["the stars are closer there", "there is no moon there", "the forest makes stars"], "City lights hide faint stars.", true],
      ["In the morning, your shadow points toward the…", "west", ["east", "south", "sun"], "The sun rises in the east, so shadows point away from it.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-earth-water"),
    {
      id: "mo-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is fresh and where it is, and how communities protect water, using Missouri examples like its rivers and springs.",
      standards: ["5.ESS2.C.1", "the amounts of salt water and fresh water in Earth's reservoirs"],
    },
    [
      ["Many Missouri towns get their drinking water from the Missouri River or from…", "wells that reach groundwater", ["the ocean", "a glacier", "the desert"], "Groundwater is fresh water under the ground."],
      ["Big Spring in the Ozarks pours out water that has traveled…", "underground through rock", ["from the ocean", "down from a glacier", "out of the clouds only"], "Springs bring groundwater to the surface."],
      ["Planting strips of grass beside streams helps…", "keep soil and fertilizer out of the water", ["make the water salty", "stop all rain", "dry up the stream"], "Plant roots hold soil in place."],
      ["About how much of Earth's water is salt water in the oceans?", "about 97%", ["about 3%", "about 50%", "about 10%"], "Only a small part is fresh."],
      ["Most of Earth's fresh water is…", "frozen in ice or underground", ["in rivers", "in clouds", "in swimming pools"], "Rivers and lakes hold only a tiny part."],
      ["Most of Earth's fresh water that people can easily use is in…", "lakes, rivers and underground", ["the oceans", "clouds only", "salt flats"], "Most fresh water is frozen or underground.", true],
      ["Why is it important to keep trash out of a Missouri stream?", "it flows into rivers and harms life downstream", ["trash helps fish", "rivers clean everything", "it makes the stream longer"], "Water connects places.", true],
    ],
  ),
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"),
    "mo-g5-ecosystems",
    ["5.LS2.B.1", "the movement of matter among plants, animals, decomposers and the environment"],
    [
      ["Mushrooms on a fallen oak in a Missouri forest are…", "decomposers", ["producers", "predators"], "They break down dead things."],
      ["Big bluestem grass on a Missouri prairie makes its own food from sunlight. It is a…", "producer", ["consumer", "decomposer"], "Plants are producers."],
      ["A white-tailed deer that eats acorns is a…", "consumer", ["producer", "decomposer"], "Consumers eat other living things."],
      ["Decomposers return… to the soil.", "nutrients", ["plastic", "sunlight"], "Plants use the nutrients again."],
      ["Plants get most of the material they need to grow from…", "air and water", ["soil only", "sunlight only"], "They take in carbon dioxide from the air.", true],
      ["If all the decomposers in a forest disappeared, dead leaves would…", "pile up", ["vanish anyway", "turn into rocks"], "Decomposers recycle matter.", true],
    ],
    {
      parentNote:
        "Practices how matter moves among plants, animals, decomposers and the environment, from food chains to decomposers that return nutrients to the soil.",
    },
  ),
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-gravity"),
    "mo-g5-gravity",
    ["5.PS2.B.1", "the gravitational force Earth exerts on objects is directed toward the planet's center"],
    [
      ["A leaf falling from a tree in a Missouri forest falls down because of…", "gravity", ["magnetism", "wind only"], "Gravity pulls things toward Earth's center."],
      ["A ball dropped from the top of the Gateway Arch would fall…", "down toward the ground", ["straight up", "sideways forever"], "Gravity pulls toward Earth."],
      ["Gravity on Earth pulls objects toward…", "Earth's center", ["the North Pole", "the sun only"], "Down means toward the center."],
      ["A child in Australia and a child in Missouri both drop a ball. Both balls fall…", "toward Earth's center", ["in the same direction in space", "up"], "Down is toward the center everywhere."],
      ["Water in the Missouri River flows downhill because of…", "gravity", ["sunlight", "magnets"], "Gravity pulls water to lower ground.", true],
      ["Which force keeps you on the ground when you jump?", "gravity", ["friction only", "magnetism"], "It pulls you back down.", true],
    ],
    {
      parentNote:
        "Practices the idea that Earth's gravity pulls objects down, toward Earth's center, everywhere on the planet, and how gravity differs from other forces.",
    },
  ),
];
