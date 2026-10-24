import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Pennsylvania's extra Kindergarten English language arts units (`pa-` ids): words learned from talk and books, choosing
// reasons and putting events in order (the thinking behind writing, tapped rather than written), and answering
// questions about key details. The sentences are original. Prompts stay short; there are no typed answers.

const WORDS: Q[] = [
  ["Which word means the same as “big”?", "large", ["tiny", "soft", "cold"], "Big and large mean the same."],
  ["Which word means the same as “happy”?", "glad", ["sad", "slow", "wet"], "Happy and glad mean the same."],
  ["Which word is the opposite of “hot”?", "cold", ["red", "soft", "fast"], "Hot and cold are opposites."],
  ["Which word is the opposite of “up”?", "down", ["over", "high", "tall"], "Up and down are opposites."],
  ["Which word is the opposite of “open”?", "closed", ["wide", "loud", "new"], "A door is open or closed."],
  ["Which word is the opposite of “day”?", "night", ["noon", "sun", "light"], "Day and night are opposites."],
  ["Which one is an animal?", "horse", ["spoon", "chair", "shoe"], "A horse is a living animal."],
  ["Which one is a food?", "carrot", ["pillow", "truck", "drum"], "You can eat a carrot."],
  ["Which one is a toy?", "puzzle", ["spinach", "sidewalk", "teacher"], "You play with a puzzle."],
  ["Which word names a color?", "purple", ["round", "loud", "soft"], "Purple is a color."],
  ["Which word tells how you feel?", "excited", ["table", "window", "carrot"], "Excited is a feeling."],
  ["Which word tells an action?", "jump", ["blue", "tiny", "table"], "You can jump."],
  ["“The bat flew at night.” What is the bat?", "an animal", ["a stick for a ball", "a hat", "a shoe"], "Animals fly at night."],
  ["“She swung the bat.” What is the bat?", "a stick for hitting", ["an animal that flies", "a kind of bread", "a toy boat"], "You hit a ball with it."],
  ["“I can park the car.” What does park mean?", "to leave it", ["to swing", "to paint", "to eat"], "You stop and leave the car."],
  ["“We play at the park.” What is the park?", "a place to play", ["a kind of food", "a color", "a song"], "Kids play there."],
  ["“Put the cup on the table.” Which word tells where?", "on", ["cup", "put", "the"], "On tells where the cup goes."],
  ["Which word tells where? “The cat is under the bed.”", "under", ["cat", "bed", "is"], "Under tells where the cat is."],
  ["Which word means “very small”?", "tiny", ["huge", "tall", "loud"], "Tiny is very small."],
  ["Which word means “very big”?", "huge", ["tiny", "thin", "soft"], "Huge is very big."],
  ["Mom says, “Be gentle.” Which is gentle?", "petting a kitten softly", ["pulling a tail", "banging a drum", "stomping loudly"], "Gentle means soft and kind.", true],
  ["Which word goes with “sad” and “angry”?", "happy", ["table", "jump", "green"], "They are all feelings.", true],
  ["Which word goes with “run” and “skip”?", "hop", ["red", "cup", "bed"], "They all tell how to move.", true],
  ["A book says, “The kitten is tiny.” Tiny tells about the kitten’s…", "size", ["color", "sound", "name"], "Tiny tells how small.", true],
  ["A story says the boy was “delighted.” He felt…", "very happy", ["very sleepy", "very cold", "very hungry"], "Delighted means very happy.", true],
  ["Which word names a shape?", "circle", ["carrot", "jump", "happy"], "A circle is a shape."],
];

