import type { Story, StoryMood, StoryPage, StoryQuiz } from "./types";

// Spanish stories for children learning Spanish (Grades 3 to 9, the opt-in `spanish` subject): original, short,
// read along in a Spanish voice, each page with its English one tap away ("Show English"). Latin American Spanish
// ("ustedes", never "vosotros"), region-neutral so every province and state can read them. The questions after each
// story are in English, so a beginner is tested on understanding, not on reading the question.
//
// Two tiers, like the English library: "45" is Novice Low to Mid (present tense, one or two short sentences a page,
// words from the first Spanish units) and "89" is Novice High to Intermediate Low (past tense and "ir a", longer
// sentences). Their own file is a separate download (`loadStories(true)`), so nobody else carries it. Free plan: the
// first two stories of each tier stay open, as in the English library.

const p = (text: string, en: string, art: string, critter?: string, mood?: StoryMood): StoryPage => (critter ? { text, en, art, critter: { id: critter, mood } } : { text, en, art });
const ask = (q: string, a: string, wrong: string[], page: number): StoryQuiz => ({ q, a, wrong, page });

export const SPANISH_STORIES: Story[] = [
  // ---- Tier 45: first sentences ----
  {
    id: "es-luna-gato",
    title: "Luna y el gato",
    cover: "🐱",
    tier: "45",
    lang: "es",
    pages: [
      p("Me llamo Luna. Tengo un gato.", "My name is Luna. I have a cat.", "👧🐱", "ruby", "happy"),
      p("El gato se llama Pelusa. Pelusa es negro.", "The cat is named Pelusa. Pelusa is black.", "🐈‍⬛", "ruby", "happy"),
      p("Pelusa tiene hambre. Quiere leche.", "Pelusa is hungry. He wants milk.", "🥛🐱", "ruby", "think"),
      p("Luna dice: ¡Aquí tienes! Pelusa bebe la leche.", "Luna says: Here you go! Pelusa drinks the milk.", "🥛😋", "ruby", "cheer"),
      p("Pelusa está feliz. Dice: ¡Miau!", "Pelusa is happy. He says: Meow!", "🐱💛", "ruby", "cheer"),
      p("Luna también está feliz. Buenas noches, Pelusa.", "Luna is happy too. Good night, Pelusa.", "🌙😴", "ruby", "sleepy"),
    ],
    quiz: [
      ask("What is the cat's name?", "Pelusa", ["Luna", "Miau"], 2),
      ask("What does Pelusa want?", "Milk", ["A toy", "A bone"], 3),
      ask("What does Luna say to Pelusa at the end?", "Good night", ["Good morning", "Thank you"], 6),
    ],
  },
  {
    id: "es-mercado",
    title: "En el mercado",
    cover: "🍎",
    tier: "45",
    lang: "es",
    pages: [
      p("Hoy voy al mercado con mi abuela.", "Today I go to the market with my grandmother.", "🧺👵", "juniper", "happy"),
      p("Compramos tres manzanas rojas.", "We buy three red apples.", "🍎🍎🍎", "juniper", "happy"),
      p("También compramos dos naranjas y un melón.", "We also buy two oranges and a melon.", "🍊🍊🍈", "juniper", "cheer"),
      p("Mi abuela dice: ¿Quieres un plátano?", "My grandmother says: Do you want a banana?", "🍌❓", "juniper", "think"),
      p("Sí, por favor. Me gustan los plátanos.", "Yes, please. I like bananas.", "🍌😋", "juniper", "cheer"),
      p("Gracias, abuela. ¡Qué día tan bonito!", "Thank you, grandma. What a beautiful day!", "☀️💛", "juniper", "wave"),
    ],
    quiz: [
      ask("Who goes to the market with the narrator?", "Their grandmother", ["A friend", "Their teacher"], 1),
      ask("How many apples do they buy?", "Three", ["Two", "Five"], 2),
      ask("Which fruit does the narrator like?", "Bananas", ["Melons", "Oranges"], 5),
    ],
  },
  {
    id: "es-nino-nuevo",
    title: "El niño nuevo",
    cover: "🎒",
    tier: "45",
    lang: "es",
    pages: [
      p("Es lunes. Voy a la escuela con mi mochila.", "It is Monday. I go to school with my backpack.", "🎒🏫", "hoot", "happy"),
      p("Hay un niño nuevo en la clase. Se llama Mateo.", "There is a new boy in the class. His name is Mateo.", "🧒📚", "hoot", "think"),
      p("Mateo no habla mucho. Está un poco triste.", "Mateo does not talk much. He is a little sad.", "😔", "hoot", "oops"),
      p("Yo digo: Hola, Mateo. ¿Quieres jugar?", "I say: Hi, Mateo. Do you want to play?", "👋🙂", "hoot", "wave"),
      p("Mateo sonríe. Jugamos con la pelota.", "Mateo smiles. We play with the ball.", "⚽😄", "hoot", "cheer"),
      p("Ahora Mateo es mi amigo.", "Now Mateo is my friend.", "🤝💛", "hoot", "cheer"),
    ],
    quiz: [
      ask("Who is new in the class?", "Mateo", ["Luna", "The teacher"], 2),
      ask("How does Mateo feel at first?", "A little sad", ["Angry", "Sleepy"], 3),
      ask("What do the children play with?", "A ball", ["Cards", "A kite"], 5),
    ],
  },

  // ---- Tier 89: past tense and ir a ----
  {
    id: "es-dia-lluvia",
    title: "Un día de lluvia",
    cover: "☔",
    tier: "89",
    lang: "es",
    pages: [
      p("Ayer llovió todo el día, así que nos quedamos en casa.", "Yesterday it rained all day, so we stayed home.", "🌧️🏠", "bolt", "sleepy"),
      p("Mi hermano quería jugar afuera, pero mi mamá dijo que no.", "My brother wanted to play outside, but my mom said no.", "🧒🌧️", "bolt", "oops"),
      p("Entonces decidimos construir un fuerte con sábanas y sillas.", "So we decided to build a fort with sheets and chairs.", "🛏️🪑⛺", "bolt", "think"),
      p("Leímos cuentos adentro del fuerte y comimos palomitas.", "We read stories inside the fort and ate popcorn.", "📖🍿", "bolt", "happy"),
      p("Cuando salió el sol, ya no queríamos salir. ¡Estábamos muy cómodos!", "When the sun came out, we no longer wanted to go out. We were very comfortable!", "☀️😌", "bolt", "cheer"),
      p("Mañana vamos a construir un fuerte todavía más grande.", "Tomorrow we are going to build an even bigger fort.", "⛺✨", "bolt", "cheer"),
    ],
    quiz: [
      ask("Why did the family stay home?", "It rained all day", ["Mom was sick", "They had homework"], 1),
      ask("What did the children build?", "A fort", ["A boat", "A kite"], 3),
      ask("What are they going to do tomorrow?", "Build a bigger fort", ["Go to the park", "Bake bread"], 6),
    ],
  },
  {
    id: "es-bicicleta",
    title: "La bicicleta nueva",
    cover: "🚲",
    tier: "89",
    lang: "es",
    pages: [
      p("Por mi cumpleaños, mis abuelos me regalaron una bicicleta azul.", "For my birthday, my grandparents gave me a blue bicycle.", "🎂🚲", "ollie", "cheer"),
      p("Yo no sabía montar en bicicleta, así que tenía un poco de miedo.", "I did not know how to ride a bike, so I was a little scared.", "😟🚲", "ollie", "oops"),
      p("Mi prima Camila me enseñó. Me dijo: Respira y mira hacia adelante.", "My cousin Camila taught me. She told me: Breathe and look ahead.", "👧🚲", "ollie", "think"),
      p("Me caí dos veces, pero me levanté y lo intenté otra vez.", "I fell twice, but I got up and tried again.", "🤕💪", "ollie", "oops"),
      p("A la tercera vez, pedaleé hasta el final de la calle.", "The third time, I rode all the way to the end of the street.", "🚲🛣️", "ollie", "cheer"),
      p("Ahora monto todos los días. Mañana vamos a ir al parque.", "Now I ride every day. Tomorrow we are going to go to the park.", "🌳🚲", "ollie", "happy"),
    ],
    quiz: [
      ask("What colour was the bicycle?", "Blue", ["Red", "Green"], 1),
      ask("Who taught the narrator to ride?", "Their cousin Camila", ["Their grandparents", "A teacher"], 3),
      ask("How many times did the narrator fall?", "Two", ["One", "Three"], 4),
    ],
  },
  {
    id: "es-mapa-tesoro",
    title: "El mapa del tesoro",
    cover: "🗺️",
    tier: "89",
    lang: "es",
    pages: [
      p("Un sábado, Sofía y su hermano Diego encontraron un mapa viejo en el desván.", "One Saturday, Sofía and her brother Diego found an old map in the attic.", "🗺️🏠", "ruby", "wave"),
      p("El mapa mostraba un árbol grande, un río y una equis roja.", "The map showed a big tree, a river and a red X.", "🌳❌", "ruby", "think"),
      p("Caminaron por el jardín hasta llegar al árbol más grande.", "They walked through the garden until they got to the biggest tree.", "🚶🌳", "ruby", "happy"),
      p("Allí cavaron un poco y encontraron una caja de madera.", "There they dug a little and found a wooden box.", "⛏️📦", "ruby", "cheer"),
      p("Dentro había cartas, fotos y una moneda antigua de su bisabuelo.", "Inside there were letters, photos and an old coin from their great-grandfather.", "✉️📷🪙", "ruby", "think"),
      p("Sofía dijo: ¡El verdadero tesoro es nuestra familia! Diego sonrió y guardó la caja.", "Sofía said: The real treasure is our family! Diego smiled and put the box away.", "👨‍👩‍👧‍👦💛", "ruby", "cheer"),
    ],
    quiz: [
      ask("Where did the children find the map?", "In the attic", ["In the garden", "At school"], 1),
      ask("What was inside the box?", "Letters, photos and an old coin", ["Gold and jewels", "Books and pens"], 5),
      ask("What did Sofía say the real treasure was?", "Their family", ["The coin", "The map"], 6),
    ],
  },
];
