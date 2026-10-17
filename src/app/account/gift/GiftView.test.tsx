// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GiftView } from "./GiftView";

vi.mock("@/components/site/SiteChrome", () => ({
  SitePage: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
  Crumbs: () => null,
}));

const fetchMock = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>();
const answer = (body: unknown, status = 200) => Promise.resolve(new Response(JSON.stringify(body), { status }));
const assign = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  assign.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  Object.defineProperty(window, "location", { value: { search: "", assign, pathname: "/account/gift/" }, writable: true });
});
afterEach(() => vi.unstubAllGlobals());

describe("GiftView", () => {
  it("says gifts aren't open yet and offers no button while the server has them closed", async () => {
    fetchMock.mockImplementation(() => answer({ open: { CAD: false, USD: false } }));
    render(<GiftView />);
    expect(await screen.findByText(/Gifts aren’t open yet|Gifts aren't open yet/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Buy the gift" })).not.toBeInTheDocument();
  });

  it("shows the price once, with tax noted, and sends the buyer to Stripe", async () => {
    fetchMock.mockImplementation((url) => (url === "/api/billing/gift/" && fetchMock.mock.calls.length === 1 ? answer({ open: { CAD: true, USD: false } }) : answer({ url: "https://checkout.stripe.test/g" })));
    render(<GiftView />);
    expect(await screen.findByText("$119.99")).toBeInTheDocument();
    expect(screen.getByText(/once, plus tax/)).toBeInTheDocument();
    expect(screen.queryByRole("radiogroup", { name: "Currency" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Buy the gift" }));
    await waitFor(() => expect(assign).toHaveBeenCalledWith("https://checkout.stripe.test/g"));
    expect(JSON.parse(String(fetchMock.mock.calls[1][1]?.body))).toEqual({ currency: "CAD" });
  });

  it("lets the buyer pick US dollars when both are open", async () => {
    fetchMock.mockImplementation(() => answer({ open: { CAD: true, USD: true } }));
    render(<GiftView />);
    await userEvent.click(await screen.findByRole("radio", { name: "US dollars" }));
    expect(screen.getByText("US$119.99")).toBeInTheDocument();
    expect(screen.getByText(/plus sales tax/)).toBeInTheDocument();
  });

  it("shows the server's message when checkout can't start", async () => {
    fetchMock.mockImplementation((_url, init) => (init?.method === "POST" ? answer({ error: "Too many tries." }, 429) : answer({ open: { CAD: true, USD: false } })));
    render(<GiftView />);
    await userEvent.click(await screen.findByRole("button", { name: "Buy the gift" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Too many tries.");
    expect(assign).not.toHaveBeenCalled();
  });

  it("thanks the buyer after checkout", async () => {
    window.location.search = "?thanks=1";
    fetchMock.mockImplementation(() => answer({ open: { CAD: true, USD: false } }));
    render(<GiftView />);
    expect(await screen.findByText(/Your gift is on its way/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Buy the gift" })).not.toBeInTheDocument();
  });
});
