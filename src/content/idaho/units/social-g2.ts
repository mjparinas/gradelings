import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_2 } from "../../california/units/social-g2";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Idaho Grade 2 social studies: the lives and contributions of the five federally recognized American Indian tribes in
// Idaho (2.SS.1.2, which asks for two of them; the unit meets all five so children can compare), how Idaho's land and
// natural resources meet people's needs and shape local work, and cities, suburbs, towns and rural places (2.SS.2.3,
// 2.SS.3.4, 2.SS.2.4), and Idaho's constitution, laws and the people who make and enforce them (2.SS.4.2, 2.SS.4.3).

const TRIBES: Q[] = [
  ["How many federally recognized tribes are in Idaho?", "five", ["two", "ten", "fifty"], "Each one has its own government."],
  ["The five tribes in Idaho are the Coeur d'Alene, Kootenai, Nez Perce, Shoshone-Bannock and…", "Shoshone-Paiute", ["Cherokee", "Navajo", "Seminole"], "Two of the names include Shoshone."],
  ["The Nez Perce people call themselves Nimiipuu, which means…", "the people", ["the river", "the mountain", "the horse"], "It is a word in their own language."],
  ["In 1805, Nez Perce people helped the hungry Lewis and Clark explorers by giving them…", "food", ["cars", "phones", "gold coins"], "The explorers had just crossed the mountains."],
  ["The Nez Perce are known for raising fine…", "horses", ["camels", "penguins", "kangaroos"], "The spotted Appaloosa is Idaho's state horse."],
  ["The Nez Perce Tribe's reservation is in north-central Idaho, around the town of…", "Lapwai", ["Pocatello", "Boise", "Twin Falls"], "The tribe's government offices are there."],
  ["The Coeur d'Alene Tribe's homeland is around a large lake in…", "northern Idaho", ["southern Idaho", "the ocean", "the desert"], "The lake shares the tribe's name."],
  ["The Coeur d'Alene people call themselves Schitsu'umsh. That is a word in their own…", "language", ["song", "map", "game"], "Many tribes have their own languages."],
  ["The Coeur d'Alene Tribe works today to keep its lake and rivers…", "clean and healthy", ["dry", "full of trash", "frozen"], "Clean water matters for fish and people."],
  ["The Kootenai Tribe of Idaho lives near Bonners Ferry, beside the…", "Kootenai River", ["Snake River", "Mississippi River", "Nile River"], "The river shares the tribe's name."],
  ["The Kootenai Tribe raises young sturgeon and other fish in a hatchery to…", "help the river's fish come back", ["sell them as pets", "fill swimming pools", "feed bears"], "Some river fish had become rare."],
  ["The Shoshone-Bannock Tribes live on the Fort Hall Reservation near…", "Pocatello", ["Lewiston", "Coeur d'Alene", "Bonners Ferry"], "It is in southeastern Idaho."],
  ["Sacagawea, who helped Lewis and Clark on their journey, was born a…", "Lemhi Shoshone", ["Nez Perce", "Kootenai", "Coeur d'Alene"], "Her people lived in the Lemhi Valley."],
  ["The Shoshone-Paiute Tribes live on the Duck Valley Reservation, on Idaho's…", "southern border", ["northern border", "ocean shore", "highest mountain"], "It is high desert country."],
  ["Long ago, many Native families in Idaho dug up camas bulbs to…", "cook and eat", ["use as money", "wear as shoes", "burn for light"], "Camas grows in wet meadows."],
  ["Salmon has long been an important food for many tribes in Idaho because…", "salmon swim up the rivers every year", ["salmon grow on trees", "salmon live in the desert", "salmon fall from the sky"], "Rivers bring the fish."],
  ["Each tribe in Idaho has its own government that…", "makes laws for its people and land", ["runs the whole state", "runs other countries", "has no leaders"], "Tribes are self-governing."],
  ["Tribal members vote for leaders who serve on a…", "tribal council", ["football team", "school bus", "choir"], "The council leads the tribe's government."],
  ["Tribes in Idaho today run…", "schools, health clinics and businesses", ["nothing at all", "only museums", "the US Army"], "Tribes serve their members and neighbors."],
  ["Today, children of many tribes in Idaho can take classes in their tribe's…", "own language", ["French", "Latin", "Japanese"], "Elders and teachers help keep languages strong."],
  ["Why do tribes in Idaho work to bring salmon back to rivers?", "salmon are important to their food and way of life", ["salmon are pets", "to stop the rivers", "for a car race"], "Salmon have fed people here for thousands of years.", true],
  ["How are the Nez Perce Tribe and the Coeur d'Alene Tribe alike?", "both have homelands in northern Idaho and their own governments", ["both live on islands", "neither has a government", "both moved to the ocean"], "Compare where they live and how they govern.", true],
  ["How are the homelands of the Kootenai Tribe and the Shoshone-Paiute Tribes different?", "one is by a northern river and one is in the southern high desert", ["they are the same place", "both are on the ocean", "both are in big cities"], "Find each one on a map of Idaho.", true],
  ["In 1974, the small Kootenai Tribe peacefully \"declared war\" on the United States to get…", "land for homes", ["a new flag", "more snow", "a train"], "No one was hurt, and the tribe got land.", true],
  ["The Kootenai people are known for canoes with pointed ends shaped like a…", "sturgeon's nose", ["bird's wing", "pine cone", "star"], "The sturgeon is a big river fish.", true],
];

