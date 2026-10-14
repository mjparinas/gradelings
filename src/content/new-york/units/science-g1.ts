import type { Unit } from "../../types";
import { bankUnit } from "../own";

// New York's own Grade 1 science units (`ny-` ids). The K-2 engineering standards ask children to compare two designs
// from test data (K-2-ETS1-3); no unit New York borrows for Grade 1 does that, so this one does, with everyday tests:
// boats, cups, ramps, bags, mittens and towers.
export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-g1-test-designs",
    title: "Test Two Designs",
    emoji: "🧪",
    blurb: "Test two things that solve the same problem. Which works better?",
    parentNote:
      "Practices comparing two designs that solve the same problem by looking at simple test results (how many pennies a boat holds, how far a car rolls), naming each design's strengths and weaknesses, and testing fairly.",
    standards: [
      "K-2-ETS1-3",
      "comparing test results from two designs that solve the same problem, and naming each one's strengths and weaknesses",
    ],
    items: [
      ["Boat A holds 5 pennies. Boat B holds 9 pennies. Which holds more?", "Boat B", ["Boat A", "They hold the same", "Neither boat"], "9 is more than 5."],
      ["Cup A keeps ice frozen for 1 hour. Cup B for 3 hours. Which works better?", "Cup B", ["Cup A", "They work the same", "Neither cup"], "Longer is better here."],
      ["Ramp A rolls a car 4 steps. Ramp B rolls it 7 steps. Which went farther?", "Ramp B", ["Ramp A", "They tie", "Neither ramp"], "7 steps is more than 4."],
      ["Why do we test two designs?", "To see which one works better", ["To make a mess", "To break both", "To pick a color"], "Tests give us answers."],
      ["To test two paper planes fairly, throw them…", "the same way", ["in different ways", "one hard and one soft", "one inside, one outside"], "Keep the test the same."],
      ["Tower A falls in the wind. Tower B stays up. Which is stronger?", "Tower B", ["Tower A", "They are the same", "Neither tower"], "Which one stayed up?"],
      ["A strength of a design is something it…", "does well", ["does badly", "is named", "looks like"], "Strengths are good things."],
      ["A weakness of a design is something it…", "does not do well", ["does very well", "is named", "is colored"], "Weak spots need fixing."],
      ["Bag A tore with 3 books. Bag B held 6 books. What is Bag A's weakness?", "It tears easily", ["It holds a lot", "It is strong", "It never tears"], "What went wrong with Bag A?"],
      ["Shoe A slips on ice. Shoe B grips the ice. Which is better on ice?", "Shoe B", ["Shoe A", "They are the same", "Neither shoe"], "Gripping keeps you safe."],
      ["We count how far each car rolls. Our counts are called…", "data", ["a guess", "a story", "a song"], "Facts we collect in a test."],
      ["Hat A shades your face. Hat B does not. Which is better for sunny days?", "Hat A", ["Hat B", "They are the same", "Neither hat"], "Shade keeps the sun off."],
      ["Bridge A holds 2 blocks. Bridge B holds 8 blocks. Which is stronger?", "Bridge B", ["Bridge A", "They are the same", "Neither bridge"], "8 is more than 2."],
      ["Kite A flies high. Kite B will not fly. What should we do with Kite B?", "Change it and test again", ["Never try again", "Throw it away", "Just paint it"], "Fix it, then test."],
      ["Two balls bounce. Which tool helps us measure each bounce?", "A ruler", ["A spoon", "A pillow", "A crayon"], "Rulers measure height."],
      ["Mitten A is warm but stiff. Being stiff is a…", "weakness", ["strength", "test", "color"], "Stiff mittens are hard to move in."],
      ["Mitten A is warm but stiff. Mitten B is warm and soft. Which is better?", "Mitten B", ["Mitten A", "Neither is warm", "They are the same"], "B has no weakness here."],
      ["Sand wall A leaks water. Sand wall B holds it back. Which works best?", "Wall B", ["Wall A", "They are the same", "Neither wall"], "Which one held the water?"],
      ["Test results help us…", "pick the best design", ["skip building", "make a guess", "forget the problem"], "Results tell us what works."],
      ["Lid A keeps soup hot. Lid B lets it get cold. Which lid works better?", "Lid A", ["Lid B", "They are the same", "Neither lid"], "Keeping soup hot was the goal."],
      ["Fort A falls over. Fort B stands. What can we learn from Fort B?", "How to build a strong fort", ["Forts always fall", "Nothing at all", "Forts can't be built"], "Copy what worked."],
      ["Tape holds the card for 2 days. Glue holds it for 9 days. Which lasts?", "Glue", ["Tape", "Both the same", "Neither one"], "9 days is longer."],
      ["Car A: 3 steps, then 4 steps. Car B: 8 steps, then 9 steps. Which goes farther?", "Car B", ["Car A", "They tie", "Neither car"], "Compare both tries.", true],
      ["Bag A holds 4 apples. Bag B holds 8. We must carry 6. Which works?", "Bag B", ["Bag A", "Both bags", "Neither bag"], "Which bag fits 6?", true],
      ["Fan A cools well but is loud. What is Fan A's weakness?", "It is loud", ["It cools well", "It is a fan", "It is quiet"], "A weakness is a problem.", true],
      ["Which test is fair for two paper boats?", "Same water, same pennies", ["One in a tub, one in a sink", "Pennies in one, rocks in one", "Test one, skip one"], "Keep everything the same.", true],
    ],
  }),
];
