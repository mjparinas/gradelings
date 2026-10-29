import { pick, sample, shuffle, textChoice } from "../../random";
import { sortQuestion, type SortSet } from "../../bank";
import type { Choice, Course, GenerateOptions, OrderQuestion, Question } from "../../types";

// Pre-K social studies ("My World" for little kids): me and my family, feelings, helpers, places, rules and caring for
// the world. Picture choices only, read aloud. Families come in many shapes, so no question has one right family.

type Level = NonNullable<GenerateOptions["difficulty"]>;
type Opt = Omit<Choice, "id">;
type Pic = [word: string, emoji: string];

const level = (opts?: GenerateOptions): Level => opts?.difficulty ?? 2;
const pic = ([word, emoji]: Pic): Opt => ({ label: word, emoji });

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
  return [...sample(easy, count - hardCount), ...sample(hard, hardCount)].map((i) =>
    textChoice(i.ask, pic(i.right), sample(i.wrong, difficulty === 1 ? 1 : 2).map(pic), i.hint, i.show ? { type: "emoji", emoji: i.show } : undefined),
  );
}

function order(prompt: string, steps: Pic[], hint: string): OrderQuestion {
  return { kind: "order", prompt, hint, items: steps.map(([label, emoji], i) => ({ id: `o${i}`, label, emoji })) };
}

// ---------- Me and My Family ----------

const FAMILY_ITEMS: Item[] = [
  { ask: "Which one is a baby?", right: ["baby", "👶"], wrong: [["grown-up", "🧑"], ["grandparent", "🧓"]], hint: "Babies are the youngest. They are very small." },
  { ask: "Which one is a grandparent?", right: ["grandparent", "🧓"], wrong: [["baby", "👶"], ["child", "🧒"]], hint: "A grandparent is a parent's mom or dad." },
  { ask: "Which one is a grown-up?", right: ["grown-up", "🧑"], wrong: [["baby", "👶"], ["child", "🧒"]], hint: "Grown-ups are big. They were children once!" },
  { ask: "Who is the youngest?", right: ["baby", "👶"], wrong: [["grandparent", "🧓"], ["grown-up", "🧑"]], hint: "The youngest is the one born last: the baby." },
  { ask: "What helps you grow strong?", right: ["healthy food", "🥦"], wrong: [["candy", "🍬"], ["soda", "🥤"]], hint: "Healthy food like vegetables helps you grow." },
  { ask: "What do you do before you eat?", right: ["wash hands", "🧼"], wrong: [["put on shoes", "👟"], ["go to bed", "🛏️"]], hint: "Clean hands keep germs away from your food." },
  { ask: "What do you use to brush your teeth?", right: ["toothbrush", "🪥"], wrong: [["fork", "🍴"], ["crayon", "🖍️"]], hint: "Brush your teeth in the morning and at night." },
  { ask: "Which one is a child?", right: ["child", "🧒"], wrong: [["baby", "👶"], ["grandparent", "🧓"]], hint: "A child is bigger than a baby but not grown up yet." },
  { ask: "Who is the oldest?", right: ["grandparent", "🧓"], wrong: [["baby", "👶"], ["child", "🧒"]], hint: "Grandparents have lived the longest." },
  { ask: "What do you do when you sneeze?", right: ["cover with your elbow", "💪"], wrong: [["sneeze on a friend", "🤧"], ["sneeze on food", "🍽️"]], hint: "Sneeze into your elbow to keep germs away." },
  { ask: "What helps your body rest?", right: ["sleep", "😴"], wrong: [["candy", "🍬"], ["TV", "📺"]], hint: "Sleep gives your body rest so you can grow." },
  { ask: "What is a healthy drink?", right: ["water", "🚰"], wrong: [["soda", "🥤"], ["candy", "🍭"]], hint: "Water is the best drink for your body." },
  { ask: "What helps your body move and grow strong?", right: ["playing outside", "🏃"], wrong: [["sitting all day", "🛋️"], ["eating candy", "🍬"]], hint: "Running and playing make your body strong." },
  { ask: "Which one is a healthy snack?", right: ["apple", "🍎"], wrong: [["lollipop", "🍭"], ["chips", "🍟"]], hint: "Fruit is a healthy snack." },
  { ask: "What do you wear to bed?", right: ["pyjamas", "🌙"], wrong: [["swimsuit", "🩱"], ["rain boots", "🥾"]], hint: "Pyjamas are comfy clothes for sleeping." },
  { ask: "What part of your body do you use to see?", right: ["eyes", "👀"], wrong: [["feet", "🦶"], ["ears", "👂"]], hint: "Your eyes help you see." },
  { ask: "What part of your body do you use to walk?", right: ["feet", "🦶"], wrong: [["nose", "👃"], ["hands", "✋"]], hint: "You walk on your feet." },
  { ask: "What part of your body do you use to clap?", right: ["hands", "👏"], wrong: [["feet", "🦶"], ["nose", "👃"]], hint: "You clap with your hands." },
  { ask: "Who can help you if you are lost?", right: ["a police officer", "👮"], wrong: [["a stranger's dog", "🐕"], ["a bird", "🐦"]], hint: "Police officers help people who are lost.", stretch: true },
  { ask: "What should you know to stay safe?", right: ["your grown-up's name", "🧑"], wrong: [["a cartoon's name", "📺"], ["a toy's name", "🧸"]], hint: "Knowing your grown-up's name helps others find them.", stretch: true },
  { ask: "Families can be big or small. Which one is a family?", right: ["people who love you", "👨‍👩‍👧"], wrong: [["a box of toys", "🧸"], ["a row of cars", "🚗"]], hint: "A family is the people who love and care for you.", stretch: true },
  { ask: "What makes you special?", right: ["you!", "🌟"], wrong: [["your shoes", "👟"], ["your cup", "🥤"]], hint: "You are special just the way you are.", stretch: true },
];

