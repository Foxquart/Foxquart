/**
 * SEO / AEO / GEO layer.
 *
 * Single source of truth for the canonical origin, the head tags and the JSON-LD
 * emitted by every route.
 *
 * `foxquart.com` 308-redirects to `www.foxquart.com`, so the `www` host is the
 * canonical origin. Never emit a relative or bare-domain URL in a canonical link,
 * `og:url`, a sitemap `<loc>` or a JSON-LD `url`/`@id`: answer engines and
 * crawlers resolve those inconsistently, and a relative `og:url` is invalid.
 */

import { SOCIAL_LINKS } from "@/lib/site-data";

export const SITE_URL = "https://www.foxquart.com";
export const SITE_NAME = "Foxquart";

/**
 * Social card. Generated separately and served from the public root.
 * Named og-card.png (not og.png): X cached a failed fetch of /og.png from an
 * early deploy and reuses that per-URL verdict across every page, so the image
 * had to move to a URL its crawler has never seen.
 */
export const OG_IMAGE_URL = `${SITE_URL}/og-card.png`;
export const OG_IMAGE_WIDTH = "1200";
export const OG_IMAGE_HEIGHT = "630";
export const OG_IMAGE_ALT = "Foxquart, product engineering studio";
/* The founder's original raster artwork. Google prefers a raster for Organization
   logo, and this is the authoritative version of the mark. */
export const LOGO_URL = `${SITE_URL}/foxquart.png`;

/**
 * Date the site copy last changed, used for `<lastmod>` in the sitemap.
 * Bump this when page content changes. Deliberately not `new Date()`: the sitemap
 * is served per request, so a live timestamp would mark every URL as modified on
 * every crawl, and search engines discount `lastmod` values they cannot trust.
 */
export const CONTENT_LAST_MODIFIED = "2026-08-10";

/**
 * Real revision dates of the two legal pages, mirrored here for the sitemap.
 *
 * src/routes/privacy.tsx and src/routes/terms.tsx each declare their own
 * module-private `LAST_UPDATED_ISO`, render it as visible `<time>` text and emit
 * it as JSON-LD `dateModified`. Neither is exported, so the sitemap cannot import
 * them and has to restate the values.
 *
 * MUST be kept in step with the `LAST_UPDATED_ISO` constant in each of those
 * route files. A `<lastmod>` that disagrees with the `dateModified` on the same
 * page is exactly the kind of mismatch that makes Google stop trusting
 * `<lastmod>` sitewide. The two dates are held separately rather than as one
 * shared legal date because the pages were revised on different days.
 */
export const PRIVACY_LAST_MODIFIED = "2026-08-11";
export const TERMS_LAST_MODIFIED = "2026-08-10";

