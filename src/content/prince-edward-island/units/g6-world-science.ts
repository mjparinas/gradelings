import { bankUnit, type Q } from "../own";

// Grade 6 Prince Edward Island: World Cultures (social studies) and Grade 6 science (microbes and arthropods, adaptations and
// endangered animals, electromagnets and generators, constellations). Cultural content is general and respectful (customs,
// traditions, human rights, government and culture); no culture is described as one thing, and there are no sacred or ceremonial
// details. Indigenous content is light and needs review by Mi’kmaq partners (for example the Mi’kmaq Confederacy of PEI) and
// the PEI Department of Education before launch.
//
// Sources checked (standard reference facts only; no web fetch was available in this session, so every fact below is a
// widely published textbook or reference fact):
// United Nations, Universal Declaration of Human Rights (adopted 1948) and Convention on the Rights of the Child (un.org)
// UNICEF, "Convention on the Rights of the Child" child-friendly summary (unicef.org)
// International Astronomical Union, "The Constellations" (88 official constellations) (iau.org)
// NASA, "Polaris, the North Star" and "How to find the Big Dipper" (nasa.gov)
// NASA Science, "Stars and constellations" and "Planets vs stars" (science.nasa.gov)
// The Canadian Encyclopedia, "Canadian Official Languages" (thecanadianencyclopedia.ca)
// Natural Resources Canada, "Electricity generation" and "Renewable energy" (nrcan.gc.ca)
// Natural History Museum / Smithsonian, "Arthropods" and "Fossils" (nhm.ac.uk, si.edu)
// World Wildlife Fund and IUCN, "Why species become endangered" (worldwildlife.org, iucn.org)
//
// Left out because unverified: specific Mi’kmaq star stories and names for constellations, and any sacred or ceremonial detail;
// the exact year Canada ratified the Convention on the Rights of the Child; named dates for particular festivals.

const CULTURE: Q[] = [
  ["What is culture?", "the shared way of life of a group of people", ["the money a country earns", "the land a country covers", "the buildings in one city"], "Think of customs, beliefs, food and language that a group shares."],
  ["Which of these is part of a culture?", "the language people speak", ["how deep a lake is", "the weather in July", "how tall a mountain is"], "Culture is about people’s way of life, not nature."],
  ["Special foods a community shares at celebrations are part of its…", "culture", ["climate", "soil", "latitude"], "Food is one way people share their way of life."],
  ["Songs and dances passed down in a family are an example of…", "arts and customs", ["natural resources", "landforms", "weather patterns"], "People make and share these; they are not found in nature."],
  ["Which pair are both parts of culture?", "beliefs and clothing", ["rivers and lakes", "rainfall and wind", "rocks and soil"], "Look for things people do, wear, or believe."],
  ["How does culture play a role in your life?", "It shapes how you celebrate, eat, speak and dress", ["It decides the weather", "It only matters on one day", "It has no effect"], "Think about your own family’s ways of doing things."],
  ["Can a person belong to more than one culture?", "Yes, many people share parts of several cultures", ["No, only one is ever allowed", "Only adults can", "Only if they move away"], "A family may speak two languages or keep traditions from several places.", true],
  ["A cultural region is…", "an area where people share many parts of culture", ["a place with only one country", "an area with the same weather only", "a region run by one mayor"], "People there may share a language, customs or beliefs."],
  ["Which is a criterion for grouping the world into cultural regions?", "a shared language", ["the number of roads", "the price of bread", "the age of the oldest tree"], "A criterion is a rule for sorting things into groups."],
  ["Which of these could also be used to group cultural regions?", "common religions and geography", ["the colour of buildings", "the brands of cars", "the size of airports"], "Think about things that bring groups of people together.", true],
  ["Which map helps you locate cultural regions?", "a world map", ["a recipe book", "a clock", "a thermometer"], "You need a map that shows the whole world."],
  ["In which cultural region do many people speak Spanish or Portuguese?", "Latin America", ["Scandinavia", "Oceania", "East Asia"], "This region includes Mexico, Brazil and many countries in South America."],
  ["Which cultural region includes China, Japan and Korea?", "East Asia", ["Latin America", "Sub-Saharan Africa", "Western Europe"], "Find the east side of the largest continent."],
  ["Many people in Egypt and Saudi Arabia speak Arabic. Which region are they grouped in?", "North Africa and Southwest Asia", ["Latin America", "Western Europe", "Oceania"], "Look at the area where Africa meets Asia.", true],
  ["Two cultures can be alike because…", "people everywhere need food, shelter and ways to celebrate", ["they all speak one language", "they all live in one climate", "they never change"], "Think of what every family needs."],
  ["Which is a way that two cultures might be different?", "the festivals they celebrate", ["that every family needs a home", "that people need water", "that families care for children"], "Pick the one that varies from place to place."],
  ["Why does cross-cultural understanding matter?", "It helps people respect one another and get along", ["It makes everyone speak one language", "It makes all cultures the same", "It means nobody ever disagrees"], "Understanding is a first step toward respect."],
  ["A new classmate’s family celebrates a festival you do not know. A respectful first step is to…", "ask kindly and listen to learn about it", ["say it sounds strange", "ignore it", "tell them to do it your way"], "Curiosity and kindness go together."],
  ["What is a stereotype?", "an unfair idea that all people in a group are the same", ["a fact checked in many books", "a map of cultural regions", "a song for a festival"], "People in a group are individuals.", true],
  ["Which is a fair description rather than a stereotype?", "“Many families in that region enjoy this dish.”", ["“Everyone from there eats the same thing.”", "“All people there dress alike.”", "“Nobody there likes new things.”"], "Words like “many” leave room for differences.", true],
  ["Why is “all people from that country are the same” a problem?", "People in any country have many different interests and ideas", ["It leaves out the country’s name", "It is too hard to say", "It is only true on holidays"], "Think about how different the people in your own class are.", true],
  ["Which source is best for learning about a culture respectfully?", "speaking with or reading from people who belong to it", ["guessing from a cartoon", "copying a rumour", "repeating a joke"], "Hearing from the people themselves is most accurate."],
  ["When you learn about another culture, you should…", "treat its customs with respect, even if they differ from yours", ["laugh at customs you do not know", "decide which customs are best", "avoid asking anything"], "Different does not mean wrong.", true],
  ["Which activity helps build cross-cultural understanding?", "sharing stories and foods at a school multicultural event", ["staying away from classmates who seem different", "deciding whose way is best", "teasing someone’s accent"], "Think about welcoming and listening."],
  ["Why might a family wear special clothing at a celebration?", "to honour a custom that is important to them", ["because the weather demands it every day", "because the law forbids other clothes", "because it costs nothing"], "Clothing can carry meaning for a family or community."],
  ["Which statement shows understanding of cultural differences?", "Different customs are not better or worse, just different", ["Customs that are new to me are wrong", "My way is the only right way", "Other customs are not worth learning"], "Fairness means giving every culture the same respect.", true],
  ["Which of these is NOT part of culture?", "where a mountain range lies", ["a festival", "a folk song", "a style of dress"], "Culture is made by people."],
];

