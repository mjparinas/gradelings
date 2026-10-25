import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Utah's Grade 7 units that the shared lesson files don't cover: Utah's own units, Utah copies of
// other states' units (the original's lesson with Utah examples), and units Utah teaches in a different grade from the
// original (the lesson they have there).
export const LESSONS: GradeLessons = {
  "science/ut-g7-earth-surface": lesson(
    ["Matching coastlines, fossils and rocks on far-apart continents show they were once joined.", "Plates pull apart, collide and stretch. Stretching crust made Utah's Basin and Range.", "Some changes are sudden (earthquakes); others take millions of years (mountain building)."],
    "Is a landslide a fast or a very slow change to Earth's surface?",
    ["A landslide happens in minutes.", "Mountain building takes millions of years."],
    "fast",
  ),
  "science/ut-g7-earth-history": lesson(
    ["In undisturbed rock layers, the oldest are at the bottom (superposition).", "An index fossil lived for a short time over a wide area, so it dates layers.", "Old shorelines on Utah's mountains show how high ancient Lake Bonneville rose."],
    "Why is an index fossil useful?",
    ["It was around only briefly but in many places.", "Finding it dates the rock layer."],
    "it lived for a short time over a wide area",
  ),
  "social/ut-g7-native-peoples": lesson(
    ["Artifacts let archaeologists infer how the Fremont and Ancestral Puebloan peoples lived.", "Utah's land shaped Native ways of life: scarce water, seasonal foods, trade networks.", "The Goshute, Navajo, Paiute, Shoshone and Ute are sovereign nations that keep and adapt their cultures."],
    "A Fremont granary is full of corn. What can you infer?",
    ["A granary stores food.", "Storing corn means planning for scarce times."],
    "they farmed and stored food for later",
  ),
  "social/ut-g7-diverse-peoples": lesson(
    ["Mormon pioneers migrated to Utah from 1847 to escape persecution; miners, railroad workers and merchants followed.", "Towns grew where water flowed, and the Wasatch Front became the most urban area.", "Conflicts such as the Utah War and the Black Hawk War look different from each side, so historians compare sources."],
    "Why did most early Utah towns grow along streams?",
    ["Utah is dry.", "Farms and towns need water."],
    "streams gave water for farms and towns",
  ),
  "social/ut-g7-statehood": lesson(
    ["The railroad (1869) and telegraph (1861) tied Utah to national markets.", "Mining, farming and industry built new towns, from Park City to Price.", "Statehood waited until plural marriage ended and national parties formed. Utah became a state in 1896."],
    "Name one challenge that delayed Utah's statehood.",
    ["Congress opposed plural marriage.", "The church ended it in 1890, and statehood followed."],
    "national opposition to plural marriage",
  ),
  "social/ut-g7-utah-in-union": lesson(
    ["From 1896 to 1945, world events reached Utah: two world wars, the 1918 flu and the Great Depression.", "Miners organized unions and Progressive reformers pushed for safer work and limits on child labour.", "World War II brought bases and factories, and the unjust forced removal of Japanese Americans to Topaz."],
    "How did World War II change Utah's economy?",
    ["The war needed bases and supplies.", "Utah gained defense jobs and factories."],
    "it added defense jobs and factories",
  ),
  "social/ut-g7-utah-in-world": lesson(
    ["After 1945, the Cold War brought a uranium boom and nuclear test fallout to southern Utah.", "Tourism, skiing and the 2002 Olympics tied Utah's economy to the world.", "Growth raises questions about water, air and public land that local, state, Tribal and federal governments share."],
    "Why do Utah and the federal government often debate land use?",
    ["About two-thirds of Utah's land is federal.", "Both want a say in how it is used."],
    "the federal government manages much of Utah's land",
  ),
  "social/ut-g7-economy": lesson(
    ["When the price of a good rises, the quantity demanded usually falls.", "Inflation is when prices across the economy keep rising; unemployment is people who want jobs but can't find them.", "Utah's economy mixes mining, technology, tourism and farming, and trades with the world."],
    "Copper from Utah is sold to other countries. What is this an example of?",
    ["Selling goods across borders is trade.", "It is called exporting."],
    "trade (exports)",
  ),
  "social/ut-g7-timeline": lesson(
    ["Put events in order by their years: the smaller year came first.", "Key years: 1847 pioneers, 1857 Utah War, 1869 railroad, 1890 Manifesto, 1896 statehood.", "Then come 1900 Scofield, 1918 flu, 1942 Topaz, 1952 uranium and 2002 Olympics."],
    "Which came first: the Utah War or the Manifesto?",
    ["The Utah War began in 1857.", "The Manifesto was in 1890."],
    "the Utah War",
  ),
  "science/ca-g8-embryos": lesson(
    ["Embryos of different species can look alike early on, even when adults look very different.", "Shared features, like early tails and pharyngeal pouches, suggest common ancestry.", "Structures that develop the same way are stronger evidence than look-alike adult parts."],
    "A human embryo has a tail early on. What does it become in an adult?",
    ["It shrinks as the embryo grows.", "A small bone remains."],
    "the tailbone",
  ),
};
