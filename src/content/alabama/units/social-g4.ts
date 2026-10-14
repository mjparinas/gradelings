import { pick, sample, shuffle } from "../../random";
import type { Question, SortQuestion, Unit } from "../../types";
import { OWN_SOCIAL_5 as OREGON_5 } from "../../oregon/units/social-g5";
import { bankUnit, type Q } from "../own";
import { copyOf, from, fromItems, mixUnit, timelineUnit, type Dated } from "./kit";

// Alabama's own Grade 4 social studies units (`al-` ids): Alabama in American History and Government II, Colonies to
// 1900 (2024 Course of Study). The colonies, Revolution and Constitution units are Alabama copies of Oregon's Grade 5
// units (questions naming Oregon, or about Tribes and treaties, are left out) with Alabama-written items added. The
// rest are written for Alabama. Slavery, the Creek War, Indian Removal and Jim Crow are told plainly; Native nations
// are living communities today.

const COLONY_EXTRA: Q[] = [
  ["New England's rocky soil and cold winters led many colonists there to earn a living by…", "fishing, shipbuilding and trade", ["growing rice", "growing cotton on plantations", "mining gold"], "The ocean was close."],
  ["The Middle Colonies were called the breadbasket colonies because they grew lots of…", "wheat and other grains", ["tobacco", "sugar cane", "oranges"], "Grain makes bread."],
  ["The Southern Colonies' warm climate and long growing season suited…", "tobacco, rice and indigo on plantations", ["only fishing", "wheat in snow", "nothing at all"], "Cash crops."],
  ["William Penn founded Pennsylvania as a place where…", "Quakers and others could worship freely", ["only the king could live", "no farming was allowed", "gold was mined"], "A holy experiment."],
  ["James Oglethorpe founded Georgia in 1732 partly as a fresh start for…", "people who owed debts", ["kings", "Spanish soldiers", "French traders"], "Debtors."],
  ["Roger Williams founded Rhode Island after he was forced out of Massachusetts for his…", "religious ideas", ["gold mine", "army", "taxes"], "He believed in freedom of religion."],
  ["George Calvert planned Maryland as a safe place for…", "Catholics", ["pirates", "Spanish explorers", "French kings"], "His family were Lords Baltimore."],
  ["An apprentice was a young person who…", "worked for a master to learn a trade", ["was enslaved for life", "owned a plantation", "led the colony"], "Like a blacksmith-in-training."],
  ["An indentured servant agreed to work for several years in exchange for…", "the trip to America, food and shelter", ["nothing at all", "a seat in Parliament", "a gold mine"], "Usually four to seven years."],
  ["How was slavery different from indentured servitude?", "enslaved people were held for life, and so were their children", ["it lasted only four years", "enslaved people were paid", "people chose it freely"], "Slavery was forced and lifelong."],
  ["The Middle Passage was the forced voyage of kidnapped Africans across the…", "Atlantic Ocean", ["Pacific Ocean", "Tennessee River", "Mississippi River"], "The middle leg of the triangular trade."],
  ["The triangular trade linked…", "Europe, Africa and the Americas", ["Alabama, Ohio and Iowa", "Asia, Australia and Antarctica", "three cities in Georgia"], "Three sides across the Atlantic."],
  ["Conditions on slave ships during the Middle Passage were…", "crowded, cruel and deadly", ["comfortable and safe", "like a vacation", "chosen by the passengers"], "Many people died on the voyage.", true],
  ["Before being kidnapped, many West Africans were…", "farmers, traders and craftspeople in their own kingdoms and villages", ["already in America", "living alone with no culture", "European sailors"], "They had families and full lives.", true],
  ["Colonial women and children helped farms and towns by…", "spinning, cooking, farming and running shops", ["doing nothing", "only playing", "voting in elections"], "Everyone worked.", true],
  ["Artisans such as silversmiths and blacksmiths…", "made goods by hand to sell", ["ruled the colonies", "only farmed rice", "never worked"], "Skilled workers.", true],
];

const REVOLUTION_EXTRA: Q[] = [
  ["The French and Indian War (1754–1763) was fought mainly between Britain and…", "France", ["Spain", "the United States", "Mexico"], "Native nations fought on both sides."],
  ["After the French and Indian War, France gave up Mobile, and Fort Condé was renamed…", "Fort Charlotte", ["Fort Toulouse", "Fort Mims", "Fort Sumter"], "Britain now ruled Mobile."],
  ["When France lost the French and Indian War, the French left Fort Toulouse and…", "Britain claimed most of Alabama", ["Alabama became a state", "Spain built Huntsville", "the Creek Nation moved west"], "Power shifted to Britain."],
  ["The Stamp Act of 1765 taxed…", "newspapers, legal papers and playing cards", ["only tea", "cotton", "gold"], "Printed paper needed a stamp."],
  ["Colonists who protested British taxes said, 'No taxation without…'", "representation", ["permission", "money", "kings"], "They had no voice in Parliament."],
  ["In the Boston Tea Party (1773), colonists…", "dumped British tea into Boston Harbor", ["drank tea with the king", "bought all the tea", "grew their own tea"], "A protest against the Tea Act."],
  ["Britain punished Boston after the Tea Party with laws colonists called the…", "Intolerable Acts", ["Bill of Rights", "Stamp Act", "Treaty of Paris"], "They closed Boston's port."],
  ["During the Revolution, Spain, led by Bernardo de Gálvez, captured British Mobile in…", "1780", ["1702", "1819", "1865"], "Spain was fighting Britain too."],
  ["The Battle of Fort Charlotte ended with Mobile under the control of…", "Spain", ["France", "the United States", "the Creek Nation"], "Gálvez's army won."],
  ["Pinckney's Treaty (1795) set the US–Spanish border at the 31st parallel, which today forms part of Alabama's border with…", "Florida", ["Tennessee", "Georgia", "Mississippi"], "The line across the south.", true],
  ["James Armistead Lafayette, an enslaved man from Virginia, helped win at Yorktown by…", "spying on the British", ["leading the navy", "writing the Constitution", "becoming king"], "He gathered secrets.", true],
  ["Phillis Wheatley, who was enslaved in Boston, became famous as a…", "poet", ["general", "sea captain", "governor"], "Her book was published in 1773.", true],
  ["The Battle of Saratoga (1777) was a turning point because it convinced…", "France to join the war on the American side", ["Britain to win", "Spain to leave", "George Washington to quit"], "A big American victory.", true],
  ["The Treaty of Paris (1783) set the western border of the United States at the…", "Mississippi River", ["Pacific Ocean", "Tennessee River", "Rocky Mountains"], "The new nation reached the Mississippi.", true],
];

