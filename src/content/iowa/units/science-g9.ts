import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Iowa Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with Iowa
// examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "ia-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with Iowa examples like white-tailed deer, prairie burns, Gulf hypoxia from farm runoff and zebra mussels in the Mississippi.",
      standards: ["HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["If prairie grasses store 10,000 units of energy, about how much reaches the grasshoppers that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["Planned burns on Iowa prairies help because fire…", "clears dead grass and keeps trees and shrubs from taking over", ["kills every prairie plant", "turns the prairie into a lake", "adds plastic to the soil"], "Prairie plants regrow from deep roots."],
      ["The largest deer herd an Iowa county's woods and fields can support over time is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food, water and space set the limit."],
      ["Zebra mussels can ride on boats from the Mississippi to Iowa's lakes. Which solution would best protect those lakes?", "cleaning and draining boats before they enter new water", ["adding more mussels", "draining the lakes", "removing all native fish"], "Stopping spread protects other ecosystems."],
      ["After a flood, plants return to a river floodplain in stages. This is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Fertilizer washing from Midwest fields down the Mississippi helps cause a low-oxygen dead zone in the…", "Gulf of Mexico", ["Arctic Ocean", "Great Salt Lake", "Pacific Ocean"], "Too many nutrients feed algae that use up oxygen.", true],
      ["Why do top predators like bald eagles have smaller populations than the fish they eat?", "less energy reaches higher trophic levels", ["eagles eat only plants", "fish are bigger than eagles", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