const WRITING: Q[] = [
  ["Max likes the park. Which tells why?", "It has a big slide.", ["It is Tuesday.", "Max has a hat.", "Dogs bark."], "A reason tells why."],
  ["Ana likes soup. Which tells why?", "It is warm and tasty.", ["It is in a bowl on a shelf.", "Ana has socks.", "Tom has a bike."], "A reason tells why."],
  ["I like rainy days. Which is a reason?", "I can jump in puddles.", ["I have a red cup.", "My cat is asleep.", "It is Monday."], "A reason tells why you like it."],
  ["Which is an opinion?", "Pizza is the best.", ["Pizza is round.", "Pizza has cheese.", "Pizza is hot."], "An opinion tells what you think."],
  ["Which one is a reason to read books?", "Stories are fun.", ["Socks are warm.", "Bananas are yellow.", "Trucks have wheels."], "A reason tells why."],
  ["Mia picks a puppy over a fish. Which reason fits?", "A puppy can play fetch.", ["A fish has fins.", "Mia has a coat.", "It is lunch time."], "Pick the reason for choosing a puppy."],
  ["Which sentence stays on the topic of dogs?", "Dogs like to play.", ["Rain is wet.", "Bananas are yellow.", "Cars are fast."], "Stay on one topic."],
  ["A writer is telling about cats. Which sentence fits?", "Cats have soft fur.", ["Fish live in the sea.", "Buses have wheels.", "Snow is cold."], "Stay on cats."],
  ["A writer is telling about bees. Which sentence does NOT fit?", "Dogs like bones.", ["Bees make honey.", "Bees can sting.", "Bees buzz."], "That one is not about bees."],
  ["What is the topic? “Frogs hop. Frogs swim. Frogs eat flies.”", "frogs", ["flies", "ponds", "swimming"], "All the sentences are about frogs."],
  ["Which sentence tells who the story is about?", "Tom had a red kite.", ["The wind blew.", "It was a sunny day.", "The kite went up."], "It names Tom."],
  ["Which sentence tells what happened?", "The dog dug a hole.", ["The dog is brown.", "A brown dog.", "The big hole."], "It tells an action."],
  ["First Ana woke up. Then she ate. Last she went to school. What happened first?", "She woke up.", ["She ate.", "She went to school.", "She went to bed."], "First means at the start."],
  ["First Ben got a seed. Then he planted it. Last it grew. What happened last?", "It grew.", ["He got a seed.", "He planted it.", "He picked a seed."], "Last means at the end."],
  ["Which word tells the order? “___ we got on the bus.”", "First", ["Blue", "Cup", "Happy"], "First tells the order."],
  ["Mia fell. She felt sad. Which tells her reaction?", "She felt sad.", ["She fell.", "She was in the park.", "It was a hill."], "A reaction tells how she felt."],
  ["Sam won the race. Which tells how he felt?", "He was proud.", ["The race was long.", "He wore shoes.", "It was a track."], "Proud is a feeling."],
  ["Which sentence tells one real event?", "We went to the zoo.", ["Zoo big.", "Went we the.", "Zoo to."], "A sentence tells a whole idea."],
  ["Which describing word fits a snowman?", "cold", ["hot", "loud", "sleepy"], "Snow is cold."],
  ["Which is the best title for a story about a lost mitten?", "The Lost Mitten", ["Big Trucks", "Pizza Day", "A Blue Fish"], "A title tells what it is about.", true],
  ["A writer wants to say why dogs are good pets. Which fits?", "Dogs are loyal friends.", ["Dogs are on the moon.", "Dogs have wheels.", "Dogs are made of wood."], "Pick a true reason.", true],
  ["Which has a beginning, a middle and an end?", "A boy lost a ball, looked for it and found it.", ["A boy and a ball.", "A ball is round.", "Boys like balls."], "A story has all three.", true],
  ["Which sentence starts with a capital letter and ends with a period?", "I see a cat.", ["i see a cat", "I see a cat", "i see a cat."], "Begin big, end with a dot."],
  ["Which is a reason to wear a coat?", "It is cold outside.", ["The sky is high.", "Fish can swim.", "Today is Friday."], "A reason tells why."],
];

