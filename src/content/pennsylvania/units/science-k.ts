import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Pennsylvania's own Kindergarten science units (`pa-` ids), for the STEELS standards no shared unit practises: how people
// use and care for nature (3.4.K-2.A, D; 3.5.K-2.D), everyday tools and technology (3.5.K-2.C, G, K, BB), and the places
// and living things of Pennsylvania, which the state's own plants and animals stand for (3.4.K-2.C; 3.1.K.A).

const CARING_FOR_NATURE: Q[] = [
  ["Which one comes from nature?", "a tree", ["a toy car", "a brick wall", "a plastic cup"], "Trees grow by themselves."],
  ["People get wood from…", "trees", ["clouds", "sand", "snow"], "Wood comes from trees."],
  ["People get water to drink from…", "rivers, lakes and wells", ["the Moon", "rocks only", "the wind"], "Water is a natural resource."],
  ["A farm grows food from…", "plants and animals", ["only toys", "only rocks", "only sand"], "Farmers grow plants and raise animals."],
  ["What do we call using something again?", "reuse", ["throw away", "break", "forget"], "Use it one more time."],
  ["Which one can you reuse?", "a glass jar", ["a used tissue", "a banana peel", "a candy wrapper"], "A jar can hold things again."],
  ["Which bin is for paper and cans?", "the recycling bin", ["the sandbox", "the toy box", "the fish tank"], "Recycling makes old things into new things."],
  ["You finish your milk carton. What can a family do?", "put it in the recycling", ["bury it in the garden", "feed it to the dog", "float it in a lake"], "Cartons can be recycled."],
  ["What does reduce mean?", "use less", ["use more", "throw far", "paint it"], "Make the pile smaller."],
  ["Which helps the Earth?", "turning off a light you do not need", ["leaving trash on the ground", "wasting water", "breaking a tree branch"], "Using less saves energy."],
  ["The water keeps running while you brush your teeth. What is better?", "turn it off", ["leave it on", "turn it up", "add soap to it"], "Do not waste water."],
  ["A park has a big mess of litter. What can kids do?", "pick it up and put it in a trash can", ["leave it for the wind", "throw more", "hide it in a bush"], "Clean up with a grown-up."],
  ["Who lives in a forest?", "many plants and animals", ["only cars", "only people", "nothing"], "A forest is a home for living things."],
  ["Cutting down all the trees would hurt…", "the animals that live in them", ["only the clouds", "only the sand", "nothing at all"], "Animals need their homes."],
  ["What is a good way to save paper?", "draw on both sides", ["tear it up", "use a new sheet each time", "leave it in the rain"], "Use all of the paper."],
  ["Clean air helps…", "people and animals breathe", ["rocks grow", "toys talk", "water freeze"], "We all need air."],
  ["Which one is a natural resource?", "water", ["a crayon", "a cup", "a shoe"], "Water comes from nature."],
  ["A big problem near our school is litter on the grass. What is a first step?", "look at it and tell a teacher", ["ignore it", "add more", "run away"], "Notice a problem, then ask for help.", true],
  ["Why do we put food scraps in a compost bin?", "they can turn into soil for plants", ["they make toys", "they make glass", "they make metal"], "Compost feeds the soil.", true],
  ["Which choice makes less trash?", "a lunch box you use again", ["a new plastic bag every day", "a paper napkin for each bite", "throwing away the whole lunch"], "Reuse makes less trash.", true],
  ["People use trees for wood. How can we help forests?", "plant new trees", ["cut down more trees", "drop trash", "never go outside"], "New trees replace old ones.", true],
  ["Which one can be wasted if a tap is left running?", "water", ["the sky", "the Moon", "a shadow"], "Water can be wasted.", true],
  ["You want to know if your yard has litter. How can you find out?", "walk outside and look carefully", ["ask a toy", "close your eyes", "sleep"], "Scientists look and ask questions.", true],
  ["A stream is dirty from trash. What is a kind way to help?", "pick up litter with a grown-up", ["throw in more", "pour in paint", "poke the fish"], "Keep water clean for the animals.", true],
  ["Why do we recycle?", "to make old things into new things", ["to make more trash", "to hide things", "to get lost"], "Recycling gives materials a new life.", true],
];

