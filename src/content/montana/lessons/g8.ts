import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Montana's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Montana examples where the original named its own state) under its own id.
export const LESSONS: GradeLessons = {
  "science/mt-g8-space": lesson(
    [
      "Earth's tilt causes the seasons: the hemisphere tilted toward the sun has summer.",
      "Moon phases come from seeing different parts of its sunlit half. In a solar eclipse the moon is between the sun and Earth.",
      "Gravity holds the planets in orbit; the solar system is huge compared with Earth.",
    ],
    "In a solar eclipse, what is between the sun and Earth?",
    [
      "Something blocks the sunlight.",
      "The moon's shadow falls on Earth.",
    ],
    "the moon",
  ),
  "science/mt-g8-earth-history": lesson(
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
  "social/mt-g8-montana-story": lesson(
    [
      "Since contact, horses, trade, disease, the loss of the bison and government policy changed life for Montana's Tribal Nations.",
      "Copper made Butte rich, and the Anaconda Company held great power in Montana for decades.",
      "The 1972 constitution protects a clean and healthful environment, privacy, the right to know, and Indian education.",
    ],
    "Which right is in Montana's 1972 constitution but not in the US Constitution?",
    [
      "Montana's Declaration of Rights adds rights the US Constitution lacks.",
      "One is the right to a clean and healthful environment.",
    ],
    "a clean and healthful environment",
  ),
  "social/mt-g8-montana-timeline": lesson(
    [
      "Put events in order by year, earliest first.",
      "Smallpox (1837), the Hellgate Treaty (1855), statehood (1889), women's vote (1914), the new constitution (1972).",
      "Subtract years to find how far apart events are, and ask how one event led to another.",
    ],
    "Montana women won the vote in 1914, and the 19th Amendment came in 1920. How many years apart?",
    [
      "Subtract the earlier year from the later one.",
      "1920 − 1914 = 6.",
    ],
    "6 years",
  ),
};
