import type { SortSet } from "../../bank";

// More Pre-K social studies picture questions, so each unit has about 40 to draw from (./social.ts takes these as
// extra items). Same rules as there: picture choices only, families come in many shapes, nothing names a region.

type Pic = [word: string, emoji: string];
export interface MoreItem {
  ask: string;
  right: Pic;
  wrong: Pic[];
  hint: string;
  show?: string;
  stretch?: boolean;
}

export const FAMILY_MORE: MoreItem[] = [
  { ask: "What do you use to wash your hands?", right: ["soap and water", "🧼"], wrong: [["crayons", "🖍️"], ["blocks", "🧱"]], hint: "Soap and water wash germs away." },
  { ask: "What do you put on when it is cold?", right: ["coat", "🧥"], wrong: [["swimsuit", "🩱"], ["sandals", "🩴"]], hint: "A coat keeps you warm." },
  { ask: "What do you wear on your feet?", right: ["shoes", "👟"], wrong: [["hat", "🧢"], ["gloves", "🧤"]], hint: "Shoes go on your feet." },
  { ask: "What do you wear on your head?", right: ["hat", "🧢"], wrong: [["socks", "🧦"], ["mittens", "🧤"]], hint: "A hat goes on your head." },
  { ask: "Which one is part of your face?", right: ["nose", "👃"], wrong: [["knee", "🦵"], ["elbow", "💪"]], hint: "Your nose is on your face." },
  { ask: "What do you use to hear?", right: ["ears", "👂"], wrong: [["feet", "🦶"], ["knees", "🦵"]], hint: "You hear with your ears." },
  { ask: "What do you do when you are thirsty?", right: ["drink water", "🚰"], wrong: [["take a nap", "😴"], ["put on a coat", "🧥"]], hint: "Water helps when you are thirsty." },
  { ask: "What do you do when you are tired?", right: ["rest", "😴"], wrong: [["run a race", "🏃"], ["jump up and down", "🦘"]], hint: "Resting helps tired bodies." },
  { ask: "What do you eat for breakfast?", right: ["porridge", "🥣"], wrong: [["birthday cake", "🎂"], ["soup bowl", "🍲"]], hint: "Breakfast is the first meal of the day.", show: "🌅" },
  { ask: "Which one is a healthy food?", right: ["broccoli", "🥦"], wrong: [["candy", "🍬"], ["doughnut", "🍩"]], hint: "Vegetables help your body grow." },
  { ask: "Which one is a healthy food?", right: ["banana", "🍌"], wrong: [["lollipop", "🍭"], ["cupcake", "🧁"]], hint: "Fruit helps your body grow." },
  { ask: "Who loves and takes care of you?", right: ["your family", "👨‍👩‍👧"], wrong: [["a toy", "🧸"], ["a rock", "🪨"]], hint: "Families love and care for each other." },
  { ask: "Who might live in a family?", right: ["grown-ups and children", "👨‍👩‍👧"], wrong: [["only toys", "🧸"], ["only cars", "🚗"]], hint: "Families have grown-ups and children, in many shapes." },
  { ask: "What do families do together?", right: ["share a meal", "🍽️"], wrong: [["sleep in the street", "🚧"], ["fly to the moon", "🚀"]], hint: "Many families eat together." },
  { ask: "What do you do when you meet someone new?", right: ["say hello", "👋"], wrong: [["hide", "🙈"], ["grab their toy", "✊"]], hint: "A friendly hello is a kind start." },
  { ask: "What do you say when you leave?", right: ["goodbye", "👋"], wrong: [["good morning", "🌅"], ["happy birthday", "🎂"]], hint: "We wave and say goodbye." },
  { ask: "What do you say when you ask for something?", right: ["please", "🙏"], wrong: [["give me", "✊"], ["now!", "📢"]], hint: "Please is a polite word." },
  { ask: "Which one grows when you grow up?", right: ["your body", "🧍"], wrong: [["your teddy bear", "🧸"], ["your shoes", "👟"]], hint: "Your body grows bigger every year." },
  { ask: "How many hands do you have?", right: ["two", "✌️"], wrong: [["five", "🖐️"], ["ten", "🔟"]], hint: "You have two hands.", stretch: true },
  { ask: "Who helps you when you cannot reach something high?", right: ["a grown-up", "🧑"], wrong: [["a doll", "🪆"], ["a ball", "⚽"]], hint: "Ask a grown-up for help.", stretch: true },
  { ask: "Which one is a way to stay healthy?", right: ["playing outside", "🏃"], wrong: [["skipping every meal", "🚫"], ["never sleeping", "😵"]], hint: "Playing, eating well and sleeping keep you healthy.", stretch: true },
  { ask: "Who has lived the longest?", right: ["great-grandparent", "🧓"], wrong: [["baby", "👶"], ["child", "🧒"]], hint: "The oldest people have lived the most years.", stretch: true },
  { ask: "What is special about you?", right: ["no one else is just like you", "🌟"], wrong: [["you look like a table", "🪑"], ["you are a robot", "🤖"]], hint: "Everybody is one of a kind.", stretch: true },
];

