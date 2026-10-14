import type { Entry } from "../kit";

// Alabama social: the units Alabama uses from other frameworks, per grade ("<grade>/social"), cited by the content
// standards of the 2024 Alabama Course of Study: Social Studies ("6.7"). Kindergarten to Grade 2 are Living and
// Working Together in Family and Community, Community and State, and State and Nation; Grade 6 is Making a New Nation
// (United States beginnings and civic foundations); Grades 7, 8 and 9 are World History and Geography (ancient
// civilizations, the Middle Ages to the Enlightenment, and the Age of Revolution to the present). Grades 3 to 5 are in
// ./social-alabama.ts. Only general units are adopted: none that names another state as a place, and never another
// state's Tribal units. Alabama's own units (`al-` ids, in ../units/social-<grade>.ts) cover the Alabama-connection
// standards, the copies of other states' units with their state questions left out, and Grade 9's twentieth century.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["mb-k-jobs-and-rules", "adopt", "K.1; K.2", "rules and responsibilities at home and school, and the helpers and leaders in a community"],
    ["ca-k-good-citizens", "adopt", "K.1", "rights and responsibilities, and being a good citizen at school and at home"],
    ["families", "share", "K.3", "family customs and celebrations"],
    ["ny-k-symbols-holidays", "adopt", "K.3", "the flag, the Pledge of Allegiance, the national anthem and national holidays"],
    ["or-k-money-and-work", "adopt", "K.4; K.5", "earning, saving and spending money, and using money to buy goods and services"],
    ["needs-and-wants", "share", "K.6", "telling needs from wants"],
    ["pe-first-maps-k", "adopt", "K.7", "what maps are for and how to read simple maps"],
    ["places-near-me", "adopt", "K.8", "land and water features in the places around us"],
    ["ca-k-calendar", "adopt", "K.10", "days, weeks and months on a calendar"],
    ["mb-k-yesterday-today-tomorrow", "adopt", "K.10", "long ago, yesterday, today and tomorrow, and putting events in order"],
  ],
  "1/social": [
    ["my-community", "share", "1.1; 1.2", "how people take part in community life, and the people who lead and serve a community"],
    ["respect-and-inclusion", "adopt", "1.1", "rights and responsibilities, and caring for the common good"],
    ["community-services", "adopt", "1.3", "businesses and services in the community, such as stores and banks"],
    ["wa-g1-earn-save-share", "adopt", "1.3", "earning, saving and spending money to meet needs and wants"],
    ["pe-goods-and-services-1", "adopt", "1.3; 1.6", "goods and services, and how products get from producers to buyers"],
    ["maps", "share", "1.8", "map features such as a title, a key and directions, and making maps of familiar places"],
    ["our-land", "share", "1.9; 1.4", "landforms and bodies of water, and how the land shapes work and play"],
    ["changes-in-my-life", "adopt", "1.10", "timelines and schedules of a child's life"],
    ["social-studies-detectives", "adopt", "1.11", "finding facts in sources, and telling primary sources from secondary sources"],
    ["ca-g1-long-ago", "adopt", "1.13", "comparing school, travel and technology long ago and today"],
  ],
  "2/social": [
    ["ca-g2-citizens-and-leaders", "adopt", "2.1; 2.3", "citizens' rights and responsibilities, leaders, and how voting works"],
    ["ca-g2-work-and-money", "adopt", "2.4", "work, producers and consumers, and goods and services"],
    ["pe-work-and-prices-2", "adopt", "2.5", "scarcity, choices and prices"],
    ["or-g2-world-maps", "adopt", "2.7", "the continents, the oceans and the Equator on maps and globes"],
    ["then-and-now", "adopt", "2.12", "comparing life in the past and today with photographs and other sources"],
  ],
  "6/social": [
    ["ny-g5-columbian-exchange", "adopt", "6.3; 6.6", "the Columbian Exchange and the triangular trade, and their effects on peoples of the Americas and Africa"],
    ["ca-g5-thirteen-colonies", "adopt", "6.4; 6.5", "the New England, Middle and Southern colonies, and colonies founded for religious freedom"],
    ["ca-g5-colonial-economy", "adopt", "6.4; 6.6", "work and trade in the colonies, and the triangular trade"],
    ["ca-g5-road-to-revolution", "adopt", "6.7", "the Stamp Act, the Boston Massacre, the Boston Tea Party and the Intolerable Acts"],
    ["ca-g5-revolution", "adopt", "6.7; 6.8; 6.9", "the Declaration of Independence, the battles of the war and why the colonies won"],
    ["ca-g5-constitution", "adopt", "6.10; 6.11", "the Articles of Confederation and the compromises of the Constitutional Convention"],
    ["ca-g8-founding-ideals", "adopt", "6.12; 6.13", "the ideas and earlier governments behind the Constitution, and its main principles"],
    ["wa-g8-bill-of-rights", "adopt", "6.17", "the rights in the Bill of Rights and later amendments, and how citizens use them"],
    ["ca-g9-civic-action", "adopt", "6.18", "ways citizens take part and influence government"],
  ],
  "7/social": [
    ["maps-graphs-8", "adopt", "7.1", "using maps, graphs and data to answer geographic questions"],
    ["wa-g6-time-sources", "adopt", "7.3; 7.4", "counting years in BCE and CE, and how artifacts give evidence about the past"],
    ["first-farmers", "share", "7.4; 7.5", "early humans, and the shift from hunting and gathering to farming villages"],
    ["where-civilizations-grew", "share", "7.5; 7.6", "how river valleys and new technology led to the first cities"],
    ["mb-mesopotamia", "adopt", "7.6", "Mesopotamia between the Tigris and Euphrates: irrigation, cuneiform and city-states"],
    ["wa-g6-mesopotamia-egypt", "adopt", "7.6; 7.7", "Mesopotamia, and ancient Egypt's economy, government and society"],
    ["mb-egypt-8", "adopt", "7.7", "ancient Egypt: the Nile, the pharaohs, social classes and trade"],
    ["ca-g6-hebrews-kush", "adopt", "7.8; 7.9", "ancient Israel, and the African kingdom of Kush"],
    ["wa-g6-americas-africa", "adopt", "7.9; 7.10", "early African societies, and early civilizations of the Americas"],
    ["wa-g6-india-china", "adopt", "7.12; 7.13", "the Indus Valley and early India, and the dynasties of ancient China"],
    ["ca-g6-greece-rome", "adopt", "7.14; 7.15; 7.16", "Classical Greece's legacy, the Roman Republic, and the Roman Empire"],
  ],
  "8/social": [
    ["ca-g7-rome-byzantium", "adopt", "8.1; 8.2", "the fall of the Western Roman Empire, and the Byzantine Empire and its legacy"],
    ["islamic-world", "share", "8.3", "the rise and spread of Islam and the achievements of the caliphates"],
    ["or-g7-asian-empires", "adopt", "8.4", "medieval China, India, Japan and Korea"],
    ["or-g7-african-kingdoms", "adopt", "8.5", "the West African kingdoms of Ghana, Mali and Songhai"],
    ["ca-g7-aztec-inca", "adopt", "8.6", "the Maya, Aztec and Inca civilizations"],
    ["medieval-europe", "share", "8.7", "feudalism, manors, the Church and daily life in medieval Europe"],
    ["ny-g9-crusades-plague", "adopt", "8.8", "the Crusades and the Black Death, and how they changed later medieval Europe"],
    ["renaissance-and-reformation", "share", "8.9; 8.10", "the Renaissance in Italy and northern Europe, and the Reformation"],
    ["ca-g7-exploration-and-empire", "adopt", "8.11; 8.12", "why Europeans explored, and the effects of colonization on Africa, the Americas and Europe"],
    ["ny-g9-atlantic-world", "adopt", "8.12; 8.13", "the Columbian Exchange, Spanish colonies and the transatlantic slave trade"],
    ["ny-g9-absolutism-enlightenment", "adopt", "8.14; 8.15; 8.18", "absolute monarchs, England's Parliament and Bill of Rights, and Enlightenment ideas"],
    ["ny-g9-ottoman-ming", "adopt", "8.16", "the Ming dynasty and other great empires of the early modern world"],
    ["ca-g7-science-enlightenment", "adopt", "8.17; 8.18", "the Scientific Revolution, Copernicus and Galileo, and the ideas of the Enlightenment"],
  ],
  "9/social": [
    ["or-g7-age-of-revolutions", "adopt", "9.1; 9.2; 9.3", "the Enlightenment, and the American, French, Haitian and Latin American revolutions"],
  ],
};
