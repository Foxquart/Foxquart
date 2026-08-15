import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Check, Globe } from "lucide-react";
import { Picture } from "@/components/ui/picture";
import { cn } from "@/lib/utils";
import { Reveal } from "./ui";

type Project = {
  id: string;
  category: string;
  businessName: string;
  /** What the build is for. Describes the demo, never a client outcome we cannot show. */
  summary: string;
  /** The one thing this build does that a brochure page does not. */
  capability: string;
  features: string[];
  /** Scope estimate for a build of this size: our own commitment, not a client's report. */
  buildWindow: string;
  /** Poster raster. Shown on its own below `lg`, and under the embed while it loads. */
  image: string;
  liveLink: string;
  /** Name shown in the browser mockup's address bar. Falls back to `category`. */
  demoLabel?: string;
  /**
   * Opt out of the live embed and show the poster instead. For demos whose entrance
   * animations never fire inside a frame, so the iframe would paint an empty page over
   * a poster that reads correctly.
   */
  embed?: false;
};

/**
 * Newest builds lead: interior, gym and clinic are the freshest work, so they carry the
 * top of the gallery. The engineered systems follow as depth behind them.
 *
 * Every entry is a Foxquart reference build on our own hosting. None of these are client
 * deployments, so none of them carry a review, a rating or a platform badge.
 */
const projects: Project[] = [
  {
    id: "interior-design",
    category: "Interior Design Studio",
    businessName: "Halda Interior Architecture",
    summary: "Puts the portfolio, process and enquiry flow on one scroll.",
    capability: "Scroll-driven project walkthrough with a built-in enquiry flow.",
    features: ["Project Walkthrough", "Case Study Pages", "Studio Story", "Enquiry Form"],
    buildWindow: "3 weeks",
    image: "/images/interior_studio.png",
    liveLink: "https://interior-design-demo.foxquart.com/",
    demoLabel: "Interior Studio",
  },
  {
    id: "gym-club",
    category: "Gym & Studio Platform",
    businessName: "Ember Athletic Club",
    summary: "Sells the memberships, then runs them: member app and owner console.",
    capability: "Public site, member dashboard and owner admin on one membership record.",
    features: ["Class Timetable", "Member Dashboard", "Owner Admin", "Membership Checkout"],
    buildWindow: "4 weeks",
    image: "/images/gym_club.png",
    liveLink: "https://gym-demo.foxquart.com/",
    demoLabel: "Ember Athletic Club",
    // The club's reveal animations stay at opacity 0 until the page is scrolled, and a
    // framed copy never scrolls, so an embed here renders an empty page.
    embed: false,
  },
  {
    id: "doctor-clinic",
    category: "Clinic Booking System",
    businessName: "AuraCare Specialist Clinic",
    summary: "Patients pick a doctor, pick a slot, get the reminder.",
    capability: "Self-serve appointment booking against live doctor rosters.",
    features: ["Doctor Rosters", "Patient Booking", "Appointment Reminders", "Doctor Profiles"],
    buildWindow: "4 weeks",
    image: "/images/clinic_portfolio.png",
    liveLink: "https://clinic-demo.foxquart.com/",
    demoLabel: "AuraCare Clinic",
  },
  {
    id: "spares-control",
    category: "Inventory System",
    businessName: "Six Mile Motor Works",
    summary: "Runs a spares counter: catalogue, stock levels, movements.",
    capability: "Live parts catalogue with stock levels and movement history in one screen.",
    features: ["Parts Catalogue", "Stock Levels", "Movement Log", "Reorder Signals"],
    buildWindow: "5 weeks",
    image: "/images/spares_control.png",
    liveLink: "https://inventory.foxquart.com/",
    demoLabel: "Spares Control Center",
  },
  {
    id: "school-management",
    category: "School Management System",
    businessName: "Vidya Bharati International School",
    summary: "Runs a school: admissions, fees, attendance, four portals.",
    capability: "Admin, teacher, parent and student portals over a single student record.",
    features: [
      "Parent & Teacher Portals",
      "Attendance Tracking",
      "Fee Receipt Engine",
      "Student Analytics",
    ],
    buildWindow: "4 weeks",
    image: "/images/school_management.png",
    liveLink: "https://gilded-nougat-63e5af.netlify.app/",
    demoLabel: "Vidya Bharati SMS",
  },
  {
    id: "ember-oak",
    category: "Fine Dining Restaurant",
    businessName: "Ember & Oak",
    summary: "Pairs the tasting menu with reservations that hold the table.",
    capability: "Course-by-course menu with an online table reservation flow.",
    features: ["Tasting Menu", "Online Reservations", "Sommelier Pairings", "Private Dining"],
    buildWindow: "4 weeks",
    image: "/images/ember_oak.png",
    liveLink: "https://emberanoak.netlify.app/",
    demoLabel: "Ember & Oak",
  },
  {
    id: "tattoo-shop",
    category: "Tattoo Studio",
    businessName: "Good Luck Tattoo Studio",
    summary: "Books tattoo slots on artist calendars, deposit taken up front.",
    capability: "Per-artist calendars with a deposit step before a slot is held.",
    features: ["Artist Calendars", "Online Booking", "Deposit Payments", "Aftercare Guides"],
    buildWindow: "3 weeks",
    image: "/images/tattoo_studio.png",
    liveLink: "https://goodlucktattooshop.netlify.app/",
    demoLabel: "Good Luck Tattoo",
  },
];

