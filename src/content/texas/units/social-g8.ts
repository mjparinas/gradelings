import type { Unit } from "../../types";
import { SOCIAL_8 as CALIFORNIA_8 } from "../../california/units/social-g8";
import { bankUnit, type Q } from "../own";
import { copyOf, from, timelineUnit, type Dated } from "./kit";

// Texas social studies, Grade 8 (19 TAC §113.20): United States history from the early colonial period through
// Reconstruction. California's Grade 8 units are copied without their California places, with Texas items added;
// Texas's own units cover the colonies and the Revolution, and the Constitution and the courts. Slavery, Indian
// removal, the Civil War and Reconstruction are described factually; the Cherokee Nation is a living nation today.

const KEY_DATES: Dated[] = [
  ["Virginia's House of Burgesses first meets", 1619],
  ["Jamestown is founded", 1607],
  ["The Pilgrims arrive and sign the Mayflower Compact", 1620],
  ["The Fundamental Orders of Connecticut are adopted", 1639],
  ["The Proclamation of 1763 limits western settlement", 1763],
  ["Parliament passes the Stamp Act", 1765],
  ["The Boston Massacre", 1770],
  ["The Boston Tea Party", 1773],
  ["Parliament passes the Intolerable Acts", 1774],
  ["The battles of Lexington and Concord", 1775],
  ["The Declaration of Independence is adopted", 1776],
  ["The American victory at Saratoga", 1777],
  ["The British surrender at Yorktown", 1781],
  ["The Treaty of Paris recognizes US independence", 1783],
  ["The Constitution is written in Philadelphia", 1787],
  ["George Washington becomes president", 1789],
  ["The Bill of Rights is ratified", 1791],
  ["The Louisiana Purchase", 1803],
  ["The Civil War begins", 1861],
  ["The Civil War ends", 1865],
];

const COLONIES: Q[] = [
  ["Spain's main reasons for colonizing North America were…", "gold, glory and spreading Christianity", ["fur trade only", "escaping religious persecution", "fishing rights"], "Spanish explorers sought wealth and converts."],
  ["The French in North America mostly built a colonial economy on…", "the fur trade", ["tobacco plantations", "gold mines", "cotton"], "French traders worked along rivers and lakes."],
  ["The Puritans founded the Massachusetts Bay Colony mainly for…", "religious reasons", ["gold", "fur trading", "military conquest"], "They wanted to build a community based on their faith."],
  ["Georgia was founded partly as a place for debtors and as a buffer against…", "Spanish Florida", ["French Canada", "the Dutch", "Mexico"], "It was the last of the 13 colonies."],
  ["The Mayflower Compact (1620) was important because the Pilgrims agreed to…", "govern themselves by majority rule", ["obey a new king", "return to England", "end all laws"], "It was an early example of self-government."],
  ["The Fundamental Orders of Connecticut are often called the first…", "written constitution in the colonies", ["colonial newspaper", "public school", "colonial army"], "Thomas Hooker helped inspire them."],
  ["The Virginia House of Burgesses was the first…", "elected representative assembly in the colonies", ["colonial court", "royal palace", "Spanish mission"], "It first met in 1619."],
  ["Under mercantilism, colonies existed to…", "make the home country richer", ["become independent", "trade freely with everyone", "pay no taxes"], "Colonies sent raw materials and bought finished goods."],
  ["The Proclamation of 1763 angered colonists because it…", "banned settlement west of the Appalachian Mountains", ["raised taxes on tea", "closed Boston Harbor", "ended trade"], "Many colonists wanted western land."],
  ["The Stamp Act (1765) taxed…", "printed materials such as newspapers and legal papers", ["tea only", "sugar only", "guns"], "Colonists protested with boycotts."],
  ["“No taxation without representation” meant colonists objected to…", "being taxed by a Parliament they did not elect", ["paying any money at all", "having their own assemblies", "trading with Britain"], "They had no members in Parliament."],
  ["The Intolerable Acts (1774) were Britain's punishment for…", "the Boston Tea Party", ["the Stamp Act protests", "the Battle of Saratoga", "the French and Indian War"], "Boston Harbor was closed."],
  ["Crispus Attucks, a man of African and Native ancestry, was the first person killed in the…", "Boston Massacre", ["Battle of Yorktown", "Battle of Saratoga", "Boston Tea Party"], "It happened in 1770."],
  ["Mercy Otis Warren supported independence by…", "writing plays, poems and a history of the Revolution", ["leading an army", "spying for Britain", "signing the Treaty of Paris"], "She was a writer."],
  ["James Armistead, an enslaved man, helped win at Yorktown as a…", "spy", ["general", "ship captain", "printer"], "He gathered information from British officers."],
  ["Wentworth Cheswell of New Hampshire is remembered as a Patriot and as one of the first…", "African Americans elected to public office", ["generals of the army", "presidents of Congress", "governors of a state"], "He was elected in his town in 1768."],
  ["Samuel Adams helped organize the…", "Sons of Liberty", ["Continental Navy", "Loyalists", "Supreme Court"], "They protested British taxes."],
  ["The Battle of Saratoga (1777) was a turning point because it…", "convinced France to ally with the Americans", ["ended the war", "was the first battle", "was lost by the Americans"], "France sent troops, ships and money."],
  ["At Valley Forge in the winter of 1777–1778, the Continental Army…", "endured cold and hunger but trained into a stronger army", ["won its biggest battle", "surrendered", "sailed to France"], "Baron von Steuben drilled the troops."],
  ["Bernardo de Gálvez, the Spanish governor of Louisiana, helped the Americans by…", "defeating British forts along the Gulf Coast", ["writing the Declaration", "printing money", "spying in London"], "Spain was an ally against Britain."],
  ["The Battle of Yorktown (1781) mattered because…", "the main British army surrendered", ["the British won", "it started the war", "France switched sides"], "It was the last major battle."],
  ["Thomas Paine's Common Sense (1776) argued that the colonies should…", "declare independence", ["obey the king", "join France", "end all trade"], "It sold many copies in months."],
  ["Many colonists believed virtue and religion were important to self-government because…", "citizens needed to act responsibly for the common good", ["kings required it", "it ended all laws", "it banned elections"], "A republic depends on good citizens.", true],
  ["The Great Awakening affected the colonies by…", "encouraging people to question authority and make their own choices", ["ending religion", "making the king stronger", "banning churches"], "It was a religious revival in the 1730s and 1740s.", true],
  ["Haym Salomon helped the Revolution by…", "raising money to fund the war", ["leading the army", "writing the Constitution", "spying in Paris"], "He was a financier.", true],
  ["The Marquis de Lafayette was a French officer who…", "served in George Washington's army", ["led the British army", "founded Georgia", "wrote the Mayflower Compact"], "He became George Washington's friend.", true],
];

