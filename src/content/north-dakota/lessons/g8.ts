import { lesson, type GradeLessons } from "../../lessons";

// Lessons for North Dakota's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with North Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/nd-g8-earth-history": lesson(
    [
      "Rock layers and fossils order Earth’s 4.6-billion-year history; lower layers are older.",
      "Most of that history is the Precambrian. We live in the Cenozoic Era.",
      "Homologous structures show that living things share ancestors.",
    ],
    "In which era do we live today?",
    [
      "The eras go Paleozoic, Mesozoic, Cenozoic.",
      "The latest is the Cenozoic.",
    ],
    "the Cenozoic Era",
  ),
  "science/nd-g8-space": lesson(
    [
      "Mercury is closest to the Sun. Gravity keeps planets in orbit.",
      "Seasons happen because Earth’s axis is tilted, which is why North Dakota's June days are long.",
      "A solar eclipse is when the Moon passes between the Sun and Earth.",
    ],
    "Why does Earth have seasons?",
    [
      "It isn’t because Earth gets much closer to the Sun.",
      "Earth’s tilt changes how direct the sunlight is.",
    ],
    "Earth’s axis is tilted",
  ),
  "social/nd-g8-land-people": lesson(
    [
      "North Dakota's three regions are the Red River Valley, the Drift Prairie and the Missouri Plateau, shaped by glaciers and rivers.",
      "Most people live in cities in the east, like Fargo; almost 9 in 10 acres are farms and ranches.",
      "Thematic maps show where people live, what crops grow and where oil is pumped.",
    ],
    "Why have many rural counties lost people since the 1930s?",
    [
      "Machines let one family farm more land.",
      "Bigger farms need fewer workers.",
    ],
    "farms grew larger and needed fewer people",
  ),
  "social/nd-g8-nations": lesson(
    [
      "Before contact, the Mandan, Hidatsa and Arikara farmed along the Missouri, and the Dakota, Lakota and Nakota lived across the plains.",
      "Federal policy changed again and again: reservations, the Dawes Act and boarding schools, the Indian Reorganization Act, termination and self-determination.",
      "Tribal nations are sovereign governments today.",
    ],
    "What did the Dawes Act of 1887 do to reservation land?",
    [
      "It split shared land into small family plots.",
      "The rest was sold to settlers.",
    ],
    "divided it up, and tribal nations lost much of it",
  ),
  "social/nd-g8-government-politics": lesson(
    [
      "Dakota Territory (1861) became the state of North Dakota on November 2, 1889.",
      "The Legislative Assembly (47 senators, 94 representatives), the governor and the Supreme Court make, carry out and interpret the laws.",
      "The Nonpartisan League, started by farmers in 1915, created the Bank of North Dakota and the state mill.",
    ],
    "How can North Dakota voters make a law without the Legislative Assembly?",
    [
      "They gather signatures from voters.",
      "The measure goes on the ballot.",
    ],
    "by an initiated measure",
  ),
  "social/nd-g8-economy": lesson(
    [
      "Early North Dakota traded furs and bison robes, then railroads and bonanza farms grew wheat for far-off markets.",
      "Today, farms lead the nation in spring wheat, durum and canola, and the state produces Bakken oil, lignite and wind power.",
      "Each industry brings good effects, like jobs and taxes, and costs, like crowded roads or pollution.",
    ],
    "Why did the state start the Legacy Fund?",
    [
      "Oil will not last forever.",
      "Saving part of the tax money helps the future.",
    ],
    "to save oil tax money for the future",
  ),
  "social/nd-g8-modern": lesson(
    [
      "The Homestead Act, the railroads and cheap land brought settlers, many from Norway and from German villages in Russia.",
      "The 1930s drought and Depression drove many people away.",
      "The Garrison Dam, Cold War missile bases, big floods and the oil boom shaped the modern state.",
    ],
    "Why did North Dakota's population fall in the 1930s?",
    [
      "Drought dried the fields and prices were low.",
      "Many families lost their farms and moved away.",
    ],
    "drought and the Depression drove people away",
  ),
};
