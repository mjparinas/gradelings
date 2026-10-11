import { bankUnit, type Q } from "../own";

// Grade 8 science and social studies, Prince Edward Island: Water Systems, and Canadian identity from the 1920s to now.
// The PEI Grade 8 guide is not available, so social studies questions use only well-documented, nationally standard facts
// about Canada since the 1920s that fit each theme. Nothing here is taken from the PEI guide. Indigenous content is light, in the
// present tense for living communities, and needs review by Mi’kmaq partners (for example the Mi’kmaq Confederacy of PEI)
// and the PEI Department of Education before launch.
//
// Sources checked (web search on this build, snippets only):
// The Canadian Encyclopedia, "Canadian Multiculturalism Act" (multiculturalism became official policy 8 October 1971)
// Government of Canada, Truth and Reconciliation Commission Calls to Action (final report 2015, 94 Calls to Action)
// Wikipedia and The Canadian Encyclopedia, "Confederation Bridge" (opened 31 May 1997, 12.9 km)
// Government of Canada / Indigenous Services pages on the National Day for Truth and Reconciliation (federal holiday since 2021)
// Timeline entry for the Canadian Citizenship Act, 1947 (citizenship created; before that, Canadians were British subjects)
// Standard textbook science on the water cycle, groundwater, salinity, currents, waves, tides and coasts
//
// Left out because unverified: exact dates for the Trans-Canada Highway opening and the voting-age change; any detail of
// PEI Grade 8 classroom projects; Mi’kmaw place names beyond Epekwitk; Treaty dates and terms; cost and pier counts of the
// Confederation Bridge (sources disagree).
// Other provinces are not named anywhere in this file.

const WATER: Q[] = [
  ["Most of Earth’s water is found where?", "in the salty oceans", ["in lakes and rivers", "in glaciers and ice caps", "in the air as water vapour"], "Think about how much of Earth’s surface is covered by seas."],
  ["About how much of Earth’s water is fresh water?", "about 3 %", ["about 25 %", "about 50 %", "about 75 %"], "Only a small slice of all the water on Earth is fresh."],
  ["Where is most of Earth’s fresh water stored?", "in glaciers and ice caps", ["in lakes", "in rivers", "in clouds"], "It is frozen, so people cannot easily use it."],
  ["What is evaporation?", "liquid water changing into water vapour", ["water vapour changing into rain", "water soaking into soil", "snow piling up on a mountain"], "The Sun’s heat makes this happen."],
  ["What happens in condensation?", "water vapour cools and becomes tiny droplets", ["rain soaks into the ground", "ice melts into a river", "plants take up water"], "Clouds form this way."],
  ["Rain, snow, sleet and hail are all kinds of…", "precipitation", ["evaporation", "condensation", "transpiration"], "It is water falling from the sky."],
  ["What gives the energy that drives the water cycle?", "the Sun", ["the Moon", "volcanoes", "wind turbines"], "It heats oceans, lakes and land."],
  ["What is transpiration?", "plants giving off water vapour through their leaves", ["rain running into a stream", "ice melting in spring", "water filling an aquifer"], "Plants add water vapour to the air too."],
  ["What is runoff?", "water that flows over land into streams and rivers", ["water that is stored in an ice cap", "water vapour rising from the sea", "water that plants give off"], "Think of rain flowing down a hill."],
  ["What is infiltration?", "water soaking down into soil and rock", ["water turning into vapour", "water freezing in winter", "water flowing over a road"], "It is how groundwater gets refilled."],
  ["What is groundwater?", "water held in soil and rock under the ground", ["water in a river", "water in a cloud", "water in a glacier"], "You reach it by digging a well."],
  ["What is an aquifer?", "a layer of rock or sand that holds and carries groundwater", ["a type of cloud", "a storm over the ocean", "a tool for testing water"], "Wells pump water out of it."],
  ["The water table is…", "the top of the zone where the ground is full of water", ["the tallest tide in a bay", "a kitchen table by a tap", "a chart of rainfall"], "Below it, the spaces in soil and rock are filled with water."],
  ["Where does the water that people on Prince Edward Island drink come from?", "groundwater pumped from wells", ["glacier ice", "seawater", "a very large lake"], "The island has no big lakes or glaciers.", true],
  ["What is a watershed?", "the land area that drains into a river, lake or sea", ["a shed beside a water tank", "the deep part of the ocean", "a cloud full of rain"], "Water from all over the area flows to one place."],
  ["What usually separates one watershed from the next?", "high ground such as a ridge", ["a deep ocean trench", "a layer of clouds", "a well"], "Rain falling on each side runs in a different direction.", true],
  ["Why does pollution in one part of a watershed matter to others?", "water carries it downstream to everyone", ["pollution stays put", "it only harms the sky", "it turns into clean water"], "Water keeps flowing downhill.", true],
  ["What is a glacier?", "a huge mass of ice that moves slowly over land", ["a frozen part of the sea only", "a cold wind", "a fast waterfall"], "It builds up where more snow falls than melts."],
  ["Why could melting land ice raise sea levels?", "the meltwater flows into the oceans", ["ice cannot melt", "oceans soak up water", "meltwater goes into the air"], "Ice sitting on land adds new water when it melts.", true],
  ["How do wetlands help people?", "They filter water and soak up floods", ["They make seawater salty", "They stop all rain", "They dry up rivers"], "Think of a wetland as a big sponge."],
  ["What is an estuary?", "a place where a river meets the sea", ["a hole drilled for a well", "a very high mountain lake", "a layer of underground rock"], "Fresh water and salt water mix there."],
  ["Water that is a mix of fresh and salt is called…", "brackish", ["pure", "distilled", "frozen"], "Estuaries often have this kind of water.", true],
  ["Which choice saves fresh water at home?", "turning off the tap while brushing your teeth", ["leaving a hose running", "taking longer showers", "washing a half load"], "Small habits add up."],
  ["Fertilizer that seeps into groundwater can harm what?", "the quality of drinking water", ["the size of the Moon", "the speed of the wind", "the colour of the sky"], "Chemicals such as nitrates can be carried down with the water.", true],
  ["A pH test tells you whether water is…", "acidic, neutral or basic", ["warm or cold", "moving or still", "heavy or light"], "A pH of 7 is neutral."],
  ["What does a turbidity test measure?", "how cloudy the water is", ["how salty it is", "how cold it is", "how deep it is"], "Mud and tiny particles make water look cloudy."],
  ["Why do fish need dissolved oxygen in the water?", "so they can breathe", ["so they can stay warm", "so they can find salt", "so they can sleep"], "Fish take oxygen from the water through their gills."],
  ["A table shows rain: Mon 4 mm, Tue 0 mm, Wed 9 mm, Thu 2 mm. Which day had the most?", "Wednesday", ["Monday", "Tuesday", "Thursday"], "Look for the biggest number."],
  ["Using the same table (4, 0, 9, 2 mm), how much rain fell in all four days?", "15 mm", ["13 mm", "9 mm", "18 mm"], "Add all four numbers.", true],
  ["Why can’t people drink seawater?", "it has too much salt", ["it is too clean", "it has no water in it", "it is always frozen"], "Salt would dry out the body."],
  ["The water cycle has no true start or end. This means water…", "keeps moving around and around", ["is used up", "stays in the ocean", "only moves in summer"], "Water changes form but is never lost.", true],
];

