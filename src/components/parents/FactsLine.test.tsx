// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FactsLine } from "./Reports";

const known = { attempts: 2, recent: [true, true], lastT: 1 };

describe("FactsLine on parent reports", () => {
  it("says how many facts of each practised set the child knows, and which they are still practising", () => {
    const facts = { "mul:7:8": known, "mul:6:6": known, "mul:6:9": { attempts: 1, recent: [false], lastT: 5 }, "add:3:4": known };
    render(<FactsLine name="Maya" grade="4" facts={facts} />);
    const line = screen.getByText(/Math facts:/);
    expect(line).toHaveTextContent("Maya knows 1 of 100 addition facts to 20 and 2 of 100 times-table facts.");
    expect(line).toHaveTextContent("Still practising: 6 × 9.");
    expect(line).toHaveTextContent("This is practice, not a report-card mark.");
  });

  it("is left out until Math Facts has been tried", () => {
    const { container } = render(<FactsLine name="Maya" grade="4" facts={{}} />);
    expect(container).toBeEmptyDOMElement();
  });
});
