import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// South Dakota Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with South
// Dakota examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "sd-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🦬",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with South Dakota examples like the bison herd in Custer State Park, prairie fires, farm runoff and restoring native grassland.",
      standards: ["HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["If prairie grasses store 10,000 units of energy, about how much reaches the grasshoppers that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["Custer State Park sells some bison each fall so the herd stays within the grassland's…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food and space set the limit."],
      ["Too much fertilizer washing off fields into a lake can cause algae blooms that…", "use up oxygen fish need", ["add oxygen", "cool the water", "clean the water"], "Too many nutrients upset the balance."],
      ["Leaving strips of grass along streams beside farm fields helps because they…", "catch soil and fertilizer before they reach the water", ["make the water saltier", "remove all fish", "stop the rain"], "Plant buffers filter runoff."],
      ["After a fire burns a patch of prairie, grasses and flowers come back in stages. This is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Eastern red cedar trees are spreading into grasslands and shading out grasses. Which solution would best help?", "controlled burns that clear young cedars", ["planting more cedars", "plowing the prairie", "removing all native birds"], "Fire once kept trees off the prairie.", true],
      ["Why do top predators like coyotes have smaller populations than the rabbits and mice they eat?", "less energy reaches higher trophic levels", ["coyotes eat only plants", "mice are bigger", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
