import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/hero";
import {
  CaseStudies,
  CtaBand,
  Industries,
  Pricing,
  ProblemComparison,
  Process,
  Products,
  ServiceExplorer,
  SocialProof,
  TechStack,
  WhyUs,
} from "@/components/site/sections";
import { AiSection, AutomationCanvas, CloudInfrastructure } from "@/components/site/systems";
import { ContactSection } from "@/components/site/contact";

const title = "foxquart — AI & Software Engineering Studio For Business Operations";
const description =
  "We build custom software, AI automation, cloud infrastructure and enterprise dashboards that remove manual work and modernise business operations.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "foxquart",
          description,
          areaServed: "Global",
          serviceType: [
            "Custom Software Development",
            "AI Workflow Automation",
            "Cloud Infrastructure & DevOps",
            "ERP Development",
            "CRM Development",
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      <h1 className="sr-only">
        AI and software engineering studio building custom software, automation and cloud systems
      </h1>
      <Hero />
      <SocialProof />
      <WhyUs />
      <ServiceExplorer />
      <ProblemComparison />
      <Industries />
      <Products />
      <AutomationCanvas />
      <CloudInfrastructure />
      <AiSection />
      <CaseStudies />
      <Process />
      <TechStack />
      {/* <Pricing /> */}
      <CtaBand />
      <ContactSection />
    </main>
  );
}
