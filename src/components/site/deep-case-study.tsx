import { useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/site-data";
import { Section } from "./ui";
import { MaskLines, Rise } from "./motion";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * One engagement told properly, rather than six cards told badly.
 *
 * The FMCG warehouse build is the strongest of the three records in
 * `caseStudies`: it is the largest operation (nine sites), it is the studio's
 * headline category (an operational system, not a website), and its three
 * results move three different dimensions (accuracy, labour and speed), so it
 * reads as a change to the whole operation rather than a single lucky metric.
 *
 * Every string rendered here comes from `src/lib/site-data.ts`. Nothing is
 * added: no named client, no quote, no budget, no team size.
 */
const study = caseStudies.find((c) => c.client === "National FMCG distributor") ?? caseStudies[0];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow-type text-muted-foreground">{label}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/**
 * Scrubbed word reveal for the narrative copy. The paragraph is plain text in
 * SSR HTML (SplitText runs client-side only), then each word starts at
 * opacity 0.15 and scrubs to 1 sequentially as the block passes through the
 * viewport. Opacity only; reduced motion gets the plain paragraph.
 */
function ScrubWords({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      // aria: "none": SplitText's default "auto" writes aria-label onto the <p>,
      // which ARIA prohibits on paragraphs (Lighthouse a11y failure). Word-level
      // spans read fine to screen readers as-is.
      const split = SplitText.create(el, { type: "words", aria: "none" });
      gsap.set(split.words, { opacity: 0.15 });
      gsap.to(split.words, {
        opacity: 1,
        duration: 0.5,
        ease: "none",
        stagger: 0.12,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          end: "bottom 55%",
          scrub: true,
        },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}

export function DeepCaseStudy() {
  return (
    <Section id="case-study" className="py-32 sm:py-32 md:py-48">
      <div className="flex max-w-3xl flex-col gap-4">
        <MaskLines
          as="h2"
          className="text-2xl leading-[1.08] font-semibold text-balance sm:text-3xl md:text-5xl"
        >
          Nine warehouses, three days behind
        </MaskLines>
        <Rise y={20} delay={0.12}>
          <p className="text-base text-muted-foreground md:text-lg">
            The problem, the system we built, and the three numbers that moved.
          </p>
        </Rise>
      </div>

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-12">
        {/* Narrative. Single column on mobile, seven of twelve on desktop. */}
        <Rise className="flex flex-col gap-8 md:col-span-7 md:gap-10">
          <Field label="Client">
            <p className="text-lg font-semibold text-foreground md:text-xl">{study.client}</p>
          </Field>

          <Field label="The problem">
            <ScrubWords className="max-w-[60ch] text-base leading-relaxed text-[color:var(--subtle)] md:text-lg">
              {study.challenge}
            </ScrubWords>
          </Field>

          <Field label="What we built">
            <ScrubWords className="max-w-[60ch] text-base leading-relaxed text-[color:var(--subtle)] md:text-lg">
              {study.solution}
            </ScrubWords>
          </Field>

          <Field label="Stack">
            <ul className="flex flex-wrap gap-2">
              {study.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Field>

          <div>
            <Link
              to="/services/$slug"
              params={{ slug: "custom-software-development" }}
              className="press inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-medium text-primary transition-colors duration-[var(--dur-micro)] ease-[var(--ease-brand)] hover:text-foreground"
            >
              How we build operational systems
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Rise>

        {/* Metric rail. Stacks under the narrative on mobile; the figures
            stagger up one after another as the rail enters. */}
        <Rise
          className="md:col-span-5"
          delay={0.08}
          childSelector="[data-metric]"
          stagger={0.12}
          y={28}
        >
          <div className="rounded-xl border border-border bg-surface p-6 md:p-8">
            <div data-metric>
              <Field label="Delivered in">
                <p className="tnum font-display text-3xl leading-none font-semibold text-primary md:text-4xl">
                  {study.timeline}
                </p>
              </Field>
            </div>

            <hr className="my-7 border-t border-border md:my-8" />

            <p className="eyebrow-type text-muted-foreground">What changed</p>
            <dl className="mt-5 flex flex-col gap-6 md:gap-7">
              {study.results.map((result) => (
                /* Reversed so the number reads first but the label still
                   precedes its value in the DOM for assistive tech. */
                <div key={result.label} data-metric className="flex flex-col-reverse gap-1.5">
                  <dt className="text-sm text-muted-foreground">{result.label}</dt>
                  <dd className="tnum font-display text-3xl leading-none font-semibold text-foreground md:text-4xl">
                    {result.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Rise>
      </div>
    </Section>
  );
}
