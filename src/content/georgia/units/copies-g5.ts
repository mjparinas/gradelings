import type { Unit } from "../../types";
import { UNITS as FLORIDA_SCIENCE_G5 } from "../../florida/units/science-g5";
import { SCIENCE_5 as TEXAS_SCIENCE_5 } from "../../texas/units/science-5";
import { from, localCopy } from "./kit";

// Georgia copies of Grade 5 units that fit Georgia except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(TEXAS_SCIENCE_5, "tx-g5-landforms"), "ga-g5-landforms", ["S5E1.a; S5E1.b", "surface features made by constructive and destructive processes, such as deltas, dunes and volcanoes"], [
    ["Georgia's barrier islands keep changing shape because…", "waves, wind and currents move their sand", ["volcanoes erupt there", "glaciers push them"], "Moving water and air carry sand."],
    ["Providence Canyon in Georgia formed quickly because…", "rain washed away soil after forests were cleared for farming", ["a volcano erupted", "an earthquake split the ground"], "Erosion is fast when plants are removed."],
    ["A delta forms where a river…", "slows down and drops sediment at its mouth", ["starts in the mountains", "freezes in winter"], "Slow water can't carry as much."],
  ], { parentNote: "Practices how changes to Earth's surface by wind, water and ice form landforms such as deltas, canyons and sand dunes." }),
  localCopy(from(FLORIDA_SCIENCE_G5, "fl-g5-static-charge"), "ga-g5-static-charge", ["S5P2.a", "static electricity compared with the electricity people harness"], [
    ["Rubbing a balloon on your hair gives the balloon…", "a static electric charge", ["a magnetic pole", "more air"], "Charges move between the hair and balloon."],
    ["Electricity that flows through wires to light a lamp is…", "current electricity", ["static electricity", "lightning"], "It moves in a path called a circuit."],
    ["Two objects with opposite charges…", "attract each other", ["push each other away", "lose their charge at once"], "Opposites attract."],
  ]),
];