const COURTS: Q[] = [
  ["A major weakness of the Articles of Confederation was that Congress could not…", "collect taxes", ["meet at all", "declare war", "make treaties"], "The national government was always short of money."],
  ["Under the Articles of Confederation, each state had…", "one vote in Congress", ["votes based on population", "no vote", "a president"], "Large and small states were equal."],
  ["A strength of the Articles was the Northwest Ordinance, which set out…", "how new territories could become states", ["a national bank", "a federal court system", "the Electoral College"], "It also banned slavery in the Northwest Territory."],
  ["The Great Compromise created a Congress with…", "a House based on population and a Senate with equal votes", ["one house with equal votes", "one house based on wealth", "no Senate"], "Large and small states both got something."],
  ["The Three-Fifths Compromise counted three-fifths of the enslaved population for…", "representation and taxes", ["voting by enslaved people", "jury duty", "citizenship"], "It gave slaveholding states more seats."],
  ["The colonists' grievance about soldiers living in their homes was addressed by the…", "Third Amendment", ["First Amendment", "Tenth Amendment", "Fifteenth Amendment"], "No quartering of soldiers in peacetime."],
  ["The colonists' grievance about trials without juries was addressed by the…", "Sixth Amendment", ["Second Amendment", "Third Amendment", "Ninth Amendment"], "It guarantees a speedy, public jury trial."],
  ["Federalism divides power between…", "the national government and the states", ["the president and the king", "the courts and the army", "the cities and the counties only"], "Some powers are shared."],
  ["Separation of powers means government is divided into…", "legislative, executive and judicial branches", ["federal and state levels", "two political parties", "the House and Senate only"], "Montesquieu wrote about this."],
  ["Popular sovereignty means the power of government comes from…", "the people", ["the king", "the army", "the courts"], "“We the People” begins the Constitution."],
  ["Marbury v. Madison (1803) established the Supreme Court's power of…", "judicial review", ["impeachment", "veto", "taxation"], "Courts can strike down laws that conflict with the Constitution."],
  ["The chief justice who wrote the Marbury v. Madison decision was…", "John Marshall", ["John Jay", "Roger Taney", "Alexander Hamilton"], "He served from 1801 to 1835."],
  ["McCulloch v. Maryland (1819) ruled that…", "Congress could create a national bank and states could not tax it", ["states could print money", "the bank was unconstitutional", "Maryland could leave the Union"], "It relied on the necessary and proper clause."],
  ["Gibbons v. Ogden (1824) ruled that…", "Congress controls trade between states", ["states control all river trade", "steamboats were illegal", "New York could block other states"], "It was about steamboats."],
  ["The Dred Scott decision (1857) ruled that…", "enslaved people were not citizens and Congress could not ban slavery in the territories", ["slavery was illegal everywhere", "all people were citizens", "the Missouri Compromise was expanded"], "It deepened the divide before the Civil War."],
  ["The Nullification Crisis of 1832 began when South Carolina claimed it could…", "refuse to enforce a federal tariff", ["print its own money", "elect its own president", "join Mexico"], "John C. Calhoun argued for nullification."],
  ["The Federalist Papers were written by Alexander Hamilton, James Madison and…", "John Jay", ["Patrick Henry", "George Mason", "Thomas Jefferson"], "They urged ratification of the Constitution."],
  ["Patrick Henry and George Mason opposed the Constitution at first because…", "it had no bill of rights and a strong central government", ["it gave too little power to the national government", "it created a king", "it ended slavery"], "They were Anti-Federalists."],
  ["The debates between Federalists and Anti-Federalists show civil discourse because both sides…", "argued their views in essays and conventions", ["fought a war", "refused to talk", "were jailed"], "They disagreed peacefully.", true],
  ["States' rights arguments before the Civil War were mostly about…", "the right to allow slavery", ["the right to build roads", "the right to name state birds", "the right to run schools"], "Slavery was at the heart of the conflict.", true],
  ["Why is judicial review an example of checks and balances?", "courts can check laws passed by Congress", ["the president can fire judges", "Congress can ignore the courts", "states can overturn the Constitution"], "One branch limits another.", true],
  ["Article V of the Constitution allows it to be changed by…", "amendment", ["the president alone", "any one state", "the Supreme Court alone"], "Amendments need broad support.", true],
  ["Which idea from the Magna Carta influenced the US system?", "even rulers must obey the law", ["kings have unlimited power", "only nobles have rights", "no taxes are allowed"], "It limited the English king's power in 1215.", true],
  ["The English Bill of Rights (1689) influenced Americans by…", "limiting the monarch and protecting some rights", ["creating a president", "ending Parliament", "banning all taxes"], "Colonists saw themselves as English subjects with rights.", true],
  ["The Constitution's answer to the grievance “taxation without representation” was giving the power to tax to…", "Congress, elected by the people", ["the king", "the governors alone", "the army"], "Tax bills start in the House of Representatives."],
  ["Limited government means that…", "government can do only what the people allow in the Constitution", ["the government has no limits", "there is no government", "only the president makes laws"], "The Constitution lists and limits powers."],
  ["Republicanism means citizens…", "elect representatives to make laws for them", ["obey a king", "vote on every law directly", "never vote"], "The United States is a republic."],
  ["Shays' Rebellion (1786–1787) showed many leaders that…", "the national government under the Articles was too weak", ["the states needed a king", "taxes should be banned", "the army was too strong"], "Farmers in Massachusetts protested debts and taxes."],
  ["Individual rights in the Constitution are protected mainly by the…", "Bill of Rights", ["Articles of Confederation", "Mayflower Compact", "Northwest Ordinance"], "The first ten amendments, added in 1791."],
];

