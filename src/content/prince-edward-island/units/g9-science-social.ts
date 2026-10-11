import { bankUnit, type Q } from "../own";

// Grade 9 science and social studies, Prince Edward Island: sustainability of ecosystems, what good science looks like,
// and the Grade 9 social studies "Global Connections" units (geographic thinking, geographical information, settlement
// patterns, sustainability, globalization, global citizenship and social action). Indigenous content is light, and
// needs review by Mi’kmaq partners (for example the Mi’kmaq Confederacy of PEI) and the PEI Department of Education
// before launch.
//
// Sources checked:
// PEI Department of Education and Lifelong Learning, Grade 9 Social Studies curriculum guide (9SOCA, Sept 2025):
//   outcomes DT1 to DT4 and SCO1 to SCO13, the four concepts of geographic thinking, and the elaborations
// PEI Intermediate Program of Studies (science): biodiversity and sustainability of ecosystems; nature of science
// United Nations, Universal Declaration of Human Rights (adopted by the UN General Assembly in 1948) (un.org)
// Natural Resources Canada, energy and climate change basics (natural-resources.canada.ca)
// Standard textbook facts for geography (latitude and longitude, map scale and legends, population density,
//   river-valley settlement) and for science (greenhouse effect, renewable and fossil energy, fair tests)
//
// Left out because unverified: specific Prince Edward Island population or emissions figures, dates of PEI
// energy projects, and any statistic about named countries. Questions use made-up numbers in clearly labelled
// examples instead.

const SUSTAINABLE_ECOSYSTEMS: Q[] = [
  ["What does sustainability mean?", "meeting today’s needs without stopping future generations from meeting theirs", ["using resources as quickly as possible, whatever the cost", "never using any natural resource at any time", "protecting only the animals that people like most"], "It is about making things last for the future too."],
  ["What is biodiversity?", "the variety of living things in an ecosystem", ["the number of people living in a large city", "the total amount of rain that falls in a year", "the size and height of a forest in one place"], "Bio means life; diversity means variety."],
  ["Which change is a main cause of biodiversity loss?", "habitat destruction", ["more sunshine in spring", "cleaner rivers", "more places for wildlife to live"], "Living things need a place with food, water and shelter."],
  ["A wetland is drained to build a parking lot. What happens to the wetland species?", "They lose their habitat", ["They all move into the parking lot", "They become more numerous", "Nothing changes for them"], "Think about where they used to find food and shelter."],
  ["Which gas is added to the air when we burn fossil fuels?", "carbon dioxide", ["helium", "argon", "neon"], "It is also the gas we breathe out."],
  ["What is the greenhouse effect?", "Gases in the air trap heat near Earth", ["Plants grow in glass buildings", "The Sun moves closer to Earth", "Oceans freeze in winter"], "The gases act a bit like a blanket around the planet."],
  ["Which of these is a greenhouse gas?", "methane", ["oxygen", "nitrogen", "hydrogen"], "It comes from places like landfills and cattle farming."],
  ["Which of these is a fossil fuel?", "coal", ["wind", "sunlight", "flowing water"], "Fossil fuels formed from ancient living things."],
  ["Which of these is a renewable energy source?", "wind", ["coal", "natural gas", "oil"], "Renewable sources are naturally replaced quickly."],
  ["Why is solar energy called renewable?", "The Sun keeps shining every day", ["It is free to build panels", "It works only in summer", "It is stored in the ground"], "Think about what gets used up and what does not."],
  ["Why might burning fossil fuels harm ecosystems over time?", "It adds greenhouse gases that warm the climate", ["It makes the Sun burn more brightly", "It adds extra oxygen to the oceans", "It makes soil richer in every region"], "Warming changes the places where species can live.", true],
  ["As ocean water warms, sea levels can rise partly because…", "water expands as it warms and ice on land melts", ["tides stop moving and coasts get bigger", "fish disappear from every ocean of the world", "the air becomes much colder over the land"], "Two things add to the volume of the oceans."],
  ["Sea level rise is a concern for coastal communities because…", "low land can be flooded and eroded", ["tides stop completely", "fish disappear everywhere", "the air gets colder"], "Think of land that sits just above the water.", true],
  ["What is an invasive species?", "a non-native species that spreads and harms the ecosystem", ["a native species that has become very rare", "any animal that lives in a city or a town", "a plant that people grow in a home garden"], "It arrives from somewhere else and has few natural controls."],
  ["Why can a growing human population put pressure on ecosystems?", "More people use more land, water and resources", ["People stop eating food altogether", "Animals move into cities and take over", "Resources grow back faster than people use them"], "Everyone needs food, water and space."],
  ["Which choice reduces the amount of waste going to landfill?", "recycling and composting", ["buying more disposable items", "burning garbage in the open", "dumping garbage in streams"], "Reuse the materials instead of throwing them out."],
  ["Which of these is a benefit of switching from fossil fuels to wind power?", "It produces electricity without adding carbon dioxide", ["It works even when there is no wind at all", "It needs no materials of any kind to build", "It has no effect on any wildlife in the area"], "The benefit is in what comes out when the turbine runs."],
  ["Wind turbines have a risk as well as benefits. Which is a risk?", "Birds and bats can be harmed if turbines are badly placed", ["They add carbon dioxide to the air as they spin", "They only run when coal is burned inside them", "They make the rain stop falling in the area"], "Weighing risks is part of a good decision."],
  ["A graph shows average global temperature rising over 100 years. What does this show?", "a warming trend", ["a cooling trend", "no change", "a random pattern with no direction"], "Look at which way the line is going over time."],
  ["Which is the best evidence that climate is changing?", "many years of measurements from around the world", ["one cold day during the winter season", "a story told by one neighbour", "a guess about what next year will be like"], "Climate is the pattern over a long time.", true],
  ["One very cold week happens. Does this prove climate change is not happening?", "No, climate is the long-term pattern, not one week", ["Yes, because cold means no warming", "Yes, because weather and climate are the same", "No, because it never gets cold"], "Compare weather over a few days with climate over decades.", true],
  ["Why is a mix of solutions often better than one single fix?", "Different problems and places need different tools", ["One single fix always solves every issue everywhere", "Mixing solutions makes every plan fail", "Governments only allow a single plan at a time"], "A single answer rarely fits every situation.", true],
  ["A town considers building a dam for clean electricity. Which question helps weigh the decision?", "How will the dam affect the river’s fish and the people downstream?", ["What colour will the dam be when it is finished?", "Who has a cousin that works at the dam site?", "How many people at the meeting like the idea?"], "Look for effects on the ecosystem and on people.", true],
  ["Which action is something an individual can do to reduce their carbon footprint?", "walk, bike or take the bus instead of driving alone", ["leave the lights on in every room all day", "buy more packaged goods than we need", "let a car idle for an hour before leaving"], "Think of ways to burn less fuel."],
  ["Which action is best done by a community or government rather than one person?", "building a public transit system", ["turning off a bedroom light", "bringing a reusable bottle", "sorting your own recycling"], "It needs planning and money from many people."],
  ["A bar graph shows a species’ population falling every year. What is a sensible next step?", "investigate what is changing its habitat", ["decide that it does not matter very much", "ignore the data and wait and see", "assume the graph must be wrong"], "Use evidence to find the cause.", true],
  ["What is a keystone species?", "a species with a large effect on its ecosystem compared with its numbers", ["the most common species in a habitat", "a species that lives only in the mountains", "a species that people use for food and clothing"], "If it disappears, many other species can be affected.", true],
  ["When a food web loses one species, what can happen?", "Other species that depended on it may also decline", ["Every other species in the web grows larger", "Nothing in the web is connected, so nothing changes", "The energy from the Sun to the web stops"], "Living things are linked by what they eat."],
];

