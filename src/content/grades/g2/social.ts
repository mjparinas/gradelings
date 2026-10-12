import { shuffle } from "../../random";
import type { Question, Course, GenerateOptions } from "../../types";
import { fromBank, sortQuestion, type BankItem } from "../../bank";

// ---------- Needs & Wants ----------

const NEEDS_SORT = {
  prompt: "Is it a need or a want? Tap an item, then tap its basket.",
  hint: "Needs are things we must have to live and be healthy. Wants are nice to have, but we can live without them.",
  bins: [
    { id: "need", label: "need", emoji: "🏠" },
    { id: "want", label: "want", emoji: "🎁" },
  ],
  items: [
    { label: "water", emoji: "💧", bin: "need" },
    { label: "healthy food", emoji: "🥕", bin: "need" },
    { label: "a home", emoji: "🏠", bin: "need" },
    { label: "warm clothes", emoji: "🧥", bin: "need" },
    { label: "medicine when sick", emoji: "🩹", bin: "need" },
    { label: "video game", emoji: "🎮", bin: "want" },
    { label: "candy", emoji: "🍭", bin: "want" },
    { label: "toy robot", emoji: "🤖", bin: "want" },
    { label: "skateboard", emoji: "🛹", bin: "want" },
    { label: "ice cream", emoji: "🍦", bin: "want" },
  ],
};

const NEEDS_BANK: BankItem[] = [
  {
    prompt: "Which one is a need?",
    right: { label: "clean water", emoji: "💧" },
    wrong: [
      { label: "a new toy", emoji: "🧸" },
      { label: "a lollipop", emoji: "🍭" },
    ],
    hint: "A need is something we must have to live.",
  },
  {
    prompt: "Which one is a want?",
    right: { label: "a video game", emoji: "🎮" },
    wrong: [
      { label: "food", emoji: "🍎" },
      { label: "a warm coat", emoji: "🧥" },
    ],
    hint: "A want is nice to have, but we can live without it.",
  },
  {
    prompt: "Where can families buy food in a community?",
    right: { label: "a grocery store", emoji: "🛒" },
    wrong: [
      { label: "a library", emoji: "📚" },
      { label: "a fire hall", emoji: "🚒" },
    ],
    hint: "Grocery stores, markets and farms help people get food.",
  },
  {
    prompt: "Who helps people when they are sick?",
    right: { label: "a doctor or nurse", emoji: "🧑‍⚕️" },
    wrong: [
      { label: "a bus driver", emoji: "🚌" },
      { label: "a painter", emoji: "🎨" },
    ],
    hint: "Doctors and nurses help us stay healthy.",
  },
  {
    prompt: "Everyone needs a safe place to live. What is that called?",
    right: { label: "shelter", emoji: "🏠" },
    wrong: [
      { label: "a playground", emoji: "🛝" },
      { label: "a store", emoji: "🏪" },
    ],
    hint: "Shelter keeps us safe, warm and dry.",
  },
  {
    prompt: "Where does a lot of our food come from?",
    right: { label: "farms", emoji: "🚜" },
    wrong: [
      { label: "the moon", emoji: "🌙" },
      { label: "the toy store", emoji: "🧸" },
    ],
    hint: "Farmers grow fruit, vegetables and grain, and raise animals.",
  },
];

function needsWants(): Question[] {
  return shuffle([sortQuestion(NEEDS_SORT, 3), ...fromBank(NEEDS_BANK, 6)]);
}

// ---------- Communities in Canada ----------

