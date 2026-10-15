import type { Unit } from "../../types";
import { UNITS as newYorkScienceG5 } from "../../new-york/units/science-g5";
import { SCIENCE_5 as texasScience5 } from "../../texas/units/science-5";
import { SCIENCE_5 as washingtonScience5 } from "../../washington/units/science-35";
import { copyOf, from } from "./kit";

/** Arkansas's own Grade 5 science units (`ar-` ids): copies of other states' units without their places, plus Arkansas items. */
export const UNITS: Unit[] = [
  // A copy of wa-g5-ecosystems without its questions about other states' places.
  copyOf(
    from(washingtonScience5, "wa-g5-ecosystems"),
    {
      id: "ar-g5-ecosystems",
      title: "Matter Moves in Ecosystems",
      emoji: "🍄",
      blurb: "Producers, consumers and decomposers recycle matter.",
      parentNote:
        "Practices how matter moves among plants, animals, decomposers and the environment, with Arkansas examples like fallen leaves on the Ozark forest floor and the wetlands of the Arkansas Delta.",
      standards: ["5-LS2-1", "matter moving among plants, animals, decomposers and the environment"],
    },
    [
      ["Oak leaves pile up on the floor of an Ozark forest each fall. What breaks them down into soil?", "Decomposers like fungi, worms and bacteria", ["Deer", "Sunlight alone", "Hawks"], "Decomposers break down dead things."],
      ["In a Delta swamp, a crayfish eats bits of dead plants. A heron eats the crayfish. The heron is a…", "consumer", ["producer", "decomposer", "mineral"], "It gets its food by eating other living things."],
      ["Rice plants in an Arkansas field make their own food using…", "sunlight, air and water", ["only soil", "the food that animals eat", "moonlight"], "Plants are producers."],
      ["A fallen log in the Ouachita Mountains slowly turns soft and crumbly. This shows…", "decomposers returning matter to the soil", ["the log growing new leaves", "the log turning into rock", "the log making its own food"], "Fungi and insects break down wood."],
      ["Which gets matter from the soil and air and passes it on to the animals that eat it?", "A plant", ["A rock", "A hawk", "A cloud"], "Producers are at the start of a food chain.", true],
    ],
  ),
  // A copy of ny-g5-gravity without its questions about other states' places.
  copyOf(
    from(newYorkScienceG5, "ny-g5-gravity"),
    {
      id: "ar-g5-gravity",
      title: "Gravity Pulls Down",
      emoji: "🍎",
      blurb: "Everywhere on Earth, gravity pulls things toward the center.",
      parentNote: "Practices explaining that Earth's gravitational force on objects is directed down, toward Earth's center, wherever you are on the planet.",
      standards: ["5-PS2-1", "gravity pulling objects down toward Earth's center"],
    },
    [
      ["Water pours over Cedar Falls at Petit Jean State Park. What pulls it down?", "Gravity", ["Magnetism", "Wind", "Sunlight"], "Earth pulls everything toward its center."],
      ["The Buffalo River always flows from higher land to lower land because…", "gravity pulls the water downhill", ["the fish push it", "the wind blows it uphill", "the moon pushes it"], "Water runs downhill."],
      ["A rock tumbles off a bluff in the Ozarks. Which way does it fall?", "Down, toward Earth's center", ["Up, toward the sky", "Sideways forever", "It floats in the air"], "Gravity pulls down everywhere on Earth."],
      ["A child in Arkansas and a child on the other side of Earth both drop a ball. Gravity pulls each ball…", "toward Earth's center", ["toward Arkansas", "toward the sun", "away from Earth"], "Down always means toward Earth's center.", true],
    ],
  ),
  // A copy of tx-g5-day-night without its questions about other states' places.
  copyOf(
    from(texasScience5, "tx-g5-day-night"),
    {
      id: "ar-g5-day-night",
      title: "Spinning Earth, Moving Shadows",
      emoji: "🌗",
      blurb: "Earth's spin makes day and night and moves shadows across the ground.",
      parentNote:
        "Practices that Earth rotates on its axis about once every 24 hours, which causes day and night and makes the Sun appear to move across the sky, so shadows change length and direction during the day.",
      standards: ["5-ESS1-2", "daily and seasonal patterns of shadows, day and night"],
    },
    [
      ["In Little Rock, where does the Sun appear to rise in the morning?", "In the east", ["In the west", "In the north", "Straight overhead"], "Earth spins toward the east."],
      ["A flagpole in a Hot Springs schoolyard casts its shortest shadow at about…", "noon", ["sunrise", "sunset", "midnight"], "The Sun is highest near noon."],
      ["When it is daytime in Arkansas, it is night on the other side of Earth because…", "Earth spins, so only half faces the Sun at a time", ["the Sun turns off", "the Moon blocks the Sun", "Earth stops moving"], "Half of Earth faces the Sun."],
      ["In winter in Arkansas, noon shadows are longer than in summer because…", "the Sun is lower in the sky", ["the Sun is closer to Earth", "Earth spins faster", "the days are hotter"], "A lower Sun makes longer shadows.", true],
    ],
  ),
];
