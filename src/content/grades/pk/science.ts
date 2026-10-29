import { sample, shuffle, textChoice } from "../../random";
import { sortQuestion, type SortSet } from "../../bank";
import type { Choice, Course, GenerateOptions, OrderQuestion, Question } from "../../types";

// Pre-K science: noticing the world with the senses. Picture choices only (at most 3), small sorts, and
// first-next-last orders of up to 4 pictures, all read aloud.

type Level = NonNullable<GenerateOptions["difficulty"]>;
type Opt = Omit<Choice, "id">;
type Pic = [word: string, emoji: string];

const level = (opts?: GenerateOptions): Level => opts?.difficulty ?? 2;
const pic = ([word, emoji]: Pic): Opt => ({ label: word, emoji });

/** A hand-written picture question; `stretch` ones come at the higher levels. */
interface Item {
  ask: string;
  right: Pic;
  wrong: Pic[];
  hint: string;
  show?: string;
  stretch?: boolean;
}

function fromItems(items: Item[], count: number, difficulty: Level): Question[] {
  const easy = items.filter((i) => !i.stretch);
  const hard = items.filter((i) => i.stretch);
  const hardCount = Math.min(hard.length, difficulty === 1 ? 0 : difficulty === 2 ? Math.floor(count / 3) : Math.floor(count / 2));
  const chosen = [...sample(easy, count - hardCount), ...sample(hard, hardCount)];
  return chosen.map((i) => textChoice(i.ask, pic(i.right), sample(i.wrong, difficulty === 1 ? 1 : 2).map(pic), i.hint, i.show ? { type: "emoji", emoji: i.show } : undefined));
}

function sortFor(set: SortSet, difficulty: Level) {
  return sortQuestion(set, difficulty === 1 ? 2 : 3);
}

function order(prompt: string, steps: Pic[], hint: string): OrderQuestion {
  return { kind: "order", prompt, hint, items: steps.map(([label, emoji], i) => ({ id: `o${i}`, label, emoji })) };
}

// ---------- My Five Senses ----------

const EYES: Pic = ["eyes", "👀"];
const EARS: Pic = ["ears", "👂"];
const NOSE: Pic = ["nose", "👃"];
const TONGUE: Pic = ["tongue", "👅"];
const HAND: Pic = ["hands", "✋"];
const SENSES = [EYES, EARS, NOSE, TONGUE, HAND];
const others = (right: Pic) => SENSES.filter((s) => s !== right);