const GOOD_SCIENCE: Q[] = [
  ["Which question can science answer?", "How fast does a plant grow in different light?", ["Which colour is the most beautiful?", "Is it wrong to be late?", "What is the best pizza?"], "A scientific question can be tested with observations or measurements."],
  ["What makes a claim testable?", "We can collect evidence that could show it is wrong", ["Many people believe it, so it must be true", "It sounds exciting when it is said aloud", "It was said by someone who is famous"], "A testable idea can be checked against evidence."],
  ["Which statement is an observation?", "The ice melted in 10 minutes.", ["Ice is the best thing in summer.", "Ice probably has feelings.", "Cold things are always better."], "An observation is something you can see or measure."],
  ["What is a hypothesis?", "a testable idea that explains something", ["a finished experiment", "a type of graph", "a final answer that cannot change"], "It is a possible explanation you can test."],
  ["In a fair test, how many variables do you change at a time?", "one", ["all of them", "none", "as many as possible"], "If you change many things, you will not know which one mattered."],
  ["In a fair test, what is the variable you change on purpose called?", "the independent variable", ["the dependent variable", "the control", "the conclusion"], "It is the one you decide to change."],
  ["What is the dependent variable?", "what you measure to see the effect", ["what you keep the same in every trial", "what you change on purpose", "what you guess before the test starts"], "It depends on the change you made."],
  ["What is the purpose of a control group?", "to compare against the group that receives the change", ["to make the test shorter and cheaper", "to guarantee the hypothesis is right", "to hide the results from other people"], "It shows what happens when nothing is changed."],
  ["Why do scientists repeat their tests?", "to check that the results are reliable", ["to make the test longer", "to find a result they like", "because one test is never allowed"], "A result that happens again is easier to trust.", true],
  ["Which is a sign of pseudoscience?", "It makes big claims but avoids being tested", ["It shares its data openly", "It changes when new evidence appears", "It is checked by other scientists"], "Pseudoscience looks like science but skips the testing."],
  ["An ad says, “Scientists say this bracelet balances your energy.” No study is named. What should you do?", "ask for the evidence and who did the study", ["buy it right away without asking questions", "assume it must work because the ad says so", "tell friends it is proven to work"], "Look for real data, not just a claim."],
  ["Which is the strongest evidence for a health product?", "a well-designed test with many people and a comparison group", ["one happy customer who liked the product", "an advertisement featuring a celebrity", "a package with a nice, shiny design"], "Good evidence comes from fair, repeated tests.", true],
  ["A friend says, “My cousin used it and got better, so it works.” Why is this weak evidence?", "It is a single story and other things may have helped", ["Stories are always false and must be thrown out", "Cousins cannot be trusted to tell the truth", "It was never shown on television"], "One case does not rule out other explanations.", true],
  ["What is peer review?", "other experts check a scientist’s work before it is published", ["a friend reads your homework and gives advice", "a poll that asks the public what they think", "a special type of experiment with plants"], "Experts look for mistakes and weak reasoning."],
  ["When new evidence disagrees with an accepted idea, what do scientists do?", "test it and change the idea if the evidence holds up", ["ignore the new evidence and carry on as before", "hide the results so no one finds out", "decide the new evidence must be wrong"], "Science changes when evidence changes."],
  ["Which statement shows a scientific attitude?", "I could be wrong, so let’s test it.", ["I already know the answer.", "That doesn’t matter to me.", "Only my idea is correct."], "Good scientists stay curious and open to change."],
  ["What does bias mean in an experiment?", "an unfair leaning that can affect the results", ["a very accurate measurement from a good tool", "a particular type of graph for tests", "a reliable and well-calibrated instrument"], "It can happen when a person only wants one result."],
  ["Why should the same ruler be used for all measurements in a test?", "so the measurements can be compared fairly", ["so the ruler stays clean and in good shape", "because rulers never wear out or change", "so the whole test finishes sooner than planned"], "Keep the tools consistent."],
  ["A student tests plant growth, giving one plant sun and another plant less water. What is wrong?", "Two things were changed, so the result is unclear", ["Too many plants were used in the test", "Plants cannot be used in any test at all", "The plants were all in good health"], "Change one variable at a time.", true],
  ["Which is a correlation that does not show a cause?", "Ice cream sales and sunburns both go up in summer", ["Heating a pot of water causes the water to boil", "Dropping a ball makes it fall to the floor", "Pushing a cart makes the cart start to move"], "Something else (hot sunny weather) explains both.", true],
  ["Why is a theory not “just a guess” in science?", "It is a well-tested explanation supported by lots of evidence", ["It has never been tested by anyone", "It is only a personal opinion about nature", "It is exactly the same thing as a hypothesis"], "Scientific theories explain many observations.", true],
  ["Which source is the most reliable for scientific information?", "a report from a university or science agency", ["a post from an account with no name", "an advertisement for a product", "a rumour that was passed along at school"], "Check who made it and how they know."],
  ["Before using science to solve a problem, which question should we ask?", "What effects might this have on people and the environment?", ["Will it be the fastest option, no matter what happens?", "Who can be blamed if it fails?", "Can we avoid testing it before we use it?"], "Think about both benefits and risks."],
  ["Which is a limit of science?", "It cannot decide questions about what is right or wrong", ["It cannot measure anything in the natural world", "It can never change, whatever the evidence says", "It cannot be tested or checked by anyone"], "Values and ethics need more than data.", true],
  ["A headline says a food “cures” a disease based on one small study. What is a sensible response?", "wait for more studies that confirm it", ["accept it as proven", "reject all science forever", "tell everyone it is a cure"], "One small study is a start, not a proof.", true],
  ["Which graph feature can make a result look more dramatic than it is?", "a y-axis that starts well above zero", ["a labelled axis", "a clear title", "equal spacing on the scale"], "Check where the scale begins.", true],
  ["What is the difference between an opinion and evidence?", "Evidence can be measured or observed, an opinion is a personal view", ["An opinion is always right, so it is the best evidence", "Evidence is found only in old books", "They are exactly the same thing, with different names"], "Opinions can differ; evidence can be checked."],
];