const OCEANS: Q[] = [
  ["What is salinity?", "how much salt is dissolved in water", ["how warm water is", "how fast water moves", "how deep water is"], "Seawater is salty."],
  ["About how much of seawater is dissolved salt?", "about 3.5 %", ["about 0.35 %", "about 15 %", "about 50 %"], "It is small, but you can taste it.", true],
  ["Which salt is the main one in seawater?", "sodium chloride", ["baking soda", "sugar", "calcium milk"], "It is the same as table salt."],
  ["Which would make surface seawater saltier?", "lots of evaporation in a hot place", ["heavy rain", "a big river flowing in", "melting ice"], "Water leaves as vapour, but salt stays behind.", true],
  ["What are ocean currents?", "large streams of water that move through the ocean", ["tall waves at the shore", "tides at a harbour", "cracks on the ocean floor"], "They flow like rivers in the sea."],
  ["What mainly pushes surface currents?", "wind", ["the Moon", "whales", "boats"], "Steady winds blow across the water."],
  ["The Gulf Stream is a…", "warm current in the Atlantic Ocean", ["cold river on land", "kind of tide", "deep ocean trench"], "It carries warm water northward."],
  ["How do ocean currents affect Earth’s heat?", "they move warm water toward cooler places", ["they make heat disappear", "they only move cold water", "they stop the Sun"], "Heat is carried from the warm tropics toward the poles."],
  ["What does a cold ocean current do to nearby land?", "it can cool the coast", ["it makes deserts", "it makes the land warmer", "it makes tides stop"], "Think of the air blowing over cool water."],
  ["What bends currents as Earth spins?", "the Coriolis effect", ["the Moon’s gravity", "rain", "ocean salt"], "Earth’s rotation turns moving water to one side.", true],
  ["Deep ocean currents are driven mostly by differences in…", "temperature and salinity", ["wind and waves", "tides and rain", "fish and plants"], "Cold, salty water is denser and sinks.", true],
  ["Cold, salty seawater tends to…", "sink", ["rise", "float away as vapour", "stay at the surface"], "It is denser than warm, fresh water."],
  ["What causes most ocean waves?", "wind blowing over the water", ["fish swimming", "the Sun’s heat only", "underground rivers"], "Stronger winds make bigger waves."],
  ["The highest point of a wave is its…", "crest", ["trough", "base", "shore"], "The lowest point is the trough."],
  ["The distance from one wave crest to the next is the…", "wavelength", ["amplitude", "tide", "current"], "Measure from crest to crest.", true],
  ["What are tides?", "the regular rise and fall of sea level", ["waves caused by storms", "currents under the sea", "salt in the water"], "Harbours show them clearly."],
  ["What mainly causes tides?", "the Moon’s gravity pulling on the oceans", ["wind on the surface", "ocean salt", "river water"], "The Sun also helps a little."],
  ["About how many high tides happen at most coasts each day?", "two", ["one", "five", "twelve"], "Think of about every twelve hours."],
  ["Spring tides, the biggest tides, happen when the Sun, Moon and Earth…", "line up", ["are far apart", "are on a flat plane", "are all hidden by clouds"], "It happens at new moon and full moon.", true],
  ["Neap tides, the smallest tides, happen when the Moon is at…", "a quarter phase", ["a full phase", "a new phase", "no phase"], "The Sun and Moon pull at right angles.", true],
  ["What is the continental shelf?", "the shallow sea floor around a continent", ["the deepest ocean trench", "a tall mountain chain on land", "a surface current"], "It slopes gently away from the shore."],
  ["What is an abyssal plain?", "a flat, deep part of the ocean floor", ["a wave crest", "a beach at low tide", "a type of current"], "It lies far from land."],
  ["A mid-ocean ridge is…", "a chain of underwater mountains", ["a deep gorge", "a coral wall", "a tide pool"], "New sea floor forms along it.", true],
  ["An ocean trench is…", "a very deep, narrow valley in the sea floor", ["a shallow bay", "a sandy bar", "a big wave"], "The deepest places in the ocean are trenches."],
  ["Why do places near big bodies of water often have milder weather?", "water heats and cools slowly", ["water makes the Sun hotter", "water blocks all wind", "water has no heat"], "Land warms and cools much faster."],
  ["How does being an island affect Prince Edward Island’s climate?", "the sea keeps temperatures milder than far inland", ["it never snows", "it is always hotter", "it has no wind"], "Water around it warms and cools slowly."],
  ["What is erosion along a coast?", "waves wearing away rock and soil", ["sand piling up in a bay", "seaweed growing on rocks", "tides rising and falling"], "Soft rock wears away faster than hard rock."],
  ["What is deposition on a coast?", "waves dropping sand and mud to build beaches", ["waves wearing cliffs away", "wind cooling the water", "a current changing direction"], "The opposite of erosion.", true],
  ["Why can sandstone cliffs lose land faster than hard granite?", "sandstone is softer, so waves wear it away more easily", ["granite is lighter", "sandstone is always underwater", "granite dissolves in seawater"], "Hard rock resists waves longer.", true],
  ["How do salt marshes help a coast?", "they slow waves and protect the shore", ["they make the water saltier", "they cause storms", "they stop tides"], "Thick plants soak up wave energy."],
  ["Why are tiny plankton so important?", "they are the base of many ocean food chains", ["they cause tides", "they make waves", "they heat the water"], "Small fish eat them, and bigger fish eat the small fish."],
  ["Why is eelgrass useful to young fish?", "it gives them shelter and food", ["it makes the water warm", "it makes the water salty", "it breaks up icebergs"], "Fish hide in the thick green blades."],
  ["Coral reefs mostly grow in…", "warm, shallow ocean water", ["cold deep water", "freshwater lakes", "muddy rivers"], "They need warmth and sunlight."],
  ["What is overfishing?", "catching fish faster than their numbers can recover", ["fishing only in summer", "fishing with a rod", "counting fish"], "Too few fish are left to have young.", true],
  ["How does plastic waste harm ocean life?", "animals can swallow it or get tangled in it", ["it feeds the plankton", "it cleans the water", "it makes tides smaller"], "Plastic breaks apart very slowly."],
  ["How can people use tides in a helpful way?", "to make electricity", ["to make rain", "to make seawater fresh", "to stop waves"], "Moving water can turn a turbine."],
];

