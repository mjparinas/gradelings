import type { SortSet } from "../../bank";

// More Pre-K science picture questions, so each unit has about 40 to draw from (the units in ./science.ts take these
// as extra items). Same rules as there: picture choices only, simple words, nothing that names a region.

type Pic = [word: string, emoji: string];
export interface MoreItem {
  ask: string;
  right: Pic;
  wrong: Pic[];
  hint: string;
  show?: string;
  stretch?: boolean;
}

const EYES: Pic = ["eyes", "👀"];
const EARS: Pic = ["ears", "👂"];
const NOSE: Pic = ["nose", "👃"];
const TONGUE: Pic = ["tongue", "👅"];
const HAND: Pic = ["hands", "✋"];
const others = (right: Pic) => [EYES, EARS, NOSE, TONGUE, HAND].filter((s) => s !== right);

export const SENSE_MORE: MoreItem[] = [
  { ask: "What do you use to see colourful crayons?", right: EYES, wrong: others(EYES), hint: "You look at colours with your eyes.", show: "🖍️" },
  { ask: "What do you use to hear a whistle?", right: EARS, wrong: others(EARS), hint: "A whistle makes a sound. Ears hear sounds.", show: "🎵" },
  { ask: "What do you use to smell a lemon?", right: NOSE, wrong: others(NOSE), hint: "You smell with your nose.", show: "🍋" },
  { ask: "What do you use to taste a strawberry?", right: TONGUE, wrong: others(TONGUE), hint: "Your tongue tastes sweet things.", show: "🍓" },
  { ask: "What do you use to feel a cold snowball?", right: HAND, wrong: others(HAND), hint: "Your hands feel cold and warm.", show: "⛄" },
  { ask: "What do you use to hear a clock tick?", right: EARS, wrong: others(EARS), hint: "Ticking is a sound.", show: "🕒" },
  { ask: "What do you use to see a fish swim?", right: EYES, wrong: others(EYES), hint: "You watch with your eyes.", show: "🐟" },
  { ask: "What do you use to smell popcorn?", right: NOSE, wrong: others(NOSE), hint: "Yummy smells come in your nose.", show: "🍿" },
  { ask: "What do you use to taste a pickle?", right: TONGUE, wrong: others(TONGUE), hint: "Your tongue can taste sour things.", show: "🥒" },
  { ask: "What do you use to feel a bumpy road?", right: HAND, wrong: others(HAND), hint: "You can feel bumpy with your hands.", show: "🛣️" },
  { ask: "What do you use to hear a siren?", right: EARS, wrong: others(EARS), hint: "A siren is a loud sound.", show: "🚨" },
  { ask: "What do you use to see a kite?", right: EYES, wrong: others(EYES), hint: "Look up with your eyes.", show: "🪁" },
  { ask: "What do you use to smell paint?", right: NOSE, wrong: others(NOSE), hint: "Your nose smells all kinds of things.", show: "🎨" },
  { ask: "What do you use to feel a fuzzy blanket?", right: HAND, wrong: others(HAND), hint: "Touch it with your hands.", show: "🛏️" },
  { ask: "What do you use to hear rain on a roof?", right: EARS, wrong: others(EARS), hint: "Rain makes a pitter-patter sound.", show: "🌧️" },
  { ask: "Which one is bright?", right: ["sun", "☀️"], wrong: [["cave", "🕳️"], ["night sky", "🌌"]], hint: "Bright things give lots of light.", stretch: true },
  { ask: "Which one is loud?", right: ["fire truck", "🚒"], wrong: [["mouse", "🐭"], ["snowflake", "❄️"]], hint: "A fire truck's siren is very loud.", stretch: true },
  { ask: "Which one feels rough?", right: ["tree bark", "🪵"], wrong: [["silk", "🎀"], ["bubble", "🫧"]], hint: "Bark feels bumpy and rough.", stretch: true },
  { ask: "Which one tastes salty?", right: ["pretzel", "🥨"], wrong: [["honey", "🍯"], ["cake", "🍰"]], hint: "Pretzels have salt on them.", stretch: true },
  { ask: "Which one feels hot?", right: ["hot soup", "🍲"], wrong: [["ice cube", "🧊"], ["snow", "❄️"]], hint: "Steam rises from hot soup. Be careful!", stretch: true },
  { ask: "Which one is soft?", right: ["pillow", "🛏️"], wrong: [["brick", "🧱"], ["stone", "🪨"]], hint: "Pillows squish when you hold them.", stretch: true },
];