/* -------------------------------------------------------------------------------------
 * Embed budget
 *
 * Each browser mockup embeds a complete third-party site, so five cards is five extra page
 * loads competing with our own. The section is therefore gated twice:
 *
 *   1. Viewport: embeds are only ever created from `lg` up. A phone gets the poster and a
 *      tap-through, and never pays for the demo it cannot read at that size.
 *   2. Budget: at most two embeds exist at once, and slots follow the viewport. A card
 *      that scrolls away releases its slot to the next one, so every card can go live
 *      without the page ever holding more than two.
 * ---------------------------------------------------------------------------------- */

const MAX_LIVE_EMBEDS = 2;
const DESKTOP_QUERY = "(min-width: 1024px)"; // Tailwind `lg`

/** Cards currently on screen, oldest first. The first `MAX_LIVE_EMBEDS` hold the budget. */
const onScreen: string[] = [];
const budgetListeners = new Set<() => void>();
const NO_EMBEDS: readonly string[] = [];
let liveEmbeds: readonly string[] = NO_EMBEDS;

function publishBudget() {
  const next = onScreen.slice(0, MAX_LIVE_EMBEDS);
  if (next.length === liveEmbeds.length && next.every((id, i) => id === liveEmbeds[i])) return;
  liveEmbeds = next;
  for (const listener of budgetListeners) listener();
}

function enterViewport(id: string) {
  if (onScreen.includes(id)) return;
  onScreen.push(id);
  publishBudget();
}

function leaveViewport(id: string) {
  const at = onScreen.indexOf(id);
  if (at === -1) return;
  onScreen.splice(at, 1);
  publishBudget();
}

function subscribeToBudget(listener: () => void) {
  budgetListeners.add(listener);
  return () => {
    budgetListeners.delete(listener);
  };
}

function getLiveEmbeds() {
  return liveEmbeds;
}

/** The server renders posters only, so nothing holds the budget before hydration. */
function getServerLiveEmbeds() {
  return NO_EMBEDS;
}

/**
 * True once the viewport is at least `lg`. Starts false so the server render and the first
 * client render agree; the embed is added in a later commit, never during hydration.
 */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return isDesktop;
}

/**
 * Claims one of the embed slots while the returned ref is on screen. `isEmbedded` stays
 * false on small viewports, before the card intersects, and while two other cards hold the
 * budget: in every one of those cases the poster is what renders.
 */
function useLiveEmbed(id: string, enabled: boolean) {
  const frameRef = useRef<HTMLDivElement>(null);
  const granted = useSyncExternalStore(subscribeToBudget, getLiveEmbeds, getServerLiveEmbeds);

  useEffect(() => {
    const node = frameRef.current;
    if (!enabled || !node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? enterViewport(id) : leaveViewport(id)),
      // Start the load a screenful early so the embed is painted by the time it is read.
      { rootMargin: "300px 0px" },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      leaveViewport(id);
    };
  }, [enabled, id]);

  return { frameRef, isEmbedded: enabled && granted.includes(id) };
}

