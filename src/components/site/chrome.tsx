import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { GMAIL_COMPOSE_URL, EMAIL_ADDRESS, PHONE_NUMBERS, solutionPages } from "@/lib/site-data";
import { FoxquartLogo } from "./ui";

const nav = [
  { label: "Services", to: "/services" },
  { label: "Solutions", to: "/solutions" },
  // { label: "Work", to: "/#case-studies" },
  // { label: "Pricing", to: "/#pricing" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center">
          <FoxquartLogo iconClassName="size-7 text-primary" textClassName="font-display text-xl font-bold tracking-tight text-foreground" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) =>
            item.to.includes("#") ? (
              <a
                key={item.label}
                href={item.to}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex"
          >
            Schedule a strategy call
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-lg border border-border bg-surface md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="glass-strong border-t border-border px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              Schedule a strategy call
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  const featured = solutionPages.slice(0, 8);
  return (
    <footer className="relative border-t border-border bg-surface/30 px-5 py-16 md:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.2fr_2fr]">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center">
            <FoxquartLogo iconClassName="size-7 text-primary" textClassName="font-display text-xl font-bold text-foreground" />
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            AI &amp; software engineering studio. We design, build, automate and operate the systems
            businesses run on.
          </p>
          <form
            className="mt-2 flex max-w-sm gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <label className="sr-only" htmlFor="newsletter">
              Email address
            </label>
            <input
              id="newsletter"
              type="email"
              required
              placeholder="Work email"
              className="w-full rounded-full border border-border bg-surface px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/60"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Join
            </button>
          </form>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Solutions
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {featured.map((page) => (
                <li key={page.slug}>
                  <Link
                    to="/solutions/$slug"
                    params={{ slug: page.slug }}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-foreground">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-muted-foreground hover:text-foreground">
                  All solutions
                </Link>
              </li>
              <li>
                <a href="/#industries" className="text-muted-foreground hover:text-foreground">
                  Industries
                </a>
              </li>
              <li>
                <a href="/#process" className="text-muted-foreground hover:text-foreground">
                  How we work
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Elsewhere
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="https://www.linkedin.com"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 font-mono"
                  title="Open template directly in Gmail"
                >
                  {EMAIL_ADDRESS}
                </a>
              </li>
              {PHONE_NUMBERS.map((p) => (
                <li key={p.raw}>
                  <a
                    href={p.tel}
                    className="text-muted-foreground hover:text-foreground font-mono text-xs"
                  >
                    {p.formatted}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} foxquart Engineering. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="/#process" className="hover:text-foreground">
            How we work
          </a>
          <a href="/#contact" className="hover:text-foreground">
            Privacy
          </a>
          <a href="/#contact" className="hover:text-foreground">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
