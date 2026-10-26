import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Nebraska's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Nebraska examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/neb-g4-earth-hazards": lesson(
    [
      "Maps show patterns: many mountains, volcanoes and earthquakes are along the edges of Earth's plates.",
      "People cannot stop natural hazards, but they can reduce the harm they do.",
      "Warning sirens, storm shelters, levees and safe plans help during tornadoes and floods.",
    ],
    "The tornado sirens sound at school. Where should you go?",
    [
      "Get away from windows.",
      "Go low, to a basement or an inside room.",
    ],
    "a basement or an inside room",
  ),
  "science/neb-g4-energy-resources": lesson(
    [
      "Renewable resources, like sunlight, wind and moving water, won't run out.",
      "Fossil fuels, like coal, oil and natural gas, formed long ago and will run out.",
      "Nebraska makes much of its electricity from wind turbines on the plains and from dams on its rivers.",
      "Every energy choice has good points and costs for the environment.",
    ],
    "Is the wind that turns a turbine renewable or nonrenewable?",
    [
      "The sun keeps heating the air, so the wind keeps blowing.",
      "A resource that won't run out is renewable.",
    ],
    "renewable",
  ),
  "science/neb-g4-rocks-erosion": lesson(
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
  "social/neb-g4-nebraska-land": lesson(
    [
      "Nebraska is in the middle of the country, on the Great Plains. The land rises slowly from east to west.",
      "The Sandhills are grass-covered sand dunes, good for cattle ranches. The Platte River crosses the state, and the Missouri River is its eastern border.",
      "The east gets more rain and has most of the people, around Omaha and Lincoln. The west is drier, and farmers there water crops from the Ogallala Aquifer.",
    ],
    "Why are there big cattle ranches in the Sandhills?",
    [
      "Sandy soil is hard to farm for crops.",
      "But grass grows well, and cattle eat grass.",
    ],
    "the grass is good for grazing",
  ),
  "social/neb-g4-first-peoples": lesson(
    [
      "The Pawnee, Otoe, Omaha, Ponca, Lakota and other nations lived here long before Nebraska was a state. Its name comes from an Otoe word for flat water.",
      "Treaties took most of their land. In 1877 the Ponca were forced south; in 1879 Standing Bear's court case ruled that a Native American is a person in law.",
      "Today the Omaha, Ponca, Santee Sioux and Winnebago Tribes have their headquarters in Nebraska and govern themselves.",
    ],
    "What does the Otoe word that gave Nebraska its name mean?",
    [
      "It describes the Platte River.",
      "The Platte is wide, shallow and flat.",
    ],
    "flat water",
  ),
  "social/neb-g4-trails-statehood": lesson(
    [
      "The Oregon, California and Mormon Trails and the Pony Express followed the Platte River, past landmarks like Chimney Rock.",
      "The Kansas–Nebraska Act made Nebraska a territory in 1854. The Homestead Act of 1862 gave settlers free land to farm.",
      "Nebraska became the 37th state on March 1, 1867, and the capital moved to Lincoln. Its motto is Equality Before the Law.",
    ],
    "Which came first, Nebraska Territory or the state of Nebraska?",
    [
      "A territory is organized first, before it can become a state.",
      "The territory began in 1854 and the state in 1867.",
    ],
    "Nebraska Territory",
  ),
  "social/neb-g4-nebraska-grows": lesson(
    [
      "Homesteaders built sod houses and faced grasshoppers, drought and blizzards. Railroads brought settlers and carried crops to market.",
      "Today Nebraska grows corn and soybeans, raises beef cattle, makes ethanol and gets all its electricity from public power.",
      "Natural resources come from nature, human resources are people's skills, and capital resources are tools. Producers make goods and consumers buy them.",
    ],
    "A rancher uses a tractor to feed cattle. What kind of resource is the tractor?",
    [
      "It isn't from nature and it isn't a person.",
      "A tool used to make goods is a capital resource.",
    ],
    "a capital resource",
  ),
  "social/neb-g4-fairness": lesson(
    [
      "Standing Bear went to court in Omaha in 1879 and won the right to be treated as a person under the law.",
      "Clara Bewick Colby worked for women's right to vote, and Mildred Brown's Omaha Star spoke out against unfair treatment of Black Nebraskans.",
      "Citizens change unfair rules peacefully: by voting, going to court, writing letters, signing petitions and boycotting.",
    ],
    "Which is a peaceful way to change a law you think is unfair?",
    [
      "Breaking things hurts people and doesn't change laws.",
      "Writing to your state senator or signing a petition lets your voice be heard.",
    ],
    "write to your state senator or sign a petition",
  ),
  "social/neb-g4-unicameral": lesson(
    [
      "Nebraska's government meets in Lincoln and has three branches: the Unicameral makes laws, the governor carries them out, and the courts decide what they mean.",
      "The Unicameral is the only one-house legislature in the country. Its 49 senators are elected without party labels.",
      "A bill gets a public hearing where any citizen can speak, then debate and votes. The governor signs or vetoes it, and 30 senators can override a veto.",
    ],
    "How many houses does Nebraska's Legislature have?",
    [
      "Other states have a senate and a house.",
      "Nebraska's Unicameral has only one house.",
    ],
    "one",
  ),
  "social/neb-g4-nebraska-timeline": lesson(
    [
      "A timeline shows events in the order they happened, from the earliest to the latest.",
      "The smaller year came first: 1854 (Nebraska Territory) came before 1867 (statehood).",
      "To find how many years apart two events are, subtract the earlier year from the later one.",
    ],
    "Nebraska became a state in 1867. Nebraska Territory began in 1854. How many years apart are they?",
    [
      "Subtract the earlier year from the later one.",
      "1867 − 1854 = 13.",
    ],
    "13",
  ),
  "social/neb-g4-us-regions": lesson(
    [
      "The United States has five regions: the Northeast, Southeast, Midwest, Southwest and West.",
      "Nebraska is in the Midwest, on the Great Plains, between the Missouri River and the Rocky Mountains.",
      "Each region has its own land, climate and hazards, like tornadoes on the plains and hurricanes in the Southeast.",
    ],
    "Which region is Nebraska in?",
    [
      "Nebraska is in the middle of the country.",
      "It shares farms and plains with states like Kansas and Iowa.",
    ],
    "the Midwest",
  ),
};
