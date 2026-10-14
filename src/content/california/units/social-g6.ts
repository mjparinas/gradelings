import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";
import { G6 as WASHINGTON } from "../../washington/units/social-59-g6";

// California social studies, Grade 6: ancient civilizations. Washington's and Oregon's units are copied without their
// state's places or their Tribal items, with California items added; California's own units fill the rest. Content
// about American Indian nations is light and in the present tense, and religions are described factually and neutrally.

// ---------------------------------------------------------------------------------------------------------------
// Grade 6

const HEBREWS_KUSH: Q[] = [
  [
    "Judaism was one of the first religions to teach belief in…",
    "one God",
    ["many gods", "no gods", "the Sun as a god"],
    "Belief in one God is monotheism.",
  ],
  [
    "The Hebrew Bible's first five books are called the…",
    "Torah",
    ["Qur'an", "Vedas", "Analects"],
    "They are central to Judaism.",
  ],
  [
    "According to the Hebrew Bible, Moses led the Israelites out of…",
    "Egypt",
    ["Rome", "China", "Greece"],
    "This is called the Exodus.",
  ],
  [
    "The Ten Commandments are rules about…",
    "how to worship God and treat other people",
    ["farming only", "building pyramids", "sailing ships"],
    "They are part of the Torah.",
  ],
  [
    "Abraham is important in Judaism, Christianity and Islam because he is seen as…",
    "the father of the Hebrew people and a founder of monotheism",
    ["a Roman emperor", "a Greek philosopher", "an Egyptian pharaoh"],
    "All three faiths honor him.",
  ],
  [
    "King David made which city the capital of the Israelite kingdom?",
    "Jerusalem",
    ["Athens", "Babylon", "Memphis"],
    "His son Solomon built the First Temple there.",
  ],
  [
    "The Babylonians destroyed the First Temple and sent many Jews into exile in…",
    "587 BCE",
    ["70 CE", "1492 CE", "1000 BCE"],
    "This is the Babylonian Exile.",
  ],
  [
    "The Romans destroyed the Second Temple in Jerusalem in…",
    "70 CE",
    ["587 BCE", "1776 CE", "300 BCE"],
    "Many Jews scattered across the Mediterranean.",
  ],
  [
    "The spreading of Jewish communities far from their homeland is called the…",
    "Diaspora",
    ["Exodus", "Renaissance", "Crusade"],
    "Diaspora means scattering.",
  ],
  [
    "Yohanan ben Zaccai is remembered for…",
    "founding a center of learning at Yavneh after 70 CE",
    ["building the pyramids", "leading Rome", "sailing to India"],
    "Study helped Judaism survive.",
  ],
  [
    "A synagogue is a place where Jewish people…",
    "pray and study",
    ["sell grain", "train soldiers", "bury pharaohs"],
    "Synagogues helped communities everywhere.",
  ],
  [
    "The Talmud is…",
    "a collection of Jewish law and teachings",
    ["a Roman road", "an Egyptian tomb", "a Greek play"],
    "Rabbis wrote it over centuries.",
  ],
  [
    "The story of Ruth and Naomi teaches about…",
    "loyalty and kindness",
    ["war", "trade", "farming tools"],
    "Ruth stays with Naomi.",
  ],
  [
    "Judaism's ideas of justice and the worth of each person influenced…",
    "later Western ideas of law and ethics",
    ["the Great Wall", "the Maya calendar", "Egyptian mummies"],
    "Many laws reflect these ideas.",
  ],
  [
    "The kingdom of Kush was located along the Nile River, south of…",
    "Egypt",
    ["Greece", "Rome", "Mesopotamia"],
    "Today it is part of Sudan.",
  ],
  [
    "Kush was famous for its…",
    "iron working and gold",
    ["silk", "olive oil", "potatoes"],
    "Meroë was an iron-making center.",
  ],
  [
    "In the 700s BCE, Kushite kings conquered and ruled…",
    "Egypt",
    ["Rome", "China", "Persia"],
    "They were Egypt's 25th dynasty.",
  ],
  [
    "The Kushite king Piye is known for…",
    "conquering Egypt",
    ["founding Rome", "building the Great Wall", "writing the Torah"],
    "He united Egypt and Kush.",
  ],
  [
    "Kush built more pyramids than Egypt at…",
    "Meroë and Napata",
    ["Giza only", "Athens", "Jerusalem"],
    "Kushite pyramids are small and steep.",
  ],
  [
    "Kush traded gold, ivory and ebony with…",
    "Egypt and the Mediterranean world",
    ["the Inca", "Australia", "the Maya"],
    "The Nile connected them.",
  ],
  [
    "Kush developed its own writing system called…",
    "Meroitic",
    ["cuneiform", "Latin", "Sanskrit"],
    "It is not yet fully understood.",
    true,
  ],
  [
    "Kush was ruled at times by powerful queens called…",
    "kandakes",
    ["pharaohs of Rome", "emperors of China", "consuls"],
    "Amanirenas fought Rome.",
    true,
  ],
  [
    "Why did Kush and Egypt influence each other?",
    "the Nile linked them through trade and conflict",
    [
      "they were on different continents",
      "they never met",
      "they spoke the same language",
    ],
    "Rivers carry goods and ideas.",
    true,
  ],
  [
    "Rabbinic Judaism grew after 70 CE by focusing on…",
    "study, prayer and community instead of temple sacrifice",
    ["building a new empire", "worshipping many gods", "moving to China only"],
    "Learning kept the faith alive.",
    true,
  ],
  [
    "The Hebrew prophets taught that people should…",
    "act with justice and care for the poor",
    ["build bigger pyramids", "obey only kings", "avoid all rules"],
    "Prophets called for fairness.",
    true,
  ],
  [
    "Where did the early Israelites settle?",
    "Canaan, along the eastern Mediterranean",
    ["the Indus Valley", "the Huang He Valley", "Gaul"],
    "Canaan is today's Israel and nearby lands.",
    true,
  ],
];

