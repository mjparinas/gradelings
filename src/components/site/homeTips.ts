import type { GradeId } from "@/content/types";

// Parent coaching tips ("Help at home", /help-at-home/): for each grade from Pre-K to Grade 9 and each core subject,
// what children are working on and three things a grown-up can do in a few minutes with nothing to buy. Written once
// for every province and state, so nothing here names a curriculum, a place, money, a holiday or a country, and the
// wording avoids words that Canadian and US spelling treat differently. They are ideas, not a report-card mark.

export type TipSubject = "math" | "language" | "science" | "social";
export const TIP_SUBJECTS: readonly TipSubject[] = ["math", "language", "science", "social"];

export interface HomeIdea {
  title: string;
  /** What to do or say, in a sentence or two. */
  text: string;
}

export interface SubjectTips {
  /** What children this age are usually working on. */
  focus: string;
  ideas: readonly HomeIdea[];
}

const i = (title: string, text: string): HomeIdea => ({ title, text });

export const HOME_TIPS: Record<GradeId, Record<TipSubject, SubjectTips>> = {
  pk: {
    math: {
      focus: "Counting to 10, spotting shapes and noticing which group has more.",
      ideas: [
        i("Count what you touch", "Count stairs, grapes or blocks out loud, touching each one once. Ask: how many are there in all?"),
        i("Shape hunt", "Find a circle, a square and a triangle around the house. Which one has corners?"),
        i("More or fewer?", "Make two small piles of snacks or toys and ask which pile has more. Then take one away and look again."),
      ],
    },
    language: {
      focus: "Listening to stories, hearing the first sound in a word and holding a book the right way up.",
      ideas: [
        i("Read it twice", "Read a favourite picture book again and pause so your child can finish a line they remember."),
        i("First sounds", "Say a word like “ball” and ask what sound it starts with. Then find something else that starts the same way."),
        i("Talk about the picture", "Cover the words and ask: what do you think is happening here? Listen to the whole answer."),
      ],
    },
    science: {
      focus: "Looking closely, asking why and sorting living things from non-living things.",
      ideas: [
        i("Float or sink", "Guess first, then drop a few safe objects into a bowl of water. Were you right?"),
        i("Look closely", "Take a leaf or a pebble and look at it up close. Ask your child to tell you three things they notice."),
        i("Weather watch", "Look out the window each morning and say what the weather is. Does it match yesterday?"),
      ],
    },
    social: {
      focus: "Family, helpers, feelings and getting along with others.",
      ideas: [
        i("My family", "Draw or point to the people in your family and say one thing each person does to help."),
        i("Helpers around us", "Spot someone who helps others, such as a driver, a cook or a teacher, and talk about how they help."),
        i("Name the feeling", "When your child has a big feeling, name it together: “You look frustrated.” Then talk about what could help."),
      ],
    },
  },
  k: {
    math: {
      focus: "Counting to 20 and beyond, adding and taking away small numbers, and comparing sizes.",
      ideas: [
        i("Count and show", "Ask for exactly 7 spoons. Do they stop at 7 or keep going? Counting to a target is a real skill."),
        i("Make it 10", "Hold up some fingers and ask how many more make 10. Switch turns."),
        i("Longer or shorter?", "Compare two shoes, two pencils or two paths. Use words like longer, shorter, heavier and lighter."),
      ],
    },
    language: {
      focus: "Letter names and sounds, rhyming, and beginning to write their own name.",
      ideas: [
        i("Letter of the day", "Pick one letter and spot it on signs, boxes and books. Say its sound each time."),
        i("Rhyme time", "Say a word like “cat” and take turns finding words that rhyme, silly ones included."),
        i("Write the name", "Have your child write their name on a drawing. Praise the effort, not just the neatness."),
      ],
    },
    science: {
      focus: "Noticing the five senses, plants and animals, and how things move.",
      ideas: [
        i("Five senses walk", "On a walk, ask: what can you hear? What can you see? What does the bark feel like?"),
        i("Grow something", "Plant a bean or seed in a cup and look at it every day. Draw what changed."),
        i("Push or pull", "Move toys by pushing and pulling. Which goes farther? Which moves more easily?"),
      ],
    },
    social: {
      focus: "Belonging to a family and a class, simple rules, and the place where they live.",
      ideas: [
        i("Why do we have rules?", "Pick one household rule and ask why it helps everyone."),
        i("Map of my room", "Draw a simple map of a room together. Where is the door? Where is the bed?"),
        i("Sharing and turns", "Play a game that needs taking turns and talk about what made it fair."),
      ],
    },
  },
  "1": {
    math: {
      focus: "Adding and taking away within 20, counting by 2s, 5s and 10s, and reading a clock to the hour.",
      ideas: [
        i("Number stories", "Make up a tiny story: “You had 8 grapes and ate 3. How many are left?”"),
        i("Skip counting", "Count by 2s while you climb stairs, and by 5s or 10s while you set the table."),
        i("What time is it?", "Ask your child to read the clock at meal times. Is it before or after the hour?"),
      ],
    },
    language: {
      focus: "Sounding out words, learning common sight words and reading short sentences.",
      ideas: [
        i("Sound it out", "When your child is stuck, say “let's stretch it out” and say each sound slowly, then blend them."),
        i("Sight word spotting", "Pick one word such as “the” and find it on every page of a short book."),
        i("Read to a toy", "A few minutes reading to a stuffed animal is lower pressure. Ask what the toy liked best."),
      ],
    },
    science: {
      focus: "Living things and their needs, materials, and the seasons.",
      ideas: [
        i("What does it need?", "Look at a plant or a pet and ask: what does it need to live? Make a list of three things."),
        i("Material sort", "Gather things that are soft, hard, rough or smooth and sort them into groups."),
        i("Season clues", "Notice what is different outside from last month: the light, the clothes, the animals."),
      ],
    },
    social: {
      focus: "Communities, jobs, and how people long ago and now do things differently.",
      ideas: [
        i("Then and now", "Ask a grandparent or an older neighbour how they did something when they were young."),
        i("Jobs in our town", "Make a list of jobs you see on the way somewhere. What does each person do?"),
        i("Be a good neighbour", "Think of one kind thing the family can do for someone nearby, and do it."),
      ],
    },
  },
  "2": {
    math: {
      focus: "Place value to 100, adding and subtracting two-digit numbers, and measuring with a ruler.",
      ideas: [
        i("Tens and ones", "Show a number like 47 as 4 bundles of ten and 7 ones, using pasta, blocks or coins from a jar."),
        i("Mental math minute", "Ask one quick question during a car ride or walk: 20 plus 15? 50 minus 10?"),
        i("Measure it", "Measure three things in the room with a ruler. Which is longest? By how much?"),
      ],
    },
    language: {
      focus: "Reading with expression, retelling what happened and writing a few sentences.",
      ideas: [
        i("Echo reading", "You read a sentence with feeling, then your child reads it back the same way."),
        i("Beginning, middle, end", "After a book, ask your child to tell the story in three parts."),
        i("Sentence of the day", "Write one sentence together about the day. Check for a capital letter and a period."),
      ],
    },
    science: {
      focus: "Life cycles, solids, liquids and gases, and the effects of heat and light.",
      ideas: [
        i("Solid, liquid or gas?", "Look at ice, water and steam from a kettle (with you in charge) and talk about what changed."),
        i("Shadow play", "Use a lamp or the sun to make shadows. How do you make a shadow bigger or smaller?"),
        i("Life cycle story", "Pick an animal or plant and tell its life story from beginning to end."),
      ],
    },
    social: {
      focus: "Communities near and far, maps, and traditions from different families.",
      ideas: [
        i("Read a simple map", "Draw a map of your street or park with a key. Can someone follow it to find a treasure?"),
        i("Family traditions", "Share a tradition your family keeps and ask your child to explain why it matters."),
        i("Compare two places", "Look at pictures of two different places. What is the same? What is different?"),
      ],
    },
  },
  "3": {
    math: {
      focus: "Multiplication and division ideas, fractions as parts of a whole, and telling time to the minute.",
      ideas: [
        i("Equal groups", "Set out 3 plates with 4 crackers each. How many in all? Write it as 3 × 4."),
        i("Fraction pizza", "Cut a sandwich or a paper circle into equal parts. Which is bigger: one half or one quarter?"),
        i("Times table moment", "Try one table for two minutes while you wait for something. Mix in facts they already know."),
      ],
    },
    language: {
      focus: "Reading chapter books, finding the main idea and writing paragraphs.",
      ideas: [
        i("Why do you think?", "After reading, ask “why do you think the character did that?” and ask for a clue from the page."),
        i("Main idea in one line", "Read a short article and say its main idea in one sentence."),
        i("Paragraph builder", "Write a topic sentence, then two supporting sentences, then an ending."),
      ],
    },
    science: {
      focus: "Forces and motion, the water cycle and plant parts.",
      ideas: [
        i("Ramp test", "Roll a toy car down a ramp made of a book and a board. What happens if the ramp is steeper?"),
        i("Water cycle at home", "Watch a puddle dry or a lid steam up and explain where the water went."),
        i("Plant parts", "Look at a carrot, a leaf and a flower. Which part of a plant is each?"),
      ],
    },
    social: {
      focus: "How communities change, why people move, and how rules and leaders help groups.",
      ideas: [
        i("Why do people move?", "Talk about a reason people leave one place for another, such as work, family or safety."),
        i("Who decides?", "Ask who makes the rules at school, at home and in a game. Are they fair?"),
        i("Old photo talk", "Look at an old photo and ask what is different from today."),
      ],
    },
  },
  "4": {
    math: {
      focus: "Multi-digit multiplication, equivalent fractions, decimals and area.",
      ideas: [
        i("Area of a room", "Measure a rug or a table and work out the area. Does it match the number of square tiles?"),
        i("Same amount, different name", "Show that one half is the same as two quarters and four eighths using paper strips."),
        i("Decimals in the wild", "Spot decimals on labels and measuring jugs and say them out loud."),
      ],
    },
    language: {
      focus: "Reading longer texts, comparing characters and writing stories and opinions with reasons.",
      ideas: [
        i("Compare two characters", "Pick two characters from a book and talk about how they are alike and different."),
        i("Opinion with a reason", "Ask: what is the best snack? Give two reasons, then write them as a short paragraph."),
        i("Read the glossary", "Look at a non-fiction book's glossary and pick three new words to use this week."),
      ],
    },
    science: {
      focus: "Energy, simple circuits, habitats and the rock cycle.",
      ideas: [
        i("Where does the energy go?", "Ask about a toy that moves or lights up. What kind of energy makes it work?"),
        i("Build a habitat", "Draw an animal's habitat and label what it needs: food, water and shelter."),
        i("Rock collection", "Collect a few stones and sort them by colour, texture and weight."),
      ],
    },
    social: {
      focus: "Regions and resources, early peoples and how places and history shape one another.",
      ideas: [
        i("Resources on the table", "Look at a meal and guess where each food was grown or made."),
        i("Read a map key", "Use a map and its key to plan a trip. Which route is shortest?"),
        i("Different points of view", "Pick an event and talk about how two different people might have felt about it."),
      ],
    },
  },
  "5": {
    math: {
      focus: "Fractions and decimals together, volume, and multiplying and dividing larger numbers.",
      ideas: [
        i("Double or halve a recipe", "Change a recipe for twice or half as many people. What happens to 3/4 of a cup?"),
        i("Fraction of a number", "What is 1/4 of 20? What is 3/4 of 20? Explain how you know."),
        i("Estimate first", "Before you add a long list of numbers, guess the total. How close were you?"),
      ],
    },
    language: {
      focus: "Reading for evidence, summarizing and revising writing.",
      ideas: [
        i("Find the proof", "Ask a question about what you read and have your child point to the line that proves the answer."),
        i("Summarize in three sentences", "After a chapter, retell it in just three sentences."),
        i("Improve one sentence", "Pick a plain sentence and make it stronger with a better verb or a detail."),
      ],
    },
    science: {
      focus: "Matter and mixtures, the solar system and how body systems work.",
      ideas: [
        i("Mix and separate", "Stir salt into water, then sand into water. Which one can you separate again, and how?"),
        i("Day and night", "Use a lamp and a ball to show how Earth turning causes day and night."),
        i("Pulse check", "Find your pulse before and after jumping on the spot. Why did it change?"),
      ],
    },
    social: {
      focus: "How people and governments work together, and key events that shaped where they live.",
      ideas: [
        i("Rights and responsibilities", "Talk about a right your child has and the responsibility that goes with it."),
        i("Timeline of a life", "Make a timeline of a family member's life with five important events."),
        i("News in one sentence", "Pick a safe, age-appropriate story and explain what happened, who it affects and why it matters."),
      ],
    },
  },
  "6": {
    math: {
      focus: "Ratios, percents, integers and early algebra.",
      ideas: [
        i("Ratios in a recipe", "If the recipe uses 2 cups of rice for 3 cups of water, how much water for 4 cups of rice?"),
        i("Percent of a number", "Work out 10 percent and 50 percent of a number, then use them to find 15 percent."),
        i("Negative numbers", "Use a thermometer or a temperature chart to talk about numbers below zero."),
      ],
    },
    language: {
      focus: "Analyzing author's choices, writing arguments and using evidence from a text.",
      ideas: [
        i("Why did the author say that?", "Pick a surprising sentence and ask why the author chose those words."),
        i("Argue both sides", "Choose a friendly topic and say two reasons for each side, then pick one."),
        i("Quote it", "Ask your child to back up an opinion with one short quotation from the text."),
      ],
    },
    science: {
      focus: "Electricity, space, ecosystems and classifying living things.",
      ideas: [
        i("Food web", "Draw a simple food web for a pond or backyard. What happens if one animal disappears?"),
        i("Fair test", "Plan a test where only one thing changes, such as which paper towel soaks up the most water."),
        i("Sort by features", "Sort animals or leaves into groups by features and give each group a name."),
      ],
    },
    social: {
      focus: "Early civilizations, how communities are governed and how cultures connect.",
      ideas: [
        i("Then versus now", "Compare how an ancient community solved a problem such as water supply with how we do it now."),
        i("Spot the bias", "Read two short pieces on the same topic and discuss how each one makes you feel."),
        i("Compare two cultures", "Pick two cultures and compare food, clothing or celebrations. What do they share?"),
      ],
    },
  },
  "7": {
    math: {
      focus: "Integers, equations, proportions and the properties of shapes.",
      ideas: [
        i("Solve it like a balance", "Write 3x + 2 = 14 and explain how to do the same thing to both sides to find x."),
        i("Unit rates", "If a tap fills 12 litres in 4 minutes, how many litres is that per minute? Try another rate, such as steps per minute."),
        i("Angles around you", "Spot angles in doors, roofs and signs. Is each acute, right or obtuse?"),
      ],
    },
    language: {
      focus: "Reading for theme, writing with a clear voice and checking reliable sources.",
      ideas: [
        i("What's the theme?", "Ask what the story is really about, beyond what happens. Find two details that show it."),
        i("Trade drafts", "Swap paragraphs and give one kind compliment and one suggestion."),
        i("Is that a good source?", "Look at a website together and ask who wrote it, why, and how you could check it."),
      ],
    },
    science: {
      focus: "Cells, chemical and physical change, and Earth systems.",
      ideas: [
        i("Physical or chemical?", "Cook something and sort the changes: melting, mixing or burning, baking, rusting."),
        i("Look at a cell", "Draw and label a cell from a diagram. Compare plant and animal cells."),
        i("Weather and climate", "Track the weather for a week and explain how weather differs from climate."),
      ],
    },
    social: {
      focus: "Medieval and early modern societies, trade, belief systems and cause and effect in history.",
      ideas: [
        i("Cause and effect chain", "Pick a historical event and draw what caused it and what happened next."),
        i("Primary or secondary?", "Look at a letter or photograph and a textbook paragraph. Which is the primary source?"),
        i("Trade routes", "Follow how one everyday item travels from where it is made to your home."),
      ],
    },
  },
  "8": {
    math: {
      focus: "Linear relationships, the Pythagorean theorem, exponents and data.",
      ideas: [
        i("Graph a pattern", "Make a table of a pattern, such as steps walked each minute, and plot it. What is the slope?"),
        i("Right triangle check", "Measure the sides of a corner. Does a² + b² = c² hold?"),
        i("Read a graph critically", "Find a graph in an article and ask what it shows, what it leaves out and whether the axis is fair."),
      ],
    },
    language: {
      focus: "Analyzing arguments, writing with evidence and reading across texts.",
      ideas: [
        i("Claim, evidence, reasoning", "Make a claim about something at home, give evidence and explain why the evidence supports it."),
        i("Read two views", "Read two pieces on the same topic. Where do they agree and disagree?"),
        i("Tighten it up", "Take a long paragraph and cut it by a quarter without losing the meaning."),
      ],
    },
    science: {
      focus: "Atoms and the periodic table, forces and motion, and genetics basics.",
      ideas: [
        i("Speed, distance, time", "Time a walk to the corner and work out the speed."),
        i("Traits in the family", "Talk about which traits come from which parent and what the environment changes."),
        i("Conservation of mass", "Weigh baking soda and vinegar before and after they react in a sealed bag. What did you find?"),
      ],
    },
    social: {
      focus: "Revolutions, rights and freedoms, and how decisions in the past shape the present.",
      ideas: [
        i("Whose voice is missing?", "Read about an event and ask who is not heard in the account."),
        i("Rights in action", "Pick a current issue and talk about which rights are involved and whose they are."),
        i("Then-now debate", "Choose a past decision and have a family debate: was it the right call at the time?"),
      ],
    },
  },
  "9": {
    math: {
      focus: "Linear and quadratic patterns, algebra with polynomials, probability and reasoning from data.",
      ideas: [
        i("Solve then check", "Solve an equation, then put the answer back in to check it. Make this a habit."),
        i("Probability at the table", "Roll two dice 36 times and compare the results to what you predicted."),
        i("Explain it like a teacher", "Ask your child to teach you a problem they found hard. Teaching shows what they know."),
      ],
    },
    language: {
      focus: "Analyzing complex texts, writing essays and building a strong argument.",
      ideas: [
        i("Thesis in one sentence", "Before an essay, say the main claim in one sentence. Is it arguable?"),
        i("Read the opening and ending", "Compare how a text begins and ends. How did the author change the reader's view?"),
        i("Edit out loud", "Read a paragraph aloud and fix every place you stumble."),
      ],
    },
    science: {
      focus: "Chemical reactions, energy, ecosystems and the scientific method.",
      ideas: [
        i("Design the experiment", "Choose a question, name the variable that changes and the ones that stay the same, then test it."),
        i("Energy audit", "Walk through the house and list where energy is used and how it could be saved."),
        i("Ecosystem change", "Pick an ecosystem and trace how one change, such as a drought, would spread."),
      ],
    },
    social: {
      focus: "Global issues, how systems work, and weighing evidence from several sources.",
      ideas: [
        i("Three sources", "Pick a topic and find three sources. Do they agree? Which would you trust most, and why?"),
        i("Systems thinking", "Choose a system, such as food supply, and map who and what it connects."),
        i("Plan a response", "Pick a local problem and sketch what different groups could do about it."),
      ],
    },
  },
};
