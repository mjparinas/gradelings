import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Connecticut Grade 5 social studies, United States History I: Connecticut in the Colonial Era, with the Fundamental
// Orders, the colony's land and trade, wampum, the Pequot War and Connecticut's connection to the slave trade
// (5.His.9.a, 5.His.16.a, 5.His.14.d, 5.Geo.2.a, 5.Eco.3.a, 5.Eco.5.a), and Connecticut in the American Revolution: the
// Provision State, its people and their different points of view (5.His.16.b, 5.His.16.c, 5.His.4.b, 5.Eco.15.a,
// 5.Civ.3.a). The Mohegan and Mashantucket Pequot nations are living communities today.

const COLONY: Q[] = [
  ["In 1636, Thomas Hooker led a group of settlers from Massachusetts Bay to found…", "Hartford", ["New York City", "Boston"], "They walked with their cattle to the Connecticut River."],
  ["The first three English towns on the Connecticut River were Hartford, Windsor and…", "Wethersfield", ["Mystic", "Stamford"], "Together they formed the Connecticut Colony."],
  ["In 1639, the river towns wrote a plan of government called the…", "Fundamental Orders", ["Mayflower Compact", "Bill of Rights"], "It is one reason Connecticut is the Constitution State."],
  ["The Fundamental Orders said that government gets its power from…", "the consent of the people", ["a king alone", "one wealthy family"], "Thomas Hooker preached this idea."],
  ["Under the Fundamental Orders, freemen voted to choose…", "a governor and lawmakers", ["the king of England", "a new pope"], "It set up a representative government."],
  ["New Haven Colony was founded in 1638 and later…", "joined Connecticut", ["became a separate country", "moved to Virginia"], "It joined in 1665."],
  ["In 1662, King Charles II gave Connecticut a…", "charter", ["navy", "crown"], "A charter is a written grant of rights."],
  ["According to legend, colonists hid Connecticut's charter in a…", "large oak tree", ["church bell", "well"], "It became known as the Charter Oak."],
  ["Connecticut was one of the colonies in which region?", "New England", ["the Middle Colonies", "the Southern Colonies"], "New England had rocky soil and long winters."],
  ["Most colonial Connecticut families made a living by…", "farming", ["gold mining", "growing cotton"], "Rocky soil made farms small."],
  ["Connecticut ships carried horses, cattle and food to the…", "West Indies in the Caribbean", ["Pacific islands", "North Pole"], "They brought back sugar and molasses."],
  ["Towns along the Connecticut River and coast built…", "ships", ["pyramids", "castles"], "Forests gave plenty of wood."],
  ["Wampum, beads made from shells, was used for…", "trade and agreements", ["building houses", "cooking"], "Colonists sometimes used it like money."],
  ["Before the English came, the land of Connecticut was home to…", "many Native nations", ["no one", "only French traders"], "The Mohegan, Pequot and others lived here."],
  ["The Pequot War of 1636 to 1637 was a conflict between the Pequot and…", "the English colonists and their allies", ["the French and Spanish", "the Dutch only"], "Many Pequot people were killed or captured."],
  ["The Mashantucket Pequot Tribal Nation today…", "has its own government and museum", ["no longer exists", "lives only in history books"], "Native nations are living communities."],
  ["Yale, one of the oldest colleges in the country, was founded in Connecticut in…", "1701", ["1492", "1900"], "It later moved to New Haven.", true],
  ["Why were the Fundamental Orders important to later American government?", "they set up government by the people's consent", ["they made a king", "they ended all voting"], "Ideas from them show up in later constitutions.", true],
  ["Why did farms in New England stay smaller than plantations in the South?", "rocky soil and a short growing season", ["there was too much flat land", "it never snowed"], "Environment shapes how people live.", true],
  ["Why was the charter worth hiding in 1687?", "it protected Connecticut's right to govern itself", ["it was made of gold", "it held a treasure map"], "A royal governor wanted to take it.", true],
  ["How was Connecticut connected to the transatlantic slave trade?", "its ships and ports took part in trade linked to slavery", ["it had no ships", "it stopped all trade"], "New London's deep harbor sent ships to the Caribbean.", true],
  ["Enslaved Africans lived in colonial Connecticut. This shows that slavery…", "was part of New England too, not only the South", ["never reached the North", "was against the law from the start"], "Records list enslaved people in many towns.", true],
  ["Why did settlers want land along the Connecticut River?", "rich soil and easy travel by boat", ["it was a desert", "it had no fish"], "The river valley has fertile land.", true],
  ["Why did trade with the West Indies matter to Connecticut farmers?", "they could sell food and animals there", ["they bought all their food there", "the West Indies made cars"], "Colonies traded what they made.", true],
  ["Which source could best tell us what the Fundamental Orders said?", "a copy of the document itself", ["a modern cartoon", "a weather map"], "The document is a primary source.", true],
  ["Why do historians use sources from Native nations as well as colonists to study the Pequot War?", "to understand more than one point of view", ["because colonists wrote nothing", "to find only one side"], "Different people saw events differently.", true],
];

