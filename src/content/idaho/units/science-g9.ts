import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Idaho Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with Idaho
// examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "id-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and managing natural resources, with Idaho examples like elk herds, forest fires and succession, salmon and dams, and keeping invasive mussels out of Idaho's lakes.",
      standards: ["HS-LS-2.1; HS-LS-2.3; HS-LS-2.5; HS-LS-2.6", "carrying capacity, energy flow, ecosystem change and managing natural resources"],
    },
    [
      ["If bunchgrasses store 10,000 units of energy, about how much reaches the grasshoppers that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["Prescribed burns in Idaho's forests help because they…", "clear built-up brush and dead wood so later fires are less severe", ["kill every tree", "turn the forest into a lake", "add plastic to the soil"], "Less fuel means smaller fires."],
      ["The largest elk herd a central Idaho valley can support over time is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food, water and space set the limit."],
      ["Idaho inspects boats for zebra and quagga mussels before they launch. This protects lakes by…", "stopping an invasive species from spreading", ["adding more mussels", "draining the lakes", "removing native fish"], "Stopping spread protects ecosystems."],
      ["After a wildfire, plants return to a burned Idaho forest in stages. This is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Dams on the Snake River affect salmon because they…", "make it harder for young salmon to reach the ocean and adults to return", ["make the water saltier", "add more ocean to the river", "stop the river from flowing"], "Salmon must travel between streams and the ocean.", true],
      ["Why do top predators like cougars have smaller populations than the deer they eat?", "less energy reaches higher trophic levels", ["cougars eat only plants", "deer are hunted by nothing", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
