import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { timelineUnit, type Dated } from "./kit";

// Maryland Grade 8 social studies, United States history to 1877: Maryland's part in the founding and the new nation
// (FN.1, NN.1, NN.3: the Articles of Confederation, the national capital, McCulloch v. Maryland and the War of 1812),
// slavery and resistance with the Marylanders who led it, and the reform movements (GE.2, GE.4), and a timeline from the
// French and Indian War to the end of Reconstruction. Slavery and violence are told plainly.

const NATION: Q[] = [
  ["Maryland refused to approve the Articles of Confederation until…", "states with western land claims gave them to the nation", ["Britain agreed", "it got a seaport"], "Maryland had no western claims of its own."],
  ["When Maryland approved the Articles in 1781, they…", "went into effect", ["were thrown out", "became the Constitution"], "All thirteen states had to agree."],
  ["The Annapolis Convention of 1786 called for…", "a convention to fix the Articles, which met in 1787", ["war with France", "a new king"], "Only five states sent delegates."],
  ["Maryland gave land along the Potomac for…", "the District of Columbia", ["a British fort", "the first state park"], "Virginia gave land too."],
  ["Benjamin Banneker helped survey the boundaries of…", "the new federal capital", ["the Louisiana Purchase", "Canada"], "He worked with Andrew Ellicott in 1791."],
  ["In McCulloch v. Maryland (1819), the Supreme Court ruled that Maryland could not…", "tax the national bank", ["have a governor", "build roads"], "A state can't tax a federal institution."],
  ["McCulloch v. Maryland said Congress has implied powers under the…", "Necessary and Proper Clause", ["Tenth Amendment", "Preamble"], "Chief Justice John Marshall wrote the opinion."],
  ["The War of 1812 was fought between the United States and…", "Britain", ["France", "Spain"], "British ships seized American sailors."],
  ["After winning at Bladensburg, Maryland, in 1814, British troops…", "burned Washington, D.C.", ["sailed home", "surrendered"], "They set fire to the White House and the Capitol."],
  ["In September 1814, the British attacked Baltimore by land at North Point and by sea at…", "Fort McHenry", ["Fort Sumter", "Fort Ticonderoga"], "The fort guarded the harbor."],
  ["Francis Scott Key wrote the poem that became the national anthem after watching the attack on…", "Fort McHenry", ["Antietam", "Yorktown"], "The flag was still there at dawn."],
  ["The giant flag that flew over Fort McHenry was sewn in Baltimore by…", "Mary Pickersgill", ["Betsy Ross", "Dolley Madison"], "Her daughter and others helped."],
  ["'The Star-Spangled Banner' became the national anthem in…", "1931", ["1814", "1776"], "Congress made it official."],
  ["Baltimore privateers in the War of 1812 were…", "private ships allowed to capture British ships", ["pirates working for Britain", "fishermen only"], "Baltimore clippers were fast."],
  ["Maryland's Roger Taney, as Chief Justice, wrote the 1857 decision in…", "Dred Scott v. Sandford", ["Brown v. Board", "Marbury v. Madison"], "It said Black Americans could not be citizens."],
  ["The Dred Scott decision made the conflict over slavery…", "worse", ["end", "disappear"], "The 14th Amendment later overturned it."],
  ["The Monroe Doctrine of 1823 warned European nations…", "not to set up new colonies in the Americas", ["to trade only with Maryland", "to join the United States"], "It was an early foreign policy."],
  ["Why did Maryland's stand on western lands matter to the whole nation?", "the land became national territory that later formed new states", ["it made Maryland bigger", "it ended the Revolution"], "Think about the Northwest Territory.", true],
  ["Why was Fort McHenry's survival a turning point in the war?", "it stopped the British from taking Baltimore and lifted American spirits", ["it ended slavery", "it started the Revolution"], "Morale matters.", true],
  ["How did McCulloch v. Maryland affect federalism?", "it made the national government supreme over the states within its powers", ["it gave states the power to ignore federal law", "it ended the states"], "National law wins where they conflict.", true],
  ["The Federalists, led by Hamilton, wanted a national bank because it would…", "manage the nation's money and debts", ["end all taxes", "replace Congress"], "Jefferson's party feared it gave too much power.", true],
  ["Why did British leaders target Baltimore in 1814?", "its privateers had captured many British ships", ["it was the national capital", "it had no defenses"], "Baltimore was a 'nest of pirates' to them.", true],
  ["Enslaved people who escaped to British ships in the War of 1812 were…", "offered freedom by the British", ["sent back by the British", "made sailors in the US Navy"], "Freedom drew many to the British side.", true],
  ["Why did President Washington pick a site on the Potomac for the capital?", "it was between North and South and near his home", ["it had the most people", "Congress could not agree on anything else"], "Compromise shaped the choice.", true],
];

