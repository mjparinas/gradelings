import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// West Virginia Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with
// West Virginia examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "wv-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with West Virginia examples like its forests, trout streams and the return of the bald eagle.",
      standards: ["S.B.10; S.B.8; S.B.12; S.B.13", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["If streamside plants store 10,000 units of energy, about how much reaches the insects that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["Bald eagles came back to nest along West Virginia's rivers after the pesticide DDT was banned because…", "their eggs stopped breaking before hatching", ["they learned to eat plants", "the rivers got colder", "people fed them every day"], "DDT built up in the fish they ate."],
      ["The largest population of deer a forest can support over time is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food and space set the limit."],
      ["Adding limestone to a stream harmed by acid mine drainage helps brook trout because it…", "makes the water less acidic", ["makes the water saltier", "removes all insects", "warms the stream"], "Limestone neutralizes acid."],
      ["Years after a strip mine closes, grasses, then shrubs, then trees grow back. This is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Extra fertilizer washing into the Ohio River can cause algae blooms that…", "use up oxygen fish need", ["add oxygen", "cool the water", "clean the water"], "Too many nutrients upset the balance.", true],
      ["Why do top predators like bald eagles have smaller populations than the fish they eat?", "less energy reaches higher trophic levels", ["eagles eat only plants", "fish are bigger than eagles", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
