import type { Unit } from "../../types";
import { passage, pic, readingUnit, type R } from "./language-kit";

// California's own Grade 3 English language arts unit: points of view, pictures and maps, and comparing two texts or
// two stories in a series (CA CCSS RL.3.6, RL.3.7, RL.3.9, RI.3.7, RI.3.9), with words for time and place (L.3.6).
// Every story and fact text is original.

const PIP_1 = passage(
  "Pip and the Missing Acorns (Book 1)",
  "Pip the squirrel hid twelve acorns before winter. When the snow came, he could only find three.",
  "He asked his friend Wren for help. Wren flew high and spotted little bumps in the snow. Together they found every acorn.",
);
const PIP_2 = passage(
  "Pip and the Windy Day (Book 2)",
  "A strong wind blew Pip's nest out of the oak tree. Pip did not know where to sleep.",
  "Wren showed him a hollow log, and they fixed it up together. Pip slept warm that night.",
);
const STAGE_FRIGHT = passage(
  "Stage Fright",
  "Singing in front of people is the worst thing in the world, Rosa thought. Her knees shook as she walked on stage.",
  "Then she saw her grandma smiling in the front row. Rosa took a breath and began to sing.",
);
const ROBOT = passage(
  "The Robot Contest",
  "I think robots are boring, the narrator says. “All they do is beep.”",
  "But at the contest, Dev's robot drew a picture of a cat. The crowd cheered, and even the narrator clapped.",
);
const PENGUINS_A = passage(
  "Text A: Emperor Penguins",
  "Emperor penguins live in Antarctica, the coldest place on Earth. They huddle in big groups to stay warm.",
  "The father keeps the egg warm on his feet for about two months.",
);
const PENGUINS_B = passage(
  "Text B: Penguin Parents",
  "Emperor penguin dads hold the egg on their feet under a warm fold of skin.",
  "The moms travel to the sea to find fish. When they come back, they feed the new chick.",
);
const VOLCANO_A = passage(
  "Text A: Volcanoes",
  "A volcano is an opening in Earth's crust. Hot, melted rock called magma rises up through it.",
  "When magma comes out, it is called lava.",
);
const VOLCANO_B = passage(
  "Text B: Living Near a Volcano",
  "Scientists watch volcanoes for signs that they might erupt. They measure small earthquakes and gases.",
  "Warnings help people near a volcano stay safe.",
);

