import { bankUnit, type Q } from "../own";

// Grade 4 science and social studies, Prince Edward Island: rocks, minerals and erosion; habitats; exploration; world
// features; Canada’s landscapes. Indigenous content is light, in the present tense for living communities, and needs
// review by Mi’kmaq partners (for example the Mi’kmaq Confederacy of PEI) and the PEI Department of Education before
// launch.
//
// Sources checked:
// Canadian Space Agency, biography of Roberta Bondar (asc-csa.gc.ca) and The Canadian Encyclopedia, "Roberta Bondar"
// Space.com and Global News, Chris Hadfield takes command of the International Space Station, March 2013
// The Planetary Society, Yuri Gagarin and Vostok 1 (12 April 1961); NASA, Apollo 11 (20 July 1969)
// Parks Canada, First Crossing of North America National Historic Site (Alexander Mackenzie, 1793)
// The Canadian Encyclopedia, "Jacques Cartier" (1534 voyage, Gulf of St. Lawrence); Mariners’ Museum, Jacques Cartier
// NASA, "Galileo discovers Jupiter’s moons" (1610); Wikipedia, On the Origin of Species (1859)
// Canadian Heritage (canada.ca), national flag first raised 15 February 1965; Emblems of Canada (The Canadian Encyclopedia)
// Canadian Heritage (canada.ca), Prince Edward Island’s provincial symbols (lady’s slipper, blue jay, red oak)
// Intergovernmental Affairs (canada.ca), provinces and territories; Constitution Act, 1867 and territorial powers
// Wikipedia, Geography of Prince Edward Island (iron oxide in red sandstone and soil); Confederation Bridge (12.9 km, 1997)
// PEI Invasive Species Council, European green crab (peiinvasives.com); Parks Canada, piping plover at PEI National Park
// DCHP-3 (UBC), "Epekwitk"
// Standard textbook facts: properties of minerals, uses of rocks, the three oceans around Canada, the physical regions
// of Canada, the seven continents and five oceans, world rivers, mountains and islands.
//
// Left out because unverified: Hillary and Tenzing on Everest, Jacques Cousteau and the Calypso, the share of Canadians
// living within a set distance of the American border (sources disagree), which tree is Canada’s official tree, the
// exact date of Cartier’s first sight of the Island, and the age of the Island’s bedrock.

// ---------------------------------------------------------------------------------------------------------------------
// Science: Rocks, minerals and erosion

const EROSION: Q[] = [
  ["What is weathering?", "the breaking of rock into smaller pieces", ["the carrying of rock pieces to a new place", "the growing of new rock underground", "the melting of rock into liquid"], "Weathering breaks things up where they sit. It does not carry them away."],
  ["What is erosion?", "the carrying away of bits of rock and soil", ["the cracking of a rock where it sits", "the building of a new mountain", "the washing of a window"], "Erosion moves pieces from one place to another."],
  ["Which of these is an example of erosion?", "A river carries mud downstream", ["A rock cracks where it sits", "A seed sprouts in a crack", "A pebble stays still for years"], "Look for something being carried from place to place."],
  ["Which of these is weathering?", "Water freezes in a crack and splits a rock", ["Wind blows sand across a field", "Waves carry sand down a beach", "A glacier drags rocks away"], "The rock breaks where it is. Nothing has been carried off yet."],
  ["What can strong wind do to a sandy dune?", "move the sand to a new place", ["turn the sand into solid rock", "stop the sand from ever moving", "make every grain heavier"], "Light grains of sand can be blown along."],
  ["Where does wind erosion happen most easily?", "on dry, bare ground with few plants", ["in a thick, green forest", "on soil held tight by grass roots", "at the bottom of a lake"], "Roots hold soil down, so bare ground blows away more easily."],
  ["How do dune grasses help a beach?", "Their roots hold the sand in place", ["They make the wind blow harder", "They turn the sand into stone", "They pull water out of the ocean"], "Think about what roots do under the ground."],
  ["What does a fast river do to its banks over time?", "wears them away and carries bits downstream", ["builds them taller with no change", "freezes them solid all year", "turns them into mountains"], "Moving water picks up loose bits and takes them along."],
  ["What do ocean waves do to a cliff along the shore?", "wear the cliff away bit by bit", ["make the cliff grow higher", "paint the cliff a new colour", "leave the cliff exactly as it was"], "Many cliffs on PEI’s shore are soft red sandstone that waves wear away."],
  ["Heavy rain runs down a bare hillside. What may happen?", "Soil is washed downhill", ["The hill grows taller", "The soil turns to ice", "The hill becomes a lake at once"], "Moving water can carry loose soil with it."],
  ["How does freezing water help break a rock?", "It freezes in cracks and pushes them wider", ["It melts the rock into liquid", "It makes the rock heavier so it sinks", "It paints lines on the rock"], "Water takes up more room when it turns to ice."],
  ["What is a glacier?", "a huge, slow-moving river of ice", ["a fast stream of warm water", "a pile of loose sand", "a kind of strong wind"], "It moves so slowly that you cannot see it move."],
  ["What can a glacier do to land as it moves?", "scrape up rock and soil and carry it away", ["leave the land completely unchanged", "make the land warmer", "grow new rocks on top"], "Ice that moves is heavy and strong.", true],
  ["In spring, ice in a road crack melts, then freezes again and again. What happens to the crack?", "It gets bigger", ["It closes up on its own", "It turns into grass", "It stays exactly the same"], "Each freeze pushes the crack a little wider."],
  ["Which of these can carry bits of rock and soil away?", "wind, water and ice", ["sunshine, stars and moonlight", "paper, glue and tape", "music, colour and shadow"], "Think about things in nature that move across the land."],
  ["You want to show how water erodes soil. Which set-up works best?", "Pour water down a pile of soil in a tray", ["Put soil in a closed jar on a shelf", "Weigh a bag of soil", "Shine a lamp on a pile of soil"], "You need moving water and loose soil.", true],
  ["You shake soft rock pieces in a closed jar of water. What will you most likely see?", "smaller bits and rounded pieces", ["the pieces grow larger", "the pieces turn into metal", "the pieces stay sharp and unchanged"], "Rocks rubbing together wear each other down.", true],
  ["A student blows through a straw at a tray of sand. Which change does this model?", "erosion by wind", ["erosion by ice", "weathering by plants", "soil forming from rocks"], "The air moves the sand from place to place."],
  ["A student freezes a jar full of water and the jar cracks. What natural change does this model?", "ice splitting a rock", ["wind carrying sand", "a river forming", "a volcano erupting"], "Think about water freezing inside a rock crack.", true],
  ["What is soil made of?", "tiny bits of rock and rotted plants and animals", ["only salt and air", "metal and plastic", "only water"], "Soil has a mix of rock pieces and once-living things."],
  ["How can plant roots help break rock into soil?", "They grow into cracks and push them wider", ["They melt the rock", "They glue the pieces together", "They turn the rock into water"], "A tiny root can grow into a crack and keep growing.", true],
  ["How long can it take for rock to make a thin layer of soil?", "hundreds or even thousands of years", ["a few minutes", "one afternoon", "about one week"], "Soil forms very slowly.", true],
  ["What happens first when soil forms from rock?", "Wind, water, ice and plants break the rock into small pieces", ["Dead leaves turn straight into stone", "Rain turns rock into milk", "Soil falls from the sky"], "The rock has to be broken up before it can become soil.", true],
  ["PEI’s soil is reddish. What gives it that colour?", "iron in the rock it came from", ["red paint from long ago", "fallen red leaves only", "dye from the ocean"], "The island’s red sandstone has iron that turns rusty red."],
  ["Which kind of rock can hold old shells, plants and animal remains?", "sedimentary rock", ["a shiny glass bead", "a lump of fresh lava", "a pebble of plastic"], "It forms in layers, and living things can get buried in the layers."],
  ["What are fossils?", "remains or marks of living things from long ago", ["rocks that glow in the dark", "tools used by hunters today", "pieces of broken glass"], "They are clues about life in the past."],
  ["Why do the layers in a rock help scientists?", "They give clues about how Earth looked in the past", ["They predict next week’s weather", "They show how many people live nearby", "They make the rock easy to paint"], "Each layer was laid down at a different time.", true],
  ["Which of these can suddenly and greatly change a landscape?", "an earthquake", ["a gentle breeze", "a light drizzle", "a slow-growing tree"], "Think of something that happens fast and with great force."],
  ["What happens when a volcano erupts?", "Hot lava flows out and cools into new rock", ["Rivers turn to sand", "Glaciers freeze the lava forever", "Wind makes all the ground flat"], "Lava is melted rock from deep in Earth.", true],
  ["What is a landslide?", "a sudden slide of rock and soil down a slope", ["a slow walk along a beach", "a very tall ocean wave", "a gentle snowfall"], "Gravity pulls loose rock and soil downhill."],
  ["A strong storm with huge waves cuts away part of a sandy dune in one night. Is this a slow or a sudden change?", "a sudden change", ["a slow change", "no change at all", "a change that takes millions of years"], "It happened in a short time.", true],
];

export const peErosion4 = bankUnit({
  id: "pe-erosion-4",
  title: "Wind, Water, Ice",
  emoji: "🏞️",
  blurb: "How land wears away",
  parentNote: "Children learn how wind, water and ice change the landscape, how soil forms from rocks, and which natural events cause sudden changes.",
  standards: ["Space and Earth Science: Rocks, Minerals, and Erosion", "weathering and erosion by wind, water and ice, soil formation and sudden landscape changes"],
  items: EROSION,
});

