"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/brand";
import { CONTACT_LIMITS, CONTACT_TOPICS } from "@/lib/contact";

const field = "min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-2 font-read text-lg";

/** The contact page's form. It posts to /api/contact/, which emails our inbox with the parent as Reply-To. */
export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "", website: "" });
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState("");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    setError("");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? `Something went wrong. Please email us at ${CONTACT_EMAIL}.`);
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="card flex flex-col gap-3 p-6" role="status">
        <h2 className="text-2xl font-bold">Thanks, we’ve got your message</h2>
        <p className="font-read text-lg">
          A person reads every message, and we’ll reply to <strong>{form.email}</strong> as soon as we can.
        </p>
        <button
          type="button"
          className="btn min-h-12 self-start px-6 text-lg"
          onClick={() => {
            setForm((f) => ({ ...f, topic: "", message: "" }));
            setState("idle");
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card relative flex flex-col gap-4 p-6" aria-labelledby="contact-form">
      <h2 id="contact-form" className="text-2xl font-bold">
        Send us a message
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 font-semibold">
          Your name <span className="text-sm font-normal text-ink-soft">(optional)</span>
          <input className={field} name="name" autoComplete="name" maxLength={CONTACT_LIMITS.name} value={form.name} onChange={set("name")} />
        </label>
        <label className="flex flex-col gap-1 font-semibold">
          Your email
          <input className={field} name="email" type="email" autoComplete="email" required maxLength={CONTACT_LIMITS.email} value={form.email} onChange={set("email")} />
        </label>
      </div>
      <label className="flex flex-col gap-1 font-semibold">
        What it’s about
        <select className={field} name="topic" required value={form.topic} onChange={set("topic")}>
          <option value="" disabled>
            Pick one
          </option>
          {CONTACT_TOPICS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 font-semibold">
        Message
        <textarea
          className={`${field} min-h-40`}
          name="message"
          required
          minLength={CONTACT_LIMITS.minMessage}
          maxLength={CONTACT_LIMITS.message}
          value={form.message}
          onChange={set("message")}
        />
      </label>
      {/* Left empty by people; bots that fill in every field are dropped quietly. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
        </label>
      </div>
      <p className="font-read text-sm text-ink-soft">Please don’t send passwords or your child’s full name. We only use your email to reply.</p>
      {error && (
        <p role="alert" className="font-read font-semibold text-[#b42318]">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-good min-h-14 self-start px-8 text-xl" disabled={state === "busy"}>
        {state === "busy" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
