import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { timelineUnit, type Dated } from "./kit";

// Connecticut Grade 8 social studies, United States History II: Connecticut in the nation's story from the founding to
// Reconstruction, with Venture Smith's narrative, gradual abolition and the Black Law, the Amistad, Connecticut's
// inventors and mills, Connecticut in the Civil War and the 1865 vote on Black suffrage (8.His.6.a, 8.His.12.a,
// 8.His.4.c, 8.Eco.7.a, 8.Civ.14.c, 8.His.14.b), with a timeline (8.His.1.c, 8.His.15.a, 8.His.16.b); and the founding
// documents and the Constitutional Convention, with the Connecticut Compromise (8.Civ.3.a, 8.Civ.4.a, 8.Civ.8.a,
// 8.Civ.10.a).

const NATION: Q[] = [
  ["Venture Smith was born in West Africa, enslaved as a child, and later…", "bought his own freedom and his family's", ["became governor", "sailed back as a ship captain"], "He settled in East Haddam."],
  ["Venture Smith's 1798 narrative is important because it is…", "an account of slavery written from his own point of view", ["a novel about pirates", "a law passed by Congress"], "It was printed in New London."],
  ["Connecticut's Gradual Abolition Act of 1784 said that children born to enslaved mothers would be…", "freed when they turned 25", ["freed at birth", "enslaved for life"], "It ended slavery slowly, not all at once."],
  ["Connecticut fully abolished slavery in…", "1848", ["1784", "1776"], "Gradual abolition left some people enslaved for decades."],
  ["In 1833, Prudence Crandall opened a school in Canterbury for…", "Black girls", ["sea captains", "factory owners"], "Many white neighbors opposed it."],
  ["Connecticut's 1833 Black Law made it illegal to…", "teach Black students from other states without a town's permission", ["build a school", "own a farm"], "It was aimed at Crandall's school."],
  ["Prudence Crandall's school closed in 1834 after…", "a mob attacked the building", ["the students graduated", "it moved to the ocean"], "She is now Connecticut's state heroine."],
  ["In 1839, Africans held captive on the ship Amistad…", "took control of the ship to win their freedom", ["sailed it for the navy", "sold it in Hartford"], "They were led by Sengbe Pieh, also called Cinqué."],
  ["The Amistad captives were jailed in…", "New Haven", ["Boston", "Richmond"], "Their case went all the way to the Supreme Court."],
  ["In 1841, the US Supreme Court ruled that the Amistad Africans were…", "free", ["property", "British citizens"], "John Quincy Adams argued their case."],
  ["Eli Whitney, who worked near New Haven, made muskets using…", "interchangeable parts", ["only hand-carved pieces", "gold"], "Matching parts made factories faster."],
  ["Samuel Colt built a large factory in Hartford to make…", "revolvers", ["clocks", "ships"], "His armory had a blue onion dome."],
  ["Eli Terry of Plymouth found a way to mass-produce…", "clocks", ["shoes", "bicycles"], "Factories made clocks cheaper for families."],
  ["Many mills in Connecticut were built along rivers because…", "falling water powered the machines", ["rivers kept workers cool", "boats were not allowed"], "Water power ran early factories."],
  ["Many Irish immigrants came to Connecticut in the 1840s to escape…", "famine in Ireland", ["the Gold Rush", "a war in Mexico"], "They worked in mills and built railroads."],
  ["Harriet Beecher Stowe, born in Litchfield, wrote…", "Uncle Tom's Cabin", ["Common Sense", "The Federalist Papers"], "The 1852 novel turned many readers against slavery."],
  ["The 29th Connecticut Colored Infantry was a regiment of…", "Black soldiers in the Union army", ["Confederate soldiers", "British sailors"], "It was among the first Union troops to enter Richmond in 1865."],
  ["During the Civil War, Connecticut's factories made…", "guns, ammunition and supplies for the Union", ["cotton for the Confederacy", "nothing at all"], "It was called the arsenal of the nation."],
  ["In 1865, Connecticut voters were asked whether Black men could vote. They…", "said no", ["said yes", "never voted"], "Black men in Connecticut gained the vote with the 15th Amendment in 1870."],
  ["The 13th Amendment…", "abolished slavery in the United States", ["gave women the vote", "set up the income tax"], "Connecticut ratified it in May 1865."],
  ["The 14th Amendment promised…", "citizenship and equal protection of the laws", ["the right to bear arms", "free land in the West"], "It was ratified in 1868."],
  ["Why did gradual abolition leave many questions about freedom in Connecticut?", "people born before 1784 stayed enslaved and freed people still faced unfair laws", ["it freed everyone at once", "it gave everyone the vote"], "Freedom came slowly and unequally.", true],
  ["Why do historians study the narratives of Venture Smith and James Mars?", "they show slavery in Connecticut through the eyes of people who lived it", ["they are about the Revolution only", "they were written by enslavers"], "First-person sources add missing voices.", true],
  ["How did the Amistad case affect the debate over slavery?", "it drew national attention and helped the abolitionist movement", ["it ended slavery in 1841", "no one heard about it"], "Abolitionists raised money for the captives' defense.", true],
  ["Why did some Connecticut mill owners and merchants hesitate to oppose slavery?", "their businesses depended on cotton grown by enslaved people", ["they had never heard of cotton", "slavery did not affect trade"], "Northern mills bought Southern cotton.", true],
  ["The Hartford Convention of 1814 to 1815 was a meeting of New England Federalists who opposed…", "the War of 1812", ["the Constitution", "the Louisiana Purchase"], "It damaged the Federalist Party.", true],
  ["Why is the 1865 suffrage vote evidence of racism in the North?", "a free state still denied Black men the vote", ["it gave everyone the vote", "it only affected the South"], "Prejudice was not only a Southern problem.", true],
  ["Why did interchangeable parts change American industry?", "broken parts could be replaced and goods made faster", ["each part had to be handmade", "they made goods cost more"], "Mass production grew from the idea.", true],
];

