import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Tennessee Grade 8 social studies: Tennessee in United States history, from the Cumberland Gap and statehood under the
// 1796 constitution (8.14, 8.31) to Jacksonian democracy, removal and the 1834 constitution (8.38 to 8.41), and the
// Civil War, Andrew Johnson and the 1870 constitution (8.63, 8.71, 8.72). Removal and the loss of voting rights are told
// plainly; the Cherokee Nation is a living nation today.

const JACKSON: Q[] = [
  ["Why was the Cumberland Gap so important to the settling of Tennessee and Kentucky?", "it was a natural pass through the Appalachians that thousands of settlers used", ["it was a seaport", "it was the first state capital"], "Mountains blocked most other routes."],
  ["Tennessee became a state in 1796 after the Southwest Territory showed it had…", "more than 60,000 people", ["a navy", "a king's approval"], "This followed the Northwest Ordinance's rule."],
  ["Tennessee's first constitution, in 1796, let men vote if they…", "owned property or had lived in a county for six months", ["were over 50", "were born in Britain"], "It was more open than many states at the time."],
  ["The 1796 constitution allowed free Black men who met the requirements to…", "vote", ["serve as governor", "own no property"], "This right was taken away in 1834."],
  ["In the election of 1824, Andrew Jackson won the most popular votes but…", "the House of Representatives chose John Quincy Adams", ["he refused to run", "the Senate made him king"], "No one had a majority of electoral votes."],
  ["Jackson's supporters called the 1824 result a corrupt bargain because…", "Henry Clay backed Adams and then became Secretary of State", ["Adams paid voters", "the votes were never counted"], "They thought it was a deal."],
  ["In 1828, Andrew Jackson won the presidency with support from…", "many newly eligible common voters", ["only bankers", "the British government"], "States had dropped property rules for white men."],
  ["Jacksonian Democracy is the idea that…", "government should answer to ordinary citizens", ["only the rich should vote", "the President should be a king"], "Jackson saw himself as a man of the people."],
  ["The spoils system means…", "giving government jobs to political supporters", ["dividing land among soldiers", "taxing spoiled food"], "To the victor belong the spoils."],
  ["Jackson fought the Bank of the United States because he believed it…", "gave too much power to wealthy elites", ["was too small", "belonged to Tennessee"], "He vetoed its new charter."],
  ["In the Nullification Crisis, South Carolina claimed a state could…", "refuse to follow a federal law", ["leave the solar system", "make its own money"], "It was about a tariff."],
  ["How did Jackson respond to nullification?", "he said he would enforce federal law, with force if needed", ["he let South Carolina leave", "he resigned"], "A compromise tariff ended the crisis."],
  ["The Indian Removal Act of 1830 gave the President power to…", "trade lands in the West for American Indian homelands in the East", ["give citizenship to all nations", "end the Bank"], "Removal followed."],
  ["In Worcester v. Georgia (1832), the Supreme Court ruled that…", "Georgia's laws had no force inside the Cherokee Nation", ["the Cherokee had to move at once", "Georgia could take Cherokee land"], "Chief Justice John Marshall wrote it."],
  ["After Worcester v. Georgia, the Cherokee were still removed because…", "the government did not enforce the ruling", ["the Cherokee agreed to leave", "the ruling was erased"], "A small group signed the Treaty of New Echota."],
  ["Principal Chief John Ross led the Cherokee in…", "petitioning Congress and challenging removal in court", ["leading the Union army", "founding Nashville"], "Most Cherokee rejected the removal treaty."],
  ["About how many Cherokee died during removal on the Trail of Tears?", "about 4,000", ["about 40", "none"], "Many died of disease and cold."],
  ["Tennessee's constitution of 1834 removed the property requirement for voting, which…", "let more white men vote", ["let women vote", "let everyone 16 and older vote"], "It expanded voting to non-property owners."],
  ["Tennessee's constitution of 1834 took away the right to vote from…", "free African American men", ["landowners", "soldiers"], "Their vote was not restored until 1867."],
  ["Which Tennessean, a close ally of Jackson, became President in 1845?", "James K. Polk", ["Andrew Johnson", "Sam Houston"], "He was called Young Hickory.", true],
  ["Why is the 1834 constitution described as both expanding and narrowing democracy?", "it opened voting to more white men but shut out free Black men", ["it gave everyone the vote", "it ended all elections"], "Look at who gained and who lost.", true],
  ["How did the spoils system change government?", "officials were replaced after elections by party loyalists", ["officials served for life", "jobs were filled by lottery"], "Critics said skill mattered less than loyalty.", true],
  ["Why was Jackson's view on Worcester v. Georgia significant for the balance of power?", "the executive branch did not carry out a Supreme Court ruling", ["Congress overruled the court", "the court enforced its own ruling"], "Courts depend on others to enforce rulings.", true],
  ["Red Clay, in southeast Tennessee, was…", "the seat of the Cherokee government before removal", ["Jackson's home", "a Union fort"], "Councils met there in the 1830s.", true],
  ["How did westward expansion lead to Tennessee's statehood?", "settlers poured over the mountains until the territory had enough people to apply", ["Spain gave Tennessee to the US in 1796", "Tennessee was one of the first thirteen colonies"], "Population growth was the key.", true],
];

