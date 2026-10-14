import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Arkansas's own Grade 8 social studies units (`ar-` ids), for Arkansas History: Arkansas in the Civil War and
// Reconstruction (H.1.ARH.4, H.1.ARH.5), Arkansas in the twentieth century, from World War I and the Elaine Massacre to
// the Great Depression, World War II and the Little Rock Nine (H.1.ARH.6 to H.1.ARH.12), and Arkansas's economy and
// state government today (E.1.ARH.1 to E.1.ARH.5, C.1.ARH.1 to C.1.ARH.3). Hard history is told plainly and
// factually; no business is named by brand.

const WAR: Q[] = [
  ["In February 1861, Arkansas state troops took over the federal…", "arsenal in Little Rock", ["mint in Hot Springs", "navy yard in Helena", "fort in Boston"], "Union soldiers left without a fight."],
  ["In March 1861, Arkansas's secession convention first voted to…", "stay in the Union", ["join Mexico", "leave the Union at once", "free all enslaved people"], "Many Arkansans hoped to avoid war."],
  ["Arkansas voted to secede on May 6, 1861, after…", "Fort Sumter and Lincoln's call for troops", ["the Battle of Gettysburg", "the end of the war", "the Louisiana Purchase"], "Arkansas would not send soldiers to fight the South."],
  ["During the Civil War, many people in the Ozarks of northwest Arkansas…", "supported the Union", ["owned large cotton plantations", "moved to Europe", "did not hear about the war"], "Loyalties were split."],
  ["A major Civil War battle fought in northwest Arkansas in March 1862 was the Battle of…", "Pea Ridge", ["Gettysburg", "Bunker Hill", "Saratoga"], "In Benton County, in the northwest."],
  ["Who won the Battle of Pea Ridge?", "the Union", ["the Confederacy", "Mexico", "Great Britain"], "It helped keep Missouri in Union hands."],
  ["In December 1862, Union and Confederate armies fought in northwest Arkansas at the Battle of…", "Prairie Grove", ["Yorktown", "Shiloh", "Bull Run"], "Near Fayetteville."],
  ["On July 4, 1863, the same day Vicksburg surrendered, Union troops won the Battle of…", "Helena", ["Pea Ridge", "Antietam", "Saratoga"], "On the Mississippi River in Arkansas."],
  ["Union troops captured Little Rock in…", "September 1863", ["April 1861", "June 1836", "May 1865"], "The Confederate state government moved to southwest Arkansas."],
  ["Control of the Mississippi and Arkansas Rivers mattered in the war because…", "armies used rivers to move troops and supplies", ["rivers stopped all fighting", "no boats could use them", "rivers were the borders of Mexico"], "Rivers were highways."],
  ["In April 1865, the steamboat Sultana exploded on the Mississippi River near Memphis, killing more than 1,100 people, mostly…", "Union soldiers going home from prison camps", ["Confederate generals", "gold miners", "French traders"], "The worst steamboat disaster in US history."],
  ["The Freedmen's Bureau helped formerly enslaved Arkansans by…", "starting schools and helping with work contracts", ["sending them back to slavery", "building forts", "collecting their land"], "Created by Congress in 1865."],
  ["Under sharecropping, a farmer worked someone else's land and paid with…", "a share of the crop", ["gold coins", "nothing at all", "a house"], "Debts often kept families poor."],
  ["Arkansas was readmitted to the Union in…", "1868", ["1836", "1861", "1900"], "After writing a new constitution."],
  ["During Reconstruction, Black men in Arkansas gained the right to…", "vote and hold office", ["own railroads only", "be governor for life", "skip taxes"], "Some were elected to the legislature."],
  ["In 1874, a fight over who had won the election for governor led to the…", "Brooks-Baxter War", ["Civil War", "Mexican-American War", "War of 1812"], "Two men both claimed to be governor."],
  ["Arkansas's Constitution of 1874 is important because it…", "is still Arkansas's constitution today", ["ended the Civil War", "made Arkansas a territory", "was written by France"], "It has been amended many times."],
  ["Laws that kept Black and white people apart after Reconstruction were called…", "Jim Crow laws", ["the Bill of Rights", "the Homestead Act", "the Freedmen's laws"], "Segregation laws."],
  ["In 1891, Arkansas passed a law requiring separate train cars for Black and white passengers. This is an example of…", "a Jim Crow law", ["a Reconstruction amendment", "a treaty", "a tariff"], "Segregation by law."],
  ["Why did many Arkansans have split loyalties during the Civil War?", "Some regions depended on slavery and cotton, while others had small farms", ["Everyone agreed", "No one lived in Arkansas", "The war was fought in Europe"], "Highlands and Delta were different.", true],
  ["The poll tax, added to the Arkansas Constitution in 1892, made people…", "pay a fee to vote, which kept many poor and Black citizens from voting", ["vote twice", "get paid to vote", "vote at age 12"], "A barrier to voting.", true],
  ["In 1864, Union soldiers on the Camden Expedition fought in south Arkansas at battles such as…", "Poison Spring and Jenkins' Ferry", ["Lexington and Concord", "Bull Run and Antietam", "Trenton and Princeton"], "Part of the Red River Campaign.", true],
  ["After the Brooks-Baxter War, President Ulysses S. Grant…", "recognized Elisha Baxter as governor", ["became governor of Arkansas", "sent Arkansas back to Spain", "ended all elections"], "The dispute ended in 1874.", true],
  ["Why did Arkansas write a new constitution in 1868?", "Congress required it before Arkansas could rejoin the Union", ["Spain asked for it", "The 1836 constitution was lost", "To make Arkansas a territory again"], "Part of Reconstruction.", true],
];

