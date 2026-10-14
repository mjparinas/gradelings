import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { timelineUnit, type Dated } from "./kit";

// Maine Grade 8 social studies: Maine in the history of the United States from statehood to Reconstruction, and the
// Mainers who shaped the national debates over slavery, union and reform (History 1 and 2, Civics & Government 3).

const NATION: Q[] = [
  ["Maine separated from Massachusetts and became a state in…", "1820", ["1776", "1861"], "It was the 23rd state."],
  ["Maine entered the Union as a free state paired with Missouri as a slave state under the…", "Missouri Compromise", ["Compromise of 1850", "Kansas-Nebraska Act"], "The deal kept the Senate balanced between free and slave states."],
  ["The Missouri Compromise also banned slavery in the Louisiana Territory north of…", "36°30′ north latitude", ["the Mason-Dixon Line", "the Ohio River"], "The line followed Missouri's southern border."],
  ["The 1838–1839 standoff over Maine's northern border, settled without battle, was the…", "Aroostook War", ["Pig War", "Toledo War"], "Lumber in the disputed valley was at stake."],
  ["Which 1842 treaty set Maine's northeastern border?", "the Webster-Ashburton Treaty", ["the Treaty of Paris", "the Treaty of Ghent"], "Daniel Webster negotiated for the United States."],
  ["In 1851 Maine became the first state to ban the sale of alcohol. The law was called the…", "Maine Law", ["Volstead Act", "Dirigo Act"], "Portland mayor Neal Dow led the campaign."],
  ["Harriet Beecher Stowe wrote Uncle Tom's Cabin in Brunswick. Its main effect was to…", "turn many Northerners against slavery", ["start the Gold Rush", "end the Missouri Compromise"], "It sold hundreds of thousands of copies in its first year."],
  ["John Brown Russwurm, a Bowdoin graduate of 1826, co-founded…", "Freedom's Journal, the first African American–owned newspaper", ["the Underground Railroad", "the Republican Party"], "It began publishing in New York City in 1827."],
  ["Elijah Parish Lovejoy, born in Albion, Maine, was an abolitionist newspaper editor who…", "was killed defending his press in Illinois in 1837", ["became president", "wrote the Constitution"], "His death made him a martyr for freedom of the press."],
  ["Dorothea Dix, born in Hampden, Maine, worked to reform…", "care for people with mental illness", ["the banking system", "railroad safety"], "She also led Union army nurses in the Civil War."],
  ["Which Mainer was Abraham Lincoln's first vice president?", "Hannibal Hamlin", ["Andrew Johnson", "Daniel Webster"], "He served from 1861 to 1865."],
  ["Joshua Chamberlain and the 20th Maine defended Little Round Top at the Battle of…", "Gettysburg", ["Antietam", "Bull Run"], "Their bayonet charge on July 2, 1863, is famous."],
  ["After the war, Joshua Chamberlain became…", "Governor of Maine and president of Bowdoin College", ["President of the United States", "a Supreme Court justice"], "He was also awarded the Medal of Honor."],
  ["General Oliver Otis Howard of Leeds, Maine, led the…", "Freedmen's Bureau", ["Pony Express", "Confederate army"], "The Bureau helped formerly enslaved people with schools, food and jobs."],
  ["Howard University in Washington, D.C., is named after…", "Oliver Otis Howard", ["Hannibal Hamlin", "Joshua Chamberlain"], "He helped found it in 1867."],
  ["Roughly how many Mainers served in the Union forces?", "more than 70,000", ["about 700", "about 7 million"], "Maine sent a larger share of its people than most states."],
  ["Why did Maine's shipyards matter to the Union?", "they built ships for the navy and for trade", ["they built railroads", "they mined gold"], "Bath and Kittery built ships during the war."],
  ["The Portsmouth Naval Shipyard, founded in 1800, is actually in…", "Kittery, Maine", ["Boston", "Bangor"], "It is across the river from Portsmouth, New Hampshire."],
  ["The 13th Amendment, ratified in 1865, did what?", "ended slavery in the United States", ["gave women the vote", "created the income tax"], "Maine's legislature voted for it."],
  ["The 14th Amendment, ratified in 1868, promised…", "citizenship and equal protection of the laws", ["an end to all taxes", "a national religion"], "It applied to people born or naturalized in the US."],
  ["The 15th Amendment, ratified in 1870, said the right to vote cannot be denied because of…", "race", ["age", "income"], "Women still could not vote in most places."],
  ["Lumber from Maine's forests in the 1800s was shipped mostly from the port of…", "Bangor", ["Augusta", "Presque Isle"], "Bangor was once called the lumber capital of the world."],
  ["Which statement about Wabanaki Nations in the 1800s is accurate?", "they kept their communities and governments while losing much of their land", ["they all left Maine", "they had no contact with the state"], "Wabanaki Nations continue in Maine today.", true],
  ["Why did Maine's statehood matter for the national debate over slavery?", "it showed Congress balancing free and slave states", ["it ended slavery", "it started the Civil War"], "Each new state changed the balance in the Senate.", true],
  ["The Aroostook War shows that…", "a border dispute can be settled by diplomacy", ["every dispute must lead to war", "Maine had no border"], "No soldier died in battle.", true],
  ["A historian reading Chamberlain's own account of Gettysburg should…", "compare it with other soldiers' accounts", ["accept every detail as fact", "ignore it completely"], "Memoirs can be biased or forget details.", true],
  ["Which is a primary source about the 20th Maine?", "a letter written by a soldier in 1863", ["a 2010 documentary", "an encyclopedia article"], "Primary sources come from the time.", true],
  ["How did the Maine Law reflect a wider movement of the 1800s?", "it was part of the temperance and reform movement", ["it was part of the Gold Rush", "it began the Industrial Revolution"], "Reformers also worked on schools, prisons and slavery.", true],
  ["Maine's Franco-American communities grew after the Civil War because…", "families came from Quebec to work in textile mills", ["the mills closed", "farms paid more in the cities"], "Lewiston, Biddeford and Waterville grew French-speaking neighborhoods.", true],
  ["Which pair of documents frame both Maine's government and the nation's?", "the Maine Constitution and the US Constitution", ["the Mayflower Compact and the Magna Carta", "the Emancipation Proclamation and the Monroe Doctrine"], "Federalism divides power between the state and the nation.", true],
];

