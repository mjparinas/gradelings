import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "spanish/preguntas": lesson(
    ["A question starts with « ¿ » and ends with « ? »: « ¿Cómo estás? »", "« ¿Qué? » is what, « ¿Quién? » who, « ¿Dónde? » where and « ¿Cuándo? » when.", "« ¿Por qué? » is why; the answer often starts with « Porque… » (because)."],
    "Which question word asks where?",
    ["Where is a place.", "Places are asked with « ¿Dónde? »."],
    "¿Dónde?",
  ),
  "spanish/comida": lesson(
    ["« Tengo hambre » means I'm hungry and « Tengo sed » means I'm thirsty.", "The meals are « el desayuno » (breakfast), « el almuerzo » (lunch) and « la cena » (dinner).", "Ask politely with « Quisiera…, por favor » (I would like…, please)."],
    "What is « el desayuno »?",
    ["It is the first meal of the day.", "Breakfast."],
    "breakfast",
  ),
  "spanish/pasatiempos": lesson(
    ["After « Me gusta » use a verb as it is: « Me gusta nadar » (I like to swim).", "« leer » is to read, « dibujar » to draw, « jugar » to play and « bailar » to dance.", "« En mi tiempo libre… » means in my free time."],
    "How do you say “I like to draw”?",
    ["I like: « Me gusta ».", "To draw: « dibujar »."],
    "Me gusta dibujar.",
  ),
  "spanish/emociones": lesson(
    ["Feelings use « estar »: « Estoy feliz », « Estoy triste », « Estoy cansado ».", "Some feelings use « tener »: « Tengo frío », « Tengo calor », « Tengo miedo » (I'm scared).", "Say what hurts with « Me duele… »: « Me duele la cabeza »."],
    "How do you say “I'm scared”?",
    ["Being scared uses « tener ».", "Scared is « miedo »."],
    "Tengo miedo.",
  ),
  "spanish/personas": lesson(
    ["Describe what someone is like with « ser »: « Es simpático » (He is nice).", "Describing words match the person: « alto » for a boy, « alta » for a girl.", "For more than one, add « s »: « altos », « altas »."],
    "Pick the word that fits: « Mis hermanas son ___. » (tall)",
    ["« hermanas » are girls, more than one.", "Feminine and plural: « altas »."],
    "altas",
  ),
};