const MODERN: Q[] = [
  ["During World War I, soldiers trained at Camp Pike near…", "Little Rock", ["Fort Smith", "Texarkana", "Hot Springs"], "Today it is Camp Joseph T. Robinson."],
  ["The flu pandemic of 1918 in Arkansas…", "killed thousands of Arkansans", ["did not reach Arkansas", "only affected animals", "ended World War I"], "A worldwide disease."],
  ["In 1919, after Black sharecroppers in Phillips County met to organize for fair pay, white mobs killed many Black people. This is called the…", "Elaine Massacre", ["Brooks-Baxter War", "Battle of Helena", "Flood of 1927"], "One of the deadliest racial attacks in US history."],
  ["In 1917, Arkansas let women vote in primary elections, and in 1919 it ratified the…", "19th Amendment", ["13th Amendment", "2nd Amendment", "26th Amendment"], "Women's suffrage."],
  ["Hattie Caraway of Arkansas became, in 1932, the first woman…", "elected to the US Senate", ["to be president", "to fly across the ocean", "to be a Supreme Court justice"], "She served until 1945."],
  ["The Flood of 1927 left many Arkansas families…", "homeless, living in camps on high ground", ["rich from gold", "living on the ocean", "without any rain"], "Water covered much of eastern Arkansas."],
  ["During the Great Depression, many Arkansas farmers struggled because…", "crop prices fell very low", ["they grew too little rice to eat", "there was too much money", "factories paid too much"], "Cotton sold for very little."],
  ["In 1931, hungry farmers in the town of England, Arkansas, gathered to demand…", "food for their families", ["a new railroad", "statehood", "a new flag"], "After the drought of 1930."],
  ["The Civilian Conservation Corps (CCC) was a New Deal program that in Arkansas…", "built state parks, trails and cabins", ["built rockets", "fought in Europe", "sold cotton overseas"], "Petit Jean and Devil's Den State Parks."],
  ["The Southern Tenant Farmers' Union, started in 1934 in Tyronza, Arkansas, was unusual because it…", "brought Black and white sharecroppers together", ["was run by bankers", "was only for factory owners", "was a sports league"], "Working together for fair treatment."],
  ["During World War II, Japanese Americans were forced into camps at Rohwer and…", "Jerome, in southeast Arkansas", ["Hot Springs", "Fayetteville", "Little Rock"], "Families held behind barbed wire."],
  ["During World War II, many Arkansas women worked in…", "war plants, such as the ordnance plant at Jacksonville", ["the US Senate only", "space stations", "gold mines"], "Making supplies for the war."],
  ["In 1957, nine Black students integrated Little Rock's…", "Central High School", ["Old State House", "Arkansas Post", "Hot Springs bathhouses"], "They are called the Little Rock Nine."],
  ["The Supreme Court decision that ruled school segregation unconstitutional in 1954 was…", "Brown v. Board of Education", ["Plessy v. Ferguson", "Marbury v. Madison", "Dred Scott v. Sandford"], "Little Rock's schools had to follow it."],
  ["Which Arkansas governor used the National Guard to keep the Little Rock Nine out of Central High?", "Orval Faubus", ["Bill Clinton", "James S. Conway", "Winthrop Rockefeller"], "September 1957."],
  ["President Eisenhower sent soldiers of the ___ to protect the Little Rock Nine.", "101st Airborne Division", ["Navy SEALs", "Coast Guard", "Royal Navy"], "Federal troops enforced the court's order."],
  ["Daisy Bates helped the Little Rock Nine as…", "president of the Arkansas NAACP and a newspaper publisher", ["governor of Arkansas", "the school principal", "president of the United States"], "She advised and supported the students."],
  ["In 1958, Ernest Green became the first Black student to…", "graduate from Central High School", ["be elected governor", "play in the World Series", "walk on the moon"], "One of the Little Rock Nine."],
  ["In 1958–59, Little Rock's public high schools were closed for a year. This is called the…", "Lost Year", ["Dust Bowl", "Great Migration", "Gilded Age"], "Leaders closed schools instead of integrating.", true],
  ["In Cooper v. Aaron (1958), about Little Rock, the Supreme Court ruled that states…", "must obey the Supreme Court's decisions", ["can ignore federal courts", "can close all schools", "can secede"], "The Constitution is the supreme law.", true],
  ["In 1955, before Little Rock, the small Arkansas town of ___ peacefully integrated its schools.", "Hoxie", ["Elaine", "England", "Rohwer"], "A town in northeast Arkansas.", true],
  ["Bill Clinton, a governor of Arkansas, became president of the United States in…", "1993", ["1957", "1836", "2017"], "The 42nd president.", true],
  ["Why did many Black families leave Arkansas farms for northern cities in the early 1900s?", "to escape Jim Crow and find better jobs", ["because the North was warmer", "to find gold", "because farms paid too much"], "Part of the Great Migration.", true],
  ["Why did Winthrop Rockefeller's election as governor in 1966 surprise many people?", "He was the first Republican elected governor of Arkansas since Reconstruction", ["He was the youngest president", "He was from France", "He never ran for office"], "Arkansas had elected only Democrats for decades.", true],
];