// Grade 6, California's own units: pharaohs and empires (6.2.7; 6.4.5; 6.4.7), the Greek world (6.4.1; 6.4.4; 6.4.8),
// ancient India (6.5.2; 6.5.4; 6.5.6; 6.5.7), ancient China (6.6.2; 6.6.4; 6.6.5; 6.6.6; 6.6.8) and the Roman Empire
// (6.7.3; 6.7.4; 6.7.5; 6.7.7; 6.7.8). Religions are described by what their followers believe and do, never as true
// or false.

const EMPIRES_6: Q[] = [
  ["Hatshepsut was unusual because she was a woman who…", "ruled Egypt as pharaoh", ["led the Persian army", "founded Athens", "wrote the Torah"], "She ruled for about 20 years."],
  ["Hatshepsut is known for sending a trading expedition to…", "the land of Punt", ["Rome", "China", "Britain"], "Ships brought back incense and ebony."],
  ["Hatshepsut built a great temple at…", "Deir el-Bahari, near Thebes", ["Athens", "Babylon", "Persepolis"], "Its terraces rise against the cliffs."],
  ["Ramses II, also called Ramses the Great, ruled Egypt for about…", "66 years", ["6 years", "6 months", "600 years"], "He was one of Egypt's longest-reigning pharaohs."],
  ["Ramses the Great is known for huge building projects such as…", "the temples at Abu Simbel", ["the Great Wall", "the Parthenon", "the Colosseum"], "Giant statues of him guard the entrance."],
  ["Ramses II fought the Hittites at the Battle of…", "Kadesh", ["Marathon", "Salamis", "Hastings"], "It led to one of the first known peace treaties."],
  ["Hatshepsut and Ramses II both ruled during Egypt's…", "New Kingdom", ["Stone Age", "Roman period", "Islamic era"], "It was a time of great power and building."],
  ["The Persian Empire was founded by…", "Cyrus the Great", ["Alexander the Great", "Julius Caesar", "Ramses II"], "He conquered Babylon in 539 BCE."],
  ["Cyrus the Great is remembered for allowing conquered peoples to…", "keep their own customs and religions", ["speak only Persian", "leave their homes", "stop trading"], "He let exiled Jews return to Jerusalem."],
  ["Darius I divided the Persian Empire into provinces called…", "satrapies", ["city-states", "dynasties", "colonies"], "Each was run by a governor called a satrap."],
  ["The Royal Road of Persia helped the king…", "send messages and troops across the empire quickly", ["sail to India", "build pyramids", "grow rice"], "Riders changed horses at stations."],
  ["Persia's capital, built by Darius, was…", "Persepolis", ["Athens", "Thebes", "Rome"], "Its ruins are in today's Iran."],
  ["The Persian Wars were fought between Persia and…", "the Greek city-states", ["Egypt and Kush", "China", "Rome"], "Greeks won at Marathon and Salamis."],
  ["At Marathon in 490 BCE, the Athenians…", "defeated a Persian army", ["lost their city", "crowned a Persian king", "made peace with Sparta"], "A runner carried the news."],
  ["At Thermopylae in 480 BCE, a small force led by…", "Spartans held off a huge Persian army", ["Romans defeated Carthage", "Egyptians fought the Hittites", "Alexander invaded India"], "They held a narrow pass."],
  ["Alexander the Great came from…", "Macedonia, north of Greece", ["Persia", "Egypt", "Rome"], "His father was King Philip II."],
  ["As a young man, Alexander was taught by the philosopher…", "Aristotle", ["Confucius", "Socrates", "Homer"], "Aristotle taught him science and literature."],
  ["Alexander conquered the empire of…", "Persia", ["China", "Rome", "Kush"], "He defeated King Darius III."],
  ["Alexander founded a famous city in Egypt named…", "Alexandria", ["Athens", "Memphis", "Persepolis"], "It became a great center of learning."],
  ["Alexander's conquests spread Greek language and culture as far as…", "Egypt and India", ["China and Japan", "Britain", "the Americas"], "This blending is called Hellenistic culture."],
  ["Hellenistic culture was a blend of…", "Greek, Egyptian, Persian and Indian ways", ["Roman and Chinese ways only", "Aztec and Inca ways", "no cultures at all"], "Ideas mixed across the empire."],
  ["When Alexander died young in 323 BCE, his empire…", "was split among his generals", ["passed to his son peacefully", "became part of China", "grew larger at once"], "The Ptolemies ruled Egypt afterward."],
  ["The Library of Alexandria was famous for…", "collecting scrolls from across the known world", ["holding chariot races", "storing gold", "training soldiers"], "Scholars came from many lands."],
  ["Why might Ramses II have built so many giant statues of himself?", "to show his power and be remembered", ["to hide his tomb", "to scare away rain", "to trade with China"], "Monuments sent a message.", true],
  ["How did the Persian kings hold such a huge empire together?", "governors, roads, a common currency and respect for local customs", ["one city that did everything", "no rules at all", "only by force of water"], "Think about Darius's reforms.", true],
  ["Why did Alexander's empire break apart after his death?", "there was no agreed heir, and his generals fought for power", ["Rome conquered it the next day", "everyone moved to China", "Persia was never conquered"], "He died at only 32.", true],
  ["Cleopatra VII, the last ruler of Ptolemaic Egypt, came from a family descended from…", "one of Alexander's generals", ["Ramses II", "Cyrus the Great", "Julius Caesar"], "The Ptolemies were Macedonian Greeks.", true],
];