const MINERALS: Q[] = [
  ["Which one is a mineral?", "salt", ["granite", "sandstone", "soil"], "A mineral is one natural, non-living substance. Granite and sandstone are mixes."],
  ["What is a rock?", "a natural solid made of one or more minerals", ["a living thing that grows slowly", "a man-made block", "a liquid that hardens in a cup"], "Many rocks are mixtures of different minerals."],
  ["What is a mineral?", "a natural, non-living solid with the same makeup all the way through", ["a living plant", "a mix of many rocks", "a kind of soil"], "A mineral is one substance, not a mixture."],
  ["Granite is made of quartz, feldspar and mica. Is granite a rock or a mineral?", "a rock", ["a mineral", "a living thing", "a metal alloy"], "It is a mixture of several minerals."],
  ["Quartz is made of one substance all the way through. Is it a rock or a mineral?", "a mineral", ["a rock", "a living thing", "a kind of soil"], "A mineral is not a mixture."],
  ["Which of these is a physical property of a rock?", "its colour", ["its price in a store", "who found it", "the year it was named"], "A physical property is something you can see or feel."],
  ["Which tool helps you see the tiny details on a rock?", "a magnifying glass", ["a thermometer", "a ruler", "a stopwatch"], "It makes small things look bigger."],
  ["A rock feels gritty like sandpaper. Which property is that?", "texture", ["lustre", "streak", "magnetism"], "Texture is how something feels when you touch it."],
  ["A mineral shines like a metal. Which property is that?", "lustre", ["texture", "hardness", "smell"], "Lustre is how a mineral shines in the light."],
  ["Which mineral is the softest and can be scratched with a fingernail?", "talc", ["quartz", "diamond", "granite"], "Talc is used in powders because it is so soft."],
  ["Which is the hardest natural mineral?", "diamond", ["talc", "gypsum", "salt"], "It can scratch every other mineral."],
  ["You scratch a mineral with a steel nail and it leaves a mark. What does that tell you about its hardness?", "The mineral is softer than the nail", ["The mineral is harder than the nail", "The mineral is magnetic", "The mineral is a rock"], "The harder thing makes the scratch.", true],
  ["Which test tells you if a mineral is magnetic?", "holding a magnet near it", ["weighing it", "smelling it", "looking at it in the dark"], "A magnet will pull on a magnetic mineral."],
  ["Which property are you checking when you rub a mineral on a white tile and see a coloured mark?", "streak", ["lustre", "texture", "size"], "Streak is the colour of the powder a mineral leaves."],
  ["Sort these rocks: A is grey and rough, B is grey and smooth, C is red and rough. Which two are alike in texture?", "A and C", ["A and B", "B and C", "all three"], "Look only at how they feel, not their colour.", true],
  ["Which of these is a good way to classify rocks?", "by colour, texture and hardness", ["by which one you like most", "by how old your family is", "by the shop where you bought them"], "Use properties you can observe and measure."],
  ["Why do we put rock observations in a chart?", "so we can compare them easily", ["so the rocks stay clean", "so the rocks cannot move", "so the rocks become heavier"], "A chart puts facts side by side."],
  ["Two students sort the same rocks and get different groups. Why might this happen?", "They may choose different properties to sort by", ["One of them is wrong about every rock", "Rocks change when sorted", "Sorting always gives the same groups"], "Many sorting methods can make sense.", true],
  ["A chart shows Rock 1 is hard and grey, Rock 2 is soft and white, Rock 3 is hard and white. Which rock is soft?", "Rock 2", ["Rock 1", "Rock 3", "None of them"], "Find the row that says soft."],
  ["A chart shows Rock 1 is hard and grey, Rock 2 is soft and white, Rock 3 is hard and white. Which rocks are hard?", "Rocks 1 and 3", ["Rocks 1 and 2", "Rocks 2 and 3", "Only Rock 2"], "Read down the hardness column."],
  ["Why is copper used in electrical wires?", "It lets electricity flow through it easily", ["It is very soft and white", "It floats on water", "It melts at room temperature"], "A property of the mineral matches its use."],
  ["Why are slate and some other hard rocks used for roofs and floors?", "They are hard and wear slowly", ["They are soft and crumbly", "They dissolve in rain", "They glow at night"], "A building material has to last."],
  ["What is graphite, a soft grey mineral, used for?", "the writing part of a pencil", ["building bridges", "making windows", "growing crops"], "It leaves a dark mark on paper."],
  ["Which mineral do we add to food for flavour?", "salt", ["talc", "graphite", "copper"], "We shake it onto our meals."],
  ["Sand is made mostly of tiny bits of quartz. What is it used to make?", "glass", ["pencils", "wire", "paper"], "Heat melts the sand into something clear."],
  ["Why is gold used for jewellery?", "It is shiny and does not rust", ["It is very soft and dull", "It is magnetic", "It crumbles in water"], "Match the property to the use.", true],
  ["What is a positive effect of using rocks and minerals?", "They give us building materials and tools", ["They always make air cleaner", "They never run out", "They grow into new plants"], "Think about what we make from them."],
  ["What is a negative effect of mining?", "It can damage habitats and leave scars on the land", ["It always makes new habitats", "It makes the soil richer everywhere", "It helps animals find food"], "Digging up land changes the places where animals live."],
  ["Which is a negative effect of using up rocks and minerals?", "Some of them take millions of years to form and can run short", ["They get younger", "They begin to grow back overnight", "They turn into plants"], "They are not made again quickly.", true],
  ["You collect rocks on a beach. How can you show respect for the habitat?", "Take only a few and leave nests and plants alone", ["Dig up the dunes for the best ones", "Take every rock you see", "Chase the birds away"], "Leave things as you found them for the animals that live there."],
  ["Before you collect rocks on someone’s land, what should you do?", "Ask permission first", ["Sneak in at night", "Take as much as you can carry", "Break the fence"], "Land belongs to someone, and we respect it."],
];

export const peMinerals4 = bankUnit({
  id: "pe-minerals-4",
  title: "Rocks vs. Minerals",
  emoji: "💎",
  blurb: "Properties and uses",
  parentNote: "Children tell rocks from minerals, describe and classify them by their properties, and link their properties to how people use them.",
  standards: ["Space and Earth Science: Rocks, Minerals, and Erosion", "telling rocks from minerals, classifying them by properties and how they are used"],
  items: MINERALS,
});

const HABITAT: Q[] = [
  ["What is a habitat?", "the place where a plant or animal finds what it needs to live", ["a toy for a pet", "a kind of weather", "a very tall building"], "It gives food, water, shelter and space."],
  ["A pond has 20 frogs. What do we call all the frogs together?", "a population", ["a community", "a habitat", "a food"], "A population is one kind of living thing in a place."],
  ["What is a community in a habitat?", "all the populations of plants and animals living there", ["only the biggest animal", "the soil under the pond", "a group of people in a town"], "It means every kind of plant and animal that shares the place."],
  ["In a meadow, there are 50 clover plants, 12 bees and 5 mice. Which word describes everything living in the meadow?", "community", ["population", "habitat only", "shelter"], "Count every kind of living thing together.", true],
  ["In that same meadow, there are 12 bees. Which word fits the bees?", "population", ["community", "weather", "soil"], "Bees are one kind of living thing."],
  ["Which is a good question to investigate at a local habitat?", "Which kinds of birds visit the pond?", ["Which ice cream is the best?", "Who is the fastest runner?", "How tall is a skyscraper?"], "A good question is about the plants and animals you can see there."],
  ["Which question about a habitat can you answer by looking and counting?", "How many kinds of plants grow along the path?", ["Why is the sky blue on Mars?", "What did a dinosaur eat for lunch?", "How far is the moon?"], "You can answer it by going outside and observing."],
  ["Which question asks about the conditions where plants live?", "Do more plants grow in sun or in shade?", ["What is the capital of Canada?", "How do I spell habitat?", "How much does a bicycle cost?"], "Conditions include light, water and soil."],
  ["You want to know which insects live under logs. What is a good method?", "Look under logs carefully and record what you see", ["Guess based on a picture book", "Ask a friend to guess", "Wait and hope they appear"], "Observing is how scientists find answers."],
  ["Which method is best for finding out how many birds visit a feeder in a morning?", "Watch the feeder and keep a tally", ["Look at the feeder for one second", "Draw a picture of a bird", "Count the feeders in town"], "A tally keeps count as you watch."],
  ["A tally shows one group of five and three extra marks. How many animals were counted?", "8", ["5", "3", "35"], "Add 5 and 3."],
  ["Which tool would help you record what you see in a habitat?", "a table or chart", ["a toy car", "a kite", "a paint roller"], "A table keeps your observations organized."],
  ["A table has a column for the plant, a column for the place, and a column for how many. What is it used for?", "recording observations", ["telling a story", "baking bread", "cleaning the habitat"], "The table keeps your data in neat rows."],
  ["A bar graph shows robins 6, crows 4, gulls 9 and sparrows 3. Which bird was seen most?", "gull", ["robin", "crow", "sparrow"], "Find the tallest bar."],
  ["A bar graph shows robins 6, crows 4, gulls 9 and sparrows 3. Which bird was seen least?", "sparrow", ["robin", "crow", "gull"], "Find the shortest bar."],
  ["A bar graph shows robins 6, crows 4, gulls 9 and sparrows 3. How many more gulls than crows?", "5", ["4", "6", "13"], "Subtract 4 from 9."],
  ["A bar graph shows robins 6, crows 4, gulls 9 and sparrows 3. How many birds were counted in all?", "22", ["19", "13", "9"], "Add all four bars together.", true],
  ["Why might two classes get different counts at the same pond?", "They may look at different times or places", ["Ponds change when students come", "One class is always wrong", "Counting works differently for each class"], "Animals move, and people count differently."],
  ["Mia counted 12 insects and Jordan counted 15 in the same garden. What is a possible reason?", "They counted at different times of the day", ["The garden is not real", "Insects cannot be counted", "Mia is not allowed to count"], "Animals come and go.", true],
  ["Your class builds a model of a natural habitat in a tank. What could make it more realistic?", "Add plants, soil and a source of water", ["Add a toy robot only", "Remove all the plants", "Paint it all black"], "A model should have what real organisms need."],
  ["Your model habitat has no shelter for small animals. What could you add?", "rocks, logs or leaves to hide in", ["a loud speaker", "more sunlight and no plants", "a bright red lamp"], "Small animals hide to stay safe."],
  ["Which action helps conserve a habitat?", "staying on the trail when you walk", ["picking all the wildflowers", "leaving litter on the beach", "chasing animals for fun"], "Walking where others already walk protects plants."],
  ["Which of these would help a local habitat?", "putting garbage in a bin", ["throwing a bottle in a pond", "leaving a campfire burning", "digging up native plants"], "Waste can harm animals and plants."],
  ["How can a family help birds in their yard?", "plant native flowers and trees", ["use a lot of paint", "cut down every tree", "leave gates open for traffic"], "Native plants give food and shelter."],
  ["Why should we keep dogs away from nesting shorebirds on a beach?", "Nests and chicks can be disturbed or harmed", ["The dogs will get cold", "Birds make dogs lose their fur", "Beaches are only for people"], "Piping plovers nest on sandy beaches in the Atlantic region.", true],
  ["On PEI, European green crabs can uproot eelgrass in shallow water. Why is this a problem?", "Many animals use eelgrass beds for food and shelter", ["Crabs cannot swim", "Eelgrass is a kind of rock", "Green crabs are shy"], "Eelgrass is a habitat for many small animals.", true],
  ["A plant grows where it should not and crowds out native plants. What do we call that kind of living thing?", "an invasive species", ["a rock", "a pet", "a fossil"], "It came from somewhere else and spreads quickly.", true],
  ["Scientists study cliffs and beaches on PEI that wear away. Why is this a habitat issue?", "Animals and plants lose places to live", ["Rocks stop being rocks", "The tides go away", "Beaches become taller"], "A shrinking shore means smaller habitats.", true],
  ["Too much fertilizer washing into an estuary can cause a lot of green algae to grow. Why is this a problem?", "It can use up the oxygen that fish need", ["It makes the water too clear", "It gives fish a new home", "It makes the water freeze"], "Animals need oxygen in the water to breathe.", true],
];

