import { bankUnit, type Q } from "../own";

// Grades 8 and 9 social studies, Newfoundland and Labrador: Confederation (Grade 8) and land claims and
// self-government in Labrador (Grade 9).
//
// Indigenous content is light and needs review by Innu, Inuit, Mi'kmaq and Southern Inuit partners and the
// Newfoundland and Labrador Department of Education before launch. It is written in the present tense, names each
// community separately, and leaves out sacred or ceremonial details. The Grade 8 unit does not state who did or did
// not take part in the 1940s decisions, and the Grade 9 unit leaves out NunatuKavut (the federal recognition
// situation is nuanced) and any claim about the current status of the Innu final agreement.
//
// Sources checked:
// - Heritage NL (Memorial University): "The 1948 Referendums", https://www.heritage.nf.ca/articles/politics/referendums-1948.php
// - Heritage NL: "Responsible Government, 1855-1933" and "Commission of Government"
// - Heritage NL: "Terms of Union", https://www.heritage.nf.ca/articles/politics/terms-of-union-1949.php
// - The Canadian Encyclopedia: "Joey Smallwood"
// - House of Assembly of Newfoundland and Labrador: history of the Assembly
// - Government of Newfoundland and Labrador: "Labrador Inuit Land Claims Agreement" (hunting and trapping guide)
// - Crown-Indigenous Relations and Northern Affairs Canada: Labrador Inuit Land Claims Agreement annual report, 2005 to 2007
// - Crown-Indigenous Relations and Northern Affairs Canada: Newfoundland and Labrador residential schools healing and commemoration
// - The Canadian Encyclopedia: "Nunatsiavut"; Indigenous Peoples Atlas of Canada: "Nunatsiavut"
// - Heritage NL: "Innu Organizations and Land Claims"; Government of Canada, "New Dawn" Labrador Innu agreements, 2011
// - The Canadian Encyclopedia: "Qalipu Mi'kmaq First Nation" and "Miawpukek First Nation"
// - Constitution Act, 1982, section 35 (Justice Laws Website)
// - Truth and Reconciliation Commission of Canada, final report, 2015 (94 Calls to Action)

