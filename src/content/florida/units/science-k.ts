import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Florida's own Kindergarten science units (`fl-` ids), for the benchmarks no shared unit practises: gravity and things
// that look big or small, near or far from Earth (SC.K.E.5.1, 5.5, 5.6), and real animals and plants compared with
// the ones in books and cartoons, with drawing and keeping records (SC.K.L.14.2, SC.K.N.1.3, 1.4).

const SKY_AND_GRAVITY: Q[] = [
  ["You let go of a ball. Which way does it fall?", "down", ["up", "sideways", "it floats away"], "Gravity pulls things toward the ground."],
  ["What pulls a dropped toy to the floor?", "gravity", ["a magnet", "the wind", "a shadow"], "Gravity pulls things down."],
  ["A ball sits on a table. What holds it up?", "the table", ["nothing", "the wind", "the Moon"], "The table is under it."],
  ["You jump up. What pulls you back down?", "gravity", ["a kite", "the rain", "a rainbow"], "Gravity pulls you toward the ground."],
  ["Rain falls from clouds to the ground because of…", "gravity", ["magnets", "shadows", "echoes"], "Gravity pulls rain down."],
  ["A leaf lets go of a tree. Where does it go?", "toward the ground", ["up to the sky", "to the Moon", "sideways forever"], "Gravity pulls it down."],
  ["Gravity is a…", "pull toward the ground", ["push up to the sky", "sound", "colour"], "It pulls things down."],
  ["Which car looks bigger: one next to you or one far down the road?", "the one next to you", ["the one far away", "they look the same", "neither"], "Near things look bigger."],
  ["From the ground, a plane high in the sky looks…", "small", ["huge", "square", "like a house"], "Far-away things look small."],
  ["A bus far down the street looks tiny. Is it tiny?", "No, it is far away", ["Yes, it is a toy", "Yes, it shrank", "No, it is in the sky"], "Far away makes it look small."],
  ["Which is nearer to you?", "the desk in front of you", ["the Moon", "the Sun", "a star"], "Near means close by."],
  ["Which is far away from Earth?", "the Sun", ["the grass", "your shoes", "a tree"], "The Sun is very far away."],
  ["The Sun looks small in the sky because it is…", "very far away", ["tiny", "hiding", "made of paper"], "Far away things look small."],
  ["A tree next to you looks big. A tree on a far hill looks…", "small", ["bigger", "purple", "loud"], "Far away looks small."],
  ["Which bird looks smaller: one on a fence or one high in the sky?", "the one high in the sky", ["the one on the fence", "they look the same", "neither"], "The far one looks smaller."],
  ["An ant is small. A whale is big. Which is bigger?", "the whale", ["the ant", "they are the same", "neither"], "Big things take up more space."],
  ["A book rests on a shelf. Why does it not fall?", "the shelf holds it up", ["gravity is off", "the wall pushes it", "it is too small"], "Something is under it.", true],
  ["A parachute slows a person who is falling. Gravity is still…", "pulling the person down", ["pushing up", "turned off", "gone"], "The parachute slows the fall.", true],
  ["You walk toward a tree far away. It looks…", "bigger and bigger", ["smaller and smaller", "the same", "like a flower"], "Nearer things look bigger.", true],
  ["You ride away from your house. The house looks…", "smaller", ["bigger", "the same", "like a star"], "Farther looks smaller.", true],
  ["Why do things fall down and not up?", "Earth's gravity pulls them down", ["the sky pushes them", "the wind is strong", "they are tired"], "Gravity pulls toward Earth.", true],
  ["You toss a ball up. What happens next?", "gravity pulls it back down", ["it stays up forever", "it flies to the Moon", "it turns into a bird"], "What goes up comes down.", true],
  ["The Moon looks small, but it is really…", "big, and far away", ["tiny, and close", "as small as a cookie", "flat like paper"], "Far away makes big things look small.", true],
  ["Which looks smallest from where you stand?", "a plane high in the sky", ["a dog next to you", "your shoe", "a ball in your hand"], "It is the farthest away.", true],
];