const FREEDOM: Q[] = [
  ["Frederick Douglass was born enslaved on Maryland's Eastern Shore, in…", "Talbot County", ["Baltimore City", "Garrett County"], "He was born around 1818."],
  ["Douglass learned to read as a boy in…", "Baltimore", ["Annapolis", "Cumberland"], "He traded bread for reading lessons."],
  ["Douglass's book, published in 1845, is the…", "Narrative of the Life of Frederick Douglass", ["Uncle Tom's Cabin", "Common Sense"], "It told his own story."],
  ["Harriet Tubman escaped from Dorchester County in…", "1849", ["1776", "1900"], "She came back about 13 times."],
  ["Harriet Tubman was called…", "Moses", ["the Iron Horse", "Old Hickory"], "She led her people to freedom."],
  ["The Underground Railroad was…", "a secret network that helped people escape slavery", ["a train under the ground", "a road built by the army"], "Safe houses hid freedom seekers."],
  ["Josiah Henson, born enslaved in Charles County, Maryland, escaped to…", "Canada", ["England", "Mexico"], "His life story inspired a famous novel."],
  ["Henry Highland Garnet, born enslaved in Kent County, Maryland, became a famous…", "abolitionist minister", ["Confederate general", "slave trader"], "He called on enslaved people to resist."],
  ["In 1860, Baltimore had the largest… of any US city.", "free Black population", ["number of enslaved people", "gold supply"], "About 25,000 free Black people lived there."],
  ["An abolitionist was someone who…", "worked to end slavery", ["wanted more slavery", "built railroads"], "Abolish means to end."],
  ["The Fugitive Slave Act of 1850 required people in free states to…", "help return freedom seekers", ["free all enslaved people", "ban newspapers"], "It angered many Northerners."],
  ["Frances Ellen Watkins Harper, born free in Baltimore, was a…", "poet, speaker and abolitionist", ["ship captain", "senator"], "She also worked for women's rights."],
  ["Enslaved people resisted by…", "running away, slowing work, learning to read and keeping families together", ["agreeing with slavery", "never trying anything"], "Resistance took many forms."],
  ["The cotton gin, invented in 1793, made slavery…", "grow in the Deep South", ["end quickly", "disappear in Maryland"], "Cotton became very profitable."],
  ["Many enslaved Marylanders were sold to cotton plantations in the Deep South, which…", "split families apart", ["kept families together", "gave them freedom"], "The domestic slave trade was cruel."],
  ["Reformers in the 1800s worked for…", "better schools, care for the mentally ill, temperance and women's rights", ["more slavery", "no schools"], "Dorothea Dix fought for better hospitals."],
  ["The Seneca Falls Convention of 1848 called for…", "women's rights, including the vote", ["war with Mexico", "a new railroad"], "It wrote a Declaration of Sentiments."],
  ["Why was Baltimore a dangerous place for free Black people even though it had many?", "kidnappers sometimes seized free people to sell into slavery", ["it had no laws", "it was a free state"], "Freedom was never safe in a slave state.", true],
  ["How did Douglass use his own life to fight slavery?", "his speeches and books showed slavery's cruelty firsthand", ["he stayed silent", "he moved to Europe forever"], "Firsthand accounts persuade.", true],
  ["Why did Maryland pass laws limiting free Black people in the 1830s?", "slaveholders feared free people would help others escape or rebel", ["free people asked for them", "to help free people"], "Fear followed Nat Turner's rebellion.", true],
  ["How were the abolition and women's rights movements connected?", "many reformers worked for both and learned from each other", ["they opposed each other", "they had nothing to do with each other"], "Douglass spoke at Seneca Falls.", true],
  ["Why did the Underground Railroad depend on both Black and white helpers?", "freedom seekers needed food, shelter and guides along long routes", ["only one group knew the way", "it was run by the government"], "Free Black communities did much of the work.", true],
  ["Why did the Fugitive Slave Act push more people toward abolition?", "it made Northerners take part in slavery", ["it ended slavery", "it was never enforced"], "It brought slavery into free states.", true],
  ["How is a slave narrative useful as a source?", "it gives a firsthand account of slavery", ["it is always fiction", "it was written by slaveholders"], "Primary sources show lived experience.", true],
];