const GEOGRAPHIC_THINKING: Q[] = [
  ["Which is a physical feature of a place?", "a river", ["a bridge", "a school", "a highway"], "Physical features are natural, not built by people."],
  ["Which is a human feature of a place?", "a highway", ["a hill", "a lake", "a beach"], "Human features are built or created by people."],
  ["A bridge links an island to the mainland. What is the bridge?", "a human feature that changes how people travel", ["a natural landform made by water and wind", "a type of climate found near the coast", "a weather event that happens in the spring"], "People built it and it changed how places are connected."],
  ["A harbour with deep water makes a city a busy port. Which is the physical feature?", "the deep water", ["the shipping company", "the customs rules", "the warehouse"], "It is natural, not built."],
  ["Spatial significance asks…", "why a place matters because of where it is and what it is like", ["how old a person is when they move to a place", "how much something costs in a store", "who wrote a particular book about a place"], "Location and features both matter."],
  ["Why might a mountain pass be a significant place?", "It is one of the few easy ways across the mountains", ["It is cold at night in the mountains", "It has a nice and memorable name", "It is far away from the sea"], "Think about movement and access."],
  ["Which is an example of a human activity changing the environment?", "cutting down a forest for farmland", ["a volcano erupting", "a river changing course in a flood", "a storm knocking down trees"], "The cause here is people, not nature."],
  ["Which is a natural event that changes the environment?", "a flood", ["a new highway", "a farm", "a fence"], "Natural events happen without human action."],
  ["A drought causes crops to fail. What is the effect on people?", "Food becomes scarcer and prices may rise", ["Farmers earn more with no crops", "Nothing changes for people", "Rain becomes more regular"], "Think about what happens to food supply.", true],
  ["Cause and effect: heavy rain washes soil into a river. What is an effect?", "The water becomes muddy and fish habitat changes", ["The river becomes shorter and runs straight", "The rain stops and the soil becomes dry", "The soil becomes drier and harder in the field"], "Trace what happens next downstream.", true],
  ["Continuity means…", "something stays the same over time", ["something changes quickly", "something disappears", "something is new"], "Think of the word continue."],
  ["Which is an example of continuity in a coastal community?", "Fishing is still done there as it was long ago", ["A new factory opens on the edge of town", "A new road is built through the village", "A hotel replaces a farm by the water"], "Look for what has stayed the same."],
  ["Which is an example of change in a community?", "A farm field becomes a new neighbourhood", ["A river still flows to the sea", "A hill stays where it is", "The tide still rises and falls"], "Look for something that is different now."],
  ["Which source helps show how a place changed over time?", "old and new photographs of the same location", ["a weather report for tomorrow’s forecast", "a recipe for dinner from a cookbook", "a map showing the surface of another planet"], "Compare then and now.", true],
  ["An issue has environmental, economic, political and social implications. What does implications mean?", "likely results or effects", ["old stories", "building plans", "measurements"], "It is about what might follow."],
  ["A new mine creates jobs but may pollute a river. Which implication is economic?", "new jobs for workers", ["harm to fish", "debate in government", "worry among neighbours"], "Economic means money, work and trade.", true],
  ["In that same case, which implication is environmental?", "the river could be polluted", ["workers earn wages", "a politician makes a speech", "neighbours disagree"], "Environmental means effects on nature."],
  ["A new mine is approved by a government committee. This is mostly a…", "political decision", ["natural event", "physical feature", "weather pattern"], "It is about power and decision making.", true],
  ["A town’s residents hold a meeting to share their worries. Which kind of implication is this mainly?", "social", ["economic", "environmental", "geological"], "It involves people and community life."],
  ["Which of these best compares two places?", "Both have farms, but one is on flat land and one is hilly", ["One place is bigger than I would like it to be", "I prefer the first place to the second", "Neither place exists on any map"], "A comparison names a similarity and a difference."],
  ["Which statement is supported by evidence?", "The town is on the coast because its map shows it touching the sea", ["The town is probably a nice place to live", "Everyone who goes there loves the town", "The town is better than the others nearby"], "Look for a claim backed by something you can see.", true],
  ["What makes a geographic claim strong?", "It is backed by maps, data or observations", ["It is repeated loudly", "It matches what I wish were true", "It is short"], "Back a claim with evidence.", true],
  ["Interrelationships means…", "connections between people, places and the environment", ["the oldest places on a map of the world", "the number of lakes in a region", "the colours that are used on a map"], "Things in a system affect each other.", true],
  ["Geographic perspective asks us to…", "consider the different points of view of people affected by an issue", ["only consider the one opinion that you like best", "ignore the environment and only look at money", "avoid facts and just pick a side to be on"], "Different interest holders see an issue differently.", true],
  ["Patterns and trends: what is a trend?", "a change over a period of time", ["a single place on the map of a region", "one measurement taken on one day", "a particular type of map or chart"], "Think of data over many years."],
  ["Farmland near a growing city is slowly turned into housing. What does this show?", "a change in land use over time", ["a stable landscape", "a physical feature", "a natural disaster"], "Compare how the same land was used before and after.", true],
  ["A place has hot summers and cold winters year after year. This is an example of…", "a climate pattern", ["a one-time event", "a human feature", "a map scale"], "Patterns repeat."],
  ["Two places face the same flood risk. One has strong dikes and one does not. Which explanation fits?", "Human choices can change how an environmental event affects people", ["Floods affect everyone in exactly the same way", "Dikes are the cause of floods in the first place", "Planning has no effect on what happens to people"], "People can reduce harm with planning.", true],
];

