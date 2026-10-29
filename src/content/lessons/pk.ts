import { lesson, type GradeLessons } from "./index";

// Pre-K lessons: a grown-up and child look at these together, so steps are short and said in a few words.

const math: GradeLessons = {
  "math/count-to-5": lesson(
    ["Touch each one as you count.", "Say one number for each one.", "The last number you say is how many."],
    "How many stars? ⭐⭐⭐",
    ["Touch and count: 1, 2, 3.", "The last number is 3."],
    "3",
    { type: "dots", count: 3, emoji: "⭐" },
  ),
  "math/find-the-number": lesson(
    ["Each number has its own shape.", "Say the number's name out loud.", "6 has its loop at the bottom. 9 has it at the top."],
    "Find the number 4.",
    ["Look at each number.", "4 has a pointy top and a line down."],
    "4",
    { type: "letter", text: "4" },
  ),
  "math/more-or-fewer": lesson(
    ["Match the things one to one.", "The group with some left over has more.", "If none are left over, they are the same."],
    "There are 4 cats and 2 dogs. Which has more?",
    ["Match each dog to a cat.", "2 cats have no partner."],
    "The cats",
    { type: "pictograph", title: "Cats and dogs", rows: [{ label: "cats", emoji: "🐱", count: 4 }, { label: "dogs", emoji: "🐶", count: 2 }] },
  ),
  "math/shapes": lesson(
    ["A circle is round, with no corners.", "A triangle has 3 sides.", "A square has 4 sides, all the same."],
    "Which shape has 3 sides?",
    ["Count the sides: 1, 2, 3.", "That is a triangle."],
    "The triangle",
    { type: "shape", shape: "triangle" },
  ),
  "math/patterns": lesson(
    ["A pattern repeats again and again.", "Say it out loud: red, blue, red, blue.", "Then say what comes next."],
    "🍎 🍌 🍎 🍌 🍎 … what comes next?",
    ["Apple, banana repeats.", "After apple comes banana."],
    "🍌",
    { type: "emojiRow", items: ["🍎", "🍌", "🍎", "🍌", "🍎"], showBlank: true },
  ),
  "math/big-and-small": lesson(
    ["Put two things side by side.", "Bigger takes up more space.", "Taller reaches higher. Heavier is harder to lift."],
    "Which is bigger: an elephant or a mouse?",
    ["Picture them side by side.", "The elephant takes up more space."],
    "The elephant 🐘",
  ),
  "math/sort-it": lesson(
    ["Look at each thing.", "Ask: is it the same colour, shape or kind?", "Put things that go together in one group."],
    "Is a banana food or a toy?",
    ["You can eat a banana.", "So it goes with the food."],
    "Food 🍌",
  ),
};

const language: GradeLessons = {
  "language/letter-names": lesson(
    ["Every letter has a name and a shape.", "Trace the letter in the air with your finger.", "Find letters from your own name first!"],
    "Find the letter M.",
    ["M has two tall sides.", "It has a V shape in the middle."],
    "M",
    { type: "letter", text: "M" },
  ),
  "language/first-sounds": lesson(
    ["Say the word slowly.", "Listen to the very first sound.", "Moon and mouse start the same: mmm."],
    "Which starts like “sun”: sock or cat?",
    ["Sun starts with sss.", "Sock starts with sss too."],
    "Sock 🧦",
  ),
  "language/rhyme-time": lesson(
    ["Rhyming words sound the same at the end.", "Cat, hat and bat all rhyme.", "Say both words and listen to the end."],
    "Does “bee” rhyme with “tree”?",
    ["Bee ends with ee.", "Tree ends with ee too."],
    "Yes 👍",
  ),
  "language/clap-the-parts": lesson(
    ["Words have parts you can clap.", "Say the word slowly and clap each part.", "Count your claps."],
    "How many claps in “banana”?",
    ["Clap: ba · na · na.", "That is 3 claps."],
    "3",
    { type: "emoji", emoji: "🍌" },
  ),
  "language/listen-to-a-story": lesson(
    ["Listen to the whole story.", "Think: who, what and where?", "If you forget, listen again!"],
    "Mia flew her kite at the park. What did Mia fly?",
    ["Listen for what Mia did.", "She flew her kite."],
    "A kite 🪁",
  ),
  "language/word-meanings": lesson(
    ["Opposites are as different as can be.", "Hot and cold are opposites.", "Some words go in groups, like foods or animals."],
    "What is the opposite of “day”?",
    ["Day is bright and sunny.", "The opposite is dark."],
    "Night 🌙",
  ),
};