export const FEELING_MORE: MoreItem[] = [
  { ask: "You get a big hug. How might you feel?", right: ["happy", "😀"], wrong: [["angry", "😠"], ["scared", "😨"]], hint: "Hugs can make us feel happy and safe.", show: "🤗" },
  { ask: "You lose your balloon. How might you feel?", right: ["sad", "😢"], wrong: [["happy", "😀"], ["tired", "😴"]], hint: "Losing something can feel sad.", show: "🎈" },
  { ask: "It is time for bed. How might you feel?", right: ["tired", "😴"], wrong: [["angry", "😠"], ["surprised", "😲"]], hint: "At bedtime we feel sleepy.", show: "🛏️" },
  { ask: "You hear a loud bang. How might you feel?", right: ["surprised", "😲"], wrong: [["tired", "😴"], ["happy", "😀"]], hint: "Loud sounds can surprise us.", show: "💥" },
  { ask: "You see a spider you don't know. How might you feel?", right: ["scared", "😨"], wrong: [["sleepy", "😴"], ["silly", "😆"]], hint: "New things can feel a little scary.", show: "🕷️" },
  { ask: "You are going to the park! How might you feel?", right: ["happy", "😀"], wrong: [["sad", "😢"], ["angry", "😠"]], hint: "Going to a fun place makes us happy.", show: "🛝" },
  { ask: "A friend says they will not play with you. How might you feel?", right: ["sad", "😢"], wrong: [["happy", "😀"], ["tired", "😴"]], hint: "Being left out feels sad.", show: "🚶" },
  { ask: "Someone broke your toy on purpose. How might you feel?", right: ["angry", "😠"], wrong: [["happy", "😀"], ["tired", "😴"]], hint: "It is okay to feel angry. Tell a grown-up.", show: "🧸" },
  { ask: "You smell your favourite dinner. How might you feel?", right: ["happy", "😀"], wrong: [["scared", "😨"], ["sad", "😢"]], hint: "Good smells can make us happy.", show: "🍲" },
  { ask: "You wake up in a dark room. How might you feel?", right: ["scared", "😨"], wrong: [["happy", "😀"], ["silly", "😆"]], hint: "The dark can feel scary. A grown-up can help.", show: "🌑" },
  { ask: "A puppy licks your face. How might you feel?", right: ["surprised", "😲"], wrong: [["tired", "😴"], ["sad", "😢"]], hint: "A sudden lick can surprise you.", show: "🐶" },
  { ask: "You got a sticker for helping. How might you feel?", right: ["proud", "😊"], wrong: [["angry", "😠"], ["scared", "😨"]], hint: "Helping can make us feel proud.", show: "⭐" },
  { ask: "Which face looks silly?", right: ["silly", "🤪"], wrong: [["sad", "😢"], ["angry", "😠"]], hint: "A silly face is goofy and fun." },
  { ask: "Which face looks proud?", right: ["proud", "😊"], wrong: [["sad", "😢"], ["scared", "😨"]], hint: "A proud face has a warm smile." },
  { ask: "Which face looks worried?", right: ["worried", "😟"], wrong: [["happy", "😀"], ["silly", "🤪"]], hint: "A worried face has bent eyebrows." },
  { ask: "Which face is calm?", right: ["calm", "😌"], wrong: [["angry", "😠"], ["scared", "😨"]], hint: "A calm face is peaceful and relaxed." },
  { ask: "You feel mad. What can help you calm down?", right: ["squeeze a pillow", "🛏️"], wrong: [["hit a friend", "👊"], ["break a toy", "💥"]], hint: "Squeezing a pillow is a safe way to let it out.", stretch: true },
  { ask: "You feel worried. What can help?", right: ["tell a grown-up", "🧑"], wrong: [["keep it secret", "🤐"], ["hide under a bed", "🙈"]], hint: "Telling a grown-up helps worries feel smaller.", stretch: true },
  { ask: "A friend dropped their ice cream. What can you say?", right: ["I am sorry", "💬"], wrong: [["ha ha", "😆"], ["too bad", "🤷"]], hint: "Kind words help a friend feel better.", stretch: true },
  { ask: "You feel excited. What might you do?", right: ["jump for joy", "🦘"], wrong: [["hide", "🙈"], ["cry", "😢"]], hint: "Excited bodies want to bounce.", stretch: true },
  { ask: "Everyone has feelings. Which one is okay to feel?", right: ["all feelings", "💛"], wrong: [["only happy ones", "😀"], ["none at all", "🚫"]], hint: "All feelings are okay. It is what we do next that matters.", stretch: true },
  { ask: "How can you show a friend you care?", right: ["listen to them", "👂"], wrong: [["walk away", "🚶"], ["cover your ears", "🙉"]], hint: "Listening shows you care.", stretch: true },
];

