import type { Unit } from "../../types";
import { OWN_SCIENCE as CA_OWN_6, SCIENCE_COPIES as CA_COPIES_6 } from "../../california/units/science-g6";
import { OWN_SCIENCE as CA_OWN_8, SCIENCE_COPIES as CA_COPIES_8 } from "../../california/units/science-g8";
import { copyOf, from } from "./kit";

// Kentucky Grade 6 science: copies of California's weather, climate and space-systems units without their California
// places, with Kentucky examples added. Kentucky places weather, climate and space in Grade 6.

const CA6 = [...CA_COPIES_6, ...CA_OWN_6];
const CA8 = [...CA_COPIES_8, ...CA_OWN_8];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA6, "ca-g6-weather"),
    {
      id: "ky-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with Kentucky examples such as spring thunderstorms and tornadoes and summer humidity.",
      standards: ["6-ESS2-4; 6-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["Warm, moist air from the Gulf of Mexico meets cold, dry air from the north over Kentucky. What often forms?", "thunderstorms", ["clear, calm skies", "a desert", "an earthquake"], "Fronts where air masses meet bring storms."],
      ["Kentucky summers feel humid because warm air masses come from…", "the Gulf of Mexico", ["the Arctic", "the Sahara", "the Moon"], "Air over warm water picks up moisture."],
      ["When a cold front passes through Lexington, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from Kentucky Lake?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain back down and makes it flow into the Ohio River?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Why do Kentucky's tornadoes come most often in spring?", "warm and cold air masses collide more often", ["the sun is farther away", "there is no wind in spring", "the rivers are frozen"], "Clashing air masses make storms.", true],
    ],
  ),
  copyOf(
    from(CA6, "ca-g6-climate"),
    {
      id: "ky-g6-climate",
      title: "What Shapes Climate",
      emoji: "🌍",
      blurb: "Sunlight, oceans, winds and landforms.",
      parentNote:
        "Practices how latitude, the oceans, winds, mountains and the movement of heat shape regional climates, with Kentucky's climate as an example.",
      standards: ["6-ESS2-6", "how unequal heating and Earth's rotation cause patterns of circulation that shape regional climates"],
    },
    [
      ["Kentucky is far from any ocean, so its climate has…", "hot summers and cold winters", ["the same temperature all year", "no seasons", "only rain"], "Oceans keep coastal climates milder."],
      ["Why is Kentucky warmer than places far to the north, like Canada?", "it is closer to the equator", ["it is higher up", "it has more snow", "it is next to the ocean"], "Latitude affects climate."],
      ["Moist air from the Gulf of Mexico gives Kentucky…", "plenty of rain in every season", ["a desert climate", "no clouds", "frozen summers"], "Winds carry moisture inland."],
      ["Why are the mountains of eastern Kentucky often cooler than Paducah?", "air is cooler at higher elevations", ["they are closer to the sun", "they have no trees", "they are near the ocean"], "Temperature drops as you climb."],
      ["Most of Kentucky's weather moves from…", "west to east", ["east to west", "south to north only", "nowhere"], "Prevailing westerly winds carry it."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Ocean currents like the Gulf Stream carry warm water…", "from the tropics toward the poles", ["from the poles to the equator only", "nowhere", "only at night"], "Currents move heat around Earth.", true],
    ],
  ),
  copyOf(
    from(CA8, "ca-g8-space"),
    {
      id: "ky-g6-space",
      title: "Space Systems",
      emoji: "🪐",
      blurb: "Moon phases, eclipses, seasons, gravity and scale.",
      parentNote:
        "Practices the Earth-sun-moon system (phases, eclipses and seasons), gravity's role in the solar system, and its scale, with Kentucky examples like the total solar eclipse seen from Hopkinsville in 2017.",
      standards: ["6-ESS1-1; 6-ESS1-2; 6-ESS1-3", "the Earth-sun-moon system, gravity in the solar system, and its scale"],
    },
    [
      ["In June, Kentucky has long days because…", "the Northern Hemisphere tilts toward the sun", ["Earth is closest to the sun", "the sun is bigger in June", "the moon blocks the night"], "Seasons come from Earth's tilt."],
      ["Hopkinsville, Kentucky, saw a total solar eclipse in August 2017. In a solar eclipse…", "the moon passes between the sun and Earth", ["Earth passes between the sun and the moon", "the sun goes behind Earth", "the moon disappears"], "The moon's shadow falls on Earth."],
      ["In a lunar eclipse…", "Earth's shadow falls on the moon", ["the moon blocks the sun", "the sun hides behind the moon", "the moon becomes a star"], "Earth is between the sun and moon."],
      ["We see moon phases because…", "we see different parts of its sunlit half", ["Earth's shadow covers it", "the moon changes size", "clouds cover part of it"], "The moon orbits Earth."],
      ["What keeps the planets in orbit around the sun?", "gravity", ["magnetism", "wind", "sunlight"], "The sun's mass pulls on the planets."],
      ["Why is it summer in Kentucky when it is winter in Australia?", "the hemispheres tilt toward the sun at different times", ["Australia is closer to the moon", "Kentucky is closer to the sun", "the sun moves north"], "When one hemisphere tilts toward the sun, the other tilts away.", true],
      ["If the sun were the size of a basketball in Louisville, Earth would be about the size of…", "a peppercorn", ["a car", "a house", "another basketball"], "The sun is far larger than Earth.", true],
    ],
  ),
];
