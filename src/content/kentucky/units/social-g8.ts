import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Kentucky Grade 8 social studies, the United States from 1600 to 1877: Kentucky's role in the nation from statehood to
// Reconstruction, its leaders in national politics, how its geography and location shaped that role, and conflict and
// collaboration between immigrants and those already living in Kentucky (8.H.KH.1, 8.C.KGO.1, 8.G.KGE.1, 8.H.KH.2);
// and Kentucky's economy before the Civil War and the choices its resources led people to make (8.E.KE.1, 8.E.KE.2).
// The national story itself is practised with adopted units (see ../plan/social.ts).

const NATION: Q[] = [
  ["In 1798, Kentucky's legislature passed resolutions, secretly written by Thomas Jefferson, against the…", "Alien and Sedition Acts", ["Bill of Rights", "Louisiana Purchase", "Missouri Compromise"], "They argued states could judge federal laws."],
  ["During the War of 1812, the rallying cry \"Remember the Raisin!\" honored Kentucky soldiers killed at…", "the River Raisin", ["Bunker Hill", "Gettysburg", "the Alamo"], "Many Kentucky families lost sons there in 1813."],
  ["Kentucky's governor Isaac Shelby led Kentucky volunteers at the 1813 Battle of the…", "Thames", ["Bulge", "Little Bighorn", "Somme"], "It was fought in Upper Canada."],
  ["Kentucky's Henry Clay was called the \"Great Compromiser\" because he…", "worked out deals between North and South", ["never voted", "led the Confederate army", "wrote the Declaration"], "He helped pass the Missouri Compromise and the Compromise of 1850."],
  ["Henry Clay's \"American System\" called for a national bank, tariffs and…", "roads and canals paid for by the nation", ["an end to all trade", "a king", "a single crop"], "He wanted to link the regions."],
  ["Two presidents during the Civil War, Abraham Lincoln and Jefferson Davis, were both born in…", "Kentucky", ["Virginia", "Illinois", "Mississippi"], "They were born less than a year apart."],
  ["When the Civil War began, Kentucky first declared that it would be…", "neutral", ["Confederate", "independent", "part of Canada"], "Neutrality ended in September 1861."],
  ["Kentucky was a border state because it…", "allowed slavery but stayed in the Union", ["seceded first", "had no slavery", "was a territory"], "It lay between North and South."],
  ["The largest Civil War battle fought in Kentucky was the Battle of…", "Perryville", ["Gettysburg", "Antietam", "Shiloh"], "It was fought on October 8, 1862."],
  ["Camp Nelson in Kentucky was an important place where…", "Black men enlisted in the Union army and their families sought freedom", ["the Confederacy wrote its constitution", "the Kentucky Derby began", "Lincoln was born"], "It became a camp for refugees too."],
  ["Why did the Emancipation Proclamation not free enslaved people in Kentucky?", "it applied only to states in rebellion", ["Kentucky had no slavery", "Kentucky was not a state", "it applied only to Kentucky"], "Kentucky stayed in the Union."],
  ["Slavery ended in Kentucky in December 1865 with the…", "13th Amendment", ["1st Amendment", "Bill of Rights", "Kentucky Derby"], "Kentucky lawmakers voted against it in 1865."],
  ["John C. Breckinridge of Kentucky was the youngest…", "Vice President in US history", ["governor of Ohio", "Chief Justice", "astronaut"], "He was 36 when he took office in 1857."],
  ["Kentucky's location on the Ohio River mattered in the 1800s because the river…", "divided free states from slave states", ["was always frozen", "had no boats", "flowed into the Pacific"], "Ohio, Indiana and Illinois were free states."],
  ["Many freedom seekers escaping slavery in Kentucky crossed the Ohio River to…", "free states and the Underground Railroad", ["the Gulf of Mexico", "Spanish Florida", "the Pacific"], "Crossing the river was a step toward freedom."],
  ["The Mississippi River mattered to Kentucky because it carried Kentucky goods to…", "New Orleans", ["Boston", "Chicago", "London"], "From there goods went to the world."],
  ["In 1855, on an election day called \"Bloody Monday,\" mobs in Louisville attacked…", "German and Irish Catholic immigrants", ["the governor's horses", "steamboats only", "Shawnee towns"], "A party that opposed immigrants stirred up the violence."],
  ["Many German immigrants in Louisville in the 1800s worked as…", "brewers, bakers and craftworkers", ["coal kings", "pirates", "astronauts"], "German neighborhoods grew in the city."],
  ["In 1838 and 1839, the Cherokee forced west on the Trail of Tears passed through…", "western Kentucky", ["Boston", "Mexico City", "New York"], "A park in Hopkinsville remembers them."],
  ["Kentucky soldiers in the Civil War fought…", "on both sides, Union and Confederate", ["only for the Confederacy", "only for Britain", "for neither side"], "Families were sometimes divided.", true],
  ["Why did Lincoln think Kentucky was so important to the Union?", "its rivers and location could open the way into the North or South", ["it had the most gold", "it was the largest state", "it had no army"], "Control of the Ohio River mattered.", true],
  ["After the Civil War, many white Kentuckians…", "opposed rights for freed people, though Kentucky had stayed in the Union", ["moved to Canada", "all supported equal rights", "left politics"], "The Freedmen's Bureau worked in Kentucky to help freed people.", true],
  ["How did early Kentucky settlers and the Shawnee and Cherokee often come into conflict?", "both wanted the same lands, which the Nations had long used", ["they never met", "settlers stayed east of the mountains", "they traded only peacefully"], "Land was at the center of the conflict.", true],
  ["Kentucky's Zachary Taylor, who grew up near Louisville, became…", "the 12th President", ["the first governor", "a Supreme Court justice", "a Confederate general"], "He was elected in 1848.", true],
];

