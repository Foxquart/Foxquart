import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { GlassPanel, Reveal, Section, SectionHeading, Eyebrow } from "@/components/site/ui";
import { CtaBand } from "@/components/site/sections";
import { services, type Service } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): { service: Service } => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service unavailable — foxquart" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.service.name} — foxquart`;
    const d = loaderData.service.tagline;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/services/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: loaderData.service.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData() as { service: Service };

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

      <CtaBand />
    </main>
  );
}
