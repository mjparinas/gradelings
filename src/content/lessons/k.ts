import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "math/make-5-and-10": lesson(
    ["A ten frame has 10 boxes.", "Fill boxes to show a number.", "The empty boxes show what is missing."],
    "Show 7 on a ten frame. How many more make 10?",
    ["Fill 7 boxes.", "3 boxes are empty."],
    "3",
    { type: "tenFrame", filled: 7 },
  ),
  "math/add-and-take-away": lesson(
    ["Adding puts groups together.", "Taking away means some go away.", "Count what is left or what you have in all."],
    "3 birds sit on a branch. 2 more fly in. How many now?",
    ["Start with 3.", "Count on 2 more: 4, 5."],
    "5 birds",
  ),
  "math/more-less-same": lesson(
    ["Match things one to one.", "The group with extras has more.", "If none are left over, the groups are the same."],
    "There are 5 cats and 3 dogs. Which group has more?",
    ["Match each dog to a cat.", "2 cats have no match."],
    "The cats",
  ),
  "math/patterns": lesson(
    ["A pattern repeats the same part again and again.", "Find the part that repeats.", "Say it out loud to find what comes next."],
    "red, blue, red, blue, red, ?",
    ["The part that repeats is red, blue.", "After red comes blue."],
    "blue",
  ),
  "math/shapes-and-sizes": lesson(
    ["A circle is round with no corners.", "A triangle has 3 sides.", "A square and a rectangle each have 4 sides."],
    "Which shape has 3 sides?",
    ["Count the sides on each shape.", "The triangle has 3."],
    "The triangle",
    { type: "shape", shape: "triangle" },
  ),
  "math/likely-or-unlikely": lesson(
    ["Likely means it will probably happen.", "Unlikely means it probably won't happen.", "Think about what usually happens."],
    "Is it likely that the sun comes up tomorrow?",
    ["The sun comes up every day.", "So it will probably happen."],
    "Likely",
  ),
  "math/count-to-10": lesson(
    ["Touch each thing once as you count.", "Say one number for each thing.", "The last number you say is how many."],
    "How many balloons? 🎈🎈🎈🎈",
    ["Touch and count: 1, 2, 3, 4.", "The last number is 4."],
    "4",
    { type: "dots", count: 4, emoji: "🎈" },
  ),
  "math/coins": lesson(
    ["Canadian coins are different sizes and colours.", "A nickel is 5¢. A dime is 10¢. A quarter is 25¢.", "A loonie is $1. A toonie is $2."],
    "Which coin has a beaver on it?",
    ["The nickel has a beaver.", "It is worth 5¢."],
    "The nickel",
    { type: "coins", coins: [5, 10, 25] },
  ),
  "math/numbers-to-20": lesson(
    ["Count each thing once. Do not skip any.", "To count on, say the next number: 14, then 15.", "Counting back goes the other way: 15, 14, 13."],
    "What is 1 more than 14?",
    ["Count on from 14.", "The next number is 15."],
    "15",
    { type: "tenFrame", filled: 10, extra: 4 },
  ),
  "math/coins-and-bills": lesson(
    ["A nickel is 5¢. A dime is 10¢. A quarter is 25¢.", "A loonie is $1. A toonie is $2.", "A bigger number means it is worth more."],
    "Which is worth more, a dime or a nickel?",
    ["A dime is 10¢.", "A nickel is 5¢. 10 is more than 5."],
    "The dime",
    { type: "coins", coins: [5, 10] },
  ),
  "math/see-it-fast-ab": lesson(
    ["Look at the group. Do not count one by one.", "Small groups are easy to see: 1, 2, 3.", "Split a group in two parts, then put them together."],
    "You see 2 dots and 1 dot. How many in all?",
    ["Two and one together.", "That makes 3."],
    "3",
    { type: "dots", count: 3 },
  ),
  "math/first-next-today-ab": lesson(
    ["First happens before next. Last happens at the end.", "Yesterday is before today. Tomorrow is after today.", "Think of what happens in order."],
    "Today is Friday. What day is tomorrow?",
    ["Tomorrow is the day after today.", "After Friday comes Saturday."],
    "Saturday",
  ),
  "math/mb-k-quick-look": lesson(
    ["Look at the dots without counting each one.", "Some patterns are easy to know: 1, 2, 3.", "Put small groups together to find how many."],
    "You see 3 dots and 3 dots. How many?",
    ["Say 3, then count on 3 more.", "That is 6."],
    "6",
    { type: "dots", count: 6 },
  ),
  "math/mb-k-build-3d": lesson(
    ["A ball is round and rolls everywhere.", "A box has flat faces and corners. It stacks well.", "A can has flat ends and rolls on its side."],
    "Which object can stack tall, like blocks?",
    ["A ball rolls away.", "A box has flat faces, so it stacks."],
    "A box",
  ),
  // Washington
  "math/wa-k-count-to-100": lesson(
    ["Count by tens: 10, 20, 30 ... 100.", "You can start counting at any number.", "11 to 19 are ten and some more ones."],
    "10 and 4 more. What number is that?",
    ["Ten ones fill the frame.", "4 more make 14."],
    "14",
    { type: "tenFrame", filled: 10, extra: 4 },
  ),
  "math/wa-k-sort-and-count": lesson(
    ["Sort things into groups that match.", "Count each group.", "The group with the most is the biggest."],
    "3 🍎 and 5 🍌. Which has more?",
    ["Count: 3 apples, 5 bananas.", "5 is more than 3."],
    "🍌",
  ),
  // New York
  "math/ny-k-coins": lesson(
    ["A penny is the one coin that is not silver. It is 1 cent.", "A dime is the smallest coin. It is 10 cents.", "Count pennies one at a time."],
    "You have 3 pennies. You find 2 more. How many now?",
    ["Start at 3.", "Count on 2: 4, 5."],
    "5",
    { type: "coins", coins: [1, 1, 1], currency: "USD" },
  ),
  // Texas
  "math/tx-k-coins": lesson(
    ["A penny is brown. A nickel, dime and quarter are silver.", "The dime is the smallest coin. The quarter is the biggest.", "Look at the size and the picture to name a coin."],
    "A coin is silver and the smallest of all. What is it?",
    ["It is silver, so it is not a penny.", "The smallest silver coin is the dime."],
    "dime",
  ),
  "math/tx-k-earn-and-need": lesson(
    ["People earn money, called income, by working at jobs.", "Money you get without working, like on a birthday, is a gift.", "Needs are things we must have. Wants are nice to have."],
    "Is food a need or a want?",
    ["We must eat to live and grow."],
    "a need",
  ),
  // California
  "math/ca-gk-what-to-measure": lesson(
    ["Some things can be measured: how long, how tall, how heavy.", "You can also measure how much a cup or pot holds.", "One thing can have many measures."],
    "What can you measure about a pumpkin?",
    ["Put it on a scale to see how heavy it is.", "Stand it next to cubes to see how tall it is."],
    "how heavy it is and how tall it is",
  ),
  "math/ca-gk-build-shapes": lesson(
    ["A stick can be one side of a shape.", "A clay ball can be one corner.", "Small shapes can join to make a bigger shape."],
    "How many sticks make a triangle?",
    ["A triangle has 3 sides.", "Use 1 stick for each side."],
    "3 sticks",
    { type: "shape", shape: "triangle" },
  ),
};
