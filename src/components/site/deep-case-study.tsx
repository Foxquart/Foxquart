import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/site-data";
import { Reveal, Section, SectionHeading } from "./ui";

/**
 * One engagement told properly, rather than six cards told badly.
 *
 * The FMCG warehouse build is the strongest of the three records in
 * `caseStudies`: it is the largest operation (nine sites), it is the studio's
 * headline category (an operational system, not a website), and its three
 * results move three different dimensions — accuracy, labour and speed — so it
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

export function DeepCaseStudy() {
  return (
    <Section id="case-study">
      <SectionHeading
        eyebrow="Case study"
        title="Nine warehouses, three days behind"
        intro="The problem, the system we built, and the three numbers that moved."
      />

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-12">
        {/* Narrative. Single column on mobile, seven of twelve on desktop. */}
        <Reveal className="flex flex-col gap-8 md:col-span-7 md:gap-10">
          <Field label="Client">
            <p className="text-lg font-semibold text-foreground md:text-xl">{study.client}</p>
          </Field>

          <Field label="The problem">
            <p className="max-w-[60ch] text-base leading-relaxed text-[color:var(--subtle)] md:text-lg">
              {study.challenge}
            </p>
          </Field>

          <Field label="What we built">
            <p className="max-w-[60ch] text-base leading-relaxed text-[color:var(--subtle)] md:text-lg">
              {study.solution}
            </p>
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
        </Reveal>

        {/* Metric rail. Stacks under the narrative on mobile. */}
        <Reveal className="md:col-span-5" delay={0.08}>
          <div className="rounded-xl border border-border bg-surface p-6 md:p-8">
            <Field label="Delivered in">
              <p className="tnum font-display text-3xl leading-none font-semibold text-primary md:text-4xl">
                {study.timeline}
              </p>
            </Field>

            <hr className="my-7 border-t border-border md:my-8" />

            <p className="eyebrow-type text-muted-foreground">What changed</p>
            <dl className="mt-5 flex flex-col gap-6 md:gap-7">
              {study.results.map((result) => (
                /* Reversed so the number reads first but the label still
                   precedes its value in the DOM for assistive tech. */
                <div key={result.label} className="flex flex-col-reverse gap-1.5">
                  <dt className="text-sm text-muted-foreground">{result.label}</dt>
                  <dd className="tnum font-display text-3xl leading-none font-semibold text-foreground md:text-4xl">
                    {result.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
