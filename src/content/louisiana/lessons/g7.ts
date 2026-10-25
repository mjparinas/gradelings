import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Louisiana's Grade 7 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Louisiana examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/la-g7-weather": lesson(
    [
      "Warm air is less dense, so it rises. Cold air sinks.",
      "Humidity is the amount of water vapour in the air.",
      "Water vapour cools and condenses to form clouds.",
      "Air masses meet at fronts, which bring weather changes. An anemometer measures wind speed.",
    ],
    "Warm, moist air rises and cools. What forms?",
    [
      "Cooling vapour condenses into droplets.",
      "Lots of droplets make clouds.",
    ],
    "clouds",
  ),
  "science/la-g7-climate": lesson(
    [
      "Climate is the average weather of a place over many years.",
      "Burning fossil fuels adds carbon dioxide, which traps heat. This is the main cause of recent warming.",
      "As Earth warms, ice melts and seawater expands, so sea level rises.",
      "Forests help slow climate change because trees take in carbon dioxide.",
    ],
    "Why do forests help slow climate change?",
    [
      "Carbon dioxide traps heat.",
      "Trees take in carbon dioxide to make food.",
    ],
    "trees take in carbon dioxide",
  ),
  "science/la-g7-biodiversity": lesson(
    [
      "Ecosystems with more biodiversity are usually more stable.",
      "Invasive species, such as zebra mussels, are non-native and cause harm.",
      "Native plants, restored reefs and protected habitat help species recover.",
    ],
    "How do native plants along a stream help biodiversity?",
    [
      "Local animals evolved with these plants.",
      "They use them for food and shelter.",
    ],
    "they give local animals food and shelter",
  ),
  "social/la-g7-purchase-statehood": lesson(
    [
      "In 1803, the United States bought Louisiana from France for about $15 million.",
      "Louisiana became the 18th state on April 30, 1812.",
      "In 1815, Andrew Jackson won the Battle of New Orleans. Steamboats, sugar and cotton made New Orleans rich, but that wealth was built on slavery.",
    ],
    "Put in order: statehood, the Louisiana Purchase, the Battle of New Orleans.",
    [
      "The Purchase was in 1803.",
      "Statehood was in 1812.",
      "The battle was in 1815.",
    ],
    "Purchase, statehood, battle",
  ),
  "social/la-g7-civil-war-louisiana": lesson(
    [
      "Louisiana seceded in 1861 to protect slavery and joined the Confederacy.",
      "The Union captured New Orleans in 1862 and Port Hudson in 1863, opening the Mississippi River.",
      "During Reconstruction, Black Louisianans won rights and offices, but violence and new laws took many of those rights away by 1877.",
    ],
    "Why was capturing New Orleans important to the Union?",
    [
      "New Orleans was the South's biggest port.",
      "It sits near the mouth of the Mississippi River.",
      "Taking it closed the port and opened the river.",
    ],
    "it closed the South's biggest port and opened the Mississippi",
  ),
  "social/la-g7-reform-sectionalism": lesson(
    [
      "In the 1800s, reformers worked for women's rights, better schools and prisons, and an end to slavery.",
      "Abolitionists such as Frederick Douglass, William Lloyd Garrison and Harriet Tubman fought slavery with words and action.",
      "Laws and court cases such as the Compromise of 1850 and the Dred Scott decision drove the North and South further apart.",
    ],
    "What did abolitionists want?",
    [
      "To abolish means to end.",
      "Abolitionists wanted to end slavery.",
    ],
    "to end slavery",
  ),
  "social/ca-g8-civil-war": lesson(
    [
      "Fights over slavery grew: “Bleeding Kansas” and the Dred Scott decision (1857).",
      "Lincoln's election in 1860 led Southern states to secede.",
      "The Union's Anaconda Plan blockaded ports and the Mississippi; Sherman's March (1864) destroyed Southern resources.",
    ],
    "Whose election in 1860 led Southern states to secede?",
    [
      "He opposed slavery spreading into new territories.",
      "He became the 16th president.",
    ],
    "Abraham Lincoln",
  ),
  "social/ca-g8-divided-nation": lesson(
    [
      "As the country grew, North and South argued over whether slavery would spread to new lands.",
      "The Compromise of 1850 made California a free state and passed a stronger Fugitive Slave Act, forcing free states to help return people who escaped.",
      "Frederick Douglass escaped slavery and became a famous speaker and writer against it.",
    ],
    "What did the Fugitive Slave Act of 1850 require?",
    [
      "It was part of the Compromise of 1850.",
      "It was about people who escaped slavery.",
      "People in free states had to help return them.",
    ],
    "people in free states had to help return people who had escaped slavery",
  ),
};
