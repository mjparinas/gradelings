import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Washington, DC Grade 7 social studies, "United States History I" (the DC Social Studies Standards, 2023): the
// debate over the capital's location and the Compromise of 1790 (7.41), George Washington's presidency and legacy, as a
// leader who gave up power and as an enslaver (7.42), the peaceful transfer of power from 1800 on (7.46), and the lives
// of enslaved and free Black Washingtonians to 1877, how they won freedom during the Civil War, and Reconstruction in the
// District (7.57; 7.69; 7.73). The rest of the course, from Indigenous nations and the colonies to Reconstruction, is
// practised with adopted units (see ../plan/social.ts).

const CAPITAL: Q[] = [
  ["In the Compromise of 1790, Southern leaders got the capital on the Potomac and, in return, Alexander Hamilton got…", "the federal government to take on the states' war debts", ["a new state", "a king", "the Louisiana Purchase"], "The deal was made over dinner with Jefferson and Madison."],
  ["Before the capital moved to the Potomac, Congress met in New York City and then in…", "Philadelphia", ["Boston", "Charleston", "Richmond"], "Philadelphia was the capital from 1790 to 1800."],
  ["Article I of the Constitution gives Congress power over a federal district of up to…", "10 miles square", ["100 miles square", "1 mile square", "50 miles square"], "The District was laid out as a 10-mile square."],
  ["Southern leaders wanted the capital on the Potomac partly because it was near…", "the farms and plantations of the South", ["the Great Lakes", "the Pacific Ocean", "the Rocky Mountains"], "It sat between North and South."],
  ["Placing the capital in a slaveholding region meant that slavery was…", "legal in the nation's capital", ["banned there from the start", "unknown there", "only in Philadelphia"], "Slave markets operated near the Capitol."],
  ["George Washington set an example for future presidents by…", "stepping down after two terms", ["becoming king", "serving for life", "refusing to be inaugurated"], "Leaving power willingly was rare at the time."],
  ["Washington's legacy includes leading the new nation and also…", "enslaving more than 100 people at Mount Vernon", ["freeing everyone in Virginia", "banning slavery in DC", "writing the Emancipation Act"], "His will freed the people he held after Martha's death."],
  ["In his Farewell Address, Washington warned Americans about the dangers of…", "political parties dividing the nation", ["trains", "the telephone", "too many states"], "He also warned against permanent foreign alliances."],
  ["The election of 1800 was the first time power passed peacefully from one party to another, when John Adams lost to…", "Thomas Jefferson", ["George Washington", "Abraham Lincoln", "Andrew Jackson"], "Adams was a Federalist; Jefferson a Democratic-Republican."],
  ["Why is a peaceful transfer of power important?", "it lets voters change leaders without violence", ["it keeps one party forever", "it ends all elections", "it gives power to the army"], "Losers accept the result."],
  ["In 1835, a white mob attacked Black-owned businesses and schools in DC in what was called the…", "Snow Riot", ["Pearl escape", "Bonus March", "Boston Massacre"], "It was named after a restaurant owner, Beverly Snow."],
  ["In 1850, Congress ended the slave trade, but not slavery, in DC as part of the…", "Compromise of 1850", ["Missouri Compromise", "Compromise of 1790", "Three-Fifths Compromise"], "People could still be enslaved there."],
  ["Free Black Washingtonians before the Civil War often had to carry…", "papers proving they were free", ["passports to Europe", "hunting licenses", "train tickets"], "Without them they could be jailed or sold."],
  ["The DC Compensated Emancipation Act of April 16, 1862 freed about…", "3,100 people", ["31 people", "310,000 people", "3 million people"], "Slaveholders were paid; freed people were not."],
  ["During the Civil War, many enslaved people freed themselves by…", "escaping to Union lines", ["staying silent", "joining the Confederate army", "moving to Europe"], "They were called contrabands at first."],
  ["The US Colored Troops included soldiers from DC. About how many Black soldiers served in the Union army and navy?", "about 200,000", ["about 2,000", "about 20", "about 2 million"], "They helped win the war."],
  ["Many freed people who came to DC during the war lived in…", "contraband camps", ["hotels", "the White House", "castles"], "Conditions were often hard."],
  ["After the Civil War, the Freedmen's Bureau helped freed people find…", "schools, work and land", ["gold mines", "ships to Europe", "seats in the Senate only"], "It was based in DC.", true],
  ["In 1867, Congress gave Black men in DC the right to vote, three years before the…", "15th Amendment", ["Bill of Rights", "13th Amendment", "19th Amendment"], "It was a test for the nation.", true],
  ["Under Reconstruction, the District had an elected territorial government from 1871 to…", "1874", ["1790", "1973", "2001"], "Congress then put appointed commissioners in charge.", true],
  ["Frederick Douglass served in DC as a…", "US Marshal and Recorder of Deeds", ["mayor", "senator", "Supreme Court justice"], "He was also an adviser to presidents.", true],
  ["The election of 1876 was disputed and settled by the Compromise of 1877, which…", "ended Reconstruction in the South", ["started the Civil War", "made DC a state", "freed people in DC"], "Federal troops left the South.", true],
  ["Why did leaders choose a district rather than an existing city for the capital?", "so no single state would control the government", ["to be close to the Pacific", "because cities were banned", "to avoid having a Congress"], "Congress had been chased from Philadelphia by unpaid soldiers in 1783.", true],
  ["Benjamin Banneker wrote to Thomas Jefferson in 1791 to point out the contradiction between…", "the Declaration's ideals and slavery", ["two map projections", "two rivers", "two calendars"], "Banneker sent Jefferson his almanac.", true],
  ["Alexandria, once part of the District, was returned to Virginia in 1846 partly because people there feared Congress would…", "end the slave trade in DC", ["build a canal", "move the capital", "raise the Potomac"], "Alexandria had a large slave market.", true],
  ["Which is the best primary source for the lives of enslaved Washingtonians in 1862?", "petitions filed under the DC Emancipation Act", ["a modern movie", "a textbook from 2020", "a novel set in space"], "The petitions list names, ages and stories.", true],
];

export const SOCIAL_7: Unit[] = [
  bankUnit({
    id: "dc-g7-capital-of-a-new-nation",
    title: "Capital of a New Nation",
    emoji: "🏛️",
    blurb: "The capital's location, Washington's legacy and freedom in DC to 1877",
    parentNote: "The debate and compromise that put the capital on the Potomac in 1790, George Washington's legacy as a leader who gave up power and as an enslaver, the first peaceful transfer of power in 1800, the lives of enslaved and free Black Washingtonians, the end of the slave trade in DC in 1850 and of slavery there in 1862, how enslaved people freed themselves during the Civil War, and Reconstruction in the District.",
    standards: ["7.41; 7.42; 7.46; 7.57; 7.69; 7.73", "the debate over the capital's location, Washington's presidency and legacy, peaceful transfers of power, the lives of enslaved and free Black Americans, emancipation and Reconstruction"],
    items: CAPITAL,
  }),
];
