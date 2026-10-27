import { lesson, type GradeLessons } from "../../lessons";

// Lessons for West Virginia's Grade 5 units that the shared lesson files don't cover: West Virginia's own units, and
// units West Virginia teaches in a different grade from the one their shared lesson is written for (copied word for word).
export const LESSONS: GradeLessons = {
  "science/wv-g5-energy-resources": lesson(
    [
      "Energy comes from natural resources.",
      "Renewable resources like wind, sunlight and moving water don't run out.",
      "Coal and natural gas take millions of years to form, and burning them adds pollution.",
    ],
    "Is the wind turning turbines on a mountain ridge renewable or nonrenewable?",
    [
      "The wind keeps blowing.",
      "It will not run out, so it is renewable.",
    ],
    "renewable",
  ),
  "science/wv-g5-sun-stars": lesson(
    [
      "The sun is a star. It looks bigger and brighter because it is much closer than other stars.",
      "Shadows are long in the morning and evening and shortest at noon.",
      "Earth's tilt and orbit give us seasons and different stars in winter and summer.",
    ],
    "When is your shadow shortest?",
    [
      "The sun is highest in the sky at noon.",
      "High sun makes short shadows.",
    ],
    "at noon",
  ),
  "science/wv-g5-earth-water": lesson(
    [
      "Earth has four systems: land (geosphere), water (hydrosphere), air (atmosphere) and life (biosphere).",
      "They affect each other: rain wears away hills, and trees put water vapor into the air.",
      "Most of Earth's water is salty ocean water; only a little is fresh water we can use.",
    ],
    "Rain washes soil from a hillside into a river. Which two systems interact?",
    [
      "Soil is part of the geosphere.",
      "The river is part of the hydrosphere.",
    ],
    "the geosphere and the hydrosphere",
  ),
  "science/wv-g5-ecosystems": lesson(
    [
      "Producers, like plants, make food from sunlight.",
      "Consumers eat plants or other animals. Decomposers break down dead things.",
      "Matter moves around and around: decomposers return nutrients to the soil for plants.",
    ],
    "A mushroom breaks down a fallen log. What is it?",
    [
      "It feeds on dead things.",
      "That makes it a decomposer.",
    ],
    "a decomposer",
  ),
  "social/wv-g5-becoming-west-virginia": lesson(
    [
      "Western Virginians felt the state government in Richmond favored the east.",
      "When Virginia left the Union in 1861, western delegates met in Wheeling and formed a Union government.",
      "Lincoln signed the statehood bill, and West Virginia became the 35th state on June 20, 1863.",
    ],
    "Which came first: Virginia leaving the Union, or West Virginia becoming a state?",
    [
      "Virginia voted to leave in 1861.",
      "West Virginia became a state in 1863.",
    ],
    "Virginia leaving the Union",
  ),
};
