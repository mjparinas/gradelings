import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Mississippi Grade 8 science: a copy of California's resources-and-hazards unit without its California places, with
// Mississippi examples added.

export const SCIENCE_8: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g7-resources"),
    {
      id: "ms-g8-hazards",
      title: "Natural Hazards",
      emoji: "🌀",
      blurb: "Where hazards strike, forecasting them, and staying safe.",
      parentNote:
        "Practices why some hazards can be forecast and others cannot, where they happen and how people reduce the harm, with Mississippi examples like hurricanes and storm surge on the coast, river floods and tornadoes.",
      standards: ["E.8.9B; E.8.10", "natural hazards and why some can be predicted, and how people use resources and reduce harm"],
    },
    [
      ["When a hurricane pushes ocean water onto the Mississippi coast, it is called a…", "storm surge", ["tsunami", "drought", "landslide"], "Wind piles water up against the shore."],
      ["Weather scientists can warn the Gulf Coast days before a hurricane arrives because…", "satellites track the storm as it forms over the ocean", ["hurricanes never move", "earthquakes cause them", "they always hit at night"], "Hurricanes build slowly over warm water."],
      ["Tornado warnings usually give only minutes of notice because tornadoes…", "form quickly inside storms", ["last for weeks", "only happen at sea", "are seen on satellites days ahead"], "They can form and vanish fast."],
      ["Levees along the Mississippi River were built to…", "hold back floodwater", ["make the river saltier", "start earthquakes", "make hurricanes stronger"], "The great flood of 1927 led to bigger levees."],
      ["Which hazard is hardest to forecast ahead of time?", "an earthquake", ["a hurricane", "a spring flood after heavy rain", "a summer heat wave"], "Earthquakes give almost no warning."],
      ["Building homes on raised posts near the coast helps protect them from…", "flooding", ["drought", "earthquakes", "wildfire"], "Water can pass underneath."],
      ["Wetlands along the coast help reduce hurricane damage because they…", "soak up water and slow the surge", ["make storms stronger", "push water inland", "stop all rain"], "Marsh plants act like a sponge.", true],
      ["As more people live along the coast, the cost of hurricane damage usually…", "goes up", ["goes down", "stays at zero", "disappears"], "More homes and roads are in harm's way.", true],
    ],
  ),
];
