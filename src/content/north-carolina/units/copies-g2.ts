import type { Unit } from "../../types";
import { G5 as WASHINGTON_SOCIAL_5 } from "../../washington/units/social-59-g5";
import { from, localCopy } from "./kit";

// North Carolina copies of units used in Grade 2 that fit North Carolina except for a few questions naming another
// state's places.

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SOCIAL_5, "wa-g5-us-geography"),
    "nc-g2-us-geography",
    ["2.G.1.1; 2.G.1.2", "the states and regions of the United States, and how land and water affected where people settled"],
    [
      ["North Carolina is on the coast of which ocean?", "the Atlantic Ocean", ["the Pacific Ocean", "the Arctic Ocean"], "It is on the East Coast."],
      ["Which country is the United States' neighbor to the north?", "Canada", ["Mexico", "Brazil"], "Mexico is to the south."],
      ["Many early towns grew beside rivers because rivers gave…", "water and a way to travel", ["snow", "deserts"], "Boats carried people and goods."],
      ["North Carolina is in which region of the United States?", "the Southeast", ["the Southwest", "the Midwest"], "It is in the south, on the east side."],
      ["Which state is North Carolina's neighbor to the north?", "Virginia", ["Maine", "Texas"], "Virginia is just above North Carolina on a map."],
      ["Which state is North Carolina's neighbor to the west?", "Tennessee", ["Ohio", "Nevada"], "The Great Smoky Mountains sit on the border."],
      ["The longest river in the United States is the…", "Missouri River", ["Cape Fear River", "Neuse River"], "The Mississippi is a close second."],
      ["The capital of the United States is…", "Washington, D.C.", ["Raleigh", "Charlotte"], "Raleigh is the capital of North Carolina."],
      ["How many states are in the United States?", "50", ["13", "100"], "The first 13 were colonies."],
      ["The large mountain range in the eastern United States that runs through North Carolina is the…", "Appalachian Mountains", ["Andes", "Alps"], "The Blue Ridge is part of it."],
      ["Flat, grassy land in the middle of the country, good for farming wheat and corn, is called the…", "Great Plains", ["Outer Banks", "Piedmont"], "It is in the Midwest."],
    ],
  ),
];
