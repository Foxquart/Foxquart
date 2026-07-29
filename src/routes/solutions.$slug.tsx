import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, X } from "lucide-react";
import { GlassPanel, Reveal, Section, SectionHeading, Eyebrow } from "@/components/site/ui";
import { CtaBand } from "@/components/site/sections";
import { solutionPages, services, type LandingPage } from "@/lib/site-data";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }): { page: LandingPage } => {
    const page = solutionPages.find((p) => p.slug === params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Solution unavailable — foxquart" }, { name: "robots", content: "noindex" }],
      };
    }
    const t = `${loaderData.page.title} | foxquart`;
    const d = loaderData.page.description;
    return {
      meta: [
        { title: t.slice(0, 68) },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/solutions/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/solutions/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: loaderData.page.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: SolutionPage,
});

function SolutionPage() {
  const { page } = Route.useLoaderData() as { page: LandingPage };
  const parent = services.find((s) => s.slug === page.parent);

  return (
    <main className="pt-28">
      <Section className="pb-8">
        <Reveal className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>{parent ? parent.name : "Solution"}</Eyebrow>
          <h1 className="text-4xl font-semibold text-balance md:text-6xl">{page.h1}</h1>
          <p className="text-lg text-muted-foreground">{page.description}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Schedule a strategy call <ArrowRight className="size-4" />
            </Link>
            {parent ? (
              <Link
                to="/services/$slug"
                params={{ slug: parent.slug }}
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
              >
                {parent.name}
              </Link>
            ) : null}
          </div>
        </Reveal>
      </Section>

      <Section className="py-10">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <GlassPanel lift={false} className="h-full p-7">
              <p className="font-mono text-[11px] tracking-[0.18em] text-destructive uppercase">
                What is broken today
              </p>
              <ul className="mt-6 space-y-4">
                {page.problems.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <X className="mt-0.5 size-4 shrink-0 text-destructive" /> {p}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassPanel className="h-full border-primary/30 p-7">
              <p className="font-mono text-[11px] tracking-[0.18em] text-signal uppercase">
                What you get
              </p>
              <ul className="mt-6 space-y-4">
                {page.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-signal" /> {o}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </Reveal>
        </div>
      </Section>

      <Section className="py-10">
        <SectionHeading eyebrow="FAQ" title="Before you ask" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {page.faqs.map((f) => (
            <GlassPanel key={f.q} lift={false} className="p-6">
              <h2 className="font-display text-base font-semibold">{f.q}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </GlassPanel>
          ))}
        </div>
      </Section>

      <Section className="py-10">
        <SectionHeading eyebrow="Related" title="Other solutions" />
        <div className="mt-8 flex flex-wrap gap-2">
          {solutionPages
            .filter((p) => p.slug !== page.slug)
            .slice(0, 10)
            .map((p) => (
              <Link
                key={p.slug}
                to="/solutions/$slug"
                params={{ slug: p.slug }}
                className="rounded-full border border-border bg-surface/50 px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {p.title}
              </Link>
            ))}
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
