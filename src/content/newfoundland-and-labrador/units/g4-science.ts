import { bankUnit, type Q } from "../own";

// Grade 4 science, Newfoundland and Labrador: rocks and minerals, and weathering and erosion. The Atlantic Canada science
// program teaches rocks, minerals and erosion in Grade 4 next to habitats, light and sound; the grade guide itself is not
// public, so both units cite the Grade 6 key stage of the Knowledge strand ((300) properties of materials, (301) causes and
// patterns of change).
//
// Sources checked (anything that could not be confirmed was left out):
// - Natural Resources Canada and the Geological Survey of Canada, rock types, the rock cycle and mineral properties
//   (hardness, lustre, streak, cleavage); the Mohs scale of mineral hardness
// - Government of Newfoundland and Labrador (gov.nl.ca), provincial emblems: labradorite, the provincial mineral
// - Government of Newfoundland and Labrador, Department of Industry, Energy and Technology, mining in the province
//   (iron ore in western Labrador; nickel, copper and cobalt at Voisey’s Bay)
// - Parks Canada, Gros Morne National Park (the Tablelands are rock from Earth’s mantle; glacier-carved fjords such as
//   Western Brook Pond)
// - UNESCO World Heritage List, Mistaken Point, no. 1497 (fossils of early complex life, about 560 to 580 million years old)
// - Natural Resources Canada, glaciers and glacial erratics; Government of Newfoundland and Labrador, The Arches
//   Provincial Park (sea arches carved by waves)