const CANADA_BANK: BankItem[] = [
  {
    prompt: "Which province has tall mountains, big forests and the Pacific Ocean?",
    right: { label: "British Columbia", emoji: "🏔️" },
    wrong: [
      { label: "Saskatchewan", emoji: "🌾" },
      { label: "Nunavut", emoji: "❄️" },
    ],
    hint: "That's our province! BC is on the west coast of Canada.",
  },
  {
    prompt: "Which part of Canada has wide, flat land with lots of wheat farms?",
    right: { label: "the Prairies", emoji: "🌾" },
    wrong: [
      { label: "the Rocky Mountains", emoji: "🏔️" },
      { label: "the Arctic", emoji: "🧊" },
    ],
    hint: "The Prairies (Alberta, Saskatchewan and Manitoba) are flat and great for farming.",
  },
  {
    prompt: "In the Arctic, in the far north of Canada, winters are…",
    right: { label: "very long and cold", emoji: "❄️" },
    wrong: [
      { label: "hot and sunny", emoji: "☀️" },
      { label: "short and warm", emoji: "🌴" },
    ],
    hint: "The Arctic is near the North Pole. Winter is long, dark and very cold.",
  },
  {
    prompt: "Canada has two official languages. They are…",
    right: "English and French",
    wrong: ["English and Spanish", "French and German"],
    hint: "Canada's two official languages are English and French. Bonjour!",
    emoji: "🍁",
  },
  {
    prompt: "A big community with lots of people and tall buildings is called a…",
    right: { label: "city", emoji: "🏙️" },
    wrong: [
      { label: "farm", emoji: "🚜" },
      { label: "campsite", emoji: "🏕️" },
    ],
    hint: "Vancouver and Toronto are big cities.",
  },
  {
    prompt: "People in a community by the ocean might work as…",
    right: { label: "fishers", emoji: "🎣" },
    wrong: [
      { label: "desert guides", emoji: "🐪" },
      { label: "ski instructors on the beach", emoji: "🎿" },
    ],
    hint: "Communities near the ocean often have jobs that use the sea, like fishing.",
    emoji: "🌊",
  },
  {
    prompt: "Who were the first people to live on the land we now call Canada?",
    right: "Indigenous peoples, like First Nations and Inuit",
    wrong: ["Settlers from France", "Settlers from England"],
    hint: "Indigenous peoples have lived here for thousands of years, long before settlers came.",
    emoji: "🌲",
  },
  {
    prompt: "People in Canada come from many cultures. What can we share with each other?",
    right: { label: "foods, languages and celebrations", emoji: "🎉" },
    wrong: [
      { label: "nothing at all", emoji: "🚫" },
      { label: "only homework", emoji: "📝" },
    ],
    hint: "Learning about each other's cultures makes our communities stronger.",
    emoji: "🌍",
  },
  {
    prompt: "Which ocean is on the east side of Canada?",
    right: { label: "the Atlantic Ocean", emoji: "🌊" },
    wrong: [
      { label: "the Pacific Ocean", emoji: "🌊" },
      { label: "the Indian Ocean", emoji: "🌊" },
    ],
    hint: "Canada has the Pacific Ocean on the west, the Atlantic on the east and the Arctic Ocean in the north.",
    emoji: "🗺️",
  },
  {
    prompt: "Which ocean is on the west side of Canada?",
    right: { label: "the Pacific Ocean", emoji: "🌊" },
    wrong: [
      { label: "the Atlantic Ocean", emoji: "🌊" },
      { label: "the Southern Ocean", emoji: "🌊" },
    ],
    hint: "British Columbia is on the west coast, beside the Pacific Ocean.",
    emoji: "🗺️",
  },
  {
    prompt: "What is the capital city of Canada?",
    right: { label: "Ottawa", emoji: "🏛️" },
    wrong: [
      { label: "Victoria", emoji: "🏛️" },
      { label: "Winnipeg", emoji: "🏛️" },
    ],
    hint: "Ottawa is where the federal government meets. Each province has its own capital too.",
  },
  {
    prompt: "What colours are on the Canadian flag?",
    right: { label: "red and white", emoji: "🍁" },
    wrong: [
      { label: "blue and yellow", emoji: "🔵" },
      { label: "green and orange", emoji: "🟢" },
    ],
    hint: "Canada's flag is red and white with a red maple leaf in the middle.",
  },
  {
    prompt: "Which tree's leaf is on the Canadian flag?",
    right: { label: "maple", emoji: "🍁" },
    wrong: [
      { label: "palm", emoji: "🌴" },
      { label: "pine", emoji: "🌲" },
    ],
    hint: "The red leaf on the flag is a maple leaf.",
  },
  {
    prompt: "People in Canada make maple syrup from the sap of…",
    right: { label: "maple trees", emoji: "🍁" },
    wrong: [
      { label: "apple trees", emoji: "🍎" },
      { label: "cactus plants", emoji: "🌵" },
    ],
    hint: "In early spring, sap is collected from maple trees and boiled into syrup.",
  },
  {
    prompt: "Farms with lots of grain are most often found in…",
    right: { label: "the Prairies", emoji: "🌾" },
    wrong: [
      { label: "the Arctic", emoji: "🧊" },
      { label: "the middle of a big city", emoji: "🏙️" },
    ],
    hint: "Wide, flat land with good soil is great for growing wheat and other grains.",
  },
  {
    prompt: "Which place in Canada has the most snow and ice all year?",
    right: { label: "the Arctic", emoji: "🧊" },
    wrong: [
      { label: "the Prairies", emoji: "🌾" },
      { label: "a coastal city", emoji: "🏙️" },
    ],
    hint: "The Arctic is far north, so it stays cold for most of the year.",
  },
  {
    prompt: "A small community with farms and open fields is called a…",
    right: { label: "rural community", emoji: "🚜" },
    wrong: [
      { label: "big city", emoji: "🏙️" },
      { label: "space station", emoji: "🚀" },
    ],
    hint: "Rural means out in the country, where there are fewer people and more open land.",
  },
  {
    prompt: "A community with many people, busy streets and lots of buses is an…",
    right: { label: "urban community", emoji: "🏙️" },
    wrong: [
      { label: "rural community", emoji: "🚜" },
      { label: "empty field", emoji: "🌾" },
    ],
    hint: "Urban means in a city, where lots of people live close together.",
  },
  {
    prompt: "Which would you most likely see in a rural community?",
    right: { label: "a barn and open fields", emoji: "🚜" },
    wrong: [
      { label: "skyscrapers", emoji: "🏙️" },
      { label: "a subway station", emoji: "🚇" },
    ],
    hint: "Rural communities have more farms and open land than tall buildings.",
  },
  {
    prompt: "Which would you most likely see in a big city?",
    right: { label: "tall buildings and many buses", emoji: "🚌" },
    wrong: [
      { label: "a field of cows", emoji: "🐄" },
      { label: "a hay barn", emoji: "🌾" },
    ],
    hint: "Cities are busy places with many buildings and lots of transportation.",
  },
  {
    prompt: "Ravi's family celebrates Diwali. This is part of their…",
    right: { label: "culture", emoji: "🪔" },
    wrong: [
      { label: "weather", emoji: "☁️" },
      { label: "address", emoji: "📮" },
    ],
    hint: "Culture is the way a group of people live, including their celebrations, foods and languages.",
  },
  {
    prompt: "Many communities in Canada hold festivals. What do festivals help us do?",
    right: { label: "enjoy and learn about each other's cultures", emoji: "🎉" },
    wrong: [
      { label: "keep everyone apart", emoji: "🚧" },
      { label: "make everyone the same", emoji: "👥" },
    ],
    hint: "Festivals let us share music, food and traditions with our neighbours.",
  },
  {
    prompt: "Canada is a country. British Columbia is a…",
    right: "province",
    wrong: ["city", "continent"],
    hint: "Canada has ten provinces and three territories. BC is one of the provinces.",
    emoji: "🗺️",
  },
  {
    prompt: "Yukon, Nunavut and the Northwest Territories are called…",
    right: "territories",
    wrong: ["oceans", "cities"],
    hint: "Canada has three territories in the north and ten provinces.",
    emoji: "🧭",
  },
  {
    prompt: "Why do many people in Canada wear warm coats and boots in winter?",
    right: { label: "Winters can be very cold in many places", emoji: "🧥" },
    wrong: [
      { label: "It is always hot", emoji: "☀️" },
      { label: "Because they like swimming", emoji: "🏊" },
    ],
    hint: "Our clothes change with the weather. Many parts of Canada have cold, snowy winters.",
  },
  {
    prompt: "Which animal lives in many forests and lakes across Canada?",
    right: { label: "beaver", emoji: "🦫" },
    wrong: [
      { label: "kangaroo", emoji: "🦘" },
      { label: "camel", emoji: "🐪" },
    ],
    hint: "The beaver is a national symbol of Canada. It builds dams in rivers and streams.",
  },
  {
    prompt: "Which language do many people speak at home in Québec?",
    right: { label: "French", emoji: "💬" },
    wrong: [
      { label: "Japanese", emoji: "💬" },
      { label: "Italian", emoji: "💬" },
    ],
    hint: "Québec is a province where French is the main language, and people also speak English and many other languages.",
  },
  {
    prompt: "Many people in Canada speak a language other than English or French at home. This shows our…",
    right: { label: "many cultures", emoji: "🌍" },
    wrong: [
      { label: "same culture", emoji: "👥" },
      { label: "weather", emoji: "☁️" },
    ],
    hint: "Canada is home to people from all over the world, so we hear many languages.",
  },
  {
    prompt: "Indigenous peoples live in communities across Canada today. This means they…",
    right: { label: "are part of our communities now, not only long ago", emoji: "🌲" },
    wrong: [
      { label: "only lived here long ago", emoji: "⏳" },
      { label: "all live in one place", emoji: "📍" },
    ],
    hint: "First Nations, Métis and Inuit have strong, living communities today.",
  },
  {
    prompt: "Which job would be common in a community near a big forest?",
    right: { label: "forest worker or park ranger", emoji: "🌲" },
    wrong: [
      { label: "ship captain in a desert", emoji: "🚢" },
      { label: "wheat farmer in a rainforest", emoji: "🌾" },
    ],
    hint: "The land around a community shapes the jobs people do.",
  },
  {
    prompt: "A fishing boat is most likely to be found in a community…",
    right: { label: "beside the ocean or a big lake", emoji: "⛵" },
    wrong: [
      { label: "in the middle of a dry field", emoji: "🌾" },
      { label: "on top of a mountain", emoji: "🏔️" },
    ],
    hint: "People who fish need water nearby.",
  },
  {
    prompt: "In winter, which sport can children play on frozen ponds in many parts of Canada?",
    right: { label: "hockey", emoji: "🏒" },
    wrong: [
      { label: "surfing", emoji: "🏄" },
      { label: "beach volleyball", emoji: "🏐" },
    ],
    hint: "Cold weather freezes ponds and rinks, so skating and hockey are popular.",
  },
];