const IDENTITY: Q[] = [
  ["What does identity mean?", "the qualities, beliefs and connections that make a person or group who they are", ["a person’s age only", "a kind of map", "a type of law"], "It is about who you are and where you belong."],
  ["What can make up a country’s identity?", "shared values, symbols, history and stories", ["only its weather", "only its size", "only its money"], "Many things add up."],
  ["Which is a well-known symbol of Canada?", "the maple leaf", ["a bald eagle", "a kangaroo", "a palm tree"], "It is on the flag."],
  ["Which animal is a national symbol of Canada?", "the beaver", ["the lion", "the kangaroo", "the eagle"], "It is known for building dams."],
  ["In which year did Canada’s current flag first fly?", "1965", ["1925", "1945", "1985"], "It replaced an older flag in the mid-1960s."],
  ["In which year did “O Canada” become Canada’s official national anthem?", "1980", ["1920", "1950", "2000"], "It was a song long before it was official."],
  ["Laws and Parliament are an example of which kind of root of identity?", "political", ["cultural", "natural", "musical"], "Politics is about government.", true],
  ["Music, stories and food traditions are an example of which kind of root of identity?", "cultural", ["political", "legal", "scientific"], "Culture is the ways people express themselves.", true],
  ["How families, schools and communities live together is an example of which root of identity?", "societal", ["political", "mathematical", "geological"], "Society is how people live in groups."],
  ["Which two languages are Canada’s official languages?", "English and French", ["English and Spanish", "French and Italian", "English and German"], "The Official Languages Act came in 1969."],
  ["In which year did the Official Languages Act make English and French official federally?", "1969", ["1929", "1989", "2009"], "It came in the late 1960s.", true],
  ["What does Canada’s multiculturalism policy of 1971 mean?", "it respects and celebrates many cultures", ["everyone must follow one culture", "newcomers cannot speak their language", "it bans festivals"], "Canada’s diversity is part of its identity."],
  ["Which groups are recognized as Indigenous peoples in Canada’s Constitution?", "First Nations, Inuit and Métis", ["Norse, Basque and Portuguese", "Acadian, Loyalist and Scots", "Celtic, Roman and Greek"], "They are three distinct groups with their own cultures."],
  ["What did the Statute of Westminster of 1931 do for Canada?", "it gave Canada full control over its own laws", ["it made Canada a colony", "it created the flag", "it ended the Second World War"], "Canada grew more independent.", true],
  ["What happened in 1982 when Canada’s Constitution was brought home?", "Canada gained full power to change its own Constitution", ["Canada gave up its Parliament", "Canada became a republic", "Canada changed its name"], "It also added the Charter.", true],
  ["What does the Canadian Charter of Rights and Freedoms do?", "it protects the rights and freedoms of people in Canada", ["it sets school holidays", "it picks the flag", "it sets prices"], "It became part of the Constitution in 1982."],
  ["The CBC was created in 1936 for what purpose?", "to share Canadian radio programs across the country", ["to build highways", "to make paper", "to run railways"], "Radio helped people far apart hear the same stories."],
  ["Which group of painters, who first showed work together in 1920, became known for Canadian landscapes?", "the Group of Seven", ["the Group of Twelve", "the Four Painters", "the Northern Six"], "Their paintings showed the northern wilderness."],
  ["What was the Centennial celebration of 1967?", "Canada’s 100th birthday", ["Canada’s first election", "the end of a war", "the opening of a bridge"], "Expo 67 was held that year."],
  ["What was Canada Day called before 1982?", "Dominion Day", ["Maple Day", "Flag Day", "Confederation Eve"], "It is held on July 1."],
  ["What was Terry Fox’s Marathon of Hope in 1980?", "a run across Canada to raise money for cancer research", ["a boat trip around the island", "a cross-country bike race", "a hockey game"], "He ran on one real leg and one artificial leg."],
  ["Why might two Canadians describe Canadian identity differently?", "their experiences and backgrounds are different", ["only one person is right", "identity never changes", "they live in the same house"], "People see the world from different places."],
  ["Which is the best example of identity changing over time?", "new laws and newcomers adding to what being Canadian means", ["the sun rising each day", "a river staying in its bed", "a coin being the same size"], "Identity grows as a country does.", true],
  ["Which is a primary source about the 1950s?", "a newspaper printed in 1955", ["a book written in 2020", "a website summary", "a movie made last year"], "It was made at the time."],
  ["Why is it useful to compare views of what it means to be Canadian?", "it helps us understand different experiences", ["it shows one view is wrong", "it ends all debates", "it removes symbols"], "People can agree and disagree respectfully."],
  ["The Charlottetown Conference of 1864 is remembered as…", "the start of talks on Confederation", ["the first Canada Day", "the adoption of the flag", "the Charter signing"], "Prince Edward Island is called the birthplace of Confederation.", true],
  ["Canada’s leader in United Nations peacekeeping in the 1950s helped Canada be seen as a…", "peacekeeper", ["conqueror", "colony", "closed country"], "Many Canadians still think of peacekeeping as part of who they are.", true],
  ["Which people have lived on the island of Epekwitk for thousands of years?", "the Mi’kmaq", ["the Norse", "the Romans", "the Aztecs"], "Mi’kmaq communities are on the island today."],
];

