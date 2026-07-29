import { useState } from "react";
import { Check, Send } from "lucide-react";
import { GlassPanel, Reveal, Section, SectionHeading } from "./ui";

const projectTypes = [
  "Custom software / ERP",
  "AI & workflow automation",
  "Cloud & DevOps",
  "Data intelligence",
  "Website / landing page",
  "Mobile application",
];
const budgets = ["Under $10k", "$10k – $30k", "$30k – $75k", "$75k – $200k", "$200k+"];
const timelines = ["ASAP", "1–3 months", "3–6 months", "Exploring options"];
const slots = ["Tue 10:00", "Tue 15:30", "Wed 09:00", "Wed 14:00", "Thu 11:30", "Fri 16:00"];

export function ContactSection() {
  const [type, setType] = useState(projectTypes[0]);
  const [budget, setBudget] = useState(budgets[2]);
  const [timeline, setTimeline] = useState(timelines[1]);
  const [slot, setSlot] = useState(slots[0]);
  const [sent, setSent] = useState(false);

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Book a strategy call with an engineer, not a salesperson."
            intro="Send the details and we will reply within one business day with an agenda and an honest first opinion."
          />
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            {[
              "30 minutes, no pitch deck",
              "You leave with a prioritised automation shortlist",
              "NDA available before the call on request",
            ].map((l) => (
              <li key={l} className="flex items-center gap-2">
                <Check className="size-4 text-signal" /> {l}
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-1 text-sm">
            <p className="text-muted-foreground">Direct</p>
            <a href="mailto:hello@nexolith.dev" className="text-primary hover:underline">
              hello@nexolith.dev
            </a>
          </div>
        </div>

        <Reveal>
          <GlassPanel lift={false} className="glass-strong p-7 md:p-8">
            {sent ? (
              <div className="flex min-h-80 flex-col items-center justify-center text-center">
                <span className="grid size-12 place-items-center rounded-full bg-primary/15">
                  <Check className="size-5 text-primary" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">Request received</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  We will confirm your {slot} slot by email within one business day.
                </p>
              </div>
            ) : (
              <form
                className="grid gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" id="name">
                    <input id="name" required className={inputCls} placeholder="Jane Okafor" />
                  </Field>
                  <Field label="Work email" id="email">
                    <input
                      id="email"
                      type="email"
                      required
                      className={inputCls}
                      placeholder="jane@company.com"
                    />
                  </Field>
                  <Field label="Company" id="company">
                    <input id="company" className={inputCls} placeholder="Company Ltd" />
                  </Field>
                  <Field label="Phone" id="phone">
                    <input id="phone" className={inputCls} placeholder="+00 000 000 000" />
                  </Field>
                </div>

                <Chips label="Project type" options={projectTypes} value={type} onChange={setType} />
                <Chips label="Budget" options={budgets} value={budget} onChange={setBudget} />
                <Chips label="Timeline" options={timelines} value={timeline} onChange={setTimeline} />
                <Chips label="Preferred slot" options={slots} value={slot} onChange={setSlot} />

                <Field label="What process is costing you the most?" id="message">
                  <textarea
                    id="message"
                    rows={4}
                    className={inputCls}
                    placeholder="We reconcile 400 supplier invoices a month by hand…"
                  />
                </Field>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Request strategy call <Send className="size-4" />
                </button>
              </form>
            )}
          </GlassPanel>
        </Reveal>
      </div>
    </Section>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-primary/60";

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

function Chips({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="grid gap-2">
      <legend className="mb-2 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
              value === o
                ? "border-primary/60 bg-primary/15 text-foreground"
                : "border-border bg-surface/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