function meAndMyFamily(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  const ages = order(
    "Tap them in order, from youngest to oldest.",
    d === 1 ? [["baby", "👶"], ["child", "🧒"], ["grown-up", "🧑"]] : [["baby", "👶"], ["child", "🧒"], ["grown-up", "🧑"], ["grandparent", "🧓"]],
    "Babies grow into children, children grow into grown-ups, and grown-ups grow older.",
  );
  return shuffle([...fromItems(FAMILY_ITEMS, 7, d), ages]);
}

// ---------- Feelings ----------

const HAPPY: Pic = ["happy", "😀"];
const SAD: Pic = ["sad", "😢"];
const MAD: Pic = ["angry", "😠"];
const SCARED: Pic = ["scared", "😨"];
const SURPRISED: Pic = ["surprised", "😲"];
const TIRED: Pic = ["tired", "😴"];
const FEELINGS = [HAPPY, SAD, MAD, SCARED, SURPRISED, TIRED];
const not = (...p: Pic[]) => FEELINGS.filter((f) => !p.includes(f));

const FEELING_ITEMS: Item[] = [
  { ask: "Which face is happy?", right: HAPPY, wrong: not(HAPPY), hint: "A happy face has a big smile." },
  { ask: "Which face is sad?", right: SAD, wrong: not(SAD, TIRED), hint: "A sad face may have tears." },
  { ask: "Which face is angry?", right: MAD, wrong: not(MAD), hint: "An angry face frowns, with eyebrows down." },
  { ask: "Which face is scared?", right: SCARED, wrong: not(SCARED, SURPRISED), hint: "A scared face has wide eyes." },
  { ask: "Which face is sleepy?", right: TIRED, wrong: not(TIRED, SAD), hint: "A sleepy face has closed eyes." },
  { ask: "You got a present! How might you feel?", right: HAPPY, wrong: [SAD, MAD], hint: "Presents can make us happy.", show: "🎁" },
  { ask: "Your ice cream fell down. How might you feel?", right: SAD, wrong: [HAPPY, TIRED], hint: "When we lose something we like, we may feel sad.", show: "🍦" },
  { ask: "It is very late at night. How might you feel?", right: TIRED, wrong: [HAPPY, MAD], hint: "At night our bodies need rest.", show: "🌙" },
  { ask: "Which face is surprised?", right: SURPRISED, wrong: not(SURPRISED, SCARED), hint: "A surprised face has an open mouth and big eyes." },
  { ask: "It is your birthday party! How might you feel?", right: HAPPY, wrong: [SAD, TIRED], hint: "Parties can feel happy and fun.", show: "🎉" },
  { ask: "Your friend moved far away. How might you feel?", right: SAD, wrong: [HAPPY, SURPRISED], hint: "Missing a friend can feel sad.", show: "🚚" },
  { ask: "You played outside all day. How might you feel?", right: TIRED, wrong: [MAD, SCARED], hint: "After a busy day, our bodies feel tired.", show: "⚽" },
  { ask: "A jack-in-the-box pops up! How might you feel?", right: SURPRISED, wrong: [TIRED, SAD], hint: "Something sudden can surprise us.", show: "🎁" },
  { ask: "There is a big storm with thunder. How might you feel?", right: SCARED, wrong: [HAPPY, TIRED], hint: "Loud thunder can feel scary. A grown-up can help.", show: "⛈️" },
  { ask: "You built a tall tower! How might you feel?", right: HAPPY, wrong: [SAD, SCARED], hint: "Doing something hard can make us proud and happy.", show: "🧱" },
  { ask: "Your tower fell down. How might you feel?", right: SAD, wrong: [HAPPY, TIRED], hint: "It is okay to feel sad. You can build it again!", show: "🧱" },
  { ask: "You see your grandma after a long time. How might you feel?", right: HAPPY, wrong: [MAD, SAD], hint: "Seeing someone we love can make us happy.", show: "🧓" },
  { ask: "Someone pushed you in line. How might you feel?", right: MAD, wrong: [HAPPY, TIRED], hint: "It is okay to feel angry. Tell a grown-up.", show: "🚶" },
  { ask: "You feel sad. What can help?", right: ["talk to a grown-up", "🧑"], wrong: [["hide alone", "🙈"], ["break a toy", "💥"]], hint: "Talking about feelings helps.", stretch: true },
  { ask: "Your friend is angry. What can you say?", right: ["Are you okay?", "💬"], wrong: [["Go away!", "📢"], ["nothing at all", "🤐"]], hint: "Asking if someone is okay shows you care.", stretch: true },
  { ask: "A big dog barks loudly. How might you feel?", right: SCARED, wrong: [HAPPY, TIRED], hint: "Loud surprises can feel scary.", show: "🐕", stretch: true },
  { ask: "Someone took your toy. How might you feel?", right: MAD, wrong: [HAPPY, TIRED], hint: "It is okay to feel angry. Use your words to say so.", show: "🧸", stretch: true },
  { ask: "You feel angry. What can you do?", right: ["take deep breaths", "🌬️"], wrong: [["hit", "👊"], ["throw toys", "🧸"]], hint: "Breathing slowly helps your body calm down.", stretch: true },
  { ask: "Your friend is sad. What can you do?", right: ["give a hug", "🤗"], wrong: [["laugh at them", "😆"], ["walk away", "🚶"]], hint: "Kind words and hugs help a sad friend.", stretch: true },
  { ask: "You feel scared. Who can you tell?", right: ["a grown-up", "🧑"], wrong: [["a toy", "🧸"], ["nobody", "🙈"]], hint: "Grown-ups who care for you can help.", stretch: true },
];