const GREEK_WORLD_6: Q[] = [
  ["The Aegean Sea lies between Greece and…", "Asia Minor (today's Turkey)", ["Egypt", "Italy", "Spain"], "It is dotted with islands."],
  ["Greece's mountains and many islands led to…", "many separate city-states", ["one huge kingdom", "no cities at all", "a single river valley"], "Mountains kept communities apart."],
  ["Because good farmland was scarce, many Greeks turned to…", "the sea for fishing and trade", ["the desert for farming", "rice growing", "camel caravans"], "No place in Greece is far from the sea."],
  ["Greek city-states traded olive oil and wine for…", "grain, timber and metals", ["silk only", "potatoes", "chocolate"], "They needed food they couldn't grow."],
  ["Greeks founded colonies around the Mediterranean and the Black Sea to…", "find farmland and trade partners", ["escape snow", "hunt mammoths", "build pyramids"], "Marseille and Naples began as Greek colonies."],
  ["The Greeks adapted their alphabet from the…", "Phoenicians", ["Egyptians", "Chinese", "Persians"], "Phoenician traders sailed the Mediterranean."],
  ["Ancient Greeks believed Zeus was the king of the gods who ruled from…", "Mount Olympus", ["the Nile", "Rome", "the Aegean floor"], "It is the highest mountain in Greece."],
  ["Athens was named for Athena, whom ancient Greeks honored as goddess of…", "wisdom", ["the sea", "the underworld", "the harvest"], "The Parthenon was built for her."],
  ["Ancient Greeks believed Poseidon ruled the…", "sea", ["sky", "underworld", "harvest"], "Sailors prayed to him for safe trips."],
  ["Myths were part of everyday Greek life because people used them to…", "explain nature and teach values", ["record taxes", "measure land", "send letters"], "Festivals, plays and art told the myths."],
  ["A weak spot is called an Achilles' heel after a…", "hero of Greek myth", ["Roman emperor", "Persian king", "Chinese poet"], "Only his heel could be harmed."],
  ["The word odyssey, meaning a long journey, comes from…", "Homer's poem about Odysseus", ["a Roman law", "a Persian road", "an Egyptian tomb"], "He took ten years to get home."],
  ['"Opening Pandora\'s box" means…', "causing many unexpected troubles", ["finding treasure", "solving a riddle", "winning a race"], "In the myth, troubles escaped from a jar."],
  ["The Olympic Games began in ancient Greece in honor of…", "Zeus", ["Athena", "Julius Caesar", "Cyrus"], "They started in 776 BCE at Olympia."],
  ["Socrates taught by…", "asking questions to test ideas", ["writing laws", "leading armies", "building temples"], "This is called the Socratic method."],
  ["Plato, a student of Socrates, founded a school in Athens called the…", "Academy", ["Senate", "Forum", "Colosseum"], "He wrote The Republic."],
  ["Aristotle wrote about many subjects, including…", "logic, science and government", ["only sports", "only cooking", "only music"], "He studied plants and animals."],
  ["Euclid is called the father of…", "geometry", ["democracy", "medicine", "history"], "His book Elements was used for 2,000 years."],
  ["Hippocrates is known as the father of…", "medicine", ["geometry", "drama", "astronomy"], "Doctors still speak of the Hippocratic Oath."],
  ["Herodotus is often called the father of…", "history", ["geometry", "medicine", "biology"], "He wrote about the Persian Wars."],
  ["Thucydides wrote a history of the war between…", "Athens and Sparta", ["Rome and Carthage", "Egypt and Kush", "Persia and China"], "It is the Peloponnesian War."],
  ["Hypatia of Alexandria was a famous…", "mathematician and astronomer", ["general", "pharaoh", "sculptor"], "She taught in Alexandria around 400 CE."],
  ["Pythagoras is remembered for a rule about…", "right triangles", ["circles only", "taxes", "the calendar"], "a² + b² = c²."],
  ["Archimedes discovered how objects float, and is said to have shouted…", "Eureka!", ["Veni, vidi, vici!", "Hello!", "Liberty!"], "It means \"I have found it!\""],
  ["Greek plays were performed in open-air…", "theaters", ["pyramids", "ziggurats", "aqueducts"], "Tragedy and comedy began there."],
  ["Many government buildings in the US, with tall columns, copy…", "Greek architecture", ["Chinese pagodas", "Egyptian pyramids", "Aztec temples"], "Look at a state capitol.", true],
  ["Why did trade matter more to Athens than to a farming city-state like Sparta?", "Athens had a good harbor and little farmland", ["Athens had no sea", "Sparta had many ships", "Athens grew all its own grain"], "Athens' port was Piraeus.", true],
  ["Why do English speakers still use words like \"echo\" and \"panic\"?", "they come from names in Greek myths", ["they are Chinese words", "they were invented last year", "they come from Latin laws"], "Echo and Pan are characters in myths.", true],
];