export const peLocalHabitat4 = bankUnit({
  id: "pe-local-habitat-4",
  title: "Our Local Habitat",
  emoji: "🦌",
  blurb: "Study a habitat near you",
  parentNote: "Children study a local habitat by asking questions, observing, collecting data and showing results, and consider how their own actions affect habitats.",
  standards: ["Life Science: Habitats", "studying a local habitat: questions, observations, data and personal actions that conserve it"],
  items: HABITAT,
});

const ADAPT: Q[] = [
  ["What is an adaptation?", "a feature or behaviour that helps a living thing survive", ["a pet’s toy", "a kind of food", "a type of weather"], "It helps the animal or plant live in its habitat."],
  ["A polar bear has thick fur and a layer of fat. What does this help it do?", "stay warm in the cold", ["swim in warm water", "hide in tall grass", "run through the desert"], "Fur and fat keep body heat in."],
  ["A duck has webbed feet. How do they help?", "They push it through the water", ["They help it climb trees", "They help it dig tunnels", "They keep it dry in the sun"], "Think about a paddle."],
  ["Which feature helps a rabbit hear predators coming?", "long ears", ["a short tail", "soft whiskers", "small teeth"], "Big ears catch quiet sounds."],
  ["An owl hunts at night. Which feature helps it?", "large eyes that see in dim light", ["webbed feet", "a thick shell", "bright red feathers"], "Night hunters need to see in the dark."],
  ["Compare a heron and a robin. Which has longer legs for wading in shallow water?", "heron", ["robin", "both the same", "neither"], "Wading birds have long legs to stand in water."],
  ["Compare a hawk’s beak and a duck’s beak. Which is hooked for tearing meat?", "hawk", ["duck", "both the same", "neither"], "Hunters have strong, sharp beaks."],
  ["A squirrel buries nuts in autumn. Which basic need does this meet?", "food for the winter", ["water for the summer", "space to run", "air to breathe"], "It saves nuts to eat later."],
  ["Many geese fly south for the winter. What need does this behaviour help meet?", "finding food and warmth", ["finding a school", "making a new nest each day", "finding sand"], "Food can be hard to find when it is cold."],
  ["A bear sleeps through much of the winter. What is this behaviour called?", "hibernation", ["migration", "camouflage", "pollination"], "It saves energy when food is scarce."],
  ["A chameleon changes its colour to match leaves. How does this help it?", "It is harder for predators to see", ["It makes it taste better", "It helps it swim", "It makes it grow faster"], "Matching your background is called camouflage."],
  ["A snowshoe hare turns white in winter. How does this help it?", "It blends in with the snow", ["It makes it taller", "It helps it dig faster", "It keeps it dry"], "Hiding means staying alive."],
  ["A fish has gills. What do gills let it do?", "breathe underwater", ["fly through the air", "dig in sand", "hear sounds from far away"], "Fish take oxygen from the water."],
  ["Which animal is most likely to have thick fur, a layer of fat and small ears?", "one that lives in a very cold place", ["one that lives in a hot desert", "one that lives in a warm pond", "one that lives in a rainforest"], "Small ears lose less heat.", true],
  ["Which feature would help an animal in a hot, dry desert?", "being able to go a long time without water", ["thick fur and a layer of fat", "webbed feet for swimming", "gills for breathing"], "Water is hard to find there."],
  ["Which feature would help an animal live in a swamp?", "feet that spread out so it does not sink in mud", ["a thick fur coat", "very short legs and no feet", "wings that are too small to use"], "Wide feet spread out weight."],
  ["Imagine a planet covered by ocean. Which adaptation would help an animal living there?", "fins for swimming", ["long legs for running", "claws for climbing trees", "thick fur"], "Think about moving in water."],
  ["Imagine a habitat in a dark cave. Which feature would help an animal?", "a good sense of touch and hearing", ["bright colours for blending in", "huge wings", "thick white fur"], "It is hard to see in the dark.", true],
  ["A made-up habitat has very strong winds all year. Which plant feature would help?", "short, strong stems close to the ground", ["tall, thin stems", "big, flat leaves that catch wind", "stems that are weak and floppy"], "A low plant is not blown over.", true],
  ["A cactus has a thick stem. What does the stem do?", "stores water", ["catches insects", "floats on a pond", "keeps warm"], "Cactuses live where water is hard to find."],
  ["A water lily has wide leaves that float. Why is this helpful?", "The leaves stay on top where there is sunlight", ["The leaves sink to the bottom", "The leaves can walk", "The leaves hide from the sun"], "Plants need sunlight to make food."],
  ["A spruce tree has narrow needles and slanting branches. How does this help in snowy places?", "Snow slides off so branches do not break", ["It keeps the tree from growing", "It makes the tree bright pink", "It helps the tree walk away"], "Shapes can protect the tree."],
  ["Plants on a forest floor often have wide, thin leaves. Why?", "They catch as much dim light as they can", ["They want to be seen", "They like to be wet", "They help animals dig"], "Little light reaches the ground."],
  ["Plants on a sandy dune often have long roots. How does that help?", "They reach water deep in the sand and hold it in place", ["They let the plant float away", "They make the sand wet", "They scare away the wind"], "Roots anchor and drink.", true],
  ["Which colour would help a mouse hide on brown dry leaves?", "brown", ["bright orange", "bright blue", "bright pink"], "Matching the background makes you harder to see."],
  ["You put coloured paper dots on a green lawn. Which colour will be easiest to find?", "bright red", ["green", "dark green", "light green"], "Colours that stand out are easy to see.", true],
  ["A bright-coloured frog can warn predators. What does a bright colour tell you about visibility?", "It is easy to see", ["It is invisible", "It is the hardest to see", "It makes the frog silent"], "Bright colours stand out."],
  ["Farmers use scientists’ knowledge of plant growth to grow more food. Which is an example?", "growing plants in a greenhouse", ["painting the plants", "talking to the seeds", "burying plants upside-down"], "A greenhouse helps plants grow in cool weather."],
  ["Which farming technique uses what we know about how plants grow?", "rotating crops in different years", ["leaving fields empty for ever", "never planting seeds", "using only plastic plants"], "Planting different crops can keep soil healthy.", true],
  ["How can a technology help a natural habitat?", "A fish ladder helps fish swim past a dam", ["A new road through a nesting area", "A spill of oil into a river", "More litter in a pond"], "Think about something that makes life easier for animals."],
  ["How can a technology harm a natural habitat?", "A road cuts through a forest and splits animal homes", ["A wildlife crossing bridge", "A clean-up machine for a beach", "A nest box for birds"], "Some things we build take away places to live.", true],
];