function feelings(opts?: GenerateOptions): Question[] {
  return fromItems(FEELING_ITEMS, 8, level(opts));
}

// ---------- Community Helpers ----------

const HELPER_ITEMS: Item[] = [
  { ask: "Who helps put out fires?", right: ["firefighter", "🧑‍🚒"], wrong: [["chef", "🧑‍🍳"], ["farmer", "🧑‍🌾"]], hint: "Firefighters spray water on fires.", show: "🔥" },
  { ask: "Who helps you when you are sick?", right: ["doctor", "🧑‍⚕️"], wrong: [["chef", "🧑‍🍳"], ["painter", "🧑‍🎨"]], hint: "Doctors and nurses help sick people get well." },
  { ask: "Who grows food on a farm?", right: ["farmer", "🧑‍🌾"], wrong: [["firefighter", "🧑‍🚒"], ["pilot", "🧑‍✈️"]], hint: "Farmers grow food and raise animals.", show: "🌽" },
  { ask: "Who cooks food in a restaurant?", right: ["chef", "🧑‍🍳"], wrong: [["farmer", "🧑‍🌾"], ["doctor", "🧑‍⚕️"]], hint: "A chef cooks food for people to eat.", show: "🍲" },
  { ask: "Who flies an airplane?", right: ["pilot", "🧑‍✈️"], wrong: [["chef", "🧑‍🍳"], ["farmer", "🧑‍🌾"]], hint: "A pilot flies the plane.", show: "✈️" },
  { ask: "Who helps you learn at school?", right: ["teacher", "🧑‍🏫"], wrong: [["pilot", "🧑‍✈️"], ["firefighter", "🧑‍🚒"]], hint: "Teachers help children learn." },
  { ask: "Which truck helps put out fires?", right: ["fire truck", "🚒"], wrong: [["school bus", "🚌"], ["tractor", "🚜"]], hint: "Fire trucks carry water and ladders." },
  { ask: "Which one takes sick people to the hospital?", right: ["ambulance", "🚑"], wrong: [["ice cream truck", "🍦"], ["bike", "🚲"]], hint: "An ambulance has a siren and helps sick people fast." },
  { ask: "Who keeps people safe on the road?", right: ["police officer", "👮"], wrong: [["chef", "🧑‍🍳"], ["farmer", "🧑‍🌾"]], hint: "Police officers help keep people safe." },
  { ask: "Who drives the bus?", right: ["bus driver", "🚌"], wrong: [["pilot", "🧑‍✈️"], ["doctor", "🧑‍⚕️"]], hint: "A bus driver drives the bus.", show: "🚏" },
  { ask: "Who fixes a broken pipe?", right: ["plumber", "🔧"], wrong: [["chef", "🧑‍🍳"], ["teacher", "🧑‍🏫"]], hint: "A plumber fixes pipes and taps.", show: "🚰" },
  { ask: "Who builds houses?", right: ["builder", "👷"], wrong: [["pilot", "🧑‍✈️"], ["chef", "🧑‍🍳"]], hint: "Builders build houses and buildings.", show: "🏠" },
  { ask: "Who helps you find books at the library?", right: ["librarian", "📚"], wrong: [["farmer", "🧑‍🌾"], ["firefighter", "🧑‍🚒"]], hint: "A librarian helps you find books." },
  { ask: "Who takes away the garbage?", right: ["garbage collector", "🚛"], wrong: [["teacher", "🧑‍🏫"], ["pilot", "🧑‍✈️"]], hint: "Garbage collectors keep streets clean.", show: "🗑️" },
  { ask: "Who bakes bread?", right: ["baker", "🥖"], wrong: [["firefighter", "🧑‍🚒"], ["plumber", "🔧"]], hint: "A baker bakes bread and buns." },
  { ask: "What does a doctor use to hear your heart?", right: ["stethoscope", "🩺"], wrong: [["hammer", "🔨"], ["spoon", "🥄"]], hint: "A stethoscope lets the doctor hear your heartbeat." },
  { ask: "What does a farmer drive?", right: ["tractor", "🚜"], wrong: [["fire truck", "🚒"], ["ambulance", "🚑"]], hint: "Farmers drive tractors in the fields." },
  { ask: "Which one helps a firefighter reach high?", right: ["ladder", "🪜"], wrong: [["spoon", "🥄"], ["pillow", "🛏️"]], hint: "A ladder helps firefighters climb up high.", stretch: true },
  { ask: "Who helps people cross the street near school?", right: ["crossing guard", "🦺"], wrong: [["chef", "🧑‍🍳"], ["pilot", "🧑‍✈️"]], hint: "A crossing guard holds up a stop sign so children can cross.", stretch: true },
  { ask: "Who helps sick people at the hospital?", right: ["nurse", "🧑‍⚕️"], wrong: [["baker", "🥖"], ["builder", "👷"]], hint: "Nurses and doctors care for sick people." },
  { ask: "Who brings letters to your home?", right: ["letter carrier", "📬"], wrong: [["chef", "🧑‍🍳"], ["farmer", "🧑‍🌾"]], hint: "Letter carriers bring the mail.", stretch: true },
  { ask: "Who helps keep your teeth healthy?", right: ["dentist", "🦷"], wrong: [["pilot", "🧑‍✈️"], ["farmer", "🧑‍🌾"]], hint: "A dentist checks and cleans teeth.", stretch: true },
  { ask: "Who helps sick pets?", right: ["vet", "🐾"], wrong: [["pilot", "🧑‍✈️"], ["chef", "🧑‍🍳"]], hint: "A vet is an animal doctor.", show: "🐶", stretch: true },
  { ask: "What does a firefighter wear?", right: ["helmet", "⛑️"], wrong: [["crown", "👑"], ["party hat", "🥳"]], hint: "A helmet keeps a firefighter's head safe.", stretch: true },
];