const CONFEDERATION: Q[] = [
  ["Before 1949, Newfoundland was…", "a self-governing dominion, separate from Canada", ["a province of Canada", "a territory of France", "part of the United States"], "It was its own country within the British Empire."],
  ["In which year did Newfoundland gain responsible government?", "1855", ["1755", "1905", "1934"], "Think of the middle of the 1800s."],
  ["In responsible government, the cabinet must…", "keep the support of the elected assembly", ["be chosen by a governor alone", "serve for life", "ignore all votes"], "The government answers to the people’s elected members.", true],
  ["Who became the first premier after responsible government began in 1855?", "Philip Francis Little", ["Joseph Smallwood", "Sir John A. Macdonald", "Samuel de Champlain"], "He led the Liberal party in the colony’s first responsible-government election.", true],
  ["In which year did the Commission of Government begin to run Newfoundland?", "1934", ["1855", "1946", "1949"], "It followed the worst years of the Great Depression."],
  ["The Amulree Royal Commission suggested that Newfoundland should…", "replace responsible government with a commission", ["join the United States", "hold a vote every week", "become a colony of Spain"], "Britain was asked to help with the debt.", true],
  ["Which event led Newfoundland to give up self-government in the 1930s?", "the Great Depression and heavy public debt", ["a war with Canada", "the invention of radio", "a change of flag"], "Fish prices fell and the government could not pay its bills."],
  ["How long did the Commission of Government last?", "15 years", ["2 years", "40 years", "100 years"], "It ran from 1934 until 1949."],
  ["Members of the Commission of Government were…", "appointed, not elected by voters", ["chosen in a yearly vote", "all fishers", "children"], "People had no vote for who ran the government."],
  ["What was the National Convention of 1946 for?", "to discuss Newfoundland’s future and suggest choices for a vote", ["to choose a new flag", "to plan a railway", "to end the Depression in Canada"], "Elected delegates met in St. John’s."],
  ["In 1948 the National Convention voted against recommending Confederation for the ballot. What did Britain do?", "It put Confederation on the ballot anyway", ["It cancelled the vote", "It removed the Commission option", "It added the United States option"], "Many people argued about whether this was fair.", true],
  ["How many referendums on Newfoundland’s future were held in 1948?", "two", ["one", "three", "five"], "The first did not produce a clear winner."],
  ["On what date was the first referendum in 1948?", "June 3", ["March 31", "July 22", "December 11"], "It was in early summer."],
  ["On what date was the second referendum in 1948?", "July 22", ["June 3", "March 31", "November 24"], "It was about seven weeks after the first."],
  ["How many choices were on the ballot in the June 1948 referendum?", "three", ["two", "four", "six"], "One of them was keeping the Commission of Government."],
  ["Which option was dropped from the second ballot?", "the Commission of Government", ["Confederation with Canada", "Responsible Government", "Union with Britain"], "It had received the fewest votes in June."],
  ["Why was a second referendum needed?", "No choice won a majority in the first vote", ["Votes were lost in a storm", "The ballot was too short", "Canada demanded it"], "More than half of the votes were needed to win."],
  ["Which option got the most votes in the first referendum?", "Responsible Government", ["Confederation with Canada", "Commission of Government", "Union with Ireland"], "Confederation was a close second.", true],
  ["Which option won the second referendum?", "Confederation with Canada", ["Responsible Government", "Commission of Government", "Union with the United States"], "The result was close but clear."],
  ["Who was the best-known leader of the campaign for Confederation?", "Joseph (Joey) R. Smallwood", ["Philip Francis Little", "Pierre Trudeau", "Lester Pearson"], "He led the Confederate Association."],
  ["What office did Joey Smallwood hold after 1949?", "first premier of the new province", ["governor of the Commission", "Prime Minister of Canada", "mayor of Halifax"], "He held it for nearly 23 years."],
  ["The Terms of Union were signed in Ottawa in December 1948. What do they set out?", "the conditions for Newfoundland joining Canada", ["rules for a hockey league", "a new national anthem", "prices for fish"], "It is like a contract between two governments.", true],
  ["On which date did Newfoundland join Canada?", "March 31, 1949", ["July 1, 1867", "June 3, 1948", "April 17, 1982"], "It happened at the very end of March."],
  ["Newfoundland became which number of province in Canada?", "the tenth", ["the first", "the fifth", "the twelfth"], "It was the last province to join."],
  ["Which reason might lead a voter in 1948 to choose Confederation?", "hope for better public services and economic security", ["to cancel all elections", "to leave the British Empire at once", "to end Canadian trade"], "Many Confederation supporters thought Canada’s programs would help families."],
  ["Which reason might lead a voter in 1948 to choose Responsible Government?", "a wish to govern Newfoundland’s own affairs again", ["a love of the Commission", "a plan to join France", "a fear of elections"], "Many people remembered self-government and wanted it back."],
  ["Which source would be a primary source about the 1948 campaigns?", "a campaign pamphlet printed in 1948", ["a textbook published last year", "a modern film", "a student’s essay"], "A primary source comes from the time being studied."],
  ["Why should a historian be careful with a 1948 campaign pamphlet?", "It was written to persuade voters", ["It is always correct", "It has no date", "It was written by a computer"], "Ask who made it and why.", true],
  ["When Newfoundland joined Canada in 1949, Labrador became…", "part of the new province", ["a separate territory", "a part of Quebec", "its own province"], "The province today is named Newfoundland and Labrador."],
  ["Which statement describes a consequence of the 1949 union?", "Federal laws and programs began to apply in Newfoundland", ["Newfoundland stopped using English", "Elections were cancelled", "The Depression began"], "A consequence is something that happens because of an event.", true],
];

