import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  EMAIL_ADDRESS,
  GMAIL_COMPOSE_URL,
  PHONE_NUMBERS,
  services,
  solutionPages,
} from "@/lib/site-data";
import { FoxquartLogo } from "./ui";

/*
 * Header + footer chrome.
 *
 * The 17 solution pages had no internal links anywhere on the site. They are now
 * reachable three ways: a desktop dropdown, a grouped list in the mobile sheet, and
 * the footer. The desktop dropdown is hidden with opacity/visibility rather than
 * unmounted, so all 17 links ship in the server-rendered HTML and crawlers see them.
 */

/** Nav copy for the solution pages. `title` is written for the page's own <h1> and is
 *  too long for a menu row; these keep the head keyword and drop the filler, and are
 *  used identically in the header and the footer so one URL has one anchor text. */
const SOLUTION_NAV_LABELS: Record<string, string> = {
  "inventory-management-software": "Inventory Management Software",
  "erp-development": "ERP Development",
  "crm-development": "CRM Development",
  "restaurant-software": "Restaurant POS Software",
  "warehouse-software": "Warehouse Management",
  "manufacturing-erp": "Manufacturing ERP",
  "healthcare-software": "Healthcare Software",
  "school-erp": "School ERP",
  "custom-software-development-services": "Custom Software Development",
  "n8n-automation-services": "n8n Automation",
  "ai-automation-services": "AI Automation",
  "business-process-automation": "Business Process Automation",
  "cloud-hosting": "Managed Cloud Hosting",
  "managed-devops": "Managed DevOps",
  "web-scraping": "Web Scraping",
  "api-development": "API Development",
  "landing-page-development": "Landing Page Development",
};

const navLabel = (slug: string, fallback: string) => SOLUTION_NAV_LABELS[slug] ?? fallback;

/** Solutions grouped under their parent service, in the order services are declared.
 *  Services with no solution pages drop out, so adding a page needs no change here. */
const solutionGroups = services
  .map((service) => ({
    slug: service.slug,
    name: service.name,
    pages: solutionPages.filter((page) => page.parent === service.slug),
  }))
  .filter((group) => group.pages.length > 0);

const CTA_LABEL = "Book a build review";

const deskLinkCls =
  "inline-flex h-10 items-center rounded-full px-4 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground";

/* No display utility here on purpose: each call site sets its own. Tailwind resolves
   `hidden` vs `inline-flex` by stylesheet order, not by order in the class attribute,
   so baking `inline-flex` in here would defeat `hidden md:inline-flex`. */
const ctaCls =
  "press h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--primary-hover)]";

const sheetRowCls =
  "flex min-h-12 items-center rounded-xl px-3 text-base text-foreground transition-colors hover:bg-surface active:bg-surface-2";

const sheetSubRowCls =
  "flex min-h-11 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground active:bg-surface-2";