const GEOGRAPHIC_INFORMATION: Q[] = [
  ["What does a map legend (key) show?", "what the symbols and colours on the map mean", ["who made the map and in which year it was made", "how old the map is and where it was printed", "the weather forecast for today in the region"], "Look at it before reading the map."],
  ["A map scale of 1 cm to 10 km means…", "1 cm on the map is 10 km on the ground", ["10 cm on the map is 1 km on the ground", "the map is exactly 10 km wide", "the map is exactly 1 cm wide on paper"], "The scale shows how distance is shrunk."],
  ["Two points are 3 cm apart on a map with scale 1 cm = 5 km. What is the real distance?", "15 km", ["8 km", "2 km", "35 km"], "Multiply 3 by 5.", true],
  ["Two towns are 40 km apart. On a map with scale 1 cm = 10 km, how far apart are they on the map?", "4 cm", ["400 cm", "30 cm", "50 cm"], "Divide 40 by 10.", true],
  ["What is a compass rose?", "a symbol that shows directions on a map", ["a flower drawn on the corner of the map", "a special kind of map scale", "the title at the top of a map"], "It points north, south, east and west."],
  ["Latitude lines run…", "east-west and measure distance north or south of the equator", ["north-south and measure distance east or west of the prime meridian", "in circles around the poles only", "diagonally from one corner of the map to the other"], "They are the “ladder” lines (parallels).", true],
  ["Longitude lines run…", "north-south and measure distance east or west of the prime meridian", ["east-west and measure distance north or south of the equator", "in circles around the equator only", "only through oceans and never over the land"], "They meet at the poles."],
  ["What is the latitude of the equator?", "0°", ["90° N", "45° N", "180°"], "It is the starting line for measuring latitude."],
  ["What is the latitude of the North Pole?", "90° N", ["0°", "45° N", "90° S"], "It is at the top of the world."],
  ["The prime meridian is the line of…", "0° longitude", ["0° latitude", "90° longitude", "180° latitude"], "It runs through Greenwich in England."],
  ["A place is at 46° N, 63° W. What does N tell us?", "It is north of the equator", ["It is on the prime meridian", "It is south of the equator", "It is at the North Pole"], "The letter shows the direction from the starting line."],
  ["Which map would best show where in Canada people speak different languages?", "a thematic map", ["a road map", "a map of the stars", "a floor plan"], "A thematic map shows one topic or theme."],
  ["A map uses darker colours for areas with more people. This is a…", "choropleth map", ["road map", "relief map only", "pictorial map"], "Shading shows the amount of something.", true],
  ["A topographic map is mostly used to show…", "the shape of the land (elevation)", ["voting results in each town", "trade routes between countries", "the languages that are spoken in each region"], "Contour lines show hills and valleys."],
  ["On a topographic map, contour lines that are very close together show…", "a steep slope", ["a flat plain", "a lake", "a road"], "Close lines mean the height changes quickly."],
  ["Which tool would best show how a town’s population changed over 50 years?", "a line graph", ["a compass", "a globe", "a photograph of the sky"], "Lines show change over time.", true],
  ["Which graph best compares the populations of five towns at one time?", "a bar graph", ["a line graph over decades", "a pictograph of the weather", "a map of the Moon"], "Bars are easy to compare side by side.", true],
  ["What does a pie chart show best?", "parts of a whole", ["change over time", "distance between towns", "elevation"], "Think of slices of a whole."],
  ["A table shows rainfall in five months. What can you find from it?", "which month had the most rain", ["the shape of the coast", "where the equator is", "who lives in the area"], "Scan the numbers for the largest."],
  ["Which source of geographic data is generally most reliable?", "a national statistics agency", ["a rumour online", "an advertisement", "a posted guess"], "Reliable data has a known, trusted source."],
  ["GPS helps geographers by…", "finding exact locations using satellites", ["predicting the weather ten days from now", "drawing pictures of the land by hand", "measuring sound travelling through the ground"], "Satellites help your device know where it is."],
  ["Satellite images are useful for…", "seeing changes in land cover over time", ["reading a long book out loud to a class", "measuring a person’s heartbeat from space", "counting the words in a newspaper"], "They show Earth from above.", true],
  ["A graph’s y-axis starts at 50 instead of 0, making a small change look huge. This is…", "a misleading graph", ["a good practice", "a scale on a map", "a legend"], "Check where the scale starts.", true],
  ["A map omits its legend. What is the problem?", "You cannot be sure what the symbols mean", ["The map has too many colours to read", "The map will not print on a regular printer", "North is no longer north on the map"], "Without the key, symbols can be misread."],
  ["Which would be a good title for a graph?", "Average monthly rainfall, 2020 to 2024", ["Rain, rain, rain", "Graph 1 of the data", "Stuff and numbers about places"], "A good title says what, where and when.", true],
  ["You want to report on how a harbour town has grown. Which is the best way to communicate findings?", "a short report with a map, a graph and a few sentences", ["only one long paragraph with no pictures", "a single number given with no context", "a drawing that has no labels or title"], "Combine tools to tell the whole story.", true],
  ["What is the best first step when reading a graph?", "read the title and the labels on both axes", ["guess the answer from the colours", "look only at the shape of the line", "skip to the end and read the last number"], "Know what is being measured."],
  ["Which tool is best for finding the shortest route between two towns?", "a road map", ["a pie chart", "a climate graph", "a timeline"], "Match the tool to the question."],
];

const SETTLEMENT_PATTERNS: Q[] = [
  ["Which is a natural factor that influences where people settle?", "a source of fresh water", ["a new shopping mall", "a government policy", "a bus line"], "Natural factors come from the land, water and climate."],
  ["Why have many early civilizations developed near rivers?", "Rivers supplied fresh water, fertile land and travel routes", ["Rivers keep the air hot all year round", "Rivers stop the wind from ever blowing", "Rivers are free of floods in every season"], "Think about farming and transportation."],
  ["Which river valley is the site of one of the world’s earliest civilizations?", "the Nile", ["the Sahara", "the Himalayas", "the Pacific"], "It runs through northeast Africa."],
  ["Which type of land is usually best for farming?", "flat land with fertile soil", ["steep rocky slopes with thin soil", "deserts with almost no water", "frozen ice sheets covering the land"], "Crops need soil, water and level ground."],
  ["Why are high mountain areas often sparsely populated?", "Steep land and cold weather make farming and building hard", ["They have too much soil for plants to grow in", "They are too close to the sea to be safe", "They have no air at all up there"], "Think of access and growing food."],
  ["Which climate usually supports more people?", "a mild climate with enough rain", ["extreme desert", "permanent ice", "thick jungle with no roads"], "People need food and fresh water."],
  ["Which is a human factor that influences settlement?", "jobs and economic opportunities", ["soil fertility", "a river", "the shape of a mountain"], "Human factors come from people’s choices and systems."],
  ["A new factory opens in a small town. What is a likely effect on the town’s settlement?", "More people move in for work", ["People all leave at once", "The land turns to desert", "The climate cools"], "Jobs attract people.", true],
  ["Cities often grow where trade routes meet. Why?", "Merchants and travellers stop there, creating jobs and services", ["There is nothing to do there, so people leave", "They have no roads, so people must travel by boat", "They are far from any water, so no one comes"], "Crossroads bring people and business."],
  ["What does population density measure?", "the number of people per unit of area", ["the total population of a country", "the average age", "the size of a city’s budget"], "Density = people ÷ area."],
  ["A town of 3000 people covers 3 km². What is its population density?", "1000 people per km²", ["9000 people per km²", "100 people per km²", "3 people per km²"], "Divide the population by the area.", true],
  ["Region A has 100 people in 10 km². Region B has 100 people in 50 km². Which has the higher density?", "Region A", ["Region B", "They are the same", "It cannot be known"], "Same people, smaller area means more crowded.", true],
  ["Which describes an urban area?", "a city or large town with many buildings and people", ["a farm with a few houses spread far apart", "a forest with no roads or buildings", "a mountain trail used by hikers"], "Urban means town or city.", true],
  ["Which describes a rural area?", "a countryside area with farms and small communities", ["a downtown with tall buildings and many offices", "a busy shopping district in a big city", "a large airport with many runways"], "Rural means countryside."],
  ["Why do many cities lie on a coast?", "Ports allow trade and travel by ship", ["Coasts never have storms", "People dislike inland areas", "Coastal land is cheaper everywhere"], "Think of shipping and fishing.", true],
  ["A settlement pattern where houses are along a single road is called…", "linear", ["clustered", "scattered", "circular"], "Think of a line."],
  ["A settlement pattern where houses are grouped closely together is called…", "clustered (nucleated)", ["linear, with houses along one road", "scattered, with houses far apart", "random, with no pattern"], "Houses form a tight group around a centre."],
  ["A settlement pattern where farmhouses are spread far apart is called…", "dispersed (scattered)", ["clustered, in one tight group", "linear, along a single road", "tight and packed around a centre"], "Think of farms with fields in between."],
  ["What does rural-urban migration mean?", "people moving from the countryside to cities", ["people moving between oceans", "birds moving south", "people moving between continents only"], "It changes where people live."],
  ["Why do many people move from rural areas to cities?", "to find jobs, education and services", ["because cities are quieter", "because farms are always closing", "because cities have no cost"], "Think about opportunities.", true],
  ["What can cause a settlement to shrink?", "the main industry closes and jobs disappear", ["more jobs open and people move in", "a new port is built and trade grows", "a new school opens and families arrive"], "When work leaves, people often leave too."],
  ["How might climate change affect low coastal settlements?", "Rising seas and storms may force people to move", ["They will grow larger by default as the water rises", "The coast will move farther out to sea", "Nothing will change at all for the settlement"], "Think about flooding and erosion.", true],
  ["Settlement patterns change over time. Which is an example?", "A village grows into a town after a railway arrives", ["Mountains stay in the same place for centuries", "A river keeps flowing to the sea", "The equator stays at 0° latitude"], "Look for a change caused by something new.", true],
  ["A map shows dots clustered around a harbour. What can you infer?", "People settle near the harbour", ["Nobody lives near water", "The harbour is empty", "The area is a desert"], "Dots show where people live."],
  ["On a settlement map, large areas with very few dots show…", "low population density", ["high density", "the sea only", "a mistake"], "Fewer dots, fewer people."],
  ["Which is a service that attracts people to settle in a place?", "a hospital", ["a mountain", "a swamp", "a cloud"], "Services meet people’s needs."],
  ["Which compares two settlements well?", "One is a port with jobs in shipping; the other is a farm town", ["One is nicer to look at than the other", "Both are in exactly the same place", "They are exactly equal in every way"], "Compare their features and their reasons for being there."],
  ["Governments can influence settlement by…", "planning where roads, housing and services are built", ["changing the climate of the region by decree", "moving rivers to new locations at will", "controlling the weather over the whole area"], "Policy and planning are human factors.", true],
  ["When people alter the land by draining a wetland for houses, this can…", "increase flood risk for the settlement", ["end all rainfall", "make the soil perfect", "stop the settlement growing"], "Wetlands soak up extra water.", true],
];

