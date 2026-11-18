import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { diagramFor } from "@/content/geometryDiagrams";
import { QuestionVisual } from "./visuals";

const PROMPTS = [
  "Two lines cross. One angle is 68°. What is the angle vertically opposite to it?",
  "A transversal crosses two parallel lines. One angle measures 143°. How many degrees is a corresponding angle to it?",
  "A transversal crosses two parallel lines. One angle measures 17°. How many degrees is a co-interior angle to it?",
  "Three angles sit side by side on a straight line. Two of them are 59° and 43°. What is the third?",
  "Two angles are complementary. One is x and the other is 4x. What is x?",
  "An angle is split into two parts: 20° and 45°. How big is the whole angle?",
  "In a right triangle, one acute angle is 72°. What is the other acute angle?",
  "The legs of a right triangle are 9 cm and 3 cm. What is the hypotenuse, rounded to 1 decimal place?",
  "A triangle has a base of 7 cm and a height of 18 cm. What is its area, in square centimetres?",
  "Triangle B is an enlargement of triangle A. A side of 6 cm on triangle A matches a side of 12 cm on triangle B. What is the scale factor?",
  "Two rectangles are similar. The small one is 5 cm by 4 cm. The large one is 20 cm long. How wide is the large rectangle?",
  "What is the measure of each interior angle of a regular polygon with 12 sides?",
  "Reflect (3, -4) across the x-axis. Where is the image?",
];

describe("geometry drawings", () => {
  it("draw as labelled images with real coordinates", () => {
    for (const prompt of PROMPTS) {
      const visual = diagramFor(prompt);
      expect(visual, prompt).toBeDefined();
      const html = renderToStaticMarkup(<QuestionVisual visual={visual!} />);
      expect(html, prompt).toContain('role="img"');
      expect(html, prompt).toMatch(/aria-label="[^"]{8,}/);
      expect(html, prompt).not.toMatch(/NaN|Infinity|undefined/);
    }
  });

  it("says in words what the figure shows, including the unknown", () => {
    const html = renderToStaticMarkup(<QuestionVisual visual={diagramFor(PROMPTS[1])!} />);
    expect(html).toContain("143°");
    expect(html).toContain("?");
    expect(html).toContain("two parallel lines");
  });
});
