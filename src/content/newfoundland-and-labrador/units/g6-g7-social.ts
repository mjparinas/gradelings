import { bankUnit, type Q } from "../own";

// Grades 6 and 7 social studies, Newfoundland and Labrador: how we are governed, and resources and choices.
//
// Indigenous content is light, in the present tense, and needs review by Innu, Inuit, Mi'kmaq and Southern Inuit
// partners and the Newfoundland and Labrador Department of Education before launch. Don't add more without that.
//
// Sources used to check facts (anything not confirmed there was left out):
//   https://www.assembly.nl.ca/Members/members.aspx (House of Assembly: 40 seats, Confederation Building, St. John's)
//   https://www.gov.nl.ca/hunting-trapping-guide/2023-24/?p=506 (Labrador Inuit Land Claims Agreement, in effect December 1, 2005)
//   https://nunatsiavut.com (Nunatsiavut Government established December 1, 2005)
//   https://www.cnlopb.ca/offshore/ (producing projects: Hibernia, Terra Nova, White Rose, Hebron)
//   https://www.gov.nl.ca/iet/files/OffshoreProduction.pdf (offshore production, Jeanne d'Arc Basin)
//   https://www.gov.nl.ca/lowerchurchillproject/backgrounder_7.htm (Lower Churchill project, Muskrat Falls)
//   https://www.heritage.nf.ca/articles/economy/voiseys-bay.php (Voisey's Bay mine)
//   https://www.budget.gov.nl.ca/budget98/economy/mining.htm (iron ore mining in western Labrador)
// Left out because they could not be confirmed: where the Nunatsiavut Assembly meets, Qalipu details, seat counts
// for other bodies, and current operating status or production numbers for any project.

const GOVERNMENT: Q[] = [
  ["Which three levels of government do people in Newfoundland and Labrador live under?", "municipal, provincial and federal", ["school, church and club", "town, family and team", "local, planet and galactic"], "One is for a town, one for the province, one for all of Canada."],
  ["Who is mainly responsible for local services like garbage pickup and water in a town?", "the town or city council", ["the Prime Minister", "the Senate", "a school board"], "These are municipal services close to home."],
  ["Which of these is mostly run by a municipal government?", "fire services", ["the Canadian army", "passports", "Canada Post"], "Think of a local fire hall in your town."],
  ["Which level of government is mainly responsible for public schools and health care?", "the provincial government", ["the town council", "no government", "a company"], "Education and health are provincial matters."],
  ["Which level of government is mainly responsible for the Canadian Armed Forces?", "the federal government", ["the town council", "the provincial government", "a school council"], "Defending the whole country is a job for all of Canada."],
  ["Which service is handled by the federal government?", "mail delivered across Canada", ["fixing a town road", "running a local pool", "picking up town garbage"], "It covers the whole country, not just one town."],
  ["What is the name of the group that makes laws for the province?", "the House of Assembly", ["the Parliament of Canada", "the town council", "the Supreme Court"], "It meets in the capital city of the province."],
  ["In which city does the House of Assembly meet?", "St. John's", ["Corner Brook", "Gander", "Happy Valley-Goose Bay"], "It is the capital of the province."],
  ["In which building does the House of Assembly meet?", "the Confederation Building", ["City Hall", "Parliament Hill", "the Rooms"], "The name connects to joining Canada."],
  ["What does MHA stand for?", "Member of the House of Assembly", ["Mayor of the Harbour Area", "Minister of Health Affairs", "Member of the Heritage Association"], "An MHA is an elected person who speaks for a district."],
  ["How many seats are in the House of Assembly?", "40", ["12", "100", "338"], "Each seat is for one district."],
  ["What is an electoral district (or riding)?", "an area whose voters elect one MHA", ["a kind of school", "a part of a town road", "a type of ballot box"], "Each area sends one person to the House of Assembly."],
  ["What is the minimum voting age in Canada?", "18", ["12", "16", "25"], "People must be Canadian citizens and this age or older."],
  ["How is an MHA chosen?", "voters in a district mark a ballot in an election", ["the premier picks every MHA", "the oldest person is chosen", "a coin is tossed"], "Citizens decide by voting."],
  ["What is the job of the premier?", "to lead the provincial government", ["to lead the whole country", "to run a town council", "to deliver the mail"], "The premier is the head of the provincial government."],
  ["Who does the Lieutenant Governor represent in the province?", "the Crown", ["the town mayor", "the federal Senate", "the largest company"], "King Charles III is Canada's head of state."],
  ["Who debates and votes on a bill in the House of Assembly?", "the MHAs", ["all students in the province", "the town mayors", "the Prime Minister"], "They are the elected members of the House."],
  ["What is a bill?", "a proposed law", ["a request to pay money", "a piece of a map", "a kind of vote"], "It only becomes a law if it passes."],
  ["What is the last step before a bill becomes law in the province?", "royal assent from the Lieutenant Governor", ["a vote by the mayor", "a school vote", "a newspaper story"], "It is the Crown's official approval."],
  ["Which statement describes a responsibility of a citizen?", "obeying laws and respecting others' rights", ["ignoring all rules", "choosing who may speak", "avoiding all elections"], "Rights come with responsibilities."],
  ["Which of these is a right of Canadian citizens?", "voting in elections", ["ignoring the law", "choosing your own taxes", "making laws alone"], "Adults who are citizens may vote."],
  ["Why does it matter to take part, for example by voting or volunteering?", "so many voices help shape decisions", ["so one person can decide for all", "so nobody needs to listen", "so laws never change"], "Many people sharing ideas makes better choices."],
  ["Which of these is a way to take part in your community?", "volunteering at a local event", ["staying silent forever", "breaking a rule", "ignoring neighbours"], "Giving time helps others."],
  ["What is a democracy?", "a system where people choose leaders by voting", ["a system where one ruler chooses all", "a kind of farm", "a system with no laws"], "Citizens have a say."],
  ["What does the Nunatsiavut Government do?", "governs Labrador Inuit under their land claims agreement", ["governs the whole province", "runs the federal Senate", "picks the premier"], "Nunatsiavut is the Inuit government in northern Labrador.", true],
  ["The Nunatsiavut Government began in 2005 after which agreement came into effect?", "the Labrador Inuit Land Claims Agreement", ["the Terms of Union", "the Churchill Falls contract", "the Fisheries Act"], "The agreement gave Labrador Inuit a self-government.", true],
  ["Which statement about Indigenous governments in the province is true?", "Several have their own governing bodies, such as Innu Nation and Miawpukek First Nation", ["None of them exist today", "They are all run by one council", "They have no members"], "These are living communities with their own leadership.", true],
  ["How is consensus decision-making different from a majority vote?", "everyone works until the group can agree", ["the first person to speak decides", "only the leader decides", "a coin is tossed"], "In a majority vote, more than half decides.", true],
  ["Why might a community want to use consensus for a big decision?", "so that more people feel heard and agree with the result", ["so it takes less time", "so nobody has to speak", "so no one is responsible"], "It often takes longer but can build agreement.", true],
  ["Why do we have three levels of government rather than just one?", "different levels can handle different needs, near or far", ["so people can avoid taxes", "so no one makes decisions", "so mail is faster"], "Local needs are best handled locally.", true],
  ["A town wants to build a new playground. Which level of government would most likely decide?", "the town council", ["the Prime Minister", "the Governor General", "the Supreme Court"], "It is a local project.", true],
  ["A group of students writes to their MHA about a safer crosswalk. What are they doing?", "taking part as active citizens", ["breaking a law", "running for election", "changing a law themselves"], "Writing a respectful letter is one way to be heard.", true],
];

