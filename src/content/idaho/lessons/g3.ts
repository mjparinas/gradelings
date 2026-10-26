import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Idaho's Grade 3 units that the shared lesson files don't cover. A copy of another state's unit
// carries a lesson written for Idaho under its own id, and a unit borrowed from another grade carries the lesson it
// has there, word for word.
export const LESSONS: GradeLessons = {
  "science/id-g3-weather-climate": lesson(
    [
      "Weather is what the air is like today. Climate is the usual weather over many years.",
      "Read temperature and rain or snow data for each season.",
      "Idaho's mountains get the most snow in winter.",
    ],
    "Highs of 30 °F, 28 °F and 32 °F. Which season is it?",
    [
      "Those are cold temperatures.",
      "The coldest season is winter.",
    ],
    "winter",
  ),
  "social/id-g3-idaho-home": lesson(
    [
      "Maps help us find places: a scale shows distance, and a grid helps find a spot quickly.",
      "Many Idaho towns grew beside rivers and railroads, which gave water and a way to ship goods.",
      "People move to Idaho for jobs, family and the outdoors. Moving to a new country is immigration; Basque families came to herd sheep.",
    ],
    "Moving to a new country to live there is called…",
    [
      "Migration is any move to a new home.",
      "A move to a new country is immigration.",
    ],
    "immigration",
  ),
  "social/id-g3-local-government": lesson(
    [
      "Local governments run cities and counties. Voters elect a mayor and city council, and county commissioners.",
      "Governments give services, like fire departments, parks, libraries and snowplows. Taxes pay for them.",
      "The Idaho Legislature makes laws for the whole state, and the state builds state highways.",
    ],
    "A town wants a new playground. Who would most likely vote on it?",
    [
      "It is a city decision.",
      "The city council votes on city rules and budgets.",
    ],
    "the city council",
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
};
