import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Boxes,
  Check,
  Clock,
  Cloud,
  Globe,
  Loader2,
  Mail,
  Pencil,
  Phone,
  Send,
  Smartphone,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading } from "./ui";
import { EMAIL_ADDRESS, MAILTO_URL, PHONE_NUMBERS } from "@/lib/site-data";
import {
  PREFERRED_TIMES,
  PROJECT_TYPES,
  TIMELINES,
  contactSubmissionSchema,
} from "@/lib/contact-schema";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";

/**
 * Three-step enquiry form. Step 1 is who they are, step 2 is what they need
 * (typed cards, not a wall of identical pills), step 3 is an optional note plus
 * a recap. The form POSTs to /api/contact, which stores the enquiry and
 * notifies the team inbox; "sent" means the server accepted it. On failure the
 * form stays intact and a direct mailto link is offered as the escape hatch.
 */
type Status = "idle" | "submitting" | "sent";
type FieldName = "name" | "email" | "company" | "phone" | "message";
type Errors = Partial<Record<FieldName, string>>;

const STEPS = [
  { id: "about", label: "About you" },
  { id: "project", label: "Your project" },
  { id: "note", label: "Message" },
] as const;

/* One icon and one plain-language line per area, so the cards read at a glance. */
const TYPE_META: Record<(typeof PROJECT_TYPES)[number], { icon: LucideIcon; blurb: string }> = {
  "Custom software / ERP": {
    icon: Boxes,
    blurb: "Inventory, billing and operations in one system",
  },
  "AI & workflow automation": { icon: Sparkles, blurb: "Hand the repetitive work to software" },
  "Cloud & DevOps": { icon: Cloud, blurb: "Ship, scale and monitor safely" },
  "Data intelligence": { icon: BarChart3, blurb: "Dashboards and reports you can trust" },
  "Website / landing page": { icon: Globe, blurb: "Fast, findable and built to convert" },
  "Mobile application": { icon: Smartphone, blurb: "iOS and Android from one codebase" },
};

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<string>(PROJECT_TYPES[0]);
  const [timeline, setTimeline] = useState<string>(TIMELINES[0]);
  const [preferredTime, setPreferredTime] = useState<string>(PREFERRED_TIMES[0]);
  const [timezone, setTimezone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot: humans never see it
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState("");
  const [failed, setFailed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);
  // Highest step the visitor has reached; earlier chips stay clickable.
  const [reached, setReached] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const statusHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasSent = useRef(false);
  const hasNavigated = useRef(false);
  const direction = useRef(1);

  // Resolved after mount so the server-rendered HTML and the first client render match.
  useEffect(() => {
    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone ?? "");
    } catch {
      setTimezone("");
    }
  }, []);

  // The form and the success panel replace each other, so focus would otherwise land on
  // <body> and the keyboard user would lose their place.
  useEffect(() => {
    if (status === "sent") {
      hasSent.current = true;
      statusHeadingRef.current?.focus();
    } else if (status === "idle" && hasSent.current) {
      formRef.current?.querySelector<HTMLElement>("#name")?.focus();
    }
  }, [status]);

  // Announce and anchor each step for keyboard and screen reader users. Skipped
  // on first render so page load doesn't yank focus into the form.
  useEffect(() => {
    if (hasNavigated.current) stepHeadingRef.current?.focus();
  }, [step]);

  // Slide the incoming panel from the direction of travel. transform/opacity
  // only, and not under reduced motion.
  useGSAP(
    () => {
      if (!hasNavigated.current || !panelRef.current || prefersReducedMotion()) return;
      gsap.fromTo(
        panelRef.current,
        { x: 22 * direction.current, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, ease: EASE, clearProps: "transform,opacity" },
      );
    },
    { dependencies: [step], scope: panelRef },
  );

  const goTo = (next: number) => {
    if (next === step) return;
    hasNavigated.current = true;
    direction.current = next > step ? 1 : -1;
    setReached((r) => Math.max(r, next));
    setStep(next);
  };

  const payload = {
    name,
    email,
    company,
    phone,
    message,
    projectType: type,
    timeline,
    preferredTime,
    timezone,
    website,
  };

  /** Validates only the fields the visitor can currently see. */
  const validateStep = (which: number): boolean => {
    const fields =
      which === 0 ? (["name", "email", "company", "phone"] as const) : (["message"] as const);
    const parsed = contactSubmissionSchema
      .pick({ name: true, email: true, company: true, phone: true, message: true })
      .safeParse(payload);
    const found: Errors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as FieldName;
        if ((fields as readonly string[]).includes(field) && !found[field]) {
          found[field] = issue.message;
        }
      }
    }
    setErrors(found);
    const firstInvalid = fields.find((f) => found[f]);
    if (firstInvalid) {
      setNotice("Check the highlighted fields.");
      formRef.current?.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return false;
    }
    setNotice("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Enter (or the Continue button) advances until the last step.
    if (step < STEPS.length - 1) {
      if (validateStep(step)) goTo(step + 1);
      return;
    }

    const parsed = contactSubmissionSchema.safeParse(payload);
    if (!parsed.success) {
      const found: Errors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as FieldName;
        if (!found[field]) found[field] = issue.message;
      }
      setErrors(found);
      setFailed(false);
      setNotice("Nothing was sent. Check the highlighted fields.");
      if (found.name || found.email || found.company || found.phone) goTo(0);
      return;
    }

    setErrors({});
    setNotice("");
    setFailed(false);
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Partial<Record<string, string>>;
      } | null;

      if (res.ok && body?.ok) {
        setStatus("sent");
        return;
      }

      setStatus("idle");
      if (res.status === 400 && body?.fieldErrors) {
        const found: Errors = {};
        for (const f of ["name", "email", "company", "phone", "message"] as FieldName[]) {
          if (body.fieldErrors[f]) found[f] = body.fieldErrors[f];
        }
        setErrors(found);
        setNotice(body.error ?? "Nothing was sent. Check the highlighted fields.");
        if (found.name || found.email || found.company || found.phone) goTo(0);
        return;
      }
      setFailed(true);
      setNotice(body?.error ?? "We could not send your message. Please try again in a moment.");
    } catch {
      setStatus("idle");
      setFailed(true);
      setNotice("We could not reach the server. Check your connection and try again.");
    }
  };

  const resetForSecondMessage = () => {
    setName("");
    setCompany("");
    setPhone("");
    setMessage("");
    setPreferredTime(PREFERRED_TIMES[0]);
    setType(PROJECT_TYPES[0]);
    setTimeline(TIMELINES[0]);
    setErrors({});
    setNotice("");
    setFailed(false);
    setStatus("idle");
    setStep(0);
    setReached(0);
  };

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Talk to the engineer who would build it, not a salesperson."
            intro="We usually reply within one business day, with an honest first opinion."
          />
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            {[
              "30 minutes, no pitch deck",
              "You leave with a shortlist of what to automate first",
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
              <a
                href={MAILTO_URL}
                className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 font-mono text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Mail className="size-4 text-primary" aria-hidden="true" /> {EMAIL_ADDRESS}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 sm:p-7">
          {status !== "sent" ? (
            <form ref={formRef} className="grid gap-6" onSubmit={handleSubmit} noValidate>
              <Stepper step={step} reached={reached} onSelect={goTo} />

              <div ref={panelRef} className="grid gap-6">
                {step === 0 ? (
                  <>
                    <StepIntro
                      headingRef={stepHeadingRef}
                      title="First, who are we replying to?"
                      hint={
                        <>
                          Only the starred fields are required. See our{" "}
                          <Link
                            to="/privacy"
                            className="text-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                          >
                            privacy policy
                          </Link>
                          .
                        </>
                      }
                    />
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
                      <Field label="Company" id="company" hint="Optional" error={errors.company}>
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
                      <Field
                        label="Phone"
                        id="phone"
                        hint="Optional. Include your country code."
                        error={errors.phone}
                      >
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
                  </>
                ) : null}

                {step === 1 ? (
                  <>
                    <StepIntro
                      headingRef={stepHeadingRef}
                      title="What do you need?"
                      hint="Pick the closest one; the call refines it."
                    />
                    <fieldset className="grid gap-2.5 sm:grid-cols-2">
                      <legend className="sr-only">Project area</legend>
                      {PROJECT_TYPES.map((o) => {
                        const meta = TYPE_META[o];
                        const selected = type === o;
                        return (
                          <label key={o} className="cursor-pointer">
                            <input
                              type="radio"
                              name="project-type"
                              value={o}
                              checked={selected}
                              onChange={() => setType(o)}
                              className="peer sr-only"
                            />
                            <span
                              className={`flex min-h-[4.25rem] items-center gap-3.5 rounded-xl border p-3.5 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary ${
                                selected
                                  ? "border-primary bg-primary/10"
                                  : "border-border bg-surface-2 hover:border-primary/40"
                              }`}
                            >
                              <span
                                className={`grid size-10 shrink-0 place-items-center rounded-lg border ${
                                  selected
                                    ? "border-primary/40 bg-primary/15 text-primary"
                                    : "border-border bg-surface text-muted-foreground"
                                }`}
                              >
                                <meta.icon className="size-5" aria-hidden="true" />
                              </span>
                              <span className="min-w-0">
                                <span
                                  className={`block text-sm font-medium ${selected ? "text-foreground" : "text-foreground/90"}`}
                                >
                                  {o}
                                </span>
                                <span className="mt-0.5 block text-xs text-muted-foreground">
                                  {meta.blurb}
                                </span>
                              </span>
                              <Check
                                className={`ml-auto size-4 shrink-0 text-primary transition-opacity ${selected ? "opacity-100" : "opacity-0"}`}
                                aria-hidden="true"
                              />
                            </span>
                          </label>
                        );
                      })}
                    </fieldset>

                    <Choice
                      label="When do you want it live?"
                      name="timeline"
                      options={TIMELINES}
                      value={timeline}
                      onChange={setTimeline}
                    />
                    <Choice
                      label="Best time for a call?"
                      name="preferred-time"
                      options={PREFERRED_TIMES}
                      value={preferredTime}
                      onChange={setPreferredTime}
                      hint={
                        timezone
                          ? `Times read in your timezone (${timezone}). We confirm by email before anything is booked.`
                          : "We confirm the exact time by email before anything is booked."
                      }
                    />
                  </>
                ) : null}

                {step === 2 ? (
                  <>
                    <StepIntro
                      headingRef={stepHeadingRef}
                      title="Anything else we should know?"
                      hint="Optional. A sentence about the process that hurts most helps us prepare."
                    />
                    <Field label="Your note" id="message" error={errors.message}>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        aria-invalid={errors.message ? true : undefined}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        placeholder="We reconcile 400 supplier invoices a month by hand…"
                        className={`${inputCls} min-h-32 resize-y`}
                      />
                    </Field>

                    {/* Recap: what will be sent, with a jump back to edit. */}
                    <dl className="grid gap-2 rounded-xl border border-border bg-surface-2 p-4 text-sm">
                      <RecapRow
                        icon={User}
                        label="From"
                        value={`${name.trim() || "?"} · ${email.trim() || "?"}`}
                        onEdit={() => goTo(0)}
                      />
                      <RecapRow
                        icon={TYPE_META[type as (typeof PROJECT_TYPES)[number]]?.icon ?? Boxes}
                        label="Project"
                        value={type}
                        onEdit={() => goTo(1)}
                      />
                      <RecapRow
                        icon={Clock}
                        label="Timing"
                        value={`${timeline} · ${preferredTime}`}
                        onEdit={() => goTo(1)}
                      />
                    </dl>
                  </>
                ) : null}
              </div>

              {/* Honeypot: off-screen rather than display:none so naive bots still fill it,
                  and hidden from the accessibility tree so real users never meet it. */}
              <div
                aria-hidden="true"
                className="absolute top-auto -left-[9999px] h-px w-px overflow-hidden"
              >
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {/* Persistent live region: it must already be in the DOM for a screen reader
                  to announce the validation result when `notice` changes. */}
              <div className="grid gap-3">
                <p role="status" aria-live="polite" className="text-sm text-primary">
                  {notice}
                  {failed ? (
                    <>
                      {" "}
                      If it keeps failing, email us directly at{" "}
                      <a
                        href={MAILTO_URL}
                        className="font-mono text-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {EMAIL_ADDRESS}
                      </a>
                      . Your details are still in the form.
                    </>
                  ) : null}
                </p>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => goTo(step - 1)}
                      className={secondaryBtnCls}
                    >
                      <ArrowLeft className="size-4 text-primary" aria-hidden="true" /> Back
                    </button>
                  ) : null}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={primaryBtnCls}
                  >
                    {step < STEPS.length - 1 ? (
                      <>
                        Continue <ArrowRight className="size-4" aria-hidden="true" />
                      </>
                    ) : status === "submitting" ? (
                      <>
                        Sending… <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        Send message <Send className="size-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="grid gap-5">
              <span className="grid size-11 place-items-center rounded-full border border-border bg-surface-2">
                <Check className="size-5 text-primary" aria-hidden="true" />
              </span>

              {/* The form has unmounted, so focus is moved to this heading as well as
                  announcing the region; a newly inserted live region alone is unreliable. */}
              <div role="status" aria-live="polite">
                <h3
                  ref={statusHeadingRef}
                  tabIndex={-1}
                  className="font-display text-xl font-semibold text-balance text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Message received. It is in our inbox.
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thanks{name.trim() ? `, ${name.trim()}` : ""}. An engineer reads it and replies
                  from <span className="font-mono text-foreground">{EMAIL_ADDRESS}</span>, usually
                  within one business day, with an agenda and a proposed time. Nothing is booked
                  until we both confirm it.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button type="button" onClick={resetForSecondMessage} className={secondaryBtnCls}>
                  <Send className="size-4 text-primary" aria-hidden="true" /> Send another message
                </button>
                <a href={MAILTO_URL} className={secondaryBtnCls}>
                  <Mail className="size-4 text-primary" aria-hidden="true" /> Email us directly
                </a>
              </div>

              <div className="border-t border-border pt-5">
                <h4 className="font-mono text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                  What happens next
                </h4>
                <p className="mt-3 text-sm text-muted-foreground">
                  If it is urgent, call{" "}
                  <a
                    href={PHONE_NUMBERS[0].tel}
                    className="font-mono text-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {PHONE_NUMBERS[0].formatted}
                  </a>{" "}
                  and mention you already sent the form; we pull it up.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

/**
 * The step rail. Completed steps stay clickable (they are the visitor's own
 * data); upcoming steps are reached through Continue so validation runs.
 */
function Stepper({
  step,
  reached,
  onSelect,
}: {
  step: number;
  reached: number;
  onSelect: (n: number) => void;
}) {
  return (
    <nav aria-label="Form steps">
      <ol className="flex items-center gap-2">
        {STEPS.map((s, i) => {
          const isCurrent = i === step;
          const isDone = i < step;
          const clickable = i <= reached && !isCurrent;
          return (
            <li key={s.id} className={`flex items-center gap-2 ${i > 0 ? "flex-1" : ""}`}>
              {i > 0 ? (
                <span
                  aria-hidden="true"
                  className={`h-px flex-1 ${isDone || isCurrent ? "bg-primary/60" : "bg-border"}`}
                />
              ) : null}
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onSelect(i)}
                aria-current={isCurrent ? "step" : undefined}
                className={`inline-flex min-h-9 items-center gap-2 rounded-full border py-1 pr-3 pl-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isCurrent
                    ? "border-primary/60 bg-primary/10 text-foreground"
                    : isDone
                      ? "border-border bg-surface-2 text-foreground hover:border-primary/40"
                      : "border-border bg-surface text-muted-foreground"
                } ${clickable ? "cursor-pointer" : ""}`}
              >
                <span
                  aria-hidden="true"
                  className={`grid size-6 place-items-center rounded-full text-[11px] font-medium ${
                    isDone
                      ? "bg-primary text-primary-foreground"
                      : isCurrent
                        ? "border border-primary/60 text-primary"
                        : "border border-border text-muted-foreground"
                  }`}
                >
                  {isDone ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className={isCurrent ? "" : "hidden sm:inline"}>{s.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function StepIntro({
  title,
  hint,
  headingRef,
}: {
  title: string;
  hint?: ReactNode;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-lg text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {title}
      </h3>
      {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function RecapRow({
  icon: Icon,
  label,
  value,
  onEdit,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
      <dt className="w-16 shrink-0 text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="min-w-0 flex-1 truncate text-foreground">{value}</dd>
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex min-h-8 items-center gap-1.5 rounded-full px-2 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Pencil className="size-3" aria-hidden="true" /> Edit
      </button>
    </div>
  );
}

const inputCls =
  "min-h-11 w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-base text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:border-primary/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-[invalid=true]:border-destructive";

const primaryBtnCls =
  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto";

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
  hint,
}: {
  label: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  hint?: string;
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
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </fieldset>
  );
}
