import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { GlassPanel, Reveal, Section, SectionHeading, Eyebrow } from "@/components/site/ui";
import { BookingCta } from "@/components/site/booking-cta";
import { services, solutionPages, type Service, type LandingPage } from "@/lib/site-data";
import { pageBodies } from "@/lib/page-bodies";
import {
  SITE_NAME,
  breadcrumbNode,
  canonicalLink,
  composeDescription,
  faqNode,
  jsonLdScript,
  pageMeta,
  serviceNode,
} from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): { service: Service; children: LandingPage[] } => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    // The solution pages under this service. The JSON-LD already asserts this
    // relation from the child side, so the crawlable link has to exist here too.
    const children = solutionPages.filter((p) => p.parent === service.slug);
    return { service, children };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: `Service unavailable | ${SITE_NAME}` },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const service = loaderData.service;
    const path = `/services/${params.slug}`;
    // `metaTitle` carries the keyword-shaped heading; `service.name` stays the
    // plain offering name so the JSON-LD entity is not distorted by SEO copy.
    const title = `${service.metaTitle ?? service.name} | ${SITE_NAME}`;
    // Hand-authored where present. The composer below is the fallback: it fits
    // fragments greedily and skips overflowing ones, so it can end mid-clause.
    const description =
      service.metaDescription ??
      composeDescription([
        service.tagline,
        service.impact,
        `Typical return: ${service.roi}.`,
        `Built by ${SITE_NAME}.`,
      ]);

    return {
      meta: pageMeta({ title, description, path }),
      links: [canonicalLink(path)],
      scripts: [
        jsonLdScript([
          serviceNode({
            name: service.name,
            description,
            path,
            capabilities: service.capabilities,
          }),
          // Mirrors the FAQ section rendered below; required for FAQ rich
          // results and the single highest-yield block for answer engines.
          faqNode(service.faqs, path),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path },
          ]),
        ]),
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service, children } = Route.useLoaderData() as {
    service: Service;
    children: LandingPage[];
  };

  return (
    <main>
      <Section className="pt-28 pb-10 md:pt-36 md:pb-10">
        <Reveal className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>Service</Eyebrow>
          <h1 className="text-4xl font-semibold text-balance md:text-6xl">{service.name}</h1>
          <p className="text-lg text-muted-foreground">{service.tagline}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Schedule a strategy call <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/services"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              All services
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section className="py-10">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { k: "The problem", v: service.problem },
            { k: "How we solve it", v: service.solution },
            { k: "Business impact", v: `${service.impact} Typical return: ${service.roi}.` },
          ].map((b) => (
            <Reveal key={b.k}>
              <GlassPanel className="h-full p-6">
                <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                  {b.k}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{b.v}</p>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="py-10">
        <SectionHeading eyebrow="Capabilities" title="What is included" />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {service.capabilities.map((c) => (
            <div
              key={c}
              className="flex items-start gap-2.5 rounded-xl border border-border bg-surface/40 p-4 text-sm"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-signal" />
              <span className="text-muted-foreground">{c}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {service.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-surface/60 px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* Anchor text is `child.title` verbatim, because that is the exact head
          term each solution URL is meant to own. `mobile-applications` has no
          children yet, so the block has to be conditional. */}
      {children.length > 0 ? (
        <Section className="py-10">
          <SectionHeading eyebrow="Solutions" title={`${service.name} solutions`} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {children.map((child) => (
              <Reveal key={child.slug}>
                <Link
                  to="/solutions/$slug"
                  params={{ slug: child.slug }}
                  className="card-lift press flex h-full flex-col rounded-xl border border-border bg-surface/50 p-5 transition-colors hover:border-primary/50"
                >
                  <h3 className="font-display text-base font-semibold text-balance">
                    {child.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {child.description}
                  </p>
                  <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-medium text-primary">
                    Read more
                    <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Page-specific prose. The panels above are scannable but thin; this is the
          block answer engines can quote, so each section stands alone at 40-60 words. */}
      {pageBodies[service.slug]?.length ? (
        <Section className="py-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {pageBodies[service.slug].map((section) => (
              <Reveal key={section.heading} className="lg:col-span-6">
                <h2 className="font-display text-xl font-semibold text-balance md:text-2xl">
                  {section.heading}
                </h2>
                <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-muted-foreground">
                  {section.text}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="py-10">
        <SectionHeading eyebrow="FAQ" title="Questions we get asked first" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {service.faqs.map((f) => (
            <GlassPanel key={f.q} className="p-6" lift={false}>
              <h3 className="font-display text-base font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </GlassPanel>
          ))}
        </div>
      </Section>

      <BookingCta />
    </main>
  );
}
