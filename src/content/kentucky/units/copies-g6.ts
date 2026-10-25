import type { Unit } from "../../types";
import { SCIENCE_6 as WASHINGTON_SCIENCE_6 } from "../../washington/units/science-68";
import { SCIENCE_7 as WASHINGTON_SCIENCE_7 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Kentucky copies of Washington's design and Earth's surface units without the questions naming Washington's places.
// Kentucky places Earth's surface processes in Grade 6.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_6, "wa-g6-design"),
    "ky-g6-design",
    [
      "MS-ETS1-1; MS-ETS1-2; MS-ETS1-3; MS-ETS1-4",
      "defining design problems, evaluating and testing solutions, and improving designs",
    ],
    [
      [
        "A limit on a design, like cost or size, is a…",
        "constraint",
        ["criterion", "prototype"],
        "Constraints limit what you can do.",
      ],
      [
        "What a design must do to succeed is its…",
        "criteria",
        ["constraints", "materials"],
        "Criteria say what success looks like.",
      ],
      [
        "A first model you build to test an idea is a…",
        "prototype",
        ["criterion", "conclusion"],
        "Prototypes are tested and improved.",
      ],
      [
        "Engineers designing a new bridge over the Ohio River test models to…",
        "find weak points before building",
        ["make it cost more", "skip the design"],
        "Testing shows what to improve.",
      ],
      [
        "Why compare two designs with the same test?",
        "to see fairly which works better",
        ["to make both fail", "to save no data"],
        "Change one thing at a time.",
        true,
      ],
      [
        "A design for a Kentucky river town must handle…",
        "flooding and heavy spring rain",
        ["only desert heat", "no weather at all"],
        "Conditions are part of the constraints.",
        true,
      ],
    ],
  ),
  localCopy(
    from(WASHINGTON_SCIENCE_7, "wa-g7-earth-surface"),
    "ky-g6-earth-surface",
    [
      "6-ESS2-1; 6-ESS2-2; 6-ESS2-3",
      "the rock cycle, surface processes at different scales, and evidence for plate motion",
    ],
    [
      [
        "The rock cycle shows how rocks…",
        "change from one type to another",
        ["never change", "only melt"],
        "Igneous, sedimentary and metamorphic rocks.",
      ],
      [
        "Sedimentary rock like Kentucky's limestone forms from…",
        "layers of sediment pressed together",
        ["cooled lava", "melted metal"],
        "Many contain shells and fossils.",
      ],
      [
        "Rock that forms from cooled magma or lava is…",
        "igneous",
        ["sedimentary", "metamorphic"],
        "Granite and basalt are igneous.",
      ],
      [
        "Heat and pressure change rock into… rock.",
        "metamorphic",
        ["igneous", "sedimentary"],
        "Marble forms from limestone.",
      ],
      [
        "Matching fossils on continents now far apart are evidence that…",
        "the continents were once joined",
        ["fossils can swim oceans", "the oceans are new"],
        "Plates move slowly.",
        true,
      ],
      [
        "The Ohio River dropping mud and sand on its floodplain is an example of…",
        "deposition",
        ["melting rock", "a volcano"],
        "Slow water drops the sediment it carries.",
        true,
      ],
    ],
    {
      blurb: "Plates, the rock cycle and changing landforms.",
      parentNote:
        "Practices plate tectonics and evidence from fossils, rocks and continent shapes, the rock cycle, and how processes at different speeds shape Earth's surface.",
    },
  ),
];
