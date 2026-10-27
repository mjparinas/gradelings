import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Hawaiʻi's Grade 2 units that the shared lesson files don't cover. A copy of another
// state's unit carries the original's lesson (with Hawaiʻi examples where the original named its own state) under its
// own id, and a unit borrowed from another grade carries the lesson it has there. Lessons are written in Canadian
// spelling, like every lesson file; US families see them in US spelling.
export const LESSONS: GradeLessons = {
  "science/hi-g2-earth-changes": lesson(
    [
      "Some changes are fast, like volcanoes, landslides and floods.",
      "Some are slow, like wind and water wearing away land over years.",
      "Plant roots and rock walls help slow these changes.",
    ],
    "Water carves a canyon over many years. Fast or slow?",
    [
      "Many years is a long time.",
      "That is a slow change.",
    ],
    "slow",
  ),
  "science/hi-g2-habitats": lesson(
    [
      "A habitat is a place where a living thing lives.",
      "Each habitat has its own life: sea turtles on reefs, ʻōhiʻa trees in rain forests.",
      "Forests often have more kinds of animals than deserts.",
    ],
    "Which animal lives in a pond: a frog or a camel?",
    [
      "A camel lives in a dry desert.",
      "A frog needs water.",
    ],
    "a frog",
  ),
  "science/hi-g2-land-water": lesson(
    [
      "Landforms: mountains, valleys, hills and plains.",
      "Bodies of water: rivers, lakes, oceans and bays. A bay is ocean partly closed in by land.",
      "Solid water stays in glaciers on high mountains.",
    ],
    "Low land between mountains is a…?",
    [
      "Mountains are high.",
      "The low land between them is a valley.",
    ],
    "valley",
  ),
  "social/hi-g2-difference-makers": lesson(
    [
      "Difference makers solve problems and help others.",
      "Rosa Parks stood up for fairness. Sally Ride became the first American woman in space.",
      "Duke Kahanamoku shared surfing with the world, and Bernice Pauahi Bishop left her lands to start schools.",
    ],
    "Patsy Mink from Hawaiʻi was the first woman of colour elected to…",
    [
      "She worked in Washington, D.C.",
      "She helped make laws for the whole country.",
    ],
    "the United States Congress",
  ),
  "social/hi-g2-family-journeys": lesson(
    [
      "An immigrant moves to a new country to live.",
      "Families move for jobs, safety or to be near family.",
      "To find how long ago, subtract: this year minus the year it happened.",
    ],
    "A family moved here in 2018. It is 2025 now. How many years ago was that?",
    [
      "2025 − 2018 = 7.",
    ],
    "7",
  ),
  "social/hi-g2-leaders": lesson(
    [
      "A principal leads a school, a mayor leads a county, the governor leads the state and the President leads the country.",
      "Voters choose many leaders in elections.",
      "Taxes pay for public services everyone shares, like libraries, parks, roads, lifeguards and fire fighters.",
    ],
    "Who leads the whole state of Hawaiʻi?",
    [
      "A mayor leads one county.",
      "The governor leads the whole state.",
    ],
    "the governor",
  ),
  "social/hi-g2-making-trading": lesson(
    [
      "Food is grown on farms, caught by fishers, made ready in factories, shipped and sold in stores.",
      "Every choice has a cost and a benefit, and people trade for what they don't make.",
      "Hawaiʻi grows coffee, macadamia nuts and fruit, and ships bring much of its other food.",
    ],
    "Why does Hawaiʻi trade for much of its food?",
    [
      "Hawaiʻi is made of small islands with many people.",
      "Its farms can't grow everything people eat, so food comes by ship.",
    ],
    "its farms can't grow all the food it needs",
  ),
};
