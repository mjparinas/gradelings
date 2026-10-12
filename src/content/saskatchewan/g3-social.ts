import type { SortSet } from "../bank";
import type { Unit } from "../types";
import { bankUnit, hq, order, q, type Item } from "../ontario/g3-4-kit";
import { sk } from "./kit";

// Saskatchewan Grade 3 Social Studies: the outcomes that the shared BC units don't practise. How decisions are made
// in communities, solving conflicts and the rights of children (PA3.1–PA3.3), and how technology and
// interdependence connect communities (RW3.3, IN3.3).

// ---------- Decisions, conflicts and children's rights ----------

const CONFLICT_SORT: SortSet = {
  prompt: "Does it help solve a disagreement, or make it worse? Tap an action, then tap its basket.",
  hint: "Calm words, listening and taking turns help. Yelling, grabbing and leaving people out make things worse.",
  bins: [
    { id: "help", label: "helps solve it", emoji: "🤝" },
    { id: "worse", label: "makes it worse", emoji: "💥" },
  ],
  items: [
    { label: "listen to each other", emoji: "👂" },
    { label: "take turns talking", emoji: "🔁" },
    { label: "find a fair compromise", emoji: "⚖️" },
    { label: "take a deep breath first", emoji: "🧘" },
    { label: "yell at each other", emoji: "📢" },
    { label: "grab the toy away", emoji: "✊" },
    { label: "call each other names", emoji: "😠" },
    { label: "leave someone out on purpose", emoji: "🚫" },
  ].map((it, i) => ({ ...it, bin: i < 4 ? "help" : "worse" })),
};