const TRADITIONS: Q[] = [
  ["What is a tradition?", "a custom or belief passed from one generation to the next", ["a rule only for adults", "a brand new idea this year", "a kind of weather"], "Think of something your family has done for many years."],
  ["Which is an example of a tradition?", "a festival held at the same time each year", ["a storm last night", "a broken bus", "a one-time sale"], "A tradition returns again and again."],
  ["Traditional clothing is clothing that…", "has been worn for special occasions for many years", ["was invented last week", "is never worn by anyone", "is made only by machines"], "“Traditional” means handed down over time."],
  ["Songs that grandparents teach to grandchildren show how traditions…", "are passed on", ["are lost", "are hidden", "are bought"], "Older family members share with younger ones."],
  ["How are traditions usually passed on?", "families and communities teach them through stories, songs and practice", ["only through laws", "only through machines", "by accident only"], "People teach people."],
  ["Why do traditions matter to a group?", "they show what the group values", ["they decide the weather", "they set the price of food", "they make all days equal"], "What people celebrate says what is important to them."],
  ["A harvest festival honours the food that grows from the land. What does this tradition reflect?", "the group values farming and sharing food", ["that they dislike eating together", "that farming is forbidden", "that they never celebrate"], "Think about why people would gather at harvest time."],
  ["Do traditions ever change?", "Yes, they can change slowly over time", ["No, never", "Only if a king orders", "Only in winter"], "People add new ideas as life changes."],
  ["A tradition once used handmade lanterns and now uses electric lights. This shows traditions can…", "change while keeping their meaning", ["never be changed", "be forgotten entirely", "only be used by machines"], "The purpose stayed the same while the tools changed.", true],
  ["In which country is hanami, enjoying cherry blossoms in spring, a well-known tradition?", "Japan", ["Brazil", "Kenya", "Norway"], "Cherry trees bloom there each spring and many people gather to see them."],
  ["Which country is famous for its large Carnival, with parades, music and dance, in Rio de Janeiro?", "Brazil", ["Japan", "Norway", "Egypt"], "It is the biggest country in South America."],
  ["Oktoberfest, an autumn festival with music and food, began in which country?", "Germany", ["Mexico", "Japan", "Kenya"], "It started in the city of Munich."],
  ["Red decorations, family meals and lion dances are part of which celebration in many Chinese communities?", "Lunar New Year", ["Carnival", "hanami", "Oktoberfest"], "It begins a new year on a calendar based on the Moon.", true],
  ["Which food is a traditional dish in Mexico, made from corn dough with a filling?", "tamales", ["sushi", "haggis", "goulash"], "The dough is steamed in a wrapper.", true],
  ["Hanami and a harvest fair are both traditions that celebrate…", "nature and the seasons", ["machines", "money", "only winter"], "Both are tied to what is happening outdoors."],
  ["A summer festival in one region and a winter festival in another are alike because both…", "bring people together to celebrate", ["use the same food", "happen on the same day", "need the same weather"], "Look for what the festivals have in common."],
  ["How do traditions help people feel they belong?", "by connecting them to family and community", ["by keeping them apart", "by making them leave", "by giving them a test"], "Sharing customs makes a group feel like one team."],
  ["Newcomers bring traditions to a new country. What often happens?", "the country’s culture grows richer with new customs", ["old customs vanish instantly", "no one learns anything new", "traditions become illegal"], "Cultures can share and blend."],
  ["Which shows a tradition changing over time?", "a family recipe updated with new ingredients", ["a mountain that is tall", "a lake that is deep", "a river that flows"], "The tradition continues but looks a little different."],
  ["Why might a group keep a tradition for hundreds of years?", "it holds meaning and brings people together", ["it earns lots of money", "it is required by weather", "it is easy to forget"], "People keep what matters to them."],
  ["Who often teaches traditions?", "elders and family members", ["only machines", "only strangers", "nobody"], "Think of who tells you stories at home."],
  ["Taking off shoes before going into a home is a custom in many cultures. It shows…", "care for keeping the home clean", ["dislike of visitors", "that the shoes are old", "a rule about weather"], "Customs often have a kind reason behind them.", true],
  ["Why do many cultures use storytelling?", "to share history and values with children", ["to stop children learning", "to hide the past", "to sell things"], "Stories are an easy way to remember."],
  ["Which is an example of a musical tradition?", "a folk song sung at gatherings for generations", ["a new advertisement", "a car horn", "a phone ring"], "Look for music handed down over many years."],
  ["Which statement compares traditions from two regions fairly?", "Both have special foods for celebrations, though the foods differ", ["One region has traditions and the other has none", "One region’s traditions are silly", "Both regions share exactly the same traditions"], "Fair comparisons name both what is alike and what is different.", true],
  ["What can a festival teach you about a region?", "what its people value and enjoy", ["how tall its mountains are", "the price of its houses", "next year’s weather"], "Festivals are made by people."],
  ["Which statement shows respect for others’ traditions?", "I can watch and ask polite questions", ["I should tell them how to do it my way", "I should say it is wrong", "I should ignore it"], "Respect starts with being curious and polite."],
];

