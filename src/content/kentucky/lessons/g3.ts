import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Kentucky's own Grade 3 units, attached in ../g3.ts so they ship in Kentucky's download.
export const LESSONS: GradeLessons = {
  "science/ky-g3-weather-climate": lesson(
    ["Weather is what the air is like today. Climate is the usual weather over many years.", "Read temperature and rain data for each season to describe a climate.", "Kentucky has hot, humid summers and cool winters, with rain all year."],
    "Highs of 30 °F, 28 °F and 32 °F. Which season is it?",
    ["Those are cold temperatures."],
    "winter",
  ),
  "social/ky-g3-kentucky-and-the-world": lesson(
    ["Kentucky trades with the world: it exports cars, horses and farm goods.", "Imports are goods brought in from other countries. Exports are goods sent out.", "People from many places have made Kentucky their home and shared their cultures."],
    "Cars built in Kentucky and sold in Japan are… imports or exports?",
    ["They leave Kentucky.", "Goods sent to another country are exports."],
    "exports",
  ),
  "social/ky-g3-world-inventors": lesson(
    ["Inventors in many places changed how people live.", "Paper and the compass came from China. Gutenberg built a printing press in Germany.", "An invention solves a problem. Ask: what problem did it solve?"],
    "What problem did the printing press solve?",
    ["Before it, books were copied by hand.", "It made books faster and cheaper to make."],
    "copying books by hand was slow",
  ),
  // Borrowed units Kentucky teaches in a different grade from the one their lesson was written for.
  "social/az-g2-continents-oceans": lesson(
    ["There are 7 continents and 5 oceans. We live in North America.", "On a globe, blue is water. Green and brown are land.", "The Arctic is the smallest ocean."],
    "Which continent do we live on?",
    ["Find the United States on a globe.", "It is on the continent of North America."],
    "North America",
  ),
  "social/ny-g5-governments": lesson(
    ["The US has three branches: legislative, executive and judicial.", "Mexico is divided into states, like the US. Canada's head of government is the prime minister.", "Groups like the OAS and UNICEF help countries work together and help children."],
    "Who is the head of government in Canada?",
    ["The US has a president.", "Canada's government is led by a prime minister."],
    "the prime minister",
  ),
  "social/ny-g5-cultures": lesson(
    ["People of the Americas have ancestors from Native nations, Europe, Africa and Asia.", "Languages come from history: Canada uses English and French; Haiti uses French and Haitian Creole; Brazil uses Portuguese.", "Each country has celebrations; Mexico's Independence Day is September 16."],
    "What are Canada's two official languages?",
    ["Canada was colonized by France and Britain.", "Both languages are official."],
    "English and French",
  ),
  "social/or-g5-earn-and-save": lesson(
    ["Income is money you earn. Profit is income minus costs.", "To find earnings, multiply the price by how many times you work.", "To plan saving, divide the goal by how much you save each week."],
    "Sam wants a $45 game and saves $9 each week. How many weeks will it take?",
    ["Divide the goal by the weekly savings.", "45 ÷ 9 = 5."],
    "5 weeks",
  ),
};