export const HELPER_MORE: MoreItem[] = [
  { ask: "Who paints walls?", right: ["painter", "🧑‍🎨"], wrong: [["pilot", "🧑‍✈️"], ["baker", "🥖"]], hint: "A painter paints walls and pictures." },
  { ask: "Who fixes cars?", right: ["mechanic", "🔧"], wrong: [["baker", "🥖"], ["teacher", "🧑‍🏫"]], hint: "A mechanic fixes cars and trucks.", show: "🚗" },
  { ask: "Who cuts hair?", right: ["hairdresser", "💇"], wrong: [["farmer", "🧑‍🌾"], ["pilot", "🧑‍✈️"]], hint: "A hairdresser cuts and styles hair." },
  { ask: "Who sells things in a store?", right: ["shopkeeper", "🛒"], wrong: [["firefighter", "🧑‍🚒"], ["pilot", "🧑‍✈️"]], hint: "Shopkeepers help you buy things." },
  { ask: "Who helps lost cats and dogs find a home?", right: ["animal shelter worker", "🐾"], wrong: [["chef", "🧑‍🍳"], ["pilot", "🧑‍✈️"]], hint: "Shelter workers care for animals." },
  { ask: "Who drives a taxi?", right: ["taxi driver", "🚕"], wrong: [["farmer", "🧑‍🌾"], ["dentist", "🦷"]], hint: "A taxi driver takes people where they need to go." },
  { ask: "Who captains a ship?", right: ["captain", "🚢"], wrong: [["baker", "🥖"], ["teacher", "🧑‍🏫"]], hint: "A captain steers the ship." },
  { ask: "Who builds a bridge?", right: ["builder", "👷"], wrong: [["chef", "🧑‍🍳"], ["dentist", "🦷"]], hint: "Builders put bridges and houses together." },
  { ask: "Who looks after your teeth?", right: ["dentist", "🦷"], wrong: [["farmer", "🧑‍🌾"], ["pilot", "🧑‍✈️"]], hint: "A dentist keeps teeth healthy." },
  { ask: "Who helps animals on a farm?", right: ["farmer", "🧑‍🌾"], wrong: [["pilot", "🧑‍✈️"], ["painter", "🧑‍🎨"]], hint: "Farmers feed and care for farm animals." },
  { ask: "Who teaches you how to play music?", right: ["music teacher", "🎵"], wrong: [["firefighter", "🧑‍🚒"], ["plumber", "🔧"]], hint: "A music teacher helps you sing and play." },
  { ask: "Who helps you cross the road at school?", right: ["crossing guard", "🦺"], wrong: [["baker", "🥖"], ["painter", "🧑‍🎨"]], hint: "A crossing guard keeps you safe at the road." },
  { ask: "Who makes pizza?", right: ["cook", "🍕"], wrong: [["pilot", "🧑‍✈️"], ["firefighter", "🧑‍🚒"]], hint: "Cooks make food for hungry people." },
  { ask: "What does a mail carrier bring?", right: ["letters", "✉️"], wrong: [["fish", "🐟"], ["pizza", "🍕"]], hint: "Mail carriers bring letters and parcels." },
  { ask: "What does a teacher use to write on the board?", right: ["chalk or marker", "🖍️"], wrong: [["spoon", "🥄"], ["hammer", "🔨"]], hint: "Teachers write on the board with chalk or markers." },
  { ask: "What does a builder wear to stay safe?", right: ["hard hat", "👷"], wrong: [["party hat", "🥳"], ["crown", "👑"]], hint: "A hard hat protects a builder's head." },
  { ask: "What does a doctor wear around the neck?", right: ["stethoscope", "🩺"], wrong: [["scarf", "🧣"], ["necklace of beads", "📿"]], hint: "A stethoscope lets the doctor hear your heart." },
  { ask: "What does a chef wear on the head?", right: ["chef's hat", "👨‍🍳"], wrong: [["hard hat", "👷"], ["crown", "👑"]], hint: "A tall white hat is a chef's hat." },
  { ask: "What does a pilot fly?", right: ["airplane", "✈️"], wrong: [["fire truck", "🚒"], ["tractor", "🚜"]], hint: "A pilot flies an airplane." },
  { ask: "Which helper keeps the neighbourhood clean?", right: ["street sweeper", "🧹"], wrong: [["pilot", "🧑‍✈️"], ["chef", "🧑‍🍳"]], hint: "Sweepers keep streets tidy." },
  { ask: "Which helper do you call if there is a fire?", right: ["firefighter", "🧑‍🚒"], wrong: [["baker", "🥖"], ["painter", "🧑‍🎨"]], hint: "Firefighters come in a fire truck.", stretch: true },
  { ask: "Which helper do you see when you are hurt?", right: ["doctor or nurse", "🧑‍⚕️"], wrong: [["chef", "🧑‍🍳"], ["pilot", "🧑‍✈️"]], hint: "Doctors and nurses help hurt people.", stretch: true },
  { ask: "Which helper grows the food we eat?", right: ["farmer", "🧑‍🌾"], wrong: [["dentist", "🦷"], ["pilot", "🧑‍✈️"]], hint: "Farmers grow fruit, vegetables and grain.", stretch: true },
  { ask: "How can you say thank you to a helper?", right: ["say thank you", "🙏"], wrong: [["ignore them", "🙈"], ["grab their tools", "✊"]], hint: "A thank-you makes a helper feel good.", stretch: true },
];

