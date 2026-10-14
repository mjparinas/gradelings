import { lesson, type GradeLessons } from "./index";

const math: GradeLessons = {
  "math/numbers-to-1000": lesson(
    ["A 3-digit number has hundreds, tens and ones.", "Each digit is worth its place: 4 in the hundreds place is 400.", "Add the parts to write the number."],
    "Write 4 hundreds, 3 tens and 6 ones as a number.",
    ["400 + 30 + 6"],
    "436",
    { type: "blocks", hundreds: 4, tens: 3, ones: 6 },
  ),
  "math/add-subtract-1000": lesson(
    ["Line up the ones, tens and hundreds.", "Start with the ones, then tens, then hundreds.", "If a place goes over 9 when adding, regroup to the next place."],
    "276 + 148 = ?",
    ["Ones: 6 + 8 = 14. Write 4 and regroup 1 ten.", "Tens: 7 + 4 + 1 = 12. Write 2 and regroup 1 hundred.", "Hundreds: 2 + 1 + 1 = 4."],
    "424",
  ),
  "math/multiplication": lesson(
    ["Multiplying means equal groups.", "3 × 4 means 3 groups of 4.", "An array shows the groups as rows and columns."],
    "4 × 5 = ?",
    ["That is 4 groups of 5.", "5 + 5 + 5 + 5 = 20."],
    "20",
    { type: "array", rows: 4, cols: 5 },
  ),
  "math/division": lesson(
    ["Dividing shares things equally or makes equal groups.", "Think of the multiplication fact that goes with it.", "Ask: what times the divisor makes the number?"],
    "20 ÷ 4 = ?",
    ["What times 4 makes 20?", "4 × 5 = 20."],
    "5",
  ),
  "math/patterns-and-equations": lesson(
    ["An equation has an = sign. Both sides are the same.", "A letter or box stands for a missing number.", "Do the opposite to find it: the opposite of + is −."],
    "n + 7 = 15",
    ["Undo + 7 by taking away 7.", "15 − 7 = 8."],
    "n = 8",
  ),
  "math/measuring": lesson(
    ["Length: millimetres, centimetres, metres and kilometres.", "Mass: grams (g) and kilograms (kg).", "Capacity: millilitres (mL) and litres (L). Pick a unit that fits."],
    "Which unit fits the mass of an apple?",
    ["An apple is light.", "Light things are measured in grams."],
    "Grams (g)",
  ),
  "math/time": lesson(
    ["The short hand shows the hour. The long hand shows the minutes.", "Each number on the clock is 5 minutes.", "Long hand on 6 means 30 minutes past."],
    "The short hand is just past the 3 and the long hand is on the 6. What time is it?",
    ["Long hand on 6: 30 minutes.", "Short hand just past 3: the hour is 3."],
    "3:30",
    { type: "clock", hour: 3, minute: 30 },
  ),
  "math/3d-objects": lesson(
    ["A face is a flat side.", "An edge is where two faces meet.", "A vertex is a corner."],
    "How many faces does a cube have?",
    ["A cube is shaped like a die.", "A die has 6 flat faces."],
    "6",
    { type: "shape", shape: "cube" },
  ),
  "math/facts-to-20": lesson(
    ["Use doubles you know: 5 + 5 = 10.", "Near doubles: 5 + 6 is one more than 5 + 5.", "For subtraction, think of the missing addend: 12 − 6 is 6 + ☐ = 12."],
    "5 + 5 = 10. So what is 5 + 6?",
    ["6 is one more than 5.", "So the answer is one more than 10: 11."],
    "11",
  ),
  "math/fractions": lesson(
    ["The bottom number says how many equal parts make a whole.", "The top number says how many parts we have.", "With the same bottom number, the bigger top number is more."],
    "A pie has 4 equal slices. Amir eats 1. What fraction did he eat?",
    ["The whole is 4 equal parts.", "He ate 1 part, so 1/4."],
    "1/4",
  ),
  "math/graphs-and-chance": lesson(
    ["Read the title and the labels first.", "Check what each picture or bar stands for.", "Certain, likely, unlikely and impossible tell how likely something is."],
    "Each ⭐ stands for 2 votes. Cats have 3 ⭐. How many votes?",
    ["Each ⭐ is 2 votes.", "3 × 2 = 6."],
    "6 votes",
  ),
  "math/money": lesson(
    ["A toonie is $2 and a loonie is $1. Count bills first.", "Add dollars and cents separately.", "Change is the amount paid minus the cost."],
    "A toy costs $3. You pay with $5. How much change?",
    ["Subtract: $5 − $3.", "The change is $2."],
    "$2",
  ),
  "math/round-and-count": lesson(
    ["To round to the nearest ten, look at the ones digit.", "If the ones digit is 5 or more, round up. If less than 5, round down.", "Skip count forward or back by 10s, 50s or 100s."],
    "Round 166 to the nearest ten.",
    ["The ones digit is 6, which is 5 or more.", "Round up: 170."],
    "170",
  ),
  "math/fair-shares-3": lesson(
    ["Fair shares are equal. Cut each item into equal parts.", "Sharing 1 item among 4 gives 1/4 each.", "More people sharing makes each share smaller."],
    "3 muffins are shared fairly by 2 friends. How much does each get?",
    ["Give each friend 1 whole muffin.", "Cut the last one in half. Each gets 1 and 1/2."],
    "1 and 1/2 muffins",
  ),
  "math/data-and-mean": lesson(
    ["The mode is the value that appears most often.", "The mean is what you get when you share the total equally.", "Mean: add all the numbers, then divide by how many there are."],
    "What is the mean of 4, 6 and 8?",
    ["Add: 4 + 6 + 8 = 18.", "Divide by 3: 18 ÷ 3 = 6."],
    "6",
  ),
  "math/likelihood-3": lesson(
    ["If there are more of one colour, it is more likely.", "Equal amounts are equally likely.", "Trying many times shows what is likely."],
    "A bag has 5 red and 1 blue marble. Is picking red likely or unlikely?",
    ["There are many more red.", "So red is likely."],
    "Likely",
  ),
  "math/area-and-perimeter-3": lesson(
    ["Perimeter is the distance around a shape. Add all sides.", "Area is the space inside. Count the square units.", "Perimeter uses cm. Area uses square cm."],
    "A rectangle is 5 cm long and 3 cm wide. What is its perimeter?",
    ["Add all four sides: 5 + 3 + 5 + 3.", "That is 16 cm."],
    "16 cm",
  ),
  "math/move-it": lesson(
    ["A quarter turn is 1/4 of a full turn. 4 quarter turns make a full turn.", "A half turn faces the opposite way.", "Shapes are congruent if they match exactly."],
    "How many quarter turns make a whole turn?",
    ["Each quarter turn is 1/4.", "4 quarters make 1 whole."],
    "4",
  ),
  "math/make-change": lesson(
    ["Change is what you get back.", "Count up from the cost to the amount you paid.", "Or subtract: amount paid minus the cost."],
    "A pencil costs 40¢. You pay with $1. How much change?",
    ["Count up from 40¢ to $1.", "40¢ + 60¢ = 100¢. The change is 60¢."],
    "60¢",
  ),
  "math/numbers-100000-ab": lesson(
    ["Each place is worth 10 times the place to its right.", "In 38 157, the 3 is worth 30 000.", "Compare the biggest places first."],
    "In 95 324, what is the value of the digit 5?",
    ["5 is in the thousands place.", "Its value is 5 000."],
    "5 000",
  ),
  "math/polygons-ab": lesson(
    ["A polygon is a closed shape with straight sides.", "Triangle 3 sides, quadrilateral 4, pentagon 5, hexagon 6.", "A right angle is a square corner."],
    "A polygon has 4 sides. What is it called?",
    ["4 sides: quad means 4.", "It is a quadrilateral."],
    "A quadrilateral",
  ),
  "math/angles-ab": lesson(
    ["A right angle is a square corner.", "An angle smaller than a right angle is acute.", "An angle bigger than a right angle is obtuse."],
    "An angle is smaller than a square corner. What kind is it?",
    ["Compare it with a right angle.", "Smaller means acute."],
    "Acute",
  ),
  "math/moves-ab": lesson(
    ["A slide moves a shape in a straight line.", "A flip makes a mirror image. A turn spins it around a point.", "The size and shape do not change."],
    "A skater spins around on one spot. Which move is it?",
    ["It goes around a point.", "That is a turn."],
    "A turn",
  ),
  "math/length-perimeter-ab": lesson(
    ["10 mm make 1 cm. 10 cm make 1 dm. 100 cm make 1 m.", "Line up the 0 of the ruler with one end.", "Perimeter is all the sides added together."],
    "6 dm is how many cm?",
    ["1 dm is 10 cm.", "6 × 10 = 60."],
    "60 cm",
  ),
  "math/data-ab": lesson(
    ["Data is information we collect.", "Dot plots and bar graphs show how many.", "Read the title, the labels and the scale first."],
    "A bar reaches 14 on a graph. What does that tell you?",
    ["Read the number the bar reaches.", "14 students chose it."],
    "14 students",
  ),
  "math/mb-polygons": lesson(
    ["A polygon is a closed shape with straight sides.", "Triangle 3 sides, quadrilateral 4, pentagon 5, hexagon 6, octagon 8.", "A polygon has as many corners as sides."],
    "How many sides does a hexagon have?",
    ["Hexa- means 6.", "A hexagon has 6 sides."],
    "6",
  ),
  // Washington
  "math/wa-g3-times-tens": lesson(
    ["Use the basic fact first.", "Then multiply by 10: the answer is that many tens.", "6 × 40 is 6 × 4 tens."],
    "What is 6 × 40?",
    ["6 × 4 = 24.", "24 tens = 240."],
    "240",
  ),
  "math/wa-g3-two-step": lesson(
    ["Read the story and find the two steps.", "Do the first step, then use its answer in the second.", "Check: is the answer close to an estimate?"],
    "Maya buys 4 packs of 6 stickers and gives away 5. How many are left?",
    ["Step 1: 4 × 6 = 24.", "Step 2: 24 − 5 = 19."],
    "19",
  ),
  "math/wa-g3-inch-ruler": lesson(
    ["Each inch on the ruler is split into 4 equal parts.", "Count the whole inches, then the parts: 2/4 is the same as 1/2.", "A line plot shows how many objects have each length."],
    "A crayon starts at 0 and ends at the second mark after 2. How long is it?",
    ["2 whole inches.", "2 marks is 2/4 = 1/2."],
    "2 1/2 inches",
  ),
  "math/wa-g3-scaled-graphs": lesson(
    ["Read the key: one picture can stand for 2, 5 or 10.", "Multiply the pictures by the key.", "Subtract to compare two rows."],
    "Each 🌷 stands for 5. Spring has 4 🌷. How many chose spring?",
    ["4 × 5 = 20."],
    "20",
  ),
  // Texas
  "math/tx-g3-coins-and-bills": lesson(
    ["Count the bills first, starting with the one worth the most.", "Then count on with the coins: quarters, dimes, nickels, then pennies.", "Write the total with a dollar sign and a decimal point, like $6.35."],
    "How much are a $5 bill, a $1 bill, 1 quarter and 1 dime?",
    ["Bills: $5 + $1 = $6.", "Count on 25¢ and 10¢: $6.25, $6.35."],
    "$6.35",
  ),
  "math/tx-g3-money-choices": lesson(
    ["Skills and training help people earn income.", "When something is scarce, it usually costs more.", "Credit is borrowed money that the borrower must pay back. A savings plan puts money away regularly for a goal."],
    "Kim wants a $24 game. She saves $4 a week. How many weeks will it take?",
    ["Divide the cost by the amount saved each week: 24 ÷ 4 = 6."],
    "6 weeks",
  ),
  // New York
  "math/ny-g3-equal-areas": lesson(
    ["Split a shape into parts that have equal areas. The parts do not have to look the same.", "If there are 4 equal parts, each part is 1/4 of the whole area.", "To find the area of each part, divide the whole area by the number of parts."],
    "A rectangle of 12 square units is split into 3 equal parts. What is the area of each part, and what fraction is it?",
    ["12 ÷ 3 = 4 square units.", "There are 3 equal parts, so each is 1/3."],
    "4 square units, 1/3 of the whole",
  ),
};

// Math lessons ship with the grade. The other subjects' lessons are a second download, fetched once the grade is in.
export const lessons: GradeLessons = math;
export const moreLessons = () => import("./g3-subjects").then((m) => m.lessons);
