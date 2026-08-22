import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Picture } from "@/components/ui/picture";
import { Counter, Section } from "./ui";
import { MaskLines, Magnetic, Rise } from "./motion";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { caseStudies } from "@/lib/site-data";

/**
 * Shared section opener: the headline reveals through line masks (contract §3:
 * headline text always MaskLines, never block-fades), the intro rises after it.
 * The eyebrow slot exists only for labels that carry real content ("From
 * $2,500 per month"); label-only pills are banned, so most sections omit it.
 */
function SectionIntro({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      {eyebrow ? (
        <Rise y={16}>
          <p className="eyebrow-type text-primary">{eyebrow}</p>
        </Rise>
      ) : null}
      <MaskLines
        as="h2"
        className="text-2xl leading-[1.08] font-semibold text-balance sm:text-3xl md:text-5xl"
      >
        {title}
      </MaskLines>
      {intro ? (
        <Rise y={20} delay={0.12}>
          <p className="text-base text-muted-foreground md:text-lg">{intro}</p>
        </Rise>
      ) : null}
    </div>
  );
}

/**
 * Stat strip, directly under the hero.
 *
 * Every figure here is a claim about the practice and has to be confirmed by the
 * founder before launch (see docs/redesign-contract.md §6.7). The client logo row
 * that used to sit above these numbers was removed: the six names on it
 * (NORTHWIND, ATLAS FOODS, MERIDIAN, VOLTA LOGISTICS, CEDARCARE, KRAFTWORKS)
 * were invented, and an invented logo wall is the least defensible proof on a
 * site. Do not reinstate a logo row until there are real clients who have given
 * written permission to be named.
 */
/**
 * Why go online at all, written for the owner, not the engineer. Plain English,
 * no jargon, no numbers (the case studies below carry the numbers exactly once).
 */
const whyReasons = [
  {
    title: "Be open after you close",
    body: "A booking page takes the order while your shop is shut.",
    image: "/images/go.webp",
    focus: "50% 48%",
  },
  {
    title: "Stop writing the same thing twice",
    body: "One record, so nobody copies numbers between notebooks and chats.",
    image: "/images/go2.webp",
    focus: "50% 50%",
  },
  {
    title: "Look as good as you are",
    body: "People judge your business by its website before they ever call.",
    image: "/images/go3.webp",
    focus: "48% 68%",
  },
  {
    title: "Know your numbers today",
    body: "What sold, what is in stock, what is due, on your phone.",
    image: "/images/go4.webp",
    focus: "55% 55%",
  },
];

const howPromises = [
  "Built around how your shop or office actually works",
  "Live in weeks, not months",
  "Fast on cheap phones and slow networks",
  "We watch it and fix it after launch",
  "It is yours: code, data, everything",
];

