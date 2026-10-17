import { pick, randInt } from "../../random";
import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { fmt, mathUnit, num, pickOne, sup, typed, type Maker } from "./math-kit";

// Florida's own Grade 9 math units (`fl-` ids) for Algebra 1 and Geometry benchmarks no shared unit practises: simple
// and compound interest (MA.912.FL.3.2, 3.4), angle and triangle theorems (MA.912.GR.1.1, 1.3), triangle congruence and
// similarity (MA.912.GR.1.2, 1.6), parallelograms and trapezoids (MA.912.GR.1.4, 1.5), logic (MA.912.LT.4.3, 4.10),
// transformations on the plane (MA.912.GR.2.1, 2.3, 2.5, 2.6), moving a function's graph (MA.912.F.2.1, MA.912.AR.4.3),
// quadratics from their zeros (MA.912.AR.3.5), circles and sectors (MA.912.GR.6.4, 7.2, 7.3), how dilations change area
// and volume (MA.912.GR.4.3, 4.4), dividing a segment in a ratio (MA.912.GR.3.1) and cross-sections and constructions
// (MA.912.GR.4.1, 4.2, 5.1, 5.2, 5.3).

const dollars = (n: number) => `$${(Math.round(n * 100) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const simpleInterest: Maker = (d) => {
  const p = pick([500, 1000, 1500, 2000, 2500, 4000]);
  const r = pick([2, 3, 4, 5, 6]);
  const t = randInt(2, d === 1 ? 4 : 8);
  const i = (p * r * t) / 100;
  const wrong = [p * r * t, i + p, (p * r) / 100, i * 2];
  return pickOne(`How much simple interest does $${p} earn at ${r}% a year for ${t} years?`, dollars(i), [...new Set(wrong.map(dollars))].filter((x) => x !== dollars(i)), `I = P × r × t = ${p} × ${r / 100} × ${t}.`);
};

const simpleTotal: Maker = () => {
  const p = pick([500, 1000, 2000, 3000]);
  const r = pick([2, 4, 5]);
  const t = randInt(2, 5);
  const i = (p * r * t) / 100;
  return pickOne(`You deposit $${p} at ${r}% simple interest. What is the balance after ${t} years?`, dollars(p + i), [dollars(i), dollars(p * (1 + r / 100) ** t), dollars(p + r * t)], `Interest = ${p} × ${r / 100} × ${t} = ${i}. Add it to the $${p}.`);
};

const compound: Maker = () => {
  const p = pick([1000, 2000, 5000]);
  const r = pick([2, 4, 5, 10]);
  const t = randInt(2, 3);
  const a = p * (1 + r / 100) ** t;
  return pickOne(`$${p} grows at ${r}% interest compounded yearly. What is the balance after ${t} years (to the nearest cent)?`, dollars(a), [dollars(p + (p * r * t) / 100), dollars(a + p * 0.1), dollars(p * (1 + (r * t) / 100) + 1)].filter((x) => x !== dollars(a)), `A = P(1 + r)${sup(t)} = ${p} × ${(1 + r / 100).toFixed(2)}${sup(t)}.`);
};

const growthType: Maker = () => {
  const simple = randInt(0, 1) === 1;
  return pickOne(`Which kind of growth does ${simple ? "simple" : "compound"} interest show?`, simple ? "linear growth" : "exponential growth", [simple ? "exponential growth" : "linear growth", "no growth"], simple ? "The same dollars are added each year." : "Interest is earned on earlier interest, so the balance multiplies each year.");
};

const interestRate: Maker = () => {
  const p = pick([1000, 2000, 5000]);
  const r = pick([3, 4, 5, 6]);
  const t = pick([2, 3, 4]);
  const i = (p * r * t) / 100;
  return num(`$${p} earns $${i} in simple interest in ${t} years. What is the yearly interest rate (percent)?`, r, `r = I ÷ (P × t) = ${i} ÷ (${p} × ${t}) = ${r / 100}.`, { min: 1, max: 15 });
};

const INTEREST = mathUnit({
  id: "fl-g9-interest",
  title: "Simple & Compound Interest",
  emoji: "💰",
  blurb: "How savings and loans grow",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.912.FL.3.2 and MA.912.FL.3.4: solving problems with simple and compound interest, and seeing that simple interest grows linearly while compound interest grows exponentially. Compare two savings accounts together.",
  codes: "MA.912.FL.3.2; MA.912.FL.3.4",
  text: "simple and compound interest, and how they relate to linear and exponential growth",
  makers: [simpleInterest, simpleTotal, compound, growthType, interestRate, simpleInterest, compound],
});

const verticalAngles: Maker = () => {
  const x = randInt(2, 12);
  const m = randInt(2, 6);
  const a = m * x + randInt(1, 20);
  return num(`Two lines cross. One angle is ${a}°. What is the angle across from it (the vertical angle)?`, a, "Vertical angles are equal.", { min: 20, max: 170, step: 10, extra: [180 - a] });
};

const linearPair: Maker = () => {
  const a = randInt(25, 150);
  return num(`Two angles form a straight line. One is ${a}°. What is the other?`, 180 - a, `They add to 180°: 180 − ${a}.`, { min: 10, max: 170, step: 10, extra: [90 - a].filter((x) => x > 0) });
};

const transversal: Maker = () => {
  const a = randInt(40, 140);
  const kind = pick(["corresponding", "alternate interior", "co-interior (same-side interior)"]);
  const right = kind.startsWith("co") ? 180 - a : a;
  return num(`A transversal crosses two parallel lines. One angle is ${a}°. What is its ${kind} angle?`, right, kind.startsWith("co") ? "Co-interior angles add to 180° when the lines are parallel." : "These angles are equal when the lines are parallel.", { min: 10, max: 170, step: 10, extra: [180 - a, a] });
};

const triangleSum: Maker = () => {
  const a = randInt(30, 80);
  const b = randInt(30, 80);
  return typed(`Two angles of a triangle are ${a}° and ${b}°. What is the third angle?`, 180 - a - b, `180 − ${a} − ${b}.`, { suffix: "°" });
};

const exterior: Maker = () => {
  const a = randInt(30, 80);
  const b = randInt(30, 80);
  return num(`A triangle has remote interior angles of ${a}° and ${b}°. What is the exterior angle next to the third angle?`, a + b, "The exterior angle equals the sum of the two remote interior angles.", { min: 40, max: 170, step: 10, extra: [180 - a - b] });
};

const isosceles: Maker = () => {
  const apex = pick([20, 30, 40, 50, 80, 100, 120]);
  return num(`An isosceles triangle has a top angle of ${apex}°. What is each base angle?`, (180 - apex) / 2, `(180 − ${apex}) ÷ 2.`, { min: 20, max: 80, step: 5 });
};

const ANGLES = mathUnit({
  id: "fl-g9-angles-triangles",
  title: "Angles & Triangles",
  emoji: "📐",
  blurb: "Use theorems to find angles",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.912.GR.1.1 and MA.912.GR.1.3: using theorems about vertical angles, linear pairs, parallel lines cut by a transversal, the angle sum of a triangle, exterior angles and isosceles triangles to find unknown angles. Each answer can be justified with the theorem it uses.",
  codes: "MA.912.GR.1.1; MA.912.GR.1.3",
  text: "theorems about lines, angles and triangles used to find unknown angle measures",
  makers: [verticalAngles, linearPair, transversal, triangleSum, exterior, isosceles],
});

const CONGRUENT: Q[] = [
  ["Two triangles have three pairs of equal sides. Which rule proves them congruent?", "SSS", ["AAA", "SSA", "ASS"], "Side-Side-Side."],
  ["Two triangles have two pairs of equal sides and the equal angles between them. Which rule proves them congruent?", "SAS", ["SSA", "AAA", "SSS"], "The angle must be between the two sides."],
  ["Two triangles have two pairs of equal angles and the equal side between them. Which rule proves them congruent?", "ASA", ["SSA", "AAA", "SAS"], "The side is between the two angles."],
  ["Two triangles have two pairs of equal angles and an equal side that is NOT between them. Which rule proves them congruent?", "AAS", ["SSA", "SSS", "SAS"], "Angle-Angle-Side."],
  ["Two right triangles have equal hypotenuses and one pair of equal legs. Which rule proves them congruent?", "HL", ["SSA", "AAA", "ASA"], "Hypotenuse-Leg works only for right triangles."],
  ["Which does NOT prove two triangles congruent?", "AAA", ["SSS", "SAS", "ASA"], "Equal angles alone give similar triangles, not necessarily congruent ones."],
  ["Which does NOT prove two triangles congruent in general?", "SSA", ["SSS", "SAS", "ASA"], "The angle must be between the two sides."],
  ["Triangles ABC and DEF are congruent. Angle A matches which angle?", "angle D", ["angle E", "angle F", "angle B"], "Corresponding vertices are listed in the same order."],
  ["If △ABC ≅ △DEF, which side matches AB?", "DE", ["EF", "DF", "BC"], "A↔D and B↔E."],
  ["Corresponding parts of congruent triangles are…", "congruent", ["parallel", "perpendicular", "always right angles"], "CPCTC: corresponding parts of congruent triangles are congruent."],
  ["△ABC ≅ △DEF. AB = 7 and DE = x + 2. What is x?", "5", ["7", "9", "2"], "Matching sides are equal: x + 2 = 7."],
  ["△ABC ≅ △DEF. Angle B = 52°. What is angle E?", "52°", ["38°", "128°", "90°"], "Corresponding angles are equal."],
  ["Two triangles are similar if two angles of one equal two angles of the other. Which rule is this?", "AA", ["SAS", "SSS", "HL"], "Angle-Angle similarity."],
  ["What is true about similar triangles?", "their sides are in proportion and their angles are equal", ["their sides are all equal", "their angles are different", "they are the same size"], "Similar triangles have the same shape."],
  ["Triangle sides 3, 4, 5 and 6, 8, 10 are…", "similar", ["congruent", "neither", "right but unrelated"], "Each side of the second is 2 times the first.", true],
  ["Two similar triangles have a scale factor of 3. A side of 4 in the small one matches what side in the big one?", "12", ["7", "1.3", "81"], "Multiply by the scale factor.", true],
  ["Two similar triangles: sides 5 and 15 match. Another side in the small triangle is 4. What is the matching side?", "12", ["9", "20", "8"], "The scale factor is 15 ÷ 5 = 3.", true],
  ["A tree casts a 12 ft shadow. A 6 ft pole casts a 4 ft shadow. How tall is the tree?", "18 ft", ["8 ft", "24 ft", "16 ft"], "Triangles are similar: 12 ÷ 4 = 3 so 6 × 3.", true],
  ["Which pair of triangles is congruent by SAS?", "sides 5 and 8 with a 40° angle between, in both", ["angles 40°, 60°, 80° in both", "sides 5, 8, 10 and 5, 8, 11", "a 40° angle in both"], "Two sides and the angle between them.", true],
  ["Two triangles have equal angles of 30°, 60°, 90° but different sizes. Are they congruent?", "no, they are similar", ["yes, by AAA", "yes, by SSS", "you cannot tell"], "Same shape, different size.", true],
  ["To prove △ABC ≅ △CDA in a parallelogram ABCD, which side do they share?", "AC", ["AB", "BC", "BD"], "The diagonal AC belongs to both triangles."],
  ["The diagonal of a rectangle makes two triangles that are…", "congruent", ["similar but not congruent", "equilateral", "obtuse"], "The opposite sides are equal."],
  ["If two triangles are congruent, their areas are…", "equal", ["different", "double", "half"], "They have the same size and shape."],
  ["If two similar triangles have a scale factor of 2, their perimeters have a ratio of…", "1 : 2", ["1 : 4", "1 : 8", "2 : 1 in area only"], "Perimeters scale with the scale factor.", true],
  ["If two similar triangles have a scale factor of 2, their areas have a ratio of…", "1 : 4", ["1 : 2", "1 : 8", "1 : 6"], "Areas scale with the square of the scale factor.", true],
  ["A reflection, rotation or translation of a triangle produces a triangle that is…", "congruent to the original", ["only similar", "always larger", "a different shape"], "Rigid motions keep size and shape.", true],
];

const CONGRUENCE = bankUnit({
  id: "fl-g9-congruent-similar-triangles",
  title: "Congruent & Similar Triangles",
  emoji: "🔺",
  blurb: "SSS, SAS, ASA, AAS, HL and AA",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.912.GR.1.2 and MA.912.GR.1.6: proving triangles congruent or similar with SSS, SAS, ASA, AAS, HL and AA, and using congruence or similarity to solve problems. Ask your child to explain why AAA is not enough for congruence.",
  standards: ["MA.912.GR.1.2; MA.912.GR.1.6", "triangle congruence and similarity criteria, and problems that use them"],
  items: CONGRUENT,
});

const parallelogramAngle: Maker = () => {
  const a = randInt(50, 120);
  return num(`In a parallelogram, one angle is ${a}°. What is the angle next to it (a consecutive angle)?`, 180 - a, "Consecutive angles of a parallelogram add to 180°.", { min: 40, max: 140, step: 10, extra: [a] });
};

const parallelogramOpposite: Maker = () => {
  const a = randInt(50, 120);
  return num(`In a parallelogram, one angle is ${a}°. What is the opposite angle?`, a, "Opposite angles of a parallelogram are equal.", { min: 40, max: 140, step: 10, extra: [180 - a] });
};

const diagonal: Maker = () => {
  const half = randInt(3, 12);
  return num(`The diagonals of a parallelogram cross at a point. One diagonal is ${2 * half} long. How far is the crossing point from each end of it?`, half, "The diagonals of a parallelogram bisect each other.", { min: 1, extra: [2 * half] });
};

const midsegment: Maker = () => {
  const a = randInt(4, 14);
  const b = a + 2 * randInt(1, 6);
  return num(`A trapezoid has bases of ${a} and ${b}. How long is its midsegment?`, (a + b) / 2, `Average the bases: (${a} + ${b}) ÷ 2.`, { min: 2, extra: [a + b, b - a] });
};

const isoTrapezoid: Maker = () => {
  const a = randInt(50, 85);
  return num(`In an isosceles trapezoid, one base angle is ${a}°. What is the other angle on the same base?`, a, "Base angles of an isosceles trapezoid are equal.", { min: 40, max: 140, step: 10, extra: [180 - a] });
};

const trapSame: Maker = () => {
  const a = randInt(50, 85);
  return num(`In a trapezoid, one angle on the longer base is ${a}°. What is the angle on the same leg on the shorter base?`, 180 - a, "Angles on the same leg between the parallel bases add to 180°.", { min: 40, max: 140, step: 10, extra: [a] });
};

const QUADS = mathUnit({
  id: "fl-g9-parallelograms-trapezoids",
  title: "Parallelograms & Trapezoids",
  emoji: "🔶",
  blurb: "Use their properties",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.912.GR.1.4 and MA.912.GR.1.5: using the theorems of parallelograms (opposite sides and angles equal, consecutive angles supplementary, diagonals bisect each other) and trapezoids (the midsegment, and equal base angles in an isosceles trapezoid).",
  codes: "MA.912.GR.1.4; MA.912.GR.1.5",
  text: "theorems and problems about parallelograms and trapezoids",
  makers: [parallelogramAngle, parallelogramOpposite, diagonal, midsegment, isoTrapezoid, trapSame],
});

const LOGIC: Q[] = [
  ["The statement 'If it rains, the ground is wet.' has the converse…", "If the ground is wet, it rains.", ["If it does not rain, the ground is not wet.", "If the ground is not wet, it does not rain.", "It rains and the ground is wet."], "The converse swaps the 'if' and 'then' parts."],
  ["The statement 'If it rains, the ground is wet.' has the inverse…", "If it does not rain, the ground is not wet.", ["If the ground is wet, it rains.", "If the ground is not wet, it does not rain.", "It rains."], "The inverse negates both parts."],
  ["The statement 'If it rains, the ground is wet.' has the contrapositive…", "If the ground is not wet, it does not rain.", ["If the ground is wet, it rains.", "If it does not rain, the ground is not wet.", "The ground is wet."], "Swap AND negate."],
  ["A statement and its contrapositive are…", "always both true or both false", ["always opposites", "unrelated", "always both true"], "They are logically equivalent."],
  ["A statement and its converse are…", "not always both true", ["always equal", "always opposite", "the same statement"], "The converse can be false."],
  ["'If a shape is a square, then it has four sides.' Is its converse true?", "no, a rectangle has four sides but is not always a square", ["yes", "only for circles", "yes, always"], "Find a counterexample."],
  ["A counterexample to 'All birds can fly' is…", "a penguin", ["a robin", "a sparrow", "a hawk"], "A counterexample is one case that makes the statement false."],
  ["Which number is a counterexample to 'All prime numbers are odd'?", "2", ["3", "5", "7"], "2 is prime and even."],
  ["Which is a counterexample to 'The sum of two numbers is always bigger than each number'?", "−3 + 1 = −2", ["4 + 5 = 9", "2 + 8 = 10", "6 + 6 = 12"], "Adding a negative makes a sum smaller."],
  ["'A number is even if and only if it is divisible by 2' means…", "both 'if even then divisible by 2' and 'if divisible by 2 then even'", ["only 'if even then divisible by 2'", "only 'if divisible by 2 then even'", "neither is true"], "'If and only if' joins a statement and its converse."],
  ["Which statement can be written with 'if and only if'?", "A triangle is equilateral if and only if all three sides are equal.", ["If it is Monday, it is a school day.", "If you study, you pass.", "All squares are rectangles."], "Both directions are true."],
  ["What does 'not' do to a statement?", "makes it false if it was true", ["makes it true always", "does nothing", "changes only the numbers"], "'Not P' is the opposite of P."],
  ["The negation of 'All dogs bark' is…", "Some dog does not bark.", ["No dogs bark.", "All dogs do not bark loudly.", "Some dog barks."], "One dog that doesn't bark is enough."],
  ["The negation of 'Some cats are black' is…", "No cats are black.", ["All cats are black.", "Some cats are not black.", "No cats are not black."], "If it is false that some are, then none are."],
  ["In 'If P, then Q', P is called the…", "hypothesis", ["conclusion", "converse", "contrapositive"], "The 'if' part."],
  ["In 'If P, then Q', Q is called the…", "conclusion", ["hypothesis", "inverse", "premise"], "The 'then' part."],
  ["An argument is valid when…", "the conclusion must be true if the premises are true", ["the conclusion is interesting", "the premises are false", "it has many words"], "Validity is about the logic."],
  ["Premises: All squares are rectangles. Shape X is a square. What follows?", "Shape X is a rectangle.", ["Shape X is a circle.", "All rectangles are squares.", "Nothing follows."], "A deductive argument."],
  ["Premises: If it is Saturday, there is no school. There is school today. What follows?", "It is not Saturday.", ["It is Saturday.", "It is raining.", "Nothing follows."], "Use the contrapositive.", true],
  ["'If x > 5, then x > 3' is true. Its converse 'If x > 3, then x > 5'…", "is false (x = 4)", ["is true", "is true for all x", "has no counterexample"], "Try x = 4.", true],
  ["A statement is false if you can find…", "one counterexample", ["many examples", "a long proof", "a diagram"], "A single counterexample disproves a general claim.", true],
  ["Which argument is NOT valid? 'If it is a dog, it has fur. This animal has fur. So it is a dog.'", "this one", ["If it is a dog it has fur; it is a dog; so it has fur", "All A are B; x is A; so x is B", "If P then Q; not Q; so not P"], "Affirming the conclusion is not valid.", true],
  ["'If a polygon is a triangle, then it has three sides.' Its converse is true or false?", "true", ["false", "sometimes", "unknown"], "Every polygon with three sides is a triangle.", true],
  ["The inverse of 'If P then Q' is…", "If not P then not Q", ["If Q then P", "If not Q then not P", "P and Q"], "Negate both parts.", true],
  ["The converse of 'If P then Q' is…", "If Q then P", ["If not P then not Q", "If not Q then not P", "P or Q"], "Swap the parts.", true],
  ["The contrapositive of 'If P then Q' is…", "If not Q then not P", ["If Q then P", "If not P then not Q", "Not P or Q"], "Swap and negate.", true],
];

const LOGIC_UNIT = bankUnit({
  id: "fl-g9-logic-statements",
  title: "If…Then Statements",
  emoji: "🧠",
  blurb: "Converse, inverse and counterexamples",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.912.LT.4.3 and MA.912.LT.4.10: interpreting 'if…then', 'if and only if', 'all' and 'not' statements, finding the converse, inverse and contrapositive, judging whether an argument is valid and disproving a claim with a counterexample.",
  standards: ["MA.912.LT.4.3; MA.912.LT.4.10", "if…then statements, their converse, inverse and contrapositive, and counterexamples"],
  items: LOGIC,
});

const reflectX: Maker = () => {
  const x = randInt(-8, 8) || 3;
  const y = randInt(-8, 8) || -2;
  return pickOne(`Reflect (${x}, ${y}) across the x-axis. Where is the image?`, `(${x}, ${-y})`, [`(${-x}, ${y})`, `(${-x}, ${-y})`, `(${y}, ${x})`], "A reflection across the x-axis changes the sign of y.");
};

const reflectY: Maker = () => {
  const x = randInt(-8, 8) || 4;
  const y = randInt(-8, 8) || 5;
  return pickOne(`Reflect (${x}, ${y}) across the y-axis. Where is the image?`, `(${-x}, ${y})`, [`(${x}, ${-y})`, `(${-x}, ${-y})`, `(${y}, ${x})`], "A reflection across the y-axis changes the sign of x.");
};

const rotate90: Maker = () => {
  const x = randInt(-8, 8) || 2;
  const y = randInt(-8, 8) || 6;
  return pickOne(`Rotate (${x}, ${y}) 90° counterclockwise about the origin. Where is the image?`, `(${-y}, ${x})`, [`(${y}, ${-x})`, `(${-x}, ${-y})`, `(${y}, ${x})`], "A 90° counterclockwise rotation sends (x, y) to (−y, x).");
};

const rotate180: Maker = () => {
  const x = randInt(-8, 8) || 5;
  const y = randInt(-8, 8) || -3;
  return pickOne(`Rotate (${x}, ${y}) 180° about the origin. Where is the image?`, `(${-x}, ${-y})`, [`(${-y}, ${x})`, `(${x}, ${-y})`, `(${y}, ${x})`], "A 180° rotation sends (x, y) to (−x, −y).");
};

const translate: Maker = () => {
  const x = randInt(-6, 6);
  const y = randInt(-6, 6);
  const dx = randInt(-5, 5) || 3;
  const dy = randInt(-5, 5) || -2;
  return pickOne(`Translate (${x}, ${y}) by (${dx}, ${dy}). Where is the image?`, `(${x + dx}, ${y + dy})`, [`(${x - dx}, ${y - dy})`, `(${x + dy}, ${y + dx})`, `(${x * dx}, ${y * dy})`], "Add the shift to each coordinate.");
};

const preserve: Maker = () => {
  const items: [string, string, string[]][] = [
    ["Which transformation does NOT preserve distance?", "dilation with scale factor 2", ["reflection", "rotation", "translation"]],
    ["Which transformation changes the size of a figure?", "dilation", ["reflection", "rotation", "translation"]],
    ["Which is a rigid motion?", "rotation", ["dilation by 3", "dilation by 0.5", "stretching one side"]],
    ["Which sequence maps a figure onto a congruent figure?", "a reflection followed by a translation", ["a dilation by 2", "a dilation by 0.5 then a reflection", "stretching"]],
  ];
  const [p, r, w] = pick(items);
  return pickOne(p, r, w, "Rigid motions keep distances. Dilations change them.");
};

const TRANSFORM = mathUnit({
  id: "fl-g9-transformations-plane",
  title: "Transformations on the Plane",
  emoji: "🔁",
  blurb: "Reflect, rotate and translate with coordinates",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.912.GR.2.1, MA.912.GR.2.3, MA.912.GR.2.5 and MA.912.GR.2.6: describing reflections, rotations and translations with coordinates, drawing the image, and using rigid transformations to show figures are congruent. Try plotting a triangle on graph paper and moving it.",
  codes: "MA.912.GR.2.1; MA.912.GR.2.3; MA.912.GR.2.5; MA.912.GR.2.6",
  text: "reflections, rotations and translations on the coordinate plane, and rigid motions that show congruence",
  makers: [reflectX, reflectY, rotate90, rotate180, translate, preserve],
});

const shift: Maker = () => {
  const k = randInt(1, 6);
  const kind = pick(["up", "down", "left", "right"]) as "up" | "down" | "left" | "right";
  const expr = { up: `f(x) + ${k}`, down: `f(x) − ${k}`, left: `f(x + ${k})`, right: `f(x − ${k})` }[kind];
  return pickOne(`How does the graph of ${expr} compare with the graph of f(x)?`, `shifted ${k} unit${k > 1 ? "s" : ""} ${kind}`, (["up", "down", "left", "right"] as const).filter((d) => d !== kind).map((d) => `shifted ${k} unit${k > 1 ? "s" : ""} ${d}`), kind === "up" || kind === "down" ? "Adding outside the function moves the graph up; subtracting moves it down." : "Adding inside the function moves the graph left; subtracting moves it right.");
};

const stretch: Maker = () => {
  const k = pick([2, 3, 4]);
  return pickOne(`How does the graph of ${k}f(x) compare with the graph of f(x)?`, `stretched vertically by a factor of ${k}`, [`stretched horizontally by a factor of ${k}`, `shifted ${k} units up`, `shifted ${k} units right`], "Multiplying the output by k stretches the graph up and down.");
};

const absVertex: Maker = () => {
  const h = randInt(-6, 6) || 2;
  const k = randInt(-6, 6) || -3;
  const hs = h === 0 ? "x" : h < 0 ? `x + ${-h}` : `x − ${h}`;
  const ks = k === 0 ? "" : k < 0 ? ` − ${-k}` : ` + ${k}`;
  return pickOne(`What is the vertex of y = |${hs}|${ks}?`, `(${h}, ${k})`, [`(${-h}, ${k})`, `(${h}, ${-k})`, `(${k}, ${h})`], "In y = |x − h| + k the vertex is (h, k).");
};

const absOpens: Maker = () => {
  const a = pick([2, 3, -1, -2, 0.5]);
  const up = a > 0;
  return pickOne(`Does the graph of y = ${fmt(a)}|x| open up or down?`, up ? "up" : "down", [up ? "down" : "up", "sideways"], up ? "A positive number in front opens it up." : "A negative number in front flips it down.");
};

const FUNCTION_SHIFTS = mathUnit({
  id: "fl-g9-function-shifts",
  title: "Moving a Graph",
  emoji: "↕️",
  blurb: "Shifts, stretches and absolute value graphs",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.912.F.2.1 and MA.912.AR.4.3: how replacing f(x) by f(x) + k, kf(x) or f(x + k) changes a graph, and graphing an absolute value function and finding its vertex.",
  codes: "MA.912.F.2.1; MA.912.AR.4.3",
  text: "how changes to a function's rule move or stretch its graph, and graphing absolute value functions",
  makers: [shift, stretch, absVertex, absOpens, shift, absVertex],
});

/** "− 3" for 3 and "+ 3" for −3, as in (x − 3), (x + 3). */
const sgn = (n: number) => (n < 0 ? `+ ${-n}` : `− ${n}`);

const intercepts: Maker = () => {
  const p = randInt(-5, 5);
  let q = randInt(-5, 5);
  if (q === p) q += 2;
  const a = pick([1, 2, -1, -2, 3]);
  const x0 = pick([p + 1, p - 1, q + 1, q - 1].filter((x) => x !== p && x !== q));
  const y0 = a * (x0 - p) * (x0 - q);
  return pickOne(`A parabola has x-intercepts at ${p} and ${q} and passes through (${x0}, ${y0}). Which equation is it?`, `y = ${a === 1 ? "" : a === -1 ? "−" : a}(x ${sgn(p)})(x ${sgn(q)})`, [`y = ${a + 1}(x ${sgn(p)})(x ${sgn(q)})`, `y = ${a}(x ${sgn(-p)})(x ${sgn(-q)})`, `y = ${-a || 2}(x ${sgn(p)})(x ${sgn(q)})`].filter((x, i, arr) => arr.indexOf(x) === i), `y = a(x − ${p})(x − ${q}). Put in (${x0}, ${y0}) to solve for a: a = ${a}.`);
};

const findA: Maker = () => {
  const p = randInt(-4, 4);
  let q = randInt(-4, 4);
  if (q === p) q += 3;
  const a = pick([1, 2, 3, -1, -2]);
  const x0 = p + 1 === q ? p - 1 : p + 1;
  const y0 = a * (x0 - p) * (x0 - q);
  return num(`A parabola y = a(x ${sgn(p)})(x ${sgn(q)}) passes through (${x0}, ${y0}). What is a?`, a, `Replace x and y: ${y0} = a(${x0 - p})(${x0 - q}).`, { min: -5, max: 5 });
};

const zerosFromEq: Maker = () => {
  const p = randInt(1, 7);
  const q = randInt(1, 7);
  return pickOne(`What are the x-intercepts of y = (x − ${p})(x + ${q})?`, `${p} and ${-q}`, [`${-p} and ${q}`, `${p} and ${q}`, `${-p} and ${-q}`], "Set each factor equal to 0.");
};

const QUAD_ZEROS = mathUnit({
  id: "fl-g9-quadratics-from-zeros",
  title: "Quadratics from Intercepts",
  emoji: "🏹",
  blurb: "Write an equation from its x-intercepts",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.912.AR.3.5: writing the equation of a quadratic function given its x-intercepts and one more point, y = a(x − p)(x − q). The extra point tells you the stretch a.",
  codes: "MA.912.AR.3.5",
  text: "writing a quadratic function from its x-intercepts and another point",
  makers: [intercepts, findA, zerosFromEq, intercepts],
});

const circleCenter: Maker = () => {
  const h = randInt(-6, 6) || 3;
  const k = randInt(-6, 6) || -2;
  const r = randInt(2, 9);
  const hs = h === 0 ? "x" : h < 0 ? `(x + ${-h})` : `(x − ${h})`;
  const ks = k === 0 ? "y" : k < 0 ? `(y + ${-k})` : `(y − ${k})`;
  const eqn = `${hs}${sup(2)} + ${ks}${sup(2)} = ${r * r}`;
  return pickOne(`What is the center of the circle ${eqn}?`, `(${h}, ${k})`, [`(${-h}, ${-k})`, `(${k}, ${h})`, `(${-h}, ${k})`], "In (x − h)² + (y − k)² = r² the center is (h, k).");
};

const circleRadius: Maker = () => {
  const r = randInt(2, 11);
  return num(`A circle has the equation (x − 1)² + (y + 2)² = ${r * r}. What is its radius?`, r, `r² = ${r * r}, so r = ${r}.`, { min: 1, extra: [r * r] });
};

const circleEq: Maker = () => {
  const h = randInt(-5, 5);
  const k = randInt(-5, 5);
  const r = randInt(2, 8);
  const part = (v: string, c: number) => (c === 0 ? `${v}²` : c < 0 ? `(${v} + ${-c})²` : `(${v} − ${c})²`);
  const right = `${part("x", h)} + ${part("y", k)} = ${r * r}`;
  const wrong = [`${part("x", -h)} + ${part("y", -k)} = ${r * r}`, `${part("x", h)} + ${part("y", k)} = ${r}`, `${part("x", k)} + ${part("y", h)} = ${r * r}`].filter((x) => x !== right);
  return pickOne(`Which is the equation of a circle with center (${h}, ${k}) and radius ${r}?`, right, wrong, "Use (x − h)² + (y − k)² = r². Remember to square the radius.");
};

const arcLength: Maker = () => {
  const r = pick([3, 6, 9, 12]);
  const angle = pick([30, 60, 90, 120, 180]);
  const len = (angle / 360) * 2 * r;
  return pickOne(`What is the arc length (in terms of π) of a ${angle}° arc on a circle of radius ${r}?`, `${fmt(len)}π`, [`${fmt(len * 2)}π`, `${fmt(len / 2)}π`, `${fmt((r * angle) / 360)}π`].filter((x, i, a) => a.indexOf(x) === i), `Arc length = (${angle}/360) × 2πr = (${angle}/360) × 2π × ${r}.`);
};

const sectorArea: Maker = () => {
  const r = pick([2, 4, 6, 8]);
  const angle = pick([45, 90, 180, 270]);
  const area = (angle / 360) * r * r;
  return pickOne(`What is the area (in terms of π) of a ${angle}° sector of a circle with radius ${r}?`, `${fmt(area)}π`, [`${fmt(area * 2)}π`, `${fmt(area / 2)}π`, `${fmt((angle / 360) * 2 * r)}π`].filter((x, i, a) => a.indexOf(x) === i), `Sector area = (${angle}/360) × π × ${r}².`);
};

const CIRCLES = mathUnit({
  id: "fl-g9-circles-sectors",
  title: "Circles on the Plane",
  emoji: "⭕",
  blurb: "Equations, arcs and sectors",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.912.GR.6.4, MA.912.GR.7.2 and MA.912.GR.7.3: the equation of a circle (x − h)² + (y − k)² = r², its center and radius, and the arc length and area of a sector. Answers in terms of π keep numbers exact.",
  codes: "MA.912.GR.6.4; MA.912.GR.7.2; MA.912.GR.7.3",
  text: "the equation of a circle, its center and radius, and arc length and sector area",
  makers: [circleCenter, circleRadius, circleEq, arcLength, sectorArea, circleEq],
});

const scaleArea: Maker = () => {
  const k = pick([2, 3, 4, 5]);
  const area = randInt(2, 12) * 3;
  return num(`A figure has an area of ${area} sq cm. It is dilated by a scale factor of ${k}. What is the new area?`, area * k * k, `Area scales by k² = ${k * k}.`, { min: 1, extra: [area * k, area * k * k * k] });
};

const scaleVolume: Maker = () => {
  const k = pick([2, 3, 4]);
  const v = randInt(2, 10);
  return num(`A solid has a volume of ${v} cubic cm. Every length is multiplied by ${k}. What is the new volume?`, v * k ** 3, `Volume scales by k³ = ${k ** 3}.`, { min: 1, extra: [v * k, v * k * k] });
};

const scaleFromArea: Maker = () => {
  const k = pick([2, 3, 4, 5]);
  return num(`A dilation makes the area ${k * k} times larger. What is the scale factor?`, k, `k² = ${k * k}, so k = ${k}.`, { min: 1, extra: [k * k] });
};

const trapezoidArea: Maker = () => {
  const b1 = randInt(4, 12);
  const b2 = b1 + 2 * randInt(1, 4);
  const h = randInt(2, 8) * 2;
  return num(`A trapezoid has bases ${b1} and ${b2} and height ${h}. What is its area?`, ((b1 + b2) * h) / 2, `Area = (b₁ + b₂) × h ÷ 2 = (${b1} + ${b2}) × ${h} ÷ 2.`, { min: 4, extra: [(b1 + b2) * h, b1 * h] });
};

const composite: Maker = () => {
  const w = randInt(4, 10);
  const r = pick([2, 3, 4]);
  const h = 2 * r;
  return pickOne(`A ${w} by ${h} rectangle has a semicircle of radius ${r} added on its ${h} side. Which is the total area?`, `${w * h} + ${fmt((r * r) / 2)}π`, [`${w * h} + ${fmt(r * r)}π`, `${w * h} + ${fmt(r)}π`, `${w * h}`], "Add the rectangle to half a circle: (πr²) ÷ 2.");
};

const DILATION_MEASURES = mathUnit({
  id: "fl-g9-dilations-area-volume",
  title: "Dilations, Area & Volume",
  emoji: "🔬",
  blurb: "How scale changes size",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.912.GR.4.3 and MA.912.GR.4.4: how a dilation by scale factor k changes perimeter (by k), area (by k²) and volume (by k³), and solving area problems for polygons and circles. Doubling every side of a box multiplies its volume by 8.",
  codes: "MA.912.GR.4.3; MA.912.GR.4.4",
  text: "how dilations change length, area and volume, and area problems for polygons and circles",
  makers: [scaleArea, scaleVolume, scaleFromArea, trapezoidArea, composite, scaleArea],
});

const partition: Maker = (d) => {
  const a = randInt(-6, 4);
  const len = pick([6, 8, 10, 12, 15, 18]);
  const b = a + len;
  const [m, n] = pick([[1, 2], [1, 3], [2, 3], [1, 5], [2, 1]]);
  const val = a + (m / (m + n)) * (b - a);
  if (!Number.isInteger(val)) return partition(d);
  return num(`On a number line, point P divides the segment from ${a} to ${b} in the ratio ${m}:${n} (starting from ${a}). What is P?`, val, `P = ${a} + ${m}/${m + n} × (${b} − ${a}).`, { min: -10, max: 25, extra: [(a + b) / 2] });
};

const midpoint: Maker = () => {
  const x1 = randInt(-8, 4);
  const x2 = x1 + 2 * randInt(1, 6);
  const y1 = randInt(-8, 4);
  const y2 = y1 + 2 * randInt(1, 6);
  return pickOne(`Find the midpoint of the segment from (${x1}, ${y1}) to (${x2}, ${y2}).`, `(${(x1 + x2) / 2}, ${(y1 + y2) / 2})`, [`(${x2 - x1}, ${y2 - y1})`, `(${(x1 + x2) / 2}, ${y2 - y1})`, `(${x1 + x2}, ${y1 + y2})`], "Average the x-values and average the y-values.");
};

const SEGMENT = mathUnit({
  id: "fl-g9-segment-ratio",
  title: "Dividing a Segment",
  emoji: "📍",
  blurb: "Weighted averages on a line",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.912.GR.3.1: finding the point that divides a segment in a given ratio, a weighted average of its endpoints, and the midpoint as the special case 1:1.",
  codes: "MA.912.GR.3.1",
  text: "finding the weighted average of two points on a line",
  makers: [partition, midpoint, partition, midpoint],
});

const SLICES: Q[] = [
  ["A plane cuts a cube parallel to one of its faces. The cross-section is a…", "square", ["triangle", "circle", "hexagon"], "It is the same shape as the face."],
  ["A plane cuts a sphere. The cross-section is always a…", "circle", ["square", "triangle", "ellipse only"], "Every slice of a sphere is a circle."],
  ["A plane cuts a cylinder parallel to its base. The cross-section is a…", "circle", ["rectangle", "triangle", "oval"], "It matches the base."],
  ["A plane cuts a cylinder from top to bottom through its axis. The cross-section is a…", "rectangle", ["circle", "triangle", "oval"], "Slicing along the length gives a rectangle."],
  ["A plane cuts a cone parallel to its base. The cross-section is a…", "circle", ["triangle", "rectangle", "square"], "It matches the base but smaller."],
  ["A plane cuts a cone straight down through its tip and the middle of the base. The cross-section is a…", "triangle", ["circle", "rectangle", "square"], "Look at the cone from the side."],
  ["A plane cuts a square pyramid parallel to its base. The cross-section is a…", "square", ["triangle", "circle", "pentagon"], "It matches the base but smaller."],
  ["A plane cuts a rectangular prism parallel to a face. The cross-section is a…", "rectangle", ["triangle", "circle", "hexagon"], "It matches the face."],
  ["Spin a rectangle about one of its sides. You get a…", "cylinder", ["cone", "sphere", "cube"], "A spinning rectangle sweeps out a can shape."],
  ["Spin a right triangle about one of its legs. You get a…", "cone", ["cylinder", "sphere", "pyramid"], "The other leg sweeps out the base."],
  ["Spin a semicircle about its diameter. You get a…", "sphere", ["cylinder", "cone", "cube"], "Half a circle spun around makes a ball."],
  ["Spin a circle about its diameter. You get a…", "sphere", ["cylinder", "cone", "torus"], "A circle spun around a diameter fills a ball."],
  ["Spin a circle about a line that does not touch it. You get a…", "torus (doughnut)", ["sphere", "cone", "cylinder"], "The circle sweeps out a ring.", true],
  ["Spin an isosceles triangle about its line of symmetry. You get a…", "cone", ["cylinder", "sphere", "pyramid"], "The two equal halves sweep out a cone.", true],
  ["To copy a segment with a compass and straightedge, you…", "set the compass to the length and draw an arc from a new point", ["measure with a ruler", "fold the paper", "use a protractor only"], "A compass copies a length."],
  ["To copy an angle with a compass and straightedge, you…", "copy the arc and the chord that cuts the rays", ["measure it with a ruler", "estimate it", "use the Pythagorean theorem"], "Arcs and chords copy the opening."],
  ["To bisect a segment, you draw arcs from both endpoints that…", "have the same radius, longer than half the segment, and meet above and below", ["have different radii", "never cross", "are drawn from the middle"], "The arcs cross on the perpendicular bisector."],
  ["The perpendicular bisector of a segment…", "meets it at the midpoint at a right angle", ["is parallel to it", "touches only one endpoint", "is shorter than half the segment"], "Perpendicular and bisecting."],
  ["To bisect an angle, you…", "draw an arc on both rays and then arcs from those points that cross inside the angle", ["draw a line through the vertex only", "fold the paper twice", "use a ruler to halve the degrees"], "The crossing point lies on the bisector.", true],
  ["The incenter of a triangle (center of its inscribed circle) is the intersection of its…", "angle bisectors", ["perpendicular bisectors", "medians", "altitudes"], "Equidistant from the sides.", true],
  ["The circumcenter of a triangle (center of its circumscribed circle) is the intersection of its…", "perpendicular bisectors", ["angle bisectors", "medians", "altitudes"], "Equidistant from the vertices.", true],
  ["An inscribed circle of a triangle touches…", "all three sides", ["all three vertices", "only one side", "none of the sides"], "It sits inside, tangent to each side.", true],
  ["A circumscribed circle of a triangle passes through…", "all three vertices", ["all three sides", "only one vertex", "no vertices"], "The triangle sits inside it.", true],
  ["The tools used in classic constructions are a…", "compass and straightedge", ["protractor and calculator", "ruler and scissors", "pencil only"], "Classic constructions use a compass and an unmarked straightedge."],
  ["Slicing a cube corner-to-corner through the middle can give a…", "regular hexagon", ["circle", "pentagon", "octagon"], "A diagonal plane through the cube's center cuts six faces.", true],
  ["A vertical slice through the middle of a sphere gives a circle of the…", "same radius as the sphere", ["half radius", "double radius", "smaller radius only"], "A slice through the center is the biggest circle.", true],
  ["A horizontal plane slice through a pyramid's apex only touches the…", "tip (a point)", ["whole base", "a square", "a circle"], "It just touches the top vertex.", true],
];

const SLICES_UNIT = bankUnit({
  id: "fl-g9-cross-sections-constructions",
  title: "Cross-Sections & Constructions",
  emoji: "🧊",
  blurb: "Slices, spins and compass work",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.912.GR.4.1, MA.912.GR.4.2, MA.912.GR.5.1, MA.912.GR.5.2 and MA.912.GR.5.3: the shape of a slice of a solid, the solid made by spinning a flat shape, and the steps of compass-and-straightedge constructions. Slice a piece of fruit to see cross-sections.",
  standards: ["MA.912.GR.4.1; MA.912.GR.4.2; MA.912.GR.5.1; MA.912.GR.5.2; MA.912.GR.5.3", "cross-sections of solids, solids made by rotating a flat shape, and compass-and-straightedge constructions"],
  items: SLICES,
});

export const UNITS: Unit[] = [INTEREST, ANGLES, CONGRUENCE, QUADS, LOGIC_UNIT, TRANSFORM, FUNCTION_SHIFTS, QUAD_ZEROS, CIRCLES, DILATION_MEASURES, SEGMENT, SLICES_UNIT];
/** Put the own units before the planned ones. */
export const FIRST = false;