function canada(): Question[] {
  return fromBank(CANADA_BANK, 8);
}

// ---------- Caring Citizens ----------

const EARTH_SORT = {
  prompt: "Does it help the Earth or harm it? Tap an item, then tap its basket.",
  hint: "Small actions add up! What we do here can help or harm the whole planet.",
  bins: [
    { id: "help", label: "helps", emoji: "💚" },
    { id: "harm", label: "harms", emoji: "💔" },
  ],
  items: [
    { label: "recycle", emoji: "♻️", bin: "help" },
    { label: "plant a tree", emoji: "🌳", bin: "help" },
    { label: "walk or bike", emoji: "🚲", bin: "help" },
    { label: "pick up litter", emoji: "🧤", bin: "help" },
    { label: "leave lights on all day", emoji: "💡", bin: "harm" },
    { label: "drop litter on the ground", emoji: "🥤", bin: "harm" },
    { label: "leave the car running", emoji: "🚗", bin: "harm" },
  ],
};

const CARING_BANK: BankItem[] = [
  {
    prompt: "Which is a responsibility at school?",
    right: { label: "cleaning up after yourself", emoji: "🧹" },
    wrong: [
      { label: "taking someone's snack", emoji: "🍪" },
      { label: "yelling during story time", emoji: "📢" },
    ],
    hint: "A responsibility is something we should do to help others and ourselves.",
  },
  {
    prompt: "All children have the right to…",
    right: { label: "go to school and learn", emoji: "🏫" },
    wrong: [
      { label: "drive a car", emoji: "🚗" },
      { label: "stay up all night", emoji: "🌙" },
    ],
    hint: "Every child has the right to learn, to be safe, and to have food and clean water.",
  },
  {
    prompt: "Turning off the lights when you leave a room helps…",
    right: { label: "save energy for the planet", emoji: "🌍" },
    wrong: [
      { label: "make the room hotter", emoji: "🔥" },
      { label: "nobody at all", emoji: "🤷" },
    ],
    hint: "Saving energy at home helps the whole world.",
    emoji: "💡",
  },
  {
    prompt: "What does a firefighter do?",
    right: { label: "puts out fires and keeps us safe", emoji: "🚒" },
    wrong: [
      { label: "delivers the mail", emoji: "📬" },
      { label: "bakes bread", emoji: "🍞" },
    ],
    hint: "Firefighters are community helpers who keep us safe.",
    emoji: "🧑‍🚒",
  },
  {
    prompt: "How can you be a good friend at school?",
    right: { label: "share and include others", emoji: "🤝" },
    wrong: [
      { label: "leave someone out", emoji: "🙅" },
      { label: "grab toys", emoji: "✊" },
    ],
    hint: "Being kind and including others makes our community strong.",
  },
  {
    prompt: "A librarian helps people…",
    right: { label: "find books to read", emoji: "📚" },
    wrong: [
      { label: "fix cars", emoji: "🔧" },
      { label: "fly planes", emoji: "✈️" },
    ],
    hint: "Libraries are community places where everyone can borrow books.",
    emoji: "🏛️",
  },
  {
    prompt: "If everyone in our town recycles, what happens?",
    right: { label: "less garbage for the whole planet", emoji: "♻️" },
    wrong: [
      { label: "more garbage", emoji: "🗑️" },
      { label: "nothing changes", emoji: "😐" },
    ],
    hint: "Local actions have global effects. When many people help, it makes a big difference!",
  },
  {
    prompt: "A right is something every person is allowed to have. Which is a right?",
    right: { label: "to be safe", emoji: "🛡️" },
    wrong: [
      { label: "to hurt others", emoji: "✊" },
      { label: "to break things", emoji: "🔨" },
    ],
    hint: "Everyone has the right to be safe, be treated fairly and be cared for.",
  },
  {
    prompt: "Which is a responsibility at home?",
    right: { label: "helping to set the table", emoji: "🍽️" },
    wrong: [
      { label: "leaving toys all over the floor", emoji: "🧸" },
      { label: "hiding when someone needs help", emoji: "🙈" },
    ],
    hint: "A responsibility is a job we do to help our family and community.",
  },
  {
    prompt: "What does a doctor or nurse do?",
    right: { label: "helps people stay healthy", emoji: "🩺" },
    wrong: [
      { label: "drives a school bus", emoji: "🚌" },
      { label: "puts out fires", emoji: "🚒" },
    ],
    hint: "Doctors and nurses are helpers who look after our health.",
  },
  {
    prompt: "What does a bus driver do?",
    right: { label: "takes people safely where they need to go", emoji: "🚌" },
    wrong: [
      { label: "grows our food", emoji: "🚜" },
      { label: "fixes teeth", emoji: "🦷" },
    ],
    hint: "Bus drivers help people get to school and work.",
  },
  {
    prompt: "What does a garbage and recycling collector do?",
    right: { label: "keeps our streets clean and takes away waste", emoji: "🚛" },
    wrong: [
      { label: "teaches reading", emoji: "📖" },
      { label: "builds a house", emoji: "🏠" },
    ],
    hint: "Collectors are community helpers who take away garbage and recycling.",
  },
  {
    prompt: "Your classmate drops all their crayons. A caring citizen would…",
    right: { label: "help pick them up", emoji: "🖍️" },
    wrong: [
      { label: "laugh and walk away", emoji: "😆" },
      { label: "kick them away", emoji: "🦶" },
    ],
    hint: "A caring citizen helps others when they can.",
  },
  {
    prompt: "A new student joins your class. How can you help them feel welcome?",
    right: { label: "say hello and invite them to play", emoji: "👋" },
    wrong: [
      { label: "ignore them", emoji: "🙅" },
      { label: "say they can't sit with you", emoji: "🚫" },
    ],
    hint: "Welcoming others makes our community friendlier.",
  },
  {
    prompt: "Why do we have rules on the playground?",
    right: { label: "to keep everyone safe and fair", emoji: "📋" },
    wrong: [
      { label: "to stop all fun", emoji: "😠" },
      { label: "just because", emoji: "🤷" },
    ],
    hint: "Rules help everyone play safely and fairly.",
  },
  {
    prompt: "You find a lost mitten on the playground. What is a kind thing to do?",
    right: { label: "give it to a teacher so the owner can find it", emoji: "🧤" },
    wrong: [
      { label: "keep it hidden", emoji: "🙈" },
      { label: "throw it in the trash", emoji: "🗑️" },
    ],
    hint: "Being honest and helpful is part of being a good citizen.",
  },
  {
    prompt: "Taking turns on the swings is a way to be…",
    right: { label: "fair", emoji: "⚖️" },
    wrong: [
      { label: "bossy", emoji: "😤" },
      { label: "sneaky", emoji: "🦊" },
    ],
    hint: "Fair means everyone gets a chance.",
  },
  {
    prompt: "A community garden is a place where neighbours can…",
    right: { label: "grow vegetables and flowers together", emoji: "🥕" },
    wrong: [
      { label: "park their cars", emoji: "🚗" },
      { label: "keep their trash", emoji: "🗑️" },
    ],
    hint: "Working together on something is a great way to care for a community.",
  },
  {
    prompt: "Which is a way to save water at home?",
    right: { label: "turn off the tap while brushing your teeth", emoji: "🚰" },
    wrong: [
      { label: "leave the tap running all day", emoji: "💦" },
      { label: "fill the tub for no reason", emoji: "🛁" },
    ],
    hint: "Water is precious. Using less helps people and nature all over the world.",
  },
  {
    prompt: "Why is it important to put litter in a bin?",
    right: { label: "It keeps parks and streams clean for animals and people", emoji: "🌳" },
    wrong: [
      { label: "It makes more garbage on the ground", emoji: "🗑️" },
      { label: "Nobody cares about parks", emoji: "😐" },
    ],
    hint: "Litter can hurt animals and spoil places we enjoy.",
  },
  {
    prompt: "What can you do with a clean empty cardboard box to help the Earth?",
    right: { label: "recycle it or use it again", emoji: "📦" },
    wrong: [
      { label: "throw it in a river", emoji: "🏞️" },
      { label: "burn it outside", emoji: "🔥" },
    ],
    hint: "Reuse and recycle help us use fewer new things.",
    emoji: "♻️",
  },
  {
    prompt: "A crossing guard helps children…",
    right: { label: "cross the street safely", emoji: "🚸" },
    wrong: [
      { label: "bake a cake", emoji: "🎂" },
      { label: "read a map in space", emoji: "🚀" },
    ],
    hint: "Crossing guards are community helpers who watch for traffic.",
  },
  {
    prompt: "A person who brings letters and parcels to your home is a…",
    right: { label: "mail carrier", emoji: "📬" },
    wrong: [
      { label: "dentist", emoji: "🦷" },
      { label: "baker", emoji: "🍞" },
    ],
    hint: "Mail carriers help connect people in the community.",
  },
  {
    prompt: "Voting is one way adults help decide things for their community. Who gets to vote?",
    right: { label: "adult citizens of Canada", emoji: "🗳️" },
    wrong: [
      { label: "only kittens", emoji: "🐱" },
      { label: "nobody", emoji: "🚫" },
    ],
    hint: "Adults who are citizens can vote for the people who make decisions for us.",
  },
  {
    prompt: "In your classroom, you can help make a decision by…",
    right: { label: "listening to others and sharing your idea politely", emoji: "🗣️" },
    wrong: [
      { label: "shouting your idea over everyone", emoji: "📢" },
      { label: "refusing to listen", emoji: "🙉" },
    ],
    hint: "A good citizen listens and shares ideas respectfully.",
  },
  {
    prompt: "Respecting others means…",
    right: { label: "treating them kindly, even when they are different from us", emoji: "🤝" },
    wrong: [
      { label: "teasing people who are different", emoji: "😝" },
      { label: "only playing with people who look like us", emoji: "👥" },
    ],
    hint: "Respect is one of the best things we can show in our community.",
  },
  {
    prompt: "Zoe sees a classmate who is sad. A kind thing to do is…",
    right: { label: "ask if they want to talk or play", emoji: "💛" },
    wrong: [
      { label: "pretend not to see", emoji: "🙈" },
      { label: "tell them to go away", emoji: "🚫" },
    ],
    hint: "Kindness helps people feel they belong.",
  },
  {
    prompt: "Our local park belongs to…",
    right: { label: "everyone in the community", emoji: "🌳" },
    wrong: [
      { label: "only one person", emoji: "🧍" },
      { label: "only people who are tall", emoji: "📏" },
    ],
    hint: "Public places like parks and libraries are for everyone to share and take care of.",
  },
  {
    prompt: "What is a good way to help your community stay healthy?",
    right: { label: "wash your hands and stay home when sick", emoji: "🧼" },
    wrong: [
      { label: "share your cold on purpose", emoji: "🤧" },
      { label: "never wash your hands", emoji: "🙅" },
    ],
    hint: "Looking after our health also helps the people around us.",
  },
  {
    prompt: "Adults pay taxes and use the money to pay for things like…",
    right: { label: "roads, schools and parks", emoji: "🛣️" },
    wrong: [
      { label: "candy for every child", emoji: "🍬" },
      { label: "a private rocket", emoji: "🚀" },
    ],
    hint: "Everyone shares the cost of things the whole community uses.",
  },
];