const GOVERNMENT: Q[] = [
  ["What does a government do?", "makes laws and provides services for people", ["grows all the food", "makes the weather", "picks everyone’s friends"], "Think of roads, schools and rules."],
  ["Which is a service many governments provide?", "public schools", ["private pizza shops", "birthday parties", "family pets"], "Governments pay for services that help everyone."],
  ["A law is…", "a rule made by a government that people must follow", ["a suggestion", "a game", "a weather forecast"], "Laws apply to everyone in a country."],
  ["Why do countries have laws?", "to keep people safe and settle disagreements fairly", ["to make life harder", "to stop all celebrations", "to pick songs"], "Rules help people live together."],
  ["A traffic law is an example of a rule that shapes…", "daily life", ["the seasons", "the tides", "the Moon"], "You meet traffic rules on the way to school."],
  ["Many governments choose official languages. What does this influence?", "the languages used in schools and public services", ["the colour of the sky", "the size of lakes", "the number of stars"], "Official forms and signs use these languages."],
  ["Which two languages are official in Canada?", "English and French", ["English and Spanish", "French and Spanish", "English and Mandarin"], "You see both on food packages."],
  ["How do governments influence education?", "by deciding what children must learn and funding schools", ["by choosing each child’s bedtime", "by picking every child’s friends", "by writing every word on every worksheet"], "Schools follow rules and money from the government."],
  ["How can a government support the arts?", "by funding museums, music and festivals", ["by stopping all rain", "by selling all songs", "by closing all libraries"], "Money from taxes can pay for culture."],
  ["How can a government limit a tradition?", "by banning a practice or festival", ["by funding it", "by celebrating it", "by teaching it in school"], "Limiting means making it harder or illegal.", true],
  ["In many countries, who decides which days are public holidays?", "the government", ["the weather", "a lake", "a mountain"], "Holidays are set by law."],
  ["What is a democracy?", "a system where citizens vote to choose leaders", ["a system where one person always rules", "a system without laws", "a system with no leaders"], "“Demos” means people."],
  ["In a traditional monarchy, who is the head of state?", "a king or queen", ["a mayor", "a teacher", "a judge"], "A royal family holds the title."],
  ["In a democracy, how do people have a say?", "by voting in elections", ["by waiting for rain", "by keeping quiet", "by moving away"], "Every voter’s choice counts."],
  ["Who makes decisions in a democratic country?", "leaders chosen by citizens", ["whoever is richest", "a person who is never chosen", "only visitors"], "Citizens pick them."],
  ["Where one ruler makes all the decisions, citizens usually have…", "little say in choosing leaders", ["more votes than anywhere", "the right to rule", "no culture"], "Compare with a democracy.", true],
  ["How can citizens influence a government?", "by voting, writing letters and speaking up peacefully", ["by ignoring it", "by breaking laws", "by waiting 100 years"], "Peaceful action counts."],
  ["A petition is…", "a signed request asking the government to act", ["a kind of tax", "a song", "a type of boat"], "Many people sign to show they agree."],
  ["Country A funds festivals and teaches children local songs. Country B bans many festivals. How do their governments affect culture?", "A supports culture and B limits it", ["Both ignore culture", "Both support culture equally", "Neither affects it"], "Compare what each government does.", true],
  ["Why might a government protect historic buildings?", "to keep a country’s heritage for future generations", ["to make them fall down", "to sell them for nothing", "to hide them"], "Old buildings tell a country’s story.", true],
  ["Rules about what can be shown on television in a country can influence its…", "popular culture", ["tides", "mountains", "rivers"], "Shows and songs are part of everyday culture.", true],
  ["A national museum paid for by the government helps people…", "learn about their history", ["forget history", "avoid art", "stay home all day"], "Museums keep objects and stories."],
  ["Taxes are money people pay to the government. What can taxes pay for?", "roads, schools and libraries", ["birthday gifts", "private holidays", "a neighbour’s lunch"], "Taxes pay for things many people share."],
  ["A government lets a community run schools in its own language. This shows the government…", "protecting a culture’s language", ["removing a culture", "ignoring the law", "collecting tax"], "Language is a big part of culture.", true],
  ["What does it mean to be a citizen?", "to be a legal member of a country with rights and responsibilities", ["to be a visitor with no rights", "to own a country", "to make the weather"], "Citizens vote, follow laws and share in a country."],
  ["Why might two countries’ governments affect culture differently?", "they have different laws, values and systems", ["they have the same laws", "they have the same maps", "they are on one island"], "Different choices lead to different results.", true],
];

