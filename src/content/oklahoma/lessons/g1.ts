import { lesson, type GradeLessons } from "../../lessons";

/** Lessons for Oklahoma's own Grade 1 units, keyed "subject/unit-id". */
export const LESSONS: GradeLessons = {
  "social/ok-g1-our-nation": lesson(
    ["The President is the leader of our country.", "People vote to choose leaders. Laws are rules for everyone.", "Our flag, the bald eagle and the Liberty Bell stand for our country."],
    "Which bird stands for the United States?",
    ["It is a big bird with a white head.", "It is the bald eagle."],
    "the bald eagle",
  ),
};