export const PLACE_MORE: MoreItem[] = [
  { ask: "Where do you go to see a movie?", right: ["theatre", "🎬"], wrong: [["farm", "🚜"], ["fire station", "🚒"]], hint: "A theatre shows movies." },
  { ask: "Where do you buy bread?", right: ["bakery", "🥖"], wrong: [["hospital", "🏥"], ["airport", "✈️"]], hint: "A bakery sells bread and buns." },
  { ask: "Where do you go to see sick pets?", right: ["vet's office", "🐾"], wrong: [["library", "📚"], ["school", "🏫"]], hint: "A vet is an animal doctor." },
  { ask: "Where do you go to swim in the summer?", right: ["pool", "🏊"], wrong: [["library", "📚"], ["school", "🏫"]], hint: "Pools are for swimming." },
  { ask: "Where do people go to eat out?", right: ["restaurant", "🍽️"], wrong: [["school", "🏫"], ["airport", "✈️"]], hint: "Restaurants make food for people." },
  { ask: "Where do you see lots of books?", right: ["library", "📚"], wrong: [["bakery", "🥖"], ["beach", "🏖️"]], hint: "A library is full of books." },
  { ask: "Where do you go to catch a bus?", right: ["bus stop", "🚏"], wrong: [["swimming pool", "🏊"], ["zoo", "🦁"]], hint: "Buses stop at a bus stop." },
  { ask: "Where can you see paintings on the walls?", right: ["art gallery", "🖼️"], wrong: [["fire station", "🚒"], ["farm", "🚜"]], hint: "Galleries show art." },
  { ask: "Where do you play on a field with a ball?", right: ["sports field", "⚽"], wrong: [["post office", "🏤"], ["hospital", "🏥"]], hint: "Fields are for running and ball games." },
  { ask: "Where do you go to learn about long ago?", right: ["museum", "🏛️"], wrong: [["bakery", "🥖"], ["pool", "🏊"]], hint: "A museum shows things from the past." },
  { ask: "Where do boats stay?", right: ["harbour", "⚓"], wrong: [["library", "📚"], ["school", "🏫"]], hint: "Boats stop at a harbour." },
  { ask: "Where do you see tall buildings close together?", right: ["city", "🏙️"], wrong: [["farm", "🚜"], ["forest", "🌲"]], hint: "Cities have many tall buildings." },
  { ask: "Where do you see lots of trees and animals?", right: ["forest", "🌲"], wrong: [["city", "🏙️"], ["airport", "✈️"]], hint: "A forest has many trees." },
  { ask: "Where do you see fields and barns?", right: ["countryside", "🌾"], wrong: [["airport", "✈️"], ["shopping mall", "🛍️"]], hint: "Farms are in the countryside." },
  { ask: "Which place has a big hill of sand and water?", right: ["beach", "🏖️"], wrong: [["library", "📚"], ["school", "🏫"]], hint: "Beaches have sand and water." },
  { ask: "Which one is a bridge?", right: ["bridge", "🌉"], wrong: [["tower", "🗼"], ["tent", "⛺"]], hint: "A bridge helps you cross over water or roads." },
  { ask: "What do you ride to get to far-away places fast?", right: ["airplane", "✈️"], wrong: [["wagon", "🛒"], ["tricycle", "🚲"]], hint: "Airplanes fly high and fast." },
  { ask: "What do you ride on tracks?", right: ["train", "🚆"], wrong: [["bike", "🚲"], ["boat", "⛵"]], hint: "Trains ride on tracks." },
  { ask: "What do you ride on water?", right: ["boat", "⛵"], wrong: [["bus", "🚌"], ["train", "🚆"]], hint: "Boats ride on water." },
  { ask: "What does a green light mean?", right: ["go", "🟢"], wrong: [["stop", "🛑"], ["jump", "🦘"]], hint: "Green means go.", show: "🚦", stretch: true },
  { ask: "What helps you find a place in a big city?", right: ["a map", "🗺️"], wrong: [["a spoon", "🥄"], ["a ball", "⚽"]], hint: "Maps show where places are.", stretch: true },
  { ask: "Which place is quiet and has lots of books to borrow?", right: ["library", "📚"], wrong: [["zoo", "🦁"], ["fire station", "🚒"]], hint: "People are quiet in the library.", stretch: true },
  { ask: "Where do you go to learn with your friends?", right: ["school", "🏫"], wrong: [["airport", "✈️"], ["fire station", "🚒"]], hint: "Children learn at school.", stretch: true },
  { ask: "Which place do many people share?", right: ["park", "🌳"], wrong: [["your bedroom", "🛏️"], ["your pocket", "👖"]], hint: "Parks are places everyone can enjoy.", stretch: true },
];