const SENSE_ITEMS: Item[] = [
  { ask: "What do you use to see a rainbow?", right: EYES, wrong: others(EYES), hint: "You see with your eyes.", show: "🌈" },
  { ask: "What do you use to hear a drum?", right: EARS, wrong: others(EARS), hint: "You hear sounds with your ears.", show: "🥁" },
  { ask: "What do you use to smell a flower?", right: NOSE, wrong: others(NOSE), hint: "You smell with your nose.", show: "🌸" },
  { ask: "What do you use to taste a lemon?", right: TONGUE, wrong: others(TONGUE), hint: "You taste with your tongue.", show: "🍋" },
  { ask: "What do you use to feel soft fur?", right: HAND, wrong: others(HAND), hint: "You feel things when you touch them.", show: "🐈" },
  { ask: "What do you use to hear a bird sing?", right: EARS, wrong: others(EARS), hint: "Singing is a sound. You hear with your ears.", show: "🐦" },
  { ask: "What do you use to see the stars?", right: EYES, wrong: others(EYES), hint: "You look with your eyes.", show: "⭐" },
  { ask: "What do you use to smell fresh bread?", right: NOSE, wrong: others(NOSE), hint: "Yummy smells go in your nose.", show: "🍞" },
  { ask: "What do you use to taste ice cream?", right: TONGUE, wrong: others(TONGUE), hint: "Sweet or sour? Your tongue can tell.", show: "🍦" },
  { ask: "What do you use to feel if a rock is bumpy?", right: HAND, wrong: others(HAND), hint: "Touch it with your hands to feel bumpy or smooth.", show: "🪨" },
  { ask: "What do you use to hear a bell ring?", right: EARS, wrong: others(EARS), hint: "A ringing bell makes a sound.", show: "🔔" },
  { ask: "What do you use to see colours?", right: EYES, wrong: others(EYES), hint: "Your eyes see red, blue and yellow.", show: "🎨" },
  { ask: "What do you use to hear music?", right: EARS, wrong: others(EARS), hint: "Music is a sound. You hear with your ears.", show: "🎶" },
  { ask: "What do you use to see a picture book?", right: EYES, wrong: others(EYES), hint: "You look at pictures with your eyes.", show: "📖" },
  { ask: "What do you use to smell soup cooking?", right: NOSE, wrong: others(NOSE), hint: "Cooking smells go in your nose.", show: "🍲" },
  { ask: "What do you use to taste a cookie?", right: TONGUE, wrong: others(TONGUE), hint: "Your tongue tastes food.", show: "🍪" },
  { ask: "What do you use to feel warm sand?", right: HAND, wrong: others(HAND), hint: "You feel with your hands and skin.", show: "🏖️" },
  { ask: "What do you use to hear a dog bark?", right: EARS, wrong: others(EARS), hint: "A bark is a sound.", show: "🐕" },
  { ask: "What do you use to see a butterfly?", right: EYES, wrong: others(EYES), hint: "Look with your eyes!", show: "🦋" },
  { ask: "What do you use to smell a pizza?", right: NOSE, wrong: others(NOSE), hint: "You smell with your nose.", show: "🍕" },
  { ask: "Which one is loud?", right: ["drum", "🥁"], wrong: [["feather", "🪶"], ["leaf", "🍃"], ["cloud", "☁️"]], hint: "Loud things make a big sound.", stretch: true },
  { ask: "Which one feels soft?", right: ["teddy bear", "🧸"], wrong: [["rock", "🪨"], ["fork", "🍴"], ["brick", "🧱"]], hint: "Soft things squish when you touch them.", stretch: true },
  { ask: "Which one tastes sweet?", right: ["strawberry", "🍓"], wrong: [["lemon", "🍋"], ["salt", "🧂"], ["onion", "🧅"]], hint: "Sweet things taste like fruit and honey.", stretch: true },
  { ask: "Which one smells nice?", right: ["flower", "🌹"], wrong: [["garbage", "🗑️"], ["smoke", "💨"], ["skunk", "🦨"]], hint: "Think of a smell you like.", stretch: true },
  { ask: "Which one feels cold?", right: ["ice", "🧊"], wrong: [["toast", "🍞"], ["sun", "☀️"], ["fire", "🔥"]], hint: "Ice is cold to touch.", stretch: true },
  { ask: "Which one is quiet?", right: ["butterfly", "🦋"], wrong: [["drum", "🥁"], ["siren", "🚨"], ["trumpet", "🎺"]], hint: "Quiet things make little or no sound.", stretch: true },
];

function fiveSenses(opts?: GenerateOptions): Question[] {
  return fromItems(SENSE_ITEMS, 8, level(opts));
}

// ---------- Living or Not ----------

const LIVING_SORT: SortSet = {
  prompt: "Living or not living? Tap a picture, then its basket.",
  hint: "Living things grow, eat and breathe. Toys and rocks don't.",
  bins: [
    { id: "living", label: "living", emoji: "🌱" },
    { id: "not", label: "not living", emoji: "🪨" },
  ],
  items: [
    { label: "dog", emoji: "🐕", bin: "living" },
    { label: "tree", emoji: "🌳", bin: "living" },
    { label: "fish", emoji: "🐟", bin: "living" },
    { label: "flower", emoji: "🌻", bin: "living" },
    { label: "bird", emoji: "🐦", bin: "living" },
    { label: "baby", emoji: "👶", bin: "living" },
    { label: "teddy bear", emoji: "🧸", bin: "not" },
    { label: "ball", emoji: "⚽", bin: "not" },
    { label: "rock", emoji: "🪨", bin: "not" },
    { label: "spoon", emoji: "🥄", bin: "not" },
    { label: "chair", emoji: "🪑", bin: "not" },
    { label: "robot", emoji: "🤖", bin: "not" },
  ],
};