export const peAdaptations4 = bankUnit({
  id: "pe-adaptations-4",
  title: "Built to Survive",
  emoji: "🦎",
  blurb: "Adaptations and habitats",
  parentNote: "Children compare external features and behaviours of animals and plants and link them to how they meet their needs in their habitats.",
  standards: ["Life Science: Habitats", "structural and behavioural adaptations of animals and plants in different habitats"],
  items: ADAPT,
});

// ---------------------------------------------------------------------------------------------------------------------
// Social studies: Exploration

const WHAT_IS: Q[] = [
  ["What does exploration mean?", "travelling to find out about new places or ideas", ["staying home to rest", "buying things in a store", "cleaning a room"], "Explorers want to discover what is out there."],
  ["Which of these is exploration?", "Mapping a part of the ocean floor no one has seen", ["Watching the same show again", "Eating lunch at your desk", "Folding the laundry"], "Look for something new being discovered."],
  ["Which of these can people explore?", "land, ocean, space and ideas", ["only their own street", "only things in a store", "only things they already know"], "There is a lot to discover in many places."],
  ["Exploring land means…", "travelling over places on Earth to learn about them", ["flying to the Moon", "diving under the sea", "solving a word puzzle"], "Land is the ground we walk and live on."],
  ["Exploring the ocean means…", "studying or travelling through the sea to learn about it", ["hiking up a hill", "building a rocket", "reading a story"], "Ocean explorers go by ship or under the waves."],
  ["Exploring space means…", "learning about planets, moons and stars", ["digging in a garden", "sailing a canoe", "counting your pets"], "Space is beyond Earth’s air."],
  ["Exploring ideas means…", "asking questions and testing new ways to understand things", ["never asking why", "copying a picture", "sleeping late"], "Thinking and testing can be a kind of exploring."],
  ["A team uses a submarine to study the deep sea. Which kind of exploration is this?", "ocean", ["land", "space", "ideas"], "A submarine travels under water."],
  ["A rover is sent to study rocks on Mars. Which kind of exploration is this?", "space", ["ocean", "land on Earth", "history"], "Mars is a planet beyond Earth."],
  ["A hiker follows a river through a forest that is not on any map. Which kind of exploration is this?", "land", ["ocean", "space", "ideas"], "The hiker is travelling on the ground."],
  ["A student asks why and does an experiment to find out. Which kind of exploration is this?", "exploring ideas", ["exploring space", "exploring the ocean", "exploring land"], "She is testing an idea.", true],
  ["What is an explorer?", "a person who travels to learn about new places or ideas", ["a person who sells maps in a shop", "a person who stays in one town", "a person who builds houses"], "Explorers go out and find things out."],
  ["Which word means to travel to an unknown place to learn about it?", "explore", ["decorate", "forget", "complain"], "It is the root of the word exploration."],
  ["Which tool helps an explorer find the way?", "a compass", ["a pillow", "a spoon", "a paintbrush"], "Its needle points north."],
  ["Which tool helps people see far-away stars?", "a telescope", ["a ruler", "a bicycle", "a thermometer"], "It makes faraway things look closer."],
  ["Which vehicle would help an ocean explorer travel deep under the sea?", "a submarine", ["a bicycle", "a hot air balloon", "a skateboard"], "It is made to go under water."],
  ["Which vehicle carries explorers into space?", "a rocket", ["a sailboat", "a bus", "a canoe"], "It has to be very powerful to leave Earth."],
  ["Which is an example of exploring the ocean?", "diving to study a shipwreck", ["hiking up a hill", "launching a satellite", "doing a maths puzzle"], "Look for something that happens in the sea."],
  ["Which is an example of exploring land?", "following a river to find where it begins", ["building a telescope", "diving to a coral reef", "reading about an idea"], "The explorer is walking or paddling across the land."],
  ["Which is an example of exploring an idea?", "an inventor trying out a new kind of machine", ["a crew sailing a ship", "a hiker crossing a desert", "a rocket leaving Earth"], "The inventor is testing something new in the mind and the workshop.", true],
  ["Does someone who walks the same path to school every day count as an explorer?", "Not usually, because they already know the path", ["Yes, every walk is exploring", "Yes, because walking is exploring", "Only when it rains"], "Exploring is about finding something new.", true],
  ["Why do people explore?", "to learn new things and find out what is out there", ["so that nothing ever changes", "to stay in one place", "to avoid anything new"], "Curiosity is a big reason."],
  ["How can exploration help people?", "It can lead to new knowledge, tools and maps", ["It makes people forget what they know", "It stops people from learning", "It makes all places the same"], "People discover things they can share."],
  ["Why do explorers need to take care and plan?", "to stay safe and protect the places they visit", ["so they can break things", "so they can go faster", "so no one finds them"], "Good planning helps explorers and the places they visit."],
  ["How do maps help exploration?", "They record what explorers found", ["They stop explorers from travelling", "They are only for decoration", "They tell the weather on the Moon"], "Maps share what has been discovered."],
  ["Exploring space is different from exploring land because…", "it takes place beyond Earth", ["it happens only in forests", "it needs no equipment", "it happens only in winter"], "Space begins above Earth’s air.", true],
  ["Many Mi’kmaq people have deep knowledge of Epekwitk, the Mi’kmaw name for Prince Edward Island. How did this knowledge grow?", "from living on and caring for the land over many generations", ["from one short trip", "from a single guidebook", "from watching the news"], "Knowing a place well takes time.", true],
  ["Why does exploration still matter today?", "We keep learning about Earth and beyond", ["Everything is already known", "Nothing is left to discover", "It stops us from asking questions"], "There is still a lot to find out."],
  ["Which sentence is true?", "People can explore without leaving their own town", ["Exploring must always be far away", "Exploring needs a spaceship", "Exploring has to happen on a boat"], "A pond or forest nearby can have new things to find.", true],
];

export const peWhatIsExploration4 = bankUnit({
  id: "pe-what-is-exploration-4",
  title: "What Is Exploration?",
  emoji: "🧭",
  blurb: "Why people explore",
  parentNote: "Children explore what exploration means, and what it means to explore land, ocean, space and ideas.",
  standards: ["4.1.1", "the concept of exploration"],
  items: WHAT_IS,
});

const EXPLORERS: Q[] = [
  ["Who was the first human to travel into space, in 1961?", "Yuri Gagarin", ["Neil Armstrong", "Roberta Bondar", "Chris Hadfield"], "He flew once around Earth in Vostok 1."],
  ["Who walked on the Moon in 1969?", "Neil Armstrong", ["Yuri Gagarin", "Jacques Cartier", "Alexander Mackenzie"], "He was part of the Apollo 11 mission."],
  ["Roberta Bondar was the first Canadian woman to do what?", "travel into space", ["sail around the world", "cross the Atlantic by canoe", "walk to the North Pole"], "She flew in 1992."],
  ["In 1992, Roberta Bondar flew on which spacecraft?", "the space shuttle Discovery", ["Vostok 1", "the Beagle", "a sailing canoe"], "It was a reusable spacecraft."],
  ["Chris Hadfield was the first Canadian to do what in 2013?", "command the International Space Station", ["land on the Moon", "sail around the world", "reach the South Pole"], "He was in charge of the crew in orbit."],
  ["Jacques Cartier sailed in 1534 and explored which waters?", "the Gulf of St. Lawrence", ["the Indian Ocean", "the Gulf of Mexico", "the Mediterranean Sea"], "PEI lies in these waters."],
  ["From which country did Jacques Cartier sail in 1534?", "France", ["Japan", "Brazil", "Australia"], "He crossed the Atlantic Ocean to reach North America."],
  ["Jacques Cartier travelled mostly by ship. What did he explore?", "coasts and waters", ["the Moon", "the inside of a volcano", "the stars"], "Ships travel on the sea."],
  ["Which explorer crossed North America by land to the Pacific Ocean in 1793?", "Alexander Mackenzie", ["Yuri Gagarin", "Galileo", "Chris Hadfield"], "He travelled by canoe and on foot."],
  ["Alexander Mackenzie travelled by canoe and on foot. What did he explore?", "land and rivers", ["outer space", "the deep sea", "old ideas"], "His trip was across the continent."],
  ["What did Galileo discover with a telescope in 1610?", "four moons that orbit Jupiter", ["a ring around Earth", "a new ocean", "water on the Moon"], "He looked at the planet Jupiter."],
  ["Which tool did Galileo use to explore the sky?", "a telescope", ["a submarine", "a canoe", "a snowshoe"], "It makes faraway things look closer."],
  ["Charles Darwin sailed on a ship called the Beagle. What did he study on his voyage?", "plants and animals", ["rocket engines", "ice at the poles", "the planets"], "He collected many living things."],
  ["Charles Darwin is an explorer of ideas because his studies of nature led to…", "a new way of understanding how living things change over time", ["a trip to the Moon", "a map of Canada", "a canoe trip across the continent"], "His book was published in 1859.", true],
  ["Which explorer travelled in space: Roberta Bondar or Alexander Mackenzie?", "Roberta Bondar", ["Alexander Mackenzie", "both of them", "neither of them"], "Think of the shuttle."],
  ["Which explorer travelled across land: Yuri Gagarin or Alexander Mackenzie?", "Alexander Mackenzie", ["Yuri Gagarin", "both of them", "neither of them"], "One of them went into orbit."],
  ["Which comes first in a trip to space?", "training and planning", ["landing back on Earth", "floating in orbit", "returning home"], "Astronauts prepare for years."],
  ["Which happened first on Cartier’s 1534 voyage?", "He sailed from France", ["He entered the Gulf of St. Lawrence", "He sailed back to France", "He reached Gaspé"], "A voyage starts at home.", true],
  ["On Mackenzie’s 1793 trip, which came last?", "He reached the Pacific Ocean", ["He set out from the Peace River area", "He paddled up a river", "He crossed land on foot"], "The Pacific was his goal.", true],
  ["What was Yuri Gagarin’s flight like?", "one trip around Earth in a spacecraft", ["a long walk on the Moon", "a trip across the sea by ship", "a climb up a mountain"], "It was the first time a person orbited Earth."],
  ["What did the Apollo 11 astronauts do in 1969?", "walked on the surface of the Moon", ["sailed across the Atlantic", "discovered a new ocean", "crossed a continent by canoe"], "They went much farther than any ship."],
  ["An astronaut on a space mission needs…", "a spacesuit and a spacecraft", ["a snowmobile", "a wooden canoe", "a fishing net"], "Space has no air to breathe."],
  ["What did Mackenzie’s travellers need for a long river and land trip?", "canoes, paddles and food", ["rocket fuel", "spacesuits", "a submarine"], "They travelled by water and on foot."],
  ["What did Cartier need to cross the Atlantic in 1534?", "ships, sailors and supplies", ["a rocket and fuel", "a spacesuit", "a snowmobile"], "It was a long trip over the ocean."],
  ["How were Gagarin’s and Bondar’s trips alike?", "Both travelled into space", ["Both sailed across the Atlantic", "Both walked on the Moon", "Both crossed the land by canoe"], "Neither of them walked on the Moon.", true],
  ["How was Cartier’s journey different from Armstrong’s?", "Cartier sailed on the ocean; Armstrong went to the Moon", ["Cartier went to the Moon; Armstrong sailed", "Both went to space", "Both sailed in 1534"], "One explored the sea, the other explored space.", true],
  ["Chris Hadfield lived and worked on a space station that orbits…", "Earth", ["Mars", "the Moon", "Jupiter"], "It circles our planet."],
  ["Which two explorers are Canadians who went into space?", "Roberta Bondar and Chris Hadfield", ["Yuri Gagarin and Neil Armstrong", "Galileo and Darwin", "Cartier and Mackenzie"], "Both are astronauts.", true],
  ["Which explorer sailed into the Gulf of St. Lawrence, where Prince Edward Island lies?", "Jacques Cartier", ["Alexander Mackenzie", "Galileo", "Neil Armstrong"], "He did this in 1534.", true],
];

