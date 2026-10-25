import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Tennessee Grade 3 social studies: Tennessee in the growing nation, from the War of 1812 and the Tennessee Volunteers
// to Andrew Jackson's presidency, the Indian Removal Act and the Trail of Tears, and James K. Polk and Manifest Destiny
// (3.28, 3.29, 3.31). Removal is told plainly; the Cherokee Nation and other nations are living communities today.

const VOLUNTEERS: Q[] = [
  ["Tennessee is called the Volunteer State partly because so many Tennesseans volunteered to fight in the…", "War of 1812", ["Revolutionary War", "Civil War"], "They answered the call to help."],
  ["The War of 1812 was fought between the United States and…", "Great Britain", ["France", "Spain"], "It was the second war with Britain."],
  ["Which Tennessean led American soldiers at the Battle of New Orleans in 1815?", "Andrew Jackson", ["James K. Polk", "Davy Crockett"], "He later became President."],
  ["The Battle of New Orleans made Andrew Jackson…", "a national hero", ["a king", "a British general"], "Americans celebrated the win."],
  ["Andrew Jackson's home near Nashville is called…", "the Hermitage", ["the White House", "Monticello"], "Visitors can tour it today."],
  ["Andrew Jackson became the… President of the United States.", "seventh", ["first", "sixteenth"], "He took office in 1829."],
  ["The Indian Removal Act of 1830 let the government…", "force American Indian nations to move west", ["build new schools in Tennessee", "end the War of 1812"], "Nations lost their homelands."],
  ["The forced removal of the Cherokee to the West in 1838 and 1839 is called the…", "Trail of Tears", ["Oregon Trail", "Natchez Trace"], "Thousands of people died on the way."],
  ["Where were the Cherokee and other nations forced to move?", "Indian Territory, in what is now Oklahoma", ["Canada", "Florida"], "It was west of the Mississippi River."],
  ["Why is it called the Trail of Tears?", "people suffered and thousands died", ["it rained every day", "it was a happy trip"], "It was a great injustice."],
  ["Which nation's homeland included East Tennessee before removal?", "the Cherokee Nation", ["the Aztec Empire", "the Inca Empire"], "The Cherokee Nation is a living nation today."],
  ["Today, the Cherokee Nation's capital is in…", "Tahlequah, Oklahoma", ["Nashville, Tennessee", "Paris, France"], "The nation governs itself today."],
  ["James K. Polk, the 11th President, was from…", "Tennessee", ["Virginia", "Massachusetts"], "He grew up in Middle Tennessee."],
  ["Manifest Destiny was the belief that the United States should…", "spread across North America to the Pacific", ["stay only on the East Coast", "join Great Britain"], "Polk believed in it."],
  ["Under President Polk, the United States fought a war with…", "Mexico", ["Canada", "Japan"], "It was 1846 to 1848."],
  ["After the war with Mexico, the United States gained land that includes today's…", "California and much of the Southwest", ["Florida", "Maine"], "The country reached the Pacific."],
  ["How many Presidents came from Tennessee before 1870?", "3", ["1", "7"], "Jackson, Polk and Andrew Johnson.", true],
  ["Many Tennesseans volunteered again to fight in the war with Mexico, so the nickname…", "stuck even more", ["was dropped", "changed to the Mountain State"], "Thousands more volunteers came.", true],
  ["Why did many settlers want American Indian lands in the Southeast?", "for farms and gold", ["to build airports", "to make national parks"], "Land was valuable for cotton.", true],
  ["John Ross was a leader of the Cherokee who…", "fought removal in the courts and in Congress", ["sold all Cherokee land for himself", "led the British army"], "He tried peaceful ways.", true],
  ["Red Clay in southeast Tennessee was the last place the Cherokee government met before…", "removal", ["the American Revolution", "statehood"], "Today it is a state historic park.", true],
  ["Which describes President Jackson's view of removal?", "he supported forcing nations west", ["he stopped all removal", "he moved the capital to Oklahoma"], "He signed the Indian Removal Act.", true],
  ["Polk settled a dispute with Britain that added the Oregon Country to the United States in…", "1846", ["1776", "1812"], "This was part of Manifest Destiny.", true],
  ["How did Manifest Destiny affect American Indian nations?", "they lost more land as settlers moved west", ["they gained more land", "nothing changed for them"], "Expansion pushed nations off their lands.", true],
  ["Put in order: War of 1812, Indian Removal Act, Mexican-American War. Which came second?", "the Indian Removal Act", ["the War of 1812", "the Mexican-American War"], "1812, 1830, 1846.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "tn-g3-volunteer-state",
    title: "Tennessee in a Growing Nation",
    emoji: "🎖️",
    blurb: "Volunteers, Jackson, the Trail of Tears and Polk",
    parentNote:
      "The Tennessee Volunteers in the War of 1812 and Andrew Jackson at New Orleans, Jackson's presidency and the Indian Removal Act and Trail of Tears, told plainly, with the Cherokee Nation as a living nation today, and James K. Polk, Manifest Destiny and westward expansion.",
    standards: ["3.28; 3.29; 3.31", "the War of 1812 and the Tennessee Volunteers, Andrew Jackson's presidency and the Trail of Tears, and Polk and Manifest Destiny"],
    items: VOLUNTEERS,
  }),
];
