import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "spanish/verbos-ar": lesson(
    ["Take « hablar » (to speak) and drop « ar » to get « habl- ».", "Add the ending for who is speaking: « yo hablo », « tú hablas », « ella habla ».", "« nosotros hablamos », « ellos hablan »."],
    "Pick the right form: « Nosotros ___ (cantar) »",
    ["Drop « ar »: « cant- ».", "« nosotros » takes « -amos »."],
    "cantamos",
  ),
  "spanish/describir": lesson(
    ["What someone is like uses « es »: « Es alta », « Es divertido ».", "Hair and eyes use « tiene »: « Tiene el pelo largo », « Tiene los ojos azules ».", "Glasses and clothes use « lleva »: « Lleva gafas »."],
    "How do you say “He has short hair”?",
    ["Hair uses « tiene ».", "Short hair: « el pelo corto »."],
    "Tiene el pelo corto.",
  ),
  "spanish/comparaciones": lesson(
    ["« más… que » means more… than: « El perro es más grande que el gato ».", "« menos… que » means less… than, and « tan… como » means as… as.", "Some words change: « mejor » (better), « peor » (worse), « mayor » (older), « menor » (younger)."],
    "How do you say “The elephant is bigger than the mouse”?",
    ["Bigger than: « más grande que ».", "« El elefante es más grande que el ratón »."],
    "El elefante es más grande que el ratón.",
  ),
  "spanish/paises": lesson(
    ["Spanish is spoken in Spain and in many countries of the Americas, like México, Colombia and Perú.", "Each country has a capital: Madrid is the capital of España and Lima the capital of Perú.", "Say where people are from with a word that matches: « Él es mexicano », « Ella es mexicana »."],
    "Ana is from Chile. « Ana es… »",
    ["A person from Chile is « chileno » or « chilena ».", "Ana is a girl: « chilena »."],
    "chilena",
  ),
  "spanish/direcciones": lesson(
    ["Ask where a place is with « ¿Dónde está…? »: « ¿Dónde está el banco? »", "« Gira a la derecha » is turn right, « Gira a la izquierda » turn left, « Sigue todo recto » go straight.", "« al lado de » is next to, « enfrente de » across from, « cerca de » near and « lejos de » far from."],
    "What does « Gira a la izquierda » mean?",
    ["« Gira » means turn.", "« izquierda » is left."],
    "Turn left.",
  ),
};