export function WhyBuild() {
  return (
    <Section className="py-32 md:py-48">
      <MaskLines
        as="h2"
        className="max-w-4xl font-display text-4xl leading-[1.08] text-foreground sm:text-5xl md:text-6xl"
      >
        Your customers are already online.{" "}
        <em className="text-black dark:text-foreground bg-cover bg-[position:75%_35%] bg-clip-text italic text-transparent saturate-150 brightness-[2.4] contrast-125">
          Your business should be too.
        </em>
      </MaskLines>

      <Rise
        className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 lg:grid-cols-4"
        childSelector="[data-why]"
        stagger={0.07}
      >
        {whyReasons.map((r) => (
          <div
            key={r.title}
            data-why
            className="dark card-lift group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-surface"
          >
            {/* Full height below lg; on desktop the photo only fills the top
                70% so the card reads as a photo panel over a solid footer,
                not an edge-to-edge print. */}
            <Picture
              src={r.image}
              alt=""
              className="absolute inset-x-0 top-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-[70%]"
              style={{ objectPosition: r.focus }}
              sizes="(min-width: 1024px) 24vw, 46vw"
            />
            {/* Vignette anchored to the photo's own box (matches its height
                exactly), dark at its bottom edge and easing out upward --
                that's where the title now sits below lg, over the photo
                itself; on lg it mostly falls on the solid footer and does
                nothing, which is fine. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-t from-black/75 via-black/15 to-transparent lg:h-[70%]"
            />
            {/* Below lg, the photos are busier/brighter than the desktop
                footer layout accounts for, so an extra flat tint sits over
                the whole image just on phone/tablet to keep the title
                readable against them. Desktop already has the solid footer
                doing that job, so this is hidden there. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-full bg-black/30 lg:hidden"
            />
            <div className="relative z-10 flex h-full flex-col justify-end p-4 sm:p-5">
              <h3 className="font-display text-xl leading-[1.1] text-foreground sm:text-2xl">
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{r.body}</p>
            </div>
          </div>
        ))}
      </Rise>

      <Rise className="mt-10 rounded-xl border border-border bg-surface-2 p-6 md:p-8">
        <p className="eyebrow-type text-primary">What working with us means</p>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {howPromises.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-foreground">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </Rise>
    </Section>
  );
}

export function SocialProof() {
  const stats = [
    {
      value: <Counter to={140} suffix="+" />,
      label: "Systems delivered",
      note: "Across 11 countries",
    },
    {
      value: <Counter to={9} />,
      label: "Years in practice",
      note: "Senior engineers only",
    },
    {
      value: <Counter to={410} suffix="k" />,
      label: "Manual hours automated",
      note: "Measured across client operations",
    },
    {
      value: <Counter to={99.98} suffix="%" decimals={2} />,
      label: "Platform uptime",
      note: "Systems we operate under SLA",
    },
  ];

  // Every breakpoint is restated because `twMerge` scopes overrides per variant;
  // `py-32` on its own would leave the Section's base `sm:py-24` in place.
  return (
    <Section className="py-32 sm:py-32 md:py-48">
      <MaskLines
        as="h2"
        className="max-w-3xl text-2xl leading-[1.08] font-semibold text-balance sm:text-3xl md:text-5xl"
      >
        What nine years of delivery adds up to
      </MaskLines>
      {/* Open grid over hairline rules: monumental figures, not a table.
          The Counter SSRs the real value, so crawlers and no-JS visitors read
          the true figure; the count-up is a client-side embellishment only. */}
      <Rise className="mt-12 md:mt-20" childSelector="[data-stat]" stagger={0.1} y={28}>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-10">
          {stats.map((stat) => (
            <div key={stat.label} data-stat className="border-t border-border pt-5 md:pt-6">
              <dt className="tnum font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl xl:text-7xl">
                {stat.value}
              </dt>
              <dd className="mt-3 text-sm font-medium text-foreground">{stat.label}</dd>
              <dd className="mt-1 text-xs text-muted-foreground">{stat.note}</dd>
            </div>
          ))}
        </dl>
      </Rise>
    </Section>
  );
}

/* Sticky offsets for the desktop card stack: each card pins a little lower than
   the one before, so the covered edges read as a deck. 96px clears the header. */
const STACK_TOP = 96;
const STACK_GAP = 20;

/**
 * Three production systems with their measured results.
 *
 * Desktop (lg:+) runs a card stack: every card is `position: sticky` with a
 * per-card top offset, so each one pins while the next scrolls up over it.
 * CSS does the pinning (cheap, robust, and native scroll means no fight with
 * Lenis), and a scrubbed GSAP tween adds the scale-down + dim on the covered
 * card (transform/opacity only). Mobile is a simple flow with Rise.
 *
 * The technology chip row was dropped: contract §5 says name systems, not
 * technologies. Every number rendered here comes from `caseStudies` in
 * src/lib/site-data.ts and needs the same founder confirmation as the stat strip.
 */
export function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", root);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return; // the top card of the deck is never covered
          const veil = card.querySelector("[data-stack-veil]");
          const trigger = {
            trigger: next,
            start: "top bottom",
            // Fully covered the moment the next card reaches its own pin line.
            end: `top ${STACK_TOP + (i + 1) * STACK_GAP}px`,
            scrub: true,
          };
          gsap.to(card, {
            scale: 0.95,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: trigger,
          });
          // Dim via an opaque ground-coloured veil, not card opacity: a
          // transparent card would let the deck underneath bleed through.
          if (veil) {
            gsap.to(veil, { opacity: 0.55, ease: "none", scrollTrigger: trigger });
          }
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Section id="case-studies" className="py-32 sm:py-32 md:py-48">
      <SectionIntro
        title="Three systems in production, with the numbers attached."
        intro="Before and after, measured on the metric that mattered."
      />
      <div ref={ref} className="mt-10 flex flex-col gap-5 md:mt-12 md:gap-6">
        {caseStudies.map((study, i) => (
          <div
            key={study.client}
            data-stack-card
            className="relative lg:sticky"
            style={{ top: `${STACK_TOP + i * STACK_GAP}px` }}
          >
            <div
              data-stack-veil
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-background opacity-0"
            />
            <Rise>
              <article className="grid gap-6 rounded-xl border border-border bg-surface p-5 sm:p-7 lg:grid-cols-[1.6fr_1fr] lg:gap-10 lg:p-8">
                <div>
                  <p className="tnum font-mono text-xs text-muted-foreground">
                    {study.timeline} to live
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold sm:text-2xl">
                    {study.client}
                  </h3>

                  <dl className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <div className="rounded-xl border border-border bg-surface-2 p-4">
                      <dt className="eyebrow-type text-muted-foreground">Before</dt>
                      <dd className="mt-2.5 text-sm leading-relaxed text-foreground/85">
                        {study.challenge}
                      </dd>
                    </div>
                    <div className="rounded-xl border border-border bg-surface-2 p-4">
                      <dt className="eyebrow-type text-primary">What we built</dt>
                      <dd className="mt-2.5 text-sm leading-relaxed text-foreground/85">
                        {study.solution}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Rows rather than a tile grid: values like "< 3 min" keep their
                    full width at 375px instead of wrapping to three lines. */}
                <dl className="divide-y divide-border self-start rounded-xl border border-border bg-surface-2">
                  {study.results.map((result) => (
                    <div
                      key={result.label}
                      className="flex items-baseline justify-between gap-4 px-4 py-3.5"
                    >
                      <dt className="text-sm text-muted-foreground">{result.label}</dt>
                      <dd className="tnum font-display text-xl font-semibold text-primary sm:text-2xl">
                        {result.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Rise>
          </div>
        ))}
      </div>
    </Section>
  );
}

/**
 * Four stages, not eight. The original list broke delivery into Discovery,
 * Architecture, Design, Development, Testing, Deployment, Monitoring and
 * Improvement: accurate, but a spec sheet. Design/Development/Testing collapse
 * into Build; Deployment/Monitoring/Improvement collapse into Operate.
 *
 * The numbered markers stay: this is a genuine sequence, the one place the
 * contract allows indices. An accent spine draws down the list as you scroll
 * (scrubbed scaleY on a 1px element: transform only, no layout work).
 */
export function Process() {
  const steps: Array<[string, string]> = [
    ["Discovery", "Map the process, cost the current state, agree the metrics."],
    ["Architecture", "Data model, integrations and access control, agreed before any code."],
    ["Build", "Working software every two weeks, tested with the people who run it."],
    ["Operate", "Cutover without downtime, alerting from day one, quarterly reviews."],
  ];

  const listRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!listRef.current || !lineRef.current || prefersReducedMotion()) return;
      // Without JS (or with reduced motion) the accent spine simply shows in
      // full; fromTo sets the collapsed state only once the tween exists.
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: true,
          },
        },
      );
    },
    { scope: listRef },
  );

  return (
    <Section id="process" className="py-32 sm:py-32 md:py-48">
      <SectionIntro
        title="A delivery process built for accountability."
        intro="Four stages, whether it is one automation or a full ERP."
      />
      <div ref={listRef} className="relative mt-12 md:mt-16">
        {/* The spine: a hairline track with an accent line drawing down it. */}
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-border" />
        <div
          ref={lineRef}
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px origin-top bg-primary"
        />
        <Rise childSelector="li" stagger={0.1}>
          <ol className="flex flex-col">
            {steps.map(([title, body], i) => (
              <li
                key={title}
                className="list-none py-7 pl-7 sm:pl-10 md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10 md:py-10"
              >
                <div>
                  <span className="eyebrow-type tnum text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold sm:text-2xl">{title}</h3>
                </div>
                <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-muted-foreground sm:text-base md:mt-0 md:self-center">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </Rise>
      </div>
    </Section>
  );
}

/**
 * Three engagement models. Prices are starting points, stated as such.
 *
 * The featured tier is marked "Recommended", our own editorial stance, which we
 * are entitled to hold. It previously read "Most Chosen Model", which is a claim
 * about client behaviour we cannot evidence (contract §6.7).
 *
 * Hover physics per contract §3: cards lift by surface tint (card-lift), the
 * featured tier may also translate -4px (transform only, no shadows).
 */
export function Pricing() {
  const models = [
    {
      name: "Project Based",
      price: "$12,000",
      cadence: "starting price",
      for: "A defined custom software or automation system with a clear finish line.",
      includes: [
        "Fixed-price discovery and architecture phase",
        "Milestone-based two-week increment delivery",
        "Full IP, source code and environment handover",
        "60 days post-launch warranty and tuning",
      ],
      support: "Business hours",
      commitment: "6–16 weeks",
      featured: false,
      icon: "◫",
    },
    {
      name: "Dedicated Squad",
      price: "$8,500",
      cadence: "per month",
      for: "Continuous product, automation and platform development.",
      includes: [
        "Dedicated senior cross-functional squad",
        "Two-week delivery sprints and demo cycles",
        "Shared backlog, roadmap and architecture governance",
        "Direct Slack channel and weekly engineer syncs",
      ],
      support: "Extended hours",
      commitment: "3 months minimum",
      featured: true,
      icon: "✦",
    },
    {
      name: "Managed Partnership",
      price: "$2,500",
      cadence: "per month",
      for: "Running, monitoring and scaling live business systems and AI workflows.",
      includes: [
        "Managed cloud hosting, DevOps and security patching",
        "Automation estate maintenance and pipeline alerting",
        "Quarterly reliability and optimisation roadmap",
        "Incident response against an agreed SLA",
      ],
      support: "24/7 on-call SLA",
      commitment: "Rolling monthly",
      featured: false,
      icon: "◎",
    },
  ];

  return (
    <Section id="pricing" className="py-32 sm:py-32 md:py-48">
      <SectionIntro
        eyebrow="From $2,500 per month"
        title="Three ways to work with us. Starting prices, not final ones."
        intro="Scope and the exact figure are fixed after a 30-minute call, once the requirements are on the table."
      />

      <Rise
        className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-3"
        childSelector="[data-tier]"
        stagger={0.1}
      >
        {models.map((model) => (
          <div
            key={model.name}
            data-tier
            className={`group relative flex h-full overflow-hidden rounded-2xl border p-6 transition-all duration-500 md:p-7 ${
              model.featured
                ? "border-primary/60 bg-surface-2 hover:-translate-y-1"
                : "card-lift border-border bg-surface"
            }`}
          >
            {/* Decorative background circle */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -right-16 -top-16 size-44 rounded-full border transition-all duration-700 group-hover:scale-125 ${
                model.featured
                  ? "border-primary/20"
                  : "border-border/70"
              }`}
            />

            {/* Inner decorative circle */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -right-8 -top-8 size-28 rounded-full border transition-all duration-700 group-hover:rotate-45 ${
                model.featured
                  ? "border-primary/20"
                  : "border-border/50"
              }`}
            />

            {/* Accent glow */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute right-8 top-8 size-2 rounded-full transition-all duration-500 group-hover:scale-150 ${
                model.featured
                  ? "bg-primary"
                  : "bg-primary/40"
              }`}
            />

            {/* Small decorative grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-8 top-16 grid grid-cols-3 gap-1 opacity-30"
            >
              <span className="size-1 rounded-full bg-primary" />
              <span className="size-1 rounded-full bg-primary" />
              <span className="size-1 rounded-full bg-primary" />

              <span className="size-1 rounded-full bg-primary" />
              <span className="size-1 rounded-full bg-primary" />
              <span className="size-1 rounded-full bg-primary" />

              <span className="size-1 rounded-full bg-primary" />
              <span className="size-1 rounded-full bg-primary" />
              <span className="size-1 rounded-full bg-primary" />
            </div>

            {/* Featured top accent */}
            {model.featured ? (
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-primary"
              />
            ) : null}

            {/* Card content */}
            <div className="relative z-10 flex w-full flex-col">
              {/* Icon */}
              <div className="mb-6 flex items-center justify-between">
                <div
                  className={`flex size-11 items-center justify-center rounded-xl border text-lg transition-all duration-500 group-hover:scale-105 ${
                    model.featured
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-surface-2 text-muted-foreground group-hover:border-primary/30 group-hover:text-primary"
                  }`}
                >
                  {model.icon}
                </div>

                {model.featured ? (
                  <span className="eyebrow-type rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-primary">
                    Recommended
                  </span>
                ) : null}
              </div>

              {/* Plan name */}
              <h3 className="font-display text-lg font-semibold text-foreground md:text-xl">
                {model.name}
              </h3>

              {/* Price */}
              <div className="mt-6">
                <p className="eyebrow-type text-muted-foreground">
                  From
                </p>

                <p
                  className={`tnum mt-2 font-display text-5xl font-semibold tracking-tight md:text-6xl ${
                    model.featured
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {model.price}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  {model.cadence}
                </p>
              </div>

              {/* Description */}
              <p className="mt-5 min-h-[72px] text-sm leading-relaxed text-foreground/85">
                {model.for}
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-border" />

              {/* Includes */}
              <div className="flex-1">
                <p className="eyebrow-type text-muted-foreground">
                  Includes
                </p>

                <ul className="mt-4 space-y-3">
                  {model.includes.map((item) => (
                    <li
                      key={item}
                      className="group/item flex items-start gap-2.5 text-sm text-foreground/85"
                    >
                      <span
                        className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full transition-colors ${
                          model.featured
                            ? "bg-primary/15 text-primary"
                            : "bg-surface-2 text-primary"
                        }`}
                      >
                        <Check
                          className="size-2.5"
                          aria-hidden="true"
                        />
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom information */}
              <dl className="mt-7 space-y-3 border-t border-border pt-5 text-xs">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-muted-foreground">
                    Support
                  </dt>

                  <dd className="font-medium text-foreground">
                    {model.support}
                  </dd>
                </div>

                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-muted-foreground">
                    Commitment
                  </dt>

                  <dd className="font-medium text-foreground">
                    {model.commitment}
                  </dd>
                </div>
              </dl>

              {/* CTA */}
              <Magnetic className="mt-6 w-full">
                <Link
                  to="/contact"
                  className={`press inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                    model.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:gap-3"
                      : "border border-border text-foreground hover:border-primary/50 hover:text-primary hover:gap-3"
                  }`}
                >
                  Discuss {model.name}

                  <ArrowRight
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Magnetic>
            </div>
          </div>
        ))}
      </Rise>
    </Section>
  );
}