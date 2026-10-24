import type { Unit } from "../../types";
import { SCIENCE_9 as WASHINGTON_SCIENCE_9 } from "../../washington/units/science-9";
import { MATH_9 as CALIFORNIA_MATH_9 } from "../../california/units/math-g9";
import { from, localCopy } from "./kit";

// Ohio copies of Grade 9 units that fit Ohio except for a few questions naming another state's places.

export const MATH_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_MATH_9, "ca-g9-absolute-value"),
    "oh-g9-absolute-value",
    [
      "A.CED.1",
      "solving and creating one-variable equations and inequalities involving absolute value",
    ],
    [],
    {
      parentNote:
        "Solving one-variable equations and inequalities with absolute value, reading |x − a| as the distance from a, and writing absolute-value inequalities for real tolerances.",
    },
  ),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_9, "wa-g9-ecosystems"), "oh-g9-ecosystems", ["B.DI.1; B.DI.2; B.DI.3", "biodiversity, ecosystems, and how human actions affect them"], [
    ["The emerald ash borer, an insect from Asia, has killed millions of Ohio's…", "ash trees", ["oak leaves", "corn plants"], "It is an invasive species."],
    ["Zebra mussels in Lake Erie are an example of…", "an invasive species", ["a native keystone species", "a producer"], "They arrived in ships' water."],
    ["Fertilizer runoff that feeds harmful algae blooms in Lake Erie is an example of…", "nutrient pollution", ["natural selection", "decomposition"], "Extra nutrients upset the lake."],
    ["Ohio's deer population grew when their predators disappeared. Without predators, a population can…", "outgrow the carrying capacity", ["never grow", "become producers"], "Food and space then run short."],
    ["Restoring wetlands along Lake Erie helps by…", "filtering runoff and giving habitat", ["adding pollution", "raising the water temperature"], "Wetlands act like filters."],
    ["Only about 10% of energy passes from one trophic level to the next, so…", "food chains rarely have more than four or five levels", ["top predators are the most numerous", "producers get energy from consumers"], "Energy is lost as heat at each step."],
  ], { parentNote: "Practises carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and evaluating solutions to human impacts on ecosystems and biodiversity." }),
];
