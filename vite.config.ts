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
    },
  } as { preset: string },
});