const LIVING_ITEMS: Item[] = [
  { ask: "Which one is alive?", right: ["puppy", "🐶"], wrong: [["toy car", "🚗"], ["ball", "⚽"], ["shoe", "👟"]], hint: "Living things grow and need food and water." },
  { ask: "Which one is alive?", right: ["tree", "🌳"], wrong: [["chair", "🪑"], ["rock", "🪨"], ["cup", "🥤"]], hint: "Trees grow. They need water and sunlight." },
  { ask: "Which one is alive?", right: ["ladybug", "🐞"], wrong: [["button", "🔘"], ["coin", "🪙"], ["block", "🧱"]], hint: "Bugs are alive. They eat, move and grow." },
  { ask: "Which one is not alive?", right: ["teddy bear", "🧸"], wrong: [["bear", "🐻"], ["bee", "🐝"], ["cat", "🐱"]], hint: "A toy bear does not eat or grow." },
  { ask: "Which one is not alive?", right: ["robot", "🤖"], wrong: [["frog", "🐸"], ["horse", "🐴"], ["owl", "🦉"]], hint: "A robot is a machine. It does not grow." },
  { ask: "Which one is not alive?", right: ["rock", "🪨"], wrong: [["flower", "🌷"], ["mushroom", "🍄"], ["cactus", "🌵"]], hint: "Plants grow. A rock stays a rock." },
  { ask: "What do all living things need?", right: ["water", "💧"], wrong: [["toys", "🧸"], ["shoes", "👟"], ["TV", "📺"]], hint: "People, animals and plants all need water.", stretch: true },
  { ask: "What do animals need to stay alive?", right: ["food", "🥕"], wrong: [["hats", "🎩"], ["books", "📚"], ["crayons", "🖍️"]], hint: "Animals eat food to live and grow.", stretch: true },
  { ask: "Which one grows bigger?", right: ["kitten", "🐱"], wrong: [["toy car", "🚗"], ["ball", "⚽"], ["spoon", "🥄"]], hint: "Living things grow. A kitten grows into a cat.", stretch: true },
  { ask: "A seed is alive. What will it grow into?", right: ["plant", "🌱"], wrong: [["rock", "🪨"], ["shell", "🐚"], ["coin", "🪙"]], hint: "Seeds grow into plants.", stretch: true },
];

function livingOrNot(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  return shuffle([sortFor(LIVING_SORT, d), sortFor(LIVING_SORT, d), ...fromItems(LIVING_ITEMS, 6, d)]);
}

// ---------- Animals and Their Babies ----------

