import type { Unit } from "../../types";
import { SCIENCE_COPIES as oregonCopies } from "../../oregon/units/science-copies";
import { SCIENCE_6 as texasScience6 } from "../../texas/units/science-6";
import { copyOf, from } from "./kit";

/** Arkansas's own Grade 8 science units (`ar-` ids): copies of other states' units without their places, plus Arkansas items. */
export const UNITS: Unit[] = [
  // A copy of or-g8-earth-history without its questions about other states' places.
  copyOf(
    from(oregonCopies["8"] ?? [], "or-g8-earth-history"),
    {
      id: "ar-g8-earth-history",
      title: "Earth's History & Fossils",
      emoji: "🦕",
      blurb: "Rock strata, the geologic time scale and evidence of evolution.",
      parentNote:
        "Practices how rock layers are used to build Earth's 4.6-billion-year history, patterns in the fossil record, and anatomical and embryo evidence that living things share ancestors, with Arkansas fossils as examples.",
      standards: ["8-ESS1-4; 8-LS4-1; 8-LS4-2", "rock layers and the geologic time scale, and the fossil record of life's history"],
    },
    [
      ["Arkansaurus, Arkansas's state dinosaur, lived in the Mesozoic Era. Compared with fossils of the first fish, it is…", "much younger", ["much older", "the same age", "older than Earth"], "Fish appeared long before dinosaurs."],
      ["Fossils of crinoids and other sea animals are common in Ozark limestone. This shows the area was once…", "covered by a shallow sea", ["a desert of sand dunes", "covered by ice for all of history", "a high volcano"], "Sea animals lived in the sea."],
      ["In a road cut in the Ozarks, a layer with trilobite fossils lies under a layer with no trilobites. The lower layer is…", "older", ["younger", "the same age", "impossible to compare"], "Undisturbed lower layers formed first."],
      ["Geologists match a fossil found near the Buffalo River with the same fossil far away. This helps them…", "show that the two rock layers are about the same age", ["measure rainfall", "find the river's speed", "predict tornadoes"], "This is how index fossils work."],
      ["Folded and tilted rock layers in the Ouachita Mountains mean that…", "forces moved the layers after they formed", ["the layers formed sideways", "the oldest layer must be on top", "no time has passed"], "Superposition works best when layers are undisturbed.", true],
    ],
  ),
  // A copy of tx-g6-seasons-tides without its questions about other states' places.
  copyOf(
    from(texasScience6, "tx-g6-seasons-tides"),
    {
      id: "ar-g8-seasons-tides",
      title: "Seasons & Tides",
      emoji: "🌊",
      blurb: "Earth's tilt causes seasons; the Moon and Sun cause tides.",
      parentNote:
        "Practices how the tilt of Earth's axis as it revolves around the Sun causes the seasons, and how the positions of the Earth, Sun and Moon cause daily tides and monthly spring and neap tides.",
      standards: ["8-ESS1-1", "the Earth-sun-moon system, seasons and tides"],
    },
    [
      ["Arkansas has hot summers because in June the Northern Hemisphere…", "tilts toward the Sun, so sunlight is more direct", ["is closest to the Sun", "has no Moon", "stops spinning"], "Tilt, not distance."],
      ["In December, days in Arkansas are short because…", "the Northern Hemisphere tilts away from the Sun", ["Earth is farthest from the Sun", "the Moon blocks the Sun", "Earth spins more slowly"], "Tilted away means less daylight."],
      ["When it is summer in Arkansas, it is winter in…", "the Southern Hemisphere", ["the whole Northern Hemisphere", "every place on Earth", "nowhere"], "The hemispheres tilt opposite ways."],
      ["Lakes like Lake Ouachita have no noticeable tides because…", "they are far too small for the Moon's pull to raise a visible tide", ["the Moon never shines on them", "there is no gravity on lakes", "they are fresh water, which has no weight"], "Tides show up in huge bodies of water like oceans."],
      ["Spring tides, the biggest tides, happen when…", "the Sun, Earth and Moon line up", ["the Moon is at a right angle to the Sun", "it is springtime in Arkansas", "the Moon is hidden by clouds"], "The pulls of the Sun and Moon add up.", true],
    ],
  ),
];