function caring(): Question[] {
  return shuffle([sortQuestion(EARTH_SORT, 3), ...fromBank(CARING_BANK, 7)]);
}

// Bank items marked `hard` are stretch questions: difficulty 1 uses only the easier
// items, 2 mixes in a few, 3 is mostly stretch.
type LevelItem = BankItem & { hard?: true };

function levelled(bank: LevelItem[], count: number, difficulty: 1 | 2 | 3): Question[] {
  const easy = bank.filter((b) => !b.hard);
  const hard = bank.filter((b) => b.hard);
  const want = difficulty === 1 ? 0 : difficulty === 2 ? Math.ceil(count / 3) : Math.ceil((count * 2) / 3);
  const nHard = Math.min(want, hard.length);
  return [...fromBank(easy, count - nHard), ...fromBank(hard, nHard)];
}

// ---------- Lands & Waters ----------

const LAND_WATER_SORT = {
  prompt: "Is it land or water? Tap an item, then tap its basket.",
  hint: "Landforms are shapes of the land. Bodies of water are places filled with water.",
  bins: [
    { id: "land", label: "landform", emoji: "⛰️" },
    { id: "water", label: "body of water", emoji: "🌊" },
  ],
  items: [
    { label: "mountain", emoji: "🏔️", bin: "land" },
    { label: "island", emoji: "🏝️", bin: "land" },
    { label: "valley", emoji: "🏞️", bin: "land" },
    { label: "desert", emoji: "🏜️", bin: "land" },
    { label: "hill", emoji: "⛰️", bin: "land" },
    { label: "ocean", emoji: "🌊", bin: "water" },
    { label: "lake", emoji: "🛶", bin: "water" },
    { label: "river", emoji: "🐟", bin: "water" },
    { label: "pond", emoji: "🦆", bin: "water" },
  ],
};

