import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Rhode Island's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Rhode Island examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/ri-g4-earth-hazards": lesson(
    [
      "Maps show patterns: many mountains, volcanoes and earthquakes are along the edges of Earth's plates.",
      "People cannot stop natural hazards, but they can reduce the harm they do.",
      "Along the coast, hurricanes and nor'easters push storm surges onto land, so towns build seawalls, raise houses and plan evacuation routes.",
    ],
    "A hurricane is coming toward the Rhode Island coast. What helps keep people safe?",
    [
      "Forecasters warn people days ahead.",
      "Families near the shore move to higher ground.",
    ],
    "warnings and moving away from the shore",
  ),
  "science/ri-g4-energy-resources": lesson(
    [
      "Renewable resources, like sunlight, wind and moving water, won't run out.",
      "Oil, natural gas and coal are fossil fuels. They will run out, and burning them pollutes the air.",
      "The Block Island Wind Farm, the first offshore wind farm in the United States, makes electricity from ocean wind.",
      "Every energy choice has good points and costs for the environment.",
    ],
    "Is wind a renewable or a nonrenewable resource?",
    [
      "The wind keeps blowing day after day.",
      "It will not run out.",
    ],
    "renewable",
  ),
  "science/ri-g4-rocks-erosion": lesson(
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
  "social/ri-g4-land": lesson(
    [
      "Rhode Island is the smallest state, but it has about 400 miles of coastline.",
      "Narragansett Bay reaches deep into the state, with islands such as Aquidneck, Conanicut and Prudence. Block Island is out in the ocean.",
      "Rivers like the Blackstone run to the bay. Rhode Island has 39 cities and towns, and Providence is the capital.",
    ],
    "Which big bay reaches into the middle of Rhode Island?",
    [
      "It is named for the Narragansett people.",
      "Newport and Providence are on it.",
    ],
    "Narragansett Bay",
  ),
  "social/ri-g4-first-peoples": lesson(
    [
      "The Narragansett, Wampanoag, Niantic and Nipmuc peoples lived on this land long before the colonists came, and still do.",
      "They fished the bay, grew corn, beans and squash, and used wampum beads made from shells.",
      "The Narragansett Indian Tribe has its own government today, led by a chief sachem and a tribal council.",
    ],
    "What were wampum beads made from?",
    [
      "They came from the shore of the bay.",
      "Purple and white beads were made from shells, such as quahog shells.",
    ],
    "shells",
  ),
  "social/ri-g4-founding": lesson(
    [
      "Roger Williams was banished from Massachusetts Bay for his ideas about religion and fair dealing for Native lands.",
      "In 1636 he founded Providence on land from Narragansett leaders. Anne Hutchinson and others founded Portsmouth.",
      "The royal charter of 1663 promised freedom of religion, so people of many faiths came, and Newport's Touro Synagogue is the oldest in the country.",
    ],
    "Why was Roger Williams sent away from Massachusetts Bay?",
    [
      "He said the government should not tell people how to worship.",
      "Leaders there did not agree, so they banished him.",
    ],
    "for his ideas about religion",
  ),
  "social/ri-g4-colony-and-sea": lesson(
    [
      "Most colonists farmed, and towns had crafts like barrel making and silversmithing.",
      "Newport was a busy harbor. Ships traded with the West Indies and carried goods around the Atlantic.",
      "Rhode Island merchants carried many enslaved Africans in the slave trade. Enslaved and free Africans built families and the Free African Union Society.",
    ],
    "Which Rhode Island town had the busiest harbor in colonial times?",
    [
      "It sits near the mouth of Narragansett Bay.",
      "Its merchants traded across the Atlantic.",
    ],
    "Newport",
  ),
  "social/ri-g4-revolution": lesson(
    [
      "In 1772 Rhode Islanders burned the Gaspee, a British ship that enforced trade taxes.",
      "On May 4, 1776, Rhode Island was the first colony to break with King George III.",
      "Nathanael Greene was a top general, and the 1st Rhode Island Regiment fought at the Battle of Rhode Island in 1778.",
      "Rhode Island was the last state to approve the Constitution, in 1790.",
    ],
    "Rhode Island broke with the king in May 1776. The Declaration of Independence was signed two months later. Which month was that?",
    [
      "Count two months after May: June, then July.",
    ],
    "July",
  ),
  "social/ri-g4-mills-and-peoples": lesson(
    [
      "In 1793 Samuel Slater's mill in Pawtucket used the Blackstone River's power to spin cotton thread.",
      "Mill villages grew, and many children worked long hours in the mills.",
      "Irish, French Canadian, Italian, Portuguese, Cape Verdean and later Latino and Southeast Asian families came for work and made Rhode Island home.",
    ],
    "What powered the machines in the first mills?",
    [
      "The mills were built beside rivers.",
      "Moving water turned big wheels.",
    ],
    "water from the rivers",
  ),
  "social/ri-g4-governing": lesson(
    [
      "The General Assembly makes the state's laws at the State House in Providence.",
      "The governor carries out the laws, and the courts decide what they mean.",
      "Cities and towns have councils and mayors that run local services like parks and libraries.",
    ],
    "Which branch of Rhode Island's government makes the state's laws?",
    [
      "The General Assembly has a Senate and a House of Representatives.",
      "Lawmakers belong to the legislative branch.",
    ],
    "the legislative branch (the General Assembly)",
  ),
  "social/ri-g4-timeline": lesson(
    [
      "A timeline puts events in order from earliest to latest.",
      "Smaller years come first: 1636 comes before 1776.",
      "To find how far apart two events are, subtract the earlier year from the later one.",
    ],
    "Providence was founded in 1636 and Rhode Island broke with the king in 1776. How many years apart are they?",
    [
      "1776 − 1636 = 140.",
    ],
    "140 years",
  ),
};
