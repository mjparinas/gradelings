import type { Unit } from "../../types";
import { OWN_SCIENCE as CA6_OWN, SCIENCE_COPIES as CA6 } from "../../california/units/science-g6";
import { OWN_SCIENCE as CA7_OWN, SCIENCE_COPIES as CA7 } from "../../california/units/science-g7";
import { OWN_SCIENCE as CA8_OWN, SCIENCE_COPIES as CA8 } from "../../california/units/science-g8";
import { copyOf, from } from "./kit";

// West Virginia Grade 6 science: copies of California's weather, climate, biodiversity and space units without their
// California places, with West Virginia examples added. West Virginia teaches weather and climate, ecosystems and
// biodiversity, and space systems in Grade 6 (S.6.2, S.6.13 to S.6.18).

const CA = [...CA6, ...CA6_OWN, ...CA7, ...CA7_OWN, ...CA8, ...CA8_OWN];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "wv-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with West Virginia examples such as mountain snow, valley fog and summer thunderstorms.",
      standards: ["S.6.16", "how the motions and interactions of air masses change the weather"],
    },
    [
      ["Warm, moist air from the south meets cold, dry air from the north over West Virginia. What often forms?", "storms along a front", ["clear, calm skies", "a desert", "an earthquake"], "Fronts where air masses meet bring storms."],
      ["Cold northwest winds push air up the western slopes of the Allegheny Mountains. As the air rises it cools and often drops…", "heavy snow", ["hot dust", "no water at all", "hail in July only"], "Rising air cools, and its water vapor condenses."],
      ["When a cold front passes through Charleston, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["On calm fall mornings, fog often fills West Virginia's river valleys because…", "cool air sinks into the valleys and its water vapor condenses", ["the rivers boil", "the mountains make smoke", "the sun is closer"], "Cold air is heavy and settles low."],
      ["What makes water evaporate from the Ohio River?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["A long line of fast-moving thunderstorms with straight-line winds, like the one that knocked out power across West Virginia in June 2012, is called a…", "derecho", ["hurricane", "blizzard", "drought"], "Its winds blow in one direction, not in a spin.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "wv-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, elevation, oceans and winds shape regional climate, such as West Virginia's colder mountain highlands and milder river valleys, and the causes of rising global temperatures.",
      standards: ["S.6.17; S.6.18", "how unequal heating and Earth's rotation shape circulation and regional climates, and the causes of rising global temperatures"],
    },
    [
      ["Places in the middle of a continent, far from any ocean, usually have…", "hotter summers and colder winters", ["the same temperature all year", "no seasons", "only rain"], "Oceans keep coastal climates milder."],
      ["Towns high in the mountains near Snowshoe have colder winters than towns along the Ohio River because…", "air is colder at higher elevations", ["the mountains are closer to the sun", "rivers make heat", "there is no sun in the mountains"], "Temperature drops as you climb."],
      ["Why are places near the equator usually warmer than West Virginia?", "sunlight hits them more directly", ["they are higher up", "they have more snow", "they have more mountains"], "Latitude affects climate."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Rising temperatures can bring heavier rainstorms because warmer air…", "holds more water vapor", ["holds less water", "stops evaporation", "freezes faster"], "Warm air can carry more moisture.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "wv-g6-biodiversity",
      title: "Biodiversity & Ecosystems",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with West Virginia examples like red spruce restoration in the highlands, the return of elk and replanting old mine land.",
      standards: ["S.6.2", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Elk were brought back to southern West Virginia starting in 2016. Returning a species to a place it once lived is called…", "reintroduction", ["extinction", "pollution", "erosion"], "Elk had been gone from the state for well over a century."],
      ["Planting red spruce in the West Virginia highlands helps the Cheat Mountain salamander because it…", "lives only in those high mountain forests", ["lives in the ocean", "eats spruce bark", "needs deserts"], "Losing its forest means losing the salamander."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["The hemlock woolly adelgid, an insect from Asia, harms West Virginia forests because it…", "kills eastern hemlock trees", ["makes the water cold", "helps native trees grow", "plants new trees"], "Invasive species have few natural enemies here."],
      ["Bees and butterflies give the ecosystem service of…", "pollinating crops and wildflowers", ["making rain", "building soil from rock", "producing oil"], "Many foods depend on pollinators."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Planting native trees on an old surface mine helps the ecosystem because it…", "holds soil and brings back forest wildlife", ["makes more coal", "raises the river", "stops all rain"], "Roots hold soil and trees give food and shelter.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g8-space"),
    {
      id: "wv-g6-space",
      title: "Space Systems",
      emoji: "🪐",
      blurb: "Moon phases, eclipses, seasons, gravity and scale.",
      parentNote:
        "Practices the Earth-sun-moon system (phases, eclipses and seasons), gravity's role in the solar system and galaxies, and the solar system's scale, with West Virginia examples like the 2024 eclipse and the Green Bank Telescope.",
      standards: ["S.6.13; S.6.14; S.6.15", "the Earth-sun-moon system, gravity in the solar system and galaxies, and the scale of the solar system"],
    },
    [
      ["In June, West Virginia has long days because…", "the Northern Hemisphere tilts toward the sun", ["Earth is closest to the sun", "the sun is bigger in June", "the moon blocks the night"], "Seasons come from Earth's tilt."],
      ["On April 8, 2024, people in West Virginia saw the moon cover most of the sun. In a solar eclipse…", "the moon passes between the sun and Earth", ["Earth passes between the sun and the moon", "the sun goes behind Earth", "the moon disappears"], "The moon's shadow falls on Earth."],
      ["In a lunar eclipse…", "Earth's shadow falls on the moon", ["the moon blocks the sun", "the sun hides behind the moon", "the moon becomes a star"], "Earth is between the sun and moon."],
      ["We see moon phases because…", "we see different parts of its sunlit half", ["Earth's shadow covers it", "the moon changes size", "clouds cover part of it"], "The moon orbits Earth."],
      ["What keeps the planets in orbit around the sun?", "gravity", ["magnetism", "wind", "sunlight"], "The sun's mass pulls on the planets."],
      ["The giant Green Bank Telescope in Pocahontas County studies space by collecting…", "radio waves", ["moon rocks", "sound waves", "rain"], "Radio waves pass through clouds.", true],
      ["Why is it summer in West Virginia when it is winter in Australia?", "the hemispheres tilt toward the sun at different times", ["Australia is closer to the moon", "West Virginia is closer to the sun", "the sun moves north"], "When one hemisphere tilts toward the sun, the other tilts away.", true],
      ["If the sun were the size of a basketball, Earth would be about the size of…", "a peppercorn", ["a car", "a house", "another basketball"], "The sun is far larger than Earth.", true],
    ],
  ),
];