const RIGHTS: Q[] = [
  ["What is a human right?", "something every person deserves simply because they are human", ["a prize for winning", "a gift for adults only", "a treat for good grades"], "Rights belong to everyone."],
  ["Which of these is a right of every child?", "to rest and play", ["to own a car", "to never be asked to help", "to have the biggest room"], "Children need time to be children."],
  ["Which is another right of every child?", "food, clean water and a safe home", ["a new toy each week", "a pet of their choice", "a holiday every year"], "These are basic needs."],
  ["The United Nations Convention on the Rights of the Child is an agreement about…", "the rights of children", ["rules for sports", "weather forecasts", "map symbols"], "It lists what all children should have."],
  ["In 1948, the United Nations adopted the Universal Declaration of…", "Human Rights", ["Free Time", "Good Weather", "Space Travel"], "It lists rights for all people.", true],
  ["What does the United Nations (UN) try to do?", "help countries work together for peace and rights", ["sell products", "run one big school", "pick world champions"], "Many countries are members."],
  ["What does it mean when a right is denied?", "a person is not allowed what they should have", ["they win a prize", "they get extra", "they move house"], "It is unfair."],
  ["Some children cannot go to school because of cost or distance. Which right is affected?", "the right to an education", ["the right to play only", "the right to vote", "the right to travel"], "School helps children learn and grow."],
  ["Treating a person unfairly because of their skin colour or beliefs is called…", "discrimination", ["teamwork", "tradition", "taxation"], "It means unfair treatment.", true],
  ["What is discrimination?", "treating people unfairly because of who they are", ["liking a sports team", "choosing a snack", "planning a trip"], "Everyone should be treated fairly."],
  ["Which is fair treatment?", "giving everyone the same chance to learn", ["letting only some students learn", "picking by hair colour", "ignoring some voices"], "Fair means equal chances."],
  ["Which group works around the world to help protect children’s health and rights?", "UNICEF", ["a weather office", "a farmers’ market", "a hockey team"], "It is part of the United Nations."],
  ["Amnesty International is a group that…", "campaigns to protect human rights", ["sells sports gear", "builds airplanes", "runs a theme park"], "Members write letters for people whose rights are in danger.", true],
  ["Why do rights matter to everyone?", "everyone is safer and treated better when rights are respected", ["they matter only to rich people", "they matter only to adults", "they do not matter"], "A fair world is better for all."],
  ["In some places, children are made to work instead of going to school. This is called…", "child labour", ["child’s play", "school holiday", "family chores"], "It takes away a child’s chance to learn and play.", true],
  ["Some communities do not have safe drinking water. What can help?", "cleaner wells and water systems built with the community", ["hoping for rain only", "drinking less forever", "moving every month"], "Working together can solve it."],
  ["Freedom of speech means…", "people can share their ideas and opinions peacefully", ["people must stay quiet", "people can shout at anyone", "only leaders can talk"], "It is about peaceful sharing."],
  ["How can young people speak up for others?", "write letters, join clubs or raise awareness kindly", ["ignore unfairness", "laugh at those who are different", "wait until adulthood to care"], "Even small actions help."],
  ["You see someone being treated unfairly at school. A good choice is to…", "tell a trusted adult and be kind to the person", ["join in", "pretend not to see", "spread the story as gossip"], "Kindness and help make a difference."],
  ["Which situation is unfair?", "a student is never allowed to join games because of their accent", ["every student takes turns", "students share equipment", "a teacher explains the rules"], "Look for who is left out and why.", true],
  ["“Equal rights” means…", "everyone has the same basic rights", ["everyone is exactly alike", "no one has rights", "only some have rights"], "People are different but their rights are the same."],
  ["Which goes together with having rights?", "respecting the rights of others", ["taking away others’ rights", "ignoring rules", "hiding"], "Rights are shared with everyone."],
  ["Refugees are people who…", "have had to leave their country to be safe", ["travel for fun", "collect stamps", "move for a new hobby"], "They flee danger and need protection.", true],
  ["Which statement is true about human rights?", "They belong to all people no matter where they live", ["They change at every border", "They belong only to some countries", "They belong only to people over 18"], "Rights go with people everywhere.", true],
  ["A peaceful way to ask leaders to protect rights is to…", "sign a petition or write to them", ["shout at them", "stay home forever", "hide from them"], "Peaceful words are powerful."],
  ["Human Rights Day is marked every year on which date?", "December 10", ["July 1", "March 3", "October 31"], "It remembers the 1948 declaration.", true],
  ["A right that lets people share what they believe without fear is called…", "freedom of belief", ["freedom of weather", "freedom of lunch", "freedom of speed"], "People are free to think and believe for themselves."],
];