const INDIA_6: Q[] = [
  ["Around 1500 BCE, Indo-Aryan peoples moved into northern India from…", "Central Asia", ["Africa", "the Americas", "Japan"], "Historians still study how this happened."],
  ["The Indo-Aryans brought a language that became…", "Sanskrit", ["Latin", "Chinese", "Arabic"], "It is related to many European languages."],
  ["The Vedas are…", "ancient sacred texts in Sanskrit", ["Greek plays", "Chinese laws", "Roman roads"], "They are the oldest Hindu scriptures."],
  ["The time when the Vedas were composed is called the…", "Vedic period", ["Stone Age", "Han dynasty", "Roman period"], "It began around 1500 BCE."],
  ["Over time, Indo-Aryan and earlier ways of life in India…", "blended together", ["never met", "disappeared", "moved to Europe"], "Hinduism grew from many roots."],
  ["The caste system divided society into groups based on…", "birth and occupation", ["height", "favorite food", "test scores"], "People were born into a group."],
  ["The four main social classes, or varnas, were Brahmins, Kshatriyas, Vaishyas and…", "Shudras", ["Pharaohs", "Senators", "Samurai"], "Each had different duties."],
  ["The Brahmins were…", "priests and teachers", ["merchants", "farmers", "soldiers"], "They had the highest status."],
  ["The Kshatriyas were…", "rulers and warriors", ["priests", "laborers", "traders"], "Kings came from this group."],
  ["The Vaishyas were…", "merchants, traders and farmers", ["priests", "warriors", "rulers"], "They kept the economy running."],
  ["The Shudras were…", "laborers and servants", ["kings", "priests", "scholars"], "They worked for the other groups."],
  ["People outside the four varnas, who did work others avoided, were…", "treated as outcasts and faced discrimination", ["the richest group", "the rulers", "free from all rules"], "India's constitution bans this discrimination today."],
  ["In the caste system, it was hard for people to…", "change the group they were born into", ["eat", "speak", "farm"], "Status passed from parents to children."],
  ["The Maurya Empire was founded by…", "Chandragupta Maurya", ["Ashoka", "Alexander", "Confucius"], "He unified much of India around 321 BCE."],
  ["Ashoka was the…", "Maurya emperor who turned to Buddhism", ["founder of Rome", "first Chinese emperor", "Greek philosopher"], "He was Chandragupta's grandson."],
  ["After the bloody war at Kalinga, Ashoka…", "regretted the suffering and promised to rule peacefully", ["started more wars", "moved to Greece", "burned all books"], "About 100,000 people died there."],
  ["Ashoka spread his messages by carving them on…", "rock walls and stone pillars", ["clay tablets in Rome", "paper money", "bamboo flutes"], "They are called the Edicts of Ashoka."],
  ["Ashoka's edicts urged people to…", "be kind, respect all religions and protect animals", ["obey only Brahmins", "go to war", "stop trading"], "He ruled by dharma, right conduct."],
  ["Ashoka helped Buddhism spread by…", "sending teachers to other lands", ["banning it", "keeping it secret", "burning its texts"], "Buddhism reached Sri Lanka and beyond."],
  ["Ashoka built roads, rest houses and…", "hospitals for people and animals", ["pyramids", "the Great Wall", "aqueducts"], "He cared for travelers and the sick."],
  ["The Bhagavad Gita is a sacred Hindu text that is part of the long epic called the…", "Mahabharata", ["Iliad", "Analects", "Torah"], "It is a dialogue between Krishna and Arjuna."],
  ["The Ramayana is an Indian epic about…", "Prince Rama and his wife Sita", ["Odysseus", "Gilgamesh", "Moses"], "It is still told in plays and festivals."],
  ["Ancient Indian mathematicians developed the idea of…", "zero as a number", ["the alphabet", "paper", "the wheel"], "It made big calculations easier."],
  ["The digits we write today (0 to 9) began in…", "India", ["Rome", "Greece", "Egypt"], "Arab scholars carried them west."],
  ["Ancient Indian doctors such as Sushruta wrote about…", "surgery and medicine", ["building ships", "making silk", "chariot racing"], "He described many operations."],
  ["The Iron Pillar of Delhi, over 1,500 years old, is famous because it…", "has hardly rusted", ["can fly", "is made of gold", "glows at night"], "It shows great skill in metalwork.", true],
  ["Why is Sanskrit important to historians?", "many ancient religious, literary and science texts were written in it", ["it was only spoken in Rome", "no one ever wrote in it", "it is used to build roads"], "Like Latin in Europe.", true],
  ["How was Ashoka's rule after Kalinga different from many conquerors?", "he tried to rule by moral example instead of conquest", ["he conquered all of China", "he banned every religion", "he ruled from Greece"], "Think about his edicts.", true],
];