const LIVING_ITEM_MORE: MoreItem[] = [
  { ask: "Which one is alive?", right: ["bee", "🐝"], wrong: [["kite", "🪁"], ["balloon", "🎈"]], hint: "Bees are alive. They eat and fly." },
  { ask: "Which one is alive?", right: ["sunflower", "🌻"], wrong: [["clock", "🕒"], ["book", "📕"]], hint: "Sunflowers grow tall in the sun." },
  { ask: "Which one is alive?", right: ["fish", "🐠"], wrong: [["boat", "⛵"], ["cup", "🥤"]], hint: "Fish breathe and swim." },
  { ask: "Which one is alive?", right: ["mushroom", "🍄"], wrong: [["button", "🔘"], ["marble", "🔮"]], hint: "Mushrooms grow from the ground." },
  { ask: "Which one is not alive?", right: ["bicycle", "🚲"], wrong: [["worm", "🪱"], ["duck", "🦆"]], hint: "A bicycle is made by people. It does not grow." },
  { ask: "Which one is not alive?", right: ["blocks", "🧱"], wrong: [["snail", "🐌"], ["frog", "🐸"]], hint: "Blocks are toys. They do not eat or grow." },
  { ask: "Which one is not alive?", right: ["snowman", "⛄"], wrong: [["rabbit", "🐰"], ["tulip", "🌷"]], hint: "A snowman is made of snow. It does not grow." },
  { ask: "Which one is not alive?", right: ["crayon", "🖍️"], wrong: [["turtle", "🐢"], ["sheep", "🐑"]], hint: "A crayon is a thing, not a living thing." },
  { ask: "Which one is alive?", right: ["baby", "👶"], wrong: [["doll", "🪆"], ["robot", "🤖"]], hint: "A baby is a person who grows." },
  { ask: "Which one is alive?", right: ["leaf on a tree", "🍃"], wrong: [["plastic cup", "🥤"], ["toy boat", "⛵"]], hint: "Leaves on trees are alive." },
  { ask: "What do plants need to live?", right: ["sunlight", "☀️"], wrong: [["candy", "🍬"], ["TV", "📺"]], hint: "Plants need light, water and air.", stretch: true },
  { ask: "What do people need to live?", right: ["air", "🌬️"], wrong: [["toys", "🧸"], ["cartoons", "📺"]], hint: "People need to breathe air.", stretch: true },
  { ask: "Which one gets bigger as it grows?", right: ["puppy", "🐶"], wrong: [["rock", "🪨"], ["toy car", "🚗"]], hint: "Puppies grow into dogs.", stretch: true },
  { ask: "Which one needs food?", right: ["bunny", "🐰"], wrong: [["spoon", "🥄"], ["chair", "🪑"]], hint: "Animals eat food to live.", stretch: true },
  { ask: "Which one can move by itself and eats?", right: ["caterpillar", "🐛"], wrong: [["pebble", "🪨"], ["lamp", "💡"]], hint: "Caterpillars crawl and nibble leaves.", stretch: true },
];

const LIVING_SORT_2: SortSet = {
  prompt: "Living or not living? Tap a picture, then its basket.",
  hint: "Living things grow, eat and breathe. Toys and rocks don't.",
  bins: [
    { id: "living", label: "living", emoji: "🌱" },
    { id: "not", label: "not living", emoji: "🪨" },
  ],
  items: [
    { label: "bee", emoji: "🐝", bin: "living" },
    { label: "sunflower", emoji: "🌻", bin: "living" },
    { label: "frog", emoji: "🐸", bin: "living" },
    { label: "mushroom", emoji: "🍄", bin: "living" },
    { label: "turtle", emoji: "🐢", bin: "living" },
    { label: "kite", emoji: "🪁", bin: "not" },
    { label: "bicycle", emoji: "🚲", bin: "not" },
    { label: "crayon", emoji: "🖍️", bin: "not" },
    { label: "cup", emoji: "🥤", bin: "not" },
    { label: "blocks", emoji: "🧱", bin: "not" },
  ],
};
export const LIVING_MORE = { items: LIVING_ITEM_MORE, sort: LIVING_SORT_2 };

