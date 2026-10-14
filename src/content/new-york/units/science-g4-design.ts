import type { Unit } from "../../types";
import { bankUnit } from "../own";

// New York's Grade 4 engineering design unit (`ny-` id). New York places the 3-5 engineering standards in Grades 3 to
// 5; Grade 4 has no borrowed unit that practises them, so this one does, with Grade 4 problems: bridges, kites, solar
// ovens, water filters, earthquake-safe buildings and wind turbines.
export const DESIGN: Unit = bankUnit({
  id: "ny-g4-engineering-design",
  title: "Engineering Design",
  emoji: "🛠️",
  blurb: "Criteria, constraints, comparing ideas and fair tests.",
  parentNote:
    "Practices the steps engineers use: defining a problem with criteria (what the design must do) and constraints (limits such as cost, time and materials), comparing several possible solutions, and planning fair tests that find a design's failure points so it can be improved.",
  standards: [
    "3-5-ETS1-1; 3-5-ETS1-2; 3-5-ETS1-3",
    "defining a design problem with criteria and constraints, comparing possible solutions, and running fair tests to find failure points",
  ],
  items: [
    ["Criteria tell engineers…", "what a design must do to succeed", ["which tools they cannot use", "how long lunch is", "which team wins a game"], "Criteria are goals."],
    ["Constraints are…", "limits, like cost, time or materials", ["goals the design must meet", "the final test score", "the name of the design"], "Constraints hold you back."],
    ["You must build a bridge using only 20 craft sticks. Using only 20 sticks is a…", "constraint", ["criterion", "test result", "prototype"], "It is a limit."],
    ["The bridge must hold 10 pennies without bending. This is a…", "criterion", ["constraint", "material", "failure point"], "It is what the bridge must do."],
    ["Before building anything, engineers first…", "define the problem", ["paint the design", "throw away the plan", "pick a winner"], "Know what you are solving."],
    ["Why do engineers sketch several ideas before building?", "To compare different possible solutions", ["To waste paper", "To skip testing", "To avoid choosing"], "More ideas, better choices."],
    ["In a fair test, you change…", "only one thing at a time", ["everything at once", "nothing ever", "the results"], "One variable."],
    ["You test two kite designs. To be fair, you fly them…", "in the same wind at the same time", ["one in wind and one in still air", "on a stormy day and a calm day", "one high and one low"], "Keep conditions the same."],
    ["A prototype is…", "a first model built for testing", ["the final product sold in stores", "a drawing of a person", "a kind of battery"], "Test it before you finish it."],
    ["Your design failed a test. What should you do next?", "Find what failed and improve it", ["Give up", "Hide the results", "Test something unrelated"], "Failures teach you."],
    ["A failure point is…", "the part of a design that breaks or doesn't work", ["the best part of the design", "the price", "the paint color"], "Where it went wrong."],
    ["Which question helps compare two solutions?", "Which one meets more of the criteria?", ["Which one has a nicer name?", "Which one was made first?", "Which one is my favorite color?"], "Go back to the criteria."],
    ["Engineers share their designs with a team because…", "others may notice problems and improvements", ["teams always make designs worse", "sharing wastes time", "no one else can help"], "Many eyes help."],
    ["Which is a good material to keep a house warm in winter?", "Foam insulation", ["A thin metal sheet", "A single pane of glass", "A wet cloth"], "It traps air."],
    ["A marble flies off a curve on your marble run. Which change could help?", "Add a wall on the outside of the curve", ["Make the curve sharper", "Make the marble go faster", "Remove the track"], "Keep it on the track."],
    ["A design is tested 3 times and gives almost the same result each time. The results are…", "reliable", ["unfair", "made up", "impossible"], "Repeated results agree."],
    ["Which is a want, not a need, in a backpack design?", "A bright color", ["Holding books", "Strong straps", "Closing securely"], "It would be nice, not necessary."],
    ["A criterion for an earthquake-safe building is that it…", "stays standing when the ground shakes", ["costs nothing", "is painted red", "is the tallest in town"], "What must it do?"],
    ["Why test a model before building the real bridge?", "To find problems early, when they are cheap to fix", ["To make the bridge cost more", "Because models always fail", "To skip measuring"], "Small tests save big mistakes."],
    ["Three teams build water filters in different ways. Comparing them helps choose the…", "solution that best meets the criteria", ["team with the most members", "oldest filter", "filter with the longest name"], "Compare against the goals."],
    ["Filter A cleans water well and costs $20. Filter B cleans water well and costs $8. The budget is $10. Which meets the criterion and the constraint?", "Filter B", ["Filter A", "Both filters", "Neither filter"], "Check the cost too.", true],
    ["A team changes the paper, the shape and the height of a tower all at once. What is wrong with this test?", "They changed more than one variable", ["They tested too few towers", "Paper never works", "Nothing is wrong"], "One change at a time.", true],
    ["Car A rolls 120 cm, 118 cm and 122 cm. Car B rolls 90 cm, 150 cm and 60 cm. Which design is more consistent?", "Car A", ["Car B", "Both are equally consistent", "Neither car"], "Look at how close the results are.", true],
    ["A solar oven must get hot enough to melt cheese, using only a box, foil and plastic wrap. Which is a constraint?", "Using only a box, foil and plastic wrap", ["Getting hot enough to melt cheese", "Melting the cheese on a cracker", "Warming the air inside"], "Which part limits you?", true],
    ["Why might engineers pick a design that is not the very strongest?", "It meets the criteria and stays within the constraints", ["Stronger designs are always worse", "They forgot to test", "Weaker designs always win"], "Strong enough, and within limits.", true],
    ["A foil boat sinks with 15 pennies. After a new, wider hull, it holds 30. The improvement came from…", "testing, finding the failure and redesigning", ["luck only", "skipping the test", "using fewer pennies"], "Test, fix, test again.", true],
    ["Which data best helps choose between two wind turbine blade designs?", "How much electricity each makes in the same wind", ["Which blade is a prettier color", "Which blade was built first", "Which blade has a longer name"], "Measure what matters.", true],
  ],
});