const RIGHTS: Item[] = [
  q("Who leads a city or town council?", "a mayor", ["a premier", "a principal", "a coach"], "The mayor and councillors make decisions for a city or town.", "🏘️"),
  q("In a Saskatchewan rural municipality (RM), the council is led by a…", "reeve", ["mayor", "premier", "judge"], "Rural municipalities have a reeve and councillors.", "🚜"),
  q("Many First Nations communities make decisions through…", "a chief and council", ["a hockey coach", "a school bus driver", "a store owner"], "Chiefs and councillors are chosen by their communities.", "🏛️"),
  q("How are a mayor and councillors chosen?", "people in the community vote for them", ["they win a race", "they are picked from a hat", "the oldest person is chosen"], "Voting lets people choose their leaders.", "🗳️"),
  q("A town needs a new playground. Who decides how to spend the town's money on it?", "the town council", ["one child", "the weather", "a visitor"], "Councils make decisions for the whole community.", "🏞️"),
  q("Your class votes on a game. 15 people pick tag and 9 pick soccer. What happens with majority rule?", "the class plays tag", ["the class plays soccer", "nobody plays", "the teacher plays alone"], "Majority rule means the choice with more votes wins.", "🗳️"),
  q("A group talks until everyone agrees on a plan. This is called…", "consensus", ["a vote", "a rule", "an argument"], "Consensus means everyone agrees with the decision.", "🤝"),
  q("Why do communities have rules and laws?", "to keep people safe and treat everyone fairly", ["to make life boring", "so that nobody can play", "to stop people from talking"], "Rules help people live together.", "📜"),
  q("Two friends both want the same swing. What is a fair way to solve it?", "take turns and use a timer", ["push the other friend off", "stay angry all day", "break the swing"], "Taking turns is a fair way to share.", "⏱️"),
  q("Your friend has a different idea from yours. What is a respectful thing to do?", "listen to their idea and share yours calmly", ["tell them their idea is silly", "walk away and ignore them", "shout louder"], "People can disagree and still be kind.", "💬"),
  q("What does “compromise” mean?", "each side gives a little to reach an agreement", ["one side gets everything", "nobody talks", "everyone gives up"], "In a compromise, both sides get part of what they want.", "⚖️"),
  q("When a disagreement is too big to solve alone, it is a good idea to…", "ask a trusted adult for help", ["keep it a secret forever", "fight about it", "break something"], "Teachers, family members and other trusted adults can help.", "🧑‍🏫"),
  q("Which sentence uses an “I message” to share a feeling?", "I feel upset when I am not given a turn.", ["You never share!", "You are mean.", "Go away!"], "An I message starts with “I feel…” and says why.", "💬"),
  q("A document that lists the rights of children around the world is the…", "United Nations Convention on the Rights of the Child", ["Canadian Food Guide", "Saskatchewan road map", "school lunch menu"], "Many countries, including Canada, agreed to it.", "📜"),
  q("Which is a right that all children have?", "the right to go to school and learn", ["the right to stay up all night", "the right to never do chores", "the right to eat only candy"], "Rights are things every child needs to be safe, healthy and grow.", "🏫"),
  q("Which is a right that all children have?", "the right to be safe", ["the right to have the newest toy", "the right to skip school", "the right to a pet"], "Every child has the right to be safe and cared for.", "🛡️"),
  q("Which is a right that all children have?", "the right to play and rest", ["the right to drive a car", "the right to vote", "the right to a phone"], "Play and rest help children grow.", "🪁"),
  q("Which is a right that all children have?", "the right to clean water and healthy food", ["the right to candy every day", "the right to a swimming pool", "the right to a new bike"], "Children need water and food to be healthy.", "🥛"),
  q("Which is a right that all children have?", "the right to have a name", ["the right to a big house", "the right to new shoes each week", "the right to a video game"], "Every child has the right to a name and to belong to a country.", "🏷️"),
  q("Which is a responsibility that goes with the right to learn?", "listening and trying your best at school", ["staying home every day", "talking during lessons", "hiding your homework"], "Rights come with responsibilities.", "📚"),
  q("Which is a responsibility that goes with the right to be safe?", "treating others safely and kindly too", ["pushing in line", "teasing others", "running in the hallway"], "We help keep each other safe.", "🤝"),
  q("A want is different from a right because a want is…", "something nice to have but not needed", ["something every child needs", "always free", "a kind of law"], "A new toy is a want; being safe is a right.", "🎁"),
  q("Why is it important to hear from children when decisions are made about them?", "children know what they need and have good ideas", ["children never have ideas", "adults always know everything", "it is against the rules"], "Children have the right to be heard.", "🙋"),
  q("Your class makes rules together at the start of the year. Why is that a good idea?", "everyone understands the rules and agrees to them", ["the rules can then be ignored", "so there are no rules", "so only one person decides"], "People follow rules better when they help make them.", "📋"),
  hq("Why might people in a small town and a big city make decisions in different ways?", "communities have different sizes, needs and leaders", ["every community must use the same rules", "big cities have no leaders", "small towns never decide anything"], "Compare how decisions are made in different places.", "🏙️"),
  hq("Why can disagreements be part of working together?", "people have different ideas, and talking them through can lead to better plans", ["disagreements always mean someone is bad", "good friends never disagree", "people should never share ideas"], "Disagreements can help when we solve them respectfully.", "💡"),
  hq("Some children around the world cannot go to school. Which right is not being met?", "the right to education", ["the right to play video games", "the right to vote", "the right to a car"], "The right to education is in the Convention on the Rights of the Child.", "🌍"),
  hq("A community wants to build a new road through a park. Why should the council listen to many people first?", "the decision affects different people in different ways", ["only one person uses a park", "listening is against the law", "roads never affect anyone"], "Good decisions consider many points of view.", "🛣️"),
  hq("Which is the best example of a peaceful way to settle a disagreement between two communities?", "leaders meet, listen to each other and make an agreement", ["they stop speaking forever", "one community takes what it wants", "they ignore the problem"], "Talking and agreeing helps communities live in peace.", "🕊️"),
  hq("Why do many countries sign agreements about children's rights?", "to promise to protect children everywhere", ["to choose a world sport", "to sell more toys", "to make children work"], "An agreement shows that countries share a goal.", "🤝"),
];

// ---------- Technology and connected communities ----------

