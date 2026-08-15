import { createFileRoute } from "@tanstack/react-router";
import { FeaturedWork } from "@/components/site/featured-work";
import { Section, SectionHeading } from "@/components/site/ui";
import {
  ORGANIZATION_ID,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbNode,
  canonicalLink,
  jsonLdScript,
  pageMeta,
  type JsonLd,
} from "@/lib/seo";

const path = "/work";
const title = "Live Software Demos: Open Every Build | Foxquart";
const description =
  "Foxquart demo systems, running live: inventory, school management, clinic booking, gym memberships, dining reservations and more. Open any of them.";

type Demo = {
  /**
   * The honest split. The operational systems are software a visitor signs into and
   * drives, so they are `WebApplication` under the `BusinessApplication` category.
   * The storefronts are marketing sites, so they stay `WebSite`.
   */
  kind: "WebApplication" | "WebSite";
  name: string;
  /** The demo's own origin, never a foxquart.com path. */
  url: string;
  description: string;
  /** Emitted for `WebApplication` only: `featureList` is a software property. */
  features?: string[];
};

/**
 * The gallery as structured data, in the order the cards render.
 *
 * This mirrors the `projects` array in components/site/featured-work.tsx, reduced to
 * the fields schema.org can carry: the live URL, what the build does, and for the
 * operational systems what ships with them. The two lists are kept side by side
 * rather than shared because featured-work.tsx owns presentation data (posters,
 * embed ids, build windows) that has no schema equivalent; when a demo is added or
 * retired, update both.
 *
 * Every entry is a Foxquart reference build on our own hosting. None are client
 * deployments, so no node carries a review, a rating or an offer.
 */
const demos: Demo[] = [
  {
    kind: "WebSite",
    name: "Halda Interior Architecture",
    url: "https://interior-design-demo.foxquart.com/",
    description: "Scroll-driven project walkthrough with a built-in enquiry flow.",
  },
  {
    kind: "WebApplication",
    name: "Ember Athletic Club",
    url: "https://gym-demo.foxquart.com/",
    description: "Public site, member dashboard and owner admin on one membership record.",
    features: ["Class Timetable", "Member Dashboard", "Owner Admin", "Membership Checkout"],
  },
  {
    kind: "WebApplication",
    name: "AuraCare Specialist Clinic",
    url: "https://clinic-demo.foxquart.com/",
    description: "Self-serve appointment booking against live doctor rosters.",
    features: ["Doctor Rosters", "Patient Booking", "Appointment Reminders", "Doctor Profiles"],
  },
  {
    kind: "WebApplication",
    name: "Six Mile Motor Works",
    url: "https://inventory.foxquart.com/",
    description: "Live parts catalogue with stock levels and movement history in one screen.",
    features: ["Parts Catalogue", "Stock Levels", "Movement Log", "Reorder Signals"],
  },
  {
    kind: "WebApplication",
    name: "Vidya Bharati International School",
    url: "https://gilded-nougat-63e5af.netlify.app/",
    description: "Admin, teacher, parent and student portals over a single student record.",
    features: [
      "Parent & Teacher Portals",
      "Attendance Tracking",
      "Fee Receipt Engine",
      "Student Analytics",
    ],
  },
  {
    kind: "WebSite",
    name: "Ember & Oak",
    url: "https://emberanoak.netlify.app/",
    description: "Course-by-course menu with an online table reservation flow.",
  },
  {
    kind: "WebSite",
    name: "Good Luck Tattoo Studio",
    url: "https://goodlucktattooshop.netlify.app/",
    description: "Per-artist calendars with a deposit step before a slot is held.",
  },
];

/** One demo, credited to and published by the Organization entity. */
function demoNode(demo: Demo): JsonLd {
  return {
    "@type": demo.kind,
    "@id": demo.url,
    name: demo.name,
    url: demo.url,
    description: demo.description,
    ...(demo.kind === "WebApplication"
      ? {
          applicationCategory: "BusinessApplication",
          ...(demo.features?.length ? { featureList: demo.features } : {}),
        }
      : {}),
    creator: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    isAccessibleForFree: true,
  };
}

/**
 * Built inline rather than with `collectionNode`: that helper resolves every item
 * through `absoluteUrl`, and these demos live on their own origins. The list instead
 * points at the demo nodes by `@id`, so the page and the builds stay one graph.
 */
function workCollectionNode(): JsonLd {
  const url = absoluteUrl(path);
  return {
    "@type": "CollectionPage",
    "@id": url,
    name: "Foxquart live demos",
    description,
    url,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: demos.length,
      itemListElement: demos.map((demo, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: demo.name,
        item: { "@id": demo.url },
      })),
    },
  };
}

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: [canonicalLink(path)],
    scripts: [
      // The gallery's strongest asset is that every card is a URL an answer engine
      // can fetch and check. Publishing the demos as typed, individually addressable
      // nodes is what makes that reachable without rendering the page.
      jsonLdScript([
        workCollectionNode(),
        ...demos.map(demoNode),
        breadcrumbNode([
          { name: "Home", path: "/" },
          { name: "Work", path },
        ]),
      ]),
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <main className="min-h-dvh">
      {/* The page's only h1, and visible: the gallery's own headline inside
          FeaturedWork is an h2 shared with the home page, so /work needs a
          top-level heading of its own rather than an sr-only stand-in. */}
      <Section className="pt-28 pb-0 md:pt-36 md:pb-0">
        <SectionHeading
          as="h1"
          align="center"
          eyebrow="Work"
          title="Live demo systems built by Foxquart"
        />
      </Section>
      <FeaturedWork />
    </main>
  );
}
