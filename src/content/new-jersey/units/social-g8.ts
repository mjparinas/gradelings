import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { timelineUnit, type Dated } from "./kit";

// New Jersey Grade 8 social studies: New Jersey in United States history from the Revolution to Reconstruction, with
// slavery and its slow end in New Jersey told plainly and New Jersey's role in the Underground Railroad
// (6.1.8.HistoryCC.4.b, 6.1.8.CivicsDP.3.a, 6.1.8.HistoryUP.5.a), a timeline (6.1.8.HistoryCC.5.a), and how the
// Constitution was made, including the New Jersey and Virginia plans and the compromises that settled them
// (6.1.8.CivicsPI.3.d, 6.1.8.CivicsPD.3.a, 6.1.8.HistoryCC.3.d).

const NATION: Q[] = [
  ["In 1804, New Jersey passed a law that…", "ended slavery gradually", ["ended slavery at once", "made slavery legal forever"], "It was the last Northern state to pass such a law."],
  ["Under New Jersey's 1804 law, children born to enslaved mothers after July 4, 1804, were…", "freed only after serving until their twenties", ["freed at birth with no conditions", "enslaved for life"], "Men served until 25 and women until 21."],
  ["Because of the 1804 law's slow pace, New Jersey still had enslaved people as late as…", "the Civil War", ["1790", "1805"], "The 13th Amendment ended slavery there in 1865."],
  ["New Jersey's Underground Railroad routes ran from Cape May and Salem north toward…", "Jersey City and New York", ["Atlantic City casinos", "the Pacific Ocean"], "Freedom seekers moved from station to station."],
  ["William Still, who helped hundreds of freedom seekers in Philadelphia, was born in…", "Burlington County, New Jersey", ["London", "Georgia"], "He kept records of the people he helped."],
  ["Lawnside, in Camden County, has the Peter Mott House, a…", "stop on the Underground Railroad", ["colonial fort", "railroad factory"], "Peter Mott was a free Black farmer and preacher."],
  ["Harriet Tubman earned money for her rescue trips by working in…", "Cape May hotels", ["Newark factories", "Trenton's State House"], "She worked there in the early 1850s."],
  ["A New Jersey law in 1807 took the vote away from…", "women and Black men who had been voting", ["all men", "only governors"], "Only white men could vote after that."],
  ["In 1858, Lucy Stone of Orange, New Jersey, refused to pay her property taxes because…", "women could not vote", ["taxes were too low", "she lived in New York"], "She called it taxation without representation."],
  ["Dorothea Dix pushed New Jersey to build a hospital in Trenton for…", "people with mental illness", ["horses", "soldiers only"], "It opened in 1848."],
  ["Clara Barton started one of New Jersey's first free public schools in…", "Bordentown", ["Camden", "Paterson"], "It opened in 1852."],
  ["In the 1830s, the Camden and Amboy Railroad connected…", "New York and Philadelphia across New Jersey", ["New Jersey and Ohio", "Cape May and Canada"], "It was one of the first railroads in the country."],
  ["John A. Roebling's factory in Trenton made…", "wire rope for bridges", ["silk cloth", "glass bottles"], "Its cables later held up the Brooklyn Bridge."],
  ["Paterson's Rogers Locomotive Works built many…", "steam locomotives", ["sailing ships", "airplanes"], "Railroads across the nation used them."],
  ["In the 1840s and 1850s, many immigrants who came to work in New Jersey were from…", "Ireland and Germany", ["China and Japan only", "Mexico only"], "They dug canals and worked in mills."],
  ["During the Civil War, New Jersey fought for the…", "Union", ["Confederacy", "British"], "Tens of thousands of New Jerseyans served."],
  ["George McClellan, a Union general, later became…", "governor of New Jersey", ["President", "Chief Justice"], "He ran for President against Lincoln in 1864."],
  ["New Jersey at first voted against the 13th Amendment but approved it in…", "1866", ["1776", "1920"], "Opinions in the state were divided."],
  ["In 1870, Thomas Mundy Peterson of Perth Amboy became the first African American to…", "vote under the 15th Amendment", ["be elected President", "sign the Constitution"], "He voted in a local election."],
  ["The 14th Amendment promised…", "citizenship and equal protection of the laws", ["the right to bear arms", "free land for all"], "It was ratified in 1868."],
  ["Why did New Jersey's gradual end of slavery take so long?", "the law freed people slowly and only after years of service", ["it ended slavery overnight", "there was never slavery there"], "Gradual laws protected enslavers' interests.", true],
  ["Why were Underground Railroad stations kept secret?", "helping freedom seekers was against federal law after 1850", ["everyone agreed with it", "it was a sports club"], "The Fugitive Slave Act punished helpers.", true],
  ["Did the Declaration's ideal that 'all men are created equal' apply to everyone in New Jersey in 1810?", "no, women, Black people and Native Americans were left out", ["yes, to everyone equally", "only to children"], "Look at who could vote and who was free.", true],
  ["Why did New Jersey's factories help the Union win the war?", "they made weapons, cloth and locomotives", ["they closed during the war", "they made only toys"], "Industry was a big Northern advantage.", true],
  ["Why did canals and railroads make New Jersey important to the nation's economy?", "they linked the biggest cities and ports of the East", ["they ended trade", "they went nowhere"], "Location and transportation matter.", true],
  ["Why do historians compare sources from enslavers, freedom seekers and abolitionists?", "each shows a different point of view", ["they all say the same thing", "only one is true"], "Multiple perspectives give a fuller picture.", true],
];