const EVERYDAY_TOOLS: Q[] = [
  ["A hammer helps people…", "pound nails", ["see in the dark", "tell time", "fly"], "A hammer is a tool."],
  ["A spoon helps you…", "eat soup", ["cut wood", "dig a big hole", "play music"], "You use a spoon to eat."],
  ["A clock helps people…", "tell the time", ["wash dishes", "grow food", "dig holes"], "Clocks show the time."],
  ["Which one is a tool for cutting paper?", "scissors", ["a pillow", "a ball", "a sock"], "Scissors cut."],
  ["A toothbrush helps you…", "clean your teeth", ["sweep the floor", "draw a picture", "dry your hair"], "Brush every day."],
  ["Which one helps you see tiny things?", "a magnifying glass", ["a spoon", "a rug", "a shoe"], "It makes things look bigger."],
  ["A phone helps people…", "talk to someone far away", ["eat lunch", "wash a car", "grow a plant"], "Phones carry voices."],
  ["Which one is made by people?", "a bicycle", ["a rock", "a cloud", "a puddle"], "People build bicycles."],
  ["Which one is natural, not made by people?", "a pinecone", ["a toy block", "a spoon", "a plastic bottle"], "Pinecones grow on trees."],
  ["A broom helps you…", "sweep the floor", ["bake a cake", "ring a bell", "write a letter"], "A broom is a tool for cleaning."],
  ["Before you use a tool, you should…", "ask a grown-up if you are not sure", ["use it very fast", "throw it", "run with it"], "Use tools safely."],
  ["Scissors are sharp. How do you carry them?", "with the points down", ["with the points up", "while running", "in your mouth"], "Hold the sharp end down."],
  ["Which tool helps a gardener dig?", "a shovel", ["a pencil", "a spoon", "a pillow"], "A shovel digs dirt."],
  ["A ramp helps you…", "roll something up or down", ["see far", "hear better", "stay dry"], "Ramps make moving things easier."],
  ["A sign with a picture of a stop hand tells people to…", "stop", ["go faster", "sing", "jump"], "Symbols give directions."],
  ["A picture of a trash can on a sign means…", "put trash here", ["swim here", "sleep here", "eat here"], "Symbols give directions."],
  ["A car helps people…", "travel from place to place", ["bake bread", "wash clothes", "grow flowers"], "Cars carry people."],
  ["Which one keeps you dry in the rain?", "an umbrella", ["a sandal", "a spoon", "a book"], "An umbrella is technology for rain."],
  ["A washing machine helps a family…", "clean clothes", ["bake pie", "play music", "plant seeds"], "It washes clothes for us."],
  ["Which one is a tool people use to measure how long something is?", "a ruler", ["a spoon", "a sock", "a plate"], "A ruler shows length.", true],
  ["How does a wheel help people?", "it helps things move easily", ["it makes things sleepy", "it makes things cold", "it makes things sing"], "Wheels roll.", true],
  ["Why do we wear a helmet on a bike?", "to protect our heads", ["to look tall", "to make noise", "to keep our hands warm"], "A helmet is a safety tool.", true],
  ["Long ago, people washed clothes in a river. Now many use…", "washing machines", ["leaves", "rocks only", "snow"], "Technology changes how people work.", true],
  ["Which pair are both made by people?", "a chair and a window", ["a cloud and a chair", "a tree and a rock", "a bird and a nest"], "Chairs and windows are built.", true],
  ["A can opener helps you…", "open a can", ["paint a wall", "fly a kite", "catch a fish"], "It is a kitchen tool.", true],
  ["A computer is a tool that helps people…", "find and keep information", ["bake cookies", "dig soil", "swing high"], "Computers store and show information.", true],
];

