import { createFileRoute } from "@tanstack/react-router";
import { FeaturedWork } from "@/components/site/featured-work";
import { canonicalLink, pageMeta } from "@/lib/seo";

const path = "/work";
const title = "Live Demo Systems — Open Every Build | Foxquart";
const description =
  "Every Foxquart reference build, running live: inventory control, school management, clinic booking, dining reservations and more. Open them and click around.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: [canonicalLink(path)],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <main className="min-h-dvh pt-18">
      <h1 className="sr-only">Live demo systems built by Foxquart</h1>
      <FeaturedWork />
    </main>
  );
}
