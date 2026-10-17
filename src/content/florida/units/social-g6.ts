import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Florida's own Grade 6 social studies units (`fl-` ids): map and place skills for the ancient world (with Florida as
// the home place for latitude and longitude), and slavery in the early Atlantic world, which Florida's standards place
// in Grades 6 to 8 (SS.68.AA). Slavery is told plainly and respectfully.

const ANCIENT_PLACES: Q[] = [
  ["Latitude lines are also called…", "parallels", ["meridians", "contours", "borders"], "They run parallel to the Equator."],
  ["Longitude lines are also called…", "meridians", ["parallels", "tropics", "equators"], "They meet at the poles."],
  ["The Prime Meridian is 0° longitude and passes through…", "Greenwich, England", ["Cairo, Egypt", "Miami, Florida", "Rome, Italy"], "It divides east from west."],
  ["Tallahassee is at about 30° N, 84° W. Which hemispheres is it in?", "Northern and Western", ["Southern and Eastern", "Northern and Eastern", "Southern and Western"], "North of the Equator, west of the Prime Meridian."],
  ["Cairo, Egypt, is at about 30° N, 31° E. How is it different from Tallahassee, Florida?", "It is in the Eastern Hemisphere", ["It is in the Southern Hemisphere", "It is much farther north", "It is at the Equator"], "The E in 31° E."],
  ["Rome, Italy, is at about 42° N, 12° E. It is farther north than Miami (26° N) because its latitude number is…", "greater", ["smaller", "negative", "the same"], "Larger N numbers are farther north."],
  ["A map projection is a way of…", "showing the round Earth on a flat map", ["measuring ocean depth", "tracking storms", "naming cities"], "Every flat map bends something."],
  ["The Mercator map makes land near the poles look…", "larger than it really is", ["smaller than it really is", "exactly right", "invisible"], "Greenland looks huge."],
  ["A map made to show one theme, like trade routes, is a…", "special-purpose map", ["political map", "physical map", "globe"], "It shows a special topic."],
  ["A political map shows…", "borders, countries and cities", ["mountains only", "rainfall", "volcanoes"], "Made by people."],
  ["A map's scale of 1 inch = 100 miles means two cities 3 inches apart are about…", "300 miles apart", ["3 miles apart", "103 miles apart", "30 miles apart"], "Multiply 3 × 100."],
  ["What direction is halfway between north and east?", "northeast", ["southwest", "northwest", "southeast"], "An intermediate direction."],
  ["If you sail from Egypt across the Mediterranean to Greece, you are traveling mostly…", "northwest", ["southeast", "southwest", "northeast"], "Egypt is south and east of Greece."],
  ["Which river flows through ancient Egypt?", "the Nile River", ["the Tigris River", "the Yellow River", "the Indus River"], "It flows north to the Mediterranean."],
  ["Mesopotamia lay between the…", "Tigris and Euphrates rivers", ["Nile and Congo rivers", "Indus and Ganges rivers", "Rhine and Danube rivers"], "The word means \"between rivers.\""],
  ["The Indus River Valley civilization is in what is now…", "Pakistan and northwest India", ["Egypt", "Italy", "Peru"], "South Asia."],
  ["The Huang He, or Yellow River, was the center of early civilization in…", "China", ["India", "Egypt", "Greece"], "East Asia."],
  ["The sea that links Egypt, Greece and Rome is the…", "Mediterranean Sea", ["Caribbean Sea", "Arabian Sea", "Red Sea"], "In the middle of the Roman world."],
  ["Why did early farmers settle along rivers?", "rivers gave water, rich soil and a way to travel", ["rivers were warm", "rivers made mountains", "they wanted to avoid water"], "River valleys fed civilizations."],
  ["Which of these was one of the Seven Wonders of the Ancient World?", "the Great Pyramid of Giza", ["the Eiffel Tower", "the Statue of Liberty", "the Golden Gate Bridge"], "Built in Egypt."],
  ["Only one of the Seven Wonders of the Ancient World still stands today. It is the…", "Great Pyramid of Giza", ["Colossus of Rhodes", "Hanging Gardens of Babylon", "Lighthouse of Alexandria"], "The oldest wonder."],
  ["The Lighthouse of Alexandria was built to…", "guide ships into the harbor", ["store grain", "honor a pharaoh's tomb", "watch for fires"], "A tall tower with a fire."],
  ["The Hanging Gardens were said to have been built in the city of…", "Babylon", ["Athens", "Memphis", "Carthage"], "In Mesopotamia."],
  ["The Colossus was a giant statue on the Greek island of…", "Rhodes", ["Crete", "Sicily", "Cyprus"], "Rhodes in the Aegean."],
  ["Ancient Mesopotamia is in the same area as which modern country?", "Iraq", ["Italy", "Mexico", "Brazil"], "Southwest Asia."],
  ["Ancient Rome was in the same area as the modern country of…", "Italy", ["Egypt", "Peru", "Japan"], "A boot-shaped peninsula."],
  ["To compare an ancient map with a current map, a student could look at how…", "borders and city names have changed", ["the colors are printed", "the paper feels", "the title is written"], "Borders change over time."],
  ["Why did ancient people build cities near seas and rivers?", "trade and travel were easier by water", ["to avoid fresh water", "to live in deserts", "because mountains were unsafe"], "Water routes were highways.", true],
  ["How could deserts and mountains affect ancient civilizations?", "they could block invaders and also limit trade", ["they only helped trade", "they had no effect", "they created seas"], "Barriers protect and isolate.", true],
];