const LAND: Q[] = [
  ["Idaho grows more of this vegetable than any other state:", "potatoes", ["bananas", "pineapples", "coconuts"], "Idaho potatoes are sold all over the country."],
  ["Farmers in southern Idaho water their crops with water from the…", "Snake River", ["ocean", "moon", "Sahara"], "Canals carry river water to the fields."],
  ["Trees from Idaho's forests are cut to make…", "lumber for houses", ["glass", "plastic toys", "seashells"], "Northern Idaho has many forests."],
  ["Many Idaho farms raise cows for…", "milk and cheese", ["wool", "eggs", "honey"], "Dairy cows give milk."],
  ["Fish farms near Hagerman raise lots of…", "trout", ["sharks", "whales", "octopuses"], "Clear spring water pours out there."],
  ["Miners in northern Idaho have long dug for…", "silver", ["chocolate", "plastic", "sugar"], "The Silver Valley is named for it."],
  ["Sugar beets grown in Idaho are made into…", "sugar", ["salt", "pepper", "milk"], "The sweet part is in the root."],
  ["Hay grown on Idaho farms is used to feed…", "cows and horses", ["fish", "birds at the beach", "cars"], "Hay is dried grass and plants."],
  ["Which is a natural resource?", "water", ["a bicycle", "a TV", "a toy car"], "Natural resources come from nature."],
  ["Idaho's forests, rivers, soil and rocks are all…", "natural resources", ["toys", "machines", "buildings"], "People use them to meet their needs."],
  ["Snow on Idaho's mountains matters because it melts into…", "rivers that farms and towns use", ["sand", "clouds only", "ice cream"], "Melting snow runs downhill."],
  ["Skiers come to Idaho's snowy mountains in…", "winter", ["July", "August", "June"], "Ski towns are busy when it snows."],
  ["Rafting trips on the Salmon River bring visitors, which makes jobs in…", "tourism", ["deep sea fishing", "space travel", "mining gold"], "Visitors pay for guides, food and hotels."],
  ["Stores in a farm town sell seeds and tools because many people there…", "work on farms", ["live on boats", "work in space", "never grow food"], "Natural resources shape local work."],
  ["A city is a place with…", "many people and buildings close together", ["only farms", "no people", "only trees"], "Boise is a city."],
  ["A rural area is…", "the countryside, with farms and open land", ["a busy downtown", "a city of tall buildings", "a shopping mall"], "Rural means country."],
  ["A suburb is a community…", "near a big city, where many people live", ["in the ocean", "on the moon", "with no homes"], "Many people drive from a suburb to the city for work."],
  ["A small community with fewer people than a city is a…", "town", ["state", "country", "continent"], "Idaho has many small towns."],
  ["Boise is Idaho's biggest…", "city", ["farm", "lake", "mountain"], "It is also the state capital."],
  ["People need water, food and shelter. Idaho's rivers give people…", "water to drink and to grow food", ["sand", "snow cones", "gasoline"], "We depend on the environment."],
  ["Why do many towns in Idaho sit beside rivers?", "rivers give water for people and farms", ["rivers keep people away", "the law says so", "rivers are warm"], "Water is a basic need.", true],
  ["Cutting down too many trees in one place can make…", "soil wash away and animals lose their homes", ["more trees grow at once", "rivers cleaner", "the soil stronger"], "Using a resource has costs.", true],
  ["Using lots of river water for farms leaves less water in the river for…", "fish like salmon and trout", ["airplanes", "mountains", "the moon"], "People share water with nature.", true],
  ["Why might a family choose to live in a rural part of Idaho?", "to have open land, farms and quiet", ["to be near tall buildings", "to ride the subway", "to live by an ocean beach"], "Rural places have more space.", true],
  ["Why do more people live in the Boise area than in Idaho's mountains?", "the valley has jobs, homes and flatter land", ["the mountains have no snow", "no one likes valleys", "mountains are under water"], "Land shapes where people live.", true],
];

