import { bankUnit, type Q } from "../own";

// More Grade 5 social studies for New Brunswick: interactions between the first and founding peoples of Atlantic Canada.
// Wabanaki content is light and in the present tense for living communities.

const MEETINGS: Q[] = [
  ["Besides First Nations, which groups are often called the founding peoples of Atlantic Canada?", "French and British settlers", ["Roman and Greek settlers", "Spanish and Portuguese settlers", "Chinese and Japanese settlers"], "The French came first to settle, then the British."],
  ["What does “contact” mean in history?", "the first meetings between peoples who did not know each other", ["a game of tag", "a type of letter", "a kind of map"], "Contact between Europeans and First Nations changed life for both."],
  ["What does “interaction” mean in history?", "the ways groups meet, trade, work together or come into conflict", ["a kind of boat", "a list of dates", "a type of weather"], "Interactions can be friendly or difficult."],
  ["In 1604, Pierre Dugua de Mons and Samuel de Champlain spent the winter on which island?", "Saint Croix Island", ["Grand Manan", "Prince Edward Island", "Partridge Island"], "It is in the St. Croix River, on today’s border with Maine."],
  ["What made many settlers sick on Saint Croix Island in the winter of 1604–05?", "scurvy, from a lack of fresh food", ["too much sunshine", "eating too many vegetables", "a bee sting"], "Nearly half the settlers died that winter."],
  ["Why did the French move from Saint Croix Island to Port-Royal in 1605?", "The island had little fresh water, firewood or shelter from the wind", ["They wanted a bigger beach", "The island sank", "They were told to go home"], "Port-Royal was across the Bay of Fundy.", true],
  ["What was the Order of Good Cheer at Port-Royal?", "a club of feasts to keep spirits up in winter", ["a group of soldiers", "a law about taxes", "a type of ship"], "Champlain started it in 1606, and Mi’kmaw guests sometimes joined the meals."],
  ["Which Mi’kmaw leader was a friend and ally of the French at Port-Royal?", "Membertou", ["Champlain", "Cabot", "Cartier"], "He was a respected chief and healer.", true],
  ["What did many Wabanaki traders offer the French?", "furs and knowledge of the land", ["gold coins", "iron cannons", "wheat from Europe"], "Furs were very valuable in Europe."],
  ["What did the French often offer Wabanaki traders?", "metal pots, knives and cloth", ["snowshoes", "birchbark canoes", "maple sugar"], "Metal tools were new and useful."],
  ["Why did French settlers learn to use birchbark canoes?", "They were light and good for rivers and carrying overland", ["They were made of metal", "They could fly", "They were heavier than ships"], "Wabanaki Peoples have built and used these canoes for a very long time."],
  ["What is an alliance?", "an agreement between groups to support each other", ["a kind of fishing net", "a tall building", "a type of map"], "Allies help each other in trade and in danger."],
  ["Why did the French and many Wabanaki Nations become allies?", "to trade and to help each other against common rivals", ["to stop all trade", "to build a railway", "to leave the region"], "The alliance lasted many years.", true],
  ["Which is an example of cooperation between peoples?", "sharing food and knowledge to get through the winter", ["fighting over a harbour", "burning a village", "refusing to trade"], "Cooperation helped newcomers survive."],
  ["Which is an example of conflict between peoples?", "fighting over control of land", ["sharing a meal", "trading furs for kettles", "teaching each other words"], "Conflicts often came from competition for land and resources."],
  ["Why did the British and French fight over Acadia?", "Both empires wanted control of the land, fish and trade", ["They both wanted to leave it", "They disagreed about hockey", "Neither wanted the land"], "Acadia changed hands several times."],
  ["Which treaty in 1713 gave mainland Acadia to Britain?", "the Treaty of Utrecht", ["the Treaty of Paris of 1763", "the Peace and Friendship Treaty of 1760", "the Treaty of Versailles"], "France kept Île Royale (Cape Breton Island) and built a fortress there.", true],
  ["Who built the Fortress of Louisbourg on Cape Breton Island?", "the French", ["the Vikings", "the Spanish", "the Dutch"], "It was one of the largest forts in North America.", true],
  ["Why were interpreters important when peoples first met?", "They helped people who spoke different languages understand each other", ["They cooked all the food", "They built the ships", "They drew the flags"], "Some young French settlers lived with Mi’kmaw families to learn the language."],
  ["How did Acadian farmers turn salt marshes into farmland?", "They built dykes to keep out the sea", ["They dug giant wells", "They covered the marsh with sand", "They used pumps powered by electricity"], "The rich marsh soil grew good crops."],
  ["What is an aboiteau?", "a gate in a dyke that lets fresh water out but keeps sea water out", ["a type of canoe", "a winter coat", "a French song"], "It closes when the tide comes in.", true],
  ["When Loyalists arrived on the Saint John River in 1783, who already lived there?", "Wolastoqiyik families", ["no one", "Roman soldiers", "Viking settlers"], "The Wolastoq is the river’s name in the Wolastoqey language.", true],
  ["Why do many places in Atlantic Canada have French, English and Indigenous names?", "Many peoples have lived, met and settled there", ["Names were picked at random", "Only one group ever lived there", "A computer chose them"], "Place names are clues about the past."],
  ["What did contact bring that harmed many First Nations?", "new diseases they had no defence against", ["new snowshoes", "more fish", "warmer winters"], "Many people became very sick."],
  ["How did trade change some daily tools for many Wabanaki families?", "Metal kettles and knives replaced some tools made of bark, stone or clay", ["Everyone stopped cooking", "Canoes were no longer used at all", "Nothing changed"], "Trade goods were useful, but they also created new needs."],
  ["Why is it important to look at contact from more than one point of view?", "Each group experienced it differently", ["Only one view is ever true", "It makes the story shorter", "Points of view never matter"], "Listening to Wabanaki voices gives a fuller story."],
  ["French and British ships sailed into which bay, known for the highest tides in the world?", "the Bay of Fundy", ["Hudson Bay", "James Bay", "Baffin Bay"], "The tides can rise more than 15 metres."],
  ["A settler’s letter from 1610 describes sharing a meal with Mi’kmaw neighbours. What kind of source is it?", "a primary source", ["a secondary source", "a textbook", "a website"], "It was written at the time by someone who was there."],
  ["Why did France and Britain both want Wabanaki Nations as allies?", "Wabanaki Nations knew the land and were strong partners in trade and war", ["Wabanaki Nations had the biggest ships", "They wanted to learn English only", "They had no other neighbours"], "Each empire depended on its Indigenous allies.", true],
  ["In 1755, which colonial government began the deportation of the Acadians?", "the British", ["the French", "the Spanish", "the Dutch"], "Many families were separated.", true],
  ["How did Samuel de Champlain help later travellers?", "He drew detailed maps of the coast and rivers", ["He built the first railway", "He invented the compass", "He founded Fredericton"], "His maps were used for many years."],
  ["Why did European fishers dry and salt cod on shore?", "so the fish would keep on the long trip home", ["to make it taste sweeter", "to feed it to horses", "to use it as money"], "Fishers set up summer camps along the coast.", true],
  ["What is one way newcomers and Wabanaki Peoples learned from each other?", "by trading and teaching each other words and skills", ["by never speaking", "by staying far apart", "by sending emails"], "Some Mi’kmaw and Wolastoqey words appear in place names today."],
  ["Which question would help you understand an interaction in the past?", "How did each group benefit or lose?", ["What is my favourite colour?", "What time is lunch?", "How tall is the moon?"], "Historians ask who gained, who lost and why."],
  ["Which of these is a good summary of contact in Atlantic Canada?", "It brought trade and friendship, but also disease, conflict and loss of land", ["It only brought good things", "It only brought bad things", "Nothing changed after contact"], "Contact had many results, both helpful and harmful."],
  ["Who were the Acadians’ closest Indigenous neighbours and trading partners in early Acadia?", "the Mi’kmaq", ["the Haida", "the Cree", "the Inuit"], "Many Acadian and Mi’kmaw families knew each other well."],
];

export const atlanticMeetings = bankUnit({
  id: "nb-atlantic-meetings-5",
  title: "First Meetings in Atlantic Canada",
  emoji: "🛶",
  blurb: "Trade, friendship and conflict when peoples met.",
  parentNote:
    "Practises the interactions between the first and founding peoples of Atlantic Canada: early French settlements, trade and alliances, Acadian dykes, conflict between empires, and how contact affected Wabanaki Peoples. The content is light and in the present tense for living communities. It follows the Grade 5 social studies skill descriptor on events and peoples in the New Brunswick curriculum.",
  standards: ["History: Events and Peoples", "interactions between the first and founding peoples of Atlantic Canada"],
  items: MEETINGS,
});