const MICROBES: Q[] = [
  ["Which feature do all arthropods have?", "jointed legs", ["a backbone", "wings", "fur"], "“Arthro” means joint."],
  ["Arthropods have a hard outer covering called an…", "exoskeleton", ["backbone", "soft skin", "fur coat"], "“Exo” means outside."],
  ["How many main body parts does an insect have?", "three", ["two", "four", "five"], "Head, thorax and abdomen."],
  ["How many legs does an insect have?", "six", ["four", "eight", "ten"], "Count three pairs."],
  ["How many legs does a spider have?", "eight", ["six", "four", "twelve"], "Four pairs."],
  ["Spiders belong to which group of arthropods?", "arachnids", ["insects", "crustaceans", "mammals"], "Scorpions are in this group too."],
  ["Crabs, lobsters and shrimp belong to which group?", "crustaceans", ["arachnids", "insects", "reptiles"], "Many live in water."],
  ["Which of these is an arthropod?", "a lobster", ["a snail", "an earthworm", "a jellyfish"], "Look for jointed legs and a hard covering."],
  ["Which animal is NOT an arthropod?", "an earthworm", ["a beetle", "a spider", "a crab"], "It has a soft body with no legs."],
  ["What do all invertebrates lack?", "a backbone", ["a body", "a way to eat", "any cells"], "Vertebrates have one."],
  ["An ant has three body parts and six legs. Which group is it in?", "insects", ["arachnids", "crustaceans", "fish"], "Count the body parts and legs."],
  ["A crab living in the ocean takes in oxygen with its…", "gills", ["lungs", "wings", "whiskers"], "They work underwater."],
  ["Which tool can you use to see microorganisms?", "a microscope", ["a telescope", "a ruler", "a thermometer"], "It makes tiny things look bigger."],
  ["Why do we need a microscope to see microorganisms?", "they are too small to see with just our eyes", ["they are hidden underground", "they are too bright", "they only come out at night"], "Their size is the problem."],
  ["Which of these is a microorganism?", "bacteria", ["a beetle", "a crab", "a sparrow"], "You need a microscope to see them."],
  ["Fuzzy mould on old bread is a sign of…", "unwanted microorganism growth", ["fresh baking", "a new insect", "dry weather"], "Mould grows on food that sits too long."],
  ["Microorganisms need food, water and…", "air", ["thread", "glass", "paint"], "Living things must take in the right things to live."],
  ["How can some single-celled microorganisms move?", "with tiny hair-like parts or tails", ["by flying", "by walking on legs", "by riding bikes"], "They are too small to have legs."],
  ["What does yeast do in bread dough?", "makes it rise", ["turns it blue", "makes it shrink", "keeps it frozen"], "It makes tiny bubbles of gas."],
  ["Which is a helpful use of microorganisms?", "making yogurt", ["spoiling milk", "causing a sore throat", "growing on wet towels"], "Helpful microorganisms are used in some foods."],
  ["What helps stop harmful microorganisms from spreading?", "washing hands with soap", ["staying up late", "wearing a hat", "eating more candy"], "Soap lifts them off your skin."],
  ["Where should leftovers be stored to slow microorganism growth?", "in the fridge", ["on the counter all day", "in a sunny window", "in a warm car"], "Cold slows them down."],
  ["Which is a good way to protect kitchen surfaces from unwanted growth?", "clean them and dry them well", ["leave them damp", "cover them with wet cloths", "never clean them"], "Microorganisms love wet places."],
  ["Heating milk to kill harmful microorganisms is called…", "pasteurization", ["evaporation", "freezing", "melting"], "It makes milk safer to drink.", true],
  ["How did the microscope help scientists?", "they could see and study tiny living things", ["they could fly", "they could travel faster", "they could stop the rain"], "It opened up a hidden world.", true],
  ["You record observations of arthropods in a table. Which column headings suit it?", "animal, number of legs, number of body parts", ["favourite colour, price, birthday", "month, weather, moon", "name, age, address"], "Headings should match what you observe.", true],
  ["A snail has no backbone and no jointed legs. It is…", "an invertebrate that is not an arthropod", ["an arthropod", "a vertebrate", "a microorganism"], "Check the arthropod features.", true],
  ["How do insects and arachnids differ?", "insects have six legs and arachnids have eight", ["insects have eight legs and arachnids have six", "both have twelve legs", "neither has legs"], "Count the legs.", true],
  ["Spiders differ from ants because spiders have no…", "antennae", ["eyes", "legs", "exoskeleton"], "Ants have two feelers on their heads.", true],
];

