import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Delaware's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Delaware examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/de-g4-earth-hazards": lesson(
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
  "science/de-g4-energy-resources": lesson(
    [
      "Renewable resources, like sunlight, wind and moving water, won't run out.",
      "Solar farms use sunlight, and wind turbines like the one in Lewes use moving air.",
      "Fossil fuels such as natural gas are nonrenewable: once burned, they are gone.",
      "Every energy choice has good points and costs for the environment.",
    ],
    "A solar farm near Dover makes electricity from what?",
    [
      "“Solar” means of the sun.",
    ],
    "sunlight",
  ),
  "science/de-g4-rocks-erosion": lesson(
    [
      "Weathering breaks rock. Erosion moves it. Running water and waves move the most.",
      "Waves and storms carry sand along Delaware's beaches. Roots growing in cracks can split rock.",
      "Over a very long time, erosion can carve deep canyons.",
      "Plants and their roots slow erosion on a hillside or a sand dune.",
    ],
    "Which hillside erodes faster in heavy rain: a bare one or a grassy one?",
    [
      "Roots hold soil in place.",
      "A bare hill has nothing to hold the soil.",
    ],
    "the bare hillside",
  ),
  "social/de-g4-land": lesson(
    [
      "Delaware is on the Delmarva Peninsula, with Pennsylvania to the north, Maryland to the west and south, and New Jersey across Delaware Bay.",
      "Most of the state is the flat Atlantic Coastal Plain. The rolling Piedmont is in the far north, where the Brandywine Creek runs.",
      "Map tools help: the compass rose shows directions, the legend explains symbols, and the scale shows distance.",
      "Delaware's curved northern border, the Twelve-Mile Circle, is drawn around the old town of New Castle.",
    ],
    "Which state borders Delaware to the north?",
    [
      "Its border with Delaware is a curved line.",
      "Philadelphia is in that state.",
    ],
    "Pennsylvania",
  ),
  "social/de-g4-first-peoples": lesson(
    [
      "The Lenape and Nanticoke peoples have lived in what is now Delaware for thousands of years, and their communities live in Delaware today.",
      "Many Lenape and Nanticoke families fished, gathered oysters and clams, hunted deer, and grew corn, beans and squash.",
      "Henry Hudson sailed into Delaware Bay in 1609, the Dutch built Zwaanendael at Lewes in 1631, and Swedish and Finnish settlers built Fort Christina in 1638.",
      "Settlers and Native people traded, but settlement took Native land, and many Lenape families were pushed to move west.",
    ],
    "Where did Swedish and Finnish settlers build Fort Christina in 1638?",
    [
      "They arrived on the ship Kalmar Nyckel.",
      "The fort was where a big city stands today.",
    ],
    "where Wilmington is today",
  ),
  "social/de-g4-working-delaware": lesson(
    [
      "The fast water of the Brandywine Creek powered mills, and in 1802 E. I. du Pont built gunpowder mills there.",
      "DuPont grew into a chemical company whose scientists invented nylon near Wilmington.",
      "Peaches, lima beans and chickens made Delaware's farms famous. Cecile Steele started the chicken business in Sussex County in 1923.",
      "Goods sold to other places are exports; goods brought in are imports.",
    ],
    "Delaware chicken farms sell chickens to stores in other states. Is that an import or an export?",
    [
      "The chickens leave Delaware.",
      "Goods that go out are exports.",
    ],
    "an export",
  ),
  "social/de-g4-governing-delaware": lesson(
    [
      "Delaware's lawmakers meet at Legislative Hall in Dover, the capital.",
      "The General Assembly makes laws, the governor carries them out, and the courts decide what laws mean.",
      "The General Assembly has a House of 41 members and a Senate of 21 members.",
      "Two days after each election, Sussex County holds Return Day in Georgetown, where winners and losers ride together.",
    ],
    "Which part of Delaware's government makes the state's laws?",
    [
      "It has a Senate and a House of Representatives.",
      "Its members are elected by voters.",
    ],
    "the General Assembly",
  ),
  "social/de-g4-timeline": lesson(
    [
      "A timeline puts events in order from earliest to latest.",
      "Earlier years are smaller numbers: 1631 comes before 1638.",
      "To find how many years apart two events are, subtract the earlier year from the later one.",
    ],
    "Fort Christina was built in 1638, and Delaware became a state in 1787. How many years apart are they?",
    [
      "1787 − 1638 = 149.",
    ],
    "149",
  ),
  "social/de-g4-first-state": lesson(
    [
      "On June 15, 1776, Delaware voted to separate from Britain and from Pennsylvania. Delawareans call it Separation Day.",
      "Caesar Rodney rode all night to Philadelphia to vote for independence, and the capital moved from New Castle to Dover in 1777.",
      "On December 7, 1787, Delaware became the first state to approve the US Constitution, so it is called the First State.",
      "State symbols include the Blue Hen chicken, the peach blossom, the American holly and the colours colonial blue and buff.",
    ],
    "Why is Delaware called the First State?",
    [
      "Each state voted on the new US Constitution.",
      "Delaware voted yes on December 7, 1787, before any other state.",
    ],
    "it was the first state to approve the Constitution",
  ),
  "social/de-g4-people": lesson(
    [
      "People from Delaware helped shape the state and the nation.",
      "Caesar Rodney rode to vote for independence, and John Dickinson wrote about the colonists' rights.",
      "Richard Allen and Absalom Jones, both born enslaved in Delaware, founded churches. Thomas Garrett and Samuel Burris helped people escape slavery.",
      "Louis Redding won a case that opened schools to Black children, and Joe Biden became the 46th President.",
    ],
    "Who rode all night in 1776 to vote for independence?",
    [
      "He rode from Dover to Philadelphia.",
      "His vote broke a tie in Delaware's group.",
    ],
    "Caesar Rodney",
  ),
};