const TODAY: Q[] = [
  ["Arkansas's official nickname is…", "The Natural State", ["The Garden State", "The Empire State", "The Sunshine State"], "Forests, rivers and mountains."],
  ["Arkansas grows more of which crop than any other state?", "rice", ["cotton candy", "pineapples", "oranges"], "Most comes from the Delta."],
  ["Arkansas is one of the top states for raising…", "chickens for meat (broilers)", ["penguins", "kangaroos", "camels"], "Poultry farms are common in the north and west."],
  ["Forests cover about ___ of Arkansas.", "half", ["none", "all", "one tenth"], "Timber is a big industry."],
  ["The pine forests of south Arkansas support which industry?", "timber and paper", ["fishing", "gold mining", "space travel"], "Trees are a renewable resource."],
  ["Oil was discovered near El Dorado in 1921, causing a…", "boom, as thousands of people rushed to the area", ["flood", "war", "drought"], "Oil wells changed south Arkansas."],
  ["Tourists visit Arkansas for places such as…", "Hot Springs, the Buffalo River and the Ozarks", ["Mount Rushmore", "Old Faithful in Yellowstone", "the Everglades"], "Outdoor fun brings visitors."],
  ["Which interstate highway crosses Arkansas from east to west, through Little Rock?", "I-40", ["I-95", "I-5", "I-90"], "It links Memphis and Fort Smith."],
  ["Arkansas is home to several of the nation's largest trucking companies because it is…", "in the center of the country, near major highways", ["on the Pacific Ocean", "near the North Pole", "an island"], "Good location for shipping."],
  ["Businesses started in Arkansas that grew to sell around the world show the importance of…", "entrepreneurs", ["tariffs", "earthquakes", "glaciers"], "People who start businesses."],
  ["Arkansas's state constitution was written in…", "1874", ["1776", "1836", "1957"], "It is still in use."],
  ["Like the US government, Arkansas's government has…", "three branches: legislative, executive and judicial", ["one branch", "two branches", "five branches"], "Separation of powers."],
  ["Arkansas's lawmaking body is called the…", "General Assembly", ["Congress", "Parliament", "Supreme Court"], "It meets in Little Rock."],
  ["The Arkansas Senate has how many members?", "35", ["2", "100", "435"], "Smaller than the House."],
  ["The Arkansas House of Representatives has how many members?", "100", ["35", "50", "435"], "A round number."],
  ["The head of Arkansas's executive branch is the…", "governor", ["mayor", "chief justice", "speaker"], "Elected for 4 years."],
  ["Unlike US Supreme Court justices, Arkansas Supreme Court justices are…", "elected by voters", ["appointed for life", "chosen by the president", "chosen by lottery"], "Nonpartisan elections."],
  ["In Arkansas, voters can change the state constitution by…", "approving amendments on the ballot", ["writing to the king", "asking the president", "nothing; it can never change"], "Voter-approved amendments.", true],
  ["How many votes does the Arkansas General Assembly need to override a governor's veto?", "a simple majority of each house", ["two-thirds of each house", "every member", "a vote of the people"], "Lower than in Congress.", true],
  ["Arkansas limits how many terms a governor can serve. This is called…", "term limits", ["a filibuster", "a veto", "a tariff"], "Two four-year terms.", true],
  ["Amendment 88 to the Arkansas Constitution protects the right to…", "hunt, fish and trap wildlife", ["own a castle", "skip school", "drive at any age"], "Passed by voters in 2010.", true],
  ["Arkansas produces most of the nation's bromine, a chemical used in…", "fire retardants and medicines", ["chocolate", "paper money", "glass windows"], "Pumped from brine wells in south Arkansas.", true],
  ["The McClellan-Kerr Navigation System helps Arkansas's economy by letting barges…", "ship farm goods and products to the Mississippi River", ["cross the ocean", "fly cargo", "drill for oil"], "Cheap river shipping.", true],
  ["Why has Northwest Arkansas grown so quickly in recent decades?", "large companies and new jobs drew people there", ["it became a seaport", "a gold rush began", "the Delta moved north"], "Jobs are a pull factor.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ar-g8-civil-war",
    title: "Arkansas in the Civil War",
    emoji: "⚔️",
    blurb: "Secession, battles and Reconstruction",
    parentNote:
      "Arkansas in the Civil War and Reconstruction: the Little Rock arsenal, secession on May 6, 1861, split loyalties, the battles of Pea Ridge, Prairie Grove and Helena, the fall of Little Rock, the Sultana disaster, the Freedmen's Bureau and sharecropping, the Brooks-Baxter War, the Constitution of 1874 and the Jim Crow laws that followed.",
    standards: ["H.1.ARH.4; H.1.ARH.5", "Arkansas in the Civil War, emancipation and Reconstruction"],
    items: WAR,
  }),
  bankUnit({
    id: "ar-g8-twentieth-century",
    title: "Arkansas in the 1900s",
    emoji: "🏫",
    blurb: "Floods, hard times and the Little Rock Nine",
    parentNote:
      "Arkansas in the twentieth century: World War I and the 1918 flu, the Elaine Massacre, women's suffrage and Hattie Caraway, the Flood of 1927, the Great Depression and the New Deal, World War II, and the Civil Rights Movement, including the Little Rock Nine at Central High School in 1957.",
    standards: ["H.1.ARH.6; H.1.ARH.7; H.1.ARH.9; H.1.ARH.10; H.1.ARH.11; H.1.ARH.12", "Arkansas in the twentieth century, from World War I to the Civil Rights Movement"],
    items: MODERN,
  }),
  bankUnit({
    id: "ar-g8-arkansas-today",
    title: "Arkansas at Work & in Government",
    emoji: "🏛️",
    blurb: "Rice, timber, trucks and the General Assembly",
    parentNote:
      "Arkansas's economy and government today: agriculture, poultry, timber, oil, natural gas and bromine, tourism and transportation, entrepreneurs, and the three branches of state government under the Constitution of 1874, including how it differs from the US Constitution.",
    standards: ["E.1.ARH.1; E.1.ARH.2; E.1.ARH.5; C.1.ARH.1; C.1.ARH.2", "Arkansas's resources and industries, and the three branches of state government"],
    items: TODAY,
  }),
];