const SUSTAINABILITY_SOCIAL: Q[] = [
  ["What does it mean to use a resource sustainably?", "use it in a way that lets it last for the future", ["use as much of it as we can right now", "never use it for any reason", "sell all of it as quickly as we can"], "Sustainable means it can be kept going."],
  ["Which is a human activity that can contribute to climate change?", "burning fossil fuels for energy", ["tides moving in and out", "plants growing in spring", "the Moon orbiting Earth"], "Burning fuels adds greenhouse gases."],
  ["Which is an example of resource depletion?", "fish stocks falling because too many are caught", ["a tree growing taller each year in the forest", "rain falling on a field during the spring", "a pond freezing over in the winter"], "Depletion means using up faster than it is replaced."],
  ["Overfishing can lead to…", "fewer fish and harm to fishing communities", ["more fish forever and no change for fishers", "cleaner oceans with no fishing at all", "lower prices on every product in the store"], "Both nature and people are affected.", true],
  ["Deforestation means…", "clearing forests on a large scale", ["planting new trees on bare land", "protecting a forest as a national park", "growing vegetables in a small garden"], "De- means removing."],
  ["A common effect of deforestation is…", "loss of habitat and more soil erosion", ["more wildlife and richer habitats overall", "less carbon dioxide in the air than before", "fewer floods because trees are gone"], "Trees hold soil and shelter animals."],
  ["Which causes air pollution?", "exhaust from cars and factories", ["clean rain falling from the clouds", "wind moving across an open field", "waves rolling onto a sandy beach"], "Burning fuels releases pollutants."],
  ["Plastic waste in the ocean mainly harms…", "marine animals that swallow or get tangled in it", ["only people who live in big cities", "clouds that float in the sky", "the Sun and the stars at night"], "Plastic breaks down very slowly."],
  ["Which choice makes a household more sustainable?", "repairing and reusing items instead of replacing them", ["buying single-use items and throwing them away", "running appliances all day when no one is home", "throwing out food that is still good to eat"], "Reduce, reuse, recycle."],
  ["Which choice reduces food waste?", "planning meals and storing food properly", ["buying much more food than the household needs", "throwing out leftovers right away", "ignoring all of the expiry dates"], "Waste less of what you grow and buy.", true],
  ["What does your carbon footprint measure?", "the greenhouse gases your activities cause", ["the size of the shoes that you wear every day", "how far you walk to school each day", "how much you weigh in kilograms"], "It is a measure of your impact on the climate."],
  ["Which of these has the smallest carbon footprint for a trip to school?", "walking", ["driving alone", "a gas-powered boat", "a long taxi ride"], "Less fuel burned, fewer emissions."],
  ["Which action could a community take to be more sustainable?", "set up a composting and recycling program", ["close all of the parks in town", "stop collecting waste from homes", "ban walking on the streets of the town"], "Communities can organize systems for many people."],
  ["Which is a way governments can encourage sustainability?", "set rules and give support for clean energy", ["end all science research to save money", "remove all of the protected areas in the country", "give support to industries that pollute the most"], "Laws and incentives affect many people at once."],
  ["Protected areas such as parks help sustainability by…", "preserving habitats and biodiversity", ["building more roads through the habitat", "clearing trees for new development", "selling the land to the highest bidder"], "They keep ecosystems safe."],
  ["Switching to electric vehicles has a cost and a benefit. Which is a benefit?", "no exhaust from the vehicle’s tailpipe", ["it needs no electricity from the grid", "it costs nothing at all to make", "it does not need any roads to drive on"], "Think about what comes out of the tailpipe."],
  ["A town considers a recycling program. Which is a cost?", "money for trucks and workers", ["less waste in landfill", "cleaner streets", "more reusable materials"], "Costs are what you have to spend or give up.", true],
  ["When weighing a sustainable choice, what should a community consider?", "costs, benefits and who is affected", ["only the lowest price", "only what is popular", "what is easiest this week"], "A fair decision looks at many things.", true],
  ["Warming oceans and acidifying seas threaten coral reefs. What type of issue is this?", "an environmental issue with global effects", ["a local weather report for one town only", "a sports event held in a stadium", "an error on a printed map"], "Many places share the same ocean."],
  ["A bar graph shows household water use rising yearly. What might it suggest?", "Water conservation could be needed", ["Water use is falling", "No one uses water", "The graph must be wrong"], "A rising trend can signal pressure on a resource.", true],
  ["A line graph shows a town’s garbage falling after a recycling program began. This suggests…", "the program may be helping", ["the program failed", "people stopped making garbage", "the graph shows population"], "Compare before and after.", true],
  ["How can an environmental issue affect a community’s economy?", "It can harm industries such as fishing or farming", ["It makes every business in town richer", "It has no link to any jobs at all", "It only affects people who live on other planets"], "Think about work that depends on nature."],
  ["Which source of electricity produces no greenhouse gases while running?", "wind turbines", ["coal plants", "gas plants", "oil generators"], "They use moving air, not burning fuel."],
  ["The 3 Rs stand for…", "reduce, reuse, recycle", ["read, write, run", "rain, river, rock", "rest, relax, repeat"], "They are three steps for cutting waste."],
  ["Which of the 3 Rs is usually best to do first?", "reduce", ["recycle", "reuse", "dispose"], "Making less waste in the first place is best.", true],
  ["A reusable bag instead of plastic bags is an example of…", "an individual sustainable choice", ["a law passed by the national government", "a natural process like the water cycle", "a special type of map or graph"], "One person’s action."],
  ["Why is climate change called a global issue?", "Greenhouse gases mix in the air and affect the whole planet", ["It only affects the one country that makes the gases", "It happens only in big cities with traffic", "It is not real, so it affects no one"], "The atmosphere is shared by everyone.", true],
  ["Which statement shows weighing a trade-off?", "Cheaper energy now might cost the environment later", ["Everything in nature is free, so there is no cost", "Nothing has a cost, so any choice is fine", "No choice we make has any effect on nature"], "Compare short-term and long-term effects.", true],
];