/** Address-bar label: the demo's product name, not its URL. */
function displayLabel(project: Project) {
  return project.demoLabel ?? project.category;
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  const isDesktop = useIsDesktop();
  const hasDemo = project.liveLink !== "#";
  const canEmbed = hasDemo && project.embed !== false;
  const { frameRef, isEmbedded } = useLiveEmbed(project.id, isDesktop && canEmbed);

  // Pasted-card tilt, straightened on hover. Desktop only: on a phone the cards sit square.
  const tilt = index % 2 === 0 ? "lg:rotate-1" : "lg:-rotate-1";

  return (
    <a
      href={project.liveLink}
      target="_blank"
      rel="noopener noreferrer"
      className="press group relative flex flex-col gap-3 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      {/* Card label row */}
      <div className="flex items-center justify-between gap-3 px-1">
        <span className="eyebrow-type text-muted-foreground">{project.category}</span>
        {/* Live builds say so once, on the artwork. Only a card without a demo is
            labelled here. */}
        {hasDemo ? null : (
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
            Concept
          </span>
        )}
      </div>

      {/* 1. Browser mockup: the demo itself, embedded on desktop */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-[var(--dur-base)] ease-[var(--ease-brand)] group-hover:border-[var(--border-strong)]">
        {/* Browser top bar */}
        <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="size-2.5 rounded-full bg-muted-foreground/40" />
            <div className="size-2.5 rounded-full bg-muted-foreground/40" />
            <div className="size-2.5 rounded-full bg-muted-foreground/40" />
          </div>
          <div className="flex h-5 w-40 items-center justify-center rounded-md border border-border bg-background px-2 text-[10px] font-medium text-muted-foreground transition-colors duration-[var(--dur-base)] ease-[var(--ease-brand)] select-none group-hover:border-primary/40 group-hover:text-primary sm:w-48">
            <Globe className="mr-1 size-2.5 shrink-0" />
            <span className="truncate">{displayLabel(project)}</span>
          </div>
          <div className="size-4 opacity-0 transition-opacity duration-[var(--dur-base)] ease-[var(--ease-brand)] group-hover:opacity-100">
            <ArrowUpRight className="size-3.5 text-primary" />
          </div>
        </div>

        {/* Browser page content */}
        <div ref={frameRef} className="relative h-64 w-full overflow-hidden bg-surface-2 md:h-80">
          {/* The poster paints immediately and is the whole story below `lg`. */}
          <Picture
            src={project.image}
            alt={`${project.businessName} demo site`}
            sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />

          {/* The real site, rendered at 2x the card width and scaled down, so the preview
              cannot go stale as the demo changes. Hidden from assistive tech: the poster
              already carries the description, and the frame is not reachable. */}
          {isEmbedded ? (
            <iframe
              src={project.liveLink}
              title={`${project.businessName} demo, running live`}
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
              scrolling="no"
              sandbox="allow-scripts allow-same-origin"
              className="pointer-events-none absolute top-0 left-0 h-[200%] w-[200%] origin-top-left scale-50 border-0"
            />
          ) : null}

          {/* The open affordance, carried on the artwork at every width: over the poster
              below `lg`, over the running embed above it. Centred, not bottom-anchored:
              the detail card overlaps the lower edge. */}
          {hasDemo ? (
            <span className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center px-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground shadow-[var(--shadow-panel)]">
                <span className="size-1.5 rounded-full bg-signal" />
                Live demo
                <span className="text-muted-foreground">
                  <span className="lg:hidden">Tap to open</span>
                  <span className="hidden lg:inline">Click to open</span>
                </span>
                <ArrowUpRight className="size-3 shrink-0 text-primary" />
              </span>
            </span>
          ) : null}
        </div>
      </div>

      {/* 2. Pasted-style detail card: what the build ships with. No card claims a review. */}
      <div
        className={cn(
          "relative z-10 mx-3 -mt-12 rounded-xl border border-border bg-surface-2 p-4 shadow-[var(--shadow-panel)] transition-[translate,rotate] duration-[var(--dur-base)] ease-[var(--ease-brand)] sm:mx-6 sm:-mt-14 sm:p-5 lg:group-hover:-translate-y-1 lg:group-hover:rotate-0",
          tilt,
        )}
      >
        <div className="mb-3.5 flex items-center justify-between gap-3 border-b border-border pb-3">
          <h3 className="text-xs font-semibold text-foreground">{project.businessName}</h3>
          <span className="shrink-0 rounded bg-primary/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-primary">
            Foxquart Demo
          </span>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground md:text-[13px]">
          {project.summary}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* What the build does, and how long a build this size takes. Nothing else. */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
          <div className="flex items-center gap-1.5">
            <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-signal/10 text-signal">
              <Check className="size-3" />
            </span>
            <span className="text-[10px] font-semibold text-foreground">{project.capability}</span>
          </div>

          <div className="tnum text-[9px] font-semibold text-muted-foreground">
            Build window: {project.buildWindow}
          </div>
        </div>
      </div>
    </a>
  );
}

export function FeaturedWork() {
  const isOddCount = projects.length % 2 === 1;

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-background px-4 py-16 sm:px-5 sm:py-24 md:px-8 md:py-32"
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl leading-[1.08] font-semibold text-balance sm:text-3xl md:text-5xl">
            Seven live demos. Open any of them.
          </h2>
          <p className="max-w-[56ch] text-base text-muted-foreground md:text-lg">
            Real running sites, not screenshots. Tap a card to try one.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-14 sm:mt-16 lg:mt-20 lg:grid-cols-2">
          {projects.map((project, i) => {
            // With an odd number of projects the last card would sit alone on the left;
            // centre it across both columns instead.
            const isLonelyLast = isOddCount && i === projects.length - 1;

            return (
              <Reveal
                key={project.id}
                delay={(i % 2) * 0.04}
                className={
                  isLonelyLast ? "lg:col-span-2 lg:mx-auto lg:w-[calc(50%-1rem)]" : undefined
                }
              >
                <WorkCard project={project} index={i} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
