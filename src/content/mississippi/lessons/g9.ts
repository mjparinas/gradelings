import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Mississippi's Grade 9 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson under its own id, and a unit borrowed from another grade carries the lesson it has
// there. Mississippi's own units have lessons written for them.
export const LESSONS: GradeLessons = {
  "math/ms-g9-absolute-value": lesson(
    [
      "|x − a| is the distance between x and a on the number line.",
      "|x − a| = b means x − a = b or x − a = −b, so there are two answers (none if b is negative).",
      "|x − a| < b means x is between a − b and a + b. |x − a| > b means x is outside them.",
    ],
    "Solve |x − 3| = 5.",
    [
      "x − 3 = 5, so x = 8.",
      "x − 3 = −5, so x = −2.",
    ],
    "x = −2 or x = 8",
  ),
  "science/cells-diffusion-ab": lesson(
    [
      "All living things are made of cells. Plant cells also have a cell wall and chloroplasts.",
      "Materials move into and out of cells through the cell membrane, from more crowded to less crowded areas.",
      "Cells form tissues, tissues form organs, organs form systems. Magnification = eyepiece × objective.",
    ],
    "A microscope has a 10× eyepiece and a 40× objective. What is the magnification?",
    [
      "Multiply the two lenses.",
      "10 × 40 = 400.",
    ],
    "400×",
  ),
  "science/ms-g9-ecosystems": lesson(
    [
      "A population levels off at carrying capacity on a logistic growth curve.",
      "About 10% of energy passes up each trophic level.",
      "After disturbances like wildfire, succession rebuilds the community; stable ecosystems recover.",
    ],
    "Shrubs sprout again after a wildfire. What is this an example of?",
    [
      "The community is rebuilding over time.",
      "Gradual change in a community is succession.",
    ],
    "succession",
  ),
  "social/co-g6-world-regions": lesson(
    [
      "World regions share features like climate, landforms and culture. Know which countries are in which region: India in Asia, New Zealand in Oceania.",
      "People adapt to climate, like warm clothing and insulated homes in the cold.",
      "The Ring of Fire around the Pacific has many volcanoes and earthquakes. Trade connects regions.",
    ],
    "The Amazon rainforest is mostly in which country?",
    [
      "The Amazon is in South America.",
      "Most of it lies in the largest South American country.",
    ],
    "Brazil",
  ),
  "social/ga-g7-economies": lesson(
    [
      "In a command economy the government decides what to make; in a market economy buyers and sellers do; a mixed economy blends both.",
      "Exports are sold to other countries; imports are bought from them. A tariff is a tax on imports.",
      "Comparative advantage: make what you can produce at the lowest opportunity cost, then trade.",
    ],
    "In a command economy, who makes the main decisions about production?",
    [
      "“Command” means orders from the top.",
      "The government gives those orders.",
    ],
    "the government",
  ),
  "social/ga-g7-population": lesson(
    [
      "Demography is the study of human populations. Population density is how many people live in an area.",
      "Cities often grow along rivers and coasts for water and trade.",
      "Push factors drive people away; pull factors draw them. Newcomers keep culture alive with language and festivals.",
    ],
    "Why do cities often grow along rivers and coasts?",
    [
      "People need water.",
      "Rivers and coasts are also routes for trade.",
    ],
    "They offer water and trade routes",
  ),
  "social/ms-g9-civil-rights": lesson(
    [
      "Mississippi was a centre of the Civil Rights Movement: Emmett Till, Medgar Evers, Fannie Lou Hamer, the Freedom Rides and Freedom Summer.",
      "Activists used nonviolent action and voter registration. Groups like the Citizens' Councils and the State Sovereignty Commission organized resistance.",
      "Federal laws and court rulings, such as the Voting Rights Act of 1965, changed who could vote and hold office.",
    ],
    "What was the main goal of Freedom Summer in 1964?",
    [
      "Very few Black Mississippians were allowed to register to vote.",
      "Volunteers came to help them register and to teach in Freedom Schools.",
    ],
    "to register Black voters",
  ),
  "social/ms-g9-foundations": lesson(
    [
      "Mississippi's land includes the river-built Delta, wind-blown loess bluffs, pine-covered hills and Gulf barrier islands.",
      "The Choctaw, Chickasaw and Natchez nations shaped the land long before Europeans; the Mississippi Band of Choctaw Indians governs itself today.",
      "France, Britain and Spain each ruled parts of Mississippi before the territory of 1798 and statehood in 1817.",
    ],
    "Why did removing the Choctaw and Chickasaw in the 1830s matter to Mississippi's economy?",
    [
      "Their lands were opened to settlers.",
      "Settlers turned the land into cotton plantations worked by enslaved people.",
    ],
    "it opened millions of acres to cotton farming",
  ),
  "social/ms-g9-modern": lesson(
    [
      "Agriculture and forestry are Mississippi's largest industries, alongside manufacturing, shipbuilding, tourism and space testing.",
      "The Legislature (52 senators, 122 representatives) makes state laws, the Governor carries them out and elected judges decide cases.",
      "Mississippi's writers, musicians and artists, and its many communities, shape the state and the world.",
    ],
    "How many members does the Mississippi House of Representatives have?",
    [
      "The Senate has 52 members.",
      "The larger house, the House of Representatives, has 122.",
    ],
    "122",
  ),
  "social/ms-g9-slavery-to-jim-crow": lesson(
    [
      "By 1860, enslaved people were more than half of Mississippi's population, and the plantation economy depended on them.",
      "After the Civil War, Reconstruction brought Black voting and officeholding, but violence and the 1890 constitution took those rights away.",
      "Sharecropping, the 1927 flood and the Great Migration shaped life in the Jim Crow era, and the New Deal and World War II brought new jobs.",
    ],
    "How did the 1890 constitution keep most Black Mississippians from voting without naming race?",
    [
      "The 15th Amendment banned denying the vote because of race.",
      "So the constitution used poll taxes and reading tests that officials applied unfairly.",
    ],
    "with poll taxes and literacy tests",
  ),
  "social/quality-of-life-8": lesson(
    [
      "Indicators measure quality of life: life expectancy, literacy rate, infant mortality, and access to clean water and health care.",
      "High literacy and long life expectancy usually mean higher quality of life; high infant mortality usually means lower.",
      "To estimate doubling time, divide 70 by the yearly growth rate.",
    ],
    "A population grows by 2% each year. About how many years will it take to double?",
    [
      "Doubling time ≈ 70 ÷ growth rate.",
      "70 ÷ 2 = 35.",
    ],
    "35",
  ),
  "social/tx-g6-economies": lesson(
    [
      "Factors of production: land (resources), labour (work people do) and capital (tools).",
      "Industries: agricultural (farming), manufacturing (factories), service.",
      "In free enterprise, private people own most businesses. GDP per capita is GDP divided by population.",
    ],
    "Is a car factory part of agriculture or manufacturing?",
    [
      "A factory makes goods from parts.",
      "Making goods is manufacturing.",
    ],
    "manufacturing",
  ),
};