const KIND_SORT_2: SortSet = {
  prompt: "Kind or not kind? Tap a picture, then its basket.",
  hint: "Kind things help people feel good.",
  bins: [
    { id: "kind", label: "kind", emoji: "💛" },
    { id: "unkind", label: "not kind", emoji: "🚫" },
  ],
  items: [
    { label: "taking turns", emoji: "🔄", bin: "kind" },
    { label: "saying please", emoji: "🙏", bin: "kind" },
    { label: "cheering for a friend", emoji: "🎉", bin: "kind" },
    { label: "cleaning up", emoji: "🧺", bin: "kind" },
    { label: "listening", emoji: "👂", bin: "kind" },
    { label: "pushing in line", emoji: "👐", bin: "unkind" },
    { label: "taking a toy", emoji: "✊", bin: "unkind" },
    { label: "calling names", emoji: "📣", bin: "unkind" },
    { label: "leaving a mess", emoji: "🗑️", bin: "unkind" },
    { label: "not sharing", emoji: "🙅", bin: "unkind" },
  ],
};

export const RULE_MORE: { items: MoreItem[]; sort: SortSet } = {
  sort: KIND_SORT_2,
  items: [
    { ask: "You want to say something in class. What do you do?", right: ["wait your turn", "✋"], wrong: [["shout it out", "📢"], ["walk away", "🚶"]], hint: "Wait for your turn to speak." },
    { ask: "A friend is sad. What can you do?", right: ["be kind", "💛"], wrong: [["laugh", "😆"], ["take their toy", "✊"]], hint: "Kind words help a sad friend." },
    { ask: "You spill your juice. What can you do?", right: ["clean it up", "🧽"], wrong: [["hide it", "🙈"], ["blame a friend", "👉"]], hint: "We clean up our messes." },
    { ask: "You want to play with a toy someone else has. What do you say?", right: ["Can I have a turn?", "💬"], wrong: [["Give it to me!", "📢"], ["nothing, just grab", "✊"]], hint: "Asking nicely works best." },
    { ask: "Someone says hello to you. What do you do?", right: ["say hello back", "👋"], wrong: [["turn away", "🙈"], ["yell", "📢"]], hint: "A friendly hello back is polite." },
    { ask: "You bump into someone. What do you say?", right: ["sorry", "🙏"], wrong: [["move it", "👐"], ["nothing", "🤐"]], hint: "Saying sorry helps." },
    { ask: "The teacher is talking. What do you do?", right: ["listen", "👂"], wrong: [["talk loudly", "📢"], ["run around", "🏃"]], hint: "Good listeners hear what is said." },
    { ask: "The bell rings. What do you do?", right: ["line up", "🧍"], wrong: [["hide", "🙈"], ["run away", "🏃"]], hint: "We line up one behind the other." },
    { ask: "You see someone drop their lunch. What can you do?", right: ["help pick it up", "🤝"], wrong: [["laugh", "😆"], ["walk away", "🚶"]], hint: "Helping is kind." },
    { ask: "It is your friend's turn on the slide. What do you do?", right: ["wait", "⏳"], wrong: [["push in", "👐"], ["go the wrong way", "🔙"]], hint: "Waiting is part of taking turns." },
    { ask: "What do you do with your toys when you are done?", right: ["put them away", "🧺"], wrong: [["leave them on the floor", "🗑️"], ["throw them", "🤾"]], hint: "We put toys away so no one trips." },
    { ask: "How do you walk in the hallway?", right: ["slowly and quietly", "🚶"], wrong: [["running", "🏃"], ["jumping", "🦘"]], hint: "Walking is safe in a hallway." },
    { ask: "You are in a car. What keeps you safe?", right: ["seat belt", "🔒"], wrong: [["a toy", "🧸"], ["a hat", "🧢"]], hint: "Always buckle up.", show: "🚗" },
    { ask: "A stranger offers you candy. What do you do?", right: ["say no and tell a grown-up", "🚫"], wrong: [["take it", "🍬"], ["go with them", "🚶"]], hint: "Always check with your grown-up first.", stretch: true },
    { ask: "You find something that is not yours. What can you do?", right: ["give it to a grown-up", "🧑"], wrong: [["keep it secretly", "🤫"], ["throw it away", "🗑️"]], hint: "Returning things is honest.", stretch: true },
    { ask: "You made a mistake. What can you do?", right: ["say what happened", "💬"], wrong: [["hide it", "🙈"], ["blame someone", "👉"]], hint: "Being honest is a good choice.", stretch: true },
    { ask: "Two friends want the same toy. What is fair?", right: ["take turns", "🔄"], wrong: [["fight over it", "👊"], ["the biggest gets it", "💪"]], hint: "Turns make it fair.", stretch: true },
    { ask: "Why do we have rules?", right: ["to keep us safe and fair", "🛡️"], wrong: [["to be bossy", "😠"], ["for no reason", "🤷"]], hint: "Rules help everyone be safe.", stretch: true },
  ],
};

