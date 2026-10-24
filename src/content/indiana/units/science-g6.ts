import type { Unit } from "../../types";
import { OWN_SCIENCE as CA_OWN_7, SCIENCE_COPIES as CA_COPIES_7 } from "../../california/units/science-g7";
import { OWN_SCIENCE as CA_OWN_8, SCIENCE_COPIES as CA_COPIES_8 } from "../../california/units/science-g8";
import { SCIENCE_6 as WASHINGTON_SCIENCE_6 } from "../../washington/units/science-68";
import { copyOf, from, localCopy } from "./kit";

// Indiana Grade 6 science: Indiana teaches space systems and ecosystems in Grade 6, so this grade has copies of
// California's space-systems and biodiversity units and Washington's design unit without their own states' places, with
// Indiana examples added.

const CA = [...CA_COPIES_7, ...CA_OWN_7, ...CA_COPIES_8, ...CA_OWN_8];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g8-space"),
    {
      id: "in-g6-space",
      title: "Space Systems",
      emoji: "🪐",
      blurb: "Moon phases, eclipses, seasons, gravity and scale.",
      parentNote:
        "Practices the Earth-sun-moon system (phases, eclipses and seasons), gravity's role in the solar system, and its scale, with Indiana examples like the total solar eclipse seen from Indianapolis in April 2024.",
      standards: ["MS-ESS1-1; MS-ESS1-2; MS-ESS1-3", "the Earth-sun-moon system, gravity in the solar system, and its scale"],
    },
    [
      ["In June, Indiana has long days because…", "the Northern Hemisphere tilts toward the sun", ["Earth is closest to the sun", "the sun is bigger in June", "the moon blocks the night"], "Seasons come from Earth's tilt."],
      ["Indianapolis saw a total solar eclipse in April 2024. In a solar eclipse…", "the moon passes between the sun and Earth", ["Earth passes between the sun and the moon", "the sun goes behind Earth", "the moon disappears"], "The moon's shadow falls on Earth."],
      ["In a lunar eclipse…", "Earth's shadow falls on the moon", ["the moon blocks the sun", "the sun hides behind the moon", "the moon becomes a star"], "Earth is between the sun and moon."],
      ["We see moon phases because…", "we see different parts of its sunlit half", ["Earth's shadow covers it", "the moon changes size", "clouds cover part of it"], "The moon orbits Earth."],
      ["What keeps the planets in orbit around the sun?", "gravity", ["magnetism", "wind", "sunlight"], "The sun's mass pulls on the planets."],
      ["Why is it summer in Indiana when it is winter in Australia?", "the hemispheres tilt toward the sun at different times", ["Australia is closer to the moon", "Indiana is closer to the sun", "the sun moves north"], "When one hemisphere tilts toward the sun, the other tilts away.", true],
      ["If the sun were the size of a basketball, Earth would be about the size of…", "a peppercorn", ["a car", "a house", "another basketball"], "The sun is far larger than Earth.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "in-g6-biodiversity",
      title: "Biodiversity & Wetlands",
      emoji: "🦆",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Indiana examples like wetland and prairie restoration, invasive carp and the emerald ash borer.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["The Grand Kankakee Marsh once covered a huge part of northwest Indiana. Most of it was drained to make…", "farmland", ["ocean", "glaciers", "desert"], "Wetland soil is rich once it dries."],
      ["Restoring a wetland by letting water back in and planting native plants helps…", "bring back many kinds of plants and animals", ["make the land a desert", "stop all insects", "raise the ocean"], "More plant kinds support more animals."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Invasive carp in the Wabash River harm the ecosystem because they…", "eat food native fish need", ["make the water cold", "help native fish grow", "plant new trees"], "Invasive species compete with native ones."],
      ["The emerald ash borer, an insect from Asia, has killed millions of Indiana's…", "ash trees", ["corn plants", "oak acorns", "lake fish"], "Native ash trees had no defenses against it."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a pest than a forest of one tree type?", "other species survive and keep the ecosystem working", ["pests never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
  localCopy(
    from(WASHINGTON_SCIENCE_6, "wa-g6-design"),
    "in-g6-design",
    ["MS-ETS1-1; MS-ETS1-2; MS-ETS1-3; MS-ETS1-4", "defining design problems, evaluating and testing solutions, and improving designs"],
    [
      ["A limit on a design, like cost or size, is a…", "constraint", ["criterion", "prototype"], "Constraints limit what you can do."],
      ["What a design must do to succeed is its…", "criteria", ["constraints", "materials"], "Criteria say what success looks like."],
      ["A first model you build to test an idea is a…", "prototype", ["criterion", "conclusion"], "Prototypes are tested and improved."],
      ["Engineers building a bridge over the Ohio River test models to…", "find weak points before building", ["make it cost more", "skip the design"], "Testing shows what to improve."],
      ["Why compare two designs with the same test?", "to see fairly which works better", ["to make both fail", "to save no data"], "Change one thing at a time.", true],
      ["A design for snowy South Bend winters must handle…", "cold, ice and heavy snow", ["only desert heat", "no weather at all"], "Conditions are part of the constraints.", true],
    ],
  ),
];