export const peExplorers4 = bankUnit({
  id: "pe-explorers-4",
  title: "Explorers’ Stories",
  emoji: "⛵",
  blurb: "Explorers of land, sea and space",
  parentNote: "Children learn the stories of explorers of land, ocean, space and ideas.",
  standards: ["4.2.1", "stories of various explorers of land, ocean, space and ideas"],
  items: EXPLORERS,
});

const WHY: Q[] = [
  ["In 1534, Jacques Cartier’s voyage was meant to look for a passage to the Pacific and what else?", "precious metals", ["new songs", "strong mountains", "rare fish"], "Valuable goods were one reason for the trip."],
  ["Why did Alexander Mackenzie search for a route to the Pacific?", "He hoped to find a trade route", ["He wanted to visit the Moon", "He wanted to build a hockey rink", "He wanted to build a space station"], "Trade was an important goal."],
  ["Which is a reason people explore?", "curiosity about what is out there", ["to avoid learning", "to stay at home", "to forget things"], "Curiosity means wanting to know."],
  ["Why do scientists explore the deep ocean?", "to learn about living things we have not seen", ["to lose their maps", "to stay in one place", "to avoid new ideas"], "There are still many unknown places underwater."],
  ["Galileo looked at planets with a telescope because he wanted to…", "learn more about the sky", ["win a race", "find gold", "cross a desert"], "He wanted new knowledge."],
  ["Which motivation fits: a crew sails to find new trade routes and valuable goods?", "wealth and trade", ["curiosity about the Moon", "a wish to study animals", "a school project"], "Trade means buying and selling goods."],
  ["Which motivation fits: an astronaut studies how plants grow in space?", "to gain new knowledge", ["to trade goods", "to find gold", "to escape cold weather"], "She wants to learn something new."],
  ["A family leaves home to find land to farm. What motivates them?", "a wish for a better place to live", ["a space race", "a wish to see the Moon", "a plan to map the stars"], "People sometimes move to find new homes."],
  ["Which is a motivation for exploring space?", "to learn about planets and stars", ["to find new fishing spots", "to cross a desert", "to climb a tree"], "Space holds many things to learn."],
  ["What is one thing exploration has changed?", "Maps have become more detailed", ["Oceans have disappeared", "Mountains have moved", "The Moon has grown"], "Explorers bring back information for maps."],
  ["How can explorers’ maps help later travellers?", "They show routes and coasts to follow", ["They hide the best routes", "They remove dangers", "They stop travel"], "Maps pass along what was learned."],
  ["Which is a positive impact of exploration?", "People learn new facts about the world", ["People forget the old maps", "Fewer questions get asked", "Oceans become smaller"], "Discoveries add to what we know."],
  ["Which is a negative impact of exploration for many Indigenous peoples?", "In many places, newcomers brought new diseases and took land", ["Newcomers always asked permission", "Nothing changed for anyone", "Everyone became rich"], "Indigenous peoples already lived on and cared for the land.", true],
  ["Indigenous peoples lived in North America long before European explorers arrived. What does this tell us?", "The land was not empty; people already knew it well", ["No one lived here", "The explorers found the first people", "The land had no names"], "Many Nations had names for the places they lived.", true],
  ["Some places explorers wrote about were already home to people. Whose knowledge is also important?", "the people who already lived there", ["only the explorers", "only ship captains", "no one’s"], "Local people know the land best."],
  ["Which is a negative effect of exploration on the environment?", "Plants and animals brought to new places can crowd out local ones", ["New places never change", "Ships always clean the sea", "All forests grow faster"], "Invasive species can harm a habitat.", true],
  ["How does space exploration help people on Earth?", "Satellites help with weather forecasts and communication", ["Satellites make it rain", "Satellites hold up the Moon", "Satellites push the tides"], "Many satellites circle Earth."],
  ["An effect of exploration that lasts over time is one that…", "is still felt long after the trip", ["ends the same day", "happens only in space", "happens only in books"], "Over time means for years and years."],
  ["Which effect of space exploration still helps us today?", "weather satellites that circle Earth", ["a bridge to the Moon", "a road to Mars", "a river on the Moon"], "They send back pictures of clouds."],
  ["The Gulf of St. Lawrence was drawn on maps after voyages like Cartier’s. How does this help sailors later?", "They can plan safer routes", ["They can skip the sea", "They can sail on land", "They can ignore maps"], "A good map warns of coasts."],
  ["Roberta Bondar did over 40 experiments in space. Why?", "to learn how space affects living things and people", ["to find gold", "to draw a map of Canada", "to win a race"], "Her work added to science.", true],
  ["Mackenzie’s 1793 trip was not a practical trade route. What did it still do?", "It showed Europeans a way across the continent by land", ["It made the Pacific disappear", "It found the Moon", "It built a bridge"], "It was the first known crossing north of Mexico by Europeans.", true],
  ["Which statement about exploration is true?", "It can have both good and bad effects", ["It only has good effects", "It only has bad effects", "It has no effects"], "People can be helped and harmed."],
  ["How can explorers show respect to people who already live in a place?", "ask permission and listen", ["ignore them", "take what they like", "keep everything secret"], "Respect means asking and listening."],
  ["What motivated many sailors to cross the Atlantic in the 1500s?", "trade, wealth and curiosity", ["a wish to see the Moon", "a space race", "a love of video games"], "They wanted valuable goods and new knowledge."],
  ["Which story fits the motive of gaining knowledge?", "Darwin studied plants and animals on a long voyage", ["A crew hunts for gold only", "A crew sails to win a prize", "A family moves to find farm land"], "Darwin wanted to understand nature."],
  ["Why do people keep exploring today?", "to solve problems and learn about the planet", ["because everything is known", "to avoid new ideas", "to stay in one place"], "There is still so much to learn."],
  ["How did Galileo’s observation of Jupiter’s moons change ideas?", "It helped show that not everything in the sky goes around Earth", ["It proved the sky is empty", "It showed Earth is flat", "It showed there is no Sun"], "Moons going around Jupiter was a surprise.", true],
  ["Compare Cartier’s voyage with the Apollo 11 mission. What was different about the places they explored?", "Cartier explored coasts and waters; Apollo 11 explored the Moon", ["Both explored the same ocean", "Both explored the Moon", "Both explored a river"], "One was on Earth and one was beyond it.", true],
];

export const peWhyExplore4 = bankUnit({
  id: "pe-why-explore-4",
  title: "Why Explore?",
  emoji: "🚀",
  blurb: "What drives exploration",
  parentNote: "Children look at what motivates exploration, and the effects of exploration over time.",
  standards: ["4.2.2; 4.2.3", "motivations for exploration and its impact over time"],
  items: WHY,
});

// ---------------------------------------------------------------------------------------------------------------------
// Social studies: Exploring our world

