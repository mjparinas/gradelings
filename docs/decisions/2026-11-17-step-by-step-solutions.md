# Step-by-step worked solutions (November 17, 2026)

Melvin picked this from a short list of ideas drawn from another maths tutor's public site: a board that draws each step of a solution, without AI.

- **Scripted, not AI.** No new provider, cost or child data. A question's prompt is read and worked out by plain code (`src/lib/workedSolution.ts`).
- **Never wrong:** a solution is shown only when its own final answer equals the question's answer.
- **Where:** after a revealed answer (second miss), beside "Show me another way", behind flag `worked-solutions` (off until Melvin has tried it). Free, since hints and "another way" are free. Not logged, scored or synced.
- **First set:** adding and taking away whole numbers and decimals in columns (carrying and borrowing), multiplying and dividing whole numbers, adding and taking away fractions, a percent of a whole number. Single-digit facts are left out.
- **Next:** more patterns (decimal multiplying, fraction of a number, equations), a "your turn" tap on each step, read-aloud of the steps.