const COMPARE_AND_CONNECT: R[] = [
  [PIP_1, "In Book 1, what is Pip's problem?", "He cannot find most of his acorns.", ["His nest blew away.", "He is lost in the woods.", "Wren is sick."], "Read the first paragraph of Book 1."],
  [PIP_2, "In Book 2, what is Pip's problem?", "The wind blew his nest away.", ["He lost his acorns.", "He is hungry.", "Wren moved away."], "Read the first paragraph of Book 2."],
  [PIP_2, "How are the plots of Book 1 and Book 2 alike?", "Pip has a problem, and Wren helps him solve it.", ["Pip solves every problem alone.", "Wren has the problem in both.", "Both happen in summer."], "Who helps Pip in both books?"],
  [PIP_1, "Both Pip books share a theme. What is it?", "Friends help each other.", ["Winter is fun.", "Acorns are tasty.", "Never ask for help."], "What do Pip and Wren do together in both books?"],
  [PIP_2, "How is the setting of Book 2 different from Book 1?", "Book 2 is on a windy day; Book 1 is in the snow.", ["Both happen at the beach.", "Book 2 is in the snow.", "Book 1 is in a city."], "Look at the weather in each book."],
  [STAGE_FRIGHT, "Rosa thinks singing is “the worst thing in the world.” Which reader thinks differently from Rosa?", "a reader who loves singing in front of people", ["a reader who is also scared to sing", "a reader who agrees with Rosa", "a reader who has never heard of singing"], "A different point of view means a different opinion."],
  [STAGE_FRIGHT, "How does Rosa feel at the start?", "nervous", ["bored", "proud", "sleepy"], "Her knees shook."],
  [ROBOT, "What is the narrator's point of view about robots at the start?", "Robots are boring.", ["Robots are amazing.", "Robots are scary.", "Robots are tiny."], "Read what the narrator says first."],
  [ROBOT, "A reader who builds robots would most likely…", "disagree with the narrator at the start", ["agree that robots are boring", "dislike the contest", "never read this story"], "Your own point of view can be different from the narrator's."],
  [ROBOT, "How does the narrator's view change?", "The narrator starts to enjoy the robot.", ["The narrator leaves the contest.", "The narrator builds a robot.", "It does not change."], "What does the narrator do at the end?"],
  [pic("🌑", "The picture shows a dark, empty hallway."), "What mood does this picture add to a story?", "spooky", ["silly", "sunny", "calm and cheerful"], "Dark and empty places can feel spooky."],
  [pic("🎈", "Balloons and streamers fill the room."), "What mood does this picture add?", "happy and excited", ["sad", "scary", "lonely"], "Balloons go with parties."],
  [pic("🧥", "Maya's coat is torn and patched in many places."), "What might the picture show about Maya?", "Her coat is old and well used.", ["She just bought a new coat.", "She is going swimming.", "She lives in the desert."], "Patches show something has been fixed many times."],
  [pic("🗺️", "Map: the library is north of the park; the school is east of the park."), "Use the map. Where is the library?", "north of the park", ["east of the park", "south of the park", "inside the school"], "Read the map's labels."],
  [pic("🗺️", "Map: the trail starts at the lake and ends at the waterfall."), "Use the map. Where does the trail end?", "at the waterfall", ["at the lake", "at the parking lot", "at the beach"], "Read the map's labels."],
  [pic("📷", "Photo caption: A monarch butterfly sips nectar from a milkweed flower."), "What does the photo show?", "a butterfly drinking from a flower", ["a bee making honey", "a caterpillar eating a leaf", "a bird building a nest"], "Read the caption carefully."],
  [pic("📊", "Chart: Rainfall — January 4 inches, April 2 inches, July 0 inches."), "Use the chart. Which month had no rain?", "July", ["January", "April", "every month"], "Look for 0 inches."],
  [PENGUINS_A, "What point is in both Text A and Text B?", "Penguin dads keep the egg warm on their feet.", ["Penguins huddle in groups.", "Moms find fish at sea.", "Antarctica is the coldest place."], "Find a fact that both texts tell."],
  [PENGUINS_B, "What does Text B tell that Text A does not?", "Moms go to the sea and bring food for the chick.", ["Dads hold the egg on their feet.", "Penguins live in Antarctica.", "Penguins huddle to stay warm."], "Look for a fact only in Text B."],
  [PENGUINS_A, "What does Text A tell that Text B does not?", "Penguins huddle in big groups to stay warm.", ["Dads hold the egg.", "Moms feed the chick.", "Moms find fish."], "Look for a fact only in Text A."],
  [VOLCANO_A, "Text A is mostly about…", "what a volcano is and how lava forms", ["how scientists keep people safe", "where penguins live", "how to measure gases"], "Read Text A's main points."],
  [VOLCANO_B, "Text B is mostly about…", "how scientists watch volcanoes to keep people safe", ["what magma is", "what lava is", "how volcanoes form islands"], "Read Text B's main points."],
  [VOLCANO_B, "How are Text A and Text B the same?", "Both are about volcanoes.", ["Both explain what magma is.", "Both talk about warnings.", "Both are stories."], "Look at both titles."],
  [null, "“After dinner that night, we went looking for them.” Which words tell when?", "After dinner that night", ["we went", "looking for", "them"], "Words about time answer “when?”"],
  [null, "“The cat hid beneath the porch.” Which word tells where?", "beneath", ["cat", "hid", "porch"], "Beneath means under."],
  [null, "“Meanwhile, the soup bubbled on the stove.” What does meanwhile mean?", "at the same time", ["much later", "a long time ago", "never"], "Meanwhile tells about two things happening together."],
  [null, "A science text says a plant's “habitat” is a desert. What is a habitat?", "the place where a living thing lives", ["the food it eats", "its color", "its size"], "Habitat is a science word for home."],
  [STAGE_FRIGHT, "What made Rosa brave enough to sing?", "She saw her grandma smiling.", ["The lights went out.", "The crowd left.", "She forgot the song."], "Read the second paragraph.", true],
  [PIP_1, "How did Wren help in Book 1?", "She spotted bumps in the snow from the air.", ["She gave Pip new acorns.", "She fixed a log.", "She dug a hole."], "Wren flew high.", true],
  [PENGUINS_B, "Put both texts together. Who keeps the egg warm while the mom is at sea?", "the dad", ["the chick", "the mom", "another penguin family"], "Use facts from both texts.", true],
  [null, "Which word shows something happened before? “Earlier, Mom had baked bread.”", "Earlier", ["Mom", "baked", "bread"], "Earlier tells about time.", true],
];

export const COMPARE_AND_CONNECT_3: Unit = readingUnit({
  id: "ca-g3-compare-and-connect",
  title: "Compare and Connect",
  emoji: "🔗",
  blurb: "Points of view, maps and two texts.",
  parentNote:
    "Your child compares two stories about the same characters and two information texts on the same topic, tells their own point of view from a narrator's, uses pictures, maps and charts with the words, and learns words for time and place.",
  standards: [
    "RL.3.6; RL.3.7; RL.3.9; RI.3.7; RI.3.9; L.3.6",
    "points of view, pictures, maps and charts, comparing two stories in a series and two texts on one topic, and words for time and place",
  ],
  items: COMPARE_AND_CONNECT,
});

export const LANGUAGE_3: Unit[] = [COMPARE_AND_CONNECT_3];
