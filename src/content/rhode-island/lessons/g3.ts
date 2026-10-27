import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Rhode Island's Grade 3 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Rhode Island examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/ri-g3-fossils": lesson(
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
  "science/ri-g3-weather-climate": lesson(
    [
      "Weather is what the air is like today. Climate is the usual weather over many years.",
      "Read temperature and rain data for each season.",
      "Mountains get the most snow in winter.",
    ],
    "Highs of 30 °F, 28 °F and 32 °F. Which season is it?",
    [
      "Those are cold temperatures.",
    ],
    "winter",
  ),
  "social/ri-g3-northeast": lesson(
    [
      "Rhode Island is in the Northeast, along the Atlantic Ocean. It is one of the six New England states.",
      "The Northeast has a rocky coast, the old Appalachian Mountains, cold snowy winters and colourful fall leaves.",
      "Native nations such as the Wampanoag and Narragansett have lived here for thousands of years. Big cities like New York and Boston are here today.",
    ],
    "Fast rivers in the Northeast could turn water wheels. What did that help build?",
    [
      "Turning wheels can run machines.",
      "Buildings full of machines are factories and mills.",
    ],
    "factories",
  ),
  "social/ri-g3-states-and-nation": lesson(
    [
      "The United States has 50 states, plus Washington, D.C., the capital.",
      "It also has territories, such as Puerto Rico and Guam, that are not states.",
      "The national government has three branches: Congress makes laws, the President carries them out, and the courts decide what laws mean.",
    ],
    "Which branch of the national government makes laws?",
    [
      "Congress has the Senate and the House of Representatives.",
      "They write and pass laws.",
    ],
    "Congress (the legislative branch)",
  ),
};
