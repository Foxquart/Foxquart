import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GlassPanel, Reveal, Section, SectionHeading } from "@/components/site/ui";
import { CtaBand } from "@/components/site/sections";
import { solutionPages } from "@/lib/site-data";

const title = "Solutions — Industry & Service Specific Software | foxquart";
const description =
  "Dedicated solution pages for inventory, ERP, CRM, n8n automation, cloud hosting, DevOps, scraping, restaurant, warehouse, healthcare and school software.";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/solutions" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: SolutionsIndex,
});

function SolutionsIndex() {
  return (
    <main>
      <Section className="pt-28 pb-8 md:pt-36 md:pb-8">
        <SectionHeading
          eyebrow="Solutions"
          title="Seventeen problems we solve, in detail."
          intro="Each page covers the failure modes, the system we build and what changes afterwards."
        />
      </Section>
      <Section className="py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solutionPages.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.05}>
              <GlassPanel className="flex h-full flex-col p-6">
                <h2 className="font-display text-lg font-semibold">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
                <Link
                  to="/solutions/$slug"
                  params={{ slug: p.slug }}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Read more <ArrowRight className="size-3.5" />
                </Link>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand />
    </main>
  );
}
