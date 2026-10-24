import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { timelineUnit, type Dated } from "./kit";

// Illinois Grade 8 social studies: Illinois in United States history from statehood to Reconstruction (SS.6-8.H.1 to
// H.4), with a timeline, and the United States and Illinois constitutions every Illinois student must pass a test on
// before graduating, usually in 8th grade (105 ILCS 5/27-3; SS.6-8.CV.1 to CV.4).

const NATION: Q[] = [
  ["The Northwest Ordinance of 1787 affected Illinois by…", "banning slavery in the Northwest Territory", ["making Illinois part of Spain", "creating the state of Illinois"], "Illinois was carved from the Northwest Territory."],
  ["Illinois entered the Union as a free state in…", "1818", ["1787", "1861"], "It was the 21st state."],
  ["Illinois's Black Laws…", "restricted the rights of free Black residents", ["ended slavery everywhere", "gave Black residents the vote"], "They were repealed in 1865."],
  ["In 1824, Illinois voters rejected a call for a convention that could have…", "allowed slavery in the state", ["moved the capital to Chicago", "made Illinois two states"], "The vote kept Illinois a free state."],
  ["Elijah Lovejoy, an abolitionist newspaper editor, was killed in 1837 by a mob in…", "Alton", ["Springfield", "Galena"], "He defended his printing press."],
  ["Owen Lovejoy's home in Princeton was a stop on the…", "Underground Railroad", ["Pony Express", "Erie Canal"], "Freedom seekers hid there on their way north."],
  ["The Underground Railroad was…", "a network of people who helped freedom seekers escape slavery", ["a train under Chicago", "a road to the gold fields"], "It was secret and dangerous."],
  ["Stephen Douglas of Illinois wrote the Kansas-Nebraska Act of 1854, which…", "let settlers vote on allowing slavery", ["banned slavery everywhere", "made Kansas part of Illinois"], "It was called popular sovereignty."],
  ["In his 1858 House Divided speech in Springfield, Lincoln said the nation could not…", "endure half slave and half free", ["grow any larger", "build more railroads"], "He spoke as he began his Senate race."],
  ["The Lincoln–Douglas debates of 1858 were held during a race for…", "the US Senate", ["President", "governor of Illinois"], "There were seven debates across Illinois."],
  ["Who won the 1858 Senate race?", "Stephen Douglas", ["Abraham Lincoln", "Ulysses S. Grant"], "The General Assembly chose senators then."],
  ["The Republican Party nominated Lincoln for President in 1860 at a convention in…", "Chicago", ["Springfield", "Philadelphia"], "The hall was called the Wigwam."],
  ["About how many Illinois soldiers served in the Union army?", "about 250,000", ["about 2,500", "about 2.5 million"], "Illinois sent more soldiers than most states."],
  ["Camp Douglas in Chicago held…", "Confederate prisoners of war", ["Union generals", "the state legislature"], "Thousands died there from disease."],
  ["Which Illinoisan led the Union armies to victory?", "Ulysses S. Grant", ["Stephen Douglas", "Elijah Lovejoy"], "He lived in Galena before the war."],
  ["John Jones, a Black business owner in Chicago, campaigned to…", "repeal Illinois's Black Laws", ["build the canal", "move the capital"], "He wrote a pamphlet against them."],
  ["After Lincoln was killed in 1865, he was buried in…", "Springfield", ["Washington, D.C.", "Chicago"], "His tomb is in Oak Ridge Cemetery."],
  ["The 13th Amendment…", "abolished slavery", ["gave women the vote", "created income tax"], "Illinois ratified it first."],
  ["The 14th Amendment promised…", "citizenship and equal protection of the laws", ["the right to bear arms", "an end to Prohibition"], "It was ratified in 1868."],
  ["The 15th Amendment said the right to vote could not be denied because of…", "race", ["age", "income"], "It was ratified in 1870."],
  ["Why did the Kansas-Nebraska Act anger many people in Illinois?", "it could open new territories to slavery", ["it closed all railroads", "it raised taxes on corn"], "It broke the Missouri Compromise line.", true],
  ["Why did Lincoln lose the 1858 race but become famous anyway?", "newspapers spread his debate arguments across the country", ["he won a war that year", "he became governor"], "The debates were printed nationwide.", true],
  ["Why did the Union want to control the Mississippi River at Cairo?", "it was where the Ohio and Mississippi rivers meet", ["it had gold mines", "it was the capital"], "Rivers moved troops and supplies.", true],
  ["How did Illinois's laws toward Black residents change after the Civil War?", "the Black Laws were repealed in 1865", ["the Black Laws got stricter", "nothing changed"], "Activists like John Jones pushed for repeal.", true],
  ["A diary of an Illinois soldier is useful to historians because…", "it shows one person's experience of the war", ["it covers every battle", "it has no point of view"], "Every primary source has a perspective.", true],
  ["Why do historians compare newspaper reports of the Lincoln–Douglas debates?", "each newspaper favored one side", ["they were identical", "only one newspaper existed"], "Check sources for bias.", true],
];