const GLOBALIZATION: Q[] = [
  ["What is globalization?", "the growing connection of people, businesses and cultures around the world", ["a map that shows every country in the world", "a type of climate found near the equator", "a law that applies in just one country"], "Think of a world that is more connected."],
  ["Which of these helps globalization spread?", "faster transportation", ["slower travel", "fewer phones", "closed borders only"], "Moving goods and people more easily connects places."],
  ["Which technology has helped connect people across the world?", "the internet", ["the wheel", "the candle", "the spear"], "It carries messages and ideas in seconds."],
  ["What is trade?", "buying and selling goods and services", ["moving to a new home in another city", "growing vegetables in a garden", "drawing a map of the world by hand"], "People exchange things they have for things they need."],
  ["What is an import?", "a good brought into a country from another country", ["a good sold to another country by a local business", "a local tourist who visits a nearby town", "a local tax paid on goods sold in a shop"], "Imports come in."],
  ["What is an export?", "a good sold to another country", ["a good bought from abroad", "a national holiday", "a map symbol"], "Exports go out."],
  ["A shirt is designed in one country, sewn in another and sold in many. This is an example of…", "a global supply chain", ["a local market only", "a natural resource", "a climate pattern"], "Products can pass through many countries.", true],
  ["Which is a benefit of globalization?", "People can buy a wider variety of goods", ["Every product costs much more than before", "People lose all contact with other countries", "Trade between countries completely stops"], "More choice is one benefit.", true],
  ["Another benefit of globalization is…", "new jobs in industries that sell to the world", ["fewer jobs for everyone who lives there", "less information available to people", "no new ideas can travel between places"], "Trade can create work."],
  ["Which is a challenge of globalization?", "Local businesses can struggle to compete with large global ones", ["Everyone gets richer by exactly the same amount", "No one ever moves to a new country", "Trade is easy for all businesses of every size"], "Bigger companies can sell cheaper.", true],
  ["Another challenge of globalization is…", "workers in some places may face poor pay or unsafe conditions", ["too many holidays in a year for workers", "too few phones for everyone in the country", "free food for all people everywhere"], "Companies look for low costs, sometimes at workers’ expense.", true],
  ["Globalization can add to environmental problems because…", "moving goods long distances uses fuel", ["trade never uses energy of any kind", "ships are always free of carbon emissions", "goods can move around the world by themselves"], "Think about shipping and flights."],
  ["The Silk Road was an example of historic globalization because…", "it linked Asia and Europe through trade and the sharing of ideas", ["it was a modern highway built in the last century", "it linked the planets of the solar system", "it only carried water between two cities"], "Globalization is not only a modern idea."],
  ["Which was a historic way that goods and ideas travelled long distances?", "trade routes by land and sea", ["satellite television", "the internet", "text messages"], "Before modern tech, people moved by foot, animal and ship."],
  ["How does globalization spread culture?", "through music, film, food, fashion and the internet", ["only by war and by taking land by force", "only through letters sent by ship", "only because borders are open to everyone"], "People share their ways of life."],
  ["A food from one country becomes popular in many others. This shows…", "cultural diffusion", ["cultural isolation", "a trade ban", "a climate zone"], "Ideas and foods spread."],
  ["Which is a benefit of cultural sharing?", "People learn about and enjoy other cultures", ["All cultures become exactly identical overnight", "Languages disappear from the world for sure", "People stop learning from one another"], "Sharing can bring understanding."],
  ["Which is a risk of globalization for local cultures?", "Small languages and traditions can fade if fewer people use them", ["Every tradition grows stronger when others share it", "No one can hear other kinds of music any more", "Cultures never change, no matter what happens"], "Big global cultures can crowd out small ones.", true],
  ["One way a community can keep its culture strong is to…", "teach its language and traditions to young people", ["stop speaking its language at home and in school", "hide its traditions from young people", "avoid all contact with other communities"], "Passing it on keeps it alive."],
  ["Atlantic Canada’s seafood is sold around the world. This shows…", "how the region is connected to global trade", ["that trade between regions does not exist", "that the sea around the region is empty", "that selling goods abroad is against the law"], "Local products can reach far-away markets."],
  ["Prince Edward Island potatoes are shipped to other places. Which word names this?", "exporting", ["importing", "recycling", "composting"], "Goods go out."],
  ["The Confederation Bridge links Prince Edward Island to the mainland. How does this help trade?", "Trucks can carry goods on and off the island all year", ["It stops all travel to and from the island", "It makes the island much smaller", "It removes the need for any roads at all"], "Think about transportation links.", true],
  ["A tourist from another country visits Prince Edward Island. This is an example of…", "globalization through travel", ["isolation from all other places and people", "a trade ban between countries", "a type of climate zone near the equator"], "Travel connects people."],
  ["When a company in a faraway country sets prices for a product you buy, this shows…", "your community is linked to the global economy", ["a local-only market with no outside links", "a barter system with no money at all", "a printing error in the store’s price list"], "Prices can depend on far-away events.", true],
  ["Fair trade is an attempt to…", "give producers a fair price and safe conditions", ["raise prices for no reason at all", "stop all trade between countries", "ban foreign goods from every shop"], "It tries to address a challenge of globalization.", true],
  ["Which is a modern example of globalization?", "video calls between family in different countries", ["a handwritten letter in a small village", "a quiet walk across a field", "a candlelit supper at home with family"], "Technology lets people connect easily."],
  ["Why can events in one country affect jobs in another?", "Economies are linked through trade", ["Jobs are mixed on a map", "Countries have no borders", "Trade is imaginary"], "Link in a chain.", true],
];