const ANIMAL_ITEMS: Item[] = [
  { ask: "Where does a fish live?", right: ["water", "🌊"], wrong: [["tree", "🌳"], ["desert", "🏜️"]], hint: "Fish swim. They live in water.", show: "🐟" },
  { ask: "Where does a bird make its nest?", right: ["tree", "🌳"], wrong: [["pond", "🌊"], ["cave", "🕳️"]], hint: "Many birds build nests up in trees.", show: "🐦" },
  { ask: "Where does a bee live?", right: ["hive", "🍯"], wrong: [["nest", "🪺"], ["pond", "🌊"]], hint: "Bees live in a hive and make honey.", show: "🐝" },
  { ask: "Where does a cow live?", right: ["farm", "🚜"], wrong: [["ocean", "🌊"], ["tree", "🌳"]], hint: "Cows live on farms, in fields of grass.", show: "🐄" },
  { ask: "Which baby grows into a chicken?", right: ["chick", "🐣"], wrong: [["puppy", "🐶"], ["kitten", "🐱"]], hint: "A chick hatches from an egg and grows into a chicken.", show: "🐔" },
  { ask: "Which baby grows into a dog?", right: ["puppy", "🐶"], wrong: [["chick", "🐣"], ["kitten", "🐱"]], hint: "A baby dog is a puppy.", show: "🐕" },
  { ask: "Which baby grows into a cat?", right: ["kitten", "🐱"], wrong: [["puppy", "🐶"], ["chick", "🐣"]], hint: "A baby cat is a kitten.", show: "🐈" },
  { ask: "What does a bird use to fly?", right: ["wings", "🕊️"], wrong: [["fins", "🐟"], ["shell", "🐢"]], hint: "Birds flap their wings to fly." },
  { ask: "What does a fish use to swim?", right: ["fins", "🐟"], wrong: [["wings", "🕊️"], ["paws", "🐾"]], hint: "Fish move their fins and tail to swim." },
  { ask: "Which animal has a shell?", right: ["turtle", "🐢"], wrong: [["dog", "🐶"], ["bird", "🐦"]], hint: "A turtle carries its shell on its back." },
  { ask: "Which animal has feathers?", right: ["bird", "🐦"], wrong: [["fish", "🐟"], ["bear", "🐻"]], hint: "Birds are covered in feathers." },
  { ask: "Which animal can hop?", right: ["rabbit", "🐰"], wrong: [["snail", "🐌"], ["fish", "🐟"]], hint: "Rabbits have strong back legs for hopping." },
  { ask: "Where does a squirrel live?", right: ["tree", "🌳"], wrong: [["pond", "🌊"], ["desert", "🏜️"]], hint: "Squirrels climb trees and build nests there.", show: "🐿️" },
  { ask: "Where does a duck swim?", right: ["pond", "🌊"], wrong: [["tree", "🌳"], ["desert", "🏜️"]], hint: "Ducks paddle on ponds and lakes.", show: "🦆" },
  { ask: "Where does a camel live?", right: ["desert", "🏜️"], wrong: [["pond", "🌊"], ["snow", "❄️"]], hint: "Camels live in hot, dry deserts.", show: "🐫" },
  { ask: "Where does a penguin live?", right: ["ice and snow", "❄️"], wrong: [["desert", "🏜️"], ["farm", "🚜"]], hint: "Penguins live where it is icy and cold.", show: "🐧" },
  { ask: "Which baby grows into a horse?", right: ["foal", "🐴"], wrong: [["chick", "🐣"], ["kitten", "🐱"]], hint: "A baby horse is called a foal.", show: "🐎" },
  { ask: "Which animal can fly?", right: ["bird", "🐦"], wrong: [["cow", "🐄"], ["fish", "🐟"]], hint: "Birds use their wings to fly." },
  { ask: "Which animal can swim?", right: ["fish", "🐟"], wrong: [["cat", "🐱"], ["horse", "🐴"]], hint: "Fish swim with their fins." },
  { ask: "Which animal has a long trunk?", right: ["elephant", "🐘"], wrong: [["lion", "🦁"], ["rabbit", "🐰"]], hint: "An elephant uses its trunk like a hand." },
  { ask: "Which animal has stripes?", right: ["zebra", "🦓"], wrong: [["pig", "🐷"], ["sheep", "🐑"]], hint: "A zebra has black and white stripes." },
  { ask: "What does a cow give us?", right: ["milk", "🥛"], wrong: [["honey", "🍯"], ["eggs", "🥚"]], hint: "Cows give us milk.", show: "🐄", stretch: true },
  { ask: "Which animal lives in the ocean?", right: ["whale", "🐋"], wrong: [["horse", "🐴"], ["squirrel", "🐿️"]], hint: "Whales swim in the ocean.", stretch: true },
  { ask: "Which animal sleeps all winter?", right: ["bear", "🐻"], wrong: [["fish", "🐟"], ["chicken", "🐔"]], hint: "Some bears sleep in a den all winter.", stretch: true },
  { ask: "What does a caterpillar turn into?", right: ["butterfly", "🦋"], wrong: [["bird", "🐦"], ["bee", "🐝"]], hint: "A caterpillar makes a chrysalis and comes out a butterfly.", show: "🐛", stretch: true },
];

function animalsAndBabies(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  const life = order("Tap them in order, from egg to chicken.", [["egg", "🥚"], ["chick", "🐣"], ["chicken", "🐔"]], "First the egg, then a chick hatches, then it grows into a chicken.");
  const butterfly = order("Tap them in order, from egg to butterfly.", [["egg", "🥚"], ["caterpillar", "🐛"], ["butterfly", "🦋"]], "A butterfly lays an egg, a caterpillar hatches, and the caterpillar grows into a butterfly.");
  return shuffle([...fromItems(ANIMAL_ITEMS, 7, d), d === 3 ? butterfly : life]);
}

