import { lesson, type GradeLessons } from "../../lessons";

// Lessons for New Hampshire's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with New Hampshire examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/nh-g4-earth-hazards": lesson(
    [
      "Maps show patterns: many mountains, volcanoes and earthquakes are along the edges of Earth's plates.",
      "People cannot stop natural hazards, but they can reduce the harm they do.",
      "Warning systems, strong buildings and safe plans help during storms, floods and earthquakes.",
    ],
    "The ground starts shaking at school. What helps keep people safe?",
    [
      "Stay inside and away from windows.",
      "Get under a sturdy desk and hold on.",
    ],
    "drop, cover and hold on",
  ),
  "science/nh-g4-energy-resources": lesson(
    [
      "Renewable resources, like sunlight, wind and moving water, won't run out.",
      "Solar farms use sunlight. Geothermal plants use heat from inside Earth.",
      "Dams make electricity from moving water but can block fish like salmon.",
      "Every energy choice has good points and costs for the environment.",
    ],
    "A geothermal power plant makes electricity from what?",
    [
      "“Geo” means Earth and “thermal” means heat.",
    ],
    "heat from inside Earth",
  ),
  "science/nh-g4-rocks-erosion": lesson(
    [
      "Weathering breaks rock. Erosion moves it. Running water moves the most.",
      "Glaciers scrape and carry rock. Roots growing in cracks can split rock.",
      "Over a very long time, erosion can carve deep canyons.",
      "Plants and their roots slow erosion on a hillside.",
    ],
    "Which hillside erodes faster in heavy rain: a bare one or a grassy one?",
    [
      "Roots hold soil in place.",
      "A bare hill has nothing to hold the soil.",
    ],
    "the bare hillside",
  ),
  "social/nh-g4-land": lesson(
    [
      "New Hampshire has mountains in the north, hills and river valleys in the middle and south, and a short coast on the Atlantic Ocean.",
      "The Connecticut River forms the border with Vermont, and the Merrimack River flows south through Concord, Manchester and Nashua.",
      "Map tools help: the compass rose shows directions, the legend explains symbols, and the scale shows distance.",
      "Mount Washington, in the White Mountains, is the tallest peak in the Northeast.",
    ],
    "Which river forms New Hampshire's border with Vermont?",
    [
      "It is on the western side of the state.",
      "It is the longest river in New England.",
    ],
    "the Connecticut River",
  ),
  "social/nh-g4-first-peoples": lesson(
    [
      "Abenaki and Pennacook people lived in what is now New Hampshire long before Europeans came, and Abenaki communities live in New England today.",
      "Many Abenaki families moved with the seasons to fish, hunt, plant corn, beans and squash, and gather food.",
      "English settlers started fishing and trading posts near the Piscataqua River in 1623.",
      "Settlers and Native people traded, but settlement took Native land, and wars and disease brought great loss.",
    ],
    "Where did English settlers start New Hampshire's first settlements in 1623?",
    [
      "It is on the Seacoast.",
      "The river runs past Portsmouth to the ocean.",
    ],
    "near the Piscataqua River",
  ),
  "social/nh-g4-working-new-hampshire": lesson(
    [
      "Rivers powered mills that made cloth and shoes in Manchester, Nashua and other towns.",
      "Granite quarries, forests, dairy farms, apples and maple syrup are part of New Hampshire's economy.",
      "Today many people work in health care, manufacturing, technology and tourism.",
      "Goods sold to other places are exports; goods brought in are imports.",
    ],
    "New Hampshire sells maple syrup to stores in other states. Is that an import or an export?",
    [
      "The syrup leaves New Hampshire.",
      "Goods that go out are exports.",
    ],
    "an export",
  ),
  "social/nh-g4-governing-new-hampshire": lesson(
    [
      "New Hampshire's government meets in the State House in Concord.",
      "The General Court makes laws, the governor carries them out, and the courts decide what laws mean.",
      "The House of Representatives has 400 members, one of the largest in the world.",
      "In many towns, voters decide on the town budget at town meeting.",
    ],
    "Which part of New Hampshire's government makes the state's laws?",
    [
      "It has a Senate and a House of Representatives.",
      "Its members are elected by voters.",
    ],
    "the General Court",
  ),
  "social/nh-g4-timeline": lesson(
    [
      "A timeline puts events in order from earliest to latest.",
      "Earlier years are smaller numbers: 1623 comes before 1679.",
      "To find how many years apart two events are, subtract the earlier year from the later one.",
    ],
    "New Hampshire approved the Constitution in 1788, and the State House was finished in 1819. How many years apart are they?",
    [
      "1819 − 1788 = 31.",
    ],
    "31",
  ),
  "social/nh-g4-granite-state": lesson(
    [
      "New Hampshire became a colony separate from Massachusetts in 1679.",
      "In 1776 it set up its own government, and in 1788 it became the ninth state to approve the US Constitution, which let the Constitution take effect.",
      "Concord became the capital, and the State House was finished in 1819.",
      "State symbols include the purple finch, the white birch, the purple lilac and the motto \"Live Free or Die.\"",
    ],
    "Why was New Hampshire's vote in 1788 so important?",
    [
      "Nine of the thirteen states had to approve the Constitution.",
      "New Hampshire was the ninth.",
    ],
    "it let the Constitution take effect",
  ),
  "social/nh-g4-people": lesson(
    [
      "People from New Hampshire helped shape the state and the nation.",
      "John Stark led soldiers in the Revolution, and Daniel Webster spoke for keeping the country together.",
      "Franklin Pierce became President, and Alan Shepard became the first American in space.",
      "Christa McAuliffe, a teacher from Concord, was chosen to teach lessons from space.",
    ],
    "Which President came from New Hampshire?",
    [
      "He was the 14th President.",
      "He grew up in Hillsborough.",
    ],
    "Franklin Pierce",
  ),
};
