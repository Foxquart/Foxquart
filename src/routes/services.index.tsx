import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GlassPanel, Reveal, Section, SectionHeading } from "@/components/site/ui";
import { CtaBand } from "@/components/site/sections";
import { services } from "@/lib/site-data";

const title = "Services — Custom Software, AI Automation & Cloud Engineering | foxquart";
const description =
  "Six engineering practices: custom software, AI workflow automation, cloud and DevOps, data intelligence, enterprise web and mobile applications.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <main className="pt-28">
      <Section className="pb-8">
        <SectionHeading
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
      <CtaBand />
    </main>
  );
}