const FEATURES: Q[] = [
  ["Which is the largest ocean on Earth?", "the Pacific Ocean", ["the Atlantic Ocean", "the Indian Ocean", "the Arctic Ocean"], "It covers more of Earth than any other ocean."],
  ["Which ocean lies on the east side of Canada, near Prince Edward Island?", "the Atlantic Ocean", ["the Pacific Ocean", "the Indian Ocean", "the Arctic Ocean"], "PEI is in the Atlantic region."],
  ["Which ocean lies north of Canada, near the North Pole?", "the Arctic Ocean", ["the Indian Ocean", "the Pacific Ocean", "the Southern Ocean"], "Its name tells you where it is."],
  ["How many continents are there?", "seven", ["five", "nine", "twelve"], "Think of North America, South America, Europe, Asia, Africa, Australia and Antarctica."],
  ["Canada is part of which continent?", "North America", ["Asia", "Europe", "Africa"], "Its neighbour to the south is on the same continent."],
  ["Which is the highest mountain above sea level?", "Mount Everest", ["Mount Fuji", "Mont Blanc", "Mount Kilimanjaro"], "It is in the Himalayas."],
  ["Which mountain range holds Mount Everest?", "the Himalayas", ["the Rocky Mountains", "the Alps", "the Appalachians"], "It is in Asia."],
  ["Which river flows through Egypt?", "the Nile", ["the Amazon", "the St. Lawrence", "the Danube"], "Egypt is in Africa."],
  ["Which river carries more water than any other river in the world?", "the Amazon", ["the Nile", "the Thames", "the St. Lawrence"], "It flows through a rainforest in South America."],
  ["Which is the largest island in the world?", "Greenland", ["Prince Edward Island", "Iceland", "Hawaii"], "It is in the north, near Canada."],
  ["Prince Edward Island is an island in which gulf?", "the Gulf of St. Lawrence", ["the Gulf of Mexico", "the Persian Gulf", "the Gulf of Alaska"], "PEI lies south of the Gulf’s big channel."],
  ["What is a river?", "a stream of fresh water that flows toward a lake or the sea", ["a body of salt water", "a tall pile of rock", "a flat dry desert"], "Rivers move along."],
  ["Where does a river start?", "at its source, often in higher ground", ["at its mouth", "in the middle of the sea", "in the sky"], "Water begins up high and flows down."],
  ["What is the place where a river meets the sea called?", "its mouth", ["its source", "its peak", "its shore"], "Think about where it empties out."],
  ["In which direction does a river flow?", "downhill", ["uphill", "in circles", "only in winter"], "Water flows from high to low land."],
  ["What is an island?", "land with water all around it", ["water with land all around it", "a mountain in the clouds", "a river bank"], "Islands are surrounded by water."],
  ["Which of these is an island?", "Prince Edward Island", ["the Rocky Mountains", "the Nile", "the Pacific Ocean"], "The name has the answer in it."],
  ["How is an island different from a continent?", "An island is much smaller", ["An island has no land", "An island is bigger", "An island has no water around it"], "Continents are the largest bodies of land."],
  ["What is a mountain?", "a very high landform with steep sides and a peak", ["a flat plain by the sea", "a deep valley", "a place with water all around"], "Mountains rise high above land around them."],
  ["A group of mountains joined in a line is called…", "a mountain range", ["a river basin", "an island chain", "a lake shore"], "The Rocky Mountains are one."],
  ["Which mountain range lies in the west of Canada?", "the Rocky Mountains", ["the Himalayas", "the Andes", "the Alps"], "It has “Rocky” in its name."],
  ["What is the air like at the top of a very high mountain?", "cold", ["hot", "always warm", "the same as at the beach"], "It gets colder as you climb."],
  ["What is an ocean?", "a huge body of salt water", ["a small pond of fresh water", "a river of ice", "a dry desert"], "Oceans are very large."],
  ["Is ocean water fresh or salty?", "salty", ["fresh", "sweet", "sandy"], "You can taste it at the beach."],
  ["About how much of Earth’s surface is covered by ocean water?", "about 70 per cent", ["about 10 per cent", "about 30 per cent", "about 100 per cent"], "More than half of Earth is ocean."],
  ["Which feature is this: a body of land with water all around it?", "an island", ["a mountain", "a river", "an ocean"], "Think of Prince Edward Island."],
  ["Which feature is this: a huge body of salt water that covers much of Earth?", "an ocean", ["an island", "a river", "a mountain"], "It is salty and very large."],
  ["On a world map, which ocean lies between North America and Europe?", "the Atlantic Ocean", ["the Pacific Ocean", "the Indian Ocean", "the Southern Ocean"], "Ships cross it to get from one to the other."],
  ["On a world map, what does the colour blue usually show?", "water", ["mountains", "cities", "borders"], "Look at the map’s key."],
  ["How is a river different from an ocean?", "A river is a stream of fresh water; an ocean is a huge body of salt water", ["A river is bigger than an ocean", "They are exactly the same", "A river is made of ice"], "Compare the size and the water.", true],
  ["How is a mountain different from an island?", "A mountain is a high landform; an island is land surrounded by water", ["A mountain is always in the sea", "An island is always on a peak", "They are the same thing"], "One is about height; the other is about water.", true],
  ["The deepest known part of Earth’s oceans, the Mariana Trench, is in which ocean?", "the Pacific Ocean", ["the Atlantic Ocean", "the Arctic Ocean", "the Indian Ocean"], "It is also the largest ocean.", true],
];

export const peWorldFeatures4 = bankUnit({
  id: "pe-world-features-4",
  title: "Earth’s Big Features",
  emoji: "🌍",
  blurb: "Mountains, rivers, islands, oceans",
  parentNote: "Children examine major physical features of the world and describe rivers, islands, mountains and oceans.",
  standards: ["4.3.1; 4.3.2", "major physical features of the world and the characteristics of rivers, islands, mountains and oceans"],
  items: FEATURES,
});

const PEOPLE_LAND: Q[] = [
  ["Why do many towns grow near rivers or coasts?", "Water helps with food, travel and trade", ["Rivers are always dry", "Coasts have no land", "Water makes buildings fall"], "People need water and ways to travel."],
  ["Why do fewer people live on tall, steep mountains?", "It is hard to build, farm and travel there", ["Mountains have no air", "Mountains are underwater", "Mountains are too flat"], "Steep land is hard to use."],
  ["Flat land with rich soil is good for…", "farming", ["skiing", "deep-sea diving", "mining"], "Crops grow best in good soil."],
  ["Why is farming common on Prince Edward Island?", "The soil is rich and the land is gently rolling", ["The land is all mountains", "It has no soil", "It is always frozen"], "PEI is known for crops like potatoes."],
  ["How can cold winters change how people live?", "People dress warmly and heat their homes", ["People live in the water", "People stop using roofs", "People never go outside"], "The weather decides what we wear."],
  ["In a hot, dry place, how might people build their homes?", "to keep out the heat", ["with no roofs", "with only glass walls", "underwater"], "Shade and thick walls can help."],
  ["Where there is heavy snow, how might people travel?", "on skis, snowshoes or snowmobiles", ["by canoe only", "by hot air balloon only", "by surfboard"], "Snow is easier to cross with the right gear."],
  ["People who live by the ocean may work as…", "fishers", ["wheat farmers", "mountain guides", "ski patrollers"], "The sea gives them a way to earn a living."],
  ["Lobster fishing is a job on Prince Edward Island. How does the land and sea affect this job?", "The Island is surrounded by water where lobsters live", ["The Island is a desert", "The Island is far from the sea", "The Island has no boats"], "Where people live shapes their work.", true],
  ["Which job is more likely in a place with many forests?", "cutting and milling trees", ["deep-sea fishing", "growing wheat in the open", "mining diamonds"], "The land gives people resources."],
  ["How do people change the land?", "by building roads, farms and towns", ["by making mountains disappear", "by moving the ocean", "by stopping the wind"], "Look for something people can really do."],
  ["Building a farm often means…", "clearing trees and turning the land to fields", ["adding more mountains", "moving rivers uphill", "filling the sky with soil"], "Farmers change the land to grow food."],
  ["Which action helps the environment?", "planting trees", ["dumping garbage in a river", "leaving litter on a beach", "leaving a campfire burning"], "Trees help keep soil and air healthy."],
  ["Which action harms the environment?", "dumping garbage in a river", ["recycling bottles", "protecting dunes", "planting native flowers"], "Garbage hurts the animals and plants in the water."],
  ["How does recycling help the environment?", "It uses fewer new materials and makes less garbage", ["It makes more garbage", "It stops all rain", "It melts glaciers"], "Reusing things saves resources."],
  ["How does staying on the trails in a park help?", "It protects the plants and animals around the trail", ["It makes the park bigger", "It makes the trails disappear", "It scares away the clouds"], "Footprints can harm small plants."],
  ["A place with rich farmland and rolling hills is best for…", "farming", ["deep-sea fishing", "mining in mountains", "skiing"], "Match the land to the way people use it."],
  ["A busy port on the coast has many workers who…", "load and unload ships", ["grow wheat fields", "guide mountain climbers", "plant orchards"], "The location shapes the work."],
  ["A place with long, cold winters and deep snow might have many…", "snow-clearing machines and warm clothing shops", ["sunscreen stores", "beach umbrellas", "air conditioners"], "People prepare for their weather."],
  ["How does the Confederation Bridge change how people travel?", "People can drive on and off the Island", ["People can only fly", "It cuts the Island in half", "It stops all travel"], "It is 12.9 km long.", true],
  ["How can land that is eroding along the shore affect people on PEI?", "Some homes and roads near the water may be at risk", ["Nothing can ever change", "The Island gets bigger", "Rocks are made of sand"], "Wind and waves wear away the soft cliffs.", true],
  ["Mining digs up rocks and minerals. How can this affect the land?", "It can change the land and the habitats on it", ["It makes the land flatter and greener everywhere", "It never changes anything", "It makes new oceans"], "People use resources but also change the land.", true],
  ["How does the climate affect what a farmer can grow?", "Some crops need more warmth or water than others", ["All crops grow anywhere", "Climate has no effect", "Crops grow better in the dark"], "Plants need the right conditions."],
  ["People on a small island often use boats and bridges. Why?", "to cross the water", ["to dig tunnels", "to climb mountains", "to avoid land"], "Water is all around an island."],
  ["Why might a city be built where two rivers meet?", "It is easy to travel and trade by water", ["Rivers cannot be crossed", "It is far from water", "It has no land"], "Rivers were once the main roads.", true],
  ["Why do people build dams on rivers?", "to store water or make electricity", ["to make rivers flow uphill", "to make rivers disappear", "to melt snow"], "Dams hold back water.", true],
  ["How can people protect sand dunes?", "by walking on boardwalks and planting grass", ["by driving on them", "by digging them up", "by dumping garbage on them"], "Dune plants hold sand in place."],
  ["Which choice helps both people and the environment?", "using water carefully", ["leaving taps running", "cutting trees without planting any", "littering"], "Saving water is good for everyone."],
];

