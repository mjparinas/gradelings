import { lesson, type GradeLessons } from "./index";

const math: GradeLessons = {
  "math/fraction-operations": lesson(
    ["To add or subtract, use a common denominator.", "To multiply, multiply the tops and multiply the bottoms.", "To divide, flip the second fraction and multiply."],
    "2/3 ÷ 4/5 = ?",
    ["Flip the second fraction: 5/4.", "2/3 × 5/4 = 10/12.", "Simplify: 5/6."],
    "5/6",
  ),
  "math/squares-and-roots": lesson(
    ["A square number is a number times itself: 3² = 3 × 3 = 9.", "A square root undoes a square: √81 = 9.", "A cube is a number multiplied 3 times: 2³ = 2 × 2 × 2 = 8."],
    "What is √81 + 3²?",
    ["√81 = 9, because 9 × 9 = 81.", "3² = 9.", "9 + 9 = 18."],
    "18",
  ),
  "math/ratios-and-rates": lesson(
    ["A ratio compares two amounts, like 2 : 3.", "A rate compares different units, like dollars per pen.", "A unit rate is the amount for 1: divide to find it."],
    "6 pens cost $4.50. What is the price for 1 pen?",
    ["Divide the cost by the number of pens.", "4.50 ÷ 6 = 0.75."],
    "$0.75 per pen",
  ),
  "math/linear-equations": lesson(
    ["Do the same thing to both sides to keep the equation balanced.", "Undo adding and subtracting first.", "Then undo multiplying and dividing."],
    "3x − 5 = 16",
    ["Add 5 to both sides: 3x = 21.", "Divide both sides by 3: x = 7."],
    "x = 7",
  ),
  "math/pythagorean-theorem": lesson(
    ["It works for right triangles only.", "The two shorter sides (legs) are a and b. The longest side, across from the right angle, is c.", "a² + b² = c²."],
    "A right triangle has legs 6 cm and 8 cm. How long is the longest side?",
    ["6² + 8² = 36 + 64 = 100.", "c = √100 = 10."],
    "10 cm",
  ),
  "math/surface-area-volume": lesson(
    ["Surface area is the area of all the faces added up.", "Volume of a cylinder: V = π × r² × h.", "Use π ≈ 3.14."],
    "A cylinder has radius 3 cm and height 5 cm. What is its volume?",
    ["r² = 3 × 3 = 9.", "V ≈ 3.14 × 9 × 5 = 141.3."],
    "About 141.3 cm³",
  ),
  "math/percents-and-money": lesson(
    ["A percent can be more than 100% or less than 1%.", "Percent of a number: change the percent to a decimal and multiply.", "A budget compares money in with money out."],
    "What is 150% of 40?",
    ["150% = 1.5.", "1.5 × 40 = 60."],
    "60",
  ),
  "math/probability-and-data": lesson(
    ["Probability = favourable outcomes ÷ all possible outcomes.", "Mean: add and divide. Median: the middle. Mode: the most common.", "Use whichever measure best describes the data."],
    "Find the mean of 3, 5, 6 and 10.",
    ["Add: 3 + 5 + 6 + 10 = 24.", "Divide by 4: 24 ÷ 4 = 6."],
    "6",
  ),
  "math/numbers-8": lesson(
    ["Scientific notation writes a number as a number from 1 to 10 times a power of 10.", "Multiplying by 10³ moves the decimal point 3 places right.", "Irrational numbers, like π, cannot be written as a fraction."],
    "Write 45 000 in scientific notation.",
    ["Move the point 4 places left: 4.5.", "So 45 000 = 4.5 × 10⁴."],
    "4.5 × 10⁴",
  ),
  "math/integers-8": lesson(
    ["Same signs multiply to a positive. Different signs multiply to a negative.", "Division follows the same sign rules.", "Use the order of operations: brackets, multiply and divide, then add and subtract."],
    "−3 + 4 × (−2) = ?",
    ["Multiply first: 4 × (−2) = −8.", "Then add: −3 + (−8) = −11."],
    "−11",
  ),
  "math/percents-8": lesson(
    ["Percent change = change ÷ original × 100.", "More than 100% means more than the whole.", "For multi-step problems, do one percent at a time."],
    "A price goes from $50 to $60. What is the percent increase?",
    ["Change: 60 − 50 = 10.", "10 ÷ 50 = 0.2 = 20%."],
    "20%",
  ),
  "math/patterns-8": lesson(
    ["A growing pattern adds the same amount each step.", "The rate of change is how much it grows each step. The start is the initial value.", "Rule: start + rate × number of steps."],
    "A pattern starts at 3 and adds 4 each step. What is the value after 5 steps?",
    ["Rule: 3 + 4 × steps.", "4 × 5 = 20.", "3 + 20 = 23."],
    "23",
  ),
  "math/algebra-8": lesson(
    ["Combine like terms only: 2x + 3x = 5x.", "Solve step by step: undo addition or subtraction first, then multiplication.", "An inequality, like x > 3, has many answers. Show it on a number line."],
    "Solve 4x − 5 = 11.",
    ["Add 5 to both sides: 4x = 16.", "Divide by 4: x = 4."],
    "x = 4",
  ),
  "math/data-8": lesson(
    ["A scatter plot shows two sets of data as points.", "Points that rise together show a positive relationship.", "A point far from the pattern is an outlier."],
    "As study time goes up, test scores go up. What kind of relationship is that?",
    ["Both values rise together.", "That is a positive relationship."],
    "Positive",
  ),
  "math/chance-8": lesson(
    ["A tree diagram lists every outcome of several events.", "Multiply along the branches to get the chance of a path.", "Dependent events change the chances of the next step."],
    "A coin is flipped and a die is rolled. How many outcomes are there?",
    ["The coin has 2 outcomes.", "The die has 6 outcomes.", "2 × 6 = 12."],
    "12",
  ),
  "math/transformations-8": lesson(
    ["A translation slides, a reflection flips, a rotation turns and a dilation resizes.", "A tessellation covers a surface with copies of a shape with no gaps.", "On a grid, a translation adds to or subtracts from x and y."],
    "Translate (1, 2) right 3 and down 4.",
    ["Right 3: x = 1 + 3 = 4.", "Down 4: y = 2 − 4 = −2."],
    "(4, −2)",
  ),
  "math/scale-8": lesson(
    ["A scale factor compares drawing length to real length.", "Multiply lengths by the scale factor. Areas change by the factor squared.", "Top, front and side views show a model from three sides."],
    "A model uses a scale of 1:20. A real door is 200 cm tall. How tall is the model?",
    ["Divide by 20.", "200 ÷ 20 = 10."],
    "10 cm",
  ),
  "math/measure-8": lesson(
    ["Break a composite shape into simple shapes.", "Find the area or volume of each part, then add them.", "Very large and small metric units, like kilometres and micrometres, follow the same powers of 10."],
    "An L-shape is a 6 by 4 rectangle plus a 2 by 3 rectangle. What is its area?",
    ["6 × 4 = 24.", "2 × 3 = 6.", "24 + 6 = 30."],
    "30 square units",
  ),
  "math/angles-8": lesson(
    ["Angles on a straight line add to 180°.", "The angles in a triangle add to 180°.", "When two lines cross, opposite angles are equal."],
    "Two angles on a straight line: one is 115°. What is the other?",
    ["Together they make 180°.", "180 − 115 = 65."],
    "65°",
  ),
  "math/money-8": lesson(
    ["Simple interest = principal × rate × time.", "Compound interest adds interest to the amount, so it grows faster.", "Compare the total cost, not just the monthly payment."],
    "Find the simple interest on $500 at 4% for 3 years.",
    ["One year: 4% of $500 = $20.", "Three years: $20 × 3 = $60."],
    "$60",
  ),
  "math/squares-roots-ab": lesson(
    ["A square root undoes squaring: since 7 × 7 = 49, the square root of 49 is 7.", "A perfect square has a whole-number square root.", "To estimate, find the two perfect squares on either side."],
    "Estimate the square root of 20.",
    ["16 is 4², and 25 is 5².", "20 is between them, a bit closer to 16."],
    "About 4.5",
  ),
  "math/percents-ab": lesson(
    ["Change a fraction to a percent: divide, then multiply by 100.", "Sales tax is a percent of the price, added at the till.", "For two taxes, add each percent of the price."],
    "A $80 item has 5% tax. What is the tax?",
    ["5% = 0.05.", "0.05 × 80 = 4."],
    "$4",
  ),
  "math/linear-relations-ab": lesson(
    ["A table pairs each x with a y.", "Plot each pair as a point. A straight line means a linear relation.", "Look at how y changes each time x goes up by 1."],
    "x = 0, 1, 2 gives y = 3, 5, 7. What is y when x = 3?",
    ["y goes up by 2 each time.", "7 + 2 = 9."],
    "9",
  ),
  "math/bracket-equations-ab": lesson(
    ["Undo brackets by dividing both sides, or by expanding.", "Do the same thing to both sides.", "Check by putting your answer back into the equation."],
    "Solve 2(x + 3) = 14.",
    ["Divide both sides by 2: x + 3 = 7.", "Subtract 3: x = 4."],
    "x = 4",
  ),
  "math/nets-views-ab": lesson(
    ["A net is a 3-D object folded flat.", "A rectangular prism's net has 6 rectangles.", "Top, front and side views show how it looks from three directions."],
    "How many faces are in the net of a cube?",
    ["A cube has 6 faces.", "Its net shows all 6 flat."],
    "6",
  ),
  "math/congruence-ab": lesson(
    ["Congruent shapes have the same size and shape.", "Slides, flips and turns keep a shape congruent.", "Matching sides and angles are equal."],
    "A triangle is slid across the page. Is the new triangle congruent?",
    ["A slide does not change size or shape.", "So the triangles match."],
    "Yes",
  ),
  "math/graph-critique-ab": lesson(
    ["Choose a graph that fits: circle for parts of a whole, line for change over time.", "Read the scale. A cut-off axis can make small differences look big.", "Ask who made the graph and what it leaves out."],
    "A bar graph's axis starts at 90 instead of 0. Why can that mislead?",
    ["Small differences look large.", "The bars no longer match the real sizes."],
    "It exaggerates differences",
  ),
  "math/independent-events-ab": lesson(
    ["Independent events do not change each other's chances.", "Multiply their probabilities to find the chance of both.", "A tree diagram can check your answer."],
    "A coin lands heads and a die lands on 6. What is the probability of both?",
    ["Heads: 1/2.", "Six: 1/6.", "1/2 × 1/6 = 1/12."],
    "1/12",
  ),
  "math/mb-nets-8": lesson(
    ["A net is a 3-D object folded flat.", "A cylinder's net has two circles and one rectangle.", "Each face on the net must match a face of the object."],
    "How many faces does the net of a triangular prism have?",
    ["Two triangle bases.", "Three rectangles.", "2 + 3 = 5."],
    "5",
  ),
  "math/mb-views-8": lesson(
    ["Top, front and side views show a stack of cubes from three directions.", "Count the cubes you can see in each column.", "Hidden cubes still count in the real object."],
    "A stack has 3 cubes in a tower and 1 beside it. How many cubes in all?",
    ["3 + 1 = 4."],
    "4",
  ),
  // Washington
  "math/wa-g8-exponent-rules": lesson(
    ["Multiply powers with the same base: add the exponents.", "Divide: subtract the exponents. Power of a power: multiply them.", "a⁰ = 1, and a⁻ⁿ = 1/aⁿ."],
    "Simplify 2³ × 2⁴.",
    ["Same base, so add: 3 + 4 = 7."],
    "2⁷",
  ),
  "math/wa-g8-systems": lesson(
    ["The solution is the point that works in both equations.", "Set the two expressions for y equal and solve for x, then find y.", "Same slope, different intercept: no solution. Same line: infinitely many."],
    "Where do y = 2x + 1 and y = x + 4 meet?",
    ["2x + 1 = x + 4, so x = 3.", "y = 3 + 4 = 7."],
    "(3, 7)",
  ),
  "math/wa-g8-functions": lesson(
    ["A function gives each input exactly one output.", "A repeated x with two different y-values is not a function.", "A linear function has a constant rate of change: y = mx + b."],
    "Is {(1, 4), (2, 5), (1, 6)} a function?",
    ["The input 1 has two outputs, 4 and 6."],
    "No",
  ),
  "math/wa-g8-round-volume": lesson(
    ["Cylinder: V = πr²h.", "Cone: V = ⅓πr²h, one third of the matching cylinder.", "Sphere: V = (4/3)πr³."],
    "A cylinder has radius 3 cm and height 5 cm. What is its volume, in terms of π?",
    ["r² = 9.", "9 × 5 = 45."],
    "45π cm³",
  ),
  "math/wa-g8-slope": lesson(
    ["Slope = change in y ÷ change in x.", "In y = mx + b, m is the slope and b is the starting value.", "For a proportional graph, the slope is the unit rate."],
    "What is the slope through (1, 2) and (4, 11)?",
    ["Change in y: 11 − 2 = 9.", "Change in x: 4 − 1 = 3.", "9 ÷ 3 = 3."],
    "3",
  ),
  "math/wa-g8-two-way-tables": lesson(
    ["A two-way table sorts data by two questions at once.", "Find a row, then read across to the column.", "Compare row percents to look for an association."],
    "20 students play sports; 15 of them have a pet. What percent of them have a pet?",
    ["15 ÷ 20 = 0.75.", "0.75 = 75%."],
    "75%",
  ),
  // Texas
  "math/tx-g8-both-sides": lesson(
    ["Get the variable on one side: subtract the smaller x term from both sides.", "Then undo adding or subtracting, and divide by the number in front of x.", "Check by putting the answer back into both sides."],
    "Solve 5x + 2 = 3x + 10.",
    ["Subtract 3x from both sides: 2x + 2 = 10.", "Subtract 2: 2x = 8.", "Divide by 2: x = 4."],
    "x = 4",
  ),
  "math/tx-g8-credit-and-saving": lesson(
    ["A higher interest rate or a longer loan makes credit cost more.", "Simple interest: I = Prt. Compound interest adds each year's interest to the balance.", "To plan for college, find the cost, subtract what you have, and divide by the time left."],
    "You borrow $2,000 at 5% simple interest for 3 years. What do you repay in all?",
    ["Interest: 2,000 × 0.05 × 3 = 300.", "Total: 2,000 + 300 = 2,300."],
    "$2,300",
  ),
  // New York
  "math/ny-g8-distance": lesson(
    ["Draw a right triangle between the two points: one leg across, one leg up or down.", "The legs are the differences of the x-coordinates and of the y-coordinates.", "Use a² + b² = c². The distance is c."],
    "What is the distance between (1, 2) and (4, 6)?",
    ["Across: 4 − 1 = 3. Up: 6 − 2 = 4.", "3² + 4² = 9 + 16 = 25.", "c = √25 = 5."],
    "5 units",
  ),
  "math/ny-g8-linear-models": lesson(
    ["A line of best fit y = mx + b models two-variable data.", "Put a value in for x to predict y.", "The slope m is the change in y for each 1 more in x. The intercept b is the predicted y when x is 0."],
    "Test score y and hours of study x fit y = 5x + 60. Predict the score for 4 hours.",
    ["y = 5 × 4 + 60.", "y = 20 + 60 = 80."],
    "80 points",
  ),
  // California
  "math/ca-g8-similar-distance": lesson(
    ["Rotations, reflections and translations keep size and shape; a dilation changes size only.", "Figures are similar if one can be turned into the other with these moves.", "To find the distance between two points, draw a right triangle and use a² + b² = c²."],
    "What is the distance between (1, 2) and (4, 6)?",
    ["Horizontal leg: 4 − 1 = 3. Vertical leg: 6 − 2 = 4.", "3² + 4² = 9 + 16 = 25.", "√25 = 5."],
    "5",
  ),
  "math/ca-g8-linear-models": lesson(
    ["A line of best fit y = mx + b models data.", "The slope m is the change in y for each 1 more x.", "The y-intercept b is the model's value of y when x is 0."],
    "A plant's height is modelled by y = 2x + 6 (cm, x in weeks). Predict the height at 5 weeks.",
    ["y = 2 × 5 + 6.", "y = 16."],
    "16 cm",
  ),
};

// Math lessons ship with the grade. The other subjects' lessons are a second download, fetched once the grade is in.
export const lessons: GradeLessons = math;
export const moreLessons = () => import("./g8-subjects").then((m) => m.lessons);