export const ROUTINES_MORE: { prompt: string; steps: Pic[]; hint: string }[] = [
  { prompt: "Brushing your hair. Tap them in order.", steps: [["get a brush", "🪮"], ["brush", "💇"], ["look in the mirror", "🪞"]], hint: "Get the brush, brush your hair, then take a look." },
  { prompt: "Having a snack. Tap them in order.", steps: [["wash hands", "🧼"], ["eat", "🍎"], ["clean up", "🧽"]], hint: "Wash first, then eat, then tidy up." },
  { prompt: "Going to the playground. Tap them in order.", steps: [["put on shoes", "👟"], ["walk there", "🚶"], ["play", "🛝"]], hint: "Shoes first, then go, then play." },
  { prompt: "Taking a bath. Tap them in order.", steps: [["fill the tub", "🚰"], ["wash", "🧼"], ["dry off", "🧖"]], hint: "Fill, wash and then dry." },
  { prompt: "Getting dressed in winter. Tap them in order.", steps: [["socks", "🧦"], ["coat", "🧥"], ["mittens", "🧤"]], hint: "Warm layers go on first." },
  { prompt: "Making toast. Tap them in order.", steps: [["bread", "🍞"], ["toaster", "♨️"], ["butter", "🧈"]], hint: "Bread, then toast it, then add butter." },
  { prompt: "Drawing a picture. Tap them in order.", steps: [["pick crayon", "🖍️"], ["draw", "✏️"], ["show it", "🖼️"]], hint: "Choose, draw and show it." },
  { prompt: "A butterfly growing. Tap them in order.", steps: [["egg", "🥚"], ["caterpillar", "🐛"], ["butterfly", "🦋"]], hint: "An egg hatches into a caterpillar, then a butterfly." },
  { prompt: "A flower growing. Tap them in order.", steps: [["seed", "🌰"], ["sprout", "🌱"], ["flower", "🌷"]], hint: "Seed, sprout, flower." },
  { prompt: "The school day. Tap them in order.", steps: [["arrive", "🏫"], ["learn", "📚"], ["go home", "🏠"]], hint: "School starts, we learn, then we go home." },
  { prompt: "Reading a book. Tap them in order.", steps: [["open", "📖"], ["read", "👀"], ["close", "📕"]], hint: "Open the book, read it, then close it." },
  { prompt: "Putting on a jacket. Tap them in order.", steps: [["arms in", "🧥"], ["zip", "🤏"], ["go outside", "🚪"]], hint: "Arms in, then zip, then outside." },
];

