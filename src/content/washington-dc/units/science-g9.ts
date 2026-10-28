import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Washington, DC Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with DC
// examples added (deer in Rock Creek Park, the Anacostia's sewer tunnel and wetlands, and bald eagles).

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "dc-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with Washington, DC examples like the deer of Rock Creek Park, the Anacostia River's new sewer tunnel and restored wetlands, and the bald eagles that nest along its rivers.",
      standards: ["HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["If meadow grasses store 10,000 units of energy, about how much reaches the grasshoppers that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["With no wolves or cougars left, deer in Rock Creek Park grew so many that they ate most of the young…", "trees and plants on the forest floor", ["rocks", "streams", "cars"], "Without predators, a population can pass what the land can support."],
      ["The largest deer herd a forest can support over time is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food, water and space set the limit."],
      ["Heavy rain used to send sewage overflow into the Anacostia River. Which solution best helps the river's life?", "a large tunnel that stores the overflow until it can be treated", ["adding more fertilizer", "draining the wetlands", "removing all fish"], "DC Water built such tunnels under the city."],
      ["Mudflats along the Anacostia were replanted with marsh grasses, and over the years more plants and animals moved in. This gradual change is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Fertilizer running off lawns into a pond can cause algae blooms that…", "use up oxygen fish need", ["add oxygen", "cool the water", "clean the water"], "Too many nutrients upset the balance.", true],
      ["Why do top predators like bald eagles have smaller populations than the fish they eat?", "less energy reaches higher trophic levels", ["eagles eat only plants", "fish are bigger than eagles", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