const ROCKS: Q[] = [
  ["What are rocks made of?", "one or more minerals", ["only water", "only soil and leaves", "plastic"], "Look closely at granite: the specks are different minerals."],
  ["Which word means a solid made in nature that was never alive, with the same make-up all through?", "a mineral", ["a fossil", "a plant", "a seed"], "Quartz and calcite are examples."],
  ["Which kind of rock forms when melted rock cools and hardens?", "igneous rock", ["sedimentary rock", "metamorphic rock", "fossil rock"], "Igneous comes from a word meaning fire."],
  ["Which kind of rock forms from layers of sand, mud or shells pressed together?", "sedimentary rock", ["igneous rock", "metamorphic rock", "lava rock"], "Sediment is the bits that settle in layers."],
  ["Which kind of rock forms when heat and pressure change another rock?", "metamorphic rock", ["igneous rock", "sedimentary rock", "pumice"], "Metamorphic means changed in form."],
  ["Granite forms when magma cools slowly underground. What kind of rock is it?", "igneous", ["sedimentary", "metamorphic", "a fossil"], "It started as melted rock."],
  ["Sandstone is made of grains of sand cemented together. What kind of rock is it?", "sedimentary", ["igneous", "metamorphic", "a mineral"], "Sand settles in layers first."],
  ["Marble forms when limestone is squeezed and heated. What kind of rock is marble?", "metamorphic", ["igneous", "sedimentary", "a fossil"], "It is a rock that was changed."],
  ["In which kind of rock are fossils most often found?", "sedimentary rock", ["igneous rock", "lava", "melted rock"], "Shells and bones get buried in layers of mud and sand."],
  ["Which rock is so full of air holes that it can float on water?", "pumice", ["granite", "marble", "slate"], "It forms from frothy lava."],
  ["Which tool would a geologist use to see tiny crystals in a rock?", "a hand lens", ["a thermometer", "a ruler", "a compass"], "It makes small things look bigger."],
  ["What is a geologist?", "a scientist who studies rocks and the Earth", ["a scientist who studies stars", "a doctor for animals", "a person who builds roads"], "Geo means Earth."],
  ["Which test tells you how hard a mineral is?", "a scratch test", ["a smell test", "a sound test", "a taste test"], "A harder mineral scratches a softer one."],
  ["On the Mohs scale, which mineral is the softest?", "talc", ["diamond", "quartz", "topaz"], "It is number 1 on the scale."],
  ["On the Mohs scale, which mineral is the hardest?", "diamond", ["talc", "gypsum", "calcite"], "It is number 10 on the scale."],
  ["Mineral A scratches mineral B. What does that tell you?", "Mineral A is harder", ["Mineral B is harder", "They are the same hardness", "Mineral A is heavier"], "Only a harder mineral can scratch a softer one."],
  ["What is lustre?", "how a mineral shines in light", ["how heavy a mineral is", "how a mineral smells", "how old a mineral is"], "Some minerals look like metal, some look like glass."],
  ["What is the streak of a mineral?", "the colour of its powder", ["its shape", "its weight", "the sound it makes"], "You rub the mineral on a rough white tile."],
  ["Which is a good way to sort rocks?", "by colour, texture or hardness", ["by how much they cost", "by who found them", "by the day they were found"], "Sort by properties you can observe."],
  ["Which mineral is the provincial mineral of Newfoundland and Labrador?", "labradorite", ["diamond", "gold", "talc"], "Its name comes from part of our province."],
  ["Labradorite is famous for…", "flashes of blue and green colour when it turns in light", ["glowing in the dark", "being softer than talc", "melting in your hand"], "Turn it slowly and the colours flash."],
  ["Which metal ore is mined in western Labrador, near Labrador City and Wabush?", "iron ore", ["gold", "silver", "tin"], "It is used to make steel."],
  ["Which of these is made from a mineral?", "the “lead” in a pencil, made of graphite", ["a wooden ruler", "a cotton shirt", "a paper bag"], "Pencil lead is not really lead."],
  ["Which mineral is the main part of most sand on beaches?", "quartz", ["talc", "gold", "graphite"], "It is hard and does not wear away easily."],
  ["What can people make from sand made of quartz?", "glass", ["paper", "wool", "rubber"], "Sand is melted at a very high heat."],
  ["Slate splits into thin, flat sheets. What has it often been used for?", "roof tiles and chalkboards", ["bread", "clothing", "rope"], "Thin, flat and strong is handy."],
  ["Which rock property describes how rough or smooth it feels?", "texture", ["lustre", "streak", "colour"], "Run your finger across the rock."],
  ["Fool’s gold looks like gold. What is its real name?", "pyrite", ["quartz", "talc", "labradorite"], "A streak test shows it is not gold: its powder is greenish-black.", true],
  ["Hematite can look silver or black. What colour is its streak?", "reddish-brown", ["white", "green", "bright blue"], "That is why streak is better than colour for naming it.", true],
  ["Why is streak more useful than colour for naming some minerals?", "A mineral’s colour can vary, but its streak usually stays the same", ["Streak shows how old a mineral is", "Colour is always the same for every mineral", "Streak makes minerals shiny"], "Two pieces of one mineral can be different colours.", true],
  ["A mineral scratches glass but not quartz. Which Mohs number could it be?", "6", ["2", "1", "9"], "Glass is about 5.5 and quartz is 7.", true],
  ["Your fingernail has a hardness of about 2.5. Which mineral could you scratch with it?", "talc", ["quartz", "topaz", "diamond"], "Only minerals softer than 2.5.", true],
  ["Which mineral is attracted to a magnet?", "magnetite", ["quartz", "talc", "gypsum"], "Its name is a clue.", true],
  ["Limestone fizzes when a drop of vinegar touches it. Which mineral in it causes the fizzing?", "calcite", ["quartz", "talc", "graphite"], "The fizz is a gas being made.", true],
  ["In the rock cycle, what can happen to a sedimentary rock pushed deep underground?", "Heat and pressure turn it into metamorphic rock", ["It turns into a plant", "It becomes air", "It stays the same forever"], "Rocks keep changing over very long times.", true],
  ["Gros Morne’s Tablelands are orange-brown and have few plants. Where did this rock come from?", "deep inside the Earth, from the mantle", ["the Moon", "a volcano last year", "an old road"], "Moving plates pushed it up to the surface long ago.", true],
  ["Mistaken Point, on the Avalon Peninsula, is a UNESCO site. What is it known for?", "very old fossils of early sea life", ["a gold mine", "a volcano", "a diamond mine"], "The fossils are more than 560 million years old.", true],
  ["Which metals are mined at Voisey’s Bay in Labrador?", "nickel, copper and cobalt", ["gold and silver only", "aluminium and tin", "iron and coal only"], "Nickel is the main one.", true],
  ["Which property describes a mineral that breaks along smooth, flat surfaces?", "cleavage", ["streak", "lustre", "magnetism"], "Mica peels into thin flat sheets.", true],
  ["Which statement about rocks and minerals is true?", "A rock can be made of several minerals", ["Every rock is one single mineral", "Minerals are made of rocks", "Minerals were once alive"], "Granite holds quartz, feldspar and mica.", true],
];

