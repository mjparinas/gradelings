import type { SortSet } from "../bank";
import type { Unit } from "../types";
import { bankUnit, hq, q, type Item } from "../ontario/g3-4-kit";
import { sk } from "./kit";

// Saskatchewan Grade 2 Social Studies: how the natural environment shapes the local community, and maps and globes
// as models of real things (DR2.2, DR2.3). The shared units cover the other outcomes.

const MODEL_SORT: SortSet = {
  prompt: "Is it a model or map of a real thing, or the real thing itself? Tap an item, then tap its basket.",
  hint: "A model or map stands for something real. It is usually smaller and simpler than the real thing.",
  bins: [
    { id: "model", label: "model or map", emoji: "🗺️" },
    { id: "real", label: "the real thing", emoji: "🏞️" },
  ],
  items: [
    { label: "a globe", emoji: "🌐" },
    { label: "a map of the school", emoji: "🗺️" },
    { label: "a toy farm with a tiny barn", emoji: "🧸" },
    { label: "a paper model of a house", emoji: "🏠" },
    { label: "planet Earth", emoji: "🌍" },
    { label: "your school building", emoji: "🏫" },
    { label: "a real farm", emoji: "🚜" },
    { label: "a real lake", emoji: "🏞️" },
  ].map((it, i) => ({ ...it, bin: i < 4 ? "model" : "real" })),
};

