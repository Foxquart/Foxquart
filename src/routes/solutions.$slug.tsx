import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, X } from "lucide-react";
import { GlassPanel, Reveal, Section, SectionHeading, Eyebrow } from "@/components/site/ui";
import { CtaBand } from "@/components/site/sections";
import { SolutionDemo } from "@/components/site/solution-demo";
import { solutionPages, services, type LandingPage } from "@/lib/site-data";
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
    // `metaTitle` overrides only the <title>; `page.title` still feeds the
    // breadcrumb and the Service node name.
    const title = `${page.metaTitle ?? page.title} | ${SITE_NAME}`;
    const description =
      page.metaDescription ??
      composeDescription([
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
  // Siblings are picked cyclically from this page's own group, so every page in
  // a group gets four outbound and four inbound links. A flat slice of the list
  // gave the first few declared pages every link and the last ones none.
  const group = solutionPages.filter((p) => p.parent === page.parent);
  const here = group.findIndex((p) => p.slug === page.slug);
  const siblings = [...group.slice(here + 1), ...group.slice(0, here)].slice(0, 4);

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

      {/* Page-specific prose. See services.$slug.tsx for the same block. */}
      {pageBodies[page.slug]?.length ? (
        <Section className="py-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {pageBodies[page.slug].map((section) => (
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
        <SectionHeading eyebrow="FAQ" title="Before you ask" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {page.faqs.map((f) => (
            <GlassPanel key={f.q} lift={false} className="p-6">
              {/* h3, not h2: these sit under the SectionHeading h2 above. */}
              <h3 className="font-display text-base font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </GlassPanel>
          ))}
        </div>
      </Section>

      {/* `landing-page-development` is an only child, so this can be empty. */}
      {siblings.length > 0 ? (
        <Section className="py-10">
          <SectionHeading
            eyebrow="Related"
            title={parent ? `More ${parent.name} solutions` : "Related solutions"}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {siblings.map((p) => (
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
      ) : null}

      <CtaBand />
    </main>
  );
}