const ADAPT: Q[] = [
  ["A polar bear’s thick fur and fat help it…", "stay warm in the Arctic", ["fly south", "hide in sand", "swim fast in warm water"], "Think about where polar bears live."],
  ["A camel’s wide, flat feet help it walk on…", "soft sand", ["ice", "branches", "water"], "They keep it from sinking."],
  ["A woodpecker’s strong, pointed beak helps it…", "peck into trees for food", ["sip flower nectar", "catch fish in water", "filter tiny food from mud"], "Beaks match the food an animal eats."],
  ["Webbed feet on a duck help it…", "swim", ["climb", "dig", "run in sand"], "They work like paddles."],
  ["An owl’s large eyes and soft feathers help it…", "hunt at night", ["swim fast", "dig tunnels", "stay warm in ice"], "Soft feathers make less noise."],
  ["Camouflage is…", "colours or patterns that help an animal blend in", ["colours that make an animal glow", "being very loud", "moving very fast"], "A hidden animal is harder to see."],
  ["A giraffe’s long neck helps it…", "reach leaves high in trees", ["dig for roots", "swim underwater", "hide in grass"], "Think about its food."],
  ["Fins and streamlined bodies help fish…", "move through water easily", ["fly", "climb trees", "dig tunnels"], "A smooth shape slips through water."],
  ["A frog’s long sticky tongue helps it…", "catch insects", ["swim underwater", "dig in soil", "fly"], "It flicks out quickly."],
  ["Why do different habitats lead to different adaptations?", "each habitat has different challenges, such as temperature and food", ["every habitat has the same food", "animals never need to adapt", "all animals live in water"], "An animal’s body must suit where it lives.", true],
  ["The arctic fox has small ears and the fennec fox of the desert has large ears. Why?", "small ears keep heat in; large ears help release heat", ["large ears keep heat in the desert", "both ears are for flying", "ears do not matter to foxes"], "Think about cold and hot places.", true],
  ["Closely related animals can look different because they…", "live in different environments", ["use the same food", "eat the same plants", "never move"], "Different places need different features.", true],
  ["Which is a reason animals become endangered?", "losing their habitat", ["gaining new habitat", "more space", "cleaner water"], "They need places to live and find food."],
  ["Overhunting can make a species…", "rare or endangered", ["more common", "bigger", "brighter"], "If too many are taken, few are left."],
  ["How can pollution harm animals?", "it can poison their food, water or air", ["it helps them grow", "it makes water clearer", "it gives them vitamins"], "Dirty water and air hurt living things."],
  ["A species that has died out completely is…", "extinct", ["endangered", "adapted", "migratory"], "None are left anywhere."],
  ["How do scientists count animal populations?", "by counting from the ground, from the air or with tracking tools", ["by guessing without looking", "by asking the animals", "by waiting"], "They use careful methods."],
  ["Tracking tags and cameras left in forests help scientists…", "study where animals live and travel", ["feed the animals", "paint the animals", "stop the rain"], "They give clues about animals’ movements."],
  ["Which action helps endangered animals?", "protecting their habitat", ["building over it", "polluting rivers", "hunting more"], "Animals need safe places."],
  ["A wildlife reserve is…", "land protected so animals can live safely", ["a place for building roads", "a shopping area", "a place with no animals"], "People agree to keep it wild."],
  ["Why do breeding programs sometimes raise endangered animals?", "to help the population grow and return some to the wild", ["to sell them", "to keep them away forever", "to stop them from having babies"], "The goal is more animals in the wild.", true],
  ["What is a fossil?", "the preserved remains or print of a living thing from long ago", ["a living plant", "an animal bone from last year", "a hand-made tool"], "Fossils are found in rock."],
  ["How do fossils show animals changing over time?", "newer fossils can look different from older ones", ["all fossils look the same", "fossils are made last year", "fossils show only today’s animals"], "Compare fossils from different ages."],
  ["What do paleontologists study?", "fossils", ["stars", "weather", "tides"], "They learn about life from long ago."],
  ["Which improvement helps paleontologists study fossils today?", "scanners that see inside rock without breaking it", ["blindfolds", "stopwatches", "bigger umbrellas"], "Better tools show more detail.", true],
  ["Animals with helpful features are more likely to survive and have young. This idea is called…", "natural selection", ["seasonal change", "habitat loss", "extinction"], "Nature “selects” helpful features.", true],
  ["Why did the idea of natural selection become widely accepted?", "evidence built up gradually from many observations", ["one person said so", "it was a lucky guess", "it was voted on"], "Scientists test ideas against evidence.", true],
  ["A moth that blends in with tree bark is less likely to be seen by birds, so it is more likely to…", "survive and have young", ["be seen quickly", "lose its wings", "turn into a bird"], "This is natural selection at work.", true],
];

