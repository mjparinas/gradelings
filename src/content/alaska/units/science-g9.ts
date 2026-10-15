import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Alaska Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with Alaska
// examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "ak-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and evaluating solutions to human impacts, using Alaska's salmon rivers, boreal forest and island populations.",
      standards: ["HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["Reindeer brought to St. Matthew Island in 1944 grew to about 6,000, then crashed. What most likely limited them?", "they ate the lichen faster than it could regrow", ["too many predators", "too much food", "warm winters with plenty of lichen"], "The island had no predators but limited food."],
      ["The largest population an environment can support over time is its…", "carrying capacity", ["biomass", "food chain", "trophic level"], "Food, space and water set the limit."],
      ["After a wildfire in the boreal forest, which plants usually grow back first?", "fireweed, grasses and shrubs", ["old spruce trees", "kelp", "cacti"], "This is secondary succession."],
      ["About how much of the energy in salmon passes to a bear that eats them?", "about 10%", ["about 100%", "about 90%", "none of it"], "Most energy is used or lost as heat."],
      ["Why are there fewer bears than salmon in a river system?", "less energy is available at each higher trophic level", ["bears are smaller", "bears do not eat", "salmon eat bears"], "Energy pyramids narrow toward the top.", true],
      ["Which is a solution to reduce human impact on a salmon river?", "keep a buffer of trees along the stream", ["clear all trees to the water", "dump gravel in spawning beds", "block the river with a dam"], "Trees shade the water and hold the bank.", true],
      ["A disease kills many sea urchin predators. What will likely happen to kelp?", "kelp decreases as urchins increase", ["kelp increases", "nothing changes", "urchins disappear"], "Follow the food web one step at a time.", true],
    ],
  ),
];