const GEOGRAPHY: Q[] = [
  ["Which oceans touch Canada’s coasts?", "the Atlantic, Pacific and Arctic", ["the Indian, Pacific and Southern", "the Atlantic and Indian only", "the Arctic and Southern only"], "There are three."],
  ["Canada is the world’s ___ largest country by area.", "second", ["first", "fifth", "tenth"], "Only one country is bigger."],
  ["Which country has the longest coastline in the world?", "Canada", ["Australia", "Japan", "Brazil"], "It has coasts on three oceans and thousands of islands."],
  ["What is the Canadian Shield?", "a huge area of ancient rock around Hudson Bay", ["a wall along the border", "a mountain range in the west", "a wide grassy plain"], "Many mines are found there.", true],
  ["The Rocky Mountains are found in which part of Canada?", "the west", ["the far east", "the Atlantic coast", "the Arctic islands"], "They run along the western side."],
  ["The Prairies are best known for…", "flat land used to grow wheat and other grains", ["tall mountains", "salt marshes", "ice fields"], "The land is wide and open."],
  ["Where do most people in Canada live?", "within a few hundred kilometres of the southern border", ["in the far north", "on the Arctic islands", "in the middle of the Shield"], "The south has the mildest climate."],
  ["Why do few people live in the far north?", "it has a very cold climate and a short growing season", ["it has no land", "it is too warm", "there are no rivers"], "Farming is hard where winters are long."],
  ["What is permafrost?", "ground that stays frozen all year", ["rain that falls in winter", "a cold ocean wind", "a type of glacier"], "It is found in much of the Arctic."],
  ["What do the Great Lakes and the St. Lawrence River help with?", "ships travelling deep into the continent", ["growing bananas", "stopping all rain", "making deserts"], "They form a shipping route.", true],
  ["Before roads and railways, how did many people travel across the land?", "by canoe on rivers and lakes", ["by subway", "by airplane", "by hot-air balloon"], "Indigenous peoples and fur traders used the waterways."],
  ["The Canadian Pacific Railway was completed in 1885 to…", "link the east and the west", ["bring rain to prairies", "carry only mail", "stop settlers moving"], "Canada’s huge size made travel a challenge.", true],
  ["What does the Confederation Bridge do?", "connects Prince Edward Island to the mainland", ["crosses the Great Lakes", "crosses the Arctic", "joins two cities on the island"], "It opened in 1997."],
  ["In what year did the Confederation Bridge open?", "1997", ["1947", "1967", "2007"], "It opened late in the 1990s.", true],
  ["How long is the Confederation Bridge?", "about 12.9 km", ["about 1.9 km", "about 29 km", "about 129 km"], "It is a long bridge over the Northumberland Strait.", true],
  ["How does Prince Edward Island compare with the other provinces in size?", "it is the smallest", ["it is the largest", "it is the second largest", "it is the middle size"], "It is small but well known."],
  ["Why is the soil on Prince Edward Island red?", "it has iron-rich sandstone and iron oxide", ["it is full of red paint", "it is always burned", "it is made of brick"], "The iron rusts.", true],
  ["Which crop is Prince Edward Island especially known for?", "potatoes", ["bananas", "rice", "coffee beans"], "The red soil is good for it."],
  ["Which jobs have been shaped by Prince Edward Island’s land and sea?", "farming, fishing and tourism", ["gold mining and oil drilling", "volcano research", "desert tours"], "Farms, harbours and beaches make a living."],
  ["What does a map legend show?", "what the symbols and colours on the map mean", ["the date of the map", "how tall the author is", "the weather today"], "It is also called a key."],
  ["What does a map’s scale tell you?", "how map distances compare to real distances", ["which way is north", "what the title is", "where the equator is"], "1 cm on the map may equal many km."],
  ["Lines of latitude run…", "east and west, around the globe", ["north and south", "up and down", "only at the poles"], "They measure distance from the equator.", true],
  ["How many time zones does Canada have?", "six", ["one", "three", "twelve"], "Prince Edward Island is in the Atlantic one."],
  ["How can a place’s climate shape people’s way of life?", "it affects what they grow, wear and do for work", ["it changes the alphabet", "it picks their names", "it does not matter"], "Winter and summer bring different jobs and play."],
  ["Which is an example of regional identity?", "pride in a coastal fishing community", ["a country’s flag", "the Constitution", "a map scale"], "It belongs to one part of the country."],
  ["Which natural resource is important to Canada’s economy?", "forests", ["volcanic glass", "coral", "rubber trees"], "Canada has large forests."],
  ["Why did radio and television matter in a country as big as Canada?", "they helped far-apart people share stories and news", ["they melted ice", "they made winters shorter", "they replaced all farms"], "Distances were large.", true],
  ["How is the Arctic different from Prince Edward Island?", "it has much colder winters and permafrost", ["it has red soil", "it is warmer", "it has potato farms"], "Inuit communities in the Arctic live in this cold landscape."],
  ["Prairie farms and island fishing towns are examples of how…", "land and water shape ways of life", ["maps make weather", "money makes mountains", "time zones make crops"], "Different places give different work.", true],
  ["Which people have lived on the island, Epekwitk, since long before European settlers arrived?", "the Mi’kmaq", ["the Vikings", "the Dutch", "the Persians"], "Mi’kmaq communities are on the island today."],
];

