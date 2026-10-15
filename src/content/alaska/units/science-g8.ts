import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g8";
import { copyOf, from } from "./kit";

// Alaska Grade 8 science: a copy of California's space-systems unit without its California places, with Alaska examples
// added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_8: Unit[] = [
  copyOf(
    from(CA, "ca-g8-space"),
    {
      id: "ak-g8-space",
      title: "Space Systems",
      emoji: "🪐",
      blurb: "Moon phases, eclipses, seasons, gravity and scale.",
      parentNote:
        "Practices the Earth-sun-moon system, seasons and daylight (including Alaska's midnight sun and polar night), gravity in the solar system and its scale.",
      standards: ["MS-ESS1-2; MS-ESS1-3", "the Earth-sun-moon system, gravity in the solar system, and its scale"],
    },
    [
      ["North of the Arctic Circle, the sun does not set for days in summer. This is the…", "midnight sun", ["polar night", "solar eclipse", "new moon"], "The North Pole is tilted toward the sun."],
      ["Why does Juneau get more winter daylight than Utqiaġvik?", "Juneau is farther south", ["Juneau is closer to the moon", "Utqiaġvik is on another planet", "Juneau has more stars"], "Latitude changes day length."],
      ["Earth's axis is tilted about…", "23.5 degrees", ["0 degrees", "90 degrees", "180 degrees"], "The tilt causes the seasons."],
      ["What keeps the moon in orbit around Earth?", "gravity", ["magnetism from the poles", "the wind", "sunlight pushing it"], "Gravity pulls the moon toward Earth."],
      ["If Earth's axis were not tilted, Alaska would have…", "about the same day length all year", ["longer summers", "more polar night", "two summers a year"], "Tilt causes changing day length.", true],
      ["The Arctic Circle is the line north of which the sun…", "stays up for at least one full day in summer", ["never rises", "is always overhead", "sets twice a day"], "It is at about 66.5° north.", true],
    ],
  ),
];
