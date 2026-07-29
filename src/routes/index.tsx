import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/hero";

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
  }),
  component: Home,
});

function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
    </main>
  );
}