const ELECTRO: Q[] = [
  ["How can you make an electromagnet?", "coil wire around an iron nail and connect it to a battery", ["rub a nail on a rug", "leave a nail in sunlight", "paint a nail"], "Current is needed."],
  ["An electromagnet works only when…", "electric current flows", ["it is cold", "it is dark", "it is wet"], "No current, no magnet."],
  ["What happens to an electromagnet when you disconnect the battery?", "it stops being a magnet", ["it gets stronger", "it turns into a bulb", "it melts"], "The current stops."],
  ["A magnet you can turn on and off is a…", "electromagnet", ["permanent magnet", "compass", "battery"], "Switch the current on or off."],
  ["What is one advantage of an electromagnet over a permanent magnet?", "you can switch it on and off", ["it never needs a power source", "it is always smaller", "it cannot pick up iron"], "Controlling it is useful."],
  ["Which change makes an electromagnet stronger?", "adding more coils of wire", ["using fewer coils", "removing the battery", "using a plastic core"], "More loops mean more magnetic effect."],
  ["Adding another battery to the circuit makes the electromagnet…", "stronger", ["weaker", "switched off", "a permanent magnet"], "More current gives more strength."],
  ["A good core for an electromagnet is…", "an iron nail", ["a plastic straw", "a wooden stick", "a rubber band"], "Iron becomes magnetic near current."],
  ["You test how coils affect strength. What should stay the same?", "the battery, the nail and the wire", ["the number of coils", "nothing at all", "only the colour of the wire"], "A fair test changes only one thing.", true],
  ["In that test, which thing do you change?", "the number of coils", ["the nail’s material", "the battery", "the paper clips’ colour"], "Change just the one factor you are testing.", true],
  ["How could you measure an electromagnet’s strength?", "count how many paper clips it picks up", ["measure its colour", "see how loud it sounds", "weigh the battery"], "More clips means stronger."],
  ["“I think more coils will pick up more paper clips.” This is a…", "prediction", ["result", "safety rule", "circuit symbol"], "It says what you think will happen."],
  ["A doorbell uses an electromagnet to…", "pull a striker that rings the bell", ["heat the door", "light a bulb", "lock the door"], "Switching it on and off makes it move."],
  ["A scrapyard crane uses an electromagnet to…", "lift and drop heavy iron and steel", ["lift wood", "lift plastic", "lift glass"], "Magnets attract iron."],
  ["Electric motors use electromagnets to produce…", "motion", ["rain", "shadows", "snow"], "They make things spin."],
  ["Which device has an electric motor?", "an electric fan", ["a paper clip", "a wooden spoon", "a rock"], "It spins its blades."],
  ["What happens when a magnet moves near a coil of wire?", "an electric current can be made", ["the wire turns to rubber", "nothing can ever happen", "the magnet disappears"], "That is the idea behind generators.", true],
  ["What does a generator do?", "changes motion energy into electrical energy", ["changes light into sound", "stores water", "makes magnets from wood"], "Spin a magnet near coils."],
  ["Generators were invented after scientists learned that…", "magnets can produce electric current", ["wood can conduct", "water is wet", "bulbs are hot"], "Magnetism and electricity are linked.", true],
  ["Which of these can spin a generator’s turbine?", "moving water", ["sitting snow", "bright colours", "quiet music"], "A hydroelectric dam uses this."],
  ["Which source of electricity is renewable?", "wind", ["coal", "natural gas", "oil"], "It will not run out."],
  ["Which source of electricity is nonrenewable?", "coal", ["sunlight", "flowing water", "wind"], "It can run out."],
  ["Why is a source called renewable?", "it can be replaced naturally or does not run out", ["it costs nothing to build", "it is only used in winter", "it comes from old batteries"], "Think of sun and wind."],
  ["Solar panels change sunlight into…", "electricity", ["sound", "snow", "soil"], "They use light to make current."],
  ["Which action helps you use less electricity at home?", "turning off lights in empty rooms", ["leaving the TV on", "opening the fridge for a long time", "leaving all lights on"], "Save what you do not need."],
  ["Why does saving electricity help the environment?", "less pollution from making electricity", ["it makes the wind stronger", "it makes bulbs brighter", "it grows trees at once"], "Making power can cause pollution.", true],
  ["A bulb in a circuit shows which effect of electricity?", "light", ["sound", "motion", "magnetism"], "It glows."],
  ["An electric kettle shows which effect of electricity?", "heat", ["sound", "light", "motion"], "Water gets warm."],
];

const SKY: Q[] = [
  ["What is a constellation?", "a pattern of stars that people have named", ["a type of comet", "a big telescope", "a ring around the Moon"], "People imagine pictures in the stars."],
  ["Which constellation shows a hunter with a belt of three stars?", "Orion", ["Leo", "Ursa Minor", "Cassiopeia"], "Look for three stars in a row."],
  ["Which constellation looks like a “W” or an “M”?", "Cassiopeia", ["Orion", "Leo", "Ursa Major"], "Picture the shape in the sky."],
  ["Which star stays nearly above the North Pole?", "Polaris, the North Star", ["Sirius", "Betelgeuse", "Venus"], "It shows north."],
  ["Polaris is part of which constellation?", "Ursa Minor", ["Orion", "Leo", "Cassiopeia"], "Also called the Little Bear.", true],
  ["The Big Dipper is part of which constellation?", "Ursa Major", ["Orion", "Cassiopeia", "Leo"], "Also called the Great Bear.", true],
  ["How can the Big Dipper help you find the North Star?", "follow the two pointer stars at the end of the bowl", ["follow the handle straight down", "look at the brightest planet", "look for the Moon"], "The pointer stars point toward it.", true],
  ["Which constellation is named after a lion?", "Leo", ["Orion", "Cassiopeia", "Ursa Minor"], "It has a shape like a sickle."],
  ["Which of these is NOT a constellation?", "the Moon", ["Leo", "Orion", "Cassiopeia"], "The Moon travels around Earth."],
  ["How many official constellations do astronomers recognize?", "88", ["12", "30", "365"], "Astronomers divided the whole sky.", true],
  ["The Big Dipper looks most like a…", "pot with a long handle", ["fish hook", "tall tree", "pair of glasses"], "A dipper is a kind of ladle."],
  ["Where do stories about constellations come from?", "people in many cultures told them", ["from computers", "from rocks", "from rain"], "People told these stories for thousands of years."],
  ["Many cultures tell different stories about the same stars. Why?", "people saw different pictures in the pattern", ["the stars are different", "stars disappear when told", "nobody tells stories"], "There is no one right picture.", true],
  ["Many Indigenous Nations have their own stories and names for patterns of stars. What does this show?", "people in many places see the sky in their own ways", ["only one culture studied the sky", "stories must match everywhere", "the sky looks different to everyone"], "Each community’s ideas are its own.", true],
  ["Why do we see different constellations in winter and summer?", "Earth moves around the Sun, so we face different parts of the sky", ["stars switch on and off by season", "the Sun moves closer to the stars", "the Moon blocks them in summer"], "Our night side faces a new direction.", true],
  ["Over one night, stars seem to move across the sky because…", "Earth spins", ["stars march in circles", "the Sun pulls them", "clouds drag them"], "Earth turns once a day."],
  ["How did some cultures use stars for farming?", "they watched for stars that signalled planting and harvest times", ["they shot arrows at stars", "they lit stars with fire", "they sold stars for seeds"], "Stars appear in the same seasons each year."],
  ["A calendar based on the sky helped farmers because…", "seasons come back in a regular pattern", ["stars change daily", "seasons are random", "seasons ended"], "Patterns repeat each year."],
  ["Long ago, how did sailors find their way across oceans at night?", "by using the stars", ["by following fish", "by listening to whales", "by tossing coins"], "The stars show direction."],
  ["Why was Polaris useful to travellers in the north?", "it shows where north is", ["it moves fast around the sky", "it is the Sun", "it is a planet"], "It hardly moves in the sky."],
  ["Traditional Polynesian wayfinders crossed vast stretches of ocean by reading the…", "stars, ocean swells and winds", ["engines and radar", "loud horns", "road signs"], "They paid close attention to nature.", true],
  ["Which print source helps you identify constellations?", "a star chart", ["a recipe book", "a bus schedule", "a phone book"], "It shows star patterns on paper."],
  ["Which electronic source lets you point a device at the sky to name stars?", "a stargazing app", ["a calculator", "a clock radio", "a flashlight"], "It uses a map of the sky."],
  ["Which place lets you see the night sky on a dome at any time of day?", "a planetarium", ["a library", "a bakery", "a gym"], "Lights project the stars on the ceiling."],
  ["How can you often tell a planet from a star?", "planets usually shine steadily and stars twinkle", ["stars shine steadily and planets twinkle", "planets are always red", "stars are always closer"], "Twinkling is more common for stars.", true],
  ["Compared with the stars, planets seem to…", "slowly change position from night to night", ["stay in exactly the same pattern", "blink on and off", "grow smaller each night"], "Planets wander through the star patterns.", true],
  ["The bright “evening star” seen after sunset is really the planet…", "Venus", ["Polaris", "Orion", "Leo"], "It is one of the brightest objects in the sky."],
];

