// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Pinned so every build targets Vercel deterministically instead of falling
  // back to the config's cloudflare-module default when built outside Vercel CI.
  //
  // isr: true maps to a Vercel prerender function with expiration: false, so
  // each page is SSR'd once per deployment and then served straight from the
  // CDN (TTFB was ~1s of per-request serverless SSR). The cache resets on
  // every deploy; POST /api/contact and /sitemap.xml have no rule and stay
  // fully dynamic. Build-time prerendering is not an option here: both
  // TanStack Start's and nitro's crawlers fail against the beta nitro-vite
  // integration (the SSR bundle lands where neither expects it).
  // The declared `nitro` type only names preset/output/cloudflare, but the
  // config forwards the whole object to nitro verbatim (the build emits the
  // *-isr.func bundles), so the extra keys need a cast to satisfy tsc.
  nitro: {
    preset: "vercel",
    routeRules: {
      // Baseline security headers on every server-rendered response (Lighthouse
      // Best Practices: HSTS, clickjacking, MIME sniffing, origin isolation).
      // No CSP: the app legitimately inlines scripts (theme gate, JSON-LD), so
      // a policy strict enough to score would break them.
      "/**": {
        headers: {
          "strict-transport-security": "max-age=31536000; includeSubDomains",
          "x-frame-options": "SAMEORIGIN",
          "x-content-type-options": "nosniff",
          "cross-origin-opener-policy": "same-origin",
          "referrer-policy": "strict-origin-when-cross-origin",
        },
      },
      "/": { isr: true },
      // "/x/**" does not match "/x" itself, so the index pages get their own rule.
      "/services": { isr: true },
      "/services/**": { isr: true },
      "/solutions": { isr: true },
      "/solutions/**": { isr: true },
      "/work": { isr: true },
      "/contact": { isr: true },
      "/privacy": { isr: true },
      "/terms": { isr: true },

      // Permanent redirects for retired and renamed URLs.
      //
      // Each source page targeted the same intent as its destination and the two
      // split the same rankings between them (classic keyword cannibalisation).
      // The distinctive content of every source page was merged into its
      // destination first, so these are consolidations, not deletions: the 301
      // passes the accumulated link equity forward and tells engines which single
      // URL now owns the topic.
      //
      // 301, not the nitro default of 307: 307 is a temporary redirect and does
      // not consolidate ranking signals.
      //
      // Precedence over the "/services/**" and "/solutions/**" ISR rules above is
      // not a matter of key order. Nitro matches route rules by pattern
      // specificity, and the Vercel preset sorts rules by segment count when it
      // writes config.json, emitting every redirect route ahead of every ISR
      // route. A literal two-segment path therefore outranks its wildcard, and
      // the redirect terminates the request before the ISR function is reached.
      "/solutions/custom-software-development-services": {
        redirect: { to: "/services/custom-software-development", status: 301 },
      },
      "/solutions/ai-automation-services": {
        redirect: { to: "/solutions/ai-agent-development", status: 301 },
      },
      "/services/data-intelligence": {
        redirect: { to: "/services/data-engineering", status: 301 },
      },
      "/services/cloud-devops": {
        redirect: { to: "/services/cloud-infrastructure", status: 301 },
      },
    },
  } as { preset: string },
});