const EVENTS: Dated[] = [
  ["The Declaration of Independence is signed", 1776],
  ["The US Constitution is written in Philadelphia", 1787],
  ["The Bill of Rights is ratified", 1791],
  ["The Louisiana Purchase doubles the size of the country", 1803],
  ["The War of 1812 begins", 1812],
  ["Maine becomes a state under the Missouri Compromise", 1820],
  ["The Indian Removal Act is passed", 1830],
  ["The Webster-Ashburton Treaty settles Maine's northern border", 1842],
  ["The Mexican-American War begins", 1846],
  ["The Seneca Falls Convention calls for women's rights", 1848],
  ["Maine passes the first state law banning the sale of alcohol", 1851],
  ["Uncle Tom's Cabin, written in Brunswick, is published as a book", 1852],
  ["The Kansas-Nebraska Act ends the Missouri Compromise line", 1854],
  ["The Dred Scott decision is announced", 1857],
  ["Abraham Lincoln and Hannibal Hamlin take office as President and Vice President", 1861],
  ["The Emancipation Proclamation takes effect", 1863],
  ["The Civil War ends and the 13th Amendment is ratified", 1865],
  ["The 14th Amendment is ratified", 1868],
  ["The transcontinental railroad is completed", 1869],
  ["The 15th Amendment is ratified", 1870],
  ["Reconstruction ends", 1877],
];

const TIMELINE_ITEMS: Q[] = [
  ["How many years passed between the Declaration of Independence and Maine statehood?", "44", ["34", "54"], "1820 − 1776 = 44."],
  ["Which came first, the Missouri Compromise or the Kansas-Nebraska Act?", "the Missouri Compromise", ["the Kansas-Nebraska Act", "they happened the same year"], "1820 comes before 1854."],
  ["The years 1861 to 1865 are the years of the…", "Civil War", ["American Revolution", "War of 1812"], "It began at Fort Sumter."],
  ["Reconstruction is the period after the Civil War, from 1865 to about…", "1877", ["1820", "1900"], "Federal troops left the South in 1877."],
  ["Which happened during Reconstruction?", "the 14th Amendment was ratified", ["the Bill of Rights was ratified", "Maine became a state"], "Reconstruction ran from 1865 to 1877.", true],
  ["Why do historians call 1820 a turning point for Maine?", "Maine became its own state", ["Maine joined Canada", "Maine's capital moved to Augusta"], "Augusta became the capital in 1832.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "me-g8-maine-and-nation",
    title: "Maine and the Nation",
    emoji: "🎖️",
    blurb: "From statehood to Reconstruction",
    parentNote: "Maine in United States history from 1820 to Reconstruction: statehood and the Missouri Compromise, the Aroostook War, the Maine Law and reform, Mainers in the fight over slavery (Stowe, Russwurm, Lovejoy, Hamlin), the 20th Maine and the Civil War, and the Reconstruction amendments.",
    standards: ["History 1; History 2; Civics & Government 3", "turning points, events and people in the history of Maine and the United States, and issues of unity and diversity"],
    items: NATION,
  }),
  timelineUnit({
    id: "me-g8-us-timeline",
    title: "From Independence to Reconstruction",
    emoji: "📜",
    blurb: "Put the nation's and Maine's big moments in order",
    parentNote: "Ordering events in United States and Maine history from 1776 to 1877 (the founding, expansion, Maine statehood, the road to the Civil War, the war and Reconstruction) and working out how far apart they are.",
    standards: ["History 1", "major eras, turning points, events and timeframes in the history of Maine and the United States"],
    events: EVENTS,
    items: TIMELINE_ITEMS,
  }),
];
