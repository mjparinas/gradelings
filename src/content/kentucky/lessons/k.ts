import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Kentucky's own Kindergarten units, attached in ../k.ts so they ship in Kentucky's download.
export const LESSONS: GradeLessons = {
  "social/ky-k-symbols": lesson(
    ["Our country is the United States. Our state is Kentucky.", "The American flag has 50 stars and 13 stripes.", "Kentucky's bird is the cardinal. Its flower is the goldenrod."],
    "What is Kentucky's state bird?",
    ["It is a bright red bird."],
    "the cardinal",
  ),
  "social/ky-k-community-leaders": lesson(
    ["A mayor leads a town. A principal leads a school.", "The governor leads Kentucky. The President leads our country.", "Grown-ups vote to choose many leaders."],
    "Who leads a school?",
    ["This leader helps the whole school."],
    "the principal",
  ),
};