const EVENTS: readonly Dated[] = [
  ["The Declaration of Independence is signed", 1776],
  ["The Articles of Confederation take effect", 1781],
  ["The Treaty of Paris ends the Revolution", 1783],
  ["The Constitutional Convention meets in Philadelphia", 1787],
  ["The Bill of Rights is ratified", 1791],
  ["The Louisiana Purchase", 1803],
  ["New Jersey's gradual abolition law", 1804],
  ["New Jersey takes the vote from women and Black men", 1807],
  ["The War of 1812 begins", 1812],
  ["The Missouri Compromise", 1820],
  ["The Indian Removal Act is passed", 1830],
  ["New Jersey's second state constitution", 1844],
  ["The Mexican-American War begins", 1846],
  ["The Fugitive Slave Act", 1850],
  ["The Kansas-Nebraska Act", 1854],
  ["The Dred Scott decision", 1857],
  ["Lincoln is elected President", 1860],
  ["The Civil War begins", 1861],
  ["The Emancipation Proclamation takes effect", 1863],
  ["The Civil War ends and the 13th Amendment is ratified", 1865],
  ["The 14th Amendment is ratified", 1868],
  ["Thomas Mundy Peterson votes under the 15th Amendment", 1870],
  ["Reconstruction ends", 1877],
];

const TIMELINE_ITEMS: Q[] = [
  ["How many years passed between the Declaration of Independence and New Jersey's gradual abolition law?", "28", ["18", "38"], "1804 − 1776 = 28."],
  ["Which came first, the Missouri Compromise or the Kansas-Nebraska Act?", "the Missouri Compromise", ["the Kansas-Nebraska Act", "they happened the same year"], "1820 comes before 1854."],
  ["The years 1861 to 1865 are the years of the…", "Civil War", ["American Revolution", "War of 1812"], "It began at Fort Sumter."],
  ["Reconstruction is the period after the Civil War, from 1865 to about…", "1877", ["1820", "1900"], "Federal troops left the South in 1877."],
  ["Which happened during Reconstruction?", "the 14th Amendment was ratified", ["the Bill of Rights was ratified", "the Battle of Trenton"], "Reconstruction ran from 1865 to 1877.", true],
  ["How many years passed between New Jersey's 1804 law and the 13th Amendment?", "61", ["51", "71"], "1865 − 1804 = 61.", true],
];