function helpers(opts?: GenerateOptions): Question[] {
  return fromItems(HELPER_ITEMS, 8, level(opts));
}

// ---------- Places Around Me ----------

const PLACE_ITEMS: Item[] = [
  { ask: "Where do you go to borrow books?", right: ["library", "📚"], wrong: [["farm", "🚜"], ["beach", "🏖️"]], hint: "A library lends books for free." },
  { ask: "Where can you buy food?", right: ["grocery store", "🛒"], wrong: [["library", "📚"], ["school", "🏫"]], hint: "Stores sell food and other things." },
  { ask: "Where do you sleep at night?", right: ["home", "🏠"], wrong: [["park", "🛝"], ["store", "🛒"]], hint: "We sleep at home in our beds." },
  { ask: "Where do children play on slides and swings?", right: ["playground", "🛝"], wrong: [["hospital", "🏥"], ["store", "🛒"]], hint: "Playgrounds have slides and swings." },
  { ask: "Where do sick people go to get better?", right: ["hospital", "🏥"], wrong: [["playground", "🛝"], ["library", "📚"]], hint: "Doctors and nurses work at the hospital." },
  { ask: "Where do children go to learn?", right: ["school", "🏫"], wrong: [["hospital", "🏥"], ["beach", "🏖️"]], hint: "Children learn with teachers at school." },
  { ask: "Where do you see cows and tractors?", right: ["farm", "🚜"], wrong: [["library", "📚"], ["school", "🏫"]], hint: "Farmers keep cows and drive tractors." },
  { ask: "Where can you build sandcastles?", right: ["beach", "🏖️"], wrong: [["library", "📚"], ["hospital", "🏥"]], hint: "Beaches have lots of sand." },
  { ask: "Where do you go to mail a letter?", right: ["post office", "🏤"], wrong: [["beach", "🏖️"], ["farm", "🚜"]], hint: "The post office sends letters and parcels." },
  { ask: "Where do you see a firefighter's truck?", right: ["fire station", "🚒"], wrong: [["library", "📚"], ["beach", "🏖️"]], hint: "Fire trucks are kept at the fire station." },
  { ask: "Where can you see lots of animals from far away?", right: ["zoo", "🦁"], wrong: [["library", "📚"], ["post office", "🏤"]], hint: "A zoo has animals from all over the world." },
  { ask: "Where do you get on a train?", right: ["train station", "🚉"], wrong: [["playground", "🛝"], ["hospital", "🏥"]], hint: "Trains stop at the train station." },
  { ask: "Where do airplanes take off?", right: ["airport", "✈️"], wrong: [["farm", "🚜"], ["school", "🏫"]], hint: "Airplanes take off and land at the airport." },
  { ask: "Where can you swim in a pool?", right: ["swimming pool", "🏊"], wrong: [["library", "📚"], ["post office", "🏤"]], hint: "Pools are for swimming." },
  { ask: "Where can you see trees, grass and ducks?", right: ["park", "🌳"], wrong: [["store", "🛒"], ["post office", "🏤"]], hint: "Parks have trees, grass and ponds." },
  { ask: "Where do you eat dinner with your family?", right: ["home", "🏠"], wrong: [["post office", "🏤"], ["fire station", "🚒"]], hint: "Many families eat dinner together at home." },
  { ask: "Where can you get a haircut?", right: ["hair salon", "💇"], wrong: [["zoo", "🦁"], ["farm", "🚜"]], hint: "Hairdressers cut hair at a salon." },
  { ask: "Where do you go to see a dentist?", right: ["dentist's office", "🦷"], wrong: [["beach", "🏖️"], ["zoo", "🦁"]], hint: "Dentists work in an office with a special chair." },
  { ask: "What do you look at to know when to cross?", right: ["traffic light", "🚦"], wrong: [["tree", "🌳"], ["cloud", "☁️"]], hint: "Wait for the light that says you can cross.", stretch: true },
  { ask: "Which one shows you where places are?", right: ["map", "🗺️"], wrong: [["clock", "🕒"], ["calendar", "📅"]], hint: "A map is a picture of places from above.", stretch: true },
  { ask: "What do you call where you live?", right: ["home", "🏡"], wrong: [["the zoo", "🦁"], ["the airport", "✈️"]], hint: "Your home is where you live.", stretch: true },
  { ask: "What helps you find your way?", right: ["map", "🗺️"], wrong: [["spoon", "🥄"], ["ball", "⚽"]], hint: "A map shows where places are.", stretch: true },
  { ask: "Which sign means stop?", right: ["stop sign", "🛑"], wrong: [["green light", "🟢"], ["arrow", "➡️"]], hint: "A red stop sign means stop.", stretch: true },
  { ask: "What do you do at a red light?", right: ["stop", "🛑"], wrong: [["go", "🟢"], ["run", "🏃"]], hint: "Red means stop. Green means go.", show: "🚦", stretch: true },
];