const EVENTS: readonly Dated[] = [
  ["The Declaration of Independence is signed", 1776],
  ["Connecticut passes its Gradual Abolition Act", 1784],
  ["The Connecticut Compromise at the Constitutional Convention", 1787],
  ["The Bill of Rights is ratified", 1791],
  ["Venture Smith's narrative is published", 1798],
  ["The Louisiana Purchase", 1803],
  ["The Hartford Convention meets", 1814],
  ["Connecticut adopts a new state constitution", 1818],
  ["The Missouri Compromise", 1820],
  ["The Indian Removal Act is passed", 1830],
  ["Prudence Crandall opens her school in Canterbury", 1833],
  ["The Amistad captives take control of the ship", 1839],
  ["The Supreme Court frees the Amistad Africans", 1841],
  ["The Mexican-American War begins", 1846],
  ["Connecticut fully abolishes slavery", 1848],
  ["Uncle Tom's Cabin is published", 1852],
  ["The Kansas-Nebraska Act", 1854],
  ["The Dred Scott decision", 1857],
  ["The Civil War begins", 1861],
  ["The Emancipation Proclamation takes effect", 1863],
  ["The 29th Connecticut Colored Infantry is formed", 1864],
  ["The Civil War ends and the 13th Amendment is ratified", 1865],
  ["The 14th Amendment is ratified", 1868],
  ["The 15th Amendment is ratified", 1870],
  ["Reconstruction ends", 1877],
];

const TIMELINE_ITEMS: Q[] = [
  ["How many years passed between Connecticut's Gradual Abolition Act and full abolition?", "64", ["24", "84"], "1848 − 1784 = 64."],
  ["Which came first, the Missouri Compromise or the Kansas-Nebraska Act?", "the Missouri Compromise", ["the Kansas-Nebraska Act", "they happened the same year"], "1820 comes before 1854."],
  ["The years 1861 to 1865 are the years of the…", "Civil War", ["American Revolution", "War of 1812"], "It began at Fort Sumter."],
  ["Reconstruction is the period after the Civil War, from 1865 to about…", "1877", ["1820", "1900"], "Federal troops left the South in 1877."],
  ["Which happened during Reconstruction?", "the 14th Amendment was ratified", ["the Bill of Rights was ratified", "the Amistad case was decided"], "Reconstruction ran from 1865 to 1877.", true],
  ["Why did the Kansas-Nebraska Act push the nation toward war?", "it let new territories vote on slavery, which led to violence", ["it ended slavery", "it closed the West"], "Fighting broke out in Kansas.", true],
  ["Why did Reconstruction fall short of its promises?", "Black Codes, violence and the end of federal protection took rights away", ["every promise was kept", "no amendments passed"], "Many rights were not enforced for nearly a century.", true],
];

