import { Resend } from "resend";
import { EMAIL_ADDRESS } from "@/lib/site-data";
import type { ContactSubmission } from "@/lib/contact-schema";
import { getDb } from "./db";

const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX_SUBMISSIONS = 5;

export interface SubmissionMeta {
  ipHash: string | null;
  userAgent: string | null;
}

/** Web Crypto so the same code runs on Node (Vercel) and workers alike. */
export async function hashIp(ip: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isRateLimited(ipHash: string): Promise<boolean> {
  const db = getDb();
  const rows = await db`
    SELECT count(*)::int AS recent
    FROM contact_submissions
    WHERE ip_hash = ${ipHash}
      AND created_at > now() - make_interval(mins => ${RATE_LIMIT_WINDOW_MINUTES})
  `;
  return (rows[0]?.recent ?? 0) >= RATE_LIMIT_MAX_SUBMISSIONS;
}

export async function insertSubmission(
  data: ContactSubmission,
  meta: SubmissionMeta,
): Promise<string> {
  const db = getDb();
  const rows = await db`
    INSERT INTO contact_submissions
      (name, email, company, phone, project_type, timeline,
       preferred_time, timezone, message, ip_hash, user_agent)
    VALUES
      (${data.name}, ${data.email}, ${data.company || null}, ${data.phone || null},
       ${data.projectType}, ${data.timeline},
       ${data.preferredTime || null}, ${data.timezone || null}, ${data.message},
       ${meta.ipHash}, ${meta.userAgent})
    RETURNING id
  `;
  return rows[0].id as string;
}

export async function markEmailFailed(id: string): Promise<void> {
  const db = getDb();
  await db`UPDATE contact_submissions SET status = 'email_failed' WHERE id = ${id}`;
}

/**
 * Notifies the team inbox. The sender must be on a Resend-verified domain
 * (foxquart.com) — reply_to points at the visitor so a plain reply from the
 * inbox reaches them directly.
 */
export async function sendNotification(data: ContactSubmission): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set.");

  const to = process.env.CONTACT_TO_EMAIL || EMAIL_ADDRESS;
  const from = process.env.CONTACT_FROM_EMAIL || "Foxquart Website <noreply@foxquart.com>";

  const lines = [
    `New enquiry from the foxquart.com contact form.`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "(not provided)"}`,
    `Phone: ${data.phone || "(not provided)"}`,
    ``,
    `Area: ${data.projectType}`,
    `Timeline: ${data.timeline}`,
    `Preferred time to talk: ${data.preferredTime || "(no preference)"}${
      data.preferredTime && data.timezone ? ` — ${data.timezone}` : ""
    }`,
    ``,
    `Message:`,
    data.message,
  ];

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `Enquiry — ${data.name}${data.company ? ` (${data.company})` : ""}`,
    text: lines.join("\n"),
  });
  if (error) throw new Error(`Resend rejected the notification: ${error.message}`);
}