const CONSTITUTION: Q[] = [
  ["Under the Articles of Confederation, the national government could not…", "collect taxes", ["make treaties", "send ambassadors"], "It had to ask the states for money."],
  ["The Constitutional Convention met in Philadelphia in…", "1787", ["1776", "1812"], "Delegates came from 12 states."],
  ["The Virginia Plan wanted representation in Congress based on…", "each state's population", ["equal votes for every state", "the size of each state's army"], "James Madison helped write it."],
  ["The New Jersey Plan, offered by William Paterson, wanted…", "each state to have an equal vote", ["votes based on population", "no Congress at all"], "Small states liked it."],
  ["Which states favored the New Jersey Plan?", "small states", ["only the largest states", "foreign countries"], "They did not want to be outvoted."],
  ["The Great Compromise created a Congress with…", "a Senate with equal votes and a House based on population", ["one house only", "no elections"], "It blended both plans."],
  ["The Great Compromise is also called the…", "Connecticut Compromise", ["Missouri Compromise", "Compromise of 1850"], "Roger Sherman proposed it."],
  ["The Three-Fifths Compromise counted enslaved people as…", "three-fifths of a person for representation", ["full citizens with the vote", "not at all"], "It gave slaveholding states more seats."],
  ["Which New Jersey delegate was the youngest person to sign the Constitution?", "Jonathan Dayton", ["William Livingston", "Richard Stockton"], "He was 26."],
  ["William Paterson later served as governor of New Jersey and as a…", "Supreme Court justice", ["British general", "President"], "The city of Paterson is named after him."],
  ["People who supported the new Constitution were called…", "Federalists", ["Anti-Federalists", "Loyalists"], "They wanted a stronger national government."],
  ["Anti-Federalists worried that the Constitution…", "gave the national government too much power", ["gave states too much power", "had too many rights"], "They wanted a bill of rights."],
  ["The Federalist Papers were written to…", "persuade people to ratify the Constitution", ["start the Revolution", "end slavery"], "Hamilton, Madison and Jay wrote them."],
  ["New Jersey's delegates to its ratifying convention voted…", "unanimously to approve", ["to reject it", "to leave the Union"], "The new Senate gave small states equal power."],
  ["The first ten amendments to the Constitution are the…", "Bill of Rights", ["Articles of Confederation", "Federalist Papers"], "New Jersey approved them first."],
  ["Splitting power among three branches is called…", "separation of powers", ["federalism", "popular sovereignty"], "Legislative, executive and judicial."],
  ["Dividing power between the national and state governments is…", "federalism", ["monarchy", "separation of church and state"], "Both levels have their own jobs."],
  ["The idea that government gets its power from the people is…", "popular sovereignty", ["divine right of kings", "judicial review"], "It begins 'We the People.'"],
  ["Why did the New Jersey Plan matter even though it was not adopted?", "it led to equal votes for every state in the Senate", ["it was never discussed", "it created the presidency"], "Compromise used ideas from both plans.", true],
  ["Why were large states against the New Jersey Plan?", "they would have the same vote as states with far fewer people", ["they wanted fewer votes", "they had no people"], "Population mattered to them.", true],
  ["Why was compromise necessary at the Convention?", "states with different interests had to agree on one plan", ["everyone agreed at once", "the king ordered it"], "No side could win everything.", true],
  ["How did the Three-Fifths Compromise contradict the ideals of the Declaration?", "it treated enslaved people as less than full persons", ["it gave everyone equal rights", "it ended slavery"], "'All men are created equal' was not applied.", true],
  ["How did the Constitution fix the Articles' biggest weakness?", "it let Congress collect taxes and regulate trade", ["it removed Congress", "it gave states their own armies"], "A stronger national government could pay its debts.", true],
  ["Why did New Jersey ratify the Constitution so quickly?", "equal votes in the Senate and national trade rules helped a small state", ["it was forced by Britain", "it wanted to be its own country"], "New Jersey had been taxed by its neighbors' ports.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "nj-g8-new-jersey-and-nation",
    title: "New Jersey and the Nation",
    emoji: "🎖️",
    blurb: "From gradual abolition to Reconstruction",
    parentNote: "New Jersey in United States history from the early republic to Reconstruction: the 1804 gradual abolition law and its slow pace, the 1807 law that took the vote from women and Black men, the Underground Railroad in New Jersey, reformers, canals, railroads and factories, New Jersey in the Civil War, and the Reconstruction amendments.",
    standards: ["6.1.8.HistoryCC.4.b; 6.1.8.CivicsDP.3.a; 6.1.8.HistoryUP.5.a", "the growing resistance to slavery and New Jersey's role in the Underground Railroad, whether the Declaration's ideals were fulfilled for all, and the Reconstruction amendments"],
    items: NATION,
  }),
  timelineUnit({
    id: "nj-g8-us-timeline",
    title: "From Independence to Reconstruction",
    emoji: "📜",
    blurb: "Put the nation's and New Jersey's big moments in order",
    parentNote: "Ordering events in United States and New Jersey history from 1776 to 1877 (the founding, expansion, New Jersey's gradual abolition, the road to the Civil War, the war and Reconstruction) and working out how far apart they are.",
    standards: ["6.1.8.HistoryCC.5.a; 6.1.8.HistoryCC.3.d", "the causes and events that led to the Civil War, put in order, and the change from the Articles of Confederation to the Constitution"],
    events: EVENTS,
    items: TIMELINE_ITEMS,
  }),
  bankUnit({
    id: "nj-g8-new-jersey-plan",
    title: "The New Jersey Plan",
    emoji: "⚖️",
    blurb: "How compromise built the Constitution",
    parentNote: "How the Constitution was made: the weaknesses of the Articles of Confederation, the Virginia and New Jersey plans, the Great Compromise and the Three-Fifths Compromise (told plainly), New Jersey's signers, Federalists and Anti-Federalists, the principles of the Constitution and the Bill of Rights.",
    standards: ["6.1.8.CivicsPI.3.d; 6.1.8.CivicsPD.3.a; 6.1.8.HistoryCC.3.d", "the New Jersey and Virginia plans and the debate on representation, the compromises that created the Constitution, and how it changed the Articles of Confederation"],
    items: CONSTITUTION,
  }),
];
