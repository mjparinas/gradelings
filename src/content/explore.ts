import { hashSeed, shuffle, withSeed } from "./random";
import type { AgeBand } from "./types";

// Explore cards: short, original "did you know" cards for science and our world (social studies), with one
// quick question each. Eight cards for each of the three age bands (four science, four world).
// Region-free (no curriculum, place, money or holiday), so one library serves every province and state, and
// free of spelling that differs between Canada and the US. Nothing here is scored or saved: a card is for
// curiosity, not practice.

export type ExploreTopic = "science" | "world";

export interface ExploreCard {
  id: string;
  band: AgeBand;
  topic: ExploreTopic;
  title: string;
  emoji: string;
  /** Three short facts, read one after another. */
  facts: [string, string, string];
  /** The quick question: the right answer, two clear misses, and why. */
  ask: { prompt: string; right: string; wrong: [string, string]; why: string };
}

export const TOPIC_NAME: Record<ExploreTopic, { name: string; emoji: string }> = {
  science: { name: "Science", emoji: "🔬" },
  world: { name: "Our world", emoji: "🌍" },
};

export const EXPLORE_CARDS: ExploreCard[] = [
  // ——— Pre-K to Grade 1 ———
  {
    id: "busy-bees",
    band: "little",
    topic: "science",
    title: "Busy bees",
    emoji: "🐝",
    facts: ["Bees visit flowers to drink sweet nectar.", "Bees carry pollen from flower to flower.", "Pollen helps plants make new seeds."],
    ask: { prompt: "What do bees drink from flowers?", right: "Sweet nectar", wrong: ["Sand", "Snow"], why: "Bees sip sweet nectar from flowers." },
  },
  {
    id: "rain-clouds",
    band: "little",
    topic: "science",
    title: "Rain clouds",
    emoji: "☁️",
    facts: ["Clouds are made of tiny drops of water.", "When the drops get big and heavy, they fall.", "Rain fills puddles and helps plants grow."],
    ask: { prompt: "What falls from a cloud when the drops get heavy?", right: "Rain", wrong: ["Rocks", "Leaves"], why: "Heavy water drops fall as rain." },
  },
  {
    id: "little-seeds",
    band: "little",
    topic: "science",
    title: "Little seeds",
    emoji: "🌱",
    facts: ["A seed has a tiny plant inside.", "With water and warmth, the seed starts to grow.", "Roots grow down and a shoot grows up."],
    ask: { prompt: "What helps a seed start to grow?", right: "Water and warmth", wrong: ["A loud noise", "A tight box"], why: "Seeds wake up and grow with water and warmth." },
  },
  {
    id: "five-senses",
    band: "little",
    topic: "science",
    title: "Our five senses",
    emoji: "👀",
    facts: ["We see with our eyes and hear with our ears.", "We smell with our nose and taste with our tongue.", "We feel things with our skin."],
    ask: { prompt: "What do we use to hear?", right: "Our ears", wrong: ["Our eyes", "Our nose"], why: "We hear with our ears." },
  },
  {
    id: "helpers",
    band: "little",
    topic: "world",
    title: "Helpers near us",
    emoji: "🧑‍🚒",
    facts: ["Firefighters put out fires and keep us safe.", "Doctors and nurses help people feel better.", "Bus drivers help people get where they are going."],
    ask: { prompt: "Who helps people feel better when they are sick?", right: "A doctor", wrong: ["A bus driver", "A baker"], why: "Doctors and nurses help sick people feel better." },
  },
  {
    id: "all-kinds-of-families",
    band: "little",
    topic: "world",
    title: "All kinds of families",
    emoji: "👨‍👩‍👧",
    facts: ["Families come in many shapes and sizes.", "Families care for each other.", "Some families live together and some live apart."],
    ask: { prompt: "Which is true about families?", right: "They come in many shapes and sizes", wrong: ["They all look the same", "Only big ones count"], why: "Every family is different, and they all matter." },
  },
  {
    id: "maps-help",
    band: "little",
    topic: "world",
    title: "Maps",
    emoji: "🗺️",
    facts: ["A map is a picture of a place from above.", "Maps use small pictures called symbols.", "A map helps us find our way."],
    ask: { prompt: "What does a map help us do?", right: "Find our way", wrong: ["Bake a cake", "Plant a seed"], why: "A map shows where things are, so we can find our way." },
  },
  {
    id: "rules-keep-us-safe",
    band: "little",
    topic: "world",
    title: "Why we have rules",
    emoji: "🚦",
    facts: ["Rules help keep us safe.", "A red light says stop and a green light says go.", "Rules help us share and take turns."],
    ask: { prompt: "What does a green traffic light say?", right: "Go", wrong: ["Stop", "Sleep"], why: "Green means go. Red means stop." },
  },

  // ——— Grades 2 to 4 ———
  {
    id: "butterfly-life",
    band: "middle",
    topic: "science",
    title: "A butterfly's life",
    emoji: "🦋",
    facts: ["A butterfly starts as a tiny egg.", "The egg hatches into a caterpillar that eats and grows.", "The caterpillar becomes a chrysalis, then a butterfly."],
    ask: { prompt: "What does a caterpillar turn into inside its chrysalis?", right: "A butterfly", wrong: ["A beetle", "A frog"], why: "A caterpillar changes inside the chrysalis and comes out as a butterfly." },
  },
  {
    id: "magnet-poles",
    band: "middle",
    topic: "science",
    title: "Magnets and poles",
    emoji: "🧲",
    facts: ["Magnets pull on some metals, like iron.", "Every magnet has two ends called poles.", "Opposite poles pull together and the same poles push apart."],
    ask: { prompt: "What happens when two of the same poles meet?", right: "They push apart", wrong: ["They pull together", "They turn into glass"], why: "Same poles push apart. Opposite poles pull together." },
  },
  {
    id: "water-forms",
    band: "middle",
    topic: "science",
    title: "Three forms of water",
    emoji: "💧",
    facts: ["Water can be a liquid, a solid (ice) or a gas.", "Heat melts ice into liquid water.", "Cold freezes liquid water into ice."],
    ask: { prompt: "What does heat do to ice?", right: "It melts the ice", wrong: ["It makes the ice harder", "It turns the ice into sand"], why: "Heat melts ice into liquid water." },
  },
  {
    id: "long-shadows",
    band: "middle",
    topic: "science",
    title: "Shadows",
    emoji: "🌤️",
    facts: ["A shadow forms when something blocks light.", "The sun moves across the sky during the day.", "Shadows are longest when the sun is low in the sky."],
    ask: { prompt: "When are shadows the longest?", right: "Early morning or evening", wrong: ["Right in the middle of the day", "They never change"], why: "When the sun is low, shadows stretch out long." },
  },
  {
    id: "landforms",
    band: "middle",
    topic: "world",
    title: "Landforms",
    emoji: "⛰️",
    facts: ["Mountains are very high, steep land.", "A valley is low land between hills or mountains.", "Rivers flow downhill, often to a lake or the sea."],
    ask: { prompt: "What is a valley?", right: "Low land between hills or mountains", wrong: ["A very tall mountain", "A body of salty water"], why: "A valley is the low land between hills or mountains." },
  },
  {
    id: "needs-and-wants",
    band: "middle",
    topic: "world",
    title: "Needs and wants",
    emoji: "🍎",
    facts: ["Needs are things people must have, like food, water and shelter.", "Wants are things that are nice to have.", "We can live without wants, but not without needs."],
    ask: { prompt: "Which of these is a need?", right: "Clean water", wrong: ["A video game", "A toy robot"], why: "People need water to live. A game or a toy is a want." },
  },
  {
    id: "timelines",
    band: "middle",
    topic: "world",
    title: "Timelines",
    emoji: "⏳",
    facts: ["A timeline puts events in the order they happened.", "The earliest event goes first, on the left.", "Timelines help us see what happened before and after."],
    ask: { prompt: "On a timeline, which event goes first?", right: "The one that happened earliest", wrong: ["The newest one", "The biggest one"], why: "A timeline starts with the event that happened first." },
  },
  {
    id: "goods-and-services",
    band: "middle",
    topic: "world",
    title: "Goods and services",
    emoji: "🏭",
    facts: ["Goods are things people make, like bread or chairs.", "Services are jobs where someone helps you, like a haircut.", "Most communities need both."],
    ask: { prompt: "Which of these is a service?", right: "A haircut", wrong: ["A loaf of bread", "A chair"], why: "A haircut is a person helping you, so it is a service." },
  },

  // ——— Grades 5 to 9 ———
  {
    id: "photosynthesis",
    band: "big",
    topic: "science",
    title: "How plants make food",
    emoji: "🌿",
    facts: ["Plants use sunlight, water and carbon dioxide to make sugar.", "This is called photosynthesis, and it releases oxygen.", "Chlorophyll in leaves catches the light and makes them green."],
    ask: { prompt: "Which gas do plants release during photosynthesis?", right: "Oxygen", wrong: ["Carbon dioxide", "Helium"], why: "Plants take in carbon dioxide and release oxygen." },
  },
  {
    id: "moving-plates",
    band: "big",
    topic: "science",
    title: "Moving plates",
    emoji: "🌋",
    facts: ["Earth's outer shell is broken into huge slabs called plates.", "The plates move very slowly, about as fast as your fingernails grow.", "Most earthquakes and volcanoes happen near the edges of plates."],
    ask: { prompt: "Where do most earthquakes happen?", right: "Near the edges of plates", wrong: ["Only on mountaintops", "Only in deserts"], why: "Plates push, pull and slide past each other at their edges." },
  },
  {
    id: "cells",
    band: "big",
    topic: "science",
    title: "Cells",
    emoji: "🔬",
    facts: ["Cells are the building blocks of living things.", "Most cells are too small to see without a microscope.", "A human body is made of trillions of cells."],
    ask: { prompt: "What do you need to see most cells?", right: "A microscope", wrong: ["A ruler", "A compass"], why: "Most cells are far too small to see with just your eyes." },
  },
  {
    id: "energy-changes",
    band: "big",
    topic: "science",
    title: "Energy changes form",
    emoji: "⚡",
    facts: ["Energy is not made or used up. It changes form.", "A lamp changes electrical energy into light and heat.", "Your body changes the energy in food into movement and warmth."],
    ask: { prompt: "What happens to energy when a lamp is on?", right: "It changes into light and heat", wrong: ["It disappears", "It is created from nothing"], why: "Energy is never lost. It changes into other forms." },
  },
  {
    id: "voting",
    band: "big",
    topic: "world",
    title: "Having a say",
    emoji: "🗳️",
    facts: ["In a democracy, citizens help choose their leaders.", "They do this by voting in an election.", "Citizens also have responsibilities, like following the laws."],
    ask: { prompt: "How do citizens in a democracy choose their leaders?", right: "By voting in an election", wrong: ["By flipping a coin", "By racing each other"], why: "Citizens vote, and the votes decide who leads." },
  },
  {
    id: "trade",
    band: "big",
    topic: "world",
    title: "Why people trade",
    emoji: "🚢",
    facts: ["No place has or makes everything people want.", "So people trade goods with each other.", "Goods travel by ship, train, truck and plane."],
    ask: { prompt: "Why do people trade?", right: "No one place makes everything", wrong: ["Because trucks are fast", "Because shops are big"], why: "Trade lets people get what they cannot make or grow themselves." },
  },
  {
    id: "primary-sources",
    band: "big",
    topic: "world",
    title: "Clues from the past",
    emoji: "📜",
    facts: ["A primary source comes from the time being studied, like a diary or a letter.", "A secondary source is written later, like a textbook.", "Historians compare many sources to see what happened."],
    ask: { prompt: "Which of these is a primary source?", right: "A diary written at the time", wrong: ["A textbook written years later", "A movie made recently"], why: "A diary was written by someone who lived through the events." },
  },
  {
    id: "weather-and-climate",
    band: "big",
    topic: "world",
    title: "Weather and climate",
    emoji: "🌦️",
    facts: ["Weather is what the air is doing today.", "Climate is the usual pattern of weather over many years.", "Climate helps decide which plants grow and how people live."],
    ask: { prompt: "Which one describes climate?", right: "Winters here are usually cold", wrong: ["It is raining right now", "I need an umbrella today"], why: "Climate is the long-term pattern. Today's rain is weather." },
  },

  // ——— More for Pre-K to Grade 1 ———
  {
    id: "sink-or-float", band: "little", topic: "science", title: "Sink or float?", emoji: "🛁",
    facts: ["Some things sink in water.", "Some things float on top.", "A rock sinks. A leaf can float."],
    ask: { prompt: "What does a rock do in water?", right: "It sinks", wrong: ["It floats away", "It flies"], why: "A rock sinks. A leaf can float." },
  },
  {
    id: "day-and-night", band: "little", topic: "science", title: "Day and night", emoji: "🌙",
    facts: ["The Earth spins around slowly.", "The side facing the Sun has daytime.", "The side facing away has night."],
    ask: { prompt: "When do we have night?", right: "When our side faces away", wrong: ["When our side faces the Sun", "When it is cloudy"], why: "Night comes when our side of Earth faces away from the Sun." },
  },
  {
    id: "baby-animals", band: "little", topic: "science", title: "Baby animals", emoji: "🐶",
    facts: ["A baby cat is called a kitten.", "A baby dog is called a puppy.", "A baby frog is called a tadpole."],
    ask: { prompt: "What is a baby dog called?", right: "A puppy", wrong: ["A kitten", "A tadpole"], why: "A baby dog is a puppy." },
  },
  {
    id: "animal-homes", band: "little", topic: "science", title: "Animal homes", emoji: "🪺",
    facts: ["A bird lives in a nest.", "A bee lives in a hive.", "A bear sleeps in a den."],
    ask: { prompt: "What do we call a bird's home?", right: "A nest", wrong: ["A hive", "A pond"], why: "A bird's home is a nest." },
  },
  {
    id: "places-in-community", band: "little", topic: "world", title: "Places we go", emoji: "🏫",
    facts: ["A library lends books to read.", "A park is a place to play.", "A store sells things we need."],
    ask: { prompt: "Where can you borrow a book?", right: "A library", wrong: ["A park", "A bakery"], why: "A library lends books." },
  },
  {
    id: "days-of-the-week", band: "little", topic: "world", title: "Days of the week", emoji: "📆",
    facts: ["A week has seven days.", "Days have names, like Monday and Friday.", "After Saturday comes Sunday."],
    ask: { prompt: "How many days are in a week?", right: "Seven", wrong: ["Three", "Ten"], why: "A week has seven days." },
  },
  {
    id: "being-kind", band: "little", topic: "world", title: "Being kind", emoji: "💛",
    facts: ["Kind words help people feel good.", "Sharing is a way to be kind.", "We can help a friend who is sad."],
    ask: { prompt: "Which one is a kind thing to do?", right: "Share a toy", wrong: ["Take a toy away", "Say mean words"], why: "Sharing is a kind thing to do." },
  },
  {
    id: "homes-for-people", band: "little", topic: "world", title: "Homes for people", emoji: "🏠",
    facts: ["People live in houses and apartments.", "Some homes are tall and some are small.", "A home keeps us safe and warm."],
    ask: { prompt: "What does a home do for us?", right: "Keeps us safe and warm", wrong: ["Makes us fly", "Turns us into birds"], why: "A home keeps us safe and warm." },
  },
  {
    id: "the-moon", band: "little", topic: "science", title: "The Moon", emoji: "🌕",
    facts: ["The Moon looks bright in the night sky.", "Its shape seems to change each night.", "It is a big ball of rock far away."],
    ask: { prompt: "What is the Moon like?", right: "A big ball of rock", wrong: ["A giant cloud", "A tiny light bulb"], why: "The Moon is a big ball of rock far away." },
  },
  {
    id: "warm-and-cold", band: "little", topic: "science", title: "Warm and cold", emoji: "🧣",
    facts: ["The Sun keeps us warm.", "In winter it can be very cold.", "A coat helps us stay warm."],
    ask: { prompt: "What helps keep us warm in winter?", right: "A coat", wrong: ["A swimsuit", "An ice cube"], why: "A coat keeps our body heat in." },
  },
  {
    id: "healthy-habits", band: "little", topic: "science", title: "Healthy habits", emoji: "🍎",
    facts: ["Fruits and vegetables help us grow.", "Water keeps our bodies happy.", "Brushing keeps our teeth healthy."],
    ask: { prompt: "What keeps our bodies happy?", right: "Water", wrong: ["Mud", "Sand"], why: "Our bodies need water every day." },
  },
  {
    id: "how-animals-move", band: "little", topic: "science", title: "How animals move", emoji: "🐟",
    facts: ["Fish swim and birds fly.", "Snakes slide and rabbits hop.", "Animals move in many ways."],
    ask: { prompt: "How does a fish move?", right: "It swims", wrong: ["It hops", "It rolls"], why: "Fish swim with their tails and fins." },
  },
  {
    id: "four-seasons", band: "little", topic: "world", title: "Four seasons", emoji: "🍁",
    facts: ["Many places have four seasons.", "They are spring, summer, fall and winter.", "The weather changes with each season."],
    ask: { prompt: "How many seasons do many places have?", right: "Four", wrong: ["Two", "Nine"], why: "Spring, summer, fall and winter make four." },
  },
  {
    id: "telling-time", band: "little", topic: "world", title: "What time is it?", emoji: "⏰",
    facts: ["A clock tells us the time.", "The short hand shows the hour.", "The long hand shows the minutes."],
    ask: { prompt: "What does a clock tell us?", right: "The time", wrong: ["The weather", "How tall we are"], why: "A clock tells us the time." },
  },
  {
    id: "street-safety", band: "little", topic: "world", title: "Street safety", emoji: "🚦",
    facts: ["Look both ways before you cross.", "Hold a grown-up's hand near cars.", "A crosswalk is a safe place to cross."],
    ask: { prompt: "What should you do before crossing?", right: "Look both ways", wrong: ["Close your eyes", "Run fast"], why: "Looking both ways keeps us safe." },
  },
  {
    id: "our-feelings", band: "little", topic: "world", title: "Our feelings", emoji: "😊",
    facts: ["Everyone has feelings.", "We can feel happy, sad or excited.", "Talking about feelings can help."],
    ask: { prompt: "Who has feelings?", right: "Everyone", wrong: ["Only grown-ups", "Only kids"], why: "Everyone has feelings." },
  },

  // ——— More for Grades 2 to 4 ———
  {
    id: "your-skeleton", band: "middle", topic: "science", title: "Your skeleton", emoji: "🦴",
    facts: ["Bones hold up your body and give it shape.", "Your skull protects your brain.", "Your ribs protect your heart and lungs."],
    ask: { prompt: "What does your skull protect?", right: "Your brain", wrong: ["Your stomach", "Your toes"], why: "The skull is a hard shell around the brain." },
  },
  {
    id: "what-roots-do", band: "middle", topic: "science", title: "What roots do", emoji: "🌿",
    facts: ["Roots hold a plant in the soil.", "Roots soak up water and nutrients.", "The water travels up the stem to the leaves."],
    ask: { prompt: "What do roots take in from the soil?", right: "Water and nutrients", wrong: ["Sunlight", "Wind"], why: "Roots soak up water and nutrients." },
  },
  {
    id: "how-sound-travels", band: "middle", topic: "science", title: "How sound travels", emoji: "🔊",
    facts: ["Sounds are made by things that vibrate.", "Vibrations travel through the air as waves.", "Your ears collect them so you can hear."],
    ask: { prompt: "What makes a sound?", right: "Something vibrating", wrong: ["Something perfectly still", "Something invisible"], why: "Sound comes from vibrations." },
  },
  {
    id: "habitats", band: "middle", topic: "science", title: "Habitats", emoji: "🏞️",
    facts: ["A habitat is where a plant or animal lives.", "It gives food, water and shelter.", "A pond, a forest and a desert are habitats."],
    ask: { prompt: "What does a habitat give an animal?", right: "Food, water and shelter", wrong: ["A school and a bus", "A phone and a map"], why: "A habitat meets an animal's needs: food, water and shelter." },
  },
  {
    id: "natural-resources", band: "middle", topic: "world", title: "Natural resources", emoji: "⛏️",
    facts: ["Natural resources come from nature.", "Water, wood, soil and sunlight are resources.", "We use resources wisely so they last."],
    ask: { prompt: "Which one is a natural resource?", right: "Water", wrong: ["A television", "A school bus"], why: "Water comes from nature. The others are made by people." },
  },
  {
    id: "calendars", band: "middle", topic: "world", title: "Calendars", emoji: "📅",
    facts: ["A year has twelve months.", "Most months have thirty or thirty-one days.", "A calendar helps us plan ahead."],
    ask: { prompt: "How many months are in a year?", right: "Twelve", wrong: ["Ten", "Seven"], why: "A year has twelve months." },
  },
  {
    id: "getting-around", band: "middle", topic: "world", title: "Getting around, then and now", emoji: "🚂",
    facts: ["Long ago, people walked or rode animals.", "Later, trains and ships carried many people.", "Today cars, planes and buses are common."],
    ask: { prompt: "Which way of getting around is the oldest?", right: "Walking", wrong: ["Flying in a plane", "Riding a train"], why: "People have always walked. Trains and planes came much later." },
  },
  {
    id: "libraries", band: "middle", topic: "world", title: "Libraries", emoji: "📚",
    facts: ["A library shares books and more with everyone.", "People borrow books, music and movies.", "Many libraries also have story times."],
    ask: { prompt: "What can you do at a library?", right: "Borrow a book", wrong: ["Plant a tree", "Fix a car"], why: "Libraries lend books to their community." },
  },

  // ——— More for Grades 5 to 9 ———
  {
    id: "atoms", band: "big", topic: "science", title: "Atoms", emoji: "⚛️",
    facts: ["Everything around you is made of tiny atoms.", "Atoms are far too small to see with your eyes.", "Different kinds of atoms are called elements."],
    ask: { prompt: "What are all materials made of?", right: "Atoms", wrong: ["Shadows", "Sound waves"], why: "All matter is made of atoms." },
  },
  {
    id: "inherited-traits", band: "big", topic: "science", title: "Traits from your family", emoji: "🧬",
    facts: ["Traits are features, like eye shape or hair type.", "Many traits are passed down in genes from parents.", "Genes are instructions found in almost every cell."],
    ask: { prompt: "Which trait is inherited?", right: "Eye shape", wrong: ["Knowing how to ride a bike", "A scar from a fall"], why: "Eye shape comes from genes. Skills and scars are not passed down." },
  },
  {
    id: "simple-circuits", band: "big", topic: "science", title: "Simple circuits", emoji: "💡",
    facts: ["A circuit is a path that electricity can follow.", "A bulb lights when the path is a complete loop.", "A switch opens or closes the loop."],
    ask: { prompt: "Why does a bulb go out when a wire in its circuit is cut?", right: "Electricity can't flow around the loop", wrong: ["The battery turns into a magnet", "The bulb grows too heavy"], why: "A cut wire breaks the loop, so the electricity has nowhere to flow." },
  },
  {
    id: "gravity", band: "big", topic: "science", title: "Gravity", emoji: "🍎",
    facts: ["Gravity is a force that pulls objects toward each other.", "Earth's gravity pulls you toward the ground.", "Gravity keeps the Moon moving around Earth."],
    ask: { prompt: "Which force keeps the Moon moving around Earth?", right: "Gravity", wrong: ["Friction", "Magnetism"], why: "Earth's gravity keeps the Moon in its path." },
  },
  {
    id: "rivers-and-early-cities", band: "big", topic: "world", title: "Rivers and early cities", emoji: "🏺",
    facts: ["Many early cities grew beside big rivers.", "Rivers gave water for drinking and for crops.", "Boats on rivers carried food and goods."],
    ask: { prompt: "Why did early cities grow near rivers?", right: "Rivers gave water and ways to travel", wrong: ["Rivers kept the weather cold", "Rivers stopped all floods"], why: "Rivers provided water for crops and routes for boats." },
  },
  {
    id: "latitude-and-longitude", band: "big", topic: "world", title: "Latitude and longitude", emoji: "🧭",
    facts: ["Latitude lines run east to west around the globe.", "Longitude lines run from the North Pole to the South Pole.", "Together they give any place an exact address."],
    ask: { prompt: "Which lines run from pole to pole?", right: "Longitude", wrong: ["Latitude", "The equator"], why: "Longitude lines run from pole to pole. Latitude lines, like the equator, run east to west." },
  },
  {
    id: "rights-for-everyone", band: "big", topic: "world", title: "Rights for everyone", emoji: "🕊️",
    facts: ["Human rights belong to every person.", "They include safety, education and fair treatment.", "In 1948 the United Nations adopted a Universal Declaration of Human Rights."],
    ask: { prompt: "Who do human rights belong to?", right: "Every person", wrong: ["Only adults", "Only people who vote"], why: "Human rights belong to every person." },
  },
  {
    id: "where-energy-comes-from", band: "big", topic: "world", title: "Where our energy comes from", emoji: "⚡",
    facts: ["Fossil fuels took millions of years to form.", "Sunlight, wind and moving water are renewable.", "Renewable energy does not run out when we use it."],
    ask: { prompt: "Which energy source is renewable?", right: "Wind", wrong: ["Coal", "Oil"], why: "Wind keeps blowing. Coal and oil take millions of years to form." },
  },
];

export function exploreCards(band: AgeBand): ExploreCard[] {
  return EXPLORE_CARDS.filter((c) => c.band === band);
}

export function findCard(id: string): ExploreCard | undefined {
  return EXPLORE_CARDS.find((c) => c.id === id);
}

export interface ExploreQuestion {
  prompt: string;
  choices: string[];
  answer: number;
  why: string;
}

/** A card's question, with the choices in an order that depends on the seed. */
export function exploreQuestion(card: ExploreCard, seed: string): ExploreQuestion {
  const { prompt, right, wrong, why } = card.ask;
  const choices = withSeed(hashSeed(`explore:${card.id}:${seed}`), () => shuffle([right, ...wrong]));
  return { prompt, choices, answer: choices.indexOf(right), why };
}
