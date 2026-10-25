import type { Unit } from "../../types";
import { SCIENCE_9 } from "../../washington/units/science-9";
import { from, localCopy } from "./kit";

// Utah copies of Grade 9 biology units that fit Utah except for a few questions naming another state's places, with
// Utah examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(SCIENCE_9, "wa-g9-ecosystems"), "ut-g9-ecosystems", ["BIO.1.2; BIO.1.4", "factors that affect carrying capacity, and how ecosystems respond to changing conditions"], [
    ["Brine shrimp in the Great Salt Lake increase until food and salt levels limit them. That limit is the…", "carrying capacity", ["trophic level", "food web"], "It is the largest population the environment can support."],
    ["Cheatgrass, a plant brought to Utah from elsewhere, harms sagebrush habitat by…", "spreading and fueling more frequent wildfires", ["adding nutrients to the soil", "feeding sage grouse"], "It dries out early and burns easily."],
    ["Which solution to protect the Great Salt Lake ecosystem is backed by evidence?", "letting more river water reach the lake", ["draining its wetlands", "adding more salt"], "The lake shrinks when less water flows in."],
    ["Fewer brine shrimp in the Great Salt Lake would mean less food for…", "migrating birds", ["mountain lions", "desert tortoises"], "Millions of birds feed at the lake.", true],
  ], {
    parentNote: "Practises carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and evaluating solutions to human impacts, using the Great Salt Lake and Utah's sagebrush lands as examples.",
  }),
];
