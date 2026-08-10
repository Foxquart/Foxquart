import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { PHONE_NUMBERS } from "@/lib/site-data";
import { Magnetic, MaskLines, Rise } from "./motion";
import { Section } from "./ui";

/** The thirty minutes, as they actually run. Specific beats "free consultation". */
const AGENDA = [
  {
    slot: "00–10",
    title: "You walk us through the process",
    detail: "The one held together by spreadsheets, chat threads and paper.",
  },
  {
    slot: "10–20",
    title: "We mark what software should own",
    detail: "What is worth building, and what is cheaper left manual.",
  },
  {
    slot: "20–30",
    title: "We size the first release",
    detail: "Scope and a week count for the version that goes live first.",
  },
];

/** Terms of the call. Commitments we control, nothing claimed on anyone else's behalf. */
const TERMS = ["30 minutes", "No deck", "Straight to the engineer who would build it"];

export function BookingCta() {
  const phone = PHONE_NUMBERS[0];

  return (
    <Section id="contact" className="py-32 sm:py-32 md:py-48">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        {/* The one accent in the panel. */}
        <div className="hairline" aria-hidden="true" />

        <div className="px-5 py-24 sm:px-8 md:px-14 md:py-32">
          {/* The headline runs the full panel width so the display type can go large;
              the intro and agenda pair up beneath it. */}
          <div className="flex flex-col gap-5">
            <Rise>
              <span className="eyebrow-type text-primary">Book a build review</span>
            </Rise>
            <MaskLines
              as="h2"
              className="font-display max-w-[24ch] text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.03] font-bold tracking-[-0.02em] text-balance"
            >
              Show us the workflow. We&rsquo;ll scope the build.
            </MaskLines>
          </div>

          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-16">
            <Rise>
              <p className="max-w-[54ch] text-base text-muted-foreground md:text-lg">
                A working call, not a pitch. Bring the process your team runs by hand.
              </p>
            </Rise>

            <Rise className="flex flex-col gap-6" stagger={0.08} childSelector="li">
              <span className="eyebrow-type text-muted-foreground">
                What the thirty minutes look like
              </span>
              <ol className="flex flex-col gap-6">
                {AGENDA.map((step) => (
                  <li
                    key={step.slot}
                    className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1.5"
                  >
                    <span className="eyebrow-type tnum mt-1.5 text-primary">{step.slot}</span>
                    <h3 className="text-base font-semibold">{step.title}</h3>
                    <p className="col-start-2 text-sm text-muted-foreground">{step.detail}</p>
                  </li>
                ))}
              </ol>
            </Rise>
          </div>

          <Rise className="mt-14 md:mt-20">
            <div className="flex flex-col gap-8 border-t border-border pt-10 md:flex-row md:items-end md:justify-between md:gap-14 md:pt-12">
              <div className="max-w-[52ch]">
                <span className="eyebrow-type text-muted-foreground">You leave with</span>
                <p className="mt-3 text-base text-foreground">
                  A written scope note: the first release and a week count. It is yours whether or
                  not you hire us. If software is not the fix, we say so.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    to="/contact"
                    className="press inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground transition-colors duration-[var(--dur-micro)] ease-[var(--ease-brand)] hover:bg-[var(--primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Book a build review
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Magnetic>
                <a
                  href={phone.tel}
                  className="press inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full border border-border bg-surface-2 px-7 text-base font-medium text-foreground transition-colors duration-[var(--dur-micro)] ease-[var(--ease-brand)] hover:border-[var(--border-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
                >
                  <Phone className="size-4 text-primary" aria-hidden="true" />
                  Call {phone.formatted}
                </a>
              </div>
            </div>

            <ul className="tnum mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              {TERMS.map((term) => (
                <li key={term} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-primary" aria-hidden="true" />
                  {term}
                </li>
              ))}
            </ul>
          </Rise>
        </div>
      </div>
    </Section>
  );
}