const MADE_SORT: SortSet = {
  prompt: "Is it a technology that people made, or something from nature? Tap an item, then tap its basket.",
  hint: "Technology is a tool or invention people make to solve a problem. Nature is not made by people.",
  bins: [
    { id: "tech", label: "made by people", emoji: "🔧" },
    { id: "nature", label: "from nature", emoji: "🌿" },
  ],
  items: [
    { label: "bicycle", emoji: "🚲" },
    { label: "telephone", emoji: "☎️" },
    { label: "bridge", emoji: "🌉" },
    { label: "tractor", emoji: "🚜" },
    { label: "river", emoji: "🏞️" },
    { label: "tree", emoji: "🌳" },
    { label: "rock", emoji: "🪨" },
    { label: "rain", emoji: "🌧️" },
  ].map((it, i) => ({ ...it, bin: i < 4 ? "tech" : "nature" })),
};

const TALK_ORDER = order("Put these ways of talking to someone far away in order, from oldest to newest.", "Telephones came first, then radio and television, and smartphones are the newest.", [
  ["telephone", "☎️"],
  ["radio", "📻"],
  ["television", "📺"],
  ["smartphone", "📱"],
]);

const TECH: Item[] = [
  q("What is technology?", "tools and inventions people make to solve problems", ["only computers", "plants and animals", "the weather"], "A pencil, a wheel and a computer are all technologies.", "🔧"),
  q("Long ago, how did most people send a message to someone far away?", "they wrote a letter", ["they sent an email", "they used a video call", "they sent a text"], "Letters could take days or weeks to arrive.", "✉️"),
  q("How do many people send a quick message to someone far away today?", "by email, text or video call", ["by carrier pigeon only", "by shouting", "by smoke from a chimney"], "New technology makes sending messages fast.", "📱"),
  q("How did refrigerators change daily life?", "food stays fresh longer", ["food goes bad faster", "people cook outside", "food gets hotter"], "Before refrigerators, people kept food cold with ice or in cool cellars.", "🧊"),
  q("How did tractors change farming?", "farmers can work much more land with fewer people", ["farmers need more horses", "crops grow without seeds", "farms got smaller and slower"], "Long ago, many farms used horses or oxen to pull ploughs.", "🚜"),
  q("Which technology helps people travel long distances quickly?", "an airplane", ["a shovel", "a pencil", "a wheelbarrow"], "Airplanes can cross an ocean in hours.", "✈️"),
  q("Which technology helps people stay warm in a cold prairie winter?", "a furnace", ["a fan", "a sprinkler", "a sun hat"], "Furnaces heat homes when it is very cold outside.", "🔥"),
  q("How does the internet connect communities around the world?", "people can share information and talk quickly", ["it stops people from talking", "it only works in one town", "it carries food"], "Information can travel around the world in seconds.", "🌐"),
  q("What is one problem that technology can cause?", "too much screen time and electronic waste", ["better health for everyone", "no problems at all", "fewer inventions"], "Every technology has good and not-so-good effects.", "🗑️"),
  q("Old phones and computers that are thrown away are called…", "electronic waste (e-waste)", ["compost", "fresh food", "rainwater"], "E-waste should be recycled safely.", "♻️"),
  q("Long ago, children in many places walked or rode a horse to school. How do many children get to school today?", "by bus, car, bicycle or walking", ["by airplane", "by submarine", "by rocket"], "Transportation technology has changed how we travel.", "🚌"),
  q("Which technology helps farmers know when it will rain?", "weather forecasts from satellites and radar", ["a calendar", "a paintbrush", "a map of the moon"], "Forecasts help farmers plan planting and harvest.", "🛰️"),
  q("What does it mean that communities are interdependent?", "they depend on each other for things they need", ["they never trade", "they live alone", "they make everything themselves"], "No community makes everything it needs.", "🤝"),
  q("Saskatchewan farmers grow a lot of wheat. What often happens to it?", "it is sold to people in Canada and other countries", ["it is thrown away", "it stays on the farm forever", "it is turned into rocks"], "Selling and buying connects communities around the world.", "🌾"),
  q("Bananas don't grow in Canada's climate. How do Canadians get bananas?", "they are brought from countries with warm climates", ["they grow in Saskatchewan fields", "they fall from the sky", "they are made in factories from wheat"], "Communities trade for things they cannot grow.", "🍌"),
  q("A flood damages a town. Nearby communities send food and volunteers. This shows…", "communities helping each other", ["communities ignoring each other", "a new technology", "a type of weather"], "Communities often help each other in hard times.", "🆘"),
  q("Which job connects communities by moving goods?", "truck driver", ["librarian", "dentist", "lifeguard"], "Trucks, trains and ships carry goods between communities.", "🚚"),
  q("How do trains help prairie communities?", "they carry grain and goods to faraway places", ["they grow crops", "they make rain", "they teach school"], "Railways link farms to ports and cities.", "🚂"),
  q("Which is a technology that helps people who live far from a doctor?", "a video appointment over the internet", ["a paper boat", "a skipping rope", "a kite"], "Some people can talk to a doctor using a screen.", "🩺"),
  q("Long ago, people lit their homes at night with…", "candles and oil lamps", ["light bulbs", "phone screens", "solar lights"], "Electric lights came later.", "🕯️"),
  q("What is one way a washing machine changed daily life?", "washing clothes takes much less time and work", ["clothes get dirtier", "people stopped wearing clothes", "laundry takes longer"], "Before washing machines, people scrubbed clothes by hand.", "🧺"),
  q("Which technology lets a community talk with a class in another country?", "a video call", ["a stapler", "a broom", "a lunch box"], "Video calls let people see and hear each other far away.", "💻"),
  q("Your town gets its clothes, phones and toys from many places. This means it…", "depends on other communities", ["makes everything itself", "never trades", "has no stores"], "Most things we use come from many places.", "🛍️"),
  hq("Why might a new technology help one group but cause problems for another?", "it can make some jobs easier while other jobs are no longer needed", ["technology always helps everyone the same way", "technology never changes jobs", "only adults use technology"], "Think about who benefits and who might not.", "⚖️"),
  hq("How did the telephone change how communities work together?", "people could talk right away instead of waiting for letters", ["people stopped talking", "letters became faster than phones", "it only worked inside one house"], "Faster communication helps people plan and help each other.", "☎️"),
  hq("A storm knocks out the power in a town. Why does this show how much people depend on technology?", "lights, heat, phones and fridges may stop working", ["nothing changes at all", "people get more sunlight", "food stays cold forever"], "Many daily tasks need electricity.", "🔌"),
  hq("Why are communities around the world more connected today than 100 years ago?", "faster travel and communication technology", ["there are fewer people", "the oceans are smaller", "nobody trades any more"], "Planes, ships and the internet link the world.", "🌍"),
  hq("A community grows more food than it needs and trades it for things it can't make. This is an example of…", "interdependence through trade", ["living without any help", "a natural disaster", "a new law"], "Trade helps both communities get what they need.", "🔄"),
  hq("Which question is most helpful when deciding whether a new technology is good for a community?", "Who will it help, and what problems might it cause?", ["What colour is it?", "Is it the newest one?", "Does it make a loud noise?"], "Thinking about effects helps people make wise choices.", "🤔"),
  hq("How can people reduce the harm that technology does to the environment?", "repair, reuse and recycle devices", ["throw devices in the trash", "buy a new phone every month", "leave screens on all night"], "Using things longer means less waste.", "♻️"),
];

export const units: Unit[] = [
  {
    id: "sk-decisions-rights-3",
    title: "Decisions, Conflicts & Rights",
    emoji: "🤝",
    blurb: "How communities decide and children's rights",
    standards: { "ca-sk": sk("PA3.1–PA3.3", "how decisions are made in communities, peaceful ways to solve conflicts, and documents that protect the rights of children") },
    parentNote: "How decisions are made in towns, rural municipalities and First Nations communities, voting and consensus, peaceful ways to work through disagreements, and children's rights and responsibilities.",
    generate: bankUnit(RIGHTS, { sorts: [CONFLICT_SORT] }),
  },
  {
    id: "sk-technology-3",
    title: "Technology & Connected Communities",
    emoji: "📱",
    blurb: "How inventions change life and link communities",
    standards: { "ca-sk": sk("RW3.3, IN3.3", "how technologies have changed daily life, and how communities depend on each other") },
    parentNote: "How inventions such as the telephone, refrigerator and tractor changed daily life, good and not-so-good effects of technology, and how trade and helping link communities.",
    generate: bankUnit(TECH, { sorts: [MADE_SORT], orders: [TALK_ORDER] }),
  },
];
