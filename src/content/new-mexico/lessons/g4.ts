import { lesson, type GradeLessons } from "../../lessons";

// Lessons for New Mexico's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with New Mexico examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/nm-g4-earth-hazards": lesson(
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
  "science/nm-g4-energy-resources": lesson(
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
  "science/nm-g4-rocks-erosion": lesson(
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
  "social/nm-g4-land": lesson(
    [
      "New Mexico has four provinces: Great Plains (east), Rocky Mountains (north), Colorado Plateau (northwest), and Basin and Range (south and west).",
      "The Rio Grande runs north to south through the middle of the state.",
      "Map tools help: the compass rose shows directions, the legend explains symbols, and the scale shows distance.",
      "Most New Mexicans live near rivers, where there is water for homes and farms.",
    ],
    "Which province has flat, grassy plains and cattle ranches?",
    [
      "It is in the eastern part of the state.",
      "The same plains stretch across the middle of the country.",
    ],
    "the Great Plains",
  ),
  "social/nm-g4-first-peoples": lesson(
    [
      "New Mexico is home to 19 Pueblos, the Navajo Nation and Apache nations. Each has its own government.",
      "Pueblo farmers grow corn, beans and squash and build with adobe.",
      "In 1598, Spanish settlers came on El Camino Real and brought sheep, horses, cattle and wheat.",
      "Settlers and Pueblo people learned from each other, but Spanish rule was harsh, and in 1680 the Pueblos rose up in the Pueblo Revolt.",
    ],
    "Spanish settlers dug ditches to bring river water to their fields. What are these ditches called?",
    [
      "Many of them are still used today.",
      "Their name comes from an Arabic word, through Spanish.",
    ],
    "acequias",
  ),
  "social/nm-g4-land-of-enchantment": lesson(
    [
      "New Mexico was a colony of Spain from 1598, part of Mexico from 1821, and part of the United States from 1848.",
      "It was a US territory from 1850, and its borders changed as Arizona became its own territory.",
      "New Mexico became the 47th state on January 6, 1912.",
      "State symbols include the Zia sun flag, the roadrunner, the yucca and the state question, \"Red or Green?\"",
    ],
    "Where does the sun symbol on New Mexico's flag come from?",
    [
      "It is a symbol of one of New Mexico's Pueblos.",
      "The Pueblo is near Bernalillo.",
    ],
    "Zia Pueblo",
  ),
  "social/nm-g4-working-new-mexico": lesson(
    [
      "Natural resources like oil, natural gas, potash, copper, sun and wind help New Mexico's economy.",
      "Taxes on oil and gas help pay for New Mexico's schools.",
      "Industries include farming chile and pecans, science labs, film, tourism and space.",
      "Goods sold to other places are exports; goods brought in are imports. Mexico is New Mexico's biggest trading partner.",
    ],
    "New Mexico sends green chile to stores in other states. Is that an import or an export?",
    [
      "The chile leaves New Mexico.",
      "Goods that go out are exports.",
    ],
    "an export",
  ),
  "social/nm-g4-fairness": lesson(
    [
      "Some New Mexicans were treated unfairly because of their race, language or culture.",
      "Miguel Trujillo of Isleta Pueblo went to court and won Native Americans the right to vote in New Mexico in 1948.",
      "Dennis Chávez, Nina Otero-Warren and Dolores Huerta worked for fairness and equal rights.",
      "People living at the same time can see events differently because their lives are different.",
    ],
    "How did Miguel Trujillo win the right to vote for Native Americans in New Mexico?",
    [
      "He did not use violence.",
      "He asked judges to decide.",
    ],
    "he went to court",
  ),
  "social/nm-g4-governing-new-mexico": lesson(
    [
      "New Mexico's government meets in the Roundhouse in Santa Fe.",
      "The Legislature makes laws, the governor carries them out, and the courts decide what laws mean.",
      "New Mexico has 33 counties, and Pueblos and Native nations have their own sovereign governments.",
      "Laws like seat belt rules and fire bans keep people safe.",
    ],
    "Which branch of New Mexico's government makes the state's laws?",
    [
      "It has a Senate and a House of Representatives.",
      "Its members are elected by voters.",
    ],
    "the Legislature",
  ),
  "social/nm-g4-timeline": lesson(
    [
      "A timeline puts events in order from earliest to latest.",
      "Earlier years are smaller numbers: 1598 comes before 1680.",
      "To find how many years apart two events are, subtract the earlier year from the later one.",
    ],
    "Santa Fe was founded in 1610 and the Pueblo Revolt was in 1680. How many years apart are they?",
    [
      "1680 − 1610 = 70.",
    ],
    "70",
  ),
};
