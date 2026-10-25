import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Louisiana's Grade 6 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Louisiana examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/la-g6-space": lesson(
    [
      "The Moon’s phases come from how much of its lit side we see as it orbits Earth.",
      "Seasons happen because Earth’s axis is tilted. The hemisphere tilted toward the Sun has summer.",
      "Gravity holds the solar system and galaxies together. Our galaxy is the Milky Way.",
    ],
    "In June the Northern Hemisphere tilts toward the Sun. What season does it have?",
    [
      "Tilting toward the Sun gives more direct light.",
      "More direct light means summer.",
    ],
    "summer",
  ),
  "social/la-g6-colonial-louisiana": lesson(
    [
      "In 1682, La Salle claimed the Mississippi River basin for France and named it Louisiana.",
      "Bienville founded New Orleans in 1718; Natchitoches, founded in 1714, is older.",
      "The colony grew slowly, depended on enslaved labor under the Code Noir, and was ruled by governors chosen by the king.",
    ],
    "Which was founded first, Natchitoches or New Orleans?",
    [
      "Natchitoches was founded in 1714.",
      "New Orleans was founded in 1718.",
      "1714 is earlier.",
    ],
    "Natchitoches",
  ),
  "social/la-g6-spanish-louisiana": lesson(
    [
      "In 1762, France secretly gave Louisiana to Spain in the Treaty of Fontainebleau.",
      "Under Spain, Acadians, Isleños and others settled Louisiana, and enslaved people could buy their freedom.",
      "Governor Bernardo de Gálvez helped the Americans win the Revolution. In 1800, Spain returned Louisiana to France.",
    ],
    "How did Bernardo de Gálvez help the American Revolution?",
    [
      "He was Spain's governor of Louisiana.",
      "He captured British forts and sent supplies to the Americans.",
    ],
    "by capturing British forts and sending supplies",
  ),
  "science/ca-g8-population-resources": lesson(
    [
      "Total resource use = number of people × use per person.",
      "Using more water, energy, land and materials affects Earth’s systems, such as habitats and clean water.",
      "Better technology and using less per person can lower the impact.",
    ],
    "A town’s population doubles and each person uses the same water. What happens to total water use?",
    [
      "Use per person stays the same.",
      "Twice the people means twice the water.",
    ],
    "it doubles",
  ),
  "science/nb-motion-forces-8": lesson(
    [
      "Speed = distance ÷ time. Velocity is speed with a direction.",
      "Force is measured in newtons. Friction and gravity are forces.",
      "Newton’s laws: objects keep doing what they’re doing unless a force acts; more force means more acceleration; every push has an equal push back.",
    ],
    "A cyclist rides 30 m in 6 s. What is her speed?",
    [
      "Speed = distance ÷ time.",
      "30 ÷ 6 = 5.",
    ],
    "5 m/s",
  ),
  "social/ca-g5-explorers": lesson(
    [
      "Columbus sailed for Spain in 1492. Henry Hudson explored for the Dutch and the English.",
      "Lewis and Clark explored the Louisiana Purchase to the Pacific; Sacagawea, a Shoshone woman, was their interpreter and guide.",
      "Colonists and nations sometimes cooperated through trade and alliances.",
    ],
    "How did Sacagawea help Lewis and Clark?",
    [
      "She knew the Shoshone language and the land.",
      "She translated and guided them.",
    ],
    "as an interpreter and guide",
  ),
  "social/ca-g8-revolutionary-ideas": lesson(
    [
      "The Revolution spread new ideas. Jefferson’s Virginia Statute for Religious Freedom (1786) said no one could be forced to attend or pay for a church.",
      "James Madison helped pass it and later wrote the First Amendment.",
      "American independence inspired others, like Simón Bolívar in South America. New states wrote their own constitutions.",
    ],
    "Which later document did the Virginia Statute for Religious Freedom help inspire?",
    [
      "James Madison helped pass the Statute.",
      "He later drafted the Bill of Rights.",
      "Its religious freedom is in the First Amendment.",
    ],
    "the First Amendment",
  ),
};