export const ANIMAL_MORE: MoreItem[] = [
  { ask: "Where does a frog live?", right: ["pond", "🌊"], wrong: [["desert", "🏜️"], ["snow", "❄️"]], hint: "Frogs live near water.", show: "🐸" },
  { ask: "Where does a bear sleep in winter?", right: ["den", "🕳️"], wrong: [["pond", "🌊"], ["nest", "🪺"]], hint: "Some bears sleep in a den.", show: "🐻" },
  { ask: "Where does a spider live?", right: ["web", "🕸️"], wrong: [["hive", "🍯"], ["pond", "🌊"]], hint: "Spiders spin webs.", show: "🕷️" },
  { ask: "Where does a pig live?", right: ["farm", "🚜"], wrong: [["ocean", "🌊"], ["nest", "🪺"]], hint: "Pigs live on farms.", show: "🐖" },
  { ask: "Where does a whale live?", right: ["ocean", "🌊"], wrong: [["farm", "🚜"], ["tree", "🌳"]], hint: "Whales swim in the ocean.", show: "🐋" },
  { ask: "Which baby grows into a duck?", right: ["duckling", "🐥"], wrong: [["puppy", "🐶"], ["foal", "🐴"]], hint: "A baby duck is a duckling.", show: "🦆" },
  { ask: "Which baby grows into a cow?", right: ["calf", "🐮"], wrong: [["chick", "🐣"], ["kitten", "🐱"]], hint: "A baby cow is a calf.", show: "🐄" },
  { ask: "Which baby grows into a sheep?", right: ["lamb", "🐑"], wrong: [["puppy", "🐶"], ["chick", "🐣"]], hint: "A baby sheep is a lamb.", show: "🐏" },
  { ask: "Which baby grows into a frog?", right: ["tadpole", "🐸"], wrong: [["kitten", "🐱"], ["chick", "🐣"]], hint: "Tadpoles grow legs and become frogs.", show: "🐸" },
  { ask: "What does a rabbit like to eat?", right: ["carrot", "🥕"], wrong: [["fish", "🐟"], ["pizza", "🍕"]], hint: "Rabbits nibble carrots and greens.", show: "🐰" },
  { ask: "What does a cat like to drink?", right: ["milk", "🥛"], wrong: [["soup", "🍲"], ["juice", "🧃"]], hint: "Cats lap up milk and water.", show: "🐱" },
  { ask: "What does a bee make?", right: ["honey", "🍯"], wrong: [["milk", "🥛"], ["bread", "🍞"]], hint: "Bees make sweet honey.", show: "🐝" },
  { ask: "What does a hen lay?", right: ["eggs", "🥚"], wrong: [["milk", "🥛"], ["honey", "🍯"]], hint: "Hens lay eggs.", show: "🐔" },
  { ask: "Which animal has a tail that swishes in the water?", right: ["fish", "🐟"], wrong: [["owl", "🦉"], ["cow", "🐄"]], hint: "Fish swish their tails to swim." },
  { ask: "Which animal has wings?", right: ["butterfly", "🦋"], wrong: [["pig", "🐖"], ["fish", "🐟"]], hint: "Butterflies have wings." },
  { ask: "Which animal has a long neck?", right: ["giraffe", "🦒"], wrong: [["pig", "🐖"], ["mouse", "🐭"]], hint: "A giraffe's neck is very long." },
  { ask: "Which animal has eight legs?", right: ["spider", "🕷️"], wrong: [["dog", "🐶"], ["bird", "🐦"]], hint: "Spiders have eight legs." },
  { ask: "Which animal says moo?", right: ["cow", "🐄"], wrong: [["duck", "🦆"], ["cat", "🐱"]], hint: "Cows say moo." },
  { ask: "Which animal says quack?", right: ["duck", "🦆"], wrong: [["cow", "🐄"], ["dog", "🐶"]], hint: "Ducks say quack." },
  { ask: "Which animal says woof?", right: ["dog", "🐶"], wrong: [["cat", "🐱"], ["sheep", "🐑"]], hint: "Dogs say woof." },
  { ask: "Which animal hoots at night?", right: ["owl", "🦉"], wrong: [["cow", "🐄"], ["hen", "🐔"]], hint: "Owls hoot in the dark.", stretch: true },
  { ask: "Which animal lives in a shell and moves slowly?", right: ["snail", "🐌"], wrong: [["rabbit", "🐰"], ["horse", "🐴"]], hint: "Snails carry their shell and go slowly.", stretch: true },
  { ask: "Which animal gives us wool?", right: ["sheep", "🐑"], wrong: [["fish", "🐟"], ["duck", "🦆"]], hint: "Wool for warm sweaters comes from sheep.", stretch: true },
  { ask: "Which animal builds a dam?", right: ["beaver", "🦫"], wrong: [["whale", "🐋"], ["parrot", "🦜"]], hint: "Beavers build dams with sticks.", stretch: true },
  { ask: "Which animal can see best in the dark?", right: ["owl", "🦉"], wrong: [["hen", "🐔"], ["duck", "🦆"]], hint: "Owls hunt at night.", stretch: true },
];