// ---------- Weather and Sky ----------

const WEATHER_ITEMS: Item[] = [
  { ask: "Which picture shows rain?", right: ["rain", "🌧️"], wrong: [["sun", "☀️"], ["snow", "❄️"], ["wind", "🌬️"]], hint: "Rain is water falling from clouds." },
  { ask: "Which picture shows snow?", right: ["snow", "❄️"], wrong: [["rain", "🌧️"], ["sun", "☀️"], ["rainbow", "🌈"]], hint: "Snowflakes are cold and white." },
  { ask: "Which picture shows a sunny day?", right: ["sun", "☀️"], wrong: [["rain", "🌧️"], ["snow", "❄️"], ["cloud", "☁️"]], hint: "On a sunny day, the sun shines bright." },
  { ask: "It is snowing. What should you wear?", right: ["mittens", "🧤"], wrong: [["sandals", "🩴"], ["swimsuit", "🩱"]], hint: "Mittens keep your hands warm in the snow." },
  { ask: "It is raining. What helps you stay dry?", right: ["umbrella", "☂️"], wrong: [["sunglasses", "🕶️"], ["shorts", "🩳"]], hint: "An umbrella keeps the rain off you." },
  { ask: "It is hot and sunny. What should you wear?", right: ["sun hat", "👒"], wrong: [["scarf", "🧣"], ["mittens", "🧤"]], hint: "A sun hat shades you from the hot sun." },
  { ask: "What do you see in the sky at night?", right: ["moon", "🌙"], wrong: [["rainbow", "🌈"], ["sun", "☀️"]], hint: "At night we can see the moon and stars." },
  { ask: "What gives us light in the day?", right: ["sun", "☀️"], wrong: [["moon", "🌙"], ["lamp", "💡"]], hint: "The sun lights up the day." },
  { ask: "Which picture shows wind?", right: ["wind", "🌬️"], wrong: [["sun", "☀️"], ["snow", "❄️"], ["rain", "🌧️"]], hint: "Wind blows leaves and kites around." },
  { ask: "Which picture shows a cloudy day?", right: ["clouds", "☁️"], wrong: [["sun", "☀️"], ["snow", "❄️"], ["moon", "🌙"]], hint: "Clouds are white or grey puffs in the sky." },
  { ask: "Which picture shows a storm?", right: ["thunderstorm", "⛈️"], wrong: [["sun", "☀️"], ["rainbow", "🌈"], ["snow", "❄️"]], hint: "A storm has dark clouds, rain and lightning." },
  { ask: "It is cold and snowy. What should you wear?", right: ["warm coat", "🧥"], wrong: [["shorts", "🩳"], ["swimsuit", "🩱"]], hint: "A warm coat keeps you cosy in the snow." },
  { ask: "It is raining. What should you wear on your feet?", right: ["boots", "🥾"], wrong: [["slippers", "🥿"], ["sandals", "🩴"]], hint: "Boots keep your feet dry in puddles." },
  { ask: "It is hot. What is good to do?", right: ["drink water", "🚰"], wrong: [["wear mittens", "🧤"], ["build a snowman", "⛄"]], hint: "When it is hot, drink water to stay cool." },
  { ask: "It is sunny. What protects your eyes?", right: ["sunglasses", "🕶️"], wrong: [["mittens", "🧤"], ["scarf", "🧣"]], hint: "Sunglasses shade your eyes from the bright sun." },
  { ask: "What do we see in the sky at night?", right: ["stars", "⭐"], wrong: [["rainbow", "🌈"], ["sun", "☀️"]], hint: "Stars twinkle in the night sky." },
  { ask: "When do you see the sun?", right: ["day", "🏙️"], wrong: [["night", "🌃"]], hint: "The sun shines in the daytime." },
  { ask: "When do most people sleep?", right: ["night", "🌃"], wrong: [["day", "🏙️"]], hint: "We sleep at night when it is dark." },
  { ask: "What falls from clouds when it rains?", right: ["water drops", "💧"], wrong: [["leaves", "🍂"], ["sand", "🏖️"]], hint: "Rain is drops of water from the clouds." },
  { ask: "What can you do on a snowy day?", right: ["go sledding", "🛷"], wrong: [["go swimming outside", "🏊"], ["pick strawberries", "🍓"]], hint: "Snow is fun for sledding!" },
  { ask: "What can you do on a hot summer day?", right: ["splash in water", "💦"], wrong: [["build a snowman", "⛄"], ["wear mittens", "🧤"]], hint: "Water helps you cool off on a hot day." },
  { ask: "Which animal is awake at night?", right: ["owl", "🦉"], wrong: [["chicken", "🐔"], ["butterfly", "🦋"]], hint: "Owls sleep in the day and hunt at night.", stretch: true },
  { ask: "What can you see after rain and sun?", right: ["rainbow", "🌈"], wrong: [["snowman", "⛄"], ["moon", "🌙"]], hint: "When the sun shines through rain, you can see a rainbow.", stretch: true },
  { ask: "What makes a kite fly?", right: ["wind", "🌬️"], wrong: [["rain", "🌧️"], ["snow", "❄️"]], hint: "The wind pushes the kite up high.", show: "🪁", stretch: true },
  { ask: "What do you need to build a snowman?", right: ["snow", "❄️"], wrong: [["sand", "🏖️"], ["rain", "🌧️"]], hint: "Snowmen are made of snow!", show: "⛄", stretch: true },
];