const CONSTITUTION_EXTRA: Q[] = [
  ["The first plan of government for the United States was the…", "Articles of Confederation", ["Bill of Rights", "Declaration of Independence", "Mayflower Compact"], "It made a weak national government."],
  ["One weakness of the Articles of Confederation was that Congress could not…", "collect taxes", ["meet", "talk", "write letters"], "No money to pay debts."],
  ["Shays' Rebellion (1786–1787) was an uprising of…", "Massachusetts farmers angry about debts and taxes", ["British soldiers", "Spanish sailors", "French traders"], "It showed the government was too weak."],
  ["The Constitutional Convention met in 1787 in…", "Philadelphia", ["Montgomery", "Boston", "Williamsburg"], "In Independence Hall."],
  ["The Great Compromise created a Congress with a House based on population and a Senate with…", "two senators from every state", ["one senator for every city", "no senators", "senators chosen by the king"], "Big and small states both won."],
  ["The legislative branch, Congress,…", "makes the laws", ["enforces the laws", "judges the laws", "commands the navy only"], "Legislate means make laws."],
  ["The executive branch, led by the President,…", "carries out the laws", ["writes the laws", "judges the laws", "chooses senators"], "Execute means carry out."],
  ["The judicial branch, the courts,…", "decides what laws mean", ["makes laws", "collects taxes", "leads the army"], "Judges."],
  ["The first ten amendments to the Constitution are the…", "Bill of Rights", ["Articles of Confederation", "Federalist Papers", "Great Compromise"], "Added in 1791."],
  ["The Bill of Rights was added to protect…", "people's freedoms from the government", ["the king", "only the President", "taxes"], "Speech, religion and more."],
  ["An amendment is…", "a change or addition to the Constitution", ["a war", "a type of tax", "a court"], "Amend means change."],
  ["The Three-Fifths Compromise counted enslaved people as three-fifths of a person when deciding…", "how many representatives a state got", ["who could vote", "how tall people were", "who was free"], "It gave slave states more power.", true],
  ["Changing the Constitution is hard on purpose: an amendment needs approval from three-fourths of the…", "states", ["cities", "judges", "presidents"], "That's 38 of the 50 states today.", true],
];