const WORLD_BANK: LevelItem[] = [
  {
    prompt: "Land with water all around it is called an…",
    right: { label: "island", emoji: "🏝️" },
    wrong: [
      { label: "ocean", emoji: "🌊" },
      { label: "valley", emoji: "🏞️" },
    ],
    hint: "An island is land with water on every side.",
  },
  {
    prompt: "A very tall, steep landform with a peak at the top is a…",
    right: { label: "mountain", emoji: "🏔️" },
    wrong: [
      { label: "lake", emoji: "🛶" },
      { label: "plain", emoji: "🌾" },
    ],
    hint: "Mountains are the tallest landforms. Some have snow on top all year.",
  },
  {
    prompt: "Low land between hills or mountains is a…",
    right: { label: "valley", emoji: "🏞️" },
    wrong: [
      { label: "peak", emoji: "🗻" },
      { label: "island", emoji: "🏝️" },
    ],
    hint: "A valley is the low land between higher land. Rivers often flow through valleys.",
  },
  {
    prompt: "Wide, flat land with few hills is called a…",
    right: { label: "plain", emoji: "🌾" },
    wrong: [
      { label: "mountain", emoji: "🏔️" },
      { label: "canyon", emoji: "🏜️" },
    ],
    hint: "Plains are flat and wide. They are often good for farming.",
  },
  {
    prompt: "A very dry place that gets very little rain is a…",
    right: { label: "desert", emoji: "🏜️" },
    wrong: [
      { label: "rainforest", emoji: "🌴" },
      { label: "lake", emoji: "🛶" },
    ],
    hint: "Deserts get very little rain. Some are hot and some are cold.",
  },
  {
    prompt: "Water that flows across the land toward a lake or the ocean is a…",
    right: { label: "river", emoji: "🏞️" },
    wrong: [
      { label: "hill", emoji: "⛰️" },
      { label: "pond", emoji: "🦆" },
    ],
    hint: "A river moves. It flows downhill until it reaches a lake or the sea.",
  },
  {
    prompt: "A big body of water with land all around it is a…",
    right: { label: "lake", emoji: "🛶" },
    wrong: [
      { label: "island", emoji: "🏝️" },
      { label: "desert", emoji: "🏜️" },
    ],
    hint: "A lake is water with land around it. An island is the opposite: land with water around it!",
  },
  {
    prompt: "The biggest bodies of salt water on Earth are…",
    right: { label: "oceans", emoji: "🌊" },
    wrong: [
      { label: "ponds", emoji: "🦆" },
      { label: "puddles", emoji: "💧" },
    ],
    hint: "Oceans are huge and salty. They cover most of the Earth.",
  },
  {
    prompt: "Places near the equator, the middle of the Earth, are usually…",
    right: { label: "hot", emoji: "☀️" },
    wrong: [
      { label: "frozen all year", emoji: "🧊" },
      { label: "snowy every day", emoji: "❄️" },
    ],
    hint: "The sun shines strongly on the middle of the Earth, so it is warm there.",
  },
  {
    prompt: "Places near the North Pole and the South Pole are…",
    right: { label: "very cold", emoji: "🧊" },
    wrong: [
      { label: "hot and dry", emoji: "🌵" },
      { label: "warm and rainy", emoji: "🌴" },
    ],
    hint: "The poles are the coldest places on Earth, covered in ice and snow.",
  },
  {
    prompt: "Which plant grows well in a hot, dry desert?",
    right: { label: "cactus", emoji: "🌵" },
    wrong: [
      { label: "rice in a flooded field", emoji: "🌾" },
      { label: "moss in a wet forest", emoji: "🌿" },
    ],
    hint: "A cactus stores water inside, so it can live where it rarely rains.",
  },
  {
    prompt: "Which animal lives where it is icy and cold?",
    right: { label: "polar bear", emoji: "🐻‍❄️" },
    wrong: [
      { label: "camel", emoji: "🐪" },
      { label: "parrot", emoji: "🦜" },
    ],
    hint: "Polar bears have thick fur and fat to stay warm in the Arctic.",
  },
  {
    prompt: "Which animal is built for life in a hot, sandy desert?",
    right: { label: "camel", emoji: "🐪" },
    wrong: [
      { label: "penguin", emoji: "🐧" },
      { label: "seal", emoji: "🦭" },
    ],
    hint: "Camels can go a long time without drinking water.",
  },
  {
    prompt: "A warm, wet forest with lots of rain all year is a…",
    right: { label: "rainforest", emoji: "🌴" },
    wrong: [
      { label: "desert", emoji: "🏜️" },
      { label: "glacier", emoji: "🧊" },
    ],
    hint: "Rainforests get rain almost every day, so plants grow tall and thick.",
  },
  {
    prompt: "A round model of the whole Earth is a…",
    right: { label: "globe", emoji: "🌍" },
    wrong: [
      { label: "compass", emoji: "🧭" },
      { label: "ruler", emoji: "📏" },
    ],
    hint: "A globe is shaped like a ball, just like the Earth.",
  },
  {
    prompt: "The very large pieces of land on Earth are called…",
    right: "continents",
    wrong: ["islands", "ponds"],
    hint: "There are seven continents. We live on the continent of North America.",
    emoji: "🗺️",
  },
  {
    prompt: "Which continent is Canada part of?",
    right: "North America",
    wrong: ["Africa", "Australia"],
    hint: "Canada is in North America, along with the United States and Mexico.",
    emoji: "🌎",
  },
  {
    prompt: "How many continents are there on Earth?",
    right: "7",
    wrong: ["3", "12"],
    hint: "There are seven continents: Africa, Antarctica, Asia, Australia, Europe, North America and South America.",
    emoji: "🌍",
  },
  {
    prompt: "On a map or globe, most of the Earth is coloured…",
    right: { label: "blue, for water", emoji: "🌊" },
    wrong: [
      { label: "green, for forests", emoji: "🌲" },
      { label: "brown, for deserts", emoji: "🏜️" },
    ],
    hint: "Water covers most of the Earth, so maps and globes show lots of blue.",
  },
  {
    prompt: "Which continent is covered in ice and is the coldest place on Earth?",
    right: "Antarctica",
    wrong: ["Africa", "South America"],
    hint: "Antarctica is at the South Pole. Penguins live there.",
    emoji: "🐧",
  },
  {
    prompt: "A huge, slow-moving body of ice on land is a…",
    right: { label: "glacier", emoji: "🧊" },
    wrong: [
      { label: "river", emoji: "🏞️" },
      { label: "beach", emoji: "🏖️" },
    ],
    hint: "Glaciers are made of snow packed into ice over many, many years.",
  },
  {
    prompt: "A small body of still water, smaller than a lake, is a…",
    right: { label: "pond", emoji: "🦆" },
    wrong: [
      { label: "ocean", emoji: "🌊" },
      { label: "mountain", emoji: "🏔️" },
    ],
    hint: "Ponds are small and still. Frogs and ducks often live there.",
  },
  {
    prompt: "In a place with very cold winters, what do homes need most?",
    right: { label: "heat to keep warm", emoji: "🔥" },
    wrong: [
      { label: "a pool on the roof", emoji: "🏊" },
      { label: "open windows all winter", emoji: "🪟" },
    ],
    hint: "Climate changes what people need. Cold places need warm homes and clothes.",
    hard: true,
  },
  {
    prompt: "Why do many homes in very hot places have thick walls and shady windows?",
    right: "to stay cool inside",
    wrong: ["to keep snow out", "to stay warm in winter storms"],
    hint: "Thick walls and shade keep out the hot sun.",
    emoji: "☀️",
    hard: true,
  },
  {
    prompt: "Many towns grow up beside rivers. Why?",
    right: { label: "people need water for drinking, food and travel", emoji: "🛶" },
    wrong: [
      { label: "rivers keep people away", emoji: "🚫" },
      { label: "rivers make the land dry", emoji: "🏜️" },
    ],
    hint: "Rivers give water for drinking and farming, and a way to travel.",
    hard: true,
  },
  {
    prompt: "Kids in a hot country and kids in a cold country both need…",
    right: { label: "food, water and a safe home", emoji: "🏠" },
    wrong: [
      { label: "a snowsuit", emoji: "🧥" },
      { label: "a sun hat every day", emoji: "👒" },
    ],
    hint: "Some needs change with the climate, but everyone needs food, water and shelter.",
    hard: true,
  },
  {
    prompt: "Which one is a body of water, not a landform?",
    right: { label: "bay", emoji: "⛵" },
    wrong: [
      { label: "hill", emoji: "⛰️" },
      { label: "plain", emoji: "🌾" },
    ],
    hint: "A bay is part of an ocean or lake that curves into the land.",
    hard: true,
  },
  {
    prompt: "A long, narrow beach where the land meets the ocean is part of the…",
    right: "coast",
    wrong: ["desert", "prairie"],
    hint: "The coast is where land and sea meet.",
    emoji: "🏖️",
    hard: true,
  },
  {
    prompt: "Snow and ice melt on mountains in spring. Where does the water go?",
    right: { label: "into streams and rivers", emoji: "🏞️" },
    wrong: [
      { label: "up to the moon", emoji: "🌙" },
      { label: "into the desert sand forever", emoji: "🏜️" },
    ],
    hint: "Melted snow runs downhill into streams, rivers and lakes.",
    hard: true,
  },
  {
    prompt: "People on a small island often travel to the mainland by…",
    right: { label: "ferry or boat", emoji: "⛴️" },
    wrong: [
      { label: "train under every island", emoji: "🚆" },
      { label: "camel", emoji: "🐪" },
    ],
    hint: "The land around a community shapes how people travel.",
    hard: true,
  },
  {
    prompt: "Which job would you most likely find in a farming community on the plains?",
    right: { label: "grain farmer", emoji: "🌾" },
    wrong: [
      { label: "deep-sea diver", emoji: "🤿" },
      { label: "glacier guide", emoji: "🧊" },
    ],
    hint: "Flat land with good soil is great for growing grain.",
    hard: true,
  },
  {
    prompt: "In which climate would people most likely wear light clothes all year?",
    right: { label: "a hot, rainy place near the equator", emoji: "🌴" },
    wrong: [
      { label: "the Arctic", emoji: "🧊" },
      { label: "a snowy mountain top", emoji: "🏔️" },
    ],
    hint: "Near the equator it is warm all year, so heavy coats aren't needed.",
    hard: true,
  },
  {
    prompt: "What is weather that a place has most years, like hot summers and cold winters, called?",
    right: "climate",
    wrong: ["a holiday", "a landform"],
    hint: "Weather is what happens today. Climate is what a place is usually like over many years.",
    emoji: "🌦️",
    hard: true,
  },
  {
    prompt: "Which big ocean is between Canada and Asia?",
    right: "the Pacific Ocean",
    wrong: ["the Atlantic Ocean", "the Arctic Ocean"],
    hint: "The Pacific Ocean is on Canada's west side. Asia is across it.",
    emoji: "🌏",
    hard: true,
  },
  {
    prompt: "Which big ocean is between Canada and Europe?",
    right: "the Atlantic Ocean",
    wrong: ["the Pacific Ocean", "the Indian Ocean"],
    hint: "The Atlantic Ocean is on Canada's east side. Europe is across it.",
    emoji: "🌍",
    hard: true,
  },
  {
    prompt: "Many people in the world live near water. Why is it important to keep lakes and oceans clean?",
    right: { label: "people, plants and animals all need clean water", emoji: "💧" },
    wrong: [
      { label: "dirty water is better for fish", emoji: "🐟" },
      { label: "only one town uses the water", emoji: "🏘️" },
    ],
    hint: "Water connects communities. What one place puts in the water can reach many others.",
    hard: true,
  },
];