function weatherAndSky(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  const day = order("Tap them in order: what comes first?", [["morning", "🌅"], ["afternoon", "☀️"], ["night", "🌙"]], "The sun comes up in the morning and the moon comes out at night.");
  return shuffle([...fromItems(WEATHER_ITEMS, 7, d), day]);
}

// ---------- How Plants Grow ----------

const PLANT_ITEMS: Item[] = [
  { ask: "What does a plant need to grow?", right: ["water", "💧"], wrong: [["candy", "🍬"], ["a toy", "🧸"]], hint: "Plants need water, sunlight and air." },
  { ask: "What gives plants light outside?", right: ["the sun", "☀️"], wrong: [["the moon", "🌙"], ["a rock", "🪨"]], hint: "Plants use sunlight to grow." },
  { ask: "What do you plant to grow a flower?", right: ["seed", "🌰"], wrong: [["shoe", "👟"], ["spoon", "🥄"]], hint: "Flowers grow from seeds." },
  { ask: "Which one grows on a tree?", right: ["apple", "🍎"], wrong: [["cheese", "🧀"], ["egg", "🥚"]], hint: "Apples grow on apple trees." },
  { ask: "Which part of a plant is green and flat?", right: ["leaf", "🍃"], wrong: [["flower", "🌸"], ["seed", "🌰"]], hint: "Leaves are green and flat. They catch the sunlight.", stretch: true },
  { ask: "Which one is a plant?", right: ["cactus", "🌵"], wrong: [["cat", "🐱"], ["car", "🚗"]], hint: "A cactus is a plant that grows in dry places." },
  { ask: "Which one grows in the ground?", right: ["carrot", "🥕"], wrong: [["fish", "🐟"], ["cookie", "🍪"]], hint: "Carrots grow under the soil." },
  { ask: "Which one is a seed?", right: ["seed", "🌰"], wrong: [["rock", "🪨"], ["button", "🔘"]], hint: "Seeds are small. A plant can grow from one." },
  { ask: "Which one grows on a vine?", right: ["grapes", "🍇"], wrong: [["bread", "🍞"], ["cheese", "🧀"]], hint: "Grapes grow in bunches on vines." },
  { ask: "Which one grows in a garden?", right: ["tomato", "🍅"], wrong: [["cookie", "🍪"], ["candy", "🍬"]], hint: "Tomatoes grow on plants in a garden." },
  { ask: "Which one is a flower?", right: ["tulip", "🌷"], wrong: [["tree", "🌳"], ["cactus", "🌵"]], hint: "A tulip is a flower with soft petals." },
  { ask: "Which one is a tree?", right: ["tree", "🌲"], wrong: [["flower", "🌼"], ["grass", "🌿"]], hint: "Trees are tall with a trunk." },
  { ask: "Which plant has needles?", right: ["evergreen tree", "🌲"], wrong: [["sunflower", "🌻"], ["tulip", "🌷"]], hint: "Evergreen trees have thin needles instead of flat leaves." },
  { ask: "Which plant has prickles?", right: ["cactus", "🌵"], wrong: [["tulip", "🌷"], ["clover", "🍀"]], hint: "A cactus has sharp prickles. Don't touch!" },
  { ask: "What do bees get from flowers?", right: ["nectar", "🌸"], wrong: [["milk", "🥛"], ["rocks", "🪨"]], hint: "Bees drink sweet nectar from flowers.", show: "🐝" },
  { ask: "What colour are most leaves in spring?", right: ["green", "🍃"], wrong: [["blue", "🔵"], ["purple", "🟣"]], hint: "Spring leaves are green." },
  { ask: "What happens to many leaves in fall?", right: ["they change colour", "🍂"], wrong: [["they turn blue", "🔵"], ["they grow bigger", "📈"]], hint: "Many leaves turn red, orange and yellow, then fall.", stretch: true },
  { ask: "What is inside an apple?", right: ["seeds", "🌰"], wrong: [["rocks", "🪨"], ["water bottle", "🧴"]], hint: "Apples have little seeds in the middle.", show: "🍎", stretch: true },
  { ask: "What do plants need from the soil?", right: ["water", "💧"], wrong: [["toys", "🧸"], ["music", "🎵"]], hint: "Roots drink water from the soil.", stretch: true },
  { ask: "Which plant grows from an acorn?", right: ["oak tree", "🌳"], wrong: [["sunflower", "🌻"], ["cactus", "🌵"]], hint: "An acorn is the seed of an oak tree.", stretch: true },
  { ask: "A plant is drooping. What does it need?", right: ["water", "💧"], wrong: [["a hat", "🎩"], ["a sock", "🧦"]], hint: "Thirsty plants droop. Water helps them stand up.", show: "🥀", stretch: true },
  { ask: "What grows into a big tree?", right: ["seed", "🌰"], wrong: [["rock", "🪨"], ["leaf", "🍂"]], hint: "Even big trees start as small seeds.", show: "🌳", stretch: true },
];