const LEADERS_EXTRA: Q[] = [
  ["Who leads the government of Idaho?", "the governor", ["the mayor of each town", "a judge", "the principal"], "The governor works in Boise."],
  ["Idaho's state laws are made by the Idaho Senate and the Idaho…", "House of Representatives", ["Supreme Court", "school board", "State Fair"], "Together they are the Idaho Legislature."],
  ["Idaho's constitution is…", "the plan that the state's laws are built on", ["a type of map", "a song", "a kind of potato"], "Idaho wrote its constitution in 1889."],
  ["In an Idaho county, voters elect… to run the county.", "county commissioners", ["the school band", "bus drivers", "fair judges"], "Idaho has 44 counties."],
  ["If someone breaks a law in Idaho, there can be…", "consequences, like a fine", ["prizes", "a party", "nothing ever"], "Laws come with consequences."],
  ["Who helps make sure people follow the law in Idaho's towns?", "police officers", ["mail carriers", "bakers", "librarians"], "They enforce the law.", true],
  ["In most Idaho cities, voters elect a mayor and a…", "city council", ["king", "team captain", "class pet"], "The council votes on city rules.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "id-g2-idaho-tribes",
    title: "Tribes of Idaho",
    emoji: "🏞️",
    blurb: "The five tribes of Idaho, long ago and today",
    parentNote: "The five federally recognized tribes in Idaho (the Coeur d'Alene Tribe, the Kootenai Tribe of Idaho, the Nez Perce Tribe, the Shoshone-Bannock Tribes and the Shoshone-Paiute Tribes): where each tribe's homeland and reservation are, how the land and rivers shaped their lives, their contributions then and now (the Nez Perce help for Lewis and Clark, Sacagawea, fish hatcheries and clean water work), and how each tribe governs itself today, so children can compare two or more of them.",
    standards: ["2.SS.1.2", "comparing the lives and contributions of the federally recognized tribes in Idaho"],
    items: TRIBES,
  }),
  bankUnit({
    id: "id-g2-idaho-land",
    title: "Idaho's Land & Work",
    emoji: "🥔",
    blurb: "Rivers, forests, farms, towns and cities",
    parentNote: "How people in Idaho depend on the land: water from the Snake River and mountain snow, forests, silver mines, potato, dairy, sugar beet and trout farms, and tourism in the mountains and on rivers; how these natural resources shape the work people do; and the differences between cities, suburbs, towns and rural places.",
    standards: ["2.SS.2.3; 2.SS.3.4; 2.SS.2.4", "how people depend on the environment, how natural resources shape local work, and cities, suburbs, towns and rural places"],
    items: LAND,
  }),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-who-runs-our-town"),
    {
      id: "id-g2-who-runs-idaho",
      title: "Laws & Leaders in Idaho",
      emoji: "🏛️",
      blurb: "Idaho's constitution, laws and the people who make them",
      parentNote: "Idaho's constitution as the basis for the state's laws and the consequences of breaking laws, and the people who make, apply and enforce rules: mayors and city councils, county commissioners, the governor, the Idaho Legislature, judges and police, and the voters who choose many of them.",
      standards: ["2.SS.4.2; 2.SS.4.3", "Idaho's constitution as the basis for its laws, and the people who make, apply and enforce laws"],
    },
    LEADERS_EXTRA,
  ),
];