const EARLY_REPUBLIC: Q[] = [
  ["The United States bought the Louisiana Territory from France in…", "1803", ["1776", "1819", "1861"], "It doubled the size of the country."],
  ["President Thomas Jefferson sent Meriwether Lewis and William Clark to explore the…", "Louisiana Territory and lands to the Pacific", ["Alabama coast", "Arctic", "Caribbean islands"], "The Corps of Discovery, 1804–1806."],
  ["Sacagawea, a Lemhi Shoshone woman, helped Lewis and Clark by…", "guiding, translating and helping them get horses", ["building their boats in Alabama", "selling them Louisiana", "writing the Constitution"], "She traveled with her baby son."],
  ["York, who traveled with Lewis and Clark, was…", "an enslaved man held by William Clark", ["the President", "a French king", "a ship's captain from Spain"], "He did the same hard work but was not free."],
  ["The Federal Road was built through Creek land to connect Georgia with…", "Mobile and the lands to the west", ["Maryland", "Boston", "the Pacific"], "It became a busy route for settlers."],
  ["The Federal Road changed life for the Muscogee (Creek) because it…", "brought many settlers and enslaved people onto their land", ["closed off their land", "was only for Creek travelers", "had no traffic"], "More settlers meant more pressure on Creek land."],
  ["Benjamin Hawkins was the US agent to the…", "Muscogee (Creek) Nation", ["French king", "British navy", "Spanish governor of Mexico"], "He pushed a 'plan of civilization'."],
  ["Hawkins's 'plan of civilization' pushed Creek families to…", "farm and live like American settlers", ["move to Spain", "build rockets", "stop farming"], "It pressured them to give up their ways."],
  ["One cause of the War of 1812 was that the British navy…", "forced American sailors to serve on British ships", ["paid American sailors", "gave the US Louisiana", "freed all ships"], "This was called impressment."],
  ["During the War of 1812, British troops burned…", "the White House", ["Mobile", "Montgomery", "the Alamo"], "In 1814, in Washington, D.C."],
  ["'The Star-Spangled Banner' was written during the British attack on…", "Fort McHenry", ["Fort Mims", "Fort Toulouse", "Fort Sumter"], "Francis Scott Key watched the flag still flying."],
  ["The Battle of New Orleans (1815) was won by American forces led by…", "Andrew Jackson", ["George Washington", "Thomas Jefferson", "Ulysses S. Grant"], "It made him a national hero."],
  ["The Creek War (1813–1814) began partly as a war among the Creeks themselves, between the Red Sticks and…", "Creeks who wanted peace with the United States", ["the French army", "the Spanish navy", "British settlers"], "A civil war that the US joined."],
  ["The Red Sticks were Creeks who…", "fought to stop American settlers from taking their land", ["wanted to join the US Army", "lived in Europe", "made red pottery only"], "They resisted American expansion."],
  ["The first battle of the Creek War, in July 1813, was the Battle of…", "Burnt Corn Creek", ["Horseshoe Bend", "Yorktown", "Mobile Bay"], "Militia attacked Red Sticks returning from Pensacola."],
  ["In August 1813, Red Sticks attacked and destroyed…", "Fort Mims", ["Fort Toulouse", "Fort McHenry", "Fort Condé"], "Hundreds of people inside were killed."],
  ["The last major battle of the Creek War, in March 1814, was the Battle of…", "Horseshoe Bend", ["Burnt Corn Creek", "New Orleans", "Saratoga"], "On a bend of the Tallapoosa River."],
  ["At Horseshoe Bend, Andrew Jackson's army, with Cherokee and Creek allies, defeated the Red Sticks led by…", "Menawa", ["Pushmataha", "Sequoyah", "Bienville"], "Menawa survived his wounds."],
  ["William Weatherford, also called Red Eagle, was a leader of the…", "Red Sticks", ["US Army", "British navy", "French settlers"], "He later surrendered to Jackson."],
  ["Pushmataha was a Choctaw leader who…", "fought alongside the United States in the Creek War", ["led the Red Sticks", "founded Mobile", "was a British general"], "The Choctaw sided with the US.", true],
  ["In the Treaty of Fort Jackson (1814), the Creek Nation was forced to give the US…", "about 23 million acres of land", ["nothing", "a few houses", "the city of Atlanta"], "Even Creeks who had fought for the US lost land."],
  ["After the Creek War, huge areas of Alabama opened to…", "white settlers and cotton planters", ["Spanish soldiers", "French traders", "no one"], "Settlers rushed in."],
  ["William McIntosh was a Creek leader who…", "fought with Jackson against the Red Sticks", ["led the attack on Fort Mims", "founded Huntsville", "was the first governor"], "He led Lower Creek warriors.", true],
  ["Fort Stoddert, built in 1799 north of Mobile, was a US fort near the border with…", "Spanish West Florida", ["Kentucky", "Mexico City", "Georgia"], "Mobile was still Spanish then.", true],
  ["The Creek War is part of the War of 1812 because…", "Britain and Spain supplied the Red Sticks while the US fought Britain", ["it happened in 1912", "it was fought in Canada", "France started it"], "Wars overlapped.", true],
];

const STATEHOOD: Q[] = [
  ["Alabama became a state on December 14 of…", "1819", ["1776", "1865", "1901"], "Just after the Creek War."],
  ["Alabama was the ___ state to join the United States.", "22nd", ["1st", "13th", "50th"], "In 1819."],
  ["'Alabama fever' was the rush of settlers who came to…", "buy cheap, rich land for growing cotton", ["mine gold", "find oil", "fish for whales"], "After 1815."],
  ["Before statehood, Alabama was part of a US territory. Alabama Territory's capital was…", "St. Stephens", ["Montgomery", "Birmingham", "Mobile"], "On the Tombigbee River."],
  ["Alabama's first state constitution was written in 1819 in…", "Huntsville", ["Montgomery", "Selma", "Dothan"], "Delegates met there that summer."],
  ["After Huntsville, Alabama's next capital was…", "Cahawba", ["Birmingham", "Mobile", "Gadsden"], "Where the Cahaba meets the Alabama River."],
  ["Cahawba stopped being the capital partly because it…", "often flooded", ["had no rivers", "was too cold", "was in Georgia"], "It was built in a low spot by two rivers."],
  ["From 1826 to 1846, Alabama's capital was…", "Tuscaloosa", ["Mobile", "Huntsville", "St. Stephens"], "On the Black Warrior River."],
  ["Since 1846, Alabama's capital has been…", "Montgomery", ["Tuscaloosa", "Cahawba", "Birmingham"], "More central, on the Alabama River."],
  ["Alabama's first governor was…", "William Wyatt Bibb", ["Andrew Jackson", "Jefferson Davis", "John Adams"], "He had been territorial governor."],
  ["When William Wyatt Bibb died in 1820, his brother became governor. His name was…", "Thomas Bibb", ["Israel Pickens", "William Rufus King", "John W. Walker"], "Bibb family."],
  ["William Rufus King of Alabama later became…", "Vice President of the United States", ["King of England", "President of the Confederacy", "first astronaut"], "In 1853."],
  ["John W. Walker led the 1819 convention that wrote Alabama's…", "first constitution", ["state song", "first railroad", "first newspaper"], "He then became a US senator."],
  ["Israel Pickens was Alabama's…", "third governor", ["first President", "first astronaut", "last territorial governor"], "He served after the Bibbs.", true],
  ["Why did people want the capital in a more central place?", "so lawmakers from every part of the state could reach it more easily", ["to be near the beach", "to hide it", "to be in another state"], "Travel was slow.", true],
  ["The University of Alabama was set up by the state in…", "1820", ["1492", "1776", "1950"], "Classes began in 1831 in Tuscaloosa."],
  ["Spring Hill College in Mobile, founded in 1830, is Alabama's oldest…", "college", ["fort", "railroad", "steel mill"], "It is still teaching students today."],
  ["Judson College in Marion was founded in 1838 for…", "women", ["soldiers", "sailors only", "astronauts"], "Women's education.", true],
  ["Small farmers who owned their own land and did their own work were called…", "yeoman farmers", ["planters", "governors", "sailors"], "Most white Alabamians farmed this way."],
  ["Wealthy planters in the Black Belt grew rich by…", "forcing enslaved people to grow cotton", ["mining gold", "selling cars", "building rockets"], "Their wealth came from enslaved labor."],
  ["Mobile grew into a busy port by shipping…", "cotton", ["oil", "cars", "computers"], "Bales went to factories in Britain and the North."],
  ["Daniel Pratt built a factory in Prattville that made…", "cotton gins", ["airplanes", "rockets", "phones"], "Alabama's early manufacturing.", true],
  ["Blacksmiths in Alabama towns made and fixed…", "tools, horseshoes and wagon parts", ["computers", "rockets", "radios"], "Iron work.", true],
  ["Barton Academy in Mobile became Alabama's first public school in…", "1852", ["1702", "1950", "2001"], "Public schools were new.", true],
  ["Alabama's 1819 constitution let all white men vote, but it…", "kept slavery and denied the vote to women and Black people", ["ended slavery", "let everyone vote", "let no one vote"], "Rights for some, not all.", true],
];

