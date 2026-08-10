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
  /** Scope estimate for a build of this size — our own commitment, not a client's report. */
  buildWindow: string;
  /** Poster raster. Shown on its own below `lg`, and under the embed while it loads. */
  image: string;
  liveLink: string;
  /** Name shown in the browser mockup's address bar. Falls back to `category`. */
  demoLabel?: string;
};

/**
 * Engineered systems lead. The storefronts are evidence of range, not the headline —
 * the order is the positioning (contract §5).
 *
 * Every entry is a Foxquart reference build on our own hosting. None of these are client
 * deployments, so none of them carry a review, a rating or a platform badge.
 */
const projects: Project[] = [
  {
    id: "school-management",
    category: "School Management System",
    businessName: "Vidya Bharati International School",
    summary:
      "Schools run on paper registers and parent WhatsApp groups, and the same child's data gets written down four times. This build puts four role-based portals over one student record.",
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
    id: "doctor-clinic",
    category: "Clinic Booking System",
    businessName: "AuraCare Specialist Clinic",
    summary:
      "A clinic reception spends the morning on the phone repeating the same three questions. This build hands the roster to the patient: pick a doctor, pick a slot, get the reminder.",
    capability: "Self-serve appointment booking against live doctor rosters.",
    features: ["Doctor Rosters", "Patient Booking", "Appointment Reminders", "Doctor Profiles"],
    buildWindow: "4 weeks",
    image: "/images/clinic_portfolio.png",
    liveLink: "https://clinic-portfolio-template.vercel.app/",
    demoLabel: "AuraCare Clinic",
  },
  {
    id: "ember-oak",
    category: "Fine Dining Restaurant",
    businessName: "Ember & Oak",
    summary:
      "A tasting menu sells an evening, and a PDF cannot carry it. This build pairs the menu and pairings with a reservation flow that holds the table.",
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
    summary:
      "Studios book through Instagram DMs, which is where the no-shows come from. This build moves booking onto per-artist calendars with a deposit taken before the slot is held.",
    capability: "Per-artist calendars with a deposit step before a slot is held.",
    features: ["Artist Calendars", "Online Booking", "Deposit Payments", "Aftercare Guides"],
    buildWindow: "3 weeks",
    image: "/images/tattoo_studio.png",
    liveLink: "https://goodlucktattooshop.netlify.app/",
    demoLabel: "Good Luck Tattoo",
  },
  {
    id: "interior-design",
    category: "Interior Design Studio",
    businessName: "Halda Interior Architecture",
    summary:
      "Studios lose enquiries when the work sits in a PDF. This demo puts the portfolio, process and enquiry flow on one scroll.",
    capability: "Scroll-driven project walkthrough with a built-in enquiry flow.",
    features: ["Project Walkthrough", "Case Study Pages", "Studio Story", "Enquiry Form"],
    buildWindow: "3 weeks",
    image: "/images/interior_studio.png",
    liveLink: "https://interior-design-demo-three.vercel.app/",
    demoLabel: "Interior Studio",
  },
];

/* -------------------------------------------------------------------------------------
 * Embed budget
 *
 * Each browser mockup embeds a complete third-party site, so five cards is five extra page
 * loads competing with our own. The section is therefore gated twice:
 *
 *   1. Viewport — embeds are only ever created from `lg` up. A phone gets the poster and a
 *      tap-through, and never pays for the demo it cannot read at that size.
 *   2. Budget — at most two embeds exist at once, and slots follow the viewport. A card
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
 * client render agree — the embed is added in a later commit, never during hydration.
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
 * budget — in every one of those cases the poster is what renders.
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
  const { frameRef, isEmbedded } = useLiveEmbed(project.id, isDesktop && hasDemo);

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
        {hasDemo ? (
          <span className="hidden items-center gap-1.5 rounded-full bg-signal/10 px-2.5 py-1 text-[10px] font-semibold text-signal lg:inline-flex">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
            </span>
            Live demo
          </span>
        ) : (
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
            Concept
          </span>
        )}
      </div>

      {/* 1. Browser mockup — the demo itself, embedded on desktop */}
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

          {/* Below `lg` there is no embed, so the poster carries the affordance instead.
              Centred, not bottom-anchored: the detail card overlaps the lower edge. */}
          {hasDemo ? (
            <span className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center px-3 lg:hidden">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground shadow-[var(--shadow-panel)]">
                <span className="size-1.5 rounded-full bg-signal" />
                Live demo
                <span className="text-muted-foreground">Tap to open</span>
                <ArrowUpRight className="size-3 shrink-0 text-primary" />
              </span>
            </span>
          ) : null}
        </div>
      </div>

      {/* 2. Pasted-style detail card — what the build ships with. No card claims a review. */}
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

          <div className="tnum flex items-center gap-2 text-[9px] font-semibold text-muted-foreground">
            <span>Build window: {project.buildWindow}</span>
            {hasDemo ? (
              <span className="flex items-center gap-0.5 text-primary group-hover:underline">
                Open demo <ArrowUpRight className="size-2.5" />
              </span>
            ) : null}
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
      {/* Decorative grid, drawn in the hairline token so it never becomes a second colour. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:14px_24px] opacity-30"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl leading-[1.08] font-semibold text-balance sm:text-3xl md:text-5xl">
            Five builds you can open right now.
          </h2>
          <p className="max-w-[56ch] text-base text-muted-foreground md:text-lg">
            Reference builds, not screenshots. A school running four role-based portals, a clinic
            booking against live rosters, and three storefronts — each one a working site you can
            click through.
          </p>
          <p className="text-xs text-muted-foreground">
            On a wide screen these cards embed the running site. On a phone, tap one to open it.
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
