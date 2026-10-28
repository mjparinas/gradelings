import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g8";
import { copyOf, from } from "./kit";

// Wyoming Grade 8 science: a copy of California's space-systems unit without its California places, with Wyoming
// examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_8: Unit[] = [
  copyOf(
    from(CA, "ca-g8-space"),
    {
      id: "wy-g8-space",
      title: "Space Systems",
      emoji: "🪐",
      blurb: "Moon phases, eclipses, seasons, gravity and scale.",
      parentNote:
        "Practices the Earth-sun-moon system (phases, eclipses and seasons), gravity's role in the solar system, and its scale, with Wyoming examples like the total solar eclipse of August 2017 that crossed the state, and the University of Wyoming's mountain telescope.",
      standards: ["MS-ESS1-1; MS-ESS1-2", "the Earth-sun-moon system behind phases, eclipses and seasons, and gravity's role in the solar system"],
    },
    [
      ["In June, Wyoming has long days because…", "the Northern Hemisphere tilts toward the sun", ["Earth is closest to the sun", "the sun is bigger in June", "the moon blocks the night"], "Seasons come from Earth's tilt."],
      ["In August 2017, a total solar eclipse crossed Wyoming. In a solar eclipse…", "the moon passes between the sun and Earth", ["Earth passes between the sun and the moon", "the sun goes behind Earth", "the moon disappears"], "The moon's shadow falls on Earth."],
      ["In a lunar eclipse…", "Earth's shadow falls on the moon", ["the moon blocks the sun", "the sun hides behind the moon", "the moon becomes a star"], "Earth is between the sun and moon."],
      ["We see moon phases because…", "we see different parts of its sunlit half", ["Earth's shadow covers it", "the moon changes size", "clouds cover part of it"], "The moon orbits Earth."],
      ["What keeps the planets in orbit around the sun?", "gravity", ["magnetism", "wind", "sunlight"], "The sun's mass pulls on the planets."],
      ["The University of Wyoming built a telescope on a high mountain because high, dry places have…", "less air and water vapor to look through", ["more clouds", "closer stars", "brighter city lights"], "Thin, dry air gives a clearer view."],
      ["Why is it summer in Wyoming when it is winter in Australia?", "the hemispheres tilt toward the sun at different times", ["Australia is closer to the moon", "Wyoming is closer to the sun", "the sun moves north"], "When one hemisphere tilts toward the sun, the other tilts away.", true],
      ["If the sun were the size of a basketball, Earth would be about the size of…", "a peppercorn", ["a car", "a house", "another basketball"], "The sun is far larger than Earth.", true],
    ],
  ),
];