const DECADES: Q[] = [
  ["How many years are in a decade?", "10", ["5", "20", "100"], "Think of the 1920s, the 1930s and so on."],
  ["Which new technology reached many Canadian homes in the 1920s?", "radio", ["smartphones", "televisions", "computers"], "People listened to music and news."],
  ["In 1921, who became the first woman elected to the House of Commons?", "Agnes Macphail", ["Terry Fox", "Lester Pearson", "Jacques Cartier"], "She made history that year.", true],
  ["In 1929, a court decision said that women were…", "“persons” under the law", ["too young to vote", "not allowed to work", "allowed to be soldiers"], "It is called the Persons Case.", true],
  ["What happened to the world’s economy after the stock market crash of 1929?", "the Great Depression began", ["a baby boom began", "a war ended", "television began"], "Many people lost their jobs."],
  ["During the Great Depression, many families…", "struggled to find work and money", ["bought new cars", "moved to the Moon", "got free houses"], "The 1930s were hard years."],
  ["What did the Statute of Westminster of 1931 do?", "it gave Canada full control over its own laws", ["it declared war", "it created medicare", "it set up the CBC"], "Canada became more independent.", true],
  ["In which year did Canada declare war during the Second World War?", "1939", ["1914", "1925", "1945"], "The war began that year in Europe."],
  ["In which year did the Second World War end?", "1945", ["1935", "1955", "1965"], "It was the mid-1940s."],
  ["How did many women help during the Second World War?", "they worked in factories and served in the forces", ["they stayed out of work", "they stopped voting", "they went to sea only"], "Women stepped into many new jobs."],
  ["During the Second World War, Japanese Canadians were treated…", "unfairly, with many forced from their homes", ["fairly and kindly", "as heroes only", "like tourists"], "The government apologized in 1988.", true],
  ["What began in 1947 for people living in Canada?", "Canadian citizenship under the Citizenship Act", ["the Charter", "Canada Day", "the first flag"], "Before that, people were called British subjects.", true],
  ["When did regular television broadcasts begin in Canada?", "in 1952", ["in 1920", "in 1980", "in 2000"], "It was in the early 1950s."],
  ["In 1960, which group won the right to vote federally without giving up their status?", "First Nations people", ["Soldiers", "Teachers", "Newcomers"], "Many had been left out before then.", true],
  ["In 1965, what changed for Canada?", "a new flag with a red maple leaf", ["a new anthem", "a new currency", "a new capital city"], "Some people welcomed it and some wanted the old flag."],
  ["Why did some people in 1965 disagree about the flag?", "some wanted the old flag and others wanted a new one", ["flags were banned", "nobody saw the flag", "the flag was blue"], "People can see one event in different ways.", true],
  ["What was celebrated in 1967?", "Canada’s 100th birthday", ["the Second World War’s end", "the new Constitution", "Canada’s first flag"], "It is the Centennial."],
  ["The Official Languages Act of 1969 said that…", "English and French are official languages in the federal government", ["only English is used", "only French is used", "all languages are banned"], "It affected government services."],
  ["Which policy of 1971 shaped how Canada sees its many cultures?", "multiculturalism", ["isolationism", "rationing", "prohibition"], "Canada said diversity is part of its identity."],
  ["In 1982, the Constitution gained the…", "Charter of Rights and Freedoms", ["Official Flag", "Statute of Westminster", "Persons Case"], "It protects rights."],
  ["The Canada Health Act of 1984 was about…", "public health care for people in Canada", ["highways", "railways", "air travel"], "It sets rules for medicare."],
  ["What new technology changed everyday life in Canada in the 1990s?", "the Internet and personal computers", ["the printing press", "steam trains", "the telegraph"], "More people could get information quickly."],
  ["In 1997, what connected Prince Edward Island to the mainland by road?", "the Confederation Bridge", ["a tunnel", "a ferry", "a railway"], "It crosses the Northumberland Strait."],
  ["In 2008, the government of Canada made an apology to…", "former students of residential schools", ["soldiers", "farmers", "teachers"], "It was part of a move toward reconciliation.", true],
  ["In 2015, the Truth and Reconciliation Commission released…", "94 Calls to Action", ["a new flag", "the Charter", "a new anthem"], "It was about residential schools and reconciliation."],
  ["Which list puts these events in order, oldest first?", "Persons Case, Second World War, flag, Charter", ["Charter, flag, Persons Case, war", "flag, war, Charter, Persons Case", "war, Charter, Persons Case, flag"], "1929, 1939–1945, 1965, 1982."],
  ["Which event came between the flag and the Charter?", "the Official Languages Act of 1969", ["the Great Depression", "the Statute of Westminster", "the Truth and Reconciliation report"], "Look for a year after 1965 and before 1982.", true],
  ["Which stayed the same from the 1920s to now?", "people vote for Members of Parliament", ["the flag", "the Charter", "the Internet"], "Canada is still a parliamentary democracy."],
  ["Which is a cause of the Great Depression’s hardship?", "the stock market crash and loss of jobs", ["the arrival of television", "the Charter", "the flag debate"], "Think of 1929 and the years after."],
  ["Which is a secondary source about the 1930s?", "a textbook written last year", ["a letter from 1932", "a photo from 1935", "a 1938 newspaper"], "It was written later by someone studying the past."],
];