const COTTON_REMOVAL: Q[] = [
  ["Eli Whitney's cotton gin (1793) was a machine that…", "pulled seeds out of cotton quickly", ["picked cotton from fields", "wove cloth", "pumped water"], "Gin is short for engine."],
  ["The cotton gin made growing cotton more profitable, so slavery in Alabama…", "grew larger", ["ended at once", "stayed the same", "disappeared"], "Planters wanted more workers to grow more cotton."],
  ["Enslaved people in Alabama worked in cotton fields, homes and skilled trades such as…", "blacksmithing, carpentry and barrel making", ["flying planes", "driving trucks", "running banks"], "Many were highly skilled."],
  ["The domestic slave trade sold enslaved people from older states to Alabama, which often meant…", "families were torn apart", ["families were kept together", "people were paid well", "people could choose"], "Children, parents and spouses were separated."],
  ["Enslaved people kept their culture alive through…", "folktales, songs, foodways and faith", ["nothing", "only the owner's rules", "television"], "Culture was a form of strength."],
  ["The Indian Removal Act was signed in 1830 by President…", "Andrew Jackson", ["George Washington", "Abraham Lincoln", "Thomas Jefferson"], "He had fought the Red Sticks."],
  ["The Indian Removal Act led the US to force Native nations to move to…", "Indian Territory, in today's Oklahoma", ["Florida's beaches", "Canada", "Mexico City"], "West of the Mississippi."],
  ["The forced removal of the Cherokee and other nations is remembered as the…", "Trail of Tears", ["Oregon Trail", "Federal Road", "Underground Railroad"], "Thousands died on the way."],
  ["Which nations of Alabama were forced west in the 1830s?", "Muscogee (Creek), Cherokee, Choctaw and Chickasaw", ["Aztec and Inca", "French and Spanish", "Norse and Dutch"], "Four nations with homelands in Alabama."],
  ["Why did the US government push for Indian Removal?", "settlers wanted Native land for cotton farms", ["Native nations asked to leave", "the land was empty", "it was a law from England"], "Land for cotton."],
  ["The Second Creek War (1836) ended with…", "most Creek people forced west", ["Creek victory and statehood", "Spain taking Alabama", "the end of cotton"], "Some were moved in chains."],
  ["Many people died on the Trail of Tears from…", "hunger, cold and disease", ["too much food", "boredom", "car crashes"], "A cruel journey."],
  ["Some Native people stayed in Alabama, including the ancestors of the…", "Poarch Band of Creek Indians", ["Aztec Empire", "Inca Empire", "Spanish navy"], "They live near Atmore today."],
  ["The Choctaw lost their land in Alabama and Mississippi in the Treaty of Dancing Rabbit Creek in…", "1830", ["1776", "1865", "1901"], "The same year as the Removal Act.", true],
  ["The Seminole of Florida resisted removal by…", "fighting long wars", ["moving to Europe", "selling Florida", "building railroads"], "They held out for years.", true],
  ["Cherokee leaders went to the Supreme Court to protect their land, but…", "President Jackson did not enforce the ruling in their favor", ["the court refused to hear them", "they lost all rights in Europe", "Georgia gave them more land"], "Worcester v. Georgia (1832).", true],
  ["Steamboats on Alabama rivers helped the cotton economy by…", "carrying cotton bales to Mobile quickly", ["picking cotton", "planting seeds", "making cloth"], "River transport."],
  ["The telegraph, invented by Samuel Morse in the 1840s, let people…", "send messages over wires in minutes", ["fly across the ocean", "take photos from space", "travel by car"], "Dots and dashes."],
  ["Settlers going west in covered wagons followed trails such as the…", "Oregon Trail and Santa Fe Trail", ["Appalachian Trail", "Trail of Tears", "Erie Canal"], "Long journeys west."],
  ["The Mexican-American War (1846–1848) ended with the US gaining…", "a huge area of the Southwest", ["Alabama", "Cuba", "Hawaii"], "Including land as far as the Pacific."],
  ["The Gold Rush of 1849 drew thousands of people…", "west, hoping to get rich", ["to Alabama's coal mines", "to Europe", "to the Arctic"], "The forty-niners.", true],
  ["A steam locomotive is a…", "train engine powered by steam", ["sailing ship", "airplane", "car"], "Railroads grew in the 1800s."],
  ["The Conestoga wagon was a large covered wagon used to…", "haul goods and families over land", ["cross oceans", "fly", "dig mines"], "Pulled by horses or oxen.", true],
  ["In a 'slave state', slavery was…", "allowed by law", ["against the law", "rare and illegal", "only for one year"], "Alabama was a slave state."],
  ["In a 'free state', slavery was…", "not allowed by law", ["allowed everywhere", "required", "only in cities"], "States like Illinois and Ohio."],
];

