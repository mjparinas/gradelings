import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// North Dakota Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with North
// Dakota examples added (bison, elk and wild horses in Theodore Roosevelt National Park, prairie dogs, prairie potholes and
// algae blooms).

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "nd-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with North Dakota examples like the bison and wild horse herds in Theodore Roosevelt National Park, prairie dog towns, prairie wetlands and algae blooms.",
      standards: ["HS-LS2-1; HS-LS2-4; HS-LS2-7", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["Park staff move some bison out of Theodore Roosevelt National Park so the herd stays within the land's…", "carrying capacity", ["energy pyramid", "rock cycle", "water table"], "The land can feed only so many animals."],
      ["When prairie dogs dig towns, they change the grassland so that other animals, like burrowing owls, can live there. Prairie dogs are a…", "keystone species", ["invasive species", "producer", "decomposer"], "Many species depend on them."],
      ["In a prairie food chain, grass is eaten by grasshoppers, which are eaten by meadowlarks. About how much of the grass's energy reaches the meadowlarks?", "about 1%", ["about 50%", "about 90%", "all of it"], "About 10% passes on at each step."],
      ["Draining prairie pothole wetlands for farmland can cause…", "fewer ducks and more flooding downstream", ["more ducks", "cleaner water", "more rain"], "Wetlands hold water and give homes to birds."],
      ["Fertilizer runoff that causes algae blooms in a lake can lead to…", "low oxygen that harms fish", ["more oxygen for fish", "colder water", "less algae"], "Dead algae use up oxygen as they rot."],
      ["After a prairie fire, grasses grow back quickly because…", "their roots survive deep underground", ["fire adds new seeds", "the soil turns to rock", "animals plant them"], "Prairies are adapted to fire."],
      ["If a drought cuts the grass growing in a park by half, what will likely happen to the number of grazing animals it can support?", "it goes down", ["it goes up", "it stays the same", "it doubles"], "Less food lowers carrying capacity.", true],
      ["Which is the best way to judge a plan to restore a grassland?", "measure changes in plant and animal species over several years", ["count the visitors in one day", "check it once after a week", "look at a single photo"], "Good solutions are tested with data over time.", true],
    ],
  ),
];