const PROVE: Q[] = [
  ["Mia has a red hat. What color is the hat?", "red", ["blue", "green", "yellow"], "The text says red."],
  ["The dog ran to the park. Where did the dog run?", "to the park", ["to the lake", "to bed", "to school"], "The text tells where."],
  ["Ben has two cats. How many cats does Ben have?", "two", ["one", "three", "four"], "The text says two."],
  ["Lin plants a seed. Rain falls. What will most likely happen next?", "the seed will grow", ["the seed will fly", "the seed will sing", "the seed will melt"], "Seeds grow with water."],
  ["Tom puts on boots and takes an umbrella. What is the weather?", "rainy", ["sunny", "snowy", "hot"], "Boots and an umbrella go with rain."],
  ["Nina’s cheeks are wet and she is sniffling. How does she feel?", "sad", ["silly", "sleepy", "proud"], "Crying shows sadness."],
  ["A bear eats a lot in the fall. Why?", "to get ready for winter", ["to play a game", "to find a hat", "to learn to read"], "Bears store energy for winter."],
  ["The sun goes down. It gets dark. What comes after?", "night", ["morning", "lunch", "spring"], "Dark means night."],
  ["Sam is wearing a swim suit and holding a towel. Where is he going?", "to swim", ["to sleep", "to a snowball fight", "to a library"], "A swim suit is for swimming."],
  ["A story says, “The cat crept away.” Who crept?", "the cat", ["the dog", "the mouse", "the bird"], "The cat did."],
  ["The book says frogs hop. Which fact is in the book?", "Frogs hop.", ["Frogs fly.", "Frogs bark.", "Frogs knit."], "Use what the book says."],
  ["The author wrote about bees. What did the author tell?", "facts about bees", ["a song about cats", "a recipe", "a game"], "The book is about bees."],
  ["Both books are about dogs. How are they alike?", "both are about dogs", ["both are about fish", "both are poems", "both are maps"], "They share a topic."],
  ["One book has photos. One book has drawings. How are they different?", "photos or drawings", ["both have photos", "neither has pictures", "both are about boats"], "Look at the pictures."],
  ["Ana and Leo both like to swim. How are they alike?", "they both like to swim", ["they both like to run", "they are both tall", "they both hate water"], "They share something."],
  ["Seeds grow into plants. Plants make fruit. What do seeds become?", "plants", ["rocks", "clouds", "shoes"], "The text says seeds grow into plants."],
  ["First we mix. Then we bake. What do we do after mixing?", "bake", ["mix again", "eat the dough", "wash the table"], "Then means next."],
  ["Which picture detail fits “a tall giraffe”?", "a long neck", ["a tiny tail only", "a round shell", "a big beak"], "Giraffes are tall."],
  ["The page shows a duck and the words say “The duck swims.” What do the words tell?", "what the duck does", ["what color the sky is", "where the car is", "how old the duck is"], "The words tell what the duck does."],
  ["Which question can the story answer? “Rosa fed her fish.”", "Who fed the fish?", ["Who owns a horse?", "Where is the moon?", "What is for lunch?"], "The story tells who."],
  ["The author wrote, “Penguins live where it is cold.” Why do penguins live there?", "it is where they live best", ["to buy hats", "to ride buses", "to read books"], "The text tells where they live.", true],
  ["Sam is yawning and rubbing his eyes. What does he need?", "sleep", ["a snack bar", "a kite", "a drum"], "Yawning shows tiredness.", true],
  ["A girl brings a bucket and a shovel to the beach. What will she probably do?", "build in the sand", ["ride a bus", "read a map", "bake a cake"], "These tools fit sandcastles.", true],
  ["Ana hugs her friend who dropped her ice cream. Why?", "to be kind", ["to be mean", "to go to sleep", "to buy more"], "A hug shows care.", true],
  ["Which word in the story tells where? “The bird sat in the tree.”", "in the tree", ["bird", "sat", "the"], "It tells the place."],
];

export const EXTRA: Unit[] = [
  bankUnit({
    id: "pa-gk-new-words",
    title: "Words We Learn",
    emoji: "🗣️",
    blurb: "Words that match, opposites, groups and words with two meanings.",
    parentNote:
      "Pennsylvania’s Kindergarten standards ask children to use words they pick up from conversations, reading and being read to, and to work out the meaning of unknown or multiple-meaning words. Children tap the word that means the same, the opposite, or fits the sentence.",
    standards: ["CC.1.2.K.J; CC.1.3.K.J; CC.1.2.K.K", "using words learned from talk and books, and working out unknown and multiple-meaning words"],
    items: WORDS,
  }),
  bankUnit({
    id: "pa-gk-reasons-and-order",
    title: "Reasons & Order",
    emoji: "🧩",
    blurb: "Why we like things, what fits a topic and what happens first.",
    parentNote:
      "Pennsylvania’s Kindergarten writing standards ask children to focus on one topic, give an opinion with reasons, and tell events in the order they happened. Children are not asked to write here: they tap the reason, the sentence that fits, or the event that comes first.",
    standards: ["CC.1.4.K.B; CC.1.4.K.H; CC.1.4.K.I; CC.1.4.K.N; CC.1.4.K.P", "sticking to one topic, giving a reason for an opinion, and telling events in order"],
    items: WRITING,
  }),
  bankUnit({
    id: "pa-gk-prove-it",
    title: "Prove It",
    emoji: "🔍",
    blurb: "Find the answer in the words, the pictures and the clues.",
    parentNote:
      "Pennsylvania’s Kindergarten standards ask children to answer questions about key details in a text, make connections between two individuals, events or ideas, and compare two texts. Children hear a short passage and tap what the words or clues say.",
    standards: ["CC.1.2.K.B; CC.1.2.K.C; CC.1.3.K.B; CC.1.2.K.I", "answering questions about key details, making connections and comparing two texts"],
    items: PROVE,
  }),
];