const CHINA_6: Q[] = [
  ["Which physical features helped keep ancient China apart from other civilizations?", "high mountains, wide deserts and the ocean", ["flat open plains on every side", "a short land bridge to Europe", "many small islands"], "The Himalayas and the Gobi are examples."],
  ["The Gobi and Taklamakan are…", "deserts west and north of China", ["rivers in southern China", "Chinese emperors", "islands in the Pacific"], "Few people could cross them easily."],
  ["China's mountains and rivers made governing hard because…", "travel and communication across the land were slow", ["there were no people", "everyone lived in one city", "the land was all flat"], "Rulers had to reach distant regions."],
  ["Because China was isolated, its people called their land…", "the Middle Kingdom", ["the Land of the Rising Sun", "the Fertile Crescent", "Mare Nostrum"], "They saw it as the center of the world."],
  ["Confucius lived during a time of…", "war and disorder, as the Zhou kings lost control", ["peace under one strong emperor", "the Roman Empire", "the Gold Rush"], "Rival states fought each other."],
  ["Confucius believed society would be orderly if people…", "respected their roles and relationships", ["ignored their families", "obeyed no rules", "fought for power"], "Rulers and subjects, parents and children."],
  ["Filial piety, an important idea in Confucianism, means…", "respect and duty toward parents and ancestors", ["loyalty to a sports team", "a kind of tax", "a farming method"], "Families were the base of society."],
  ["Confucius taught that a ruler should govern by…", "setting a good example", ["harsh punishment only", "keeping people ignorant", "doing whatever he wanted"], "A virtuous ruler inspires good behavior."],
  ["Confucius's sayings were collected by his students in the…", "Analects", ["Vedas", "Torah", "Iliad"], "They were written after he died."],
  ["Shi Huangdi became the first emperor of a united China in…", "221 BCE", ["1492 CE", "44 BCE", "1776 CE"], "He ruled the Qin dynasty."],
  ["To unify China, Shi Huangdi standardized…", "money, weights, measures and writing", ["clothing colors only", "people's names", "the length of the day"], "Everyone used the same system."],
  ["Shi Huangdi joined earlier walls to begin the…", "Great Wall", ["Silk Road", "Grand Canal", "Royal Road"], "It protected against northern raiders."],
  ["Shi Huangdi followed Legalism, which taught that people obey when…", "laws are strict and punishments are harsh", ["rulers are gentle", "there are no laws", "everyone votes"], "He was a very harsh ruler."],
  ["Shi Huangdi ordered the burning of many books because he wanted to…", "silence ideas that challenged his rule", ["save paper", "build a library", "teach Confucianism"], "Confucian scholars were punished."],
  ["The Han dynasty followed the Qin and ruled for about…", "400 years", ["4 years", "40 years", "4,000 years"], "It lasted from 206 BCE to 220 CE."],
  ["Han emperors made Confucianism…", "the basis of government and education", ["illegal", "a sport", "a secret"], "Officials studied Confucian texts."],
  ["The Han began choosing government officials partly by…", "exams on Confucian learning", ["lottery", "strength contests", "family wealth alone"], "This built a trained bureaucracy."],
  ["A bureaucracy is…", "a system of officials who run a government", ["a type of boat", "a Chinese temple", "a farm tool"], "Clerks, tax collectors and judges are part of it."],
  ["Emperor Wudi expanded the Han empire into…", "Korea, Vietnam and Central Asia", ["Europe and Africa", "the Americas", "Australia"], "He ruled for over 50 years."],
  ["The Han dynasty invented…", "paper", ["the printing press", "the telephone", "gunpowder weapons"], "It was made from bark and rags."],
  ["During the Han dynasty, Buddhism reached China from…", "India, along the Silk Road", ["Rome, by sea", "Japan, by bridge", "Egypt, by river"], "Merchants and monks carried it."],
  ["Buddhist monks in China worked to…", "translate Buddhist texts into Chinese", ["burn all books", "build pyramids", "close the Silk Road"], "Translation helped new believers."],
  ["One of the first Buddhist temples in China is the…", "White Horse Temple at Luoyang", ["Parthenon", "Colosseum", "Great Pyramid"], "Legend says horses carried scriptures there."],
  ["The Silk Road carried silk west and brought to China…", "horses, glass, new crops and new religions", ["only snow", "potatoes from America", "printing presses"], "Ideas traveled with goods."],
  ["Which river is called China's sorrow because of its floods?", "the Huang He (Yellow River)", ["the Nile", "the Tigris", "the Indus"], "Its floods brought fertile soil and danger.", true],
  ["How did Confucianism and Buddhism differ?", "Confucianism focused on duties in society; Buddhism focused on ending suffering", ["they are the same", "Buddhism came from China and Confucianism from India", "Confucianism forbids families"], "Compare their main goals.", true],
  ["Why did the Qin dynasty last only 15 years?", "its harsh rule made people rebel", ["it moved to Rome", "there was no emperor", "it was too gentle"], "Peasants and nobles rose up.", true],
];

