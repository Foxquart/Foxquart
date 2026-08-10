import { z } from "zod";

export const PROJECT_TYPES = [
  "Custom software / ERP",
  "AI & workflow automation",
  "Cloud & DevOps",
  "Data intelligence",
  "Website / landing page",
  "Mobile application",
] as const;

export const TIMELINES = [
  "As soon as possible",
  "Within 3 months",
  "Later this year",
  "Just exploring",
] as const;

/** One-tap call-time preferences; times are read in the sender's own timezone. */
export const PREFERRED_TIMES = [
  "Anytime",
  "Morning (9–12)",
  "Afternoon (12–4)",
  "Evening (4–8)",
] as const;

/**
 * Shared between the form (instant client-side feedback) and POST /api/contact
 * (the authority). Must stay free of secrets and server-only imports — it ships
 * in the client bundle.
 *
 * `website` is a honeypot: humans never see the field, so anything in it means
 * a bot filled the form.
 */
export const contactSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tell us who to address the reply to.")
    .max(200, "That name is too long — 200 characters at most."),
  email: z
    .string()
    .trim()
    .min(1, "We need an address to reply to.")
    .email("That does not look like an email address.")
    .max(320, "That email address is too long."),
  company: z.string().trim().max(200, "Keep the company name under 200 characters.").default(""),
  phone: z.string().trim().max(50, "Keep the phone number under 50 characters.").default(""),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two is enough — what should we look at?")
    .max(5000, "Please keep the message under 5,000 characters."),
  projectType: z.enum(PROJECT_TYPES),
  timeline: z.enum(TIMELINES),
  preferredTime: z.enum(PREFERRED_TIMES).default("Anytime"),
  timezone: z.string().trim().max(100, "Keep this under 100 characters.").default(""),
  website: z.string().max(500).default(""),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