function placesAroundMe(opts?: GenerateOptions): Question[] {
  return fromItems(PLACE_ITEMS, 8, level(opts));
}

// ---------- Taking Turns ----------

const KIND_SORT: SortSet = {
  prompt: "Kind or not kind? Tap a picture, then its basket.",
  hint: "Kind things help people feel good.",
  bins: [
    { id: "kind", label: "kind", emoji: "💛" },
    { id: "unkind", label: "not kind", emoji: "🚫" },
  ],
  items: [
    { label: "sharing toys", emoji: "🧸", bin: "kind" },
    { label: "helping a friend", emoji: "🤝", bin: "kind" },
    { label: "giving a hug", emoji: "🤗", bin: "kind" },
    { label: "saying thank you", emoji: "🙏", bin: "kind" },
    { label: "hitting", emoji: "👊", bin: "unkind" },
    { label: "grabbing toys", emoji: "✊", bin: "unkind" },
    { label: "yelling at a friend", emoji: "📣", bin: "unkind" },
    { label: "laughing at someone", emoji: "😆", bin: "unkind" },
  ],
};

const RULE_ITEMS: Item[] = [
  { ask: "Your friend wants the swing too. What can you do?", right: ["take turns", "🔄"], wrong: [["push them", "👐"], ["yell", "📣"]], hint: "Taking turns lets everyone play." },
  { ask: "Someone gives you a gift. What do you say?", right: ["thank you", "🙏"], wrong: [["go away", "👋"], ["nothing", "🤐"]], hint: "We say thank you when someone is kind.", show: "🎁" },
  { ask: "What do you do when playtime is over?", right: ["clean up", "🧺"], wrong: [["hide the toys", "🙈"], ["throw them", "🤾"]], hint: "Everyone helps put the toys away." },
  { ask: "Before you cross the street, what do you do?", right: ["hold a grown-up's hand", "🤝"], wrong: [["run across", "🏃"], ["close your eyes", "🙈"]], hint: "Stop, look and hold a grown-up's hand." },
  { ask: "How do you speak inside?", right: ["quiet voice", "🤫"], wrong: [["shouting", "📢"], ["screaming", "😱"]], hint: "Indoors we use a quiet voice." },
  { ask: "A friend is all alone. What can you do?", right: ["ask them to play", "🤝"], wrong: [["walk away", "🚶"], ["laugh", "😆"]], hint: "Asking a friend to play is kind.", stretch: true },
  { ask: "What keeps your head safe on a bike?", right: ["helmet", "⛑️"], wrong: [["sunglasses", "🕶️"], ["scarf", "🧣"]], hint: "Always wear a helmet when you ride.", show: "🚲", stretch: true },
  { ask: "You want a turn talking. What do you do?", right: ["raise your hand", "✋"], wrong: [["shout", "📢"], ["stomp", "🦶"]], hint: "Raising your hand shows you want a turn.", stretch: true },
];

