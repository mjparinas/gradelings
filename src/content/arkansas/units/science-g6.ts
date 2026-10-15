import type { Unit } from "../../types";
import { SCIENCE_6 as washingtonScience6 } from "../../washington/units/science-68";
import { copyOf, from } from "./kit";

/** Arkansas's own Grade 6 science units (`ar-` ids): copies of other states' units without their places, plus Arkansas items. */
export const UNITS: Unit[] = [
  // A copy of wa-g6-design without its questions about other states' places.
  copyOf(
    from(washingtonScience6, "wa-g6-design"),
    {
      id: "ar-g6-design",
      title: "Engineering Design",
      emoji: "📐",
      blurb: "Criteria, constraints, testing and improving.",
      parentNote:
        "Practices the engineering design process: defining a problem with criteria and constraints, comparing solutions, testing to find the best features, and improving a design step by step, with Arkansas problems such as floods and tornadoes.",
      standards: ["6-ETS1-1; 6-ETS1-2; 6-ETS1-3; 6-ETS1-4", "defining design problems, judging solutions against criteria and improving a design"],
    },
    [
      ["A town on the Arkansas River wants a levee that keeps out a big flood and costs less than its budget. The budget is a…", "constraint", ["criterion", "test result", "prototype"], "A constraint is a limit."],
      ["A school designs a tornado shelter. \"It must hold every student\" is a…", "criterion", ["constraint", "trade-off", "prototype"], "A criterion is what the solution must do."],
      ["Students test three model footbridges for a creek in the Ozarks. One bends under the weight. What should they do next?", "Find why it bent, improve it and test again", ["Give up on bridges", "Pick it anyway", "Stop testing all three"], "Testing shows what to improve."],
      ["A rice farmer compares two ways to water a field using a table of cost, water used and harvest. This table is a…", "decision matrix", ["hypothesis", "constraint", "prototype"], "It compares solutions against criteria."],
      ["Engineers combine the strongest part of one storm-shelter design with the cheapest part of another. Why?", "To make a better solution that meets more criteria", ["To make the test fail", "To ignore the constraints", "To avoid testing"], "The best features of several designs can be combined.", true],
    ],
  ),
];
