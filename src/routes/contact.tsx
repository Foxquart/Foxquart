import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/site/contact";
import { EMAIL_ADDRESS, PHONE_NUMBERS } from "@/lib/site-data";
import {
  ORGANIZATION_ID,
  SITE_NAME,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbNode,
  canonicalLink,
  jsonLdScript,
  pageMeta,
} from "@/lib/seo";

const path = "/contact";
const title = "Contact: Book a Strategy Call | Foxquart";
const description =
  "Book a 30-minute remote strategy call with a Foxquart engineer, from anywhere. Tell us the process costing you the most hours and get an automation shortlist.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: [canonicalLink(path)],
    scripts: [
      // Publishes the email and both phone numbers in a form an agent can read
      // without parsing the page, and points them at the same Organization @id
      // declared on the root route.
      jsonLdScript([
        {
          "@type": "ContactPage",
          "@id": absoluteUrl(path),
          name: `Contact ${SITE_NAME}`,
          description,
          url: absoluteUrl(path),
          isPartOf: { "@id": WEBSITE_ID },
          about: { "@id": ORGANIZATION_ID },
          mainEntity: {
            "@id": ORGANIZATION_ID,
            email: EMAIL_ADDRESS,
            telephone: PHONE_NUMBERS.map((p) => p.tel.replace("tel:", "")),
          },
        },
        breadcrumbNode([
          { name: "Home", path: "/" },
          { name: "Contact", path },
        ]),
      ]),
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="pt-24">
      <h1 className="sr-only">Contact foxquart</h1>
      <ContactSection />
    </main>
  );
}