const CITIZENSHIP: Q[] = [
  ["What is a citizen?", "a person who legally belongs to a country and has rights and responsibilities", ["a visitor on a short trip", "a person who lives alone", "a leader of a city"], "Citizens belong to a country in a legal way."],
  ["How can a person become a Canadian citizen?", "by being born in Canada or by applying and taking the oath", ["by buying a flag", "by paying for a passport only", "by living in a hotel"], "Newcomers can take part in a ceremony."],
  ["What does a new citizen do at a citizenship ceremony?", "takes an oath or makes an affirmation", ["buys a house", "plays a game", "joins an army"], "They promise to follow the laws."],
  ["Which is a right of Canadian citizens aged 18 and over?", "voting in federal elections", ["ignoring the law", "skipping school", "choosing the weather"], "Voting is a way to have a say."],
  ["Which is a responsibility of citizens?", "obeying the law", ["breaking the law", "ignoring others", "avoiding all rules"], "Laws keep people safe."],
  ["Which is another responsibility of citizens?", "paying taxes", ["avoiding voting", "refusing any duty", "skipping school"], "Taxes help pay for roads, schools and health care."],
  ["If called, citizens may have to serve on…", "a jury", ["a space mission", "a ship", "a parade float"], "Juries help decide court cases."],
  ["Which is a freedom protected by the Charter?", "freedom of expression", ["freedom from homework", "freedom from weather", "freedom to ignore laws"], "People can share their ideas."],
  ["Which is another Charter freedom?", "freedom of peaceful assembly", ["freedom to cause harm", "freedom from taxes", "freedom to ignore signs"], "People can gather in a peaceful way."],
  ["What are mobility rights?", "the right of citizens to live and work anywhere in Canada", ["the right to ride free", "the right to fly anywhere", "the right to skip school"], "The Charter protects them.", true],
  ["What do equality rights say?", "every person is equal before and under the law", ["only adults have rights", "some groups have no rights", "laws apply to a few"], "Fairness matters.", true],
  ["What is a democracy?", "a country where people choose their leaders by voting", ["a country with one ruler", "a country with no laws", "a country with no schools"], "Citizens have a say."],
  ["Who makes federal laws in Canada?", "Parliament", ["a school board", "a hockey team", "a mayor"], "It includes the House of Commons and the Senate."],
  ["What does a Member of Parliament do?", "represents the people of a riding", ["runs a school", "builds roads", "picks the weather"], "They are elected."],
  ["Why is a secret ballot important?", "people can vote freely without pressure", ["it saves paper", "it makes voting longer", "it picks the winner early"], "Nobody can see how you voted.", true],
  ["Which is a way to take part in your community?", "volunteering", ["staying home", "ignoring neighbours", "avoiding school"], "You can help at a food bank."],
  ["Which action is a good way for youth to take action?", "writing a letter to a councillor", ["ignoring problems", "waiting for others", "avoiding meetings"], "Young people can share their ideas.", true],
  ["Who makes decisions about local parks and roads?", "the municipal council", ["Parliament", "the Senate", "the Supreme Court"], "Councils work close to home."],
  ["Before 1947, people in Canada were officially called…", "British subjects", ["citizens of the world", "Dominion members", "mayors"], "The Citizenship Act changed this.", true],
  ["How did citizenship ideas change when First Nations people got the vote in 1960?", "more people could vote federally", ["fewer people could vote", "voting was banned", "nothing changed"], "It made citizenship more inclusive.", true],
  ["What does the Charter say about Canada’s official languages?", "citizens can get federal services in English or French", ["services only in English", "services only in French", "no services at all"], "Both languages have status."],
  ["What does inclusion mean?", "making sure everyone can take part", ["leaving some people out", "following only one view", "avoiding new people"], "Everyone belongs."],
  ["Why is diversity part of Canadian identity?", "people come from many backgrounds and cultures", ["everyone is the same", "there is only one language", "everyone lives in one place"], "Canada’s multiculturalism policy came in 1971."],
  ["What is reconciliation?", "building respectful relationships between Indigenous peoples and others", ["forgetting the past", "ending all treaties", "building a new road"], "It means listening and learning."],
  ["What is September 30 in Canada?", "the National Day for Truth and Reconciliation", ["Canada Day", "Flag Day", "Labour Day"], "It became a federal holiday in 2021.", true],
  ["Which action shows you are an informed voter?", "reading from several sources before voting", ["voting without looking", "asking only one friend", "never checking facts"], "Good choices need good information."],
  ["Which action shows inclusion at school?", "inviting someone new to join your game", ["leaving someone out", "teasing a classmate", "ignoring a new student"], "Everyone should feel welcome."],
  ["A treaty is…", "an agreement between nations or governments", ["a type of tree", "a school rule", "a kind of map"], "Indigenous nations and the Crown have made many treaties.", true],
  ["Which document does a Canadian citizen use to travel abroad?", "a passport", ["a library card", "a report card", "a lunch menu"], "Citizens can apply for one."],
];

