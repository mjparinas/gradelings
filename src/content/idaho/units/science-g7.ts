import type { Unit } from "../../types";
import { OWN_SCIENCE as CA7_OWN, SCIENCE_COPIES as CA7_COPIES } from "../../california/units/science-g7";
import { OWN_SCIENCE as CA8_OWN, SCIENCE_COPIES as CA8_COPIES } from "../../california/units/science-g8";
import { copyOf, from } from "./kit";

// Idaho Grade 7 science: copies of California's biodiversity and space-systems units without their California places,
// with Idaho examples added (Redfish Lake sockeye salmon, sage-grouse, cheatgrass and the central Idaho dark sky).

const CA = [...CA7_COPIES, ...CA7_OWN, ...CA8_COPIES, ...CA8_OWN];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "id-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🐟",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Idaho examples like Redfish Lake sockeye salmon, sage-grouse and sagebrush, wetlands, invasive cheatgrass and boat checks for invasive mussels.",
      standards: ["MS-LS-2.6", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Sockeye salmon swim about 900 miles from the ocean to Redfish Lake. Raising young sockeye in hatcheries and releasing them there helps…", "a rare population recover", ["make the lake salty", "stop all fishing forever", "keep bears away"], "Very few sockeye were returning in the 1990s."],
      ["Protecting large areas of sagebrush helps sage-grouse and…", "the many other animals that live in sagebrush country", ["only city birds", "ocean fish", "no other species"], "Many species share one habitat."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Idaho checks boats for zebra and quagga mussels because these invasive mussels…", "spread fast and filter out food native animals need", ["make the water cold", "help native fish grow", "plant new trees"], "Invasive species compete with native ones."],
      ["Cheatgrass, an invasive grass, harms Idaho's sagebrush lands because it…", "dries out early and helps wildfires spread", ["keeps the soil wetter", "is the best food for sage-grouse", "stops fires"], "More fires mean less sagebrush."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g8-space"),
    {
      id: "id-g7-space",
      title: "Space Systems",
      emoji: "🪐",
      blurb: "Moon phases, eclipses, seasons, gravity and scale.",
      parentNote:
        "Practices the Earth-sun-moon system (phases, eclipses and seasons), gravity's role in the solar system, and its scale, with Idaho examples like its long summer days and the dark night skies of central Idaho.",
      standards: ["MS-ESS-1.1; MS-ESS-1.2; MS-ESS-1.3", "the Earth-sun-moon system, gravity in the solar system, and its scale"],
    },
    [
      ["In June, Idaho has long days because…", "the Northern Hemisphere tilts toward the sun", ["Earth is closest to the sun", "the sun is bigger in June", "the moon blocks the night"], "Seasons come from Earth's tilt."],
      ["In a solar eclipse…", "the moon passes between the sun and Earth", ["Earth passes between the sun and the moon", "the sun goes behind Earth", "the moon disappears"], "The moon's shadow falls on Earth."],
      ["In a lunar eclipse…", "Earth's shadow falls on the moon", ["the moon blocks the sun", "the sun hides behind the moon", "the moon becomes a star"], "Earth is between the sun and moon."],
      ["We see moon phases because…", "we see different parts of its sunlit half", ["Earth's shadow covers it", "the moon changes size", "clouds cover part of it"], "The moon orbits Earth."],
      ["What keeps the planets in orbit around the sun?", "gravity", ["magnetism", "wind", "sunlight"], "The sun's mass pulls on the planets."],
      ["Why is it summer in Idaho when it is winter in Australia?", "the hemispheres tilt toward the sun at different times", ["Australia is closer to the moon", "Idaho is closer to the sun", "the sun moves north"], "When one hemisphere tilts toward the sun, the other tilts away.", true],
      ["If the sun were the size of a basketball, Earth would be about the size of…", "a peppercorn", ["a car", "a house", "another basketball"], "The sun is far larger than Earth.", true],
    ],
  ),
];