export const pePeopleAndLand4 = bankUnit({
  id: "pe-people-and-land-4",
  title: "People and Their Land",
  emoji: "🌾",
  blurb: "How people and land affect each other",
  parentNote: "Children examine the relationship between humans and the physical environment.",
  standards: ["4.3.3", "the relationship between humans and the physical environment"],
  items: PEOPLE_LAND,
});

// ---------------------------------------------------------------------------------------------------------------------
// Social studies: Exploring the landscapes of Canada

const CANADA_PEOPLE: Q[] = [
  ["What is the human landscape of a place?", "the things people have built and the ways they use the land", ["only the mountains and rivers", "only the weather", "only the animals"], "Cities, farms and roads are part of it."],
  ["Which of these is part of the human landscape?", "a highway", ["a mountain", "a river", "an ocean"], "Highways were built by people."],
  ["Which of these is part of the human landscape?", "a farm", ["a glacier", "a volcano", "a waterfall"], "Farms are made by people."],
  ["Where do most people in Canada live?", "in cities and towns", ["on farms only", "on mountains only", "on boats"], "Most Canadians live in towns and cities."],
  ["A community in Canada can be…", "a big city or a small village", ["only a big city", "only on the ocean", "only in the snow"], "Canada has many sizes of places."],
  ["Why do fewer people live in the far north of Canada?", "It is very cold, with a short growing season", ["It is a desert", "There is no land", "It is always hot"], "Long, cold winters make life harder there."],
  ["Many communities in the far north are small and far apart. How might people travel between them?", "by airplane or by snowmobile", ["by subway", "by cable car", "by ferry only"], "Roads are few across such a big area."],
  ["The Prairies are known for flat, open land. What do many people there do?", "farm and grow grain", ["fish for lobster", "run ski lifts", "harvest seaweed"], "Wide fields are good for crops."],
  ["Along the Atlantic coast, many people work in…", "fishing and ports", ["growing wheat", "mining ice", "herding mountain goats"], "The ocean is nearby."],
  ["In the Rocky Mountains, many people work in…", "tourism, such as hiking and skiing", ["lobster fishing", "wheat farming", "sugar-beet farming"], "People visit to see the mountains."],
  ["Near Canada’s Great Lakes and St. Lawrence River, there are many big cities. Why?", "Water helps with travel and trade, and the land is good for farming", ["The land is all ice", "There is no water", "It is all mountains"], "Rivers and lakes were roads for early travellers."],
  ["In a place with many forests, people may work in…", "cutting and milling trees", ["deep-sea fishing", "diving", "ski patrol"], "Trees give wood for building."],
  ["Which of these is a way people use the land in Canada?", "farming", ["flying", "swimming", "dreaming"], "Land can grow food."],
  ["Which of these is a way people use the land in Canada?", "mining", ["sailing", "singing", "fishing for stars"], "Mines take rocks and minerals out of the ground."],
  ["Forestry is…", "caring for forests and using trees for wood", ["growing wheat", "catching fish", "making maple syrup only"], "It is about forests."],
  ["Which job is most likely in a Prairie community?", "growing wheat or canola", ["fishing for lobster", "diving for pearls", "guiding glacier tours"], "Open farmland is good for large crops."],
  ["Which job is most likely on the Atlantic coast?", "fishing for lobster or other seafood", ["growing wheat on wide plains", "running a ski lift", "farming sugar beets in the Arctic"], "Think about the ocean nearby."],
  ["Indigenous peoples live in communities across Canada. Where might they live today?", "in cities, towns and smaller communities", ["only in one place", "only in the far north", "nowhere"], "Their communities are alive and growing.", true],
  ["Compare Prince Edward Island and the Prairies. What is one way they are alike?", "Farming is important in both", ["Both have tall mountain ranges", "Both are in the far north", "Both are surrounded by ocean"], "Both have fertile land.", true],
  ["Compare the Atlantic region and the Prairies. What is a big difference?", "The Atlantic region has coastlines; the Prairies are far from the sea", ["The Prairies have tall waves", "The Atlantic region has no water", "They are exactly alike"], "Look at the map.", true],
  ["Which part of Canada is known for the Canadian Shield’s lakes, forests and rocks?", "the middle and north of the country", ["the Atlantic islands only", "the Prairie plains only", "the Pacific coast only"], "The Canadian Shield covers about half of the country.", true],
  ["Why might people in the north build homes that are well heated?", "Winters are long and very cold", ["Summers are always snowy", "The air is always warm", "There are no winds"], "People prepare for their climate."],
  ["Which is a feature of the human landscape on an island?", "a bridge", ["a tide", "a cliff", "a beach"], "A bridge is built by people."],
  ["Which is the best example of a human feature on Prince Edward Island?", "the Confederation Bridge", ["the red sandstone cliffs", "the sand dunes", "the Gulf of St. Lawrence"], "People built it in the 1990s."],
  ["Which of these is NOT a human feature?", "a river", ["a road", "a farm", "a town"], "Nature, not people, made it."],
  ["A railway connects towns across the country. How does this help people?", "They can travel and move goods", ["It stops trade", "It makes towns disappear", "It cuts off roads"], "Railways were built to link places."],
  ["Why do farms spread out across large areas of the Prairies?", "There is lots of flat land for crops", ["There are mountains everywhere", "It is a harbour", "It is ice all year"], "Flat land suits large machines."],
  ["What is a harbour?", "a sheltered place where ships can stop", ["a place for growing wheat", "a mountain pass", "a snowy road"], "Boats stay safe there."],
  ["People in Canada’s cities often work in…", "stores, offices, schools and hospitals", ["only farms", "only mines", "only the ocean"], "Cities have many kinds of jobs."],
  ["How does the land affect where people build towns?", "People often build near water, flat land and resources", ["People build only on the highest peaks", "People build only in the middle of oceans", "People avoid water"], "Towns grow where life is easier.", true],
];

export const peCanadaPeople4 = bankUnit({
  id: "pe-canada-people-4",
  title: "People of Canada’s Landscape",
  emoji: "🏘️",
  blurb: "Human landscape of Canada",
  parentNote: "Children examine the human landscape of Canada, including where people live and what they do.",
  standards: ["4.4.2", "the human landscape of Canada"],
  items: CANADA_PEOPLE,
});

