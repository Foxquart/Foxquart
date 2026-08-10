import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/*
 * Hero — the LCP element on `/` is the <h1> text, deliberately.
 *
 * Nothing in this file animates on mount and nothing here pulls in three.js.
 * `WovenCanvas` (three.js, ~236 kB gz) used to be a static import in this module,
 * which put a whole WebGL renderer on the critical path of the home route for a
 * decoration that never appeared above the fold on a phone. It is gone, along with
 * the unrendered dashboard mock and the 26 infinitely-looping particle spans.
 *
 * One decorative layer remains: `mesh-bg`, a static CSS gradient painted on the
 * section itself — no extra DOM, no compositing work, not an LCP candidate.
 */

const systems = [
  {
    id: "01",
    name: "Operations systems",
    detail: "Records, scheduling, stock and billing in one place instead of six spreadsheets.",
  },
  {
    id: "02",
    name: "Customer-facing products",
    detail: "Portals, booking and storefronts your customers use without being taught.",
  },
  {
    id: "03",
    name: "Automation",
    detail: "The repeat work in between — intake, reminders, reconciliation, reporting.",
  },
  {
    id: "04",
    name: "Handover",
    detail: "Documentation, a trained team and a codebase you own outright.",
  },
];

export function Hero() {
  return (
    <section className="mesh-bg relative px-4 pt-28 pb-16 sm:px-5 sm:pt-32 sm:pb-20 md:px-8 lg:pt-40 lg:pb-28">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-12 lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] lg:items-center lg:gap-16">
        <div className="flex max-w-2xl flex-col items-start">
          <p className="eyebrow-type text-primary">Product engineering studio</p>

          {/* LCP element. No entrance animation, no opacity ramp — it paints on first frame. */}
          <h1 className="mt-5 text-[2.25rem] leading-[1.06] font-semibold text-balance sm:text-5xl xl:text-[4rem]">
            Software your business runs on.
            <span className="mt-2 block text-muted-foreground">Built in weeks. Built to keep.</span>
          </h1>

          {/* Deliberately self-contained and entity-first: answer engines extract passages,
              not pages, and "Foxquart is a…" is the sentence they can quote for "what is
              Foxquart". Keep the definition in the first clause if this copy is revised. */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            Foxquart is a product engineering studio. We build the operations systems,
            customer-facing products and automation a company runs on day to day — for teams still
            working out of spreadsheets, WhatsApp threads and paper files.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              to="/contact"
              className="press inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-medium text-primary-foreground hover:bg-primary/90 sm:w-auto sm:text-sm"
            >
              Book a 30-min build review
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href="#work"
              className="press inline-flex min-h-12 w-full items-center justify-center rounded-full border border-border bg-surface px-6 text-base font-medium text-foreground hover:bg-surface-2 sm:w-auto sm:text-sm"
            >
              See live systems
            </a>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            <span className="tnum">Typical delivery 3–5 weeks</span>
            <span aria-hidden="true" className="px-2">
              ·
            </span>
            Senior engineers only
          </p>
        </div>

        <div className="w-full rounded-xl border border-border bg-surface">
          <p
            id="hero-systems-label"
            className="eyebrow-type border-b border-border px-5 py-4 text-muted-foreground"
          >
            What we build
          </p>
          <ul aria-labelledby="hero-systems-label" className="divide-y divide-border">
            {systems.map((system) => (
              <li key={system.id} className="flex gap-4 px-5 py-4">
                <span className="eyebrow-type tnum pt-1 text-primary">{system.id}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{system.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{system.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