const RESOURCES: Q[] = [
  ["What is a natural resource?", "something from nature that people use", ["something made in a factory", "a kind of money", "a kind of game"], "Water, fish, trees and minerals are examples."],
  ["Which of these is a renewable resource?", "trees in a managed forest", ["oil", "iron ore", "nickel"], "It can grow back if cared for."],
  ["Which of these is a non-renewable resource?", "oil", ["wind", "fish that are well managed", "sunshine"], "It takes millions of years to form."],
  ["Why is iron ore called non-renewable?", "once it is mined, it cannot be replaced in our lifetime", ["it grows back every year", "it is made by wind", "it is a type of plant"], "It forms slowly deep in the earth."],
  ["Which of these is a renewable energy source?", "hydro power from flowing water", ["coal", "natural gas", "oil"], "Water keeps flowing through the river."],
  ["Which of these is a project that produces oil off the coast of Newfoundland?", "Hibernia", ["Voisey's Bay", "Churchill Falls", "Wabush"], "It sits in the ocean on a large platform."],
  ["Which of these is also an offshore oil project near Newfoundland?", "Hebron", ["Labrador City", "Gander", "Muskrat Falls"], "Offshore means out in the ocean."],
  ["What does offshore mean?", "away from the land, out at sea", ["inside a big mine", "on a high mountain", "in a city"], "Oil rigs are built in deep water."],
  ["What is an FPSO used for?", "a floating ship that processes and stores oil", ["a plane for tourists", "a fishing net", "a type of dam"], "FPSO stands for floating production, storage and offloading."],
  ["Which Labrador towns are close to important iron ore mining?", "Labrador City and Wabush", ["Nain and Hopedale", "Conne River and Gander", "Bonavista and Trinity"], "They are in western Labrador."],
  ["What is iron ore mainly used to make?", "steel", ["paper", "glass bottles", "cloth"], "Steel is used in buildings, cars and bridges."],
  ["What metals are found at Voisey's Bay in Labrador?", "nickel, copper and cobalt", ["gold, silver and diamonds", "iron and aluminum only", "salt and coal"], "Three metals are named in the mine's story."],
  ["Voisey's Bay is near which Labrador community?", "Nain", ["Corner Brook", "Gander", "Churchill Falls"], "It is on the north coast."],
  ["What is Churchill Falls in Labrador known for?", "a large hydroelectric generating station", ["an iron ore mine", "an offshore oil platform", "a fishing harbour"], "The station produces electricity from falling water."],
  ["Which river is used by the Churchill Falls station?", "the Churchill River", ["the Humber River", "the Exploits River", "the Saint John River"], "The river flows through Labrador."],
  ["What does a hydroelectric station use to make electricity?", "moving water", ["burning coal", "nuclear fuel", "wind turbines"], "Falling water turns a turbine."],
  ["Muskrat Falls is part of which project on the Churchill River?", "the Lower Churchill project", ["the Hibernia project", "the Voisey's Bay mine", "the Trans-Canada Highway"], "It is downstream of Churchill Falls."],
  ["Which two resources are renewable if they are managed with care?", "the fishery and forests", ["oil and nickel", "iron ore and cobalt", "coal and gas"], "Fish and trees can regrow or rebuild."],
  ["Why was the cod fishery closed in 1992?", "there were too few cod left", ["cod swam to another planet", "cod became too large", "people stopped eating fish"], "A moratorium gave cod a chance to recover."],
  ["Which resource uses wind to make electricity?", "a wind turbine", ["an oil rig", "a mine shaft", "a fish plant"], "Spinning blades power a generator."],
  ["What does it mean to export a resource?", "to sell it to another place", ["to keep it for yourself", "to bury it", "to throw it away"], "Oil and iron ore are sold to other countries."],
  ["What is an economy?", "how people make, trade and use goods and services", ["a kind of weather", "a type of rock", "a government building"], "It includes jobs and businesses."],
  ["How can a new mine help a community?", "it can create jobs and bring in money", ["it never changes anything", "it ends all work", "it makes the land larger"], "Workers spend wages in the community."],
  ["How can a new mine hurt the environment?", "it can disturb land and water", ["it always cleans the air", "it plants new forests alone", "it has no effects"], "Digging and processing ore changes the land."],
  ["What does sustainability mean?", "using resources so there is enough for the future", ["using everything quickly", "saving nothing for later", "stopping all work"], "It means thinking about the long term."],
  ["What does stewardship mean?", "taking care of land, water and resources", ["owning everything", "ignoring problems", "selling things quickly"], "A steward looks after something for others."],
  ["A town depends on one mine that closes. What is this called?", "a bust", ["a boom", "a holiday", "a harvest"], "A boom is a time of fast growth."],
  ["What is a boom in a resource economy?", "a time of rapid growth and many jobs", ["a time of no work", "a loud noise", "a type of oil"], "Prices and jobs often rise."],
  ["Why can depending on a single resource be risky?", "if prices fall or it runs out, jobs can be lost", ["it always makes people richer", "resources never change", "it ends all trade"], "A mix of industries is safer.", true],
  ["Which choice is an example of using a resource sustainably?", "setting fishing limits so fish can recover", ["catching as many fish as possible", "closing every harbour", "ignoring the science"], "Limits protect the future catch.", true],
  ["Which is an example of a cause and effect in the oil industry?", "when oil prices fall, companies may hire fewer workers", ["oil prices never change", "oil grows on trees", "workers make prices fall by sleeping"], "Cause comes first, effect follows.", true],
  ["Why might some people support a new mine while others do not?", "they may value jobs and the environment differently", ["everyone must agree", "one side is always wrong", "mines are all alike"], "People weigh benefits and costs differently.", true],
  ["Many Indigenous communities in the province want what in decisions about resources?", "a say in decisions about their land", ["no say at all", "to move away", "to stop speaking"], "Their communities have lived on the land for a very long time.", true],
  ["Why are the Churchill River power projects described as clean energy?", "falling water makes electricity without burning fuel", ["they burn oil", "they burn coal", "they use no water"], "Hydro does not burn fuel.", true],
  ["What is a trade-off?", "giving up something to get something else", ["a free gift", "a type of boat", "a kind of tax"], "More jobs may come with more effects on the land.", true],
  ["Which statement shows a perspective on a resource project?", "A fisher worries oil spills might harm fish", ["The ocean is blue", "A map has a scale", "There are four seasons"], "A perspective is a point of view.", true],
];

export const government = bankUnit({
  id: "nl-government-6",
  title: "How We Are Governed in Newfoundland and Labrador",
  emoji: "🏛️",
  blurb: "Councils, the House of Assembly and Indigenous governments.",
  parentNote:
    "Practises the three levels of government, the House of Assembly and MHAs, how a bill becomes a law, the rights and responsibilities of citizens, and the Indigenous governments of the province. Indigenous content is light and needs review by Indigenous partners.",
  standards: ["Citizenship, power and governance (by Grade 6)", "how municipalities, the province and Indigenous governments make decisions in Newfoundland and Labrador"],
  items: GOVERNMENT,
});

export const resources = bankUnit({
  id: "nl-resources-7",
  title: "Resources and Choices in Newfoundland and Labrador",
  emoji: "⚡",
  blurb: "Oil, minerals, hydro power and the choices they bring.",
  parentNote:
    "Practises renewable and non-renewable resources, offshore oil, mining, hydro power, the fishery and forests, and the choices and perspectives that come with using them. Indigenous content is light and needs review by Indigenous partners.",
  standards: ["Interdependence (by Grade 9)", "the resources of Newfoundland and Labrador, how they are used, and their effects on people and the environment"],
  items: RESOURCES,
});
