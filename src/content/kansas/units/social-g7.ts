import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Kansas Grade 7 social studies. The Kansas standards let schools teach Global Geography or Kansas History in Grade 7
// (Kansas History no earlier than 7th grade), so the grade has both: world geography through adopted units (see
// ../plan/social.ts) and this Kansas History unit, from the first peoples to the modern state, practising the five
// standards' benchmarks (choices and consequences, rights and responsibilities, beliefs and identities, continuity and
// change, and dynamic relationships). Native nations are written about as living communities, with nothing sacred or
// ceremonial.

const HISTORY: Q[] = [
  ["Long before Europeans arrived, the Wichita people in Kansas lived in villages of…", "grass lodges, and farmed corn, beans and squash", ["stone castles", "igloos", "brick skyscrapers"], "Their villages stood near the Arkansas River."],
  ["In 1541 the Spanish explorer Coronado came to Kansas searching for…", "Quivira, a land he hoped was rich in gold", ["a route to China by sea", "a lost army", "a new capital"], "He found Wichita villages instead of gold."],
  ["The state of Kansas takes its name from the…", "Kansa, or Kaw, people", ["Spanish word for wheat", "French word for wind", "first governor"], "Kansas means people of the south wind."],
  ["Most of Kansas became part of the United States in 1803 with the…", "Louisiana Purchase", ["Treaty of Paris", "Gadsden Purchase", "Alaska Purchase"], "The United States bought it from France."],
  ["Fort Leavenworth, founded in 1827, was built to…", "protect travelers and traders on the trails", ["mine gold", "keep out the Spanish navy", "store wheat"], "It is the oldest active Army post west of the Mississippi."],
  ["Traders on the Santa Fe Trail used Council Grove as a…", "meeting place to gather wagons and supplies", ["gold mine", "seaport", "capital city"], "The trail ran from Missouri to Santa Fe."],
  ["In the 1830s the U.S. government moved many Eastern nations, such as the Shawnee, Delaware and Potawatomi, into…", "lands in what is now Kansas", ["Florida", "Canada", "California"], "This was part of Indian removal."],
  ["The Kansas-Nebraska Act of 1854 let the settlers of each territory decide…", "whether to allow slavery", ["the state bird", "where the trails went", "the price of wheat"], "This idea was called popular sovereignty."],
  ["The violence between proslavery and free-state settlers in the 1850s is called…", "Bleeding Kansas", ["the Gold Rush", "the Dust Bowl", "the Great Migration"], "Both sides rushed settlers to the territory."],
  ["Free-state settlers founded Lawrence in 1854 to help make Kansas…", "a free state", ["a slave state", "part of Mexico", "a separate country"], "It was attacked in 1856 and again in 1863."],
  ["Kansas joined the Union on January 29, 1861, as a…", "free state", ["slave state", "territory", "colony"], "Kansans celebrate Kansas Day on January 29."],
  ["The 1st Kansas Colored Infantry was among the first Black regiments to…", "fight in battle in the Civil War", ["sail to Europe", "build the capitol", "explore the Rockies"], "They fought at Island Mound, Missouri, in 1862."],
  ["After the Civil War, cowboys drove herds of Texas cattle north to Kansas railroad towns such as…", "Abilene, Wichita and Dodge City", ["Boston and New York", "Seattle and Portland", "Miami and Tampa"], "Cattle were shipped east by train."],
  ["In 1874, Mennonite families from Russia brought a hardy winter wheat to Kansas called…", "Turkey Red", ["Golden Delicious", "Blue Ribbon", "Prairie Rose"], "It helped make Kansas the Wheat State."],
  ["In the 1930s, drought and strong winds blew away dry topsoil in western Kansas. This time is called the…", "Dust Bowl", ["Gold Rush", "Bleeding Kansas", "Great Flood"], "Farmers later planted windbreaks and changed how they plowed."],
  ["Wichita is called the Air Capital of the World because…", "it builds many airplanes", ["it has the tallest towers", "it gets the most wind", "it has the biggest airport"], "Companies there have built planes for about a hundred years."],
  ["Dwight D. Eisenhower, who grew up in Abilene, led Allied forces in World War II and later became…", "President of the United States", ["governor of Texas", "Chief Justice", "an astronaut"], "He served from 1953 to 1961."],
  ["Brown v. Board of Education began in Topeka and ended…", "legal segregation in public schools in 1954", ["the Civil War", "the Dust Bowl", "the Santa Fe Trail"], "The Supreme Court ruled separate schools unequal."],
  ["Today, four Native nations have reservations in Kansas, including the Prairie Band Potawatomi Nation and the…", "Kickapoo Tribe in Kansas", ["Seminole Tribe of Florida", "Navajo Nation", "Haudenosaunee Confederacy"], "Each nation has its own government."],
  ["Kansas has many grain elevators because it is one of the biggest producers of…", "wheat and sorghum", ["bananas and coffee", "rice and tea", "oranges and lemons"], "Grain is stored before it is shipped."],
  ["Why did the Kansas-Nebraska Act lead to violence?", "both sides tried to control the vote on slavery", ["the land had no farms", "Kansas was underwater", "nobody wanted to live there"], "A choice can have big consequences.", true],
  ["Why did the Exodusters choose Kansas in 1879?", "it had been a free state and offered land to homestead", ["it had gold mines", "it was on the ocean", "it was part of Mexico"], "They left unfair treatment in the South.", true],
  ["How did the railroad change Kansas in the 1860s and 1870s?", "it brought settlers and carried cattle and wheat to markets", ["it ended farming", "it moved the capital to Denver", "it stopped people from coming"], "Towns grew along the tracks.", true],
  ["Which pair shows both a gain and a loss from settlement in Kansas?", "new farms and towns, and Native nations losing their lands", ["more rain and fewer people", "new oceans and fewer roads", "no change at all"], "Weigh the effects on different groups.", true],
  ["How did Kansans change farming after the Dust Bowl?", "they planted windbreaks and used methods that keep soil in place", ["they stopped growing crops forever", "they moved every farm to the ocean", "they plowed even more grassland"], "Learning from hard times changes how people work.", true],
  ["Kansas passed a law to ban alcohol in its constitution in 1880. This shows how…", "voters can change their state's rules", ["the President makes state laws", "laws never change", "only judges write constitutions"], "Kansans voted on the amendment.", true],
  ["Why do historians use both letters from settlers and the oral histories of Native nations to study Kansas?", "each tells part of the story", ["letters are always wrong", "oral histories don't count", "neither is useful"], "Good history has many voices.", true],
  ["Which word describes Kansas's change from grassland to farms, towns and cities?", "change over time", ["continuity", "a fairy tale", "a weather pattern"], "Historians look for what changes and what stays the same.", true],
  ["Amelia Earhart, who grew up in Atchison, became the first woman to fly…", "alone across the Atlantic Ocean", ["to the moon", "around Kansas on a bicycle", "a hot-air balloon to Mars"], "She made the flight in 1932."],
  ["During World War II, workers in Wichita built thousands of…", "B-29 bombers and other airplanes", ["submarines", "tanks for the navy", "sailing ships"], "Many of the workers were women."],
  ["Nicodemus, founded in 1877 by Black settlers from Kentucky, is now a…", "national historic site", ["seaport", "state capital", "gold mine"], "It is the only remaining western town founded by Black Americans after the Civil War."],
  ["The Kansas state motto, Ad astra per aspera, means…", "to the stars through difficulties", ["land of the free", "home of the wheat", "united we stand"], "It reminds Kansans of the hard road to statehood."],
  ["Why did so many towns grow up along railroad lines in Kansas?", "trains carried people, cattle and grain to and from them", ["the tracks kept out storms", "railroads paid every family to move", "there were no roads at all"], "Transportation shapes where people live.", true],
  ["How did the Dust Bowl show that choices have consequences?", "plowing up too much grassland let the soil blow away in the drought", ["it was caused by too much rain", "it happened because of the railroads", "it had nothing to do with farming"], "Grass roots had held the soil.", true],
];

export const SOCIAL_7: Unit[] = [
  bankUnit({
    id: "ks-g7-kansas-history",
    title: "Kansas History",
    emoji: "🌻",
    blurb: "From the first peoples to the Wheat State today",
    parentNote: "Kansas history from the Wichita and Kansa peoples and Coronado to the Louisiana Purchase, Fort Leavenworth and the Santa Fe Trail, Indian removal, the Kansas-Nebraska Act and Bleeding Kansas, statehood as a free state in 1861, the Civil War, cattle towns, Turkey Red wheat and the Exodusters, the Dust Bowl, Wichita's airplanes, Eisenhower, Brown v. Board of Education, and the Native nations that govern themselves in Kansas today.",
    standards: ["1.1; 2.1; 3.1; 4.1; 4.2", "choices and consequences, rights and responsibilities, and identities in Kansas history, and how Kansas has changed and stayed the same"],
    items: HISTORY,
  }),
];