const FOUNDING: Q[] = [
  ["The US Constitution begins with the words…", "We the People", ["When in the Course", "Four score and seven"], "This part is the Preamble."],
  ["The Preamble explains…", "the goals of the Constitution", ["the names of the states", "how to amend it"], "Justice, domestic tranquility, the common defense…"],
  ["The first ten amendments are called the…", "Bill of Rights", ["Articles of Confederation", "Federalist Papers"], "They were ratified in 1791."],
  ["Which branch makes federal laws?", "Congress", ["the President", "the Supreme Court"], "Article I sets it up."],
  ["Which branch carries out federal laws?", "the executive branch, led by the President", ["Congress", "the courts"], "Article II sets it up."],
  ["Which branch decides what laws mean?", "the judicial branch", ["the executive branch", "Congress"], "Article III sets it up."],
  ["Checks and balances means…", "each branch can limit the others", ["one branch has all the power", "states check the President"], "A veto is one check."],
  ["Federalism means power is shared between…", "the national and state governments", ["Congress and the courts only", "cities and towns only"], "Connecticut has its own constitution too."],
  ["Popular sovereignty means…", "the people are the source of government's power", ["the king rules alone", "only judges make laws"], "We the People."],
  ["At the Constitutional Convention, large states wanted representation based on…", "population", ["land area", "wealth"], "This was the Virginia Plan."],
  ["Small states wanted…", "equal representation for every state", ["no Congress", "a king"], "This was the New Jersey Plan."],
  ["The Connecticut Compromise created…", "a House based on population and a Senate with two members per state", ["one house with equal votes", "a Congress chosen by the President"], "Roger Sherman and Oliver Ellsworth proposed it."],
  ["The Three-Fifths Compromise counted enslaved people as three-fifths of a person for…", "representation and taxes", ["voting rights", "freedom"], "It gave slaveholding states more power in Congress."],
  ["The Fugitive Slave Clause in the Constitution required…", "people who escaped slavery to be returned", ["freedom for all who reached the North", "an end to the slave trade at once"], "It protected slavery across state lines."],
  ["Which right is in the First Amendment?", "freedom of speech", ["the right to a jury in civil cases", "protection from cruel punishment"], "It also protects religion, press, assembly and petition."],
  ["The Anti-Federalists agreed to the Constitution once they were promised…", "a bill of rights", ["a king", "no taxes ever"], "They feared a strong national government."],
  ["Why is the Connecticut Compromise called the Great Compromise?", "it settled the biggest fight between large and small states", ["it ended slavery", "it created the Supreme Court"], "Without it, the convention might have failed.", true],
  ["How can the US Constitution be amended?", "two-thirds of Congress proposes and three-fourths of states ratify", ["the President signs a paper", "one state votes"], "It is hard to change on purpose.", true],
  ["Why did the framers include a way to amend the Constitution?", "so it could change as the country changed", ["to make it easier to ignore", "because they forgot things"], "There are 27 amendments.", true],
  ["The US Constitution is the supreme law of the land. That means…", "state laws can't conflict with it", ["states can ignore it", "it applies only to Washington, D.C."], "This is the supremacy clause.", true],
  ["Did the Constitution of 1787 meet the Declaration's promise that all men are created equal?", "not for enslaved people, women or Native nations", ["yes, for everyone", "the Declaration made no promises"], "Later amendments tried to close the gap.", true],
  ["Judicial review, set out in Marbury v. Madison, lets the courts…", "strike down laws that break the Constitution", ["write new laws", "choose the President"], "It became a key check on the other branches.", true],
  ["Why did the Bill of Rights matter to people who feared a strong national government?", "it listed freedoms the government could not take away", ["it gave the President more power", "it ended state governments"], "Rights limit government power.", true],
  ["Which is a responsibility of citizens, not a right?", "serving on a jury when called", ["freedom of religion", "freedom of the press"], "Responsibilities help democracy work.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "ct-g8-connecticut-and-nation",
    title: "Connecticut and the Nation",
    emoji: "🎖️",
    blurb: "From the founding to Reconstruction",
    parentNote:
      "Connecticut in United States history from the founding to Reconstruction: Venture Smith's narrative, gradual abolition, Prudence Crandall and the Black Law, the Amistad, inventors and mills, Irish immigration, Harriet Beecher Stowe, the 29th Connecticut Colored Infantry, the 1865 vote on Black suffrage and the Reconstruction amendments.",
    standards: ["8.His.6.a; 8.His.12.a; 8.His.4.c; 8.Eco.7.a; 8.Civ.14.c; 8.His.14.b", "people, perspectives and sources in Connecticut and US history from the founding to Reconstruction, and innovation in industry"],
    items: NATION,
  }),
  timelineUnit({
    id: "ct-g8-us-timeline",
    title: "From Independence to Reconstruction",
    emoji: "📜",
    blurb: "Put the nation's and Connecticut's big moments in order",
    parentNote:
      "Ordering events in United States and Connecticut history from 1776 to 1877 (the founding, gradual abolition, expansion, the road to the Civil War, the war and Reconstruction) and working out how far apart they are.",
    standards: ["8.His.1.c; 8.His.15.a; 8.His.16.b", "events of slavery and the early republic, the causes of secession, and how far Reconstruction met the nation's founding ideals"],
    events: EVENTS,
    items: TIMELINE_ITEMS,
  }),
  bankUnit({
    id: "ct-g8-founding-documents",
    title: "The Constitution & the Great Compromise",
    emoji: "🏛️",
    blurb: "The founding documents, the convention and the Bill of Rights",
    parentNote:
      "The Declaration and the Constitution: popular sovereignty, the three branches, checks and balances and federalism, the debates at the Constitutional Convention (the Connecticut Compromise, the Three-Fifths Compromise and the Fugitive Slave Clause), the Bill of Rights, amendments and judicial review.",
    standards: ["8.Civ.3.a; 8.Civ.4.a; 8.Civ.5.a; 8.Civ.8.a; 8.Civ.10.a", "the founding documents, the branches of government, the Constitutional Convention's debates, slavery in the Constitution, and the Bill of Rights"],
    items: FOUNDING,
  }),
];
