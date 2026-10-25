import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Wisconsin Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with
// Wisconsin examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "wi-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with Wisconsin examples like prairie burns, the lakes around Madison and invasive species.",
      standards: ["SCI.h.LS.2", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["If prairie grasses store 10,000 units of energy, about how much reaches the grasshoppers that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["Controlled burns help a Wisconsin prairie because fire…", "clears woody plants and recycles nutrients", ["kills every prairie plant", "turns the prairie into forest", "adds plastic to the soil"], "Prairie plants regrow from deep roots."],
      ["The largest population of deer a woodland can support over time is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food and space set the limit."],
      ["Sea lampreys harmed lake trout in the Great Lakes. Which solution would best protect the trout?", "controlling lampreys in the streams where they breed", ["adding more lampreys", "draining Lake Superior", "removing all native fish"], "Stopping an invader where it breeds protects other species."],
      ["After a flood, plants return to a riverbank in stages. This is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Phosphorus running off farm fields into Lake Mendota can cause algae blooms that…", "use up oxygen fish need", ["add oxygen", "cool the water", "clean the water"], "Too many nutrients upset the balance.", true],
      ["Why do top predators like bald eagles have smaller populations than the fish they eat?", "less energy reaches higher trophic levels", ["eagles eat only plants", "fish are bigger than eagles", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