const EVENTS: readonly Dated[] = [
  ["The Declaration of Independence is signed", 1776],
  ["The Northwest Ordinance bans slavery in the territory", 1787],
  ["The Bill of Rights is ratified", 1791],
  ["The Louisiana Purchase", 1803],
  ["Illinois becomes a state", 1818],
  ["The Missouri Compromise", 1820],
  ["Illinois voters reject a pro-slavery convention", 1824],
  ["The Indian Removal Act is passed", 1830],
  ["Elijah Lovejoy is killed in Alton", 1837],
  ["The Mexican-American War begins", 1846],
  ["The Illinois and Michigan Canal opens", 1848],
  ["The Kansas-Nebraska Act", 1854],
  ["The Dred Scott decision", 1857],
  ["The Lincoln–Douglas debates", 1858],
  ["Lincoln is elected President", 1860],
  ["The Civil War begins", 1861],
  ["The Emancipation Proclamation takes effect", 1863],
  ["The Civil War ends and Illinois repeals its Black Laws", 1865],
  ["The 14th Amendment is ratified", 1868],
  ["The transcontinental railroad is completed", 1869],
  ["The 15th Amendment is ratified", 1870],
  ["Reconstruction ends", 1877],
];

const TIMELINE_ITEMS: Q[] = [
  ["How many years passed between the Declaration of Independence and Illinois statehood?", "42", ["32", "52"], "1818 − 1776 = 42."],
  ["Which came first, the Missouri Compromise or the Kansas-Nebraska Act?", "the Missouri Compromise", ["the Kansas-Nebraska Act", "they happened the same year"], "1820 comes before 1854."],
  ["The years 1861 to 1865 are the years of the…", "Civil War", ["American Revolution", "War of 1812"], "It began at Fort Sumter."],
  ["Reconstruction is the period after the Civil War, from 1865 to about…", "1877", ["1820", "1900"], "Federal troops left the South in 1877."],
  ["Which happened during Reconstruction?", "the 14th Amendment was ratified", ["the Bill of Rights was ratified", "Illinois became a state"], "Reconstruction ran from 1865 to 1877.", true],
  ["Why is 1858 a turning point in Lincoln's career?", "the debates made him known across the nation", ["he became President that year", "he moved to Illinois"], "He was elected President two years later.", true],
];

