import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "spanish/cuerpo": lesson(
    ["« la cabeza » is the head, « la mano » the hand and « el pie » the foot.", "« los ojos » are the eyes, « la boca » the mouth and « la nariz » the nose.", "We see with « los ojos » and hear with « las orejas »."],
    "What do we use « las orejas » for?",
    ["« las orejas » are the ears.", "We use our ears to hear."],
    "to hear",
  ),
  "spanish/escuela": lesson(
    ["« el lápiz » is a pencil, « el libro » a book and « la mochila » a backpack.", "Your teacher may say « ¡Escuchen! » (listen), « ¡Levántense! » (stand up) or « ¡Siéntense! » (sit down).", "« la regla » is a ruler and « las tijeras » are scissors."],
    "What does « ¡Escuchen! » mean?",
    ["« escuchar » is to listen.", "The teacher is asking the class to listen."],
    "Listen!",
  ),
  "spanish/dias-y-meses": lesson(
    ["The week starts on Monday: « lunes, martes, miércoles, jueves, viernes, sábado, domingo ».", "The months start with « enero » (January), « febrero » and « marzo ».", "Days and months start with a small letter in Spanish: « lunes », « julio »."],
    "What day comes after « martes »?",
    ["« lunes, martes, miércoles… »", "After Tuesday comes Wednesday: « miércoles »."],
    "miércoles",
  ),
  "spanish/tiempo": lesson(
    ["Ask about the weather with « ¿Qué tiempo hace? »", "« Hace sol » is sunny, « Hace frío » is cold and « Hace calor » is hot.", "« Llueve » means it rains and « Nieva » means it snows."],
    "How do you say “It's cold”?",
    ["Weather often uses « Hace ».", "« frío » means cold."],
    "Hace frío.",
  ),
  "spanish/ropa": lesson(
    ["« la camiseta » is a T-shirt, « los pantalones » are pants and « los zapatos » are shoes.", "« el abrigo » is a coat, « los guantes » are gloves and « la bufanda » a scarf.", "When « Hace frío », wear « el abrigo ». When « Hace calor », wear « los pantalones cortos »."],
    "It's snowing. What do you wear?",
    ["Snow means cold.", "A coat keeps you warm: « el abrigo »."],
    "el abrigo",
  ),
};