const science: GradeLessons = {
  "science/five-senses": lesson(
    ["We have five senses.", "Eyes see, ears hear, noses smell.", "Tongues taste and hands feel."],
    "What do you use to smell a flower?",
    ["Smells go in your nose.", "So you use your nose."],
    "Nose 👃",
  ),
  "science/living-or-not": lesson(
    ["Living things grow.", "They need food, water and air.", "Toys and rocks don't grow, so they are not alive."],
    "Is a puppy alive?",
    ["A puppy eats and drinks.", "A puppy grows into a dog."],
    "Yes 🐶",
  ),
  "science/animals-and-babies": lesson(
    ["Animals live in homes that fit them.", "Fish live in water. Birds build nests.", "Baby animals grow up to look like their parents."],
    "Which baby grows into a chicken?",
    ["A chick hatches from an egg.", "It grows into a chicken."],
    "A chick 🐣",
  ),
  "science/weather-and-sky": lesson(
    ["Look outside: sun, rain, snow or wind?", "Wear clothes that fit the weather.", "We see the sun by day and the moon at night."],
    "It is raining. What helps you stay dry?",
    ["Rain is wet.", "An umbrella keeps the rain off you."],
    "An umbrella ☂️",
  ),
  "science/plants-grow": lesson(
    ["Plants grow from seeds.", "Plants need water, sun and air.", "First a seed, then a sprout, then a plant."],
    "What does a plant need to grow?",
    ["Plants drink through their roots.", "They need water."],
    "Water 💧",
  ),
  "science/sink-or-float": lesson(
    ["Some things float on water.", "Heavy things like rocks sink.", "A push or a pull makes things move."],
    "Does a leaf sink or float?",
    ["A leaf is very light.", "It stays on top of the water."],
    "It floats 🍃",
  ),
};

const social: GradeLessons = {
  "social/my-family": lesson(
    ["Families come in many shapes and sizes.", "Babies grow into children, then grown-ups.", "Wash hands and brush teeth to stay healthy."],
    "Who is the youngest: a baby or a grown-up?",
    ["A baby was born most recently.", "So the baby is youngest."],
    "The baby 👶",
  ),
  "social/feelings": lesson(
    ["Everyone has feelings.", "Faces show how we feel.", "When you feel big feelings, breathe slowly and tell a grown-up."],
    "Your friend fell down and is crying. How might they feel?",
    ["Crying can mean someone is hurt or sad.", "They might feel sad."],
    "Sad 😢",
  ),
  "social/community-helpers": lesson(
    ["Many people help in our community.", "Firefighters put out fires.", "Doctors help sick people get better."],
    "Who helps put out fires?",
    ["Fire trucks carry water.", "Firefighters spray it on the fire."],
    "A firefighter 🧑‍🚒",
  ),
  "social/places-around-me": lesson(
    ["Our community has many places.", "We borrow books at the library.", "We buy food at the store."],
    "Where do you go to borrow books?",
    ["The library has lots of books.", "You can borrow them and bring them back."],
    "The library 📚",
  ),
  "social/taking-turns": lesson(
    ["Taking turns lets everyone play.", "Kind words make friends feel good.", "Hold a grown-up's hand to cross the street."],
    "Your friend wants the swing too. What can you do?",
    ["You both want a turn.", "Take turns so you both can swing."],
    "Take turns 🔄",
  ),
  "social/first-next-last": lesson(
    ["Some things happen in order.", "First, next, then last.", "Socks go on before shoes!"],
    "What comes first: socks or shoes?",
    ["Shoes go over socks.", "So socks go on first."],
    "Socks 🧦",
  ),
  "social/caring-for-our-world": lesson(
    ["We can all help take care of the world.", "Put litter in the garbage.", "Turn off the tap and the lights."],
    "You see litter at the park. What can you do?",
    ["Litter makes the park dirty.", "Put it in the garbage."],
    "Put it in the garbage 🗑️",
  ),
};

export const lessons: GradeLessons = { ...math, ...language, ...science, ...social };
