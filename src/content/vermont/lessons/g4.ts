import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Vermont's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Vermont examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/vt-g4-earth-hazards": lesson(
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
  "science/vt-g4-energy-resources": lesson(
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
  "science/vt-g4-rocks-erosion": lesson(
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
  "social/vt-g4-land": lesson(
    [
      "The Green Mountains run down the middle of Vermont, and Mount Mansfield is the highest peak.",
      "Lake Champlain lies on the border with New York. The Connecticut River forms the border with New Hampshire.",
      "Map tools help: the compass rose shows directions, the legend explains symbols, and the scale shows distance.",
      "Vermont is the only New England state without an ocean coast.",
    ],
    "Which big lake lies on Vermont's western border?",
    [
      "It is about 120 miles long.",
      "Burlington is on its shore.",
    ],
    "Lake Champlain",
  ),
  "social/vt-g4-first-peoples": lesson(
    [
      "The Abenaki have lived in what is now Vermont for thousands of years, and Abenaki people live here today.",
      "Many Abenaki families moved with the seasons to fish, hunt, plant corn, beans and squash, and gather food.",
      "Samuel de Champlain reached the lake named for him in 1609. The English built Fort Dummer near Brattleboro in 1724.",
      "Settlers and Native people traded, but settlement took Native land, and wars and disease brought great loss.",
    ],
    "Which people have lived in Vermont for thousands of years and live here today?",
    [
      "Many Vermont place names come from their language.",
      "Winooski is one of their words.",
    ],
    "the Abenaki",
  ),
  "social/vt-g4-working-vermont": lesson(
    [
      "In the early 1800s, Vermont farms raised huge flocks of sheep for wool. Later most farmers turned to dairy cows.",
      "Granite in Barre, marble in Proctor and slate near Poultney are quarried from Vermont's rock.",
      "Vermont makes more maple syrup than any other state, and tourism brings skiers and leaf watchers.",
      "Goods sold to other places are exports; goods brought in are imports.",
    ],
    "Vermont sells maple syrup to stores in other states. Is that an import or an export?",
    [
      "The syrup leaves Vermont.",
      "Goods that go out are exports.",
    ],
    "an export",
  ),
  "social/vt-g4-governing-vermont": lesson(
    [
      "Vermont's government meets in the State House in Montpelier.",
      "The General Assembly makes laws, the governor carries them out, and the courts decide what laws mean.",
      "The House has 150 members and the Senate has 30. The governor is elected every two years.",
      "On Town Meeting Day in March, voters in many towns decide on the town budget.",
    ],
    "Which part of Vermont's government makes the state's laws?",
    [
      "It has a Senate and a House of Representatives.",
      "Its members are elected by voters.",
    ],
    "the General Assembly",
  ),
  "social/vt-g4-timeline": lesson(
    [
      "A timeline puts events in order from earliest to latest.",
      "Earlier years are smaller numbers: 1609 comes before 1666.",
      "To find how many years apart two events are, subtract the earlier year from the later one.",
    ],
    "Vermont declared independence in 1777 and became a state in 1791. How many years apart are they?",
    [
      "1791 − 1777 = 14.",
    ],
    "14",
  ),
  "social/vt-g4-people": lesson(
    [
      "People from Vermont helped shape the state and the nation.",
      "Lemuel Haynes was the first African American ordained as a minister in the United States, and Alexander Twilight was the first to earn a college degree.",
      "Justin Morrill's laws started public land-grant colleges, and Calvin Coolidge became President.",
      "Madeleine Kunin became Vermont's first woman governor.",
    ],
    "Which President was born in Plymouth Notch, Vermont?",
    [
      "He was born on the Fourth of July.",
      "His father swore him in by lamplight in 1923.",
    ],
    "Calvin Coolidge",
  ),
  "social/vt-g4-green-mountain-state": lesson(
    [
      "New Hampshire and New York both claimed Vermont's land. Ethan Allen and the Green Mountain Boys defended the settlers' claims.",
      "In 1777 Vermont declared itself an independent republic and wrote a constitution in Windsor that banned the slavery of adults.",
      "Vermont joined the United States in 1791 as the 14th state.",
      "State symbols include the hermit thrush, red clover, the sugar maple, the Morgan horse and the motto \"Freedom and Unity.\"",
    ],
    "In 1791, Vermont became which number state?",
    [
      "The first 13 states were the original colonies.",
      "Vermont was the first state to join after them.",
    ],
    "the 14th",
  ),
};
