import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Utah's Grade 6 units that the shared lesson files don't cover: Utah's own units, Utah copies of
// other states' units (the original's lesson with Utah examples), and units Utah teaches in a different grade from the
// original (the lesson they have there).
export const LESSONS: GradeLessons = {
  "science/ut-g6-space": lesson(
    ["The Moon's phases come from how much of its lit side we see as it orbits Earth.", "Seasons happen because Earth's axis is tilted. The hemisphere tilted toward the Sun has summer.", "Gravity holds the solar system and galaxies together. Our galaxy is the Milky Way."],
    "In June the Northern Hemisphere tilts toward the Sun. What season does Utah have?",
    ["Tilting toward the Sun gives more direct light.", "More direct light means summer."],
    "summer",
  ),
  "science/ut-g6-weather": lesson(
    ["Warm air is less dense, so it rises. Cold air sinks.", "Water vapour cools and condenses to form clouds, as air rises over the Wasatch Mountains.", "Air masses meet at fronts, which bring weather changes."],
    "Warm, moist air rises and cools. What forms?",
    ["Cooling vapour condenses into droplets.", "Lots of droplets make clouds."],
    "clouds",
  ),
  "science/ut-g6-climate": lesson(
    ["Climate is the average weather of a place over many years.", "Burning fossil fuels adds carbon dioxide, which traps heat. This is the main cause of recent warming.", "In Utah, warmer winters mean a smaller snowpack and less water in rivers in summer."],
    "Why does a smaller snowpack matter in Utah?",
    ["Melting snow fills rivers and reservoirs.", "Less snow means less water in summer."],
    "less water for summer",
  ),
  "social/al-g9-decolonization": lesson(
    ["After World War II, colonies won independence: India (1947), Ghana (1957, led by Nkrumah), Algeria (1962, after a long war).", "Some fought, like Kenya’s Mau Mau Rebellion against British rule.", "The Suez Crisis (1956) showed Britain and France could no longer act as world powers without US support."],
    "In what year did India gain independence from Britain?",
    ["It was soon after World War II.", "India became independent in 1947."],
    "1947",
  ),
  "social/ca-g7-exploration-and-empire": lesson(
    ["Europeans sailed to find sea routes to Asia; Vasco da Gama reached India by sailing around Africa.", "New tools helped: the Mercator projection kept compass directions straight for sailors.", "The Columbian Exchange moved plants, animals and diseases, and ships carried enslaved Africans across the Atlantic against their will."],
    "How did Vasco da Gama reach India?",
    ["He sailed from Portugal.", "He went south along the coast of Africa.", "He rounded its tip and crossed to India."],
    "by sailing around Africa",
  ),
  "social/or-g7-age-of-revolutions": lesson(
    ["The Scientific Revolution used observation: Copernicus said Earth moves around the Sun; Galileo used a telescope.", "Enlightenment thinkers argued for rights and limits on power: Montesquieu proposed separate branches; Wollstonecraft argued for women’s rights.", "Revolutions followed: America (1775), France (1789), Haiti (1791–1804) and Latin America."],
    "Montesquieu proposed what idea about government?",
    ["He worried about one ruler holding all power.", "He suggested splitting power among separate branches."],
    "separating government into branches",
  ),
};