/** States admitted 1812–1860 that name no other region an Alabama course leaves out. */
const ADMITTED: readonly (readonly [state: string, year: number, free: boolean])[] = [
  ["Louisiana", 1812, false],
  ["Indiana", 1816, true],
  ["Mississippi", 1817, false],
  ["Illinois", 1818, true],
  ["Alabama", 1819, false],
  ["Missouri", 1821, false],
  ["Arkansas", 1836, false],
  ["Michigan", 1837, true],
  ["Florida", 1845, false],
  ["Iowa", 1846, true],
  ["Wisconsin", 1848, true],
];

function freeOrSlave(): SortQuestion {
  const free = sample(ADMITTED.filter((s) => s[2]), 2);
  const slave = sample(ADMITTED.filter((s) => !s[2]), 2);
  const items = shuffle([...free, ...slave]).map(([state, year, isFree], i) => ({ id: `s${i}`, label: `${state} (${year})`, emoji: isFree ? "🗽" : "⛓️", bin: isFree ? "free" : "slave" }));
  return {
    kind: "sort",
    prompt: "Sort these states, admitted between 1812 and 1860, into free states and slave states.",
    hint: "Northern states like Illinois were free states; southern states like Mississippi were slave states.",
    bins: [
      { id: "free", label: "Free state", emoji: "🗽" },
      { id: "slave", label: "Slave state", emoji: "⛓️" },
    ],
    items: items.map((it) => ({ ...it, emoji: "🏛️" })),
  };
}

function admittedQuestion(): Question {
  const [state, year, free] = pick(ADMITTED);
  const label = free ? "a free state" : "a slave state";
  return {
    kind: "choice",
    prompt: `${state} joined the United States in ${year}. Did it join as a free state or a slave state?`,
    hint: free ? `Slavery was against the law in ${state} when it joined.` : `Slavery was allowed in ${state} when it joined.`,
    choices: [
      { id: "free", label: "a free state" },
      { id: "slave", label: "a slave state" },
    ],
    answer: label === "a free state" ? "free" : "slave",
  };
}

