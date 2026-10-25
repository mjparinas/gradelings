import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Louisiana's Grade 5 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Louisiana examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/la-g5-sun-stars": lesson(
    [
      "The sun looks bright because it is the closest star to Earth.",
      "Earth spins once a day, so the sun rises in the east and sets in the west.",
      "Shadows point away from the sun: west in the morning, shortest around noon.",
      "Days in Louisiana are longest in June and shortest in December.",
    ],
    "At what time of day is your shadow shortest?",
    [
      "The sun is highest in the sky around noon.",
      "A high sun makes a short shadow.",
    ],
    "around noon",
  ),
  "science/la-g5-earth-water": lesson(
    [
      "Earth's systems: geosphere (rock and land), hydrosphere (water), atmosphere (air) and biosphere (life).",
      "Systems interact, like a volcano putting ash into the air.",
      "Only a small part of Earth's water is fresh, so saving it matters.",
      "Fixing leaks and recycling help protect Earth's resources.",
    ],
    "Plant roots grow into cracks and split a rock. Which systems interact?",
    [
      "Plants are living: the biosphere.",
      "Rock is the geosphere.",
    ],
    "biosphere and geosphere",
  ),
  "science/la-g5-ecosystems": lesson(
    [
      "Producers (plants) make food. Consumers eat plants or other animals.",
      "Decomposers, like mushrooms, worms and bacteria, break down dead things.",
      "They return matter to the soil so plants can use it again.",
      "Without decomposers, dead things would pile up.",
    ],
    "Which is a decomposer: a hawk, a mushroom or a fern?",
    [
      "A hawk is a consumer and a fern is a producer.",
      "A mushroom breaks down dead matter.",
    ],
    "a mushroom",
  ),
  "science/la-g5-gravity": lesson(
    [
      "Gravity is a force that pulls objects toward each other.",
      "Earth's gravity pulls everything toward its centre, everywhere on Earth.",
      "That's why balls fall back down, water flows downhill and the oceans stay on Earth.",
    ],
    "You throw a ball straight up. What happens next, and why?",
    [
      "Earth's gravity keeps pulling the ball toward Earth's centre.",
    ],
    "it comes back down because of gravity",
  ),
  "social/ca-g7-rome-byzantium": lesson(
    [
      "Constantine was the first Christian Roman emperor and moved the capital to Constantinople.",
      "The eastern empire, Byzantium, lasted until the Ottoman Turks took Constantinople in 1453.",
      "Justinian organized Roman law. Latin is the root of Spanish, French, Italian and Portuguese.",
    ],
    "When did the Byzantine Empire end?",
    [
      "The Ottoman Turks captured Constantinople.",
      "That happened in the mid-1400s.",
    ],
    "1453",
  ),
  "social/ca-g7-science-enlightenment": lesson(
    [
      "Copernicus, Galileo, Kepler and Newton used observation and math to explain nature. Newton described universal gravitation.",
      "Enlightenment thinkers used reason about government: Locke wrote of rights to life, liberty and property; Montesquieu wanted separate branches.",
      "These ideas shaped the Declaration of Independence and the Constitution.",
    ],
    "John Locke wrote that people have natural rights to what?",
    [
      "Locke said rights come from being human, not from a king.",
      "He named life, liberty and property.",
    ],
    "life, liberty and property",
  ),
  "social/islamic-world": lesson(
    [
      "Baghdad became the Abbasid capital in 762 and a centre of learning and trade.",
      "The House of Wisdom translated books from many cultures. Fatima al-Fihri founded al-Qarawiyyin in Fez (859).",
      "Ideas spread through the Islamic world: Hindu-Arabic numerals (0 to 9) and paper-making.",
    ],
    "What are the numerals 0 to 9 often called?",
    [
      "They began in India.",
      "Scholars in the Islamic world spread them.",
    ],
    "Hindu-Arabic numerals",
  ),
  "social/medieval-europe": lesson(
    [
      "Feudalism: the king gave land to nobles for loyalty and soldiers; peasants worked the land of a lord's manor.",
      "Monasteries were communities where monks prayed and copied books, keeping learning alive.",
      "The Black Death (1340s) spread by fleas on rats along trade routes. Kings and the Church sometimes clashed over power.",
    ],
    "In the feudal system, who gave land to nobles?",
    [
      "Nobles promised loyalty and soldiers.",
      "They got their land from the ruler at the top.",
    ],
    "the king",
  ),
  "social/ny-g9-crusades-plague": lesson(
    [
      "The Crusades were wars over the Holy Land; Venice and Genoa grew rich shipping crusaders and trading.",
      "The Reconquista was Christian kingdoms taking back Iberia from Muslim rulers.",
      "The Black Death reached Europe in 1347 by trade routes, carried by fleas on rats. Cities used quarantine (40 days apart) to slow it.",
    ],
    "What was the Reconquista?",
    [
      "Muslim rulers had held much of Spain and Portugal.",
      "Christian kingdoms fought to take it back.",
    ],
    "the effort by Christian kingdoms to take back the Iberian Peninsula",
  ),
  "social/or-g7-african-kingdoms": lesson(
    [
      "Ghana, Mali and Songhai grew rich from gold and salt trade across the Sahara. Mansa Musa of Mali went on pilgrimage to Makkah in 1324.",
      "Swahili city-states like Kilwa and Mombasa traded across the Indian Ocean. Great Zimbabwe, Benin and Ethiopia were also powerful.",
      "Historians use Arabic writings, griots’ oral histories and archaeology.",
    ],
    "The empire of Mali grew rich from trading what?",
    [
      "Mali controlled routes across the Sahara.",
      "Gold from the south was traded for salt from the desert.",
    ],
    "gold and salt",
  ),
  "social/renaissance-and-reformation": lesson(
    [
      "The Renaissance was a rebirth of art and learning after the Middle Ages.",
      "Gutenberg's printing press (about 1450) made books cheaper and spread ideas fast.",
      "In 1517, Martin Luther criticized Church practices, starting the Reformation. Shakespeare wrote plays and poems around 1600.",
    ],
    "Which came first: the Black Death reaches Europe or Gutenberg's printing press?",
    [
      "The Black Death came in 1347.",
      "The printing press came about 1450.",
    ],
    "the Black Death reaches Europe",
  ),
};