const SLAVE_TRADE: Q[] = [
  ["Before the Atlantic slave trade, the Sahara trade routes carried gold, salt and…", "people and goods between West Africa and North Africa", ["cars and fuel", "computers", "only paper"], "The trans-Saharan trade."],
  ["Which trade routes connected Africa, Asia and Europe before the 1400s?", "Afro-Eurasian routes such as the Silk Roads and Indian Ocean routes", ["Interstate highways", "airplane routes", "the Panama Canal"], "Ancient trade networks."],
  ["In the 1400s, Portuguese sailors began trading along Africa's coast. They soon began…", "buying enslaved people", ["building railroads", "farming wheat in Africa", "mining coal"], "The start of the Atlantic slave trade."],
  ["The Atlantic slave trade forced millions of Africans to…", "cross the ocean to work in the Americas", ["return to Europe", "vote", "stay in Africa as kings"], "The Middle Passage."],
  ["In 1619 the first recorded Africans arrived in the English colony of…", "Virginia", ["Massachusetts", "Florida", "Georgia"], "Jamestown."],
  ["An indentured servant was a person who…", "worked for a set number of years to pay for the trip to America", ["was paid a king's ransom", "owned a plantation", "was a free landowner"], "A contract."],
  ["How was indentured servitude different from slavery?", "indentured servants had contracts that ended; slavery lasted for life", ["there was no difference", "indentured servants owned land", "slavery ended after seven years"], "Terms matter."],
  ["Why did colonial farmers turn more and more to slavery?", "they wanted a cheap workforce for crops like tobacco and rice", ["indentured servants were free to vote", "slavery was illegal", "farms got smaller"], "Money and power."],
  ["Slave codes were laws that…", "took away enslaved people's rights and controlled their lives", ["freed enslaved people", "protected workers", "ended taxes"], "Made slavery harsher."],
  ["Many slave codes made it a crime to…", "gather in groups, travel without a pass or learn to read", ["grow corn", "visit a church", "talk to a doctor"], "Fear of rebellion."],
  ["A law passed in Virginia in 1662 said a child born to an enslaved mother would be…", "enslaved too", ["free", "a citizen", "a master"], "Slavery passed from mother to child."],
  ["In 1712 enslaved people in New York City revolted. Officials responded by…", "punishing them harshly and passing stricter laws", ["freeing them", "passing a Bill of Rights", "leaving the city"], "A sign of resistance and fear."],
  ["The Stono Rebellion of 1739 happened in…", "South Carolina", ["Maine", "Ohio", "Texas"], "A large revolt of enslaved people."],
  ["Spanish Florida welcomed people escaping from the Carolinas by…", "offering freedom at places such as Fort Mose", ["sending them back", "selling them", "ignoring them"], "A route to freedom."],
  ["Enslaved people resisted in many ways, including…", "running away, working slowly and keeping their culture alive", ["voting", "joining Congress", "writing laws"], "Resistance took many forms."],
  ["A person who ran away from slavery was called a…", "fugitive", ["colonist", "Loyalist", "senator"], "Seeking freedom."],
  ["In the American Revolution, Crispus Attucks is remembered because he…", "was killed in the Boston Massacre", ["signed the Constitution", "led the Union army", "wrote the Declaration"], "The first to die in 1770."],
  ["African Americans such as Peter Salem and Salem Poor served the Patriot cause by…", "fighting in the Revolutionary War", ["selling supplies to the king", "writing the Constitution", "running a colony"], "Black patriots."],
  ["Many Black men served in the Continental Army because…", "they hoped for freedom and a better future", ["they were forced to be generals", "they were paid in land", "they were allowed to vote"], "Hope for liberty.", true],
  ["The Declaration of Independence says all men are created equal. Why was this idea hard for the new nation?", "it conflicted with slavery", ["no one believed in it", "only Britain used slavery", "it was written in French"], "Words and actions did not match.", true],
  ["By the 1700s, the largest numbers of enslaved people lived in…", "the southern colonies", ["New England", "the Pacific coast", "the Midwest"], "Large farms needed workers."],
  ["Slavery was legal in which regions of the thirteen colonies?", "all of them, though it was most common in the South", ["only New England", "only the Middle Colonies", "none"], "Not just the South."],
  ["The triangular trade connected…", "Africa, the Americas and Europe", ["Asia, Oceania and the Arctic", "the Poles", "only the South"], "Three corners."],
  ["Free Black communities in the colonies often formed around…", "churches, trades and family ties", ["royal courts", "banks", "factories"], "Mutual support."],
  ["Why is it important to remember the names and stories of enslaved people?", "they were people with families, skills and dreams", ["they have no history", "they were all the same", "they never lived"], "People, not just numbers.", true],
  ["Phillis Wheatley, enslaved in Boston, became famous as a…", "poet", ["general", "governor", "sailor"], "She published a book of poems in 1773.", true],
  ["Why do historians use court records and runaway ads to study enslaved people?", "they are surviving primary sources, though written by slaveholders", ["they were written by the enslaved only", "they are not real", "they are modern"], "Read sources carefully.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "fl-g6-ancient-places",
    title: "Maps & Wonders of the Ancient World",
    emoji: "🗿",
    blurb: "Latitude, projections and ancient places",
    parentNote:
      "Geography skills for ancient history: latitude and longitude (using Florida's cities as examples), map projections, scale and directions, the great rivers and seas of early civilizations, the Seven Wonders of the Ancient World, and how ancient places match today's countries.",
    standards: ["SS.6.G.1.1; SS.6.G.1.2; SS.6.G.1.3; SS.6.G.1.5; SS.6.G.1.6; SS.6.G.1.7; SS.6.G.6.2", "using maps, coordinates and projections to locate ancient civilizations and compare them with today's world"],
    items: ANCIENT_PLACES,
  }),
  bankUnit({
    id: "fl-g6-slavery-early-americas",
    title: "Slavery in the Early Americas",
    emoji: "⛓️",
    blurb: "Trade routes, slave codes and resistance",
    parentNote:
      "African American history before 1800, from Florida's Grades 6 to 8 standards: trade routes that linked Africa, Europe and Asia, the start of the Atlantic slave trade, indentured servitude and slavery in the colonies, slave codes, the revolts of 1712 and 1739, Spanish Florida's offer of freedom, and Black patriots in the Revolution. It is told plainly, with respect for the people involved.",
    standards: ["SS.68.AA.1.1; SS.68.AA.1.2; SS.68.AA.1.3; SS.68.AA.1.4; SS.68.AA.1.5; SS.68.AA.1.6", "the Atlantic slave trade, indentured servitude, slave codes, early revolts and the service of African patriots"],
    items: SLAVE_TRADE,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