const GLOBAL_CITIZENSHIP: Q[] = [
  ["What are global inequalities?", "differences in wealth, health and opportunity between parts of the world", ["differences in time zones between countries", "differences in the sizes of countries on maps", "differences in the weather forecasts for each day"], "Some people have much more than others."],
  ["Which factor can contribute to global inequality?", "unequal access to education", ["equal pay for all workers everywhere", "equal health care for every person", "fair trade for all producers in all countries"], "Education affects jobs and income."],
  ["Another factor that can contribute to inequality is…", "conflict that disrupts schools, farms and health care", ["lasting peace and stability that keep services running", "plentiful fresh water for all, all year round", "strong public services in every community"], "War damages the basics people need."],
  ["Why can a lack of clean water add to inequality?", "It harms health and takes time that could go to school or work", ["It makes people richer and healthier", "It improves school attendance", "It has no effect on health or on school"], "Fetching water takes time and can make people ill.", true],
  ["How can a country’s history affect inequality today?", "Past decisions, such as colonial rule, can still shape wealth and services", ["History never matters for how places are today", "Only the weather matters for wealth", "Money grows naturally from stones and soil"], "Effects can last for generations.", true],
  ["What are universal human rights?", "basic rights that belong to every person", ["rights for adults only, not for children", "rights for people in one country only", "rules that apply to businesses and not to people"], "They apply to everyone, everywhere."],
  ["Which document set out human rights for all people in 1948?", "the Universal Declaration of Human Rights", ["a map of the world’s main trade routes", "a school bus schedule for the district", "a weather chart for the winter season"], "The United Nations adopted it."],
  ["Which international organization adopted the Universal Declaration of Human Rights?", "the United Nations", ["a sports league", "a map company", "a shipping firm"], "It is an organization of many countries."],
  ["Which of these is a human right?", "the right to an education", ["the right to win every game", "the right to a free phone", "the right to never be corrected"], "It is listed among the basic rights for all.", true],
  ["Another basic human right is…", "freedom from slavery", ["owning the most land", "having a fast car", "getting every wish"], "Everyone is entitled to live free."],
  ["Globalization can help human rights when…", "ideas about rights and fairness spread worldwide", ["rights are ignored and stay hidden", "news is blocked from reaching the public", "no one is allowed to speak out"], "Information travels fast now."],
  ["Globalization can harm human rights when…", "companies profit from unsafe or unfair working conditions", ["wages are fair and the workplace is safe", "workers are protected by clear rules", "laws about workers are followed everywhere"], "Chasing low costs can lead to abuse.", true],
  ["Which action supports human rights through buying choices?", "choosing products made under fair working conditions", ["picking the cheapest item, no matter how it was made", "never reading the labels on any product", "ignoring where the goods come from"], "Consumers have a voice.", true],
  ["Compare two places: one has a hospital in every town, the other has one hospital for a whole region. What is different?", "access to health care", ["the time zone", "the length of the equator", "the name of the sea"], "Look at services available to people."],
  ["Life expectancy is…", "the average number of years a person is expected to live", ["a person’s height measured in centimetres", "the length of a school day in hours", "the age of a country since it was founded"], "It is one way to compare health between places."],
  ["Literacy rate means…", "the share of people who can read and write", ["the number of libraries in the country", "the average length of the books people read", "the number of languages that are spoken"], "Higher rates mean more people can read."],
  ["A current issue of geographical significance is one that…", "affects places and people in an important way right now", ["happened more than a thousand years ago", "is about the life of a single person", "is only a rumour with no evidence"], "Examples include climate change and migration."],
  ["Which is an example of a current issue of geographical significance?", "rising sea levels", ["a fairy tale", "an old coin", "a board game"], "It affects many places and people today."],
  ["Why is it useful to read about an issue from more than one source?", "Different sources can show different facts and points of view", ["All sources always say exactly the same thing", "More sources make the research shorter", "It is never needed, because one source is enough"], "Compare to get the whole picture."],
  ["Who might have a different view of a new mine: the mining company or a nearby family?", "They may have different perspectives because they are affected differently", ["They must always agree, since they live in the same area", "Neither has any view about the mine", "They have the same interests, so they think alike"], "People see issues through their own situation.", true],
  ["What is a perspective?", "a point of view on an issue", ["a particular type of map or graph", "a measurement taken with a ruler", "a river or stream on the land"], "Where you stand can change what you see."],
  ["Which statement is a fact?", "The country has a population of 10 million.", ["The country is a wonderful place to visit.", "The country should be much bigger than it is.", "Everyone who goes to the country loves it."], "A fact can be checked."],
  ["Which statement is an opinion?", "That is the most beautiful country in the world.", ["The country has three large lakes.", "The capital city is on the coast.", "The country borders two different seas."], "It cannot be proven true or false."],
  ["A source gives only one side of an issue and uses angry words. What should you do?", "look for other sources to compare", ["accept it as the whole truth", "share it right away", "stop thinking"], "Check for balance.", true],
  ["Why might a website selling a product not be the best source of information about the product?", "It has an interest in selling it", ["It is always wrong about everything", "It uses lots of pictures", "It is on a computer"], "Think about who benefits.", true],
  ["Why is it helpful to ask who made a source and why?", "It helps you spot bias and purpose", ["It makes the source longer", "It makes the source true", "It is not helpful"], "Knowing the maker helps you judge it."],
  ["Which of these is the best question for analysing a current issue?", "Who is affected, and how do they see it?", ["Who is the cutest in the photo?", "What is the shortest article we can find?", "Where is the nearest store to our home?"], "Include many voices.", true],
];

const SOCIAL_ACTION: Q[] = [
  ["What is social action?", "taking steps to create positive change in society", ["staying quiet about problems so they go away", "ignoring other people and their needs", "waiting for change to happen on its own"], "It means acting, not just talking."],
  ["Which is a way people can affect societal change locally?", "organizing a neighbourhood clean-up", ["waiting for others to do it", "ignoring litter", "blaming others"], "A group can fix a local problem."],
  ["Which is a way people can affect societal change globally?", "supporting an international organization that helps people in need", ["doing nothing at all about the problem", "ignoring the news from other countries", "avoiding every global issue we hear about"], "Organizations connect people worldwide."],
  ["Writing a letter to a local leader about an issue is an example of…", "advocacy", ["avoiding", "recycling", "migration"], "You speak up for a cause."],
  ["A petition is…", "a document signed by many people asking for a change", ["a kind of map that shows roads", "a measurement of how far a place is", "a trade good that is shipped overseas"], "Signatures show support."],
  ["Raising money for a cause is called…", "fundraising", ["trading", "mapping", "farming"], "People collect money to support a goal."],
  ["Volunteering means…", "giving your time to help without being paid", ["working for wages at a company", "buying goods at a store", "travelling for a holiday trip"], "It helps others and a cause."],
  ["Which choice best shows choosing an issue of personal interest?", "picking a problem you care about and can learn about", ["picking the very first issue that you hear about", "picking one you know nothing about at all", "picking one that nobody else cares about"], "Interest keeps you going."],
  ["Which is a realistic goal for a student action project?", "collect 200 items for the local food bank in one month", ["end hunger in the whole world by next Friday", "change every law in the country in one week", "fix all climate problems with one poster"], "A goal should be something you can reach.", true],
  ["A good goal says what you will do, how much and by when. Which fits?", "plant 20 trees on school grounds by June", ["help nature somehow at some point", "make things better for everyone someday", "do something good when we have time"], "Be specific and measurable.", true],
  ["What is the first step in an action plan?", "decide on the issue and the goal", ["celebrate the end of the project with a party", "write the final report for the year", "hand out prizes to the winning team"], "You need to know what you want to change."],
  ["After setting a goal, what should an action plan list next?", "the steps to take", ["the winning team", "the colour of the poster", "the weather"], "Break the goal into parts."],
  ["Who should you involve in an action plan?", "people who are affected and people who can help", ["nobody, because one person can do it all", "only people who disagree with the plan", "only one person, to keep it simple"], "Teamwork makes action stronger."],
  ["Which question helps plan what resources are needed?", "What materials, money and time will we need?", ["Which day is a school holiday this month?", "Which song is the most popular right now?", "What is the longest river in the world?"], "Resources are the things you need to do the job.", true],
  ["Before acting, why should you learn about the issue?", "to understand its causes and effects", ["to avoid doing anything about it for now", "to make our project longer than it needs to be", "to find someone to blame for the problem"], "Good action starts with understanding.", true],
  ["Using geographical thinking, you could explain an issue by asking…", "where it is happening, how it is changing and who is affected", ["who is the tallest person in our class", "what is the cheapest item in the shop", "when the school bell rings each morning"], "Use location, change and connections.", true],
  ["A school wants to cut paper waste. Which is a sensible measure of success?", "the amount of paper used before and after", ["how many posters were drawn by the team", "how tired the team members felt", "how many people said hello in the hall"], "Use evidence to judge whether it worked."],
  ["How can you tell if an action worked?", "compare results with the goal you set", ["ask nobody and assume it worked", "hope that someone else checks later", "ignore the results and start a new project"], "Check the goal against what happened."],
  ["If an action did not work well, what is a good next step?", "think about what to change and try again", ["give up forever and never try again", "blame others for how it turned out", "hide the results from the rest of the group"], "Learning from setbacks is part of change.", true],
  ["Which is an example of a local contribution to change?", "a community group restoring a stream bank", ["an international treaty signed by many countries", "a satellite launched into space", "a global stock market trading all day"], "It happens in one place.", true],
  ["Which is an example of a global contribution to change?", "countries agreeing to work together on a shared problem", ["a bake sale held at one house", "a school pep rally in the gym", "a neighbour tending a small garden"], "Many countries are involved."],
  ["Why can young people play a role in change?", "They can raise awareness, vote when older and start projects now", ["They have no ideas that are worth listening to", "They cannot talk to anyone about issues", "They are not citizens of any place at all"], "Everyone can contribute.", true],
  ["Raising awareness means…", "helping more people learn about an issue", ["hiding an issue so no one can see it", "buying things that support the cause", "moving away from where the problem is"], "People cannot help with what they do not know."],
  ["Which is a good way to raise awareness at school?", "give a short talk with facts and a clear call to action", ["whisper the news to a single friend", "do nothing and hope that it goes away", "complain loudly without offering any ideas"], "Share information and invite others."],
  ["Which is a possible barrier to social action?", "not enough time or money", ["having too many helpers", "knowing the issue well", "having a clear plan"], "Plan for what might get in the way.", true],
  ["How can a group overcome a lack of money for a project?", "ask for donations or hold a fundraiser", ["cancel the project and give up", "wait for a miracle to appear", "hide the problem and hope no one asks"], "Look for ways around barriers."],
  ["Which statement shows respect for other perspectives when planning action?", "Let’s ask the people affected what they need.", ["We know best, so no one needs to be asked.", "Their opinion does not matter.", "We will decide without listening."], "Listen to the people who live with the issue.", true],
  ["Why is it important to keep the plan realistic?", "so the team can finish and see real results", ["so that nothing gets done at all", "so that no one else is involved", "so that the project takes much longer"], "Small wins build momentum."],
  ["A class collects data on litter before a clean-up and again after. What is this?", "evidence of the action’s impact", ["a legend that explains the symbols on a map", "a trade route that crosses the sea", "a type of climate zone on a map"], "Measure to judge the result."],
];