export const peCultureIntro6 = bankUnit({
  id: "pe-culture-intro-6",
  title: "What Is Culture?",
  emoji: "🌍",
  blurb: "Culture, regions and understanding",
  parentNote: "Practises the idea of culture and the role it plays in people’s lives, how the world can be divided into cultural regions, and why understanding other cultures matters.",
  standards: ["6.1.1; 6.1.2; 6.1.3", "what culture is, major cultural regions of the world, and why cross-cultural understanding matters"],
  items: CULTURE,
});

export const peTraditions6 = bankUnit({
  id: "pe-traditions-6",
  title: "Traditions Shape Culture",
  emoji: "🎎",
  blurb: "Traditions in a cultural region",
  parentNote: "Practises how traditions influence the culture of a selected cultural region.",
  standards: ["6.2.1", "how traditions influence the culture of a selected region of the world"],
  items: TRADITIONS,
});

export const peGovernmentCulture6 = bankUnit({
  id: "pe-government-culture-6",
  title: "Government & Culture",
  emoji: "🗳️",
  blurb: "How governments shape culture",
  parentNote: "Practises how government influences the culture of a selected country, for example through laws, language and education.",
  standards: ["6.2.2", "how government influences culture in a selected country"],
  items: GOVERNMENT,
});

export const peHumanRights6 = bankUnit({
  id: "pe-human-rights-6",
  title: "Human Rights Around the World",
  emoji: "🕊️",
  blurb: "Rights, fairness and speaking up",
  parentNote: "Practises what human rights are and looks at selected examples of human rights issues around the world.",
  standards: ["6.3.2", "what human rights are and selected human rights issues around the world"],
  items: RIGHTS,
});

export const peMicrobesArthropods6 = bankUnit({
  id: "pe-microbes-arthropods-6",
  title: "Tiny Living Things",
  emoji: "🔬",
  blurb: "Microorganisms and arthropods",
  parentNote: "Practises how scientists observe and compare common arthropods and microorganisms, how microorganisms meet their needs, and how people protect against unwanted growth at home.",
  standards: ["Life Science: Diversity of Life", "comparing arthropods, how microorganisms live, and protecting food and surfaces from unwanted growth"],
  items: MICROBES,
});

export const peAdaptationsEndangered6 = bankUnit({
  id: "pe-adaptations-endangered-6",
  title: "Adaptations & Endangered Animals",
  emoji: "🦉",
  blurb: "Structure, habitat and survival",
  parentNote: "Practises how an animal’s body suits its environment, how related animals differ in different places, why some animals are endangered and how people study and protect them.",
  standards: ["Life Science: Diversity of Life", "how adaptations suit animals to their environments, and why some animals are endangered"],
  items: ADAPT,
});

export const peElectromagnets6 = bankUnit({
  id: "pe-electromagnets-6",
  title: "Electromagnets & Generators",
  emoji: "🧲",
  blurb: "Magnets, circuits and making electricity",
  parentNote: "Practises the link between electricity and magnetism: how an electromagnet works, what makes it stronger, the devices that use them and how generators make electric current.",
  standards: ["Physical Science: Electricity", "how electromagnets work, what changes their strength, and how generators make electricity"],
  items: ELECTRO,
});

export const peConstellations6 = bankUnit({
  id: "pe-constellations-6",
  title: "Stars & Constellations",
  emoji: "⭐",
  blurb: "Patterns in the night sky",
  parentNote: "Practises identifying constellations and comparing how different cultures have used the stars for planting, navigating and telling stories.",
  standards: ["Earth and Space Science: Space", "identifying constellations and how cultures have used the stars"],
  items: SKY,
});
