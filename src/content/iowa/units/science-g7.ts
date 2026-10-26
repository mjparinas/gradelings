import type { Unit } from "../../types";
import { OWN_SCIENCE as CA7_OWN, SCIENCE_COPIES as CA7_COPIES } from "../../california/units/science-g7";
import { OWN_SCIENCE as CA8_OWN, SCIENCE_COPIES as CA8_COPIES } from "../../california/units/science-g8";
import { copyOf, from } from "./kit";

// Iowa Grade 7 science: copies of California's biodiversity and space-systems units without their California places,
// with Iowa examples added. Iowa's science standards (2025) place ecosystems and the solar system in Grade 7.

const CA = [...CA7_COPIES, ...CA7_OWN, ...CA8_COPIES, ...CA8_OWN];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "ia-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Iowa examples like restored prairies, prairie pothole wetlands, monarch butterflies and invasive zebra mussels.",
      standards: ["7-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Less than one percent of Iowa's original tallgrass prairie is left. Restoring prairie helps…", "bring back the many plants and animals that depend on it", ["make more parking lots", "stop all insects", "raise the ocean"], "A prairie holds hundreds of species."],
      ["Planting milkweed along Iowa roadsides helps…", "monarch butterflies, whose caterpillars eat it", ["stop all rain", "keep deer away", "grow more corn"], "Monarchs lay eggs only on milkweed."],
      ["Prairie pothole wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Zebra mussels in the Mississippi River harm the ecosystem because they…", "filter out food native animals need", ["make the water cold", "help native mussels grow", "plant new trees"], "Invasive species compete with native ones."],
      ["Prairie strips in a cornfield help a farm's ecosystem by…", "giving bees and birds habitat and keeping soil in place", ["using up all the water", "blocking the sun", "making the field bigger"], "Small strips of prairie do a lot of work."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g8-space"),
    {
      id: "ia-g7-space",
      title: "Space Systems",
      emoji: "🪐",
      blurb: "Moon phases, eclipses, seasons, gravity and scale.",
      parentNote:
        "Practices the Earth-sun-moon system (phases, eclipses and seasons), gravity's role in the solar system, and its scale, with Iowa examples like its long summer days and dark country night skies.",
      standards: ["7-ESS1-1; 7-ESS1-2; 7-ESS1-3", "the Earth-sun-moon system, gravity in the solar system, and its scale"],
    },
    [
      ["In June, Iowa has long days because…", "the Northern Hemisphere tilts toward the sun", ["Earth is closest to the sun", "the sun is bigger in June", "the moon blocks the night"], "Seasons come from Earth's tilt."],
      ["In a solar eclipse…", "the moon passes between the sun and Earth", ["Earth passes between the sun and the moon", "the sun goes behind Earth", "the moon disappears"], "The moon's shadow falls on Earth."],
      ["In a lunar eclipse…", "Earth's shadow falls on the moon", ["the moon blocks the sun", "the sun hides behind the moon", "the moon becomes a star"], "Earth is between the sun and moon."],
      ["We see moon phases because…", "we see different parts of its sunlit half", ["Earth's shadow covers it", "the moon changes size", "clouds cover part of it"], "The moon orbits Earth."],
      ["What keeps the planets in orbit around the sun?", "gravity", ["magnetism", "wind", "sunlight"], "The sun's mass pulls on the planets."],
      ["Why is it summer in Iowa when it is winter in Australia?", "the hemispheres tilt toward the sun at different times", ["Australia is closer to the moon", "Iowa is closer to the sun", "the sun moves north"], "When one hemisphere tilts toward the sun, the other tilts away.", true],
      ["If the sun were the size of a basketball, Earth would be about the size of…", "a peppercorn", ["a car", "a house", "another basketball"], "The sun is far larger than Earth.", true],
    ],
  ),
];
