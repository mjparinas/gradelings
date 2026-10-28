import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g8";
import { copyOf, from } from "./kit";

// North Dakota Grade 8 science: a copy of California's space-systems unit without its California places, with North
// Dakota examples added (long summer days and long winter nights, the northern lights and the 2017 and 2024 partial
// eclipses).

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_8: Unit[] = [
  copyOf(
    from(CA, "ca-g8-space"),
    {
      id: "nd-g8-space",
      title: "Space Systems",
      emoji: "🪐",
      blurb: "Moon phases, eclipses, seasons, gravity and scale.",
      parentNote:
        "Practices the Earth-sun-moon system (phases, eclipses and seasons), gravity's role in the solar system, and its scale, with North Dakota examples like the long days of a North Dakota summer and the partial solar eclipses seen in 2017 and 2024.",
      standards: ["MS-ESS1-1; MS-ESS1-2; MS-ESS1-3", "the Earth-sun-moon system, gravity in the solar system, and its scale"],
    },
    [
      ["North Dakota has long days in June and short days in December because…", "Earth's axis is tilted", ["Earth is closer to the sun in June", "the moon blocks the sun in winter", "the sun gets bigger in summer"], "The tilt changes how sunlight reaches us."],
      ["In 2017 and 2024, people in North Dakota saw only part of the sun covered, a…", "partial solar eclipse", ["total lunar eclipse", "full moon", "new star"], "They were not in the path of totality."],
      ["A solar eclipse happens when…", "the moon passes between the sun and Earth", ["Earth passes between the sun and the moon", "the sun passes behind the moon at night", "clouds cover the sun"], "The moon's shadow falls on Earth."],
      ["We see the moon's phases change because…", "we see different amounts of its sunlit half", ["Earth's shadow covers it each night", "the moon changes shape", "clouds block part of it"], "The moon is always half lit."],
      ["Gravity keeps the planets moving around the…", "sun", ["moon", "Earth", "stars"], "The sun has the most mass."],
      ["About how long does it take the moon to go through all its phases?", "about a month", ["one day", "one week", "one year"], "Month comes from moon."],
      ["If Earth's axis were not tilted, North Dakota would have…", "no seasons", ["longer summers", "colder summers only", "two winters a year"], "Tilt causes seasons.", true],
      ["Why do scientists use models to show the solar system?", "the real distances are too big to see at once", ["the planets are tiny", "space is flat", "the sun is cold"], "Scale models help us picture huge sizes.", true],
    ],
  ),
];