const NEW_NATION_TEXAS: Q[] = [
  ["In his Farewell Address, George Washington warned Americans against…", "political parties and permanent foreign alliances", ["trade with any country", "building roads", "electing presidents"], "He left office in 1797."],
  ["Alexander Hamilton's economic plan included…", "a national bank and paying off the states' war debts", ["ending all taxes", "printing money for each state", "banning trade with Britain"], "He was the first secretary of the treasury."],
  ["The first two political parties were the Federalists and the…", "Democratic-Republicans", ["Whigs", "Know-Nothings", "Free Soilers"], "Thomas Jefferson and James Madison led them."],
  ["The Monroe Doctrine (1823) warned European nations not to…", "set up new colonies in the Americas", ["trade with the United States", "cross the Atlantic", "build ships"], "James Monroe was president."],
  ["One cause of the War of 1812 was Britain's practice of…", "forcing American sailors into the British navy", ["selling tea", "building canals", "buying Louisiana"], "This was called impressment."],
  ["The Whiskey Rebellion (1794) tested the new government when farmers protested…", "a federal tax on whiskey", ["the end of slavery", "the War of 1812", "a new state capital"], "The government sent troops, showing it could enforce its laws."],
];

const WESTWARD_TEXAS: Q[] = [
  ["Andrew Jackson's election in 1828 reflected wider suffrage because…", "many states had dropped property requirements for white men to vote", ["women could vote", "everyone over 12 could vote", "voting was banned"], "More ordinary men could vote."],
  ["The Indian Removal Act of 1830 led to the forced removal of the Cherokee and other nations from…", "the Southeast to lands west of the Mississippi", ["Texas to Mexico", "the West Coast to Hawaii", "New England to Canada"], "Many died on the journey."],
  ["In Worcester v. Georgia (1832), the Supreme Court ruled that Georgia's laws…", "did not apply in the Cherokee Nation", ["could remove the Cherokee", "ended Cherokee self-government", "created a new state"], "President Jackson did not enforce the ruling."],
  ["The forced removal of the Cherokee in 1838–1839, during which thousands died, is called the…", "Trail of Tears", ["Oregon Trail", "Santa Fe Trail", "Chisholm Trail"], "Soldiers forced families to walk west."],
  ["Today the Cherokee Nation is a self-governing nation based in…", "Tahlequah, Oklahoma", ["Atlanta, Georgia", "Austin, Texas", "Boston, Massachusetts"], "It has its own government, courts and schools."],
  ["Texas was annexed by the United States in…", "1845", ["1836", "1821", "1861"], "Mexico had not accepted Texas independence."],
  ["One cause of the US–Mexican War was a dispute over whether the Texas border was the Nueces River or the…", "Rio Grande", ["Red River", "Sabine River", "Mississippi River"], "Fighting began in the disputed land."],
  ["The Treaty of Guadalupe Hidalgo (1848) set the Rio Grande as the border and gave the US…", "a large area called the Mexican Cession", ["all of Mexico", "Florida", "the Louisiana Territory"], "It ended the US–Mexican War."],
  ["Winning the US–Mexican War increased tension at home because people argued over…", "whether slavery would spread into the new land", ["the price of tea", "who would be king", "the location of Canada's border"], "The Wilmot Proviso tried to ban slavery there."],
];

