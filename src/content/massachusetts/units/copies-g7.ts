import type { Unit } from "../../types";
import { SCIENCE_6 as WASHINGTON_SCIENCE_6, SCIENCE_7 as WASHINGTON_SCIENCE_7 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Massachusetts copies of Grade 7 units that fit Massachusetts except for a few questions naming another state's
// places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_6, "wa-g6-design"), "ma-g7-design", ["7.MS-ETS1-2; 7.MS-ETS1-4", "defining design problems, evaluating and testing solutions, and improving designs"], [
    ["Which constraint might matter for a seawall design on Cape Cod?", "it must stand up to winter storms and salt water", ["it must be pink", "it must float away", "it must melt in the sun"], "Constraints are limits a design must work within."],
    ["A team tests three bridge models and keeps the strongest parts of each. This is…", "improving a design", ["giving up", "copying a picture", "guessing"], "Testing shows which features work best."],
    ["A town wants a playground that costs under $50,000. That limit is a…", "constraint", ["criterion", "prototype", "trade-off"], "Constraints are limits like cost or time."],
    ["A model of a design used for testing is a…", "prototype", ["constraint", "criterion", "budget"], "Engineers test it before building the real thing."],
  ]),
  localCopy(from(WASHINGTON_SCIENCE_7, "wa-g7-earth-surface"), "ma-g7-earth-surface", ["7.MS-ESS2-2", "the rock cycle, surface processes at different scales, and evidence for plate motion"], [
    ["The Appalachian Mountains, including the Berkshires, formed when…", "continents collided long ago", ["a volcano erupted last year", "glaciers melted", "rivers flowed uphill"], "Plate collisions push up mountains."],
    ["Massachusetts was once joined to Africa in the supercontinent…", "Pangaea", ["Atlantis", "Antarctica", "Asia"], "The Atlantic Ocean opened as the plates pulled apart."],
    ["The Atlantic Ocean is slowly getting wider because of the…", "Mid-Atlantic Ridge", ["Ring of Fire", "Gulf Stream", "equator"], "Plates pull apart there."],
    ["Granite, like the stone in the Bunker Hill Monument, is a… rock.", "igneous", ["sedimentary", "metamorphic", "fossil"], "It formed from cooled magma."],
    ["Glaciers carving the land over thousands of years is a… change.", "slow", ["fast", "sudden", "daily"], "Ice moves only a little each year."],
  ], { blurb: "Plates, the rock cycle and mountain building.", parentNote: "Practises plate tectonics and evidence from fossils, rocks and continent shapes, the rock cycle, and how processes at different speeds shape Earth's surface, from earthquakes to mountain building." }),
];
