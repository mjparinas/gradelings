import { lesson, type GradeLessons } from "../../lessons";

// Lessons for South Dakota's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with South Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/sd-g8-earth-history": lesson(
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
  "science/sd-g8-space": lesson(
    [
      "Mercury is closest to the Sun. Gravity keeps planets in orbit.",
      "Seasons happen because Earth’s axis is tilted.",
      "Tides are caused mostly by the Moon’s gravity. A solar eclipse is when the Moon passes between the Sun and Earth.",
    ],
    "Why does Earth have seasons?",
    [
      "It isn’t because Earth gets much closer to the Sun.",
      "Earth’s tilt changes how direct the sunlight is.",
    ],
    "Earth’s axis is tilted",
  ),
  "social/sd-g8-dakota-1800s": lesson(
    [
      "The Homestead Act and the railroads brought the Great Dakota Boom of the late 1870s and 1880s.",
      "The 1877 Agreement took the Black Hills, the Dawes Act split reservation land, and the 1889 Sioux Agreement made six smaller reservations.",
      "On December 29, 1890, the Army killed more than 250 Lakota people at Wounded Knee.",
      "South Dakota became a state in 1889.",
    ],
    "The 1868 treaty needed three-fourths of adult Lakota men to agree to a land sale. About one in ten signed in 1877. Was it followed?",
    [
      "Three-fourths is 75 out of 100.",
      "One in ten is only 10 out of 100.",
    ],
    "no, the treaty was broken",
  ),
  "social/sd-g8-depression-and-war": lesson(
    [
      "In the 1930s, drought, dust storms and grasshoppers hit South Dakota farms, and the New Deal brought jobs like the CCC.",
      "Gutzon Borglum carved Mount Rushmore from 1927 to 1941, and work on the Crazy Horse Memorial began in 1948.",
      "In World War II, Lakota Code Talkers sent messages in Lakota that the enemy could not understand.",
    ],
    "Why couldn't enemy code breakers read the Lakota Code Talkers' messages?",
    [
      "Very few outsiders knew the Lakota language.",
      "It was spoken, not written in a code book.",
    ],
    "they didn't know the Lakota language",
  ),
};
