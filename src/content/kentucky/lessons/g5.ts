import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Kentucky's own Grade 5 units, attached in ../g5.ts so they ship in Kentucky's download.
export const LESSONS: GradeLessons = {
  "science/ky-g5-ecosystems": lesson(
    ["Producers make food. Consumers eat other living things.", "Decomposers, like worms and fungi, return nutrients to the soil.", "Matter moves around an ecosystem again and again."],
    "Deer eat clover in a Kentucky meadow. Are deer producers or consumers?",
    ["Deer can't make their own food.", "They eat plants."],
    "consumers",
  ),
  "science/ky-g5-sun-stars": lesson(
    ["The sun looks brighter than other stars because it is much closer to Earth.", "Earth spins once about every 24 hours, giving day and night.", "Shadows are long in the morning and evening and shortest near midday.", "Different stars are seen in different seasons as Earth orbits the sun."],
    "Some stars are bigger than the sun. Why do they look so small?",
    ["Things far away look dimmer and smaller.", "Those stars are much farther from Earth."],
    "they are very far away",
  ),
  "science/ky-g5-earth-water": lesson(
    ["The geosphere is rocks and land; the hydrosphere is water; the atmosphere is air; the biosphere is life.", "Most fresh water is frozen in ice caps and glaciers.", "Only a small part of Earth's water is fresh and easy to use.", "In Kentucky, rain soaks into limestone and flows through caves underground."],
    "Trees take in water and give off water vapour. Which systems interact?",
    ["Trees: biosphere. Water: hydrosphere.", "The vapour goes into the air: atmosphere."],
    "biosphere, hydrosphere and atmosphere",
  ),
  "social/ky-g5-kentucky-settlers": lesson(
    ["During the Revolution, Kentucky was Kentucky County, part of Virginia.", "George Rogers Clark led militia to capture British forts in the West.", "Settlers defended forts such as Boonesborough and Bryan's Station."],
    "During the American Revolution, Kentucky was part of which state?",
    ["It was called Kentucky County.", "It became its own state in 1792."],
    "Virginia",
  ),
  "social/ky-g5-citizenship": lesson(
    ["A right is something you are free to do. A responsibility is something you should do.", "Citizens vote, serve on juries, obey laws and pay taxes.", "Staying informed and volunteering help the community too."],
    "Is serving on a jury when called a right or a responsibility?",
    ["It is a job citizens are asked to do for others.", "Something you should do for your community is a responsibility."],
    "a responsibility",
  ),
  // Borrowed units Kentucky teaches in a different grade from the one their lesson was written for.
  "social/ca-g8-revolutionary-ideas": lesson(
    ["The Revolution spread new ideas. Jefferson’s Virginia Statute for Religious Freedom (1786) said no one could be forced to attend or pay for a church.", "James Madison helped pass it and later wrote the First Amendment.", "American independence inspired others, like Simón Bolívar in South America. New states wrote their own constitutions."],
    "Which later document did the Virginia Statute for Religious Freedom help inspire?",
    ["James Madison helped pass the Statute.", "He later drafted the Bill of Rights.", "Its religious freedom is in the First Amendment."],
    "the First Amendment",
  ),
};