function takingTurns(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  return shuffle([sortQuestion(KIND_SORT, d === 1 ? 2 : 3), ...fromItems(RULE_ITEMS, 7, d)]);
}

// ---------- First, Next, Last ----------

const ROUTINES: { prompt: string; steps: Pic[]; hint: string }[] = [
  { prompt: "Getting ready for the day. Tap them in order.", steps: [["wake up", "🛏️"], ["get dressed", "👕"], ["eat breakfast", "🥣"]], hint: "First wake up, then get dressed, then eat breakfast." },
  { prompt: "Bedtime. Tap them in order.", steps: [["bath", "🛁"], ["pyjamas", "👕"], ["story", "📖"], ["sleep", "😴"]], hint: "Bath, pyjamas, a story, then sleep." },
  { prompt: "Putting on shoes. Tap them in order.", steps: [["socks", "🧦"], ["shoes", "👟"], ["go outside", "🌳"]], hint: "Socks go on before shoes!" },
  { prompt: "Making a sandwich. Tap them in order.", steps: [["bread", "🍞"], ["cheese", "🧀"], ["eat", "🥪"]], hint: "Get the bread, add the filling, then eat it." },
  { prompt: "Planting a seed. Tap them in order.", steps: [["dig", "🕳️"], ["seed", "🌰"], ["water", "💧"], ["grow", "🌱"]], hint: "Dig a hole, drop in the seed, water it, and watch it grow." },
  { prompt: "Washing hands. Tap them in order.", steps: [["water", "💧"], ["soap", "🧼"], ["dry", "👐"]], hint: "Wet your hands, use soap, rinse, then dry." },
  { prompt: "A day. Tap them in order.", steps: [["morning", "🌅"], ["afternoon", "☀️"], ["night", "🌙"]], hint: "Morning comes first, then afternoon, then night." },
  { prompt: "Brushing teeth. Tap them in order.", steps: [["toothpaste", "🦷"], ["brush", "🪥"], ["rinse", "🚰"]], hint: "Put on toothpaste, brush, then rinse." },
  { prompt: "Riding in a car. Tap them in order.", steps: [["get in", "🚗"], ["buckle up", "🔒"], ["drive", "🛣️"]], hint: "Always buckle up before the car goes." },
  { prompt: "Painting a picture. Tap them in order.", steps: [["paper", "📄"], ["paint", "🎨"], ["hang it up", "🖼️"]], hint: "Get paper, paint, then hang up your picture." },
  { prompt: "Baking cookies. Tap them in order.", steps: [["mix", "🥣"], ["bake", "♨️"], ["eat", "🍪"]], hint: "Mix the dough, bake it, then eat the cookies." },
  { prompt: "Going to the library. Tap them in order.", steps: [["walk in", "🚶"], ["pick a book", "📚"], ["read it", "📖"]], hint: "Go in, choose a book, then read it." },
  { prompt: "Getting ready for rain. Tap them in order.", steps: [["coat", "🧥"], ["boots", "🥾"], ["umbrella", "☂️"], ["go out", "🚪"]], hint: "Put on your coat and boots, open the umbrella, then go out." },
  { prompt: "Growing up. Tap them in order.", steps: [["baby", "👶"], ["child", "🧒"], ["grown-up", "🧑"]], hint: "Babies grow into children, and children grow into grown-ups." },
];

