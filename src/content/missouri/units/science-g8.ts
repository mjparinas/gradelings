import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g8";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { copyOf, from, localCopy } from "./kit";

// Missouri Grade 8 science: copies of California's space-systems unit and Oregon's Earth-history unit without their own
// states' places, with Missouri examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_8: Unit[] = [
  copyOf(
    from(CA, "ca-g8-space"),
    {
      id: "mo-g8-space",
      title: "Space Systems",
      emoji: "🪐",
      blurb: "Moon phases, eclipses, seasons, gravity and scale.",
      parentNote:
        "Practices the Earth-sun-moon system (phases, eclipses and seasons), gravity's role in the solar system, and its scale, with Missouri examples like the 2017 total solar eclipse seen across the state.",
      standards: ["6-8.ESS1.A.1; 6-8.ESS1.A.2; 6-8.ESS1.A.3; 6-8.ESS1.B.1", "the Earth-sun-moon system, gravity in the solar system, and its scale"],
    },
    [
      ["In June, Missouri has long days because…", "the Northern Hemisphere tilts toward the sun", ["Earth is closest to the sun", "the sun is bigger in June", "the moon blocks the night"], "Seasons come from Earth's tilt."],
      ["Jefferson City saw a total solar eclipse in 2017. In a solar eclipse…", "the moon passes between the sun and Earth", ["Earth passes between the sun and the moon", "the sun goes behind Earth", "the moon disappears"], "The moon's shadow falls on Earth."],
      ["In a lunar eclipse…", "Earth's shadow falls on the moon", ["the moon blocks the sun", "the sun hides behind the moon", "the moon becomes a star"], "Earth is between the sun and moon."],
      ["We see moon phases because…", "we see different parts of its sunlit half", ["Earth's shadow covers it", "the moon changes size", "clouds cover part of it"], "The moon orbits Earth."],
      ["What keeps the planets in orbit around the sun?", "gravity", ["magnetism", "wind", "sunlight"], "The sun's mass pulls on the planets."],
      ["Why is it summer in Missouri when it is winter in Australia?", "the hemispheres tilt toward the sun at different times", ["Australia is closer to the moon", "Missouri is closer to the sun", "the sun moves north"], "When one hemisphere tilts toward the sun, the other tilts away.", true],
      ["If the sun were the size of a basketball in St. Louis, Earth would be about the size of…", "a peppercorn", ["a car", "a house", "another basketball"], "The sun is far larger than Earth.", true],
    ],
  ),
  localCopy(
    from(OREGON_SCIENCE_COPIES["8"] ?? [], "or-g8-earth-history"),
    "mo-g8-earth-history",
    ["6-8.ESS1.C.1; 6-8.ESS2.B.1", "rock strata and the geologic time scale, and evidence from fossils and rocks for past plate motion"],
    [
      ["In undisturbed rock layers, the youngest layer is…", "on top", ["at the bottom", "in the middle"], "Layers stack over time."],
      ["Crinoid fossils in Missouri limestone are hundreds of millions of years old. They tell us…", "the area was once covered by a shallow sea", ["it was a desert", "Missouri had glaciers then"], "Crinoids lived in the sea."],
      ["The fossil record shows that life on Earth has…", "changed over time", ["never changed", "only grown smaller"], "Older layers hold older forms of life."],
      ["Bones of a duck-billed dinosaur, Missouri's state dinosaur, were found near…", "Bollinger County in southeast Missouri", ["the top of the Gateway Arch", "the Missouri River's mouth in the ocean"], "Fossils are found in rock of the right age."],
      ["Which is older, the limestone under northern Missouri or the Ice Age soil on top of it?", "the limestone", ["the Ice Age soil", "they are the same age"], "Lower layers formed first.", true],
      ["A layer of volcanic ash found in many places helps scientists…", "match rock layers of the same age", ["measure rainfall", "count animals"], "Key layers mark the same time.", true],
    ],
  ),
];
