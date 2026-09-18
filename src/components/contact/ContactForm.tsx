import { useState } from "react";
import type { FormEvent } from "react";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

const FIELD_CLASS =
  "w-full rounded-xl border border-line bg-surface-raised px-4 py-3 text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-accent";
const LABEL_CLASS = "flex flex-col gap-1.5 text-sm font-medium";

/** Posts to /api/contact, which relays the message via Resend with reply-to set to the sender. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      form.reset();
      setStatus({ kind: "sent" });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={LABEL_CLASS}>
          First name
          <input name="firstName" type="text" required maxLength={100} autoComplete="given-name" className={FIELD_CLASS} />
        </label>
        <label className={LABEL_CLASS}>
          Last name
          <input name="lastName" type="text" required maxLength={100} autoComplete="family-name" className={FIELD_CLASS} />
        </label>
      </div>
      <label className={LABEL_CLASS}>
        Email
        <input name="email" type="email" required maxLength={254} autoComplete="email" className={FIELD_CLASS} />
      </label>
      <label className={LABEL_CLASS}>
        Message
        <textarea name="message" required maxLength={5000} rows={6} className={`${FIELD_CLASS} resize-y`} />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-accent px-6 py-2.5 font-display text-sm tracking-wide text-surface-raised uppercase transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send message"}
        </button>
        {status.kind === "sent" && (
          <p role="status" className="text-sm text-ink-soft">
            Thanks! Your message has been sent.
          </p>
        )}
        {status.kind === "error" && (
          <p role="alert" className="text-sm text-accent">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