const REVOLUTION: Q[] = [
  ["During the American Revolution, Connecticut was called the…", "Provision State", ["Sunshine State", "Golden State"], "It sent food and supplies to the army."],
  ["Connecticut sent the Continental Army…", "food, cattle and gunpowder", ["airplanes", "computers"], "Farms fed the soldiers."],
  ["Jonathan Trumbull was the only colonial governor who…", "supported the Patriots", ["supported the king", "left for England"], "George Washington relied on him for supplies."],
  ["Nathan Hale, a teacher from Coventry, was a…", "spy for the Patriots", ["British general", "king's judge"], "He is Connecticut's state hero."],
  ["Nathan Hale is remembered for saying he regretted having only one life to…", "lose for his country", ["spend on farming", "give to the king"], "He was captured in 1776."],
  ["Israel Putnam of Connecticut was a Patriot…", "general", ["king", "ship's cook"], "He fought at the Battle of Bunker Hill."],
  ["Patriots wanted…", "independence from Britain", ["more taxes from Britain", "a new king"], "Loyalists stayed loyal to the king."],
  ["Loyalists were colonists who…", "stayed loyal to the British king", ["wanted independence", "lived in France"], "Some Connecticut families were Loyalists."],
  ["In 1777, British soldiers raided Danbury to destroy…", "army supplies", ["a castle", "a gold mine"], "Danbury held supplies for the Patriots."],
  ["Benedict Arnold was born in Connecticut. He is known for…", "switching to the British side", ["writing the Constitution", "being the first president"], "His name came to mean traitor."],
  ["In 1781, Benedict Arnold led British troops that burned…", "New London", ["Hartford", "Litchfield"], "They also attacked Fort Griswold in Groton."],
  ["Privateers were privately owned ships that…", "captured enemy ships in war", ["carried mail only", "fished for whales"], "Connecticut sent out many privateers."],
  ["The Revolution ended with the Treaty of Paris in…", "1783", ["1620", "1865"], "Britain recognized the United States."],
  ["Roger Sherman of Connecticut signed the Declaration of Independence and the…", "Constitution", ["Magna Carta", "Treaty of Versailles"], "He helped plan the new government."],
  ["Connecticut approved the United States Constitution in 1788 as the…", "fifth state", ["first state", "fiftieth state"], "Delegates met in Hartford."],
  ["Hundreds of Black soldiers from Connecticut fought in the…", "Continental Army", ["British navy only", "French army only"], "Some were enslaved men promised freedom.", true],
  ["Jordan Freeman and Lambert Latham were Black soldiers who died defending…", "Fort Griswold", ["Fort Sumter", "the Alamo"], "A monument in Groton honors the defenders.", true],
  ["Samson Occom was a Mohegan minister and writer who…", "helped found a new Native community in New York", ["was a British general", "led the Boston Tea Party"], "It was called Brothertown.", true],
  ["Why did some Black Americans support the Patriots while others joined the British?", "each side promised freedom to some enslaved people", ["they all had the same view", "the war did not affect them"], "People chose sides for different reasons.", true],
  ["Why did some Native nations try to stay out of the Revolution or choose sides carefully?", "they wanted to protect their land and people", ["they did not live nearby", "they had no leaders"], "Each nation made its own choice.", true],
  ["Hannah Bunce Watson ran a Hartford newspaper during the war. Why did newspapers matter?", "they spread news and ideas about the Revolution", ["they sold only toys", "they were written by the king"], "She kept the Courant printing after her husband died.", true],
  ["Why was Connecticut able to send so much food to the army?", "it had many farms and few big battles on its land", ["it had the most gold", "it had no farms"], "Farms and location helped.", true],
  ["How did the colonies depend on each other during the war?", "they shared supplies, soldiers and money", ["each fought alone", "they traded only with Britain"], "Working together helped them win.", true],
  ["The Connecticut Compromise at the Constitutional Convention created…", "a Congress with a House and a Senate", ["a king", "one state with all the power"], "Roger Sherman and Oliver Ellsworth proposed it.", true],
  ["Why did Connecticut farmers and merchants feel the cost of the war?", "taxes rose and trade with Britain stopped", ["prices fell to zero", "the war never reached them"], "Wars have economic effects.", true],
  ["A letter written by a soldier at Valley Forge is useful because it…", "shows what the war was like for him", ["proves every soldier felt the same", "is a modern opinion"], "Primary sources give one person's view.", true],
];

export const SOCIAL_5: Unit[] = [
  bankUnit({
    id: "ct-g5-colonial-connecticut",
    title: "Colonial Connecticut",
    emoji: "📜",
    blurb: "The Fundamental Orders, the Charter Oak and colonial life",
    parentNote:
      "Connecticut in the Colonial Era: Thomas Hooker and the river towns, the Fundamental Orders of 1639 and the idea of government by consent, the charter and the Charter Oak, farming and West Indies trade, wampum, the Pequot War, Connecticut's ties to the slave trade, and the Native nations that live in Connecticut today.",
    standards: ["5.His.9.a; 5.His.16.a; 5.His.14.d; 5.Geo.2.a; 5.Eco.3.a; 5.Eco.5.a", "the Fundamental Orders, significant people and events of colonial Connecticut, its land, trade and connection to the slave trade"],
    items: COLONY,
  }),
  bankUnit({
    id: "ct-g5-connecticut-revolution",
    title: "Connecticut in the Revolution",
    emoji: "🥁",
    blurb: "The Provision State, Nathan Hale and Patriots and Loyalists",
    parentNote:
      "Connecticut's part in the American Revolution: the Provision State and Governor Trumbull, Nathan Hale, Israel Putnam, the Danbury raid, Benedict Arnold and the burning of New London, Black soldiers and Native leaders and their points of view, Roger Sherman, and the Connecticut Compromise.",
    standards: ["5.His.16.b; 5.His.16.c; 5.His.4.b; 5.Eco.15.a; 5.Civ.3.a", "Connecticut's role in the American Revolution, its people, different points of view about the war, and the Constitution"],
    items: REVOLUTION,
  }),
];
