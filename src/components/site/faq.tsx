import { Plus } from "lucide-react";
import { faqNode } from "@/lib/seo";
import { Section } from "./ui";
import { MaskLines, Rise } from "./motion";

/**
 * Objection handling, and the site's primary AEO/GEO surface.
 *
 * Answer engines quote passages, not pages, so every answer below is written to
 * stand on its own: the first sentence resolves the question without the
 * question, the rest adds the specifics. Questions are phrased the way a buyer
 * actually types them, not the way a brochure would title them.
 *
 * Provenance: every factual claim comes from `src/lib/site-data.ts`. The source
 * record is named above each entry so the copy stays checkable and nothing here
 * asserts more than the data already does.
 *
 * Deduplication: a Question must not appear in two `FAQPage` nodes. The 36
 * service FAQs (`/services/$slug`) and 102 solution FAQs (`/solutions/$slug`)
 * are already emitted on their own pages, so none of them is repeated here.
 * These are engagement-level questions asked before a buyer picks a service at
 * all. All 147 questions across the site are verified unique.
 */
const faqs: Array<{ q: string; a: string }> = [
  {
    // custom-software-development.faqs["How do you price projects?"];
    // outcomes["Fixed-scope discovery before any commitment"];
    // services.custom-software-development.roi = "Payback in 8–14 months".
    q: "How much does custom software cost?",
    a: "There is no list price: scope decides the number. Discovery is fixed price, and delivery runs as either fixed-scope phases or a dedicated team retainer, so a cost is agreed before each stage rather than once at the start. Operational systems typically pay back in 8–14 months.",
  },
  {
    // services.ai-automation.faqs["How long before the first automation is live?"];
    // inventory-management-software.faqs["How long does implementation take?"];
    // caseStudies timelines = 14 / 7 / 11 weeks;
    // custom-software-development.outcomes["Two-week delivery increments"].
    q: "How long does it take to go live?",
    a: "Weeks, not quarters. A first production automation ships in 10–15 working days, and a single-site operational rollout runs 6–10 weeks. Larger builds are still measured in weeks: a warehouse system took 14, a lead-automation platform 7, an infrastructure migration 11. Delivery runs in two-week increments, so working software is visible throughout.",
  },
  {
    // services.custom-software-development.faqs["Do we own the code?"];
    // custom-software-development.outcomes["Documented architecture and full IP transfer"].
    q: "Who owns the code once it is built?",
    a: "You do, in full. Source repositories, intellectual property and infrastructure transfer to you, with documented architecture and a formal handover. You are not licensing the system back from us, and that holds whether or not we keep supporting it afterwards.",
  },
  {
    // erp-development.faqs["Custom ERP or off-the-shelf?"];
    // crm-development.faqs["Why not just use a standard CRM?"];
    // services.custom-software-development.problem.
    q: "Why build custom instead of buying an off-the-shelf product?",
    a: "Often you shouldn't, and Foxquart will say so. If a packaged product fits about 80% of your process, we implement and extend it rather than rebuild it. Custom software is the right call when your process, pricing logic or compliance rules break the standard model. Otherwise the gaps get filled with spreadsheets anyway.",
  },
  {
    // custom-software-development.outcomes + .problems
    // ["Software projects that arrive late and miss the point", "Vendors who
    // disappear after launch", "Architecture that cannot survive the next growth
    // stage"]; services.custom-software-development.faqs["Can you take over an
    // existing codebase?" → "Regularly"].
    q: "Why not just take a cheaper quote?",
    a: "Because the quoted price is not the total cost. Every engagement includes fixed-price discovery before commitment, two-week increments with working software, documented architecture, full IP transfer and a support agreement that runs past launch. The work we get called in to rescue tends to arrive late, undocumented, and unable to survive the next growth stage.",
  },
  {
    // cloud-hosting.faqs["What does managed hosting include?" via
    // services.cloud-devops] + ["What is the response time?"];
    // custom-software-development.outcomes["Ongoing support and
    // improvement agreement"].
    q: "What happens after launch?",
    a: "Support is an agreement, not a favour. Managed cover includes patching, monitoring, incident response, capacity planning and a monthly reliability report; on the 24/7 plan, critical incidents are acknowledged within 15 minutes. Improvements continue in the same two-week increments as the original build.",
  },
  {
    // healthcare-software.faqs["How is patient data protected?"];
    // ai-automation-services.faqs["Where does our data go?"] and
    // ["How do you stop hallucinations?"].
    q: "How do you keep our data secure?",
    a: "Your data stays in infrastructure you control. Systems holding personal or regulated data ship with encryption at rest and in transit, role-based access, full audit trails, and data residency of your choosing. Where AI models are involved, providers are configured for zero retention, and anything financial or legal keeps a human in the loop.",
  },
  {
    // managed-devops.faqs["Do you work with our in-house engineers?"] and
    // .outcomes["Infrastructure as code and reproducible environments"];
    // n8n-automation-services.outcomes["Documented, handover-ready automation estate"].
    q: "Can our own team take it over later?",
    a: "Yes, and handover is the intended end state of every Foxquart engagement. Environments are reproducible infrastructure as code, architecture and automations are documented for handover, and most engagements run jointly with your own engineers. Foxquart documents and trains as the work happens, so nobody inherits a black box.",
  },
  {
    // custom-software-development.outcomes["Fixed-scope discovery
    // before any commitment"] and .faqs["How do you price projects?"];
    // business-process-automation.faqs["Where do you start?"].
    q: "What does the first step commit us to?",
    a: "The first step with Foxquart is a fixed-price discovery, and it commits you to nothing past it. Discovery maps the process, ranks it by hours consumed and automation feasibility, and produces the scope and cost for delivery; for process automation it runs two weeks. Delivery only starts once you approve that scope.",
  },
];