export const peWaterOnEarth8 = bankUnit({
  id: "pe-water-on-earth-8",
  title: "Water on Earth",
  emoji: "💧",
  blurb: "Where water is and how it moves",
  parentNote: "Practises where water is found on Earth, how it moves through the water cycle and watersheds, and how people use and protect it.",
  standards: ["Water Systems", "where water is found on Earth, the water cycle, watersheds and groundwater"],
  items: WATER,
});

export const peOceansClimate8 = bankUnit({
  id: "pe-oceans-climate-8",
  title: "Oceans, Currents & Climate",
  emoji: "🌊",
  blurb: "Salt water, waves and weather",
  parentNote: "Practises features of the ocean, such as salinity, currents, waves and tides, and how oceans and large bodies of water affect climate and shape coastlines.",
  standards: ["Water Systems", "ocean features, currents, tides and how water affects climate and coastlines"],
  items: OCEANS,
});

export const peCanadianIdentity8 = bankUnit({
  id: "pe-canadian-identity-8",
  title: "What Is Canadian Identity?",
  emoji: "🍁",
  blurb: "Roots of who we are",
  parentNote: "Practises the idea of Canadian identity and its cultural, political and societal roots from the 1920s to present-day Canada.",
  standards: ["Canadian identity", "the idea of Canadian identity and its cultural, political and societal roots from the 1920s to now"],
  items: IDENTITY,
});

export const peGeographicInfluences8 = bankUnit({
  id: "pe-geographic-influences-8",
  title: "Land & Identity",
  emoji: "🗺️",
  blurb: "How geography shapes who we are",
  parentNote: "Practises how geography has influenced Canadian identity, using maps and geographic thinking.",
  standards: ["Geographic influences", "how geographic influences have shaped Canadian identity"],
  items: GEOGRAPHY,
});

export const peDecadesOfChange8 = bankUnit({
  id: "pe-decades-of-change-8",
  title: "Decades of Change",
  emoji: "📅",
  blurb: "From the 1920s to today",
  parentNote: "Practises how events and changes in the decades from the 1920s to present-day Canada have shaped Canadian identity.",
  standards: ["Decades of change", "how changes in the decades since the 1920s have shaped Canadian identity"],
  items: DECADES,
});

export const peCitizenship8 = bankUnit({
  id: "pe-citizenship-8",
  title: "Citizenship & Identity",
  emoji: "🧭",
  blurb: "Rights, responsibilities and belonging",
  parentNote: "Practises how citizenship connects to Canadian identity, including rights, responsibilities and taking part in society.",
  standards: ["Citizenship", "how citizenship is part of Canadian identity"],
  items: CITIZENSHIP,
});
