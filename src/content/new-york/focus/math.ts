// What each New York math course focuses on, shown to parents as the course overview ("Focus areas"), keyed "<grade>/math".
// It follows the domains of the NYS Next Generation Mathematics Learning Standards with the grade's main topics; Grade 9
// is the Algebra I course. Written in the app's house style; New York families see it in US English.

const MATH = (number: string, shapes: string) => [
  `Number and operations: ${number}`,
  `Measurement, data and geometry: ${shapes}`,
  "Mathematical practices: making sense of problems and explaining reasoning",
];

export const FOCUS_MATH: Record<string, string[]> = {
  "k/math": MATH(
    "counting to 100, numbers to 20, and adding and subtracting within 10",
    "naming shapes, comparing lengths and weights, sorting, and meeting pennies and dimes",
  ),
  "1/math": MATH(
    "adding and subtracting within 20, and place value to 120",
    "measuring length, telling time to the half hour, coins, and reading simple graphs",
  ),
  "2/math": MATH(
    "adding and subtracting within 1000, place value, and odd and even numbers",
    "measuring in inches and centimetres, time to five minutes, coins to one dollar, and halves, thirds and fourths",
  ),
  "3/math": MATH(
    "multiplying and dividing within 100, four-digit numbers, and fractions as numbers",
    "area and perimeter, time to the minute, mass and liquid volume, and scaled graphs",
  ),
  "4/math": MATH(
    "multi-digit multiplication and division, equivalent fractions, and decimals to hundredths",
    "converting units, measuring angles, classifying shapes, and line plots",
  ),
  "5/math": MATH(
    "operations with fractions and decimals, powers of 10, and the order of operations",
    "volume, converting units, the coordinate plane, and sorting shapes by their properties",
  ),
  "6/math": MATH(
    "ratios and rates, dividing fractions, negative numbers, and expressions and equations",
    "area, surface area and volume, statistics with the range and measures of centre, and simple probability",
  ),
  "7/math": MATH(
    "proportional relationships, operations with rational numbers, and equations and inequalities",
    "scale drawings, circles and angles, box plots, and the probability of compound events",
  ),
  "8/math": MATH(
    "exponents and scientific notation, linear equations and systems, and functions",
    "transformations, congruence and similarity, the Pythagorean Theorem, volume, and scatter plots",
  ),
  "9/math": [
    "Algebra I: expressions, polynomials, and linear and quadratic equations and inequalities",
    "Functions: linear, exponential and quadratic functions, their graphs and their key features",
    "Statistics: describing data, two-way tables, scatter plots and lines of best fit",
  ],
};
