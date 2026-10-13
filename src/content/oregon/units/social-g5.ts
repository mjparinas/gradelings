import { pick, randInt, textChoice } from "../../random";
import type { Question, Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { factQuestions, fromItems, mixUnit, timelineUnit, type Dated } from "./social-kit";

// Oregon Grade 5 social studies: colonial and early US history to 1800 (2024 standards), with Indigenous peoples
// before and after contact, slavery and resistance, and the founding documents. Written for Oregon rather than
// adopted, so Indigenous content follows Oregon's standards (5.H.CP.10, 5.G.HI.7, 5.H.CC.5).

const FIRST_PEOPLES: Q[] = [
  ["Before Europeans arrived, North America was home to…", "hundreds of Native nations with different languages and ways of life", ["a few small villages", "one nation with one language"], "Native nations were many and varied."],
  ["Why did ways of life differ among Native nations?", "they adapted to different lands, climates and resources", ["they all lived the same way", "they never used resources"], "Geography shaped daily life."],
  ["The Haudenosaunee Confederacy united nations under the…", "Great Law of Peace", ["Magna Carta", "Mayflower Compact"], "It is one of the oldest constitutions in the world."],
  ["The Haudenosaunee traditionally lived in long homes of wood and bark called…", "longhouses", ["pueblos", "igloos"], "Haudenosaunee means People of the Longhouse."],
  ["Many Pueblo peoples of the Southwest built homes from…", "adobe and stone", ["ice blocks", "cedar planks only"], "Adobe is sun-dried mud brick."],
  ["On the Northwest Coast, many nations got much of their food from…", "salmon and the sea", ["bison herds", "cotton fields"], "Rivers and the ocean were rich in food."],
  ["After horses arrived, many nations of the Great Plains hunted…", "bison", ["whales", "salmon"], "Bison gave food, clothing and tools."],
  ["Many Eastern Woodlands nations grew corn, beans and squash together, called the…", "Three Sisters", ["Great Plains", "Silk Road"], "The three plants help each other grow."],
  ["Cahokia, near today's St. Louis, was…", "a large city with huge earthen mounds", ["a Spanish fort", "a fishing boat"], "It was largest around 1100 CE."],
  ["Corn was first farmed by people in what is now…", "Mexico", ["Europe", "Africa"], "Farmers there bred it from a wild grass."],
  ["Foods first grown by Indigenous peoples of the Americas include…", "corn, potatoes and tomatoes", ["wheat, rice and apples", "bananas, coffee and sugar"], "These foods spread around the world after 1492."],
  ["Native nations had their own…", "governments, laws and trade networks", ["no rules at all", "only one leader for the continent"], "Nations governed themselves."],
  ["Trade routes across North America moved goods like…", "shells, copper and obsidian", ["plastic and steel", "paper money"], "Goods travelled thousands of miles."],
  ["Many Inuit in the Arctic traditionally travelled by…", "kayak and dog sled", ["camel", "steamship"], "They adapted to ice and sea."],
  ["Native nations are…", "living communities today", ["only in the past", "only in museums"], "Many nations govern themselves today."],
  ["Is it fair to describe all Native peoples as having one culture?", "No, there are many distinct nations", ["Yes, they are all the same", "Yes, they share one language"], "Each nation has its own culture."],
  ["Many Hohokam farmers in the dry Southwest watered crops using…", "irrigation canals", ["snow", "rice paddies"], "Canals carried river water to fields."],
  ["Oral history means…", "history passed down by speaking and listening", ["history only in books", "made-up stories"], "Elders share history through stories."],
  ["How do archaeologists learn about life before contact?", "by studying tools, homes and food remains", ["by guessing", "only from movies"], "Artifacts are evidence."],
  ["Native nations helped early colonists survive by teaching them to grow…", "corn and other local crops", ["wheat from Europe", "coffee"], "Local knowledge was vital."],
  ["Many US place names, such as Massachusetts and Connecticut, come from…", "Native languages", ["French words", "Latin"], "Native words are all over the map."],
  ["Why did some nations move with the seasons?", "to follow food such as fish, game and plants", ["they were lost", "they disliked their homes"], "Seasonal rounds followed food."],
  ["The Haudenosaunee nations are the Mohawk, Oneida, Onondaga, Cayuga, Seneca and…", "Tuscarora", ["Cherokee", "Navajo"], "The Tuscarora joined in the early 1700s.", true],
  ["Canoes carved from a single cedar log were used by many nations of the…", "Northwest Coast", ["Great Plains", "Southwest deserts"], "Giant cedars grow there.", true],
  ["Some historians say the Haudenosaunee Confederacy influenced…", "the founders of the United States", ["the Roman Empire", "the Tang dynasty"], "Benjamin Franklin admired it.", true],
  ["Before removal, the Cherokee Nation's homeland was in the…", "Southeast", ["Pacific Northwest", "Arctic"], "Their homeland included parts of Georgia and the Carolinas.", true],
];

const ENCOUNTERS: Q[] = [
  ["In 1492, Christopher Columbus landed in…", "the Caribbean", ["Oregon", "Africa"], "He reached an island in the Bahamas."],
  ["The Taíno people lived on…", "Caribbean islands", ["the Great Plains", "the Pacific coast"], "Columbus met Taíno people in 1492."],
  ["Spanish conquest in the Caribbean led to…", "the deaths and enslavement of many Taíno people", ["peace and equal trade", "no change"], "Conquest brought great harm."],
  ["The Columbian Exchange was the movement of…", "plants, animals, people and diseases between the Americas and Europe, Africa and Asia", ["only gold", "only ideas"], "It began after 1492."],
  ["Which came to the Americas from Europe in the Columbian Exchange?", "horses", ["corn", "potatoes"], "Horses changed life on the Plains."],
  ["Which went from the Americas to Europe?", "potatoes", ["horses", "wheat"], "Potatoes became a key food in Europe."],
  ["Diseases like smallpox…", "killed huge numbers of Native people", ["helped Native nations", "had no effect"], "Native people had no immunity to them."],
  ["Jamestown, founded in 1607, was the first permanent English colony, in…", "Virginia", ["Massachusetts", "Florida"], "It was on the James River."],
  ["Jamestown was built in the homeland of the…", "Powhatan Confederacy", ["Aztec Empire", "Haudenosaunee"], "Powhatan nations lived around Chesapeake Bay."],
  ["The Pilgrims sailed to Plymouth in 1620 on the…", "Mayflower", ["Santa María", "Columbia"], "They landed in today's Massachusetts."],
  ["The Wampanoag helped the Plymouth colonists by…", "teaching them to grow corn and fish", ["building their ships", "giving them horses"], "Tisquantum, who spoke English, helped them."],
  ["Spain built missions in Florida, the Southwest and California to…", "spread Christianity and control land", ["trade furs only", "build railroads"], "Missions changed Native lives."],
  ["France's colony in North America, New France, was built mainly on…", "the fur trade", ["tobacco farming", "gold mining"], "French traders worked with many nations."],
  ["St. Augustine, founded by Spain in 1565, is the oldest continuously settled European city in…", "the United States", ["the world", "Canada"], "It is in Florida."],
  ["The Pueblo Revolt of 1680 was when…", "Pueblo peoples drove Spanish colonists out of New Mexico for a time", ["the Pilgrims landed", "Spain bought Florida"], "Pueblo leaders worked together."],
  ["King Philip's War (1675–1676) was fought between New England colonists and…", "Native nations led by Metacom", ["the French navy", "Spain"], "Metacom was a Wampanoag leader."],
  ["Assimilation, as a policy, means…", "pushing people to give up their culture to fit the dominant group", ["welcoming every culture", "learning many languages"], "It caused great cultural loss."],
  ["Why did some Native nations form alliances with France or Britain?", "to protect their lands and trade", ["they were forced to by Spain", "for no reason"], "Nations made strategic choices."],
  ["European explorers sailed to the Americas looking for…", "gold, land and a sea route to Asia", ["snow", "new languages to learn"], "Wealth was a main goal."],
  ["Hernán Cortés and his allies conquered the…", "Aztec Empire", ["Inca Empire", "Haudenosaunee"], "Tenochtitlan fell in 1521."],
  ["Spanish colonists brought enslaved Africans to the Caribbean to…", "work on plantations and in mines", ["explore Canada", "build missions in Oregon"], "Slavery grew with sugar plantations."],
  ["Henry Hudson explored for the Dutch, whose town of New Amsterdam later became…", "New York City", ["Boston", "Philadelphia"], "The English took it in 1664."],
  ["Treaties between colonies and Native nations were often…", "broken when colonists wanted more land", ["always kept", "never written"], "Broken promises led to conflict.", true],
  ["Why are lost homelands still important to Native nations today?", "land is tied to their history, culture and rights", ["they aren't", "only for money"], "The effects of colonization continue.", true],
  ["Which areas did Spain mainly colonize in what is now the US?", "Florida, the Southwest and California", ["New England", "the Great Lakes"], "Spanish names are found across these areas.", true],
  ["Why did Native populations fall so sharply after contact?", "new diseases, war and enslavement", ["they all moved to Europe", "nothing happened"], "Many causes worked together.", true],
];

const COLONIES: Q[] = [
  ["How many British colonies became the first United States?", "13", ["50", "7"], "Thirteen stripes on the flag stand for them."],
  ["Which were New England colonies?", "Massachusetts, Connecticut, Rhode Island and New Hampshire", ["Virginia, Georgia and the Carolinas", "New York, New Jersey and Delaware"], "New England is in the northeast."],
  ["Which were Middle Colonies?", "New York, New Jersey, Pennsylvania and Delaware", ["Maine and Vermont", "Virginia and Georgia"], "They were between New England and the South."],
  ["Which were Southern Colonies?", "Maryland, Virginia, North Carolina, South Carolina and Georgia", ["Massachusetts and Connecticut", "New York and Pennsylvania"], "They had warm climates."],
  ["New England's rocky soil and short summers led many colonists to…", "fish, build ships and trade", ["grow rice", "herd bison"], "The sea offered jobs."],
  ["The Middle Colonies were called the breadbasket colonies because they grew lots of…", "wheat and other grains", ["sugar", "cotton"], "Grain made flour for bread."],
  ["The Southern Colonies' warm climate and long growing season led to large…", "plantations growing tobacco and rice", ["fishing fleets", "fur trading posts"], "Plantations used enslaved labour."],
  ["Which mountains formed the western edge of most of the 13 colonies?", "the Appalachian Mountains", ["the Rocky Mountains", "the Cascade Range"], "The Appalachians run north to south in the east."],
  ["Which ocean was on the east side of all 13 colonies?", "the Atlantic Ocean", ["the Pacific Ocean", "the Indian Ocean"], "Ships crossed the Atlantic from Europe."],
  ["William Penn founded Pennsylvania as a place of…", "religious freedom", ["gold mining", "royal palaces"], "Penn was a Quaker."],
  ["Roger Williams founded Rhode Island because he believed in…", "religious freedom and separating church and government", ["one official church", "no government"], "He left Massachusetts over his beliefs."],
  ["Which was the last of the 13 colonies to be founded?", "Georgia", ["Virginia", "Massachusetts"], "Georgia was founded in 1732."],
  ["Virginia's House of Burgesses (1619) was the first…", "elected lawmaking body in the English colonies", ["royal palace", "Native nation"], "Colonists elected representatives."],
  ["The Mayflower Compact (1620) was an agreement to…", "make fair laws and govern themselves", ["join France", "end all farming"], "It was an early step in self-government."],
  ["The 13 colonies were ruled by…", "the British king and Parliament", ["the Spanish king", "Native nations"], "Britain made the big decisions."],
  ["Mercantilism was the idea that colonies existed to…", "make the home country rich", ["become independent", "trade freely with everyone"], "Colonies sent raw materials to Britain."],
  ["Under mercantilism, colonists had to sell many raw materials mainly to…", "Britain", ["France", "China"], "Britain controlled colonial trade."],
  ["At a New England town meeting,…", "citizens discussed and voted on local issues", ["the king decided everything", "only children voted"], "Town meetings were local democracy."],
  ["Specialization in the colonies meant each region…", "focused on goods its land and climate suited", ["made everything itself", "made no goods"], "Regions traded with each other."],
  ["Which crop made colonial Virginia rich?", "tobacco", ["oranges", "potatoes"], "Tobacco was sold in Europe."],
  ["Boston, New York and Philadelphia grew as…", "port cities", ["mountain towns", "desert oases"], "Ships carried trade."],
  ["Indentured servants were people who…", "worked for several years to pay for their trip", ["owned large plantations", "governed the colonies"], "After their term they were free."],
  ["Benjamin Franklin lived in which colonial city?", "Philadelphia", ["Boston", "Charleston"], "Franklin moved there as a young man."],
  ["How did colonial governments, the British crown and Native nations shape their dealings?", "through trade, treaties, alliances and war", ["they never met", "only through sports"], "Each had its own government.", true],
  ["Which colony began as the Dutch colony of New Netherland?", "New York", ["Georgia", "Virginia"], "The English took it in 1664.", true],
  ["Maryland was founded as a safe place for…", "Catholics", ["Quakers only", "Puritans only"], "Lord Baltimore was Catholic.", true],
  ["Why did most colonial cities grow along the coast?", "ships carried trade across the Atlantic", ["the coast had no water", "mountains were easier to farm"], "Ports connected colonies to the world.", true],
];

const SLAVERY: Q[] = [
  ["The transatlantic slave trade forced millions of ___ people across the ocean.", "African", ["European", "Australian"], "Over 12 million Africans were taken."],
  ["The Middle Passage was…", "the terrible voyage that carried enslaved Africans across the Atlantic", ["a road through the colonies", "a river in Virginia"], "Many died on the crowded ships."],
  ["The triangular trade linked…", "Europe, Africa and the Americas", ["Asia, Australia and Antarctica", "Oregon, Idaho and Nevada"], "Ships traded goods and people across the Atlantic."],
  ["Enslaved Africans were forced to work mainly on…", "plantations growing crops like tobacco, rice and sugar", ["fishing boats in Maine", "fur posts in Oregon"], "Plantation owners profited from their labour."],
  ["Enslaved Africans were first brought to the English colony of Virginia in…", "1619", ["1776", "1492"], "They arrived at Point Comfort."],
  ["Colonists also enslaved…", "Indigenous people", ["only Europeans", "no one else"], "Native people were enslaved and sold, too."],
  ["Ways enslaved people resisted included…", "escaping, slowing work and keeping their culture", ["doing nothing", "only writing to the king"], "Resistance took many forms."],
  ["The Stono Rebellion of 1739, one of the largest uprisings of enslaved people in the colonies, took place in…", "South Carolina", ["Massachusetts", "Pennsylvania"], "It began near the Stono River."],
  ["Enslaved people kept their culture alive through…", "music, stories, food and faith", ["forgetting it", "only paper records"], "Culture was a source of strength."],
  ["Gradual abolition meant slavery…", "was ended step by step over years", ["ended in one day", "grew larger"], "Northern states used gradual abolition laws."],
  ["In 1777, which place's constitution became the first in what is now the US to ban adult slavery?", "Vermont", ["Virginia", "Georgia"], "Vermont was not yet a state."],
  ["Pennsylvania passed a gradual abolition law in…", "1780", ["1619", "1865"], "It freed children born after the law at age 28."],
  ["While Northern states slowly ended slavery, in the South slavery…", "grew", ["ended right away", "was never legal"], "Cotton and rice plantations relied on it."],
  ["Elizabeth Freeman, an enslaved woman, went to court in Massachusetts in 1781 and won her…", "freedom", ["farm", "election"], "Her case helped end slavery in Massachusetts."],
  ["Phillis Wheatley, an enslaved African woman in Boston, became famous for her…", "poetry", ["inventions", "paintings"], "Her book was published in 1773."],
  ["Crispus Attucks, a man of African and Native descent, was killed in the…", "Boston Massacre", ["Battle of Yorktown", "Pueblo Revolt"], "He is remembered as the first to die."],
  ["Why is it important to study slavery in early America?", "it shaped the nation and still affects people today", ["it isn't", "it only happened in Europe"], "History connects to the present."],
  ["Britain promised freedom to enslaved people who…", "joined the British side in the Revolution", ["stayed on plantations", "moved to France"], "Thousands escaped to British lines."],
  ["In 1776, the Declaration said all men are created equal, but…", "slavery was legal in all 13 colonies", ["slavery had ended", "women could vote"], "The words did not match the reality."],
  ["Slave traders made money by…", "buying and selling human beings", ["growing their own food", "building schools"], "The trade treated people as property."],
  ["The slave trade affected Africa by…", "taking millions of people and breaking apart families and communities", ["making Africa richer", "having no effect"], "Whole communities were harmed."],
  ["Equality means…", "everyone has the same rights", ["some people have more rights", "no one has rights"], "It is a founding ideal."],
  ["People today who work against unfairness continue the work of freedom fighters by…", "speaking up, voting and organizing", ["staying silent", "ignoring the past"], "The struggle for justice continues."],
  ["Benjamin Banneker, a free Black man, is known for…", "astronomy, maths and helping survey Washington, D.C.", ["leading the Continental Army", "writing the Constitution"], "He made almanacs and a wooden clock."],
  ["The Constitution of 1787 let the slave trade continue until…", "1808", ["1776", "1865"], "Congress banned the import of enslaved people in 1808.", true],
  ["People who escaped slavery sometimes found refuge in…", "free areas, Native nations or Spanish Florida", ["slave markets", "plantations"], "Some joined Seminole communities.", true],
  ["After the cotton gin (1793), slavery in the South…", "grew because cotton became more profitable", ["ended", "stayed exactly the same"], "Cotton plantations spread.", true],
  ["The Three-Fifths Compromise counted enslaved people as three-fifths of a person for…", "deciding representation in Congress", ["paying wages", "choosing the President directly"], "It gave slave states more seats.", true],
];

const REVOLUTION: Q[] = [
  ["The French and Indian War ended in…", "1763", ["1776", "1492"], "Britain won and gained French lands."],
  ["After the French and Indian War, Britain taxed the colonies to…", "pay its war debts", ["build Oregon", "fund Spanish missions"], "The war was expensive."],
  ["The Stamp Act of 1765 taxed…", "printed paper like newspapers and documents", ["only tea", "horses"], "Each paper needed a tax stamp."],
  ["'No taxation without representation' meant colonists…", "had no vote in Parliament, so its taxes were unfair", ["wanted higher taxes", "had their own king"], "They wanted a say."],
  ["The Boston Massacre happened in…", "1770", ["1607", "1812"], "British soldiers fired on a crowd."],
  ["At the Boston Tea Party in 1773, colonists…", "dumped British tea into Boston Harbor", ["held a tea festival", "bought all the tea"], "They protested the Tea Act."],
  ["The first battles of the Revolutionary War were at…", "Lexington and Concord, in 1775", ["Yorktown, in 1781", "Gettysburg, in 1863"], "The 'shot heard round the world'."],
  ["The Declaration of Independence was approved on…", "July 4, 1776", ["February 14, 1859", "September 17, 1787"], "That is Independence Day."],
  ["Who wrote most of the Declaration of Independence?", "Thomas Jefferson", ["George Washington", "Benjamin Franklin"], "Jefferson was from Virginia."],
  ["Who commanded the Continental Army?", "George Washington", ["Thomas Paine", "King George III"], "He later became the first President."],
  ["Colonists who wanted independence were called…", "Patriots", ["Loyalists", "Redcoats"], "Patriots supported the Revolution."],
  ["Colonists who stayed loyal to Britain were called…", "Loyalists", ["Patriots", "Minutemen"], "Loyalists supported the king."],
  ["The Battle of Saratoga (1777) was a turning point because…", "it convinced France to join the Patriots", ["it ended the war", "Britain won it"], "French help was key."],
  ["Where did the British army surrender in 1781?", "Yorktown, Virginia", ["Boston", "Philadelphia"], "French and American forces trapped it."],
  ["The Treaty of Paris of 1783…", "recognized American independence", ["started the war", "created Oregon"], "Britain accepted the new nation."],
  ["Many Native nations sided with the British because…", "they hoped Britain would stop settlers taking their land", ["Britain paid no attention to them", "they wanted to move to Britain"], "Britain had tried to limit western settlement."],
  ["The Proclamation of 1763 tried to stop colonists from settling…", "west of the Appalachian Mountains", ["in Boston", "near the Atlantic"], "Colonists were angry about it."],
  ["Abigail Adams asked her husband John to…", "'remember the ladies' in the new laws", ["leave the Congress", "join the British"], "She wanted rights for women."],
  ["Which European country sent soldiers and ships to help the Patriots?", "France", ["Russia", "Portugal"], "France was Britain's rival."],
  ["Thomas Paine's pamphlet Common Sense argued for…", "independence from Britain", ["loyalty to the king", "a new tax"], "It sold over 100 000 copies."],
  ["James Armistead Lafayette, an enslaved man, helped the Patriots by…", "spying on the British", ["leading the navy", "writing the Constitution"], "His reports helped win at Yorktown."],
  ["During the Revolution, the Oneida Nation helped the Patriots, while many Mohawk sided with…", "the British", ["Spain", "France"], "The war divided the Haudenosaunee."],
  ["Why did people see the Revolution differently?", "it affected Patriots, Loyalists, enslaved people and Native nations in different ways", ["everyone agreed", "no one cared"], "Consider many perspectives."],
  ["The Intolerable Acts of 1774 closed…", "the port of Boston", ["every school", "the Mississippi River"], "They punished Boston for the Tea Party."],
  ["The Continental Army spent a hard winter training at…", "Valley Forge", ["Yorktown", "Jamestown"], "It was the winter of 1777–1778.", true],
  ["Bernardo de Gálvez, governor of Spanish Louisiana, helped the Patriots by…", "fighting the British along the Gulf Coast", ["writing the Declaration", "selling tea"], "Spain was also Britain's rival.", true],
  ["Deborah Sampson fought in the Continental Army by…", "disguising herself as a man", ["leading the British", "staying home"], "Women were not allowed to enlist.", true],
  ["The Declaration's list of complaints was aimed at…", "King George III", ["George Washington", "the King of France"], "It listed the king's wrongs.", true],
];

const CONSTITUTION: Q[] = [
  ["The first plan of government for the United States was the…", "Articles of Confederation", ["Bill of Rights", "Mayflower Compact"], "It was replaced in 1789."],
  ["Under the Articles of Confederation, the national government…", "could not collect taxes", ["had a strong president", "ruled the states completely"], "It was too weak."],
  ["The Constitution was written in 1787 in…", "Philadelphia", ["Boston", "Salem"], "Delegates met at Independence Hall."],
  ["The Preamble begins with the words…", "We the People", ["Four score and seven years ago", "When in the course of human events"], "Power comes from the people."],
  ["'We the People' shows that the government's power comes from…", "the people", ["the king", "the army"], "This is popular sovereignty."],
  ["Which Preamble goal means keeping peace at home?", "insure domestic Tranquility", ["provide for the common defence", "secure the Blessings of Liberty"], "Tranquility means calm."],
  ["Which Preamble goal means protecting the country from attack?", "provide for the common defence", ["establish Justice", "promote the general Welfare"], "Defence means protection."],
  ["The legislative branch, Congress,…", "makes laws", ["enforces laws", "decides what laws mean"], "Congress writes laws."],
  ["The executive branch is led by the…", "President", ["Chief Justice", "Speaker of the House"], "The President carries out laws."],
  ["The judicial branch is led by the…", "Supreme Court", ["Senate", "Cabinet"], "Courts decide what laws mean."],
  ["Checks and balances mean…", "each branch can limit the others", ["one branch has all the power", "the states have no power"], "No branch is too powerful."],
  ["The Great Compromise created a Congress with…", "a Senate with equal votes per state and a House based on population", ["only one house", "members chosen by the king"], "It balanced large and small states."],
  ["The Bill of Rights is…", "the first ten amendments to the Constitution", ["the Declaration of Independence", "a list of taxes"], "It protects individual rights."],
  ["The Bill of Rights was added in…", "1791", ["1776", "1865"], "States ratified it in 1791."],
  ["Why did some states want a Bill of Rights before ratifying the Constitution?", "to protect individual rights in writing", ["to add more taxes", "to make a king"], "It helped win ratification."],
  ["The First Amendment protects…", "freedom of speech, religion, press, assembly and petition", ["the right to bear arms", "trial by jury"], "Five freedoms in one amendment."],
  ["Which amendment protects against unreasonable searches?", "the Fourth", ["the First", "the Tenth"], "Police usually need a warrant."],
  ["Which amendment gives a right to a speedy jury trial in criminal cases?", "the Sixth", ["the Second", "the Ninth"], "It protects people accused of crimes."],
  ["The Fifth Amendment says a person does not have to…", "testify against themselves", ["pay taxes", "vote"], "People can 'plead the Fifth'."],
  ["In most states in 1789, voting was limited mostly to…", "white men who owned property", ["everyone 18 and older", "women only"], "Many people were left out."],
  ["The 1787 Constitution did not protect the rights of…", "enslaved people and women", ["landowners", "members of Congress"], "Rights expanded later through amendments."],
  ["Why does the government collect taxes?", "to pay for services like defence, roads and courts", ["to punish people", "for no reason"], "Taxes fund public goods."],
  ["Federalism means power is shared between…", "the national and state governments", ["the President and the king", "two political parties"], "Each level has its own powers."],
  ["James Madison is called the…", "Father of the Constitution", ["Father of Oregon", "first President"], "He drafted much of it."],
  ["How many states had to ratify the Constitution for it to take effect?", "9", ["13", "4"], "New Hampshire was the ninth, in 1788.", true],
  ["Anti-Federalists opposed the Constitution because they feared…", "a too-powerful national government", ["a weak army", "too many states"], "They pushed for a Bill of Rights.", true],
  ["The first President under the Constitution, in 1789, was…", "George Washington", ["John Adams", "Thomas Jefferson"], "He served two terms.", true],
  ["The Constitution can be changed by…", "an amendment", ["a President's order", "a court's opinion"], "Amendments need wide approval.", true],
];

/** State capitals. Washington State is left out, because oregon.test.ts keeps it out of Oregon units. */
const CAPITALS: [string, string][] = [
  ["Alabama", "Montgomery"],
  ["Alaska", "Juneau"],
  ["Arizona", "Phoenix"],
  ["Arkansas", "Little Rock"],
  ["California", "Sacramento"],
  ["Colorado", "Denver"],
  ["Connecticut", "Hartford"],
  ["Delaware", "Dover"],
  ["Florida", "Tallahassee"],
  ["Georgia", "Atlanta"],
  ["Hawaii", "Honolulu"],
  ["Idaho", "Boise"],
  ["Illinois", "Springfield"],
  ["Indiana", "Indianapolis"],
  ["Iowa", "Des Moines"],
  ["Kansas", "Topeka"],
  ["Kentucky", "Frankfort"],
  ["Louisiana", "Baton Rouge"],
  ["Maine", "Augusta"],
  ["Maryland", "Annapolis"],
  ["Massachusetts", "Boston"],
  ["Michigan", "Lansing"],
  ["Minnesota", "Saint Paul"],
  ["Mississippi", "Jackson"],
  ["Missouri", "Jefferson City"],
  ["Montana", "Helena"],
  ["Nebraska", "Lincoln"],
  ["Nevada", "Carson City"],
  ["New Hampshire", "Concord"],
  ["New Jersey", "Trenton"],
  ["New Mexico", "Santa Fe"],
  ["New York", "Albany"],
  ["North Carolina", "Raleigh"],
  ["North Dakota", "Bismarck"],
  ["Ohio", "Columbus"],
  ["Oklahoma", "Oklahoma City"],
  ["Oregon", "Salem"],
  ["Pennsylvania", "Harrisburg"],
  ["Rhode Island", "Providence"],
  ["South Carolina", "Columbia"],
  ["South Dakota", "Pierre"],
  ["Tennessee", "Nashville"],
  ["Texas", "Austin"],
  ["Utah", "Salt Lake City"],
  ["Vermont", "Montpelier"],
  ["Virginia", "Richmond"],
  ["West Virginia", "Charleston"],
  ["Wisconsin", "Madison"],
  ["Wyoming", "Cheyenne"],
];

const US_MAP: Q[] = [
  ["What is the capital of the United States?", "Washington, D.C.", ["Philadelphia", "New York City"], "It is not part of any state."],
  ["Which long river flows south through the middle of the US to the Gulf of Mexico?", "the Mississippi River", ["the Columbia River", "the Hudson River"], "It drains much of the country."],
  ["Which mountains run through the western United States?", "the Rocky Mountains", ["the Appalachian Mountains", "the Ozarks"], "The Rockies are tall and rugged."],
  ["The five Great Lakes are on the border with…", "Canada", ["Mexico", "Cuba"], "They hold a fifth of the world's fresh surface water."],
  ["How many states are in the United States?", "50", ["13", "48"], "Hawaii became the 50th in 1959."],
];

/** Savings plans, a youth business and incentives. */
function moneyQuestion(): Question {
  const name = pick(["Maya", "Jay", "Amir", "Lena", "Kenji", "Zoe", "Ravi", "Ana", "Noah", "Priya"]);
  const kind = pick(["weeks", "profit", "income"] as const);
  const wrongs = (right: number, cands: number[], unit: (n: number) => string) => {
    const out: number[] = [];
    for (const c of [...cands, right + 1, right + 2, right - 1, right + 3]) if (c > 0 && c !== right && !out.includes(c) && out.length < 3) out.push(c);
    return out.map(unit);
  };
  const dollars = (n: number) => `$${n}`;
  if (kind === "weeks") {
    const per = randInt(4, 15);
    const weeks = randInt(4, 12);
    const goal = per * weeks;
    return textChoice(`${name} wants to buy a $${goal} bike and plans to save $${per} each week. How many weeks will it take?`, `${weeks} weeks`, wrongs(weeks, [per, weeks + 4], (n) => `${n} weeks`), `${goal} ÷ ${per} = ${weeks}.`);
  }
  if (kind === "profit") {
    const price = randInt(1, 4);
    const cups = randInt(10, 40);
    const cost = randInt(5, price * cups - 5);
    const r = price * cups - cost;
    return textChoice(`${name} sells lemonade for $${price} a cup and sells ${cups} cups. Supplies cost $${cost}. What is the profit?`, dollars(r), wrongs(r, [price * cups, cost, price * cups + cost], dollars), `Income ${price} × ${cups} = ${price * cups}, minus costs ${cost} = ${r}.`);
  }
  const rate = randInt(5, 15);
  const jobs = randInt(3, 9);
  const r = rate * jobs;
  return textChoice(`${name} charges $${rate} to walk a dog and walks ${jobs} dogs this month. How much does ${name} earn?`, dollars(r), wrongs(r, [rate + jobs, r - rate, r + rate], dollars), `${rate} × ${jobs} = ${r}.`);
}

const MONEY_IDEAS: Q[] = [
  ["Income is…", "money a person earns", ["money a person spends", "a kind of tax"], "Income comes in; expenses go out."],
  ["Expenses are…", "money a person spends", ["money a person earns", "savings in a bank"], "Expenses go out."],
  ["Profit is…", "income minus costs", ["costs minus income", "the price of one item"], "A business wants income greater than costs."],
  ["An incentive is…", "something that encourages people to act", ["a kind of coin", "a law against trade"], "A sale price is an incentive to buy."],
  ["A store offers 'buy one, get one free'. This is an…", "incentive", ["expense", "opportunity cost"], "It encourages buying."],
  ["A savings plan helps you…", "reach a goal by putting money aside regularly", ["spend everything now", "avoid all goals"], "Small amounts add up."],
  ["When choosing a career, people think about…", "training needed, pay and time", ["only the uniform", "their favourite colour"], "Careers involve trade-offs."],
  ["Why might two families save different amounts?", "their incomes, needs and experiences differ", ["one family doesn't care", "saving is not allowed"], "Life circumstances affect saving."],
];

const TIMELINE: Dated[] = [
  ["Columbus reaches the Caribbean", 1492],
  ["Spain founds St. Augustine", 1565],
  ["The English found Jamestown", 1607],
  ["Enslaved Africans are brought to Virginia", 1619],
  ["The Pilgrims land at Plymouth", 1620],
  ["The Pueblo Revolt", 1680],
  ["William Penn founds Pennsylvania", 1681],
  ["Georgia is founded", 1732],
  ["The Stono Rebellion", 1739],
  ["The French and Indian War ends", 1763],
  ["The Stamp Act", 1765],
  ["The Boston Massacre", 1770],
  ["The Boston Tea Party", 1773],
  ["Battles of Lexington and Concord", 1775],
  ["The Declaration of Independence", 1776],
  ["Vermont bans adult slavery", 1777],
  ["Pennsylvania's gradual abolition law", 1780],
  ["The British surrender at Yorktown", 1781],
  ["The Treaty of Paris", 1783],
  ["The Constitution is written", 1787],
  ["George Washington becomes President", 1789],
  ["The Bill of Rights is ratified", 1791],
  ["The cotton gin is invented", 1793],
];

export const OWN_SOCIAL_5: Unit[] = [
  bankUnit({
    id: "or-g5-first-nations",
    title: "Nations Before Contact",
    emoji: "🌽",
    blurb: "Many nations, many ways of life",
    parentNote: "The many distinct Native nations of North America before contact and how they lived in different regions, their governments and trade, and how they shaped the early United States. Native nations are living communities today.",
    standards: ["5.H.CP.10; 5.H.CE.8; 5.C.PI.1", "the distinct ways of knowing and living of Indigenous peoples of North America before contact, and their effects on the early United States"],
    items: FIRST_PEOPLES,
  }),
  bankUnit({
    id: "or-g5-encounters",
    title: "Encounters & Colonization",
    emoji: "⛵",
    blurb: "Explorers, the Columbian Exchange and its costs",
    parentNote: "European exploration and colonization from 1492 to the 1700s, the Columbian Exchange, cooperation and conflict between Native nations and Spanish, French and English colonists, and the effects of conquest and assimilation.",
    standards: ["5.H.CH.2; 5.G.HI.6; 5.G.HI.7; 5.G.MM.4; 5.H.CC.4; 5.H.CC.5", "European exploration and colonization, encounters with Indigenous nations, and the effects of conquest and assimilation"],
    items: ENCOUNTERS,
  }),
  bankUnit({
    id: "or-g5-thirteen-colonies",
    title: "The 13 Colonies",
    emoji: "🏘️",
    blurb: "Regions, work and self-government",
    parentNote: "The geography of New England, the Middle and the Southern colonies, why colonies were founded, mercantilism and specialization, and early self-government.",
    standards: ["5.G.GR.3; 5.C.PI.1; 5.H.CE.6; 5.E.MI.5; 5.E.ST.10", "the geography of the thirteen colonies, colonial government and daily life, mercantilism and specialization"],
    items: COLONIES,
  }),
  bankUnit({
    id: "or-g5-slavery-and-resistance",
    title: "Slavery & Resistance",
    emoji: "⛓️",
    blurb: "The slave trade and the fight for freedom",
    parentNote: "The transatlantic slave trade and slavery in the colonies, the enslavement of Indigenous people, the many ways enslaved people resisted, gradual abolition in the North and people who fought for freedom. Told plainly and age-appropriately.",
    standards: ["5.H.CH.1; 5.E.MI.6; 5.H.CP.9; 5.H.CC.3", "the role of slavery in the colonies, the slave trade, gradual abolition and people who resisted enslavement"],
    items: SLAVERY,
  }),
  bankUnit({
    id: "or-g5-revolution",
    title: "The American Revolution",
    emoji: "🥁",
    blurb: "From taxes to independence",
    parentNote: "Causes of the Revolution from 1763, the Declaration of Independence, key battles, the Treaty of Paris, and the different perspectives of Patriots, Loyalists, enslaved people, women and Native nations.",
    standards: ["5.H.CE.7; 5.H.CE.6; 5.C.PI.3", "multiple perspectives on the causes and effects of independence from Britain, and the founders"],
    items: REVOLUTION,
  }),
  bankUnit({
    id: "or-g5-constitution",
    title: "Constitution & Bill of Rights",
    emoji: "📜",
    blurb: "The Preamble, the branches and our rights",
    parentNote: "Why the Articles of Confederation were replaced, the Preamble, the three branches and checks and balances, the Bill of Rights (1791), and who was left out of rights in 1789.",
    standards: ["5.C.DP.5; 5.C.CE.6; 5.C.PI.2; 5.C.IR.4; 5.E.MI.4", "the Preamble and Constitution, the Bill of Rights, who gained and lost rights, and why government collects taxes"],
    items: CONSTITUTION,
  }),
  mixUnit({
    id: "or-g5-states-capitals",
    title: "States & Capitals",
    emoji: "🗺️",
    blurb: "Find the capital of every state",
    parentNote: "The capital cities of the 50 states, and major rivers, mountains and lakes of the United States.",
    standards: ["5.G.GR.2", "locating states, capital cities and important geographic features on a US map"],
    make: (d) => [
      ...factQuestions(CAPITALS, d === 1 ? 7 : 7, {
        ask: (state) => `What is the capital of ${state}?`,
        reverse: (city) => `${city} is the capital of which state?`,
        hint: (state, city) => `The capital of ${state} is ${city}.`,
        avoid: (state) => (state === "West Virginia" || state === "South Carolina" ? ["South Carolina", "West Virginia"] : []),
      }),
      ...fromItems(US_MAP, 1, d),
    ],
  }),
  mixUnit({
    id: "or-g5-earn-and-save",
    title: "Earning & Saving",
    emoji: "🍋",
    blurb: "Savings plans and a kid business",
    parentNote: "Making a savings plan for a goal, estimating what a youth business can earn, income, expenses and profit, incentives, career choices and why people save differently.",
    standards: ["5.E.ES.1; 5.E.ES.2; 5.E.IC.7; 5.E.IC.8; 5.E.IC.9", "savings plans, a youth business's income, career choices, incentives and differences in saving"],
    make: (d) => [moneyQuestion(), moneyQuestion(), moneyQuestion(), moneyQuestion(), ...fromItems(MONEY_IDEAS, 4, d)],
  }),
  timelineUnit({
    id: "or-g5-timeline",
    title: "Colonies to Constitution",
    emoji: "⏳",
    blurb: "Put 1492 to 1793 in order",
    parentNote: "Ordering events from Columbus to the Bill of Rights, including slavery and resistance, to see causes and effects over time.",
    standards: ["5.H.CH.2; 5.H.CE.7", "tracing colonization and the events leading to independence in order"],
    events: TIMELINE,
  }),
];