const CANADA_MAP: Q[] = [
  ["How many provinces does Canada have?", "ten", ["seven", "thirteen", "three"], "Prince Edward Island is one of them."],
  ["How many territories does Canada have?", "three", ["ten", "five", "one"], "They are in the north."],
  ["How many provinces and territories does Canada have in all?", "thirteen", ["ten", "three", "twenty"], "Add ten provinces and three territories."],
  ["Prince Edward Island is a…", "province", ["territory", "country", "continent"], "It is one of Canada’s ten provinces."],
  ["Canada is a…", "country", ["province", "territory", "city"], "It has provinces and territories inside it."],
  ["Which city is the capital of Canada?", "Ottawa", ["Charlottetown", "Washington", "London"], "The federal government meets there."],
  ["Which city is the capital of Prince Edward Island?", "Charlottetown", ["Ottawa", "Summerside", "Cavendish"], "It is on the south shore of the Island."],
  ["Where does the provincial government of Prince Edward Island meet?", "Province House in Charlottetown", ["Parliament in Ottawa", "a school in Summerside", "the Confederation Bridge"], "It is a historic building."],
  ["A 1864 meeting in Charlottetown helped lead to Confederation. What was it called?", "the Charlottetown Conference", ["the Ottawa Parade", "the Island Games", "the Bridge Meeting"], "It took place at Province House.", true],
  ["Which government makes laws for the whole country?", "the federal government", ["a school board", "a town council", "a family"], "It meets in Ottawa."],
  ["Who leads the federal government?", "the Prime Minister", ["the Premier", "the Mayor", "the principal"], "The title begins with “Prime”."],
  ["Who leads the government of a province?", "the Premier", ["the Prime Minister", "the principal", "the lighthouse keeper"], "Each province has its own leader."],
  ["Which government looks after local things like parks and garbage pickup?", "a town or city government", ["the United Nations", "a school club", "a hockey team"], "It is the government closest to your home."],
  ["The territories are located in…", "the north of Canada", ["the south of Canada", "the middle of the Atlantic Ocean", "the far east of Canada"], "They are far from Prince Edward Island."],
  ["What is one difference between a province and a territory?", "Provinces get their powers from the Constitution; territories get theirs from the federal government", ["Territories are not part of Canada", "Provinces have no government", "Territories are in the south only"], "Both have their own governments.", true],
  ["Which direction is the Pacific Ocean from Prince Edward Island?", "west", ["east", "north", "south"], "Look at a map of Canada."],
  ["Which ocean is on the east side of Canada?", "the Atlantic Ocean", ["the Pacific Ocean", "the Arctic Ocean", "the Indian Ocean"], "PEI is near this ocean."],
  ["From Ottawa, which direction would you go to reach the Arctic Ocean?", "north", ["south", "east", "west"], "The Arctic is at the top of the map."],
  ["What are the four main directions on a map?", "north, south, east and west", ["up, down, left and right", "front, back, top and bottom", "red, blue, green and yellow"], "A compass rose shows them."],
  ["From Ottawa, which direction do you go to reach the United States?", "south", ["north", "east", "west"], "The border is south of most of Canada."],
  ["Which country shares Canada’s long land border?", "the United States", ["Mexico", "Brazil", "France"], "It lies to the south."],
  ["Does Prince Edward Island share a land border with another province?", "No, it is surrounded by water", ["Yes, on its west side", "Yes, on its north shore", "Yes, with the United States"], "It is an island.", true],
  ["Which body of water lies between Prince Edward Island and the mainland?", "the Northumberland Strait", ["Hudson Bay", "the Pacific Ocean", "the Great Lakes"], "The Confederation Bridge crosses it."],
  ["Which bridge joins Prince Edward Island to the mainland?", "the Confederation Bridge", ["the Ottawa Bridge", "the Gateway Bridge", "the Harbour Bridge"], "It opened in 1997."],
  ["Is Prince Edward Island the smallest or the largest province?", "the smallest", ["the largest", "about average", "the only one with no coast"], "It is a small island."],
  ["Ten provinces and three territories together make up…", "the country of Canada", ["the United States", "Europe", "the Prairies"], "All of them are in Canada."],
  ["Prince Edward Island belongs to which part of Canada?", "the Atlantic region", ["the Prairies", "the Pacific coast", "the Arctic"], "It is on the east coast."],
  ["On a map, a star often marks a capital city. Which Canadian city would have a star on a map of the country?", "Ottawa", ["Charlottetown", "Summerside", "Cavendish"], "Think of the capital of the whole country.", true],
  ["A map has a title, a key and a compass rose. What does the compass rose show?", "directions", ["distances", "cities", "colours"], "North, south, east and west."],
  ["Which of these is true about the Canadian map?", "Canada has three oceans around it", ["Canada has one ocean", "Canada has no oceans", "Canada has five oceans"], "Think Atlantic, Pacific and Arctic."],
  ["Which three oceans touch Canada?", "the Atlantic, Pacific and Arctic", ["the Atlantic, Indian and Southern", "the Pacific, Indian and Southern", "the Indian, Southern and Arctic"], "They are on the east, west and north.", true],
];

export const peCanadaMap4 = bankUnit({
  id: "pe-canada-map-4",
  title: "Canada’s Map and Governments",
  emoji: "🍁",
  blurb: "Provinces, territories, capitals",
  parentNote: "Children come to understand the political landscape of Canada, including provinces, territories and capitals.",
  standards: ["4.4.3", "the political landscape of Canada"],
  items: CANADA_MAP,
});

const SYMBOLS: Q[] = [
  ["What is a symbol?", "a picture or object that stands for something else", ["a kind of map", "a type of weather", "a person’s name"], "A flag is one example."],
  ["Which leaf is on Canada’s flag?", "the maple leaf", ["the oak leaf", "the birch leaf", "the pine needle"], "It has points all around."],
  ["Which colours are on Canada’s flag?", "red and white", ["blue and yellow", "green and white", "black and gold"], "Look at a flag."],
  ["In which year was Canada’s flag first raised?", "1965", ["1867", "1945", "1982"], "It was raised on Parliament Hill."],
  ["How many points does the maple leaf on Canada’s flag have?", "11", ["5", "7", "13"], "Count carefully, it has several.", true],
  ["Which animal is Canada’s national animal?", "the beaver", ["the moose", "the polar bear", "the salmon"], "It builds dams."],
  ["Why is the beaver a good symbol for Canada?", "It is hard-working and lives near rivers and lakes across the country", ["It lives only in the desert", "It flies south each winter", "It lives only on mountain peaks"], "A beaver is known for its work."],
  ["Where does a beaver live?", "near rivers, streams and ponds", ["in dry deserts", "on tall mountain peaks", "in the open ocean"], "It needs water to build a lodge."],
  ["What does the maple leaf remind people of?", "the maple trees that grow in Canada’s forests", ["Canada’s ocean waves", "Canada’s deserts", "Canada’s volcanoes"], "Maple trees turn bright red in autumn."],
  ["Which food is made from the sap of maple trees?", "maple syrup", ["honey", "peanut butter", "chocolate"], "It is sweet and golden."],
  ["Which symbol goes best with Canada’s Arctic?", "a polar bear", ["a palm tree", "a sailboat in a harbour", "a field of ripe wheat"], "It lives on sea ice."],
  ["Which symbol fits Canada’s Rocky Mountains?", "a mountain goat", ["a polar bear", "a lobster boat", "a sand dune"], "It climbs steep rocks."],
  ["A lobster boat goes best with which part of Canada?", "the Atlantic coast", ["the Prairies", "the far north", "the Rocky Mountains"], "Lobsters live in the sea."],
  ["A field of golden wheat goes best with…", "the Prairies", ["the Atlantic coast", "the Arctic", "the Rocky Mountains"], "Wide, flat land suits grain farms."],
  ["A loon floats on a quiet lake. Which landscape would it stand for?", "lakes and forests", ["deserts", "city streets", "the deep ocean floor"], "Loons call across northern lakes."],
  ["Which of these is a symbol of Prince Edward Island?", "the lady’s slipper", ["the maple leaf", "the beaver", "the polar bear"], "It is a wildflower."],
  ["The lady’s slipper is a wildflower. What kind of symbol is it for PEI?", "a floral emblem", ["a national anthem", "a flag", "a coin"], "Emblems are plants or animals chosen to stand for a place."],
  ["Which bird is the provincial bird of Prince Edward Island?", "the blue jay", ["the loon", "the robin", "the bald eagle"], "It has blue feathers.", true],
  ["Which tree is the provincial tree of Prince Edward Island?", "the red oak", ["the sugar maple", "the white pine", "the spruce"], "It is not a maple.", true],
  ["Is the maple leaf a national or a regional symbol?", "national", ["regional", "only for PEI", "only for towns"], "It is on Canada’s flag."],
  ["Is the lady’s slipper a national or a regional symbol?", "regional, because it stands for one province", ["national, for the whole country", "an international symbol", "a symbol of a city"], "It stands for the Island.", true],
  ["Which is a national symbol of Canada?", "the flag with a maple leaf", ["the lady’s slipper", "the red oak", "the blue jay"], "It stands for the whole country."],
  ["Why is the lady’s slipper a good symbol for PEI?", "It is a wildflower that grows on the Island", ["It grows only in deserts", "It lives in the sea", "It is a kind of rock"], "A symbol can come from nature near home."],
  ["Which landscape feature could be a symbol of PEI?", "red soil and red sandstone cliffs", ["glaciers and icebergs", "tall rocky peaks", "hot deserts"], "The Island’s red colour is well known."],
  ["The Confederation Bridge joins PEI to the mainland. Why might it be a symbol of the Island?", "It links the Island to the rest of Canada", ["It is a mountain", "It is an animal", "It is a river"], "It is 12.9 km long."],
  ["Why do countries have symbols?", "to show what is special about them and bring people together", ["to hide their borders", "to make maps smaller", "to tell the weather"], "Symbols give people pride."],
  ["Which song is Canada’s national anthem?", "“O Canada”", ["“Happy Birthday”", "“God Bless America”", "“Frère Jacques”"], "People sing it at games and in schools."],
  ["Which symbol would stand for the ocean waters off Prince Edward Island?", "a lobster", ["a polar bear", "a mountain goat", "a camel"], "Lobster fishing is important there."],
  ["The polar bear lives on Arctic sea ice. Why is it a good symbol of the Arctic landscape?", "It lives only in the cold, icy north", ["It lives on the prairies", "It lives in a rainforest", "It lives in a warm pond"], "Think of ice and snow.", true],
  ["Why was the maple leaf chosen to be on the flag?", "Maple trees grow across Canada and the leaf has long been a symbol here", ["Maple trees grow only in the desert", "It is the only leaf that falls", "It is the biggest leaf in the world"], "A symbol should stand for many people and places.", true],
];

export const peCanadaSymbols4 = bankUnit({
  id: "pe-canada-symbols-4",
  title: "Symbols of Canada",
  emoji: "🦫",
  blurb: "Flags, emblems and landscapes",
  parentNote: "Children examine the symbols associated with Canada’s landscapes.",
  standards: ["4.4.4", "symbols associated with Canada’s landscapes"],
  items: SYMBOLS,
});
