import { lesson, type GradeLessons } from "../../lessons";

// Lessons for West Virginia's Grade 6 units that the shared lesson files don't cover: West Virginia's own units, and
// units West Virginia teaches in a different grade from the one their shared lesson is written for (copied word for word).
export const LESSONS: GradeLessons = {
  "science/wv-g6-weather": lesson(
    [
      "An air mass is a huge body of air with about the same temperature and moisture.",
      "Where air masses meet, at a front, the weather often changes and storms form.",
      "Air rising over mountains cools, and its water vapor condenses into clouds, rain or snow.",
    ],
    "A cold front passes. What usually happens to the temperature?",
    [
      "Cold air pushes in behind the front.",
      "The temperature drops.",
    ],
    "it drops",
  ),
  "science/wv-g6-climate": lesson(
    [
      "Climate is the usual weather of a place over many years.",
      "Latitude, elevation, oceans and winds shape a region's climate.",
      "Burning fossil fuels adds carbon dioxide, which traps heat and warms Earth.",
    ],
    "Why are mountaintops colder than nearby valleys?",
    [
      "Air gets colder as you go higher.",
      "Mountaintops are higher up.",
    ],
    "air is colder at higher elevations",
  ),
  "science/wv-g6-biodiversity": lesson(
    [
      "Biodiversity is the variety of living things in a place.",
      "Healthy ecosystems give us services like clean water, pollination and flood control.",
      "To compare solutions, ask which best protects species and those services, at a fair cost.",
    ],
    "Which would better help a salamander that lives only in high red spruce forests?",
    [
      "It needs its forest to survive.",
      "Planting red spruce gives it more habitat.",
    ],
    "planting red spruce",
  ),
  "science/wv-g6-space": lesson(
    [
      "Earth's tilt causes seasons; the moon's orbit causes phases and eclipses.",
      "In a solar eclipse the moon blocks the sun; in a lunar eclipse Earth's shadow covers the moon.",
      "Gravity holds the planets in orbit around the sun and holds galaxies together.",
    ],
    "In which kind of eclipse does the moon pass between the sun and Earth?",
    [
      "The moon blocks sunlight from reaching Earth.",
      "That is a solar eclipse.",
    ],
    "a solar eclipse",
  ),
  "science/wv-g6-design": lesson(
    [
      "Criteria say what a design must do. Constraints are limits like cost, size and time.",
      "Build a prototype, test it, and record the results.",
      "Compare designs with the same fair test, then combine their best parts.",
    ],
    "A bridge must hold 10 cars and cost under $1 million. Which is a constraint?",
    [
      "Holding 10 cars is what it must do: a criterion.",
      "The cost limit is a constraint.",
    ],
    "costing under $1 million",
  ),
  "science/ca-g7-food-molecules": lesson(
    [
      "Digestion breaks big food molecules into small ones, such as starch into sugar.",
      "Cells use small molecules to build new parts or release energy in cellular respiration.",
      "Atoms are rearranged, never lost or made.",
    ],
    "Enzymes in your saliva start breaking starch into what?",
    [
      "Starch is a long chain of sugar units.",
      "Enzymes snip the chain apart.",
    ],
    "sugar",
  ),
  "social/az-g7-world-since-1945": lesson(
    [
      "The United Nations formed in 1945 to keep peace. The Universal Declaration names rights like freedom of thought and expression.",
      "Empires ended and new nations formed, like India in 1947.",
      "The Soviet Union broke apart in 1991. Globalization links economies; shared challenges include climate and migration.",
    ],
    "In what year did India become independent from Britain?",
    [
      "It came soon after World War II.",
      "The year was 1947.",
    ],
    "1947",
  ),
  "social/fl-g7-us-and-world": lesson(
    [
      "Foreign policy is how a country deals with other countries. Domestic policy is about issues at home.",
      "The president makes treaties, with Senate approval. Congress declares war.",
      "On September 11, 2001, terrorists attacked New York City, the Pentagon and a field in Pennsylvania. Nearly 3,000 people died.",
    ],
    "Who can declare war: the president or Congress?",
    [
      "The Constitution gives the power to declare war to one branch.",
      "That branch is Congress.",
    ],
    "Congress",
  ),
  "social/wv-g6-world-economy": lesson(
    [
      "In capitalism people own businesses; in communism the government owns them; socialism mixes the two.",
      "Trade agreements like USMCA lower taxes on goods moving between the United States, Mexico and Canada.",
      "Time zones are about 15° of longitude wide: clocks go later as you travel east.",
    ],
    "When it is noon in New York, what time is it in Los Angeles?",
    [
      "Los Angeles is on Pacific time, 3 zones west of New York.",
      "Going west, clocks are earlier: 12 minus 3 is 9.",
    ],
    "9 a.m.",
  ),
};
