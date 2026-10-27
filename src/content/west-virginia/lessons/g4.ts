import { lesson, type GradeLessons } from "../../lessons";

// Lessons for West Virginia's Grade 4 units that the shared lesson files don't cover: West Virginia's own units, and
// units West Virginia teaches in a different grade from the one their shared lesson is written for (copied word for word).
export const LESSONS: GradeLessons = {
  "science/wv-g4-fossils": lesson(
    [
      "A fossil is what is left of a plant or animal from long ago, kept in rock.",
      "Fossils show what lived in a place and what the place was like.",
      "Fern fossils in West Virginia's coal show the land was once a swampy forest.",
    ],
    "Coral fossils are found far from any sea. What does that tell us?",
    [
      "Coral only grows in warm, shallow seas.",
      "So that place was once under a warm sea.",
    ],
    "it was once a warm sea",
  ),
  "science/wv-g4-earth-hazards": lesson(
    [
      "Maps show patterns: volcanoes and earthquakes line up where Earth's plates meet.",
      "West Virginia's biggest hazards are floods, landslides and winter storms.",
      "Warnings, floodwalls, strong buildings and building on high ground all reduce harm.",
    ],
    "Heavy rain is making a creek rise fast. What should families near it do?",
    [
      "Flash floods can rise in minutes.",
      "Moving to higher ground keeps people safe.",
    ],
    "follow the warnings and move to higher ground",
  ),
  "science/wv-g4-rocks-erosion": lesson(
    [
      "Weathering breaks rock. Erosion moves it. Running water moves the most.",
      "Water can dissolve limestone to make caves. Roots growing in cracks can split rock.",
      "Over a very long time, erosion can carve deep gorges.",
      "Plants and their roots slow erosion on a hillside.",
    ],
    "Which hillside erodes faster in heavy rain: a bare one or a grassy one?",
    [
      "Roots hold soil in place.",
      "A bare hill has nothing to hold the soil.",
    ],
    "the bare hillside",
  ),
  "social/wv-g4-counties": lesson(
    [
      "West Virginia has 55 counties. Each has a county seat, where the county government works.",
      "Charleston is the county seat of Kanawha County and the state capital.",
      "Roads, railroads and towns often follow river valleys between the steep hills.",
    ],
    "What is the county seat of Cabell County?",
    [
      "Cabell County is on the Ohio River in the west.",
      "Its county seat is Huntington.",
    ],
    "Huntington",
  ),
  "social/wv-g4-then-and-now": lesson(
    [
      "In the 1700s, families farmed, hunted and built log homes.",
      "Railroads in the late 1800s carried coal and timber to faraway cities.",
      "Today, many people work in health care, tourism and natural gas, and travel on highways.",
    ],
    "In the 1700s, how did most families in what is now West Virginia get food?",
    [
      "There were no stores nearby.",
      "They farmed and hunted.",
    ],
    "farming and hunting",
  ),
};
