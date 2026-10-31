import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "spanish/saludos": lesson(
    ["« Hola » means hello. « Adiós » means goodbye.", "« Buenos días » is good morning, « Buenas tardes » good afternoon and « Buenas noches » good night.", "Say your name with « Me llamo… ». Ask a friend with « ¿Cómo te llamas? »"],
    "How do you say good morning?",
    ["Morning greetings use « días » (days).", "« Buenos días »."],
    "Buenos días",
  ),
  "spanish/numeros-hasta-20": lesson(
    ["1 to 10: « uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez ».", "11 to 15: « once, doce, trece, catorce, quince ».", "16 to 19 are ten and a number: « dieciséis, diecisiete, dieciocho, diecinueve ». 20 is « veinte »."],
    "What number is « diecisiete »?",
    ["« dieci » means ten and…", "« siete » is 7, so ten and seven."],
    "17",
  ),
  "spanish/colores": lesson(
    ["« rojo » is red, « azul » is blue and « verde » is green.", "« amarillo » is yellow, « negro » is black and « blanco » is white.", "« anaranjado » is orange, « morado » is purple and « marrón » is brown."],
    "What colour is « amarillo »?",
    ["Think of a banana or the sun.", "« amarillo » is yellow."],
    "yellow",
  ),
  "spanish/animales": lesson(
    ["« el perro » is the dog and « el gato » is the cat.", "Spanish puts « el » or « la » (the) in front of a word: « el pájaro », « la vaca ».", "« el pez » is a fish, « el caballo » a horse and « la rana » a frog."],
    "What animal is « la vaca »?",
    ["« la » means the.", "« vaca » is the animal that gives us milk."],
    "the cow",
  ),
  "spanish/familia": lesson(
    ["« mi madre » is my mother and « mi padre » my father.", "« el hermano » is a brother and « la hermana » a sister.", "« el abuelo » and « la abuela » are grandparents; « el tío » and « la tía » are uncle and aunt."],
    "Who is « mi abuela »?",
    ["« abuela » ends in « a », so it is a woman.", "« abuelo » is grandfather, so « abuela » is grandmother."],
    "my grandmother",
  ),
};
