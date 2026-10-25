import type { Unit } from "../../types";
import { SOCIAL_8 as CALIFORNIA_SOCIAL_8 } from "../../california/units/social-g8";
import { SOCIAL_8 as COLORADO_SOCIAL_8 } from "../../colorado/units/social-g8";
import { bankUnit, type Q } from "../own";
import { from, localCopy } from "./kit";

// Missouri Grade 8 social studies, American history to about 1870: Missouri copies of other states' units on rights
// and citizenship, the early republic and westward expansion, and Missouri's own unit on Missouri as the crossroads of
// the nation, from statehood to Reconstruction. Removal, slavery and war are told plainly.

const CROSSROADS: Q[] = [
  ["Missouri entered the Union in 1821 as a slave state under the…", "Missouri Compromise", ["Compromise of 1850", "Kansas-Nebraska Act", "Treaty of Paris"], "Maine entered as a free state."],
  ["The Missouri Compromise banned slavery in the rest of the Louisiana Purchase north of…", "36°30′ north latitude", ["the Ohio River", "the equator", "the Rocky Mountains"], "Missouri itself was the exception."],
  ["Why did the Missouri Compromise matter to the nation?", "it kept the balance of free and slave states for a time", ["it ended slavery everywhere", "it made Missouri a free state", "it started the Revolution"], "Balance in the Senate was the goal."],
  ["Wagon trains on the Oregon and Santa Fe trails outfitted in towns such as…", "Independence and Westport", ["Boston and Salem", "Charleston and Savannah", "Detroit and Toledo"], "Missouri was the jumping-off point for the West."],
  ["The Santa Fe Trail mainly carried…", "trade goods to and from Mexico's northern towns", ["mail to Europe", "troops to Canada", "cotton to England"], "It opened in 1821."],
  ["Steamboats on the Missouri and Mississippi rivers made St. Louis…", "a busy center of trade", ["a quiet farm town", "a mountain fort", "a fishing port on the ocean"], "Goods moved by river."],
  ["Many German immigrants who came to Missouri in the 1840s and 1850s…", "opposed slavery and supported the Union", ["supported the Confederacy", "moved back to Germany at once", "lived only in caves"], "They helped keep St. Louis in the Union."],
  ["Dred and Harriet Scott sued for their freedom in St. Louis because they had lived…", "in places where slavery was banned", ["in Europe", "on a ship", "in Missouri all their lives"], "They argued that made them free."],
  ["The Supreme Court's Dred Scott decision of 1857 said that…", "Black Americans could not be citizens and Congress could not ban slavery in territories", ["slavery was illegal everywhere", "Missouri must be a free state", "all territories were free"], "It overturned the Missouri Compromise line."],
  ["In the 1850s, violence broke out along the Missouri-Kansas border over…", "whether Kansas would allow slavery", ["fishing rights", "a railroad name", "the state bird"], "It was called Bleeding Kansas."],
  ["The Pony Express, which started in St. Joseph in 1860, carried…", "mail on horseback to the West", ["cattle", "steamboats", "telegraph poles only"], "The telegraph replaced it in 1861."],
  ["In 1861, Union troops stopped pro-Confederate militia from seizing the arsenal in…", "St. Louis", ["Kansas City", "Hannibal", "Springfield"], "It helped keep Missouri in the Union."],
  ["During the Civil War, Missouri had more battles and skirmishes than any state except…", "Virginia and Tennessee", ["Maine and Vermont", "Iowa and Minnesota", "Florida and Texas"], "Much of it was guerrilla fighting."],
  ["Missouri abolished slavery by a state convention in…", "January 1865", ["1821", "1776", "1900"], "It came before the 13th Amendment."],
  ["After the war, Black Union veterans founded a school in Jefferson City that became…", "Lincoln University", ["Harvard", "the Naval Academy", "West Point"], "It opened in 1866."],
  ["During Reconstruction, Missouri's 1865 constitution required oaths that…", "kept many former Confederate supporters from voting", ["gave everyone the vote", "ended all elections", "banned schools"], "It was called the Ironclad Oath.", true],
  ["Why was Missouri's location important in the Civil War?", "it controlled key rivers and routes to the West", ["it had the largest navy", "it was on the Atlantic coast", "it had no rivers"], "Rivers carried troops and supplies.", true],
  ["Why did Missouri's border-state status make the war especially hard on families?", "neighbors and relatives often supported different sides", ["no one cared about the war", "the war never reached Missouri", "everyone agreed"], "Divided loyalties led to raids.", true],
  ["General Order No. 11 in 1863 forced thousands of people in western Missouri to…", "leave their homes", ["join the navy", "move to St. Louis to vote", "build railroads"], "The Union order targeted guerrilla support.", true],
  ["The Osage gave up their remaining land in Missouri in treaties in 1808 and…", "1825", ["1776", "1865", "1904"], "Settlers pressed onto their lands.", true],
  ["Why did so many settlers heading west buy supplies in Missouri?", "it was the last place on the river with big stores and outfitters", ["the West had more stores", "Missouri sold only maps", "the trails started in Boston"], "Location made Missouri a gateway.", true],
  ["How did railroads arriving in Kansas City after the war change it?", "it grew into a major trade and cattle center", ["it became a ghost town", "it lost all its people", "nothing changed"], "Railroads connected markets.", true],
  ["George Caleb Bingham, a Missouri painter, is known for paintings of…", "river life and elections", ["outer space", "ocean storms", "European castles"], "His art shows life in early Missouri.", true],
  ["James Milton Turner, born enslaved in St. Louis, later worked to…", "open schools for Black children in Missouri", ["build steamboats", "close schools", "lead the Confederate army"], "He became a US diplomat to Liberia.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "mo-g8-missouri-crossroads",
    title: "Missouri, Crossroads of a Nation",
    emoji: "🧭",
    blurb: "From the Missouri Compromise to Reconstruction",
    parentNote: "Missouri's place in American history from 1821 to about 1870: the Missouri Compromise, the trails west, the Dred Scott case, the border war with Kansas, Missouri as a divided border state in the Civil War, and Reconstruction.",
    standards: ["6-8.AH.4.G.B; 6-8.AH.5.CC.A; 6-8.AH.5.CC.B; 6-8.AH.5.CC.C", "westward expansion, the compromises over slavery, the conflicts that divided the nation and the Civil War, seen from Missouri"],
    items: CROSSROADS,
  }),
  localCopy(
    from(COLORADO_SOCIAL_8, "co-g8-rights-citizenship"),
    "mo-g8-rights-citizenship",
    ["6-8.AH.3.GS.F; 6-8.AH.4.GS.A", "the Bill of Rights, and how voting and citizenship rights expanded"],
    [
      ["The Dred Scott decision said Black Americans could not be citizens. Which amendment overturned it?", "the 14th Amendment", ["the 1st Amendment", "the 2nd Amendment", "the 10th Amendment"], "It made all people born in the US citizens."],
      ["The 15th Amendment said the right to vote could not be denied because of…", "race", ["age", "height", "where you were born in a state"], "It was ratified in 1870."],
      ["Which amendment ended slavery in the United States?", "the 13th Amendment", ["the 19th Amendment", "the 5th Amendment", "the 26th Amendment"], "It was ratified in 1865."],
      ["Virginia Minor of St. Louis argued in court that the 14th Amendment gave women the right to…", "vote", ["own ships", "serve as president", "skip taxes"], "The Supreme Court disagreed in 1875."],
      ["Women won the right to vote nationwide with the…", "19th Amendment", ["13th Amendment", "1st Amendment", "15th Amendment"], "It was ratified in 1920.", true],
    ],
    {
      parentNote:
        "The Declaration of Independence, the Constitution (the Preamble, branches, checks and balances, federalism and amending it), the Bill of Rights, rule of law and judicial review, the Reconstruction amendments, and how the meaning of citizenship changed for Black Americans and women.",
    },
  ),
  localCopy(
    from(CALIFORNIA_SOCIAL_8, "ca-g8-early-republic"),
    "mo-g8-early-republic",
    ["6-8.AH.4.EC.B; 6-8.AH.4.PC.C", "the economy, inventions and culture of the early republic"],
    [
      ["Steamboats on the Mississippi made trade faster because they could travel…", "upstream against the current", ["only downstream", "only on the ocean", "on land"], "Steam engines powered them."],
      ["The cotton gin, invented by Eli Whitney, led to…", "more cotton farming and more slavery in the South", ["the end of farming", "the end of slavery", "fewer plantations"], "Cotton became very profitable."],
      ["Mark Twain, who grew up in Hannibal, later wrote about life on the…", "Mississippi River", ["Atlantic Ocean", "Great Lakes", "Rocky Mountains"], "Huckleberry Finn floats down it."],
      ["The Erie Canal, opened in 1825, connected the Great Lakes to the…", "Hudson River and the Atlantic", ["Pacific Ocean", "Gulf of Mexico", "Missouri River"], "Canals lowered shipping costs."],
      ["Andrew Jackson fought against the Second Bank of the United States because he thought it…", "gave too much power to wealthy people", ["helped farmers too much", "was too small", "printed no money"], "He vetoed its new charter.", true],
    ],
    {
      blurb: "Banks, books and inventions",
      parentNote:
        "Capitalism and its conflicts, such as Jackson's fight with the National Bank and the tariff debates, new inventions such as the steamboat and the cotton gin, and American art and writing from Noah Webster to Emerson, Thoreau and Mark Twain.",
    },
  ),
  localCopy(
    from(CALIFORNIA_SOCIAL_8, "ca-g8-westward"),
    "mo-g8-westward",
    ["6-8.AH.4.CC.A; 6-8.AH.4.G.B; 6-8.AH.4.CC.C", "westward expansion, Manifest Destiny and its effects on the people who lived in the West"],
    [
      ["Manifest Destiny was the belief that the United States should…", "spread across North America to the Pacific", ["stay east of the Appalachians", "return land to Britain", "end all trade"], "Many Americans believed it in the 1840s."],
      ["The Indian Removal Act of 1830 forced many eastern nations to move…", "west of the Mississippi River", ["to Europe", "to the Atlantic coast", "to Canada"], "The Cherokee were marched west on the Trail of Tears."],
      ["The Cherokee forced west in 1838 and 1839 crossed which state?", "Missouri", ["Maine", "Michigan", "Florida"], "The Trail of Tears crossed southern Missouri."],
      ["Wagon trains on the trail to the Northwest often left from…", "Independence, Missouri", ["New York City", "New Orleans", "Chicago"], "It was the start of the Oregon Trail."],
      ["The Mexican-American War of 1846 to 1848 ended with the United States gaining…", "much of the Southwest", ["Florida", "Alaska", "Louisiana"], "Mexico lost about half its land.", true],
      ["Missouri traders on the Santa Fe Trail carried cloth, tools and other goods to…", "Santa Fe, then part of Mexico", ["Boston", "London", "Havana"], "They came back with silver and mules."],
      ["Settlers moving west in covered wagons traveled about…", "15 miles a day", ["500 miles a day", "1 mile a year", "100 miles an hour"], "The trip took months."],
      ["Why did many families risk the long trip west?", "to find farmland and new opportunities", ["to escape the ocean", "because the East had no people", "to visit Europe"], "Cheap land drew settlers.", true],
    ],
    {
      parentNote:
        "Jackson and the forced removal of eastern nations, the Trail of Tears across Missouri, Manifest Destiny and the trails west from Missouri, Texas and the Mexican-American War, and the Gold Rush, told accurately for the people who moved and the nations who lost their lands.",
    },
  ),
];
