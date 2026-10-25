import type { Unit } from "../../types";
import { UNITS as newYorkScienceG5 } from "../../new-york/units/science-g5";
import { SCIENCE_5 as texasScience5 } from "../../texas/units/science-5";
import { SCIENCE_5 as washingtonScience5 } from "../../washington/units/science-35";
import { copyOf, from } from "./kit";

/** South Carolina's own Grade 5 science units (`sc-` ids): copies of other states' units without their places, plus South Carolina items. */
export const UNITS: Unit[] = [
  // A copy of wa-g5-ecosystems without its questions about other states' places.
  copyOf(
    from(washingtonScience5, "wa-g5-ecosystems"),
    {
      id: "sc-g5-ecosystems",
      title: "Matter Moves in Ecosystems",
      emoji: "🍄",
      blurb: "Producers, consumers and decomposers recycle matter.",
      parentNote:
        "Practices how matter moves among plants, animals, decomposers and the environment, with South Carolina examples like the salt marshes of the Lowcountry and the floodplain forest of Congaree National Park.",
      standards: ["5-LS2-1", "matter moving among plants, animals, decomposers and the environment"],
    },
    [
      ["Leaves pile up on the floor of the Congaree forest each fall. What breaks them down into soil?", "Decomposers like fungi, worms and bacteria", ["Deer", "Sunlight alone", "Owls"], "Decomposers break down dead things."],
      ["In a Lowcountry salt marsh, a fiddler crab eats bits of dead marsh grass. A heron eats the crab. The heron is a…", "consumer", ["producer", "decomposer", "mineral"], "It gets its food by eating other living things."],
      ["Spartina grass in a salt marsh makes its own food using…", "sunlight, air and water", ["only mud", "the food that crabs eat", "moonlight"], "Plants are producers."],
      ["A fallen log in a South Carolina forest slowly turns soft and crumbly. This shows…", "decomposers returning matter to the soil", ["the log growing new leaves", "the log turning into rock", "the log making its own food"], "Fungi and insects break down wood."],
      ["Which gets matter from the soil and air and passes it on to the animals that eat it?", "A plant", ["A rock", "A hawk", "A cloud"], "Producers are at the start of a food chain.", true],
    ],
  ),
  // A copy of ny-g5-gravity without its questions about other states' places.
  copyOf(
    from(newYorkScienceG5, "ny-g5-gravity"),
    {
      id: "sc-g5-gravity",
      title: "Gravity Pulls Down",
      emoji: "🍎",
      blurb: "Everywhere on Earth, gravity pulls things toward the center.",
      parentNote: "Practices explaining that Earth's gravitational force on objects is directed down, toward Earth's center, wherever you are on the planet.",
      standards: ["5-PS2-1", "gravity pulling objects down toward Earth's center"],
    },
    [
      ["Water pours over Raven Cliff Falls in the mountains of South Carolina. What pulls it down?", "Gravity", ["Magnetism", "Wind", "Sunlight"], "Earth pulls everything toward its center."],
      ["The Saluda River always flows from higher land to lower land because…", "gravity pulls the water downhill", ["the fish push it", "the wind blows it uphill", "the moon pushes it"], "Water runs downhill."],
      ["A rock tumbles off a cliff on Table Rock Mountain. Which way does it fall?", "Down, toward Earth's center", ["Up, toward the sky", "Sideways forever", "It floats in the air"], "Gravity pulls down everywhere on Earth."],
      ["A child in South Carolina and a child on the other side of Earth both drop a ball. Gravity pulls each ball…", "toward Earth's center", ["toward South Carolina", "toward the sun", "away from Earth"], "Down always means toward Earth's center.", true],
    ],
  ),
  // A copy of tx-g5-day-night without its questions about other states' places.
  copyOf(
    from(texasScience5, "tx-g5-day-night"),
    {
      id: "sc-g5-day-night",
      title: "Spinning Earth, Moving Shadows",
      emoji: "🌗",
      blurb: "Earth's spin makes day and night and moves shadows across the ground.",
      parentNote:
        "Practices that Earth rotates on its axis about once every 24 hours, which causes day and night and makes the Sun appear to move across the sky, so shadows change length and direction during the day.",
      standards: ["5-ESS1-2", "daily and seasonal patterns of shadows, day and night"],
    },
    [
      ["On a beach in South Carolina, where does the Sun appear to rise in the morning?", "Over the ocean, in the east", ["In the west", "In the north", "Straight overhead"], "Earth spins toward the east."],
      ["A flagpole in a Columbia schoolyard casts its shortest shadow at about…", "noon", ["sunrise", "sunset", "midnight"], "The Sun is highest near noon."],
      ["When it is daytime in South Carolina, it is night on the other side of Earth because…", "Earth spins, so only half faces the Sun at a time", ["the Sun turns off", "the Moon blocks the Sun", "Earth stops moving"], "Half of Earth faces the Sun."],
      ["In winter in South Carolina, noon shadows are longer than in summer because…", "the Sun is lower in the sky", ["the Sun is closer to Earth", "Earth spins faster", "the days are hotter"], "A lower Sun makes longer shadows.", true],
    ],
  ),
];