/** Stable JSON-LD node identifiers so page-level nodes can reference the entity. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export type JsonLdValue = string | number | boolean | null | JsonLd | JsonLdValue[];
export type JsonLd = { [key: string]: JsonLdValue | undefined };

export type HeadMeta =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

/** Resolves a route path to a fully-qualified canonical URL. */
export function absoluteUrl(path: string): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalised}`;
}

/** Canonical `<link>` descriptor. Only ever emit one per page, never from the root route. */
export function canonicalLink(path: string) {
  return { rel: "canonical", href: absoluteUrl(path) };
}

/**
 * Joins sentence fragments into a meta description, greedily filling the
 * 140–160 character window search engines and answer engines display without
 * truncating. Fragments that would overflow are skipped rather than cut, so the
 * description is always a set of whole, quotable sentences.
 */
export function composeDescription(parts: Array<string | undefined>, max = 158): string {
  let out = "";
  for (const part of parts) {
    if (!part) continue;
    const next = out ? `${out} ${part}` : part;
    if (next.length <= max) out = next;
  }
  return out;
}

/**
 * The full per-page tag set: title, description, Open Graph and Twitter card.
 * Deeper routes override the root route's values for the same `name`/`property`,
 * so every page gets a unique title, description and `og:url`.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): HeadMeta[] {
  const url = absoluteUrl(path);
  return [
    { title },
    { name: "description", content: description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: OG_IMAGE_URL },
    { property: "og:image:width", content: OG_IMAGE_WIDTH },
    { property: "og:image:height", content: OG_IMAGE_HEIGHT },
    { property: "og:image:alt", content: OG_IMAGE_ALT },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE_URL },
    { name: "twitter:image:alt", content: OG_IMAGE_ALT },
  ];
}

/**
 * A `<script>` element's contents are raw text, so HTML entities are never
 * decoded there and `</script>` inside a string would terminate the tag early.
 * These characters are therefore escaped as JSON `\uXXXX` sequences, which JSON
 * parsers decode back to the original character. Service names such as
 * "Cloud Infrastructure & DevOps" make this load-bearing, not theoretical.
 */
const SCRIPT_ESCAPES: Record<string, string> = {
  "&": "\\u0026",
  "<": "\\u003c",
  ">": "\\u003e",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
};

/**
 * Wraps one or more JSON-LD nodes in a single `@graph` document, ready to pass
 * to a route's `head.scripts`. One graph per page keeps every node in a single
 * connected document rather than a pile of unrelated snippets.
 */
export function jsonLdScript(nodes: JsonLd[]) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
  return {
    type: "application/ld+json",
    children: json.replace(/[&<>\u2028\u2029]/g, (c) => SCRIPT_ESCAPES[c] ?? c),
  };
}

/**
 * The publisher entity. Every other node points at `ORGANIZATION_ID` instead of
 * repeating this, which is what lets knowledge graphs and LLMs merge the pages
 * into one entity rather than treating each page as a separate business.
 *
 * `sameAs` carries the founder-confirmed profiles from SOCIAL_LINKS, which is
 * what lets knowledge graphs tie the X and Instagram accounts to this entity.
 */
export function organizationNode({
  email,
  telephones,
}: {
  email: string;
  telephones: string[];
}): JsonLd {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    sameAs: SOCIAL_LINKS.map((social) => social.url),
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      caption: `${SITE_NAME} logo`,
    },
    image: OG_IMAGE_URL,
    description:
      "Foxquart is a remote-first product engineering studio that builds custom operational software, AI workflow automation, cloud infrastructure and mobile field applications for businesses worldwide.",
    slogan: "Software your business runs on. Built in weeks. Built to keep.",
    /* Engagements are remote and not limited to any region, so the served area is
       the schema.org-recognised literal "Worldwide" rather than a country list. */
    areaServed: "Worldwide",
    email,
    telephone: telephones[0],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email,
        telephone: telephones[0],
        availableLanguage: ["en"],
      },
      ...telephones.slice(1).map((telephone) => ({
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone,
        availableLanguage: ["en"],
      })),
    ],
    knowsAbout: [
      "Custom software development",
      "AI workflow automation",
      "Cloud infrastructure and DevOps",
      "Data intelligence and web scraping",
      "Enterprise websites and landing pages",
      "Mobile and field applications",
    ],
  };
}

/** Site-level node. No `SearchAction`: the site has no search endpoint to point at. */
export function websiteNode(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** Breadcrumb trail for nested routes. Every `item` is an absolute URL. */
export function breadcrumbNode(trail: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** FAQPage node. Only emit it on pages where the same Q&A is visible in the markup. */
export function faqNode(faqs: Array<{ q: string; a: string }>, path: string): JsonLd {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/** A single offering, provided by the Organization entity. */
export function serviceNode({
  name,
  description,
  path,
  serviceType,
  capabilities,
  relatedToPath,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  capabilities?: string[];
  /** Parent practice page, for solution pages that specialise a broader service. */
  relatedToPath?: string;
}): JsonLd {
  const url = absoluteUrl(path);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    serviceType: serviceType ?? name,
    provider: { "@id": ORGANIZATION_ID },
    ...(relatedToPath ? { isRelatedTo: { "@id": `${absoluteUrl(relatedToPath)}#service` } } : {}),
    ...(capabilities && capabilities.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${name} capabilities`,
            itemListElement: capabilities.map((capability) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: capability },
            })),
          },
        }
      : {}),
  };
}

/** Index page listing a set of child pages, so the taxonomy is machine-readable. */
export function collectionNode({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: Array<{ name: string; path: string }>;
}): JsonLd {
  const url = absoluteUrl(path);
  return {
    "@type": "CollectionPage",
    "@id": url,
    name,
    description,
    url,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}
