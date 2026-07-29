import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/site/contact";

const title = "Contact — Book A Strategy Call | Nexolith";
const description =
  "Book a 30-minute strategy call with an engineer. Tell us the process costing you the most hours and get a prioritised automation shortlist.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="pt-24">
      <h1 className="sr-only">Contact Nexolith</h1>
      <ContactSection />
    </main>
  );
}