const AGREEMENTS: Q[] = [
  ["What is a land claim agreement?", "an agreement between Indigenous people and governments about rights to land and resources", ["a rental form for an apartment", "a plan for a new road", "a map of a park"], "It is also called a modern treaty."],
  ["What is a treaty?", "a formal agreement between nations or governments", ["a fishing licence", "a kind of boat", "a school rule"], "Treaties can be between Indigenous nations and the Crown."],
  ["Which agreement created Nunatsiavut?", "the Labrador Inuit Land Claims Agreement", ["the Charter of Rights", "the Terms of Union", "the Treaty of Paris"], "It was signed by Labrador Inuit and two governments."],
  ["On what date did the Labrador Inuit Land Claims Agreement take effect?", "December 1, 2005", ["March 31, 1949", "April 17, 1982", "November 24, 2017"], "It took effect on the first day of the last month of 2005."],
  ["Besides the Labrador Inuit Association, which two governments signed the Labrador Inuit Land Claims Agreement?", "Newfoundland and Labrador and Canada", ["Quebec and Nunavut", "Britain and France", "Ontario and Manitoba"], "A provincial and a federal government took part."],
  ["Nunatsiavut means “our beautiful land” in…", "Inuktitut", ["French", "Innu-aimun", "Latin"], "It is the homeland of the Labrador Inuit."],
  ["Which area did the agreement create in northern Labrador?", "the Labrador Inuit Settlement Area", ["the Dominion Zone", "the Confederation Reserve", "the Commission District"], "It includes land and an adjacent ocean zone."],
  ["Which body governs Nunatsiavut for Labrador Inuit?", "the Nunatsiavut Government", ["the Innu Nation", "the Senate of Canada", "the Qalipu council"], "It is a regional Inuit government."],
  ["Where does the Nunatsiavut Assembly meet?", "in Hopedale", ["in Gander", "in Ottawa", "in Conne River"], "Hopedale is the legislative capital; Nain is the administrative capital."],
  ["Which community is the administrative capital of Nunatsiavut?", "Nain", ["Corner Brook", "Natuashish", "St. Anthony"], "It is the northernmost of the five Inuit communities."],
  ["Which of these is one of the five Nunatsiavut Inuit communities?", "Rigolet", ["Sheshatshiu", "Gander", "Goose Bay"], "The five are Rigolet, Makkovik, Postville, Hopedale and Nain."],
  ["Under the agreement, how much land is designated Labrador Inuit Lands, in square kilometres?", "15 800", ["1 580", "158 000", "1 580 000"], "Inuit own this land within the larger Settlement Area.", true],
  ["The Labrador Inuit Land Claims Agreement is protected as a treaty under…", "the Constitution Act, 1982", ["the Dominion Elections Act", "the Terms of Union only", "no law"], "Land claim agreements count as treaty rights.", true],
  ["Which national park reserve was set up within the Labrador Inuit Settlement Area?", "Torngat Mountains National Park Reserve", ["Gros Morne National Park", "Banff National Park", "Terra Nova National Park"], "It is in the north of Labrador.", true],
  ["The Innu Nation represents Innu people in which two Labrador communities?", "Sheshatshiu and Natuashish", ["Nain and Hopedale", "Conne River and Gander", "Rigolet and Postville"], "Each community has its own First Nation council."],
  ["What is the Innu language called?", "Innu-aimun", ["Inuktitut", "Mi’kmaw", "Gaelic"], "It is spoken in Innu communities, including those in Labrador."],
  ["Natuashish is home to which First Nation?", "the Mushuau Innu First Nation", ["the Qalipu First Nation", "the Miawpukek First Nation", "the Sheshatshiu Innu First Nation"], "Another Innu community, Sheshatshiu, has its own First Nation."],
  ["In 2011, the Innu Nation, Canada and Newfoundland and Labrador signed an agreement-in-principle on what?", "land claim and self-government", ["a new national anthem", "a railway", "a national park only"], "An agreement-in-principle is a step before a final agreement.", true],
  ["Where is Miawpukek First Nation?", "Conne River, on the island’s south coast", ["Nain, in northern Labrador", "Happy Valley-Goose Bay", "Cartwright"], "It is a Mi’kmaq community on the island of Newfoundland."],
  ["Qalipu First Nation was formed as a band in…", "2011", ["1855", "1949", "2005"], "It is a Mi’kmaq band with members across the island of Newfoundland."],
  ["Section 35 of the Constitution Act, 1982 recognizes and affirms…", "existing Aboriginal and treaty rights", ["the right to a driver’s licence", "provincial borders", "hockey rules"], "It names First Nations, Inuit and Métis peoples."],
  ["In section 35, which groups are included in the “Aboriginal peoples of Canada”?", "Indian (First Nations), Inuit and Métis peoples", ["only First Nations", "only Inuit", "only Métis"], "Three distinct peoples are named."],
  ["The Truth and Reconciliation Commission’s 2015 report contained how many Calls to Action?", "94", ["10", "50", "200"], "It asks governments and all Canadians to act.", true],
  ["On November 24, 2017, Prime Minister Justin Trudeau apologized to former students of residential schools in…", "Newfoundland and Labrador", ["Nova Scotia", "Saskatchewan", "Yukon"], "The apology was given in Happy Valley-Goose Bay."],
  ["How many Newfoundland and Labrador residential schools were covered by the 2017 apology?", "five", ["one", "twelve", "twenty"], "They included boarding schools and an orphanage."],
  ["Which Labrador community hosted the 2017 apology?", "Happy Valley-Goose Bay", ["Nain", "Churchill Falls", "Cartwright"], "It is a town in central Labrador.", true],
  ["After the 2017 apology, the Innu Nation said it…", "did not accept it, because other harms to Innu were not included", ["accepted all of it", "wrote the apology", "ignored the day"], "Different communities responded in different ways.", true],
  ["What does reconciliation mean?", "building respectful relationships and repairing harm over time", ["forgetting the past", "ending all laws", "moving away"], "It takes action, not just words."],
  ["Why is it important to name each Indigenous nation separately?", "Each has its own history, language, rights and government", ["They are all the same", "It saves time", "Names are not important"], "The Innu, Inuit and Mi’kmaq are distinct peoples."],
  ["Which statement shows a responsibility that comes with citizenship?", "learning the history of agreements and respecting the rights they protect", ["ignoring treaties", "avoiding the news", "refusing to vote forever"], "Rights and responsibilities go together.", true],
];

export const confederation = bankUnit({
  id: "nl-confederation-8",
  title: "Newfoundland Joins Canada",
  emoji: "🗳️",
  blurb: "Responsible government, the Commission of Government and 1949.",
  parentNote:
    "Grade 8 looks at how Newfoundland moved from responsible government to the Commission of Government, then voted in 1948 to join Canada in 1949. Ask your child which sources and points of view helped people choose.",
  standards: [
    "Time, continuity and change (by Grade 9)",
    "how Newfoundland became a province of Canada in 1949, and the choices and perspectives behind it",
  ],
  items: CONFEDERATION,
});

export const agreements = bankUnit({
  id: "nl-agreements-9",
  title: "Land Claims and Self-Government in Labrador",
  emoji: "📜",
  blurb: "Agreements, rights and governments today.",
  parentNote:
    "Grade 9 explores land claim agreements, self-government and reconciliation in Newfoundland and Labrador. Ask your child how rights and responsibilities connect, and why each community’s story is its own.",
  standards: [
    "Citizenship, power and governance (by Grade 9)",
    "land claims and self-government agreements in Labrador and Newfoundland, and what they mean today",
  ],
  items: AGREEMENTS,
});