const THEN_NOW_ITEMS: Item[] = [
  { ask: "What do you do after you eat?", right: ["clean up", "🧽"], wrong: [["eat breakfast again", "🥣"], ["put on pyjamas", "🌙"]], hint: "After eating, we help clean up." },
  { ask: "What comes after night?", right: ["morning", "🌅"], wrong: [["night again", "🌃"], ["lunch", "🥪"]], hint: "After night, the sun comes up: it's morning!" },
  { ask: "What do you do before bed?", right: ["brush your teeth", "🪥"], wrong: [["eat breakfast", "🥣"], ["go to the park", "🛝"]], hint: "Brushing your teeth comes before bed." },
  { ask: "What do you do before you go outside in the rain?", right: ["put on boots", "🥾"], wrong: [["take a bath", "🛁"], ["go to sleep", "😴"]], hint: "Boots keep your feet dry outside." },
  { ask: "Long ago, people wrote letters. What do many people use now?", right: ["phone", "📱"], wrong: [["drum", "🥁"], ["kite", "🪁"]], hint: "Today many people send messages with phones.", show: "✉️", stretch: true },
  { ask: "Long ago, people washed clothes by hand. What do many use now?", right: ["washing machine", "🧺"], wrong: [["oven", "🍳"], ["bicycle", "🚲"]], hint: "Washing machines clean clothes today.", stretch: true },
  { ask: "You were a baby. What are you now?", right: ["a child", "🧒"], wrong: [["a grandparent", "🧓"], ["a baby", "👶"]], hint: "You grew from a baby into a child.", stretch: true },
  { ask: "Long ago, people used candles for light. What do we use now?", right: ["light bulb", "💡"], wrong: [["rock", "🪨"], ["shoe", "👟"]], hint: "Today, light bulbs light our homes.", show: "🕯️", stretch: true },
  { ask: "Long ago, people rode horses. What do many people ride now?", right: ["car", "🚗"], wrong: [["dinosaur", "🦕"], ["cloud", "☁️"]], hint: "Today many people ride in cars and buses.", show: "🐎", stretch: true },
  { ask: "What do you do when you wake up?", right: ["get dressed", "👕"], wrong: [["go to bed", "🛏️"], ["put on pyjamas", "🌙"]], hint: "In the morning we get ready for the day." },
  { ask: "What do you do at night?", right: ["sleep", "😴"], wrong: [["eat breakfast", "🥣"], ["go to school", "🏫"]], hint: "Night is time to rest." },
];

function firstNextLast(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  const routines = ROUTINES.filter((r) => d > 1 || r.steps.length === 3);
  const orders = sample(routines, 5).map((r) => order(r.prompt, r.steps, r.hint));
  return shuffle([...orders, ...fromItems(THEN_NOW_ITEMS, 3, d)]);
}

// ---------- Caring for Our World ----------

const CARE_SORT: SortSet = {
  prompt: "Recycle or compost? Tap a picture, then its bin.",
  hint: "Food scraps go in compost. Bottles, cans and paper go in recycling.",
  bins: [
    { id: "recycle", label: "recycling", emoji: "♻️" },
    { id: "compost", label: "compost", emoji: "🌱" },
  ],
  items: [
    { label: "jar", emoji: "🫙", bin: "recycle" },
    { label: "can", emoji: "🥫", bin: "recycle" },
    { label: "newspaper", emoji: "📰", bin: "recycle" },
    { label: "box", emoji: "📦", bin: "recycle" },
    { label: "banana peel", emoji: "🍌", bin: "compost" },
    { label: "apple core", emoji: "🍎", bin: "compost" },
    { label: "eggshell", emoji: "🥚", bin: "compost" },
    { label: "leaves", emoji: "🍂", bin: "compost" },
  ],
};

