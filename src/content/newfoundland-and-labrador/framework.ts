import type { Framework, ProficiencyLevel, ScoringScheme } from "../frameworks";
import { preKScale } from "../prek";
import type { GradeId } from "../types";

// Newfoundland and Labrador (English program). Standards are the key-stage outcomes in the Foundation documents for the Atlantic
// Canada mathematics, English language arts, science and social studies curricula, and in the Atlantic Second Language Core French
// Curriculum, published by the Department of Education and Early Childhood Development (gov.nl.ca/education). Report-card levels
// come from the Newfoundland and Labrador English School District's "K-6 Report Card Support Document" and its policy PROG-317,
// Assessment, Evaluation and Reporting. Sources and the checking record are in docs/research/newfoundland-and-labrador/.

interface LevelText {
  id: string;
  kidLabel: string;
  icon: string;
  colour: string;
  atHome: string;
}

// The four practice steps are the same in every grade; only the report-card wording changes with the grade.
const STEPS: LevelText[] = [
  { id: "step-1", kidLabel: "Seedling", icon: "🌱", colour: "#ff9636", atHome: "Just getting started with this idea. Short, regular practice with lots of support helps most." },
  { id: "step-2", kidLabel: "Sprout", icon: "🌿", colour: "#f5b301", atHome: "Understands parts of it and is building confidence. Keep practising the tricky parts." },
  { id: "step-3", kidLabel: "Tree", icon: "🌳", colour: "#25b47e", atHome: "Has it! Mixed review now and then keeps it strong." },
  { id: "step-4", kidLabel: "Star", icon: "⭐", colour: "#4f8ef7", atHome: "Applies it confidently, even in new or harder situations. Try challenge mode and real-life problems." },
];

type Wording = [label: string, description: string, marks?: string];

function scheme(id: string, name: string, source: string, wording: [Wording, Wording, Wording, Wording], practiceSteps?: boolean): ScoringScheme {
  return {
    id,
    name,
    source,
    ...(practiceSteps && { practiceSteps }),
    levels: STEPS.map(
      (step, i): ProficiencyLevel => ({ ...step, label: wording[i][0], description: wording[i][1], marks: wording[i][2] }),
    ),
  };
}

// Kindergarten to Grade 6: the provincial rating system on the K-6 report card, from "degree to which a child is progressing
// towards achieving curriculum outcomes, up to a point in time".
const K6 = scheme("nl-k6", "Report card ratings", "Newfoundland and Labrador English School District: K-6 Report Card Support Document", [
  ["Not Yet Achieving", "Demonstrates little development towards understanding of knowledge, skills and concepts, and attempts to use them with limited effectiveness. Not meeting the required learning expectation for this point in time.", "1"],
  ["Approaching", "Demonstrates some development towards the understanding of knowledge, concepts and skills, and attempts to use them with some effectiveness. Not meeting, but moving towards meeting, the standard expected for this point in time.", "2"],
  ["Good", "Demonstrates considerable understanding of knowledge, skills and concepts, uses them with considerable effectiveness and produces good work.", "3"],
  ["Excellent", "Demonstrates thorough understanding of knowledge, skills and concepts, uses them with a high degree of effectiveness and produces high-quality work.", "4"],
]);

// Grades 7 to 9: junior high report cards give each course a percentage mark. The department does not publish named bands, so
// these four steps are plain practice steps.
const JUNIOR_HIGH = scheme("nl-79", "Course marks", "Newfoundland and Labrador English School District: Policy PROG-317, Assessment, Evaluation and Reporting", [
  ["Beginning", "Is at an early stage with the outcomes so far. Marks are given as a percentage, and teachers describe next steps in their comments."],
  ["Approaching", "Is moving towards the outcomes so far and applies learning with support."],
  ["Meeting", "Meets the outcomes so far and applies the key concepts and skills to familiar situations."],
  ["Exceeding", "Has a thorough understanding of the outcomes so far and applies learning in new situations."],
], true);

export const NEWFOUNDLAND_AND_LABRADOR: Framework = {
  id: "ca-nl",
  slug: "newfoundland-and-labrador",
  name: "Newfoundland and Labrador",
  shortName: "Newfoundland and Labrador",
  country: "CA",
  curriculumName: "Newfoundland and Labrador Curriculum",
  region: "Newfoundland and Labrador",
  overviewLabel: "Learning focus",
  standardLabel: "Curriculum outcome",
  sourceName: "Newfoundland and Labrador Department of Education and Early Childhood Development",
  sourceUrl: "https://www.gov.nl.ca/education/k12/curriculum/",
  grades: ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  subjects: ["math", "language", "science", "social", "core-french"],
  scoringFor: (grade: GradeId) => (grade === "pk" ? preKScale(K6) : grade === "7" || grade === "8" || grade === "9" ? JUNIOR_HIGH : K6),
  reportCard: {
    title: "Understanding Newfoundland and Labrador report cards",
    intro:
      "From Kindergarten to Grade 6, report cards rate how far your child has come towards the curriculum outcomes at that point in the year, on a four-point scale. In Grades 7 to 9, each course receives a percentage mark. Report cards come home three times a year, in November, March and June.",
    facts: [
      {
        title: "A four-point rating, Kindergarten to Grade 6",
        body: "4 means Excellent, 3 means Good, 2 means Approaching and 1 means Not Yet Achieving. A rating shows how your child is doing up to that point in time, and within each rating there is a range of achievement. Teachers rate several statements in each subject, such as “communicates in oral and written French” or “demonstrates and communicates number sense”.",
      },
      {
        title: "IE and Not Applicable",
        body: "IE means Insufficient Evidence to Evaluate: not enough evidence has been gathered yet to give an accurate rating. Not Applicable means your child has not yet received instruction in that area.",
      },
      {
        title: "Social and behavioural indicators",
        body: "Kindergarten to Grade 6 report cards also describe well-being and belonging, communication, social contribution and, in Kindergarten, play and exploration. These use a different scale: Consistently, Usually, With Prompting and Rarely. They are not part of the subject ratings.",
      },
      {
        title: "Percentage marks, Grades 7 to 9",
        body: "Junior high report cards give each course a mark out of 100. Marks are based on the evidence of how your child is meeting the curriculum outcomes. Under the school district’s policy, a final mark in the range of 46 to 49% is not reported. Ask your child’s teacher how a mark was worked out.",
      },
      {
        title: "Program codes",
        body: "Some students follow the curriculum with adjustments. A program code on the report card, such as PA for “prescribed with accommodations”, shows the programming your child is receiving.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between a 3 and a 4?",
        a: "A 3 (Good) shows considerable understanding and good work. A 4 (Excellent) shows thorough understanding, a high degree of effectiveness and high-quality work.",
      },
      {
        q: "Does a 2 mean my child is failing?",
        a: "No. A 2 (Approaching) means your child is moving towards the standard expected for that point in the year, but is not there yet. It shows where more practice will help.",
      },
      {
        q: "Does Gradelings give a grade?",
        a: "No. Gradelings shows how practice is going on four steps that line up with the report card for your child’s grade, so you can see where your child is strong and where to practise. Your child’s teacher decides the rating or mark.",
      },
      {
        q: "What does IE mean?",
        a: "IE means there was not enough evidence yet to give a rating, for example early in the year or in a part of the curriculum that has only just started.",
      },
      {
        q: "How can I help at home?",
        a: "Ask your child’s teacher which outcomes to focus on, then try short, regular practice (10 to 15 minutes). Celebrate effort and progress, not just results.",
      },
    ],
  },
};
