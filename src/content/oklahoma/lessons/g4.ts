import { lesson, type GradeLessons } from "../../lessons";

/** Lessons for Oklahoma's own Grade 4 units, keyed "subject/unit-id". */
export const LESSONS: GradeLessons = {
  "science/ok-g4-rocks-erosion": lesson(
    ["Weathering breaks rock into smaller pieces. Erosion carries the pieces away.", "Water, ice, wind and plant roots all weather and erode rock.", "Rock layers stack over time, so lower layers are usually older. Fossils in them show past places."],
    "Wind and water carve a canyon over a long time. Is that weathering and erosion?",
    ["The rock is broken down and carried away."],
    "yes, weathering and erosion",
  ),
  "science/ok-g4-earth-hazards": lesson(
    ["Maps show patterns in Earth's features: mountain chains, volcanoes and where earthquakes happen.", "Natural hazards include earthquakes, floods, landslides, tornadoes and eruptions.", "People reduce harm with warnings, strong buildings, levees and storm shelters."],
    "Which solution reduces harm from tornadoes?",
    ["Think of a strong place to go when a tornado comes."],
    "a storm shelter",
  ),
  "science/ok-g4-energy-resources": lesson(
    ["Energy and fuels come from natural resources.", "Renewable resources, like wind, sunlight and moving water, are replaced naturally.", "Nonrenewable resources, like oil, natural gas and coal, take millions of years to form. Using any of them affects the environment."],
    "Is oil a renewable or a nonrenewable resource?",
    ["Oil took millions of years to form underground."],
    "nonrenewable",
  ),
  // Adopted here from another grade, so its lesson ships with Oklahoma's grade.
  "social/ca-g5-first-nations": lesson(
    ["Many nations governed themselves through councils of leaders and elders.", "Many Plains nations, like the Lakota, followed buffalo herds. Eastern woodland nations first played lacrosse.", "The Haudenosaunee are known for the Great Law of Peace."],
    "Why did many Plains nations move often?",
    ["The buffalo gave food, clothing and shelter.", "The herds moved, so people followed them."],
    "to follow the buffalo herds",
  ),
  // Adopted here from another grade, so its lesson ships with Oklahoma's grade.
  "social/ca-g5-explorers": lesson(
    ["Columbus sailed for Spain in 1492. Henry Hudson explored for the Dutch and the English.", "Lewis and Clark explored the Louisiana Purchase to the Pacific; Sacagawea, a Shoshone woman, was their interpreter and guide.", "Colonists and nations sometimes cooperated through trade and alliances."],
    "How did Sacagawea help Lewis and Clark?",
    ["She knew the Shoshone language and the land.", "She translated and guided them."],
    "as an interpreter and guide",
  ),
};
