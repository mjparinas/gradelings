import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Utah's Grade 4 units that the shared lesson files don't cover: Utah's own units, Utah copies of
// other states' units (the original's lesson with Utah examples), and units Utah teaches in a different grade from the
// original (the lesson they have there).
export const LESSONS: GradeLessons = {
  "science/ut-g4-fossils": lesson(
    ["Fossils are remains or traces of living things from long ago.", "Most are found in sedimentary rock. Utah has many dinosaur fossils, like the Allosaurus.", "Fossils tell about past places: sea fossils in Utah's dry mountains mean a sea once covered them."],
    "Trilobite fossils are found in a Utah mountain. What does that tell us?",
    ["Trilobites were sea animals."],
    "the land was once covered by sea",
  ),
  "science/ut-g4-rock-layers": lesson(
    ["Weathering breaks rock. Erosion moves it. Deposition drops it in a new place.", "Water, wind and ice all cause erosion. Wind shapes Utah's sand dunes.", "In rock layers, like the stripes in Utah's canyon walls, the oldest layer is usually at the bottom."],
    "A canyon wall has five rock layers. Which is probably the oldest?",
    ["Layers pile up one on top of another.", "The first one laid down is at the bottom."],
    "the bottom layer",
  ),
  "science/ut-g4-sun-stars": lesson(
    ["The sun looks bright because it is the closest star to Earth.", "Earth spins once a day, so the sun rises in the east and sets in the west.", "Shadows point away from the sun: west in the morning, shortest around noon.", "Days in Utah are longest in June and shortest in December."],
    "In the evening the sun is in the west. Which way does your shadow point?",
    ["Shadows point away from the sun.", "Away from west is east."],
    "east",
  ),
  "social/ut-g4-utah-land": lesson(
    ["Utah has three regions: the Rocky Mountains, the Basin and Range, and the Colorado Plateau.", "The Great Salt Lake has no outlet, so it is salty. It is left from ancient Lake Bonneville.", "Most Utahns live along the Wasatch Front, where mountain streams bring water."],
    "Which region has Utah's red rock canyons and arches?",
    ["Arches and Canyonlands are in southern and eastern Utah.", "That land is a high, rocky plateau."],
    "the Colorado Plateau",
  ),
  "social/ut-g4-first-peoples": lesson(
    ["People have lived in Utah for thousands of years. Artifacts and rock art tell us about them.", "The Fremont and Ancestral Puebloan peoples farmed corn, beans and squash.", "Today Utah has eight federally recognized Tribes, including Ute, Goshute, Paiute, Shoshone and Navajo nations.", "Tribes are sovereign: they have their own governments and laws."],
    "What does it mean that a Tribe is sovereign?",
    ["Sovereign means self-governing.", "The Tribe has its own government and laws."],
    "it governs itself",
  ),
  "social/ut-g4-explorers": lesson(
    ["In 1776, Domínguez and Escalante explored Utah looking for a route to California.", "In the 1820s, mountain men trapped beaver and traded at yearly rendezvous.", "Journals are primary sources. People who were there may describe events differently."],
    "Why did mountain men come to Utah?",
    ["Beaver fur was used to make fashionable hats.", "Trappers came to catch and sell beaver."],
    "to trap beaver for fur",
  ),
  "social/ut-g4-pioneers": lesson(
    ["In 1847, Mormon pioneers led by Brigham Young arrived in the Salt Lake Valley.", "They came to live and worship freely, by wagon and handcart.", "They dug ditches to irrigate crops and started towns across Utah.", "Settlers moving onto Native peoples' lands led to conflicts over land and food."],
    "Why did pioneers build towns near canyon mouths?",
    ["Utah's valleys are dry.", "Streams flow out of the canyons."],
    "for water to irrigate their crops",
  ),
  "social/ut-g4-railroad-statehood": lesson(
    ["The transcontinental railroad was finished at Promontory Summit on May 10, 1869.", "It linked the coasts and brought new people, goods and businesses to Utah.", "Utah women voted from 1870, and Martha Hughes Cannon became the first woman state senator.", "Utah became the 45th state on January 4, 1896."],
    "Where was the golden spike driven in 1869?",
    ["The Union Pacific and Central Pacific met north of the Great Salt Lake."],
    "Promontory Summit",
  ),
  "social/ut-g4-government": lesson(
    ["Utah's government has three branches: the Legislature makes laws, the governor carries them out and the courts decide cases.", "Local, state, Tribal and federal governments each have their own jobs.", "Utah's symbols include the beehive, the motto “Industry”, the California gull and the sego lily."],
    "Which branch of Utah's government makes laws?",
    ["Legislate means to make laws."],
    "the Legislature",
  ),
  "social/ut-g4-modern-utah": lesson(
    ["In the 1900s, mining, two world wars and new dams changed Utah.", "Utah hosted the Winter Olympics in 2002, and tourism and technology grew.", "Utah's fast-growing population needs more water, homes and roads, so using water well matters."],
    "Why does a fast-growing Utah need to save water?",
    ["More people use more water.", "Much of Utah gets little rain."],
    "there is more demand for scarce water",
  ),
  "social/ut-g4-timeline": lesson(
    ["Put events in order by their years: the smaller year came first.", "Key years: 1776 Domínguez and Escalante, 1847 pioneers, 1869 golden spike, 1896 statehood.", "Then come the 1900s: mines, world wars, dams and the 2002 Olympics."],
    "Which came first: statehood or the golden spike?",
    ["The golden spike was 1869.", "Statehood was 1896."],
    "the golden spike",
  ),
};
