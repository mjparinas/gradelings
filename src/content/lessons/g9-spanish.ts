import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "spanish/preterito": lesson(
    ["The preterite tells about finished actions: « Ayer hablé con mi abuela » (Yesterday I spoke with my grandma).", "-ar verbs: « hablé, hablaste, habló, hablamos, hablaron ».", "-er and -ir verbs: « comí, comiste, comió, comimos, comieron »; « viví » works the same."],
    "How do you say “Yesterday I ate pizza”?",
    ["« comer » in the past for « yo » is « comí ».", "« Ayer comí pizza »."],
    "Ayer comí pizza.",
  ),
  "spanish/ser-y-estar": lesson(
    ["Both verbs mean “to be”.", "« ser » is for what something is like, jobs, where someone is from and the time: « Soy de Perú », « Es médica ».", "« estar » is for where something is and how someone feels: « Estoy en casa », « Está cansado »."],
    "Pick the word that fits: « Mi hermano ___ en la escuela. »",
    ["The sentence says where he is.", "Location uses « estar »: « está »."],
    "está",
  ),
  "spanish/en-orden": lesson(
    ["« primero » means first and « luego » or « después » mean then or after that.", "« finalmente » or « al final » means finally.", "These words help you tell a story or explain the steps of a recipe in order."],
    "Which word goes last: « luego », « primero » or « finalmente »?",
    ["« primero » is first and « luego » is next.", "« finalmente » ends the list."],
    "finalmente",
  ),
  "spanish/profesiones": lesson(
    ["Many jobs change to match the person: « el médico », « la médica »; « el veterinario », « la veterinaria ».", "Say what you would like to be with « Quiero ser… » (I want to be…): « Quiero ser profesora ».", "Say why with « porque »: « porque me gustan los animales »."],
    "Who works with sick animals?",
    ["« el animal » plus a job: an animal doctor.", "« el veterinario » or « la veterinaria »."],
    "el veterinario",
  ),
  "spanish/cuentos": lesson(
    ["Read the whole story once, then read it again slowly.", "Look for words you know, and for words that look like English: « el animal », « la familia ».", "A story has « el personaje » (a character), « el lugar » (the place), « el problema » and « el final »."],
    "In a story, what is « el personaje »?",
    ["« personaje » looks like the word person.", "It is a person or animal in the story."],
    "a character",
  ),
};