const CIVIL_WAR: Q[] = [
  ["The main cause of the Civil War was disagreement over…", "slavery and whether it could spread", ["fishing rights", "the price of tea", "a border with Mexico"], "Sectional divisions grew over slavery."],
  ["The Missouri Compromise (1820) tried to keep a balance between…", "free states and slave states", ["England and Spain", "farmers and sailors", "rivers and roads"], "Missouri came in as a slave state, with a free state to balance it."],
  ["Harriet Tubman escaped slavery and then guided others to freedom on the…", "Underground Railroad", ["Federal Road", "Oregon Trail", "transcontinental railroad"], "A secret network of routes and helpers."],
  ["Frederick Douglass, who escaped slavery, became famous for his…", "speeches and writing against slavery", ["inventions", "paintings of rivers", "army victories"], "He published a newspaper."],
  ["Harriet Beecher Stowe's novel Uncle Tom's Cabin (1852)…", "turned many Northerners against slavery", ["supported slavery", "was about the Revolution", "was banned everywhere in the North"], "A best-selling book."],
  ["Peter Still, enslaved in Alabama, bought his own freedom and later…", "worked to free his wife and children", ["became governor", "led the Confederate army", "sailed the Clotilda"], "His family was reunited in the North."],
  ["The Clotilda, in 1860, was the last known ship to bring kidnapped Africans to the United States. It landed near…", "Mobile", ["Huntsville", "Boston", "Charleston"], "Bringing Africans in had been illegal since 1808."],
  ["Bringing enslaved people from Africa into the US had been against the law since…", "1808", ["1492", "1865", "1950"], "The Clotilda broke this law."],
  ["The Supreme Court's Dred Scott decision (1857) said that Black Americans…", "could not be citizens", ["were free everywhere", "could vote", "must move to Africa"], "It angered many Northerners.", true],
  ["After Abraham Lincoln was elected President in 1860, Alabama…", "seceded, or left the Union, in January 1861", ["stayed loyal to the Union", "became a territory again", "joined Mexico"], "Many Southern states seceded."],
  ["The Confederate States of America was formed in February 1861 in…", "Montgomery", ["Mobile", "Birmingham", "Huntsville"], "Montgomery was its first capital."],
  ["Jefferson Davis became President of the Confederacy in a ceremony at the capitol in…", "Montgomery", ["Richmond", "Washington, D.C.", "Atlanta"], "February 18, 1861."],
  ["The Confederate capital moved from Montgomery to…", "Richmond, Virginia", ["Mobile", "New Orleans", "Washington, D.C."], "In 1861."],
  ["Many people in Winston County, in north Alabama, opposed secession, so it was nicknamed the…", "Free State of Winston", ["Heart of Dixie", "Magic City", "Rocket City"], "They met at Looney's Tavern in 1861."],
  ["The Civil War began in April 1861 when Confederate forces fired on…", "Fort Sumter", ["Fort Mims", "Fort Condé", "Fort McHenry"], "In South Carolina's harbor."],
  ["Lincoln's Emancipation Proclamation, which took effect January 1, 1863, declared…", "enslaved people in Confederate areas free", ["the war over", "Alabama a state", "a new tax"], "Freedom spread as Union armies advanced."],
  ["The Union victory at Vicksburg in 1863, led by Ulysses S. Grant, gave the Union control of the…", "Mississippi River", ["Tennessee River", "Atlantic Ocean", "Alabama River"], "It split the Confederacy in two."],
  ["The Battle of Gettysburg (1863) was fought in…", "Pennsylvania", ["Alabama", "Georgia", "Virginia"], "A turning point in the war."],
  ["In the Battle of Mobile Bay (1864), Union Admiral David Farragut…", "won control of the bay", ["lost his whole fleet", "captured Huntsville", "built Fort Toulouse"], "He sailed past the forts."],
  ["The Selma Ordnance and Naval Foundry made…", "cannons and ships for the Confederacy", ["cars", "rockets", "cotton gins"], "Selma was an important arsenal."],
  ["The First Alabama Cavalry was a regiment of Alabamians who fought for…", "the Union", ["the Confederacy", "Britain", "Spain"], "Not all Alabamians supported the Confederacy.", true],
  ["Many formerly enslaved men from Alabama joined the Union army as part of the…", "United States Colored Troops", ["Red Sticks", "Confederate navy", "British army"], "They fought for freedom.", true],
  ["Robert E. Lee surrendered to Ulysses S. Grant in April 1865 at…", "Appomattox Court House", ["Montgomery", "Mobile", "Gettysburg"], "In Virginia."],
  ["Days after the war ended, President Lincoln was…", "assassinated", ["elected again", "made king", "sent to Alabama"], "April 14, 1865."],
  ["Juneteenth celebrates June 19, 1865, when the news of freedom reached…", "some of the last enslaved people in the Confederacy", ["the President", "Britain", "the first colonists"], "It is now a national holiday."],
  ["During the war, many Alabama women…", "ran farms and businesses and nursed wounded soldiers", ["did nothing", "were all soldiers", "left for Europe"], "The home front.", true],
  ["Kate Cumming of Mobile is known for her work as a…", "nurse in Confederate hospitals", ["general", "steamboat captain", "senator"], "She kept a diary of her work.", true],
  ["In 1863, women in Mobile protested high food prices in the…", "bread riots", ["Boston Tea Party", "Gold Rush", "Freedom Rides"], "Food was scarce.", true],
  ["Wilson's Raid in 1865 was a Union cavalry raid that destroyed…", "factories and the arsenal at Selma", ["the Tennessee River", "Mobile Bay", "Fort Mims"], "Late in the war.", true],
  ["Robert Smalls, enslaved in South Carolina, won his freedom by…", "sailing a Confederate ship to the Union navy", ["buying a plantation", "becoming a Confederate general", "inventing the telegraph"], "He later served in Congress.", true],
];