const EVENTS: readonly Dated[] = [
  ["The French and Indian War begins", 1754],
  ["The Stamp Act", 1765],
  ["The Declaration of Independence is signed", 1776],
  ["Maryland approves the Articles of Confederation", 1781],
  ["The Constitution is written in Philadelphia", 1787],
  ["The Bill of Rights is ratified", 1791],
  ["The Louisiana Purchase", 1803],
  ["The British attack Fort McHenry", 1814],
  ["McCulloch v. Maryland", 1819],
  ["The B&O Railroad begins", 1828],
  ["Frederick Douglass escapes from Baltimore", 1838],
  ["Harriet Tubman escapes", 1849],
  ["The Dred Scott decision", 1857],
  ["The Battle of Antietam", 1862],
  ["Maryland ends slavery", 1864],
  ["Reconstruction ends", 1877],
];

const TIMELINE_ITEMS: Q[] = [
  ["How many years passed between the Declaration of Independence and the attack on Fort McHenry?", "38", ["28", "48"], "1814 − 1776 = 38."],
  ["Which came first, McCulloch v. Maryland or the Dred Scott decision?", "McCulloch v. Maryland", ["the Dred Scott decision", "they happened the same year"], "1819 comes before 1857."],
  ["The years 1861 to 1865 are the years of the…", "Civil War", ["American Revolution", "War of 1812"], "It began at Fort Sumter."],
  ["Maryland ended slavery how many years before the 13th Amendment, in 1865?", "1", ["10", "0"], "1865 − 1864 = 1."],
  ["Which happened in the 18th century?", "the Bill of Rights", ["the Battle of Antietam", "the Dred Scott decision"], "The 18th century is the 1700s.", true],
  ["How long did Reconstruction last, from 1865 to 1877?", "12 years", ["2 years", "22 years"], "1877 − 1865 = 12.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "md-g8-maryland-and-nation",
    title: "Maryland and the New Nation",
    emoji: "🎖️",
    blurb: "The Articles, McCulloch and Fort McHenry",
    parentNote: "Maryland's part in the early republic: holding out on the Articles of Confederation over western lands, the Annapolis Convention, land for the capital, McCulloch v. Maryland, the War of 1812 from Bladensburg to Fort McHenry and the Star-Spangled Banner, Roger Taney and Dred Scott, and early foreign policy.",
    standards: ["FN.1; NN.1; NN.3", "the Articles of Confederation, the decisions of the early federal government, and early American foreign policy"],
    items: NATION,
  }),
  bankUnit({
    id: "md-g8-slavery-and-resistance",
    title: "Slavery, Resistance and Reform",
    emoji: "🕯️",
    blurb: "Douglass, Tubman and the reformers",
    parentNote: "Slavery and its expansion, the domestic slave trade, Marylanders who resisted and fought it (Frederick Douglass, Harriet Tubman, Josiah Henson, Henry Highland Garnet, Frances Ellen Watkins Harper), the Underground Railroad and the Fugitive Slave Act, and the reform movements of the 1800s, told plainly.",
    standards: ["GE.2; GE.4", "the institution and expansion of slavery and resistance to it, and antebellum reform movements"],
    items: FREEDOM,
  }),
  timelineUnit({
    id: "md-g8-us-timeline",
    title: "From Colonies to Reconstruction",
    emoji: "📜",
    blurb: "Put the nation's and Maryland's big moments in order",
    parentNote: "Ordering events in United States and Maryland history from 1754 to 1877 (the Revolution, the founding, the War of 1812, the road to the Civil War, the war and Reconstruction) and working out how far apart they are.",
    standards: ["AR.2; FN.2; GE.6; CW.3", "turning points from the end of salutary neglect to Reconstruction, in order"],
    events: EVENTS,
    items: TIMELINE_ITEMS,
  }),
];
