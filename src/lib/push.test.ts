import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { disablePush, enablePush, pushState, pushSupported } from "./push";

type Sub = { endpoint: string; unsubscribe: ReturnType<typeof vi.fn> };
let sub: Sub | null;
let permission: NotificationPermission;
let ask: NotificationPermission;
const subscribe = vi.fn(async (opts: { userVisibleOnly: boolean; applicationServerKey: Uint8Array }) => {
  void opts;
  sub = { endpoint: "https://fcm.googleapis.com/fcm/send/new", unsubscribe: vi.fn(async () => true) };
  return sub;
});
const pushManager = { getSubscription: async () => sub, subscribe };
const fetchMock = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>();
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });

beforeEach(() => {
  sub = null;
  permission = "default";
  ask = "granted";
  subscribe.mockClear();
  fetchMock.mockReset();
  const Notification = { get permission() { return permission; }, requestPermission: vi.fn(async () => (permission = ask)) };
  vi.stubGlobal("Notification", Notification);
  vi.stubGlobal("window", { PushManager: class {}, Notification });
  vi.stubGlobal("navigator", { serviceWorker: { getRegistration: async () => ({ pushManager }), ready: Promise.resolve({ pushManager }) } });
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

describe("pushSupported", () => {
  it("needs a service worker, the Push API and notifications", () => {
    expect(pushSupported()).toBe(true);
    vi.stubGlobal("window", { Notification: {} });
    expect(pushSupported()).toBe(false);
    vi.stubGlobal("window", undefined);
    expect(pushSupported()).toBe(false);
  });
});

describe("pushState", () => {
  it("asks the server about this browser's subscription by its address", async () => {
    sub = { endpoint: "https://push.example/a b", unsubscribe: vi.fn() };
    fetchMock.mockResolvedValueOnce(json({ configured: true, subscribed: true }));
    expect(await pushState()).toEqual({ available: true, on: true, blocked: false });
    expect(fetchMock.mock.calls[0][0]).toBe("/api/push/?endpoint=https%3A%2F%2Fpush.example%2Fa%20b");
  });

  it("is off without a browser subscription even if the server remembers one, and reports a block", async () => {
    permission = "denied";
    fetchMock.mockResolvedValueOnce(json({ configured: true, subscribed: true }));
    expect(await pushState()).toEqual({ available: true, on: false, blocked: true });
    expect(fetchMock.mock.calls[0][0]).toBe("/api/push/");
  });

  it("shows nothing when the server can't say", async () => {
    fetchMock.mockResolvedValueOnce(json({}, 500));
    expect(await pushState()).toEqual({ available: false, on: false, blocked: false });
  });
});

describe("enablePush", () => {
  it("subscribes with the server's key and sends only the push address", async () => {
    fetchMock.mockResolvedValueOnce(json({ publicKey: "AQID_-8" })).mockResolvedValueOnce(json({ ok: true }));
    await enablePush();
    // URL-safe base64 decoded to raw bytes: AQID_-8 -> 01 02 03 ff ef
    expect([...subscribe.mock.calls[0][0].applicationServerKey]).toEqual([1, 2, 3, 255, 239]);
    expect(subscribe.mock.calls[0][0].userVisibleOnly).toBe(true);
    const [url, init] = fetchMock.mock.calls[1];
    expect(url).toBe("/api/push/");
    expect(init?.method).toBe("POST");
    expect(JSON.parse(String(init?.body))).toEqual({ endpoint: "https://fcm.googleapis.com/fcm/send/new" });
  });

  it("reuses an existing subscription", async () => {
    sub = { endpoint: "https://push.example/old", unsubscribe: vi.fn() };
    fetchMock.mockResolvedValueOnce(json({ publicKey: "AQID" })).mockResolvedValueOnce(json({ ok: true }));
    await enablePush();
    expect(subscribe).not.toHaveBeenCalled();
    expect(JSON.parse(String(fetchMock.mock.calls[1][1]?.body))).toEqual({ endpoint: "https://push.example/old" });
  });

  it("explains when the server has no keys or the browser blocks notifications", async () => {
    fetchMock.mockResolvedValueOnce(json({ publicKey: "" }));
    await expect(enablePush()).rejects.toThrow("Notifications aren't set up yet.");
    ask = "denied";
    fetchMock.mockResolvedValueOnce(json({ publicKey: "AQID" }));
    await expect(enablePush()).rejects.toThrow(/blocked for this site/);
    expect(subscribe).not.toHaveBeenCalled();
  });

  it("passes on the server's refusal, with a fallback message", async () => {
    fetchMock.mockResolvedValueOnce(json({ publicKey: "AQID" })).mockResolvedValueOnce(json({ error: "Unknown push service." }, 400));
    await expect(enablePush()).rejects.toThrow("Unknown push service.");
    fetchMock.mockResolvedValueOnce(json({ publicKey: "AQID" })).mockResolvedValueOnce(new Response("nope", { status: 500 }));
    await expect(enablePush()).rejects.toThrow("Couldn't turn notifications on.");
  });
});

describe("disablePush", () => {
  it("tells the server to forget the address, then unsubscribes", async () => {
    const unsubscribe = vi.fn(async () => true);
    sub = { endpoint: "https://push.example/x", unsubscribe };
    fetchMock.mockResolvedValueOnce(json({ ok: true }));
    await disablePush();
    expect(fetchMock.mock.calls[0][1]?.method).toBe("DELETE");
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toEqual({ endpoint: "https://push.example/x" });
    expect(unsubscribe).toHaveBeenCalledOnce();
  });

  it("does nothing when this browser isn't subscribed", async () => {
    await disablePush();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
