import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Utah's Grade 8 units that the shared lesson files don't cover: Utah's own units, Utah copies of
// other states' units (the original's lesson with Utah examples), and units Utah teaches in a different grade from the
// original (the lesson they have there).
export const LESSONS: GradeLessons = {
  "science/ut-g8-resources": lesson(
    ["Minerals, fuels and groundwater are found only where past geologic processes put them, like copper at Bingham Canyon.", "Scientists forecast hazards from data, such as sensors along the Wasatch Fault.", "Good designs reduce human impact by using less and polluting less."],
    "Why are some minerals found in only a few places?",
    ["Minerals collect through processes like volcanoes and ancient seas.", "Those happened in some places, not everywhere."],
    "past geologic processes concentrated them there",
  ),
  "science/plant-parts-ab": lesson(
    ["Roots take in water, stems hold the plant up, leaves make food, flowers make seeds.", "Xylem carries water up from the roots. Phloem carries sugar from the leaves.", "Stomata are tiny leaf openings that let carbon dioxide in and oxygen and water vapour out."],
    "Which tubes carry water from the roots to the leaves?",
    ["Phloem carries sugar.", "The water tubes are the other kind."],
    "xylem",
  ),
  "social/wa-g5-road-to-revolution": lesson(
    ["After 1763, Britain taxed the colonies to pay war debts. Colonists said “No taxation without representation.”", "Protests grew: the Boston Massacre (1770), the Boston Tea Party (1773), then the Intolerable Acts closed Boston's port.", "Patriots wanted change; Loyalists stayed loyal to the king."],
    "How did Britain punish Boston after the Tea Party?",
    ["Britain passed harsh laws in 1774.", "They closed Boston's port until the tea was paid for."],
    "It closed the port with the Intolerable Acts.",
  ),
  "social/wa-g6-americas-africa": lesson(
    ["The Maya, in southern Mexico and Central America, developed writing, a calendar and astronomy. Millions of Maya people live there today.", "The Aztec ruled from Tenochtitlan; the Inca ruled the Andes and used llamas. Cahokia was a large mound-building city.", "In Africa, Ghana and Mali grew rich on trade; Mansa Musa made a famous pilgrimage to Mecca."],
    "Which animal did the Inca use to carry loads in the Andes?",
    ["The Andes are high, steep mountains.", "The Inca raised llamas to carry goods."],
    "llamas",
  ),
};
