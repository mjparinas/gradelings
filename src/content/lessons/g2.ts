import { lesson, type GradeLessons } from "./index";

const math: GradeLessons = {
  "math/facts-to-20": lesson(
    ["Use 10 as a stepping stone.", "Break one number to make a 10 with the other.", "Then add what is left over."],
    "8 + 5 = ?",
    ["8 needs 2 more to make 10.", "Take 2 from 5. That leaves 3.", "10 + 3 = 13."],
    "13",
  ),
  "math/adding-to-100": lesson(
    ["Add the tens first.", "Then add the ones.", "Put the two answers together. To take away, work the same way."],
    "34 + 25 = ?",
    ["Tens: 30 + 20 = 50.", "Ones: 4 + 5 = 9.", "50 + 9 = 59."],
    "59",
  ),
  "math/patterns": lesson(
    ["Look at how much each number changes.", "That change is the rule.", "Use the rule to find the next number."],
    "5, 10, 15, 20, ?",
    ["Each step adds 5.", "20 + 5 = 25."],
    "25",
  ),
  "math/measuring": lesson(
    ["Centimetres (cm) measure short lengths.", "Metres (m) measure long lengths.", "Line up the 0 on the ruler with one end."],
    "Would you measure a pencil in cm or m?",
    ["A pencil is short.", "Short things use centimetres."],
    "cm",
  ),
  "math/tens-and-ones": lesson(
    ["A 2-digit number is made of tens and ones.", "The first digit counts tens. The second counts ones.", "Add the parts: 4 tens and 6 ones is 40 + 6."],
    "What number do 5 tens and 3 ones make?",
    ["5 tens is 50.", "50 + 3 = 53."],
    "53",
    { type: "blocks", tens: 5, ones: 3 },
  ),
  "math/bigger-or-smaller": lesson(
    ["Compare the tens first. More tens means a bigger number.", "If the tens match, compare the ones.", "To order numbers, put the smallest first."],
    "Which is bigger: 47 or 53?",
    ["Tens: 4 tens and 5 tens.", "5 tens is more, so 53 is bigger."],
    "53",
  ),
  "math/coins": lesson(
    ["Nickel 5¢, dime 10¢, quarter 25¢, loonie $1, toonie $2.", "Count the biggest coins first.", "Then count on with the smaller coins."],
    "A quarter, a dime and a nickel. How much?",
    ["25¢, then 10¢ more: 35¢.", "5¢ more: 40¢."],
    "40¢",
    { type: "coins", coins: [25, 10, 5] },
  ),
  "math/shapes": lesson(
    ["2D shapes are flat. 3D shapes take up space.", "Faces are the flat sides of a 3D shape.", "Edges are where faces meet. Vertices are corners."],
    "How many flat faces does a cube have?",
    ["A cube is like a dice.", "It has a face on each side: 6."],
    "6",
  ),
  "math/graphs": lesson(
    ["Read the title and labels first.", "Count the pictures or read the bar for each kind.", "To compare, subtract: bigger count minus smaller."],
    "5 chose apples and 3 chose pears. How many more chose apples?",
    ["Apples: 5. Pears: 3.", "5 − 3 = 2."],
    "2 more",
    { type: "pictograph", title: "Fruit", rows: [{ label: "Apples", emoji: "🍎", count: 5 }, { label: "Pears", emoji: "🍐", count: 3 }] },
  ),
  "math/likely-or-not": lesson(
    ["Certain means it will always happen.", "Likely means it will probably happen.", "Unlikely means it probably will not. Impossible means never."],
    "Is it certain that Monday comes after Sunday?",
    ["Monday always follows Sunday.", "It will always happen."],
    "Certain",
  ),
  "math/numbers-to-200": lesson(
    ["Count 100 as 1 hundred, then keep going.", "A 3-digit number has hundreds, tens and ones.", "Compare hundreds first, then tens, then ones."],
    "What number is 1 hundred, 3 tens and 7 ones?",
    ["100 + 30 + 7", "That is 137."],
    "137",
    { type: "blocks", hundreds: 1, tens: 3, ones: 7 },
  ),
  "math/sharing-fairly": lesson(
    ["Fair shares are equal parts.", "Half is 1 of 2 equal parts. A third is 1 of 3.", "More friends sharing means smaller shares."],
    "6 cookies are shared fairly by 2 friends. How many each?",
    ["Give one to each friend, again and again.", "Each friend gets 3."],
    "3 cookies",
  ),
  "math/groups-and-sharing": lesson(
    ["Equal groups: add the same number again and again.", "Sharing: put the same number in each group.", "Count how many in all, or how many each."],
    "There are 3 groups of 4. How many in all?",
    ["4 + 4 + 4", "8 + 4 = 12."],
    "12",
  ),
  "math/balance-the-equation": lesson(
    ["An equals sign means both sides have the same value.", "Work out one side first.", "Find the missing number that balances the sides."],
    "What number makes both sides equal? 5 + 4 = ☐ + 3",
    ["Left side: 5 + 4 = 9.", "9 = ☐ + 3, so ☐ is 6."],
    "6",
  ),
  "math/graphs-and-mode": lesson(
    ["The mode is the choice picked most often.", "Find the tallest bar or longest row.", "That choice is the mode."],
    "Votes: apple 4, pear 7, grape 5. What is the mode?",
    ["The biggest number is 7.", "Pear got 7 votes."],
    "Pear",
  ),
  "math/chance-2": lesson(
    ["Impossible means it can never happen. Certain means always.", "The opposite of certain is impossible.", "Likely and unlikely are opposites too."],
    "It is certain that winter follows fall. What is the opposite?",
    ["The opposite says winter does not follow fall.", "That can never happen."],
    "Impossible",
  ),
  "math/shapes-and-symmetry": lesson(
    ["Count the sides and corners to name a shape.", "A line of symmetry cuts a shape into two matching halves.", "Fold it: if the halves match, the line works."],
    "How many sides does a pentagon have?",
    ["Penta- means 5.", "A pentagon has 5 sides."],
    "5",
  ),
  "math/simple-maps": lesson(
    ["A map shows where places are from above.", "North is up, south is down, west is left, east is right.", "Follow the steps one at a time."],
    "Which direction is opposite of north?",
    ["North is up on a map.", "The opposite is down."],
    "South",
  ),
  "math/how-long": lesson(
    ["A second is very short. A minute is 60 seconds.", "An hour is 60 minutes. A day is 24 hours.", "Pick a unit that fits: seconds for a clap, hours for sleeping."],
    "Which is longer: an hour or a second?",
    ["A second is a quick clap.", "An hour is 60 minutes."],
    "An hour",
  ),
  "math/money-to-200": lesson(
    ["A loonie is $1 and a toonie is $2.", "Count the bills and big coins first.", "Then count on with the smaller coins."],
    "A toonie, a loonie and a quarter. How much?",
    ["$2 + $1 = $3.", "$3 + 25¢ = $3.25."],
    "$3.25",
    { type: "coins", coins: [200, 100, 25] },
  ),
  "math/numbers-to-1000-ab": lesson(
    ["A 3-digit number has hundreds, tens and ones.", "Count by 10s or 100s to move up quickly.", "Compare hundreds first, then tens, then ones."],
    "Count by 10s: 140, 150, 160, 170, ?",
    ["Each step adds 10.", "170 + 10 = 180."],
    "180",
  ),
  "math/unit-fractions-ab": lesson(
    ["The bottom number tells how many equal parts.", "The top number tells how many parts we mean.", "1/4 is one of four equal parts."],
    "A pizza has 3 equal slices. What fraction is one slice?",
    ["There are 3 equal parts.", "One slice is 1 of 3."],
    "1/3",
  ),
  "math/slides-flips-turns-ab": lesson(
    ["A slide moves a shape in a straight line.", "A flip makes a mirror image over a line.", "A turn spins a shape around a point."],
    "A shape moves along a line. It does not turn or flip. What is it?",
    ["It only moves in a straight line.", "That is a slide."],
    "A slide",
  ),
  "math/time-ab": lesson(
    ["7 days make a week. About 4 weeks make a month.", "12 months make a year.", "60 minutes make an hour."],
    "Which is longer: a week or a day?",
    ["A week is 7 days.", "7 days is more than 1 day."],
    "A week",
  ),
  "math/mb-skip-counting": lesson(
    ["Find the jump between the numbers.", "Count forward by adding it. Count back by taking it away.", "Check the pattern with the next number."],
    "Count back by 5s: 30, 25, 20, ?",
    ["Each step takes away 5.", "20 − 5 = 15."],
    "15",
  ),
  "math/mb-even-odd": lesson(
    ["Even numbers can make pairs with none left over.", "Odd numbers leave one left over.", "Even numbers end in 0, 2, 4, 6 or 8."],
    "Is 25 even or odd?",
    ["It ends in 5.", "Odd numbers end in 1, 3, 5, 7 or 9."],
    "Odd",
  ),
  "math/mb-calendar": lesson(
    ["7 days make a week. 12 months make a year.", "A year is longer than a month. A month is longer than a week.", "The days go in order, then start over."],
    "Which day comes after Saturday?",
    ["The week starts over.", "After Saturday comes Sunday."],
    "Sunday",
  ),
  "math/mb-turn-and-measure": lesson(
    ["Turning or flipping an object does not change its size.", "Its length stays the same in any direction.", "Measure the same way each time."],
    "A pencil is 15 cm long. You stand it up. How long is it now?",
    ["Standing it up only turns it.", "The pencil is still 15 cm."],
    "15 cm",
  ),
  // Washington
  "math/wa-g2-money": lesson(
    ["Penny 1¢, nickel 5¢, dime 10¢, quarter 25¢, dollar $1 (100¢).", "Count the biggest coins first.", "Then count on with the smaller coins."],
    "A quarter, a dime, a nickel and 2 pennies. How much?",
    ["25¢, then 35¢, then 40¢.", "2 pennies more: 41¢, 42¢."],
    "42¢",
    { type: "coins", coins: [25, 10, 5, 1, 1], currency: "USD" },
  ),
  "math/wa-g2-clock": lesson(
    ["The short hand shows the hour.", "Count by 5s from the 12 to the long hand for the minutes.", "a.m. is morning. p.m. is afternoon and evening."],
    "The short hand is just past 4. The long hand is on the 5.",
    ["The hour is 4.", "5, 10, 15, 20, 25: 25 minutes."],
    "4:25",
    { type: "clock", hour: 4, minute: 25 },
  ),
  "math/wa-g2-inches-feet": lesson(
    ["An inch is about the width of a quarter.", "12 inches make 1 foot. 3 feet make 1 yard.", "To find how much longer, subtract the shorter length."],
    "A ribbon is 14 inches. A string is 9 inches. How much longer is the ribbon?",
    ["14 − 9 = 5."],
    "5 inches",
  ),
  "math/wa-g2-arrays": lesson(
    ["An array has equal rows.", "Add the same number once for each row.", "This is a first step to multiplying."],
    "3 rows with 4 in each row. How many in all?",
    ["4 + 4 + 4 = 12."],
    "12",
    { type: "array", rows: 3, cols: 4, emoji: "🍓" },
  ),
  "math/wa-g2-add-1000": lesson(
    ["Add the hundreds, then the tens, then the ones.", "Regroup 10 ones as a ten, or 10 tens as a hundred.", "10 more or 100 more changes just one digit."],
    "What is 345 + 132?",
    ["300 + 100 = 400.", "40 + 30 = 70.", "5 + 2 = 7.", "400 + 70 + 7 = 477."],
    "477",
  ),
  "math/wa-g2-data": lesson(
    ["Read each bar against the numbers on the side.", "Subtract to find how many more or fewer.", "Add the bars to find how many in all."],
    "Dogs: 12. Cats: 7. How many more chose dogs?",
    ["12 − 7 = 5."],
    "5",
  ),
  // California
  "math/ca-g2-estimate": lesson(
    ["To estimate, round each number to a friendly number, like the nearest ten or hundred.", "Add or subtract the rounded numbers in your head.", "Use the estimate to check: a real answer should be close to it."],
    "About how much is 38 + 41? Round to the nearest ten.",
    ["38 is about 40. 41 is about 40.", "40 + 40 = 80."],
    "about 80",
  ),
  // Texas
  "math/tx-g2-fair-parts": lesson(
    ["Equal parts are the same size. 2 equal parts are halves, 4 are fourths, 8 are eighths.", "The more equal parts a whole has, the smaller each part is.", "One eighth is smaller than one fourth, and one fourth is smaller than one half."],
    "A pizza is cut into 8 equal slices. What is one slice called?",
    ["There are 8 equal parts.", "Each part is one eighth."],
    "one eighth",
  ),
  "math/tx-g2-save-and-borrow": lesson(
    ["Saving a little each week adds up to a larger amount over time.", "A deposit puts money into a bank account. A withdrawal takes money out.", "Responsible borrowers pay back what they borrow, on time."],
    "Ava saves $3 every week. How much has she saved after 5 weeks?",
    ["Add $3 five times: 3, 6, 9, 12, 15."],
    "$15",
  ),
  // New York
  "math/ny-g2-add-four": lesson(
    ["Add the tens together, then the ones together.", "Look for ones that make 10, like 8 and 2.", "Put the tens and ones back together for the total."],
    "23 + 18 + 32 + 14 = ?",
    ["Tens: 20 + 10 + 30 + 10 = 70.", "Ones: 3 + 8 + 2 + 4 = 17.", "70 + 17 = 87."],
    "87",
  ),
  "math/ny-g2-lengths": lesson(
    ["A shorter unit fits more times: 1 foot is 12 inches.", "On a number line, a number is its distance from 0. Jumps right add; jumps left take away.", "A line plot puts an X above each length you measured."],
    "A rug is 2 feet long. Is it more or less than 2 inches long?",
    ["An inch is much shorter than a foot.", "It takes 24 inches to make 2 feet."],
    "More: 24 inches",
  ),
  // California
  "math/ca-g2-add-four": lesson(
    ["Add all the tens.", "Add all the ones.", "Put the tens and ones together. This works because each number is its tens plus its ones."],
    "What is 23 + 14 + 31 + 12?",
    ["Tens: 20 + 10 + 30 + 10 = 70.", "Ones: 3 + 4 + 1 + 2 = 10.", "70 + 10 = 80."],
    "80",
  ),
  "math/ca-g2-length-lines": lesson(
    ["The same length gives a bigger number in a smaller unit: 2 feet is 24 inches.", "On a number line, adding is a jump to the right and subtracting is a jump to the left.", "A line plot puts one X above the number for each measurement."],
    "Start at 0. Jump 25, then jump 13 more. Where do you land?",
    ["0 + 25 = 25.", "25 + 13 = 38."],
    "38",
    { type: "numberLine", min: 0, max: 50, step: 5, labelEvery: 10, jumps: [{ from: 0, to: 25 }, { from: 25, to: 38 }] },
  ),
};

// Math lessons ship with the grade. The other subjects' lessons are a second download, fetched once the grade is in.
export const lessons: GradeLessons = math;
export const moreLessons = () => import("./g2-subjects").then((m) => m.lessons);
