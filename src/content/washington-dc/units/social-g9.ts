import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Washington, DC Grade 9 social studies, World History and Geography I (WH1, the DC Social Studies Standards, 2023):
// early humans, the evidence for human evolution and migration, and Paleolithic tools and art (WH1.1; WH1.2; WH1.4;
// WH1.6; WH1.7), and the UNESCO World Heritage List and who should own artifacts from antiquity (WH1.50 to WH1.53).
// Early civilizations, ancient and classical empires, belief systems, trade networks and early modern empires are
// practised with adopted units (see ../plan/social.ts).

const HUMANS: Q[] = [
  ["Most scientists agree that Homo sapiens first appeared in…", "Africa", ["Europe", "North America", "Australia"], "The oldest fossils are about 300,000 years old."],
  ["The oldest known Homo sapiens fossils, about 300,000 years old, were found at Jebel Irhoud in…", "Morocco", ["France", "China", "Peru"], "It is in North Africa."],
  ["\"Lucy\", a famous early hominin skeleton about 3.2 million years old, was found in…", "Ethiopia", ["Spain", "India", "Mexico"], "She was an Australopithecus."],
  ["Australopithecines were important because they…", "walked upright on two legs", ["used smartphones", "built cities", "wrote books"], "Walking upright came before big brains."],
  ["The early human species named \"handy man\" for its stone tools is…", "Homo habilis", ["Homo sapiens", "Homo erectus", "Neanderthal"], "Habilis means handy."],
  ["The first hominins known to leave Africa and spread across Asia were…", "Homo erectus", ["Australopithecus", "Homo habilis", "Lucy's family"], "They also used fire."],
  ["Neanderthals lived in Europe and western Asia and…", "had children with Homo sapiens", ["never met Homo sapiens", "lived on the Moon", "built pyramids"], "Many people today carry some Neanderthal DNA."],
  ["The Paleolithic era is also called the…", "Old Stone Age", ["Iron Age", "Bronze Age", "Space Age"], "Paleo means old; lithic means stone."],
  ["Paleolithic people got food mostly by…", "hunting and gathering", ["farming wheat", "buying groceries", "raising cattle in barns"], "They moved with the seasons."],
  ["Controlling fire helped early humans to…", "cook food and stay warm", ["fly", "send messages by radio", "plant rice"], "Cooked food is easier to digest."],
  ["Famous cave paintings of animals, about 17,000 years old, are at Lascaux in…", "France", ["Brazil", "Japan", "Egypt"], "They show horses, deer and bulls."],
  ["Some of the oldest known cave art, more than 40,000 years old, is on the island of…", "Sulawesi in Indonesia", ["Iceland", "Greenland", "Hawaii"], "It shows animals and hand stencils."],
  ["Scientists who study human remains and artifacts to learn about the past are…", "archaeologists and anthropologists", ["astronomers", "meteorologists", "geologists only"], "They dig carefully and record everything."],
  ["Comparing DNA from people around the world shows that all humans today…", "share recent African ancestors", ["came from Europe", "have no shared ancestors", "are separate species"], "Genetics backs the fossil evidence."],
  ["Early humans first reached Australia about…", "50,000 or more years ago", ["500 years ago", "5,000 years ago", "5 million years ago"], "They crossed water by boat.", true],
  ["Radiocarbon dating measures the age of…", "things that were once alive", ["rocks billions of years old", "metal coins", "plastic"], "It works up to about 50,000 years.", true],
  ["Small, sharp stone blades glued to handles, made late in the Stone Age, are called…", "microliths", ["megaliths", "pyramids", "ziggurats"], "Micro means small.", true],
  ["The Mesolithic, or Middle Stone Age, came between the Paleolithic and the…", "Neolithic", ["Iron Age", "Bronze Age", "Industrial Age"], "Neo means new.", true],
  ["The Smithsonian's Hall of Human Origins is in the National Museum of…", "Natural History", ["American History", "the American Indian", "Air and Space"], "It is on the National Mall.", true],
  ["Why do scientists say \"hominin\" instead of \"caveman\"?", "it is a precise scientific term for human relatives", ["cavemen were real people named Hominin", "it is shorter", "hominins lived only in caves"], "Few early humans lived in caves.", true],
  ["Denisovans are known mostly from…", "DNA in a few bones and teeth", ["written diaries", "paintings of themselves", "coins"], "They were first found in a Siberian cave.", true],
  ["Which tells historians the most about how people moved out of Africa?", "fossils, tools and DNA together", ["a single legend", "a modern map", "a movie"], "Combining evidence makes stronger claims.", true],
  ["Bone needles let late Stone Age people…", "sew warm clothes", ["write letters", "plant crops", "make glass"], "This helped them live in cold places.", true],
  ["Early humans changed their environments by…", "using fire to clear land and hunting large animals", ["building highways", "making plastic", "drilling for oil"], "Some large animals died out.", true],
  ["Dividing the past into eras like the Paleolithic is called…", "periodization", ["globalization", "urbanization", "projection"], "Historians choose the dividing lines.", true],
];