const DIVIDED: Q[] = [
  ["After Fort Sumter in April 1861, Tennessee…", "voted to leave the Union in June 1861", ["joined the Union army at once", "stayed neutral throughout"], "Earlier in 1861, voters had rejected a convention."],
  ["Tennessee was the last state to…", "secede and join the Confederacy", ["join the Union", "free enslaved people"], "It left in June 1861."],
  ["Which part of Tennessee voted strongly against secession?", "East Tennessee", ["West Tennessee", "Middle Tennessee"], "Many joined the Union army."],
  ["Why did East Tennessee mostly oppose secession?", "it had smaller farms and fewer enslavers", ["it was full of cotton plantations", "it was part of Virginia"], "Its economy differed from the west."],
  ["Andrew Johnson, from Greeneville, was the only Southern senator who…", "stayed loyal to the Union when his state seceded", ["joined the Confederacy first", "became a general"], "Lincoln later made him military governor of Tennessee."],
  ["Andrew Johnson became President in 1865 when…", "Abraham Lincoln was assassinated", ["he won a war", "Congress removed Lincoln"], "He had been Vice President."],
  ["Johnson's Reconstruction plan was mild toward the South. The Radical Republicans wanted…", "stronger protections for freed people", ["no changes at all", "slavery to return"], "They clashed over civil rights."],
  ["The House of Representatives impeached Andrew Johnson in 1868. Impeachment means…", "formally charging an official with wrongdoing", ["removing them at once", "electing them again"], "The Senate holds the trial."],
  ["The Senate's vote to remove Johnson failed by…", "one vote", ["fifty votes", "no votes at all"], "He finished his term."],
  ["Why does Johnson's impeachment matter today?", "it set a model for how Congress checks a President", ["it ended the Civil War", "it made Tennessee a territory"], "Checks and balances at work."],
  ["Tennessee was the first former Confederate state to…", "ratify the 14th Amendment and rejoin the Union", ["reject all amendments", "leave the Union again"], "It returned in July 1866."],
  ["Tennessee's constitution of 1870 said that…", "all men 21 and older could vote", ["only property owners could vote", "women could vote"], "This included Black men."],
  ["Tennessee's constitution of 1870 also allowed…", "a poll tax", ["a state king", "a national bank"], "A poll tax is a fee to vote."],
  ["How did the poll tax affect voting in Tennessee?", "it kept many poor and Black citizens from voting", ["it gave voters money", "it had no effect"], "Later laws used it to restrict votes."],
  ["Tennessee's constitution of 1870 is still…", "the state's constitution today, with amendments", ["unwritten", "replaced every year"], "It has been amended many times."],
  ["Which Tennessee battle in early 1862 gave the Union control of the Cumberland River?", "Fort Donelson", ["Franklin", "Gettysburg"], "Grant demanded unconditional surrender.", true],
  ["Nashville was captured by the Union in February 1862. It was the first…", "Confederate state capital to fall", ["city to secede", "battle of the war"], "It stayed in Union hands.", true],
  ["Why were Tennessee's rivers and railroads so important in the war?", "they moved troops and supplies into the Deep South", ["they carried tourists", "they had no use"], "Chattanooga was a rail hub.", true],
  ["How did Johnson and the Radical Republicans differ on the 14th Amendment?", "Johnson opposed it; the Radicals pushed it through", ["both opposed it", "both wrote it together"], "It made freed people citizens.", true],
  ["Why did Tennessee escape military rule under the Reconstruction Acts?", "it had already ratified the 14th Amendment and been readmitted", ["it had no army", "it was never in the Confederacy"], "It returned before the Acts passed.", true],
  ["Governor William Brownlow, a Unionist from East Tennessee, pushed for…", "Black men's right to vote in Tennessee in 1867", ["secession", "the poll tax"], "Tennessee was early to do so.", true],
  ["How was Tennessee's experience in the war different from most Confederate states?", "many Tennesseans fought for the Union", ["no battles were fought there", "it never seceded"], "Tennessee supplied soldiers to both sides.", true],
  ["Which describes the vote of February 1861 in Tennessee?", "voters rejected calling a convention on secession", ["voters chose to secede", "voters chose to join Canada"], "Fort Sumter changed many minds.", true],
  ["What did the 1870 constitution say about schools?", "they had to be segregated by race", ["they had to close", "they were for boys only"], "Segregation was written into law.", true],
  ["How did the 1870 constitution show both gains and losses for Black Tennesseans?", "it kept their right to vote but allowed a poll tax that limited it", ["it ended all voting", "it gave everyone land"], "Weigh both parts.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "tn-g8-jacksonian-tennessee",
    title: "Tennessee & Jacksonian America",
    emoji: "🏛️",
    blurb: "Statehood, Jackson, removal and the vote",
    parentNote:
      "The Cumberland Gap and Tennessee's statehood under the 1796 constitution, the elections of 1824 and 1828, Jacksonian Democracy and the spoils system, the Bank War and the Nullification Crisis, the Indian Removal Act, Worcester v. Georgia and the Trail of Tears, told plainly, and how Tennessee's 1834 constitution opened voting to more white men while taking it from free Black men.",
    standards: ["8.14; 8.31; 8.38; 8.39; 8.40; 8.41", "the Cumberland Gap and statehood, Jacksonian Democracy, Indian removal, and voting rights under the 1834 constitution"],
    items: JACKSON,
  }),
  bankUnit({
    id: "tn-g8-divided-tennessee",
    title: "Tennessee Divided & Rebuilt",
    emoji: "⚖️",
    blurb: "Secession, Andrew Johnson and 1870",
    parentNote:
      "Tennessee's struggle over secession after Fort Sumter and its divided loyalties, Andrew Johnson's clash with the Radical Republicans and his impeachment, Tennessee's early readmission, and the 1870 constitution's vote for all men alongside its poll tax and segregated schools.",
    standards: ["8.63; 8.71; 8.72", "Tennessee's decision to secede, the 1870 constitution, and Andrew Johnson's conflict with the Radical Republicans and his impeachment"],
    items: DIVIDED,
  }),
];
