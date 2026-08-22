import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GlassPanel, Reveal, Section, SectionHeading } from "@/components/site/ui";
import { BookingCta } from "@/components/site/booking-cta";
import { services } from "@/lib/site-data";
import { breadcrumbNode, canonicalLink, collectionNode, jsonLdScript, pageMeta } from "@/lib/seo";

const path = "/services";
const title = "Software Development Services: AI, Cloud & Web | Foxquart";
const description =
  "Six software development services in one studio: AI automation, custom operational systems, cloud engineering, data pipelines, websites and mobile apps.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: [canonicalLink(path)],
    scripts: [
      // Publishes the six-practice taxonomy as an ItemList so an answer engine
      // can enumerate what Foxquart does without parsing the card grid.
      jsonLdScript([
        collectionNode({
          name: "Foxquart services",
          description,
          path,
          items: services.map((s) => ({ name: s.name, path: `/services/${s.slug}` })),
        }),
        breadcrumbNode([
          { name: "Home", path: "/" },
          { name: "Services", path },
        ]),
      ]),
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <main>
      <Section className="pt-28 pb-8 md:pt-36 md:pb-8">
        <SectionHeading
          as="h1"
          eyebrow="Services"
          title="Engineering practices that replace manual operations."
          intro="Pick the practice closest to your problem. Most engagements combine two or three."
        />
      </Section>
      <Section className="py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06}>
              <GlassPanel className="flex h-full flex-col p-6">
                <span className="font-mono text-[10px] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold">{s.name}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.tagline}</p>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Explore <ArrowRight className="size-3.5" />
                </Link>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </Section>
      <BookingCta />
    </main>
  );
}