const CARE_ITEMS: Item[] = [
  { ask: "You see litter at the park. What can you do?", right: ["put it in the garbage", "🗑️"], wrong: [["leave it", "🙈"], ["kick it", "🦶"]], hint: "Putting litter in the garbage keeps parks clean." },
  { ask: "You are done brushing your teeth. What can you do?", right: ["turn off the tap", "🚰"], wrong: [["leave it running", "🌊"], ["splash", "💦"]], hint: "Turning off the tap saves water." },
  { ask: "You leave a room. What can you do?", right: ["turn off the light", "💡"], wrong: [["leave it on", "🔆"], ["turn on more", "🔦"]], hint: "Turning off lights saves energy." },
  { ask: "How can you help a garden grow?", right: ["water the plants", "💧"], wrong: [["step on them", "👣"], ["pick every flower", "🥀"]], hint: "Plants need water to grow." },
  { ask: "What can you do with an empty can?", right: ["recycle it", "♻️"], wrong: [["drop it on the ground", "🍂"], ["throw it in a pond", "🌊"]], hint: "Cans can be recycled into new things.", show: "🥫" },
  { ask: "How can you be kind to animals outside?", right: ["watch them quietly", "👀"], wrong: [["chase them", "🏃"], ["shout at them", "📢"]], hint: "Animals feel safe when we are calm and quiet.", stretch: true },
  { ask: "Which one helps keep the air clean?", right: ["planting a tree", "🌳"], wrong: [["burning garbage", "🔥"], ["leaving the car running", "🚗"]], hint: "Trees help clean the air.", stretch: true },
];

function caringForOurWorld(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  return shuffle([sortQuestion(CARE_SORT, d === 1 ? 2 : 3), ...fromItems(CARE_ITEMS, 6, d), pick([sortQuestion(CARE_SORT, 2), ...fromItems(CARE_ITEMS, 1, d)])]);
}

export const course: Course = {
  grade: "pk",
  subject: "social",
  bigIdeas: {
    "ca-bc": [
      "Nurturing a sense of well-being and belonging supports children as they learn about and investigate the world around them.",
      "A positive personal and cultural identity is the awareness, understanding, and appreciation of all the facets that contribute to a healthy sense of oneself.",
      "Children learn about their families and communities, the people who help them, and how to care for one another and the world.",
    ],
  },
  units: [
    {
      id: "my-family",
      title: "Me and My Family",
      emoji: "👨‍👩‍👧",
      blurb: "Growing up and staying healthy",
      standards: { "ca-bc": "Identities, social responsibility, and diversity: Individual differences · knowing about myself, my family and growing up" },
      parentNote: "Talking about family members, growing up from baby to grandparent, and healthy habits like washing hands and brushing teeth. Families come in many shapes; questions never assume one kind.",
      generate: meAndMyFamily,
    },
    {
      id: "feelings",
      title: "Feelings",
      emoji: "😊",
      blurb: "Happy, sad, angry, scared",
      standards: { "ca-bc": "Well-being and belonging: Emotions, thoughts, and views · naming feelings and ways to calm down" },
      parentNote: "Naming feelings from faces and everyday moments, and simple ways to cope, like deep breaths or telling a grown-up. Practice, not a judgment of how a child feels.",
      generate: feelings,
    },
    {
      id: "community-helpers",
      title: "Community Helpers",
      emoji: "🚒",
      blurb: "People who help us",
      standards: { "ca-bc": "Engagement with others, materials, and the world: Local community connections · people who help in the community" },
      parentNote: "Firefighters, doctors, farmers, teachers and other people who help in the community, and the vehicles and tools they use.",
      generate: helpers,
    },
    {
      id: "places-around-me",
      title: "Places Around Me",
      emoji: "🏡",
      blurb: "Home, school and the park",
      standards: { "ca-bc": "Engagement with others, materials, and the world: Local community connections · places in the community and what happens there" },
      parentNote: "Places in the community (home, school, library, store, hospital, park) and what people do there, plus simple signs like a stop sign.",
      generate: placesAroundMe,
    },
    {
      id: "taking-turns",
      title: "Taking Turns",
      emoji: "🤝",
      blurb: "Kind, fair and safe",
      standards: { "ca-bc": "Identities, social responsibility, and diversity: Democratic practices · sharing, taking turns and following simple rules" },
      parentNote: "Sharing, taking turns, kind and unkind actions, and simple safety rules like holding a grown-up's hand to cross the street.",
      generate: takingTurns,
    },
    {
      id: "first-next-last",
      title: "First, Next, Last",
      emoji: "⏳",
      blurb: "Order of the day",
      standards: { "ca-bc": "Well-being and belonging: Nourishment, sleep, and physical activity · daily routines in order, and then and now" },
      parentNote: "Putting daily routines in order (wake up, get dressed, eat breakfast) and noticing how things were long ago compared with now.",
      generate: firstNextLast,
    },
    {
      id: "caring-for-our-world",
      title: "Caring for Our World",
      emoji: "🌍",
      blurb: "Recycle, save water, be kind",
      standards: { "ca-bc": "Identities, social responsibility, and diversity: Interrelationship of humans and their natural environments · caring for the environment and living things" },
      parentNote: "Small ways to care for the world: recycling and composting, saving water and power, and being gentle with plants and animals.",
      generate: caringForOurWorld,
    },
  ],
};
