import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Washington, DC's Grade 3 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with DC examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/dc-g3-fossils": lesson(
    [
      "Fossils are remains or traces of living things from long ago.",
      "Mud covering a leaf can harden into a leaf print in rock.",
      "In rock layers, older fossils are usually lower down.",
    ],
    "In rock layers, are older fossils usually higher or lower?",
    [
      "Layers pile up over time.",
      "The first layers are at the bottom.",
    ],
    "lower down",
  ),
  "science/dc-g3-weather-climate": lesson(
    [
      "Weather is what the air is like today. Climate is the usual weather over many years.",
      "Read temperature and rain data for each season.",
      "Mountains get the most snow in winter.",
    ],
    "Highs of 30 °F, 28 °F and 32 °F. Which season is it?",
    [
      "Those are cold temperatures.",
    ],
    "winter",
  ),
  "social/dc-g3-our-district": lesson(
    [
      "Washington, DC sits where the Anacostia meets the Potomac, between Maryland and Virginia.",
      "The city has four quadrants that meet at the Capitol: NW, NE, SE and SW.",
      "It has 8 wards and about 700,000 people, but less land than any state.",
      "Most north-south streets have numbers, and most east-west streets have letters.",
    ],
    "An address ends in SE. Which quadrant is it in?",
    [
      "SE stands for a direction.",
      "S is south and E is east.",
    ],
    "Southeast",
  ),
  "social/dc-g3-first-peoples": lesson(
    [
      "The Nacotchtank lived along the Anacostia River, which is named after them.",
      "Piscataway and Pamunkey people have lived in this region for thousands of years, and their communities live here today.",
      "English colonists came in the 1600s and took land for farms, forcing many Native people to leave.",
      "Colonists' writings tell only their side, so Native people's own histories matter.",
    ],
    "Which river takes its name from the Nacotchtank people?",
    [
      "English settlers wrote the name as Anacostan.",
      "It flows into the Potomac.",
    ],
    "the Anacostia River",
  ),
  "social/dc-g3-building-the-capital": lesson(
    [
      "In 1790, Congress chose a site on the Potomac for the capital, and George Washington picked the spot.",
      "Pierre L'Enfant drew the city plan, and Benjamin Banneker helped survey its borders.",
      "Enslaved people did much of the work building the Capitol and the White House.",
      "The government moved here in 1800, and British troops burned the city in 1814.",
    ],
    "Why was the capital put in a district, not inside a state?",
    [
      "The capital belongs to the whole nation.",
      "Leaders didn't want one state to control it.",
    ],
    "so no single state would control it",
  ),
  "social/dc-g3-freedom-and-civil-war": lesson(
    [
      "In the 1800s, DC had enslaved people and a growing free Black community with schools and churches.",
      "Some people escaped, like the 77 who tried to sail away on the Pearl in 1848.",
      "On April 16, 1862, enslaved people in DC were freed. DC celebrates it as Emancipation Day.",
      "During the Civil War, forts ringed the city, and many people escaping slavery came here.",
    ],
    "What does DC celebrate on April 16?",
    [
      "In 1862, Lincoln signed a law freeing enslaved people in DC.",
      "It came before the Emancipation Proclamation.",
    ],
    "Emancipation Day",
  ),
  "social/dc-g3-city-culture": lesson(
    [
      "In the 1920s, U Street was called Black Broadway, and Duke Ellington grew up in DC.",
      "People march in DC to be heard, like the 1913 suffrage march and the 1963 March on Washington.",
      "Go-go music began in DC, and Chuck Brown is its godfather.",
      "Families from Latin America, Asia and East Africa make DC home.",
    ],
    "Which kind of music began in Washington, DC?",
    [
      "It has drums that keep the beat going between songs.",
      "It is the District's official music.",
    ],
    "go-go",
  ),
  "social/dc-g3-governing-dc": lesson(
    [
      "DC elects a mayor and a 13-member Council, thanks to the Home Rule Act of 1973.",
      "DC has a delegate in the House who can't vote on final bills, and no senators.",
      "Congress can review DC's laws and budget, because DC is a federal district, not a state.",
      "Many Washingtonians want DC to become a state; Congress has not passed it.",
    ],
    "How many US senators does DC have?",
    [
      "Each state has 2 senators.",
      "DC is not a state.",
    ],
    "0",
  ),
  "social/dc-g3-dc-timeline": lesson(
    [
      "A timeline puts events in order from earliest to latest.",
      "Find each event's year, then sort the years from smallest to biggest.",
      "DC's story runs from John Smith on the Potomac (1608) to the capital (1790), Emancipation Day (1862) and Home Rule (1973).",
    ],
    "Which came first: Home Rule (1973) or the March on Washington (1963)?",
    [
      "Compare the years: 1963 and 1973.",
      "1963 is the smaller number.",
    ],
    "the March on Washington",
  ),
};