const CIVIL_WAR_TEXAS: Q[] = [
  ["Union general Ulysses S. Grant's capture of Vicksburg in 1863 gave the Union control of the…", "Mississippi River", ["Rio Grande", "Hudson River", "Ohio River"], "The Confederacy was split in two."],
  ["The last land battle of the Civil War was fought in 1865 at Palmito Ranch, near…", "Brownsville, Texas", ["Gettysburg, Pennsylvania", "Atlanta, Georgia", "Boston, Massachusetts"], "News of the war's end had not reached all troops."],
  ["Lincoln's Gettysburg Address described the war as a test of whether a nation “conceived in liberty” and dedicated to…", "the proposition that all men are created equal", ["the power of kings", "states leaving the Union", "lower tariffs"], "He spoke at Gettysburg in November 1863."],
  ["Jefferson Davis's inaugural address argued that states had the right to…", "leave the Union", ["abolish slavery", "elect Lincoln", "join Britain"], "He became president of the Confederacy."],
];

const DIVIDED_TEXAS: Q[] = [
  ["The Fugitive Slave Act of 1793 allowed slaveholders to…", "recapture people who had escaped to other states", ["free enslaved people", "end the slave trade", "vote twice"], "A stricter law followed in 1850."],
  ["The Fugitive Slave Act of 1850 angered many Northerners because it…", "forced them to help capture people escaping slavery", ["ended slavery", "raised tariffs", "banned newspapers"], "It pushed many to become abolitionists."],
  ["John Quincy Adams, as a congressman, fought the “gag rule,” which…", "blocked Congress from discussing petitions against slavery", ["banned tariffs", "ended elections", "created a national bank"], "He defended the right of petition."],
  ["The Missouri Compromise (1820) admitted Missouri as a slave state and Maine as…", "a free state", ["a territory", "a slave state", "a Spanish colony"], "It kept the balance in the Senate."],
  ["The Kansas-Nebraska Act (1854) let settlers decide on slavery by…", "popular sovereignty", ["a court ruling", "a presidential order", "a lottery"], "Violence broke out in Kansas."],
  ["Along with other measures, the Compromise of 1850 included a stricter…", "Fugitive Slave Act", ["tariff", "Bill of Rights", "Homestead Act"], "Henry Clay helped arrange it."],
  ["Harriet Tubman escaped slavery and then led many others to freedom on the…", "Underground Railroad", ["Erie Canal", "Transcontinental Railroad", "National Road"], "It was a secret network of people and safe houses."],
];