const EROSION: Q[] = [
  ["What is weathering?", "breaking rock into smaller pieces", ["moving rock to a new place", "melting rock", "building a mountain"], "Weathering breaks; erosion carries."],
  ["What is erosion?", "moving bits of rock and soil from one place to another", ["making new rock from lava", "rain falling from clouds", "the colour of a rock"], "Water, wind and ice can all carry pieces away."],
  ["What is deposition?", "dropping rock and soil in a new place", ["breaking a rock", "digging a hole", "melting ice"], "Rivers drop sand where they slow down."],
  ["Which of these causes the most erosion on Earth?", "moving water", ["moonlight", "bird song", "thunder sounds"], "Think of rivers, rain and waves."],
  ["What happens to water when it freezes in a crack in a rock?", "It expands and pushes the crack wider", ["It shrinks and pulls the rock together", "It turns into rock", "It disappears"], "Ice takes up more room than water."],
  ["How can a tree root weather a rock?", "It grows into a crack and splits the rock", ["It paints the rock", "It melts the rock", "It makes the rock heavier"], "Roots push as they grow."],
  ["Why are pebbles on a beach usually smooth and round?", "Waves roll and rub them together", ["People polish them", "They grow that way", "Sunlight shapes them"], "Rocks bump and grind in the surf."],
  ["What can slow erosion on a hillside?", "plants whose roots hold the soil", ["cutting down all the trees", "driving trucks on it", "digging the soil loose"], "Roots act like a net."],
  ["Which force pulls rocks and soil downhill in a landslide?", "gravity", ["magnetism", "light", "sound"], "It pulls everything toward the ground."],
  ["What does wind carry that can wear away rock?", "sand and dust", ["sunlight", "rainbows", "electricity"], "It works like sandpaper."],
  ["What is a glacier?", "a huge, slow-moving body of ice", ["a fast river", "a cloud", "a sand dune"], "It forms where more snow falls than melts."],
  ["As glaciers move, what do they do to the land?", "scrape it and carry rocks away", ["make it warmer", "fill it with trees", "turn it into water"], "They act like giant bulldozers."],
  ["Long ago, glaciers carved deep valleys that filled with water. What is Western Brook Pond in Gros Morne?", "a fjord carved by glaciers", ["a volcano crater", "a human-made lake", "a desert"], "Its cliffs are very tall and steep."],
  ["Where does a river usually drop the most sand and mud?", "where it slows down, at its mouth", ["at its fastest part", "at the top of a waterfall", "nowhere"], "Slow water cannot carry as much."],
  ["Waves pounding a cliff can make a hole all the way through. What is it called?", "a sea arch", ["a fjord", "a delta", "a glacier"], "The Arches Provincial Park is named for these."],
  ["Which change happens slowly, over many years?", "a river carving a valley", ["a landslide", "a rockfall", "a flood"], "Slow changes take a very long time."],
  ["Which change happens quickly?", "a landslide", ["a glacier carving a valley", "waves rounding a pebble", "roots splitting a rock"], "Fast changes can happen in minutes."],
  ["Which human activity can increase erosion?", "clearing trees and plants from land", ["planting grass", "building a windbreak of trees", "staying on marked paths"], "Bare soil washes away easily."],
  ["How do sand dune grasses help a beach?", "Their roots hold the sand in place", ["They make the sand hotter", "They push the sand into the sea", "They turn sand into rock"], "That is why people stay off dunes."],
  ["Why might a town put large rocks along the shore?", "to protect the land from wave erosion", ["to make the water warmer", "to bring more waves", "to grow fish"], "The rocks take the hit instead of the land."],
  ["Which is weathering, not erosion?", "a rock cracking after many freezes and thaws", ["a river carrying sand to the sea", "wind blowing sand down a beach", "a glacier dragging a boulder"], "Weathering breaks rock where it is.", true],
  ["Which is erosion, not weathering?", "a stream carrying soil downhill", ["frost splitting a rock", "a root cracking a rock", "rain slowly dissolving limestone"], "Erosion moves the pieces.", true],
  ["Why does the freeze and thaw of water break so much rock in Newfoundland and Labrador?", "The temperature often goes above and below freezing", ["It never freezes here", "It is always summer", "Rocks here are made of ice"], "Each freeze widens the crack a little more.", true],
  ["A huge boulder sits alone in a field, far from rock like it. What probably carried it there?", "a glacier", ["the wind", "a bird", "a small stream"], "These rocks are called erratics.", true],
  ["A river flows fast after heavy rain. What happens to the size of rocks it can carry?", "It can carry bigger rocks", ["It can carry only dust", "It cannot carry anything", "Rocks float away from it"], "Faster water has more energy.", true],
  ["Rain that is slightly acidic slowly dissolves limestone. What can this make underground?", "caves", ["volcanoes", "glaciers", "sand dunes"], "This is chemical weathering.", true],
  ["In a stream-table test, students change only the slope. What should they keep the same?", "the amount of water and the kind of soil", ["nothing at all", "only the colour of the tray", "the slope"], "A fair test changes one thing at a time.", true],
  ["A model shows soil with plants losing less soil than bare soil. What does this show?", "Plants help reduce erosion", ["Plants cause erosion", "Water does not move soil", "Soil grows plants faster"], "Compare the two results.", true],
  ["What forms when a river drops sand and mud at its mouth in a fan shape?", "a delta", ["a fjord", "a glacier", "a sea arch"], "It is named after a triangle-shaped letter.", true],
  ["Which scientist would study how a coastline changes over time?", "a geologist", ["an astronomer", "a dentist", "a chef"], "They study rocks and landforms.", true],
  ["Why is some soil made partly of weathered rock?", "Rock breaks into tiny bits that mix with rotting plants", ["Soil falls from the sky", "Soil is made only of water", "Rocks turn into worms"], "Soil takes a very long time to form.", true],
  ["People walking on a cliff path keep wearing it away. Which is the best fix?", "build a set path and plant the edges", ["walk closer to the edge", "remove all plants", "pour water on the path"], "Protect the plants that hold the soil.", true],
  ["How does ice from a glacier help make rounded valleys?", "It scrapes the valley sides as it slowly moves", ["It melts the rock", "It blows the rock away like wind", "It freezes the valley shut"], "Glacier valleys are U-shaped.", true],
  ["Why do coastal communities watch erosion closely?", "Roads and homes near the shore can be at risk", ["Erosion makes the ocean freeze", "Erosion stops fishing", "Erosion only happens on the Moon"], "Waves keep wearing the shore.", true],
];

export const rocksMinerals = bankUnit({
  id: "nl-rocks-minerals-4",
  title: "Rocks & Minerals",
  emoji: "🪨",
  blurb: "Rock types, mineral properties and how we use them.",
  parentNote:
    "Grade 4 science sorts rocks into igneous, sedimentary and metamorphic, and tests minerals for hardness, lustre and streak. Ask your child to sort a few rocks from outside by colour and texture, and to name one way people use minerals.",
  standards: ["Knowledge (by Grade 6)", "describing and comparing rocks and minerals by their properties, how rocks form, and how people use them"],
  items: ROCKS,
});

export const erosion = bankUnit({
  id: "nl-erosion-4",
  title: "Weathering & Erosion",
  emoji: "🌊",
  blurb: "How water, wind and ice shape the land.",
  parentNote:
    "Grade 4 science looks at how weathering breaks rock, how water, wind, ice and gravity move it, and how people slow erosion. On a walk, ask your child to spot places where water or waves are wearing the land away.",
  standards: ["Knowledge (by Grade 6)", "how weathering, erosion and deposition by water, wind, ice and gravity change the land, and how people can slow erosion"],
  items: EROSION,
});