function plantsGrow(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  const grow = order("How does a plant grow? Tap them in order.", d === 1 ? [["seed", "🌰"], ["sprout", "🌱"], ["flower", "🌷"]] : [["seed", "🌰"], ["sprout", "🌱"], ["plant", "🪴"], ["flower", "🌷"]], "First a seed, then a little sprout, then it grows big and flowers.");
  return shuffle([...fromItems(PLANT_ITEMS, 7, d), grow]);
}

// ---------- Sink or Float ----------

const FLOAT_SORT: SortSet = {
  prompt: "Sink or float? Tap a picture, then its basket.",
  hint: "Light things like leaves float. Heavy things like rocks sink.",
  bins: [
    { id: "float", label: "floats", emoji: "🛟" },
    { id: "sink", label: "sinks", emoji: "⬇️" },
  ],
  items: [
    { label: "leaf", emoji: "🍃", bin: "float" },
    { label: "duck toy", emoji: "🦆", bin: "float" },
    { label: "beach ball", emoji: "🏐", bin: "float" },
    { label: "feather", emoji: "🪶", bin: "float" },
    { label: "boat", emoji: "⛵", bin: "float" },
    { label: "rock", emoji: "🪨", bin: "sink" },
    { label: "key", emoji: "🔑", bin: "sink" },
    { label: "coin", emoji: "🪙", bin: "sink" },
    { label: "spoon", emoji: "🥄", bin: "sink" },
    { label: "anchor", emoji: "⚓", bin: "sink" },
  ],
};

