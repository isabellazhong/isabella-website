import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

/** Where contact-form submissions land. */
const TO_ADDRESS = "isabellazhong888@gmail.com";
/** add in domain once verified */
const FROM_ADDRESS = "Contact Form <contact@isabellazhong.ca>";;

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Returns the trimmed, validated payload or a message describing what's wrong. */
function parseBody(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Invalid request body." };
  const raw = body as Record<string, unknown>;
  const str = (key: string) => (typeof raw[key] === "string" ? (raw[key] as string).trim() : "");

  const data: ContactPayload = {
    firstName: str("firstName"),
    lastName: str("lastName"),
    email: str("email"),
    message: str("message"),
  };

  if (!data.firstName || !data.lastName) return { ok: false, error: "First and last name are required." };
  if (data.firstName.length > MAX_NAME || data.lastName.length > MAX_NAME) {
    return { ok: false, error: `Names must be under ${MAX_NAME} characters.` };
  }
  if (!EMAIL_RE.test(data.email) || data.email.length > MAX_EMAIL) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!data.message) return { ok: false, error: "Message is required." };
  if (data.message.length > MAX_MESSAGE) {
    return { ok: false, error: `Message must be under ${MAX_MESSAGE} characters.` };
  }
  return { ok: true, data };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Email service is not configured." });
  }

  const parsed = parseBody(req.body);
  if (!parsed.ok) return res.status(400).json({ error: parsed.error });

  const { firstName, lastName, email, message } = parsed.data;
  const fullName = `${firstName} ${lastName}`;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    replyTo: email,
    subject: `Portfolio contact from ${fullName}`,
    text: `From: ${fullName} <${email}>\n\n${message}`,
    html: `
      <p><strong>From:</strong> ${escapeHtml(fullName)} &lt;${escapeHtml(email)}&gt;</p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return res.status(502).json({ error: "Could not send your message. Please try again later." });
  }

  return res.status(200).json({ ok: true });
}
