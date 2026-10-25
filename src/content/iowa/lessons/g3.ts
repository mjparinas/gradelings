import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Iowa's Grade 3 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Iowa examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/ia-g3-fossils": lesson(
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
  "science/ia-g3-weather-climate": lesson(
    [
      "Weather is what the air is like today. Climate is the usual weather over many years.",
      "Read temperature and rain data for each season.",
      "Iowa has cold, snowy winters and warm, rainy summers.",
    ],
    "Highs of 30 °F, 28 °F and 32 °F. Which season is it?",
    [
      "Those are cold temperatures.",
    ],
    "winter",
  ),
  "social/ia-g3-first-nations": lesson(
    [
      "Many nations governed themselves through councils of leaders and elders.",
      "Many Plains nations, like the Lakota, followed buffalo herds. Eastern woodland nations first played lacrosse.",
      "The Haudenosaunee are known for the Great Law of Peace.",
    ],
    "Why did many Plains nations move often?",
    [
      "The buffalo gave food, clothing and shelter.",
      "The herds moved, so people followed them.",
    ],
    "to follow the buffalo herds",
  ),
  "social/ca-g5-slavery-and-resistance": lesson(
    [
      "The transatlantic slave trade forced millions of African people across the ocean, breaking apart families.",
      "The Declaration said all men are created equal, yet slavery was legal in all 13 colonies.",
      "Enslaved people kept cultures alive with music, stories, faith and family. Gradual abolition ended slavery step by step.",
    ],
    "What did gradual abolition mean?",
    [
      "Gradual means little by little.",
      "Slavery was ended step by step over years.",
    ],
    "Slavery was ended step by step over years.",
  ),
  "social/or-g5-earn-and-save": lesson(
    [
      "Income is money you earn. Profit is income minus costs.",
      "To find earnings, multiply the price by how many times you work.",
      "To plan saving, divide the goal by how much you save each week.",
    ],
    "Sam wants a $45 game and saves $9 each week. How many weeks will it take?",
    [
      "Divide the goal by the weekly savings.",
      "45 ÷ 9 = 5.",
    ],
    "5 weeks",
  ),
  "social/ia-g3-explorers": lesson(
    [
      "European explorers looked for gold, land and new routes to Asia.",
      "New ships and tools, like the caravel and the astrolabe, made long voyages possible.",
      "In 1673, Marquette and Jolliet paddled down the Mississippi and saw the land that is now Iowa.",
      "Explorers met Native nations who knew the land, and they traded, talked and sometimes fought.",
    ],
    "Who were the first Europeans known to see the land that is now Iowa?",
    [
      "They paddled down the Mississippi River in 1673.",
      "They were exploring for France.",
    ],
    "Marquette and Jolliet",
  ),
};