const MOVE_ITEMS: Item[] = [
  { ask: "Which one floats?", right: ["leaf", "🍃"], wrong: [["rock", "🪨"], ["key", "🔑"]], hint: "Light things like leaves float on water." },
  { ask: "Which one sinks?", right: ["rock", "🪨"], wrong: [["feather", "🪶"], ["boat", "⛵"]], hint: "Heavy things like rocks sink." },
  { ask: "Which one rolls?", right: ["ball", "⚽"], wrong: [["block", "🧱"], ["book", "📕"]], hint: "Round things roll." },
  { ask: "How do you make a swing go?", right: ["push", "👐"], wrong: [["sing", "🎤"], ["sleep", "😴"]], hint: "A push makes a swing move." },
  { ask: "How do you open a drawer?", right: ["pull", "🫴"], wrong: [["clap", "👏"], ["blow", "🌬️"]], hint: "You pull a drawer toward you." },
  { ask: "What melts in the sun?", right: ["ice cream", "🍦"], wrong: [["rock", "🪨"], ["spoon", "🥄"]], hint: "Heat from the sun melts ice cream.", stretch: true },
  { ask: "What sticks to a magnet?", right: ["paper clip", "📎"], wrong: [["leaf", "🍃"], ["sock", "🧦"]], hint: "Magnets pull some metal things.", show: "🧲", stretch: true },
  { ask: "Which one goes faster down a hill?", right: ["ball", "⚽"], wrong: [["box", "📦"], ["book", "📕"]], hint: "Round things roll fast. Boxes slide slowly.", stretch: true },
];

function sinkOrFloat(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  return shuffle([sortFor(FLOAT_SORT, d), ...(d === 1 ? [] : [sortFor(FLOAT_SORT, d)]), ...fromItems(MOVE_ITEMS, d === 1 ? 7 : 6, d)]);
}

export const course: Course = {
  grade: "pk",
  subject: "science",
  bigIdeas: {
    "ca-bc": [
      "Children develop knowledge and theories as they explore materials, living things and the land around them.",
      "Children notice daily and seasonal changes in weather, plants and animals.",
      "Children learn that humans and the natural world are connected and depend on one another.",
    ],
  },
  units: [
    {
      id: "five-senses",
      title: "My Five Senses",
      emoji: "👀",
      blurb: "See, hear, smell, taste, touch",
      standards: { "ca-bc": "Engagement with others, materials, and the world: Knowledge and theories · exploring the world with the five senses" },
      parentNote: "Naming the five senses and which body part does each (eyes see, ears hear), then describing things as loud, soft, sweet or cold.",
      generate: fiveSenses,
    },
    {
      id: "living-or-not",
      title: "Living or Not",
      emoji: "🌱",
      blurb: "What is alive?",
      standards: { "ca-bc": "Engagement with others, materials, and the world: Reconnection to land and place · telling living things from things that are not alive" },
      parentNote: "Sorting living things (animals, plants, people) from things that are not alive, and noticing that living things eat, drink and grow.",
      generate: livingOrNot,
    },
    {
      id: "animals-and-babies",
      title: "Animals and Babies",
      emoji: "🐣",
      blurb: "Homes, babies and bodies",
      standards: { "ca-bc": "Engagement with others, materials, and the world: Reconnection to land and place · where animals live, their babies and their body parts" },
      parentNote: "Where animals live, what their babies are called, body parts like wings, fins and shells, and simple life cycles such as egg, chick, chicken.",
      generate: animalsAndBabies,
    },
    {
      id: "weather-and-sky",
      title: "Weather and Sky",
      emoji: "🌦️",
      blurb: "Sun, rain, snow and night",
      standards: { "ca-bc": "Engagement with others, materials, and the world: Knowledge and theories · noticing weather, day and night" },
      parentNote: "Naming kinds of weather, choosing clothes for the weather, and what we see in the sky by day and by night.",
      generate: weatherAndSky,
    },
    {
      id: "plants-grow",
      title: "How Plants Grow",
      emoji: "🌻",
      blurb: "Seeds, water and sun",
      standards: { "ca-bc": "Engagement with others, materials, and the world: Reconnection to land and place · what plants need and how they grow from seeds" },
      parentNote: "What plants need (water, sunlight, air), how a seed grows into a plant, and foods that grow on trees or in the ground.",
      generate: plantsGrow,
    },
    {
      id: "sink-or-float",
      title: "Sink or Float",
      emoji: "🛟",
      blurb: "Push, pull, sink and float",
      standards: { "ca-bc": "Engagement with others, materials, and the world: Spaces, objects, and materials · how objects move, sink and float" },
      parentNote: "Guessing which things sink or float, and how pushes, pulls and rolling make things move. Try it in the bath or sink at home.",
      generate: sinkOrFloat,
    },
  ],
};