const ECONOMY: Q[] = [
  ["Before the Civil War, Kentucky led the nation in growing…", "hemp", ["cotton", "rice", "sugar cane"], "It was made into rope and bagging."],
  ["Kentucky hemp was made into bags and rope used to wrap…", "cotton bales in the Deep South", ["coal in Pennsylvania", "fish in Maine", "gold in California"], "The cotton boom raised demand for hemp."],
  ["When cotton growing grew in the Deep South, the demand for Kentucky hemp…", "went up", ["went down", "ended", "never changed"], "Regions depended on each other."],
  ["Kentucky farmers also sold mules, horses and hogs to…", "farms and plantations in the South", ["Europe only", "China", "no one"], "Livestock were driven south to market."],
  ["Henry Clay supported tariffs partly to protect Kentucky hemp from…", "cheaper foreign hemp", ["Kentucky corn", "Ohio coal", "New Orleans cotton"], "A tariff is a tax on imports."],
  ["Steamboats on the Ohio and Mississippi helped Kentucky by…", "carrying goods to market faster and upriver", ["closing the rivers", "replacing farms", "stopping trade"], "Before steamboats, goods mostly floated one way."],
  ["The Louisville and Portland Canal, opened in 1830, let boats get around…", "the Falls of the Ohio", ["Niagara Falls", "the Rocky Mountains", "the Great Lakes"], "It helped Louisville grow."],
  ["In 1830, President Andrew Jackson vetoed federal money for a road in Kentucky called the…", "Maysville Road", ["Wilderness Road", "Natchez Trace", "National Road"], "He said it served only one state."],
  ["The railroad from Louisville to Nashville, finished in 1859, helped Kentucky by…", "carrying goods by land in every season", ["closing the rivers", "ending trade with the South", "banning farming"], "Railroads didn't freeze or run dry."],
  ["Kentucky's limestone soil and bluegrass made it a good place to raise…", "horses", ["penguins", "camels", "lobsters"], "Horse farms spread across the Bluegrass."],
  ["Salt from Kentucky's salt licks was valuable because people needed it to…", "preserve meat", ["build houses", "make paper", "paint wagons"], "Before refrigerators, salt kept food from spoiling."],
  ["Commercial coal mining in Kentucky began around…", "1820", ["1492", "1950", "2000"], "Coal fueled steamboats and furnaces."],
  ["Iron furnaces in eastern Kentucky used local iron ore and…", "wood burned into charcoal", ["oil", "solar panels", "uranium"], "Resources in one place shaped what was made there."],
  ["The labor of enslaved people on Kentucky hemp and tobacco farms…", "made money for slaveholders while denying the workers freedom and pay", ["was paid fairly", "was by choice", "did not exist"], "About one in five Kentuckians was enslaved in 1860."],
  ["\"Sold down the river\" describes Kentucky slaveholders selling enslaved people to…", "plantations in the Deep South", ["free states", "Europe", "Canada"], "Families were often torn apart."],
  ["Kentucky farmers who grew tobacco instead of corn gave up the corn they could have grown. That corn was their…", "opportunity cost", ["incentive", "tariff", "profit"], "Every choice has a cost."],
  ["Why did farmers in Kentucky's Bluegrass grow hemp but farmers in the mountains rarely did?", "the Bluegrass had richer, flatter land", ["hemp grows only on mountains", "mountain farmers had too much land", "hemp needs snow"], "Resources shape choices."],
  ["Louisville grew into a big city because of its location at…", "the Falls of the Ohio, where boats had to unload", ["the top of a mountain", "the Atlantic coast", "a desert oasis"], "Goods changed boats there.", true],
  ["In the Panic of 1819, many Kentuckians…", "lost land and money when banks failed", ["got rich overnight", "stopped farming forever", "moved to Europe"], "Economic downturns hit farmers hard.", true],
  ["Why did Kentucky's economy depend on trade with the South before the Civil War?", "the South bought its hemp, livestock and food", ["the South sold Kentucky all its coal", "Kentucky had no rivers", "the North banned Kentucky goods"], "Regional interdependence.", true],
  ["How did the Civil War hurt Kentucky's economy?", "it cut trade with the South and damaged farms", ["it doubled hemp prices forever", "it had no effect", "it built new canals"], "War disrupts markets.", true],
  ["After slavery ended, many Kentucky farms changed how work was done by…", "hiring workers and renting land to sharecroppers and tenants", ["closing every farm", "using robots", "moving all farms to cities"], "Labor systems changed after 1865.", true],
  ["Which incentive drew settlers to buy land in Kentucky after statehood?", "cheap, fertile farmland", ["free cars", "gold mines everywhere", "ocean beaches"], "Good land was the main draw.", true],
  ["The first Kentucky Derby, in 1875, showed the growing importance of…", "Kentucky's horse industry", ["Kentucky's cotton mills", "Kentucky's gold mines", "Kentucky's ocean ports"], "Horse breeding became a major business.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "ky-g8-kentucky-and-the-nation",
    title: "Kentucky & the Nation",
    emoji: "⚖️",
    blurb: "Henry Clay, a border state and the Civil War",
    parentNote: "Kentucky's role in the nation from statehood to Reconstruction: the Kentucky Resolutions, the War of 1812, Henry Clay and compromise, Lincoln and Davis, a border state's neutrality and the Civil War, Camp Nelson and emancipation, the Ohio River between slavery and freedom, the Trail of Tears in western Kentucky, and Bloody Monday in Louisville.",
    standards: ["8.H.KH.1; 8.C.KGO.1; 8.G.KGE.1; 8.H.KH.2", "Kentucky's role in early American history to 1877, Kentuckians in national politics, Kentucky's role based on its geography and location, and conflict and collaboration between immigrants and residents"],
    items: NATION,
  }),
  bankUnit({
    id: "ky-g8-kentucky-economy",
    title: "Kentucky's Early Economy",
    emoji: "🚂",
    blurb: "Hemp, rivers, steamboats and railroads",
    parentNote: "Kentucky's economy before and around the Civil War: hemp for cotton bagging, livestock for southern markets, tariffs, steamboats, the Louisville and Portland Canal, the Maysville Road, railroads, salt, coal and iron, enslaved labor and the domestic slave trade, and how resources and opportunity costs shaped people's choices.",
    standards: ["8.E.KE.1; 8.E.KE.2", "how regional trends and policies affected Kentucky's economy before the Civil War, and how resources led to economic choices from the Colonial Era to Reconstruction"],
    items: ECONOMY,
  }),
];
