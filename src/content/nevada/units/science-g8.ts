import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g8";
import { copyOf, from } from "./kit";

// Nevada Grade 8 science: a copy of California's space-systems unit without its California places, with Nevada
// examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_8: Unit[] = [
  copyOf(
    from(CA, "ca-g8-space"),
    {
      id: "nv-g8-space",
      title: "Space Systems",
      emoji: "🪐",
      blurb: "Moon phases, eclipses, seasons, gravity and scale.",
      parentNote:
        "Practices the Earth-sun-moon system (phases, eclipses and seasons), gravity's role in the solar system, and its scale, with Nevada examples like the annular solar eclipse of October 2023 and the dark night skies of Great Basin National Park.",
      standards: ["MS-ESS1-1; MS-ESS1-2; MS-ESS1-3", "the Earth-sun-moon system, gravity in the solar system, and its scale"],
    },
    [
      ["In June, Nevada has long days because…", "the Northern Hemisphere tilts toward the sun", ["Earth is closest to the sun", "the sun is bigger in June", "the moon blocks the night"], "Seasons come from Earth's tilt."],
      ["Parts of Nevada saw a solar eclipse in October 2023. In a solar eclipse…", "the moon passes between the sun and Earth", ["Earth passes between the sun and the moon", "the sun goes behind Earth", "the moon disappears"], "The moon's shadow falls on Earth."],
      ["In a lunar eclipse…", "Earth's shadow falls on the moon", ["the moon blocks the sun", "the sun hides behind the moon", "the moon becomes a star"], "Earth is between the sun and moon."],
      ["We see moon phases because…", "we see different parts of its sunlit half", ["Earth's shadow covers it", "the moon changes size", "clouds cover part of it"], "The moon orbits Earth."],
      ["What keeps the planets in orbit around the sun?", "gravity", ["magnetism", "wind", "sunlight"], "The sun's mass pulls on the planets."],
      ["Why is it summer in Nevada when it is winter in Australia?", "the hemispheres tilt toward the sun at different times", ["Australia is closer to the moon", "Nevada is closer to the sun", "the sun moves north"], "When one hemisphere tilts toward the sun, the other tilts away.", true],
      ["If the sun were the size of a basketball in Las Vegas, Earth would be about the size of…", "a peppercorn", ["a car", "a house", "another basketball"], "The sun is far larger than Earth.", true],
    ],
  ),
];