export const WEATHER_MORE: MoreItem[] = [
  { ask: "Which picture shows a rainbow?", right: ["rainbow", "🌈"], wrong: [["snow", "❄️"], ["moon", "🌙"]], hint: "A rainbow has many colours." },
  { ask: "Which picture shows fog?", right: ["fog", "🌫️"], wrong: [["sun", "☀️"], ["rainbow", "🌈"]], hint: "Fog is a low cloud you can walk through." },
  { ask: "Which picture shows lightning?", right: ["lightning", "⚡"], wrong: [["snow", "❄️"], ["sun", "☀️"]], hint: "Lightning is a bright flash in the sky." },
  { ask: "Which picture shows a puddle?", right: ["puddle", "💧"], wrong: [["snowman", "⛄"], ["sun", "☀️"]], hint: "Rain makes puddles on the ground." },
  { ask: "It is windy. What can you fly?", right: ["kite", "🪁"], wrong: [["fish", "🐟"], ["spoon", "🥄"]], hint: "A kite flies when the wind blows." },
  { ask: "It is cold outside. What do you put on your head?", right: ["warm hat", "🧢"], wrong: [["sun hat", "👒"], ["swim goggles", "🥽"]], hint: "A warm hat keeps your head cosy." },
  { ask: "It is very hot. What cold treat is nice?", right: ["ice pop", "🍦"], wrong: [["hot cocoa", "☕"], ["hot soup", "🍲"]], hint: "A cold treat helps you cool off." },
  { ask: "It is raining. What do you jump in?", right: ["puddles", "💦"], wrong: [["sand castle", "🏰"], ["snow pile", "⛄"]], hint: "Splashing in puddles is fun with rain boots." },
  { ask: "It is a sunny day at the beach. What do you put on your skin?", right: ["sunscreen", "🧴"], wrong: [["mittens", "🧤"], ["scarf", "🧣"]], hint: "Sunscreen protects skin from the sun." },
  { ask: "It snowed all night. What do you see in the morning?", right: ["white snow", "❄️"], wrong: [["green grass", "🌿"], ["yellow sand", "🏖️"]], hint: "Snow covers the ground in white." },
  { ask: "Which comes out in the day?", right: ["sun", "☀️"], wrong: [["moon", "🌙"], ["stars", "⭐"]], hint: "The sun shines in the day." },
  { ask: "Which comes out at night?", right: ["moon", "🌙"], wrong: [["sun", "☀️"], ["rainbow", "🌈"]], hint: "The moon shines at night." },
  { ask: "Which season is very cold?", right: ["winter", "⛄"], wrong: [["summer", "🏖️"], ["spring", "🌷"]], hint: "Winter is the coldest season." },
  { ask: "Which season is hot?", right: ["summer", "🏖️"], wrong: [["winter", "⛄"], ["fall", "🍂"]], hint: "Summer is the hottest season." },
  { ask: "In which season do flowers start to bloom?", right: ["spring", "🌷"], wrong: [["winter", "⛄"], ["fall", "🍂"]], hint: "Spring brings flowers and new leaves." },
  { ask: "In which season do leaves fall from trees?", right: ["fall", "🍂"], wrong: [["spring", "🌷"], ["summer", "🏖️"]], hint: "In fall leaves change colour and drop." },
  { ask: "What shape is the sun?", right: ["circle", "⚪"], wrong: [["square", "🟦"], ["triangle", "🔺"]], hint: "The sun looks like a round circle.", show: "☀️" },
  { ask: "What tells you if it is hot or cold?", right: ["thermometer", "🌡️"], wrong: [["ruler", "📏"], ["clock", "🕒"]], hint: "A thermometer measures how warm it is.", stretch: true },
  { ask: "What do clouds make when they are full?", right: ["rain", "🌧️"], wrong: [["sand", "🏖️"], ["leaves", "🍂"]], hint: "Heavy clouds let rain fall.", stretch: true },
  { ask: "What do you hear after lightning?", right: ["thunder", "🔊"], wrong: [["a whisper", "🤫"], ["a bell", "🔔"]], hint: "Thunder is the loud boom after lightning.", stretch: true },
  { ask: "What melts when the sun gets warm?", right: ["snow", "❄️"], wrong: [["rock", "🪨"], ["wood", "🪵"]], hint: "Snow turns to water when it warms up.", stretch: true },
];