const PENNS_WOODS: Q[] = [
  ["The state tree of Pennsylvania is the eastern hemlock. A hemlock is a…", "tree", ["fish", "bug", "rock"], "It has needles and cones."],
  ["Pennsylvania's state flower is the mountain laurel. A mountain laurel is a…", "plant", ["fish", "rock", "cloud"], "It grows flowers."],
  ["Pennsylvania's state animal is the white-tailed deer. A deer…", "lives in the woods and fields", ["lives only in the sea", "lives in a shell", "lives in the clouds"], "Deer eat plants."],
  ["Which animal is Pennsylvania's state bird?", "the ruffed grouse", ["the penguin", "the ostrich", "the parrot"], "It lives in the woods."],
  ["Pennsylvania's state fish is the brook trout. It lives in…", "cool, clean streams", ["the desert", "the sky", "a tree"], "Fish live in water."],
  ["Pennsylvania's state insect is the firefly. A firefly…", "glows at night", ["makes honey", "spins a web", "barks"], "Fireflies light up."],
  ["Pennsylvania means “Penn's Woods.” So Pennsylvania has many…", "trees", ["deserts", "icebergs", "volcanoes"], "Woods are full of trees."],
  ["A deer needs plants, water and a safe place to live. These are its…", "needs", ["toys", "games", "clothes"], "All living things have needs."],
  ["A fish in a stream needs…", "water", ["sand only", "a bed", "a hat"], "Fish live in water."],
  ["Which one lives in a Pennsylvania forest?", "a squirrel", ["a camel", "a penguin", "a whale"], "Squirrels climb trees."],
  ["Which one grows in a forest?", "ferns and trees", ["cars", "pillows", "boats"], "Forest plants grow in shade."],
  ["A pond in Pennsylvania has frogs. Frogs live…", "in and near water", ["only on mountains", "in the sky", "in sand"], "Frogs need wet places."],
  ["In autumn, many trees in Pennsylvania…", "drop their leaves", ["grow flowers", "melt", "turn to stone"], "Leaves change color and fall."],
  ["In winter in Pennsylvania, it is often…", "cold", ["very hot all day", "always rainy", "dark all year"], "Winter weather is cold."],
  ["A mountain is a very tall…", "landform", ["lake", "cloud", "river"], "Mountains rise high."],
  ["A river is water that…", "flows across the land", ["stands still on a roof", "is made of rock", "falls up"], "Rivers flow downhill."],
  ["Pennsylvania has mountains, rivers and lakes. These are different…", "kinds of places", ["colors", "sounds", "foods"], "Places can look very different."],
  ["The Delaware River and the Susquehanna River are…", "rivers in Pennsylvania", ["toys", "stars", "deserts"], "Rivers have names."],
  ["A hellbender is a big salamander that lives in clean, fast streams. It needs…", "clean water", ["dry sand", "tall mountains", "loud noise"], "Dirty water can hurt it.", true],
  ["Why do some animals live in a forest and not in a desert?", "the forest has what they need", ["they like the sound", "they hate sand", "the forest has no animals"], "Animals live where their needs are met.", true],
  ["Deer eat plants. If the plants are gone, the deer must…", "find food somewhere else", ["turn into a bird", "stop needing food", "become rocks"], "Living things need food.", true],
  ["Why are Pennsylvania's streams good homes for brook trout?", "they are cool and clean", ["they are dry", "they are very hot", "they have no water"], "Trout need cool, clean water.", true],
  ["A firefly is an insect, but it is a kind of…", "beetle", ["bird", "fish", "worm"], "Fireflies have hard wing covers like a beetle.", true],
  ["Which two places are very different?", "a mountain and a lake", ["two lakes", "two ponds", "two puddles"], "A mountain is high and a lake is water.", true],
  ["People live in cities and on farms. These are different…", "places to live", ["kinds of weather", "kinds of food", "colors of sky"], "Places can be busy or quiet.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "pa-gk-caring-for-nature",
    title: "Caring for Nature",
    emoji: "♻️",
    blurb: "Reduce, reuse and recycle, and look after the places we share.",
    parentNote:
      "Practices how people use nature (wood, water, food) and simple ways to care for it: reducing, reusing and recycling, and noticing and helping with a problem in the local environment.",
    standards: ["3.4.K-2.A; 3.4.K-2.D; 3.5.K-2.D; 3.3.K.E", "how people use natural resources, ways to reduce, reuse and recycle, and looking into a problem in the local environment"],
    items: CARING_FOR_NATURE,
  }),
  bankUnit({
    id: "pa-gk-everyday-tools",
    title: "Tools That Help Us",
    emoji: "🔨",
    blurb: "Tools and machines people make to get jobs done safely.",
    parentNote:
      "Practices everyday technology: tools and how they help with tasks, telling things people make from things in nature, everyday symbols and safe tool use.",
    standards: ["3.5.K-2.C; 3.5.K-2.G; 3.5.K-2.K; 3.5.K-2.A; 3.5.K-2.BB", "how technology and tools help with everyday tasks, using tools safely, everyday symbols, and the natural world compared with the human-made world"],
    items: EVERYDAY_TOOLS,
  }),
  bankUnit({
    id: "pa-gk-penns-woods",
    title: "Penn's Woods",
    emoji: "🌲",
    blurb: "Plants, animals and places in Pennsylvania.",
    parentNote:
      "Practices what plants and animals need through Pennsylvania's own plants and animals (eastern hemlock, mountain laurel, white-tailed deer, ruffed grouse, brook trout, firefly) and how different places look.",
    standards: ["3.4.K-2.C; 3.1.K.A", "how places differ in their physical characteristics, and what plants and animals need to survive"],
    items: PENNS_WOODS,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
