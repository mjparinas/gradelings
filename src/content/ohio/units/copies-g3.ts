import type { Unit } from "../../types";
import { SCIENCE_4 as WASHINGTON_SCIENCE_4 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Ohio copies of Grade 3 units that fit Ohio except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_4, "wa-g4-energy-resources"), "oh-g3-energy-resources", ["3.ESS.2; 3.ESS.3", "Earth's resources can be used for energy, and some of them are limited"], [
    ["Coal was mined in southeastern Ohio to make…", "electricity and heat", ["glaciers", "rain"], "Coal is burned in power plants."],
    ["Wind turbines in northwestern Ohio turn wind into…", "electricity", ["coal", "rain"], "The blades spin a generator."],
    ["Coal, oil and natural gas are… resources.", "nonrenewable", ["renewable", "unlimited"], "They take millions of years to form."],
    ["Sunlight and wind are… resources.", "renewable", ["nonrenewable", "used up forever"], "They will not run out."],
    ["Natural gas from eastern Ohio is used to…", "heat homes and make electricity", ["grow crops", "make sunlight"], "It is piped to many homes."],
    ["Why should people save energy?", "some energy resources are limited and can run out", ["energy can never run out", "it makes winters longer"], "Saving helps resources last.", true],
  ], { parentNote: "Practises how energy and fuels come from natural resources like moving water, wind, sunlight, coal, oil and gas, which of them are renewable, and how using them affects the environment." }),
];
