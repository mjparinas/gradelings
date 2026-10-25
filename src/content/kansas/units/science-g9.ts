import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Kansas Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with Kansas
// examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "ks-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🦬",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with Kansas examples like bison on the Flint Hills prairie, prairie burning and zebra mussels in Kansas lakes.",
      standards: ["HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["If prairie grasses store 10,000 units of energy, about how much reaches the grasshoppers that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["Planned spring burns on the tallgrass prairie help because fire…", "keeps out trees and returns nutrients to the soil", ["kills every grass root", "turns the prairie into a lake", "adds plastic to the soil"], "Prairie grasses regrow from deep roots."],
      ["The largest bison herd a prairie preserve can support over time is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food, water and space set the limit."],
      ["Zebra mussels can ride on boats from one Kansas lake to another. Which solution would best protect the other lakes?", "cleaning and draining boats before they enter new water", ["adding more mussels", "draining every lake", "removing all native fish"], "Stopping spread protects other ecosystems."],
      ["After a farm field is left alone, prairie plants return in stages. This is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Fertilizer running off fields into a lake can cause algae blooms that…", "use up oxygen fish need", ["add oxygen", "cool the water", "clean the water"], "Too many nutrients upset the balance.", true],
      ["Why do top predators like red-tailed hawks have smaller populations than the mice they eat?", "less energy reaches higher trophic levels", ["hawks eat only plants", "mice are bigger than hawks", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