function landsAndWaters({ difficulty = 2 }: GenerateOptions = {}): Question[] {
  return shuffle([sortQuestion(LAND_WATER_SORT, difficulty === 1 ? 2 : 3), ...levelled(WORLD_BANK, 7, difficulty)]);
}

// ---------- Leaders & Services ----------

const GOODS_SERVICES_SORT = {
  prompt: "Is it a good or a service? Tap an item, then tap its basket.",
  hint: "Goods are things you can hold. Services are jobs people do to help others.",
  bins: [
    { id: "good", label: "good", emoji: "📦" },
    { id: "service", label: "service", emoji: "🛠️" },
  ],
  items: [
    { label: "apples", emoji: "🍎", bin: "good" },
    { label: "a bike", emoji: "🚲", bin: "good" },
    { label: "a book", emoji: "📕", bin: "good" },
    { label: "a sweater", emoji: "🧶", bin: "good" },
    { label: "a haircut", emoji: "💇", bin: "service" },
    { label: "a bus ride", emoji: "🚌", bin: "service" },
    { label: "a check-up at the dentist", emoji: "🦷", bin: "service" },
    { label: "fixing a car", emoji: "🔧", bin: "service" },
  ],
};

const LEADERS_BANK: LevelItem[] = [
  {
    prompt: "Who leads the council of a town or city?",
    right: { label: "the mayor", emoji: "🏛️" },
    wrong: [
      { label: "the crossing guard", emoji: "🚸" },
      { label: "the baker", emoji: "🍞" },
    ],
    hint: "Towns and cities elect a mayor and councillors to make decisions.",
  },
  {
    prompt: "The group that makes decisions for a town or city is the…",
    right: "council",
    wrong: ["choir", "team bus"],
    hint: "Councillors meet together on the town or city council.",
    emoji: "🏛️",
  },
  {
    prompt: "Where does a city council often meet?",
    right: { label: "city hall", emoji: "🏛️" },
    wrong: [
      { label: "the skating rink", emoji: "⛸️" },
      { label: "a grocery store", emoji: "🛒" },
    ],
    hint: "City hall (or the town hall) is where the mayor and council meet.",
  },
  {
    prompt: "Many First Nations communities choose a chief and…",
    right: "a council",
    wrong: ["a sports team", "a bus driver"],
    hint: "Many First Nations communities have a chief and council who make decisions for the community.",
    emoji: "🌲",
  },
  {
    prompt: "In many Indigenous communities, Elders are respected because they…",
    right: { label: "share knowledge and give advice", emoji: "🧓" },
    wrong: [
      { label: "drive the fire trucks", emoji: "🚒" },
      { label: "sell the most toys", emoji: "🧸" },
    ],
    hint: "Elders have lived a long time and share what they know with the community.",
  },
  {
    prompt: "How do adults choose a mayor?",
    right: { label: "they vote", emoji: "🗳️" },
    wrong: [
      { label: "they flip a coin", emoji: "🪙" },
      { label: "the tallest person wins", emoji: "📏" },
    ],
    hint: "In an election, adult citizens vote for the people they want as leaders.",
  },
  {
    prompt: "A person who helps the community without being paid is a…",
    right: { label: "volunteer", emoji: "🙋" },
    wrong: [
      { label: "customer", emoji: "🛍️" },
      { label: "tourist", emoji: "📸" },
    ],
    hint: "Volunteers give their time to help, like coaching a team or helping at a food bank.",
  },
  {
    prompt: "Who helps keep people safe and makes sure laws are followed?",
    right: { label: "police officers", emoji: "👮" },
    wrong: [
      { label: "librarians", emoji: "📚" },
      { label: "painters", emoji: "🎨" },
    ],
    hint: "Police officers are part of the services a community provides.",
  },
  {
    prompt: "Buses and trains that everyone can ride are called…",
    right: "public transit",
    wrong: ["private jets", "toy trains"],
    hint: "Public transit is a service that helps people get around the community.",
    emoji: "🚌",
  },
  {
    prompt: "Which service brings clean water to homes?",
    right: { label: "the water system", emoji: "🚰" },
    wrong: [
      { label: "the movie theatre", emoji: "🎬" },
      { label: "the toy store", emoji: "🧸" },
    ],
    hint: "Communities build pipes and treatment plants so homes get clean water.",
  },
  {
    prompt: "Things you can buy and hold, like food and toys, are called…",
    right: "goods",
    wrong: ["services", "rules"],
    hint: "Goods are things. Services are jobs people do for us.",
    emoji: "🛒",
  },
  {
    prompt: "A job someone does for you, like cutting your hair, is a…",
    right: "service",
    wrong: ["good", "landform"],
    hint: "A service is work done to help someone.",
    emoji: "💇",
  },
  {
    prompt: "Your class must pick a game. Everyone votes and the game with the most votes wins. This is…",
    right: "majority rule",
    wrong: ["a secret", "a landform"],
    hint: "Majority rule means the choice with the most votes is picked.",
    emoji: "✋",
  },
  {
    prompt: "Your group talks until everyone agrees on a plan. This is called…",
    right: "reaching a consensus",
    wrong: ["flipping a coin", "giving up"],
    hint: "A consensus is when the whole group agrees.",
    emoji: "🤝",
  },
  {
    prompt: "Who makes the rules for your classroom?",
    right: { label: "your teacher, often with the class", emoji: "🧑‍🏫" },
    wrong: [
      { label: "the mayor", emoji: "🏛️" },
      { label: "a visitor at the door", emoji: "🚪" },
    ],
    hint: "Different leaders make decisions for different places.",
  },
  {
    prompt: "A food bank helps people who…",
    right: { label: "can't buy enough food right now", emoji: "🥫" },
    wrong: [
      { label: "want a new video game", emoji: "🎮" },
      { label: "need a haircut", emoji: "💇" },
    ],
    hint: "Communities help people who can't meet their basic needs, like food.",
  },
  {
    prompt: "What does a bylaw officer do?",
    right: { label: "checks that town rules are followed", emoji: "📋" },
    wrong: [
      { label: "teaches swimming", emoji: "🏊" },
      { label: "bakes bread", emoji: "🍞" },
    ],
    hint: "Bylaws are rules made by a town or city council, like where dogs must be on a leash.",
  },
  {
    prompt: "Who pays for roads, parks and fire halls in a community?",
    right: { label: "everyone shares the cost through taxes", emoji: "💰" },
    wrong: [
      { label: "only children", emoji: "🧒" },
      { label: "nobody, they are free to build", emoji: "🆓" },
    ],
    hint: "Adults pay taxes. The money pays for services everyone uses.",
  },
  {
    prompt: "How can a kid help make a decision in their community?",
    right: { label: "share ideas with leaders, like writing a letter", emoji: "✉️" },
    wrong: [
      { label: "shout at the council", emoji: "📢" },
      { label: "ignore the problem", emoji: "🙈" },
    ],
    hint: "Kids can share ideas respectfully, even before they are old enough to vote.",
    hard: true,
  },
  {
    prompt: "The council wants a new park. Some people want a parking lot instead. A fair way to decide is to…",
    right: { label: "listen to many people, then vote", emoji: "🗳️" },
    wrong: [
      { label: "let one person choose for fun", emoji: "🎲" },
      { label: "never decide", emoji: "⏳" },
    ],
    hint: "Good leaders listen to different points of view before deciding.",
    hard: true,
  },
  {
    prompt: "When the teacher decides alone, without a vote, that is…",
    right: "authority rule",
    wrong: ["majority rule", "consensus"],
    hint: "Authority rule means a leader makes the decision.",
    emoji: "🧑‍🏫",
    hard: true,
  },
  {
    prompt: "A small village might not have a hospital. Where might people go?",
    right: { label: "to a hospital in a bigger town nearby", emoji: "🏥" },
    wrong: [
      { label: "to the library", emoji: "📚" },
      { label: "to the beach", emoji: "🏖️" },
    ],
    hint: "Big communities often have more services than small ones.",
    hard: true,
  },
  {
    prompt: "Why might a big city have more bus routes than a small village?",
    right: "more people need to get around",
    wrong: ["villages have no roads at all", "buses only work in cities"],
    hint: "The size of a community changes which services it needs.",
    emoji: "🚌",
    hard: true,
  },
  {
    prompt: "Families can get a home by buying it or by…",
    right: "renting it",
    wrong: ["borrowing it from the library", "drawing it"],
    hint: "Renting means paying to live in a home that someone else owns.",
    emoji: "🏠",
    hard: true,
  },
  {
    prompt: "Libraries, parks and fire halls are paid for with public money. This means they are for…",
    right: { label: "everyone in the community", emoji: "👨‍👩‍👧‍👦" },
    wrong: [
      { label: "only the mayor", emoji: "🏛️" },
      { label: "only people who own a car", emoji: "🚗" },
    ],
    hint: "Public services are shared by the whole community.",
    hard: true,
  },
  {
    prompt: "A storm knocks down trees across town. Which service helps clear the roads?",
    right: { label: "public works crews", emoji: "🚜" },
    wrong: [
      { label: "the ice cream shop", emoji: "🍦" },
      { label: "the music teacher", emoji: "🎻" },
    ],
    hint: "Public works crews look after roads, water pipes and parks.",
    hard: true,
  },
  {
    prompt: "Every child in the world has the right to food, water, school and safety. These are…",
    right: "human rights",
    wrong: ["chores", "wants"],
    hint: "Human rights belong to every person, wherever they live.",
    emoji: "🌍",
    hard: true,
  },
  {
    prompt: "A flood hits a town far away. How can people in other communities help?",
    right: { label: "send help, like food, water and supplies", emoji: "📦" },
    wrong: [
      { label: "do nothing because it is far", emoji: "🤷" },
      { label: "laugh at the news", emoji: "😆" },
    ],
    hint: "Global citizens help others, near and far.",
    hard: true,
  },
  {
    prompt: "A councillor's job is to…",
    right: { label: "help make decisions for the community", emoji: "🏛️" },
    wrong: [
      { label: "teach one class at school", emoji: "🏫" },
      { label: "deliver pizza", emoji: "🍕" },
    ],
    hint: "Councillors are elected to make decisions with the mayor.",
    hard: true,
  },
  {
    prompt: "Why do adults vote in elections?",
    right: { label: "to choose leaders who make decisions for everyone", emoji: "🗳️" },
    wrong: [
      { label: "to win a prize", emoji: "🏆" },
      { label: "to pick their favourite colour", emoji: "🎨" },
    ],
    hint: "Voting lets citizens have a say in who leads their community.",
    hard: true,
  },
];