/**
 * `FAQPage` for exactly the questions rendered below, and no others. The route
 * that composes this section must not also emit `faqNode` for these; one node
 * per page. `path` exists so the `@id` resolves correctly if the section is
 * placed somewhere other than the home page.
 */
function FaqJsonLd({ path }: { path: string }) {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    ...faqNode(faqs, path),
  }).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function Faq({ path = "/" }: { path?: string } = {}) {
  return (
    <Section id="faq" className="py-32 sm:py-32 md:py-48">
      <FaqJsonLd path={path} />

      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="flex max-w-3xl flex-col gap-4 md:col-span-4 md:self-start lg:sticky lg:top-28">
          <MaskLines
            as="h2"
            className="text-2xl leading-[1.08] font-semibold text-balance sm:text-3xl md:text-5xl"
          >
            What buyers ask before they commit
          </MaskLines>
          <Rise y={20} delay={0.12}>
            <p className="text-base text-muted-foreground md:text-lg">
              Cost, timelines, ownership, security, and what happens once the system is live.
            </p>
          </Rise>
        </div>

        {/* Items stagger in; open/close itself stays native CSS, no JS height
            animation, the marker rotates on the motion tokens. */}
        <Rise className="md:col-span-8" delay={0.06} childSelector="details" stagger={0.06} y={24}>
          {/* Native disclosure: keyboard accessible, no JS, no layout shift. */}
          <div className="border-t border-border">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-border">
                <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-5 py-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base leading-snug font-semibold text-foreground md:text-lg">
                    {faq.q}
                  </h3>
                  {/* The marker is restyled, not removed. */}
                  <Plus
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-[transform,color] duration-[var(--dur-base)] ease-[var(--ease-brand)] group-open:rotate-45 group-open:text-primary"
                  />
                </summary>
                <p className="max-w-[65ch] pr-9 pb-5 text-base leading-relaxed text-[color:var(--subtle)]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </Rise>
      </div>
    </Section>
  );
}
