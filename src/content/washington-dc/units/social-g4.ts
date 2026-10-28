import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Washington, DC Grade 4 social studies, "North America: Its First Peoples and a New Nation" (the DC Social Studies
// Standards, 2023): how people came to the Americas, the farming of Indigenous peoples and the Mississippian and
// Haudenosaunee societies (4.4; 4.5; 4.9; 4.12; 4.14), the arrival of Europeans, Jamestown and 1619 (4.16; 4.20; 4.27;
// 4.29), and the Constitution's three branches, the Bill of Rights and why the capital was set in a federal district
// (4.45 to 4.48; 4.50; 4.51). The colonies, the road to revolution, the Revolution and the Constitutional Convention are
// practised with adopted units (see ../plan/social.ts). Indigenous nations that live today are in the present tense,
// with nothing sacred or ceremonial.

const AMERICAS: Q[] = [
  ["Many scientists think the first people came to the Americas from…", "Asia", ["Europe", "Australia", "Antarctica"], "Asia and North America are close at the far north."],
  ["During the Ice Age, a strip of land joined Asia and Alaska. It is called…", "Beringia", ["Atlantis", "Panama", "Greenland"], "People could walk across it."],
  ["Another idea is that some early people traveled to the Americas by…", "boat along the coast", ["airplane", "train", "hot air balloon"], "They may have followed the Pacific shore."],
  ["Many Indigenous farmers planted corn, beans and squash together. These are called the…", "Three Sisters", ["Three Kings", "Big Three", "Three Seasons"], "The plants help each other grow."],
  ["In the Three Sisters, corn stalks give beans a…", "pole to climb", ["roof", "bath", "blanket"], "Beans are vines."],
  ["In the Three Sisters, squash's big leaves…", "shade the soil and keep in water", ["scare away the Sun", "make the corn sweet", "grow into trees"], "Shade keeps weeds down."],
  ["The Hohokam people of the desert dug long canals to bring water to…", "their fields", ["the ocean", "the mountains", "their boats"], "This is irrigation."],
  ["The Mississippian people built huge earth…", "mounds", ["skyscrapers", "pyramids of glass", "igloos"], "Some mounds were as tall as a ten-story building."],
  ["The largest Mississippian city, with tens of thousands of people around 1100, was…", "Cahokia", ["Jamestown", "Boston", "Tenochtitlan"], "It was near today's St. Louis."],
  ["The Haudenosaunee Confederacy is a union of…", "six Nations", ["two kingdoms", "thirteen colonies", "fifty states"], "It began as five and grew to six."],
  ["The Haudenosaunee homelands are in what is now…", "New York and nearby lands", ["Florida", "Texas", "California"], "Haudenosaunee communities live there today."],
  ["In the Haudenosaunee Confederacy, women called Clan Mothers choose the…", "chiefs", ["kings", "pharaohs", "presidents"], "Women hold real political power."],
  ["The Haudenosaunee lived in long wooden homes called…", "longhouses", ["igloos", "skyscrapers", "castles"], "Many families shared one longhouse."],
  ["The Haudenosaunee Great Law of Peace united the Nations to…", "settle disputes without war", ["build ships", "sell land", "make gold coins"], "It is one of the oldest democracies.", true],
  ["Archaeologists learn about the first Americans from…", "artifacts like tools and pottery", ["phone records", "newspapers", "TV shows"], "Objects can be very old."],
  ["Oral history is history that is…", "passed down by telling", ["only written in books", "made up", "sent by email"], "Elders tell younger people."],
  ["The Inca kept records with knotted strings called…", "quipu", ["papyrus", "glyphs", "scrolls"], "Knots stood for numbers.", true],
  ["The Aztec capital, built on an island in a lake, was…", "Tenochtitlan", ["Cusco", "Cahokia", "Machu Picchu"], "Mexico City stands there today.", true],
  ["The Inca capital in the Andes Mountains was…", "Cusco", ["Tenochtitlan", "Cahokia", "Timbuktu"], "It is in Peru.", true],
  ["Many Indigenous Nations today have their own governments. This right to govern themselves is called…", "sovereignty", ["slavery", "colonization", "monarchy"], "Nations make their own laws on their lands.", true],
  ["Why did the Three Sisters help keep soil healthy?", "beans add nutrients to the soil", ["squash eats the soil", "corn turns soil to sand", "they need no water"], "Farmers could plant the same fields for years.", true],
  ["How did the land shape how Indigenous peoples lived?", "they used the resources nearby", ["they all lived the same way", "they ignored the land", "they bought everything in stores"], "Coasts, deserts and forests offered different things.", true],
  ["The Mississippian people traded goods such as copper and shells over…", "long distances", ["only their own street", "the Internet", "railroads"], "Rivers were their highways.", true],
  ["Which is the best evidence that people lived at a place 1,000 years ago?", "tools found buried in the ground there", ["a new road", "a phone tower", "a parking lot"], "Archaeologists dig carefully.", true],
  ["The Haudenosaunee Confederacy still meets today. That shows it is a…", "living government", ["myth", "game", "lost city"], "Its Nations live today.", true],
];

const CONTACT: Q[] = [
  ["Christopher Columbus sailed for Spain and reached the Caribbean in…", "1492", ["1607", "1776", "1865"], "He was looking for a sea route to Asia."],
  ["Columbus forced the Taíno people he met to…", "work and look for gold", ["become kings", "sail to Spain as rulers", "build the White House"], "Many Taíno died from mistreatment and disease."],
  ["Why do some places now honor Indigenous Peoples' Day?", "to remember the people who were already here", ["to forget history", "to celebrate the Ice Age", "to honor the British king"], "DC observes it in October."],
  ["Sharing of plants, animals, people and diseases between the Americas and Europe is called the…", "Columbian Exchange", ["Silk Road", "Great Migration", "Gold Rush"], "It is named after Columbus."],
  ["Which food went from the Americas to Europe?", "potatoes", ["wheat", "rice", "oranges"], "Potatoes first grew in the Andes."],
  ["Which animal came from Europe to the Americas?", "horses", ["turkeys", "llamas", "bison"], "Horses changed life on the Plains."],
  ["Diseases like smallpox, brought by Europeans, caused…", "millions of Indigenous people to die", ["more corn to grow", "the oceans to rise", "new mountains"], "Indigenous people had no protection from them."],
  ["The first lasting English colony, founded in 1607, was…", "Jamestown", ["Plymouth", "Boston", "St. Augustine"], "It is in Virginia."],
  ["Jamestown was built in the lands of the…", "Powhatan people", ["Aztec", "Inca", "Haudenosaunee"], "The Pamunkey were part of the Powhatan alliance."],
  ["The cash crop that made money for Jamestown was…", "tobacco", ["rice", "cotton candy", "pineapple"], "It grew well in Virginia's soil."],
  ["In 1619, the first enslaved Africans in the English colonies were brought to…", "Virginia", ["Massachusetts", "New York", "Georgia"], "They came on a ship that had seized them from a Portuguese ship."],
  ["The English colonists at Plymouth in 1620 came on the…", "Mayflower", ["Pearl", "Titanic", "Santa María"], "They are called the Pilgrims."],
  ["Enslaved Africans were taken across the Atlantic Ocean on a terrible journey called the…", "Middle Passage", ["Oregon Trail", "Silk Road", "Northwest Passage"], "Many people died on the ships."],
  ["People taken from West Africa came from many different…", "nations, languages and cultures", ["single villages", "European towns", "Asian cities"], "They were not all one people."],
  ["An indentured servant agreed to work for a set number of years in return for…", "the trip to America", ["a castle", "a ship", "gold coins every day"], "Then they were free."],
  ["Pocahontas was the daughter of the leader of the…", "Powhatan", ["Haudenosaunee", "Aztec", "Inca"], "She met the Jamestown colonists.", true],
  ["Why did England start colonies in North America?", "to find riches and land", ["to escape the Moon", "to build the Metro", "to find dinosaurs"], "Companies hoped to make money.", true],
  ["Why is it a problem to call the Americas the \"New World\"?", "people had lived there for thousands of years", ["it was newer than Europe", "it was empty", "it had no history"], "It was new only to Europeans.", true],
  ["Many Indigenous Nations resisted the colonists by…", "fighting, moving and protecting their land", ["giving everything away", "doing nothing", "sailing to England"], "Resistance took many forms.", true],
  ["Enslaved Africans brought skills such as growing rice and…", "working metal", ["flying planes", "driving cars", "building computers"], "Their knowledge built the colonies.", true],
  ["Why is 1619 an important year in American history?", "it marks the start of slavery in the English colonies", ["it is when the Constitution was signed", "it is when DC was founded", "it is when the Civil War ended"], "Its effects lasted for centuries.", true],
  ["Spanish missions and towns were built across what is now the…", "southern and western United States", ["North Pole", "Great Lakes only", "Hawaiian Islands"], "St. Augustine in Florida is the oldest city.", true],
  ["A primary source from Columbus's time is…", "his own journal", ["a cartoon made last year", "a modern textbook", "a movie"], "It was written then, by someone who was there.", true],
  ["Many Jamestown colonists died in the first winters because of…", "hunger and disease", ["too much food", "snowball fights", "lightning"], "This time is called the Starving Time.", true],
];

const GOVERNMENT: Q[] = [
  ["The Constitution sets up how many branches of government?", "3", ["2", "4", "13"], "Legislative, executive and judicial."],
  ["The branch that makes laws is the…", "legislative branch", ["executive branch", "judicial branch", "military branch"], "Congress is this branch."],
  ["The branch that carries out laws is the…", "executive branch", ["legislative branch", "judicial branch", "school branch"], "The president leads it."],
  ["The branch that decides what laws mean is the…", "judicial branch", ["legislative branch", "executive branch", "business branch"], "Courts are this branch."],
  ["Congress is made of the Senate and the…", "House of Representatives", ["Supreme Court", "Cabinet", "DC Council"], "Both meet in the Capitol."],
  ["Each state has how many senators?", "2", ["1", "3", "10"], "Big and small states get the same number."],
  ["A state's number of seats in the House depends on its…", "population", ["size in miles", "age", "weather"], "More people means more representatives."],
  ["The highest court in the United States is the…", "Supreme Court", ["DC Council", "Senate", "Cabinet"], "It has nine justices."],
  ["The idea that each branch can limit the others is called…", "checks and balances", ["cause and effect", "supply and demand", "rise and fall"], "No branch gets too much power."],
  ["The president can stop a bill by refusing to sign it. This is a…", "veto", ["vote", "verdict", "visa"], "Congress can override it with two-thirds."],
  ["The first ten amendments to the Constitution are called the…", "Bill of Rights", ["Declaration of Independence", "Articles of Confederation", "Emancipation Act"], "They protect people's freedoms."],
  ["The First Amendment protects freedom of…", "speech and religion", ["driving fast", "skipping school", "not paying taxes"], "It also protects the press."],
  ["An amendment is a…", "change to the Constitution", ["kind of song", "type of court", "new state"], "There are 27 amendments."],
  ["The Constitution's plan put the capital in a district run by…", "Congress", ["one state", "the king", "the Supreme Court"], "Article I gives Congress this power."],
  ["Leaders put the capital in a federal district so that…", "no single state would control the national government", ["it could be near the ocean", "it would be bigger than every state", "it would have no laws"], "It belongs to the whole nation."],
  ["The building where Congress meets is the…", "US Capitol", ["White House", "Supreme Court Building", "Pentagon"], "It is at the center of DC's quadrants."],
  ["The president lives and works in the…", "White House", ["Capitol", "Library of Congress", "Lincoln Memorial"], "Its address is 1600 Pennsylvania Avenue NW."],
  ["The Supreme Court building is right behind the…", "US Capitol", ["Lincoln Memorial", "Tidal Basin", "Union Station"], "All three branches meet in DC.", true],
  ["States approve a new Constitution or amendment in a process called…", "ratification", ["impeachment", "inauguration", "veto"], "Three-fourths of the states must agree to an amendment.", true],
  ["Some states would ratify the Constitution only if it added a…", "Bill of Rights", ["king", "national bank", "new capital"], "They wanted rights written down.", true],
  ["The president's helpers who lead departments are called the…", "Cabinet", ["Council", "Congress", "Court"], "The secretary of state is one of them.", true],
  ["Unlike the United States, the United Kingdom has a king and a…", "prime minister", ["mayor", "delegate", "Supreme Court only"], "The prime minister leads Parliament.", true],
  ["Who has the power to declare war?", "Congress", ["the president alone", "the Supreme Court", "the mayor"], "The Constitution gives it to Congress.", true],
  ["Who can decide that a law goes against the Constitution?", "the courts", ["the president alone", "a news anchor", "the mayor"], "This is called judicial review.", true],
  ["Washington, DC has a delegate in the House but no vote on final bills because the Constitution gives voting seats to…", "states", ["cities", "rivers", "counties"], "DC is not a state.", true],
];

export const SOCIAL_4: Unit[] = [
  bankUnit({
    id: "dc-g4-first-americans",
    title: "The First Americans",
    emoji: "🌽",
    blurb: "How people came to the Americas, and the farms and nations they built",
    parentNote: "Ideas about how people first came to the Americas (Beringia and the coastal route), how historians and archaeologists learn about them, the Three Sisters and Hohokam canals, the Mississippian city of Cahokia, the Haudenosaunee Confederacy and the political power of its Clan Mothers, and the sovereignty Indigenous nations hold today. Nations that live today are written about in the present tense.",
    standards: ["4.4; 4.5; 4.9; 4.12; 4.14", "how people came to the Americas, Indigenous farming, Mississippian and Haudenosaunee societies, and the sovereignty of Indigenous nations today"],
    items: AMERICAS,
  }),
  bankUnit({
    id: "dc-g4-europeans-arrive",
    title: "Europeans Arrive",
    emoji: "⛵",
    blurb: "Columbus, the Columbian Exchange, Jamestown and 1619",
    parentNote: "The arrival of Europeans in the Americas seen from more than one side: Columbus and the Taíno, the Columbian Exchange of foods, animals and diseases, Jamestown in the lands of the Powhatan, the first enslaved Africans brought to Virginia in 1619, the Middle Passage, indentured servants, and the ways Indigenous nations resisted.",
    standards: ["4.16; 4.18; 4.20; 4.27; 4.29", "Columbus's legacy, the impact of Europeans' arrival on Indigenous nations, the Columbian Exchange, Jamestown and the significance of 1619"],
    items: CONTACT,
  }),
  bankUnit({
    id: "dc-g4-three-branches",
    title: "Three Branches in Our Capital",
    emoji: "⚖️",
    blurb: "Congress, the president, the courts and the Bill of Rights",
    parentNote: "The government the Constitution set up and where it works in Washington, DC: Congress (the Senate and the House), the president and the executive branch, the courts and the Supreme Court, checks and balances, the Bill of Rights and amendments, how the United States compares with a country that has a king and a prime minister, and why the capital was put in a federal district run by Congress.",
    standards: ["4.45; 4.46; 4.47; 4.48; 4.50; 4.51", "the three branches and checks and balances, the Bill of Rights, and why Washington, DC was set up as the capital"],
    items: GOVERNMENT,
  }),
];