export const PLANT_MORE: MoreItem[] = [
  { ask: "Which one grows from a seed?", right: ["sunflower", "🌻"], wrong: [["toy car", "🚗"], ["shoe", "👟"]], hint: "Flowers grow from seeds." },
  { ask: "Which one grows on a bush?", right: ["blueberry", "🫐"], wrong: [["bread", "🍞"], ["egg", "🥚"]], hint: "Blueberries grow on bushes." },
  { ask: "Which one grows on a tree?", right: ["pear", "🍐"], wrong: [["carrot", "🥕"], ["potato", "🥔"]], hint: "Pears hang from pear trees." },
  { ask: "Which one grows under the ground?", right: ["potato", "🥔"], wrong: [["apple", "🍎"], ["cherry", "🍒"]], hint: "Potatoes grow in the soil." },
  { ask: "Which one is a leaf?", right: ["leaf", "🍃"], wrong: [["petal", "🌸"], ["root", "🥕"]], hint: "Leaves are green and flat." },
  { ask: "Which part of a plant holds it in the ground?", right: ["roots", "🌱"], wrong: [["flower", "🌸"], ["fruit", "🍎"]], hint: "Roots hold the plant and drink water.", stretch: true },
  { ask: "What does a tomato plant grow?", right: ["tomatoes", "🍅"], wrong: [["apples", "🍎"], ["eggs", "🥚"]], hint: "Tomato plants grow tomatoes." },
  { ask: "What does a pumpkin vine grow?", right: ["pumpkins", "🎃"], wrong: [["bananas", "🍌"], ["carrots", "🥕"]], hint: "Pumpkins grow big and round." },
  { ask: "Which one grows in a field and makes bread?", right: ["wheat", "🌾"], wrong: [["cactus", "🌵"], ["rose", "🌹"]], hint: "Wheat is ground into flour for bread.", stretch: true },
  { ask: "Which one is a tall plant with a trunk?", right: ["tree", "🌳"], wrong: [["grass", "🌿"], ["clover", "🍀"]], hint: "Trees have a trunk and many branches." },
  { ask: "Which one is a short plant you mow?", right: ["grass", "🌿"], wrong: [["tree", "🌳"], ["cactus", "🌵"]], hint: "Grass is short and green." },
  { ask: "Which plant do we eat as a snack, crunchy and orange?", right: ["carrot", "🥕"], wrong: [["banana", "🍌"], ["lemon", "🍋"]], hint: "Carrots are crunchy and orange." },
  { ask: "Which fruit is yellow and curved?", right: ["banana", "🍌"], wrong: [["apple", "🍎"], ["grapes", "🍇"]], hint: "Bananas are yellow and curved." },
  { ask: "Which fruit has lots of small seeds on the outside?", right: ["strawberry", "🍓"], wrong: [["banana", "🍌"], ["orange", "🍊"]], hint: "Strawberry seeds are on the outside." },
  { ask: "Which one needs sun and water to grow?", right: ["flower", "🌼"], wrong: [["rock", "🪨"], ["toy", "🧸"]], hint: "Plants need sun and water." },
  { ask: "What do you do to help a garden grow?", right: ["pull weeds", "🌿"], wrong: [["step on plants", "👣"], ["throw rocks", "🪨"]], hint: "Weeding gives plants room to grow.", stretch: true },
  { ask: "Where do seeds go to start growing?", right: ["soil", "🟤"], wrong: [["a cup of juice", "🧃"], ["a toy box", "📦"]], hint: "Seeds grow in soil.", stretch: true },
  { ask: "What do roots do?", right: ["drink water", "💧"], wrong: [["sing", "🎤"], ["make noise", "🔊"]], hint: "Roots take in water from the soil.", stretch: true },
  { ask: "Which pretty flower is yellow with a big face?", right: ["sunflower", "🌻"], wrong: [["rose", "🌹"], ["tulip", "🌷"]], hint: "Sunflowers are big and yellow." },
  { ask: "Which flower is often red with thorns?", right: ["rose", "🌹"], wrong: [["sunflower", "🌻"], ["daisy", "🌼"]], hint: "Roses can be red and have thorns." },
];

