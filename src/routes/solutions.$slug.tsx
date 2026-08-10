import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, X } from "lucide-react";
import { GlassPanel, Reveal, Section, SectionHeading, Eyebrow } from "@/components/site/ui";
import { CtaBand } from "@/components/site/sections";
import { SolutionDemo } from "@/components/site/solution-demo";
import { solutionPages, services, type LandingPage } from "@/lib/site-data";
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

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }): { page: LandingPage } => {
    const page = solutionPages.find((p) => p.slug === params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: `Solution unavailable | ${SITE_NAME}` },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const page = loaderData.page;
    const path = `/solutions/${params.slug}`;
    // Every solution title stays under 60 characters once suffixed, so the title
    // is no longer blind-truncated mid-word at 68 characters as it was before.
    const title = `${page.title} | ${SITE_NAME}`;
    const description = composeDescription([
      page.description,
      ...page.outcomes.map((o) => `${o}.`),
      `Built by ${SITE_NAME}.`,
    ]);
    const parent = services.find((s) => s.slug === page.parent);

    return {
      meta: pageMeta({ title, description, path }),
      links: [canonicalLink(path)],
      scripts: [
        jsonLdScript([
          serviceNode({
            name: page.title,
            description,
            path,
            capabilities: page.outcomes,
            // Ties the solution back to the broader practice it specialises, so
            // the seventeen pages resolve as one connected offering rather than
            // seventeen unrelated businesses.
            relatedToPath: parent ? `/services/${parent.slug}` : undefined,
          }),
          faqNode(page.faqs, path),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: page.title, path },
          ]),
        ]),
      ],
    };
  },
  component: SolutionPage,
});

function SolutionPage() {
  const { page } = Route.useLoaderData() as { page: LandingPage };
  const parent = services.find((s) => s.slug === page.parent);

  return (
    <main>
      <Section className="pt-28 pb-8 md:pt-36 md:pb-8">
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

        {/* The live build that demonstrates this exact solution (or the gallery band). */}
        <SolutionDemo slug={page.slug} />
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
