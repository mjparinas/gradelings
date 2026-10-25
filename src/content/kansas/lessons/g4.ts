import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Kansas's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Kansas examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/ks-g4-earth-hazards": lesson(
    [
      "Maps show patterns: many mountains, volcanoes and earthquakes are along the edges of Earth's plates.",
      "People cannot stop natural hazards, but they can reduce the harm they do.",
      "Warning sirens, storm shelters, levees and safe plans help during tornadoes and floods.",
    ],
    "The tornado sirens sound at school. Where should you go?",
    [
      "Get away from windows.",
      "Go low, to a basement or an inside room.",
    ],
    "a basement or an inside room",
  ),
  "science/ks-g4-energy-resources": lesson(
    [
      "Renewable resources, like sunlight, wind and moving water, won't run out.",
      "Fossil fuels, like coal, oil and natural gas, formed long ago and will run out.",
      "Kansas makes much of its electricity from wind turbines on the plains.",
      "Every energy choice has good points and costs for the environment.",
    ],
    "Is the wind that turns a turbine renewable or nonrenewable?",
    [
      "The sun keeps heating the air, so the wind keeps blowing.",
      "A resource that won't run out is renewable.",
    ],
    "renewable",
  ),
  "science/ks-g4-rocks-erosion": lesson(
    [
      "Weathering breaks rock. Erosion moves it. Running water moves the most.",
      "Glaciers scrape and carry rock. Roots growing in cracks can split rock.",
      "Over a very long time, erosion can carve deep canyons.",
      "Plants and their roots slow erosion on a hillside.",
    ],
    "Which hillside erodes faster in heavy rain: a bare one or a grassy one?",
    [
      "Roots hold soil in place.",
      "A bare hill has nothing to hold the soil.",
    ],
    "the bare hillside",
  ),
  "social/ks-g4-kansas-land": lesson(
    [
      "Kansas is in the middle of the country, on the Great Plains. The land rises slowly from east to west.",
      "The Flint Hills have tallgrass prairie, and the High Plains in the west are dry and flat.",
      "Farms in western Kansas pump water from the Ogallala Aquifer under the ground, so people work to save it.",
    ],
    "Which part of Kansas gets more rain, the east or the west?",
    [
      "Moist air from the Gulf of Mexico reaches the east first.",
      "The west is drier, with fewer trees.",
    ],
    "the east",
  ),
  "social/ks-g4-first-peoples": lesson(
    [
      "The Kansa (Kaw), Osage, Wichita and Pawnee lived in what is now Kansas long before it was a state. Kansas is named for the Kansa.",
      "In the 1830s, the U.S. government moved many Eastern nations to Kansas, and later moved most nations again.",
      "Today, four Native nations have reservations in Kansas, each with its own government.",
    ],
    "Which people is Kansas named for?",
    [
      "Kansas means people of the south wind.",
      "That is the name of the Kansa, or Kaw, people.",
    ],
    "the Kansa (Kaw)",
  ),
  "social/ks-g4-free-state": lesson(
    [
      "In 1854, the Kansas-Nebraska Act let settlers vote on whether Kansas would allow slavery.",
      "People on both sides rushed to Kansas, and fighting broke out. It was called Bleeding Kansas.",
      "Kansas became a free state on January 29, 1861, just before the Civil War. Kansans celebrate Kansas Day on that date.",
    ],
    "Why was the time before statehood called Bleeding Kansas?",
    [
      "People who wanted slavery and people against it fought.",
      "Many people were hurt or killed.",
    ],
    "because of the fighting over slavery",
  ),
  "social/ks-g4-kansas-grows": lesson(
    [
      "Railroads brought settlers and carried cattle and wheat to markets in the East.",
      "Kansas grows a lot of wheat and sorghum, raises cattle, and builds airplanes in Wichita.",
      "Natural resources (soil, oil, wind), human resources (workers) and capital resources (tractors) help make goods.",
    ],
    "A farmer uses a combine to harvest wheat. What kind of resource is the combine?",
    [
      "It is a machine people made.",
      "Tools and machines used to make goods are capital resources.",
    ],
    "a capital resource",
  ),
  "social/ks-g4-fairness": lesson(
    [
      "Some Kansans faced unfair rules because of their race or because they were women.",
      "Kansans worked for fairness: women won the vote in Kansas in 1912, and Linda Brown's family helped end segregated schools.",
      "Brown v. Board of Education began in Topeka and was decided by the Supreme Court in 1954.",
    ],
    "In 1954, what did Brown v. Board of Education decide?",
    [
      "Black and white children had been sent to separate schools.",
      "The court said separate schools were unfair.",
    ],
    "separate schools for Black and white children were unfair",
  ),
  "social/ks-g4-governing-kansas": lesson(
    [
      "Kansas's government meets in the capitol in Topeka and has three branches.",
      "The Legislature makes laws, the governor carries them out, and the courts decide what they mean.",
      "Kansas has 105 counties, and Tribal nations have their own governments.",
    ],
    "Which branch of Kansas's government makes the laws?",
    [
      "The governor carries out laws, and the courts explain them.",
      "The Legislature, with its Senate and House, writes them.",
    ],
    "the Legislature",
  ),
  "social/ks-g4-kansas-timeline": lesson(
    [
      "A timeline puts events in order from earliest to latest.",
      "Kansas Territory was created in 1854, and Kansas became a state in 1861.",
      "To find how many years apart two events are, subtract the earlier year from the later one.",
    ],
    "How many years after Kansas Territory was created did Kansas become a state?",
    [
      "1861 − 1854 = 7.",
    ],
    "7",
  ),
  "social/ks-g4-us-regions": lesson(
    [
      "The United States has five regions: the Northeast, Southeast, Midwest, Southwest and West.",
      "Kansas is in the Midwest, on the Great Plains, near the middle of the 48 states that touch.",
      "Each region has its own land, climate and hazards, like tornadoes on the plains and hurricanes in the Southeast.",
    ],
    "Which region is Kansas in?",
    [
      "Kansas is in the middle of the country.",
      "It shares farms and plains with states like Nebraska and Iowa.",
    ],
    "the Midwest",
  ),
};
