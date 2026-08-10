import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/hero";
import { WhatWeDo } from "@/components/site/what-we-do";
import { BookingCta } from "@/components/site/booking-cta";
import { CaseStudies, Process, WhyBuild } from "@/components/site/sections";
import { DemoTeaser } from "@/components/site/demo-teaser";
import { DeepCaseStudy } from "@/components/site/deep-case-study";
import { Faq } from "@/components/site/faq";
import { StickyCta } from "@/components/site/sticky-cta";
import { canonicalLink, pageMeta } from "@/lib/seo";

const path = "/";
const title = "Custom Software, ERP & AI Automation | Foxquart";
const description =
  "Foxquart builds the systems a business runs on: clinic, school, warehouse, ERP and AI automation. Live in weeks, not quarters.";

export const Route = createFileRoute("/")({
  // Organization and WebSite JSON-LD are emitted once from __root.tsx; the home
  // route only overrides the per-page tags so the entity is never duplicated.
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: [canonicalLink(path)],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="min-h-dvh">
      {/* 1. The promise */}
      <Hero />

      {/* 2. Why go online, in the owner's language */}
      <WhyBuild />

      {/* 3. What we build */}
      <WhatWeDo />

      {/* 4. A few live demos, inline; the full gallery lives at /work */}
      <DemoTeaser />

      {/* 5. One build told properly, before the summary grid */}
      <DeepCaseStudy />

      {/* 6. What it changed, measured */}
      <CaseStudies />

      {/* 7. How the work runs */}
      <Process />

      {/* 9. The last reasons not to call */}
      <Faq />

      {/* 10. The next step */}
      <BookingCta />

      {/* Mobile only: rides in once the hero is gone, retires when the real CTA arrives */}
      <StickyCta />
    </main>
  );
}