// Unit definitions use spec text exactly.

export const peSustainability9 = bankUnit({
  id: "pe-sustainability-9",
  title: "Sustainable Ecosystems",
  emoji: "🌱",
  blurb: "Climate, clean energy and over-population",
  parentNote:
    "Practises how human activity affects biodiversity and ecosystems, and issues such as climate change, over-population and clean energy that call for good scientific decisions.",
  standards: ["Biodiversity & Sustainability of Ecosystems; GCO 1", "sustainability of ecosystems, climate change, clean energy and population pressures"],
  items: SUSTAINABLE_ECOSYSTEMS,
});

export const peGoodScience9 = bankUnit({
  id: "pe-good-science-9",
  title: "Science or Not Science?",
  emoji: "🔎",
  blurb: "What good science looks like",
  parentNote:
    "Practises telling science from pseudoscience and judging what good science looks like, using evidence, testable ideas and fair tests.",
  standards: ["GCO 1; GCO 2", "telling science from pseudoscience and judging good scientific evidence"],
  items: GOOD_SCIENCE,
});

export const peGeographicThinking9 = bankUnit({
  id: "pe-geographic-thinking-9",
  title: "Thinking Like a Geographer",
  emoji: "🧠",
  blurb: "Places, causes and change",
  parentNote:
    "Practises the disciplinary thinking used throughout Grade 9 social studies: what makes a place significant, how people and the environment affect each other, continuity and change, and weighing implications.",
  standards: ["DT1; DT2; DT3; DT4", "the geographic thinking skills of significance, cause and effect, continuity and change, and implications"],
  items: GEOGRAPHIC_THINKING,
});

export const peGeographicInformation9 = bankUnit({
  id: "pe-geographic-information-9",
  title: "Maps, Graphs & Data",
  emoji: "🗺️",
  blurb: "Reading and sharing geographic information",
  parentNote:
    "Practises analysing geographical information with geographical tools such as maps, graphs and data tables, and communicating it clearly.",
  standards: ["SCO1; SCO2", "analysing geographical information with maps, graphs and data, and sharing it clearly"],
  items: GEOGRAPHIC_INFORMATION,
});

export const peSettlementPatterns9 = bankUnit({
  id: "pe-settlement-patterns-9",
  title: "Where People Settle",
  emoji: "🏘️",
  blurb: "Natural and human factors",
  parentNote:
    "Practises how natural and human factors influence where people settle, and how settlement patterns look on a map.",
  standards: ["SCO3", "how natural and human factors influence settlement patterns"],
  items: SETTLEMENT_PATTERNS,
});

export const peSustainabilitySocial9 = bankUnit({
  id: "pe-sustainability-social-9",
  title: "Sustainability & Our Choices",
  emoji: "♻️",
  blurb: "Environmental issues and what we can do",
  parentNote:
    "Practises the factors that contribute to environmental issues and ways that individuals and communities can become more sustainable.",
  standards: ["SCO5; SCO6", "factors behind environmental issues and ways to become more sustainable"],
  items: SUSTAINABILITY_SOCIAL,
});

export const peGlobalization9 = bankUnit({
  id: "pe-globalization-9",
  title: "Globalization",
  emoji: "🌐",
  blurb: "A connected world",
  parentNote: "Practises the benefits and challenges of globalization, past and present, and its effect on culture.",
  standards: ["SCO7; SCO8", "benefits and challenges of globalization, and its impact on culture"],
  items: GLOBALIZATION,
});

export const peGlobalCitizenship9 = bankUnit({
  id: "pe-global-citizenship-9",
  title: "Global Citizenship",
  emoji: "🤲",
  blurb: "Inequality, rights and many perspectives",
  parentNote:
    "Practises the factors behind global inequalities, the link between human rights and globalization, and how to analyse current issues from several points of view.",
  standards: ["SCO9; SCO10; SCO11", "global inequalities, universal human rights and current issues seen from many perspectives"],
  items: GLOBAL_CITIZENSHIP,
});

export const peSocialAction9 = bankUnit({
  id: "pe-social-action-9",
  title: "Social Action",
  emoji: "✊",
  blurb: "Planning to make a difference",
  parentNote:
    "Practises how people affect societal change locally and globally, and how to plan action on an issue using the concepts of geographical thinking.",
  standards: ["SCO12; SCO13", "ways people create change, and planning action on a local or global issue"],
  items: SOCIAL_ACTION,
});