export const THEN_NOW_MORE: MoreItem[] = [
  { ask: "What do you do first in the morning?", right: ["wake up", "⏰"], wrong: [["go to bed", "🛏️"], ["eat dinner", "🍽️"]], hint: "Morning starts with waking up." },
  { ask: "What do you do last in the day?", right: ["go to sleep", "😴"], wrong: [["eat breakfast", "🥣"], ["wake up", "⏰"]], hint: "Sleep is last." },
  { ask: "What comes after breakfast?", right: ["lunch", "🥪"], wrong: [["breakfast again", "🥣"], ["sunrise", "🌅"]], hint: "Breakfast, lunch, then dinner." },
  { ask: "What comes after lunch?", right: ["dinner", "🍽️"], wrong: [["breakfast", "🥣"], ["sunrise", "🌅"]], hint: "Dinner comes after lunch." },
  { ask: "What do you do before eating?", right: ["wash hands", "🧼"], wrong: [["go to bed", "🛏️"], ["put on a coat", "🧥"]], hint: "Wash your hands first." },
  { ask: "Long ago, people wrote with feathers. What do we use now?", right: ["pencil", "✏️"], wrong: [["spoon", "🥄"], ["shoe", "👟"]], hint: "Today we use pencils and pens." },
  { ask: "Long ago, people used a horse and cart. What do many use now?", right: ["car", "🚗"], wrong: [["dinosaur", "🦕"], ["boat", "⛵"]], hint: "Many families use cars." },
  { ask: "Long ago, people read by candlelight. What do we use now?", right: ["lamp", "💡"], wrong: [["spoon", "🥄"], ["sock", "🧦"]], hint: "Today we turn on a lamp." },
  { ask: "When you were a baby, what did you drink?", right: ["milk", "🍼"], wrong: [["coffee", "☕"], ["soup", "🍲"]], hint: "Babies drink milk." },
  { ask: "When you were a baby, what did you wear?", right: ["diapers", "👶"], wrong: [["a suit", "🤵"], ["a helmet", "⛑️"]], hint: "Babies wear diapers." },
  { ask: "What will you be when you are all grown up?", right: ["a grown-up", "🧑"], wrong: [["a baby", "👶"], ["a puppy", "🐶"]], hint: "Children grow into grown-ups." },
  { ask: "Yesterday has gone. What comes next?", right: ["today", "📅"], wrong: [["last week", "⏪"], ["last year", "⏮️"]], hint: "After yesterday comes today." },
  { ask: "After today comes…", right: ["tomorrow", "🌅"], wrong: [["yesterday", "⏪"], ["last week", "⏮️"]], hint: "Tomorrow comes after today." },
  { ask: "How do you know the season is changing?", right: ["the weather changes", "🌦️"], wrong: [["the chair changes", "🪑"], ["the cup changes", "🥤"]], hint: "Weather and trees change with the seasons.", stretch: true },
];

const CARE_SORT_2: SortSet = {
  prompt: "Keep or throw away? Tap a picture, then its place.",
  hint: "We keep clean things we can use again. We throw away real garbage.",
  bins: [
    { id: "reuse", label: "use again", emoji: "♻️" },
    { id: "garbage", label: "garbage", emoji: "🗑️" },
  ],
  items: [
    { label: "water bottle", emoji: "🧴", bin: "reuse" },
    { label: "cloth bag", emoji: "👜", bin: "reuse" },
    { label: "lunch box", emoji: "🍱", bin: "reuse" },
    { label: "jar", emoji: "🫙", bin: "reuse" },
    { label: "old toy for a friend", emoji: "🧸", bin: "reuse" },
    { label: "banana peel", emoji: "🍌", bin: "garbage" },
    { label: "broken crayon", emoji: "🖍️", bin: "garbage" },
    { label: "tissue", emoji: "🧻", bin: "garbage" },
    { label: "chip bag", emoji: "🍟", bin: "garbage" },
    { label: "bubble gum", emoji: "🫧", bin: "garbage" },
  ],
};

