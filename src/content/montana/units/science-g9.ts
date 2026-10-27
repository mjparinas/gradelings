import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Montana Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with
// Montana examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "mt-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with Montana examples like its prairies, forests, rivers and the return of the bald eagle.",
      standards: ["HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["If prairie grasses store 10,000 units of energy, about how much reaches the insects that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["Bald eagles came back to Montana rivers after the pesticide DDT was banned because…", "their eggs stopped breaking before hatching", ["they learned to eat plants", "the rivers got colder", "people fed them every day"], "DDT built up in the fish they ate."],
      ["The largest population of elk a mountain valley can support over time is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food and space set the limit."],
      ["Fish ladders and dam removal on Montana rivers help trout swim upstream because they…", "let fish reach the streams where they lay eggs", ["block all fish", "drain the river", "remove native fish"], "Many trout spawn in small upstream creeks."],
      ["After a forest fire, plants return in stages. This is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Extra fertilizer washing into a lake can cause algae blooms that…", "use up oxygen fish need", ["add oxygen", "cool the water", "clean the water"], "Too many nutrients upset the balance.", true],
      ["Why do top predators like bald eagles have smaller populations than the fish they eat?", "less energy reaches higher trophic levels", ["eagles eat only plants", "fish are bigger than eagles", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
