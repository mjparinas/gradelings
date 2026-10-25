import { lesson, type GradeLessons } from "../../lessons";

/** Lessons for Oklahoma's own Grade 5 units, keyed "subject/unit-id". */
export const LESSONS: GradeLessons = {
  "science/ok-g5-sun-stars": lesson(
    ["The sun is a star. It looks much brighter than other stars because it is much closer.", "As Earth spins, the sun seems to move across the sky, and shadows change length and direction.", "In summer, days are longer and the noon sun is higher, so shadows are shorter."],
    "Why does the sun look brighter than other stars?",
    ["All stars are very far away, but one is much nearer."],
    "it is much closer to Earth",
  ),
  "science/ok-g5-earth-water": lesson(
    ["Earth's systems are the geosphere (rock), hydrosphere (water), atmosphere (air) and biosphere (life).", "Most of Earth's water is salty ocean water. Most fresh water is frozen or underground.", "Communities protect resources by saving water, keeping soil in place and recycling."],
    "Is most of Earth's water fresh or salty?",
    ["Oceans hold almost all of Earth's water."],
    "salty",
  ),
  "science/ok-g5-ecosystems": lesson(
    ["Producers, like grass, make food from sunlight. Consumers eat plants or animals.", "Decomposers, like mushrooms, break down dead things and return matter to the soil.", "A change, such as a new species spreading, can upset an ecosystem's balance."],
    "What do mushrooms on a fallen log do?",
    ["They feed on dead matter."],
    "break it down and return matter to the soil",
  ),
  "science/ok-g5-gravity": lesson(
    ["Gravity is a force that pulls objects toward Earth's centre.", "Everywhere on Earth, down means toward the centre.", "Gravity pulls without touching, unlike a push."],
    "A ball is dropped in Tulsa. Which way does gravity pull it?",
    ["Gravity always pulls toward Earth's centre."],
    "down, toward Earth's centre",
  ),
};