const AFTER_WAR: Q[] = [
  ["The 13th Amendment (1865)…", "ended slavery in the United States", ["gave women the vote", "started the Civil War", "made Alabama a state"], "Freedom became the law of the land."],
  ["The 14th Amendment (1868) made formerly enslaved people…", "citizens with equal protection of the law", ["leave the country", "pay a special tax", "work for free"], "Citizenship."],
  ["The 15th Amendment (1870) said men could not be denied the vote because of…", "race", ["age", "height", "where they lived"], "Voting rights for Black men."],
  ["The Freedmen's Bureau helped formerly enslaved people by…", "setting up schools and helping with food and work contracts", ["sending them to Africa", "collecting taxes", "building rockets"], "A federal agency after the war."],
  ["Black Codes were laws passed after the war to…", "limit the freedom of Black Americans", ["protect voting rights", "build schools", "end segregation"], "They tried to keep control."],
  ["Alabama was readmitted to the United States in…", "1868", ["1819", "1901", "1965"], "After writing a new constitution."],
  ["During Reconstruction, Benjamin Turner of Selma became Alabama's first…", "Black member of Congress", ["governor", "astronaut", "Supreme Court justice"], "Elected in 1870."],
  ["James Rapier, a Black congressman from Alabama, worked for the…", "Civil Rights Act of 1875", ["Indian Removal Act", "Stamp Act", "Missouri Compromise"], "It banned discrimination in public places."],
  ["Horace King, who had been enslaved, was famous for building…", "bridges", ["rockets", "ships for Spain", "skyscrapers"], "He later served in the Alabama legislature."],
  ["Talladega College, founded in 1867, was one of Alabama's first colleges for…", "Black students", ["soldiers", "sailors", "farmers from Europe"], "Freedpeople built it with help."],
  ["Africatown, near Mobile, was founded by people who had been brought on the…", "Clotilda", ["Mayflower", "Titanic", "Santa María"], "They built their own community."],
  ["The founders of Africatown, such as Cudjo Lewis, built…", "homes, a church and a school", ["a castle", "a gold mine", "a fort"], "They worked together after slavery ended."],
  ["Sharecroppers farmed land owned by someone else and paid with…", "part of their crop", ["gold coins", "nothing", "their houses"], "Most stayed in debt."],
  ["Jim Crow laws were laws that…", "forced segregation of Black and white people", ["gave everyone equal rights", "ended slavery", "built railroads"], "Separate schools, trains and more."],
  ["In Plessy v. Ferguson (1896), the Supreme Court said segregation was allowed if it was…", "'separate but equal'", ["fair to everyone", "only in the North", "voted on by kids"], "In practice, it was not equal."],
  ["After Reconstruction ended, many Black Alabamians lost the right to vote because of…", "unfair rules and violence", ["new amendments", "moving to Europe", "a vote by women"], "Voting restrictions."],
  ["Under convict leasing, the state…", "rented prisoners to mines and companies as workers", ["freed all prisoners", "built schools in prisons", "paid prisoners well"], "Many prisoners died; most were Black men."],
  ["Birmingham was founded in 1871 and grew fast because nearby hills had…", "iron ore, coal and limestone for making iron and steel", ["gold", "oil", "silver"], "The Magic City."],
  ["After the war, many Alabama farmers began growing other crops besides cotton, such as…", "corn, peanuts and vegetables", ["coffee", "bananas", "rice paddies"], "Crop diversification."],
  ["Lumber and turpentine came from Alabama's…", "pine forests", ["coal mines", "beaches", "deserts"], "Timber industries."],
  ["Populists were farmers who joined together in the 1890s to demand…", "fairer prices and reforms", ["more slavery", "higher taxes on farmers", "no railroads"], "The People's Party.", true],
  ["The transcontinental railroad, finished in 1869, connected…", "the East and the West", ["Alabama and Florida", "the North and South Poles", "Europe and America"], "Golden spike in Utah."],
  ["The Chinese Exclusion Act (1882) was a law that…", "banned most Chinese immigrants", ["welcomed all immigrants", "gave land to immigrants", "ended slavery"], "Immigrants faced unfair treatment.", true],
  ["The Dawes Act (1887) and the land rushes took away land in Indian Territory from nations, including those removed from…", "Alabama", ["England", "Spain", "Hawaii"], "Removed nations lost land again.", true],
  ["The United States bought Alaska in 1867 from…", "Russia", ["Spain", "Britain", "France"], "Some called it 'Seward's Folly'."],
  ["After the Spanish-American War in 1898, the US gained Puerto Rico and…", "Guam", ["Alabama", "Louisiana", "Florida"], "Islands from Spain.", true],
  ["The Morrill Act gave states land to start colleges for farming and engineering, such as…", "Auburn", ["Spring Hill College", "Judson College", "Barton Academy"], "Land-grant colleges.", true],
  ["Maria Fearing, who had been enslaved, studied at Talladega College and became a…", "teacher and missionary", ["general", "governor", "sea captain"], "She taught in Africa.", true],
];

const TIMELINE: Dated[] = [
  ["Georgia, the last of the 13 colonies, is founded", 1732],
  ["The French and Indian War ends", 1763],
  ["The Stamp Act", 1765],
  ["The Boston Tea Party", 1773],
  ["The Declaration of Independence", 1776],
  ["Spain captures Mobile from Britain", 1780],
  ["The Treaty of Paris recognizes the United States", 1783],
  ["The Constitution is written", 1787],
  ["The Bill of Rights is added", 1791],
  ["The Louisiana Purchase", 1803],
  ["The Battle of Horseshoe Bend", 1814],
  ["Alabama becomes the 22nd state", 1819],
  ["The Indian Removal Act", 1830],
  ["Montgomery becomes the capital", 1846],
  ["The Clotilda lands near Mobile", 1860],
  ["The Confederacy is formed in Montgomery", 1861],
  ["The Emancipation Proclamation takes effect", 1863],
  ["The Civil War ends", 1865],
  ["Alabama is readmitted to the Union", 1868],
  ["Birmingham is founded", 1871],
  ["Plessy v. Ferguson", 1896],
];

const base = (id: string): Unit => from(OREGON_5, id);