const footerLinkCls = "text-muted-foreground transition-colors hover:text-foreground";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Includes search + hash, so a same-page jump like /#work also closes the sheet.
  const href = useRouterState({ select: (s) => s.location.href });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change — covers back/forward and preloaded navigations, not just taps.
  useEffect(() => {
    setOpen(false);
  }, [href]);

  // The sheet is md:hidden. Without this, resizing past the breakpoint while it is open
  // leaves the body scroll-locked with nothing on screen to close.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Transparent over the hero; solid once scrolled, and always solid behind an open sheet.
  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--dur-base)] ease-[var(--ease-brand)] ${
          solid ? "glass-strong" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
          <Link to="/" aria-label="Foxquart — home" className="press flex items-center">
            <FoxquartLogo
              iconClassName="size-7 text-primary"
              textClassName="font-display text-xl font-semibold tracking-tight text-foreground"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            <Link to="/" hash="work" className={deskLinkCls}>
              Work
            </Link>
            <Link
              to="/services"
              className={deskLinkCls}
              activeProps={{ className: "text-foreground" }}
            >
              Services
            </Link>

            {/* Solutions stays a real link — the dropdown is an accelerator, never the
                only route to the pages (contract §4: nothing important behind hover).
                CSS-only disclosure: hover opens it, focus-within opens it for keyboard. */}
            <div className="group relative">
              <Link
                to="/solutions"
                className={`${deskLinkCls} gap-1.5`}
                activeProps={{ className: "text-foreground" }}
              >
                Solutions
                <ChevronDown
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-[var(--dur-base)] ease-[var(--ease-brand)] group-hover:rotate-180 group-focus-within:rotate-180"
                />
              </Link>

              <div className="invisible absolute top-full left-1/2 w-[min(36rem,calc(100vw-3rem))] -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-[var(--dur-base)] ease-[var(--ease-brand)] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-panel)]">
                  <div className="columns-2 gap-x-6">
                    {solutionGroups.map((group) => (
                      <div key={group.slug} className="mb-5 break-inside-avoid last:mb-0">
                        <p className="eyebrow-type text-muted-foreground">{group.name}</p>
                        <ul className="mt-2">
                          {group.pages.map((page) => (
                            <li key={page.slug}>
                              <Link
                                to="/solutions/$slug"
                                params={{ slug: page.slug }}
                                className="-mx-2 block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                              >
                                {navLabel(page.slug, page.title)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-border pt-3">
                    <Link
                      to="/solutions"
                      className="text-sm font-medium text-primary transition-colors hover:text-[var(--primary-hover)]"
                    >
                      View all solutions
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/contact" className={`${ctaCls} hidden md:inline-flex`}>
              <span className="whitespace-nowrap">{CTA_LABEL}</span>
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="press grid size-11 place-items-center rounded-xl border border-border bg-surface text-foreground md:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header> on purpose: glass-strong sets backdrop-filter, which
          makes the header a containing block for fixed children and would pin this
          panel to the 72px bar instead of the viewport. */}
      {open ? (
        <div
          id="site-mobile-nav"
          className="fixed inset-x-0 top-18 bottom-0 z-40 flex flex-col border-t border-border bg-background shadow-[var(--shadow-panel)] md:hidden"
        >
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <div className="flex flex-col gap-2">
              <Link to="/" hash="work" className={sheetRowCls}>
                Work
              </Link>
              <Link to="/services" className={sheetRowCls}>
                Services
              </Link>
              <Link to="/solutions" className={sheetRowCls}>
                Solutions
              </Link>
            </div>

            <div className="mt-8 space-y-6 border-t border-border pt-6">
              {solutionGroups.map((group) => (
                <div key={group.slug}>
                  <p className="eyebrow-type px-3 text-muted-foreground">{group.name}</p>
                  <div className="mt-2 flex flex-col gap-2">
                    {group.pages.map((page) => (
                      <Link
                        key={page.slug}
                        to="/solutions/$slug"
                        params={{ slug: page.slug }}
                        className={sheetSubRowCls}
                      >
                        {navLabel(page.slug, page.title)}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-border pt-4">
              <a
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className={`${sheetSubRowCls} font-mono`}
              >
                {EMAIL_ADDRESS}
              </a>
              {PHONE_NUMBERS.map((phone) => (
                <a key={phone.raw} href={phone.tel} className={`${sheetSubRowCls} font-mono`}>
                  {phone.formatted}
                </a>
              ))}
            </div>
          </nav>

          {/* Primary action in the lower third, clear of the home indicator — contract §4. */}
          <div className="border-t border-border bg-background px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <Link to="/contact" className={`${ctaCls} flex w-full`}>
              {CTA_LABEL}
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
          <div className="flex flex-col items-start gap-4">
            <Link to="/" aria-label="Foxquart — home" className="press flex items-center">
              <FoxquartLogo
                iconClassName="size-7 text-primary"
                textClassName="font-display text-xl font-semibold tracking-tight text-foreground"
              />
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Product engineering studio. Software your business runs on — built in weeks, built to
              keep.
            </p>
            <Link to="/contact" className={`${ctaCls} inline-flex`}>
              {CTA_LABEL}
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <h2 className="eyebrow-type text-muted-foreground">Solutions</h2>
              {/* Multi-column flow, not a grid: grid rows align to the tallest group and
                  leave a dead gap under the short ones. Columns just pack. */}
              <div className="mt-4 gap-x-6 sm:columns-2">
                {solutionGroups.map((group) => (
                  <div key={group.slug} className="mb-6 break-inside-avoid last:mb-0">
                    <p className="text-sm font-medium text-foreground">{group.name}</p>
                    <ul className="mt-2 space-y-2 text-sm">
                      {group.pages.map((page) => (
                        <li key={page.slug}>
                          <Link
                            to="/solutions/$slug"
                            params={{ slug: page.slug }}
                            className={footerLinkCls}
                          >
                            {navLabel(page.slug, page.title)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <h2 className="eyebrow-type text-muted-foreground">Company</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <Link to="/" hash="work" className={footerLinkCls}>
                      Work
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className={footerLinkCls}>
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/solutions" className={footerLinkCls}>
                      All solutions
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className={footerLinkCls}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="eyebrow-type text-muted-foreground">Talk to us</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <a
                      href={GMAIL_COMPOSE_URL}
                      target="_blank"
                      rel="noreferrer noopener"
                      title="Open a pre-filled enquiry in Gmail"
                      className={`${footerLinkCls} font-mono text-xs`}
                    >
                      {EMAIL_ADDRESS}
                    </a>
                  </li>
                  {PHONE_NUMBERS.map((phone) => (
                    <li key={phone.raw}>
                      <a href={phone.tel} className={`${footerLinkCls} font-mono text-xs`}>
                        {phone.formatted}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Foxquart. All rights reserved.</p>
          <nav aria-label="Legal" className="flex gap-5">
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