function leadersAndServices({ difficulty = 2 }: GenerateOptions = {}): Question[] {
  return shuffle([sortQuestion(GOODS_SERVICES_SORT, difficulty === 1 ? 2 : 3), ...levelled(LEADERS_BANK, 7, difficulty)]);
}

export const course: Course = {
  grade: "2",
  subject: "social",
  bigIdeas: {
    "ca-bc": [
    "Local actions have global consequences, and global actions have local consequences.",
    "Canada is made up of many diverse regions and communities.",
    "Individuals have rights and responsibilities as global citizens.",
    "Our rights, roles, and responsibilities are important for building strong communities.",
    ],
  },
  units: [
    {
      id: "needs-and-wants",
      title: "Needs & Wants",
      emoji: "🏠",
      blurb: "What do we really need?",
      standards: { "ca-bc": "How people's needs and wants are met in communities" },
      parentNote: "Telling needs from wants and how communities help meet people's needs.",
      generate: needsWants,
    },
    {
      id: "communities-in-canada",
      title: "Communities in Canada",
      emoji: "🍁",
      blurb: "Mountains, prairies and the Arctic",
      standards: { "ca-bc": "Diverse characteristics of communities and cultures in Canada; features of the environment in other parts of Canada" },
      parentNote: "Canada's regions, cities and rural communities, official languages, and Indigenous peoples as the first peoples of this land.",
      generate: canada,
    },
    {
      id: "caring-citizens",
      title: "Caring Citizens",
      emoji: "🤝",
      blurb: "Rights and responsibilities",
      standards: { "ca-bc": "Rights, roles and responsibilities of individuals and communities; local actions with global consequences" },
      parentNote: "Rights and responsibilities, community helpers, and how small local actions help the planet.",
      generate: caring,
    },
    {
      id: "lands-and-waters",
      title: "Lands & Waters",
      emoji: "🌍",
      blurb: "Landforms, climates and continents",
      standards: { "ca-bc": "Diverse features of the environment in other parts of Canada and the world: climate zones, landforms, bodies of water, plants and animals" },
      parentNote:
        "Naming landforms and bodies of water, hot and cold climate zones, the continents and oceans, and how the land and climate shape the way people live.",
      generate: landsAndWaters,
    },
    {
      id: "leaders-and-services",
      title: "Leaders & Services",
      emoji: "🏛️",
      blurb: "Who decides, and who helps",
      standards: { "ca-bc": "Roles and responsibilities of regional governments; how people's needs and wants are met in communities (goods and services)" },
      parentNote:
        "Mayors, councils, chiefs and Elders, community services and who pays for them, goods and services, and fair ways to make a group decision (voting, consensus).",
      generate: leadersAndServices,
    },
  ],
};
