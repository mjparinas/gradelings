import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "spanish/sonidos": lesson(
    ["The five vowels always sound the same: a (ah), e (eh), i (ee), o (oh), u (oo).", "« h » is silent: « hola » sounds like “ola”. « j » sounds like a breathy h: « jugo ».", "« ñ » sounds like “ny” in canyon: « niño ». « ll » sounds like “y”: « llama ». « rr » is rolled."],
    "Which letter is silent in « hola »?",
    ["Say it: “oh-lah”.", "The first letter makes no sound."],
    "h",
  ),
  "spanish/el-y-la": lesson(
    ["Every noun is masculine (« el », « un ») or feminine (« la », « una »).", "Many nouns ending in « o » are masculine and many ending in « a » are feminine: « el libro », « la casa ».", "For more than one, use « los » or « las » and add « s » or « es »: « los libros », « las flores »."],
    "Which word goes with « casas »: « los » or « las »?",
    ["« casa » ends in « a », so it is feminine.", "Many casas, feminine: « las »."],
    "las",
  ),
  "spanish/gustos": lesson(
    ["« Me gusta » means I like: « Me gusta el chocolate ».", "« No me gusta » means I don't like. Ask a friend with « ¿Te gusta…? »", "For more than one thing, use « gustan »: « Me gustan los perros »."],
    "Pick the word that fits: « Me ___ las manzanas. »",
    ["« las manzanas » is more than one thing.", "More than one takes « gustan »."],
    "gustan",
  ),
  "spanish/sobre-mi": lesson(
    ["Tell your age with « tener »: « Tengo diez años » (I am ten).", "Say where you are from with « Soy de… »: « Soy de México ».", "Tell your birthday with « Mi cumpleaños es el… »: « el cinco de mayo »."],
    "How do you say “I am eleven years old”?",
    ["Age uses « Tengo… años ».", "Eleven is « once »."],
    "Tengo once años.",
  ),
  "spanish/fiestas": lesson(
    ["« ¡Feliz cumpleaños! » means happy birthday. « la fiesta » is a party and « el pastel » a cake.", "In many Spanish-speaking countries, a girl's fifteenth birthday is a big party: « la quinceañera ».", "« el papel picado » is coloured paper cut into patterns and hung to decorate for a celebration."],
    "What does « ¡Feliz cumpleaños! » mean?",
    ["« feliz » means happy.", "« cumpleaños » is a birthday."],
    "Happy birthday!",
  ),
};
