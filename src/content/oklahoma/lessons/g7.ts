import { lesson, type GradeLessons } from "../../lessons";

/** Lessons for Oklahoma's own Grade 7 units, keyed "subject/unit-id". */
export const LESSONS: GradeLessons = {
  "science/ok-g7-resources": lesson(
    ["Minerals, energy resources and groundwater are spread unevenly across Earth.", "Where they are depends on past geologic processes, such as ancient seas that left oil, gas or gypsum.", "Many are used faster than they form or refill."],
    "Why does Oklahoma have so much oil and natural gas?",
    ["Oil and gas form from buried remains of ancient sea life."],
    "ancient seas left remains that became oil and gas",
  ),
  "science/ok-g7-biodiversity": lesson(
    ["Biodiversity is the variety of life in an ecosystem.", "Ecosystems give services such as clean water, pollination and flood control.", "Solutions to protect them are compared by how well they work, their cost and their side effects."],
    "Wetlands filter water and slow floods. What are these called?",
    ["They are benefits people get from ecosystems."],
    "ecosystem services",
  ),
  // Adopted here from another grade, so its lesson ships with Oklahoma's grade.
  "science/ca-g6-human-impact": lesson(
    ["Human impacts include fertilizer runoff, litter and cutting forests.", "Monitor an impact by measuring it over time, like weekly litter counts or satellite images.", "Storm drains carry rainwater straight to creeks and the ocean without treatment.", "A good solution has a criterion you can measure, like less litter in weekly counts."],
    "How could scientists track forest loss over many years?",
    ["They need the same view of the forest at regular times.", "Satellites can take those pictures."],
    "satellite images taken at regular times",
  ),
  // Adopted here from another grade, so its lesson ships with Oklahoma's grade.
  "social/ga-g6-europe": lesson(
    ["Key features include the Alps, the Pyrenees, the Ural Mountains and the Rhine River.", "Europe has many languages and religions in a small area.", "The European Union helps member countries trade and work together."],
    "Which mountains are often called the line between Europe and Asia?",
    ["They run north to south through Russia.", "Their name starts with U."],
    "the Ural Mountains",
  ),
};