const CONSTITUTIONS: Q[] = [
  ["The US Constitution begins with the words…", "We the People", ["When in the Course", "Four score and seven"], "This part is the Preamble."],
  ["The Preamble explains…", "the goals of the Constitution", ["the names of the states", "how to amend it"], "Justice, domestic tranquility, the common defense…"],
  ["The first ten amendments are called the…", "Bill of Rights", ["Articles of Confederation", "Federalist Papers"], "They were ratified in 1791."],
  ["Which branch makes federal laws?", "Congress", ["the President", "the Supreme Court"], "Article I sets it up."],
  ["Which branch carries out federal laws?", "the executive branch, led by the President", ["Congress", "the courts"], "Article II sets it up."],
  ["Which branch decides what laws mean?", "the judicial branch", ["the executive branch", "Congress"], "Article III sets it up."],
  ["Checks and balances means…", "each branch can limit the others", ["one branch has all the power", "states check the President"], "A veto is one check."],
  ["Federalism means power is shared between…", "the national and state governments", ["Congress and the courts only", "cities and counties only"], "Illinois has its own constitution too."],
  ["The Declaration of Independence says people have the right to…", "life, liberty and the pursuit of happiness", ["free land and gold", "a king"], "Thomas Jefferson wrote most of it."],
  ["Illinois's current constitution was adopted in…", "1970", ["1818", "1776"], "Voters approved it in December 1970."],
  ["How many constitutions has Illinois had?", "four", ["one", "ten"], "1818, 1848, 1870 and 1970."],
  ["Article I of the Illinois Constitution is its…", "Bill of Rights", ["list of counties", "tax code"], "Like the US Constitution, it protects rights."],
  ["The Illinois lawmaking branch is the…", "General Assembly", ["Congress", "Cabinet"], "It meets in Springfield."],
  ["The Illinois Constitution sets up how many branches of government?", "three", ["two", "five"], "Legislative, executive and judicial."],
  ["Every 20 years, Illinois voters are asked whether to…", "call a convention to change the state constitution", ["elect a new king", "move the capital"], "The question was on the ballot in 2008."],
  ["Which right is in the First Amendment?", "freedom of speech", ["the right to a jury in civil cases", "protection from cruel punishment"], "It also protects religion, press, assembly and petition."],
  ["A flag flown at half-staff is a sign of…", "mourning", ["celebration", "danger"], "It honors people who have died."],
  ["When the US flag is displayed with other flags, it should be…", "in the place of honor", ["below the others", "upside down"], "Flag rules are part of the Constitution test."],
  ["Before graduating, Illinois students must pass a test on…", "the US and Illinois constitutions and the Declaration of Independence", ["only state birds", "the times tables"], "Most schools give it in 8th grade.", true],
  ["How can the US Constitution be amended?", "two-thirds of Congress proposes and three-fourths of states ratify", ["the President signs a paper", "one state votes"], "It is hard to change on purpose.", true],
  ["Why did the framers include a way to amend the Constitution?", "so it could change as the country changed", ["to make it easier to ignore", "because they forgot things"], "There are 27 amendments.", true],
  ["The US Constitution is the supreme law of the land. That means…", "state laws can't conflict with it", ["states can ignore it", "it applies only to Washington, D.C."], "This is the supremacy clause.", true],
  ["The Illinois Constitution of 1970 says the state must…", "pass a balanced budget", ["have no taxes", "elect a king"], "Spending can't be more than expected funds.", true],
  ["Why do both the US and Illinois constitutions have a bill of rights?", "to protect individuals from government", ["to list every law", "to name the capitals"], "Rights limit government power.", true],
  ["Which is a responsibility of citizens, not a right?", "serving on a jury when called", ["freedom of religion", "freedom of the press"], "Responsibilities help democracy work.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "il-g8-illinois-and-nation",
    title: "Illinois and the Nation",
    emoji: "🎖️",
    blurb: "From statehood to Reconstruction",
    parentNote: "Illinois in United States history from the Northwest Ordinance to Reconstruction: a free state with Black Laws, abolitionists and the Underground Railroad, Douglas and Lincoln, the 1858 debates, Illinois in the Civil War, and the Reconstruction amendments.",
    standards: ["SS.6-8.H.1.MC; SS.6-8.H.2.MC; SS.6-8.H.3.MC", "turning points, people and perspectives in the history of Illinois and the United States, and how sources show them"],
    items: NATION,
  }),
  timelineUnit({
    id: "il-g8-us-timeline",
    title: "From Independence to Reconstruction",
    emoji: "📜",
    blurb: "Put the nation's and Illinois's big moments in order",
    parentNote: "Ordering events in United States and Illinois history from 1776 to 1877 (the founding, expansion, Illinois statehood, the road to the Civil War, the war and Reconstruction) and working out how far apart they are.",
    standards: ["SS.6-8.H.1.MC; SS.6-8.H.4.MC", "eras, events and causes and effects in the history of Illinois and the United States"],
    events: EVENTS,
    items: TIMELINE_ITEMS,
  }),
  bankUnit({
    id: "il-g8-constitutions",
    title: "The Constitution Test",
    emoji: "📜",
    blurb: "The US and Illinois constitutions and the flag",
    parentNote: "Practice for the Constitution test Illinois students take, usually in 8th grade: the Declaration of Independence, the US Constitution (Preamble, branches, checks and balances, federalism, amendments and the Bill of Rights), the Illinois Constitution of 1970, and how to display the flag.",
    standards: ["SS.6-8.CV.1.MC; SS.6-8.CV.2.MCa; SS.6-8.CV.4.MC", "the roles of citizens, the powers and limits of government, and the founding documents of the United States and Illinois"],
    items: CONSTITUTIONS,
  }),
];
