import type { Unit } from "../../types";
import { SCIENCE_6 as texasScience6 } from "../../texas/units/science-6";
import { copyOf, from } from "./kit";

/** South Carolina's own Grade 8 science units (`sc-` ids): copies of other states' units without their places, plus South Carolina items. */
export const UNITS: Unit[] = [
  // A copy of tx-g6-seasons-tides without its questions about other states' places.
  copyOf(
    from(texasScience6, "tx-g6-seasons-tides"),
    {
      id: "sc-g8-seasons-tides",
      title: "Seasons, Phases & Tides",
      emoji: "🌊",
      blurb: "Earth's tilt causes seasons; the Moon and Sun cause tides.",
      parentNote:
        "Practices how the tilt of Earth's axis as it revolves around the Sun causes the seasons, and how the positions of the Earth, Sun and Moon cause moon phases, eclipses and the tides on South Carolina's coast.",
      standards: ["8-ESS1-1", "the Earth-sun-moon system: moon phases, eclipses, seasons and tides"],
    },
    [
      ["South Carolina has hot summers because in June the Northern Hemisphere…", "tilts toward the Sun, so sunlight is more direct", ["is closest to the Sun", "has no Moon", "stops spinning"], "Tilt, not distance."],
      ["In December, days in South Carolina are short because…", "the Northern Hemisphere tilts away from the Sun", ["Earth is farthest from the Sun", "the Moon blocks the Sun", "Earth spins more slowly"], "Tilted away means less daylight."],
      ["At Charleston Harbor, the water rises and falls about twice a day. This is mostly caused by…", "the Moon's gravity", ["the wind", "rain", "boats"], "The Moon pulls on the ocean."],
      ["When it is summer in South Carolina, it is winter in…", "the Southern Hemisphere", ["the whole Northern Hemisphere", "every place on Earth", "nowhere"], "The hemispheres tilt opposite ways."],
      ["Spring tides, the biggest tides, happen when…", "the Sun, Earth and Moon line up", ["the Moon is at a right angle to the Sun", "it is springtime in South Carolina", "the Moon is hidden by clouds"], "The pulls of the Sun and Moon add up.", true],
    ],
  ),
];