const ROME_EMPIRE_6: Q[] = [
  ["Rome's location in the middle of the Italian peninsula, near the Mediterranean, helped it…", "trade and expand by land and sea", ["avoid all contact with others", "grow rice", "stay small"], "The sea linked Rome to three continents."],
  ["Rome fought three Punic Wars against…", "Carthage", ["Persia", "China", "Egypt"], "Carthage was in North Africa."],
  ["Hannibal of Carthage crossed the Alps with…", "elephants", ["camels", "chariots of gold", "steamships"], "He invaded Italy in 218 BCE."],
  ["Romans called the Mediterranean Mare Nostrum, meaning…", "our sea", ["the dark sea", "the great river", "the cold sea"], "Rome ruled all its shores."],
  ["At its height, the Roman Empire stretched from Britain to…", "Egypt and the Middle East", ["China", "the Americas", "India's south tip"], "It circled the Mediterranean."],
  ["Roman roads helped the empire by…", "moving armies, traders and messages quickly", ["keeping people apart", "flooding farms", "blocking trade"], "Some are still used today."],
  ["Julius Caesar won fame by conquering…", "Gaul (today's France)", ["China", "India", "Japan"], "He wrote about his wars there."],
  ["In 49 BCE, Caesar crossed the Rubicon River with his army, which started a…", "civil war", ["trade fair", "peace treaty", "new religion"], "Crossing the Rubicon means a point of no return."],
  ["Caesar was named dictator for life, which worried senators who wanted to…", "keep the Republic", ["crown a pharaoh", "move Rome to Greece", "end the army"], "They feared he would be a king."],
  ["Julius Caesar was killed on the Ides of March in…", "44 BCE", ["476 CE", "753 BCE", "1453 CE"], "A group of senators attacked him."],
  ["Octavian, Caesar's adopted heir, became Rome's first emperor and took the name…", "Augustus", ["Nero", "Constantine", "Brutus"], "He ruled from 27 BCE."],
  ["Augustus kept the Senate but…", "held the real power himself", ["gave all power to the people", "abolished the army", "ruled from Egypt"], "Rome became an empire in fact."],
  ["The Pax Romana was…", "about 200 years of peace and stability in the empire", ["a Roman road", "a war with Carthage", "a type of coin"], "It began under Augustus."],
  ["Judea, home of many Jews, became a…", "province ruled by Rome", ["Greek colony", "Chinese state", "free republic forever"], "Romans took control in 63 BCE."],
  ["In 70 CE, during a Jewish revolt, the Romans…", "destroyed the Second Temple in Jerusalem", ["built the Great Wall", "freed Judea", "crowned a Jewish king"], "Only the Western Wall remains."],
  ["After later revolts, Rome banned Jews from…", "living in Jerusalem", ["trading", "reading", "farming anywhere"], "Many settled elsewhere."],
  ["After the revolts, many Jews moved to communities around the…", "Mediterranean and beyond", ["Americas", "Pacific islands", "Arctic"], "This scattering is part of the Diaspora."],
  ["Christianity began with the teachings of Jesus of Nazareth in…", "Judea, under Roman rule", ["Greece", "Egypt", "Gaul"], "Christians believe he is the son of God."],
  ["Paul of Tarsus helped spread Christianity by…", "traveling and writing letters to communities", ["building aqueducts", "leading Roman legions", "writing the Iliad"], "His letters are part of the New Testament."],
  ["Christianity spread across the empire partly because of…", "Roman roads, sea routes and a shared Greek language", ["a ban on travel", "the Great Wall", "the Silk Road only"], "Ideas moved along trade routes."],
  ["In 313 CE, Emperor Constantine…", "allowed Christians to worship freely", ["banned Christianity", "founded Carthage", "conquered China"], "This was the Edict of Milan."],
  ["Romans developed concrete and used it to build…", "domes, arches and aqueducts", ["paper", "silk", "pyramids of mud"], "The Pantheon's dome still stands."],
  ["The Colosseum in Rome was used for…", "public games and shows", ["growing grain", "storing water", "meetings of the Senate"], "It held about 50,000 people."],
  ["Latin is the root of Spanish, French, Italian and…", "many English words", ["Chinese", "Japanese", "Sanskrit"], "Words like \"legal\" and \"senate\" come from Latin."],
  ["A legacy of Roman law is the idea that a person accused of a crime is…", "innocent until proven guilty", ["always guilty", "judged by the emperor alone", "never tried"], "Many legal systems use this idea."],
  ["Virgil wrote the Aeneid, an epic poem about…", "the legendary founding of Rome", ["the Trojan horse only", "the Great Wall", "the Persian kings"], "Aeneas flees Troy for Italy.", true],
  ["Our calendar of 365 days with a leap year comes from the calendar introduced by…", "Julius Caesar", ["Augustus", "Hannibal", "Constantine"], "It is called the Julian calendar.", true],
  ["Why did Rome's government change from a republic to an empire?", "powerful generals used their armies to seize control", ["the people voted for a pharaoh", "Carthage ordered it", "the Senate grew stronger"], "Think of Caesar and Augustus.", true],
];