const REAL_OR_PRETEND: Q[] = [
  ["In a cartoon, a cat talks and wears a hat. Can a real cat?", "No, that is pretend", ["Yes, all cats do", "Yes, at night", "Yes, in winter"], "Real cats cannot talk."],
  ["In a story, a pig builds a house. Can a real pig?", "No, that is pretend", ["Yes, with bricks", "Yes, all pigs can", "Yes, on farms"], "Real pigs do not build houses."],
  ["A cartoon dog drives a car. Real dogs…", "cannot drive cars", ["drive to the park", "drive every day", "drive at night"], "Dogs cannot drive."],
  ["In a book, a flower sings a song. Real flowers…", "cannot sing", ["sing at night", "sing in the rain", "sing to bees"], "Plants do not sing."],
  ["Which is real?", "a bee making honey", ["a bee driving a truck", "a bee reading a book", "a bee wearing shoes"], "Bees really make honey."],
  ["Which is something a real duck does?", "swims", ["reads a book", "cooks dinner", "rides a bike"], "Ducks swim."],
  ["Which is something a real cow does?", "eats grass", ["plays the drums", "wears a hat", "drives a tractor"], "Cows eat grass."],
  ["A movie shows a talking tree. Is it real or pretend?", "pretend", ["real", "real at night", "real in spring"], "Real trees do not talk."],
  ["Real trees…", "cannot walk or talk", ["walk to the shore", "talk to birds", "walk at night"], "Trees stay in one place."],
  ["A picture book shows a bear making tea. Real bears…", "do not make tea", ["make tea every day", "make tea in winter", "make tea for friends"], "Bears are wild animals."],
  ["A real fish lives…", "in water", ["in a tree", "in a hat", "on a cloud"], "Fish need water."],
  ["A real caterpillar can turn into a…", "butterfly or moth", ["bird", "frog", "flower"], "It changes as it grows."],
  ["A real bird has…", "feathers", ["fur", "scales like a fish", "a shell like a turtle"], "Birds have feathers."],
  ["When you draw a flower, what should you show?", "petals, a stem and leaves", ["only a car", "only a house", "only the Sun"], "Show its main parts."],
  ["When you draw a bird, which parts should you show?", "wings, a beak and feet", ["wheels", "a roof", "a steering wheel"], "Show what the bird really has."],
  ["You draw how a plant looks each day. You are keeping a…", "record", ["song", "race", "snack"], "A record helps you remember."],
  ["Why do scientists draw pictures of what they see?", "to remember what they saw", ["to hide it", "to make noise", "to scare animals"], "Drawings show what you noticed."],
  ["Which is a way to keep a record of what you saw?", "draw a picture of it", ["forget about it", "hide it", "turn it upside down"], "A picture shows what you saw."],
  ["A fish rides a bicycle in a picture. What tells you it is pretend?", "fish live in water and cannot ride bikes", ["fish are red", "fish are little", "bikes are fast"], "Fish do not ride bikes.", true],
  ["A fox in a story talks. Which clue says it is pretend?", "real foxes cannot talk", ["foxes are orange", "foxes have tails", "foxes live outside"], "Animals cannot talk like people.", true],
  ["A bear in a book wears clothes. A real bear's body is covered with…", "fur", ["a shirt", "feathers", "scales"], "Bears have fur.", true],
  ["How can you learn what a real animal does?", "watch it or read about it in a science book", ["ask a cartoon", "guess from a funny story", "ask a toy"], "Watch real animals and read about them.", true],
  ["A cartoon shows a flower with eyes and a mouth. Real flowers have…", "petals, a stem and roots", ["eyes and a mouth", "hands and feet", "a nose and ears"], "Look at a real flower.", true],
  ["A picture shows a frog who is a king. A real frog…", "hops and catches insects", ["rules a country", "wears a crown", "sits on a throne"], "Real frogs live in ponds and on land.", true],
  ["Good scientists draw what they…", "really see", ["wish they saw", "dreamed about", "heard in a cartoon"], "Draw what you observe.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "fl-k-sky-and-gravity",
    title: "Down, Near & Far",
    emoji: "🌎",
    blurb: "Gravity pulls things down. Far-away things look small.",
    parentNote:
      "Practices two Florida kindergarten Earth and space benchmarks: gravity pulling objects toward the ground unless something holds them up, and things looking big or small, near or far, from where we stand on Earth.",
    standards: ["SC.K.E.5.1; SC.K.E.5.5; SC.K.E.5.6", "gravity pulling objects down, and things that look big or small, near or far, as seen from Earth"],
    items: SKY_AND_GRAVITY,
  }),
  bankUnit({
    id: "fl-k-real-or-pretend",
    title: "Real or Pretend?",
    emoji: "🐸",
    blurb: "Real plants and animals, and the pretend ones in stories.",
    parentNote:
      "Practices telling real plants and animals from the ones books and cartoons show with traits they do not have, and drawing and keeping records of what a scientist sees.",
    standards: ["SC.K.L.14.2; SC.K.N.1.3; SC.K.N.1.4", "real plants and animals compared with pretend ones in stories, and drawing and keeping records of observations"],
    items: REAL_OR_PRETEND,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
