import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Mississippi's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson under its own id, and a unit borrowed from another grade carries the lesson it has
// there. Mississippi's own units have lessons written for them.
export const LESSONS: GradeLessons = {
  "science/ms-g8-hazards": lesson(
    [
      "Minerals, energy and water are spread unevenly because of past geologic processes.",
      "Scientists map hazards such as earthquakes, tsunamis, floods and wildfires.",
      "Monitoring networks (seismometers, GPS, gas sensors) help warn people early.",
    ],
    "What does a tsunami hazard map show?",
    [
      "Tsunamis flood low coastal land.",
      "People need to know where to go.",
    ],
    "areas that could flood and routes to high ground",
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
};
