import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { services, solutionPages } from "@/lib/site-data";
import {
  CONTENT_LAST_MODIFIED,
  PRIVACY_LAST_MODIFIED,
  TERMS_LAST_MODIFIED,
  absoluteUrl,
} from "@/lib/seo";

/*
 * No `changefreq` or `priority`. Google stopped using both years ago and Bing
 * treats them as noise; `priority` in particular only ever expressed relative
 * importance within this one site, which neither engine reads. `<lastmod>` is
 * the only hint still honoured, and only while it tracks real edits, which is
 * why entries can carry their own date instead of one sitewide value.
 */
interface SitemapEntry {
  path: string;
  /** Falls back to CONTENT_LAST_MODIFIED when the page has no date of its own. */
  lastModified?: string;
}

/** `<loc>` is parsed as XML text, so the five predefined entities must be escaped. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/" },
          { path: "/work" },
          { path: "/services" },
          { path: "/solutions" },
          { path: "/contact" },
          // The legal pages state their own revision date in visible text and in
          // JSON-LD dateModified, so `<lastmod>` has to agree with that, not with
          // the sitewide copy date.
          { path: "/privacy", lastModified: PRIVACY_LAST_MODIFIED },
          { path: "/terms", lastModified: TERMS_LAST_MODIFIED },
          ...services.map((s) => ({
            path: `/services/${s.slug}`,
            lastModified: s.lastModified,
          })),
          ...solutionPages.map((p) => ({
            path: `/solutions/${p.slug}`,
            lastModified: p.lastModified,
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${escapeXml(absoluteUrl(e.path))}</loc>`,
            `    <lastmod>${e.lastModified ?? CONTENT_LAST_MODIFIED}</lastmod>`,
            `  </url>`,
          ].join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