const LAND: Item[] = [
  q("What is a globe?", "a round model of Earth", ["a flat picture of one town", "a real planet", "a kind of ball game"], "A globe is shaped like Earth, but much smaller.", "🌐"),
  q("What is a map?", "a drawing that shows where places are", ["a list of names", "a photo of a person", "a calendar"], "Maps show places from above.", "🗺️"),
  q("A map shows a place as if you were looking…", "down from above, like a bird", ["up from under the ground", "from inside a box", "at it sideways from far away"], "This is called a bird's-eye view.", "🐦"),
  q("Why is a map smaller than the real place?", "so the place can fit on a page", ["because the place is tiny", "because maps are toys", "so nobody can read it"], "A map is a model that shrinks a real place.", "📄"),
  q("What does a map key (legend) tell you?", "what the symbols on the map mean", ["who drew the map", "what time it is", "how old the map is"], "Check the key to learn the symbols.", "🔑"),
  q("On a map, the colour blue usually shows…", "water, such as lakes and rivers", ["roads", "forests", "buildings"], "Most maps use blue for water.", "💧"),
  q("On a map, a small tree symbol often shows…", "a park or forest", ["a lake", "a road", "a school"], "Symbols are small pictures that stand for real things.", "🌳"),
  q("Which direction is usually at the top of a map?", "north", ["south", "east", "west"], "The compass rose shows north, south, east and west.", "🧭"),
  q("A model of your classroom shows the desks, but not the pencils. Why?", "models leave out small details", ["pencils are not real", "the model is broken", "models show everything"], "Models and maps keep only the most important things.", "🪑"),
  q("Which is a model of a real thing?", "a toy airplane", ["a real airplane", "the sky", "a cloud"], "A model looks like the real thing but is smaller.", "✈️"),
  q("Which tool best shows the whole Earth's shape?", "a globe", ["a ruler", "a clock", "a map of one street"], "Earth is round, and so is a globe.", "🌐"),
  q("What does the natural environment mean?", "land, water, plants, animals and weather", ["only stores and roads", "only houses", "only cars"], "The natural environment is not made by people.", "🌿"),
  q("Much of southern Saskatchewan is flat, open prairie. Which job does that land suit?", "farming grain and raising cattle", ["catching ocean fish", "growing bananas", "skiing on tall mountains"], "Flat land with good soil is good for farming.", "🌾"),
  q("Why do many towns grow up beside rivers and lakes?", "people need water to drink, farm and travel", ["rivers make towns warmer", "lakes keep people indoors", "water stops wind"], "Water is one of the most important needs.", "🏞️"),
  q("Saskatchewan winters are very cold. How does this change what people wear?", "they wear warm coats, hats, mittens and boots", ["they wear swimsuits outside", "they wear sandals in the snow", "they stop wearing coats"], "The weather affects our clothes.", "🧥"),
  q("Which activity is easier in a snowy prairie winter?", "skating and tobogganing", ["swimming in a lake", "picking strawberries", "planting a garden"], "Many communities have outdoor rinks in winter.", "⛸️"),
  q("Why do many homes in cold places have furnaces?", "to keep people warm in winter", ["to cool the house in summer", "to wash clothes", "to grow plants"], "Homes are built for the climate.", "🏠"),
  q("In northern Saskatchewan there are many forests and lakes. Which job fits that land?", "forestry and fishing", ["growing wheat on open prairie", "surfing", "growing oranges"], "Different land supports different jobs.", "🌲"),
  q("How can heavy rain or melting snow in spring affect a community?", "rivers can rise and flood low land", ["the ground turns to sand", "it gets dark all day", "buildings grow taller"], "Communities plan for floods near rivers.", "🌊"),
  q("Why do farmers watch the weather closely?", "rain, sun and frost affect their crops", ["weather never changes", "crops do not need water", "weather only matters in winter"], "Too little rain or an early frost can harm crops.", "🌦️"),
  q("A community builds a park beside a river. How does the natural environment help?", "the river makes a nice place to walk and play", ["the river stops people visiting", "rivers make parks smaller", "the river has nothing to do with it"], "People often use natural places for fun.", "🛶"),
  q("Which is part of the natural environment?", "a lake", ["a parking lot", "a school bus", "a bridge"], "Lakes form in nature; people build parking lots, buses and bridges.", "🏞️"),
  q("Which is made by people, not by nature?", "a road", ["a river", "a hill", "a tree"], "Roads are built by people.", "🛣️"),
  q("How does the long, sunny prairie summer help a community?", "crops and gardens can grow", ["it makes snow", "it freezes the lakes", "it stops plants growing"], "Plants need sunlight and warmth.", "☀️"),
  q("What is one way people can take care of the natural environment in their community?", "pick up litter and plant trees", ["leave garbage in parks", "pour paint in rivers", "pull up flowers"], "Caring for the land keeps it healthy.", "♻️"),
  q("Which map would help you walk from your home to the library?", "a map of your town", ["a map of the moon", "a map of another country", "a weather map of the world"], "Choose a map of the place you are going.", "📚"),
  hq("Why might a town on the prairie have tall grain elevators, but a town by the ocean have a harbour?", "each town uses its natural environment in its own way", ["all towns are the same", "grain elevators are for boats", "harbours store wheat"], "The land and water shape what people build.", "🌾"),
  hq("A map of your school shows the gym as a small rectangle. Why is that fine?", "a map uses simple shapes to stand for real places", ["the gym is really that small", "the map is wrong", "maps cannot show buildings"], "Maps and models are simpler than the real thing.", "🏫"),
  hq("Why do maps and models help people plan?", "they show where things are before you go or build", ["they replace real places", "they stop people from travelling", "they are only for decoration"], "Planners use maps to choose where to put roads and parks.", "📝"),
  hq("Long ago, why did many people settle where there was good soil and water?", "they could grow food and care for animals", ["they liked long walks", "it was the only flat land in the world", "water was not needed then"], "The environment has always shaped where people live.", "🌱"),
  hq("A dry summer means less rain. How might this affect a farming community?", "smaller harvests and less money for farmers", ["more crops than ever", "no change at all", "more snow in July"], "Weather affects the whole community, not just the farm.", "🌵"),
  hq("Which is the best example of the natural environment shaping a local celebration?", "a winter festival with snow sculptures and skating", ["a birthday party indoors", "a movie night", "a spelling bee"], "Many communities celebrate the seasons.", "❄️"),
];

export const units: Unit[] = [
  {
    id: "sk-land-maps-2",
    title: "Land, Weather & Maps",
    emoji: "🗺️",
    blurb: "How nature shapes our community, and maps as models",
    standards: { "ca-sk": sk("DR2.2, DR2.3", "how the land, water and weather shape the local community, and maps, globes and models as representations of real things") },
    parentNote: "How prairie land, rivers, forests and cold winters shape homes, jobs, clothing and fun in a community, and how maps, globes and models stand for real places.",
    generate: bankUnit(LAND, { sorts: [MODEL_SORT] }),
  },
];