// Copies of Washington's Grade 6 units, with California items. They come from that state's own grade
// file, which this grade's download already carries.
const K = (id: string) => from([...WASHINGTON], id);

export const SOCIAL_6: Unit[] = [
  copyOf(K("wa-g6-greece-rome"), {
    id: "ca-g6-greece-rome",
    title: "Greece & Rome",
    emoji: "🏛️",
    blurb: "Democracy, republic and law",
    parentNote:
      "Athens and Sparta, direct and representative democracy, the Roman Republic and Empire, and the Greek and Roman ideas found in US government.",
    standards: [
      "6.4.2; 6.4.3; 6.4.6; 6.7.1; 6.7.2",
      "early democracy in Greece, Athens and Sparta, and the Roman Republic and its influence on the US",
    ],
  }),
  bankUnit({
    id: "ca-g6-hebrews-kush",
    title: "Ancient Israel & Kush",
    emoji: "📜",
    blurb: "The early Hebrews and the kingdom of Kush",
    parentNote:
      "The origins and central teachings of Judaism, key figures and the Diaspora, how Judaism endured, and the kingdom of Kush on the Nile: its iron, trade, pyramids and rule over Egypt. Religions are described factually and neutrally.",
    standards: [
      "6.2.8; 6.3.1; 6.3.2; 6.3.3; 6.3.4; 6.3.5",
      "the location and culture of Kush, and the origins, teachings, settlements and survival of Judaism among the ancient Hebrews",
    ],
    items: HEBREWS_KUSH,
  }),
  bankUnit({
    id: "ca-g6-pharaohs-persia-alexander",
    title: "Pharaohs, Persia & Alexander",
    emoji: "👑",
    blurb: "Great rulers of the ancient world",
    parentNote:
      "Hatshepsut and Ramses the Great, the founding, growth and government of the Persian Empire, and the rise of Alexander the Great and the spread of Greek culture as far as Egypt and India.",
    standards: [
      "6.2.7; 6.4.5; 6.4.7",
      "Queen Hatshepsut and Ramses the Great, the Persian Empire, and Alexander the Great and the spread of Greek culture",
    ],
    items: EMPIRES_6,
  }),
  bankUnit({
    id: "ca-g6-greek-world",
    title: "The Greek World",
    emoji: "🏺",
    blurb: "Sea trade, myths and great thinkers",
    parentNote:
      "How the Aegean's geography shaped city-states, trade and colonies, the place of Greek mythology in daily life and in our language today, and Greek thinkers such as Socrates, Plato, Aristotle, Euclid, Hippocrates, Thucydides and Hypatia.",
    standards: [
      "6.4.1; 6.4.4; 6.4.8",
      "geography and the city-states of the Aegean, Greek mythology and literature, and the contributions of Greek figures in the arts and sciences",
    ],
    items: GREEK_WORLD_6,
  }),
  bankUnit({
    id: "ca-g6-ancient-india",
    title: "Ancient India",
    emoji: "🪷",
    blurb: "Sanskrit, the caste system and the Maurya Empire",
    parentNote:
      "The Indo-Aryan migrations and the Vedas, the social structure of the caste system, the Maurya Empire and the emperor Ashoka, and India's literature, medicine, metalwork and mathematics. Religions are described factually.",
    standards: [
      "6.5.2; 6.5.4; 6.5.6; 6.5.7",
      "the Indo-Aryan migrations, the caste system, the Maurya Empire and Ashoka, and India's literary and scientific traditions",
    ],
    items: INDIA_6,
  }),
  bankUnit({
    id: "ca-g6-qin-and-han",
    title: "Confucius, Qin & Han",
    emoji: "🏯",
    blurb: "Uniting and governing ancient China",
    parentNote:
      "The geography that isolated China, the troubled times of Confucius and his answers, Shi Huangdi's unification of China under the Qin, the Han dynasty's government and expansion, and how Buddhism reached China.",
    standards: [
      "6.6.2; 6.6.4; 6.6.5; 6.6.6; 6.6.8",
      "China's geography, Confucius's times and ideas, Shi Huangdi and the Qin, the Han dynasty's imperial state and the spread of Buddhism to China",
    ],
    items: CHINA_6,
  }),
  bankUnit({
    id: "ca-g6-roman-empire",
    title: "The Roman Empire",
    emoji: "🏛️",
    blurb: "From Caesar to the legacies of Rome",
    parentNote:
      "How Rome expanded around the Mediterranean, Julius Caesar and Augustus and the change from republic to empire, the Jewish revolts and Diaspora, the spread of Christianity, and Rome's lasting legacies in building, language and law. Religions are described factually.",
    standards: [
      "6.7.3; 6.7.4; 6.7.5; 6.7.7; 6.7.8",
      "Rome's expansion, Julius Caesar and Augustus, the Jews under Rome, the spread of Christianity, and the legacies of Roman art, technology, language and law",
    ],
    items: ROME_EMPIRE_6,
  }),
];
