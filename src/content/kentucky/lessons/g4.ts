import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Kentucky's own Grade 4 units, attached in ../g4.ts so they ship in Kentucky's download.
export const LESSONS: GradeLessons = {
  "science/ky-g4-fossils": lesson(
    ["Fossils are remains or traces of living things from long ago.", "Much of Kentucky's limestone holds fossils of sea animals, so Kentucky was once under a shallow sea.", "In rock layers, older fossils are usually lower down."],
    "In rock layers, are older fossils usually higher or lower?",
    ["Layers pile up over time.", "The first layers are at the bottom."],
    "lower down",
  ),
  "science/ky-g4-rocks-erosion": lesson(
    ["Weathering breaks rock. Erosion moves it. Running water moves the most.", "Roots growing in cracks can split rock. Water and ice widen cracks too.", "Over a very long time, water carved Kentucky's gorges, arches and caves.", "Plants and their roots slow erosion on a hillside."],
    "Which hillside erodes faster in heavy rain: a bare one or a grassy one?",
    ["Roots hold soil in place.", "A bare hill has nothing to hold the soil."],
    "the bare hillside",
  ),
  "science/ky-g4-earth-hazards": lesson(
    ["Earthquakes, floods, tornadoes and landslides are natural hazards.", "Western Kentucky is near the New Madrid fault, where large earthquakes have happened.", "During an earthquake: drop, cover and hold on.", "Maps show where hazards are likely, so people can plan."],
    "The ground starts shaking at school. What should you do?",
    ["Get low so you don't fall.", "Get under a desk and hold on until it stops."],
    "drop, cover and hold on",
  ),
  "science/ky-g4-energy-resources": lesson(
    ["Renewable resources, like sunlight, wind and moving water, won't run out.", "Coal, oil and natural gas are non-renewable: they took millions of years to form.", "Dams make electricity from moving water. Coal plants burn coal.", "Every energy choice has good points and costs for the environment."],
    "Is coal a renewable or non-renewable resource?",
    ["Coal formed from plants over millions of years.", "Once it is burned, it is gone."],
    "non-renewable",
  ),
  "social/ky-g4-colonial-kentucky": lesson(
    ["Shawnee, Cherokee and other Nations hunted and lived in the Kentucky region.", "In 1750 Thomas Walker crossed the Cumberland Gap. Later Daniel Boone marked the Wilderness Road.", "Settlers built forts at Harrodsburg and Boonesborough in the 1770s."],
    "What was the Cumberland Gap?",
    ["Kentucky is west of the Appalachian Mountains.", "Settlers needed a way through them."],
    "a low pass through the mountains",
  ),
  "social/ky-g4-colonial-government": lesson(
    ["In a monarchy, a king or queen rules. In self-government, people make their own rules.", "Virginia's House of Burgesses (1619) was the first elected assembly in the colonies.", "New England towns held town meetings, where citizens voted on local issues."],
    "Who made laws in a colony's elected assembly?",
    ["The members were chosen by voters.", "They represented the people."],
    "representatives elected by the colonists",
  ),
  "social/ky-g4-market-economy": lesson(
    ["Producers make goods and services. Consumers buy and use them.", "When demand goes up and supply stays the same, prices usually rise.", "Specialization means doing one job well; then people trade for what they need."],
    "Many people want a toy, but there are only a few. What usually happens to its price?",
    ["Demand is high and supply is low.", "Sellers can ask for more."],
    "the price goes up",
  ),
  // Borrowed units Kentucky teaches in a different grade from the one their lesson was written for.
  "social/ca-g5-explorers": lesson(
    ["Columbus sailed for Spain in 1492. Henry Hudson explored for the Dutch and the English.", "Lewis and Clark explored the Louisiana Purchase to the Pacific; Sacagawea, a Shoshone woman, was their interpreter and guide.", "Colonists and nations sometimes cooperated through trade and alliances."],
    "How did Sacagawea help Lewis and Clark?",
    ["She knew the Shoshone language and the land.", "She translated and guided them."],
    "as an interpreter and guide",
  ),
};