export const FLOAT_MORE: { items: MoreItem[]; sort: SortSet } = {
  items: [
    { ask: "Which one floats?", right: ["rubber duck", "🦆"], wrong: [["rock", "🪨"], ["coin", "🪙"]], hint: "Light toys like rubber ducks float." },
    { ask: "Which one sinks?", right: ["coin", "🪙"], wrong: [["leaf", "🍃"], ["feather", "🪶"]], hint: "Metal coins are heavy. They sink." },
    { ask: "Which one floats?", right: ["wood log", "🪵"], wrong: [["key", "🔑"], ["rock", "🪨"]], hint: "Wood is light, so logs float on water." },
    { ask: "Which one sinks?", right: ["key", "🔑"], wrong: [["beach ball", "🏐"], ["boat", "⛵"]], hint: "Keys are metal and heavy." },
    { ask: "Which one rolls?", right: ["wheel", "🛞"], wrong: [["book", "📕"], ["box", "📦"]], hint: "Round things like wheels roll." },
    { ask: "Which one slides down a hill?", right: ["sled", "🛷"], wrong: [["feather", "🪶"], ["leaf", "🍃"]], hint: "A sled slides on snow." },
    { ask: "How do you make a wagon go?", right: ["pull", "🫴"], wrong: [["whisper", "🤫"], ["wink", "😉"]], hint: "Pull the handle and the wagon rolls." },
    { ask: "How do you close a door?", right: ["push", "👐"], wrong: [["sing", "🎤"], ["hop", "🦘"]], hint: "Push the door and it closes." },
    { ask: "Which one is heavy?", right: ["rock", "🪨"], wrong: [["feather", "🪶"], ["leaf", "🍃"]], hint: "Rocks are heavy to lift." },
    { ask: "Which one is light?", right: ["feather", "🪶"], wrong: [["rock", "🪨"], ["brick", "🧱"]], hint: "Feathers are very light." },
    { ask: "What makes a ball go far?", right: ["a big kick", "🦶"], wrong: [["a whisper", "🤫"], ["a wave", "👋"]], hint: "A big push or kick makes it go far.", show: "⚽" },
    { ask: "Which one bounces?", right: ["rubber ball", "⚽"], wrong: [["rock", "🪨"], ["shoe", "👟"]], hint: "Rubber balls bounce back up." },
    { ask: "Which one will a magnet pick up?", right: ["nail", "🔩"], wrong: [["paper", "📄"], ["leaf", "🍃"]], hint: "Magnets pull metal like nails.", show: "🧲", stretch: true },
    { ask: "Which one floats in the bathtub?", right: ["toy boat", "⛵"], wrong: [["spoon", "🥄"], ["key", "🔑"]], hint: "Boats are built to float.", stretch: true },
    { ask: "What happens to ice in the sun?", right: ["it melts", "💧"], wrong: [["it grows", "🌱"], ["it sings", "🎵"]], hint: "Ice turns to water when it warms.", show: "🧊", stretch: true },
    { ask: "What happens when you blow on a feather?", right: ["it floats away", "🪶"], wrong: [["it turns to stone", "🪨"], ["it sings", "🎵"]], hint: "Air from your breath moves light things.", stretch: true },
  ],
  sort: {
    prompt: "Sink or float? Tap a picture, then its basket.",
    hint: "Light things like leaves float. Heavy things like rocks sink.",
    bins: [
      { id: "float", label: "floats", emoji: "🛟" },
      { id: "sink", label: "sinks", emoji: "⬇️" },
    ],
    items: [
      { label: "rubber duck", emoji: "🦆", bin: "float" },
      { label: "wood log", emoji: "🪵", bin: "float" },
      { label: "toy boat", emoji: "⛵", bin: "float" },
      { label: "bath toy", emoji: "🛁", bin: "float" },
      { label: "ping pong ball", emoji: "🏓", bin: "float" },
      { label: "brick", emoji: "🧱", bin: "sink" },
      { label: "nail", emoji: "🔩", bin: "sink" },
      { label: "marble", emoji: "🔮", bin: "sink" },
      { label: "fork", emoji: "🍴", bin: "sink" },
      { label: "padlock", emoji: "🔒", bin: "sink" },
    ],
  },
};
