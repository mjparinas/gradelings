import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Arizona Grade 7 integrated global studies: the Industrial Revolution and the age of empires that followed it, how new
// technology changed work and cities, and the causes and effects of imperialism (7.H1.2, 7.H3.2, 7.G3.1).

const INDUSTRY_EMPIRE: Q[] = [
  ["The Industrial Revolution began in the late 1700s in…", "Britain", ["Japan", "Brazil"], "Britain had coal, iron, rivers and trade."],
  ["James Watt improved a machine that powered factories and trains. It was the…", "steam engine", ["windmill", "printing press"], "Steam engines burned coal to make power."],
  ["Before factories, much cloth was spun and woven…", "by hand at home", ["by robots", "in space"], "This was called the domestic system."],
  ["Factories pulled many families from farms into…", "fast-growing cities", ["empty deserts", "mountain forts"], "Moving to cities is called urbanization."],
  ["Early factory workers often faced…", "long hours, low pay and unsafe machines", ["short days and high pay", "no work at all"], "Workers later formed unions to win better conditions."],
  ["Groups of workers who join together to bargain for better pay are…", "labor unions", ["armies", "royal courts"], "Unions organized strikes and pushed for new laws."],
  ["Which fuel powered most early factories and steam trains?", "coal", ["solar power", "uranium"], "Coal mines grew alongside factories."],
  ["The telegraph let people…", "send messages over wires quickly", ["fly across oceans", "store food longer"], "Samuel Morse helped develop it in the 1830s and 1840s."],
  ["Railroads changed trade because they…", "moved goods and people faster and farther", ["only carried mail", "stopped at every farm"], "Railroads linked mines, farms, factories and ports."],
  ["Making many identical products with machines in a factory is…", "mass production", ["bartering", "subsistence farming"], "Interchangeable parts made it possible."],
  ["Factories needed raw materials such as cotton, rubber and copper, which pushed industrial nations to…", "seek colonies and trade abroad", ["stop all trade", "close their factories"], "Raw materials and new markets were reasons for empire."],
  ["When a powerful country takes control of other lands and peoples, it is called…", "imperialism", ["democracy", "isolation"], "Empires ruled colonies for their own benefit."],
  ["A land ruled by a distant country is a…", "colony", ["republic", "union"], "The ruling country is often called the colonial power."],
  ["At the Berlin Conference of 1884–1885, European leaders…", "divided Africa among themselves", ["freed every colony", "ended the slave trade in Asia"], "No Africans were invited to decide.", true],
  ["By 1914, which two African countries were still independent?", "Ethiopia and Liberia", ["Egypt and Kenya", "Nigeria and Ghana"], "Ethiopia defeated an Italian army at Adwa in 1896.", true],
  ["Britain ruled much of South Asia as part of its empire. That colony was called…", "British India", ["New France", "the Gold Coast only"], "It lasted until India and Pakistan became independent in 1947."],
  ["Imperialism often harmed colonized peoples by…", "taking their land and resources and limiting their rights", ["giving them full votes in the empire", "paying them fair prices for everything"], "Many lost their land, languages and self-government."],
  ["China lost wars to Britain in the 1800s over the trade in…", "opium", ["copper", "cotton"], "These were called the Opium Wars.", true],
  ["Japan answered Western power in the late 1800s by…", "building factories and a modern army quickly", ["closing every school", "becoming a European colony"], "This period is called the Meiji Restoration.", true],
  ["After the Spanish-American War of 1898, the United States gained…", "Puerto Rico, Guam and the Philippines", ["Canada and Mexico", "France and Spain"], "The US became an overseas empire."],
  ["The Suez Canal, opened in 1869, connects the Mediterranean Sea to the…", "Red Sea", ["Pacific Ocean", "Baltic Sea"], "It made the trip from Europe to Asia much shorter."],
  ["The Panama Canal, finished in 1914, links the…", "Atlantic and Pacific oceans", ["Red and Black seas", "Arctic and Indian oceans"], "Ships no longer had to sail around South America."],
  ["Nationalism means…", "strong pride in and loyalty to one's nation", ["rule by a king only", "trade without borders"], "Nationalism helped build empires and later helped colonies win independence."],
  ["Many colonies won independence after…", "World War II", ["the Renaissance", "the Stone Age"], "India, Ghana, Indonesia and many others became free nations."],
  ["Mohandas Gandhi led India's struggle for independence through…", "nonviolent protest", ["a large navy", "buying the colony"], "His ideas later inspired Martin Luther King Jr."],
  ["Which effect of the Industrial Revolution is still felt today?", "burning coal and other fuels released more carbon dioxide", ["factories stopped using energy", "cities shrank"], "Scientists link this to climate change.", true],
];

export const SOCIAL_7: Unit[] = [
  bankUnit({
    id: "az-g7-industry-and-empire",
    title: "Industry & Empire",
    emoji: "🏭",
    blurb: "Factories, railroads and the age of empires",
    parentNote: "The Industrial Revolution (steam power, factories, railroads, cities and labor unions) and the age of imperialism that followed: why industrial nations sought colonies, how empires divided Africa and Asia, how colonized peoples were harmed and resisted, and how many colonies won independence.",
    standards: ["7.H1.2; 7.H3.2; 7.G3.1", "how technology changed the world, the causes and effects of imperialism, and how people and goods moved"],
    items: INDUSTRY_EMPIRE,
  }),
];
