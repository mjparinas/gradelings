import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Washington, DC's Grade 6 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with DC examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/dc-g6-climate": lesson(
    [
      "Climate is the average weather over many years.",
      "Oceans keep coastal temperatures steady, so coastal cities have mild winters.",
      "People burn much more fossil fuel than 200 years ago, so there is more CO₂ in the air.",
      "We can use less energy, like walking short trips, and adapt, like planting shade trees.",
    ],
    "Why does a coastal city have milder winters than a city far inland?",
    [
      "Ocean water warms and cools slowly.",
      "It keeps nearby temperatures steady.",
    ],
    "the ocean keeps temperatures steady",
  ),
  "science/dc-g6-design": lesson(
    [
      "Criteria are what a solution must do to succeed. Constraints are limits.",
      "A decision matrix compares designs against the criteria.",
      "A trade-off is giving up some of one thing to get more of another.",
      "After a test fails, improve the design and test again.",
    ],
    "A cheaper filter cleans water less well. Choosing it means accepting a… what?",
    [
      "You give up some cleaning to save money.",
      "Giving up one thing for another is a trade-off.",
    ],
    "a trade-off",
  ),
  "science/dc-g6-growth": lesson(
    [
      "Asexual reproduction needs one parent: bacteria splitting, strawberry runners.",
      "Sexual reproduction needs two parents and creates variation.",
      "Behaviours like nest building and feeding chicks help young survive.",
      "Genes and the environment both affect growth: the same plants grow differently in sun and shade.",
    ],
    "Two identical plants grow in sun and in shade and end up different heights. Why?",
    [
      "Their genes are the same.",
      "So the difference comes from where they grew.",
    ],
    "the environment",
  ),
  "science/dc-g6-weather": lesson(
    [
      "Evaporation turns water into vapour; condensation cools vapour into cloud droplets.",
      "An air mass is a big body of air with the same temperature and moisture.",
      "Where a cold air mass meets a warm one, a front forms and the weather changes, often with storms.",
    ],
    "A cold air mass pushes into warm, moist air over Washington, DC. What often happens?",
    [
      "The warm air is pushed up and cools.",
      "Its water vapour condenses into clouds and rain.",
    ],
    "a cold front brings clouds and storms",
  ),
  "social/dc-g6-maps-and-borders": lesson(
    [
      "Every flat map stretches part of the round Earth. The Mercator map makes places near the poles look too big.",
      "Latitude measures north and south of the Equator; longitude measures east and west of the Prime Meridian.",
      "Borders may follow rivers and mountains or be straight lines drawn by people, like many in Africa.",
      "Names of regions, like the Middle East, show a point of view.",
    ],
    "On a Mercator map, Greenland looks as big as Africa. Is it?",
    [
      "Mercator stretches land near the poles.",
      "Africa is about 14 times bigger.",
    ],
    "no, Africa is much bigger",
  ),
  "social/dc-g6-african-diaspora": lesson(
    [
      "A diaspora is a people living far from their ancestors' homeland.",
      "The transatlantic slave trade forced about 12 million Africans across the ocean.",
      "People also move by choice: push factors drive them away, pull factors draw them in.",
      "The DC area has one of the biggest Ethiopian communities outside Ethiopia.",
    ],
    "War makes a family leave home. Is war a push or a pull factor?",
    [
      "Push factors drive people away.",
      "Pull factors draw people in.",
    ],
    "a push factor",
  ),
  "social/dc-g6-global-connections": lesson(
    [
      "Globalization means trade, travel and ideas connect the world more and more.",
      "A supply chain is the path a product takes from raw materials to the buyer.",
      "Burning fossil fuels adds greenhouse gases that warm the climate.",
      "The UN's 17 Sustainable Development Goals aim for a better world by 2030.",
    ],
    "A phone has parts from many countries. What is that path called?",
    [
      "It goes from raw materials to factories to stores.",
      "It links many countries.",
    ],
    "a supply chain",
  ),
};
