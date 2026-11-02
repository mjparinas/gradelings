// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { gradeCertificate } from "@/lib/certificate";
import { PrintCertificate } from "./Certificate";

afterEach(() => vi.restoreAllMocks());

describe("PrintCertificate", () => {
  it("draws the certificate for printing and prints only that", () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<PrintCertificate text={gradeCertificate("Maya", "Grade 4")} />);
    const certificate = document.querySelector("[data-certificate]")!;
    expect(certificate).toHaveTextContent("Maya finished Grade 4!");
    expect(certificate).toHaveTextContent("teacher decides");
    expect(certificate).toHaveAttribute("aria-hidden", "true");
    fireEvent.click(screen.getByRole("button", { name: /print certificate/i }));
    expect(print).toHaveBeenCalledTimes(1);
    expect(document.body).toHaveClass("printing-certificate");
    window.dispatchEvent(new Event("afterprint"));
    expect(document.body).not.toHaveClass("printing-certificate");
  });
});
