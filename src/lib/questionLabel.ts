/** The longest question text kept on an answer event. */
export const QUESTION_LABEL_MAX = 80;

/**
 * A short, plain version of a question's prompt, stored on answer events so a teacher can see which
 * questions a class misses. Whitespace is collapsed and long prompts are cut with an ellipsis.
 */
export function questionLabel(prompt: string): string {
  const text = prompt.replace(/\s+/g, " ").trim();
  return text.length > QUESTION_LABEL_MAX ? `${text.slice(0, QUESTION_LABEL_MAX - 1).trimEnd()}…` : text;
}
