import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Mississippi's Grade 3 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson under its own id, and a unit borrowed from another grade carries the lesson it has
// there. Mississippi's own units have lessons written for them.
export const LESSONS: GradeLessons = {
  "science/ms-g3-fossils": lesson(
    [
      "Fossils are remains or traces of living things from long ago.",
      "Mud covering a leaf can harden into a leaf print in rock.",
      "In rock layers, older fossils are usually lower down.",
    ],
    "In rock layers, are older fossils usually higher or lower?",
    [
      "Layers pile up over time.",
      "The first layers are at the bottom.",
    ],
    "lower down",
  ),
  "science/or-g4-rocks-erosion": lesson(
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
  "science/rock-cycle": lesson(
    [
      "Igneous rock forms when magma or lava cools.",
      "Sedimentary rock forms when pieces from weathering and erosion settle in layers and press together.",
      "Metamorphic rock forms when heat and pressure change a rock.",
      "The rock cycle has no start: any rock can become any other type.",
    ],
    "Lava from a volcano cools and hardens. Which kind of rock forms?",
    [
      "Lava is melted rock.",
      "Rock that forms from cooled melted rock is igneous.",
    ],
    "igneous",
  ),
  "social/ms-g3-government": lesson(
    [
      "Government has three branches: one makes laws, one carries them out, and one decides what they mean.",
      "The nation has Congress, the President and the courts. Mississippi has the Legislature, the Governor and state courts.",
      "Towns have mayors and councils, and each county has a Board of Supervisors.",
      "In a democracy, citizens choose leaders by voting.",
    ],
    "Which branch makes Mississippi's laws?",
    [
      "Making laws is the legislative branch's job.",
      "In Mississippi, that branch is the Legislature.",
    ],
    "the Mississippi Legislature",
  ),
  "social/ms-g3-land-and-energy": lesson(
    [
      "People change the land to meet their needs: levees hold back rivers, dams make lakes and farms replace forests.",
      "Hurricanes, tornadoes and floods are natural disasters. Warnings and plans keep people safe.",
      "Energy comes from fossil fuels like oil and gas, and from the sun, wind, water and nuclear power.",
    ],
    "Why were levees built along the Mississippi River?",
    [
      "The river can rise over its banks in a flood.",
      "Levees are tall walls of earth that hold the water back.",
    ],
    "to keep floodwater out of towns and farms",
  ),
  "social/ms-g3-money-and-voting": lesson(
    [
      "Resources can be natural (land, water), human (workers’ skills) or capital (tools and machines).",
      "A trade-off means giving up one thing to get another. Taxes pay for services.",
      "Citizens take part by voting and speaking up.",
    ],
    "A farmer uses a tractor. What kind of resource is the tractor?",
    [
      "It isn’t from nature and it isn’t a person.",
      "A tool or machine used to make things is capital.",
    ],
    "a capital resource",
  ),
};
