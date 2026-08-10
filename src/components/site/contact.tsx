import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Copy, ExternalLink, Mail, Phone, Send } from "lucide-react";
import { Section, SectionHeading } from "./ui";
import {
  EMAIL_ADDRESS,
  GMAIL_COMPOSE_URL,
  MAILTO_TEMPLATE_URL,
  PHONE_NUMBERS,
} from "@/lib/site-data";

const projectTypes = [
  "Custom software / ERP",
  "AI & workflow automation",
  "Cloud & DevOps",
  "Data intelligence",
  "Website / landing page",
  "Mobile application",
];
const budgets = [
  "Not sure yet",
  "Under $10k",
  "$10k – $30k",
  "$30k – $75k",
  "$75k – $200k",
  "$200k+",
];
const timelines = ["ASAP", "1–3 months", "3–6 months", "Exploring options"];

/**
 * The form has no backend. It composes an email and hands it to the visitor's own mail
 * client, so `status` describes what happened to that handoff — never "we received it".
 * "gmail" and "client" are the two handoff routes; "blocked" is a popup the browser ate.
 */
type Status = "idle" | "gmail" | "client" | "blocked";
type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState(projectTypes[0]);
  const [budget, setBudget] = useState(budgets[0]);
  const [timeline, setTimeline] = useState(timelines[3]);
  const [preferredTime, setPreferredTime] = useState("");
  const [timezone, setTimezone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  const formRef = useRef<HTMLFormElement>(null);
  const statusHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasHandedOff = useRef(false);

  // Resolved after mount so the server-rendered HTML and the first client render match.
  useEffect(() => {
    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone ?? "");
    } catch {
      setTimezone("");
    }
  }, []);

  // The form and the status panel replace each other, so focus would otherwise land on
  // <body> and the keyboard user would lose their place.
  useEffect(() => {
    if (status !== "idle") {
      hasHandedOff.current = true;
      statusHeadingRef.current?.focus();
    } else if (hasHandedOff.current) {
      formRef.current?.querySelector<HTMLElement>("#name")?.focus();
    }
  }, [status]);

  const draft = buildDraft({
    name,
    email,
    company,
    phone,
    message,
    type,
    budget,
    timeline,
    preferredTime,
    timezone,
  });
  const gmailUrl = composeUrl("gmail", draft);
  const mailtoUrl = composeUrl("mailto", draft);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Tell us who to address the reply to.";
    if (!email.trim()) next.email = "We need an address to reply to.";
    else if (!EMAIL_PATTERN.test(email.trim()))
      next.email = "That does not look like an email address.";
    if (message.trim().length < 10)
      next.message = "A sentence or two is enough — what should we look at?";
    return next;
  };

  const handOff = (route: "gmail" | "client") => {
    const found = validate();
    setErrors(found);

    const firstInvalid = (["name", "email", "message"] as FieldName[]).find((f) => found[f]);
    if (firstInvalid) {
      setNotice("Nothing was sent. Check the highlighted fields below.");
      formRef.current?.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return;
    }

    setNotice("");
    setCopied("idle");

    if (route === "client") {
      // A mailto: navigation hands off to the OS handler and leaves the page in place.
      // There is no way to detect whether a handler exists, so the panel says "should".
      window.location.href = mailtoUrl;
      setStatus("client");
      return;
    }

    // No `noopener` here on purpose: it forces window.open to return null, and we need the
    // handle to tell whether the popup was blocked rather than claim a tab we never opened.
    const opened = window.open(gmailUrl, "_blank");
    setStatus(opened ? "gmail" : "blocked");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handOff("gmail");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${draft.subject}\n\n${draft.body}`);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
  };

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Talk to the engineer who would build it, not a salesperson."
            intro="Send the details and we reply from a real inbox, usually within one business day, with an agenda and an honest first opinion."
          />
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            {[
              "30 minutes, no pitch deck",
              "You leave with a prioritised shortlist of what to automate first",
              "NDA available before the call on request",
            ].map((l) => (
              <li key={l} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /> {l}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="font-mono text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Call us
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {PHONE_NUMBERS.map((p) => (
                  <li key={p.raw}>
                    <a
                      href={p.tel}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 font-mono text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <Phone className="size-3.5 text-primary" aria-hidden="true" /> {p.formatted}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Email us directly
              </h3>
              <div className="mt-3 flex flex-col items-start gap-2">
                <a
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <Mail className="size-4 text-primary" aria-hidden="true" /> Blank template in
                  Gmail
                  <ExternalLink className="size-3.5 text-muted-foreground" aria-hidden="true" />
                </a>
                <a
                  href={MAILTO_TEMPLATE_URL}
                  className="inline-flex min-h-11 items-center font-mono text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {EMAIL_ADDRESS}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 sm:p-7">
          {status === "idle" ? (
            <form ref={formRef} className="grid gap-6" onSubmit={handleSubmit} noValidate>
              <p className="text-sm text-muted-foreground">
                This form has no send button of ours behind it. It opens a draft in your own mail
                app with these details filled in — nothing reaches us until you press send there.
                See our{" "}
                <Link
                  to="/privacy"
                  className="text-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  privacy policy
                </Link>
                .
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" id="name" error={errors.name} required>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-required="true"
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputCls}
                  />
                </Field>
                <Field label="Email for the reply" id="email" error={errors.email} required>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck={false}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-required="true"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputCls}
                  />
                </Field>
                <Field label="Company" id="company" hint="Optional">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    aria-describedby="company-hint"
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone" id="phone" hint="Optional. Include your country code.">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-describedby="phone-hint"
                    className={inputCls}
                  />
                </Field>
              </div>

              <Choice
                label="What is this about?"
                name="project-type"
                options={projectTypes}
                value={type}
                onChange={setType}
              />
              <Choice
                label="Budget range"
                name="budget"
                options={budgets}
                value={budget}
                onChange={setBudget}
              />
              <Choice
                label="Timeline"
                name="timeline"
                options={timelines}
                value={timeline}
                onChange={setTimeline}
              />

              <Field
                label="When suits you for a call?"
                id="preferred-time"
                hint={
                  timezone
                    ? `Optional, in your own words. We read it as ${timezone} and confirm by email before anything is booked.`
                    : "Optional, in your own words. We confirm the time by email before anything is booked."
                }
              >
                <input
                  id="preferred-time"
                  name="preferred-time"
                  type="text"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  aria-describedby="preferred-time-hint"
                  placeholder="Weekday mornings, or Thursday after 15:00"
                  className={inputCls}
                />
              </Field>

              <Field
                label="What process is costing you the most?"
                id="message"
                error={errors.message}
                required
              >
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-required="true"
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  placeholder="We reconcile 400 supplier invoices a month by hand…"
                  className={`${inputCls} min-h-32 resize-y`}
                />
              </Field>

              {/* Persistent live region: it must already be in the DOM for a screen reader
                  to announce the validation result when `notice` changes. */}
              <div className="grid gap-3">
                <p role="status" aria-live="polite" className="text-sm text-primary">
                  {notice}
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <button type="submit" className={primaryBtnCls}>
                    Open this in Gmail <Send className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handOff("client")}
                    className={secondaryBtnCls}
                  >
                    <Mail className="size-4 text-primary" aria-hidden="true" /> Open in my mail app
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="grid gap-5">
              <span className="grid size-11 place-items-center rounded-full border border-border bg-surface-2">
                {status === "blocked" ? (
                  <Mail className="size-5 text-primary" aria-hidden="true" />
                ) : (
                  <Check className="size-5 text-primary" aria-hidden="true" />
                )}
              </span>

              {/* The form has unmounted, so focus is moved to this heading as well as
                  announcing the region — a newly inserted live region alone is unreliable. */}
              <div role="status" aria-live="polite">
                <h3
                  ref={statusHeadingRef}
                  tabIndex={-1}
                  className="font-display text-xl font-semibold text-balance text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  {status === "gmail"
                    ? "Your message is waiting in Gmail"
                    : status === "client"
                      ? "Your mail app should have opened"
                      : "Your browser blocked the new tab"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {status === "gmail" ? (
                    <>
                      We opened a Gmail tab addressed to{" "}
                      <span className="font-mono text-foreground">{EMAIL_ADDRESS}</span> with
                      everything filled in.{" "}
                      <span className="text-foreground">
                        It has not been sent yet — press send in that tab.
                      </span>{" "}
                      Read it over first, and add anything we should know.
                    </>
                  ) : status === "client" ? (
                    <>
                      We handed a draft to this device&rsquo;s mail app, addressed to{" "}
                      <span className="font-mono text-foreground">{EMAIL_ADDRESS}</span>.{" "}
                      <span className="text-foreground">
                        It has not been sent yet — press send there.
                      </span>{" "}
                      If nothing opened, this device has no mail app set up: copy the message below
                      and send it from wherever you read mail.
                    </>
                  ) : (
                    <>
                      Nothing was sent, and nothing was lost. Your details are still in the form
                      behind this panel. Use one of the routes below to get the message to{" "}
                      <span className="font-mono text-foreground">{EMAIL_ADDRESS}</span>.
                    </>
                  )}
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={secondaryBtnCls}
                >
                  <Mail className="size-4 text-primary" aria-hidden="true" />
                  {status === "gmail" ? "Reopen the Gmail tab" : "Open in Gmail"}
                </a>
                <a href={mailtoUrl} className={secondaryBtnCls}>
                  <ExternalLink className="size-4 text-primary" aria-hidden="true" />
                  {status === "client" ? "Try my mail app again" : "Use my own mail app"}
                </a>
                <button type="button" onClick={handleCopy} className={secondaryBtnCls}>
                  <Copy className="size-4 text-primary" aria-hidden="true" />
                  {copied === "done" ? "Copied to clipboard" : "Copy the message"}
                </button>
                <button type="button" onClick={() => setStatus("idle")} className={secondaryBtnCls}>
                  <Send className="size-4 text-primary" aria-hidden="true" /> Edit and try again
                </button>
              </div>

              <p aria-live="polite" className="text-sm text-muted-foreground">
                {copied === "failed"
                  ? `Your browser would not let us copy. Select the message in the mail draft, or write to ${EMAIL_ADDRESS} directly.`
                  : ""}
              </p>

              <div className="border-t border-border pt-5">
                <h4 className="font-mono text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                  What happens next
                </h4>
                <p className="mt-3 text-sm text-muted-foreground">
                  Once your mail arrives, an engineer reads it and replies from{" "}
                  <span className="font-mono text-foreground">{EMAIL_ADDRESS}</span>, usually within
                  one business day, with an agenda and a proposed time. Nothing is booked until we
                  both confirm it. If it is urgent, call{" "}
                  <a
                    href={PHONE_NUMBERS[0].tel}
                    className="font-mono text-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {PHONE_NUMBERS[0].formatted}
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

const inputCls =
  "min-h-11 w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-base text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:border-primary/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-[invalid=true]:border-destructive";

const primaryBtnCls =
  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto sm:justify-self-start";

const secondaryBtnCls =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface-2 px-4 text-center text-sm text-foreground transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function Field({
  label,
  id,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  id: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Single-select group built from real radio inputs, so arrow keys, screen readers and
 * form semantics all work. The input is visually hidden; the sibling span is the target.
 */
function Choice({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-medium text-foreground">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
              className="peer sr-only"
            />
            <span
              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary ${
                value === o
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border bg-surface-2 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

type Draft = { subject: string; body: string };

function buildDraft(v: {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  type: string;
  budget: string;
  timeline: string;
  preferredTime: string;
  timezone: string;
}): Draft {
  const who = v.name.trim() || "a visitor";
  const org = v.company.trim();
  const when = v.preferredTime.trim();

  const lines = [
    `Hello Foxquart,`,
    ``,
    `I am ${who}${org ? ` from ${org}` : ""}, writing about an engineering project.`,
    ``,
    `Reply to: ${v.email.trim() || "(not provided)"}`,
    `Phone: ${v.phone.trim() || "(not provided)"}`,
    ``,
    `Area: ${v.type}`,
    `Budget: ${v.budget}`,
    `Timeline: ${v.timeline}`,
    `Preferred time to talk: ${when || "(no preference)"}${when && v.timezone ? ` — ${v.timezone}` : ""}`,
    ``,
    `What is costing us the most:`,
    v.message.trim() || "(nothing written yet)",
    ``,
    `Thanks,`,
    v.name.trim(),
  ];

  return {
    subject: `Project enquiry — ${v.name.trim() || "new enquiry"}${org ? ` (${org})` : ""}`,
    body: lines.join("\n"),
  };
}

/**
 * mailto: URLs are length-limited in some clients (~2000 characters on Windows), so a very
 * long message can be truncated by the mail app. The copy-to-clipboard route on the status
 * panel is the escape hatch when that happens.
 */
function composeUrl(target: "gmail" | "mailto", draft: Draft) {
  const su = encodeURIComponent(draft.subject);
  const body = encodeURIComponent(draft.body);
  return target === "gmail"
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_ADDRESS)}&su=${su}&body=${body}`
    : `mailto:${EMAIL_ADDRESS}?subject=${su}&body=${body}`;
}