export const UNITS: Unit[] = [
  copyOf(
    base("or-g5-thirteen-colonies"),
    {
      id: "al-g4-colonies",
      title: "Colonial Regions & Work",
      emoji: "🏘️",
      blurb: "Three regions, their founders and how people worked",
      parentNote: "The geography of the New England, Middle and Southern colonies, their founders, and colonial labor (apprenticeship, indentured servitude and slavery), with the triangular trade and the Middle Passage told plainly.",
      standards: ["4.1; 4.2; 4.3; 4.4", "the colonial regions and how geography shaped them, colonial labor systems and the slave trade, and contributions of groups in colonial America"],
    },
    COLONY_EXTRA,
  ),
  copyOf(
    base("or-g5-revolution"),
    {
      id: "al-g4-revolution",
      title: "The American Revolution",
      emoji: "🥁",
      blurb: "From the French and Indian War to independence",
      parentNote: "The French and Indian War and the protests that followed, key battles and people of the Revolution, the Declaration of Independence, the Spanish capture of Mobile, and the treaties that set the new nation's borders.",
      standards: ["4.5; 4.6", "the French and Indian War, the causes and key events of the American Revolution, events in Alabama, and the treaties that set US borders"],
    },
    REVOLUTION_EXTRA,
  ),
  copyOf(
    base("or-g5-constitution"),
    {
      id: "al-g4-constitution",
      title: "Building a Government",
      emoji: "📜",
      blurb: "The Articles, the Constitution and the Bill of Rights",
      parentNote: "Why the Articles of Confederation were replaced, Shays' Rebellion and the Constitutional Convention's compromises, the three branches of government, the Bill of Rights and how amendments change the Constitution.",
      standards: ["4.7", "the road to the Constitution, the three branches of government, the Bill of Rights and the amendment process"],
    },
    CONSTITUTION_EXTRA,
  ),
  bankUnit({
    id: "al-g4-creek-war",
    title: "The Federal Road & the Creek War",
    emoji: "🛤️",
    blurb: "Louisiana, the War of 1812 and Horseshoe Bend",
    parentNote: "The Louisiana Purchase and the Corps of Discovery, the Federal Road through Creek land, the War of 1812, and the causes, battles, leaders and results of the Creek War of 1813–1814 for the Muscogee (Creek) people and for Alabama.",
    standards: ["4.8; 4.9", "westward expansion, the Federal Road and its effects on Native Americans, the War of 1812 and the Creek War"],
    items: EARLY_REPUBLIC,
  }),
  bankUnit({
    id: "al-g4-statehood",
    title: "Alabama Fever & Statehood",
    emoji: "⭐",
    blurb: "A new state, its leaders and its moving capital",
    parentNote: "'Alabama fever' and statehood in 1819, Alabama's early leaders, why the capital moved from St. Stephens and Huntsville to Cahawba, Tuscaloosa and Montgomery, early schools and colleges, and how Alabamians earned a living before 1860.",
    standards: ["4.10; 4.12", "Alabama fever and statehood, early leaders and capitals, and economic life and education in Alabama before 1860"],
    items: STATEHOOD,
  }),
  bankUnit({
    id: "al-g4-cotton-removal",
    title: "Cotton, Slavery & Removal",
    emoji: "🌾",
    blurb: "King Cotton, enslaved lives and the Trail of Tears",
    parentNote: "How cotton and slavery grew in Alabama, the lives, work and culture of enslaved people and the harm of the domestic slave trade, Indian Removal and the Trail of Tears, and the trails and technology of westward expansion. Told plainly.",
    standards: ["4.11; 4.12", "US expansion before the Civil War, life for enslaved people in Alabama, and Indian Removal of the Muscogee Creek, Cherokee, Choctaw and Chickasaw"],
    items: COTTON_REMOVAL,
  }),
  mixUnit({
    id: "al-g4-free-slave-states",
    title: "Free States & Slave States",
    emoji: "⚖️",
    blurb: "New states from 1812 to 1860",
    parentNote: "Sorting the states admitted between 1812 and 1860 into free and slave states, and the growing nation's trails and technology.",
    standards: ["4.11", "states admitted between 1812 and 1860 as free or slave states, and factors in US expansion before the Civil War"],
    make: (d) => [freeOrSlave(), admittedQuestion(), admittedQuestion(), admittedQuestion(), ...fromItems(COTTON_REMOVAL.slice(16), 4, d)],
  }),
  bankUnit({
    id: "al-g4-civil-war",
    title: "Alabama & the Civil War",
    emoji: "⚔️",
    blurb: "Secession, war and freedom",
    parentNote: "How slavery divided the nation, abolitionists, the Clotilda, Alabama's role in forming the Confederacy and the Unionists of north Alabama, key battles in Alabama and the nation, the home front and the end of the war and slavery.",
    standards: ["4.13; 4.14", "how slavery led to the Civil War, Alabama's role in the Confederacy, key people and battles, and how the war affected Alabamians"],
    items: CIVIL_WAR,
  }),
  bankUnit({
    id: "al-g4-reconstruction",
    title: "Reconstruction & the Late 1800s",
    emoji: "🏗️",
    blurb: "New rights, Africatown, Jim Crow and growth",
    parentNote: "Reconstruction in Alabama (the 13th, 14th and 15th Amendments, Black officeholders, new schools and Africatown), the Jim Crow laws, sharecropping and voting restrictions that followed, the rise of Birmingham and new industries, and US expansion after the Civil War.",
    standards: ["4.15; 4.16; 4.17", "Reconstruction in Alabama, Jim Crow and economic change in the late 1800s, and US expansion after the Civil War"],
    items: AFTER_WAR,
  }),
  timelineUnit({
    id: "al-g4-timeline",
    title: "Colonies to 1900 Timeline",
    emoji: "🗓️",
    blurb: "Put Alabama and US history in order",
    parentNote: "Putting events from the colonies to 1900 in order, from Georgia's founding and the Revolution to Alabama statehood, the Civil War and Reconstruction.",
    standards: ["4.6; 4.10; 4.14; 4.15", "the order of key events in Alabama and US history from the colonies to 1900"],
    events: TIMELINE,
    items: STATEHOOD.slice(0, 13),
  }),
];