export const SOCIAL_8: Unit[] = [
  timelineUnit({
    id: "tx-g8-colonies-revolution",
    title: "Colonies to Independence",
    emoji: "🔔",
    blurb: "Key dates, colonies and the American Revolution",
    parentNote:
      "The key dates of US history to 1877 (1607, 1620, 1776, 1787, 1803 and 1861–1865), why Spain, France and England colonized, early representative government, the causes of the Revolution, and the people the Texas standards name, from Samuel Adams and Mercy Otis Warren to James Armistead and Bernardo de Gálvez.",
    standards: [
      "8.1(A); 8.1(B); 8.2(A); 8.2(B); 8.3(A); 8.3(B); 8.3(C); 8.4(A); 8.4(B); 8.4(C)",
      "key dates and eras, reasons for colonization, representative government, and the causes, people and events of the Revolution",
    ],
    events: KEY_DATES,
    items: COLONIES,
  }),
  bankUnit({
    id: "tx-g8-constitution-courts",
    title: "The Constitution & the Courts",
    emoji: "👩‍⚖️",
    blurb: "From the Articles to landmark Supreme Court cases",
    parentNote:
      "The strengths and weaknesses of the Articles of Confederation, the compromises of 1787, how the Constitution answered colonial grievances, the principles of the Constitution, Federalists and Anti-Federalists, states' rights and nullification, and the landmark cases Marbury v. Madison, McCulloch v. Maryland, Gibbons v. Ogden and Dred Scott v. Sandford.",
    standards: [
      "8.4(D); 8.15(A); 8.15(B); 8.15(C); 8.15(D); 8.16(A); 8.17(A); 8.17(B); 8.18(A); 8.18(B); 8.18(C)",
      "the Articles of Confederation, the Constitutional Convention, constitutional principles, states' rights and landmark Supreme Court cases",
    ],
    items: COURTS,
  }),
  copyOf(
    from(CALIFORNIA_8, "ca-g8-new-nation"),
    {
      id: "tx-g8-new-nation",
      title: "A New Nation",
      emoji: "🦅",
      blurb: "The early republic, from George Washington to Monroe",
      parentNote:
        "The problems facing the new republic, Hamilton's economic plan, the first political parties, the War of 1812, the Louisiana Purchase, and the foreign policies of George Washington through James Monroe, including the Farewell Address and the Monroe Doctrine.",
      standards: ["8.5(A); 8.5(C); 8.5(D); 8.5(E); 8.5(F); 8.6(B)", "problems of the early republic, the first parties, the War of 1812, and early foreign policy"],
    },
    NEW_NATION_TEXAS,
  ),
  copyOf(
    from(CALIFORNIA_8, "ca-g8-westward"),
    {
      id: "tx-g8-westward",
      title: "Westward Expansion",
      emoji: "🐂",
      blurb: "Jackson, Indian removal, Texas and the US–Mexican War",
      parentNote:
        "Jacksonian democracy, the Indian Removal Act, Worcester v. Georgia and the Trail of Tears, Manifest Destiny, Texas annexation, and the causes and effects of the US–Mexican War. The Cherokee Nation and other nations are described as living, self-governing nations.",
      standards: ["8.5(G); 8.5(H); 8.6(B); 8.6(C); 8.10(A)", "the election of Jackson, Cherokee removal, westward growth, and the US–Mexican War"],
    },
    WESTWARD_TEXAS,
  ),
  copyOf(
    from(CALIFORNIA_8, "ca-g8-divided-nation"),
    {
      id: "tx-g8-divided-nation",
      title: "A Nation Divided",
      emoji: "🧭",
      blurb: "Slavery, compromises and sectional conflict",
      parentNote:
        "The effects of slavery on different regions, the lives of enslaved people and free Black Americans, the Fugitive Slave Acts, the Missouri Compromise, the Compromise of 1850 and the Kansas-Nebraska Act, and abolitionists. Told factually.",
      standards: ["8.5(B); 8.7(B); 8.7(C); 8.7(D); 8.7(E); 8.12(B); 8.21(C)", "slavery and sectionalism, the Fugitive Slave Acts, and compromises before the Civil War"],
    },
    DIVIDED_TEXAS,
  ),
  copyOf(
    from(CALIFORNIA_8, "ca-g8-civil-war"),
    {
      id: "tx-g8-civil-war",
      title: "The Civil War",
      emoji: "⚔️",
      blurb: "Causes, leaders, battles and turning points",
      parentNote:
        "The central role of slavery in causing the Civil War, its leaders, its major battles and turning points, the Emancipation Proclamation, and Lincoln's ideas in his inaugural addresses and the Gettysburg Address. Told factually.",
      standards: ["8.8(A); 8.8(B); 8.8(C); 8.8(D)", "the people, causes, events and ideas of the Civil War"],
    },
    CIVIL_WAR_TEXAS,
  ),
];