export const CARE_MORE: { items: MoreItem[]; sort: SortSet } = {
  sort: CARE_SORT_2,
  items: [
    { ask: "Which one do you use again and again?", right: ["water bottle", "🧴"], wrong: [["chip bag", "🍟"], ["tissue", "🧻"]], hint: "A refillable bottle saves waste." },
    { ask: "How can you save paper?", right: ["draw on both sides", "📄"], wrong: [["crumple a new page", "🗑️"], ["throw it all away", "🚮"]], hint: "Using both sides saves paper." },
    { ask: "How do you help a plant outside?", right: ["give it water", "💧"], wrong: [["pull it up", "🥀"], ["stomp on it", "👣"]], hint: "Water helps plants grow." },
    { ask: "How can you help birds in winter?", right: ["put out seeds", "🌰"], wrong: [["throw rocks", "🪨"], ["chase them", "🏃"]], hint: "Seeds give birds food." },
    { ask: "What do you do with trash in the park?", right: ["put it in the bin", "🗑️"], wrong: [["drop it", "🍂"], ["hide it under a bench", "🙈"]], hint: "Bins keep parks clean." },
    { ask: "Where do old newspapers go?", right: ["recycling", "♻️"], wrong: [["the pond", "🌊"], ["the garden", "🌻"]], hint: "Paper can be made into new paper." },
    { ask: "Where do apple cores go?", right: ["compost", "🌱"], wrong: [["recycling", "♻️"], ["the river", "🌊"]], hint: "Food scraps can become soil in a compost bin." },
    { ask: "What can you do with a drink can?", right: ["recycle it", "♻️"], wrong: [["bury it", "🕳️"], ["float it away", "🌊"]], hint: "Metal cans can be made into new cans." },
    { ask: "You see a bug in the house. What can you do?", right: ["let it go outside", "🪲"], wrong: [["squish it", "👣"], ["scare it", "😱"]], hint: "Be gentle with small creatures." },
    { ask: "How can you save water at home?", right: ["turn off the tap", "🚰"], wrong: [["leave it dripping", "💧"], ["splash all day", "💦"]], hint: "Turning off the tap saves water." },
    { ask: "How do you save energy when you leave the room?", right: ["switch off the light", "💡"], wrong: [["turn on every light", "🔆"], ["leave the TV loud", "📺"]], hint: "Switching off saves energy." },
    { ask: "What can you do with a toy you have outgrown?", right: ["give it to a friend", "🎁"], wrong: [["throw it in a lake", "🌊"], ["break it", "💥"]], hint: "Sharing toys helps others." },
    { ask: "How can you walk through a garden?", right: ["on the path", "🚶"], wrong: [["over the flowers", "🌷"], ["through the seeds", "🌱"]], hint: "Stay on the path to keep plants safe." },
    { ask: "How can you move to be kind to the air?", right: ["walk or bike", "🚲"], wrong: [["idle the car", "🚗"], ["burn leaves", "🔥"]], hint: "Walking and biking keep the air clean.", stretch: true },
    { ask: "Which one helps clean the air?", right: ["trees", "🌳"], wrong: [["smoke", "💨"], ["litter", "🗑️"]], hint: "Trees make fresh air.", stretch: true },
    { ask: "Why do we keep the beach clean?", right: ["so animals stay safe", "🐢"], wrong: [["for no reason", "🤷"], ["so there is more litter", "🗑️"]], hint: "Litter can hurt sea animals.", stretch: true },
    { ask: "What do we all share?", right: ["the Earth", "🌍"], wrong: [["only your room", "🚪"], ["only your toys", "🧸"]], hint: "We all share the Earth and need to take care of it.", stretch: true },
    { ask: "You see a baby bird on the ground. What do you do?", right: ["tell a grown-up", "🧑"], wrong: [["pick it up and keep it", "✊"], ["shout at it", "📢"]], hint: "A grown-up can help animals safely.", stretch: true },
  ],
};