const HERITAGE: Q[] = [
  ["UNESCO keeps a list of places of outstanding value to all humanity called the…", "World Heritage List", ["Guinness Book", "Hall of Fame", "Fortune 500"], "There are more than 1,000 sites."],
  ["UNESCO is part of the…", "United Nations", ["European Union", "NATO", "Smithsonian"], "It stands for the UN Educational, Scientific and Cultural Organization."],
  ["Which of these is a World Heritage Site?", "the pyramids of Giza", ["Union Station", "a shopping mall", "a parking garage"], "They are in Egypt."],
  ["World Heritage Sites can be cultural or…", "natural", ["imaginary", "fictional", "temporary"], "The Galápagos Islands are a natural site."],
  ["Machu Picchu, an Inca site in the Andes, is in…", "Peru", ["Mexico", "Chile", "Brazil"], "It became a World Heritage Site in 1983."],
  ["Great Zimbabwe, a World Heritage Site of stone walls, gave its name to…", "the country of Zimbabwe", ["a river in Egypt", "a city in China", "a mountain in Europe"], "Its builders were ancestors of the Shona people."],
  ["The Parthenon marbles, carved for a temple in Athens, are mostly in a museum in…", "London", ["Athens", "Rome", "Cairo"], "Greece has asked for them back."],
  ["Returning artifacts to the country or people they were taken from is called…", "repatriation", ["globalization", "migration", "irrigation"], "Many museums are reviewing their collections."],
  ["The Benin Bronzes were taken from the Kingdom of Benin, in today's Nigeria, by…", "British soldiers in 1897", ["Roman legions", "Viking raiders", "Spanish sailors"], "Some museums have now returned them."],
  ["In 2022, the Smithsonian's National Museum of African Art returned Benin Bronzes to…", "Nigeria", ["Egypt", "Kenya", "South Africa"], "The museum is in Washington, DC."],
  ["A US law that requires museums to return certain Native American remains and objects is…", "NAGPRA", ["NATO", "NAFTA", "NASA"], "It passed in 1990."],
  ["One argument for keeping artifacts in big world museums is that…", "many visitors from everywhere can see them", ["they are safer if hidden", "nobody wants them", "they have no history"], "Others say they belong at home."],
  ["One argument for returning artifacts is that…", "they were taken without consent", ["museums are too small", "the artifacts are fake", "no one visits museums"], "Ownership is a question of justice."],
  ["To judge a website about a World Heritage Site, you should first check…", "who made it and why", ["how colorful it is", "how many ads it has", "whether it has music"], "Authorship and purpose matter."],
  ["Which is a natural World Heritage Site?", "the Great Barrier Reef", ["the Colosseum", "the Taj Mahal", "Angkor Wat"], "It is in Australia.", true],
  ["Angkor Wat, a giant temple complex and World Heritage Site, is in…", "Cambodia", ["Thailand", "Japan", "Mongolia"], "It appears on Cambodia's flag.", true],
  ["Timbuktu's mosques and manuscripts are on the World Heritage List in…", "Mali", ["Morocco", "Egypt", "Ghana"], "Some were damaged in a war in 2012.", true],
  ["Lalibela, with churches carved from solid rock, is a World Heritage Site in…", "Ethiopia", ["Peru", "India", "Italy"], "The churches date to about the 1200s.", true],
  ["A site on the World Heritage List \"in danger\" is one threatened by…", "war, development or climate change", ["too many tourists' smiles", "good weather", "new paint only"], "UNESCO helps protect them.", true],
  ["The 1970 UNESCO convention aims to stop the…", "illegal trade in cultural property", ["building of museums", "teaching of history", "use of maps"], "Looted objects are often sold.", true],
  ["When judging a museum's claim about an artifact, a historian asks about its…", "provenance, or history of ownership", ["color", "weight only", "price tag"], "Where has it been, and how did it get there?", true],
  ["A primary source about the taking of the Benin Bronzes would be…", "a soldier's letter from 1897", ["a 2023 news summary", "a textbook", "a museum gift shop label"], "It was written at the time.", true],
  ["Which World Heritage Site was built by the ancient Maya?", "Tikal", ["Stonehenge", "the Acropolis", "Petra"], "It is in Guatemala.", true],
  ["Petra, a city carved into rose-colored cliffs, is in…", "Jordan", ["Greece", "Peru", "China"], "It was built by the Nabataeans.", true],
];

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "dc-g9-early-humans",
    title: "Early Humans",
    emoji: "🦴",
    blurb: "Human origins in Africa, migration and the Old Stone Age",
    parentNote: "What the evidence of fossils, tools and DNA says about human origins: Australopithecines such as Lucy, Homo habilis and Homo erectus, the first Homo sapiens in Africa, Neanderthals and Denisovans, how people spread around the world, and the fire, tools and art of the Paleolithic era, from Lascaux to Sulawesi.",
    standards: ["WH1.1; WH1.2; WH1.4; WH1.6; WH1.7", "the evidence for human evolution, how scholars investigate it, early human migration, and Paleolithic technology, art and artifacts"],
    items: HUMANS,
  }),
  bankUnit({
    id: "dc-g9-world-heritage",
    title: "World Heritage & Who Owns the Past",
    emoji: "🏺",
    blurb: "UNESCO World Heritage Sites and the debate over returning artifacts",
    parentNote: "The UNESCO World Heritage List and some of its sites around the world, why sites are put in danger, and the debate over who should own artifacts from antiquity, from the Parthenon marbles to the Benin Bronzes the Smithsonian returned to Nigeria in 2022, with practice judging sources by their authorship, purpose and provenance.",
    standards: ["WH1.50; WH1.51; WH1.52; WH1.53", "compelling questions about the UNESCO World Heritage List and the ownership of artifacts from antiquity, and judging the credibility of sources"],
    items: HERITAGE,
  }),
];
