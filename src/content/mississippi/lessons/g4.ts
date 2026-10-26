import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Mississippi's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson under its own id, and a unit borrowed from another grade carries the lesson it has
// there. Mississippi's own units have lessons written for them.
export const LESSONS: GradeLessons = {
  "science/body-teamwork-5": lesson(
    [
      "Body systems work together. The respiratory and circulatory systems bring oxygen to muscles.",
      "Skeletal: bones. Muscular: movement. Digestive: food. Nervous: messages.",
      "The kidneys filter wastes out of the blood to make urine.",
      "An illness or injury affects a system, like heart disease and the circulatory system.",
    ],
    "Your lungs take in oxygen and your blood carries it. Which two systems are these?",
    [
      "Lungs are part of the respiratory system.",
      "Blood and the heart are the circulatory system.",
    ],
    "respiratory and circulatory",
  ),
  "science/digestion-and-breathing": lesson(
    [
      "Food goes mouth → esophagus → stomach → small intestine → large intestine.",
      "The stomach churns food with acid. Nutrients pass into the blood in the small intestine. The large intestine absorbs water.",
      "Air goes nose or mouth → trachea → bronchi → lungs.",
      "In the lungs, oxygen goes into the blood and carbon dioxide comes out.",
    ],
    "Where do nutrients from food pass into the blood?",
    [
      "The stomach breaks food down, but doesn't absorb most of it.",
      "The long small intestine is where nutrients enter the blood.",
    ],
    "the small intestine",
  ),
  "science/heart-bones-muscles": lesson(
    [
      "The heart pumps blood to the lungs to pick up oxygen, then out to the whole body.",
      "Exercise makes your heart beat faster, because muscles need more oxygen.",
      "Bones hold you up and protect organs. Muscles pull on bones through tendons.",
      "Muscles can only pull: the biceps contracts to bend your arm.",
    ],
    "Your heart beats 72 times a minute at rest and 118 after running. How many more beats?",
    [
      "Subtract the rest rate from the running rate.",
      "118 − 72 = 46.",
    ],
    "46 more beats per minute",
  ),
  "science/life-cycles": lesson(
    [
      "A life cycle is the stages a living thing goes through, again and again.",
      "Butterfly: egg, caterpillar, chrysalis, butterfly. Frog: eggs, tadpole, tadpole with legs, frog.",
      "Salmon: eggs in the river, alevin, fry, adult in the ocean, then back to the river.",
    ],
    "Put the frog's life cycle in order: frog, eggs, tadpole.",
    [
      "Every frog starts as an egg in a pond.",
      "The egg hatches into a tadpole.",
      "The tadpole grows legs and becomes a frog.",
    ],
    "eggs → tadpole → frog",
  ),
  "science/ms-g4-energy-resources": lesson(
    [
      "Renewable resources, like sunlight, wind and moving water, won't run out.",
      "Solar farms use sunlight. Geothermal plants use heat from inside Earth.",
      "Dams make electricity from moving water but can block fish like salmon.",
      "Every energy choice has good points and costs for the environment.",
    ],
    "A geothermal power plant makes electricity from what?",
    [
      "“Geo” means Earth and “thermal” means heat.",
    ],
    "heat from inside Earth",
  ),
  "science/ms-g4-weather-climate": lesson(
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
  "social/ms-g4-arts": lesson(
    [
      "Mississippi is called the Birthplace of America's Music: the blues began in the Delta, and Elvis Presley was born in Tupelo.",
      "Writers like William Faulkner, Eudora Welty and Richard Wright wrote about Mississippi's people and places.",
      "Art and buildings, from Walter Anderson's paintings to the old houses of Natchez, tell Mississippi's story too.",
    ],
    "Where did the blues begin?",
    [
      "The blues grew out of the songs of Black workers and musicians.",
      "Many of the first blues players lived in the flat farmland of the northwest.",
    ],
    "the Mississippi Delta",
  ),
  "social/ms-g4-beginnings": lesson(
    [
      "The Choctaw, Chickasaw and Natchez are nations whose homelands include Mississippi. Each has its own language and history.",
      "Spain, France and Britain all claimed the land before the United States made it the Mississippi Territory in 1798.",
      "In the 1830s, treaties forced most Choctaw and Chickasaw people west. The Mississippi Band of Choctaw Indians still lives in Mississippi today.",
      "Mississippi became the 20th state on December 10, 1817.",
    ],
    "When did Mississippi become a state?",
    [
      "The Mississippi Territory was made in 1798.",
      "Statehood came 19 years later.",
    ],
    "1817",
  ),
  "social/ms-g4-civil-rights": lesson(
    [
      "The Civil Rights Movement worked to end segregation and unfair voting rules.",
      "Mississippians like Medgar Evers and Fannie Lou Hamer fought for the right to vote. James Meredith integrated the University of Mississippi in 1962.",
      "Freedom Summer in 1964 and the Voting Rights Act of 1965 helped many more Black Mississippians register to vote.",
    ],
    "What did Fannie Lou Hamer work for?",
    [
      "She was a sharecropper in the Delta.",
      "She lost her job for trying to register to vote, and kept working for voting rights.",
    ],
    "the right to vote",
  ),
  "social/ms-g4-civil-war": lesson(
    [
      "Before the Civil War, cotton was Mississippi's main crop, and it was grown by enslaved people.",
      "Mississippi left the Union in 1861. In 1863 the Union captured Vicksburg and took control of the Mississippi River.",
      "During Reconstruction, Black Mississippians voted and held office, but later Jim Crow laws took many rights away.",
    ],
    "Why was the capture of Vicksburg important?",
    [
      "Vicksburg sat on high bluffs above the Mississippi River.",
      "Taking it let the Union control the whole river.",
    ],
    "it gave the Union control of the Mississippi River",
  ),
  "social/ms-g4-regions": lesson(
    [
      "Mississippi has ten regions, such as the Delta, the Loess Bluffs, the Black Prairie, the Piney Woods and the Coastal Meadows.",
      "Each region's land and soil shape its work: farming in the Delta, timber in the Piney Woods, seafood and shipbuilding on the coast.",
      "Rivers matter too. The Mississippi River forms most of the western border, and the Pearl River flows past Jackson.",
    ],
    "Why is the Delta good for growing cotton, soybeans and rice?",
    [
      "River floods left rich soil there over thousands of years.",
      "The land is flat, so big fields are easy to farm.",
    ],
    "it has flat land and rich soil",
  ),
  "social/ms-g4-timeline": lesson(
    [
      "A timeline shows events in the order they happened, earliest first.",
      "Compare years to order events: 1817 comes before 1863.",
      "Subtract years to find how long apart events were.",
    ],
    "Mississippi became a state in 1817. Vicksburg fell in 1863. How many years apart are they?",
    [
      "1863 − 1817 = 46.",
    ],
    "46 years",
  ),
};
