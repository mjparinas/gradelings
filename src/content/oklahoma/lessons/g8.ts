import { lesson, type GradeLessons } from "../../lessons";

/** Lessons for Oklahoma's own Grade 8 units, keyed "subject/unit-id". */
export const LESSONS: GradeLessons = {
  "science/ok-g8-space": lesson(
    ["The moon's phases come from how much of its sunlit side we see as it orbits Earth.", "Seasons happen because Earth's axis is tilted, not because of its distance from the sun.", "Gravity holds the moon, the planets and whole galaxies in their orbits."],
    "Why does Oklahoma have long days in June?",
    ["Think about which way Earth's axis leans in June."],
    "the Northern Hemisphere is tilted toward the sun",
  ),
  "science/ok-g8-growth": lesson(
    ["Animal behaviours, like courtship dances, and plant parts, like bright flowers, help living things reproduce.", "Both genes and the environment, such as water and food, affect how an organism grows.", "In asexual reproduction, one parent makes offspring with the same genes."],
    "Wheat grows shorter in a dry year. Is that caused by genes or the environment?",
    ["The plants are the same kind; the water changed."],
    "the environment",
  ),
  // Adopted here from another grade, so its lesson ships with Oklahoma's grade.
  "math/wa-g7-sampling": lesson(
    ["The population is the whole group. A sample is part of it.", "A random sample gives everyone an equal chance to be picked.", "Use the sample's fraction to estimate for the population."],
    "In a random sample of 50 students, 10 bike to school. About how many of 400 students bike?",
    ["10/50 = 1/5.", "1/5 of 400 = 80."],
    "About 80",
  ),
};
